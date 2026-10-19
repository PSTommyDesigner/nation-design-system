import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toggle } from './Toggle'

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  args: { label: 'แจ้งเตือนทางอีเมล', size: 'md' },
}
export default meta

type Story = StoryObj<typeof Toggle>

export const Default: Story = {}
export const On: Story = { args: { defaultChecked: true } }
export const WithSupportingText: Story = {
  args: { supportingText: 'รับข่าวสารและโปรโมชันทางอีเมล' },
}
export const Disabled: Story = { args: { disabled: true } }
