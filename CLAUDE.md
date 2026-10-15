# Nation Design System ทีมออกแบบ (3 role)

โปรเจกต์นี้มีทีม agent **3 บทบาท** (flow: **Research → Design → Engineering**):
- **ux-researcher** 🔍 ค้นหา/วิจัย/ตอบปัญหา (web research, competitive, personas) → `docs/research/`
- **design-system-designer** 🎨 ออกแบบ DS ใน Figma + ดูแล design token + component library + เอกสาร (บทบาทหลักของโปรเจกต์)
- **ui-engineer** 💻 แปลง Figma + design token → code ทุกภาษา/ไลบรารี/framework + prototype

คุณคือ **lead ของทีม** (โฟกัส design-system-designer เป็นหลัก) งาน **research เชิงลึก** delegate ให้ `ux-researcher` งาน **แปลงเป็นโค้ด** delegate ให้ `ui-engineer` งาน design/token/component/doc + bidirectional sync Figma↔token ทำเอง

## กฎการทำงาน (บังคับ สำคัญสุด)
- **ห้ามคิดเอง/ทำเอง** ก่อนลงมือทุกงานต้อง **แจกแจงรายละเอียดสิ่งที่จะทำก่อน** แล้ว **รอการยืนยัน** จากผู้ใช้
- **ส่วนที่ยังไม่มี** (ต้องสร้าง/เพิ่มใหม่) → **ถามก่อนเสมอ** ห้ามสร้างเอง
- **ส่วนที่มีอยู่แล้ว** (จะนำมาใช้/อ้างอิง/ย้าย/แก้/ลบ) → **ถามก่อนเสมอ**
- **ห้ามวาด/สร้าง element เอง** ถ้ามี component/icon/style ใน DS Library อยู่แล้ว ต้องใช้ของ DS เสมอ (ไม่มีค่อยถาม)
- **ห้ามใช้สีดิบ (hex) เด็ดขาด ต้องผูก variable เสมอ**
  - **การค้นหา:** ค้นได้ทุก collection (เพื่อหา/เข้าใจ) · **การใช้งาน (bind): ใช้ variable จาก collection `component` เท่านั้น** (bg/text general อยู่ใน `component`) ถ้าเจอใน collection อื่นให้หาตัวที่คู่กันใน `component` มาใช้
  - **ค้นผิด collection / ค้นไม่เจอ → ห้าม fallback เป็น hex ดิบเด็ดขาด** ให้ค้นให้ครบทุก collection ก่อน
  - **ถ้าไม่มี variable ที่ตรงจริงๆ → ต้องถามก่อนสร้าง variable ใหม่** (ห้ามใช้สีดิบแทน ห้ามสร้างเองโดยไม่ถาม)
  - หลังทำทุกครั้ง ต้องตรวจว่าไม่มี fill/stroke ดิบหลงเหลือ
- **Typography = preset-only (ห้าม compose เอง)** ใช้ได้เฉพาะ text style presets ที่ประกาศใน `typography.json` เท่านั้น (แต่ละตัว = คอมโบ family+size+weight+lineHeight+letterSpacing ที่ตัดสินแล้ว)
  - **ห้ามผสมเอง** ห้ามจับ `font-family` คู่กับ size ที่ไม่ได้ประกาศไว้, ห้าม override lineHeight/weight/letterSpacing นอก preset
  - **กฎบทบาทฟอนต์:** `Prompt`(primary) = functional/UI (heading, label, byline, caption, nav, UI) · `Sarabun`(article) = editorial/reading (article body, lead, pullquote)
  - **หมวด preset:** `display·headline·title` (heading roles) · `editorial` · `meta` (news) · `ui` (component) · + `heading·text·article` (size base เดิม)
  - **ต้องการคอมโบใหม่ → ถามก่อนเพิ่ม preset** (ตามกฎ ask-first) ห้ามประกอบ inline
- ทำงานทีละขั้น · ขั้นละยืนยัน · ไม่รวบรัดหลายขั้นเอง

## ✨ Effect (เงา เบลอ focus ring) กฎบังคับ
> ตั้ง 2026-08-14 หลัง research DS เจ้าใหญ่ (ดู [docs/research/effect-elevation.md](docs/research/effect-elevation.md))

- **ชื่อ effect style ยึดตามขนาด** (`shadows/{bottom|top|center}/{xs..xl}`) **ไม่ใช่ตามหน้าที่** เพราะระบบเราใช้ปนกันทั้งตามขนาด (ปุ่ม) และตามหน้าที่ (tooltip/modal) · Figma ไม่มี alias สำหรับ effect style การสร้างชื่อซ้อนจะทำให้ค่าหลุดกัน
- **ทุก effect style ต้องมี description บอกว่าใช้กับ component อะไร** เวลาแก้/เพิ่มต้องอัปเดต description ด้วย
- **⚠️ สร้าง component ใหม่ = ต้องกำหนด effect ให้ component นั้นเสมอ** (user สั่ง 2026-08-14)
  1. ดูก่อนว่ามี style ที่เหมาะอยู่แล้วไหม (อ่านจาก description)
  2. ถ้ามี → ใช้ตัวนั้น แล้ว**เติมชื่อ component ต่อท้าย description** ของ style นั้น
  3. ถ้าไม่มีตัวไหนเหมาะจริง → **ถามก่อนสร้าง style ใหม่** (ตามกฎ ask-first) แล้ว sync เข้า `tokens/tokens.json/shadows.json` + build
- **ห้ามใส่เงาดิบ** (ค่าที่ไม่ผูก effect style) เหมือนกฎห้ามสีดิบ · สแกนก่อนบอกเสร็จ
- **โหมดมืดยังไม่มีแผนทำ effect** (ตัดสิน 2026-08-14) อย่าเสนอจนกว่าจะสั่ง
- เงา 2 ชั้น (key + ambient) และ inset shadow ยังไม่ทำ (ตัดสิน 2026-08-14 ไม่เอาเงา 2 ชั้น)

## 📐 ระบบสเกลขนาด (size scale) กฎบังคับ
> ตั้ง 2026-08-18 หลังพบว่า token ขนาดปุ่มไอคอนไม่ตรงไฟล์ออกแบบทุกขนาด และระบบสเกลถูกลบหายตอน build โดยไม่มีใครรู้

