#!/usr/bin/env node
/**
 * ดึงเอกสารทุกใบของหน้าชั้น Atoms (Identity) ในไฟล์ออกแบบ Figma ผ่าน REST API
 * แล้วเก็บเป็น foundations/<Folder>/<key>-doc.json ให้หน้า Atoms (Identity)/<NN> <Page> ใน Storybook อ่าน
 * หน้าชั้น Molecules เก็บที่ molecules/<Folder>/ ให้หน้า Molecules (Element)/<NN> <Page> อ่าน
 *
 * ทำไมต้องมี (ผู้ใช้สั่ง 2026-10-28 ให้ Storybook มีหน้า Atoms ตามไฟล์ออกแบบ)
 *   เอกสารในไฟล์ออกแบบมีตารางหลายร้อยแถวพร้อมคำอธิบายที่มีแค่ใน Figma
 *   ถ้าพิมพ์ตามด้วยมือจะดริฟต์ทันทีที่ไฟล์ออกแบบเปลี่ยน จึงดึงจากของจริงแล้วรันใหม่เมื่อหน้านั้นเปลี่ยน
 *
 * การใช้
 *   node scripts/extract-figma-atom-doc.mjs color          หน้าที่รองรับอยู่ใน PAGES ข้างล่าง
 *   npm run figma:atom-doc -- typography
 *
 * ต้องมี FIGMA_TOKEN กับ FIGMA_FILE_KEY ใน .env
 *
 * ⚠️ REST คืนตัวแปรเป็น id สคริปต์แปลงเป็นชื่อด้วย tokens/figma-variable-ids.json แบบเดียวกับ extract-figma-layers.mjs
 *    ถ้าเจอ id ที่ไม่รู้จัก จะเขียนรายการไว้ที่ foundations/<Folder>/missing-ids.json แล้วหยุด
 *    ให้ agent ดึงชื่อผ่าน Figma Plugin API (use_figma) มาเติมในไฟล์ map แล้วรันใหม่
 * ⚠️ ตัวแปร CSS และคลาส .ntg-typography-* ที่อ้างถึงต้องมีอยู่จริงใน tokens/output/css ถ้าไม่มีจะหยุดและบอกชื่อที่หาไม่เจอ
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

// หน้าที่ดึงได้ skip คือเอกสารที่ไม่ใช่เนื้อหาของระบบ เช่นชิ้นส่วนทำเอกสาร
const PAGES = {
  color: { page: '01 Color', folder: 'Color', skip: ['Base Components (internal)'] },
  typography: { page: '03 Typography', folder: 'Typography', skip: [] },
  grid: { page: '04 Grid', folder: 'Grid', skip: [] },
  effect: { page: '05 Effect', folder: 'Effect', skip: ['Base Components (internal)'] },
  shape: { page: '06 Shape', folder: 'Shape', skip: [] },
  space: { page: '07 Space', folder: 'Space', skip: [] },
  logo: { page: '08 Logo', folder: 'Logo', skip: [], logos: true },
  // ไม่เอาธงประเทศ (ผู้ใช้สั่ง 2026-10-28) ธงคือต้นฉบับขนาด 32x24 ซึ่งไม่มีกลุ่มอื่นใช้ขนาดนี้
  'third-party': { page: '09 Third-party Logos', folder: 'ThirdPartyLogos', skip: [], logos: true, noLogo: (w, h) => w === 32 && h === 24 },
  // ชั้น Molecules เก็บที่ molecules/ (ผู้ใช้อนุมัติ 2026-11-04) กรอบ 8 ตัวเป็นภาพลายหมากรุก (image fill) ยังไม่มี component ในโค้ด
  // จึง export เป็นไฟล์ภาพทางเดียวกับโลโก้ ใช้ในหน้าเอกสารนี้เท่านั้น เป็น PNG เพราะ SVG ไม่เก็บภาพของกรอบวิดีโอ (ออกมาว่าง)
  frame: { page: '10 Frame', folder: 'Frame', root: 'molecules', skip: [], logos: true, format: 'png' },
}
const KEY = process.argv[2]
if (!PAGES[KEY]) { console.error(`ใช้: node scripts/extract-figma-atom-doc.mjs <${Object.keys(PAGES).join('|')}>`); process.exit(2) }
const PAGE = PAGES[KEY].page
const SKIP = new Set(PAGES[KEY].skip)
const BASE = PAGES[KEY].root ?? 'foundations'
const OUT = path.join(ROOT, `${BASE}/${PAGES[KEY].folder}/${KEY}-doc.json`)
const MISSING = path.join(ROOT, `${BASE}/${PAGES[KEY].folder}/missing-ids.json`)
const TYPO_CLASSES = new Set([...fs.readFileSync(path.join(ROOT, 'tokens/output/css/typography.css'), 'utf8').matchAll(/^\.(ntg-typography-[\w-]+)\s*\{/gm)].map(m => m[1]))
// ชื่อตระกูลฟอนต์ในไฟล์ออกแบบ เป็นตัวแปรตระกูลฟอนต์ฝั่งโค้ด และน้ำหนักเป็นตัวแปรความหนา
const FAMILY_VAR = { Prompt: '--ntg-typography-font-family-primary', Sarabun: '--ntg-typography-font-family-article' }
const WEIGHT_VAR = { 400: '--ntg-typography-font-weight-regular', 500: '--ntg-typography-font-weight-medium', 600: '--ntg-typography-font-weight-bold' }
const VAR_NAMES = JSON.parse(fs.readFileSync(path.join(ROOT, 'tokens/figma-variable-ids.json'), 'utf8'))
const CSS = fs.readFileSync(path.join(ROOT, 'tokens/output/css/variables.css'), 'utf8')
const CSS_VARS = new Set([...CSS.matchAll(/^\s*(--ntg-[\w-]+):/gm)].map(m => m[1]))
// ตัวแปรที่บล็อก [data-theme="dark"] ประกาศทับ และค่าที่ :root ชี้ต่อ ใช้หาว่าช่อง "โหมดมืด" ต้องอ่านตัวแปรไหน
const darkStart = CSS.indexOf('[data-theme="dark"]')
const DARK_VARS = new Set([...CSS.slice(darkStart).matchAll(/^\s*(--ntg-[\w-]+):/gm)].map(m => m[1]))
const ROOT_REFS = Object.fromEntries([...CSS.slice(0, darkStart).matchAll(/^\s*(--ntg-[\w-]+):\s*var\((--ntg-[\w-]+)\)/gm)].map(m => [m[1], m[2]]))
// ตัวแปรของ component (เช่น --ntg-icon-brand-primary) ถูกคำนวณที่ :root ครั้งเดียว ใส่ data-theme="dark" ที่กล่องเล็ก ๆ จึงไม่เปลี่ยนค่า
// ช่องโหมดมืดจึงต้องไล่ var() ลงไปจนเจอตัวแปร semantic ที่บล็อก dark ประกาศทับ ถ้าไม่เจอแปลว่าสีไม่เปลี่ยนตามโหมด
const DARK_REFS = Object.fromEntries([...CSS.slice(darkStart).matchAll(/^\s*(--ntg-[\w-]+):\s*var\((--ntg-[\w-]+)\)/gm)].map(m => [m[1], m[2]]))
// ชื่อสีดิบปลายทาง เช่น --ntg-color-text-brand-primary ไล่ไปจนเจอ --ntg-color-brand-600 ได้ป้าย brand-600
// ป้ายในตารางของไฟล์ออกแบบเป็นข้อความที่พิมพ์ไว้ บางแถวไม่ตรงกับตัวแปรจริงแล้ว จึงอ่านป้ายจากตัวแปรแทน
function primitiveOf(cssVar, dark) {
  let v = cssVar
  for (let i = 0; i < 12; i++) {
    const next = (dark && DARK_REFS[v]) || ROOT_REFS[v]
    if (!next) break
    v = next
  }
  return v.replace(/^--ntg-color-/, '').replace(/^base-(white|black)$/, 'base-$1-100')
}
function darkVarOf(cssVar) {
  for (let v = cssVar, i = 0; v && i < 10; v = ROOT_REFS[v], i++) if (DARK_VARS.has(v)) return v
  return cssVar
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms))
async function api(p) {
  for (let attempt = 0; ; attempt++) {
    const r = await fetch(`https://api.figma.com/v1/files/${FILE}${p}`, { headers: { 'X-Figma-Token': TOKEN } })
    if (r.status === 429 && attempt < 6) {
      const wait = Number(r.headers.get('retry-after')) * 1000 || 20000 * (attempt + 1)
      process.stderr.write(`  429 รอ ${Math.round(wait / 1000)} วิ แล้วลองใหม่\n`)
      await sleep(wait)
      continue
    }
    if (!r.ok) throw new Error(`Figma API ${r.status} ${p}: ${(await r.text()).slice(0, 200)}`)
    return r.json()
  }
}

const missing = new Set()
const stale = []
const badVars = []
// ชื่อตัวแปร Figma เป็นตัวแปร CSS เช่น color/text/brand/primary เป็น --ntg-color-text-brand-primary
function cssVarOf(node, where) {
  const id = node?.boundVariables?.fills?.[0]?.id
  if (!id) return null
  const key = id.replace(/^VariableID:/, '')
  const full = VAR_NAMES[key]
  if (!full) { missing.add(key); return null }
  const name = full.split('::')[1]
  const cssVar = '--ntg-' + name.replace(/\//g, '-')
  if (!CSS_VARS.has(cssVar)) badVars.push(`${where}: ${full} เป็น ${cssVar} ไม่มีใน variables.css`)
  return cssVar
}
// ชั้นที่ซ่อนไว้ (visible: false) ไม่ใช่เนื้อหา เช่น supporting text ที่ปิดอยู่ในเซลตาราง
const findAll = (n, pred, acc = []) => { if (n.visible === false) return acc; if (pred(n)) acc.push(n); for (const k of n.children ?? []) findAll(k, pred, acc); return acc }
// "Supporting text" คือข้อความตัวอย่างของเซลตาราง หน้า 01 ซ่อนแล้ว (2026-11-03) แต่หน้าอื่นอาจยังค้าง จึงไม่นับเป็นเนื้อหา
const PLACEHOLDER = new Set(['Supporting text'])
const texts = (n) => findAll(n, x => x.type === 'TEXT' && !PLACEHOLDER.has(x.characters.trim())).map(x => x.characters)
const fontSize = (n) => n.style?.fontSize ?? 0
const isCell = (n) => /-(table|color)-cell$|color-badge$/.test(n.name)
const rampSteps = (ramp) => [...CSS_VARS].map(v => v.match(new RegExp(`^--ntg-color-${ramp}-(\\d+)$`))?.[1]).filter(Boolean).map(Number).sort((a, b) => a - b)

const ROOT_VALUES = Object.fromEntries([...CSS.slice(0, darkStart).matchAll(/^\s*(--ntg-[\w-]+):\s*([^;]+);/gm)].map(m => [m[1], m[2].trim()]))
// ชื่อภาพ grid ใน Figma เป็นชื่อชุด token เช่น nation-platform-2023-full-hd เป็น --ntg-grid-nation-digital-fullhd-*
const GRID_SYSTEM = { 'nation-group-2022': 'v2022', 'nation-platform-2023': 'nation-digital', 'nation-group-2026': 'v2026' }
const GRID_DEVICE = { 'full-hd': 'fullhd', desktop: 'desktop', 'tablet-horizontal': 'tablet-h', 'tablet-vertical': 'tablet-v', mobile: 'mobile' }
const gridMismatch = []
function needVar(v, where) { if (!CSS_VARS.has(v)) badVars.push(`${where}: ${v} ไม่มีใน variables.css`); return v }
const effectMismatch = []
const spaceMismatch = []
// ต้นฉบับโลโก้ที่เอกสารใช้ ชื่อไฟล์ -> id ของ component แม่ เก็บไว้ export เป็น SVG ตอนท้าย (ผู้ใช้ตัดสิน 2026-11-02 ให้ไฟล์อยู่เฉพาะหน้าเอกสาร)
const logoFiles = new Map()
const isLogo = (n) => Boolean(PAGES[KEY].logos) && (n.type === 'COMPONENT' || n.type === 'INSTANCE') && !/header|info-card|-cell$/i.test(n.name)
const isExcludedLogo = (n) => { const b = n?.absoluteBoundingBox; return Boolean(b && PAGES[KEY].noLogo?.(Math.round(b.width), Math.round(b.height))) }
const logoOf = (n) => n.children?.find(isLogo) ?? n.children?.find(c => c.name === 'box')?.children?.find(isLogo)
// ขนาดอ่านจากชิ้นงานจริง ตัวอย่างที่ผิดตั้งใจยืดสัดส่วน ขนาดจึงต่างจากต้นฉบับได้
function logoBlock(n, label, frame) {
  // ชื่อต้นฉบับซ้ำกันได้ เช่น c++ กับ c# หรือธง 2 ชิ้นชื่อเดียวกัน ไฟล์จึงแยกตาม id ของต้นฉบับ
  const id = n.componentId ?? n.id
  const base = n.name.replace(/[^a-z0-9-]+/gi, '-')
  let file = base
  for (let i = 2; logoFiles.has(file) && logoFiles.get(file) !== id; i++) file = `${base}-${i}`
  logoFiles.set(file, id)
  const { width, height } = n.absoluteBoundingBox
  // ในตารางต้นฉบับโลโก้วางบนกล่องพื้นสี ความกว้างกล่องกับช่องอ่านจากไฟล์ออกแบบ ส่วนภาพตัวอย่างในเอกสารวางลอย
  const box = frame?.children?.find(c => c.name === 'box')?.absoluteBoundingBox.width
  return { type: 'logo', file, label, width: Math.round(width), height: Math.round(height), ...(box ? { box: Math.round(box), cell: Math.round(frame.absoluteBoundingBox.width) } : {}) }
}
// แถวสเกลระยะห่าง ชื่อตัวแปร + ค่า + แถบความยาว ชื่อและค่าที่แสดงมาจาก token ส่วนตัวเลขในไฟล์ออกแบบใช้เทียบเท่านั้น
const isSpaceRow = (n) => n.type === 'FRAME' && n.children?.some(c => c.name === 'track') && /^size\/space\//.test(n.children?.find(c => c.type === 'TEXT')?.characters.trim() ?? '')
function spaceBlock(n, where) {
  const [nameNode, pxNode, usageNode] = n.children.filter(c => c.type === 'TEXT')
  const name = nameNode.characters.trim()
  const cssVar = needVar('--ntg-' + name.replace(/\//g, '-'), where)
  const px = parseFloat(ROOT_VALUES[cssVar])
  const bar = findAll(n.children.find(c => c.name === 'track'), x => x.name === 'bar')[0]
  const figPx = parseFloat(pxNode.characters)
  if (figPx !== px) spaceMismatch.push(`${where}: ${name} ป้ายเขียน ${figPx} token ${px}`)
  if ((bar ? Math.round(bar.absoluteBoundingBox.width) : 0) !== px) spaceMismatch.push(`${where}: ${name} แถบยาว ${bar ? Math.round(bar.absoluteBoundingBox.width) : 0} token ${px}`)
  return { type: 'space', name, cssVar, value: ROOT_VALUES[cssVar], usage: usageNode?.characters.trim() ?? '', fill: bar ? cssVarOf(bar, `${where} ${name}`) : null }
}
// ชื่อ effect style ในไฟล์ออกแบบ จับคู่กับตัวแปร CSS
function effectOf(styleName) {
  let m
  if ((m = styleName.match(/^Shadows\/(Bottom|Top|Center)\/(xs|sm|md|lg|xl)$/))) return { kind: 'shadow', cssVar: `--ntg-shadows-${m[1].toLowerCase()}-${m[2]}` }
  if ((m = styleName.match(/^Background Blur\/(xs|sm|md|lg|xl)$/))) return { kind: 'blur', cssVar: `--ntg-effect-background-blur-${m[1]}` }
  if ((m = styleName.match(/^focused-ring\/(\w+)-focused-ring$/))) return { kind: 'ring', cssVar: `--ntg-focused-ring-${m[1]}` }
  return null
}
// เทียบค่าเอฟเฟคในไฟล์ออกแบบกับค่าของตัวแปร CSS ถ้าไม่ตรงจดไว้ ไม่หยุด
function checkEffect(where, kind, cssVar, fx) {
  const css = ROOT_VALUES[cssVar] ?? ''
  if (!fx) { effectMismatch.push(`${where}: ไม่เจอเอฟเฟคในภาพ`); return }
  if (kind === 'blur') {
    if (fx.radius !== parseFloat(css)) effectMismatch.push(`${where}: เบลอ ไฟล์ออกแบบ ${fx.radius} token ${css}`)
    return
  }
  const m = css.match(/^(-?[\d.]+)px (-?[\d.]+)px (-?[\d.]+)px (-?[\d.]+)px rgba\((\d+), (\d+), (\d+), ([\d.]+)\)/)
  if (!m) { effectMismatch.push(`${where}: อ่านค่า ${cssVar} ไม่ได้ (${css})`); return }
  const c = fx.color ?? {}
  const fig = [fx.offset?.x ?? 0, fx.offset?.y ?? 0, fx.radius ?? 0, fx.spread ?? 0, Math.round(c.r * 255), Math.round(c.g * 255), Math.round(c.b * 255), Math.round(c.a * 100) / 100]
  const tok = m.slice(1).map(Number)
  if (fig.some((v, i) => v !== tok[i])) effectMismatch.push(`${where}: ไฟล์ออกแบบ ${fig.join(' ')} token ${tok.join(' ')}`)
}
const STYLE_NAME = /^[a-z]+(-[a-z]+)*(\/[a-z0-9-]+)+$/

// มุมโค้ง (06 Shape) REST เก็บ binding ของมุมไว้ที่ rectangleCornerRadii หรือแยกต่อมุม
const CORNER_KEYS = [['RECTANGLE_TOP_LEFT_CORNER_RADIUS', 'topLeftRadius'], ['RECTANGLE_TOP_RIGHT_CORNER_RADIUS', 'topRightRadius'], ['RECTANGLE_BOTTOM_RIGHT_CORNER_RADIUS', 'bottomRightRadius'], ['RECTANGLE_BOTTOM_LEFT_CORNER_RADIUS', 'bottomLeftRadius']]
const radiusMismatch = []
function radiusVars(n, where) {
  const bv = n.boundVariables ?? {}
  const radii = n.rectangleCornerRadii ?? (n.cornerRadius != null ? [n.cornerRadius, n.cornerRadius, n.cornerRadius, n.cornerRadius] : [0, 0, 0, 0])
  return CORNER_KEYS.map(([rest, plugin], i) => {
    const id = (bv.rectangleCornerRadii?.[rest] ?? bv[plugin])?.id
    if (!id) return { figma: radii[i], name: null, cssVar: null }
    const key = id.replace(/^VariableID:/, '')
    const full = VAR_NAMES[key]
    if (!full) { missing.add(key); return { figma: radii[i], name: null, cssVar: null } }
    const name = full.split('::')[1]
    const cssVar = '--ntg-' + name.replace(/\//g, '-')
    if (!CSS_VARS.has(cssVar)) { radiusMismatch.push(`${where}: ตัวแปร ${name} ใน Figma ไม่มีในโค้ด (${cssVar})`); return { figma: radii[i], name, cssVar: null } }
    if (parseFloat(ROOT_VALUES[cssVar]) !== radii[i]) radiusMismatch.push(`${where}: ${name} ไฟล์ออกแบบ ${radii[i]} token ${ROOT_VALUES[cssVar]}`)
    return { figma: radii[i], name, cssVar }
  })
}
// กล่องตัวอย่างมุมโค้งหนึ่งขั้น = เฟรมที่มีลูกชื่อ swatch กับข้อความกำกับ
const isRadiusSample = (n) => n.type === 'FRAME' && n.children?.some(c => c.name === 'swatch' && c.type === 'FRAME') && n.children.some(c => c.type === 'TEXT')
function radiusBlock(n, where) {
  const sw = n.children.find(c => c.name === 'swatch')
  const corners = radiusVars(sw, `${where} ${n.name}`)
  const [label = '', meta = ''] = texts(n).map(t => t.trim())
  // ชื่อตัวแปรที่พิมพ์ในไฟล์ออกแบบต้องตรงกับตัวแปรที่ผูกจริง ถ้าไม่ตรงจดเป็นงานค้างของหน้านั้น
  const real = corners[0].name?.replace(/\/(top|bottom)-(left|right)(?=\/|$)/, '') ?? null
  // ป้ายย่อขั้นขนาดได้ เช่น input/radius แทน input/radius/md ถือว่าตรง ถ้าชื่อ component ต่างกันจึงจด
  if (real && !real.startsWith(label)) { const msg = `${where}: ป้าย ${label} ตัวแปรที่ผูกจริงคือ ${real}`; if (!stale.includes(msg)) stale.push(msg) }
  return { type: 'radius', step: n.name, label: real ?? label, meta, corners: corners.map(c => c.cssVar), figma: corners.map(c => c.figma), fill: cssVarOf(sw, `${where} ${n.name}`), stroke: strokeVarOf(sw) }
}
const strokeVarOf = (n) => {
  const id = n?.boundVariables?.strokes?.[0]?.id
  const full = id && VAR_NAMES[id.replace(/^VariableID:/, '')]
  return full ? '--ntg-' + full.split('::')[1].replace(/\//g, '-') : null
}
// ภาพหลักการกล่องซ้อน (Nested Radius) มุมโค้งเป็นตัวเลขใหญ่เพื่อให้เห็นความต่าง ไม่ใช่ค่าจริงของระบบ
// จึงเก็บค่าจากไฟล์ออกแบบตรง ๆ (ผู้ใช้ตัดสิน 2026-11-02) สีพื้นยังอ่านจากตัวแปร

// ภาพเอฟเฟค = INSTANCE หรือ COMPONENT ที่มีกล่อง Preview และป้าย Info บอกชื่อ effect style
const isEffect = (n) => (n.type === 'INSTANCE' || n.type === 'COMPONENT') && n.children?.some(c => c.name === 'Preview') && n.children.some(c => c.name === 'Info' && effectOf(texts(c)[0]?.trim() ?? ''))
function effectBlock(n, where, label) {
  const style = texts(n.children.find(c => c.name === 'Info'))[0].trim()
  const { kind, cssVar } = effectOf(style)
  needVar(cssVar, `${where} ${style}`)
  const preview = n.children.find(c => c.name === 'Preview')
  // วงแหวนโฟกัสในไฟล์ออกแบบอยู่ที่ปุ่มข้างในกล่อง Preview ส่วนเงากับเบลออยู่ที่กล่องเอง
  const fx = findAll(preview, x => x.effects?.some(e => e.visible !== false))[0]?.effects.find(e => e.visible !== false)
  checkEffect(`${where} ${style}`, kind, cssVar, fx)
  return { type: 'effect', kind, style, cssVar, label }
}

function extract(doc) {
  const out = { id: doc.id, name: doc.name, title: '', subtitle: '', blocks: [] }
  // หัวข้อ Base component (internal) เก็บชิ้นส่วนทำเอกสาร เช่นป้ายตัวเลขของภาพ grid ไม่ใช่เนื้อหา จึงข้ามจนถึงหัวข้อถัดไป
  let skipping = false
  const push = (b) => {
    if (b.type === 'h') skipping = /base component/i.test(b.text)
    if (skipping) return
    // แถวสีติดกันรวมเป็นตารางเดียว
    const last = out.blocks[out.blocks.length - 1]
    if (b.type === 'colorRow') {
      if (last?.type === 'colorTable') { last.rows.push(b.row); return }
      out.blocks.push({ type: 'colorTable', rows: [b.row] }); return
    }
    // ภาพเอฟเฟคที่อยู่ติดกันรวมเป็นแถวเดียว
    if (b.type === 'effect') {
      if (last?.type === 'effects') { last.items.push(b); return }
      out.blocks.push({ type: 'effects', items: [b] }); return
    }
    // กล่องมุมโค้งที่อยู่ติดกันรวมเป็นแถวเดียว ภาพกล่องซ้อนถูกผิดก็เช่นกัน
    if (b.type === 'radius') {
      if (last?.type === 'radii') { last.items.push(b); return }
      out.blocks.push({ type: 'radii', items: [b] }); return
    }
    if (b.type === 'space') {
      if (last?.type === 'spaces') { last.items.push(b); return }
      out.blocks.push({ type: 'spaces', items: [b] }); return
    }
    if (b.type === 'logo') {
      if (last?.type === 'logos') { last.items.push(b); return }
      out.blocks.push({ type: 'logos', items: [b] }); return
    }
    if (b.type === 'nested') {
      if (last?.type === 'nestedPair') { last.items.push(b); return }
      out.blocks.push({ type: 'nestedPair', items: [b] }); return
    }
    out.blocks.push(b)
  }
  ;(function walk(n) {
    if (n.visible === false) return
    if (n.type === 'INSTANCE' && /header/i.test(n.name) && !out.title && !isCell(n)) {
      // หัวเอกสาร _document-header อ่านชื่อเรื่องและคำอธิบายใต้ชื่อ
      const t = findAll(n, x => x.type === 'TEXT')
      out.title = t.find(x => fontSize(x) >= 40)?.characters ?? doc.name
      const sub = t.find(x => fontSize(x) < 40)?.characters ?? ''
      out.subtitle = sub === 'Supporting text' ? '' : sub
      return
    }
    if (n.type === 'INSTANCE' && /info-card$/.test(n.name)) {
      const kind = n.name.replace(/-info-card$/, '')
      const t = findAll(n, x => x.type === 'TEXT')
      const title = t.find(x => x.name === 'title')?.characters ?? ''
      const body = t.find(x => x.name === 'body')?.characters ?? ''
      push({ type: 'card', kind, title, body })
      return
    }
    if (n.type === 'FRAME' && n.name === 'row' && n.children?.some(c => c.name === 'hierarchy-color-cell')) {
      const get = (nm) => n.children.find(c => c.name === nm)
      const h = get('hierarchy-color-cell'), l = get('light-color-cell'), d = n.children.find(c => /dark/i.test(c.name)), ds = get('description-color-cell')
      const [no, name] = texts(h)
      const level = (h.componentProperties?.type?.value ?? '').toString() || 'primary'
      const swatch = findAll(l, x => x.name === 'color' && x.boundVariables?.fills)[0]
      const cssVar = cssVarOf(swatch, name)
      push({ type: 'colorRow', row: { no, name, level, light: texts(l).join(' '), dark: d ? texts(d).join(' ') : '', description: ds ? texts(ds).join(' ') : '', cssVar, darkVar: darkVarOf(cssVar) } })
      const row = out.blocks[out.blocks.length - 1].rows.at(-1)
      row.light = primitiveOf(cssVar, false)
      row.dark = primitiveOf(row.darkVar, true)
      const figmaLight = texts(l).join(' '), figmaDark = d ? texts(d).join(' ') : ''
      if (figmaLight !== row.light || figmaDark !== row.dark) stale.push(`${doc.name}: ${name} ไฟล์ออกแบบเขียน ${figmaLight} / ${figmaDark} ตัวแปรจริงคือ ${row.light} / ${row.dark}`)
      return
    }
    if (n.type === 'FRAME' && n.children?.length && n.children.every(c => c.type === 'FRAME' && c.children?.some(isCell)) && n.children.some(c => c.children.some(x => /table-cell$/.test(x.name)))) {
      // ตาราง = เฟรมที่ลูกทุกตัวเป็นแถวของเซล แถวแรกเป็นหัวตาราง
      const rows = n.children.map(r => r.children.filter(isCell).map(c => texts(c).join(' ')))
      push({ type: 'table', head: rows[0], rows: rows.slice(1) })
      return
    }
    if (n.type === 'FRAME' && n.children?.some(c => c.type === 'INSTANCE' && c.name === 'light-color-cell') && !n.children.some(c => c.name === 'hierarchy-color-cell')) {
      // แถวตัวอย่างสีแบบไม่มีลำดับ เช่น ตัวอย่างจริงของ Interaction States
      const items = n.children.filter(c => c.name === 'light-color-cell').map(c => ({ label: texts(c).join(' '), cssVar: cssVarOf(findAll(c, x => x.name === 'color' && x.boundVariables?.fills)[0], c.id) }))
      push({ type: 'swatches', items })
      return
    }
    if (n.type === 'FRAME' && n.children?.some(c => c.type === 'TEXT' && c.styles?.text) && n.children.some(c => c.type === 'FRAME' && c.name === 'info' && STYLE_NAME.test(texts(c)[0]?.trim() ?? ''))) {
      // ตัวอย่างของ text style หนึ่งตัว ข้อความตัวอย่าง + ชื่อสไตล์ ค่า และที่ใช้ (หน้า Text Roles)
      const sample = n.children.find(c => c.type === 'TEXT').characters
      const [style, meta = '', usage = ''] = texts(n.children.find(c => c.name === 'info'))
      const cls = 'ntg-typography-' + style.trim().replace(/\//g, '-')
      if (!TYPO_CLASSES.has(cls)) badVars.push(`${doc.name}: ${style} เป็นคลาส .${cls} ไม่มีใน typography.css`)
      push({ type: 'specimen', sample, style: style.trim(), className: cls, meta, usage })
      return
    }
    if (n.type === 'FRAME' && n.children?.length === 2 && n.children.every(c => c.type === 'TEXT') && /^[a-z0-9-]+ \d+\/\d+$/.test(n.children[0].characters.trim())) {
      // ขั้นหนึ่งของชุดขนาดพื้นฐาน เช่น "h1 64/94" ตามด้วยข้อความตัวอย่างขนาดนั้น (หน้า Type Scale)
      const [name, spec] = n.children[0].characters.trim().split(' ')
      const sample = n.children[1]
      push({ type: 'scale', name, spec, sample: sample.characters, family: needVar(FAMILY_VAR[sample.style.fontFamily], name), size: needVar(`--ntg-typography-font-size-${name}`, name), lineHeight: needVar(`--ntg-typography-line-height-${name}`, name) })
      return
    }
    if (n.type === 'FRAME' && findAll(n, x => x.type === 'TEXT' && x.characters === 'Aa').length >= 2 && findAll(n, x => x.type === 'TEXT' && fontSize(x) >= 40 && !x.styles?.text).length === 1) {
      // ตระกูลฟอนต์ ชื่อ + ข้อความตัวอย่าง + น้ำหนักที่มี (หน้า Type Scale)
      const all = findAll(n, x => x.type === 'TEXT')
      const big = all.find(x => fontSize(x) >= 40)
      const weights = all.filter(x => x.characters === 'Aa').map(x => ({ label: all[all.indexOf(x) + 1]?.characters ?? '', weight: needVar(WEIGHT_VAR[x.style.fontWeight], big.characters) }))
      const rest = all.filter(x => x !== big && x.characters !== 'Aa' && !weights.some(w => w.label === x.characters)).map(x => x.characters)
      push({ type: 'fontFamily', sample: big.characters, family: needVar(FAMILY_VAR[big.style.fontFamily], big.characters), title: rest[0] ?? '', usage: rest.slice(1).join(' '), weights })
      return
    }
    if (n.type === 'FRAME' && n.name === 'cell' && /^[\u2705\u274c]/.test(n.children?.find(c => c.type === 'TEXT')?.characters ?? '')) {
      // คู่ถูกผิดของหน้า Effect ข้อความ + ภาพเอฟเฟคในแถวเดียวกัน
      const t = n.children.find(c => c.type === 'TEXT').characters
      const effects = findAll(n, isEffect).map(x => effectBlock(x, doc.name, ''))
      const logos = n.children.filter(isLogo).map(x => logoBlock(x, ''))
      push({ type: 'card', kind: t.startsWith('\u2705') ? 'do' : 'dont', title: '', body: t.replace(/^[\u2705\u274c]\s*(ถูก|ผิด)?\s*/, ''), effects, logos })
      return
    }
    if (n.type === 'FRAME' && n.name === 'item' && n.children?.some(isEffect)) {
      // ภาพเอฟเฟคหนึ่งตัวพร้อมคำบรรยายด้านบน
      const label = n.children.find(c => c.type === 'TEXT')?.characters ?? ''
      push(effectBlock(n.children.find(isEffect), doc.name, label))
      return
    }
    if (isEffect(n)) { push(effectBlock(n, doc.name, '')); return }
    if (isRadiusSample(n)) { push(radiusBlock(n, doc.name)); return }
    // หัวข้อและกริดของกลุ่มที่ไม่เอาข้ามทั้งชุด ส่วนภาพตัวอย่างในเอกสารเหลือแค่คำบรรยาย
    if (n.type === 'FRAME' && n.children?.some(c => c.name === 'grid' && logoOf(c.children?.[0] ?? {}) && isExcludedLogo(logoOf(c.children[0])))) return
    if (n.type === 'FRAME' && logoOf(n) && isExcludedLogo(logoOf(n))) { push({ type: 'logo', file: null, label: n.children.find(c => c.type === 'TEXT').characters.trim(), width: 0, height: 0 }); return }
    if (n.type === 'FRAME' && logoOf(n) && n.children.some(c => c.type === 'TEXT')) { push(logoBlock(logoOf(n), n.children.find(c => c.type === 'TEXT').characters.trim(), n)); return }
    if (PAGES[KEY].logos && n.type === 'FRAME' && n.name === 'item' && n.children?.length === 1 && n.children[0].type === 'TEXT') { push({ type: 'logo', file: null, label: n.children[0].characters.trim(), width: 0, height: 0 }); return }
    if (isSpaceRow(n)) { push(spaceBlock(n, doc.name)); return }
    if (n.type === 'FRAME' && n.children?.some(c => c.name === 'outer-box' && c.children?.some(x => x.name === 'inner-box'))) {
      const outer = n.children.find(c => c.name === 'outer-box'), inner = outer.children.find(c => c.name === 'inner-box')
      const [title = '', caption = ''] = n.children.filter(c => c.type === 'TEXT').map(c => c.characters.trim())
      const r = (x) => x.rectangleCornerRadii?.[0] ?? x.cornerRadius ?? 0
      push({ type: 'nested', kind: /wrong/.test(n.name) ? 'dont' : 'do', title, caption, outer: r(outer), inner: r(inner), outerFill: cssVarOf(outer, `${doc.name} outer-box`), innerFill: cssVarOf(inner, `${doc.name} inner-box`) })
      return
    }
    if ((n.type === 'INSTANCE' || n.type === 'COMPONENT') && n.layoutGrids?.some(g => g.pattern === 'COLUMNS')) {
      // ภาพ grid หนึ่งขนาดจอ คอลัมน์ ร่อง และขอบอ่านจาก token ส่วนความกว้างแคนวาสเก็บจากไฟล์ออกแบบ (ผู้ใช้ตัดสิน 2026-11-02
      // เพราะมือถือรุ่น 2026 ออกแบบบนแคนวาส 360 ซึ่งไม่มี token) ตัวเลขกำกับในภาพไม่ใช่เนื้อหา จึงไม่อ่าน
      const m = n.name.match(/^(nation-(?:group|platform)-\d{4})-(.+)$/)
      const prefix = m && GRID_SYSTEM[m[1]] && GRID_DEVICE[m[2]] ? `--ntg-grid-${GRID_SYSTEM[m[1]]}-${GRID_DEVICE[m[2]]}` : null
      if (!prefix) { badVars.push(`${doc.name}: ภาพ grid ${n.name} จับคู่กับชุด token ไม่ได้`); return }
      const col = n.layoutGrids.find(g => g.pattern === 'COLUMNS')
      const canvas = Math.round(n.absoluteBoundingBox.width)
      const token = (k) => CSS_VARS.has(`${prefix}-${k}`) ? `${prefix}-${k}` : null
      const b = { type: 'grid', name: n.name, canvas, stretch: col.alignment === 'STRETCH', columns: needVar(`${prefix}-columns`, n.name), gutter: needVar(`${prefix}-gutter`, n.name), margin: needVar(`${prefix}-margin`, n.name), container: token('container'), columnWidth: token('column-width') }
      // เทียบค่าในไฟล์ออกแบบกับ token ถ้าไม่ตรงจดไว้ ไม่หยุด เพราะเป็นงานของคนดูแล token
      const px = (v) => parseFloat(ROOT_VALUES[v])
      const figMargin = col.alignment === 'STRETCH' ? col.offset : (canvas - (col.count * col.sectionSize + (col.count - 1) * col.gutterSize)) / 2
      const pairs = [['columns', col.count, px(b.columns)], ['gutter', col.gutterSize, px(b.gutter)], ['margin', figMargin, px(b.margin)]]
      if (b.columnWidth) pairs.push(['column-width', col.sectionSize, px(b.columnWidth)])
      for (const [k, fig, tok] of pairs) if (fig !== tok) gridMismatch.push(`${doc.name}: ${n.name} ${k} ไฟล์ออกแบบ ${fig} token ${tok}`)
      push(b)
      return
    }
    if (n.type === 'TEXT') {
      const s = n.characters.trim()
      const ramp = s.match(/^(.+?) : color\/([\w-]+)$/)
      if (ramp) {
        // แรมป์สีดิบ ใช้ขั้นจากตัวแปร CSS จริง ไม่ใช่ตัวเลขที่พิมพ์ในไฟล์
        push({ type: 'ramp', label: ramp[1], path: `color/${ramp[2]}`, steps: rampSteps(ramp[2]).map(step => ({ step, cssVar: `--ntg-color-${ramp[2]}-${step}` })) })
        return
      }
      const fs_ = fontSize(n)
      // ชื่อกลุ่มที่อยู่เหนือแถวสเกลระยะห่างเป็นหัวข้อย่อย ไม่ใช่ย่อหน้า
      if (n.parent?.children?.some(isSpaceRow)) { push({ type: 'h3', text: s }); return }
      // ข้อความเล็กกว่า 14 คือป้ายกำกับในภาพตัวอย่าง ไม่ใช่เนื้อหา ยกเว้นย่อหน้าท้ายบล็อกที่เป็นคำอธิบาย 14
      if (fs_ < 14 || /^#[0-9A-F]{6}$/i.test(s) || /^\d+$/.test(s)) return
      if (fs_ >= 24) push({ type: 'h', text: s })
      else if (fs_ === 18) push({ type: 'h3', text: s })
      else {
        const last = out.blocks[out.blocks.length - 1]
        // ข้อความ 20px ที่ตามหลังหัวข้อทันทีคือคำอธิบายใต้หัวข้อ
        if (last?.type === 'h' && n.parent?.type === 'FRAME' && fs_ === 20 && !last.sub) { last.sub = s; return }
        push({ type: 'p', text: s })
      }
      return
    }
    for (const k of n.children ?? []) { k.parent = n; walk(k) }
  })(doc)
  if (!out.title) out.title = doc.name
  return out
}

