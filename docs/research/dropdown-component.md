# วิจัย Dropdown และ Select (รายการแบบเลื่อนลง) สำหรับหน้า 25

> สำรวจ 2026-10-12 อ่านจากโค้ดต้นทางที่แต่ละเจ้าส่งออกจริง เทียบ 10 เจ้า
> แบ่งทำสองชุดขนานกัน รายละเอียดรายเจ้าอยู่ในหัวข้อ 4 และ 5

## 1. สรุปคำตอบ อ่านหน้าเดียวจบ

| กลุ่ม | คำตอบสั้นจากข้อมูลจริง |
|---|---|
| **ความสูงช่อง** | **5 ใน 10 เจ้าล็อกบนชุด 24 / 32 / 40 / 48 ซึ่งตรงกับสูตรความสูงกลางของเรา (base 24 step 8) พอดี** คือ Carbon, Spectrum, Fluent, Ant และ Primer (Primer มีชุดเต็ม 24/28/32/40/48) ส่วน Material ไปทาง 40 / 56 เพราะอิงความสูงช่องกรอก · Atlassian 32 / 40 · Mantine 30 / 36 / 42 / 50 / 60 · Untitled UI 36 / 40 / 44 **ของเดิมเราคือ 44 ค่าเดียว ซึ่งไม่ตรงกับเจ้าไหนเลยสักเจ้า** |
| **ระยะช่องถึงแผง** | **4 คือค่าที่พบมากที่สุด** (Carbon, Ant, Primer, Untitled UI) รองลงมาคือ 8 (Mantine, Zag, Atlassian) ส่วน Material กับ Fluent ใช้ 0 **ของเราคือ 8 อยู่ในช่วงที่ตลาดใช้** |
| **ความสูงแผง** | ตรึงเป็นพิกเซลเกือบทุกเจ้า Carbon = ความสูงช่องคูณ 5.5 (md ได้ 220 เจตนาให้ขอบแถวที่ 6 โผล่ครึ่งหนึ่งเพื่อบอกว่ายังเลื่อนได้) · Atlassian 300 · Ant 256 · Mantine 220 · Untitled UI 224 / 256 / 320 ตามขนาด · Fluent 80vh · Material 40vh · Spectrum กับ Primer ไม่ตรึง **ของเราคือ 320** |
| **ความสูงแถว** | **Carbon กับ Spectrum ให้เท่าความสูงช่องทุกขั้น** ซึ่งตรวจง่ายที่สุด · Primer 28 / 32 / 40 · Untitled UI 36 / 40 / 44 · Ant 32 · Material 36 บนจอใหญ่ 48 บนจอเล็ก · Fluent, Atlassian และ Mantine ไม่ตรึง ใช้ระยะขอบแทน |
| **เกณฑ์เลือกใช้** | **Carbon ชัดที่สุด ว่าถ้ามี 2 ตัวเลือกห้ามใช้ dropdown ให้ใช้ radio** · Atlassian ระบุ 5 ตัวขึ้นไปจึงใช้ select แต่เขียนไว้ในคู่มือ Forge ไม่ใช่หน้า component |
| **การเข้าถึง แบ่ง 2 ค่าย** | **ค่ายโฟกัสเสมือน** ใช้ `aria-activedescendant` โฟกัสค้างที่ตัวกระตุ้น (Carbon, Fluent, Atlassian, Zag, Ark) · **ค่ายย้ายโฟกัสจริง** เข้าไปในแถว (Material) · **Atlassian ถอด `aria-activedescendant` และ `aria-selected` ออกบนเครื่อง Apple โดยเจตนา** และ **Zag ยิง live region เฉพาะเครื่อง Apple เพราะ VoiceOver ไม่อ่าน activedescendant** |
| **พิมพ์แล้วกระโดด** | Zag ตั้งเวลา **350ms** ใช้ได้ทั้งตอนแผงปิดและเปิด และนับ Space เป็นตัวอักษรเมื่อกำลังพิมพ์ค้นอยู่ |
| **IME** | **Zag เป็นเจ้าเดียวที่ข้ามการประมวลผลคีย์ขณะกำลังประกอบอักษร** ซึ่งเป็นจุดที่ผู้ใช้ไทยเจอปัญหาจริงเวลาพิมพ์ค้น เจ้าอื่นไม่พูดถึงเลย |
| **สถานะอ่านอย่างเดียว** | **เป็นช่องว่างของตลาด** มีจริงแค่ Carbon (กฎ CSS) และ Mantine (prop `readOnly`) ส่วน Zag ให้แค่ `data-readonly` ไว้เกาะสไตล์ · Ant, Primer, Untitled UI และ Fluent ไม่มี |
| **สถานะพิเศษ** | **Ant มีผิดพลาด 2 ระดับ** คือ error กับ warning · **Primer มีสถานะสำเร็จ** · **Carbon มี warning แยกจาก error และมีโครงร่างรอโหลด** เจ้าอื่นไม่มี |
| **multi select** | แสดงต่างกันหมด **แท็กในช่อง** (Atlassian, Ant) · **ตัวนับ** (Carbon, Untitled UI แบบ N selected) · **ข้อความต่อกัน** (Fluent, Material) · **Spectrum ไม่มี multi picker เลย** |
| **มือถือ** | **Spectrum เจ้าเดียวที่สลับเป็นแผ่นเลื่อนขึ้นจากล่างอัตโนมัติ** · Primer ใกล้สุดคือเต็มจอเมื่อจอแคบ (ยังเป็น feature flag) · Untitled UI กับ Mantine แยกเป็นชิ้น native select · ที่เหลือใช้แผงลอยเหมือนเดสก์ท็อป |
| **แถบเลื่อน** | **8 ใน 10 ใช้ของเบราว์เซอร์** มีแต่ Ant ที่ทำ virtual list (จึงต้องตรึงความสูงแถว) และ Mantine ที่ทำ ScrollArea เอง **ของเราวาดแถบเลื่อนเองเป็น component 3 แบบ ซึ่งไม่มีใครทำ** |
| **ตัวบ่งชี้ว่าเลือกแล้ว** | ยังขัดกัน Untitled UI ติ๊กขวา · Mantine ติ๊กซ้าย (ค่าเริ่มต้น `checkIconPosition: left`) |
| **พื้นที่กดขั้นต่ำ** | **Primer เป็นเจ้าเดียวที่ทำเป็น token** `control.minTarget` เมาส์ 16 จอสัมผัส 44 และเขียนอ้างเกณฑ์ข้อ 2.5.5 ไว้ในไฟล์ token ตรง ๆ |

## 2. สถานะของเราก่อนเริ่ม

ของเดิม 2 ชุด 9 แบบ คือ `Default style` 6 แบบ และ `_Scroll bar` 3 แบบ และ **ไม่มีเอกสารสักใบ**

ค่าที่วัดได้จริง

```
ช่องปิด (Input)   320 x 44 · ระยะขอบ 10/14 · ช่องไฟ 8 · มุมโค้ง 8
                  ไอคอนนำ 20 · ข้อความ Text/md medium · ลูกศร 20
ครอบด้วย          "Dropdown frame" ที่ layout เป็น NONE  ← กรอบซ้อนที่ไม่ทำอะไร
แผงรายการ         320 x 320 · ห่างจากช่อง 8 · มุมโค้ง 8
                  เป็น instance ของ "Lists Template / Dropdown" ที่อยู่บนหน้า Lists (เลขเดิม 27 ยุบไปแล้ว)
                  ข้างในเนื้อหาสูง 468 จึงเลื่อนได้ บวกแถบเลื่อนที่วาดเอง
```

ปัญหาที่พบ 9 เรื่อง

1. **ความสูง 44 ไม่อยู่ในสเกลของระบบ** และไม่ตรงกับเจ้าไหนในตลาดเลย
2. **ตรึงความกว้าง 320**
3. **กรอบซ้อนที่ layout เป็น NONE** ซึ่งหน้า 13 Input ตัดสินไว้แล้วว่าเป็นของที่ต้องลบ
4. **ไม่มีแกนขนาด** ต่างจากช่องกรอกที่มี 3 ขั้น
5. **สถานะมีแค่ 3** คือ Default, Hover, Open ขาดโฟกัส ปิดใช้งาน อ่านอย่างเดียว และผิดพลาด
6. **ตัวอักษร 36 จุดใช้ชุดจากไลบรารีภายนอก**
7. **มุมโค้งไม่ผูกตัวแปร 31 จุด**
8. **สะกดผิด `Lebel` ทั้งชื่อคุณสมบัติและข้อความที่แสดงบนจอ**
9. **แถบเลื่อนวาดเอง 3 แบบ** ซึ่ง 8 ใน 10 เจ้าใช้ของเบราว์เซอร์

## 3. ข้อบกพร่องที่ลอกมาจาก Untitled UI

ไฟล์ออกแบบเดิมของเราอ้างอิง Untitled UI และงานวิจัยพบว่าต้นทางมีข้อบกพร่อง 4 ข้อที่ติดมาด้วย

1. **โฟกัสกับเปิดอยู่ใช้สไตล์เดียวกัน** เขียนไว้ตรง ๆ ว่า `(isFocused || isOpen)`
2. **ไม่มีสถานะชี้ที่ช่อง**
3. **สถานะผิดพลาดไม่ขึ้นที่ขอบช่อง** ไปโผล่ที่ข้อความใต้ช่องอย่างเดียว
4. **แถวในแผงใช้พื้นหลังเดียวกันทั้งตอนชี้ ตอนโฟกัส และตอนเลือกแล้ว**

> ข้อ 4 คือ **ข้อบกพร่องชนิดเดียวกับที่เจอตอนทำหน้า 24 Pagination** ที่หน้าปัจจุบันใช้สีเดียวกับตอนชี้จนแยกด้วยตาไม่ออก แปลว่าเราลอกข้อบกพร่องเดิมมาแล้วอย่างน้อยสองหน้า **ชุดใหม่ต้องแยกสามอย่างนี้ออกจากกันให้ชัด**

---

## 4. รายละเอียด Material · Spectrum · Carbon · Fluent · Atlassian


**Context** วิจัยรายการแบบเลื่อนลงจาก 5 design system เจ้าใหญ่ เพื่อเตรียมออกแบบ component dropdown/select ของ NTGDS
**วันที่สำรวจ** 2026-10-12 (อ่านจากโค้ดต้นทาง branch หลัก แพ็กเกจ npm รุ่นล่าสุด และเอกสารทางการ)
**ป้ายที่มา** `[สำรวจ]` อ่านจากโค้ด/CSS จริง `[แหล่งรอง]` เอกสารทางการหรือ issue `[ตีความ]` สรุปของผู้วิจัย

เวอร์ชันที่อ่าน

- Material: `material-ui@master` (Select/SelectInput, OutlinedInput, MenuItem, Autocomplete) + เอกสาร Material Menus
- Spectrum: `@spectrum-css/picker` + `@spectrum-css/menu` (branch main) + `@adobe/spectrum-tokens@13` (layout.json) + React Spectrum docs
- Carbon: `carbon@main` (`packages/styles/scss/components/dropdown`, `list-box`) + carbondesignsystem.com usage/accessibility
- Fluent: `@fluentui/react-combobox` (library/src branch master: Combobox, Dropdown, Listbox, Option)
- Atlassian: `@atlaskit/select@18.4.0` (dist/esm/styles.js) + `react-select@master` (Select.tsx) + atlassian.design

---

### 1. ตารางสรุป 5 เจ้า