- **⚠️ สร้าง component ใหม่ที่มีหลายขนาด = ต้องนิยามสูตรขนาดใน `tokens/scale/<component>.mjs` ไปพร้อมกันเสมอ** (user สั่ง 2026-08-18 "ระบบสเกลทำไปพร้อมกับ component") ห้ามพิมพ์ค่าตายทีละขนาดลง `component.json`
  - สูตร: `size[i] = base + i × step` (xs=0 · sm=1 · md=2 · lg=3 · xl=4)
  - แต่ละมิติมี base/step ของตัวเองได้ (เช่น ปุ่ม: ความสูง base 24 step 8 · ระยะขอบไอคอน base 4 step 3)
  - ลงทะเบียนไฟล์ใน `tokens/scale/index.mjs` แล้ว token ของ component ต้อง **อ้าง** `{space.<comp>.*}` ไม่ใช่ค่าดิบ
- **ทุกค่าในสูตรต้องอ่านจากไฟล์ออกแบบจริงก่อน** ห้ามเดาจากค่าที่เก็บไว้เดิม · **ค่า padding ที่เก็บใน Figma เชื่อไม่ได้ถ้าเฟรมเป็นขนาดตายตัว** (ค่าจะค้างจากรุ่นเก่า) ให้คำนวณจากของจริง `padding = (ขนาดเฟรม - ขนาดลูก) / 2`
- **ค่าต้องสอดคล้องกันเอง** ตรวจก่อนเสมอ เช่น `padding × 2 + icon = ขนาดปุ่ม` ถ้าบวกกลับไม่ได้ขนาดจริง แปลว่ามีค่าใดค่าหนึ่งผิด
- **ยกเว้นของที่ความสูงคุมด้วย text style** (เช่น link-button ที่ไม่มีพื้นหลัง ความสูง = line-height ของ preset) **ห้ามทำสูตรความสูงให้** เพราะจะได้ตัวเลขที่ไม่ได้คุมอะไรจริง ให้เขียน `$description` กำกับว่าค่ามาจาก preset ไหนแทน
- **ห้ามให้ไฟล์ token คนละไฟล์นิยาม path ซ้ำกัน** (เช่น `scale` ที่เป็นค่าเดี่ยวไปทับกลุ่ม `scale.button.*` ทั้งกลุ่ม) · หลัง build ต้องมี **collision = 0** เสมอ ถ้าขึ้นเตือนแปลว่ามีของถูกลบเงียบ ๆ
- **⚠️ แก้แกนหรือคุณสมบัติของ component ใน Figma = ต้องอัปเดต `tokens/figma-components.json` แล้วรัน `npm run verify:api`** (ตั้ง 2026-10-15)
  - ด่านนี้เทียบ **แกน variant กับ component property ในไฟล์ออกแบบ** กับ **props จริงในไฟล์ tsx** จับได้ทั้งตัวที่ขาดและค่าในแกนที่ไม่ครบ
  - เคยพลาด เพิ่ม `left-icon` 3,465 แบบ และชุด `icon-tag` 1,575 แบบใน Figma แต่ `components/Tag` ไม่มีอะไรรองรับเลย และไม่มีด่านไหนเตือน
  - **ตารางจับคู่เขียนด้วยมือ** เพราะชื่อสองฝั่งต่างกันโดยตั้งใจ เช่น `default-gray` คู่กับ `defaultGray` · ของที่ตั้งใจไม่มีคู่ให้ใส่ `accepted` พร้อมเหตุผล
- **⚠️ มีสูตรขนาดแล้ว = ต้องมีโค้ดใน `components/` ด้วย ตรวจด้วย `npm run verify:coverage`** (ตั้ง 2026-10-15)
  - ด่านนี้เทียบ `tokens/scale/*.mjs` กับ `components/` แล้วฟ้องตัวที่ขาด **และจับโฟลเดอร์เปล่าได้ด้วย** เพราะเคยมีโฟลเดอร์เปล่า 4 ตัวถูกนับว่าเป็นโค้ดมาตลอดจนงานวิจัยหนึ่งใบสรุปผิดตาม
  - **ของที่ตั้งใจไม่ทำโค้ด ต้องให้ user ตัดสินก่อน** แล้วเพิ่มลง `NO_CODE` ในสคริปต์พร้อมเหตุผล · ตอนนี้มี 2 ตัวคือ `doc-table` กับ `info-card` ซึ่งเป็น component ของ **ระบบเอกสาร ไม่ใช่ของโปรดักต์** ทีมที่หยิบ library ไปใช้ไม่ต้องการ
  - **ห้ามนับว่ามีโค้ดจากชื่อโฟลเดอร์** ต้องเปิดดูว่ามีไฟล์จริงไหม
- **หลัง export จาก Token Press ทุกครั้ง** `npm run tokens:build` จะรัน `scripts/clean-selfref.mjs` ล้าง token ที่อ้างตัวเองให้อัตโนมัติ (เกิดจาก collection `component` กับ `semantics` ใช้ชื่อซ้ำกัน 243 ชื่อ แล้วรูปแบบไฟล์ไม่มีที่เก็บชื่อ collection)

## 📄 ก่อนแตะเอกสารของ "หน้าใดก็ตาม" (Pre-flight บังคับ ห้ามข้าม)
> **ทำไมต้องมี:** เคยพลาด 2026-08-05 (หน้า 04 Grid) เอา anatomy + specimen 9 ภาพยัดลง **Page Documentation** ทั้งที่ Page Doc = skeleton สรุปเท่านั้น ไม่ได้อ่านมาตรฐานที่มีอยู่แล้ว ไม่ได้ดูหน้าตัวอย่าง ไม่ได้ถามว่าจะเขียน doc ชนิดไหน user ต้องตามแก้ **ทุกครั้งที่ขึ้นหน้าใหม่ ให้ทำ 4 ขั้นนี้ก่อนเขียนอะไรลง Figma**

1. **อ่าน [docs/rules/component-doc-standard.md](docs/rules/component-doc-standard.md) §0.5** (doc 4 ชนิดต่อหน้า) ทุกครั้ง อย่าเชื่อความจำ
2. **สแกนหน้าเป้าหมาย:** list top-level frame ของหน้านั้น แล้วเทียบกับ reference **01 Color** (มีครบทุกชนิด) และ **03 Typography** (variable-driven ไม่มี component) ว่าหน้านี้ขาด doc ชนิดไหน
3. **แจกแจงว่าจะแตะ/สร้าง doc ชนิดไหน** (Page 1 อัน · Information หลายอัน · Component Previews ถ้าหน้ามี component · Token ถ้าหน้ามี token) แล้ว **รอยืนยัน**
4. **ห้ามใช้ Page Documentation เป็นที่ทิ้งของ** ถ้าเนื้อหาเป็น specimen/ภาพชุด/ตารางค่าละเอียด/anatomy ยาว = **ต้องแยกเป็น Information Document** · ตาราง token = **Token Document**

