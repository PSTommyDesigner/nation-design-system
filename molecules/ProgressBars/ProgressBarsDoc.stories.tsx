import type { Meta, StoryObj } from '@storybook/react-vite'
import { AtomDoc } from '../../foundations/shared/AtomDoc'
import data from './progress-doc.json'
import { progressSamples } from './progressSamples'
import '../../tokens/output/css/typography.css'

// หน้า 23 Progress Bars ในชั้น Molecules (Element) หนึ่ง story ต่อเอกสารหนึ่งใบ เรียงซ้ายไปขวาเหมือนหน้า 23 Progress Bars ในไฟล์ออกแบบ
// เนื้อหาทั้งหมดมาจาก progress-doc.json ถ้าไฟล์ออกแบบเปลี่ยน ให้รัน npm run figma:atom-doc -- progress แล้ว story จะตามเอง
// ตัวอย่างวาดด้วย ProgressBar CircularProgressBar และ SemiCircularProgressBar จริงผ่าน progressSamples
// story ของ component เอง (props และตัวอย่างการใช้) อยู่ที่ components/Progress
const samples = progressSamples

const meta = {
  title: 'Molecules (Element)/23 Progress Bars',
  component: AtomDoc,
  args: { data, name: '', samples },
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof AtomDoc>

export default meta
type Story = StoryObj<typeof meta>

// เอกสาร Progress Component Previews ไม่มีเมนูที่นี่ เพราะซ้ำกับ story ของ component ที่กดแก้ค่าในแผงได้ (ผู้ใช้สั่ง 2026-11-05) ข้อมูลยังอยู่ใน progress-doc.json
// ชื่อในเมนูตั้งตรง ๆ ทีละตัว เพราะ Storybook อ่านชื่อ story จากโค้ดแบบไม่รัน ถ้าสร้างผ่านฟังก์ชันจะได้ชื่อตัวแปรแทน
export const Overview: Story = { name: 'ภาพรวม', args: { data, name: '23 Progress Bars Documentation', samples } }
export const ProgressToken: Story = { name: 'Progress Token', args: { data, name: 'Progress Token', samples } }
export const ProgressUsage: Story = { name: 'Progress Usage', args: { data, name: 'Progress Usage', samples } }
export const ProgressValueAndLabel: Story = { name: 'Progress Value and Label', args: { data, name: 'Progress Value and Label', samples } }
export const ProgressAccessibilityAndMotion: Story = { name: 'Progress Accessibility and Motion', args: { data, name: 'Progress Accessibility and Motion', samples } }
export const ProgressSpace: Story = { name: 'Progress Space', args: { data, name: 'Progress Space', samples } }
