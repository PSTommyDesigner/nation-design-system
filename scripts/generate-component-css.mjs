#!/usr/bin/env node
/**
 * สร้าง CSS ของ component จาก spec ชั้นที่ดึงจากไฟล์ออกแบบ (tokens/figma-layers/<component>.json)
 *
 *   node scripts/generate-component-css.mjs tag            เขียน components/Tag/Tag.module.css
 *   node scripts/generate-component-css.mjs tag --check    ไม่เขียน แค่เทียบว่าไฟล์ที่ commit อยู่ตรงกับที่สร้างได้ไหม
 *
 * หลักการ (หัวหน้าสั่ง 2026-10-22 "Token ไม่ได้บอกที่ใช้ ไฟล์ออกแบบบอกอยู่ใช้อะไรตรงไหน")
 *   Tag.module.css = Tag.base.css (วิธีวาด เขียนมือ ไม่มีชื่อ token) + ส่วนที่สร้าง (ค่า ทุกค่ามาจากไฟล์ออกแบบ)
 *   ชั้นในไฟล์ออกแบบ → ช่อง (custom property --tag-*) ตามตาราง LAYERS ด้านล่าง
 *   ชื่อตัวแปร Figma → ชื่อ CSS variable ของ token (--ntg-…) แล้ว "ตรวจว่ามีจริง" ใน tokens/output/css
 *   เจอชั้นที่ไม่รู้จัก สีดิบ ตัวแปรนอก collection component หรือตัวแปรที่ token ไม่มี = หยุดทันที
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const target = process.argv[2]
const CHECK = process.argv.includes('--check')

// ── ตัวแปร token ที่มีจริง (ใช้ตรวจทุกชื่อที่สร้าง) ────────────────────────────
const cssVars = new Set()
for (const f of ['variables.css', 'typography.css']) {
  const p = path.join(ROOT, 'tokens/output/css', f)
  if (!fs.existsSync(p)) continue
  for (const m of fs.readFileSync(p, 'utf8').matchAll(/^\s*(--ntg-[\w-]+)\s*:/gm)) cssVars.add(m[1])
}
const errors = []
const toVar = (figmaName, where) => {
  if (typeof figmaName === 'number') return figmaName === 0 ? '0' : `${figmaName}px`
  if (typeof figmaName !== 'string') { errors.push(`${where}: ค่าแปลก ${JSON.stringify(figmaName)}`); return '0' }
  if (figmaName.includes('::')) { errors.push(`${where}: ผูกตัวแปรนอก collection component (${figmaName})`); return 'invalid' }
  if (figmaName === 'RAW') { errors.push(`${where}: สีดิบ ไม่ได้ผูกตัวแปร`); return 'invalid' }
  const name = `--ntg-${figmaName.replace(/\//g, '-')}`
  if (!cssVars.has(name)) errors.push(`${where}: token ไม่มี ${name} (จาก ${figmaName})`)
  return `var(${name})`
}
const styleVars = (style, parts, where) => {
  // text::label/sm → --ntg-typography-font-size-label-sm …
  const m = /^text::(.+)$/.exec(style || '')
  if (!m) { errors.push(`${where}: text style แปลก ${style}`); return {} }
  const key = m[1].replace(/\//g, '-')
  const out = {}
  for (const [prop, tok] of Object.entries(parts)) {
    const name = `--ntg-typography-${tok}-${key}`
    if (!cssVars.has(name)) errors.push(`${where}: token ไม่มี ${name}`)
    out[prop] = `var(${name})`
  }
  return out
}
const effectVar = (fx, where) => {
  if (!fx) return 'none'
  const m = /^effect::(.+)$/.exec(fx)
  if (!m) { errors.push(`${where}: effect แปลก ${fx}`); return 'none' }
  const name = `--ntg-${m[1].replace(/\//g, '-')}`
  if (!cssVars.has(name)) errors.push(`${where}: token ไม่มี ${name}`)
  return `var(${name})`
}

// ═══════════════════════════════════════════════════════════════════════════════
// Tag: ตารางจับคู่ ชุดในไฟล์ออกแบบ ↔ คลาสในโค้ด และ ชั้น ↔ ช่อง --tag-*
// ═══════════════════════════════════════════════════════════════════════════════
const TAG = {
  specFile: 'tokens/figma-layers/tag.json',
  baseFile: 'components/Tag/Tag.base.css',
  outFile: 'components/Tag/Tag.module.css',
  // ชุด → คลาสที่ Tag.tsx ใส่ให้ (ดู SHAPE_CLASS / LEADING_CLASS / iconOnly) และว่าชุดนั้นมีแกน hierarchy ไหม
  sets: {
    'semi-rounded-tag':   { classes: '.semiRounded.leadNone:not(.iconOnly)' },
    'pill-tag':           { classes: '.pill.leadNone:not(.iconOnly)' },
    'number-tag':         { classes: '.semiRounded.leadNumber' },
    'pill-number-tag':    { classes: '.pill.leadNumber' },
    'image-tag':          { classes: '.semiRounded.leadImage' },
    'pill-image-tag':     { classes: '.pill.leadImage' },
    'checkbox-tag':       { classes: '.semiRounded.leadCheckbox' },
    'pill-checkbox-tag':  { classes: '.pill.leadCheckbox' },
    'indicator-tag':      { classes: '.semiRounded.leadIndicator' },
    'pill-indicator-tag': { classes: '.pill.leadIndicator' },
    'icon-tag':           { classes: '.semiRounded.iconOnly' },
    'circular-icon-tag':  { classes: '.circular.iconOnly' },
    'link-tag':           { classes: '.link.leadNone:not(.iconOnly)' },
    'link-icon-tag':      { classes: '.link.iconOnly' },
  },
  // เฟรมตระกูล → คลาสตระกูล (Brand Tags → .brand)
  familyClass: (f) => '.' + f.replace(/ Tags$/, '').toLowerCase(),
  axisClass: { hierarchy: (v) => `.${v}`, 'default-gray': (v) => (v === 'true' ? '.defaultGray' : '') },
  stateSelector: {
    default: (sel) => sel,
    hover: (sel) => `${sel}.interactive:hover:not([aria-disabled='true'])`,
    disabled: (sel) => `${sel}[aria-disabled='true']`,
  },
  // ชั้นในไฟล์ออกแบบ (path จากกล่องนอก) → ช่องโครง  ฟังก์ชันรับ node แล้วคืน { '--tag-x': ค่า }
  layers: {
    '(root)': (n, W) => ({
      '--tag-pt': W(n.p[0]), '--tag-pr': W(n.p[1]), '--tag-pb': W(n.p[2]), '--tag-pl': W(n.p[3]),
      '--tag-gap': W(n.g),
      ...(n.r ? { '--tag-r-tl': W(n.r[0]), '--tag-r-tr': W(n.r[1]), '--tag-r-br': W(n.r[2]), '--tag-r-bl': W(n.r[3]) } : {}),
      '--tag-shadow': effectVar(n.fx, 'root effect'),
    }),
    // ไอคอนซ้าย/ปิดของชุดฐาน: เฟรมขนาดตายตัวผูกตัวแปร icon
    'left-icon': (n, W) => ({ '--tag-icon': W(n.w) }),
    'close-icon': (n, W) => ({ '--tag-icon': W(n.w) }),
    'left-icon/icon': () => ({}),
    'left-icon/icon/vector': () => ({}),
    'close-icon/navigation-&-arrows/close': () => ({}),
    'close-icon/navigation-&-arrows/close/vector': () => ({}),
    'content/left-icon/icon/vector': () => ({}),
    'content/right-icon/icon/vector': () => ({}),
    'tag-title': (n, W) => ({ '--tag-title-pt': W(n.p[0]), '--tag-title-pr': W(n.p[1]), '--tag-title-pb': W(n.p[2]), '--tag-title-pl': W(n.p[3]) }),
    'tag-title/Tag Title': () => ({}),
    // ชุดที่มีของนำหน้า: ชั้น content ห่อข้อความกับไอคอนปิด
    'content': (n, W) => ({
      '--tag-content-pt': W(n.p[0]), '--tag-content-pr': W(n.p[1]), '--tag-content-pb': W(n.p[2]), '--tag-content-pl': W(n.p[3]),
      '--tag-content-gap': W(n.g),
    }),
    'content/title': (n, W) => ({ '--tag-title-pt': W(n.p[0]), '--tag-title-pr': W(n.p[1]), '--tag-title-pb': W(n.p[2]), '--tag-title-pl': W(n.p[3]) }),
    'content/title/Tag Title': () => ({}),
    'content/left-icon': () => ({}),   // เฟรม HUG ขนาดอยู่ที่ไอคอนข้างใน (ชื่อชั้นในไฟล์ออกแบบยังเป็น left-icon แม้อยู่ขวา)
    'content/right-icon': () => ({}),
    'content/left-icon/icon': (n, W) => ({ '--tag-icon': W(n.h) }),
    'content/right-icon/icon': (n, W) => ({ '--tag-icon': W(n.h) }),
    // ช่องตัวเลข / ช่องรูป ชนขอบซ้าย (ชื่อชั้น right-number เป็นชื่อเก่าในไฟล์ออกแบบ)
    'right-number': (n, W) => ({
      '--tag-lead-w': W(n.w),
      ...(n.s[1] === 'FILL' ? { '--tag-lead-h': 'auto', '--tag-lead-align': 'stretch' } : { '--tag-lead-h': W(n.h) }),
      '--tag-lead-pl': W(n.p[3]), '--tag-lead-pr': W(n.p[1]),
    }),
    'right-number/1': () => ({}),
    'left-image': (n, W) => ({
      '--tag-lead-w': W(n.w),
      ...(n.s[1] === 'FILL' ? { '--tag-lead-h': 'auto', '--tag-lead-align': 'stretch' } : { '--tag-lead-h': W(n.h) }),
      '--tag-lead-pl': W(n.p[3]), '--tag-lead-pr': W(n.p[1]),
    }),
    'left-checkbox': (n, W) => ({
      '--tag-checkbox': W(n.w),
      '--tag-checkbox-r-tl': W(n.r[0]), '--tag-checkbox-r-tr': W(n.r[1]), '--tag-checkbox-r-br': W(n.r[2]), '--tag-checkbox-r-bl': W(n.r[3]),
    }),
    'indicator': (n, W) => ({ '--tag-dot-pl': W(n.p[3]), '--tag-dot-pr': W(n.p[1]) }),
    'indicator/_dot': (n, W) => ({ '--tag-dot': W(n.w) }),
    'indicator/_dot/dot': () => ({}),
    // โหมดไอคอนล้วน: ไอคอนอยู่ที่กล่องนอกตรง ๆ
    'icon': (n, W) => ({ '--tag-icon': W(n.h) }),
    'icon/vector': () => ({}),
  },
  // text style ของข้อความ → ตัวอักษร (เก็บต่อขนาด ต้องเหมือนกันทุกชุด)
  textLayers: ['tag-title/Tag Title', 'content/title/Tag Title', 'right-number/1'],
  typography: { '--tag-font-family': 'font-family', '--tag-font-size': 'font-size', '--tag-line-height': 'line-height', '--tag-font-weight': 'font-weight', '--tag-letter-space': 'letter-space' },
  // ชั้น → ช่องสี  (fills[0] / strokes[0])
  colors: {
    '(root)': (c, W) => ({ '--tag-bg': W(c.fills?.[0]), '--tag-border': c.strokes ? W(c.strokes[0]) : 'transparent', ...(c.strokes ? { '--tag-border-w': `${c.sw[0]}px` } : {}) }),
    'tag-title/Tag Title': (c, W) => ({ '--tag-fg': W(c.fills[0]) }),
    'content/title/Tag Title': (c, W) => ({ '--tag-fg': W(c.fills[0]) }),
    'left-icon/icon/vector': (c, W) => ({ '--tag-icon-color': W(c.fills[0]) }),
    'close-icon/navigation-&-arrows/close/vector': (c, W) => ({ '--tag-icon-color': W(c.fills[0]) }),
    'icon/vector': (c, W) => ({ '--tag-icon-color': W(c.fills[0]) }),
    // ช่องตัวเลข: ไม่วาดเส้นซ้าย 1px ของตัวเอง (ซ้อนใต้เส้นขอบกล่องนอก) ดู Tag.base.css ข้อ 5
    'right-number': (c, W) => ({ '--tag-lead-bg': W(c.fills[0]) }),
    'right-number/1': (c, W) => ({ '--tag-lead-fg': W(c.fills[0]) }),
    'left-image': () => ({}), // fill เป็นรูป
    'left-checkbox': (c, W) => ({ '--tag-checkbox-bg': W(c.fills[0]), '--tag-checkbox-border': W(c.strokes[0]), '--tag-checkbox-border-w': `${c.sw[0]}px` }),
    'indicator/_dot/dot': (c, W) => ({ '--tag-dot-color': W(c.fills[0]) }),
  },
}

const COMPONENTS = { tag: TAG }
const M = COMPONENTS[target]
if (!M) { console.error(`ใช้: node scripts/generate-component-css.mjs <${Object.keys(COMPONENTS).join('|')}> [--check]`); process.exit(2) }

const spec = JSON.parse(fs.readFileSync(path.join(ROOT, M.specFile), 'utf8'))
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl']
const out = []
const decl = (obj) => Object.entries(obj).map(([k, v]) => `${k}: ${v};`).join(' ')

// ── 1. ตัวอักษรต่อขนาด ───────────────────────────────────────────────────────
const tsBySize = {}
function walk(node, p, fn) {
  const key = p || '(root)'
  fn(key, node)
  for (const c of node.ch || []) walk(c, p ? `${p}/${c.n}` : c.n, fn)
}
for (const [setName, set] of Object.entries(spec.sets)) {
  for (const size of SIZES) {
    walk(set.layout[size], '', (key, n) => {
      if (n.ts && M.textLayers.includes(key)) {
        if (tsBySize[size] && tsBySize[size] !== n.ts) errors.push(`${setName} ${size} ${key}: text style ${n.ts} ไม่ตรงกับชุดอื่น (${tsBySize[size]})`)
        tsBySize[size] = n.ts
      }
    })
  }
}
out.push('/* ── ตัวอักษรต่อขนาด จาก text style ของชั้นข้อความในไฟล์ออกแบบ ── */')
for (const size of SIZES) {
  const vars = styleVars(tsBySize[size], Object.fromEntries(Object.entries(M.typography).map(([k, v]) => [k, v])), `typography ${size}`)
  out.push(`.${size} { ${decl(vars)} }`)
}