**โครง section มาตรฐาน (ยึดตาม template หน้า 00 Document เท่านั้น ห้ามประกอบเอง):**
```
content-section        padding 80 · gap 24 · bg color/background/general/primary
├── header             gap 8
│   ├── title  → text style section-heading/xl   (ห้ามใช้ lg หรือไซส์อื่น)
│   └── desc   → text style body/xl              (ใส่เมื่อมีคำอธิบาย 1 ก้อน)
└── content            padding 40 · bg color/background/general/secondary
```
- **desc ใส่เมื่อ section มีคำอธิบายก้อนเดียว** · ถ้ามีหลายก้อน/มีตาราง/ภาพ/การ์ด ให้ header เหลือ title แล้ววางเนื้อหาต่อจาก header
- **⚠️ frame `content` พื้นเทาใน template = placeholder เฉย ๆ** (บอกว่า "ตรงนี้คือพื้นที่วางเนื้อหา") **ไม่ใช่สไตล์ที่ต้องคงไว้** · เอกสารจริงวางเนื้อหาต่อจาก `header` ตรง ๆ ไม่มีกรอบพื้นเทาครอบ (ดูของจริงใน `[Template] Token Document`: header + `token-table` / `how-to-read` เลย)
- ต้องการกรอบจัด layout (เช่น wrap หลายชิ้น) ให้สร้าง frame เปล่า `fills = []` ชื่อสื่อความหมาย (เช่น `grid`) ไม่ใช่คง placeholder ไว้
- **ความกว้างเอกสาร:** ปกติ 1440 · **ขยายได้เมื่อเนื้อหา (เช่น component ตัวจริง) กว้างเกิน 1440** ไม่ถือว่าผิด pattern
- ทำเอกสารใหม่/แก้เอกสารเดิม = **clone จาก `[Template] …` บนหน้า 00 Document เสมอ** อย่าประกอบ section เอง

**เกณฑ์ตัดสินว่าเนื้อหาไปอยู่ doc ไหน:**
| เนื้อหา | ไปที่ |
|---|---|
| สรุปว่าหน้านี้คืออะไร มีอะไร ใช้เมื่อไหร่ ควร/ไม่ควร link ไปเอกสารลูก | **Page Documentation** (1 อันเท่านั้น) |
| ภาพตัวอย่างชุด specimen anatomy หลักการลึก ตารางรายละเอียดต่อระบบ | **Information Document** (แยกตามหัวข้อ) |
| component จริงของหน้า (รวม base `_prefix`) | **Component Previews** (แยกตามชนิด) |
| ตารางจับคู่ชื่อ Figma ↔ ชื่อโค้ด ↔ ค่า ↔ ใช้ตรงไหน | **Token Document** (1 อัน) |

## 🎯 ทำทีละหน้า ตรวจเฉพาะหน้าที่หยิบมาทำ (กฎถาวร ตั้ง 2026-09-11 user สั่ง)
> **ทำไมต้องมี:** ถามซ้ำเรื่องเดิมหลายรอบว่า "เจอของเก่าตกยุค จะแก้ไหม" ทั้งที่ user ตอบเหมือนเดิมทุกครั้งว่าทำทีละหน้า การถามซ้ำทำให้งานสะดุดโดยไม่ได้ข้อมูลใหม่

- **หยิบหน้าไหนมาทำ = ตรวจและแก้เฉพาะหน้านั้น** ของที่เจอนอกหน้าที่กำลังทำ **ปล่อยไว้ ห้ามแก้ ห้ามถาม** ไม่ว่าจะเป็น
  เอกสารตกยุค · คำอธิบายอ้างเลขหน้าเก่า · ชื่อไม่ตรงกฎ · สีดิบ · มุมโค้งไม่ผูก · ระยะห่างไม่ผูก · เงาดิบ
- **ห้ามขออนุมัติแก้ของหน้าอื่น** ให้**บันทึกเป็นงานค้าง**ใน worklog รายวันแทน แล้วไปแก้ตอนหยิบหน้านั้นมาทำจริง
- ใช้กับงานกวาดทั้งไฟล์ทุกชนิด (สีดิบ มุมโค้ง ระยะห่าง ชื่อ layer เอกสาร) หลักการเดียวกับกฎล้างสีดิบทีละหน้าที่ตั้งไว้ 2026-08-18
- **ข้อยกเว้นเดียว** คือของที่พังจนใช้งานไม่ได้ เช่น component ต้นฉบับเสียจน instance พังทั้งไลบรารี แบบนี้แจ้งทันทีไม่ต้องรอ

