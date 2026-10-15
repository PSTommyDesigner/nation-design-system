import StyleDictionary from 'style-dictionary'
import { readFileSync, writeFileSync, rmSync } from 'node:fs'

/**
 * ── Custom transform: nation/typography-px ────────────────────────────────
 * Figma (Token Press) export heading font-size / line-height เป็น $type "number"
 * แบบไม่มีหน่วย (เช่น h1 = 64) ขณะที่ text/article เป็น "dimension" มี px อยู่แล้ว
 * ทำให้ CSS ที่ได้ไม่มีหน่วย → invalid. เติม px ให้อัตโนมัติที่ build layer
 * (ไม่แก้ source JSON เพราะจะถูก overwrite ตอน npm run tokens:pull)
 */
StyleDictionary.registerTransform({
  name: 'nation/typography-px',
  type: 'value',
  transitive: true,
  filter: (token) => {
    const type = token.$type ?? token.type
    const path = token.path.join('.')
    return type === 'number' && /font-size|line-height/.test(path)
  },
  transform: (token) => {
    const value = token.$value ?? token.value
    return `${value}px`
  },
})

/**
 * ── Custom format: css/typography-classes ─────────────────────────────────
 * composite typography token ($type "typography") ไม่สามารถ map เป็น CSS
 * custom property เดี่ยวได้ (font shorthand ใส่ letter-spacing/line-height
 * แบบ reference ไม่ได้ → SD default ผลิต output เพี้ยน) จึง emit เป็น
 * utility class แทน เพื่อให้ใช้งานได้จริง
 */
StyleDictionary.registerFormat({
  name: 'css/typography-classes',
  format: ({ dictionary }) => {
    const header = '/**\n * Typography utility classes auto-generated. Do not edit directly.\n */\n\n'
    const body = dictionary.allTokens
      .filter((t) => (t.$type ?? t.type) === 'typography')
      .map((t) => {
        const v = t.$value ?? t.value
        // path: ['typography','text','xl-bold'] → ntg-typography-text-xl-bold
        const className = ['ntg', ...t.path].join('-')
        return [
          `.${className} {`,
          `  font-family: ${v.fontFamily};`,
          `  font-size: ${v.fontSize};`,
          `  font-weight: ${v.fontWeight};`,
          `  letter-spacing: ${v.letterSpacing};`,
          `  line-height: ${v.lineHeight};`,
          `}`,
        ].join('\n')
      })
      .join('\n\n')
    return header + body + '\n'
  },
})

// composite typography ($type typography) ถูกแยกไป typography.css → กันออกจาก variables.css
const notComposite = (token) => (token.$type ?? token.type) !== 'typography'

// dark override: เอาเฉพาะ token ที่มาจากไฟล์ semantics-dark-mode (semantic ที่ค่าเปลี่ยนใน dark)
// primitive/component เป็น source เพื่อให้ reference resolve เป็น var() ชี้กลับ :root
const darkOrigin = (token) => token.filePath.endsWith('semantics-dark-mode.json')

// ต่อท้าย custom transform เข้า preset transform group
// ถอดเฉพาะ typography/css/shorthand: composite typography ถูกแยกไป typography.css
// ผ่าน custom format ที่ต้องการ value แบบ object (ไม่ใช่ shorthand string)
// สำคัญ: ต้องเก็บ shadow/border/transition/strokeStyle shorthand ไว้
// ไม่งั้น composite เหล่านั้น (เช่น shadows type=shadow) จะ render เป็น [object Object]
const cssTransforms = [
  ...StyleDictionary.hooks.transformGroups.css.filter((n) => n !== 'typography/css/shorthand'),
  'nation/typography-px',
]
const jsTransforms = [...StyleDictionary.hooks.transformGroups.js, 'nation/typography-px']

/**
 * ── Build แยก 2 mode ────────────────────────────────────────────────────
 * light + dark นิยาม path เดียวกัน ถ้าโหลดรวม instance เดียวจะชนกัน (last-wins)
 * → :root เพี้ยนเป็นค่า dark. จึงแยกเป็น 2 StyleDictionary instance:
 *   • LIGHT → :root (primitives + component + semantics-light + typography/shadows/responsive)
 *   • DARK  → [data-theme="dark"] เฉพาะ semantic ที่ค่าเปลี่ยน (อ้าง primitive :root ผ่าน var())
 * แล้ว concat dark block ต่อท้าย variables.css ให้เป็นไฟล์เดียว
 */
const commonBase = [
  'tokens/tokens.json/primitive.json',
  'tokens/tokens.json/scale.json',
  'tokens/tokens.json/component.json',
]

const sdLight = new StyleDictionary({
  source: [
    ...commonBase,
    'tokens/tokens.json/typography.json',
    'tokens/tokens.json/shadows.json',
    'tokens/tokens.json/grid.json',
    'tokens/tokens.json/semantics-light-mode.json',
    'tokens/tokens.json/device.json',
  ],
  platforms: {
    css: {
      transforms: cssTransforms,
      prefix: 'ntg',
      buildPath: 'tokens/output/css/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
          filter: notComposite,
          options: { outputReferences: true, selector: ':root' },
        },
        {
          destination: 'typography.css',
          format: 'css/typography-classes',
        },
      ],
    },
    js: {
      transforms: jsTransforms,
      buildPath: 'tokens/output/js/',
      files: [{ destination: 'tokens.mjs', format: 'javascript/es6' }],
    },
  },
})

// dark: primitive/component เป็น source ให้ reference resolve แต่ output เฉพาะ dark-origin
const sdDark = new StyleDictionary({
  source: [...commonBase, 'tokens/tokens.json/semantics-dark-mode.json'],
  platforms: {
    css: {
      transforms: cssTransforms,
      prefix: 'ntg',
      buildPath: 'tokens/output/css/',
      files: [
        {
          destination: '_variables-dark.tmp.css',
          format: 'css/variables',
          filter: (t) => notComposite(t) && darkOrigin(t),
          options: { outputReferences: true, selector: '[data-theme="dark"]' },
        },
      ],
    },
    js: {
      transforms: jsTransforms,
      buildPath: 'tokens/output/js/',
      files: [
        { destination: 'tokens-dark.mjs', format: 'javascript/es6', filter: darkOrigin },
      ],
    },
  },
})

await sdLight.buildAllPlatforms()
await sdDark.buildAllPlatforms()

// concat dark block → variables.css แล้วลบ temp
const cssDir = 'tokens/output/css/'
const darkTmp = `${cssDir}_variables-dark.tmp.css`
const darkBlock = readFileSync(darkTmp, 'utf8')
  .replace(/^\/\*\*[\s\S]*?\*\/\n*/, '') // ตัด header comment ซ้ำของ SD
  .trim()
const mainCss = readFileSync(`${cssDir}variables.css`, 'utf8').trimEnd()
writeFileSync(
  `${cssDir}variables.css`,
  `${mainCss}\n\n/* ── Dark mode overrides ─────────────────────────────────────── */\n${darkBlock}\n`,
)
rmSync(darkTmp)

console.log('\n✅ Build complete!')
console.log('   tokens/output/css/variables.css   (:root + [data-theme="dark"])')
console.log('   tokens/output/css/typography.css')
console.log('   tokens/output/js/tokens.mjs        (light)')
console.log('   tokens/output/js/tokens-dark.mjs   (dark overrides)')
