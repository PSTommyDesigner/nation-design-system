---
title: "05 Effect Nation Design System"
description: "เอฟเฟคทั้งหมดของระบบ ได้แก่ เงา 15 แบบ พื้นหลังเบลอ 5 ระดับ และวงแหวนโฟกัส 5 แบบ พร้อมหลักการเลือกใช้และการ sync ระหว่าง Figma กับโค้ด"
target_audience: ["UI/UX Designer", "Frontend Developer", "Design System Maintainer"]
version: "1.0.0"
last_updated: "2026-08-19"
status: "active"
sources_of_truth:
  figma_page: "05 Effect (ไฟล์ QgmoT5) Effect Token Elevation Principle Component Previews 3 ชุด"
  code: "tokens/tokens.json/shadows.json tokens/tokens.json/primitive.json (background-blur)"
  prototype: "tokens/output/css/variables.css"
---

# 05 Effect Nation Design System

## 1. ข้อมูลควบคุม (Metadata)

| ฟิลด์ | รายละเอียด |
|---|---|
| **Title** | 05 Effect (เงา พื้นหลังเบลอ วงแหวนโฟกัส) |
| **Description** | รวมเอฟเฟคทุกชนิดของระบบไว้ที่เดียว 25 สไตล์ใน Figma จับคู่กับ 25 ตัวแปรในโค้ด แบ่งเป็น 3 กลุ่ม คือ เงา 15 แบบ พื้นหลังเบลอ 5 ระดับ และวงแหวนโฟกัส 5 แบบ |
| **Target Audience** | Designer เลือกเงาตอนออกแบบ component Developer เรียกตัวแปรตอนเขียน CSS Maintainer ดูแลให้สองฝั่งตรงกัน |
| **Source of Truth** | Figma หน้า 05 Effect (แหล่งความจริงของค่า) `tokens/tokens.json/shadows.json` + `tokens/tokens.json/primitive.json` |
| **Version / Updated** | 1.0.0, 2026-08-17 |

## 2. วัตถุประสงค์ (Objective & Business Logic)

- **เป้าหมาย:** ให้ทุกหน้าจอในเครือใช้ชุดเงาเดียวกัน และให้ทีมออกแบบกับทีมพัฒนาเรียกเอฟเฟคตัวเดียวกันด้วยชื่อที่ตรงกัน
- **Business logic:** เงาไม่ได้มีไว้ตกแต่ง แต่ใช้บอกลำดับความสำคัญว่าของชิ้นไหนอยู่ใกล้สายตาผู้ใช้กว่ากัน ถ้าทุกอย่างลอยเท่ากันหมด ผู้ใช้จะแยกไม่ออกว่าควรมองอะไรก่อน
- **คุณค่า:** แก้ค่าที่เดียวมีผลทุกที่ · ลดการพิมพ์ค่าเงาเองที่ทำให้หน้าจอไม่สม่ำเสมอ · เตรียมทางไว้สำหรับ theme หลายแบรนด์ในอนาคต

## 3. ขั้นตอนการใช้งาน (Workflow)

### สำหรับ Designer
1. ดูระดับความลอยของของชิ้นนั้นก่อน จากตารางในเอกสาร **Elevation Principle** บนหน้า 05
2. เปิดรายการเอฟเฟคใน Figma แล้วอ่าน description ของแต่ละตัวว่าใช้กับ component อะไรบ้าง
3. ผูกสไตล์ที่เลือกเข้ากับ element **ห้ามพิมพ์ค่าเงาเอง** แม้จะรู้ตัวเลข
4. ถ้าหยิบสไตล์เดิมไปใช้กับ component ใหม่ ให้เติมชื่อ component นั้นต่อท้าย description ของสไตล์
5. ถ้าไม่มีตัวไหนเหมาะจริง **ขออนุมัติก่อนสร้างสไตล์ใหม่** แล้วแจ้งให้ sync เข้าโค้ด

### สำหรับ Developer
1. เรียกตัวแปรจากตารางในหัวข้อ 4.2 เช่น `box-shadow: var(--ntg-shadows-bottom-xs);`
2. พื้นหลังเบลอใช้กับ `backdrop-filter: blur(var(--ntg-effect-background-blur-md));`
3. วงแหวนโฟกัสใช้ที่ `:focus-visible` เท่านั้น ไม่ใช้ที่ `:focus` เพื่อไม่ให้วงแหวนเด้งตอนคลิกเมาส์
4. **ห้ามคัดลอกตัวเลขจากคอลัมน์ค่า** ตัวเลขมีไว้ตรวจสอบว่าสองฝั่งตรงกันเท่านั้น
5. ค่าเปลี่ยนเมื่อไหร่ให้ดึงใหม่ด้วย Token Press หรือแก้ไฟล์ token แล้วรัน `npm run tokens:build`

## 4. โครงสร้างข้อมูลและ UI (Structure)

### 4.1 กลุ่มเอฟเฟค

