---
title: "Bar Chart component research"
description: "วิจัย component กราฟแท่ง bar-chart ตัวแรกของ NTGDS เทียบ Carbon Charts, Google Material Charts, Polaris Viz, Atlassian, Fluent 2 charts กับแนวทาง data viz ทั่วไป เรื่องโครงสร้าง สัดส่วนแท่งกับช่องว่าง มุมโค้ง เส้นกริดและแกน คำอธิบายสี รูปแบบตัวเลข การแบ่งขีดสเกล แกน y สองข้าง สีสองชุดจาก hue เดียว การเข้าถึง วิธีสร้างในโค้ด และการรองรับจอแคบ"
research_date: "2026-10-28"
scope: "IBM Carbon (เอกสาร data visualization และไฟล์ต้นทาง @carbon/charts), Google Charts แบบ Material, Shopify Polaris Viz (ไฟล์ต้นทาง ซึ่งถูก archive แล้ว), Atlassian data visualization color, Microsoft Fluent UI React Charts (ไฟล์ต้นทาง), Chart.js, Recharts, visx, Nivo, Highcharts, d3-scale, UK ONS, Datawrapper, Stephen Few, Jon Peltier, Chartability, W3C WCAG 2.2, WAI-ARIA 1.2, WAI Images Tutorial, Deque"
status: "draft รอตัดสิน"
owner: "ux-researcher"
---

# Research Bar Chart สำหรับ NTGDS

**วันที่วิจัย:** 2026-10-28
**โจทย์:** หาข้อมูลเพื่อออกแบบ component กราฟแท่งตัวแรกของระบบ ชื่อ `bar-chart` ใน Figma และ `BarChart` ในโค้ด ใช้ครั้งแรกที่หน้า Dashboard ของ One CMS ตอบ 6 คำถาม คือ สเปกของเจ้าใหญ่, แกน y สองข้าง, สีสองชุดจาก hue เดียว, การเข้าถึงของ SVG ใน React, วิธีสร้างในโค้ด และการรองรับจอแคบ

**ป้ายแหล่ง:** `[ทางการ]` เอกสารหรือไฟล์ต้นทางขององค์กรเอง `[มาตรฐาน]` W3C `[แหล่งรอง]` ผู้เชี่ยวชาญหรือบริษัทภายนอก `[คำนวณ]` ผู้วิจัยคำนวณเอง `[ตีความ]` ความเห็นของผู้วิจัย ไม่ใช่ข้อเท็จจริง `[ของเรา]` ค่าที่อ่านจากไฟล์ในโปรเจกต์นี้ `[จากบรีฟ]` ข้อมูลที่ได้จากบรีฟ ผู้วิจัยไม่ได้วัด Figma เอง

> **สิ่งที่ตัดสินแล้ว ไม่เปิดใหม่ในเอกสารนี้** ชื่อ component, ทำแท่งก่อนแต่วางโครงให้ line กับ pie เข้าตระกูลเดียวกันได้, แท่งจับกลุ่มหลายชุด, แกน y ข้างที่สองเป็นตัวเลือก, เส้นกริดแนวนอน, ชื่อแกน, ป้ายแกน x ใต้แต่ละกลุ่ม, คำอธิบายสีอยู่นอกกราฟเป็นจุดสีกับป้าย, token ใหม่ 4 ตัว (`chart/color/series-1` `chart/color/series-2` `chart/color/grid` `chart/color/axis-text`), การเข้าถึงด้วย `role="img"` กับ `aria-label` บวกตารางข้อมูลที่ซ่อนจากสายตา และ tooltip เลื่อนไปรอบสอง
>
> **ของที่มีอยู่แล้วในเครื่อง** ไฟล์ใน `docs/research/design-systems/` (carbon, material-3, polaris, atlassian, fluent-2 และ `_ntgds-recommendations.md`) เป็นงานวิจัยเรื่องโครงสร้างองค์กรและ token pipeline สแกนคำว่า chart และ data viz แล้วไม่พบข้อมูลกราฟเลย รายงาน component เดิมที่แตะเรื่องนี้มีแค่ประโยคเดียวของ Polaris ใน [progress-component.md](progress-component.md) ข้อมูลในเอกสารนี้จึงเก็บใหม่ทั้งหมด
>
> **ข้อจำกัดของแหล่ง** m3.material.io ไม่มีหน้า data visualization ที่ค้นเจอ และหน้า data visualization ของ Material 2 ประกอบด้วยสคริปต์จนดึงเนื้อหาไม่ได้ ข้อมูลฝั่ง Google จึงมาจาก Google Charts แบบ Material แทน ส่วนหน้า charts ของ fluent2.microsoft.design คืน 404 ข้อมูล Fluent มาจากไฟล์ต้นทาง `@fluentui/react-charts` บน GitHub และ Polaris Viz ถูก Shopify archive แล้ว ([18]) ใช้เป็นข้อมูลอ้างอิงได้ แต่ไม่ควรถือเป็นทิศทางของตลาด

---

## 1. สรุปคำตอบ 6 ข้อ (อ่านหน้าเดียวจบ)

