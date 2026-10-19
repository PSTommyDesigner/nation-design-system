import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Pagination } from './Pagination'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  render: function Render() {
    const [page, setPage] = useState(4)
    return (
      <Pagination
        label="ตัวแบ่งหน้า"
        currentPage={page}
        totalPages={12}
        onPageChange={setPage}
        size="md"
      />
    )
  },
}

export const FewPages: Story = {
  render: function Render() {
    const [page, setPage] = useState(1)
    return <Pagination label="ตัวแบ่งหน้า" currentPage={page} totalPages={3} onPageChange={setPage} />
  },
}

export const AsLinks: Story = {
  render: function Render() {
    const [page, setPage] = useState(1)
    return (
      <Pagination
        label="ตัวแบ่งหน้าแบบลิงก์"
        currentPage={page}
        totalPages={8}
        href={(p) => `#page-${p}`}
        onPageChange={setPage}
      />
    )
  },
}
