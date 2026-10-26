---
title: "18 Tabs Nation Design System"
description: "แท็บ 4 ชุด รวม 350 แบบ คือ segmented-tab 160 แบบ underline-tab 160 แบบ และกล่องครอบอีกทรงละ 15 แบบ พร้อมตัวแปร 53 ตัว"
target_audience: ["UI/UX Designer", "Frontend Developer", "Design System Maintainer"]
version: "1.0.0"
last_updated: "2026-10-01"
status: "active"
sources_of_truth:
  figma_page: "18 Tabs (ไฟล์ QgmoT5) ต้นฉบับอยู่ในชุด segmented-tab, underline-tab, segmented-tab-group และ underline-tab-group"
  scale_spec: "tokens/scale/tabs.mjs"
  research: "docs/research/tabs-component.md"
---

# 18 Tabs Nation Design System

## 1. ข้อมูลควบคุม (Metadata)

| ฟิลด์ | รายละเอียด |
|---|---|
| **Title** | 18 Tabs (แท็บ) |
| **Description** | แท็บสลับเนื้อหาภายในหน้าเดียว 2 ทรง คือ `segmented-tab` ทรงกล่องติดกันเป็นแถบ และ `underline-tab` ทรงขีดเส้นใต้ แต่ละทรงมีกล่องครอบของตัวเองสำหรับประกอบเป็นแถบแท็บจริง |
| **Target Audience** | Designer เลือกทรงและขนาด, Developer ทำพฤติกรรมแป้นพิมพ์และพื้นที่แตะให้ตรงมาตรฐาน, Maintainer ดูแลสูตรและด่านตรวจ |
| **Source of Truth** | **Figma หน้า 18 Tabs** และสูตรที่ `tokens/scale/tabs.mjs` |
| **Version / Updated** | 1.0.0 (2026-10-01) |

## 2. วัตถุประสงค์ (Objective & Business Logic)

- **เป้าหมาย:** ให้ทุกหน้าจอที่ต้องสลับเนื้อหาในที่เดียวกัน ใช้แท็บชุดเดียวกัน ทั้งขนาด สถานะ พื้นที่แตะ และพฤติกรรมแป้นพิมพ์
- **Business logic:** แท็บใช้เมื่อเนื้อหาหลายชุด **อยู่ในระดับเดียวกัน** และผู้ใช้ดูทีละชุด เช่นหน้าข่าวที่สลับระหว่างล่าสุด ยอดนิยม และที่เกี่ยวข้อง ถ้าเนื้อหาเป็นชุดเดียวแล้วแค่กรองให้แคบลง นั่นคือตัวกรอง ไม่ใช่แท็บ
- **คุณค่า:** ความสูงอ้างสเกลความสูงตัวควบคุมกลางชุดเดียวกับปุ่ม ช่องกรอก สวิตช์ และแถบเลื่อน จึงวางแท็บคู่ปุ่มเรียงลำดับในแถวเดียวกันได้พอดีโดยไม่ต้องจัดเอง

## 3. ขั้นตอนการใช้งาน (Workflow)

### สำหรับ Designer
1. ถามก่อนว่าเนื้อหาแต่ละชุดอยู่ระดับเดียวกันจริงไหม ถ้าเป็นการกรองข้อมูลชุดเดิมให้ใช้ตัวกรองแทน เหตุผลเต็มอยู่ในเอกสาร `Tab Usage` บนหน้า 18
2. เลือกทรง **`underline-tab` เป็นค่าเริ่มต้น** ใช้กับการสลับเนื้อหาหลักของหน้า ส่วน `segmented-tab` ใช้กับชุดตัวเลือกสั้นที่อยู่ในกล่องหรือในแผงตั้งค่า
3. เลือกขนาด `md` เป็นค่าเริ่มต้น ใช้ `sm` ในแผงที่หนาแน่น และ `lg` หรือ `xl` เมื่อแท็บเป็นตัวนำของหน้า
4. **ขนาด `xs` ใช้เฉพาะแผงตั้งค่าที่หนาแน่นบนเดสก์ท็อป ห้ามใช้บนมือถือ** เพราะตัวอักษรเหลือ 10px และกล่องสูง 24 ซึ่งต่ำกว่าเกณฑ์พื้นที่แตะมาก
5. ประกอบแถบแท็บจากกล่องครอบ (`segmented-tab-group` หรือ `underline-tab-group`) ไม่ใช่เอาชิ้นเดี่ยวมาวางเรียงเอง เปิดปิดจำนวนแท็บด้วยคุณสมบัติ `tab-3` ถึง `tab-10`
6. **แท็บปัจจุบันคือ `current=true` ไม่ใช่ `state=focused`** สองอย่างนี้คนละเรื่อง `current` คือแท็บที่เปิดค้างอยู่ ส่วน `focused` คือจุดที่แป้นพิมพ์อยู่ ณ ขณะนั้น ซ้อนกันได้
7. ค่า `icon=unread` คือจุดแจ้งเตือนว่ามีของใหม่ยังไม่ได้อ่าน ไม่ใช่จุดบอกสถานะ **ห้ามใช้จุดนี้สื่อความหมายด้วยสีอย่างเดียว** ต้องมีข้อความกำกับด้วยเสมอ
8. **สถานะชี้ลากเส้น interaction ไว้แล้วในไฟล์ออกแบบ** ทุกแบบที่เป็น `state=default` มีเส้น While hovering ไปหาแบบ `state=hover` ของตัวเอง รวม 80 เส้น เอาไปทำต้นแบบกดได้เลยโดยไม่ต้องลากเพิ่ม **ถ้าเพิ่มแบบใหม่ต้องลากเส้นให้ด้วยทุกครั้ง**