| # | คำถาม | คำตอบสั้น |
|---|---|---|
| 1 | เจ้าใหญ่สเปกกราฟแท่งยังไง | **ทุกเจ้าคิดความกว้างแท่งเป็นสัดส่วนของช่องต่อกลุ่ม แล้วตั้งเพดานเป็นพิกเซล** Carbon ตั้งเพดาน 16 กับช่องระหว่างแท่งในกลุ่มไม่เกิน 5 ([2][3]), Fluent ตั้งแท่ง 16 เพดาน 24 ([20]), Google ให้กลุ่มกินช่อง 61.8 เปอร์เซ็นต์ ([10]), Chart.js 0.8 คูณ 0.9 ([22]) **มุมโค้งแยกเป็นสองค่าย** ไม่โค้งเป็นค่าเริ่มต้นของ Chart.js และ Fluent ส่วน Polaris กับ Fluent เมื่อเปิดใช้ใช้ 3 ([17][20]) **คำอธิบายสีเริ่มต้นอยู่ล่าง** (Carbon [5]) หรือบนซ้าย (ONS [14]) **ตัวเลขใช้ `toLocaleString` ตาม locale** (Carbon [3]) **ขีดสเกลแกน y ราว 5 ขีด** (Carbon [3]) โดยใช้อัลกอริทึม nice ticks ของ d3 ([25]) |
| 2 | แกน y สองข้าง | **แหล่งที่น่าเชื่อถือส่วนใหญ่ค้าน** Few หาไม่เจอกรณีที่ไม่มีทางที่ดีกว่า ([15]), Datawrapper บอกว่า "easily misread" ([12]), Peltier เลิกสอนแท่งจับกลุ่มบนสองแกนเพราะ "which bars go with which axis" ([16]) **ถ้าจะเก็บไว้ ต้องทำ 4 อย่าง** ใส่สีหรือเครื่องหมายผูกแกนกับชุดข้อมูล, ใส่ชื่อแกนทั้งสองข้าง, เริ่มที่ศูนย์ทั้งคู่ และ **บังคับจำนวนขีดสองข้างให้เท่ากันเพื่อให้เส้นกริดชุดเดียวใช้ได้ทั้งสองแกน** แบบ `alignTicks` ของ Highcharts ([24]) ค่าตั้งต้นของ d3 จะทำให้ไม่ตรงกันในเคสของเรา ดู 3.3 |
| 3 | สีสองชุดจาก hue เดียว | **brand-200 บนพื้นขาวได้ 1.46 ต่อ 1 ตกเกณฑ์ 3 ต่อ 1 ของข้อ 1.4.11** `[คำนวณ]` ส่วนแท่งเข้มกับแท่งอ่อนต่างกันพอ (3.87 ถึง 7.56 ต่อ 1 แล้วแต่ขั้นเข้ม) ทางแก้ที่มีแหล่งรองรับ 3 ทาง คือ **เส้นขอบเข้มรอบแท่งอ่อน** (ตัวอย่าง pie ในเอกสาร WCAG [27] และ Atlassian [7]), **ตารางข้อมูลที่ให้ข้อมูลเดียวกัน** ซึ่ง WCAG ยอมรับว่าทำให้ตัวกราฟไม่ต้องผ่านเกณฑ์ ([27]) และ **เว้นช่องขาวระหว่างแท่ง** (Atlassian [7]) คู่เดียวในสเกล brand ที่ผ่านทั้งสองเกณฑ์คือ 500 กับ 950 |
| 4 | การเข้าถึง SVG ใน React | `role="img"` ทำให้ลูกทุกตัวกลายเป็นของตกแต่ง (Children Presentational: True [28]) **ดีสำหรับรอบแรกที่ไม่มีการโต้ตอบ แต่ต้องเปลี่ยนโครงในรอบ tooltip** ตารางควรเป็น `<table>` จริงข้าง SVG ไม่ใช่ใส่ใน `aria-describedby` หรือ `<desc>` เพราะโครงตารางจะหาย ([29][30]) **ห้ามให้แท่งรับโฟกัสในรอบแรก** รอบสองให้ใช้แบบจุดหยุดเดียวแล้วเลื่อนด้วยลูกศร (Recharts [23]) ไม่ใช่ Tab ทีละแท่งแบบ Fluent ที่จะได้ 62 จุดหยุดในเคสเรา |
| 5 | วิธีสร้าง | **แนะนำเขียน SVG เอง ไม่ใช้ไลบรารีในรอบแรก** เหตุผลหลักคือ เรนเดอร์บนเซิร์ฟเวอร์ได้ทันทีโดยไม่ต้องวัดขนาด, ใช้ CSS variable `--ntg-` ผ่าน CSS Modules ตรง ๆ และไม่ผูกเวอร์ชัน React ของโปรเจกต์ปลายทาง (Next 12 กับ 14) Recharts ทั้งแพ็กเกจ 146 KB gzip, Nivo bar 88 KB, Chart.js 68 KB บน canvas ที่อ่าน CSS variable ไม่ได้ตรง ๆ ([31]) ถ้าภายหลังต้องการคณิตศาสตร์ของ line กับ pie ให้เพิ่ม `d3-scale` กับ `d3-shape` ทีละตัว |
| 6 | จอแคบ | 31 กลุ่มที่ความกว้าง 1392 ได้ช่องละราว 42 พิกเซล `[คำนวณ]` **ลำดับที่แนะนำ** คือ แสดงป้ายทุกวันเมื่อช่อง 24 ขึ้นไป, ลดป้ายเหลือวันที่ 1 5 10 15 20 25 30 เมื่อแคบกว่านั้น, และเมื่อช่องต่ำกว่าราว 14 ให้เลื่อนแนวนอนโดยตรึงแกน y ไว้ แบบ `scrollablePlotArea` ของ Highcharts ([24b]) การรวมเป็นรายสัปดาห์เป็นทางเลือกที่ต้องให้เจ้าของงานตัดสิน เพราะเปลี่ยนความหมายของข้อมูล |

---

## 2. บริบทของเรา

### 2.1 เคสแรก One CMS Dashboard `[จากบรีฟ]`

| หัวข้อ | ค่า |
|---|---|
| พื้นที่กราฟ | 1392 x 382 |
| แกน x | 31 วันต่อเดือน ป้ายใต้แต่ละกลุ่ม ตัวอักษร Prompt 12/18 |
| ชุดที่ 1 | ยอดเข้าชม (views) 0 ถึง 240,000 บนแกนซ้าย |
| ชุดที่ 2 | จำนวนข่าวที่สร้าง 0 ถึง 80 บนแกนขวา |

### 2.2 ค่าในโปรเจกต์ที่เกี่ยวข้อง `[ของเรา]`

- **สเกล brand** อ่านจาก `tokens/output/css/variables.css` ได้ 200 = `#bdd8ff`, 500 = `#3578fc`, 600 = `#1e58f2`, 700 = `#1640d6`, 800 = `#1936b4`, 900 = `#1a338e`, 950 = `#152156`
- **ไม่มี text style 12/18** ตัว 12 พิกเซลที่มีอยู่คือ `.ntg-typography-meta-caption` (Prompt 12, น้ำหนัก 400, line-height 22) และ `.ntg-typography-label-sm` (Prompt 12, น้ำหนัก 500, line-height 22) ตามกฎ typography preset only ของ AGENTS.md **ต้องถามว่าจะใช้ meta-caption ที่ 12/22 หรือขอเพิ่ม style ใหม่ 12/18** ข้อนี้มีผลกับความสูงพื้นที่ป้ายแกน x (ต่างกัน 4 พิกเซล)
- **ตัวเลือก semantic สำหรับ token สีใหม่** `[ตีความ]` ถ้าจะให้ `chart/color/axis-text` ชี้ไปที่ของเดิม ตัวที่ใกล้ที่สุดคือ `--ntg-color-text-general-caption` (ชี้ gray-light-500 ได้ 4.97 ต่อ 1 บนขาว ผ่าน 4.5) ส่วน `chart/color/grid` ใกล้ `--ntg-color-border-general-secondary` (gray-light-200 ได้ 1.18 ต่อ 1) หรือ `-primary` (gray-light-300 ได้ 1.47 ต่อ 1) เส้นกริดไม่ต้องผ่าน 3 ต่อ 1 เพราะไม่ใช่ส่วนที่ "required to understand" เมื่อมีป้ายแกนแล้ว `[ตีความ]` ONS ใช้ `#D9D9D9` หนา 1 สำหรับกริด และ `#B3B3B3` หนา 1.5 สำหรับเส้นศูนย์ ([14])
- **ไลบรารีกราฟในโปรเจกต์** ไม่มีเลย `package.json` มีแค่ React 19, Storybook, Vite, Style Dictionary
- **ตัวช่วยซ่อนจากสายตา** มีรูปแบบ `visuallyHidden` อยู่แล้วใน `components/Pagination/README.md` และในโค้ดของ Avatar กับ Tag ควรใช้ร่วมกันแทนเขียนใหม่

---

## 3. คำถามข้อ 1 เจ้าใหญ่สเปกกราฟแท่งยังไง

### 3.1 โครงสร้าง (anatomy)

Carbon แยกองค์ประกอบกราฟสี่เหลี่ยมเป็น 9 ส่วน คือ ชื่อกราฟ, แกน, ขีด, ชื่อแกน, คำอธิบายสี, แถบเครื่องมือ, แถบซูม, กรอบกราฟ และ tooltip ([4]) `[ทางการ]` และกำหนดว่าชื่อกราฟควรบอกใจความที่ข้อมูลเผย ไม่ใช่แค่ชื่อหัวข้อ ([4])

**โครงที่เสนอให้ `bar-chart` รอบแรก** `[ตีความ]` เอาเฉพาะส่วนที่ตัดสินแล้ว ได้ 7 ส่วน
1. คำอธิบายสี (นอกกราฟ)
2. ชื่อแกนซ้าย และชื่อแกนขวา (ถ้ามี)
3. ป้ายตัวเลขแกนซ้าย และแกนขวา
4. เส้นกริดแนวนอน รวมเส้นศูนย์
5. กลุ่มแท่ง (1 กลุ่มต่อ 1 หมวดบนแกน x)
6. ป้ายแกน x
7. ตารางข้อมูลที่ซ่อนจากสายตา (ไม่เห็นในภาพแต่เป็นส่วนของ component)

ชื่อกราฟกับแถบเครื่องมือไม่ใส่ใน component เพราะการ์ดของ Dashboard มีหัวการ์ดอยู่แล้ว `[ตีความ]`

### 3.2 ความกว้างแท่งกับช่องว่าง

