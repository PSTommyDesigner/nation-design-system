import { Avatar, AvatarGroup, AvatarLabel, type AvatarGroupSize, type AvatarLabelSize, type AvatarSize } from '../../components/Avatar'
import { IconButton } from '../../components/IconButton'
import type { SampleRenderer } from '../../foundations/shared/AtomDoc'

// ตารางแปลงชุดอวาตาร์ในไฟล์ออกแบบ (หน้า 11 Avatar) เป็น component จริงในโค้ด ค่าที่รับมาคือค่าของชิ้นงานใน Figma
// ⚠️ state=hover วาดเป็นภาพนิ่งไม่ได้ component เปลี่ยนหน้าตาตอนเอาเมาส์วางเท่านั้น (interactive) จึงเปิด interactive ให้ลองวางเมาส์ได้
// ⚠️ ชื่อและรูปที่แสดงเป็นค่าตัวอย่างจากไฟล์ออกแบบ ภาพแทนรูปคือ image fill ของ avatar-image ที่สคริปต์ export ไว้ใน assets/
// ⚠️ _avatar-online-indicator ไม่มี component เดี่ยวในโค้ด จุดสถานะอยู่ใน Avatar (status) จึงไม่ใส่ในตาราง หน้าเอกสารจะแสดงข้อความแทน

const on = (v: string | boolean | undefined) => v === true || v === 'true'
const num = (v: string | boolean | undefined) => Number.parseInt(String(v ?? ''), 10)

const single = (kind: 'image' | 'icon' | 'monogram' | 'number'): SampleRenderer => (p, image) => (
  <Avatar
    size={p.size as AvatarSize}
    status={on(p['online-indicator']) ? 'online' : undefined}
    interactive={p.state === 'hover'}
    src={kind === 'image' ? image : undefined}
    alt={kind === 'image' ? 'รูปตัวอย่าง' : undefined}
    initials={kind === 'monogram' ? String(p['text-value'] ?? '') : undefined}
    count={kind === 'number' ? num(p['text-value']) : undefined}
  />
)

export const avatarSamples: Record<string, SampleRenderer> = {
  'avatar-image': single('image'),
  'avatar-icon': single('icon'),
  'avatar-monogram': single('monogram'),
  'avatar-number': single('number'),
  'avatar-label': (p) => (
    <AvatarLabel
      size={p.size as AvatarLabelSize}
      avatar={on(p.avatar) ? <Avatar size={p.size as AvatarSize} status={p['status-icon'] === 'online-indicator' ? 'online' : undefined} /> : null}
      title={String(p.name ?? '')}
      supportingText={on(p['show-email']) ? String(p.email ?? '') : undefined}
      // AvatarLabel ไม่มี prop interactive สไตล์ hover ของแถวผูกกับ data-interactive
      data-interactive={p.state === 'hover' ? 'true' : undefined}
    />
  ),
  // ในไฟล์ออกแบบกลุ่มแสดงหน้าคน 5 คนเสมอ more-users เปิดช่องตัวเลข 99+ และ add-user-button เปิดปุ่มเพิ่มคน
  // ปุ่มเพิ่มคนคือ circular-icon-button ตระกูล Neutral ระดับ Tertiary ไอคอน add ตามไฟล์ออกแบบ
  'avatar-group': (p) => {
    const size = p.size as AvatarGroupSize
    return (
      <AvatarGroup
        size={size}
        aria-label="กลุ่มตัวอย่าง"
        // ช่อง 99+ ส่งเข้าไปเป็นลูกตัวที่ 6 ตรง ๆ ตามไฟล์ออกแบบ จึงตั้งเพดานเป็น 6 ไม่ให้กลุ่มตัดแล้วนับเป็น 1+
        max={6}
        action={on(p['add-user-button']) ? <IconButton icon="add" label="เพิ่มคน" shape="circular" family="neutral" hierarchy="tertiary" size={size} /> : undefined}
      >
        {[1, 2, 3, 4, 5].map(i => <Avatar key={i} size={size} />)}
        {on(p['more-users']) ? <Avatar size={size} count={99} countLabel="อีก 99 คน" /> : null}
      </AvatarGroup>
    )
  },
}
