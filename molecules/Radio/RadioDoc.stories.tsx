import type { Meta, StoryObj } from '@storybook/react-vite'
import { AtomDoc } from '../../foundations/shared/AtomDoc'
import data from './radio-doc.json'
import { radioSamples } from './radioSamples'
import '../../tokens/output/css/typography.css'

// หน้า 16 Radio ในชั้น Molecules (Element) หนึ่ง story ต่อเอกสารหนึ่งใบ เรียงซ้ายไปขวาเหมือนหน้า 16 Radio ในไฟล์ออกแบบ
// เนื้อหาทั้งหมดมาจาก radio-doc.json ถ้าไฟล์ออกแบบเปลี่ยน ให้รัน npm run figma:atom-doc -- radio แล้ว story จะตามเอง
// ตัวอย่างปุ่มเลือกวาดด้วย component จริงผ่าน radioSamples (ผู้ใช้อนุมัติ 2026-11-05)
// story ของ component เอง (props และตัวอย่างการใช้) อยู่ที่ components/Radio เมนู 16 Radio/Radio
const samples = radioSamples

const meta = {
  title: 'Molecules (Element)/16 Radio',
  component: AtomDoc,
  args: { data, name: '', samples },
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof AtomDoc>

export default meta
type Story = StoryObj<typeof meta>

// ชื่อในเมนูตั้งตรง ๆ ทีละตัว เพราะ Storybook อ่านชื่อ story จากโค้ดแบบไม่รัน ถ้าสร้างผ่านฟังก์ชันจะได้ชื่อตัวแปรแทน
export const Overview: Story = { name: 'ภาพรวม', args: { data, name: '16 Radio Documentation', samples } }
export const RadioToken: Story = { name: 'Radio Token', args: { data, name: 'Radio Token', samples } }
export const RadioAnatomy: Story = { name: 'Radio Anatomy', args: { data, name: 'Radio Anatomy', samples } }
export const RadioTwoLayerModel: Story = { name: 'Radio Two Layer Model', args: { data, name: 'Radio Two Layer Model', samples } }
export const RadioUsage: Story = { name: 'Radio Usage', args: { data, name: 'Radio Usage', samples } }
export const RadioSet: Story = { name: 'Radio', args: { data, name: 'Radio', samples } }
export const RadioSpace: Story = { name: 'Radio Space', args: { data, name: 'Radio Space', samples } }
