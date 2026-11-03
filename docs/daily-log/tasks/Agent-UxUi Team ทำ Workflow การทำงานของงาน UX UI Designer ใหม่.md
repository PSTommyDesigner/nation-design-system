---
name: "[Agent]-[UxUi Team] ทำ Workflow การทำงานของงาน UX/UI Designer ใหม่"
asana: "https://app.asana.com/0/1212508564439334/1216022799098351"
status: "Complete / Done เสร็จสมบูรณ์"
completed: true
project: "AI Agent Workflow"
assign_date: "2026-06-25"
start: "2026-06-25"
due: "2026-07-14"
created: "2026-06-25"
source: "Asana"
---
# [Agent]-[UxUi Team] ทำ Workflow การทำงานของงาน UX/UI Designer ใหม่

## รายละเอียดงาน

**Problem ปัญหาคืออะไร ? :** UX/UI Designer ทำงานคนเดียวเวลางานโหลดเยอะๆแก้ปัญหาให้ไม่ไหว
**Goal ทำเพื่ออะไร ? :** ใช้ AI ช่วยทำงานให้ได้มากที่สุด
**Requirements ขอบเขตงาน**

1. **Orchestrator Claude Code (ผู้จัดการ)** รับ brief, แจกงาน, ตรวจ changes ทั้งสองฝั่ง ทำหน้าที่เป็น PM
2. **UX Researcher** วิเคราะห์ user flow บน news sites, สร้าง persona, competitive analysis เทียบ Sanook/Matichon/Workpoint
3. **UI Designer** ทำงานกับ **Figma MCP** โดยตรง สร้าง/อัปเดต components, จัดการ Figma Variables (design tokens), push/pull ข้อมูลกับ Figma
4. **Design System Guardian** ดูแล **Style Dictionary** เป็น single source of truth ของ tokens sync ระหว่าง Figma Variables ↔ tokens.json ↔ CSS custom properties ↔ Tailwind config
5. **Frontend Builder** รับ design context จาก Figma MCP → generate React/Next.js component + สร้าง HTML prototype สำหรับ handoff

## บันทึกงาน

### 2026-06-25 Tommyy_PS

**ทั้งหมด 17 ขั้นตอน ใน 4 Phase ประมาณ 10-15 วันทำงาน**

1. Foundation ติดตั้ง + ตั้ง project  step 1–5 ใช้เวลาประมาณ 4 วัน
2. Token Bridge Figma ↔ Code sync step 6-9 ใช้เวลาประมาณ 4 วัน
3. Component Pipeline Figma → React + Prototype step 10-14 ใช้เวลาประมาณ 6 วัน
4. Pixel Agents Office orchestrate 15-17 ใช้เวลาประมาณ 3 วัน

### 2026-07-14 Tommyy_PS

#### ✅ เสร็จเรียบร้อย

#### 📅 1. ช่วงเวลาทำ
จุดวันที่หลักฐาน**เริ่ม/ติดตั้ง**~**2026-06-25**โฟลเดอร์ ~/.pixel-agents/hooks/ สร้าง 25 มิ.ย.**แก้บั๊กหลัก + ใช้ได้****2026-06-26**package.json fix แก้ 26 มิ.ย. 12:54**แตะล่าสุด**2026-07-09server.json update 9 ก.ค.
> เป็นงานสั้นๆ ~2 วัน (25–26 มิ.ย.) ไม่ใช่โปรเจกต์แยก เป็น **VS Code extension สำเร็จรูป** (pablodelucca.pixel-agents v1.3.0) ที่เอามาตั้งค่าให้ทำงานกับทีม agent เรา

#### 🔧 2. ทำอะไรไปบ้าง

