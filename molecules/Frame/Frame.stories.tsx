/// <reference types="vite/client" />
import type { Meta, StoryObj } from '@storybook/react-vite'
import { AtomDoc } from '../../foundations/shared/AtomDoc'
import data from './frame-doc.json'
import { frameSamples } from './frameSamples'
import '../../tokens/output/css/typography.css'

// หน้า 10 Frame ในชั้น Molecules (Element) หนึ่ง story ต่อเอกสารหนึ่งใบ เรียงซ้ายไปขวาเหมือนหน้า 10 Frame ในไฟล์ออกแบบ
// เนื้อหาทั้งหมดมาจาก frame-doc.json ถ้าไฟล์ออกแบบเปลี่ยน ให้รัน npm run figma:atom-doc -- frame แล้ว story จะตามเอง
// ภาพกรอบ 8 ตัวเป็น PNG ที่สคริปต์ export ไว้ใน assets/ เพราะในโค้ดยังไม่มี component Frame (ผู้ใช้อนุมัติ 2026-11-04)
// ชุด mockup-media วาดด้วย MockupMedia จริงผ่าน frameSamples (เพิ่ม 2026-11-12)
const samples = frameSamples
const logos = import.meta.glob<string>('./assets/*.png', { eager: true, query: '?url', import: 'default' })

const meta = {
  title: 'Molecules (Element)/10 Frame',
  component: AtomDoc,
  args: { data, name: '', logos, samples },
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof AtomDoc>

export default meta
type Story = StoryObj<typeof meta>

// เอกสาร Mockup Media Component Previews ไม่มีเมนูที่นี่ เพราะซ้ำกับ story ของ component ที่กดแก้ค่าในแผงได้ (ผู้ใช้สั่ง 2026-11-05) ข้อมูลยังอยู่ใน frame-doc.json
// ชื่อในเมนูตั้งตรง ๆ ทีละตัว เพราะ Storybook อ่านชื่อ story จากโค้ดแบบไม่รัน ถ้าสร้างผ่านฟังก์ชันจะได้ชื่อตัวแปรแทน
export const Overview: Story = { name: 'ภาพรวม', args: { data, name: '10 Frame Documentation', logos, samples } }
export const FrameToken: Story = { name: 'Frame Token', args: { data, name: 'Frame Token', logos, samples } }
export const RatioGuide: Story = { name: 'Ratio Guide', args: { data, name: 'Ratio Guide', logos, samples } }
export const FrameRatios: Story = { name: 'Frame Ratios', args: { data, name: 'Frame Ratios', logos, samples } }
export const FrameSpace: Story = { name: 'Frame Space', args: { data, name: 'Frame Space', logos, samples } }
