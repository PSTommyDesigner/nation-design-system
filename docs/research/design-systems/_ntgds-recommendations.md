# ntgds Core ข้อเสนอปรับปรุง Design System (spec สำหรับรีวิว)

> เอกสารข้อเสนอ ยังไม่แตะโค้ด ให้ user รีวิว/ยืนยันก่อนลงมือ อัปเดต 2026-07-10
> **Scope:** ทำเฉพาะ **core ntgds** ไม่ทำ multi-brand 6 เว็บ (พักไว้ แต่ละเว็บทำ DS ย่อยเอง)
> **ข้ามในรอบนี้:** governance / lint / changelog / RFC / contribution tiers
> อ้างอิง research 11 ไฟล์ที่ `docs/research/design-systems/` + setup จริง (`tokens/tokens.json/*`, `tokens/output/css/*`, `style-dictionary.config.mjs`, CLAUDE.md)

---

## สรุปผู้บริหาร (อ่านก่อน)

4 workstream เรียงตาม dependency:

| # | Workstream | ปัญหาแกน | Effort | ทำได้เมื่อไหร่ |
|---|---|---|---|---|
| **4** | **แก้ token collisions 2042 (light+dark)** | build รวม light+dark ในรอบเดียว ชื่อชนกัน → dark ทับ light เงียบๆ | **M** | **ทำก่อนสุด** (แก้โครง เป็นฐานของทุกอย่าง) |
| **3** | **on-\<role\> color pairs** | มี on-brand บางส่วน แต่ไม่ครบ/ไม่เป็นระบบ → เสี่ยง contrast fail | **S–M** | หลัง #4 |
| **1** | **Typography roles + preset lock** | 63 styles จัดตามขนาด ไม่มี functional role ไม่มี byline/caption/label | **M** | ขนานกับ #3 ได้ |
| **2** | **Naming taxonomy เป็นทางการ** | ชื่อ token ถูกโดยสัญชาตญาณ แต่ไม่มีกฎ level order ที่เขียนไว้ | **S** (เอกสาร) | ทำได้ทันที (ขนาน) |

**เริ่มที่ #4 ก่อน** เพราะเป็นบั๊กโครงสร้างที่ทำให้ dark mode ในโค้ดยังไม่ทำงานจริง และเป็นฐานที่ #1/#3 ต้องยืนอยู่บน (การเพิ่ม on-role / preset ใหม่จะยิ่งเพิ่ม collision ถ้าไม่แก้ก่อน)

---

## Workstream 4 แก้ token collisions 2042 (light + dark) 🔴 ทำก่อนสุด

### ปัญหาปัจจุบัน
`npm run tokens:build` รายงาน `Token collisions detected (2042)` เพราะ:

- `semantics-light-mode.json` และ `semantics-dark-mode.json` เป็น **collection เดียวกัน** (`VariableCollectionId:4355:7291`, name `semantics`) แต่คนละ **mode** (`light-mode` / `dark-mode`)
- แต่ละไฟล์มี **437 token** ชื่อ path เดียวกันเป๊ะ (เช่น `color.text.primary.default` มีทั้งใน light และ dark)
- `style-dictionary.config.mjs` ใส่ทั้งสองไฟล์ใน `source[]` เดียว → Style Dictionary flatten รวมกัน → **ชื่อ `--ntg-color-text-primary-default` ถูกนิยาม 2 ครั้ง** ค่า dark เขียนทับค่า light (แล้วแต่ลำดับ source) โดยไม่มี selector แยก
- ตัวเลข 2042 = จำนวนคู่ที่ชนกัน (รวม nested references ที่ collision ลามต่อ) ผลจริงคือ **`:root` มีชุดสีเดียว ไม่ใช่ light/dark สองชุด** → dark mode ในโค้ดยังใช้ไม่ได้จริง แม้ Figma มี 2 mode

**สาเหตุรากคือ:** โมเดล "mode" ของ Figma variables ไม่ได้ถูกแปลงเป็น "mode" ในฝั่ง CSS output SD ถูกป้อน 2 mode เป็น flat tokens ชุดเดียว

### ข้อเสนอ (3 ทางเลือก เรียงตามที่แนะนำ)

