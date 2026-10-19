import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { label: 'ยอมรับข้อตกลงการใช้งาน', size: 'md' },
}
export default meta

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {}
export const Checked: Story = { args: { defaultChecked: true } }
export const Indeterminate: Story = { args: { indeterminate: true, label: 'เลือกบางส่วน' } }
export const WithSupportingText: Story = {
  args: { supportingText: 'จำเป็นต้องติ๊กก่อนสมัครสมาชิก' },
}
export const Disabled: Story = { args: { disabled: true } }
