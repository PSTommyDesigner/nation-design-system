import { STORY_RENDERED } from 'storybook/internal/core-events'
import { addons, type API } from 'storybook/manager-api'

// หน้าที่แผงด้านขวาไม่ได้คุม component ไม่ต้องมีแผง (ผู้ใช้สั่ง 2026-11-02)
// หน้า Atoms เป็นเอกสาร ยกเว้นหน้า 02 Icon ที่เป็น component จริง ส่วนหน้า prototype เป็นหน้าจอเต็ม
// story ในรายการนี้เขียนค่าตายตัว ไม่รับค่าจากแผง ถ้าแก้ให้รับค่าได้แล้วให้เอาออกจากรายการ
const FIXED_STORIES = new Set([
  'molecules-element-11-avatar-avatar--avatar-label-story',
  'molecules-element-11-avatar-avatar--avatar-group-story',
  'molecules-element-16-radio-radio--group',
  'organisms-component-30-modal-modal--without-header',
  'organisms-component-30-modal-modal--confirm',
  'organisms-component-30-modal-modal--toast-over-modal',
])

const hasNoComponentExample = (storyId = '') =>
  FIXED_STORIES.has(storyId) ||
  storyId.startsWith('page-prototype-') ||
  (storyId.startsWith('atoms-identity-') && !storyId.startsWith('atoms-identity-02-icon-'))

addons.setConfig({
  layoutCustomisations: {
    showPanel: (state, defaultValue) => (hasNoComponentExample(state.storyId) ? false : defaultValue),
  },
})

// แผงด้านล่างสูงจนขอบบนชิดตัวอย่าง component (ผู้ใช้สั่ง 2026-11-02) ตัวอย่างแต่ละหน้าสูงไม่เท่ากัน
// จึงวัดจากเนื้อหาจริงใน iframe ทุกครั้งที่เปิดหน้า และวัดซ้ำเมื่อตัวอย่างเปลี่ยนขนาด เช่นปรับ size ในแผง
// ⚠️ วัดจากขอบบนถึงขอบล่างของเนื้อหา ไม่ใช้ขอบล่างอย่างเดียว เพราะ story แบบจัดกึ่งกลางขยับตามความสูงของ iframe
// MIN_PANEL_HEIGHT กันแผงเตี้ยจนใช้ไม่ได้ตอนตัวอย่างสูงมาก เช่น Table หรือ Modal ที่ลอยเต็มพื้นที่
const MIN_PANEL_HEIGHT = 240

// วัดจาก #storybook-root ไม่ไล่ทุกชิ้นใน body เพราะชิ้นที่ซ่อนอยู่ เช่นตารางสำรองของ BarChart ทำให้ได้ค่าสูงเกินจริง
// รายการเมนูที่เปิดอยู่ลอยออกนอกกรอบ จึงนับเพิ่มเฉพาะชิ้นเหล่านี้
const FLOATING = '[role="listbox"], [role="menu"], [role="tooltip"]'

const contentHeight = (doc: Document) => {
  const root = doc.querySelector('#storybook-root')
  const style = doc.defaultView?.getComputedStyle(doc.body)
  if (!root) return 0
  const rects = [root, ...doc.querySelectorAll(FLOATING)].map((el) => el.getBoundingClientRect()).filter((rect) => rect.height > 0)
  if (!rects.length) return 0
  const top = Math.min(...rects.map((rect) => rect.top))
  const bottom = Math.max(...rects.map((rect) => rect.bottom))
  return bottom - top + parseFloat(style?.paddingTop ?? '0') + parseFloat(style?.paddingBottom ?? '0')
}

const fitPanel = (api: API) => {
  const iframe = document.querySelector<HTMLIFrameElement>('#storybook-preview-iframe')
  const panel = document.querySelector('#storybook-panel-root')
  const doc = iframe?.contentDocument
  if (!iframe || !panel || !doc?.body) return
  // แผงด้านขวาสูงเต็มจอ ขอบบนอยู่ที่ 0 ถ้าผู้ใช้สลับไปด้านขวาเองไม่ต้องปรับ
  if (panel.getBoundingClientRect().top < 1 || !api.getShowPanelWithCustomisations(true)) return
  const space = window.innerHeight - iframe.getBoundingClientRect().top
  const height = doc.querySelector('dialog[open], [role="dialog"], [aria-modal="true"]')
    ? MIN_PANEL_HEIGHT
    : Math.max(MIN_PANEL_HEIGHT, Math.ceil(space - contentHeight(doc)))
  if (Math.abs(height - panel.getBoundingClientRect().height) > 1) api.setSizes({ bottomPanelHeight: height })
}

addons.register('ntg/fit-panel', (api) => {
  let observer: ResizeObserver | undefined
  let mutations: MutationObserver | undefined
  const timers: number[] = []
  // ใช้ setTimeout ไม่ใช้ requestAnimationFrame เพราะ rAF หยุดเมื่อหน้าต่างไม่ได้แสดงผล
  // วัดซ้ำตามหลังด้วย เพราะแผงกับฟอนต์ใน iframe พร้อมช้ากว่าเหตุการณ์ STORY_RENDERED ตอนโหลดหน้าครั้งแรก
  const fitSoon = () => {
    timers.splice(0).forEach(window.clearTimeout)
    for (const delay of [0, 150, 500, 1200]) timers.push(window.setTimeout(() => fitPanel(api), delay))
  }
  api.on(STORY_RENDERED, () => {
    const win = document.querySelector<HTMLIFrameElement>('#storybook-preview-iframe')?.contentWindow as (Window & typeof globalThis) | null | undefined
    const root = win?.document.querySelector('#storybook-root')
    observer?.disconnect()
    mutations?.disconnect()
    if (win && root) {
      observer = new win.ResizeObserver(() => fitPanel(api))
      observer.observe(root)
      // Modal กับเมนูเปิดโดยไม่เปลี่ยนขนาดของ root จึงดูการเปิดปิดแยกต่างหาก
      mutations = new win.MutationObserver(() => fitPanel(api))
      mutations.observe(win.document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['open', 'aria-expanded'] })
    }
    fitSoon()
  })
})
