import type { Meta, StoryObj } from '@storybook/react-vite'
import { Radio, RadioGroup } from './Radio'

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  args: { label: 'บัตรเครดิต', size: 'md' },
}
export default meta

type Story = StoryObj<typeof Radio>

export const Default: Story = {}
export const Checked: Story = { args: { defaultChecked: true } }
export const WithSupportingText: Story = {
  args: { supportingText: 'ชำระผ่านบัตรเครดิตหรือเดบิต' },
}
export const Disabled: Story = { args: { disabled: true } }

export const Group: Story = {
  render: () => (
    <RadioGroup label="วิธีชำระเงิน" name="payment" defaultValue="credit" size="md">
      <Radio value="credit" label="บัตรเครดิต" />
      <Radio value="transfer" label="โอนเงิน" />
      <Radio value="cod" label="เก็บเงินปลายทาง" />
    </RadioGroup>
  ),
}