| หัวข้อ | Material (MUI) | Spectrum (Adobe) | Carbon (IBM) | Fluent (Microsoft) | Atlassian |
|---|---|---|---|---|---|
| ชื่อชิ้นงานหลัก | `Select` · `Autocomplete` · `Menu` | `Picker` · `ComboBox` · `Menu` | `Dropdown` · `ComboBox` · `MultiSelect` · `FilterableMultiSelect` | `Dropdown` · `Combobox` · `Select` · `Menu` | `Select` · `PopupSelect` · `DropdownMenu` |
| ครอบ select เนทีฟ | มี (`native` prop) | ไม่มี | ไม่มี | **มี `Select` แยกตัว** | ไม่มี |
| พิมพ์ค้นได้ | `Autocomplete` | `ComboBox` | `ComboBox` · `FilterableMultiSelect` | `Combobox` (`freeform`) | `Select` (`isSearchable` เริ่มต้นเปิด) |
| เมนูคำสั่งแยกตัว | `Menu` / `MenuList` | `Menu` / `ActionMenu` | `OverflowMenu` · `MenuButton` | `Menu` | `DropdownMenu` |
| multi select | `Select multiple` | **หาไม่พบ** (ไม่มี multi picker) | `MultiSelect` | `Dropdown multiselect` | `Select isMulti` |
| แกนขนาด (ความสูงช่อง) | 2 ขั้น 40 / 56 | 4 ขั้น 24 / 32 / 40 / 48 (จอสัมผัส 30 / 40 / 50 / 60) | **4 ขั้น 24 / 32 / 40 / 48** + fluid 64 | 3 ขั้น 24 / 32 / 40 | 2 ขั้น 32 / 40 |
| ความสูงแผง | `Select` ตามพื้นที่จอ · `Autocomplete` 40vh | ตามพื้นที่จอ | **ความสูงช่อง คูณ 5.5** | **80vh** | **300 px** |
| ระยะช่องถึงแผง | 0 (Popover ทับขอบ) | ตาม overlay offset | 4 px (v12) | 0 (positioning ชิด) | 8 px |
| ความสูงแถว | 36 จอใหญ่ / 48 จอเล็ก · dense 32 | เท่าความสูงช่องทุกขั้น | **เท่าความสูงช่องทุกขั้น** | ไม่ตรึง (ระยะขอบ 6 px บนล่าง) | ไม่ตรึง (ระยะขอบ 6 / 12) |
| `role` ที่ช่อง | `combobox` | `button` + `aria-haspopup` | `button` (dropdown) · `combobox` (combo box) | `button` (Dropdown) · `combobox` (Combobox) | `combobox` |
| ตัวชี้แถวที่ไฮไลต์ | **โฟกัสจริง** | โฟกัสจริง | `aria-activedescendant` | `aria-activedescendant` | `aria-activedescendant` (ยกเว้นเครื่อง Apple) |
| มือถือ | แผงลอยเหมือนเดิม | **สลับเป็นแผ่นเลื่อน (tray)** | แผงลอยเหมือนเดิม | แผงลอยเหมือนเดิม | แผงลอยเหมือนเดิม |
| แถบเลื่อน | ของเบราว์เซอร์ | ของเบราว์เซอร์ | ของเบราว์เซอร์ | ของเบราว์เซอร์ | ของเบราว์เซอร์ |

---

### 2. คำตอบรายคำถาม

### 2.1 แยกเป็นกี่ชิ้นงาน

1. **Material** `[สำรวจ]` แยก 4 ชิ้น `Select` (ค่าในฟอร์ม เปิดแผงด้วย `Menu`) · `Select native` (ใช้ `<select>` เนทีฟจริง) · `Autocomplete` (พิมพ์ค้น กรองเอง รองรับ `multiple` และ `freeSolo`) · `Menu` (คำสั่ง ไม่ผูกค่าฟอร์ม)
2. **Spectrum** `[สำรวจ]` `[แหล่งรอง]` แยก 3 ชิ้น `Picker` (เลือกค่าเดียว ไม่พิมพ์) · `ComboBox` (ช่องพิมพ์ บวกแผงเลือก เอกสารเขียนว่า "combine a text entry with a picker menu") · `Menu` (คำสั่ง เป็นฐานของแผงใน Picker ด้วย) **ไม่มี multi select picker หาไม่พบในไลบรารี**
3. **Carbon** `[แหล่งรอง]` แยกชัดที่สุด 3 ตระกูล `Dropdown` (เลือกค่าเดียว ไม่พิมพ์) · `MultiSelect` (ติ๊กหลายค่า มีช่องติ๊กในแถว) · `ComboBox` (พิมพ์กรอง และพิมพ์ค่าที่ไม่มีในรายการได้) บวกตัวแปร `inline` ที่ใช้กับ dropdown และ multiselect แบบไม่มีการกรอง และตัวแปร `fluid` สำหรับฟอร์มชิดกัน
4. **Fluent** `[สำรวจ]` แยก 4 ชิ้น และเป็นเจ้าเดียวที่มีทั้งเนทีฟและไม่เนทีฟ `Select` (ครอบ `<select>` เนทีฟ) · `Dropdown` (ปุ่มเปิดแผง ตั้ง `multiselect` ได้) · `Combobox` (ช่องพิมพ์ ตั้ง `freeform` ให้พิมพ์ค่าใหม่ได้) · `Menu` (คำสั่ง) โดย `Dropdown` และ `Combobox` อยู่ในแพ็กเกจเดียวกันและใช้ `Listbox` กับ `Option` ชุดเดียวกัน
5. **Atlassian** `[สำรวจ]` `[แหล่งรอง]` `Select` ตัวเดียวคุมหลายโหมดผ่าน prop (`isMulti` · `isSearchable` · `isCreatable` · async · checkbox select · radio select · country select) บวก `PopupSelect` สำหรับใส่ในป็อปอัป และ `DropdownMenu` ที่เอกสารระบุว่าใช้ "display a list of actions or options" คือคำสั่ง ไม่ใช่ค่าในฟอร์ม

### 2.2 เกณฑ์เลือกระหว่าง select กับ radio กับ combobox

| เจ้า | เกณฑ์ที่เขียนไว้ | ความชัด |
|---|---|---|
| Carbon | `[แหล่งรอง]` "It is best practice not to use a dropdown if there are two options to choose from. In this case, use a radio button group instead." และแนะนำ combo box เมื่อรายการยาวมากเพราะพิมพ์กรองได้ | **ชัดที่สุดในกลุ่มนี้ ระบุตัวเลขจริง คือ 2 ตัวเลือกห้ามใช้ dropdown** |
| Atlassian | `[แหล่งรอง]` เอกสารฝั่ง Forge แนะนำ radio สำหรับ 2 ถึง 3 ตัวเลือก และ single select เมื่อ **5 ตัวเลือกขึ้นไป** multi select เมื่อเลือกหลายค่าจากรายการ 5 ตัวขึ้นไป | ชัดเป็นตัวเลข แต่อยู่ในคู่มือ Forge ไม่ใช่หน้า component ของ Select เอง |
| Spectrum | `[แหล่งรอง]` ระบุเชิงบริบทว่า Picker ใช้ "when space is limited" ส่วน ComboBox ใช้เมื่อผู้ใช้ควรกรองด้วยการพิมพ์ | ไม่มีตัวเลขเกณฑ์ |
| Material | `[สำรวจ]` `[ตีความ]` เอกสาร component ไม่ได้วางเกณฑ์จำนวนตัวเลือก เน้นอธิบายกลไกของแต่ละตัว | ไม่มีเกณฑ์ |
| Fluent | `[ตีความ]` ไม่พบเกณฑ์จำนวนตัวเลือกในเอกสาร component | ไม่มีเกณฑ์ |

`[ตีความ]` ถ้าจะยืมเกณฑ์มาใช้ ควรยึด Carbon บวก Atlassian คือ 2 ถึง 4 ตัวเลือกใช้ radio · 5 ตัวขึ้นไปใช้ select · เกินราว 10 ถึง 15 ตัวหรือรายการมาจากหลังบ้านให้ใช้ combobox ที่พิมพ์กรองได้

### 2.3 แกนขนาดและความสูงช่องเป็นตัวเลขจริง

| เจ้า | ขั้น | ความสูงช่อง (px) | ที่มา |
|---|---|---|---|
| **Carbon** | xs · sm · md · lg | **24 · 32 · 40 · 48** (fluid 64 แยกต่างหาก) | `[สำรวจ]` `_dropdown.scss` ตั้ง `block-size` 32 / 40 / 48 โดยตรง และ `list-box` ใช้ `layout.size('height')` · `[แหล่งรอง]` ตารางในหน้า usage ยืนยัน xs ที่ 24 |
| **Spectrum** | s · m · l · xl | **24 · 32 · 40 · 48** จอชี้เมาส์ และ **30 · 40 · 50 · 60** จอสัมผัส | `[สำรวจ]` `picker/index.css` ผูก `--spectrum-picker-block-size` เข้ากับ `component-height-75 / 100 / 200 / 300` และ `layout.json` ของ spectrum-tokens ให้ค่า desktop 24 / 32 / 40 / 48 กับ mobile 30 / 40 / 50 / 60 |
| **Fluent** | small · medium · large | **24 · 32 · 40** | `[สำรวจ]` `useComboboxStyles.styles.ts` มี `fieldHeights = { small: '24px', medium: '32px', large: '40px' }` |
| **Atlassian** | compact · default | **32 · 40** | `[สำรวจ]` `styles.js` ของ `@atlaskit/select` ตั้ง `minHeight: isCompact ? 32 : 40` ที่ `control` |
| **Material** | small · medium | **40 · 56** | `[สำรวจ]` `OutlinedInput` ตั้งระยะขอบ `8.5px 14px` (small) และ `16.5px 14px` (medium) · `[ตีความ]` บวกกับความสูงบรรทัด 1.4375em เท่ากับ 23 px ได้ 40 และ 56 ตามลำดับ ซึ่งตรงกับ 40dp และ 56dp ที่ Material ใช้กับ text field |

`[ตีความ]` **3 ใน 5 เจ้า (Carbon · Spectrum · Fluent) ล็อกอยู่บนสเกล 24 / 32 / 40 / 48 ซึ่งตรงกับสูตรความสูงกลางของ NTGDS (base 24 step 8) พอดี** มีแต่ Material ที่ไปทาง 40 / 56 เพราะอิงความสูง text field ของ Material ไม่ใช่สเกลปุ่ม

### 2.4 สถานะที่มีครบชุด

| สถานะ | Material | Spectrum | Carbon | Fluent | Atlassian |
|---|---|---|---|---|---|
| ปกติ | มี | มี | มี | มี | มี |
| ชี้ (hover) | มี | มี | มี | มี | มี |
| โฟกัส | มี (`focusVisible`) | มี (focus indicator แยก token) | มี | มี (`colorCompoundBrandStroke`) | มี |
| เปิดอยู่ | มี (`open`) | มี (`isOpen`) | มี (`--dropdown--open`) | มี (`open`) | มี |
| ปิดใช้งาน | มี | มี (`isDisabled`) | มี | มี | มี |
| อ่านอย่างเดียว | `[ตีความ]` ทำผ่าน `InputProps.readOnly` ไม่ใช่สถานะที่ออกแบบไว้ | **มีที่ ComboBox (`isReadOnly`) แต่ Picker ไม่มี** | **มี กฎ CSS แยกจริง** (`read-only` ตั้ง `border-radius-00` และเส้นเป็น `border-subtle`) | **หาไม่พบ** | `[แหล่งรอง]` ทำผ่าน appearance และ `isDisabled` ไม่มีสถานะอ่านอย่างเดียวแยก |
| ผิดพลาด | มี (`error`) | มี (`isInvalid`) | **มี 2 ระดับ error และ warning** พร้อมไอคอนและระยะขอบของตัวเอง | มี (`colorPaletteRedBorder2`) | มี (`isInvalid` สลับเป็น appearance subtle ที่มีขอบแดง) |
| โครงร่างรอโหลด | ไม่มี | `[แหล่งรอง]` มี loading state ที่ ComboBox | **มี `skeleton`** | ไม่มี | `[แหล่งรอง]` มี loading indicator |

`[ตีความ]` **Carbon ครบที่สุด** คือมีทั้งอ่านอย่างเดียว เตือน ผิดพลาด และโครงร่างรอโหลด แยกเป็นกฎจริงในสไตล์ชีต ส่วนอีก 4 เจ้าอ่านอย่างเดียวเป็นช่องว่างร่วมกัน

### 2.5 ความสูงของแผงรายการ

