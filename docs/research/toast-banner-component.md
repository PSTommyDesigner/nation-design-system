---
title: "Toast and Banner Component research"
description: "เทียบ toast (snackbar) กับ banner (inline alert) ของ DS เจ้าใหญ่ 15 เจ้า จากไฟล์ต้นทางจริง พร้อมข้อเสนอโครงหน้า 19 Toasts and Banners ของ NTGDS เน้นเส้นแบ่งสองชิ้น เวลาหายเอง ชนิดและทรงสี การเข้าถึง และบริบทเว็บข่าว"
research_date: "2026-10-02"
scope: "Material 3 (tokens และ MDC snackbar และเอกสาร Android), IBM Carbon (toast, inline, actionable, callout), Shopify Polaris (Toast และ Banner), Adobe Spectrum (tokens, Spectrum CSS, React Spectrum, React Aria), Atlassian (Flag, Banner, Section message), Ant Design (message, notification, Alert), GitHub Primer (Banner, Flash, หน้า accessibility เรื่อง toast), Microsoft Fluent 2 (Toast, MessageBar), Salesforce Lightning (toast, alert, scoped notification), Uber Base Web (Toast และ Notification), Pinterest Gestalt (Toast, BannerSlim, BannerCallout, BannerUpsell, BannerOverlay), Untitled UI, Radix และ sonner (shadcn), Mantine, Chakra UI v3 กับ Zag บวก WAI-ARIA APG, WCAG 2.2, Adrian Roselli, Nielsen Norman Group และการสำรวจ HTML ของเว็บในเครือ 6 เว็บ"
status: "draft รอตัดสิน"
owner: "ux-researcher"
---

# Research Toast และ Banner ของ Design System เจ้าใหญ่

**วันที่วิจัย:** 2026-10-02
**โจทย์:** หาข้อมูลเพื่อตัดสินโครงการออกแบบหน้า 19 Toasts and Banners ครอบคลุม 8 กลุ่มคำถาม คือ เส้นแบ่งระหว่าง toast กับ banner, กายวิภาคของ toast, กายวิภาคของ banner, ชนิดและสี, สถานะและการโต้ตอบ, การเข้าถึง, การเคลื่อนไหว และบริบทเว็บข่าว

**ป้ายแหล่ง:** `[ทางการ]` ไฟล์ต้นทางหรือเอกสารขององค์กรเอง `[มาตรฐาน]` W3C `[แหล่งรอง]` คนนอกสรุปหรือวิจัย `[คำนวณ]` ผู้วิจัยคำนวณจากค่าในไฟล์ต้นทาง `[ตีความ]` ความเห็นของผู้วิจัย ไม่ใช่ข้อเท็จจริง `[ของเรา]` ค่าที่อ่านจากไฟล์ในโปรเจกต์นี้ `[สำรวจ]` ผู้วิจัยดึงหน้าเว็บมาตรวจเอง

> **วิธีเก็บข้อมูล:** ตัวเลขทุกตัวในตารางอ่านจาก **แพ็กเกจ npm ที่เผยแพร่จริง** (ดาวน์โหลดด้วย `npm pack` วันที่ 2026-10-02) ไม่ได้อ่านจากหน้าเว็บที่คนสรุปไว้ ตามวิธีเดียวกับ [tabs-component.md](tabs-component.md) และ [slider-component.md](slider-component.md) ลิงก์ในหัวข้อ 14 ชี้ไปที่ unpkg ของเวอร์ชันเดียวกับที่อ่าน จึงเปิดตรวจซ้ำได้
>
> **ค่าคอนทราสต์ทุกตัวในเอกสารนี้ผู้วิจัยคำนวณเอง** ด้วยสูตร relative luminance ของ WCAG จากค่าสีที่อ่านจากไฟล์ต้นทาง กำกับ `[คำนวณ]` ไว้ทุกจุด
>
> **หน้าเอกสารที่ประกอบด้วยสคริปต์ดึงไม่ได้** คือ m3.material.io, spectrum.adobe.com, polaris.shopify.com และ lightningdesignsystem.com ทั้งชุด ข้อมูลของ Material 3 จึงมาจากไฟล์ token กับเอกสาร Android บน GitHub ส่วน Spectrum มาจากไฟล์ token กับหน้า React Spectrum และ React Aria ส่วน Polaris กับ SLDS มาจากโค้ดที่เผยแพร่ ดูข้อจำกัดเต็มในหัวข้อ 13
>
> **ไม่ได้เปิดไฟล์ Figma ของเจ้าอื่น และไม่ได้แตะไฟล์ Figma ของเรา** งานรอบนี้อ่านอย่างเดียว ไม่ได้แก้ token ไม่ได้แตะโค้ด

---

## 1. สรุปคำตอบ 8 กลุ่ม (อ่านหน้าเดียวจบ)

| กลุ่ม | คำตอบสั้นจากข้อมูลจริง |
|---|---|
| **ก. เส้นแบ่ง toast กับ banner** | **เกณฑ์ที่ทุกเจ้าพูดตรงกันคือ ของที่ลอยอยู่เหนือเนื้อหาและหายเองคือ toast ส่วนของที่อยู่ในสายเนื้อหาและอยู่จนกว่าเรื่องจะจบคือ banner** เกณฑ์ที่สองที่พบซ้ำคือ **toast พูดถึงสิ่งที่เพิ่งเกิดขึ้น ส่วน banner พูดถึงสถานะที่ยังค้างอยู่** Fluent เขียนไว้ชัดที่สุดว่า message bar สื่อ "the state of the entire product or the surface where it appears" ส่วน toast ใช้เมื่อเรื่อง "relates to an activity or status from a different location" **มี 1 เจ้าที่รวมเป็น component เดียวกันจริง คือ Base Web** ที่ `Notification` เป็น `Toast` ที่ตั้ง `notificationType: 'inline'` **และมี 1 เจ้าที่เลิกใช้ toast ทั้งระบบ คือ GitHub Primer** ที่เขียนตรง ๆ ว่า "Toasts pose significant accessibility concerns and are not recommended for use" |
| **ข. Toast** | **ความกว้างตายตัวคือค่าเริ่มต้นของตลาด** มัธยฐานอยู่ที่ราว 356 ถึง 400 (Fluent 292, Base Web 288, Carbon 288, Spectrum สูงสุด 336, sonner 356, Ant 384, Atlassian 400, Mantine สูงสุด 440) **บนมือถือทุกเจ้าที่สนใจเรื่องนี้เปลี่ยนเป็นเต็มความกว้าง** (Atlassian ที่ 560, sonner ที่ 600, Material ที่ 480) **ตำแหน่งไม่มีฉันทามติ** ล่างกลาง 3 เจ้า ล่างขวา 3 เจ้า บนขวา 2 เจ้า บนกลาง 2 เจ้า ล่างซ้าย 1 เจ้า **เวลาหายเองมัธยฐาน 5 วินาที** ช่วง 2 ถึง 8 **จำนวนที่ซ้อนพร้อมกันมัธยฐาน 3** **ปุ่มกระทำ 1 ปุ่มคือกติกาของตลาด** Carbon เขียนว่า "Only one action is allowed for each notification" **ไม่มีเจ้าไหนทำแกนขนาด sm md lg ให้ toast เลยสักเจ้า** |
| **ค. Banner** | **ทุกเจ้าที่ทำ banner จริงแยกเป็น 2 ระดับขึ้นไป** ระดับหน้ากับระดับกล่องเนื้อหา และ **วิธีแยกที่ตรงกันคือมุมโค้ง** Fluent ใช้ `shape: square` สำหรับระดับหน้าและ `rounded` สำหรับระดับ component ส่วน Polaris ใช้พื้นทึบสำหรับระดับหน้าและพื้นอ่อนสำหรับในกล่อง **ปิดได้หรือไม่ ตลาดแตกเป็นสองฝั่งชัด** Atlassian Banner กับ Carbon Callout ปิดไม่ได้เลย ส่วน Fluent MessageBar "always dismissible" **กฎที่ตรงกันคือ banner ที่มีงานค้างให้ทำ ห้ามปิด** **ปุ่มกระทำย้ายลงล่างเมื่อข้อความยาว** Primer ใช้ container query ที่ 500 และ Fluent ใช้ ResizeObserver เปลี่ยนเป็น multiline **Polaris วางปุ่มไว้ใต้ข้อความตลอดเวลาโดยไม่มีเงื่อนไข** |
| **ง. ชนิดและสี** | **ชุดชนิดที่พบบ่อยสุดคือ 4 ตัว info success warning error** (8 เจ้า) **ชนิด brand หรือ promotional มี 5 เจ้า** คือ Primer (`upsell`), Atlassian (`discovery` และ `announcement`), Gestalt (`recommendation` และ BannerUpsell), Material (`vibrant` ที่ใช้ primary-container) และ Polaris (`magic`) **ทรงพื้นอ่อนคือทรงหลักของ banner** และ **ทรงทึบคือทรงหลักของ toast** เจ้าที่ทำมากกว่า 1 ทรงมี 6 เจ้า มากสุดคือ Mantine ที่ Alert มี 6 ทรง **เรื่องคอนทราสต์คือข้อค้นพบที่คมที่สุดของเอกสารนี้** ไม่มีเจ้าไหนใช้ตัวหนังสือขาวบนพื้นทึบได้ครบทุกชนิด Polaris ประกาศ token สีตัวอักษรแยกต่อชนิด โดย warning กับ info เป็นตัวหนังสือ **เข้ม** และ SLDS กับ Atlassian ก็สลับเป็นตัวเข้มบนพื้นเหลือง **ค่าของเราเองก็ตก** ขาวบน `warning-solid` ได้ 3.06 และบน `success-solid` ได้ 3.73 ซึ่งไม่ผ่าน 4.5 `[คำนวณ]` |
| **จ. สถานะและการโต้ตอบ** | **ตัวกล่องไม่มี hover หรือ disabled** สถานะอยู่ที่ปุ่มข้างในเท่านั้น **แต่ตัวกล่องต้องโฟกัสได้** 5 เจ้าใส่ `tabIndex=0` ที่ตัวกล่อง toast (Fluent, Radix, Zag, sonner, Polaris Banner) และ Primer ใส่ `tabIndex=-1` เพื่อให้ย้ายโฟกัสมาด้วยโค้ดได้ **วงแหวนโฟกัสบนพื้นเข้มมี 3 วิธี** Carbon ใช้ `outline` สีกลับขั้วพร้อม `outline-offset: -2px` ให้วงอยู่ด้านใน Chakra ใช้ขอบขาวโปร่ง `white/40` และ SLDS ใช้ `box-shadow` แบบ inset |
| **ฉ. การเข้าถึง** | **ตลาดเลิกวาง live region ไว้บนตัว toast แล้ว** 4 เจ้า (Fluent, Radix, Spectrum, Material MDC) แยกเป็นข้อความซ่อนต่างหาก เพราะวางบนตัวจริงจะอ่านซ้ำกับปุ่มและอ่านผิดลำดับ **การจับคู่ชนิดกับระดับเสียงที่ตรงกันคือ info เป็น polite และที่เหลือเป็น assertive** (Fluent กับ Polaris Banner ทำเหมือนกันเป๊ะ) **ห้ามย้ายโฟกัสไปที่ toast** APG เขียนว่า "it is crucial they do not affect keyboard focus" **ทางออกที่ตลาดเลือกคือปุ่มลัด** Spectrum และ React Aria ใช้ F6 ส่วน Radix ใช้ F8 ส่วน sonner ใช้ Alt+T **เรื่อง WCAG ที่คนอ้างผิดบ่อย** APG อ้างข้อ **2.2.3 No Timing ซึ่งเป็นระดับ AAA** ไม่ใช่ 2.2.1 ส่วน Roselli อ้าง 2.2.1 **ขนาดปุ่มปิดตลาดทำตกกันหลายเจ้า** sonner 20 และ Material 36 ไม่ผ่าน 24 กับ 44 ตามลำดับ ส่วน Carbon ทำ 48 ซึ่งผ่านทุกเกณฑ์ |
| **ช. การเคลื่อนไหว** | **ช่วงที่ตลาดใช้คือเข้า 150 ถึง 400 และออก 75 ถึง 250 และทุกเจ้าให้ขาออกเร็วกว่าขาเข้า** ที่สุดขั้วสองฝั่งคือ Material (เข้า 150 ออก 75) กับ Polaris และ sonner (เข้า 400 ออก 200) **ทิศทางเข้ามาจากขอบที่ toast เกาะอยู่** ยกเว้น Material ที่ใช้ scale 0.8 ไป 1 ไม่ใช่การเลื่อน |
| **ซ. บริบทข่าว** | **สำรวจหน้าแรกทั้ง 6 เว็บในเครือวันที่ 2026-10-02 แล้วพบว่า 3 เว็บติดตั้งตัวขอสิทธิ์แจ้งเตือนของเจ้าอื่นอยู่แล้ว** nationtv กับ springnews ใช้ iZooto ส่วน thansettakij ใช้ Taboola push **ไม่พบตัวขอความยินยอมคุกกี้ใน HTML ตั้งต้นของเว็บไหนเลย** `[สำรวจ]` ข้อเสนอคือเพิ่มชนิด **brand** หนึ่งชนิดให้ครอบคลุมงานชวนสมัครและโปรโมต และทำ **ทรง breaking แยกต่างหากที่ไม่อยู่ในแกนชนิด** เพราะข่าวด่วนต้องใช้สีแบรนด์ของแต่ละเว็บ ไม่ใช่สีแดง error |

---

## 2. สถานะปัจจุบันของเราก่อนเริ่ม `[ของเรา]`

| หัวข้อ | สถานะ |
|---|---|
| หน้า Figma | **19 Toasts and Banners** node `7121:7238` ปัจจุบันมี 3 ลูก (`docs/figma-pages.md`) |
| ไฟล์สูตรขนาด | **ยังไม่มี** `tokens/scale/toast.mjs` หรือ `banner.mjs` (มี 17 ไฟล์ ไม่มีสองตัวนี้) |
| token | **ไม่มี token ชื่อ toast, banner, alert, notification หรือ snackbar เลยสักตัว** ใน `tokens/tokens.json/` |
| component โค้ด | **ไม่มี** ใน `components/` (มี 15 โฟลเดอร์ ไม่มีสองตัวนี้) |
| ตระกูลสีสถานะที่มีอยู่แล้ว | **3 ตระกูล คือ error warning success** ไม่มี **info** เลย |
| ชั้นสีต่อตระกูล | `background/system/<ชนิด>-primary` (ขั้น 50) และ `-secondary` (ขั้น 100) และ `-solid` (ขั้น 600) และ `foreground/system/<ชนิด>-primary` (600) และ `-secondary` (500) และ `border/system/<ชนิด>` (300) และ `border/system/<ชนิด>-solid` (600) |
| สีแบรนด์ | `color/background/brand/solid` = `rgb(30, 88, 242)` |
| เงา | 15 style ใน 3 ทิศ (`shadows/{bottom,top,center}/{xs..xl}`) |
| สเกลความสูง | `CONTROL_HEIGHT = { base: 24, step: 8 }` ให้ 24, 32, 40, 48, 56 |
| text preset ที่เกี่ยวข้อง | `label/xs..xl` (10, 12, 14, 16, 18 บน line-height 16, 22, 24, 26, 28) และ `body/xs..xl` (12, 14, 16, 18, 20 บน 22, 24, 26, 28, 30) |

### 2.1 ค่าสีของเราชนกับเกณฑ์คอนทราสต์ตรงไหนบ้าง `[คำนวณ]`

คำนวณจากค่า resolved ใน `tokens/tokens.json/semantics-light-mode.json` และ `primitive.json`

| ทรง | คู่สี | อัตราส่วน | ผ่าน 4.5 (ข้อความ) | ผ่าน 3.0 (ไม่ใช่ข้อความ) |
|---|---|---|---|---|
| ทึบ | `error-solid` rgb(217,45,32) กับ ขาว | **4.83** | ผ่าน | ผ่าน |
| ทึบ | `warning-solid` rgb(202,133,4) กับ ขาว | **3.06** | **ไม่ผ่าน** | ผ่านเฉียด |
| ทึบ | `success-solid` rgb(3,152,85) กับ ขาว | **3.73** | **ไม่ผ่าน** | ผ่าน |
| ทึบ | `warning-solid` กับ ดำ | 6.87 | ผ่าน | ผ่าน |
| ทึบ | `success-solid` กับ ดำ | 5.63 | ผ่าน | ผ่าน |
| ทึบ | `brand/solid` rgb(30,88,242) กับ ขาว | 5.63 | ผ่าน | ผ่าน |
| พื้นอ่อน | `error-primary` bg กับ `error-primary` fg | **4.44** | **ไม่ผ่านเฉียด** | ผ่าน |
| พื้นอ่อน | `warning-primary` bg กับ `warning-primary` fg | **2.94** | **ไม่ผ่าน** | **ไม่ผ่าน** |
| พื้นอ่อน | `success-primary` bg กับ `success-primary` fg | **3.54** | **ไม่ผ่าน** | ผ่าน |
| พื้นอ่อน | `error-primary` bg กับ ข้อความเทาเข้ม #101828 | 16.32 | ผ่าน | ผ่าน |
| พื้นอ่อน | `warning-primary` bg กับ ข้อความเทาเข้ม #101828 | 17.05 | ผ่าน | ผ่าน |
| พื้นอ่อน | `success-primary` bg กับ ข้อความเทาเข้ม #101828 | 16.83 | ผ่าน | ผ่าน |
| โปร่งมีขอบ | `border/system/error` กับ พื้นขาว | **1.94** | ไม่เกี่ยว | **ไม่ผ่าน** |
| โปร่งมีขอบ | `border/system/warning` กับ พื้นขาว | **1.29** | ไม่เกี่ยว | **ไม่ผ่าน** |
| โปร่งมีขอบ | `border/system/success` กับ พื้นขาว | **1.52** | ไม่เกี่ยว | **ไม่ผ่าน** |

**สามข้อสรุปที่บังคับการออกแบบทันที `[ตีความ]`**

1. **ทรงทึบใช้ตัวหนังสือขาวตายตัวไม่ได้** ต้องมี token สีตัวอักษรต่อชนิด แบบที่ Polaris ทำ ไม่ใช่กฎเดียวทั้งชุด
2. **ทรงพื้นอ่อนห้ามใช้สีตระกูลเดียวกันเป็นสีตัวข้อความ** ต้องใช้ตัวหนังสือเทาเข้ม แล้วเก็บสีตระกูลไว้ให้ไอคอนกับขอบเท่านั้น
3. **ทรงโปร่งมีเส้นขอบใช้ขั้น 300 ไม่ได้** ถ้าจะทำทรงนี้ต้องใช้ขั้นที่เข้มกว่า ไม่งั้นขอบนั้นไม่นับเป็นสัญญาณตามข้อ 1.4.11

---

## 3. ก. เส้นแบ่งระหว่าง toast กับ banner

### 3.1 ชื่อที่แต่ละเจ้าใช้ (คำถามข้อ 1)

| เจ้า | ตัวที่ลอยและหายเอง | ตัวที่อยู่ในสายเนื้อหา | หมายเหตุ |
|---|---|---|---|
| **Material** | `Snackbar` | `Banner` (ยังมี token อยู่ แต่ไม่มี component ใน Material Web) | ใช้คำว่า snackbar ไม่ใช่ toast `[ทางการ]` |
| **IBM Carbon** | `ToastNotification` | `InlineNotification` และ `Callout` และ `ActionableNotification` | รวมทุกตัวไว้ใต้คำว่า Notification ชุดเดียว `[ทางการ]` |
| **Shopify Polaris** | `Toast` | `Banner` | คนละ component คนละไฟล์ `[ทางการ]` |
| **Adobe Spectrum** | `Toast` | `In-line alert` และ `Alert banner` | มี 3 ชื่อแยกกัน และ token แยก 3 ไฟล์ `[ทางการ]` |
| **Atlassian** | `Flag` และ `AutoDismissFlag` | `Banner` และ `SectionMessage` และ `InlineMessage` | ไม่ใช้คำว่า toast เลย `[ทางการ]` |
| **Ant Design** | `message` (เบา) และ `notification` (หนัก) | `Alert` และ `Alert banner` | แยกถึง 4 ชื่อ `[ทางการ]` |
| **GitHub Primer** | **ไม่มี** (`Toast` ถูกยกเลิก) | `Banner` (`Flash` ถูก deprecate ให้ย้ายมา Banner) | เจ้าเดียวที่ตัด toast ทิ้ง `[ทางการ]` |
| **Microsoft Fluent 2** | `Toast` | `MessageBar` | `[ทางการ]` |
| **Salesforce Lightning** | `slds-notify_toast` | `slds-notify_alert` (ระดับระบบ) และ `slds-scoped-notification` (ในกล่อง) | `[ทางการ]` |
| **Uber Base Web** | `Toast` | `Notification` | **เป็น component ตัวเดียวกัน** ต่างที่ prop `notificationType` `[ทางการ]` |
| **Pinterest Gestalt** | `Toast` และ `BannerOverlay` | `BannerCallout` และ `BannerSlim` และ `BannerUpsell` | ตระกูล banner มี 4 ตัว `[ทางการ]` |
| **Untitled UI** | `Notification` และ `Toast` (ใช้ปนกัน) | `Alert` | `[ทางการ]` |
| **Radix และ shadcn** | `Toast` (Radix) และ `sonner` (ที่ shadcn แนะนำตอนนี้) | `Callout` (Radix Themes) และ `Alert` (shadcn) | `[ทางการ]` |
| **Mantine** | `Notifications` ที่เรียกใช้ `Notification` | `Alert` | `[ทางการ]` |
| **Chakra UI v3** | `Toast` (Toaster) | `Alert` | `[ทางการ]` |

**นับคำที่ใช้ `[คำนวณ]`** ฝั่งลอย ใช้คำว่า `toast` 9 เจ้า `notification` 4 เจ้า `flag` 1 เจ้า `snackbar` 1 เจ้า ฝั่งอยู่กับที่ ใช้คำว่า `banner` 8 เจ้า `alert` 6 เจ้า `notification` 3 เจ้า `message` 2 เจ้า `callout` 3 เจ้า

**แปลว่า `toast` กับ `banner` คือคู่คำที่ตลาดใช้มากที่สุด** และตรงกับชื่อหน้า 19 ของเราอยู่แล้ว `[ตีความ]`

### 3.2 เกณฑ์ตัดสินว่าเมื่อไหร่ใช้ตัวไหน (คำถามข้อ 2)

| เจ้า | ข้อความ | ที่มา |
|---|---|---|
| **Microsoft Fluent 2** | message bar สื่อ "important information about the state of the entire product or the surface where it appears" ส่วน toast ใช้เมื่อ "the message is time-sensitive, but relates to an activity or status from a different location" | หน้า MessageBar usage `[ทางการ]` |
| **Microsoft Fluent 2** | "Don't use toasts for necessary actions. If you need the encourage people to take an action before moving forward, try a more forceful surface like a message bar or a dialog" | หน้า Toast usage `[ทางการ]` |
| **IBM Carbon** | toast คือ "non-modal, time-based window elements used to display short messages" ส่วน callout คือของที่ "highlight important information contextually within the contents of the page, and cannot be dismissed" | หน้า notification usage `[ทางการ]` |
| **IBM Carbon** | inline notification "show up in task flows to notify users of the status of an action" และ "do not dismiss automatically" | หน้า notification usage `[ทางการ]` |
| **Atlassian** | flag ใช้กับ "confirmations, alerts, and acknowledgments that require minimal user interaction" ส่วน "For critical messaging about loss of data or functionality use banners" | หน้า flag usage `[ทางการ]` |
| **Pinterest Gestalt** | toast คือ "brief and small messages that overlay content, but do not block the user's flow, as they are out of the way and ephemeral" และ "do not require user action" | `Toast.d.ts` `[ทางการ]` |
| **Pinterest Gestalt** | BannerSlim "conveys brief information related to a specific section of a page... Since they are about a specific section of a page or surface, BannerSlim sits inside of a container, and not at the top of the page. For alerts that apply to the whole page, use BannerCallout" | `BannerSlim.d.ts` `[ทางการ]` |
| **Pinterest Gestalt** | ใช้ BannerCallout หรือ BannerSlim แทน toast "For errors that relate to a specific section or page" | หน้า Toast `[ทางการ]` |
| **GitHub Primer** | ให้ใช้ banner แทน toast ในทุกกรณี สำหรับงานซับซ้อนให้ใช้ "banners or progressive disclosure that persist" และสำหรับงานยาวให้ใช้ "banners; consider email or push notifications" | หน้า accessibility เรื่อง toast `[ทางการ]` |
| **Adobe Spectrum** | "only automatically dismiss toasts when the information is not important, or may be found elsewhere" | React Spectrum Toast `[ทางการ]` |

**สรุปเกณฑ์ที่ใช้ตัดสินได้จริง 4 ข้อ `[ตีความ]`**

ถามตามลำดับนี้ ข้อแรกที่ตอบว่าใช่ คือคำตอบ

1. **ถ้าผู้ใช้พลาดข้อความนี้แล้วเสียหาย ใช้ banner** เพราะ toast หายเอง และ Primer ระบุปัญหาไว้ว่าผู้ใช้ "is given important information, but then has no way to go back and review the information"
2. **ถ้ามีงานที่ต้องทำก่อนไปต่อ ใช้ banner** ตามกฎ Fluent ที่ห้ามใช้ toast กับ necessary actions
3. **ถ้าข้อความผูกกับส่วนใดส่วนหนึ่งของหน้า ใช้ banner ที่วางตรงนั้น** ตามกฎ Gestalt เรื่อง BannerSlim
4. **ถ้าเหลือจากสามข้อข้างบน คือการยืนยันว่าทำสำเร็จแล้ว ใช้ toast**

### 3.3 มีเจ้าไหนรวมเป็นชิ้นเดียวกันไหม (คำถามข้อ 3)

