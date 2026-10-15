---
title: "Toggle / Switch Component research"
description: "เทียบ component สวิตช์เปิดปิดของ DS เจ้าใหญ่ 12 เจ้า จากไฟล์ต้นทางจริง พร้อมข้อเสนอปรับปรุงสวิตช์ของ NTGDS หน้า 14 Toggles"
research_date: "2026-09-01"
scope: "Material 3 (และ MUI), IBM Carbon, Shopify Polaris, Atlassian, Microsoft Fluent 2, GitHub Primer, Adobe Spectrum (S2), Ant Design, Salesforce Lightning, Uber Base Web, Apple HIG, GOV.UK, บวก News UK NewsKit, GitLab Pajamas, Open UI, WHATWG"
status: "draft รอตัดสิน"
owner: "ux-researcher"
---

# Research Toggle / Switch ของ Design System เจ้าใหญ่

**วันที่วิจัย:** 2026-09-01
**โจทย์:** ตรวจสอบและปรับปรุงสวิตช์ของ NTGDS หน้า 14 Toggles (ชุดขนาด, การผูกกับสเกลความสูงกลาง, สัดส่วนรางกับปุ่มกลม, ระยะเลื่อน, โครงสถานะ, พื้นที่แตะ, สวิตช์พร้อมข้อความ, กติกาเลือกใช้เทียบ checkbox, accessibility, เครื่องหมายในปุ่มกลม)

**ป้ายแหล่ง:** `[ทางการ]` = ไฟล์ต้นทางหรือเอกสารขององค์กรเอง `[กึ่งทางการ]` = พนักงานหรือชุมชนทางการพูดเอง `[แหล่งรอง]` = คนนอก `[คำนวณ]` = ผู้วิจัยคำนวณจากค่าในไฟล์ต้นทาง

> **วิธีเก็บข้อมูล:** ตัวเลขทุกตัวที่ไม่ได้กำกับว่ายืนยันไม่ได้ อ่านจาก **ไฟล์ต้นทางจริง** (GitHub raw หรือแพ็กเกจ npm ที่เผยแพร่แล้ว) ไม่ได้อ่านจากหน้าเว็บที่คนสรุปไว้ ตามบทเรียนใน [spacing-scale.md](spacing-scale.md) และ [input-component.md](input-component.md) ที่พบว่าเว็บกับโค้ดของเจ้าเดียวกันให้ค่าไม่ตรงกัน
>
> **หน้าเอกสารที่ประกอบด้วยสคริปต์** (m3.material.io และ developer.apple.com) ดึงเนื้อหาผ่านปลายทางข้อมูลที่หน้าเว็บนั้นเรียกใช้เอง จึงเป็นเนื้อหาทางการชุดเดียวกับที่หน้าเว็บแสดง
>
> **ของที่ยืนยันไม่ได้เขียนกำกับไว้ตรง ๆ** ในหัวข้อ 13 ไม่เดาแทน

---

## 1. สรุปคำตอบ 9 ประเด็น (อ่านหน้าเดียวจบ)

| # | ประเด็น | คำตอบสั้นจากข้อมูลจริง |
|---|---|---|
| 1 | ชุดขนาด และการผูกกับสเกลความสูงกลาง | มัธยฐาน **2 ขนาด** และคำตอบที่สำคัญที่สุดคือ **ไม่มีเจ้าไหนเลยที่เอาตัวสวิตช์ไปผูกกับสเกลความสูงของปุ่มและช่องกรอก** ทุกเจ้าให้สวิตช์มีชุดตัวแปรขนาดของตัวเอง **แต่เจ้าที่ทำดีที่สุดแยกเป็นสองชั้น** คือ Adobe Spectrum ที่ให้ **ภาพสวิตช์อยู่บนสเกลของตัวเอง (`switch-control-height-*`) ส่วนแถวที่กดได้ไปผูกกับสเกลกลาง (`switch-min-height` เท่ากับ `component-height-*`)** ซึ่งเป็นแบบอย่างที่ตรงกับโจทย์เราที่สุด ส่วนที่ชี้ขาดว่าไม่ควรผูกตัวสวิตช์คือ **IBM Carbon ซึ่งผูกความสูงปุ่มกับช่องกรอกด้วย mixin ตัวเดียวกัน กลับไม่ลากสวิตช์เข้ามา** (`_toggle.scss` ไม่ import `utilities/layout` เลย ต่างจาก `_button.scss` และ `_text-input.scss`) เจ้าที่เชื่อมบางส่วนมี Ant Design (`controlHeight / 2` เฉพาะขนาดเล็ก), Primer ฝั่ง Rails (แต่ฝั่ง React พิมพ์ค่าตายไว้ จึงหลุดจากกัน) และ Apple บน macOS ที่แนะนำ **mini** switch ในฟอร์มแบบกลุ่มเพื่อให้แถวสูงเท่ากัน |
| 2 | สัดส่วนรางต่อปุ่มกลม | ตลาดแตกเป็น **สองกลุ่มชัดเจน** กลุ่มกว้างเป็น 2 เท่าของความสูง **10 แถว** (Carbon, Fluent, Atlassian, Primer อย่างละ 2 ขนาด บวก Ant ขนาดปกติ บวก SLDS) กับกลุ่มราว 1.57 ถึง 1.70 **7 แถว** (Spectrum 2 ทั้ง 4 ขนาด, Material 3, Base Web รุ่นใหม่ 2 ขนาด) **2.00 คือค่าที่พบบ่อยที่สุด แต่กลุ่มแคบเป็นทรงที่ใหม่กว่า** ส่วนขนาดปุ่มกลม **แทบทุกเจ้าเขียนเป็นสูตร `ปุ่มกลม = ความสูงราง ลบ ระยะขอบใน คูณ 2` ไม่มีใครตั้งเป็นตัวเลขอิสระ** |
| 3 | ระยะเลื่อนและระยะขอบในราง | **ระยะเลื่อนเป็นผลลัพธ์ของสูตร ไม่ใช่ค่าที่ตั้งแยก** Material 3 เขียนตรง ๆ ว่า `ระยะเลื่อน = ความกว้างราง ลบ ความสูงราง` Fluent เขียน `ความกว้าง ลบ ปุ่มกลม ลบ 2` Ant เขียน `ความกว้าง ลบ ปุ่มกลม ลบ ระยะขอบใน คูณ 2` ส่วนระยะขอบใน **2 คือค่าที่ใช้กันมากที่สุด** (Fluent ผ่านเส้นขอบ 1px สองข้าง, Ant, Atlassian, SLDS) Carbon ใช้ 3 Base Web รุ่นใหม่ใช้ 4 Primer ใช้ 1 |
| 4 | โครงสถานะ | **ทุกเจ้าแยกสองแกนเหมือนกันหมด** คือแกนเปิดปิดเป็นบูลีน คูณกับแกนการโต้ตอบ ไม่มีเจ้าไหนยุบเป็นแกนเดียว สถานะที่ตลาดมีเกินเราคือ **pressed** (M3 ขยายปุ่มกลมเป็น 28, Ant ยืดปุ่มกลม 30 เปอร์เซ็นต์, Primer และ Fluent เปลี่ยนสี), **loading** (Ant, Primer, Atlassian, GitLab Pajamas) และ **read-only** (Carbon และ Spectrum) **และมีข้อที่คาดไม่ถึง IBM Carbon ไม่มีสถานะ hover เลย** ไล่ทั้งไฟล์ SCSS ไม่พบคำว่า hover มีแต่ `:focus` กับ `:active` ที่ให้วงแหวนเดียวกัน |
| 5 | พื้นที่แตะ | **สวิตช์แทบทุกเจ้าเตี้ยกว่าเกณฑ์ และเจ้าที่จริงจังจะขยายพื้นที่กดให้ใหญ่กว่าที่ตาเห็น** Material 3 ประกาศ `touch-target-size: 48px` เป็น token ของตัวเอง Base Web รุ่นใหม่เพิ่มระยะขอบใน `@media (pointer: coarse)` จนได้ 48 พอดีทั้งสองขนาด Primer สร้าง pseudo-element สูง 44 ใน `@media (pointer: coarse)` Fluent ขยายด้วย input ที่ซ่อนอยู่จนได้ 56 คูณ 36 ส่วน **Ant Design กับ Atlassian ไม่ขยายเลย** |
| 6 | สวิตช์พร้อมข้อความ | **วางข้อความไว้ท้ายสวิตช์เป็นค่าเริ่มต้น** (Fluent `after`, Base Web รุ่นใหม่ `right`, NewsKit) มี Primer ที่วางข้อความสถานะไว้หน้าสวิตช์ และ **ที่สำคัญที่สุด ทุกเจ้าที่มีคำอธิบายใต้หัวข้อ ทำเป็นคุณสมบัติหรือช่องเสียบของ component เดิม ไม่ได้แยกเป็นชุดที่สอง** มีเจ้าเดียวที่แยกชุดคือ Shopify Polaris และ **ชุดนั้นถูกประกาศเลิกใช้ พร้อมคำสั่งให้ไปประกอบเองจาก primitives** |
| 7 | toggle ต่างจาก checkbox อย่างไร | **เห็นตรงกันเกือบทั้งตลาด** สวิตช์ต้องมีผลทันที ห้ามใช้ในฟอร์มที่ต้องกดบันทึก Atlassian กับ Fluent เขียนตรงที่สุดถึงขั้นเอ่ยชื่อปุ่ม Submit และ Material 3 เขียนเป็นข้อห้ามพร้อมภาพประกอบ **แต่มีข้อมูลสวนทางที่ต้องรายงาน** คือ WHATWG กำลังเสนอ `<input type="checkbox" switch>` ที่ส่งค่าไปกับฟอร์มตามปกติ และ WebKit ปล่อยใช้แล้วใน Safari 17.4 **และ Apple HIG ไม่ได้พูดเรื่องผลทันทีเลย** เกณฑ์ของ Apple คือน้ำหนักทางสายตากับลำดับชั้น |
| 8 | accessibility | **role แตกเป็น 4 สาย** `role="switch"` บน input (M3, Fluent, Base Web ใหม่), `role="switch"` บนปุ่ม (Ant, Polaris), `aria-pressed` บนปุ่ม (Primer) และ checkbox เปล่า (Atlassian, SLDS, Base Web เก่า) ส่วนกติกาที่ตรงกันคือ **ต้องมีชื่อที่โปรแกรมอ่านหน้าจออ่านได้เสมอ** และ **WAI-ARIA APG เขียนกำกับว่าป้ายกำกับห้ามเปลี่ยนตามสถานะ** ซึ่งเป็นข้อที่ทีมส่วนใหญ่พลาด เรื่องภาพเคลื่อนไหว **Fluent, Ant Design, Primer และ Carbon จัดการ `prefers-reduced-motion` จริงในไฟล์ต้นทาง** ส่วน **Material 3, Atlassian, Base Web และ Spectrum ไม่จัดการเลย** |
| 9 | ไอคอนหรือเครื่องหมายในปุ่มกลม | **ส่วนใหญ่ไม่มี** Open UI สำรวจ 44 ระบบพบว่า 70 เปอร์เซ็นต์ไม่มีเนื้อหาข้างในเลย มีเนื้อหาในราง 30 เปอร์เซ็นต์ และมีเนื้อหาในปุ่มกลม 18 เปอร์เซ็นต์ **ต้องแยกให้ชัดว่าอยู่ในปุ่มกลมหรืออยู่ในราง** ในปุ่มกลมมี M3 (เครื่องหมายถูกกับกากบาท), Carbon (เครื่องหมายถูก **เฉพาะขนาดเล็ก**), Base Web รุ่นใหม่ (เครื่องหมายถูก เปิดเอง) ส่วนในรางมี Atlassian (ถูกกับกากบาท), Primer (วงกลมกับขีด), Ant Design (ข้อความ) และ **SLDS (เครื่องหมายถูกวาดบนรางฝั่งซ้าย ไม่ได้อยู่ในปุ่มกลม)** และ **Material 3 ห้ามใส่ข้อความในรางอย่างชัดเจน ซึ่งขัดกับสิ่งที่ Ant Design ทำเป็นฟีเจอร์** ส่วน **Adobe Spectrum ไม่มีทั้งไอคอนและข้อความ** ใช้ตำแหน่งกับขนาดปุ่มกลมที่โตขึ้นตอนเปิดแทน |

---

## 2. สถานะปัจจุบันของ NTGDS (ตัวเลขจากการวัดไฟล์ Figma หน้า 14 Toggles เมื่อ 2026-09-01)

### 2.1 ภาพรวม 2 ชุด

| ประเด็น | สถานะ |
|---|---|
| จำนวนชุดและแบบ | 2 ชุด รวม **32 แบบ** คือ `Toggle` 16 แบบ (ตัวสวิตช์ล้วน) และ `Text Toggle` 16 แบบ (สวิตช์พร้อมหัวข้อและคำอธิบาย) |
| การใช้งานจริง | `Toggle` ใช้ 19 จุด `Text Toggle` ใช้ 6 จุด |
| คุณสมบัติของทั้งสองชุด | `Size` 2 ค่า (sm, md), `State` เป็นคุณสมบัติเดียว 4 ค่า (Default, Hover, Focus, Disabled), `Active` เปิดปิด และชุดที่สองมีตัวเปิดปิดของข้อความหัวข้อกับคำอธิบาย |
| ขนาด `Toggle` | sm = 36 คูณ 20 และ md = 44 คูณ 24 |
| ขนาด `Text Toggle` | sm = 152 คูณ 66 และ md = 175 คูณ 48 |
| ปุ่มกลมข้างใน | sm = 16 และ md = 20 |
| ระยะขอบในราง | 2 ทั้งสองขนาด |
| สูตรขนาดในโค้ด | **ไม่มีไฟล์ `tokens/scale/toggle.mjs`** และ `tokens/scale/index.mjs` ลงทะเบียนไว้ 9 component ไม่มี toggle |
| token ในโค้ด | `tokens/tokens.json/component.json` ค้นคำว่า toggle ได้ **0 รายการ** สวิตช์ไม่มีตัวแปรของตัวเองเลย |
| effect style | มี `shadows/bottom/sm` ที่ `$description` เขียนอ้างถึง toggle ไว้แล้ว แต่ยังไม่ได้ตรวจว่า component ผูกจริงหรือไม่ |
| สี | ผูกตัวแปรครบแล้ว ไม่มีสีดิบ และไม่มีไอคอนชุดเก่า |
| เอกสารประจำหน้า | ยังไม่มี `docs/14-toggles.md` (มีถึง `13-input.md`) |

### 2.2 ความผิดปกติที่วัดเจอ และสาเหตุ

**เรื่องที่ 1 ขนาดเล็กสูงกว่าขนาดใหญ่**

`Text Toggle` ขนาด sm สูง 66 ส่วน md สูง 48 ซึ่งกลับทางกัน สาเหตุคือ **ความกว้างทั้งก้อนถูกตั้งเป็นค่าตายตัว** ที่ 152 กับ 175 ทำให้ที่ว่างของคำอธิบายเหลือแค่ 106 กับ 123 ข้อความเดียวกันจึงตัดเป็น 2 บรรทัดเฉพาะขนาดเล็ก ความสูงที่ต่างกันจึงไม่ใช่การตัดสินใจเรื่องขนาด แต่เป็นผลข้างเคียงของการตั้งความกว้างตายตัว

**เรื่องที่ 2 ระยะเยื้องของคำอธิบายผิด 2px ที่ขนาดเล็ก**

ระยะเยื้องของคำอธิบายพิมพ์มือไว้ที่ 46 กับ 52 แต่ค่าที่ถูกต้องคือ ความกว้างสวิตช์ บวก ระยะห่าง ซึ่งได้ 44 กับ 52 แปลว่า **ขนาดเล็กผิดอยู่ 2px** ขนาดใหญ่ถูกอยู่แล้ว อาการนี้เป็นอาการเดียวกับที่เจอในช่องกรอก คือค่าที่พิมพ์มือจะเลื่อนออกจากค่าที่คำนวณได้เสมอเมื่อไม่มีสูตรคุม

**เรื่องที่ 3 สัดส่วนรางไม่คงที่ข้ามขนาด**

| ขนาด | ราง | สัดส่วนกว้างต่อสูง | ปุ่มกลม | สัดส่วนปุ่มกลมต่อความสูงราง | ระยะขอบใน | ระยะเลื่อนที่คำนวณได้ |
|---|---|---|---|---|---|---|
| sm | 36 คูณ 20 | 1.80 | 16 | 0.80 | 2 | 16 |
| md | 44 คูณ 24 | 1.83 | 20 | 0.83 | 2 | 20 |

ปุ่มกลมกับระยะขอบในของเราตรงกับสูตรที่ตลาดใช้พอดี (`ปุ่มกลม = ความสูง ลบ 4`) **แต่สัดส่วนความกว้างไม่คงที่ข้ามขนาด** 1.80 กับ 1.83 ซึ่งเป็นอาการของการพิมพ์ความกว้างมือทีละขนาดโดยไม่มีสูตร

### 2.3 ค่าอ้างอิงของเราที่ต้องใช้ตอนตัดสิน

- `CONTROL_HEIGHT` ที่ [`tokens/scale/global-scale.config.mjs`](../../tokens/scale/global-scale.config.mjs) base 24 step 8 ให้ 24, 32, 40, 48, 56
- ปุ่มเปิดครบ 5 ขนาด ส่วนช่องกรอกเปิด 3 ขนาด (32, 40, 48)
- **บรรทัดฐานที่เพิ่งตั้งเองสองอัน** อวาตาร์ **ไม่รวมสูตรกับปุ่ม** เพราะไม่ได้วางในแถวเดียวกันและตลาดไม่ผูก (11 ใน 12 เจ้า) ส่วนช่องกรอก **รวมสูตร** เพราะวางในแถวเดียวกับปุ่มจริงและตลาดผูก 4 เจ้าบวกอีก 2 ที่เขียนเป็นกฎ
- text preset ที่มีอยู่แล้ว `body/sm` 14 บน 24, `body/md` 16 บน 26, `label/sm` 12 บน 22, `label/md` 14 บน 24, `meta/helper` 12 บน 22
- `docs/component-inventory-research.md` §8 เคยร่างกายวิภาคสวิตช์ไว้แล้วเป็น ราง, ปุ่มกลม, ไอคอนในปุ่มกลม, วงแหวนโฟกัส

---

## 3. ชุดขนาด และคำถามที่สำคัญที่สุด ผูกกับสเกลความสูงกลางหรือไม่

### 3.1 ตารางรวมทุกเจ้า