1. **Carbon** `[สำรวจ]` จำกัดด้วย **จำนวนแถว** คือ `max-block-size: calc(layout.size('height') * 5.5)` แปลงเป็นพิกเซลได้ xs 132 · sm 176 · md **220** · lg 264 `[แหล่งรอง]` เอกสารอธิบายเจตนาว่า "We recommend showing 50% of the last option's container height to indicate there is more to see" และการเลื่อนจะเริ่มที่ตัวเลือกที่ 6 บวกกับจำกัดความกว้างแผงไว้ที่ 300 px
2. **Fluent** `[สำรวจ]` จำกัดด้วย **สัดส่วนจอ** คือ `maxHeight: '80vh'` ที่ `listbox` ไม่ผูกกับจำนวนแถว
3. **Atlassian** `[สำรวจ]` จำกัดด้วย **พิกเซลตรง** คือ `maxMenuHeight: 300` ของ react-select และมี `minMenuHeight: 140` คุมขั้นต่ำก่อนจะพลิกทิศ
4. **Material** `[สำรวจ]` `Select` ไม่ตั้งเพดานของตัวเอง ใช้กลไก Popover ที่หักระยะขอบจอให้ ส่วน `Autocomplete` ตั้ง `maxHeight: '40vh'` ที่ listbox
5. **Spectrum** `[สำรวจ]` `[ตีความ]` `menu/index.css` ไม่ตั้ง max height ให้ความสูงถูกคุมด้วยชั้น overlay ตามพื้นที่จอที่เหลือ

`[ตีความ]` **ค่าเริ่มต้นที่พบกระจุกราว 220 ถึง 300 px หรือเท่ากับ 5.5 แถว** วิธีของ Carbon อ่านง่ายและผูกกับแกนขนาดได้ตรง ๆ จึงเหมาะกับระบบที่มี 4 ขั้นแบบเรา

### 2.6 ระยะห่างระหว่างช่องกับแผง

| เจ้า | ค่าจริง | ที่มา |
|---|---|---|
| Carbon | **4 px** (`$spacing-02` ตั้งเป็นระยะเหนือแผงตั้งแต่ v12) เดิมเป็น 0 ชิดขอบช่อง | `[สำรวจ]` `_list-box.scss` |
| Atlassian | **8 px** (ค่าฐานของ react-select คือ `baseUnit * 2`) | `[แหล่งรอง]` ค่าฐาน react-select ไม่ได้ถูกทับใน `styles.js` ของ atlaskit |
| Material | **0** แผงทับขอบช่อง และ `minWidth` ของแผงเท่ากับความกว้างช่อง (`anchorElement.clientWidth`) เว้นแต่ตั้ง `autoWidth` | `[สำรวจ]` `SelectInput.js` |
| Fluent | **0** ใช้ positioning ชิดขอบช่อง ไม่มี offset ในสไตล์ | `[สำรวจ]` `useComboboxStyles.styles.ts` |
| Spectrum | `[ตีความ]` ไม่มีค่าในไฟล์ component ระยะมาจาก overlay offset ของชั้น popover **หาไม่พบตัวเลขในโค้ด** | `[สำรวจ]` |

### 2.7 แถวในแผง

1. **Carbon** `[สำรวจ]` ความสูงแถว **เท่าความสูงช่องทุกขั้น** (24 / 32 / 40 / 48) ระยะขอบแนวตั้งคำนวณเป็น `calc((height - 1rem) / 2 - 1px)` ระยะขอบแนวนอน `$spacing-05` เท่ากับ 16 px มีเส้นคั่น 1 px แบบโปร่งที่กลายเป็น `border-subtle-01` เมื่อต้องแบ่ง รองรับช่องติ๊กใน `MultiSelect` และหัวกลุ่มกับเส้นคั่นผ่าน `OverflowMenu` `[ตีความ]` แผงของ dropdown เองไม่มีหัวกลุ่ม
2. **Spectrum** `[สำรวจ]` ความสูงแถวขั้นต่ำผูก token ชุดเดียวกับช่อง (`component-height-75 / 100 / 200 / 300`) รองรับครบที่สุด คือ เครื่องหมายถูก (เปิดปิดด้วย display และย่อขยายตามขั้นขนาด) ข้อความรอง หัวกลุ่ม (`section-header` ตัวหนา) และเส้นคั่น (`section-divider` ที่คำนวณระยะให้เส้นอยู่กลางช่องว่าง) บวกกับกรณีพิเศษ `selectable-edge-to-text-not-selected` สำหรับแถวที่เลือกได้แต่ยังไม่เลือก
3. **Fluent** `[สำรวจ]` ไม่ตรึงความสูง ใช้ระยะขอบ `spacingVerticalSNudge` กับ `spacingHorizontalS` `[แหล่งรอง]` เท่ากับ 6 px และ 8 px ช่องไฟในแถว `spacingHorizontalXXS` เท่ากับ 2 px เครื่องหมายถูกใช้ `fontSizeBase400` (16 px) และเลื่อนซ้ายด้วย margin ลบ ส่วน multiselect เปลี่ยนเครื่องหมายถูกเป็นช่องติ๊ก **16 คูณ 16** มีเส้นขอบและเปลี่ยนพื้นเป็นสีแบรนด์เมื่อเลือก แผงมีระยะขอบ `spacingHorizontalXS` (4 px) และช่องไฟระหว่างแถว `spacingHorizontalXXS` (2 px)
4. **Atlassian** `[สำรวจ]` แถว `padding: '6px 12px'` ไม่ตรึงความสูง มีหัวกลุ่ม (`groupHeading`) และโหมด checkbox select กับ radio select ที่ใส่ตัวควบคุมในแถว `[ตีความ]` ความสูงแถวจริงราว 32 px เมื่อข้อความความสูงบรรทัด 20
5. **Material** `[สำรวจ]` `MenuItem` ตั้ง `minHeight: 48` แล้ว **ปล่อยเป็น `auto` ตั้งแต่ breakpoint sm ขึ้นไป** ระยะขอบแนวตั้ง 6 px `[ตีความ]` จึงได้ราว 36 px บนจอใหญ่ และ 48 px บนจอเล็กซึ่งตรงกับ 48dp ที่เอกสาร Material ระบุ ส่วนโหมด `dense` ตั้ง `minHeight: 32` ระยะขอบ 4 px `Autocomplete` ใช้แถวระยะขอบ `6px 16px` และมี `groupLabel` ที่ปักหมุดหัวกลุ่ม

### 2.8 แผงพลิกเมื่อชนขอบจอ และวางนอกลำดับชั้นหรือไม่

1. **Atlassian** `[สำรวจ]` `[แหล่งรอง]` react-select มี `menuPlacement` ค่าเริ่มต้น `'bottom'` และตั้งเป็น `'auto'` ให้พลิกได้ บวก `minMenuHeight: 140` เป็นเกณฑ์ตัดสินว่าพื้นที่ล่างพอหรือไม่ และ `menuPosition` เริ่มต้น `'absolute'` คือ **อยู่ในลำดับชั้นเดิม** ต้องตั้ง `menuPortalTarget` เองถ้าจะย้ายออก ส่วน `DropdownMenu` มี `shouldFlip` และ **วางใน React Portal เป็นค่าเริ่มต้น** พร้อม `shouldRenderToParent` ให้ย้ายกลับเข้าลำดับชั้นเดิมได้
2. **Carbon** `[แหล่งรอง]` เอกสารระบุว่าแผงเปิดลงล่างเป็นค่าเริ่มต้นและเปิดขึ้นเมื่อใกล้ขอบจอ `[สำรวจ]` แผงใช้ `z-index: z('dropdown')` และอยู่ในลำดับชั้นเดิม `[ตีความ]` การย้ายออกนอกลำดับชั้นเป็นทางเลือกผ่าน prop จัดตำแหน่งอัตโนมัติในรุ่นใหม่
3. **Fluent** `[สำรวจ]` ใช้ชั้น positioning ของ Fluent ซึ่งพลิกและเลื่อนให้เองเป็นค่าเริ่มต้น และมี `inlinePopup` ให้เลือกว่าจะวางในลำดับชั้นเดิมหรือยกออกเป็น portal `[สำรวจ]` โค้ด `useDropdown` ตั้ง `aria-owns` ที่ราก **เฉพาะเมื่อไม่ใช่ inline popup** ซึ่งเป็นการเย็บความสัมพันธ์กลับเมื่อแผงถูกย้ายออกนอกลำดับชั้น
4. **Material** `[สำรวจ]` `Select` ใช้ `Menu` บน `Popover` ซึ่งวางใน portal และหักระยะขอบจอให้ ส่วน `Autocomplete` ใช้ Popper ที่ตั้ง `zIndex` เท่ากับ `zIndex.modal`
5. **Spectrum** `[แหล่งรอง]` `[ตีความ]` ใช้ชั้น overlay ของ React Spectrum ที่พลิกและจัดตำแหน่งให้เอง และบนมือถือไม่พลิกเพราะเปลี่ยนเป็นแผ่นเลื่อนแทน

`[ตีความ]` ทั้ง 5 เจ้าพลิกทิศได้หมด **ประเด็นที่ต่างกันจริงคือเรื่องลำดับชั้น** Material กับ Atlassian DropdownMenu ยกออกเป็น portal โดยปริยาย ส่วน Atlassian Select กับ Carbon อยู่ในลำดับชั้นเดิมโดยปริยาย ซึ่งกระทบตอนใส่ใน modal หรือกล่องที่ตัดเนื้อหา

### 2.9 การเข้าถึง

| หัวข้อ | Material (`Select`) | Spectrum (`Picker`) | Carbon | Fluent | Atlassian (`Select`) |
|---|---|---|---|---|---|
| `role` ที่ช่อง | `combobox` บวก `aria-haspopup="listbox"` | `button` บวก `aria-haspopup` | `button` บวก `aria-haspopup="listbox"` (dropdown และ multiselect) · `combobox` บวก `aria-autocomplete="list"` (combo box) | `button` (Dropdown) · `combobox` (Combobox) | `combobox` บวก `aria-autocomplete="list"` บวก `aria-haspopup` |
| `aria-expanded` | มี | มี | **มีทุกตัวแปร** | มี | มี |
| `role` ที่แผงและแถว | `listbox` บวก `option` และตั้ง `aria-multiselectable` เมื่อ `multiple` | `listbox` บวก `option` | `listbox` บวก `option` ผูกด้วย `aria-controls` | `listbox` บวก `option` | `listbox` บวก `option` ตั้ง `aria-multiselectable` ตาม `isMulti` |
| ตัวชี้แถวไฮไลต์ | **โฟกัสจริงไปที่แถว ไม่ใช้ `aria-activedescendant`** (โฟกัสค้างที่ช่องตอนเปิด แล้วย้ายเข้าแถวเมื่อกดลูกศร) | `[ตีความ]` โฟกัสจริงตามแบบ Menu ของ React Aria | `aria-activedescendant` | `aria-activedescendant` (ผ่าน `useActiveDescendant`) | `aria-activedescendant` **ยกเว้นบนเครื่อง Apple ที่ถอดออกทั้ง `aria-activedescendant` และ `aria-selected`** |
| ลูกศรขึ้นลง | เปิดแผง (`ArrowUp`, `ArrowDown`) แล้วเลื่อนแถว | เปิดและเลื่อนแถว | เปิดแผง (`ArrowDown`) และเลื่อนแถว | เลื่อนแถวที่ไฮไลต์ | เปิดแผงและเลื่อนแถว |
| Escape | ปิดแผงโดยไม่เลือก | ปิดแผง | ปิดโดยไม่เลือก (dropdown และ multiselect) · **ที่ combo box ล้างข้อความในช่องแล้วปิด** | ปิดแผง (ผ่าน `useTabsterEscapeIgnore`) | ปิดแผง |
| พิมพ์ตัวอักษรแล้วกระโดด | **มี** โค้ดจัดการการค้นด้วยตัวอักษรตอนแผงปิด | `[แหล่งรอง]` มี typeahead ผ่าน `textValue` ของแต่ละรายการ | `[ตีความ]` **หาไม่พบว่าระบุไว้** ที่ dropdown ธรรมดา ส่วน combo box ใช้การกรองแทน | `[ตีความ]` **หาไม่พบในไฟล์ที่อ่าน** | ใช้การกรองแทน (ช่องเป็นช่องพิมพ์จริง) |
| อื่น | `Space`, `Enter`, ลูกศร เปิดแผงทั้งหมด | `[แหล่งรอง]` มี `shouldFocusWrap` ให้วนรอบ | `Delete` ที่ `MultiSelect` ล้างทุกค่าที่เลือก · `Tab` ปิดโดยไม่เลือก | `aria-owns` เย็บแผงกลับเมื่อย้ายออกนอกลำดับชั้น | `tabSelectsValue: true` คือกด Tab เลือกค่าที่ไฮไลต์ |