- **ติดตั้ง extension** pablodelucca.pixel-agents v1.3.0 แสดง Claude Code agents เป็นตัวละคร pixel ในออฟฟิศจำลอง
- **เข้าใจกลไกจริง** (หลังเข้าใจผิด 2 รอบ): extension ทำงานผ่าน
- **หา flow ให้ทีมโผล่:** 1 ตัวละคร = 1 Claude Code terminal ใน VS Code → กด **"+ Agent"** เปิด terminal แล้วสั่ง orchestrator → **Task tool sub-agents โผล่เป็นตัวละครแยก** linked กับ parent (นี่คือวิธีให้ ux-researcher/ui-designer/design-system/frontend-builder โผล่)

#### 🐛 3. ปัญหาที่ติด
**บั๊กหลัก (แก้แล้ว 2026-06-26): ตัวละครไม่โผล่เลย**

- **สาเหตุ:** มีไฟล์ ~/package.json หลงมา (สำเนาของ project package.json) ตั้ง "type":"module" → Node มอง .js ทุกไฟล์ใต้ home เป็น ESM → hook ที่ใช้ require (CommonJS) **crash ทุก SessionStart**
- **วิธีแก้:** วาง ~/.pixel-agents/package.json = {"type":"commonjs"} เป็น override (ไม่แตะไฟล์ user) → ทดสอบ hook exit 0 ✅
- **root cause จริง:** ~/package.json ที่หลงมา (ตัวจริงอยู่ใน ~/nation-design-system/) ลบได้ถ้าต้องการ
**ปัญหารอง (ยังอยู่ ตาม design ของ extension):**

