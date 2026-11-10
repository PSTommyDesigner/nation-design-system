import type { Meta, StoryObj } from '@storybook/react-vite'
import { AtomDoc } from '../../foundations/shared/AtomDoc'
import data from './dividers-doc.json'
import { dividerSamples } from './dividerSamples'
import '../../tokens/output/css/typography.css'

// หน้า 26 Dividers ในชั้น Molecules (Element) หนึ่ง story ต่อเอกสารหนึ่งใบ เรียงซ้ายไปขวาเหมือนหน้า 26 Dividers ในไฟล์ออกแบบ
// เนื้อหาทั้งหมดมาจาก dividers-doc.json ถ้าไฟล์ออกแบบเปลี่ยน ให้รัน npm run figma:atom-doc -- dividers แล้ว story จะตามเอง
// ตัวอย่างวาดด้วย Divider จริงผ่าน dividerSamples
// ⚠️ เอกสารใบแรกใน Figma ชื่อ 28 Dividers Documentation เลขหน้าในชื่อไม่ตรงกับหน้า 26 ใช้ชื่อตาม Figma ไปก่อนจนกว่าจะแก้ที่ Figma
// story ของ component เอง (props และตัวอย่างการใช้) อยู่ที่ components/Divider
const samples = dividerSamples

const meta = {
  title: 'Molecules (Element)/26 Dividers',
  component: AtomDoc,
  args: { data, name: '', samples },
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof AtomDoc>

export default meta
type Story = StoryObj<typeof meta>

// เอกสาร Divider Component Previews ไม่มีเมนูที่นี่ เพราะซ้ำกับ story ของ component ที่กดแก้ค่าในแผงได้ (ผู้ใช้สั่ง 2026-11-05) ข้อมูลยังอยู่ใน dividers-doc.json
// ชื่อในเมนูตั้งตรง ๆ ทีละตัว เพราะ Storybook อ่านชื่อ story จากโค้ดแบบไม่รัน ถ้าสร้างผ่านฟังก์ชันจะได้ชื่อตัวแปรแทน
export const Overview: Story = { name: 'ภาพรวม', args: { data, name: '28 Dividers Documentation', samples } }
export const DividerToken: Story = { name: 'Divider Token', args: { data, name: 'Divider Token', samples } }
export const DividerUsage: Story = { name: 'Divider Usage', args: { data, name: 'Divider Usage', samples } }
export const DividerSpace: Story = { name: 'Divider Space', args: { data, name: 'Divider Space', samples } }