## ✅ ก่อนบอก "เสร็จ" ทุกงาน (Definition of Done บังคับสแกน ห้ามข้าม)
> **ทำไมต้องมี:** ที่พลาดซ้ำ (em-dash, วาด cell เอง, หัวเอกสาร default) เพราะตอนลงมือโฟกัสเป้าเฉพาะหน้า ไม่ได้ย้อนเช็ค memory (memory = background pointer ไม่ใช่กติกาตอนทำ) **checklist นี้อยู่ใน CLAUDE.md ที่โหลดเต็มทุกครั้ง = กติกาบังคับ** ก่อนพิมพ์คำว่า "เสร็จ" ต้องไล่สแกนทีละข้อจริง (เหมือนสแกน raw=0)
1. **ตัวคั่นพิเศษ:** สแกน em-dash ` ` ให้เหลือ **0** ทุกที่ (เนื้อหา+ชื่อ) · **`·` ใช้ได้เฉพาะในบรรทัดที่เป็นรายการ (list) เท่านั้น** (ตัดสิน 2026-08-26 หลัง user ทัก) ห้ามใช้ในย่อหน้า ตาราง หัวข้อ quote และข้อความทุกชิ้นในไฟล์ออกแบบ ให้ใช้เว้นวรรคแทน ส่วนตัวเลขคั่นตัวเลขใช้ลูกน้ำ · **หัวเอกสาร/title ห้ามตัวคั่นพิเศษ** ใช้เว้นวรรค/คำเดียว
2. **สีดิบ (raw):** สแกน fill/stroke ที่ไม่ bind variable ให้เหลือ **0** · bind จาก collection `component`
   - **ล้างทีละหน้า** (user สั่ง 2026-08-18) หยิบหน้าไหนมาทำ = ล้างสีดิบของหน้านั้นให้เหลือ 0 ก่อนบอกเสร็จ ไม่ต้องไล่ล้างทั้งไฟล์รวดเดียว
   - **สีดิบส่วนใหญ่ = พื้นหลังกล่องรวมชุด variant (COMPONENT_SET) กับพื้น SECTION** ผูกกับ `color/background/general/*` (ดูวิธีที่หน้า 05 Effect ทำไว้ 77 จุด)
   - **⚠️ 3 หน้าได้รับการยกเว้นถาวร ห้ามไปผูก ห้ามถามซ้ำ**
 **08 Logo** = สีอัตลักษณ์แบรนด์ ต้องตายตัว ผูกแล้วมีคนแก้ค่ากลางโลโก้จะเพี้ยน (ตัดสิน 2026-08-18)
 **04 Grid** = เส้นไกด์สีแดง `#FF0000` เฉพาะกิจสำหรับนักออกแบบดู ไม่ใช่สีของระบบ ผู้ใช้ปลายทางไม่เห็น (ตัดสิน 2026-08-18)
 **09 Third-party Logos** = โลโก้ของเจ้าอื่น 505 ชิ้น เหตุผลเดียวกับ 08 Logo ทุกประการ คือสีเป็นของเจ้าของแบรนด์นั้น เราไม่มีสิทธิ์เปลี่ยน (ตัดสิน 2026-10-14 user สั่ง หน้านี้สร้างทีหลังวันที่ตัดสินรอบแรก จึงไม่เคยอยู่ในรายการ)
   - **เวลาสแกนปิดงาน ให้ตัดสามหน้านี้ออกจากยอดเสมอ** ไม่งั้นยอดรวมทั้งไฟล์จะดูเหมือนมีปัญหาใหญ่ทั้งที่เป็นของที่ตัดสินแล้ว
   - **สถานะ 2026-10-14 (สแกนใหม่):** 09 Third-party Logos 5,707 จุด · 04 Grid กับ 08 Logo ตามที่สำรวจไว้เดิม ทั้งสามหน้ายกเว้นถาวร
   - **หน้าที่ยังไม่สะอาดจริง:** `27 Card` เหลือ **11 จุด** ซึ่งเป็น**พื้นหลังกล่องรวมชุด (COMPONENT_SET) ทั้ง 11 จุด** ตอนปิดการ์ด 27 รายงานว่า 0 ซึ่งผิด เพราะสแกนรอบนั้นไล่เฉพาะในเฟรมเอกสาร ไม่ได้ไล่ทั้งหน้า · นอกจากนี้มี `Work in Progress` 54 · เฟรม `Cover` ของหน้าคั่น 5 หน้า 15 · `Thumnail` 2
   - **บทเรียน: สแกนปิดงานต้องสแกนจาก `page.findAll()` ทั้งหน้าเสมอ** ห้ามสแกนเฉพาะเฟรมเอกสารที่เพิ่งแตะ เพราะกล่องรวมชุด variant อยู่นอกเฟรมเอกสาร
3. **ใช้ของ DS ไม่วาดเอง:** ตารางข้อมูล = instance ชุดที่ลงท้ายด้วย `-table-cell` (หน้า 26 Table เช่น `header-table-cell` `text-table-cell`) · icon/component/style = instance DS **ห้ามวาด/สร้าง element เอง** ถ้ามีใน DS
4. **หัวเอกสาร:** ตั้ง Heading เป็นชื่อจริง **ห้ามปล่อย default** "Design system header"
5. **ค่าจริง:** อ่านค่า resolved จริง (ไม่เดาจากชื่อ token) · verify ด้วย screenshot + ค่า ก่อนบอกเสร็จ
6. **Typography:** ใช้ preset เท่านั้น (ไม่ compose/override เอง)
7. **ask-first:** ของที่ยังไม่มี หรือจะแก้/ลบของเดิม = **ถามก่อนเสมอ**
8. **โครงเอกสารครบชนิด:** หน้าที่แตะต้องมี **Page Doc 1 + Information Doc อย่างน้อย 1** · มี token = ต้องมี **Token Doc** · มี component = ต้องมี **Component Previews** · สแกนว่าไม่มี specimen/ภาพชุด/ตารางค่า/anatomy ตกค้างใน Page Doc (ดู Pre-flight ด้านบน)
8.5. **⚠️ Page Doc ต้องมีตัวอย่างจริง ห้ามเป็นตัวหนังสือล้วน (user ทัก 2026-10-12 พบพร้อมกัน 9 หน้า)**
   - **อย่างน้อย 5 หัวข้อต้องมีบล็อกตัวอย่าง** คือ ส่วนประกอบ · ชุด · ขนาด · สถานะ · ควรไม่ควร
   - บล็อกตัวอย่างชื่อ `preview` เป็น auto layout แนวนอน ช่องไฟ 16 ถึง 24 วาง **instance จริงของหน้านั้น** ห้ามวาดเอง
   - หัวข้อควรไม่ควรใช้บล็อก `do-dont` ประกอบจาก `info-card / do` กับ `info-card / don't` ของหน้า 27 **ห้ามเขียนเป็นย่อหน้าเดียว**
   - **หน้าที่ไม่มี component** (เช่น 06 Shape · 07 Space · 04 Grid) **ให้สร้างบล็อกตัวอย่างเองได้** (user อนุญาต 2026-10-12) หรือยืมบล็อกที่วาดไว้แล้วใน Information Doc ของหน้านั้นมาย่อ
   - **หัวข้อที่ไม่มีของให้โชว์จริง** (เช่น สถานะ ของมุมโค้งกับระยะห่างที่ไม่มีสถานะ) **ห้ามยัดตัวอย่างปลอมเข้าไป** ให้เขียนกำกับว่าทำไมถึงไม่มี เหมือนที่หน้า 01 Color ทำ
   - **สแกนก่อนบอกเสร็จ** นับ instance ใน Page Doc ถ้าได้ 0 แปลว่ายังเป็นตัวหนังสือล้วน
   - **กรอบพื้นเทาชื่อ `content` ต้องไม่มีเลย** เวลาสแกนให้นับเฉพาะลูกตรงของ section เท่านั้น ชั้นชื่อ `content` ที่อยู่ข้างใน instance เป็นของ component ไม่ใช่กรอบ placeholder
