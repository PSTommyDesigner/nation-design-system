import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge, type BadgeFamily } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: 'ด่วน', family: 'brand', hierarchy: 'primary', size: 'md' },
}
export default meta

type Story = StoryObj<typeof Badge>

export const Default: Story = {}

export const Secondary: Story = { args: { hierarchy: 'secondary' } }
export const Tertiary: Story = { args: { hierarchy: 'tertiary' } }
export const Pill: Story = { args: { shape: 'pill', hierarchy: 'secondary' } }
export const LinkStyle: Story = { args: { shape: 'link', children: 'อ่านต่อ', family: 'blue' } }
export const IconOnly: Story = {
  args: { children: undefined, icon: 'check', shape: 'circular', family: 'brand', label: 'ยืนยันแล้ว' },
}

const FAMILIES: BadgeFamily[] = [
  'brand', 'neutral', 'red', 'green', 'yellow', 'cyan', 'blue', 'purple', 'pink', 'bamboo', 'brown',
]

export const AllFamilies: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {FAMILIES.map((family) => (
        <Badge key={family} family={family} hierarchy="secondary">
          {family}
        </Badge>
      ))}
    </div>
  ),
}
