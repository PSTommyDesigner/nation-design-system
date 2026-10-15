# Nation Design System Token Naming Taxonomy (ntgds)

> **Single source of truth** สำหรับการตั้งชื่อ design token ของ Nation Group Design System
> เอกสารทางการ อ่านแล้วตั้งชื่อ token ใหม่ได้ทันที อัปเดต 2026-07-10
> ที่มา: ขยายจาก `docs/research/design-systems/_ntgds-recommendations.md` (workstream #2) → เอกสารเต็ม
> ตรวจสอบกับ token จริงใน `tokens/output/css/variables.css` (1,243 ตัว) + `typography.css` (28 classes)

---

## 1. หลักการ

### 1.1 กรอบอ้างอิง Nathan Curtis (curated subset)
ยึดโมเดล **"Naming Tokens in Design Systems" ของ Nathan Curtis** (EightShapes, 2020) ที่วางชื่อ token เป็นลำดับ level อ่านจากกว้างไปแคบ:

```
[namespace] . [object/base] . [property] . [concept/role] . [variant] . [state] . [scale] . [mode]
```

Nation **ไม่ใช้ครบทุก level** (maximal) ใช้ **curated subset** เท่าที่ระบบจริงต้องการ เพื่อชื่อสั้น อ่านออก และไม่ over-engineer:

**Level order ทางการของ Nation:**

```
ntg . category . property . role . prominence . state
```

> ต่อจากนี้เรียกว่า **"6-level order"** ทุก token ต้องเรียง level ตามนี้เสมอ (ข้าม level ที่ไม่มีได้ แต่ห้ามสลับลำดับ)

### 1.2 Tier 3 ชั้น (bind flow บังคับ)
อ้างอิง Material 3 (`ref → sys → comp`) + กฎ CLAUDE.md:

| Tier | ความหมาย | collection (ไฟล์) | ตัวอย่าง | ใครอ้างได้ |
|---|---|---|---|---|
| **base** (primitive / ref) | ค่าดิบ ramp สี/ขนาด/ฟอนต์ ไม่มีความหมายเชิงใช้งาน | `primitive.json` | `color.brand.500`, `size.icon.md`, `typography.font-size.h1` | **semantic เท่านั้น** (โค้ด/ดีไซน์ห้ามอ้างตรง) |
| **semantic** (sys / alias) | ผูกความหมาย (role) เข้ากับ base มี light/dark | `semantics-light-mode.json`, `semantics-dark-mode.json` | `color.text.primary.default`, `color.background.brand.solid.hover` | **component เท่านั้น** |
| **component** (bind layer) | ชั้นที่ code + Figma bind จริง | `component.json` | `color.text.general.heading`, `color.background.general.primary` | **โค้ด + Figma bind ที่นี่เท่านั้น** (กฎ CLAUDE.md) |

**กฎ bind ที่บังคับ (จาก CLAUDE.md):**
- ค้นหา variable ได้ทุก collection (เพื่อเข้าใจ) แต่ **การใช้งานจริง (bind) ใช้จาก collection `component` เท่านั้น**
- **ห้ามใช้สีดิบ (hex)** · ต้องผูก variable เสมอ
- flow: `component → semantic → base` (component ห้ามอ้าง base ตรง, base ห้ามรู้จัก role)

### 1.3 กฎพื้นฐานการเขียนชื่อ
- **ตัวเล็กทั้งหมด** + คั่นด้วย `-` (kebab-case) · ตรง naming convention layer ใน CLAUDE.md
- prefix CSS variable = `--ntg-` (namespace), path คั่นด้วย `-` → `color.text.primary.default` = `--ntg-color-text-primary-default`
- **mode (light/dark) ไม่อยู่ในชื่อ token** → จัดการที่ชั้น build/selector (ดู §2.3 + workstream #4)

---

## 2. Level Order ทางการ

### 2.1 ตารางแต่ละ level

| # | Level | ความหมาย | required? | ค่าที่อนุญาต (enumerate จาก token จริง) |
|---|---|---|---|---|
| 1 | **namespace** | เจ้าของระบบ | **required** | `ntg` (ตายตัว Nation Group Thailand แบรนด์ในเครือใช้ตัวย่อ 3 ตัว ดู [brand-codes.md](../brand-codes.md)) |
| 2 | **category** | ชนิด token ระดับบนสุด | **required** | `color` `typography` `size` `shadows` `effect` *(+ config exception: `device`, `scale`, `root-font-size` ดู §5)* |
| 3 | **property** | มิติที่ token ควบคุม | required (color/size/typography) | **color:** `text` `background` `border` `foreground` `icon` `effect` `alpha` `utility` *(component/semantic)* / ramp-family `base` `gray-light` `gray-dark` `brand` `ams` `pink` `bamboo` `green` `cyan` `blue` `purple` `rose` `red` `orange` `yellow` `gold` `fuchsia` `other` *(base tier)* <br>**size:** `space` `radius` `stroke` `icon` `effect` <br>**typography:** `font-size` `font-family` `font-weight` `line-height` `letter-space` |
| 4 | **role / concept** | บทบาทเชิงความหมาย | optional | `general` `brand` `system` `ams` `primary` `secondary` `tertiary` `quaternary` `quinary` `senary` `error` `warning` `success` color-family (`gray`, `blue`, …ใน utility) |
| 5 | **prominence / variant** | ระดับความเด่น / variant ย่อย | optional | `primary` `secondary` `tertiary` `solid` `default` `alt` `section` `subtle` `on-brand` `on-brand-solid` `on-<surface>` (typography: `bold` `regular`) |
| 6 | **state** | สถานะ interactive | optional | `default` `hover` `active` `disabled` `selected` *(+ compound: `alt-hover`, `solid-hover`)* |

> **หมายเหตุ level 4–5:** ในระบบจริง role กับ prominence บางครั้งยุบรวมกัน (เช่น `text.primary.default` `primary` = role, `default` = state) การจับ level ให้ยึด **ลำดับ modifier (§2.4)** เป็นตัวตัดสิน ไม่ต้องบังคับว่าทุก token มีครบ 6 ช่อง

### 2.2 State ค่ามาตรฐาน (lock)
ค่า state ที่อนุญาตในระบบ (ยืม Fluent/Polaris state-in-name):

```
default · hover · active · disabled · selected
```
- compound state ที่พบและอนุญาต: `alt-hover`, `solid-hover`, `primary-alt-hover` · state ต่อท้าย variant ตามกฎลำดับ §2.4
- **ห้ามคิดค่า state ใหม่เอง** (เช่น `pressed`, `focus`) → ถามก่อนเพิ่ม

### 2.3 mode (light/dark) ไม่อยู่ในชื่อ ← สำคัญ
- semantic token ตัวเดียว (เช่น `color.text.primary.default`) มี **2 ค่า** ใน `semantics-light-mode.json` และ `semantics-dark-mode.json` · **ชื่อ path เดียวกันเป๊ะ**
- mode **ไม่เข้าไปในชื่อ** → build ต้องแยกออกเป็น selector (`:root` = light, `:root[data-theme="dark"]` = dark)
- **โยงกับ workstream #4** (แก้ collision 2042) · ตราบใดที่ build ยังไม่แยก mode ชื่อซ้ำจะชนกัน อ้างอิง Material 3 / NYT / Carbon: *"สลับธีมโดยไม่แตะชื่อ role"*
- ผล: consumer อ้าง `--ntg-color-text-primary-default` ตัวเดียว ค่าเปลี่ยนตาม scope

### 2.4 กฎลำดับ modifier (lock)
เรียงเสมอ: **`role → concept → prominence/variant → state`**

```
error-solid-hover   ✅   (concept=error, variant=solid, state=hover)
hover-error-solid   ❌   (state มาก่อน · ผิด)
solid-error-hover   ❌   (variant สลับ concept · ผิด)
```
- `on-<surface>` (color pairing) = **อยู่ท้ายสุดเสมอ** (`text.primary.on-brand` ไม่ใช่ `text.on-brand-primary`)

---

## 3. Pattern ต่อชนิด token

### 3.1 Color
```
ntg.color.<property>.<role>.<prominence?>.<state?>
```
| Property | levels ที่ใช้ | template | ตัวอย่างจริง |
|---|---|---|---|
| text | property.role.prominence.state | `color.text.<role>.<prominence>.<state>` | `color.text.primary.default` `color.text.brand.primary.hover` `color.text.system.error` |
| background | property.role.variant.state | `color.background.<role>.<variant>.<state>` | `color.background.brand.solid.hover` `color.background.system.error.solid` |
| border | property.role.concept.variant.state | `color.border.<role>.<concept>.<variant>.<state>` | `color.border.system.error.solid-hover` `color.border.brand.default` |
| foreground / icon | property.role.prominence.state | `color.icon.<role>.<prominence>.<state>` | `color.icon.brand.primary.hover` `color.foreground.system.success.primary` |
| color pairing | ...role.**on-\<surface\>** | `color.text.<role>.on-<surface>` | `color.text.primary.on-brand` |
| base ramp | property(family).step | `color.<family>.<step>` | `color.brand.500` `color.gray-dark-50` `color.alpha.brand.30` |

### 3.2 Typography
มี 2 หน้า: **variable atoms** (primitive) และ **preset classes** (Figma Styles → `.ntg-typography-*`)

```
atom  : ntg.typography.<property>.<scale>
preset: ntg.typography.<role>.<scale>[-<weight>]
```
| แบบ | template | ตัวอย่างจริง |
|---|---|---|
| atom (font-size/line-height/…) | `typography.font-size.<scale>` | `typography.font-size.h1` `typography.line-height.text-md` `typography.font-weight.bold` |
| preset class | `.ntg-typography.<role>.<scale>-<weight>` | `.ntg-typography-heading-h1-bold` `.ntg-typography-text-sm-regular` `.ntg-typography-article-lg-bold` |
| role ที่อนุญาต (preset) | | `heading` `text` `article` (+ presets ใหม่จาก workstream #1: `label`, `byline`, `timestamp`, `caption`, `overline`, `pullquote`, `quote`, `lead`) |
| weight | | `bold` (600) `regular` (400) |

> **กฎ preset-lock (workstream #1):** ห้ามใส่ชื่อ family (`prompt`/`sarabun`) ในชื่อ preset ห้าม compose family+size+weight เอง → ใช้ preset ที่ประกาศไว้เท่านั้น

### 3.3 Size (space / radius / stroke / icon / effect)
```
nation.size.<property>.<scale>
```
| Property | scale ที่อนุญาต | ตัวอย่างจริง |
|---|---|---|
| space | `no` `xs-xs`…`xl-xl` (compound tier-step, 4px grid) | `size.space.sm-md` (16px) `size.space.lg-sm` (40px) |
| radius | **ไม่มีในชั้น `size.*`** radius เป็น token ระดับ component เท่านั้น (ดู §3.3.1) | `card.radius.top-left` (4px) `tag.radius.full` (9999px) |
| stroke | `none` `thin` `medium` | `size.stroke.thin` (1px) |
| icon | `xs` `sm` `md` `lg` `xl` `2xl` | `size.icon.md` (20px) |
| effect | `position-N` `blur-N` `spread-N` (N=px) | `size.effect.blur-16` `size.effect.position-0` |

> ใช้ **T-shirt scale หรือตัวเลข grid ที่มีอยู่เท่านั้น** ห้ามใช้ชื่อความหมายลอย (`medium`, `large` แบบไม่มีในระบบ)

#### 3.3.1 radius โค้ดเป็นคนตัดสิน Figma มีชั้นเดียว (ตัดสิน 2026-08-20)

**กติกาสั้นที่สุด** ค่าที่เป็นตัวเลข (ขนาด ระยะห่าง มุมโค้ง) **โค้ดเป็นคนตัดสินโดยคำนวณจากสเกล** Figma เป็นผลลัพธ์ **ตัวแปรที่ผูกกับชิ้นงานได้มีชั้นเดียวคือระดับ component**

| ชั้น | อยู่ที่ไหน | กลายเป็นตัวแปรใน Figma ไหม | ตัวอย่าง |
|---|---|---|---|
| 1. สเกลกลาง | `tokens/scale/global-scale.config.mjs` → `RADIUS_SCALE` | **ไม่** เป็น input ของสูตรเท่านั้น | `none 0 xs 2 sm 4 md 8 lg 12 xl 16 full 9999` |
| 2. การเลือกและสูตร | `tokens/scale/<component>.mjs` | **ไม่** | การ์ดเลือก `sm` ปุ่มใช้สูตร `base 6 step 1` |
| 3. ค่าที่ใช้จริง | `component.json` → CSS + Figma collection `component` | **ใช่ ชั้นนี้ชั้นเดียว** | `card/radius/top-left` = 4 `tag/radius/full` = 9999 |

**รูปแบบชื่อชั้น 3**

```
<component>/radius/<มุม>            ค่าคงที่      เช่น card/radius/top-left · input/radius/bottom-right
<component>/radius/<มุม>/<ขนาด>     ผันตามขนาด   เช่น button/radius/top-left/md
<component>/radius/full             ทรงแคปซูล    เช่น tag/radius/full · badge/radius/full
```

**ทำไมถึงจัดแบบนี้ เหตุผล 4 ข้อ**

1. **ระบบสเกลของโปรเจกต์เป็นแบบนี้อยู่แล้ว** ความสูงและระยะห่างของปุ่มคำนวณจากสูตรในโค้ดมาก่อนหน้านี้ radius เป็นตัวสุดท้ายที่ยังพิมพ์ค่าตายไว้ใน Figma การดึงเข้าระบบเดียวกันทำให้ไม่ต้องมีโมเดลที่สอง
2. **ชั้นกลางที่ไม่มีคนใช้จะตายและพาของอื่นตายด้วย** ไฟล์นี้เคยมีสเกลกลางใน Figma อย่างน้อย 2 รุ่น (`Shape/Btn/*` `Shape/Txf/*` และ `size/radius/*`) ทั้งสองรุ่นถูกลบทิ้ง เหลือ **3,467 จุดที่ผูกกับตัวแปรที่ไม่มีอยู่แล้ว** ค่ายังแสดงผลได้แต่แก้ที่ไหนก็ไม่ขยับ (สำรวจ 2026-08-20 · หน้า 21 Tags 2,686 จุด · 22 Badge 700 · 13 Input 81)
3. **ชื่อ t-shirt ชนกับความหมายที่มีอยู่แล้ว** `xs..xl` ถูกใช้เป็น **ขนาดของ component** (`SIZES`) ถ้า radius ใช้ชื่อชุดเดียวกันจะได้ประโยคที่อ่านไม่รู้เรื่อง เช่นปุ่ม `size=xs` มีมุมโค้ง 6px ซึ่งไม่ใช่ `radius.xs` · เป็นความผิดพลาดเดียวกับที่ทำให้เอกสารกับโค้ดของ Fluent 2 ขัดกันเอง (ดู [research/shape-radius.md](../research/shape-radius.md) §16.2)
4. **แก้จุดเดียวไม่กระทบตัวอื่น** แก้สูตรของปุ่มกระทบเฉพาะปุ่ม · แก้ขั้นที่การ์ดเลือกกระทบเฉพาะการ์ด · แก้ `RADIUS_SCALE` กระทบทุกตัวที่ชี้ค่านั้นพร้อมกัน ซึ่งเป็นช่องทางสำหรับ multi-brand ในอนาคต

**กติกาบังคับ**

| # | กติกา | เหตุผล |
|---|---|---|
| 1 | ค่าคงที่ทุกค่าต้องหยิบจาก `RADIUS_SCALE` ห้ามพิมพ์ตัวเลขลงไฟล์ component | ถ้าพิมพ์เองได้ ระบบจะกลับไปเป็นตัวเลขกระจัดกระจายที่ตรวจสอบไม่ได้ |
| 2 | ค่าที่เป็นผลจากสูตร (7, 9, 10 ของปุ่ม) **ไม่ต้องมีในสเกล** | เป็นผลลัพธ์ ไม่ใช่การตัดสินใจ โมเดลเดียวกับ `space.<comp>.*` |
| 3 | ห้ามสร้างตัวแปร radius ชั้น 1 หรือ 2 ใน Figma | จะกลายเป็นตัวแปรที่ไม่มีชิ้นงานผูก แล้วถูกลบทิ้งซ้ำรอยเดิม |
| 4 | component ใหม่ = เพิ่ม 1 บรรทัดในไฟล์ของมัน ไม่ใช่สร้างระบบสเกลใหม่ | กัน scale file บานตาม component |
| 5 | ของที่ต่างกันเพราะ **ทรง** (แคปซูล เหลี่ยม) เพิ่มเป็นตัวแปรเดียวต่อทรง ไม่ต้องแตกตามขนาด | ทรงแคปซูลไม่ผันตามขนาด แตกไปก็ได้ค่าเดียวกันทุกตัว |
| 6 | ห้าม rename ชื่อชั้น 3 ที่ปล่อยไปแล้ว | ชิ้นงานใน Figma ผูกด้วย id ก็จริง แต่การเปลี่ยนโครงชื่อทำให้ export กับโค้ดหลุดจากกัน |
| 7 | **กล่องซ้อนกล่อง กรอบนอก = กล่องใน + 8** | ระยะขอบมาตรฐานระหว่างกล่องซ้อนคือ 8 ถ้าคำนวณแล้วติดลบให้ใช้ 0 ยกเว้นกรณีชิดขอบที่ไม่มีระยะขอบ กล่องในต้องเท่ากรอบนอก (ดู [06-shape.md](../06-shape.md) §4.4) |

### 3.4 Shadow
```
nation.shadows.<direction>.<scale>
```
- direction: `center` · `bottom` · `top`
- scale: `xs` · `sm` · `md` · `lg` · `xl`
- ตัวอย่าง: `shadows.bottom.md` · `shadows.center.xl`

### 3.5 Effect (blur / focused-ring)
```
nation.effect.<property>.<scale>
```
- ตัวอย่าง: `effect.background-blur-md` (16px) · `effect.brand-focused-ring` (composite)

---

## 4. ตัวอย่าง ✅ ถูก / ❌ ผิด

| ✅ ถูก | ❌ ผิด | เหตุผล |
|---|---|---|
| `color.text.primary.default` | `color.text.default.primary` | สลับ role ↔ state |
| `color.background.brand.solid.hover` | `color.background.hover.brand.solid` | state มาก่อน role (ผิด §2.4) |
| `color.background.brand.solid.hover` | `color.bg.brand.solid.hover` | ย่อ property (`bg`) property ต้องเต็ม |
| `color.border.system.error.solid-hover` | `color.border.error.system.solid-hover` | role/concept สลับ (`system` = role, `error` = concept) |
| `color.text.primary.on-brand` | `color.text.on-brand.primary` | `on-<surface>` ต้องท้ายสุด (§2.4) |
| `color.text.system.on-error` | `color.on-error.text.system` | pairing ผิดตำแหน่ง / category ผิด |
| `typography.label.md` | `typography.md.label` | สลับ role ↔ scale |
| `typography.heading.h1-bold` | `typography.prompt.h1-bold` | ห้ามใส่ family (`prompt`) ในชื่อ preset |
| `size.space.sm-md` | `spacing.medium` | ต้อง `size.space` + scale ที่มีจริง (ไม่ใช่ `spacing`/`medium`) |
| `size.icon.md` | `icon.20px` | ต้องมี `size` category + ใช้ชื่อ scale ไม่ใช่ค่า px |
| `color.brand.500` (base) | `color.brand.primary.500` | base ramp ไม่มี role family.step เท่านั้น |
| `color.utility.brand.brand-700-alt` | `color.utility.brand.brand700alt` | ต้องมี `-` คั่น step และ variant (ดู §5) |

**map ตัวอย่างจริงเข้า level:**
```
--ntg-color-text-primary-on-brand
  nation | color    | text     | primary | (prominence:-) | on-brand
  ns     | category | property | role    |                | pairing(state)

--ntg-color-background-system-error-solid-hover
  nation | color | background | system | error   | solid    | hover
         |       | property   | role   | concept | variant  | state
```

---

## 5. Audit ผลจริง (ยังไม่ rename flag เท่านั้น)

ตรวจ `variables.css` (1,243 custom properties) + `typography.css` (28 classes)

**สรุป conformance:**

| สถานะ | จำนวน | หมายเหตุ |
|---|---|---|
| **Conform** taxonomy | **1,236** | ~99.4% ของ token เข้ากับ 6-level order โดยไม่ต้อง rename |
| **Hard defect** (ต้องแก้) | **3** | typo / hyphen หลุด ดูตารางล่าง |
| **Structural exception** (documented) | **4** | config token ไม่มี category ยอมรับได้ ระบุเป็นข้อยกเว้น |

**เพิ่มเติม (ไม่นับเป็น non-conform แต่ flag ไว้):**
- **Composite-value output bug (20 ตัว):** `shadows.*` (15) + `effect.*-focused-ring` (5) render เป็น `[object Object]` ใน CSS · **ชื่อถูก แต่ค่าพัง** (ปัญหา Style Dictionary format ไม่ใช่ naming) → แยกเป็น follow-up
- **Cosmetic redundancy (266 ตัว):** `color.utility.<family>.<family>-<step>` (146) + `color.background.utility.<family>.u-<family>-<step>` (120) เช่น `utility-gray-gray-50`, `background-utility-gray-u-gray-400` · segment ซ้ำ (`gray-gray`, `u-gray`) มาจากโครง Figma collection `utility/gray/gray-50` **conform ตาม level** (property=utility, role=family, scale) แต่อ่านซ้ำ → low priority, ไม่ rename ในรอบนี้

### ตารางข้อบกพร่องที่ต้องแก้ (hard defect)

| token (ปัจจุบัน) | บรรทัด | ปัญหา | ควรเป็น |
|---|---|---|---|
| `--ntg-color-utility-brand-brand700alt` | 840 | hyphen หลุด (`700alt`) ไม่ตรงพี่น้อง `brand-600-alt` | `--ntg-color-utility-brand-brand-700-alt` |
| `--ntg-color-utility-ams-ams-700alt` | 956 | hyphen หลุดก่อน `alt` (`700alt`) | `--ntg-color-utility-ams-ams-700-alt` |
| `--ntg-color-icon-system-success-primar-alt-hover` | 1237 | typo `primar` (ตกตัว `y`) | `--ntg-color-icon-system-success-primary-alt-hover` |

> ทั้ง 3 ตัวมาจากชื่อ variable ใน Figma → แก้ต้องแก้ที่ Figma variables + rebuild (follow-up แยก ตามกฎ ask-first)

### ตารางข้อยกเว้นเชิงโครงสร้าง (structural exception)

| token | บรรทัด | ทำไมยกเว้น |
|---|---|---|
| `--ntg-device-{จอ}-device-width` | config/responsive token แยกต่อจอ (desktop 1440 tablet 768 mobile 375) |
| `--ntg-device-{จอ}-scale` | ตัวคูณขนาดต่อจอ (desktop 1 tablet 1 mobile 1.25) |
| `--ntg-device-{จอ}-root-font-size` | ขนาดตัวอักษรฐานต่อจอ |

> ยกเว้นได้เพราะเป็น **build/responsive config** ไม่ใช่ design value ที่ผูก UI ให้คงชื่อ flat ระดับ `nation.<property>` (มาจาก `*-responsive.json`)

---

## 6. Checklist ก่อนตั้งชื่อ token ใหม่ (คน/AI agent ต้องผ่านทุกข้อ)

ก่อนเพิ่ม token ใหม่ ต้องผ่าน **7 ข้อ** นี้:

1. **Tier ถูกไหม?** · token นี้เป็น base / semantic / component? → เขียนลงไฟล์ collection ให้ตรง (`primitive.json` / `semantics-*.json` / `component.json`) และ bind ตาม flow `component → semantic → base`
2. **Category + property ถูกไหม?** · ขึ้นต้นด้วย `nation.<category>.<property>` ที่อยู่ในรายการอนุญาต (§2.1) · ไม่ย่อ (`bg`❌ `background`✅) · ไม่คิด property ใหม่เอง
3. **Level เรียงถูกไหม?** · ตาม 6-level order `namespace.category.property.role.prominence.state` · ลำดับ modifier `role→concept→variant→state` (§2.4)
4. **State อยู่ในชุดมาตรฐานไหม?** · `default·hover·active·disabled·selected` เท่านั้น (§2.2) · `on-<surface>` ท้ายสุด
5. **mode อยู่นอกชื่อไหม?** · ถ้าเป็น semantic ที่มี light/dark → **ชื่อเดียว** เขียนทั้ง `semantics-light` + `semantics-dark` ค่าต่างได้ (§2.3) · ห้ามใส่ `-light`/`-dark` ในชื่อ
6. **kebab-case + hyphen ครบไหม?** · ตัวเล็กล้วน · มี `-` คั่นทุก segment (ระวัง `700alt`→`700-alt`) · ไม่มี hex ดิบ (ต้อง bind variable)
7. **มีของเดิมอยู่แล้วไหม?** · ค้นทุก collection ก่อน · **ถ้าไม่มีตัวที่ตรงจริง → ถามก่อนสร้าง** (กฎ ask-first, CLAUDE.md) ห้ามสร้างเอง

หลังเพิ่ม: `npm run tokens:build` → ตรวจ `variables.css` ว่าชื่อออกตาม taxonomy + ไม่มี `[object Object]` / hex หลงเหลือ

---

### อ้างอิง
- Nathan Curtis, *"Naming Tokens in Design Systems"* (EightShapes, 2020) · level-order framework
- `docs/research/design-systems/_ntgds-recommendations.md` §workstream #2, #4 · ที่มา + mode/collision
- Material 3 (`ref→sys→comp`) · NYT / Carbon (mode = build layer) · Fluent / Polaris (state-in-name)