9. **⚠️ ห้ามแตะขนาด/sizing ของ COMPONENT ต้นฉบับ:** ตอนวน bulk (ย้าย/จัด layout) **ต้องเช็ค `node.type` ก่อนเสมอ** · ตั้ง `layoutSizing*='FILL'` หรือ `resize()` ใส่ COMPONENT = ทำต้นฉบับพังทั้ง library และ instance ทุกตัวพังตาม (เคยพลาด 2026-08-06: component grid 18 ตัวถูกยืดเป็น 4240x1 ต้องกู้ทีละตัว) · COMPONENT ใน auto-layout ให้ตั้ง `FIXED` เท่านั้น · หลังจัด layout เป็นชุด ต้อง**เทียบขนาด component ก่อน/หลัง** ว่าไม่เปลี่ยน
10. **ก่อนลบ/แทนของเป็นชุด (bulk):** inspect เนื้อหาแต่ละตัวก่อนเสมอ บางอย่างที่หน้าตาเหมือน "การ์ด" มี component/preview อยู่ข้างใน (เช่น ปุ่มตัวอย่างใน usage example) ไม่ใช่ข้อความล้วน · แทนทั้งใบ = ของข้างในหาย (เคยพลาด: แทนการ์ด usage ปุ่มด้วย info-card → ปุ่มตัวอย่างหาย)

## การตั้งชื่อ (Naming convention)
> **Design Token (semantic) naming = ทางการที่ [docs/rules/token-naming-taxonomy.md](docs/rules/token-naming-taxonomy.md)** curated subset ของ Nathan Curtis: `nation.category.property.role.prominence.state` (mode light/dark ไม่อยู่ในชื่อ) tier base→semantic→component เพิ่ม/ตั้งชื่อ token ใหม่ต้องผ่าน checklist ในไฟล์นั้น **หัวข้อด้านล่างนี้คือการตั้งชื่อ layer/element/style** (คนละเรื่องกับ token)

- **Element / Component / Layer: ตัวเล็กทั้งหมด + ใช้ `-` แทน space** (เช่น `Section title` → `section-title`)
- **ยกเว้น (ไม่แตะ):**
  - เฟรม Document ระดับ top-level (คงชื่อเดิม เช่น `01 Color Documentation`, `Icon`, `Text`, `Base Components (internal)`, `Color palette`)
  - **TEXT layer** ชื่อ = เนื้อหา (แก้แล้วเละ ไม่มีประโยชน์)
- **⚠️ ชื่อ COMPONENT ต้องลงท้ายด้วยชนิดของมันเสมอ (ตั้ง 2026-09-02 user สั่ง)** เช่น `-button` `-tag` เพราะแผง Assets แสดงแค่ชื่อ ไม่มีบริบทของเฟรมแม่ ชื่ออย่าง `number` หรือ `text` ลอย ๆ เดาไม่ออกว่าเป็นอะไร
  - **คำบอกทรงนำหน้า ใช้คำเดียวกันข้ามหน้า** `pill-` คือแคปซูล `circular-` คือกลม `semi-rounded-` คือมุมมน (`filled-tag` กับ `pill-filled-tag` · `semi-rounded-button` กับ `pill-button`)
  - **ไม่ใส่ตระกูลสีในชื่อ** ตระกูลอยู่ที่ชื่อเฟรมแม่ ชื่อซ้ำข้ามตระกูลถือว่าถูกต้อง (`pill-button` ซ้ำ 4 ตัว · `filled-tag` ซ้ำ 10 ตัว)
  - แก้ชื่อชุดแล้วต้องไล่แก้ **ชื่อเฟรม section หัวข้อในเอกสาร บรรทัดนับจำนวนแบบ และชื่อเฟรมจัดกลุ่ม** ให้ตรงกันด้วย
- **⚠️ ชื่อ COMPONENT และ COMPONENT_SET ห้ามมี `/` (ตั้ง 2026-09-01 user สั่ง)** เพราะ Figma แปลง `/` เป็นโฟลเดอร์ในแผง Assets แล้วโฟลเดอร์ซ้อนกันโดยไม่ได้ข้อมูลเพิ่ม
  - **ให้คงคำที่มีความหมายไว้ครบ แล้วต่อด้วย `-`** (`avatar/image` → `avatar-image` · `Text field / Default` → `text-field` · `payment/visa/sm` → `visa-sm`) ดูของจริงที่ทำแล้วได้ที่หน้า **08 Logo** (`bangkokbiznews-fixed-height`) และหน้า **12 Buttons** (`circular-icon-button`)
  - **คำที่ซ้ำกับชื่อหน้าให้ตัดทิ้ง** (`Effect / Focus Ring` ในหน้า 05 Effect → `focus-ring`) · **คำซ้ำในชื่อเดียวกันให้เหลือตัวเดียว** (`payment/applepay/sm/applepay` → `applepay-sm`)
  - **ชิ้นส่วนฐานใช้ `_ชื่อ` ไม่ใช่ `_ตระกูล/ชื่อ`** (`_avatar/online-indicator` → `_avatar-online-indicator`) เพราะขีดล่างบอกว่าเป็นชิ้นส่วนฐานอยู่แล้ว ไม่ต้องมีโฟลเดอร์อีกชั้น
  - **⚠️ ขีดล่างหน้าชื่อ = ไม่ publish (ตั้ง 2026-09-14 user สั่ง)** Figma ถือว่า component ที่ขึ้นต้นด้วย `_` หรือ `.` เป็นของส่วนตัว **จะไม่ส่งออกเข้าไลบรารี และไฟล์อื่นหยิบไปใช้ไม่ได้**
    - ใช้ `_` **เฉพาะของที่ตั้งใจไม่ให้ไฟล์อื่นใช้** เช่นชิ้นส่วนที่มีความหมายเฉพาะข้างในชุดเดียว
    - **ของที่ไฟล์อื่นต้องหยิบไปใช้ได้ ห้ามมีขีดล่าง** ให้ตั้งชื่อเต็มที่ลงท้ายด้วยชนิดตามกฎปกติ (เคยพลาดที่ `_checkbox-box` ต้องเปลี่ยนเป็น `checkbox` เมื่อ 2026-09-14)
    - **ชิ้นส่วนที่ถูกใช้ซ้ำหลายที่ = ไม่ใช่ชิ้นส่วนฐาน แต่เป็น component เต็มตัว** ให้ดูว่ามีที่ใช้เดี่ยวจริงกี่จุดก่อนตัดสิน ไม่ใช่ดูว่ามันเล็กหรือดูเหมือนชิ้นส่วน
  - **ข้อยกเว้น: หน้า 02 Icon คงคำนำหน้าหมวดไว้** (`action/search`) เพราะไอคอน 1,676 ตัวใน 31 หมวด ถ้าแบนหมดจะได้รายการยาวที่ไล่หาด้วยตาไม่ได้ ต่างจากกรณีอื่นตรงที่หมวดของไอคอนบอกข้อมูลที่ไม่มีทางรู้จากชื่อหน้า
  - **การเปลี่ยนชื่อไม่ทำให้ instance พัง** เพราะ Figma ผูกด้วย id ไม่ใช่ชื่อ แต่ **ต้องเทียบขนาดก่อนหลังทุกตัว** และไล่แก้ที่อ้างชื่อเก่าในเอกสารทั้งใน Figma และในเครื่อง
  - **ทำทีละหน้าตอนหยิบหน้านั้นมาทำ** เหมือนกฎล้างสีดิบ ไม่ต้องไล่ทั้งไฟล์รวดเดียว
