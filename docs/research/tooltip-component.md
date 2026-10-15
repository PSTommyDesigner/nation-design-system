---
title: "Tooltip Component research"
description: "เทียบ component tooltip ของ DS เจ้าใหญ่ 15 เจ้า บวกมาตรฐาน W3C จากไฟล์ต้นทางจริง พร้อมข้อเสนอโครงหน้า 20 Tooltips ของ NTGDS เน้นเส้นแบ่งกับ popover และ toggletip ตัวกระตุ้นและจังหวะหน่วงเวลา ตำแหน่งและลูกศร ทรงสี การเข้าถึงตามข้อ 1.4.13 และบริบทเว็บข่าวบนมือถือ"
research_date: "2026-10-05"
scope: "Material 3 (token ของ Material Web, Compose Material3, Compose Foundation, AppCompat, Material Components Android), IBM Carbon (Tooltip, DefinitionTooltip, IconTooltip, Popover, Toggletip), Shopify Polaris, Adobe Spectrum (spectrum-tokens, Spectrum CSS, React Spectrum, React Aria, React Stately), Atlassian (@atlaskit/tooltip และ @atlaskit/motion), Ant Design (Tooltip และ rc-component/tooltip), GitHub Primer (TooltipV2), Microsoft Fluent 2 (react-tooltip และ react-positioning), Salesforce Lightning (slds-popover_tooltip), Uber Base Web (Tooltip บน Popover), Pinterest Gestalt (Tooltip, InternalTooltip, HelpButton), Untitled UI (Figma kit และ React), Radix, Mantine, Chakra UI v3 กับ Zag, Floating UI (core และ utils) บวก WAI-ARIA APG, WCAG 2.2, Sarah Higley และการสำรวจ HTML ของเว็บในเครือ 6 เว็บกับเว็บข่าวต่างประเทศ 4 เว็บ"
status: "draft รอตัดสิน"
owner: "ux-researcher"
---

# Research Tooltip ของ Design System เจ้าใหญ่

**วันที่วิจัย:** 2026-10-05
**โจทย์:** หาข้อมูลเพื่อตัดสินโครงหน้า 20 Tooltips ครอบคลุม 7 กลุ่มคำถาม คือ เส้นแบ่งกับของใกล้เคียง, ตัวกระตุ้นและจังหวะ, ตำแหน่งและลูกศร, รูปร่างและขนาด, การเข้าถึง, การเคลื่อนไหว และบริบทเว็บข่าว

**ป้ายแหล่ง:** `[ทางการ]` ไฟล์ต้นทางหรือเอกสารขององค์กรเอง `[มาตรฐาน]` W3C `[แหล่งรอง]` คนนอกสรุปหรือวิจัย `[คำนวณ]` ผู้วิจัยคำนวณจากค่าในไฟล์ต้นทาง `[ตีความ]` ความเห็นของผู้วิจัย ไม่ใช่ข้อเท็จจริง `[ของเรา]` ค่าที่อ่านจากไฟล์ในโปรเจกต์นี้ `[สำรวจ]` ผู้วิจัยดึงหน้าเว็บมาตรวจเอง

> **วิธีเก็บข้อมูล:** ตัวเลขทุกตัวในตารางอ่านจาก **แพ็กเกจ npm ที่เผยแพร่จริง** (ดาวน์โหลดด้วย `npm pack` วันที่ 2026-10-05) และจาก **ไฟล์ต้นทางบน GitHub ของ Google และ Adobe และ Untitled UI** ไม่ได้อ่านจากหน้าเว็บที่คนสรุปไว้ ตามวิธีเดียวกับ [toast-banner-component.md](toast-banner-component.md) และ [tabs-component.md](tabs-component.md)
>
> **ลิงก์อ้างอิงทั้ง 108 รายการในหัวข้อ 14 ตรวจแล้วว่าคืน HTTP 200 ทุกอัน** (ตรวจวันที่ 2026-10-05) ลิงก์ unpkg ชี้ไปที่เวอร์ชันเดียวกับที่อ่าน จึงเปิดตรวจซ้ำได้
>
> **ค่าคอนทราสต์ทุกตัวในเอกสารนี้ผู้วิจัยคำนวณเอง** ด้วยสูตร relative luminance ของ WCAG จากค่าสีที่อ่านจากไฟล์ต้นทาง กำกับ `[คำนวณ]` ไว้ทุกจุด
>
> **หน้าเอกสารที่ประกอบด้วยสคริปต์ดึงไม่ได้** คือ m3.material.io, spectrum.adobe.com, polaris.shopify.com และ lightningdesignsystem.com ข้อมูลของ Material 3 จึงมาจากไฟล์ token กับซอร์ส Compose และ Android บน GitHub ส่วน Polaris กับ SLDS มาจากไฟล์ mdx บน GitHub และโค้ดที่เผยแพร่ ดูข้อจำกัดเต็มในหัวข้อ 12
>
> **ไม่ได้เปิดไฟล์ Figma ของเจ้าอื่น และอ่านไฟล์ Figma ของเราแบบอ่านอย่างเดียว** งานรอบนี้ไม่ได้แก้ Figma ไม่ได้แก้ token ไม่ได้แตะโค้ด

---

## 1. สรุปคำตอบ 7 กลุ่ม (อ่านหน้าเดียวจบ)

| กลุ่ม | คำตอบสั้นจากข้อมูลจริง |
|---|---|
| **ก. เส้นแบ่งกับของใกล้เคียง** | **คำว่า tooltip เป็นคำที่ทุกเจ้าใช้ตรงกันหมด 15 ใน 15 เจ้า** ซึ่งต่างจากกรณี toast กับ banner ที่ชื่อกระจัดกระจาย **เกณฑ์ที่ตรงกันคือ tooltip กระตุ้นด้วยการชี้หรือโฟกัส มีแต่ตัวหนังสือ และกดอะไรข้างในไม่ได้ ส่วนของที่กระตุ้นด้วยการคลิกและมีของที่กดได้ข้างในเป็นของอีกชิ้นหนึ่ง** ซึ่งเจ้าส่วนใหญ่เรียกว่า popover มีเจ้าเดียวที่เรียกว่า toggletip คือ Carbon **เรื่องของที่กดได้ข้างใน tooltip มี 5 เจ้าเขียนห้ามตรง ๆ** และ **1 เจ้าเคยทำแล้วประกาศถอนออกเพราะเข้าถึงไม่ได้ คือ Gestalt** และ **W3C ห้ามด้วย** เจ้าเดียวที่อนุญาตคือ Material 3 และอนุญาตเฉพาะในของที่ตั้งชื่อแยกว่า rich tooltip **ส่วนเรื่องรวมตัวกระตุ้นไว้ในชิ้นเดียวกับคำใบ้ ตลาดแยกออก 15 ใน 15 เจ้า** tooltip ทุกเจ้ารับตัวกระตุ้นเข้ามาเป็นลูก ไม่ได้วาดไอคอนเอง และเจ้าที่ต้องการชุด "ไอคอนช่วยเหลือบวกคำใบ้" ไปทำเป็น component อีกตัวที่ชื่อตามตัวกระตุ้น เช่น `IconButton` ของ Carbon และ `HelpButton` ของ Gestalt |
| **ข. ตัวกระตุ้นและจังหวะ** | **ชี้บวกโฟกัสคือค่าเริ่มต้นของตลาด 13 ใน 15 เจ้า** มี 2 เจ้าที่ปิดโฟกัสไว้เป็นค่าเริ่มต้น คือ Mantine และ Ant **หน่วงเวลาเปิดกระจายมากที่สุดในเอกสารนี้ ตั้งแต่ 0 ถึง 1500 มัธยฐาน 200** และ **หน่วงเวลาปิดมัธยฐาน 150** **กลไกเปิดเร็วขึ้นเมื่อเพิ่งปิดไปหมาด ๆ มี 6 เจ้าที่ทำจริง** คือ Spectrum, Atlassian, Fluent, Radix, Mantine และ Zag โดย Spectrum ตั้งชื่อกลไกนี้ว่า warm up กับ cool down **บนจอสัมผัส ตลาดแตกเป็น 2 ค่ายชัด** ค่ายที่ซ่อนไปเลย 5 เจ้า (Radix, Zag, React Aria, Mantine, Primer) และค่ายที่เปลี่ยนเป็นกดค้าง 1 เจ้า คือ Material 3 ที่เหลือไม่ได้จัดการอะไร |
| **ค. ตำแหน่งและลูกศร** | **12 ตำแหน่งคือฐานนิยมของตลาด 7 เจ้า** (Carbon, Ant, Fluent, Mantine, Radix, Chakra กับ Zag, SLDS) ช่วงที่พบคือ 4 ถึง 22 **ชื่อที่ชนะคือ `top` กับ `top-start` กับ `top-end`** ใช้ 7 เจ้า ส่วนแบบ `topLeft` หรือ `top-left` เหลือ 3 เจ้า และ Carbon ประกาศเลิกใช้แล้ว **กลไกพลิกเมื่อชนขอบจอมีทุกเจ้า 15 ใน 15** และ **กลไกที่ตลาดใช้ร่วมกันคือ `flip` ของ Floating UI** ที่พลิกไปด้านตรงข้ามก่อน ถ้ายังไม่พอให้เลือกที่พอดีที่สุด **ลูกศรไม่ใช่ของบังคับ** 3 เจ้าไม่มีลูกศรเลย (Atlassian, Primer, Gestalt) และ 6 เจ้าปิดไว้เป็นค่าเริ่มต้น **ขนาดลูกศรมัธยฐานสูง 8** ของเราสูง 4 ซึ่งเท่ากับค่าต่ำสุดของตลาด คือ Mantine |
| **ง. รูปร่างและขนาด** | **พื้นเข้มตัวหนังสือขาวคือทรงของตลาด 12 ใน 14 เจ้าที่กำหนดสีมาให้** (Radix ไม่กำหนดสี) มี 2 เจ้าที่ใช้พื้นขาวมีเส้นขอบเป็นค่าเริ่มต้น คือ Fluent 2 และ Polaris และ **มี 6 เจ้าที่ทำทั้งสองทรง** (Carbon, Fluent, Material, Mantine, Ant, SLDS) โดยเหตุผลที่พบคือต้องการให้ tooltip ดูไม่เหมือนพื้นผิวของหน้า **ของเราตั้งค่าเริ่มต้นเป็นพื้นขาว ซึ่งอยู่ฝั่งเสียงข้างน้อย** **ไม่มีเจ้าไหนทำแกนขนาดให้ tooltip เลยสักเจ้า 0 ใน 15** ของที่ใกล้เคียงที่สุดคือ Polaris ที่มี 2 ความกว้าง **ความกว้างสูงสุดมัธยฐาน 250** ช่วง 160 ถึง 420 **ไม่พบเจ้าไหนกำหนดจำนวนคำหรือจำนวนบรรทัดสูงสุด** **สองชั้นหัวข้อบวกข้อความรองมี 2 เจ้า** คือ Material 3 (เรียกว่า rich tooltip) และ Untitled UI **เงาไม่มีฉันทามติ** 8 เจ้าใส่เป็นค่าเริ่มต้น และ 5 เจ้าไม่ใส่ และ 1 เจ้ามีกลไกแต่ปิดไว้ (Carbon) และ 1 เจ้าไม่กำหนด (Radix) และเจ้าที่ใช้พื้นเข้มมักไม่ใส่เงา |
| **จ. การเข้าถึง** | **`aria-describedby` ใช้เมื่อตัวกระตุ้นมีชื่ออยู่แล้ว และ `aria-labelledby` หรือ `aria-label` ใช้เมื่อตัวกระตุ้นไม่มีชื่อ เช่น ปุ่มไอคอนล้วน** มี 3 เจ้าที่ทำเป็นสวิตช์ให้เลือกชัด ๆ คือ Carbon (`label` กับ `description`), Primer (`type`) และ Fluent (`relationship` ที่**บังคับให้ระบุ**) **ข้อ 1.4.13 มี 3 ข้อย่อย และข้อที่ตลาดตกมากที่สุดคือ hoverable** โดย **Mantine ตกหนักสุด** เพราะตั้ง `pointer-events: none` และปิดโฟกัสไว้ทั้งสองอย่าง ส่วน **Chakra กับ Zag ตั้ง `interactive: false`** ทำให้ย้ายเมาส์ไปบน tooltip แล้วหาย **Escape ปิดได้ 11 ใน 15 เจ้า** เจ้าที่ไม่พบกลไกคือ Gestalt, Ant, SLDS และ Base Web แบบ controlled **กลไกที่แก้ hoverable ได้สวยที่สุดคือพื้นที่ปลอดภัยรูปหลายเหลี่ยม** ซึ่ง Radix เรียกว่า grace area และ Spectrum เรียกว่า safe area โดยเผื่อระยะไว้ 8 |
| **ฉ. การเคลื่อนไหว** | **ไม่มีการย่อขยาย 6 เจ้า** (เลือนล้วน 3 เจ้า และเลือนบวกเลื่อน 3 เจ้า) มี **3 เจ้าที่ใส่การย่อขยายด้วย** คือ Ant (0.8 ไป 1) และ Chakra (0.95 ไป 1) และ Untitled UI (`zoom-in-95`) และ **4 เจ้าไม่มีการเคลื่อนไหวเลย** คือ Fluent, SLDS, Gestalt และ Carbon และ **2 เจ้าไม่กำหนด** คือ Radix และ Material **ช่วงเวลาที่ตลาดใช้คือ 20 ถึง 350 มัธยฐาน 100** **Atlassian เป็นเจ้าเดียวที่ขาออกเร็วกว่าขาเข้าแบบประกาศเป็นกฎ** คือคูณ 0.5 เสมอ และ **เจ้าที่มีกลไกเปิดเร็วจะข้ามการเคลื่อนไหวทิ้งไปเลยตอนสลับ tooltip** |
| **ช. บริบทข่าว** | **สำรวจหน้าแรกทั้ง 6 เว็บในเครือและเว็บข่าวต่างประเทศ 4 เว็บวันที่ 2026-10-05 แล้วไม่พบ tooltip ของระบบดีไซน์แม้แต่ที่เดียว** คำว่า tooltip ปรากฏ 0 ครั้งในทั้ง 10 เว็บ และ `aria-describedby` ปรากฏ 0 ครั้งในเว็บเราทั้ง 6 เว็บ `[สำรวจ]` **ที่เจอแทนคือ `title` ของเบราว์เซอร์ 17 ถึง 92 จุดต่อเว็บ** ซึ่งเป็นกลไกที่ **ตกข้อ 1.4.13 ทั้งสามข้อย่อย และไม่โผล่บนจอสัมผัสเลย** `[ตีความ]` ข้อสรุปคือ **tooltip ไม่ใช่ของสำหรับหน้าอ่านข่าว แต่เป็นของสำหรับหลังบ้าน** คือ CMS, แดชบอร์ด และหน้าตั้งค่า ซึ่งเป็นที่ที่คนทำงานใช้เมาส์และคีย์บอร์ดจริง |

---

## 2. สถานะปัจจุบันของเราก่อนเริ่ม `[ของเรา]`

### 2.1 ของที่มีอยู่ในไฟล์ออกแบบ

อ่านจาก Figma REST API node `7121:7239` วันที่ 2026-10-05

| หัวข้อ | สถานะ |
|---|---|
| หน้า Figma | **20 Tooltips** node `7121:7239` มี **4 COMPONENT_SET รวม 78 แบบ** บวก `_Design System Header` 2 อัน และ `_Cursor / Arrow` 1 อัน |
| `Help icon` `7135:39813` | 28 แบบ แกน `Open` (2) คูณ `Supporting text` (2) คูณ `Tooltip` (7) ขนาดเฟรม 16 คูณ 16 ทุกแบบ |
| `Title` `7135:39898` | 18 แบบ แกน `Dark Mode` (2) คูณ `Arrow` (9) |
| `Avartar` `7135:39985` | 14 แบบ แกน `Dark Mode` (2) คูณ `Arrow` (7) ชื่อสะกดผิด ควรเป็น `avatar` |
| `Text area` `7135:40080` | 18 แบบ แกน `Dark Mode` (2) คูณ `Arrow` (9) |
| ระยะขอบ | `Title` 8 ทุกด้าน, `Text area` 12 ทุกด้าน, `Avartar` 2 ซ้าย 8 ขวา 2 บน 2 ล่าง |
| มุมโค้ง | 8 ทุกชุด ยกเว้นกล่อง `Content` ของ `Avartar` ที่เป็น 112 (ทรงแคปซูล) |
| ลูกศร | VECTOR `Polygon` 8 กว้าง 4 สูง อยู่ในเฟรม `Tooltip` ที่มีระยะขอบซ้ายขวา 16 |
| สีโหมดสว่าง | พื้น variable `4652:21368` ได้ค่าขาว, ตัวหนังสือ variable `4392:8091` ได้ `rgb(52, 64, 84)`, ข้อความรอง variable `4392:8053` ได้ `rgb(102, 112, 133)` |
| สีโหมดมืด | พื้น variable `4657:17053` ได้ `rgb(12, 17, 29)`, ตัวหนังสือ variable `4392:8096` ได้ขาว |
| text style | `Text/xs semibold` (`7130:425`) ได้ Prompt 600 ขนาด 12 บน line-height 18 และ `Text/xs regular` (`7130:574`) ได้ Prompt 400 ขนาด 12 บน line-height 18 ระยะห่างอักษร 0.24 |
| effect style | `shadows/center/xs` (`7121:7188`) ที่กล่องนอกของทั้ง 3 ชุด และ `shadows/bottom/md` (`4539:5852`) กับ `shadows/bottom/xs` (`4539:5650`) ที่โผล่มาในชุด `Help icon` |
| ไอคอนที่ใช้ | `Material design(2)/ACTION/Filled/help_outline` ซึ่งเป็นไอคอนชุดเก่า ไม่ใช่ Nation UI Icons |
| สีดิบที่มองเห็น | **4 จุด** คือพื้นหลังของ COMPONENT_SET ทั้ง 4 ชุด (อีก 84 จุดเป็น fill ที่ปิดการมองเห็นไว้ ไม่นับ) |
| ไฟล์สูตรขนาด | **ยังไม่มี** `tokens/scale/tooltip.mjs` (มี 18 ไฟล์ ไม่มีตัวนี้) |
| token | **ไม่มี token ชื่อ tooltip เลยสักตัว** ใน `tokens/tokens.json/` (คำว่า tooltip โผล่ที่เดียวคือใน description ของ `shadows/bottom/md`) |
| component โค้ด | **ไม่มี** ใน `components/` (มี 17 โฟลเดอร์ ไม่มี Tooltip) |

### 2.2 ปัญหา 8 ข้อที่เห็นจากการอ่านไฟล์ `[ตีความ]`

1. **ชื่อแกนไม่ตรงกันระหว่างชุด** `Help icon` เรียกแกนตำแหน่งว่า `Tooltip` ส่วนอีก 3 ชุดเรียกว่า `Arrow` ทั้งที่เป็นเรื่องเดียวกัน
2. **จำนวนค่าในแกนเดียวกันไม่เท่ากัน** `Help icon` มี 7 ค่า (`Top no arrow`, `Top arrow`, `Top right`, `Top left`, `Bottom`, `Right`, `Left`) ส่วน `Title` กับ `Text area` มี 9 ค่า (`None`, `Top center`, `Top left`, `Top right`, `Bottom center`, `Bottom left`, `Bottom right`, `Left`, `Right`) และ `Avartar` มี 7 ค่า (ไม่มี `Left` และ `Right`)
3. **ค่าในแกนปนสองเรื่องเข้าด้วยกัน** `Top no arrow` ปนเรื่อง "ตำแหน่ง" กับเรื่อง "มีลูกศรหรือไม่" ไว้ในค่าเดียว ทำให้เลือกแยกกันไม่ได้
4. **ทิศของลูกศรเทียบกับตำแหน่งของ tooltip กลับทางกัน** ค่า `Bottom center` หมายถึงลูกศรอยู่ด้านล่าง ซึ่งแปลว่า tooltip อยู่**เหนือ**ตัวกระตุ้น สวนทางกับชื่อตำแหน่งของทุกเจ้าในตลาดที่เรียกตามที่ที่ tooltip ไปอยู่
5. **ค่าเริ่มต้นของสีไม่ตรงกันระหว่างชุด** `Title` แบบ `Dark Mode=False` เป็นพื้นขาว แต่ instance ของ `Title` ที่อยู่ใน `Help icon` แบบ `Open=True` เป็นพื้น `rgb(12, 17, 29)` คือหยิบโหมดมืดมาใช้
6. **เงาซ้อนกันสองชั้นโดยไม่ได้ตั้งใจ** กล่องนอกใช้ `shadows/center/xs` แล้วกล่อง `Content` ข้างในของ instance ใน `Help icon` ยังใส่ `shadows/bottom/md` อีกชั้น
7. **text style ไม่อยู่ในรายการ preset ของระบบ** `Text/xs semibold` กับ `Text/xs regular` ไม่ตรงกับ `label/*` หรือ `body/*` หรือ `meta/*` ที่ประกาศไว้ใน `typography.json` (ที่ใกล้สุดคือ `label-sm` ซึ่งเป็น Prompt 500 ขนาด 12 บน line-height 22 และ `body-xs` ซึ่งเป็น Prompt 400 ขนาด 12 บน line-height 22) และชื่อยังไม่ตรงกฎการตั้งชื่อ
8. **`Avartar` สะกดผิด** และชื่อ COMPONENT_SET ทั้ง 4 ไม่ลงท้ายด้วยชนิดตามกฎที่ตั้งไว้ 2026-09-02

### 2.3 ค่าสีของเราชนเกณฑ์คอนทราสต์ตรงไหนบ้าง `[คำนวณ]`

| โหมด | คู่สี | อัตราส่วน | ผ่าน 4.5 |
|---|---|---|---|
| สว่าง | พื้นขาว กับ ตัวหนังสือ `rgb(52, 64, 84)` | **10.46** | ผ่าน |
| สว่าง | พื้นขาว กับ ข้อความรอง `rgb(102, 112, 133)` | **4.97** | ผ่าน |
| มืด | พื้น `rgb(12, 17, 29)` กับ ขาว | **18.86** | ผ่าน |
| มืด | พื้น `rgb(12, 17, 29)` กับ `rgb(102, 112, 133)` | **3.79** | **ไม่ผ่าน** แต่ในไฟล์เปลี่ยนเป็นขาวแล้วจึงไม่เป็นปัญหา |

**แปลว่าเรื่องคอนทราสต์ของ tooltip เราไม่มีปัญหา** ต่างจากกรณี toast กับ banner ที่ตกหลายคู่ เพราะ tooltip ใช้คู่เทาเข้มกับขาวล้วน ไม่ได้ใช้สีตระกูลสถานะ `[ตีความ]`

---
## 3. ก. เส้นแบ่งกับของใกล้เคียง

### 3.1 tooltip ต่างจาก popover และ toggletip ยังไง และแต่ละเจ้าใช้ชื่ออะไร (คำถามข้อ 1)

| เจ้า | ตัวที่กระตุ้นด้วยการชี้หรือโฟกัส | ตัวที่กระตุ้นด้วยการคลิกและมีของที่กดได้ | ตัวที่เป็นสองชั้นหรือรวย |
|---|---|---|---|
| **Material 3** | `Plain tooltip` | ไม่มีชื่อแยก ใช้ `Rich tooltip` ทำหน้าที่นี้ | **`Rich tooltip`** มีหัวข้อย่อย ข้อความรอง และปุ่ม `[ทางการ]` |
| **IBM Carbon** | `Tooltip` และ `DefinitionTooltip` | **`Toggletip`** เจ้าเดียวที่ใช้คำนี้ | ไม่มี |
| **Shopify Polaris** | `Tooltip` | `Popover` | ไม่มี |
| **Adobe Spectrum** | `Tooltip` | `Popover` และ `ContextualHelp` | ไม่มี |
| **Atlassian** | `Tooltip` | `Popup` และ `InlineDialog` (เลิกใช้แล้ว) | ไม่มี |
| **Ant Design** | `Tooltip` | `Popover` (คือ Tooltip ที่เพิ่ม title กับ content) | ไม่มี |
| **GitHub Primer** | `Tooltip` (รุ่น V2) | ไม่มี แนะนำให้คงเนื้อหาไว้ในหน้า หรือใช้ dialog | ไม่มี |
| **Microsoft Fluent 2** | `Tooltip` | `Popover` | ไม่มี |
| **Salesforce Lightning** | `slds-popover_tooltip` | `slds-popover` | ไม่มี |
| **Uber Base Web** | `Tooltip` และ `StatefulTooltip` | `Popover` | ไม่มี |
| **Pinterest Gestalt** | `Tooltip` | `Popover` และ **`HelpButton`** | ไม่มี |
| **Untitled UI** | `Tooltip` | ไม่พบในชุดเดียวกัน | ไม่มีชื่อแยก ใช้ prop `description` |
| **Radix** | `Tooltip` | `Popover` และ `HoverCard` | ไม่มี |
| **Mantine** | `Tooltip` | `Popover` และ `HoverCard` | ไม่มี |
| **Chakra UI v3 กับ Zag** | `Tooltip` | `Popover` และ `HoverCard` | ไม่มี |
| **WAI-ARIA APG** | `Tooltip` pattern | ไม่มี pattern ชื่อ toggletip แนะนำว่าใช้ non-modal dialog | ไม่มี |

**นับคำที่ใช้ `[คำนวณ]`** ฝั่งชี้หรือโฟกัส ใช้คำว่า `tooltip` **15 ใน 15 เจ้า** ฝั่งคลิกและกดได้ ใช้คำว่า `popover` **10 เจ้า** และ `toggletip` **1 เจ้า** และ `HoverCard` **3 เจ้า** (เป็นอีกชิ้นที่กระตุ้นด้วยการชี้แต่ยอมให้มีของที่กดได้ข้างใน)

**แปลว่า `tooltip` คือคำที่ตลาดเห็นตรงกันมากที่สุดในเอกสารวิจัยทั้งชุดของเรา** และตรงกับชื่อหน้า 20 ของเราอยู่แล้ว ส่วน `toggletip` เป็นคำเฉพาะของ Carbon เจ้าเดียว ไม่ใช่ศัพท์ตลาด `[ตีความ]`

**ข้อความนิยามที่แต่ละเจ้าเขียนไว้**

| เจ้า | ข้อความ | ที่มา |
|---|---|---|
| **WAI-ARIA APG** | "A tooltip is a popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it" | หน้า Tooltip Pattern `[มาตรฐาน]` |
| **IBM Carbon** | "A tooltip is exposed on hover or focus when you need to disclose brief, supplemental information that is not interactive. A toggletip is used on click or enter when you must expose interactive elements, such as a button, that a user needs to interact with" | usage.mdx `[ทางการ]` |
| **IBM Carbon** | "Toggletips reveal supplemental content when a user clicks a button and remains actively open until a user dismisses it" และ "Toggletips can contain interactive elements" | toggletip usage.mdx `[ทางการ]` |
| **Atlassian** | "A tooltip briefly describes an interactive element on mouse hover or keyboard focus" | หน้า tooltip usage `[ทางการ]` |
| **Microsoft Fluent 2** | "A tooltip provides supplemental, contextual information elevated near its target component" และ "if you need to deliver robust, formatted information, use a popover instead" | หน้า tooltip usage `[ทางการ]` |
| **Pinterest Gestalt** | "Tooltip is a floating text label that succinctly describes the function of an interactive element, typically Icon Button" | `Tooltip.tsx` `[ทางการ]` |
| **Shopify Polaris** | "Tooltips are floating labels that briefly explain the function of a user interface element. They can be triggered when merchants hover, focus, tap, or click" | tooltip.mdx `[ทางการ]` |
| **Ant Design** | "The tip is shown on mouse enter, and is hidden on mouse leave" และ "To provide an explanation of a button/text/operation. It's often used instead of the HTML title attribute" | หน้า tooltip `[ทางการ]` |
| **Salesforce Lightning** | "A Tooltip is a short message giving non-essential, contextual information, activated by hover, focus, or click" | docs.mdx `[ทางการ]` |
| **Adobe Spectrum** | "Display container for Tooltip content. Has a directional arrow dependent on its placement" | React Spectrum Tooltip `[ทางการ]` |
| **Sarah Higley** | "A 'tooltip' is a non-modal (or non-blocking) overlay containing text-only content that provides supplemental information about an existing UI control" | บทความ Tooltips in the time of WCAG 2.1 `[แหล่งรอง]` |

