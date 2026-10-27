# ย้าย CLAUDE.md เดิมไปไว้ที่ไหน (2026-10-27)

CLAUDE.md เดิมยาว 62KB และถูกโหลดเต็มทุกครั้งที่เริ่มงาน ตอนนี้แยกเป็นชั้นตามคู่มือ Context Layer
ชั้นบนสุด (`AGENTS.md` กับ `CLAUDE.md`) เก็บเฉพาะกฎที่ใช้ทุกงาน ที่เหลือย้ายไปไฟล์ที่ AI เปิดเฉพาะตอนทำงานนั้น
ไฟล์ใหม่ทั้งหมดเขียนเป็นภาษาอังกฤษตามที่ตัดสินไว้ เนื้อหาแปลจากของเดิม ไม่ได้เพิ่มกฎใหม่ ยกเว้นที่ระบุไว้ท้ายไฟล์นี้
ฉบับเดิมครบทุกบรรทัดอยู่ที่ [CLAUDE.2026-10-27.md](CLAUDE.2026-10-27.md) และอยู่ในประวัติของ git

| หัวข้อใน CLAUDE.md เดิม | ย้ายไปที่ |
| --- | --- |
| ทีม 3 role และบทบาทของ lead | `CLAUDE.md` หัวข้อ Team of 3 roles |
| กฎการทำงาน (ถามก่อน ห้ามคิดเอง ทำทีละขั้น) | `AGENTS.md` หัวข้อ Ask a person first |
| ห้ามสีดิบ ผูกจาก collection component ห้าม fallback เป็น hex | `AGENTS.md` หัวข้อ Rules to follow every time และ `context/tokens/` |
| Typography ใช้ preset เท่านั้น กฎบทบาทฟอนต์ Prompt กับ Sarabun | `AGENTS.md` (หนึ่งบรรทัด) และ `context/tokens/tokens.dsds.yaml` entry typography |
| Effect (เงา เบลอ วงแหวนโฟกัส) | `context/workflows/figma-ds-file/components.md` ฝั่งการทำใน Figma และ `context/tokens/tokens.dsds.yaml` ฝั่งการใช้งาน |
| ระบบสเกลขนาด สูตร collision และด่าน verify:coverage | `tokens/AGENTS.md` |
| ด่าน verify:api และ figma-components.json | `components/AGENTS.md` |
| ด่าน verify:families และการโคลนตระกูลสี | `context/workflows/figma-ds-file/components.md` |
| Token Press และ clean-selfref | `tokens/AGENTS.md` หัวข้อ Pipeline |
| Pre-flight ก่อนแตะเอกสารของหน้า โครง section และเกณฑ์ว่าเนื้อหาไปเอกสารไหน | `context/workflows/figma-ds-file/doc-pages.md` |
| ทำทีละหน้า ตรวจเฉพาะหน้าที่หยิบมาทำ | `AGENTS.md` (ใช้ทุกงาน) |
| Definition of Done ข้อ 1 ตัวคั่นพิเศษ | `AGENTS.md` หัวข้อ Check before you hand off และ `context/guidelines/` |
| Definition of Done ข้อ 2 ถึง 10 (สีดิบ หน้าที่ยกเว้น ใช้ของ Design System หัวเอกสาร ค่าจริง ขนาด component ต้นฉบับ การลบเป็นชุด) | `context/workflows/figma-ds-file/SKILL.md` หัวข้อ Done checklist |
| Definition of Done ข้อ 8 และ 8.5 (เอกสารครบชนิด Page Doc ต้องมีตัวอย่างจริง) | `context/workflows/figma-ds-file/doc-pages.md` |
| การตั้งชื่อ layer component style | `context/workflows/figma-ds-file/naming.md` |
| Project Context และ Project Structure | `AGENTS.md` หัวข้อ What this project is |
| Flow มาตรฐาน | `CLAUDE.md` หัวข้อ Team of 3 roles |
| Bidirectional Sync Rules | `tokens/AGENTS.md` หัวข้อ Pipeline |
| Git และ GitHub | `docs/rules/git-github.md` (กฎถามก่อนอยู่ใน `AGENTS.md` ด้วย) |
| Asana (รหัส สถานะ ฟิลด์ วันที่ การปิดการ์ด) และโครงสร้าง worklog | `context/workflows/asana-worklog/SKILL.md` และ `reference.md` |
| สิ่งที่ต้องทำก่อนเสมอ (อ่าน tokens.json อ่าน docs/README.md ตรวจ .env) | แทนด้วย "เปิด `context/index.md` ก่อน" ใน `AGENTS.md` ส่วนการตรวจ `.env` ย้ายไป `tokens/AGENTS.md` |
| Output Format (สรุปงาน ไฟล์ที่เปลี่ยน sync ที่ต้องทำต่อ) | `AGENTS.md` ข้อสุดท้ายของ Check before you hand off |

