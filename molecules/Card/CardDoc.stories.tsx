import type { Meta, StoryObj } from '@storybook/react-vite'
import { AtomDoc } from '../../foundations/shared/AtomDoc'
import data from './card-doc.json'
import { cardSamples } from './cardSamples'
import '../../tokens/output/css/typography.css'

// หน้า 25 Card ในชั้น Molecules (Element) หนึ่ง story ต่อเอกสารหนึ่งใบ เรียงซ้ายไปขวาเหมือนหน้า 25 Card ในไฟล์ออกแบบ
// เนื้อหาทั้งหมดมาจาก card-doc.json ถ้าไฟล์ออกแบบเปลี่ยน ให้รัน npm run figma:atom-doc -- card แล้ว story จะตามเอง
// ตัวอย่างวาดด้วย Card จริงผ่าน cardSamples เฉพาะ 4 ชุดที่โค้ดรองรับ ชุดที่เหลือขึ้นข้อความแทน ภาพแทนรูปอยู่ใน assets/
// ⚠️ เอกสารใบแรกใน Figma ชื่อ 27 Card Documentation เลขหน้าในชื่อไม่ตรงกับหน้า 25 ใช้ชื่อตาม Figma ไปก่อนจนกว่าจะแก้ที่ Figma
// story ของ component เอง (props และตัวอย่างการใช้) อยู่ที่ components/Card
const samples = cardSamples
const logos = import.meta.glob<string>('./assets/*.png', { eager: true, query: '?url', import: 'default' })

const meta = {
  title: 'Molecules (Element)/25 Card',
  component: AtomDoc,
  args: { data, name: '', logos, samples },
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof AtomDoc>

export default meta
type Story = StoryObj<typeof meta>

// เอกสาร Card Component Previews ไม่มีเมนูที่นี่ เพราะซ้ำกับ story ของ component ที่กดแก้ค่าในแผงได้ (ผู้ใช้สั่ง 2026-11-05)
// เอกสาร Card Base Components ไม่มีเมนูเช่นกัน เพราะชิ้นส่วนภายในไม่มี component ในโค้ด หน้าจะมีแต่ข้อความแทน (เหมือนหน้า 24) ข้อมูลทั้งสองใบยังอยู่ใน card-doc.json
// ชื่อในเมนูตั้งตรง ๆ ทีละตัว เพราะ Storybook อ่านชื่อ story จากโค้ดแบบไม่รัน ถ้าสร้างผ่านฟังก์ชันจะได้ชื่อตัวแปรแทน
export const Overview: Story = { name: 'ภาพรวม', args: { data, name: '27 Card Documentation', logos, samples } }
export const CardToken: Story = { name: 'Card Token', args: { data, name: 'Card Token', logos, samples } }
export const CardUsage: Story = { name: 'Card Usage', args: { data, name: 'Card Usage', logos, samples } }
export const CardAnatomy: Story = { name: 'Card Anatomy', args: { data, name: 'Card Anatomy', logos, samples } }
export const CardSpace: Story = { name: 'Card Space', args: { data, name: 'Card Space', logos, samples } }
