import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag, type TagFamily } from './Tag'

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  args: { children: 'การเมือง', family: 'blue', hierarchy: 'primary', size: 'md' },
}
export default meta

type Story = StoryObj<typeof Tag>

export const Default: Story = {}
export const Secondary: Story = { args: { hierarchy: 'secondary' } }
export const Pill: Story = { args: { shape: 'pill' } }
export const LinkStyle: Story = { args: { shape: 'link', children: '#เศรษฐกิจ' } }
export const Closable: Story = { args: { closable: true } }
export const WithLeftIcon: Story = { args: { leftIcon: 'star' } }
export const WithNumber: Story = { args: { leading: 'number', count: 12, children: 'แจ้งเตือน' } }
export const IconOnly: Story = {
  args: { children: undefined, iconOnly: true, icon: 'close', label: 'ปิด' },
}

const FAMILIES: TagFamily[] = [
  'brand', 'neutral', 'red', 'green', 'yellow', 'cyan', 'blue', 'purple', 'pink', 'bamboo', 'brown',
]

export const AllFamilies: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {FAMILIES.map((family) => (
        <Tag key={family} family={family}>
          {family}
        </Tag>
      ))}
    </div>
  ),
}
