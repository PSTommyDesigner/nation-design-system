import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Pagination } from './Pagination'
import type { PaginationSize } from './types'
import { Preview, Labeled, DoDont, Do, Dont } from '../../.storybook/docs-blocks'

const Demo = (props: Partial<React.ComponentProps<typeof Pagination>> & { totalPages?: number; currentPage?: number }) => {
  const [page, setPage] = useState(props.currentPage ?? 4)
  return <Pagination label="ตัวแบ่งหน้า" {...props} currentPage={page} totalPages={props.totalPages ?? 12} onPageChange={setPage} />
}

// ชื่อนี้ใช้ในกล่องโค้ดของหน้า Docs (ไม่งั้นโชว์ชื่อที่ถูกย่อตอน build เช่น <B>)
Demo.displayName = 'Pagination'

// หน้า Docs จัดกลุ่ม story ตาม parameters.docs.section ดูกติกาที่ .storybook/CustomDocsPage.tsx
// ไฟล์ออกแบบหน้า 24 มีชุด pagination (5 ขนาด) ประกอบจากชุดฐาน _pagination-number-button กับ _pagination-ellipsis
const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  args: { size: 'md', siblingCount: 1, boundaryCount: 1 },
  render: (args) => <Demo {...args} />,
  parameters: {
    docs: {
      sectionNotes: {
        ชุด: 'ไฟล์ออกแบบมีชุดเดียวคือ pagination ปุ่มตัวเลขกับจุดไข่ปลาเป็นชุดฐานที่ประกอบอยู่ข้างใน ปุ่มก่อนหน้า/ถัดไปเป็น instance ของ semi-rounded-button Neutral secondary',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Pagination>

const controls = (include: string[]) => ({ controls: { include } })
const PAGINATION = ['size', 'siblingCount', 'boundaryCount', 'previousLabel', 'nextLabel']

export const Default: Story = { name: 'Pagination', parameters: controls(PAGINATION) }

// ── ส่วนประกอบ ──────────────────────────────────────────────
export const Anatomy: Story = {
  tags: ['!dev'],
  name: 'ส่วนประกอบทั้งหมด',
  parameters: { docs: { section: 'ส่วนประกอบ', description: { story: 'แถบแบ่งหน้าประกอบด้วย ปุ่มก่อนหน้า กลุ่มตัวเลขที่มีหน้าปัจจุบันและจุดไข่ปลาแทนหน้าที่ซ่อน และปุ่มถัดไป siblingCount คือจำนวนหน้าข้างหน้าปัจจุบัน boundaryCount คือจำนวนหน้าที่ขอบ' } } },
}
export const FewPages: Story = {
  tags: ['!dev'],
  name: 'หน้าน้อยไม่มีจุดไข่ปลา',
  args: { totalPages: 3, currentPage: 1 } as Partial<React.ComponentProps<typeof Pagination>>,
  parameters: { docs: { section: 'ส่วนประกอบ' } },
}

// ── ขนาด ────────────────────────────────────────────────────
const SIZES: PaginationSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
export const Sizes: Story = {
  tags: ['!dev'],
  name: 'ขนาด 5 ขั้น',
  parameters: { docs: { section: 'ขนาด', description: { story: 'ปุ่มสูง 24 ถึง 56 ตามสเกลความสูงตัวควบคุมกลาง ปุ่มก่อนหน้า/ถัดไปใช้ค่าของปุ่มขนาดเดียวกัน' } } },
  render: () => (
    <Preview column>
      {SIZES.map((size) => (
        <Labeled key={size} label={size}><Demo size={size} totalPages={8} currentPage={3} /></Labeled>
      ))}
    </Preview>
  ),
}

// ── สถานะ ───────────────────────────────────────────────────
export const States: Story = {
  tags: ['!dev'],
  name: 'หน้าปัจจุบัน สุดทาง และกดได้',
  parameters: { docs: { section: 'สถานะ', description: { story: 'หน้าปัจจุบันพื้นสีแบรนด์อ่อน (aria-current) ปุ่มก่อนหน้าปิดใช้เมื่ออยู่หน้าแรก ถัดไปปิดใช้เมื่ออยู่หน้าสุดท้าย hover กด และโฟกัสเกิดจากการใช้งานจริง' } } },
  render: () => (
    <Preview column>
      <Labeled label="หน้าแรก"><Demo totalPages={8} currentPage={1} /></Labeled>
      <Labeled label="หน้าสุดท้าย"><Demo totalPages={8} currentPage={8} /></Labeled>
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
      <Do text="ใช้กับรายการที่มีหลายหน้าและผู้ใช้ต้องกระโดดไปหน้าไกล ๆ ได้ (เช่น ผลค้นหา)">
        <Demo totalPages={12} currentPage={4} />
      </Do>
      <Dont text="ใช้กับฟีดข่าวที่อ่านต่อเนื่อง แบบนั้นควรโหลดเพิ่มหรือเลื่อนไม่รู้จบ">
        <Demo totalPages={200} currentPage={57} />
      </Dont>
      <Do text="ปิดใช้ปุ่มสุดทาง ไม่ซ่อน เพื่อให้แถบไม่กระโดดตำแหน่ง">
        <Demo totalPages={5} currentPage={1} />
      </Do>
    </DoDont>
  ),
}