// ── 2. โครงต่อ ชุด × ขนาด ───────────────────────────────────────────────────
out.push('', '/* ── โครง (ระยะ ขนาด มุมโค้ง เงา) ต่อ ชุด × ขนาด อ่านจากชั้นของตระกูลอ้างอิง ── */')
for (const [setName, set] of Object.entries(spec.sets)) {
  const map = M.sets[setName]
  if (!map) { errors.push(`ชุด ${setName} ไม่มีในตารางจับคู่ sets`); continue }
  for (const size of SIZES) {
    const vars = {}
    walk(set.layout[size], '', (key, n) => {
      const fn = M.layers[key]
      if (!fn) { errors.push(`${setName} ${size}: ไม่รู้จักชั้น "${key}" (เพิ่มในตาราง layers)`); return }
      if (n.vis === false && key !== 'left-icon' && key !== 'close-icon' && !key.endsWith('-icon')) return
      Object.assign(vars, fn(n, (v) => toVar(v, `${setName} ${size} ${key}`)))
    })
    out.push(`${map.classes}.${size} { ${decl(vars)} }`)
  }
}

// ── 3. สีต่อ ชุด × ตระกูล × แกน × สถานะ (รวมกฎที่ประกาศเหมือนกันไว้ selector เดียว) ──
out.push('', '/* ── สี ต่อ ชุด × ตระกูล × แกน × สถานะ อ่านจาก fill/stroke ของทุกชั้น ── */')
const groups = new Map() // declaration string → selectors[]
const order = []
for (const [setName, set] of Object.entries(spec.sets)) {
  const map = M.sets[setName]
  if (!map) continue
  for (const [family, combos] of Object.entries(set.colors)) {
    const famClass = M.familyClass(family)
    for (const [combo, paletteId] of Object.entries(combos)) {
      const axes = Object.fromEntries(combo.split(', ').filter(Boolean).map(s => s.split('=')))
      const state = axes.state || 'default'
      let sel = `${map.classes}${famClass}`
      for (const [axis, fn] of Object.entries(M.axisClass)) if (axis in axes) sel += fn(axes[axis])
      sel = M.stateSelector[state]?.(sel)
      if (!sel) { errors.push(`${setName} ${family} ${combo}: สถานะ ${state} ไม่รู้จัก`); continue }
      const colors = spec.palette[paletteId]
      const vars = {}
      for (const [key, c] of Object.entries(colors)) {
        const fn = M.colors[key]
        if (!fn) { errors.push(`${setName} ${family} ${combo}: ไม่รู้จักชั้นสี "${key}" (เพิ่มในตาราง colors)`); continue }
        Object.assign(vars, fn(c, (v) => toVar(v, `${setName} ${family} [${combo}] ${key}`)))
      }
      const d = decl(vars)
      const stateRank = { default: 0, hover: 1, disabled: 2 }[state]
      const k = `${stateRank}|${d}`
      if (!groups.has(k)) { groups.set(k, []); order.push(k) }
      groups.get(k).push(sel)
    }
  }
}
// เรียง default → hover → disabled เพื่อให้สถานะทับกันถูกลำดับ
order.sort((a, b) => Number(a[0]) - Number(b[0]))
for (const k of order) {
  const d = k.slice(2)
  out.push(`${groups.get(k).join(',\n')} { ${d} }`)
}

