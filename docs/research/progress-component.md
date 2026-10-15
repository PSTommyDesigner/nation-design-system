---
title: "Progress component research"
description: "เทียบ component แถบความคืบหน้าของ DS เจ้าใหญ่ 15 เจ้า บวกมาตรฐาน W3C จากไฟล์ต้นทางจริง พร้อมข้อเสนอโครงหน้า 23 Progress Bars ของ NTGDS เน้นเส้นแบ่งกับตัวหมุนและโครงร่างรอโหลด แกนขนาด การจัดการค่าเปอร์เซ็นต์ในไฟล์ออกแบบ ป้ายและการปัดเศษ สถานะและคอนทราสต์ การเข้าถึงตามข้อ 4.1.3 กับ 2.2.2 และบริบทเว็บข่าว"
research_date: "2026-10-08"
scope: "Material 3 (Material Web token และ component, Compose Material3 ProgressIndicator และ WavyProgressIndicator), IBM Carbon (ProgressBar, Loading), Shopify Polaris (ProgressBar, Spinner, SkeletonPage), Adobe Spectrum (spectrum-tokens, Spectrum CSS ProgressBar และ ProgressCircle, React Spectrum, React Aria useProgressBar และ useMeter), Atlassian (@atlaskit/progress-bar), Ant Design (Progress line circle dashboard steps), GitHub Primer (ProgressBar), Microsoft Fluent 2 (react-progress และ Wait UX), Salesforce Lightning (progress-bar, progress-ring), Uber Base Web (ProgressBar, ProgressBarRounded), Pinterest Gestalt (Spinner), Untitled UI (Figma kit และ React), Radix, Mantine (Progress, RingProgress, SemiCircleProgress), Chakra UI v3 กับ Zag บวก WAI-ARIA 1.2, WCAG 2.2, Figma plugin typings และการสำรวจ HTML ของเว็บในเครือ 6 เว็บกับเว็บข่าวต่างประเทศ 5 เว็บ"
status: "draft รอตัดสิน"
owner: "ux-researcher"
---

# Research Progress Bar ของ Design System เจ้าใหญ่

**วันที่วิจัย:** 2026-10-08
**โจทย์:** หาข้อมูลเพื่อตัดสินโครงหน้า 23 Progress Bars ครอบคลุม 8 กลุ่มคำถาม คือ ชนิดและเส้นแบ่ง, ทรง, ขนาดและค่าเปอร์เซ็นต์, ป้ายและตัวเลข, สีและสถานะ, การเข้าถึง, การเคลื่อนไหว และบริบทข่าว

**ป้ายแหล่ง:** `[ทางการ]` ไฟล์ต้นทางหรือเอกสารขององค์กรเอง `[มาตรฐาน]` W3C `[แหล่งรอง]` คนนอกสรุปหรือวิจัย `[คำนวณ]` ผู้วิจัยคำนวณจากค่าในไฟล์ต้นทาง `[ตีความ]` ความเห็นของผู้วิจัย ไม่ใช่ข้อเท็จจริง `[ของเรา]` ค่าที่อ่านจากไฟล์ในโปรเจกต์นี้ `[สำรวจ]` ผู้วิจัยดึงหน้าเว็บมาตรวจเอง

**วิธีเก็บข้อมูล:** ดาวน์โหลดแพ็กเกจ npm ด้วย `npm pack` แล้วอ่านไฟล์ต้นทางจริง ไม่ได้อ่านหน้าสรุปของคนอื่น เวอร์ชันที่ใช้ระบุไว้ในหัวข้อ 15 ทุกตัว ลิงก์อ้างอิงทั้ง 105 รายการตรวจแล้วคืน HTTP 200 ทุกอันวันที่ 2026-10-08

---

## 1. สรุปคำตอบ 8 กลุ่ม (อ่านหน้าเดียวจบ)

| กลุ่ม | คำตอบสั้นจากข้อมูลจริง |
|---|---|
| **ก. ชนิดและเส้นแบ่ง** | **แบบไม่รู้ค่าไม่เคยเป็น component แยก 8 ใน 8 เจ้าที่ทำทั้งคู่ รวมไว้ในชิ้นเดียวกันหมด** กลไกแบ่งเป็น 2 ค่าย คือ ค่ายที่ใช้สวิตช์ชื่อ `indeterminate` หรือ `isIndeterminate` หรือ `infinite` (Material, Spectrum, Atlassian, Base Web) และค่ายที่ถือว่า "ไม่ส่งค่ามา เท่ากับไม่รู้ค่า" (Carbon, Fluent, Radix, Chakra กับ Zag) **มี 6 เจ้าที่ไม่มีแบบไม่รู้ค่าเลย** (Polaris, Ant, Primer, SLDS, Untitled UI, Mantine) เพราะผลักไปให้ตัวหมุนทำแทน **เกณฑ์เวลาหาเจอ 3 เจ้า** Fluent บอกชัดที่สุดว่าต่ำกว่า 1 วินาทีไม่ต้องแสดงอะไร 1 ถึง 3 วินาทีใช้ตัวหมุน เกิน 3 วินาทีใช้แถบ ส่วน Carbon บอกว่าเกิน 3 วินาทีจึงใช้ตัวหมุน และต่ำกว่า 5 วินาทีไม่ต้องใช้แถบ และ Nielsen บอกว่าเกิน 10 วินาทีต้องมีตัวบอกเปอร์เซ็นต์ **ชนิดพิเศษที่พบคือ บัฟเฟอร์ (Material) แบ่งเป็นช่วง (Ant, Base Web) ซ้อนหลายค่า (Primer, Mantine, Ant) จุดหยุดปลายราง (Material) และแบบคลื่น (Material 3 Expressive)** |
| **ข. ทรง** | **แถบแนวนอนมีทุกเจ้า 14 ใน 15** (Gestalt ไม่มี progress bar เลย มีแต่ตัวหมุน) **ทรงวงกลมมี 7 เจ้า** (Material, Spectrum, Ant, SLDS, Mantine, Chakra, Untitled UI) **ทรงครึ่งวงกลมมีแค่ 3 เจ้า** คือ Ant (เรียกว่า `dashboard`) Mantine (เรียกว่า `SemiCircleProgress`) และ Untitled UI (เรียกว่า half circle gauge) **และทั้ง 3 เจ้าใช้มันเป็นหน้าปัดวัดค่าในแดชบอร์ด ไม่ใช่ตัวบอกความคืบหน้าของงาน** นอกจากนี้มีทรงแปลกอีก 3 แบบ คือ แถบแนวตั้ง (SLDS, Zag) แคปซูลมีตัวเลขอยู่ข้างใน (Base Web) และแบบคลื่น (Material) **เกณฑ์เลือกวงกลมที่เขียนไว้ชัดที่สุดคือของ Untitled UI ว่า "คนตัดสินความยาวได้แม่นกว่าตัดสินมุม ค่าที่ต้องเอามาเทียบกันเป็นรายการจึงควรเป็นแถบ"** |
| **ค. ขนาดและค่าเปอร์เซ็นต์** | **ไม่มีเจ้าไหนใช้ขั้น `2xl` เลยสักเจ้า 0 ใน 15** ขั้นสูงสุดที่ตลาดใช้คือ `xl` ซึ่งมี 2 เจ้า (Mantine, Chakra) **จำนวนขั้นของแถบแนวนอน มัธยฐาน 3** ช่วง 0 ถึง 5 และ **4 เจ้าไม่มีแกนขนาดเลย** (Material, Atlassian, Radix, Untitled UI) **ความหนาแถบ มัธยฐานของค่าเริ่มต้น 8** ช่วง 2 ถึง 16 ของเราอยู่ที่ 6 **ความหนาวงแหวนมีสูตร และสูตรที่ 3 เจ้าใช้ตรงกันคือ 10 เปอร์เซ็นต์ของเส้นผ่านศูนย์กลาง** (Material, Mantine, Untitled UI) ส่วน Ant ใช้ 6 เปอร์เซ็นต์ **เรื่องค่าเปอร์เซ็นต์ในไฟล์ออกแบบ มีเจ้าเดียวในตลาดที่ทำเป็นแกนของชุด คือ Untitled UI ซึ่งเป็นต้นทางของไฟล์เรา และเจ้าของบอกเองว่าทำไว้เพื่อเอาไปต่อกันใน prototype** และ **Untitled UI เองไม่ได้ทำแกนเปอร์เซ็นต์ให้ทรงวงกลม** เพราะ **Figma ผูกตัวแปรกับส่วนโค้ง (`arcData`) ไม่ได้** ยืนยันจากรายการ `VariableBindableNodeField` ในไฟล์ typings ของ Figma เอง **ความกว้างแถบ 11 ใน 13 เจ้าให้ยืดเต็มกรอบแม่** มีแค่ Spectrum กับ Material ที่ตั้งค่าเริ่มต้นเป็นตัวเลขตายตัว |
| **ง. ป้ายและตัวเลข** | **จำนวนตำแหน่งป้ายที่ตลาดให้เลือก มัธยฐาน 1** มีแค่ 3 เจ้าที่ให้เลือกมากกว่า 2 ตำแหน่ง คือ Untitled UI (5 ค่า) Ant (6 คอมโบ จาก `inner`/`outer` คูณ `start`/`center`/`end`) และ Carbon (3 แบบจัดวาง) **ป้ายลอยที่เลื่อนตามหัวแถบมีเจ้าเดียวในตลาด คือ Untitled UI** และปัญหาของมันพิสูจน์ได้จากไฟล์เราเอง คือ **ที่ 0 เปอร์เซ็นต์ป้ายล้นออกนอกกรอบซ้าย 16 และที่ 100 เปอร์เซ็นต์ล้นออกขวา 20** **การปัดเศษ ตลาดปัดเป็นจำนวนเต็มทั้งหมด** โดย 2 ตระกูลใหญ่ใช้ `Intl.NumberFormat` (Spectrum กับ React Aria และ Zag กับ Chakra) ซึ่งเปลี่ยนหน่วยได้ **หน่วยอื่นนอกจากเปอร์เซ็นต์ตลาดรองรับ** และ Fluent ห้ามใช้หน่วยเวลาตรง ๆ ว่า "แทบไม่เคยแม่นพอจะเชื่อถือได้" |
| **จ. สีและสถานะ** | **แกนสถานะมี 7 ใน 15 เจ้า** และทุกเจ้าที่มีจะมี "สำเร็จ" กับ "ผิดพลาด" เสมอ **ไม่มีเจ้าไหนมีสถานะ หยุดชั่วคราว เลยสักเจ้า 0 ใน 15** สีรางที่ตลาดใช้เป็นสีเทาอ่อนในชั้น semantic (Material ใช้ `secondary-container` Carbon ใช้ `border-subtle` Fluent ใช้ `colorNeutralBackground6` Ant ใช้ `colorFillSecondary`) **ข้อ 1.4.11 ไม่ได้เอ่ยถึงแถบความคืบหน้าเลยแม้แต่ครั้งเดียว** แต่ที่ใช้ได้คือข้อย่อย Graphical Objects ว่า "ส่วนของภาพที่จำเป็นต่อการเข้าใจเนื้อหา" ต้อง 3:1 **ของเราคำนวณแล้วแถบเทียบราง ได้ 3.82 ผ่าน และวงกลม 4.76 ผ่าน** แต่ **รางของแถบกับรางของวงกลมใช้คนละสี** (`#D0D5DD` กับ `#EAECF0`) ซึ่งเป็นความไม่สม่ำเสมอในหน้าเดียวกัน |
| **ฉ. การเข้าถึง** | **`role="progressbar"` ใช้ตรงกันทั้ง 15 เจ้า** และ **มาตรฐานเขียนไว้ชัดว่า ถ้าไม่รู้ค่าให้ตัด `aria-valuenow` ทิ้ง** ไม่ใช่ใส่ 0 ซึ่ง **Atlassian ทำผิดข้อนี้** เพราะใส่ 0 ตอนไม่รู้ค่า **ชื่อเป็นของบังคับ** มาตรฐานระบุ `Accessible Name Required: True` และ `Name From: author` **จุดที่คนพลาดมากที่สุดคือ `Children Presentational: True`** แปลว่า **ตัวเลขเปอร์เซ็นต์ที่วางไว้ข้างในกล่อง `progressbar` โปรแกรมอ่านหน้าจอจะไม่อ่าน** ต้องวางไว้ข้างนอกหรือใส่ `aria-valuetext` **การประกาศความคืบหน้า มีเทคนิคทางการชื่อ ARIA25 ให้ใช้ live region** และ **มี 3 เจ้าที่ทำจริง** คือ Carbon, Base Web และ Zag **โหมดลดการเคลื่อนไหว มีแค่ 2 เจ้าที่จัดการให้แถบโดยเฉพาะ** คือ Fluent (เปลี่ยนจากเลื่อนเป็นจางเข้าจางออก) และ Primer (ครอบด้วย `no-preference`) **ส่วนข้อ 2.2.2 มีข้อยกเว้นเขียนไว้ตรง ๆ ใน Note 4** ว่าการเคลื่อนไหวช่วงรอโหลดถือว่าจำเป็นได้ |
| **ช. การเคลื่อนไหว** | **แบบไม่รู้ค่า ช่วง 1000 ถึง 3000 มัธยฐานราว 2000** เจ้าที่เร็วสุดคือ Chakra (1000) และ Primer (1000) ช้าสุดคือ Fluent (3000) **แบบรู้ค่าตอนค่าขยับ ช่วง 0 ถึง 500 มัธยฐาน 250** เร็วสุดคือ Untitled UI (75 เส้นตรง) และ Mantine ตั้งค่าเริ่มต้นเป็น 0 คือไม่มีการเปลี่ยนผ่านเลย ส่วน Carbon ใช้ 110 บนเส้นโค้ง `cubic-bezier(0.5, 0, 0.1, 1)` **ทรงวงกลมแบบไม่รู้ค่าใช้เวลานานกว่าแถบเสมอ** Material ใช้ 6000 ใน Compose และ 5332 บนเว็บ |
| **ซ. บริบทข่าว** | **สำรวจหน้าแรกและหน้าบทความของเว็บในเครือทั้ง 6 เว็บวันที่ 2026-10-08 แล้วไม่พบ `role="progressbar"` แม้แต่ที่เดียว** `[สำรวจ]` **ที่พบจริงคือ springnews ใช้ NProgress เป็นแถบบางที่ขอบบนจอ สูง 3 สีเดียวกับ `--primary-color` บวกตัวหมุน 18 คูณ 18 ที่มุมขวาบน** และ **อีก 4 เว็บ (nationtv, komchadluek, thansettakij, posttoday) ใช้โครงร่างรอโหลดแทน** **ไม่มีเว็บไหนในเครือมีแถบบอกความคืบหน้าการอ่านบทความ** ส่วนเว็บข่าวต่างประเทศใช้แถบความคืบหน้ากับ 3 งาน คือ ตัวเล่นวิดีโอและเสียง (Guardian มี `--video-progress-bar-*` และ `--audio-atom-progress-bar` BBC มี `radio-page-progress-bar`) และ **ผลคะแนนเลือกตั้งแบบซ้อนหลายค่า** (Guardian มี `--stacked-progress-to-win`) **ส่วนแถบบอกความคืบหน้าการอ่าน Digiday รายงานตั้งแต่ปี 2015 ว่า New Republic ใส่แล้วถอดออก** |

---
## 2. สถานะปัจจุบันของเราก่อนเริ่ม `[ของเรา]`

### 2.1 ของที่มีอยู่ในไฟล์ออกแบบ

อ่านจาก Figma REST API node `7121:7243` วันที่ 2026-10-08

| หัวข้อ | สถานะ |
|---|---|
| หน้า Figma | **23 Progress Bars** node `7121:7243` มี **3 COMPONENT_SET รวม 91 แบบ** บวก `_Design System Header` 2 อัน |
| `Horizontal Bar` `7135:49640` | 55 แบบ แกน `Progress` 11 ค่า (0% ถึง 100% ทีละ 10) คูณ `Label` 5 ค่า (`False`, `Right`, `Bottom`, `Top floating`, `Bottom floating`) ขนาดกรอบชุด 1784 คูณ 784 |
| `Circle` `7135:49925` | 18 แบบ แกน `Size` 6 ค่า (xs, sm, md, lg, xl, 2xl) คูณ `Percent` 3 ค่า (0%, 50%, 100%) บวก boolean property `Label#7363:0` ตั้งต้นเป็นปิด |
| `Half Circle` `7363:118` | 18 แบบ แกนเดียวกับ `Circle` แต่ **ไม่มี boolean `Label`** |
| ความหนาแถบ | **6** ทุกแบบ มุมโค้ง 4 ที่ตัวราง และ 8 ที่เฟรม `Progress bar` ชั้นนอก |
| ความกว้างแถบ | **320 ตายตัว** และตัวเติมใช้ constraint `SCALE` ส่วนรางใช้ `LEFT_RIGHT` |
| ขนาดวงกลม | 48, 64, 80, 96, 112, 128 คือสูตร `48 + 16i` |
| ความหนาวงแหวน | 6, 7, 8, 9, 10, 11 คือสูตร `6 + i` คิดเป็นสัดส่วนของเส้นผ่านศูนย์กลาง 12.5, 10.9, 10.0, 9.4, 8.9, 8.6 เปอร์เซ็นต์ `[คำนวณ]` |
| ความสูงครึ่งวงกลม | 27, 36, 44, 53, 61, 70 ตรงกับสูตร `(เส้นผ่านศูนย์กลาง + ความหนา) หาร 2` ปัดขึ้น `[คำนวณ]` |
| สีราง (แถบ) | variable `4652:21371` ได้ `#D0D5DD` ตรงกับ `--ntg-color-gray-light-300` |
| สีแถบ | variable `4652:21353` และเส้นขอบ `4652:21342` ได้ `#1E58F2` ตรงกับ `--ntg-color-brand-600` |
| สีราง (วงกลม) | variable `4652:21370` ได้ `#EAECF0` ตรงกับ `--ntg-color-gray-light-200` และเส้นขอบ `4652:21344` ได้ `#F2F4F7` ตรงกับ `--ntg-color-gray-light-100` |
| สีตัวหนังสือ | แถบใช้ `4392:8091` ได้ `#344054` วงกลมใช้ `4392:8048` ได้ `#101828` และป้ายใต้วงกลมใช้ `4392:8078` ได้ `#475467` |
| text style | **ไม่มีสักตัว** ทุก TEXT node คืน `styles: null` คือประกอบขนาดเองสด ๆ |
| ขนาดตัวหนังสือในวงกลม | 10/14, 12/22, 14/24, 16/26, 18/28, 20/30 และป้าย `Users` ใช้ 8/14, 10/16, 12/22, 14/24, 16/26, 18/28 |
| ขนาดตัวหนังสือข้างแถบ | Prompt 500 ขนาด 12 บน line-height 18 ระยะห่างอักษร 0 |
| effect style | **ไม่มี** ทั้ง 3 ชุด |
| สีดิบที่มองเห็น | **0 จุด** พื้นของ COMPONENT_SET ทั้ง 3 ชุดผูก variable `4652:21368` (`#FFFFFF`) แล้ว ส่วน fill ที่เหลือเป็น fill ที่ปิดการมองเห็นไว้ ไม่นับ |
| ไฟล์สูตรขนาด | **ยังไม่มี** `tokens/scale/progress.mjs` (มี 19 ไฟล์ ไม่มีตัวนี้ และ `tokens/scale/index.mjs` ลงทะเบียนไว้ 18 ตัว) |
| token | **ไม่มี token ชื่อ progress เลยสักตัว** ใน `tokens/tokens.json/` (คำว่า progress โผล่ที่เดียวคือใน `$description` ของ `shadows/center/xs`) |
| component โค้ด | **ไม่มี** ใน `components/` (มี 18 โฟลเดอร์ ไม่มี Progress) และไม่มีใน `prototype/` |

### 2.2 ของเดิมของเรามาจากไหน `[สำรวจ]`

