import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar, AvatarGroup, AvatarLabel } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Avatar>

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=12',
    alt: 'รูปโปรไฟล์ของผู้ใช้',
    size: 'md',
  },
}

export const Initials: Story = {
  args: { name: 'ทอมมี่ ดีไซเนอร์', size: 'md' },
}

export const WithStatus: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=5',
    alt: 'รูปโปรไฟล์ของผู้ใช้',
    status: 'online',
    statusLabel: 'ออนไลน์อยู่',
    size: 'md',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Avatar key={size} name="Nation" size={size} />
      ))}
    </div>
  ),
}

export const Group: Story = {
  render: () => (
    <AvatarGroup size="md" max={4}>
      <Avatar src="https://i.pravatar.cc/150?img=1" alt="ผู้ใช้ 1" />
      <Avatar src="https://i.pravatar.cc/150?img=2" alt="ผู้ใช้ 2" />
      <Avatar src="https://i.pravatar.cc/150?img=3" alt="ผู้ใช้ 3" />
      <Avatar name="กข" />
      <Avatar name="คง" />
    </AvatarGroup>
  ),
}

export const Label: Story = {
  render: () => (
    <AvatarLabel
      size="md"
      avatar={<Avatar src="https://i.pravatar.cc/150?img=8" alt="ผู้เขียนข่าว" />}
      title="สมชาย ใจดี"
      supportingText="somchai@nationgroup.com"
    />
  ),
}