### สำหรับ Developer
1. ประกาศตามรูปแบบ WAI-ARIA Tabs คือ `role="tablist"` ที่กล่องครอบ `role="tab"` ที่แต่ละแท็บ และ `role="tabpanel"` ที่แผงเนื้อหา ผูกกันด้วย `aria-controls` และ `aria-labelledby`
2. **ใช้ manual activation** คือลูกศรย้ายโฟกัสอย่างเดียว ต้องกด Enter หรือ Space จึงสลับเนื้อหา ตั้งค่านี้เพราะแท็บเว็บข่าวดึงข้อมูลชุดใหม่ทุกครั้งที่สลับ ถ้าสลับอัตโนมัติ การเดินลูกศรผ่าน 10 หมวดจะยิง 10 คำขอ
3. แป้นพิมพ์ตามมาตรฐาน คือ ลูกศรซ้ายขวาย้ายโฟกัสทีละแท็บและวนรอบ Home และ End ไปแท็บแรกและแท็บสุดท้าย
4. **แท็บเดียวที่อยู่ในลำดับ Tab ของหน้าคือแท็บปัจจุบัน** แท็บอื่นตั้ง `tabindex="-1"` ไม่งั้นผู้ใช้แป้นพิมพ์ต้องกด Tab ผ่านทุกแท็บกว่าจะถึงเนื้อหา
5. **พื้นที่แตะไม่ผ่านเกณฑ์ 44 แม้ขนาด `md`** ให้ซ้อนชั้นมองไม่เห็นที่ `min-height: 44px` เฉพาะ `@media (pointer: coarse)` ห้ามยืดความสูงของตัวแท็บเอง เพราะจะไปทับแผงเนื้อหาด้านล่างหรือหัวข้อด้านบน
6. ความหนาเส้นมี 3 ตัวแยกกัน คือ `--ntg-tab-indicator` (2) ขีดใต้แท็บปัจจุบัน `--ntg-tab-rail` (1) เส้นรางที่แท็บอื่นวางอยู่ และ `--ntg-tab-divider` (1) เส้นแบ่งระหว่างแท็บของทรงกล่อง **ห้ามรวมเป็นตัวเดียว** ค่าเท่ากันตอนนี้แต่คนละหน้าที่
7. **สถานะโฟกัสบอกด้วยพื้นหลังสีแบรนด์ ไม่ใช่วงแหวน** (ตัดสิน 2026-10-02) ใช้ `--ntg-color-background-brand-primary-hover` คู่กับข้อความ `--ntg-color-text-brand-primary` ทั้งสองทรง ทรงขีดเส้นใต้เพิ่มขีดใต้สีแบรนด์ด้วย **แผงเนื้อหายังใช้วงแหวน `--ntg-focused-ring-default` ตามปกติ** เพราะเป็นพื้นที่ใหญ่ที่ไม่ได้วางติดกับอะไร
8. **ความกว้างมาจากเนื้อหา** ไม่มี token ความกว้างโดยตั้งใจ ห้ามตรึงความกว้างแท็บ
9. แท็บล้นจอให้เลื่อนแนวนอนได้ และบนเดสก์ท็อปจึงค่อยโชว์ปุ่มลูกศรซ้ายขวา

