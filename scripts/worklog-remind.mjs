// worklog-remind.mjs เตือน (macOS notification) ตอน 16:00 จ-ศ
// ไม่โพสต์เอง แค่เตือนให้สรุป worklog + ยืนยันใน Claude แล้วค่อยรัน worklog:asana
import { execFileSync } from 'node:child_process'

const title = 'ถึงเวลาบันทึก Worklog (16:00)'
const msg = 'สรุปงานวันนี้แล้วยืนยันใน Claude เพื่อบันทึกลง Asana'

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
