import { useRef, useState, type ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Modal, type ModalProps, type ModalSize } from './Modal'
import { Button } from '../Button'
import { ToastStack, type ToastStackItem } from '../Toast'
import { Preview } from '../../.storybook/docs-blocks'

// หน้า Docs จัดกลุ่ม story ตาม parameters.docs.section ดูกติกาที่ .storybook/CustomDocsPage.tsx
// ไฟล์ออกแบบหน้า 30 มีชุด modal แกน size (sm md lg) กับ header (true false)
// ทุก story มีปุ่มเปิด กล่องเปิดด้วย showModal() จึงไม่แสดงค้างในหน้า Docs

type DemoProps = Omit<ModalProps, 'open' | 'onClose'> & { trigger?: string }

/** ปุ่มเปิดกับกล่อง ถือ state open ไว้ให้ ใช้ได้ทุก story */
function Demo({ trigger = 'เปิดกล่องโต้ตอบ', ...props }: DemoProps) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <>
      <Button family="neutral" hierarchy="secondary" onClick={() => setOpen(true)}>{trigger}</Button>
      <Modal {...(props as ModalProps)} open={open} onClose={close} />
    </>
  )
}

/** ปุ่มท้ายกล่องมาตรฐาน ยกเลิกอยู่ซ้าย การกระทำหลักอยู่ขวาสุด */
const Actions = ({ primary = 'บันทึก', danger = false }: { primary?: string; danger?: boolean }) => (
  <>
    <Button family="neutral" hierarchy="secondary">ยกเลิก</Button>
    <Button family={danger ? 'error' : 'brand'}>{primary}</Button>
  </>
)

const placeholderStyle = {
  aspectRatio: '16 / 9',
  background: 'var(--ntg-color-background-general-tertiary)',
  borderRadius: 'var(--ntg-modal-radius-top-left)',
}
const Paragraphs = ({ count }: { count: number }): ReactNode =>
  Array.from({ length: count }, (_, i) => (
    <p key={i} style={{ margin: 0, paddingBlockEnd: 'var(--ntg-size-space-s2-sm)' }}>
      ย่อหน้าที่ {i + 1} รายละเอียดของข่าวที่ยาวกว่าความสูงของจอ ส่วนเนื้อหาจะเลื่อนเองข้างในกล่อง ส่วนหัวกับส่วนท้ายอยู่กับที่ ปุ่มการกระทำจึงกดได้ตลอดโดยไม่ต้องเลื่อนลงไปหา
    </p>
  ))

