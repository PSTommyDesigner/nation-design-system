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
// ชื่อตัวแปรที่มีจริงใน Figma (ตารางสะสมจากการดึง spec) ใช้ตรวจ extras
const FIGMA_VAR_NAMES = new Set(Object.values(JSON.parse(fs.readFileSync(path.join(ROOT, 'tokens/figma-variable-ids.json'), 'utf8'))).map((n) => String(n).replace(/^component::/, '')))
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
    // preset หมวด meta (เช่น meta/credit) ออก token ต่อบทบาทโดยไม่มีคำว่า meta นำหน้า (--ntg-typography-font-size-credit)
    const candidates = [`--ntg-typography-${tok}-${key}`, `--ntg-typography-${tok}-${key.replace(/^meta-/, '')}`]
    const name = candidates.find((c) => cssVars.has(c))
    if (!name) errors.push(`${where}: token ไม่มี ${candidates[0]}`)
    out[prop] = `var(${name || candidates[0]})`
  }
  return out
}
// ไม่มี effect ให้คืนเงาโปร่งใส ไม่ใช่ none เพราะ base css อาจเอาไปต่อกับเงาอื่นใน box-shadow เดียวกัน (none จะทำให้ทั้งค่าพัง)
const effectVar = (fx, where) => {
  if (!fx) return '0 0 0 0 transparent'
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
    }),
    // ไอคอนซ้าย/ปิดของชุดฐาน: เฟรมขนาดตายตัวผูกตัวแปร icon
    'left-icon': (n, W) => ({ '--tag-icon': W(n.w) }),
    'close-icon': (n, W) => ({ '--tag-icon': W(n.w) }),
    'left-icon/icon': () => ({}),
    'left-icon/icon/vector': () => ({}),
    'close-icon/navigation-&-arrows/close': () => ({}),
    'close-icon/navigation-&-arrows/close/vector': () => ({}),
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
    'content/right-icon': () => ({}),   // เฟรม HUG ขนาดอยู่ที่ไอคอนข้างใน (เปลี่ยนชื่อจาก left-icon ตามตำแหน่งจริง 2026-10-26)
    'content/right-icon/icon': (n, W) => ({ '--tag-icon': W(n.h) }),
    // ช่องตัวเลข / ช่องรูป ชนขอบซ้าย (เปลี่ยนชื่อจาก right-number ตามตำแหน่งจริง 2026-10-26)
    'left-number': (n, W) => ({
      '--tag-lead-w': W(n.w),
      ...(n.s[1] === 'FILL' ? { '--tag-lead-h': 'auto', '--tag-lead-align': 'stretch' } : { '--tag-lead-h': W(n.h) }),
      '--tag-lead-pl': W(n.p[3]), '--tag-lead-pr': W(n.p[1]),
    }),
    'left-number/1': () => ({}),
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
  textLayers: ['tag-title/Tag Title', 'content/title/Tag Title', 'left-number/1'],
  typography: { '--tag-font-family': 'font-family', '--tag-font-size': 'font-size', '--tag-line-height': 'line-height', '--tag-font-weight': 'font-weight', '--tag-letter-space': 'letter-space' },
  // ชั้น → ช่องสี  (fills[0] / strokes[0])
  colors: {
    '(root)': (c, W) => ({ '--tag-bg': c.fills ? W(c.fills[0]) : 'transparent', '--tag-border': c.strokes ? W(c.strokes[0]) : 'transparent', ...(c.strokes ? { '--tag-border-w': `${c.sw[0]}px` } : {}), '--tag-shadow': effectVar(c.fx, 'root effect') }),
    'tag-title/Tag Title': (c, W) => ({ '--tag-fg': W(c.fills[0]) }),
    'content/title/Tag Title': (c, W) => ({ '--tag-fg': W(c.fills[0]) }),
    'left-icon/icon/vector': (c, W) => ({ '--tag-icon-color': W(c.fills[0]) }),
    'close-icon/navigation-&-arrows/close/vector': (c, W) => ({ '--tag-icon-color': W(c.fills[0]) }),
    'icon/vector': (c, W) => ({ '--tag-icon-color': W(c.fills[0]) }),
    // ช่องตัวเลข: ไม่วาดเส้นซ้าย 1px ของตัวเอง (ซ้อนใต้เส้นขอบกล่องนอก) ดู Tag.base.css ข้อ 5
    'left-number': (c, W) => ({ '--tag-lead-bg': W(c.fills[0]) }),
    'left-number/1': (c, W) => ({ '--tag-lead-fg': W(c.fills[0]) }),
    'left-image': () => ({}), // fill เป็นรูป
    'left-checkbox': (c, W) => ({ '--tag-checkbox-bg': W(c.fills[0]), '--tag-checkbox-border': W(c.strokes[0]), '--tag-checkbox-border-w': `${c.sw[0]}px` }),
    'indicator/_dot/dot': (c, W) => ({ '--tag-dot-color': W(c.fills[0]) }),
  },
}

// ═══════════════════════════════════════════════════════════════════════════════
// Badge: หน้า 22 ป้ายเป็นของนิ่ง ไม่มีแกน state  5 ชุด x 11 ตระกูล
// ═══════════════════════════════════════════════════════════════════════════════
const BADGE = {
  specFile: 'tokens/figma-layers/badge.json',
  baseFile: 'components/Badge/Badge.base.css',
  outFile: 'components/Badge/Badge.module.css',
  sets: {
    'semi-rounded-badge':      { classes: '.semiRounded:not(.iconOnly)' },
    'pill-badge':              { classes: '.pill:not(.iconOnly)' },
    'semi-rounded-icon-badge': { classes: '.semiRounded.iconOnly' },
    'circular-icon-badge':     { classes: '.circular.iconOnly' },
    // quaternary เป็นระดับเก่าในโค้ด (ข้อความล้วน) ไฟล์ออกแบบแยกไปเป็น link-badge แล้ว ให้ใช้สีของ link-badge
    'link-badge':              { classes: ['.link', '.quaternary:not(.link)'] },
  },
  familyClass: (f) => '.' + f.replace(/ Badge$/, '').toLowerCase(),
  axisClass: { hierarchy: (v) => `.${v}` },
  stateSelector: { default: (sel) => sel },
  layers: {
    '(root)': (n, W) => ({
      '--badge-pt': W(n.p[0]), '--badge-pr': W(n.p[1]), '--badge-pb': W(n.p[2]), '--badge-pl': W(n.p[3]),
      '--badge-gap': W(n.g),
      ...(n.r ? { '--badge-r-tl': W(n.r[0]), '--badge-r-tr': W(n.r[1]), '--badge-r-br': W(n.r[2]), '--badge-r-bl': W(n.r[3]) } : {}),
    }),
    'badge-title': (n, W) => ({ '--badge-title-pt': W(n.p[0]), '--badge-title-pr': W(n.p[1]), '--badge-title-pb': W(n.p[2]), '--badge-title-pl': W(n.p[3]) }),
    'badge-title/Badge Title': () => ({}),
    'trailing-icon': (n, W) => ({ '--badge-icon': W(n.w) }),
    'trailing-icon/**/Vector': () => ({}),
    'trailing-icon/**': () => ({}),   // instance ไอคอน ชื่อเปลี่ยนตามไอคอนที่สลับ
    'leading-icon': (n, W) => ({ '--badge-icon': W(n.w) }),
    'leading-icon/**/Vector': () => ({}),
    'leading-icon/**': () => ({}),
  },
  textLayers: ['badge-title/Badge Title'],
  typography: { '--badge-font-family': 'font-family', '--badge-font-size': 'font-size', '--badge-line-height': 'line-height', '--badge-font-weight': 'font-weight', '--badge-letter-space': 'letter-space' },
  colors: {
    '(root)': (c, W) => ({ '--badge-bg': c.fills ? W(c.fills[0]) : 'transparent', '--badge-border': c.strokes ? W(c.strokes[0]) : 'transparent', ...(c.strokes ? { '--badge-border-w': `${c.sw[0]}px` } : {}), '--badge-shadow': effectVar(c.fx, 'root effect') }),
    'badge-title/Badge Title': (c, W) => ({ '--badge-fg': W(c.fills[0]) }),
    'trailing-icon/**/Vector': (c, W) => ({ '--badge-icon-color': W(c.fills[0]) }),
    'leading-icon/**/Vector': (c, W) => ({ '--badge-icon-color': W(c.fills[0]) }),
  },
}

// ═══════════════════════════════════════════════════════════════════════════════
// Button: หน้า 12 ปุ่มข้อความ 2 ชุด x 4 ตระกูล (Brand Neutral Error Alpha) แกน state 4 ค่า
// ═══════════════════════════════════════════════════════════════════════════════
const BUTTON = {
  specFile: 'tokens/figma-layers/button.json',
  baseFile: 'components/Button/Button.base.css',
  outFile: 'components/Button/Button.module.css',
  sets: {
    'semi-rounded-button': { classes: '.root:not(.pill)' },
    'pill-button':         { classes: '.root.pill' },
  },
  // โหมดเทาในโค้ดเป็นคลาสตระกูลแยก (brandGray / errorGray) ไม่ใช่คลาสเพิ่ม
  familyClass: (f, axes = {}) => {
    const fam = f.replace(/ Button$/, '').toLowerCase()
    return '.' + (axes['default-gray'] === 'true' ? `${fam}Gray` : fam)
  },
  axisClass: { hierarchy: (v) => `.${v}` },   // icon-only ของ Alpha ไม่ใช่คลาส (ชุดไอคอนล้วนเป็น IconButton)
  stateSelector: {
    default: (sel) => sel,
    hover: (sel) => `${sel}:hover:not(:disabled)`,
    focused: (sel) => `${sel}:focus-visible`,
    disabled: (sel) => `${sel}:disabled`,
  },
  layers: {
    '(root)': (n, W) => ({
      '--btn-h': W(n.h),
      '--btn-pt': W(n.p[0]), '--btn-pr': W(n.p[1]), '--btn-pb': W(n.p[2]), '--btn-pl': W(n.p[3]),
      '--btn-gap': W(n.g),
      ...(n.r ? { '--btn-r-tl': W(n.r[0]), '--btn-r-tr': W(n.r[1]), '--btn-r-br': W(n.r[2]), '--btn-r-bl': W(n.r[3]) } : {}),
    }),
    'Left Icon': (n, W) => ({ '--btn-icon': W(n.w) }),
    'Right Icon': (n, W) => ({ '--btn-icon': W(n.w) }),
    'Left Icon/**': () => ({}),
    'Right Icon/**': () => ({}),
    'Title frame': (n, W) => ({ '--btn-title-pt': W(n.p[0]), '--btn-title-pr': W(n.p[1]), '--btn-title-pb': W(n.p[2]), '--btn-title-pl': W(n.p[3]), '--btn-title-gap': W(n.g) }),
    'Title frame/Title': () => ({}),
  },
  textLayers: ['Title frame/Title'],
  typography: { '--btn-font-family': 'font-family', '--btn-font-size': 'font-size', '--btn-line-height': 'line-height', '--btn-font-weight': 'font-weight', '--btn-letter-space': 'letter-space' },
  colors: {
    '(root)': (c, W, ctx) => ({
      '--btn-bg': c.fills ? W(c.fills[0]) : 'transparent',
      '--btn-border': c.strokes ? W(c.strokes[0]) : 'transparent',
      ...(c.strokes ? { '--btn-border-w': `${c.sw[0]}px` } : {}),
      '--btn-shadow': effectVar(c.fx, 'root effect'),
      ...(c.fills && ctx.pressed(c.fills[0]) ? { '--btn-bg-pressed': ctx.pressed(c.fills[0]) } : {}),
      ...(c.strokes && ctx.pressed(c.strokes[0]) ? { '--btn-border-pressed': ctx.pressed(c.strokes[0]) } : {}),
    }),
    'Title frame/Title': (c, W, ctx) => ({ '--btn-fg': W(c.fills[0]), ...(ctx.pressed(c.fills[0]) ? { '--btn-fg-pressed': ctx.pressed(c.fills[0]) } : {}) }),
    'Left Icon/**/vector': (c, W, ctx) => ({ '--btn-icon-color': W(c.fills[0]), ...(ctx.pressed(c.fills[0]) ? { '--btn-icon-color-pressed': ctx.pressed(c.fills[0]) } : {}) }),
    'Right Icon/**/vector': () => ({}),  // สีเดียวกับไอคอนซ้าย (ตรวจใน spec แล้ว)
  },
}

