/// <reference types="vite/client" />
import type { Meta, StoryObj } from '@storybook/react-vite'
import { AtomDoc } from '../shared/AtomDoc'
import data from './logo-doc.json'
import '../../tokens/output/css/typography.css'

// หน้า 08 Logo ในชั้น Atoms (Identity) หนึ่ง story ต่อเอกสารหนึ่งใบ เรียงซ้ายไปขวาเหมือนหน้า 08 Logo ในไฟล์ออกแบบ
// เนื้อหาทั้งหมดมาจาก logo-doc.json ถ้าไฟล์ออกแบบเปลี่ยน ให้รัน npm run figma:atom-doc -- logo แล้ว story จะตามเอง
// ไม่มีหน้า Docs รวม (!autodocs) เพราะแต่ละเอกสารยาวพอเป็นหน้าของตัวเองแล้ว
const logos = import.meta.glob<string>('./assets/*.svg', { eager: true, query: '?url', import: 'default' })

const meta = {
  title: 'Atoms (Identity)/08 Logo',
  component: AtomDoc,
  args: { data, name: '', logos },
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof AtomDoc>

export default meta
type Story = StoryObj<typeof meta>

// ชื่อในเมนูตั้งตรง ๆ ทีละตัว เพราะ Storybook อ่านชื่อ story จากโค้ดแบบไม่รัน ถ้าสร้างผ่านฟังก์ชันจะได้ชื่อตัวแปรแทน
export const Overview: Story = { name: 'ภาพรวม', args: { data, name: '08 Logo Documentation', logos } }
export const DraftLogos: Story = { name: 'Draft Logos', args: { data, name: 'Draft Logos', logos } }
export const NationBrandLogos: Story = { name: 'Nation Brand Logos', args: { data, name: 'Nation Brand Logos', logos } }
