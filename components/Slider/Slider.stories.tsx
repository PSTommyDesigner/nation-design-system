import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Slider, type SliderSize, type SliderValue } from './Slider'
import { Preview, Labeled, DoDont, Do, Dont } from '../../.storybook/docs-blocks'

const Demo = (props: Partial<React.ComponentProps<typeof Slider>>) => {
  const [value, setValue] = useState<SliderValue>(props.value ?? 40)
  return <div style={{ width: 320 }}><Slider label="ระดับเสียง" {...props} value={value} onValueChange={setValue} /></div>
}

// ชื่อนี้ใช้ในกล่องโค้ดของหน้า Docs (ไม่งั้นโชว์ชื่อที่ถูกย่อตอน build เช่น <B>)
Demo.displayName = 'Slider'

// หน้า Docs จัดกลุ่ม story ตาม parameters.docs.section ดูกติกาที่ .storybook/CustomDocsPage.tsx
// ชื่อ story ใน sidebar ตรงกับชุดในไฟล์ออกแบบหน้า 17 (slider, range-slider) ปุ่มจับเป็นชุดฐาน slider-handle
const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  args: { size: 'md', min: 0, max: 100, step: 1, showValueTooltip: false, showMinMaxLabel: false, disabled: false },
  render: (args) => <Demo {...args} />,
}
export default meta

type Story = StoryObj<typeof Slider>

const controls = (include: string[]) => ({ controls: { include } })
const SLIDER = ['size', 'min', 'max', 'step', 'showValueTooltip', 'showMinMaxLabel', 'disabled', 'touchTarget']

export const Default: Story = { name: 'Slider', parameters: controls(SLIDER) }

// ── ส่วนประกอบ ──────────────────────────────────────────────
export const Anatomy: Story = {
  tags: ['!dev'],
  name: 'ส่วนประกอบทั้งหมด',
  args: { showValueTooltip: true, showMinMaxLabel: true, value: 60 },
  parameters: { docs: { section: 'ส่วนประกอบ', description: { story: 'แถบเลื่อนประกอบด้วย ราง ช่วงที่เติม ปุ่มจับ (ต้องมีเสมอ) ป้ายค่าเหนือปุ่มจับ (showValueTooltip) และป้ายค่าต่ำสุดสูงสุดใต้ราง (showMinMaxLabel)' } } },
}

// ── ชุด ─────────────────────────────────────────────────────
export const AllTypes: Story = {
  tags: ['!dev'],
  name: '2 ชุด',
  parameters: { docs: { section: 'ชุด', description: { story: 'slider มีปุ่มจับเดียวเลือกค่าเดียว range-slider มีสองปุ่มเลือกช่วง ส่งค่าเป็นตัวเลขหรือคู่ตัวเลขเท่ากับเลือกชุด' } } },
  render: () => (
    <Preview column>
      <Labeled label="slider"><Demo value={40} /></Labeled>
      <Labeled label="range-slider"><Demo value={[20, 70]} label="ช่วงราคา" showMinMaxLabel /></Labeled>
    </Preview>
  ),
}

// ── ขนาด ────────────────────────────────────────────────────
const SIZES: SliderSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
export const Sizes: Story = {
  tags: ['!dev'],
  name: 'ขนาด 5 ขั้น',
  parameters: { docs: { section: 'ขนาด', description: { story: 'รางหนา 4 ถึง 12 ปุ่มจับ 16 ถึง 32 แถวสูง 24 ถึง 56 ตามสูตรใน tokens/scale/slider.mjs' } } },
  render: () => (
    <Preview column>
      {SIZES.map((size) => (
        <Labeled key={size} label={size}><Demo size={size} value={40} /></Labeled>
      ))}
    </Preview>
  ),
}

// ── สถานะ ───────────────────────────────────────────────────
export const States: Story = {
  tags: ['!dev'],
  name: 'ปกติ และ disabled',
  parameters: { docs: { section: 'สถานะ', description: { story: 'ปุ่มจับมี hover กด และโฟกัส ซึ่งเกิดจากการใช้งานจริง ลองลากหรือกด Tab แล้วใช้ลูกศร disabled ทำให้รางกับปุ่มจับเป็นสีเทาและลากไม่ได้' } } },
  render: () => (
    <Preview column>
      <Labeled label="ปกติ"><Demo value={40} /></Labeled>
      <Labeled label="disabled"><div style={{ width: 320 }}><Slider label="ปิดใช้งาน" value={30} disabled /></div></Labeled>
    </Preview>
  ),
}

// ── ควรไม่ควร ───────────────────────────────────────────────
export const GoodAndBad: Story = {
  tags: ['!dev'],
  name: 'ควรและไม่ควร',
  parameters: { docs: { section: 'ควรไม่ควร', hideCode: true } },
  render: () => (
    <DoDont>
      <Do text="ใช้กับค่าต่อเนื่องที่ความแม่นยำไม่สำคัญ เช่น ระดับเสียง ความสว่าง และโชว์ค่าปัจจุบัน">
        <Demo value={60} showValueTooltip label="ความสว่าง" />
      </Do>
      <Dont text="ใช้กับค่าที่ต้องกรอกเป๊ะ เช่น จำนวนเงิน แบบนั้นควรเป็นช่องกรอกตัวเลข">
        <Demo value={1250} min={0} max={100000} label="จำนวนเงิน" />
      </Dont>
    </DoDont>
  ),
}

// ── ชุดจริงจากไฟล์ออกแบบ (เมนู sidebar) ────────────────────
export const RangeSlider: Story = { tags: ['!autodocs'], name: 'Range-slider', args: { value: [20, 70], label: 'ช่วงราคา', showMinMaxLabel: true }, parameters: controls(SLIDER) }