const meta: Meta<typeof Demo> = {
  title: 'Organisms (Component)/30 Modal/Modal',
  component: Demo,
  tags: ['autodocs'],
  args: {
    size: 'md',
    title: 'แก้ไขรายละเอียดข่าว',
    description: 'การเปลี่ยนแปลงจะมีผลทันทีหลังบันทึก',
    showClose: true,
    closeOnBackdrop: true,
    closeLabel: 'ปิด',
    children: 'เนื้อหาของกล่องโต้ตอบ วางฟอร์มสั้นหรือรายละเอียดของรายการเดียวได้ที่นี่',
    footer: <Actions />,
  },
  parameters: {
    docs: {
      sectionNotes: {
        ชุด: 'ไฟล์ออกแบบมีชุดเดียวคือ modal (3 ขนาด x มีหัวหรือไม่มีหัว) ส่วน body กับ footer เป็น slot ใส่อะไรก็ได้',
        พฤติกรรม: 'กด Esc คลิกฉากหลัง หรือกดปุ่มปิด จะเรียก onClose แล้วโฟกัสกลับไปที่ปุ่มที่เปิดกล่อง หน้าข้างหลังเลื่อนไม่ได้ระหว่างเปิด',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Demo>

const controls = (include: string[]) => ({ controls: { include } })
const MODAL = ['size', 'title', 'description', 'showClose', 'closeLabel', 'closeOnBackdrop']

export const Default: Story = {
  name: 'Modal',
  parameters: { ...controls(MODAL), docs: { description: { story: 'ขนาด md มีหัว คำอธิบาย และปุ่มท้ายสองปุ่ม' } } },
}

// ── ขนาด ────────────────────────────────────────────────────
const SIZES: ModalSize[] = ['sm', 'md', 'lg']
export const Sizes: Story = {
  name: 'ขนาด 3 ขั้น',
  parameters: { docs: { section: 'ขนาด', description: { story: 'sm 392 (4 คอลัมน์) ยืนยันเรื่องเดียว md 600 (6 คอลัมน์) ค่าเริ่มต้น lg 808 (8 คอลัมน์) เนื้อหาหลายชิ้น ระยะขอบ 20 24 28 ตามสูตรใน tokens/scale/modal.mjs บนจอแคบกว่า 768 กล่องกว้างเต็มจอลบขอบข้างละ 16 และระยะขอบเหลือ 16' } } },
  render: (args) => (
    <Preview>
      {SIZES.map((size) => (
        <Demo key={size} {...args} size={size} trigger={`เปิดขนาด ${size}`} />
      ))}
    </Preview>
  ),
}

// ── โหมด bare ───────────────────────────────────────────────
export const WithoutHeader: Story = {
  name: 'ไม่มีหัว (bare)',
  render: () => (
    <Demo
      header={false}
      aria-label="ภาพข่าวและรายละเอียด"
      trigger="เปิดกล่องไม่มีหัว"
      footer={<Actions primary="อ่านต่อ" />}
    >
      <div style={placeholderStyle} />
      <p style={{ margin: 0, paddingBlockStart: 'var(--ntg-size-space-s2-sm)' }}>
        โหมด bare ซ่อนหัว ให้รูปเต็มความกว้างที่หัวเนื้อหา ปุ่มปิดวงกลมลอยมุมบนขวาทับรูป ต้องส่ง aria-label เพราะไม่มีหัวข้อให้เป็นชื่อของกล่อง
      </p>
    </Demo>
  ),
  parameters: { docs: { section: 'แบบ', description: { story: 'header={false} ปุ่มปิดเป็น IconButton alpha วงกลมขนาด sm ห่างจากขอบในของกล่อง 8' } } },
}

export const LongContent: Story = {
  name: 'เนื้อหายาว (เลื่อนได้)',
  args: { children: <Paragraphs count={30} />, title: 'ข้อตกลงการใช้งาน', description: undefined },
  parameters: { docs: { section: 'แบบ', description: { story: 'ความสูงหดตามเนื้อหาจนชนความสูงจอลบขอบ แล้วเฉพาะส่วนเนื้อหาเลื่อน หัวกับท้ายอยู่กับที่' } } },
}

export const WithoutFooter: Story = {
  name: 'ไม่มีส่วนท้าย',
  args: { footer: undefined, title: 'รายละเอียดผู้เขียน', description: undefined },
  parameters: { docs: { section: 'แบบ', description: { story: 'ไม่ส่ง footer = ปิด show-footer ใน Figma ใช้กับกล่องที่ดูอย่างเดียว ปิดด้วยปุ่มปิด Esc หรือคลิกฉากหลัง' } } },
}

export const Confirm: Story = {
  name: 'ยืนยัน (sm)',
  render: () => {
    const Inner = () => {
      const cancelRef = useRef<HTMLButtonElement>(null)
      const [open, setOpen] = useState(false)
      const close = () => setOpen(false)
      return (
        <>
          <Button family="error" hierarchy="secondary" onClick={() => setOpen(true)}>ลบข่าว</Button>
          <Modal
            open={open}
            onClose={close}
            size="sm"
            title="ลบข่าวนี้"
            description="ลบแล้วกู้คืนไม่ได้"
            initialFocusRef={cancelRef}
            footer={
              <>
                <Button ref={cancelRef} family="neutral" hierarchy="secondary" onClick={close}>ยกเลิก</Button>
                <Button family="error" onClick={close}>ลบ</Button>
              </>
            }
          />
        </>
      )
    }
    return <Inner />
  },
  parameters: { docs: { section: 'แบบ', description: { story: 'กล่องยืนยันขนาด sm โฟกัสแรกอยู่ที่ยกเลิก (initialFocusRef) เพื่อกัน Enter ลบโดยไม่ตั้งใจ ซ้อนบนกล่องอื่นได้แค่ใบเดียว' } } },
}

export const ToastOverModal: Story = {
  name: 'ข้อความแจ้งเหนือกล่อง',
  render: () => {
    const Inner = () => {
      const [open, setOpen] = useState(false)
      const [toasts, setToasts] = useState<ToastStackItem[]>([])
      const save = () => setToasts((list) => [...list, { id: String(Date.now()), type: 'success', title: 'บันทึกแล้ว' }])
      return (
        <>
          <Button family="neutral" hierarchy="secondary" onClick={() => setOpen(true)}>เปิดกล่องโต้ตอบ</Button>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            title="แก้ไขรายละเอียดข่าว"
            footer={<Button onClick={save}>บันทึก</Button>}
          >
            กดบันทึกแล้วข้อความแจ้งต้องลอยอยู่เหนือฉากหลังและเหนือกล่องนี้
          </Modal>
          <ToastStack items={toasts} onDismiss={(id) => setToasts((list) => list.filter((t) => t.id !== id))} />
        </>
      )
    }
    return <Inner />
  },
  parameters: { docs: { section: 'แบบ', description: { story: 'ToastStack เปิดเป็น popover ใน top layer และยกตัวขึ้นเหนือกล่องทุกครั้งที่กล่องเปิด (เหตุการณ์ ntg:modal-open) ข้อความแจ้งจึงไม่ถูกฉากหลังทับ' } } },
}
