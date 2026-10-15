---
title: "Slider Component research"
description: "เทียบ component แถบเลื่อนเลือกค่าของ DS เจ้าใหญ่ 15 เจ้า จากไฟล์ต้นทางจริง พร้อมข้อเสนอโครงใหม่ของ NTGDS หน้า 17 Sliders"
research_date: "2026-09-22"
scope: "Material 3 (web และ Android), Adobe Spectrum (tokens, CSS, React Spectrum), IBM Carbon, Shopify Polaris, Atlassian, Ant Design, Microsoft Fluent 2, Uber Base Web, Chakra UI v3, Radix, Salesforce Lightning, GitHub Primer, Apple HIG, GOV.UK, News UK NewsKit, Untitled UI บวก WCAG 2.2, WAI-ARIA APG และ Baymard"
status: "draft รอตัดสิน"
owner: "ux-researcher"
---

# Research Slider ของ Design System เจ้าใหญ่

**วันที่วิจัย:** 2026-09-22
**โจทย์:** หาข้อมูลเพื่อตัดสินโครงการออกแบบใหม่ของหน้า 17 Sliders ครอบคลุม 8 ประเด็น คือ แบบค่าเดียวกับแบบช่วง, ชุดขนาด, พื้นที่แตะ, การแสดงค่า, สถานะ, คีย์บอร์ดและการเข้าถึง, วิธีทำใน Figma และการใช้บนเว็บข่าว

**ป้ายแหล่ง:** `[ทางการ]` ไฟล์ต้นทางหรือเอกสารขององค์กรเอง `[มาตรฐาน]` W3C `[แหล่งรอง]` คนนอกสรุปหรือวิจัย `[คำนวณ]` ผู้วิจัยคำนวณจากค่าในไฟล์ต้นทาง `[ตีความ]` ความเห็นของผู้วิจัย ไม่ใช่ข้อเท็จจริง `[จากบรีฟ]` ข้อมูลของเราที่ได้จากบรีฟ ผู้วิจัยไม่ได้วัดไฟล์ Figma เอง

> **วิธีเก็บข้อมูล:** ตัวเลขทุกตัวในตารางอ่านจาก **แพ็กเกจ npm ที่เผยแพร่จริง** (ดาวน์โหลดด้วย `npm pack` วันที่ 2026-09-22) ไม่ได้อ่านจากหน้าเว็บที่คนสรุปไว้ ตามบทเรียนใน [toggle-component.md](toggle-component.md) และ [input-component.md](input-component.md) ลิงก์ในหัวข้อ 14 ชี้ไปที่ unpkg ของเวอร์ชันเดียวกับที่อ่าน จึงเปิดตรวจซ้ำได้
>
> **หน้าเว็บที่ประกอบด้วยสคริปต์** (m3.material.io และ spectrum.adobe.com) ดึงเนื้อหาไม่ได้ในรอบนี้ ข้อมูลของ Material 3 จึงมาจากไฟล์ token ในแพ็กเกจ `@material/web` กับเอกสาร Android บน GitHub ส่วน Apple ดึงผ่านปลายทางข้อมูลที่หน้าเว็บใช้เอง
>
> **ไม่ได้เปิดไฟล์ Figma ของเจ้าอื่น** เพราะไฟล์ชุมชนต้องคัดลอกเข้าบัญชีก่อนจึงอ่านได้ และบรีฟห้ามแตะ Figma หัวข้อ 9 จึงอาศัยเอกสารที่ผู้ทำ kit เขียนเอง กับการตีความจากโครงของโค้ด ของที่ยืนยันไม่ได้รวมไว้ในหัวข้อ 13

---

## 1. สรุปคำตอบ 8 ประเด็น (อ่านหน้าเดียวจบ)

| # | ประเด็น | คำตอบสั้นจากข้อมูลจริง |
|---|---|---|
| 1 | ค่าเดียวกับแบบช่วง แยกหรือรวม | **ตลาดแตกเป็นสามกลุ่ม** กลุ่มรวมเป็นตัวเดียวแล้วดูจากรูปของค่า (ตัวเลขเดี่ยวหรือชุดตัวเลข) มีมากที่สุด 8 เจ้า คือ Polaris, Ant, Chakra, Radix, Base Web, Material 3 ฝั่งเว็บ, NewsKit และ Untitled UI **กลุ่มแยกเป็นสอง component** มี 3 เจ้า คือ Material 3 ฝั่ง Android (`Slider` กับ `RangeSlider`), React Spectrum (`Slider` กับ `RangeSlider`) และ Carbon ที่เอกสารแยกเป็นสองหน้าแต่โค้ดเป็นตัวเดียว **กลุ่มที่มีแค่ค่าเดียว ไม่มีแบบช่วงเลย** มี Fluent 2, Atlassian, Salesforce Lightning และ Apple ส่วน GOV.UK กับ Primer ไม่มี slider เลย |
| 2 | ขนาด | **มัธยฐาน 1 ขนาด** เจ้าที่มีหลายขนาดคือ Material 3 (5 ขนาด XS ถึง XL), Spectrum (4 ขนาด S ถึง XL), Chakra (3) และ Fluent (2) **ปุ่มจับของตลาดอยู่ที่ 14 ถึง 24 ส่วนใหญ่ 16 ถึง 20 รางอยู่ที่ 2 ถึง 10 ส่วนใหญ่ 2 ถึง 4** สัดส่วนรางต่อปุ่มจับของตลาดอยู่ช่วง 0.08 ถึง 0.42 ของเรา 8 ต่อ 24 เท่ากับ 0.33 **อยู่ฝั่งหนา ตรงกับ Untitled UI ทุกค่า** ซึ่งน่าจะเป็นต้นแบบของไฟล์เรา และใกล้ Chakra ขนาด lg (10 ต่อ 24) ส่วน Material 3 รุ่นใหม่เป็นคนละตระกูลภาพ รางหนา 16 ถึง 96 กับปุ่มจับเป็นแท่งตั้งกว้าง 4 |
| 3 | พื้นที่แตะ | **WCAG 2.2 นับ slider ทั้งตัวเป็นเป้าเดียว** ไม่ได้นับปุ่มจับแยก เจ้าที่ทำพื้นที่แตะจริงจังใช้ **แถวสัมผัสที่สูงกว่าภาพ** คือ Spectrum (แถวผูก `component-height-*` 24, 32, 40, 48 บนเดสก์ท็อป และ 30, 40, 50, 60 บนจอสัมผัส), Atlassian (input สูง 40), Material 3 เว็บ (กล่องสูง 40 วงแหวนโฟกัส 48) และ Android (พื้นที่แตะปุ่มจับ 48dp) ส่วน Polaris ขยายเป็น 44 เฉพาะจอแคบ และ Ant ไม่ขยายเลย |
| 4 | การแสดงค่า | **tooltip เหนือปุ่มจับตอนชี้ โฟกัส หรือลาก** เป็นแบบที่พบบ่อยที่สุด ไม่พบเจ้าไหนวาง tooltip ใต้ปุ่มจับ **ช่องกรอกตัวเลขคู่ขนาน** เป็นค่าเริ่มต้นของ Carbon ที่ Apple แนะนำ และ Baymard บอกว่าต้องมีเสมอสำหรับตัวกรองตัวเลข **จุดขั้น** ใช้เมื่อค่ามีจำนวนขั้นน้อยและผู้ใช้ต้องรู้ว่าหยุดได้ตรงไหน |
| 5 | สถานะ | ทุกเจ้าที่ตรวจมี ปกติ โฟกัส และเกือบทุกเจ้ามี disabled hover และ กดหรือลาก **error มีแค่ Carbon (error กับ warning) และ Polaris** read-only มีแค่ Carbon **วงแหวนโฟกัสอยู่ที่ปุ่มจับ 10 เจ้า อยู่ที่ทั้งตัว 1 เจ้า** คือ Fluent 2 ซึ่งมีแค่แบบค่าเดียวจึงทำได้ |
| 6 | คีย์บอร์ดและการเข้าถึง | APG กำหนดลูกศรเลื่อนหนึ่งขั้น Home End ไปต้นและปลาย Page Up Down เลื่อนก้าวใหญ่ (ไม่บังคับ) ต้องมี `role="slider"` `aria-valuenow` `aria-valuemin` `aria-valuemax` ชื่อที่อ่านได้ และ `aria-valuetext` เมื่อตัวเลขเปล่าไม่สื่อ **แบบสองปุ่มจับ ปุ่มจับแต่ละอันเป็นจุดโฟกัสของตัวเอง ลำดับแท็บคงที่** และ APG ให้ปรับ min max ของอีกปุ่มตาม แต่ Radix ไม่ทำ **ก้าวใหญ่ของแต่ละเจ้าไม่ตรงกัน** Radix 10 ขั้น, APG ตัวอย่างเครื่องเล่นสื่อ 15 ขั้น, Carbon ใช้ Shift บวกลูกศร 4 ขั้นในโค้ดแต่เอกสารเขียนว่า 10 |
| 7 | วิธีทำใน Figma | ไฟล์เราทำตำแหน่งเป็น variant ทีละ 25 เปอร์เซ็นต์ **แบบเดียวกับ Untitled UI** (39 แบบ 2 ชุด ปุ่มจับ 24) ถ้าคูณ 5 ขนาดจะได้ 200 แบบ ถ้าย้ายสถานะเข้ามาด้วยจะเกิน 1,000 **ทางที่เสนอคือ auto-layout ที่ปุ่มจับอยู่ในกรอบกว้างศูนย์ แล้วให้คนออกแบบปรับความกว้างแถบเติมเองใน instance** ลดเหลือราว 35 แบบรวมชิ้นส่วนปุ่มจับ ส่วนคุณสมบัติตัวเลขที่ขับความยาวได้ Figma ยังไม่มี `[ตีความ]` |
| 8 | การใช้บนเว็บข่าว | **ไม่พบหลักฐานว่าเว็บข่าวใช้ slider เป็นตัวควบคุมหลัก** กรณีที่มีเหตุผลคือ เครื่องคำนวณและตัวกรองตัวเลขในเว็บธุรกิจ และแถบเลื่อนตำแหน่งของเครื่องเล่นเสียงหรือวิดีโอ ส่วน **ช่วงวันที่ไม่ควรใช้ slider** และ **ขนาดตัวอักษรที่มี 3 ถึง 5 ระดับ ปุ่ม A- A+ หรือตัวเลือกแบบกลุ่มเหมาะกว่า** แถบเลื่อนของเครื่องเล่นสื่อใช้ `role="slider"` เหมือนกันแต่พฤติกรรมต่างพอที่จะควรเป็น component แยก |

