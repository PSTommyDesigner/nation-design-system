import type { Meta, StoryObj } from '@storybook/react-vite'
import { AtomDoc } from '../../foundations/shared/AtomDoc'
import data from './dropdowns-doc.json'
import { dropdownSamples } from './dropdownSamples'
import '../../tokens/output/css/typography.css'

// หน้า 27 Dropdowns ในชั้น Organisms (Component) หนึ่ง story ต่อเอกสารหนึ่งใบ เรียงซ้ายไปขวาเหมือนหน้า 27 Dropdowns ในไฟล์ออกแบบ
// เนื้อหาทั้งหมดมาจาก dropdowns-doc.json ถ้าไฟล์ออกแบบเปลี่ยน ให้รัน npm run figma:atom-doc -- dropdowns แล้ว story จะตามเอง
// ตัวอย่างวาดด้วย Dropdown จริงผ่าน dropdownSamples เฉพาะชุด dropdown ชุดที่เหลือขึ้นข้อความแทน ภาพแทนรูปอยู่ใน assets/
// story ของ component เอง (props และตัวอย่างการใช้) อยู่ที่ components/Dropdown
const samples = dropdownSamples
const logos = import.meta.glob<string>('./assets/*.png', { eager: true, query: '?url', import: 'default' })

const meta = {
  title: 'Organisms (Component)/27 Dropdowns',
  component: AtomDoc,
  args: { data, name: '', logos, samples },
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof AtomDoc>

export default meta
type Story = StoryObj<typeof meta>

// เอกสาร Dropdown Component Previews ไม่มีเมนูที่นี่ เพราะซ้ำกับ story ของ component ที่กดแก้ค่าในแผงได้ (ผู้ใช้สั่ง 2026-11-05)
// เอกสาร Dropdown Base Components ไม่มีเมนูเช่นกัน เพราะแถวตัวเลือกและหัวกลุ่มไม่มี component แยกในโค้ด หน้าจะมีแต่ข้อความแทน (เหมือนหน้า 25) ข้อมูลทั้งสองใบยังอยู่ใน dropdowns-doc.json
// ชื่อในเมนูตั้งตรง ๆ ทีละตัว เพราะ Storybook อ่านชื่อ story จากโค้ดแบบไม่รัน ถ้าสร้างผ่านฟังก์ชันจะได้ชื่อตัวแปรแทน
export const Overview: Story = { name: 'ภาพรวม', args: { data, name: '27 Dropdowns Documentation', logos, samples } }
export const DropdownToken: Story = { name: 'Dropdown Token', args: { data, name: 'Dropdown Token', logos, samples } }
export const DropdownUsage: Story = { name: 'Dropdown Usage', args: { data, name: 'Dropdown Usage', logos, samples } }
export const DropdownAccessibility: Story = { name: 'Dropdown Accessibility', args: { data, name: 'Dropdown Accessibility', logos, samples } }
export const DropdownSpace: Story = { name: 'Dropdown Space', args: { data, name: 'Dropdown Space', logos, samples } }
