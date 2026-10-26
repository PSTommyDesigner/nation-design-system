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

const COMPONENTS = { tag: TAG, badge: BADGE, button: BUTTON, 'icon-button': ICON_BUTTON, 'link-button': LINK_BUTTON, checkbox: CHECKBOX, radio: RADIO, toggle: TOGGLE }
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
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl']
// ชุดที่ประกาศ layoutAxes ตอนดึง (เช่น checked) จะมี key แบบ "md, checked=true" ตารางจับคู่เลือกด้วย layoutKey
const L = (set, size) => {
  const key = M.layoutKey ? M.layoutKey(size) : size
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
      walk(L(set, size), '', (key, n) => {
        if (n.ts && g.layers.includes(key)) {
          if (ts && ts !== n.ts) errors.push(`${setName} ${size} ${key}: text style ${n.ts} ไม่ตรงกับชุดอื่น (${ts})`)
          ts = n.ts
        }
      })
    }
    if (!ts) { errors.push(`${size}: ไม่พบชั้นข้อความ ${g.layers.join('/')} ในชุดไหนเลย`); continue }
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
  for (const size of SIZES) {
    const vars = {}
    walk(L(set, size), '', (key, n) => {
      const fn = lookup(M.layers, key)
      if (!fn) { errors.push(`${setName} ${size}: ไม่รู้จักชั้น "${key}" (เพิ่มในตาราง layers)`); return }
      // ชั้นที่ซ่อนไว้ในตัวอย่าง (เช่น ไอคอนที่ปิดด้วย property) ยังต้องการค่า ส่วนชั้นที่ซ่อนแล้วไม่มีผลกับโค้ดให้ข้าม
      if (n.vis === false && key !== 'left-icon' && key !== 'close-icon' && !key.endsWith('-icon') && !(M.hiddenLayers || []).includes(key)) return
      Object.assign(vars, fn(n, (v) => toVar(v, `${setName} ${size} ${key}`)))
    })
    for (const cls of [].concat(map.classes)) {
      const sel = `${cls}.${size}`
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
        for (const [axis, fn] of Object.entries(M.axisClass)) if (axis in axes) sel += fn(axes[axis])
        if (axes.size) sel += `.${axes.size}`   // สีที่ต่างตามขนาด (เช่น เงาปุ่ม Alpha)
        return M.stateSelector[state]?.(sel)
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
        Object.assign(vars, fn(c, (v) => toVar(v, where), { state, axes, family, pressed }))
      }
      const rank = { default: 0, hover: 1, focused: 2, disabled: 3 }[state] ?? 9
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