---

## 2. สถานะปัจจุบันของ NTGDS หน้า 17 `[จากบรีฟ]`

| หัวข้อ | ค่าปัจจุบัน |
|---|---|
| ชุด | `Sliders` 40 แบบ |
| ชนิด | สองปุ่มจับอย่างเดียว ไม่มีแบบค่าเดียว |
| ตำแหน่งปุ่มจับ | เป็น variant ซ้าย 0, 25, 50, 75 และขวา 25, 50, 75, 100 เปอร์เซ็นต์ |
| แกน Label | 4 ค่า ไม่มี, ข้อความล่าง, tooltip ล่าง, tooltip บน |
| ขนาด | 1 ขนาด ราง 8 ปุ่มจับวงกลม 24 ความยาว 320 ตายตัว |
| สถานะปุ่มจับ | Default, Hover, Focused ไม่มี disabled และไม่มีสถานะกด |

**ข้อสังเกต `[ตีความ]`** ตัวเลขทุกตัวตรงกับ Untitled UI ทั้งราง 8 (`h-2`) ปุ่มจับ 24 (`size-6`) กรอบรางสูง 24 (`h-6`) ตำแหน่งทีละ 25 เปอร์เซ็นต์ ป้ายสามแบบ และสถานะ default hover focused ([ซอร์ส Untitled UI](https://github.com/untitleduico/react/blob/main/components/base/slider/slider.tsx) และ [หน้า Figma kit](https://www.untitledui.com/components/sliders)) จึงน่าจะมาจาก kit นั้น **ข้อดีคือค่าชุดนี้มีโค้ดจริงรองรับ ข้อเสียคือ kit นั้นออกแบบให้มีขนาดเดียว** ระบบเราต้องการ 5 ขนาดจึงต้องคิดโครงใหม่ ไม่ใช่แค่คูณของเดิม

**ความยาวตายตัว 320** ขัดกับการใช้งานจริง slider ส่วนใหญ่ยืดเต็มความกว้างของกรอบแม่ Carbon กำหนดช่วงไว้ที่ 200 ถึง 640 `[ทางการ]` Fluent กำหนดต่ำสุด 120 `[ทางการ]`

---

## 3. แบบค่าเดียวกับแบบช่วง

### 3.1 ตารางรวม

| เจ้า | โครงในโค้ด | หลักฐาน |
|---|---|---|
| Shopify Polaris | **ตัวเดียว** `RangeSlider` ถ้า `value` เป็นอาร์เรย์จะเรนเดอร์ `DualThumb` ถ้าเป็นตัวเลขจะเรนเดอร์ `SingleThumb` | `isDualThumb(value) { return Array.isArray(value) }` ใน `RangeSlider.js` `[ทางการ]` |
| Ant Design | **ตัวเดียว** สลับด้วย prop `range` | `range?: false` กับ `range: true \| SliderRange` ใน `slider/index.d.ts` `[ทางการ]` |
| Chakra UI v3 | **ตัวเดียว** จำนวนปุ่มจับตามความยาวอาร์เรย์ | recipe มี slot `thumb` ชุดเดียว `[ทางการ]` |
| Radix | **ตัวเดียว** จำนวนปุ่มจับตามอาร์เรย์ | ตั้งชื่อปุ่มจับอัตโนมัติ `Minimum` กับ `Maximum` เมื่อมี 2 ค่า `[ทางการ]` |
| Uber Base Web | **ตัวเดียว** `value: Array<number>` เสมอ | `slider/types.d.ts` `[ทางการ]` |
| Material 3 เว็บ | **ตัวเดียว** สลับด้วย `range` | `slider.d.ts` มี `range: boolean`, `valueStart`, `valueEnd` `[ทางการ]` |
| News UK NewsKit | **ตัวเดียว** รองรับหลายปุ่มจับ | "The slider supports multiple values" `[ทางการ]` |
| Untitled UI | **ตัวเดียวในโค้ด** (React Aria) แต่ Figma แยก 2 ชุด | ซอร์สกับหน้า kit `[ทางการ]` |
| Material 3 Android | **แยก** `Slider` กับ `RangeSlider` | เอกสาร `Slider.md` `[ทางการ]` |
| React Spectrum | **แยก** `Slider` กับ `RangeSlider` | `@react-spectrum/slider` export สองตัว `[ทางการ]` |
| IBM Carbon | **เอกสารแยก โค้ดรวม** หน้า Default slider กับ Range slider แยกกัน แต่โค้ดคือ `Slider` ตัวเดียวที่เปิดแบบช่วงด้วย `unstable_valueUpper` | `usage.mdx` กับ `Slider.d.ts` `[ทางการ]` |
| Fluent 2 | **ค่าเดียวเท่านั้น** `value?: number` | `index.d.ts` `[ทางการ]` |
| Atlassian | **ค่าเดียวเท่านั้น** `@atlaskit/range` รับ `value?: number` | `range.d.ts` `[ทางการ]` |
| Salesforce Lightning | **ค่าเดียวเท่านั้น** ใช้ `<input type="range">` | CSS `slds-slider__range` `[ทางการ]` |
| Apple HIG | **ค่าเดียว** ไม่มีแบบช่วงในระบบ | หน้า Sliders ไม่พูดถึงแบบช่วง `[ทางการ]` |
| GOV.UK, GitHub Primer | **ไม่มี slider** | รายชื่อ component 42 ตัวของ GOV.UK ไม่มี, แพ็กเกจ `@primer/react` 38.40 ไม่มีไฟล์ slider `[ทางการ]` |

### 3.2 อ่านความหมาย `[ตีความ]`

**เหตุผลที่ฝั่งรวมชนะในโค้ด** คือกลไกเหมือนกันทุกอย่าง ต่างกันแค่จำนวนปุ่มจับ Polaris ทำให้เห็นว่า API ที่เป็นธรรมชาติที่สุดคือดูจากรูปของค่า ไม่ต้องมี prop เพิ่ม

**เหตุผลที่ฝั่งแยกยังมีอยู่** คือแบบช่วงมีภาระที่แบบค่าเดียวไม่มี ต้องตั้งชื่อปุ่มจับสองชื่อ ต้องจัดการปุ่มจับชนกัน ต้องมีช่องกรอกสองช่อง และ Baymard พบว่า **ผู้ทดสอบมากกว่า 50 เปอร์เซ็นต์อ่านแบบช่วงผิดว่าเป็นแบบค่าเดียว** `[แหล่งรอง]` การแยกชื่อให้ชัดตั้งแต่ใน Assets จึงช่วยคนออกแบบเลือกถูก

**การที่ไฟล์เรามีแต่แบบช่วง** สวนทางกับตลาด ทุกเจ้าที่มี slider มีแบบค่าเดียวเป็นพื้นฐาน และ 4 เจ้ามีแค่แบบค่าเดียว

---

## 4. ขนาด

### 4.1 ตารางรวมทุกเจ้า (หน่วย px ยกเว้นระบุ)

| เจ้า | จำนวนขนาด | ราง | ปุ่มจับ | ราง ต่อ ปุ่มจับ `[คำนวณ]` | แถว หรือ กรอบรวม |
|---|---|---|---|---|---|
| Material 3 รุ่นใหม่ (Expressive) | 5 | XS 16, S 24, M 40, L 56, XL 96 | แท่งตั้งกว้าง 4 สูง 44, 44, 44, 68, 108 | ไม่เทียบได้ คนละทรง | ปุ่มจับสูงกว่ารางเสมอ พื้นที่แตะ 48dp |
| Material 3 รุ่นก่อน (token v0_192 ที่ `md-slider` ใช้) | 1 | 4 | 20 วงกลม | 0.20 | กล่อง 40 วงแหวนโฟกัส 48 |
| Adobe Spectrum (`handle-size-*` ที่ spectrum-css 6.4 ใช้) | 4 | 2 | S 14, M 16, L 18, XL 20 (จอสัมผัส 18, 20, 22, 26) | 0.14, 0.13, 0.11, 0.10 | แถว = `component-height` 24, 32, 40, 48 (จอสัมผัส 30, 40, 50, 60) |
| Adobe Spectrum (ชุด token อีกชุดในแพ็กเกจเดียวกัน) | 4 | M 4, L 16 | 18, 20, 22, 24 | 0.20 | ไม่ยืนยันว่าใช้ที่ไหน ดูหัวข้อ 13 |
| IBM Carbon | 1 | 2 | 14 ขยายเป็น 20 ตอนชี้ โฟกัส กด (scale 1.4286) ปุ่มจับแบบช่วง 16 คูณ 24 | 0.14 | ระยะขอบบนล่าง 16 รวมราว 34 `[คำนวณ]` |
| Shopify Polaris | 1 | 4 | 16 | 0.25 | แบบค่าเดียวสูง 16 ขยายเป็น 44 เมื่อจอกว้างไม่เกิน 30.6225em แบบช่วงสูงอย่างน้อย 28 |
| Atlassian | 1 | 4 (ส่วนเติม 6) | 16 | 0.25 | input สูง 40 |
| Ant Design | 1 | 4 | 10 (`controlHeightLG / 4`) ขยายเป็น 12 | 0.40 | ราก `railSize x 3` = 12 `[คำนวณ]` |
| Fluent 2 | 2 | small 2, medium 4 | small 16, medium 20 | 0.13, 0.20 | สูงต่ำสุด 24 กับ 32 |
| Uber Base Web | 1 | 2 | 24 | 0.08 | ระยะขอบรอบราง 16 รวมราว 34 `[คำนวณ]` |
| Chakra UI v3 | 3 | sm 6, md 8, lg 10 | sm 16, md 20, lg 24 | 0.38, 0.40, 0.42 | ไม่กำหนด |
| Salesforce Lightning | 1 (ขนาดที่มีคือความกว้าง) | 4 | 16 | 0.25 | ไม่กำหนด |
| Untitled UI | 1 | 8 | 24 | 0.33 | กรอบราง 24 |
| **NTGDS ปัจจุบัน** | **1** | **8** | **24** | **0.33** | **ไม่มี** |

แหล่ง ไฟล์ในหัวข้อ 14 ทุกแถว `[ทางการ]` ยกเว้นช่องที่กำกับ `[คำนวณ]`

### 4.2 ข้อสังเกต

1. **Spectrum คือแบบอย่างที่ตรงกับระบบเราที่สุด** เพราะเป็นเจ้าเดียวที่มีหลายขนาดแล้วผูกแถวเข้ากับสเกลความสูงกลาง `--spectrum-slider-control-height: var(--spectrum-component-height-75)` ที่ขนาด S และไล่ไป 100, 200, 300 ที่ M, L, XL `[ทางการ]` ภาพปุ่มจับกับรางมีสเกลของตัวเอง แยกจากแถว **เป็นโครงสองชั้นแบบเดียวกับที่เราใช้ในสวิตช์และช่องติ๊ก**
2. **ปุ่มจับทุกเจ้าโตทีละ 2 ถึง 4** (Spectrum 2, Fluent 4, Chakra 4) รางโตทีละ 2 หรือคงที่
3. **ไม่มีเจ้าไหนให้รางโตในอัตราเดียวกับปุ่มจับ** ยกเว้น Material 3 รุ่นใหม่ที่เปลี่ยนทรงทั้งหมด
4. **ของเราหนากว่าตลาด** ราง 8 หนาเป็นสองเท่าของค่าที่พบบ่อยที่สุด (4) และปุ่มจับ 24 อยู่ที่ขอบบนของช่วง `[ตีความ]` ไม่ได้ผิด เพราะผู้ใช้เราอยู่บนมือถือมากกว่า 70 เปอร์เซ็นต์ และ Chakra ขนาด lg กับ Base Web ก็ใช้ 24 แต่ถ้าเปิด 5 ขนาดโดยให้ 24 อยู่ตรงกลาง ขนาดใหญ่สุดจะใหญ่มาก ดูข้อเสนอในหัวข้อ 12

---

## 5. พื้นที่แตะ

### 5.1 เกณฑ์

| เกณฑ์ | ค่า | ระดับ |
|---|---|---|
| WCAG 2.2 SC 2.5.8 Target Size (Minimum) | 24 คูณ 24 CSS px | AA |
| WCAG 2.2 SC 2.5.5 Target Size (Enhanced) | 44 คูณ 44 CSS px | AAA |
| Apple iOS และ iPadOS | ค่าเริ่มต้น 44 คูณ 44 pt ค่าต่ำสุด 28 คูณ 28 pt | คำแนะนำ |
| Android Material | พื้นที่แตะปุ่มจับ 48dp เป็นค่าเริ่มต้น | คำแนะนำ |

**ข้อที่สำคัญที่สุดของ slider** `[มาตรฐาน]` หมายเหตุข้อ 1 ของ SC 2.5.8 เขียนว่า

> "Targets that allow for values to be selected spatially based on position within the target are considered one target for the purpose of the success criterion. Examples include sliders, color pickers displaying a gradient of colors, or editable areas where you position the cursor."

**แปลว่าตัวที่ต้องสูงอย่างน้อย 24 คือพื้นที่กดของ slider ทั้งแถบ ไม่ใช่ปุ่มจับ** `[ตีความ]` ถ้ารางที่กดได้สูง 8 แต่แถวที่กดได้สูง 24 ขึ้นไป ก็ผ่าน ในทางกลับกันถ้าเขียนโค้ดให้กดได้เฉพาะรางกับปุ่มจับ ความสูงที่นับจะเป็นปุ่มจับ 24 ซึ่งผ่านแบบพอดีเส้น

**และมีเกณฑ์อีกข้อที่ slider ต้องผ่าน** SC 2.5.7 Dragging Movements (AA ใน WCAG 2.2) กำหนดว่าทุกอย่างที่ทำด้วยการลากต้องทำได้ด้วยการแตะครั้งเดียว เอกสาร W3C ยกตัวอย่าง slider ตรง ๆ ว่า "an alternative pointer method to change the value is to click/tap anywhere on the slider track" และ "an input beside a slider could allow any user to enter a precise value" `[มาตรฐาน]` **นี่คือเหตุผลเชิงมาตรฐานที่ทั้งแถวต้องกดได้ ไม่ใช่แค่ปุ่มจับ**

### 5.2 ใครทำอย่างไร

| เจ้า | ภาพ | พื้นที่แตะจริง | วิธี |
|---|---|---|---|
| Material 3 Android | ปุ่มจับ 4 คูณ 44 | **48dp** | `minTouchTargetSize` ค่าเริ่มต้น 48dp `[ทางการ]` |
| Material 3 เว็บ | ปุ่มจับ 20 | **กล่อง 40 วงแหวนโฟกัส 48** | `.container { block-size: var(--_state-layer-size) }` = 40 และ `md-focus-ring { height: 48px; width: 48px }` `[ทางการ]` |
| Adobe Spectrum | ปุ่มจับ 14 ถึง 20 | **แถว 24 ถึง 48 เดสก์ท็อป 30 ถึง 60 จอสัมผัส** | แถบควบคุมสูงเท่า `component-height` แล้ววางรางกับปุ่มจับกึ่งกลาง **โครงสองชั้น** `[ทางการ]` |
| Atlassian | ปุ่มจับ 16 | **สูง 40** | input โปร่งใสสูง 40 ครอบราง `[ทางการ]` |
| Shopify Polaris | ปุ่มจับ 16 | **16 บนจอกว้าง 44 บนจอแคบ** | `@media (max-width: 30.6225em)` ยกกรอบ input เป็น 2.75rem `[ทางการ]` |
| IBM Carbon | ปุ่มจับ 14 | ราว 34 `[คำนวณ]` | ระยะขอบบนล่าง `$spacing-05` (16) ที่กรอบ slider ซึ่งกดได้ทั้งกรอบ `[ทางการ]` |
| Uber Base Web | ปุ่มจับ 24 | ราว 34 `[คำนวณ]` | ระยะขอบ `scale600` รอบราง `[ทางการ]` |
| Fluent 2 | ปุ่มจับ 16 และ 20 | **24 และ 32** | `min-height` ของราก `[ทางการ]` |
| Ant Design | ปุ่มจับ 10 | ราว 12 ถึง 14 `[คำนวณ]` | ขยายแค่ `::before` ของปุ่มจับออกข้างละ 2 ไม่มีการขยายเพื่อจอสัมผัส `[ทางการ]` |
| Untitled UI | ปุ่มจับ 24 | 24 | กรอบราง `h-6` `[ทางการ]` |

**ข้อสรุป `[ตีความ]`** เจ้าที่ผ่าน 44 ถึง 48 บนจอสัมผัสได้จริงคือ Material 3, Spectrum และ Polaris ทุกเจ้าทำด้วย **ชั้นที่มองไม่เห็นที่สูงกว่าภาพ** ไม่มีใครขยายปุ่มจับที่ตาเห็นให้ถึง 44 ตรงกับเหตุผลที่เราทำโครงสองชั้นในช่องติ๊กและปุ่มตัวเลือก

**ปัญหาเฉพาะของแบบช่วง** เมื่อปุ่มจับสองอันเข้าใกล้กัน พื้นที่แตะจะทับกัน Polaris ใช้ z-index ให้ปุ่มจับอยู่คนละชั้น `[ทางการ]` Radix ใช้ปุ่มจับที่ใกล้จุดกดที่สุด และมี `minStepsBetweenThumbs` กันไม่ให้ชิดกันเกิน `[ทางการ]` Baymard เสนอให้ปุ่มจับแบบช่วงมีรูปลูกศรหันออก เพื่อบอกว่ามีสองค่า `[แหล่งรอง]` ซึ่ง Carbon ทำจริงด้วยปุ่มจับทรง 16 คูณ 24 ที่ต่างจากแบบค่าเดียว `[ทางการ]`

---

## 6. การแสดงค่า

| รูปแบบ | ใครทำ | ใช้เมื่อไหร่ |
|---|---|---|
| **tooltip เหนือปุ่มจับ** แสดงตอนชี้ โฟกัส หรือลาก | Polaris (โผล่ตอน `:active` และ `:hover`), Ant, Material 3 (`labeled`), Carbon (เมื่อซ่อนช่องกรอก), NewsKit, Untitled UI | ค่าต้องเห็นตอนกำลังปรับ แต่ไม่ต้องค้างไว้ Carbon เขียนชัดว่า "Use a tooltip on hover if the slider does not have number inputs" `[ทางการ]` |
| **tooltip ค้างตลอด** | Base Web `persistentThumb` | ต้องเห็นค่าตลอดเวลาโดยไม่ต้องแตะ |
| **ข้อความค่าต่ำสุดสูงสุดที่ปลายราง** | Carbon, NewsKit, Base Web, Apple (แนะนำไอคอนหรือป้ายสองฝั่ง) | บอกขอบเขตให้รู้ก่อนลาก Apple บอกว่า "labeling only the minimum and maximum values is sufficient" `[ทางการ]` |
| **ช่องกรอกตัวเลขคู่ขนาน** | Carbon (ค่าเริ่มต้น แบบช่วงมีสองช่อง), Polaris (`prefix` `suffix`), Apple แนะนำคู่กับ text field และ stepper | ค่าที่ต้องแม่นยำ หรือช่วงค่ากว้าง Baymard ให้ "Always accompany numeric sliders with input fields" `[แหล่งรอง]` |
| **จุดขั้น (tick marks หรือ stop indicators)** | Material 3 (`ticks` จุดขนาด 4), Ant (`dots` 8 และ `marks`), Spectrum (`--tick`), Fluent (เส้นแบ่งตาม step), Chakra (`marker`), Apple macOS | ค่ามีจำนวนขั้นไม่มาก และผู้ใช้ต้องรู้ว่าหยุดได้ตรงไหน Apple "Use tick marks to increase clarity and accuracy" `[ทางการ]` |

**ข้อสังเกต `[ตีความ]`**
- **ไม่พบเจ้าไหนวาง tooltip ใต้ปุ่มจับ** เหตุผลที่น่าจะเป็นคือบนจอสัมผัส นิ้วที่ลากอยู่ใต้หรือทับปุ่มจับ tooltip ด้านล่างจะถูกนิ้วบัง แกน Label ค่า "tooltip ล่าง" ของเราจึงไม่มีที่ใช้
- **จุดขั้นกับช่องกรอกเป็นคนละทางแก้** จุดขั้นช่วยเมื่อขั้นน้อย ช่องกรอกช่วยเมื่อค่าละเอียด Carbon เตือนว่าอย่าใช้ slider กับช่วงแคบมากอย่าง 1 ถึง 3 และช่วงกว้างมากอย่าง 1 ถึง 1000 `[ทางการ]`
- **Baymard ยังเสนอให้สเกลไม่เป็นเส้นตรง** สำหรับตัวกรองราคา และพบว่า 83 เปอร์เซ็นต์ของเว็บ 50 อันดับแรกใช้สเกลเส้นตรงทั้งที่สินค้ากระจุกตัว `[แหล่งรอง]` เป็นเรื่องของโค้ด ไม่กระทบไฟล์ออกแบบ

---

## 7. สถานะ

### 7.1 ตารางสถานะ

| เจ้า | hover | กดหรือลาก | โฟกัส | disabled | error | อื่น ๆ | วงแหวนโฟกัสอยู่ที่ |
|---|---|---|---|---|---|---|---|
| Material 3 | มี | มี ปุ่มจับแคบลงจาก 4 เป็น 2 | มี ปุ่มจับแคบลงเป็น 2 | มี | ไม่มี | | ปุ่มจับ (วง 48) |
| Spectrum | มี | มี เส้นขอบปุ่มจับหนาขึ้น (`handle-border-width-down` 5 ถึง 8) | มี | มี | ไม่มี | | ปุ่มจับ (`::before`) |
| Carbon | มี ปุ่มจับขยาย 1.43 เท่า | มี ขยายเท่ากัน | มี ขยายเท่ากัน | มี | **มี error และ warning** | read-only, skeleton | ปุ่มจับ |
| Polaris | มี (โผล่ tooltip) | มี | มี | มี | **มี** แถบเติมเป็นสีวิกฤต | | ปุ่มจับ |
| Ant | มี ปุ่มจับขยาย 10 เป็น 12 | มี | มี | มี | ไม่มี | | ปุ่มจับ |
| Fluent 2 | มี | มี | มี | มี | ไม่มี | | **ทั้งตัว** (`:focus-within` ที่ราก) |
| Base Web | ไม่พบใน styled | ไม่พบ | มี เงา 3px | มี | ไม่มี | | ปุ่มจับ |
| Atlassian | มี | มี | มี | มี | ไม่มี | | ปุ่มจับ |
| Chakra | ไม่พบใน recipe | ไม่พบใน recipe | มี | มี | ไม่มี | | ปุ่มจับ |
| SLDS | มี | มี | มี | ไม่ได้ตรวจ | ไม่ได้ตรวจ | | ปุ่มจับ |
| NewsKit | มี | มี (active) | มี | มี | ไม่มี | | ไม่ระบุ |
| Untitled UI | มี | มี (`isDragging`) | มี | ไม่พบ | ไม่มี | | ปุ่มจับ (`outline-offset-2`) |
| **NTGDS ปัจจุบัน** | มี | **ไม่มี** | มี | **ไม่มี** | ไม่มี | | ปุ่มจับ `[จากบรีฟ]` |

แหล่ง ไฟล์ CSS หรือ style ของแต่ละเจ้า `[ทางการ]` NewsKit จากหน้าเอกสาร

### 7.2 ข้อสรุป `[ตีความ]`
- **ขาดไม่ได้คือ disabled** ทุกเจ้าที่ตรวจได้มี ยกเว้น Untitled UI ที่เป็นต้นแบบของเรา เราจึงไม่มีตาม
- **สถานะกดหรือลาก** มีเกือบทุกเจ้า แต่ **วิธีบอกต่างกันมาก** Carbon กับ Ant ขยายปุ่มจับ Material 3 หดปุ่มจับ Spectrum ทำเส้นขอบหนา Polaris โผล่ tooltip
- **วงแหวนโฟกัสต้องอยู่ที่ปุ่มจับ** เพราะแบบช่วงมีสองจุดโฟกัส วงแหวนทั้งตัวแบบ Fluent บอกไม่ได้ว่าโฟกัสอยู่ที่ปุ่มไหน Fluent ทำได้เพราะมีแค่แบบค่าเดียว
- **error เป็นเรื่องของฟอร์ม ไม่ใช่ของ slider เอง** มีแค่สองเจ้าที่ทำ และทั้งคู่ผูกกับการตรวจค่าในช่องกรอกหรือฟอร์ม

---

## 8. คีย์บอร์ดและการเข้าถึง

### 8.1 ข้อกำหนดของ APG `[มาตรฐาน]`

| ปุ่ม | ผล |
|---|---|
| ลูกศรขวา ลูกศรขึ้น | เพิ่มหนึ่งขั้น |
| ลูกศรซ้าย ลูกศรลง | ลดหนึ่งขั้น |
| Home | ไปค่าต่ำสุด |
| End | ไปค่าสูงสุด |
| Page Up Page Down | เพิ่มลดก้าวใหญ่ **ไม่บังคับ** |

| attribute | บังคับ | หมายเหตุ |
|---|---|---|
| `role="slider"` | บังคับ | `<input type="range">` มีให้อัตโนมัติ |
| `aria-valuenow` `aria-valuemin` `aria-valuemax` | บังคับ | |
| `aria-label` หรือ `aria-labelledby` | บังคับ | |
| `aria-valuetext` | เมื่อตัวเลขเปล่าไม่สื่อ | เช่น "1,500 บาท" หรือ "4 นาที 3 วินาที" |
| `aria-orientation` | เฉพาะแนวตั้ง | |

**แบบสองปุ่มจับ** APG Multi-Thumb กำหนดว่า "Each thumb is in the page tab sequence" และ "The tab order remains constant regardless of thumb value and visual position" ส่วนค่าที่พึ่งกัน "the values of aria-valuemin or aria-valuemax of the dependent sliders are updated when the value changes" `[มาตรฐาน]`

### 8.2 แต่ละเจ้าทำจริงอย่างไร

| เจ้า | ก้าวใหญ่ | Home End | ชื่อปุ่มจับแบบช่วง | min max ของปุ่มจับแบบช่วง |
|---|---|---|---|---|
| Radix | Page Up Down และ Shift บวกลูกศร **10 ขั้น** | มี | ตั้งให้อัตโนมัติ `Minimum` `Maximum` | **ใช้ min max รวมทั้งตัว ไม่ปรับตามอีกปุ่ม** กันชนด้วย `minStepsBetweenThumbs` แทน |
| IBM Carbon | Shift บวกลูกศร **4 ขั้นในโค้ด** (`stepMultiplier = 4`) แต่ `Slider.d.ts` เขียนว่า `(max - min) / stepMultiplier` และหน้า usage เขียนว่า 10 ขั้น | **ไม่มีในตัวจัดการปุ่มของปุ่มจับ** (โค้ดคืนค่าทันทีถ้าไม่ใช่ลูกศร) | ชื่อช่องกรอกแยก | ปรับตาม |
| Material 3 เว็บ, Polaris, Atlassian, SLDS | ตามเบราว์เซอร์ เพราะใช้ `<input type="range">` จริง | ตามเบราว์เซอร์ | Material 3 มี `valueLabelStart` `valueLabelEnd` | ตามโค้ดของแต่ละเจ้า |
| APG ตัวอย่างเครื่องเล่นสื่อ | Page Up Down **15 ขั้น** | มี | ไม่เกี่ยว | ไม่เกี่ยว |

**ข้อค้นพบ** เอกสารกับโค้ดของ Carbon ให้ค่าก้าวใหญ่ไม่ตรงกันถึงสามแบบ และหน้า usage ของ Carbon อธิบาย Home End ของแบบช่วงว่าเลื่อนโฟกัสไปที่ "range selector header" ซึ่งดูเป็นข้อความที่คัดลอกมาจาก component อื่น `[ตีความ]` **สรุปว่าไม่ควรยึด Carbon เรื่องคีย์บอร์ด ให้ยึด APG**

**แนวทาง `[ตีความ]`** ใช้ `<input type="range">` จริงเป็นฐาน (แบบที่ Material 3, Polaris, Atlassian ทำ) ได้ role คีย์บอร์ด และการอ่านหน้าจอมาฟรี แบบช่วงใช้ input สองตัวซ้อนกันแบบ Material 3 เว็บ (`.ranged input.start` กับ `.ranged input.end`) ตั้งก้าวใหญ่ 10 ขั้นตาม Radix และตั้ง `aria-valuetext` เป็นภาษาไทยพร้อมหน่วยเสมอ

---

## 9. วิธีทำใน Figma

### 9.1 ของที่ยืนยันได้

**Untitled UI** `[ทางการ]` เขียนบนหน้า kit ว่ามี "39 total variants across 2 components" ตำแหน่งปุ่มจับเป็น variant "in 25% increments (0%, 25%, 50%, 75%, 100%)" ป้ายสามแบบ "value labels below the track, labels floating above the handles, or a tooltip attached to the handle itself" และสถานะ "default, hover, and focused" **ตรงกับไฟล์เราทุกข้อ** และ kit นี้มีขนาดเดียว

**Material 3 Design Kit, Carbon, Polaris, Atlassian** ไม่ได้เปิดไฟล์ดู ดูหัวข้อ 13

### 9.2 เทียบสามทาง `[ตีความ]`

| ทาง | วิธี | จำนวนแบบเมื่อมี 5 ขนาด | ข้อดี | ข้อเสีย |
|---|---|---|---|---|
| **ก. variant ตำแหน่ง (แบบปัจจุบัน)** | ทุกคู่ตำแหน่งเป็นแบบหนึ่ง | แบบช่วง 10 คู่ คูณ ป้าย 4 คูณ 5 ขนาด = **200** ถ้าย้ายสถานะ 5 ค่าเข้ามาในชุดเดียวกันด้วยจะเป็น **1,000** และยังไม่รวมแบบค่าเดียว | สลับด้วยเมนูได้ทันที ทำ prototype ลากระหว่างจุดได้ | ได้แค่ทีละ 25 เปอร์เซ็นต์ ค่าอื่นทำไม่ได้โดยไม่ detach ไฟล์หนัก แก้หนึ่งอย่างต้องแก้หลายร้อยแบบ |
| **ข. auto-layout ปรับความยาวแถบเติมเอง** | รางเป็นแถว auto-layout แนวนอน เรียง `ช่วงว่างก่อน` `จุดยึดปุ่มจับ` `แถบเติม` `จุดยึดปุ่มจับ` `ช่วงว่างหลัง` จุดยึดกว้าง 0 ไม่ตัดขอบ ปุ่มจับวางกึ่งกลางล้นออกมา ช่วงว่างหลังเป็น FILL ส่วนช่วงว่างก่อนและแถบเติมเป็นความกว้างตายตัวที่คนออกแบบปรับเองใน instance | **ราว 35** (ชิ้นส่วนปุ่มจับ 5 ขนาด คูณ 5 สถานะ = 25 บวกแบบค่าเดียว 5 บวกแบบช่วง 5) | ได้ทุกตำแหน่ง ไม่ใช่แค่ 25 เปอร์เซ็นต์ ยืดความยาวได้ จำนวนแบบไม่คูณกับตำแหน่ง | ต้องปรับตัวเลขความกว้างเอง ไม่ snap ตามขั้น คนออกแบบอาจใส่ความกว้างเกินราง ต้องทดลองก่อนว่าการปรับขนาดชั้นในของ instance คงค่าไว้เมื่อแก้ต้นฉบับ |
| **ค. คุณสมบัติตัวเลข** | ใช้ค่าตัวเลขขับความยาว | ต่ำที่สุด | ตรงกับโค้ดที่สุด | **Figma ยังไม่มีคุณสมบัติ component ชนิดตัวเลขที่ขับขนาดได้** ชนิดที่มีคือ variant, boolean, text และ instance swap การผูกตัวแปรตัวเลขเข้ากับความกว้างทำได้ แต่ค่าต่อ instance ต้องสลับด้วย mode จึงไม่เหมาะ `[ตีความ]` ต้องตรวจซ้ำกับ Figma รุ่นปัจจุบัน |

**ข้อควรรู้ของทาง ข.**
- สถานะไม่ต้องอยู่ในชุด slider เพราะอยู่ในชิ้นส่วนปุ่มจับที่ซ้อนอยู่ แล้วเปิด "expose nested instances" ให้เลือกสถานะได้จากแผงด้านขวา
- ป้ายค่าเปลี่ยนจาก variant 4 ค่าเป็น boolean หลายตัว เช่น `value-tooltip` กับ `min-max-label` จึงไม่คูณจำนวนแบบ
- tooltip ต้องเป็น instance ของ component tooltip ในระบบ ห้ามวาดใหม่ ตามกฎ CLAUDE.md
- ชิ้นส่วนปุ่มจับใช้ซ้ำทั้งแบบค่าเดียวและแบบช่วง ตามกฎการตั้งชื่อของเรา ต้องตัดสินว่าจะเป็น `_slider-handle` (ไม่ publish) หรือ `slider-handle` (publish) ดูหัวข้อ 15

---

## 10. การใช้บนเว็บข่าว

| กรณี | ควรใช้ slider ไหม `[ตีความ]` | เหตุผลและแหล่ง |
|---|---|---|
| **ตัวกรองช่วงราคา ช่วงตัวเลข** เช่น เครื่องมือค้นอสังหา กองทุน หรือเครื่องคำนวณในเว็บธุรกิจ (bangkokbiznews, thansettakij, posttoday) | ใช้ได้ **ต้องคู่ช่องกรอกเสมอ** | Baymard พบว่าแบบช่วงถูกอ่านผิดเกิน 50 เปอร์เซ็นต์ และผู้ทดสอบหลายคนยอมแพ้แล้วไปพิมพ์ในช่องกรอก `[แหล่งรอง]` ยังไม่ได้ตรวจว่าเว็บในเครือมีเครื่องมือแบบนี้จริงหรือไม่ |
| **ช่วงวันที่** | **ไม่ควร** | Carbon ห้ามใช้กับช่วงกว้างมากและค่าที่ไม่ใช่ตัวเลขธรรมดา `[ทางการ]` วันที่เป็นทั้งสองอย่าง ใช้ตัวเลือกวันที่แทน |
| **ปรับขนาดตัวอักษรในหน้าอ่าน** | **ไม่ควรถ้ามี 3 ถึง 5 ระดับ** ใช้ปุ่ม A- A+ หรือตัวเลือกแบบกลุ่ม | Carbon ห้ามใช้กับช่วงแคบอย่าง 1 ถึง 3 `[ทางการ]` BeeLine Reader สำรวจแอปข่าวแล้วชมแอป Apple News ที่วางปุ่มขนาดตัวอักษรไว้ทุกหน้าบทความ และ NYT ที่ให้เลือกใช้ขนาดตัวอักษรของระบบปฏิบัติการได้ `[แหล่งรอง]` ถ้าจำเป็นต้องใช้ slider ให้มีจุดขั้นทุกระดับ |
| **แถบเลื่อนตำแหน่งเครื่องเล่นเสียงและวิดีโอ (seek bar)** | ใช้ `role="slider"` เหมือนกัน **แต่ควรเป็น component แยกในตระกูลเครื่องเล่นสื่อ** | ดู 10.1 |
| **ระดับเสียง** | ระวัง | Apple "Don't use a slider to adjust audio volume" บน iOS ให้ใช้ volume view ของระบบ `[ทางการ]` บนเว็บยังต้องทำเอง |
| **ความคืบหน้าการอ่าน** | **ไม่ใช่ slider** | ผู้ใช้ปรับค่าไม่ได้ เป็น progress bar |

### 10.1 seek bar ต่างจาก slider อย่างไร

| หัวข้อ | slider ในฟอร์ม | seek bar ของเครื่องเล่นสื่อ |
|---|---|---|
| ค่าเปลี่ยนเองได้ไหม | ไม่ได้ เปลี่ยนเมื่อผู้ใช้ปรับ | **เปลี่ยนเองตลอดตอนเล่น** |
| ชั้นข้อมูลบนราง | ส่วนที่เลือกกับส่วนที่เหลือ | ส่วนที่เล่นแล้ว **ส่วนที่โหลดไว้แล้ว** และส่วนที่เหลือ |
| `aria-valuetext` | ค่าพร้อมหน่วย | เวลา เช่น "4 นาที 3 วินาที" APG ใส่ค่าสูงสุดเฉพาะตอนเริ่มและตอนออกจากโฟกัส เพื่อไม่ให้อ่านยาวเกิน `[มาตรฐาน]` |
| ก้าวใหญ่ | 10 ขั้นตาม Radix | APG ตัวอย่างเครื่องเล่นสื่อใช้ 15 ขั้น `[มาตรฐาน]` |
| สถานะเฉพาะ | ไม่มี | ภาพตัวอย่างตอนชี้ ตำแหน่งตอนลากที่ยังไม่ปล่อย |

**ข้อสรุป `[ตีความ]`** ใช้ token ของรางกับปุ่มจับร่วมกันได้ แต่ไม่ควรอยู่ในชุด component เดียวกัน เพราะมีชั้นข้อมูลและพฤติกรรมที่ slider ในฟอร์มไม่มี ถ้ายัดเข้ามาจะได้ variant ที่ใช้ได้ครึ่งเดียว

---

## 11. จุดที่เจ้าต่าง ๆ เห็นไม่ตรงกัน

| # | ประเด็น | ฝั่งหนึ่ง | อีกฝั่ง |
|---|---|---|---|
| 1 | แยกหรือรวมแบบช่วง | รวม 8 เจ้า (Polaris, Ant, Chakra, Radix, Base Web, Material 3 เว็บ, NewsKit, Untitled UI) | แยก 2 เจ้า (Material 3 Android, React Spectrum) และ Carbon ที่เอกสารแยกแต่โค้ดรวม |
| 2 | วงแหวนโฟกัส | ปุ่มจับ 10 เจ้า | ทั้งตัว Fluent 2 |
| 3 | รูปทรงปุ่มจับตอนโต้ตอบ | ขยาย Carbon (1.43 เท่า) และ Ant (10 เป็น 12) | หด Material 3 (4 เป็น 2) เปลี่ยนแค่เส้นขอบ Spectrum ไม่เปลี่ยนทรง Polaris Base Web |
| 4 | ก้าวใหญ่ของคีย์บอร์ด | Radix 10 ขั้น | APG ตัวอย่างสื่อ 15 ขั้น Carbon โค้ด 4 ขั้น เอกสาร 10 ขั้น |
| 5 | min max ของปุ่มจับแบบช่วง | APG ให้ปรับตามอีกปุ่ม | Radix คงค่ารวมทั้งตัว |
| 6 | คลิกบนรางของแบบช่วง | W3C ยกการแตะบนรางเป็นทางเลือกแทนการลากตาม SC 2.5.7 | Baymard ให้ **ปิด** การคลิกบนรางของแบบช่วง แล้วบอกให้ลากแทน เพราะไม่รู้ว่าผู้ใช้ตั้งใจเลื่อนปุ่มไหน **ทางที่ผ่านทั้งคู่คือมีช่องกรอก** ซึ่ง W3C ยอมรับเป็นทางเลือกแทนการลาก |
| 7 | error | Carbon กับ Polaris มี | ที่เหลือไม่มี (SLDS ไม่ได้ตรวจ) |
| 8 | ช่องกรอกคู่ขนาน | Carbon เปิดเป็นค่าเริ่มต้น Baymard บังคับสำหรับตัวกรองตัวเลข | ที่เหลือเป็นทางเลือก |
| 9 | พื้นที่แตะ | Material 3 48, Spectrum 30 ถึง 60 บนจอสัมผัส, Polaris 44 บนจอแคบ | Ant ไม่ขยาย |
| 10 | ความหนาราง | บางมาก 2 (Carbon, Spectrum, Base Web, Fluent small) | หนา 8 ถึง 10 (Chakra, Untitled UI) และหนามาก 16 ถึง 96 (Material 3 รุ่นใหม่) |

---

## 12. ข้อเสนอสำหรับ Nation DS

> ทุกข้อในหัวข้อนี้เป็น `[ตีความ]` ของผู้วิจัยจากหลักฐานข้างบน รอ user ตัดสิน ยังไม่ได้แก้ไฟล์ใด

### 12.1 แยกหรือรวมแบบค่าเดียวกับแบบช่วง

**โค้ดรวมเป็นตัวเดียว ไฟล์ Figma แยกเป็นสองชุด**
- โค้ด `Slider` ตัวเดียว ดูจากรูปของค่าแบบ Polaris คือ `value: number` เป็นแบบค่าเดียว `value: [number, number]` เป็นแบบช่วง เพราะกลไกเหมือนกันทุกอย่าง และเป็นทางของฝั่งส่วนใหญ่
- Figma แยกเป็น `slider` กับ `range-slider` (ลงท้ายด้วยชนิดตามกฎการตั้งชื่อ) เพราะแผง Assets แสดงแค่ชื่อ และ Baymard พบว่าคนอ่านแบบช่วงผิดบ่อย การเห็นชื่อต่างกันตั้งแต่ตอนเลือกช่วยได้ ทั้งสองชุดใช้ชิ้นส่วนปุ่มจับตัวเดียวกัน
- **ต้องเพิ่มแบบค่าเดียว** ตอนนี้ไม่มี ทั้งที่เป็นแบบพื้นฐานของทุกเจ้า

### 12.2 ขนาด เปิด 5 ขนาด ด้วยสูตร 3 มิติ

เก็บที่ `tokens/scale/slider.mjs` ตามแบบ `toggle.mjs` และ `checkbox.mjs`

| มิติ | base | step | xs | sm | md | lg | xl | ที่มา |
|---|---|---|---|---|---|---|---|---|
| ปุ่มจับ (วงกลม) | 16 | 4 | 16 | 20 | **24** | 28 | 32 | md คงค่าเดิมของไฟล์ ขั้นเล็กสุดตรงกับค่าที่ตลาดใช้มากสุด เท่ากับบันไดความสูงรางของสวิตช์ |
| ราง | 4 | 2 | 4 | 6 | **8** | 10 | 12 | md คงค่าเดิม xs ตรงกับค่าที่ตลาดใช้มากสุด |
| แถวที่กดได้ | 24 | 8 | 24 | 32 | 40 | 48 | 56 | **อ้าง `CONTROL_HEIGHT`** ห้ามพิมพ์ซ้ำ |
| แถวบนจอสัมผัส | ไม่ใช่สูตร | ไม่ใช่สูตร | 48 | 48 | 48 | 48 | 56 | ค่าที่มากกว่าระหว่าง 48 (ค่าเดียวกับช่องติ๊ก) กับแถวปกติ |

**ค่าที่ได้จากสูตร (ไม่ตั้งแยก)**
- ช่องบนล่างระหว่างแถวกับปุ่มจับ `(แถว ลบ ปุ่มจับ) หาร 2` = 4, 6, 8, 10, 12
- ปุ่มจับยื่นพ้นรางข้างละ `(ปุ่มจับ ลบ ราง) หาร 2` = 6, 7, 8, 9, 10
- สัดส่วนราง ต่อ ปุ่มจับ = 0.25, 0.30, 0.33, 0.36, 0.38 ห่างกัน 12.5 จุด ถือว่านิ่งพอ (Chakra ห่าง 4 จุด แต่ใช้เลขไม่ลงตัว)
- มุมโค้ง `RADIUS_SCALE.full` ทั้งรางและปุ่มจับ

**ด่านตรวจที่ควรใส่ในไฟล์สูตร** แถว มากกว่าหรือเท่ากับ ปุ่มจับ, ปุ่มจับ มากกว่า ราง, ผลต่างทั้งสองคู่เป็นเลขคู่ (ได้จำนวนเต็มเมื่อหาร 2) ทั้ง 5 ขนาดผ่านหมด

**ทำไมไม่ใช้ปุ่มจับ 24 เป็นขนาดกลางแล้วให้ xl ใหญ่ถึง 32** ตรวจแล้วว่า 32 ยังเล็กกว่าปุ่ม xl (56) เกือบครึ่ง และ Material 3 ไปไกลกว่านั้นมาก จึงไม่ถือว่าเกิน แต่ **ถ้าอยากให้เบากว่า** มีทางเลือกคือ base 12 step 4 (12 ถึง 28 เท่าช่องติ๊ก) ซึ่งทำให้ค่าเดิม 24 ไปอยู่ lg และ instance ที่ใช้อยู่ต้องเปลี่ยนขนาดเป็น lg ดูหัวข้อ 15

### 12.3 โครงสองชั้นแบบช่องติ๊ก ควรใช้

**ใช้** เหตุผลสามข้อ
1. SC 2.5.8 นับ slider ทั้งตัวเป็นเป้าเดียว และ SC 2.5.7 ต้องแตะที่รางได้ ความสูงที่มีผลจริงคือแถว ไม่ใช่ปุ่มจับ
2. Spectrum ซึ่งเป็นเจ้าเดียวที่มีหลายขนาดแล้วผูกกับสเกลกลาง ทำแบบนี้ทุกประการ
3. ได้แถวที่สูงเท่าปุ่มและช่องกรอก วาง slider คู่ช่องกรอกตัวเลขในแถวเดียวกันได้พอดี ซึ่งเป็นการใช้ที่ตลาดแนะนำ

**พื้นที่แตะของปุ่มจับแต่ละอันในแนวนอน** ให้เป็นสี่เหลี่ยมจัตุรัสเท่าความสูงแถว (24 ถึง 56 และ 48 บนจอสัมผัส) สำคัญกับแบบช่วงที่ปุ่มจับอาจชิดกัน ในโค้ดให้ปุ่มจับที่ถูกเลื่อนล่าสุดอยู่ชั้นบนแบบ Polaris

### 12.4 วิธีทำตำแหน่งปุ่มจับใน Figma

**ใช้ทาง ข. auto-layout กับจุดยึดกว้างศูนย์** (หัวข้อ 9.2) และทำตามนี้
- ชุด `slider` กับ `range-slider` มีแกน variant เดียวคือ `size` ชุดละ 5 แบบ
- ความยาว FILL ตามกรอบแม่ ไม่ตายตัว 320 อีกต่อไป
- ตำแหน่งปรับด้วยความกว้างของ `ช่วงว่างก่อน` กับ `แถบเติม` ใน instance
- สถานะอยู่ที่ชิ้นส่วนปุ่มจับ (5 ขนาด คูณ 5 สถานะ) เปิด expose nested instances
- ป้ายเป็น boolean ไม่ใช่ variant
- **รวมราว 35 แบบ** เทียบกับ 200 ถึง 1,000 ถ้าคูณแบบเดิม

**ต้องทำต้นแบบทดลองหนึ่งขนาดก่อนขยายทั้งชุด** เพื่อยืนยันสองเรื่อง คือ ความกว้างที่ปรับใน instance ไม่หายเมื่อแก้ต้นฉบับ และปุ่มจับที่ล้นกรอบกว้างศูนย์แสดงผลถูกเมื่อรางยืดหด

### 12.5 สถานะที่ต้องมี

| สถานะ | ต้องมีไหม | หมายเหตุ |
|---|---|---|
| `default` | มีอยู่แล้ว | |
| `hover` | มีอยู่แล้ว | |
| `pressed` | **เพิ่ม** | บอกด้วยสีอย่างเดียว ไม่เปลี่ยนทรงหรือขนาดปุ่มจับ ให้สอดคล้องกับที่ตัดสินกับสวิตช์เมื่อ 2026-09-04 ใช้ตัวแปรสีชุด pressed ที่มีอยู่ทั้งระบบ **แต่ต้องรู้ว่าตลาดแตกเป็นสามทาง** (ขยาย หด เปลี่ยนเส้นขอบ) ไม่มีฉันทามติ |
| `focused` | มีอยู่แล้ว | |
| `disabled` | **เพิ่ม** | เกือบทุกเจ้ามี ต้องเปลี่ยนทั้งปุ่มจับ ราง และแถบเติม |
| `error` | **ยังไม่ทำ** | มีแค่ 2 เจ้า และเป็นเรื่องของฟอร์ม ให้แสดงผ่านข้อความผิดพลาดของช่องกรอกที่คู่กัน เปิดทีหลังได้ถ้าเจอกรณีจริง |
| `read-only` | ไม่ทำ | มีแค่ Carbon |

### 12.6 วงแหวนโฟกัส

**อยู่ที่ปุ่มจับ ไม่ใช่ทั้งราง** เพราะแบบช่วงมีสองจุดโฟกัส และเป็นแบบที่ 10 จาก 11 เจ้าทำ ปุ่มจับมีพื้นทึบจึงใช้ effect style `focused-ring/brand` ที่มีอยู่แล้วได้ตรง ๆ ตามกฎวงแหวนโฟกัสสองวิธีของระบบ **ต้องเติมคำว่า slider ต่อท้าย description ของ style นั้น** ตามกฎ Effect ใน CLAUDE.md แสดงที่ `:focus-visible` เท่านั้นตามหน้า 05 Effect

### 12.7 เรื่องอื่นที่ควรทำพร้อมกัน

- **ตัดแกน Label ค่า "tooltip ล่าง"** ไม่พบเจ้าไหนใช้ และนิ้วบังบนจอสัมผัส
- **tooltip ต้องเป็น instance ของ tooltip ในระบบ** ห้ามวาดเอง
- **เอกสารหน้า 17 ควรมีตัวอย่าง slider คู่ช่องกรอกตัวเลข** เป็นรูปแบบการใช้ ไม่ใช่ variant
- **เงาของปุ่มจับ** ถ้ามีอยู่ ต้องผูก effect style ที่มีอยู่ ห้ามเงาดิบ
- **seek bar ของเครื่องเล่นสื่อ** ให้แยกไปอยู่ในตระกูลเครื่องเล่นสื่อเมื่อถึงเวลา ใช้ token ราง ปุ่มจับร่วมกันได้

---

## 13. สิ่งที่ยืนยันไม่ได้ในรอบนี้

1. **โครงไฟล์ Figma ของ Material 3 Design Kit, Carbon, Polaris, Atlassian** ไฟล์ชุมชนต้องคัดลอกเข้าบัญชีก่อน และบรีฟห้ามแตะ Figma จึงไม่ได้เปิด ข้อมูลเรื่อง Figma มีแค่ Untitled UI ที่เขียนไว้บนหน้าเว็บ
2. **Spectrum มี token ปุ่มจับสองชุดในแพ็กเกจเดียวกัน** ชุด `slider-handle-size-*` (14 ถึง 20) ที่ spectrum-css 6.4 ใช้จริง กับชุด `slider-handle-*` (18 ถึง 24) และ `slider-track-height-medium` 4, `large` 16 ซึ่งน่าจะเป็นของ Spectrum 2 แต่ไม่ได้ตรวจว่า component ตัวไหนอ่าน
3. **หน้าเอกสาร m3.material.io และ spectrum.adobe.com** ดึงเนื้อหาไม่ได้ ตัวเลขของ Material 3 จึงมาจากไฟล์ token เท่านั้น ไม่ได้อ่านคำแนะนำเรื่องการเลือกขนาด
4. **Figma มีคุณสมบัติตัวเลขที่ขับขนาดได้หรือยัง** ความรู้ของผู้วิจัยคือยังไม่มี ต้องตรวจกับ Figma รุ่นปัจจุบันก่อนตัดสินทาง ข.
5. **เว็บในเครือมีเครื่องมือกรองตัวเลขหรือเครื่องคำนวณจริงหรือไม่** ยังไม่ได้สำรวจ ถ้าไม่มีเลย ความสำคัญของ slider ในระบบจะต่ำ และอาจพิจารณาเปิดน้อยกว่า 5 ขนาดได้
6. **ค่าจริงในไฟล์ Figma หน้า 17** ผู้วิจัยใช้ตัวเลขจากบรีฟ ไม่ได้วัดเอง ต้องวัดซ้ำตามกฎ "ค่า padding ที่เก็บใน Figma เชื่อไม่ได้ถ้าเฟรมเป็นขนาดตายตัว" ก่อนเขียนสูตร

---

## 14. แหล่งอ้างอิง

**ไฟล์ต้นทางที่อ่านโดยตรง (แพ็กเกจ npm เวอร์ชันที่ระบุ)**

- Material 3 เว็บ `@material/web@2.5.0` [`_md-comp-slider-xsmall.scss`](https://unpkg.com/@material/web@2.5.0/tokens/versions/latest/sass/_md-comp-slider-xsmall.scss), [`_md-comp-slider-small.scss`](https://unpkg.com/@material/web@2.5.0/tokens/versions/latest/sass/_md-comp-slider-small.scss), [`_md-comp-slider-medium.scss`](https://unpkg.com/@material/web@2.5.0/tokens/versions/latest/sass/_md-comp-slider-medium.scss), [`_md-comp-slider-large.scss`](https://unpkg.com/@material/web@2.5.0/tokens/versions/latest/sass/_md-comp-slider-large.scss), [`_md-comp-slider-xlarge.scss`](https://unpkg.com/@material/web@2.5.0/tokens/versions/latest/sass/_md-comp-slider-xlarge.scss), [`_md-comp-slider.scss` (latest)](https://unpkg.com/@material/web@2.5.0/tokens/versions/latest/sass/_md-comp-slider.scss), [`_md-comp-slider.scss` (v0_192)](https://unpkg.com/@material/web@2.5.0/tokens/versions/v0_192/_md-comp-slider.scss), [`slider/internal/_slider.scss`](https://unpkg.com/@material/web@2.5.0/slider/internal/_slider.scss), [`slider/internal/slider.d.ts`](https://unpkg.com/@material/web@2.5.0/slider/internal/slider.d.ts)
- Adobe Spectrum `@adobe/spectrum-tokens@15.4.1` [`src/slider.json`](https://unpkg.com/@adobe/spectrum-tokens@15.4.1/src/slider.json), [`src/layout.json`](https://unpkg.com/@adobe/spectrum-tokens@15.4.1/src/layout.json) และ `@spectrum-css/slider@6.4.0` [`dist/index.css`](https://unpkg.com/@spectrum-css/slider@6.4.0/dist/index.css) และ `@react-spectrum/slider@3.9.1` [`dist/import.mjs`](https://unpkg.com/@react-spectrum/slider@3.9.1/dist/import.mjs)
- IBM Carbon `@carbon/styles@1.115.0` [`scss/components/slider/_slider.scss`](https://unpkg.com/@carbon/styles@1.115.0/scss/components/slider/_slider.scss) และ `@carbon/react@1.116.0` [`Slider.js`](https://unpkg.com/@carbon/react@1.116.0/lib/components/Slider/Slider.js), [`Slider.d.ts`](https://unpkg.com/@carbon/react@1.116.0/lib/components/Slider/Slider.d.ts)
- Shopify Polaris `@shopify/polaris@13.9.5` [`build/esm/styles.css`](https://unpkg.com/@shopify/polaris@13.9.5/build/esm/styles.css), [`RangeSlider.js`](https://unpkg.com/@shopify/polaris@13.9.5/build/esm/components/RangeSlider/RangeSlider.js)
- Atlassian `@atlaskit/range@12.2.4` [`dist/es2019/styled.js`](https://unpkg.com/@atlaskit/range@12.2.4/dist/es2019/styled.js), [`styled.compiled.css`](https://unpkg.com/@atlaskit/range@12.2.4/dist/es2019/styled.compiled.css), [`range.d.ts`](https://unpkg.com/@atlaskit/range@12.2.4/dist/types/range.d.ts)
- Ant Design `antd@6.6.5` [`es/slider/style/index.js`](https://unpkg.com/antd@6.6.5/es/slider/style/index.js), [`es/slider/index.d.ts`](https://unpkg.com/antd@6.6.5/es/slider/index.d.ts)
- Microsoft Fluent 2 `@fluentui/react-slider@9.6.6` [`useSliderStyles.styles.js`](https://unpkg.com/@fluentui/react-slider@9.6.6/lib/components/Slider/useSliderStyles.styles.js), [`dist/index.d.ts`](https://unpkg.com/@fluentui/react-slider@9.6.6/dist/index.d.ts)
- Uber Base Web `baseui@18.2.0` [`slider/styled-components.js`](https://unpkg.com/baseui@18.2.0/slider/styled-components.js), [`slider/types.d.ts`](https://unpkg.com/baseui@18.2.0/slider/types.d.ts)
- Chakra UI `@chakra-ui/react@3.37.0` [`theme/recipes/slider.js`](https://unpkg.com/@chakra-ui/react@3.37.0/dist/esm/theme/recipes/slider.js)
- Radix `@radix-ui/react-slider@1.4.7` [`dist/index.mjs`](https://unpkg.com/@radix-ui/react-slider@1.4.7/dist/index.mjs)
- Salesforce Lightning `@salesforce-ux/design-system@2.264.1` [`salesforce-lightning-design-system.css`](https://unpkg.com/@salesforce-ux/design-system@2.264.1/assets/styles/salesforce-lightning-design-system.css)
- GitHub Primer `@primer/react@38.40.0` ตรวจแล้วไม่มีไฟล์ slider
- Untitled UI [`components/base/slider/slider.tsx`](https://github.com/untitleduico/react/blob/main/components/base/slider/slider.tsx)

**หน้าเอกสารทางการ**

- [Material Components Android Slider.md](https://github.com/material-components/material-components-android/blob/master/docs/components/Slider.md) และ [Material 3 Sliders](https://m3.material.io/components/sliders/overview)
- [Carbon Slider usage.mdx](https://github.com/carbon-design-system/carbon-website/blob/main/src/pages/components/slider/usage.mdx) และ [Carbon Slider accessibility.mdx](https://github.com/carbon-design-system/carbon-website/blob/main/src/pages/components/slider/accessibility.mdx)
- [Apple HIG Sliders](https://developer.apple.com/design/human-interface-guidelines/sliders) และ [Apple HIG Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)
- [GOV.UK Design System components](https://design-system.service.gov.uk/components/)
- [NewsKit Slider](https://www.newskit.co.uk/components/slider/)
- [Untitled UI Sliders](https://www.untitledui.com/components/sliders)

**มาตรฐาน**

- [APG Slider Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/slider/), [APG Multi-Thumb Slider](https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/), [APG Media Seek Slider Example](https://www.w3.org/WAI/ARIA/apg/patterns/slider/examples/slider-seek/)
- [WCAG 2.2 SC 2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) และ [SC 2.5.7 Dragging Movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html)

**แหล่งรอง**

- [Baymard Institute, 5 Requirements for Slider Interfaces](https://baymard.com/blog/slider-interfaces)
- [BeeLine Reader, The Importance of Text Accessibility In News Apps](https://medium.com/@BeeLineReader/the-importance-of-text-accessibility-in-news-apps-45ac8cca2e9a)

---

## 15. คำถามที่ต้องตัดสินก่อนลงมือ

1. **โค้ดรวม Figma แยก** (`slider` กับ `range-slider`) ใช่หรือไม่ หรือจะรวมเป็นชุดเดียวใน Figma ด้วย boolean ซ่อนปุ่มจับตัวแรก
2. **สูตรปุ่มจับ base 16 step 4 ให้ค่าเดิม 24 อยู่ที่ md** หรือ **base 12 step 4 เท่าช่องติ๊ก ให้ค่าเดิมไปอยู่ lg**
3. **สูตรราง base 4 step 2** ให้ค่าเดิม 8 อยู่ที่ md ใช่หรือไม่
4. **ใช้โครงสองชั้น แถวอ้าง `CONTROL_HEIGHT` และ 48 บนจอสัมผัส** ใช่หรือไม่
5. **เปลี่ยนวิธีทำตำแหน่งเป็นทาง ข.** และยอมให้ทำต้นแบบทดลองหนึ่งขนาดก่อนใช่หรือไม่
6. **ชิ้นส่วนปุ่มจับ publish หรือไม่** (`slider-handle` หรือ `_slider-handle`)
7. **เพิ่ม `pressed` กับ `disabled` ไม่ทำ `error`** ใช่หรือไม่ และ pressed บอกด้วยสีอย่างเดียวตามแบบสวิตช์ใช่หรือไม่
8. **ตัดป้าย "tooltip ล่าง"** และเปลี่ยนแกน Label เป็น boolean ใช่หรือไม่
9. **ให้สำรวจเว็บในเครือก่อนไหม** ว่ามีจุดที่ต้องใช้ slider จริงกี่จุด ก่อนตัดสินจำนวนขนาด
