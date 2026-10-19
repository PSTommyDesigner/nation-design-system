import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Slider, type SliderValue } from './Slider'

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Slider>

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState<SliderValue>(40)
    return <Slider label="ระดับเสียง" value={value} onValueChange={setValue} size="md" />
  },
}

export const WithTooltip: Story = {
  render: function Render() {
    const [value, setValue] = useState<SliderValue>(60)
    return (
      <Slider
        label="ความสว่าง"
        value={value}
        onValueChange={setValue}
        showValueTooltip
        showMinMaxLabel
      />
    )
  },
}

export const Disabled: Story = {
  render: () => <Slider label="ปิดใช้งาน" value={30} disabled />,
}

export const Range: Story = {
  render: function Render() {
    const [value, setValue] = useState<readonly [number, number]>([20, 70])
    return (
      <Slider
        label="ช่วงราคา"
        value={value}
        onValueChange={(v) => setValue(v as readonly [number, number])}
        showMinMaxLabel
      />
    )
  },
}
