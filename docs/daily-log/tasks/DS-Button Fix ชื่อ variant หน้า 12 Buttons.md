---
name: "[DS]-[Button] Fix ชื่อ variant หน้า 12 Buttons"
asana: "https://app.asana.com/0/1212508564439334/1218355556251483"
status: "Complete / Done เสร็จสมบูรณ์"
completed: true
project: "Design System"
assign_date: "2026-09-10"
start: "2026-09-10"
due: "2026-09-10"
created: "2026-09-10"
source: "Asana"
---
# [DS]-[Button] Fix ชื่อ variant หน้า 12 Buttons

## รายละเอียดงาน

**Problem ปัญหาคืออะไร ?**
- ชื่อ variant ทั้งหน้า 12 Buttons ยังขึ้นต้นด้วยตัวใหญ่ ขัดกับกติกาตั้งชื่อที่กำหนดให้ variant เป็นตัวเล็กทั้งหมด กระทบ 22 ชุด 1,480 แบบ
- มีแกนหนึ่งชื่อ Icon only ที่ผิดสองข้อพร้อมกัน คือมีตัวใหญ่และมีเว้นวรรค แทนที่จะเป็นขีดกลาง
- ทำให้ชื่อ variant ของหน้านี้ไม่ตรงกับหน้าอื่นที่จัดกติกาไปแล้ว คนหยิบไปใช้และคนเขียนโค้ดต้องจำสองแบบ
**Goal ทำเพื่ออะไร ?**
- ชื่อแกนและค่าของ variant ทั้ง 22 ชุดเป็นตัวเล็กและใช้ขีดกลางแทนเว้นวรรค ตรวจแล้วเหลือตัวใหญ่ 0
- instance ของปุ่มทั้งไฟล์ยังใช้งานได้ครบ ไม่มีตัวไหนหลุดจาก main component
**Requirements ขอบเขตงาน**
1. เปลี่ยนชื่อแกน Icon only เป็น icon-only ใน Alpha Button 4 ชุด
2. เปลี่ยนค่า False True เป็นตัวเล็ก ในแกน default-gray neutral-color icon-only
3. เปลี่ยนค่า Primary Secondary Tertiary เป็นตัวเล็ก ในแกน hierarchy
4. เปลี่ยนค่า Default Hover Focused Disabled เป็นตัวเล็ก ในแกน state
5. ไม่แตะแกน size เพราะเป็นตัวเล็กถูกอยู่แล้ว
6. ตรวจหลังทำ 4 ข้อ คือตัวใหญ่เหลือ 0 จำนวน instance เท่าเดิม ทุก instance ยังหา main component เจอ และขนาด COMPONENT ต้นฉบับไม่เปลี่ยน
**Figma File**
- [หน้า 12 Buttons](https://www.figma.com/design/QgmoT5Uuvv3elB96F4nsTq/?node-id=7121-7232)
**Reference ตัวอย่างงานที่ชอบ**
- หน้า 21 Tags ที่จัดชื่อ variant ตามกติกาไปแล้ว ใช้เป็นแบบอ้างอิง

## บันทึกงาน

### 2026-09-10 Tommyy_PS

#### **worklog 1**

- เปลี่ยนชื่อแกน Icon only เป็น icon-only ใน Alpha Button 4 ชุด ใช้ editComponentProperty ซึ่งเป็นทางที่ Figma ย้าย instance ให้เอง ไม่ได้แก้ผ่านชื่อ variant เพราะจะกลายเป็นแกนใหม่แล้วของเดิมหลุด
- เปลี่ยนค่า variant เป็นตัวเล็กทั้งหมด โดยแยกชื่อแกนกับค่าออกจากกันก่อน แล้วแตะเฉพาะฝั่งค่า ชื่อแกนไม่โดน
- ค่าที่เปลี่ยน คือ False True เป็นตัวเล็ก Primary Secondary Tertiary เป็นตัวเล็ก และ Default Hover Focused Disabled เป็นตัวเล็ก ส่วนแกน size ไม่แตะเพราะถูกอยู่แล้ว

#### **ผลตรวจ**

- 22 ชุด 1,480 แบบ เปลี่ยนครบ เหลือตัวใหญ่ 0
- แกนทั้งหน้าเหลือ 6 ชื่อ คือ default-gray hierarchy icon-only neutral-color size state ตัวเล็กและขีดกลางล้วน
- variant ไม่หายสักตัว รหัสโหนดเดิมครบ 1,480 ตัว แปลว่า instance ทั้งไฟล์ยังชี้เป้าเดิม ไม่มีทางหลุด
- instance ปุ่มบนหน้า 51 ตัว หา main component เจอครบ 51 และค่าคุณสมบัติเป็นตัวเล็กหมด
- ขนาด COMPONENT ต้นฉบับ เทียบก่อนหลัง 1,480 ตัว ไม่เปลี่ยนสักตัว
- ไม่มีข้อความในเอกสารบนหน้า และไม่มีไฟล์ในเครื่อง ที่อ้างชื่อแบบเก่า
