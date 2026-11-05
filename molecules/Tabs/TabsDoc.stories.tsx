import type { Meta, StoryObj } from '@storybook/react-vite'
import { AtomDoc } from '../../foundations/shared/AtomDoc'
import data from './tabs-doc.json'
import { tabSamples } from './tabSamples'
import '../../tokens/output/css/typography.css'

// หน้า 18 Tabs ในชั้น Molecules (Element) หนึ่ง story ต่อเอกสารหนึ่งใบ เรียงซ้ายไปขวาเหมือนหน้า 18 Tabs ในไฟล์ออกแบบ
// เนื้อหาทั้งหมดมาจาก tabs-doc.json ถ้าไฟล์ออกแบบเปลี่ยน ให้รัน npm run figma:atom-doc -- tabs แล้ว story จะตามเอง
// ตัวอย่างแท็บวาดด้วย component จริงผ่าน tabSamples แท็บเดี่ยววาดเป็น Tabs หนึ่งแท็บ (ผู้ใช้อนุมัติ 2026-11-05)
// story ของ component เอง (props และตัวอย่างการใช้) อยู่ที่ components/Tabs เมนู 18 Tabs/Tabs
const samples = tabSamples

const meta = {
  title: 'Molecules (Element)/18 Tabs',
  component: AtomDoc,
  args: { data, name: '', samples },
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof AtomDoc>

export default meta
type Story = StoryObj<typeof meta>

// เอกสาร Tab ไม่มีเมนูที่นี่ เพราะซ้ำกับ story Segmented-tab-group และ Underline-tab-group ใต้ 18 Tabs/Tabs ที่กดแก้ค่าในแผงได้ (ผู้ใช้สั่ง 2026-11-05) ข้อมูลยังอยู่ใน tabs-doc.json
// ชื่อในเมนูตั้งตรง ๆ ทีละตัว เพราะ Storybook อ่านชื่อ story จากโค้ดแบบไม่รัน ถ้าสร้างผ่านฟังก์ชันจะได้ชื่อตัวแปรแทน
export const Overview: Story = { name: 'ภาพรวม', args: { data, name: '18 Tabs Documentation', samples } }
export const TabToken: Story = { name: 'Tab Token', args: { data, name: 'Tab Token', samples } }
export const TabAnatomy: Story = { name: 'Tab Anatomy', args: { data, name: 'Tab Anatomy', samples } }
export const TabUsage: Story = { name: 'Tab Usage', args: { data, name: 'Tab Usage', samples } }
export const TabSpace: Story = { name: 'Tab Space', args: { data, name: 'Tab Space', samples } }
