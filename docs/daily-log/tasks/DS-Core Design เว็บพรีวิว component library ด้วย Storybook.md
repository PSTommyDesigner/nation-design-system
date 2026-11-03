---
name: "[DS]-[Core] Design เว็บพรีวิว component library ด้วย Storybook"
asana: "https://app.asana.com/0/1212508564439334/1219616470269200"
status: "Internal Review / Feedback รอ Stakeholder ตรวจสอบ"
completed: true
project: "Design System"
assign_date: "2026-10-19"
start: "2026-10-19"
due: "2026-10-27"
created: "2026-10-19"
source: "Asana"
---
# [DS]-[Core] Design เว็บพรีวิว component library ด้วย Storybook

## รายละเอียดงาน

**Problem ปัญหาคืออะไร ? :** ทีมอื่นในเครือ Nation Group (bangkokbiznews, nationtv, komchadluek, thansettakij, springnews, posttoday) ไม่มีที่ดู component library ของ Nation Design System แบบ render จริง ใช้งานได้จริง มีแต่ README กับโค้ดใน repo ที่ต้อง clone มาอ่านเอง component มีอยู่แล้ว 23 ตัว เขียน JSDoc ภาษาไทยอธิบายทุก prop ไว้ละเอียดแต่ไม่มีที่แสดงผล**Goal ทำเพื่ออะไร ? :** มีเว็บพรีวิวที่ทีมอื่นเข้ามาดู component จริง ลองเปลี่ยนค่า prop ได้ อ่าน prop table ที่สร้างจาก JSDoc อัตโนมัติ ไม่ต้องเขียนเอกสารซ้ำ และลดความเสี่ยงที่เอกสารกับโค้ดจริงจะ drift จากกันเหมือนที่เคยเจอกับ token หลายรอบ**Requirements ขอบเขตงาน**
1. เพิ่ม react react-dom storybook และ @storybook/react-vite เป็น dependency ชุดแรกของ repo (ก่อนหน้านี้ไม่มี dependency รันไทม์เลย)
2. ตั้งค่า .storybook/main.ts และ preview.ts ให้โหลด tokens/output/css/variables.css เป็น global CSS
3. เขียนไฟล์ stories.tsx ให้ครบทั้ง 23 component ใช้ autodocs ดึง prop table จาก JSDoc ที่มีอยู่แล้ว ไม่เขียนคำอธิบายซ้ำ
4. ตั้งคำสั่ง npm run storybook สำหรับ dev และ npm run build-storybook สำหรับ build แบบ static
5. เพิ่ม GitHub Actions workflow deploy ขึ้น GitHub Pages อัตโนมัติเมื่อ push เข้า main
6. ไม่รวมในรอบนี้ ตั้งใจทำแยกทีหลัง คือ custom theme ให้หน้าตาเหมือนแบรนด์ Nation และ interaction accessibility addon
**Figma File :** ไม่เกี่ยวกับไฟล์ออกแบบโดยตรง เป็นงานฝั่งเครื่องมือ อ้างอิง component ที่มีอยู่แล้วใน components/ ทั้งหมด**Reference ตัวอย่างงานที่ชอบ :** งานวิจัย docs/research/component-library-preview-site.md ที่เทียบ Storybook กับ Zeroheight กับ Ladle กับ static HTML ก่อนเลือก Storybook

## บันทึกงาน

### 2026-10-20 Tommyy_PS

#### **worklog 1**

- ตั้ง Storybook 10.6 เป็นเว็บพรีวิว component library ตามผลวิจัยที่เทียบ 4 ทางเลือกไว้ก่อน เลือกเพราะอ่าน JSDoc ภาษาไทยที่เขียนไว้แล้วมาทำตาราง prop ให้เอง ไม่ต้องเขียนเอกสารซ้ำ
- เพิ่ม dependency ชุดแรกของ repo คือ react, react-dom, storybook, @storybook/react-vite, @storybook/addon-docs และ vite ตั้งค่า .storybook/main.ts กับ preview.tsx ให้โหลด token เป็น CSS variable ส่วนกลาง และปิด telemetry
- เขียน stories ครบทุก component 23 ตัว ใช้ autodocs ดึงตาราง prop จาก JSDoc เดิม ตัวอย่างเริ่มต้นทุกตัวใช้สีแบรนด์ตามที่หัวหน้าสั่ง
- ตั้งคำสั่ง npm run storybook กับ build-storybook และ workflow GitHub Actions deploy ขึ้น GitHub Pages อัตโนมัติเมื่อ push เข้า main เปิด repo เป็น Public ตามที่หัวหน้าตัดสิน เพราะ Pages ของแพลนฟรีใช้กับ repo ส่วนตัวไม่ได้
- แก้บั๊กที่หัวหน้าเจอจากเว็บจริง 3 เรื่อง หนึ่ง ตาราง Controls โชว์ prop แบบ boolean เป็นกล่อง JSON ดิบ สาเหตุคือ TypeScript 7 ทำให้ตัวอ่าน JSDoc พัง ลดเป็น 6.0.3 สอง ไอคอนใน Tag ขนาดผิดและทับข้อความ เพราะไอคอนข้างในไม่ได้ตั้งให้ยืดตามกล่อง สาม สีเริ่มต้นของ Badge กับ Tag ไม่ใช่สีแบรนด์
- ทำเพิ่มจากขอบเขตเดิมข้อ 6 ตามที่หัวหน้าสั่งหน้างาน คือธีมสีแบรนด์ของหน้า Docs และเทมเพลตหน้า Docs แบบกำหนดเอง เนื้อหาอยู่กึ่งกลาง แผง Controls ชิดขอบขวาสุด สูงเต็มจอ กว้าง 400px เหลือคอลัมน์ Name กับ Control ถอดกรอบ เงา มุมโค้ง และพื้นเทาของตารางออกให้เหมือนแผงตอนดู story เดี่ยว
- ยังค้าง ตรวจหน้าตาแผง Controls รอบล่าสุดด้วยตาจริงบนเว็บ และปรับ UI ส่วนเนื้อหาต่อตามที่หัวหน้าจะสั่ง

