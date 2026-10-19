import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs, type TabItem } from './Tabs'

const ITEMS: TabItem[] = [
  { id: 'latest', label: 'ล่าสุด' },
  { id: 'popular', label: 'ยอดนิยม' },
  { id: 'saved', label: 'บันทึกไว้', unread: true },
]

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Tabs>

export const Segmented: Story = {
  render: function Render() {
    const [value, setValue] = useState('latest')
    return <Tabs items={ITEMS} value={value} onValueChange={setValue} shape="segmented" label="หมวดข่าว" />
  },
}

export const Underline: Story = {
  render: function Render() {
    const [value, setValue] = useState('latest')
    return <Tabs items={ITEMS} value={value} onValueChange={setValue} shape="underline" label="หมวดข่าว" />
  },
}

export const WithIcons: Story = {
  render: function Render() {
    const [value, setValue] = useState('latest')
    const items: TabItem[] = [
      { id: 'latest', label: 'ล่าสุด', icon: 'star' },
      { id: 'popular', label: 'ยอดนิยม', icon: 'check' },
    ]
    return <Tabs items={items} value={value} onValueChange={setValue} label="หมวดข่าว" />
  },
}