| เจ้า | กติกา | แหล่ง |
|---|---|---|
| Carbon | แท่งเดี่ยว `min(maxWidth, step / 2)` โดย `maxWidth: 16` แท่งจับกลุ่ม `(step - ช่องในกลุ่มรวม) / จำนวนชุด` แล้วตัดที่ 16 ช่องระหว่างแท่งในกลุ่ม `min(5, 5 * step / 70)` | [2][3] `[ทางการ]` |
| Fluent (react-charts) | แท่งจับกลุ่มกว้าง 16 เป็นค่าเริ่มต้น "may decrease to prevent overlap" เพดาน `maxBarWidth` 24 ช่องในระหว่างกลุ่ม `xAxisInnerPadding` 2/3 ของ step | [20] `[ทางการ]` |
| Google Charts | `bar.groupWidth` เริ่มต้น "The golden ratio, approximately '61.8%'" ของช่อง | [10] `[ทางการ]` |
| Chart.js | `categoryPercentage: 0.8` คูณ `barPercentage: 0.9` | [22] `[ทางการ]` |
| Recharts | `barCategoryGap: "10%"` และ `barGap: 4` | [23b] `[ทางการ]` |
| Polaris Viz | `BAR_SPACING = 0.5`, `MIN_BAR_HEIGHT = 2` | [17] `[ทางการ]` |

**เทียบเป็นพิกเซลในเคส One CMS** `[คำนวณ]` สมมติแกนซ้ายกับขวากินรวมราว 72 พิกเซล พื้นที่วาดแท่งเหลือราว 1320 หาร 31 ได้ช่องละ 42.6

| เจ้า | แท่ง | ช่องในกลุ่ม | ช่องระหว่างกลุ่ม |
|---|---|---|---|
| Carbon | 16 (ชนเพดาน) | 3.0 | 7.6 |
| Chart.js | 15.3 | 1.7 | 8.5 |
| Recharts | 15.0 | 4 | 8.5 |
| Google | 13.2 | 0 | 16.3 |
| ข้อเสนอ (หัวข้อ 9) | 12 | 4 | 14.6 |

**ข้อสังเกต** `[ตีความ]` ค่าเริ่มต้นของ Carbon, Chart.js และ Recharts ให้ช่องระหว่างกลุ่มแค่ราวครึ่งหนึ่งของแท่ง เมื่อมี 31 กลุ่มติดกัน ตาจะแยกวันไม่ออกว่าแท่งไหนเป็นของวันไหน Google ที่ 61.8 เปอร์เซ็นต์ให้ช่องระหว่างกลุ่มกว้างกว่าแท่ง ซึ่งเหมาะกับกลุ่มจำนวนมากกว่า

### 3.3 การแบ่งขีดสเกล (nice ticks)

- Carbon ตั้งค่าเริ่มต้นจำนวนขีดแกน y ไว้ 5 และแกน x 15 ([3]) `[ทางการ]`
- d3 `linear.ticks(count)` คืน "approximately count" ค่า เป็นตัวเลขที่อ่านง่าย และ `nice()` ขยายโดเมนให้จบที่ค่ากลม ([25]) `[ทางการ]` ขั้นของ d3 มาจากชุด 1, 2, 5 คูณสิบยกกำลัง
- **ปัญหาที่เกิดกับเคสเรา** `[คำนวณ]` ถ้าใช้ d3 ตรง ๆ ขอ 5 ขีด แกนซ้าย 240,000 ได้ขั้น 50,000 แล้ว nice เป็น 0 ถึง 250,000 คือ 6 เส้น แต่แกนขวา 80 ได้ขั้น 20 คือ 0 ถึง 80 เป็น 5 เส้น **เส้นกริดสองแกนจะไม่ตรงกัน**
- **ทางแก้** `[ตีความ]` บังคับจำนวนช่องให้เท่ากันทั้งสองแกน (เช่น 4 ช่อง 5 เส้น) แล้วหาขั้นของแต่ละแกนจาก `ค่าสูงสุด / 4` ปัดขึ้นเป็นเลขกลมจากชุดที่กว้างกว่า 1, 2, 5 เช่น 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8 ได้ซ้าย 0, 60K, 120K, 180K, 240K และขวา 0, 20, 40, 60, 80 ตรงกับค่าในบรีฟพอดี หลักเดียวกับ Highcharts `chart.alignTicks` ที่เปิดเป็นค่าเริ่มต้นและให้ทุกแกน "the same tick amount" ([24]) `[ทางการ]`

### 3.4 รูปแบบตัวเลข

- Carbon จัดตัวเลขด้วย `value.toLocaleString(language)` ตามภาษาของเบราว์เซอร์ ([3]) `[ทางการ]`
- **ทดสอบใน Node วันนี้** `[คำนวณ]` `new Intl.NumberFormat('th-TH', { notation: 'compact' })` ได้ 0, 60K, 120K, 180K, 240K, 1.5M เหมือน en-US ทุกตัว ถ้าใช้ `compactDisplay: 'long'` ได้ "2.4 แสน" ส่วนแบบเต็ม `th-TH` ได้ 240,000
- **ข้อเสนอ** `[ตีความ]` ป้ายแกนใช้แบบย่อ (240K) เพื่อประหยัดความกว้างแกน ส่วนตารางที่ซ่อนและ tooltip รอบสองใช้แบบเต็มมีจุลภาค (240,000) ให้ component รับ `formatValue` ต่อแกนจากผู้ใช้ได้ โดยค่าเริ่มต้นคือ `Intl.NumberFormat` แบบ compact ของ locale `th-TH`

### 3.5 เส้นกริดและแกน

- ONS กำหนดว่ากราฟแท่ง "should include gridlines" แม้จะมีป้ายค่าบนแท่งแล้ว และกราฟส่วนใหญ่ไม่ควรมีกริดทั้งแนวตั้งและแนวนอน แกนหมวดหมู่ไม่ควรมีขีด ([14]) `[ทางการ]`
- Carbon และหลักทั่วไปให้แกนตัวเลขของกราฟแท่งเริ่มที่ศูนย์ เพราะการตัดแกนทำให้ความต่างดูเกินจริง ([1b]) `[ทางการ]`
- Polaris Viz เปิดกริดแนวนอนเป็นค่าเริ่มต้น (`DEFAULT_GRID_SHOW_HORIZONTAL_LINES = true`) และเว้น `Y_AXIS_CHART_SPACING = 20` ระหว่างป้ายแกนกับพื้นที่วาด ป้ายตัวอักษร `FONT_SIZE = 11` ([17]) `[ทางการ]`
- Google แบบ Material ใช้ "softer gridlines" กว่าแบบ Classic ([10]) `[ทางการ]`

### 3.6 มุมโค้งของแท่ง

| เจ้า | ค่าเริ่มต้น | แหล่ง |
|---|---|---|
| Chart.js | `borderRadius: 0` ใช้กับทุกมุมถ้าใส่เป็นตัวเลข | [22] |
| Fluent | `roundCorners` ค่าเริ่มต้น false ถ้าเปิดได้ `rx` 3 | [20][21] |
| Polaris Viz | `DEFAULT_BORDER_RADIUS = 3` | [17] |
| Google Material | "rounded corners" เป็นจุดต่างจาก Classic | [10] |

**ข้อสังเกตเชิงเทคนิค** `[ตีความ]` แอตทริบิวต์ `rx` ของ `<rect>` โค้งทั้งสี่มุม รวมมุมที่ติดเส้นศูนย์ด้วย (Fluent ทำแบบนี้ [21]) ถ้าต้องการโค้งเฉพาะปลายบนต้องวาดเป็น `<path>` และต้องจำกัดรัศมีไม่ให้เกินครึ่งความกว้างแท่งหรือความสูงแท่ง ไม่อย่างนั้นแท่งที่ค่าน้อยจะเพี้ยน Polaris กันปัญหานี้ด้วยความสูงขั้นต่ำ 2 สำหรับค่าที่ไม่ใช่ศูนย์ ([17])

### 3.7 คำอธิบายสี