**เกณฑ์ตัดสินที่ใช้ได้จริง 3 ข้อ `[ตีความ]`** ถามตามลำดับนี้ ข้อแรกที่ตอบว่าใช่คือคำตอบ

1. **ถ้าในกล่องมีของที่ต้องกด เช่น ลิงก์ ปุ่ม ช่องกรอก ให้ใช้ popover ที่กระตุ้นด้วยการคลิก** ไม่ใช่ tooltip ตามกฎ APG ว่า "Tooltip widgets do not receive focus"
2. **ถ้าเนื้อหาสำคัญถึงขั้นทำงานต่อไม่ได้ถ้าไม่เห็น ให้คงไว้ในหน้า** ตามกฎ Primer ว่า "Persist the content so it's always available rather than using a Tooltip, which hides content by default"
3. **ถ้าเหลือจากสองข้อข้างบน คือข้อความสั้นที่ช่วยอธิบายปุ่มหรือไอคอน ให้ใช้ tooltip**

### 3.2 tooltip ใส่ของที่กดได้ข้างในได้ไหม (คำถามข้อ 2)

| เจ้า | ท่าที | ข้อความหรือหลักฐาน |
|---|---|---|
| **IBM Carbon** | **ห้าม และบังคับด้วยโค้ด** | "Do not include interactive elements within a tooltip. Interactive elements in tooltips are inaccessible for some users and are hard to use for all users since tooltips do not receive focus" และในโค้ดเรียก `useNoInteractiveChildren(tooltipRef, "The Tooltip component must have no interactive content rendered by the label or description prop")` `[ทางการ]` |
| **Shopify Polaris** | **ห้าม** | tooltip ต้อง "Not contain any links or buttons" `[ทางการ]` |
| **Atlassian** | **ห้าม** | "Never place interactive elements like links or buttons inside tooltips. Tooltips are not accessible via keyboard navigation" และยังห้ามไอคอนกับรูปด้วยเพราะ "can introduce clutter, hurt performance, obscure content, and increase cognitive load" `[ทางการ]` |
| **Salesforce Lightning** | **ห้าม** | "It can't be focused or contain focusable content" `[ทางการ]` |
| **Ant Design** | **ห้าม** | "The component does not support complex text or operations" `[ทางการ]` |
| **Pinterest Gestalt** | **เคยอนุญาตแล้วถอน** | มี prop `link` อยู่จริงในโค้ด แต่เอกสารเขียนว่า "this feature will soon be deprecated, as it is not accessible. Please do not use it in new designs or features" และให้ใช้ `HelpButton` แทน `[ทางการ]` |
| **GitHub Primer** | **ห้ามโดยกลไก** | tooltip เป็น `<span>` ที่ตั้ง `aria-hidden: true` ตลอด และเอกสารเตือนว่า "aria-label replaces the text content of an element in screen readers, so only use Tooltip on elements with no existing text content" `[ทางการ]` |
| **Microsoft Fluent 2** | **ไม่ได้เขียนห้ามตรง ๆ แต่ชี้ทางออก** | "if you need to deliver robust, formatted information, use a popover instead" และ tooltip รับ slot `content` เป็น `div` ที่ไม่โฟกัสได้ `[ทางการ]` |
| **Adobe Spectrum** | **ไม่ได้เขียนห้าม** | ไม่พบข้อความห้ามในเอกสารที่อ่าน แต่ `useTooltip` ตั้ง `role: 'tooltip'` และไม่มีการจัดการโฟกัส `[ทางการ]` |
| **Uber Base Web** | **ไม่ได้เขียนห้าม** | `Tooltip` คือ `Popover` ที่ตั้ง `focusLock: false` และ `autoFocus: false` และ `returnFocus: false` จึงใส่อะไรลงไปก็ได้ในทางเทคนิค `[ทางการ]` |
| **Radix และ Mantine และ Chakra กับ Zag** | **ไม่ได้เขียนห้าม** | มี prop `interactive` หรือ `disableHoverableContent` แต่เป็นเรื่องการชี้ค้างไว้ ไม่ใช่เรื่องของที่กดได้ `[ทางการ]` |
| **Untitled UI** | **เตือน** | "never for content users must read to complete a task" `[ทางการ]` |
| **Material 3** | **อนุญาต แต่แยกชื่อ** | rich tooltip "can optionally contain a subhead, buttons, and hyperlinks" และในซอร์ส Compose `RichTooltip` รับพารามิเตอร์ `action: (@Composable () -> Unit)? = null` ส่วน `PlainTooltip` ไม่มี `[ทางการ]` |
| **WAI-ARIA APG** | **ห้าม** | "Tooltip widgets do not receive focus. A hover that contains focusable elements can be made using a non-modal dialog" `[มาตรฐาน]` |
| **Sarah Higley** | **ห้าม** | "Any interactive content such as links or buttons should not be placed within a tooltip" `[แหล่งรอง]` |

**สรุป `[คำนวณ]`** **5 เจ้าเขียนห้ามเป็นลายลักษณ์อักษร** (Carbon, Polaris, Atlassian, SLDS, Ant) และ **1 เจ้าเคยทำแล้วประกาศถอนออกเพราะเข้าถึงไม่ได้** (Gestalt) และ **1 เจ้าห้ามโดยกลไกด้วย `aria-hidden`** (Primer) และ **มาตรฐาน W3C ห้าม** ส่วน **เจ้าที่อนุญาตมีเจ้าเดียว คือ Material 3 และอนุญาตเฉพาะในชิ้นที่ตั้งชื่อแยกว่า rich tooltip ไม่ใช่ใน plain tooltip** ที่เหลือ 7 เจ้าไม่ได้ระบุ แต่ไม่มีเจ้าไหนทำตัวอย่างที่มีของกดได้

**เหตุผลที่ตลาดห้าม สรุปจากข้อความข้างบนได้ 3 ข้อ `[ตีความ]`**

- **กดไปถึงด้วยคีย์บอร์ดไม่ได้** เพราะ tooltip ไม่รับโฟกัส ถ้าใส่ปุ่มลงไปจะไม่มีทางกดด้วย Tab (Carbon และ Atlassian พูดตรงกัน)
- **บนจอสัมผัสเปิดไม่ได้ตั้งแต่แรก** เพราะไม่มีการชี้ (Sarah Higley)
- **ถ้าจะให้ชี้ไปกดได้จริงต้องแก้ข้อ hoverable ให้เป๊ะ** ซึ่งต้องทำพื้นที่ปลอดภัยทั้งหมด และเมื่อแก้ครบแล้วก็กลายเป็น popover อยู่ดี

### 3.3 ตลาดแยกตัวกระตุ้นออกจากคำใบ้ หรือรวมไว้ด้วยกัน (คำถามข้อ 3)

**ตลาดแยก 15 ใน 15 เจ้า `[คำนวณ]`** ไม่มีเจ้าไหนที่ component ชื่อ Tooltip วาดไอคอนตัวกระตุ้นเอง ทุกเจ้ารับตัวกระตุ้นเข้ามาเป็นลูก

| เจ้า | วิธีรับตัวกระตุ้น |
|---|---|
| **IBM Carbon** | `children` ต้องเป็น element เดียว แล้ว clone ใส่ event กับ `aria-*` ให้ `[ทางการ]` |
| **Atlassian** | `children` รับได้ทั้ง node และ function ที่ได้ `TriggerProps` กลับมา spread เอง `[ทางการ]` |
| **GitHub Primer** | `children` แล้วตรวจว่าเป็น element ที่กดได้จริง ถ้าไม่ใช่จะเตือน `[ทางการ]` |
| **Microsoft Fluent 2** | ใช้ pattern `TriggerProps` ของ `react-utilities` `[ทางการ]` |
| **Radix และ Chakra กับ Zag** | แยกเป็น `Tooltip.Trigger` กับ `Tooltip.Content` คนละ element `[ทางการ]` |
| **Adobe Spectrum** | แยกเป็น `TooltipTrigger` ครอบ แล้วลูกตัวแรกคือตัวกระตุ้น ลูกตัวที่สองคือ `Tooltip` `[ทางการ]` |
| **Untitled UI** | แยก `TooltipTrigger` ออกเป็น export ต่างหากจาก `Tooltip` `[ทางการ]` |

**แต่ตลาดมี 2 เจ้าที่ทำชิ้น "ปุ่มบวกคำใบ้" เป็น component อีกตัว และตั้งชื่อตามตัวกระตุ้น ไม่ได้ตั้งชื่อตาม tooltip `[ทางการ]`**

| เจ้า | ชื่อ component | ข้างในคืออะไร |
|---|---|---|
| **IBM Carbon** | **`IconButton`** | เรียก `Tooltip` ครอบ `Button` ให้เลย โดยตั้ง `label` เป็น prop บังคับ และตั้ง `enterDelayMs = 100` กับ `leaveDelayMs = 100` ซึ่ง**ต่างจากค่าเริ่มต้นของ `Tooltip` เองที่ออก 300** และตั้ง `closeOnActivation = true` |
| **Pinterest Gestalt** | **`HelpButton`** | ไอคอนเครื่องหมายคำถาม บวก `Tooltip` บวก `InternalPopover` โดยมี prop `accessibilityLabel`, `accessibilityPopoverLabel`, `text` และ `link` **ใช้ popover ที่กระตุ้นด้วยการคลิก ไม่ใช่ tooltip เพราะเนื้อหาอาจมีลิงก์** และ Gestalt ยังเขียนไว้ใน `Tooltip.tsx` ว่า "Planning to use Tooltip with IconButton? Use IconButton's built-in tooltip instead" |

**แปลว่าชุด `Help icon` ของเราตรงกับ `HelpButton` ของ Gestalt ไม่ใช่ตรงกับ `Tooltip` `[ตีความ]`** ชุดนี้รวมตัวกระตุ้น (ไอคอน `help_outline`) กับคำใบ้ (instance ของ `Title` หรือ `Text area`) และตัวชี้เมาส์ (`_Cursor / Arrow`) ไว้ในชิ้นเดียว ซึ่งในตลาดเป็นของอีกชั้นหนึ่ง และ Gestalt เลือกทำด้วย popover เพราะกล่องช่วยเหลือมักมีลิงก์

**ข้อสังเกตที่สำคัญที่สุดของหัวข้อนี้ `[ตีความ]`** ชุด `Help icon` 28 แบบของเรา **ไม่ใช่ component สำหรับหยิบไปใช้ แต่เป็นภาพสาธิต** เพราะเฟรมกว้าง 16 สูง 16 เท่าไอคอน แล้ว tooltip ล้นออกมานอกเฟรม และมีลูกศรของเมาส์วาดอยู่ข้างใน ซึ่งเป็นสัญญาณว่ามันถูกทำขึ้นเพื่อ**แสดงให้ดูในเอกสาร** ไม่ใช่เพื่อให้นักออกแบบลากไปวางในงานจริง ของแบบนี้ในตลาดไม่มีใครทำเป็น COMPONENT_SET

---
## 4. ข. ตัวกระตุ้นและจังหวะ

### 4.1 กระตุ้นด้วยอะไรได้บ้าง (คำถามข้อ 4)

| เจ้า | ชี้ด้วยเมาส์ | โฟกัสด้วยคีย์บอร์ด | กด | แตะ | ปิดด้วยอะไรเพิ่ม |
|---|---|---|---|---|---|
| **Material 3** | ใช่ | ใช่ | ไม่ | **ใช่ ด้วยการกดค้าง** | `enableUserInput` ปิดได้ทั้งชุด `[ทางการ]` |
| **IBM Carbon** | ใช่ | ใช่ ผ่าน `onFocus` แต่ข้ามเมื่อโฟกัสมาจากการคลิกเมาส์ | `closeOnActivation` ปิด tooltip เมื่อกด (ค่าเริ่มต้น false ที่ `Tooltip` แต่ true ที่ `IconButton`) | จับ `onTouchStart` ไว้เพื่อจัดการการลาก ไม่ได้ปิดการแสดง | Escape `[ทางการ]` |
| **Shopify Polaris** | ใช่ | ใช่ | `persistOnClick` ให้ค้างไว้เมื่อคลิกได้ | เอกสารเขียนว่ารองรับ "tap" | Escape `[ทางการ]` |
| **Adobe Spectrum** | ใช่ | ใช่ **แต่เฉพาะ `:focus-visible`** | `shouldCloseOnPress` ค่าเริ่มต้น true | **ไม่ "Tooltips are not shown on touch screen interactions"** | Escape `[ทางการ]` |
| **Atlassian** | ใช่ | ใช่ | กดแล้วปิด (native light dismiss) | ไม่ได้จัดการแยก | Escape และ scroll `[ทางการ]` |
| **Ant Design** | ใช่ | **ไม่ ค่าเริ่มต้น `trigger` คือ `'hover'` เท่านั้น** | ตั้ง `trigger: 'click'` ได้ | ไม่ได้จัดการแยก | ไม่พบกลไก Escape ในไฟล์ที่อ่าน `[ทางการ]` |
| **GitHub Primer** | ใช่ ผ่าน `onMouseOverCapture` | ใช่ **แต่เฉพาะ `:focus-visible`** | ไม่ | **ปิด `onTouchEnd` หลัง 10 มิลลิวินาที** | Escape `[ทางการ]` |
| **Microsoft Fluent 2** | ใช่ ผ่าน `onPointerEnter` | ใช่ แต่ข้ามเมื่อโฟกัสถูกย้ายด้วยโค้ด | ไม่ | ไม่ได้จัดการแยก | Escape `[ทางการ]` |
| **Salesforce Lightning** | ใช่ | ใช่ | ใช่ เอกสารระบุทั้ง 3 อย่าง | ไม่ได้จัดการแยก | ไม่พบกลไกในไฟล์ CSS `[ทางการ]` |
| **Uber Base Web** | ใช่ `triggerType` ค่าเริ่มต้น `hover` | ใช่ ผ่าน `Popover` | ตั้ง `triggerType: 'click'` ได้ | ไม่ได้จัดการแยก | Escape เมื่อใช้ `StatefulTooltip` `[ทางการ]` |
| **Pinterest Gestalt** | ใช่ | ใช่ ผ่าน `onFocus` ของกล่องครอบ | ไม่ | ไม่ได้จัดการแยก | **ไม่พบกลไก Escape** `onDismiss` ตั้งเป็น `noop` `[ทางการ]` |
| **Untitled UI** | ใช่ | ใช่ ผ่าน React Aria | `shouldCloseOnPress` ของ React Aria | **ไม่ ตามพฤติกรรมของ React Aria** | Escape ผ่าน React Aria `[ทางการ]` |
| **Radix** | ใช่ ผ่าน `onPointerMove` | ใช่ | `onPointerDown` ปิด | **ไม่ `if (event.pointerType === "touch") return;`** | Escape `[ทางการ]` |
| **Mantine** | ใช่ `hover: true` | **ไม่ `focus: false`** | ไม่ | **ไม่ `touch: false`** | Escape ผ่าน `useDismiss` `[ทางการ]` |
| **Chakra UI กับ Zag** | ใช่ | ใช่ ผ่าน `trackFocusVisible` | `closeOnClick` และ `closeOnPointerDown` ค่าเริ่มต้น true | **ไม่ `if (event.pointerType === "touch") return;`** | Escape `closeOnEscape: true` และ `closeOnScroll: true` `[ทางการ]` |

**สรุป `[คำนวณ]`**

- **ชี้ด้วยเมาส์ 15 ใน 15 เจ้า** คือค่าเริ่มต้นแบบไม่มีใครเถียง
- **โฟกัสด้วยคีย์บอร์ดเปิดไว้เป็นค่าเริ่มต้น 13 ใน 15 เจ้า** มี **2 เจ้าที่ปิดไว้ คือ Mantine (`focus: false`) และ Ant (`trigger: 'hover'`)** ซึ่งทั้งสองเจ้าทำให้คนใช้คีย์บอร์ดเข้าไม่ถึงเนื้อหาเลย และ Mantine เขียนเตือนเองในเอกสารว่า "users who use a screen reader or navigate with the keyboard will not be able to get tooltip content" ถ้าไม่ตั้ง `events`
- **3 เจ้าแยก `:focus-visible` ออกจากโฟกัสธรรมดา** คือ Spectrum, Primer และ Zag เพื่อไม่ให้ tooltip โผล่ตอนคลิกเมาส์ ซึ่งเป็นรายละเอียดที่คนมองข้ามบ่อย `[ตีความ]`
- **4 เจ้าปิด tooltip เมื่อกดตัวกระตุ้น** คือ Spectrum, Atlassian, Zag และ Carbon (เมื่อเปิด `closeOnActivation`) เหตุผลคือพอกดแล้วมักมีอย่างอื่นเกิดขึ้น เช่น เมนูเปิด ซึ่ง tooltip จะไปบัง
- **2 เจ้ามีกลไกให้ tooltip ค้างไว้หลังกด** เพราะเนื้อหาเปลี่ยน เช่น Copy เป็น Copied คือ Polaris (`persistOnClick`) และ Atlassian (`hasNewContentOnTriggerClick`)

### 4.2 หน่วงเวลาก่อนโผล่และก่อนหายกี่มิลลิวินาที (คำถามข้อ 5)

| เจ้า | หน่วงก่อนโผล่ | หน่วงก่อนหาย | มีกลไกเปิดเร็วขึ้นเมื่อเพิ่งปิดไปหมาด ๆ |
|---|---|---|---|
| **Material 3** | **ชี้ด้วยเมาส์ 0** (เข้าเขตแล้วแสดงทันที) และ **กดค้าง 500** คือค่า `ViewConfiguration.getLongPressTimeout()` | ชี้แล้วออก 0 และ **หายเองที่ `TooltipDuration = 1500L`** ส่วน AppCompat ใช้ `HOVER_HIDE_TIMEOUT_MS = 15000` และ `LONG_CLICK_HIDE_TIMEOUT_MS = 2500` และ `HOVER_HIDE_TIMEOUT_SHORT_MS = 3000` | ไม่พบ `[ทางการ]` |
| **IBM Carbon** | **`enterDelayMs = 100`** ที่ `Tooltip` และ 100 ที่ `IconButton` | **`leaveDelayMs = 300`** ที่ `Tooltip` แต่ **100 ที่ `IconButton`** | ไม่พบ `[ทางการ]` |
| **Shopify Polaris** | `hoverDelay` ไม่มีค่าเริ่มต้น แปลว่า **0** | **`HOVER_OUT_TIMEOUT = 150`** | ไม่พบ `[ทางการ]` |
| **Adobe Spectrum** | **`TOOLTIP_DELAY = 1500`** และ **0 เมื่อเปิดด้วยโฟกัส** | **`TOOLTIP_COOLDOWN = 500`** | **ใช่ และเป็นเจ้าที่ทำละเอียดที่สุด** ตัวแปร `globalWarmedUp` จำว่าเพิ่งมี tooltip เปิดไป ถ้ายังอุ่นอยู่ tooltip ตัวต่อไปจะ **โผล่ทันทีและข้ามการเคลื่อนไหวทิ้ง** (`showTooltip(true)`) และนาฬิกาเย็นลงใช้ `Math.max(TOOLTIP_COOLDOWN, closeDelay)` `[ทางการ]` |
| **Atlassian** | **`delay = 300`** | **`delay = 300`** ใช้ค่าเดียวกันทั้งสองทาง | **ใช่** `tooltip-manager.js` คำนวณ `showImmediately = Boolean(active && active.isVisible()) && !shouldAlwaysFadeIn` แล้วส่ง `duration: 'none'` `[ทางการ]` |
| **Ant Design** | **`mouseEnterDelay ?? 0.1`** คือ 100 | **`mouseLeaveDelay ?? 0.1`** คือ 100 | ไม่พบ `[ทางการ]` |
| **GitHub Primer** | **`short: 50`** (ค่าเริ่มต้น) และ **`medium: 400`** และ **`long: 1200`** | **0** | ไม่พบ `[ทางการ]` |
| **Microsoft Fluent 2** | **`showDelay = 250`** | **`hideDelay = 250`** และ **0 เมื่อ blur** | **ใช่** `const delay = context.visibleTooltip ? 0 : state.showDelay;` `[ทางการ]` |
| **Salesforce Lightning** | **หาไม่เจอ** ชุดที่เผยแพร่เป็น CSS ล้วน ไม่มีตัวจับเวลา | **หาไม่เจอ** | ไม่พบ `[ทางการ]` |
| **Uber Base Web** | **`onMouseEnterDelay: 200`** | **`onMouseLeaveDelay: 200`** | ไม่พบ `[ทางการ]` |
| **Pinterest Gestalt** | **0** | **0 และ 100 เมื่อมี prop `link`** (`const mouseLeaveDelay = link ? TIMEOUT : 0;` โดย `TIMEOUT = 100`) | ไม่พบ `[ทางการ]` |
| **Untitled UI** | **`delay = 300`** | **`closeDelay = 0`** | ใช่ โดยสืบทอดจาก React Aria `[ทางการ]` |
| **Radix** | **`DEFAULT_DELAY_DURATION = 700`** | **0** | **ใช่ `skipDelayDuration = 300`** ถ้าย้ายไปตัวกระตุ้นอื่นภายใน 300 จะไม่หน่วงอีก `[ทางการ]` |
| **Mantine** | **`openDelay` ไม่มีค่าเริ่มต้น แปลว่า 0** | **`closeDelay` ไม่มีค่าเริ่มต้น แปลว่า 0** | **ใช่ ผ่าน `useDelayGroup` เมื่ออยู่ใน `TooltipGroup`** `[ทางการ]` |
| **Chakra UI กับ Zag** | **`openDelay: 400`** | **`closeDelay: 150`** | **ใช่** มีสถานะ `instant` ที่ส่งออกเป็น `data-instant` `[ทางการ]` |

**สรุป `[คำนวณ]`**

- **ค่าหน่วงก่อนโผล่ที่พบคือ** 0, 0, 0, 0, 50, 100, 200, 250, 300, 300, 400, 700, 1500 **มัธยฐาน 200** และ **ฐานนิยมคือ 0 (4 เจ้า)**
- **ค่าหน่วงก่อนหายที่พบคือ** 0, 0, 0, 0, 0, 100, 150, 150, 200, 250, 300, 500 **มัธยฐาน 150**
- **ไม่มีเจ้าไหนให้หน่วงก่อนหายมากกว่าหน่วงก่อนโผล่ ยกเว้น Spectrum** (1500 เข้า 500 ออก ก็ยังเข้ามากกว่า) และ **Polaris, Gestalt, Mantine, Primer, Radix ที่ให้หน่วงก่อนหายน้อยกว่าหรือเท่ากับ 0 ถึง 150** แปลว่า **ตลาดถือว่าการหน่วงก่อนโผล่มีไว้กันการโผล่เรี่ยราด ส่วนการหน่วงก่อนหายมีไว้กันการกระพริบตอนขยับเมาส์ข้ามรอยต่อ** `[ตีความ]`
- **กลไกเปิดเร็วขึ้น 6 ใน 15 เจ้า** คือ Spectrum, Atlassian, Fluent, Radix, Mantine และ Zag **และทุกเจ้าใช้หลักการเดียวกัน** คือเก็บสถานะรวมของทั้งหน้าว่ามี tooltip เปิดอยู่ไหม ถ้ามีให้ตัวต่อไปโผล่ทันที ส่วนช่วงผ่อนผันอยู่ที่ 300 (Radix) ถึง 500 (Spectrum)
- **ค่าสองขั้วที่น่าสังเกต** Radix ใช้ 700 ซึ่งช้าที่สุดในกลุ่มเว็บ และ Spectrum ใช้ 1500 ซึ่งช้าที่สุดทั้งหมด พร้อมคอมเมนต์ในโค้ดเองว่า `// this seems to be a 1.5 second delay, check with design` แปลว่าแม้แต่คนเขียนก็ไม่มั่นใจ `[ทางการ]`
- **Carbon เป็นเจ้าเดียวที่ตั้งค่าหน่วงต่างกันระหว่าง `Tooltip` กับ `IconButton`** คือออก 300 กับ 100 เหตุผลที่พออธิบายได้คือแถบเครื่องมือที่มีปุ่มไอคอนเรียงกันต้องหายเร็วกว่า ไม่ให้ค้างทับปุ่มข้างเคียง `[ตีความ]`

### 4.3 บนจอสัมผัสทำยังไง (คำถามข้อ 6)

| เจ้า | ท่าที | หลักฐาน |
|---|---|---|
| **Radix** | **ซ่อน** | `onPointerMove` มี `if (event.pointerType === "touch") return;` `[ทางการ]` |
| **Chakra UI กับ Zag** | **ซ่อน** | `tooltip.connect.js` มี `if (event.pointerType === "touch") return;` ทั้งใน `onClick` และ `onPointerMove` `[ทางการ]` |
| **Adobe Spectrum กับ React Aria** | **ซ่อน และเขียนเตือนไว้ด้วย** | "Tooltips are not shown on touch screen interactions" และแนะนำให้ "ensure your UI is usable without tooltips" `[ทางการ]` |
| **Mantine** | **ซ่อน** | `events.touch` ค่าเริ่มต้น `false` และส่งต่อเป็น `mouseOnly: !settings.events?.touch` `[ทางการ]` |
| **GitHub Primer** | **ซ่อน** (เปิดแล้วปิดทันที) | `onTouchEnd: (event) => { safeSetTimeout(() => closeTooltip(), 10); }` `[ทางการ]` |
| **Untitled UI** | **ซ่อน** | สืบทอดจาก React Aria `[ทางการ]` |
| **Material 3** | **เปลี่ยนเป็นกดค้าง** | `BasicTooltipBox` ตรวจว่าเป็น touch หรือ stylus แล้วรอท่ากดค้าง แล้วกินอีเวนต์ที่เหลือไม่ให้ลูกรับคลิก และ **ตั้งเวลาหายเองที่ 1500** ส่วน AppCompat ใช้ `LONG_CLICK_HIDE_TIMEOUT_MS = 2500` `[ทางการ]` |
| **Shopify Polaris** | **อ้างว่ารองรับ** | เอกสารเขียน "triggered when merchants hover, focus, tap, or click" แต่ในโค้ดไม่พบตัวจัดการ touch แยก `[ทางการ]` |
| **Salesforce Lightning** | **อ้างว่ารองรับ** | "activated by hover, focus, or click" แต่ชุด CSS ไม่มีตัวจับเวลา `[ทางการ]` |
| **IBM Carbon** | **ไม่ได้ซ่อน** | จับ `onTouchStart` แต่ใช้สำหรับจัดการการลาก (`DRAG_STOP_EVENT_TYPES`) ไม่ใช่เพื่อปิดการแสดง `[ทางการ]` |
| **Atlassian และ Fluent และ Base Web และ Gestalt และ Ant** | **ไม่ได้จัดการแยก** | ไม่พบการตรวจ `pointerType` ในไฟล์ที่อ่าน `[ทางการ]` |
| **GitHub Primer (เอกสารแนวทาง)** | **แนะนำให้เลิกใช้ tooltip บนมือถือ** | ให้ใช้ modal ที่ "accessible for mobile users" หรือ summary disclosure ที่ "work better for mobile accessibility than tooltips" `[ทางการ]` |
| **Sarah Higley** | **บอกว่าเป็นทางตัน** | "tooltips are inaccessible to touch devices when attached to buttons or links" เพราะไม่มี hover และการโฟกัสคือการกดไปแล้ว `[แหล่งรอง]` |

