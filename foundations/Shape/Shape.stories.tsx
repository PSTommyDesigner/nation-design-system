import type { Meta, StoryObj } from '@storybook/react-vite'
import { AtomDoc } from '../shared/AtomDoc'
import data from './shape-doc.json'
import '../../tokens/output/css/typography.css'

// หน้า 06 Shape ในชั้น Atoms (Identity) หนึ่ง story ต่อเอกสารหนึ่งใบ เรียงซ้ายไปขวาเหมือนหน้า 06 Shape ในไฟล์ออกแบบ
// เนื้อหาทั้งหมดมาจาก shape-doc.json ถ้าไฟล์ออกแบบเปลี่ยน ให้รัน npm run figma:atom-doc -- shape แล้ว story จะตามเอง
// ไม่มีหน้า Docs รวม (!autodocs) เพราะแต่ละเอกสารยาวพอเป็นหน้าของตัวเองแล้ว
const meta = {
  title: 'Atoms (Identity)/06 Shape',
  component: AtomDoc,
  args: { data, name: '' },
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof AtomDoc>

export default meta
type Story = StoryObj<typeof meta>

// ชื่อในเมนูตั้งตรง ๆ ทีละตัว เพราะ Storybook อ่านชื่อ story จากโค้ดแบบไม่รัน ถ้าสร้างผ่านฟังก์ชันจะได้ชื่อตัวแปรแทน
export const Overview: Story = { name: 'ภาพรวม', args: { data, name: '06 Shape Documentation' } }
export const ShapeToken: Story = { name: 'Shape Token', args: { data, name: 'Shape Token Document' } }
export const RadiusScale: Story = { name: 'Radius Scale', args: { data, name: 'Radius Scale' } }
export const RadiusByComponent: Story = { name: 'Radius By Component', args: { data, name: 'Radius By Component' } }
export const NestedRadius: Story = { name: 'Nested Radius', args: { data, name: 'Nested Radius' } }