// ═══════════════════════════════════════════════════════════════════════════════
// IconButton: หน้า 12 ปุ่มไอคอนล้วน 2 ชุด x 4 ตระกูล (Neutral มีแต่แกน default-gray=true ซึ่งคือสีของตัวเอง)
// ═══════════════════════════════════════════════════════════════════════════════
const grayFamilyClass = (suffix) => (f, axes = {}) => {
  const fam = f.replace(new RegExp(` ${suffix}$`), '').toLowerCase()
  const grayCapable = fam === 'brand' || fam === 'error'
  return '.' + (grayCapable && axes['default-gray'] === 'true' ? `${fam}Gray` : fam)
}
const BUTTON_STATES = {
  default: (sel) => sel,
  hover: (sel) => `${sel}:hover:not(:disabled)`,
  focused: (sel) => `${sel}:focus-visible`,
  disabled: (sel) => `${sel}:disabled`,
}
const ICON_BUTTON = {
  specFile: 'tokens/figma-layers/icon-button.json',
  baseFile: 'components/IconButton/IconButton.base.css',
  outFile: 'components/IconButton/IconButton.module.css',
  sets: {
    'semi-rounded-icon-button': { classes: '.root:not(.circular)' },
    'circular-icon-button':     { classes: '.root.circular' },
  },
  familyClass: grayFamilyClass('Button'),
  axisClass: { hierarchy: (v) => `.${v}` },
  stateSelector: BUTTON_STATES,
  layers: {
    '(root)': (n, W) => ({
      '--btn-w': W(n.w), '--btn-h': W(n.h),
      '--btn-pt': W(n.p[0]), '--btn-pr': W(n.p[1]), '--btn-pb': W(n.p[2]), '--btn-pl': W(n.p[3]),
      '--btn-gap': W(n.g),
      ...(n.r ? { '--btn-r-tl': W(n.r[0]), '--btn-r-tr': W(n.r[1]), '--btn-r-br': W(n.r[2]), '--btn-r-bl': W(n.r[3]) } : {}),
    }),
    'icon': (n, W) => ({ '--btn-icon': W(n.w) }),
    'icon/**': () => ({}),
  },
  textLayers: [],
  typography: {},
  colors: {
    '(root)': (c, W, ctx) => ({
      '--btn-bg': c.fills ? W(c.fills[0]) : 'transparent',
      '--btn-border': c.strokes ? W(c.strokes[0]) : 'transparent',
      ...(c.strokes ? { '--btn-border-w': `${c.sw[0]}px` } : {}),
      '--btn-shadow': effectVar(c.fx, 'root effect'),
      ...(c.fills && ctx.pressed(c.fills[0]) ? { '--btn-bg-pressed': ctx.pressed(c.fills[0]) } : {}),
      ...(c.strokes && ctx.pressed(c.strokes[0]) ? { '--btn-border-pressed': ctx.pressed(c.strokes[0]) } : {}),
    }),
    'icon/**/vector': (c, W, ctx) => ({ '--btn-icon-color': W(c.fills[0]), ...(ctx.pressed(c.fills[0]) ? { '--btn-icon-color-pressed': ctx.pressed(c.fills[0]) } : {}) }),
  },
}

// ═══════════════════════════════════════════════════════════════════════════════
// LinkButton: หน้า 12 ปุ่มลิงก์ 2 ชุด x 3 ตระกูล (Brand Neutral Error) ไม่มีพื้นไม่มีขอบ โฟกัสเป็นเส้นใต้ 1px
// ═══════════════════════════════════════════════════════════════════════════════
const LINK_BUTTON = {
  specFile: 'tokens/figma-layers/link-button.json',
  baseFile: 'components/LinkButton/LinkButton.base.css',
  outFile: 'components/LinkButton/LinkButton.module.css',
  sets: {
    'link-button':      { classes: '.root:not(.iconOnly)' },
    'link-icon-button': { classes: '.root.iconOnly' },
  },
  // โค้ดเรียกตระกูล Neutral ว่า gray (token button/color/link/gray/*)
  familyClass: (f, axes = {}) => { const c = grayFamilyClass('Button')(f, axes); return c === '.neutral' ? '.gray' : c },
  axisClass: {},
  stateSelector: BUTTON_STATES,
  layers: {
    '(root)': (n, W) => ({
      '--lb-pt': W(n.p[0]), '--lb-pr': W(n.p[1]), '--lb-pb': W(n.p[2]), '--lb-pl': W(n.p[3]),
      '--lb-gap': W(n.g),
    }),
    'Left Icon': (n, W) => ({ '--lb-icon': W(n.w) }),
    'Right Icon': (n, W) => ({ '--lb-icon': W(n.w) }),
    'Left Icon/**': () => ({}),
    'Right Icon/**': () => ({}),
    'icon': (n, W) => ({ '--lb-icon': W(n.w) }),
    'icon/**': () => ({}),
    'Title frame': (n, W) => ({ '--lb-title-pt': W(n.p[0]), '--lb-title-pr': W(n.p[1]), '--lb-title-pb': W(n.p[2]), '--lb-title-pl': W(n.p[3]) }),
    'Title frame/Title': () => ({}),
  },
  textLayers: ['Title frame/Title'],
  typography: { '--lb-font-family': 'font-family', '--lb-font-size': 'font-size', '--lb-line-height': 'line-height', '--lb-font-weight': 'font-weight', '--lb-letter-space': 'letter-space' },
  colors: {
    // เส้นขอบล่างอย่างเดียว (sw = [0,0,1,0]) คือเส้นใต้ตอนโฟกัส
    '(root)': (c, W) => ({
      '--lb-underline': c.strokes && c.sw[2] ? W(c.strokes[0]) : 'transparent',
      '--lb-underline-w': c.strokes && c.sw[2] ? `${c.sw[2]}px` : '0px',
    }),
    'Title frame/Title': (c, W, ctx) => ({ '--lb-fg': W(c.fills[0]), ...(ctx.pressed(c.fills[0]) ? { '--lb-fg-pressed': ctx.pressed(c.fills[0]) } : {}) }),
    'Left Icon/**/vector': (c, W, ctx) => ({ '--lb-icon-color': W(c.fills[0]), ...(ctx.pressed(c.fills[0]) ? { '--lb-icon-color-pressed': ctx.pressed(c.fills[0]) } : {}) }),
    'Right Icon/**/vector': () => ({}),
    'icon/**/vector': (c, W, ctx) => ({ '--lb-icon-color': W(c.fills[0]), ...(ctx.pressed(c.fills[0]) ? { '--lb-icon-color-pressed': ctx.pressed(c.fills[0]) } : {}) }),
  },
}

// ═══════════════════════════════════════════════════════════════════════════════
// Checkbox: หน้า 15 ชุด checkbox (กล่องอย่างเดียว) กับ text-checkbox (กล่อง + ข้อความ + ข้อความช่วย)
//   โค้ดเป็น component เดียว ทั้งสองชุดจึงจับคู่กับ .root เหมือนกัน (ค่าที่ซ้ำกันจะถูกรวม ค่าที่ขัดกันจะฟ้อง)
//   โครงอ่านจากแกน checked=true เพราะกล่องที่ติ๊กแล้วมีไอคอน (ยังไม่ติ๊กไม่มีลูกเลย)
//   สถานะใช้ data attribute ของ wrapper + :has() เพราะ hover อยู่ที่แถว (label) และโฟกัสอยู่ที่ input ที่ซ่อนไว้
// ═══════════════════════════════════════════════════════════════════════════════
const CHECKED_STATES = {
  default: (sel) => sel,
  hover: (sel) => `${sel}:not([data-disabled]):has(.row:hover)`,
  focused: (sel) => `${sel}:has(.input:focus-visible)`,
  disabled: (sel) => `${sel}[data-disabled]`,
}
const CHECKBOX = {
  specFile: 'tokens/figma-layers/checkbox.json',
  baseFile: 'components/Checkbox/Checkbox.base.css',
  outFile: 'components/Checkbox/Checkbox.module.css',
  layoutKey: (size) => `${size}, checked=true`,
  sets: { 'checkbox': { classes: '.root' }, 'text-checkbox': { classes: '.root' } },
  familyClass: () => '',
  axisClass: { checked: (v) => (v === 'indeterminate' ? '[data-indeterminate="true"]' : `[data-checked="${v}"]:not([data-indeterminate="true"])`) },
  stateSelector: CHECKED_STATES,
  layers: {
    // ชุด checkbox: root คือกล่อง (ไม่มี auto layout) · ชุด text-checkbox: root คือเฟรมแนวตั้งที่ไม่มีค่าอะไรให้โค้ด
    '(root)': (n, W) => (n.lm ? {} : boxLayout(n, W, 'cb')),
    'row': (n, W) => ({ '--cb-gap': W(n.g) }),
    'row/checkbox': (n, W) => boxLayout(n, W, 'cb'),
    '**/check': (n, W) => ({ '--cb-mark': W(n.w) }),
    '**/check/vector': () => ({}),
    'row/title': () => ({}),
    'supporting': (n, W) => ({ '--cb-indent': W(n.p[3]) }),
    'supporting/supporting-text': () => ({}),
  },
  text: [
    { layers: ['row/title'], vars: { '--cb-font-family': 'font-family', '--cb-font-size': 'font-size', '--cb-line-height': 'line-height', '--cb-font-weight': 'font-weight', '--cb-letter-space': 'letter-space' } },
    { layers: ['supporting/supporting-text'], vars: { '--cb-sup-font-family': 'font-family', '--cb-sup-font-size': 'font-size', '--cb-sup-line-height': 'line-height', '--cb-sup-font-weight': 'font-weight', '--cb-sup-letter-space': 'letter-space' } },
  ],
  colors: {
    '(root)': (c, W, ctx) => boxColors(c, W, ctx, 'cb'),
    'row/checkbox': (c, W, ctx) => boxColors(c, W, ctx, 'cb'),
    '**/vector': (c, W, ctx) => ({ '--cb-mark-color': W(c.fills[0]), ...pressedVar(ctx, c.fills[0], '--cb-mark-color-pressed') }),
    'row/title': (c, W, ctx) => ({ '--cb-fg': W(c.fills[0]), ...pressedVar(ctx, c.fills[0], '--cb-fg-pressed') }),
    'supporting/supporting-text': (c, W) => ({ '--cb-sup-fg': W(c.fills[0]) }),
  },
}
// กล่องติ๊ก/วงกลม: ขนาด มุมโค้ง (ใช้ร่วม checkbox กับ radio ต่างกันแค่ prefix)
function boxLayout(n, W, px) {
  return {
    [`--${px}-size`]: W(n.w),
    ...(n.r ? { [`--${px}-r-tl`]: W(n.r[0]), [`--${px}-r-tr`]: W(n.r[1]), [`--${px}-r-br`]: W(n.r[2]), [`--${px}-r-bl`]: W(n.r[3]) } : {}),
  }
}
function boxColors(c, W, ctx, px) {
  return {
    [`--${px}-bg`]: c.fills ? W(c.fills[0]) : 'transparent',
    [`--${px}-border`]: c.strokes ? W(c.strokes[0]) : 'transparent',
    ...(c.strokes ? { [`--${px}-border-w`]: `${c.sw[0]}px` } : {}),
    [`--${px}-ring`]: effectVar(c.fx, `${px} effect`),
    ...(c.fills ? pressedVar(ctx, c.fills[0], `--${px}-bg-pressed`) : {}),
    ...(c.strokes ? pressedVar(ctx, c.strokes[0], `--${px}-border-pressed`) : {}),
  }
}
const pressedVar = (ctx, name, prop) => (ctx.pressed(name) ? { [prop]: ctx.pressed(name) } : {})

