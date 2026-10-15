---
title: "Input Component research"
description: "เทียบ component ช่องกรอกของ DS เจ้าใหญ่ 13 เจ้า จากไฟล์ต้นทางจริง พร้อมข้อเสนอปรับปรุงช่องกรอกของ NTGDS หน้า 13 Input"
research_date: "2026-09-01"
scope: "Material 3 (และ MUI) IBM Carbon Shopify Polaris Atlassian Microsoft Fluent 2 GitHub Primer Adobe Spectrum Ant Design Salesforce Lightning Uber Base Web Guardian Source News UK NewsKit GOV.UK"
status: "draft รอตัดสิน"
owner: "ux-researcher"
---

# Research Input Component (Text field, Text area) ของ Design System เจ้าใหญ่

**วันที่วิจัย:** 2026-09-01
**โจทย์:** ตรวจสอบและปรับปรุงช่องกรอกของ NTGDS หน้า 13 Input (ชุดขนาด, ความสูงเทียบปุ่ม, ระยะขอบใน, โครงสถานะ, ทรงของช่อง, ป้ายกำกับ, ตัวช่วยรอบช่อง, ไอคอนในช่อง, ช่องหลายบรรทัด, accessibility)

**ป้ายแหล่ง:** `[ทางการ]` = ไฟล์ต้นทางหรือเอกสารขององค์กรเอง `[กึ่งทางการ]` = พนักงานหรือชุมชนทางการพูดเอง `[แหล่งรอง]` = คนนอก

> **วิธีเก็บข้อมูล:** ค่าตัวเลขเกือบทั้งหมดในเอกสารนี้อ่านจาก **ไฟล์ต้นทางจริง** (GitHub raw, แพ็กเกจ npm ที่เผยแพร่แล้ว, ไฟล์ token ของแต่ละเจ้า) ไม่ได้อ่านจากหน้าเว็บที่คนสรุปไว้ ตามบทเรียนใน [spacing-scale.md](spacing-scale.md) และ [shape-radius.md](shape-radius.md) §2 ที่พบว่าเว็บกับโค้ดของเจ้าเดียวกันให้ค่าไม่ตรงกัน ส่วนที่เป็นคำแนะนำเชิงการใช้งานอ่านจากหน้าเอกสารทางการ และระบุ URL กำกับทุกข้อ
>
> **ของที่ยืนยันไม่ได้จะเขียนกำกับไว้ตรง ๆ** ว่า "ยืนยันไม่ได้" ไม่เดาแทน หน้าเอกสารของ Material 3 (m3.material.io) และ Atlassian (atlassian.design) เป็นหน้าที่ประกอบด้วยสคริปต์ ดึงเนื้อหาไม่ได้ ค่าของสองเจ้านี้จึงอ่านจากไฟล์ token และ JSDoc ในแพ็กเกจที่เผยแพร่แล้วแทน ซึ่งเป็นต้นทางเดียวกับที่หน้าเว็บนั้นแสดง

---

## 1. สรุปคำตอบ 9 ประเด็น (อ่านหน้าเดียวจบ)

| # | ประเด็น | คำตอบสั้นจากข้อมูลจริง |
|---|---|---|
| 1 | ชุดขนาดและความสูง | มัธยฐาน **3 ขนาด** ความสูงที่ทุกเจ้ามีร่วมกันคือ **32 และ 40** ส่วน **การผูกความสูงกับปุ่ม มี 4 เจ้าที่ผูกด้วย token ตัวเดียวกันจริง** (Carbon, Spectrum, Ant Design, Guardian) และ **NewsKit เขียนเป็นกฎไว้เป็นตัวหนังสือ** ที่เหลือไม่ผูก และ **ทุกเจ้าที่ไม่ผูก มีค่าคลาดกันจริง 4 ถึง 8 px** |
| 2 | ระยะขอบในและมุมโค้ง | ระยะขอบแนวนอนที่ความสูง 40 มีมัธยฐาน **12** และ **แทบไม่มีใครเปลี่ยนระยะขอบแนวนอนตามขนาด** (Carbon เปลี่ยนตามแกน density ไม่ใช่ตามความสูง) เจ้าเดียวที่ผูกระยะขอบเข้ากับความสูงเป็นสูตรคือ **Spectrum** (`padding-x = height x 3/8`) มุมโค้งกระจาย 0 ถึง 8 ส่วนใหญ่คงที่ทุกขนาด |
| 3 | โครงสถานะ | ทุกเจ้าเป็น **คุณสมบัติเดียวหรือ prop แยกที่ไม่ทับกัน ไม่มีใครใช้ตัวเปิดปิดหลายตัวที่เปิดพร้อมกันได้** สถานะร่วมคือ default, hover, focus, disabled, error ส่วน **read-only มี 6 ใน 13 เจ้า แต่มีแค่ Carbon กับ Spectrum ที่ออกแบบหน้าตาให้จริง** ที่เหลือส่งเป็น attribute เปล่า |
| 4 | ทรงของช่องกรอก | ตลาดแตกเป็นสองฝั่งจริง Material 3 ยังมีทั้ง filled และ outlined ไม่มีประกาศเลิก และ **Ant Design เพิ่งเพิ่มทรง `underlined` เข้ามาใหม่ในรุ่น 5.24** สวนทางกับ **Adobe Spectrum ที่ตัดทรง quiet (ขีดล่าง) ทิ้งใน Spectrum 2 โดยเขียนว่า Not supported in S2 design** ข้อโจมตีที่มีหลักฐานคือเรื่องขอบเขตของช่องที่ไม่ชัดและข้อกำหนดคอนทราสต์ 3:1 |
| 5 | ป้ายกำกับ | **วางบนช่องเป็นค่าเริ่มต้นของทุกเจ้า** ป้ายลอย (floating) เหลือแค่ Material 3 กับ MUI และ **Material 3 เองเพิ่งประกาศเลิกตำแหน่ง `Attached`** ส่วนกติกา placeholder ห้ามใช้แทนป้ายกำกับ เป็น **ข้อที่ตลาดเห็นตรงกันมากที่สุดในรายงานนี้** พูดตรงกันอย่างน้อย 7 เจ้า |
| 6 | ตัวช่วยรอบช่อง | helper กับ error มีครบทุกเจ้า **ตัวนับตัวอักษรมี 7 เจ้า** และวางไม่ตรงกันเลย (Carbon วางข้างป้ายกำกับ, Polaris วางในช่อง, Ant วางนอกช่องมุมล่างขวา) **เครื่องหมายบังคับกรอกแตกเป็น 3 สำนักที่ขัดกันเอง** และ **คำนำหน้าที่เป็นข้อความมี 6 เจ้า** |
| 7 | ไอคอนและปุ่มในช่อง | **Fluent 2 เป็นเจ้าเดียวที่ไล่ขนาดไอคอนตามขนาดช่องอย่างเป็นระบบ** (16, 20, 24) ที่เหลือใช้ขนาดเดียว กติกาที่ตรงกันคือ **ไอคอนที่กดได้ต้องเป็นปุ่มจริง มีชื่อของตัวเอง และมีพื้นที่แตะของตัวเอง** ส่วนไอคอนที่กดไม่ได้ให้ซ่อนจากโปรแกรมอ่านหน้าจอ |
| 8 | ช่องหลายบรรทัด | ความสูงต่ำสุดกระจายมาก (Carbon 40, Spectrum 56, Fluent 40 ถึง 64) **แต่ระยะขอบแนวนอนเท่ากับช่องบรรทัดเดียวเสมอ** ทุกเจ้าที่ตรวจได้ ส่วนการลากยืด **แตกครึ่ง** Carbon กับ SLDS เปิด Base Web กับ Fluent ปิด และ **Ant ปิดเฉพาะบนอุปกรณ์สัมผัส** |
| 9 | accessibility | ป้ายกำกับผูกด้วย `label[for]` ตรงกับ `id` ข้อความผิดพลาดต้อง **เป็นข้อความ ไม่ใช่แค่สี** (WCAG 1.4.1 บวก 3.3.1 สองข้อพร้อมกัน) และผูกด้วย `aria-describedby` บวก `aria-invalid="true"` ส่วนความสูงต่ำสุด **WCAG 2.2 ระดับ AA คือ 24x24 CSS px** แต่ **Android แนะนำ 48dp และ iOS ใช้ 44pt เป็นค่าเริ่มต้น** ซึ่งสูงกว่าเกณฑ์ WCAG มาก |

---

## 2. สถานะปัจจุบันของ NTGDS (ตัวเลขจากการวัดไฟล์ Figma หน้า 13 Input เมื่อ 2026-09-01)

| ประเด็น | สถานะ |
|---|---|
| จำนวนชุดและแบบ | 3 ชุด รวม **144 แบบ** คือ `Text field / Default` 63 แบบ, `Text field / Under line` 63 แบบ, `Text area` 18 แบบ |
| คุณสมบัติ | `Type` 7 ค่า (Default, Leading Icon, Trailing Icon, Leading Button, Trailing button, Tags, Payment) และตัวเปิดปิดแยกกัน 5 ตัว (Destructive, Filled, Hover, Focused, Disabled) บวกตัวเปิดปิดของป้ายกำกับ ข้อความช่วย และแท็ก 1 ถึง 5 |
| ก้อนรวม | 320 x 93 ประกอบด้วยป้ายกำกับ ช่องกรอก และข้อความช่วย ระยะห่างระหว่างกัน 4 |
| ช่องกรอก | สูง **42** ระยะขอบใน 8 บน และ 10 ซ้ายขวา ระยะห่างภายใน 8 มุมโค้ง 8 เส้นขอบ 1 แบบ inside |
| กรอบซ้อน | ข้างในมีกรอบชื่อ `Text input` ที่มีระยะขอบ 0 บน และ 4 ซ้ายขวา อีกชั้น ทำให้ **ระยะขอบซ้ายที่ได้จริงเป็น 14 ไม่ใช่ 10** |
| ตัวอักษร | ตัวอักษรในช่อง 16px ป้ายกำกับ 14px **ทั้งสองอย่างไม่ได้ผูก text style** มีแต่ข้อความช่วยที่ผูก `Text/sm regular` |
| ช่องหลายบรรทัด | `Text area` ใช้ระยะขอบใน 12 บน และ 16 ซ้ายขวา **ไม่ตรงกับช่องกรอกปกติ** และป้ายกำกับสะกดผิดเป็น `Lebel` |
| สูตรขนาดในโค้ด | [`tokens/scale/input.mjs`](../../tokens/scale/input.mjs) **นิยามแค่มุมโค้ง** (`RADIUS_SCALE.md` = 8) ความสูงกับระยะขอบยังไม่ได้นิยาม และในไฟล์เขียนกำกับไว้เองว่า "ช่องกรอกไม่มีหลายขนาด มุมโค้งจึงคงที่ ไม่ต้องมีสูตร" |
| token ในโค้ด | `component.json` มีแค่ `input.radius.*` 4 มุม **ไม่มี `space.input.*` เลย** (มีแต่ `space.avatar.*` กับ `space.button.*`) |
| สีที่ยังไม่ผูกตัวแปร | **90 จุด** |
| ไอคอน | ยังเป็นชุดสำเร็จรูปเก่า ไม่ใช่ Nation UI Icons |

**ค่าอ้างอิงของเราที่ต้องใช้ตอนตัดสิน**

- ความสูงปุ่ม 24, 32, 40, 48, 56 จากสูตร base 24 step 8 ใน [`tokens/scale/button.mjs`](../../tokens/scale/button.mjs)
- ระยะขอบแนวนอนของปุ่ม 8, 10, 12, 14, 16 จาก base 8 step 2 และระยะห่างภายใน 2, 4, 6, 8, 10 จาก base 2 step 2
- ขนาดไอคอนในปุ่ม 16, 18, 20, 22, 24 จาก base 16 step 2
- มุมโค้งปุ่ม 6, 7, 8, 9, 10 จาก `RADIUS_FORMULA.button` base 6 step 1
- ปุ่มใช้ `State` เป็น **คุณสมบัติเดียว** ค่า default, hover, focused, disabled ตาม [12-buttons.md](../12-buttons.md) §4
- text preset ที่มีอยู่แล้วและใช้ได้ทันที `body/sm` 14 บน 24, `body/md` 16 บน 26, `body/lg` 18 บน 28, `label/sm` 12 บน 22, `label/md` 14 บน 24, `label/lg` 16 บน 26, `meta/helper` 12 บน 22

---

## 3. ชุดขนาด และคำถามที่สำคัญที่สุด ความสูงผูกกับปุ่มหรือไม่

### 3.1 ตารางรวมทุกเจ้า

| เจ้า | จำนวนขนาดของช่องกรอก | ความสูง (px) | ความสูงปุ่มของเจ้าเดียวกัน | ผูกด้วย token ตัวเดียวกันไหม |
|---|---|---|---|---|
| Material 3 | 1 | 56 dp | ปุ่มมี 5 ขนาด | ไม่ |
| MUI | 2 | 40 (small), 56 (medium) แบบ outlined | ไม่มีสเกลกลาง | ไม่ |
| IBM Carbon | 3 | 32, 40, 48 | 24, 32, 40, 48, 64, 80 | **ใช่ ตัวเดียวกัน** |
| Shopify Polaris | 2 | 32 (medium), 28 (slim) | 28 ที่จอ 768 ขึ้นไป | ไม่ คลาดกัน 4 |
| Atlassian | 2 | 40 (standard), 32 (compact) | 32, 24 | ไม่ คลาดกัน 8 ทุกขั้น |
| Microsoft Fluent 2 | 3 | 24, 32, 40 | 24, 32, 40 | ไม่ ค่าตรงกันแต่คนละที่ |
| GitHub Primer | 3 | 28, 32, 40 | 28, 32, 40 | ไม่ ปุ่มใช้ `control-*-size` ช่องกรอกใช้ `base-size-*` |
| Adobe Spectrum | 4 | 24, 32, 40, 48 (สัมผัส 30, 40, 50, 60) | ค่าเดียวกันทุกขนาด | **ใช่ ตัวเดียวกัน** |
| Ant Design | 3 | 24, 32, 40 | 24, 32, 40 | **ใช่ seed `controlHeight` ตัวเดียว** |
| Salesforce Lightning | 1 บวกไฟล์สัมผัส | 32 (ตัวชี้), 44 (สัมผัส) | มีคลาส `.slds-input_height` ให้ของอื่นสูงเท่าช่องกรอก | กึ่ง มีสัญญาความสูงกลาง แต่ไม่ใช่ token |
| Uber Base Web | 4 | 32, 36, 48, 60 | 28, 36, 48, 56 | ไม่ คลาดกัน 4 ที่ mini และ large |
| Guardian Source | 2 | 44 (medium), 36 (small) | 44, 36, 24 | **ใช่ สเกล `size` ตัวเดียว** |
| News UK NewsKit | 3 | ไม่ประกาศเป็น px | ไม่ประกาศ | **เขียนเป็นกฎว่าต้องเท่ากัน** |

**นับได้ว่า ผูกจริง 4 เจ้า บวก NewsKit ที่เขียนเป็นกฎ และ SLDS ที่มีสัญญาความสูงกลาง ส่วนไม่ผูก 7 เจ้า**

### 3.2 หลักฐานฝั่ง "ผูก"

**IBM Carbon** เป็นหลักฐานที่แข็งที่สุด เพราะ **ช่องกรอกกับปุ่มเรียกใช้ mixin ตัวเดียวกันจากไฟล์เดียวกัน** `[ทางการ]`

```scss
// scss/utilities/_layout.scss  สเกลกลางตัวเดียว
$layout-tokens: (size: (height: (xs: 24, sm: 32, md: 40, lg: 48, xl: 64, 2xl: 80)));

// components/text-input/_text-input.scss
@include layout.use('size', $default: 'md', $min: 'xs', $max: 'lg');
block-size: layout.size('height');

// components/button/_button.scss
@include layout.use('size', $min: 'xs', $default: 'lg', $max: '2xl');
```

