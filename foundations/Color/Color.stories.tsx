import type { Meta, StoryObj } from '@storybook/react-vite'
import { AtomDoc } from '../shared/AtomDoc'
import data from './color-doc.json'
import '../../tokens/output/css/typography.css'

// หน้า 01 Color ในชั้น Atoms (Identity) หนึ่ง story ต่อเอกสารหนึ่งใบ เรียงซ้ายไปขวาเหมือนหน้า 01 Color ในไฟล์ออกแบบ
// เนื้อหาทั้งหมดมาจาก color-doc.json ถ้าไฟล์ออกแบบเปลี่ยน ให้รัน npm run figma:atom-doc -- color แล้ว story จะตามเอง
// ไม่มีหน้า Docs รวม (!autodocs) เพราะแต่ละเอกสารยาวพอเป็นหน้าของตัวเองแล้ว
const meta = {
  title: 'Atoms (Identity)/01 Color',
  component: AtomDoc,
  args: { data, name: '' },
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof AtomDoc>

export default meta
type Story = StoryObj<typeof meta>

// ชื่อในเมนูตั้งตรง ๆ ทีละตัว เพราะ Storybook อ่านชื่อ story จากโค้ดแบบไม่รัน ถ้าสร้างผ่านฟังก์ชันจะได้ชื่อตัวแปรแทน
export const Overview: Story = { name: 'ภาพรวม', args: { data, name: '01 Color Documentation' } }
export const ColorToken: Story = { name: 'Color Token', args: { data, name: 'Color Token' } }
export const ColorPalette: Story = { name: 'Color palette', args: { data, name: 'Color palette' } }
export const UsageDetail: Story = { name: 'Usage Detail', args: { data, name: 'Usage Detail' } }
export const Background: Story = { name: 'Background', args: { data, name: 'Background' } }
export const Text: Story = { name: 'Text', args: { data, name: 'Text' } }
export const Border: Story = { name: 'Border', args: { data, name: 'Border' } }
export const Foreground: Story = { name: 'Foreground', args: { data, name: 'Foreground' } }
export const IconColor: Story = { name: 'Icon', args: { data, name: 'Icon' } }
export const UtilityColor: Story = { name: 'Utility Color', args: { data, name: 'Utility Color' } }
export const BrandUtilityColor: Story = { name: 'Brand Utility Color', args: { data, name: 'Brand Utility Color' } }
export const AmsProject: Story = { name: 'AMS project', args: { data, name: 'AMS project' } }
export const InteractionStates: Story = { name: 'Interaction States', args: { data, name: 'Interaction States' } }