| เจ้า | จำนวนขนาด | ราง กว้างคูณสูง | ปุ่มกลม | ระยะขอบใน | ผูกกับสเกลความสูงของปุ่มและช่องกรอกไหม |
|---|---|---|---|---|---|
| Material 3 | 1 | 52 คูณ 32 | 16 ตอนปิด, 24 ตอนเปิด, 24 เมื่อมีไอคอน, 28 ตอนกด | เส้นขอบราง 2 (ระยะขอบในเป็นผลลัพธ์ 8, 4, 2) | **ไม่** ค่าตายใน token ของ component เอง ไม่มีสเกลความสูงกลางในระบบ |
| MUI (ยังเป็น Material 2) | 2 | medium 34 คูณ 14, small 26 คูณ 10 | 20 และ 16 (ล้นออกนอกราง) | ล้นออกนอกราง | **ไม่** ค่าตายทั้งหมด |
| IBM Carbon | 2 | md 48 คูณ 24, sm 32 คูณ 16 | 18 และ 10 | 3 | **ไม่** ทั้งที่ Carbon ผูกปุ่มกับช่องกรอกด้วย mixin ตัวเดียวกัน |
| Microsoft Fluent 2 | 2 | medium 40 คูณ 20, small 32 คูณ 16 | 18 และ 14 | 2 (เส้นขอบ 1px สองข้าง) | **ไม่** ค่าคงที่ระดับไฟล์ และคอมเมนต์เขียนว่ามาจากไฟล์ออกแบบ |
| Ant Design | 2 | ปกติ 44 คูณ 22, small 28 คูณ 16 (เป็นความกว้างต่ำสุด ยืดได้) | 18 และ 12 | 2 | **ครึ่งเดียว** ขนาดปกติมาจาก `fontSize` คูณ `lineHeight` (แนวตัวอักษร) ส่วนขนาดเล็กมาจาก `controlHeight / 2` |
| Atlassian | 2 | regular 32 คูณ 16, large 40 คูณ 20 (พื้นที่คลิกจริง 40 คูณ 24 และ 48 คูณ 28) | 12 และ 16 | 2 | **ไม่** แต่ยืมค่าจาก **สเกลระยะห่าง** `--ds-space-400/500/200/250` |
| GitHub Primer | 2 | medium 64 คูณ 32, small 48 คูณ 24 | กว้าง 50 เปอร์เซ็นต์ของราง ทรงสี่เหลี่ยมมุมมน | 1 | **ครึ่งเดียว** ฝั่ง Rails อ้าง `--control-medium-size` (32) และ `--control-xsmall-size` (24) แต่ **ฝั่ง React พิมพ์ 32 กับ 24 ตายไว้** |
| Adobe Spectrum (S1) | 4 (S, M, L, XL) คูณ เดสก์ท็อป และ สัมผัส | M 26 คูณ 14 (สัมผัส 36 คูณ 18) | เท่ากับความสูงราง วาดเป็นวงแหวนเส้นขอบ 2 | 0 | **ไม่ ตัวสวิตช์มีสเกลของตัวเอง แต่แถวผูกกับสเกลกลาง** |
| Adobe Spectrum (S2) | 4 (S, M, L, XL) คูณ เดสก์ท็อป และ สัมผัส | S 22 คูณ 14, M 26 คูณ 16, L 30 คูณ 18, XL 34 คูณ 20 | M 8 ตอนปิด ขยายเป็น 10 ตอนเปิด | เส้นขอบ 2 บวกช่องว่าง 2 | **ไม่** มี `switch-control-height-*` เป็นชุดของตัวเอง แยกจาก `component-height-*` |
| Salesforce Lightning | 1 | **48 คูณ 24** | **20** | 2 (เส้นขอบ 1 บวก 1) | **ไม่** ใช้ token `HEIGHT_TOGGLE` ที่ประกาศ `scope: component` ส่วนช่องกรอกของ SLDS สูง 30 |
| Uber Base Web (Switch รุ่นใหม่) | 2 | default 52 คูณ 32, small 40 คูณ 24 | 16 ขยายเป็น 24 ตอนเปิด, 12 ขยายเป็น 16 | 4 บวกเส้นขอบ 2 ตอนปิด | **ไม่** ความกว้าง default พิมพ์เป็นสตริง `'52px'` เพราะไม่มีขั้นในสเกล |
| Uber Base Web (Checkbox toggle รุ่นเก่า กำลังเลิกใช้) | 1 | 40 คูณ 14 | 20 (ล้นออกนอกราง) | ไม่มี | **ไม่** |
| Shopify Polaris (React) | **ไม่มีสวิตช์** | ใช้ปุ่มสวม `role="switch"` สูง 32 บนมือถือ และ 28 บนเดสก์ท็อป | ไม่มี | ไม่มี | ผูกกับสเกลความสูงปุ่มเต็ม ๆ เพราะ **มันคือปุ่ม** |
| Shopify Polaris (Web Components) | มี `s-switch` | ไม่ประกาศเป็น px | ไม่ประกาศ | ไม่ประกาศ | ยืนยันไม่ได้ |
| News UK NewsKit | 3 | ไม่ประกาศเป็น px | ปรับได้ผ่าน override | ไม่ประกาศ | ยืนยันไม่ได้ |
| Apple HIG | 3 ผ่าน `ControlSize` (regular, small, mini) | **ไม่ประกาศตัวเลขในเอกสารเลย** | ไม่ประกาศ | ไม่ประกาศ | **ใช่ บน macOS และเขียนเป็นเหตุผลตรง ๆ** ว่าใช้ mini switch ในฟอร์มแบบกลุ่มเพื่อให้แถวสูงเท่ากับปุ่มและ control อื่น |
| GOV.UK | **ไม่มี component** | ไม่มี | ไม่มี | ไม่มี | ไม่เกี่ยว |

**นับได้ว่า ไม่มีเจ้าไหนเลยเอาตัวสวิตช์ไปผูกกับสเกลความสูงของปุ่ม** เจ้าที่เชื่อมบางส่วนมี 3 เจ้า (Ant เฉพาะขนาดเล็ก, Primer เฉพาะฝั่ง Rails, Apple เฉพาะ macOS และเฉพาะขนาด mini) และทั้งสามเชื่อมด้วยการถอยลงมา ไม่ใช่ใช้ค่าเดียวกัน

### 3.2 แบบอย่างที่ดีที่สุด Adobe Spectrum แยกเป็นสองชั้น

**นี่คือคำตอบที่ตรงกับโจทย์เราที่สุดในรายงานนี้** `[ทางการ]` Spectrum แยกของสองอย่างออกจากกันชัดเจน

**ชั้นที่ 1 ภาพสวิตช์ อยู่บนสเกลของตัวเอง** มี token ชุด `switch-control-height-{small|medium|large|extra-large}` เป็นของตัวเอง ให้ 14, 16, 18, 20 บนเดสก์ท็อป **ซึ่งไม่ใช่ชุดเดียวกับ `component-height-*` ที่ให้ 20, 24, 32, 40, 48**

**ชั้นที่ 2 แถวที่กดได้ ผูกกับสเกลกลาง** ไฟล์ CSS จับคู่ไว้ตรง ๆ

```css
.spectrum-Switch { min-block-size: var(--spectrum-switch-min-height); }
/* sizeS  → component-height-75  (24 เดสก์ท็อป, 30 สัมผัส) */
/* sizeM  → component-height-100 (32 เดสก์ท็อป, 40 สัมผัส) */
/* sizeL  → component-height-200 (40 เดสก์ท็อป, 50 สัมผัส) */
/* sizeXL → component-height-300 (48 เดสก์ท็อป, 60 สัมผัส) */
```

และ `<input>` ที่มองไม่เห็นถูกยืดคลุมทั้งแถวรวมป้ายกำกับ `inline-size: 100%; block-size: 100%; inset: 0; opacity: 0`

