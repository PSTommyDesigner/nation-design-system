import type { Meta, StoryObj } from '@storybook/react-vite'
import { Icon, iconNames } from './Icon'

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  args: { name: 'search', size: 'md', title: 'ค้นหา' },
}
export default meta

type Story = StoryObj<typeof Icon>

export const Default: Story = {}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <Icon key={size} name="star" size={size} />
      ))}
    </div>
  ),
}

export const Gallery: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))',
        gap: 12,
        maxWidth: 720,
      }}
    >
      {iconNames.slice(0, 60).map((name) => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <Icon name={name} size="md" />
          <span style={{ fontSize: 10, textAlign: 'center', wordBreak: 'break-word' }}>{name}</span>
        </div>
      ))}
    </div>
  ),
}