**ทางเลือก A build ต่อ mode แยก selector (แนะนำ) Effort M**
สร้าง 2 platform/2 ไฟล์ output จาก source ที่ต่างกันเฉพาะไฟล์ semantics:

```
build: light → source = [primitive, component, semantics-light, ...] → :root { … }
build: dark  → source = [primitive, component, semantics-dark,  ...] → :root[data-theme="dark"], .dark { … }
```
- output รวมเป็น `variables.css` ไฟล์เดียว (light ใน `:root`, dark ใน `.dark`/`[data-theme=dark]`) หรือแยก `variables-dark.css`
- อ้างอิง: **Material 3** "light/dark = map tone ต่างกันบน role เดียวกัน สลับธีมโดยไม่แตะชื่อ role" (material-3.md §2) · **NYT Games** "นิยาม token หลายชุด light/dark แล้วสลับ dynamically ผ่าน CSS variable" (nyt.md §2) · **Carbon** 4 ธีมใน library เดียว token ตัวเดียว map ต่างธีม (carbon.md §2)
- **ข้อดี:** ชื่อ token คงเดิม (`--ntg-color-text-primary-default` ตัวเดียว) ค่าเปลี่ยนตาม scope · dark mode ใช้ได้จริงทันที · ไม่กระทบ consumer ที่อ้างชื่อ token · เป็น pattern มาตรฐานอุตสาหกรรม
- **ข้อเสีย:** ต้องปรับ `style-dictionary.config.mjs` ให้ instantiate SD 2 รอบ (หรือใช้ SD `themes`/multi-file config) · ต้องตกลง selector convention (`.dark` vs `[data-theme=dark]`) กับ Frontend Builder

**ทางเลือก B SD "themes" / โครง config หลาย instance Effort M**
ใช้ pattern เดียวกับ A แต่จัดเป็น loop `for (mode of ['light','dark'])` สร้าง config ต่อ mode. เหมือน Spectrum ที่ token เดียวแตกได้หลาย set/context (light/dark/contrast/scale) พร้อมกัน (spectrum.md §2). ผลลัพธ์เท่ากับ A แต่ scale ต่อได้ (เพิ่ม high-contrast/mobile scale ภายหลัง)
- **ข้อดี:** ขยายไป high-contrast / desktop-mobile scale ได้โดยไม่รื้อ (Fluent ชี้ว่า hc ควรเป็น theme แยก fluent-2.md §2; Spectrum ทำ scale desktop/mobile แยกใน token เดียว)
- **ข้อเสีย:** config ซับซ้อนกว่า A เล็กน้อย (over-engineer ถ้ายังมีแค่ 2 mode)

**ทางเลือก C output ต่อไฟล์ ไม่รวม selector Effort S**
`variables-light.css` + `variables-dark.css` แยกไฟล์คนละ `:root` ให้ app import ตามธีม
- **ข้อดี:** แก้เร็วสุด, collision หาย
- **ข้อเสีย:** สลับธีม runtime ยาก (ต้อง swap stylesheet ทั้งไฟล์ ไม่ใช่ toggle class) · ไม่เข้ากับ pattern CSS variable ที่ NYT/M3/Carbon ใช้ · ไม่แนะนำถ้าอยากได้ dark mode toggle ลื่น

### แนะนำ
**เลือก A ตอนนี้ เขียน config ให้ต่อยอดเป็น B ได้** (loop mode ที่มีแค่ light/dark ก่อน). ตั้ง selector = `:root` (light default) + `:root[data-theme="dark"]` ยืนยันกับ Frontend Builder ว่าใช้ attribute หรือ class

### Dependency
- **ไม่มี prerequisite** เป็นงานโครงสร้าง ทำได้ทันที
- **เป็น prerequisite ของ #3** (on-role pair ต้อง build ต่อ mode ถึงจะการันตี contrast สองธีม) และควรเสร็จก่อนขยาย #1 (ยิ่งเพิ่ม preset/token ยิ่งเพิ่ม collision)

---

## Workstream 1 Typography roles + preset lock (ยืม Guardian + NYT)

### ปัญหาปัจจุบัน
63 styles ปัจจุบัน = **จัดตามขนาดล้วน ยังไม่มี functional role**:

| กลุ่ม | presets | family | ปัญหา |
|---|---|---|---|
| `heading/h1..h6` × {bold, regular} | 12 | Prompt (primary) | ชื่อบอก "ขนาด" ไม่บอก "ใช้ทำอะไร" |
| `text/xl..xs` × {bold, regular} | 10 | Prompt (primary) | UI text ทั่วไป ไม่มี label/caption/overline แยก |
| `article/lg..sm` × {bold, regular} | 6 | Sarabun (article) | body อ่านยาว ไม่มี byline/timestamp/quote |
| (อื่นๆ ใน 63: `_lead`, effect/shadow ฯลฯ) | ~35 | | |

**ช่องว่างที่ชัด:**
1. **ไม่มีกฎบทบาท Prompt vs Sarabun** คน/agent เลือกฟอนต์ตามขนาด ไม่ใช่ตามหน้าที่ → เสี่ยงเอา Prompt ไปเป็น body ยาว หรือ Sarabun ไปเป็น label
2. **ขาด editorial role presets** ที่ข่าวต้องใช้ทุกวัน: byline, timestamp, caption, kicker/overline, section-label, pullquote ตอนนี้ต้อง "ยืม" `text-sm` มาใช้แล้วหวังว่าจะถูก
3. **ไม่มี preset lock** ไม่มีกฎห้าม compose (ผสม family+size+weight เอง) → ช่องโหว่ที่ Guardian ปิดไว้ตั้งแต่ต้น

### ข้อเสนอ

**1a. กฎบทบาทฟอนต์ (NYT font-role model nyt.md §4)**
NYT: *"sans = ข้อมูลเชิงหน้าที่ serif = เรื่องเล่า"* (Franklin = byline/timestamp/label/nav ทั้งหมด Cheltenham/Imperial = editorial)

Nation map แบบเดียวกัน:

| ฟอนต์ | บทบาท | ใช้กับ |
|---|---|---|
| **Prompt** (`font-family.primary`) | **"functional / UI voice"** | heading, UI text, label, byline, timestamp, caption, overline, nav, button, badge |
| **Sarabun** (`font-family.article`) | **"editorial / reading voice"** | article body, lead paragraph, pullquote, long-form อ่านยาว |

> เหตุผล Prompt-as-heading (ไม่ใช่ Sarabun): Prompt เป็น display sans อ่าน headline สั้นชัด Sarabun เป็น humanist ออกแบบมาเพื่อ body ไทยอ่านยาว ตรง NYT ที่ editorial serif ทำ body, sans ทำ headline+label. (Guardian เตือน: อย่าลอก scale ฝรั่งตรงๆ x-height ไทยต่าง guardian-source.md §4 ข้อ 2 scale ที่มีอยู่ถือว่า tuned แล้ว เก็บไว้)

**1b. Role presets ที่ขาด** map ชื่อ + family + size/lineHeight จาก scale ที่มีอยู่ (ไม่สร้าง size ใหม่ ใช้ token เดิม):

| Role preset (เสนอ) | family | fontSize (token เดิม) | lineHeight (token เดิม) | weight | อ้างจาก |
|---|---|---|---|---|---|
| `label/md` | Prompt | `text-sm` (14) | `text-sm` (24) | bold(600) | NYT Franklin label |
| `label/sm` | Prompt | `text-xs` (12) | `text-xs` (22) | bold | |
| `overline` (kicker/หมวดข่าว) | Prompt | `text-xs` (12) | `text-xs` (22) | bold | NYT section label |
| `byline` (ชื่อผู้เขียน) | Prompt | `text-sm` (14) | `text-sm` (24) | regular | NYT Franklin byline |
| `timestamp` (เวลา/วันที่) | Prompt | `text-xs` (12) | `text-xs` (22) | regular | NYT timestamp |
| `caption` (คำบรรยายภาพ) | Prompt | `text-xs` (12) | `text-xs` (22) | regular | ทุก DS |
| `pullquote/lg` | Sarabun | `article-lg` (18) | `article-lg` (34) | bold | Guardian editorial |
| `quote` (blockquote inline) | Sarabun | `article-md` (16) | `article-md` (32) | regular | |
| `lead` (นำเรื่อง) | Sarabun | `article-lg` (18) | `article-lg` (34) | regular | มี `_lead` อยู่แล้ว → ทำให้เป็น preset ทางการ |

