// worklog-path.mjs · ตัวเดียวที่รู้กติกาชื่อไฟล์และโฟลเดอร์ของ worklog
// สคริปต์อื่นต้อง import จากที่นี่ ห้ามคำนวณเอง (กันสูตรหลุดกันเหมือนที่เคยเจอกับค่ากลาง)
// กติกา: docs/daily-log/daily/<เดือนไทย ปีพ.ศ.>/W{สัปดาห์}-{Day}-{DD}-{MM}-{พ.ศ.}.md
//        สัปดาห์เริ่มนับ W1 ใหม่ทุกเดือน · W1 = สัปดาห์ (จันทร์เริ่ม) แรกของเดือนนั้น
import { join } from 'node:path'

export const ROOT = 'docs/daily-log'
const TH_MONTH = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน',
                  'กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม']
const DAY = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

const p2 = (n) => String(n).padStart(2, '0')

/** 'YYYY-MM-DD' → Date (เที่ยงวัน UTC กัน timezone เลื่อนวัน) */
function toDate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d, 12))
}

function mondayOf(dt) {
  const d = new Date(dt)
  const shift = (d.getUTCDay() + 6) % 7   // จันทร์ = 0
  d.setUTCDate(d.getUTCDate() - shift)
  return d
}

/** สัปดาห์ที่เท่าไหร่ของเดือน (เริ่มนับใหม่ทุกเดือน) */
export function weekOfMonth(iso) {
  const dt = toDate(iso)
  const first = new Date(Date.UTC(dt.getUTCFullYear(), dt.getUTCMonth(), 1, 12))
  let fm = mondayOf(first)
  if (fm.getUTCMonth() !== dt.getUTCMonth()) {
    fm = new Date(first)
    while (fm.getUTCDay() !== 1) fm.setUTCDate(fm.getUTCDate() + 1)
  }
  const w = Math.floor((mondayOf(dt) - fm) / 604800000) + 1
  return Math.max(1, w)
}

/** 'สิงหาคม 2569' */
export function monthFolder(iso) {
  const dt = toDate(iso)
  return `${TH_MONTH[dt.getUTCMonth()]} ${dt.getUTCFullYear() + 543}`
}

/** 'W4-Mon-24-08-2569.md' */
export function fileName(iso) {
  const dt = toDate(iso)
  return `W${weekOfMonth(iso)}-${DAY[dt.getUTCDay()]}-${p2(dt.getUTCDate())}-${p2(dt.getUTCMonth() + 1)}-${dt.getUTCFullYear() + 543}.md`
}

/** path เต็มของ worklog วันนั้น */
export function worklogPath(iso) {
  return join(ROOT, 'daily', monthFolder(iso), fileName(iso))
}

/** วันนี้ตามเวลาไทย 'YYYY-MM-DD' */
export function todayISO() {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Bangkok' }).format(new Date())
}
