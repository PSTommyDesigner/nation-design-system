import type { Meta, StoryObj } from '@storybook/react-vite'
import { AtomDoc } from '../../foundations/shared/AtomDoc'
import data from './toasts-doc.json'
import { toastSamples } from './toastSamples'
import '../../tokens/output/css/typography.css'

// หน้า 19 Toasts & Banners ในชั้น Molecules (Element) หนึ่ง story ต่อเอกสารหนึ่งใบ เรียงซ้ายไปขวาเหมือนหน้า 19 Toasts & Banners ในไฟล์ออกแบบ
// เนื้อหาทั้งหมดมาจาก toasts-doc.json ถ้าไฟล์ออกแบบเปลี่ยน ให้รัน npm run figma:atom-doc -- toasts แล้ว story จะตามเอง
// ตัวอย่างวาดด้วย component จริงผ่าน toastSamples ข้อความของตัวอย่างคัดลอกจากชิ้นงานต้นแบบ เพราะชุดใน Figma ไม่มีคุณสมบัติข้อความ
// story ของ component เอง (props และตัวอย่างการใช้) อยู่ที่ components/Toast และ components/Banner เมนู Toast Component และ Banner Component
const samples = toastSamples

const meta = {
  title: 'Molecules (Element)/19 Toasts & Banners',
  component: AtomDoc,
  args: { data, name: '', samples },
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof AtomDoc>

export default meta
type Story = StoryObj<typeof meta>

// เอกสาร Toast Component Previews และ Banner Component Previews ไม่มีเมนูที่นี่ เพราะซ้ำกับ story ใต้ Toast Component และ Banner Component ที่กดแก้ค่าในแผงได้ (ผู้ใช้สั่ง 2026-11-05) ข้อมูลยังอยู่ใน toasts-doc.json
// ชื่อในเมนูตั้งตรง ๆ ทีละตัว เพราะ Storybook อ่านชื่อ story จากโค้ดแบบไม่รัน ถ้าสร้างผ่านฟังก์ชันจะได้ชื่อตัวแปรแทน
export const Overview: Story = { name: 'ภาพรวม', args: { data, name: '19 Toasts and Banners Documentation', samples } }
export const ToastAndBannerToken: Story = { name: 'Toast and Banner Token', args: { data, name: 'Toast and Banner Token', samples } }
export const ToastInformation: Story = { name: 'Toast Information', args: { data, name: 'Toast Information', samples } }
export const BannerInformation: Story = { name: 'Banner Information', args: { data, name: 'Banner Information', samples } }
export const ToastAndBannerSpace: Story = { name: 'Toast and Banner Space', args: { data, name: 'Toast and Banner Space', samples } }
