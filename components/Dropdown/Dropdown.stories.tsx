import type { Meta, StoryObj } from '@storybook/react-vite'
import { Dropdown, type DropdownOption } from './Dropdown'

const OPTIONS: DropdownOption[] = [
  { value: 'bkk', label: 'กรุงเทพมหานคร' },
  { value: 'cnx', label: 'เชียงใหม่' },
  { value: 'hdy', label: 'หาดใหญ่' },
  { value: 'kkn', label: 'ขอนแก่น', disabled: true },
]

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  args: {
    options: OPTIONS,
    label: 'จังหวัด',
    placeholder: 'เลือกจังหวัด',
    size: 'md',
  },
}
export default meta

type Story = StoryObj<typeof Dropdown>

export const Default: Story = {}
export const WithHint: Story = { args: { hint: 'เลือกจังหวัดที่ต้องการแสดงข่าว' } }
export const Required: Story = { args: { required: true } }
export const ErrorState: Story = { args: { error: true, hint: 'กรุณาเลือกจังหวัด' } }
export const Disabled: Story = { args: { disabled: true } }