- status detection เป็น heuristic (idle timer) → **misfire บ่อย**
- agent-terminal sync **เปราะ**
- session ที่รันนอก VS Code terminal (เช่น CCD app) **จะไม่ถูก track**
**ความเข้าใจผิดที่เสียเวลา:** เคยคิด 2 รอบว่า frontmatter ใน .claude/agents/*.md จะทำให้ตัวละครโผล่ จริงๆ **ไม่เกี่ยวเลย** ต้องมี Claude Code terminal รันจริงใน VS Code

#### ✅ 4. ผลลัพธ์

- **ใช้งานได้จริง** hook exit 0, ตัวละครโผล่เมื่อรัน orchestrator ผ่าน "+ Agent" terminal
- ทีม UX/UI (4 agent) โผล่เป็นตัวละครแยกเมื่อแตกงานผ่าน Task tool
- **ปลดล็อกงานต่อ:** งาน Figma/DS library sync ที่พักไว้ตั้งใจให้ "ทำหลัง Pixel Agent เสร็จ" ตอนนี้ Pixel Agent เสร็จแล้ว จึงพร้อมกลับไปสาน Figma sync ได้
- **บันทึกไว้เป็น reference:** ถ้าตัวละครหายอีก → เช็ค ~/.pixel-agents/package.json เป็นอันดับแรก

### 2026-07-14 Tommyy_PS

#### **สรุปงานอื่นๆ ทั้งหมด 25 มิ.ย. – 14 ก.ค. 2026 ที่ทำต่อจากการสร้าง Pixel Agent**

#### 🗓️ Timeline ภาพรวม
ช่วงงานหลัก**25–26 มิ.ย.**Pixel Agent (setup + แก้บั๊ก)**~26 มิ.ย.**พักงาน Figma sync ไว้ก่อน (รอทำ Pixel Agent เสร็จ)**7 ก.ค.**จัดเลขหน้า Figma + inventory 50 หน้า + สร้าง 5 Color Document**8 ก.ค.**Utility color doc + แยก ams + ระบบ _Lead + naming เป็น hyphen**10 ก.ค.**Audit text binding + รวม template + consolidate ตาราง + **DS research 11 เจ้า****14 ก.ค.**Utility naming flatten 266 จุด

#### 1️⃣ Pixel Agent AI (25–26 มิ.ย.)

- ติดตั้ง extension pablodelucca.pixel-agents v1.3.0 แสดงทีม agent เป็นตัวละคร pixel
- เข้าใจกลไก: hook SessionStart/Stop + อ่าน JSONL transcript · Task sub-agents โผล่เป็นตัวละครแยก
- **บั๊กหลัก (แก้แล้ว):** ~/package.json หลง "type":"module" ทำ hook crash → วาง ~/.pixel-agents/package.json = {"type":"commonjs"} override → ✅ ใช้งานได้

#### 2️⃣ โครงสร้าง Figma DS Library (7 ก.ค.)

- **แก้เลขหน้า:** ยึด Figma เป็น source of truth (00 Document · 01 Color · 02 Icon · 03 Typography) · ต้นตอ "01 ซ้ำ" = ชื่อไฟล์ doc ผิด ไม่ใช่หน้า Figma → rename doc ให้ตรง
- **Inventory:** docs/figma-pages.md 50 หน้า พร้อม node id (จัดตาม atomic design)
- **5 Color Document** (Text/Background/Border/Icon/Foreground) rebuild บน template 1440 · badge สว่าง/มืด bind variable ครบ · header เปลี่ยนตามหมวด

#### 3️⃣ Color System ละเอียด (8 ก.ค.)

- **Utility color doc** 146 ตัวแปร 15 เฉด นำเสนอเป็น ramp รายเฉด (Brand·AMS บนสุด)
- **แยก ams** ออกเป็น doc ams project เฉพาะ
- **ระบบ _Lead** จัดลำดับเลข/เยื้อง/เส้น tree ให้ทุก doc
- **Naming = hyphen ทั้งโปรเจกต์** เปลี่ยน _→- 158 จุด (text-secondary_hover→text-secondary-hover)
- **[Template] data table (WIP)** เริ่มทำ cell พื้นฐาน → **ภายหลังยกเลิก** (10 ก.ค.)

#### 4️⃣ Audit + Consolidate + Research (10 ก.ค.)

- **Audit text binding** หน้า 00/01/02 แก้ text ไม่ผูก DS style/variable: 01 Color จาก 826 เหลือ **0** · 02 Icon จาก 1,690 เหลือ **0**
- **รวม template** [Template] Component Document เป็น box แบบเดียว (hug ทั้ง 2 แกน)
- **ย้าย base component ตารางสี** → รวมหน้า 27 เป็น color-cell/* (ย้าย master ไม่รื้อตาราง)
- **Rebuild 12 ตารางเอกสาร** ให้ใช้ DS component (table-cell/*)
- 🔬 **DS Improvement Research** ทีม agent วิเคราะห์ design system เจ้าใหญ่ **11 เจ้า** (Material 3, Fluent 2, Spectrum, Carbon, Atlassian, Polaris, Lightning, BBC GEL, Guardian, NYT, Vox) → _ntgds-recommendations.md (แผน 4 workstream)

#### 5️⃣ Utility Naming Flatten (14 ก.ค. วันนี้)

- แก้ redundancy **266 จุด** ใน Figma ผ่าน plugin Scripter → ทุก utility เป็น `color/utility/u-<fam>-<step>[-alt]`
- ครอบ collection `semantics` (170) + `component` (120) · alias ไม่ขาด

#### ⏳ งานค้าง ณ วันนี้

- **#3 on-role color pairs** (on-error/warning/success…) ยังไม่เริ่ม
- **#1 typography roles + preset lock** ยังไม่เริ่ม
- **Re-export token sync** tokens.json stale หนัก vs Figma (ไม่ด่วน, code ไม่ใช้ utility)
- **Figma Code Connect** ArticleCard พักรอ DS library สมบูรณ์

### 2026-07-15 Tommyy_PS

#### **แก้ไข AI Agent(.claude/agents/)**
เปลี่ยนโมเดลจาก Orchestrator + ทีม 4 agent → UX/UI Designer ตัวเดียวทำครบทุกหน้าที่ JSONL transcript = 1 ตัวละครต่อ 1 terminal