// ═══════════════════════════════════════════════════════════════════════════════
// Radio: หน้า 16 ชุด radio (วงกลมอย่างเดียว) กับ text-radio โครงเดียวกับ Checkbox แต่เครื่องหมายเป็นจุด (ELLIPSE) ไม่ใช่ไอคอน
// ═══════════════════════════════════════════════════════════════════════════════
const RADIO = {
  specFile: 'tokens/figma-layers/radio.json',
  baseFile: 'components/Radio/Radio.base.css',
  outFile: 'components/Radio/Radio.module.css',
  layoutKey: (size) => `${size}, checked=true`,
  sets: { 'radio': { classes: '.root' }, 'text-radio': { classes: '.root' } },
  familyClass: () => '',
  axisClass: { checked: (v) => `[data-checked="${v}"]` },
  stateSelector: CHECKED_STATES,
  layers: {
    '(root)': (n, W) => (n.lm ? {} : boxLayout(n, W, 'rd')),
    'dot': (n, W) => ({ '--rd-dot': W(n.w) }),
    'row': (n, W) => ({ '--rd-gap': W(n.g) }),
    'row/radio': (n, W) => boxLayout(n, W, 'rd'),
    'row/radio/dot': (n, W) => ({ '--rd-dot': W(n.w) }),
    'row/title': () => ({}),
    'supporting': (n, W) => ({ '--rd-indent': W(n.p[3]) }),
    'supporting/supporting-text': () => ({}),
  },
  text: [
    { layers: ['row/title'], vars: { '--rd-font-family': 'font-family', '--rd-font-size': 'font-size', '--rd-line-height': 'line-height', '--rd-font-weight': 'font-weight', '--rd-letter-space': 'letter-space' } },
    { layers: ['supporting/supporting-text'], vars: { '--rd-sup-font-family': 'font-family', '--rd-sup-font-size': 'font-size', '--rd-sup-line-height': 'line-height', '--rd-sup-font-weight': 'font-weight', '--rd-sup-letter-space': 'letter-space' } },
  ],
  colors: {
    '(root)': (c, W, ctx) => boxColors(c, W, ctx, 'rd'),
    'row/radio': (c, W, ctx) => boxColors(c, W, ctx, 'rd'),
    'dot': (c, W, ctx) => ({ '--rd-dot-color': W(c.fills[0]), ...pressedVar(ctx, c.fills[0], '--rd-dot-color-pressed') }),
    'row/radio/dot': (c, W, ctx) => ({ '--rd-dot-color': W(c.fills[0]), ...pressedVar(ctx, c.fills[0], '--rd-dot-color-pressed') }),
    'row/title': (c, W, ctx) => ({ '--rd-fg': W(c.fills[0]), ...pressedVar(ctx, c.fills[0], '--rd-fg-pressed') }),
    'supporting/supporting-text': (c, W) => ({ '--rd-sup-fg': W(c.fills[0]) }),
  },
}

// ═══════════════════════════════════════════════════════════════════════════════
// Toggle: หน้า 14 ชุดเดียว (ราง + ปุ่มกลม + หัวข้อ + ข้อความช่วย) แกน active แทน checked
//   ตำแหน่งปุ่มกลมในไฟล์ออกแบบคือการจัดชิดซ้าย/ขวาของ auto layout ฝั่งเว็บเลื่อนด้วย transform จากขนาดราง ปุ่ม และระยะขอบใน
//   ข้อความช่วยในตัวอย่างปิดไว้ (property supporting-text=false) แต่โค้ดยังต้องการระยะเยื้องของมัน
// ═══════════════════════════════════════════════════════════════════════════════
const TOGGLE = {
  specFile: 'tokens/figma-layers/toggle.json',
  baseFile: 'components/Toggle/Toggle.base.css',
  outFile: 'components/Toggle/Toggle.module.css',
  layoutKey: (size) => `${size}, active=true`,
  hiddenLayers: ['supporting'],
  sets: { 'toggle': { classes: '.root' } },
  familyClass: () => '',
  axisClass: { active: (v) => `[data-checked="${v}"]` },
  stateSelector: CHECKED_STATES,
  layers: {
    '(root)': () => ({}),
    'row': (n, W) => ({ '--tg-gap': W(n.g) }),
    'row/track': (n, W) => ({
      '--tg-track-w': W(n.w), '--tg-track-h': W(n.h), '--tg-inset': W(n.p[0]),
      ...(n.r ? { '--tg-r-tl': W(n.r[0]), '--tg-r-tr': W(n.r[1]), '--tg-r-br': W(n.r[2]), '--tg-r-bl': W(n.r[3]) } : {}),
    }),
    'row/track/knob': (n, W) => ({ '--tg-knob': W(n.w) }),
    'row/title': () => ({}),
    'supporting': (n, W) => ({ '--tg-indent': W(n.p[3]) }),
    'supporting/supporting-text': () => ({}),
  },
  text: [
    { layers: ['row/title'], vars: { '--tg-font-family': 'font-family', '--tg-font-size': 'font-size', '--tg-line-height': 'line-height', '--tg-font-weight': 'font-weight', '--tg-letter-space': 'letter-space' } },
    { layers: ['supporting/supporting-text'], vars: { '--tg-sup-font-family': 'font-family', '--tg-sup-font-size': 'font-size', '--tg-sup-line-height': 'line-height', '--tg-sup-font-weight': 'font-weight', '--tg-sup-letter-space': 'letter-space' } },
  ],
  colors: {
    'row/track': (c, W, ctx) => ({ '--tg-track-bg': W(c.fills[0]), '--tg-ring': effectVar(c.fx, 'track effect'), ...pressedVar(ctx, c.fills[0], '--tg-track-bg-pressed') }),
    'row/track/knob': (c, W) => ({ '--tg-knob-bg': W(c.fills[0]), '--tg-knob-shadow': effectVar(c.fx, 'knob effect') }),
    'row/title': (c, W) => ({ '--tg-fg': W(c.fills[0]) }),
    'supporting/supporting-text': (c, W) => ({ '--tg-sup-fg': W(c.fills[0]) }),
  },
}

