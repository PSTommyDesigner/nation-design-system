import type { Meta, StoryObj } from '@storybook/react-vite'
import { TextField } from '../../components/TextField'
import { Checkbox } from '../../components/Checkbox'
import { Button } from '../../components/Button'
import { LinkButton } from '../../components/LinkButton'
import '../../tokens/output/css/typography.css'
import styles from './Login.module.css'

// อ่านโลโก้เป็น URL ผ่าน import.meta.url ตัวรวมโค้ดของ Storybook (Vite) จะคัดลอกไฟล์ไปให้เอง
const brandLogo = new URL('./assets/bangkokbiznews-logo.svg', import.meta.url).href

// หน้า Login ของ One CMS จาก Figma CMS เฟรม 12967:4778
// ตัดสินกับผู้ใช้ 2026-10-28: ช่องกรอกใช้ TextField แบบมีกรอบ (ชุดเส้นใต้ถูกลบจากระบบแล้ว)
// หัวข้อใช้ page-heading-lg ลืมรหัสผ่านเป็น LinkButton เพราะพาไปอีกหน้า
// ในแบบเป็นแบรนด์ tnews แต่ prototype ใช้กรุงเทพธุรกิจ (bkk) โลโก้คือ bangkokbiznews-fixed-height จากหน้า 08 Logo
function LoginPage() {
  return (
    <main className={styles.page}>
      <form className={styles.form} onSubmit={e => e.preventDefault()}>
        <img className={styles.logo} src={brandLogo} alt="กรุงเทพธุรกิจ" />
        <h1 className={`${styles.title} ntg-typography-page-heading-lg`}>เข้าสู่ระบบ</h1>
        <div className={styles.fields}>
          <TextField label="ชื่อผู้ใช้" placeholder="ชื่อผู้ใช้" autoComplete="username" />
          <TextField label="รหัสผ่าน" placeholder="รหัสผ่าน" type="password" autoComplete="current-password" />
          <Checkbox size="sm" label="จำรหัสผ่าน" />
        </div>
        <div className={styles.actions}>
          <Button type="submit" family="brand" hierarchy="primary" size="lg">เข้าสู่ระบบ</Button>
          <LinkButton href="#" family="brand" size="lg">ลืมรหัสผ่าน ?</LinkButton>
        </div>
      </form>
    </main>
  )
}

const meta: Meta<typeof LoginPage> = {
  title: 'Prototype/One CMS/Login',
  component: LoginPage,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof LoginPage>

export const Default: Story = { name: 'Login' }
