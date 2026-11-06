import { Toast, type ToastSize, type ToastType } from '../../components/Toast'
import { Banner, type BannerLevel, type BannerSize, type BannerType } from '../../components/Banner'
import type { SampleRenderer } from '../../foundations/shared/AtomDoc'

// ตารางแปลงชุด toast กับ banner ในไฟล์ออกแบบ (หน้า 19 Toasts & Banners) เป็น component จริงในโค้ด
// ค่าที่รับมาคือคุณสมบัติของชิ้นงานใน Figma แกน type size level กับ boolean show-icon show-support show-action show-close
// ⚠️ ชุดใน Figma ไม่มีคุณสมบัติข้อความ ข้อความเขียนตายตัวในแต่ละ variant ต่างกันตามชนิด
//    ข้อความด้านล่างจึงคัดลอกจากชิ้นงานต้นแบบ (toast 11185:449, banner 11187:1129) ถ้าแก้ใน Figma ต้องแก้ที่นี่ด้วย
// ⚠️ ปุ่มกระทำใน Figma มีไอคอน link นำหน้าข้อความ ดูรายละเอียด
// ⚠️ ตัวอย่างในหน้าเอกสารไม่ปิดเอง ส่ง duration เป็น null และไม่ประกาศให้โปรแกรมอ่านหน้าจอ เพราะเป็นภาพตัวอย่าง ไม่ใช่ข้อความแจ้งจริง

type P = Parameters<SampleRenderer>[0]
const str = (v: unknown) => (typeof v === 'string' ? v : undefined)
const on = (v: unknown) => v !== false

const TOAST_TITLE: Record<ToastType, string> = {
  default: 'ข้อความแจ้ง',
  brand: 'ข้อความแจ้ง',
  error: 'บันทึกไม่สำเร็จ',
  warning: 'ตรวจสอบก่อนเผยแพร่',
  success: 'บันทึกเรียบร้อย',
}

const BANNER_TITLE: Record<BannerType, string> = {
  default: 'ประกาศจากระบบ',
  brand: 'ฟีเจอร์ใหม่พร้อมใช้งาน',
  error: 'เผยแพร่ไม่สำเร็จ',
  warning: 'มีบางอย่างต้องตรวจก่อน',
  success: 'เผยแพร่เรียบร้อย',
}

const action = { label: 'ดูรายละเอียด', icon: 'link' as const, onClick: () => {} }

const toast: SampleRenderer = (p: P) => {
  const type = (str(p.type) ?? 'default') as ToastType
  return (
    <Toast
      type={type}
      size={str(p.size) as ToastSize}
      title={TOAST_TITLE[type]}
      description="คำอธิบายเพิ่มเติมของข้อความแจ้ง"
      showIcon={on(p['show-icon'])}
      showDescription={on(p['show-support'])}
      showAction={on(p['show-action'])}
      showClose={on(p['show-close'])}
      action={action}
      onClose={() => {}}
      duration={null}
      announce={false}
    />
  )
}

const banner: SampleRenderer = (p: P) => {
  const type = (str(p.type) ?? 'default') as BannerType
  return (
    <Banner
      type={type}
      size={str(p.size) as BannerSize}
      level={str(p.level) as BannerLevel}
      title={BANNER_TITLE[type]}
      description="คำอธิบายเพิ่มเติมของแถบแจ้งในหน้า"
      showIcon={on(p['show-icon'])}
      showDescription={on(p['show-support'])}
      showAction={on(p['show-action'])}
      showClose={on(p['show-close'])}
      action={action}
      onClose={() => {}}
      // กรอบตัวอย่างเป็น flex แถบจึงหดตามเนื้อหา ยืดให้เต็มกรอบที่กว้างเท่าชิ้นงานในไฟล์ออกแบบ
      style={{ width: '100%' }}
    />
  )
}

export const toastSamples: Record<string, SampleRenderer> = { toast, banner }