**สรุป `[คำนวณ]`** **6 เจ้าซ่อนไปเลย** (Radix, Zag กับ Chakra, Spectrum กับ React Aria, Mantine, Primer, Untitled UI) **1 เจ้าเปลี่ยนเป็นกดค้าง** (Material 3) **2 เจ้าอ้างว่ารองรับการแตะแต่ไม่มีโค้ดรองรับจริง** (Polaris, SLDS) และ **6 เจ้าไม่ได้จัดการอะไร** ซึ่งแปลว่าบนมือถือ tooltip ของเจ้าเหล่านั้นจะโผล่ตอนแตะแล้วค้างอยู่จนกว่าจะแตะที่อื่น

**ข้อค้นพบที่ใช้กับเราได้ตรงที่สุด `[ตีความ]`** **ฝั่งเว็บ ตลาดเลือกซ่อน ไม่ได้เลือกแปลงเป็นกดค้าง** มีแต่ Material ที่แปลง และ Material แปลงได้เพราะอยู่บน Android ที่มีท่ากดค้างเป็นมาตรฐานของระบบปฏิบัติการอยู่แล้ว **บนเว็บไม่มีท่ากดค้างที่คนรู้จัก** จะทำก็ได้แต่ต้องสอนผู้ใช้ และยังชนกับเมนูบริบทของเบราว์เซอร์กับการลากเลือกข้อความ

---
## 5. ค. ตำแหน่งและลูกศร

### 5.1 มีกี่ตำแหน่ง และใช้ชื่ออะไร (คำถามข้อ 7)

| เจ้า | จำนวนค่า | ค่าเริ่มต้น | รายการค่า |
|---|---|---|---|
| **Pinterest Gestalt** | **4** | `down` | `up`, `right`, `down`, `left` ชื่อ prop คือ `idealDirection` `[ทางการ]` |
| **Shopify Polaris** | **4 คูณ 3** | `above` | `preferredPosition` คือ `above`, `below`, `mostSpace`, `cover` และ `preferredAlignment` คือ `left`, `center`, `right` `[ทางการ]` |
| **GitHub Primer** | **8** | `s` | `n`, `ne`, `e`, `se`, `s`, `sw`, `w`, `nw` ใช้ชื่อทิศเข็มทิศ `[ทางการ]` |
| **Untitled UI (React)** | **8 ที่โค้ดจัดการจริง** | `top` | `top`, `top left`, `top start`, `top right`, `top end`, `bottom left`, `bottom start`, `bottom right`, `bottom end` **ปนทั้งแบบ left/right และแบบ start/end ในชุดเดียวกัน** `[ทางการ]` |
| **IBM Carbon** | **12 (ชุดใหม่)** บวก 8 ชุดเก่าที่ประกาศเลิกใช้ | `top` | ชุดใหม่ `top`, `bottom`, `left`, `right`, `top-start`, `top-end`, `bottom-start`, `bottom-end`, `left-start`, `left-end`, `right-start`, `right-end` และชุดเก่าที่ `@deprecated` คือ `top-left`, `top-right`, `bottom-left`, `bottom-right`, `left-bottom`, `left-top`, `right-bottom`, `right-top` `[ทางการ]` |
| **Ant Design** | **12** | `top` | `top`, `left`, `right`, `bottom`, `topLeft`, `topRight`, `bottomLeft`, `bottomRight`, `leftTop`, `leftBottom`, `rightTop`, `rightBottom` `[ทางการ]` |
| **Microsoft Fluent 2** | **12** | `above` | `above`, `above-start`, `above-end`, `below`, `below-start`, `below-end`, `before`, `before-top`, `before-bottom`, `after`, `after-top`, `after-bottom` **ใช้คำ above/below/before/after ไม่ใช่ top/bottom/left/right** `[ทางการ]` |
| **Radix** | **12** | `side: 'top'` และ `align: 'center'` | แยกเป็น 2 prop คือ `side` (`top`, `right`, `bottom`, `left`) คูณ `align` (`start`, `center`, `end`) `[ทางการ]` |
| **Mantine** | **12** | `top` | `top`, `top-start`, `top-end`, `left`, `left-start`, `left-end`, `right`, `right-start`, `right-end`, `bottom`, `bottom-start`, `bottom-end` `[ทางการ]` |
| **Chakra UI กับ Zag** | **12** | `bottom` | ใช้ชุดของ Floating UI `[ทางการ]` |
| **Floating UI (ชั้นใต้ของ 5 เจ้า)** | **12** | ไม่มี | `Side` คือ `top`, `right`, `bottom`, `left` และ `Alignment` คือ `start`, `end` รวมเป็น `Placement` ซึ่งเท่ากับ `Side` หรือ `Side-Alignment` `[ทางการ]` |
| **Salesforce Lightning** | **12 ทางตรรกะ** บวก 8 แบบมุม | ไม่มีค่าเริ่มต้น | `slds-nubbin_top`, `_top-left`, `_top-right`, `_top-start`, `_top-end`, `_bottom`, `_bottom-left`, `_bottom-right`, `_bottom-start`, `_bottom-end`, `_left`, `_left-top`, `_left-bottom`, `_right`, `_right-top`, `_right-bottom`, `_start`, `_start-top`, `_start-bottom`, `_end`, `_end-top`, `_end-bottom` บวกชุด `-corner` อีก 8 ตัว `[ทางการ]` |
| **Uber Base Web** | **13** | `auto` | `auto`, `topLeft`, `top`, `topRight`, `rightTop`, `right`, `rightBottom`, `bottomRight`, `bottom`, `bottomLeft`, `leftBottom`, `left`, `leftTop` **เจ้าเดียวที่มีค่า `auto`** `[ทางการ]` |
| **Atlassian** | **12 บวก 3 แบบตามเมาส์** | `bottom` | ใช้ `Placement` ของ popper 12 ค่า บวก `mouse`, `mouse-x`, `mouse-y` **เจ้าเดียวที่ให้ tooltip เกาะตำแหน่งเมาส์** `[ทางการ]` |
| **Adobe Spectrum** | **22** | `top` | `bottom`, `bottom left`, `bottom right`, `bottom start`, `bottom end`, `top`, `top left`, `top right`, `top start`, `top end`, `left`, `left top`, `left bottom`, `start`, `start top`, `start bottom`, `right`, `right top`, `right bottom`, `end`, `end top`, `end bottom` **มีทั้งแบบกายภาพ (left/right) และแบบตรรกะ (start/end) พร้อมกัน** `[ทางการ]` |
| **Material 3** | plain อยู่เหนือ และ rich อยู่ล่างขวา | ตามข้อซ้าย | ไม่พบรายการค่าที่ประกาศเป็น enum ในซอร์ส Compose ที่อ่าน `[ทางการ]` |

**สรุป `[คำนวณ]`**

- **จำนวนที่พบคือ** 4, 4, 8, 8, 12, 12, 12, 12, 12, 12, 12, 13, 15, 22 **มัธยฐาน 12** และ **12 คือฐานนิยม (7 เจ้า)**
- **ชื่อที่ชนะคือ `top` กับ `top-start` กับ `top-end`** ใช้ 7 เจ้า (Carbon ชุดใหม่, Mantine, Radix, Chakra กับ Zag, SLDS, Spectrum แบบตรรกะ และ Fluent ที่ใช้ `above-start` กับ `above-end` ซึ่งเป็นธรรมเนียมเดียวกัน) บวกชั้นใต้ร่วมคือ Floating UI ส่วน **แบบ `topLeft` หรือ `top-left` เหลือ 3 เจ้า** (Ant, Base Web, SLDS ชุดกายภาพ) และ **Carbon ประกาศ `@deprecated` ให้ชุด `top-left` ไปแล้ว พร้อมเขียนตรง ๆ ว่า "Use NewPopoverAlignment instead"** ซึ่งเป็นหลักฐานชัดที่สุดว่าตลาดเดินไปทางไหน
- **เหตุผลที่ `start` และ `end` ชนะ `left` และ `right` `[ตีความ]`** เพราะพอตำแหน่งเป็นด้านซ้ายหรือขวา คำว่า `left-top` อ่านแล้วงงว่าหมายถึง "tooltip อยู่ซ้าย ชิดบน" หรือ "tooltip อยู่บน ชิดซ้าย" ส่วน `left-start` ไม่มีปัญหานี้ และยังรองรับภาษาที่อ่านขวาไปซ้ายได้ด้วย
- **ทุกเจ้าตั้งชื่อตามที่ที่ tooltip ไปอยู่ ไม่ได้ตั้งชื่อตามทิศที่ลูกศรชี้** 15 ใน 15 เจ้า

### 5.2 มีกลไกพลิกอัตโนมัติเมื่อชนขอบจอไหม และพลิกยังไง (คำถามข้อ 8)

| เจ้า | มีไหม | กลไก |
|---|---|---|
| **Radix และ Mantine และ Chakra กับ Zag และ Fluent** | **มี** | ใช้ `flip` ของ Floating UI ตรง ๆ หรือกลไกเทียบเท่า `[ทางการ]` |
| **Floating UI (ชั้นใต้)** | **มี** | `flip` มีพารามิเตอร์ `fallbackPlacements` ค่าเริ่มต้นคือ "[oppositePlacement] (computed)" แปลว่าลองด้านตรงข้ามก่อน และ `fallbackStrategy` ค่าเริ่มต้น `'bestFit'` แปลว่าถ้าไม่มีด้านไหนพอดีเลยให้เลือก **ด้านที่ล้นน้อยที่สุด** และ `flipAlignment` ค่าเริ่มต้น `true` แปลว่าพลิกการชิดขอบได้ด้วย และ `fallbackAxisSideDirection` ค่าเริ่มต้น `'none'` แปลว่า **ไม่ข้ามไปแกนตั้งฉาก** เว้นแต่สั่ง `[ทางการ]` |
| **Mantine** | **มี และเปิดไว้** | `middlewares` ค่าเริ่มต้น `{ flip: true, shift: true, inline: false }` และ `shift` ใช้ `padding: 8` `[ทางการ]` |
| **Ant Design** | **มี และเปิดไว้** | `autoAdjustOverflow` ค่าเริ่มต้น `true` คำอธิบายคือ "Whether to adjust popup placement automatically when popup is off screen" `[ทางการ]` |
| **Radix** | **มี และเปิดไว้** | `avoidCollisions` ค่าเริ่มต้น `true` พร้อม `collisionBoundary` และ `collisionPadding` `[ทางการ]` |
| **Shopify Polaris** | **มี และเขียนเอง** | `calculateVerticalPosition` คำนวณจาก `activatorRect`, `overlayRect`, `scrollableContainerRect` และ `containerRect` และมีค่า `mostSpace` ให้เลือกด้านที่มีที่ว่างมากที่สุด `[ทางการ]` |
| **GitHub Primer** | **มี** | "The position is dependant on the space available within the viewport, and it will never break outside of it. It may appear to the top, bottom, left, or right of the interactive control" `[ทางการ]` |
| **Uber Base Web** | **มี** | ใช้ popper พร้อม `preventOverflow` ที่เปิดเมื่อ `ignoreBoundary` เป็น false และมีค่าตำแหน่ง `auto` `[ทางการ]` |
| **Pinterest Gestalt** | **มี** | "The actual position may change given the available space around the anchor element" และใช้ `Controller` ของ Popover พร้อม `hideWhenReferenceHidden` `[ทางการ]` |
| **Atlassian** | **มี** | ใช้ `@atlaskit/popper` `[ทางการ]` |
| **Adobe Spectrum** | **มี** | ชั้น overlay positioning ของ React Aria `[ทางการ]` |
| **Material 3** | **มี (เฉพาะ rich)** | rich tooltip "adjust position to avoid going off screen" `[ทางการ]` |
| **Microsoft Fluent 2** | **มี บวกกลไกซ่อน** | นอกจากพลิกแล้วยังมีสถานะ `hidden` ที่ตั้งเมื่อ "positioning has determined that the tooltip or its target is outside its clipping boundary" `[ทางการ]` |
| **IBM Carbon** | **มี แต่ยังเป็นของทดลองและปิดไว้** | `autoAlign` ค่าเริ่มต้น `false` และคำอธิบายเขียนว่า "This prop is currently experimental and is subject to future changes. Requires React v17+" `[ทางการ]` |
| **Salesforce Lightning** | **ไม่มีในชั้น CSS** | ชุดที่เผยแพร่เป็น CSS ล้วน ต้องสลับคลาส nubbin เอง `[ทางการ]` |

**สรุป `[คำนวณ]`** **14 ใน 15 เจ้ามีกลไกพลิก** และ **13 เจ้าเปิดไว้เป็นค่าเริ่มต้น** เจ้าที่ไม่เปิดไว้คือ Carbon (ยังเป็นของทดลอง) และเจ้าที่ไม่มีเลยคือ SLDS (เพราะเผยแพร่เป็น CSS ล้วน)

**ลำดับการพลิกที่ตลาดใช้ร่วมกัน 3 ขั้น `[ตีความ]`** เรียบเรียงจากพารามิเตอร์ของ `flip` และ `shift`

1. **เลื่อนก่อน** ด้วย `shift` คือยังอยู่ด้านเดิมแต่เลื่อนไปตามแกนขวางให้พ้นขอบ โดยเผื่อระยะ 8
2. **ถ้าเลื่อนแล้วยังไม่พอ ให้พลิกไปด้านตรงข้าม** ด้วย `flip` เช่น `top` ไป `bottom`
3. **ถ้าพลิกแล้วก็ยังไม่พอ ให้เลือกด้านที่ล้นน้อยที่สุด** (`fallbackStrategy: 'bestFit'`) ไม่ใช่กลับไปด้านเดิม

**สิ่งที่ตลาดไม่ทำ `[ทางการ]`** `fallbackAxisSideDirection` ค่าเริ่มต้น `'none'` แปลว่า **tooltip ที่ตั้งไว้ว่าอยู่ด้านบน จะไม่กระโดดไปอยู่ด้านซ้ายหรือขวาเอง** จะพลิกได้แค่บนกับล่าง ซึ่งเป็นการตั้งใจ เพื่อไม่ให้ตำแหน่งเดากันไม่ได้

### 5.3 มีลูกศรหรือไม่มี และขนาดเท่าไหร่ (คำถามข้อ 9)

| เจ้า | มีลูกศรไหม | ค่าเริ่มต้น | ขนาด (กว้าง คูณ สูง) |
|---|---|---|---|
| **Atlassian** | **ไม่มีเลย** | ไม่มีกลไก | ไม่มี `[ทางการ]` |
| **GitHub Primer** | **ไม่มีเลย** | ไม่มีกลไก (CSS มีแค่ `:after` ที่เป็นสะพานเผื่อระยะ 4 และ 8 ไม่ใช่ลูกศร) | ไม่มี `[ทางการ]` |
| **Pinterest Gestalt** | **ไม่มี (ปิดไว้ในโค้ด)** | `caret={false}` ตายตัว ไม่มี prop ให้เปิด | ไม่มี `[ทางการ]` |
| **Microsoft Fluent 2** | มี แต่ปิดไว้ | `withArrow = false` | **สูง 6** (`arrowHeight = 6`) `[ทางการ]` |
| **Uber Base Web** | มี แต่ปิดไว้ | `showArrow: false` | **`ARROW_SIZE = 6`** แล้วคำนวณกล่องหมุน 45 องศาเป็น `ARROW_WIDTH = Math.ceil(Math.sqrt((6 * 2) ** 2 / 2))` คือ **9 คูณ 9** `[คำนวณ จากสูตรในไฟล์]` |
| **Mantine** | มี แต่ปิดไว้ | `withArrow` ไม่มีค่าเริ่มต้น แปลว่าปิด | **`arrowSize: 4`** และ `arrowOffset: 5` และ `arrowRadius: 0` และ `arrowPosition: 'side'` `[ทางการ]` |
| **Radix** | มี แต่ต้องเพิ่ม element เอง | ต้องใส่ `Tooltip.Arrow` | ไม่กำหนดขนาด `[ทางการ]` |
| **Chakra UI กับ Zag** | มี แต่ต้องเพิ่ม element เอง | ต้องใส่ `Tooltip.Arrow` | **`--arrow-size: sizes.2`** คือ **8** `[ทางการ]` |
| **Untitled UI** | มี แต่ปิดไว้ | `arrow = false` | **`size-2.5`** คือ **10 คูณ 10** (SVG `viewBox="0 0 100 100"`) `[ทางการ]` |
| **IBM Carbon** | **มีเสมอ** | `caret` prop ถูก `@deprecated` ไปแล้ว แปลว่าปิดไม่ได้อีก | **12 คูณ 6** เป็นค่าเริ่มต้นของ popover และ **8 คูณ 4 สำหรับ `icon-tooltip`** `[ทางการ]` |
| **Shopify Polaris** | **มีเสมอ** | element `Tail` อยู่ใน markup ตลอด | เป็น SVG ไม่ประกาศขนาดเป็น token และมี `filter: drop-shadow(0 0.1875rem 0.125rem rgba(26, 26, 26, 0.1))` ตอนอยู่ด้านบน `[ทางการ]` |
| **Ant Design** | **มีเสมอ** | `arrow` ค่าเริ่มต้น `true` ตั้งแต่ v5.2.0 และปิดด้วย `arrow={false}` ได้ | **`sizePopupArrow: 16`** แล้ว `unitWidth = sizePopupArrow / 2` ทำให้ลูกศรสูง **8** และกว้าง **16** `[ทางการ]` |
| **Adobe Spectrum** | **มีเสมอ** | "Has a directional arrow dependent on its placement" | **เดสก์ท็อป 10 คูณ 5** และ **มือถือ 12 คูณ 6** พร้อม `tooltip-tip-corner-radius: 1px` `[ทางการ]` |
| **Salesforce Lightning** | มี ต้องเติมคลาส nubbin เอง | ไม่มีค่าเริ่มต้น | สี่เหลี่ยม **16 คูณ 16** หมุน 45 องศา ทำให้ส่วนที่ยื่นออกมาสูง **8** และฐานกว้าง **22.6** `[คำนวณ จาก 16 คูณ รากที่สองของ 2]` |
| **Material 3** | มี ต้องส่งค่าเข้าไป | `caretSize` ของ `TooltipDefaults` | **16 คูณ 8** (`DpSize(16.dp, 8.dp)`) ส่วนฝั่ง Android ใช้ `mtrl_tooltip_arrowSize: 14dp` `[ทางการ]` |
| **ของเรา** | มี แยกเป็นค่าในแกน | ค่า `None` หรือ `Top no arrow` คือไม่มี | **8 คูณ 4** `[ของเรา]` |

**สรุป `[คำนวณ]`**

- **3 เจ้าไม่มีลูกศรเลย** คือ Atlassian, Primer และ Gestalt
- **6 เจ้ามีแต่ปิดไว้เป็นค่าเริ่มต้น** คือ Fluent, Base Web, Mantine, Radix, Chakra และ Untitled UI
- **6 เจ้ามีเสมอหรือเปิดไว้** คือ Carbon, Polaris, Ant, Spectrum, SLDS และ Material
- **ความสูงของลูกศรที่พบคือ (เจ้าละ 1 ค่า)** Mantine 4, Spectrum 5, Fluent 6, Carbon 6, Material 8, Ant 8, SLDS 8, Chakra 8, Base Web 9, Untitled UI 10 **มัธยฐาน 8** และ **ของเราอยู่ที่ 4 ซึ่งเป็นค่าต่ำสุด** เท่ากับ Mantine เท่านั้น
- **อัตราส่วนกว้างต่อสูงที่พบคือ 2 ต่อ 1 ส่วนใหญ่** (Carbon 12 คูณ 6, Ant 16 คูณ 8, Material 16 คูณ 8, Spectrum 10 คูณ 5, ของเรา 8 คูณ 4) ยกเว้นพวกที่ใช้สี่เหลี่ยมหมุน 45 องศาซึ่งได้ 2.83 ต่อ 1 (SLDS, Base Web)
- **แปลว่าของเราใช้อัตราส่วนถูกแล้ว แต่ขนาดเล็กกว่าตลาดเท่าตัว** ลูกศรสูง 4 บนมุมโค้ง 8 จะเกือบมองไม่เห็น เพราะมุมโค้งกินพื้นที่ฐานลูกศรไปแล้ว `[ตีความ]`

### 5.4 ตลาดตั้งชื่อแกนนี้ว่าอะไร (คำถามข้อ 10)

| เจ้า | ชื่อที่ใช้เรียกแกนตำแหน่ง | ชื่อที่ใช้เรียกการเปิดปิดลูกศร |
|---|---|---|
| **IBM Carbon** | `align` | ไม่มี (`caret` ถูกเลิกใช้) `[ทางการ]` |
| **Shopify Polaris** | `preferredPosition` และ `preferredAlignment` | ไม่มี `[ทางการ]` |
| **Adobe Spectrum** | `placement` | ไม่มี `[ทางการ]` |
| **Atlassian** | `position` | ไม่มี `[ทางการ]` |
| **Ant Design** | `placement` | **`arrow`** `[ทางการ]` |
| **GitHub Primer** | `direction` | ไม่มี `[ทางการ]` |
| **Microsoft Fluent 2** | `positioning` | **`withArrow`** `[ทางการ]` |
| **Uber Base Web** | `placement` | **`showArrow`** `[ทางการ]` |
| **Pinterest Gestalt** | `idealDirection` | ไม่มี `[ทางการ]` |
| **Untitled UI** | `placement` | **`arrow`** `[ทางการ]` |
| **Radix** | `side` และ `align` | ไม่มี (ใส่ element แยก) `[ทางการ]` |
| **Mantine** | `position` | **`withArrow`** `[ทางการ]` |
| **Chakra UI กับ Zag** | `positioning.placement` | ไม่มี (ใส่ element แยก) `[ทางการ]` |
| **Material 3** | ไม่พบชื่อ prop ที่ประกาศเป็น enum | `caretSize` `[ทางการ]` |
| **Salesforce Lightning** | คลาส `slds-nubbin_*` | ไม่มี `[ทางการ]` |

**นับคะแนน `[คำนวณ]`** `placement` 5 เจ้า และ `position` 3 เจ้า และ `align` 2 เจ้า และ `direction` 2 เจ้า และ `side` 1 เจ้า **แปลว่า `placement` ชนะ**

**และเรื่องสำคัญกว่าชื่อ คือ ตลาด 15 ใน 15 เจ้าแยกเรื่อง "ตำแหน่ง" กับเรื่อง "มีลูกศรหรือไม่" ออกเป็น 2 prop ไม่เคยยัดไว้ในแกนเดียว `[คำนวณ]`** 5 เจ้าที่ให้ปิดลูกศรได้ใช้ prop แยกชื่อ `arrow` หรือ `withArrow` หรือ `showArrow` ทั้งหมด

**ซึ่งคือปัญหาตรงจุดของเรา `[ตีความ]`** ค่า `Top no arrow` กับ `Top arrow` ในชุด `Help icon` ของเราคือการยัดสองเรื่องไว้ในแกนเดียว ทำให้ถ้าวันหนึ่งต้องการ "ล่างกลาง ไม่มีลูกศร" ก็ไม่มีค่านั้นให้เลือก และจำนวนค่าในแกนจะโตเป็น 2 เท่าทันทีถ้าทำให้ครบทุกคู่

---
## 6. ง. รูปร่างและขนาด

### 6.1 พื้นเข้มตัวหนังสือขาว หรือ พื้นขาวมีเส้นขอบ (คำถามข้อ 11)

| เจ้า | ทรงเริ่มต้น | ค่าสีจริง | ทำทรงที่สองได้ไหม |
|---|---|---|---|
| **Material 3 (plain)** | **พื้นเข้ม** | พื้น `md-sys-color.inverse-surface` และตัวหนังสือ `inverse-on-surface` | **ได้ แต่คนละ component** คือ rich tooltip ที่ใช้ `surface-container` กับ `on-surface-variant` `[ทางการ]` |
| **IBM Carbon** | **พื้นเข้ม** | `highContrast = true` เป็นค่าเริ่มต้น ทำให้ใช้ชั้นสีกลับขั้ว | **ได้ ตั้ง `highContrast={false}`** แล้วจะใช้สี layer ปกติ และมี `backgroundToken` ให้เลือก `layer` หรือ `background` `[ทางการ]` |
| **Atlassian** | **พื้นเข้ม** | พื้น `--ds-background-neutral-bold` ค่าสำรอง `#292a2e` และตัวหนังสือ `--ds-text-inverse` ค่าสำรอง `#fff` | ไม่มี `[ทางการ]` |
| **Ant Design** | **พื้นเข้ม** | พื้น `colorBgSpotlight` ซึ่งคำนวณจาก `getAlphaColor(colorTextBase, 0.85)` แปลว่าสีตัวหนังสือพื้นฐานที่ความทึบ 85 เปอร์เซ็นต์ และตัวหนังสือ `colorTextLightSolid` | **ได้ ผ่าน prop `color`** ที่รับทั้ง preset และ hex `[ทางการ]` |
| **GitHub Primer** | **พื้นเข้ม** | พื้น `--tooltip-bgColor` ค่าสำรอง `#25292e` และตัวหนังสือ `--tooltip-fgColor` ค่าสำรอง `#fff` | ไม่มี `[ทางการ]` |
| **Salesforce Lightning** | **พื้นเข้ม (น้ำเงินเข้ม)** | พื้น `--slds-g-color-brand-base-20` ค่าสำรอง `rgb(3, 45, 96)` และตัวหนังสือ `--slds-g-color-neutral-base-100` ค่าสำรอง `rgb(255, 255, 255)` | ได้ ผ่าน `--slds-c-tooltip-color-background` `[ทางการ]` |
| **Uber Base Web** | **พื้นเข้ม** | พื้น `tooltipBackground` ชี้ไป `backgroundInverseSecondary` และตัวหนังสือ `tooltipText` ชี้ไป `contentInversePrimary` **และใช้ชื่อ token เดียวกันทั้งธีมสว่างและธีมมืด** | ได้ ผ่าน override `[ทางการ]` |
| **Pinterest Gestalt** | **พื้นเข้ม** | `bgColor="darkGray"` และ `<Text color="inverse">` | ไม่มี `[ทางการ]` |
| **Mantine** | **พื้นเข้ม** | ธีมสว่างใช้ `--mantine-color-gray-9` กับ `--mantine-color-white` และ **ธีมมืดกลับขั้วเป็น `gray-2` กับ `black`** | **ได้ ผ่าน prop `color` และ `variant`** ที่ค่าเริ่มต้นคือ `filled` `[ทางการ]` |
| **Chakra UI** | **พื้นเข้ม** | `--tooltip-bg: colors.bg.inverted` และ `color: fg.inverted` | ได้ ผ่าน recipe override `[ทางการ]` |
| **Untitled UI** | **พื้นเข้ม** | `bg-primary-solid` และหัวข้อ `text-white` และข้อความรอง `text-tooltip-supporting-text` | ชุด Figma มีทั้งสองทรง `[ทางการ]` |
| **Adobe Spectrum** | **พื้นเข้ม** | `--spectrum-tooltip-background-color-default` ชี้ไป `--spectrum-neutral-background-color-default` และตัวหนังสือ `--spectrum-tooltip-content-color: var(--spectrum-white)` | **มี 3 ทรงสีตามความหมาย** คือ `informative`, `positive`, `negative` ซึ่งใช้พื้นสีสถานะกับตัวหนังสือขาวทั้งหมด `[ทางการ]` |
| **Microsoft Fluent 2** | **พื้นขาวมีเส้นขอบ** | พื้น `colorNeutralBackground1` และตัวหนังสือ `colorNeutralForeground1` และ `border: 1px solid colorTransparentStroke` | **ได้ `appearance: 'inverted'`** ที่ใช้ `colorNeutralBackgroundStatic` กับ `colorNeutralForegroundStaticInverted` `[ทางการ]` |
| **Shopify Polaris** | **พื้นขาวมีขอบนูน** | พื้น `--p-color-bg-surface` และตัวหนังสือ `--p-color-text` และขอบใช้ `box-shadow: var(--p-shadow-bevel-100)` พร้อม `mix-blend-mode: luminosity` | ไม่มี `[ทางการ]` |
| **ของเรา** | **พื้นขาว** ในแบบ `Dark Mode=False` | พื้นขาว และตัวหนังสือ `rgb(52, 64, 84)` และ **ไม่มีเส้นขอบ มีแต่เงา `shadows/center/xs`** | มี แต่ทำเป็นแกน `Dark Mode` ซึ่งถูกตัดสินแล้วว่าจะถอดออก `[ของเรา]` |

