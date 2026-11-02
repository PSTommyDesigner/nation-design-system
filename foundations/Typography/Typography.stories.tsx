import type { Meta, StoryObj } from '@storybook/react-vite'
import { AtomDoc } from '../shared/AtomDoc'
import data from './typography-doc.json'
import '../../tokens/output/css/typography.css'

// หน้า 03 Typography ในชั้น Atoms (Identity) หนึ่ง story ต่อเอกสารหนึ่งใบ เรียงซ้ายไปขวาเหมือนหน้า 03 Typography ในไฟล์ออกแบบ
// เนื้อหาทั้งหมดมาจาก typography-doc.json ถ้าไฟล์ออกแบบเปลี่ยน ให้รัน npm run figma:atom-doc -- typography แล้ว story จะตามเอง
// ไม่มีหน้า Docs รวม (!autodocs) เพราะแต่ละเอกสารยาวพอเป็นหน้าของตัวเองแล้ว
const meta = {
  title: 'Atoms (Identity)/03 Typography',
  component: AtomDoc,
  args: { data, name: '' },
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof AtomDoc>

export default meta
type Story = StoryObj<typeof meta>

// ชื่อในเมนูตั้งตรง ๆ ทีละตัว เพราะ Storybook อ่านชื่อ story จากโค้ดแบบไม่รัน ถ้าสร้างผ่านฟังก์ชันจะได้ชื่อตัวแปรแทน
export const Overview: Story = { name: 'ภาพรวม', args: { data, name: '03 Typography Documentation' } }
export const TypographyToken: Story = { name: 'Typography Token', args: { data, name: 'Typography Token' } }
export const TypeScale: Story = { name: 'Type Scale', args: { data, name: 'Type Scale' } }
export const TextRoles: Story = { name: 'Text Roles', args: { data, name: 'Text Roles' } }