const file = await api('?depth=2')
const page = file.document.children.find(p => p.name === PAGE)
if (!page) throw new Error(`ไม่พบหน้า "${PAGE}"`)
const frames = page.children.filter(c => c.type === 'FRAME' && !SKIP.has(c.name)).sort((a, b) => a.absoluteBoundingBox.x - b.absoluteBoundingBox.x)
const res = await api(`/nodes?ids=${encodeURIComponent(frames.map(f => f.id).join(','))}`)
const documents = frames.map(f => extract(res.nodes[f.id].document))

fs.mkdirSync(path.dirname(OUT), { recursive: true })
if (logoFiles.size) {
  // export ทีละ 20 ตัว ไฟล์ SVG เก็บข้างเอกสาร ใช้แสดงในหน้าเอกสารเท่านั้น สีโลโก้เป็นอัตลักษณ์จึงเป็นค่าดิบโดยตั้งใจ
  const dir = path.join(path.dirname(OUT), 'assets')
  fs.mkdirSync(dir, { recursive: true })
  const entries = [...logoFiles]
  const FORMAT = PAGES[KEY].format ?? 'svg'
  for (let i = 0; i < entries.length; i += 20) {
    const part = entries.slice(i, i + 20)
    let r
    for (let attempt = 0; ; attempt++) {
      r = await fetch(`https://api.figma.com/v1/images/${FILE}?format=${FORMAT}${FORMAT === 'png' ? '&scale=2' : ''}&ids=${encodeURIComponent(part.map(e => e[1]).join(','))}`, { headers: { 'X-Figma-Token': TOKEN } })
      if (r.status !== 429 || attempt >= 6) break
      await sleep(Number(r.headers.get('retry-after')) * 1000 || 20000 * (attempt + 1))
    }
    if (!r.ok) throw new Error(`Figma images ${r.status}: ${(await r.text()).slice(0, 200)}`)
    const { images } = await r.json()
    for (const [file, id] of part) {
      if (!images[id]) throw new Error(`export ${file} ไม่ได้`)
      const body = await fetch(images[id])
      fs.writeFileSync(path.join(dir, `${file}.${FORMAT}`), FORMAT === 'svg' ? await body.text() : Buffer.from(await body.arrayBuffer()))
    }
  }
  // ตัวอย่างที่ตั้งใจยืดผิดสัดส่วน SVG ในเบราว์เซอร์จะรักษาสัดส่วนเอง จึงเก็บความกว้างจริงของไฟล์ไว้ให้หน้าเอกสารยืดด้วย transform
  // PNG ใน <img> ยืดตามความกว้างความสูงที่ตั้งอยู่แล้ว จึงต้องหาความกว้างจริงเฉพาะ SVG
  const natural = (file) => Number(fs.readFileSync(path.join(dir, `${file}.svg`), 'utf8').match(/width="([\d.]+)"/)[1])
  if (FORMAT === 'svg') for (const d of documents) for (const b of d.blocks) for (const it of [...(b.logos ?? []), ...(b.type === 'logos' ? b.items : [])]) if (it.file && Math.abs(natural(it.file) - it.width) > 1) it.natural = natural(it.file)
}
if (missing.size) {
  fs.writeFileSync(MISSING, JSON.stringify([...missing], null, 2) + '\n')
  console.error(`เจอ id ตัวแปรที่ไม่รู้จัก ${missing.size} ตัว เขียนไว้ที่ ${path.relative(ROOT, MISSING)} เติมชื่อใน tokens/figma-variable-ids.json แล้วรันใหม่`)
  process.exit(1)
}
if (fs.existsSync(MISSING)) fs.unlinkSync(MISSING)
if (badVars.length) {
  console.error(`ตัวแปร CSS หาไม่เจอ ${badVars.length} ตัว\n  ` + badVars.slice(0, 30).join('\n  '))
  process.exit(1)
}