**สรุป `[คำนวณ]`** **พื้นเข้ม 12 เจ้า** และ **พื้นขาว 2 เจ้า คือ Fluent 2 และ Polaris** และ **1 เจ้าไม่กำหนดสีมาให้ คือ Radix** คิดเป็น **12 ใน 14 เจ้าที่กำหนดสีจริง** และ **เจ้าที่ทำได้ทั้งสองทรง 6 เจ้า** คือ Carbon, Fluent, Material (คนละ component), Mantine, Ant และ SLDS

**เหตุผลที่ตลาดเลือกพื้นเข้ม สรุปจากหลักฐานได้ 3 ข้อ `[ตีความ]`**

1. **เพื่อให้ไม่เหมือนพื้นผิวของหน้า** tooltip ลอยอยู่เหนือเนื้อหา ถ้าใช้พื้นขาวเหมือนการ์ดจะกลืนไปกับหน้า ซึ่งเห็นได้จากที่ 2 เจ้าที่ใช้พื้นขาวต้องเติมอะไรเข้าไปชดเชย คือ Fluent เติมเส้นขอบ 1 พิกเซล และ Polaris เติมขอบนูนแบบ inset 4 ด้าน
2. **เพื่อหนีปัญหาคอนทราสต์** พื้นเข้มกับตัวหนังสือขาวได้อัตราส่วนสูงเสมอโดยไม่ต้องคิด ส่วนพื้นขาวต้องเลือกเฉดตัวหนังสือให้ดี
3. **เพราะ tooltip เป็นข้อความชั่วคราวที่ต้องอ่านเร็ว** การกลับขั้วทำให้สายตาไปเกาะทันที

**ข้อสังเกตที่ตรงกับเราที่สุด `[ตีความ]`** **ของเราใช้พื้นขาวแบบไม่มีเส้นขอบ ซึ่งไม่เหมือนใครเลย** เพราะ 2 เจ้าที่ใช้พื้นขาวต่างก็เติมเส้นขอบหรือขอบนูน ส่วนเรามีแต่เงา `shadows/center/xs` ที่ค่าจริงคือ `0px 0px 4px rgba(0, 0, 0, 0.05)` ซึ่ง **จางมากจนแยกกล่องออกจากพื้นขาวไม่ได้** และตามข้อ 1.4.11 Non-text Contrast กล่องที่ลอยอยู่เหนือเนื้อหาควรมีขอบเขตที่มองเห็นได้

### 6.2 มีแกนขนาดไหม กี่ขั้น (คำถามข้อ 12)

**คำตอบตรงไปตรงมาคือ ไม่มีเจ้าไหนทำแกนขนาดให้ tooltip เลยสักเจ้า 0 ใน 15 `[คำนวณ]`**

ไม่มีเจ้าไหนมี prop ชื่อ `size` หรือค่า `sm` `md` `lg` ใน component tooltip ของตัวเอง สิ่งที่ตลาดทำแทนมี 5 แบบ

| แบบ | ใครทำ | รายละเอียด |
|---|---|---|
| **แยกเป็น 2 ความกว้าง** | **Shopify Polaris** | `width` รับ `'default'` หรือ `'wide'` ได้ค่า `max-width: 12.5rem` (200) กับ `17.1875rem` (275) และแยก `padding` รับ `'default'` (คือ `4px 8px`) หรือ `'400'` (คือ 16) และแยก `borderRadius` รับ `'100'` หรือ `'200'` ค่าเริ่มต้น `'200'` `[ทางการ]` |
| **แยกเป็น component ต่างชนิด** | **IBM Carbon** | `Tooltip` ใช้ `type-style('body-01')` และ padding `spacing-05` (16) ทั้งสองแกน และ max-width 288 ส่วน `icon-tooltip` ตั้ง `tooltip-padding-block: 2` และใช้ `body-compact-01` และลูกศรเล็กลงเป็น 8 คูณ 4 ส่วน `definition-tooltip` ใช้ padding `8px 16px` และ max-width 176 `[ทางการ]` |
| **แยกเป็น component ต่างชนิด** | **Material 3** | `PlainTooltip` max-width 200 padding `PaddingValues(8.dp, 4.dp)` มุมโค้ง `corner-extra-small` (4) ส่วน `RichTooltip` max-width 320 มุมโค้ง `corner-medium` (12) และมี elevation `level2` (3) `[ทางการ]` |
| **แยกชุดค่าตามอุปกรณ์ ไม่ใช่ตามขนาด** | **Adobe Spectrum** | token เดียวกันมี 2 ชุดคือ desktop กับ mobile คือ max-width 160 กับ 200 และ min-height `component-height-75` 24 กับ 30 และ padding inline `component-edge-to-text-75` 9 กับ 11 และ padding block 4 ถึง 5 กับ 5 ถึง 6 และ font-size 12 กับ 15 และ tip 10 คูณ 5 กับ 12 คูณ 6 `[ทางการ]` |
| **แยกตามว่ามีข้อความรองไหม** | **Untitled UI** | `py-3` (12) เมื่อมี `description` และ `py-2` (8) เมื่อไม่มี โดย `px-3` (12) เท่ากันทั้งสองแบบ `[ทางการ]` |

**ข้อสรุปที่ต้องยอมรับ `[ตีความ]`** **ธรรมเนียม 5 ขั้นของระบบเราไม่มีที่ใช้กับ tooltip** เหตุผลเชิงกลไกคือ tooltip ไม่มีอะไรให้สเกล มันไม่ได้ไปอยู่ข้างปุ่มที่ต้องสูงเท่ากัน ไม่ได้อยู่ในตารางที่ต้องชิดคอลัมน์ มันเป็นกล่องที่ขนาดมาจากตัวหนังสือล้วน **ตัวแปรเดียวที่มีผลจริงคือ "มีข้อความรองหรือไม่" ซึ่งคือ 2 สภาพ ไม่ใช่ 5 ขั้น** และตลาดก็ทำแบบนั้น

### 6.3 ความกว้างสูงสุดเท่าไหร่ และยาวได้กี่บรรทัด (คำถามข้อ 13)

| เจ้า | ความกว้างสูงสุด | การตัดบรรทัด | จำกัดจำนวนคำหรือบรรทัดไหม |
|---|---|---|---|
| **Adobe Spectrum** | **160 เดสก์ท็อป และ 200 มือถือ** (`tooltip-maximum-width`) | ตัดเอง | ไม่ `[ทางการ]` |
| **Pinterest Gestalt** | **180** (`maxWidth={180}`) | ตัดเอง และรับ `text` เป็น array เพื่อใส่ย่อหน้าได้ | ไม่ `[ทางการ]` |
| **Material 3** | **plain 200 และ rich 320** | ตัดเอง | ไม่ `[ทางการ]` |
| **Shopify Polaris** | **200 และ 275 แบบ wide** | `word-break: break-word` | ไม่ `[ทางการ]` |
| **Microsoft Fluent 2** | **240** | `overflowWrap: 'break-word'` | เอกสารเขียน "Limit the content in a tooltip to just the essentials" แต่ไม่ให้ตัวเลข `[ทางการ]` |
| **GitHub Primer** | **250** | `overflow-wrap: break-word` และ `text-wrap: balance` และ `text-align: center` | เอกสารเขียน "Keep the Tooltip text minimal" แต่ไม่ให้ตัวเลข `[ทางการ]` |
| **Ant Design** | **250** (`maxWidth: 250`) | `wordWrap: 'break-word'` | ไม่ `[ทางการ]` |
| **IBM Carbon** | **288** และ **176 สำหรับ definition tooltip** | `overflow-wrap: break-word` | ไม่ `[ทางการ]` |
| **Chakra UI** | **320** (`maxW: 'xs'` ซึ่งคือ `20rem`) | ตัดเอง | ไม่ `[ทางการ]` |
| **Untitled UI** | **320** (`max-w-xs`) | ตัดเอง | ไม่ `[ทางการ]` |
| **Salesforce Lightning** | **320 เดสก์ท็อป และ 160 เมื่อจอแคบกว่า 480** (`@media (max-width: 480px)`) | ตัดเอง | ไม่ `[ทางการ]` |
| **Atlassian** | **420** และ **240 เมื่อใช้ `truncate`** | `overflow-wrap: break-word` และ `word-wrap: break-word` | **เขียนกฎไว้ว่า "Tooltip text must never truncate itself"** และประกาศ `truncate` เป็น `@deprecated` พร้อมเหตุผลว่า "We no longer support truncating text in the tooltip as it's inaccessible" `[ทางการ]` |
| **Mantine** | **ไม่กำหนด** ค่าเริ่มต้นคือ `white-space: nowrap` คือบรรทัดเดียวตลอด | ต้องตั้ง `multiline` แล้วกำหนด `w` เอง | ไม่ `[ทางการ]` |
| **Radix และ Base Web** | **ไม่กำหนด** | ผู้ใช้เขียน CSS เอง | ไม่ `[ทางการ]` |
| **ของเรา** | `Title` กว้าง 108 ตามเนื้อหา และ `Text area` **กว้าง 320 ตายตัว** และ `Avartar` กว้าง 122 ตามเนื้อหา | `Text area` ตั้ง `counterAxisSizingMode: FIXED` | ไม่ `[ของเรา]` |

**สรุป `[คำนวณ]`** ค่าที่พบคือ 160, 176, 180, 200, 200, 240, 250, 250, 275, 288, 320, 320, 320, 420 **มัธยฐาน 250** และ **ช่วงที่คนทำเยอะสุดคือ 200 ถึง 320**

**ไม่พบเจ้าไหนกำหนดจำนวนคำสูงสุดหรือจำนวนบรรทัดสูงสุดเป็นตัวเลข 0 ใน 15 เจ้า `[คำนวณ]`** ที่มีคือข้อความเชิงแนวทาง (Fluent, Primer, Atlassian) และ **มี 1 เจ้าที่ห้ามตัดข้อความตรง ๆ คือ Atlassian** โดยให้เหตุผลว่าการตัดข้อความในของที่ตัวมันเองมีไว้แสดงข้อความเต็มนั้นเป็นเรื่องย้อนแย้ง

**ข้อสังเกตที่ตรงกับเรา `[ตีความ]`** `Text area` ของเรากว้าง 320 ตายตัว ซึ่งอยู่ปลายสูงของช่วงตลาด และสูงถึง 118 เพราะข้อความรองกิน 4 บรรทัด **ถ้าไปโผล่บนมือถือกว้าง 360 จะกินความกว้างจอเกือบทั้งหมด** ซึ่งเป็นเหตุผลที่ Spectrum ไม่ให้เกิน 200 และ SLDS หดลงเป็น 160 บนจอแคบ

### 6.4 รองรับหัวข้อกับข้อความรองสองชั้นไหม (คำถามข้อ 14)

| เจ้า | สองชั้นไหม | รายละเอียด |
|---|---|---|
| **Material 3** | **ใช่ แต่เรียกว่า rich tooltip** | `subhead` ใช้ `title-small` (14 บน 20 น้ำหนัก medium) และ `supporting-text` ใช้ `body-medium` และยังมี `action` ที่ใช้ `label-large` (14) อีกชั้น `[ทางการ]` |
| **Untitled UI** | **ใช่ ในชิ้นเดียวกัน** | `title` เป็น `<span className="text-xs font-semibold text-white">` และ `description` เป็น `<span className="text-xs font-medium text-tooltip-supporting-text">` โดยมี `gap-1` (4) คั่น และเปลี่ยน padding แนวตั้งจาก 8 เป็น 12 เมื่อมี description `[ทางการ]` |
| **Pinterest Gestalt** | **ครึ่งทาง** | รับ `text` เป็น array ของ string แล้วแทรก `<br /><br />` ระหว่างบรรทัด ได้หลายย่อหน้าแต่ **ไม่ได้แยกชั้นหัวข้อกับข้อความรอง** (ใช้ `Text size="100"` ชั้นเดียว) `[ทางการ]` |
| **12 เจ้าที่เหลือ** | **ไม่ใช่** | เป็นก้อนข้อความชั้นเดียว รับ `content` หรือ `label` หรือ `title` เป็น node เดียว `[ทางการ]` |
| **ของเรา** | **ใช่** | `Text area` มีเฟรม `Text and supporting text` ที่ `itemSpacing: 4` บรรจุ `Text` (Prompt 600 ขนาด 12) กับ `Supporting text` (Prompt 400 ขนาด 12) `[ของเรา]` |

**สรุป `[คำนวณ]`** **2 ใน 15 เจ้ารองรับสองชั้นจริง** และ **1 เจ้าในนั้นแยกเป็น component ต่างชื่อ** (Material เรียกว่า rich tooltip) เพราะพอมีสองชั้นแล้วมันเริ่มกลายเป็น popover

**ข้อค้นพบ `[ตีความ]`** ของเราตรงกับ Untitled UI แบบที่คัดลอกมาเลย คือหัวข้อ 12 ตัวหนา บวกข้อความรอง 12 ตัวปกติ ห่างกัน 4 และระยะขอบเปลี่ยนตามว่ามีข้อความรองหรือไม่ **แต่ Untitled UI ทำเป็น prop เดียวในชิ้นเดียว ส่วนเราทำเป็น COMPONENT_SET แยก 2 ชุด (`Title` กับ `Text area`)** ซึ่งทำให้ทั้ง 2 ชุดต้องดูแลค่าเดียวกันซ้ำสองที่

### 6.5 มีเงาไหม ค่าเท่าไหร่ (คำถามข้อ 15)

| เจ้า | มีเงาไหม | ค่า |
|---|---|---|
| **Material 3 (plain)** | **ไม่มี** | ไม่มี token elevation ในไฟล์ `_md-comp-plain-tooltip.scss` `[ทางการ]` |
| **Material 3 (rich)** | **มี** | `container-elevation: md-sys-elevation.level2` ซึ่งคือ `3px` `[ทางการ]` |
| **Atlassian** | **ไม่มี** | CSS ที่คอมไพล์แล้วมีแค่ font, radius, padding, bg, color, max-width ไม่มี box-shadow `[ทางการ]` |
| **GitHub Primer** | **ไม่มี** | CSS ไม่มี box-shadow เลย `[ทางการ]` |
| **Adobe Spectrum** | **ไม่มี** | `@spectrum-css/tooltip` ไม่มีบรรทัด box-shadow `[ทางการ]` |
| **Mantine** | **ไม่มี** | `Tooltip.css` ไม่มี box-shadow `[ทางการ]` |
| **Radix** | **ไม่มี** | ไม่มีสไตล์มาให้ `[ทางการ]` |
| **IBM Carbon** | **มี แต่ปิดไว้** | `dropShadow = false` เป็นค่าเริ่มต้น ถ้าเปิดจะใช้ `drop-shadow(0 $spacing-01 $spacing-01 rgba(0, 0, 0, 0.2))` `[ทางการ]` |
| **Uber Base Web** | **มี** | `boxShadow: shadow400` ซึ่งคือ `0 1px 4px hsla(0, 0%, 0%, 0.16)` `[ทางการ]` |
| **Salesforce Lightning** | **มี** | สืบจาก `.slds-popover` คือ `0 2px 3px 0 rgba(0, 0, 0, 0.16)` `[ทางการ]` |
| **Pinterest Gestalt** | **มี** | คลาส `.shadow` ใช้ `--elevation-floating` ซึ่งคือ `0px 0px 8px 0px rgba(0, 0, 0, .1)` **เป็นเงารอบด้าน ไม่ทอดลง** `[ทางการ]` |
| **Chakra UI** | **มี** | `boxShadow: 'md'` ซึ่งโหมดสว่างคือ `0px 4px 8px gray.900/10` บวก `0px 0px 1px gray.900/30` `[ทางการ]` |
| **Microsoft Fluent 2** | **มี และหนาที่สุด** | `filter: drop-shadow(0 0 2px colorNeutralShadowAmbient) drop-shadow(0 4px 8px colorNeutralShadowKey)` **2 ชั้น คือ ambient บวก key** `[ทางการ]` |
| **Ant Design** | **มี และหนัก 3 ชั้น** | `dropShadowPopover` คือ `drop-shadow(0 6px 16px 8%) drop-shadow(0 3px 6px 12%) drop-shadow(0 9px 28px 5%)` `[ทางการ]` |
| **Shopify Polaris** | **มี แต่เป็นขอบนูน ไม่ใช่เงาทอด** | `box-shadow: var(--p-shadow-bevel-100)` ซึ่งเป็น inset 4 ด้าน และหัวลูกศรใช้ `filter: drop-shadow(0 0.1875rem 0.125rem rgba(26, 26, 26, 0.1))` แยกต่างหาก `[ทางการ]` |
| **Untitled UI** | **มี** | `shadow-lg` ของ Tailwind `[ทางการ]` |
| **ของเรา** | **มี** | กล่องนอกใช้ `shadows/center/xs` ซึ่งคือ `0px 0px 4px rgba(0, 0, 0, 0.05)` และบางที่ยังซ้อน `shadows/bottom/md` ซึ่งคือ `0px 3px 8px -2px rgba(0, 0, 0, 0.1)` เข้ามาอีกชั้น `[ของเรา]` |

**สรุป `[คำนวณ]`** **ใส่เงาเป็นค่าเริ่มต้น 8 เจ้า** (Polaris, Ant, Fluent, SLDS, Base Web, Gestalt, Untitled UI, Chakra) และ **ไม่ใส่ 5 เจ้า** (Material plain, Spectrum, Atlassian, Primer, Mantine) และ **1 เจ้ามีกลไกแต่ปิดไว้** (Carbon) และ **1 เจ้าไม่กำหนด** (Radix) และ Material rich ใส่ขณะที่ Material plain ไม่ใส่ **ไม่มีฉันทามติ**

**แต่มีแบบแผนที่เห็นได้ชัด `[ตีความ]`** **เจ้าที่ใช้พื้นเข้มส่วนใหญ่ไม่ใส่เงา** (Atlassian, Primer, Spectrum, Mantine, Material plain) เพราะพื้นเข้มบนพื้นสว่างแยกตัวออกมาอยู่แล้ว **ส่วนเจ้าที่ใส่เงาหนักที่สุดคือ 2 เจ้าที่ใช้พื้นขาว** (Fluent 2 ชั้น และ Polaris ขอบนูน) และเจ้าที่พื้นเข้มแต่ยังใส่เงา (Ant, Base Web, SLDS, Gestalt, Chakra) ใช้เงาบางถึงกลาง **แปลว่าตลาดมองว่าเงาเป็นของทดแทนเส้นขอบ ไม่ใช่ของประดับ**

**และข้อสังเกตเฉพาะของเรา `[ตีความ]`** เงาของเราคือพื้นขาวบวกเงาจาง 5 เปอร์เซ็นต์ ซึ่งเป็นการเลือกที่อ่อนแอที่สุดในตารางนี้ ถ้าจะคงพื้นขาวไว้ต้องเลือกอย่างใดอย่างหนึ่ง คือ **เติมเส้นขอบแบบ Fluent** หรือ **ใช้เงาที่หนักกว่านี้แบบ Chakra**

---
## 7. จ. การเข้าถึง

### 7.1 `role="tooltip"` กับ `aria-describedby` และ `aria-labelledby` ต่างกันเมื่อไหร่ (คำถามข้อ 16)

**กฎที่มาตรฐานกำหนด `[มาตรฐาน]`** APG เขียนว่า "The element that serves as the tooltip container has role tooltip" และ "The element that triggers the tooltip references the tooltip element with aria-describedby"

**แต่ของจริงในตลาดซับซ้อนกว่านั้น เพราะมี 2 กรณีใช้งานที่ต่างกันโดยเนื้อแท้ `[ตีความ]`**

- **กรณีที่ 1 ตัวกระตุ้นมีชื่ออยู่แล้ว** เช่น ปุ่มที่มีคำว่า "บันทึก" อยู่ tooltip มาเติมข้อมูล ให้ใช้ **`aria-describedby`** โปรแกรมอ่านหน้าจอจะอ่านชื่อปุ่มก่อน แล้วอ่านคำอธิบายตาม
- **กรณีที่ 2 ตัวกระตุ้นไม่มีชื่อ** เช่น ปุ่มไอคอนล้วน tooltip คือชื่อของมัน ให้ใช้ **`aria-labelledby`** หรือ `aria-label` ถ้าใช้ `aria-describedby` ในกรณีนี้ ปุ่มจะไม่มีชื่อเลย

| เจ้า | `role` ที่ใช้ | กลไกเชื่อมกับตัวกระตุ้น | มีสวิตช์ให้เลือกไหม |
|---|---|---|---|
| **IBM Carbon** | `role="tooltip"` บน span และ **ตั้ง `aria-hidden="true"` ด้วย** | `"aria-labelledby": ariaLabelledBy ?? (hasLabel ? id : void 0)` และ `"aria-describedby": ariaDescribedBy ?? (!hasLabel ? id : void 0)` | **มี 2 prop คือ `label` กับ `description`** และเอกสารระบุว่า "if label and description are both provided, label will be used and description will not be used" `[ทางการ]` |
| **GitHub Primer** | `role: type === "description" ? "tooltip" : void 0` และ **`aria-hidden: true` ตลอด** | `aria-labelledby` เมื่อ `type === 'label'` และ `aria-describedby` เมื่อ `type === 'description'` | **มี prop `type` ค่าเริ่มต้น `'description'`** และ **เตือนในโค้ดว่า "The label type Tooltip is going to be used here to label the trigger element. Please remove the aria-label from the trigger element"** `[ทางการ]` |
| **Microsoft Fluent 2** | `role: 'tooltip'` | `relationship: 'label'` ตั้ง `aria-label` ถ้าเนื้อหาเป็น string หรือ `aria-labelledby` ถ้าไม่ใช่ และ `relationship: 'description'` ตั้ง `aria-describedby` และ `relationship: 'inaccessible'` ไม่ตั้งอะไรเลย | **มี prop `relationship` และเป็น prop ที่บังคับให้ระบุ** พร้อมคำอธิบายว่า `inaccessible` "makes the tooltip's content inaccessible to screen readers, and should only be used if the tooltip's text is available by some other means" `[ทางการ]` |
| **Adobe Spectrum กับ React Aria** | `role: 'tooltip'` | `'aria-describedby': state.isOpen ? tooltipId : undefined` **เท่านั้น** | **ไม่มี** `[ทางการ]` |
| **Atlassian** | `role` ค่าเริ่มต้น `'tooltip'` และยอมให้ส่ง `role` เข้ามาทับได้ | `aria-describedby` บน `TriggerProps` และ **คัดลอกเนื้อหาไปไว้ใน element ที่ซ่อนไว้สำหรับโปรแกรมอ่านหน้าจออีกชุด** ปิดได้ด้วย `isScreenReaderAnnouncementDisabled` เพราะ "it can result in the same content be announced twice" | ไม่มีสวิตช์ label กับ description `[ทางการ]` |
| **Radix** | `role: ariaLabel ? void 0 : "tooltip"` | `aria-describedby` บน trigger และถ้าส่ง `aria-label` เข้ามาจะย้ายไปใส่ใน `VisuallyHidden` ที่มี `role="tooltip"` แทน | ครึ่งทาง ผ่าน prop `aria-label` `[ทางการ]` |
| **Chakra UI กับ Zag** | `role: hasAriaLabel ? void 0 : "tooltip"` | `"aria-describedby": open ? contentId : void 0` | ครึ่งทาง เหมือน Radix `[ทางการ]` |
| **Shopify Polaris** | ไม่พบการตั้ง `role` ในไฟล์ที่อ่าน | `accessibilityNode.setAttribute('aria-describedby', id)` บวก prop `accessibilityLabel` ที่เป็น "Visually hidden text for screen readers" | ไม่มี `[ทางการ]` |
| **Pinterest Gestalt** | `role="tooltip"` ส่งเข้า `Controller` | **ใช้ `aria-label` บนกล่องที่ครอบตัวกระตุ้น** โดยค่าสำรองคือตัวข้อความของ tooltip เอง | ไม่มี แต่ใช้วิธี label เป็นค่าเริ่มต้น `[ทางการ]` |
| **Uber Base Web** | `accessibilityType: ACCESSIBILITY_TYPE.tooltip` (ค่าเริ่มต้นของ Tooltip ส่วน Popover ใช้ `menu`) | ตามชั้น Popover | เลือกได้ 3 ค่า คือ `none`, `menu`, `tooltip` `[ทางการ]` |
| **Mantine** | `useRole(context, { role: "tooltip" })` | ตาม Floating UI | ไม่มี `[ทางการ]` |
| **Salesforce Lightning** | ไม่ระบุใน CSS | เอกสารเขียน "Give the tooltip an ID and use that as the value of the `aria-describedby` attribute of the DOM element it describes" | ไม่มี `[ทางการ]` |
| **Ant Design** | ไม่พบการตั้ง `role` หรือ `aria-*` ในไฟล์ที่อ่าน | **หาไม่เจอ** | ไม่มี `[ทางการ]` |
| **Material 3** | ฝั่ง Android ใช้กลไกของแพลตฟอร์ม | ไม่เทียบได้ตรง | ไม่เทียบได้ตรง `[ทางการ]` |

**สรุป `[คำนวณ]`** **`role="tooltip"` ใช้ 11 ใน 15 เจ้า** และ **`aria-describedby` ใช้ 9 เจ้า** และ **เจ้าที่ทำสวิตช์ label กับ description ให้เลือกชัด ๆ มี 3 เจ้า** คือ Carbon, Primer และ Fluent **และ Fluent เป็นเจ้าเดียวที่บังคับให้นักพัฒนาระบุ** ซึ่งเป็นการออกแบบ API ที่ฉลาด เพราะทำให้ไม่มีใครลืม

**กลไกที่ตลาดใช้แก้ปัญหา "อ่านซ้ำ" 2 แบบ `[ทางการ]`**

| กลไก | ใครทำ | รายละเอียด |
|---|---|---|
| ตั้ง `aria-hidden="true"` บนตัว tooltip แล้วใช้ `aria-labelledby` หรือ `aria-describedby` ชี้เข้าไปแทน | Carbon และ Primer | ทำให้โปรแกรมอ่านหน้าจออ่านผ่านความสัมพันธ์เท่านั้น ไม่อ่านจาก DOM ซ้ำ |
| คัดลอกเนื้อหาไปใส่ element ที่ซ่อนไว้แยก | Atlassian | และยังเปิดช่องให้ปิดได้ด้วย `isScreenReaderAnnouncementDisabled` เพราะรู้ว่าบางกรณีจะอ่านซ้ำ |

**ข้อควรรู้เรื่อง `aria-hidden` `[ตีความ]`** Carbon กับ Primer ตั้ง `aria-hidden="true"` บนตัว tooltip ทั้งที่มี `role="tooltip"` อยู่ ซึ่งดูขัดกันเอง แต่เป็นเทคนิคที่ใช้ได้ เพราะ `aria-labelledby` ยังอ่านข้อความจาก element ที่ `aria-hidden` ได้ ส่วน `role="tooltip"` เก็บไว้เพื่อให้เครื่องมือตรวจสอบและ CSS ใช้ได้

### 7.2 ข้อ 1.4.13 Content on Hover or Focus แต่ละเจ้าทำครบไหม (คำถามข้อ 17)

**ข้อกำหนด 3 ข้อย่อย ระดับ AA `[มาตรฐาน]`** จาก WCAG 2.2

| ข้อย่อย | ข้อความเต็ม |
|---|---|
| **Dismissible** | "A mechanism is available to dismiss the additional content without moving pointer hover or keyboard focus, unless the additional content communicates an input error or does not obscure or replace other content" |
| **Hoverable** | "If pointer hover can trigger the additional content, then the pointer can be moved over the additional content without the additional content disappearing" |
| **Persistent** | "The additional content remains visible until the hover or focus trigger is removed, the user dismisses it, or its information is no longer valid" |