**มี 1 เจ้าที่รวมจริงในระดับโค้ด คือ Uber Base Web** ไฟล์ `notification/notification.js` คือ class ที่ render `<Toast>` แล้วตั้ง `notificationType: TYPE.inline` กับ `closeable: false` เท่านั้น ไม่มีโค้ดอื่นเลย `[ทางการ]`

กลไกที่ Base Web ใช้แยกสองโหมดออกจากกันมี 3 จุด `[ทางการ]`

- พื้นหลัง โหมด toast ใช้ `toastInfoBackground` ที่ชี้ไป `backgroundAccent` (ทึบ) ส่วนโหมด inline ใช้ `notificationInfoBackground` ที่ชี้ไป `backgroundAccentLight` (พื้นอ่อน)
- เงา `boxShadow: isInline ? 'none' : shadow600`
- ค่าเริ่มต้นของปุ่มปิด toast เป็น `true` ส่วน inline เป็น `false`

**และมี 1 เจ้าที่รวมในระดับชื่อแต่แยกในระดับไฟล์ คือ IBM Carbon** ทั้ง 4 ตัวอยู่ใต้คำว่า Notification และอยู่ในไฟล์ React ไฟล์เดียวกัน (`Notification.js`) แต่เป็นคนละ function คนละ SCSS และ **ค่าเริ่มต้นของ role ต่างกัน** คือ toast กับ inline เป็น `status` ส่วน actionable เป็น `alertdialog` `[ทางการ]`

**เหตุผลที่เจ้าอื่นไม่รวม `[ตีความ]`** เพราะสองชิ้นนี้ต่างกันที่กลไก ไม่ได้ต่างกันแค่หน้าตา toast ต้องมีตัวจัดคิว ตัวจับเวลา ตัวจัดการโฟกัส และที่อยู่ลอยนอก DOM ปกติ ส่วน banner เป็นกล่องธรรมดาในสายเนื้อหา ถ้ารวมเป็น component เดียว ครึ่งหนึ่งของ prop จะไม่มีความหมายในอีกโหมด ซึ่งเห็นได้จาก Base Web เองที่ `Notification` ยังรับ `autoHideDuration` และ `placement` ได้ทั้งที่ไม่มีผล

**ข้อเสนอสำหรับเรา `[ตีความ]`** แยกเป็น 2 component แต่ให้ใช้ชุด token สี ไอคอน และชนิดเดียวกัน ซึ่งเป็นสิ่งที่ Base Web ได้ประโยชน์จริง โดยไม่ต้องรับภาระของการรวมโครงสร้าง

---

## 4. ข. Toast

### 4.1 ความกว้างและความสูง (คำถามข้อ 4)

| เจ้า | ความกว้าง | ความสูง | บนมือถือ |
|---|---|---|---|
| **Material (MDC web)** | `min-width: 344px` และ `max-width: 672px` | 48 (ระยะขอบบนล่าง 14 บวก line-height 20) `[คำนวณ]` | `@media (max-width: 480px)` ตั้ง `min-width: 100%` |
| **Material 3 (token)** | ไม่มี token ความกว้าง | `with-single-line-container-height: 48px` และ `with-two-lines-container-height: 68px` | ไม่มี token แยก |
| **IBM Carbon** | `inline-size: 288px` ตายตัว และ 352 ที่ breakpoint `max` | `block-size: auto` | ไม่มีกฎแยก |
| **Adobe Spectrum** | `toast-maximum-width` 336 เดสก์ท็อป และ **420 มือถือ** | `toast-height` 52 เดสก์ท็อป และ **60 มือถือ** | **มีชุดค่ามือถือแยกครบทุก token** |
| **Shopify Polaris** | `max-width: 31.25rem` (500) กว้างตามเนื้อหา | ตามเนื้อหา padding `space-300` | ไม่มีกฎแยกในไฟล์ |
| **Atlassian Flag** | `width: 25pc` (400) ตายตัว | ตามเนื้อหา padding `space.200` (16) | `@media (max-width: 560px)` เป็น `width: 100vw` และ inset 0 |
| **Ant notification** | `width: 384` ตายตัว | ตามเนื้อหา | `width: 100%` เมื่อแคบ |
| **Ant message** | ตามเนื้อหา จัดกลางบน | ระยะขอบบนล่าง `(controlHeightLG - fontSize x lineHeight) / 2` | ไม่มีกฎแยก |
| **Microsoft Fluent 2** | `width: 292px` ตายตัวที่ตัว Toaster | ตามเนื้อหา padding 12 | ไม่มีกฎแยกในไฟล์ |
| **Salesforce Lightning** | `min-width: 30rem` (480) | ตามเนื้อหา padding 12 บน 48 ขวา 12 ล่าง 24 ซ้าย | `.slds-region_narrow` ตั้ง `min-width: auto` และ `width: 100%` |
| **Uber Base Web** | `width: 288px` ตายตัว | ตามเนื้อหา padding `scale600` ทุกด้าน | ไม่มีกฎแยก |
| **Pinterest Gestalt** | `max-width: min(716px, 100vw)` | `minHeight: 60` | มี margin ซ้ายขวา `space-400` เสมอ จึงเต็มจอลบขอบ |
| **Untitled UI** | **504 เดสก์ท็อป และ 544 สำหรับแบบมีรูป** | ไม่ระบุ | **375 สำหรับทุกแบบ** |
| **sonner (shadcn)** | `TOAST_WIDTH = 356` | ตามเนื้อหา padding 16 | `@media (max-width: 600px)` เป็น `width: calc(100% - mobile-offset x 2)` |
| **Mantine** | `containerWidth` ค่าเริ่มต้น **440** เป็น max-width | `notificationMaxHeight` 200 (ใช้กับ transition) | `width: calc(100% - spacing-md x 2)` |
| **Chakra และ Zag** | `width: full` ตามกล่อง | ตามเนื้อหา `py: 4` | ตามกล่อง |
| **Radix** | ไม่กำหนด (ผู้ใช้เขียน CSS เอง) | ไม่กำหนด | ไม่กำหนด |

**สรุป `[คำนวณ]`**

- **ความกว้างตายตัวคือค่าเริ่มต้น** 8 จาก 14 เจ้าที่กำหนดความกว้างใช้ค่าตายตัว ส่วน 4 เจ้าใช้ max-width แล้วให้เนื้อหาหด
- **ค่าที่พบ** 288, 288, 292, 336, 356, 384, 400, 440, 480, 500, 504, 716 **มัธยฐานอยู่ที่ 392** และ **ฐานนิยมอยู่ที่ช่วง 288 ถึง 400**
- **บนมือถือ 6 เจ้าเปลี่ยนเป็นเต็มความกว้าง** โดยจุดตัดอยู่ที่ 480 (Material), 560 (Atlassian), 600 (sonner) และอีก 3 เจ้าใช้กลไกอื่น
- **มีเจ้าเดียวที่โตขึ้นบนมือถือแทนที่จะเต็มจอ คือ Spectrum** จาก 336 เป็น 420 และความสูงจาก 52 เป็น 60 ซึ่งคือการเผื่อนิ้ว ไม่ใช่การเผื่อจอ
- **ความสูงไม่ใช่ค่าตายตัวในเกือบทุกเจ้า** มีแค่ Material 3 (48 และ 68) กับ Spectrum (52 และ 60) ที่ประกาศเป็น token และทั้งสองเจ้าประกาศแยกตามจำนวนบรรทัด ไม่ใช่แยกตามขนาด

### 4.2 ตำแหน่งบนจอ (คำถามข้อ 5)

| เจ้า | ค่าเริ่มต้น | ตัวเลือกทั้งหมด | ระยะห่างจากขอบ |
|---|---|---|---|
| **Material** | ล่างซ้ายหรือล่างกลาง | ยึดกับ view อื่นได้ด้วย `setAnchorView` | `viewport-margin-narrow: 8px` และ `viewport-margin-wide: 24px` |
| **IBM Carbon** | **บนขวา** | ไม่มีตัวเลือกในโค้ด | ไม่ระบุ |
| **Adobe Spectrum** | **ล่างกลาง** | `top`, `top end`, `bottom`, `bottom end` (4 ตำแหน่ง) | ไม่ระบุ |
| **Shopify Polaris** | **ล่างกลาง** | ไม่มีตัวเลือก | ยึด `--pc-frame-global-ribbon-height` |
| **Atlassian** | **ล่างซ้าย** | ไม่มีตัวเลือก | `inset-block-end: space.600` (48) และ `inset-inline-start` 80 หรือ 48 |
| **Ant message** | **บนกลาง** | ตั้ง `top` ได้ | `left: 50%` กับ `translateX(-50%)` |
| **Ant notification** | **บนขวา** | 4 มุมและ บน ล่าง (6 ตำแหน่ง) | ไม่ระบุในไฟล์ที่อ่าน |
| **Microsoft Fluent 2** | **ล่างขวา** (`bottom-end`) | 6 ตำแหน่ง | `horizontal: 20` และ `vertical: 16` และมุมกลางใช้ horizontal 0 |
| **Salesforce Lightning** | **บนกลาง** | ไม่มีตัวเลือก | container `position: fixed; top: 0` เต็มความกว้าง แล้ว toast `margin: 0.5rem` |
| **Uber Base Web** | **บนกลาง** (`PLACEMENT.top`) | 6 ตำแหน่ง | `marginTop` และ `marginBottom` `scale300` กับ `marginLeft` และ `marginRight` `scale600` |
| **Pinterest Gestalt** | **"center of the viewport, opposite the main navbar"** คือ **บนสุดบนมือถือ และ ล่างสุดบนเดสก์ท็อป** | ไม่มีตัวเลือก | margin ซ้ายขวา `space-400` |
| **sonner** | **ล่างขวา** | 6 ตำแหน่ง | `VIEWPORT_OFFSET: 24px` และ `MOBILE_VIEWPORT_OFFSET: 16px` |
| **Mantine** | **ล่างขวา** | 6 ตำแหน่ง | `spacing-md` ทุกด้าน |
| **Chakra และ Zag** | **ล่าง** (`placement: 'bottom'`) | 6 ตำแหน่ง | `gap: 16` |
| **Radix** | ผู้ใช้กำหนดเองด้วย CSS บน Viewport | ไม่จำกัด | ไม่กำหนด |

**นับคะแนน `[คำนวณ]`** ล่างกลางหรือล่าง 4 เจ้า และ ล่างขวา 3 เจ้า และ บนกลาง 3 เจ้า และ บนขวา 2 เจ้า และ ล่างซ้าย 1 เจ้า และ ไม่กำหนด 2 เจ้า **ไม่มีฉันทามติ แต่ฝั่งล่างชนะฝั่งบน 8 ต่อ 5**

**ข้อค้นพบที่ใช้ได้กับเราโดยตรง `[ทางการ]`** Gestalt เป็นเจ้าเดียวที่ประกาศกฎเป็นหลักการแทนที่จะเป็นตำแหน่ง คือ **ให้วางตรงข้ามกับแถบนำทางหลัก** ซึ่งแปลว่าบนมือถือที่แถบนำทางอยู่บน toast ต้องอยู่ล่าง และบนเดสก์ท็อปที่ Pinterest มีแถบด้านซ้าย toast จึงอยู่ล่าง **กฎนี้สำคัญกับเว็บข่าว** เพราะเว็บเรามีแถบหัวติดบนทุกเว็บ `[ตีความ]`

### 4.3 การซ้อนและคิว (คำถามข้อ 6)

| เจ้า | จำนวนที่เห็นพร้อมกัน | ใบใหม่มาจากไหน | มีคิวไหม |
|---|---|---|---|
| **Material** | **1** ("Only one snackbar will be shown at a time. Showing a new snackbar will dismiss any previous ones first") | แทนที่ใบเดิม | ไม่มี แทนที่เลย |
| **IBM Carbon** | ไม่จำกัด ซ้อนห่าง `$spacing-03` (8) | เอกสารไม่ระบุทิศ | ไม่มีตัวจัดการในแพ็กเกจ |
| **Adobe Spectrum** | ซ้อนได้ "with the most recent toast appearing at the bottom of the stack" | **ใบใหม่อยู่ล่างสุด** | มี ToastQueue |
| **Shopify Polaris** | ไม่จำกัด แต่ใบหลัง ๆ หดและเบลอ (`scale = 0.9 ^ n` และ `blur = n x 0.5px`) **แล้วกางออกเมื่อเอาเมาส์ชี้** | **ใบใหม่อยู่หน้าสุด** ใบเก่าถอยไปข้างหลัง | ไม่มีคิว แสดงหมด |
| **Atlassian** | **3** (ตัวที่ index ตั้งแต่ 3 ขึ้นไปตั้ง `visibility: hidden`) | **ใบใหม่อยู่บนสุด** | มี **และดุที่สุด คือ ปิดได้เฉพาะใบแรกเท่านั้น** (`isDismissAllowed = index === 0`) |
| **Ant notification** | **3** (`DEFAULT_COLLAPSED_STACK_VISIBLE_COUNT = 3`) | ตามทิศของ placement | มี `stackVisibleCount` |
| **Microsoft Fluent 2** | **4** ("Don't show more than four toasts in a toaster and keep 16 pixels of space between them") | ตามทิศของ position | **มีคิวจริง** มี `limit` และ `priority` และสถานะ `queued` |
| **Uber Base Web** | ไม่จำกัด | ตามทิศของ placement | ไม่มี |
| **Pinterest Gestalt** | **1** ("Show one Toast at a time, with errors and acknowledgements taking priority") | แทนที่ | ไม่มีในโค้ด |
| **sonner** | **3** (`VISIBLE_TOASTS_AMOUNT = 3`) ห่าง `GAP = 14` | **ใบใหม่อยู่หน้าสุด** ใบเก่าถอยหลังแบบซ้อนไพ่ | ไม่มีคิว ซ่อนส่วนเกิน |
| **Mantine** | **5** (`limit` ค่าเริ่มต้น 5) ห่าง `spacing-md` | ตามทิศของ position | **มีคิวจริง** "other new notifications will be added to queue" และมี `cleanQueue()` |
| **Chakra และ Zag** | **24** (`max: 24`) ห่าง `gap: 16` | ตามทิศ | มี `max` |
| **Radix** | ไม่จำกัด | ตามลำดับใน `<ol>` | ไม่มี |

**สรุป `[คำนวณ]`** ค่าที่ประกาศคือ 1, 1, 3, 3, 3, 4, 5, 24 **มัธยฐานอยู่ที่ 3** และ **3 คือค่าที่พบบ่อยที่สุด** (3 เจ้า)

**แบบแผนการซ้อนที่พบ 3 แบบ `[ตีความ]`**

- **แบบรายการ** ซ้อนเรียงลงมาเต็มใบทุกใบ (Carbon, Fluent, Mantine, Base Web) ง่ายที่สุด แต่กินที่จอมากเมื่อมี 3 ถึง 4 ใบ
- **แบบซ้อนไพ่** ใบหน้าเต็มใบ ใบหลังโผล่ขอบ แล้วกางเมื่อชี้ (Polaris, sonner, Ant) สวยและกินที่น้อย แต่ซับซ้อนที่สุด Polaris ถึงกับใส่ `filter: blur()` ไล่ตามลำดับ
- **แบบแทนที่** ใบใหม่ไล่ใบเก่าออก (Material, Gestalt) ง่ายและไม่มีวันบังจอ แต่ผู้ใช้อาจพลาดข้อความ

**ข้อสังเกตที่ควรเอามาใช้ `[ทางการ]`** Atlassian ทำสิ่งที่ไม่มีใครทำ คือ **ล็อกให้ปิดได้เฉพาะใบบนสุด** เพื่อไม่ให้ลำดับกระโดด และ **ห้ามปนใบที่หายเองกับใบที่ไม่หายเองในกองเดียวกัน** โดยเขียนไว้ว่า "Never use dismissible and non-dismissible flags in a stack"

### 4.4 เวลาหายเอง (คำถามข้อ 7)

| เจ้า | ค่าเริ่มต้น | ต่างตามชนิดไหม | ต่างตามความยาวข้อความไหม | ชนิดข้อผิดพลาดหายเองไหม |
|---|---|---|---|---|
| **Material (MDC)** | **5000** (`DEFAULT_AUTO_DISMISS_TIMEOUT_MS`) และบังคับช่วง `MIN 4000` ถึง `MAX 10000` | ไม่ | ไม่ แต่มี `INDETERMINATE: -1` ให้ค้างไว้ | ใช่ ถ้าไม่ตั้ง indefinite |
| **Material (Android)** | `LENGTH_SHORT` `LENGTH_LONG` `LENGTH_INDEFINITE` (**เอกสารไม่ได้เผยแพร่เป็นมิลลิวินาที หาไม่เจอ**) | ไม่ | ไม่ | ใช่ |
| **IBM Carbon** | **0 แปลว่าไม่หายเอง** (`timeout = 0` ใน `ToastNotification`) เอกสารบอกว่า "can be coded to dismiss automatically after five seconds" | ไม่ | ไม่ | **ไม่หายเอง ตามค่าเริ่มต้น** |
| **Adobe Spectrum** | **ขั้นต่ำ 5000** "For accessibility, toasts have a minimum timeout of 5 seconds" | ไม่ | ไม่ | **ตัวที่มีปุ่มกระทำไม่หายเองเลย** ("actionable toasts will not auto dismiss") |
| **Shopify Polaris** | **5000** และ **10000 เมื่อมีปุ่มกระทำ** (`DEFAULT_TOAST_DURATION_WITH_ACTION`) | ไม่ | ไม่ | ใช่ |
| **Atlassian** | **8000** (`AUTO_DISMISS_SECONDS = 8`) พร้อมคอมเมนต์ว่า "For a11y reasons 8s is also a strongly-suggested minimum" | ไม่ | ไม่ | **ห้ามใช้ auto dismiss กับ critical** ("Never use auto dismiss flags for any critical warning or error messages") |
| **Ant message** | **3000** | ไม่ | ไม่ | ใช่ |
| **Ant notification** | **4500** | ไม่ | ไม่ | ใช่ |
| **Microsoft Fluent 2** | **โค้ด 3000 แต่เอกสารบอก 7 วินาที** ("If there is no action to take, toast will time out after seven seconds") | ไม่ | ไม่ | ใช่ เว้นแต่ตั้งเป็น conditional |
| **Uber Base Web** | **0 แปลว่าไม่หายเอง** (`autoHideDuration: 0`) | ไม่ | ไม่ | ไม่ |
| **Pinterest Gestalt** | **ขั้นต่ำ 5000** และมีสูตร "duration should equal word count divided by 200" **และมี cooldown 7 วินาทีก่อนเรียกซ้ำ** | ไม่ | **ใช่ เจ้าเดียวที่ทำ** | ใช่ แต่ให้ลำดับความสำคัญสูงกว่า |
| **Untitled UI** | **4000 ถึง 6000** และ "no auto-dismiss at all when the toast holds something the user cannot get back" | ไม่ | ไม่ | ขึ้นกับว่าย้อนดูได้ไหม |
| **Radix** | **5000** (`duration = 5e3`) และรับ `Infinity` ได้ | ไม่ | ไม่ | ใช่ |
| **sonner** | **4000** (`TOAST_LIFETIME`) และรับ `Infinity` ได้ | ไม่ | ไม่ | ใช่ |
| **Mantine** | **4000** (`autoClose` ค่าเริ่มต้น 4000 และรับ `false` ได้) | ไม่ | ไม่ | ใช่ |
| **Chakra และ Zag** | **info 5000 และ error 5000 และ warning 5000 และ success 2000 และ loading Infinity** | **ใช่ เจ้าเดียวที่ตั้งค่าต่อชนิดในโค้ด** | ไม่ | **ใช่ และใช้เวลาเท่ากับ info** |

**สรุป `[คำนวณ]`** ค่าที่ใช้จริงคือ 2000, 3000, 3000, 4000, 4000, 4500, 5000, 5000, 5000, 5000, 7000, 8000 บวกอีก 2 เจ้าที่ตั้งเป็น 0 **มัธยฐาน 5000** และ **5000 คือค่าที่ซ้ำมากที่สุด**

**สามกลไกที่เจ้าใหญ่ใช้แก้ปัญหา toast ที่มีปุ่ม `[ทางการ]`**

| กลไก | ใครทำ | รายละเอียด |
|---|---|---|
| ยืดเวลาเป็นสองเท่า | Shopify Polaris | 5000 เป็น 10000 และ **พิมพ์คำเตือนลง console** ถ้าคนตั้งเองต่ำกว่านั้น ว่า "Toast with action should persist for at least 10,000 milliseconds to give the merchant enough time to act on it" |
| ไม่ให้หายเองเลย | Adobe Spectrum | "actionable toasts will not auto dismiss" |
| เปลี่ยนไปใช้ชิ้นอื่น | Fluent 2, Primer | ถ้าต้องให้คนทำอะไร ให้ใช้ message bar หรือ dialog แทน |

**ข้อสังเกตเรื่องชนิดข้อผิดพลาด `[คำนวณ]`** จาก 14 เจ้า มี **3 เจ้าที่ห้ามหรือไม่ให้ error หายเอง** (Atlassian ห้ามตรง ๆ, Carbon ตั้งไม่หายเองเป็นค่าเริ่มต้น, Base Web ตั้งไม่หายเอง) และ **1 เจ้าที่ตัดสินด้วยการมีปุ่มแทนการตัดสินด้วยชนิด** (Spectrum) ที่เหลือ 10 เจ้าให้ error หายเองเหมือนชนิดอื่น **แปลว่าเสียงข้างมากของตลาดคือให้ error หายเอง แต่เสียงข้างน้อยมีเหตุผลที่แข็งแรงกว่า** `[ตีความ]`

### 4.5 ปุ่ม ไอคอน และบรรทัดที่สอง (คำถามข้อ 8)

| เจ้า | ปุ่มกระทำสูงสุด | ปุ่มปิด | ไอคอน | ข้อความรอง |
|---|---|---|---|---|
| **Material** | **1** (`setAction`) | **มี แต่ไม่ใช่ค่าเริ่มต้น** (`setCloseIconVisible(true)`) | ไม่มีในกายวิภาค | มี (two-line container 68) |
| **IBM Carbon** | **1** ("Only one action is allowed for each notification") | มีเสมอ ซ่อนได้ด้วย `hideCloseButton` | **มีเสมอ** ตามชนิด | **มี 2 ชั้น** คือ `subtitle` และ `caption` |
| **Adobe Spectrum** | 1 | มี มีเส้นคั่นกั้นปุ่มปิดออกจากเนื้อหา (`toast-divider`) | **มี** `workflow-icon` | ไม่มี token แยก |
| **Shopify Polaris** | **1** (`action`) | **มีเสมอ** (`dismissMarkup` ไม่มีเงื่อนไข) | มี แต่เป็นตัวเลือก และบังคับเป็น `AlertCircleIcon` เมื่อ `error` | ไม่มี ข้อความชั้นเดียว |
| **Atlassian Flag** | ไม่จำกัดจำนวนในชนิดข้อมูล แต่ `SectionMessage` เขียนว่า "In general, avoid using more than two actions" | มี **ยกเว้นเมื่อ appearance ไม่ใช่ normal** ("Setting this to anything other than 'normal' hides the dismiss button") | **มี ถ้าไม่ใส่จะเติมให้ตาม appearance** | **มี** `description` |
| **Ant notification** | ไม่จำกัด (`btn` รับ ReactNode) | มี | มี ตาม `type` | **มี** `description` |
| **Microsoft Fluent 2** | รับได้ผ่าน `ToastFooter` | มี (ผ่าน `ToastTrigger`) | มี (`ToastTitle` มี media slot) | **มี** `ToastBody` แยกจาก `ToastTitle` |
| **Salesforce Lightning** | รับลิงก์ในเนื้อความ | **มีเสมอ** วางลอยที่มุมขวาบน `top: 0.75rem; right: 0.75rem` และจองที่ไว้ด้วย `padding-right: 3rem` | มี (`slds-icon`) | มี |
| **Uber Base Web** | รับ ReactNode | `closeable: true` | ไม่มีในกายวิภาค | ไม่มี |
| **Pinterest Gestalt** | **1** และเขียนกำกับว่า "Generally not recommended given the ephemeral nature of Toasts" | เป็นตัวเลือก ให้ใส่ "when it is actionable or contains multiple lines of text" | **มี 3 แบบ** `image` หรือ `avatar` หรือ `icon` | มี `helperLink` ต่อท้ายข้อความ |
| **sonner** | **2** (`action` และ `cancel`) | มี เปิดด้วย `closeButton` | มี มีไอคอนประจำชนิดและ loading | **มี** `description` |
| **Mantine** | ไม่จำกัด (children) | `withCloseButton: true` | มี ถ้าไม่ใส่จะใช้แถบสีแทน | **มี** `children` ใต้ `title` |
| **Chakra และ Zag** | **1** (`actionTrigger`) | มี (`closeTrigger` ลอยมุมขวาบน) | มี (`indicator` ขนาด `boxSize: 5`) | **มี** `description` |
| **Radix** | **1** (`ToastAction`) | **1** (`ToastClose`) | ผู้ใช้ใส่เอง | มี (`ToastDescription`) |

**สรุป `[คำนวณ]`** **ปุ่มกระทำ 1 ปุ่มคือกติกา** 8 เจ้าจำกัดไว้ที่ 1 และมีแค่ sonner ที่ให้ 2 โดยตัวที่สองคือปุ่มยกเลิก ไม่ใช่ปุ่มกระทำที่สอง **ปุ่มปิดมี 13 จาก 14 เจ้า** และ 4 เจ้าใส่ให้เสมอโดยไม่มีตัวเลือกปิด **ไอคอน 11 จาก 14 เจ้ามี** และ 2 เจ้าเติมให้อัตโนมัติตามชนิด **ข้อความรอง 10 จาก 14 เจ้ามี** และ Carbon มี 2 ชั้น

