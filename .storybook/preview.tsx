import type { Preview } from '@storybook/react-vite'
import { create } from 'storybook/theming'
import { CustomDocsPage } from './CustomDocsPage'
import { BRANDS, DEFAULT_BRAND } from '../prototype/one-cms/brands'

// โหลด design token เป็น CSS variable ส่วนกลาง ทุก component ต้องใช้ตัวแปรชุดนี้
// ไม่ hard-code สี ระยะ หรือมุมโค้งเอง ตามกฎของโปรเจกต์
import '../tokens/output/css/variables.css'
// สไตล์ของบล็อกประกอบเอกสาร (preview · labeled · do-dont) ดู docs-blocks.tsx
import './docs-blocks.css'
// สไตล์แกลเลอรีค้นหาไอคอน (หน้า Docs ของ Icon กับ NationHouseIcon) ดู icon-gallery.tsx
import './icon-gallery.css'

/**
 * ธีมของหน้า Docs (หน้า prop table + ตัวอย่างของแต่ละ component) เท่านั้น
 * ไม่แตะ Manager UI (แถบด้านข้าง/แถบบน/แผง Controls-Actions-Interactions
 * ตอนดู story เดี่ยว) ตามที่หัวหน้าสั่ง 2026-10-19
 *
 * ⚠️ เคยถอดออกไปรอบหนึ่งเมื่อ 2026-10-20 เข้าใจผิดว่าหัวหน้าอยากให้
 *    ถอดสีด้วย ทั้งที่ตั้งใจแค่ขอปรับโครงหน้า (สองคอลัมน์) เท่านั้น
 *    ใส่กลับคืนตามเดิม ส่วนที่เปลี่ยนจริงคือโครงหน้าใน CustomDocsPage.tsx
 *
 * ⚠️ ค่าสีเป็นเลข hex ดิบ ไม่ใช่การฝ่าฝืนกฎห้ามสีดิบของโปรเจกต์
 *    เพราะ API ของ Storybook (ThemeVars จาก storybook/theming) กินแค่ค่าคงที่
 *    ใช้ var(--ntg-*) ไม่ได้จริง ๆ จึงต้องคัดลอกค่า resolved มาแปะตรงนี้
 *    ที่มาของแต่ละค่ากำกับไว้ข้างหลังทุกบรรทัด ถ้า token ต้นทางเปลี่ยน ต้องมาแก้ไฟล์นี้ตามด้วยมือ
 *    รันคำสั่งนี้เพื่อเช็คว่าค่ายังตรงกับไฟล์ token อยู่ไหม
 *      node -e "const fs=require('fs');const css=fs.readFileSync('tokens/output/css/variables.css','utf8');
 *      const map={};for(const m of css.matchAll(/--(ntg-[a-z0-9-]+):\s*([^;]+);/g))if(!(m[1] in map))map[m[1]]=m[2].trim();
 *      const r=(n,d=0)=>{if(d>15)return'?';const v=map[n];if(!v)return'?';const vm=v.match(/^var\(--(ntg-[a-z0-9-]+)\)$/);return vm?r(vm[1],d+1):v};
 *      for(const n of ['ntg-color-background-brand-solid','ntg-color-background-brand-solid-hover','ntg-color-background-general-primary','ntg-color-background-general-secondary','ntg-color-border-general-primary','ntg-color-text-general-heading','ntg-color-text-general-text','ntg-color-text-general-disabled','ntg-button-radius-top-left-md'])console.log(n,'=',r(n))"
 */
const docsTheme = create({
  base: 'light',
  colorPrimary: '#1e58f2', // color/background/brand/solid
  colorSecondary: '#1640d6', // color/background/brand/solid-hover

  appBg: '#ffffff', // color/background/general/primary
  appContentBg: '#f2f4f7', // color/background/general/secondary
  appBorderColor: '#d0d5dd', // color/border/general/primary
  appBorderRadius: 8, // button/radius/top-left/md (ไม่มี token รัศมีกลางของระบบ ยืมจากปุ่มขนาด md)

  fontBase: '"Prompt", system-ui, sans-serif', // typography/font-family/primary
  fontCode: 'ui-monospace, SFMono-Regular, Menlo, monospace', // ไม่มี token ฟอนต์โค้ดในระบบ ใช้ค่าตั้งต้นของเบราว์เซอร์

  textColor: '#101828', // color/text/general/heading
  textMutedColor: '#475467', // color/text/general/text

  barTextColor: '#475467',
  barSelectedColor: '#1e58f2',
  barBg: '#ffffff',

  inputBg: '#ffffff',
  inputBorder: '#d0d5dd',
  inputTextColor: '#101828',
  inputBorderRadius: 8,

  brandTitle: 'Nation Design System',
})