### สำหรับการแก้ค่า
1. แก้ที่ `tokens/scale/tabs.mjs` ที่เดียว แล้วรัน `npm run tokens:build`
2. ด่านตรวจ 5 ข้อในไฟล์จะหยุดการสร้างไฟล์ทันทีถ้าค่าไม่สอดคล้องกันเอง
3. เอาค่าที่ได้ไปอัปเดตตัวแปรในไฟล์ออกแบบให้ตรงกัน แล้วอัปเดตตารางในเอกสาร `Tab Token` กับ `Tab Space`
4. ตรวจว่าสองฝั่งไม่หลุดกันด้วย `npm run tokens:verify`

## 4. โครงสร้างข้อมูลและ UI (Structure)

### 4.1 แกนของชุด

| ชุด | แกน | ค่า | จำนวนแบบ |
|---|---|---|---:|
| `segmented-tab` | `current` คูณ `icon` คูณ `size` คูณ `state` | 2 คูณ 4 คูณ 5 คูณ 4 | 160 |
| `underline-tab` | `current` คูณ `icon` คูณ `size` คูณ `state` | 2 คูณ 4 คูณ 5 คูณ 4 | 160 |
| `segmented-tab-group` | `icon` คูณ `size` | 3 คูณ 5 | 15 |
| `underline-tab-group` | `icon` คูณ `size` | 3 คูณ 5 | 15 |

ค่าของแต่ละแกน

| แกน | ค่า |
|---|---|
| `current` | `false` `true` |
| `icon` | `false` `leading` `unread` `only` |
| `size` | `xs` `sm` `md` `lg` `xl` |
| `state` | `default` `hover` `focused` `disabled` |

### 4.2 คุณสมบัติที่ไม่คูณจำนวนแบบ

| คุณสมบัติ | ชนิด | อยู่ที่ | หน้าที่ |
|---|---|---|---|
| `text` | TEXT | ชิ้นเดี่ยวทั้งสองทรง | ข้อความบนแท็บ |
| `tab-3` ถึง `tab-10` | BOOLEAN | กล่องครอบทั้งสองทรง | เปิดปิดแท็บลำดับที่ 3 ถึง 10 กล่องครอบมีแท็บเสมอ 2 อันแรก |

### 4.3 สูตรขนาด

| มิติ | base | step | xs | sm | md | lg | xl |
|---|---:|---:|---:|---:|---:|---:|---:|
| ความสูง | อ้างสเกลกลาง | | 24 | 32 | 40 | 48 | 56 |
| ระยะขอบซ้ายขวา | 8 | 4 | 8 | 12 | 16 | 20 | 24 |
| ระยะขอบบนล่าง | ผลลัพธ์ | (ความสูง ลบ ความสูงบรรทัด) หารสอง | 4 | 5 | 8 | 11 | 14 |
| ระยะขอบแบบไอคอนอย่างเดียว | ผลลัพธ์ | (ความสูง ลบ ไอคอน) หารสอง | 4 | 7 | 10 | 13 | 16 |
| ช่องไฟ | 4 | 2 | 4 | 6 | 8 | 10 | 12 |
| ไอคอน | 16 | 2 | 16 | 18 | 20 | 22 | 24 |
| จุดแจ้งเตือน | 6 | 1 | 6 | 7 | 8 | 9 | 10 |
| ขีดใต้แท็บปัจจุบัน | คงที่ | | 2 | 2 | 2 | 2 | 2 |
| เส้นรางของแท็บอื่น | คงที่ | | 1 | 1 | 1 | 1 | 1 |
| เส้นแบ่งระหว่างแท็บ | คงที่ | | 1 | 1 | 1 | 1 | 1 |
| มุมโค้งกล่องครอบทรงกล่อง | 4 | 1 | 4 | 5 | 6 | 7 | 8 |

ความสูงอ้าง `CONTROL_HEIGHT` ตรง ๆ ไม่พิมพ์ค่าซ้ำ ถ้าความสูงปุ่มขยับ แท็บขยับตาม ส่วนมุมโค้งของกล่องครอบอ้างสูตร `RADIUS_FORMULA.tab` ในสเกลกลาง เพราะมุมโค้งเป็นบุคลิกของแบรนด์ที่ต้องขยับพร้อมกันทั้งระบบ

### 4.4 ตัวอักษรของแต่ละขนาด

