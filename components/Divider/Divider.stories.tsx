import type { Meta, StoryObj } from '@storybook/react-vite'
import { Divider } from './Divider'

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Divider>

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Divider orientation="horizontal" type="solid" />
    </div>
  ),
}

export const HorizontalDash: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Divider orientation="horizontal" type="dash" />
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', height: 48, alignItems: 'center', gap: 12 }}>
      <span>ซ้าย</span>
      <Divider orientation="vertical" type="solid" />
      <span>ขวา</span>
    </div>
  ),
}