const preview: Preview = {
  // เมนู "BU" บนแถบเครื่องมือ เปลี่ยนโลโก้กับชื่อแบรนด์ในหน้า prototype ของ One CMS ก่อนพรีเซนต์ (ผู้ใช้สั่ง 2026-11-11)
  // ใช้กับ story ที่อ่านค่า globals.brand เท่านั้น หน้า component อื่นไม่เปลี่ยน ลิงก์ที่มี &globals=brand:ksn เปิดมาเป็น BU นั้นเลย
  globalTypes: {
    brand: {
      description: 'BU ที่ใช้ในหน้า prototype',
      toolbar: {
        title: 'BU',
        icon: 'globe',
        items: BRANDS.map((b) => ({ value: b.code, title: `${b.name} (${b.code})` })),
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { brand: DEFAULT_BRAND },
  // prop ที่รับ React element (เช่น leftIcon / closeIcon / icon ของ Tag) ห้ามมีตัวควบคุมในแผง Controls
  // เพราะ Storybook เดาว่าเป็น object แล้วส่ง {} (object เปล่า) เข้า prop ตอนผู้ใช้แตะแผง
  // React เรนเดอร์ {} ไม่ได้ ทั้ง story พังเป็น Minified React error #31 (หัวหน้าเจอ 2026-10-22 ที่ Semi-rounded-tag)
  // ตัวอย่างในหน้า Docs ยังส่ง element จริงผ่าน args ได้ตามปกติ แค่ไม่มีช่องให้แก้มือ
  argTypesEnhancers: [
    (context) => {
      const argTypes = { ...context.argTypes }
      for (const [name, argType] of Object.entries(argTypes)) {
        const summary = String(argType?.table?.type?.summary ?? argType?.type?.name ?? '')
        if (!/ReactNode|ReactElement|Element/.test(summary)) continue
        // children เป็นข้อความธรรมดาในทุก story ให้เป็นช่องข้อความ ไม่ใช่ object (ที่โชว์เครื่องหมายคำพูดครอบ)
        argTypes[name] = name === 'children' ? { ...argType, control: { type: 'text' } } : { ...argType, control: false }
      }
      return argTypes
    },
  ],
  parameters: {
    // เมนูด้านข้างเรียงตามชั้นและเลขหน้าของไฟล์ออกแบบ (ผู้ใช้สั่ง 2026-10-28 ให้โค้ดกับ Figma จัดชั้นตรงกัน)
    // หมวดในชั้นต้องเรียงตามเลขหน้า ไม่ใช่ตามชื่อโฟลเดอร์ component จึงต้องเขียนลำดับไว้ทุกชั้น
    // เพิ่มหน้าใหม่ใน Figma เมื่อไร ต้องมาเติมชื่อหน้าตรงนี้ด้วย ไม่งั้นหมวดนั้นจะไปต่อท้ายชั้น
    options: {
      storySort: {
        order: [
          'Atoms (Identity)',
          ['01 Color', '02 Icon', '03 Typography', '04 Grid', '05 Effect', '06 Shape', '07 Space', '08 Logo', '09 Third-party Logos'],
          'Molecules (Element)',
          [
            '10 Frame', '11 Avatar', '12 Buttons', '13 Input', '14 Toggles', '15 Checkbox', '16 Radio', '17 Sliders', '18 Tabs',
            '19 Toasts & Banners', '20 Tooltips', '21 Tags', '22 Badge', '23 Progress Bars', '24 Pagination', '25 Card', '26 Dividers',
          ],
          'Organisms (Component)',
          ['27 Dropdowns', '28 Table', '29 Chart', '30 Modal'],
          'Template (Composition)',
          'Page (Prototype)',
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: docsTheme,
      // เทมเพลตหน้า Docs แบบกำหนดเอง ให้ตัวอย่างสดเชื่อมกับตาราง Controls จริง
      // ไม่ซ้ำกับภาพนิ่งด้านล่างเหมือนของเริ่มต้น ดูเหตุผลเต็มที่ CustomDocsPage.tsx
      page: CustomDocsPage,
    },
  },
}

export default preview