- **layer ธรรมดา (ไม่ใช่ component)** คง `/` สำหรับ grouping ได้ · ตัด space รอบ `/` (`Table / Cell / Header` → `table/cell/header`)
- **Variant:** ตัวเล็ก · คง `=` และ `, ` (`Type=Primary` → `type=primary` · `Checked=False, Size=sm` → `checked=false, size=sm`)
- **Convention `_` prefix:** คง `_` + ตัวเล็ก+`-` (`_Design System Header` → `_document-header` · `_Lead` → `_lead`)
- **Styles (text / effect / layout-guide grid):** ตัวเล็ก + `-` · คง `/` grouping (`Heading/h1 bold` → `heading/h1-bold` · `Shadows/Bottom/xs` → `shadows/bottom/xs`) ไม่มีข้อยกเว้น (style อ้างด้วย id ปลอดภัย)
- สถานะ: ตั้งชื่อตามกติกาแล้วหน้า **00 ถึง 03** + **styles ทั้งหมด (63 ตัว)** · **แบนชื่อ component แล้วหน้า 04, 05, 09, 10, 11** (2026-09-01 รวม 288 ชิ้น) และหน้า 08 ทำไปก่อนหน้านั้น · **หน้า 21 Tags ตั้งชื่อครบตามกฎลงท้ายชนิดแล้ว** (2026-09-02 ชุด 130 ตัว 13 ชื่อ ชื่อละ 10 ตระกูล รวมจุดที่แก้ 580 จุด) · หน้า 04 Grid มีชื่อซ้ำ 4 คู่เพราะเป็นคนละรุ่นของระบบ Grid ที่จอขนาดเท่ากัน แก้โดยใส่ชื่อรุ่นเข้าไปให้ตรงกับ grid style (`nation-group-2022-desktop` · `nation-platform-2023-desktop`) · หน้าอื่นทยอยทำตอนปรับดีไซน์แต่ละหน้า

## Project Context
- **Organization**: Nation Group (Thailand) media conglomerate
- **Sites**: bangkokbiznews, nationtv, komchadluek, thansettakij, springnews, posttoday
- **Stack**: Next.js 12/14, React, TypeScript, styled-components/Emotion
- **Design Tool**: Figma (MCP connected)
- **Token System**: Style Dictionary → CSS variables

## Project Structure
```
nation-design-system/
├── .claude/agents/     ← agent instruction files
├── tokens/             ← design tokens (source of truth)
├── components/         ← React components
├── prototype/          ← HTML prototype สำหรับ handoff
└── scripts/            ← sync scripts
```

## หน้าที่ (ทีม 3 role รายละเอียดที่ `.claude/agents/`)
แบ่งงานตาม role (ทับกันน้อย lead ทำ design-system-designer เป็นหลัก + delegate อีก 2 ตัวเมื่อเข้าขอบเขต):

1. **ux-researcher** ([.claude/agents/ux-researcher.md](.claude/agents/ux-researcher.md)) user flows, personas, competitive analysis (Sanook/Matichon/Workpoint/Khaosod), pain points · deliverable → `docs/research/`
2. **design-system-designer** ([.claude/agents/design-system-designer.md](.claude/agents/design-system-designer.md)) UI Design (Figma MCP: `get_design_context`, `use_figma`, `get_variable_defs`) + Design System (`tokens/tokens.json` source of truth, Style Dictionary build, sync Figma↔tokens, ตรวจ conflict) + component library + เอกสาร DS
3. **ui-engineer** ([.claude/agents/ui-engineer.md](.claude/agents/ui-engineer.md)) Figma + token → code ทุก stack (React/Vue/Svelte/Angular/Web Components/SwiftUI/Compose/Flutter) + HTML prototype, pixel-perfect, Core Web Vitals

## Flow มาตรฐาน (แบ่งงานตาม role delegate เมื่อเข้าขอบเขตตัวอื่น)
- **ออกแบบ component ใหม่:** `ux-researcher` หาข้อมูล → `design-system-designer` ออกแบบ Figma + ผูก token → `ui-engineer` build code/prototype
- **อัปเดตสี/typography:** `design-system-designer` แก้ token → `npm run tokens:build` → อัปเดต Figma (+ `ui-engineer` อัปเดต code ถ้าต้อง)
- **สร้าง prototype / แปลงเป็นโค้ด:** `ui-engineer` build จาก Figma/token
- **Figma เปลี่ยน → sync code:** อ่าน variables (MCP) → เขียน `tokens/tokens.json` → build (`design-system-designer`)
- **หาข้อมูล/วิจัย/ตอบปัญหาเชิงลึก:** delegate `ux-researcher`

## Bidirectional Sync Rules
> **สำคัญ:** `npm run tokens:pull` (REST `/variables/local`) = **Enterprise-only** → รันไม่ได้บนแพลน pro/starter (403) สคริปต์ `figma-to-tokens.mjs` เขียน format ถูกไว้แล้ว เก็บใช้ตอนได้ Enterprise token `tokens:push` ยังไม่มีสคริปต์จริง