`[ตีความ]` **ประเด็นสำคัญคือ Material เลือกคนละทางกับที่เหลือ** คือย้ายโฟกัสจริงเข้าแถว ส่วน Carbon, Fluent, Atlassian ใช้ `aria-activedescendant` ให้โฟกัสค้างที่ช่อง ซึ่งเป็นแนวที่ APG แนะนำสำหรับ combobox ถ้าเราทำทั้ง select และ combobox ควรเลือกแนวเดียวให้ทั้งตระกูล

### 2.10 multi select แสดงของที่เลือกแล้วยังไง

1. **Atlassian** `[สำรวจ]` **แท็กในช่อง** มีชิ้นส่วน `multiValue` (มุมโค้ง 2 px และ 4 px ในชุดสีใหม่) `multiValueLabel` และ `multiValueRemove` ที่มีมุมโค้ง `0px 2px 2px 0px` คือปุ่มกากบาทต่อท้ายแท็ก
2. **Fluent** `[สำรวจ]` `[แหล่งรอง]` **ข้อความสรุปในปุ่ม** คือเอาข้อความของรายการที่เลือกมาต่อกัน และในแผงใช้ช่องติ๊ก 16 คูณ 16 แทนเครื่องหมายถูก
3. **Carbon** `[แหล่งรอง]` **ตัวนับในช่อง** คือแท็กกลมบอกจำนวนที่เลือกพร้อมปุ่มล้าง และข้อความกำกับยังอยู่ ส่วนแถวในแผงมีช่องติ๊ก
4. **Material** `[สำรวจ]` `[แหล่งรอง]` ค่าเริ่มต้นคือ **ข้อความต่อกันด้วยลูกน้ำ** และเปลี่ยนเป็นแท็กได้ด้วย `renderValue` ซึ่งเป็นแค่ตัวอย่างในเอกสาร ไม่ใช่ component สำเร็จ ส่วน `Autocomplete multiple` ใช้แท็กในช่องจริง
5. **Spectrum** **หาไม่พบ** ไม่มี multi select picker ในไลบรารี `[ตีความ]` งานเลือกหลายค่าถูกผลักไปที่ `ListBox` แบบเลือกหลายค่าหรือ `TagGroup` แทน

### 2.11 บนมือถือ

1. **Spectrum** `[แหล่งรอง]` **เจ้าเดียวที่สลับกลไกให้เอง** เอกสารระบุตรง ๆ ว่า "On mobile, Pickers automatically display in a tray instead of a popover to improve usability" และ ComboBox ก็สลับเป็นแผ่นเลื่อนที่มีช่องค้นในตัว บวกกับ token ความสูงชุด mobile ที่ใหญ่ขึ้นเป็น 30 / 40 / 50 / 60
2. **Carbon** `[แหล่งรอง]` `[ตีความ]` ใช้แผงลอยเหมือนเดิม ปรับด้วยการเลือกขั้นขนาดที่ใหญ่ขึ้นและตัวแปร fluid 64 px
3. **Fluent** `[สำรวจ]` ใช้แผงลอยเหมือนเดิม เพดาน 80vh ช่วยให้แผงไม่ล้นจอเตี้ย
4. **Atlassian** `[สำรวจ]` ใช้แผงลอยเหมือนเดิม แต่ react-select มีการปรับตามอุปกรณ์จริง คือ `menuShouldScrollIntoView: !isMobileDevice()` และ `captureMenuScroll: !isTouchCapable()`
5. **Material** `[สำรวจ]` ใช้แผงลอยเหมือนเดิม แต่ขยายความสูงแถวเป็น 48 บนจอเล็กด้วย breakpoint `[ตีความ]` การสลับเป็นแผ่นเลื่อนต้องประกอบเองด้วย component อื่น

### 2.12 แถบเลื่อนในแผง

`[สำรวจ]` **ทั้ง 5 เจ้าใช้แถบเลื่อนของเบราว์เซอร์ ไม่มีใครทำแถบเลื่อนเอง** สิ่งที่แต่ละเจ้าทำคือคุมพฤติกรรมรอบการเลื่อนแทน

- Carbon ตั้งเพดานเป็นครึ่งแถว (คูณ 5.5) เพื่อให้ขอบแถวสุดท้ายโผล่มาครึ่งหนึ่งเป็นสัญญาณว่ายังเลื่อนได้ `[สำรวจ]` `[แหล่งรอง]`
- Atlassian มี `captureMenuScroll` กันการเลื่อนทะลุไปหน้าหลัง และ `menuShouldScrollIntoView` เลื่อนแผงเข้าจอ `[สำรวจ]`
- Fluent อาศัย `maxHeight: 80vh` แล้วปล่อยให้ listbox เลื่อนเอง `[สำรวจ]`
- Material ตั้ง `maxHeight: 40vh` ที่ listbox ของ Autocomplete `[สำรวจ]`
- Spectrum ปล่อยให้ชั้น overlay คุม และบนมือถือย้ายไปเลื่อนในแผ่นเลื่อนแทน `[สำรวจ]` `[ตีความ]`

---

### 3. Design implications สำหรับ NTGDS

1. **แกนขนาดใช้ 24 / 32 / 40 / 48 ได้เลย** เพราะ Carbon, Spectrum และ Fluent อยู่บนสเกลนี้ และตรงกับสูตรความสูงกลางของระบบเรา (base 24 step 8) อยู่แล้ว ขั้น 24 ควรมีคำเตือนเรื่องพื้นที่กดเหมือนที่ทำกับ pagination
2. **ความสูงแถวในแผงให้เท่าความสูงช่องทุกขั้น** ตามแบบ Carbon และ Spectrum จะได้ค่าเดียวที่ตรวจง่าย ไม่ต้องตั้งแยก
3. **เพดานแผงใช้ความสูงช่องคูณ 5.5** ตามแบบ Carbon เพราะผูกกับแกนขนาดโดยตรง และได้สัญญาณครึ่งแถวฟรี (md ได้ 220 px ซึ่งอยู่ในช่วงเดียวกับ 300 px ของ Atlassian)
4. **ต้องแยกเป็น 3 ชิ้นงานเป็นอย่างน้อย** คือ select เลือกค่าเดียว · combobox พิมพ์กรอง · multi select และต้องไม่เอาเมนูคำสั่งมาปนกับ select เพราะทั้ง 5 เจ้าแยกเรื่องนี้ออกหมด
5. **สถานะอ่านอย่างเดียวเป็นช่องว่างของตลาด** มีแค่ Carbon ที่ทำเป็นกฎจริง ถ้าเราทำให้ครบจะดีกว่าต้นแบบ 4 ใน 5 เจ้า
6. **เลือกแนวการเข้าถึงให้เหมือนกันทั้งตระกูล** แนะนำ `aria-activedescendant` ตาม Carbon, Fluent, Atlassian เพราะใช้ร่วมกันได้ทั้ง select และ combobox ไม่ต้องสลับกลไกกลางทาง
7. **multi select ควรใช้แท็กในช่องแบบ Atlassian หรือตัวนับแบบ Carbon** และต้องตัดสินก่อนออกแบบ เพราะสองแบบนี้ให้ความกว้างช่องที่ต่างกันมาก แท็กทำให้ช่องสูงขึ้นเมื่อเลือกหลายค่า ตัวนับไม่เปลี่ยนความสูง
8. **มือถือ 70 เปอร์เซ็นต์ของผู้ใช้เรา** จึงควรพิจารณาแนวแผ่นเลื่อนขึ้นจากล่างแบบ Spectrum เป็นอย่างน้อยกับรายการยาว แต่ต้องเปิดเป็นหัวข้อตัดสินใจแยก เพราะอีก 4 เจ้าไม่ทำ และมันคือ component เพิ่มอีกชิ้น

### 4. Sources

- Material: `mui/material-ui@master` ไฟล์ `Select/SelectInput.js` · `OutlinedInput/OutlinedInput.js` · `MenuItem/MenuItem.js` · `Autocomplete/Autocomplete.js` · เอกสาร Material Menus (m1/m2.material.io) สำหรับ 48dp และความกว้างแผง 112 ถึง 280dp
- Spectrum: `adobe/spectrum-css@main` ไฟล์ `components/picker/index.css` · `components/menu/index.css` · `@adobe/spectrum-tokens@13` `src/layout.json` · react-spectrum.adobe.com หน้า Picker และ ComboBox
- Carbon: `carbon-design-system/carbon@main` ไฟล์ `packages/styles/scss/components/dropdown/_dropdown.scss` · `packages/styles/scss/components/list-box/_list-box.scss` · carbondesignsystem.com/components/dropdown/usage และ /accessibility
- Fluent: `microsoft/fluentui@master` ไฟล์ `react-components/react-combobox/library/src/components/Combobox/useComboboxStyles.styles.ts` · `Listbox/useListboxStyles.styles.ts` · `Option/useOptionStyles.styles.ts` · `Dropdown/useDropdown.tsx`
- Atlassian: `@atlaskit/select@18.4.0` ไฟล์ `dist/esm/styles.js` · `JedWatson/react-select@master` ไฟล์ `packages/react-select/src/Select.tsx` · atlassian.design/components/select/examples และ /dropdown-menu/examples · developer.atlassian.com คู่มือ Forge สำหรับเกณฑ์จำนวนตัวเลือก

---

## 5. รายละเอียด Ant Design · Primer · Untitled UI · Mantine · Zag และ Ark


**Context** เตรียมออกแบบ component รายการแบบเลื่อนลงของ NTGDS ส่วน B เก็บ 5 เจ้า โดย Untitled UI สำคัญเป็นพิเศษเพราะไฟล์ออกแบบเดิมของเราลอกมาจากเจ้านี้ และ Zag/Ark สำคัญเพราะเปิดกลไกคีย์บอร์ดไว้ในโค้ดตรง ๆ
**วันที่สำรวจ** 2026-10-12 อ่านจากโค้ดต้นทาง branch หลักและ CSS ที่ส่งออกจริง
**ป้ายที่มา** `[สำรวจ]` อ่านจากโค้ด/CSS จริง `[แหล่งรอง]` เอกสารทางการ `[ตีความ]` สรุปของผู้วิจัย
**เวอร์ชันที่อ่าน**

- `antd@6.6.5` บวก `rc-select`
- `@primer/react@38.40.1` บวก `@primer/primitives@11.10.0`
- `untitleduico/react` branch main
- `@mantine/core@9.7.2`
- `@zag-js/select@1.46.0` และ `@zag-js/combobox@1.46.0` บวก `@ark-ui/react@5.39.3`

### 1. สรุปอ่านหน้าเดียวจบ

| หัวข้อ | Ant Design | Primer | Untitled UI | Mantine | Zag/Ark |
|---|---|---|---|---|---|
| แกนขนาด | 3 ขั้น | 3 ขั้น | 3 ขั้น | 5 ขั้น | ไม่มี |
| ความสูงช่องจริง | 24 / 32 / 40 | 28 / 32 / 40 | 36 / 40 / 44 | 30 / 36 / 42 / 50 / 60 | ไม่กำหนด |
| สูงแผงเริ่มต้น | 256 | ไม่ตรึง สืบทอดจาก Overlay | 224 / 256 / 320 | 220 | ไม่กำหนด |
| ระยะช่องถึงแผง | 4 | 4 | 4 | 8 | 8 ที่ select |
| ความสูงแถว | 32 เท่า controlHeight | 28 / 32 / 40 | 36 / 40 / 44 | ไม่ตรึง คุมด้วยระยะขอบ | ไม่กำหนด |
| โฟกัสแถว | activedescendant | โฟกัสจริง FocusZone | จริงที่ select เสมือนที่ combobox | activedescendant | activedescendant |
| multi แสดงผล | แท็กในช่อง | ติ๊กในแผง | นับจำนวน N selected | Pill ในช่อง | ปล่อยให้ผู้ใช้ |
| มือถือ | ไม่มีแผ่นเลื่อน | เต็มจอเมื่อจอแคบ | ไม่มี มีตัว native แยก | ไม่มี แนะนำ native | ไม่มี |
| แถบเลื่อน | ทำเอง virtual list | ของเบราว์เซอร์ | ของเบราว์เซอร์ | ทำเอง ScrollArea | ของเบราว์เซอร์ |