| เจ้า | Dismissible | Hoverable | Persistent | สรุป |
|---|---|---|---|---|
| **Adobe Spectrum กับ React Aria** | **ผ่าน** Escape ใน `useTooltipTrigger` | **ผ่าน และทำดีที่สุด** `useSafeArea` คำนวณรูปหลายเหลี่ยมระหว่างตัวกระตุ้นกับ tooltip พร้อมเผื่อระยะ `PADDING = 8` ซึ่งคอมเมนต์ในไฟล์เขียนว่า "slightly forgiving of sub-pixel jitter and the gap between the elements" | **ผ่าน** | **ครบ 3 ข้อ** `[ทางการ]` |
| **Radix** | **ผ่าน** ผ่าน `DismissableLayer` และ `onEscapeKeyDown` | **ผ่าน** `disableHoverableContent = false` เป็นค่าเริ่มต้น และใช้ `getHull` สร้าง `graceArea` จาก `paddedExitPoints` กับ `hoverTargetPoints` | **ผ่าน** | **ครบ 3 ข้อ** `[ทางการ]` |
| **Microsoft Fluent 2** | **ผ่าน** ฟัง Escape บน document และ `stopPropagation` ไม่ให้ชนกับตัวอื่น | **ผ่าน** `state.content.onPointerEnter = mergeCallbacks(state.content.onPointerEnter, clearDelayTimeout)` พร้อมคอมเมนต์ว่า "This keeps the tooltip visible when the mouse is moved over it" | **ผ่าน** | **ครบ 3 ข้อ** `[ทางการ]` |
| **IBM Carbon** | **ผ่าน** ฟัง Escape บน document เมื่อเปิด | **ผ่าน** `leaveDelayMs = 300` บวก tooltip อยู่ในกล่องเดียวกับตัวกระตุ้น ทำให้ย้ายเมาส์ไปบน tooltip แล้วยังนับว่าอยู่ในเขต | **ผ่าน** | **ครบ 3 ข้อ** `[ทางการ]` |
| **GitHub Primer** | **ผ่าน** `useOnEscapePress` | **ผ่าน** tooltip มี `onMouseEnter: openTooltip` และ `onMouseLeave: closeTooltip` และ CSS มี `:after` ที่เป็นสะพานกว้าง 8 หรือสูง 4 ปิดช่องว่าง | **ผ่าน** | **ครบ 3 ข้อ** `[ทางการ]` |
| **Atlassian** | **ผ่าน** Escape และ scroll | **ผ่าน** `TooltipPrimitive` มี `onMouseOver` กับ `onMouseOut` และปิดได้ด้วย `ignoreTooltipPointerEvents` ที่เอกสารบอกตรง ๆ ว่า "Setting this to true will also prevent the tooltip from persisting when hovered" | **ผ่าน** | **ครบ 3 ข้อ ถ้าไม่เปิด `ignoreTooltipPointerEvents`** `[ทางการ]` |
| **Shopify Polaris** | **ผ่าน** `if (event.key !== 'Escape') return;` | **ผ่าน ถ้าไม่ตั้ง `dismissOnMouseOut`** ซึ่งส่งต่อไปเป็น `preventInteraction` | **ผ่าน** | **ครบ 3 ข้อ ตามค่าเริ่มต้น** `[ทางการ]` |
| **Untitled UI** | **ผ่าน** ตาม React Aria | **ผ่าน** ตาม React Aria | **ผ่าน** | **ครบ 3 ข้อ** `[ทางการ]` |
| **Uber Base Web** | **ผ่านเฉพาะ `StatefulTooltip`** เพราะ `stateful-container.js` ต่อ `onEsc` ให้ ส่วน `Tooltip` เปล่าต้องส่ง `onEsc` เอง | **ผ่าน** `onMouseEnterDelay` และ `onMouseLeaveDelay` 200 บวกชั้น Layer ที่ตั้ง `isHoverLayer` | **ผ่าน** | **ครบ 3 ข้อ เมื่อใช้ `StatefulTooltip`** `[ทางการ]` |
| **Chakra UI กับ Zag** | **ผ่าน** `closeOnEscape: true` | **ตก** `interactive: false` เป็นค่าเริ่มต้น และโค้ดตั้ง `pointerEvents` เป็น `prop("interactive") ? "auto" : "none"` แปลว่า **ย้ายเมาส์ไปบน tooltip แล้วมันหาย** | **ผ่าน** | **ตก 1 ข้อตามค่าเริ่มต้น** `[ทางการ]` |
| **Mantine** | **ผ่าน** `useDismiss` | **ตก 2 ชั้น** ชั้นแรก CSS ตั้ง `pointer-events: none` และเปิดเป็น `auto` เฉพาะเมื่อมี `[data-interactive]` ชั้นที่สอง `handleClose: settings.interactive ? safePolygon() : null` แปลว่าไม่มีพื้นที่ปลอดภัยถ้าไม่ตั้ง `interactive` | **ผ่าน** | **ตก 1 ข้อ และตกเรื่องคีย์บอร์ดด้วยเพราะ `focus: false`** `[ทางการ]` |
| **Pinterest Gestalt** | **ตก ไม่พบกลไก Escape** `onDismiss={noop}` | **ตก ยกเว้นเมื่อมี prop `link`** เพราะ `mouseLeaveDelay = link ? TIMEOUT : 0` และตัว handler `onMouseEnter` กับ `onMouseLeave` ของกล่อง tooltip ถูกตั้งเป็น `undefined` เมื่อไม่มี link | **ผ่าน** | **ตก 2 ข้อ** `[ทางการ]` |
| **Ant Design** | **ไม่พบกลไกในไฟล์ที่อ่าน** | **ผ่าน** `mouseLeaveDelay: 0.1` บวกชั้น trigger ที่นับกล่องป๊อปอัปเป็นเขตเดียวกัน | **ผ่าน** | **ตก 1 ข้อ และตกเรื่องคีย์บอร์ดเพราะ `trigger: 'hover'`** `[ทางการ]` |
| **Salesforce Lightning** | **ไม่มีในชุด CSS** ต้องเขียนเอง | **ไม่มีในชุด CSS** | **ไม่มีในชุด CSS** | **ยืนยันไม่ได้** `[ทางการ]` |
| **Material 3** | **ผ่านด้วยวิธีคนละแบบ** มีการหายเองที่ 1500 ซึ่งข้อ Persistent บอกว่า "remains visible until the hover or focus trigger is removed" การหายเองจึงขัดกับข้อนี้ | ไม่เทียบได้ตรงเพราะเป็นแพลตฟอร์มมือถือ | **มีข้อสงสัย** | **ยืนยันไม่ได้ และมีจุดที่อาจขัดข้อ Persistent** `[ตีความ]` |

**สรุป `[คำนวณ]`** **ครบ 3 ข้อ 9 ใน 15 เจ้า** และ **ตกข้อ Hoverable 3 เจ้า** คือ Chakra กับ Zag, Mantine และ Gestalt และ **ตกข้อ Dismissible 3 เจ้า** คือ Gestalt, Ant และ SLDS

**ข้อ Hoverable คือข้อที่ตลาดตกมากที่สุด `[คำนวณ]`** และสาเหตุเหมือนกันทุกเจ้าคือ **ตั้ง `pointer-events: none` เพื่อกัน tooltip ไปขวางการคลิก** ซึ่งเป็นการแก้ปัญหาหนึ่งด้วยการสร้างปัญหาอีกอัน

**กลไกที่แก้ข้อ Hoverable ได้ถูกต้องที่สุด คือพื้นที่ปลอดภัยรูปหลายเหลี่ยม `[ทางการ]`** ซึ่งมี 3 เจ้าทำ

| เจ้า | ชื่อกลไก | รายละเอียด |
|---|---|---|
| **Adobe Spectrum** | `useSafeArea` | เผื่อระยะ `PADDING = 8` รอบตัวกระตุ้นกับกล่อง แล้วตรวจทุกครั้งที่เมาส์ขยับว่าอยู่ในเขตไหม และยังฟัง `pointerleave` ของ `documentElement` เผื่อเมาส์ออกนอกหน้าไปเลย และ **ข้ามการตรวจเมื่อ `pointerType === 'touch'`** |
| **Radix** | `graceArea` | สร้าง convex hull จากจุดขอบของตัวกระตุ้นกับจุดขอบของ tooltip แล้วถือว่าเมาส์ในรูปนั้นคือยังไม่ออก |
| **Mantine** | `safePolygon()` ของ Floating UI | **แต่ใช้เฉพาะเมื่อตั้ง `interactive` เท่านั้น** |

### 7.3 กด Escape ปิดได้ไหม ทุกเจ้าทำหรือเปล่า (คำถามข้อ 18)

| เจ้า | ปิดด้วย Escape | หลักฐาน |
|---|---|---|
| **IBM Carbon** | **ได้** | `if (open && match(event, Escape)) { event.stopPropagation(); setOpen(false); }` และฟังบน document `[ทางการ]` |
| **Adobe Spectrum** | **ได้** | `if (e.key === 'Escape') { e.stopPropagation(); state.close(true); }` ฟังในเฟส capture `[ทางการ]` |
| **Shopify Polaris** | **ได้** | `if (event.key !== 'Escape') return;` `[ทางการ]` |
| **Atlassian** | **ได้** | เอกสารเขียน "The tooltip still closes on pointer leave, blur, scroll and Escape" `[ทางการ]` |
| **GitHub Primer** | **ได้** | `useOnEscapePress` `[ทางการ]` |
| **Microsoft Fluent 2** | **ได้** | `if (ev.key === Escape && !ev.defaultPrevented)` พร้อมคอมเมนต์ว่า "stop propagation to avoid conflicting with other elements that listen for Escape" `[ทางการ]` |
| **Radix** | **ได้** | `DismissableLayer` พร้อม `onEscapeKeyDown` และเอกสารระบุว่า Escape "close the tooltip without delay" `[ทางการ]` |
| **Mantine** | **ได้** | `useDismiss(context, { enabled: typeof settings.opened === "undefined" })` `[ทางการ]` |
| **Chakra UI กับ Zag** | **ได้** | `closeOnEscape: true` `[ทางการ]` |
| **Untitled UI** | **ได้** | สืบจาก React Aria `[ทางการ]` |
| **Uber Base Web** | **ได้เฉพาะ `StatefulTooltip`** | `stateful-container.js` กำหนด `onEsc` แล้วส่งเข้า `popoverProps.onEsc` ส่วน `Tooltip` เปล่าส่ง `onEscape: this.props.onEsc` ซึ่งเป็น `undefined` ถ้าไม่ส่งมา `[ทางการ]` |
| **Pinterest Gestalt** | **ไม่ได้** | ส่ง `onDismiss={noop}` เข้า `Controller` และไม่พบตัวฟังปุ่ม `[ทางการ]` |
| **Ant Design** | **ไม่พบกลไก** | ไม่พบการฟัง Escape ในไฟล์ที่อ่าน `[ทางการ]` |
| **Salesforce Lightning** | **ไม่มีในชุดที่เผยแพร่** | เป็น CSS ล้วน `[ทางการ]` |
| **Material 3** | **ไม่เทียบได้ตรง** | เป็นแพลตฟอร์มมือถือ `[ทางการ]` |

**สรุป `[คำนวณ]`** **11 ใน 15 เจ้าปิดด้วย Escape ได้** และ **3 เจ้าทำไม่ได้หรือหากลไกไม่เจอ** คือ Gestalt, Ant และ SLDS และ **1 เจ้าได้เฉพาะรุ่นที่จัดการสถานะเอง** คือ Base Web

**รายละเอียดที่ 3 เจ้าทำเหมือนกันและควรลอก `[ทางการ]`** Carbon และ Spectrum และ Fluent ทั้งสามเจ้า **เรียก `stopPropagation()` หลังจับ Escape** เพื่อไม่ให้เหตุการณ์ไหลต่อไปปิด modal หรือ drawer ที่อยู่ข้างนอกด้วย ซึ่งเป็นบั๊กที่เจอบ่อยเมื่อ tooltip อยู่ในหน้าต่างซ้อน

### 7.4 ตัวกระตุ้นที่เป็นไอคอนอย่างเดียวต้องมีชื่อให้โปรแกรมอ่านหน้าจอยังไง (คำถามข้อ 19)

| เจ้า | ข้อความ |
|---|---|
| **IBM Carbon** | "Every icon-only button needs a tooltip, except for icons with clearly established names or functions (such as Bold and Italics)" และใช้ `label` ที่ส่งต่อเป็น `aria-labelledby` โดย `IconButton` ตั้ง `label` เป็น prop บังคับ (`isRequired`) `[ทางการ]` |
| **GitHub Primer** | ใช้ `type="label"` และโค้ดเตือนเองว่า "Please remove the aria-label from the trigger element" ถ้าตัวกระตุ้นมี `aria-label` อยู่แล้ว เพื่อไม่ให้ชื่อซ้อนกันสองที่ `[ทางการ]` |
| **Microsoft Fluent 2** | `relationship: 'label'` ทำให้ "The tooltip sets the trigger's aria-label or aria-labelledby attribute. This is useful for buttons displaying only an icon, for example" `[ทางการ]` |
| **Pinterest Gestalt** | ให้ใช้ tooltip ที่ติดมากับ `IconButton` และกำหนดว่า `accessibilityLabel` ของปุ่มควรบอกเจตนา เช่น Settings ส่วนข้อความ tooltip ควรขยายความต่อ `[ทางการ]` |
| **Atlassian** | ใช้ tooltip เพื่อ "Provide labels for icon buttons where purpose isn't immediately clear" `[ทางการ]` |
| **Shopify Polaris** | tooltip ควร "Be provided for icon-only buttons or a button with an associated keyboard shortcut" `[ทางการ]` |
| **GitHub Primer (แนวทาง)** | "Never include Tooltips on non-interactive components (div, span, p) because it will not be accessible for keyboard or screen reader users" และ "A Tooltip may only be used on an element that is interactive such as a button or a link. Even if an element is focusable, a Tooltip may only be used if the element does something when it's clicked" `[ทางการ]` |

**สรุปกฎที่ใช้ได้ `[ตีความ]`** ปุ่มไอคอนล้วนต้องมีชื่อ **ที่เดียว ไม่ใช่สองที่** คือเลือกอย่างใดอย่างหนึ่งระหว่าง `aria-label` บนปุ่ม หรือ tooltip ที่ทำหน้าที่ label ถ้าใส่ทั้งสองอย่างด้วยข้อความเดียวกัน โปรแกรมอ่านหน้าจอจะอ่านซ้ำหรืออ่านทับกัน และ **Primer เป็นเจ้าเดียวที่เตือนเรื่องนี้ในโค้ดจริง**

### 7.5 tooltip ที่เนื้อหาซ้ำกับชื่อปุ่มอยู่แล้วควรทำยังไง (คำถามข้อ 20)

| เจ้า | ข้อความ |
|---|---|
| **Atlassian** | "Avoid repetition: Don't repeat information already visible in a label" และยังห้ามใช้กับ "Obvious or redundant information on labeled buttons" `[ทางการ]` |
| **GitHub Primer** | ถ้าเนื้อหา tooltip ปรากฏที่อื่นในหน้าอยู่แล้ว ให้ตัด tooltip ออกไปเลย `[ทางการ]` |
| **Pinterest Gestalt** | ถ้า `accessibilityLabel` ของปุ่มกับข้อความ tooltip เหมือนกัน ให้ตั้ง `accessibilityLabel` ของ Tooltip เป็นสตริงว่าง `[ทางการ]` |
| **Microsoft Fluent 2** | ให้ "Provide additional, not redundant, information" และ `relationship: 'inaccessible'` มีไว้สำหรับกรณีที่ "the tooltip's text is available by some other means" `[ทางการ]` |
| **IBM Carbon** | ยกเว้นไอคอนที่คนรู้จักแล้ว "such as Bold and Italics" ไม่ต้องมี tooltip `[ทางการ]` |
| **Pinterest Gestalt** | ไม่ให้ใช้ tooltip เพื่อ "Restating already-visible text" `[ทางการ]` |

**สรุป `[คำนวณ]`** **6 เจ้าพูดเรื่องนี้ และทุกเจ้าพูดตรงกันว่าอย่าใส่ซ้ำ** ส่วนวิธีจัดการเมื่อหลีกเลี่ยงไม่ได้มี 2 แบบ

1. **ตัด tooltip ออก** (Primer, Atlassian, Carbon)
2. **คงภาพไว้แต่ตัดเสียงออก** คือให้ tooltip แสดงด้วยตาแต่ไม่บอกโปรแกรมอ่านหน้าจอ ซึ่ง **Fluent ทำเป็น API ชัด ๆ ด้วย `relationship: 'inaccessible'`** และ **Gestalt ทำด้วย `accessibilityLabel=""`** วิธีนี้ถูกต้องเพราะข้อความนั้นถูกอ่านไปแล้วจากชื่อปุ่ม

---

## 8. ฉ. การเคลื่อนไหว

| เจ้า | เวลาเข้า | เวลาออก | เส้นโค้ง | ทำอะไร |
|---|---|---|---|---|
| **Uber Base Web** | **20** (`ANIMATE_IN_TIME = 20`) | **0** (`ANIMATE_OUT_TIME = 0`) | ไม่ระบุ | เลือนอย่างเดียว `transitionProperty: 'opacity'` และคอมเมนต์ในไฟล์เขียนว่า "Reset transition property to opacity only, and static transform" `[ทางการ]` |
| **Shopify Polaris** | **50** (`--p-motion-duration-50`) **หน่วงก่อนเริ่ม 100** (`--p-motion-duration-100`) | ไม่พบการเคลื่อนไหวขาออก | `--p-motion-ease-out` | keyframes `appear-above` หรือ `appear-below` ตามด้านที่ไปอยู่ คือเลื่อนบวกเลือน `[ทางการ]` |
| **Ant Design** | **100** (`motionDurationFast` ซึ่งคำนวณจาก `motionBase: 0` บวก `motionUnit: 0.1`) | **100** | ไม่ระบุในไฟล์ที่อ่าน | `zoom-big-fast` คือ `scale(0.8)` กับ `opacity: 0` ไปเป็น `scale(1)` กับ `opacity: 1` และขาออกกลับทาง **เป็นเจ้าที่ย่อมากที่สุด** และ `transform-origin` ตามตำแหน่งหัวลูกศร `[ทางการ]` |
| **GitHub Primer** | **100** (`animation-duration: .1s`) | ไม่มี | `ease-in` | เลือนอย่างเดียว keyframes `0%{opacity:0} to{opacity:1}` และอยู่ใน `@media screen and (prefers-reduced-motion: no-preference)` `[ทางการ]` |
| **Mantine** | **100** (`transitionProps: { duration: 100, transition: "fade" }`) | **100** | ไม่ระบุ | เลือนอย่างเดียว `[ทางการ]` |
| **Chakra UI** | **150** (`animationDuration: 'fast'` ซึ่งคือ `150ms`) | **150** | ไม่ระบุ | `scale-fade-in` คือ `scale-in` (0.95 ไป 1) บวก `fade-in` และขาออกใช้ `scale-fade-out` และใช้ `transformOrigin: var(--transform-origin)` `[ทางการ]` |
| **Adobe Spectrum** | `--spectrum-tooltip-animation-duration: var(--spectrum-animation-duration-100)` **หาค่าตัวเลขจริงไม่เจอในชุด token ที่อ่าน** ส่วนตัวอย่างในหน้า React Aria ใช้ `transition: transform 200ms, opacity 200ms` | เท่ากัน | ไม่ระบุ | เลือนบวกขยับ และ **ข้ามการเคลื่อนไหวทิ้งเมื่อสลับ tooltip ในช่วงที่ยังอุ่น** ผ่าน `shouldSkipAnimation` `[ทางการ]` |
| **Untitled UI** | ใช้ utility `animate-in` ของ Tailwind **ไม่ประกาศตัวเลข** | `animate-out` | `ease-out` เข้า และ `ease-in` ออก | `fade-in` บวก `zoom-in-95` บวก `slide-in-from-*-0.5` (คือ 2 พิกเซล) ตามด้านที่ไปอยู่ และขาออกกลับทางครบทุกอย่าง `[ทางการ]` |
| **Atlassian** | **350** (`duration: 'medium'` ซึ่ง `durations.medium = 350`) | **175** (`EXITING_MOTION_MULTIPLIER = 0.5` คูณ 350) | `ease-in-out` ซึ่งคือ `cubic-bezier(0.15,1,0.3,1)` | `FadeIn` พร้อม `distance: "constant"` และ `entranceDirection` ที่กลับทิศจากตำแหน่ง และ **ตั้ง `duration: 'none'` เมื่อสลับจาก tooltip ตัวอื่นที่เปิดอยู่** `[ทางการ]` |
| **Microsoft Fluent 2** | **ไม่มี** | **ไม่มี** | ไม่มี | สลับ `display: none` กับ `display: block` ตรง ๆ `[ทางการ]` |
| **IBM Carbon** | **ไม่มี** | **ไม่มี** | ไม่มี | ไม่พบ `transition` หรือ `animation` ใน `_popover.scss` `[ทางการ]` |
| **Pinterest Gestalt** | **ไม่มี** | **ไม่มี** | ไม่มี | ไม่พบในไฟล์ที่อ่าน `[ทางการ]` |
| **Salesforce Lightning** | **ไม่มี** | **ไม่มี** | ไม่มี | ไม่พบในไฟล์ CSS `[ทางการ]` |
| **Radix** | ไม่กำหนด | ไม่กำหนด | ไม่กำหนด | ให้ `data-state` กับ `data-side` ไว้ให้เขียน CSS เอง `[ทางการ]` |
| **Material 3** | **หาไม่เจอ** ในซอร์ส Compose ที่อ่าน | **หาไม่เจอ** | **หาไม่เจอ** | **หาไม่เจอ** `[ทางการ]` |

**สรุป `[คำนวณ]`**

- **ค่าเวลาเข้าที่ประกาศจริงคือ** 20, 50, 100, 100, 100, 150, 350 **มัธยฐาน 100** และ **ฐานนิยม 100 (3 เจ้า)**
- **ไม่มีการย่อขยาย 6 เจ้า** แยกเป็น **เลือนล้วน 3 เจ้า** คือ Base Web, Primer และ Mantine และ **เลือนบวกเลื่อน 3 เจ้า** คือ Atlassian, Polaris และ Spectrum
- **ใส่การย่อขยายด้วย 3 เจ้า** คือ Ant (0.8 ไป 1) และ Chakra (0.95 ไป 1) และ Untitled UI (`zoom-in-95`) และ **2 เจ้าไม่กำหนดอะไรมาให้** คือ Radix และ Material
- **ไม่มีการเคลื่อนไหวเลย 4 เจ้า** คือ Fluent, Carbon, Gestalt และ SLDS **ซึ่งรวม 2 เจ้าที่ใหญ่ที่สุดในกลุ่มองค์กร** แปลว่าการไม่มีการเคลื่อนไหวเป็นทางเลือกที่ยอมรับได้ `[ตีความ]`
- **เจ้าเดียวที่ประกาศกฎว่าขาออกต้องเร็วกว่าขาเข้าคือ Atlassian** ด้วยตัวคูณ 0.5 ตายตัวทั้งระบบ ส่วนที่เหลือใช้เวลาเท่ากันทั้งสองทางหรือไม่มีขาออกเลย **ซึ่งต่างจากกรณี toast ที่ทุกเจ้าให้ขาออกเร็วกว่า** เหตุผลที่พออธิบายได้คือ tooltip เล็กและไม่ได้บังอะไร การหายช้าจึงไม่รบกวน `[ตีความ]`
- **6 เจ้าที่มีกลไกเปิดเร็ว ล้วนข้ามการเคลื่อนไหวทิ้งตอนสลับ tooltip** ซึ่ง Spectrum ตั้งชื่อตัวแปรว่า `shouldSkipAnimation` และ Atlassian ส่ง `duration: 'none'` และ Zag ส่ง `data-instant` **เพราะถ้าไม่ข้าม การไล่เมาส์ผ่านแถบปุ่มไอคอน 5 ปุ่มจะเห็นกล่องเลือนเข้าเลือนออก 5 รอบ** `[ตีความ]`
- **2 เจ้าเคารพ `prefers-reduced-motion`** ในไฟล์ที่อ่าน คือ Primer (ครอบ `@media` ไว้ทั้งก้อน) และ Polaris (มีกฎ `animation: none` ซ้อนทับ)
- **ทิศของการเลื่อนมาจากด้านที่ tooltip ไปอยู่ ไม่ใช่ทิศคงที่** ซึ่ง 3 เจ้าทำ คือ Polaris, Atlassian และ Untitled UI และระยะเลื่อนสั้นมาก คือ 2 พิกเซลที่ Untitled UI

---
## 9. ช. บริบทข่าว

### 9.1 สำรวจหน้าแรกของเว็บในเครือ 6 เว็บและเว็บข่าวต่างประเทศ 4 เว็บ `[สำรวจ]`

ดึง HTML ตั้งต้นวันที่ 2026-10-05 ด้วย user agent ของ Chrome บนเดสก์ท็อป แล้วนับจำนวนที่พบ

| เว็บ | ขนาด HTML | `title="..."` | คำว่า `tooltip` | `aria-label` | `aria-describedby` |
|---|---|---|---|---|---|
| bangkokbiznews.com | 328,212 | 17 | **0** | 5 | **0** |
| www.nationtv.tv | 254,488 | 49 | **0** | 51 | **0** |
| www.komchadluek.net | 209,398 | 66 | **0** | 0 | **0** |
| www.thansettakij.com | 228,009 | 33 | **0** | 21 | **0** |
| www.springnews.co.th | 334,134 | 92 | **0** | 203 | **0** |
| www.posttoday.com | 203,844 | 54 | **0** | 33 | **0** |
| www.bbc.com | 641,343 | 0 | **0** | ไม่ได้นับ | **0** |
| www.theguardian.com | 1,441,249 | 36 | **0** | ไม่ได้นับ | 2 (ทั้งคู่เป็นค่าว่างบนช่องค้นหา) |
| www.nytimes.com | 771 | 0 | **0** | ไม่ได้นับ | **0** |
| www.reuters.com | 771 | 0 | **0** | ไม่ได้นับ | **0** |

**หมายเหตุ** nytimes.com และ reuters.com คืนหน้าขนาด 771 ไบต์ แปลว่ากันการดึงอัตโนมัติ ตัวเลขของสองเว็บนี้จึงใช้ยืนยันอะไรไม่ได้

**ข้อค้นพบ 3 ข้อ `[สำรวจ]`**

1. **ไม่พบ tooltip ของระบบดีไซน์แม้แต่ที่เดียวในทั้ง 10 เว็บ** คำว่า `tooltip` ปรากฏ 0 ครั้ง และ `aria-describedby` ที่ชี้ไปที่ของจริงปรากฏ 0 ครั้ง
2. **ที่เจอแทนคือ `title` ของเบราว์เซอร์ 17 ถึง 92 จุดต่อเว็บในเครือ** และตัวอย่างที่ดึงมาดูชัดเจนว่าเป็นการใส่ซ้ำกับ `alt` หรือซ้ำกับข้อความในลิงก์ เช่น springnews มี `<a href="#" tabindex="-1" title="เลื่อนงาน EGAT Earth Mini Trail">` คู่กับ `<img ... alt="เลื่อนงาน EGAT Earth Mini Trail" title="เลื่อนงาน EGAT Earth Mini Trail">` และ bangkokbiznews มี `<a ... aria-label="social" title="social">` ซึ่ง **ชื่อว่า social ทั้งที่ลิงก์ชี้ไป Facebook หรือ X หรือ LINE คนละที่กัน**
3. **komchadluek ใส่ `title` 66 จุดโดยไม่มี `aria-label` เลยแม้แต่จุดเดียว** แปลว่าเว็บนั้นพึ่ง `title` เป็นกลไกเดียวในการให้ชื่อ

### 9.2 ทำไม `title` ของเบราว์เซอร์ใช้แทน tooltip ไม่ได้ `[ตีความ]`

เทียบกับข้อ 1.4.13 ทั้ง 3 ข้อย่อย

