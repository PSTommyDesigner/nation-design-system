import type { Meta, StoryObj } from '@storybook/react-vite'
import { AtomDoc } from '../../foundations/shared/AtomDoc'
import data from './pagination-doc.json'
import { paginationSamples } from './paginationSamples'
import '../../tokens/output/css/typography.css'

// หน้า 24 Pagination ในชั้น Molecules (Element) หนึ่ง story ต่อเอกสารหนึ่งใบ เรียงซ้ายไปขวาเหมือนหน้า 24 Pagination ในไฟล์ออกแบบ
// เนื้อหาทั้งหมดมาจาก pagination-doc.json ถ้าไฟล์ออกแบบเปลี่ยน ให้รัน npm run figma:atom-doc -- pagination แล้ว story จะตามเอง
// ตัวอย่างวาดด้วย Pagination จริงผ่าน paginationSamples ปุ่มเลขหน้ากับจุดไข่ปลาไม่มี component เดี่ยว จึงขึ้นข้อความแทน
// story ของ component เอง (props และตัวอย่างการใช้) อยู่ที่ components/Pagination
const samples = paginationSamples

const meta = {
  title: 'Molecules (Element)/24 Pagination',
  component: AtomDoc,
  args: { data, name: '', samples },
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof AtomDoc>

export default meta
type Story = StoryObj<typeof meta>

// เอกสาร Pagination Component Previews ไม่มีเมนูที่นี่ เพราะซ้ำกับ story ของ component ที่กดแก้ค่าในแผงได้ (ผู้ใช้สั่ง 2026-11-05)
// เอกสาร Pagination Base Components ไม่มีเมนูเช่นกัน เพราะชิ้นย่อยทั้งสองชุดไม่มี component เดี่ยวในโค้ด หน้าจะมีแต่ข้อความแทน ข้อมูลทั้งสองใบยังอยู่ใน pagination-doc.json
// ชื่อในเมนูตั้งตรง ๆ ทีละตัว เพราะ Storybook อ่านชื่อ story จากโค้ดแบบไม่รัน ถ้าสร้างผ่านฟังก์ชันจะได้ชื่อตัวแปรแทน
export const Overview: Story = { name: 'ภาพรวม', args: { data, name: '24 Pagination Documentation', samples } }
export const PaginationToken: Story = { name: 'Pagination Token', args: { data, name: 'Pagination Token', samples } }
export const PaginationUsage: Story = { name: 'Pagination Usage', args: { data, name: 'Pagination Usage', samples } }
export const PaginationAccessibility: Story = { name: 'Pagination Accessibility', args: { data, name: 'Pagination Accessibility', samples } }
export const PaginationSpace: Story = { name: 'Pagination Space', args: { data, name: 'Pagination Space', samples } }
