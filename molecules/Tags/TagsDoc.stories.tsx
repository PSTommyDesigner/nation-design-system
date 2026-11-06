import type { Meta, StoryObj } from '@storybook/react-vite'
import { AtomDoc } from '../../foundations/shared/AtomDoc'
import data from './tags-doc.json'
import { tagSamples } from './tagSamples'
import '../../tokens/output/css/typography.css'

// หน้า 21 Tags ในชั้น Molecules (Element) หนึ่ง story ต่อเอกสารหนึ่งใบ เรียงซ้ายไปขวาเหมือนหน้า 21 Tags ในไฟล์ออกแบบ
// เนื้อหาทั้งหมดมาจาก tags-doc.json ถ้าไฟล์ออกแบบเปลี่ยน ให้รัน npm run figma:atom-doc -- tags แล้ว story จะตามเอง
// ตัวอย่างแท็กวาดด้วย Tag จริงผ่าน tagSamples ภาพแทนรูปของ image-tag อยู่ใน assets/
// story ของ component เอง (props และตัวอย่างการใช้) อยู่ที่ components/Tag เมนู Tag Component
const samples = tagSamples
const logos = import.meta.glob<string>('./assets/*.png', { eager: true, query: '?url', import: 'default' })

const meta = {
  title: 'Molecules (Element)/21 Tags',
  component: AtomDoc,
  args: { data, name: '', logos, samples },
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof AtomDoc>

export default meta
type Story = StoryObj<typeof meta>

// เอกสารตระกูลสี 11 ใบ (Neutral Tags ถึง Brown Tags) ไม่มีเมนูที่นี่ เพราะซ้ำกับ story ใต้ Tag Component ที่เลือกตระกูลในแผงได้ (ผู้ใช้สั่ง 2026-11-06 เหมือนหน้า 12 Buttons) ข้อมูลยังอยู่ใน tags-doc.json
// ชื่อในเมนูตั้งตรง ๆ ทีละตัว เพราะ Storybook อ่านชื่อ story จากโค้ดแบบไม่รัน ถ้าสร้างผ่านฟังก์ชันจะได้ชื่อตัวแปรแทน
export const Overview: Story = { name: 'ภาพรวม', args: { data, name: '21 Tags Documentation', logos, samples } }
export const TagsToken: Story = { name: 'Tags Token', args: { data, name: 'Tags Token', logos, samples } }
export const TagsGuide: Story = { name: 'Tags Guide', args: { data, name: 'Tags Guide', logos, samples } }
export const TagsSpace: Story = { name: 'Tags Space', args: { data, name: 'Tags Space', logos, samples } }