ข้อสังเกตที่ใช้ตัดสินใจได้ทันที

- **ความสูงช่องไม่มีฉันทามติ กระจาย 24 ถึง 60** แต่ขั้นกลางของ Ant และ Primer ตรงกันที่ 32
- **Untitled UI เริ่มที่ 36 ไม่ใช่ 32 และไม่ได้ตรึงความสูงเลย** ตัวเลขที่เห็นในไฟล์ออกแบบเดิมเราเป็นผลลัพธ์ของระยะขอบบวกความสูงบรรทัด ไม่ใช่ค่าที่เจ้านั้นประกาศไว้
- **ระยะช่องถึงแผง 4 คือค่าที่สามในห้าเจ้าใช้** Mantine และ Zag ใช้ 8
- **ไม่มีเจ้าไหนในห้าเจ้านี้ทำแผ่นเลื่อนขึ้นจากล่างบนมือถือ** Primer ใกล้สุดคือเต็มจอ อีกสองเจ้าแก้ด้วยการมี native select เป็นชิ้นแยก
- **สถานะอ่านอย่างเดียวมีจริงแค่ Mantine** ที่เหลือให้ใช้ปิดใช้งานหรือ data-readonly แทน

### 2. Ant Design 6.6.5

- **ชิ้นงาน** `[สำรวจ]` `[แหล่งรอง]` ชิ้นเดียวคือ `Select` แล้วแยกด้วย prop `mode` คือว่าง (select), `multiple` และ `tags` (multi select, tags เพิ่มค่าใหม่ได้), ส่วน `mode="combobox"` ชื่อ constant จริงคือ `SECRET_COMBOBOX_MODE_DO_NOT_USE` คือห้ามใช้ ให้ไป `AutoComplete` · เมนูคำสั่งเป็น component แยกชื่อ `Dropdown` · ญาติอีกสามตัวคือ `Cascader`, `TreeSelect`, `Transfer`
- **เกณฑ์เลือก** `[แหล่งรอง]` ตัวเลือกน้อยกว่า 5 ใช้ Radio · ต้องพิมพ์ไปด้วยใช้ AutoComplete · เป็นลำดับชั้นใช้ Cascader หรือ TreeSelect
- **แกนขนาด 3 ขั้น** `[สำรวจ]` seed ตั้ง `controlHeight: 32` แล้ว `genControlHeight.ts` คูณต่อคือ `small` เท่ากับ `controlHeight * 0.75` ได้ **24** · `middle` (ค่าเริ่มต้น) **32** · `large` เท่ากับ `controlHeight * 1.25` ได้ **40** · มี `controlHeightXS` เท่ากับ 16 แต่ Select ไม่ใช้
- **สถานะ** `[สำรวจ]` ชี้ `hoverBorderColor` เท่ากับ `colorPrimaryHover` · โฟกัสและเปิดอยู่ใช้ `activeBorderColor` เท่ากับ `colorPrimary` บวกวงนอก `activeOutlineColor` เท่ากับ `controlOutline` · ปิดใช้งานมี token แยกสำหรับ multi (`multipleSelectorBgDisabled`, `multipleItemColorDisabled`) · ผิดพลาดมี **2 ระดับ** คือ prop `status` ค่า `error` และ `warning` ซึ่งเจ้าอื่นในชุดนี้ไม่มี · **ไม่มีอ่านอย่างเดียว** ต้องเลียนด้วย `open={false}` บวก `disabled`
- **ความสูงแผง** `[สำรวจ]` `listHeight = 256` เป็นค่าเริ่มต้นใน `components/select/index.tsx` และ `listItemHeight = customListItemHeight ?? token?.controlHeight` คือแถว 32 สองค่านี้ป้อนให้ virtual list คำนวณ จึงเปลี่ยนตามใจไม่ได้
- **ระยะช่องถึงแผง** `[สำรวจ]` `rc-select/src/SelectTrigger.tsx` ตั้ง `bottomLeft` ด้วย `offset: [0, 4]` และ `topLeft` ด้วย `offset: [0, -4]` คือ **4**
- **แถวในแผง** `[สำรวจ]` `minHeight: optionHeight` ซึ่ง `optionHeight` เท่ากับ `controlHeight` คือ 32 · `optionPadding` คือสูตร `(controlHeight - fontSize * lineHeight) / 2` แนวตั้ง คำนวณได้ราว 5 และแนวนอนใช้ `controlPaddingHorizontal` · กล่องแผง `padding: paddingXXS` คือ 4 มุมโค้ง `borderRadiusLG` คือ 8 แถวใช้ `borderRadiusSM` คือ 4 · รองรับกลุ่ม OptGroup, แถวว่าง `&-empty`, ไอคอนติ๊ก, ชั้นสองของ Cascader ที่เพิ่มระยะขอบซ้ายเป็นสองเท่า · สีแถว `optionActiveBg` เท่ากับ `controlItemBgHover` และ `optionSelectedBg` เท่ากับ `controlItemBgActive` บวก `optionSelectedFontWeight` เท่ากับ `fontWeightStrong` คือแยกชี้กับเลือกแล้วด้วยทั้งสีและน้ำหนักตัวอักษร
- **พลิกและลำดับชั้น** `[สำรวจ]` ทุก placement ตั้ง `adjustY: 1` คือพลิกแกนตั้งเอง `bottomLeft` พลิกเป็น `topLeft` · `popupMatchSelectWidth` เป็น true คุมด้วย `width` ถ้าเป็น false หรือตัวเลขคุมด้วย `minWidth` แล้วเปิด `adjustX` · แผงต่อออก body โดยปริยาย เว้นแต่ตั้ง `getPopupContainer` · `zIndexPopup` เท่ากับ `zIndexPopupBase + 50`
- **การเข้าถึง** `[ตีความ]` `[แหล่งรอง]` rc-select ใส่ `role="combobox"` ที่ช่อง `role="listbox"` ที่แผง `role="option"` ที่แถว ใช้ `aria-activedescendant` ไม่ย้ายโฟกัสจริง รองรับลูกศรขึ้นลงและ Escape พิมพ์ค้นได้เมื่อเปิด `showSearch`
- **multi select** `[สำรวจ]` แท็กในช่อง ความสูงแท็กคือ `Math.min(controlHeight - 2 * paddingXXS, controlHeight - 2 * lineWidth)` คำนวณได้ **16 / 24 / 32** ตามสามขั้น · `maxTagCount` รับค่า `responsive` คือยุบส่วนเกินเป็น "+N" ตามความกว้างที่เหลือ · `maxCount` จำกัดจำนวนที่เลือกได้
- **มือถือ** `[ตีความ]` ไม่มีแผ่นเลื่อน ของแบบนั้นอยู่ในไลบรารีแยกคือ antd mobile (Picker)
- **แถบเลื่อน** `[สำรวจ]` ทำเอง ใช้ virtual list (prop `virtual` เปิดโดยปริยาย) ข้อแลกคือต้องรู้ความสูงแถวล่วงหน้า แถวสูงไม่เท่ากันจะเพี้ยน

### 3. Primer (GitHub) react 38.40.1

- **ชิ้นงาน 4 ตัว** `[สำรวจ]` `[แหล่งรอง]` `Select` คือ native `<select>` ห่อ `TextInputWrapper` บวกลูกศรวาดเอง (`ArrowIndicator`) และมีโค้ดกัน Firefox เป็นพิเศษ · `ActionMenu` คือเมนูคำสั่งที่สร้างจาก `ActionList` · `SelectPanel` คือ combobox ที่กรองได้ รองรับทั้งเดี่ยวและหลายค่า · `Autocomplete` ของรุ่นเก่า
- **เกณฑ์เลือก** `[แหล่งรอง]` SelectPanel ใช้เมื่อรายการยาวจนต้องกรอง เลือกเดี่ยวมีผลทันทีที่คลิก เลือกหลายค่ามีผลเมื่อปิดแผงหรือกดยืนยัน · Select ใช้กับรายการสั้นในฟอร์ม · ActionMenu ใช้กับคำสั่งไม่ใช่ข้อมูล
- **แกนขนาด 3 ขั้น** `[สำรวจ]` `small` คือ `min-height: var(--base-size-28)` ได้ **28** ระยะขอบตั้ง 3px นอน 8 · ค่าเริ่มต้น `min-height: var(--base-size-32)` ได้ **32** ความสูงบรรทัด 20 · `large` คือ `height: var(--base-size-40)` ได้ **40** ระยะขอบตั้ง 10 · token ชุด control มี 5 ขั้นคือ xsmall 24 (ขอบตั้ง 2), small 28 (4), medium 32 (6), large 40 (10), xlarge 48 (14) แต่ช่องกรอกใช้แค่ 3 ขั้น
- **พื้นที่กดขั้นต่ำเป็น token แยก** `[สำรวจ]` `control.minTarget` เมาส์ 16 จอสัมผัส **44** เขียนกำกับในไฟล์ token ว่าเพื่อให้ผ่าน WCAG 2.5.5 เจ้าเดียวในชุดนี้ที่ทำ
- **สถานะ** `[สำรวจ]` โฟกัส `outline: var(--borderWidth-thick) solid var(--borderColor-accent-emphasis)` บวกเปลี่ยนสีขอบ · ผิดพลาด `border-color: var(--borderColor-danger-emphasis)` บวก `outline: 2px solid` · **มีสถานะสำเร็จ** (`--bgColor-success-emphasis`) ซึ่งเจ้าอื่นไม่มี · ปิดใช้งานใช้ `--control-bgColor-disabled` และบน native select ต้องตั้ง `background-color: transparent` แก้ Firefox · **ไม่มีเปิดอยู่** เพราะแผงเป็นของระบบปฏิบัติการ สไตล์ไม่ถึง · **ไม่มีอ่านอย่างเดียว** `[ตีความ]`
- **ความสูงแผง** `[สำรวจ]` SelectPanel ไม่ตรึงตัวเลข ใช้ตัวแปร `--max-height` ที่ตั้งจาก prop `height` ของ Overlay แล้วชั้นลูกสืบทอดด้วย `height: inherit; max-height: inherit` พร้อมคอมเมนต์กำกับว่าเพื่อไม่ให้รายการสูงเกินแผง · หัวช่องกรองมี `min-height: 40px` ระยะขอบ 8
- **ระยะช่องถึงแผง** `[สำรวจ]` `[ตีความ]` `AnchoredOverlay` ตั้ง `side = 'outside-bottom'` และ `align = 'start'` ระยะส่งผ่าน `anchorOffset` ซึ่งค่าปริยายของ `anchoredPosition` คือ **4**
- **แถวในแผง** `[สำรวจ]` ไม่ตรึงความสูง ใช้ระยะขอบตามขั้น control คือค่าเริ่มต้น `padding-block: var(--control-medium-paddingBlock)` เท่ากับ 6 บวกความสูงบรรทัด 20 ได้ **32** · ขั้นเล็ก 4 ได้ **28** ขั้นใหญ่ 10 ได้ **40** · ระยะขอบนอน `--control-medium-paddingInline-condensed` คือ 8 ช่องไฟในแถว `--control-medium-gap` คือ 8 · ระยะระหว่างแถว `margin-block-start: var(--base-size-2)` คือ 2 · มุมโค้ง `--borderRadius-medium` · รองรับไอคอนนำ, ช่องติ๊ก 16 คูณ 16, คำอธิบาย (ช่องไฟ 4 หรือ 8), เส้นคั่นหนา 1 มีระยะ 8 บนล่าง, แบบ inset ที่ขยับเข้า 8 · แถวมี 4 สถานะพื้นจาก token ชุด `control-transparent-bgColor` คือ rest, hover, active, selected บวก inactive และ disabled · ไอคอนติ๊กมีการเคลื่อนไหว `checkmarkIn 80ms cubic-bezier(0.65, 0, 0.35, 1)`
- **พลิกและลำดับชั้น** `[สำรวจ]` `anchoredPosition` พลิกเองเมื่อพื้นที่ไม่พอ · prop `preventOverflow` เลือกได้ว่าจะย่อความกว้างเมื่อไม่พอหรือไม่ · แผงอยู่ใน Overlay ที่ต่อออกนอกลำดับชั้น · prop `variant` รับค่า responsive คือจอกว้างเป็น `anchored` จอแคบเป็น `fullscreen`
- **การเข้าถึง** `[สำรวจ]` `[แหล่งรอง]` ปุ่มเปิด SelectPanel ใช้ `aria-haspopup="dialog"` เพราะมีช่องกรองอยู่ข้างใน จึงไม่ใช่ listbox แท้ · `aria-labelledby` ประกอบจาก labelId บวก selectedValueId · ช่องกรองรับชื่อผ่าน prop `inputLabel` เป็น `aria-label` · ใช้ `FocusZone` **ย้ายโฟกัสจริง** ไปที่แถว ไม่ใช่ activedescendant และมี `focusOutBehavior` เลือก `wrap` หรือ `start` · native `Select` ได้คีย์บอร์ดและพิมพ์แล้วกระโดดจากระบบปฏิบัติการฟรี บวก `aria-invalid` ตาม validationStatus
- **multi select** `[สำรวจ]` ติ๊กช่องในแถว ActionList · prop `showSelectedOptionsFirst` ดันตัวที่เลือกขึ้นบน · คงค่าที่เลือกไว้ระหว่างพิมพ์กรอง · มีผลเมื่อปิดแผงหรือกดยืนยัน จึงมีปุ่ม Cancel และ Save ในโหมด modal
- **มือถือ** `[สำรวจ]` เจ้าเดียวที่ทำมาให้ ใช้ `useResponsiveValue({narrow: true, regular: false, wide: false})` บวก feature flag `primer_react_select_panel_fullscreen_on_narrow` และ prop `disableFullscreenOnNarrow` · เมื่อเต็มจอจะล็อกการเลื่อนของ body และสลับไปใช้ปุ่มกากบาทปิด
- **แถบเลื่อน** `[สำรวจ]` ของเบราว์เซอร์

