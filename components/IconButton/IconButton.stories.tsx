import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconButton } from './IconButton'

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: { icon: 'close', label: 'ปิด', family: 'brand', hierarchy: 'primary', size: 'md' },
}
export default meta

type Story = StoryObj<typeof IconButton>

export const Default: Story = {}
export const Secondary: Story = { args: { hierarchy: 'secondary' } }
export const Circular: Story = { args: { shape: 'circular' } }

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <IconButton key={size} icon="search" label={`ค้นหา ${size}`} size={size} />
      ))}
    </div>
  ),
}
