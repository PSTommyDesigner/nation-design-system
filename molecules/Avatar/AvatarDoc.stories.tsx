/// <reference types="vite/client" />
import type { Meta, StoryObj } from '@storybook/react-vite'
import { AtomDoc } from '../../foundations/shared/AtomDoc'
import data from './avatar-doc.json'
import { avatarSamples } from './avatarSamples'
import '../../tokens/output/css/typography.css'

// หน้า 11 Avatar ในชั้น Molecules (Element) หนึ่ง story ต่อเอกสารหนึ่งใบ เรียงซ้ายไปขวาเหมือนหน้า 11 Avatar ในไฟล์ออกแบบ
// เนื้อหาทั้งหมดมาจาก avatar-doc.json ถ้าไฟล์ออกแบบเปลี่ยน ให้รัน npm run figma:atom-doc -- avatar แล้ว story จะตามเอง
// ตัวอย่างอวาตาร์วาดด้วย component จริงผ่าน avatarSamples (ผู้ใช้อนุมัติ 2026-11-04) ภาพแทนรูปอยู่ใน assets/
// story ของ component เอง (props และตัวอย่างการใช้) อยู่ที่ components/Avatar/Avatar.stories.tsx เมนู 11 Avatar/Avatar
const logos = import.meta.glob<string>('./assets/*.png', { eager: true, query: '?url', import: 'default' })
const samples = avatarSamples

const meta = {
  title: 'Molecules (Element)/11 Avatar',
  component: AtomDoc,
  args: { data, name: '', logos, samples },
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof AtomDoc>

export default meta
type Story = StoryObj<typeof meta>

// ชื่อในเมนูตั้งตรง ๆ ทีละตัว เพราะ Storybook อ่านชื่อ story จากโค้ดแบบไม่รัน ถ้าสร้างผ่านฟังก์ชันจะได้ชื่อตัวแปรแทน
export const Overview: Story = { name: 'ภาพรวม', args: { data, name: '11 Avatar Documentation', logos, samples } }
export const AvatarGuide: Story = { name: 'Avatar Guide', args: { data, name: 'Avatar Guide', logos, samples } }
export const AvatarComponents: Story = { name: 'Avatar Components', args: { data, name: 'Avatar Components', logos, samples } }
export const AvatarSpace: Story = { name: 'Avatar Space', args: { data, name: 'Avatar Space', logos, samples } }
