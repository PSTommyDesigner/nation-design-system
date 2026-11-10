import { Card, type CardSize } from '../../components/Card'
import { Badge, type BadgeSize } from '../../components/Badge'
import { Icon } from '../../components/Icon'
import type { SampleRenderer } from '../../foundations/shared/AtomDoc'

// ตารางแปลงชุดการ์ดในไฟล์ออกแบบ (หน้า 25 Card) เป็น Card จริงในโค้ด มี 4 ชุดที่โค้ดรองรับ
//   vertical-news-card horizontal-news-card news-list-card video-list-card
// ค่าที่รับมาคือคุณสมบัติของชิ้นงานใน Figma ข้อความพาดหัวกับความนำมาจากคุณสมบัติข้อความของชุด
// ⚠️ ป้ายบนรูปใน Figma คือ pill-badge ตระกูล Brand ระดับ tertiary ข้อความเป็นชื่อขนาดการ์ด
//    ขนาดป้ายไล่ตามการ์ด xs ใช้ sm, sm ใช้ md, md ขึ้นไปใช้ lg ตามชิ้นงานต้นแบบ ซึ่งไม่มีคุณสมบัติให้แก้
// ⚠️ วันที่ 1 ม.ค. 2568 00:00 กับความยาวคลิป 00:00:00 เขียนตายตัวในชิ้นงานต้นแบบ จึงคัดลอกมา
// ⚠️ ปุ่มบนรูปของ video-list-card ใน Figma คือ pause จากชุด Material design(2) ที่เป็นชุดเก่า ใช้ pause ของชุด Nation UI แทน
// ⚠️ ชุดการ์ดอีก 9 ชุดกับชิ้นส่วนภายใน 4 ชุดยังไม่มีโค้ด หน้าเอกสารจะขึ้นข้อความแทน (ดูหัวไฟล์ components/Card/Card.tsx)
// ⚠️ State=Hover วาดเป็นภาพนิ่งไม่ได้ จึงส่ง href ให้การ์ดเป็นลิงก์ ลองวางเมาส์ได้

type P = Parameters<SampleRenderer>[0]
const str = (v: unknown) => (typeof v === 'string' ? v : undefined)
const DATE = '1 ม.ค. 2568 00:00'
const BADGE_SIZE: Record<CardSize, BadgeSize> = { xs: 'sm', sm: 'md', md: 'lg', lg: 'lg', xl: 'lg' }

const news = (variant: 'vertical' | 'horizontal'): SampleRenderer => (p: P, image?: string) => {
  const size = (str(p.Size) ?? 'md') as CardSize
  // แนวตั้งเรียกชั้นหมวดว่า Supheading แนวนอนเรียก Subheading ชื่อข้อความหมวดของแนวตั้งอยู่ในคุณสมบัติ Subheading
  const showCategory = variant === 'vertical' ? p.Supheading !== false : p.Subheading !== false
  const showTag = variant === 'horizontal' ? p['Tag on image'] !== false : true
  return (
    <Card
      variant={variant}
      size={size}
      src={image}
      alt=""
      tag={showTag ? <Badge family="brand" shape="pill" hierarchy="tertiary" size={BADGE_SIZE[size]}>{size.toUpperCase()}</Badge> : undefined}
      category={showCategory ? (variant === 'vertical' ? (str(p.Subheading) ?? 'Subheading') : 'Subheading') : undefined}
      title={p.Heading !== false ? (str(p['Heading value']) ?? '') : ''}
      // vertical-news-card ขนาด xs ใน Figma ไม่มีชั้นความนำ แม้คุณสมบัติ Supporting text จะเปิดอยู่
      lead={p['Supporting text'] !== false && !(variant === 'vertical' && size === 'xs') ? str(p['Supporting text value']) : undefined}
      // ชิ้นงานต้นแบบตัดพาดหัวกับความนำด้วยจุดไข่ปลาที่ 2 บรรทัด
      titleLines={2}
      leadLines={2}
    />
  )
}

const list = (video: boolean): SampleRenderer => (p: P, image?: string) => (
  <Card
    variant="list"
    src={image}
    alt=""
    href={p.State === 'Hover' ? '#' : undefined}
    imageTrailing={p['Image Trailing'] === 'True'}
    overlay={video && p.Play === 'True' ? <Icon name="pause" size="100%" /> : undefined}
    title={str(p['Headline Value']) ?? ''}
    meta={DATE}
    style={{ width: '100%' }}
  />
)

export const cardSamples: Record<string, SampleRenderer> = {
  'vertical-news-card': news('vertical'),
  'horizontal-news-card': news('horizontal'),
  'news-list-card': list(false),
  'video-list-card': list(true),
}