- Carbon วางล่างเป็นค่าเริ่มต้น และแนะนำวางบนสำหรับ dashboard หรือที่ที่พื้นที่จำกัด คำอธิบายสีไม่ควรสูงเกิน 30 เปอร์เซ็นต์ของกราฟ ([5]) `[ทางการ]` ระยะระหว่างรายการแนวนอน 12 ในโค้ด ([2])
- ONS วางบนซ้ายของพื้นที่กราฟ รายการเรียงต่อกันเป็นบรรทัดเดียวแล้วตัดบรรทัด และใช้ **วงกลมเส้นผ่านศูนย์กลาง 12** เป็นสัญลักษณ์เริ่มต้นของสีพื้น รวมถึงกราฟแท่ง ([14]) `[ทางการ]`
- Polaris เว้นระยะคำอธิบายสีบนและล่าง 16 ([17]) `[ทางการ]`

---

## 4. คำถามข้อ 2 แกน y สองข้าง

### 4.1 เมื่อไหร่แหล่งต่าง ๆ ค้าน

- **Stephen Few** (2008) สรุปว่า "I cannot think of a situation that warrants them in light of other, better solutions" ([15]) `[แหล่งรอง]`
- **Datawrapper** บทความของ Lisa Charlotte Muth (2018 ปรับปรุง 2026) ชี้ว่าสเกลของสองแกนเลือกได้ตามใจ จึงชักนำให้อ่านความสัมพันธ์ที่ไม่มีจริง และอ้างงานวิจัยปี 2011 ว่าผู้อ่านตอบช้าและผิดมากกว่า ทางเลือกที่แนะนำคือกราฟแยกวางคู่กัน หรือกราฟแบบดัชนี ([11]) `[แหล่งรอง]`
- **Jon Peltier** เลิกเผยแพร่วิธีทำแท่งจับกลุ่มบนสองแกน เพราะ "too confusing to read, particularly when you're trying to figure out which bars go with which axis" แต่ยังใช้แกนรองกับ **เส้นบนแท่ง** เพราะเป็นกราฟต่างชนิดกัน ([16]) `[แหล่งรอง]`

**ความเสี่ยงเฉพาะเคสเรา** `[ตีความ]` แท่งยอดเข้าชมกับแท่งจำนวนข่าวยืนติดกันในกลุ่มเดียว ผู้อ่านจะเทียบความสูงสองแท่งโดยอัตโนมัติ ทั้งที่ความสูงนั้นไม่มีความหมายร่วมกัน (แท่งข่าว 40 กับแท่งวิว 120,000 สูงเท่ากัน) นี่คือกรณีที่ Peltier ค้านตรง ๆ

### 4.2 ถ้าเก็บไว้ ทำยังไงให้อ่านได้

Datawrapper เพิ่มกราฟแกนคู่เมื่อ 2026-07-23 พร้อมแนวทาง ([12]) `[แหล่งรอง]`
- ต้องเห็นชัดว่าแต่ละชุดใช้สเกลไหน ใส่สีป้ายแกนให้ตรงกับชุด และใส่ชื่อแกนแยกสองข้าง
- จัดเส้นกริดและขีดสองแกนให้ตรงกัน เพราะค่าเริ่มต้นขีดสองข้างเป็นอิสระต่อกัน
- ถ้าแกนหนึ่งเริ่มที่ศูนย์ อีกแกนก็ควรเริ่มที่ศูนย์ กราฟแท่งต้องมีศูนย์เสมอ
- ป้ายค่าบนข้อมูลช่วยให้ผู้อ่านรู้ว่าค่าต่างสเกลเทียบกันตรง ๆ ไม่ได้

**ปรับให้เข้ากับสีของเรา** `[คำนวณ]` และ `[ตีความ]` การลงสีป้ายตัวเลขแกนขวาด้วย series-2 (brand-200) ทำไม่ได้ เพราะได้ 1.46 ต่อ 1 ต่ำกว่าเกณฑ์ข้อความ 4.5 มาก ทางที่ทำได้คือให้ป้ายตัวเลขทั้งสองข้างใช้ `chart/color/axis-text` เหมือนกัน แล้ว **วางจุดสีแบบเดียวกับคำอธิบายสีไว้หน้าชื่อแกน** แต่ละข้าง เช่น "จุดเข้ม ยอดเข้าชม" ทางซ้าย และ "จุดอ่อน จำนวนข่าว" ทางขวา

**ลำดับคำอธิบายสี** `[ตีความ]` ให้ชุดของแกนซ้ายมาก่อนแล้วตามด้วยชุดของแกนขวา และให้ลำดับแท่งในกลุ่มเป็นซ้ายไปขวาตามลำดับเดียวกัน ตาจะจับคู่ได้สามทางพร้อมกัน คือ ตำแหน่งแท่ง ลำดับคำอธิบาย และข้างของแกน หลัก "เรียงตามลำดับที่กำหนด" ตรงกับ Carbon และ Atlassian ที่สั่งให้ใช้สีหมวดหมู่ตามลำดับเลขเสมอ ([6][7])

### 4.3 ทางเลือกที่ควรมีไว้ในโครงตั้งแต่แรก `[ตีความ]`

- **ทางเลือก ก.** แยกเป็นกราฟสองชิ้นเรียงบนล่าง ใช้แกน x ร่วมกัน (Datawrapper [11]) component ทำได้ทันทีถ้ารองรับการซ่อนป้ายแกน x ของชิ้นบน
- **ทางเลือก ข.** เมื่อ line เข้าตระกูลแล้ว ให้จำนวนข่าวเป็นเส้นบนแกนขวา แท่งเป็นยอดเข้าชมบนแกนซ้าย ซึ่งเป็นกรณีเดียวที่ Peltier ยังใช้แกนรอง ([16]) จึงควรออกแบบ API ให้ "ชุดข้อมูลระบุแกนและชนิด mark ได้" ตั้งแต่รอบแรก เช่น `series: [{ key, label, axis: 'left' | 'right', mark: 'bar' }]`

---

## 5. คำถามข้อ 3 สีสองชุดจาก hue เดียว

### 5.1 ตัวเลขคอนทราสต์ของสเกล brand `[คำนวณ]`

คำนวณตามสูตร relative luminance ของ WCAG จากค่าใน `variables.css`

| ขั้น | เทียบพื้นขาว | เทียบ brand-200 |
|---|---|---|
| 200 | 1.46 | 1.00 |
| 400 | 2.72 | 1.87 |
| 500 | 4.00 | 2.75 |
| 600 | 5.63 | 3.87 |
| 700 | 7.67 | 5.27 |
| 800 | 9.43 | 6.48 |
| 900 | 11.01 | 7.56 |
| 950 | 15.18 | 10.43 |

**อ่านตารางนี้ยังไง**
- แท่งเข้มขั้น 500 ขึ้นไปผ่าน 3 ต่อ 1 บนขาวทุกขั้น
- **แท่ง brand-200 ไม่ผ่านบนขาว** และขั้นอ่อนตัวไหนที่ต่ำกว่า 500 ก็ไม่ผ่าน
- ถ้าต้องการให้ทั้งสองแท่งผ่าน 3 ต่อ 1 บนขาว **และ** ผ่าน 3 ต่อ 1 ระหว่างกันด้วย คู่เดียวในสเกลคือ 500 กับ 950 (3.79 ต่อ 1) แต่ 500 กับ 950 ดูเป็น "สองสีน้ำเงิน" น้อยกว่าคู่เข้มกับอ่อนที่ตัดสินไว้ ข้อนี้เป็นข้อมูลประกอบ ไม่ได้เสนอให้เปลี่ยน
- ยังไม่รู้ว่า "brand dark" ของ series-1 คือขั้นไหน ต้องยืนยันกับผู้ออกแบบ ทุกขั้นตั้งแต่ 600 ขึ้นไปแยกจาก 200 ได้เกิน 3 ต่อ 1

### 5.2 มาตรฐานพูดว่าอะไร `[มาตรฐาน]`