**ข้อค้นพบที่ชนกับความคาดหวังทั่วไป `[ทางการ]`** Gestalt เขียนไว้ตรง ๆ ว่าปุ่มใน toast "generally not recommended" และให้ "Make interaction optional and secondary" ส่วน Fluent ห้ามใช้ toast กับงานที่ต้องทำ **แปลว่าตลาดมีปุ่มให้ใส่ได้ แต่ไม่อยากให้ใส่** `[ตีความ]`

### 4.6 แกนขนาดของ toast (คำถามข้อ 9)

**ไม่มีเจ้าไหนทำแกนขนาด sm md lg ให้ toast เลยสักเจ้าใน 15 เจ้าที่ตรวจ** `[คำนวณ]`

สิ่งที่คนมักเข้าใจว่าเป็นขนาด แต่จริงแล้วเป็นมิติอื่น มี 4 แบบ

| สิ่งที่เห็น | เจ้าที่ทำ | จริง ๆ แล้วคือ |
|---|---|---|
| 48 เทียบ 68 | Material 3 | **จำนวนบรรทัด** ไม่ใช่ขนาด |
| 52 เทียบ 60 และ 336 เทียบ 420 | Adobe Spectrum | **เดสก์ท็อปเทียบจอสัมผัส** |
| 504 เทียบ 375 | Untitled UI | **เดสก์ท็อปเทียบมือถือ** |
| แถวเดียวเทียบแบบซ้อน (`mdc-snackbar--stacked`) | Material MDC | **ผังของปุ่ม** เมื่อปุ่มไม่พอที่จะอยู่แถวเดียวกับข้อความ |

**ข้อเสนอที่ตามมา `[ตีความ]`** ถ้าเราจะทำแกนขนาดให้ toast เราจะเป็นเจ้าแรกที่ทำ ซึ่งอาจไม่ใช่เรื่องผิด แต่ต้องตอบให้ได้ว่า **ขนาดเล็กกับขนาดใหญ่มีไว้ใช้ที่งานต่างกันอย่างไร** ถ้าตอบไม่ได้ ควรทำมิติที่ตลาดทำแทน คือ **จำนวนบรรทัด** และ **เดสก์ท็อปเทียบมือถือ** ซึ่งตอบคำถามที่มีอยู่จริง ดูข้อ 12.3

---

## 5. ค. Banner

### 5.1 ความกว้างและระดับ (คำถามข้อ 10)

| เจ้า | ระดับที่มี | ความกว้างต่อระดับ | วิธีแยกระดับด้วยสายตา |
|---|---|---|---|
| **Material** | 1 (`Banner`) | เต็มความกว้างของที่วาง | `container-shape: corner-none` และมี `divider-height: 1px` คั่นด้านล่าง |
| **IBM Carbon** | 3 (`Callout` ในเนื้อหา และ `InlineNotification` และ `ActionableNotification`) | `min-inline-size: 288px` และ `max-inline-size` ไล่ตาม breakpoint คือ **288 และ 608 และ 736 และ 832** | เส้นขอบซ้ายหนา 6 (หรือ 3 ในโหมดใหม่) บวกขอบรอบ 1 |
| **Adobe Spectrum** | 2 (`Alert banner` ระดับหน้า และ `In-line alert` ในกล่อง) | alert banner **832 เดสก์ท็อป และ 680 มือถือ แบบตายตัว** ส่วน in-line alert `min-inline-size: 240` | alert banner สูงอย่างน้อย 56 เดสก์ท็อป และ 64 มือถือ ส่วน in-line alert มีขอบหนา 2 |
| **Shopify Polaris** | **2** (`withinPage` และ `withinContentContainer`) บวกผัง `InlineIconBanner` เมื่อไม่มีหัวข้อ | `width: 100%` ทั้งคู่ | **ระดับหน้าใช้พื้นทึบ `bg-fill-*` และมุมโค้งเฉพาะด้านบน ส่วนในกล่องใช้พื้นอ่อน `bg-surface-*` และมุมโค้งครบสี่มุม** |
| **Atlassian** | **3** (`Banner` ระดับจอ และ `SectionMessage` ระดับส่วน และ `InlineMessage` ระดับจุด) | Banner เต็มความกว้าง **สูงตายตัว 48** (`height: 3rem`) ส่วน SectionMessage เต็มกล่อง | Banner พื้นทึบ มุมเหลี่ยม ข้อความบรรทัดเดียวตัดด้วยจุดไข่ปลา ส่วน SectionMessage พื้นอ่อน มุมโค้ง 8 padding 16 |
| **Ant Design** | **2** (`Alert` ปกติ และ `Alert banner`) | เต็มกล่อง | โหมด banner ตั้ง `border: 0 !important` และ `borderRadius: 0` |
| **GitHub Primer** | **2 ถึง 3** (`layout: default` หรือ `compact` และ `flush` สำหรับ "confined spaces, such as dialogs, tables, cards, or boxes") | เต็มกล่อง | `flush` ตัดมุมโค้งและขอบ ส่วน `compact` "will reduce the padding" |
| **Microsoft Fluent 2** | **2** (`shape: square` ระดับหน้า และ `rounded` ระดับ component) | เต็มกล่อง `min-height: 36px` | **"Use square for page level messages and rounded for component level messages"** |
| **Salesforce Lightning** | **2** (`slds-notify_alert` ระดับระบบ และ `slds-scoped-notification` ในกล่อง) | alert `width: 100%` จัดข้อความกลาง ส่วน scoped padding 12 | alert มีลายทแยงจาง ๆ เป็น `background-image` ส่วน scoped เป็นพื้นเรียบ light หรือ dark |
| **Uber Base Web** | 1 (`Notification`) | **`width: 288px`** ซึ่งเท่ากับ toast | ไม่มีเงา |
| **Pinterest Gestalt** | **4** (`BannerCallout` ระดับหน้า และ `BannerSlim` ระดับส่วน และ `BannerSlim` แบบ `Bare` ในสายข้อความ และ `BannerOverlay` ลอย) | เต็มกล่อง | **`Bare` ตั้ง `color: transparent` และ `paddingX: 0` และ `paddingY: 0`** คือไม่มีกล่องเลย เหลือแต่ไอคอนกับข้อความ |
| **Mantine** | 1 (`Alert`) | เต็มกล่อง | แยกด้วย `variant` 6 แบบ |
| **Chakra UI v3** | 1 (`Alert`) | `width: full` | แยกด้วย `variant` 4 แบบ และ `size` 3 ขนาด |

**สรุป `[คำนวณ]`** **10 จาก 13 เจ้าแยกอย่างน้อย 2 ระดับ** และ **วิธีแยกที่พบบ่อยที่สุดคือมุมโค้ง** (Fluent, Polaris, Ant, Primer, Material) รองลงมาคือความเข้มของพื้น (Polaris, Base Web, SLDS)

**ข้อค้นพบที่ขัดกับสัญชาตญาณ `[ทางการ]`** Spectrum กำหนด `alert-banner-width` เป็นค่าตายตัว 832 ไม่ใช่ 100% ซึ่งแปลว่า Spectrum มอง alert banner เป็นกล่องที่จัดกลางในหน้า ไม่ใช่แถบที่พาดขอบจอ `[ตีความ]`

### 5.2 ปิดได้หรือคาอยู่ (คำถามข้อ 11)

| เจ้า | ค่าเริ่มต้น | ชนิดที่ห้ามปิด | ข้อความ |
|---|---|---|---|
| **Atlassian Banner** | **ปิดไม่ได้เลย ไม่มี prop ให้ปิด** | ทุกชนิด | "Banners should appear one at a time, are not dismissible, and only disappear when no longer required" `[ทางการ]` |
| **IBM Carbon Callout** | **ปิดไม่ได้เลย ไม่มี prop ให้ปิด** | ทุกชนิด | "Callouts are used to highlight important information contextually within the contents of the page, and cannot be dismissed" `[ทางการ]` |
| **IBM Carbon Inline** | ปิดได้ ซ่อนปุ่มได้ด้วย `hideCloseButton` | ไม่ระบุ | inline notification "do not dismiss automatically" `[ทางการ]` |
| **Microsoft Fluent 2** | **"Message bars are always dismissible with a Close button (X)"** | ไม่มี | **แต่ปิดแล้วไม่หายถาวร** คำเตือนและข้อผิดพลาด "will reappear in their next session and continue to reappear until action is taken" `[ทางการ]` |
| **Shopify Polaris** | `onDismiss` เป็นตัวเลือก | **ชนิดที่มีข้อมูลจำเป็น** | "Banners should be made dismissible, unless they contain critical information or an important step that customers need to take" `[ทางการ]` |
| **Pinterest Gestalt** | `dismissButton` เป็นตัวเลือก | **เมื่อมีสถานะค้างหรือมีงานต้องทำ** | "Don't use dismiss buttons" เมื่อผู้ใช้ต้องอ่านเพื่อทำงานให้จบ `[ทางการ]` |
| **GitHub Primer** | ไม่มีปุ่มปิด จนกว่าจะส่ง `onDismiss` ("Providing this prop will show a dismiss button") | เอกสารไม่ได้ห้ามชนิดไหน | `[ทางการ]` |
| **Ant Design Alert** | `closable` ค่าเริ่มต้น **ไม่ปิด** | ไม่ระบุ | `[ทางการ]` |
| **Mantine Alert** | `withCloseButton` ค่าเริ่มต้น **false** | ไม่ระบุ | `[ทางการ]` |
| **Atlassian SectionMessage** | `isDismissible` เป็นตัวเลือก และ **ไม่จำสถานะข้ามรอบ** ("It does not handle persistence of the dismissed state across page reloads or remounts") | ไม่ระบุ | `[ทางการ]` |
| **Adobe Spectrum In-line alert** | ไม่มีปุ่มปิดใน Spectrum CSS | ทุกชนิด | `[ทางการ]` |
| **Uber Base Web Notification** | **`closeable: false`** | ไม่ระบุ | `[ทางการ]` |
| **Chakra Alert** | ไม่มี slot ปุ่มปิดใน recipe | ไม่ระบุ | `[ทางการ]` |

**นับคะแนน `[คำนวณ]`** **ปิดไม่ได้เลย 4 เจ้า** และ **ปิดได้แต่ค่าเริ่มต้นคือไม่มีปุ่ม 5 เจ้า** และ **ปิดได้เสมอ 1 เจ้า (Fluent)** และ มีกฎว่าชนิดสำคัญห้ามปิด 2 เจ้า

**กฎที่ใช้ได้จริง `[ตีความ]`** เสียงข้างมากคือ **banner ไม่มีปุ่มปิดจนกว่าจะมีเหตุผลให้มี** ไม่ใช่ตรงกันข้าม และกฎที่เขียนไว้ตรงกันที่สุดคือ **ถ้า banner นั้นบอกว่ามีงานค้างอยู่ ปิดไม่ได้** เพราะปิดแล้วงานก็ยังค้าง **และถ้าจะให้ปิดได้ ต้องตอบด้วยว่าปิดแล้วกลับมาอีกไหม** ซึ่ง Fluent ตอบว่ากลับมา และ Atlassian บอกตรง ๆ ว่าตัวเองไม่จำสถานะให้

### 5.3 ตำแหน่งปุ่มกระทำและข้อความหลายบรรทัด (คำถามข้อ 12)

| เจ้า | ปุ่มอยู่ไหน | จุดตัดที่ย้ายลงล่าง | กลไก |
|---|---|---|---|
| **GitHub Primer** | `actionsLayout` สามค่า คือ `inline` และ `stacked` และ `default` | **`@container banner (max-width: 500px)`** | **container query** ต่ำกว่า 500 ปุ่มลงแถวใหม่ สูงกว่า 500 ปุ่มอยู่แถวเดียวกับหัวข้อ |
| **Microsoft Fluent 2** | `layout` สามค่า คือ `auto` และ `singleline` และ `multiline` | **เมื่อเนื้อหาล้นแถวเดียว** | **ResizeObserver** ที่จำความกว้างตอนยังอยู่แถวเดียวได้ แล้วสลับกลับเมื่อกว้างพอ เอกสารบอกว่าเกิน 2 บรรทัดแล้ว "actions below the body" อ่านง่ายกว่า |
| **Shopify Polaris** | **ใต้ข้อความเสมอ ไม่มีเงื่อนไข** ส่วนปุ่มปิดอยู่ขวาบนของแถวหัวข้อ | ไม่มี | โครง `BlockStack` สองก้อน ก้อนบนคือหัวข้อกับปุ่มปิด ก้อนล่างคือเนื้อหากับปุ่ม |
| **Atlassian SectionMessage** | **ใต้ข้อความเสมอ** เป็น link button และ **มีจุดกลางคั่นให้อัตโนมัติเมื่อมีหลายปุ่ม** | ไม่มี | `Inline` ที่ `space.100` และ `rowSpace: space.0` |
| **Material (banners rich)** | **ใต้ข้อความ ชิดขวา** ห่างกัน `actions-between-space: 8px` และเว้น `actions-top-space: 12px` | ไม่มี | และ **จองที่ให้ปุ่มปิดด้วย `body-text-trailing-space: 48px`** |
| **Ant Design Alert** | **ขวาสุดในแถวเดียวกัน** (`actions` ตั้ง `marginInlineStart: marginXS`) | ไม่มี | ไม่ย้าย |
| **IBM Carbon** | **ต่างกันตามชนิด** inline ใช้ปุ่ม `ghost` อยู่ในแถว ส่วน toast ใช้ปุ่ม `tertiary` ที่วางลงล่าง | ตามชนิด | `kind: inline ? "ghost" : "tertiary"` |
| **Pinterest Gestalt** | `primaryAction` และ `secondaryAction` | เอกสารไม่ระบุจุดตัดเป็นตัวเลข **หาไม่เจอ** | |
| **Chakra Alert** | `inline` เป็น variant boolean ที่สลับ `content` ระหว่าง `inline-flex` แนวนอน กับ `flex` แนวตั้ง | **ไม่อัตโนมัติ ต้องสั่งเอง** | |

**สรุป `[คำนวณ]`** **2 เจ้ามีกลไกย้ายอัตโนมัติ** และกลไกคนละแบบกัน Primer วัดความกว้างของกล่อง ส่วน Fluent วัดว่าเนื้อหาล้นหรือยัง **4 เจ้าวางไว้ใต้ข้อความตลอดโดยไม่มีเงื่อนไข** และ **2 เจ้าวางไว้ขวาตลอด**

**ข้อค้นพบที่ใช้ได้ทันที `[ตีความ]`** **ทางที่ง่ายที่สุดและมีเจ้าใหญ่รองรับมากที่สุด คือวางปุ่มไว้ใต้ข้อความตลอดเวลาแบบ Polaris** เพราะไม่ต้องมีกลไกวัดอะไรเลย ไม่พังเมื่อข้อความยาว และใช้ได้ทั้งเดสก์ท็อปกับมือถือโดยไม่ต้องมีสองผัง **ข้อนี้สำคัญกับภาษาไทยเป็นพิเศษ** เพราะข้อความไทยยาวกว่าอังกฤษในความหมายเดียวกัน banner ของเราจะเข้าโหมดหลายบรรทัดบ่อยกว่าที่เจ้าต่างชาติออกแบบไว้

**ตัวเลขที่ยืมมาใช้ได้เลยถ้าจะทำแบบอัตโนมัติ** คือ **500** ของ Primer ซึ่งเป็นจุดตัดเดียวในตลาดที่ประกาศเป็นตัวเลข `[ทางการ]`

### 5.4 แกนขนาดของ banner (คำถามข้อ 13)

| เจ้า | มีแกนขนาดไหม | รายละเอียด |
|---|---|---|
| **Chakra UI v3** | **มี 3 ขนาด** | `sm` (gap 2 และ px 3 และ py 3 และ textStyle xs) และ `md` (gap 3 และ px 4 และ py 4 และ textStyle sm) และ `lg` (gap 3 และ px 4 และ py 4 และ textStyle md) ค่าเริ่มต้น `md` |
| **GitHub Primer** | **มี 2 ขนาด** | `layout` สองค่า คือ `default` และ `compact` โดย compact "will reduce the padding" |
| **Ant Design** | **มี 2 โดยพฤตินัย** | `defaultPadding` คือ `paddingContentVerticalSM` กับ 12 ส่วน `withDescriptionPadding` คือ `paddingMD` กับ `paddingContentHorizontalLG` ซึ่งต่างกันเมื่อมีคำอธิบาย |
| **Pinterest Gestalt** | **มี 2 ถึง 3 แต่ทำเป็น component แยก** | `BannerCallout` (ใหญ่ มีหัวข้อ) และ `BannerSlim` (เล็ก ไม่มีหัวข้อ) และ `BannerSlim` แบบ `Bare` (ไม่มีกล่อง) |
| **Adobe Spectrum** | **มี 2 โดยเป็นแพลตฟอร์ม ไม่ใช่ขนาด** | `alert-banner-minimum-height` 56 เดสก์ท็อป และ 64 มือถือ |
| **Microsoft Fluent 2** | **ไม่มีแกนขนาด** | มีแต่ `shape` และ `layout` |
| **Shopify Polaris** | **ไม่มีแกนขนาด** | แต่ผังเปลี่ยน 3 แบบตามบริบทและการมีหัวข้อ |
| **Atlassian** | **ไม่มีแกนขนาด** | Banner สูงตายตัว 48 |
| **IBM Carbon** | **ไม่มีแกนขนาด** | แต่ความกว้างเปลี่ยนตาม breakpoint 4 ขั้น |
| **Mantine** | **ไม่มีแกนขนาด** | มี `radius` และ `variant` แทน |
| **Material** | **ไม่มีแกนขนาด** | มีความสูงตามจำนวนบรรทัด (52, 72, 90 เดสก์ท็อป และ 54, 112, 120 มือถือ) |
| **Salesforce Lightning** | **ไม่มีแกนขนาด** | |

**สรุป `[คำนวณ]`** **มีแกนขนาดจริง 2 เจ้า** (Chakra 3 ขนาด และ Primer 2 ขนาด) **ไม่มี 8 เจ้า** และ **2 เจ้าทำเป็น component แยกแทนแกน** (Gestalt)

**ข้อสังเกตจาก Chakra `[ทางการ]`** ที่ `sm` กับ `md` และ `lg` ค่า `px` และ `py` ของ `md` กับ `lg` **เท่ากันหมด** (ทั้งคู่ 4) ต่างแค่ขนาดตัวอักษรกับขนาดไอคอน **แปลว่าแม้แต่เจ้าที่ทำแกนขนาด ก็ไม่ได้ทำให้ทุกมิติโตตาม** `[ตีความ]` ซึ่งเป็นแบบแผนเดียวกับที่ Ant กับ Fluent ทำกับแท็บตามที่บันทึกไว้ใน [tabs-component.md](tabs-component.md) หัวข้อ 5.3

---

## 6. ง. ชนิดและสี

### 6.1 ชนิดที่แต่ละเจ้ามี (คำถามข้อ 14)

| เจ้า | ชิ้นไหน | ชนิดทั้งหมด | มี brand หรือ promotional ไหม |
|---|---|---|---|
| **Material** | Snackbar | **ไม่มีแกนชนิดเลย** สีเดียวคือ `inverse-surface` | ไม่มี |
| **Material** | Banner | **2** คือ `standard` (`surface-container`) และ **`vibrant` (`primary-container`)** | **มี และเป็นแกนหลัก ไม่ใช่ของแถม** |
| **IBM Carbon** | ทุกชิ้น | **6** คือ `error` `info` `info-square` `success` `warning` `warning-alt` | ไม่มี |
| **Adobe Spectrum** | Toast | **4** คือ neutral (ค่าเริ่มต้น) `info` `negative` `positive` **ไม่มี warning** | ไม่มี |
| **Adobe Spectrum** | In-line alert | **5** คือ neutral `info` `negative` `notice` `positive` | ไม่มี |
| **Shopify Polaris** | Banner | **4** คือ `success` `info` `warning` `critical` | ไม่มีใน Banner |
| **Shopify Polaris** | Toast | **3** คือ ปกติ `error` และ **`tone: 'magic'`** | **มี** (`magic` คือสีประจำฟีเจอร์ AI) |
| **Atlassian** | Flag | **5** คือ `error` `info` `success` `warning` `normal` | ไม่มี |
| **Atlassian** | Banner | **3** คือ `warning` `error` **`announcement`** | **มี** (`announcement` ใช้ `background.neutral.bold`) |
| **Atlassian** | SectionMessage | **5** คือ `information` `warning` `error` `success` **`discovery`** | **มี** (`discovery` ใช้ `background.discovery` สีม่วง) |
| **Ant Design** | Alert | **4** คือ `success` `info` `warning` `error` | ไม่มี |
| **Ant Design** | message | **5** คือ 4 ตัวข้างบน บวก **`loading`** | ไม่มี |
| **GitHub Primer** | Banner | **5** คือ `critical` `info` `success` `warning` **`upsell`** | **มี** (`upsell` ใช้ `bgColor-upsell-muted` สีม่วง) |
| **Microsoft Fluent 2** | ทั้ง Toast และ MessageBar | **4** คือ `info` `success` `warning` `error` | ไม่มี |
| **Salesforce Lightning** | theme | **6** คือ `success` `warning` `error` `info` `offline` `inverse` | **มี** (`inverse` ใช้ `brand-base-10`) |
| **Uber Base Web** | ทั้งสองโหมด | **4** คือ `info` `positive` `warning` `negative` | ไม่มี |
| **Pinterest Gestalt** | Toast | **4** คือ `default` `success` `error` **`progress`** | ไม่มี |
| **Pinterest Gestalt** | BannerSlim | **11** คือ `neutral` `error` `info` `warning` `success` **`recommendation`** บวกอีก 5 ตัวที่ลงท้ายด้วย `Bare` | **มี** (`recommendation`) **บวก `BannerUpsell` เป็น component แยก** |
| **Pinterest Gestalt** | BannerCallout | **6** คือ `default` `error` `info` **`recommendation`** `success` `warning` | **มี** |
| **sonner** | Toast | **5** คือ `normal` `success` `info` `warning` `error` บวก `loading` | ไม่มี |
| **Mantine** | Alert และ Notification | **ไม่มีแกนชนิด** ใช้ prop `color` รับสีอะไรก็ได้ | ขึ้นกับคนใช้ |
| **Chakra UI v3** | Alert | **5** คือ `info` `warning` `success` `error` **`neutral`** | ไม่มี |
| **Chakra UI v3** | Toast | **4 โดยพฤตินัย** คือ ปกติ (พื้น panel) `warning` `success` `error` **และ `info` ไม่มีสไตล์แยก** | ไม่มี |

**นับคะแนน `[คำนวณ]`**

- **ชุด 4 ตัว info success warning error คือชุดที่พบบ่อยที่สุด** พบเต็ม ๆ ใน 8 เจ้า
- **ชนิด brand หรือ promotional มี 6 เจ้า** คือ Material (`vibrant`), Polaris (`magic`), Atlassian (`announcement` และ `discovery`), Primer (`upsell`), SLDS (`inverse`), Gestalt (`recommendation` และ `BannerUpsell`) **ซึ่งคิดเป็นเกือบครึ่ง**
- **ชนิด neutral แยกออกมาจาก info มี 5 เจ้า** คือ Spectrum, Gestalt, Chakra, Material (`standard`), SLDS
- **มีเจ้าหนึ่งไม่มี warning ใน toast เลย คือ Spectrum** ซึ่งมี `notice` เฉพาะใน in-line alert `[ทางการ]`

**ข้อค้นพบที่กระทบเราโดยตรง `[ของเรา]`** ระบบเรามี 3 ตระกูลคือ error warning success **ไม่มี info** ซึ่งเป็นชนิดที่ 13 จาก 14 เจ้ามี **ถ้าจะทำหน้า 19 ต้องเพิ่มตระกูลสี info ก่อน หรือใช้สีแบรนด์แทน info** ซึ่งเป็นสองทางที่ต่างกันมาก ดูคำถามข้อ 4 ในหัวข้อ 15

### 6.2 ทรง (คำถามข้อ 15)

| เจ้า | ชิ้นไหน | ทรงที่มี | จำนวน |
|---|---|---|---|
| **Mantine Alert** | banner | `filled` `light` `outline` `default` `transparent` `white` | **6 มากที่สุดในตลาด** |
| **Chakra Alert** | banner | `subtle` `surface` `outline` `solid` | **4** |
| **Pinterest Gestalt BannerSlim** | banner | พื้นอ่อน และ `Bare` (โปร่งใสไม่มี padding) | 2 |
| **Ant Design Alert** | banner | `outlined` และ `filled` (เพิ่มใน 6.4.0) | 2 |
| **IBM Carbon** | ทุกชิ้น | ปกติ (toast พื้นทึบเข้ม) และ `lowContrast` (พื้นอ่อน) | 2 |
| **Uber Base Web** | toast และ inline | พื้นทึบ (toast) และ พื้นอ่อน (inline) จากชุด token คนละชุด | 2 |
| **Shopify Polaris Banner** | banner | พื้นทึบเมื่อ `withinPage` และ พื้นอ่อนเมื่อ `withinContentContainer` | 2 |
| **Salesforce Lightning** | scoped notification | `light` และ `dark` | 2 |
| **Microsoft Fluent 2 Toast** | toast | พื้นกลาง (`colorNeutralBackground1`) และ `inverted` | 2 |
| **Adobe Spectrum** | toast กับ in-line alert | toast พื้นทึบ ส่วน in-line alert โปร่งมีขอบหนา 2 | 1 ต่อชิ้น |
| **GitHub Primer** | banner | พื้นอ่อนบวกขอบ 1 ทรงเดียว | 1 |
| **Microsoft Fluent 2 MessageBar** | banner | พื้นอ่อนบวกขอบ 1 ทรงเดียว | 1 |
| **Atlassian Banner** | banner | พื้นทึบทรงเดียว | 1 |
| **Atlassian SectionMessage** | banner | พื้นอ่อนทรงเดียว | 1 |
| **Material Snackbar** | toast | พื้นกลับขั้วทรงเดียว | 1 |
| **Material Banner** | banner | พื้น surface ทรงเดียว (สองโทน) | 1 |