| ขนาด | preset | ขนาดตัวอักษร | ความสูงบรรทัด | ระยะขอบบนล่างที่ได้ |
|---|---|---:|---:|---:|
| xs | `label/xs` | 10 | 16 | 4 |
| sm | `label/sm` | 12 | 22 | 5 |
| md | `label/md` | 14 | 24 | 8 |
| lg | `label/lg` | 16 | 26 | 11 |
| xl | `label/xl` | 18 | 28 | 14 |

ระยะขอบบนล่างไม่เป็นสูตร base บวก step โดยตั้งใจ เพราะความสูงบรรทัดของ `label/*` เองไม่ได้เรียงเป็นขั้นเท่ากัน

### 4.5 ตัวแปรและ token

| ชื่อใน Figma | ชื่อในโค้ด | จำนวน |
|---|---|---:|
| `tab/height/{ขนาด}` | `--ntg-tab-height-{ขนาด}` | 5 |
| `tab/padding/x/{ขนาด}` | `--ntg-tab-padding-x-{ขนาด}` | 5 |
| `tab/padding/y/{ขนาด}` | `--ntg-tab-padding-y-{ขนาด}` | 5 |
| `tab/icon-only-padding/{ด้าน}/{ขนาด}` | `--ntg-tab-icon-only-padding-{ด้าน}-{ขนาด}` | 20 |
| `tab/gap/{ขนาด}` | `--ntg-tab-gap-{ขนาด}` | 5 |
| `tab/icon/{ขนาด}` | `--ntg-tab-icon-{ขนาด}` | 5 |
| `tab/unread/{ขนาด}` | `--ntg-tab-unread-{ขนาด}` | 5 |
| `tab/indicator` | `--ntg-tab-indicator` | 1 |
| `tab/rail` | `--ntg-tab-rail` | 1 |
| `tab/divider` | `--ntg-tab-divider` | 1 |
| `tab/radius/group/{ขนาด}` | `--ntg-tab-radius-group-{ขนาด}` | 5 |

### 4.6 สีของแต่ละสถานะ

ทรงขีดเส้นใต้

| current | state | พื้นหลัง | เส้นล่าง | ข้อความ |
|---|---|---|---|---|
| false | default | `background/general/primary` | `border/general/primary` | `text/general/section-heading` |
| false | hover | `background/general/primary-hover` | `border/general/primary-hover` | `text/general/heading` |
| false | focused | `background/brand/primary-hover` | `border/brand/solid` | `text/brand/primary` |
| false | disabled | `background/general/primary` | `border/general/disabled` | `text/general/disabled-subtle` |
| true | default | `background/general/primary` | `border/brand/solid` | `text/brand/primary` |
| true | hover | `background/general/primary-hover` | `border/brand/solid` | `text/brand/primary` |
| true | focused | `background/brand/primary-hover` | `border/brand/solid` | `text/brand/primary` |
| true | disabled | `background/general/primary` | `border/general/disabled` | `text/general/disabled-subtle` |

**สถานะ `focused` บอกด้วยพื้นหลังสีแบรนด์กับข้อความสีแบรนด์ ไม่ใช่วงแหวน** (ตัดสิน 2026-10-02) ทั้งสองทรงใช้พื้น `background/brand/primary-hover` เหมือนกัน ทรงขีดเส้นใต้เพิ่มขีดใต้สีแบรนด์ด้วย ส่วนทรงกล่องคงเส้นขอบเดิม

ทรงกล่อง

| current | state | พื้นหลัง | เส้นแบ่ง | ข้อความ |
|---|---|---|---|---|
| false | default | `background/general/primary` | `border/general/primary` | `text/general/section-heading` |
| false | hover | `background/general/primary-hover` | `border/general/primary-hover` | `text/general/heading` |
| false | focused | `background/brand/primary-hover` | `border/general/primary` | `text/brand/primary` |
| false | disabled | `background/general/primary` | `border/general/disabled` | `text/general/disabled-subtle` |
| true | default | `background/general/secondary` | `border/general/primary` | `text/general/section-heading` |
| true | hover | `background/general/secondary-hover` | `border/general/primary-hover` | `text/general/heading` |
| true | focused | `background/brand/primary-hover` | `border/general/primary` | `text/brand/primary` |
| true | disabled | `background/general/tertiary` | `border/general/disabled` | `text/general/disabled-subtle` |

**สีไอคอนและจุดแจ้งเตือน**