ตัวอย่าง token W3C DTCG (ต่อท้ายใน `typography.json`, ใช้ reference เดิมทั้งหมด):
```jsonc
"label": {
  "md": {
    "$type": "typography",
    "$value": {
      "fontFamily": "{typography.font-family.primary}",
      "fontSize":   "{typography.font-size.text-sm}",
      "fontWeight": "{typography.font-weight.bold}",
      "letterSpacing": "{typography.letter-space.text-sm}",
      "lineHeight": "{typography.line-height.text-sm}"
    }
  }
},
"byline": {
  "$type": "typography",
  "$value": {
    "fontFamily": "{typography.font-family.primary}",
    "fontSize":   "{typography.font-size.text-sm}",
    "fontWeight": "{typography.font-weight.regular}",
    "letterSpacing": "{typography.letter-space.text-sm}",
    "lineHeight": "{typography.line-height.text-sm}"
  }
}
```
→ `css/typography-classes` format ที่มีอยู่จะ emit `.ntg-typography-label-md`, `.ntg-typography-byline` อัตโนมัติ (ไม่ต้องแตะ config)

**1c. กฎ "preset lock" (Guardian guardian-source.md §4)**
Guardian: *"~100 presets = ทุก combo ที่ valid ถูกตัดสินไว้แล้ว → ไม่มีใคร (คนหรือ AI agent) ประกอบ combination ผิดได้"*

กฎที่เสนอเขียนลง CLAUDE.md / design-system.md:
> **Typography = preset-only.** ใช้ได้เฉพาะ 63+ presets ที่ประกาศใน `typography.json` (แต่ละตัว = คอมโบ family+size+weight+lineHeight+letterSpacing ที่ตัดสินแล้ว). **ห้าม compose typography เอง** ห้ามผสม `font-family.primary` กับ size ที่ไม่ได้จับคู่ไว้, ห้าม override lineHeight/weight นอก preset. ถ้าต้องการคอมโบใหม่ → **ถามก่อนเพิ่ม preset** (ตามกฎ ask-first) ห้ามประกอบ inline
- เข้ากับ CLAUDE.md ที่ห้าม hex ดิบ/บังคับ bind variable อยู่แล้ว เป็นกฎคู่ขนานฝั่ง typography

### Effort: **M**
- 1a กฎบทบาท (เอกสาร) = S · 1b เพิ่ม ~9–12 presets (แก้ `typography.json` + build) = S–M · 1c เขียนกฎ + sync Figma text styles = M (ต้องมีคนใน Figma สร้าง text style ให้ครบตาม token ตาม pipeline ที่ typography มาจาก Figma Styles ไม่ใช่ variables)

### Dependency
- **ไม่ block โดย #4** (typography ไม่มี light/dark mode เป็น Figma Styles) → ทำขนานได้
- แต่ **ควรทำหลัง/พร้อม #2** (naming taxonomy) เพื่อให้ชื่อ preset ใหม่ (`label/md`, `byline`) ตรง taxonomy ตั้งแต่แรก

---

## Workstream 2 Naming taxonomy เป็นทางการ (framework Nathan Curtis)