// ═══════════════════════════════════════════════════════════════════════════════
// TextField: หน้า 13 ชุด text-field (บรรทัดเดียว) กับ text-area (หลายบรรทัด = prop multiline)
//   สถานะ 8 ค่า: default hover focused disabled error error-hover error-focused read-only
//   ฝั่งเว็บเป็น data attribute ของ root (error / disabled / readonly) + :hover ของกล่อง + :focus-visible ของ input
//   ชั้น Text ในไฟล์ออกแบบเป็น placeholder ในสถานะพัก แต่เป็นข้อความที่พิมพ์ในสถานะ hover/focused (ไฟล์ไม่แยกสองชั้น)
//   จึงแยกตามชื่อ token: ชื่อที่มีคำว่า placeholder ไปช่อง --tf-placeholder ที่เหลือไปช่อง --tf-text
// ═══════════════════════════════════════════════════════════════════════════════
const TEXT_FIELD_STATES = {
  default: (sel) => sel,
  hover: (sel) => `${sel}:not([data-error]):not([data-disabled]):not([data-readonly]):has(.box:hover)`,
  focused: (sel) => `${sel}:not([data-error]):has(.input:focus-visible)`,
  error: (sel) => `${sel}[data-error]`,
  'error-hover': (sel) => `${sel}[data-error]:not([data-disabled]):not([data-readonly]):has(.box:hover)`,
  'error-focused': (sel) => `${sel}[data-error]:has(.input:focus-visible)`,
  'read-only': (sel) => `${sel}[data-readonly]`,
  disabled: (sel) => `${sel}[data-disabled]`,
}
const TEXT_FIELD = {
  specFile: 'tokens/figma-layers/text-field.json',
  sizes: ['sm', 'md', 'lg'],
  baseFile: 'components/TextField/TextField.base.css',
  outFile: 'components/TextField/TextField.module.css',
  hiddenLayers: ['field/input-box/leading-divider', 'field/input-box/trailing-divider', 'field/label-row/required-asterisk'],
  sets: { 'text-field': { classes: '.root:not(.multiline)' }, 'text-area': { classes: '.root.multiline' } },
  familyClass: () => '',
  axisClass: {},
  stateSelector: TEXT_FIELD_STATES,
  stateRank: { default: 0, hover: 1, focused: 2, error: 3, 'error-hover': 4, 'error-focused': 5, 'read-only': 6, disabled: 7 },
  layers: {
    '(root)': (n, W) => ({ '--tf-stack-gap': W(n.g) }),
    'field': () => ({}),
    'field/label-row': (n, W) => ({ '--tf-label-gap': W(n.g) }),
    'field/label-row/Label': () => ({}),
    'field/label-row/required-asterisk': () => ({}),
    'field/Label': () => ({}),
    'field/input-box': (n, W) => ({
      ...(n.h ? { '--tf-h': W(n.h) } : {}),
      '--tf-pt': W(n.p[0]), '--tf-pr': W(n.p[1]), '--tf-pb': W(n.p[2]), '--tf-pl': W(n.p[3]),
      '--tf-gap': W(n.g),
      ...(n.r ? { '--tf-r-tl': W(n.r[0]), '--tf-r-tr': W(n.r[1]), '--tf-r-br': W(n.r[2]), '--tf-r-bl': W(n.r[3]) } : {}),
    }),
    'field/input-box/leading-icon': (n, W) => ({ '--tf-icon': W(n.w) }),
    'field/input-box/trailing-icon': (n, W) => ({ '--tf-icon': W(n.w) }),
    'field/input-box/*-icon/**': () => ({}),
    'field/input-box/leading-divider': (n, W) => ({ '--tf-divider-w': W(n.w), '--tf-divider-h': W(n.h) }),
    'field/input-box/trailing-divider': (n, W) => ({ '--tf-divider-w': W(n.w), '--tf-divider-h': W(n.h) }),
    'field/input-box/*-divider/**': () => ({}),
    'field/input-box/Text': () => ({}),
    'Hint text': () => ({}),
  },
  text: [
    { layers: ['field/label-row/Label', 'field/Label'], vars: { '--tf-label-font-family': 'font-family', '--tf-label-font-size': 'font-size', '--tf-label-line-height': 'line-height', '--tf-label-font-weight': 'font-weight', '--tf-label-letter-space': 'letter-space' } },
    { layers: ['field/input-box/Text'], vars: { '--tf-font-family': 'font-family', '--tf-font-size': 'font-size', '--tf-line-height': 'line-height', '--tf-font-weight': 'font-weight', '--tf-letter-space': 'letter-space' } },
    { layers: ['Hint text'], vars: { '--tf-hint-font-family': 'font-family', '--tf-hint-font-size': 'font-size', '--tf-hint-line-height': 'line-height', '--tf-hint-font-weight': 'font-weight', '--tf-hint-letter-space': 'letter-space' } },
  ],
  colors: {
    'field/label-row/Label': (c, W) => ({ '--tf-label-fg': W(c.fills[0]) }),
    'field/Label': (c, W) => ({ '--tf-label-fg': W(c.fills[0]) }),
    'field/label-row/required-asterisk': (c, W) => ({ '--tf-required-fg': W(c.fills[0]) }),
    'field/input-box': (c, W) => ({
      '--tf-bg': c.fills ? W(c.fills[0]) : 'transparent',
      '--tf-border': c.strokes ? W(c.strokes[0]) : 'transparent',
      ...(c.strokes ? { '--tf-border-w': `${c.sw[0]}px` } : {}),
      '--tf-shadow': effectVar(c.fx, 'input-box effect'),
    }),
    'field/input-box/Text': (c, W) => (/placeholder/.test(c.fills[0]) ? { '--tf-placeholder': W(c.fills[0]) } : { '--tf-text': W(c.fills[0]) }),
    'field/input-box/*-divider/**': () => ({}),
    'field/input-box/*-icon/**': () => ({}),
    'Hint text': (c, W) => ({ '--tf-hint-fg': W(c.fills[0]) }),
  },
}

// ═══════════════════════════════════════════════════════════════════════════════
// Tooltip: หน้า 20 ชุด tooltip (กล่อง + หัวข้อ + ข้อความรอง + ลูกศร) โครงอ่านจาก placement=top ที่มีข้อความรอง
//   ลูกศรในโค้ดวาดด้วย clip-path จากความกว้างฐานและความสูง (placement ซ้าย/ขวา สลับสองค่านี้ในไฟล์ออกแบบ)
//   ระยะจากตัวกระตุ้น ความกว้างสูงสุด และความกว้างข้อความ เป็นตัวแปรใน Figma ที่ไม่มีชั้นให้ผูก จึงประกาศผ่าน extras
//   ชุด tooltip-arrow คือลูกศรต้นแบบขนาดเดียว โค้ดไม่ได้ใช้โครงของมัน เอาแค่สี
// ═══════════════════════════════════════════════════════════════════════════════
const TOOLTIP = {
  specFile: 'tokens/figma-layers/tooltip.json',
  baseFile: 'components/Tooltip/Tooltip.base.css',
  outFile: 'components/Tooltip/Tooltip.module.css',
  layoutKey: (size) => `${size}, placement=top, supporting-text=true, direction=`,
  sets: { 'tooltip': { classes: '.box' }, 'tooltip-arrow': { classes: '.box', ignoreLayout: true } },
  familyClass: () => '',
  axisClass: {},
  stateSelector: { default: (sel) => sel },
  extras: (size) => ({
    '--tt-offset': `tooltip/offset/${size}`,
    '--tt-max-width': `tooltip/max-width/${size}`,
    '--tt-max-width-mobile': `tooltip/max-width-mobile/${size}`,
    '--tt-text-max-width': `tooltip/text-max-width/${size}`,
  }),
  layers: {
    '(root)': (n, W) => ({
      '--tt-pad': W(n.p[0]), '--tt-stack': W(n.g),
      ...(n.r ? { '--tt-r-tl': W(n.r[0]), '--tt-r-tr': W(n.r[1]), '--tt-r-br': W(n.r[2]), '--tt-r-bl': W(n.r[3]) } : {}),
    }),
    'title': () => ({}),
    'support': () => ({}),
    'arrow': (n, W) => ({ '--tt-arrow': W(n.w), '--tt-arrow-h': W(n.h) }),
    'arrow/**': () => ({}),
  },
  text: [
    { layers: ['title'], vars: { '--tt-title-family': 'font-family', '--tt-title-size': 'font-size', '--tt-title-line': 'line-height', '--tt-title-weight': 'font-weight', '--tt-title-space': 'letter-space' } },
    { layers: ['support'], vars: { '--tt-desc-family': 'font-family', '--tt-desc-size': 'font-size', '--tt-desc-line': 'line-height', '--tt-desc-weight': 'font-weight', '--tt-desc-space': 'letter-space' } },
  ],
  colors: {
    '(root)': (c, W) => ({ '--tt-bg': W(c.fills[0]), '--tt-shadow': effectVar(c.fx, 'tooltip effect') }),
    'title': (c, W) => ({ '--tt-fg': W(c.fills[0]) }),
    'support': (c, W) => ({ '--tt-desc-fg': W(c.fills[0]) }),
    'arrow/shape': (c, W) => ({ '--tt-arrow-bg': W(c.fills[0]) }),
    'shape': (c, W) => ({ '--tt-arrow-bg': W(c.fills[0]) }),
  },
}

// ═══════════════════════════════════════════════════════════════════════════════
// Divider: หน้า 28 ชุด horizontal-divider กับ vertical-divider แกน type (solid/dash) ไม่มีแกนขนาด (key "one")
//   เส้นในไฟล์ออกแบบเป็น stroke ของ vector เส้นประคือ strokeDashes (ผูกตัวแปรไม่ได้ใน Figma) ส่งเป็นค่าดิบ --dv-dash-*
// ═══════════════════════════════════════════════════════════════════════════════
const DIVIDER = {
  specFile: 'tokens/figma-layers/divider.json',
  baseFile: 'components/Divider/Divider.base.css',
  outFile: 'components/Divider/Divider.module.css',
  sizes: ['one'],
  layoutKey: (size) => `${size}, type=solid`,
  sets: { 'horizontal-divider': { classes: '.root.horizontal' }, 'vertical-divider': { classes: '.root.vertical' } },
  familyClass: () => '',
  axisClass: { type: (v) => `.${v}` },
  stateSelector: { default: (sel) => sel },
  layers: {
    '(root)': (n, W) => (n.w ? { '--dv-thickness': W(n.w) } : {}),
    'Frame': (n, W) => ({ '--dv-thickness': W(n.h ?? n.w) }),
    'Frame/Path': () => ({}),
  },
  colors: {
    'Frame/Path': (c, W) => ({
      '--dv-color': W(c.strokes[0]),
      '--dv-stroke': `${c.sw[0]}px`,
      ...(c.sd ? { '--dv-dash-on': `${c.sd[0]}px`, '--dv-dash-off': `${c.sd[1] ?? c.sd[0]}px` } : {}),
    }),
  },
}

// ═══════════════════════════════════════════════════════════════════════════════
// Toast กับ Banner: หน้า 19 โครงเดียวกัน (ไอคอน + กลุ่มข้อความ + ปุ่มลิงก์ + ปุ่มปิด) แกน type 5 ชนิดคือสี
//   Toast กว้างตายตัวต่อขนาด (toast/width) มีเงา · Banner กว้างเต็มแถว ไม่มีเงา มีแกน level (page ไม่มีมุมโค้ง section มี)
//   ปุ่ม action เป็น instance ของ link-button ค่าข้างในเป็นของ LinkButton ไม่ใช่ของ component นี้
// ═══════════════════════════════════════════════════════════════════════════════
const typeClass = (v) => '.type' + v.charAt(0).toUpperCase() + v.slice(1)
const notice = (px, specFile, baseFile, outFile, extra = {}) => ({
  specFile, baseFile, outFile,
  familyClass: () => '',
  axisClass: { type: typeClass },
  stateSelector: { default: (sel) => sel },
  layers: {
    '(root)': (n, W) => ({
      ...(typeof n.w === 'string' ? { [`--${px}-w`]: W(n.w) } : {}),   // banner กว้างเต็มแถว (ค่าดิบในตัวอย่าง) ไม่ส่งไปโค้ด
      [`--${px}-pt`]: W(n.p[0]), [`--${px}-pr`]: W(n.p[1]), [`--${px}-pb`]: W(n.p[2]), [`--${px}-pl`]: W(n.p[3]),
      [`--${px}-gap`]: W(n.g),
      ...(n.r ? { [`--${px}-r-tl`]: W(n.r[0]), [`--${px}-r-tr`]: W(n.r[1]), [`--${px}-r-br`]: W(n.r[2]), [`--${px}-r-bl`]: W(n.r[3]) } : {}),
    }),
    'icon': (n, W) => ({ [`--${px}-icon`]: W(n.w) }),
    'icon/**': () => ({}),
    'content': (n, W) => ({ [`--${px}-action-gap`]: W(n.g) }),
    'content/text': (n, W) => ({ [`--${px}-stack`]: W(n.g) }),
    'content/text/title': () => ({}),
    'content/text/support': () => ({}),
    'content/action': () => ({}),
    'content/action/**': () => ({}),
    'close': (n, W) => ({ [`--${px}-close`]: W(n.w) }),
    'close/**': () => ({}),
  },
  text: [
    { layers: ['content/text/title'], vars: { [`--${px}-title-family`]: 'font-family', [`--${px}-title-size`]: 'font-size', [`--${px}-title-line`]: 'line-height', [`--${px}-title-weight`]: 'font-weight', [`--${px}-title-space`]: 'letter-space' } },
    { layers: ['content/text/support'], vars: { [`--${px}-desc-family`]: 'font-family', [`--${px}-desc-size`]: 'font-size', [`--${px}-desc-line`]: 'line-height', [`--${px}-desc-weight`]: 'font-weight', [`--${px}-desc-space`]: 'letter-space' } },
  ],
  colors: {
    '(root)': (c, W) => ({ [`--${px}-bg`]: W(c.fills[0]), [`--${px}-shadow`]: effectVar(c.fx, `${px} effect`) }),
    'icon/vector': (c, W) => ({ [`--${px}-icon-color`]: W(c.fills[0]) }),
    'content/text/title': (c, W) => ({ [`--${px}-fg`]: W(c.fills[0]) }),
    'content/text/support': (c, W) => ({ [`--${px}-desc-fg`]: W(c.fills[0]) }),
    'close/vector': (c, W) => ({ [`--${px}-close-color`]: W(c.fills[0]) }),
    'content/action/**': () => ({}),
  },
  ...extra,
})
const TOAST = notice('ts', 'tokens/figma-layers/toast.json', 'components/Toast/Toast.base.css', 'components/Toast/Toast.module.css', {
  sets: { 'toast': { classes: '.root' } },
})
const BANNER = notice('bn', 'tokens/figma-layers/banner.json', 'components/Banner/Banner.base.css', 'components/Banner/Banner.module.css', {
  sets: { 'banner': { classes: '.root' } },
  layoutVariants: [
    { key: (size) => `${size}, level=section`, cls: '.levelSection' },
    { key: (size) => `${size}, level=page`, cls: '.levelPage' },
  ],
})