- [`scss/utilities/_layout.scss`](https://raw.githubusercontent.com/carbon-design-system/carbon/main/packages/styles/scss/utilities/_layout.scss)
- [`components/text-input/_text-input.scss`](https://raw.githubusercontent.com/carbon-design-system/carbon/main/packages/styles/scss/components/text-input/_text-input.scss)
- [`components/button/_button.scss`](https://raw.githubusercontent.com/carbon-design-system/carbon/main/packages/styles/scss/components/button/_button.scss)

จุดที่น่าสนใจคือ **สเกลเดียวกันแต่หน้าต่างที่ใช้ได้ต่างกัน** ช่องกรอกเปิด xs ถึง lg และตั้งค่าเริ่มต้นที่ md ส่วนปุ่มเปิด xs ถึง 2xl และตั้งค่าเริ่มต้นที่ lg และเอกสารเขียนกำกับไว้ตรง ๆ ว่า *"Be sure to use a consistent field height when pairing form components on the same page."* [text-input/usage](https://carbondesignsystem.com/components/text-input/usage/) `[ทางการ]`

**Adobe Spectrum** ผูกทั้งชั้น token และชั้นโค้ด `[ทางการ]` ไฟล์ `text-field.json` และ `button.json` **ไม่มี token ความสูงอยู่เลย** แต่ละไฟล์มีแค่ตัวคูณความกว้างต่ำสุด ความสูงมาจากสเกลกลาง `component-height-*` เท่านั้น

| token | เดสก์ท็อป | สัมผัส |
|---|---|---|
| `component-height-75` (S) | 24 | 30 |
| `component-height-100` (M) | 32 | 40 |
| `component-height-200` (L) | 40 | 50 |
| `component-height-300` (XL) | 48 | 60 |

ในชั้น React Spectrum 2 ทั้งช่องกรอกและปุ่มเรียกฟังก์ชันเดียวกัน `control()` ต่างกันแค่ทรง (`shape: 'default'` เทียบกับ `shape: 'pill'`)

- [`layout.json`](https://raw.githubusercontent.com/adobe/spectrum-design-data/main/packages/tokens/src/layout.json)
- [`text-field.json`](https://raw.githubusercontent.com/adobe/spectrum-design-data/main/packages/tokens/src/text-field.json)
- [`style-utils.ts`](https://raw.githubusercontent.com/adobe/react-spectrum/main/packages/@react-spectrum/s2/src/style-utils.ts)
- [`Field.tsx`](https://raw.githubusercontent.com/adobe/react-spectrum/main/packages/@react-spectrum/s2/src/Field.tsx)

**Ant Design** ใช้ seed token ตัวเดียวชื่อ `controlHeight` = 32 แล้วคำนวณต่อเป็น `controlHeightSM` 24 และ `controlHeightLG` 40 ปุ่มตั้ง `height: controlHeight` ตรง ๆ ส่วนช่องกรอกไม่ได้ตั้งความสูง แต่คำนวณ padding ย้อนกลับจาก `controlHeight` `[ทางการ]`

```
paddingBlock = round(((controlHeight - fontSize x lineHeight) / 2) x 10) / 10 - lineWidth
```

ตรวจย้อนแล้วลงตัวทั้ง 3 ขนาด small 0 + 22 + 2 = 24, medium 4 x 2 + 22 + 2 = 32, large 7 x 2 + 24 + 2 = 40

- [`theme/themes/seed.ts`](https://github.com/ant-design/ant-design/blob/master/components/theme/themes/seed.ts)
- [`input/style/token.ts`](https://github.com/ant-design/ant-design/blob/master/components/input/style/token.ts)
- [`button/style/index.ts`](https://github.com/ant-design/ant-design/blob/master/components/button/style/index.ts)

**Guardian Source** (สื่อข่าว) มีสเกล `size` ชุดเดียว และ **เขียนคอมเมนต์กำกับไว้ในไฟล์ token ที่ generate อัตโนมัติ** ว่าใช้ได้ทั้งปุ่มและช่องกรอก `[ทางการ]`

```ts
/** May be used for call to action buttons and user input fields. */
export const size = {
  /** Meets WCAG 2.1 AAA compliance for touch targets. */
  medium: 44,
  small: 36,
  xsmall: 24,
} as const;
```

ช่องกรอกใช้ `height: size.medium` (44) และ `size.small` (36) ตรง ๆ

- [`foundations/__generated__/size.ts`](https://raw.githubusercontent.com/guardian/csnx/main/libs/%40guardian/source/src/foundations/__generated__/size.ts)
- [`text-input/styles.ts`](https://raw.githubusercontent.com/guardian/csnx/main/libs/%40guardian/source/src/react-components/text-input/styles.ts)

**News UK NewsKit** (สื่อข่าวอังกฤษ) ไม่ประกาศตัวเลข แต่ **เขียนเป็นกฎในเอกสาร** ว่า *"Text inputs should match the height of the button when used together."* [newskit.co.uk/components/text-field](https://newskit.co.uk/components/text-field/) `[ทางการ]`

### 3.3 หลักฐานฝั่ง "ไม่ผูก" และผลที่ตามมา

ข้อสังเกตที่สำคัญที่สุดของหัวข้อนี้คือ **เจ้าที่ไม่ผูกด้วย token ทุกเจ้ามีค่าคลาดกันจริง ไม่มีเจ้าไหนที่ค่าตรงกันครบทุกขั้นโดยไม่มี token ผูก**

| เจ้า | ที่คลาด | ขนาดที่คลาด |
|---|---|---|
| Uber Base Web | ช่องกรอก 32, 36, 48, 60 เทียบปุ่ม 28, 36, 48, 56 | คลาด 4 ที่ mini และ large ตรงกันแค่ compact และ default |
| Shopify Polaris | ช่องกรอก 32 เทียบปุ่ม 28 ที่จอเดสก์ท็อป | คลาด 4 ที่ขนาดเริ่มต้น ต้องใช้ `size="slim"` (28) ถึงจะเท่ากัน |
| Atlassian | ช่องกรอก 40, 32 เทียบปุ่ม 32, 24 | คลาด 8 ทุกขั้น |

**Fluent 2 เขียนยอมรับไว้ในโค้ดเองว่ายังไม่ได้แชร์** `[ทางการ]`

```ts
// TODO(sharing) should these be shared somewhere?
const fieldHeights = { small: '24px', medium: '32px', large: '40px' };
```
[`useInputStyles.styles.ts`](https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-input/library/src/components/Input/useInputStyles.styles.ts)

และปุ่มของ Fluent **ไม่ประกาศความสูงเลย** ความสูงเกิดจาก padding บวก line-height บวกเส้นขอบ ค่าที่ได้บังเอิญเท่ากับ 24, 32, 40 พอดี ถ้ามีคนแก้ line-height ของ preset ตัวใดตัวหนึ่ง ปุ่มจะขยับแต่ช่องกรอกจะไม่ขยับ

**GitHub Primer เป็นกรณีที่น่าเรียนรู้ที่สุด** เพราะ **เขียน token กลางไว้แล้ว ระบุในคำอธิบายของ token เองว่าใช้กับทั้งปุ่มและช่องกรอก แต่ช่องกรอกไม่เคยถูกย้ายมาใช้** `[ทางการ]`

คำอธิบายในไฟล์ token: `"Size tokens for interactive controls (buttons, inputs, selects)."` พร้อม `usage: ["button", "input", "select", "form-control", "interactive-element"]`

แต่ในโค้ดจริง ปุ่มใช้ `height: var(--control-medium-size)` ส่วนช่องกรอกใช้ `min-height: var(--base-size-32)` คนละ token กัน

- [`size.json5`](https://raw.githubusercontent.com/primer/primitives/main/src/tokens/functional/size/size.json5)
- [`TextInputWrapper.module.css`](https://raw.githubusercontent.com/primer/react/main/packages/react/src/internal/components/TextInputWrapper.module.css)
- [`ButtonBase.module.css`](https://raw.githubusercontent.com/primer/react/main/packages/react/src/Button/ButtonBase.module.css)

### 3.4 ข้อสรุปของประเด็นที่ 1

**ค่าความสูงที่ตลาดใช้ร่วมกันมากที่สุดคือ 32 และ 40** ปรากฏใน Carbon, Fluent, Primer, Spectrum, Ant, Atlassian, Base Web, Polaris ส่วน 48 ปรากฏใน Carbon, Spectrum, Base Web และ 24 ปรากฏใน Carbon, Fluent, Spectrum, Ant

**ช่องกรอกต่างจากอวาตาร์อย่างชัดเจนในประเด็นนี้** ตอนวิจัยอวาตาร์ ([avatar-component.md](avatar-component.md) §1) พบว่ามีเจ้าเดียวที่ผูกขนาดอวาตาร์กับความสูงปุ่ม แต่ช่องกรอกมี 4 เจ้าที่ผูก บวกอีก 2 เจ้าที่เขียนเป็นกฎหรือมีสัญญาความสูงกลาง เหตุผลตรงไปตรงมาคือ **อวาตาร์ไม่ค่อยวางในแถวเดียวกับปุ่ม แต่ช่องกรอกวางในแถวเดียวกับปุ่มเป็นเรื่องปกติ** (ช่องค้นหาคู่ปุ่มค้นหา, ช่องกรอกคู่ปุ่มบันทึก, แถวกรองข้อมูลในตาราง)

---

## 4. ระยะขอบในและมุมโค้ง

### 4.1 ตารางเทียบ

| เจ้า | ระยะขอบแนวนอน | ระยะขอบแนวตั้ง | มุมโค้ง | เปลี่ยนตามขนาดไหม |
|---|---|---|---|---|
| Material 3 | 16 (12 เมื่อมีไอคอน) | 16 ถ้าไม่มีป้ายในช่อง และ 8 ถ้ามี | filled บน 4 ล่าง 0, outlined 4 ทุกมุม | ไม่ (มีขนาดเดียว) |
| MUI outlined | 14 | 16.5 (medium), 8.5 (small) | 4 | ระยะแนวตั้งเปลี่ยน มุมโค้งไม่เปลี่ยน |
| IBM Carbon | **16** (density condensed = 8) | 0 ความสูงคุมด้วย `block-size` | **0** ไม่มีการประกาศ `border-radius` เลย | ไม่เปลี่ยนตามความสูง เปลี่ยนตามแกน density |
| Shopify Polaris | 12 | 6 (slim 2) | 8 | ระยะแนวตั้งเปลี่ยน |
| Atlassian | 6 (ช่องหลายบรรทัด 7) | 1 บวก 6 ถึง 8 ตามจุดตัดจอ | 3 (6 หลังเปิด flag ทรงใหม่) | ระยะแนวตั้งเปลี่ยน |
| Fluent 2 | 8, 12, 18 | 0 ใช้ `minHeight` บวก flex | 4 คงที่ (ทรง underline บังคับเป็น 0) | **เปลี่ยนตามขนาด** |
| GitHub Primer | 12 (8 เมื่อมีไอคอน) | 3, ไม่ประกาศ, 10 | 6 | ระยะแนวตั้งเปลี่ยน แต่ตัวเลข 3 กับ 10 ถูก linter ของ Primer เองเตือนว่าหลุดสเกล |
| Adobe Spectrum | **9, 12, 15, 18 จากสูตร `height x 3/8`** | จัดกลางแบบ optical (บน 6 ล่าง 9 ที่ M) | 4 (spectrum-css) หรือ 7, 8, 9, 10 (S2) | **เปลี่ยนตามขนาด ด้วยสูตร** |
| Ant Design | 7, 11, 11 | 0, 4, 7 (คำนวณย้อนจากความสูง) | 4, 6, 8 | **เปลี่ยนตามขนาดทั้งคู่** |
| Salesforce Lightning | ซ้าย 12 ขวา 16 (ไม่สมมาตรจริงในโค้ด) | 0 ความสูงคุมด้วย line-height 30 | 4 | ไม่ (มีขนาดเดียว) |
| Uber Base Web | ระยะของ root บวกของ enhancer | 4, 6, 10, 14 | 4 (mini), 8 (ที่เหลือ) | **เปลี่ยนตามขนาด** |
| Guardian Source | 8 | 0 ความสูงคุมด้วย `height` | 4 | ไม่ |

ที่มาเพิ่มเติม [`_text-input.scss`](https://raw.githubusercontent.com/carbon-design-system/carbon/main/packages/styles/scss/components/text-input/_text-input.scss) [`TextField.module.css`](https://raw.githubusercontent.com/Shopify/polaris/main/polaris-react/src/components/TextField/TextField.module.css) [`text-field.compiled.css`](https://unpkg.com/@atlaskit/textfield@10.2.0/dist/es2019/text-field.compiled.css) [`spectrum-theme.ts`](https://raw.githubusercontent.com/adobe/react-spectrum/main/packages/@react-spectrum/s2/style/spectrum-theme.ts) [`salesforce-lightning-design-system.css`](https://cdn.jsdelivr.net/npm/@salesforce-ux/design-system@2.264.0/assets/styles/salesforce-lightning-design-system.css)

### 4.2 อ่านได้ว่าอย่างไร

1. **ระยะขอบแนวนอนที่ความสูง 40 มีมัธยฐาน 12** ค่าที่พบคือ Ant 11, Polaris 12, Primer 12, Spectrum 12 ถึง 15, Fluent 12, SLDS 12 ถึง 16, MUI 14, Carbon 16, M3 16 ส่วนค่าที่ต่ำผิดปกติคือ Atlassian 6 และ Guardian 8
2. **แทบไม่มีใครเปลี่ยนระยะขอบแนวนอนตามความสูง** Carbon ยืนยันในตารางโครงสร้างของตัวเองว่า 16 เท่ากันหมดทั้ง sm, md, lg และเปลี่ยนตามแกน density แทน Polaris กับ Atlassian ก็คงที่ เจ้าที่เปลี่ยนจริงคือ Fluent, Spectrum, Ant, Base Web
3. **Spectrum เป็นเจ้าเดียวที่ผูกระยะขอบเข้ากับความสูงเป็นสูตร** `padding-x = height x 3/8` ให้ 9, 12, 15, 18 ซึ่งตรวจย้อนกับ token เก่า `component-edge-to-text-*` ได้พอดี วิธีนี้ทำให้เพิ่มขนาดใหม่แล้วไม่ต้องมานั่งเลือกค่า
4. **มุมโค้งส่วนใหญ่คงที่** เจ้าที่ให้มุมโค้งผันตามขนาดมีแค่ Ant (4, 6, 8) กับ Spectrum 2 (7, 8, 9, 10) และ **Spectrum 2 กับ spectrum-css ยังขัดกันเองอยู่** (4 คงที่ เทียบกับ 7 ถึง 10) ซึ่งเป็นอาการเดียวกับที่เคยเจอใน [shape-radius.md](shape-radius.md) §16.2
5. **Carbon ไม่มีมุมโค้งเลย** เพราะช่องกรอกของ Carbon เป็นทรงพื้นทึบบวกขีดล่าง ไม่ใช่กรอบสี่ด้าน

### 4.3 กรอบซ้อนชั้นแบบที่เรามี ตลาดทำไหม

**ไม่มีเจ้าไหนที่ตรวจได้ ตั้งระยะขอบเป็นสองชั้นซ้อนกันแล้วให้ผลลัพธ์เป็นค่าที่ไม่ได้ประกาศไว้ที่ไหน** ทุกเจ้าประกาศระยะขอบเป็นค่าเดียวบนกล่องเดียว ถ้ามีชั้นซ้อน (เช่น Base Web ที่มี root กับ input, Fluent ที่มี root กับ input slot) **แต่ละชั้นจะประกาศค่าไว้ชัดเจนและอธิบายได้ว่าทำไม**

ตัวอย่าง Fluent 2 ที่ตั้งใจแบ่งเป็นสองชั้น ระยะขอบของ root ลดลงเมื่อมีไอคอน (6, 10, 12) แล้วชดเชยด้วยระยะขอบของ input slot (2, 2, 6) เพื่อให้ไอคอนชิดขอบมากกว่าตัวอักษร ซึ่งเป็นการตัดสินใจเชิงออกแบบ ไม่ใช่ผลข้างเคียง

**ของเราต่างออกไป** กรอบ `Text input` ที่มีระยะขอบ 4 ซ้ายขวา ทำให้ระยะขอบซ้ายจริงเป็น 14 ซึ่ง **ไม่ตรงกับค่าที่ประกาศไว้ (10) และไม่ตรงกับค่าใดในตลาด** เป็นตัวเลขที่ไม่มีใครตั้งใจให้เป็น

---

## 5. โครงสถานะ และ read-only ต่างจาก disabled อย่างไร

### 5.1 โครงสถานะเป็นคุณสมบัติเดียวหรือหลายตัวเปิดปิด

| เจ้า | โครง | สถานะที่มี |
|---|---|---|
| Material 3 | token แยกตามสถานะ และ `enabled` กับ `readOnly` เป็น parameter คนละตัว | enabled, hover, focus, disabled, error และ error ซ้อนกับ hover และ focus ได้ (`ErrorHoverColor`, `ErrorFocusColor`) |
| IBM Carbon | รายการเดียว 8 สถานะ เขียนไว้ในเอกสาร | enabled, active, focus, error, warning, disabled, skeleton, read-only |
| Shopify Polaris | prop แยกที่ไม่ทับกัน | default, hover, focus, disabled, readOnly, error |
| Atlassian | prop boolean ที่ไม่ทับกัน | default, hover, focus-within, disabled, invalid บวก `isReadOnly` ที่ไม่มีหน้าตา |
| Fluent 2 | `appearance` บวกสถานะจาก CSS และ `Field` คุม validation | rest, hover, focus, disabled, error, warning, success |
| GitHub Primer | `validationStatus` เป็นค่าเดียว | rest, hover, focus, disabled, error, success |
| Adobe Spectrum | prop แยก และ read-only มี token ของตัวเอง | rest, hover, focus, key-focus, disabled, read-only, invalid, valid |
| Ant Design | `status` เป็นค่าเดียว | default, hover, focus, disabled, error, warning (บวก success กับ validating ที่ระดับฟอร์ม) |
| Salesforce Lightning | สถานะมาจาก class ของบรรพบุรุษ | default, focus, disabled, error, read-only, static |
| Uber Base Web | prop แยก | default, hover, focus, disabled, error, positive |
| Guardian Source | prop แยก | default, focus, error, success |

**ไม่มีเจ้าไหนที่ใช้ตัวเปิดปิดแยกกันหลายตัวแล้วเปิดพร้อมกันได้เอง** แบบที่ของเราทำอยู่ (Hover, Focused, Disabled เป็น 3 boolean แยก) ทุกเจ้าออกแบบให้สถานะการโต้ตอบเป็นค่าที่แทนกัน

**แต่มีข้อยกเว้นที่สำคัญ** สถานะการตรวจสอบความถูกต้อง (error, warning, success) **ซ้อนกับสถานะการโต้ตอบได้จริง** และ Material 3 ยืนยันเรื่องนี้ด้วย token ของตัวเอง มี `ErrorHoverOutlineColor` และ `ErrorFocusOutlineColor` แยกออกมาต่างหาก แปลว่าเวลาออกแบบต้องเผื่อคู่ error บวก focus ไว้ด้วย

### 5.2 read-only ต่างจาก disabled อย่างไร

**Carbon เขียนคำอธิบายไว้ดีที่สุดในตลาด** และเป็นข้อความที่ควรยกมาใช้ตรง ๆ `[ทางการ]`

> **Disabled** "When the user cannot interact with a component and all interactive functions have been removed. Unlike read-only states, disabled states are not focusable, are not read by screen readers, and do not need to pass visual contrast, making them inaccessible if they need to be interpreted."
>
> **Read-only** "When the user can review but not modify the component. This state removes all interactive functions like the disabled state but can still be focusable, accessible by screen readers, and passes visual contrast for readability."

[carbondesignsystem.com/components/text-input/usage](https://carbondesignsystem.com/components/text-input/usage/)

และ Carbon **ทำหน้าตาให้ต่างกันแบบสลับกัน** ซึ่งเป็นกฎที่จำง่ายมาก

| สถานะ | พื้นหลัง | ขีดล่าง | ตัวอักษร |
|---|---|---|---|
| disabled | คงพื้นไว้ (`$field`) | **โปร่งใส** | `$text-disabled` และเคอร์เซอร์ห้าม |
| read-only | **โปร่งใส** | คงเส้นไว้ (`$border-subtle`) | `$text-primary` สีปกติ |

**Adobe Spectrum** เป็นอีกเจ้าที่ทำจริง มี token ของตัวเองชื่อ `--spectrum-textfield-text-color-readonly` และเขียนนิยามไว้ `[ทางการ]`

> **Disabled** "A text field in a disabled state shows that an input field exists, but is not available in that circumstance. This can be used to maintain layout continuity and communicate that a field may become available later."
>
> **Read-only** "Text fields have a read-only option for when content in the disabled state still needs to be shown. This allows for content to be copied, but not interacted with or changed."

[spectrum.adobe.com/page/text-field](https://spectrum.adobe.com/page/text-field/)

**Material 3** อธิบายไว้ในเอกสาร API และยืนยันด้วยการที่ **ไม่มี token สีของ read-only เลยสักตัว** แปลว่าตั้งใจให้หน้าตาเหมือนปกติทุกประการ `[ทางการ]`

> `readOnly` "controls the editable state of the text field. When true, the text field cannot be modified. However, a user can focus it and copy text from it."
> `enabled` "When false, this component will not respond to user input, and it will appear visually disabled and disabled to accessibility services."

**Salesforce Lightning เป็นเจ้าเดียวที่แยกออกเป็นสองการนำเสนอคนละอย่าง** `[ทางการ]` แบบแรกคือ `input[readonly]` ที่ยังเป็น `<input>` แต่ถอดเส้นขอบและพื้นหลังออก แบบที่สองคือ `.slds-form-element__static` ที่ **ไม่มี `<input>` เลย** และเอกสารเขียนกฎ accessibility กำกับไว้ว่า

> "In some cases, the read-only field state is swapped and has no `<input>`. This is called `static` in the examples. In that case, don't use a `<label>`... Instead, use a `<span>` with the `.slds-form-element__label` class."

[github.com/salesforce-ux/design-system input/docs.mdx](https://raw.githubusercontent.com/salesforce-ux/design-system/master/ui/components/input/docs.mdx)

**ฝั่งที่ทำพลาด ก็มีให้เรียนรู้เหมือนกัน**

- **Atlassian** `isReadOnly` ในรุ่น 10.2.0 **ไม่มีการจัดหน้าตาเลย** ปรากฏแค่เป็น attribute บน `<input>` ช่องที่อ่านได้อย่างเดียวจึงแยกไม่ออกจากช่องที่แก้ไขได้
- **Polaris** ทำ read-only ให้ **หน้าตาเกือบเหมือน disabled** ใช้พื้นหลัง `bg-surface-disabled` เหมือนกัน ไม่มีเส้นขอบเหมือนกัน ต่างกันแค่สีตัวอักษร ซึ่งเป็นการทำที่ตรงข้ามกับ Carbon
- **Primer** ค้นทั้ง `TextInput.tsx`, `TextInputWrapper.tsx`, `Textarea.tsx` **ไม่มีคำว่า readOnly เลยสักที่**

**สรุปกฎที่ใช้ได้จริง** disabled คือ "มีอยู่แต่ตอนนี้ใช้ไม่ได้ อาจใช้ได้ทีหลัง" ทำให้จางลงได้และหลุดจากโปรแกรมอ่านหน้าจอ ส่วน read-only คือ "ข้อมูลนี้จริงและสำคัญ แค่แก้ไม่ได้" **ต้องอ่านออก ต้องคัดลอกได้ ต้องผ่านเกณฑ์คอนทราสต์ และต้องโฟกัสด้วยแป้นพิมพ์ได้**

---

## 6. ทรงของช่องกรอก แบบขีดล่างยังมีอยู่ไหม

### 6.1 ใครมีทรงอะไรบ้าง

| เจ้า | ทรงที่มี | สถานะของทรงขีดล่าง |
|---|---|---|
| Material 3 | filled (พื้นทึบบวกขีดล่าง), outlined | **ยังมีทั้งคู่ ไม่มีประกาศเลิก** เอกสารเขียนว่าทำงานเหมือนกันทุกประการ |
| MUI | outlined, filled, standard (ขีดล่างล้วน) | **standard ไม่มีในคู่มือ Material แล้ว แต่ MUI ประกาศว่าจะรองรับต่อไป** |
| IBM Carbon | default, fluid | **ทรง default ของ Carbon เองก็คือพื้นทึบบวกขีดล่าง ไม่มีมุมโค้ง** ทั้งระบบเป็นทรงนี้ |
| Shopify Polaris | inherit, borderless | มี borderless แต่ **ไม่มีคำเตือนกำกับ** |
| Atlassian | standard, subtle, none | มี และ **มีคำเตือนใน JSDoc** |
| Fluent 2 | outline, underline, filled-darker, filled-lighter บวกสองตัวที่เลิกใช้แล้ว | **มี underline สำหรับช่องบรรทัดเดียว แต่ช่องหลายบรรทัดไม่มี underline** |
| GitHub Primer | ไม่มีทรงเชิงสไตล์ มีแค่ block, monospace, contrast | ไม่มี |
| Adobe Spectrum | Spectrum 1 มี quiet (ขีดล่างล้วน) | **Spectrum 2 ตัดทิ้ง เขียนว่า Not supported in S2 design** |
| Ant Design | outlined, borderless, filled, **underlined** | **เพิ่งเพิ่ม `underlined` เข้ามาในรุ่น 5.24** |
| Salesforce Lightning | กรอบสี่ด้าน | ไม่มี (ยกเว้นการนำเสนอแบบ static ที่ใช้ขีดล่าง) |
| Uber Base Web | กรอบสี่ด้าน หนา 2 | ไม่มี |
| Guardian Source | กรอบสี่ด้าน หนา 1 | ไม่มี |

### 6.2 หลักฐานว่า Spectrum ตัดทิ้ง

เอกสารเทียบ API ทางการของ React Spectrum 2 เขียนไว้เป็นตาราง `[ทางการ]`

| Prop | Spectrum 2 | RSP v3 | Comments |
|---|---|---|---|
| `isQuiet` | ไม่มี | `boolean` | **Not supported in S2 design.** |
| `placeholder` | ไม่มี | `string` | **Removed for accessibility reasons.** |

[api-diff.md](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/s2/api-diff.md)

ยืนยันซ้ำจากฝั่ง token ด้วย `field-edge-to-border-quiet` และ `field-label-to-component-quiet-*` ทั้งสี่ตัว ถูกทำเครื่องหมาย `"deprecated": true` แล้ว

และก่อนหน้านั้น Spectrum 1 เองก็เคยเขียนเตือนไว้แล้วว่า *"Don't use quiet style for fixed-height text areas... If a text area is using the quiet style, the field underline may be too far away from the text to be recognized as part of the component."* [spectrum.adobe.com/page/text-area](https://spectrum.adobe.com/page/text-area/) `[ทางการ]`

### 6.3 ข้อโจมตีที่มีหลักฐาน

**ข้อ 1 ขอบเขตของช่องไม่ชัด** Adam Silver เขียนไว้ตรง ๆ ในบทความที่ Smashing Magazine เอาไปตีพิมพ์ซ้ำ `[แหล่งรอง]`

> "Instead I recommend using conventional text fields which have: the label outside the input (to tell the user what to type); a distinct border all the way around (to make it obvious where the answer goes)."

[adamsilver.io/blog/material-design-text-fields-are-badly-designed](https://adamsilver.io/blog/material-design-text-fields-are-badly-designed/) และฉบับที่ผ่านบรรณาธิการ [smashingmagazine.com](https://www.smashingmagazine.com/2021/02/material-design-text-fields/)

**ข้อ 2 สัญญาณสายตาที่อ่อนมีต้นทุนที่วัดได้** งานติดตามสายตาของ NN/g วัดได้ว่า `[แหล่งรอง]`

> "On average participants spent 22% more time (i.e., slower task performance) looking at the pages with weak signifiers." และ "people had 25% more fixations on the pages with weak signifiers."

[nngroup.com/articles/flat-ui-less-attention-cause-uncertainty](https://www.nngroup.com/articles/flat-ui-less-attention-cause-uncertainty/)

> **ข้อควรระวังที่ต้องพูดตามตรง** งานชิ้นนี้วัดสัญญาณของสิ่งที่กดได้โดยรวม เช่น ปุ่มโปร่งและข้อความลิงก์ที่ไม่มีการจัดรูปแบบ **ไม่ได้ทดสอบช่องกรอกโดยตรง** ตัวเลข 22 กับ 25 เปอร์เซ็นต์จึงใช้อ้างเป็นหลักฐานเชิงหลักการได้ แต่ห้ามอ้างว่าเป็นผลการวัดช่องกรอก

**ข้อ 3 ข้อกำหนดคอนทราสต์ที่เข้มกว่า** ทั้ง Carbon และ Fluent เขียนเป็นข้อบังคับ `[ทางการ]`

- Carbon "**Field**: The container in which a user enters data. **Must meet 3:1 non-text contrast requirements.**"
- Fluent "All inputs must have some part of their boundary meet 3:1 contrast... The placeholder or value text are not sufficient" และแนะนำว่า *"When the contrast ratio against the immediate surrounding color is less than 3:1, consider using underline or outline styles"*

ที่น่าสนใจคือ Fluent มองว่าทรง underline เป็น **ทางแก้** ของปัญหาคอนทราสต์ ไม่ใช่ตัวปัญหา เพราะทรงที่มีปัญหาสำหรับ Fluent คือทรง filled ที่ต้องอาศัยความต่างของสีพื้น

**ข้อ 4 คำเตือนของ Atlassian** เขียนไว้ใน JSDoc ซึ่งเป็นตัวสร้างหน้าเอกสารของเขาเอง `[ทางการ]`

> "Subtle shows styling on hover. **None prevents all field styling. Take care when using the none appearance as this doesn't include accessible interactions.**"

### 6.4 ข้อสรุปของประเด็นที่ 4

**ตลาดยังไม่ตัดสิน และกำลังเดินสวนทางกัน** ฝั่งที่ตัดทิ้งมี Spectrum 2 (ชัดเจนที่สุด) และ Material ที่ถอดทรง standard ของ M2 ออกจากคู่มือ ฝั่งที่ยังเดินหน้ามี Ant Design ที่เพิ่งเพิ่มเข้ามาใหม่ปี 2025, Fluent ที่มองว่าเป็นทางแก้เรื่องคอนทราสต์, และ Carbon ที่ทั้งระบบเป็นทรงนี้อยู่แล้ว

> **สิ่งที่ยืนยันไม่ได้** ไม่พบประกาศจาก Google เองว่าเลิกหรือไม่แนะนำทรง filled และหน้าเอกสาร m3.material.io ดึงเนื้อหาไม่ได้ ห้ามอ้างว่า Material เลิกทรงขีดล่างแล้ว

**สิ่งที่ตลาดเห็นตรงกันจริงมีข้อเดียว** ไม่ว่าจะเลือกทรงไหน **ขอบเขตของช่องต้องผ่านคอนทราสต์ 3:1** และสีของตัวอักษรหรือ placeholder ไม่นับเป็นขอบเขต

---

## 7. ป้ายกำกับ และกติกาเรื่อง placeholder

### 7.1 ตำแหน่งป้ายกำกับ

| เจ้า | ตำแหน่ง | ค่าเริ่มต้น |
|---|---|---|
| Material 3 | 4 แบบ Inside, Cutout, Above, Attached | filled ใช้ Inside, outlined ใช้ Cutout และ **Attached ถูกประกาศเลิกแล้ว** |
| MUI | ลอย (floating) เท่านั้น | ลอย |
| IBM Carbon | บนช่อง นอกกรอบ ขนาด 12px ระยะห่าง 8 | บนช่อง ส่วนทรง fluid วางป้ายไว้ในช่องแบบตายตัว ไม่ใช่ป้ายลอย |
| Shopify Polaris | บนช่อง ระยะห่าง 4 | บนช่อง |
| Atlassian | บนช่อง 12px ตัวหนา ระยะห่าง 4 | บนช่อง |
| Fluent 2 | บนช่อง หรือด้านซ้าย (`orientation`) | บนช่อง และเตือนว่า *"Use caution when left aligning the labels as it can decrease readability."* |
| GitHub Primer | บนช่องเท่านั้น และ **บังคับให้มี** | บนช่อง มีคำเตือนตอนพัฒนาถ้าไม่ใส่ |
| Adobe Spectrum | บนช่อง หรือด้านข้าง | บนช่อง และเขียนเหตุผลไว้ |
| Ant Design | บนช่อง หรือด้านซ้าย (จัดที่ `Form.Item`) | ด้านซ้าย (`layout: horizontal`) |
| Salesforce Lightning | บนช่อง 12px | บนช่อง |
| Guardian Source | บนช่อง | บนช่อง |
| GOV.UK | บนช่อง | บนช่อง |

เหตุผลของ Spectrum ที่เขียนไว้ตรง ๆ `[ทางการ]` *"Top labels are the default and are recommended because they work better with long copy, localization, and responsive layouts. Side labels are most useful when vertical space is limited."*

**ป้ายลอยเหลือน้อยลงเรื่อย ๆ** เหลือแค่ Material 3 กับ MUI และ Material 3 เองก็เพิ่งเลิกตำแหน่ง `Attached` ไป

### 7.2 กติกา placeholder ใช้แทนป้ายกำกับไม่ได้

**นี่คือข้อที่ตลาดเห็นตรงกันมากที่สุดในรายงานนี้ ไม่มีเจ้าไหนเห็นต่าง**

| เจ้า | ข้อความ |
|---|---|
| Adobe Spectrum `[ทางการ]` | หัวข้อชื่อ "Don't use placeholder text" ตรง ๆ *"Putting instructions for how to complete an input, requirements, or any other essential information into placeholder text is not accessible. Once a value is entered, placeholder text is no longer viewable; if someone is using an automatic form filler, they will never get the information in the placeholder text."* |
| Microsoft Fluent 2 `[ทางการ]` | *"The `placeholder` prop is not a substitute for a label. Placeholder text disappears as soon as the user starts typing, while WCAG requires a persistent visual label to be present. Placeholder also fails contrast requirements in some themes by design."* |
| IBM Carbon `[ทางการ]` | *"Placeholder text can be harmful to user interactions and should only be added when necessary."* และ *"it should not be used as a replacement for a persistent label nor should it contain crucial information."* บวกกฎว่า placeholder **ไม่แสดงโดยค่าเริ่มต้น** |
| GitHub Primer `[ทางการ]` | *"Avoid using placeholders if at all possible. Instead, use a caption to communicate this information."* |
| Shopify Polaris `[ทางการ]` | *"don't rely on placeholders alone since the content isn't always conveyed to all merchants."* |
| Atlassian `[ทางการ]` | *"Don't use placeholder text to provide instructions as it disappears on data entry."* |
| GOV.UK `[ทางการ]` | *"Do not use placeholder text in place of a label, or for hints or examples"* และ **ไม่มีตัวเลือก `placeholder` ในมาโครของ component เลย** คือออกแบบให้ใช้ไม่ได้ ไม่ใช่แค่ไม่แนะนำ |
| W3C WAI `[ทางการ]` | *"While placeholder text provides valuable guidance for many users, placeholder text is not a replacement for labels. Assistive technologies, such as screen readers, do not treat placeholder text as labels."* |
| Adobe Spectrum 2 `[ทางการ]` | ตัด prop `placeholder` ออกจาก API พร้อมเหตุผล "Removed for accessibility reasons" (แต่ต้องระบุว่า **โค้ดปัจจุบันใส่กลับมาแล้ว** ให้อ่านตารางนั้นเป็นจุดยืนเชิงออกแบบ ไม่ใช่ API ปัจจุบัน) |

**หลักฐานฝั่งงานวิจัย** NN/g "Placeholders in Form Fields Are Harmful" `[แหล่งรอง]` ให้เหตุผล 7 ข้อ โดยข้อที่เกี่ยวกับป้ายลอยโดยตรงคือ *"Ultimately, floating labels do offer a better user experience than the label as a placeholder. But if you have the screen space, placing the label and hint outside the field is still the best way to go."* [nngroup.com/articles/form-design-placeholders](https://www.nngroup.com/articles/form-design-placeholders/)

Adam Silver ให้ข้อโจมตีป้ายลอย 8 ข้อ โดยข้อที่เป็นเหตุผลเชิงระบบ (ไม่ใช่เชิงหน้าจอเดียว) คือ *"The float label function only really applies to a text input. They cannot really be applied to checkboxes, radio buttons and select boxes."* แปลว่าถ้าใช้ป้ายลอย ป้ายกำกับใน component library จะไม่เป็นระบบเดียวกัน [adamsilver.io/blog/float-labels-are-problematic](https://adamsilver.io/blog/float-labels-are-problematic/) `[แหล่งรอง]`

---

## 8. ตัวช่วยรอบช่อง

### 8.1 ตารางเทียบ

| เจ้า | ข้อความช่วย | ข้อความผิดพลาด | ตัวนับตัวอักษร | เครื่องหมายบังคับกรอก | คำนำหน้าและต่อท้ายที่เป็นข้อความ |
|---|---|---|---|---|---|
| Material 3 | supporting text 12px ระยะห่าง 4 | แทนที่ supporting text | มี (Android ปิดโดยค่าเริ่มต้น) | ดอกจันบวกข้อความ `*required` | **มี** `prefix` และ `suffix` ระยะห่าง 2 |
| MUI | `helperText` | `error` บวก `helperText` | **ไม่มี** | `required` เติมดอกจัน | `InputAdornment` |
| IBM Carbon | 12px ระยะห่าง 4 และ **ซ่อนในทรง fluid** | `role="alert"` | **มี และนับคำได้ด้วย** วางข้างป้ายกำกับ | **คำในป้ายกำกับ** `(optional)` หรือ `(required)` | ไม่มี |
| Shopify Polaris | `HelpText` ระยะห่าง 4 | ไอคอนบวกข้อความ | **มี** วางในช่อง ชิดขวา | ดอกจันสีวิกฤต | **มี** `prefix`, `suffix`, `connectedLeft`, `connectedRight` |
| Atlassian | 12px ระยะห่าง 4 | ไอคอนบวกข้อความสีอันตราย | **มี** (`CharacterCounterField`) | ดอกจันสีอันตราย | ช่องเสียบเปล่า `elemBeforeInput`, `elemAfterInput` |
| Fluent 2 | `Field.hint` 12px ระยะห่าง 2 | `validationMessage` บวกไอคอน 12px | ไม่มี | ดอกจันต่อท้ายป้าย | **มี** `contentBefore`, `contentAfter` |
| GitHub Primer | `FormControl.Caption` | `FormControl.Validation` ไอคอน 12px | **มี** บวกพื้นที่ประกาศสด และข้อความซ่อน "You can enter up to N characters" | `requiredIndicator` เปิดโดยค่าเริ่มต้น | `leadingVisual`, `trailingVisual` |
| Adobe Spectrum | description และระยะห่าง 0 | **แทนที่ description** | **มี** ขนาดตัวอักษรต่างกันตามขนาดช่อง | `necessityIndicator` เป็น `icon` หรือ `label` | `prefix` เท่านั้น ไม่มี suffix |
| Ant Design | `Form.Item help` และ `extra` | สร้างจากกฎตรวจสอบ | **มี** วางนอกช่องมุมล่างขวา | `requiredMark` รับได้ทั้ง `true`, `'optional'`, หรือฟังก์ชัน | `prefix`, `suffix` และ `addonBefore` กับ `addonAfter` ที่ **เลิกใช้แล้วในรุ่น 6** |
| Salesforce Lightning | 12px ใช้คลาสเดียวกับข้อความผิดพลาด | คลาสเดียวกับข้อความช่วย สถานะมาจากบรรพบุรุษ | ไม่มี | `<abbr class="slds-required" title="required">*</abbr>` วางหน้าป้าย | `.slds-form-element__addon` |
| Uber Base Web | `Caption` 12px | `Caption` สีลบบวกไอคอน 12px | ไม่มี | ไม่มี | **มี** `startEnhancer`, `endEnhancer` รับข้อความล้วนได้ |
| Guardian Source | `supporting` | `error` และ **มี `success` ด้วย** | ไม่มี | **`optional` เติมคำว่า Optional ต่อท้ายป้าย** | ไม่มี |
| GOV.UK | hint | error message | ผ่าน component แยก | ไม่มีดอกจัน | **มี** prefix และ suffix ที่ตั้ง `aria-hidden="true"` |

### 8.2 เครื่องหมายบังคับกรอก แตกเป็น 3 สำนักที่ขัดกันเอง

**สำนักที่ 1 ทำเครื่องหมายเฉพาะฝั่งที่น้อยกว่า** Carbon เขียนกฎไว้ชัด `[ทางการ]`

> "If the majority of the fields are required, mark **only** the optional field labels with _(optional)_."
> "If the majority of the fields are optional, mark **only** the required field labels with _(required)_."

[carbondesignsystem.com/patterns/forms-pattern](https://carbondesignsystem.com/patterns/forms-pattern/)

Spectrum พูดเรื่องเดียวกัน *"In a single form, mark only the required fields or only the optional fields, depending on whichever is less frequent in the entire form... An asterisk should never be used to note that a text field is optional."*

**สำนักที่ 2 เขียนคำว่า Optional เสมอ** Polaris *"Be labeled as 'Optional' when you need to request input that's not required"* และ Guardian Source ทำเป็น prop ชื่อ `optional` ที่เติมคำว่า Optional ต่อท้ายป้าย

**สำนักที่ 3 ดอกจันสีแดง** Atlassian, Polaris, SLDS, Spectrum (ค่าเริ่มต้นเป็นไอคอนดอกจัน), Fluent, Primer, MUI

**รายละเอียดที่ควรจำจาก Spectrum** `[ทางการ]` *"The asterisk used in this component is an icon that has specific spacing from the label text, not part of the label text itself."* คือดอกจันไม่ควรเป็นตัวอักษรที่ต่อท้ายข้อความป้าย แต่ควรเป็นชิ้นแยกที่มีระยะห่างของตัวเอง

**และของ SLDS ที่ควรเลียนแบบ** ใช้ `<abbr title="required">` ซึ่งทำให้โปรแกรมอ่านหน้าจออ่านคำเต็มออกมาแทนที่จะอ่านว่า "ดอกจัน"

### 8.3 ตัวนับตัวอักษร วางตรงไหน

**ไม่มีมาตรฐาน วางกันคนละที่หมด** Carbon วางข้างป้ายกำกับด้านบน (ใช้ `justify-content: space-between`), Polaris วางในช่องชิดขวา, Ant วางนอกช่องมุมล่างขวาที่ระยะ -22px, Atlassian และ Primer วางใต้ช่อง

**กติกา accessibility ของตัวนับที่ตรงกันคือ ตัวเลขที่เห็นต้องซ่อนจากโปรแกรมอ่านหน้าจอ แล้วประกาศด้วยข้อความแยก** Carbon ตั้ง `aria-hidden="true"` บนตัวนับแล้วมีข้อความซ่อนว่า "Character limit {n}" ส่วน Primer ใช้พื้นที่ประกาศสดที่หน่วงเวลา และ Polaris ตั้ง `aria-live` เป็น polite เฉพาะตอนโฟกัส

**พฤติกรรมตอนเกินจำนวน แตกกัน** Carbon บังคับตัดที่ `maxLength` ตรง ๆ (*"Once the max number of characters is reached the text area should prevent the user from entering any additional character"*) ส่วน Ant มีโหมด `count.max` ที่ **เตือนแต่ไม่ตัด** ซึ่งเป็นพฤติกรรมที่ดีกว่าสำหรับงานเขียนข่าว เพราะการตัดข้อความกลางประโยคทำให้เสียเนื้อหา

---

## 9. ไอคอนและปุ่มในช่อง

### 9.1 ขนาดไอคอนต่อขนาดช่อง

| เจ้า | ขนาดไอคอน | ผันตามขนาดช่องไหม |
|---|---|---|
| Material 3 | 24 dp | ไม่ (มีขนาดเดียว) |
| IBM Carbon | 16 | ไม่ |
| Shopify Polaris | 20 คงที่ | ไม่ |
| Atlassian | 16 (ค่าเริ่มต้นของ icon) | ไม่ และ **ช่องเสียบไม่มีกฎขนาดเลย** |
| Fluent 2 | **16, 20, 24** | **ใช่** |
| GitHub Primer | 16 (ค่าเริ่มต้นของ Octicon) แต่ **ปุ่มในช่องผันตามขนาด 20, 24, 28** | ไอคอนไม่ผัน ปุ่มผัน |
| Adobe Spectrum | ไอคอนตรวจสอบ 16, 20, 22, 26 (สัมผัส 18, 24, 28, 30) | **ใช่** |
| Ant Design | 12 (`fontSizeIcon` = `fontSizeSM`) | ไม่ |

**Fluent 2 เป็นเจ้าเดียวที่ไล่ขนาดไอคอนตามขนาดช่องอย่างเป็นระบบครบทุกไอคอน** ค่าที่ใช้คือ 16, 20, 24 สำหรับช่องสูง 24, 32, 40

### 9.2 ปุ่มในช่องควรเป็นปุ่มจริงหรือแค่ไอคอน

**คำตอบที่ตรงกันคือ ถ้ากดได้ต้องเป็นปุ่มจริง มีชื่อของตัวเอง และมีพื้นที่แตะของตัวเอง**

**Material 3 (ฝั่ง Android) เขียนกฎแยกไว้ชัดที่สุด** `[ทางการ]`

> "Icons that don't have click listeners set on them work as decorative elements, and are therefore skipped by screen readers."

และไอคอนที่กดได้จะได้ขนาดต่ำสุด 48dp โดยอัตโนมัติผ่าน `app:startIconMinSize` และ `app:endIconMinSize`

**Fluent 2** เขียนไว้ว่าปุ่มในช่องเป็นจุดหยุดของแป้นพิมพ์แยกต่างหาก ผู้เขียนต้องใส่ `aria-label` ของตัวเอง เพราะ *"the input's label does not propagate to it"* และ **ปุ่มจะไม่ถูกปิดตามเมื่อช่องกรอกถูกปิด**

**IBM Carbon เป็นเจ้าเดียวที่รับประกันพื้นที่แตะได้จริง** ปุ่มสลับการมองเห็นรหัสผ่านเป็น `<button>` ที่ตั้ง `block-size: 100%` และ `aspect-ratio: 1` แปลว่าพื้นที่กดเป็นสี่เหลี่ยมจัตุรัสเท่าความสูงของช่องพอดี ที่ขนาด md จึงได้ 40 x 40

**GitHub Primer ขยายพื้นที่แตะด้วยชั้นซ้อนเมื่อเป็นตัวชี้แบบหยาบ** `@media (pointer: coarse) { ::after { min-height: 44px } }` โดยที่ **ขนาดของ component เองไม่เปลี่ยน** เป็นวิธีที่ไม่ทำให้ layout ขยับ

**ฝั่งที่ยังไม่ได้ทำ** Atlassian ปล่อยเป็นช่องเสียบเปล่าไม่มีกฎขนาดหรือพื้นที่แตะ, Ant มีปุ่มล้างเป็น `<button>` จริงแต่ไม่บังคับพื้นที่แตะต่ำสุด, Base Web ให้ปุ่มมีตัวเลือกขยายพื้นที่แตะเป็น 48 แต่ **ช่องกรอกไม่มีกลไกเดียวกัน**

**ข้อควรระวังจาก Polaris** ปุ่มล้างของ Polaris **มองไม่เห็นจนกว่าจะโฟกัสเข้าไปในช่อง** (`.TextField:not(:focus-within) .ClearButton { visibility: hidden }`) ซึ่งทำให้ค้นพบยาก

**คำแนะนำของ Primer เรื่องจำนวน** `[ทางการ]` *"Avoid overwhelming the TextInput by using both a leading and trailing visual."* และ *"Use a trailing action button (e.g., clear button) without a label when possible. Avoid using it alongside a trailing visual."*

---

## 10. ช่องกรอกหลายบรรทัด

| เจ้า | ความสูงต่ำสุด | จำนวนบรรทัดเริ่มต้น | ลากยืดได้ไหม | ระยะขอบเทียบช่องบรรทัดเดียว |
|---|---|---|---|---|
| Material 3 | ไม่กำหนด มาจาก rows | 2 | `resize: both` | ใช้ token ชุดเดียวกัน |
| MUI | จาก minRows | ไม่มี ขยายตามเนื้อหา | **ปิด** (`resize: none`) | แนวนอนเท่ากัน (14) |
| IBM Carbon | **40** และ **ความกว้างต่ำสุด 160** | 4 | **เปิด แนวตั้ง** และเอกสารนับที่จับลากเป็นส่วนหนึ่งของกายวิภาค | **แนวนอนเท่ากัน (16)** แนวตั้งเป็น 11 (ช่องบรรทัดเดียวเป็น 0) |
| Shopify Polaris | 32 (สืบทอดจากช่องปกติ) | 1 | ปิด และขยายเองด้วย JS | แนวนอนเท่ากัน (12) |
| Atlassian | 54 ที่ 2 บรรทัด | 2 | `resize` ค่าเริ่มต้นเป็น `smart` และเพดาน `50vh` | **แนวนอน 7 เทียบช่องปกติ 6 ต่างกัน 1** ซึ่งเป็นความไม่สอดคล้องที่มองเห็นได้ |
| Fluent 2 | **40, 52, 64** และเพดาน 200, 260, 320 | ไม่ระบุ | **ปิด** เป็นค่าเริ่มต้น | **ต่างกัน** มีระยะขอบแนวตั้ง 4, 6, 8 ทั้งที่ช่องบรรทัดเดียวเป็น 0 |
| GitHub Primer | ไม่กำหนด มาจาก rows | **7** | **เปิด ทั้งสองแกน** | **ต่างกัน** ใช้ 12 รอบด้าน ไม่สนใจระยะของกล่องครอบ |
| Adobe Spectrum | **56 เดสก์ท็อป และ 70 สัมผัส** ความกว้างต่ำสุด 112 และ 140 | ขยายเอง | มีที่จับลากมุมล่างขวา | ใช้สูตร `edge-to-text` เดียวกัน |
| Ant Design | **32** (เท่า `controlHeight`) | ตามค่าปริยายของเบราว์เซอร์ | **เปิดแนวตั้ง และปิดบนอุปกรณ์สัมผัส** | เท่ากัน |
| Salesforce Lightning | **ไม่มีค่าปริยาย** (ตัวแปรไม่มีค่าสำรอง) | ไม่ระบุ | เปิด แนวตั้ง | **ต่างกัน** 8 บน 12 ซ้ายขวา เทียบช่องปกติ 0 บน 12 ถึง 16 |
| Uber Base Web | **ไม่มี** | 3 | **ปิด** | ใช้สไตล์ชุดเดียวกับช่องบรรทัดเดียวทั้งหมด |
| Guardian Source | ไม่กำหนด | ไม่ระบุ | ตามค่าปริยาย | **แนวนอนเท่ากัน (8)** แนวตั้งบน 8 ล่าง 0 |

**อ่านได้ว่า**

1. **ระยะขอบแนวนอนควรเท่ากับช่องบรรทัดเดียวเสมอ** ทุกเจ้าที่ตรวจได้ทำแบบนี้ ยกเว้น Atlassian ที่ต่างกัน 1 px (ซึ่งดูเหมือนความผิดพลาด) และ Primer ที่ใส่ 12 รอบด้านทับ ของเราที่ใช้ 16 เทียบกับช่องปกติ 10 คือ **ต่างกัน 6 ซึ่งมากกว่าทุกเจ้าในตลาด**
2. **ระยะขอบแนวตั้งต่างได้ และควรต่าง** เพราะช่องบรรทัดเดียวคุมความสูงด้วยตัวเลข ส่วนช่องหลายบรรทัดคุมด้วยจำนวนบรรทัด จึงต้องมีระยะขอบแนวตั้งจริง Carbon 11, Fluent 4 ถึง 8, SLDS 8, Guardian 8
3. **การลากยืดแตกครึ่ง** เปิด 5 เจ้า (Carbon, SLDS, Ant, Primer, M3) ปิด 4 เจ้า (Fluent, MUI, Base Web, Polaris) และ **Ant มีทางสายกลางที่ฉลาดที่สุด คือเปิดบนตัวชี้แต่ปิดบนอุปกรณ์สัมผัส** ด้วย `@media (hover: none) and (pointer: coarse)` ซึ่งตรงกับสภาพผู้ใช้ของเราที่เป็นมือถือ 70 เปอร์เซ็นต์
4. **ความสูงต่ำสุดที่มีเหตุผลอธิบายได้ดีที่สุดคือ Spectrum** 56 บนเดสก์ท็อป และ 70 บนสัมผัส เพราะเป็นค่าที่มาจากสเกล 1 ต่อ 1.25 ของทั้งระบบ ไม่ใช่ตัวเลขลอย

---

## 11. Accessibility

### 11.1 ป้ายกำกับผูกกับช่องอย่างไร

**W3C WAI Forms Tutorial** `[ทางการ]` *"Whenever possible, use the label element to associate text with form elements explicitly. The for attribute of the label must exactly match the id of the form control."* และเตือนเรื่อง `title` ว่า *"This approach is generally less reliable and not recommended because some screen readers and assistive technologies do not interpret the title attribute as a replacement for the label element."* [w3.org/WAI/tutorials/forms/labels](https://www.w3.org/WAI/tutorials/forms/labels/)

| เจ้า | วิธีผูก |
|---|---|
| MUI | `<label for>` และเตือนว่าถ้าไม่ใส่ `id` เอง ตอน SSR จะยังไม่ผูก |
| Carbon | `<label htmlFor={id}>` |
| Polaris | `aria-labelledby` รวม id ของป้าย คำนำหน้า คำต่อท้าย และเนื้อหาแนวตั้ง |
| Atlassian | `aria-labelledby` ชี้ไปที่ `${fieldId}-label` |
| Fluent 2 | `Field` ตั้ง `id` และ `htmlFor` ให้เอง และถอยไปใช้ `aria-labelledby` เมื่อผู้ใช้ตั้ง `id` เอง |
| Primer | ผูกให้เอง และ **มีคำเตือนตอนพัฒนา** ว่า *"The input field with the id ${id} MUST have a FormControl.Label child."* |
| SLDS | `<label for>` และมีกฎพิเศษว่า **เมื่อเป็นการนำเสนอแบบ static ที่ไม่มี `<input>` ห้ามใช้ `<label>` ให้ใช้ `<span>` แทน** |

**กรณีคำนำหน้าและคำต่อท้ายที่เป็นข้อความ มีกฎเฉพาะ** SLDS เขียนไว้ `[ทางการ]`

> "When using the fixed text variants for prepending or appending symbols to inputs, please be sure to use `aria-labelledby` on the input, that points to the ids of the label, prepended text and appended text as a space separated list. The IDs must appear in that order: 1. label, 2. prepended 3. then appended."
> "By only using the traditional `label[for]` method, the fixed text is never read out in the context of editing the input value."

ส่วน GOV.UK ทำตรงข้าม ตั้ง `aria-hidden="true"` ให้คำนำหน้าและต่อท้าย เพราะมองว่าเป็นของประดับ ทั้งสองวิธีถูกได้ ขึ้นกับว่าข้อความนั้นเป็นข้อมูลจำเป็นหรือไม่

### 11.2 ข้อความผิดพลาดต้องประกาศอย่างไร

**ข้อกำหนดขั้นต่ำมาจาก WCAG 2 ข้อพร้อมกัน** `[ทางการ]`

| เกณฑ์ | ระดับ | ข้อความ |
|---|---|---|
| 1.4.1 Use of Color | A | "Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element." |
| 3.3.1 Error Identification | A | "If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text." |
| 3.3.2 Labels or Instructions | A | "Labels or instructions are provided when content requires user input." |
| 1.3.5 Identify Input Purpose | AA | "The purpose of each input field collecting information about the user can be programmatically determined" |

[w3.org/TR/WCAG22](https://www.w3.org/TR/WCAG22/)

**ตอบคำถามว่าสีแดงอย่างเดียวพอไหม ไม่พอ และไม่พอด้วยเหตุผล 2 ข้อที่แยกจากกัน** ข้อแรกคือ 1.4.1 ที่ห้ามใช้สีเป็นวิธีเดียว ข้อสองคือ 3.3.1 ที่บังคับว่าต้องอธิบายความผิดพลาดเป็นข้อความ **แปลว่าใส่ไอคอนเพิ่มอย่างเดียวยังไม่พอ ต้องมีข้อความด้วย**

ในทางปฏิบัติ ทุกเจ้าจึงใช้สามชั้นพร้อมกัน Carbon เขียนไว้ตรง ๆ ว่า *"Error states have three visual indicators to signify invalid content: a red border, an error icon indicator, and an error message"*

**วิธีประกาศ แตกเป็น 3 แบบ**

| วิธี | ใครใช้ | ข้อสังเกต |
|---|---|---|
| `aria-describedby` บวก `aria-invalid="true"` | SLDS, Carbon, Polaris, Primer, Atlassian, Ant | **รองรับกว้างที่สุด เป็นตัวเลือกที่ปลอดภัย** |
| `role="alert"` บนข้อความผิดพลาด | Carbon (ใช้ทั้ง error และ warning) | ประกาศทันทีแบบขัดจังหวะ |
| `aria-live="polite"` บนกล่องครอบที่ **ต้องอยู่ใน DOM ก่อนข้อความจะขึ้น** | Atlassian, Fluent (ใช้ `role="alert"` กับ error และ warning) | Atlassian เขียนกับดักไว้ว่า *"This must be loaded into the DOM before the ErrorMessage... Otherwise, assistive technologies may not render the message."* |
| `aria-errormessage` | Uber Base Web | **หลีกเลี่ยง** เพราะเทคโนโลยีช่วยเหลือรองรับน้อยกว่า `aria-describedby` มาก |

**ข้อควรระวังที่ควรจำ** Polaris ใช้แค่ `aria-describedby` **ไม่มีพื้นที่ประกาศสดเลย** ข้อความผิดพลาดของ Polaris จึงไม่ถูกอ่านออกมาตอนที่มันปรากฏ ต้องรอผู้ใช้เลื่อนไปที่ช่องนั้น

**กลไกที่ Fluent ทำได้ดีและควรลอก** สีขอบแดงของ Fluent **ผูกกับ attribute `aria-invalid` ที่แสดงผลจริง** ไม่ใช่ผูกกับ prop ในโค้ด ทำให้หน้าตากับ ARIA หลุดจากกันไม่ได้

### 11.3 ความสูงต่ำสุดสำหรับการแตะ

| แหล่ง | ตัวเลข | ระดับ |
|---|---|---|
| WCAG 2.2 SC 2.5.8 Target Size (Minimum) | **24 x 24 CSS px** | AA และเป็นเกณฑ์ใหม่ในรุ่น 2.2 |
| WCAG 2.1 และ 2.2 SC 2.5.5 Target Size (Enhanced) | **44 x 44 CSS px** | AAA |
| Android | **48 x 48 dp** | คำแนะนำ |
| Apple iOS และ iPadOS | **44 x 44 pt เป็นค่าเริ่มต้น และ 28 x 28 pt เป็นค่าต่ำสุด** | คำแนะนำ |

**หมายเหตุสำคัญของ SC 2.5.8** มี note ที่พูดถึงช่องกรอกโดยตรง `[ทางการ]` *"Targets that allow for values to be selected spatially based on position within the target are considered one target... examples include... editable areas where you position the cursor."* แปลว่า **ช่องกรอกนับเป็นเป้าหมายเดียว กล่องทั้งใบต้องผ่าน 24 x 24**

**ข้อที่ต้องแก้ความเข้าใจ** เอกสาร HIG ปัจจุบันของ Apple เขียน 44 x 44 pt เป็น **ค่าเริ่มต้น** ของ iOS ไม่ใช่ค่าต่ำสุด ค่าต่ำสุดคือ 28 x 28 pt คำพูดที่ว่า "Apple กำหนดขั้นต่ำ 44" เป็นถ้อยคำรุ่นเก่า `[ทางการ]` [developer.apple.com HIG accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)

**ใครทำอะไรจริง**

- **Salesforce Lightning ส่งไฟล์สไตล์สำหรับสัมผัสแยกออกมาต่างหาก** ที่ดัน line-height เป็น 42 ทำให้ช่องกรอกสูง **44** ทั้งชุด และเอกสารเขียนเหตุผลว่า *"inputs will have an increased size to accommodate tapping with a finger instead of the more precise mouse cursor"* ที่น่าสนใจคือ **read-only ถูกยกเว้นจากกฎนี้โดยเจตนา** มีคอมเมนต์ในโค้ดว่า `// Heads up: no touch-device() min-height is intended per design`
- **Adobe Spectrum ใช้สเกล 1 ต่อ 1.25 ทั้งระบบ** ทำผ่านตัวแปรเดียว `--s2-scale` ที่เปลี่ยนค่าเมื่อ `@media not ((hover: hover) and (pointer: fine))` ผลคือ 30, 40, 50, 60 **แต่ต้องบันทึกไว้ว่าขนาดกลาง 40 บนสัมผัสยังต่ำกว่าเกณฑ์ 44 ของ AAA**
- **GitHub Primer มี token ชื่อ `control.minTarget.coarse` = 44** และบังคับใช้กับปุ่มในช่องด้วยชั้นซ้อน **โดยที่ขนาดของ component เองไม่เปลี่ยนตามชนิดตัวชี้**

### 11.4 autocomplete

WCAG SC 1.3.5 กำหนดให้ระบุวัตถุประสงค์ของช่องด้วยโปรแกรมได้ รายการค่าที่ใช้ได้อยู่ที่ [w3.org/TR/WCAG22/#input-purposes](https://www.w3.org/TR/WCAG22/#input-purposes)

**Polaris เป็นเจ้าเดียวที่บังคับ** ทำให้ prop `autoComplete` เป็นค่าที่ต้องส่งเสมอ (ไม่มีเครื่องหมายคำถามในชนิดข้อมูล) พร้อมกฎว่า *"Always add an autocomplete attribute and value to inputs if the type is: color, date, datetime-local, email, month, number, password, range, search, tel, text, time, url, or week."* `[ทางการ]`

---

## 12. เทียบของเรากับตลาด

| ประเด็น | ตลาดทำอย่างไร | เราทำอย่างไร | คำตัดสิน |
|---|---|---|---|
| จำนวนขนาด | มัธยฐาน 3 ขนาด ต่ำสุด 1 (M3, SLDS) สูงสุด 4 (Spectrum, Base Web) | **มีขนาดเดียว ไม่มีคุณสมบัติ `size` เลย** | **ตามหลัง** เราอยู่ในกลุ่มต่ำสุดร่วมกับ M3 ที่มีเหตุผลรองรับ (M3 คุมความหนาแน่นด้วยกลไกอื่น) แต่เราไม่มีเหตุผลนั้น |
| ความสูงเทียบปุ่ม | 4 เจ้าผูกด้วย token ตัวเดียวกัน NewsKit เขียนเป็นกฎ และ **ทุกเจ้าที่ไม่ผูกมีค่าคลาดกันจริง 4 ถึง 8** | **42 ซึ่งไม่ตรงกับความสูงปุ่มของเราเองสักขนาด** (24, 32, 40, 48, 56) และไม่ตรงกับค่าที่ใช้กันในตลาดด้วย | **ตามหลัง** และเป็นข้อที่แย่ที่สุดในรายงานนี้ ตัวเลข 42 ไม่ปรากฏในระบบไหนเลยในตลาด |
| ระยะขอบแนวนอน | มัธยฐาน 12 ที่ความสูง 40 ประกาศเป็นค่าเดียวบนกล่องเดียวทุกเจ้า | ประกาศ 10 แต่กรอบซ้อนอีกชั้นทำให้ได้จริง **14** ซึ่งไม่มีใครตั้งใจและไม่ตรงกับที่ประกาศ | **ตามหลัง** |
| สูตรที่ผูกระยะขอบกับความสูง | มีเจ้าเดียวคือ Spectrum (`height x 3/8`) ที่เหลือกำหนดค่าตายต่อขนาด | ไม่มีสูตรใด ๆ ใน `input.mjs` | **เท่ากัน** เพราะตลาดส่วนใหญ่ก็ไม่มี แต่เราไม่มีแม้แต่ค่าตายที่ครบ |
| มุมโค้ง | กระจาย 0 ถึง 8 ส่วนใหญ่คงที่ทุกขนาด | 8 คงที่ | **เท่ากัน** ค่า 8 อยู่ปลายบนของตลาดแต่ไม่ผิด |
| โครงสถานะ | **ไม่มีใครใช้ตัวเปิดปิดหลายตัวที่เปิดพร้อมกันได้** ทุกเจ้าเป็นคุณสมบัติเดียวหรือ prop ที่แทนกัน | ตัวเปิดปิดแยก 3 ตัว (Hover, Focused, Disabled) ที่เปิดพร้อมกันได้ทั้งที่เป็นไปไม่ได้จริง | **ตามหลัง** และเป็นรากของจำนวนแบบที่บวมเป็น 63 |
| read-only | 6 ใน 13 เจ้ามี และ Carbon กับ Spectrum ออกแบบหน้าตาให้จริง | **ไม่มีเลย** | **ตามหลัง** แต่ตามหลังพร้อมกับ Primer ซึ่งก็ไม่มีเหมือนกัน |
| ทรงขีดล่าง | ตลาดแตกเป็นสองฝั่งจริง แต่ **ไม่มีเจ้าไหนดูแลทรงขีดล่างเป็นชุด component แยกที่มีจำนวนแบบเท่าชุดหลัก** ทุกเจ้าทำเป็นคุณสมบัติ `appearance` หรือ `variant` ในชุดเดียว | เป็น **ชุดแยก 63 แบบ เท่ากับชุดหลักเป๊ะ** ซึ่งแปลว่าทุกการแก้ต้องทำสองรอบ | **ตามหลัง** ไม่ใช่เพราะมีทรงขีดล่าง แต่เพราะวิธีจัดโครงทำให้ต้นทุนดูแลเป็นสองเท่า |
| ตำแหน่งป้ายกำกับ | บนช่องเป็นค่าเริ่มต้นของทุกเจ้า ป้ายลอยเหลือ 2 เจ้า | บนช่อง | **เท่ากัน** เลือกถูกแล้ว |
| ผูก typography | ทุกเจ้าผูกกับ preset หรือ token ของระบบ | **ตัวอักษรในช่อง 16px และป้าย 14px ไม่ผูก text style** ผูกแค่ข้อความช่วย | **ตามหลัง** และขัดกับกฎ preset-only ของเราเองใน CLAUDE.md |
| ตัวช่วยรอบช่อง | helper และ error ครบทุกเจ้า ตัวนับตัวอักษร 7 เจ้า เครื่องหมายบังคับกรอก 11 เจ้า คำนำหน้าที่เป็นข้อความ 6 เจ้า | มีป้ายกำกับ ข้อความช่วย และแท็ก **ไม่มีตัวนับตัวอักษร ไม่มีเครื่องหมายบังคับกรอก ไม่มีคำนำหน้าที่เป็นข้อความ** | **ตามหลัง** |
| ไอคอนในช่อง | ขนาดคงที่เป็นส่วนใหญ่ แต่ Fluent และ Spectrum ผันตามขนาด และ **ทุกเจ้าที่มีปุ่มในช่องทำเป็นปุ่มจริงที่มีชื่อของตัวเอง** | ไอคอนยังเป็นชุดสำเร็จรูปเก่า ไม่ใช่ Nation UI Icons และมีขนาดเดียว | **ตามหลัง** |
| ช่องหลายบรรทัด | ระยะขอบแนวนอนเท่ากับช่องบรรทัดเดียวเสมอ ต่างกันมากสุดที่พบคือ 1 px | ใช้ 16 เทียบช่องปกติ 10 **ต่างกัน 6 ซึ่งมากกว่าทุกเจ้าในตลาด** | **ตามหลัง** |
| จำนวนแบบทั้งหมด | Fluent, Primer, Spectrum เปิดแกน variant 2 ถึง 3 แกน ที่เหลือเป็น prop ที่ไม่คูณจำนวน | **144 แบบ จากการคูณของตัวเปิดปิดที่ไม่ควรคูณกัน** | **ตามหลัง** |
| แท็กในช่องกรอก | **แทบไม่มีเจ้าไหนใส่แท็กในช่องกรอกหลัก** ส่วนใหญ่แยกเป็น component ต่างหาก (combobox, token field) | เรามีชนิด Tags พร้อมรองรับ 1 ถึง 5 แท็ก | **นำหน้า** แต่นำหน้าแบบมีต้นทุน เพราะมันทำให้จำนวนแบบบวมและอยู่ผิด component |
| การผูกสีเป็นตัวแปร | ทุกเจ้าคุมสีด้วย token ทั้งหมด | **90 จุดยังเป็นสีดิบ** | **ตามหลัง** และผิดกฎ DoD ของเราเอง |

**สรุปคำตัดสินรวม ตามหลัง 12 ข้อ เท่ากัน 3 ข้อ นำหน้า 1 ข้อ**

ข้อที่ตามหลังส่วนใหญ่ **ไม่ได้ตามหลังเพราะขาดของ แต่ตามหลังเพราะโครงสร้างไม่ถูกตั้งแต่ต้น** คือไม่มีสูตรขนาด ไม่มีคุณสมบัติสถานะเดียว และมีกรอบซ้อนที่ไม่มีใครตั้งใจ ซึ่งเป็นปัญหาที่แก้ครั้งเดียวได้หลายข้อพร้อมกัน

---

## 13. ข้อเสนอสำหรับ NTGDS

### 13.1 ควรมีกี่ขนาด ความสูงเท่าไหร่ และควรใช้สูตรร่วมกับปุ่มหรือไม่

**ข้อเสนอ 3 ขนาด คือ sm 32, md 40, lg 48 โดยค่าเริ่มต้นคือ md**

**และควรใช้สเกลความสูงร่วมกับปุ่ม แต่เปิดหน้าต่างที่ใช้ได้แคบกว่า** คือใช้สูตร `height = 24 + i x 8` ตัวเดียวกับปุ่ม แต่ช่องกรอกเปิดเฉพาะดัชนี sm, md, lg ไม่เปิด xs (24) และ xl (56)

**เหตุผลจากหลักฐาน**

1. **ช่องกรอกต่างจากอวาตาร์ในประเด็นนี้จริง** ตอนตัดสินอวาตาร์ (2026-08-27) เหตุผลคือตลาดไม่ผูก มีเจ้าเดียวที่ผูก แต่ช่องกรอกมี **4 เจ้าที่ผูกด้วย token ตัวเดียวกัน** (Carbon, Spectrum, Ant, Guardian) บวก NewsKit ที่เขียนเป็นกฎว่า *"Text inputs should match the height of the button when used together"* และ Carbon ที่เขียนว่า *"Be sure to use a consistent field height when pairing form components on the same page"*
2. **เจ้าที่ไม่ผูก มีค่าคลาดกันจริงทุกเจ้า** Base Web คลาด 4 ที่ 2 ใน 4 ขนาด, Polaris คลาด 4 ที่ขนาดเริ่มต้น, Atlassian คลาด 8 ทุกขั้น และ Primer เขียน token กลางไว้แล้วแต่ไม่ได้ต่อสาย ซึ่งเป็นภาพในอนาคตของเราถ้าเลือกไม่ผูก
3. **ที่สำคัญที่สุด ช่องกรอกวางในแถวเดียวกับปุ่มจริง** ช่องค้นหาคู่ปุ่มค้นหา แถวกรองในตาราง ฟอร์มที่มีปุ่มบันทึกอยู่ท้ายแถว ซึ่งเป็นสถานการณ์ที่อวาตาร์แทบไม่เจอ
4. **ทำไมไม่เปิด xs 24** เพราะ 24 คือ **เส้นขั้นต่ำพอดีของ WCAG 2.2 SC 2.5.8** ไม่มีที่เหลือให้พลาด และเจ้าที่มี 24 (Carbon, Fluent, Spectrum, Ant) ทุกเจ้าใช้กับหน้าจอเครื่องมือหนาแน่นบนเดสก์ท็อป ไม่ใช่กับผู้ใช้มือถือ 70 เปอร์เซ็นต์อย่างของเรา ถ้าจำเป็นจริงค่อยเปิดทีหลังได้เพราะสูตรรองรับอยู่แล้ว
5. **ทำไมไม่เปิด xl 56** เพราะไม่มีเจ้าไหนใช้ช่องกรอกสูงเกิน 48 บนเดสก์ท็อป (Base Web 60 กับ Spectrum 60 เป็นค่าฝั่งสัมผัส ไม่ใช่ขนาดที่เลือกเอง) และ Carbon ที่ใช้สเกลร่วมกับปุ่มก็ปิดเพดานช่องกรอกไว้ที่ lg 48 พอดี ซึ่งเป็นแบบเดียวกับที่เสนอนี้
6. **ทำไม md 40 ไม่ใช่ 32** เพราะ 40 คือค่าที่ทำให้ผ่านเกณฑ์แตะของทุกแพลตฟอร์มได้ง่ายที่สุดโดยไม่ต้องมีชั้นซ้อน และ 42 ที่เราใช้อยู่ห่างจาก 40 แค่ 2 px ทำให้การย้ายกระทบภาพน้อยที่สุด

**คำแนะนำเพิ่มเรื่องมือถือ** สำหรับฟอร์มที่ออกแบบมาเพื่อมือถือโดยเฉพาะ ให้ใช้ **lg 48** เป็นค่าเริ่มต้นแทน md เพราะ 48 ผ่านทั้ง 48dp ของ Android และ 44pt ของ iOS พร้อมกัน ส่วน 40 ผ่านเกณฑ์ AA ของ WCAG แต่ไม่ผ่าน 44 ของ AAA ซึ่งเป็นข้อจำกัดเดียวกับที่ Spectrum เจอ (ขนาด M บนสัมผัสได้ 40 ยังต่ำกว่า 44)

**การนำไปทำในโค้ด** ให้ย้ายสูตรความสูงขึ้นไปที่ชั้น global เป็น `CONTROL_HEIGHT = { base: 24, step: 8 }` แล้วให้ทั้ง `button.mjs` และ `input.mjs` อ้างค่านั้น แทนที่จะให้แต่ละไฟล์ประกาศ base กับ step ของตัวเอง เหตุผลตรงกับที่ Carbon ทำ **ค่าเท่ากันโดยบังเอิญกับค่าเท่ากันเพราะเป็นตัวแปรเดียวกัน ต่างกันที่ว่าอันแรกจะเลื่อนออกจากกันเมื่อไหร่ก็ได้**

### 13.2 ควรยุบตัวเปิดปิด 3 ตัวเป็นคุณสมบัติเดียวชื่อ state ไหม

**ควรยุบ และควรยุบมากกว่านั้น**

**ข้อเสนอ ให้สถานะเป็นคุณสมบัติเดียวชื่อ `state` มี 7 ค่า**

`default`, `hover`, `focused`, `disabled`, `read-only`, `error`, `error-focused`

**ทำไมต้องมี `error-focused` เป็นค่าที่ 7** เพราะสถานะการตรวจสอบความถูกต้อง **ซ้อนกับสถานะการโต้ตอบได้จริง** และ Material 3 ยืนยันเรื่องนี้ด้วย token ของตัวเอง มี `ErrorHoverOutlineColor` และ `ErrorFocusOutlineColor` แยกออกมา ถ้าไม่เผื่อไว้ นักออกแบบจะไม่มีที่ให้ดูว่าช่องที่ผิดตอนโฟกัสหน้าตาเป็นอย่างไร ซึ่งเป็นภาพที่ผู้ใช้เห็นบ่อยที่สุดตอนแก้ฟอร์ม

**และควรย้ายของอีก 4 กลุ่มออกจากแกน variant ไปเป็นคุณสมบัติแบบเปิดปิดชั้น (ซึ่งไม่คูณจำนวนแบบ)**

- ป้ายกำกับ ข้อความช่วย เปิดปิด
- `Filled` ซึ่งจริง ๆ แล้วคือ "ช่องมีค่าหรือยัง" ควรเป็นคุณสมบัติข้อความ ไม่ใช่ตัวเปิดปิด ไม่มีเจ้าไหนในตลาดทำ Filled เป็น variant
- ช่องเสียบด้านหน้าและด้านหลัง เปิดปิด แทนที่จะเป็นค่าใน `Type` 4 ค่า (Leading Icon, Trailing Icon, Leading Button, Trailing button)
- แท็ก 1 ถึง 5

**และควรแยก Tags กับ Payment ออกไปเป็น component เฉพาะทาง** เพราะตลาดไม่ได้ใส่ไว้ในช่องกรอกหลัก ทั้งสองอย่างมีตรรกะของตัวเอง (แท็กต้องลบได้ทีละอัน ช่องบัตรต้องจัดรูปแบบตัวเลขและตรวจชนิดบัตร)

**และควรยุบทรงขีดล่างเข้ามาเป็นคุณสมบัติ `appearance` แทนที่จะเป็นชุดแยก** (เหตุผลอยู่ที่ §13.4)

**จำนวนแบบที่ได้**

| ทางเลือก | สูตร | จำนวนแบบ |
|---|---|---|
| ปัจจุบัน | 3 ชุดแยก | **144** |
| ยุบสถานะอย่างเดียว ยังคง Type 7 ค่า และยังไม่มีขนาด | 7 x 7 | 49 ต่อทรง รวมสองทรงเป็น 98 |
| **ข้อเสนอเต็ม** | 3 ขนาด x 7 สถานะ x 2 ทรง | **42** บวก `Text area` แยกอีกชุด |

**เสียอะไรไป ตอบตรง ๆ 4 ข้อ**

1. **เสียภาพสำเร็จรูปของ Payment กับ Tags ในชุดเดียวกัน** ต้องไปเปิดอีก component เวลาจะหยิบใช้ แลกกับการที่ชุดหลักดูแลง่ายขึ้น
2. **เสียความสามารถในการเปิดหลายอย่างพร้อมกันเพื่อดูภาพ** เช่น เปิด Hover คู่ Disabled ซึ่งเป็นภาพที่ไม่ควรมีอยู่แล้ว จึงไม่ใช่การเสียจริง
3. **เสียชุด Leading Button และ Trailing button ที่แยกออกมาเป็นค่าของ `Type`** ต้องแทนด้วยช่องเสียบที่สลับ instance เอา ซึ่งยืดหยุ่นกว่าแต่ต้องเขียนเอกสารกำกับว่าใช้อย่างไร
4. **เสียเวลาย้ายครั้งเดียวที่ไม่น้อย** ทุก instance ที่มีอยู่ในไฟล์อื่นจะต้องผูกใหม่ เพราะโครงคุณสมบัติเปลี่ยน ซึ่งเป็นเหตุผลว่าทำไมข้อนี้อยู่ในกลุ่ม "แก้ทีหลังแพง"

### 13.3 ระยะขอบในควรเป็นเท่าไหร่ และควรตัดกรอบซ้อนออกไหม

**ควรตัดกรอบ `Text input` ที่มีระยะขอบ 4 ซ้ายขวาออก ทันที**

เหตุผลคือ **ไม่มีเจ้าไหนในตลาดที่ใช้ชั้นซ้อนแล้วได้ค่าที่ไม่ได้ประกาศไว้** เจ้าที่มีชั้นซ้อนจริง (Fluent, Base Web) ประกาศค่าของทุกชั้นและอธิบายเหตุผลได้ ส่วนของเรา ค่า 14 ที่ได้จริงไม่ตรงกับค่าที่ประกาศ (10) และไม่มีเอกสารไหนบอกว่าทำไม เป็นค่าที่ไม่มีใครตั้งใจ

**ข้อเสนอค่าระยะขอบ**

| ขนาด | ความสูง | ระยะขอบซ้ายขวา | ระยะขอบบนล่าง | ระยะห่างภายใน | มุมโค้ง | ขนาดไอคอน |
|---|---|---|---|---|---|---|
| sm | 32 | **10** | 0 | 6 | 7 | 18 |
| md | 40 | **12** | 0 | 8 | 8 | 20 |
| lg | 48 | **14** | 0 | 10 | 9 | 22 |

**ที่มาของแต่ละค่า**

- **ระยะขอบซ้ายขวา 10, 12, 14 มาจากสูตรเดียวกับปุ่ม** (base 8 step 2 ที่ดัชนี sm, md, lg) ซึ่งบังเอิญตรงกับ **มัธยฐานของตลาดที่ 12 ที่ความสูง 40** พอดี และการใช้สูตรเดียวกับปุ่มทำให้ตัวอักษรในช่องกรอกกับตัวอักษรในปุ่มที่วางข้างกันเริ่มที่ระยะเท่ากัน
- **ระยะขอบบนล่างเป็น 0** ตามแบบเดียวกับปุ่มของเรา และตรงกับ Carbon, SLDS, Guardian, Fluent ที่ให้ความสูงเป็นตัวคุมแทน ค่าที่เหลือจากความสูงลบ line-height คือ 4, 7, 10 ตามลำดับ ซึ่งพอเหมาะทั้งสามขนาด
- **มุมโค้ง 7, 8, 9 มาจากสูตร `RADIUS_FORMULA` base 6 step 1 ตัวเดียวกับปุ่ม** ที่ดัชนี sm, md, lg ซึ่งทำให้ **ค่าที่ md ยังเป็น 8 เท่าเดิม ไม่มีการเปลี่ยนภาพที่ขนาดเริ่มต้น** และตรงกับที่ Ant กับ Spectrum 2 ทำ (มุมโค้งผันตามขนาด)
- **ขนาดไอคอน 18, 20, 22 มาจากสูตรไอคอนของปุ่ม** (base 16 step 2) ที่ดัชนีเดียวกัน ค่า 20 ที่ md ตรงกับ Fluent (20 ที่ช่องสูง 32) และ Polaris (20 คงที่)

> **ข้อควรระวังตามกฎใน CLAUDE.md** ค่าทั้งหมดข้างบนเป็นข้อเสนอจากการวิจัย **ยังไม่ได้อ่านจากไฟล์ออกแบบจริง** ก่อนใส่ลง `tokens/scale/input.mjs` ต้องเปิดไฟล์ Figma วัดของจริงก่อน และต้องตรวจว่า `ระยะขอบ x 2 + ไอคอน + ระยะห่างภายใน + ตัวอักษร` บวกกลับได้เท่าความกว้างจริง

**ผูก text preset ตามขนาด** ใช้ preset ที่มีอยู่แล้ว ไม่ต้องเพิ่มของใหม่

| ขนาด | ตัวอักษรในช่อง | ป้ายกำกับ | ข้อความช่วย |
|---|---|---|---|
| sm | `body/sm` 14 บน 24 | `label/sm` 12 บน 22 | `meta/helper` 12 บน 22 |
| md | `body/md` 16 บน 26 | `label/md` 14 บน 24 | `meta/helper` 12 บน 22 |
| lg | `body/lg` 18 บน 28 | `label/lg` 16 บน 26 | `meta/helper` 12 บน 22 |

ค่าที่ md ตรงกับของเดิมพอดี (16 กับ 14) แปลว่า **การผูก preset ที่ขนาดเริ่มต้นไม่เปลี่ยนภาพเลย แค่ทำให้มันมีต้นทาง**

> **ข้อสังเกตเชิงปฏิบัติที่ยังไม่ได้ยืนยันจากเอกสารทางการในรอบนี้** เบราว์เซอร์บน iOS จะซูมหน้าจอเข้าอัตโนมัติเมื่อโฟกัสช่องกรอกที่ขนาดตัวอักษรต่ำกว่า 16px ถ้าเป็นจริง จะเป็นเหตุผลเพิ่มที่ทำให้ตัวอักษรที่ md ควรเป็น 16 ไม่ใช่ 14 ควรทดสอบบนเครื่องจริงก่อนใช้เป็นข้ออ้าง

### 13.4 แบบขีดล่างควรเก็บไว้หรือเลิก

**ควรเก็บไว้ แต่ต้องเปลี่ยนสถานะจากชุด component แยก ให้เป็นคุณสมบัติ `appearance` ในชุดเดียว และเขียนกติกาการใช้กำกับ**

**ทำไมไม่เลิก**

- ตลาดยังไม่ตัดสิน และ **เดินสวนทางกันชัดเจน** Spectrum 2 ตัดทิ้ง แต่ **Ant Design เพิ่งเพิ่มทรง `underlined` เข้ามาใหม่ในรุ่น 5.24** และ Fluent ยังมีอยู่โดยมองว่าเป็น **ทางแก้** ของปัญหาคอนทราสต์ ไม่ใช่ตัวปัญหา
- **Carbon ทั้งระบบเป็นทรงนี้** (พื้นทึบบวกขีดล่าง ไม่มีมุมโค้ง) และเป็นหนึ่งใน DS ที่แข็งแรงที่สุดในตลาด ถ้าทรงนี้ผิดโดยตัวมันเอง Carbon คงไม่ยืนอยู่ได้
- ข้อโจมตีที่มีหลักฐานจริง (Adam Silver, NN/g) โจมตี **ขอบเขตที่ไม่ชัดและป้ายลอย** ไม่ได้โจมตีทรงขีดล่างที่มีป้ายกำกับอยู่บนช่องแบบของเรา และงานของ NN/g **ไม่ได้ทดสอบช่องกรอกโดยตรง**

**ทำไมต้องเปลี่ยนโครง**

**ไม่มีเจ้าไหนในตลาดที่ดูแลทรงขีดล่างเป็นชุด component แยกที่มีจำนวนแบบเท่าชุดหลัก** ทุกเจ้าทำเป็นคุณสมบัติในชุดเดียว ของเราที่แยกเป็น 63 กับ 63 แปลว่าทุกการแก้ต้องทำสองรอบ และเมื่อวันหนึ่งลืมทำรอบที่สอง สองชุดจะเริ่มเพี้ยนจากกัน

**กติกาการใช้ที่ต้องเขียนกำกับ 3 ข้อ**

1. **เส้นขีดล่างต้องผ่านคอนทราสต์ 3:1 กับพื้นที่อยู่ข้างหลัง** ตามที่ Carbon และ Fluent เขียนเป็นข้อบังคับ และ **สีของตัวอักษรหรือ placeholder ไม่นับเป็นขอบเขต**
2. **ใช้เมื่อพื้นที่แนวตั้งจำกัดจริง หรือเมื่อช่องกรอกอยู่ติดกับของอื่นเป็นแถวเดียว** เช่นในตารางหรือแถบเครื่องมือ ซึ่งเป็นเหตุผลเดียวกับที่ Carbon ให้ไว้สำหรับทรง fluid
3. **ห้ามใช้กับช่องกรอกหลายบรรทัด** ตามที่ Spectrum เตือนไว้ว่าเส้นใต้จะห่างจากข้อความจนดูไม่ออกว่าเป็นชิ้นเดียวกัน และตรงกับที่ **Fluent ไม่ให้ทรง underline กับช่องหลายบรรทัด**

### 13.5 ควรเพิ่มอะไร และควรตัดอะไร

**ควรเพิ่ม 6 อย่าง**

1. **สถานะ read-only** ตามนิยามของ Carbon คือต้องอ่านออก คัดลอกได้ ผ่านคอนทราสต์ และโฟกัสด้วยแป้นพิมพ์ได้ **หน้าตาให้ทำแบบสลับกับ disabled ตามที่ Carbon ทำ** คือ disabled คงพื้นหลังไว้แต่ถอดเส้นขอบ ส่วน read-only คงเส้นขอบไว้แต่ถอดพื้นหลัง เป็นกฎที่จำง่ายและสอนต่อได้
2. **ตัวนับตัวอักษร** เป็นของที่ **7 เจ้ามี** และสำคัญเป็นพิเศษกับงานข่าวที่มีข้อจำกัดความยาวหัวข้อและคำโปรย **ให้ใช้พฤติกรรมแบบ Ant คือเตือนแต่ไม่ตัดข้อความ** เพราะการตัดกลางประโยคทำให้เสียเนื้อหาที่นักข่าวพิมพ์ไปแล้ว และ **ตัวเลขที่เห็นต้องตั้ง `aria-hidden="true"` แล้วประกาศด้วยข้อความแยก** ตามที่ Carbon และ Primer ทำ
3. **เครื่องหมายบังคับกรอก** ให้ใช้กฎของ Carbon และ Spectrum ที่ตรงกัน คือ **ทำเครื่องหมายเฉพาะฝั่งที่น้อยกว่าในฟอร์มนั้น** ถ้าฟอร์มส่วนใหญ่บังคับกรอก ให้ทำเครื่องหมายเฉพาะช่องที่ไม่บังคับ และกลับกัน **และควรใช้คำภาษาไทยแทนดอกจัน** เพราะดอกจันต้องมีคำอธิบายกำกับเสมอถึงจะเข้าใจ ถ้าจะใช้ดอกจันต้องทำแบบ SLDS คือครอบด้วย `<abbr title="required">` ให้โปรแกรมอ่านหน้าจออ่านคำเต็ม และทำเป็นชิ้นแยกที่มีระยะห่างของตัวเองตามที่ Spectrum เตือน ไม่ใช่ตัวอักษรที่ต่อท้ายข้อความป้าย
4. **คำนำหน้าและต่อท้ายที่เป็นข้อความ** เป็นของที่ 6 เจ้ามี และจำเป็นกับงานของเราจริง (หน่วยเงินบาท จำนวนครั้ง เปอร์เซ็นต์ ชื่อโดเมน) **พร้อมกฎ accessibility ของ SLDS** ว่าถ้าข้อความนั้นเป็นข้อมูลจำเป็นต้องผูกด้วย `aria-labelledby` เรียงลำดับ ป้ายกำกับ คำนำหน้า คำต่อท้าย และถ้าเป็นของประดับล้วนให้ตั้ง `aria-hidden="true"` ตามแบบ GOV.UK
5. **สถานะ warning และ success** ตลาดมี warning 3 เจ้า (Carbon, Fluent, Ant) และ success 5 เจ้า (Fluent, Primer, Spectrum, Base Web, Guardian) **แต่ควรทำทีหลัง** ไม่ใช่รอบแรก เพราะมันเพิ่มจำนวนแบบและยังไม่มีความต้องการที่ชัด ให้แค่ **เผื่อที่ในโครงคุณสมบัติ `state` ไว้ก่อน** ซึ่งเป็นเรื่องที่ทำได้ฟรีถ้ายุบเป็นคุณสมบัติเดียวตั้งแต่แรก
6. **แก้คำสะกด `Lebel` เป็น `Label`** และตั้งชื่อชั้นตามกติกาตัวเล็กบวกขีดกลางใน CLAUDE.md

**ควรตัด 4 อย่าง**

1. **กรอบซ้อน `Text input`** ที่ทำให้ระยะขอบซ้ายกลายเป็น 14
2. **ตัวเปิดปิด `Filled`** เปลี่ยนเป็นคุณสมบัติข้อความ ไม่มีเจ้าไหนทำ Filled เป็น variant
3. **ชนิด Tags และ Payment ออกจากชุดหลัก** ย้ายไปเป็น component เฉพาะทาง
4. **ชุด `Text field / Under line` ที่เป็น component แยก** ยุบเข้ามาเป็นคุณสมบัติ `appearance`

**ค่าที่ควรตั้งให้ช่องหลายบรรทัด**

| ค่า | ข้อเสนอ | เหตุผล |
|---|---|---|
| ระยะขอบซ้ายขวา | **เท่ากับช่องบรรทัดเดียวทุกขนาด** คือ 10, 12, 14 | ตลาดทำแบบนี้ทุกเจ้า ต่างกันมากสุดที่พบคือ 1 px ของเราต่างกัน 6 |
| ระยะขอบบนล่าง | **8 ที่ md** (สูตรตามขนาดค่อยตัดสินตอนวัดของจริง) | ช่องหลายบรรทัดไม่มีความสูงคงที่มาคุม จึงต้องมีระยะขอบแนวตั้งจริง ค่าที่ตลาดใช้คือ Carbon 11, SLDS 8, Guardian 8, Fluent 4 ถึง 8 |
| ความสูงต่ำสุด | **3 บรรทัด** ที่ md ได้ 8 + 26 x 3 + 8 + เส้นขอบ 2 = 96 | Base Web ใช้ 3 บรรทัด Carbon ใช้ 4 Atlassian ใช้ 2 ค่ากลางคือ 3 และควรคิดเป็นจำนวนบรรทัด ไม่ใช่ตัวเลขลอย |
| การลากยืด | **เปิดแนวตั้ง และปิดบนอุปกรณ์สัมผัส** | ตามที่ Ant ทำด้วย `@media (hover: none) and (pointer: coarse)` ตรงกับผู้ใช้มือถือ 70 เปอร์เซ็นต์ของเรา |
| ทรงขีดล่าง | **ไม่รองรับ** | ตาม Fluent ที่ไม่ให้ underline กับช่องหลายบรรทัด และคำเตือนของ Spectrum |

### 13.6 ลำดับความสำคัญ แยกตามต้นทุนการแก้ทีหลัง

**กลุ่ม ก แก้ทีหลังแพง เพราะกระทบชื่อ token หรือโครง variant ต้องตัดสินให้จบก่อนลงมือวาด**

| ลำดับ | สิ่งที่ต้องทำ | ทำไมแพงถ้าเลื่อน |
|---|---|---|
| 1 | **ตัดสินชุดขนาด 3 ขนาด และย้ายสูตรความสูงขึ้นเป็นสเกลกลางร่วมกับปุ่ม** | ชื่อ token ทุกตัวของช่องกรอกจะมีชั้น `<ขนาด>` ต่อท้าย (`space/input/padding/l/md`) ถ้าตอนแรกไม่มีขนาด แล้วมาเพิ่มทีหลัง ต้องเปลี่ยนชื่อ token ทั้งชุดและ instance ทุกตัวที่ผูกไว้ |
| 2 | **ยุบสถานะเป็นคุณสมบัติเดียว 7 ค่า และเผื่อ read-only กับ error-focused ไว้ตั้งแต่ต้น** | เปลี่ยนโครงคุณสมบัติทำให้ instance ทุกตัวในทุกไฟล์หลุดการผูก และ **read-only ที่ไม่ได้ออกแบบตั้งแต่ต้นคือสาเหตุที่ Primer ไม่มีจนถึงทุกวันนี้** |
| 3 | **ยุบทรงขีดล่างเป็นคุณสมบัติ `appearance` แทนชุดแยก** | ยิ่งปล่อยไว้นาน สองชุดยิ่งเพี้ยนจากกัน และการรวมทีหลังต้องมานั่งเทียบทีละแบบว่าอันไหนถูก |
| 4 | **นิยามสูตรจริงใน `tokens/scale/input.mjs` และลงทะเบียนใน `index.mjs`** | เป็นกฎบังคับใน CLAUDE.md อยู่แล้วว่าสร้าง component ที่มีหลายขนาดต้องทำสูตรไปพร้อมกัน และค่าที่พิมพ์ตายลง `component.json` จะกลายเป็นค่าที่ไม่มีต้นทาง เหมือนที่เกิดกับมุมโค้ง 8 ที่เคยผูกกับ `Shape/Txf/lg` ที่ถูกลบไปแล้ว |
| 5 | **ตัดสินว่าจะแยก Tags และ Payment ออกไปหรือไม่** | ถ้าตัดสินทีหลัง ต้องรื้อโครงคุณสมบัติซ้ำอีกรอบ |

**กลุ่ม ข แก้ทีหลังได้ ทำหลังโครงนิ่งแล้ว**

| ลำดับ | สิ่งที่ต้องทำ | หมายเหตุ |
|---|---|---|
| 6 | **ผูก text preset ให้ตัวอักษรในช่องและป้ายกำกับ** | ค่าที่ md ตรงกับของเดิมพอดี ทำแล้วภาพไม่เปลี่ยน แต่แก้การละเมิดกฎ preset-only |
| 7 | **ตัดกรอบซ้อน `Text input` ออก และตั้งระยะขอบเป็นค่าเดียว** | เป็นการแก้ภายในกล่อง ไม่กระทบชื่อ token |
| 8 | **ล้างสีดิบ 90 จุดให้เหลือ 0** | ตาม DoD ข้อ 2 ทำตอนหยิบหน้านี้มาทำ |
| 9 | **แก้ระยะขอบของช่องหลายบรรทัดให้เท่าช่องบรรทัดเดียวในแนวนอน และแก้คำสะกด `Lebel`** | |
| 10 | **เปลี่ยนไอคอนเป็น Nation UI Icons และตั้งขนาดตามขนาดช่อง** | สลับ instance ได้ทีหลัง |
| 11 | **เพิ่มตัวนับตัวอักษร เครื่องหมายบังคับกรอก และคำนำหน้าที่เป็นข้อความ** | เป็นการเพิ่มชั้นในกล่อง ถ้าโครงคุณสมบัติถูกตั้งแต่ต้นจะเพิ่มได้โดยไม่กระทบของเดิม |
| 12 | **กำหนด effect ให้ช่องกรอกตามกฎ effect ใน CLAUDE.md** | ต้องดูก่อนว่ามี style ที่เหมาะอยู่แล้วไหม โดยเฉพาะวงแหวนโฟกัส และต้องระวังว่า **ช่องกรอกทรงขีดล่างไม่มีพื้นทึบ จึงต้องใช้กลไกเส้นขอบ 4px แบบ outside ไม่ใช่เงา** ตามที่บันทึกไว้ในหน่วยความจำเรื่องวงแหวนโฟกัส 2 วิธี |
| 13 | **เพิ่มสถานะ warning และ success** | ทำเมื่อมีความต้องการจริง |

---

## 14. แหล่งอ้างอิงหลัก

**ไฟล์ต้นทางที่อ่านค่าตัวเลข**

- IBM Carbon [`_layout.scss`](https://raw.githubusercontent.com/carbon-design-system/carbon/main/packages/styles/scss/utilities/_layout.scss) [`_text-input.scss`](https://raw.githubusercontent.com/carbon-design-system/carbon/main/packages/styles/scss/components/text-input/_text-input.scss) [`_text-area.scss`](https://raw.githubusercontent.com/carbon-design-system/carbon/main/packages/styles/scss/components/text-area/_text-area.scss) [`_button.scss`](https://raw.githubusercontent.com/carbon-design-system/carbon/main/packages/styles/scss/components/button/_button.scss) [`TextArea.tsx`](https://raw.githubusercontent.com/carbon-design-system/carbon/main/packages/react/src/components/TextArea/TextArea.tsx)
- Material 3 [`TextFieldDefaults.kt`](https://github.com/androidx/androidx/blob/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/TextFieldDefaults.kt) [`TextFieldImpl.kt`](https://github.com/androidx/androidx/blob/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/internal/TextFieldImpl.kt) [`OutlinedTextFieldTokens.kt`](https://github.com/androidx/androidx/blob/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/OutlinedTextFieldTokens.kt) [`_md-comp-filled-field.scss`](https://github.com/material-components/material-web/blob/main/tokens/_md-comp-filled-field.scss) [material-web text-field.md](https://github.com/material-components/material-web/blob/main/docs/components/text-field.md) [material-components-android TextField.md](https://github.com/material-components/material-components-android/blob/master/docs/components/TextField.md)
- MUI [`OutlinedInput.js`](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/OutlinedInput/OutlinedInput.js) [`FilledInput.js`](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/FilledInput/FilledInput.js) [`InputBase.js`](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/InputBase/InputBase.js) [text-fields.md](https://github.com/mui/material-ui/blob/master/docs/data/material/components/text-fields/text-fields.md)
- Shopify Polaris [`TextField.module.css`](https://raw.githubusercontent.com/Shopify/polaris/main/polaris-react/src/components/TextField/TextField.module.css) [`TextField.tsx`](https://raw.githubusercontent.com/Shopify/polaris/main/polaris-react/src/components/TextField/TextField.tsx) [`Button.module.css`](https://raw.githubusercontent.com/Shopify/polaris/main/polaris-react/src/components/Button/Button.module.css)
- Atlassian [`text-field.compiled.css`](https://unpkg.com/@atlaskit/textfield@10.2.0/dist/es2019/text-field.compiled.css) [`text-area.compiled.css`](https://unpkg.com/@atlaskit/textarea@10.2.0/dist/es2019/text-area.compiled.css) [`types.d.ts`](https://unpkg.com/@atlaskit/textfield@10.2.0/dist/types/types.d.ts) [`field.js`](https://unpkg.com/@atlaskit/form@17.2.0/dist/es2019/field.js)
- Fluent 2 [`useInputStyles.styles.ts`](https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-input/library/src/components/Input/useInputStyles.styles.ts) [`useTextareaStyles.styles.ts`](https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-textarea/library/src/components/Textarea/useTextareaStyles.styles.ts) [`InputAccessibilitySpec.mdx`](https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-input/stories/src/Input/InputAccessibilitySpec.mdx) [fluent2.microsoft.design input usage](https://fluent2.microsoft.design/components/web/react/core/input/usage)
- GitHub Primer [`size.json5`](https://raw.githubusercontent.com/primer/primitives/main/src/tokens/functional/size/size.json5) [`radius.json5`](https://raw.githubusercontent.com/primer/primitives/main/src/tokens/functional/size/radius.json5) [`TextInputWrapper.module.css`](https://raw.githubusercontent.com/primer/react/main/packages/react/src/internal/components/TextInputWrapper.module.css) [`ButtonBase.module.css`](https://raw.githubusercontent.com/primer/react/main/packages/react/src/Button/ButtonBase.module.css) [primer.style placeholders](https://primer.style/accessibility/patterns/placeholders/)
- Adobe Spectrum [`layout.json`](https://raw.githubusercontent.com/adobe/spectrum-design-data/main/packages/tokens/src/layout.json) [`text-field.json`](https://raw.githubusercontent.com/adobe/spectrum-design-data/main/packages/tokens/src/text-field.json) [`text-area.json`](https://raw.githubusercontent.com/adobe/spectrum-design-data/main/packages/tokens/src/text-area.json) [`style-utils.ts`](https://raw.githubusercontent.com/adobe/react-spectrum/main/packages/@react-spectrum/s2/src/style-utils.ts) [api-diff.md](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/s2/api-diff.md) [spectrum.adobe.com text-field](https://spectrum.adobe.com/page/text-field/) [platform-scale](https://spectrum.adobe.com/page/platform-scale/)
- Ant Design [`seed.ts`](https://github.com/ant-design/ant-design/blob/master/components/theme/themes/seed.ts) [`input/style/token.ts`](https://github.com/ant-design/ant-design/blob/master/components/input/style/token.ts) [`input/style/index.ts`](https://github.com/ant-design/ant-design/blob/master/components/input/style/index.ts) [`input/style/textarea.ts`](https://github.com/ant-design/ant-design/blob/master/components/input/style/textarea.ts) [`input/index.en-US.md`](https://github.com/ant-design/ant-design/blob/master/components/input/index.en-US.md)
- Salesforce Lightning [compiled CSS v2.264.0](https://cdn.jsdelivr.net/npm/@salesforce-ux/design-system@2.264.0/assets/styles/salesforce-lightning-design-system.css) [touch CSS](https://cdn.jsdelivr.net/npm/@salesforce-ux/design-system@2.264.0/assets/styles/salesforce-lightning-design-system_touch.css) [`input/base/_index.scss`](https://raw.githubusercontent.com/salesforce-ux/design-system/master/ui/components/input/base/_index.scss) [`input/docs.mdx`](https://raw.githubusercontent.com/salesforce-ux/design-system/master/ui/components/input/docs.mdx)
- Uber Base Web [`input/constants.ts`](https://raw.githubusercontent.com/uber/baseweb/main/src/input/constants.ts) [`input/styled-components.ts`](https://raw.githubusercontent.com/uber/baseweb/main/src/input/styled-components.ts) [`themes/shared/sizing.ts`](https://raw.githubusercontent.com/uber/baseweb/main/src/themes/shared/sizing.ts) [`button/styled-components.ts`](https://raw.githubusercontent.com/uber/baseweb/main/src/button/styled-components.ts) [`textarea/textarea.tsx`](https://raw.githubusercontent.com/uber/baseweb/main/src/textarea/textarea.tsx)
- Guardian Source [`size.ts`](https://raw.githubusercontent.com/guardian/csnx/main/libs/%40guardian/source/src/foundations/__generated__/size.ts) [`text-input/styles.ts`](https://raw.githubusercontent.com/guardian/csnx/main/libs/%40guardian/source/src/react-components/text-input/styles.ts) [`text-area/styles.ts`](https://raw.githubusercontent.com/guardian/csnx/main/libs/%40guardian/source/src/react-components/text-area/styles.ts) [`TextInput.tsx`](https://raw.githubusercontent.com/guardian/csnx/main/libs/%40guardian/source/src/react-components/text-input/TextInput.tsx)
- News UK NewsKit [newskit.co.uk text-field](https://newskit.co.uk/components/text-field/) [`sizing.ts`](https://raw.githubusercontent.com/newscorp-ghfb/newskit/main/src/theme/foundations/sizing.ts)

**เอกสารมาตรฐานและงานวิจัย**

- W3C [WCAG 2.2](https://www.w3.org/TR/WCAG22/) [Input Purposes](https://www.w3.org/TR/WCAG22/#input-purposes) [WAI Forms Tutorial labels](https://www.w3.org/WAI/tutorials/forms/labels/) [instructions](https://www.w3.org/WAI/tutorials/forms/instructions/) [notifications](https://www.w3.org/WAI/tutorials/forms/notifications/) [Understanding 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- Apple [HIG Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)
- Android [Make apps more accessible](https://developer.android.com/guide/topics/ui/accessibility/apps) และ [Material 1 accessibility](https://m1.material.io/usability/accessibility.html)
- GOV.UK Design System [Text input](https://design-system.service.gov.uk/components/text-input/)
- Nielsen Norman Group [Placeholders in Form Fields Are Harmful](https://www.nngroup.com/articles/form-design-placeholders/) [Flat UI Elements Attract Less Attention and Cause Uncertainty](https://www.nngroup.com/articles/flat-ui-less-attention-cause-uncertainty/)
- Adam Silver [The problem with float labels and what to do instead](https://adamsilver.io/blog/the-problem-with-float-labels-and-what-to-do-instead/) [Material Design text fields are badly designed](https://adamsilver.io/blog/material-design-text-fields-are-badly-designed/)

**สิ่งที่ยืนยันไม่ได้ในรอบนี้ ห้ามนำไปอ้าง**

1. หน้า `m3.material.io/components/text-fields` ทั้งส่วน specs และ guidelines ดึงเนื้อหาไม่ได้ ค่าตัวเลขของ Material 3 ในเอกสารนี้จึงมาจากไฟล์ token ของ Compose และ Material Web แทน และ **คำแนะนำของ Material เองว่าควรเลือก filled หรือ outlined ยืนยันไม่ได้**
2. บทความ "The Evolution of Material Design's Text Fields" บน Medium ตอบกลับเป็น 403 ทั้งจาก curl และ WebFetch **ตัวเลขผู้เข้าร่วมและข้อสรุปของงานวิจัยชิ้นนั้นยืนยันไม่ได้**
3. **ไม่พบประกาศจาก Google ว่าเลิกหรือไม่แนะนำทรง filled** และ Material 3 ยังส่งทั้งสองทรงอยู่
4. หน้าเอกสารเชิงบรรยายของ Atlassian ดึงไม่ได้ ค่าของ Atlassian มาจากแพ็กเกจที่เผยแพร่แล้วและ JSDoc ซึ่งเป็นต้นทางเดียวกับที่หน้าเว็บนั้นแสดง
5. **ไม่พบตัวเลขพื้นที่แตะต่ำสุดในเอกสารของ Carbon, Polaris, Atlassian, Fluent, MUI และ Ant** ห้ามอ้างตัวเลข 44 หรือ 48 ให้กับเจ้าเหล่านี้
6. Fluent 2 ไม่ประกาศความสูงเป็น px บนหน้าเอกสารทางการ ตัวเลข 24, 32, 40 มาจากไฟล์ต้นทาง
7. Polaris ไม่ประกาศตารางความสูง ตัวเลข 32, 28, 36 คำนวณจาก `min-height` บวก padding บวก line-height
8. ค่ามุมโค้งของ Spectrum ขัดกันเองระหว่าง spectrum-css (4 คงที่) กับ React Spectrum 2 (7 ถึง 10) ทั้งสองค่าอยู่ในไฟล์ token
9. พฤติกรรมการซูมอัตโนมัติของเบราว์เซอร์บน iOS เมื่อขนาดตัวอักษรต่ำกว่า 16px ยังไม่ได้ยืนยันจากเอกสารทางการในรอบนี้

---

## 15. คำถามที่ต้องตัดสินก่อนลงมือ

1. **รับข้อเสนอ 3 ขนาด 32, 40, 48 และใช้สเกลความสูงร่วมกับปุ่มหรือไม่** ถ้ารับ ต้องย้ายสูตรความสูงขึ้นเป็น `CONTROL_HEIGHT` ที่ชั้น global ซึ่งกระทบไฟล์ `button.mjs` ด้วย
2. **รับโครงสถานะเดียว 7 ค่า (รวม read-only และ error-focused) หรือไม่** ถ้ารับ instance ทุกตัวที่มีอยู่จะต้องผูกใหม่
3. **รับการยุบทรงขีดล่างเข้ามาเป็นคุณสมบัติ `appearance` หรือไม่** หรือจะเลิกทรงขีดล่างไปเลย
4. **จะแยก Tags และ Payment ออกเป็น component เฉพาะทางหรือไม่**
5. **จะใช้คำภาษาไทยหรือดอกจันสำหรับเครื่องหมายบังคับกรอก** และจะทำเครื่องหมายฝั่งบังคับหรือฝั่งไม่บังคับ
