import type { Meta, StoryObj } from '@storybook/react-vite'
import { AtomDoc } from '../../foundations/shared/AtomDoc'
import data from './toggles-doc.json'
import { toggleSamples } from './toggleSamples'
import '../../tokens/output/css/typography.css'

// หน้า 14 Toggles ในชั้น Molecules (Element) หนึ่ง story ต่อเอกสารหนึ่งใบ เรียงซ้ายไปขวาเหมือนหน้า 14 Toggles ในไฟล์ออกแบบ
// เนื้อหาทั้งหมดมาจาก toggles-doc.json ถ้าไฟล์ออกแบบเปลี่ยน ให้รัน npm run figma:atom-doc -- toggles แล้ว story จะตามเอง
// ตัวอย่างสวิตช์วาดด้วย component จริงผ่าน toggleSamples (ผู้ใช้อนุมัติ 2026-11-05)
// story ของ component เอง (props และตัวอย่างการใช้) อยู่ที่ components/Toggle เมนู 14 Toggles/Toggle
const samples = toggleSamples

const meta = {
  title: 'Molecules (Element)/14 Toggles',
  component: AtomDoc,
  args: { data, name: '', samples },
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof AtomDoc>

export default meta
type Story = StoryObj<typeof meta>

// เอกสาร Toggle ไม่มีเมนูที่นี่ เพราะซ้ำกับ story Toggle ใต้ 14 Toggles/Toggle ที่กดแก้ค่าในแผงได้ (ผู้ใช้สั่ง 2026-11-05) ข้อมูลยังอยู่ใน toggles-doc.json
// ชื่อในเมนูตั้งตรง ๆ ทีละตัว เพราะ Storybook อ่านชื่อ story จากโค้ดแบบไม่รัน ถ้าสร้างผ่านฟังก์ชันจะได้ชื่อตัวแปรแทน
export const Overview: Story = { name: 'ภาพรวม', args: { data, name: '14 Toggles Documentation', samples } }
export const TogglesToken: Story = { name: 'Toggles Token', args: { data, name: 'Toggles Token', samples } }
export const ToggleAnatomy: Story = { name: 'Toggle Anatomy', args: { data, name: 'Toggle Anatomy', samples } }
export const ToggleTwoLayerModel: Story = { name: 'Toggle Two Layer Model', args: { data, name: 'Toggle Two Layer Model', samples } }
export const ToggleUsage: Story = { name: 'Toggle Usage', args: { data, name: 'Toggle Usage', samples } }
export const TogglesSpace: Story = { name: 'Toggles Space', args: { data, name: 'Toggles Space', samples } }
