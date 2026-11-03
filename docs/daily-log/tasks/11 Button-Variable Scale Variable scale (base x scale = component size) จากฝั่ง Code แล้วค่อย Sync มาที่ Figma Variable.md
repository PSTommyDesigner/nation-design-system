---
name: "[11 Button]-[Variable Scale] Variable scale (base x scale = component size) จากฝั่ง Code แล้วค่อย Sync มาที่ Figma Variable"
asana: "https://app.asana.com/0/1212508564439334/1216612866691238"
status: "Complete / Done เสร็จสมบูรณ์"
completed: true
project: "Design System"
assign_date: "2026-07-16"
start: "2026-07-16"
due: "2026-07-22"
created: "2026-07-17"
source: "Asana"
---
# [11 Button]-[Variable Scale] Variable scale (base x scale = component size) จากฝั่ง Code แล้วค่อย Sync มาที่ Figma Variable

## รายละเอียดงาน

**Problem ปัญหาคืออะไร ? :** Design System เป็นแค่ Library ใน Figma ให้คนใช้งาน แต่ AI ไม่เข้าใจบริบทของ Design System ทั้งหมด AI ไม่ต้องการปุ่มแบบไหน แต่ AI ต้องการเจตนารมณ์ (Intent) ของการใช้ปุ่มนั้นว่า ควรใช้ปุ่มนี้ใช้เมื่อไหร่ ใช้ยังไง เหมาะกับ UI แบบไหน
**Goal ทำเพื่ออะไร ? :** สร้างภาษากลางเพื่อให้ AI และคนเข้ามาแล้วเข้าใจบริบท Design System
**Requirements ขอบเขตงาน : **ทำใหม่ทั้งหมด
**Figma File : [https://www.figma.com/design/QgmoT5Uuvv3elB96F4nsTq/Nation-Group-Thailand----Design-System?node-id=0-1&p=f&t=z1lsvTjyk9gV0Ekg-0](https://www.figma.com/design/QgmoT5Uuvv3elB96F4nsTq/Nation-Group-Thailand----Design-System?node-id=0-1&p=f&t=z1lsvTjyk9gV0Ekg-0)**

## บันทึกงาน

### 2026-07-17 Tommyy_PS

#### **📅 Worklog 2026-07-16 : Task: [11 Button]-[Variable Scale] Variable scale (base × scale = component size)**

#### **งานค้าง**
- แปลงค่าขนาดปุ่มใน Figma ยังไม่ครบ (เหลือ ระยะห่าง/ปุ่มไอคอน)
- ชื่อค่าขนาดใน Figma ยังไม่ตรงกันหมด (ค่าถูก แต่ชื่อยาว-สั้นปนกัน)
- เอกสารภาพของปุ่มและ component อื่น ยังไม่ทำ

#### **งานที่ทำวันนี้**
- จัดระเบียบวิธีตั้งค่าขนาดปุ่มใหม่ ให้แยกเป็นไฟล์ต่อ component เตรียมไว้ทำตัวอื่น (ของเดิมไม่พัง ผลลัพธ์เท่าเดิม)
- ปรับขนาดปุ่มแบบใหม่ (อิงความสูง) ให้ครบ **ทุกแบบปุ่ม 630 แบบ** ใน Figma เดิมทำแค่ตัวอย่างบางส่วน + แก้ตัวที่ตั้งค่าผิด
- ตกลงหลักการ "ระบบขนาดใหม่": คิดจากขนาดเริ่มต้นแล้วเพิ่มทีละขั้น

#### **ผลลัพธ์**
- ปุ่มทุกแบบใช้ระบบขนาดเดียวกันครบ 630 แบบ
- โครงสร้างค่าขนาดพร้อมต่อยอดไป component อื่น
- ได้ข้อสรุปสูตรขนาดใหม่ (สูง 28–60 เพิ่มทีละขั้น)

#### **ติดปัญหา**
- มีค่าขนาดเก่าตกค้างใน Figma ลบไม่ออก (ระบบมองไม่เห็น) แต่ไม่มีใครใช้แล้ว ไม่กระทบงาน

### 2026-07-17 Tommyy_PS

#### **📅 Worklog 2026-07-17 : Task: [11 Button]-[Variable Scale] Variable scale (base × scale = component size)**

#### **งานค้าง**
- สีขาวดิบตกค้างใน master ของเซลล์ตาราง (6-8 จุด พื้น checkbox) ถ้าอยากให้สะอาดต้องแก้ที่ master
- ระบบขนาดของ component อื่น (ช่องกรอก, ป้ายสถานะ) ทยอยทำตามแบบเดียวกับปุ่ม
- เอกสารภาพของปุ่มและหน้าอื่น ๆ ตามผลวิจัย

#### **งานที่ทำวันนี้**
- วางระบบขนาดปุ่มใหม่ ให้คิดจากขนาดเริ่มต้นแล้วเพิ่มทีละขั้น แทนตารางกลางตายตัว → ปรับทั้งชุดได้จากจุดเดียว
- ส่งค่าขนาดใหม่เข้า Figma กระจายครบทุกแบบปุ่มอัตโนมัติ + จัดชื่อให้ตรงกับฝั่งโค้ด
- ทำแม่แบบเอกสาร 3 ชนิด (หน้าเอกสารหลัก / เอกสารข้อมูล / ตัวอย่าง component) + วางกฎว่าจะเขียนเอกสารต้องถามก่อนว่าใช้ชนิดไหน
- จัดหน้าเอกสาร "สี" กับ "ไอคอน" ให้เป็นมาตรฐานเดียวกัน
- จัดหน้า "ตาราง" ครบชุด: ชิ้นส่วนเซลล์ + หน้าเอกสารหลัก + ตัวอย่างตารางประกอบจริง 2 แบบ

#### **ผลลัพธ์**
- ปุ่มมี 5 ขนาด (สูง 28–60) แก้ที่เดียว กระจายครบ 630 แบบ
- มีแม่แบบเอกสาร 3 ชนิดพร้อมใช้กับทุกหน้า
- หน้าสี/ไอคอน/ตาราง มีเอกสารครบและอ่านง่ายขึ้นมาก (สั้นลงจากเดิมหลายเท่า)

#### **ติดปัญหา**
- รอบแรกเข้าใจโจทย์เอกสารผิด ไปยุบรวมทั้งหน้าและลบ frame อื่น → แก้คืนครบแล้ว ข้อมูลไม่หาย · ได้กฎใหม่: เอกสารต้องจบใน frame เดียว ห้ามแตะ frame อื่น
- ค่าขนาดเก่าตกค้างใน Figma ลบไม่ออก (ระบบมองไม่เห็น) แต่ไม่มีใครใช้แล้ว ไม่กระทบงาน

### 2026-07-21 Tommyy_PS

#### **📅 Worklog 2026-07-21 : Task: [11 Button]-[Variable Scale] Variable scale (base × scale = component size)**

#### **งานค้าง**
- ปุ่มชุด Neutral: ทำต่อฝั่ง "ไอคอนอย่างเดียว" (ตอนนี้มีแต่ฝั่งมีข้อความ)
- โทน Alpha / Error: เพิ่มปุ่มไอคอน + ลิงก์ให้ครบเหมือนโทน Brand
- ลบปุ่มชุดเก่าหลังย้ายเข้าระบบใหม่เสร็จ
- หน้า 27 Content: จัด section ถัดไป · DS: on-role colors + typography roles

#### **งานที่ทำวันนี้**
- ยกเครื่องระบบ variant ปุ่มชุด Neutral แบบใหม่ เพิ่มตัวเลือก "ไอคอนอย่างเดียว" (ทำครบฝั่งมีข้อความ 55 แบบ)
- แยกปุ่มลิงก์เป็น 2 ชนิด: link-button + link-icon-button
- ทำโทน Alpha (ปุ่มโปร่งสำหรับวางทับรูป) โชว์บนภาพตัวอย่าง
- (ร่วมกับ Claude) วางระบบ worklog อัตโนมัติ + จัดหน้าเอกสาร Content + วางมาตรฐานชื่อ token

#### **ผลลัพธ์**
- ปุ่ม Neutral รองรับแบบไอคอนอย่างเดียวได้แล้ว (ครึ่งทาง) · ลิงก์แยกชนิดชัด · Alpha มีตัวอย่างบนภาพจริง
- ระบบ worklog + หน้าเอกสาร Content + มาตรฐานชื่อ token พร้อมใช้

#### **ติดปัญหา**
- ระบบ variant ปุ่มมีทั้งเก่า+ใหม่คู่กันระหว่างย้าย (ยังไม่ลบเก่า) ต้องเก็บให้จบ ไม่ให้สับสน

### 2026-07-22 Tommyy_PS

#### **📅 Worklog 2026-07-22 : Task: [11 Button] ปรับ button ทุกตระกูลให้ตรง Brand + audit สี + sync Figma↔code**

#### **งานค้าง**
- generate-scale ให้เป็น source (base+scale knob) ของ icon-button/link-button dimension (ตอนนี้ค่ามาจาก Token Press export) งาน #3 ต่อ
- cleanup 243 token ใน component ที่ก็อปชื่อ semantic (ต้นเหตุ collision ตอน build) งานแยก
- INSTANCE_SWAP default ยังชี้ icon Material (instance จริง Nation UI แล้ว แค่ preview)
- Neutral มี vestigial axis ค้าง (button `Icon Only=False`, icon-button `Default Gray/Neutral Color=True`)

#### **งานที่ทำวันนี้**
- **Audit + แก้สีผูกผิด collection** 378 จุด (semantics→component) หน้า 01 Color/02 Icon/11 Buttons/27 Table ค่าเท่าเดิม
- **Alpha/Error/Neutral**: เพิ่ม disabled · migrate token ขนาดเก่า→ใหม่ · เปลี่ยน icon Material→Nation UI ทุกตัว · ทำปุ่มไอคอนจัตุรัส
- **Split Error** ให้เหมือน Brand: แยก button/icon-button/link-button/link-icon-button (จากเดิมรวมในแกน Icon only)
- **จัด alignment ทุก set ให้ตรง Brand**: เจอว่า Brand ใช้ auto-layout HORIZONTAL+WRAP (ไม่ใช่ตำแหน่งมือ) → ตั้ง width/spacing/order เท่า brand → grid ตรงเป๊ะทุกมิติ
- **เพิ่มไซซ์ link** (xs/xl) ให้ Error + Neutral ครบ 5 ไซซ์
- **แก้สี Neutral เชิงลึก**: token `neutral/text·icon/primary` ผูก alias ผิด (เทาบนดำ มองไม่เห็น) → แก้เป็นขาว · เพิ่ม Primary ที่ icon-button หายไป · default=gray-900 hover=จางลง disabled=แบบ brand/error
- **Sync Figma → code**: Token Press export → map ชื่อไฟล์ + ถอด $extensions → ทับ tokens.json → build

#### **ผลลัพธ์**
- button ครบ 4 ตระกูล ตรง Brand ทุกมิติ (Nation UI icon · สีถูก · WRAP layout · section ตรง · ไซซ์ครบ)
- Neutral primary มองเห็นชัด (ขาวบนเข้ม) · disabled เหมือน brand/error
- code = Figma แล้ว: component.json 654→899 tokens · build ออก CSS ครบ (button/icon-button/link-button · ไม่มี [object Object])
- ยืนยัน use_figma (MCP) = plugin API เต็ม (สร้าง variable/clone/swap/split set ได้)

#### **ติดปัญหา**
- รอบแรกทำหยาบหลายจุด (rebind สีไม่เช็คค่าจริงก่อน · จัด grid มือแทน WRAP · ไม่เทียบไซซ์ link) → user ทักท้วง แก้ใหม่ให้ตรง Brand จริง · บทเรียน: อ่านค่า resolved + เทียบ Brand ให้ครบก่อนแก้
- combineAsVariants ตอน split ทำชื่อ variant เพี้ยน (key หาย) → reconstruct ชื่อคืน · ต่อไปใช้ id-map เก็บชื่อก่อน combine
- use_figma return truncate ~20KB → sync ผ่าน MCP ไม่ได้ ต้องใช้ Token Press (download ไฟล์ได้)
