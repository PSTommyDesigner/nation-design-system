---
name: "[DS]-[Docs] Fix เนื้อหาเอกสารให้ตรงกับ Component Token และ Code (หน้า 00-28)"
asana: "https://app.asana.com/0/1212508564439334/1219695111514329"
status: "Internal Review / Feedback รอ Stakeholder ตรวจสอบ"
completed: true
project: "Design System"
assign_date: "2026-10-20"
start: ""
due: ""
created: "2026-10-20"
source: "Asana"
---
# [DS]-[Docs] Fix เนื้อหาเอกสารให้ตรงกับ Component Token และ Code (หน้า 00-28)

## รายละเอียดงาน

**Problem ปัญหาคืออะไร ? :** ตรวจ Page Documentation หน้า 00 ถึง 28 ในไฟล์ออกแบบ Nation Design System เทียบกับ component variable token และโค้ดจริง เจอความไม่ตรงกันแบบตัวเลขผิด 4 จุด หน้า 21 Tags เขียนว่า 11 ชนิดแต่ของจริงมี 14 ชนิด หน้า 05 Effect เขียนว่ามี 21 สไตล์แต่ของจริงมี 25 สไตล์ หน้า 12 Buttons เขียนว่า 7 families แต่โครงจริงมี 4 families และหน้า 26 Table เขียนรายชื่อชนิดช่อง 5 ชื่อที่ไม่มีคอมโพเนนต์จริงรองรับ (รูปโปรไฟล์ โลโก้ เอกสาร การชำระเงิน ช่องกรอก) และขาดชื่อที่มีจริง 4 ชื่อ (ลิงก์ การกระทำ กลุ่มผู้ใช้ วันที่)**Goal ทำเพื่ออะไร ? :** เอกสารทุกหน้าที่มี component ตัวเลขและข้อความอธิบายตรงกับของจริงในไฟล์ออกแบบ ตรงกับ token หรือ variable ที่ผูกไว้ และตรงกับโค้ดจริงใน repo ทุกจุด เพื่อให้ทีมอื่นที่เปิดเอกสารอ่านแล้วเชื่อถือได้ทันทีโดยไม่ต้องเดาหรือไปนับเองซ้ำ**Requirements ขอบเขตงาน**
1. 21 Tags แก้แล้ว Variants จาก 11 เป็น 14 ชนิด เพิ่มตัวอย่างกลุ่มไอคอนล้วน 3 ชิ้นเข้ากริดด้วย
2. 05 Effect แก้แล้ว ตัวเลขในหัวข้อ Overview จาก 21 สไตล์เป็น 25 สไตล์
3. 12 Buttons แก้แล้ว หัวข้อ Variants จาก 7 families เป็น 4 families พร้อมอธิบายว่า link แยกเป็นคอมโพเนนต์ LinkButton และ brand กับ error มีคุณสมบัติ default-gray เพิ่ม ไม่ใช่ family แยก
4. 26 Table แก้แล้ว หัวข้อ Cell types จากรายชื่อ 13 ชื่อที่ผิดครึ่งหนึ่ง เป็นรายชื่อ 12 ชนิดที่ตรงกับคอมโพเนนต์ table-cell จริงทุกตัว ตรวจกับ components/Table/Table.tsx แล้วโค้ดถูกต้องอยู่แล้วไม่ต้องแก้
5. ตรวจละเอียดแล้วถูกต้องครบ ไม่ต้องแก้ 11 Avatar, 13 Input, 15 Checkbox, 16 Radio, 18 Tabs, 08 Logo, 09 Third-party Logos, 14 Toggles, 17 Sliders, 19 Toasts and Banners, 20 Tooltips, 22 Badge, 23 Progress Bars, 24 Pagination, 25 Dropdowns, 27 Card, 28 Dividers รวม 17 หน้า ทวนสูตรตัวเลขทุกจุดกับจำนวน component variant จริงแล้วตรงกันหมด
6. ไม่รวม 01 Color, 03 Typography, 04 Grid, 06 Shape, 07 Space เพราะไม่มี component จริงให้เทียบ เป็นหน้า token ล้วน
**Figma File :** [Nation Design System (QgmoT5)](https://figma.com/design/QgmoT5Uuvv3elB96F4nsTq) ครอบคลุมหลายหน้า ดู node id แต่ละหน้าที่ docs/figma-pages.md**Reference ตัวอย่างงานที่ชอบ :** ไม่มี

## บันทึกงาน

- ยังไม่มีบันทึก