### 4. Untitled UI (branch main 2026-10) ต้นทางของไฟล์ออกแบบเดิมเรา

- **ชิ้นงาน 6 ไฟล์บวกเมนูคำสั่ง** `[สำรวจ]` `select.tsx` (select) · `combobox.tsx` ติดตั้งเป็น `Select.ComboBox` (พิมพ์ค้นได้) · `multi-select.tsx` · `tag-select.tsx` (เลือกแล้วเป็นแท็ก) · `select-native.tsx` · โฟลเดอร์ `components/base/dropdown` คือเมนูคำสั่ง มี 17 แบบสำเร็จ (บัญชีผู้ใช้, คลิกขวา, เมนูที่มีช่องค้นหา) · ทั้งชุดประกอบจาก `react-aria-components`
- **เกณฑ์เลือก** `[ตีความ]` repo ไม่มีเอกสารเกณฑ์ ตัดสินจากโค้ดได้ว่ามี native select แยกไว้ให้ใช้เมื่อไม่ต้องการแผงของตัวเอง และ combobox มีป้ายคีย์ลัด `⌘K` ติดมาด้วย คือตั้งใจให้เป็นช่องค้นหาทั่วแอป ไม่ใช่ช่องในฟอร์ม
- **แกนขนาด 3 ขั้น** `[สำรวจ]` ประกาศที่ `select-shared.tsx` คือ `sm: "py-2 pl-3 pr-2.5 gap-2"` ตัวอักษร `text-sm` · `md: "py-2 px-3 gap-2"` ตัวอักษร `text-md` · `lg: "py-2.5 px-3.5 gap-2"` ตัวอักษร `text-md` ค่าเริ่มต้นคือ md
- **ความสูงช่องจริง ไม่มีการตรึงความสูงเลย** `[สำรวจ]` ความสูงเป็นผลลัพธ์ของระยะขอบบวกความสูงบรรทัด และวงขอบเป็น `ring-inset` จึงไม่บวกขนาด เมื่อแทนค่าจาก `styles/theme.css` ที่ `--text-sm` เท่ากับ 14 ความสูงบรรทัด 20 และ `--text-md` เท่ากับ 16 ความสูงบรรทัด 24 จะได้ `sm` เท่ากับ 8 บวก 8 บวก 20 คือ **36** · `md` เท่ากับ 8 บวก 8 บวก 24 คือ **40** · `lg` เท่ากับ 10 บวก 10 บวก 24 คือ **44** · ทั้ง select, combobox, multi select และ native ใช้ชุดเดียวกันหมด จึงสูงเท่ากันทั้งสี่ชิ้น · มุมโค้ง `rounded-lg` เงา `shadow-xs` วงขอบ `ring-1 ring-primary` แบบ inset
- **สถานะ มีไม่ครบ และนี่คือข้อบกพร่องที่ไฟล์เดิมเราลอกมา** `[สำรวจ]` **โฟกัสกับเปิดอยู่ใช้สไตล์เดียวกัน** เพราะเขียนรวมว่า `(isFocused || isOpen) && "ring-2 ring-brand"` คือแยกด้วยตาไม่ออกว่าแผงเปิดอยู่หรือแค่โฟกัส · ปิดใช้งานใช้ `cursor-not-allowed opacity-50` คือลดความทึบทั้งก้อน ไม่เปลี่ยนสีพื้นหรือสีขอบ · **ไม่มีสถานะชี้ที่ช่องเลย** มีแต่ในแถวของแผง · **ไม่มีสถานะผิดพลาดที่ช่อง** ความผิดพลาดไปโผล่ที่ `HintText isInvalid` ใต้ช่องเท่านั้น ขอบไม่เปลี่ยนสี · **ไม่มีอ่านอย่างเดียว**
- **ความสูงแผง** `[สำรวจ]` `popover.tsx` ตรึงเพดานต่อขนาดและเขียนคำอธิบายกำกับไว้ในโค้ดเลย คือ `sm` `max-h-56!` เท่ากับ 14rem คือ **224** · `md` `max-h-64!` เท่ากับ 16rem คือ **256** · `lg` `max-h-80!` เท่ากับ 20rem คือ **320** · ของ multi select สูงกว่าเพราะมีหัวค้นหาและท้ายปุ่ม คือ `max-h-68` **272**, `max-h-76` **304**, `max-h-92` **368**
- **ระยะช่องถึงแผง** `[สำรวจ]` `offset={4}` และ `containerPadding={0}` ทั้งใน `popover.tsx` และใน multi select คือ **4**
- **แถวในแผง** `[สำรวจ]` `select-item.tsx` แยกสองชั้นคือกรอบนอกคุมระยะ (`py-px` บวก `px-1` ที่ sm หรือ `px-1.5` ที่ md กับ lg) และกรอบในคุมพื้นหลัง (`p-2 pr-2.5` ที่ sm และ md, `p-2.5 pl-2` ที่ lg) · ความสูงแถวจึงเท่าช่องพอดีคือ **36 / 40 / 44** และระยะแถวรวมกรอบนอกคือ **38 / 42 / 46** · มุมโค้งแถว `rounded-md`
- **แถวใช้สีเดียวกันสามสถานะ** `[สำรวจ]` เขียนรวมว่า `(state.isFocused || state.isHovered || (state.isSelected && selectionIndicator !== "checkbox")) && "bg-primary_hover"` คือชี้ โฟกัส และเลือกแล้ว ได้พื้นหลังเดียวกัน แยกไม่ออกว่าแถวไหนคือค่าที่เลือกไว้ · โฟกัสด้วยคีย์บอร์ดเพิ่ม `ring-2 ring-focus-ring ring-inset`
- **แถวรองรับ** `[สำรวจ]` ไอคอนนำ (16 ที่ sm, 20 ที่ md และ lg) · อวาตาร์ขนาด xs · ข้อความหลักบวก `supportingText` · ตัวบ่งชี้เลือกได้ 3 แบบคือเครื่องหมายถูกชิดขวา ช่องติ๊ก (เลือกข้างซ้ายขวาได้) หรือไม่มี · ปิดใช้งานด้วย `opacity-50`
- **เมนูคำสั่งใช้ตัวเลขอีกชุด** `[สำรวจ]` `dropdown.tsx` กว้าง `w-62` คือ **248 ตายตัว** · แผง `py-1` · แถว `px-1.5 py-px` บวก `px-2.5 py-2` ได้สูง **36** · ข้อความ `text-sm font-semibold` · ช่องคีย์ลัด `text-xs` · เส้นคั่น `my-1 h-px` · วางที่ `placement="bottom right"`
- **พลิกและลำดับชั้น** `[สำรวจ]` `[ตีความ]` ใช้ `Popover` ของ react-aria-components ที่ `placement="bottom"` แล้วไลบรารีพลิกให้เอง โดยโค้ดเตรียมคลาสเคลื่อนไหวแยกตามด้านที่พลิกไปแล้ว เช่น `placement-top:slide-in-from-bottom-0.5` · ความกว้างแผงผูก `w-(--trigger-width)` คือเท่าช่องเสมอ และ combobox เพิ่ม ResizeObserver วัดความกว้างช่องเองอีกชั้น · react-aria ต่อแผงออกนอกลำดับชั้นให้โดยปริยาย
- **การเข้าถึง** `[ตีความ]` `[แหล่งรอง]` ได้จาก react-aria-components ทั้งชุด คือปุ่มเปิดเป็น `button` แผงเป็น `listbox` แถวเป็น `option` รองรับลูกศรขึ้นลง Escape Home End และพิมพ์แล้วกระโดด · กลไกโฟกัสของ react-aria ใช้โฟกัสจริงที่แถวสำหรับ Select และโฟกัสเสมือน (activedescendant) สำหรับ ComboBox ที่ต้องคงเคอร์เซอร์ไว้ในช่องพิมพ์ · ส่วนที่โค้ดนี้ใส่เองและทำถูกคือ `aria-hidden="true"` ให้ไอคอนทุกตัว ให้ลูกศร และให้ป้ายคีย์ลัด
- **multi select ไม่แสดงรายชื่อที่เลือก แสดงเป็นจำนวนนับ** `[สำรวจ]` คือ `${selectedCount} selected` เปิดให้แทนด้วย `selectedCountFormatter` · แผงมีสามส่วนคือหัวช่องค้นหา (`autoFocus`), รายการที่ติ๊กได้, ท้ายแผงมีปุ่ม Reset และ Select all คั่นด้วย `border-t` ระยะขอบ 12 · มีสถานะว่างที่มีไอคอนประกอบบวกปุ่มล้างคำค้น · ถ้าต้องการแท็กต้องใช้ `tag-select.tsx` ที่เป็นอีกชิ้น
- **มือถือ** `[สำรวจ]` ไม่มีแผ่นเลื่อนขึ้นจากล่าง ทางออกคือ `select-native.tsx` ที่ปล่อยให้ระบบปฏิบัติการจัดการแผงเอง · สิ่งเดียวที่ทำตามความกว้างจอคือซ่อนป้ายคีย์ลัดด้วย `hidden md:flex`
- **แถบเลื่อน** `[สำรวจ]` ของเบราว์เซอร์ คือ `overflow-y-auto` ไม่มี virtual list

### 5. Mantine 9.7.2

