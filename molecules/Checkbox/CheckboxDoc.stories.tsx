import type { Meta, StoryObj } from '@storybook/react-vite'
import { AtomDoc } from '../../foundations/shared/AtomDoc'
import data from './checkbox-doc.json'
import { checkboxSamples } from './checkboxSamples'
import '../../tokens/output/css/typography.css'

// หน้า 15 Checkbox ในชั้น Molecules (Element) หนึ่ง story ต่อเอกสารหนึ่งใบ เรียงซ้ายไปขวาเหมือนหน้า 15 Checkbox ในไฟล์ออกแบบ
// เนื้อหาทั้งหมดมาจาก checkbox-doc.json ถ้าไฟล์ออกแบบเปลี่ยน ให้รัน npm run figma:atom-doc -- checkbox แล้ว story จะตามเอง
// ตัวอย่างช่องติ๊กวาดด้วย component จริงผ่าน checkboxSamples (ผู้ใช้อนุมัติ 2026-11-05)
// story ของ component เอง (props และตัวอย่างการใช้) อยู่ที่ components/Checkbox เมนู 15 Checkbox/Checkbox
const samples = checkboxSamples

const meta = {
  title: 'Molecules (Element)/15 Checkbox',
  component: AtomDoc,
  args: { data, name: '', samples },
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof AtomDoc>

export default meta
type Story = StoryObj<typeof meta>

// ชื่อในเมนูตั้งตรง ๆ ทีละตัว เพราะ Storybook อ่านชื่อ story จากโค้ดแบบไม่รัน ถ้าสร้างผ่านฟังก์ชันจะได้ชื่อตัวแปรแทน
export const Overview: Story = { name: 'ภาพรวม', args: { data, name: '15 Checkbox Documentation', samples } }
export const CheckboxToken: Story = { name: 'Checkbox Token', args: { data, name: 'Checkbox Token', samples } }
export const CheckboxAnatomy: Story = { name: 'Checkbox Anatomy', args: { data, name: 'Checkbox Anatomy', samples } }
export const CheckboxTwoLayerModel: Story = { name: 'Checkbox Two Layer Model', args: { data, name: 'Checkbox Two Layer Model', samples } }
export const CheckboxUsage: Story = { name: 'Checkbox Usage', args: { data, name: 'Checkbox Usage', samples } }
export const CheckboxSet: Story = { name: 'Checkbox', args: { data, name: 'Checkbox', samples } }
export const CheckboxSpace: Story = { name: 'Checkbox Space', args: { data, name: 'Checkbox Space', samples } }