| ข้อย่อย | `title` ของเบราว์เซอร์ทำได้ไหม |
|---|---|
| Dismissible | **ไม่ได้** กด Escape ไม่ปิด และไม่มีกลไกใดปิดได้นอกจากขยับเมาส์ |
| Hoverable | **ไม่ได้** ย้ายเมาส์เข้าไปในกล่องแล้วหายทันที เพราะกล่องนั้นวาดโดยระบบปฏิบัติการ ไม่ได้อยู่ใน DOM |
| Persistent | **ไม่ได้** เบราว์เซอร์หลายตัวซ่อนเองหลังไม่กี่วินาที |

**และปัญหาที่หนักกว่านั้นอีก 3 ข้อ**

- **ไม่โผล่บนจอสัมผัสเลย** ซึ่งคือช่องทางหลักของเว็บข่าวเรา (มือถือเกิน 70 เปอร์เซ็นต์)
- **ไม่โผล่เมื่อโฟกัสด้วยคีย์บอร์ด** โผล่เฉพาะเมื่อชี้ด้วยเมาส์
- **จัดแต่งไม่ได้เลย** ขนาด สี ฟอนต์ ตำแหน่ง ขึ้นกับระบบปฏิบัติการของผู้ใช้ และบนจอความละเอียดสูงจะเล็กมาก

**แปลว่าถ้าเราทำ tooltip เป็น component ขึ้นมาจริง มันจะเป็น component ที่ "แทนที่ `title` ที่ใส่ผิดอยู่ 300 กว่าจุดในเว็บเครือ" ไม่ใช่ component ที่เพิ่มของใหม่ `[ตีความ]`** ซึ่ง **ตรงกับที่ Ant Design เขียนไว้พอดี** ว่า tooltip "It's often used instead of the HTML title attribute"

### 9.3 เว็บข่าวใหญ่ใช้ tooltip ทำอะไรบ้าง และบนมือถือยังมีประโยชน์ไหม `[ตีความ]`

**หน้าอ่านข่าวไม่ใช่ที่ของ tooltip** เหตุผล 4 ข้อจากหลักฐานข้างบน

1. **ไม่พบการใช้งานจริงในทั้ง 10 เว็บที่สำรวจ** ซึ่งไม่ได้แปลว่าไม่มีใครเคยทำ แต่แปลว่าไม่ใช่แบบแผนที่ใช้กันในหน้าแรก
2. **หน้าอ่านข่าวไม่มีปุ่มไอคอนล้วนที่ความหมายไม่ชัด** ซึ่งคือเหตุผลหลักที่ทุกเจ้าในตลาดยกมาสนับสนุน tooltip สิ่งที่หน้าข่าวมีคือหัวข้อ รูป ลิงก์หมวด ปุ่มแชร์ (ที่มีโลโก้แพลตฟอร์มซึ่งคนรู้จักหมดแล้ว) และปุ่มเล่นวิดีโอ
3. **ช่องทางหลักคือมือถือ** และตลาดฝั่งเว็บเลือก**ซ่อน** tooltip บนจอสัมผัส 6 ใน 15 เจ้า ไม่มีใครเลือกวิธีกดค้างบนเว็บ
4. **ข้อมูลที่ผู้อ่านข่าวต้องรู้ ต้องอยู่ในหน้าเสมอ** เช่น เวลาเผยแพร่ ชื่อผู้เขียน เวลาอ่าน ซึ่งเราทำเป็น `meta/*` preset อยู่แล้ว ตามกฎของ Primer ว่า "Persist the content so it's always available"

**ที่ของ tooltip ในองค์กรเราคือหลังบ้าน `[ตีความ]`** คือ CMS ที่กองบรรณาธิการใช้ แดชบอร์ด หน้าตั้งค่า และเครื่องมือภายใน ซึ่งเป็นที่ที่

- **คนทำงานใช้เมาส์และคีย์บอร์ดจริง** จอสัมผัสเป็นข้อยกเว้นไม่ใช่ค่าเริ่มต้น
- **มีแถบเครื่องมือที่เต็มไปด้วยปุ่มไอคอนล้วน** ซึ่งคือกรณีใช้งานที่ทุกเจ้ายอมรับ
- **มีปุ่มลัดที่ควรบอก** ซึ่ง Atlassian รองรับเป็น prop `shortcut` ที่รับ array ของปุ่มแล้วแสดงเป็นแป้นแยกชิ้น และ Primer รองรับเป็น `keybindingHint` พร้อมใส่ข้อความสำหรับโปรแกรมอ่านหน้าจอในวงเล็บ

**สิ่งที่ควรแนะนำให้ใช้แทน tooltip บนหน้าอ่านข่าว 3 อย่าง `[ตีความ]`**

| สถานการณ์ | ใช้อะไรแทน | ของที่เรามีอยู่แล้ว |
|---|---|---|
| ต้องอธิบายศัพท์เศรษฐกิจในเนื้อข่าว (กรุงเทพธุรกิจ ฐานเศรษฐกิจ โพสต์ทูเดย์) | **ปุ่มช่วยเหลือที่กระตุ้นด้วยการคลิก** แบบ `HelpButton` ของ Gestalt ไม่ใช่ tooltip เพราะเนื้อหามักมีลิงก์ไปหน้าอธิบายเต็ม | ยังไม่มี ต้องตัดสินว่าจะทำไหม |
| ต้องบอกว่าตัวเลขในกราฟหมายถึงอะไร | **tooltip ของตัวกราฟเอง** ซึ่งเป็นคนละเรื่องกับ tooltip ของ DS เพราะเกาะจุดข้อมูลและต้องทำงานบนการแตะ | ยังไม่มี และไม่ควรเอามารวมในหน้า 20 |
| ต้องบอกชื่อปุ่มแชร์หรือปุ่มบันทึก | **ข้อความใต้ไอคอน หรือ `aria-label` ที่เขียนถูก** | `aria-label` มีใช้แล้วแต่เขียนผิดหลายจุด เช่น `aria-label="social"` ที่ bangkokbiznews |

---

## 10. ตารางเทียบรวม 15 เจ้า

### 10.1 ตัวกระตุ้น จังหวะ และการเข้าถึง

| เจ้า | หน่วงเข้า | หน่วงออก | โฟกัสเปิดไว้ | จอสัมผัส | Escape | Hoverable | เปิดเร็วเมื่ออุ่น |
|---|---|---|---|---|---|---|---|
| Material 3 | 0 ชี้ และ 500 กดค้าง | หายเอง 1500 | ใช่ | กดค้าง | ไม่เทียบได้ | ไม่เทียบได้ | ไม่พบ |
| IBM Carbon | 100 | 300 | ใช่ | ไม่จัดการ | ได้ | ผ่าน | ไม่พบ |
| Shopify Polaris | 0 | 150 | ใช่ | อ้างว่ารองรับ | ได้ | ผ่าน | ไม่พบ |
| Adobe Spectrum | **1500** | 500 | ใช่ เฉพาะ focus-visible | **ซ่อน** | ได้ | **ผ่าน ดีที่สุด** | **ใช่** |
| Atlassian | 300 | 300 | ใช่ | ไม่จัดการ | ได้ | ผ่าน | **ใช่** |
| Ant Design | 100 | 100 | **ไม่** | ไม่จัดการ | **ไม่พบ** | ผ่าน | ไม่พบ |
| GitHub Primer | 50 | 0 | ใช่ เฉพาะ focus-visible | **ซ่อน** | ได้ | ผ่าน | ไม่พบ |
| Microsoft Fluent 2 | 250 | 250 | ใช่ | ไม่จัดการ | ได้ | ผ่าน | **ใช่** |
| Salesforce Lightning | หาไม่เจอ | หาไม่เจอ | ใช่ | อ้างว่ารองรับ | **ไม่มี** | **ไม่มี** | ไม่พบ |
| Uber Base Web | 200 | 200 | ใช่ | ไม่จัดการ | เฉพาะ Stateful | ผ่าน | ไม่พบ |
| Pinterest Gestalt | 0 | 0 และ 100 เมื่อมี link | ใช่ | ไม่จัดการ | **ไม่ได้** | **ตก** | ไม่พบ |
| Untitled UI | 300 | 0 | ใช่ | **ซ่อน** | ได้ | ผ่าน | ใช่ |
| Radix | **700** | 0 | ใช่ | **ซ่อน** | ได้ | **ผ่าน** | **ใช่ skip 300** |
| Mantine | 0 | 0 | **ไม่** | **ซ่อน** | ได้ | **ตก** | **ใช่ ใน group** |
| Chakra กับ Zag | 400 | 150 | ใช่ | **ซ่อน** | ได้ | **ตก** | **ใช่** |

### 10.2 รูปร่าง ขนาด และตำแหน่ง

| เจ้า | ทรง | ความกว้างสูงสุด | ระยะขอบ | มุมโค้ง | ขนาดตัวหนังสือ | ลูกศร | จำนวนตำแหน่ง | เงา | สองชั้น | แกนขนาด |
|---|---|---|---|---|---|---|---|---|---|---|
| Material 3 plain | เข้ม | 200 | 8 คูณ 4 | 4 | 12 บน 16 | 16 คูณ 8 ต้องส่งค่า | เหนือเป็นหลัก | **ไม่มี** | ไม่ | **ไม่มี** |
| Material 3 rich | **สว่าง** | 320 | ไม่พบ | 12 | หัวข้อ 14 บน 20 | ไม่พบ | ล่างขวาเป็นหลัก | level2 คือ 3 | **ใช่** | **ไม่มี** |
| IBM Carbon | เข้ม | 288 | 16 ทุกด้าน | 2 หรือ `border-radius-04` | `body-01` | 12 คูณ 6 เสมอ | **12** | ปิดไว้ | ไม่ | **ไม่มี** |
| Shopify Polaris | **สว่าง** | 200 และ 275 | 4 คูณ 8 หรือ 16 | `radius-200` | ตามระบบ | มีเสมอ | 4 คูณ 3 | ขอบนูน | ไม่ | **2 ความกว้าง** |
| Adobe Spectrum | เข้ม บวก 3 สีสถานะ | **160** และ 200 มือถือ | 9 แนวนอน และ 4 ถึง 5 แนวตั้ง | 4 | 12 และ 15 มือถือ | 10 คูณ 5 เสมอ | **22** | **ไม่มี** | ไม่ | **ไม่มี** (แยก desktop กับ mobile) |
| Atlassian | เข้ม | **420** | 6 แนวนอน และ 4 แนวตั้ง | 3 | 12 บน 16 | **ไม่มีเลย** | 12 บวก 3 แบบตามเมาส์ | **ไม่มี** | ไม่ | **ไม่มี** |
| Ant Design | เข้ม 85 เปอร์เซ็นต์ | 250 | 8 แนวนอน และ `paddingSM / 2` แนวตั้ง | `borderRadius` | ตามระบบ | 16 คูณ 8 เปิดไว้ | **12** | 3 ชั้น | ไม่ | **ไม่มี** |
| GitHub Primer | เข้ม | 250 | 8 แนวนอน และ 4 แนวตั้ง | 6 | 12 บน 1.625 | **ไม่มีเลย** | **8** | **ไม่มี** | ไม่ | **ไม่มี** |
| Microsoft Fluent 2 | **สว่าง มีเส้นขอบ** | 240 | 11 แนวนอน และ 4 บน 6 ล่าง | 4 | `fontSizeBase200` | สูง 6 ปิดไว้ | **12** | **2 ชั้น** | ไม่ | **ไม่มี** |
| Salesforce Lightning | เข้ม น้ำเงิน | 320 และ **160 เมื่อจอแคบ** | 8 แนวตั้ง และ 12 แนวนอน | 4 | 12 | 16 คูณ 16 หมุน 45 องศา | **12** บวก 8 แบบมุม | 0 2px 3px 16 เปอร์เซ็นต์ | ไม่ | **ไม่มี** |
| Uber Base Web | เข้ม | ไม่กำหนด | 8 แนวตั้ง และ 16 แนวนอน | 8 | 12 บน 16 น้ำหนัก 500 | 9 คูณ 9 ปิดไว้ | **13 มี auto** | shadow400 | ไม่ | **ไม่มี** |
| Pinterest Gestalt | เข้ม | **180** | 8 ทุกด้าน | 8 | 12 | **ไม่มีเลย** | **4** | รอบด้าน 8 | ครึ่งทาง | **ไม่มี** |
| Untitled UI | เข้ม | 320 | 12 แนวนอน และ 12 หรือ 8 แนวตั้ง | 8 | 12 ทั้งสองชั้น | 10 ปิดไว้ | 8 | `shadow-lg` | **ใช่** | **ไม่มี** (แยกตามมี description) |
| Radix | ไม่กำหนด | ไม่กำหนด | ไม่กำหนด | ไม่กำหนด | ไม่กำหนด | ต้องใส่เอง | **12** | ไม่กำหนด | ไม่ | **ไม่มี** |
| Mantine | เข้ม กลับขั้วในธีมมืด | ไม่กำหนด บรรทัดเดียว | `spacing-xs / 2` แนวตั้ง และ `spacing-xs` แนวนอน | `radius-default` | `font-size-sm` | **4** ปิดไว้ | **12** | **ไม่มี** | ไม่ | **ไม่มี** |
| Chakra กับ Zag | เข้ม | 320 | 10 แนวนอน และ 4 แนวตั้ง | 4 | 12 บน 16 | 8 ต้องใส่เอง | **12** | `shadow-md` | ไม่ | **ไม่มี** |
| **ของเรา** | **สว่าง ไม่มีเส้นขอบ** | 320 ที่ `Text area` | 8 หรือ 12 | 8 | 12 บน 18 | **8 คูณ 4** | 7 หรือ 9 ปนกับเรื่องลูกศร | `0 0 4px 5%` | **ใช่** | **ไม่มี** |

---

## 11. จุดที่เจ้าต่าง ๆ เห็นไม่ตรงกัน

| เรื่อง | ฝั่งหนึ่ง | ฝั่งตรงข้าม | ใครน่าเชื่อกว่าและทำไม `[ตีความ]` |
|---|---|---|---|
| **หน่วงเวลาก่อนโผล่** | 0 ถึง 100 (Polaris, Gestalt, Mantine, Primer, Carbon, Ant) | 300 ถึง 1500 (Atlassian, Untitled UI, Zag, Radix, Spectrum) | **ฝั่งกลาง 200 ถึง 400 น่าเชื่อกว่า** ฝั่ง 0 ทำให้กล่องโผล่เรี่ยราดตอนลากเมาส์ผ่าน และฝั่ง 700 ถึง 1500 ทำให้คนเลิกรอก่อนเห็น ซึ่ง Spectrum เองก็เขียนในโค้ดว่ายังไม่ได้ยืนยันกับทีมออกแบบ |
| **ทรงพื้นเข้มหรือพื้นสว่าง** | พื้นเข้ม 12 เจ้า | พื้นสว่าง 2 เจ้า คือ Fluent กับ Polaris | **พื้นเข้มน่าเชื่อกว่าเพราะเสียงข้างมากชัดและมีเหตุผลเชิงกลไก** แต่ **ไม่ใช่ข้อที่ตัดสินแทนคนได้** เพราะอาจขัดกับทิศทางของแบรนด์ |
| **ลูกศรเปิดหรือปิด** | เปิดไว้ 6 เจ้า | ปิดไว้หรือไม่มีเลย 9 เจ้า | **ฝั่งไม่มีลูกศรแข็งแรงกว่าที่คิด** เพราะมี 3 เจ้าใหญ่ที่ตัดทิ้งทั้งกลไก (Atlassian, Primer, Gestalt) และเหตุผลที่พออธิบายได้คือ tooltip อยู่ใกล้ตัวกระตุ้นมากพอจนไม่ต้องชี้ |
| **ซ่อนบนจอสัมผัสหรือแปลงเป็นกดค้าง** | ซ่อน 6 เจ้า | กดค้าง 1 เจ้า คือ Material | **ซ่อนน่าเชื่อกว่าบนเว็บ** เพราะท่ากดค้างบนเว็บไม่มีใครรู้จักและชนกับเมนูบริบท ส่วน Material ทำได้เพราะอยู่บนระบบปฏิบัติการที่มีท่านี้เป็นมาตรฐาน |
| **หายเองหรือไม่หายเอง** | หายเองที่ 1500 ถึง 15000 (Material ทั้งสองฝั่ง) | ไม่หายเองจนกว่าจะเลิกชี้ (14 เจ้าฝั่งเว็บ) | **ฝั่งไม่หายเองถูกตามมาตรฐาน** เพราะข้อ Persistent บอกว่าต้องอยู่ "until the hover or focus trigger is removed" การหายเองขณะยังชี้อยู่คือการตกข้อนี้ |
| **ความกว้างบนมือถือ โตขึ้นหรือหดลง** | โตขึ้น คือ Spectrum (160 เป็น 200) | หดลง คือ SLDS (320 เป็น 160) | **ทั้งสองทางมีเหตุผลและไม่ขัดกัน** Spectrum โตเพราะตัวหนังสือโตขึ้นด้วย (12 เป็น 15) ส่วน SLDS หดเพราะกันไม่ให้กินจอ **ประเด็นจริงคือทั้งคู่ยอมรับว่าค่ามือถือต้องต่างจากเดสก์ท็อป** |
| **จำนวนตำแหน่ง 4 หรือ 12** | 4 คือ Gestalt และ Polaris (ในมิติแนวตั้ง) | 12 คือ 7 เจ้า | **4 น่าเชื่อสำหรับไฟล์ออกแบบ และ 12 น่าเชื่อสำหรับโค้ด** เพราะในโค้ดกลไกพลิกจัดการให้เอง ส่วนในไฟล์ออกแบบต้องวาดทุกค่า ซึ่ง 12 ค่าคูณกับแกนอื่นจะระเบิด |
| **ชื่อตำแหน่ง start กับ end หรือ left กับ right** | start กับ end 7 เจ้า | left กับ right 3 เจ้า | **start กับ end ชนะ และ Carbon ประกาศเลิกใช้ left กับ right ไปแล้ว** ซึ่งเป็นสัญญาณที่หนักแน่นที่สุด |
| **tooltip ใส่ลิงก์ได้ไหม** | ไม่ได้ 5 เจ้าประกาศห้าม บวก W3C | ได้ 1 เจ้า คือ Material rich tooltip | **ฝั่งห้ามชนะขาด** และ **Gestalt เป็นหลักฐานที่ดีที่สุด** เพราะเคยทำแล้วถอน พร้อมเขียนเหตุผลว่าเข้าถึงไม่ได้ |
| **มีการเคลื่อนไหวหรือไม่มี** | มี 9 เจ้า | ไม่มี 4 เจ้า รวม Fluent กับ Carbon และ 2 เจ้าไม่กำหนด | **มีน่าเชื่อกว่า แต่ไม่สำคัญ** เพราะ 2 เจ้าใหญ่ที่สุดไม่มีเลยและไม่มีใครบ่น ถ้าจะทำควรสั้นมาก คือ 100 |

---

## 12. สิ่งที่ยืนยันไม่ได้ในรอบนี้

| เรื่อง | เหตุผล |
|---|---|
| **หน้าเอกสาร Material 3 ที่ m3.material.io** | ประกอบด้วยสคริปต์ ดึงเนื้อหาไม่ได้ ตัวเลขของ Material ในเอกสารนี้จึงมาจากไฟล์ token ของ `@material/web` และซอร์ส Kotlin ของ Compose Material3 กับ Compose Foundation และ AppCompat กับ Material Components Android เท่านั้น **ข้อความเชิงแนวทาง เช่น ระยะห่าง 4dp กับ 8dp และ "disappear 1.5 seconds after navigating away" ที่เครื่องมือค้นหาสรุปมา ผู้วิจัยไม่ยืนยัน เพราะเปิดหน้าต้นทางตรวจเองไม่ได้** |
| **ค่าตัวเลขของ `--spectrum-animation-duration-100`** | ไม่พบใน `@adobe/spectrum-tokens@15.5.0` ที่ดาวน์โหลดมา จึงบอกได้แค่ว่า tooltip ชี้ไป token ตัวนี้ **แต่บอกเป็นมิลลิวินาทีไม่ได้** |
| **เวลาและเส้นโค้งการเคลื่อนไหวของ Material 3 tooltip** | ไม่พบใน `Tooltip.kt` และ `BasicTooltip.kt` ที่อ่าน **หาไม่เจอ** |
| **`role` และ `aria-*` ของ Ant Design tooltip** | ไฟล์ `es/tooltip/index.js` ไม่ได้ตั้งค่าเหล่านี้ และแพ็กเกจ `@rc-component/tooltip` ที่เป็นชั้นใต้แตกไฟล์ไม่สำเร็จในรอบนี้ **ยืนยันไม่ได้** |
| **หน่วงเวลาและกลไกการเข้าถึงของ Salesforce Lightning** | ชุดที่เผยแพร่บน npm เป็น CSS ล้วน ไม่มีตัวจับเวลาหรือตัวจัดการปุ่ม ต้องเขียนเองทั้งหมด |
| **ขนาดลูกศรของ Polaris เป็นตัวเลข** | เป็น SVG ที่ฝังอยู่ในโค้ด ไม่ได้ประกาศเป็น token |
| **จำนวนแบบของ Untitled UI ฝั่ง Figma** | หน้าเว็บระบุ "2 components + 84 variants" และ "seven arrow options: none, top center, bottom center, bottom left, bottom right, left, and right" แต่ **ไม่ได้เปิดไฟล์ Figma ของเขาตรวจเอง** |
| **การสำรวจ nytimes.com และ reuters.com** | คืนหน้า 771 ไบต์ แปลว่ากันการดึงอัตโนมัติ ใช้ยืนยันอะไรไม่ได้ |
| **tooltip ในหน้าข่าวชั้นลึก** | สำรวจเฉพาะหน้าแรกของแต่ละเว็บ ไม่ได้ไล่หน้าบทความ หน้าอินโฟกราฟิก หรือหน้าหุ้นที่อาจมี tooltip ของกราฟ |
| **หลังบ้านของเราเอง** | ไม่ได้เข้าไปดู CMS หรือเครื่องมือภายในว่าใช้ tooltip อยู่แล้วแบบไหน ซึ่งเป็นข้อมูลที่จำเป็นที่สุดสำหรับตัดสินเรื่องความกว้างกับหน่วงเวลา |

---
## 13. ข้อเสนอสำหรับ Nation DS

> ทุกข้อในหัวข้อนี้เป็น `[ตีความ]` ของผู้วิจัยจากหลักฐานข้างบน **รอ user ตัดสิน ยังไม่ได้แก้ไฟล์ใด ไม่ได้แตะ Figma และไม่ได้แตะ token**
> แต่ละข้อมี **เสียงข้างมากของตลาด** กำกับ เพื่อให้เห็นว่าข้อไหนมีฉันทามติและข้อไหนต้องให้คนตัดสิน

### 13.1 คำตอบตรงคำถาม ของเดิม 4 ชุด 78 แบบ ควรเหลือกี่ชุด

**คำตอบคือ เหลือ 1 COMPONENT_SET ที่มี 8 แบบ บวก 1 component เดี่ยวสำหรับหัวลูกศร**

| ชุดเดิม | แบบ | ข้อเสนอ | เหตุผลจากตลาด |
|---|---|---|---|
| **`Help icon` 28 แบบ** | 28 | **ย้ายออกจากหน้า 20 ไปทำเป็นภาพในเอกสาร หรือทำเป็น component ชื่อ `help-button` ในหน้าปุ่ม** ไม่ใช่ component ของหน้า tooltip | **15 ใน 15 เจ้าแยกตัวกระตุ้นออกจาก tooltip** และ **2 เจ้าที่ทำชิ้นรวมตั้งชื่อตามตัวกระตุ้น** คือ `IconButton` ของ Carbon และ `HelpButton` ของ Gestalt ไม่ได้ตั้งชื่อตาม tooltip และ Gestalt ยังเขียนไว้ว่าให้ใช้ tooltip ที่ติดมากับ IconButton แทนการประกอบเอง |
| **`Title` 18 แบบ** | 18 | **รวมเข้าชุดเดียวกับ `Text area`** เป็นแกน `supporting-text` 2 ค่า | **Untitled UI ซึ่งเป็นต้นแบบของชุดนี้ทำเป็น prop `description` ตัวเดียวในชิ้นเดียว** ไม่ได้แยก component และ **13 ใน 15 เจ้าไม่แยกชั้นหัวข้อกับข้อความรองเลย** ส่วน Material ที่แยกก็แยกเป็นคนละ component คนละชื่อ (plain กับ rich) ไม่ใช่สองชุดที่หน้าตาเหมือนกัน |
| **`Text area` 18 แบบ** | 18 | **เป็นฐานของชุดใหม่** | ตามข้อบน |
| **`Avartar` 14 แบบ** | 14 | **ตัดออกจากหน้า 20** ไปเป็นตัวอย่างการใช้งานในหน้า Avatar หรือทำเป็น component แยกชื่อ `avatar-label` ถ้ายังต้องใช้ | **0 ใน 15 เจ้ามี tooltip ที่มีรูปคนอยู่ข้างใน** และ **Atlassian ห้ามตรง ๆ** ว่า "visual elements like icons or images should be avoided as they can introduce clutter, hurt performance, obscure content, and increase cognitive load" และกล่องทรงแคปซูลที่มีอวาตาร์กับชื่อ **ไม่ใช่ tooltip แต่เป็นป้ายชื่อ** ที่ของเรามีอยู่แล้วในหน้า Tags กับหน้า Avatar |

**โครงที่เสนอ**

| ชื่อ | ชนิด | แกน | จำนวนแบบ |
|---|---|---|---|
| `tooltip` | COMPONENT_SET | `supporting-text` (`false`, `true`) คูณ `placement` (`top`, `bottom`, `left`, `right`) | **8** |
| `tooltip-arrow` | COMPONENT เดี่ยว | ไม่มีแกน หมุนด้วย `rotation` ตามด้าน | **1** |

**จาก 78 แบบเหลือ 9 แบบ ลดลง 88 เปอร์เซ็นต์**

### 13.2 คำตอบตรงคำถาม ตัวกระตุ้นควรอยู่ในชุดเดียวกับคำใบ้หรือแยกออกมา

**คำตอบคือ แยกออกมา และเหตุผลจากตลาดมี 4 ข้อ**

1. **15 ใน 15 เจ้าแยก** ไม่มีเจ้าไหนที่ component ชื่อ Tooltip วาดไอคอนตัวกระตุ้นเอง ทุกเจ้ารับตัวกระตุ้นเข้ามาเป็นลูก `[คำนวณ]`
2. **ตัวกระตุ้นของ tooltip คือ "อะไรก็ได้ที่กดได้"** ไม่ใช่แค่ไอคอนเครื่องหมายคำถาม Primer เขียนไว้ว่า "A Tooltip may only be used on an element that is interactive such as a button or a link" ถ้าเราผูกไอคอนช่วยเหลือติดไว้ในชุด ก็จะใช้กับปุ่มไอคอนอื่นไม่ได้ ซึ่งคือกรณีใช้งานที่ใหญ่ที่สุดของ tooltip `[ทางการ]`
3. **ชุดที่รวมไว้จะระเบิดจำนวนแบบทันที** ของเดิม `Help icon` 28 แบบคือ 2 คูณ 2 คูณ 7 ถ้าเพิ่มตัวกระตุ้นอีก 3 ชนิด (ไอคอน ปุ่ม ลิงก์) จะเป็น 84 แบบ ซึ่งเป็นปัญหาเดียวกับที่เจอตอนขยายชุด variant หลายขนาด `[ตีความ]`
4. **ชิ้นที่รวมไอคอนกับคำใบ้ไว้ด้วยกันในตลาด ใช้ popover ไม่ใช่ tooltip** เพราะกล่องช่วยเหลือมักมีลิงก์ไปหน้าอธิบาย ซึ่ง `HelpButton` ของ Gestalt ใช้ `InternalPopover` และ `Tooltip` คู่กัน `[ทางการ]`

**แปลว่าถ้าเราต้องการชุด "ไอคอนช่วยเหลือ" จริง มันเป็นงานอีกใบ และต้องตัดสินก่อนว่าเนื้อหาจะมีลิงก์ไหม ถ้ามีลิงก์ก็ไม่ใช่ tooltip ตั้งแต่ต้น**

