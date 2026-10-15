#!/usr/bin/env node
/**
 * figma-to-tokens.mjs
 * Pull Figma Variables → tokens/tokens.json/<collection>.json  (W3C DTCG format)
 *
 * เขียนแยกไฟล์ต่อ collection ให้ตรงกับ source ที่ Style Dictionary build อ่าน:
 *   primitive.json · component.json · semantics-light-mode.json ·
 *   semantics-dark-mode.json · desktop/mobile/tablet-responsive.json
 *
 * ไม่แตะ typography.json / shadows.json มาจาก Figma "Styles" (Token Press) ไม่ใช่ Variables
 *
 * Usage:  npm run tokens:pull
 *         TOKENS_OUT=/tmp/x node scripts/figma-to-tokens.mjs   # ทดสอบลง dir อื่น
 * Needs:  FIGMA_TOKEN + FIGMA_FILE_KEY in .env
 */
import fs   from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT      = path.resolve(__dirname, '..')
const OUT_DIR   = process.env.TOKENS_OUT || path.join(ROOT, 'tokens', 'tokens.json')

async function loadEnv() {
  try {
    const raw = await fs.readFile(path.join(ROOT, '.env'), 'utf-8')
    for (const line of raw.split('\n')) {
      const t = line.trim(); if (!t || t.startsWith('#')) continue
      const i = t.indexOf('='); if (i === -1) continue
      const k = t.slice(0, i).trim(), v = t.slice(i + 1).trim().replace(/^["']|["']$/g, '')
      if (k && !process.env[k]) process.env[k] = v
    }
  } catch {}
}

function toColor({ r, g, b, a = 1 }) {
  const c = (n) => Math.round(n * 255)
  return a < 1 ? `rgba(${c(r)}, ${c(g)}, ${c(b)}, ${parseFloat(a.toFixed(4))})`
               : `rgb(${c(r)}, ${c(g)}, ${c(b)})`
}
const splitPath = (name) => name.split('/').map((s) => s.trim())
function setDeep(obj, keys, value) {
  let cur = obj
  for (let i = 0; i < keys.length - 1; i++) { if (!cur[keys[i]]) cur[keys[i]] = {}; cur = cur[keys[i]] }
  cur[keys[keys.length - 1]] = value
}
function tokenType(resolvedType, name) {
  const n = name.toLowerCase()
  if (resolvedType === 'COLOR')   return 'color'
  if (resolvedType === 'STRING')  return /font-family|fontfamily/.test(n) ? 'fontFamily' : 'string'
  if (resolvedType === 'BOOLEAN') return 'boolean'
  if (/font-size|fontsize/.test(n))        return 'fontSize'
  if (/line-height|lineheight/.test(n))    return 'lineHeight'
  if (/letter-space|letterspacing/.test(n))return 'letterSpacing'
  if (/font-weight|fontweight/.test(n))    return 'fontWeight'
  if (/radius/.test(n))                    return 'borderRadius'
  if (/width|height/.test(n))              return 'dimension'
  if (/scale|root-font/.test(n))           return 'dimension'
  if (/spacing|space/.test(n))             return 'spacing'
  if (/blur|spread|position|offset/.test(n)) return 'dimension'
  return 'number'
}
function resolveValue(variable, modeId, varById) {
  const raw = variable.valuesByMode?.[modeId]
  if (raw === undefined || raw === null) return null
  if (raw?.type === 'VARIABLE_ALIAS') {
    const ref = varById[raw.id]; return ref ? `{${splitPath(ref.name).join('.')}}` : null
  }
  switch (variable.resolvedType) {
    case 'COLOR':   return (typeof raw === 'object' && 'r' in raw) ? toColor(raw) : null
    case 'FLOAT':   return typeof raw === 'number'  ? raw : null
    case 'STRING':  return typeof raw === 'string'  ? raw : null
    case 'BOOLEAN': return typeof raw === 'boolean' ? raw : null
    default:        return null
  }
}
function fileFor(colName, modeName) {
  const m = (modeName || '').toLowerCase().replace(/\s+/g, '-')
  if (colName === 'semantics')  return `semantics-${m}.json`
  if (colName === 'responsive') return `${m}-responsive.json`
  return `${colName}.json`
}

async function main() {
  await loadEnv()
  const TOKEN = process.env.FIGMA_TOKEN, FILE_KEY = process.env.FIGMA_FILE_KEY
  if (!TOKEN || !FILE_KEY) { console.error('❌  Missing FIGMA_TOKEN or FIGMA_FILE_KEY in .env'); process.exit(1) }

  console.log('🔄  Fetching Figma variables…   file:', FILE_KEY, '\n')
  const res = await fetch(`https://api.figma.com/v1/files/${FILE_KEY}/variables/local`, { headers: { 'X-Figma-Token': TOKEN } })
  if (!res.ok) { console.error(`❌  Figma API ${res.status}: ${await res.text()}`); process.exit(1) }

  const { meta } = await res.json()
  const allVars     = Object.values(meta.variables)
  const collections = Object.values(meta.variableCollections)
  const varById     = Object.fromEntries(allVars.map((v) => [v.id, v]))
  console.log(`✅  ${allVars.length} variables · ${collections.length} collections\n`)

  const filesOut = {}
  for (const col of collections) {
    const colVars = allVars.filter((v) => v.variableCollectionId === col.id)
    for (const mode of col.modes) {
      const fname = fileFor(col.name, mode.name)
      const tree  = (filesOut[fname] = filesOut[fname] || {})
      for (const v of colVars) {
        const val = resolveValue(v, mode.modeId, varById)
        if (val === null) continue
        setDeep(tree, splitPath(v.name), { $type: tokenType(v.resolvedType, v.name), $value: val })
      }
    }
    console.log(`📦  ${col.name.padEnd(11)} ${String(colVars.length).padStart(4)} vars  → ${col.modes.map((m) => fileFor(col.name, m.name)).join(', ')}`)
  }

  await fs.mkdir(OUT_DIR, { recursive: true })
  const written = []
  for (const [fname, tree] of Object.entries(filesOut)) {
    await fs.writeFile(path.join(OUT_DIR, fname), JSON.stringify(tree, null, 2) + '\n', 'utf-8'); written.push(fname)
  }
  await fs.writeFile(path.join(OUT_DIR, '.meta.json'), JSON.stringify({
    pulledAt: new Date().toISOString(), figmaFile: FILE_KEY, totalVars: allVars.length, written,
    note: 'typography.json/shadows.json มาจาก Figma Styles (Token Press) ไม่ถูก overwrite',
  }, null, 2) + '\n', 'utf-8')

  console.log(`\n✅  เขียน ${written.length} ไฟล์ → ${OUT_DIR}  (ไม่แตะ typography.json / shadows.json)`)
  console.log('▶   ต่อ: npm run tokens:build')
}
main().catch((e) => { console.error('❌  Fatal:', e.message); process.exit(1) })