**นับคะแนน `[คำนวณ]`** **ทำมากกว่า 1 ทรง 9 เจ้า** และ **ทำทรงเดียว 7 ชิ้น**

**เหตุผลที่แต่ละเจ้าทำหลายทรง `[ตีความ]` จากการอ่านโค้ด**

| เหตุผล | ใครทำ | หลักฐาน |
|---|---|---|
| **แยกระดับความเร่งด่วนในชนิดเดียวกัน** | Carbon | `lowContrast` ใช้กับ notification ที่ไม่อยากให้แย่งความสนใจ โดยเปลี่ยนสีข้อความจาก `text-inverse` เป็น `text-primary` |
| **แยกระดับของลำดับชั้นในหน้า** | Polaris, Base Web | ทึบสำหรับระดับหน้า อ่อนสำหรับในกล่อง เป็นเรื่องตำแหน่ง ไม่ใช่เรื่องความเร่งด่วน |
| **ให้คนใช้เลือกเองตามพื้นหลัง** | Mantine, Chakra | ให้ 4 ถึง 6 ทรง แล้วไม่กำหนดว่าใช้เมื่อไหร่ ซึ่งเป็นแนวของไลบรารีทั่วไป ไม่ใช่แนวของ DS องค์กร |
| **ให้ลดเสียงลงในสายเนื้อหา** | Gestalt | `Bare` คือการถอดกล่องออกทั้งใบ เหลือไอคอนกับข้อความ ใช้เมื่อข้อความอยู่ติดกับฟิลด์หรือการ์ด |

**ข้อเสนอที่ตามมา `[ตีความ]`** เหตุผลที่แข็งแรงที่สุดสำหรับ DS องค์กรคือ **แยกตามระดับในหน้า ไม่ใช่ให้เลือกเอง** เพราะถ้าให้เลือกเอง นักออกแบบสองคนจะเลือกไม่เหมือนกันในงานเดียวกัน ซึ่งเป็นปัญหาเดียวกับที่ระบบเราเจอกับทรงของแท็บ

### 6.3 คอนทราสต์ของทรงทึบ (คำถามข้อ 16)

**คำนวณจากค่าสีจริงที่อ่านจากไฟล์ต้นทาง** `[คำนวณ]`

| เจ้า | ชนิด | สีพื้น | สีข้อความที่เจ้านั้นจับคู่ไว้ | อัตราส่วน | ถ้าใช้ขาวแทน |
|---|---|---|---|---|---|
| **Shopify Polaris** | critical | `rgb(199,10,36)` | `rgb(255,250,251)` | **5.81** ผ่าน | 5.81 |
| **Shopify Polaris** | success | `rgb(4,123,93)` | `rgb(250,255,251)` | **5.20** ผ่าน | 5.20 |
| **Shopify Polaris** | **warning** | `rgb(255,184,0)` | **`rgb(37,26,0)` คือตัวหนังสือเข้ม** | **9.87** ผ่าน | **1.73 ไม่ผ่าน** |
| **Shopify Polaris** | **info** | `rgb(145,208,255)` | **`rgb(0,33,51)` คือตัวหนังสือเข้ม** | **10.01** ผ่าน | **1.66 ไม่ผ่าน** |
| **Atlassian Banner** | error | `#C9372C` | `#FFFFFF` | **5.16** ผ่าน | 5.16 |
| **Atlassian Banner** | announcement | `#292A2E` | `#FFFFFF` | **14.34** ผ่าน | 14.34 |
| **Atlassian Banner** | **warning** | `#FBC828` | **`#292A2E` คือตัวหนังสือเข้ม** (token ชื่อ `text-warning-inverse`) | **9.14** ผ่าน | **1.57 ไม่ผ่าน** |
| **Salesforce Lightning** | success | `rgb(46,132,74)` | ขาว | **4.65** ผ่านเฉียด | 4.65 |
| **Salesforce Lightning** | error | `rgb(234,0,30)` | ขาว | **4.65** ผ่านเฉียด | 4.65 |
| **Salesforce Lightning** | info หรือ neutral | `rgb(116,116,116)` | ขาว | **4.67** ผ่านเฉียด | 4.67 |
| **Salesforce Lightning** | **warning** | `rgb(254,147,57)` | **`rgb(24,24,24)` คือตัวหนังสือเข้ม** | **7.99** ผ่าน | **2.22 ไม่ผ่าน** |
| **Salesforce Lightning** | offline | `#444444` | ขาว | 9.74 ผ่าน | 9.74 |
| **ของเรา** | error | `rgb(217,45,32)` | ยังไม่ตัดสิน | ถ้าขาว **4.83** ผ่าน | 4.83 |
| **ของเรา** | **success** | `rgb(3,152,85)` | ยังไม่ตัดสิน | ถ้าขาว **3.73 ไม่ผ่าน** | **3.73 ไม่ผ่าน** |
| **ของเรา** | **warning** | `rgb(202,133,4)` | ยังไม่ตัดสิน | ถ้าขาว **3.06 ไม่ผ่าน** | **3.06 ไม่ผ่าน** |
| **ของเรา** | brand | `rgb(30,88,242)` | ยังไม่ตัดสิน | ถ้าขาว 5.63 ผ่าน | 5.63 |

**สามข้อสรุป `[คำนวณ]`**

1. **ไม่มีเจ้าไหนใช้ตัวหนังสือขาวบนพื้นทึบได้ครบทุกชนิด** 3 เจ้าที่ทำทรงทึบครบชุดสลับเป็นตัวหนังสือเข้มที่ชนิด warning ทั้งหมด และ Polaris สลับที่ info ด้วย เพราะสีฟ้าอ่อนที่เขาเลือกเป็นพื้น
2. **ชื่อ token ที่ Atlassian ใช้บอกเจตนาชัดมาก** คือ `text-warning-inverse` แปลว่าสีตัวหนังสือของชนิด warning ไม่ได้ชี้ไปที่ `text-inverse` ตัวเดียวกับชนิดอื่น แต่เป็น token ของตัวเองที่ resolve เป็นสีเข้ม
3. **สีทึบของเรา 2 ใน 3 ตระกูลไม่ผ่าน** ถ้าจะทำทรงทึบต้องเลือกระหว่าง ขยับขั้นสีขึ้นเป็น 700 สำหรับ success และ warning หรือ ประกาศ token สีตัวอักษรต่อชนิดแบบ Polaris

**มีเจ้าไหนเลิกใช้ทรงทึบเพราะเรื่องนี้ไหม `[ตีความ]`** **ไม่พบเจ้าไหนที่ประกาศว่าเลิกเพราะคอนทราสต์โดยตรง** แต่พบ 2 สัญญาณที่ใกล้เคียง

- **Fluent 2 ไม่ใช้สีชนิดกับพื้นของ toast เลย** พื้นเป็น `colorNeutralBackground1` เสมอ ชนิดมีผลแค่กับไอคอนและกับระดับเสียงของ live region ซึ่งเป็นวิธีที่หลบปัญหานี้ไปทั้งก้อน `[ทางการ]`
- **Material Snackbar ก็ไม่มีแกนชนิด** ใช้ `inverse-surface` สีเดียว `[ทางการ]`

**แปลว่าเจ้าที่โตที่สุดสองเจ้าหลีกเลี่ยงการทำ toast สีตามชนิด** และไปใช้พื้นกลางแทน ซึ่งทำให้ปัญหาคอนทราสต์หายไปทั้งหมดในคราวเดียว `[ตีความ]`

---

## 7. จ. สถานะและการโต้ตอบ

### 7.1 ตัวกล่องมีสถานะอะไรบ้าง (คำถามข้อ 17)

| เจ้า | ตัวกล่องโฟกัสได้ไหม | hover ที่ตัวกล่อง | disabled | หมายเหตุ |
|---|---|---|---|---|
| **Microsoft Fluent 2 Toast** | **`tabIndex: 0`** และ `role: 'listitem'` | ไม่มีสไตล์ hover | ไม่มี | ใช้ `useFocusableGroup` โหมด `limited-trap-focus` |
| **Radix Toast** | **`tabIndex: 0`** บน `<li>` | ไม่มี | ไม่มี | |
| **Zag และ Chakra Toast** | **`tabIndex: 0`** และ `role: 'status'` | ไม่มี แต่มี `data-paused` | ไม่มี | hover อยู่ที่ `actionTrigger` และ `closeTrigger` |
| **sonner** | เข้าถึงผ่าน hotkey | ไม่มี **แต่มี `:focus-visible` ที่ตัวกล่อง** `box-shadow: 0 4px 12px rgba(0,0,0,.1), 0 0 0 2px rgba(0,0,0,.2)` | ไม่มี | hover เปิดโหมดกางกอง |
| **Shopify Polaris Banner** | **`tabIndex: 0`** พร้อมสถานะ `keyFocused` ที่โชว์วงแหวนเฉพาะตอนเข้าด้วยคีย์บอร์ด | ไม่มี | ไม่มี | `handleMouseUp` สั่ง `blur()` เพื่อไม่ให้วงแหวนขึ้นตอนคลิกเมาส์ |
| **Shopify Polaris Toast** | เฉพาะโหมด `WithActionOnComponent` ที่ทั้งใบเป็น `<button>` | **มี** ในโหมดนั้น (`:hover` และ `:active` ของ `toneMagic`) | ไม่มี | โหมดปกติเป็น `<div>` |
| **GitHub Primer Banner** | **`tabIndex: -1`** | ไม่มี | ไม่มี | ตั้ง -1 เพื่อให้ย้ายโฟกัสมาด้วยโค้ดได้ แต่ไม่อยู่ในลำดับ Tab |
| **Atlassian Flag** | ไม่ได้ตั้ง tabIndex | ไม่มี **แต่ `onMouseOver` และ `onFocus` หยุดนาฬิกา** | ไม่มี | |
| **IBM Carbon** | ไม่ได้ตั้ง tabIndex (ยกเว้น actionable ที่ขังโฟกัส) | ไม่มี | ไม่มี | |
| **Mantine** | ไม่ได้ตั้ง | ไม่มี | ไม่มี | ปัดนิ้วปิดได้ (`allowDragDismiss`) |
| **Adobe Spectrum** | ผ่าน landmark และ F6 | ไม่มีสไตล์ แต่ **หยุดนาฬิกาเมื่อ hover หรือ focus** | ไม่มี | |

**สรุป `[คำนวณ]`** **ไม่มีเจ้าไหนทำสถานะ disabled ให้ toast หรือ banner เลยสักเจ้า** ซึ่งสมเหตุสมผล เพราะกล่องข้อความไม่ใช่ตัวควบคุม **สถานะ hover ที่ตัวกล่องมีแค่เมื่อทั้งใบคลิกได้** (Polaris โหมดเดียว) **แต่ 6 เจ้าทำให้ตัวกล่องโฟกัสได้** ซึ่งไม่ใช่เรื่องความสวยงาม แต่เป็นเรื่องให้คนใช้คีย์บอร์ดเข้าถึงปุ่มข้างใน ดูข้อ 8.2

**แปลเป็นข้อเสนอ `[ตีความ]`** สถานะของ component นี้อยู่ที่ชิ้นส่วนข้างใน ไม่ใช่ที่กล่อง ชิ้นที่ต้องมีสถานะครบคือ **ปุ่มกระทำ** และ **ปุ่มปิด** และ **ลิงก์ในข้อความ** ส่วนตัวกล่องต้องมีแค่ **focus-visible** อย่างเดียว

### 7.2 วงแหวนโฟกัสบนพื้นสีเข้ม (คำถามข้อ 18)

นี่คือปัญหาจริง เพราะวงแหวนโฟกัสมาตรฐานส่วนใหญ่เป็นสีน้ำเงินเข้มหรือสีเทาเข้ม ซึ่งหายไปบนพื้น toast สีเข้ม **ตลาดแก้ด้วย 4 วิธี** `[ทางการ]`

| วิธี | ใครทำ | รายละเอียดจากไฟล์ต้นทาง |
|---|---|---|
| **1. ใช้สีโฟกัสกลับขั้วแล้วดันวงเข้าด้านใน** | **IBM Carbon** | ปุ่มปิดของ toast ใช้ `outline: 2px solid $focus-inverse` พร้อม **`outline-offset: -2px`** คือวางวงไว้ในกรอบปุ่ม ไม่ให้ล้นออกไปทับขอบ toast และสำหรับโหมด `lowContrast` ที่พื้นสว่าง เปลี่ยนไปใช้ `focus-outline('outline')` ปกติแทน |
| **2. ใช้สีขาวโปร่งแสง** | **Chakra UI v3** | ที่ชนิด warning success error ตั้ง `--toast-border-color: {white/40}` และ `--toast-trigger-bg: {white/10}` แล้วให้ `actionTrigger` ใช้ `borderColor: var(--toast-border-color, inherit)` **แปลว่าขอบปุ่มเปลี่ยนสีตามพื้นโดยอัตโนมัติ** |
| **3. ใช้เงาแบบ inset** | **Salesforce Lightning** | ลิงก์ใน toast ใช้ `box-shadow: var(--slds-g-shadow-inset-focus-1, 0 0 3px #0176d3)` **แบบ inset** ส่วนลิงก์ในส่วนเนื้อหาที่พื้นต่างกันใช้ `--slds-g-shadow-outset-focus-1` ตัว outset **คือสองวิธีในชิ้นเดียวกัน แยกตามว่าอยู่บนพื้นอะไร** |
| **4. ใช้ดำโปร่งแสงเพราะพื้นเป็นขาว** | **sonner** | ปุ่มกระทำใช้ `box-shadow: 0 0 0 2px rgba(0,0,0,.4)` และปุ่มปิดใช้ `rgba(0,0,0,.2)` ซึ่งใช้ได้เพราะ sonner ใช้พื้นขาวเป็นหลัก |

**ข้อนี้ตรงกับกฎที่ระบบเรามีอยู่แล้ว `[ของเรา]`** memory บันทึกไว้ว่าวงแหวนโฟกัสของเรามี 2 กลไก คือ **ปุ่มทึบใช้ effect style** ส่วน **ปุ่มโปร่งที่ไม่มี fill ต้องใช้ stroke 4px outside** เพราะเงาของ Figma เกาะพิกเซลจริง ไม่เป็นกรอบเหมือน `box-shadow` ของ CSS

**ข้อเสนอ `[ตีความ]`** วิธีที่เข้ากับระบบเรามากที่สุดคือ **วิธีที่ 2 ของ Chakra** คือประกาศตัวแปรสีวงแหวนไว้ที่ตัวกล่อง แล้วให้ปุ่มข้างในอ่านจากตัวแปรนั้น เพราะเราใช้ variable เป็นกลไกหลักอยู่แล้ว และระบบเรามี `color/effect/focused-ring/{error,warning,success}` อยู่แล้ว **แต่ยังไม่มีตัวสำหรับพื้นเข้ม** ซึ่งต้องถามก่อนเพิ่ม

---

## 8. ฉ. การเข้าถึง

### 8.1 role และ aria-live (คำถามข้อ 19)

| เจ้า | ชิ้นไหน | role บนตัวที่มองเห็น | live region | จับคู่ชนิดกับระดับเสียงอย่างไร |
|---|---|---|---|---|
| **IBM Carbon** | ToastNotification | **`role="status"` เป็นค่าเริ่มต้น** เลือกได้ 3 ค่า คือ `alert` `log` `status` | ตัว role เอง | ให้คนใช้เลือก เอกสารบอกว่า "Use the roles alert, log, or status for notifications that do not require user action" |
| **IBM Carbon** | ActionableNotification | **`role="alertdialog"` เป็นค่าเริ่มต้น** พร้อม **ขังโฟกัส** | ตัว role เอง | "Use the role alertdialog for notifications that require user action" |
| **IBM Carbon** | Callout | **ไม่มี role และไม่มี live region** | ไม่มี | "Callouts do not have an aria-live attribute, and are not automatically announced by screen readers" |
| **Microsoft Fluent 2** | Toast | **`role="listitem"`** ในกล่อง `role="list"` **ไม่ใช่ live region** | **ข้อความซ่อนแยกต่างหาก** (`AriaLive` ที่มี 2 กล่องคือ `aria-live="assertive"` กับ `polite`) | **แผนที่ในโค้ด** `success: assertive และ warning: assertive และ error: assertive และ info: polite` |
| **Microsoft Fluent 2** | MessageBar | **`role="group"`** พร้อม `aria-labelledby` **ไม่ใช่ live region** | ผ่าน `useAnnounce` แยก | `intent === 'info' ? 'polite' : 'assertive'` |
| **Radix** | Toast | `<li>` ใน `<ol>` ที่อยู่ใน `role="region"` **ไม่ใช่ live region** | **ข้อความซ่อนแยกต่างหากที่ `role="status"`** | `type: 'foreground'` เป็น `assertive` และ `type: 'background'` เป็น `polite` |
| **Adobe Spectrum** | Toast | อยู่ใน **landmark region ชื่อ Notifications** | มีตัวประกาศแยก | เอกสารไม่ได้แยกตามชนิด |
| **Material (MDC)** | Snackbar | `aria-live` บนตัวที่มองเห็น | **มีกลไกพิเศษ** คือปิด `aria-live` ชั่วคราว ล้าง `textContent` แล้วใส่กลับหลัง **`ARIA_LIVE_DELAY_MS: 1000`** | คอมเมนต์ในโค้ดบอกว่าทำ "to prevent JAWS+Firefox from announcing the message twice" |
| **Shopify Polaris** | Toast | ไม่มี role | **`aria-live="assertive"`** ทั้งที่ตัวกล่องและที่ ToastManager | ไม่แยกตามชนิด **ใช้ assertive หมด** |
| **Shopify Polaris** | Banner | **`role = (tone === 'warning' or 'critical') ? 'alert' : 'status'`** | `aria-live="polite"` และปิดได้ด้วย `stopAnnouncements` | **แยกตามชนิดชัดเจน** |
| **Atlassian** | Flag | **`role="alert"` ทุกใบ** | ตัว role เอง | **ไม่แยก และโค้ดยอมรับว่าเป็นข้อบกพร่อง** คอมเมนต์เขียนว่า "A11y improvement opportunity: all flags currently use role=alert (assertive), but non-critical flags (e.g. info, success) should use role=status (polite)" |
| **Atlassian** | Banner | `role="alert"` | ตัว role เอง | ไม่แยก |
| **Ant Design** | Alert | **`role="alert"` ทุกชนิด** | ตัว role เอง | ไม่แยก |
| **Uber Base Web** | Toast | `role="alert"` ค่าเริ่มต้น และเป็น `alertdialog` เมื่อ `autoFocus` | **จงใจไม่ใส่ `aria-live` คู่กับ `role="alert"`** คอมเมนต์เขียนว่า "adding both aria-live and role=alert causes double speaking issues" | role เลือกได้ 5 ค่า คือ `alert` `alertdialog` `dialog` `status` `log` |
| **Pinterest Gestalt** | Toast | **`role="status"`** | ตัว role เอง | ไม่แยก |
| **Zag และ Chakra** | Toast | **`role="status"` และ `aria-atomic="true"`** | กล่องแม่เป็น `aria-live="polite"` | ไม่แยก |
| **sonner** | Toast | ตัวกล่องแม่เป็น `aria-live="polite"` | ตัว container | ไม่แยก |
| **Mantine** | Notification และ Alert | **`role="alert"` ค่าเริ่มต้น** เปลี่ยนได้ | ตัว role เอง | ไม่แยก |
| **Salesforce Lightning** | toast | **`role="alert"` เมื่อมีใบเดียว** และ **`role="status"` เมื่อมีหลายใบ** | ตัว role เอง | **แยกตามจำนวน ไม่ใช่ตามชนิด** เพื่อไม่ให้ assertive ไล่ทับข้อความก่อนหน้า |

**สี่ข้อสรุป `[คำนวณ]`**

1. **ตลาดกำลังย้ายออกจากการวาง live region ไว้บนตัวที่มองเห็น** 4 เจ้าใหญ่ (Fluent, Radix, Spectrum, Material) แยกเป็นข้อความซ่อนต่างหากแล้ว **เหตุผลอยู่ในโค้ดของ Base Web และ Material** คือวางซ้อนกันทำให้โปรแกรมอ่านหน้าจออ่านซ้ำสองรอบ
2. **`role="status"` ชนะ `role="alert"` ในชิ้นที่ลอย** 5 เจ้าใช้ status เป็นค่าเริ่มต้น และ 5 เจ้าใช้ alert โดย 1 ใน 5 เจ้าหลัง (Atlassian) เขียนในโค้ดเองว่าควรเปลี่ยน
3. **การแยกระดับเสียงตามชนิด มี 3 เจ้าที่ทำ และทุกเจ้าแบ่งเส้นที่เดียวกัน คือ info เป็น polite ส่วน success warning error เป็น assertive** (Fluent Toast, Fluent MessageBar, Polaris Banner) **นี่คือฉันทามติที่ชัดที่สุดในหัวข้อนี้**
4. **`alertdialog` สงวนไว้สำหรับของที่ต้องตอบ** 2 เจ้าใช้ (Carbon actionable, Base Web เมื่อ autoFocus) และทั้งสองเจ้าขังโฟกัสไว้ข้างในด้วย ซึ่งตรงกับ APG ที่ให้ใช้ alertdialog เมื่อ "interrupting work flow is necessary"

**เส้นแบ่งของ Polaris น่าสนใจเป็นพิเศษ `[ทางการ]`** เพราะ Banner ใช้ `role="alert"` สำหรับ warning กับ critical แต่ยังตั้ง `aria-live="polite"` ไว้ด้วย ซึ่งเป็นสิ่งที่ Base Web บอกว่าทำให้อ่านซ้ำ **สองเจ้านี้ขัดกันโดยตรง** `[ตีความ]`

### 8.2 การจัดการโฟกัส (คำถามข้อ 20)

**เรื่องที่ตรงกันหมดคือห้ามย้ายโฟกัสไปที่ toast** `[มาตรฐาน]`

APG เขียนว่า "Because alerts are intended to provide important and potentially time-sensitive information without interfering with the user's ability to continue working, **it is crucial they do not affect keyboard focus**" และ Adrian Roselli เขียนว่า "Focus should not move to this control. If there is interactive content that requires focus, not only is the message not a toast but it should have an `alertdialog` role" `[แหล่งรอง]`

**แล้วคนใช้คีย์บอร์ดไปถึงปุ่มในนั้นได้อย่างไร ตลาดมี 4 คำตอบ** `[ทางการ]`

| วิธี | ใครทำ | รายละเอียด |
|---|---|---|
| **ปุ่มลัด F6 ไปที่ landmark** | **Adobe Spectrum และ React Aria** | "Toast regions are landmark regions... can be navigated using F6 to move forward and Shift + F6 to move backward. This provides an easy way for keyboard users to jump to toasts from anywhere in the app" และ **"When a toast is closed, focus moves to the next toast if any. When the last toast is closed, focus is restored to where it was before"** |
| **ปุ่มลัดเฉพาะกิจบวกตัวดักโฟกัส** | **Radix** | `VIEWPORT_DEFAULT_HOTKEY = ["F8"]` และ **ตั้งชื่อ region ให้บอกปุ่มลัดด้วย** คือ `label = "Notifications ({hotkey})"` แล้วแทนที่ `{hotkey}` ด้วยชื่อปุ่มจริง **บวก `FocusProxy` ซ่อน 2 ตัวหัวท้าย** ที่ดักการกด Tab เข้ามาจากนอก viewport แล้วส่งโฟกัสไปที่ toast ตัวแรกหรือตัวสุดท้าย |
| **ปุ่มลัดบวก Escape ปิดทั้งกอง** | **Microsoft Fluent 2** | `ToasterShortcuts` ให้ตั้งปุ่มลัดเองได้ และคอมเมนต์ในโค้ดบอกว่า "Users should only use Tab to focus into the toast" กับ "Escape is already reserved to dismiss all toasts" |
| **ทำให้กองเป็น landmark ที่มีหัวข้อซ่อน** | **Atlassian** | `FlagGroup` ใส่ `VisuallyHidden` ที่มี `<h2>` ข้อความ "Flag notifications" และเมื่อเปิดปุ่มลัดปิดด้วยคีย์บอร์ด จะเปลี่ยนข้อความเป็น **"Flag notifications. Press Escape to dismiss."** |

**ปุ่มลัดที่ใช้จริง** F6 (Spectrum, React Aria) และ F8 (Radix) และ Alt+T (sonner) และ ตั้งเองได้ (Fluent) `[คำนวณ]`

**การกด Escape** พบใน 5 เจ้า คือ Polaris (`KeypressListener` ปิดใบนั้น), Radix (`onEscapeKeyDown` ปิดเมื่อโฟกัสไม่ได้อยู่ใน toast), Fluent (ปิดทั้งกอง), Zag (ปิดใบนั้น) และ Atlassian (ปิดใบบนสุด) `[ทางการ]`

**รายละเอียดเล็กที่สำคัญจาก React Aria `[ทางการ]`** "the close button should be rendered as a sibling of `<ToastContent>` rather than inside it, so that screen readers announce the toast content without the close button first" **แปลว่าลำดับใน DOM มีผลกับสิ่งที่ผู้ใช้ได้ยิน** ไม่ใช่แค่ลำดับที่ตามองเห็น

**สำหรับ banner ตลาดทำตรงข้าม `[ทางการ]`** คือ **ให้ย้ายโฟกัสมาได้** Primer ตั้ง `tabIndex: -1` ที่ `<section>` และ Polaris มี `useBannerFocus` ที่เปิดเมธอด `focus()` ให้เรียกจากข้างนอก **เพราะ banner ใช้เป็นสรุปข้อผิดพลาดของฟอร์ม ซึ่งต้องย้ายโฟกัสมาเมื่อกดส่ง** `[ตีความ]`

### 8.3 WCAG ข้อ 2.2.1 และ 2.2.4 กับการหายเอง (คำถามข้อ 21)

**ข้อความมาตรฐาน** `[มาตรฐาน]`