// ═══════════════════════════════════════════════════════════════════════════════
// Tabs: หน้า 18 ชุดแท็บเดี่ยว 2 ทรง (segmented / underline) แกน current icon size state และชุดกลุ่ม 2 ทรง
//   คลาสขนาดอยู่ที่ root (.segmented.md) แต่ชั้นอยู่ที่ .tab จึงใช้ sizeSel · ไอคอนเป็น data-icon ของปุ่ม current เป็น aria-selected
//   เส้นของแท็บ: segmented มี stroke ขวา (เส้นคั่น) underline มี stroke ล่าง (ราง 1 / ตัวชี้ 2) ตัวสร้างส่งความหนาทั้งสองด้านให้
// ═══════════════════════════════════════════════════════════════════════════════
const tabRootLayout = (n, W) => ({
  '--tab-pt': W(n.p[0]), '--tab-pr': W(n.p[1]), '--tab-pb': W(n.p[2]), '--tab-pl': W(n.p[3]), '--tab-gap': W(n.g),
})
const TABS = {
  specFile: 'tokens/figma-layers/tabs.json',
  baseFile: 'components/Tabs/Tabs.base.css',
  outFile: 'components/Tabs/Tabs.module.css',
  sets: {
    'segmented-tab': { classes: '.segmented .tab' }, 'underline-tab': { classes: '.underline .tab' },
    'segmented-tab-group': { classes: '.segmented .tablist' }, 'underline-tab-group': { classes: '.underline .tablist' },
  },
  sizeSel: (sel, size) => sel.replace(/^(\.[\w-]+)/, `$1.${size}`),
  layoutVariants: [
    { key: (size, set) => (set.endsWith('group') ? `${size}, icon=false, current=` : `${size}, icon=leading, current=false`), cls: '' },
    { key: (size, set) => (set.endsWith('group') ? `${size}, icon=false, current=` : `${size}, icon=unread, current=false`), cls: '[data-icon="unread"]' },
    { key: (size, set) => (set.endsWith('group') ? `${size}, icon=false, current=` : `${size}, icon=only, current=false`), cls: '[data-icon="only"]' },
  ],
  familyClass: () => '',
  axisClass: {
    current: (v, set) => (set.endsWith('group') ? '' : `[aria-selected="${v}"]`),
    icon: (v, set) => (set.endsWith('group') ? '' : `[data-icon="${v === 'false' ? 'none' : v}"]`),
  },
  stateSelector: {
    default: (sel) => sel,
    hover: (sel) => `${sel}:hover:not([aria-disabled="true"])`,
    focused: (sel) => `${sel}:focus-visible`,
    disabled: (sel) => `${sel}[aria-disabled="true"]`,
  },
  layers: {
    '(root)': (n, W) => (n.r ? { '--tab-r-tl': W(n.r[0]), '--tab-r-tr': W(n.r[1]), '--tab-r-br': W(n.r[2]), '--tab-r-bl': W(n.r[3]) } : (n.p ? tabRootLayout(n, W) : {})),
    'icon': (n, W) => ({ '--tab-icon': W(n.w) }),
    'icon/**': () => ({}),
    'unread': (n, W) => ({ '--tab-unread': W(n.w) }),
    'unread/**': () => ({}),
    'Text': () => ({}),
    'segmented-tab': () => ({}), 'segmented-tab/**': () => ({}),
    'underline-tab': () => ({}), 'underline-tab/**': () => ({}),
  },
  text: [{ layers: ['Text'], vars: { '--tab-font-family': 'font-family', '--tab-font-size': 'font-size', '--tab-line-height': 'line-height', '--tab-font-weight': 'font-weight', '--tab-letter-space': 'letter-space' } }],
  colors: {
    '(root)': (c, W, ctx) => {
      const isGroup = /group/.test(ctx.set)
      if (isGroup) return {
        '--tab-group-border': c.strokes ? W(c.strokes[0]) : 'transparent',
        '--tab-group-border-w': c.strokes ? `${Math.max(...c.sw)}px` : '0px',
        '--tab-group-shadow': effectVar(c.fx, 'tab group effect'),
      }
      return {
        '--tab-bg': c.fills ? W(c.fills[0]) : 'transparent',
        '--tab-line': c.strokes ? W(c.strokes[0]) : 'transparent',
        '--tab-line-w': c.strokes ? `${c.sw[2]}px` : '0px',
        '--tab-divider-w': c.strokes ? `${c.sw[1]}px` : '0px',
      }
    },
    'Text': (c, W) => ({ '--tab-fg': W(c.fills[0]) }),
    'icon/**/vector': (c, W) => ({ '--tab-icon-color': W(c.fills[0]) }),
    'unread/Dot': (c, W) => ({ '--tab-unread-color': W(c.fills[0]) }),
    'segmented-tab': () => ({}), 'segmented-tab/**': () => ({}),
    'underline-tab': () => ({}), 'underline-tab/**': () => ({}),
  },
}

// ═══════════════════════════════════════════════════════════════════════════════
// Pagination: หน้า 24 ชุด pagination (ลูกศรเป็น instance ของ semi-rounded-button Neutral secondary + กลุ่มตัวเลข)
//   กับชุดฐาน _pagination-number-button (6 สถานะ) และ _pagination-ellipsis คลาสขนาดอยู่ที่ root
// ═══════════════════════════════════════════════════════════════════════════════
const PAGINATION = {
  specFile: 'tokens/figma-layers/pagination.json',
  baseFile: 'components/Pagination/Pagination.base.css',
  outFile: 'components/Pagination/Pagination.module.css',
  sets: { 'pagination': { classes: '.root' }, '_pagination-number-button': { classes: '.control' }, '_pagination-ellipsis': { classes: '.ellipsis' } },
  sizeSel: (sel, size) => (sel.startsWith('.root') ? `.root.${size}${sel.slice(5)}` : `.${size} ${sel}`),
  familyClass: () => '',
  axisClass: {},
  stateSelector: {
    default: (sel) => sel,
    hover: (sel) => `${sel}:hover:not([aria-current="page"]):not(:disabled):not([aria-disabled="true"])`,
    pressed: (sel) => `${sel}:active:not([aria-current="page"]):not(:disabled):not([aria-disabled="true"])`,
    focused: (sel) => `${sel}:focus-visible`,
    current: (sel) => `${sel}[aria-current="page"]`,
    disabled: (sel) => `${sel}:disabled, ${sel}[aria-disabled="true"]`,
  },
  stateRank: { default: 0, hover: 1, pressed: 2, focused: 3, current: 4, disabled: 5 },
  layers: {
    '(root)': (n, W, ctx) => (n.w === 724 || typeof n.w === 'number' ? { '--pg-group-gap': W(n.g) } : { '--pg-h': W(n.h), '--pg-px': W(n.p[1]), ...(n.r ? { '--pg-r-tl': W(n.r[0]), '--pg-r-tr': W(n.r[1]), '--pg-r-br': W(n.r[2]), '--pg-r-bl': W(n.r[3]) } : {}) }),
    'semi-rounded-button': (n, W) => ({
      '--pg-arrow-h': W(n.h), '--pg-arrow-gap': W(n.g),
      '--pg-arrow-pt': W(n.p[0]), '--pg-arrow-pr': W(n.p[1]), '--pg-arrow-pb': W(n.p[2]), '--pg-arrow-pl': W(n.p[3]),
      ...(n.r ? { '--pg-arrow-r-tl': W(n.r[0]), '--pg-arrow-r-tr': W(n.r[1]), '--pg-arrow-r-br': W(n.r[2]), '--pg-arrow-r-bl': W(n.r[3]) } : {}),
    }),
    'semi-rounded-button/Left Icon': (n, W) => ({ '--pg-icon': W(n.w) }),
    'semi-rounded-button/Right Icon': (n, W) => ({ '--pg-icon': W(n.w) }),
    'semi-rounded-button/**': () => ({}),
    'numbers': (n, W) => ({ '--pg-gap': W(n.g) }),
    'numbers/**': () => ({}),
    '1': () => ({}),
    '…': () => ({}),
  },
  text: [{ layers: ['1', '…'], vars: { '--pg-font-family': 'font-family', '--pg-font-size': 'font-size', '--pg-line-height': 'line-height', '--pg-font-weight': 'font-weight', '--pg-letter-space': 'letter-space' } }],
  colors: {
    '(root)': (c, W) => ({ '--pg-bg': c.fills ? W(c.fills[0]) : 'transparent', '--pg-ring': effectVar(c.fx, 'pagination effect') }),
    '1': (c, W) => ({ '--pg-fg': W(c.fills[0]) }),
    '…': (c, W) => ({ '--pg-fg': W(c.fills[0]) }),
    'semi-rounded-button': (c, W) => ({
      '--pg-arrow-bg': c.fills ? W(c.fills[0]) : 'transparent',
      '--pg-arrow-border': c.strokes ? W(c.strokes[0]) : 'transparent',
      '--pg-arrow-border-w': c.strokes ? `${c.sw[0]}px` : '0px',
      '--pg-arrow-shadow': effectVar(c.fx, 'pagination arrow effect'),
    }),
    'semi-rounded-button/**': () => ({}),
    'numbers/**': () => ({}),
  },
}

