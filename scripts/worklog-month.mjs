// worklog-month.mjs · รอบ 16:30 จ-ศ (com.nation.worklog-month) สำเนา worklog ไป Obsidian ทั้ง 2 vault
// ใช้: npm run worklog:month
//
// เลิกส่ง Asana แล้ว (user สั่ง 2026-11-03) งานที่ทำ งานค้าง และบันทึกของการ์ดงานอยู่ใน Obsidian แทน
//   worklog รายวัน + สรุปเดือน 01 งานที่ทำ กับ 02 งานค้าง + บันทึกการ์ดงาน  → worklog-obsidian.mjs
//   กฎกับงานของ One CMS                                                → one-cms-obsidian.mjs
// ชื่อไฟล์คงเดิมเพราะตัวตั้งเวลา launchd เรียกไฟล์นี้อยู่ กฎเต็มอยู่ที่ docs/rules/worklog.md
// สอง vault แยกกัน ตัวหนึ่งพังไม่ขวางอีกตัว
let failed = false
try {
  const { syncObsidian } = await import('./worklog-obsidian.mjs')
  const r = syncObsidian()
  console.log(`📓 Obsidian ${r.days} วัน ${r.months} เดือน เขียน ${r.written.length} ไฟล์ ลบไฟล์เก่า ${r.removed.length} ไฟล์`)
  for (const w of r.warnings) console.warn(`⚠️ ${w}`)
} catch (e) {
  failed = true
  console.error(`✗ สำเนาไป Obsidian ไม่สำเร็จ: ${e.message}`)
}
try {
  const { syncOneCms } = await import('./one-cms-obsidian.mjs')
  const r = syncOneCms()
  console.log(`📓 One CMS กฎ ${r.rules} ไฟล์ งานรายวัน ${r.days} วัน เขียน ${r.written.length} ไฟล์ ลบไฟล์เก่า ${r.removed.length} ไฟล์`)
} catch (e) {
  failed = true
  console.error(`✗ สำเนาไป vault One CMS ไม่สำเร็จ: ${e.message}`)
}
if (failed) process.exit(1)