| ข้อ | ระดับ | ข้อความ |
|---|---|---|
| **2.2.1 Timing Adjustable** | A | "For each time limit that is set by the content, at least one of the following is true" แล้วตามด้วยทางออก 6 ทาง คือ ปิดเวลาได้ก่อนเจอ, ปรับได้อย่างน้อย 10 เท่า, เตือนก่อนหมดแล้วให้เวลาอย่างน้อย 20 วินาทีในการต่อ และต่อได้อย่างน้อย 10 ครั้ง, เป็นเหตุการณ์เวลาจริง, จำเป็นต่อกิจกรรม หรือ นานกว่า 20 ชั่วโมง |
| **2.2.3 No Timing** | **AAA** | "Timing is not an essential part of the event or activity presented by the content, except for non-interactive synchronized media and real-time events" |
| **2.2.4 Interruptions** | **AAA** | "Interruptions can be postponed or suppressed by the user, except interruptions involving an emergency" |

**ข้อควรรู้ที่คนอ้างผิดกันบ่อย `[มาตรฐาน]`**

- **APG อ้างข้อ 2.2.3 ไม่ใช่ 2.2.1** ข้อความคือ "An alert that disappears too quickly can lead to failure to meet WCAG 2.0 success criterion 2.2.3" **ซึ่งเป็นระดับ AAA** ไม่ใช่ A
- **Adrian Roselli อ้างข้อ 2.2.1 และบอกว่าตกแน่** "If you follow the pattern where they go away after a few seconds, then you are in violation" `[แหล่งรอง]`
- **หน้า Understanding ของ 2.2.1 เองมีทางออกให้** คือถ้าข้อมูลเดียวกันหาได้จากที่อื่นที่ไม่ใช้นาฬิกา ก็ไม่ติดข้อนี้ `[มาตรฐาน]`
- **ข้อ 2.2.4 เป็น AAA และมีข้อยกเว้นเรื่องเหตุฉุกเฉิน** โดยนิยามไว้ว่าเป็น "a sudden, unexpected situation or occurrence that requires immediate action to preserve health, safety, or property" **ซึ่งรวมถึงประกาศเตือนภัย** `[มาตรฐาน]`

**แปลว่าข้อสรุปที่ถูกต้องคือแบบนี้ `[ตีความ]`**

1. **ถ้าเราตั้งเป้าที่ AA (ซึ่งเป็นเป้ามาตรฐาน)** toast ที่หายเองไม่ตกทันที **ถ้าข้อมูลเดียวกันยังหาได้จากที่อื่น** เช่น ข่าวที่บันทึกไว้แล้วยังอยู่ในรายการ หรือการตั้งค่าที่เปลี่ยนแล้วเห็นได้จากหน้าตั้งค่า
2. **ถ้า toast ใบนั้นเป็นที่เดียวที่ข้อมูลอยู่ จะตกข้อ 2.2.1 ระดับ A** ซึ่งเป็นเหตุผลตรงของกฎที่ Untitled UI เขียนไว้ว่า "no auto-dismiss at all when the toast holds something the user cannot get back"
3. **ถ้าจะเล็ง AAA ด้วย ต้องไม่หายเองเลย** ตามข้อ 2.2.3

**ต้องหยุดเวลาตอนเมาส์ชี้หรือตอนโฟกัสไหม** `[ทางการ]`

| เจ้า | หยุดตอน hover | หยุดตอน focus | หยุดตอนสลับหน้าต่าง |
|---|---|---|---|
| **Adobe Spectrum** | **ใช่** | **ใช่** ("timers will pause when the user focuses or hovers over a toast") | ไม่ระบุ |
| **Atlassian** | **ใช่** (`onMouseOver: stopAutoDismissTimer`) | **ใช่** (`onFocus: stopAutoDismissTimer`) และเริ่มใหม่เมื่อ `onBlur` | ไม่ระบุ |
| **Shopify Polaris** | **ใช่** และ **จำเวลาที่เหลือไว้** (`durationRemaining -= Date.now() - timeoutStart`) ไม่ใช่เริ่มนับใหม่ | ไม่ | ไม่ |
| **Radix** | **ใช่** ผ่าน event `VIEWPORT_PAUSE` ที่ viewport และจำเวลาที่เหลือ | **ใช่** ผ่าน event เดียวกัน | ไม่ระบุ |
| **Mantine** | **ใช่** และมี 2 โหมดคือ `pauseResetOnHover: 'all'` (หยุดทั้งกองเมื่อชี้ใบเดียว) กับ `'notification'` (หยุดเฉพาะใบที่ชี้) ค่าเริ่มต้นคือ `'all'` | ไม่ระบุ | ไม่ระบุ |
| **sonner** | **ใช่** | ใช่ | ใช่ |
| **Microsoft Fluent 2** | **มีตัวเลือก แต่ค่าเริ่มต้นคือ `pauseOnHover: false`** | ผ่าน `imperativeRef.pause()` | **มีตัวเลือก `pauseOnWindowBlur` ค่าเริ่มต้นก็ `false`** |
| **Zag และ Chakra** | ใช่ (มี `data-paused`) | ใช่ | ใช่ |
| **Untitled UI** | แนะนำว่า "pausing the timer while the cursor is over the toast is the single most useful behavior to specify" | ไม่ระบุ | ไม่ระบุ |

**สรุป `[คำนวณ]`** **8 จาก 9 เจ้าที่ตรวจได้หยุดเวลาเมื่อเมาส์ชี้** และ **เจ้าเดียวที่ไม่หยุดเป็นค่าเริ่มต้นคือ Fluent 2** ซึ่งเปิดได้แต่ปิดไว้ **และ 5 เจ้าหยุดเมื่อโฟกัสด้วย** ซึ่งสำคัญกว่าเพราะคนใช้คีย์บอร์ดจะอ่านไม่ทันถ้าเวลาเดินต่อขณะโฟกัสอยู่

**ข้อควรระวังที่พบในโค้ด Polaris และ Radix `[ทางการ]`** ทั้งสองเจ้า **จำเวลาที่เหลือ** ไม่ใช่รีเซ็ตกลับไปเต็ม ซึ่งเป็นรายละเอียดที่ถ้าทำผิดจะกลายเป็น toast ที่ไม่มีวันหายเมื่อเมาส์ผ่านไปผ่านมา `[ตีความ]`

### 8.4 ขนาดพื้นที่แตะของปุ่มปิด (คำถามข้อ 22)

| เจ้า | ขนาดที่อ่านจากไฟล์ | ผ่าน 24 (AA) | ผ่าน 44 (AAA และ iOS) | ผ่าน 48 (Android) |
|---|---|---|---|---|
| **IBM Carbon** | **48 คูณ 48** (`block-size`, `inline-size`, `min-block-size`, `min-inline-size` ทุกตัวเป็น 48) | ผ่าน | **ผ่าน** | **ผ่าน** |
| **Material (MDC)** | `dismiss-button-size: 36px` และไอคอน 18 | ผ่าน | **ไม่ผ่าน** | ไม่ผ่าน |
| **Chakra UI v3** | `padding: 1` (4) บวกไอคอน `1em` ที่ `textStyle: md` (16) ได้ **24** `[คำนวณ]` | ผ่านพอดีเส้น | ไม่ผ่าน | ไม่ผ่าน |
| **sonner** | **`height: 20px; width: 20px`** | **ไม่ผ่าน** | ไม่ผ่าน | ไม่ผ่าน |
| **Shopify Polaris** | ไม่ได้ตั้งขนาด ใช้ `XSmallIcon` ตรง ๆ **ประมาณ 16 ถึง 20** | **น่าจะไม่ผ่าน ยืนยันไม่ได้จากไฟล์** | ไม่ผ่าน | ไม่ผ่าน |
| **Salesforce Lightning** | ลอยที่ `top: 0.75rem; right: 0.75rem` **ไม่ได้ตั้งขนาดใน CSS ของ toast** ขึ้นกับ icon button ที่ใช้ | ยืนยันไม่ได้ | ยืนยันไม่ได้ | ยืนยันไม่ได้ |
| **Microsoft Fluent 2** | ใช้ Button ปกติ **ไม่ได้ตั้งขนาดในไฟล์ของ toast** | ยืนยันไม่ได้ | ยืนยันไม่ได้ | ยืนยันไม่ได้ |
| **Adobe Spectrum** | ใช้ CloseButton ของระบบ **ไม่ได้ตั้งในไฟล์ของ toast** | ยืนยันไม่ได้ | ยืนยันไม่ได้ | ยืนยันไม่ได้ |
| **GitHub Primer** | `BannerDismiss` มี `padding: 8` ครอบ IconButton | ยืนยันไม่ได้ | ยืนยันไม่ได้ | ยืนยันไม่ได้ |

**เกณฑ์ที่ใช้** `[มาตรฐาน]` WCAG 2.2 SC 2.5.8 Target Size (Minimum) ที่ 24 คูณ 24 CSS px ระดับ AA และ SC 2.5.5 Target Size (Enhanced) ที่ 44 คูณ 44 ระดับ AAA

**สรุป `[คำนวณ]`** **มีเจ้าเดียวที่ผ่านทุกเกณฑ์ คือ Carbon ที่ 48** และ **มีเจ้าที่ไม่ผ่านแม้แต่เกณฑ์ขั้นต่ำ คือ sonner ที่ 20** ซึ่งเป็นไลบรารีที่ shadcn แนะนำให้ใช้อยู่ตอนนี้ **ข้อนี้เป็นตัวอย่างชัดว่าความนิยมไม่ใช่เครื่องวัดคุณภาพ** `[ตีความ]`

**ข้อควรระวังเพิ่มเติม `[ตีความ]`** ปุ่มปิดของ toast มักวางลอยมุมขวาบนและทับขอบกล่อง (sonner ใช้ `transform: translate(-35%, -35%)` และ Chakra ใช้ `position: absolute; top: 1; insetEnd: 1`) **ซึ่งทำให้พื้นที่แตะส่วนหนึ่งตกไปนอกกล่อง** ถ้าของเราจะทำแบบนั้น ต้องตรวจว่าพื้นที่แตะจริงยังครบ 48 และไม่ทับกับปุ่มกระทำ ตามข้อยกเว้นเรื่อง spacing ของ SC 2.5.8

---

## 9. ช. การเคลื่อนไหว

| เจ้า | เวลาเข้า | เวลาออก | เส้นโค้ง | เข้าจากทางไหน |
|---|---|---|---|---|
| **Material (MDC)** | **150ms** (`$enter-duration`) | **75ms** (`$exit-duration`) | ใช้ฟังก์ชัน `animation-functions.enter()` และ `exit-permanent()` ของ Material | **ไม่เลื่อน** ใช้ `transform: scale(0.8)` กับ `opacity: 0` ไปเป็น `scale(1)` และ `opacity: 1` |
| **Shopify Polaris** | **`motion-duration-400`** | **`motion-duration-200`** | เข้า `motion-ease-out` และ ออก `motion-ease-in` | เลื่อนตามแกน Y จากด้านล่าง บวก `scale` และ `blur` ตามลำดับในกอง |
| **Atlassian** | **250ms** `cubic-bezier(0, 0.4, 0, 1)` ทำสองอย่างคือ `SlideIn50PercentLeft` และ `FadeIn0to100` | **200ms** `cubic-bezier(0.6, 0, 0.8, 0.6)` ทำ `SlideOut15PercentLeft` และ `FadeOut100to0` | เข้าใช้เส้นโค้งที่ชะลอปลายมาก ส่วนออกใช้เส้นที่เร่งต้น | **จากซ้าย** ซึ่งตรงกับที่ flag เกาะมุมล่างซ้าย **และเข้ามา 50 เปอร์เซ็นต์ของระยะ แต่ออกไปแค่ 15 เปอร์เซ็นต์** |
| **Atlassian (จัดตำแหน่งใหม่)** | **250ms** `cubic-bezier(0.4, 0, 0, 1)` ที่ `transform` | เท่ากัน | คนละเส้นกับขาเข้าของตัวใบ | ใช้ตอนใบอื่นหายแล้วกองต้องเลื่อนขึ้น |
| **Uber Base Web** | **`timing200` คือ 200ms** | 200ms เท่ากัน | **`easeInOutCurve` คือ `cubic-bezier(0.4, 0, 0.2, 1)`** | จางเข้าออกด้วย `opacity` อย่างเดียว ตัว `transitionProperty` เป็น `all` |
| **sonner** | **400ms** สำหรับ `transform`, `opacity`, `height` และ **200ms** สำหรับ `box-shadow` | **200ms** และสำหรับใบหลังที่ไม่ได้กางใช้ `transform .5s` กับ `opacity .2s` | ไม่ได้ประกาศ จึงเป็น `ease` ของเบราว์เซอร์ ส่วนการกวาดนิ้วออกใช้ `ease-out` 0.2s | เลื่อนตามแกน Y 100 เปอร์เซ็นต์ จากขอบที่ยึดอยู่ และตัว toaster เองมี `transition: transform .4s ease` |
| **Chakra และ Zag** | **400ms** สำหรับ `translate`, `scale`, `opacity`, `height` และ 200ms สำหรับ `box-shadow` | **`translate 400ms, scale 400ms, opacity 200ms`** | เข้า **`cubic-bezier(0.21, 1.02, 0.73, 1)`** และ ออก **`cubic-bezier(0.06, 0.71, 0.55, 1)`** | ตามทิศของ placement โดยตั้ง `--y: 100%` |
| **Ant Design message** | `motionDurationFast` สำหรับ `opacity` และ `transform` และ `motionDurationSlow` สำหรับ `width` | เท่ากัน | `motionEaseInOut` | `translateX(-50%) translateY(100%)` ไปเป็น `translateY(0)` |
| **Mantine** | **`transitionDuration` ค่าเริ่มต้น 250ms** | 250ms | ไม่ได้ประกาศ | ตามทิศของ position |
| **Microsoft Fluent 2** | ไม่ได้ประกาศในไฟล์ที่อ่าน ใช้ระบบ motion กลางของ Fluent | | | |
| **Adobe Spectrum** | ไม่ได้ประกาศในไฟล์ที่อ่าน | | | |

**สรุป `[คำนวณ]`**

- **ขาเข้าอยู่ในช่วง 150 ถึง 400** ค่าที่พบคือ 150, 200, 250, 250, 400, 400 **มัธยฐาน 250**
- **ขาออกอยู่ในช่วง 75 ถึง 250** ค่าที่พบคือ 75, 200, 200, 200, 200, 250 **มัธยฐาน 200**
- **ทุกเจ้าที่ประกาศทั้งสองค่าให้ขาออกสั้นกว่าหรือเท่ากับขาเข้า** ไม่มีเจ้าไหนให้ขาออกยาวกว่า
- **ทิศทางคือจากขอบที่ toast เกาะอยู่** ยกเว้น Material ที่ไม่เลื่อนแต่ย่อขยาย

**รายละเอียดที่น่าลอก 3 ข้อ `[ทางการ]`**

1. **Atlassian ให้ระยะขาเข้ากับขาออกไม่เท่ากัน** เข้ามา 50 เปอร์เซ็นต์ของระยะ แต่ออกไปแค่ 15 เปอร์เซ็นต์ เพราะขาออกสายตาไม่ต้องตามไปถึงไหน ถ้าทำเท่ากันจะรู้สึกว่าออกช้า
2. **Chakra ใช้เส้นโค้งคนละเส้นสำหรับเข้าและออก** โดยขาเข้า `cubic-bezier(0.21, 1.02, 0.73, 1)` มีค่าเกิน 1 ซึ่งทำให้เด้งเล็กน้อยตอนเข้าที่ ส่วนขาออกเป็นเส้นปกติ
3. **sonner แยกเวลาของเงาออกจากเวลาของตำแหน่ง** คือเงา 200 แต่ตำแหน่ง 400 เพราะเงาเป็นสัญญาณของการยกตัว ที่ควรมาถึงก่อนการเลื่อนจะจบ

**ข้อที่ทุกเจ้าควรมีแต่มีเจ้าเดียวที่เขียนไว้ชัด `[ทางการ]`** sonner ใส่ `@media (prefers-reduced-motion)` ที่ปิด `transition` และ `animation` ทั้งหมดด้วย `!important` **ไม่พบกฎนี้ในไฟล์ของเจ้าอื่นที่อ่านในรอบนี้** ซึ่งอาจเป็นเพราะเจ้าอื่นจัดการที่ชั้นระบบ motion กลาง `[ตีความ]`

---

## 10. ซ. บริบทข่าว

### 10.1 สำรวจหน้าแรกของเว็บในเครือ 6 เว็บ `[สำรวจ]`

ดึง HTML ฝั่งเซิร์ฟเวอร์ของหน้าแรกทั้ง 6 เว็บ วันที่ 2026-10-02 ด้วย user agent ของ iPhone Safari แล้วสแกน

| สิ่งที่หา | ผล |
|---|---|
| `role="alert"` หรือ `role="status"` หรือ `aria-live` | **ไม่พบเลยทั้ง 6 เว็บ** |
| ตัวขอความยินยอมคุกกี้ (`cookieconsent`, `cookie-consent`, `นโยบายคุกกี้`, `ตั้งค่าคุกกี้`, `PDPA`) | **ไม่พบเลยทั้ง 6 เว็บ** |
| ตัวขอสิทธิ์แจ้งเตือน | **พบ 3 เว็บ** nationtv ใช้ `cdn.izooto.com/scripts/...` และ springnews ใช้ `cdn.izooto.com/scripts/...` และ thansettakij ใช้ `cdn.taboola.com/webpush/publishers/1949826/taboola-push-sdk.js` |
| คำว่า `toast` หรือ `snackbar` | **ไม่พบเลยทั้ง 6 เว็บ** |
| คำว่า `banner` | พบ 1 ถึง 17 ครั้งต่อหน้า **แต่ตรวจบริบทแล้วเกือบทั้งหมดเป็นชื่อช่องโฆษณา ไม่ใช่ banner แจ้งข้อความ** |
| คำว่า `ข่าวด่วน` | พบ 3 ถึง 9 ครั้งใน 3 เว็บ **แต่เป็น meta keyword กับชื่อหมวด ไม่ใช่แถบแจ้งข่าวด่วน** |
| คำว่า `line.me` และ `LINE` | พบทุกเว็บ 101 ถึง 389 ครั้ง (ปุ่มแชร์) |

**ข้อควรระวังของการสำรวจนี้** ทั้ง 6 เว็บเป็น Next.js ที่เติมเนื้อหาด้วยสคริปต์ ของที่ถูกสร้างหลังหน้าโหลดจะไม่ปรากฏในสิ่งที่ดึงมา **ผลนี้บอกได้แค่ว่าไม่มี toast หรือ banner ส่งมาใน HTML ตั้งต้น** และ **ตัวขอสิทธิ์แจ้งเตือนทั้ง 3 เว็บวาด UI ของตัวเองด้วยสคริปต์ของผู้ให้บริการ ไม่ใช่ component ของเรา**

**สิ่งที่ผลนี้บอกได้ `[ตีความ]`**

1. **งาน "ขอสิทธิ์แจ้งเตือน" มีอยู่จริงแล้วใน 3 จาก 6 เว็บ แต่ไม่ใช่ของเรา** ถ้าเราทำ banner ชนิดนี้ขึ้นมาเอง จะเป็นการแทนของเดิมที่ยังใช้งานอยู่ ซึ่งเป็นงานที่ต้องคุยกับคนดูแลรายได้ ไม่ใช่งานออกแบบล้วน
2. **งานคุกกี้ยังไม่มีเลยทั้ง 6 เว็บ** ซึ่งเป็นช่องว่างที่ใหญ่กว่าในแง่กฎหมาย เพราะ PDPA บังคับใช้แล้ว แต่ **เรื่องนี้เกินขอบเขตของหน้า 19** ควรบันทึกเป็นงานค้างแยก
3. **งานข่าวด่วนยังไม่มี component** และต่างจากชนิดอื่นในตารางของเจ้าใหญ่ทั้งหมด ดู 10.3

### 10.2 เว็บข่าวใหญ่ใช้ banner ทำอะไรบ้าง และตลาด DS รองรับไหม `[ตีความ]`

| งานบนเว็บข่าว | ตรงกับชนิดของตลาดไหม | เจ้าที่มีของให้ใช้ตรง ๆ |
|---|---|---|
| **ข่าวด่วนหรือเกาะติดสถานการณ์** | **ไม่ตรงกับชนิดไหนเลย** ไม่ใช่ error ไม่ใช่ warning ไม่ใช่ info **เพราะมันไม่ใช่สถานะของระบบ แต่เป็นเนื้อหา** | **ไม่มี** ที่ใกล้สุดคือ Atlassian `announcement` และ Material `vibrant` ซึ่งเป็นพื้นทึบสีกลางหรือสีแบรนด์ |
| **ขอสิทธิ์แจ้งเตือน** | ตรงกับชนิด brand หรือ promotional | Primer `upsell` และ Gestalt `BannerUpsell` และ Atlassian `discovery` |
| **ความยินยอมคุกกี้** | **ไม่ตรง** เพราะต้องคาอยู่จนกว่าจะเลือก และมักต้องมี 2 ปุ่มขึ้นไป | **ไม่มีเจ้าไหนทำ** ที่ใกล้สุดคือ Atlassian Banner ที่ปิดไม่ได้ |
| **ชวนสมัครสมาชิกหรืออ่านต่อ** | ตรงกับชนิด brand หรือ promotional | Gestalt `BannerUpsell` ซึ่งมี `imageData` ให้ใส่ภาพด้วย |
| **บอกว่ากำลังดูข่าวเก่า** | ตรงกับชนิด info หรือ warning | ทุกเจ้าที่มี info |
| **บอกว่าบันทึกข่าวแล้ว** | ตรงกับ toast ชนิด success | ทุกเจ้า |
| **บอกว่าคัดลอกลิงก์แล้ว** | ตรงกับ toast ชนิด success หรือ neutral | ทุกเจ้า |
| **บอกว่าออฟไลน์หรือเน็ตหลุด** | ตรงกับ warning และ **SLDS มีชนิด `offline` แยกเฉพาะ** | SLDS |

**ข้อสรุป `[ตีความ]`** จาก 8 งานของเว็บข่าว **มี 2 งานที่ตลาด DS ไม่มีของให้ใช้ตรง ๆ คือ ข่าวด่วน และ คุกกี้** ส่วนอีก 6 งานมีของรองรับ โดย 2 งานต้องพึ่งชนิด brand ที่เรายังไม่มี

### 10.3 ทำไมข่าวด่วนไม่ควรเป็นชนิดในแกนเดียวกัน `[ตีความ]`

**เหตุผล 4 ข้อ**

1. **สีไม่ได้มาจากสถานะ แต่มาจากแบรนด์** ชนิด error ของเราใช้สีแดงเดียวกันทั้ง 6 เว็บ แต่แถบข่าวด่วนของ nationtv กับ bangkokbiznews ต้องเป็นสีของแต่ละเว็บ ซึ่งแปลว่าถ้าเอาข่าวด่วนไปเป็นค่าในแกนชนิด token สีของมันจะต้องผูกกับชั้นแบรนด์ ไม่ใช่ชั้น `color/background/system/*` เหมือนชนิดอื่น **ซึ่งจะทำให้แกนชนิดมี 1 ค่าที่เล่นตามกฎคนละชุด**
2. **มันไม่ปิด และไม่หาย** ชนิดอื่นในแกนเดียวกันมีตัวเลือกให้ปิด แต่แถบข่าวด่วนอยู่จนกว่าบรรณาธิการจะเอาออก **ซึ่งตรงกับ Atlassian Banner ที่ไม่มี prop ปิดเลย**
3. **เนื้อหาเป็นลิงก์ ไม่ใช่ข้อความ** ชนิดอื่นมีข้อความกับปุ่ม แต่แถบข่าวด่วนคือพาดหัวที่คลิกได้ ซึ่งแปลว่าโครงภายในไม่เหมือนกัน
4. **มันอาจต้องเลื่อนข้อความ** เพราะพาดหัวไทยยาว และ `components/BreakingNewsTicker` มีอยู่ในโปรเจกต์แล้ว `[ของเรา]` **ซึ่งแปลว่าของนี้มีคนทำไว้แล้วในระดับโค้ด**

**ข้อเสนอ `[ตีความ]`** **ไม่ควรเพิ่ม breaking เป็นค่าในแกนชนิด** แต่ควรทำเป็นทรงหรือ component แยกที่ยืมโครงของ banner ระดับหน้ามาใช้ แบบเดียวกับที่ Gestalt แยก `BannerUpsell` ออกจาก `BannerCallout` ทั้งที่หน้าตาคล้ายกัน **และต้องตรวจก่อนว่า `components/BreakingNewsTicker` ที่มีอยู่แล้วคือของเดียวกันหรือไม่** ตามกฎ ask-first ก่อนแตะของเดิม

---

## 11. ตารางเทียบรวม 15 เจ้า

### 11.1 ฝั่ง toast