// ═══════════════════════════════════════════════════════════════════════════════
// Avatar: หน้า 11 อวาตาร์ 4 แบบ (image icon monogram number แกน online-indicator state) + ป้ายชื่อ + กลุ่ม + จุดสถานะฐาน
//   โค้ดเป็น Avatar เดียว แยกด้วย data-variant จุดสถานะคือ .indicator ใต้ root ที่มี data-status
//   ป้ายชื่อกับกลุ่มมีขนาดไม่ครบ 5 ขั้น (sizes ต่อชุด) ค่าอวาตาร์ข้างในป้าย/กลุ่มเป็นของ Avatar เอง ไม่ดึงซ้ำ
// ═══════════════════════════════════════════════════════════════════════════════
const AV_KEY = (tail) => (size) => `${size}, ${tail}`
const avatarSet = (variant) => ({ classes: `.root[data-variant="${variant}"]` })
const avatarColors = {
  'Frame': (c, W) => ({ '--av-bg': c.fills ? W(c.fills[0]) : 'transparent', '--av-ring': c.strokes ? W(c.strokes[0]) : 'transparent', '--av-ring-w': c.strokes ? `${c.sw[0]}px` : '0px' }),
  'Frame/Image': () => ({}),
  'Frame/**/vector': (c, W) => ({ '--av-icon-color': W(c.fills[0]) }),
  'Frame/Text': (c, W) => ({ '--av-fg': W(c.fills[0]) }),
  '_avatar-online-indicator': (c, W) => ({ '--av-ind-bg': W(c.fills[0]), '--av-ind-ring': c.strokes ? W(c.strokes[0]) : 'transparent', '--av-ind-ring-w': c.strokes ? `${c.sw[0]}px` : '0px' }),
}
const AVATAR = {
  specFile: 'tokens/figma-layers/avatar.json',
  baseFile: 'components/Avatar/Avatar.base.css',
  outFile: 'components/Avatar/Avatar.module.css',
  sets: {
    'avatar-image': avatarSet('image'), 'avatar-icon': avatarSet('icon'), 'avatar-monogram': avatarSet('monogram'), 'avatar-number': avatarSet('number'),
    'avatar-label': { classes: '.label', sizes: ['sm', 'md', 'lg', 'xl'] },
    'avatar-group': { classes: '.group', sizes: ['xs', 'sm', 'md'] },
    '_avatar-online-indicator': { classes: '.root' },
  },
  sizeSel: (sel, size) => sel.replace(/^(\.[\w-]+)/, `$1.${size}`),
  layoutVariants: [{
    key: (size, set) => {
      if (set === 'avatar-label') return `${size}, online-indicator=, status-icon=online-indicator, add-user-button=, more-users=, online=`
      if (set === 'avatar-group') return `${size}, online-indicator=, status-icon=, add-user-button=false, more-users=true, online=`
      if (set === '_avatar-online-indicator') return `${size}, online-indicator=, status-icon=, add-user-button=, more-users=, online=true`
      return `${size}, online-indicator=true, status-icon=, add-user-button=, more-users=, online=`
    }, cls: '',
  }],
  familyClass: () => '',
  axisClass: {
    'online-indicator': (v) => (v === 'true' ? '[data-status]' : ':not([data-status])'),
    'online': (v) => `[data-status="${v === 'true' ? 'online' : 'offline'}"]`,
    'status-icon': () => '', 'add-user-button': () => '', 'more-users': () => '',
  },
  stateSelector: { default: (sel) => sel, hover: (sel) => `${sel}[data-interactive="true"]:hover` },
  layers: {
    '(root)': (n, W, ctx) => {
      if (ctx.set === 'avatar-label') return { '--av-label-gap': W(n.g) }
      if (ctx.set === 'avatar-group') return { '--av-group-gap': W(n.g) }
      if (ctx.set === '_avatar-online-indicator') return { '--av-indicator': W(n.w) }
      return { '--av-size': W(n.w), ...(n.r ? { '--av-r-tl': W(n.r[0]), '--av-r-tr': W(n.r[1]), '--av-r-br': W(n.r[2]), '--av-r-bl': W(n.r[3]) } : {}) }
    },
    'Frame': () => ({}),
    'Frame/Image': () => ({}),
    'Frame/Text': () => ({}),
    'Frame/account-&-auth/person': (n, W) => ({ '--av-icon': W(n.w) }),
    'Frame/**': () => ({}),
    '_avatar-online-indicator': (n, W) => ({ '--av-indicator': W(n.w) }),
    '_avatar-online-indicator/**': () => ({}),
    'avatar-icon': () => ({}), 'avatar-icon/**': () => ({}),
    'Text and supporting text': (n, W) => ({ '--av-label-stack': W(n.g) }),
    'Text and supporting text/**': () => ({}),
    'Avatars': (n, W) => ({ '--av-overlap': W(n.g) }),
    'Avatars/**': () => ({}),
    '**': () => ({}),   // ปุ่มเพิ่มผู้ใช้ในกลุ่ม เป็น instance ของปุ่มไอคอน ค่าเป็นของมันเอง
  },
  text: [
    { sets: ['avatar-monogram'], layers: ['Frame/Text'], vars: { '--av-mono-font-family': 'font-family', '--av-mono-font-size': 'font-size', '--av-mono-line-height': 'line-height', '--av-mono-font-weight': 'font-weight', '--av-mono-letter-space': 'letter-space' } },
    { sets: ['avatar-number'], layers: ['Frame/Text'], vars: { '--av-num-font-family': 'font-family', '--av-num-font-size': 'font-size', '--av-num-line-height': 'line-height', '--av-num-font-weight': 'font-weight', '--av-num-letter-space': 'letter-space' } },
    { sets: ['avatar-label'], layers: ['Text and supporting text/Text'], vars: { '--av-label-font-family': 'font-family', '--av-label-font-size': 'font-size', '--av-label-line-height': 'line-height', '--av-label-font-weight': 'font-weight', '--av-label-letter-space': 'letter-space' } },
    { sets: ['avatar-label'], layers: ['Text and supporting text/Supporting text'], vars: { '--av-sup-font-family': 'font-family', '--av-sup-font-size': 'font-size', '--av-sup-line-height': 'line-height', '--av-sup-font-weight': 'font-weight', '--av-sup-letter-space': 'letter-space' } },
  ],
  colors: {
    ...avatarColors,
    '(root)': (c, W, ctx) => (ctx.set === '_avatar-online-indicator'
      ? { '--av-ind-bg': W(c.fills[0]), '--av-ind-ring': c.strokes ? W(c.strokes[0]) : 'transparent', '--av-ind-ring-w': c.strokes ? `${c.sw[0]}px` : '0px' }
      : {}),
    'avatar-icon': () => ({}), 'avatar-icon/**': () => ({}),
    'Text and supporting text/Text': (c, W) => ({ '--av-label-fg': W(c.fills[0]) }),
    'Text and supporting text/Supporting text': (c, W) => ({ '--av-sup-fg': W(c.fills[0]) }),
    'Avatars/**': () => ({}),
    '**': () => ({}),
  },
}

