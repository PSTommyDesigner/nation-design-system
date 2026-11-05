import type { Meta, StoryObj } from '@storybook/react-vite'
import { AtomDoc } from '../../foundations/shared/AtomDoc'
import data from './sliders-doc.json'
import { sliderSamples } from './sliderSamples'
import '../../tokens/output/css/typography.css'

// หน้า 17 Sliders ในชั้น Molecules (Element) หนึ่ง story ต่อเอกสารหนึ่งใบ เรียงซ้ายไปขวาเหมือนหน้า 17 Sliders ในไฟล์ออกแบบ
// เนื้อหาทั้งหมดมาจาก sliders-doc.json ถ้าไฟล์ออกแบบเปลี่ยน ให้รัน npm run figma:atom-doc -- sliders แล้ว story จะตามเอง
// ตัวอย่างแถบเลื่อนวาดด้วย component จริงผ่าน sliderSamples ค่าหัวจับคำนวณจากรูปทรงในไฟล์ออกแบบ (ผู้ใช้อนุมัติ 2026-11-05)
// story ของ component เอง (props และตัวอย่างการใช้) อยู่ที่ components/Slider เมนู 17 Sliders/Slider
const samples = sliderSamples

const meta = {
  title: 'Molecules (Element)/17 Sliders',
  component: AtomDoc,
  args: { data, name: '', samples },
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof AtomDoc>

export default meta
type Story = StoryObj<typeof meta>

// ชื่อในเมนูตั้งตรง ๆ ทีละตัว เพราะ Storybook อ่านชื่อ story จากโค้ดแบบไม่รัน ถ้าสร้างผ่านฟังก์ชันจะได้ชื่อตัวแปรแทน
export const Overview: Story = { name: 'ภาพรวม', args: { data, name: '17 Sliders Documentation', samples } }
export const SliderToken: Story = { name: 'Slider Token', args: { data, name: 'Slider Token', samples } }
export const SliderAnatomy: Story = { name: 'Slider Anatomy', args: { data, name: 'Slider Anatomy', samples } }
export const SliderTwoLayerModel: Story = { name: 'Slider Two Layer Model', args: { data, name: 'Slider Two Layer Model', samples } }
export const SliderPositionMethod: Story = { name: 'Slider Position Method', args: { data, name: 'Slider Position Method', samples } }
export const SliderUsage: Story = { name: 'Slider Usage', args: { data, name: 'Slider Usage', samples } }
export const SliderSet: Story = { name: 'Slider', args: { data, name: 'Slider', samples } }
export const SliderSpace: Story = { name: 'Slider Space', args: { data, name: 'Slider Space', samples } }