## สิ่งที่เปลี่ยนจากเดิมโดยตั้งใจ

- **ขั้นตอนงานเฉพาะทางอยู่ที่ `context/workflows/`** (งานในไฟล์ Figma งาน Asana และ worklog ตัวเลือกไฟล์สำหรับงาน UI) เขียนในรูปแบบ skill ของ Claude และ `CLAUDE.md` บอกให้เปิดตามชนิดงาน จึงใช้ได้ทุกเครื่องมือ ถ้าอยากให้ Claude เลือกเปิดเองจากคำอธิบายด้วย ให้คัดลอกแต่ละโฟลเดอร์ไปไว้ใน `.claude/skills/`

- **ไม่ให้อ่าน `tokens/tokens.json` ทั้งไฟล์ตอนเริ่มงานอีกแล้ว** ไฟล์ `component.json` ยาว 633KB อ่านทั้งไฟล์แล้วกินพื้นที่จนกฎอื่นจางหาย ให้ค้นเฉพาะชื่อที่ต้องการแทน และใช้รายการที่สร้างอัตโนมัติใน `context/tokens/token-list.md`
- **กฎสีฝั่งโค้ดเขียนให้ชัดขึ้น** ฝั่ง Figma ผูกจาก collection component เท่านั้นเหมือนเดิม ฝั่งโค้ดอนุญาตให้ใช้ semantic ได้เมื่อ component ไม่มีตัวที่ตรงงาน ตามที่ `docs/01-color.md` เขียนไว้ (เช่นขอบปกติ `--ntg-color-border-general-primary` มีแค่ใน semantic)
- **เอกสารใน Figma มี 5 ชนิด ไม่ใช่ 4** CLAUDE.md เดิมเขียนว่า 4 ชนิด แต่ `docs/rules/component-doc-standard.md` ข้อ 0.5 ซึ่งเป็นฉบับทางการมี Space Document เป็นชนิดที่ 5 แล้ว
- **ชื่อกลุ่ม preset ตัวอักษรเปลี่ยนเป็นของปัจจุบัน** CLAUDE.md เดิมเขียนหมวด `display headline title editorial meta ui heading text article` ซึ่งเก่าแล้ว ไฟล์ใหม่ใช้ 9 ตระกูลที่ build ออกมาจริงใน `typography.css` (display page-heading section-heading title body article article-pullquote meta label)
- **กฎใหม่จากคู่มือ Context Layer**
  - แก้ component เสร็จแล้วต้องแก้รายการใน `context/design-system.dsds.yaml` และสเปกใน `context/components/` ให้ตรงด้วย (`components/AGENTS.md`) เพื่อไม่ให้ context เก่ากว่าโค้ด
  - ห้ามใช้ token ชั้น primitive ห้ามใช้ของที่สถานะ deprecated และเจอ `NEEDS CLARIFICATION` ต้องถาม (`AGENTS.md`)
- **กฎที่ยกมาจากเอกสารอื่นใน repo (มีอยู่แล้ว แค่ไม่เคยอยู่ใน CLAUDE.md)**
  - สแกนหาคนใช้ก่อนลบหน้าหรือชุด จาก `docs/rules/layer-scope.md` ข้อ 4
  - ยังเหลือ 56 จุดที่ผูกสไตล์เงารุ่นเก่า จาก `docs/05-effect.md` ข้อ 5
  - `npm run typecheck` ต้อง 0 error จาก `docs/README.md` ข้อ 4
  - กฎ `RADIUS_SCALE` จาก `docs/rules/token-naming-taxonomy.md` ข้อ 3.3.1 และ `docs/06-shape.md`
  - ไฟล์ token ใหม่ต้องเพิ่มใน `source` ของ `style-dictionary.config.mjs` จาก `docs/04-grid.md` ข้อ 5
  - Space Document และลำดับการวางเอกสาร จาก `docs/rules/component-doc-standard.md` ข้อ 0.5