#### **ผลตรวจ**

- ไฟล์ stories 23 ไฟล์ ครบ component 23 ตัว รวมตัวอย่าง 108 story
- typecheck 0 error ด่านตรวจในเครื่องผ่านครบ 5 ด่าน คือ typecheck, tokens:verify, verify:coverage, verify:api, verify:families
- สีดิบในไฟล์ตั้งค่า Storybook 0 จุด ยกเว้นธีม 13 ค่าใน preview.tsx ที่ API ของ Storybook รับได้แค่ค่าคงที่ คัดลอกจากค่า resolved ของ token และกำกับที่มาไว้ทุกบรรทัด
- commit ของงานนี้ 14 ชุด push ขึ้น main แล้วทั้งหมด workflow deploy ผ่านเป็นสีเขียว เว็บเปิดได้ที่ https://pstommydesigner.github.io/nation-design-system/
- โทเค็นหลุดในประวัติ commit 0 จุด ตรวจก่อน commit ทุกครั้ง

### 2026-10-27 Tommyy_PS

#### **worklog 2**

- ต่อจาก worklog 1 ที่ตั้งเว็บพรีวิวเสร็จ รอบนี้ทำหน้า Docs ให้อ่านเป็นเอกสารได้จริง คือเทมเพลตหน้า Docs แบบกำหนดเอง (CustomDocsPage) โครงสองคอลัมน์ ตัวอย่างสดเชื่อมกับแผง Controls ทางขวา และจัดเนื้อหาเป็น 5 หัวข้อเหมือนเอกสารในไฟล์ออกแบบ คือ ส่วนประกอบ ชุด ขนาด สถานะ ควรไม่ควร ครบทุก component 20 ตัว หัวข้อที่ไม่มีของให้โชว์เขียนเหตุผลแทนการยัดตัวอย่างปลอม
- เมนูย่อยใน sidebar ตั้งชื่อตามชุดจริงในไฟล์ออกแบบ (เช่น Pill-tag, Text-area, Underline-tab-group, Avatar-monogram) เปิดแล้วได้แผง Controls ที่เหลือเฉพาะ prop ที่ชนิดนั้นมีจริง ตามที่หัวหน้าทักว่า story ย่อยมี control ของชนิดอื่นติดมา
- แก้บั๊กที่หัวหน้าพบ คือ React error #31 จากแผง Controls ส่ง object เปล่าเข้า prop ที่รับ React element (กันไว้กลางที่ preview.tsx) ช่อง children ที่หายไป และ Link-badge ที่สีเริ่มต้นไม่ใช่สีแบรนด์
- ธีมหน้า Docs ใช้สีของระบบ (ค่าคงที่ที่คัดลอกจาก token พร้อมคำสั่งตรวจว่ายังตรงกัน) ส่วน Manager UI คงค่าเริ่มต้นตามที่สั่ง
- ข้อ 6 ที่กำหนดว่าแยกทีหลัง (custom theme ทั้งเว็บ และ interaction/accessibility addon) ยังไม่ได้ทำ

#### **ผลตรวจ**

- story ทั้งหมด 215 รายการ ครอบ component 20 ตัว หน้า Docs 20 หน้า
- build ผ่าน typecheck 0 error · deploy ขึ้น GitHub Pages อัตโนมัติทุกคอมมิต ตรวจเว็บจริงล่าสุด 27 ต.ค. 2569
- ถ่ายภาพหน้า Docs ตรวจโครง 5 หัวข้อแล้ว 4 หน้า (Checkbox Tabs Avatar Card) และภาพ story เทียบไฟล์ออกแบบครบ 20 component