| เจ้า | ชื่อ | กว้าง | ตำแหน่ง | ซ้อน | หายเอง | ปุ่ม | ทรงสี | role | ขนาด |
|---|---|---|---|---|---|---|---|---|---|
| **Material** | Snackbar | 344 ถึง 672 | ล่าง | **1** | 5000 (4000 ถึง 10000) | 1 บวกปุ่มปิด | พื้นกลับขั้ว **ไม่มีชนิด** | `aria-live` บนตัวจริง | **1** |
| **IBM Carbon** | ToastNotification | **288** (352 ที่จอใหญ่) | บนขวา | ไม่จำกัด ห่าง 8 | **0 ไม่หายเอง** | **1** | ทึบ บวก `lowContrast` | `status` | **1** |
| **Adobe Spectrum** | Toast | **336 / 420 มือถือ** | ล่างกลาง | คิว ใบใหม่ล่างสุด | **ขั้นต่ำ 5000 และตัวมีปุ่มไม่หายเอง** | 1 | ทึบ 4 ชนิด | landmark | **1** (แยกเดสก์ท็อปกับมือถือ) |
| **Shopify Polaris** | Toast | สูงสุด **500** | ล่างกลาง | ไม่จำกัด ซ้อนไพ่ กางเมื่อชี้ | **5000 / 10000 เมื่อมีปุ่ม** | **1** | ทึบกลับขั้ว บวก `error` และ `magic` | `aria-live="assertive"` | **1** |
| **Atlassian** | Flag | **400** | ล่างซ้าย | **3** และปิดได้แค่ใบแรก | **8000** | ไม่จำกัด | ทึบ 5 ชนิด | `alert` | **1** |
| **Ant Design** | message / notification | ตามเนื้อหา / **384** | บนกลาง / บนขวา | **3** | **3000 / 4500** | ไม่จำกัด | พื้น elevated | `alert` | **1** |
| **GitHub Primer** | **ไม่มี** | | | | | | | | |
| **Microsoft Fluent 2** | Toast | **292** | ล่างขวา | **4** ห่าง 16 | **3000 ในโค้ด 7000 ในเอกสาร** | ผ่าน footer | **พื้นกลาง ไม่ใช้สีชนิด** | `listitem` ใน `list` บวกตัวประกาศแยก | **1** |
| **Salesforce Lightning** | notify_toast | **ขั้นต่ำ 480** | บนกลาง | ไม่ระบุ | ไม่พบในเอกสารที่ดึงได้ | ลิงก์ในข้อความ | ทึบ 6 theme | **`alert` ใบเดียว และ `status` หลายใบ** | **1** |
| **Uber Base Web** | Toast | **288** | บนกลาง | ไม่จำกัด | **0 ไม่หายเอง** | ReactNode | ทึบ 4 ชนิด | `alert` หรือ `alertdialog` | **1** |
| **Pinterest Gestalt** | Toast | สูงสุด **min(716, 100vw)** สูงอย่างน้อย 60 | **ตรงข้ามแถบนำทาง** | **1** | **ขั้นต่ำ 5000 และคิดจากจำนวนคำ** | **1 และไม่แนะนำ** | ทึบ 4 ชนิด | `status` | **1** |
| **Untitled UI** | Notification / Toast | **504 / 544 / 375** | ไม่ระบุ | ไม่ระบุ | **4000 ถึง 6000** | ไม่ระบุ | 9 แบบ | ไม่ระบุ | **1** (แยกเดสก์ท็อปกับมือถือ) |
| **Radix** | Toast | ผู้ใช้กำหนด | ผู้ใช้กำหนด | ไม่จำกัด | **5000** | **1** | ผู้ใช้กำหนด | `region` บวก `ol` บวกตัวประกาศ `status` แยก | **1** |
| **sonner (shadcn)** | Toast | **356** | ล่างขวา | **3** ห่าง 14 | **4000** | 2 (action บวก cancel) | พื้นขาว บวก `richColors` | `aria-live="polite"` ที่กล่องแม่ | **1** |
| **Mantine** | Notification | สูงสุด **440** | ล่างขวา | **5 บวกคิว** | **4000** | ไม่จำกัด | ขาว บวกแถบสีซ้าย 6 | `alert` | **1** |
| **Chakra UI v3** | Toast | เต็มกล่อง | ล่าง | **24** ห่าง 16 | **ตามชนิด 2000 ถึง 5000** | **1** | พื้น panel บวกทึบ 3 ชนิด | `status` บวก `aria-atomic` | **1** |

### 11.2 ฝั่ง banner

| เจ้า | ชื่อ | ระดับ | ปิดได้ | ปุ่มอยู่ไหน | ชนิด | ทรง | role | ขนาด |
|---|---|---|---|---|---|---|---|---|
| **Material** | Banner | 1 | มีปุ่มปิด | **ล่าง ชิดขวา** | **2 (standard และ vibrant)** | 1 | ไม่ระบุ | 1 (สูงตามบรรทัด 52/72/90) |
| **IBM Carbon** | Callout | ในเนื้อหา | **ไม่ได้** | ไม่มีปุ่ม | 6 | 2 | **ไม่มี role และไม่ประกาศ** | 1 |
| **IBM Carbon** | InlineNotification | ในสายงาน | ได้ | ในแถว (ghost) | 6 | 2 | `status` | 1 (กว้างตาม breakpoint 4 ขั้น) |
| **Adobe Spectrum** | Alert banner / In-line alert | **2** | ไม่มีปุ่มปิดใน CSS | ขวา | 4 / **5** | 1 ต่อชิ้น | ไม่ระบุ | 2 (เดสก์ท็อป 56 และมือถือ 64) |
| **Shopify Polaris** | Banner | **2 บวก 3 ผัง** | **ได้ ยกเว้นข้อมูลจำเป็น** | **ใต้ข้อความเสมอ** | 4 | 2 (ทึบ และ พื้นอ่อน) | **`alert` เมื่อ warning หรือ critical และ `status` เมื่ออื่น** | 1 |
| **Atlassian** | Banner / SectionMessage | **3** | **Banner ไม่ได้ และ SectionMessage ได้** | ลิงก์ใต้ข้อความ คั่นด้วยจุดกลาง | **3 / 5** | 1 ต่อชิ้น | `alert` | 1 (Banner สูง 48 ตายตัว) |
| **Ant Design** | Alert | **2 (ปกติ และ banner)** | **ได้ แต่ค่าเริ่มต้นไม่มีปุ่ม** | **ขวาในแถวเดียวกัน** | 4 | **2 (outlined และ filled)** | `alert` | 2 โดยพฤตินัย |
| **GitHub Primer** | Banner | **2 ถึง 3** | ได้เมื่อส่ง `onDismiss` | **inline เหนือ 500 และ stacked ใต้ 500** | **5 รวม `upsell`** | 1 | `section` landmark บวก `tabIndex -1` | **2 (default และ compact)** |
| **Microsoft Fluent 2** | MessageBar | **2 (square และ rounded)** | **ได้เสมอ แต่กลับมาใหม่รอบหน้า** | **ล่างเมื่อเกิน 2 บรรทัด** | 4 | 1 | **`group`** บวกตัวประกาศแยก | 1 |
| **Salesforce Lightning** | notify_alert / scoped-notification | **2** | ไม่ระบุ | ลิงก์ในข้อความ | **6 theme** | 2 (light และ dark) | ไม่ระบุ | 1 |
| **Uber Base Web** | Notification | 1 | **ไม่ได้ (`closeable: false`)** | ReactNode | 4 | 1 | `alert` | 1 |
| **Pinterest Gestalt** | BannerCallout / BannerSlim / BannerUpsell / BannerOverlay | **4** | **ได้ แต่ห้ามเมื่อมีงานค้าง** | primary บวก secondary | **6 / 11 / แยก** | 2 (ปกติ และ Bare) | ไม่ระบุ | **2 ถึง 3 เป็น component แยก** |
| **Mantine** | Alert | 1 | ได้ ค่าเริ่มต้นไม่มีปุ่ม | children | **ไม่มีแกนชนิด** | **6 มากสุดในตลาด** | `alert` | 1 |
| **Chakra UI v3** | Alert | 1 | ไม่มี slot | `inline` เลือกเอง | **5 รวม neutral** | **4** | ไม่ระบุใน recipe | **3 (sm md lg)** |

---

## 12. จุดที่เจ้าต่าง ๆ เห็นไม่ตรงกัน

| # | ประเด็น | ฝั่งหนึ่ง | อีกฝั่ง |
|---|---|---|---|
| 1 | ควรมี toast ไหม | มี 14 เจ้า | **ไม่ควรมีเลย 1 เจ้า คือ GitHub Primer** ที่เขียนว่า "Toasts pose significant accessibility concerns and are not recommended for use" |
| 2 | toast กับ banner เป็น component เดียวกันไหม | แยก 14 เจ้า | **รวม 1 เจ้า คือ Base Web** ที่ `Notification` คือ `Toast` ที่ตั้ง `notificationType: 'inline'` |
| 3 | ตำแหน่ง toast | ล่าง 8 เจ้า | บน 5 เจ้า และ Gestalt บอกว่า "ตรงข้ามแถบนำทาง" ซึ่งแปลว่าขึ้นกับแพลตฟอร์ม |
| 4 | toast ควรหายเองไหม | หายเอง 12 เจ้า | **ไม่หายเองเป็นค่าเริ่มต้น 2 เจ้า คือ Carbon (`timeout: 0`) และ Base Web (`autoHideDuration: 0`)** |
| 5 | เวลาหายเองเท่าไหร่ | 3000 ถึง 5000 คือช่วงที่คนส่วนใหญ่ใช้ | **8000 ของ Atlassian ที่บอกว่า 8 วินาทีคือขั้นต่ำที่ควรเป็น** และ **7000 ที่เอกสาร Fluent บอก แต่โค้ดตั้ง 3000** |
| 6 | error ควรหายเองไหม | หายเอง 10 เจ้า | **ห้ามหรือไม่หาย 4 เจ้า** คือ Atlassian ("Never use auto dismiss flags for any critical warning or error messages"), Carbon, Base Web และ Spectrum (ถ้ามีปุ่ม) |
| 7 | เวลาควรต่างตามชนิดไหม | ไม่ต่าง 13 เจ้า | **ต่าง 1 เจ้า คือ Zag ที่ Chakra ใช้** (`success: 2000` แต่ `error` และ `info` และ `warning: 5000`) |
| 8 | เวลาควรต่างตามความยาวข้อความไหม | ไม่ 14 เจ้า | **ใช่ 1 เจ้า คือ Gestalt** ที่บอกให้คิดจาก "word count divided by 200" |
| 9 | ซ้อนได้กี่ใบ | 3 ถึง 5 คือช่วงที่คนส่วนใหญ่ใช้ | **1 ใบ 2 เจ้า** (Material "Only one snackbar will be shown at a time" และ Gestalt "Show one Toast at a time") และ **24 ใบ 1 เจ้า** (Zag) |
| 10 | หยุดนาฬิกาเมื่อเมาส์ชี้ไหม | หยุด 8 เจ้า | **ไม่หยุดเป็นค่าเริ่มต้น 1 เจ้า คือ Fluent 2** (`pauseOnHover: false`) |
| 11 | toast ควรมีสีตามชนิดไหม | มี 11 เจ้า | **ไม่มี 2 เจ้า คือ Material (`inverse-surface` สีเดียว) และ Fluent 2 (`colorNeutralBackground1` เสมอ)** และ sonner ที่ต้องเปิด `richColors` เอง |
| 12 | role ของ toast | `status` 5 เจ้า | `alert` 5 เจ้า และ **Atlassian ที่ใช้ `alert` แต่เขียนในโค้ดเองว่าควรเปลี่ยนเป็น `status`** |
| 13 | live region อยู่บนตัวที่มองเห็นไหม | อยู่ 7 เจ้า | **แยกเป็นข้อความซ่อน 4 เจ้า** (Fluent, Radix, Spectrum, Material) และ 2 เจ้าเขียนเหตุผลไว้ในโค้ดว่าวางซ้อนทำให้อ่านซ้ำ |
| 14 | ใส่ `aria-live` คู่กับ `role="alert"` ได้ไหม | **Polaris ทำ** (Banner มีทั้ง `role="alert"` และ `aria-live="polite"`) | **Base Web ห้ามตรง ๆ** คอมเมนต์ว่า "adding both aria-live and role=alert causes double speaking issues" |
| 15 | banner ปิดได้ไหม | **ปิดไม่ได้ 4 เจ้า** (Atlassian Banner, Carbon Callout, Base Web Notification, Spectrum In-line alert) | **ปิดได้เสมอ 1 เจ้า คือ Fluent** ("Message bars are always dismissible") |
| 16 | ปุ่มของ banner อยู่ไหน | **ใต้ข้อความเสมอ 4 เจ้า** | **ขวาในแถวเดียวกัน 2 เจ้า** และ **ย้ายอัตโนมัติ 2 เจ้า** ด้วยกลไกต่างกัน (container query ที่ 500 เทียบ ResizeObserver) |
| 17 | banner มีแกนขนาดไหม | **ไม่มี 8 เจ้า** | มี 2 เจ้า (Chakra 3 ขนาด และ Primer 2 ขนาด) |
| 18 | toast มีแกนขนาดไหม | **ไม่มีเลย 15 เจ้า** | ไม่มีฝั่งตรงข้าม |
| 19 | มีชนิด brand หรือไม่ | ไม่มี 8 เจ้า | **มี 6 เจ้า** และตั้งชื่อไม่เหมือนกันเลย คือ `upsell` `vibrant` `magic` `announcement` `discovery` `recommendation` |
| 20 | ข้อ WCAG ที่เกี่ยวกับการหายเอง | **APG อ้าง 2.2.3 ซึ่งเป็น AAA** | **Adrian Roselli อ้าง 2.2.1 ซึ่งเป็น A และบอกว่าตกแน่** |
| 21 | ขนาดปุ่มปิด | 24 ถึง 48 | **20 ของ sonner ซึ่งไม่ผ่านแม้แต่เกณฑ์ AA** |

---

## 13. สิ่งที่ยืนยันไม่ได้ในรอบนี้

1. **ค่าจริงในไฟล์ Figma หน้า 19** ไม่ได้เปิดดูเลย รู้แค่ว่ามี 3 ลูกจาก `docs/figma-pages.md` **ต้องสำรวจก่อนตัดสินอะไรที่กระทบของเดิม** และต้องเช็คด้วยว่าของ 3 ชิ้นนั้นคืออะไร
2. **เอกสาร Salesforce Lightning ทั้งชุด** หน้า lightningdesignsystem.com ประกอบด้วยสคริปต์ ดึงไม่ได้ ข้อมูล SLDS ทั้งหมดในเอกสารนี้มาจาก CSS ที่เผยแพร่กับไฟล์ `docs.mdx` ใน GitHub **จึงไม่มีข้อมูลเรื่องเวลาหายเองและตำแหน่งที่เป็นคำแนะนำของ SLDS**
3. **เอกสาร m3.material.io และ spectrum.adobe.com** ดึงไม่ได้ ตัวเลข Material มาจากไฟล์ token กับ MDC web กับเอกสาร Android และ Spectrum มาจาก token กับ React Spectrum กับ React Aria **จึงไม่ได้อ่านคำแนะนำการออกแบบของสองเจ้านี้โดยตรง**
4. **ค่ามิลลิวินาทีของ `LENGTH_SHORT` และ `LENGTH_LONG` ของ Android** เอกสารไม่เผยแพร่เป็นตัวเลข **หาไม่เจอ** จึงไม่มีในตาราง
5. **ขนาดพื้นที่แตะของปุ่มปิดของ 5 เจ้า** (SLDS, Fluent, Spectrum, Primer, Polaris) ยืนยันไม่ได้ เพราะเจ้าเหล่านั้นใช้ icon button กลางของระบบ ซึ่งไม่ได้ตั้งขนาดในไฟล์ของ toast เอง **ต้องไปอ่านไฟล์ของ icon button อีกชั้นถ้าจะยืนยัน**
6. **ตำแหน่งปุ่มของ Gestalt BannerCallout บนมือถือ** เอกสารไม่ระบุจุดตัดเป็นตัวเลข **หาไม่เจอ**
7. **Untitled UI อ่านได้แค่หน้าเว็บ ไม่มีแพ็กเกจให้อ่าน** ตัวเลข 504 และ 544 และ 375 มาจากหน้าเว็บของเขา ไม่ได้อ่านจากไฟล์ **จึงเป็นข้อมูลระดับเดียวกับหน้าเอกสาร ไม่ใช่ระดับไฟล์ต้นทาง**
8. **โครงไฟล์ Figma ของเจ้าอื่น** ไม่ได้เปิดดูเลย จึงไม่รู้ว่าเจ้าที่โค้ดมี 4 ชนิดหรือ 6 ชนิด เปิดเป็น variant ครบใน Figma หรือไม่
9. **เว็บในเครือสำรวจได้แค่ HTML ตั้งต้น** ทั้ง 6 เว็บเติมเนื้อหาด้วยสคริปต์ **จึงไม่รู้ว่ามี toast หรือ banner ที่ถูกสร้างหลังหน้าโหลดหรือไม่** ควรเปิดดูด้วยเบราว์เซอร์จริงบนมือถือ โดยเฉพาะตัวขอสิทธิ์แจ้งเตือนของ iZooto กับ Taboola ว่าหน้าตาเป็นอย่างไร เพราะถ้าจะแทน ต้องรู้ก่อนว่าของเดิมทำอะไรได้
10. **ยังไม่มีข้อมูลทดสอบกับผู้ใช้ของเราเลย** ข้ออ้างเรื่องความยาวข้อความไทยกับการที่คนไทยคุ้นเคยกับการปัดนิ้วปิด เป็นการตีความจากบริบท ไม่ใช่ผลทดสอบ
11. **ยังไม่ได้ตรวจว่า `components/BreakingNewsTicker` ที่มีอยู่แล้วทำงานอย่างไร** ซึ่งเป็นของที่ทับซ้อนกับงานข่าวด่วนในหัวข้อ 10.3 โดยตรง **ต้องอ่านก่อนเสนออะไรที่ซ้ำกับมัน**

---

## 14. ข้อเสนอสำหรับ Nation DS

> ทุกข้อในหัวข้อนี้เป็น `[ตีความ]` ของผู้วิจัยจากหลักฐานข้างบน **รอ user ตัดสิน ยังไม่ได้แก้ไฟล์ใด ไม่ได้แตะ Figma และไม่ได้แตะ token**
> แต่ละข้อมี **เสียงข้างมากของตลาด** กำกับ เพื่อให้เห็นว่าข้อไหนมีฉันทามติและข้อไหนต้องให้คนตัดสิน

### 14.1 โครงสร้างและเส้นแบ่ง

| # | ข้อเสนอ | เสียงข้างมากของตลาด | เหตุผล |
|---|---|---|---|
| 1 | **แยกเป็น 2 component คือ `toast` และ `banner`** ไม่รวมเป็นชิ้นเดียว | **14 ใน 15 เจ้าแยก** | ของสองชิ้นนี้ต่างกันที่กลไก ไม่ใช่หน้าตา ถ้ารวมกันครึ่งหนึ่งของคุณสมบัติจะไม่มีความหมายในอีกโหมด ซึ่งเห็นได้จาก Base Web ที่ `Notification` ยังรับ `autoHideDuration` และ `placement` ได้ทั้งที่ไม่มีผล |
| 2 | **ใช้ชุด token สี ชุดไอคอน และแกนชนิดเดียวกันทั้งสองชิ้น** | เป็นสิ่งที่ Base Web ได้ประโยชน์จริงจากการรวม | ได้ประโยชน์ของการรวมโดยไม่ต้องรับภาระของการรวมโครงสร้าง |
| 3 | **banner ทำ 2 ระดับ คือ `page` และ `section`** และแยกด้วยมุมโค้งเป็นหลัก | **10 ใน 13 เจ้าแยกอย่างน้อย 2 ระดับ** และ **5 เจ้าแยกด้วยมุมโค้ง** | Fluent เขียนตรง ๆ ว่า "Use square for page level messages and rounded for component level messages" ส่วนเราใช้ `RADIUS_FORMULA` อยู่แล้ว ทำได้ทันที |
| 4 | **เขียนเกณฑ์ตัดสิน 4 ข้อลงใน Information Document** ตามลำดับที่ 3.2 สรุปไว้ | ไม่มีเจ้าไหนเขียนเป็นลำดับคำถาม แต่ทุกเจ้ามีท่อนใดท่อนหนึ่ง | **นี่คือข้อที่สำคัญที่สุดสำหรับทีมข่าว** เพราะปัญหาจริงของทีมคือ "จะใช้ตัวไหน" ไม่ใช่ "ปุ่มควรอยู่ตรงไหน" |
| 5 | **ไม่เอาข่าวด่วนไปเป็นค่าในแกนชนิด** ให้เป็นทรงหรือ component แยกที่ยืมโครง banner ระดับหน้า | **ไม่มีเจ้าไหนทำชนิดที่ผูกสีกับแบรนด์ปนในแกนเดียวกับ error** | เหตุผล 4 ข้อใน 10.3 **และต้องอ่าน `components/BreakingNewsTicker` ก่อนเสนออะไรที่ซ้ำ** |

### 14.2 toast

| # | ข้อเสนอ | เสียงข้างมากของตลาด | เหตุผล |
|---|---|---|---|
| 6 | **ความกว้างตายตัวที่ 360 บนเดสก์ท็อป และเต็มความกว้างลบขอบข้างละ 16 บนมือถือ** | **8 ใน 14 เจ้าใช้ความกว้างตายตัว** และ **6 เจ้าเปลี่ยนเป็นเต็มจอบนมือถือ** และ 360 อยู่ในช่วงฐานนิยม 288 ถึง 400 และอยู่ใกล้มัธยฐาน 392 | 360 ยังเป็นความกว้างจอมือถือมาตรฐานที่เราใช้ทดสอบอยู่แล้ว จึงเป็นเลขที่ทีมจำได้ |
| 7 | **ตำแหน่งล่างกลางบนมือถือ และล่างขวาบนเดสก์ท็อป** | **ฝั่งล่างชนะฝั่งบน 8 ต่อ 5** และ Gestalt ให้หลักการว่า "ตรงข้ามแถบนำทาง" ซึ่งเว็บเรามีแถบหัวติดบนทุกเว็บ | ล่างกลางบนมือถืออยู่ใกล้นิ้วโป้งที่สุด และล่างขวาบนเดสก์ท็อปไม่ทับเนื้อหาข่าวที่อยู่กลางหน้า |
| 8 | **ซ้อนได้ 3 ใบ ใบใหม่อยู่หน้าสุด ส่วนที่เกินเข้าคิว** | **มัธยฐานของตลาดคือ 3** และ 3 คือค่าที่ซ้ำมากที่สุด | 3 ใบที่ความกว้าง 360 ยังไม่บังเนื้อหา และคิวเป็นสิ่งที่ Fluent กับ Mantine ทำแล้วได้ผล |
| 9 | **ใช้แบบรายการ ไม่ใช่แบบซ้อนไพ่** | แบบรายการ 4 เจ้า เทียบ แบบซ้อนไพ่ 3 เจ้า เทียบ แบบแทนที่ 2 เจ้า | แบบซ้อนไพ่ต้องมี blur กับ scale ไล่ลำดับ กับโหมดกาง ซึ่งเป็นงานที่ใหญ่กว่าที่หน้า 19 ควรรับในรอบแรก |
| 10 | **หายเองที่ 5 วินาที** และ **ยืดเป็น 10 วินาทีเมื่อมีปุ่มกระทำ** | **มัธยฐานของตลาดคือ 5000** และกฎยืดเป็น 2 เท่าเป็นของ Polaris ที่พิมพ์คำเตือนลง console ให้ด้วย | 5 วินาทีคือตัวเลขที่ทั้ง Spectrum, React Aria และ Gestalt ระบุว่าเป็นขั้นต่ำเพื่อการเข้าถึง |
| 11 | **ชนิด error ไม่หายเอง** | **ตลาดเสียงข้างมากให้หายเอง 10 ต่อ 4 แต่เสียงข้างน้อยมีเหตุผลแข็งกว่า** | Atlassian เขียนว่า "Never use auto dismiss flags for any critical warning or error messages" และถ้า toast ใบนั้นเป็นที่เดียวที่ข้อความอยู่ จะตก WCAG 2.2.1 ระดับ A **ข้อนี้คือจุดที่ขอให้ยอมแตกจากเสียงข้างมาก** |
| 12 | **หยุดนาฬิกาเมื่อเมาส์ชี้และเมื่อโฟกัส และต้องจำเวลาที่เหลือ ไม่ใช่รีเซ็ต** | **8 ใน 9 เจ้าหยุดเมื่อชี้ และ 5 เจ้าหยุดเมื่อโฟกัส** | ถ้ารีเซ็ตกลับเต็ม toast จะไม่มีวันหายเมื่อเมาส์ผ่านไปผ่านมา ซึ่งเป็นกับดักที่ Polaris และ Radix เขียนโค้ดกันไว้ |
| 13 | **ปุ่มกระทำได้ 1 ปุ่ม และปุ่มปิดมีเสมอ** | **8 เจ้าจำกัดที่ 1 ปุ่ม** และ **13 ใน 14 เจ้ามีปุ่มปิด** | Carbon เขียนว่า "Only one action is allowed for each notification" และปุ่มปิดที่มีเสมอทำให้ไม่ต้องพึ่งนาฬิกาเป็นทางออกเดียว |
| 14 | **มีไอคอนประจำชนิด เติมให้อัตโนมัติ** | **11 ใน 14 เจ้ามีไอคอน** และ 2 เจ้าเติมให้ตามชนิด | ตามข้อ WCAG 1.4.1 ที่ห้ามสื่อความหมายด้วยสีอย่างเดียว **และต้องใช้ instance จาก Nation UI Icons ห้ามวาดเอง** |
| 15 | **มีข้อความรอง 1 ชั้น** (หัวข้อบวกคำอธิบาย) | **10 ใน 14 เจ้ามี** | ข้อความไทยยาวกว่าอังกฤษ การมี 2 ชั้นช่วยให้ย่อบรรทัดแรกให้สั้นได้ **แต่ไม่ต้องทำ 2 ชั้นแบบ Carbon** |
| 16 | **ไม่ทำแกนขนาด sm md lg ให้ toast** ทำ 2 มิติที่ตลาดทำแทน คือ **จำนวนบรรทัด** และ **เดสก์ท็อปเทียบมือถือ** | **ไม่มีเจ้าไหนทำแกนขนาดให้ toast เลยสักเจ้าใน 15 เจ้า** | ถ้าทำแกนขนาด ต้องตอบได้ว่าขนาดเล็กกับใหญ่ใช้ที่งานต่างกันอย่างไร ซึ่งยังตอบไม่ได้ ส่วน 2 มิติที่เสนอตอบคำถามที่มีอยู่จริง |

### 14.3 banner

