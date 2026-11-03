// worklog-remind.mjs เตือน (macOS notification) ตอน 16:00 จ-ศ
// ไม่เขียนเอง แค่เตือนให้สรุป worklog ก่อนรอบ 16:00 ที่สำเนาไป Obsidian
import { execFileSync } from 'node:child_process'

const title = 'ถึงเวลาบันทึก Worklog (16:00)'
const msg = 'สรุปงานวันนี้ใน Claude ก่อน 16:00 รอบ 16:00 จะสำเนาไป Obsidian'

try {
  execFileSync('osascript', [
    '-e',
    `display notification "${msg}" with title "📝 ${title}" sound name "Glass"`,
  ])
  console.log(`✓ เตือน worklog แล้ว`)
} catch (e) {
  console.error('✗ เตือนไม่สำเร็จ:', e.message)
  process.exit(1)
}
