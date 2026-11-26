import type { Meta, StoryObj } from '@storybook/react-vite'
import '../../tokens/output/css/typography.css'
import { Banner } from '../../components/Banner'

/**
 * ตัวอย่าง candidate กล่องตัวเลข (stat-card) ดูข้อเสนอเต็มที่ candidate.yaml ในโฟลเดอร์นี้
 *
 * สร้างจาก token --ntg- ล้วนเพื่อประกอบการตัดสินเท่านั้น ห้ามคัดลอกไปใช้ในงานจริง
 * และห้ามย้ายเข้า components/ จนกว่าทีม Design System จะรับและสร้างจริงผ่าน Figma
 *
 * ของที่ระบบยังไม่มีและต้องตัดสินตอนสร้างจริง (จดไว้ใน notes ของ candidate.yaml ด้วย)
 * - token มุมโค้งกลาง: ตัวอย่างยืมมุมโค้งของปุ่ม md แบบเดียวกับธีมหน้า Docs ใน .storybook/preview.tsx
 * - token ขนาดจุดสี: ตัวอย่างใช้ space token s1-lg (8) เป็นขนาดไปก่อน
 */

const StatCard = ({ label, value, unit }: { label: string; value: string; unit: string }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ntg-size-space-s1-sm)',
      padding: 'var(--ntg-size-space-s2-sm)',
      background: 'var(--ntg-color-background-general-primary)',
      border: 'var(--ntg-divider-thickness) solid var(--ntg-color-border-general-primary)',
      borderRadius: 'var(--ntg-button-radius-top-left-md)',
      flex: '1 1 0',
    }}
  >
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--ntg-size-space-s1-lg)' }}>
      <span
        aria-hidden="true"
        style={{
          width: 'var(--ntg-size-space-s1-lg)',
          height: 'var(--ntg-size-space-s1-lg)',
          borderRadius: 'var(--ntg-size-space-s1-lg)',
          background: 'var(--ntg-chart-color-series-1)',
        }}
      />
      <span className="ntg-typography-body-sm" style={{ color: 'var(--ntg-color-text-general-text)' }}>{label}</span>
    </div>
    <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: 'var(--ntg-size-space-s1-lg)' }}>
      <span className="ntg-typography-display-xs" style={{ color: 'var(--ntg-color-text-general-heading)' }}>{value}</span>
      <span className="ntg-typography-body-sm" style={{ color: 'var(--ntg-color-text-general-text)' }}>{unit}</span>
    </div>
  </div>
)

const meta: Meta = {
  title: 'Candidates/กล่องตัวเลข (stat-card)',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'ตัวอย่างประกอบข้อเสนอ candidate กล่องตัวเลข ที่ ATS และ One CMS สร้างเองซ้ำกันอยู่ ' +
          'รายละเอียดอยู่ใน candidates/stat-card/candidate.yaml และสถานะดูที่หน้าทะเบียน Candidate',
      },
    },
  },
}
export default meta

export const Example: StoryObj = {
  name: 'ตัวอย่าง',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ntg-size-space-s2-sm)' }}>
      <Banner
        type="warning"
        title="ตัวอย่างประกอบการตัดสิน ยังไม่ใช่ component ของระบบ"
        description="ห้ามคัดลอกไปใช้ในงานจริง สถานะล่าสุดดูที่หน้าทะเบียน Candidate"
      />
      <div style={{ display: 'flex', gap: 'var(--ntg-size-space-s2-sm)', flexWrap: 'wrap' }}>
        <StatCard label="ข่าวที่สร้าง" value="1,284" unit="ข่าว" />
        <StatCard label="ยอดวิว" value="86,420" unit="ครั้ง" />
        <StatCard label="แอปที่ขึ้นแล้ว" value="12" unit="แอป" />
      </div>
    </div>
  ),
}