const json = {
  _comment: `สร้างโดย scripts/extract-figma-atom-doc.mjs จากหน้า ${PAGE} ในไฟล์ออกแบบ ห้ามแก้มือ แก้ที่ Figma แล้วรัน npm run figma:atom-doc -- ${KEY}`,
  page: PAGE,
  // ป้ายสีในตารางของไฟล์ออกแบบที่ไม่ตรงกับตัวแปรจริง เป็นงานค้างของหน้านั้นใน Figma
  ...(stale.length ? { staleLabels: stale } : {}),
  // ค่า grid ในไฟล์ออกแบบที่ไม่ตรงกับ token
  ...(gridMismatch.length ? { gridMismatch } : {}),
  // ค่าเอฟเฟคในไฟล์ออกแบบที่ไม่ตรงกับ token
  ...(effectMismatch.length ? { effectMismatch } : {}),
  // มุมโค้งในไฟล์ออกแบบที่ไม่ตรงกับ token หรือผูกตัวแปรที่ไม่มีในโค้ด
  ...(radiusMismatch.length ? { radiusMismatch: [...new Set(radiusMismatch)] } : {}),
  // ระยะห่างในไฟล์ออกแบบที่ไม่ตรงกับ token
  ...(spaceMismatch.length ? { spaceMismatch: [...new Set(spaceMismatch)] } : {}),
  documents,
}
fs.mkdirSync(path.dirname(OUT), { recursive: true })
fs.writeFileSync(OUT, JSON.stringify(json, null, 2) + '\n')
const count = (t) => documents.reduce((s, d) => s + d.blocks.filter(b => b.type === t).length, 0)
const rows = documents.reduce((s, d) => s + d.blocks.filter(b => b.type === 'colorTable').reduce((a, b) => a + b.rows.length, 0), 0)
if (gridMismatch.length) console.log(`ค่า grid ไม่ตรงกับ token ${gridMismatch.length} จุด\n  ` + gridMismatch.join('\n  '))
if (effectMismatch.length) console.log(`ค่าเอฟเฟคไม่ตรงกับ token ${effectMismatch.length} จุด\n  ` + effectMismatch.join('\n  '))
if (radiusMismatch.length) { const u = [...new Set(radiusMismatch)]; console.log(`มุมโค้งไม่ตรงกับ token ${u.length} จุด\n  ` + u.join('\n  ')) }
if (spaceMismatch.length) { const u = [...new Set(spaceMismatch)]; console.log(`ระยะห่างไม่ตรงกับ token ${u.length} จุด\n  ` + u.join('\n  ')) }
if (stale.length) console.log(`ป้ายสีในไฟล์ออกแบบไม่ตรงกับตัวแปรจริง ${stale.length} แถว ดู staleLabels ใน ${path.relative(ROOT, OUT)}`)
console.log(`เขียน ${path.relative(ROOT, OUT)} เอกสาร ${documents.length} ใบ แถวสี ${rows} ตาราง ${count('table')} แรมป์ ${count('ramp')} การ์ด ${count('card')} ตัวอย่างสไตล์ ${count('specimen')} ขั้นขนาด ${count('scale')} ตระกูลฟอนต์ ${count('fontFamily')} ภาพ grid ${count('grid')} แถวเอฟเฟค ${count('effects')} ภาพเอฟเฟค ${documents.reduce((a, d) => a + d.blocks.filter(b => b.type === 'effects').reduce((x, b) => x + b.items.length, 0), 0)}`)