// ═══════════════════════════════════════════════════════════════════════════════
// Dropdown: หน้า 25 ช่อง (9 สถานะเหมือนช่องกรอก) แผง option (6 สถานะ) และหัวกลุ่ม คลาสขนาดอยู่ที่ root
//   สถานะของช่องเป็น data attribute ของ root + :hover/:focus-visible ของปุ่ม · option ใช้ aria-selected / data-active / aria-disabled
//   ชั้นข้อความในช่องเป็น placeholder ตอนพัก (ชื่อ token มีคำว่า placeholder) และข้อความที่เลือกตอน hover/focused เหมือน TextField
// ═══════════════════════════════════════════════════════════════════════════════
const ddRoot = (sel, attrs) => (sel.includes(' ') ? sel.replace(' ', `${attrs} `) : `.root${attrs} ${sel}`)
const DROPDOWN_FIELD_STATES = {
  default: (sel) => sel,
  hover: (sel) => `${ddRoot(sel, ':not([data-error]):not([data-disabled]):not([data-readonly])')}:hover`,
  focused: (sel) => `${ddRoot(sel, ':not([data-error])')}:focus-visible`,
  open: (sel) => ddRoot(sel, '[data-open]'),
  error: (sel) => ddRoot(sel, '[data-error]'),
  'error-hover': (sel) => `${ddRoot(sel, '[data-error]:not([data-disabled]):not([data-readonly])')}:hover`,
  'error-focused': (sel) => `${ddRoot(sel, '[data-error]')}:focus-visible`,
  'read-only': (sel) => ddRoot(sel, '[data-readonly]'),
  disabled: (sel) => ddRoot(sel, '[data-disabled]'),
}
const DROPDOWN_OPTION_STATES = {
  default: (sel) => sel,
  hover: (sel) => `${sel}:hover:not([aria-disabled]):not([aria-selected="true"])`,
  focused: (sel) => `${sel}[data-active]:not([aria-selected="true"])`,
  selected: (sel) => `${sel}[aria-selected="true"]`,
  'selected-hover': (sel) => `${sel}[aria-selected="true"]:hover:not([aria-disabled]), ${sel}[aria-selected="true"][data-active]`,
  disabled: (sel) => `${sel}[aria-disabled]`,
}
const DROPDOWN = {
  specFile: 'tokens/figma-layers/dropdown.json',
  baseFile: 'components/Dropdown/Dropdown.base.css',
  outFile: 'components/Dropdown/Dropdown.module.css',
  sizes: ['sm', 'md', 'lg'],
  sets: { 'dropdown': { classes: '.field' }, 'dropdown-menu': { classes: '.panel' }, '_dropdown-option': { classes: '.option' }, '_dropdown-group-header': { classes: '.groupHeader' } },
  sizeSel: (sel, size) => `.${size} ${sel}`,
  layoutVariants: [{ key: (size, set) => (set === '_dropdown-option' ? `${size}, state=selected` : set === 'dropdown' ? `${size}, state=default` : `${size}, state=`), cls: '' }],
  hiddenLayers: ['leading-avatar', 'text/supporting-text', 'group-header', 'group-divider'],
  familyClass: () => '',
  axisClass: {},
  stateSelector: { ...DROPDOWN_FIELD_STATES, selected: DROPDOWN_OPTION_STATES.selected, 'selected-hover': DROPDOWN_OPTION_STATES['selected-hover'] },
  stateRank: { default: 0, hover: 1, focused: 2, open: 3, selected: 4, 'selected-hover': 5, error: 6, 'error-hover': 7, 'error-focused': 8, 'read-only': 9, disabled: 10 },
  // option กับช่องใช้ตัวเลือก selector คนละชุด แยกด้วยชื่อชุดใน stateSelectorBySet
  stateSelectorBySet: { '_dropdown-option': DROPDOWN_OPTION_STATES },
  layers: {
    '(root)': (n, W, ctx) => {
      if (ctx.set === 'dropdown') return { '--dd-h': W(n.h), '--dd-px': W(n.p[1]), '--dd-gap': W(n.g), ...(n.r ? { '--dd-r-tl': W(n.r[0]), '--dd-r-tr': W(n.r[1]), '--dd-r-br': W(n.r[2]), '--dd-r-bl': W(n.r[3]) } : {}) }
      if (ctx.set === 'dropdown-menu') return { '--dd-panel-py': W(n.p[0]), ...(n.r ? { '--dd-panel-r-tl': W(n.r[0]), '--dd-panel-r-tr': W(n.r[1]), '--dd-panel-r-br': W(n.r[2]), '--dd-panel-r-bl': W(n.r[3]) } : {}) }
      return { '--dd-row-py': W(n.p[0]), '--dd-px': W(n.p[1]), '--dd-gap': W(n.g) }
    },
    'เลือกตัวเลือก': () => ({}),
    'chevron': (n, W) => ({ '--dd-icon': W(n.w) }),
    'chevron/**': () => ({}),
    'checkbox': () => ({}), 'checkbox/**': () => ({}),
    'leading-icon': (n, W) => ({ '--dd-icon': W(n.w) }),
    'leading-icon/**': () => ({}),
    'leading-avatar': (n, W) => ({ '--dd-avatar': W(n.w) }),
    'leading-avatar/**': () => ({}),
    'text': (n, W) => ({ '--dd-text-gap': W(n.g) }),
    'text/**': () => ({}),
    'status-&-feedback/check': (n, W) => ({ '--dd-check': W(n.w) }),
    'status-&-feedback/check/**': () => ({}),
    'ชื่อกลุ่ม': () => ({}),
    'group-header': () => ({}), 'group-header/**': () => ({}),
    'group-divider': () => ({}), 'group-divider/**': () => ({}),
    '_dropdown-option': () => ({}), '_dropdown-option/**': () => ({}),
  },
  text: [
    { sets: ['dropdown'], layers: ['เลือกตัวเลือก'], vars: { '--dd-font-family': 'font-family', '--dd-font-size': 'font-size', '--dd-line-height': 'line-height', '--dd-font-weight': 'font-weight', '--dd-letter-space': 'letter-space' } },
    { sets: ['_dropdown-option'], layers: ['text/ตัวเลือก'], vars: { '--dd-opt-font-family': 'font-family', '--dd-opt-font-size': 'font-size', '--dd-opt-line-height': 'line-height', '--dd-opt-font-weight': 'font-weight', '--dd-opt-letter-space': 'letter-space' } },
    { sets: ['_dropdown-option'], layers: ['text/supporting-text'], vars: { '--dd-sup-font-family': 'font-family', '--dd-sup-font-size': 'font-size', '--dd-sup-line-height': 'line-height', '--dd-sup-font-weight': 'font-weight', '--dd-sup-letter-space': 'letter-space' } },
    { sets: ['_dropdown-group-header'], layers: ['ชื่อกลุ่ม'], vars: { '--dd-group-font-family': 'font-family', '--dd-group-font-size': 'font-size', '--dd-group-line-height': 'line-height', '--dd-group-font-weight': 'font-weight', '--dd-group-letter-space': 'letter-space' } },
  ],
  colors: {
    '(root)': (c, W, ctx) => {
      if (ctx.set === 'dropdown') return { '--dd-bg': W(c.fills[0]), '--dd-border': c.strokes ? W(c.strokes[0]) : 'transparent', '--dd-border-w': c.strokes ? `${c.sw[0]}px` : '0px', '--dd-shadow': effectVar(c.fx, 'dropdown effect') }
      if (ctx.set === 'dropdown-menu') return { '--dd-panel-bg': W(c.fills[0]), '--dd-panel-border': c.strokes ? W(c.strokes[0]) : 'transparent', '--dd-panel-border-w': c.strokes ? `${c.sw[0]}px` : '0px', '--dd-panel-shadow': effectVar(c.fx, 'panel effect') }
      return { ...(c.fills ? { '--dd-opt-bg': W(c.fills[0]) } : {}), '--dd-opt-ring': effectVar(c.fx, 'option effect') }
    },
    'เลือกตัวเลือก': (c, W) => (/placeholder/.test(c.fills[0]) ? { '--dd-placeholder': W(c.fills[0]) } : { '--dd-text': W(c.fills[0]) }),
    'chevron/vector': (c, W) => ({ '--dd-icon-color': W(c.fills[0]) }),
    'text/ตัวเลือก': (c, W) => ({ '--dd-opt-fg': W(c.fills[0]) }),
    'text/supporting-text': (c, W) => ({ '--dd-sup-fg': W(c.fills[0]) }),
    'leading-icon/vector': (c, W) => ({ '--dd-opt-icon': W(c.fills[0]) }),
    'status-&-feedback/check/vector': (c, W) => ({ '--dd-check-color': W(c.fills[0]) }),
    'ชื่อกลุ่ม': (c, W) => ({ '--dd-group-fg': W(c.fills[0]) }),
    'checkbox': () => ({}), 'checkbox/**': () => ({}), 'leading-avatar/**': () => ({}),
    'group-header/**': () => ({}), 'group-divider/**': () => ({}), '_dropdown-option': () => ({}), '_dropdown-option/**': () => ({}),
  },
}

// ═══════════════════════════════════════════════════════════════════════════════
// Slider: หน้า 17 แถบเลื่อนค่าเดียวกับช่วง (โครงเดียวกัน ต่างที่จำนวนปุ่มจับ) และปุ่มจับฐาน 5 สถานะ
//   ค่าของปุ่มจับอ่านจากชุด slider-handle (ชุดแถบเลื่อนมีแค่พัก/ปิดใช้) ป้ายค่าเป็น instance ของคำใบ้ ค่าอยู่ที่ Tooltip
// ═══════════════════════════════════════════════════════════════════════════════
const SLIDER = {
  specFile: 'tokens/figma-layers/slider.json',
  baseFile: 'components/Slider/Slider.base.css',
  outFile: 'components/Slider/Slider.module.css',
  sets: { 'slider': { classes: '.root' }, 'range-slider': { classes: '.root' }, 'slider-handle': { classes: '.handle' } },
  sizeSel: (sel, size) => (sel.startsWith('.root') ? `.root.${size}${sel.slice(5)}` : `.${size} ${sel}`),
  layoutVariants: [{ key: (size, set) => (set === 'slider-handle' ? `${size}, disabled=` : `${size}, disabled=false`), cls: '' }],
  hiddenLayers: ['min-max-label'],
  familyClass: () => '',
  axisClass: { disabled: (v) => (v === 'true' ? '[data-disabled]' : ':not([data-disabled])') },
  stateSelector: {
    default: (sel) => sel,
    hover: (sel) => `${sel}:hover`,
    pressed: (sel) => `${sel}:active`,
    focused: (sel) => `${sel}:focus-visible`,
    disabled: (sel) => (sel.includes(' ') ? sel.replace(' ', '[data-disabled] ') : `.root[data-disabled] ${sel}`),
  },
  stateRank: { default: 0, hover: 1, pressed: 2, focused: 3, disabled: 4 },
  layers: {
    '(root)': (n, W, ctx) => (ctx.set === 'slider-handle' ? { '--sl-handle': W(n.w) } : { '--sl-gap': W(n.g) }),
    'row': (n, W) => ({ '--sl-row': W(n.h) }),
    'row/track': (n, W) => ({ '--sl-track': W(n.h), ...(n.r ? { '--sl-r': W(n.r[0]) } : {}) }),
    'row/track/fill': () => ({}),
    'row/track/handle-anchor/handle': (n, W) => ({ '--sl-handle': W(n.w) }),
    'row/track/fill/handle-start': (n, W) => ({ '--sl-handle': W(n.w) }),
    'row/track/fill/handle-end': () => ({}),
    'min-max-label': () => ({}),
    'min-max-label/**': () => ({}),
    '**': () => ({}),
  },
  text: [{ sets: ['slider', 'range-slider'], layers: ['min-max-label/min'], vars: { '--sl-label-font-family': 'font-family', '--sl-label-font-size': 'font-size', '--sl-label-line-height': 'line-height', '--sl-label-font-weight': 'font-weight', '--sl-label-letter-space': 'letter-space' } }],
  colors: {
    '(root)': (c, W) => ({ '--sl-handle-bg': W(c.fills[0]), '--sl-handle-border': c.strokes ? W(c.strokes[0]) : 'transparent', '--sl-handle-border-w': c.strokes ? `${c.sw[0]}px` : '0px', '--sl-handle-ring': effectVar(c.fx, 'handle effect') }),
    'row/track': (c, W) => ({ '--sl-track-bg': W(c.fills[0]) }),
    'row/track/fill': (c, W) => ({ '--sl-fill': W(c.fills[0]) }),
    'min-max-label/min': (c, W) => ({ '--sl-label-fg': W(c.fills[0]) }),
    'min-max-label/max': () => ({}),
    '**': () => ({}),
  },
}

const COMPONENTS = { tag: TAG, badge: BADGE, button: BUTTON, 'icon-button': ICON_BUTTON, 'link-button': LINK_BUTTON, checkbox: CHECKBOX, radio: RADIO, toggle: TOGGLE, 'text-field': TEXT_FIELD, tooltip: TOOLTIP, divider: DIVIDER, toast: TOAST, banner: BANNER, tabs: TABS, pagination: PAGINATION, avatar: AVATAR, dropdown: DROPDOWN, slider: SLIDER }
const M = COMPONENTS[target]
if (!M) { console.error(`ใช้: node scripts/generate-component-css.mjs <${Object.keys(COMPONENTS).join('|')}> [--check]`); process.exit(2) }

// หา entry ในตารางจับคู่ ตรงตัวก่อน ไม่เจอค่อยลอง key ที่มี wildcard ตามลำดับที่ประกาศ
//   *  = ชั้นเดียวที่ไม่มี / ในชื่อ   ** = อะไรก็ได้รวมชื่อที่มี / (เช่น instance ไอคอน Material design(2)/NOTIFICATION/...)
function lookup(table, key) {
  if (table[key]) return table[key]
  for (const [k, fn] of Object.entries(table)) {
    if (!k.includes('*')) continue
    const re = new RegExp('^' + k.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*\*/g, '\u0000').replace(/\*/g, '[^/]+').replace(/\u0000/g, '.+') + '$')
    if (re.test(key)) return fn
  }
  return null
}
const spec = JSON.parse(fs.readFileSync(path.join(ROOT, M.specFile), 'utf8'))
// component ที่มีไม่ครบ 5 ขนาด (เช่น ช่องกรอกมี sm md lg) ประกาศ sizes ในตารางจับคู่
const SIZES = M.sizes || ['xs', 'sm', 'md', 'lg', 'xl']
// ชุดที่ประกาศ layoutAxes ตอนดึง (เช่น checked) จะมี key แบบ "md, checked=true" ตารางจับคู่เลือกด้วย layoutKey
const L = (set, size, keyFn = M.layoutKey) => {
  const key = keyFn ? keyFn(size) : size
  if (!set.layout[key]) errors.push(`ไม่มีโครง "${key}" ใน spec (มี ${Object.keys(set.layout).slice(0, 4).join(' | ')} …)`)
  return set.layout[key] || { t: 'COMPONENT' }
}
const out = []
const decl = (obj) => Object.entries(obj).map(([k, v]) => `${k}: ${v};`).join(' ')

