import type { Meta, StoryObj } from '@storybook/react-vite'
import { AtomDoc } from '../shared/AtomDoc'
import data from './grid-doc.json'
import '../../tokens/output/css/typography.css'

// หน้า 04 Grid ในชั้น Atoms (Identity) หนึ่ง story ต่อเอกสารหนึ่งใบ เรียงซ้ายไปขวาเหมือนหน้า 04 Grid ในไฟล์ออกแบบ
// เนื้อหาทั้งหมดมาจาก grid-doc.json ถ้าไฟล์ออกแบบเปลี่ยน ให้รัน npm run figma:atom-doc -- grid แล้ว story จะตามเอง
// ไม่มีหน้า Docs รวม (!autodocs) เพราะแต่ละเอกสารยาวพอเป็นหน้าของตัวเองแล้ว
const meta = {
  title: 'Atoms (Identity)/04 Grid',
  component: AtomDoc,
  args: { data, name: '' },
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof AtomDoc>

export default meta
type Story = StoryObj<typeof meta>

// เอกสาร Grid Components ไม่มีเมนูที่นี่ เพราะเป็นชุด component ต้นฉบับของภาพ grid ในไฟล์ออกแบบ ไม่ต้องแสดงใน Storybook (ผู้ใช้สั่ง 2026-11-05) ข้อมูลยังอยู่ใน grid-doc.json
// ชื่อในเมนูตั้งตรง ๆ ทีละตัว เพราะ Storybook อ่านชื่อ story จากโค้ดแบบไม่รัน ถ้าสร้างผ่านฟังก์ชันจะได้ชื่อตัวแปรแทน
export const Overview: Story = { name: 'ภาพรวม', args: { data, name: '04 Grid Documentation' } }
export const GridToken: Story = { name: 'Grid Token', args: { data, name: 'Grid Token' } }
export const SpecimenV2022: Story = { name: 'Grid Specimen Version 2022', args: { data, name: 'Grid Specimen Version 2022' } }
export const SpecimenNationDigital: Story = { name: 'Grid Specimen Nation Digital', args: { data, name: 'Grid Specimen Nation Digital' } }
export const SpecimenV2026: Story = { name: 'Grid Specimen Version 2026', args: { data, name: 'Grid Specimen Version 2026' } }