### 13.3 แกนและชื่อ

| # | ข้อเสนอ | เสียงข้างมากของตลาด | เหตุผล |
|---|---|---|---|
| 1 | **เปลี่ยนชื่อแกนตำแหน่งเป็น `placement` ให้เหมือนกันทั้งชุด** เลิกใช้ทั้ง `Tooltip` และ `Arrow` | **`placement` 5 ใน 15 เจ้า** และรองลงมาคือ `position` 3 เจ้า **ส่วน `arrow` ไม่มีเจ้าไหนใช้เรียกตำแหน่ง** 15 ใน 15 เจ้าใช้ `arrow` เรียกการเปิดปิดหัวลูกศรเท่านั้น | ชื่อ `Arrow` ที่เราใช้เรียกตำแหน่งขัดกับตลาดทั้งตลาด และทำให้คนที่มาจากโค้ดหาไม่เจอ |
| 2 | **แยกเรื่องลูกศรออกจากแกนตำแหน่ง** เลิกใช้ค่า `Top no arrow` และ `None` | **15 ใน 15 เจ้าแยกเป็น 2 prop** และ 5 เจ้าที่ให้ปิดลูกศรได้ใช้ชื่อ `arrow` หรือ `withArrow` หรือ `showArrow` ทั้งหมด | ค่า `Top no arrow` ยัดสองเรื่องไว้ในค่าเดียว ทำให้เลือก "ล่าง ไม่มีลูกศร" ไม่ได้ |
| 3 | **ไม่ทำลูกศรเป็นแกนในชุด แต่ทำเป็น component เดี่ยวชื่อ `tooltip-arrow` แล้วให้คนวางเอง** | **3 เจ้าตัดลูกศรทิ้งทั้งกลไก** (Atlassian, Primer, Gestalt) และ **2 เจ้าให้ใส่เป็น element แยก** (Radix, Chakra) | ถ้าทำลูกศรเป็นแกน จำนวนแบบจะคูณ 4 ถึง 12 ทันที ส่วนในโค้ดกลไกพลิกจัดการตำแหน่งลูกศรให้เองอยู่แล้ว |
| 4 | **ใช้ชื่อค่าตำแหน่งแบบ `top` และ `top-start` และ `top-end` ถ้าวันหน้าต้องเพิ่มค่าชิดขอบ** ห้ามใช้ `Top left` หรือ `Top right` | **7 ใน 15 เจ้าใช้แบบ start กับ end** และ **Carbon ประกาศ `@deprecated` ให้ชุด `top-left` พร้อมข้อความ "Use NewPopoverAlignment instead"** | นี่คือสัญญาณที่หนักแน่นที่สุดในเอกสารนี้ เพราะเป็นเจ้าที่เคยใช้แบบเก่าแล้วเปลี่ยนเอง |
| 5 | **ชื่อตำแหน่งต้องหมายถึงที่ที่ tooltip ไปอยู่ ไม่ใช่ทิศที่ลูกศรชี้** | **15 ใน 15 เจ้า** | ของเดิมค่า `Bottom center` หมายถึงลูกศรอยู่ล่าง ซึ่งแปลว่า tooltip อยู่เหนือ กลับทางกับทุกเจ้าในตลาด และจะทำให้ส่งต่อให้ developer ผิด |
| 6 | **ตั้งชื่อ COMPONENT_SET ว่า `tooltip` และแก้ `Avartar` เป็น `avatar`** | ตามกฎของเราเองที่ตั้งไว้ 2026-09-02 ว่าชื่อ COMPONENT ต้องลงท้ายด้วยชนิด | `Title` และ `Text area` และ `Help icon` และ `Avartar` ไม่บอกว่าเป็นอะไรเลยเวลาเห็นในแผง Assets |

### 13.4 ตำแหน่งและจำนวนค่า

| # | ข้อเสนอ | เสียงข้างมากของตลาด | เหตุผล |
|---|---|---|---|
| 7 | **ทำ 4 ค่าในไฟล์ออกแบบ คือ `top`, `bottom`, `left`, `right` และเขียนในเอกสารว่าโค้ดมี 12 ค่า** | **12 ค่าคือฐานนิยมของโค้ด 7 เจ้า แต่ 4 ค่าคือสิ่งที่ Gestalt ทำในระดับ API** และ Polaris ก็ใช้แค่ `above` กับ `below` ในมิติหลัก | ในโค้ดกลไกพลิกเลือกค่าให้เอง นักออกแบบไม่ได้เลือกทีละค่า การวาดครบ 12 ค่าคือการวาดของที่ไม่มีใครเลือก **และถ้าวันหน้าต้องเพิ่มเป็น 12 ให้เพิ่มทีหลังได้โดยไม่ต้องรื้อ** เพราะชื่อค่าเดิม 4 ตัวยังอยู่ |
| 8 | **เขียนลำดับการพลิก 3 ขั้นลงใน Information Document** คือ เลื่อนก่อน แล้วพลิกด้านตรงข้าม แล้วเลือกด้านที่ล้นน้อยที่สุด | **เป็นค่าเริ่มต้นของ `flip` และ `shift` ของ Floating UI ซึ่งเป็นชั้นใต้ของ 5 เจ้า** คือ Radix, Mantine, Chakra กับ Zag, Fluent และ Carbon (ตัวทดลอง) | นี่คือส่วนที่นักออกแบบต้องรู้แต่ไม่ต้องวาด และเป็นคำตอบของคำถามที่ developer จะถามแน่ ๆ ว่า "ถ้าชนขอบจอแล้วยังไง" |
| 9 | **เขียนกำกับว่า tooltip ที่ตั้งไว้ว่าอยู่บน จะพลิกได้แค่บนกับล่าง ไม่กระโดดไปซ้ายขวาเอง** | **เป็นค่าเริ่มต้น `fallbackAxisSideDirection: 'none'` ของ Floating UI** | เป็นการตั้งใจของตลาด เพื่อให้ตำแหน่งเดาได้ ไม่ใช่ข้อจำกัดทางเทคนิค |
| 10 | **ระยะห่างจากตัวกระตุ้น ใช้ 6 ถึง 8** | ค่าที่พบคือ Untitled UI 6 และ Mantine 5 บวกครึ่งลูกศร และ Material `SpacingBetweenTooltipAndAnchor` 4 และ Fluent 4 และ Base Web `POPOVER_MARGIN` 8 และ Carbon `popover-offset` 8 สำหรับ icon-tooltip และ Polaris `space-300` คือ 12 | มัธยฐานอยู่ที่ 6 และค่าของเราปัจจุบันอ่านตรง ๆ ไม่ได้เพราะลูกศรฝังอยู่ในเฟรม `Tooltip` ที่ติดกับกล่อง |

### 13.5 รูปร่างและขนาด

| # | ข้อเสนอ | เสียงข้างมากของตลาด | เหตุผล |
|---|---|---|---|
| 11 | **ไม่ทำแกนขนาด** ให้ `supporting-text` 2 ค่าทำหน้าที่แทน | **0 ใน 15 เจ้ามีแกนขนาด** และ 5 เจ้าที่มีมากกว่า 1 ขนาดใช้วิธีอื่น คือ แยก component หรือแยกตามอุปกรณ์ หรือแยก 2 ความกว้าง | tooltip ไม่มีอะไรให้สเกล มันไม่ได้อยู่ข้างปุ่มที่ต้องสูงเท่ากัน **ข้อนี้ขัดกับธรรมเนียม 5 ขั้นของระบบเรา จึงต้องให้คนตัดสิน** (ดู 13.9) |
| 12 | **เลิกทำแกน `Dark Mode`** | ไม่มีเจ้าไหนทำโหมดมืดเป็นแกนของชิ้นงาน **15 ใน 15 เจ้าใช้ token ที่พลิกค่าตามโหมด** และ Base Web เป็นตัวอย่างที่ชัดที่สุด คือ `tooltipBackground` ชี้ไป `backgroundInverseSecondary` **ด้วยชื่อ token เดียวกันทั้งธีมสว่างและธีมมืด** | ตรงกับคำตัดสินที่ user ลงแล้ว และ **Mantine เป็นตัวอย่างว่าโหมดมืดของ tooltip ต้องกลับขั้วจริง** คือธีมสว่างใช้ `gray-9` กับ `white` และธีมมืดใช้ `gray-2` กับ `black` ซึ่งทำด้วย variable mode ได้ ไม่ต้องมีแกน |
| 13 | **ความกว้างสูงสุด 280 บนเดสก์ท็อป และ 240 บนมือถือ** | **มัธยฐานตลาด 250** และช่วงที่คนทำเยอะสุด 200 ถึง 320 | 320 ที่ `Text area` ใช้อยู่คือปลายสูงของช่วง และบนมือถือ 360 จะกินจอเกือบหมด **และ 2 เจ้าที่สนใจเรื่องนี้ต่างก็มีค่าแยกตามอุปกรณ์** คือ Spectrum (160 กับ 200) และ SLDS (320 กับ 160) |
| 14 | **เลิกใส่ความกว้างตายตัวให้ `Text area`** ให้กล่องหดตามเนื้อหาแล้วชนเพดานที่ max-width | **12 ใน 15 เจ้าใช้ max-width และ 0 เจ้าตั้งความกว้างตายตัว** อีก 3 เจ้าไม่กำหนดความกว้างมาให้ คือ Mantine, Radix และ Base Web | ปัจจุบัน `Text area` ตั้ง `counterAxisSizingMode: FIXED` ที่ 320 ทำให้ข้อความสั้นก็ยังกินกล่อง 320 |
| 15 | **ไม่กำหนดจำนวนบรรทัดสูงสุด และห้ามตัดข้อความด้วย ellipsis** | **0 ใน 15 เจ้ากำหนดจำนวนบรรทัด** และ **Atlassian ห้ามตัดข้อความตรง ๆ** ว่า "Tooltip text must never truncate itself" พร้อมประกาศ `truncate` เป็น `@deprecated` เพราะ "it's inaccessible" | ตัดข้อความในของที่ตัวมันเองมีไว้แสดงข้อความเต็มเป็นเรื่องย้อนแย้ง |
| 16 | **ขยายลูกศรจาก 8 คูณ 4 เป็น 12 คูณ 6** | **มัธยฐานความสูงของตลาด 8** และของเราที่ 4 เป็นค่าต่ำสุดเท่ากับ Mantine เท่านั้น **และ 12 คูณ 6 คือค่าเริ่มต้นของ Carbon** | ลูกศรสูง 4 บนกล่องที่มีมุมโค้ง 8 แทบมองไม่เห็น เพราะมุมโค้งกินพื้นที่ฐานไปแล้ว **และอัตราส่วน 2 ต่อ 1 ของเราถูกแล้ว** ตรงกับ Carbon และ Ant และ Material และ Spectrum |
| 17 | **ล้างเงาซ้อนให้เหลือชั้นเดียว** และเลิกใช้ `shadows/bottom/md` ในชุดนี้ | **9 เจ้ามีเงา 6 เจ้าไม่มี** ไม่มีฉันทามติ แต่ **ไม่มีเจ้าไหนซ้อนเงา 2 ชั้นบนกล่องเดียว** ยกเว้น Fluent ที่ซ้อนเป็น ambient บวก key ซึ่งเป็นการตั้งใจและออกแบบมาด้วยกัน | ของเราซ้อนโดยไม่ได้ตั้งใจ และ description ของ `shadows/bottom/md` เขียนไว้ว่าใช้กับ tooltip อยู่แล้ว แต่ของจริงใช้ `shadows/center/xs` ที่กล่องนอก **แปลว่า description ไม่ตรงกับความจริง และต้องแก้ตามกฎ effect ของเรา** |

### 13.6 ทรงสีและตัวหนังสือ

| # | ข้อเสนอ | เสียงข้างมากของตลาด | เหตุผล |
|---|---|---|---|
| 18 | **ถ้าคงพื้นขาวไว้ ต้องเติมเส้นขอบ 1 พิกเซล** | **2 ใน 2 เจ้าที่ใช้พื้นขาวต่างก็เติมขอบ** คือ Fluent ใช้ `border: 1px solid colorTransparentStroke` และ Polaris ใช้ `box-shadow: var(--p-shadow-bevel-100)` ที่เป็น inset 4 ด้าน | เงา `0 0 4px rgba(0,0,0,0.05)` ของเราจางเกินกว่าจะเป็นขอบเขตที่มองเห็นได้ ตามข้อ 1.4.11 Non-text Contrast |
| 19 | **เปลี่ยน text style เป็น preset ที่ประกาศไว้ในระบบ** | **ขนาด 12 เป็นค่าที่ตลาดใช้ตรงกัน 10 ใน 15 เจ้า** (Material 12, Atlassian 12, Primer 12, SLDS 12, Base Web 12, Gestalt 12, Chakra 12, Untitled UI 12, Spectrum 12 เดสก์ท็อป, Carbon ตาม body-01) | ปัจจุบันใช้ `Text/xs semibold` กับ `Text/xs regular` ที่เป็น Prompt 12 บน line-height 18 **ซึ่งไม่ตรงกับ preset ไหนในระบบเลย** (`label-sm` คือ Prompt 500 ขนาด 12 บน 22 และ `body-xs` คือ Prompt 400 ขนาด 12 บน 22) **ต้องตัดสินว่าจะย้ายไปใช้ preset เดิม หรือจะเพิ่ม preset ใหม่** ซึ่งตามกฎต้องถามก่อน |
| 20 | **คง `Prompt` ไว้ ไม่ใช้ `Sarabun`** | ไม่เทียบได้ตรง เพราะไม่มีเจ้าไหนมี 2 ตระกูลแบบเรา | ตามกฎบทบาทฟอนต์ของเราเอง tooltip เป็น UI ไม่ใช่ editorial |
| 21 | **มุมโค้งคง 8 ไว้** | ค่าที่พบคือ 2 ถึง 3 (Carbon, Atlassian), 4 (Material plain, Spectrum, Fluent, SLDS, Chakra), 6 (Primer), 8 (Base Web, Gestalt, Untitled UI), 12 (Material rich) **มัธยฐาน 4** | **ของเราที่ 8 สูงกว่ามัธยฐานเท่าตัว แต่ตรงกับ 3 เจ้า** และสำคัญกว่าคือต้องตรงกับ `RADIUS_FORMULA` ของระบบเรา **ถ้าขยายลูกศรเป็น 12 คูณ 6 แล้ว มุมโค้ง 8 จะพอดีกับฐานลูกศร 12 ได้** |

### 13.7 ตัวกระตุ้น จังหวะ และการเข้าถึง

| # | ข้อเสนอ | เสียงข้างมากของตลาด | เหตุผล |
|---|---|---|---|
| 22 | **หน่วงก่อนโผล่ 300 และหน่วงก่อนหาย 150** | **มัธยฐานตลาดคือเข้า 200 และออก 150** และ 300 คือค่าที่ Atlassian และ Untitled UI ใช้ | 300 เป็นค่าที่ไม่โผล่เรี่ยราดตอนลากเมาส์ผ่าน และไม่ช้าจนคนเลิกรอ **ส่วนขาออก 150 มีไว้กันการกระพริบตอนขยับเมาส์ข้ามรอยต่อระหว่างตัวกระตุ้นกับกล่อง** |
| 23 | **ทำกลไกเปิดเร็วขึ้นเมื่อเพิ่งปิดไปหมาด ๆ โดยตั้งช่วงผ่อนผัน 300** | **6 ใน 15 เจ้าทำ** และทุกเจ้าใช้หลักการเดียวกัน ส่วนช่วงผ่อนผันอยู่ที่ 300 (Radix) ถึง 500 (Spectrum) | **ข้อนี้สำคัญกับหลังบ้านมาก** เพราะแถบเครื่องมือของ CMS จะมีปุ่มไอคอนเรียงกัน ถ้าไม่มีกลไกนี้ การไล่เมาส์ผ่าน 5 ปุ่มจะต้องรอ 300 ทุกปุ่ม |
| 24 | **เปิดด้วยการชี้และการโฟกัส และจำกัดการโฟกัสเฉพาะ `:focus-visible`** | **โฟกัสเปิดไว้ 13 ใน 15 เจ้า** และ **3 เจ้าจำกัดเป็น `:focus-visible`** คือ Spectrum, Primer และ Zag | Mantine กับ Ant เป็น 2 เจ้าที่ปิดโฟกัส และ **Mantine เตือนเองในเอกสารว่าคนใช้คีย์บอร์ดจะเข้าไม่ถึงเนื้อหา** ส่วน `:focus-visible` กันไม่ให้กล่องโผล่ตอนคลิกเมาส์ |
| 25 | **ซ่อนบนจอสัมผัส และเขียนลงเอกสารว่าห้ามใส่ข้อมูลที่จำเป็นใน tooltip** | **6 ใน 15 เจ้าซ่อน และบนเว็บไม่มีใครแปลงเป็นกดค้าง** เจ้าเดียวที่แปลงคือ Material ที่อยู่บน Android | **ข้อนี้สำคัญที่สุดสำหรับองค์กรเราเพราะมือถือเกิน 70 เปอร์เซ็นต์** และ React Aria เขียนไว้ตรง ๆ ว่า "ensure your UI is usable without tooltips" |
| 26 | **ปิดด้วย Escape และเรียก `stopPropagation()` ด้วย** | **Escape ปิดได้ 11 ใน 15 เจ้า** และ **3 เจ้าเรียก `stopPropagation()`** คือ Carbon, Spectrum และ Fluent พร้อมคอมเมนต์อธิบาย | ถ้าไม่หยุดการไหล การกด Escape ปิด tooltip จะไปปิด modal ที่อยู่ข้างนอกด้วย ซึ่งเป็นบั๊กที่เจอบ่อย |
| 27 | **ทำพื้นที่ปลอดภัยให้ย้ายเมาส์เข้าไปในกล่องได้โดยกล่องไม่หาย และห้ามตั้ง `pointer-events: none`** | **9 ใน 15 เจ้าผ่านข้อ hoverable ครบ** และ **3 เจ้าที่ตกใช้วิธี `pointer-events: none` เหมือนกันหมด** คือ Mantine, Chakra กับ Zag และ Gestalt | นี่คือข้อ 1.4.13 ข้อย่อยที่ตลาดตกมากที่สุด **และวิธีที่ถูกที่สุดคือพื้นที่ปลอดภัยรูปหลายเหลี่ยม ที่ Spectrum เผื่อระยะไว้ 8 พร้อมคอมเมนต์ว่าเผื่อไว้สำหรับการสั่นของพิกเซลย่อยกับช่องว่างระหว่างสองชิ้น** |
| 28 | **ทำสวิตช์ `relationship` ที่บังคับให้ระบุ 3 ค่า คือ `label`, `description` และ `inaccessible`** | **3 ใน 15 เจ้าทำสวิตช์นี้** คือ Carbon (`label` กับ `description`), Primer (`type`) และ Fluent (`relationship`) **และ Fluent เป็นเจ้าเดียวที่บังคับให้ระบุ** | **ข้อนี้คือข้อที่จะกันบั๊กการเข้าถึงได้มากที่สุด** เพราะทำให้ไม่มีใครลืมตัดสินว่า tooltip นี้เป็นชื่อหรือเป็นคำอธิบาย และค่า `inaccessible` แก้กรณีข้อความซ้ำกับชื่อปุ่มได้พอดี |
| 29 | **ตั้ง `role="tooltip"` บนกล่อง และ `aria-hidden="true"` ด้วย** | **`role="tooltip"` 11 ใน 15 เจ้า** และ **2 เจ้าตั้ง `aria-hidden` คู่กัน** คือ Carbon และ Primer | ทำให้โปรแกรมอ่านหน้าจออ่านผ่านความสัมพันธ์ `aria-labelledby` หรือ `aria-describedby` เท่านั้น ไม่อ่านจาก DOM ซ้ำสองรอบ |
| 30 | **เขียนกฎว่าห้ามใส่ลิงก์หรือปุ่มใน tooltip และถ้าต้องมีให้ใช้ popover ที่กระตุ้นด้วยการคลิก** | **5 เจ้าเขียนห้ามตรง ๆ** บวก **1 เจ้าเคยทำแล้วถอน** บวก **W3C ห้าม** เจ้าเดียวที่อนุญาตคือ Material และแยกชื่อเป็น rich tooltip | **ข้อนี้เป็นข้อที่ตลาดตรงกันแน่นที่สุดในเอกสารนี้** และหลักฐานที่ดีที่สุดคือ Gestalt ที่เคยทำ prop `link` แล้วเขียนว่า "this feature will soon be deprecated, as it is not accessible" |

### 13.8 สิ่งที่ควรทำพร้อมกัน

| # | งาน | เหตุผล |
|---|---|---|
| 31 | **สร้าง `tokens/scale/tooltip.mjs`** | ตามกฎที่ตั้งไว้ 2026-08-18 ว่าสร้าง component ที่มีหลายขนาดต้องนิยามสูตรขนาดไปพร้อมกัน **แต่ tooltip ไม่มีแกนขนาด** จึงอาจไม่เข้าเงื่อนไข **ต้องถามก่อนว่าจะทำไฟล์นี้ไหม** ถ้าทำ ตัวแปรที่ต้องเก็บคือ ความกว้างสูงสุด 2 ค่า (เดสก์ท็อปกับมือถือ) ระยะขอบ 2 ชุด (มีกับไม่มีข้อความรอง) ขนาดลูกศร ระยะห่างจากตัวกระตุ้น และระยะห่างระหว่างหัวข้อกับข้อความรอง |
| 32 | **ตรวจและอัปเดต description ของ effect style** | `shadows/bottom/md` เขียนว่าใช้กับ tooltip แต่ของจริงใช้ `shadows/center/xs` ที่กล่องนอก **ต้องแก้ description ของทั้งสองตัวให้ตรงความจริง** ตามกฎ effect ที่ตั้งไว้ 2026-08-14 |
| 33 | **เปลี่ยนไอคอนจาก `Material design(2)/ACTION/Filled/help_outline` เป็นไอคอน Nation UI** | ตามกฎห้ามวาด/ใช้ของนอก DS ถ้ามีของใน DS อยู่แล้ว **แต่ไอคอนนี้อยู่ในชุด `Help icon` ที่เสนอให้ย้ายออกจากหน้า 20** จึงขึ้นกับว่า user ตัดสินยังไงกับชุดนั้น |
| 34 | **ล้างสีดิบ 4 จุด** | พื้นหลังของ COMPONENT_SET ทั้ง 4 ชุด ผูกกับ `color/background/general/*` ตามวิธีที่หน้า 05 Effect ทำไว้ |
| 35 | **ทำเอกสารครบชนิดตามมาตรฐาน** | หน้า 20 ต้องมี Page Documentation 1 อัน บวก Information Document อย่างน้อย 1 อัน (ซึ่งควรเป็นที่เก็บเกณฑ์ตัดสิน 3 ข้อ กับลำดับการพลิก 3 ขั้น กับตารางข้อ 1.4.13) บวก Component Previews บวก Token Document ถ้ามี token |
| 36 | **เขียนตารางเทียบ "ใช้ tooltip หรือใช้อะไรแทน" ลง Information Document** | เพราะปัญหาจริงของทีมคือ "จะใช้ตัวไหน" และเอกสารทุกเจ้าใหญ่มีหัวข้อนี้ **และสำหรับเราต้องเพิ่มบรรทัดเฉพาะว่า หน้าอ่านข่าวบนมือถือไม่ใช่ที่ของ tooltip** |

### 13.9 สรุปสั้น เรื่องที่มีฉันทามติ เทียบ เรื่องที่ต้องให้คนตัดสิน

**เรื่องที่ตลาดตรงกันจนรับได้เลย ไม่ต้องถาม**

| เรื่อง | ความแรงของฉันทามติ |
|---|---|
| แยกตัวกระตุ้นออกจาก tooltip ไม่รวมในชุดเดียวกัน | **15 ใน 15** |
| แยกเรื่องตำแหน่งออกจากเรื่องมีลูกศรหรือไม่ เป็น 2 แกน | **15 ใน 15** |
| ชื่อตำแหน่งหมายถึงที่ที่ tooltip ไปอยู่ ไม่ใช่ทิศที่ลูกศรชี้ | **15 ใน 15** |
| ไม่มีแกนขนาด sm md lg | **15 ใน 15** |
| ห้ามใส่ลิงก์หรือปุ่มข้างใน | **5 เจ้าเขียนห้าม บวก 1 เจ้าถอนออก บวก W3C ห้าม และ 0 เจ้าที่ทำได้โดยไม่แยกชื่อ** |
| โหมดมืดมาจากโหมดของตัวแปร ไม่ใช่แกนของชิ้นงาน | **15 ใน 15** (ตรงกับคำตัดสินที่ user ลงแล้ว) |
| เปิดด้วยการชี้และการโฟกัส | **13 ใน 15** |
| มีกลไกพลิกเมื่อชนขอบจอ | **14 ใน 15** |
| พลิกได้แค่ด้านตรงข้าม ไม่กระโดดข้ามแกน | **ค่าเริ่มต้นของ Floating UI ที่เป็นชั้นใต้ของ 5 เจ้า** |
| ปิดด้วย Escape | **11 ใน 15** |
| ใช้ `role="tooltip"` | **11 ใน 15** |
| ความกว้างใช้ max-width ไม่ใช่ width ตายตัว | **12 ใน 15 และ 0 เจ้าที่ตั้งความกว้างตายตัว** |
| ขนาดตัวหนังสือ 12 | **10 ใน 15** |
| ห้ามตัดข้อความด้วย ellipsis | **1 เจ้าห้ามตรง ๆ และ 0 เจ้าที่ทำเป็นค่าเริ่มต้น** |
| ย้ายเมาส์เข้าไปในกล่องแล้วกล่องต้องไม่หาย | **เป็นข้อบังคับระดับ AA ของ WCAG ไม่ใช่แค่เสียงข้างมาก** |

**เรื่องที่ตลาดไม่ตรงกันจนต้องให้คนตัดสิน ห้ามตัดสินเอง**

