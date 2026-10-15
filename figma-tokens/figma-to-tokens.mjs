#!/usr/bin/env node
/**
 * figma-to-tokens.mjs
 * Pull Figma Variables → tokens/tokens.json
 *
 * Usage:  npm run tokens:pull
 * Needs:  FIGMA_TOKEN + FIGMA_FILE_KEY in .env
 */

import fs   from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT      = path.resolve(__dirname, '..')

// ── Load .env ─────────────────────────────────────────────────────────
async function loadEnv() {
  try {
    const raw = await fs.readFile(path.join(ROOT, '.env'), 'utf-8')
    for (const line of raw.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eqIdx = trimmed.indexOf('=')
      if (eqIdx === -1) continue
      const key = trimmed.slice(0, eqIdx).trim()
      const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '')
      if (key && !process.env[key]) process.env[key] = val
    }
  } catch {
    // .env not found rely on shell env vars
  }
}

// ── Helpers ───────────────────────────────────────────────────────────

/** Figma color {r,g,b,a} (0–1) → #RRGGBB or #RRGGBBAA */
function toHex({ r, g, b, a = 1 }) {
  const h = (n) => Math.round(n * 255).toString(16).padStart(2, '0')
  return a < 1
    ? `#${h(r)}${h(g)}${h(b)}${h(a)}`
    : `#${h(r)}${h(g)}${h(b)}`
}

/** "color/base/white-100" → ["color", "base", "white-100"] */
function splitPath(name) {
  return name.split('/').map((s) => s.trim())
}

/** Set deeply nested key on obj */
function setDeep(obj, keys, value) {
  let cur = obj
  for (let i = 0; i < keys.length - 1; i++) {
    if (!cur[keys[i]]) cur[keys[i]] = {}
    cur = cur[keys[i]]
  }
  cur[keys[keys.length - 1]] = value
}

/** Determine Style Dictionary token type from resolvedType + name hints */
function tokenType(resolvedType, name) {
  if (resolvedType === 'COLOR')   return 'color'
  if (resolvedType === 'STRING')  return 'fontFamily'
  if (resolvedType === 'BOOLEAN') return 'other'
  // FLOAT infer from name segments
  const n = name.toLowerCase()
  if (n.includes('font-size')    || n.includes('fontsize'))     return 'fontSize'
  if (n.includes('line-height')  || n.includes('lineheight'))   return 'lineHeight'
  if (n.includes('letter-space') || n.includes('letterspacing'))return 'letterSpacing'
  if (n.includes('spacing')      || n.includes('space'))        return 'spacing'
  if (n.includes('radius'))      return 'borderRadius'
  if (n.includes('width')        || n.includes('height'))       return 'dimension'
  if (n.includes('shadow'))      return 'boxShadow'
  if (n.includes('scale')        || n.includes('root-font'))    return 'dimension'
  return 'number'
}

/** Resolve a single variable value for a given modeId */
function resolveValue(variable, modeId, varById) {
  const raw = variable.valuesByMode?.[modeId]
  if (raw === undefined || raw === null) return null

  // Variable alias → Style Dictionary reference {path.to.token}
  if (raw?.type === 'VARIABLE_ALIAS') {
    const ref = varById[raw.id]
    if (!ref) return null
    return `{${splitPath(ref.name).join('.')}}`
  }

  switch (variable.resolvedType) {
    case 'COLOR':
      return typeof raw === 'object' && 'r' in raw ? toHex(raw) : null
    case 'FLOAT':
      return typeof raw === 'number' ? raw : null
    case 'STRING':
      return typeof raw === 'string' ? raw : null
    case 'BOOLEAN':
      return typeof raw === 'boolean' ? raw : null
    default:
      return null
  }
}

