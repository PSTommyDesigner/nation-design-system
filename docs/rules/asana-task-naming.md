# Asana Task Naming Convention

> ต้นฉบับทางการ: แท็บ **Naming Convention** และ **Hierarchy of tasks** ในโปรเจกต์ Asana `Design Process 2026`
> ไฟล์นี้คือฉบับคัดลอกไว้ใช้งานฝั่ง agent/โค้ด แก้ที่ Asana เมื่อไหร่ ให้อัปเดตไฟล์นี้ตาม
> ครอบคลุม **ชื่อ Task** (Golden Formula) **Description** (เทมเพลต 5 หัวข้อ) **Hierarchy** 6 ชั้น

## The Golden Formula

```
[System]-[Feature] + Action + Page Name / UI Name + (Context)
```

ตัวอย่างผลลัพธ์: `[Script Pro]-[List] Design หน้า Script List (TV View)`

> **ขอบเขตของขีด `-` (ยืนยัน 2026-08-05):** ใช้ **ที่เดียวเท่านั้น** คือคั่น `[System]` กับ `[Feature]` ในชื่อ Task ของ Asana
> - ส่วนที่เหลือของชื่อ (Action Page Name Context) **ไม่มีขีด** ใช้เว้นวรรคปกติ
> - กฎนี้ใช้กับ **ชื่อ Task ใน Asana เท่านั้น** ไม่เกี่ยวกับการตั้งชื่อ layer/component/style/token (ดู CLAUDE.md หัวข้อ "การตั้งชื่อ" และ `docs/rules/token-naming-taxonomy.md`)
> - ต้นฉบับใน Asana เขียนไม่ตรงกัน (หัวข้อสูตรมีขีด แต่ตารางตัวอย่างเขียนติดกัน `[System][Feature]`) ยึด **แบบมีขีด** ตามที่ task จริงในโปรเจกต์ใช้อยู่ ตารางในไฟล์นี้ปรับให้ตรงแล้ว

### 1. [System] วงเล็บแรก = "ระบบหลัก"
- หน้าที่: ใช้สแกนหาว่างานนี้สังกัดระบบไหน (แทนการใช้ Project Name ที่กว้างเกินไป)
- ตัวอย่าง: `[Script Pro]`, `[Employee Eval]`, `[Payroll]`

### 2. [Feature/Function/Module] = "หมวดหมู่ย่อย/คุณสมบัติ/ฟังก์ชัน/โมดูล"
- หน้าที่: ระบุเจาะจงลงไปว่าอยู่ในฟีเจอร์ไหน (ใช้คำสั้นๆ หรือตัวย่อ)
- ตัวอย่าง: `[List]`, `[Editor]`, `[KPI]`, `[Setting]`

### 3. Action คำกริยา = "สิ่งที่ต้องทำ"
- หน้าที่: บอกสมองให้เตรียมพร้อมว่าต้องทำอะไร (แนะนำให้ใช้ภาษาอังกฤษกระชับ)
- ตัวอย่าง: `Design` (ทำใหม่), `Update` (แก้ของเดิม), `Fix` (แก้บั๊ก), `Research` (หาข้อมูล), `Revamp` (รื้อทำใหม่)

### 4. Page Name ชิ้นงาน = "หน้า UI เป้าหมาย"
- หน้าที่: ระบุชื่อหน้าจอที่ต้องส่งมอบไฟล์ (สิ่งที่สำคัญที่สุดใน Task)
- ตัวอย่าง: หน้า Script List, หน้า Create Form, หน้า Dashboard

### 5. (Context) บริบท = "ส่วนขยาย" (ถ้ามี)
- หน้าที่: บอกรายละเอียดเพิ่มเติมเพื่อไม่ให้สับสน
- ตัวอย่าง: `(TV View)`, `(News View)`, `(Desktop)`, `(Mobile)`

## ตัวอย่างเมื่อนำมาประกอบร่าง
| ชนิดงาน | ชื่อ Task |
|---|---|
| งานออกแบบใหม่ | `[Script Pro]-[List] Design หน้า Script List (TV View)` |
| งานแก้บั๊ก | `[Script Pro]-[Editor] Fix พิมพ์ภาษาไทยแล้วสระลอย` |
| งานปรับปรุง | `[Script Pro]-[Setting] Update หน้าตั้งค่าสิทธิ์ผู้ใช้งาน (Admin)` |

## โครงสร้างสำรอง: งานที่ทำทุกระบบ ทุกฟีเจอร์
ใช้เมื่อเป็นงานระดับโปรเจกต์ (เช่น Research ข้อมูลทั้งโปรเจกต์)

