# Nation Group Brand Codes (ตัวย่อ 3 ตัวอักษร)

> มาตรฐานตัวย่อของ Nation Group Thailand + แบรนด์ในเครือ 13 แบรนด์ ใช้เป็น **token namespace prefix** (core) และ **brand-theme/mode identifier** (เว็บลูก)

## หลักการ
- **ตัวย่อ = 3 ตัวอักษร ตัวเล็กทั้งหมด** (identifier-safe: ใช้ได้ทั้ง CSS var, JS, Figma mode, ชื่อไฟล์)
- **1 แบรนด์ = 1 code ตายตัว** ไม่เปลี่ยนตามแคมเปญ/โลโก้
- **core namespace = `ntg`** → CSS var prefix ปัจจุบัน `--ntg-...` (เปลี่ยนจาก `--nation-` 2026-07-16)
- แบรนด์ในเครือ = ใช้ code เป็นชื่อ **brand theme/mode** (เฟส multi-brand) token ชื่อเดียวกันทุกแบรนด์ ต่างแค่ค่าสีตาม mode

## ตาราง code

| code | แบรนด์ | หมายเหตุ |
|---|---|---|
| **`ntg`** | เนชั่น กรุ๊ป ไทยแลนด์ (Nation Group Thailand) | **core / group** namespace ของ DS |
| `bkk` | กรุงเทพธุรกิจ (Bangkokbiznews) | เว็บลูก |
| `ksn` | ขอบสนาม (Khobsanam) | เว็บลูก |
| `kcl` | คมชัดลึก (Komchadluek) | เว็บลูก |
| `nts` | เนชั่นสตอรี่ (Nation Story) | เว็บลูก |
| `ntv` | เนชั่น ทีวี (Nation TV) | เว็บลูก |
| `ptd` | โพสต์ทูเดย์ (Posttoday) | เว็บลูก |
| `spn` | สปริงนิวส์ (Spring News) | เว็บลูก |
| `thn` | ไทยนิวส์ (Thai News) | เว็บลูก |
| `tnw` | ทีนิวส์ (Tnews) | เว็บลูก (เพิ่ม 2026-08-27 ตอนทำหน้า 08 Logo เดิมมีโลโก้แต่ไม่มีรหัส) |
| `tsk` | ฐานเศรษฐกิจ (Thansettakij) | เว็บลูก |
| `tnt` | เดอะเนชั่น (The Nation) | เว็บลูก |
| `tpp` | เดอะพีเพิล (The People) | เว็บลูก |

## การใช้งาน (สถาปัตยกรรม multi-brand)
- **ตอนนี้:** ทำ core DS `ntg` (master) ให้เสร็จก่อน · token prefix = `--ntg-`
- **เฟส multi-brand:** เว็บลูกต่างกันแค่ brand color/layout, component คล้ายกัน + แต่ละแบรนด์มี dark mode → ทำเป็น **theme layer**
  - **brand color = ชั้น primitive ที่ swap ตาม brand** · semantic + component (ชื่อเดียวกันทุกแบรนด์) ไม่ต้องแตะ
  - **⚠️ Figma mode limit** (Pro = 4 modes/collection, ไม่ใช่ Enterprise) → 12 แบรนด์ × light/dark ใส่เป็น mode รวมไม่ได้ · ทางออก: **per-brand collection** (แต่ละแบรนด์ 2 mode) หรือ **brand ที่ build layer** (Style Dictionary gen `variables-<code>.css` ต่อแบรนด์ แนะนำ)
  - layout ต่าง = จัดการที่ component variant/responsive ไม่ใช่ token
