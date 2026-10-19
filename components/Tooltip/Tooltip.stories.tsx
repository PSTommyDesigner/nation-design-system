import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tooltip } from './Tooltip'
import { IconButton } from '../IconButton'
import { Button } from '../Button'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Tooltip>

export const LabelForIconButton: Story = {
  render: () => (
    <Tooltip title="ตัวหนา" relationship="label">
      <IconButton icon="check" family="neutral" label="ตัวหนา" />
    </Tooltip>
  ),
}

export const DescriptionExtra: Story = {
  render: () => (
    <Tooltip
      title="เผยแพร่ทันที"
      description="ข่าวจะขึ้นหน้าแรกภายใน 1 นาที และแจ้งผู้ติดตามทุกคน"
      relationship="description"
    >
      <Button family="neutral">เผยแพร่</Button>
    </Tooltip>
  ),
}

export const InaccessibleDuplicate: Story = {
  render: () => (
    <Tooltip title="บันทึก" relationship="inaccessible">
      <Button family="neutral">บันทึก</Button>
    </Tooltip>
  ),
}

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, padding: 40 }}>
      {(['top', 'bottom', 'left', 'right'] as const).map((placement) => (
        <Tooltip key={placement} title={`ตำแหน่ง ${placement}`} relationship="label" placement={placement}>
          <IconButton icon="star" family="neutral" label={placement} />
        </Tooltip>
      ))}
    </div>
  ),
}