```
[Project]-[Action] Detail + (Context)
```

ตัวอย่าง: `[Nation House]-[Research] Research ข้อมูลเทรนด์ดีไซน์ใหม่`
- System = `[Nation House]` · Feature = `[Research]` (ใช้วงเล็บนี้ระบุประเภทงานไปเลย)

## Description ของ Task (เทมเพลตบังคับ)

> ต้นฉบับ: เทมเพลตการ์ดที่ user ใช้จริงในโปรเจกต์ `Design Process 2026` (บันทึก 2026-08-26)
> **สร้างการ์ดใหม่ต้องใส่ครบ 5 หัวข้อนี้เสมอ ห้ามเขียนเป็นย่อหน้าลอย** (เคยพลาด 2026-08-26 เพราะไม่เคยมีใครจดเทมเพลตไว้)

```
Problem ปัญหาคืออะไร ? :
Goal ทำเพื่ออะไร ? :
Requirements ขอบเขตงาน
  1. A
Figma File :
Reference ตัวอย่างงานที่ชอบ :
```

| หัวข้อ | ใส่อะไร |
|---|---|
| **Problem** | อาการที่เจอ ไม่ใช่วิธีแก้ บอกให้เห็นว่าทำไมต้องมีการ์ดใบนี้ |
| **Goal** | สภาพที่อยากได้หลังงานเสร็จ วัดผลได้ |
| **Requirements** | ขอบเขตงานเป็นข้อ ๆ เรียงเลข ข้อไหนไม่ทำให้ระบุว่าไม่ทำ |
| **Figma File** | ลิงก์หน้าหรือเฟรมเป้าหมาย (ใส่ `node-id` ให้ตรงจุด) |
| **Reference** | ตัวอย่างงานที่ชอบ ไม่มีให้เขียนว่าไม่มี ห้ามเว้นว่าง |

**ส่งผ่าน API:** ใช้ `html_notes` เท่านั้น (ไม่ใช่ `notes` ถ้าจะจัดรูปแบบ) tag ที่ใช้ได้ `<strong>` `<ol><li>` `<ul><li>` `<a href>` **ห้ามใช้ `<p>` `<b>` `<br>`** จะได้ 400 `XML is invalid` (กติกาเดียวกับ worklog ดู [worklog.md](worklog.md) §3)

## Hierarchy of tasks (6 ชั้น)
| ชั้น | คือ | ตัวอย่าง | ตำแหน่งใน Asana |
|---|---|---|---|
| 1. Project (โครงการ) | ร่มคันใหญ่ที่สุดที่คลุมทุกอย่างไว้ | HRMS, Nation News Center | **Custom Field** (เอาไว้ filter ภาพรวม) |
| 2. System (ระบบ) | ระบบย่อยหรือกลุ่มฟังก์ชันใหญ่ที่ทำงานร่วมกัน (เดิมคือ Epic) | Employee Eval, Script Pro | **Prefix วงเล็บแรก** `[Script Pro]` |
| 3. Feature/Function/Module | ความสามารถเฉพาะเรื่องที่ผู้ใช้ต้องการทำ | KPI, Editor, List | **Prefix วงเล็บสอง** `[Editor]` |
| 4. Page (หน้า) | หน้าจอ UI หนึ่งหน้าที่ต้องออกแบบและส่งมอบ | หน้า Script List (TV View), หน้า Login | **ชื่อ Task หลัก** (Main Task Name) |
| 5. Module (โมดูล) | ก้อนฟังก์ชันหรือกลุ่ม UI ที่วางอยู่ในหน้าจอนั้น | Filter Bar, Rundown Column, Score Slider | **Subtask** หรือ **Description** |
| 6. Component (คอมโพเนนต์) | วัตถุชิ้นเล็กที่นำไปประกอบเป็น Module (reusable) | Button, Input Field, Icon | **Subtask (Checklist)** หรืออยู่ใน Design System |

## ตารางตัวอย่างจริง