- **ชิ้นงาน 7 ตัวบวกฐาน** `[สำรวจ]` `Select` (มี prop `searchable` ให้พิมพ์ค้นได้) · `Autocomplete` (รับค่าที่ไม่อยู่ในรายการ) · `MultiSelect` · `TagsInput` (เพิ่มค่าใหม่ได้) · `NativeSelect` · `TreeSelect` · `Combobox` คือชุดชิ้นส่วนให้ประกอบเอง (`Target`, `Options`, `Option`, `Search`, `Header`, `Footer`, `Group`, `Empty`) ซึ่งอีก 6 ตัวสร้างทับบนนี้ · เมนูคำสั่งเป็น component แยกชื่อ `Menu`
- **เกณฑ์เลือก** `[ตีความ]` `[แหล่งรอง]` แนะนำ NativeSelect เมื่ออยากได้พฤติกรรมของระบบ เช่นบนมือถือ · Autocomplete ต่างจาก Select ตรงที่ยอมรับค่านอกรายการ · TagsInput ต่างจาก MultiSelect ตรงที่เพิ่มค่าใหม่ได้
- **แกนขนาด 5 ขั้น** `[สำรวจ]` `Input.module.css` ประกาศ `--input-height-xs: 30px` (ขอบตั้ง 5) · `sm: 36px` (6) ค่าเริ่มต้น · `md: 42px` (8) · `lg: 50px` (10) · `xl: 60px` (13) · ระยะขอบนอนไม่ตายตัวแต่เป็นสูตร `--input-padding: calc(var(--input-height) / 3)` · ช่องซ้ายขวา `calc(var(--input-height) - rem(2px))` · ไอคอนลูกศรมีแกนของตัวเอง 14 / 18 / 20 / 24 / 28
- **สถานะ ครบที่สุดในชุดนี้** `[สำรวจ]` ชี้มีที่แถวผ่าน `:where(:not([data-combobox-selected], [data-combobox-disabled]))` · โฟกัส `&:focus, &:focus-within` ตัด outline ของเบราว์เซอร์แล้วเปลี่ยนสีขอบเอง · เปิดอยู่ผ่าน `aria-expanded` ที่ `Combobox.Target` · ปิดใช้งาน `&:disabled, &[data-disabled]` ลดความทึบเป็น 0.6 บวกเปลี่ยนสีพื้นและตัวอักษร · **อ่านอย่างเดียวมี prop `readOnly` จริง** และเช็คพ่วงหลายที่ เช่นปุ่มล้างค่าโผล่เฉพาะเมื่อ `!readOnly` และแผงถูก `hidden={readOnly || disabled}` · ผิดพลาด `&[data-error]` เปลี่ยนสีขอบและสีไอคอนลูกศร · แถวมีสถานะของตัวเองคือ `[data-combobox-selected]` และ `[data-combobox-disabled]`
- **ความสูงแผง** `[สำรวจ]` `OptionsDropdown.tsx` เขียน `mah={... : (maxDropdownHeight ?? 220)}` คือค่าเริ่มต้น **220** · ยืดเต็มจอได้ด้วย `maxDropdownHeight="viewport"` ซึ่งตั้ง `[data-floating-height='viewport']` แล้วคำนวณ `calc(var(--combobox-floating-max-height, 100vh) - var(--combobox-padding) * 2)` พร้อม **ปิด middleware flip** เพราะยืดแล้วไม่ต้องพลิก
- **ระยะช่องถึงแผง** `[สำรวจ]` มาจาก `Popover` ที่ `defaultProps` ตั้ง `position: 'bottom'` และ `offset: 8` คือ **8** และถ้าเปิดลูกศรชี้จะบวกครึ่งขนาดลูกศรเข้าไปอีก
- **แถวในแผง ไม่ตรึงความสูง** `[สำรวจ]` คุมด้วยระยะขอบ 5 ขั้นคือ `xs: 4px 8px` · `sm: 6px 10px` (ค่าเริ่มต้น) · `md: 8px 12px` · `lg: 10px 16px` · `xl: 14px 20px` · ขนาดตัวอักษรแถวผูกขั้นเดียวกันผ่าน `--combobox-option-fz` มุมโค้ง `--mantine-radius-default` · กล่องแผง `--combobox-padding: 4px` และชิ้นที่ต้องกินเต็มความกว้าง (หัว ท้าย ช่องค้นหา เส้นคั่น) ใช้ `margin-inline: calc(var(--combobox-padding) * -1)` ดึงกลับออกไป · รองรับกลุ่มที่มีหัวข้อ (ตัวอักษร 0.85 เท่าของแถว), เส้นคั่นสูง 1, แถวว่าง, ไอคอนติ๊ก `height: 0.8em` เลือกข้างได้ด้วย `[data-reverse]`
- **พลิกและลำดับชั้น** `[สำรวจ]` `middlewares: { flip: true, shift: true, inline: false }` คือพลิกและเลื่อนให้พอดีจอ · `width: 'target'` กว้างเท่าช่อง · `withinPortal: true` คือ **วางนอกลำดับชั้นโดยปริยาย** · `keepMounted: true` กับ `keepMountedMode: 'display-none'` คือแผงอยู่ใน DOM ตลอดแต่ซ่อนไว้
- **การเข้าถึง** `[สำรวจ]` โค้ดเขียนกำกับไว้ตรง ๆ ว่า "Combobox uses aria-activedescendant pattern: focus stays on the target, options are highlighted via aria-activedescendant rather than DOM focus" · `Combobox.Options` คือ `role="listbox"` `Combobox.Option` คือ `role="option"` บวก `aria-selected` และ `aria-disabled` กล่องแผงเป็น `role="presentation"` · `useCombobox` มี prop `loop` ค่าเริ่มต้น **true** คือลูกศรวนจากท้ายไปหัว · เลื่อนเข้าจอด้วย `scrollIntoView({ block: 'nearest', behavior: scrollBehavior })` โดย `scrollBehavior` เริ่มต้นเป็น `'instant'` คือไม่ทำสไลด์ · พิมพ์แล้วกระโดดไม่ใช่ typeahead แบบ select แต่เป็นการกรองรายการเมื่อตั้ง `searchable`
- **multi select** `[สำรวจ]` แสดงเป็น `Pill` ใน `PillsInput` ความสูง Pill เป็นแกน 5 ขั้นของตัวเองคือ **18 / 22 / 25 / 28 / 32** มุมโค้ง `1000rem` คือแคปซูล ระยะขอบนอน `0.8em` ความสูงบรรทัดเท่าความสูง Pill พอดี · prop `hidePickedOptions` ซ่อนตัวที่เลือกแล้วออกจากรายการ · `withPillsReorder` ลากสลับลำดับได้ (ปิดเมื่อ `disabled` หรือ `readOnly`) · `withCheckIcon` เปิดโดยปริยายและ `checkIconPosition` เริ่มต้น `left` ซึ่งกลับทางกับ Untitled UI ที่ติ๊กขวา
- **มือถือ** `[ตีความ]` ไม่มีแผ่นเลื่อน ทางออกคือ `NativeSelect`
- **แถบเลื่อน** `[สำรวจ]` ทำเอง ใช้ `ScrollArea.Autosize` โดย `withScrollArea` เปิดโดยปริยาย และ CSS มีกรณี `&:has([data-mantine-scrollbar])` ที่ขยายความกว้างชดเชยแถบเลื่อนให้

### 6. Zag และ Ark UI (zag 1.46.0, ark 5.39.3) ชั้นกลไกไม่มีสไตล์

- **ชิ้นงาน 5 ตัวแยกเป็น machine คนละตัว** `[สำรวจ]` ใน `@ark-ui/react` มี `select` (รองรับ multiple ด้วย prop เดียว) · `combobox` · `menu` (มีส่วน `triggerItem` สำหรับเมนูซ้อนและ `contextTrigger` สำหรับคลิกขวา) · `listbox` (รายการที่เลือกได้โดยไม่มีแผง) · `tags-input` บวก `tree-view` และ `navigation-menu`
- **anatomy ของ select 16 ส่วน** `[สำรวจ]` `root`, `label`, `control`, `trigger`, `indicator`, `clearTrigger`, `valueText`, `positioner`, `content`, `list`, `item`, `itemText`, `itemIndicator`, `itemGroup`, `itemGroupLabel` บวก `hiddenSelect` ที่ไม่อยู่ใน anatomy แต่มีใน connect คือ native select ซ่อนไว้ให้ส่งฟอร์มได้ และ `label` ชี้ `htmlFor` ไปที่ตัวนี้
- **เกณฑ์เลือก** `[ตีความ]` ไม่มีเอกสารเกณฑ์ ตัดสินจากโค้ดได้ว่า combobox ต่างจาก select ที่มี `allowCustomValue`, `inputBehavior`, `selectionBehavior` และข้ามการประมวลผลคีย์เมื่อใช้ IME คือออกแบบมาเพื่อการพิมพ์จริงจัง
- **ตัวเลขขนาดทั้งหมด ไม่มี** `[สำรวจ]` ไม่มี CSS เลย ไม่มีแกนขนาด ไม่มีความสูงช่อง ไม่มีความสูงแผง ไม่มีความสูงแถว ทุกอย่างเป็นหน้าที่ผู้ใช้ สิ่งที่ให้มาแทนคือ data-attribute ให้เกาะสไตล์
- **สถานะเป็น data-attribute ครบ 7 อย่างรวมอ่านอย่างเดียว** `[สำรวจ]` `data-state` ค่า `open` กับ `closed` ที่ trigger และ content และค่า `checked` กับ `unchecked` ที่ item · `data-highlighted` คือแถวที่ไฮไลต์ (แทน hover) · `data-disabled`, `data-invalid`, `data-readonly`, `data-placeholder-shown`, `data-placement`, `data-side`, `data-value`
- **ระยะช่องถึงแผง ค่าปริยายต่างกันสองตัว** `[สำรวจ]` select คือ `positioning: { placement: "bottom-start", gutter: 8 }` ห่าง **8** · combobox คือ `positioning: { placement: "bottom", sameWidth: true }` ไม่ตั้งระยะแต่บังคับให้แผงกว้างเท่าช่อง
- **พลิกและลำดับชั้น** `[สำรวจ]` `[ตีความ]` ใช้ floating-ui ผ่าน `getPlacement(triggerEl, positionerEl, { defer: true, ... })` แล้วเก็บด้านที่ได้จริงไว้ใน `currentPlacement` เพื่อส่งออกเป็น `data-placement` และ `data-side` ให้สไตล์ตาม การพลิกจึงเป็นค่าปริยายของ floating-ui · การวางนอกลำดับชั้นเป็นทางเลือก ต้องครอบ `<Portal>` ของ Ark เอง · มีชิ้น `positioner` แยกจาก `content` ชัดเจนเพื่อไม่ให้สไตล์ของเราไปทับค่าตำแหน่ง
- **การเข้าถึงของ select** `[สำรวจ]` trigger ใช้ `role="combobox"` (ไม่ใช่ button) บวก `aria-controls`, `aria-expanded`, `aria-haspopup="listbox"`, `aria-invalid`, `aria-required`, `aria-labelledby` · content ใช้ `role: composite ? "listbox" : "dialog"` คือถ้าแผงมีของอื่นปนจะกลายเป็น dialog · `aria-activedescendant` อยู่ที่ content เมื่อเป็น composite และย้ายไปที่ list เมื่อไม่ใช่ · `aria-multiselectable` ใส่เมื่อ multiple · item ใช้ `role="option"` บวก `aria-selected` และ `aria-disabled`
- **การเข้าถึงของ combobox** `[สำรวจ]` input ใช้ `role="combobox"` บวก `aria-autocomplete` ค่า `both` หรือ `list`, `aria-expanded`, `aria-controls`, `aria-activedescendant` · ปิดตัวช่วยของเบราว์เซอร์ครบชุดคือ `autoComplete="off"`, `autoCorrect="off"`, `autoCapitalize="none"`, `spellCheck="false"` · trigger ใช้ `aria-haspopup` ค่า `listbox` หรือ `dialog` · itemGroup ใช้ `role="group"` บวก `aria-labelledby`
- **โฟกัสเสมือนทั้งสองตัว** `[สำรวจ]` โฟกัสอยู่ที่ trigger หรือ input ตลอด แล้วเฝ้าดูการเปลี่ยน attribute ด้วย `observeAttributes(inputEl, { attributes: ["aria-activedescendant"], callback })` เพื่อสั่งเลื่อนเข้าจอ · ตอนปิดคืนโฟกัสด้วย `dom.getTriggerEl(scope)?.focus({ preventScroll: true })` · มี action `announceHighlightedItem` ยิงข้อความเข้า live region เฉพาะบนเครื่อง Apple เพราะ VoiceOver ไม่อ่าน activedescendant ให้
- **คีย์บอร์ดของ select** `[สำรวจ]` ที่ trigger ตอนแผงยังปิด ลูกศรขึ้นลงซ้ายขวาเปลี่ยนค่าทีละตัวโดยไม่เปิดแผง (`TRIGGER.ARROW_UP`, `TRIGGER.ARROW_DOWN`, `TRIGGER.ARROW_LEFT`, `TRIGGER.ARROW_RIGHT`) ยกเว้น alt พร้อมลูกศรลงจะเปิด · Home และ End ที่ trigger กระโดดค่าแรกค่าสุดท้ายโดยไม่เปิดแผง · Enter เปิดหรือยืนยัน · Space ยืนยัน แต่ถ้ากำลังพิมพ์ค้นอยู่จะนับเป็นตัวอักษรเว้นวรรค (`isTypingAhead ? "TRIGGER.TYPEAHEAD" : "TRIGGER.ENTER"`) · ที่ content ลูกศรขึ้นลง Home End Enter Space ทำงานแบบเดียวกันในแผง · Tab ถูกกันถ้าไม่ใช่ tab ที่ถูกต้อง (`isValidTabEvent`) · Escape จัดการผ่าน `trackDismissableElement` ที่ส่ง `CLOSE` พร้อมธง `restoreFocus`
- **พิมพ์แล้วกระโดดใช้ได้ทั้งตอนแผงปิดและเปิด** `[สำรวจ]` ผ่าน `collection.search(event.key, { state: refs.get("typeahead"), currentValue })` และตัวจับเวลาสะสมตัวอักษร `keysSoFar` ที่มี **timeout เริ่มต้น 350ms** ใน `@zag-js/dom-query/typeahead.ts`
- **ไฮไลต์ตอนเปิดแผง** `[สำรวจ]` ถ้ามีค่าที่เลือกไว้แล้วจะไฮไลต์ตัวนั้น (`highlightFirstSelectedItem`) · เปิดด้วยลูกศรลงหรือ Enter ไฮไลต์ตัวแรก · เปิดด้วยลูกศรขึ้นไฮไลต์ตัวท้าย
- **คีย์บอร์ดของ combobox** `[สำรวจ]` ลูกศรลงเปิดหรือเลื่อน alt พร้อมลูกศรลงเปิดเฉย ๆ alt พร้อมลูกศรขึ้นปิด · Home และ End กันค่าเริ่มต้นของเบราว์เซอร์เฉพาะตอนแผงเปิด คือตอนปิดยังใช้กระโดดหัวท้ายข้อความได้ตามปกติ · Enter เลือก และถ้าแถวนั้นเป็นลิงก์จะพาไปตามลิงก์ · Escape ปิดพร้อม `preventDefault` · **ข้ามการประมวลผลทั้งหมดเมื่อกำลัง composing** คือตอนใช้ IME ซึ่งสำคัญกับการพิมพ์ภาษาไทยด้วยตัวช่วย
- **ค่าปริยายอื่นของ combobox** `[สำรวจ]` `loopFocus: true` (ต่างจาก select ที่เป็น **false**) · `openOnClick: false` · `openOnChange: true` · `allowCustomValue: false` · `inputBehavior: "none"` · `selectionBehavior` เป็น `replace` เมื่อเลือกเดี่ยวและ `clear` เมื่อเลือกหลายค่า · `closeOnSelect` เท่ากับไม่ใช่ multiple
- **multi select** `[สำรวจ]` ไม่กำหนดการแสดงผล ให้แต่กลไกคือ `aria-multiselectable`, `data-state` ของแต่ละแถว และ `closeOnSelect` ที่ไม่ปิดเองเมื่อ multiple · ถ้าต้องการแบบแท็กมี machine `tags-input` แยกไว้
- **มือถือ** `[ตีความ]` ไม่มีแผ่นเลื่อนขึ้นจากล่าง ถ้าต้องการต้องประกอบจาก machine dialog เอง
- **แถบเลื่อน** `[สำรวจ]` ของเบราว์เซอร์ แต่เตรียมตะขอไว้ต่อ virtual list ด้วย `scrollToIndexFn` ซึ่งจะถูกเรียกแทน `scrollIntoView` ถ้าใส่มา · effect เลื่อนเข้าจอยังเช็ค interaction modality คือไม่เลื่อนตามเมื่อผู้ใช้กำลังใช้เมาส์ชี้

