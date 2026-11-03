---
name: "[One CMS]-[Dashboard] Design หน้า Login และ Dashboard (Prototype)"
asana: "https://app.asana.com/0/1212508564439334/1219924327842569"
status: "In Progress (Design Phase) งานที่กำลังออกแบบ"
completed: false
project: "One CMS"
assign_date: "2026-10-27"
start: "2026-10-27"
due: "2026-10-27"
created: "2026-10-27"
source: "Asana"
---
# [One CMS]-[Dashboard] Design หน้า Login และ Dashboard (Prototype)

## รายละเอียดงาน

**Problem ปัญหาคืออะไร ? :** One CMS ยังไม่มีกฎของโปรเจกต์ และยังไม่มี prototype ที่สร้างจาก DS กลาง
**Goal ทำเพื่ออะไร ? :** มี prototype หน้า Login และ Dashboard ใน Storybook ที่ใช้ component และ token ของ DS ทั้งหมด
**Requirements ขอบเขตงาน**
1. ไฟล์กฎโปรเจกต์ context/features/one-cms/AGENTS.md
2. หน้า Login
3. Dashboard ส่วนจัดอันดับข่าว 25 ข่าว จากยอดวิว Pageviews, GA, Truehits ของวันนี้และเมื่อวาน
4. Dashboard ส่วนจำนวนข่าวที่สร้าง กรองได้ทั้งวัน สัปดาห์ เดือน ปี
5. Dashboard ส่วนสถิตินักข่าว (สร้าง, เผยแพร่แล้ว, ยังไม่เผยแพร่) กรองได้ทั้งวัน สัปดาห์ เดือน ปี
**Figma File :** [CMS (node-id 13476-40325)](https://www.figma.com/design/kMw46mRQEaL2s1ofpnSDgh/CMS?node-id=13476-40325)
**Reference ตัวอย่างงานที่ชอบ :** ไม่มี

## บันทึกงาน

### 2026-10-27 Tommyy_PS

**อัปเดต 27 ต.ค. 2569**
**ทำแล้ว**
- สร้างไฟล์กฎโปรเจกต์ context/features/one-cms/AGENTS.md (ภาพรวม One CMS, หน้า Login, กฎ 3 ส่วนของ Dashboard, edge cases)
- ใส่ลิงก์โปรเจกต์ไว้ใน context/features/AGENTS.md และ context/index.md
**ค้าง**
- รอคำตอบ NEEDS CLARIFICATION 9 ข้อ: บทบาทผู้ใช้และสิทธิ์, CMS เดียวหรือแยกแบรนด์, วิธี Login, แหล่งที่ใช้จัดอันดับข่าว, รูปแบบวันนี้กับเมื่อวาน, นิยามสัปดาห์ เดือน ปี, สถานะที่นับว่ายังไม่เผยแพร่, ประเภทเนื้อหาที่นับ, component กราฟที่ DS ยังไม่มี
- เชื่อม Figma connector ก่อนอ่านแบบและเริ่มทำหน้า Login