| # | ข้อเสนอ | เสียงข้างมากของตลาด | เหตุผล |
|---|---|---|---|
| 17 | **กว้างเต็มกล่องที่วาง ไม่ใช่กว้างตายตัว** | **เกือบทุกเจ้าใช้ 100%** มีแค่ Spectrum ที่ตั้ง 832 ตายตัว และ Base Web ที่ตั้ง 288 | เว็บข่าวมีความกว้างเนื้อหาไม่เท่ากันในแต่ละเว็บ การผูกค่าตายตัวจะพังทันที |
| 18 | **ไม่มีปุ่มปิดเป็นค่าเริ่มต้น เปิดได้เมื่อสั่ง และห้ามปิดเมื่อมีงานค้าง** | **ปิดไม่ได้เลย 4 เจ้า บวก ค่าเริ่มต้นไม่มีปุ่ม 5 เจ้า รวม 9 เจ้า** เทียบ ปิดได้เสมอ 1 เจ้า | Polaris เขียนว่า "unless they contain critical information or an important step that customers need to take" **และต้องตอบด้วยว่าปิดแล้วกลับมาอีกไหม** ซึ่ง Atlassian ประกาศตรง ๆ ว่าตัวเองไม่จำให้ |
| 19 | **วางปุ่มกระทำไว้ใต้ข้อความตลอดเวลา** ไม่ทำกลไกย้ายอัตโนมัติในรอบแรก | **4 เจ้าวางใต้ตลอด** เทียบ **2 เจ้าวางขวาตลอด** เทียบ **2 เจ้าย้ายอัตโนมัติ** | ไม่ต้องมีกลไกวัด ไม่พังเมื่อข้อความยาว ใช้ผังเดียวทั้งเดสก์ท็อปและมือถือ **และข้อความไทยยาวกว่าอังกฤษ ทำให้เราเข้าโหมดหลายบรรทัดบ่อยกว่าที่เจ้าต่างชาติออกแบบไว้** |
| 20 | **ถ้าจะทำกลไกย้ายอัตโนมัติในอนาคต ใช้จุดตัดที่ 500** | **เป็นจุดตัดเดียวในตลาดที่ประกาศเป็นตัวเลข** (Primer ใช้ `@container banner (max-width: 500px)`) | ไม่ต้องคิดเลขเอง และ container query ตรงกับความจริงว่า banner อยู่ในกล่องกว้างไม่เท่ากัน ไม่ใช่ขึ้นกับความกว้างจอ |
| 21 | **ปุ่มกระทำได้ 2 ปุ่ม คือ หลักและรอง** | 4 เจ้ามี 2 ปุ่ม และ Atlassian เขียนว่า "In general, avoid using more than two actions" | ต่างจาก toast ที่ให้ 1 ปุ่ม เพราะ banner ไม่หายไป จึงมีเวลาให้คนอ่านตัวเลือก |
| 22 | **ทำแกนขนาด 2 ขั้นให้ banner คือ `default` และ `compact`** ไม่ทำ 5 ขั้น | **8 ใน 13 เจ้าไม่มีแกนขนาดเลย** และ เจ้าที่มีคือ Primer 2 ขั้น และ Chakra 3 ขั้น **ไม่มีเจ้าไหนทำถึง 5** | ตรงกับกฎของระบบเราที่ `input.mjs` นิยาม 5 แต่เปิดใช้จริงแค่ 3 **และ Chakra ที่ทำ 3 ขั้น ค่า padding ของ md กับ lg ก็เท่ากันอยู่แล้ว** แปลว่าแม้แต่เจ้าที่ทำก็ไม่ได้ให้ทุกมิติโตตาม |

### 14.4 ชนิดและสี

| # | ข้อเสนอ | เสียงข้างมากของตลาด | เหตุผล |
|---|---|---|---|
| 23 | **ทำ 5 ชนิด คือ `info` `success` `warning` `error` `brand`** | **ชุด 4 ตัวแรกพบเต็มใน 8 เจ้า** และ **ชนิด brand มี 6 เจ้า** | 4 ตัวแรกคือชุดมาตรฐาน และ brand จำเป็นเพราะงานขอสิทธิ์แจ้งเตือนกับชวนสมัครสมาชิกมีจริงบนเว็บเรา |
| 24 | **⚠️ ต้องเพิ่มตระกูลสี `info` เข้าระบบก่อน ซึ่งยังไม่มี** | **13 ใน 14 เจ้ามี info** | `[ของเรา]` สแกน `semantics-light-mode.json` แล้ว **ไม่พบ token ที่มีคำว่า info แม้แต่ตัวเดียว** ตัวเลือกคือ สร้างตระกูลใหม่ หรือ ใช้สีแบรนด์เป็น info **สองทางนี้ต่างกันมาก ต้องถามก่อน** ดูคำถามข้อ 4 |
| 25 | **ทำ 2 ทรง คือ พื้นอ่อน (`subtle`) กับ ทึบ (`solid`) และผูกทรงกับระดับ ไม่ให้เลือกอิสระ** | **9 เจ้าทำมากกว่า 1 ทรง** แต่เจ้าที่ให้เลือกอิสระ 4 ถึง 6 ทรงเป็นไลบรารีทั่วไป (Mantine, Chakra) ไม่ใช่ DS องค์กร | ถ้าให้เลือกอิสระ นักออกแบบสองคนจะเลือกไม่เหมือนกันในงานเดียวกัน ซึ่งเป็นปัญหาเดิมที่ระบบเราเคยเจอ |
| 26 | **⚠️ ไม่ทำทรงโปร่งมีเส้นขอบในรอบนี้** | 3 เจ้าทำ (Chakra, Mantine, Ant) ซึ่งเป็นเสียงข้างน้อย | `[คำนวณ]` `border/system/*` ขั้น 300 ของเราได้คอนทราสต์ต่อพื้นขาวแค่ **1.29 ถึง 1.94** ซึ่งไม่ผ่านเกณฑ์ 3.0 ของข้อ 1.4.11 **ถ้าจะทำ ต้องเพิ่มขั้นสีที่เข้มกว่าก่อน ซึ่งต้องถาม** |
| 27 | **⚠️ ทรงพื้นอ่อนต้องใช้ตัวหนังสือเทาเข้ม ห้ามใช้สีตระกูลเดียวกัน** | Polaris, Primer, Fluent ทำแบบนี้ทั้งหมด | `[คำนวณ]` สีตระกูลบนพื้นตระกูลเดียวกันได้ **error 4.44 และ warning 2.94 และ success 3.54 ซึ่งตก 2 ใน 3** ส่วนตัวหนังสือเทาเข้มได้ 16 ถึง 17 ทุกตระกูล **เก็บสีตระกูลไว้ให้ไอคอนและขอบเท่านั้น** |
| 28 | **⚠️ ทรงทึบต้องมี token สีตัวอักษรต่อชนิด ไม่ใช่กฎเดียวทั้งชุด** | **ไม่มีเจ้าไหนใช้ขาวได้ครบทุกชนิด** และ Polaris, Atlassian, SLDS สลับเป็นตัวเข้มที่ชนิด warning ทั้งหมด | `[คำนวณ]` ขาวบน `warning-solid` ของเราได้ **3.06** และบน `success-solid` ได้ **3.73** ซึ่งตกทั้งคู่ **ทางเลือกคือ ขยับขั้นสีขึ้นเป็น 700 หรือ ใช้ตัวหนังสือเข้มที่ชนิด warning แบบ Atlassian** ดูคำถามข้อ 5 |
| 29 | **toast ใช้ทรงทึบเป็นค่าเริ่มต้น และ banner ใช้ทรงพื้นอ่อน** | **toast ทึบคือค่าเริ่มต้นของตลาด** และ **banner พื้นอ่อนคือค่าเริ่มต้นของตลาด** และ Base Web ทำกลไกนี้ชัดที่สุดด้วย token คนละชุดในชิ้นเดียวกัน | toast ลอยอยู่บนเนื้อหา จึงต้องแยกตัวออกจากพื้นหลังด้วยความทึบ ส่วน banner อยู่ในสายเนื้อหา ถ้าทึบจะดังเกินงาน |
| 30 | **ทางเลือกที่ปลอดภัยที่สุดถ้าไม่อยากแก้สี คือให้ toast ใช้พื้นกลางแบบ Fluent และ Material** | **เจ้าที่โตที่สุด 2 เจ้าทำแบบนี้** | ทำให้ปัญหาคอนทราสต์หายไปทั้งก้อน เพราะชนิดมีผลแค่กับไอคอน **แต่เสียความเร็วในการอ่านว่าเกิดอะไรขึ้น** ดูคำถามข้อ 6 |

### 14.5 สถานะและการเข้าถึง

| # | ข้อเสนอ | เสียงข้างมากของตลาด | เหตุผล |
|---|---|---|---|
| 31 | **ไม่ทำสถานะ hover และ disabled ที่ตัวกล่อง** ทำเฉพาะ `focus-visible` | **ไม่มีเจ้าไหนทำ disabled เลย** และ hover ที่กล่องมีแค่เมื่อทั้งใบคลิกได้ | กล่องข้อความไม่ใช่ตัวควบคุม สถานะอยู่ที่ปุ่มกระทำ ปุ่มปิด และลิงก์ในข้อความ |
| 32 | **ตัวกล่อง toast ต้องโฟกัสได้ (`tabIndex=0`) และตัวกล่อง banner ต้องรับโฟกัสด้วยโค้ดได้ (`tabIndex=-1`)** | **6 เจ้าใส่ `tabIndex=0` ให้ toast** และ **2 เจ้าใส่ `tabIndex=-1` ให้ banner** | toast ต้องให้คนใช้คีย์บอร์ดเข้าถึงปุ่มข้างใน ส่วน banner ใช้เป็นสรุปข้อผิดพลาดของฟอร์ม ซึ่งต้องย้ายโฟกัสมาเมื่อกดส่ง |
| 33 | **วงแหวนโฟกัสบนพื้นทึบ ใช้วิธีประกาศตัวแปรที่ตัวกล่องแล้วให้ปุ่มอ่าน** แบบ Chakra | 4 เจ้าใช้ 4 วิธี **ไม่มีฉันทามติ** แต่วิธีของ Chakra เข้ากับระบบ variable ของเรามากที่สุด | ระบบเรามี `color/effect/focused-ring/{error,warning,success}` อยู่แล้ว **แต่ยังไม่มีตัวสำหรับพื้นเข้ม ต้องถามก่อนเพิ่ม** และต้องใช้กลไก stroke 4px outside ตามกฎวงแหวนโฟกัส 2 วิธีของเรา |
| 34 | **⚠️ แยก live region ออกจากตัวที่มองเห็น** คือ toast ที่มองเห็นไม่มี `aria-live` ส่วนข้อความให้โปรแกรมอ่านหน้าจออยู่ในกล่องซ่อนต่างหาก | **4 เจ้าใหญ่ทำแล้ว** (Fluent, Radix, Spectrum, Material) และ **2 เจ้าเขียนเหตุผลไว้ในโค้ดว่าวางซ้อนทำให้อ่านซ้ำ** | นี่คือข้อที่ถ้าไม่ตัดสินตอนนี้ จะแก้ทีหลังแพง เพราะกระทบโครง DOM ไม่ใช่แค่ attribute |
| 35 | **จับคู่ชนิดกับระดับเสียงตามนี้ `info` และ `brand` เป็น `polite` ส่วน `success` `warning` `error` เป็น `assertive`** | **3 เจ้าที่แยกตามชนิด แบ่งเส้นที่เดียวกันหมด** (Fluent Toast, Fluent MessageBar, Polaris Banner) | **นี่คือฉันทามติที่ชัดที่สุดในเรื่องการเข้าถึง** |
| 36 | **ใช้ `role="status"` ที่กล่องซ่อน ไม่ใช้ `role="alert"` และห้ามใส่ `role` คู่กับ `aria-live` บนตัวเดียวกัน** | `status` 5 เจ้า เทียบ `alert` 5 เจ้า **แต่ Atlassian ที่ใช้ alert เขียนในโค้ดเองว่าควรเปลี่ยน** | Base Web ห้ามใส่คู่กันตรง ๆ ว่า "adding both aria-live and role=alert causes double speaking issues" **และ Polaris ที่ใส่คู่กันคือตัวอย่างที่ไม่ควรลอก** |
| 37 | **ห้ามย้ายโฟกัสไปที่ toast และต้องมีปุ่มลัดไปที่กองแทน** | **APG บังคับ** ("it is crucial they do not affect keyboard focus") และ **4 เจ้าทำปุ่มลัด** | ปุ่มลัดที่ใช้จริงคือ F6 (Spectrum และ React Aria) และ F8 (Radix) และ Alt+T (sonner) **เสนอ F6 เพราะ 2 เจ้าใช้และเป็นปุ่มมาตรฐานของ landmark** |
| 38 | **ตั้งชื่อ landmark ให้บอกปุ่มลัดด้วย** เช่น "การแจ้งเตือน (F6)" | **Radix ทำ** (`label = "Notifications ({hotkey})"`) และ **Atlassian ทำ** ("Flag notifications. Press Escape to dismiss.") | ถ้าไม่บอก คนใช้โปรแกรมอ่านหน้าจอจะไม่รู้ว่ามีปุ่มลัด ซึ่งทำให้ปุ่มลัดไม่มีประโยชน์ |
| 39 | **Escape ปิด toast ใบบนสุด** | 5 เจ้าทำ แต่พฤติกรรมไม่เหมือนกัน (ปิดใบนั้น เทียบ ปิดทั้งกอง) | ปิดใบบนสุดเป็นทางสายกลาง และตรงกับกฎของ Atlassian ที่ให้ปิดได้เฉพาะใบแรก |
| 40 | **ปุ่มปิดต้องมีพื้นที่แตะ 48 คูณ 48** | **มีเจ้าเดียวที่ทำครบ คือ Carbon ที่ 48** และ **มีเจ้าที่ไม่ผ่านแม้แต่ AA คือ sonner ที่ 20** | `[มาตรฐาน]` 48 ผ่านทั้ง WCAG 2.5.8 (24) และ 2.5.5 (44) และคำแนะนำ Android (48) **และเว็บเรามีทราฟฟิกมือถือเกิน 70 เปอร์เซ็นต์** |
| 41 | **ถ้าปุ่มปิดลอยทับขอบกล่อง ต้องตรวจว่าพื้นที่แตะจริงยังครบและไม่ทับปุ่มกระทำ** | sonner และ Chakra วางลอยทับขอบ | `[ตีความ]` ข้อยกเว้นเรื่อง spacing ของ SC 2.5.8 ใช้ไม่ได้ถ้าวงกลม 24 ของสองปุ่มทับกัน |

### 14.6 การเคลื่อนไหวและเงา

| # | ข้อเสนอ | เสียงข้างมากของตลาด | เหตุผล |
|---|---|---|---|
| 42 | **เข้า 250ms และ ออก 200ms** | **มัธยฐานขาเข้า 250 และขาออก 200** และ **ทุกเจ้าให้ขาออกสั้นกว่าหรือเท่ากับขาเข้า** | ตรงกับ Atlassian และ Mantine พอดี |
| 43 | **เข้าจากขอบที่ toast เกาะอยู่ และเข้ามาไกลกว่าที่ออกไป** | ทุกเจ้าเข้าจากขอบที่ยึด (ยกเว้น Material ที่ย่อขยาย) และ **Atlassian เข้า 50 เปอร์เซ็นต์ แต่ออก 15 เปอร์เซ็นต์** | ขาออกสายตาไม่ต้องตามไปถึงไหน ถ้าทำระยะเท่ากันจะรู้สึกว่าออกช้า |
| 44 | **ใส่ `prefers-reduced-motion` ที่ปิด transition ทั้งหมด** | **พบเจ้าเดียวที่เขียนไว้ชัด คือ sonner** | เจ้าอื่นจัดการที่ชั้น motion กลาง ซึ่งเรายังไม่มี จึงต้องเขียนที่ชิ้นงาน |
| 45 | **toast ใช้ effect style ที่มีอยู่แล้ว ไม่สร้างใหม่ และ banner ไม่มีเงา** | toast ทุกเจ้ามีเงา (Carbon `0 2px 6px rgba(0,0,0,.2)` และ Fluent `shadow8` และ Material elevation 6 และ sonner `0 4px 12px rgba(0,0,0,.1)`) ส่วน **banner ในสายเนื้อหาไม่มีเงาเลยทุกเจ้า** และ Base Web ตั้ง `boxShadow: isInline ? 'none' : shadow600` ตรง ๆ | ตามกฎ Effect ของเรา **ต้องดูก่อนว่ามี style ที่เหมาะอยู่แล้วไหม แล้วเติมชื่อ component ต่อท้าย description ของ style นั้น** ค่า `shadows/bottom/lg` ของเราคือ `0px 12px 16px -4px rgba(0,0,0,0.1)` ซึ่งอยู่ในย่านเดียวกับที่ตลาดใช้ **แต่ต้องตรวจของจริงก่อนเลือก** |

### 14.7 สิ่งที่ควรทำพร้อมกัน

- **ไฟล์สูตรขนาด** ตามกฎ CLAUDE.md การสร้าง component ใหม่ที่มีหลายขนาด ต้องนิยามสูตรใน `tokens/scale/<comp>.mjs` ไปพร้อมกัน **ซึ่งแปลว่าถ้ารับข้อ 22 (banner 2 ขั้น) ต้องมี `tokens/scale/banner.mjs`** และถ้ารับข้อ 16 (toast ไม่มีแกนขนาด) **`toast.mjs` จะเก็บแค่ค่าเดี่ยวกับความกว้างสองค่า ซึ่งต้องเขียน `$description` กำกับว่าทำไมไม่มีบันได**
- **ปุ่มทุกตัวต้องเป็น instance ของ DS** ปุ่มกระทำใช้ `link-button` หรือ `button` จากหน้า 12 ส่วนปุ่มปิดใช้ `circular-icon-button` **ห้ามวาดใหม่ในหน้า 19**
- **ไอคอนต้องเป็น instance จาก Nation UI Icons** ต้นฉบับเฟรม 9349:35444
- **ชื่อ COMPONENT ต้องลงท้ายด้วยชนิด และห้ามมี `/`** ตามกฎ 2026-09-02 และ 2026-09-01 เช่น `toast` `page-banner` `section-banner` ไม่ใช่ `Toast / Error`
- **ตารางทุกตารางในเอกสารต้องใช้ instance ชุด `-table-cell` จากหน้า 26** ห้ามวาด cell เอง
- **โครงเอกสารต้องครบชนิด** Page Doc 1 อัน · Information Doc อย่างน้อย 1 (ควรมี 2 คือ เกณฑ์เลือกชิ้น และ กายวิภาคกับสถานะ) · Component Previews · Token Doc **และต้องอ่าน `docs/rules/component-doc-standard.md` §0.5 ก่อนเขียนทุกครั้ง**
- **ล้างสีดิบของหน้า 19 ให้เหลือ 0 ก่อนบอกเสร็จ** ตามกฎล้างทีละหน้า

### 14.8 สรุปสั้น เรื่องที่มีฉันทามติ เทียบ เรื่องที่ต้องให้คนตัดสิน

**เรื่องที่ตลาดตรงกันจนไม่ต้องถาม (รับได้เลย)**

| เรื่อง | ความแรงของฉันทามติ |
|---|---|
| แยก toast กับ banner เป็น 2 component | 14 ใน 15 |
| toast ไม่มีแกนขนาด | 15 ใน 15 |
| ปุ่มกระทำใน toast มี 1 ปุ่ม | 8 ใน 14 ที่ระบุ และไม่มีใครให้เกิน 2 |
| banner แยกอย่างน้อย 2 ระดับ | 10 ใน 13 |
| ห้ามย้ายโฟกัสไปที่ toast | เป็นมาตรฐาน W3C ไม่ใช่แค่เสียงข้างมาก |
| info เป็น polite ส่วนที่เหลือเป็น assertive | 3 ใน 3 ที่แยกตามชนิด |
| ขาออกเร็วกว่าหรือเท่ากับขาเข้า | ทุกเจ้าที่ประกาศทั้งสองค่า |
| banner ในสายเนื้อหาไม่มีเงา | ทุกเจ้า |
| ตัวกล่องไม่มีสถานะ disabled | 15 ใน 15 |

**เรื่องที่ตลาดไม่ตรงกันจนต้องให้คนตัดสิน (ห้ามตัดสินเอง)**

| เรื่อง | สองฝั่ง | ทำไมต้องให้คนตัดสิน |
|---|---|---|
| **ตำแหน่ง toast** | ล่าง 8 เจ้า เทียบ บน 5 เจ้า | ขึ้นกับว่าเว็บเรามีอะไรติดขอบล่างอยู่บ้าง ซึ่งผู้วิจัยไม่ได้ตรวจ |
| **error หายเองไหม** | หายเอง 10 เจ้า เทียบ ไม่หาย 4 เจ้า | ข้อเสนอ (ข้อ 11) ขอให้แตกจากเสียงข้างมาก ซึ่งต้องยืนยัน |
| **toast มีสีตามชนิดไหม** | มี 11 เจ้า เทียบ ไม่มี 2 เจ้าที่โตที่สุด | ทางที่ไม่มีสีปลอดปัญหาคอนทราสต์ แต่เสียความเร็วในการอ่าน |
| **แก้สีตระกูล หรือ แยก token สีตัวอักษร** | ตลาดทำทั้งสองทาง | กระทบชั้น semantic ของทั้งระบบ ไม่ใช่แค่หน้า 19 |
| **info มาจากไหน** | ไม่มีข้อมูล เพราะตลาดทุกเจ้ามี info อยู่แล้ว | ของเราไม่มีเลย เป็นการตัดสินใหม่ทั้งหมด |
| **แกนขนาด banner กี่ขั้น** | ไม่มีแกน 8 เจ้า เทียบ 2 ขั้น 1 เจ้า เทียบ 3 ขั้น 1 เจ้า | ขัดกับธรรมเนียม 5 ขั้นของระบบเรา |
| **ปุ่มลัดตัวไหน** | F6 2 เจ้า และ F8 1 เจ้า และ Alt+T 1 เจ้า | ไม่มีฉันทามติ และอาจชนกับปุ่มลัดของ CMS ที่ทีมใช้ |
| **banner ปิดได้แล้วจำไหม** | Fluent บอกว่ากลับมาใหม่ และ Atlassian บอกว่าไม่จำให้ | เป็นเรื่องฝั่งหลังบ้าน ไม่ใช่เรื่องออกแบบล้วน |

---

## 15. แหล่งอ้างอิง

**ไฟล์ต้นทางที่อ่านโดยตรง (แพ็กเกจ npm เวอร์ชันที่ระบุ ดาวน์โหลด 2026-10-02)**