- ข้อ 1.4.11 ใช้กับ "parts of graphics required to understand the content" ต้องได้ 3 ต่อ 1 กับสีที่อยู่ติดกัน ([27])
- เส้นในกราฟเส้นต้องผ่านกับพื้น แต่ "do not need to contrast with each other" ถ้าไม่ค่อยซ้อนกัน ([27])
- ตัวอย่าง pie chart ในเอกสารเดียวกัน แผ่นที่สีอ่อน **ผ่านเมื่อเติมขอบเข้ม** ([27])
- ไม่ต้องผ่านเมื่อ "The information is available in another form, such as in a table that follows the graph" ([27])

### 5.3 เจ้าใหญ่ทำอะไรเมื่อสีอ่อนไม่ผ่าน

| เจ้า | วิธี | แหล่ง |
|---|---|---|
| Atlassian | สีกราฟผ่าน 3 ต่อ 1 กับพื้น แต่ **ไม่ผ่านระหว่างกัน** จึงสั่งห้ามวางชิดกัน ให้เว้นช่องหรือใส่เส้นขอบ `color.border.inverse` และให้เสริมด้วยรูปทรง ลาย หรือป้ายตรง | [7] `[ทางการ]` |
| Fluent | ทุกสีในชุดผ่าน 4.5 ต่อ 1 กับพื้น และ 3 ต่อ 1 ระหว่างกัน | [19] `[ทางการ]` |
| Carbon | ใช้สีตามลำดับที่กำหนดเพราะลำดับนั้นจัดให้สีติดกันต่างกันมากที่สุด มีชุดสีเดียวแบบไล่ระดับให้ใช้ แต่เตือนว่าไล่ระดับหลายชุด "often inaccessible" | [6] `[ทางการ]` |
| Chartability | ข้อวิกฤต "Low contrast" รูปทรงต้องได้มากกว่า 3 ต่อ 1 กับพื้น และข้อวิกฤต "No table" | [26] `[แหล่งรอง]` |

### 5.4 ทางที่เข้ากับสิ่งที่ตัดสินแล้ว `[ตีความ]`

1. **ตารางข้อมูลที่ซ่อนช่วยให้ผ่านข้อ 1.4.11 ในทางเทคนิค** ตามข้อความใน [27] แต่ตารางที่ซ่อนช่วยแค่คนใช้โปรแกรมอ่านหน้าจอ คนสายตาเลือนรางที่ดูภาพเองยังแยกแท่งอ่อนจากพื้นขาวลำบาก จึงไม่ควรพึ่งข้อนี้อย่างเดียว
2. **เส้นขอบรอบแท่งอ่อน** หนา 1 ด้วยสีที่ผ่าน 3 ต่อ 1 บนขาว (ขั้น 500 ขึ้นไป) ตรงกับตัวอย่าง pie ของ WCAG แต่ต้องเพิ่ม token อีกตัว เช่น `chart/color/series-2-border` ต้องถามก่อนตามกฎ ask-first
3. **ช่องขาวระหว่างแท่งในกลุ่ม** อย่างน้อย 2 ถึง 4 พิกเซลแบบ Atlassian ทำให้สองแท่งไม่ "ติดกัน" ตามนิยามของ 1.4.11 ไม่ต้องตรวจคอนทราสต์ระหว่างกัน
4. **จุดในคำอธิบายสีมีปัญหาเดียวกัน** จุด brand-200 บนขาวตกเกณฑ์เหมือนแท่ง ควรใช้วิธีเดียวกับแท่ง (ขอบ) เพื่อให้คำอธิบายกับแท่งดูเป็นชิ้นเดียวกัน
5. **โหมดมืด** token ใหม่ทั้ง 4 ตัวต้องมีค่าฝั่งมืดด้วย ในโหมดมืดปัญหากลับข้าง แท่งเข้มจะจมกับพื้นมืด ต้องคำนวณใหม่เมื่อเลือกค่า

---

## 6. คำถามข้อ 4 การเข้าถึงของ SVG กราฟใน React

### 6.1 โครงที่แนะนำสำหรับรอบแรก

```html
<figure class="chart">
  <svg role="img" aria-label="ยอดเข้าชมและจำนวนข่าวรายวัน ตุลาคม 2569 ยอดเข้าชมสูงสุด 231,400 วันที่ 14 ข่าวสูงสุด 76 ชิ้นวันที่ 3">
    ...แท่ง แกน กริด (ไม่ต้องใส่ aria ใด ๆ ข้างใน)...
  </svg>
  <table class="visuallyHidden">
    <caption>ยอดเข้าชมและจำนวนข่าวรายวัน ตุลาคม 2569</caption>
    <thead><tr><th scope="col">วันที่</th><th scope="col">ยอดเข้าชม</th><th scope="col">จำนวนข่าว</th></tr></thead>
    <tbody>...31 แถว ตัวเลขแบบเต็มมีจุลภาค...</tbody>
  </table>
</figure>
```

**เหตุผลของแต่ละชิ้น**
- **`role="img"` ต้องมีชื่อ** (name required) และลูกทั้งหมดเป็นของตกแต่ง ("Children Presentational: True") ([28]) `[มาตรฐาน]` จึงไม่ต้องใส่ `aria-hidden` ทีละชิ้นใน SVG
- **ตารางต้องเป็นพี่น้องของ SVG ไม่ใช่ลูก** เพราะถ้าอยู่ใน `role="img"` จะถูกตัดทิ้งทั้งก้อน `[ตีความ]` จากข้อเดียวกัน
- **ไม่ใช้ `aria-describedby` ชี้ไปที่ตาราง** WAI เตือนว่าข้อความที่ชี้ไปถูกอ่านเป็นย่อหน้าเดียว หัวข้อและตารางหายหมด จึง "poor fit" กับกราฟที่มีตาราง ([29]) `[มาตรฐาน]`
- **ไม่ใช้ `<desc>` เก็บข้อมูลยาว** การทดสอบของ Deque พบว่า `<title>` กับ `<desc>` แบบไม่อ้าง id "was often missing the desc element" แบบที่เสถียรที่สุดคือ `aria-labelledby` ชี้ทั้งสองตัว ([30]) `[แหล่งรอง]` แต่ `<desc>` ก็ยังเป็นข้อความก้อนเดียว ไม่ใช่ตาราง
- **`<figure>` ห่อ** ตามรูปแบบ figure กับ figcaption ของ WAI ที่ใส่ตารางไว้ในคำอธิบายยาว ([29]) `[มาตรฐาน]`
- **มีตาราง** เป็นข้อวิกฤต "No table" ของ Chartability ([26]) และเป็นข้อเสนอของ Léonie Watson หลังทดสอบ ARIA table บน SVG แล้วพบว่า "highly inconsistent" ข้ามโปรแกรมอ่านหน้าจอ ([31b]) `[แหล่งรอง]`
- **`aria-label` ควรสรุปใจความ ไม่ใช่แค่ชื่อ** Carbon ให้ชื่อกราฟบอก insight ([4]) และ Chartability มีข้อวิกฤต "No title, summary, or caption" ([26]) component ควรรับ `summary` จากผู้ใช้ เพราะ component ไม่รู้ว่าอะไรคือใจความ `[ตีความ]`

### 6.2 โฟกัสคีย์บอร์ดบนแท่ง

- **รอบแรกไม่ควรให้แท่งรับโฟกัส** `[ตีความ]` เพราะยังไม่มีอะไรให้ทำเมื่อโฟกัส ข้อมูลทั้งหมดอยู่ในตารางแล้ว และการเพิ่มจุดหยุดที่ไม่มีหน้าที่ทำให้การนำทาง "tedious" ซึ่งเป็นข้อวิกฤตของ Chartability ([26])
- **รอบ tooltip ต้องเปลี่ยนโครง** เพราะลูกของ `role="img"` เข้าถึงไม่ได้ ([28]) ต้องย้าย role ออกจาก SVG ตัวนอก
- **แบบที่ควรเลือกในรอบสอง** Recharts 3 เปิด `accessibilityLayer` เป็นค่าเริ่มต้น กราฟเป็นจุดหยุดเดียวแล้วเลื่อนด้วยลูกศร ไม่ใช่ Tab ([23]) `[ทางการ]` ข้อจำกัดที่เขาบันทึกไว้คือ VoiceOver ต้องปิด QuickNav ก่อน
- **แบบที่ไม่ควรเลือก** Fluent ใส่ `tabIndex={0}` กับ `role="option"` ให้ทุกแท่งภายใน `role="listbox"` ต่อกลุ่ม ([21]) `[ทางการ]` เคสเรา 31 กลุ่ม 2 ชุดจะได้ 62 จุดหยุด `[คำนวณ]`

