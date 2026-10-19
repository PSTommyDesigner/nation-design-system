import type { Meta, StoryObj } from '@storybook/react-vite'
import { Table, type TableColumn } from './Table'

interface Row {
  id: string
  title: string
  category: string
  views: number
  published: boolean
}

const ROWS: Row[] = [
  { id: '1', title: 'ข่าวเศรษฐกิจวันนี้', category: 'เศรษฐกิจ', views: 1200, published: true },
  { id: '2', title: 'อัปเดตสถานการณ์การเมือง', category: 'การเมือง', views: 850, published: true },
  { id: '3', title: 'ข่าวกีฬารอบโลก', category: 'กีฬา', views: 430, published: false },
]

const COLUMNS: TableColumn<Row>[] = [
  { id: 'title', header: 'พาดหัว', accessor: (r) => r.title },
  { id: 'category', header: 'หมวด', accessor: (r) => r.category },
  { id: 'views', header: 'ยอดดู', accessor: (r) => r.views.toLocaleString('th-TH'), variant: 'number' },
  {
    id: 'status',
    header: 'สถานะ',
    render: (r) => (r.published ? 'เผยแพร่แล้ว' : 'ร่าง'),
  },
]

const RowTable = Table<Row>

const meta: Meta<typeof RowTable> = {
  title: 'Components/Table',
  component: RowTable,
  tags: ['autodocs'],
  args: {
    columns: COLUMNS,
    data: ROWS,
    getRowId: (r: Row) => r.id,
    caption: 'ตารางข่าวตัวอย่าง',
  },
}
export default meta

type Story = StoryObj<typeof RowTable>

export const Default: Story = {}
export const Zebra: Story = { args: { zebra: true } }
export const Selectable: Story = { args: { selectable: true, selectAllLabel: 'เลือกทั้งหมด' } }
export const StickyHeader: Story = { args: { stickyHeader: true } }
