import { Button, type ButtonFamily, type ButtonHierarchy, type ButtonSize } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { LinkButton, type LinkButtonFamily } from '../../components/LinkButton'
import type { IconName } from '../../components/Icon'
import type { SampleRenderer } from '../../foundations/shared/AtomDoc'

// ตารางแปลงชุดปุ่มในไฟล์ออกแบบ (หน้า 12 Buttons) เป็น component จริงในโค้ด ค่าที่รับมาคือค่าของชิ้นงานใน Figma
// ตระกูล (family) สคริปต์อ่านจากเอกสารที่ชุดนั้นอยู่ เพราะชุดใช้ชื่อเดียวกันทุกตระกูล ชื่อไอคอนสคริปต์แปลงจากรหัสชิ้นงานแล้ว
// ⚠️ state=hover กับ focused วาดเป็นภาพนิ่งไม่ได้ ปุ่มใช้ :hover กับ :focus-visible ของเบราว์เซอร์ จึงดูเหมือน default จนกว่าจะวางเมาส์หรือกด Tab
//    state=disabled ส่งเป็น disabled จริง จึงตรงแบบ
// ⚠️ Alpha ไม่มีแกน hierarchy ในไฟล์ออกแบบ จึงไม่ส่ง hierarchy ให้ component ใช้ค่าตั้งต้นของมันเอง

type P = Parameters<SampleRenderer>[0]
const on = (v: P[string] | undefined) => v === true || v === 'true'
const str = (v: P[string] | undefined) => (typeof v === 'string' ? v : undefined)
const icon = (show: P[string] | undefined, name: P[string] | undefined) => (on(show) ? (str(name) as IconName | undefined) : undefined)

const common = (p: P) => ({
  family: str(p.family) as ButtonFamily | undefined,
  hierarchy: str(p.hierarchy) as ButtonHierarchy | undefined,
  size: str(p.size) as ButtonSize | undefined,
  defaultGray: on(p['default-gray']),
  disabled: p.state === 'disabled',
})

const button = (shape: 'semi-rounded' | 'pill'): SampleRenderer => p => (
  <Button {...common(p)} shape={shape} leftIcon={icon(p['L-icon'], p['swap-L-icon'])} rightIcon={icon(p['R-icon'], p['swap-R-icon'])}>
    {str(p.Title) ?? ''}
  </Button>
)

const iconButton = (shape: 'semi-rounded' | 'circular'): SampleRenderer => p => (
  <IconButton {...common(p)} shape={shape} icon={str(p['swap-icon']) as IconName} label={str(p['swap-icon']) ?? 'ปุ่มไอคอน'} />
)

const linkCommon = (p: P) => ({
  family: str(p.family) as LinkButtonFamily | undefined,
  size: str(p.size) as ButtonSize | undefined,
  defaultGray: on(p['default-gray']),
  disabled: p.state === 'disabled',
})

export const buttonSamples: Record<string, SampleRenderer> = {
  'semi-rounded-button': button('semi-rounded'),
  'pill-button': button('pill'),
  'semi-rounded-icon-button': iconButton('semi-rounded'),
  'circular-icon-button': iconButton('circular'),
  'link-button': p => (
    <LinkButton {...linkCommon(p)} leftIcon={icon(p['L Icon'], p['Swap L Icon'])} rightIcon={icon(p['R Icon'], p['Swap R Icon'])}>
      {str(p.Title) ?? ''}
    </LinkButton>
  ),
  'link-icon-button': p => <LinkButton {...linkCommon(p)} leftIcon={str(p['swap-icon']) as IconName} label={str(p['swap-icon']) ?? 'ลิงก์'} />,
}
