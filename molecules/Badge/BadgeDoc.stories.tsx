import type { Meta, StoryObj } from '@storybook/react-vite'
import { AtomDoc } from '../../foundations/shared/AtomDoc'
import data from './badge-doc.json'
import { badgeSamples } from './badgeSamples'
import '../../tokens/output/css/typography.css'

// หน้า 22 Badge ในชั้น Molecules (Element) หนึ่ง story ต่อเอกสารหนึ่งใบ เรียงซ้ายไปขวาเหมือนหน้า 22 Badge ในไฟล์ออกแบบ
// เนื้อหาทั้งหมดมาจาก badge-doc.json ถ้าไฟล์ออกแบบเปลี่ยน ให้รัน npm run figma:atom-doc -- badge แล้ว story จะตามเอง
// ตัวอย่างป้ายวาดด้วย Badge จริงผ่าน badgeSamples
// story ของ component เอง (props และตัวอย่างการใช้) อยู่ที่ components/Badge เมนู Badge Component
const samples = badgeSamples

const meta = {
  title: 'Molecules (Element)/22 Badge',
  component: AtomDoc,
  args: { data, name: '', samples },
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof AtomDoc>

export default meta
type Story = StoryObj<typeof meta>

// เอกสารตระกูลสี 11 ใบ (Neutral Badge ถึง Brown Badge) ไม่มีเมนูที่นี่ เพราะซ้ำกับ story ใต้ Badge Component ที่เลือกตระกูลในแผงได้ (เหมือนหน้า 21 Tags ที่ผู้ใช้สั่ง 2026-11-06) ข้อมูลยังอยู่ใน badge-doc.json
// ชื่อในเมนูตั้งตรง ๆ ทีละตัว เพราะ Storybook อ่านชื่อ story จากโค้ดแบบไม่รัน ถ้าสร้างผ่านฟังก์ชันจะได้ชื่อตัวแปรแทน
export const Overview: Story = { name: 'ภาพรวม', args: { data, name: '22 Badge Documentation', samples } }
export const BadgeToken: Story = { name: 'Badge Token', args: { data, name: 'Badge Token', samples } }
export const BadgeGuide: Story = { name: 'Badge Guide', args: { data, name: 'Badge Guide', samples } }
export const BadgeSpace: Story = { name: 'Badge Space', args: { data, name: 'Badge Space', samples } }