**Pipeline จริง:** `tokens/tokens.json/*.json` (แยกไฟล์ต่อ collection, W3C DTCG) → `npm run tokens:build` (Style Dictionary) → `tokens/output/css/*` + `js/tokens.mjs`
- `typography.json` / `shadows.json` มาจาก **Figma Styles** (text/effect) ไม่ใช่ variables

**วิธี sync Figma → code (เลือกตามขนาดงาน):**
1. **Token Press plugin** (แนะนำ · ทุกแพลน · ครบทั้ง variables + styles) → export ทับ `tokens/tokens.json/*.json` → `npm run tokens:build`
2. **แก้เล็ก** (เพิ่ม/แก้ 2-3 token) → แก้ไฟล์ `tokens/tokens.json/<collection>.json` ตรงๆ → `npm run tokens:build`
3. Figma MCP (agent) อ่าน variables เขียนไฟล์ให้ → build
- ทุกวิธีต้องมี "คนใน Figma หรือ agent" (รัน headless/CI ไม่ได้จนกว่าจะ Enterprise) · ข้อมูล token เหมือนกันทุกวิธี

**อื่นๆ:** Component `.tsx` เปลี่ยน → UI Designer อัปเดต Figma annotations Design/rename/layout ใน Figma = **ไม่กระทบโค้ด** ไม่ต้อง sync (sync เฉพาะชั้น variable/token)

## Asana (สร้าง/แก้ task ผ่าน API)
> project **Design Process 2026** = `1212508564439334` workspace `1202078700109283` token `ASANA_TOKEN` ใน `.env`

- **คอลัมน์บน Board ไม่ใช่ section** แต่คือ **status ของ task type `Design Request`** (`custom_type` = `1212577985434838`) · project มี section เดียวชื่อ `No value` (`1212576889005050`) ที่ task ทุกตัวอยู่ **ห้ามสร้าง section ใหม่**
- **สร้าง task ต้องส่ง 3 ฟิลด์นี้เสมอ** ไม่งั้น task จะเป็น task ธรรมดา ตกไปคอลัมน์ `No value` (เคยพลาด 2026-08-05):
  - `resource_subtype: "custom"` · `custom_type: "1212577985434838"` · `custom_type_status_option: "<status gid>"`
  - ถ้าสร้างเป็น task ธรรมดาไปแล้ว → `PUT /tasks/{gid}` ส่ง 3 ฟิลด์นี้พร้อมกันจะแปลงย้อนหลังได้ (ส่งแยกจะ error `custom_types_require_custom_resource_types`)
- **Status options (Design Request)** · ปกติสร้างใหม่ = `Incoming Brief / Backlog`
  | status | gid | completion |
  |---|---|---|
  | Incoming Brief / Backlog รับบรีฟงานใหม่ | `1212577985434835` | Incomplete |
  | Planning & Scoping ช่วงประเมินเวลาและคุยรายละเอียด | `1212577985434856` | Incomplete |
  | On Hold / Waiting พักงานไว้ก่อน | `1212704129478033` | Incomplete |
  | In Progress (Design Phase) งานที่กำลังออกแบบ | `1212577985434836` | Incomplete |
  | Internal Review / Feedback รอ Stakeholder ตรวจสอบ | `1212577985434857` | Incomplete |
  | Ready for Dev (Handoff) พร้อมส่งต่อ Dev | `1212577985434858` | Incomplete |
  | Cancelled ระงับการทำงาน | `1217444776009291` | Incomplete |
  | **Internal Review / Feedback (ชุดปิดงาน)** | **`1212735010359968`** | **Complete ← ใช้ตัวนี้ตอนปิดการ์ด** |
  | Ready for Dev (Handoff) (ชุดปิดงาน) | `1212735010359969` | Complete |
  | Complete / Done เสร็จสมบูรณ์ | `1212577985434837` | Complete |
  | Cancelled ระงับการทำงาน (ชุดปิดงาน) | `1217444776009292` | Complete |
  > **มีสถานะชื่อซ้ำกัน 2 ชุด** ชุด `Incomplete` = กำลังทำ ชุด `Complete` = ปิดงานแล้ว ชื่อเหมือนกันแต่คนละ gid ห้ามสลับกัน
- **⚠️ Description ของการ์ดต้องใช้เทมเพลต 5 หัวข้อเสมอ** (`Problem` · `Goal` · `Requirements` · `Figma File` · `Reference`) ส่งด้วย `html_notes` ห้ามเขียนเป็นย่อหน้าลอย · เทมเพลตเต็มอยู่ที่ [docs/rules/asana-task-naming.md](docs/rules/asana-task-naming.md) หัวข้อ "Description ของ Task" (เคยพลาด 2026-08-26 เพราะไม่เคยมีใครจดไว้)
- **ตั้งชื่อ task = ทางการที่ [docs/rules/asana-task-naming.md](docs/rules/asana-task-naming.md)** (คัดจากแท็บ `Naming Convention` + `Hierarchy of tasks` ใน Asana) สูตร:
  - `[System]-[Feature] + Action + Page Name / UI Name + (Context)` เช่น `[Script Pro]-[List] Design หน้า Script List (TV View)`
  - **ขีด `-` ใช้ที่เดียว คือคั่น `[System]` กับ `[Feature]` เท่านั้น** · ส่วนที่เหลือ (Action/Page/Context) ไม่มีขีด ใช้เว้นวรรค · กฎนี้ใช้กับ **ชื่อ Task ใน Asana เท่านั้น** ไม่เกี่ยวกับชื่อ layer/component/style/token
  - งานระดับโปรเจกต์ (ทำทุกระบบ/ทุกฟีเจอร์) ใช้ `[Project]-[Action] Detail + (Context)` เช่น `[Nation House]-[Research] Research ข้อมูลเทรนด์ดีไซน์ใหม่`
  - **งาน Design System ใช้ System = `[DS]` หรือ `[Global]`** เช่น `[DS]-[Button] Update รัศมีปุ่ม Primary Button`
  - Action = คำกริยาอังกฤษกระชับ (Design / Update / Fix / Research / Revamp) · Feature ใช้คำสั้น 1-2 พยางค์ · Feature กว้างมากใช้ `[Core]`/`[Main]`
  - **ห้ามใช้ em-dash** ตาม DoD · ก่อนตั้งชื่อให้ไล่ checklist ท้ายไฟล์ taxonomy
