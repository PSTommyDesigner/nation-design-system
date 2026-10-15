# Nation Design System Component Inventory & Token Needs (research)

> **สถานะ: DRAFT รอ review** เรียบเรียงจากความรู้ DS มาตรฐาน **Material 3 Ant Design IBM Carbon** + บริบท Nation (Thai news media, มี light/dark, brand + ams sub-brand)
> **จุดประสงค์:** เป็น input ให้ขั้น **สร้าง Variable (component-tier token)** ก่อนลงมือทำ component ทีละหน้าใน Figma
> แบ่งหัวข้อตามหน้าใน Figma (17 หมวด) แต่ละหมวดสรุป variant × size × state × anatomy parts → token ที่ต้องมี

---

## สารบัญ
1. [Pattern ตั้งชื่อ component token (ข้อเสนอ)](#0-pattern)
2. Buttons 
3. Dropdowns
4. Pagination
5. Input
6. Checkbox
7. Radio
8. Toggle/Switch
9. Slider
10. Tabs
11. Badge
12. Tags/Chips
13. Progress
14. Toasts/Banners/Alert
15. Tooltips
16. Modals
17. Avatar
18. Table
19. [สรุป gap เทียบ DS ปัจจุบัน](#gap)

---

<a name="0-pattern"></a>
## 0. Pattern ตั้งชื่อ component token (ข้อเสนอ ต่อยอด taxonomy §3.1)

ปัจจุบัน bind-layer ใช้ `color.<property>.general.<...>` (เช่น `color.background.general.primary`)
**ข้อเสนอ:** component token = แทน `general` ด้วย **ชื่อ component** → คงกลุ่ม property เดิม (background/text/border/icon) ที่โค้ด/Figma คุ้นอยู่แล้ว

```
color.<property>.<component>.<variant?>.<state?>
```
| ตัวอย่าง | CSS variable |
|---|---|
| `color.background.button.primary` | `--ntg-color-background-button-primary` |
| `color.background.button.primary.hover` | `--ntg-color-background-button-primary-hover` |
| `color.text.button.primary` | `--ntg-color-text-button-primary` |
| `color.border.input.error` | `--ntg-color-border-input-error` |
| `color.icon.tag.default` | `--ntg-color-icon-tag-default` |

- `<property>` = `background · text · border · icon · ring`(focus) · `effect`(shadow)
- `<component>` = `button · input · checkbox · radio · switch · slider · tab · badge · tag · progress · alert · tooltip · modal · avatar · table · …`
- `<variant>` = variant ของ component นั้น (primary/secondary/tertiary/ghost/danger · error/success · filled/outlined …)
- `<state>` = `default · hover · active · focus · disabled · selected` (ตาม taxonomy §2.2 ห้ามคิด state ใหม่เอง)
- **flow: component token → semantic token → primitive** (ห้าม ref primitive ตรง, ห้าม hex)

> เหตุผลเลือกแบบนี้: (1) consistent กับ property grouping เดิม (2) migration ง่าย `general.*` ที่มีอยู่คือ special case ของ pattern นี้ (3) CSS var อ่านออกทันทีว่าเป็นของ component ไหน

---

## 2. Buttons

- **Variants:** primary (filled/solid) · secondary (tonal/subtle) · tertiary (outlined/ghost) · link (text) · **destructive/danger** (× primary/secondary/tertiary) · icon-only · (option) elevated · brand vs **ams** variant
- **Sizes:** sm · md · lg · (xl) กระทบ padding/font/icon (size token ไม่ใช่ color)
- **States:** default · hover · active(pressed) · focus-visible · disabled · loading
- **Anatomy → token needs:**

| Part | property | ต้องมีต่อ (variant × state) | หมายเหตุ |
|---|---|---|---|
| container | background | primary/secondary/tertiary/danger × default/hover/active/disabled | tertiary/link พื้นโปร่ง (transparent/ subtle) |
| label | text | ทุก variant × default/disabled | primary = on-brand (ข้อความบนพื้นเข้ม) |
| icon | icon | ตาม text (มัก match label) | |
| border | border | secondary/tertiary(outlined) × default/hover/disabled | primary มักไม่มี border |
| focus ring | ring | ทุก variant (default focus color) | ใช้ brand ring ร่วมได้ |

- **M3/Ant/Carbon:** M3 มี 5 ชนิด (elevated/filled/tonal/outlined/text) · Ant = primary/default/dashed/text/link + danger flag · Carbon = primary/secondary/tertiary/ghost/danger **สรุป: 4-5 variant หลัก + danger + icon-only เพียงพอ**
- **Nation:** ต้องมี **brand + ams** (2 ชุด primary) เพราะมี sub-brand · news ใช้ปุ่มไม่ซับซ้อน ตัด elevated ได้

## 3. Dropdowns (menu / select)

- **Variants:** select (form field trigger) · menu (action list) · multi-select · with-search · grouped · with-icon/description
- **States:** trigger: default/hover/focus/disabled/**open** · option/item: default/hover/**selected**/disabled/focused(keyboard)
- **Anatomy → token needs:**

| Part | property | state |
|---|---|---|
| trigger field | background/border/text/icon(chevron) | default/hover/focus/disabled/open |
| menu surface | background border **shadow** | |
| option item | background text icon(check) | default/hover/selected/disabled |
| group header / divider | text border | |

- **Note:** menu surface ใช้ **shadow/elevation + background surface** ร่วมกับ Modal/Tooltip · option-selected ใช้ brand subtle bg

## 4. Pagination

- **Variants:** numbered · prev/next only · with-ellipsis · compact · with page-size select · (mini)
- **States:** page item: default/hover/**current(active)**/disabled · prev/next: default/hover/disabled
- **Anatomy → token needs:**

| Part | property | state |
|---|---|---|
| page item | background text border | default/hover/active(current)/disabled |
| prev/next control | background icon border | default/hover/disabled |

- **Note:** current page มัก highlight ด้วย brand (bg solid หรือ text brand) · เรียบ ใช้ token น้อย

---

## 5. Input (text field / textarea / select field)

- **Variants:** outlined · filled · underlined · textarea · search · with prefix/suffix (icon/text/addon) · with label/helper/counter
- **Sizes:** sm · md · lg
- **States:** default(enabled) · hover · **focus** · filled · disabled · read-only · **error(invalid)** · warning · success
- **Anatomy → token needs:**

| Part | property | state (เน้น error/focus/disabled) |
|---|---|---|
| field container | background | default/disabled/read-only |
| border | border | default/hover/focus/**error**/warning/success/disabled |
| input text | text | filled/disabled |
| placeholder | text (subtle) | default/disabled |
| label | text | default/error |
| helper / error text | text | default / **error** / warning / success |
| leading/trailing icon | icon | default/error/disabled |
| focus ring | ring | focus / error-focus |

- **M3/Ant/Carbon:** ทุกเจ้ามี error state เป็นแกนหลัก · Carbon เพิ่ม warning · **Nation มี semantic error/warning/success อยู่แล้ว → map ตรง**
- **Note:** input เป็น component ที่ **token เยอะ** เพราะ state validation (error/warning/success) × หลาย part

## 6. Checkbox

- **Variants:** single · group · **indeterminate** · with-label/description · (card/button-style)
- **States:** unchecked/checked/indeterminate × default/hover/focus/disabled + error(invalid)
- **Anatomy → token needs:**

| Part | property | state |
|---|---|---|
| box (control) | background | unchecked checked indeterminate × default/hover/disabled |
| box border | border | unchecked/hover/focus/error/disabled |
| checkmark / dash | icon (foreground) | checked/indeterminate/disabled |
| label | text | default/disabled |
| focus ring | ring | focus |

- **Note:** checked bg = brand solid · checkmark = on-brand (ขาว) · error border สำหรับ required

## 7. Radio

- **Variants:** standalone · group · with-label/description · button-style(segmented)
- **States:** unselected/selected × default/hover/focus/disabled + error
- **Anatomy → token needs:**

| Part | property | state |
|---|---|---|
| outer circle | background border | unselected/selected/hover/focus/disabled/error |
| inner dot | foreground/icon | selected/disabled |
| label | text | default/disabled |
| focus ring | ring | focus |

- **Note:** โครงเหมือน checkbox แต่ dot แทน checkmark · แชร์ token pattern กับ checkbox ได้ (พิจารณา alias ร่วม)

---

## 8. Toggle / Switch

- **Variants:** standalone · with-label · with-icon(in thumb) · sizes sm/md
- **States:** off/on(unchecked/checked) × default/hover/focus/disabled
- **Anatomy → token needs:**

| Part | property | state |
|---|---|---|
| track | background | off/on × default/hover/disabled |
| thumb/handle | background | off/on/disabled |
| icon (in thumb) | icon | on/off |
| focus ring | ring | focus |

- **Note:** on-track = brand solid · off-track = neutral (gray) · thumb มัก const-white

## 9. Slider

- **Variants:** single · range(2 thumb) · with ticks/steps · with value-label/tooltip · with input field · vertical
- **States:** default/hover/focus/**dragging**/disabled
- **Anatomy → token needs:**

| Part | property | state |
|---|---|---|
| track (inactive/rail) | background | default/disabled |
| track (active/fill) | background | default/hover/disabled |
| thumb/handle | background border | default/hover/dragging/focus/disabled |
| tick mark | background/foreground | active/inactive |
| value label/tooltip | background text | (แชร์กับ tooltip) |
| focus ring | ring | focus |

- **Note:** active track = brand · thumb = brand หรือ const-white + border

## 10. Tabs

- **Variants:** line(underline) · filled/pill · enclosed(folder) · horizontal/vertical · scrollable · with-icon · with-badge/count
- **States:** tab: unselected/**selected** × default/hover/focus/disabled
- **Anatomy → token needs:**

| Part | property | state |
|---|---|---|
| tab label | text | unselected/hover/**selected**/disabled |
| tab icon | icon | ตาม label |
| indicator (underline/pill) | background/border | selected |
| tab container | background | unselected/hover/selected (filled variant) |
| bottom divider | border | |
| badge/count | (แชร์กับ Badge) | |

- **Note:** selected = text brand + indicator brand · **สำคัญมากสำหรับ news** (category tabs) ดู code `CategoryTabs`

---

## 11. Badge

- **Variants:** dot · count(number) · status(label) · สี semantic (neutral/info/success/warning/error/brand) · บน avatar-icon (positioned)
- **States:** static (ไม่ interactive) variant ตามสีเป็นหลัก
- **Anatomy → token needs:**

| Part | property | ต่อ variant สี |
|---|---|---|
| background | background | neutral/info/success/warning/error/brand (× subtle/solid) |
| text/count | text | ตามพื้น (on-color) |
| dot | background | ตามสี semantic |
| border(ring บน avatar) | border | const-white/surface |

- **Note:** ใช้ **สี status เยอะ** (info/success/warning/error) × 2 tone (subtle bg / solid) map semantic ตรง

## 12. Tags / Chips

- **Variants:** filled · outlined · subtle · **removable(มี ×)** · with leading icon/avatar · **selectable/filter chip** · color variants (semantic + category colors) · input chip
- **States:** default/hover/active/**selected**/disabled · remove-icon: default/hover
- **Anatomy → token needs:**

| Part | property | state |
|---|---|---|
| background | background | filled/outlined/subtle × default/hover/selected/disabled |
| text | text | default/selected/disabled |
| border | border | outlined × default/hover/selected |
| leading icon/avatar | icon | |
| remove(×) icon | icon | default/hover |

- **Note:** **news = category tags เยอะ** อาจต้องชุดสีหลากหลาย (ผูก utility ramp) · filter chip selected = brand subtle

## 13. Progress

- **Variants:** linear(bar) · circular(ring/spinner) · determinate/indeterminate · with-label/percentage · sizes · สี status(success/warning/error)
- **States:** track vs indicator · (buffer)
- **Anatomy → token needs:**

| Part | property | variant |
|---|---|---|
| track / rail | background | default |
| indicator / fill | background | brand / success / warning / error |
| label / % text | text | default |

- **Note:** indicator ปกติ brand · variant status สำหรับ upload/validation

---

## 14. Toasts / Banners / Alert / Notification

- **Variants:** toast/snackbar (ลอย, ชั่วคราว) · inline alert/banner (ในหน้า) · global banner · สี semantic (info/success/warning/error/neutral) · with-action · with-close · with-icon
- **States:** container static · action-link + close: default/hover/focus
- **Anatomy → token needs:**

| Part | property | ต่อ variant สี (info/success/warning/error) |
|---|---|---|
| container | background | subtle bg ต่อสี semantic |
| accent border/bar | border | ต่อสี semantic |
| icon | icon | ต่อสี semantic |
| title | text | ต่อสี semantic (หรือ heading) |
| message | text | body |
| action link | text | brand/semantic × hover |
| close icon | icon | default/hover |
| (toast) shadow | effect | elevation |

- **Note:** แกนหลัก = **สี status container** 4 สี × (bg subtle / border / icon / text) → token เยอะ · map semantic system.* ตรง

## 15. Tooltips

- **Variants:** plain(text) · rich(title+body+action) · ทิศทาง(top/bottom/left/right) · with-arrow
- **States:** static (show/hide)
- **Anatomy → token needs:**

| Part | property |
|---|---|
| container | background (มัก inverse/เข้ม) |
| text | text (on-inverse) |
| arrow | background (match container) |
| (rich) shadow | effect |

- **Note:** tooltip มัก **inverse** (พื้นเข้ม text สว่าง) อาจต้อง semantic `background/inverse` + `text/on-inverse` (เช็คว่ามีไหม)

## 16. Modals (dialog / drawer)

- **Variants:** dialog(center) · alert-dialog · fullscreen · **drawer/side-sheet** (left/right/bottom) · sizes sm/md/lg/xl
- **States:** overlay open/close · interactive parts (close/action) hover/focus
- **Anatomy → token needs:**

| Part | property |
|---|---|
| scrim / overlay | background (alpha black) |
| surface | background (elevated surface) |
| header title | text (heading) |
| body text | text |
| divider (header/footer) | border |
| close icon | icon default/hover |
| shadow/elevation | effect |
| footer bg (ถ้ามี) | background |

- **Note:** ใช้ **overlay(background/alpha) + surface + shadow** Nation มี `background/alpha/black-*` + `effect/shadows` อยู่แล้ว → map ตรง

---

## 17. Avatar

- **Variants:** image · initials · icon(placeholder) · shape circle/square · sizes xs–xl · **group/stacked** · with status-badge · with ring
- **States:** static
- **Anatomy → token needs:**

| Part | property |
|---|---|
| background (initials/placeholder) | background (neutral หรือ color-by-name) |
| initials text | text (on-color) |
| ring/border | border (const-white บนกลุ่ม stacked) |
| status dot | (แชร์กับ Badge) |

- **Note:** token น้อย · placeholder bg อาจใช้ utility ramp (color-by-name)

## 18. Table (data table)

> **token เยอะสุด** Nation มีระบบ table อยู่แล้วที่หน้า Table (เลขปัจจุบัน 26) (`table-cell/*`, `color-cell/*`) งานวิจัยนี้ใช้เช็คความครบ

- **Variants:** default · striped(zebra) · bordered · density compact/default/comfortable · sortable · selectable(checkbox) · expandable-row · sticky-header · with-pagination · inline-action · sticky-column
- **Cell types:** text · number · badge · tag · avatar+name · link · icon · action(⋮) · progress · (color swatch)
- **States:** row: default/**hover**/**selected**/active/disabled · header: default/sort-active · zebra stripe
- **Anatomy → token needs:**

| Part | property | state |
|---|---|---|
| header cell | background | default |
| header text | text | default |
| sort icon | icon | inactive/active |
| row | background | default/**hover**/**selected**/striped |
| row divider | border | |
| cell text | text | default/secondary |
| cell border(bordered) | border | |
| checkbox (select) | (แชร์กับ Checkbox) | |
| footer/pagination | (แชร์กับ Pagination) | |

- **Carbon note:** data table ละเอียดสุด (density, sticky, expandable, batch-action toolbar) ใช้เป็น reference หลัก
- **Nation:** เทียบกับ `table-cell/*` เดิม → เช็คว่ามี row-hover/row-selected/sort-active ครบไหม

---

<a name="gap"></a>
## 19. สรุป gap เทียบ DS ปัจจุบัน + ทิศทาง token

**สิ่งที่ semantic tier ปัจจุบันรองรับดีแล้ว (component ref ได้ตรง):**
- สี status `system.{error,warning,success}` (× default/hover/alt) → ใช้กับ Input/Badge/Alert/Progress/Toast
- `background/brand.*`, `background/ams.*` (solid/primary/secondary + hover) → ปุ่ม/toggle/tab selected
- `background/alpha/black-*` → modal overlay/scrim
- `effect/shadows/*` → modal/dropdown/tooltip elevation
- `text/foreground/icon.general.*` → label/icon ทั่วไป

**สิ่งที่อาจ "ขาด" ในระดับ semantic (ต้อง flag ก่อนสร้าง component token):**
- `background/inverse` + `text/on-inverse` สำหรับ **Tooltip** (พื้นเข้ม) *ต้องเช็ค/อาจเพิ่ม*
- `ring/focus` color เฉพาะ สำหรับ focus-visible ทุก component *เช็คว่ามี border/focus ไหม*
- ชุดสี **category tags** หลากสี (news) อาจ map จาก utility ramp
- state **`focus`** (taxonomy §2.2 ยังไม่มี `focus` ใน lock list มีแค่ default/hover/active/disabled/selected) → **ต้องถามก่อนเพิ่ม state `focus`**

**Component ที่แชร์ token pattern ได้ (ทำ alias ลดจำนวน):**
- Checkbox ↔ Radio (box/dot + label + ring)
- Badge ↔ Avatar status-dot ↔ Tabs count
- Modal ↔ Dropdown ↔ Tooltip (surface + shadow + overlay)
- Table footer ↔ Pagination · Table select ↔ Checkbox

**ลำดับแนะนำสร้าง (ทีละหน้า Figma):**
1. **Button** (pattern ต้นแบบ + brand/ams variant) → 2. **Input** (validation states ครบ) → 3. **Checkbox/Radio** (แชร์) → 4. **Badge/Tag** (สี status) → 5. Toggle/Slider/Tabs → 6. Alert/Toast/Tooltip/Modal (surface+overlay) → 7. Avatar → 8. Table (ประกอบจากของเดิมหน้า 27) → 9. Dropdown/Pagination (ประกอบ)

---

## ⚠️ Open questions (รอ decision ก่อนสร้าง variable)
1. **ยืนยัน pattern** `color.<property>.<component>.<variant>.<state>` (§0) ไหม? หรืออยากได้ component-first (`component.button.*`)?
2. **state `focus`** จะเพิ่มเข้า lock list ไหม (จำเป็นสำหรับ focus-ring ทุก component)?
3. **`background/inverse` + `text/on-inverse`** สำหรับ tooltip สร้าง semantic เพิ่มไหม?
4. **brand vs ams** ปุ่ม/component หลักต้องมีครบ 2 ชุดทุกตัว หรือเฉพาะบางตัว?
5. **Category tag colors** (news) ทำชุดสีเฉพาะ หรือใช้ utility ramp?
6. เก็บ `general.*` เดิมไว้เป็น fallback/utility ควบคู่ component token ไหม?
