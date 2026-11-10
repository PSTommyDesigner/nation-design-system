import type { Meta, StoryObj } from '@storybook/react-vite'
import { AtomDoc } from '../../foundations/shared/AtomDoc'
import data from './modal-doc.json'
import { modalSamples } from './modalSamples'
import '../../tokens/output/css/typography.css'

// หน้า 30 Modal ในชั้น Organisms (Component) หนึ่ง story ต่อเอกสารหนึ่งใบ เรียงซ้ายไปขวาเหมือนหน้า 30 Modal ในไฟล์ออกแบบ
// เนื้อหาทั้งหมดมาจาก modal-doc.json ถ้าไฟล์ออกแบบเปลี่ยน ให้รัน npm run figma:atom-doc -- modal แล้ว story จะตามเอง
// ตัวอย่างวาดด้วย Modal จริงแบบวางค้าง (prop still) ผ่าน modalSamples
// story ของ component เอง (props และตัวอย่างการใช้) อยู่ที่ components/Modal
const samples = modalSamples

const meta = {
  title: 'Organisms (Component)/30 Modal',
  component: AtomDoc,
  args: { data, name: '', samples },
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof AtomDoc>

export default meta
type Story = StoryObj<typeof meta>

// เอกสาร Modal Component Previews ไม่มีเมนูที่นี่ เพราะซ้ำกับ story ของ component ที่กดแก้ค่าในแผงได้ (ผู้ใช้สั่ง 2026-11-05) ข้อมูลยังอยู่ใน modal-doc.json
// ชื่อในเมนูตั้งตรง ๆ ทีละตัว เพราะ Storybook อ่านชื่อ story จากโค้ดแบบไม่รัน ถ้าสร้างผ่านฟังก์ชันจะได้ชื่อตัวแปรแทน
export const Overview: Story = { name: 'ภาพรวม', args: { data, name: '30 Modal Documentation', samples } }
export const ModalToken: Story = { name: 'Modal Token', args: { data, name: 'Modal Token', samples } }
export const ModalUsage: Story = { name: 'Modal Usage', args: { data, name: 'Modal Usage', samples } }
export const ModalBehaviorAndAccessibility: Story = { name: 'Modal Behavior and Accessibility', args: { data, name: 'Modal Behavior and Accessibility', samples } }
export const ModalSpace: Story = { name: 'Modal Space', args: { data, name: 'Modal Space', samples } }