- **ลำดับชั้นงาน (Hierarchy):** Project = custom field · System = วงเล็บแรก · Feature = วงเล็บสอง · Page = ชื่อ task หลัก · Module = subtask/description · Component = subtask checklist
- **Custom field ที่ต้องเซ็ตครบทุก task** (ค่ามาตรฐานที่ทีมใช้): Project `1212876421536464` (Design System = `1212876426148709`) · Priority `1212897382706626` (Medium = `1212897382706628`) · Design Level `1213022521699804` (Document = `1216647463739381`) · Assigner `1212991461878499` (พิษณุวัฒน์ สมศรี = `1212991461878507`) · Assign Date `1212991461878509` (`{"date":"YYYY-MM-DD"}`) · Assignee = Tommyy_PS `1202145155564203`
- **⚠️ วงจรวันที่ของการ์ด (user สั่ง 2026-08-18)** มี 3 วัน คนละหน้าที่ **ห้ามสับสน**:
  1. **วันสร้างการ์ด** → custom field **Assign Date** `1212991461878509` (`{"date":"YYYY-MM-DD"}`) ตั้งตอนสร้าง
  2. **วันที่หยิบมาทำ** → **Start date** (`start_on` field มาตรฐาน Asana) ตั้งตอนเริ่มลงมือ พร้อมย้ายสถานะเป็น `In Progress (Design Phase)`
  3. **วันที่เสร็จ** → **Due date** (`due_on` field มาตรฐาน) ตั้ง **หลัง push worklog ลงคอมเมนต์แล้ว** แล้วค่อยปิดการ์ด
  - **ไม่เก็บย้อนหลัง** (user สั่ง) เริ่มบันทึก start/due ตั้งแต่การ์ดที่หยิบมาทำหลัง 2026-08-18 เป็นต้นไป
  - **การ์ดที่ไม่มี due date จะตกไปอยู่ล่างสุดของบอร์ด หาไม่เจอ** (เคยพลาด 2026-08-18)
  - **⚠️ ปิดการ์ด = ไปค้างที่ `Internal Review / Feedback` รอ Stakeholder ตรวจอีกรอบ ไม่ใช่ `Complete / Done`** (user ยืนยัน 2026-08-24) · `Complete / Done` ใช้ตอนตรวจผ่านแล้วจริง ๆ เท่านั้น
    - ส่ง `completed:true` ได้เลย Asana จะ map ไปที่ **ชุดกระจกของสถานะปัจจุบัน** ให้เอง ซึ่งตรงกับกระบวนการอยู่แล้ว (ปิดจาก In Progress → ไป Internal Review ชุด Complete)
    - ถ้าจะระบุสถานะเอง ให้ส่ง `resource_subtype:custom` + `custom_type` + `custom_type_status_option` **โดยไม่ส่ง `completed`** · ถ้าส่ง `completed` มาด้วย มันจะทับค่าที่เราระบุ ยิงซ้ำกี่รอบก็ไม่ขยับ
    - **เช็คผลก่อนบอกเสร็จเสมอ** ว่า status เป็นตัวที่ตั้งใจ ไม่ใช่แค่ `completed:true`
- **กฎการเขียน worklog ฉบับเต็ม = ทางการที่ [docs/rules/worklog.md](docs/rules/worklog.md)** (เก็บที่ไหน · เขียนยังไง · ส่งขึ้น Asana ยังไง · วงจรวันที่ · สคริปต์) แก้กฎให้แก้ที่ไฟล์นั้น
- **⚠️ โครงสร้าง worklog (user สั่ง 2026-08-18)** แยก 3 ที่ ห้ามยิงรวมใบเดียวแบบเดิม:
  | ที่เก็บ | เนื้อหา |
  |---|---|
  | เครื่อง `docs/daily-log/daily/<เดือนไทย ปีพ.ศ.>/W{สัปดาห์}-{Day}-{DD}-{MM}-{พ.ศ.}.md` | สรุปรายวันเต็ม ทุกการ์ดรวมกัน (ที่เก็บเดียว ไม่มีสำเนา `.txt` แล้ว) |
  | การ์ดงานแต่ละใบ | comment **เฉพาะงานของการ์ดนั้น** ห้ามปนงานการ์ดอื่น |
  | subtask **สรุปงานที่ทำ เดือน\<เดือน\>** | comment **วันละ 1 อัน** ไทม์ไลน์รายวันข้ามทุกการ์ด |
  | subtask **สรุปงานค้าง เดือน\<เดือน\>** | รายการงานค้าง อัปเดตให้ตรงปัจจุบัน ของที่เสร็จแล้วตัดออก |
  - เดือนสิงหาคม 2026 = การ์ด `1217175719800597` · subtask สรุปงานที่ทำ `1217594446323461` · สรุปงานค้าง `1217596656926290` · ขึ้นเดือนใหม่ให้สร้างการ์ด + subtask 2 อันแบบเดียวกัน
  - **สร้าง subtask:** POST `/tasks/{parent}/subtasks` ส่ง `name` ก่อน แล้ว PUT `html_notes` ตามทีหลัง · **ห้ามใช้ `<p>`** จะได้ 400 `XML is invalid`
- **ask-first:** สร้าง/แก้/ลบ task ใน Asana = ถามก่อนเสมอ
- **⚠️ จังหวะ push worklog (user สั่ง 2026-08-27) แยก 2 แบบ ห้ามสับสน**
  - **worklog รายวัน (ภาพรวมทั้งวัน)** → push ขึ้น subtask `01 งานที่ทำ` และ `02 งานค้าง` ของการ์ดสรุปเดือน **ตอน 16:30 อัตโนมัติ ไม่ต้องขออนุมัติ ไม่ต้องถามซ้ำ** แค่รายงานให้ทราบว่า push แล้ว
  - **worklog ของ task (เฉพาะการ์ดนั้น)** → อัปเดตก่อนปิดการ์ด แต่ **ต้องรอ user คอนเฟิร์มก่อนเสมอ**

## สิ่งที่ต้องทำก่อนเสมอ
- อ่าน tokens/tokens.json เพื่อเข้าใจ current design tokens
- อ่าน docs/README.md เพื่อดู system overview
- ตรวจว่า .env มี FIGMA_TOKEN และ FIGMA_FILE_KEY ครบ

## Output Format
เมื่อทำงานเสร็จแต่ละ task ให้สรุป:
- งานที่ทำ: [description]
- ไฟล์ที่เปลี่ยน: [file list]
- Sync ที่ต้องทำต่อ: [next sync step]
