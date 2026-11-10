import type { Meta, StoryObj } from '@storybook/react-vite'
import { AtomDoc } from '../../foundations/shared/AtomDoc'
import data from './chart-doc.json'
import { chartSamples } from './chartSamples'
import '../../tokens/output/css/typography.css'

// หน้า 29 Chart ในชั้น Organisms (Component) หนึ่ง story ต่อเอกสารหนึ่งใบ เรียงซ้ายไปขวาเหมือนหน้า 29 Chart ในไฟล์ออกแบบ
// เนื้อหาทั้งหมดมาจาก chart-doc.json ถ้าไฟล์ออกแบบเปลี่ยน ให้รัน npm run figma:atom-doc -- chart แล้ว story จะตามเอง
// ตัวอย่างวาดด้วย BarChart จริงผ่าน chartSamples เฉพาะ bar-chart ชิ้นส่วนย่อยขึ้นข้อความแทน
// story ของ component เอง (props และตัวอย่างการใช้) อยู่ที่ components/BarChart
const samples = chartSamples

const meta = {
  title: 'Organisms (Component)/29 Chart',
  component: AtomDoc,
  args: { data, name: '', samples },
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof AtomDoc>

export default meta
type Story = StoryObj<typeof meta>

// เอกสาร Chart Component Previews ไม่มีเมนูที่นี่ เพราะซ้ำกับ story ของ component ที่กดแก้ค่าในแผงได้ (ผู้ใช้สั่ง 2026-11-05) ข้อมูลยังอยู่ใน chart-doc.json
// ชื่อในเมนูตั้งตรง ๆ ทีละตัว เพราะ Storybook อ่านชื่อ story จากโค้ดแบบไม่รัน ถ้าสร้างผ่านฟังก์ชันจะได้ชื่อตัวแปรแทน
export const Overview: Story = { name: 'ภาพรวม', args: { data, name: '29 Chart Documentation', samples } }
export const ChartToken: Story = { name: 'Chart Token', args: { data, name: 'Chart Token', samples } }
export const ChartUsage: Story = { name: 'Chart Usage', args: { data, name: 'Chart Usage', samples } }
export const ChartSpace: Story = { name: 'Chart Space', args: { data, name: 'Chart Space', samples } }