ชุด `Horizontal Bar` ของเรา **ตรงกับ Untitled UI Figma kit แบบคำต่อคำ** หน้า [progress indicator components](https://www.untitledui.com/components/progress-indicators) ของ Untitled UI เขียนไว้ในข้อมูลโครงสร้างของหน้าว่า "These Figma progress bars step from 0% to 100% as a variant property, with five label placements including percentages that float above the fill, in light and dark mode" และฝั่งโค้ดที่ [`progress-indicators.tsx`](https://raw.githubusercontent.com/untitleduico/react/main/components/base/progress-indicators/progress-indicators.tsx) ประกาศชนิดไว้ตรงกันเป๊ะว่า `type ProgressBarLabelPosition = "right" | "bottom" | "top-floating" | "bottom-floating"` บวกค่าว่างอีกหนึ่ง รวมเป็น 5 ค่าเท่าของเรา

**แปลว่าของเดิมไม่ได้ออกแบบขึ้นใหม่ แต่ยกมาจาก kit สำเร็จรูป** ซึ่งสำคัญมากตอนตัดสินใจ เพราะข้อดีข้อเสียของมันคือข้อดีข้อเสียของ kit นั้น ไม่ใช่ของระบบเรา `[ตีความ]`

**แต่เราไม่ได้ยกมาทั้งหมด และตรงที่ไม่ยกมาคือตรงที่เป็นปัญหา** `[คำนวณ]`

| เรื่อง | Untitled UI ต้นทาง | ของเรา | ผล |
|---|---|---|---|
| ความหนาแถบ | 8 (`h-2` ในโค้ด และหน้าเว็บระบุว่า "8px tall and 320px wide before Auto Layout stretches it") | **6** | เราบางกว่าต้นทาง และบางกว่ามัธยฐานตลาด |
| ความกว้างแถบ | 320 ใน Figma แล้วให้ Auto Layout ยืด ส่วนโค้ดใช้ `w-full` | 320 ตายตัว ไม่มี Auto Layout ที่ยืดได้ | แถบไม่ยืดตามกรอบ |
| แกนขนาดของแถบ | ไม่มี | ไม่มี | ตรงกัน |
| จำนวนค่าเปอร์เซ็นต์ของแถบ | 11 | 11 | ตรงกัน |
| ขนาดวงกลม | 5 ขั้น ชื่อ xxs, xs, sm, md, lg ค่า 64, 160, 200, 240, 280 | **6 ขั้น ชื่อ xs ถึง 2xl ค่า 48 ถึง 128** | เราเปลี่ยนทั้งจำนวนขั้น ชื่อขั้น และขนาด |
| แกนเปอร์เซ็นต์ของวงกลม | **ไม่มี** ต้นทางมี "1 component + 10 variants" คือ 5 ขนาด คูณ 2 ทรง เท่านั้น | **มี 3 ค่า** | เราเพิ่มแกนที่ต้นทางจงใจไม่ทำ |
| ทิศการเติมของวงกลม | ตามเข็มจาก 12 นาฬิกา (โค้ดใส่ `-rotate-90` บน svg) | **ทวนเข็ม** | สวนทางทั้งต้นทางและทั้งตลาด |

Untitled UI อธิบายเองในหน้า [progress circle components](https://www.untitledui.com/components/progress-circles) ว่าทำไมวงกลมถึงไม่มีแกนเปอร์เซ็นต์ คือให้ลากมือเอาด้วยเครื่องมือส่วนโค้งของ Figma ว่า "Draw an ellipse, then drag the arc handles that appear when it is selected. Sweep sets how much of the circle is filled, ratio turns the disc into a ring and controls its thickness, and start decides which point on the clock face counts as zero" `[ทางการ]`

และอธิบายว่าทำไมแถบถึงมี 11 ค่า คือ **ทำไว้ต่อกันใน prototype** ว่า "Chain the percentage variants together with 'change to' interactions triggered on 'after delay', and set the transition to smart animate so the fill interpolates instead of jumping. A linear curve with a delay of 200 to 400ms between steps reads like a real upload" `[ทางการ]`

**นี่คือเหตุผลเดียวที่หาเจอในตลาดสำหรับการทำค่าข้อมูลเป็นแกนของชุด และเป็นเหตุผลเรื่อง prototype ล้วน ๆ ไม่ใช่เหตุผลเรื่องการส่งมอบ** `[ตีความ]`

### 2.3 ปัญหา 11 ข้อที่เห็นจากการอ่านไฟล์

**ข้อ 1 ถึง 4 คือ 4 ข้อที่ผู้สั่งงานเห็นแล้ว** ข้อ 5 เป็นต้นไปคือของที่เจอเพิ่มตอนอ่านค่าจริง

1. **เอาค่าข้อมูลมาทำเป็นแกนของชุด** ทำให้มี 55 แบบเพื่อแสดงค่าที่เปลี่ยนตลอดเวลา `[ของเรา]`
2. **สามทรงใช้จำนวนค่าเปอร์เซ็นต์ไม่เท่ากัน** แถบ 11 ค่า วงกลมกับครึ่งวงกลม 3 ค่า `[ของเรา]`
3. **แถบแนวนอนไม่มีแกนขนาดเลย แต่ทรงวงกลมมี 6 ขนาดและมีขั้น `2xl`** ซึ่งอยู่นอกสเกล 5 ขั้นของระบบเรา `[ของเรา]`
4. **แกนตำแหน่งป้ายมีค่า `False` ปนอยู่** ซึ่งควรเป็นคุณสมบัติเปิดปิด ไม่ใช่ค่าหนึ่งในแกนตำแหน่ง `[ของเรา]`
5. **ค่าเปอร์เซ็นต์ที่วาดไว้ไม่ตรงกับชื่อแบบ 10 ใน 11 แบบของคอลัมน์ `Label=False`** `[คำนวณ]` ความกว้างรางคือ 320 ทุกแบบ แต่ความกว้างตัวเติมเป็นดังนี้

   | ชื่อแบบ | กว้างราง | กว้างตัวเติม | ได้จริง | คลาดเคลื่อน |
   |---|---|---|---|---|
   | `Progress=10%, Label=False` | 320.0 | 71.8 | 22.44% | +12.44 |
   | `Progress=20%, Label=False` | 320.0 | 101.2 | 31.62% | +11.62 |
   | `Progress=30%, Label=False` | 320.0 | 128.8 | 40.25% | +10.25 |
   | `Progress=40%, Label=False` | 320.0 | 157.0 | 49.06% | +9.06 |
   | `Progress=50%, Label=False` | 320.0 | 184.0 | 57.50% | +7.50 |
   | `Progress=60%, Label=False` | 320.0 | 211.6 | 66.13% | +6.13 |
   | `Progress=70%, Label=False` | 320.0 | 238.9 | 74.66% | +4.66 |
   | `Progress=80%, Label=False` | 320.0 | 266.8 | 83.37% | +3.37 |
   | `Progress=90%, Label=False` | 320.0 | 294.4 | 92.00% | +2.00 |

   ค่าที่วัดได้เรียงตัวเป็นเส้นตรงที่มีจุดตัดราว 44 แปลว่าชุดนี้ถูกคัดลอกมาจากคอลัมน์ที่รางสั้นกว่า แล้วยืดกรอบโดยที่ตัวเติมใช้ constraint `SCALE` จึงยืดตามไปแบบผิดอัตราส่วน `[ตีความ]` **ผลคือแบบที่ชื่อว่า 50 เปอร์เซ็นต์ วาดไว้ที่ 57.5 เปอร์เซ็นต์** ซึ่งเป็นข้อผิดพลาดที่คนหยิบไปใช้มองไม่เห็น
6. **ความยาวรางของคอลัมน์ `Label=Right` ไม่คงที่** วัดได้ 276 ถึง 289 เพราะข้อความ `0%` กับ `100%` กว้างไม่เท่ากันแล้วแถบหดตาม `[คำนวณ]` ทำให้เปอร์เซ็นต์ที่วาดจริงไหลไปเป็น 10.07, 20.15, 30.22 ไล่ขึ้นไปจนถึง 90.66
7. **ป้ายลอยล้นออกนอกกรอบที่ปลายทั้งสองข้าง** `[คำนวณ]` ที่ `Progress=0%, Label=Top floating` ป้ายอยู่ที่ x เท่ากับ -16 คือล้นซ้าย 16 และที่ 100 เปอร์เซ็นต์ ป้ายกว้าง 48 วางที่ x เท่ากับ 292 คือล้นขวา 20 **และความสูงที่ประกาศของแบบนี้คือ 6 เท่ากับความสูงแถบ** แปลว่าฟองป้ายลอยอยู่นอกขอบเขต component ไปทับของที่อยู่เหนือมันเสมอเมื่อเอาไปวางใน auto layout
8. **ทรงวงกลมเติมทวนเข็มนาฬิกา** `[คำนวณ]` ค่า `arcData` ของชั้น `Line` ที่ 50 เปอร์เซ็นต์คือ `startingAngle` 1.5708 ถึง `endingAngle` 4.7124 เรเดียน คือเริ่มที่ 6 นาฬิกาแล้วกวาดผ่าน 9 นาฬิกาไป 12 นาฬิกา ภาพที่ render ออกมายืนยันว่าครึ่งซ้ายคือส่วนที่เติม **แต่ครึ่งวงกลมกลับเติมตามเข็มจาก 9 นาฬิกาไป 12 นาฬิกา** (`arcData` 3.1416 ถึง 4.7124) **สองทรงในหน้าเดียวกันจึงหมุนคนละทาง**
9. **ความหนาวงแหวนเลขคี่ทำให้วงเล็กกว่ากรอบ 1 พิกเซล** `[คำนวณ]` ขนาด xs, md, xl ซึ่งความหนาเป็นเลขคู่ วัดเส้นผ่านศูนย์กลางนอกได้ 48, 80, 112 พอดีกรอบ แต่ขนาด sm, lg, 2xl ซึ่งความหนาเป็นเลขคี่ ได้ 63, 95, 127 ขาดไป 1 จากกรอบ 64, 96, 128
10. **ไม่มี text style สักตัว** ทุก TEXT node ประกอบขนาดเอง และ **ขนาด 8 กับ 10 ไม่มีอยู่ใน preset ใด ๆ ของ `typography.json`** ซึ่งขัดกฎ preset-only ตรง ๆ `[ของเรา]`
11. **ชื่อผิดกฎหลายจุด** `[ของเรา]` ชื่อ COMPONENT_SET ทั้งสามใช้ตัวใหญ่และเว้นวรรค (`Horizontal Bar`, `Circle`, `Half Circle`) ไม่ลงท้ายด้วยชนิด และเฟรมในวงกลมสะกดผิดเป็น `Lebel` ควรเป็น `label`

### 2.4 ค่าสีของเราชนเกณฑ์คอนทราสต์ตรงไหนบ้าง `[คำนวณ]`

| คู่สี | ค่า | อัตราส่วน | เกณฑ์ 3:1 |
|---|---|---|---|
| แถบ กับ ราง (แนวนอน) | `#1E58F2` กับ `#D0D5DD` | **3.82** | ผ่าน |
| แถบ กับ ราง (วงกลม) | `#1E58F2` กับ `#EAECF0` | **4.76** | ผ่าน |
| แถบ กับ พื้นขาว | `#1E58F2` กับ `#FFFFFF` | **5.63** | ผ่าน |
| ราง (แนวนอน) กับ พื้นขาว | `#D0D5DD` กับ `#FFFFFF` | **1.47** | ไม่ผ่าน |
| ราง (วงกลม) กับ พื้นขาว | `#EAECF0` กับ `#FFFFFF` | **1.18** | ไม่ผ่าน |

**อ่านผลยังไง** คู่ที่สำคัญคือ "แถบเทียบราง" เพราะนั่นคือเส้นแบ่งที่บอกว่าเสร็จไปแค่ไหน และของเราผ่านทั้งสองทรง ส่วนคู่ "รางเทียบพื้นขาว" ไม่ผ่าน แต่ **เป็นข้อที่ตลาดส่วนใหญ่ก็ไม่ผ่านเหมือนกัน** และเถียงได้ว่าขอบนอกของรางไม่ใช่ข้อมูลที่จำเป็นต่อการเข้าใจ (ดูรายละเอียดในหัวข้อ 7.2) `[ตีความ]`

**ประเด็นที่ต้องแก้ไม่ใช่เรื่องคอนทราสต์ แต่คือการที่รางของสองทรงใช้คนละสีในหน้าเดียวกัน** โดยไม่มีเหตุผลที่อธิบายได้ `[ตีความ]`

---
## 3. ก. ชนิดและเส้นแบ่ง

### 3.1 แบบรู้ค่ากับแบบไม่รู้ค่า แยกเป็นคนละ component หรือเป็นคุณสมบัติเดียวกัน (คำถามข้อ 1)

| เจ้า | แบบรู้ค่า | แบบไม่รู้ค่า | กลไก | ที่มา |
|---|---|---|---|---|
| **Material 3** | มี | มี | `indeterminate: boolean` อยู่บนคลาสฐาน `Progress` ที่ทั้งแถบและวงกลมสืบทอด | [`progress.d.ts`](https://unpkg.com/@material/web@2.5.0/progress/internal/progress.d.ts) `[ทางการ]` |
| **IBM Carbon** | มี | มี | ไม่มี prop ให้สั่ง คำนวณเองว่า `const indeterminate = !isFinished && !isError && (value === null \|\| value === undefined)` | [`ProgressBar.js`](https://unpkg.com/@carbon/react@1.118.0/es/components/ProgressBar/ProgressBar.js) `[ทางการ]` |
| **Shopify Polaris** | มี | **ไม่มี** | ผลักไปที่ `Spinner` และ `SkeletonPage` | [`ProgressBar.d.ts`](https://unpkg.com/@shopify/polaris@13.9.5/build/ts/src/components/ProgressBar/ProgressBar.d.ts) `[ทางการ]` |
| **Adobe Spectrum** | มี | มี | `isIndeterminate: boolean` มีทั้งบน ProgressBar และ ProgressCircle | [React Spectrum ProgressBar](https://react-spectrum.adobe.com/react-spectrum/ProgressBar.html) `[ทางการ]` |
| **Atlassian** | มี | มี | `isIndeterminate?: boolean` ตั้งต้น `false` | [`types.d.ts`](https://unpkg.com/@atlaskit/progress-bar@5.3.7/dist/types/types.d.ts) `[ทางการ]` |
| **Ant Design** | มี | **ไม่มี** | `status="active"` ให้แสงวิ่งทับแถบที่รู้ค่าอยู่แล้ว ไม่ใช่แบบไม่รู้ค่า ของจริงอยู่ที่ `Spin` | [`progress.d.ts`](https://unpkg.com/antd@6.6.5/es/progress/progress.d.ts) `[ทางการ]` |
| **GitHub Primer** | มี | **ไม่มี** | มีแค่ `animated` ที่ทำแสงวิ่งทับ | [`ProgressBar.d.ts`](https://unpkg.com/@primer/react@38.40.1/dist/ProgressBar/ProgressBar.d.ts) `[ทางการ]` |
| **Microsoft Fluent 2** | มี | มี | `value?: number` และคอมเมนต์เขียนไว้ว่า "If `undefined` (default), the ProgressBar will display an **indeterminate** state" | [`index.d.ts`](https://unpkg.com/@fluentui/react-progress@9.5.6/dist/index.d.ts) `[ทางการ]` |
| **Salesforce Lightning** | มี | **ไม่มี** | ไม่มีคลาส indeterminate ในชุด `.slds-progress-bar*` | [CSS รวม](https://unpkg.com/@salesforce-ux/design-system@2.264.1/assets/styles/salesforce-lightning-design-system.css) `[ทางการ]` |
| **Uber Base Web** | มี | มี | `infinite: boolean` ตั้งต้น `false` | [`progressbar.js`](https://unpkg.com/baseui@18.2.0/progress-bar/progressbar.js) `[ทางการ]` |
| **Pinterest Gestalt** | **ไม่มี** | **ไม่มี** | **ไม่มี progress bar ในไลบรารีเลย** มีแต่ `Spinner` | [`Spinner.tsx`](https://unpkg.com/gestalt@177.0.12/src/Spinner.tsx) `[ทางการ]` |
| **Untitled UI** | มี | **ไม่มี** | `ProgressBarBase` รับแค่ `value`, `min`, `max` | [`progress-indicators.tsx`](https://raw.githubusercontent.com/untitleduico/react/main/components/base/progress-indicators/progress-indicators.tsx) `[ทางการ]` |
| **Radix** | มี | มี | `value?: number \| null \| undefined` และ `data-state` คืน `indeterminate` เมื่อค่าไม่ใช่ตัวเลข | [`index.d.mts`](https://unpkg.com/@radix-ui/react-progress@1.1.17/dist/index.d.mts) `[ทางการ]` |
| **Mantine** | มี | **ไม่มี** | `value: number` บังคับส่ง ของแบบไม่รู้ค่าอยู่ที่ `Loader` | [`Progress.d.ts`](https://unpkg.com/@mantine/core@9.7.1/lib/components/Progress/Progress.d.ts) `[ทางการ]` |
| **Chakra UI กับ Zag** | มี | มี | `value: number \| null` และสถานะ `"indeterminate" \| "loading" \| "complete"` | [`progress.types.d.ts`](https://unpkg.com/@zag-js/progress@1.45.0/dist/progress.types.d.ts) `[ทางการ]` |
| **WAI-ARIA 1.2** | มี | มี | "The author SHOULD supply a value for `aria-valuenow` unless the value is indeterminate, in which case the author SHOULD omit the `aria-valuenow` attribute" | [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/) `[มาตรฐาน]` |

**นับผล `[คำนวณ]`**

- **ทำทั้งสองแบบ 8 เจ้า** Material, Carbon, Spectrum, Atlassian, Fluent, Base Web, Radix, Chakra กับ Zag
- **ทำแค่แบบรู้ค่า 6 เจ้า** Polaris, Ant, Primer, SLDS, Untitled UI, Mantine
- **ไม่มี progress bar เลย 1 เจ้า** Gestalt
- **แยกเป็น component คนละตัว 0 ใน 8** ทุกเจ้าที่ทำทั้งคู่รวมไว้ในชิ้นเดียวกันหมด
- **กลไกแบ่งเป็น 2 ค่ายเท่ากัน** ค่ายสวิตช์ชัดเจน 4 เจ้า (Material `indeterminate`, Spectrum `isIndeterminate`, Atlassian `isIndeterminate`, Base Web `infinite`) กับ ค่าย "ไม่ส่งค่าเท่ากับไม่รู้ค่า" 4 เจ้า (Carbon, Fluent, Radix, Chakra กับ Zag)

**ข้อสังเกตที่ใช้ตัดสินได้** `[ตีความ]` ค่าย "ไม่ส่งค่าเท่ากับไม่รู้ค่า" แข็งแรงกว่าในแง่โค้ด เพราะทำให้สถานะที่ขัดกันเอง (ส่งทั้ง `value=50` และ `indeterminate=true`) เกิดไม่ได้ แต่ **ในไฟล์ออกแบบใช้ไม่ได้** เพราะ Figma ไม่มีแนวคิด "ไม่ส่งค่า" ฝั่ง Figma จึงต้องใช้สวิตช์เสมอ

### 3.2 เมื่อไหร่ใช้แถบ เมื่อไหร่ใช้ตัวหมุน เมื่อไหร่ใช้โครงร่างรอโหลด (คำถามข้อ 2)

**เกณฑ์เวลาที่เป็นตัวเลขจริง หาเจอ 4 แหล่ง**

| แหล่ง | ตัวเลข | ข้อความ |
|---|---|---|
| **Microsoft Fluent 2** | **ต่ำกว่า 1 วินาที ไม่แสดงอะไร** | "don't show an indicator as the flash on the screen may be confusing to users" `[ทางการ]` |
| **Microsoft Fluent 2** | **1 ถึง 3 วินาที ใช้ตัวหมุน** | "a spinner is appropriate" `[ทางการ]` |
| **Microsoft Fluent 2** | **เกิน 3 วินาที ใช้แถบ** | "switch to a progress bar or display a content string to reassure users that the process is active" `[ทางการ]` |
| **Microsoft Fluent 2** | **เกิน 1 วินาทีจึงใช้แถบ** | "Progress bars should only be used for tasks that take longer than a second" `[ทางการ]` |
| **IBM Carbon** | **เกิน 3 วินาที ใช้ตัวหมุน** | "Use a loading indicator if the expected wait time exceeds three seconds" `[ทางการ]` |
| **IBM Carbon** | **ต่ำกว่า 5 วินาที อย่าใช้แถบ** | "If the process takes less than 5 seconds to load, use loading instead" `[ทางการ]` |
| **Untitled UI** | **เกิน 10 วินาที ต้องมีเปอร์เซ็นต์** | "Anything expected to run past ten seconds deserves a percentage and, ideally, a sentence naming what is happening, since 'Uploading 3 of 12 files' answers a question that a rotating circle never will" `[ทางการ]` |
| **Nielsen Norman Group** | **0.1 / 1.0 / 10 วินาที** | 10 วินาทีคือ "the limit for keeping the user's attention focused on the dialogue" และเกินนั้นต้องมีตัวบอกเปอร์เซ็นต์พร้อมทางยกเลิก `[แหล่งรอง]` |

**เกณฑ์ที่ไม่ใช่เวลา แต่เป็นชนิดของเนื้อหา**

| แหล่ง | กฎ |
|---|---|
| **IBM Carbon** | "When the load time is expected to display expanded information, use skeleton states instead" และ "For full-screen loads, skeleton states are preferred over indicators" `[ทางการ]` |
| **Shopify Polaris** | แถบ "Not be used for entire page loads. In this case, use the Skeleton page component" และตัวหมุน "Not be used to give feedback for an entire page load" `[ทางการ]` |
| **Shopify Polaris** | ตัวหมุนใช้ "only be used for content that can't be represented with skeleton loading components, like for data charts" `[ทางการ]` |
| **Microsoft Fluent 2** | "If loading content with known structure that doesn't block the UI, consider a skeleton instead" `[ทางการ]` |
| **IBM Carbon** | "When manual user actions are required to progress, use a progress indicator instead" คือถ้าคืบหน้าเพราะคนกดเอง ไม่ใช่เพราะระบบทำงาน ให้ใช้ตัวบอกขั้นตอน ไม่ใช่แถบ `[ทางการ]` |
| **Atlassian** | "Use a progress bar when the process is complex or has a long wait time, and you can determine the percentage" และ "For short loading times, use a spinner instead" `[ทางการ]` |

**สรุปเกณฑ์ที่ใช้ได้จริง 4 ข้อ `[ตีความ]`** ถามตามลำดับ ข้อแรกที่ตอบว่าใช่คือคำตอบ

1. **ถ้าหน้ารู้อยู่แล้วว่าโครงของเนื้อหาจะหน้าตาแบบไหน ใช้โครงร่างรอโหลด** ไม่ว่าจะใช้เวลาเท่าไหร่ (Carbon, Polaris, Fluent ตรงกันทั้ง 3 เจ้า)
2. **ถ้าต่ำกว่า 1 วินาที ไม่ต้องแสดงอะไร** (Fluent)
3. **ถ้าวัดเปอร์เซ็นต์ไม่ได้ หรือรอ 1 ถึง 3 วินาที ใช้ตัวหมุน** (Fluent และ Carbon ต่างกันที่ขอบล่าง 1 กับ 3)
4. **ถ้าวัดเปอร์เซ็นต์ได้ และเกิน 3 ถึง 5 วินาที ใช้แถบ** และ **ถ้าเกิน 10 วินาที ต้องมีตัวเลขเปอร์เซ็นต์ ไม่ใช่แค่แถบเปล่า** (Untitled UI และ Nielsen ตรงกัน)

**จุดที่ตลาดไม่ตรงกันคือขอบล่างของตัวหมุน** Fluent บอก 1 วินาที Carbon บอก 3 วินาที และขอบที่เปลี่ยนจากตัวหมุนเป็นแถบ Fluent บอก 3 Carbon บอก 5 **ช่วงที่ทั้งคู่เห็นตรงกันคือ เกิน 5 วินาทีต้องเป็นแถบแน่นอน** `[ตีความ]`

### 3.3 ชนิดพิเศษอื่น ๆ และเจ้าไหนมี (คำถามข้อ 3)

| ชนิด | เจ้าที่มี | หลักฐาน |
|---|---|---|
| **มีช่วงบัฟเฟอร์** | **Material 3 เจ้าเดียว** | `LinearProgress` มี `buffer: number` พร้อมคอมเมนต์ "Buffer amount to display, a fraction between 0 and `max`. If the value is 0 or negative, the buffer is not displayed" และ CSS มี `@keyframes buffering` ความเร็ว 250ms `[ทางการ]` |
| **แบ่งเป็นช่วง (segmented หรือ stepped)** | **Ant, Base Web** | Ant มี `steps?: number \| { count: number; gap: number }` และไฟล์ `Steps.js` ตั้งกว้างช่วงละ 14 สูง 8 (เล็ก 2 คูณ 8) ส่วน Base Web มี `steps` และตั้งชื่อให้โปรแกรมอ่านหน้าจอว่า `Step ${Math.ceil(...)} of ${steps}` `[ทางการ]` |
| **ซ้อนหลายค่าในแถบเดียว** | **Primer, Mantine, Ant** | Primer ใช้ `ProgressBar.Item` หลายตัวเรียงกันใน flex ที่มี `gap: 2px` และเอกสารบอกว่าใช้ "visualize parts that make up a whole" ส่วน Mantine มี `Progress.Section` และ `RingProgress` รับ `sections: RingProgressSection[]` ส่วน Ant มี `success: { percent, strokeColor }` ซ้อนทับแถบหลัก `[ทางการ]` |
| **จุดหยุดที่ปลายราง (stop indicator)** | **Material 3 เจ้าเดียว** | token `$stop-indicator-size: 4px` และ `$stop-indicator-shape: corner-full` ในชุด `md.comp.progress-indicator` และ Compose มี `StopIndicatorTrailingSpace = 6.dp` `[ทางการ]` |
| **ช่องว่างระหว่างแถบกับราง** | **Material 3 เจ้าเดียว** | `$active-indicator-track-space: 4px` และ Compose มี `LinearIndicatorTrackGapSize` กับ `CircularIndicatorTrackGapSize` `[ทางการ]` |
| **แบบคลื่น (wavy)** | **Material 3 เจ้าเดียว** | ไฟล์ [`WavyProgressIndicator.kt`](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/WavyProgressIndicator.kt) และ token `ActiveWaveAmplitude` กับ `ActiveWaveWavelength` ทั้งในชุดแถบและชุดวงกลม `[ทางการ]` |
| **ลายทาง (striped) และลายทางวิ่ง** | **Mantine, Chakra** | Mantine มี `striped?: boolean` และ `animated?: boolean` ("If set, the sections stripes are animated (automatically enables striped)") ส่วน Chakra มี variant `striped` และ `animated` ที่ `--stripe-size: 1rem` `[ทางการ]` |
| **ไล่สี (gradient)** | **Ant เจ้าเดียว** | `strokeColor?: string \| string[] \| ProgressGradient` โดย `ProgressGradient` รับ `{ direction }` บวก from to `[ทางการ]` |
| **แนวตั้ง** | **SLDS, Zag กับ Chakra** | SLDS มีคลาส `.slds-progress-bar_vertical` คู่กับทุกขนาด ส่วน Zag มี prop `orientation` ที่มีค่าเริ่มต้น `[ทางการ]` |
| **สี 4 สีสลับ (four color)** | **Material 3 เจ้าเดียว** | `fourColor: boolean` กับ `@keyframes four-color` ความเร็ว 4000ms บนแถบและ 5332ms บนวงกลม `[ทางการ]` |

**ของที่ตลาดไม่มีเลย `[คำนวณ]`** หาไม่เจอสักเจ้าในสิบห้าเจ้า คือ **สถานะหยุดชั่วคราว** และ **แถบที่เดินถอยหลัง** (Fluent เขียนห้ามไว้ชัดว่าอย่าให้ดู "rewind" เพราะ "erodes user confidence")

**ของที่ควรรู้ว่าเป็นคนละเรื่องกัน `[มาตรฐาน]`** นอกจาก `progressbar` ยังมี role ชื่อ `meter` ซึ่งหน้าตาเหมือนกันแต่ความหมายต่างกัน APG เขียนไว้ว่า "The meter should not be used to indicate progress, such as loading or percent completion of a task. To communicate progress, use the progressbar role instead" และ React Aria แยกเป็น `useMeter` ต่างหากที่คืน `role: 'meter progressbar'` พร้อมคอมเมนต์ว่าใส่สองค่าเพราะเบราว์เซอร์รองรับ `meter` ไม่ครบ **แปลว่าของอย่าง พื้นที่เก็บข้อมูลที่ใช้ไป หรือ คะแนนรีวิว ไม่ใช่ progress bar** ถึงจะวาดเหมือนกันทุกประการ

---
## 4. ข. ทรง

### 4.1 แต่ละเจ้ามีทรงอะไรบ้าง และมีกี่เจ้าที่ทำครึ่งวงกลม (คำถามข้อ 4)

| เจ้า | แถบแนวนอน | วงกลม | ครึ่งวงกลม | ทรงอื่น |
|---|---|---|---|---|
| **Material 3** | `md-linear-progress` | `md-circular-progress` | ไม่มี | แบบคลื่นทั้งสองทรง |
| **IBM Carbon** | `ProgressBar` | ไม่มี (ตัวหมุน `Loading` ไม่บอกเปอร์เซ็นต์) | ไม่มี | ไม่มี |
| **Shopify Polaris** | `ProgressBar` | ไม่มี | ไม่มี | ไม่มี |
| **Adobe Spectrum** | `ProgressBar` | `ProgressCircle` | ไม่มี | ไม่มี |
| **Atlassian** | `ProgressBar` | ไม่มี | ไม่มี | ไม่มี |
| **Ant Design** | `type="line"` | `type="circle"` | **`type="dashboard"`** | แบ่งเป็นช่วงด้วย `steps` |
| **GitHub Primer** | `ProgressBar` | ไม่มี | ไม่มี | หลายช่วงเรียงกันด้วย `ProgressBar.Item` |
| **Microsoft Fluent 2** | `ProgressBar` | ไม่มี (`Spinner` แยก) | ไม่มี | ไม่มี |
| **Salesforce Lightning** | `.slds-progress-bar` | `.slds-progress-ring` | ไม่มี | **แนวตั้ง** `.slds-progress-bar_vertical` |
| **Uber Base Web** | `ProgressBar` | ไม่มี | ไม่มี | **แคปซูลมีตัวเลขข้างใน** `ProgressBarRounded` |
| **Pinterest Gestalt** | **ไม่มี** | ไม่มี | ไม่มี | ไม่มี |
| **Untitled UI** | `ProgressBar` | `ProgressBarCircle` | **`ProgressBarHalfCircle`** | ไม่มี |
| **Radix** | `Progress` (ไม่กำหนดทรง) | ไม่มี | ไม่มี | ไม่มี |
| **Mantine** | `Progress` | `RingProgress` | **`SemiCircleProgress`** | ลายทาง |
| **Chakra UI กับ Zag** | `Progress` | `ProgressCircle` | ไม่มี | **แนวตั้ง** ผ่าน `orientation` ของ Zag |

**นับผล `[คำนวณ]`**

- **แถบแนวนอน 14 ใน 15 เจ้า** ขาดแค่ Gestalt ที่ไม่มี progress bar เลย
- **ทรงวงกลม 7 ใน 15 เจ้า** คือ Material, Spectrum, Ant, SLDS, Untitled UI, Mantine, Chakra
- **ทรงครึ่งวงกลม 3 ใน 15 เจ้า** คือ **Ant** (ชื่อ `dashboard`) **Mantine** (ชื่อ `SemiCircleProgress`) และ **Untitled UI** (ชื่อ half circle gauge)
- **แนวตั้ง 2 เจ้า** SLDS และ Zag กับ Chakra
- **แคปซูลมีตัวเลขข้างใน 1 เจ้า** Base Web

**ครึ่งวงกลมเขาใช้ทำอะไร** ทั้งสามเจ้าใช้เป็น **หน้าปัดวัดค่า ไม่ใช่ตัวบอกความคืบหน้าของงาน** `[ตีความ]` หลักฐาน

- **Ant ตั้งชื่อว่า `dashboard` ไม่ใช่ `semi-circle`** และตั้งค่า `gapDegree` เริ่มต้นไว้ที่ **75 องศา** กับ `gapPlacement` เริ่มต้น `'bottom'` คือเปิดช่องว่างด้านล่าง ซึ่งเป็นรูปร่างหน้าปัดมาตรวัดความเร็ว ไม่ใช่ครึ่งวงกลมแท้ ๆ [`Circle.js`](https://unpkg.com/antd@6.6.5/es/progress/Circle.js) `[ทางการ]`
- **Mantine ให้เลือกทิศได้สองแกน** `orientation?: 'up' | 'down'` และ `fillDirection?: 'right-to-left' | 'left-to-right'` ซึ่งเป็นความต้องการของหน้าปัด ไม่ใช่ของแถบโหลด [`SemiCircleProgress.d.ts`](https://unpkg.com/@mantine/core@9.7.1/lib/components/SemiCircleProgress/SemiCircleProgress.d.ts) `[ทางการ]`
- **Untitled UI เรียกตรง ๆ ว่า gauge** ในข้อมูลโครงสร้างของหน้าว่า "each size comes as a full circle or a half circle gauge, in light and dark mode" `[ทางการ]`

**แปลว่าครึ่งวงกลมอยู่ในตระกูลแผนภูมิมากกว่าตระกูลตัวบอกสถานะการโหลด** และสามเจ้าที่มีคือเจ้าที่มีงานแดชบอร์ดเป็นเรื่องหลัก `[ตีความ]`

### 4.2 ทรงวงกลมใช้เมื่อไหร่แทนแถบแนวนอน (คำถามข้อ 5)

**เกณฑ์ที่เขียนไว้เป็นลายลักษณ์อักษร หาเจอ 2 แหล่ง**

| แหล่ง | ข้อความ |
|---|---|
| **Untitled UI** | "A circle when the value lives in a square tile and stands alone. A progress bar when the value describes something wide, or when several of them stack in a list and need comparing. **People judge lengths more accurately than angles, so lists of values belong in bars regardless of how good the rings look**" `[ทางการ]` |
| **Untitled UI** | "A bar reads a value along a line and suits wide contexts like upload rows and checklists, and lengths in a column compare more accurately than angles. A progress circle occupies a square and suits tiles and dashboards. **Pick one for a given kind of value and stay with it**" `[ทางการ]` |

**เกณฑ์ที่อนุมานได้จากค่าในไฟล์ต้นทาง `[คำนวณ]`**

- **Spectrum ทำวงกลมเล็กกว่าแถบมาก** วงกลมขนาดเล็กคือ 16 พิกเซล และมี token แยกชื่อ `in-field-progress-circle.json` สำหรับวางในช่องกรอก คือใช้แทนตัวหมุนในพื้นที่แคบ
- **Ant ตีเส้นที่ 20 พิกเซล** โค้ดตั้งคลาส `${prefixCls}-inline-circle` เมื่อ `getSize(size, 'circle')[0] <= 20` คือวงกลมที่เล็กกว่าหรือเท่ากับ 20 ถือเป็นของที่ไหลไปกับบรรทัดข้อความ
- **Material ไม่แยกขนาด** ทั้งแถบและวงกลมมีขนาดเดียว แปลว่า Material ถือว่าการเลือกทรงเป็นเรื่องของที่ว่าง ไม่ใช่เรื่องของขนาด

**สรุปเกณฑ์ที่ใช้ได้ `[ตีความ]`** ใช้วงกลมเมื่อที่ว่างเป็นสี่เหลี่ยมจัตุรัสและมีค่าเดียวโดด ๆ เช่น การ์ดในแดชบอร์ด และใช้แถบเมื่อค่าอยู่ในแถว หรือมีหลายค่าเรียงกันให้เทียบ เพราะคนเทียบความยาวได้แม่นกว่าเทียบมุม **และห้ามสลับไปมาสำหรับข้อมูลชนิดเดียวกัน**

---

## 5. ค. ขนาดและค่าเปอร์เซ็นต์

### 5.1 แกนขนาดมีกี่ขั้น และมีเจ้าไหนใช้ `2xl` ไหม (คำถามข้อ 6)

**แถบแนวนอน**

| เจ้า | จำนวนขั้น | ชื่อขั้นและความหนา (พิกเซล) | ที่มา |
|---|---|---|---|
| **Material 3** | **0** | ความหนาเดียว 4 (token `$track-thickness: 4px` และ Compose `Height = 4.dp`) | [`_md-comp-progress-indicator.scss`](https://unpkg.com/@material/web@2.5.0/tokens/versions/latest/sass/_md-comp-progress-indicator.scss) `[ทางการ]` |
| **IBM Carbon** | **2** | `small` 4, `big` 8 (ค่าเริ่มต้น `big`) | [`_progress-bar.scss`](https://unpkg.com/@carbon/styles@1.117.0/scss/components/progress-bar/_progress-bar.scss) `[ทางการ]` |
| **Shopify Polaris** | **3** | `small` 8, `medium` 16, `large` 32 (สูตร `1rem` คูณ 0.5, 1, 2) | [`styles.css`](https://unpkg.com/@shopify/polaris@13.9.5/build/esm/styles.css) `[ทางการ]` |
| **Adobe Spectrum** | **4** | `S` 4, `M` 6, `L` 8, `XL` 10 บนเดสก์ท็อป และ 5, 8, 10, 13 บนมือถือ | [`progress-bar.json`](https://unpkg.com/@adobe/spectrum-tokens@15.5.0/src/progress-bar.json) `[ทางการ]` |
| **Atlassian** | **0** | ความหนาเดียว 6 | [`progress-bar.compiled.css`](https://unpkg.com/@atlaskit/progress-bar@5.3.7/dist/es2019/components/progress-bar.compiled.css) `[ทางการ]` |
| **Ant Design** | **2** | `small` 6, `medium` 8 บวกรับตัวเลขอิสระ | [`utils.js`](https://unpkg.com/antd@6.6.5/es/progress/utils.js) `[ทางการ]` |
| **GitHub Primer** | **3** | `small` 5, `default` 8, `large` 10 | [`ProgressBar.d.ts`](https://unpkg.com/@primer/react@38.40.1/dist/ProgressBar/ProgressBar.d.ts) `[ทางการ]` |
| **Microsoft Fluent 2** | **2** | `medium` 2, `large` 4 (เรียกแกนนี้ว่า `thickness` ไม่ใช่ `size`) | [`useProgressBarStyles.styles.raw.js`](https://unpkg.com/@fluentui/react-progress@9.5.6/lib/components/ProgressBar/useProgressBarStyles.styles.raw.js) `[ทางการ]` |
| **Salesforce Lightning** | **4** | `x-small` 2, `small` 4, `medium` 8, `large` 12 | [CSS รวม](https://unpkg.com/@salesforce-ux/design-system@2.264.1/assets/styles/salesforce-lightning-design-system.css) `[ทางการ]` |
| **Uber Base Web** | **3** | `small` 2, `medium` 4, `large` 8 | [`styled-components.js`](https://unpkg.com/baseui@18.2.0/progress-bar/styled-components.js) `[ทางการ]` |
| **Pinterest Gestalt** | ไม่มี component | ตัวหมุนมี 3 ขั้น `sm` 32, `md` 40, `lg` 56 | [`Spinner.tsx`](https://unpkg.com/gestalt@177.0.12/src/Spinner.tsx) `[ทางการ]` |
| **Untitled UI** | **0** | ความหนาเดียว 8 (`h-2`) | [`progress-indicators.tsx`](https://raw.githubusercontent.com/untitleduico/react/main/components/base/progress-indicators/progress-indicators.tsx) `[ทางการ]` |
| **Radix** | **0** | ไม่กำหนดสไตล์เลย | [`index.d.mts`](https://unpkg.com/@radix-ui/react-progress@1.1.17/dist/index.d.mts) `[ทางการ]` |
| **Mantine** | **5** | `xs` 3, `sm` 5, `md` 8, `lg` 12, `xl` 16 | [`Progress.css`](https://unpkg.com/@mantine/core@9.7.1/styles/Progress.css) `[ทางการ]` |
| **Chakra UI** | **5** | `xs` 6, `sm` 8, `md` 10, `lg` 12, `xl` 16 | [`progress.js`](https://unpkg.com/@chakra-ui/react@3.37.0/dist/esm/theme/recipes/progress.js) `[ทางการ]` |
| **ของเรา** | **0** | ความหนาเดียว 6 | `[ของเรา]` |

**ทรงวงกลม**

| เจ้า | จำนวนขั้น | เส้นผ่านศูนย์กลางและความหนาวงแหวน |
|---|---|---|
| **Material 3** | **1** | 48 บนเว็บ และ 40 บน Compose ความหนา 4 |
| **Adobe Spectrum** | **3** | `S` 16/2, `M` 32/3, `L` 64/4 บนเดสก์ท็อป และ 20/3, 40/4, 80/5 บนมือถือ |
| **Ant Design** | **2** | `small` 60, `medium` 120 ความหนา 6 เปอร์เซ็นต์ของเส้นผ่านศูนย์กลาง |
| **Salesforce Lightning** | **2** | ปกติ 24, `large` 32 |
| **Untitled UI** | **5** | `xxs` 64/6, `xs` 160/16, `sm` 200/20, `md` 240/24, `lg` 280/28 |
| **Mantine** | ตัวเลขอิสระ | ค่าเริ่มต้น 120 ความหนา 12 และบังคับไม่เกิน `size / 4` |
| **Chakra UI** | **5** | `xs` 24/4, `sm` 32/5, `md` 40/6, `lg` 48/7, `xl` 64/8 |
| **ของเรา** | **6** | `xs` 48/6, `sm` 64/7, `md` 80/8, `lg` 96/9, `xl` 112/10, **`2xl` 128/11** |

**ตอบคำถามเรื่อง `2xl` ตรง ๆ `[คำนวณ]` ไม่มีเจ้าไหนใช้ขั้นชื่อ `2xl` เลยสักเจ้าในสิบห้าเจ้า** ขั้นสูงสุดที่ตลาดใช้คือ `xl` ซึ่งมีแค่ 2 เจ้า (Mantine และ Chakra) และทั้งคู่หยุดที่ 5 ขั้นพอดีเหมือนระบบเรา **และไม่มีเจ้าไหนใช้ 6 ขั้นเลย**

**สถิติจำนวนขั้นของแถบแนวนอน `[คำนวณ]`** 0 ขั้น 4 เจ้า (Material, Atlassian, Radix, Untitled UI), 2 ขั้น 3 เจ้า (Carbon, Ant, Fluent), 3 ขั้น 3 เจ้า (Polaris, Primer, Base Web), 4 ขั้น 2 เจ้า (Spectrum, SLDS), 5 ขั้น 2 เจ้า (Mantine, Chakra) **มัธยฐานเท่ากับ 3**

**ข้อสังเกตที่ขัดกับความเชื่อทั่วไป `[ตีความ]`** 4 ใน 14 เจ้าไม่มีแกนขนาดให้แถบเลย ซึ่งรวมถึง Material ที่เป็นระบบใหญ่ที่สุด **แปลว่าการที่แถบของเราไม่มีแกนขนาดไม่ใช่ความผิดพลาด แต่เป็นทางที่ตลาดหนึ่งในสี่เลือก** สิ่งที่ผิดคือการที่ทรงวงกลมมี 6 ขั้นในขณะที่แถบมี 0 ขั้น ซึ่งไม่มีเจ้าไหนทำแบบนั้น

### 5.2 ความหนาของแถบและของวงแหวน มีสูตรหรือมีค่าตายตัว (คำถามข้อ 7)

**แถบแนวนอน ค่าเริ่มต้นของแต่ละเจ้า `[คำนวณ]`** Fluent 2, Material 4, Base Web 4, Spectrum 6, Atlassian 6, ของเรา 6, Carbon 8, Ant 8, Primer 8, SLDS 8, Untitled UI 8, Mantine 8, Chakra 10, Polaris 16

**มัธยฐานของค่าเริ่มต้นเท่ากับ 8** ช่วงทั้งหมด 2 ถึง 16 **ของเราอยู่ที่ 6 คือต่ำกว่ามัธยฐาน และต่ำกว่าต้นทางของเราเองที่เป็น 8**

**ไม่มีเจ้าไหนใช้สูตรคณิตกับความหนาของแถบ** ทุกเจ้าพิมพ์ค่าตรง ๆ ต่อขนาด ที่ใกล้เคียงสูตรที่สุดคือ Polaris ที่เขียนเป็น `calc(var(--pc-progress-bar-height-base) * 2)` และ `* 0.5` จากฐาน `1rem` `[ทางการ]` และ Spectrum ที่ขั้นเดสก์ท็อปเป็น 4, 6, 8, 10 ซึ่งคือ `4 + 2i` พอดี `[คำนวณ]`

**ความหนาวงแหวน ตรงนี้มีสูตรจริง และตลาดเห็นตรงกันมากกว่าที่คิด**

| เจ้า | สูตรหรือค่า | สัดส่วนต่อเส้นผ่านศูนย์กลาง `[คำนวณ]` |
|---|---|---|
| **Material 3 (เว็บ)** | `--_active-indicator-width: 10` ใช้เป็น `stroke-width: calc(var(--_active-indicator-width) * 1%)` | **10 เปอร์เซ็นต์** |
| **Material 3 (Compose)** | `TrackThickness = 4.dp` บน `Size = 40.dp` | **10 เปอร์เซ็นต์** |
| **Mantine** | ค่าเริ่มต้น `thickness = 12` บน `size = 120` และบังคับไม่เกิน `size / 4` | **10 เปอร์เซ็นต์** และเพดาน 25 เปอร์เซ็นต์ |
| **Untitled UI** | 6/64, 16/160, 20/200, 24/240, 28/280 | **9.4 แล้ว 10 ทุกขั้นที่เหลือ** |
| **Ant Design** | `strokeWidth = Math.max(getMinPercent(width), 6)` ซึ่ง `getMinPercent` คืนค่าเป็นเปอร์เซ็นต์ | **6 เปอร์เซ็นต์** |
| **Adobe Spectrum** | 2/16, 3/32, 4/64 | 12.5 แล้ว 9.4 แล้ว 6.25 เปอร์เซ็นต์ |
| **Chakra UI** | 4/24, 5/32, 6/40, 7/48, 8/64 | 16.7 แล้ว 15.6 แล้ว 15 แล้ว 14.6 แล้ว 12.5 เปอร์เซ็นต์ |
| **ของเรา** | 6/48, 7/64, 8/80, 9/96, 10/112, 11/128 | **12.5 แล้ว 10.9 แล้ว 10 แล้ว 9.4 แล้ว 8.9 แล้ว 8.6 เปอร์เซ็นต์** |

**สูตรที่ 4 เจ้าใช้ตรงกันคือ ความหนาเท่ากับ 10 เปอร์เซ็นต์ของเส้นผ่านศูนย์กลาง** (Material สองแพลตฟอร์ม, Mantine, Untitled UI) และ **ไม่มีเจ้าไหนปล่อยให้สัดส่วนไหลจาก 12.5 ลงไปถึง 8.6 แบบของเรา** ซึ่งเกิดจากการเอาสูตรบวกคงที่ (`6 + i`) มาคู่กับสูตรบวกคงที่อีกชุด (`48 + 16i`) โดยที่อัตราการโตไม่เท่ากัน `[ตีความ]`

**Untitled UI เขียนเตือนเรื่องนี้ไว้ตรง ๆ** ว่า "Choose from the five rather than scaling one, since a resized instance no longer matches the stroke weight of every other ring in the file" `[ทางการ]`

**ปลายเส้นเป็นมนหรือตัดตรง** Material ตั้ง `StrokeCap.Round` ทั้งแบบรู้ค่าและไม่รู้ค่า `[ทางการ]` Mantine มี `roundCaps?: boolean` ตั้งต้น `false` `[ทางการ]` Ant มี `strokeLinecap?: 'butt' | 'square' | 'round'` `[ทางการ]` Untitled UI ตั้ง `strokeLinecap="round"` ทั้งรางและตัวเติม `[ทางการ]` **ของเราใช้ `strokeCap: ROUND`** `[ของเรา]`

### 5.3 ในไฟล์ออกแบบของเจ้าอื่น เขาวาดค่าเปอร์เซ็นต์ไว้กี่ค่า และจัดการยังไงกับค่าที่เปลี่ยนตลอด (คำถามข้อ 8)

**ข้อนี้คือข้อที่สำคัญที่สุดของเอกสารนี้ และคำตอบมาจากข้อจำกัดของ Figma เอง ไม่ใช่จากรสนิยม** `[ตีความ]`

**ข้อเท็จจริงที่หนึ่ง Figma ผูกตัวแปรกับส่วนโค้งไม่ได้** `[ทางการ]`

ไฟล์ typings ทางการของ Figma ([`@figma/plugin-typings@1.141.0`](https://unpkg.com/@figma/plugin-typings@1.141.0/plugin-api.d.ts)) ประกาศรายการสนามที่ผูกตัวแปรได้ไว้ครบดังนี้

```
type VariableBindableNodeField =
  | 'height' | 'width' | 'characters' | 'itemSpacing'
  | 'paddingLeft' | 'paddingRight' | 'paddingTop' | 'paddingBottom'
  | 'visible' | 'cornerRadius'
  | 'topLeftRadius' | 'topRightRadius' | 'bottomLeftRadius' | 'bottomRightRadius'
  | 'minWidth' | 'maxWidth' | 'minHeight' | 'maxHeight'
  | 'counterAxisSpacing' | 'strokeWeight'
  | 'strokeTopWeight' | 'strokeRightWeight' | 'strokeBottomWeight' | 'strokeLeftWeight'
  | 'opacity' | 'gridRowGap' | 'gridColumnGap'
```

**ในรายการนี้ไม่มี `arcData`** ทั้งที่ `arcData` เป็นสนามจริงของ ELLIPSE (ประกาศไว้อีกที่หนึ่งว่า "Exposes the values of the sweep and ratio handles used in our UI to create arcs and donuts") **แปลว่าเปอร์เซ็นต์ของทรงวงกลมและครึ่งวงกลมขับด้วยตัวแปรไม่ได้ ไม่ว่าจะพยายามแค่ไหน**

**ข้อเท็จจริงที่สอง `width` ผูกตัวแปรได้ แต่ผูกได้เฉพาะค่าพิกเซลสัมบูรณ์** `[ตีความ]` รายการข้างบนมี `width` อยู่จริง แต่ Figma ไม่มีการคำนวณบนผืนผ้าใบ ความสัมพันธ์ `ความกว้างตัวเติม = เปอร์เซ็นต์ คูณ ความกว้างราง` จึงเขียนเป็นตัวแปรไม่ได้ **นิพจน์คณิตใน Figma ใช้ได้เฉพาะในคำสั่งของ prototype** คือ `Set variable` และ `Conditional` ตามที่หน้า [Use expressions in prototypes](https://help.figma.com/hc/en-us/articles/15253194385943-Use-expressions-in-prototypes) ระบุไว้ `[ทางการ]`

**ข้อเท็จจริงที่สาม `characters` ผูกตัวแปรได้** แปลว่าข้อความ `50%` ขับด้วยตัวแปรชนิดข้อความได้ **แต่ตัวแถบขับไม่ได้** `[คำนวณ]` ซึ่งแปลว่าถ้าผูกแค่ตัวเลข ตัวเลขกับแถบจะไม่ตรงกัน

**แล้วเจ้าอื่นทำยังไง**

| แหล่ง | จำนวนค่าเปอร์เซ็นต์ที่วาดไว้ | วิธีจัดการ |
|---|---|---|
| **Untitled UI (แถบ)** | **11 ค่า** 0 ถึง 100 ทีละ 10 เป็นแกนของชุด | **จงใจทำเพื่อเอาไปต่อกันใน prototype** "Chain the percentage variants together with 'change to' interactions triggered on 'after delay', and set the transition to smart animate" `[ทางการ]` |
| **Untitled UI (วงกลมและครึ่งวงกลม)** | **ไม่มีแกนเปอร์เซ็นต์เลย** ชุดมี "1 component + 10 variants" คือ 5 ขนาด คูณ 2 ทรง | **ให้ลากมือ** "Draw an ellipse, then drag the arc handles... Sweep sets how much of the circle is filled" `[ทางการ]` |
| **Salesforce Lightning** | **5 ค่า** ในหน้าเอกสาร คือ 0, 25, 50, 75, 100 | ใช้เป็นตัวอย่างในเอกสาร ไม่ใช่แกนของ component [`docs.mdx`](https://raw.githubusercontent.com/salesforce-ux/design-system/main/ui/components/progress-bar/docs.mdx) `[ทางการ]` |
| **ทุกเจ้าฝั่งโค้ด** | **ไม่มีเลย** | ค่าเป็น prop ชนิดตัวเลข ไม่ใช่ตัวเลือก ตัวอย่างเช่น Radix `value?: number` Fluent `value?: number` Mantine `value: number` `[ทางการ]` |
| **ของเรา (แถบ)** | **11 ค่า** | ยกมาจาก Untitled UI `[ของเรา]` |
| **ของเรา (วงกลมและครึ่งวงกลม)** | **3 ค่า** | **เพิ่มเองจากต้นทางที่ไม่มีแกนนี้** `[ของเรา]` |

**ข้อสรุปของข้อนี้ `[ตีความ]`**

1. **เจ้าเดียวในตลาดที่ทำค่าเปอร์เซ็นต์เป็นแกนของชุด คือ Untitled UI และทำเฉพาะทรงแถบ ด้วยเหตุผลเรื่อง prototype ล้วน ๆ**
2. **ถ้าเราไม่ได้ทำ prototype ที่ต้องเดินเปอร์เซ็นต์จริง 55 แบบนั้นไม่มีประโยชน์ใด ๆ** และยังทำให้เกิดบั๊กจริง (ดูปัญหาข้อ 5 ในหัวข้อ 2.3)
3. **เปอร์เซ็นต์ของทรงวงกลมเป็นแกนไม่ได้อยู่แล้ว** เพราะ Figma ผูกตัวแปรกับส่วนโค้งไม่ได้ ดังนั้น 3 ค่าที่เรามีจึงเป็นแค่ภาพตัวอย่าง ไม่ใช่กลไก และยิ่งไม่ควรอยู่ในแกนของชุด เพราะคนที่หยิบไปใช้จะเข้าใจผิดว่าเลือกค่าอื่นไม่ได้
4. **ทางที่ทำได้จริงในไฟล์ออกแบบคือ ให้คนที่หยิบไปใช้ลากขนาดตัวเติมเอง** (ชั้นลูกของ instance ลากได้) **บวกกับผูก `characters` ของตัวเลขเข้ากับ component property ชนิดข้อความ** ซึ่งพิมพ์ทับได้โดยไม่ต้องสร้าง variant

### 5.4 ความกว้างของแถบแนวนอนเป็นค่าตายตัวหรือยืดเต็มกรอบแม่ (คำถามข้อ 9)

| เจ้า | ค่าเริ่มต้น | ที่มา |
|---|---|---|
| **Material 3 (เว็บ)** | ยืดเต็ม | CSS ไม่กำหนดความกว้าง `[คำนวณ]` |
| **Material 3 (Compose)** | **240dp ตายตัว** | `internal val LinearIndicatorWidth get() = 240.dp` `[ทางการ]` |
| **IBM Carbon** | ยืดเต็ม `inline-size: 100%` และ **มีความกว้างต่ำสุด 48** | `_progress-bar.scss` `[ทางการ]` |
| **Shopify Polaris** | ยืดเต็ม | `styles.css` `[ทางการ]` |
| **Adobe Spectrum** | **มีค่าเริ่มต้นต่อขนาด 192, 200, 224 บวกต่ำสุด 48 และสูงสุด 768** | `progress-bar.json` และ `index.css` `[ทางการ]` |
| **Atlassian** | ยืดเต็ม | `[คำนวณ]` |
| **Microsoft Fluent 2** | ยืดเต็ม `width: '100%'` | `useProgressBarStyles.styles.raw.js` `[ทางการ]` |
| **Salesforce Lightning** | ยืดเต็ม `width: 100%` | CSS รวม `[ทางการ]` |
| **GitHub Primer** | ยืดเต็ม (เป็น flex container) | CSS โมดูล `[ทางการ]` |
| **Untitled UI** | ยืดเต็ม `w-full` ในโค้ด และ **320 ใน Figma ก่อน Auto Layout ยืด** | `progress-indicators.tsx` และหน้าเอกสาร `[ทางการ]` |
| **Mantine, Chakra, Radix** | ยืดเต็ม | `[คำนวณ]` |
| **ของเรา** | **320 ตายตัว ไม่ยืด** | `[ของเรา]` |

**นับผล `[คำนวณ]` 11 ใน 13 เจ้าให้ยืดเต็มกรอบแม่** มีแค่ Spectrum ที่ตั้งค่าเริ่มต้นเป็นตัวเลขพร้อมขอบบนขอบล่าง และ Material ฝั่ง Compose ที่ตั้ง 240dp **และทั้งสองเจ้ายังยืดได้อยู่ดี**

**ของเราตรงนี้ผิดจากต้นทางตัวเอง** Untitled UI ระบุว่า 320 เป็นแค่ความกว้างตั้งต้น "before Auto Layout stretches it" แต่ไฟล์เราไม่มี Auto Layout ที่ทำให้มันยืด และตัวเติมใช้ constraint `SCALE` ซึ่งเป็นต้นเหตุของค่าเปอร์เซ็นต์ที่เพี้ยนในปัญหาข้อ 5 `[ตีความ]`

**ค่าต่ำสุดที่สองเจ้าตั้งตรงกันคือ 48** (Carbon `min-inline-size: convert.to-rem(48px)` และ Spectrum `progress-bar-minimum-width: 48px`) `[ทางการ]`

---
## 6. ง. ป้ายและตัวเลข

### 6.1 แสดงตัวเลขเปอร์เซ็นต์ไหม วางตรงไหนได้บ้าง และให้เลือกกี่ค่า (คำถามข้อ 10)

| เจ้า | มีตัวเลขในตัว component | จำนวนตำแหน่งที่เลือกได้ | ค่าที่เลือกได้ |
|---|---|---|---|
| **Material 3** | **ไม่มีเลย** | 0 | ไม่มีช่องให้ใส่ข้อความใด ๆ |
| **IBM Carbon** | มี | **3** | `type` เท่ากับ `default` (ป้ายอยู่บน), `inline`, `indented` บวก `helperText` ที่อยู่ล่างเสมอ และ `hideLabel` ซ่อนป้ายแบบยังอ่านได้ด้วยโปรแกรมอ่านหน้าจอ |
| **Shopify Polaris** | **ไม่มี** | 0 | มีแต่ `ariaLabelledBy` ชี้ไปข้อความข้างนอก |
| **Adobe Spectrum** | มี | **2** | `labelPosition` เท่ากับ `top` หรือ `side` บวก `showValueLabel` ที่ "True by default if there's a label, false by default if not" |
| **Atlassian** | **ไม่มี** | 0 | มีแต่ `ariaLabel` |
| **Ant Design** | มี | **6 คอมโบ** | `percentPosition.type` เท่ากับ `inner` หรือ `outer` คูณ `percentPosition.align` เท่ากับ `start` หรือ `center` หรือ `end` บวก `showInfo` เปิดปิด |
| **GitHub Primer** | **ไม่มี** | 0 | เอกสารแนะนำให้มีข้อความคู่กันข้างนอก |
| **Microsoft Fluent 2** | **ไม่มี** | 0 | ป้ายมาจาก `Field` ที่ครอบอยู่ |
| **Salesforce Lightning** | **ไม่มี** | 0 | ตัวอย่างในเอกสารวางข้อความไว้ข้างนอก |
| **Uber Base Web** | มี | **1** | `showLabel` ให้ข้อความอยู่ใต้แถบกึ่งกลางเท่านั้น |
| **Pinterest Gestalt** | ไม่มี component | ไม่มี | ตัวหมุนมี `label` วางใต้วงอย่างเดียว |
| **Untitled UI** | มี | **5** | `right`, `bottom`, `top-floating`, `bottom-floating`, ไม่มีป้าย |
| **Radix** | **ไม่มี** | 0 | มี `getValueLabel` ที่ไปลงใน `aria-valuetext` เท่านั้น ไม่ได้วาด |
| **Mantine** | มี | **1** | `Progress.Label` อยู่ข้างในตัวเติมอย่างเดียว ส่วน `RingProgress` และ `SemiCircleProgress` มี `label` ตรงกลาง และ `SemiCircleProgress` มี `labelPosition` เท่ากับ `center` หรือ `bottom` |
| **Chakra UI** | มี | ประกอบเอง | มี slot `label` กับ `valueText` ให้วางเองอิสระ |
| **ของเรา** | มี | **5** | ยกมาจาก Untitled UI ครบ |

**นับผล `[คำนวณ]` มัธยฐานของจำนวนตำแหน่งที่ตลาดให้เลือกเท่ากับ 1** โดย **7 ใน 15 เจ้าไม่มีตัวเลขในตัว component เลย** และผลักให้คนใช้วางข้อความเอง **มีแค่ 3 เจ้าที่ให้เลือกมากกว่า 2 ตำแหน่ง** คือ Untitled UI (5) Ant (6 คอมโบ) และ Carbon (3)

**เหตุผลที่เจ้าใหญ่หลายเจ้าไม่ใส่ตัวเลขเข้าไปใน component `[ตีความ]`** เพราะมาตรฐาน ARIA ระบุว่า `progressbar` มีคุณสมบัติ `Children Presentational: True` **แปลว่าข้อความที่อยู่ข้างในกล่องที่มี `role="progressbar"` จะไม่ถูกโปรแกรมอ่านหน้าจออ่าน** การวางตัวเลขไว้ข้างนอกจึงปลอดภัยกว่าโดยอัตโนมัติ (ดูหัวข้อ 8.1)

**กฎการเขียนป้ายที่เขียนไว้ชัด**

| แหล่ง | กฎ |
|---|---|
| **IBM Carbon** | "Labels should always appear above the progress bar" และ "Avoid embedding text inside the indicator or track" และ "Keep labels short and concise; don't update text during loading" `[ทางการ]` |
| **Microsoft Fluent 2** | "Keep labels short and clear... Don't include a period" และ "Use descriptive -ing verbs for communicating a task's progress. Keep it brief and end with an ellipsis" `[ทางการ]` |
| **Microsoft Fluent 2** | เรื่องงานหลายขั้น "Combine related steps into one bar" เพื่อไม่ให้แถบดูเหมือนถอยหลัง เพราะ "erodes user confidence" `[ทางการ]` |

### 6.2 ป้ายลอยที่เลื่อนตามหัวแถบ มีเจ้าไหนทำ และมีปัญหาอะไร (คำถามข้อ 11)

**มีเจ้าเดียวในสิบห้าเจ้า คือ Untitled UI** `[คำนวณ]` และเป็นต้นทางของไฟล์เรา โค้ดจริงเป็นแบบนี้

```
style={{ left: `${percentage}%` }}
className="absolute -top-2 -translate-x-1/2 -translate-y-full rounded-lg bg-primary_alt px-3 py-2 shadow-lg ring-1 ring-secondary_alt"
```

**ปัญหา 4 ข้อที่พิสูจน์ได้จากไฟล์เราเอง** `[คำนวณ]`

1. **ล้นออกนอกกรอบที่ปลายทั้งสองข้าง** เพราะ `left: 0%` คู่กับ `-translate-x-1/2` แปลว่าครึ่งซ้ายของฟองออกนอกขอบ ในไฟล์เราวัดได้ว่าที่ 0 เปอร์เซ็นต์ป้ายอยู่ที่ x เท่ากับ -16 และที่ 100 เปอร์เซ็นต์ล้นขวา 20
2. **ฟองลอยอยู่นอกขอบเขตของ component** ความสูงที่ประกาศของแบบ `Label=Top floating` คือ 6 ซึ่งคือความสูงของแถบล้วน ๆ แปลว่าเอาไปวางใน auto layout เมื่อไหร่ ฟองจะไปทับของที่อยู่เหนือมันเสมอ
3. **ความกว้างฟองไม่คงที่** วัดได้ 40 ที่ค่าหลักเดียวและสองหลัก แต่เป็น 48 ที่ 100 เปอร์เซ็นต์ ทำให้ระยะล้นเปลี่ยนไปตามค่า
4. **ในไฟล์เรา ฟองมองไม่เห็น** พื้นฟองผูก variable `4652:21368` ซึ่งได้ `#FFFFFF` เท่ากับพื้นหลังของกรอบชุด ภาพที่ render ออกมาจึงเห็นแค่ตัวเลขลอย ๆ ไม่เห็นกล่องและไม่เห็นหัวลูกศร

**ข้อสังเกตเพิ่ม `[ตีความ]`** ฟองนี้ในไฟล์เราเป็น instance ของ component tooltip จากหน้า 20 ซึ่งแปลว่าการตัดสินใจเรื่อง tooltip จะลากมาถึง progress bar ด้วย ถ้าหน้า 20 เปลี่ยนทรงเป็นพื้นเข้ม ป้ายลอยนี้จะเปลี่ยนตามโดยอัตโนมัติ

### 6.3 ควรปัดเศษยังไง และควรแสดงหน่วยอะไรนอกจากเปอร์เซ็นต์ไหม (คำถามข้อ 12)

**การปัดเศษ ตลาดปัดเป็นจำนวนเต็มทั้งหมด** `[คำนวณ]` แต่แบ่งเป็น 2 วิธี

| วิธี | เจ้าที่ใช้ | โค้ดจริง |
|---|---|---|
| **ปัดเองด้วย `Math.round`** | Radix, Base Web, Untitled UI (วงกลม), Ant (`steps`) | Radix `` `${Math.round(value / max * 100)}%` ``, Base Web `` `${Math.round((value - minValue) / (maxValue - minValue) * 100)}% Complete` ``, Untitled UI `const percentage = Math.round(((value - min) * 100) / (max - min))`, Ant `rounding: customRounding = Math.round` |
| **ตัดทศนิยมด้วย `toFixed(0)`** | Untitled UI (แถบ) | `` `${percentage.toFixed(0)}%` `` |
| **ใช้ `Intl.NumberFormat`** | **Spectrum กับ React Aria** และ **Zag กับ Chakra** | React Aria ตั้งค่าเริ่มต้น `formatOptions = { style: 'percent' }`, Zag ตั้ง `formatOptions: { style: "percent", ...props.formatOptions }` |

**ทางที่แข็งแรงที่สุดคือ `Intl.NumberFormat`** `[ตีความ]` เพราะได้ 3 อย่างฟรี คือ ปัดเศษตามกฎของภาษา เปลี่ยนหน่วยได้โดยไม่ต้องแก้ component และ **ได้รูปแบบตัวเลขไทยถูกต้องเมื่อตั้ง locale เป็น `th-TH`** ซึ่งสำคัญกับเราเป็นพิเศษ

**หน่วยอื่นนอกจากเปอร์เซ็นต์ ตลาดรองรับและแนะนำ**

| แหล่ง | หลักฐาน |
|---|---|
| **Adobe Spectrum** | `valueLabel?: ReactNode` พร้อมตัวอย่างในเอกสารว่า "30 of 60 dogs" `[ทางการ]` |
| **GitHub Primer** | เอกสารแนะนำ `aria-label` แบบ "4 of 12 tasks completed" `[ทางการ]` |
| **Uber Base Web** | ข้อความเริ่มต้นคือ `"X% Complete"` และสำหรับแบบแบ่งช่วงคือ `"Step n of m"` `[ทางการ]` |
| **IBM Carbon** | `helperText?: string` ซึ่งนิยามว่า "The current progress as a textual representation" คือพิมพ์อะไรก็ได้ `[ทางการ]` |
| **Untitled UI** | "Uploading 3 of 12 files answers a question that a rotating circle never will" `[ทางการ]` |
| **Microsoft Fluent 2** | **ห้ามใช้หน่วยเวลา** "Avoid time units, they're rarely accurate enough to be trustworthy. Use informative, relevant units instead" `[ทางการ]` |

**รายละเอียดเล็กที่สำคัญ ตัวเลขควรใช้ความกว้างตัวอักษรเท่ากัน** `[คำนวณ]` มี 2 เจ้าที่ตั้งไว้ คือ **Untitled UI** ใส่คลาส `tabular-nums` ทุกจุดที่แสดงตัวเลข และ **Chakra** ตั้ง `fontVariantNumeric: "tabular-nums"` บน slot `valueText` **เหตุผลคือกันไม่ให้ป้ายกระตุกตอนตัวเลขวิ่ง** `[ตีความ]` ซึ่งเป็นปัญหาที่เห็นได้ชัดเป็นพิเศษกับป้ายลอยที่ความกว้างเปลี่ยนตามค่า

---

## 7. จ. สีและสถานะ

### 7.1 มีสถานะอื่นนอกจากปกติไหม (คำถามข้อ 13)

| เจ้า | มีแกนสถานะ | ค่าที่มี | ชื่อแกน |
|---|---|---|---|
| **Material 3** | **ไม่มี** | มีแต่ `fourColor` ซึ่งเป็นลูกเล่นไม่ใช่สถานะ | ไม่มี |
| **IBM Carbon** | **มี 3** | `active`, `finished` (เขียวพร้อมไอคอนถูก), `error` (แดงพร้อมไอคอนผิด) | `status` |
| **Shopify Polaris** | **มี 4** | `highlight`, `primary`, `success`, `critical` | `tone` |
| **Adobe Spectrum** | **ไม่มี** | มี `staticColor` เท่ากับ `white` หรือ `black` ซึ่งเป็นเรื่องพื้นหลัง ไม่ใช่สถานะ | ไม่มี |
| **Atlassian** | **มี 3** | `default`, `success`, `inverse` | `appearance` |
| **Ant Design** | **มี 4** | `normal`, `exception`, `active`, `success` | `status` |
| **GitHub Primer** | **ไม่มี** | สีมาจาก prop `bg` ตรง ๆ | ไม่มี |
| **Microsoft Fluent 2** | **มี 4** | `brand`, `success`, `warning`, `error` | `color` |
| **Salesforce Lightning** | **มี 4 (เฉพาะวงแหวน)** | `active-step`, `complete`, `expired`, `warning` ส่วนแถบมีแค่ `__value_success` | ชื่อคลาส |
| **Uber Base Web** | **มี 5** | `default`, `positive`, `warning`, `negative`, `brand` | `INTENT` |
| **Pinterest Gestalt** | ไม่มี component | ตัวหมุนมี `color` 3 ค่า | ไม่มี |
| **Untitled UI** | **ไม่มี** | สีเดียวคือ `bg-fg-brand-primary` | ไม่มี |
| **Radix** | **ไม่มี** | ไม่กำหนดสี | ไม่มี |
| **Mantine** | **ไม่มี (เป็นสีอิสระ)** | `color?: MantineColor` รับสีอะไรก็ได้ | ไม่มี |
| **Chakra UI** | **ไม่มี (เป็นสีอิสระ)** | `colorPalette` รับชุดสีอะไรก็ได้ | ไม่มี |
| **ของเรา** | **ไม่มี** | สีเดียว `#1E58F2` | ไม่มี |

**นับผล `[คำนวณ]`**

- **มีแกนสถานะเป็นตัวเลือกตายตัว 7 ใน 15 เจ้า** Carbon, Polaris, Atlassian, Ant, Fluent, SLDS, Base Web
- **ในเจ้าที่มีแกนสถานะ มี "สำเร็จ" ครบ 7 ใน 7**
- **มี "ผิดพลาด" 6 ใน 7** ขาดแค่ Atlassian ที่มีแค่ `default` กับ `success` กับ `inverse`
- **มี "เตือน" 3 ใน 7** Fluent, SLDS, Base Web
- **มี "หยุดชั่วคราว" 0 ใน 15** `[คำนวณ]` **ไม่มีเจ้าไหนในตลาดทำสถานะหยุดชั่วคราวเลย**
- **อีก 2 เจ้าไม่ทำแกน แต่เปิดให้ใส่สีอิสระ** Mantine และ Chakra

**พฤติกรรมเพิ่มเติมของสถานะที่น่าสนใจ `[ทางการ]`** Carbon บังคับให้แถบเต็มเมื่อสถานะเป็น `finished` และบังคับให้แถบเป็นศูนย์เมื่อเป็น `error` (`if (isError) cappedValue = 0; else if (isFinished) cappedValue = max;`) และ **ซ่อนรางไปเลยเมื่ออยู่ในโหมด `inline`** ด้วย `visually-hidden` คือเหลือแค่ไอคอนกับข้อความ

### 7.2 สีรางกับสีแถบใช้ token อะไร และข้อ 1.4.11 ใช้กับแถบความคืบหน้าหรือเปล่า (คำถามข้อ 14)

**token ที่แต่ละเจ้าใช้** `[ทางการ]`

| เจ้า | ราง | แถบ |
|---|---|---|
| **Material 3** | `md-sys-color.$secondary-container` (ชุด token ใหม่) และเดิมคือ `$surface-container-highest` | `md-sys-color.$primary` |
| **IBM Carbon** | `$border-subtle` | `$interactive` และเปลี่ยนเป็น `$support-success` หรือ `$support-error` ตามสถานะ |
| **Shopify Polaris** | `--p-color-bg-fill-tertiary` | `--p-color-bg-fill-brand` และสลับเป็น `-info` `-success` `-critical` |
| **Adobe Spectrum** | `--spectrum-gray-200` และบนพื้นสีใช้ `--spectrum-transparent-white-400` | `--spectrum-accent-color-900` |
| **Microsoft Fluent 2** | `tokens.colorNeutralBackground6` | `tokens.colorCompoundBrandBackground` และ `colorPaletteGreenBackground3` `colorPaletteDarkOrangeBackground3` `colorPaletteRedBackground3` |
| **Ant Design** | `token.remainingColor` ซึ่งอ้าง `token.colorFillSecondary` | `token.defaultColor` ซึ่งอ้าง `token.colorInfo` |
| **Salesforce Lightning** | `--slds-g-color-neutral-base-80` และวงแหวนใช้ `--slds-g-color-border-base-1` | สีจาก modifier |
| **GitHub Primer** | `--progressBar-track-bgColor` ตั้งต้น `#d1d9e0` | มาจาก `--progress-bg` ที่คนใช้กำหนด |
| **Chakra UI** | `--track-color` ซึ่งอ้าง `colors.colorPalette.muted` และ `bg.muted` | `colorPalette.solid` |
| **Mantine** | `--mantine-color-gray-2` ในโหมดสว่าง และ `dark-4` ในโหมดมืด | `theme.primaryColor` |
| **ของเรา** | **แถบใช้ `#D0D5DD` และวงกลมใช้ `#EAECF0` คนละค่ากัน** | `#1E58F2` ทั้งคู่ |

**แบบแผนที่ตลาดใช้ตรงกัน `[คำนวณ]` รางใช้ token ชั้น semantic ที่แปลว่า พื้นผิวเทาอ่อน หรือ เส้นขอบจาง ไม่ใช่สีเทาดิบจากบันไดสี และแถบใช้ token ที่แปลว่า สีหลักของแบรนด์ หรือ สีสื่อความหมาย** ไม่มีเจ้าไหนตั้งชื่อ token ว่า `progress-track` แยกออกมาต่างหาก ยกเว้น Primer ที่มี `--progressBar-track-bgColor`

**ตอบเรื่องข้อ 1.4.11 ตรง ๆ `[มาตรฐาน]` และ `[ตีความ]`**

**ข้อเท็จจริง ข้อ 1.4.11 ไม่ได้เอ่ยคำว่า progress เลยแม้แต่ครั้งเดียว** ตรวจด้วยการดึงหน้า [Understanding SC 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) มาค้นทั้งหน้า พบ 0 ครั้ง `[สำรวจ]`

**เกณฑ์มี 2 ข้อย่อย และต้องเลือกว่าแถบความคืบหน้าเข้าข้อไหน**

1. **User Interface Components** คือ "Visual information required to identify user interface components and states" โดยเอกสารขยายความว่าหมายถึง **ตัวควบคุม** ("user interface components (i.e., controls)") **แถบความคืบหน้าไม่ใช่ตัวควบคุม** เพราะมาตรฐาน ARIA ระบุเองว่า "It is not possible for the user to alter the value of a progressbar because it is always read-only" **ข้อย่อยนี้จึงไม่ใช่**
2. **Graphical Objects** คือ "Parts of graphics required to understand the content" โดยเอกสารขยายความว่า "Not every graphical object needs to contrast with its surroundings, only those that are required for a user to understand what the graphic is conveying" **ข้อย่อยนี้ใช่**

**แปลว่า `[ตีความ]` สิ่งที่ต้องผ่าน 3:1 คือเส้นแบ่งระหว่างส่วนที่เติมกับส่วนที่ยังไม่เติม เพราะนั่นคือสิ่งเดียวที่บอกว่าคืบไปแค่ไหน ส่วนขอบนอกของรางเทียบกับพื้นหน้าไม่ใช่ข้อมูลที่จำเป็น เพราะรู้ว่าแถบอยู่ตรงไหนก็ไม่ได้ช่วยให้รู้ค่า**

**ของเราผ่านทั้งคู่** แถบเทียบราง 3.82 ในทรงแถบ และ 4.76 ในทรงวงกลม `[คำนวณ]`

**ข้อยกเว้นที่มีคนถามในกลุ่มทางการของ W3C แต่ยังไม่มีคำตอบเป็นทางการ** มีกระทู้ในรายชื่ออีเมล w3c-wai-ig วันที่ 2026-03-27 ถามตรงประเด็นนี้ว่า "does the presence of the percentage and record count labels mean the track colour is exempt from the 3:1 contrast requirement under 1.4.11?" โดยอ้างความเข้าใจว่าภาพที่มีข้อความบอกค่าเดียวกันอยู่แล้วถือว่าซ้ำซ้อนจึงได้รับยกเว้น `[แหล่งรอง]` **กระทู้นี้ยังไม่มีข้อสรุปที่เป็นทางการ จึงยืนยันไม่ได้** และผู้วิจัยแนะนำว่าอย่าพึ่งข้อยกเว้นนี้ ให้ทำให้ผ่าน 3:1 ไปเลย `[ตีความ]`

**ประเด็นที่ควรแก้จริง ๆ ของเราไม่ใช่คอนทราสต์ แต่คือ** `[ตีความ]`

1. **รางของแถบกับรางของวงกลมใช้คนละสีในหน้าเดียวกัน** ซึ่งไม่มีเหตุผลรองรับ
2. **ตัวเติมมี stroke สีเดียวกับ fill** (ทั้งคู่ `#1E58F2`) ซึ่งเป็น stroke ที่ไม่ได้ทำอะไรเลยนอกจากเพิ่มสิ่งที่ต้องดูแล
3. **วงกลมมี fill ของ ELLIPSE ผูกไว้ด้วย** (`4652:21370` และ `4652:21353`) ทั้งที่รูปทรงเป็นวงแหวนที่ควรมีแต่ stroke

---
## 8. ฉ. การเข้าถึง

### 8.1 ใช้ `role="progressbar"` กับค่าทั้งสามยังไง และแบบไม่รู้ค่าต่างออกไปยังไง (คำถามข้อ 15)

**มาตรฐานพูดว่าอะไร `[มาตรฐาน]`** ข้อความจาก [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/) หัวข้อ `progressbar`

- นิยาม "An element that displays the progress status for tasks that take a long time"
- ค่าเริ่มต้นโดยปริยาย "If `aria-valuemin` is missing or not a number, it defaults to 0 (zero). If `aria-valuemax` is missing or not a number, it defaults to 100"
- **กฎสำคัญที่สุด** "The author SHOULD supply a value for `aria-valuenow` unless the value is indeterminate, in which case the author SHOULD omit the `aria-valuenow` attribute. Authors SHOULD update this value when the visual progress indicator is updated"
- กฎเรื่องพื้นที่ที่กำลังโหลด "If the progressbar is describing the loading progress of a particular region of a page, the author SHOULD use `aria-describedby` to point to the status, and set the `aria-busy` attribute to true on the region until it is finished loading"
- ข้อห้ามโดยธรรมชาติ "It is not possible for the user to alter the value of a progressbar because it is always read-only"
- หมายเหตุเรื่องการอ่านออกเสียง "Assistive technologies generally will render the value of `aria-valuenow` as a percent of a range between the value of `aria-valuemin` and `aria-valuemax`, unless `aria-valuetext` is specified"
- คุณสมบัติ **`Accessible Name Required: True`** และ **`Name From: author`** และ **`Children Presentational: True`**

**แต่ละเจ้าทำจริงยังไง** `[ทางการ]`

| เจ้า | `aria-valuemin` | `aria-valuemax` | `aria-valuenow` | เมื่อไม่รู้ค่า | ของแถม |
|---|---|---|---|---|---|
| **Material 3** | `0` เสมอ | `max` เสมอ | ตัดทิ้งเมื่อไม่รู้ค่า | ตัดแค่ `valuenow` | `aria-label` |
| **IBM Carbon** | ตัดทิ้งเมื่อไม่รู้ค่า | ตัดทิ้งเมื่อไม่รู้ค่า | ตัดทิ้งเมื่อไม่รู้ค่า | **ตัดทั้งสามค่า** | `aria-busy` `aria-invalid` `aria-labelledby` `aria-describedby` และ live region |
| **Adobe Spectrum (React Aria)** | `minValue` เสมอ | `maxValue` เสมอ | ตัดทิ้งเมื่อไม่รู้ค่า | ตัด `valuenow` และ `valuetext` | **`aria-valuetext`** ที่ผ่าน `Intl.NumberFormat` |
| **Atlassian** | `0` เสมอ | `1` เสมอ | **ใส่ `0` ตอนไม่รู้ค่า** | **ไม่ตัดอะไรเลย** | `aria-label` |
| **Ant Design** | `0` เสมอ | `100` เสมอ | ใส่เสมอ | ไม่มีแบบไม่รู้ค่า | ส่งผ่าน `aria-label` และ `aria-labelledby` |
| **GitHub Primer** | `0` | `100` | `ariaValueNow` | ไม่มีแบบไม่รู้ค่า | `aria-valuetext` `aria-label` |
| **Microsoft Fluent 2** | ตัดทิ้งเมื่อไม่รู้ค่า | ตัดทิ้งเมื่อไม่รู้ค่า | `undefined` เมื่อไม่รู้ค่า | **ตัดทั้งสามค่า** | `aria-labelledby` และ `aria-describedby` จาก `Field` |
| **Salesforce Lightning** | `0` | `100` | `{fill}` | ไม่มีแบบไม่รู้ค่า | เอกสารกำหนดให้ใส่ที่ `.slds-progress-ring__progress` |
| **Uber Base Web** | `null` เมื่อ `infinite` | `null` เมื่อ `infinite` | `null` เมื่อ `infinite` | **ตัดทั้งสามค่า** | `aria-live="polite"` และ `aria-busy` |
| **Untitled UI** | `min` | `max` | `value` | ไม่มีแบบไม่รู้ค่า | ไม่มี |
| **Radix** | `0` เสมอ | `max` เสมอ | `undefined` เมื่อไม่ใช่ตัวเลข | ตัด `valuenow` | `aria-valuetext` จาก `getValueLabel` และ `data-state` |
| **Mantine** | `0` | `100` | `value` | ไม่มีแบบไม่รู้ค่า | `aria-valuetext` เท่ากับ `` `${value}%` `` และ **ใส่ไว้ที่ `Progress.Section` แต่ละชิ้น ไม่ใช่ที่ราก** |
| **Chakra UI กับ Zag** | `min` | `max` | `undefined` เมื่อค่าเป็น null | ตัด `valuenow` | `aria-label` เท่ากับ `valueAsString` และ `aria-live="polite"` ที่ `valueText` และ `data-state` |

**นับผล `[คำนวณ]`**

- **`role="progressbar"` ใช้ตรงกัน 13 ใน 13 เจ้าที่มี component**
- **เจ้าที่ทำถูกตามมาตรฐานเรื่องตัด `aria-valuenow` ตอนไม่รู้ค่า 7 ใน 8** Material, Carbon, Spectrum, Fluent, Base Web, Radix, Chakra กับ Zag
- **เจ้าเดียวที่ทำผิดคือ Atlassian** เพราะ `const valueParsed = isIndeterminate ? MIN_VALUE : ...` คือใส่ `aria-valuenow="0"` ตอนไม่รู้ค่า ซึ่งโปรแกรมอ่านหน้าจอจะอ่านว่า "ศูนย์เปอร์เซ็นต์" ซึ่งเป็นข้อมูลผิด ไม่ใช่ข้อมูลว่างเปล่า
- **เจ้าที่ตัดทั้งสามค่า 3 เจ้า** Carbon, Fluent, Base Web **ซึ่งปลอดภัยกว่าการตัดแค่ `valuenow`** เพราะถ้าเหลือ `valuemin` กับ `valuemax` ไว้ โปรแกรมอ่านหน้าจอบางตัวจะยังพยายามคำนวณเปอร์เซ็นต์ `[ตีความ]`
- **เจ้าที่ใส่ `aria-valuetext` 5 เจ้า** Spectrum, Primer, Radix, Mantine, Chakra กับ Zag

**กับดักที่สำคัญที่สุดและไม่มีใครพูดถึง `[มาตรฐาน]` และ `[ตีความ]`** คุณสมบัติ **`Children Presentational: True`** แปลว่าเนื้อหาที่อยู่ข้างในกล่องที่มี `role="progressbar"` จะถูกตัดออกจาก accessibility tree ทั้งหมด **ถ้าเราวางตัวเลข `50%` ไว้ข้างในกล่อง progressbar โปรแกรมอ่านหน้าจอจะไม่อ่านตัวเลขนั้น** วิธีที่ถูกคือ

1. วางตัวเลขไว้ **ข้างนอก** กล่อง (วิธีของ Untitled UI ฝั่งโค้ด ที่ `role="progressbar"` อยู่ที่รางเท่านั้น ส่วน `<span>` ตัวเลขเป็นพี่น้องกัน)
2. หรือใส่ค่าเดียวกันไว้ใน `aria-valuetext` (วิธีของ Radix, Spectrum, Mantine)
3. **ของเราที่ทรงวงกลมวางตัวเลขไว้ตรงกลางวง** ซึ่งถ้าแปลงเป็นโค้ดตรง ๆ โดยครอบทั้งก้อนด้วย `role="progressbar"` จะเข้ากับดักข้อนี้ทันที `[ตีความ]`

### 8.2 ต้องมี `aria-label` หรือ `aria-labelledby` ไหม และถ้ามีป้ายที่มองเห็นแล้วควรทำยังไง (คำถามข้อ 16)

**มาตรฐานบังคับ** `Accessible Name Required: True` และ `Name From: author` แปลว่า **ชื่อต้องมาจากผู้เขียนเท่านั้น เอามาจากเนื้อหาข้างในไม่ได้** (ซึ่งสอดคล้องกับ `Children Presentational: True`) `[มาตรฐาน]`

**แบบแผนที่ตลาดใช้**

| กรณี | วิธีที่ตลาดใช้ | เจ้าที่ทำ |
|---|---|---|
| **มีป้ายที่มองเห็นอยู่แล้ว** | ใช้ `aria-labelledby` ชี้ไปที่ `id` ของป้ายนั้น **ไม่ใช่เขียน `aria-label` ซ้ำ** | **Carbon** (`"aria-labelledby": labelId`), **Polaris** (`ariaLabelledBy`), **Fluent** (ดึง `field.labelId` มาให้อัตโนมัติ), **Ant** (ส่งผ่าน `aria-labelledby`) |
| **ไม่มีป้ายที่มองเห็น** | ใช้ `aria-label` | **Material**, **Atlassian**, **Base Web**, **Primer** |
| **มีข้อความอธิบายเพิ่ม** | ใช้ `aria-describedby` | **Carbon** (`helperText`), **Fluent** (ต่อท้ายข้อความของ `Field`) |

**เจ้าที่ทำให้ชื่อเป็นของบังคับในระดับ API มีเจ้าเดียว คือ Carbon** โดยประกาศ `label: string` เป็น prop แบบไม่มี `?` และใน propTypes เป็น `PropTypes.Validator<string>` **คือลืมใส่ไม่ได้** `[ทางการ]` และยังมี `hideLabel?: boolean` ให้ซ่อนป้ายจากสายตาโดยที่โปรแกรมอ่านหน้าจอยังอ่านได้ ซึ่งเป็นรูปแบบที่ครอบคลุมที่สุดในเอกสารนี้ `[ตีความ]`

**ข้อควรระวังที่พบในไฟล์ต้นทาง `[ทางการ]`** Chakra กับ Zag ตั้ง `"aria-label": valueAsString` คือเอา **ค่า** มาเป็น **ชื่อ** ซึ่งทำให้โปรแกรมอ่านหน้าจออ่านว่า "50 เปอร์เซ็นต์ แถบความคืบหน้า 50 เปอร์เซ็นต์" คือได้ยินค่าซ้ำสองรอบ และไม่ได้ยินเลยว่ากำลังโหลดอะไรอยู่ **อย่าลอกแบบนี้** `[ตีความ]`

### 8.3 ประกาศความคืบหน้าให้โปรแกรมอ่านหน้าจอรู้ยังไงโดยไม่รบกวน (คำถามข้อ 17)

**มีเทคนิคทางการของ W3C ชื่อ ARIA25** `[มาตรฐาน]` หน้า [Understanding SC 4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) ระบุว่า แถบความคืบหน้าเข้านิยามของ status message เพราะนิยามครอบคลุม "on the progress of a process" และยกตัวอย่างตรง ๆ ว่า "An application displays a dynamic progress bar to indicate the status of an upgrade. The screen reader provides **intermittent** announcements of the progress"

**คำว่า intermittent คือคำตอบของคำถามนี้ คือประกาศเป็นช่วง ๆ ไม่ใช่ทุกครั้งที่ค่าเปลี่ยน** `[ตีความ]`

เทคนิคที่หน้านั้นชี้ไว้ภายใต้ Situation C มี 4 ตัว คือ ARIA23 (`role=log`) **ARIA25 (ใช้ live region กับแถบความคืบหน้า)** ARIA22 (`role=status`) และ ARIA27 (`ariaNotify`)

**แต่ [ARIA25](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA25) ไม่ได้บอกความถี่ไว้** `[สำรวจ]` ตัวอย่างในหน้านั้นมีแค่ `<div aria-live="polite" class="visually-hidden" id="progress-text">0% complete</div>` โดยไม่ระบุว่าควรอัปเดตทุกกี่เปอร์เซ็นต์

**เจ้าที่ทำ live region จริงมี 3 ใน 15** `[คำนวณ]`

| เจ้า | ทำยังไง |
|---|---|
| **IBM Carbon** | ใส่ `<div class="cds--visually-hidden" aria-live="polite">` ไว้ใต้ `helperText` และ **ประกาศแค่สองสถานะ คือ `"Loading"` กับ `"Done"`** ไม่ได้ประกาศตัวเลขเลย `[ทางการ]` |
| **Uber Base Web** | ใส่ `aria-live="polite"` ไว้ที่ **กล่องราก** ซึ่งมี `aria-label` เป็น `"X% Complete"` คือประกาศทุกครั้งที่ค่าเปลี่ยน `[ทางการ]` |
| **Chakra UI กับ Zag** | ใส่ `aria-live="polite"` ไว้ที่ slot `valueText` เท่านั้น `[ทางการ]` |

**ทางที่ดีที่สุดคือทางของ Carbon `[ตีความ]`** เพราะ

1. **ประกาศแค่ตอนเริ่มกับตอนจบ ไม่รบกวนระหว่างทาง** ซึ่งตรงกับคำว่า intermittent ในมาตรฐาน
2. **ค่าตัวเลขยังอ่านได้อยู่** ผ่าน `aria-valuenow` เมื่อผู้ใช้เลื่อนเคอร์เซอร์มาที่ตัว progressbar เอง ไม่ต้องยัดเข้า live region
3. **ทางของ Base Web อันตราย** เพราะใส่ `aria-live` ไว้ที่กล่องเดียวกับที่มี `aria-label` ที่เปลี่ยนทุกเปอร์เซ็นต์ แปลว่าการอัปโหลดหนึ่งครั้งอาจทำให้โปรแกรมอ่านหน้าจอพูดร้อยครั้ง

**ข้อแนะนำที่ประกอบจากหลายแหล่ง `[ตีความ]`**

- ประกาศตอนเริ่ม ("กำลังอัปโหลด") และตอนจบ ("อัปโหลดสำเร็จ" หรือข้อความผิดพลาด) เสมอ
- ถ้าจะประกาศระหว่างทาง ให้ประกาศเป็นช่วงห่าง ๆ เช่น ทุก 25 เปอร์เซ็นต์ หรือทุก 10 วินาที อย่างใดช้ากว่า **ไม่มีแหล่งทางการระบุตัวเลขนี้ไว้ ตัวเลขนี้เป็นข้อเสนอของผู้วิจัย**
- อย่าใส่ `aria-live` ไว้ที่กล่องเดียวกับ `role="progressbar"` เพราะค่าจะยิงซ้อนกัน
- ใช้ `aria-busy="true"` ที่พื้นที่ที่กำลังโหลดตามที่มาตรฐานแนะนำ และ Carbon กับ Base Web ทำจริง

### 8.4 โหมดลดการเคลื่อนไหวต้องทำอะไรกับแบบไม่รู้ค่า (คำถามข้อ 18)

**สแกนไฟล์ต้นทางทั้ง 18 แพ็กเกจแล้ว มีแค่ 2 เจ้าที่จัดการให้แถบความคืบหน้าโดยเฉพาะ** `[คำนวณ]`

| เจ้า | ทำยังไง | หลักฐาน |
|---|---|---|
| **Microsoft Fluent 2** | **เปลี่ยนจากการเลื่อนเป็นการจางเข้าจางออกแทน และขยายแถบเต็มราง** โดยในโหมดปกติแถบกว้าง 33 เปอร์เซ็นต์แล้วเลื่อน `translate` จาก `-100%` ไป `300%` ส่วนในโหมดลดการเคลื่อนไหวตั้ง `maxWidth: '100%'` แล้วเปลี่ยนเป็น `opacity` จาก `0.2` ไป `1` ไป `0.2` โดย **ยังใช้เวลา 3000 เท่าเดิม** | [`progressBarMotions.js`](https://unpkg.com/@fluentui/react-progress@9.5.6/lib/components/ProgressBar/progressBarMotions.js) และ `useProgressBarStyles.styles.raw.js` `[ทางการ]` |
| **GitHub Primer** | **ครอบ animation ทั้งก้อนด้วย `@media (prefers-reduced-motion: no-preference)`** คือในโหมดลดการเคลื่อนไหวจะไม่มี animation เลย | CSS โมดูล `ProgressBar` `[ทางการ]` |

**เจ้าอื่นที่พอเกี่ยวข้อง** `[คำนวณ]`

- **IBM Carbon** มี `prefers-reduced-motion: reduce` ที่ component `Loading` (ตัวหมุน) **แต่ไม่มีที่ `progress-bar`**
- **Ant Design** มีฟังก์ชันกลาง `genNoMotionStyle()` ที่ตั้ง `transition: 'none'` และ `animation: 'none'` ใต้ `prefers-reduced-motion: reduce` **แต่ไม่ได้ถูกเรียกในสไตล์ของ Progress**
- **Pinterest Gestalt** มี `prefers-reduced-motion` ใน CSS รวม แต่ไม่ได้ครอบตัวหมุน
- **Material 3, Spectrum, Polaris, Atlassian, SLDS, Base Web, Radix, Mantine, Chakra, Zag ไม่มีการจัดการเลย**

**แปลว่าตลาด 13 ใน 15 เจ้าปล่อยให้แถบแบบไม่รู้ค่าวิ่งตลอดแม้ผู้ใช้จะตั้งค่าลดการเคลื่อนไหว** `[คำนวณ]` **ซึ่งผู้วิจัยถือว่าเป็นช่องว่างของตลาด ไม่ใช่ข้อสรุปว่าไม่ต้องทำ** `[ตีความ]` และ **ทางของ Fluent คือทางที่ควรลอก** เพราะยังสื่อว่าระบบกำลังทำงานอยู่ ต่างจากทางของ Primer ที่ตัด animation ทิ้งไปเลยจนแถบดูค้าง

### 8.5 แบบไม่รู้ค่าที่วิ่งไม่หยุด ขัดกับข้อ 2.2.2 หรือไม่ (คำถามข้อ 19)

**คำตอบคือไม่ขัด และมาตรฐานเขียนข้อยกเว้นไว้ตรง ๆ** `[มาตรฐาน]`

ข้อ [2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) กำหนดว่าของที่เคลื่อนไหวต้องมีทางหยุดเมื่อครบสามเงื่อนไข คือ "(1) starts automatically, (2) lasts more than five seconds, and (3) is presented in parallel with other content" **เว้นแต่ว่า "the movement, blinking, or scrolling is part of an activity where it is essential"**

และ **Note 4 ของข้อนี้พูดถึงกรณีนี้โดยตรง**

> "An animation that occurs as part of a preload phase or similar situation can be considered essential if interaction cannot occur during that phase for all users and if not indicating progress could confuse users or cause them to think that content was frozen or broken."

**แปลว่า `[ตีความ]` แถบแบบไม่รู้ค่าได้รับยกเว้นเมื่อครบ 2 เงื่อนไข**

1. **ช่วงที่มันวิ่ง ผู้ใช้ทำอะไรกับหน้านั้นไม่ได้อยู่แล้ว** ถ้าหน้ายังใช้งานได้ตามปกติระหว่างที่แถบวิ่ง ข้อยกเว้นนี้ใช้ไม่ได้
2. **ถ้าไม่มีมัน ผู้ใช้จะนึกว่าระบบค้าง**

**กรณีที่ตกข้อนี้แน่ ๆ `[ตีความ]`** แถบแบบไม่รู้ค่าที่วางอยู่มุมหนึ่งของหน้าแล้วหน้าที่เหลือยังใช้งานได้ปกติ เช่น การอัปโหลดไฟล์ในพื้นหลังขณะที่คนยังพิมพ์บทความได้ **กรณีแบบนี้เข้าทั้งสามเงื่อนไขของข้อ 2.2.2 และไม่เข้าข้อยกเว้น Note 4 เพราะยังโต้ตอบได้** ทางออกคือเปลี่ยนเป็นแบบรู้ค่า หรือมีปุ่มยกเลิก

**ส่วนข้อ 2.3.3 Animation from Interactions เป็นคนละข้อ** และใช้กับการเคลื่อนไหวที่เกิดจากการกระทำของผู้ใช้โดยตรง เอกสารแยกไว้ชัดว่า "2.2.2 Pause, Stop, Hide applies when the web page initiates animation automatically that is not in response to an intentional user activation" `[มาตรฐาน]` **ข้อ 2.3.3 จึงเป็นข้อที่ใช้กับแถบบอกความคืบหน้าการอ่านบทความที่เลื่อนตามการ scroll ไม่ใช่ข้อ 2.2.2** `[ตีความ]`

---

## 9. ช. การเคลื่อนไหว

**แบบไม่รู้ค่า** `[ทางการ]`

| เจ้า | ทรง | เวลา (มิลลิวินาที) | เส้นโค้ง | รูปแบบ |
|---|---|---|---|---|
| **Chakra UI** | แถบ | **1000** | `ease` | แถบกว้างอย่างน้อย 50 เปอร์เซ็นต์ เลื่อนจาก `-40%` ไป `100%` |
| **GitHub Primer** | แถบ | **1000** | ไม่ระบุ | แสงวิ่งผ่าน mask `mask-position` จาก `200%` ไป `0` |
| **IBM Carbon** | แถบ | **1400** | `linear` | แถบกว้าง 25 เปอร์เซ็นต์ เลื่อนจาก `translateX(-100%)` ไป `translateX(420%)` และหยุดนิ่งช่วง 80 ถึง 100 เปอร์เซ็นต์ของรอบ |
| **Uber Base Web** | แถบแบบแบ่งช่วง | **1500** | `linearCurve` | สองแถบวิ่งพร้อมกัน |
| **Chakra UI** | วงกลม | **1500** | `linear` | `circular-progress` บวกการหมุน `spin 2s` ซ้อนอีกชั้น |
| **Material 3 (Compose)** | แถบ | **1750** | `EasingEmphasizedAccelerate` | สองเส้นวิ่ง หัวเส้นแรก 1000 หางเส้นแรก 1000 หัวเส้นสอง 850 หางเส้นสอง 850 |
| **Material 3 (เว็บ)** | แถบ | **2000** | cubic-bezier หลายตัว | สองแถบ และโหมดสี่สีใช้ 4000 |
| **Adobe Spectrum** | แถบ | **2000** | `ease-in-out` | แถบกว้าง 70 เปอร์เซ็นต์ (`--spectrum-progressbar-fill-size-indeterminate: 70%`) |
| **Atlassian** | แถบ | **2000** | ไม่ระบุ | **สองแถบ โดยแถบที่สองหน่วง 500** จากนั้นแถบแรกวิ่งจาก `left:-5% width:5%` ไป `left:130% width:100%` |
| **Uber Base Web** | แถบ | **2100** | `linearCurve` | แถบเดียว |
| **Microsoft Fluent 2** | แถบ | **3000** | `curveLinear` | แถบกว้างไม่เกิน 33 เปอร์เซ็นต์ เลื่อน `translate` จาก `-100%` ไป `300%` |
| **Material 3 (เว็บ)** | วงกลม | **1568.24 หมุนรอบ และ 5332 ต่อรอบใหญ่** | `cubic-bezier(0.4, 0, 0.2, 1)` | หมุนซ้อนสองชั้น และส่วนโค้งยืดหด 1333 |
| **Material 3 (Compose)** | วงกลม | **6000** | `EasingStandard` | หมุนเพิ่ม 300 ต่อช่วง |
| **Pinterest Gestalt** | ตัวหมุน | **1200** | `linear` | และ **หน่วง 300 ก่อนเริ่มแสดง** ตั้งต้นเป็นเปิด |

**สถิติแบบไม่รู้ค่าของทรงแถบ `[คำนวณ]`** ค่าที่พบคือ 1000, 1000, 1400, 1500, 1750, 2000, 2000, 2000, 2100, 3000 **มัธยฐาน 1875 ปัดเป็นช่วงที่ตลาดใช้จริงคือราว 2000** ช่วงทั้งหมด 1000 ถึง 3000

**ทรงวงกลมใช้เวลานานกว่าแถบเสมอ** `[คำนวณ]` Material 5332 ถึง 6000 และ Chakra 1500 บวกการหมุน 2000 ซ้อนกัน

**แบบรู้ค่า ตอนค่าขยับ** `[ทางการ]`

| เจ้า | เวลา (มิลลิวินาที) | เส้นโค้ง | สิ่งที่เปลี่ยน |
|---|---|---|---|
| **Mantine** | **0** (ค่าเริ่มต้น) | ไม่มี | `transitionDuration` ตั้งต้นเป็น 0 ทั้ง `RingProgress` และ `SemiCircleProgress` |
| **Untitled UI** | **75** | `linear` | `transition duration-75 ease-linear` บน `transform: translateX` |
| **IBM Carbon** | **110** (`$duration-fast-02`) | `cubic-bezier(0.5, 0, 0.1, 1)` | `inline-size` ในรุ่น v12 และ `transform: scaleX` ในรุ่นก่อนหน้า |
| **Atlassian** | **200** | ไม่ระบุ | `transition: width .2s` |
| **Microsoft Fluent 2** | **300** | `ease` | `width` และ **ไม่ใส่ transition เมื่อค่าใกล้ 0** (`ZERO_THRESHOLD = 0.01`) เพื่อกันการเด้งตอนรีเซ็ต |
| **Chakra UI** | **300** (`slow`) | ไม่ระบุ | `width, height` และวงกลมใช้ 600 บน `stroke-dashoffset, stroke-dasharray` |
| **Shopify Polaris** | **500** (`motion-duration-500`) เมื่อ `animated` และ **0** เมื่อไม่ | ไม่ระบุ | ความกว้างตอนปรากฏครั้งแรก |

**สถิติแบบรู้ค่า `[คำนวณ]`** ค่าที่ไม่เป็นศูนย์คือ 75, 110, 200, 300, 300, 500 **มัธยฐาน 250** ช่วง 75 ถึง 500

**รายละเอียดที่สำคัญกว่าตัวเลข 3 ข้อ `[ตีความ]`**

1. **Untitled UI ใช้ `transform: translateX` แทน `width`** พร้อมคอมเมนต์ในโค้ดว่า "Use transform instead of width to avoid layout thrashing (and for smoother animation)" ซึ่งเป็นเหตุผลเชิงประสิทธิภาพที่ควรเขียนลงเอกสาร
2. **Fluent ตัด transition ทิ้งเมื่อค่าใกล้ศูนย์** เพื่อกันไม่ให้แถบวิ่งถอยยาวตอนเริ่มรอบใหม่ ซึ่งเป็นรายละเอียดที่คนมักลืม
3. **Carbon ใช้เส้นโค้งที่เร่งแรงตอนต้นแล้วค่อยช้าลง** (`cubic-bezier(0.5, 0, 0.1, 1)`) ซึ่งทำให้ค่าที่ขยับทีละน้อยยังเห็นชัด

---
## 10. ซ. บริบทข่าว

### 10.1 สำรวจเว็บในเครือ 6 เว็บและเว็บข่าวต่างประเทศ 5 เว็บ `[สำรวจ]`

ดึง HTML ตั้งต้นของทั้งหน้าแรกและหน้าบทความวันที่ 2026-10-08 แล้วนับคำสำคัญ

| เว็บ | หน้า | `role="progressbar"` | `nprogress` | `skeleton` | `spinner` |
|---|---|---|---|---|---|
| bangkokbiznews.com | หน้าแรก และบทความ | **0** | 0 | 0 | 0 |
| www.nationtv.tv | หน้าแรก | **0** | 0 | 8 | 0 |
| www.nationtv.tv | บทความ | **0** | 0 | 34 | 0 |
| www.komchadluek.net | หน้าแรก | **0** | 0 | 104 | 0 |
| www.komchadluek.net | บทความ | **0** | 0 | 125 | 0 |
| www.thansettakij.com | หน้าแรก | **0** | 0 | 28 | 0 |
| www.thansettakij.com | บทความ | **0** | 0 | 0 | 0 |
| www.springnews.co.th | หน้าแรก | **0** | **14** | 0 | 7 |
| www.springnews.co.th | บทความ | **0** | **14** | 0 | 7 |
| www.posttoday.com | หน้าแรก | **0** | 0 | 0 | 0 |
| www.posttoday.com | บทความ | **0** | 0 | 15 | 0 |
| www.bbc.com | หน้าแรก | **0** | 0 | 0 | 0 |
| www.theguardian.com | หน้าแรก | **0** | 0 | 0 | 0 |
| www.theverge.com | หน้าหมวด | **0** | 0 | 0 | 0 |
| www.wired.com | บทความ | **0** | 0 | 1 | 8 |
| www.nytimes.com | หน้าแรก | ดึงไม่ได้ (HTTP 403) | | | |

**ข้อจำกัดที่ต้องบอกไว้ก่อน `[ตีความ]`** ตัวเลขนี้นับจาก HTML ตั้งต้นเท่านั้น ของที่ JavaScript สร้างทีหลังจะนับไม่ได้ **แถบบอกความคืบหน้าการอ่านบทความเกือบทุกเจ้าถูกสร้างด้วย JavaScript ตอนเลื่อนหน้า** ตัวเลข 0 จึงแปลว่า "ไม่พบในโครงเริ่มต้น" ไม่ได้พิสูจน์ว่าไม่มีจริง

### 10.2 ของจริงที่พบในเว็บเรา `[สำรวจ]`

**springnews.co.th ใช้ NProgress** ซึ่งเป็นไลบรารีแถบบอกความคืบหน้าของการเปลี่ยนหน้าใน Next.js โดยฝัง CSS ไว้ในหน้าตรง ๆ ค่าที่อ่านได้คือ

- แถบอยู่ขอบบนสุดของจอ `top: 0; left: 0; width: 100%;` **สูง 3 พิกเซล**
- สีคือ `background: var(--primary-color)` คือใช้สีหลักของแบรนด์
- หางแสง `#nprogress .peg` ใช้ `transform: rotate(3deg) translate(0px, -4px)`
- มีตัวหมุนคู่กันที่ `top: 15px; right: 15px` **ขนาด 18 คูณ 18 หมุนรอบละ 400 มิลลิวินาที** แบบ `linear infinite`
- `z-index: 1031`

**อีก 4 เว็บในเครือใช้โครงร่างรอโหลดแทน** nationtv, komchadluek, thansettakij, posttoday โดย komchadluek ใช้หนักที่สุด (125 จุดในหน้าบทความ) **และ bangkokbiznews ไม่ใช้อะไรเลยทั้งสองแบบ**

**ไม่มีเว็บไหนในเครือมีแถบบอกความคืบหน้าการอ่านบทความ** และ **ไม่มีเว็บไหนในเครือใช้ `role="progressbar"` หรือ `aria-busy` เลยแม้แต่จุดเดียว** `[สำรวจ]`

### 10.3 เว็บข่าวต่างประเทศใช้แถบความคืบหน้าทำอะไร `[สำรวจ]`

ค้นชื่อตัวแปร CSS และชื่อคลาสในหน้าแรกของแต่ละเว็บ

| เว็บ | ที่พบ | จำนวน | ใช้ทำอะไร `[ตีความ]` |
|---|---|---|---|
| **The Guardian** | `--video-progress-bar-value`, `--video-progress-bar-background`, `--video-progress-bar-interactive-value`, `--video-progress-bar-interactive-background` | 24 ครั้งต่อตัว | **ตัวเล่นวิดีโอ** และมีชุด interactive แยก คือมีสีตอนลากเปลี่ยนเวลา |
| **The Guardian** | `--audio-atom-progress-bar` | 24 | **ตัวเล่นเสียง** |
| **The Guardian** | `--stacked-progress-to-win`, `--stacked-progress-background`, `--stacked-progress-excluded-background` | 24 ครั้งต่อตัว | **แถบซ้อนหลายค่าสำหรับผลเลือกตั้ง** โดยมีค่าพิเศษชื่อ to-win คือเส้นเกณฑ์ที่ต้องถึงจึงชนะ และ excluded คือส่วนที่ไม่นับ |
| **BBC** | `radio-page-progress-bar` | 1 | **ตัวเล่นวิทยุ** และปรากฏเป็นสวิตช์เปิดปิดที่ตั้งค่า `false` |

**ข้อสรุปของบริบทข่าว `[ตีความ]`**

**แถบความคืบหน้าในเว็บข่าวมี 4 งานจริง ๆ และไม่มีงานไหนเป็นเรื่องการโหลดเนื้อหา**

1. **ตัวเล่นสื่อ** วิดีโอ เสียง วิทยุ ซึ่งต้องกดลากได้ **แปลว่าของชิ้นนั้นไม่ใช่ progress bar แต่เป็น slider** ตามมาตรฐานที่ว่า progressbar "is always read-only" **และเราทำหน้า slider ไว้แล้ว**
2. **ผลคะแนนและข้อมูลในเนื้อข่าว** ซึ่งเป็นแถบซ้อนหลายค่าแบบที่ Guardian ทำ **และตามมาตรฐาน ARIA ของแบบนี้ควรเป็น `meter` ไม่ใช่ `progressbar`** เพราะ APG เขียนไว้ว่า "The meter should not be used to indicate progress, such as loading or percent completion of a task"
3. **แถบบอกความคืบหน้าของการเปลี่ยนหน้า** แบบที่ springnews ใช้ NProgress อยู่แล้ว ซึ่งเป็นแบบไม่รู้ค่าโดยธรรมชาติ
4. **แถบตอนอัปโหลดในระบบหลังบ้าน** ซึ่งเป็นที่ที่แถบแบบรู้ค่ามีประโยชน์จริงที่สุด แต่ **ผู้วิจัยไม่ได้เข้าไปดูหลังบ้านของเรา จึงยืนยันไม่ได้ว่ามีกี่จุด**

### 10.4 แถบบอกความคืบหน้าการอ่านบทความ ควรทำไหม `[แหล่งรอง]` และ `[ตีความ]`

**หลักฐานที่หาได้**

- **Digiday รายงานเมื่อ 2015-08-10** ว่าเจ้าที่ใส่คือ Bloomberg (ใส่ตอนปรับโฉมเดือนมกราคมปีนั้น ใช้กับบทความเกือบทั้งหมดทั้งข่าวสั้นและข่าวยาว ทั้งเดสก์ท็อปและมือถือ) และ The Daily Beast ส่วน **The New Republic ใส่ในการปรับโฉมปี 2013 แล้วถอดออกทีหลัง**
- **เสียงคัดค้านในบทความเดียวกัน** Kevin Kearney ว่า "It's a neat feature, but it doesn't make sense on blog posts or most digital content. Unless you use it for long-form stories, it just winds up being distracting" และ Dan Maccarone เรียกว่า "gimmicky" และ "distracting"
- **เสียงสนับสนุน** Michael Shane จาก Bloomberg ว่า "The progress bar exists because we think that subtle hints that give users more context and control over how they experience our stories are a good thing"
- **ไม่มีตัวเลขการใช้งานจริงในบทความนั้นเลย** และผู้วิจัยหางานวิจัยที่วัดผลกับเว็บข่าวโดยเฉพาะไม่เจอ

**ประเด็นเทคนิค 3 ข้อถ้าจะทำ `[ตีความ]`**

1. **ไม่ควรใส่ `role="progressbar"`** เพราะมาตรฐานนิยาม `progressbar` ว่าใช้กับ "tasks that take a long time" ซึ่งหมายถึงงานที่ **ระบบ** ทำ ไม่ใช่ตำแหน่งที่คนอ่านอยู่ และ `meter` ก็ไม่ใช่เพราะ APG บอกว่า meter ใช้กับ "a measurement within a known range" ที่มีความหมายในตัว **ทางที่ถูกคือใส่ `aria-hidden="true"` เพราะมันซ้ำกับแถบเลื่อนของเบราว์เซอร์ที่มีอยู่แล้ว**
2. **เข้าข้อ 2.3.3 ไม่ใช่ข้อ 2.2.2** เพราะเป็นการเคลื่อนไหวที่เกิดจากการกระทำของผู้ใช้ (เลื่อนหน้า) ไม่ใช่ที่หน้าเริ่มเอง แปลว่าต้องปิดได้เมื่อผู้ใช้ตั้งค่าลดการเคลื่อนไหว แต่ **ถ้าทำด้วย CSS ล้วน ๆ โดยไม่มี transition การเคลื่อนไหวจะผูกกับนิ้วโดยตรงจึงไม่เข้าข่าย**
3. **ทำด้วย CSS อย่างเดียวได้แล้วแต่ยังใช้ไม่ได้ทุกเบราว์เซอร์** ฟังก์ชัน [`scroll()`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline/scroll) ของ `animation-timeline` ทำแถบนี้ได้โดยไม่ต้องเขียน JavaScript เลย แต่ MDN ระบุสถานะว่า "Limited availability - This feature is not Baseline because it does not work in some of the most widely-used browsers" `[แหล่งรอง]`

**ข้อเสนอของผู้วิจัยสำหรับข้อนี้ `[ตีความ]`** แถบบอกความคืบหน้าการอ่าน **ไม่ควรเป็น component ของ Design System** เพราะมันไม่มีสถานะ ไม่มีขนาด ไม่มีป้าย ไม่มีการเข้าถึง และโผล่ที่เดียวในเทมเพลตบทความ **มันคือสไตล์ของเทมเพลตหน้าบทความ ไม่ใช่ชิ้นส่วนที่เอาไปใช้ซ้ำ** ถ้าอยากทำ ให้ทำเป็น pattern ในเอกสารแทน

---

## 11. ตารางเทียบรวม 15 เจ้า

### 11.1 ชนิด ทรง และขนาด

| เจ้า | รู้ค่า | ไม่รู้ค่า | กลไก | แถบ | วงกลม | ครึ่งวงกลม | ขั้นขนาดแถบ | ความหนาเริ่มต้น |
|---|---|---|---|---|---|---|---|---|
| **Material 3** | มี | มี | `indeterminate` | มี | มี | ไม่มี | **0** | 4 |
| **IBM Carbon** | มี | มี | ไม่ส่งค่า | มี | ไม่มี | ไม่มี | 2 | 8 |
| **Shopify Polaris** | มี | ไม่มี | | มี | ไม่มี | ไม่มี | 3 | 16 |
| **Adobe Spectrum** | มี | มี | `isIndeterminate` | มี | มี | ไม่มี | 4 | 6 |
| **Atlassian** | มี | มี | `isIndeterminate` | มี | ไม่มี | ไม่มี | **0** | 6 |
| **Ant Design** | มี | ไม่มี | | มี | มี | **มี** | 2 | 8 |
| **GitHub Primer** | มี | ไม่มี | | มี | ไม่มี | ไม่มี | 3 | 8 |
| **Microsoft Fluent 2** | มี | มี | ไม่ส่งค่า | มี | ไม่มี | ไม่มี | 2 | 2 |
| **Salesforce Lightning** | มี | ไม่มี | | มี | มี | ไม่มี | 4 | 8 |
| **Uber Base Web** | มี | มี | `infinite` | มี | ไม่มี | ไม่มี | 3 | 4 |
| **Pinterest Gestalt** | ไม่มี | ไม่มี | | ไม่มี | ไม่มี | ไม่มี | | |
| **Untitled UI** | มี | ไม่มี | | มี | มี | **มี** | **0** | 8 |
| **Radix** | มี | มี | ค่าเป็น null | มี | ไม่มี | ไม่มี | **0** | ไม่กำหนด |
| **Mantine** | มี | ไม่มี | | มี | มี | **มี** | 5 | 8 |
| **Chakra UI กับ Zag** | มี | มี | ค่าเป็น null | มี | มี | ไม่มี | 5 | 10 |
| **ของเรา** | มี | **ไม่มี** | | มี | มี | **มี** | **0** | 6 |

### 11.2 ป้าย สถานะ และการเข้าถึง

| เจ้า | ตำแหน่งป้าย | แกนสถานะ | ตัด `valuenow` ตอนไม่รู้ค่า | `aria-valuetext` | live region | ลดการเคลื่อนไหว | ไม่รู้ค่า (ms) | รู้ค่า (ms) |
|---|---|---|---|---|---|---|---|---|
| **Material 3** | 0 | ไม่มี | ใช่ | ไม่มี | ไม่มี | ไม่มี | 2000 | ไม่กำหนด |
| **IBM Carbon** | 3 | 3 | **ใช่ ตัดทั้งสามค่า** | ไม่มี | **มี** | ไม่มี (มีที่ Loading) | 1400 | 110 |
| **Shopify Polaris** | 0 | 4 | | ไม่มี | ไม่มี | ไม่มี | | 500 หรือ 0 |
| **Adobe Spectrum** | 2 | ไม่มี | ใช่ | **มี** | ไม่มี | ไม่มี | 2000 | ไม่กำหนด |
| **Atlassian** | 0 | 3 | **ไม่ ใส่ 0** | ไม่มี | ไม่มี | ไม่มี | 2000 | 200 |
| **Ant Design** | **6 คอมโบ** | 4 | | ไม่มี | ไม่มี | มีฟังก์ชันกลางแต่ไม่ได้เรียก | | |
| **GitHub Primer** | 0 | ไม่มี | | **มี** | ไม่มี | **มี** | 1000 | |
| **Microsoft Fluent 2** | 0 | 4 | **ใช่ ตัดทั้งสามค่า** | ไม่มี | ไม่มี | **มี** | 3000 | 300 |
| **Salesforce Lightning** | 0 | 4 (วงแหวน) | | ไม่มี | ไม่มี | ไม่มี | | |
| **Uber Base Web** | 1 | 5 | **ใช่ ตัดทั้งสามค่า** | ไม่มี | **มี** | ไม่มี | 2100 | |
| **Pinterest Gestalt** | | | | | | ไม่มี | 1200 (ตัวหมุน) | |
| **Untitled UI** | **5** | ไม่มี | | ไม่มี | ไม่มี | ไม่มี | | 75 |
| **Radix** | 0 | ไม่มี | ใช่ | **มี** | ไม่มี | ไม่มี | | |
| **Mantine** | 1 | ไม่มี (สีอิสระ) | | **มี** | ไม่มี | ไม่มี | | **0** |
| **Chakra UI กับ Zag** | ประกอบเอง | ไม่มี (สีอิสระ) | ใช่ | ไม่มี | **มี** | ไม่มี | 1000 | 300 |
| **ของเรา** | **5** | ไม่มี | ยังไม่มีโค้ด | ยังไม่มีโค้ด | ยังไม่มีโค้ด | ยังไม่มีโค้ด | ยังไม่มี | ยังไม่มี |

---

## 12. จุดที่เจ้าต่าง ๆ เห็นไม่ตรงกัน

| เรื่อง | ฝั่งหนึ่ง | ฝั่งตรงข้าม | ใครน่าเชื่อกว่าและทำไม `[ตีความ]` |
|---|---|---|---|
| **ขอบล่างของตัวหมุน** | Fluent บอก 1 วินาที | Carbon บอก 3 วินาที | **Fluent น่าเชื่อกว่า** เพราะอิงกับเกณฑ์ 1 วินาทีของ Nielsen ที่เป็นขอบของ "ความคิดไม่ขาดตอน" ส่วน 3 วินาทีของ Carbon เป็นตัวเลขที่ไม่มีที่มาอธิบายไว้ |
| **ขอบที่เปลี่ยนจากตัวหมุนเป็นแถบ** | Fluent บอก 3 วินาที | Carbon บอก 5 วินาที | **ไม่มีใครผิด เลือกตัวใดตัวหนึ่งแล้วใช้ให้ตรงกันทั้งระบบสำคัญกว่า** และช่วงที่ทั้งคู่เห็นตรงกันคือเกิน 5 วินาทีต้องเป็นแถบแน่นอน |
| **แบบไม่รู้ค่าควรมีหรือไม่** | 8 เจ้ามี | 6 เจ้าไม่มี แล้วผลักไปตัวหมุน | **ฝั่งไม่มีแข็งแรงกว่าที่คิด** เพราะแถบที่วิ่งไปมาโดยไม่บอกอะไรเลยให้ข้อมูลเท่ากับตัวหมุน แต่กินพื้นที่มากกว่า และ Fluent เขียนเองว่า "indeterminate progress bars don't provide any reassurance that things are still working, so only use them for short tasks" |
| **กลไกแบบไม่รู้ค่า สวิตช์หรือไม่ส่งค่า** | สวิตช์ 4 เจ้า | ไม่ส่งค่า 4 เจ้า | **ไม่ส่งค่าดีกว่าในโค้ด แต่ในไฟล์ออกแบบใช้ไม่ได้** เพราะ Figma ไม่มีแนวคิดนี้ ฝั่ง Figma ต้องเป็นสวิตช์เสมอ |
| **จำนวนขั้นของแกนขนาด** | 0 ขั้น 4 เจ้า | 5 ขั้น 2 เจ้า | **ขึ้นกับว่าใช้ที่ไหน** 0 ขั้นเหมาะกับระบบที่แถบโผล่ที่เดียวคือตอนโหลดหน้า ส่วน 5 ขั้นเหมาะกับระบบที่เอาแถบไปใช้ทั้งในการ์ด ในตาราง และในหน้าเต็ม **แต่ไม่มีใครใช้ 6 ขั้น** |
| **ความหนาแถบ** | Fluent 2 และ Material 4 | Polaris 16 และ Chakra 10 | **ช่วง 4 ถึง 8 น่าเชื่อที่สุด** เพราะเป็นช่วงที่ 9 ใน 14 เจ้าอยู่ ส่วน 2 ของ Fluent บางจนเสี่ยงตกเกณฑ์คอนทราสต์ตามหมายเหตุของข้อ 1.4.11 ที่เตือนเรื่องเส้นบาง และ 16 ของ Polaris เป็นค่าที่มาจากฐาน `1rem` มากกว่าจะมาจากการออกแบบ |
| **ทรงวงกลมเริ่มที่ 12 นาฬิกาหรือที่อื่น** | Material `startAngle = 270f`, Mantine `startAngle` ตั้งต้น 270, Untitled UI `-rotate-90` | **ไม่มีใครเริ่มที่อื่น** | **12 นาฬิกาตามเข็ม คือฉันทามติ 3 ใน 3 เจ้าที่ประกาศค่าไว้** และ Mantine เขียนไว้ชัดว่า "0 = right, 90 = bottom, 180 = left, 270 = top" คือมุมเพิ่มตามเข็ม **ของเราทวนเข็ม ซึ่งไม่มีใครทำ** |
| **ตัวเลขอยู่ในหรืออยู่นอก** | Ant มี `inner`, Mantine วางใน section, ของเราวางกลางวง | Carbon ห้ามตรง ๆ "Avoid embedding text inside the indicator or track", 7 เจ้าไม่มีตัวเลขในตัว component เลย | **ฝั่งห้ามแข็งแรงกว่า** ด้วยเหตุผลสองชั้น คือ มาตรฐานตัดเนื้อหาข้างในทิ้งจาก accessibility tree และ ตัวเลขบนแถบที่เลื่อนไปมาจะทับกับสีที่เปลี่ยน ทำให้คุมคอนทราสต์ไม่ได้ **ยกเว้นทรงวงกลมที่ตัวเลขอยู่ในรูที่ว่างอยู่แล้ว ซึ่งไม่มีปัญหาเรื่องคอนทราสต์** |
| **ประกาศทุกครั้งที่ค่าเปลี่ยนหรือเฉพาะหัวท้าย** | Base Web ประกาศทุกครั้ง | Carbon ประกาศแค่ `"Loading"` กับ `"Done"` | **Carbon ถูกกว่า** เพราะมาตรฐานใช้คำว่า intermittent และการประกาศทุกเปอร์เซ็นต์ทำให้โปรแกรมอ่านหน้าจอพูดเป็นร้อยครั้งต่อการอัปโหลดหนึ่งครั้ง |
| **ค่าเปอร์เซ็นต์ควรเป็นแกนของชุดใน Figma** | Untitled UI ทำ 11 ค่า | ทุกเจ้าที่เหลือไม่ทำ และ Untitled UI เองก็ไม่ทำกับวงกลม | **ฝั่งไม่ทำถูกต้องกว่า** เหตุผลเดียวของ Untitled UI คือเอาไปต่อกันใน prototype ซึ่งเป็นงานคนละชนิดกับการส่งมอบ component |

---

## 13. สิ่งที่ยืนยันไม่ได้ในรอบนี้

| เรื่อง | ทำไม |
|---|---|
| **จำนวนค่าเปอร์เซ็นต์ที่วาดไว้ในไฟล์ออกแบบของ Material, Carbon, Spectrum, Fluent, Polaris** | ไฟล์ Figma kit ของเจ้าเหล่านี้ต้องเปิดจาก Figma Community โดยตรง ผู้วิจัยเข้าไม่ได้ **หาไม่เจอ** ยืนยันได้แค่ของ Untitled UI (11 ค่าในแถบ และไม่มีแกนในวงกลม) และของ SLDS (5 ค่าในหน้าเอกสาร ไม่ใช่ในชุด component) |
| **ชื่อ variable จริงในไฟล์ Figma ของเรา** | REST endpoint `/variables/local` เป็นของแพลน Enterprise เท่านั้น และ MCP `get_variable_defs` คืนว่าไม่มีสิทธิ์แก้ไฟล์ จึงอ่านได้แค่ id กับค่าที่ resolve แล้ว **ค่าที่รายงานไว้ในเอกสารนี้เป็นค่า resolve จริงจาก REST ไม่ใช่การเดา** |
| **เนื้อหาหน้า guidelines ของ Material 3** | หน้า [m3.material.io/components/progress-indicators/guidelines](https://m3.material.io/components/progress-indicators/guidelines) คืน 200 แต่เนื้อหาสร้างด้วยสคริปต์ ดึงข้อความไม่ได้ **ตัวเลขของ Material ในเอกสารนี้จึงมาจากไฟล์ token และไฟล์ source code ทั้งหมด ไม่ได้มาจากหน้านี้** |
| **ความถี่ที่ควรประกาศความคืบหน้าให้โปรแกรมอ่านหน้าจอ** | ARIA25 ไม่ได้ระบุ และไม่มีเจ้าไหนเขียนตัวเลขไว้ **ข้อเสนอ "ทุก 25 เปอร์เซ็นต์หรือทุก 10 วินาที" เป็นของผู้วิจัยเอง ไม่ใช่มาตรฐาน** |
| **สถานะทางการของข้อยกเว้น 1.4.11 เมื่อมีข้อความบอกค่าซ้ำ** | มีคนถามในรายชื่ออีเมลของ W3C เมื่อ 2026-03-27 แต่ยังไม่มีคำตอบที่เป็นทางการ |
| **ว่าหลังบ้านของเรามีจุดที่ต้องใช้แถบความคืบหน้ากี่จุด** | ผู้วิจัยไม่ได้เข้าถึงระบบหลังบ้าน (CMS) ของ Nation **ข้อเสนอเรื่องขอบเขตการใช้งานจึงต้องให้คนในทีมยืนยัน** |
| **ว่าเว็บข่าวไทยเจ้าอื่นใช้แถบบอกความคืบหน้าการอ่านหรือไม่** | สำรวจแค่เว็บในเครือ 6 เว็บกับต่างประเทศ 5 เว็บ และนับจาก HTML ตั้งต้นเท่านั้น **ไม่ได้สำรวจ Sanook, Matichon, Workpoint, Khaosod ในรอบนี้** |

---
## 14. ข้อเสนอสำหรับ Nation DS

> ทุกข้อมีเสียงข้างมากของตลาดกำกับ และแยกเป็น 2 ฝั่งชัดเจนในหัวข้อ 14.3 กับ 14.4

### 14.1 คำตอบตรงคำถาม ของเดิม 3 ชุด 91 แบบ ควรเหลือกี่ชุดกี่แบบ

**คำตอบคือ 3 ชุด 15 แบบ** (ลดลง 76 แบบ คิดเป็น 83.5 เปอร์เซ็นต์) **หรือ 2 ชุด 12 แบบ ถ้าตัดครึ่งวงกลมออก**

| ชุด | ชื่อที่เสนอ | แกน | จำนวนแบบ | ของเดิม |
|---|---|---|---|---|
| 1 | `progress-bar` | `size` 3 ค่า (`sm`, `md`, `lg`) คูณ `label` 3 ค่า (`false`, `right`, `bottom`) | **9** | 55 |
| 2 | `circular-progress-bar` | `size` 3 ค่า (`sm`, `md`, `lg`) บวก boolean `label` | **3** | 18 |
| 3 | `semi-circular-progress-bar` | `size` 3 ค่า (`sm`, `md`, `lg`) | **3** | 18 |
| | **รวม** | | **15** | **91** |

**ของที่หายไปและเหตุผล**

| ของที่ตัด | จำนวนแบบที่หาย | เหตุผลพร้อมเสียงข้างมาก |
|---|---|---|
| **แกน `Progress` 11 ค่า** | ‑50 | **ตลาด 1 ใน 15 เจ้าเท่านั้นที่ทำ** และเจ้านั้นคือ Untitled UI ที่ทำเพื่อ prototype และ **ค่าที่วาดไว้ผิดจริง 10 ใน 11 แบบในคอลัมน์ `Label=False`** |
| **แกน `Percent` 3 ค่าในทรงวงกลมทั้งสอง** | ‑24 | **Figma ผูกตัวแปรกับ `arcData` ไม่ได้** (ยืนยันจาก `VariableBindableNodeField`) และ **Untitled UI ที่เป็นต้นทางของเราก็ไม่ได้ทำแกนนี้** การมีแกนที่มีแค่ 3 ค่าจะทำให้คนเข้าใจผิดว่าเลือกค่าอื่นไม่ได้ |
| **ค่า `Top floating` และ `Bottom floating`** | ‑22 | **ตลาด 1 ใน 15 เจ้าเท่านั้นที่ทำ** และในไฟล์เรามันล้นออกนอกกรอบทั้งสองปลาย ลอยอยู่นอกขอบเขต component และมองไม่เห็นเพราะพื้นขาวบนขาว |
| **ขั้น `xl` และ `2xl` ของทรงวงกลม** | ‑6 | **ตลาด 0 ใน 15 เจ้าใช้ `2xl`** และ 0 ใน 15 เจ้าใช้ 6 ขั้น |
| **ค่า `False` ที่ปนอยู่ในแกนตำแหน่งป้าย** | 0 (เปลี่ยนรูปแบบไม่ใช่ตัดทิ้ง) | ตลาดแยกเรื่อง "มีป้ายไหม" กับ "ป้ายอยู่ตรงไหน" ออกจากกัน เช่น Spectrum มี `showValueLabel` คู่กับ `labelPosition` และ Ant มี `showInfo` คู่กับ `percentPosition` |
| **เพิ่มแกน `size` ให้แถบ 3 ค่า** | +6 | **ตลาด 10 ใน 14 เจ้ามีแกนขนาดให้แถบ มัธยฐาน 3 ขั้น** และสถานะปัจจุบันที่แถบมี 0 ขั้นแต่วงกลมมี 6 ขั้น ไม่มีเจ้าไหนทำ |

### 14.2 คำตอบตรงคำถาม แกนเปอร์เซ็นต์ควรจัดการยังไง

**ตัดแกนทิ้งทั้งสามทรง แล้วแทนด้วย 4 กลไกที่ทำงานต่างกัน**

1. **ความยาวของตัวเติมในทรงแถบ ให้คนที่หยิบไปใช้ลากเอง** โดยทำให้ชั้น `fill` เป็นลูกที่ลากได้ใน instance (ตั้ง `layoutSizing` ให้ปรับได้ และ **ห้ามใช้ constraint `SCALE`** ซึ่งเป็นต้นเหตุของค่าที่เพี้ยนในปัญหาข้อ 5)
2. **ส่วนโค้งของทรงวงกลมและครึ่งวงกลม ให้ลากด้วยที่จับส่วนโค้งของ Figma** ซึ่งเป็นวิธีเดียวที่ทำได้ และเป็นวิธีที่ Untitled UI แนะนำเองว่า "drag the arc handles... Sweep sets how much of the circle is filled"
3. **ตัวเลขเปอร์เซ็นต์ ให้เป็น component property ชนิดข้อความ** เพราะ `characters` อยู่ในรายการสนามที่ผูกตัวแปรได้ ทำให้พิมพ์ทับได้โดยไม่ต้องสร้าง variant
4. **ค่าตัวอย่างชุด 0, 25, 50, 75, 100 ให้ไปอยู่ในเอกสารของหน้า ไม่ใช่ในแกนของชุด** ซึ่งเป็นสิ่งที่ SLDS ทำ

**ถ้าทีมต้องการ prototype ที่เดินเปอร์เซ็นต์จริง** ให้ทำเป็นเฟรม prototype แยกต่างหากในหน้านั้น ไม่ใช่ยัดกลับเข้ามาเป็น variant ของไลบรารี เพราะ **variant ที่ถูก publish ออกไปทุกตัวคือของที่ไฟล์ปลายทางเห็นในแผง Assets** `[ตีความ]`

### 14.3 ฝั่งที่หนึ่ง เรื่องที่ตลาดตรงกันจนรับได้เลย

> ทุกข้อในตารางนี้มีเสียงข้างมากชัดเจน และไม่ขัดกับกฎที่ตั้งไว้ในโปรเจกต์

| # | ข้อเสนอ | เสียงข้างมากของตลาด |
|---|---|---|
| 1 | **ตัดแกน `Progress` 11 ค่าในทรงแถบทิ้ง** | ตลาด **14 ใน 15 เจ้า** ไม่ทำค่าข้อมูลเป็นแกน |
| 2 | **ตัดแกน `Percent` 3 ค่าในทรงวงกลมทั้งสองทิ้ง** | ตลาด **15 ใน 15 เจ้า** ไม่ทำ และ Figma ผูกตัวแปรกับส่วนโค้งไม่ได้ |
| 3 | **แก้ทรงวงกลมให้เติมตามเข็มเริ่มที่ 12 นาฬิกา** | **3 ใน 3 เจ้าที่ประกาศค่าไว้** ตรงกันหมด (Material `startAngle = 270f`, Mantine ตั้งต้น 270, Untitled UI `-rotate-90`) **และของเราเป็นเจ้าเดียวที่ทวนเข็ม** |
| 4 | **แก้ทรงครึ่งวงกลมให้หมุนทางเดียวกับทรงวงกลม** | ไม่มีเจ้าไหนให้สองทรงในชุดเดียวกันหมุนคนละทาง |
| 5 | **แก้ค่าเปอร์เซ็นต์ที่วาดผิด 10 จุด ก่อนจะเอาไปทำอะไรต่อ** | ไม่ต้องอ้างตลาด นี่คือข้อผิดพลาดที่พิสูจน์ได้ด้วยการวัด |
| 6 | **ตัดขั้น `2xl` ทิ้ง** | **0 ใน 15 เจ้าใช้ `2xl`** และ 0 ใน 15 ใช้ 6 ขั้น และขั้นนี้อยู่นอกสเกล 5 ขั้นของระบบเราเองด้วย |
| 7 | **แยก "มีป้ายไหม" ออกจาก "ป้ายอยู่ตรงไหน"** | Spectrum, Ant, Carbon ทำแบบนี้ทั้งสามเจ้า |
| 8 | **ตัดป้ายลอยทั้งสองค่าทิ้ง** | **1 ใน 15 เจ้าเท่านั้นที่ทำ** และของเราชำรุดอยู่แล้วทั้งเรื่องล้นกรอบ เรื่องสีขาวบนขาว และเรื่องขอบเขต component |
| 9 | **ให้ความหนาวงแหวนเท่ากับ 10 เปอร์เซ็นต์ของเส้นผ่านศูนย์กลางทุกขั้น** | **4 ใน 7 เจ้าที่มีวงกลมใช้ 10 เปอร์เซ็นต์พอดี** (Material สองแพลตฟอร์ม, Mantine, Untitled UI) และของเราไหลจาก 12.5 ลงไป 8.6 ซึ่งไม่มีใครทำ |
| 10 | **ให้แถบยืดเต็มกรอบแม่แทนความกว้าง 320 ตายตัว และตั้งความกว้างต่ำสุด 48** | **11 ใน 13 เจ้าให้ยืดเต็ม** และ **2 เจ้าตั้งต่ำสุดไว้ที่ 48 เท่ากันพอดี** (Carbon และ Spectrum) |
| 11 | **ใช้ `role="progressbar"` กับ `aria-valuemin` 0 และ `aria-valuemax` 100 และ `aria-valuenow`** | **13 ใน 13 เจ้าที่มี component ใช้ตรงกัน** และตรงกับมาตรฐาน |
| 12 | **ตอนไม่รู้ค่า ให้ตัด `aria-valuenow` ทิ้ง ไม่ใช่ใส่ 0** | **มาตรฐานเขียนไว้ตรง ๆ** และ 7 ใน 8 เจ้าที่มีแบบไม่รู้ค่าทำถูก |
| 13 | **วางตัวเลขเปอร์เซ็นต์ไว้นอกกล่องที่มี `role="progressbar"`** | **มาตรฐานระบุ `Children Presentational: True`** และ 7 ใน 15 เจ้าไม่ใส่ตัวเลขในตัว component เลย |
| 14 | **ชื่อเป็นของบังคับ ใช้ `aria-labelledby` เมื่อมีป้ายที่มองเห็น** | **มาตรฐานระบุ `Accessible Name Required: True`** และ 4 เจ้าใช้ `aria-labelledby` เมื่อมีป้ายจริง |
| 15 | **ใช้ `tabular-nums` กับตัวเลขทุกจุด** | 2 ใน 15 เจ้าทำ แต่ **เป็นข้อที่ไม่มีใครเสียประโยชน์** และแก้อาการตัวเลขกระตุก |
| 16 | **ปัดเศษเป็นจำนวนเต็ม และใช้ `Intl.NumberFormat` กับ locale `th-TH` ฝั่งโค้ด** | ตลาดปัดเป็นจำนวนเต็ม 100 เปอร์เซ็นต์ และ 2 ตระกูลใหญ่ใช้ `Intl.NumberFormat` |
| 17 | **ไม่ใส่เงาให้แถบและวงแหวน** | **14 ใน 15 เจ้าไม่มีเงา** มีแค่ Chakra ที่ใส่ `shadow: "inset"` ที่รางใน variant `outline` และ **กฎของเราตัดสินไว้แล้วเมื่อ 2026-08-14 ว่าไม่ทำ inset shadow** |
| 18 | **เปลี่ยนชื่อ COMPONENT_SET ให้ตรงกฎ** เป็น `progress-bar`, `circular-progress-bar`, `semi-circular-progress-bar` และแก้ `Lebel` เป็น `label` | กฎการตั้งชื่อของโปรเจกต์เอง (ตัวเล็ก ใช้ขีด ลงท้ายด้วยชนิด คำบอกทรงนำหน้า) |
| 19 | **สร้าง `tokens/scale/progress.mjs` ไปพร้อมกับ component** | กฎระบบสเกลของโปรเจกต์เอง ตั้งไว้ 2026-08-18 |
| 20 | **รวมสีรางของทั้งสองทรงให้เป็นค่าเดียว** | ไม่มีเจ้าไหนใช้สีรางคนละค่าในสองทรงของตัวเอง |

**ตัวเลขที่เสนอสำหรับไฟล์สูตรขนาด** `[คำนวณ]` เลือกให้ `md` ของทุกมิติตรงกับค่าปัจจุบันพอดี เพื่อให้ของที่วางอยู่แล้วไม่ขยับ

| มิติ | ฐาน | ขั้นละ | sm (i=1) | md (i=2) | lg (i=3) | ที่มา |
|---|---|---|---|---|---|---|
| ความหนาแถบ | 2 | 2 | **4** | **6** | **8** | ตรงกับ Spectrum ที่ใช้ 4, 6, 8, 10 พอดี และ `md` คงค่า 6 เดิมของเรา |
| เส้นผ่านศูนย์กลางวงกลม | 40 | 20 | **60** | **80** | **100** | `md` คงค่า 80 เดิม และ `sm` ตรงกับขนาดเล็กของ Ant ที่เป็น 60 |
| ความหนาวงแหวน | 4 | 2 | **6** | **8** | **10** | **เท่ากับ 10 เปอร์เซ็นต์ของเส้นผ่านศูนย์กลางพอดีทุกขั้น** ตามสูตรที่ 4 เจ้าใช้ |
| ความสูงครึ่งวงกลม | 22 | 11 | **33** | **44** | **55** | เท่ากับ `(เส้นผ่านศูนย์กลาง + ความหนา) หาร 2` พอดีทุกขั้น และ `md` คงค่า 44 เดิม |

**ตรวจย้อน `[คำนวณ]`** `(60+6)/2 = 33` ถูก, `(80+8)/2 = 44` ถูก, `(100+10)/2 = 55` ถูก, `6/60 = 8/80 = 10/100 = 10 เปอร์เซ็นต์` ถูกทั้งสามขั้น **ทุกค่าบวกกลับได้ลงตัวโดยไม่มีเศษ**

### 14.4 ฝั่งที่สอง เรื่องที่ต้องให้คนตัดสิน

> ข้อเหล่านี้ตลาดไม่ตรงกัน หรือกระทบของที่มีอยู่แล้ว หรือกระทบ preset ของระบบ จึงต้องถามก่อนตามกฎ ask-first

| # | เรื่อง | ทางเลือกและเสียงของตลาด | ทำไมตัดสินแทนไม่ได้ |
|---|---|---|---|
| 1 | **จะเก็บทรงครึ่งวงกลมไว้ไหม** | ตลาด **3 ใน 15 เจ้ามี** และทั้งสามใช้เป็นหน้าปัดในแดชบอร์ด ไม่ใช่ตัวบอกการโหลด | เป็นของที่มีอยู่แล้ว 18 แบบ **ตามกฎ ask-first ต้องถามก่อนลบหรือย้าย** และถ้าเรามีแผนทำแดชบอร์ดยอดขายตามที่เคยคุยไว้ ของชิ้นนี้อาจมีที่ใช้จริง |
| 2 | **จะทำแบบไม่รู้ค่าไหม และถ้าทำ จะทำยังไงในไฟล์ออกแบบ** | ตลาด **8 ใน 15 เจ้าทำ และ 6 ใน 15 ไม่ทำ** ซึ่งเกือบครึ่งต่อครึ่ง | ขึ้นกับว่าหลังบ้านของเรามีจุดที่วัดเปอร์เซ็นต์ไม่ได้กี่จุด **ซึ่งผู้วิจัยไม่ได้เข้าไปดู** และถ้าทำ ต้องตัดสินว่าจะเป็น boolean property (ไม่เพิ่มแบบ) หรือเป็นแกนใหม่ (เพิ่มเท่าตัวเป็น 18 แบบ) |
| 3 | **จะเพิ่มแกนสถานะไหม และกี่ค่า** | ตลาด **7 ใน 15 เจ้ามี** โดยทุกเจ้าที่มีจะมี "สำเร็จ" และ 6 ใน 7 มี "ผิดพลาด" และ **0 ใน 15 มี "หยุดชั่วคราว"** | เพิ่ม 3 ค่าจะทำให้ชุดแถบโตจาก 9 เป็น 27 แบบ **ซึ่งเป็นการตัดสินใจเรื่องขนาดของไลบรารี ไม่ใช่เรื่องถูกผิด** และต้องตัดสินด้วยว่าจะใช้ไอคอนคู่แบบ Carbon ไหม |
| 4 | **จะแก้ความหนาแถบจาก 6 เป็นชุด 4, 6, 8 ไหม** | มัธยฐานตลาดเท่ากับ 8 และต้นทางของเราเองคือ 8 แต่ `md` ที่เสนอยังเป็น 6 เท่าเดิม | เป็นการเปลี่ยนค่าของที่มีอยู่แล้ว **ต้องถามก่อน** และถ้าเลือก `md` เป็น 8 แทน ฐานกับขั้นจะเปลี่ยนเป็น 4 และ 2 ซึ่งได้ 6, 8, 10 |
| 5 | **จะแก้เส้นผ่านศูนย์กลางวงกลมเป็น 60, 80, 100 ไหม** | ตลาดกระจายมาก ตั้งแต่ 16 (Spectrum) ถึง 280 (Untitled UI) **ไม่มีฉันทามติ** | เป็นการเปลี่ยนขนาดของที่มีอยู่แล้ว 18 แบบ และกระทบทุก instance ที่วางไว้ **ต้องถามก่อน** |
| 6 | **ตัวอักษรจะย้ายไปใช้ preset ไหน** | ไม่มีเจ้าไหนในตลาดกำหนดเรื่องนี้ให้เราได้ | **ขัดกฎ preset-only อยู่ตอนนี้** และ preset ที่มีไม่มีตัวไหนเป็นน้ำหนัก 600 เลย ค่าที่ใกล้ที่สุดคือ `label/xs` (10 บน 16) `label/sm` (12 บน 22) `label/md` (14 บน 24) `label/lg` (16 บน 26) `label/xl` (18 บน 28) ซึ่งเป็นน้ำหนัก 500 ทั้งหมด **ย้ายไปใช้ของเดิมแล้วยอมให้น้ำหนักเบาลง หรือ เพิ่ม preset ใหม่ ต้องถามก่อนทั้งสองทาง** และถ้าย้าย ความสูงของแบบ `Label=Right` จะโตจาก 18 เป็น 22 |
| 7 | **จะทำแถบความคืบหน้าเพื่อหลังบ้านอย่างเดียว หรือใช้บนหน้าข่าวด้วย** | สำรวจแล้วเว็บในเครือ 6 เว็บไม่มีใครใช้ `role="progressbar"` เลย และเว็บข่าวต่างประเทศใช้กับตัวเล่นสื่อ (ซึ่งเป็น slider) กับผลเลือกตั้ง (ซึ่งควรเป็น `meter`) | **เป็นเรื่องขอบเขตงาน ไม่ใช่เรื่องออกแบบ** และคำตอบกำหนดว่าต้องทำแกนสถานะไหม ต้องทำแบบไม่รู้ค่าไหม และต้องรองรับโหมดมืดไหม |
| 8 | **springnews ใช้ NProgress อยู่แล้ว จะดึงเข้าระบบไหม** | เป็นแถบ 3 พิกเซลที่ขอบบนจอ สีเดียวกับแบรนด์ ซึ่งไม่ตรงกับความหนาใด ๆ ที่เสนอ | **เป็นของที่มีอยู่แล้วและใช้งานจริงอยู่** ถ้าจะดึงเข้าระบบต้องตัดสินว่ามันเป็น variant ของ `progress-bar` หรือเป็น pattern คนละตัวชื่อ `page-load-bar` |
| 9 | **จะทำแถบบอกความคืบหน้าการอ่านบทความไหม** | หลักฐานฝั่งสนับสนุนกับฝั่งคัดค้านมีน้ำหนักพอกัน และ The New Republic เคยใส่แล้วถอดออก **ไม่มีงานวิจัยที่วัดผลกับเว็บข่าวโดยเฉพาะ** | เป็นเรื่องยุทธศาสตร์เนื้อหา ไม่ใช่เรื่องระบบดีไซน์ **และผู้วิจัยเสนอว่าถ้าทำ ไม่ควรเป็น component แต่เป็น pattern ของเทมเพลตบทความ** |
| 10 | **แถบซ้อนหลายค่า (แบบผลเลือกตั้งของ Guardian) จะทำไหม และจะอยู่หน้าไหน** | ตลาด **3 ใน 15 เจ้าทำ** (Primer, Mantine, Ant) และเป็นของที่เว็บข่าวใช้จริง | **เป็นของใหม่ที่ยังไม่มี ต้องถามก่อนสร้าง** และตามมาตรฐานของแบบนี้ควรเป็น `meter` ไม่ใช่ `progressbar` จึงอาจเป็นคนละ component |
| 11 | **จะทำโหมดมืดให้หน้านี้ไหม** | Untitled UI ทำทั้งชุด ("in light and dark mode") และ Mantine กับ Chakra ก็ทำ | ไฟล์ปัจจุบันของเราไม่มีโหมดมืด และ **กฎเรื่อง effect ตัดสินไว้แล้วว่ายังไม่ทำโหมดมืด** จึงต้องให้คนยืนยันว่าเรื่องสีจะทำไหม |

### 14.5 สิ่งที่ควรทำพร้อมกันถ้าตัดสินใจลงมือ

1. **สร้าง `tokens/scale/progress.mjs`** ตามตัวเลขในหัวข้อ 14.3 แล้วลงทะเบียนใน `tokens/scale/index.mjs` และรัน `npm run tokens:build` ให้ขึ้น collision เท่ากับ 0
2. **เพิ่ม token สีราง** เพราะตอนนี้เราผูกไปที่ variable ที่ให้ค่า `#D0D5DD` กับ `#EAECF0` คนละตัว ควรมีตัวเดียวที่หมายถึง "รางของตัวบอกความคืบหน้า" ใน collection `component`
3. **ลบ stroke ที่ซ้ำกับ fill ออกจากตัวเติมของทรงแถบ** ซึ่งเป็น stroke สีเดียวกับ fill ที่ไม่ได้ทำอะไรเลย
4. **ลบ fill ออกจาก ELLIPSE ของทรงวงกลม** เพราะ `innerRadius` เท่ากับ 1 ทำให้รูปทรงเป็นวงแหวนที่ความหนามาจาก stroke ล้วน ๆ fill จึงไม่เคยถูกเห็น
5. **ทำเอกสารครบชนิดตามกฎ Pre-flight** คือ Page Documentation 1 อัน บวก Information Document อย่างน้อย 1 อัน (เสนอว่าเป็น "เลือกแถบ ตัวหมุน หรือโครงร่างรอโหลด" ที่มีตารางเกณฑ์เวลา) บวก Component Previews บวก Token Document
6. **เขียนกฎการเข้าถึงลงในเอกสาร** โดยเฉพาะ 3 ข้อที่คนพลาดบ่อย คือ ตัด `aria-valuenow` ตอนไม่รู้ค่า · ห้ามวางตัวเลขไว้ในกล่อง progressbar · ประกาศผ่าน live region แค่ตอนเริ่มกับตอนจบ
7. **ถ้าทำแบบไม่รู้ค่า ต้องทำโหมดลดการเคลื่อนไหวไปพร้อมกัน** ตามแบบของ Fluent คือเปลี่ยนจากเลื่อนเป็นจางเข้าจางออกที่ความทึบ 0.2 ถึง 1 โดยยังใช้เวลาเท่าเดิม

### 14.6 สรุปสั้น เรื่องที่มีฉันทามติ เทียบ เรื่องที่ต้องให้คนตัดสิน

| รับได้เลย (20 ข้อในหัวข้อ 14.3) | ต้องให้คนตัดสิน (11 ข้อในหัวข้อ 14.4) |
|---|---|
| ตัดแกนเปอร์เซ็นต์ทั้งสามทรง | จะเก็บทรงครึ่งวงกลมไว้ไหม |
| แก้ทิศวงกลมให้ตามเข็มจาก 12 นาฬิกา | จะทำแบบไม่รู้ค่าไหม |
| แก้ค่าที่วาดผิด 10 จุด | จะเพิ่มแกนสถานะไหม กี่ค่า |
| ตัด `2xl` และตัดป้ายลอย | จะแก้ความหนาแถบและขนาดวงกลมไหม |
| ความหนาวงแหวนเท่ากับ 10 เปอร์เซ็นต์ของเส้นผ่านศูนย์กลาง | ตัวอักษรจะย้ายไป preset ไหน |
| แถบยืดเต็มกรอบและต่ำสุด 48 | ทำเพื่อหลังบ้านอย่างเดียวหรือใช้บนหน้าข่าวด้วย |
| กฎการเข้าถึง 4 ข้อตามมาตรฐาน | จะดึง NProgress ของ springnews เข้าระบบไหม |
| ไม่ใส่เงา และรวมสีรางเป็นค่าเดียว | จะทำแถบบอกความคืบหน้าการอ่านไหม |
| เปลี่ยนชื่อตามกฎ และสร้างไฟล์สูตรขนาด | จะทำแถบซ้อนหลายค่าไหม และจะทำโหมดมืดไหม |

---
## 15. แหล่งอ้างอิง

> ตรวจสถานะ HTTP ของทุกลิงก์ในหัวข้อนี้วันที่ 2026-10-08 แล้ว **ได้ 200 ทั้ง 105 รายการ**

**ไฟล์ต้นทางที่อ่านโดยตรง (แพ็กเกจ npm เวอร์ชันที่ระบุ ดาวน์โหลดด้วย `npm pack` วันที่ 2026-10-08)**

- Material 3 token `@material/web@2.5.0` [`_md-comp-progress-indicator.scss`](https://unpkg.com/@material/web@2.5.0/tokens/versions/latest/sass/_md-comp-progress-indicator.scss) (ชุด token รวมแถบกับวงกลม), [`_md-comp-linear-progress-indicator.scss`](https://unpkg.com/@material/web@2.5.0/tokens/versions/latest/sass/_md-comp-linear-progress-indicator.scss) (ชุดเดิมที่ประกาศเลิกใช้แล้ว), [`_md-comp-circular-progress-indicator.scss`](https://unpkg.com/@material/web@2.5.0/tokens/versions/latest/sass/_md-comp-circular-progress-indicator.scss)
- Material 3 component `@material/web@2.5.0` [`progress/internal/progress.d.ts`](https://unpkg.com/@material/web@2.5.0/progress/internal/progress.d.ts), [`progress/internal/progress.js`](https://unpkg.com/@material/web@2.5.0/progress/internal/progress.js) (ที่มาของชุด aria), [`progress/internal/linear-progress.d.ts`](https://unpkg.com/@material/web@2.5.0/progress/internal/linear-progress.d.ts) (ที่มาของ `buffer`), [`progress/linear-progress.d.ts`](https://unpkg.com/@material/web@2.5.0/progress/linear-progress.d.ts), [`progress/circular-progress.d.ts`](https://unpkg.com/@material/web@2.5.0/progress/circular-progress.d.ts) (ที่มาของข้อความ "in a clockwise direction"), [`progress/internal/linear-progress-styles.css`](https://unpkg.com/@material/web@2.5.0/progress/internal/linear-progress-styles.css), [`progress/internal/circular-progress-styles.css`](https://unpkg.com/@material/web@2.5.0/progress/internal/circular-progress-styles.css), [`progress/internal/_circular-progress.scss`](https://unpkg.com/@material/web@2.5.0/progress/internal/_circular-progress.scss) (ที่มาของสูตรความหนาเป็นเปอร์เซ็นต์)
- IBM Carbon `@carbon/react@1.118.0` [`es/components/ProgressBar/ProgressBar.d.ts`](https://unpkg.com/@carbon/react@1.118.0/es/components/ProgressBar/ProgressBar.d.ts), [`es/components/ProgressBar/ProgressBar.js`](https://unpkg.com/@carbon/react@1.118.0/es/components/ProgressBar/ProgressBar.js) และ `@carbon/styles@1.117.0` [`scss/components/progress-bar/_progress-bar.scss`](https://unpkg.com/@carbon/styles@1.117.0/scss/components/progress-bar/_progress-bar.scss), [`scss/components/loading/_vars.scss`](https://unpkg.com/@carbon/styles@1.117.0/scss/components/loading/_vars.scss), [`scss/components/loading/_animation.scss`](https://unpkg.com/@carbon/styles@1.117.0/scss/components/loading/_animation.scss) และ `@carbon/motion@11.54.0` (ที่มาของ `$duration-fast-02: 110ms`)
- Adobe Spectrum `@adobe/spectrum-tokens@15.5.0` [`src/progress-bar.json`](https://unpkg.com/@adobe/spectrum-tokens@15.5.0/src/progress-bar.json), [`src/progress-circle.json`](https://unpkg.com/@adobe/spectrum-tokens@15.5.0/src/progress-circle.json) และ `@spectrum-css/progressbar@6.2.0` [`dist/index.css`](https://unpkg.com/@spectrum-css/progressbar@6.2.0/dist/index.css) และ `@spectrum-css/progresscircle@5.2.0` [`dist/index.css`](https://unpkg.com/@spectrum-css/progresscircle@5.2.0/dist/index.css)
- Adobe React Aria `react-aria@3.52.1` [`dist/private/progress/useProgressBar.mjs`](https://unpkg.com/react-aria@3.52.1/dist/private/progress/useProgressBar.mjs) (ที่มาของค่าเริ่มต้น `maxValue = 100` และ `formatOptions = { style: 'percent' }`), [`dist/private/meter/useMeter.mjs`](https://unpkg.com/react-aria@3.52.1/dist/private/meter/useMeter.mjs) (ที่มาของ `role: 'meter progressbar'`)
- Shopify Polaris `@shopify/polaris@13.9.5` [`build/ts/src/components/ProgressBar/ProgressBar.d.ts`](https://unpkg.com/@shopify/polaris@13.9.5/build/ts/src/components/ProgressBar/ProgressBar.d.ts), [`build/esm/components/ProgressBar/ProgressBar.js`](https://unpkg.com/@shopify/polaris@13.9.5/build/esm/components/ProgressBar/ProgressBar.js), [`build/esm/styles.css`](https://unpkg.com/@shopify/polaris@13.9.5/build/esm/styles.css)
- Atlassian `@atlaskit/progress-bar@5.3.7` [`dist/types/types.d.ts`](https://unpkg.com/@atlaskit/progress-bar@5.3.7/dist/types/types.d.ts), [`dist/es2019/components/progress-bar.js`](https://unpkg.com/@atlaskit/progress-bar@5.3.7/dist/es2019/components/progress-bar.js), [`dist/es2019/components/progress-bar.compiled.css`](https://unpkg.com/@atlaskit/progress-bar@5.3.7/dist/es2019/components/progress-bar.compiled.css)
- Ant Design `antd@6.6.5` [`es/progress/progress.d.ts`](https://unpkg.com/antd@6.6.5/es/progress/progress.d.ts), [`es/progress/progress.js`](https://unpkg.com/antd@6.6.5/es/progress/progress.js), [`es/progress/utils.js`](https://unpkg.com/antd@6.6.5/es/progress/utils.js) (ที่มาของขนาด 60 กับ 120 และ 6 กับ 8), [`es/progress/Circle.js`](https://unpkg.com/antd@6.6.5/es/progress/Circle.js) (ที่มาของ `gapDegree` 75 และสูตรความหนา 6 เปอร์เซ็นต์), [`es/progress/Steps.js`](https://unpkg.com/antd@6.6.5/es/progress/Steps.js), [`es/progress/style/index.js`](https://unpkg.com/antd@6.6.5/es/progress/style/index.js), [`es/style/motion/util.js`](https://unpkg.com/antd@6.6.5/es/style/motion/util.js)
- GitHub Primer `@primer/react@38.40.1` [`dist/ProgressBar/ProgressBar.d.ts`](https://unpkg.com/@primer/react@38.40.1/dist/ProgressBar/ProgressBar.d.ts), [`dist/ProgressBar/ProgressBar.js`](https://unpkg.com/@primer/react@38.40.1/dist/ProgressBar/ProgressBar.js) และ `@primer/css@22.3.2`
- Microsoft Fluent 2 `@fluentui/react-progress@9.5.6` [`dist/index.d.ts`](https://unpkg.com/@fluentui/react-progress@9.5.6/dist/index.d.ts), [`lib/components/ProgressBar/useProgressBarStyles.styles.raw.js`](https://unpkg.com/@fluentui/react-progress@9.5.6/lib/components/ProgressBar/useProgressBarStyles.styles.raw.js) (ที่มาของ 2px กับ 4px และ `ZERO_THRESHOLD`), [`lib/components/ProgressBar/progressBarMotions.js`](https://unpkg.com/@fluentui/react-progress@9.5.6/lib/components/ProgressBar/progressBarMotions.js) (ที่มาของ 3000ms และโหมดลดการเคลื่อนไหว), [`lib/components/ProgressBar/useProgressBar.js`](https://unpkg.com/@fluentui/react-progress@9.5.6/lib/components/ProgressBar/useProgressBar.js)
- Salesforce Lightning `@salesforce-ux/design-system@2.264.1` [`assets/styles/salesforce-lightning-design-system.css`](https://unpkg.com/@salesforce-ux/design-system@2.264.1/assets/styles/salesforce-lightning-design-system.css)
- Uber Base Web `baseui@18.2.0` [`progress-bar/styled-components.js`](https://unpkg.com/baseui@18.2.0/progress-bar/styled-components.js), [`progress-bar/progressbar.js`](https://unpkg.com/baseui@18.2.0/progress-bar/progressbar.js), [`progress-bar/progressbar-rounded.js`](https://unpkg.com/baseui@18.2.0/progress-bar/progressbar-rounded.js), [`progress-bar/constants.js`](https://unpkg.com/baseui@18.2.0/progress-bar/constants.js)
- Pinterest Gestalt `gestalt@177.0.12` [`src/Spinner.tsx`](https://unpkg.com/gestalt@177.0.12/src/Spinner.tsx), [`src/Spinner.css`](https://unpkg.com/gestalt@177.0.12/src/Spinner.css) (ตรวจแล้วว่า **ไม่มีไฟล์ชื่อ ProgressBar ในแพ็กเกจเลย** มีแค่ `Video/Playhead.tsx` กับ `Video/Controls.tsx` ที่อ้างคำนี้)
- Radix `@radix-ui/react-progress@1.1.17` [`dist/index.mjs`](https://unpkg.com/@radix-ui/react-progress@1.1.17/dist/index.mjs), [`dist/index.d.mts`](https://unpkg.com/@radix-ui/react-progress@1.1.17/dist/index.d.mts)
- Mantine `@mantine/core@9.7.1` [`lib/components/Progress/Progress.d.ts`](https://unpkg.com/@mantine/core@9.7.1/lib/components/Progress/Progress.d.ts), [`lib/components/RingProgress/RingProgress.d.ts`](https://unpkg.com/@mantine/core@9.7.1/lib/components/RingProgress/RingProgress.d.ts) (ที่มาของ `startAngle` 270 และเพดาน `size / 4`), [`lib/components/SemiCircleProgress/SemiCircleProgress.d.ts`](https://unpkg.com/@mantine/core@9.7.1/lib/components/SemiCircleProgress/SemiCircleProgress.d.ts), [`styles/Progress.css`](https://unpkg.com/@mantine/core@9.7.1/styles/Progress.css) (ที่มาของ 5 ขั้น 3 ถึง 16)
- Chakra UI `@chakra-ui/react@3.37.0` [`dist/esm/theme/recipes/progress.js`](https://unpkg.com/@chakra-ui/react@3.37.0/dist/esm/theme/recipes/progress.js), [`dist/esm/theme/recipes/progress-circle.js`](https://unpkg.com/@chakra-ui/react@3.37.0/dist/esm/theme/recipes/progress-circle.js)
- เครื่องสถานะที่อยู่ใต้ Chakra `@zag-js/progress@1.45.0` [`dist/progress.connect.mjs`](https://unpkg.com/@zag-js/progress@1.45.0/dist/progress.connect.mjs), [`dist/progress.machine.mjs`](https://unpkg.com/@zag-js/progress@1.45.0/dist/progress.machine.mjs), [`dist/progress.types.d.ts`](https://unpkg.com/@zag-js/progress@1.45.0/dist/progress.types.d.ts)
- Figma `@figma/plugin-typings@1.141.0` [`plugin-api.d.ts`](https://unpkg.com/@figma/plugin-typings@1.141.0/plugin-api.d.ts) (ที่มาของรายการ `VariableBindableNodeField` ที่พิสูจน์ว่า `arcData` ผูกตัวแปรไม่ได้)

**ไฟล์ต้นทางบน GitHub ที่อ่านโดยตรง**

- Untitled UI React [`components/base/progress-indicators/progress-indicators.tsx`](https://raw.githubusercontent.com/untitleduico/react/main/components/base/progress-indicators/progress-indicators.tsx) (ที่มาของ `ProgressBarLabelPosition` 4 ค่า และ `h-2` และ `transition duration-75 ease-linear`), [`components/base/progress-indicators/progress-circles.tsx`](https://raw.githubusercontent.com/untitleduico/react/main/components/base/progress-indicators/progress-circles.tsx) (ที่มาของ 5 ขนาด 64 ถึง 280 และ `-rotate-90`)
- Google Compose Material3 [`ProgressIndicator.kt`](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/ProgressIndicator.kt) (ที่มาของ `startAngle = 270f` และ `LinearAnimationDuration = 1750` และ `CircularAnimationProgressDuration = 6000` และ `LinearIndicatorWidth = 240.dp`)
- Google Compose Material3 [`WavyProgressIndicator.kt`](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/WavyProgressIndicator.kt)
- Google Compose Material3 token [`CircularProgressIndicatorTokens.kt`](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/CircularProgressIndicatorTokens.kt) (ที่มาของ `Size = 40.dp` และ `TrackThickness = 4.dp`), [`LinearProgressIndicatorTokens.kt`](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/LinearProgressIndicatorTokens.kt)
- IBM Carbon เอกสาร [`progress-bar/usage.mdx`](https://raw.githubusercontent.com/carbon-design-system/carbon-website/main/src/pages/components/progress-bar/usage.mdx), [`loading/usage.mdx`](https://raw.githubusercontent.com/carbon-design-system/carbon-website/main/src/pages/components/loading/usage.mdx)
- Shopify Polaris เอกสาร [`progress-bar.mdx`](https://raw.githubusercontent.com/Shopify/polaris/main/polaris.shopify.com/content/components/feedback-indicators/progress-bar.mdx), [`spinner.mdx`](https://raw.githubusercontent.com/Shopify/polaris/main/polaris.shopify.com/content/components/feedback-indicators/spinner.mdx), [`skeleton-page.mdx`](https://raw.githubusercontent.com/Shopify/polaris/main/polaris.shopify.com/content/components/feedback-indicators/skeleton-page.mdx)
- Salesforce Lightning เอกสาร [`progress-bar/docs.mdx`](https://raw.githubusercontent.com/salesforce-ux/design-system/main/ui/components/progress-bar/docs.mdx) (ที่มาของค่าตัวอย่าง 5 ค่า), [`progress-ring/docs.mdx`](https://raw.githubusercontent.com/salesforce-ux/design-system/main/ui/components/progress-ring/docs.mdx)

**หน้าเอกสารทางการ**

- [Atlassian Design System Progress bar usage](https://atlassian.design/components/progress-bar/usage)
- [GitHub Primer ProgressBar](https://primer.style/components/progress-bar)
- [Fluent 2 Wait UX](https://fluent2.microsoft.design/wait-ux) (ที่มาของเกณฑ์ 1 และ 3 วินาที)
- [Fluent 2 Progress bar usage](https://fluent2.microsoft.design/components/web/react/core/progressbar/usage)
- [Fluent 2 Spinner usage](https://fluent2.microsoft.design/components/web/react/core/spinner/usage)
- [React Spectrum ProgressBar](https://react-spectrum.adobe.com/react-spectrum/ProgressBar.html) และ [React Spectrum ProgressCircle](https://react-spectrum.adobe.com/react-spectrum/ProgressCircle.html)
- [Ant Design Progress](https://ant.design/components/progress)
- [Mantine Progress](https://mantine.dev/core/progress/) และ [Mantine RingProgress](https://mantine.dev/core/ring-progress/) และ [Mantine SemiCircleProgress](https://mantine.dev/core/semi-circle-progress/)
- [Chakra UI Progress](https://chakra-ui.com/docs/components/progress) และ [Chakra UI ProgressCircle](https://chakra-ui.com/docs/components/progress-circle)
- [Radix Progress](https://www.radix-ui.com/primitives/docs/components/progress)
- [Uber Base Web Progress bar](https://baseweb.design/components/progress-bar/)
- [Pinterest Gestalt Spinner](https://gestalt.pinterest.systems/web/spinner)
- [Untitled UI progress indicator components](https://www.untitledui.com/components/progress-indicators) (ที่มาของเหตุผลเรื่อง prototype)
- [Untitled UI progress circle components](https://www.untitledui.com/components/progress-circles) (ที่มาของ 5 ขนาด 64 ถึง 280 และคำแนะนำเรื่องเลือกจากห้าขนาดแทนการย่อขยาย)
- [Material Design 3 Progress indicators guidelines](https://m3.material.io/components/progress-indicators/guidelines) (**เปิดอ่านเนื้อหาไม่ได้เพราะประกอบด้วยสคริปต์ ไม่ได้ใช้ตัวเลขจากหน้านี้**)
- [Figma Use expressions in prototypes](https://help.figma.com/hc/en-us/articles/15253194385943-Use-expressions-in-prototypes)
- [Figma plugin API boundVariables](https://developers.figma.com/docs/plugins/api/properties/nodes-boundvariables/)

**มาตรฐาน**

- [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/) หัวข้อ `progressbar` (ที่มาของกฎตัด `aria-valuenow` และ `Accessible Name Required` และ `Children Presentational`)
- [WAI-ARIA APG Meter Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/meter/) (ที่มาของเส้นแบ่งระหว่าง `meter` กับ `progressbar`)
- [WCAG 2.2 Understanding SC 1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
- [WCAG 2.2 Understanding SC 2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) (ที่มาของ Note 4)
- [WCAG 2.2 Understanding SC 4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) (ที่มาของคำว่า intermittent)
- [WCAG 2.2 Understanding SC 2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
- [WCAG 2.2 Technique ARIA25](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA25)

**แหล่งรอง**

- [Nielsen Norman Group, Response Times: The 3 Important Limits](https://www.nngroup.com/articles/response-times-3-important-limits/)
- [Digiday, Why designers hate on the article progress bar](https://digiday.com/media/designers-hate-article-progress-bar/) (เผยแพร่ 2015-08-10)
- [MDN, animation-timeline scroll()](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline/scroll)
- [w3c-wai-ig, Progress bars and indicators colour contrast accessibility](https://lists.w3.org/Archives/Public/w3c-wai-ig/2026JanMar/0061.html) (คำถามที่ยังไม่มีคำตอบทางการ)

**ไฟล์ในโปรเจกต์ที่อ่านประกอบ (อ่านอย่างเดียว ไม่ได้แก้)**

- Figma REST API node `7121:7243` และ node ลูก `7135:49640`, `7135:49925`, `7363:118` พร้อม node ย่อยทุกตัว (ค่าความกว้าง ความหนา `arcData` การผูกตัวแปร ขนาดตัวอักษร)
- Figma REST API `/v1/images` สำหรับ render ภาพของทั้ง 3 ชุดเพื่อยืนยันทิศการเติมด้วยตา
- `tokens/tokens.json/typography.json` และ `tokens/output/css/typography.css` (ค่า resolved ของ `label/*` และ `body/*` และ `meta/*` และ `title/*`)
- `tokens/output/css/variables.css` (จับคู่ค่าสี `#D0D5DD` `#1E58F2` `#EAECF0` `#F2F4F7` กับชื่อ token)
- `tokens/tokens.json/shadows.json` (ตรวจว่าคำว่า progress โผล่ที่เดียวใน `$description`)
- `tokens/scale/` และ `tokens/scale/index.mjs` (ตรวจว่าไม่มี `progress.mjs`)
- `components/` และ `prototype/` (ตรวจว่าไม่มีโค้ด Progress)
- `docs/figma-pages.md` (หน้า 23 Progress Bars node `7121:7243`)
- [docs/research/tooltip-component.md](tooltip-component.md) (โครงเอกสารและวิธีเก็บข้อมูล)

**การสำรวจของผู้วิจัย**

- ดึง HTML ตั้งต้นของหน้าแรกและหน้าบทความของเว็บในเครือ 6 เว็บ และของเว็บข่าวต่างประเทศ 5 เว็บ วันที่ 2026-10-08 แล้วนับ `role="progressbar"` และ `nprogress` และ `skeleton` และ `spinner` และ `aria-busy` และ `aria-live` (ดูตารางในหัวข้อ 10.1) หน้าบทความที่ใช้คือ bangkokbiznews.com/business/economic/1222222 · nationtv.tv/business/378984528 · komchadluek.net/entertainment/623897 · thansettakij.com/business/670911 · springnews.co.th/digital-tech/auto/865332 · posttoday.com/ai-today/749960
- ค้นชื่อตัวแปร CSS ที่มีคำว่า progress ในหน้าแรกของ theguardian.com และ bbc.com (ดูตารางในหัวข้อ 10.3)
- คำนวณอัตราส่วนคอนทราสต์ตามสูตร WCAG จากค่าสี resolved ที่ดึงมาจาก Figma REST API

---

## 16. คำถามที่ต้องตัดสินก่อนลงมือ

เรียงตามลำดับที่ควรตอบ เพราะคำตอบของข้อต้นกำหนดข้อหลัง

| # | คำถาม | ทำไมต้องตอบก่อน |
|---|---|---|
| 1 | **แถบความคืบหน้าชุดนี้ทำเพื่อใช้ที่ไหน หลังบ้าน (CMS อัปโหลดสื่อ แดชบอร์ด) หรือหน้าอ่านข่าวด้วย** | ถ้าเพื่อหลังบ้านเท่านั้น เรื่องโหมดมืดกับเรื่องแถบซ้อนหลายค่าตัดทิ้งได้ทันที และแกนสถานะกลายเป็นของจำเป็น ถ้าจะใช้บนหน้าข่าวด้วย ต้องตัดสินเรื่อง `meter` กับ slider ก่อนทุกเรื่อง |
| 2 | **ของเดิม 3 ชุด 91 แบบ จะยุบเหลือ 15 แบบตามข้อเสนอ 14.1 ไหม** | ตามกฎ ask-first ของที่มีอยู่แล้วและจะลบหรือย้าย ต้องถามก่อนเสมอ และคำตอบกำหนดขอบเขตงานทั้งหมด |
| 3 | **จะเก็บทรงครึ่งวงกลมไว้ไหม** | ตลาด 3 ใน 15 เจ้าทำ และทั้งสามใช้เป็นหน้าปัดในแดชบอร์ด **ถ้าเราไม่มีแผนทำแดชบอร์ด ของชิ้นนี้ไม่มีที่ใช้** และถ้าตัดออก งานลดจาก 3 ชุดเหลือ 2 ชุด |
| 4 | **จะทำแบบไม่รู้ค่าไหม** | ตลาดเกือบครึ่งต่อครึ่ง และคำตอบกำหนดว่าต้องทำโหมดลดการเคลื่อนไหวไหม ต้องเขียนกฎเรื่องข้อ 2.2.2 ลงเอกสารไหม และต้องทำ keyframes ฝั่งโค้ดไหม |
| 5 | **จะเพิ่มแกนสถานะไหม และกี่ค่า** | ถ้าเพิ่ม 3 ค่า ชุดแถบโตจาก 9 เป็น 27 แบบ **และตลาด 0 ใน 15 มีสถานะหยุดชั่วคราว ดังนั้นต่อให้ทำก็ไม่ควรมีค่านี้** |
| 6 | **จะยอมรับตัวเลขขนาดชุดใหม่ไหม** คือแถบ 4, 6, 8 และวงกลม 60, 80, 100 กับความหนา 6, 8, 10 | เป็นการเปลี่ยนขนาดของที่มีอยู่แล้ว ต้องถามก่อน และคำตอบกำหนดเนื้อหาของ `tokens/scale/progress.mjs` ทั้งไฟล์ |
| 7 | **ตัวอักษรจะย้ายไปใช้ preset `label/*` ที่มีอยู่ (น้ำหนัก 500) หรือจะเพิ่ม preset น้ำหนัก 600** | **ขัดกฎ preset-only อยู่ตอนนี้** และถ้าย้าย ความสูงของแบบที่มีป้ายจะเปลี่ยน ต้องคำนวณระยะใหม่ทั้งชุด |
| 8 | **จะดึง NProgress ที่ springnews ใช้อยู่เข้ามาเป็นส่วนหนึ่งของระบบไหม** | เป็นของที่ใช้งานจริงอยู่แล้วในเว็บเรา และถ้าดึงเข้ามา ต้องตัดสินว่าเป็น variant ของ `progress-bar` หรือเป็นของคนละตัว |
| 9 | **จะทำแถบซ้อนหลายค่าสำหรับข้อมูลในเนื้อข่าว (เช่น ผลคะแนน) ไหม** | เป็นของใหม่ ต้องถามก่อนสร้าง และตามมาตรฐานควรเป็น `meter` ไม่ใช่ `progressbar` จึงอาจต้องเป็นหน้าใหม่หรือ component ใหม่ ไม่ใช่ variant ของหน้านี้ |
| 10 | **จะทำโหมดมืดให้หน้านี้ไหม** | ไฟล์ปัจจุบันไม่มี และกฎเรื่อง effect ตัดสินไว้แล้วว่ายังไม่ทำโหมดมืด ต้องให้คนยืนยันว่าฝั่งสีจะทำหรือไม่ |
| 11 | **จะแก้ค่าเปอร์เซ็นต์ที่วาดผิด 10 จุดก่อน หรือจะยุบชุดไปเลย** | ถ้ายุบชุดตามข้อ 2 ความผิดพลาดนี้หายไปเอง **ไม่ต้องเสียเวลาแก้** แต่ถ้ายังไม่ยุบ ต้องแก้ก่อนที่จะมีคนหยิบไปใช้ |
