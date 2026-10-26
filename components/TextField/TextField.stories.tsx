import type { Meta, StoryObj } from '@storybook/react-vite'
import { TextField, type TextFieldSize } from './TextField'
import { Preview, Labeled, DoDont, Do, Dont } from '../../.storybook/docs-blocks'

// หน้า Docs จัดกลุ่ม story ตาม parameters.docs.section ดูกติกาที่ .storybook/CustomDocsPage.tsx
// ชื่อ story ใน sidebar ตรงกับชุดในไฟล์ออกแบบหน้า 13 (text-field, text-area) ส่วน tag-field ยังไม่มีโค้ด
const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: { label: 'อีเมล', hint: 'ใช้สำหรับเข้าสู่ระบบ', placeholder: 'name@example.com', size: 'md' },
}
export default meta

type Story = StoryObj<typeof TextField>

const controls = (include: string[]) => ({ controls: { include } })
const TEXT_FIELD = ['label', 'hint', 'placeholder', 'size', 'required', 'error', 'disabled', 'readOnly', 'leadingIcon', 'trailingIcon', 'leadingDivider', 'trailingDivider']
const TEXT_AREA = ['label', 'hint', 'placeholder', 'size', 'required', 'error', 'disabled', 'readOnly', 'rows']

export const Default: Story = { name: 'Text-field', parameters: controls(TEXT_FIELD) }

// ── ส่วนประกอบ ──────────────────────────────────────────────
export const Anatomy: Story = {
  tags: ['!dev'],
  name: 'ส่วนประกอบทั้งหมด',
  args: { required: true, leadingIcon: 'search', trailingIcon: 'close', leadingDivider: true, trailingDivider: true },
  parameters: { docs: { section: 'ส่วนประกอบ', description: { story: 'ช่องกรอกประกอบด้วย ป้ายชื่อ (label) กับดอกจันบังคับกรอก (required) กล่องกรอกที่มีไอคอนนำ/ตามและเส้นคั่น และข้อความช่วย (hint) ใต้กล่อง กล่องเป็นส่วนที่ต้องมีเสมอ ส่วนอื่นใส่หรือไม่ใส่ก็ได้' } } },
}
export const WithIcons: Story = {
  tags: ['!dev'],
  name: 'ไอคอนนำหน้าและตามหลัง',
  args: { leadingIcon: 'search', trailingIcon: 'close', label: 'ค้นหา', hint: undefined },
  parameters: { docs: { section: 'ส่วนประกอบ' } },
}
export const WithDividers: Story = {
  tags: ['!dev'],
  name: 'เส้นคั่นระหว่างไอคอนกับข้อความ',
  args: { leadingIcon: 'search', leadingDivider: true, label: 'ค้นหา', hint: undefined },
  parameters: { docs: { section: 'ส่วนประกอบ' } },
}

// ── ชุด ─────────────────────────────────────────────────────
export const AllTypes: Story = {
  tags: ['!dev'],
  name: '2 ชุด',
  parameters: { docs: { section: 'ชุด', description: { story: 'ไฟล์ออกแบบมี text-field (บรรทัดเดียว 24 แบบ) และ text-area (หลายบรรทัด 24 แบบ) ฝั่งโค้ดเป็น component เดียว เปิดหลายบรรทัดด้วย multiline ส่วน tag-field ของหน้า 13 ยังไม่มีฝั่งโค้ด' } } },
  render: () => (
    <Preview>
      <Labeled label="text-field"><TextField label="อีเมล" placeholder="name@example.com" /></Labeled>
      <Labeled label="text-area"><TextField label="ความคิดเห็น" placeholder="พิมพ์ความคิดเห็น" multiline rows={3} /></Labeled>
    </Preview>
  ),
}

// ── ขนาด ────────────────────────────────────────────────────
const SIZES: TextFieldSize[] = ['sm', 'md', 'lg']
export const Sizes: Story = {
  tags: ['!dev'],
  name: 'ขนาด 3 ขั้น',
  parameters: { docs: { section: 'ขนาด', description: { story: 'กล่องสูง 32 40 48 ตามสเกลความสูงตัวควบคุมกลาง ระยะขอบซ้ายขวา 10 12 14 ไอคอน 18 20 22 ตามสูตรใน tokens/scale/input.mjs ตัวอักษรใช้ body/sm (ป้ายชื่อ ข้อความช่วย) กับ body/md (ข้อความในกล่อง) ทุกขนาดตามไฟล์ออกแบบ' } } },
  render: () => (
    <Preview>
      {SIZES.map((size) => (
        <Labeled key={size} label={size}><TextField size={size} label="อีเมล" placeholder="name@example.com" leadingIcon="search" /></Labeled>
      ))}
    </Preview>
  ),
}

// ── สถานะ ───────────────────────────────────────────────────
export const States: Story = {
  tags: ['!dev'],
  name: 'ปกติ ผิดพลาด อ่านอย่างเดียว และ disabled',
  parameters: { docs: { section: 'สถานะ', description: { story: 'ไฟล์ออกแบบมี 8 สถานะ hover focused error-hover error-focused เกิดจากการใช้งานจริง ลองเอาเมาส์ชี้หรือคลิกที่ตัวอย่าง ป้ายชื่อเปลี่ยนสีตามสถานะด้วย (โฟกัสเป็นสีแบรนด์ ผิดพลาดเป็นสีแดง)' } } },
  render: () => (
    <Preview>
      <Labeled label="ปกติ"><TextField label="อีเมล" placeholder="name@example.com" /></Labeled>
      <Labeled label="ผิดพลาด"><TextField label="อีเมล" defaultValue="name@" error hint="กรุณากรอกอีเมลให้ถูกต้อง" /></Labeled>
      <Labeled label="อ่านอย่างเดียว"><TextField label="อีเมล" defaultValue="name@example.com" readOnly /></Labeled>
      <Labeled label="disabled"><TextField label="อีเมล" placeholder="name@example.com" disabled /></Labeled>
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
      <Do text="มีป้ายชื่อเสมอ และใช้ placeholder เป็นตัวอย่างค่า ไม่ใช่ชื่อช่อง">
        <TextField label="เบอร์โทรศัพท์" placeholder="08x xxx xxxx" />
      </Do>
      <Dont text="ใช้ placeholder แทนป้ายชื่อ พอพิมพ์แล้วชื่อช่องหายไป">
        <TextField placeholder="เบอร์โทรศัพท์" aria-label="เบอร์โทรศัพท์" />
      </Dont>
      <Do text="ข้อความผิดพลาดบอกว่าต้องแก้อย่างไร ไม่ใช่แค่บอกว่าผิด">
        <TextField label="รหัสผ่าน" type="password" defaultValue="1234" error hint="ต้องยาวอย่างน้อย 8 ตัว" />
      </Do>
      <Dont text="ใช้ read-only กับค่าที่ผู้ใช้แก้ได้ หรือใช้ disabled กับข้อมูลที่ผู้ใช้ต้องรู้ (โปรแกรมอ่านหน้าจอจะข้าม disabled)">
        <TextField label="อีเมลที่สมัครไว้" defaultValue="name@example.com" disabled />
      </Dont>
    </DoDont>
  ),
}

// ── ชุดจริงจากไฟล์ออกแบบ (เมนู sidebar) ────────────────────
export const TextArea: Story = { tags: ['!autodocs'], name: 'Text-area', args: { multiline: true, rows: 4, label: 'ความคิดเห็น', placeholder: 'พิมพ์ความคิดเห็น', hint: 'ไม่เกิน 500 ตัวอักษร' }, parameters: controls(TEXT_AREA) }