| กลุ่ม | จำนวน | ใช้ทำอะไร | หมายเหตุ |
|---|---|---|---|
| เงาทิ้งลงล่าง (`shadows/bottom/*`) | 5 | บอกความลอยของของทั่วไป | ใช้มากที่สุดในระบบ |
| เงาทิ้งขึ้นบน (`shadows/top/*`) | 5 | แถบที่ตรึงไว้ขอบล่างของจอ | ค่ากลับทิศจากเงาทิ้งลงล่าง |
| เงากระจายรอบด้าน (`shadows/center/*`) | 5 | ของที่ลอยกลางจอ ไม่มีทิศทางแสง | มี component ตัวอย่างครบทั้ง 5 ขนาด |
| พื้นหลังเบลอ (`background-blur/*`) | 5 | ทำให้เนื้อหาด้านหลังจางลง | เก็บเป็นค่าความเบลอเดี่ยว ไม่ใช่เงา |
| วงแหวนโฟกัส (`focused-ring/*-focused-ring`) | 5 | บอกตำแหน่งที่ผู้ใช้โฟกัสอยู่ | แบรนด์ กลาง ผิดพลาด เตือน สำเร็จ |

### 4.2 ตารางจับคู่ชื่อ Figma กับชื่อในโค้ด

| ชื่อใน Figma | ตัวแปรในโค้ด | ค่า | ใช้ตรงไหน |
|---|---|---|---|
| `shadows/bottom/xs` | `--ntg-shadows-bottom-xs` | `0px 1px 2px 0px rgba(0,0,0,0.05)` | ค่าเริ่มต้นของระบบ การ์ด แถบ |
| `shadows/bottom/sm` | `--ntg-shadows-bottom-sm` | `0px 1px 4px 0px rgba(0,0,0,0.1)` | ปุ่มในรายการ ช่องกรอก ปุ่มขนาด sm |
| `shadows/bottom/md` | `--ntg-shadows-bottom-md` | `0px 3px 8px -2px rgba(0,0,0,0.1)` | คำแนะนำลอย เมนูดึงลง ปุ่มขนาด md |
| `shadows/bottom/lg` | `--ntg-shadows-bottom-lg` | `0px 12px 16px -4px rgba(0,0,0,0.1)` | ปุ่มขนาด lg การ์ดที่ต้องเด่น |
| `shadows/bottom/xl` | `--ntg-shadows-bottom-xl` | `0px 20px 24px -4px rgba(0,0,0,0.1)` | กล่องซ้อนหน้าจอ ปุ่มขนาด xl |
| `shadows/top/xs` | `--ntg-shadows-top-xs` | `0px -1px 2px 0px rgba(0,0,0,0.05)` | แถบล่างที่ตรึงไว้แบบบาง |
| `shadows/top/sm` | `--ntg-shadows-top-sm` | `0px -1px 4px 0px rgba(0,0,0,0.1)` | แถบเครื่องมือล่างจอ |
| `shadows/top/md` | `--ntg-shadows-top-md` | `0px -3px 8px -2px rgba(0,0,0,0.1)` | แถบตรึงขอบล่างของจอ |
| `shadows/top/lg` | `--ntg-shadows-top-lg` | `0px -12px 16px -4px rgba(0,0,0,0.1)` | แผงที่เลื่อนขึ้นจากขอบล่าง |
| `shadows/top/xl` | `--ntg-shadows-top-xl` | `0px -20px 24px -4px rgba(0,0,0,0.1)` | แผงซ้อนที่ดึงขึ้นจากขอบล่างเต็มจอ |
| `shadows/center/xs` | `--ntg-shadows-center-xs` | `0px 0px 4px 0px rgba(0,0,0,0.05)` | ปุ่มลากแถบเลื่อน หัวลูกศรคำแนะนำลอย |
| `shadows/center/sm` | `--ntg-shadows-center-sm` | `0px 0px 4px 2px rgba(0,0,0,0.05)` | ตาราง กริด การ์ดเงารอบด้าน |
| `shadows/center/md` | `--ntg-shadows-center-md` | `0px 0px 8px 2px rgba(0,0,0,0.1)` | ของลอยรอบด้านขนาดกลาง ใช้น้อย |
| `shadows/center/lg` | `--ntg-shadows-center-lg` | `0px 0px 16px 4px rgba(0,0,0,0.1)` | ของลอยรอบด้านขนาดใหญ่ ใช้น้อย |
| `shadows/center/xl` | `--ntg-shadows-center-xl` | `0px 0px 24px 8px rgba(0,0,0,0.1)` | ของลอยรอบด้านขนาดใหญ่มาก ใช้น้อย |
| `background-blur/xs` | `--ntg-effect-background-blur-xs` | `4px` | แถบทับเนื้อหาที่ยังต้องอ่านข้างหลังได้ |
| `background-blur/sm` | `--ntg-effect-background-blur-sm` | `8px` | แถบนำทางแบบโปร่ง |
| `background-blur/md` | `--ntg-effect-background-blur-md` | `16px` | ฉากหลังกล่องซ้อนหน้าจอขนาดกลาง |
| `background-blur/lg` | `--ntg-effect-background-blur-lg` | `24px` | ฉากหลังกล่องซ้อนหน้าจอขนาดใหญ่ |
| `background-blur/xl` | `--ntg-effect-background-blur-xl` | `40px` | ตัดเนื้อหาด้านหลังออกจากสายตาเกือบหมด |
| `focused-ring/brand` | `--ntg-focused-ring-brand` | `0px 0px 0px 4px rgba(30,88,242,0.2)` | ปุ่มหลักและลิงก์ |
| `focused-ring/default` | `--ntg-focused-ring-default` | `0px 0px 0px 4px rgba(71,84,103,0.1)` | ปุ่มและช่องกรอกโทนกลาง |
| `focused-ring/error` | `--ntg-focused-ring-error` | `0px 0px 0px 4px rgba(217,45,32,0.2)` | ช่องกรอกผิด ปุ่มลบ |
| `focused-ring/warning` | `--ntg-focused-ring-warning` | `0px 0px 0px 4px rgba(202,133,4,0.2)` | สถานะเตือนให้ระวัง |
| `focused-ring/success` | `--ntg-focused-ring-success` | `0px 0px 0px 4px rgba(3,152,85,0.2)` | สถานะทำสำเร็จ |

