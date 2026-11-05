import type { Meta, StoryObj } from '@storybook/react-vite'
import { AtomDoc } from '../../foundations/shared/AtomDoc'
import data from './input-doc.json'
import { inputSamples } from './inputSamples'
import '../../tokens/output/css/typography.css'

// หน้า 13 Input ในชั้น Molecules (Element) หนึ่ง story ต่อเอกสารหนึ่งใบ เรียงซ้ายไปขวาเหมือนหน้า 13 Input ในไฟล์ออกแบบ
// เนื้อหาทั้งหมดมาจาก input-doc.json ถ้าไฟล์ออกแบบเปลี่ยน ให้รัน npm run figma:atom-doc -- input แล้ว story จะตามเอง
// ตัวอย่างช่องกรอกวาดด้วย component จริงผ่าน inputSamples (ผู้ใช้อนุมัติ 2026-11-05)
// story ของ component เอง (props และตัวอย่างการใช้) อยู่ที่ components/TextField และ TagField เมนู 13 Input/<ชื่อ>
const samples = inputSamples

const meta = {
  title: 'Molecules (Element)/13 Input',
  component: AtomDoc,
  args: { data, name: '', samples },
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof AtomDoc>

export default meta
type Story = StoryObj<typeof meta>

// เอกสาร Input Components ไม่มีเมนูที่นี่ เพราะซ้ำกับ story ใต้ 13 Input/TextField และ TagField ที่กดแก้ค่าในแผงได้ (ผู้ใช้สั่ง 2026-11-05) ข้อมูลยังอยู่ใน input-doc.json
// ชื่อในเมนูตั้งตรง ๆ ทีละตัว เพราะ Storybook อ่านชื่อ story จากโค้ดแบบไม่รัน ถ้าสร้างผ่านฟังก์ชันจะได้ชื่อตัวแปรแทน
export const Overview: Story = { name: 'ภาพรวม', args: { data, name: '13 Input Documentation', samples } }
export const InputToken: Story = { name: 'Input Token', args: { data, name: 'Input Token', samples } }
export const InputGuide: Story = { name: 'Input Guide', args: { data, name: 'Input Guide', samples } }
export const InputSpace: Story = { name: 'Input Space', args: { data, name: 'Input Space', samples } }
