import type { Meta, StoryObj } from '@storybook/react-vite'
import { TextField } from './TextField'

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: { label: 'อีเมล', hint: 'ใช้สำหรับเข้าสู่ระบบ', size: 'md' },
}
export default meta

type Story = StoryObj<typeof TextField>

export const Default: Story = {}
export const Required: Story = { args: { required: true } }
export const ErrorState: Story = { args: { error: true, hint: 'กรุณากรอกอีเมลให้ถูกต้อง' } }
export const WithLeadingIcon: Story = { args: { leadingIcon: 'search', label: 'ค้นหา' } }
export const Multiline: Story = { args: { multiline: true, rows: 4, label: 'ความคิดเห็น' } }
