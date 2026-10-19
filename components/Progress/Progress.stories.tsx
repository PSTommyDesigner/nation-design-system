import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProgressBar } from './ProgressBar'
import { CircularProgressBar } from './CircularProgressBar'
import { SemiCircularProgressBar } from './SemiCircularProgressBar'

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  args: { label: 'ความคืบหน้าการอัปโหลด', value: 65, size: 'md' },
}
export default meta

type Story = StoryObj<typeof ProgressBar>

export const Default: Story = {}
export const Indeterminate: Story = { args: { value: undefined } }
export const WithoutLabel: Story = { args: { showLabel: false } }

export const Circular: StoryObj<typeof CircularProgressBar> = {
  render: () => <CircularProgressBar label="ความคืบหน้า" value={40} size="md" />,
}

export const SemiCircular: StoryObj<typeof SemiCircularProgressBar> = {
  render: () => <SemiCircularProgressBar label="คะแนนความพึงพอใจ" value={72} size="md" />,
}
