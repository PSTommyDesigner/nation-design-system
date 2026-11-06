import type { Meta, StoryObj } from '@storybook/react-vite'
import { AtomDoc } from '../../foundations/shared/AtomDoc'
import data from './tooltips-doc.json'
import { tooltipSamples } from './tooltipSamples'
import '../../tokens/output/css/typography.css'

// หน้า 20 Tooltips ในชั้น Molecules (Element) หนึ่ง story ต่อเอกสารหนึ่งใบ เรียงซ้ายไปขวาเหมือนหน้า 20 Tooltips ในไฟล์ออกแบบ
// เนื้อหาทั้งหมดมาจาก tooltips-doc.json ถ้าไฟล์ออกแบบเปลี่ยน ให้รัน npm run figma:atom-doc -- tooltips แล้ว story จะตามเอง
// ตัวอย่างวาดด้วย Tooltip จริงที่เปิดค้างด้วย prop open (ผู้ใช้อนุมัติ 2026-11-06) ลูกศร tooltip-arrow ไม่มี component เดี่ยว จึงขึ้นข้อความแทน
// story ของ component เอง (props และตัวอย่างการใช้) อยู่ที่ components/Tooltip เมนู Tooltip Component
const samples = tooltipSamples

const meta = {
  title: 'Molecules (Element)/20 Tooltips',
  component: AtomDoc,
  args: { data, name: '', samples },
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof AtomDoc>

export default meta
type Story = StoryObj<typeof meta>

// เอกสาร Tooltip Component Previews ไม่มีเมนูที่นี่ เพราะซ้ำกับ story ใต้ Tooltip Component ที่กดแก้ค่าในแผงได้ (ผู้ใช้สั่ง 2026-11-05) ข้อมูลยังอยู่ใน tooltips-doc.json
// ชื่อในเมนูตั้งตรง ๆ ทีละตัว เพราะ Storybook อ่านชื่อ story จากโค้ดแบบไม่รัน ถ้าสร้างผ่านฟังก์ชันจะได้ชื่อตัวแปรแทน
export const Overview: Story = { name: 'ภาพรวม', args: { data, name: '20 Tooltips Documentation', samples } }
export const TooltipToken: Story = { name: 'Tooltip Token', args: { data, name: 'Tooltip Token', samples } }
export const TooltipUsage: Story = { name: 'Tooltip Usage', args: { data, name: 'Tooltip Usage', samples } }
export const TooltipPlacementAndAccessibility: Story = { name: 'Tooltip Placement and Accessibility', args: { data, name: 'Tooltip Placement and Accessibility', samples } }
export const TooltipSpace: Story = { name: 'Tooltip Space', args: { data, name: 'Tooltip Space', samples } }
