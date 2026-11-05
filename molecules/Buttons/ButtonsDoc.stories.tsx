import type { Meta, StoryObj } from '@storybook/react-vite'
import { AtomDoc } from '../../foundations/shared/AtomDoc'
import data from './buttons-doc.json'
import { buttonSamples } from './buttonSamples'
import '../../tokens/output/css/typography.css'

// หน้า 12 Buttons ในชั้น Molecules (Element) หนึ่ง story ต่อเอกสารหนึ่งใบ เรียงซ้ายไปขวาเหมือนหน้า 12 Buttons ในไฟล์ออกแบบ
// เนื้อหาทั้งหมดมาจาก buttons-doc.json ถ้าไฟล์ออกแบบเปลี่ยน ให้รัน npm run figma:atom-doc -- buttons แล้ว story จะตามเอง
// ตัวอย่างปุ่มวาดด้วย component จริงผ่าน buttonSamples (ผู้ใช้อนุมัติ 2026-11-05)
// story ของ component เอง (props และตัวอย่างการใช้) อยู่ที่ components/Button, IconButton และ LinkButton เมนู 12 Buttons/<ชื่อ>
// เอกสาร Brand / Error / Neutral / Alpha Button ไม่มีเมนูที่นี่ ใช้ story Brand-button ถึง Alpha-button ใต้ 12 Buttons/Button แทน (ผู้ใช้สั่ง 2026-11-05) ข้อมูลยังอยู่ใน buttons-doc.json
const samples = buttonSamples

const meta = {
  title: 'Molecules (Element)/12 Buttons',
  component: AtomDoc,
  args: { data, name: '', samples },
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof AtomDoc>

export default meta
type Story = StoryObj<typeof meta>

// ชื่อในเมนูตั้งตรง ๆ ทีละตัว เพราะ Storybook อ่านชื่อ story จากโค้ดแบบไม่รัน ถ้าสร้างผ่านฟังก์ชันจะได้ชื่อตัวแปรแทน
export const Overview: Story = { name: 'ภาพรวม', args: { data, name: '12 Buttons Documentation', samples } }
export const ButtonsToken: Story = { name: 'Buttons Token', args: { data, name: 'Buttons Token', samples } }
export const ButtonsFamilies: Story = { name: 'Buttons Families', args: { data, name: 'Buttons Families', samples } }
export const ButtonsHierarchy: Story = { name: 'Buttons Hierarchy', args: { data, name: 'Buttons Hierarchy', samples } }
export const ButtonsSpace: Story = { name: 'Buttons Space', args: { data, name: 'Buttons Space', samples } }