### 6.3 การเคลื่อนไหว

- Polaris Viz มีแอนิเมชันตอนโหลดแท่ง `LOAD_ANIMATION_DURATION = 500` ([17]) `[ทางการ]`
- `prefers-reduced-motion: reduce` คือผู้ใช้ตั้งเครื่องให้ลดการเคลื่อนไหวที่ไม่จำเป็น ([32]) `[มาตรฐาน]`
- **ข้อเสนอ** `[ตีความ]` รอบแรกไม่ทำแอนิเมชันเลย ถ้าทำภายหลัง ให้ห่อไว้ใน `@media (prefers-reduced-motion: no-preference)` เพื่อให้ค่าเริ่มต้นคือนิ่ง

---

## 7. คำถามข้อ 5 วิธีสร้างในโค้ด

### 7.1 ขนาดแพ็กเกจ `[แหล่งรอง]`

อ่านจาก Bundlephobia API วันที่ 2026-10-28 ([31]) ตัวเลขเป็นขนาดทั้งแพ็กเกจ ของจริงหลัง tree-shaking จะเล็กกว่า โดยเฉพาะ Recharts

| แพ็กเกจ | เวอร์ชัน | min | gzip | วาดด้วย |
|---|---|---|---|---|
| recharts | 3.10.1 | 548 KB | 146 KB | SVG |
| @nivo/bar | 0.99.0 | 263 KB | 88 KB | SVG และ canvas |
| chart.js (+ react-chartjs-2 1 KB) | 4.6.1 | 200 KB | 68 KB | canvas |
| @visx/shape + scale + axis + group | 4.0.0 | 127 KB | 43 KB | SVG |
| d3-scale | 4.0.2 | 46 KB | 16 KB | (คณิตศาสตร์อย่างเดียว) |
| d3-shape | 3.2.0 | 32 KB | 5.5 KB | (คณิตศาสตร์อย่างเดียว) |
| เขียนเอง | | ประมาณการ 3 ถึง 6 KB `[ตีความ]` | | SVG |

### 7.2 เทียบตามเกณฑ์ของเรา

| เกณฑ์ | เขียน SVG เอง | Recharts | visx | Nivo | Chart.js |
|---|---|---|---|---|---|
| ใช้ `var(--ntg-...)` ผ่าน CSS Modules | ได้ตรง ๆ (`fill: var(...)` ในไฟล์ CSS) | ได้บางส่วน สีส่วนใหญ่ส่งผ่าน prop | ได้ เพราะเป็น primitive | ผ่าน theme object ใน JS | ไม่ได้ตรง ๆ canvas ต้องอ่าน `getComputedStyle` แล้ววาดใหม่เมื่อเปลี่ยนธีม |
| SSR Next 12 และ 14 | เรนเดอร์บนเซิร์ฟเวอร์ได้ ถ้าไม่ใช้ hook ก็เป็น Server Component ได้ใน 14 | ต้องเป็น Client Component และ `ResponsiveContainer` วัดขนาดฝั่งไคลเอนต์ ([33]) | ต้องวัดขนาดเองถ้าจะยืด | ต้องเป็น Client Component ([33]) | ไม่มี SSR เพราะ canvas |
| การเข้าถึง | ทำเองตามหัวข้อ 6 | มี `accessibilityLayer` ([23]) | ทำเอง | มีบางส่วน | ต้องใส่ `role="img"` กับ `aria-label` ที่ canvas เอง ([22b]) |
| ผูกเวอร์ชัน React ของปลายทาง | ไม่ผูก | ผูก | ผูก | ผูก | ผูกผ่าน wrapper |
| งานที่ต้องเขียนเอง | สเกลเชิงเส้น, band, nice ticks, layout ราว 200 ถึง 300 บรรทัด `[ตีความ]` | น้อย | ปานกลาง | น้อย | น้อย |

### 7.3 ข้อแนะนำ `[ตีความ]`

**เขียน SVG เองในรอบแรก ไม่เพิ่มไลบรารี** ด้วยเหตุผล 4 ข้อ
1. แท่งจับกลุ่มกับแกนสองข้างเป็นคณิตศาสตร์ไม่กี่สูตร (หัวข้อ 3.2 กับ 3.3) ไม่คุ้มกับ 40 ถึง 146 KB
2. สีทุกจุดต้องมาจาก token ผ่าน CSS Modules ตามกฎ raw=0 ของ AGENTS.md ไลบรารีส่วนใหญ่รับสีเป็น string ใน JS ทำให้ตรวจ raw ยากขึ้น
3. โปรเจกต์ปลายทางเป็น Next 12 กับ 14 SVG ที่ไม่ต้องวัดขนาดเรนเดอร์บนเซิร์ฟเวอร์ได้ทันที ไม่มี hydration mismatch จากความกว้าง 0
4. โครงตระกูล chart ควบคุมได้เอง แยกเป็นชั้น `ChartFrame` (แกน กริด คำอธิบายสี ตาราง) กับชั้น mark (`bars` ตอนนี้ และ `line` `arc` ภายหลัง)

**เมื่อไหร่ควรทบทวน** เมื่อเพิ่ม line ให้พิจารณา `d3-shape` (5.5 KB) สำหรับเส้นโค้ง และเมื่อเพิ่ม pie ใช้ `arc` จากตัวเดียวกัน ถ้าโค้ดสเกลที่เขียนเองเริ่มโตเกินจะดูแล ให้เปลี่ยนเป็น `d3-scale` (16 KB) ไม่ต้องเปลี่ยนไปใช้ไลบรารีกราฟทั้งตัว

**ข้อควรระวังเรื่องความกว้าง** ถ้าใช้ `viewBox` แล้วยืด SVG ตามกล่อง ตัวอักษรจะยืดหดตามไปด้วย ป้าย 12 พิกเซลจะไม่ใช่ 12 จริง ทางที่ถูกคือคำนวณ layout จากความกว้างจริงเป็นพิกเซล ฝั่งเซิร์ฟเวอร์ใช้ความกว้างเริ่มต้นจาก prop แล้วฝั่งไคลเอนต์วัดใหม่ด้วย `ResizeObserver`

---

## 8. คำถามข้อ 6 จอแคบ

### 8.1 สิ่งที่เจ้าอื่นทำ

- **หมุนป้ายเมื่อแคบ** Carbon หมุนป้ายแกนเมื่อช่องแคบกว่า 30 (`rotateIfSmallerThan: 30`) ([2]) Polaris กำหนดความกว้างขั้นต่ำของป้ายแนวนอน 46 และป้ายเฉียง 30 ([17]) `[ทางการ]`
- **เลื่อนแนวนอนโดยตรึงแกน** Highcharts `scrollablePlotArea.minWidth` เมื่อกราฟแคบกว่าค่านี้ พื้นที่วาดเลื่อนได้ ส่วน "the title, legend and unaffected axes are fixed" ([24b]) `[ทางการ]`
- **รวมข้อมูล** Chartability ข้อวิกฤต "Data density is inappropriate" ให้รวม แบ่ง หรืออธิบาย เมื่อมีของแย่งพื้นที่กันมากเกินไป ([26]) `[แหล่งรอง]`
- **Carbon ห้ามเปลี่ยนช่วงขีดเวลาเพื่อหลบข้อมูลที่ขาด** ("Never change axis ticks increments") ([1b]) `[ทางการ]` ใช้กับการลดป้ายได้ คือถ้าลดต้องลดเป็นช่วงสม่ำเสมอ

