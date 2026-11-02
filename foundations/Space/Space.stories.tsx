import type { Meta, StoryObj } from '@storybook/react-vite'
import { AtomDoc } from '../shared/AtomDoc'
import data from './space-doc.json'
import '../../tokens/output/css/typography.css'

// หน้า 07 Space ในชั้น Atoms (Identity) หนึ่ง story ต่อเอกสารหนึ่งใบ เรียงซ้ายไปขวาเหมือนหน้า 07 Space ในไฟล์ออกแบบ
// เนื้อหาทั้งหมดมาจาก space-doc.json ถ้าไฟล์ออกแบบเปลี่ยน ให้รัน npm run figma:atom-doc -- space แล้ว story จะตามเอง
// ไม่มีหน้า Docs รวม (!autodocs) เพราะแต่ละเอกสารยาวพอเป็นหน้าของตัวเองแล้ว
const meta = {
  title: 'Atoms (Identity)/07 Space',
  component: AtomDoc,
  args: { data, name: '' },
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof AtomDoc>

export default meta
type Story = StoryObj<typeof meta>

// ชื่อในเมนูตั้งตรง ๆ ทีละตัว เพราะ Storybook อ่านชื่อ story จากโค้ดแบบไม่รัน ถ้าสร้างผ่านฟังก์ชันจะได้ชื่อตัวแปรแทน
export const Overview: Story = { name: 'ภาพรวม', args: { data, name: '07 Space Documentation' } }
export const SpaceScale: Story = { name: 'Space Scale', args: { data, name: 'Space Scale' } }
export const SpaceUsage: Story = { name: 'Space Usage', args: { data, name: 'Space Usage' } }
export const SpaceToken: Story = { name: 'Space Token', args: { data, name: 'Space Token Document' } }