### ปัญหาปัจจุบัน
ชื่อ token ปัจจุบัน **ถูกโดยสัญชาตญาณ** (เช่น `ntg-color-text-primary-default`) แต่:
- ไม่มีเอกสาร **level order** ที่เขียนไว้ → คนใหม่/agent เดา level เอง เวลาเพิ่ม token ใหม่ (เช่น #1 byline, #3 on-error) เสี่ยงวางผิดชั้น
- ไม่มีตารางกฎว่า token type ไหนใช้ level ไหนบ้าง → ชื่ออาจ drift (บางตัวมี `-hover`, บางตัว `-alt-hover`, บางตัว `-solid-alt-hover` ลำดับ modifier ไม่ถูก lock)
- Atlassian ชี้ว่า taxonomy ที่อ่านแล้วรู้ intent คือรากฐาน (atlassian.md §1, "สิ่งที่ควรเรียนรู้" ข้อ 1)

### ข้อเสนอ

**2a. Level order ของ Nation (โมเดล Nathan Curtis)**
Curtis: `namespace . base/category . property . concept/role . variant . state . scale . mode`
+ 3 tier: **base → semantic → component**

Level order ทางการของ Nation (map เข้าของที่มีจริง):

```
[namespace] . [category] . [property] . [role/concept] . [prominence] . [state] . [mode*]
  nation        color        text          primary          -            default
  nation        color        background     brand            solid        hover
  nation        color        border         system           error        solid-hover
  nation        typography    -             label            md           -
  nation        spacing       -             -                4            -
```
\* **mode (light/dark)** ไม่อยู่ในชื่อ token จัดการที่ชั้น build/selector (ผลของ #4) ตาม M3/NYT (สลับธีมโดยไม่แตะชื่อ role)

**Tier mapping (bind flow บังคับ `component → semantic → base` ตรง M3 comp→sys→ref, material-3.md §1):**

| Tier | collection (ไฟล์) | ตัวอย่าง | ใครอ้างได้ |
|---|---|---|---|
| **base** (primitive/ref) | `primitive.json` | `color.gray-dark-50`, `font-size.h1` | semantic เท่านั้น (โค้ด/ดีไซน์ห้ามอ้างตรง) |
| **semantic** (sys/alias) | `semantics-light/dark.json` | `color.text.primary.default` | component |
| **component** (bind layer) | `component.json` | `color.text.general.heading` | **โค้ด+Figma bind ที่นี่เท่านั้น** (กฎ CLAUDE.md) |

**2b. token ปัจจุบัน map เข้า levels อย่างไร**

`--ntg-color-text-primary-on-brand` แตกเป็น:
```
nation   | color    | text     | primary  |  (prominence: -)  | on-brand
namespace| category | property | role     |                   | state/pairing
```
`--ntg-color-background-system-error-solid-hover`:
```
nation | color | background | system | error | solid | hover
       |       | property   | role   | concept(prominence) | variant | state
```
→ ยืนยันว่าโครงเดิมเข้ากับ Curtis ได้ **โดยไม่ต้อง rename** งานหลักคือ *เขียนกฎให้เป็นทางการ* ไม่ใช่รื้อชื่อ

**2c. ตารางกฎ: token type ใช้ level ไหน + ถูก/ผิด**

| Token type | levels ที่ใช้ | ตัวอย่าง **ถูก** | ตัวอย่าง **ผิด** + เหตุผล |
|---|---|---|---|
| color text | category.property.role.state | `color.text.primary.default` | `color.text.default.primary` ❌ (สลับ role/state) |
| color bg | category.property.role.prominence.state | `color.background.brand.solid.hover` | `color.background.hover.brand` ❌ `color.bg.brand.solid.hover` ❌ (ย่อ property) |
| color border | category.property.role.concept.variant.state | `color.border.system.error.solid-hover` | `color.border.error.system` ❌ (role/concept สลับ) |
| color pairing | ...role.**on-\<surface\>** | `color.text.primary.on-brand` | `color.text.on-brand-primary` ❌ (on ต้องอยู่ท้ายสุด) |
| typography | category.role.scale | `typography.label.md` `typography.heading.h1-bold` | `typography.md.label` ❌ `typography.prompt.h1` ❌ (ห้ามใส่ชื่อ family ในชื่อ preset) |
| spacing | category.scale | `spacing.4` | `spacing.medium` ❌ (ใช้ตัวเลข grid ตามที่มี) |

**กฎลำดับ modifier (lock):** `concept → prominence/variant → state` เสมอ (เช่น `error-solid-hover` ไม่ใช่ `hover-error-solid`). ค่า state มาตรฐาน = `default hover active disabled selected` (ยืม Fluent/Polaris state-in-name fluent-2.md §1, polaris.md §1)

### Effort: **S** (เอกสารล้วน ไม่แตะ token ถ้าไม่พบชื่อผิด)
- ถ้าตรวจแล้วพบชื่อที่ผิดลำดับ → รายการ rename เป็นงานแยก (ต้องแตะ Figma variables + rebuild) = ยกเป็น follow-up

### Dependency
- **ทำได้ทันที ขนานทุกอย่าง** เป็นเอกสารอ้างอิงที่ #1 (ตั้งชื่อ preset ใหม่) และ #3 (ตั้งชื่อ on-role) ต้องใช้ → **ควรเขียนก่อน หรือพร้อมกับ #1/#3**

---

## Workstream 3 on-\<role\> color pairs (ยืม Material 3)

### ปัญหาปัจจุบัน
Nation **มี on-brand อยู่บ้างแล้ว** แต่ไม่ครบ/ไม่เป็นระบบ:
- มี: `color.text.{primary,secondary,tertiary,quaternary}.on-brand`, `color.foreground.*.on-brand`, `color.icon.brand.on-brand-*`, `color.ams.on-brand` (เห็นใน `variables.css`)
- **ขาด:** on-pair สำหรับ surface อื่นที่ text ไปวางทับ โดยเฉพาะ **status surfaces**: `on-error`, `on-warning`, `on-success` (มี `background.system.error-solid` แต่ไม่มี text ที่การันตีว่าอ่านออกบนพื้นนั้น) · และ `on-brand-solid` (พื้น brand เข้ม)
- ผลคือ: เวลาวาง text บน `background.system.error-solid` (พื้นแดงเข้ม) คน/agent ต้อง **เดา** ว่าใช้ text ตัวไหน → เสี่ยง contrast fail โดยเฉพาะเมื่อสลับ light/dark

### ข้อเสนอ

**หลัก on-color (M3 material-3.md §1,§2, "สิ่งที่ควรเรียนรู้" ข้อ 1–2):**
> *"ทุก `color` มีคู่ `on-color` การันตี contrast (accessibility ในตัว)"* ทุก surface ที่ text ไปวางทับ ต้องมี on-pair สำเร็จ ไม่ต้องคำนวณเอง

**3a. เติม on-pair ให้ครบทุก surface หลัก** (นิยามในทั้ง light + dark ให้ค่าต่างกัน ต้องพึ่งผล #4):

| Surface (มีอยู่) | on-pair (เสนอเพิ่ม) | การันตี |
|---|---|---|
| `background.brand.solid` | `color.text.brand.on-brand-solid` *(มี on-brand แล้ว ทำให้ครบ solid)* | text บนพื้น brand เข้ม |
| `background.system.error-solid` | `color.text.system.on-error` | text บนพื้น error |
| `background.system.warning-solid` | `color.text.system.on-warning` | text บนพื้น warning |
| `background.system.success-solid` | `color.text.system.on-success` | text บนพื้น success |
| `background.system.overlay` | `color.text.system.on-overlay` | text บน overlay |
| `background.brand.section` | `color.text.brand.on-section` | text บน section header |

ตัวอย่าง (semantics-light + semantics-dark, ค่า reference ต่างกันต่อ mode):
```jsonc
// semantics-light-mode.json
"text": { "system": { "on-error": { "$type":"color", "$value":"{color.base.white-100}" } } }
// semantics-dark-mode.json role เดียวกัน ชื่อเดียวกัน ค่าอาจต่าง
"text": { "system": { "on-error": { "$type":"color", "$value":"{color.base.white-100}" } } }
```
→ ชื่อ token เดียว (`--ntg-color-text-system-on-error`) ค่าเปลี่ยนตาม selector ที่ #4 สร้าง

**3b. กฎการใช้ (เขียนลง design-system.md):**
> เมื่อวาง text/icon บน **solid surface ใดๆ** ต้องใช้ `on-<surface>` pair ที่จับคู่ไว้เท่านั้น ห้ามหยิบ text ทั่วไป (`text.primary.default`) ไปวางบนพื้นสี ตรงกฎ CLAUDE.md ที่ bind ผ่าน `component` collection (คู่ on-* ต้องมีตัวคู่ใน component ให้ bind)

**3c. (แนะนำต่อยอด) ตรวจ contrast ทุก on-pair** ให้ผ่าน WCAG 2.1 AA Carbon/BBC bake contrast ไว้ในชั้น token ตั้งแต่ต้น (carbon.md §6, bbc-gel.md §1 "token = เจตนา ตัดสิน contrast ล่วงหน้า"). ทำเป็น checklist ตอนกำหนดค่าแต่ละคู่

### Effort: **S–M**
- นิยาม ~6 on-pair × 2 mode + bind คู่ใน component + build = S–M · ตรวจ contrast AA = เพิ่มอีกนิด (แต่คุ้ม)

### Dependency
- **ต้องทำหลัง #4** (on-pair จะการันตี contrast "ทุกธีม" ได้ ต่อเมื่อ build แยก light/dark สำเร็จ ไม่งั้นได้ค่าเดียว)
- ใช้ taxonomy จาก **#2** ตั้งชื่อ (`on-<surface>` อยู่ท้ายสุดตามกฎ 2c)

---

## ลำดับแนะนำ + Quick wins

### ลำดับทำ (ตาม dependency)

```
เฟส 0 (ขนาน, เอกสาร)   → #2 Naming taxonomy  [S]  ── ไม่ block ใคร เป็นฐานชื่อของ #1/#3
เฟส 1 (โครงสร้าง)       → #4 แก้ collisions   [M]  ── ทำก่อนสุดฝั่งโค้ด, ปลดล็อก dark mode จริง
เฟส 2 (ขนานกันได้)      → #1 Typography roles [M]  ── ไม่พึ่ง #4 (Figma Styles)
                        → #3 on-role pairs   [S–M] ── พึ่งผล #4 + ชื่อจาก #2
```

**เหตุผลเริ่ม #4 ก่อน (ฝั่งโค้ด):** เป็นบั๊กโครงสร้างจริง (dark mode ยังไม่ทำงาน) และทุกงานที่เพิ่ม semantic token (#1 บาง preset, #3 on-pair ทั้งหมด) จะไป **เพิ่ม collision** ถ้าไม่แก้ก่อน แก้ที่หลังต้องทำซ้ำ

### Quick wins (เริ่มได้เลย ผลเร็ว)
1. **[#2] เขียน level-order + ตารางกฎ taxonomy** ลง `docs/` เอกสารล้วน ไม่แตะ build ไม่เสี่ยงพัง ได้มาตรฐานชื่อทันทีสำหรับทุกงานถัดไป
2. **[#4] แก้ `style-dictionary.config.mjs` เป็น build 2 mode** ไฟล์เดียว ผลชัด (`Token collisions detected` หายจาก 2042 → 0, ได้ dark mode ใช้จริง) เป็น win ที่วัดผลได้ทันที
3. **[#1] ประกาศกฎบทบาท Prompt=functional / Sarabun=editorial + preset-lock** ลง CLAUDE.md/design-system.md เอกสารล้วน ปิดช่องโหว่ agent compose ผิดตั้งแต่ตอนนี้ ก่อนสร้าง preset ใหม่ด้วยซ้ำ
4. **[#1] ทำ `_lead` ที่มีอยู่แล้วให้เป็น preset `article.lead` ทางการ** คอมโบมีอยู่แล้ว แค่ทำให้เป็น token/ชื่อทางการ

### หมายเหตุ pipeline (จาก CLAUDE.md/MEMORY)
- typography presets มาจาก **Figma Styles** ไม่ใช่ variables → preset ใหม่ใน #1 ต้องมี "คนใน Figma หรือ agent" สร้าง text style คู่กัน (รัน headless/CI ไม่ได้จน Enterprise)
- on-pair ใน #3 เป็น variables (semantics collection) → ต้องมีตัวคู่ใน `component` collection ให้ bind (กฎ CLAUDE.md)
- ทุกการแก้ token ปิดท้ายด้วย `npm run tokens:build` + ตรวจ `tokens/output/css/variables.css`

---

### ไฟล์ที่จะแตะ (เมื่อ user อนุมัติแต่ละ workstream)
- #4: `tokens/style-dictionary.config.mjs` (+ ผล `tokens/output/css/variables.css`)
- #1: `tokens/tokens.json/typography.json` + Figma text styles + CLAUDE.md/design-system.md (กฎ)
- #3: `tokens/tokens.json/semantics-light-mode.json` + `semantics-dark-mode.json` + `component.json` (bind) + Figma variables
- #2: `docs/` (เอกสาร taxonomy ไม่แตะ token เว้นแต่พบชื่อผิดลำดับ → follow-up แยก)