### 7. Design implications สำหรับ NTGDS

| เรื่อง | ข้อเสนอจากหลักฐาน |
|---|---|
| แกนขนาด | ใช้สูตรความสูงกลางของระบบ (base 24 step 8) คือ 24, 32, 40, 48, 56 ซึ่งคลุมช่วงของ Ant (24, 32, 40) และ Primer (28, 32, 40) ได้เกือบหมด ส่วน 36, 40, 44 ของ Untitled UI ไม่ได้มาจากแกนที่ประกาศไว้ จึงไม่ควรยกมาทั้งชุด |
| ความสูงช่อง | ตรึงความสูงต่อขั้นแล้วคำนวณระยะขอบย้อนกลับ เพราะวิธีของ Untitled UI และ Mantine ที่ปล่อยให้ความสูงบรรทัดคุมทำให้ตัวเลขไม่ลงตัวกับสูตรของเรา และตรวจด้วยการบวกกลับไม่ได้ |
| ระยะช่องถึงแผง | 4 ตามสามในห้าเจ้า คือ Ant, Primer, Untitled UI |
| ความสูงแผง | ตรึงเพดานต่อขั้นแบบ Untitled UI (224, 256, 320) ดีกว่าค่าเดียวแบบ Ant (256) หรือ Mantine (220) เพราะแถวสูงไม่เท่ากันในแต่ละขั้น และควรให้จำนวนแถวที่เห็นลงตัว ไม่ตัดแถวครึ่ง |
| สถานะ | ต้องครบ 7 สถานะ อย่าลอก Untitled UI ที่รวมโฟกัสกับเปิดอยู่เป็นสไตล์เดียว ไม่มีชี้ที่ช่อง และไม่มีผิดพลาดที่ขอบช่อง ให้ยึด Mantine ที่ครบที่สุดรวมอ่านอย่างเดียว และพิจารณายืมสองระดับของ Ant คือ error กับ warning |
| แถวในแผง | แยกสีชี้ โฟกัส และเลือกแล้วให้ครบสามสี อย่าลอก Untitled UI ที่ใช้สีเดียวทั้งสามสถานะ (ข้อบกพร่องแบบเดียวกับที่เจอตอนทำตัวแบ่งหน้า) และยืมวิธีของ Ant ที่เพิ่มน้ำหนักตัวอักษรให้ตัวที่เลือกแล้วด้วย |
| multi select | แท็กในช่องแบบ Ant กับ Mantine อ่านง่ายกว่าตัวนับแบบ Untitled UI เมื่อเลือกไม่เกิน 3 ถึง 4 ค่า ให้ทำแท็กเป็นหลักแล้วยุบส่วนเกินเป็น "+N" ตามความกว้างที่เหลือแบบ `maxTagCount="responsive"` และผูกความสูงแท็กเป็นสูตรของความสูงช่อง (Ant ใช้ ความสูงช่อง ลบ 8) ไม่ใช่แกนแยกแบบ Mantine |
| ตัวบ่งชี้การเลือก | เลือกข้างแล้วคงที่ทั้งระบบ ตอนนี้ Untitled UI ติ๊กขวา Mantine ติ๊กซ้าย ถ้าของเรามีช่องติ๊กต้องใช้ของ DS ชุดเดียว |
| การเข้าถึง | ยึด Zag เป็นรายการตรวจ คือ trigger เป็น `role="combobox"` บวก `aria-expanded` และ `aria-haspopup` ส่วนแผงเป็น `listbox` หรือ `dialog` ตามของที่อยู่ข้างใน ใช้ `aria-activedescendant` ไม่ย้ายโฟกัสจริง และต้องมี live region ชดเชยให้ VoiceOver |
| พิมพ์แล้วกระโดด | ต้องทำงานทั้งตอนแผงปิดและเปิด timeout 350ms ตามของ Zag และ Space ต้องนับเป็นตัวอักษรถ้ากำลังพิมพ์ค้นอยู่ |
| ภาษาไทย | ต้องข้ามการประมวลผลคีย์เมื่อกำลัง composing (IME) ตามที่ Zag ทำ ไม่มีเจ้าอื่นในชุดนี้พูดถึงเรื่องนี้ในโค้ด และเป็นจุดที่ผู้ใช้ไทยเจอปัญหาจริง |
| มือถือ | ไม่มีเจ้าไหนทำแผ่นเลื่อนขึ้นจากล่าง ทางที่ผ่านการใช้งานจริงคือเต็มจอแบบ Primer หรือมี native select เป็นชิ้นแยกแบบ Untitled UI กับ Mantine ซึ่งได้แผงของระบบปฏิบัติการฟรีและผ่านพื้นที่กด 44 โดยปริยาย |
| พื้นที่กด | Primer เป็นเจ้าเดียวที่ทำ token แยกคือ `control.minTarget` เมาส์ 16 จอสัมผัส 44 ควรยืมแนวคิดนี้ แล้วเขียนกำกับว่าขั้น 24 กับ 32 ห้ามใช้บนหน้าที่คนแตะด้วยนิ้ว |
| แถบเลื่อน | ใช้ของเบราว์เซอร์ตามสามในห้าเจ้า เว้นกรณีรายการยาวหลักพันที่ควรทำ virtual list แบบ Ant ซึ่งแลกมาด้วยการต้องตรึงความสูงแถวให้เท่ากันทุกแถว |

### 8. Sources

- `github.com/ant-design/ant-design` branch master ไฟล์ `components/select/style/index.ts`, `select/style/token.ts`, `select/style/dropdown.ts`, `select/index.tsx`, `theme/themes/seed.ts`, `theme/themes/shared/genControlHeight.ts`, `_util/placements.ts` และ `github.com/react-component/select` ไฟล์ `src/SelectTrigger.tsx` และเอกสาร `ant.design/components/select`
- `github.com/primer/react` branch main ไฟล์ `packages/react/src/Select/Select.tsx`, `Select/Select.module.css`, `internal/components/TextInputWrapper.module.css`, `ActionList/ActionList.module.css`, `SelectPanel/SelectPanel.tsx`, `SelectPanel/SelectPanel.module.css`, `AnchoredOverlay/AnchoredOverlay.tsx` และ `github.com/primer/primitives` ไฟล์ `src/tokens/functional/size/size.json5`, `size-fine.json5`, `size-coarse.json5` และเอกสาร `primer.style/components/select-panel`
- `github.com/untitleduico/react` branch main ไฟล์ `components/base/select/select.tsx`, `select-shared.tsx`, `popover.tsx`, `select-item.tsx`, `combobox.tsx`, `multi-select.tsx`, `select-native.tsx`, `components/base/dropdown/dropdown.tsx`, `styles/theme.css`, `styles/typography.css`
- `github.com/mantinedev/mantine` branch master ไฟล์ `packages/@mantine/core/src/components/Input/Input.module.css`, `Combobox/Combobox.module.css`, `Combobox/Combobox.tsx`, `Combobox/OptionsDropdown/OptionsDropdown.tsx`, `Combobox/ComboboxOptions/ComboboxOptions.tsx`, `Combobox/ComboboxOption/ComboboxOption.tsx`, `Combobox/use-combobox/use-combobox.ts`, `Select/Select.tsx`, `MultiSelect/MultiSelect.tsx`, `TagsInput/TagsInput.tsx`, `Autocomplete/Autocomplete.tsx`, `NativeSelect/NativeSelect.tsx`, `Pill/Pill.module.css`, `Popover/Popover.tsx`
- `github.com/chakra-ui/zag` branch main ไฟล์ `packages/machines/select/src/select.connect.ts`, `select.machine.ts`, `select.anatomy.ts`, `packages/machines/combobox/src/combobox.connect.ts`, `combobox.machine.ts`, `combobox.anatomy.ts`, `packages/machines/menu/src/menu.anatomy.ts`, `packages/utilities/dom-query/src/typeahead.ts` และ `github.com/chakra-ui/ark` รายการ `packages/react/src/components`
