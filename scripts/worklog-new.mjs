// worklog-new.mjs scaffold ไฟล์ worklog วันนี้ (4 หัวข้อ) ถ้ายังไม่มี
// ใช้: npm run worklog:new  (ตั้ง schedule 07:30)
// เนื้อหาจริงเขียนตอนทำงานในเซสชัน 16:30 ค่อย push เป็น comment ขึ้น Asana
import { writeFileSync, existsSync, readFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { worklogPath, todayISO } from './worklog-path.mjs'

const CONFIG = 'scripts/worklog-current-task.json'
const today = todayISO()
const file = worklogPath(today)          // docs/daily-log/daily/<เดือนไทย ปีพ.ศ.>/W..-..md

if (existsSync(file)) {
  console.log(`✓ worklog วันนี้มีอยู่แล้ว: ${file}`)
  process.exit(0)
}

let taskLine = ''
if (existsSync(CONFIG)) {
  const { name } = JSON.parse(readFileSync(CONFIG, 'utf8'))
  taskLine = `> Task: ${name}\n`
}

const scaffold = `# Worklog ${today}
${taskLine}
## งานค้าง
-

## งานที่ทำวันนี้
-

## ผลลัพธ์
-

## ติดปัญหา
-
`

mkdirSync(dirname(file), { recursive: true })
writeFileSync(file, scaffold)
console.log(`✓ สร้าง worklog ใหม่ (4 หัวข้อ): ${file}`)