if (errors.length) {
  console.error(`✗ สร้าง CSS ไม่ได้ ${errors.length} ปัญหา (ต้องแก้ที่ไฟล์ออกแบบ หรือ token หรือตารางจับคู่)`)
  for (const e of [...new Set(errors)].slice(0, 60)) console.error('  ' + e)
  process.exit(1)
}

const base = fs.readFileSync(path.join(ROOT, M.baseFile), 'utf8')
const header = `/* ⚠️ ไฟล์นี้สร้างอัตโนมัติ ห้ามแก้ตรง ๆ
 *   โครง (วิธีวาด)  แก้ที่ ${M.baseFile}
 *   ค่า (ระยะ สี ฯลฯ) แก้ที่ไฟล์ออกแบบ Figma หน้า ${spec.page} แล้วรัน  npm run figma:layers -- ${target}  และ  npm run css:generate -- ${target}
 *   spec: ${M.specFile} (ดึง ${spec.capturedAt})
 */
`
const css = `${header}\n${base.trimEnd()}\n\n/* ═══ ส่วนที่สร้างจากไฟล์ออกแบบ ═══ */\n${out.join('\n')}\n`
const outPath = path.join(ROOT, M.outFile)
if (CHECK) {
  const cur = fs.existsSync(outPath) ? fs.readFileSync(outPath, 'utf8') : ''
  if (cur !== css) { console.error(`✗ ${M.outFile} ไม่ตรงกับที่สร้างจาก spec ให้รัน npm run css:generate -- ${target}`); process.exit(1) }
  console.log(`✓ ${M.outFile} ตรงกับ spec`)
} else {
  fs.writeFileSync(outPath, css)
  console.log(`✓ เขียน ${M.outFile} (${css.split('\n').length} บรรทัด, กฎสี ${order.length} กลุ่ม)`)
}
