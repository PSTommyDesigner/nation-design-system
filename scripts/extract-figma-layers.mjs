#!/usr/bin/env node
/**
 * ดึง "spec ชั้น" ของ component จากไฟล์ออกแบบ Figma ผ่าน REST API
 * แล้วเก็บเป็น tokens/figma-layers/<component>.json ให้ตัว generate CSS อ่านต่อ
 *
 * ทำไมต้องมี (หัวหน้าสั่ง 2026-10-22)
 *   token บอกแค่ "มีตัวแปรอะไร ค่าเท่าไร" แต่ไม่บอกว่า "ใช้ตรงไหน"
 *   ไฟล์ออกแบบบอกครบว่าชั้นไหนผูกตัวแปรอะไร CSS ของ component จึงต้องสร้างจากตรงนี้
 *   ไม่ใช่อ่านด้วยตาแล้วเขียนมือ ซึ่งเคยทำให้เส้นขอบ มุมโค้ง และสีกล่องตัวเลขของ Tag ผิดจากไฟล์ออกแบบ
 *
 * การใช้
 *   node scripts/extract-figma-layers.mjs tag          ดึงตามรายการใน tokens/figma-layers/components.json
 *   npm run figma:layers -- tag
 *
 * ต้องมี FIGMA_TOKEN กับ FIGMA_FILE_KEY ใน .env (แพลน pro ใช้ได้ ไม่ต้อง Enterprise)
 *
 * ⚠️ REST คืน binding เป็น "id" ของตัวแปร ไม่ใช่ชื่อ และ endpoint ที่แปลง id เป็นชื่อ
 *    (/variables/local) ใช้ได้เฉพาะ Enterprise สคริปต์จึงอ่านชื่อจาก tokens/figma-variable-ids.json
 *    ถ้าเจอ id ที่ไม่รู้จัก จะเขียนรายการไว้ที่ tokens/figma-layers/missing-ids.json แล้วหยุด
 *    ให้ agent ดึงชื่อของ id เหล่านั้นผ่าน Figma Plugin API (use_figma) มาเติมในไฟล์ map แล้วรันใหม่
 *
 * รูปแบบ spec ที่ได้ (ย่อให้เล็กพอ commit ได้)
 *   layout   โครงชั้นต่อ "ชุด x ขนาด" อ่านจากตระกูลอ้างอิง (Brand) สถานะ default
 *            ทุกตระกูล ทุกสถานะ ต้องมีโครงเดียวกัน ถ้าไม่เท่ากันจะฟ้องเป็น drift
 *            ชุดที่โครงต่างกันตามแกนโดยตั้งใจ (เช่น checked ของช่องติ๊ก ที่ติ๊กแล้วมีไอคอน ยังไม่ติ๊กไม่มี)
 *            ให้ประกาศ `layoutAxes: ["checked"]` ใน config แล้ว key ของ layout จะเป็น "xs, checked=true"
 *   colors   สี fill/stroke ของทุกชั้น ต่อ "ชุด x ตระกูล x แกนที่ไม่ใช่ขนาด" (สีต้องเท่ากันทุกขนาด)
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const env = Object.fromEntries(
  fs.existsSync(path.join(ROOT, '.env'))
    ? fs.readFileSync(path.join(ROOT, '.env'), 'utf8').split('\n').filter(l => /^[A-Z_]+=/.test(l)).map(l => { const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1).trim().replace(/^"|"$/g, '')] })
    : [],
)
const TOKEN = process.env.FIGMA_TOKEN || env.FIGMA_TOKEN
const FILE = process.env.FIGMA_FILE_KEY || env.FIGMA_FILE_KEY
if (!TOKEN || !FILE) { console.error('ต้องมี FIGMA_TOKEN และ FIGMA_FILE_KEY ใน .env'); process.exit(2) }

const CONFIG = JSON.parse(fs.readFileSync(path.join(ROOT, 'tokens/figma-layers/components.json'), 'utf8'))
const IDS_PATH = path.join(ROOT, 'tokens/figma-variable-ids.json')
const VAR_NAMES = fs.existsSync(IDS_PATH) ? JSON.parse(fs.readFileSync(IDS_PATH, 'utf8')) : {}

const target = process.argv[2]
if (!target || !CONFIG[target]) {
  console.error(`ใช้: node scripts/extract-figma-layers.mjs <${Object.keys(CONFIG).join('|')}>`)
  process.exit(2)
}
const cfg = CONFIG[target]

// --cache = ใช้คำตอบที่เคยดึงไว้ใน node_modules/.cache (ไว้ลองแก้สคริปต์โดยไม่ยิง API ซ้ำ) ห้ามใช้ตอนทำงานจริง
const USE_CACHE = process.argv.includes('--cache')
const CACHE_DIR = path.join(ROOT, 'node_modules/.cache/figma-layers')
fs.mkdirSync(CACHE_DIR, { recursive: true })
const sleep = (ms) => new Promise(r => setTimeout(r, ms))
async function api(p) {
  const cacheFile = path.join(CACHE_DIR, encodeURIComponent(p) + '.json')
  if (USE_CACHE && fs.existsSync(cacheFile)) return JSON.parse(fs.readFileSync(cacheFile, 'utf8'))
  for (let attempt = 0; ; attempt++) {
    const r = await fetch(`https://api.figma.com/v1/files/${FILE}${p}`, { headers: { 'X-Figma-Token': TOKEN } })
    if (r.status === 429 && attempt < 6) {
      // Figma จำกัดจำนวนคำขอต่อนาที รอตาม Retry-After แล้วลองใหม่
      const wait = Number(r.headers.get('retry-after')) * 1000 || 20000 * (attempt + 1)
      process.stderr.write(`  429 รอ ${Math.round(wait / 1000)} วิ แล้วลองใหม่\n`)
      await sleep(wait)
      continue
    }
    if (!r.ok) throw new Error(`Figma API ${r.status} ${p}: ${(await r.text()).slice(0, 200)}`)
    const json = await r.json()
    fs.writeFileSync(cacheFile, JSON.stringify(json))
    return json
  }
}

// ── 1. หา page แล้วหาชุด (COMPONENT_SET) ในเฟรมตระกูล ───────────────────────────
const file = await api('?depth=1')
const page = file.document.children.find(p => p.name === cfg.page)
if (!page) throw new Error(`ไม่พบหน้า "${cfg.page}"`)
const pageTree = (await api(`/nodes?ids=${encodeURIComponent(page.id)}&depth=${cfg.depth ?? 3}`)).nodes[page.id].document

const missing = new Set()
const styleNames = {}
const sets = [] // { family, setName, id }
for (const famName of cfg.families) {
  const fam = pageTree.children.find(n => n.name === famName)
  if (!fam) throw new Error(`ไม่พบเฟรมตระกูล "${famName}" ในหน้า ${cfg.page}`)
  const found = {}
  ;(function walk(n) {
    if (n.type === 'COMPONENT_SET' && cfg.sets.includes(n.name) && !found[n.name]) found[n.name] = n.id
    for (const c of n.children || []) walk(c)
  })(fam)
  for (const s of cfg.sets) {
    // ตระกูลที่เป็น "สี" ต้องมีทุกชุด แต่บางหน้าแยกชุดคนละเฟรม (เช่น Pagination Component Previews กับ Pagination Base Components)
    // จึงยอมให้ชุดหายในบางเฟรม แล้วตรวจตอนท้ายว่าทุกชุดมีอย่างน้อยหนึ่งเฟรม
    if (!found[s]) { if (cfg.families.length === 1) throw new Error(`ตระกูล ${famName} ไม่มีชุด ${s}`); continue }
    sets.push({ family: famName, setName: s, id: found[s] })
  }
}
for (const s of cfg.sets) if (!sets.some(x => x.setName === s)) throw new Error(`ไม่พบชุด ${s} ในเฟรมตระกูลไหนเลย (${cfg.families.join(', ')})`)

// ── 2. ดึงชุดทีละก้อน (เต็มความลึก) ───────────────────────────────────────────
const nodeById = {}
const BATCH = 8
for (let i = 0; i < sets.length; i += BATCH) {
  const chunk = sets.slice(i, i + BATCH)
  const res = await api(`/nodes?ids=${encodeURIComponent(chunk.map(s => s.id).join(','))}`)
  for (const s of chunk) {
    const n = res.nodes[s.id]
    nodeById[s.id] = n.document
    Object.assign(styleNames, Object.fromEntries(Object.entries(n.styles || {}).map(([k, v]) => [k, `${v.styleType.toLowerCase()}::${v.name}`])))
  }
  process.stderr.write(`  ดึงแล้ว ${Math.min(i + BATCH, sets.length)}/${sets.length} ชุด\n`)
}

// ── 3. แปลงโหนดเป็น snapshot ย่อ ───────────────────────────────────────────────
const V = (b) => {
  if (!b || !b.id) return null
  const name = VAR_NAMES[b.id] ?? VAR_NAMES[b.id.replace('VariableID:', '')]
  if (!name) { missing.add(b.id); return `?${b.id}` }
  return name.startsWith('component::') ? name.slice('component::'.length) : name
}
const num = (n, key, raw) => n.boundVariables?.[key] ? V(n.boundVariables[key]) : (raw ?? 0)
const round = (x) => Math.round(x * 100) / 100
const CORNERS = ['RECTANGLE_TOP_LEFT_CORNER_RADIUS', 'RECTANGLE_TOP_RIGHT_CORNER_RADIUS', 'RECTANGLE_BOTTOM_RIGHT_CORNER_RADIUS', 'RECTANGLE_BOTTOM_LEFT_CORNER_RADIUS']

function paints(n, key) {
  const list = (n[key] || []).filter(p => p.visible !== false)
  if (!list.length) return undefined
  const bound = n.boundVariables?.[key] || []
  return list.map((p, i) => p.type === 'SOLID' ? (V(bound[i]) || 'RAW') : p.type)
}

function snap(n, depth = 0) {
  const o = { n: n.name, t: n.type }
  if (n.layoutMode && n.layoutMode !== 'NONE') {
    o.lm = n.layoutMode; o.al = n.primaryAxisAlignItems || 'MIN'; o.ca = n.counterAxisAlignItems || 'MIN'
    o.g = num(n, 'itemSpacing', n.itemSpacing)
    o.p = [num(n, 'paddingTop', n.paddingTop), num(n, 'paddingRight', n.paddingRight), num(n, 'paddingBottom', n.paddingBottom), num(n, 'paddingLeft', n.paddingLeft)]
  }
  if (n.layoutSizingHorizontal) {
    o.s = [n.layoutSizingHorizontal, n.layoutSizingVertical]
    const sizeB = n.boundVariables?.size || {}
    if (n.layoutSizingHorizontal === 'FIXED') o.w = sizeB.x ? V(sizeB.x) : (n.boundVariables?.width ? V(n.boundVariables.width) : round(n.absoluteBoundingBox?.width ?? 0))
    if (n.layoutSizingVertical === 'FIXED') o.h = sizeB.y ? V(sizeB.y) : (n.boundVariables?.height ? V(n.boundVariables.height) : round(n.absoluteBoundingBox?.height ?? 0))
  } else if (n.boundVariables?.size?.x || n.boundVariables?.size?.y) {
    // ลูกที่วางแบบ absolute (ไม่อยู่ใน auto layout เช่น จุดกลางของ radio ไอคอนในกล่องติ๊ก) REST ไม่ให้ layoutSizing
    // และเก็บ binding ขนาดไว้ที่ boundVariables.size.x/y เก็บเฉพาะขนาดที่ผูกตัวแปร ขนาดดิบของพวกนี้ไม่เก็บ
    // เพราะส่วนใหญ่เป็น vector ข้างใน instance ไอคอน
    if (n.boundVariables.size.x) o.w = V(n.boundVariables.size.x)
    if (n.boundVariables.size.y) o.h = V(n.boundVariables.size.y)
  }
  if (n.clipsContent) o.clip = true
  if (n.visible === false) o.vis = false
  const rc = n.boundVariables?.rectangleCornerRadii
  const radii = n.rectangleCornerRadii || (n.cornerRadius != null ? [n.cornerRadius, n.cornerRadius, n.cornerRadius, n.cornerRadius] : null)
  if (rc || (radii && radii.some(x => x))) o.r = CORNERS.map((k, i) => rc?.[k] ? V(rc[k]) : (radii ? radii[i] : 0))
  const f = paints(n, 'fills'); if (f) o.fills = f
  const s = paints(n, 'strokes')
  if (s) {
    o.strokes = s
    const w = n.individualStrokeWeights
    o.sw = w ? [w.top, w.right, w.bottom, w.left] : [n.strokeWeight, n.strokeWeight, n.strokeWeight, n.strokeWeight]
    o.sa = n.strokeAlign
    if (n.strokeDashes && n.strokeDashes.length) o.sd = n.strokeDashes   // เส้นประ (เช่น divider type=dash)
  }
  if (n.styles?.effect) o.fx = styleNames[n.styles.effect] || `?${n.styles.effect}`
  if (n.type === 'TEXT') o.ts = n.styles?.text ? (styleNames[n.styles.text] || `?${n.styles.text}`) : null
  if (n.componentPropertyReferences) o.ref = Object.fromEntries(Object.entries(n.componentPropertyReferences).map(([k, v]) => [k, v.split('#')[0]]))
  if (n.type === 'INSTANCE') o.inst = true
  // ลูกของ instance ไม่ต้องลงลึก (เป็นของ component อื่น) ยกเว้นชั้นแรกเพื่อให้เห็น vector สีไอคอน
  const kids = n.type === 'INSTANCE' ? (n.children || []).slice(0, 1) : (n.children || [])
  if (kids.length && !(n.type === 'INSTANCE' && depth > 2)) o.ch = kids.map(c => snap(c, depth + 1))
  return o
}

// แยก "โครง" (ทุกอย่างยกเว้นสี) กับ "สี" (fills/strokes ของทุกชั้น ไล่ตาม path ชื่อชั้น)
function split(node) {
  const colors = {}
  function strip(o, p) {
    // sw/sa (น้ำหนักกับตำแหน่งเส้นขอบ) และ fx (effect เช่น เงา วงแหวนโฟกัส) ไปอยู่กับสี
    // เพราะเปลี่ยนตามสถานะ (primary ไม่มีขอบ hover เปลี่ยนสีขอบ focused มีวงแหวน tertiary ไม่มีเงา)
    const { fills, strokes, sw, sa, sd, fx, ...rest } = o
    const here = p ? `${p}/${o.n}` : o.n
    const key = here.replace(/^\//, '') || '(root)'
    if (fills || strokes || fx) colors[key] = { ...(fills && { fills }), ...(strokes && { strokes, sw, sa, ...(sd && { sd }) }), ...(fx && { fx }) }
    if (rest.ch) rest.ch = rest.ch.map(c => strip(c, here))
    return rest
  }
  // ชื่อ variant ไม่ใช่ส่วนของโครง และต้องไม่ติดไปใน path ของสี ไม่งั้นเทียบข้ามขนาดไม่ได้
  const root = { ...node, n: '' }
  const layout = strip(root, '')
  delete layout.n
  return { layout, colors }
}

// JSON อ่านง่าย: object ขึ้นบรรทัดใหม่ array (ค่าล้วน) อยู่บรรทัดเดียว
function pretty(v, ind = '') {
  if (Array.isArray(v)) {
    if (v.every(x => typeof x !== 'object' || x === null)) return JSON.stringify(v)
    return '[\n' + v.map(x => ind + ' ' + pretty(x, ind + ' ')).join(',\n') + '\n' + ind + ']'
  }
  if (v && typeof v === 'object') {
    const keys = Object.keys(v)
    if (!keys.length) return '{}'
    return '{\n' + keys.map(k => `${ind} ${JSON.stringify(k)}: ${pretty(v[k], ind + ' ')}`).join(',\n') + '\n' + ind + '}'
  }
  return JSON.stringify(v)
}

function deepDiff(a, b, p = '') {
  const out = []
  if (Array.isArray(a) && Array.isArray(b) && a.length === b.length && typeof a[0] !== 'object') {
    if (JSON.stringify(a) !== JSON.stringify(b)) out.push(`${p}: ${JSON.stringify(a)} → ${JSON.stringify(b)}`)
    return out
  }
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)])
    for (const k of keys) {
      const label = Array.isArray(a) ? `${p}[${a[k]?.n ?? k}]` : (p ? `${p}.${k}` : k)
      if (!(k in a)) out.push(`${label}: (ไม่มี) → ${JSON.stringify(b[k]).slice(0, 80)}`)
      else if (!(k in b)) out.push(`${label}: ${JSON.stringify(a[k]).slice(0, 80)} → (ไม่มี)`)
      else out.push(...deepDiff(a[k], b[k], label))
    }
    return out
  }
  if (a !== b) out.push(`${p}: ${JSON.stringify(a)} → ${JSON.stringify(b)}`)
  return out
}

function parseVariant(name) {
  // ชื่อแกน/ค่าบางหน้ายังเป็นตัวใหญ่ (เช่น Size=xs, State=Default ของหน้า 27) ทำให้เป็นตัวเล็กเพื่อให้ size/state ถูกจับเป็นแกนปกติ
  return Object.fromEntries(name.split(',').map(s => s.trim().split('=')).map(([k, v]) => [k.toLowerCase(), (v ?? '').toLowerCase()]))
}

const out = { capturedAt: new Date().toISOString().slice(0, 10), page: cfg.page, reference: cfg.reference, sets: {} }
// ตระกูลอ้างอิงของแต่ละชุด: ปกติคือ cfg.reference แต่ชุดที่ไม่อยู่ในเฟรมนั้น (แยกเฟรม) ใช้เฟรมแรกที่มีชุดนั้น
const refFamilyOf = {}
for (const s of sets) if (!refFamilyOf[s.setName] || s.family === cfg.reference) refFamilyOf[s.setName] = s.family
const drift = []
for (const s of sets) {
  const set = nodeById[s.id]
  const entry = (out.sets[s.setName] ||= { defs: null, layout: {}, colors: {} })
  if (!entry.defs) {
    entry.defs = Object.fromEntries(Object.entries(set.componentPropertyDefinitions || {}).map(([k, v]) => [k.split('#')[0], v.type === 'VARIANT' ? v.variantOptions : { type: v.type, def: v.defaultValue }]))
  }
  for (const variant of set.children) {
    const axes = parseVariant(variant.name)
    const size = [axes.size || 'one', ...(cfg.layoutAxes || []).map(a => `${a}=${axes[a] ?? ''}`)].join(', ')
    const { layout, colors } = split(snap(variant))
    const key = JSON.stringify(layout, (k, v) => (k === 'ref' ? undefined : v)).replace(/,"clip":true/g, '')
    // ถ้า state เป็นแกนโครง (เช่น option ของ dropdown ที่สถานะ selected มีไอคอนติ๊ก) ทุกสถานะมีโครงอ้างอิงของตัวเอง
    if (s.family === refFamilyOf[s.setName] && ((cfg.layoutAxes || []).includes('state') || (axes.state ?? 'default') === 'default') && (axes['default-gray'] ?? 'false') === 'false' && (!axes.hierarchy || axes.hierarchy === cfg.referenceHierarchy)) {
      entry.layout[size] = layout
    }
    // โครงต้องเท่ากันทุกตระกูลทุกสถานะ ไม่งั้นแปลว่ามีตระกูลที่หลุดจากต้นแบบ
    ;(entry._layoutKeys ||= {})[size] ||= {}
    entry._layoutKeys[size][key] ||= []
    entry._layoutKeys[size][key].push(`${s.family} ${variant.name}`)
    ;(entry._layoutByKey ||= {})[key] = layout
    // สี: เก็บต่อ ตระกูล x แกนอื่นที่ไม่ใช่ size แล้วเช็คว่าทุกขนาดเหมือนกัน
    const colorKey = Object.entries(axes).filter(([k]) => k !== 'size').map(([k, v]) => `${k}=${v}`).join(', ')
    const fam = (entry.colors[s.family] ||= {})
    // เก็บทีละขนาดก่อน แล้วค่อยยุบตอนท้าย: ถ้าทุกขนาดเหมือนกันเก็บใต้ key ที่ไม่มี size
    // ถ้าต่างกัน (เช่น เงาของปุ่ม Alpha โตตามขนาด ตั้งใจ) เก็บแยกใต้ key ที่มี size=
    ;(entry._colorsBySize ||= {})[s.family] ||= {}
    ;(entry._colorsBySize[s.family][colorKey] ||= {})[size] = colors
  }
}
// ยุบสีต่อขนาด
for (const entry of Object.values(out.sets)) {
  for (const [family, combos] of Object.entries(entry._colorsBySize || {})) {
    for (const [colorKey, bySize] of Object.entries(combos)) {
      const vals = Object.values(bySize).map(c => JSON.stringify(c))
      if (vals.every(v => v === vals[0])) entry.colors[family][colorKey] = Object.values(bySize)[0]
      else for (const [size, c] of Object.entries(bySize)) entry.colors[family][`${colorKey ? colorKey + ', ' : ''}size=${size}`] = c
    }
  }
  delete entry._colorsBySize
}
// สรุป drift ของโครง: โครงที่ไม่ตรงกับตระกูลอ้างอิง
for (const [setName, entry] of Object.entries(out.sets)) {
  for (const [size, variantsByKey] of Object.entries(entry._layoutKeys)) {
    const refKey = JSON.stringify(entry.layout[size], (k, v) => (k === 'ref' ? undefined : v)).replace(/,"clip":true/g, '')
    for (const [key, names] of Object.entries(variantsByKey)) {
      if (key !== refKey) {
        const diffs = deepDiff(entry.layout[size], entry._layoutByKey[key])
        drift.push(`โครงต่างจาก ${cfg.reference}: ${setName} size=${size} → ${names.length} แบบ เช่น ${names[0]}\n      ${diffs.slice(0, 6).join('\n      ')}`)
      }
    }
  }
  delete entry._layoutKeys
  delete entry._layoutByKey
}

// ย่อไฟล์: ชุดสีที่ซ้ำกัน (เช่น semi-rounded กับ pill ของตระกูลเดียวกัน) เก็บครั้งเดียวใน palette แล้วอ้างด้วยเลข
out.palette = []
const paletteIndex = new Map()
for (const entry of Object.values(out.sets)) {
  for (const fam of Object.values(entry.colors)) {
    for (const [combo, colors] of Object.entries(fam)) {
      const k = JSON.stringify(colors)
      if (!paletteIndex.has(k)) { paletteIndex.set(k, out.palette.length); out.palette.push(colors) }
      fam[combo] = paletteIndex.get(k)
    }
  }
}

if (missing.size) {
  fs.writeFileSync(path.join(ROOT, 'tokens/figma-layers/missing-ids.json'), JSON.stringify([...missing].sort(), null, 2) + '\n')
  console.error(`✗ มีตัวแปร ${missing.size} ตัวที่ไม่รู้ชื่อ เขียนรายการไว้ที่ tokens/figma-layers/missing-ids.json`)
  console.error('  ให้ดึงชื่อผ่าน use_figma (figma.variables.getVariableByIdAsync) มาเติมใน tokens/figma-variable-ids.json แล้วรันใหม่')
  process.exit(1)
}
const outPath = path.join(ROOT, `tokens/figma-layers/${target}.json`)
fs.writeFileSync(outPath, pretty(out) + '\n')
console.log(`✓ เขียน ${path.relative(ROOT, outPath)} (${Object.keys(out.sets).length} ชุด ${sets.length} ชุดรวมทุกตระกูล)`)
if (drift.length) {
  console.log(`⚠ drift ${drift.length} รายการ (ไฟล์ออกแบบไม่สม่ำเสมอ ต้องแก้ที่ Figma ไม่ใช่ที่โค้ด)`)
  for (const d of drift.slice(0, 40)) console.log('  ' + d)
  if (drift.length > 40) console.log(`  ... อีก ${drift.length - 40} รายการ`)
}
