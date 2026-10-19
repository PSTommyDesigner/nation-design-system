import type { Meta, StoryObj } from '@storybook/react-vite'
import { LinkButton } from './LinkButton'

const meta: Meta<typeof LinkButton> = {
  title: 'Components/LinkButton',
  component: LinkButton,
  tags: ['autodocs'],
  args: { children: 'อ่านข่าวทั้งหมด', family: 'brand', size: 'md' },
}
export default meta

type Story = StoryObj<typeof LinkButton>

export const AsButton: Story = {}
export const AsAnchor: Story = { args: { href: '#' } }
export const WithIcon: Story = { args: { rightIcon: 'arrow-right' } }
export const Neutral: Story = { args: { family: 'neutral' } }
export const Error: Story = { args: { family: 'error' } }
export const DefaultGray: Story = { args: { defaultGray: true } }
