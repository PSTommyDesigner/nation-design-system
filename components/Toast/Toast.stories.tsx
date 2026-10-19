import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toast } from './Toast'

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  args: {
    title: 'บันทึกข้อมูลสำเร็จ',
    description: 'ระบบบันทึกการเปลี่ยนแปลงของคุณแล้ว',
    type: 'success',
    size: 'md',
    showIcon: true,
    showDescription: true,
    showClose: true,
  },
}
export default meta

type Story = StoryObj<typeof Toast>

export const Default: Story = {}
export const Error: Story = { args: { type: 'error', title: 'เกิดข้อผิดพลาด' } }
export const Warning: Story = { args: { type: 'warning', title: 'กรุณาตรวจสอบข้อมูล' } }
export const WithAction: Story = {
  args: { showAction: true, action: { label: 'เลิกทำ', onClick: () => {} } },
}
