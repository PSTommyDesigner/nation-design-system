import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'ยืนยัน', family: 'brand', hierarchy: 'primary', size: 'md' },
}
export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {}
export const Secondary: Story = { args: { hierarchy: 'secondary' } }
export const Tertiary: Story = { args: { hierarchy: 'tertiary' } }
export const Pill: Story = { args: { shape: 'pill' } }
export const WithIcons: Story = { args: { leftIcon: 'add', rightIcon: 'chevron-right' } }
export const FullWidth: Story = { args: { fullWidth: true } }

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Button key={size} size={size}>
          ปุ่ม {size}
        </Button>
      ))}
    </div>
  ),
}
