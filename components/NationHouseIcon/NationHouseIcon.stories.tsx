import type { Meta, StoryObj } from '@storybook/react-vite'
import { NationHouseIcon } from './NationHouseIcon'
import { nationHouseIconNames } from './icons'

const meta: Meta<typeof NationHouseIcon> = {
  title: 'Components/NationHouseIcon',
  component: NationHouseIcon,
  tags: ['autodocs'],
  args: { name: nationHouseIconNames[0], size: 'md', title: 'ไอคอนตระกูล Nation House' },
}
export default meta

type Story = StoryObj<typeof NationHouseIcon>

export const Default: Story = {}
export const Filled: Story = { args: { filled: true } }

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
      {nationHouseIconNames.slice(0, 60).map((name) => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <NationHouseIcon name={name} size="md" />
          <span style={{ fontSize: 10, textAlign: 'center', wordBreak: 'break-word' }}>{name}</span>
        </div>
      ))}
    </div>
  ),
}