// ── Main ──────────────────────────────────────────────────────────────
async function main() {
  await loadEnv()

  const TOKEN    = process.env.FIGMA_TOKEN
  const FILE_KEY = process.env.FIGMA_FILE_KEY

  if (!TOKEN || !FILE_KEY) {
    console.error('❌  Missing FIGMA_TOKEN or FIGMA_FILE_KEY in .env')
    process.exit(1)
  }

  console.log('🔄  Fetching Figma variables...')
  console.log(`    File key : ${FILE_KEY}`)

  // ── Fetch from Figma REST API ──────────────────────────────────────
  const url = `https://api.figma.com/v1/files/${FILE_KEY}/variables/local`
  const res  = await fetch(url, {
    headers: { 'X-Figma-Token': TOKEN }
  })

  if (!res.ok) {
    console.error(`❌  Figma API ${res.status}: ${await res.text()}`)
    process.exit(1)
  }

  const { meta } = await res.json()
  const { variables, variableCollections } = meta

  const allVars     = Object.values(variables)
  const collections = Object.values(variableCollections)

  // Build id → variable lookup
  const varById = Object.fromEntries(allVars.map((v) => [v.id, v]))

  console.log(`✅  ${allVars.length} variables across ${collections.length} collections\n`)

  // ── Build tokens object ────────────────────────────────────────────
  const tokens = {}

  for (const col of collections) {
    const colName  = col.name          // "primitive" | "component" | "semantics" | "responsive"
    const modes    = col.modes         // [{modeId, name}, …]
    const colVars  = allVars.filter((v) => v.variableCollectionId === col.id)

    console.log(`📦  ${colName}  (${colVars.length} vars, modes: ${modes.map((m) => m.name).join(' / ')})`)

    if (modes.length === 1) {
      // ── Single-mode: export flat into token tree ─────────────────
      const modeId = modes[0].modeId
      for (const v of colVars) {
        const val = resolveValue(v, modeId, varById)
        if (val === null) continue
        setDeep(tokens, splitPath(v.name), {
          value: val,
          type:  tokenType(v.resolvedType, v.name),
          ...(v.description ? { description: v.description } : {}),
        })
      }
    } else {
      // ── Multi-mode (semantics light/dark): namespace by mode name ─
      for (const mode of modes) {
        // "light-mode" → "light-mode", "dark-mode" → "dark-mode"
        const modeKey = mode.name.toLowerCase().replace(/\s+/g, '-')
        for (const v of colVars) {
          const val = resolveValue(v, mode.modeId, varById)
          if (val === null) continue
          setDeep(tokens, [modeKey, ...splitPath(v.name)], {
            value: val,
            type:  tokenType(v.resolvedType, v.name),
            ...(v.description ? { description: v.description } : {}),
          })
        }
      }
    }
  }

  // ── Write tokens/tokens.json ───────────────────────────────────────
  const outDir   = path.join(ROOT, 'tokens')
  const outFile  = path.join(outDir, 'tokens.json')
  const metaFile = path.join(outDir, '.meta.json')

  await fs.mkdir(outDir, { recursive: true })
  await fs.writeFile(outFile,  JSON.stringify(tokens,  null, 2), 'utf-8')

  // Write pull metadata
  const meta2 = {
    pulledAt:    new Date().toISOString(),
    figmaFile:   FILE_KEY,
    totalVars:   allVars.length,
    collections: collections.map((c) => ({
      name:  c.name,
      count: allVars.filter((v) => v.variableCollectionId === c.id).length,
      modes: c.modes.map((m) => m.name),
    })),
  }
  await fs.writeFile(metaFile, JSON.stringify(meta2, null, 2), 'utf-8')

  console.log(`\n✅  tokens/tokens.json  (${allVars.length} variables)`)
  console.log(`    tokens/.meta.json   (pull metadata)\n`)

  console.log('📊  Collection summary:')
  for (const c of meta2.collections) {
    console.log(`    ${c.name.padEnd(12)} ${String(c.count).padStart(4)} vars   [${c.modes.join(' / ')}]`)
  }

  console.log('\n▶   Next: npm run tokens:build')
}

main().catch((err) => {
  console.error('❌  Fatal:', err.message)
  process.exit(1)
})
