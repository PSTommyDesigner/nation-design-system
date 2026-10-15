# BBC GEL (Global Experience Language) + BBC Design System

> Research reference สำหรับ Nation Design System อัปเดต 2026-07-10
> โฟกัส: multi-brand news + editorial typography

## Overview
GEL (Global Experience Language) คือกรอบดีไซน์กลางของ BBC ที่ใช้ครอบ product/service ออนไลน์ทั้งหมด
เป้าหมายเดิม: สร้าง "ภาษาประสบการณ์ร่วม" เพื่อความ consistent ข้ามพอร์ตโฟลิโอที่มีหลายแบรนด์ หลาย audience
หลาย context และหลายทีมออกแบบ

ระดับสเกลจริง (อ้างจาก talk ทีม BBC):
- รองรับ **10+ แบรนด์ · 25+ engineering teams**
- ให้บริการ **~4.8 พันล้าน requests/เดือน**
- มี **GEL Technical Guides** = คู่มือ framework-agnostic เน้น accessibility ตาม BBC Accessibility Guidelines

นี่คือเคสที่ตรงกับ Nation ที่สุด: องค์กรสื่อเดียว หลายแบรนด์ หลายทีม ต้อง consistent แต่ยังต่างกันได้

## 1. Token architecture + multi-brand
BBC ใช้แนวคิด **"levers" (คันโยกธีม)** เป็นหัวใจ theming มี 3 levers:
1. **font palette** (ชุดฟอนต์/typography)
2. **core colour palette** (สีพื้นฐาน system-wide)
3. **brand colour palette** (สีเฉพาะแบรนด์/service)

คนที่สร้างเพจเลือกชุด lever ได้ แล้ว **ทุก component ต้องทำงานได้กับทุก lever โดยอัตโนมัติ (out-of-the-box)**
แต่ละแบรนด์ map "service-level tokens" ของตัวเองเข้าไปใน lever (เช่น news lever)

จุดสำคัญของ token layer: **token แทน "เจตนา/สิ่งที่จะสื่อ" ไม่ใช่แค่ค่า hex**
เช่น decision เรื่อง contrast/accessibility ถูกตัดสินไว้ล่วงหน้าในตัว token แล้ว
ไม่ว่าจะสลับไปแบรนด์ไหน token ก็ยังทำงานเข้ากันข้าม component

## 2. Theming
- Theming = สลับ lever (font + core + brand palette) ต่อ service/แบรนด์
- Component เดียว render ได้ทุกธีม ไม่ต้อง fork โค้ดต่อแบรนด์
- Accessibility/contrast ถูก bake เข้า token → เปลี่ยนธีมแล้วยัง pass เกณฑ์

## 3. Component เฉพาะข่าว
GEL เป็น pattern-based (framework-agnostic) เน้น "GEL design patterns" เช่น navigation, cards, media
โดย Technical Guides ให้ตัวอย่างโค้ดที่ compliant ทั้ง BBC guideline + industry best practice

## 4. Typography
font palette เป็น lever ระดับเดียวกับสี → เลือกชุดฟอนต์พร้อมกับ set สีของเพจ
ทำให้ typography เป็น "ตัวแปรธีม" ที่สลับได้ ไม่ใช่ค่าตายตัว

## 5. Performance / Accessibility
- Accessibility เป็น first-class: ตัดสิน contrast ที่ชั้น token ล่วงหน้า
- GEL Technical Guides เขียนแบบ code-centric เน้น compliance ทุก component

## 6. Governance
- ทีม design system **review component ใหม่ก่อนเข้า codebase**
- ตรวจว่าใช้ token/lever ถูกต้อง (well-defined tokens in lever)
- ปรัชญา **"gardening"** ไม่ใช่ blocking ชวนคุยแทนการปิดกั้น เพื่อดึงเข้ามาตรฐาน

## สิ่งที่ Nation DS ควรเรียนรู้
1. **ทำ "levers" ให้ 6 เว็บ** แยก theme เป็น 3 คันโยก (font palette / core color / brand color) แล้วบังคับให้ทุก
   component รองรับทุก lever. แต่ละเว็บ (bangkokbiznews, komchadluek, ฯลฯ) แค่ map brand tokens ของตัวเองเข้า lever
   ไม่ต้อง fork component ตรงกับสถาปัตยกรรม `component` collection ที่เรามีอยู่
2. **Token = เจตนา ไม่ใช่ hex** ฝัง decision เรื่อง contrast/accessibility ไว้ในชั้น semantic token ตั้งแต่ต้น
   สอดคล้องกฎ "ห้ามใช้สีดิบ ต้อง bind variable" ของเรา และทำให้สลับแบรนด์/dark mode แล้วยัง pass เกณฑ์อัตโนมัติ
3. **Governance แบบ gardening** ตั้งกระบวนการ review component ใหม่ก่อน merge (เช็คว่าผูก token/lever ถูก)
   แต่ใช้วิธี "ชวนคุย" ไม่ block ให้เข้ากับวัฒนธรรม ask-first ของทีม

## Sources
- [Scaling the BBC Design System (InfoQ)](https://www.infoq.com/presentations/scale-bbc-design/)
- [Lessons creating a design system for BBC Online (Medium)](https://medium.com/bbc-product-technology/the-lessons-learnt-creating-a-design-system-for-bbc-online-38625885870e)
- [GEL Technical Guide](https://bbc.github.io/gel/)
- [Mark Hurrell BBC GEL](https://mhurrell.co.uk/work/bbc-global-experience-language/)