- Material Web token `@material/web@2.5.0` [`tokens/versions/latest/sass/_md-comp-snackbar.scss`](https://unpkg.com/@material/web@2.5.0/tokens/versions/latest/sass/_md-comp-snackbar.scss), [`_md-comp-banner.scss`](https://unpkg.com/@material/web@2.5.0/tokens/versions/latest/sass/_md-comp-banner.scss), [`_md-comp-banners.scss`](https://unpkg.com/@material/web@2.5.0/tokens/versions/latest/sass/_md-comp-banners.scss), [`_md-comp-banners-rich.scss`](https://unpkg.com/@material/web@2.5.0/tokens/versions/latest/sass/_md-comp-banners-rich.scss), [`_md-sys-elevation.scss`](https://unpkg.com/@material/web@2.5.0/tokens/versions/latest/sass/_md-sys-elevation.scss)
- Material MDC snackbar `@material/snackbar@14.0.0` [`constants.js`](https://unpkg.com/@material/snackbar@14.0.0/constants.js), [`_variables.scss`](https://unpkg.com/@material/snackbar@14.0.0/_variables.scss), [`_mixins.scss`](https://unpkg.com/@material/snackbar@14.0.0/_mixins.scss), [`util.js`](https://unpkg.com/@material/snackbar@14.0.0/util.js)
- IBM Carbon `@carbon/styles@1.116.0` [`scss/components/notification/_toast-notification.scss`](https://unpkg.com/@carbon/styles@1.116.0/scss/components/notification/_toast-notification.scss), [`_inline-notification.scss`](https://unpkg.com/@carbon/styles@1.116.0/scss/components/notification/_inline-notification.scss), [`_actionable-notification.scss`](https://unpkg.com/@carbon/styles@1.116.0/scss/components/notification/_actionable-notification.scss), [`_mixins.scss`](https://unpkg.com/@carbon/styles@1.116.0/scss/components/notification/_mixins.scss) และ `@carbon/react@1.117.0` [`lib/components/Notification/Notification.js`](https://unpkg.com/@carbon/react@1.117.0/lib/components/Notification/Notification.js) และ `@carbon/layout@11.60.0` [`lib/index.js`](https://unpkg.com/@carbon/layout@11.60.0/lib/index.js) (ค่า `spacing03` คือ 0.5rem และ `spacing05` คือ 1rem)
- Adobe Spectrum `@adobe/spectrum-tokens@15.5.0` [`src/toast.json`](https://unpkg.com/@adobe/spectrum-tokens@15.5.0/src/toast.json), [`src/alert-banner.json`](https://unpkg.com/@adobe/spectrum-tokens@15.5.0/src/alert-banner.json), [`src/in-line-alert.json`](https://unpkg.com/@adobe/spectrum-tokens@15.5.0/src/in-line-alert.json) และ `@spectrum-css/toast@11.2.0` [`index.css`](https://unpkg.com/@spectrum-css/toast@11.2.0/index.css) และ `@spectrum-css/inlinealert@10.2.0` [`index.css`](https://unpkg.com/@spectrum-css/inlinealert@10.2.0/index.css)
- Shopify Polaris `@shopify/polaris@13.9.5` [`build/esm/components/Frame/components/Toast/Toast.js`](https://unpkg.com/@shopify/polaris@13.9.5/build/esm/components/Frame/components/Toast/Toast.js), [`build/esm/components/Frame/components/ToastManager/ToastManager.js`](https://unpkg.com/@shopify/polaris@13.9.5/build/esm/components/Frame/components/ToastManager/ToastManager.js), [`build/esm/components/Banner/Banner.js`](https://unpkg.com/@shopify/polaris@13.9.5/build/esm/components/Banner/Banner.js), [`build/esm/components/Banner/utilities.js`](https://unpkg.com/@shopify/polaris@13.9.5/build/esm/components/Banner/utilities.js), [`build/ts/src/utilities/frame/types.d.ts`](https://unpkg.com/@shopify/polaris@13.9.5/build/ts/src/utilities/frame/types.d.ts), [`build/ts/src/components/Banner/Banner.d.ts`](https://unpkg.com/@shopify/polaris@13.9.5/build/ts/src/components/Banner/Banner.d.ts), [`build/esm/styles.css`](https://unpkg.com/@shopify/polaris@13.9.5/build/esm/styles.css)
- Atlassian `@atlaskit/flag@19.0.0` [`dist/es2019/flag.js`](https://unpkg.com/@atlaskit/flag@19.0.0/dist/es2019/flag.js), [`dist/es2019/flag-group.js`](https://unpkg.com/@atlaskit/flag@19.0.0/dist/es2019/flag-group.js), [`dist/es2019/auto-dismiss-flag.js`](https://unpkg.com/@atlaskit/flag@19.0.0/dist/es2019/auto-dismiss-flag.js), [`dist/es2019/constants.js`](https://unpkg.com/@atlaskit/flag@19.0.0/dist/es2019/constants.js), [`dist/types/types.d.ts`](https://unpkg.com/@atlaskit/flag@19.0.0/dist/types/types.d.ts) และ `@atlaskit/banner@15.3.4` [`dist/es2019/components/banner.js`](https://unpkg.com/@atlaskit/banner@15.3.4/dist/es2019/components/banner.js), [`dist/types/components/banner.d.ts`](https://unpkg.com/@atlaskit/banner@15.3.4/dist/types/components/banner.d.ts) และ `@atlaskit/section-message@10.2.6` [`dist/es2019/section-message.js`](https://unpkg.com/@atlaskit/section-message@10.2.6/dist/es2019/section-message.js), [`dist/types/types.d.ts`](https://unpkg.com/@atlaskit/section-message@10.2.6/dist/types/types.d.ts)
- Ant Design `antd@6.6.5` [`es/message/useMessage.js`](https://unpkg.com/antd@6.6.5/es/message/useMessage.js), [`es/message/interface.d.ts`](https://unpkg.com/antd@6.6.5/es/message/interface.d.ts), [`es/message/style/index.js`](https://unpkg.com/antd@6.6.5/es/message/style/index.js), [`es/notification/useNotification.js`](https://unpkg.com/antd@6.6.5/es/notification/useNotification.js), [`es/notification/style/index.js`](https://unpkg.com/antd@6.6.5/es/notification/style/index.js), [`es/alert/Alert.js`](https://unpkg.com/antd@6.6.5/es/alert/Alert.js), [`es/alert/Alert.d.ts`](https://unpkg.com/antd@6.6.5/es/alert/Alert.d.ts), [`es/alert/style/index.js`](https://unpkg.com/antd@6.6.5/es/alert/style/index.js)
- GitHub Primer `@primer/react@38.40.1` [`dist/Banner/Banner.d.ts`](https://unpkg.com/@primer/react@38.40.1/dist/Banner/Banner.d.ts), [`dist/Banner/Banner.js`](https://unpkg.com/@primer/react@38.40.1/dist/Banner/Banner.js), [`dist/Banner/Banner-41040ab7.css`](https://unpkg.com/@primer/react@38.40.1/dist/Banner/Banner-41040ab7.css), [`dist/Flash/Flash.d.ts`](https://unpkg.com/@primer/react@38.40.1/dist/Flash/Flash.d.ts)
- Microsoft Fluent 2 `@fluentui/react-toast@9.8.4` [`dist/index.d.ts`](https://unpkg.com/@fluentui/react-toast@9.8.4/dist/index.d.ts), [`lib/components/ToastContainer/useToastContainer.js`](https://unpkg.com/@fluentui/react-toast@9.8.4/lib/components/ToastContainer/useToastContainer.js), [`lib/components/Toaster/useToaster.js`](https://unpkg.com/@fluentui/react-toast@9.8.4/lib/components/Toaster/useToaster.js), [`lib/components/Toaster/useToasterStyles.styles.raw.js`](https://unpkg.com/@fluentui/react-toast@9.8.4/lib/components/Toaster/useToasterStyles.styles.raw.js), [`lib/components/Toast/useToastStyles.styles.raw.js`](https://unpkg.com/@fluentui/react-toast@9.8.4/lib/components/Toast/useToastStyles.styles.raw.js), [`lib/components/AriaLive/useAriaLive.js`](https://unpkg.com/@fluentui/react-toast@9.8.4/lib/components/AriaLive/useAriaLive.js), [`lib/state/vanilla/createToaster.js`](https://unpkg.com/@fluentui/react-toast@9.8.4/lib/state/vanilla/createToaster.js), [`lib/state/vanilla/getPositionStyles.js`](https://unpkg.com/@fluentui/react-toast@9.8.4/lib/state/vanilla/getPositionStyles.js) และ `@fluentui/react-message-bar@9.7.7` [`dist/index.d.ts`](https://unpkg.com/@fluentui/react-message-bar@9.7.7/dist/index.d.ts), [`lib/components/MessageBar/useMessageBar.js`](https://unpkg.com/@fluentui/react-message-bar@9.7.7/lib/components/MessageBar/useMessageBar.js), [`lib/components/MessageBar/useMessageBarStyles.styles.raw.js`](https://unpkg.com/@fluentui/react-message-bar@9.7.7/lib/components/MessageBar/useMessageBarStyles.styles.raw.js), [`lib/components/MessageBar/useMessageBarReflow.js`](https://unpkg.com/@fluentui/react-message-bar@9.7.7/lib/components/MessageBar/useMessageBarReflow.js) และ `@fluentui/tokens@1.0.0-alpha.24` [`lib/global/borderRadius.js`](https://unpkg.com/@fluentui/tokens@1.0.0-alpha.24/lib/global/borderRadius.js)
- Salesforce Lightning `@salesforce-ux/design-system@2.264.1` [`assets/styles/salesforce-lightning-design-system.css`](https://unpkg.com/@salesforce-ux/design-system@2.264.1/assets/styles/salesforce-lightning-design-system.css) และ [`ui/components/toast/docs.mdx` บน GitHub](https://github.com/salesforce-ux/design-system/blob/main/ui/components/toast/docs.mdx)
- Uber Base Web `baseui@18.2.0` [`toast/constants.js`](https://unpkg.com/baseui@18.2.0/toast/constants.js), [`toast/toast.js`](https://unpkg.com/baseui@18.2.0/toast/toast.js), [`toast/toaster.js`](https://unpkg.com/baseui@18.2.0/toast/toaster.js), [`toast/styled-components.js`](https://unpkg.com/baseui@18.2.0/toast/styled-components.js), [`notification/notification.js`](https://unpkg.com/baseui@18.2.0/notification/notification.js), [`themes/light-theme/color-component-tokens.js`](https://unpkg.com/baseui@18.2.0/themes/light-theme/color-component-tokens.js), [`themes/shared/animation.js`](https://unpkg.com/baseui@18.2.0/themes/shared/animation.js)
- Pinterest Gestalt `gestalt@177.0.12` [`dist/Toast.d.ts`](https://unpkg.com/gestalt@177.0.12/dist/Toast.d.ts), [`dist/BannerSlim.d.ts`](https://unpkg.com/gestalt@177.0.12/dist/BannerSlim.d.ts), [`dist/BannerCallout.d.ts`](https://unpkg.com/gestalt@177.0.12/dist/BannerCallout.d.ts), [`dist/BannerUpsell.d.ts`](https://unpkg.com/gestalt@177.0.12/dist/BannerUpsell.d.ts), [`dist/BannerOverlay.d.ts`](https://unpkg.com/gestalt@177.0.12/dist/BannerOverlay.d.ts), [`src/Toast.tsx`](https://unpkg.com/gestalt@177.0.12/src/Toast.tsx), [`src/Toast.css`](https://unpkg.com/gestalt@177.0.12/src/Toast.css), [`src/BannerSlim.tsx`](https://unpkg.com/gestalt@177.0.12/src/BannerSlim.tsx)
- Radix `@radix-ui/react-toast@1.2.23` [`dist/index.mjs`](https://unpkg.com/@radix-ui/react-toast@1.2.23/dist/index.mjs)
- sonner (ตัวที่ shadcn ใช้) `sonner@2.0.8` [`dist/index.mjs`](https://unpkg.com/sonner@2.0.8/dist/index.mjs), [`dist/styles.css`](https://unpkg.com/sonner@2.0.8/dist/styles.css)
- Mantine `@mantine/notifications@9.6.3` [`lib/Notifications.d.ts`](https://unpkg.com/@mantine/notifications@9.6.3/lib/Notifications.d.ts), [`styles.css`](https://unpkg.com/@mantine/notifications@9.6.3/styles.css), [`esm/get-auto-close/get-auto-close.mjs`](https://unpkg.com/@mantine/notifications@9.6.3/esm/get-auto-close/get-auto-close.mjs) และ `@mantine/core@9.6.3` [`lib/components/Alert/Alert.d.ts`](https://unpkg.com/@mantine/core@9.6.3/lib/components/Alert/Alert.d.ts), [`lib/components/Notification/Notification.d.ts`](https://unpkg.com/@mantine/core@9.6.3/lib/components/Notification/Notification.d.ts), [`esm/components/Alert/Alert.mjs`](https://unpkg.com/@mantine/core@9.6.3/esm/components/Alert/Alert.mjs), [`esm/components/Notification/Notification.mjs`](https://unpkg.com/@mantine/core@9.6.3/esm/components/Notification/Notification.mjs), [`styles.css`](https://unpkg.com/@mantine/core@9.6.3/styles.css)
- Chakra UI `@chakra-ui/react@3.37.0` [`dist/esm/theme/recipes/toast.js`](https://unpkg.com/@chakra-ui/react@3.37.0/dist/esm/theme/recipes/toast.js), [`dist/esm/theme/recipes/alert.js`](https://unpkg.com/@chakra-ui/react@3.37.0/dist/esm/theme/recipes/alert.js) และเครื่องสถานะที่อยู่ข้างใต้ `@zag-js/toast@1.44.0` [`dist/toast.utils.js`](https://unpkg.com/@zag-js/toast@1.44.0/dist/toast.utils.js), [`dist/toast.store.js`](https://unpkg.com/@zag-js/toast@1.44.0/dist/toast.store.js), [`dist/toast.connect.js`](https://unpkg.com/@zag-js/toast@1.44.0/dist/toast.connect.js), [`dist/toast-group.connect.js`](https://unpkg.com/@zag-js/toast@1.44.0/dist/toast-group.connect.js)

**หน้าเอกสารทางการ**

- [IBM Carbon Notification usage.mdx](https://raw.githubusercontent.com/carbon-design-system/carbon-website/main/src/pages/components/notification/usage.mdx) และ [Notification accessibility.mdx](https://raw.githubusercontent.com/carbon-design-system/carbon-website/main/src/pages/components/notification/accessibility.mdx) และ [หน้า Notification accessibility ที่เผยแพร่](https://carbondesignsystem.com/components/notification/accessibility/)
- [Material Components Android Snackbar.md](https://raw.githubusercontent.com/material-components/material-components-android/master/docs/components/Snackbar.md)
- [React Spectrum Toast](https://react-spectrum.adobe.com/react-spectrum/Toast.html) และ [React Aria Toast](https://react-aria.adobe.com/Toast)
- [Atlassian Design System Flag usage](https://atlassian.design/components/flag/usage) และ [Banner usage](https://atlassian.design/components/banner/usage)
- [Ant Design message](https://ant.design/components/message) และ [Alert](https://ant.design/components/alert)
- [GitHub Primer Banner](https://primer.style/components/banner) และ [**Primer accessibility เรื่อง toast**](https://primer.style/accessibility/toasts/) และ [Primer deprecated Toast](https://primer.style/deprecated-components/toast/)
- [Fluent 2 Toast usage](https://fluent2.microsoft.design/components/web/react/core/toast/usage) และ [MessageBar usage](https://fluent2.microsoft.design/components/web/react/core/messagebar/usage)
- [Pinterest Gestalt Toast](https://gestalt.pinterest.systems/web/toast) และ [BannerCallout](https://gestalt.pinterest.systems/web/bannercallout) และ [BannerSlim](https://gestalt.pinterest.systems/web/bannerslim)
- [Untitled UI notification components](https://www.untitledui.com/components/notifications)
- [Radix Toast](https://www.radix-ui.com/primitives/docs/components/toast)

**มาตรฐาน**

- [WAI-ARIA APG Alert Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/) และ [Alert Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/) และ [Landmark Regions](https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/)
- [WCAG 2.2 SC 2.2.1 Timing Adjustable](https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html) และ [SC 2.2.3 No Timing](https://www.w3.org/WAI/WCAG22/Understanding/no-timing.html) และ [SC 2.2.4 Interruptions](https://www.w3.org/WAI/WCAG22/Understanding/interruptions.html)
- [WCAG 2.2 SC 2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) และ [SC 2.5.5 Target Size (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html)
- [WCAG SC 1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html) และ [SC 1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) และ [SC 1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
- [MDN ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)

**แหล่งรอง**

- [Adrian Roselli, Defining Toast Messages](https://adrianroselli.com/2020/01/defining-toast-messages.html)
- [Nielsen Norman Group, Indicators, Validations, and Notifications](https://www.nngroup.com/articles/indicators-validations-notifications/)

**ไฟล์ในโปรเจกต์ที่อ่านประกอบ (อ่านอย่างเดียว ไม่ได้แก้)**

- `tokens/tokens.json/semantics-light-mode.json` และ `primitive.json` (ค่าสีจริงของ `color/background/system/*` และ `foreground/system/*` และ `border/system/*` และ `background/brand/solid`)
- `tokens/tokens.json/component.json` (ตรวจว่าไม่มี token ชื่อ toast banner alert notification snackbar)
- `tokens/scale/global-scale.config.mjs` (`CONTROL_HEIGHT` และ `RADIUS_SCALE` และ `RADIUS_FORMULA`)
- `tokens/output/css/typography.css` (ค่า resolved ของ `label/*` และ `body/*` และ `meta/*`)
- `tokens/output/css/variables.css` (ค่า `shadows/{bottom,top,center}/{xs..xl}`)
- `docs/figma-pages.md` (หน้า 19 node `7121:7238`)
- `components/` (ยืนยันว่ามี `BreakingNewsTicker` แต่ไม่มี Toast หรือ Banner)
- [docs/research/tabs-component.md](tabs-component.md) และ [docs/research/slider-component.md](slider-component.md) (วิธีเก็บข้อมูลและรูปแบบเอกสาร)

**การสำรวจของผู้วิจัย**

- HTML ฝั่งเซิร์ฟเวอร์ของหน้าแรก 6 เว็บในเครือ ดึงวันที่ 2026-10-02 ด้วย user agent ของ iPhone Safari (bangkokbiznews.com, nationtv.tv, komchadluek.net, thansettakij.com, springnews.co.th, posttoday.com)
- คำนวณคอนทราสต์ทุกค่าด้วยสูตร relative luminance ของ WCAG จากค่าสีที่อ่านจากไฟล์ต้นทางข้างบน

---

## 16. คำถามที่ต้องตัดสินก่อนลงมือ

> เรียงตามลำดับที่ควรตัดสิน เพราะข้อต้น ๆ เป็นเงื่อนไขของข้อหลัง

1. **สำรวจหน้า 19 ก่อนไหม** หน้านี้มีของอยู่แล้ว 3 ชิ้น ผู้วิจัยไม่ได้เปิดดูตามขอบเขตที่ได้รับ **ควรให้ไปสำรวจและรายงานก่อน** ว่าของ 3 ชิ้นนั้นคืออะไร เพราะข้อเสนอทั้งหมดในหัวข้อ 14 เขียนบนสมมติฐานว่าเริ่มจากศูนย์
2. **แยกเป็น 2 component คือ `toast` กับ `banner`** ใช่หรือไม่ (เสียงข้างมากของตลาด 14 ใน 15 เจ้า)
3. **banner ทำ 2 ระดับ คือ `page` กับ `section`** ใช่หรือไม่ และแยกด้วยมุมโค้งแบบ Fluent ใช่หรือไม่
4. **⚠️ ตระกูลสี `info` มาจากไหน** ระบบเราไม่มีเลย มี 3 ทาง **ต้องเลือก 1**
   - ก. **สร้างตระกูล `info` ใหม่** ครบทุกชั้น (primary 50 · secondary 100 · solid 600 · foreground 500 และ 600 · border 300) ซึ่งเป็นงานที่กระทบชั้น semantic ของทั้งระบบ ไม่ใช่แค่หน้า 19
   - ข. **ใช้สีแบรนด์เป็น info** ซึ่งประหยัดงาน แต่ทำให้ info กับ brand แยกกันไม่ออก และแบรนด์ของ 6 เว็บไม่เหมือนกัน
   - ค. **ไม่มี info ใช้ neutral แทน** แบบที่ Spectrum ทำกับ toast (ที่ไม่มี warning) และ Chakra ทำ (ที่ info ไม่มีสไตล์แยก)
5. **⚠️ ทรงทึบแก้เรื่องคอนทราสต์ด้วยทางไหน** `[คำนวณ]` ขาวบน `warning-solid` ได้ 3.06 และบน `success-solid` ได้ 3.73 ซึ่งตกทั้งคู่ มี 3 ทาง **ต้องเลือก 1**
   - ก. **ขยับขั้นสีขึ้นเป็น 700** สำหรับ warning และ success ในทรงทึบ ซึ่งจะทำให้สีของทรงทึบไม่ตรงกับ `foreground/system/*-primary` ที่ใช้อยู่
   - ข. **ใช้ตัวหนังสือเข้มที่ชนิด warning แบบ Atlassian และ Polaris และ SLDS** ซึ่งต้องเพิ่ม token สีตัวอักษรต่อชนิด
   - ค. **ไม่ทำทรงทึบเลย ใช้พื้นกลางแบบ Fluent และ Material** ซึ่งปลอดปัญหานี้ทั้งก้อน
6. **toast มีสีตามชนิดไหม** 11 เจ้ามี เทียบ 2 เจ้าที่โตที่สุด (Material และ Fluent) ไม่มี **ถ้าไม่มี ปัญหาข้อ 5 หายไปทั้งหมด แต่เสียความเร็วในการอ่านว่าเกิดอะไรขึ้น**
7. **⚠️ ทรงพื้นอ่อนใช้ตัวหนังสือเทาเข้มแทนสีตระกูล** ใช่หรือไม่ `[คำนวณ]` สีตระกูลบนพื้นตระกูลเดียวกันได้ 2.94 ถึง 4.44 ซึ่งตก 2 ใน 3 ส่วนเทาเข้มได้ 16 ถึง 17 ทุกตระกูล
8. **ตัดทรงโปร่งมีเส้นขอบออกจากรอบนี้** ใช่หรือไม่ `[คำนวณ]` `border/system/*` ขั้น 300 ได้ 1.29 ถึง 1.94 ต่อพื้นขาว ไม่ผ่านเกณฑ์ 3.0 **ถ้าจะทำต้องเพิ่มขั้นสีที่เข้มกว่าก่อน**
9. **ชนิด `brand` มี 1 ชนิดพอไหม** หรือต้องแยกเป็น 2 แบบ Atlassian ที่มี `announcement` (สีกลางทึบ) กับ `discovery` (สีม่วงพื้นอ่อน)
10. **ข่าวด่วนทำเป็นทรงหรือ component แยก ไม่ใช่ค่าในแกนชนิด** ใช่หรือไม่ **และของนี้ชนกับ `components/BreakingNewsTicker` ที่มีอยู่แล้วหรือไม่** ต้องอ่านก่อนตามกฎ ask-first
11. **ตำแหน่ง toast** ล่างกลางบนมือถือและล่างขวาบนเดสก์ท็อป ใช่หรือไม่ (ตลาดไม่มีฉันทามติ 8 ต่อ 5)
12. **ความกว้าง toast 360 บนเดสก์ท็อป** ใช่หรือไม่ (ช่วงฐานนิยมของตลาด 288 ถึง 400)
13. **ซ้อน 3 ใบ แบบรายการ ไม่ใช่แบบซ้อนไพ่** ใช่หรือไม่ (มัธยฐานตลาด 3)
14. **เวลาหายเอง 5 วินาที และ 10 วินาทีเมื่อมีปุ่ม** ใช่หรือไม่ (มัธยฐานตลาด 5000 และกฎยืด 2 เท่าของ Polaris)
15. **⚠️ ชนิด error ไม่หายเอง** ใช่หรือไม่ **ข้อนี้ขอให้แตกจากเสียงข้างมากของตลาด** (10 เจ้าให้หายเอง เทียบ 4 เจ้าที่ห้ามหรือไม่หาย) เหตุผลคือถ้า toast ใบนั้นเป็นที่เดียวที่ข้อความอยู่ จะตก WCAG 2.2.1 ระดับ A
16. **แกนขนาดของ banner กี่ขั้น** ข้อเสนอคือ 2 ขั้น (`default` และ `compact`) ซึ่งขัดกับธรรมเนียม 5 ขั้นของระบบเรา **ถ้าจะทำ 5 ขั้นให้เหมือนหน้าอื่น ต้องตอบได้ว่าแต่ละขั้นมีไว้ทำอะไร** เพราะ 8 ใน 13 เจ้าไม่มีแกนขนาดเลย และไม่มีเจ้าไหนทำถึง 5
17. **toast ไม่มีแกนขนาดเลย** ใช่หรือไม่ (15 ใน 15 เจ้าไม่มี) และทำ 2 มิติที่ตลาดทำแทน คือ **จำนวนบรรทัด** และ **เดสก์ท็อปเทียบมือถือ**
18. **⚠️ แยก live region ออกจากตัวที่มองเห็น** ใช่หรือไม่ **ข้อนี้ต้องตัดสินตอนนี้ เพราะกระทบโครง DOM ไม่ใช่แค่ attribute** (4 เจ้าใหญ่ทำแล้ว และ 2 เจ้าเขียนเหตุผลไว้ในโค้ด)
19. **ปุ่มลัดไปที่กอง toast ใช้ปุ่มไหน** F6 (2 เจ้า) หรือ F8 (1 เจ้า) หรือ Alt+T (1 เจ้า) **ต้องตรวจก่อนว่าชนกับปุ่มลัดของ CMS ที่ทีมใช้หรือไม่**
20. **ปุ่มปิดขนาด 48 คูณ 48** ใช่หรือไม่ (มีเจ้าเดียวที่ทำครบ คือ Carbon) และ **จะวางลอยทับขอบกล่องหรือวางในกรอบ** ถ้าลอยทับ ต้องตรวจพื้นที่แตะจริง
21. **วางปุ่มกระทำของ banner ไว้ใต้ข้อความตลอดเวลา** ใช่หรือไม่ (4 เจ้าทำ) หรือทำกลไกย้ายอัตโนมัติที่จุดตัด 500 แบบ Primer
22. **effect style ที่จะให้ toast ใช้คือตัวไหน** ตามกฎ Effect ของเรา ต้องดูก่อนว่ามี style ที่เหมาะอยู่แล้วไหม แล้วเติมชื่อ component ต่อท้าย description **ผู้วิจัยยังไม่ได้อ่าน description ของ 15 style เพื่อเลือก** ค่าที่ตลาดใช้อยู่ในย่าน `0 2px 6px` ถึง `0 4px 12px` ซึ่งใกล้ `shadows/bottom/md` และ `lg` ของเรา
23. **เงาของ banner ไม่มี** ใช่หรือไม่ (ทุกเจ้าไม่มีเงาที่ banner ในสายเนื้อหา)
24. **จะทำงานคุกกี้ในรอบนี้ไหม** `[สำรวจ]` ไม่พบตัวขอความยินยอมคุกกี้ใน HTML ตั้งต้นของเว็บไหนเลยทั้ง 6 เว็บ ซึ่งเป็นช่องว่างทางกฎหมาย **แต่เกินขอบเขตหน้า 19** ควรบันทึกเป็นงานค้างแยกหรือไม่

---

## ⚠️ แก้ข้อเท็จจริง 2026-10-15

**ข้อความในเอกสารนี้ที่บอกว่า `components/BreakingNewsTicker` มีอยู่แล้วในระดับโค้ด ไม่เป็นความจริง**

ตอนสำรวจเห็นแค่ชื่อโฟลเดอร์แล้วสรุปว่าเป็นโค้ดที่มีคนทำไว้ ของจริงเป็น **โฟลเดอร์เปล่า 0 ไฟล์** ลบทิ้งแล้ว 2026-10-15 พร้อมกับโฟลเดอร์เปล่าอีก 3 ตัวคือ `CategoryTabs` `HeroImage` `NavigationBar`

**ผลต่อข้อเสนอในเอกสารนี้**

- ข้อเสนอข้อ 5 ที่ว่าข่าวด่วนควรเป็นทรงหรือ component แยก **ยังใช้ได้ เหตุผลไม่ได้อิงกับโฟลเดอร์นั้น**
- คำถามค้างข้อ 10 ที่ว่าของนี้ชนกับ `components/BreakingNewsTicker` หรือไม่ **ตอบได้แล้วว่าไม่ชน เพราะไม่มีของนั้นอยู่จริง**
- ประโยคที่สั่งให้อ่าน `components/BreakingNewsTicker` ก่อนเสนออะไรที่ซ้ำ **ยกเลิกได้ ไม่มีอะไรให้อ่าน**

**บทเรียน** นับของจากชื่อโฟลเดอร์แล้วสรุปว่ามีของ เป็นความผิดพลาดที่ลามไปถึงข้อสรุปของงานวิจัย ต้องเปิดดูข้างในก่อนเสมอ