// ── 1. ตัวอักษรต่อขนาด ───────────────────────────────────────────────────────
// component มีชั้นข้อความได้หลายกลุ่ม (เช่น หัวข้อ กับ ข้อความช่วย ของช่องติ๊ก) แต่ละกลุ่มมีช่อง --x-* ของตัวเอง
const textGroups = M.text ?? (M.textLayers?.length ? [{ layers: M.textLayers, vars: M.typography }] : [])
function walk(node, p, fn) {
  const key = p || '(root)'
  fn(key, node)
  for (const c of node.ch || []) walk(c, p ? `${p}/${c.n}` : c.n, fn)
}
if (textGroups.length) out.push('/* ── ตัวอักษรต่อขนาด จาก text style ของชั้นข้อความในไฟล์ออกแบบ ── */')
for (const size of textGroups.length ? SIZES : []) {
  const vars = {}
  for (const g of textGroups) {
    let ts = null
    for (const [setName, set] of Object.entries(spec.sets)) {
      if (M.sets[setName]?.ignoreLayout) continue
      if (g.sets && !g.sets.includes(setName)) continue                       // กลุ่มข้อความที่ผูกกับบางชุด (เช่น อักษรย่อ กับ ตัวเลข ของอวาตาร์ใช้ preset ต่างกัน)
      if (M.sets[setName]?.sizes && !M.sets[setName].sizes.includes(size)) continue   // ชุดที่มีไม่ครบทุกขนาด
      const k0 = (M.layoutVariants || [{ key: M.layoutKey }])[0].key
      walk(L(set, size, k0 && ((sz) => k0(sz, setName))), '', (key, n) => {
        if (n.ts && g.layers.includes(key)) {
          if (ts && ts !== n.ts) errors.push(`${setName} ${size} ${key}: text style ${n.ts} ไม่ตรงกับชุดอื่น (${ts})`)
          ts = n.ts
        }
      })
    }
    if (!ts) { if (!g.sets || g.sets.some((n) => !M.sets[n]?.sizes || M.sets[n].sizes.includes(size))) errors.push(`${size}: ไม่พบชั้นข้อความ ${g.layers.join('/')} ในชุดไหนเลย`); continue }
    Object.assign(vars, styleVars(ts, g.vars, `typography ${size} ${g.layers[0]}`))
  }
  out.push(`.${size} { ${decl(vars)} }`)
}

// ── 2. โครงต่อ ชุด × ขนาด ───────────────────────────────────────────────────
out.push('', '/* ── โครง (ระยะ ขนาด มุมโค้ง เงา) ต่อ ชุด × ขนาด อ่านจากชั้นของตระกูลอ้างอิง ── */')
// หลายชุดจับคู่กับคลาสเดียวกันได้ (เช่น checkbox กับ text-checkbox → .root) ค่าจะรวมกัน ถ้าขัดกันจะฟ้อง
const layoutBySel = new Map()
for (const [setName, set] of Object.entries(spec.sets)) {
  const map = M.sets[setName]
  if (!map) { errors.push(`ชุด ${setName} ไม่มีในตารางจับคู่ sets`); continue }
  if (map.ignoreLayout) continue   // ชุดที่โค้ดไม่ได้วาดตามโครง (เช่น ลูกศรต้นแบบของคำใบ้ที่โค้ดวาดด้วย clip-path)
  // โครงหลายแบบต่อขนาดตามแกน (เช่น banner ระดับ page กับ section ต่างกันที่มุมโค้ง) ประกาศ layoutVariants [{ key, cls }]
  for (const lv of (M.layoutVariants || [{ key: M.layoutKey, cls: '' }])) for (const size of (map.sizes || SIZES)) {
    const vars = {}
    walk(L(set, size, lv.key && ((sz) => lv.key(sz, setName))), '', (key, n) => {
      const fn = lookup(M.layers, key)
      if (!fn) { errors.push(`${setName} ${size}: ไม่รู้จักชั้น "${key}" (เพิ่มในตาราง layers)`); return }
      // ชั้นที่ซ่อนไว้ในตัวอย่าง (เช่น ไอคอนที่ปิดด้วย property) ยังต้องการค่า ส่วนชั้นที่ซ่อนแล้วไม่มีผลกับโค้ดให้ข้าม
      if (n.vis === false && key !== 'left-icon' && key !== 'close-icon' && !key.endsWith('-icon') && !(M.hiddenLayers || []).includes(key)) return
      Object.assign(vars, fn(n, (v) => toVar(v, `${setName} ${size} ${key}`), { set: setName, size }))
    })
    // token ที่มีใน Figma แต่ไม่มีชั้นให้ผูก (เช่น ระยะจากตัวกระตุ้น ความกว้างสูงสุดของคำใบ้) ประกาศผ่าน extras
    // ตัวสร้างตรวจว่าชื่อนั้นมีจริงทั้งในไฟล์ token และในตาราง id ของ Figma (tokens/figma-variable-ids.json)
    if (M.extras) for (const [prop, name] of Object.entries(M.extras(size))) {
      if (!FIGMA_VAR_NAMES.has(name)) errors.push(`${setName} ${size} extras ${prop}: ไฟล์ออกแบบไม่มีตัวแปร ${name}`)
      vars[prop] = toVar(name, `${setName} ${size} extras ${prop}`)
    }
    for (const cls of [].concat(map.classes)) {
      // component ที่ไม่มีแกนขนาดใช้ key "one" ไม่ต้องมีคลาสขนาด · คลาสขนาดอยู่ท้าย selector เว้นแต่ตารางจับคู่กำหนด sizeSel (เช่น ขนาดอยู่ที่ root แต่ชั้นอยู่ลึกกว่า)
      const sel = size === 'one' ? `${cls}${lv.cls}` : (M.sizeSel ? M.sizeSel(`${cls}${lv.cls}`, size) : `${cls}${lv.cls}.${size}`)
      const cur = layoutBySel.get(sel) || {}
      for (const [k, v] of Object.entries(vars)) {
        if (k in cur && cur[k] !== v) errors.push(`${sel} ${k}: ชุด ${setName} ให้ ${v} แต่ชุดก่อนหน้าให้ ${cur[k]} (ไฟล์ออกแบบสองชุดไม่ตรงกัน)`)
        cur[k] = v
      }
      layoutBySel.set(sel, cur)
    }
  }
}
for (const [sel, vars] of layoutBySel) out.push(`${sel} { ${decl(vars)} }`)

// ── 3. สีต่อ ชุด × ตระกูล × แกน × สถานะ (รวมกฎที่ประกาศเหมือนกันไว้ selector เดียว) ──
out.push('', '/* ── สี ต่อ ชุด × ตระกูล × แกน × สถานะ อ่านจาก fill/stroke ของทุกชั้น ── */')
// ขั้นแรกรวมค่าต่อ selector (หลายชุดที่จับคู่คลาสเดียวกัน เช่น checkbox กับ text-checkbox ต้องให้ค่าตรงกัน)
const colorBySel = new Map() // selector → { rank, vars }
for (const [setName, set] of Object.entries(spec.sets)) {
  const map = M.sets[setName]
  if (!map) continue
  for (const [family, combos] of Object.entries(set.colors)) {
    for (const [combo, paletteId] of Object.entries(combos)) {
      const axes = Object.fromEntries(combo.split(', ').filter(Boolean).map(s => s.split('=')))
      const state = axes.state || 'default'
      const famClass = M.familyClass(family, axes)
      const sels = [].concat(map.classes).map((cls) => {
        let sel = `${cls}${famClass}`
        for (const [axis, fn] of Object.entries(M.axisClass)) if (axis in axes) sel += fn(axes[axis], setName)
        if (axes.size) sel = M.sizeSel ? M.sizeSel(sel, axes.size) : `${sel}.${axes.size}`   // สีที่ต่างตามขนาด (เช่น เงาปุ่ม Alpha)
        return (M.stateSelectorBySet?.[setName] || M.stateSelector)[state]?.(sel)
      })
      if (sels.some((x) => !x)) { errors.push(`${setName} ${family} ${combo}: สถานะ ${state} ไม่รู้จัก`); continue }
      const sel = sels.join(',\n')
      const colors = spec.palette[paletteId]
      const vars = {}
      for (const [key, c] of Object.entries(colors)) {
        const fn = lookup(M.colors, key)
        if (!fn) { errors.push(`${setName} ${family} ${combo}: ไม่รู้จักชั้นสี "${key}" (เพิ่มในตาราง colors)`); continue }
        const where = `${setName} ${family} [${combo}] ${key}`
        // pressed: สถานะที่ไฟล์ออกแบบไม่มี แต่ token มี (ตัดสิน 2026-09-04) ให้ derive จากชื่อ token ของสถานะ default
        //   รูปแบบชื่อมี 2 แบบ: ของ component (…/default → …/pressed) กับของสี semantic (…/primary → …/primary-pressed)
        const pressed = (name) => {
          if (state !== 'default' || typeof name !== 'string') return null
          for (const p of [name.replace(/\/default$/, '/pressed'), `${name}-pressed`]) if (p !== name && cssVars.has(`--ntg-${p.replace(/\//g, '-')}`)) return toVar(p, where)
          return null
        }
        Object.assign(vars, fn(c, (v) => toVar(v, where), { state, axes, family, pressed, set: setName }))
      }
      const rank = (M.stateRank || { default: 0, hover: 1, focused: 2, disabled: 3 })[state] ?? 9
      const cur = colorBySel.get(sel) || { rank, vars: {} }
      for (const [k, v] of Object.entries(vars)) {
        if (k in cur.vars && cur.vars[k] !== v) errors.push(`${sel.replace(/\n/g, ' ')} ${k}: ชุด ${setName} ให้ ${v} แต่ชุดก่อนหน้าให้ ${cur.vars[k]} (ไฟล์ออกแบบสองชุดไม่ตรงกัน)`)
        cur.vars[k] = v
      }
      colorBySel.set(sel, cur)
    }
  }
}
// ขั้นสอง รวม selector ที่ประกาศค่าเหมือนกันทุกตัวไว้กฎเดียว
const groups = new Map() // "rank|declaration" → selectors[]
const order = []
for (const [sel, { rank, vars }] of colorBySel) {
  const k = `${rank}|${decl(vars)}`
  if (!groups.has(k)) { groups.set(k, []); order.push(k) }
  groups.get(k).push(sel)
}
// เรียง default → hover → disabled เพื่อให้สถานะทับกันถูกลำดับ
order.sort((a, b) => Number(a[0]) - Number(b[0]))
for (const k of order) {
  const d = k.slice(k.indexOf('|') + 1)
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
