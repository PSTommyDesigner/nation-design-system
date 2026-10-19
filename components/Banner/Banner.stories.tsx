import type { Meta, StoryObj } from '@storybook/react-vite'
import { Banner } from './Banner'

const meta: Meta<typeof Banner> = {
  title: 'Components/Banner',
  component: Banner,
  tags: ['autodocs'],
  args: {
    title: 'ปรับปรุงระบบชั่วคราว',
    description: 'ระบบจะปิดปรับปรุงวันนี้เวลา 22:00 ถึง 23:00 น.',
    type: 'warning',
    level: 'page',
    size: 'md',
    showIcon: true,
    showDescription: true,
  },
}
export default meta

type Story = StoryObj<typeof Banner>

export const Default: Story = {}
export const Success: Story = { args: { type: 'success', title: 'บันทึกข้อมูลสำเร็จ' } }
export const Error: Story = { args: { type: 'error', title: 'เกิดข้อผิดพลาด กรุณาลองใหม่' } }
export const SectionLevel: Story = { args: { level: 'section' } }
export const WithAction: Story = {
  args: {
    showAction: true,
    action: { label: 'ดูรายละเอียด', onClick: () => {} },
  },
}
