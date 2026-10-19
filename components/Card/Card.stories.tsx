import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card } from './Card'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  args: {
    variant: 'vertical',
    size: 'md',
    src: 'https://picsum.photos/seed/nation/640/360',
    alt: '',
    category: 'การเมือง',
    title: 'พาดหัวข่าวตัวอย่างสำหรับทดสอบการ์ด',
    lead: 'ความนำสั้น ๆ อธิบายเนื้อหาข่าวเพิ่มเติมอีกหนึ่งถึงสองบรรทัด',
    meta: '5 นาทีที่แล้ว',
  },
}
export default meta

type Story = StoryObj<typeof Card>

export const Vertical: Story = {}
export const Horizontal: Story = { args: { variant: 'horizontal' } }
export const ListItem: Story = { args: { variant: 'list' } }
export const Linked: Story = { args: { href: '#', target: '_self' } }