### 4.3 ไฟล์ที่เกี่ยวข้อง

| Path | หน้าที่ |
|---|---|
| `tokens/tokens.json/shadows.json` | ต้นทางของเงาและวงแหวนโฟกัส 16 ตัว มาจาก Figma Effect Styles |
| `tokens/tokens.json/primitive.json` | ต้นทางของค่าความเบลอ 5 ระดับ |
| `tokens/output/css/variables.css` | ผลลัพธ์หลัง build พร้อมคอมเมนต์บอกการใช้งานของแต่ละตัว |
| `tokens/output/js/tokens.mjs` | ผลลัพธ์ฝั่ง JS สำหรับงานที่ต้องอ่านค่าในโค้ด |
| Figma หน้า 05 Effect | `05 Effect Documentation` `Elevation Principle` `Effect Token` Component Previews 3 ชุด |

## 5. ข้อควรระวังและปัญหาที่พบบ่อย (Constraints)

| # | ข้อควรระวัง | เหตุผล / วิธีปฏิบัติ |
|---|---|---|
| 1 | ห้ามใส่เงาแบบพิมพ์ค่าเอง | ค่าที่พิมพ์เองจะไม่เปลี่ยนตามเวลาระบบปรับค่า และตรวจจับย้อนหลังยาก ให้ผูกสไตล์เสมอ เหมือนกฎห้ามใช้สีดิบ |
| 2 | สร้าง component ใหม่ต้องกำหนดเอฟเฟคให้ด้วยทุกครั้ง | ดูของเดิมก่อนจาก description ถ้ามีที่เหมาะให้ใช้ตัวนั้นแล้วเติมชื่อ component ลง description ถ้าไม่มีจริงต้องขออนุมัติก่อนสร้าง |
| 3 | ชื่อเงายึดตามขนาด ไม่ใช่ตามหน้าที่ | ระบบเราใช้ปนกันสองแบบ และ Figma ไม่มีระบบชื่อย่อสำหรับเอฟเฟคเหมือนตัวแปรสี จึงเขียนหน้าที่ไว้ใน description แทน |
| 4 | ยังเหลือ 56 จุดที่ผูกสไตล์รุ่นเก่า | เป็น remote style จากไฟล์ไลบรารีอื่นและถูกล็อกอยู่ในอินสแตนซ์ แก้จากไฟล์นี้ไม่ได้ ต้องไปแก้ที่ไฟล์ต้นทาง |
| 5 | ค่าขนาดของเงาผูกตัวแปรทั้งหมด | ระยะ ความเบลอ และการกระจาย ผูกกับ `size/effect/*` ในกลุ่ม primitive ครบทุกตัว แก้ค่ากลางแล้วเงาเปลี่ยนตาม |
| 6 | โหมดมืดยังไม่มีแผนทำเอฟเฟค | บนพื้นมืดเงาแทบมองไม่เห็น ระบบใหญ่หลายเจ้าเปลี่ยนไปใช้ความสว่างของพื้นผิวแทน ซึ่งต้องรื้อชั้นสีทั้งชุด จึงพักไว้ก่อน |
| 7 | เงาสองชั้นและเงาแบบกดลงในกรอบยังไม่ทำ | เคยลองทำเงาสองชั้นแล้วตัดสินว่ายังไม่เอา เพราะเพิ่มความซับซ้อนโดยที่ตาแยกความต่างได้ยากในงานจริง |
| 8 | วงแหวนโฟกัสห้ามปิดทิ้ง | เป็นทางเดียวที่ผู้ใช้คีย์บอร์ดจะรู้ตำแหน่งตัวเอง ถ้าวงแหวนทับของข้างเคียงให้เว้นระยะเพิ่ม ไม่ใช่ลบวงแหวนออก |