- [`components/switch/index.css`](https://raw.githubusercontent.com/adobe/spectrum-css/main/components/switch/index.css)
- [`packages/tokens/src/switch.json`](https://raw.githubusercontent.com/adobe/spectrum-design-data/main/packages/tokens/src/switch.json)
- [`packages/tokens/src/layout.json`](https://raw.githubusercontent.com/adobe/spectrum-design-data/main/packages/tokens/src/layout.json)
- [`packages/@react-spectrum/s2/src/Switch.tsx`](https://raw.githubusercontent.com/adobe/react-spectrum/main/packages/%40react-spectrum/s2/src/Switch.tsx)

> **แก้ความเข้าใจผิดที่ผมเองเกือบพลาด** ในไฟล์ React ของ Spectrum 2 มีบรรทัด `'--trackHeight': { type: 'height', value: controlSize('sm') }` ซึ่งดูเหมือนอ้างสเกลกลาง **แต่ไม่ใช่** ในไฟล์เดียวกันมี `controlSizeS` (14, 16, 18, 20) กับ `controlSizeM` (20, 24, 32, 40, 48) เป็น **คนละชุดกัน** ตัวที่สวิตช์เรียกคือชุดแรกซึ่งเป็นสเกลของสวิตช์เอง ไม่ใช่สเกลของ control ทั่วไป

**และ Spectrum ยังทิ้งเหตุผลไว้ในคำอธิบายของ token ที่เลิกใช้แล้วด้วย** ว่า `switch-top-to-control-*` ต้อง "Requires switch control to be placed in frame of height workflow-icon-medium" คือ **ตัวควบคุมถูกจัดกึ่งกลางในกรอบที่สูงกว่า** ซึ่งเป็นแนวคิดเดียวกับที่เสนอในหัวข้อ 12

**ผลลัพธ์ของการแยกสองชั้นแบบนี้คือ ได้ทั้งสวิตช์ที่ตัวเล็กพอดีกับบรรทัดข้อความ และได้แถวที่สูงพอสำหรับการแตะ โดยไม่ต้องเลือกอย่างใดอย่างหนึ่ง** ซึ่งแก้สองปัญหาของเราพร้อมกัน

### 3.3 หลักฐานฝั่ง "เชื่อมบางส่วน"

**Ant Design** เชื่อมครึ่งเดียว และเป็นครึ่งที่คาดไม่ถึง `[ทางการ]`

```ts
const height       = fontSize * lineHeight;   // ความสูงรางขนาดปกติ มาจากแนวตัวอักษร
const heightSM     = controlHeight / 2;       // ความสูงรางขนาดเล็ก มาจากสเกล control
const padding      = 2; // Fixed value
const handleSize   = height   - padding * 2;
const handleSizeSM = heightSM - padding * 2;
trackMinWidth:   handleSize   * 2 + padding * 4,
trackMinWidthSM: handleSizeSM * 2 + padding * 2,
```

- [`components/switch/style/index.ts`](https://raw.githubusercontent.com/ant-design/ant-design/master/components/switch/style/index.ts)

ที่ค่าเริ่มต้น `fontSize` 14 และ `lineHeight` 22 หาร 14 จะได้ **ความสูงรางขนาดปกติ 22 ซึ่งเท่ากับความสูงบรรทัดของตัวอักษรพอดี** แปลว่าเจตนาของ Ant คือให้สวิตช์สูงเท่ากับหนึ่งบรรทัดข้อความ ไม่ใช่เท่ากับช่องกรอก ส่วนขนาดเล็กได้ 32 หาร 2 เท่ากับ 16

**และในไฟล์เดียวกันนี้มีบทเรียนสำคัญสำหรับเรา** สูตรความกว้างของสองขนาดไม่ตรงกัน ขนาดปกติคูณระยะขอบใน 4 ส่วนขนาดเล็กคูณ 2 ทำให้สัดส่วนกว้างต่อสูงของขนาดปกติได้ 2.00 แต่ขนาดเล็กได้ 1.75 **นี่คือตัวอย่างจริงว่าการมีสูตรอย่างเดียวไม่พอ ต้องตรวจว่าสูตรให้ผลที่สอดคล้องกันข้ามทุกขนาดด้วย** ซึ่งตรงกับกฎ "ค่าต้องสอดคล้องกันเอง" ใน CLAUDE.md

**Apple HIG** เป็นเจ้าเดียวที่เขียนเหตุผลของการทำให้แถวสูงเท่ากันไว้เป็นตัวหนังสือ `[ทางการ]`

> "Within a grouped form, consider using a mini switch to control the setting in a single row. The height of a mini switch is similar to the height of buttons and other controls, resulting in rows that have a consistent height."

- [Apple HIG Toggles](https://developer.apple.com/design/human-interface-guidelines/toggles)

**แต่ต้องอ่านให้ครบ Apple ไม่ได้บอกว่าใช้สวิตช์ขนาดปกติ เขาบอกให้ใช้ขนาด mini** ซึ่งเป็นการถอยขั้นแบบเดียวกับ Spectrum และ Apple ไม่ประกาศตัวเลขใด ๆ ในเอกสารเลย

**GitHub Primer** เป็นตัวอย่างของการเชื่อมที่หลุด `[ทางการ]` ฝั่ง Rails อ้าง token กลาง

```css
/* toggle_switch.pcss */
width: var(--base-size-64);  height: var(--control-medium-size);   /* medium */
width: var(--base-size-48);  height: var(--control-xsmall-size);   /* small  */
```

แต่ฝั่ง React ในที่เก็บเดียวกันพิมพ์ตัวเลขตายไว้

```css
/* ToggleSwitch.module.css */
height: 32px; width: 64px;                       /* Default medium size */
.SwitchButton:where([data-size='small']) { height: 24px; width: 48px; }
```

- [`toggle_switch.pcss`](https://raw.githubusercontent.com/primer/view_components/main/app/components/primer/alpha/toggle_switch.pcss)
- [`ToggleSwitch.module.css`](https://raw.githubusercontent.com/primer/react/main/packages/react/src/ToggleSwitch/ToggleSwitch.module.css)

**นี่คือภาพในอนาคตของเราถ้าเลือกเชื่อมแบบหลวม ๆ โดยไม่มีสูตรบังคับ** สอง implementation ของทีมเดียวกันหลุดออกจากกันโดยไม่มีใครรู้ ซึ่งเป็นเหตุผลเดียวกับที่ CLAUDE.md เขียนกฎว่าห้ามพิมพ์ค่าตายทีละขนาด

**และให้สังเกตด้วยว่า `control-xsmall-size` คือ 24 ส่วน `control-small-size` คือ 28** แปลว่าสวิตช์ที่ Primer เรียกว่า small ใช้ token ที่ชื่อ xsmall ชื่อกับค่าไม่ตรงกัน ซึ่งเป็นต้นทุนของการยืมสเกลของคนอื่นมาใช้

### 3.4 หลักฐานฝั่ง "ไม่เชื่อม" และเจ้าที่ชี้ขาด

**IBM Carbon คือหลักฐานที่ชี้ขาดที่สุดของรายงานนี้** `[ทางการ]`

Carbon เป็นเจ้าที่เราอ้างในงานช่องกรอกว่าผูกความสูงปุ่มกับช่องกรอกด้วย mixin ตัวเดียวกันจากไฟล์ `_layout.scss` แต่ **สวิตช์ของ Carbon ไม่ได้เรียก mixin นั้นเลย** มันเขียนค่าตายไว้ในไฟล์ตัวเอง

```scss
.#{$prefix}--toggle__switch {
  border-radius: convert.to-rem(12px);
  block-size: convert.to-rem(24px);
  inline-size: convert.to-rem(48px);
  &::before { block-size: convert.to-rem(18px); inline-size: convert.to-rem(18px);
              inset-block-start: convert.to-rem(3px); inset-inline-start: convert.to-rem(3px); }
}
.#{$prefix}--toggle__switch--checked::before { transform: translateX(convert.to-rem(24px)); }
.#{$prefix}--toggle__appearance--sm .#{$prefix}--toggle__switch {
  block-size: convert.to-rem(16px); inline-size: convert.to-rem(32px);
  &::before { block-size: convert.to-rem(10px); inline-size: convert.to-rem(10px); }
}
```

- [`scss/components/toggle/_toggle.scss`](https://raw.githubusercontent.com/carbon-design-system/carbon/main/packages/styles/scss/components/toggle/_toggle.scss)
- เทียบกับ [`scss/utilities/_layout.scss`](https://raw.githubusercontent.com/carbon-design-system/carbon/main/packages/styles/scss/utilities/_layout.scss) ที่ปุ่มและช่องกรอกเรียกใช้

**หลักฐานที่หนักแน่นที่สุดอยู่ที่รายการ import** `_button.scss` และ `_text-input.scss` ต่างก็มีบรรทัด `@use '../../utilities/layout'` แล้วเรียก `layout.size('height')` **ส่วน `_toggle.scss` ไม่มีบรรทัดนั้นเลย** และ `_checkbox.scss` ก็ไม่มีเหมือนกัน แปลว่า **Carbon จัดกลุ่มตัวควบคุมแบบเลือก (สวิตช์และ checkbox) ออกจากสเกลความสูงกลางโดยจงใจ**

**ความหมายของหลักฐานนี้ตรงกับโจทย์เราพอดี** องค์กรที่ตัดสินใจอย่างจงใจว่าปุ่มกับช่องกรอกต้องสูงเท่ากันเพราะวางในแถวเดียวกัน **ก็ตัดสินใจอย่างจงใจเช่นกันว่าสวิตช์ไม่อยู่ในข้อตกลงนั้น** เพราะสวิตช์ไม่ได้วางในแถวเดียวกับปุ่ม มันวางในบรรทัดเดียวกับข้อความ

**Microsoft Fluent 2** ประกาศเป็นค่าคงที่ 4 ตัวบนหัวไฟล์ พร้อมคอมเมนต์กำกับว่าเป็นขนาดของ component นี้โดยเฉพาะ `[ทางการ]`

```ts
// Thumb and track sizes used by the component.
const spaceBetweenThumbAndTrack = 2;
const trackHeightMedium = 20;
const trackWidthMedium  = 40;
const thumbSizeMedium   = trackHeightMedium - spaceBetweenThumbAndTrack;
const trackHeightSmall  = 16;    // (from design mockup)
const trackWidthSmall   = 32;
const thumbSizeSmall    = trackHeightSmall - spaceBetweenThumbAndTrack;
```

- [`react-switch/library/src/components/Switch/useSwitchStyles.styles.ts`](https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-switch/library/src/components/Switch/useSwitchStyles.styles.ts)

**Atlassian** ไม่ผูกกับความสูง control แต่ยืมค่าจากสเกลระยะห่างแทน `[ทางการ]`

| สิ่งที่วัด | regular | large | ตัวแปรที่ใช้ |
|---|---|---|---|
| ความกว้างราง (พื้นสี) | 32 | 40 | `--ds-space-400` และ `--ds-space-500` |
| ความสูงราง (พื้นสี) | 16 | 20 | `--ds-space-200` และ `--ds-space-250` |
| ปุ่มกลม | 12 | 16 | `--ds-space-150` และ `--ds-space-200` |
| ระยะขอบใน | 2 | 2 | `--ds-space-025` |
| **พื้นที่คลิกจริง (border-box)** | **40 คูณ 24** | **48 คูณ 28** | รวมเส้นขอบโปร่งใส 2px ที่จองไว้ให้วงแหวนโฟกัส |

- [`@atlaskit/toggle/dist/cjs/toggle.compiled.css`](https://unpkg.com/@atlaskit/toggle@17.3.0/dist/cjs/toggle.compiled.css)

จุดที่น่าเรียนรู้คือ Atlassian ตั้ง `box-sizing: content-box` และ `background-clip: content-box` เพื่อให้ **สีพื้นวาดแค่ 32 คูณ 16 แต่กล่องจริงเป็น 40 คูณ 24** ที่ว่าง 4px รอบนอกจองไว้ให้วงแหวนโฟกัสโดยเฉพาะ ซึ่งเป็นวิธีเดียวกับที่เราใช้กับปุ่มโปร่ง

**Uber Base Web** มีสองรุ่นและรุ่นเก่ากำลังถูกเลิกใช้ `[ทางการ]` รุ่นเก่า (`Checkbox` ที่ตั้ง `checkmarkType="toggle"`) มีขนาดเดียว ราง 40 คูณ 14 ปุ่มกลม 20 ซึ่งล้นออกนอกรางข้างละ 3 ส่วน **รุ่นใหม่ (`baseui/switch`) มี 2 ขนาด และปุ่มกลมโตขึ้นตอนเปิดแบบเดียวกับ Material 3** คือ 16 เป็น 24 และ 12 เป็น 16

- [`src/switch/styled-components.ts`](https://raw.githubusercontent.com/uber/baseweb/main/src/switch/styled-components.ts)
- [`src/checkbox/styled-components.ts`](https://raw.githubusercontent.com/uber/baseweb/main/src/checkbox/styled-components.ts)

### 3.5 จำนวนขนาดที่ตลาดใช้

| จำนวนขนาด | เจ้า |
|---|---|
| 1 | Material 3, Salesforce Lightning, Uber Base Web รุ่นเก่า |
| 2 | IBM Carbon, Microsoft Fluent 2, Ant Design, Atlassian, GitHub Primer, Uber Base Web รุ่นใหม่, MUI |
| 3 | News UK NewsKit, Apple (regular, small, mini) |
| 4 | Adobe Spectrum |
| ไม่มี component | Shopify Polaris ฝั่ง React, GOV.UK |

**มัธยฐานและค่าที่พบบ่อยที่สุดคือ 2 ขนาด (7 เจ้า)** ซึ่งตรงกับที่เรามีอยู่แล้ว

---

## 4. สัดส่วนรางต่อปุ่มกลม เป็นสูตรหรือตารางค่า

### 4.1 ตารางสัดส่วนที่คำนวณจากค่าจริง

| เจ้า และขนาด | ราง | กว้างต่อสูง | ปุ่มกลม | ปุ่มกลมต่อความสูงราง | ระยะขอบใน | ระยะเลื่อน |
|---|---|---|---|---|---|---|
| Material 3 | 52 คูณ 32 | 1.63 | 16 ปิด, 24 เปิด, 28 กด | 0.50, 0.75, 0.88 | 8, 4, 2 (เป็นผลลัพธ์) | 20 |
| Carbon md | 48 คูณ 24 | **2.00** | 18 | 0.75 | 3 | 24 |
| Carbon sm | 32 คูณ 16 | **2.00** | 10 | 0.63 | 3 | 16 |
| Fluent medium | 40 คูณ 20 | **2.00** | 18 | 0.90 | 2 | 20 |
| Fluent small | 32 คูณ 16 | **2.00** | 14 | 0.88 | 2 | 16 |
| Ant ปกติ | 44 คูณ 22 | **2.00** | 18 | 0.82 | 2 | 22 |
| Ant small | 28 คูณ 16 | 1.75 | 12 | 0.75 | 2 | 12 |
| Atlassian large | 40 คูณ 20 | **2.00** | 16 | 0.80 | 2 | 20 |
| Atlassian regular | 32 คูณ 16 | **2.00** | 12 | 0.75 | 2 | 16 |
| Primer medium | 64 คูณ 32 | **2.00** | กว้าง 50 เปอร์เซ็นต์ สูงราว 28 | ราว 0.88 | 1 | ราว 29 |
| Primer small | 48 คูณ 24 | **2.00** | กว้าง 50 เปอร์เซ็นต์ สูงราว 20 | ราว 0.83 | 1 | ราว 21 |
| Base Web ใหม่ default | 52 คูณ 32 | 1.63 | 16 ปิด, 24 เปิด | 0.50 และ 0.75 | 4 | 20 |
| Base Web ใหม่ small | 40 คูณ 24 | 1.67 | 12 ปิด, 16 เปิด | 0.50 และ 0.67 | 4 | 16 |
| **Salesforce Lightning** | **48 คูณ 24** | **2.00** | **20** | **0.83** | **2** | **24** |
| Spectrum S1 medium | 26 คูณ 14 | 1.86 | 14 (วงแหวน เต็มความสูง) | 1.00 | 0 | 12 |
| Spectrum S2 small | 22 คูณ 14 | 1.57 | 6 ปิด, 8 เปิด | 0.43 และ 0.57 | เส้นขอบ 2 บวกช่องว่าง 2 | ราว 8 |
| Spectrum S2 medium | 26 คูณ 16 | 1.63 | 8 ปิด, 10 เปิด | 0.50 และ 0.63 | เส้นขอบ 2 บวกช่องว่าง 2 | 10 |
| Spectrum S2 large | 30 คูณ 18 | 1.67 | 10 ปิด, 12 เปิด | 0.56 และ 0.67 | เส้นขอบ 2 บวกช่องว่าง 2 | ราว 12 |
| Spectrum S2 extra-large | 34 คูณ 20 | 1.70 | 12 ปิด, 14 เปิด | 0.60 และ 0.70 | เส้นขอบ 2 บวกช่องว่าง 2 | ราว 14 |
| Base Web เก่า | 40 คูณ 14 | 2.86 | 20 | 1.43 | ล้นออกนอกราง | 20 |
| MUI medium | 34 คูณ 14 | 2.43 | 20 | 1.43 | ล้นออกนอกราง | 20 |
| MUI small | 26 คูณ 10 | 2.60 | 16 | 1.60 | ล้นออกนอกราง | 16 |
| **NTGDS sm** | **36 คูณ 20** | **1.80** | **16** | **0.80** | **2** | **16** |
| **NTGDS md** | **44 คูณ 24** | **1.83** | **20** | **0.83** | **2** | **20** |

**อ่านตารางนี้ได้ 5 ข้อ**

1. **ตลาดแตกเป็นสามกลุ่ม ไม่ใช่กลุ่มเดียว** กลุ่ม 2.00 มี **10 แถว** (Carbon, Fluent, Atlassian, Primer อย่างละ 2 ขนาด บวก Ant ขนาดปกติ บวก SLDS) กลุ่ม 1.57 ถึง 1.70 มี **7 แถว** (Spectrum 2 ทั้ง 4 ขนาด, Material 3, Base Web รุ่นใหม่ 2 ขนาด) และกลุ่มปุ่มกลมล้นราง 3 แถว (MUI และ Base Web รุ่นเก่า ซึ่งเป็นทรงเก่าที่ทั้งสองเจ้ากำลังเลิกใช้) **2.00 คือค่าที่พบบ่อยที่สุด แต่กลุ่มแคบเป็นทรงที่ใหม่กว่า**
2. **มีข้อสังเกตที่ต้องรายงานตรง ๆ สัดส่วนของเราใกล้ Spectrum รุ่นแรกที่สุด (1.86)** ซึ่งเป็นรุ่นที่ Adobe เปลี่ยนไปแล้ว **และสัดส่วนของเราไม่คงที่ข้ามขนาดด้วย (1.80 กับ 1.83) ซึ่งไม่มีเจ้าไหนในตลาดเป็นแบบนั้น** ทุกเจ้าคงสัดส่วนเดียวหรือไล่ขึ้นอย่างเป็นระบบ (Spectrum 2 ไล่ 1.57 ไป 1.70 ตามขนาด) นี่คือปัญหาที่แท้จริง ไม่ใช่เรื่องว่า 1.8 ผิดหรือถูก
3. **ขนาดปุ่มกลมไม่ได้คุมด้วยอัตราส่วน แต่คุมด้วยระยะขอบใน** เกือบทุกเจ้าเขียนเป็น `ปุ่มกลม = ความสูงราง ลบ ระยะขอบใน คูณ 2` (Fluent เขียนเป็นโค้ดตรง ๆ, Ant เขียนเป็นสูตร, Atlassian, Carbon และ SLDS ได้ค่าที่ตรงกับสูตรนี้ทุกขนาด) **ค่าที่ควรตั้งจึงคือระยะขอบใน ไม่ใช่อัตราส่วนปุ่มกลม**
4. **ระยะเลื่อนไม่ใช่ค่าที่ตั้งแยก** ทุกเจ้าคำนวณจากค่าอื่น และเจ้าที่สัดส่วน 2.00 จะได้ระยะเลื่อนเท่ากับความสูงรางพอดี เพราะ `2H ลบ (H ลบ 2p) ลบ 2p = H`
5. **หลักฐานที่ตรงกับข้อเสนอของเราที่สุดคือ Salesforce Lightning** ราง 48 คูณ 24 ปุ่มกลม 20 ระยะขอบใน 2 ระยะเลื่อน 24 **ซึ่งคือค่าเดียวกับที่ข้อ 12.1 เสนอสำหรับขนาด md ของเราทุกตัว** และตรงกับ Carbon ขนาดปกติที่ 48 คูณ 24 ด้วย ต่างกันแค่ Carbon ใช้ปุ่มกลม 18 กับระยะขอบใน 3

### 4.2 หลักฐานเรื่องสูตรระยะเลื่อน

**Material 3 เขียนสูตรไว้ตรง ๆ เป็นบรรทัดเดียว** `[ทางการ]`

```scss
$margin: calc(map.get($tokens, 'track-width') - map.get($tokens, 'track-height'));
.selected   .handle-container { margin-inline-start: $margin; }
.unselected .handle-container { margin-inline-end:   $margin; }
```

- [`switch/internal/_handle.scss`](https://raw.githubusercontent.com/material-components/material-web/main/switch/internal/_handle.scss)

ได้ระยะเลื่อน 52 ลบ 32 เท่ากับ 20 และ **ระยะขอบในของ M3 ไม่ใช่ token แต่เป็นผลลัพธ์ของการจัดกึ่งกลาง** คือ `(ความสูงราง ลบ ปุ่มกลม) หาร 2` ซึ่งได้ 8 ตอนปิด 4 ตอนเปิด และ 2 ตอนกด `[คำนวณ]` แปลว่าเมื่อปุ่มกลมโตขึ้น ระยะขอบในจะหดลงเอง โดยไม่ต้องประกาศค่าใหม่

**Fluent 2 เขียนสูตรเดียวกันในรูปที่ต่างออกไป** `[ทางการ]`

```ts
transform: `translateX(${trackWidthMedium - thumbSizeMedium - spaceBetweenThumbAndTrack}px)`
```

ได้ 40 ลบ 18 ลบ 2 เท่ากับ 20 ตรงกับความสูงราง

### 4.3 เจ้าที่ทำเป็นสูตรจริง เทียบเจ้าที่ทำเป็นตารางค่า

| วิธี | เจ้า | รูปแบบ |
|---|---|---|
| สูตรเต็ม | Ant Design, Adobe Spectrum | คำนวณทุกค่าจากตัวแปรตั้งต้น 2 ถึง 3 ตัว |
| สูตรบางส่วน | Microsoft Fluent 2, Material 3 | ตั้งความกว้างกับความสูงเป็นค่าคงที่ แล้วคำนวณปุ่มกลม ระยะขอบใน และระยะเลื่อนจากค่านั้น |
| ตารางค่าที่บังเอิญเข้าสูตร | Atlassian | เขียนค่าตายทีละขนาด แต่ทุกค่าตรงกับ `ปุ่มกลม = ความสูง ลบ 4` และ `กว้าง = สูง คูณ 2` |
| ตารางค่าล้วน | IBM Carbon, GitHub Primer, Uber Base Web, MUI | เขียนทุกค่าตายทีละขนาด |
| ค่าเดียว | Salesforce Lightning | มีขนาดเดียวจึงไม่ต้องมีสูตร |

**Microsoft Fluent 2 คือรูปแบบที่เหมาะกับเราที่สุด** เพราะมันตั้งเฉพาะค่าที่เป็นการตัดสินใจ (ความสูง ความกว้าง ระยะขอบใน) แล้วปล่อยให้ค่าที่เหลือเป็นผลลัพธ์ ซึ่งเป็นโมเดลเดียวกับที่ `avatar.mjs` ของเราใช้อยู่แล้ว (กำหนดขนาดกล่องกับไอคอน แล้วให้ระยะเว้นขอบเป็นผลลัพธ์)

---

## 5. โครงสถานะ และการแยกแกนเปิดปิดออกจากแกนโต้ตอบ

### 5.1 ตารางสถานะต่อเจ้า

| เจ้า | แกนเปิดปิด | แกนโต้ตอบ | hover | focus | pressed | disabled | read-only | loading |
|---|---|---|---|---|---|---|---|---|
| Material 3 | `selected` บูลีน | class แยก | มี | มี | **มี ปุ่มกลมโต 28** | มี | ไม่มี | ไม่มี |
| IBM Carbon | class `--checked` | class แยก | **ไม่มีเลย** | มี | **มี `:active`** (ให้วงแหวนเดียวกับ focus) | มี | **มี class `--readonly`** | ไม่มี (มี skeleton แทน) |
| Microsoft Fluent 2 | `checked` บูลีน | selector ผสม | มี | มี | **มี `:hover:active`** | มี บวก **`disabledFocusable`** | ไม่มี | ไม่มี |
| Ant Design | `checked` บูลีน | prop แยก | มี | มี | **มี ปุ่มกลมยืด 30 เปอร์เซ็นต์** | มี | ไม่มี | **มี `loading`** |
| Atlassian | `isChecked` บูลีน | prop แยก | มี | มี | **ไม่มี** | `isDisabled` | ไม่มี | **มี `isLoading`** |
| GitHub Primer | `checked` บูลีน | data attribute แยก | มี | มี | **มี `:active`** | `disabled` | ไม่มี | **มี `loading`** |
| Adobe Spectrum | `isSelected` บูลีน | render prop แยก | มี | มี | **มี `:active` และ `pressScale`** | `isDisabled` | **มี `isReadOnly`** | ไม่มี |
| Salesforce Lightning | `:checked` | selector แยก | มี | มี | **ไม่มี** | มี | **ไม่มี** | ไม่มี |
| Uber Base Web ใหม่ | `checked` บูลีน | prop แยก | มี | มี | **ไม่มี** (มีตัวแปรเตรียมไว้แต่ไม่ได้ใช้) | มี | ไม่มี | ไม่มี |
| News UK NewsKit | `checked` แยก | `state` แยก | มี | มี | ยืนยันไม่ได้ | มี | ไม่มี | ไม่มี |
| GitLab Pajamas | `value` แยก | prop แยก | ยืนยันไม่ได้ | ยืนยันไม่ได้ | ยืนยันไม่ได้ | มี | ไม่มี | **มี `isLoading`** |
| **NTGDS** | **`Active` เปิดปิด** | **`State` ค่าเดียว 4 ค่า** | มี | มี | **ไม่มี** | มี | **ไม่มี** | **ไม่มี** |

**ข้อสรุปที่สำคัญ ทุกเจ้าในตลาดแยกสองแกนเหมือนกันหมด ไม่มีเจ้าไหนยุบเป็นแกนเดียว** และโครงของเราตรงกับตลาดอยู่แล้ว คือ `Active` เป็นบูลีน คูณกับ `State` ที่เป็นคุณสมบัติเดียว

**นี่คือจุดที่สวิตช์ของเราทำถูกอยู่แล้วและต่างจากช่องกรอกอย่างชัดเจน** ช่องกรอกของเราใช้ตัวเปิดปิด 3 ตัวที่เปิดพร้อมกันได้ทั้งที่เป็นไปไม่ได้จริง ส่วนสวิตช์ใช้คุณสมบัติเดียวถูกต้องตามที่ตลาดทำ

### 5.2 สถานะกด เจ้าที่มีทำอะไรบ้าง

**สถานะกดของสวิตช์ไม่ใช่แค่เปลี่ยนสี** 4 ใน 5 เจ้าที่มีเปลี่ยนรูปทรงด้วย

| เจ้า | ทำอะไรตอนกด |
|---|---|
| Material 3 | ปุ่มกลมโตจาก 16 หรือ 24 เป็น **28** ด้วย transition 100ms linear (ปกติ 250ms) และเอกสารเขียนกำกับว่า "The switch handle increases in size to indicate interactivity for both touch and cursor control interactions" |
| Ant Design | ปุ่มกลม **ยืดออก 30 เปอร์เซ็นต์** ไปทางที่กำลังจะเลื่อน ผ่าน `switchHandleActiveInset: '-30%'` |
| Adobe Spectrum | ย่อด้วย `pressScale` |
| GitHub Primer | เปลี่ยนสีรางเป็น `--controlTrack-bgColor-active` และ `--control-checked-bgColor-active` |
| Microsoft Fluent 2 | เปลี่ยนสีเป็น `colorNeutralStrokeAccessiblePressed` และ `colorCompoundBrandBackgroundPressed` |

**สำหรับผู้ใช้ของเราที่อยู่บนมือถือเกิน 70 เปอร์เซ็นต์ สถานะกดสำคัญกว่าสถานะ hover ซึ่งแทบไม่เกิดขึ้นเลย** และเรามี hover แต่ไม่มี pressed ซึ่งกลับทางกับความจริงของผู้ใช้

**และมีข้อที่คาดไม่ถึงต้องรายงาน IBM Carbon ไม่มีสถานะ hover เลย** `[ทางการ]` ไล่ทั้งไฟล์ `_toggle.scss` ไม่พบคำว่า hover selector การโต้ตอบมีแค่ `:focus` กับ `:active` และทั้งสองให้ผลเหมือนกันคือวงแหวน `outline: 2px solid $focus` **ซึ่งเป็นการตัดสินใจที่สอดคล้องกับผู้ใช้มือถือมากกว่าที่เราทำอยู่** เพราะเราลงแรงกับ hover ที่แทบไม่เกิด แต่ไม่มี pressed ที่เกิดทุกครั้ง

### 5.3 หลักฐานเรื่อง read-only ของ Carbon

`[ทางการ]` มี 2 เจ้าที่มี read-only คือ Carbon กับ Spectrum แต่ **Carbon เป็นเจ้าเดียวที่วาดหน้าตาให้จริงในชั้น CSS** ส่วน Spectrum ประกาศไว้ในเอกสารและทำในชั้น React แต่ `spectrum-css` ไม่มี rule ของ read-only เลย

```scss
.#{$prefix}--toggle--readonly .#{$prefix}--toggle__switch {
  border: 1px solid $icon-disabled;
  &::before { background-color: $icon-primary;
              inset-block-start: convert.to-rem(2px);
              inset-inline-start: convert.to-rem(2px); }
}
.#{$prefix}--toggle--readonly .#{$prefix}--toggle__check { fill: $background; }
```

สังเกตว่า Carbon ลดระยะขอบในจาก 3 เหลือ 2 ในสถานะนี้ เพื่อชดเชยเส้นขอบ 1px ที่เพิ่มเข้ามา ซึ่งเป็นรายละเอียดที่คนมักลืม

---

## 6. พื้นที่แตะ

### 6.1 เกณฑ์ที่เกี่ยวข้อง

| เกณฑ์ | ค่า | ระดับ |
|---|---|---|
| WCAG 2.2 SC 2.5.8 Target Size (Minimum) | 24 คูณ 24 CSS px | AA |
| WCAG 2.2 SC 2.5.5 Target Size (Enhanced) | 44 คูณ 44 CSS px | AAA |
| Apple ค่าเริ่มต้นที่แนะนำ บน iOS และ iPadOS | 44 คูณ 44 pt | คำแนะนำ |
| Apple ค่าต่ำสุดที่ยอมรับ บน iOS และ iPadOS | 28 คูณ 28 pt | คำแนะนำ |
| Android และ Material | 48 คูณ 48 dp | คำแนะนำ |

> **แก้ความเข้าใจผิดที่พบบ่อย Apple ไม่ได้บอกว่า 44 คือค่าต่ำสุด** `[ทางการ]` เอกสาร Accessibility ของ Apple แยกสองคอลัมน์ชัดเจน คอลัมน์ default control size บน iOS คือ 44 คูณ 44 pt ส่วนคอลัมน์ minimum control size คือ 28 คูณ 28 pt และ Apple ยังเขียนกำกับว่า "Consider spacing between controls as important as size" พร้อมแนะนำระยะขอบราว 12 pt รอบ element ที่มีกรอบ
>
> **และข้อยกเว้นเรื่องระยะห่างของ SC 2.5.8 อ่านให้ละเอียด** เป้าที่เล็กกว่า 24 ยังผ่านได้ถ้าวงกลมเส้นผ่านศูนย์กลาง 24 ที่วางกึ่งกลาง **กรอบขอบเขต** ของเป้านั้นไม่ทับกับวงกลมของเป้าอื่น **แปลว่าสวิตช์เดี่ยวที่มีที่ว่างรอบตัวเยอะผ่านได้ แต่รายการตั้งค่าที่มีสวิตช์เรียงกันโดยระยะห่างระหว่างจุดกึ่งกลางน้อยกว่า 24 จะไม่ผ่าน** ซึ่งเป็นบริบทที่สวิตช์ถูกใช้บ่อยที่สุดพอดี
>
> - [WCAG 2.2 SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
> - [Apple HIG Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)

### 6.2 ใครขยายพื้นที่กด และขยายอย่างไร

| เจ้า | ราง กว้างคูณสูง | พื้นที่กดจริง | วิธี |
|---|---|---|---|
| Material 3 | 52 คูณ 32 | **52 คูณ 48** บวกระยะขอบนอก 8 เมื่อตั้ง `touch-target='wrapper'` | token `touch-target-size: 48px` ใส่ที่ input ที่ซ่อนอยู่ ด้วย `height: max(100%, 48px)` |
| Uber Base Web รุ่นใหม่ | 52 คูณ 32 และ 40 คูณ 24 | **48 คูณ 48 ทั้งสองขนาด** | เพิ่มระยะขอบในที่ label ใน `@media (pointer: coarse)` โดย default ใช้ 8 และ small ใช้ 12 ให้ได้ 48 พอดีทั้งคู่ |
| GitHub Primer | 64 คูณ 32 และ 48 คูณ 24 | **สูงอย่างน้อย 44** | pseudo-element `::before` ที่ `min-height: 44px` ใน `@media (pointer: coarse)` |
| Microsoft Fluent 2 | 40 คูณ 20 และ 32 คูณ 16 | **56 คูณ 36 และ 48 คูณ 32** | input ที่ซ่อนอยู่กว้าง `calc(trackWidth + 2 * spacingHorizontalS)` บวกระยะขอบนอกของ indicator 8 |
| MUI (Material 2) | 34 คูณ 14 | **58 คูณ 38** | ระยะขอบใน 12 ที่ราก บวก input ที่กว้าง 300 เปอร์เซ็นต์ |
| Atlassian | 32 คูณ 16 และ 40 คูณ 20 | **40 คูณ 24 และ 48 คูณ 28** | ได้จากเส้นขอบโปร่งใสที่จองไว้ ไม่ได้ตั้งใจขยายเพื่อการแตะ ไม่มี `pointer: coarse` เลย |
| Ant Design | 44 คูณ 22 และ 28 คูณ 16 | **เท่ากับรางเป๊ะ ไม่ขยายเลย** | ไม่มี |
| **Adobe Spectrum** | 26 คูณ 14 ถึง 34 คูณ 20 | **แถวสูง 24, 32, 40, 48 บนเดสก์ท็อป และ 30, 40, 50, 60 บนสัมผัส** | `min-block-size` ผูกกับ `component-height-*` บวก `<input>` โปร่งใสคลุมทั้งแถวรวมป้ายกำกับ |
| News UK NewsKit | 3 ขนาด | โตตามขนาดสวิตช์ | element ชื่อ feedback ที่ทำหน้าที่เป็นพื้นที่กดโดยเฉพาะ |
| IBM Carbon | 48 คูณ 24 และ 32 คูณ 16 | **เท่ากับรางเป๊ะ ไม่ขยายเลย** | ไม่มี อาศัยการคลิกที่ป้ายกำกับแทน |
| Salesforce Lightning | 48 คูณ 24 | **เท่ากับรางเป๊ะ ไม่ขยายเลย** | ไม่มี ไฟล์สำหรับสัมผัสเปลี่ยนแค่ขนาดตัวอักษรกับระยะขอบของกรอบนอก |
| **NTGDS** | **36 คูณ 20 และ 44 คูณ 24** | **ไม่มีการประกาศพื้นที่กดเลย** | ไม่มี |

**ข้อสรุป ขนาด sm ของเราสูง 20 ซึ่งต่ำกว่าเกณฑ์ AA ของ WCAG 2.2 ที่ 24 อยู่ 4px** และขนาด md ที่ 24 อยู่ที่เส้นขั้นต่ำพอดีไม่มีที่เหลือให้พลาด **ในบริบทของเราที่ผู้ใช้อยู่บนมือถือมากกว่า 70 เปอร์เซ็นต์ นี่คือปัญหาจริง ไม่ใช่ปัญหาบนกระดาษ** และเราอยู่ในกลุ่มที่ไม่ขยายพื้นที่กดร่วมกับ Ant Design, Atlassian, Carbon และ SLDS **แต่ต้องพูดให้เป็นธรรม Carbon กับ SLDS อาศัยการทำให้ป้ายกำกับทั้งอันกดได้แทน** ซึ่งเป็นทางออกที่ใช้ได้เมื่อมีป้ายกำกับเสมอ แต่ไม่ช่วยอะไรกับสวิตช์เดี่ยวที่ไม่มีข้อความ

**สองเจ้าที่เขียนตัวเลขไว้เป็นกฎ**

Material 3 `[ทางการ]`

> "Avoid applying density by default. Don't apply density to switches by default, this lowers their targets below our best practice of 48x48 CSS pixels."

Adobe Spectrum `[ทางการ]` เขียนไว้ที่หน้า Platform scale ซึ่งเป็นกฎระดับระบบ ไม่ใช่ระดับ component

> "Touch hit areas placements and sizes vary for each component. They try to respect a minimum width and height of 48 px whenever possible to ensure ease when trying to tap or hold."

และ Spectrum ยังประกาศอัตราสเกลระหว่างเดสก์ท็อปกับสัมผัสไว้เป็น 1 ต่อ 1.25 คือ component บนอุปกรณ์สัมผัสใหญ่กว่าบนเดสก์ท็อป 25 เปอร์เซ็นต์ โดยสลับที่ความกว้างจอ 768

- [Adobe Spectrum Platform scale](https://spectrum.adobe.com/page/platform-scale/)

---

## 7. สวิตช์พร้อมข้อความ

### 7.1 ตารางเทียบ

| เจ้า | ตำแหน่งข้อความ ค่าเริ่มต้น | ปรับได้ไหม | ระยะห่าง | มีคำอธิบายใต้หัวข้อไหม | เป็นชุดแยกหรือคุณสมบัติ |
|---|---|---|---|---|---|
| Microsoft Fluent 2 | **ท้ายสวิตช์** (`after`) | ได้ 3 ค่า (`above`, `after`, `before`) | **12** (ระยะขอบนอก 8 บวกระยะขอบใน 4) | ไม่มีในตัว ใช้ component `Field` ครอบ | **คุณสมบัติของชุดเดิม** |
| Uber Base Web รุ่นใหม่ | **ท้ายสวิตช์** (`right`) | ได้ 2 ค่า (`left`, `right`) | **8** (`scale300`) | ไม่มีในตัว | **คุณสมบัติของชุดเดิม** |
| Uber Base Web รุ่นเก่า | **หน้าสวิตช์** (`left` เฉพาะโหมด toggle) | ได้ 4 ทิศ | **8** | ไม่มีในตัว | **คุณสมบัติของชุดเดิม** |
| News UK NewsKit | ท้ายสวิตช์ | ได้ ผ่าน `labelPosition` | ยืนยันไม่ได้ | ไม่มี | **คุณสมบัติของชุดเดิม** |
| GitHub Primer | **ข้อความสถานะอยู่หน้าสวิตช์** (`statusLabelPosition: 'start'`) | ได้ 2 ค่า | **8** (`--base-size-8`) | **มี** ผ่าน `aria-describedby` และตัวอย่างทางการวาง 16 ระหว่างก้อนข้อความกับสวิตช์ | **คุณสมบัติของชุดเดิม** ส่วนหัวข้อกับคำอธิบายให้ประกอบเอง |
| IBM Carbon | ป้ายกำกับอยู่ **บน** สวิตช์ และข้อความบอกสถานะอยู่ท้ายสวิตช์ | ไม่ | ป้ายกำกับห่างลงมา 16 (`$spacing-05`) และข้อความบอกสถานะห่าง 8 (`$spacing-03`) | ไม่มี | **คุณสมบัติของชุดเดิม** |
| GitLab Pajamas | บนเป็นค่าเริ่มต้น หรือซ้ายได้ | ได้ | ยืนยันไม่ได้ | **มี** ทั้งคำอธิบายและข้อความช่วย | **คุณสมบัติของชุดเดิม** |
| Shopify Polaris Web Components | ยืนยันไม่ได้ | ยืนยันไม่ได้ | ยืนยันไม่ได้ | **มี** ผ่าน prop `details` | **คุณสมบัติของชุดเดิม** |
| Material 3 | ไม่มีในตัว ใช้ `<label>` ภายนอก | ไม่ | ยืนยันไม่ได้ | เป็นแพตเทิร์น ไม่ใช่ prop | ไม่เกี่ยว |
| Ant Design | ไม่มีป้ายกำกับในตัว มีแต่ข้อความ **ในราง** | ไม่ | ไม่มี | ไม่มี | ไม่เกี่ยว |
| Atlassian | ไม่มีในตัว ให้ประกอบเอง | ไม่ | ไม่มี | ไม่มี | ไม่เกี่ยว |
| **Adobe Spectrum** | **ท้ายสวิตช์เสมอ** | ไม่ ไม่มีตำแหน่งบน | **9, 10, 11, 13 ตามขนาด** (`text-to-control-*`) | **S1 ไม่มี ส่วน S2 มี** ผ่าน prop `description` และ `errorMessage` ที่วางใต้แถว | **คุณสมบัติของชุดเดิม** ป้ายกำกับคือ children |
| **Salesforce Lightning** | **หน้าสวิตช์** | ไม่ | **8** (`$spacing-x-small`) | ไม่มี และ LWC ระบุว่า `field-level-help` ใช้กับ toggle ไม่ได้ | **ข้อความบอกสถานะอยู่ใต้ราง** ไม่ใช่ข้างราง ขนาด 10 (สัมผัส 12) คำเริ่มต้นคือ Enabled และ Disabled |
| Shopify Polaris React | การ์ดที่มีหัวข้อ คำอธิบาย และปุ่ม | ไม่ | 16 (`--p-space-400`) และ 24 บนจอกว้าง | **มี** | **ชุดแยก และถูกประกาศเลิกใช้แล้ว** |
| **NTGDS** | **ท้ายสวิตช์** | **ไม่ได้** | **sm ควรเป็น 44 แต่พิมพ์ 46, md 52 ถูกต้อง** | **มี** | **ชุดแยก 16 แบบ** |

### 7.2 หลักฐานเรื่อง Polaris ซึ่งเป็นกรณีเทียบที่ตรงกับเรามากที่สุด

`[ทางการ]` `SettingToggle` ของ Polaris คือ **การ์ดที่มีหัวข้อ คำอธิบาย และตัวควบคุม** ซึ่งเป็นโครงเดียวกับ `Text Toggle` ของเรา และไฟล์ต้นทางเขียนกำกับไว้ตรง ๆ ว่าเลิกใช้แล้ว

```tsx
/**
 * @deprecated The SettingToggle component will be removed in v12
 * See the "With primitive components" example to learn how to compose
 * setting toggles with layout and typography primitives.
 */
```

และตัวควบคุมข้างในไม่ใช่สวิตช์ด้วยซ้ำ มันคือ **ปุ่มที่สวม `role="switch"`**

```tsx
const actionMarkup = action
  ? buttonFrom(action, { role: 'switch', ariaChecked: enabled ? 'true' : 'false', size: 'slim' })
  : null;
```

- [`polaris-react/src/components/SettingToggle/SettingToggle.tsx`](https://raw.githubusercontent.com/Shopify/polaris/main/polaris-react/src/components/SettingToggle/SettingToggle.tsx)

**เหตุผลที่ Polaris ให้ไว้คือให้ประกอบเอาเองจาก layout กับ typography primitives แทน** ซึ่งเป็นข้อสรุปเดียวกับที่เราเพิ่งใช้ตอนลบชนิด Payment ออกจากช่องกรอก คือของที่เป็นแค่การจัดวางรอบ ๆ ตัวควบคุม ไม่ควรเป็น component ที่ต้องดูแลจำนวนแบบคูณกับตัวควบคุม

**และ Polaris ยังบอกเงื่อนไขการใช้ไว้ด้วย** `[ทางการ]`

> "The setting toggle component should only be used when: The setting is stand alone; There are two binary options that are 'On'/'Off'. If the setting is dependent on other settings, uses progressive disclosure, or has options that are not a simple 'On'/'Off', use a different UI element such as Checkbox or Radio button."

### 7.3 เทคนิคที่ควรลอกจาก Primer

`[ทางการ]` Primer แก้ปัญหาความกว้างกระโดดตอนสลับข้อความ On กับ Off ด้วยการ **เรนเดอร์ทั้งสองคำพร้อมกัน แล้วซ่อนตัวที่ไม่ใช้ด้วย `visibility: hidden` และ `height: 0`** แทนที่จะสลับข้อความ ทำให้ความกว้างของก้อนไม่ขยับ

ปัญหานี้เป็นญาติกับปัญหาที่เราเจอใน `Text Toggle` (ความกว้างตายตัวทำให้ความสูงกระโดด) คือ **ทั้งคู่เกิดจากการปล่อยให้เนื้อหาเป็นตัวกำหนดขนาดของกล่องโดยไม่มีการควบคุม**

---

## 8. toggle ต่างจาก checkbox อย่างไร และกติกาเลือกใช้

### 8.1 ข้อความจากแต่ละเจ้า

| เจ้า | สาระ |
|---|---|
| **Atlassian** `[ทางการ]` | ชัดที่สุด "Toggles should never require people to press a button to apply the settings." และ "The toggle component doesn't work within the form component by default. This is because the toggle is supposed to make change happen instantly, not after pressing a submit button. For options that require a button press to apply the setting, use a checkbox." |
| **Microsoft Fluent 2** `[ทางการ]` | เอ่ยชื่อปุ่มตรง ๆ "When people need to perform extra steps for changes to take effect, use a check box instead. For example, if they must click a 'Submit', 'Next', or 'OK' button to apply changes, use a check box." และเพิ่มเกณฑ์ที่เจ้าอื่นไม่มี คือ **ถ้าต้องมีสถานะกึ่งกลาง ให้ใช้ checkbox** |
| **Material 3** `[ทางการ]` | "The effects of a switch should start immediately, without needing to save." และคำบรรยายภาพข้อห้าม "Avoid using a switch to select multiple options that require people to save. Switches should be immediate. Use checkboxes instead." บวก "A switch can't replace a button" |
| **IBM Carbon** `[ทางการ]` | "Toggles are only used for these binary actions that occur immediately after the user 'flips the switch'." และ "Avoid using toggles for settings that aren't binary in nature or don't provide instant application; instead use a different UI component, like a checkbox, in combination with a button." |
| **GitHub Primer** `[ทางการ]` | มีเอกสารแยกเรื่องแพตเทิร์นการบันทึกทั้งหน้า "Toggle switches are buttons that change and save a boolean configuration option when they are toggled. Checkboxes are form inputs that are used to select one or more items from a list, and are not saved without explicit confirmation such as pressing a Save button." และ "A toggle switch should never be used as a replacement for a checkbox" บวกกฎที่สำคัญมาก **"Don't mix auto-saving controls and explicitly saved controls in the same form"** |
| **GitLab Pajamas** `[ทางการ]` | ให้เลี่ยงสวิตช์เมื่อการตั้งค่านั้นอยู่ในฟอร์มที่ต้องกดบันทึกหรือส่ง |
| **Shopify Polaris Web Components** `[ทางการ]` | "Don't combine with save buttons, as switches apply changes instantly" และ "For selections requiring explicit submission, use checkbox instead" |
| **Ant Design** `[ทางการ]` | พูดจากฝั่ง checkbox "Switch will trigger a state change directly when you toggle it, while Checkbox is generally used for state marking, which should work in conjunction with submit operation" |
| **Adobe Spectrum** `[ทางการ]` | ใช้เกณฑ์ **การเปิดใช้งาน เทียบกับ การเลือก** "Switches are best used for communicating activation (e.g., on/off states), while checkboxes are best used for communicating selection (e.g., multiple table rows). Switches, unlike checkboxes, can't have an error state." และภาพตัวอย่างข้อห้ามคือ **สวิตช์ที่เขียนว่ายอมรับเงื่อนไข** ซึ่งสื่อกลาย ๆ ว่าห้ามใช้กับฟิลด์ที่ต้องส่งฟอร์ม แต่ **ไม่ได้เขียนเรื่องปุ่มบันทึกตรง ๆ** |
| **Salesforce Lightning** `[ทางการ]` | **ไม่มีคำแนะนำเรื่องนี้เลย** เอกสารทั้งหน้าเป็นบันทึกเชิงเทคนิคเรื่องการจัดโครง DOM และประโยคเปิดยังตกทอดมาจาก checkbox ผิด ๆ ว่าสถานะเป็นกึ่งกลางได้ ซึ่งสวิตช์เป็นไม่ได้ |
| **Open UI** `[ทางการ]` | สำรวจ 44 design system แล้วสรุปว่าทุกระบบที่เทียบแนะนำให้มีผลทันทีโดยไม่ต้องส่งฟอร์ม |
| **Uber Base Web** `[ทางการ]` | **ไม่มีข้อความเรื่องนี้เลย** ทั้งรุ่นเก่าและรุ่นใหม่ |
| **Apple HIG** `[ทางการ]` | **ไม่มีข้อความเรื่องผลทันทีเลย** เกณฑ์ของ Apple เป็นคนละเรื่อง (ดู 8.2) |
| **GOV.UK** `[ทางการ]` | **ไม่มี component นี้ในระบบ** |
| **Nielsen Norman Group** `[แหล่งรอง]` | "Toggle-switch guidelines" ระบุว่าสวิตช์ต้องมีผลทันทีและไม่ควรต้องกด Save หรือ Submit |

### 8.2 Apple ใช้เกณฑ์คนละแบบ ต้องรายงานตรง ๆ

**Apple HIG หน้า Toggles ไม่มีคำว่า immediate และไม่มีข้อความเรื่องปุ่มบันทึกเลย** `[ทางการ]` เกณฑ์ของ Apple คือ **น้ำหนักทางสายตากับลำดับชั้น** และ **ตำแหน่งที่วาง**

> "In general, don't replace a checkbox with a switch. If you're already using a checkbox in your interface, it's probably best to keep using it."
> "Prefer a switch for settings that you want to emphasize. A switch has more visual weight than a checkbox, so it looks better when it controls more functionality than a checkbox typically does."
> "Use a checkbox instead of a switch if you need to present a hierarchy of settings."
> "Use the switch toggle style only in a list row. Outside of a list, use a button that behaves like a toggle, not a switch."

**แต่กฎ "ใช้เฉพาะในแถวของรายการ" ให้ผลลัพธ์เดียวกันโดยอ้อม** เพราะมันตัดสวิตช์ออกจากฟอร์มอิสระไปโดยปริยาย

### 8.3 GOV.UK และข้อมูลที่สวนทาง

**GOV.UK ไม่มีสวิตช์ในระบบจริง ยืนยันจากการไล่รายการ component ทั้งหมด** `[ทางการ]` แต่ **ไม่พบข้อความทางการที่เขียนว่าห้ามใช้** หลักฐานเป็นเชิงโครงสร้าง คือระบบมีแค่ Checkboxes กับ Radios และคำขอให้เพิ่มสวิตช์ค้างอยู่ในกระดานงานตั้งแต่ปี 2021 ยังไม่ถูกรับ

**และในคำขอนั้นมีข้อมูลที่สวนทางกับความคิดที่ว่าสวิตช์ไม่ดี** `[ทางการ]` ทีมที่ขอเขียนว่าหลังทำวิจัย 5 รอบพบว่าทรงสวิตช์เป็นทรงที่ผู้ใช้จำได้ ใช้เป็น และเข้าใจสถานะได้ดีที่สุด โดยเฉพาะผู้ใช้ที่มีความมั่นใจด้านดิจิทัลต่ำ และเหตุผลที่ radio กับ checkbox ใช้ไม่ได้คือ **มันเป็น input ที่ต้องกดส่ง**

> "radios and checkboxes are an input that needs submitting, rather than having an immediate effect on the page"

- [`alphagov/govuk-design-system-backlog` issue 244](https://github.com/alphagov/govuk-design-system-backlog/issues/244)

**และมีข้อมูลสวนทางอีกชุดที่ใหญ่กว่านั้น** `[ทางการ]` WHATWG กำลังเสนอ `<input type="checkbox" switch>` ซึ่ง **เป็น checkbox จริงที่ส่งค่าไปกับฟอร์มตามปกติ** และ WebKit ปล่อยใช้แล้วใน Safari 17.4 (ตรวจแล้วว่าข้อเสนอยังไม่ถูกรวมเข้ามาตรฐาน)

- [WHATWG HTML PR 9546](https://github.com/whatwg/html/pull/9546)
- [WebKit Features in Safari 17.4](https://webkit.org/blog/15063/web-inspector-styles-webkit-features-in-safari-17-4/)

**วิธีอ่านข้อมูลสองชุดนี้ให้ตรงกัน** ชั้นแพลตฟอร์มกำหนด **กลไก** ว่าสวิตช์คือ checkbox ที่หน้าตาต่างออกไป ส่วน design system กำหนด **การใช้งานที่เหมาะสม** ว่าควรมีผลทันที ทั้งสองเรื่องไม่ขัดกัน

**ความหมายสำหรับเรา** ให้ยึดถ้อยคำแบบ Carbon และ Atlassian คือใช้สวิตช์เฉพาะกับการตั้งค่าที่มีผลทันที ถ้ามีปุ่มบันทึกให้ใช้ checkbox และ **ให้เพิ่มกฎของ Primer เข้าไปด้วยว่าห้ามผสมตัวควบคุมที่บันทึกเองกับตัวควบคุมที่ต้องกดบันทึกในฟอร์มเดียวกัน** ซึ่งเป็นข้อที่ตรงกับหน้าจอตั้งค่าของ Nation มากที่สุด

---

## 9. Accessibility

### 9.1 role ที่แต่ละเจ้าใช้

| เจ้า | element ฐาน | role และ attribute |
|---|---|---|
| Material 3 | `input[type=checkbox]` | `role="switch"` และ `aria-checked` บวก **ต้องใส่ `aria-label` เสมอ** เพราะ `<label>` ไม่ผูกให้อัตโนมัติ (เอกสารเขียนกำกับไว้เอง) |
| Microsoft Fluent 2 | `input[type=checkbox]` | `role="switch"` ผูก `id` กับ `htmlFor` ให้อัตโนมัติ |
| Uber Base Web รุ่นใหม่ | `input[type=checkbox]` | `role="switch"` และเพิ่มการรองรับปุ่ม Enter เอง |
| Adobe Spectrum | `input[type=checkbox]` | `role="switch"` บังคับทับใน `useSwitch.ts` แป้นพิมพ์รองรับ **เฉพาะ Space** ไม่มี Enter |
| Salesforce Lightning | `input[type=checkbox]` | `role="switch"` **แต่ผูกข้อความสถานะด้วย `aria-describedby` ซึ่งชี้ไปที่กล่องที่มีทั้งคำว่า Enabled และ Disabled อยู่ด้วยกัน** เป็นจุดอ่อนของการเขียนแบบนี้ |
| Ant Design | `button` | `role="switch"` และ `aria-checked` บวกรองรับลูกศรซ้ายขวา **แต่ไม่บังคับให้มีป้ายกำกับเลย** |
| Shopify Polaris | `button` | `role="switch"` และ `aria-checked` |
| **IBM Carbon** | `button` | `role="switch"` และ `aria-checked` และ **ข้อความบอกสถานะถูกตั้ง `aria-hidden="true"`** เพราะสถานะสื่อผ่าน `aria-checked` แล้ว |
| **GitHub Primer** | `button` | **`aria-pressed` ไม่ใช่ `role="switch"`** และบังคับ `aria-labelledby` เป็น prop ที่ขาดไม่ได้ในระดับ TypeScript |
| Atlassian | `input[type=checkbox]` | ไม่มี `role="switch"` ใช้ checkbox ธรรมดา |
| Uber Base Web รุ่นเก่า | `input[type=checkbox]` | ไม่มี `role="switch"` |

**ข้อสังเกต ตลาดยังไม่ลงตัวเรื่องนี้** และ Primer อธิบายเหตุผลของตัวเองไว้ในเอกสารว่า "Toggle switches are buttons" จึงใช้พฤติกรรมของปุ่มทั้งหมด

**และมีข้อมูลเรื่องการรองรับที่ต้องรู้** `[แหล่งรอง แต่ผู้เขียนเป็นบรรณาธิการของสเปก]` การทดสอบของ Scott O'Hara พบว่า NVDA และ VoiceOver บน iOS อ่าน `role="switch"` เป็น checkbox ไม่ใช่ switch ซึ่งเป็นการถอยที่ยังใช้งานได้ ไม่ใช่การเงียบ แต่ **ข้อมูลชุดนั้นเป็นการทดสอบราว ปี 2021** สถานะปัจจุบันยืนยันไม่ได้

- [a11y_styled_form_controls checkbox--switch](https://scottaohara.github.io/a11y_styled_form_controls/src/checkbox--switch/)

### 9.2 กฎที่ทีมส่วนใหญ่พลาด ป้ายกำกับห้ามเปลี่ยนตามสถานะ

`[ทางการ]` WAI-ARIA APG เขียนเน้นไว้ตรง ๆ

> "Important: it is critical the label on a switch does not change when its state changes."

- [WAI-ARIA APG Switch Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)

แปลว่าป้ายกำกับต้องเป็น "Wi-Fi" ตลอดเวลา ห้ามสลับเป็น "เปิด Wi-Fi" กับ "ปิด Wi-Fi" และ **ต้องแยกให้ชัดระหว่างป้ายกำกับ (คงที่) กับข้อความบอกสถานะ (เปลี่ยนได้)** ซึ่งเป็นสองส่วนคนละอันใน Carbon และ Primer

เจ้าที่เขียนกฎนี้ไว้ในเอกสารตัวเอง

- **IBM Carbon** "It is essential that designers distinguish between the text indicating the on/off state of the toggle and the text that is the toggle's label. The label's text should not change based on the on/off state."
- **Atlassian** "Avoid changing the toggle label based on the on or off state. The label should be the same regardless of the current toggle setting."
- **GitHub Primer** "Don't use phrases that describe the switch's state in your label."
- **Microsoft Fluent 2** "Don't use 'Turn on' or 'Turn off' in switch labels." และ "Never make a switch label a question."

**และมีเจ้าที่ทำสวนทาง** Shopify Polaris บังคับให้ปุ่มเขียนว่า "Turn on" หรือ "Turn off" เท่านั้น ซึ่งทำได้เพราะ **มันเป็นปุ่มไม่ใช่สวิตช์** ป้ายกำกับของมันคือคำสั่ง ไม่ใช่ชื่อของสิ่งที่ถูกควบคุม

### 9.3 สถานะห้ามสื่อด้วยสีอย่างเดียว อ่านเกณฑ์ให้ถูก

**เกณฑ์ที่เกี่ยวมี 2 ข้อและคนมักสับสน**

**SC 1.4.1 Use of Color (ระดับ A)** `[ทางการ]` ห้ามใช้สีเป็นวิธีเดียวในการสื่อข้อมูล **สวิตช์มาตรฐานผ่านข้อนี้อยู่แล้วโดยไม่ต้องมีข้อความ เพราะตำแหน่งของปุ่มกลม (ซ้ายหรือขวา) เป็นสัญญาณที่ไม่ใช่สี** จะไม่ผ่านก็ต่อเมื่อออกแบบให้ปุ่มกลมไม่ขยับ

**SC 1.4.11 Non-text Contrast (ระดับ AA)** `[ทางการ]` คือข้อที่เข้มกว่าและตรวจยากกว่า ต้องมีอัตราคอนทราสต์อย่างน้อย 3 ต่อ 1 ใน 3 คู่นี้

- รางตอนเปิด เทียบพื้นหลังของหน้า
- รางตอนปิด เทียบพื้นหลังของหน้า
- ปุ่มกลม เทียบรางของตัวเอง **ทั้งตอนเปิดและตอนปิด**

**และไม่ต้องมี 3 ต่อ 1 ระหว่างสีรางตอนเปิดกับสีรางตอนปิด** เพราะสองสีนั้นไม่เคยอยู่ติดกัน W3C ยกตัวอย่างสวิตช์ไว้ในหน้าเกณฑ์นี้โดยตรง

- [WCAG 2.2 SC 1.4.1](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)
- [WCAG 2.2 SC 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)

**ข้อความบอกสถานะเป็นคำแนะนำ ไม่ใช่ข้อบังคับตามเกณฑ์** แต่ **IBM Carbon ยกระดับให้เป็นกฎของตัวเอง และเขียนไว้ชัดที่สุดในตลาด** `[ทางการ]` ในหัวข้อชื่อ Redundant state information

> "Carbon's default toggle uses both color and text to indicate on or off. Where space constraints make a smaller toggle desirable, Carbon adds a tickmark to the toggle's 'on' state so that if the text is not included, the component's on/off state can be distinguished without relying on use of color."

พร้อมคู่ควรทำและไม่ควรทำ "Do include the on/off text for the toggle's state whenever space permits" และ "Where space is confined, use the tickmark variation in lieu of on/off text"

**นี่คือเหตุผลที่เครื่องหมายถูกของ Carbon อยู่เฉพาะขนาดเล็ก** ไม่ใช่เพราะขนาดเล็กต้องการมากกว่า แต่เพราะขนาดเล็กคือขนาดที่ไม่มีที่ให้ข้อความ **แปลว่าทั้งสองอย่างเป็นตัวแทนกัน ไม่ใช่ของที่ต้องมีคู่กัน** ซึ่งเป็นแบบจำลองที่เราลอกได้ตรง ๆ

และ Apple เขียนคำแนะนำเชิงหลักการไว้แรงที่สุด `[ทางการ]`

> "Make sure the visual differences in a toggle's state are obvious. For example, you might add or remove a color fill, show or hide the background shape, or change the inner details you display, like a checkmark or dot, to show that a toggle is on or off. Avoid relying solely on different colors to communicate state, because not everyone can perceive the differences."

### 9.4 ภาพเคลื่อนไหว

**SC 2.3.3 Animation from Interactions เป็นระดับ AAA ไม่ใช่ AA** `[ทางการ]` ต้องรายงานให้ถูกว่าไม่ใช่ข้อบังคับระดับที่คนส่วนใหญ่ยึด แต่การเลื่อนของปุ่มกลมเป็นภาพประดับ ไม่ใช่ข้อมูลที่จำเป็น (ตำแหน่งสุดท้ายต่างหากที่เป็นข้อมูล) จึงต้องปิดได้

| เจ้า | จัดการ `prefers-reduced-motion` ไหม | รายละเอียด |
|---|---|---|
| Microsoft Fluent 2 | **มี** | ลด `transitionDuration` เหลือ 0.01ms ทั้งที่รางและปุ่มกลม |
| Ant Design | **มี** | `genNoMotionStyle()` ใส่ที่ราก, ราง, ข้อความสองอัน, ปุ่มกลม และ `::before` |
| GitHub Primer | **มี** | `transition: none` 3 จุด (ราง, กล่องไอคอน, ปุ่มกลม) |
| IBM Carbon | **มีแต่ไม่ครบ** | ปิด transition ของ `transform` ที่ปุ่มกลม **แต่ transition ของสีพื้นรางไม่ได้อยู่ในเงื่อนไขนั้น** จึงยังเคลื่อนไหวอยู่ เป็นช่องโหว่จริงในไฟล์ต้นทาง |
| Salesforce Lightning | **ไม่มี** | และปุ่มกลม **ไม่เลื่อนอยู่แล้ว** เพราะสลับระหว่าง pseudo-element สองอัน ส่วนบรรทัด `transition: transform` ที่เขียนไว้เป็นโค้ดที่ไม่ทำงาน |
| Material 3 | **ไม่มี** | ไม่มี query นี้ในไฟล์ใดเลย มีแต่ `forced-colors` |
| Atlassian | **ไม่มี** | มีแต่ `forced-colors` |
| Uber Base Web รุ่นใหม่ | **ไม่มี** | ทั้งที่ transition ยาวถึง 350ms ซึ่งยาวที่สุดในตลาด |
| Adobe Spectrum | **ไม่มี** | ตรวจแล้วในไฟล์ CSS ของ switch |

**ระยะเวลาเคลื่อนไหวที่ตลาดใช้** Primer 80ms, Atlassian 200ms, Ant Design 200ms, Material 3 300ms พร้อม easing ที่เลยเป้าแล้วเด้งกลับ และ Base Web 350ms

**ข้อสังเกต ไม่มีความสัมพันธ์ระหว่างการเคลื่อนไหวที่ยาวกับการจัดการเรื่องนี้** Base Web เคลื่อนไหวนานที่สุดแต่ไม่จัดการเลย ส่วน Primer เคลื่อนไหวสั้นที่สุดแต่จัดการครบ 3 จุด

---

## 10. ไอคอนหรือเครื่องหมายในปุ่มกลม

### 10.1 ต้องแยกให้ชัดว่าอยู่ในปุ่มกลมหรืออยู่ในราง

| เจ้า | ในปุ่มกลม | ในราง | รายละเอียด |
|---|---|---|---|
| Material 3 | **มี เป็นทางเลือก** | **ห้ามมีข้อความ** | เครื่องหมายถูกตอนเปิดกับกากบาทตอนปิด ขนาด 16 และ **ต้องขยายปุ่มกลมจาก 16 เป็น 24 เมื่อมีไอคอน** ผ่าน token `with-icon-handle-*` |
| IBM Carbon | **มี เฉพาะขนาดเล็ก** | ไม่มี | เครื่องหมายถูก 6 คูณ 5 อยู่ในปุ่มกลม สีเขียวบนปุ่มกลมสีขาว **แสดงเฉพาะเมื่อ `size` เป็น `sm` และไม่ใช่ read-only** ส่วนขนาดปกติใช้ข้อความบอกสถานะข้างรางแทน |
| Salesforce Lightning | **ไม่มี** | **มี** | เครื่องหมายถูกวาดด้วยเส้นขอบสองด้านหมุน 45 องศา **แต่ตำแหน่งอยู่บนรางฝั่งซ้าย ไม่ได้อยู่ในปุ่มกลม** และค่าพิกัดเป็นตัวเลขดิบที่คอมเมนต์ในไฟล์ยอมรับเองว่าตั้งมาลอย ๆ |
| Uber Base Web รุ่นใหม่ | **มี เปิดเอง** | ไม่มี | prop `showIcon` ค่าเริ่มต้นปิด แสดงเครื่องหมายถูกเฉพาะตอนเปิด ขนาด 12 และ 16 |
| Atlassian | ไม่มี | **มี** | เครื่องหมายถูกฝั่งซ้ายกับกากบาทฝั่งขวา ซ่อนตัวที่ไม่ใช้ด้วย `opacity: 0` ขนาด 16 และ 20 |
| GitHub Primer | ไม่มี | **มี** | ไอคอนขีด (ปิด) กับไอคอนวงกลม (เปิด) ขนาด 12 และ 16 เลื่อนสวนทางกับปุ่มกลม บวกข้อความ On กับ Off |
| Ant Design | ไม่มี (มีแต่ spinner ตอน loading) | **มีข้อความ** | `checkedChildren` และ `unCheckedChildren` ตัวอักษร 12 อยู่ในราง และรางยืดตามความยาวข้อความ |
| Microsoft Fluent 2 | ปุ่มกลม **คือ** ไอคอน | ไม่มี | ใช้ `CircleFilled` เป็นตัวปุ่มกลม แต่เป็นวงกลมเดียวกันทั้งสองสถานะ |
| Adobe Spectrum | **ไม่มี** | **ไม่มี** | ไม่มีทั้งไอคอนและข้อความ ใช้ตำแหน่งปุ่มกลม บวกขนาดปุ่มกลมที่โตขึ้นตอนเปิด (S2) เป็นสัญญาณที่ไม่ใช่สี |
| MUI, News UK NewsKit | ไม่มีเป็นค่าเริ่มต้น | NewsKit เปิดให้ใส่ได้ | NewsKit ใส่ได้ทั้งไอคอนในปุ่มกลม 1 อัน และไอคอนในราง 2 อัน |
| **NTGDS** | **ไม่มี** | **ไม่มี** | ไม่มีทั้งไอคอน ทั้งข้อความในราง ทั้งข้อความบอกสถานะ |

### 10.2 ความขัดแย้งที่ต้องตัดสิน ข้อความในราง

**Material 3 ห้ามอย่างชัดเจน** `[ทางการ]`

> "Don't add label text into the switch; the font size would be too small to be accessible. Use an appropriate icon instead."

**แต่ Ant Design ทำเป็นฟีเจอร์** `[ทางการ]` ด้วย `checkedChildren` และ `unCheckedChildren` ตัวอักษรขนาด 12

**เหตุผลของ M3 ตรวจสอบได้จริง** ตัวอักษร 12 ในรางสูง 22 ของ Ant คือขนาดที่เล็กกว่าเกณฑ์ที่ระบบเราใช้ (preset เล็กสุดของเราคือ `label/sm` และ `meta/helper` ที่ 12 แต่ใช้กับข้อความที่มีพื้นที่ปกติ ไม่ใช่ในกล่องสูง 22)

**ข้อเสนอสำหรับเรา ให้ยึดฝั่ง M3** ถ้าต้องบอกสถานะด้วยอย่างอื่นนอกจากสี ให้ใช้เครื่องหมายในปุ่มกลม หรือข้อความบอกสถานะที่วางอยู่ **นอกราง** แบบ Carbon และ Primer ไม่ใช่ข้อความในราง

### 10.3 ภาพรวมจาก Open UI

`[ทางการ]` สำรวจ 44 design system

- 70 เปอร์เซ็นต์ ไม่มีเนื้อหาข้างในเลย
- 30 เปอร์เซ็นต์ มีเนื้อหาในราง
- 18 เปอร์เซ็นต์ มีเนื้อหาในปุ่มกลม
- 88 เปอร์เซ็นต์ ใช้ภาพเคลื่อนไหวแบบเปลี่ยนสีพื้นหลัง
- 16 เปอร์เซ็นต์ เลื่อนรางทั้งอัน

- [Open UI Switch Explainer](https://open-ui.org/components/switch.explainer/)

**อ่านตัวเลขนี้ให้ถูก** การไม่มีไอคอนเป็นเสียงส่วนใหญ่จริง **แต่เจ้าที่ไม่มีไอคอนเกือบทุกเจ้ามีอย่างอื่นทดแทน**

- Carbon และ Primer มีข้อความบอกสถานะข้างราง
- SLDS มีข้อความบอกสถานะใต้ราง บวกเครื่องหมายถูกบนราง
- Ant Design มีข้อความในราง
- Adobe Spectrum ใช้ปุ่มกลมที่โตขึ้นตอนเปิด (จาก 8 เป็น 10 ที่ขนาดกลาง) เป็นสัญญาณเชิงขนาด
- Material 3 และ Base Web ใช้ปุ่มกลมที่โตขึ้นเช่นกัน บวกเปิดทางให้ใส่ไอคอนได้

**สิ่งที่แทบไม่มีใครทำคือไม่มีทั้งไอคอน ไม่มีทั้งข้อความ ไม่มีทั้งการเปลี่ยนขนาดปุ่มกลม เหลือแต่สีกับตำแหน่ง ซึ่งเป็นสถานะปัจจุบันของเรา** และแม้จะยังผ่าน SC 1.4.1 ได้เพราะปุ่มกลมขยับ แต่ก็เป็นการผ่านแบบไม่มีชั้นสำรองเลย

**ข้อสังเกตที่ใช้ตัดสินใจได้** ในบรรดาชั้นสำรองทั้งหมด **การเปลี่ยนขนาดปุ่มกลมตอนเปิดเป็นทางที่ถูกที่สุดสำหรับเรา** เพราะไม่กินพื้นที่เพิ่ม ไม่ต้องมีไอคอน ไม่ต้องมีข้อความ และเป็นสิ่งที่ 3 เจ้าที่ออกแบบใหม่ล่าสุด (Material 3, Spectrum 2, Base Web รุ่นใหม่) เลือกทำเหมือนกันหมด

---

## 11. เทียบของเรากับตลาด

| ประเด็น | ตลาดทำอย่างไร | เราทำอย่างไร | คำตัดสิน |
|---|---|---|---|
| จำนวนขนาด | มัธยฐานและค่าที่พบบ่อยที่สุดคือ 2 ขนาด (7 เจ้า) | 2 ขนาด (sm, md) | **เท่ากัน** เลือกถูกแล้ว ไม่ต้องแก้ |
| ความสูงราง | กระจาย 10 ถึง 32 ค่าที่ใช้กันมากที่สุดคือ 16, 20, 22, 24 | 20 และ 24 | **เท่ากัน** ค่าอยู่กลางย่านที่ตลาดใช้ |
| การเชื่อมกับสเกลความสูงกลาง | **ไม่มีเจ้าไหนเอาตัวสวิตช์ไปผูกกับสเกลของปุ่ม** แต่ **Adobe Spectrum แยกสองชั้น** ให้ภาพสวิตช์อยู่บนสเกลของตัวเอง และให้แถวที่กดได้ผูกกับ `component-height-*` | **ไม่เชื่อมทั้งสองชั้น ไม่มีสูตรอะไรเลย และไม่มีแถวที่กดได้ด้วย** | **ตามหลัง** ชั้นแรกเราเหมือนตลาดโดยบังเอิญ แต่ **ชั้นที่สองเราไม่มีเลย** ซึ่งเป็นชั้นที่แก้ปัญหาพื้นที่แตะให้เราได้ฟรี ๆ |
| สัดส่วนกว้างต่อสูงของราง | แตกเป็นสองกลุ่ม 2.00 (**10 แถว**) กับ 1.57 ถึง 1.70 (**7 แถว**) และ **ทุกเจ้าคงสัดส่วนเดียวหรือไล่ขึ้นอย่างเป็นระบบภายในระบบตัวเอง** | 1.80 กับ 1.83 **ไม่ตรงกับกลุ่มไหน และไม่คงที่ข้ามขนาดของตัวเองด้วย** | **ตามหลัง** ปัญหาไม่ใช่ว่า 1.8 ผิด (Spectrum รุ่นแรกใช้ 1.86) แต่คือค่าสองขนาดไม่ตรงกัน ซึ่งพิสูจน์ว่าไม่มีสูตร |
| ขนาดปุ่มกลมเทียบความสูงราง | สูตร `ปุ่มกลม = ความสูง ลบ ระยะขอบใน คูณ 2` แทบทุกเจ้า | 16 และ 20 ซึ่ง **ตรงกับสูตรนั้นพอดี** ทั้งสองขนาด | **เท่ากัน** ส่วนนี้ถูกอยู่แล้ว |
| ระยะขอบในราง | 2 คือค่าที่ใช้กันมากที่สุด (Fluent, Ant, Atlassian, SLDS) | 2 ทั้งสองขนาด | **เท่ากัน** เลือกถูกแล้ว |
| การมีสูตรขนาด | Ant และ Spectrum ทำสูตรเต็ม, Fluent และ M3 ทำสูตรบางส่วน, Atlassian ค่าตายที่บังเอิญเข้าสูตร | **ไม่มีไฟล์ `tokens/scale/toggle.mjs` และไม่มี token ของสวิตช์เลยแม้แต่ตัวเดียว** | **ตามหลัง** และผิดกฎ CLAUDE.md ที่เขียนว่า component ที่มีหลายขนาดต้องนิยามสูตรไปพร้อมกัน |
| การแยกแกนเปิดปิดจากแกนโต้ตอบ | ทุกเจ้าแยกสองแกน ไม่มีใครยุบเป็นแกนเดียว | แยกสองแกนแล้ว `Active` เปิดปิด คูณ `State` ค่าเดียว 4 ค่า | **เท่ากัน** และเป็นข้อที่สวิตช์ของเราทำได้ดีกว่าช่องกรอกของเราเองอย่างชัดเจน |
| สถานะ pressed | 5 เจ้ามี (M3, Carbon, Ant, Spectrum, Primer) และ 3 ใน 5 เปลี่ยนรูปทรงปุ่มกลมด้วย ไม่ใช่แค่สี **และ IBM Carbon ถึงกับตัด hover ทิ้งไปเลย เหลือแค่ focus กับ active** | ไม่มี ทั้งที่มี hover ซึ่งแทบไม่เกิดบนมือถือ | **ตามหลัง** และเป็นการตามหลังที่กลับทางกับความจริงของผู้ใช้เรา |
| สถานะ read-only | 2 เจ้ามี (Carbon วาดหน้าตาให้จริงในชั้น CSS ส่วน Spectrum มีในเอกสารและใน React แต่ไม่มีใน CSS) | ไม่มี | **เท่ากัน** ตามหลังพร้อมกับอีก 9 เจ้า ไม่ใช่ข้อที่ต้องรีบ |
| สถานะ loading | 4 เจ้ามี (Ant, Primer, Atlassian, GitLab Pajamas) | ไม่มี | **ตามหลัง** แต่เป็นข้อที่รอได้จนกว่าจะตัดสินเรื่องการบันทึกทันที |
| พื้นที่แตะ | M3 ประกาศ 48 เป็น token, **Spectrum เขียนกฎระดับระบบว่าอย่างน้อย 48 และผูกความสูงแถวกับสเกลกลาง**, Base Web ได้ 48 พอดีทั้งสองขนาด, Primer ตั้ง 44 ใน `pointer: coarse`, Fluent ได้ 56 คูณ 36 | **ไม่ประกาศเลย** และ sm สูง 20 ต่ำกว่าเกณฑ์ AA ของ WCAG 2.2 ที่ 24 | **ตามหลัง** และเป็นข้อที่หนักที่สุดในรายงานนี้ เราอยู่กลุ่มเดียวกับ Ant Design และ Atlassian ที่ไม่ขยายเลย |
| บอกสถานะโดยไม่พึ่งสี | 3 เจ้ามีเครื่องหมายในปุ่มกลม, 3 เจ้ามีในราง, 3 เจ้ามีข้อความบอกสถานะ, **3 เจ้าที่ออกแบบใหม่ล่าสุดใช้ปุ่มกลมที่โตขึ้นตอนเปิด** (M3, Spectrum 2, Base Web ใหม่) | **มีแค่ตำแหน่งปุ่มกลม ซึ่งผ่าน SC 1.4.1 แต่ไม่มีชั้นสำรองใด ๆ** | **ตามหลัง** ไม่ถึงกับผิดเกณฑ์ แต่เป็นการผ่านแบบเฉียดฉิว และยังไม่ได้ตรวจ SC 1.4.11 ที่ต้องได้ 3 ต่อ 1 ถึง 4 คู่ |
| ตำแหน่งข้อความ | ท้ายสวิตช์เป็นค่าเริ่มต้นของเจ้าที่มีป้ายกำกับในตัว | ท้ายสวิตช์ | **เท่ากัน** เลือกถูกแล้ว |
| คำอธิบายใต้หัวข้อ | Primer, GitLab Pajamas, Polaris Web Components มี | มี | **เท่ากัน** |
| วิธีจัดโครงของสวิตช์พร้อมข้อความ | **ทุกเจ้าทำเป็นคุณสมบัติหรือช่องเสียบของชุดเดิม มีเจ้าเดียวที่แยกชุด และชุดนั้นถูกประกาศเลิกใช้พร้อมคำสั่งให้ประกอบเอง** | **แยกเป็นชุดที่สอง 16 แบบ เท่ากับชุดหลักเป๊ะ** ทุกการแก้ต้องทำสองรอบ | **ตามหลัง** ไม่ใช่เพราะมีสวิตช์พร้อมข้อความ แต่เพราะวิธีจัดโครงทำให้ต้นทุนดูแลเป็นสองเท่า และเดินตามรอยที่ Polaris เพิ่งถอยออกมา |
| ความถูกต้องของค่าที่พิมพ์มือ | เจ้าที่มีสูตรไม่มีค่าหลุด **ส่วนเจ้าที่พิมพ์มือหลุดจริง** (Primer หลุดระหว่าง React กับ Rails, Ant หลุดระหว่างสองขนาดของตัวเอง) | ระยะเยื้องคำอธิบาย sm พิมพ์ 46 แต่ควรเป็น 44 และความกว้างทั้งก้อนตั้งตายทำให้ sm สูงกว่า md | **ตามหลัง** แต่ตามหลังในโรคเดียวกับที่ Primer และ Ant เป็น ซึ่งยืนยันว่าสาเหตุคือการไม่มีสูตร ไม่ใช่ความไม่รอบคอบ |
| การผูกสีเป็นตัวแปร | ทุกเจ้าคุมสีด้วย token | ผูกครบแล้ว ไม่มีสีดิบ | **เท่ากัน** และดีกว่าหน้า 13 Input ที่ยังเหลือ 90 จุด |
| เอกสารประจำหน้า | ทุกเจ้ามีหน้าเอกสารพร้อมกติกาเลือกใช้ และ 8 เจ้าเขียนกฎเรื่องปุ่มบันทึกไว้ชัด | ยังไม่มี `docs/14-toggles.md` | **ตามหลัง** |

**สรุปคำตัดสินรวม ตามหลัง 10 ข้อ เท่ากัน 9 ข้อ นำหน้า 0 ข้อ**

**ข้อสังเกตที่สำคัญ สวิตช์ของเราอยู่ในสภาพที่ดีกว่าช่องกรอกมาก** โครงสถานะถูกต้องแล้ว จำนวนขนาดถูกแล้ว ระยะขอบในถูกแล้ว ขนาดปุ่มกลมเข้าสูตรของตลาดพอดีแล้ว สีผูกครบแล้ว **ของที่ตามหลังเกือบทั้งหมดเป็นของที่ยังไม่ได้ทำ ไม่ใช่ของที่ทำผิดโครง** ยกเว้นข้อเดียวคือการแยก `Text Toggle` เป็นชุดที่สอง ซึ่งเป็นปัญหาเชิงโครงสร้างจริงและเป็นข้อที่แก้ทีหลังแพงที่สุด

**และมีของที่เราไม่มีเลยแม้แต่ชั้นเดียว คือแถวที่กดได้** ทุกเจ้าที่จัดการเรื่องพื้นที่แตะได้ดีล้วนมีกล่องอีกชั้นครอบสวิตช์อยู่ ไม่ว่าจะทำด้วย `min-block-size` (Spectrum), token พื้นที่แตะ (M3), pseudo-element (Primer) หรือระยะขอบในเมื่ออุปกรณ์เป็นสัมผัส (Base Web) **ของเรามีแค่ตัวสวิตช์ลอย ๆ** ซึ่งเป็นสาเหตุเดียวของทั้งข้อพื้นที่แตะและข้อที่ `Text Toggle` ต้องพิมพ์ค่าเลย์เอาต์เอง

---

## 12. ข้อเสนอสำหรับ NTGDS

### 12.1 ควรมีกี่ขนาด และควรผูกกับ CONTROL_HEIGHT หรือไม่

**ข้อเสนอ คงไว้ที่ 2 ขนาด (sm, md) และ แยกเป็นสองชั้นตามแบบ Adobe Spectrum**

- **ชั้นภาพสวิตช์** ไม่ผูกกับ `CONTROL_HEIGHT` ให้มีสเกลของตัวเองใน `tokens/scale/toggle.mjs`
- **ชั้นแถวที่กดได้** ผูกกับ `CONTROL_HEIGHT` ตรง ๆ

**เหตุผลจากหลักฐาน 6 ข้อ**

1. **ไม่มีเจ้าไหนในตลาดเอาตัวสวิตช์ไปผูกกับสเกลความสูงของปุ่ม** ทุกเจ้าให้สวิตช์มีชุดตัวแปรของตัวเอง Spectrum มี `switch-control-height-*` แยกจาก `component-height-*` Carbon เขียนค่าตายและไม่ import ไฟล์สเกลกลางเลย SLDS ประกาศ token ในไฟล์ที่ตั้ง `scope: component` และเจ้าที่เชื่อมบางส่วนก็เชื่อมแบบถอยลง (Ant ใช้ `controlHeight / 2` Apple แนะนำขนาด **mini**)
2. **แต่เจ้าที่ทำดีที่สุดไม่ได้ปล่อยให้ลอยนอกระบบ มันผูกอีกชั้นหนึ่งแทน** Spectrum จับ `switch-min-height` เข้ากับ `component-height-75/100/200/300` ตรง ๆ แล้วยืด `<input>` โปร่งใสคลุมทั้งแถว **ผลคือได้ทั้งสวิตช์ที่ตัวเล็กพอดีกับบรรทัดข้อความ และได้แถวที่สูงพอสำหรับการแตะ** ซึ่งแก้สองปัญหาของเราพร้อมกันด้วยกลไกเดียว
3. **หลักฐานที่ชี้ขาดคือ Carbon** เจ้าที่เราใช้เป็นเหตุผลหลักตอนตัดสินให้ช่องกรอกรวมสูตรกับปุ่ม เพราะปุ่มกับช่องกรอกเรียก mixin ตัวเดียวกัน **กลับไม่ลากสวิตช์เข้ามาในสเกลนั้น** และไม่ลาก checkbox เข้ามาด้วย ถ้าเราจะอ้าง Carbon ตอนผูกช่องกรอก เราก็ต้องยอมรับ Carbon ตอนไม่ผูกสวิตช์
4. **เหตุผลเชิงการวางเลย์เอาต์ตรงกับกรณีอวาตาร์ ไม่ใช่กรณีช่องกรอก** สวิตช์ไม่ได้วางในแถวเดียวกับปุ่มแบบที่ช่องค้นหาวางคู่ปุ่มค้นหา **สวิตช์วางในบรรทัดเดียวกับข้อความ** ในรายการตั้งค่า ซึ่ง **Ant Design ยืนยันเจตนานี้ด้วยโค้ด** โดยตั้งความสูงรางขนาดปกติเท่ากับ `fontSize` คูณ `lineHeight` พอดี คือเท่ากับหนึ่งบรรทัดข้อความ ไม่ใช่เท่ากับช่องกรอก
5. **ตัวเลขไม่ลงตัวถ้าฝืนผูกที่ชั้นภาพ** `CONTROL_HEIGHT` ให้ 24, 32, 40, 48, 56 ถ้าสวิตช์ต้องใช้ค่าเหล่านี้เป็นความสูงราง ขนาดเล็กสุดที่ใช้ได้คือ 24 แล้วขนาดถัดไปคือ 32 ซึ่งสูงกว่าที่ตลาดใช้เกือบทุกเจ้า มีแค่ M3, Primer และ Base Web รุ่นใหม่ที่ถึง 32 และทั้งสามเจ้ามีสวิตช์ที่กว้างกว่าของเรามาก (52 ถึง 64) เพื่อรักษาสัดส่วนไว้
6. **ค่าที่เสนอตรงกับของจริงในตลาดเป๊ะสองเจ้า** ราง 48 คูณ 24 ปุ่มกลม 20 ระยะขอบใน 2 **คือค่าเดียวกับ Salesforce Lightning ทุกตัว** และราง 48 คูณ 24 ยังตรงกับ Carbon ขนาดปกติด้วย ส่วนราง 40 คูณ 20 ตรงกับ Fluent 2 ขนาดกลางและ Atlassian ขนาดใหญ่

**ค่าที่เสนอ ชั้นภาพสวิตช์**

```
TRACK_HEIGHT = { base: 20, step: 4 }   // sm 20, md 24  (คงค่าเดิม ไม่ต้องย้ายของ)
TRACK_WIDTH  = TRACK_HEIGHT x 2        // sm 40, md 48  (แก้จาก 36 และ 44)
INSET        = 2                        // คงค่าเดิม
KNOB         = TRACK_HEIGHT - INSET x 2 // sm 16, md 20 (คงค่าเดิม ตรงกับที่วัดได้)
TRAVEL       = TRACK_WIDTH - KNOB - INSET x 2 = TRACK_HEIGHT  // sm 20, md 24
```

**ค่าที่เสนอ ชั้นแถวที่กดได้**

```
ROW_HEIGHT.sm = CONTROL_HEIGHT[sm] = 32   // สวิตช์สูง 20 จัดกึ่งกลาง เหลือช่องบนล่างข้างละ 6
ROW_HEIGHT.md = CONTROL_HEIGHT[md] = 40   // สวิตช์สูง 24 จัดกึ่งกลาง เหลือช่องบนล่างข้างละ 8
```

**และบนอุปกรณ์สัมผัสให้ยกแถวเป็น 48 ทั้งสองขนาด** ตามที่ Base Web ทำ ซึ่งจะผ่านทั้งเกณฑ์ 48dp ของ Android และ 44pt ของ Apple พร้อมกัน ส่วนบนเดสก์ท็อป 32 กับ 40 ผ่านเกณฑ์ AA ของ WCAG อยู่แล้ว

**สิ่งที่ชั้นที่สองแก้ให้เราโดยไม่ต้องทำอะไรเพิ่ม 3 อย่าง**

- พื้นที่แตะ ผ่านเกณฑ์ทันทีโดยไม่ต้องเปลี่ยนขนาดสวิตช์ที่ตาเห็น
- สวิตช์วางเรียงกับปุ่มและช่องกรอกในแถวเดียวกันได้พอดี เพราะแถวสูงเท่ากัน **ซึ่งได้ประโยชน์ของการผูกสเกลกลางกลับมาโดยไม่ต้องทำให้ตัวสวิตช์อ้วน**
- `Text Toggle` ได้ที่ยึดสำหรับจัดวางข้อความ แทนที่จะพิมพ์ระยะเยื้องมือ

**จุดที่สวยของข้อเสนอนี้คือ ปุ่มกลมกับระยะขอบในของเราถูกอยู่แล้ว ต้องแก้แค่ความกว้างรางอย่างเดียว** จาก 36 เป็น 40 และจาก 44 เป็น 48 แล้วทุกอย่างจะเข้าสูตรพอดี และค่าที่ได้คือ **40 คูณ 20 ซึ่งตรงกับ Fluent 2 ขนาดกลางและ Atlassian ขนาดใหญ่เป๊ะ** และ **48 คูณ 24 ซึ่งตรงกับ Carbon ขนาดปกติเป๊ะ**

**ทำไมเลือกสัดส่วน 2.00 ไม่ใช่กลุ่ม 1.6 ตอบตรง ๆ** กลุ่ม 1.6 (Material 3 และ Base Web รุ่นใหม่) เป็นทรงที่ใหม่กว่าจริง และเป็นทางเลือกที่ชอบธรรม **แต่ทั้งสองเจ้าในกลุ่มนั้นใช้ปุ่มกลมที่โตขึ้นตอนเปิด** ซึ่งเป็นกลไกที่ต้องมาคู่กัน เพราะสัดส่วนที่แคบทำให้ระยะเลื่อนสั้น จึงต้องใช้การเปลี่ยนขนาดปุ่มกลมช่วยบอกสถานะแทน ถ้าเราเลือก 1.6 โดยไม่ทำปุ่มกลมโต จะได้สวิตช์ที่ระยะเลื่อนสั้นและไม่มีอะไรชดเชย ส่วนเหตุผลเชิงปฏิบัติคือ **2.00 เป็นสัดส่วนเดียวที่ให้จำนวนเต็มที่ทั้งสองขนาดจากความสูง 20 กับ 24 ที่เรามีอยู่** (1.75 ให้ 35 กับ 42 ซึ่งเป็นเลขคี่ ส่วน 1.80 ให้ 36 กับ 43.2 ซึ่งไม่ลงตัว)

**ข้อควรระวังเรื่องการเขียนสูตร** ความสูงราง 20 และ 24 เท่ากับ `CONTROL_HEIGHT` ของ sm (32) และ md (40) ลบ 12 พอดีทั้งคู่ **ห้ามเขียนเป็นสูตรอนุพันธ์ในโค้ด** เพราะเลข 12 ไม่ได้มีความหมายอะไร ให้ `TRACK_HEIGHT` เป็น base กับ step ของตัวเอง แล้วเขียนคอมเมนต์กำกับว่าค่านี้ถูกเลือกอย่างอิสระและบังเอิญห่างเท่ากัน เพื่อกันไม่ให้คนรุ่นหลังไปผูกสูตรผิด ซึ่งเป็นบทเรียนเดียวกับที่ `avatar.mjs` เขียนกำกับไว้ว่าขนาดอวาตาร์ตรงกับความสูงปุ่มโดยบังเอิญ ห้ามไปอ้าง `button.mjs`

**แต่ `ROW_HEIGHT` ต้องอ้าง `CONTROL_HEIGHT` จริง ๆ ไม่ใช่พิมพ์ 32 กับ 40 ซ้ำ** เพราะนั่นคือจุดประสงค์ทั้งหมดของชั้นที่สอง คือถ้าวันหนึ่งความสูงปุ่มขยับ แถวของสวิตช์ต้องขยับตาม ไม่งั้นจะเกิดอาการเดียวกับที่ Primer เจอ คือฝั่งหนึ่งอ้าง token ฝั่งหนึ่งพิมพ์ค่าตาย แล้วหลุดจากกันโดยไม่มีใครรู้

### 12.2 สัดส่วนรางกับปุ่มกลม ควรเป็นสูตรหรือตารางค่า

**ข้อเสนอ ควรเป็นสูตร และควรตั้งค่าที่ระยะขอบในกับความสูง ไม่ใช่ตั้งที่ขนาดปุ่มกลม**

**เหตุผล**

1. **ตลาดที่ทำเป็นสูตรเขียนตรงกันหมดว่าปุ่มกลมเป็นผลลัพธ์** Fluent เขียน `thumbSize = trackHeight - spaceBetweenThumbAndTrack` Ant เขียน `handleSize = height - padding * 2` M3 ปล่อยให้ระยะขอบในเป็นผลลัพธ์ของการจัดกึ่งกลาง และค่าของ Atlassian กับ Carbon ก็ตรงกับสูตรนี้ทุกขนาดแม้จะเขียนเป็นตารางค่า **ไม่มีเจ้าไหนตั้งขนาดปุ่มกลมเป็นตัวเลขอิสระ**
2. **ระยะเลื่อนต้องเป็นผลลัพธ์ ห้ามตั้งแยกเด็ดขาด** M3 เขียนเป็นสูตรบรรทัดเดียว Fluent คำนวณใน `translateX` และ **MUI ซึ่งพิมพ์ระยะเลื่อนตายไว้เป็นตัวอย่างของสิ่งที่ไม่ควรทำ** เพราะค่าจะพังทันทีที่มีคนเปลี่ยนธีม
3. **โมเดลนี้ตรงกับ `avatar.mjs` ที่เราทำไปแล้ว** คือกำหนดขนาดกล่องกับไอคอน แล้วปล่อยให้ระยะเว้นขอบเป็นผลลัพธ์ ที่นี่กลับด้านกันคือกำหนดความสูงกับระยะขอบใน แล้วปล่อยให้ปุ่มกลมเป็นผลลัพธ์ ซึ่งดีกว่าเพราะระยะขอบในเป็นค่าที่ต้องคงที่ข้ามขนาดเพื่อให้สวิตช์ทุกขนาดดูเป็นตระกูลเดียวกัน
4. **ต้องมีด่านตรวจ เพราะการมีสูตรอย่างเดียวไม่พอ** หลักฐานคือ Ant Design ที่มีสูตรครบแต่สูตรความกว้างของสองขนาดใช้ตัวคูณต่างกัน (คูณ 4 กับคูณ 2) ทำให้สัดส่วนหลุดจาก 2.00 เป็น 1.75 เฉพาะขนาดเล็ก ด่านตรวจของสวิตช์คือ `ระยะขอบใน คูณ 2 บวก ปุ่มกลม เท่ากับ ความสูงราง` และ `ความกว้างราง เท่ากับ ความสูงราง คูณ 2` ตรงกับกฎ `padding คูณ 2 บวก icon เท่ากับขนาดปุ่ม` ที่เรามีอยู่แล้วใน CLAUDE.md

### 12.3 ควรเพิ่มสถานะอะไร และควรแยกแกนอย่างไร

**เรื่องแกน ไม่ต้องแก้อะไร** โครงปัจจุบันคือ `Active` เปิดปิด คูณ `State` คุณสมบัติเดียว 4 ค่า ซึ่งตรงกับที่ทุกเจ้าในตลาดทำ **ให้ยืนยันโครงนี้ไว้เป็นทางการในเอกสาร** เพื่อกันไม่ให้ใครมาเปลี่ยนเป็นตัวเปิดปิดหลายตัวแบบที่ช่องกรอกเป็น

**เรื่องค่าใน `State` ข้อเสนอเพิ่ม 1 ค่าตอนนี้ และเตรียมอีก 2 ค่าไว้ทีหลัง**

| ค่า | เพิ่มตอนนี้ไหม | เหตุผล |
|---|---|---|
| `default`, `hover`, `focus`, `disabled` | มีแล้ว | คงไว้ |
| **`pressed`** | **เพิ่มตอนนี้** | มี 5 เจ้า (M3, Carbon, Ant, Spectrum, Primer) และ 3 ใน 5 เปลี่ยนรูปทรงปุ่มกลมไม่ใช่แค่สี **สำหรับผู้ใช้ที่อยู่บนมือถือเกิน 70 เปอร์เซ็นต์ สถานะกดสำคัญกว่าสถานะ hover ที่แทบไม่เกิดเลย** และเรามี hover แต่ไม่มี pressed ซึ่งกลับทางกับความจริง |
| `read-only` | ยังไม่ต้อง | มี 2 เจ้า และมีเจ้าเดียวที่วาดหน้าตาให้จริงในชั้น CSS คือ Carbon ส่วนเรายังไม่มีหน้าจอที่ใช้ ให้รอจนมีโจทย์จริง |
| `loading` | ยังไม่ต้อง | มี 4 เจ้า แต่เป็นเรื่องของการเชื่อมต่อหลังบ้าน ควรตัดสินพร้อมกับตอนวางกติกาว่าสวิตช์บันทึกทันทีอย่างไร |

**ข้อเสนอเพิ่มเติมเรื่องหน้าตาของ pressed** ให้ทำแบบ M3 และ Ant คือ **เปลี่ยนรูปทรงปุ่มกลมด้วย ไม่ใช่แค่เปลี่ยนสี** เพราะบนมือถือนิ้วบังตัวสวิตช์อยู่ การเปลี่ยนสีอย่างเดียวมองไม่เห็น แต่ปุ่มกลมที่โตขึ้นจะล้นออกมาจากใต้นิ้วให้เห็นได้

**และควรพิจารณาตัด hover ทิ้งด้วยซ้ำ** `[ทางการ]` IBM Carbon ทำแบบนั้น ไล่ทั้งไฟล์ SCSS ไม่มีคำว่า hover เลย เหลือแค่ `:focus` กับ `:active` ที่ให้วงแหวนเดียวกัน **สำหรับผลิตภัณฑ์ที่ผู้ใช้ 70 เปอร์เซ็นต์อยู่บนมือถือ การมี hover แต่ไม่มี pressed คือการลงแรงผิดที่** อย่างน้อยที่สุดถ้ายังไม่กล้าตัด hover ก็ต้องเพิ่ม pressed ให้ครบก่อน

**ข้อเสนอเรื่องปุ่มกลมโตขึ้นตอนเปิด** ถ้าจะตัดสินเรื่องการบอกสถานะโดยไม่พึ่งสี (ดูข้อ 12.5 ลำดับ 4) **ทางที่ถูกที่สุดคือให้ปุ่มกลมโตขึ้นตอนเปิด** ซึ่ง 3 เจ้าที่ออกแบบใหม่ล่าสุดทำเหมือนกันหมด M3 โตจาก 16 เป็น 24, Spectrum 2 โตจาก 8 เป็น 10, Base Web รุ่นใหม่โตจาก 16 เป็น 24 ข้อดีคือไม่กินพื้นที่เพิ่ม ไม่ต้องมีไอคอน ไม่ต้องมีข้อความ **แต่ต้องตัดสินพร้อมกับสูตร** เพราะสูตรต้องมีช่องเก็บขนาดปุ่มกลมสองค่าแทนที่จะเป็นค่าเดียว

**จำนวนแบบที่ได้** ปัจจุบัน `Toggle` มี 2 ขนาด คูณ 4 สถานะ คูณ 2 เปิดปิด เท่ากับ 16 แบบ ถ้าเพิ่ม `pressed` จะเป็น 2 คูณ 5 คูณ 2 เท่ากับ **20 แบบ** ซึ่งยังอยู่ในระดับที่ดูแลไหว

### 12.4 `Text Toggle` ควรอยู่เป็นชุดแยกหรือยุบเป็นคุณสมบัติ

**ข้อเสนอ ยุบเป็นคุณสมบัติของชุดหลัก ไม่ควรคงเป็นชุดแยก**

**เหตุผลจากหลักฐาน 4 ข้อ**

1. **ตลาดตอบข้อนี้ชัดที่สุดในบรรดา 9 ประเด็น** ทุกเจ้าที่มีสวิตช์พร้อมข้อความทำเป็นคุณสมบัติหรือช่องเสียบของชุดเดิม (Fluent มี `labelPosition` 3 ค่า, Base Web รุ่นใหม่มี 2 ค่า, NewsKit มี `labelPosition`, Carbon มีป้ายกำกับในตัว, Primer รับข้อความผ่าน `aria-labelledby` และคำบรรยายผ่าน `aria-describedby`, GitLab Pajamas และ Polaris Web Components มีคำอธิบายเป็น prop)
2. **มีเจ้าเดียวที่แยกชุด และเจ้านั้นถอยออกมาแล้ว** Polaris `SettingToggle` ถูกประกาศ deprecated พร้อมคำสั่งให้ไปประกอบเองจาก layout กับ typography primitives แทน **นี่คือหลักฐานที่ตรงกับกรณีของเราที่สุด เพราะ `SettingToggle` มีโครงเดียวกับ `Text Toggle` เป๊ะ คือหัวข้อ คำอธิบาย และตัวควบคุม**
3. **ตรงกับบรรทัดฐานที่เราเพิ่งตั้งเองตอนลบช่องบัตร** เหตุผลตอนนั้นคือ ของที่เป็นแค่การจัดวางรอบตัวควบคุม ไม่ควรเป็นชุดที่ทำให้จำนวนแบบคูณกับตัวควบคุม **`Text Toggle` เข้าเงื่อนไขเดียวกันทุกข้อ** มันไม่มีตรรกะของตัวเอง มันคือสวิตช์ตัวเดิมบวกข้อความสองบรรทัด
4. **ต้นทุนที่จ่ายอยู่ตอนนี้พิสูจน์ตัวเองแล้ว** ความผิดพลาดสองอย่างที่วัดเจอ (ขนาดเล็กสูงกว่าขนาดใหญ่ และระยะเยื้องผิด 2px) **เกิดขึ้นเฉพาะในชุดที่สอง ไม่เกิดในชุดหลัก** เพราะชุดที่สองต้องพิมพ์ค่าเลย์เอาต์มือซ้ำอีกรอบ ทุกครั้งที่แก้สวิตช์ต้องแก้สองที่ และการใช้งานจริงของชุดที่สองมีแค่ 6 จุด เทียบกับ 19 จุดของชุดหลัก **จ่ายค่าดูแลเท่าตัวเพื่อของที่ใช้น้อยกว่าหนึ่งในสาม**

**รูปแบบที่เสนอ** ให้ชุดหลักมีช่องเสียบข้อความ พร้อมตัวเปิดปิด 2 ตัวที่ไม่คูณจำนวนแบบ คือ เปิดปิดหัวข้อ และเปิดปิดคำอธิบาย และให้ระยะเยื้องของคำอธิบายมาจากสูตร `ความกว้างราง บวก ระยะห่าง` ไม่ใช่พิมพ์มือ

**และต้องเลิกตั้งความกว้างทั้งก้อนเป็นค่าตายตัว** เพราะนั่นคือสาเหตุที่ขนาดเล็กสูงกว่าขนาดใหญ่ ให้ก้อนข้อความยืดตามพื้นที่ที่มี แล้วความสูงจะเป็นผลลัพธ์ที่ถูกต้องเอง

**เสียอะไรไป ตอบตรง ๆ 3 ข้อ**

1. **เสียการหยิบใช้ที่เร็ว** คนที่เคยลาก `Text Toggle` มาวางแล้วได้ภาพครบทันที ต้องเปิดตัวเปิดปิดเองสองตัว แลกกับการที่แก้สวิตช์ครั้งเดียวแล้วได้ทั้งสองแบบ
2. **เสีย instance เดิม 6 จุดที่ต้องผูกใหม่** ซึ่งเป็นจำนวนที่น้อยมาก และเป็นเหตุผลว่าทำไมข้อนี้ควรทำ **ตอนนี้** ไม่ใช่ตอนที่มี 60 จุด
3. **เสียเวลาเขียนเอกสารกำกับ** ว่าจะเปิดหัวข้อกับคำอธิบายเมื่อไหร่ ซึ่งเป็นงานที่ต้องทำอยู่แล้วเพราะยังไม่มี `docs/14-toggles.md`

### 12.5 ลำดับความสำคัญ

**กลุ่ม ก. แก้ทีหลังแพง (กระทบชื่อ token หรือโครง variant) ต้องตัดสินก่อนลงมือทำอย่างอื่น**

| ลำดับ | เรื่อง | ทำไมแพงถ้าแก้ทีหลัง |
|---|---|---|
| 1 | **ตัดสินว่ายุบ `Text Toggle` เป็นคุณสมบัติ** | เปลี่ยนโครง variant ทุก instance ต้องผูกใหม่ ตอนนี้มี 6 จุด ถ้ารอจนเป็นหลายสิบจุดจะย้ายไม่ไหว เหมือนที่ช่องกรอกเจอ |
| 2 | **ตัดสินโครงสองชั้น และสร้าง `tokens/scale/toggle.mjs`** ให้ชั้นภาพมีสเกลของตัวเอง และชั้นแถวอ้าง `CONTROL_HEIGHT` | ชื่อ token ที่ออกมาจะกลายเป็นสัญญากับโค้ดทันที **และการเพิ่มชั้นแถวทีหลังแพงกว่ามาก** เพราะต้องไปครอบกล่องใหม่ให้ทุก instance ที่วางไปแล้ว ถ้าทำตั้งแต่ต้นมันคือ auto-layout ชั้นเดียว |
| 3 | **เพิ่ม `pressed` เข้า `State`** | เพิ่มค่าใน variant ทีหลังทำได้ แต่ทุก instance ที่วางไปแล้วจะต้องตรวจซ้ำ และถ้าเพิ่มพร้อมกับข้อ 1 จะได้ผูกใหม่รอบเดียวจบ **และถ้าเลือกให้ pressed เปลี่ยนขนาดปุ่มกลม ต้องตัดสินก่อนเขียนสูตร** เพราะสูตรต้องมีที่ให้ค่าที่สอง |
| 4 | **ตัดสินกลไกบอกสถานะโดยไม่พึ่งสี** มี 4 ทางเลือก ปุ่มกลมโตขึ้นตอนเปิด, เครื่องหมายในปุ่มกลม, ข้อความบอกสถานะนอกราง, หรือไม่ทำเพิ่มเลย | **ทุกทางเลือกยกเว้นข้อสุดท้ายกระทบสูตร** ถ้าเลือกปุ่มกลมโตขึ้น สูตรต้องเก็บขนาดปุ่มกลมสองค่า ถ้าเลือกเครื่องหมาย ต้องขยายปุ่มกลมให้ไอคอนพอ (M3 ขยายจาก 16 เป็น 24 ส่วนปุ่มกลมของเราที่ 16 กับ 20 ใส่ไอคอนได้ยากมาก) **ทางที่ถูกที่สุดคือปุ่มกลมโตขึ้น** ตามที่ 3 เจ้าที่ออกแบบใหม่ล่าสุดเลือก |

**กลุ่ม ข. แก้ทีหลังได้ ไม่กระทบชื่อ token หรือโครง variant**

| ลำดับ | เรื่อง | หมายเหตุ |
|---|---|---|
| 5 | **แก้ความกว้างราง 36 เป็น 40 และ 44 เป็น 48** | เป็นการแก้ค่า ไม่ใช่แก้โครง ทำเมื่อไหร่ก็ได้ แต่ทำพร้อมข้อ 2 จะประหยัดรอบ |
| 6 | **แก้ระยะเยื้องคำอธิบาย 46 เป็น 44** | จะหายไปเองถ้าทำข้อ 1 เพราะค่าจะมาจากสูตร |
| 7 | **เลิกตั้งความกว้างทั้งก้อนเป็นค่าตายตัว** | แก้แล้วปัญหาขนาดเล็กสูงกว่าขนาดใหญ่จะหายเอง |
| 8 | **ประกอบชั้นแถวที่กดได้จริงในไฟล์ออกแบบ** | ถ้าตัดสินข้อ 2 แล้ว ข้อนี้คือการลงมือ ตั้งความสูงแถวเป็น 32 กับ 40 บนเดสก์ท็อป และ 48 บนอุปกรณ์สัมผัส แล้วจัดสวิตช์กึ่งกลางในแถว **48 ผ่านทั้ง Android 48dp และ Apple 44pt พร้อมกัน** |
| 9 | **ตรวจคอนทราสต์ตาม SC 1.4.11** 4 คู่ (รางเปิดเทียบพื้นหน้า, รางปิดเทียบพื้นหน้า, ปุ่มกลมเทียบรางตอนเปิด, ปุ่มกลมเทียบรางตอนปิด) | เป็นการตรวจค่าที่มีอยู่แล้ว ไม่ใช่การออกแบบใหม่ ถ้าไม่ผ่านค่อยขยับสี |
| 10 | **ผูก effect style ให้ครบ** | `shadows/bottom/sm` มี description อ้างถึง toggle อยู่แล้ว ต้องตรวจว่า component ผูกจริงหรือแค่เขียนไว้ |
| 11 | **เขียน `docs/14-toggles.md`** | ต้องมีอย่างน้อย 3 กฎ สวิตช์ต้องมีผลทันที ห้ามใช้ในฟอร์มที่ต้องกดบันทึกให้ใช้ checkbox แทน และ **ห้ามผสมตัวควบคุมที่บันทึกเองกับตัวควบคุมที่ต้องกดบันทึกในฟอร์มเดียวกัน** (กฎของ Primer) บวกกฎว่าป้ายกำกับห้ามเปลี่ยนตามสถานะ (กฎของ WAI-ARIA APG) |
| 12 | **จัดการ `prefers-reduced-motion`** | เป็นเรื่องของชั้นโค้ด ไม่กระทบ Figma ส่งต่อให้ ui-engineer ตอนแปลงเป็นโค้ด ใช้แบบ Carbon และ Primer คือ `transition: none` ใน `@media (prefers-reduced-motion: reduce)` |

**สิ่งที่ไม่ต้องทำในรอบนี้** อย่าเพิ่มสถานะ `read-only` และ `loading` อย่าเพิ่มจำนวนขนาด และ **อย่าใส่ข้อความในราง** ทั้งสี่อย่างนี้ตลาดส่วนน้อยเท่านั้นที่มี และข้อสุดท้ายมีเจ้าใหญ่ห้ามไว้อย่างชัดเจน

---

## 13. สิ่งที่ยืนยันไม่ได้ในรอบนี้

| เรื่อง | สาเหตุ |
|---|---|
| ค่าเป็น px ของ News UK NewsKit ทั้ง 3 ขนาด | ค่าอยู่ในชั้น theme ที่หาไฟล์ต้นทางไม่เจอ เอกสารระบุแค่ว่ามี 3 ขนาดและพื้นที่กดโตตามขนาด |
| เนื้อหาของ SLDS รุ่น 2 | เว็บไซต์ปัจจุบันเปลี่ยนไปใช้ระบบที่ต้องรันสคริปต์ ดึงเนื้อหาไม่ได้ ค่าทั้งหมดของ SLDS ในรายงานนี้จึงมาจากที่เก็บโค้ดซึ่ง **ถูกเก็บถาวรแล้ว** และจากเว็บไซต์รุ่นแรกที่ยังเปิดอยู่ |
| ขนาดจริงของสวิตช์ Apple เป็น pt | Apple ไม่ประกาศตัวเลขของสวิตช์ในเอกสารเลย ตัวเลข 51 คูณ 31 ที่คนอ้างกันมาจากการวัดหรือจากไฟล์ Design Resources ไม่ใช่จากเอกสาร |
| ขนาดของ `s-switch` ใน Polaris Web Components | เอกสารไม่ระบุ prop ขนาดและไม่ระบุ px |
| สถานะ pressed ของ NewsKit | ไม่พบ selector ที่ชัดเจนในไฟล์ที่ดึงได้ ไม่ได้แปลว่าไม่มี |
| หน้าเอกสารออกแบบของ Adobe Spectrum 2 สำหรับ Switch | `s2.spectrum.adobe.com` คืนค่า 403 สำหรับทุกหน้าย่อย มีแต่หน้าแรก ค่าของ S2 ทั้งหมดในรายงานนี้จึงมาจากไฟล์ token กับไฟล์ React ของ Adobe เอง ซึ่งเป็นต้นทางเดียวกันแต่เป็นชั้นโค้ด ไม่ใช่ชั้นเอกสารออกแบบ |
| เหตุผลทางการของ GitHub Primer ที่เลือก `aria-pressed` แทน `role="switch"` | อ่านได้จากโค้ดและจากประโยค "Toggle switches are buttons" ในเอกสาร แต่ไม่มีบันทึกการตัดสินใจอย่างเป็นทางการ |
| สถานะการรองรับ `role="switch"` ในโปรแกรมอ่านหน้าจอ ณ ปัจจุบัน | ข้อมูลที่ดีที่สุดที่หาได้เป็นการทดสอบราวปี 2021 (Firefox 88, NVDA 2020.4, JAWS 2020) ผลปัจจุบันต้องทดสอบใหม่ |
| ข้อความทางการของ GOV.UK ที่ห้ามใช้สวิตช์ | **ไม่มี** หลักฐานเป็นเชิงโครงสร้างล้วน คือไม่มีในรายการ component และคำขอค้างในกระดานงานตั้งแต่ปี 2021 ต้องนำเสนอแบบนั้น ห้ามยกเป็นคำพูด |
| ค่าระยะห่างระหว่างป้ายกำกับกับสวิตช์ของ Material 3 และ Apple | ทั้งสองเจ้าไม่ประกาศ เพราะป้ายกำกับอยู่นอก component |
| ขนาดของ Carbon ที่เอกสารระบุว่าปุ่มกลมเป็น 1.25rem | เป็นความคลาดเคลื่อนในหน้าเอกสารของ Carbon เอง ค่าจริงในไฟล์ SCSS คือ 1.125rem เท่ากับ 18px ในรายงานนี้ยึดตามไฟล์ต้นทาง |

---

## 14. แหล่งอ้างอิงหลัก

**ไฟล์ต้นทางที่อ่านโดยตรง**

- Material 3 [`tokens/versions/v0_192/_md-comp-switch.scss`](https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-comp-switch.scss) และ [`tokens/_md-comp-switch.scss`](https://raw.githubusercontent.com/material-components/material-web/main/tokens/_md-comp-switch.scss) และ [`switch/internal/_handle.scss`](https://raw.githubusercontent.com/material-components/material-web/main/switch/internal/_handle.scss) และ [`switch/internal/_switch.scss`](https://raw.githubusercontent.com/material-components/material-web/main/switch/internal/_switch.scss)
- MUI [`packages/mui-material/src/Switch/Switch.js`](https://raw.githubusercontent.com/mui/material-ui/master/packages/mui-material/src/Switch/Switch.js)
- IBM Carbon [`scss/components/toggle/_toggle.scss`](https://raw.githubusercontent.com/carbon-design-system/carbon/main/packages/styles/scss/components/toggle/_toggle.scss) และ [`scss/utilities/_layout.scss`](https://raw.githubusercontent.com/carbon-design-system/carbon/main/packages/styles/scss/utilities/_layout.scss) และ [`toggle/usage.mdx`](https://raw.githubusercontent.com/carbon-design-system/carbon-website/main/src/pages/components/toggle/usage.mdx)
- Microsoft Fluent 2 [`useSwitchStyles.styles.ts`](https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-switch/library/src/components/Switch/useSwitchStyles.styles.ts) และ [`SwitchBestPractices.md`](https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-switch/stories/src/Switch/SwitchBestPractices.md)
- Ant Design [`components/switch/style/index.ts`](https://raw.githubusercontent.com/ant-design/ant-design/master/components/switch/style/index.ts) และ [`rc-switch/src/index.tsx`](https://raw.githubusercontent.com/react-component/switch/master/src/index.tsx) และ [`components/style/motion/util.ts`](https://raw.githubusercontent.com/ant-design/ant-design/master/components/style/motion/util.ts)
- Atlassian [`@atlaskit/toggle/dist/cjs/toggle.compiled.css`](https://unpkg.com/@atlaskit/toggle@17.3.0/dist/cjs/toggle.compiled.css) และ [usage.mdx บน Bitbucket mirror](https://bitbucket.org/atlassian/atlassian-frontend-mirror/raw/HEAD/design-system/toggle/constellation/index/usage.mdx)
- GitHub Primer [`ToggleSwitch.tsx`](https://raw.githubusercontent.com/primer/react/main/packages/react/src/ToggleSwitch/ToggleSwitch.tsx) และ [`ToggleSwitch.module.css`](https://raw.githubusercontent.com/primer/react/main/packages/react/src/ToggleSwitch/ToggleSwitch.module.css) และ [`toggle_switch.pcss`](https://raw.githubusercontent.com/primer/view_components/main/app/components/primer/alpha/toggle_switch.pcss) และ [`ui-patterns/saving.mdx`](https://raw.githubusercontent.com/primer/design/main/content/ui-patterns/saving.mdx)
- Adobe Spectrum [`packages/@react-spectrum/s2/src/Switch.tsx`](https://raw.githubusercontent.com/adobe/react-spectrum/main/packages/%40react-spectrum/s2/src/Switch.tsx) และ [`spectrum-css/components/switch/index.css`](https://raw.githubusercontent.com/adobe/spectrum-css/main/components/switch/index.css) และ [`packages/tokens/src/switch.json`](https://raw.githubusercontent.com/adobe/spectrum-design-data/main/packages/tokens/src/switch.json) และ [`packages/tokens/src/layout.json`](https://raw.githubusercontent.com/adobe/spectrum-design-data/main/packages/tokens/src/layout.json) และ [`react-aria/src/switch/useSwitch.ts`](https://raw.githubusercontent.com/adobe/react-spectrum/main/packages/react-aria/src/switch/useSwitch.ts)
- Salesforce Lightning [`ui/components/checkbox-toggle/base/_index.scss`](https://raw.githubusercontent.com/salesforce-ux/design-system/main/ui/components/checkbox-toggle/base/_index.scss) และ [`checkbox-toggle/tokens/sizing.yml`](https://raw.githubusercontent.com/salesforce-ux/design-system/main/ui/components/checkbox-toggle/tokens/sizing.yml) และ [`checkbox-toggle/base/_touch.scss`](https://raw.githubusercontent.com/salesforce-ux/design-system/main/ui/components/checkbox-toggle/base/_touch.scss)
- Uber Base Web [`src/switch/styled-components.ts`](https://raw.githubusercontent.com/uber/baseweb/main/src/switch/styled-components.ts) และ [`src/checkbox/styled-components.ts`](https://raw.githubusercontent.com/uber/baseweb/main/src/checkbox/styled-components.ts) และ [`src/themes/shared/sizing.ts`](https://raw.githubusercontent.com/uber/baseweb/main/src/themes/shared/sizing.ts)
- Shopify Polaris [`SettingToggle.tsx`](https://raw.githubusercontent.com/Shopify/polaris/main/polaris-react/src/components/SettingToggle/SettingToggle.tsx) และ [`setting-toggle.mdx`](https://raw.githubusercontent.com/Shopify/polaris/main/polaris.shopify.com/content/components/deprecated/setting-toggle.mdx)

**หน้าเอกสารทางการ**

- [Open UI Switch Explainer](https://open-ui.org/components/switch.explainer/) สำรวจ 44 design system
- [Material 3 Switch](https://m3.material.io/components/switch) และ [Material Components Android Switch.md](https://raw.githubusercontent.com/material-components/material-components-android/master/docs/components/Switch.md)
- [Apple HIG Toggles](https://developer.apple.com/design/human-interface-guidelines/toggles) และ [Apple HIG Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)
- [Fluent 2 Switch usage](https://fluent2.microsoft.design/components/web/react/core/switch/usage)
- [Adobe Spectrum Switch](https://spectrum.adobe.com/page/switch/) และ [Adobe Spectrum Platform scale](https://spectrum.adobe.com/page/platform-scale/) และ [Adobe Spectrum Checkbox](https://spectrum.adobe.com/page/checkbox/)
- [Salesforce Lightning Checkbox Toggle](https://v1.lightningdesignsystem.com/components/checkbox-toggle/)
- [Carbon Toggle accessibility](https://carbondesignsystem.com/components/toggle/accessibility/) และ [Carbon Checkbox usage](https://carbondesignsystem.com/components/checkbox/usage/)
- [NewsKit Switch](https://www.newskit.co.uk/components/switch/)
- [GitLab Pajamas Toggle](https://design.gitlab.com/components/toggle/)
- [GOV.UK Design System components](https://design-system.service.gov.uk/components/) และ [กระดานงานค้าง issue 244](https://github.com/alphagov/govuk-design-system-backlog/issues/244)
- [WHATWG HTML PR 9546 switch attribute](https://github.com/whatwg/html/pull/9546) และ [WebKit Features in Safari 17.4](https://webkit.org/blog/15063/web-inspector-styles-webkit-features-in-safari-17-4/)

**มาตรฐาน**

- [WAI-ARIA 1.2 switch role](https://www.w3.org/TR/wai-aria-1.2/#switch) และ [APG Switch Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)
- [WCAG 2.2 SC 2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) และ [SC 2.5.5 Target Size (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html)
- [WCAG 2.2 SC 1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html) และ [SC 1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
- [WCAG 2.2 SC 2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) และ [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [Android Accessibility touch target](https://support.google.com/accessibility/android/answer/7101858)

---

## 15. คำถามที่ต้องตัดสินก่อนลงมือ

1. **ยุบ `Text Toggle` เป็นคุณสมบัติของชุดหลักหรือไม่** ถ้ายุบ ต้องผูก instance ใหม่ 6 จุด และเป็นข้อที่ควรทำตอนนี้ที่ยังน้อย
2. **ยืนยันโครงสองชั้นตามแบบ Adobe Spectrum ใช่หรือไม่** คือชั้นภาพสวิตช์มีสเกลของตัวเองใน `tokens/scale/toggle.mjs` และชั้นแถวที่กดได้อ้าง `CONTROL_HEIGHT` (32 กับ 40 บนเดสก์ท็อป และ 48 บนอุปกรณ์สัมผัส)
3. **แก้ความกว้างราง 36 เป็น 40 และ 44 เป็น 48 เพื่อเข้าสัดส่วน 2 เท่า** ใช่หรือไม่ ค่าที่ได้จะตรงกับ Fluent 2, Atlassian, Carbon และ SLDS พอดี
4. **เพิ่ม `pressed` เข้า `State` ทำให้ `Toggle` เป็น 20 แบบ** ใช่หรือไม่ และ **ให้ pressed เปลี่ยนขนาดปุ่มกลมด้วยหรือแค่เปลี่ยนสี** ข้อหลังกระทบสูตร ต้องตัดสินพร้อมกัน
5. **จะตัด `hover` ทิ้งด้วยไหม** ตามที่ IBM Carbon ทำ เพราะผู้ใช้เราอยู่บนมือถือเกิน 70 เปอร์เซ็นต์ ถ้าตัด `State` จะเหลือ 4 ค่า และจำนวนแบบจะกลับไปเป็น 16 เท่าเดิม
6. **เลือกกลไกบอกสถานะโดยไม่พึ่งสี** ระหว่าง ปุ่มกลมโตขึ้นตอนเปิด (ถูกที่สุด ไม่กินพื้นที่ แต่กระทบสูตร), เครื่องหมายในปุ่มกลม (ต้องขยายปุ่มกลม กระทบสูตรมากกว่า), ข้อความบอกสถานะนอกราง (ไม่กระทบสูตร แต่กินพื้นที่), หรือไม่ทำเพิ่มเลย (ยังผ่าน SC 1.4.1 เพราะปุ่มกลมขยับ)
7. **ให้ทำ `docs/14-toggles.md` ในรอบเดียวกันหรือแยกรอบ**