### 1. Project: Nation News Center
| System | Feature | Action | Page / UI Name | (Context) | ชื่อ Task ที่ได้ |
|---|---|---|---|---|---|
| [Script Pro] | [List] | Design | หน้า Script List | (TV View) | `[Script Pro]-[List] Design หน้า Script List (TV View)` |
| [Script Pro] | [Editor] | Update | แถบ Toolbar จัดข้อความ | (Desktop) | `[Script Pro]-[Editor] Update แถบ Toolbar จัดข้อความ (Desktop)` |
| [Script Pro] | [Editor] | Fix | หน้า Create Script | (Save Error) | `[Script Pro]-[Editor] Fix หน้า Create Script (Save Error)` |
| [Rundown] | [Queue] | Design | หน้าจัดลำดับข่าว | (Drag & Drop) | `[Rundown]-[Queue] Design หน้าจัดลำดับข่าว (Drag & Drop)` |
| [Archive] | [Search] | Research | ระบบค้นหาข่าวย้อนหลัง | | `[Archive]-[Search] Research ระบบค้นหาข่าวย้อนหลัง` |

### 2. Project: HRMS (ระบบบริหารบุคคล)
| System | Feature | Action | Page / UI Name | (Context) | ชื่อ Task ที่ได้ |
|---|---|---|---|---|---|
| [Eval] | [KPI] | Design | หน้าประเมินผลรายบุคคล | (Manager) | `[Eval]-[KPI] Design หน้าประเมินผลรายบุคคล (Manager)` |
| [Eval] | [Dashboard] | Update | กราฟสรุปผลคะแนน | (Yearly) | `[Eval]-[Dashboard] Update กราฟสรุปผลคะแนน (Yearly)` |
| [Payroll] | [Slip] | Design | หน้าสลิปเงินเดือน | (Mobile) | `[Payroll]-[Slip] Design หน้าสลิปเงินเดือน (Mobile)` |
| [Payroll] | [Tax] | Fix | หน้าคำนวณภาษี | (Logic ผิด) | `[Payroll]-[Tax] Fix หน้าคำนวณภาษี (Logic ผิด)` |
| [Recruit] | [Candidate] | Design | การ์ดข้อมูลผู้สมัคร | (Kanban) | `[Recruit]-[Candidate] Design การ์ดข้อมูลผู้สมัคร (Kanban)` |

### 3. Project: Nation House (เว็บขายบ้าน)
| System | Feature | Action | Page / UI Name | (Context) | ชื่อ Task ที่ได้ |
|---|---|---|---|---|---|
| [Search] | [Filter] | Design | แถบตัวกรองค้นหาบ้าน | (Advance) | `[Search]-[Filter] Design แถบตัวกรองค้นหาบ้าน (Advance)` |
| [Member] | [Register] | Update | หน้าสมัครสมาชิก | (Step 2) | `[Member]-[Register] Update หน้าสมัครสมาชิก (Step 2)` |
| [Booking] | [Payment] | Design | หน้าเลือกวิธีชำระเงิน | (App) | `[Booking]-[Payment] Design หน้าเลือกวิธีชำระเงิน (App)` |
| [Home] | [Banner] | Revamp | Hero Banner หน้าแรก | (Promo) | `[Home]-[Banner] Revamp Hero Banner หน้าแรก (Promo)` |

## Pro Tips
1. **ใช้คำย่อใน [Feature]:** สั้น 1-2 พยางค์ ไม่ให้ชื่อยาวกินที่
   - ดี: `[List]`, `[Edit]`, `[User]`, `[Set]` · ยาวไป: `[ScriptListing]`, `[UserManagement]`
2. **ถ้า Feature กว้างมาก:** ใช้ `[Core]` หรือ `[Main]`
   - เช่น `[Script Pro]-[Core] Design โครงสร้าง Layout หลัก`
3. **ถ้าเป็นงาน Design System:** ใช้ System ว่า `[Global]` หรือ `[DS]`
   - เช่น `[DS]-[Button] Update รัศมีปุ่ม Primary Button`

## Checklist ก่อนตั้งชื่อ Task
- [ ] มี `[System]` และ `[Feature]` ครบ 2 วงเล็บ
- [ ] Action เป็นคำกริยาอังกฤษกระชับ (Design / Update / Fix / Research / Revamp)
- [ ] ระบุหน้า UI ที่ต้องส่งมอบชัดเจน
- [ ] ใส่ `(Context)` เมื่อมีหลายแพลตฟอร์ม/หลายมุมมอง
- [ ] ไม่มี em-dash ` ` ในชื่อ (ตาม Definition of Done ใน CLAUDE.md)
- [ ] งาน DS ใช้ `[DS]` หรือ `[Global]` เป็น System
- [ ] **Description ครบ 5 หัวข้อตามเทมเพลต** (Problem · Goal · Requirements · Figma File · Reference) ส่งด้วย `html_notes`
- [ ] custom field ครบ 5 ตัว (Project · Priority · Design Level · Assigner · Assign Date) ดู CLAUDE.md หัวข้อ Asana