| เรื่อง | สองฝั่ง | ทำไมต้องให้คนตัดสิน |
|---|---|---|
| **พื้นเข้มหรือพื้นขาว** | พื้นเข้ม 12 เจ้า เทียบ พื้นขาว 2 เจ้า (Fluent, Polaris) | เสียงข้างมากชัด **แต่ของเราเลือกพื้นขาวไว้แล้วและเป็นเรื่องของทิศทางแบรนด์** ถ้าเปลี่ยนเป็นพื้นเข้มจะกระทบทุกที่ที่ใช้ tooltip และกระทบการตั้งชื่อ token ถ้าคงพื้นขาวไว้ **ต้องเติมเส้นขอบตามที่ 2 เจ้านั้นทำ** |
| **มีลูกศรหรือไม่มี** | มี 6 เจ้า เทียบ ไม่มีเลย 3 เจ้า เทียบ ปิดไว้ 6 เจ้า | ไม่มีฉันทามติ และ **3 เจ้าใหญ่ตัดทิ้งทั้งกลไก** ถ้าเราเลือกไม่มีลูกศร จำนวนแบบจะลดจาก 8 เหลือ 2 ทันที ซึ่งเป็นการตัดสินใจที่ใหญ่พอที่จะต้องให้คนเลือก |
| **จำนวนค่าตำแหน่งในไฟล์ออกแบบ 4 หรือ 12** | 12 คือฐานนิยมของโค้ด เทียบ 4 คือสิ่งที่ Gestalt ทำในระดับ API | ขึ้นกับว่าเราถือว่าไฟล์ออกแบบมีไว้ให้นักออกแบบเลือกค่า หรือมีไว้แสดงให้ครบทุกค่า **ซึ่งเป็นเรื่องนโยบายของไฟล์ ไม่ใช่เรื่องของ tooltip** |
| **แกนขนาด 5 ขั้นของระบบเรา** | ตลาด 0 ใน 15 เจ้ามีแกนขนาด เทียบ ธรรมเนียม 5 ขั้นที่เราใช้ทุกหน้า | **ขัดกับธรรมเนียมของเราเองตรง ๆ** และยังพันกับกฎที่ตั้งไว้ 2026-08-18 ว่าสร้าง component หลายขนาดต้องทำไฟล์สูตรขนาดไปพร้อมกัน ถ้า tooltip ไม่มีหลายขนาด ก็ต้องตัดสินว่าจะทำไฟล์นั้นไหม |
| **text style จะย้ายไป preset เดิมหรือเพิ่ม preset ใหม่** | ของเดิมคือ Prompt 12 บน line-height 18 เทียบ preset ที่มีคือ 12 บน 22 | **ตามกฎ typography preset-only ต้องถามก่อนเพิ่ม preset** และ line-height 18 กับ 22 ต่างกัน 4 ซึ่งทำให้ความสูงกล่องเปลี่ยน จึงกระทบระยะขอบทั้งชุด |
| **หน่วงก่อนโผล่ 300 หรือค่าอื่น** | 0 ถึง 100 ฝั่งหนึ่ง 6 เจ้า เทียบ 300 ถึง 1500 อีกฝั่ง 5 เจ้า | ขึ้นกับว่าหลังบ้านของเราเป็นแบบไหน **ซึ่งผู้วิจัยไม่ได้เข้าไปดู** ถ้าแถบเครื่องมือมีปุ่มเยอะ ควรไปทาง 300 บวกกลไกเปิดเร็ว ถ้ามีไม่กี่ปุ่ม 150 ก็พอ |
| **จะเก็บชุด `Avartar` ไว้ไหม และถ้าเก็บจะเรียกว่าอะไร** | ตลาด 0 ใน 15 เจ้ามีรูปใน tooltip และ Atlassian ห้ามตรง ๆ เทียบ ของเรามีอยู่แล้ว 14 แบบ | **เป็นของที่มีอยู่แล้ว ตามกฎ ask-first ต้องถามก่อนลบหรือย้าย** และถ้าเป็นป้ายชื่อจริงก็อาจมีที่ใช้ แค่ไม่ใช่ในหน้า tooltip |
| **จะเก็บชุด `Help icon` ไว้ไหม และย้ายไปไหน** | ตลาด 2 เจ้าทำชิ้นรวมและตั้งชื่อตามตัวกระตุ้น เทียบ ของเรามีอยู่แล้ว 28 แบบ | **เป็นของที่มีอยู่แล้ว ต้องถามก่อน** และถ้าเนื้อหาจะมีลิงก์ก็ต้องเปลี่ยนเป็น popover ตั้งแต่ต้น ซึ่งเป็นงานอีกใบ |
| **จะทำ tooltip ใช้บนหน้าอ่านข่าวไหม หรือทำเพื่อหลังบ้านเท่านั้น** | ไม่พบการใช้ tooltip ในเว็บข่าว 10 เว็บที่สำรวจ เทียบ มี `title` ของเบราว์เซอร์ใส่ผิดอยู่ 300 กว่าจุด | **เป็นเรื่องขอบเขตของงาน ไม่ใช่เรื่องออกแบบ** ถ้าทำเพื่อหลังบ้าน ความกว้าง 280 กับหน่วง 300 เหมาะ ถ้าจะใช้บนหน้าข่าวด้วย ต้องตัดสินเรื่องจอสัมผัสก่อนเป็นข้อแรก |

---
## 14. แหล่งอ้างอิง

> ตรวจสถานะ HTTP ของทุกลิงก์ในหัวข้อนี้วันที่ 2026-10-05 แล้ว **ได้ 200 ทั้ง 108 รายการ**

**ไฟล์ต้นทางที่อ่านโดยตรง (แพ็กเกจ npm เวอร์ชันที่ระบุ ดาวน์โหลด 2026-10-05)**

- Material Web token `@material/web@2.5.0` [`_md-comp-plain-tooltip.scss`](https://unpkg.com/@material/web@2.5.0/tokens/versions/latest/sass/_md-comp-plain-tooltip.scss), [`_md-comp-rich-tooltip.scss`](https://unpkg.com/@material/web@2.5.0/tokens/versions/latest/sass/_md-comp-rich-tooltip.scss), [`_md-sys-shape.scss`](https://unpkg.com/@material/web@2.5.0/tokens/versions/latest/sass/_md-sys-shape.scss), [`_md-sys-typescale.scss`](https://unpkg.com/@material/web@2.5.0/tokens/versions/latest/sass/_md-sys-typescale.scss), [`_md-sys-elevation.scss`](https://unpkg.com/@material/web@2.5.0/tokens/versions/latest/sass/_md-sys-elevation.scss)
- IBM Carbon `@carbon/styles@1.116.0` [`scss/components/tooltip/_tooltip.scss`](https://unpkg.com/@carbon/styles@1.116.0/scss/components/tooltip/_tooltip.scss), [`scss/components/popover/_popover.scss`](https://unpkg.com/@carbon/styles@1.116.0/scss/components/popover/_popover.scss) และ `@carbon/react@1.117.0` [`es/components/Tooltip/Tooltip.js`](https://unpkg.com/@carbon/react@1.117.0/es/components/Tooltip/Tooltip.js), [`es/components/Tooltip/Tooltip.d.ts`](https://unpkg.com/@carbon/react@1.117.0/es/components/Tooltip/Tooltip.d.ts), [`es/components/Popover/index.d.ts`](https://unpkg.com/@carbon/react@1.117.0/es/components/Popover/index.d.ts)
- Adobe Spectrum `@adobe/spectrum-tokens@15.5.0` [`src/tooltip.json`](https://unpkg.com/@adobe/spectrum-tokens@15.5.0/src/tooltip.json), [`src/layout.json`](https://unpkg.com/@adobe/spectrum-tokens@15.5.0/src/layout.json), [`src/typography.json`](https://unpkg.com/@adobe/spectrum-tokens@15.5.0/src/typography.json) และ `@spectrum-css/tooltip@7.2.0` [`index.css`](https://unpkg.com/@spectrum-css/tooltip@7.2.0/index.css)
- Adobe React Stately `react-stately@3.50.0` [`dist/private/tooltip/useTooltipTriggerState.mjs`](https://unpkg.com/react-stately@3.50.0/dist/private/tooltip/useTooltipTriggerState.mjs) (ที่มาของ `TOOLTIP_DELAY = 1500` และ `TOOLTIP_COOLDOWN = 500`)
- Adobe React Aria `react-aria@3.52.1` [`dist/private/tooltip/useTooltipTrigger.mjs`](https://unpkg.com/react-aria@3.52.1/dist/private/tooltip/useTooltipTrigger.mjs), [`dist/private/tooltip/useTooltip.mjs`](https://unpkg.com/react-aria@3.52.1/dist/private/tooltip/useTooltip.mjs), [`dist/private/tooltip/useSafeArea.mjs`](https://unpkg.com/react-aria@3.52.1/dist/private/tooltip/useSafeArea.mjs) (ที่มาของ `PADDING = 8`)
- Shopify Polaris `@shopify/polaris@13.9.5` [`build/ts/src/components/Tooltip/Tooltip.d.ts`](https://unpkg.com/@shopify/polaris@13.9.5/build/ts/src/components/Tooltip/Tooltip.d.ts), [`build/esm/components/Tooltip/Tooltip.js`](https://unpkg.com/@shopify/polaris@13.9.5/build/esm/components/Tooltip/Tooltip.js), [`build/esm/components/Tooltip/components/TooltipOverlay/TooltipOverlay.js`](https://unpkg.com/@shopify/polaris@13.9.5/build/esm/components/Tooltip/components/TooltipOverlay/TooltipOverlay.js), [`build/esm/styles.css`](https://unpkg.com/@shopify/polaris@13.9.5/build/esm/styles.css), [`build/ts/src/components/PositionedOverlay/utilities/math.d.ts`](https://unpkg.com/@shopify/polaris@13.9.5/build/ts/src/components/PositionedOverlay/utilities/math.d.ts)
- Atlassian `@atlaskit/tooltip@24.4.0` [`dist/types/types.d.ts`](https://unpkg.com/@atlaskit/tooltip@24.4.0/dist/types/types.d.ts), [`dist/es2019/tooltip.js`](https://unpkg.com/@atlaskit/tooltip@24.4.0/dist/es2019/tooltip.js), [`dist/es2019/tooltip-container.compiled.css`](https://unpkg.com/@atlaskit/tooltip@24.4.0/dist/es2019/tooltip-container.compiled.css), [`dist/es2019/tooltip-primitive.js`](https://unpkg.com/@atlaskit/tooltip@24.4.0/dist/es2019/tooltip-primitive.js), [`dist/es2019/internal/tooltip-manager.js`](https://unpkg.com/@atlaskit/tooltip@24.4.0/dist/es2019/internal/tooltip-manager.js) และ `@atlaskit/motion@9.3.0` [`dist/es2019/utils/durations.js`](https://unpkg.com/@atlaskit/motion@9.3.0/dist/es2019/utils/durations.js), [`dist/es2019/utils/exiting-durations.js`](https://unpkg.com/@atlaskit/motion@9.3.0/dist/es2019/utils/exiting-durations.js), [`dist/es2019/utils/curves.js`](https://unpkg.com/@atlaskit/motion@9.3.0/dist/es2019/utils/curves.js), [`dist/es2019/entering/fade-in.js`](https://unpkg.com/@atlaskit/motion@9.3.0/dist/es2019/entering/fade-in.js)
- Ant Design `antd@6.6.5` [`es/tooltip/index.d.ts`](https://unpkg.com/antd@6.6.5/es/tooltip/index.d.ts), [`es/tooltip/index.js`](https://unpkg.com/antd@6.6.5/es/tooltip/index.js), [`es/tooltip/style/index.js`](https://unpkg.com/antd@6.6.5/es/tooltip/style/index.js), [`es/theme/themes/seed.js`](https://unpkg.com/antd@6.6.5/es/theme/themes/seed.js), [`es/style/motion/zoom.js`](https://unpkg.com/antd@6.6.5/es/style/motion/zoom.js), [`es/theme/util/alias.js`](https://unpkg.com/antd@6.6.5/es/theme/util/alias.js), [`es/theme/themes/default/colors.js`](https://unpkg.com/antd@6.6.5/es/theme/themes/default/colors.js), [`es/style/roundedArrow.js`](https://unpkg.com/antd@6.6.5/es/style/roundedArrow.js) และ `@rc-component/tooltip@1.5.2` [`lib/Tooltip.js`](https://unpkg.com/@rc-component/tooltip@1.5.2/lib/Tooltip.js)
- GitHub Primer `@primer/react@38.40.1` [`dist/TooltipV2/Tooltip.d.ts`](https://unpkg.com/@primer/react@38.40.1/dist/TooltipV2/Tooltip.d.ts), [`dist/TooltipV2/Tooltip.js`](https://unpkg.com/@primer/react@38.40.1/dist/TooltipV2/Tooltip.js), [`dist/TooltipV2/Tooltip-dd983e5b.css`](https://unpkg.com/@primer/react@38.40.1/dist/TooltipV2/Tooltip-dd983e5b.css)
- Microsoft Fluent 2 `@fluentui/react-tooltip@9.10.7` [`dist/index.d.ts`](https://unpkg.com/@fluentui/react-tooltip@9.10.7/dist/index.d.ts), [`lib/components/Tooltip/useTooltipBase.js`](https://unpkg.com/@fluentui/react-tooltip@9.10.7/lib/components/Tooltip/useTooltipBase.js), [`lib/components/Tooltip/useTooltipStyles.styles.raw.js`](https://unpkg.com/@fluentui/react-tooltip@9.10.7/lib/components/Tooltip/useTooltipStyles.styles.raw.js), [`lib/components/Tooltip/private/constants.js`](https://unpkg.com/@fluentui/react-tooltip@9.10.7/lib/components/Tooltip/private/constants.js) และ `@fluentui/react-positioning@9.23.3` [`dist/index.d.ts`](https://unpkg.com/@fluentui/react-positioning@9.23.3/dist/index.d.ts)
- Salesforce Lightning `@salesforce-ux/design-system@2.264.1` [`assets/styles/salesforce-lightning-design-system.css`](https://unpkg.com/@salesforce-ux/design-system@2.264.1/assets/styles/salesforce-lightning-design-system.css)
- Uber Base Web `baseui@18.2.0` [`tooltip/styled-components.js`](https://unpkg.com/baseui@18.2.0/tooltip/styled-components.js), [`tooltip/default-props.js`](https://unpkg.com/baseui@18.2.0/tooltip/default-props.js), [`tooltip/tooltip.js`](https://unpkg.com/baseui@18.2.0/tooltip/tooltip.js), [`popover/constants.js`](https://unpkg.com/baseui@18.2.0/popover/constants.js), [`popover/default-props.js`](https://unpkg.com/baseui@18.2.0/popover/default-props.js), [`themes/light-theme/color-component-tokens.js`](https://unpkg.com/baseui@18.2.0/themes/light-theme/color-component-tokens.js), [`themes/shared/typography.js`](https://unpkg.com/baseui@18.2.0/themes/shared/typography.js), [`themes/shared/borders.js`](https://unpkg.com/baseui@18.2.0/themes/shared/borders.js), [`themes/shared/sizing.js`](https://unpkg.com/baseui@18.2.0/themes/shared/sizing.js), [`themes/shared/lighting.js`](https://unpkg.com/baseui@18.2.0/themes/shared/lighting.js)
- Pinterest Gestalt `gestalt@177.0.12` [`src/Tooltip.tsx`](https://unpkg.com/gestalt@177.0.12/src/Tooltip.tsx), [`src/Tooltip/InternalTooltip.tsx`](https://unpkg.com/gestalt@177.0.12/src/Tooltip/InternalTooltip.tsx), [`src/Popover/Contents.tsx`](https://unpkg.com/gestalt@177.0.12/src/Popover/Contents.tsx), [`src/Borders.css`](https://unpkg.com/gestalt@177.0.12/src/Borders.css), [`dist/gestalt.css`](https://unpkg.com/gestalt@177.0.12/dist/gestalt.css)
- Radix `@radix-ui/react-tooltip@1.2.16` [`dist/index.mjs`](https://unpkg.com/@radix-ui/react-tooltip@1.2.16/dist/index.mjs)
- Mantine `@mantine/core@9.6.3` [`esm/components/Tooltip/Tooltip.mjs`](https://unpkg.com/@mantine/core@9.6.3/esm/components/Tooltip/Tooltip.mjs), [`esm/components/Tooltip/use-tooltip.mjs`](https://unpkg.com/@mantine/core@9.6.3/esm/components/Tooltip/use-tooltip.mjs), [`styles/Tooltip.css`](https://unpkg.com/@mantine/core@9.6.3/styles/Tooltip.css), [`lib/components/Tooltip/Tooltip.d.ts`](https://unpkg.com/@mantine/core@9.6.3/lib/components/Tooltip/Tooltip.d.ts)
- Chakra UI `@chakra-ui/react@3.37.0` [`dist/esm/theme/recipes/tooltip.js`](https://unpkg.com/@chakra-ui/react@3.37.0/dist/esm/theme/recipes/tooltip.js), [`dist/esm/theme/tokens/durations.js`](https://unpkg.com/@chakra-ui/react@3.37.0/dist/esm/theme/tokens/durations.js), [`dist/esm/theme/tokens/keyframes.js`](https://unpkg.com/@chakra-ui/react@3.37.0/dist/esm/theme/tokens/keyframes.js), [`dist/esm/theme/tokens/spacing.js`](https://unpkg.com/@chakra-ui/react@3.37.0/dist/esm/theme/tokens/spacing.js), [`dist/esm/theme/tokens/radius.js`](https://unpkg.com/@chakra-ui/react@3.37.0/dist/esm/theme/tokens/radius.js), [`dist/esm/theme/semantic-tokens/radii.js`](https://unpkg.com/@chakra-ui/react@3.37.0/dist/esm/theme/semantic-tokens/radii.js), [`dist/esm/theme/semantic-tokens/shadows.js`](https://unpkg.com/@chakra-ui/react@3.37.0/dist/esm/theme/semantic-tokens/shadows.js), [`dist/esm/theme/tokens/sizes.js`](https://unpkg.com/@chakra-ui/react@3.37.0/dist/esm/theme/tokens/sizes.js), [`dist/esm/theme/text-styles.js`](https://unpkg.com/@chakra-ui/react@3.37.0/dist/esm/theme/text-styles.js)
- เครื่องสถานะที่อยู่ใต้ Chakra `@zag-js/tooltip@1.44.0` [`dist/tooltip.machine.js`](https://unpkg.com/@zag-js/tooltip@1.44.0/dist/tooltip.machine.js), [`dist/tooltip.connect.js`](https://unpkg.com/@zag-js/tooltip@1.44.0/dist/tooltip.connect.js)
- Floating UI ซึ่งเป็นชั้นใต้ของ Radix, Mantine, Chakra, Fluent และ Carbon `@floating-ui/core@1.8.0` [`dist/floating-ui.core.d.ts`](https://unpkg.com/@floating-ui/core@1.8.0/dist/floating-ui.core.d.ts) (ที่มาของค่าเริ่มต้นของ `FlipOptions`) และ `@floating-ui/utils@0.2.12` [`dist/floating-ui.utils.d.ts`](https://unpkg.com/@floating-ui/utils@0.2.12/dist/floating-ui.utils.d.ts) (ที่มาของนิยาม `Placement`)

**ไฟล์ต้นทางบน GitHub ที่อ่านโดยตรง**

- Google Compose Material3 [`Tooltip.kt`](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/Tooltip.kt) (ที่มาของ `plainTooltipMaxWidth = 200.dp`, `richTooltipMaxWidth = 320.dp`, `caretSize = DpSize(16.dp, 8.dp)`, `SpacingBetweenTooltipAndAnchor = 4.dp` และพารามิเตอร์ `action` ของ `RichTooltip`)
- Google Compose Foundation [`BasicTooltip.kt`](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/foundation/foundation/src/commonMain/kotlin/androidx/compose/foundation/BasicTooltip.kt) (ที่มาของ `TooltipDuration = 1500L`)
- Google AppCompat [`TooltipCompatHandler.java`](https://raw.githubusercontent.com/androidx/androidx/androidx-main/appcompat/appcompat/src/main/java/androidx/appcompat/widget/TooltipCompatHandler.java) (ที่มาของ `LONG_CLICK_HIDE_TIMEOUT_MS = 2500`, `HOVER_HIDE_TIMEOUT_MS = 15000`, `HOVER_HIDE_TIMEOUT_SHORT_MS = 3000`)
- Material Components Android [`tooltip/res/values/dimens.xml`](https://raw.githubusercontent.com/material-components/material-components-android/master/lib/java/com/google/android/material/tooltip/res/values/dimens.xml) (ที่มาของ `mtrl_tooltip_minWidth 32dp`, `minHeight 32dp`, `padding 12dp`, `cornerSize 4dp`, `arrowSize 14dp`)
- Untitled UI React [`components/base/tooltip/tooltip.tsx`](https://raw.githubusercontent.com/untitleduico/react/main/components/base/tooltip/tooltip.tsx) (ที่มาของ `delay = 300`, `closeDelay = 0`, `offset = 6`, `arrow = false`, `max-w-xs`, `size-2.5`, `px-3`, `py-3` กับ `py-2`)
- Shopify Polaris เอกสาร [`tooltip.mdx`](https://raw.githubusercontent.com/Shopify/polaris/main/polaris.shopify.com/content/components/overlays/tooltip.mdx)
- IBM Carbon เอกสาร [`tooltip/usage.mdx`](https://raw.githubusercontent.com/carbon-design-system/carbon-website/main/src/pages/components/tooltip/usage.mdx), [`tooltip/accessibility.mdx`](https://raw.githubusercontent.com/carbon-design-system/carbon-website/main/src/pages/components/tooltip/accessibility.mdx), [`toggletip/usage.mdx`](https://raw.githubusercontent.com/carbon-design-system/carbon-website/main/src/pages/components/toggletip/usage.mdx)
- Salesforce Lightning เอกสาร [`ui/components/tooltips/docs.mdx`](https://raw.githubusercontent.com/salesforce-ux/design-system/main/ui/components/tooltips/docs.mdx)

**หน้าเอกสารทางการ**

- [GitHub Primer Tooltip](https://primer.style/components/tooltip) และ [Primer tooltip guidelines](https://primer.style/product/components/tooltip/guidelines/)
- [Fluent 2 Tooltip usage](https://fluent2.microsoft.design/components/web/react/core/tooltip/usage)
- [Atlassian Design System Tooltip usage](https://atlassian.design/components/tooltip/usage)
- [Pinterest Gestalt Tooltip](https://gestalt.pinterest.systems/web/tooltip)
- [Radix Tooltip](https://www.radix-ui.com/primitives/docs/components/tooltip)
- [Mantine Tooltip](https://mantine.dev/core/tooltip/)
- [Ant Design Tooltip](https://ant.design/components/tooltip)
- [React Spectrum Tooltip](https://react-spectrum.adobe.com/react-spectrum/Tooltip.html) และ [React Aria Tooltip](https://react-aria.adobe.com/Tooltip)
- [Untitled UI Tooltips](https://www.untitledui.com/components/tooltips)
- [Material Design 3 Tooltips guidelines](https://m3.material.io/components/tooltips/guidelines) (**เปิดอ่านเนื้อหาไม่ได้เพราะประกอบด้วยสคริปต์ ไม่ได้ใช้ตัวเลขจากหน้านี้**)

**มาตรฐาน**

- [WAI-ARIA APG Tooltip Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/) (**หมายเหตุ หน้านี้ประกาศเองว่า "This design pattern is work in progress; it does not yet have task force consensus"**)
- [WCAG 2.2 SC 1.4.13 Content on Hover or Focus](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html)

**แหล่งรอง**

- [Sarah Higley, Tooltips in the time of WCAG 2.1](https://sarahmhigley.com/writing/tooltips-in-wcag-21/)

**ไฟล์ในโปรเจกต์ที่อ่านประกอบ (อ่านอย่างเดียว ไม่ได้แก้)**

- Figma REST API node `7121:7239` และ node ลูก `7135:39899`, `7135:39905`, `7135:39986`, `7135:39996`, `7135:40081`, `7135:40091`, `7135:39822`, `7135:39864` (ค่าระยะขอบ มุมโค้ง การผูกตัวแปร ชื่อ style)
- Figma REST API `/v1/files/:key/styles` (ชื่อและคำอธิบายของ `shadows/center/xs` และ `shadows/bottom/md` และ `shadows/bottom/xs`)
- `tokens/tokens.json/shadows.json` (ค่าจริงของเงาทั้งสามตัว)
- `tokens/tokens.json/typography.json` และ `tokens/output/css/typography.css` (ค่า resolved ของ `label/*` และ `body/*` และ `meta/*`)
- `tokens/output/css/variables.css` (ค่าสี `#344054`, `#0c111d`, `#667085`)
- `tokens/tokens.json/component.json` และ `primitive.json` และ `semantics-light-mode.json` (ตรวจว่าไม่มี token ชื่อ tooltip)
- `tokens/scale/` (ตรวจว่าไม่มี `tooltip.mjs`)
- `components/` (ตรวจว่าไม่มีโฟลเดอร์ Tooltip)
- `docs/figma-pages.md` (หน้า 20 Tooltips node `7121:7239`)
- [docs/research/toast-banner-component.md](toast-banner-component.md) และ [docs/research/tabs-component.md](tabs-component.md) (วิธีเก็บข้อมูลและรูปแบบเอกสาร)

**การสำรวจของผู้วิจัย**

- ดึง HTML ตั้งต้นของหน้าแรก 10 เว็บวันที่ 2026-10-05 คือ bangkokbiznews.com, www.nationtv.tv, www.komchadluek.net, www.thansettakij.com, www.springnews.co.th, www.posttoday.com, www.bbc.com, www.theguardian.com, www.nytimes.com, www.reuters.com แล้วนับ `title="..."` และคำว่า `tooltip` และ `aria-label` และ `aria-describedby` (ดูตารางในหัวข้อ 9.1)

---

## 15. คำถามที่ต้องตัดสินก่อนลงมือ

เรียงตามลำดับที่ควรตอบ เพราะคำตอบของข้อต้นกำหนดข้อหลัง

| # | คำถาม | ทำไมต้องตอบก่อน |
|---|---|---|
| 1 | **tooltip ชุดนี้ทำเพื่อใช้ที่ไหน หลังบ้าน (CMS แดชบอร์ด หน้าตั้งค่า) หรือหน้าอ่านข่าวด้วย** | ถ้าเพื่อหลังบ้านเท่านั้น เรื่องจอสัมผัสจบที่ "ซ่อน" ได้เลย และความกว้างกับหน่วงเวลาตั้งตามแถบเครื่องมือได้ ถ้าจะใช้บนหน้าข่าวด้วย ต้องตัดสินเรื่องจอสัมผัสก่อนทุกเรื่อง |
| 2 | **จะคงพื้นขาวไว้ หรือเปลี่ยนเป็นพื้นเข้มตามตลาด 12 ใน 14 เจ้าที่กำหนดสีจริง** | คำตอบกำหนดว่าต้องเติมเส้นขอบไหม ต้องปรับเงาไหม และกำหนดชื่อ token สีที่จะใช้ |
| 3 | **จะมีลูกศรไหม** | ถ้าไม่มี จำนวนแบบลดจาก 8 เหลือ 2 และไม่ต้องทำ `tooltip-arrow` และไม่ต้องตัดสินเรื่องขนาดลูกศร |
| 4 | **ของเดิม 4 ชุด 78 แบบ จะยุบตามข้อเสนอ 13.1 ไหม และชุด `Help icon` กับ `Avartar` จะย้ายไปไหนหรือเก็บไว้** | ตามกฎ ask-first ของที่มีอยู่แล้วและจะย้ายหรือลบ ต้องถามก่อนเสมอ และคำตอบกำหนดขอบเขตงานทั้งหมด |
| 5 | **จะยอมรับว่า tooltip ไม่มีแกนขนาด แม้จะขัดกับธรรมเนียม 5 ขั้นของระบบ** | ตลาด 0 ใน 15 เจ้ามีแกนขนาด แต่นี่เป็นข้อยกเว้นแรกของหน้าที่เราทำ ต้องให้คนยืนยัน และกำหนดว่าจะทำ `tokens/scale/tooltip.mjs` ไหม |
| 6 | **text style จะย้ายไปใช้ `label-sm` หรือ `body-xs` ที่มีอยู่ หรือจะเพิ่ม preset ใหม่ที่เป็น 12 บน line-height 18** | ตามกฎ typography preset-only ต้องถามก่อนเพิ่ม preset และ line-height ที่ต่างกัน 4 ทำให้ความสูงกล่องเปลี่ยน กระทบระยะขอบทั้งชุด |
| 7 | **จำนวนค่าตำแหน่งในไฟล์ออกแบบ จะทำ 4 ค่าหรือ 12 ค่า** | 12 คือฐานนิยมของโค้ด แต่ 4 คือจำนวนที่นักออกแบบเลือกจริง และคูณกับแกน `supporting-text` จะได้ 8 กับ 24 แบบ |
| 8 | **หน่วงก่อนโผล่จะใช้ 300 ไหม และจะทำกลไกเปิดเร็วขึ้นเมื่อเพิ่งปิดไปหมาด ๆ ไหม** | ขึ้นกับคำตอบข้อ 1 และเป็นเรื่องที่ต้องบอก developer ตั้งแต่ต้นเพราะต้องเขียนตัวจับเวลารวมของทั้งหน้า |
| 9 | **จะทำสวิตช์ `relationship` 3 ค่าแบบ Fluent ไหม และจะบังคับให้ระบุหรือไม่** | เป็นเรื่องรูปร่างของ API ที่กระทบทั้ง Figma (ต้องมีที่เขียนกำกับ) และโค้ด และเป็นข้อที่กันบั๊กการเข้าถึงได้มากที่สุด |
| 10 | **จะแก้ description ของ `shadows/bottom/md` กับ `shadows/center/xs` ให้ตรงความจริงไหม** | ตามกฎ effect ที่ตั้งไว้ 2026-08-14 ว่าเวลาแก้หรือเพิ่มต้องอัปเดต description ด้วย และตอนนี้ description ไม่ตรงกับของจริงในไฟล์ |