| state | ไอคอน | จุดแจ้งเตือน |
|---|---|---|
| default | `icon/general/quaternary` | `foreground/system/success-primary` |
| hover | `icon/general/quaternary` | `foreground/system/success-secondary-hover` |
| focused | `icon/general/quaternary` | `foreground/system/success-primary` |
| disabled | `icon/general/disable-subtle` | `foreground/general/disable-subtle` |

ไอคอนจางลงพร้อมข้อความเฉพาะตอนปิดใช้งาน (ตัดสิน 2026-10-01) ส่วนตอนชี้ไอคอนไม่เปลี่ยนสี ต่างจากข้อความที่เข้มขึ้น เพราะไอคอนในแท็บทำหน้าที่ประกอบ ไม่ใช่ตัวนำสายตา

### 4.7 ไฟล์ที่เกี่ยวข้อง

| Path | หน้าที่ |
|---|---|
| `tokens/scale/tabs.mjs` | สูตรขนาด ค่าคงที่ ด่านตรวจ 5 ข้อ และสมการปิด |
| `tokens/scale/global-scale.config.mjs` | สเกลความสูงตัวควบคุมกลางและสเกลมุมโค้งที่แท็บอ้างถึง |
| `tokens/output/css/variables.css` | ตัวแปร CSS ที่สร้างออกมา |
| `docs/research/tabs-component.md` | งานวิจัยที่ใช้ตัดสินโครง |

## 5. ข้อจำกัดและข้อห้าม (Constraints)

- **ปรับไฟล์ออกแบบ 2026-10-26 จากท่อสร้าง CSS** underline-tab แบบ current=true icon=only สถานะ hover เคยหลุดเป็นเส้นใต้ border/general/primary-hover และไอคอน quaternary แก้ให้เหมือนแบบอื่น (brand/solid + icon/brand/primary) · segmented-tab แบบ current=true focused สีข้อความเคยเป็น text/brand/primary-hover แก้เป็น text/brand/primary ทั้ง 20 แบบ · เฟรมกลุ่ม underline-tab-group เคยมีเส้นขอบบน 1px ที่ระดับกลุ่ม เอาออกแล้ว 15 แบบ · ฝั่งเว็บ CSS ของหน้านี้สร้างจากไฟล์ออกแบบ (Tabs.base.css + ส่วนที่สร้าง) ความสูงแท็บตามเนื้อหาเหมือนไฟล์ ไม่ใช้ token tab/height แล้ว

- **ห้ามใช้แท็บแทนตัวกรอง** ถ้าทุกแท็บแสดงข้อมูลชุดเดียวกันแค่กรองให้แคบลง ให้ใช้ตัวกรอง เพราะโปรแกรมอ่านหน้าจอจะประกาศว่าเป็นแผงเนื้อหาคนละแผง ซึ่งไม่จริง
- **ห้ามใช้ `state=focused` แทนแท็บปัจจุบัน** ของเดิมในไฟล์เคยทำแบบนี้และแก้แล้วเมื่อ 2026-09-29
- **ห้ามใช้แท็บแบบไอคอนอย่างเดียวโดยไม่มีคำอธิบาย** ต้องมี `aria-label` และ tooltip เสมอ เพราะไอคอนลอยเดาความหมายไม่ออก
- **ห้ามทำตัวอักษรหนาขึ้นตอนเป็นแท็บปัจจุบัน** เพราะความกว้างจะขยับแล้วแท็บทั้งแถวเลื่อน ตอนนี้ใช้สีคู่กับขีดเส้นใต้เป็นสองสัญญาณซึ่งผ่านเกณฑ์อยู่แล้ว
- **ห้ามตรึงความกว้างแท็บ** ความกว้างมาจากเนื้อหา
- **ขนาด `xs` ห้ามใช้บนมือถือ** ตัวอักษร 10px เล็กกว่าที่ DS เจ้าใหญ่ทุกเจ้าใช้ และกล่องสูง 24 ต่ำกว่าเกณฑ์พื้นที่แตะมาก
- **ยังไม่มีสถานะกด (pressed)** ทั้งไฟล์ยังไม่มีชุดย่อยสถานะกดเลยสักหน้า ตามที่ตัดสินไว้เมื่อ 2026-09-24 ให้ทยอยทำตอนหยิบแต่ละหน้ามาแก้ดีไซน์
- **ยังไม่มีแบบแท็บแนวตั้ง** ถ้าต้องการต้องออกแบบใหม่ ไม่ใช่เอาแบบแนวนอนมาหมุน
