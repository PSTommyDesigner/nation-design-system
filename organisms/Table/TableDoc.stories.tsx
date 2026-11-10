import type { Meta, StoryObj } from '@storybook/react-vite'
import { AtomDoc } from '../../foundations/shared/AtomDoc'
import data from './table-doc.json'
import '../../tokens/output/css/typography.css'

// หน้า 28 Table ในชั้น Organisms (Component) หนึ่ง story ต่อเอกสารหนึ่งใบ เรียงซ้ายไปขวาเหมือนหน้า 28 Table ในไฟล์ออกแบบ
// เนื้อหาทั้งหมดมาจาก table-doc.json ถ้าไฟล์ออกแบบเปลี่ยน ให้รัน npm run figma:atom-doc -- table แล้ว story จะตามเอง
// ⚠️ ไม่มี samples เพราะเซลตาราง 24 ตัวใน Figma ไม่มี component แยกในโค้ด (มีแค่ Table ทั้งตาราง) ตัวอย่างเซลจึงขึ้นข้อความแทน (ผู้ใช้ตัดสิน 2026-11-10)
// story ของ component เอง (props และตัวอย่างการใช้) อยู่ที่ components/Table

const meta = {
  title: 'Organisms (Component)/28 Table',
  component: AtomDoc,
  args: { data, name: '' },
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof AtomDoc>

export default meta
type Story = StoryObj<typeof meta>

// เอกสาร Data table ไม่มีเมนูที่นี่ เพราะเป็นที่วางเซลต้นฉบับทั้ง 24 ตัวซึ่งไม่มีโค้ด หน้าจะมีแต่ข้อความแทน (เหมือนใบ Base Components ของหน้า 25 และ 27) ข้อมูลยังอยู่ใน table-doc.json
// ชื่อในเมนูตั้งตรง ๆ ทีละตัว เพราะ Storybook อ่านชื่อ story จากโค้ดแบบไม่รัน ถ้าสร้างผ่านฟังก์ชันจะได้ชื่อตัวแปรแทน
export const Overview: Story = { name: 'ภาพรวม', args: { data, name: '28 Table Documentation' } }
export const TableToken: Story = { name: 'Table Token', args: { data, name: 'Table Token' } }
export const TableSpace: Story = { name: 'Table Space', args: { data, name: 'Table Space' } }