### 8.2 จุดเปลี่ยนสำหรับ 31 กลุ่ม `[คำนวณ]`

สมมติป้าย "31" ที่ Prompt 12 กว้างราว 15 พิกเซล ต้องการช่องว่างระหว่างป้ายอย่างน้อย 8 และแท่งบางสุดที่ยังอ่านได้ 4 พิกเซล แกนสองข้างกินรวม 72 (ตัวเลขความกว้างตัวอักษรเป็นการประมาณ ต้องวัดจริงใน Figma)

| ช่องต่อกลุ่ม | พื้นที่วาด | ความกว้างกราฟโดยประมาณ | สิ่งที่ทำ |
|---|---|---|---|
| 24 ขึ้นไป | 744 ขึ้นไป | 816 ขึ้นไป | แสดงป้ายทุกวัน |
| 14 ถึง 24 | 434 ถึง 744 | 506 ถึง 816 | ป้ายเฉพาะวันที่ 1 5 10 15 20 25 30 แท่งยังครบ |
| ต่ำกว่า 14 | ต่ำกว่า 434 | ต่ำกว่า 506 | ตรึงแกน y แล้วเลื่อนพื้นที่วาดแนวนอน หรือเสนอรวมเป็นรายสัปดาห์ |

**ข้อสังเกต** `[ตีความ]`
- One CMS เป็นระบบหลังบ้านที่ใช้บนเดสก์ท็อปเป็นหลัก ช่วงที่สามน่าจะเกิดน้อย แต่ component เป็นของกลาง เว็บข่าวในเครือมีผู้ใช้มือถือเกิน 70 เปอร์เซ็นต์ จึงควรมีทางออกไว้
- เลือกลดป้ายก่อนหมุนป้าย เพราะป้ายภาษาไทยหรือวันที่ที่หมุนเฉียงอ่านยากกว่า และกินความสูงจาก 382 ที่มีอยู่
- การรวมเป็นรายสัปดาห์เปลี่ยนความหมายของข้อมูล (ยอดรวมต่อสัปดาห์ไม่ใช่ต่อวัน) ควรเป็นการตัดสินของเจ้าของหน้า ไม่ใช่สิ่งที่ component ทำเอง
- การเลื่อนแนวนอนต้องให้กล่องที่เลื่อนได้รับโฟกัสคีย์บอร์ดได้ และตารางที่ซ่อนยังเป็นทางเข้าถึงข้อมูลครบเสมอ

---

## 9. ข้อเสนอสำหรับ ntgds

ทุกข้อเป็นข้อเสนอ ต้องได้รับการยืนยันก่อนสร้าง token หรือ component ตามกฎ ask-first

| # | เรื่อง | ค่าที่เสนอ | อิงจาก |
|---|---|---|---|
| 1 | สัดส่วนกลุ่มต่อช่อง | กลุ่มกิน 0.7 ของช่อง ที่เหลือเป็นช่องระหว่างกลุ่ม | Google 61.8 เปอร์เซ็นต์ [10] ปรับขึ้นเล็กน้อยให้แท่งไม่บางเกิน, Fluent ที่เว้นช่องระหว่างกลุ่มกว้าง [20] |
| 2 | ช่องระหว่างแท่งในกลุ่ม | 4 พิกเซล (`--ntg-size-space-s1-sm`) | Recharts `barGap: 4` [23b], Carbon ไม่เกิน 5 [2], Atlassian ให้เว้นช่องระหว่างสี [7] |
| 3 | ความกว้างแท่ง | คำนวณจาก 1 กับ 2 แล้วตัดเพดาน 16 ในเคส One CMS ได้ 12 | Carbon `maxWidth: 16` [3], Fluent 16 [20] |
| 4 | มุมโค้ง | โค้งเฉพาะสองมุมบน 2 พิกเซล วาดด้วย `<path>` รัศมีไม่เกินครึ่งความกว้างหรือความสูงของแท่ง ถ้าทีมอยากได้แบบไม่โค้งก็มีแหล่งรองรับเท่ากัน | Polaris 3 [17], Fluent 3 เมื่อเปิด [21], Google Material โค้ง [10], Chart.js 0 [22] |
| 5 | ความสูงขั้นต่ำ | ค่าที่ไม่ใช่ศูนย์สูงอย่างน้อย 2 พิกเซล | Polaris `MIN_BAR_HEIGHT = 2` [17] |
| 6 | จำนวนขีดแกน y | 4 ช่อง 5 เส้นเป็นค่าเริ่มต้น เท่ากันทั้งสองแกนเสมอ ขั้นปัดจากชุด 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8 คูณสิบยกกำลัง เคส One CMS ได้ 0 ถึง 240K ขั้น 60K กับ 0 ถึง 80 ขั้น 20 | Carbon y 5 ขีด [3], Highcharts `alignTicks` [24], d3 ticks [25] |
| 7 | รูปแบบตัวเลข | แกนใช้ `Intl.NumberFormat('th-TH', { notation: 'compact' })` (240K) ตารางใช้แบบเต็ม (240,000) ให้ส่ง `formatValue` ต่อแกนได้ | Carbon `toLocaleString` [3] |
| 8 | เส้นกริดและแกน | กริดแนวนอนหนา 1 ด้วย `chart/color/grid` เส้นศูนย์เข้มกว่าหรือหนากว่า แกนเริ่มที่ศูนย์ทั้งสองข้าง แกน x ไม่มีขีด | ONS [14], Carbon [1b], Datawrapper [12] |
| 9 | แกนสองข้าง | ป้ายตัวเลขทั้งสองข้างใช้ `chart/color/axis-text` วางจุดสีหน้าชื่อแกนแต่ละข้าง ลำดับคำอธิบายสีและลำดับแท่งเป็นซ้ายแล้วขวาตามข้างของแกน และ API ให้แต่ละชุดระบุ `axis` กับ `mark` เพื่อเปลี่ยนเป็นแท่งกับเส้นได้เมื่อ line พร้อม | Datawrapper [12], Peltier [16], Carbon และ Atlassian เรื่องลำดับ [6][7] |
| 10 | สี series-2 | เพิ่มเส้นขอบหนา 1 รอบแท่งอ่อนและจุดในคำอธิบายสี ด้วยสีที่ได้ 3 ต่อ 1 บนขาว (ต้องขอ token เพิ่ม) และยืนยันว่า series-1 คือขั้นไหน | WCAG 1.4.11 ตัวอย่าง pie [27], Atlassian [7], ตาราง 5.1 |
| 11 | คำอธิบายสี | อยู่บนซ้ายนอกกราฟ จุดวงกลม 12 ห่างจากพื้นที่กราฟ 16 รายการเรียงบรรทัดเดียวแล้วตัดบรรทัด | ONS [14], Carbon ให้วางบนสำหรับ dashboard [5], Polaris 16 [17] |
| 12 | การเข้าถึง | `<figure>` ห่อ SVG `role="img"` กับ `aria-label` ที่รับ `summary` จากผู้ใช้ บวก `<table>` จริงที่ซ่อนจากสายตาเป็นพี่น้องของ SVG ไม่ใช้ `aria-describedby` หรือ `<desc>` แทนตาราง แท่งไม่รับโฟกัสในรอบแรก รอบ tooltip ใช้จุดหยุดเดียวกับลูกศร | WAI-ARIA [28], WAI [29], Deque [30], Chartability [26], Recharts [23] |
| 13 | การเคลื่อนไหว | ไม่มีแอนิเมชันในรอบแรก ถ้าเพิ่มภายหลังให้อยู่ใต้ `prefers-reduced-motion: no-preference` | MDN [32] |
| 14 | วิธีสร้าง | เขียน SVG เองด้วย React กับ CSS Modules ไม่เพิ่มไลบรารี แยกชั้น frame กับ mark คำนวณ layout จากความกว้างจริงเป็นพิกเซล ไม่ยืดด้วย `viewBox` พิจารณา `d3-shape` เมื่อเพิ่ม line หรือ pie | Bundlephobia [31], Next.js SSR [33], Chart.js canvas [22b] |
| 15 | จอแคบ | ป้ายทุกวันเมื่อช่อง 24 ขึ้นไป, ลดเหลือ 1 5 10 15 20 25 30 เมื่อแคบกว่า, เลื่อนแนวนอนแบบตรึงแกนเมื่อช่องต่ำกว่า 14 | Carbon [2], Polaris [17], Highcharts [24b], Chartability [26] |

### 9.1 เรื่องที่ต้องให้คนตัดสินก่อนลงมือ

1. ป้ายแกน x ใช้ `.ntg-typography-meta-caption` (12/22) ที่มีอยู่ หรือขอเพิ่ม text style ใหม่ 12/18 ตามบรีฟ
2. series-1 "brand dark" คือขั้นไหน (600, 700, 800 หรือ 900)
3. รับเส้นขอบรอบแท่ง series-2 ไหม ถ้ารับต้องเพิ่ม token ที่ 5
4. มุมโค้ง 2 พิกเซลที่ปลายบน หรือไม่โค้ง
5. ยอมรับความเสี่ยงของแกนสองข้างกับแท่งคู่ หรือเก็บทางเลือกกราฟสองชิ้นเรียงบนล่างไว้เป็นแบบสำรองใน Storybook

---

## 10. สิ่งที่ยืนยันไม่ได้ในรอบนี้

- **Material 3** ไม่พบหน้า data visualization บน m3.material.io และหน้า Material 2 ดึงเนื้อหาไม่ได้ ใช้ Google Charts แบบ Material แทน ([10])
- **Fluent 2** หน้า charts บนเว็บ Fluent 2 คืน 404 ข้อมูลมาจากไฟล์ต้นทางกับหน้า accessibility ของ fluentui-charting-contrib ([19][20][21])
- **Carbon** ไม่พบแนวทางเรื่องแกนสองข้างหรือการย่อตัวเลขในเอกสาร ([1][1b]) ค่าที่ใช้มาจากไฟล์ configuration ของ `@carbon/charts`
- **ขนาดหลัง tree-shaking** ตัวเลข Bundlephobia เป็นขนาดทั้งแพ็กเกจ ไม่ได้ build จริงเพื่อวัด
- **ความกว้างตัวอักษร Prompt** ใน 8.2 เป็นการประมาณ ไม่ได้วัดจาก Figma

---

## 11. แหล่งอ้างอิง

**IBM Carbon**
- [1] Carbon, Simple charts: https://carbondesignsystem.com/data-visualization/simple-charts/
- [1b] Carbon, Axes and labels: https://carbondesignsystem.com/data-visualization/axes-and-labels/
- [2] `@carbon/charts` configuration-non-customizable.ts (ticks, legend spacing) และ bar-grouped.ts, bar.ts (สูตรความกว้างแท่ง): https://github.com/carbon-design-system/carbon-charts/blob/master/packages/core/src/configuration-non-customizable.ts , https://github.com/carbon-design-system/carbon-charts/blob/master/packages/core/src/components/graphs/bar-grouped.ts , https://github.com/carbon-design-system/carbon-charts/blob/master/packages/core/src/components/graphs/bar.ts
- [3] `@carbon/charts` configuration.ts (`maxWidth: 16`, `numberOfTicks: 5`, legend `BOTTOM`, `toLocaleString`): https://github.com/carbon-design-system/carbon-charts/blob/master/packages/core/src/configuration.ts
- [4] Carbon, Chart anatomy: https://carbondesignsystem.com/data-visualization/chart-anatomy/
- [5] Carbon, Legends: https://carbondesignsystem.com/data-visualization/legends/
- [6] Carbon, Color palettes: https://carbondesignsystem.com/data-visualization/color-palettes/

**Atlassian, Google, Shopify, Microsoft**
- [7] Atlassian, Data visualization color: https://atlassian.design/foundations/color/data-visualization-color
- [10] Google Charts, Bar Charts (Material vs Classic, `bar.groupWidth`): https://developers.google.com/chart/interactive/docs/gallery/barchart
- [17] Polaris Viz constants.ts: https://github.com/Shopify/polaris-viz/blob/main/packages/polaris-viz-core/src/constants.ts
- [18] Polaris Viz repository (archived): https://github.com/Shopify/polaris-viz
- [19] Fluent UI charting, Accessibility: https://microsoft.github.io/fluentui-charting-contrib/docs/Accessibility
- [20] Fluent UI React Charts, GroupedVerticalBarChart.types.ts: https://github.com/microsoft/fluentui/blob/master/packages/charts/react-charts/library/src/components/GroupedVerticalBarChart/GroupedVerticalBarChart.types.ts
- [21] Fluent UI React Charts, GroupedVerticalBarChart.tsx (`rx` 3, `role="option"`, `tabIndex`): https://github.com/microsoft/fluentui/blob/master/packages/charts/react-charts/library/src/components/GroupedVerticalBarChart/GroupedVerticalBarChart.tsx

**ไลบรารี**
- [22] Chart.js, Bar chart: https://www.chartjs.org/docs/latest/charts/bar.html
- [22b] Chart.js, Accessibility: https://www.chartjs.org/docs/latest/general/accessibility.html
- [23] Recharts wiki, Recharts and accessibility: https://github.com/recharts/recharts/wiki/Recharts-and-accessibility
- [23b] Recharts API, BarChart: https://recharts.github.io/en-US/api/BarChart/
- [24] Highcharts, Axes (`alignTicks`, `opposite`): https://www.highcharts.com/docs/chart-concepts/axes
- [24b] Highcharts API, chart.scrollablePlotArea: https://api.highcharts.com/highcharts/chart.scrollablePlotArea
- [25] d3-scale, Linear scales (`ticks`, `nice`): https://d3js.org/d3-scale/linear
- [31] Bundlephobia API (ดึงวันที่ 2026-10-28): https://bundlephobia.com/package/recharts , https://bundlephobia.com/package/chart.js , https://bundlephobia.com/package/@nivo/bar , https://bundlephobia.com/package/@visx/shape , https://bundlephobia.com/package/d3-scale , https://bundlephobia.com/package/d3-shape
- [33] LogRocket, Top React chart libraries (App Router และ Client Component): https://blog.logrocket.com/top-5-react-chart-libraries/

**แนวทาง data viz**
- [11] Lisa Charlotte Muth, Why not to use two axes, and what to use instead (Datawrapper): https://www.datawrapper.de/blog/dualaxis/
- [12] Datawrapper, New: Dual-axis charts in Datawrapper (2026-07-23): https://www.datawrapper.de/blog/dual-axis-charts
- [14] UK ONS Service Manual, Chart elements: https://service-manual.ons.gov.uk/data-visualisation/build-specifications/chart-elements
- [15] Stephen Few, Dual-Scaled Axes in Graphs: Are They Ever the Best Solution? (Perceptual Edge, 2008): https://www.perceptualedge.com/articles/visual_business_intelligence/dual-scaled_axes.pdf
- [16] Jon Peltier, Secondary Axes in Charts: https://peltiertech.com/secondary-axes-in-charts-2/
- [26] Chartability workbook (POUR-CAF): https://chartability.github.io/POUR-CAF/

**มาตรฐานและการเข้าถึง**
- [27] W3C, Understanding SC 1.4.11 Non-text Contrast: https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
- [28] W3C, WAI-ARIA 1.2 role img: https://www.w3.org/TR/wai-aria-1.2/#img
- [29] W3C WAI, Complex Images tutorial: https://www.w3.org/WAI/tutorials/images/complex/
- [30] Carie Fisher, Creating Accessible SVGs (Deque, 2019): https://www.deque.com/blog/creating-accessible-svgs/
- [31b] Léonie Watson, Accessible SVG line graphs (2017): https://tink.uk/accessible-svg-line-graphs/
- [32] MDN, prefers-reduced-motion: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
