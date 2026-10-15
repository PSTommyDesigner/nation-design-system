---
title: "Ownership Model ในการจัดโครงสร้าง Design System"
description: "Research ว่า หลัก Ownership ในวงการ DS มีกี่สำนัก เจ้าใหญ่ใช้แบบไหน ใครรับผิดชอบส่วนไหน คุม component ที่โตขึ้นเรื่อย ๆ ยังไง และ NTGDS (multi-brand) ควรต่อยอดจาก Atomic Design อย่างไร"
research_date: "2026-08-19"
scope: "19 องค์กร Primer Carbon Atlassian Guardian BBC News UK FT Origami Vox Schibsted Warp Bloomberg NYT Spotify Salesforce Adobe Polaris Fluent 2 Paste Gestalt"
status: "draft รอ user รีวิว ค้นครบตามขอบเขตที่วางไว้แล้ว (ภาคแรกถึงภาคห้า)"
owner: "ux-researcher"
---

# Ownership Model ในการจัดโครงสร้าง Design System

> เอกสารวิจัย ไม่ใช่ข้อสั่งการ ทุกข้ออ้างมี URL กำกับ ข้อไหนหาหลักฐานสาธารณะไม่เจอ เขียนระบุไว้ตรง ๆ
> เขียนเพื่อตอบโจทย์เดียว: **NTGDS ควรเลิกใช้ Atomic Design ไปใช้ Ownership แทนหรือไม่**
>
> **เอกสารแบ่ง 2 ภาค** ภาคแรก §1 ถึง §9 = โมเดล ownership มีกี่สำนัก เจ้าใหญ่ใช้แบบไหน ควรต่อยอดยังไง **ภาคสอง §10 ถึง §13** = เจาะลึกกว่านั้นว่า **ใครรับผิดชอบส่วนไหน** และ **จัดการ component ที่โตขึ้นเรื่อย ๆ ยังไง** พร้อมตัวเลขจริง

---

## สรุปผู้บริหาร (อ่านก่อน)

**1. "Ownership" ไม่ใช่คำเดียวความหมายเดียว** จากการค้นพบว่ามี **3 สำนักหลัก + 2 สำนักรอง** ที่ใช้คำนี้คนละเรื่องกันสิ้นเชิง

| สำนัก | ตอบคำถามว่า | ตัวแทน |
|---|---|---|
| **A. Ownership เชิงสถาปัตยกรรม** (architecture) | component ตัวนี้ **อยู่ชั้นไหน ใครมีสิทธิ์แก้** | Brad Frost (ecosystem/recipes) Nathan Curtis (design system tiers) Spotify Encore IBM Carbon |
| **B. Ownership เชิง component boundary** | component ตัวนี้ **เป็นเจ้าของ style/state อะไร และเปิด API ให้แก้แค่ไหน** | Nathan Curtis (component contracts) Salesforce SLDS 2 styling hooks Spotify (config/slots/custom) |
| **C. Ownership เชิง governance** | **ใครตัดสินใจ** ใครรีวิว ใคร contribute ได้ | Nathan Curtis (solitary/centralized/federated) Atlassian Shopify Polaris |
| D. Ownership เชิง lifecycle (สำนักรอง) | ของชิ้นนี้ **โตพอจะย้ายเจ้าของหรือยัง** | GitHub Primer (alpha/beta/stable) Carbon Labs |
| E. Ownership เชิง org topology (สำนักรอง ยืมมาจากวิศวกรรม) | **ทีมถูกจัดอย่างไร** สถาปัตยกรรมจะออกมาแบบนั้น | Conway's Law Team Topologies |

**2. คำตอบตรง ๆ ของคำถามหลัก: ไม่ใช่การ "แทนที่" Atomic Design** จากหลักฐานทั้งหมด **ไม่พบเจ้าใหญ่รายใดที่ทิ้ง Atomic Design แล้วเอา Ownership มาแทนในระนาบเดียวกัน** เพราะสองเรื่องนี้ **ตอบคนละคำถาม**

- Atomic Design ตอบว่า *"ของชิ้นนี้ประกอบจากอะไร ซับซ้อนแค่ไหน"* (แกน composition)
- Ownership ตอบว่า *"ของชิ้นนี้ใครดูแล เปลี่ยนได้เร็วแค่ไหน"* (แกน pace + สิทธิ์)

สองแกนนี้ **ตั้งฉากกัน** ใช้ร่วมกันได้ และเจ้าใหญ่ที่มีหลายแบรนด์ล้วนใช้ร่วมกัน

**3. ข้อเสนอสำหรับ NTGDS: ทำ hybrid ไม่ต้องรื้อ Atomic** คงโครง Atomic เดิม 51 หน้าไว้ (มันคือแกน composition ที่ใช้งานได้อยู่) แล้ว **เพิ่มแกน ownership เป็นมิติที่สอง** ในรูป
- **ชั้นเอกสาร/Figma:** เพิ่มป้าย tier ให้ component (core / brand recipe / product local) ไม่ใช่ย้ายหน้า
- **ชั้น token:** ปัจจุบัน tier base → semantic → component ถูกทางแล้ว ownership ไม่ทำให้ต้องเปลี่ยนชื่อ token แต่ทำให้ต้องเพิ่ม **brand layer** ระหว่าง base กับ semantic
- **ชั้นคน:** ตอนนี้ NTGDS เป็น **solitary/centralized** โดยพฤตินัย (คนเดียว + agent) ยังไม่ถึงจุดที่ federated จะคุ้ม

**4. สิ่งที่ต้องระวัง** สำนัก A มีค่าใช้จ่ายเชิงองค์กรสูงมาก Brad Frost เตือนตรง ๆ ว่าอย่าเพิ่มชั้นก่อนมีความต้องการจริง ([bradfrost.com](https://bradfrost.com/blog/post/the-design-system-ecosystem/)) และ Nathan Curtis ระบุว่า federated model ต้องการ "องค์กรใหญ่ที่มี design talent ระดับสูงกระจายหลายโปรดักต์" ([eightshapes.com](https://eightshapes.com/articles/team-models-for-scaling-a-design-system/))

---

## 1. นิยามแต่ละสำนัก

### 1.A Ownership เชิงสถาปัตยกรรม (architectural / structural ownership)

**นิยาม:** จัดกลุ่ม component ตาม **ใครเป็นเจ้าของและเปลี่ยนได้เร็วแค่ไหน** แทนที่จะจัดตามความซับซ้อนของโครงสร้าง

#### A1. Brad Frost "The Design System Ecosystem" (โมเดล 5 ชั้น)

Brad Frost ผู้คิด Atomic Design เอง เป็นคนเสนอโมเดลนี้ ([bradfrost.com/blog/post/the-design-system-ecosystem/](https://bradfrost.com/blog/post/the-design-system-ecosystem/))

| ชั้น | เจ้าของ | เนื้อหา | จำเป็น? |
|---|---|---|---|
| 1. Core design system | ทีม design system | token icon UI component (Figma library, Web Components) | บังคับ |
| 2. Technology-specific | ทีมที่ทำ stack นั้น | React/Angular/Vue wrapper iOS/Android | optional |
| 3. **Recipe** | **ทีมโปรดักต์ / business unit / sub-brand** | UI pattern ที่ปรุงจาก ingredient ของ core | optional |
| 4. Smart component | ทีมที่ดูแล service ข้างหลัง | form handling payment data table | optional |
| 5. Product | ทีมโปรดักต์ | เว็บ/แอปจริง | บังคับ |

คำที่สำคัญที่สุดสำหรับ Nation คือชั้น **Recipe** ซึ่ง Frost อธิบายว่า

> "The recipe layer serves as an important pressure release valve for the UI ecosystem."

> "This layer provides individual business units, sub-brands, product families, or products with important agency and autonomy over their domain while still adhering to the standards defined by the core design system."

และเหตุผลที่ต้องมีชั้นนี้ ([bradfrost.com/blog/post/the-art-of-design-system-recipes/](https://bradfrost.com/blog/post/the-art-of-design-system-recipes/))

> "The core contains common components, patterns, principles, and conventions that are to be shared across an entire organization" ในขณะที่ "recipes on the other hand contain UI solutions that may only apply to a specific product, product family, or brand."

ชั้น recipe ยังทำหน้าที่เป็น **incubator** ด้วย: "The design system team can monitor these recipes and decide to 'graduate' a recipe component into the core design system if it proves to be super successful." แต่ Frost เตือนว่า "some component recipes might become core design system candidates, while others will only ever remain as product-specific recipes"

**แนวคิด pace layering** เป็นแกนของโมเดลนี้: ชั้นนอกเปลี่ยนเร็ว ชั้นในเปลี่ยนช้า "fast layers innovate and slow layers stabilize"

**คำเตือนที่ Frost ย้ำ:** "a design system architecture to be only as complex as it needs to be, and add additional layers or complexity only when real needs arise" และปิดท้ายว่า "Design systems are less about assets and their relationships to one another, but more about people and their relationships to one another"

#### A2. Nathan Curtis "Design System Tiers"

([eightshapes.com/articles/design-system-tiers/](https://eightshapes.com/articles/design-system-tiers/)) เสนอ tier ที่ **นิยามด้วยสิทธิ์แก้ไข + เกณฑ์คุณภาพ** ตรง ๆ

| Tier | ขอบเขต | เกณฑ์คุณภาพ | สิทธิ์แก้ไข |
|---|---|---|---|
| **Core** | ทุกหน่วยธุรกิจ | ผ่าน a11y review เต็ม รองรับ S/M/L ทำงานได้ทุกพื้นหลัง (white/light/dark/black/brand) รองรับ custom theming, analytics, i18n | "only core team members (and key partners) have edit access" |
| **Across groups** | ข้ามหน่วยธุรกิจ | responsive BEM semantic versioning changelog encapsulate style ผูก design token unit + visual regression test | ทีมที่เกี่ยวข้อง |
| **Within group** | ในหน่วยธุรกิจเดียว | ผ่าน browser check + lint แก้ a11y เท่าที่เกี่ยวกับตัวเอง สอดคล้อง design language | "edit privileges limited to designers in that business unit plus the core team" |

Curtis บอกหลักการกระจายสิทธิ์ว่า tier ล่าง "more people need more open permissions to contribute, extend, and maintain assets" และการเลื่อนชั้นดูจาก "how widespread the feature will be used across business units"

> **จุดที่ตรงกับ Nation มาก:** Curtis ยกตัวอย่างการทำ kit ชั้นที่สองแยกตาม experience (Products, Account, Gifting, Checkout) ที่ "extend components like cards and forms with assets only relevant to their team, while every kit is visible to the entire design community but edit privileges are limited to designers in specific business units plus the core team" นี่คือรูปแบบเดียวกับ "6 เว็บแบรนด์ย่อยต่อยอด article-card ของตัวเอง"

#### A3. ของจริงในอุตสาหกรรม

**Spotify Encore** จัดเป็นวงแหวน (radial) 3 ชั้น ([designsystems.com](https://www.designsystems.com/how-spotifys-design-system-goes-beyond-platforms/))

1. **Encore Foundation** ค่าฐานร่วม (สี typography token)
2. **Encore Web / Encore Mobile** subsystem ต่อแพลตฟอร์ม ใช้ foundation ร่วมกัน
3. **Local design systems** ระบบเฉพาะทีม (Creator, Ads, Consumer)

> "If we think of our various subsystems as radiating from our core foundational system, each increasingly specialized and divergent from that center..."

คติของทีมคือ **"Unity in design, diversity in thought"** โดย Encore Design Systems Team ดูแล foundation + core component, Platform Teams (iOS/Android/Web) ร่วมนิยาม component, Product Teams implement ใน local system

**IBM Carbon** แยกเป็นระบบลูกที่มีเจ้าของคนละทีม ([carbondesignsystem.com](https://preview.carbondesignsystem.com/getting-started/about-carbon) [carbondesignsystem.com/all-about-carbon/the-carbon-ecosystem/](https://carbondesignsystem.com/all-about-carbon/the-carbon-ecosystem/))

| ระบบ | เจ้าของ | ความสัมพันธ์กับ core |
|---|---|---|
| **Carbon Core** | IBM funds and develops (open source) | ฐาน universal |
| **Carbon for Products** | ทีม IBM เฉพาะ (designer + dev + PM) + contributor จากทีมซอฟต์แวร์ | "extends Carbon Core with additional components, styling, and guidance specifically for software product use cases" และ "not a replacement for Core, but a specialized layer on top of it" |
| **Carbon for IBM.com** | ฝั่ง marketing / corporate digital | ระบบแยก มาตรฐานของโดเมนนั้น |
| Carbon for Cloud / AEM / Salesforce | community-maintained | "remain grounded in the fundamentals that Carbon Core provides" |
| **Carbon Labs** | ชุมชน IBMers | พื้นที่ incubation ที่ยังไม่ผ่าน definition of done |

**GitHub Primer** แยกเป็นระบบคนละใบตาม **ผู้ใช้ปลายทาง** ไม่ใช่ตามความซับซ้อน: Primer Product UI สำหรับสร้างตัวโปรดักต์ GitHub และ **Primer Brand** สำหรับเว็บการตลาด/แบรนด์ ([primer.style](https://primer.style/) [primer.style/brand](https://primer.style/brand/) [github.com/primer/brand](https://github.com/primer/brand))

---

### 1.B Ownership เชิง component boundary

**นิยาม:** component แต่ละตัวเป็นเจ้าของ style/state/logic ของตัวเอง มี API contract ชัดเจน คนนอกแก้ได้เฉพาะผ่านช่องที่เปิดไว้ ไม่ใช่ override ทะลุเข้าไป

#### B1. Component Contract (Nathan Curtis)

([nathanacurtis.substack.com/p/component-contracts-and-schemas](https://nathanacurtis.substack.com/p/component-contracts-and-schemas))

> "A UI component contract is an artifact that centralizes design intent in one place so that it can be implemented, verified and evolved across implementations."

> "A schema is the model a contract is written in. It defines what and how to define a component while deliberately saying nothing about any component in particular."

จุดสำคัญเรื่อง ownership คือ **ไม่มีแพลตฟอร์มไหนเป็นเจ้าของ contract คนเดียว**

> "In a multi-platform design system, React, iOS, Android, Web Components and yes even Figma are all parties to that contract."

> "A definition biased to one party's point-of-view is testimony, not a contract."

มีความพยายามทำเป็น open spec ด้วย ([ds-contracts-spec.pages.dev](https://ds-contracts-spec.pages.dev/)) โดยนิยาม contract เป็น JSON ที่มีเวอร์ชัน ระบุ props + ค่าที่ยอมรับได้, anatomy, token binding, slot constraint, accessibility semantics และ event

#### B2. Styling hooks (Salesforce SLDS 2)

Salesforce แปลง ownership boundary ให้เป็น **ชื่อ CSS variable ตรง ๆ** ([developer.salesforce.com](https://developer.salesforce.com/docs/platform/lwc/guide/create-components-css-custom-properties.html) [salesforce.com/blog/what-is-slds-2/](https://www.salesforce.com/blog/what-is-slds-2/))

| prefix | ขอบเขตความเป็นเจ้าของ |
|---|---|
| `--slds-g-*` | **global** แก้แล้วกระทบทุก component ("Use global hooks to make a change across all the components you are using") |
| `--slds-c-*` | **component** แก้แล้วกระทบเฉพาะ component นั้น ("to apply a thicker border to a single button... The change won't affect buttons in other components") |

SLDS 2 "separates the structure from the visual design using styling hooks" ทำให้ CSS architecture "decoupled from Salesforce's default visual style"

> **หมายเหตุตรงไปตรงมา:** เอกสาร Salesforce ระบุว่า "SLDS 2 doesn't yet support component-level styling hooks" คือ pattern ประกาศแล้วแต่ยังไม่ครบทุก component

#### B3. ระดับการเปิดให้แก้ (Spotify)

Spotify Engineering นิยาม 3 ระดับที่ component ยอมให้ผู้ใช้เข้ามาเป็นเจ้าของ ([engineering.atspotify.com](https://engineering.atspotify.com/2023/05/multiple-layers-of-abstraction-in-design-systems))

| ระดับ | นิยามตามต้นฉบับ |
|---|---|
| **Config** | "Passing in just data to props. Good for standard cases (most abstractions)." |
| **Slots** | "Passing in subcomponents to props. Good for small modifications" |
| **Custom** | "We provide just the base. Subcomponents and additional styles are managed by the customer. Good for complex cases" |

และใช้ข้อมูลจริงตัดสินใจ: "Utilizing analytics on our slot pattern, we can keep tabs on what props are overridden most often" โดยสรุปว่า "a 'this versus that' approach simply won't do. We need aspects of both customization and configuration, working together."

#### B4. Encapsulation ระดับเทคนิค

Web Components + Shadow DOM ให้ CSS encapsulation จริง คนนอกแก้ได้เฉพาะผ่าน CSS Custom Properties ที่ประกาศเป็น public API ([coryrylan.com](https://coryrylan.com/blog/style-states-with-web-components-and-css-custom-properties)) ซึ่งเป็นเหตุผลที่ Frost เลือก Web Components เป็น core layer: "interoperable with any web framework or technology, they're lightweight, they're themeable, and they're self-contained" ([bradfrost.com](https://bradfrost.com/blog/post/the-design-system-ecosystem/))

---

### 1.C Ownership เชิง governance

**นิยาม:** ใครมีอำนาจตัดสินใจว่าอะไรเข้าระบบ ใครรีวิว ใคร contribute ได้

#### C1. โมเดล 3 แบบของ Nathan Curtis (ต้นตำรับ)

([eightshapes.com/articles/team-models-for-scaling-a-design-system/](https://eightshapes.com/articles/team-models-for-scaling-a-design-system/) ต้นฉบับ [medium.com/eightshapes-llc](https://medium.com/eightshapes-llc/team-models-for-scaling-a-design-system-2cf9d03be6a0))

| โมเดล | นิยาม | ข้อดี | ข้อเสีย | เหมาะเมื่อ |
|---|---|---|---|---|
| **Solitary** | "A solitary model sees a one team make a system available, but with efforts focused primarily on that team's needs" | ได้ของ production-grade ให้ทีมที่ไม่มีกำลัง ทีมเจ้าของจัดลำดับงานตัวเองได้อิสระ | ทีมที่ต้องการต่างออกไปเล็กน้อยไม่ถูกรับใช้ ความต้องการของคนอื่นกลายเป็นเรื่องกวน ทำให้แต่ละที่ใช้ระบบแตกกัน | ระยะเริ่มต้น หรือทีมอื่นต้องการเหมือนกันแทบ 100% |
| **Centralized** | "A single, central design team produces and supports a system used by others as a part of their job" | กระจายภาษาเดียวกันข้าม portfolio ไม่ลำเอียงเข้าข้างโปรดักต์ใด ขยาย library เป็นระบบได้ | ขาด context จริงของโปรดักต์ มีอำนาจน้อยในการดึงคนมามีส่วนร่วม ตำแหน่งในองค์กรเปราะ | องค์กรที่ต้องการความสม่ำเสมอข้ามโปรดักต์ที่ไม่เชื่อมกัน และมีงบจ้างทีมประจำ |
| **Federated** | ตัวแทน designer จากหลายทีมตัดสินใจร่วมกันโดยยังทำงานโปรดักต์อยู่ | ชอบธรรมข้ามแพลตฟอร์ม/สายธุรกิจ ลดภาพลำเอียง สร้าง evangelist หลายคน | ตัดสินใจซับซ้อน มี allegiance แข่งกัน คนอาจมาไม่สม่ำเสมอ ต้องมีวินัยเรื่องเอกสาร/สื่อสารสูง | องค์กรใหญ่ที่มี design talent สูงหลายโปรดักต์ |

คำที่ Curtis ใช้อธิบาย federated: *"We need our best designers on our most important products to work out what the system is and spread it out to everyone else. Without quitting their day jobs on product teams."*

**ข้อสังเกตสำคัญ:** แม้จะ federated ก็ยังต้องมีแกนกลาง "a federated team needs a centralized component of staff dedicated enough to the cause"

**หลักตอบแทน (reciprocity)** ที่ Curtis เสนอ: "the more that peripheral designers would engage and embrace the mission, the more the core team would be tolerant of divergent ideas"

#### C2. ของจริง

| องค์กร | โมเดลตามหลักฐานหน้าทางการ | หลักฐาน |
|---|---|---|
| **Atlassian** | **Centralized + contribution แบบมีประตู** ไม่ใช่ federated เต็มรูป: "Contributions are only open to Atlassians" รับเฉพาะ fixes ("bugs in the code, erroneous Figma library components, or confusing documentation") และ small enhancements (เช่นเพิ่ม icon) **ไม่รับ** major enhancement ที่ต้อง "system-wide coordination" และ "new components or patterns, such as data visualization" ยอมรับเองว่า "it is currently difficult to contribute to the design system" | [atlassian.design/contribution](https://atlassian.design/contribution) |
| **GitHub Primer** | Core team ตัดสินใจโดยฟังทีมโปรดักต์: "Primer maintainers will decide if a component should be upstreamed using input from feature teams" | [primer.style/product/contribute/adding-new-components/](https://primer.style/product/contribute/adding-new-components/) |
| **IBM Carbon** | Centralized ที่เปิด open source: "Carbon is funded and developed by IBM to meet the company's business needs, but it is made open source for anyone to use and contribute to" + Carbon Labs เป็น incubation ของชุมชน | [carbondesignsystem.com](https://preview.carbondesignsystem.com/getting-started/about-carbon) |
| **Shopify Polaris** | เปิดให้พนักงาน Shopify contribute ได้ทุกโปรเจกต์รวม Figma UI Kit และเปิด open source contribution สำหรับ Polaris React | [ss-polaris.vercel.app/contributing](https://ss-polaris.vercel.app/contributing) |
| **News UK** | Centralized + **designer advocates** เป็นตัวแทนในแต่ละทีม: ทีมกลาง "recruited a number of designer advocates to promote the design system within the company, improve adoption by sharing best practices, and serve as the main point of contact for the design systems team" | [figma.com/blog/how-news-uk-developed-a-multi-brand-design-system/](https://www.figma.com/blog/how-news-uk-developed-a-multi-brand-design-system/) |
| **Spotify** | Federated เชิงโครงสร้าง (มี local system ต่อ business area) | [designsystems.com](https://www.designsystems.com/how-spotifys-design-system-goes-beyond-platforms/) |

> ⚠️ **ข้อควรระวังเรื่องหลักฐาน:** มีบทความจำนวนมากบนเว็บอ้างว่า Atlassian ใช้ federated model แต่ **หน้าทางการของ Atlassian เองอ่านแล้วเป็น centralized ที่มีประตูกั้น** เอกสารนี้ยึดหน้าทางการ สำหรับ **Shopify Polaris ไม่พบหน้าทางการที่ประกาศ team model (solitary/centralized/federated) อย่างชัดเจน** ข้อมูลโมเดลทีม Polaris ที่วนอยู่บนเว็บมาจากแหล่งรอง ไม่ควรอ้างเป็นข้อเท็จจริง

---

### 1.D สำนักรอง: Ownership เชิง lifecycle (ownership ย้ายมือตามวุฒิภาวะ)

**นิยาม:** ของชิ้นเดียวกันเปลี่ยนเจ้าของเมื่อโตขึ้น ไม่ได้ถูก assign เจ้าของตายตัวตั้งแต่แรก

**GitHub Primer** เป็นตัวอย่างที่เอกสารชัดที่สุด ([primer.style/product/contribute/adding-new-components/](https://primer.style/product/contribute/adding-new-components/) [primer.style/contribute/component-lifecycle/](https://primer.style/contribute/component-lifecycle/))

| ขั้น | อยู่ที่ไหน | เกณฑ์ | เจ้าของ |
|---|---|---|---|
| local | ในแอปของ feature team เป็น custom React component | "it just needs to exist" + discoverable + ผ่าน a11y เบื้องต้น | feature team |
| shared | ถูกใช้ข้ามหลาย feature team | ผ่าน design checklist doc ถึงเกณฑ์ MVP ผ่าน axe | feature team (ขอคำแนะนำจากทีม Primer ได้) |
| **upstream เข้า Primer** | Primer library ที่ระดับ Alpha ขึ้นไป | "Is the pattern frequently used by multiple feature teams?" แก้ปัญหา design/engineering/a11y จริง เข้ากับ Primer เชิงธีม ภาระ maintenance คุ้ม | Primer maintainers |

หลัง upstream แล้วยังมีบันไดคุณภาพต่ออีก: **Alpha** (ใช้ production ได้แต่คาดว่าจะมี breaking change) → **Beta** (เติมฟีเจอร์รอง + doc use case ที่พบบ่อย) → **Stable** (API นิ่ง ไม่มี breaking change อย่างน้อย 1 เดือน เก็บ feedback จาก dev จริง รีวิว production use case แล้ว)

Carbon ใช้กลไกเดียวกันในชื่อ **Carbon Labs** ซึ่งเป็น "community-organized incubation space for IBMers to highlight innovation work that's being done in the ecosystem but has not yet met the definition of done criteria" ([carbondesignsystem.com](https://preview.carbondesignsystem.com/getting-started/about-carbon))

### 1.E สำนักรอง: Ownership เชิง org topology (ยืมมาจากวิศวกรรมองค์กร)

**นิยาม:** โครงสร้างทีมเป็นตัวกำหนดสถาปัตยกรรม ไม่ใช่ทางกลับกัน

- **Conway's Law:** ระบบมักสะท้อนโครงสร้างการสื่อสารของทีมที่สร้างมัน
- **Team Topologies** แบ่งทีมเป็น 4 ชนิด: stream-aligned (ส่งคุณค่าตรงถึงลูกค้า เป็นเจ้าของผลลัพธ์), **platform** (สร้าง service ให้ stream-aligned เร็วขึ้น ลดความซับซ้อน), enabling (เพิ่มทักษะชั่วคราวแล้วถอนตัว), complicated-subsystem ([teamtopologies.com/key-concepts](https://teamtopologies.com/key-concepts))

ในเชิงปฏิบัติ **DS team = platform team** ที่มองนักพัฒนาภายในเป็น "ลูกค้า" และส่งมอบ self-service ให้ทีมโปรดักต์ทำงานได้อิสระ

> **หมายเหตุความซื่อตรง:** นี่ไม่ใช่สำนักที่วงการ DS คิดขึ้นเอง เป็นกรอบวิศวกรรมองค์กรที่คน DS หยิบมาอธิบายทีหลัง ไม่พบเอกสารทางการของ Team Topologies ที่พูดถึง design system โดยตรง

---

## 2. ตารางเทียบเจ้าใหญ่

| องค์กร / ระบบ | สำนัก A (สถาปัตยกรรม) | สำนัก B (boundary) | สำนัก C (governance) | หลักฐาน |
|---|---|---|---|---|
| **Brad Frost (ต้นแบบ)** | 5 ชั้น: core → tech-specific → **recipe** → smart → product pace layering | Web Components + Shadow DOM ที่ core | ไม่ระบุโมเดลทีมตายตัว เน้นว่าเป็นเรื่องคน | [1](https://bradfrost.com/blog/post/the-design-system-ecosystem/) [2](https://bradfrost.com/blog/post/the-art-of-design-system-recipes/) |
| **Nathan Curtis (ต้นแบบ)** | tier core / across-groups / within-group นิยามด้วยสิทธิ์แก้ + เกณฑ์คุณภาพ | component contract + schema เป็น multi-party agreement | solitary / centralized / **federated** | [3](https://eightshapes.com/articles/design-system-tiers/) [4](https://eightshapes.com/articles/team-models-for-scaling-a-design-system/) [5](https://nathanacurtis.substack.com/p/component-contracts-and-schemas) |
| **Spotify Encore** | วงแหวน: Foundation → Web/Mobile subsystem → **local systems** (Creator, Ads, Consumer) | Config / Slots / Custom 3 ระดับ + วัด override ด้วย analytics | federated เชิงโครงสร้าง "Unity in design, diversity in thought" | [6](https://www.designsystems.com/how-spotifys-design-system-goes-beyond-platforms/) [7](https://engineering.atspotify.com/2023/05/multiple-layers-of-abstraction-in-design-systems) |
| **IBM Carbon** | Core → Carbon for Products / Carbon for IBM.com → community packages → Carbon Labs | ไม่พบเอกสาร boundary เชิง API ในแหล่งที่ตรวจ | centralized + open source contribution + incubation ของชุมชน | [8](https://preview.carbondesignsystem.com/getting-started/about-carbon) [9](https://carbondesignsystem.com/all-about-carbon/the-carbon-ecosystem/) |
| **GitHub Primer** | แยกตามผู้ใช้ปลายทาง: Primer Product UI vs **Primer Brand** | ไม่พบเอกสาร boundary เชิง API ในแหล่งที่ตรวจ | **lifecycle-based**: local → shared → upstream alpha/beta/stable maintainers ตัดสินโดยฟัง feature team | [10](https://primer.style/) [11](https://primer.style/brand/) [12](https://primer.style/product/contribute/adding-new-components/) [13](https://primer.style/contribute/component-lifecycle/) |
| **Salesforce SLDS 2** | ไม่พบชั้น ownership เชิงโครงสร้าง | **ชัดที่สุดในกลุ่ม**: `--slds-g-*` (global) vs `--slds-c-*` (component) แยกขอบเขตความเป็นเจ้าของในชื่อ token | ไม่พบเอกสาร team model สาธารณะ | [14](https://developer.salesforce.com/docs/platform/lwc/guide/create-components-css-custom-properties.html) [15](https://www.salesforce.com/blog/what-is-slds-2/) |
| **Adobe Spectrum** | monorepo เดียวรองรับหลายธีมพร้อมกัน (Spectrum 1, Express, Spectrum 2) | token 3 ชั้น global → system → component เป็นตัวคุมขอบเขต | ไม่พบเอกสาร team model สาธารณะ | [16](https://github.com/adobe/spectrum-design-data) [17](https://spectrum.adobe.com/page/design-tokens/) |
| **Atlassian** | ไม่พบชั้น ownership เชิงโครงสร้างในหน้าทางการ | ไม่พบ | centralized + contribution มีประตู (รับ fix/icon ไม่รับ component ใหม่) | [18](https://atlassian.design/contribution) |
| **Shopify Polaris** | ไม่พบเอกสารทางการเรื่อง tier | ไม่พบ | เปิด contribution ให้พนักงาน + open source ฝั่ง React **ไม่พบหน้าทางการที่ประกาศ team model** | [19](https://ss-polaris.vercel.app/contributing) |
| **Vox Media (Unison)** | shared core + brand configuration รวม 8 แบรนด์บรรณาธิการ (The Verge, Eater, Polygon, Curbed, Recode, Vox.com, Racked, SB Nation) | brand ปรับได้เฉพาะ layout, typography, shape, color | ไม่พบรายละเอียดโมเดลทีมสาธารณะ | [20](https://www.yeseniaperezcruz.com/projects/vox-media) |
| **News UK** | core + theming (Themer plugin) แทนการทำ variant แยกแบรนด์ | theme เป็น boundary หลัก | centralized + **designer advocates** ประจำแต่ละ product area | [21](https://www.figma.com/blog/how-news-uk-developed-a-multi-brand-design-system/) |
| **Schibsted** | design system CORDS อยู่ใน Core News Product ซึ่งเป็นแพลตฟอร์มร่วมของหลายหัวข่าว | ไม่พบรายละเอียด | ทีมเล็กที่ Stockholm สร้างฐานให้ทุกเว็บข่าวในเครือ (centralized) | [22](https://blog.wan-ifra.org/2019/01/23/schibsted-builds-design-system-for-multiple-news-brands) |

### ข้อสรุปจากตาราง

1. **ไม่มีเจ้าไหนทิ้ง Atomic Design เพื่อเอา Ownership มาแทน** ทุกเจ้าใช้ ownership เป็น **มิติเพิ่ม** ไม่ใช่มิติแทน
2. **เจ้าที่ใช้สำนัก A จริงจัง ล้วนมีหลายหน่วยธุรกิจ/หลายแบรนด์** (Spotify, IBM, GitHub, Vox, News UK) องค์กรที่มีโปรดักต์เดียวไม่ทำ
3. **สำนัก B แสดงออกผ่าน token/CSS variable naming** ชัดที่สุดที่ Salesforce
4. **สำนัก C ในทางปฏิบัติเข้มกว่าที่ตำราบอก** Atlassian ซึ่งเป็นองค์กรระดับบนสุดยัง **ไม่รับ component ใหม่จาก contribution** เลย

---

## 3. Atomic Design ถูกวิจารณ์เรื่องอะไร

### 3.1 ข้อวิจารณ์ที่พบหลักฐาน

| # | ข้อวิจารณ์ | แหล่ง |
|---|---|---|
| 1 | **ชื่อกำกวม ทีมเข้าใจไม่ตรงกัน** "The biggest problem with using this methodology is the lack of consistent understanding amongst stakeholders in a design system about this process" | Billy Harris, [mentorcruise.com](https://mentorcruise.com/blog/why-atomic-design-fails-in-enterprise-design-systems/) |
| 2 | **ชั้นล่างสุดผิดที่** ปุ่มถูกเรียกว่า atom ทั้งที่ของที่แบ่งย่อยไม่ได้จริงคือ design token (hex, spacing) ต่างหาก | เดียวกัน |
| 3 | **ไม่ใช่ทุก component จะลงกล่องได้** ของที่ขึ้นกับ context หรือทำหลายหน้าที่ตกขอบ | [designsystemscollective.com](https://www.designsystemscollective.com/is-atomic-design-still-relevant-in-2025-d9c214788cfe) |
| 4 | **เหมาะกับ frontend code architecture มากกว่าไฟล์ออกแบบ** | เดียวกัน |
| 5 | **ผลเชิงปฏิบัติ** "It can become a workflow nightmare when elements aren't organised properly... ultimately ending up in shipping inconsistent products" | Billy Harris, [mentorcruise.com](https://mentorcruise.com/blog/why-atomic-design-fails-in-enterprise-design-systems/) |
| 6 | **ทีมส่วนใหญ่ใช้ผิดวิธี** ปฏิบัติกับมันเหมือน rulebook แทนที่จะเป็น decision framework | [medium.com/design-bootcamp](https://medium.com/design-bootcamp/atomic-design-in-2025-from-rigid-theory-to-flexible-practice-91f7113b9274) |

**ทางเลือกที่ Harris เสนอ** (3 ชั้น): **Styles** (typography, spacing, สี, icon) → **Components** (คอมโบตายตัวของ style ปรับได้จำกัด) → **Patterns** (ไกด์ยืดหยุ่นสำหรับ layout/interaction) โดยให้เหตุผลว่า "Components... much better reflect how things are named and built in real life for example reusable elements in Figma are called components as they are in code"

### 3.2 Brad Frost ตอบเองว่าอย่างไร

นี่คือส่วนที่สำคัญที่สุดสำหรับการตัดสินใจของ NTGDS เพราะ Frost **ไม่ได้ปกป้องชื่อ**

> "The specific labels (atoms, molecules, organisms, templates, and pages) have never been the point, and we don't really use them in our work." ([designsystemscollective.com บทสัมภาษณ์](https://www.designsystemscollective.com/from-atomic-to-subatomic-brad-frost-on-design-systems-tokens-and-the-human-side-of-ui-189609dd9ac8))

> "atomic design is not rigid dogma. Ultimately, whatever taxonomy you choose to work with should help you and your organization communicate more effectively." ([bradfrost.com/blog/post/extending-atomic-design/](https://bradfrost.com/blog/post/extending-atomic-design/))

แต่เขาก็ยังยืนยัน **คุณค่าเดียวที่เขาหวง คือลำดับชั้น**

> "Atoms, molecules, and organisms does have a built-in hierarchy to it" และกังวลว่า "terms like 'modules' and 'components' is that they don't carry any sense of hierarchy, and become these amorphous clusters of interface" ([bradfrost.com](https://bradfrost.com/blog/link/where-atomic-design-fell-short/))

และเขาเองบอกว่าถ้าเขียนใหม่จะพูดถึง design token มากขึ้น โดยมองว่า token คือ "subatomic particles" ซึ่งตรงกับข้อวิจารณ์ #2 ข้างบนพอดี

### 3.3 Ownership แก้ข้อไหนได้ / ไม่ได้

| ข้อวิจารณ์ | ownership แก้ได้ไหม | เหตุผล |
|---|---|---|
| 1. ชื่อกำกวม | ⚠️ **แก้ได้บางส่วน** | core/recipe/local เข้าใจง่ายกว่า atom/molecule แต่ก็มีเส้นแบ่งกำกวมของตัวเอง (แค่ไหนถึงเรียกว่า "ใช้หลายทีม") |
| 2. atom ควรเป็น token | ❌ **แก้ไม่ได้** | คนละแกน ต้องแก้ด้วย token tier (ซึ่ง NTGDS ทำอยู่แล้ว base/semantic/component) |
| 3. component ตกขอบ | ✅ **แก้ได้** | ชั้น recipe คือ "pressure release valve" สำหรับของที่ไม่เข้าพวกโดยตรง |
| 4. เหมาะกับโค้ดมากกว่าไฟล์ออกแบบ | ✅ **แก้ได้** | ownership จัดตามทีม ซึ่งตรงกับวิธีที่คนทำงานจริงในไฟล์ Figma |
| 5. workflow nightmare / ของไม่ consistent | ⚠️ **แก้ได้บางส่วน** | ช่วยเรื่องสิทธิ์แก้ไข แต่ถ้าไม่มีคนบังคับใช้ก็เหมือนเดิม |
| 6. ใช้เป็น rulebook | ❌ **แก้ไม่ได้** | เป็นปัญหาพฤติกรรมทีม ไม่ใช่ปัญหา taxonomy ownership model ก็ถูกใช้เป็น rulebook ได้เหมือนกัน |

**ข้อสังเกตที่ต้องพูดตรง ๆ:** ข้อวิจารณ์ Atomic Design ที่หนักที่สุด (#1, #2, #6) **ไม่ได้ถูกแก้ด้วย ownership model** การเปลี่ยนไป ownership เพื่อหวังแก้เรื่องพวกนี้จะได้ผลไม่คุ้มการรื้อ

---

## 4. ตารางข้อดีข้อเสีย โดยเฉพาะบริบท multi-brand

### 4.1 เทียบข้ามสำนัก

| ประเด็น | Atomic Design (ของเดิม NTGDS) | สำนัก A ownership เชิงสถาปัตยกรรม | สำนัก B ownership เชิง boundary | สำนัก C ownership เชิง governance |
|---|---|---|---|---|
| **ตอบคำถาม** | ของประกอบจากอะไร | ใครดูแล เปลี่ยนเร็วแค่ไหน | แก้ได้ตรงไหนบ้าง | ใครตัดสิน |
| **ข้อดีทั่วไป** | มีลำดับชั้นในตัว เรียนรู้ง่าย เป็นภาษากลางที่คนรู้จักทั่วโลก | ป้องกัน core บวมจากของเฉพาะทีม pace layer ชัด scale ตามองค์กรได้ | กันสไตล์รั่ว อัปเกรดไม่พัง หลาย platform ยึด contract เดียว | ลดคอขวด สร้าง buy-in |
| **ข้อเสียทั่วไป** | ของบางตัวไม่เข้าช่อง ไม่บอกอะไรเรื่องคน/สิทธิ์ | ต้องมีหลายทีมจริงถึงคุ้ม เพิ่ม layer = เพิ่มต้นทุนดูแล | ออกแบบ API ยาก ปิดแน่นไปทีมโปรดักต์จะ hack | federated ต้องการวุฒิภาวะทีมสูง ตัดสินใจช้าลง |
| **ข้อดีเฉพาะ multi-brand** | น้อย Atomic ไม่มีคำตอบเรื่องแบรนด์เลย | **สูงมาก** แต่ละแบรนด์ได้ recipe/local layer ของตัวเอง โดยไม่ทำให้ core แตก (Frost: "agency and autonomy over their domain while still adhering to the standards") | **สูง** brand ปรับได้เฉพาะช่องที่เปิด (Vox: brand ปรับได้แค่ layout/typography/shape/color) | **สูง** designer advocate ต่อแบรนด์แบบ News UK |
| **ข้อเสียเฉพาะ multi-brand** | ไม่รองรับ ต้องพึ่ง token layer แทน | เสี่ยง fragmentation ถ้าไม่มีเกณฑ์เลื่อนชั้น Spotify ต้องมี governance กันบวมโดยเฉพาะ | ถ้าเปิดช่องมากไป = brand จะแตกกันเอง ถ้าน้อยไป = แบรนด์ไม่มีเอกลักษณ์ | ต้องมีคนจริงจากแต่ละแบรนด์ ถ้าไม่มีก็เป็น centralized ปลอม ๆ |

### 4.2 เทียบกับสภาพจริงของ Nation

| ปัจจัย | สภาพ NTGDS ตอนนี้ | ผลต่อการเลือกสำนัก |
|---|---|---|
| จำนวนแบรนด์ | 6 เว็บหลัก (บริบทงาน) `docs/brand-codes.md` ระบุ code ไว้ 11 เว็บลูก + core `ntg` | เข้าเงื่อนไขที่สำนัก A ออกแบบมาเพื่อแก้พอดี |
| จำนวนคนทำ DS | ทีม agent 3 บทบาท + user เป็น lead | **ยังไม่มีทีมโปรดักต์ที่พร้อมเป็นเจ้าของ recipe layer** สำนัก C federated ยังไม่คุ้ม |
| สถานะ core DS | 51 หน้าใน Figma token 1,243 ตัว `_ntgds-recommendations.md` ระบุ scope ปัจจุบันคือ "ทำเฉพาะ core ntgds ไม่ทำ multi-brand" | ตรงกับคำเตือนของ Frost ว่าอย่าเพิ่มชั้นก่อนมีความต้องการจริง |
| ประสบการณ์ปัญหาจริง | ปัญหาที่บันทึกใน CLAUDE.md เป็นเรื่อง สีดิบ typography compose เอง scale หาย doc ผิดชนิด | **ไม่มีข้อไหนที่ ownership model แก้ได้** ปัญหาปัจจุบันคือ enforcement ไม่ใช่ taxonomy |
| ข้อจำกัดเครื่องมือ | Figma Pro = 4 modes/collection ทำ 12 แบรนด์ × light/dark ใน mode เดียวไม่ได้ | ผลักให้ต้องแยกที่ build layer อยู่แล้ว ซึ่งสอดคล้องกับ ownership เชิง token |

---

## 5. แนวทาง hybrid (Atomic + Ownership)

### 5.1 มีเคสจริงไหม

**มี และเป็นเรื่องปกติ** หลักฐานตรงที่สุดคือ Brad Frost ผู้คิด Atomic Design เป็นคนเสนอโมเดล ecosystem 5 ชั้นเอง โดยไม่เคยประกาศเลิก Atomic Design และยังบอกว่า "Design systems are an umbrella that a whole lot of things live under" ([bradfrost.com](https://bradfrost.com/blog/post/extending-atomic-design/))

รูปแบบ hybrid ที่พบ

| รูปแบบ | ใครทำ | วิธี |
|---|---|---|
| **Atomic ในแนวตั้ง + Ownership ในแนวนอน** | Curtis design system tiers | ในแต่ละ tier ยังมี component ครบทุกระดับความซับซ้อน แต่ tier กำหนดคุณภาพ + สิทธิ์แก้ |
| **Ownership คุมชั้นบน Atomic คุมชั้นล่าง** | Frost ecosystem | core layer จัดของด้วย composition เหมือนเดิม ชั้น recipe/product ขึ้นไปจัดด้วย ownership |
| **Ownership เข้ารหัสใน token naming** | Salesforce SLDS 2 | โครง token ยัง global → semantic → component (แนว atomic) แต่ prefix `g`/`c` บอกขอบเขตความเป็นเจ้าของ |
| **Ownership เป็นวุฒิภาวะ ไม่ใช่ที่อยู่** | GitHub Primer | ของอยู่ที่ไหนก็ได้ แต่ต้องผ่านบันได alpha/beta/stable ถึงจะเป็นของ core |
| **Core + theme** | News UK, Vox Media | component ตัวเดียว (atomic เดิม) แบรนด์ต่างกันที่ theme ไม่ใช่ที่ variant แยกแบรนด์ |

### 5.2 สูตร hybrid ที่ตรงกับ Nation ที่สุด

จากตารางข้างบน สูตรที่คุ้มที่สุดคือ **แบบผสมของ Frost (recipe layer) + Curtis (edit rights) + News UK (theme ไม่ใช่ variant)** เพราะ

- ไม่ต้องรื้อ 51 หน้าใน Figma
- แก้ปัญหาที่กำลังจะมาถึงจริง (multi-brand) ไม่ใช่ปัญหาที่ยังไม่เกิด
- ต้นทุนต่ำ เพราะเป็นการ **เพิ่ม metadata** ไม่ใช่ย้ายของ

---

## 6. ผลกระทบต่อ naming และ token tier

### 6.1 ownership ทำให้ชื่อ token เปลี่ยนไหม

**คำตอบสั้น: โดยหลักการไม่ต้องเปลี่ยน แต่มี 2 จุดที่เจ้าใหญ่เข้ารหัส ownership ลงในชื่อ**

| จุด | ทำอย่างไร | ใครทำ |
|---|---|---|
| **เข้ารหัส scope ของการเป็นเจ้าของ** | prefix บอกว่าแก้แล้วกระทบวงกว้างแค่ไหน: `--slds-g-*` (global) vs `--slds-c-*` (component) | Salesforce SLDS 2 ([developer.salesforce.com](https://developer.salesforce.com/docs/platform/lwc/guide/create-components-css-custom-properties.html)) |
| **แยก collection ตามชั้น ไม่ใช่แยกชื่อ** | brand + primitives + semantics + pages เป็น 4 collection คนละใบ ชื่อ token ในชั้น semantic เหมือนกันหมดทุกแบรนด์ | Vodafone UK (ผ่าน [smashingmagazine.com](https://www.smashingmagazine.com/2024/05/naming-best-practices/)) |

**สิ่งที่เจ้าใหญ่ไม่ทำ:** ไม่พบเจ้าไหนที่เอา **ชื่อแบรนด์ใส่ในชื่อ semantic token** ทุกเจ้าใช้วิธี "ชื่อเดียวกัน ค่าต่างกันตาม theme/mode" ตรงกับที่ Adobe Spectrum ทำ (monorepo เดียวรองรับ Spectrum 1 / Express / Spectrum 2 พร้อมกันบนชื่อ token ชุดเดียว [github.com/adobe/spectrum-design-data](https://github.com/adobe/spectrum-design-data))

### 6.2 เทียบกับ taxonomy Nathan Curtis ที่ NTGDS ใช้อยู่

โครงปัจจุบันของเราคือ `ntg . category . property . role . prominence . state` (ดู [token-naming-taxonomy.md](../token-naming-taxonomy.md))

| ประเด็น | ผลจาก ownership model | ต้องแก้ taxonomy ไหม |
|---|---|---|
| namespace `ntg` | ยังใช้ได้ ทำหน้าที่เหมือน prefix ระบบของ Salesforce/Spectrum | ❌ ไม่ต้องแก้ |
| tier base → semantic → component | ยังถูกต้อง ตรงกับ Spectrum (global → system → component) และ Frost (tier 1/2/3) | ❌ ไม่ต้องแก้ |
| mode ไม่อยู่ในชื่อ (§2.3) | **ยิ่งถูกต้องขึ้นในบริบท multi-brand** เพราะ brand จะเข้ามาเป็น dimension เดียวกับ mode | ❌ ไม่ต้องแก้ ยืนยันของเดิม |
| **brand อยู่ตรงไหน** | ช่องว่างเดียวที่ taxonomy ปัจจุบันยังไม่ตอบ | ⚠️ **ต้องเพิ่มข้อกำหนด** ว่า brand เป็น dimension นอกชื่อ (เหมือน mode) ไม่ใช่ level ในชื่อ |
| ownership scope (`g` vs `c`) | ของเรามี tier แยกด้วย **collection** อยู่แล้ว (`primitive.json` / `semantics-*.json` / `component.json`) + กฎ CLAUDE.md ที่บังคับ bind จาก `component` เท่านั้น | ❌ ไม่ต้องแก้ เรามีผลลัพธ์เดียวกับ SLDS โดยใช้ collection แทน prefix |

**ข้อสรุปข้อ 6:** ownership model **ไม่ได้ทำให้ NTGDS ต้องเปลี่ยนชื่อ token เลยแม้แต่ตัวเดียว** แต่ทำให้ต้อง **เติมกฎ 1 ข้อ** ว่า brand คือ dimension นอกชื่อ

---

## 7. ข้อเสนอเบื้องต้นสำหรับ NTGDS

> เป็นข้อเสนอเพื่อพิจารณา ยังไม่ได้ลงมือ ทุกข้อต้องผ่านการยืนยันก่อนตามกฎ ask-first

### 7.1 ข้อเสนอหลัก: hybrid 3 ชั้น ไม่รื้อ Atomic

```
ชั้น token      : base → brand → semantic → component     (เพิ่ม brand เข้ามา 1 ชั้น)
ชั้น component  : Atomic เดิม 51 หน้า + ป้าย tier กำกับ    (ไม่ย้ายหน้า)
ชั้นคน          : centralized + brand advocate ต่อแบรนด์   (ยังไม่ federated)
```

### 7.2 รายละเอียดต่อชั้น

**ชั้น A. Component tier (เพิ่ม metadata ไม่ย้ายของ)**

เสนอ 3 tier ตาม Curtis + Frost โดยเก็บเป็น **description ของ component ใน Figma** และคอลัมน์ในเอกสาร ไม่ใช่การย้ายหน้า

| tier | นิยาม | ตัวอย่างของ Nation | ใครแก้ได้ |
|---|---|---|---|
| **core** | ใช้ทุกแบรนด์ เปลี่ยนแล้วกระทบทั้ง 6 เว็บ | button, input, table-cell, badge, avatar, icon | design-system-designer เท่านั้น |
| **recipe (brand)** | ใช้บางแบรนด์ ประกอบจาก core | article-card ของ bkk ที่มีแถบราคาหุ้น card แบบ TV ของ ntv | ทีมแบรนด์นั้น + core team |
| **local** | ใช้ที่เดียว ยังไม่พิสูจน์ตัวเอง | ของเฉพาะกิจในหน้า campaign | ทีมนั้น |

พร้อม **เกณฑ์เลื่อนชั้น** ยืมจาก Primer: ใช้ข้ามอย่างน้อย 2 แบรนด์ + ผ่าน a11y + มี doc + ภาระ maintenance คุ้ม → เสนอเลื่อนเป็น core

**ชั้น B. Token (เพิ่ม brand layer)**

ต่อยอดจากที่ `brand-codes.md` วางไว้แล้ว (ซึ่งถูกทางอยู่แล้ว)

```
primitive (ค่าดิบ ramp)
  ↓
brand  ← ชั้นใหม่: swap ตาม brand code (bkk / ntv / kcl / tsk / spn / ptd)
  ↓
semantic (ชื่อเดียวกันทุกแบรนด์ ค่าต่างตาม brand + mode)
  ↓
component (ชั้นที่ Figma กับโค้ด bind จริง ตามกฎ CLAUDE.md เดิม)
```

**กฎที่เสนอเพิ่มใน taxonomy (1 ข้อ):** brand เป็น **dimension นอกชื่อ token** เหมือน mode ห้ามใส่ `bkk`/`ntv` ลงในชื่อ semantic หรือ component token จัดการที่ build layer (`variables-<code>.css`) ตามที่ `brand-codes.md` เสนอไว้แล้ว

**ชั้น C. คน**

ตอนนี้ NTGDS อยู่ในโหมด **solitary/centralized** ตามนิยาม Curtis และ **นี่คือสถานะที่ถูกต้องสำหรับตอนนี้** เพราะ federated ต้องการ "designer เก่ง ๆ ในหลายโปรดักต์ที่ยอมสละเวลา" ซึ่งยังไม่มีหลักฐานว่ามี

ขั้นถัดไปที่คุ้มที่สุดคือ **brand advocate** แบบ News UK คือมีคน 1 คนต่อเว็บที่เป็นจุดติดต่อ ยังไม่ต้องให้สิทธิ์แก้ระบบ

### 7.3 สิ่งที่ไม่แนะนำให้ทำ

| ❌ ไม่แนะนำ | เหตุผล |
|---|---|
| **รื้อ 51 หน้า Figma จาก Atomic เป็น core/recipe/local** | ต้นทุนสูงมาก ไม่แก้ปัญหาที่มีอยู่จริงข้อไหนเลย (ปัญหาปัจจุบันคือ enforcement: สีดิบ, preset, scale) Frost เองบอกว่าป้ายชื่อไม่ใช่ประเด็น |
| **ทำ federated governance ตอนนี้** | Curtis ระบุเงื่อนไขชัดว่าต้องมี design talent สูงหลายทีม Atlassian ที่ใหญ่กว่ามากยังไม่รับ component ใหม่จาก contribution เลย |
| **เพิ่มชั้น smart component / tech-specific layer** | Frost บอกว่าเป็น optional และเตือนว่า "add additional layers or complexity only when real needs arise" |
| **ใส่ชื่อแบรนด์ในชื่อ semantic token** | ไม่มีเจ้าใหญ่รายไหนทำ ทำแล้ว token จะระเบิดเป็น 6 เท่า |

### 7.4 ลำดับที่แนะนำ ถ้าจะทำ

| ลำดับ | สิ่งที่ทำ | ขนาด | ทำไมลำดับนี้ |
|---|---|---|---|
| 1 | เติมกฎ "brand = dimension นอกชื่อ" ลง `token-naming-taxonomy.md` | S (เอกสาร) | ราคาถูกที่สุด ป้องกันความผิดพลาดที่แพงที่สุด |
| 2 | เพิ่มฟิลด์ **tier** (core/recipe/local) ในมาตรฐานเอกสาร component | S (เอกสาร) | ได้ประโยชน์ ownership โดยไม่ย้ายของ |
| 3 | นิยามเกณฑ์เลื่อนชั้น (promotion criteria) แบบ Primer | S | ต้องมีก่อนที่จะมีแบรนด์มาขอของ |
| 4 | ทำ brand layer ใน token pipeline จริง | M | หลังจาก core DS นิ่ง (ตาม scope ที่ `_ntgds-recommendations.md` วางไว้) |
| 5 | ตั้ง brand advocate ต่อเว็บ | องค์กร | เมื่อมีเว็บลูกเริ่มใช้จริงมากกว่า 1 เว็บ |

> ข้อ 1-3 เป็นงานเอกสารล้วน ไม่แตะ token/component/Figma

---

## 8. แหล่งอ้างอิงทั้งหมด

### ต้นแบบทฤษฎี
1. Brad Frost, *The Design System Ecosystem* https://bradfrost.com/blog/post/the-design-system-ecosystem/
2. Brad Frost, *The art of design system recipes* https://bradfrost.com/blog/post/the-art-of-design-system-recipes/
3. Brad Frost, *Extending Atomic Design* https://bradfrost.com/blog/post/extending-atomic-design/
4. Brad Frost, *Where Atomic Design Fell Short* (ความเห็นตอบข้อวิจารณ์) https://bradfrost.com/blog/link/where-atomic-design-fell-short/
5. Brad Frost, *The Many Faces of Themeable Design Systems* https://bradfrost.com/blog/post/the-many-faces-of-themeable-design-systems/
6. Nathan Curtis (EightShapes), *Design System Tiers* https://eightshapes.com/articles/design-system-tiers/ (ต้นฉบับ https://medium.com/eightshapes-llc/design-system-tiers-2c827b67eae1)
7. Nathan Curtis (EightShapes), *Team Models for Scaling a Design System* https://eightshapes.com/articles/team-models-for-scaling-a-design-system/ (ต้นฉบับ https://medium.com/eightshapes-llc/team-models-for-scaling-a-design-system-2cf9d03be6a0)
8. Nathan Curtis, *Component Contracts and Schemas* https://nathanacurtis.substack.com/p/component-contracts-and-schemas
9. Design System Contracts (open spec) https://ds-contracts-spec.pages.dev/
10. Team Topologies, *Key concepts* https://teamtopologies.com/key-concepts

### ระบบจริงของเจ้าใหญ่
11. Spotify Encore (Figma / designsystems.com) https://www.designsystems.com/how-spotifys-design-system-goes-beyond-platforms/
12. Spotify Engineering, *Multiple Layers of Abstraction in Design Systems* https://engineering.atspotify.com/2023/05/multiple-layers-of-abstraction-in-design-systems
13. IBM Carbon, *About Carbon* https://preview.carbondesignsystem.com/getting-started/about-carbon
14. IBM Carbon, *The Carbon ecosystem* https://carbondesignsystem.com/all-about-carbon/the-carbon-ecosystem/
15. GitHub Primer https://primer.style/
16. GitHub Primer Brand https://primer.style/brand/ · repo https://github.com/primer/brand
17. GitHub Primer, *Adding new components* https://primer.style/product/contribute/adding-new-components/
18. GitHub Primer, *Component lifecycle* https://primer.style/contribute/component-lifecycle/
19. Atlassian Design System, *Contribution* https://atlassian.design/contribution
20. Shopify Polaris, *Contributing* https://ss-polaris.vercel.app/contributing
21. Salesforce, *SLDS Styling Hooks (LWC dev guide)* https://developer.salesforce.com/docs/platform/lwc/guide/create-components-css-custom-properties.html
22. Salesforce, *What is SLDS 2* https://www.salesforce.com/blog/what-is-slds-2/
23. Adobe Spectrum Design Data (tokens + component schemas) https://github.com/adobe/spectrum-design-data
24. Adobe Spectrum, *Design tokens* https://spectrum.adobe.com/page/design-tokens/

### Multi-brand โดยเฉพาะสื่อ
25. Figma Blog, *How News UK developed a multi-brand design system* https://www.figma.com/blog/how-news-uk-developed-a-multi-brand-design-system/
26. Yesenia Perez-Cruz, *Vox Media (Unison)* https://www.yeseniaperezcruz.com/projects/vox-media
27. WAN-IFRA, *Schibsted builds design system for multiple news brands* https://blog.wan-ifra.org/2019/01/23/schibsted-builds-design-system-for-multiple-news-brands
28. Smashing Magazine, *Best Practices For Naming Design Tokens, Components And Variables* (มีเคส Vodafone UK) https://www.smashingmagazine.com/2024/05/naming-best-practices/

### ข้อวิจารณ์ Atomic Design
29. Billy Harris, *Why Atomic design fails in enterprise design systems* https://mentorcruise.com/blog/why-atomic-design-fails-in-enterprise-design-systems/
30. Saul Ossorio, *Is Atomic Design Still Relevant in 2025?* https://www.designsystemscollective.com/is-atomic-design-still-relevant-in-2025-d9c214788cfe
31. Shane P Williams, *From Atomic to Subatomic: Brad Frost on Design Systems, Tokens, and the Human Side of UI* https://www.designsystemscollective.com/from-atomic-to-subatomic-brad-frost-on-design-systems-tokens-and-the-human-side-of-ui-189609dd9ac8
32. Maya Gomoniuk, *Atomic Design in 2025: From Rigid Theory to Flexible Practice* https://medium.com/design-bootcamp/atomic-design-in-2025-from-rigid-theory-to-flexible-practice-91f7113b9274

### เอกสารภายในที่ใช้อ้างอิง
- `docs/figma-pages.md` (โครง Atomic 51 หน้า)
- `docs/rules/token-naming-taxonomy.md` (6-level order + tier ปัจจุบัน)
- `docs/brand-codes.md` (brand code + แผน multi-brand เดิม)
- `docs/research/design-systems/_ntgds-recommendations.md` (scope ปัจจุบัน = core เท่านั้น)

---

## 9. สิ่งที่หาหลักฐานสาธารณะไม่เจอ (บันทึกไว้เพื่อความซื่อตรง)

| ประเด็น | สถานะ |
|---|---|
| Shopify Polaris ใช้ team model แบบไหน (solitary/centralized/federated) | **ไม่พบหน้าทางการ** มีแต่บทความรองที่อ้างว่า centralized ซึ่งเชื่อไม่ได้ |
| Atlassian เป็น federated จริงไหม | บทความรองหลายชิ้นอ้างว่า federated แต่ **หน้าทางการอ่านแล้วเป็น centralized ที่มีประตูกั้น** เอกสารนี้ยึดหน้าทางการ |
| Adobe Spectrum / Salesforce ใช้ governance model แบบไหน | **ไม่พบเอกสารทางการ** |
| Spotify Encore มีเกณฑ์ promotion จาก local system เข้า core เป็นลายลักษณ์อักษรไหม | **ไม่พบเอกสารสาธารณะที่ระบุเกณฑ์ตรง ๆ** มีแต่คำอธิบายเชิงหลักการ |
| Microsoft Fluent / Airbnb DLS ใช้ ownership model แบบไหน | **ยังไม่ได้ค้นในรอบนี้** (นอก scope เวลาที่ใช้) ถ้าต้องการให้ตามต่อ แจ้งได้ |
| Nathan Curtis *Naming Tokens in Design Systems* ต้นฉบับ | เว็บ Medium/EightShapes คืน 403/404 ตอนดึงในรอบนี้ เนื้อหาที่อ้างในเอกสารนี้มาจาก `docs/rules/token-naming-taxonomy.md` ที่โปรเจกต์สรุปไว้แล้ว ไม่ได้ verify ซ้ำ |
| IBM Carbon: ตัว Carbon for Products มีเกณฑ์ตัวเลขว่าใช้กี่ทีมถึงเลื่อนเข้า Core | **ไม่พบ** |

---

# ภาคสอง เจาะลึกคนและกลไก (รอบ 2)

> เพิ่ม 2026-08-19 §1-9 ตอบว่า "โมเดล ownership คืออะไร" ระดับหลักการ ภาคสองตอบ 3 คำถามที่ภาคแรกไม่มีคำตอบ คือ **ใครรับผิดชอบส่วนไหน** **จัดการ component ที่โตและขยายตัวเรื่อย ๆ ยังไง** **ตัวเลขจริง**
> **ป้ายแหล่ง** ใช้ทุกข้ออ้าง: `[ทางการ]` = เว็บ/repo ขององค์กรเอง `[กึ่งทางการ]` = พนักงานพูดเอง (talk/blog/podcast) `[แหล่งรอง]` = คนนอกเขียน ข้อไหนหาไม่เจอเขียนว่าไม่พบ ไม่เติมจากความรู้ทั่วไป
> **สถานะความครบ:** เสร็จแล้ว 3 เจ้า (GitHub Primer IBM Carbon Atlassian) ยังค้นอยู่: Spotify Salesforce Adobe Polaris Microsoft Fluent กลุ่มสื่อ (Guardian BBC NYT News UK Vox Schibsted Bloomberg)

---

## 10. ใครรับผิดชอบอะไร (responsibility matrix ของจริง)

### 10.1 ตารางเทียบ 3 เจ้า

| หน้าที่ | GitHub Primer | IBM Carbon | Atlassian |
|---|---|---|---|
| **Figma library** | **DRI ระบุชื่อรายไฟล์** Primer Web = @lukasoppermann Primer Brand = @danielguillan (ทั้งคู่ตำแหน่ง Systems Designer) `[ทางการ]` | **IBM Figma guild** ซึ่ง **ไม่ใช่ทีม Carbon** แต่เป็น "crucial partners in our governance model" `[ทางการ]` | ไม่ระบุเจ้าของ มี design tooling specialist 2 คนในทีม `[กึ่งทางการ]` icon contribution plugin ใช้โดย designer 550+ คน `[ทางการ]` |
| **Design token** | repo `primer/primitives` คุมด้วย changeset Figma ต้อง consume จาก library primitives `[ทางการ]` | อยู่ใน monorepo ทุก component ห้ามมี magic number `[ทางการ]` | หน้า token ไม่ระบุเจ้าของเลย ที่ใกล้สุดคือ pillar "Systems Architecture" + Design Technologist ที่ "guide tokens and design system integration" `[ทางการ]` |
| **Component code** | CODEOWNERS 2 ทีมถาวร `@primer/engineer-reviewers` + `@primer/design-reviewers` `[ทางการ]` | ระบุผู้ดูแลต่อ framework: Elements/React/Web Components = ทีม Carbon **Angular/Vue/Svelte = community maintained** `[ทางการ]` | "owned by **different teams within Atlassian**" repo สาธารณะปิดรับ PR ทั้งหมด `[แหล่งรอง mirror ของ README ทางการ]` |
| **Accessibility** | **5 ใน 19 คนเป็นตำแหน่งสาย a11y** รวม Accessibility Design Manager component ใหม่ทุกตัวผ่าน "rigorous testing by the accessibility team" แยก a11y design review กับ a11y engineering review `[ทางการ]` | **A11y SMEs** เขียนเอกสาร a11y เอง ทดสอบด้วย IBMa accessibility-checker มี issue template แยก `[ทางการ]` | pillar หนึ่งใน 4 ของ design org มี accessibility specialists + **A11y Office Hours** แต่เป็น advisory ไม่ใช่ประตูอนุมัติ `[ทางการ]` |
| **Content design** | **ไม่พบตำแหน่ง content designer** บนหน้าทีม | **ไม่พบบทบาทรีวิว content** ในเส้นทางอนุมัติ | ระบุเองว่าระบบ "built and supported by developers, designers, and **content designers**" ทีมมี 1 senior content designer `[ทางการ + กึ่งทางการ]` |
| **อนุมัติ component ใหม่** | "**The Primer maintainers (designers and engineers) will decide**" `[ทางการ]` | **2 ประตู**: "Carbon is not the gatekeeper of the discovery phase" (ชุมชนคัดก่อน) แล้ว "**Only the Carbon team can move an asset from discovery to delivery**" `[ทางการ]` | **ไม่รับเลย** "New components or patterns" อยู่ในรายการ not accepted ทีมกลางเป็นเจ้าของเบ็ดเสร็จ `[ทางการ]` |
| **เอกสาร** | ไม่มี docs owner คนเดียว engineer มีหน้าที่ contribute docs | **ผู้เสนอเป็นคนเขียน** บน template ของ Carbon (usage/style/code/a11y ครบถึงจะ stable) `[ทางการ]` | developer + designer + content designer ร่วมกัน `[ทางการ]` |
| **ตัดสิน deprecate** | Primer maintainers ประกาศใน changelog `[ทางการ]` | ทีม Carbon ผ่าน PDLC + ตาราง EOL ที่ประกาศล่วงหน้า `[ทางการ]` | มี ladder ประกาศ (Intent to Deprecate → Deprecated) แต่ **ไม่ระบุ role ผู้ตัดสิน** (คู่มืออยู่หลัง employee-only) `[ทางการ]` |
| **วัด adoption** | **ไม่พบตัวเลขสาธารณะ** | **PM เป็นคนติดตาม** "product insertions" ผ่าน Figma API + IBM Telemetry `[ทางการ]` | ประกาศจุดยืนตรงข้าม "**We don't measure adoption but rather collaboration**" `[กึ่งทางการ]` |

### 10.2 ตำแหน่งงานจริงที่พบ

**GitHub Primer** ทีม 19 คนบนหน้า about `[ทางการ]` https://primer.style/about/
Systems Designer x4 Senior Accessibility Designer x3 Accessibility Design Manager x1 Accessibility Software Engineer x1 Senior Design Engineer x1 Engineering Manager x2 Software Engineer x7
> "The GitHub Design Infrastructure and Design Engineering teams build and maintain Primer" ตั้งต้นปี 2016 ด้วยคน 2 คน

**Atlassian** `[ทางการ]` https://www.atlassian.com/blog/ai-at-work/atlassian-design-system-building-the-context-engine-for-the-ai-era
> "leading over **35 designers** globally across **Design Language, Accessibility, Systems Architecture, and AI**"

โครงทีมยุคก่อนหน้า 21 คน `[กึ่งทางการ]` https://noti.st/skougs1/Ompfp4/slides (Alex Skougarevskaya ตำแหน่ง Design System Manager)
6 designers 12 engineers (8 core + 4 contractor) 1 senior content designer **2 design tooling** 4 leads (design lead eng lead 2 PM)
> "We are a centralised team, full of system specialists, trying to scale to other teams of product specialists."

**บทบาทที่เราไม่มีแต่เจ้าใหญ่มี: Design Technologist** `[ทางการ]` https://www.atlassian.com/blog/how-we-build/design-technologists-the-role-that-turns-creativity-into-code
> "DTs need to think like a designer, but code like an engineer" หน้าที่รวม "guide tokens and design system integration" และสร้าง "extensions, scripts, and automation approaches"

⚠️ **แก้ข้อมูลผิดที่วนบนเว็บ:** ที่หลายที่อ้างว่า "Charles Lee, engineering lead" เป็นของ Atlassian หน้า Rosenverse ระบุว่าเป็น "Senior Frontend Developer, **Shopify**"

### 10.3 ข้อสังเกตที่ใช้กับ NTGDS ได้

1. **ไม่มีเจ้าไหนใช้ป้าย ownership ลอย ๆ ทุกเจ้าผูกความเป็นเจ้าของกับกลไกเชิงกล** Primer ใช้ CODEOWNERS + DRI รายไฟล์ · Carbon ใช้ CODEOWNERS + snapshot test · ป้ายที่ไม่มีกลไกบังคับคือกระดาษเปล่า
2. **a11y เป็นสาขาที่มีคนจริง ไม่ใช่ข้อในเช็คลิสต์** Primer ลงทุนถึง 5 ใน 19 คน
3. **Figma library ไม่จำเป็นต้องเป็นของทีม DS** Carbon แยกเป็น guild ต่างหากแต่ผูกเข้ามาใน governance
4. **content design เป็นช่องว่างร่วมของวงการ** 2 ใน 3 เจ้าไม่มีบทบาทนี้ในเส้นทางอนุมัติ (เราก็ยังไม่มี)
5. **จุดที่ต่างกันสุดคือการรับ component ใหม่** Atlassian ปิดสนิท · Primer เปิดแต่ตั้งบันไดสูง · Carbon เปิดโดยให้ชุมชนคัดรอบแรก

---

## 11. จัดการ component ที่โตและขยายตัวเรื่อย ๆ ยังไง

### 11.1 Intake (ประตูรับคำขอ)

| เจ้า | กลไก |
|---|---|
| **Primer** | ดัน intake **ออกนอก repo สาธารณะโดยตั้งใจ** repo สาธารณะมีแค่ bug report กับ feature request ขอ component ใหม่ redirect ไป private repo `github/primer` ใช้ template `01-request.md` "We will get back to you after our **weekly backlog triaging session**" `[ทางการ]` |
| **Carbon** | issue template 5 แบบ (`ACCESSIBILITY_ISSUE` `BUG_REPORT` `DESIGN_DEFECT` `FEATURE_REQUEST_OR_ENHANCEMENT` `QUESTION`) ฟิลด์บังคับรวม **Project name** ("What project, team, or product do you work on?") และ **Available extra resources** ("What resources do you have to assist this effort?") `[ทางการ]` |
| **Atlassian** | หน้า contribution ระบุชัดว่ารับแค่ fix กับ small enhancement ของใหญ่ให้ "reach out through our channels" `[ทางการ]` |

> **จุดที่ลอกได้ทันที:** ฟิลด์ **Available extra resources** ของ Carbon ทำงาน governance เงียบ ๆ คือโยนภาระแรงงานกลับไปที่ผู้ขอตั้งแต่ตอนยื่นเรื่อง ฟิลด์ **Project name** ทำให้เคส "ใช้ซ้ำกี่ทีม" ตรวจสอบย้อนหลังได้

### 11.2 เกณฑ์รับเข้าระบบ (on-ramp)

**Primer: บันได 5 ขั้น ของต้องไปเกิดในโปรดักต์ก่อน** `[ทางการ]` https://primer.style/guides/contribute/adding-new-components
1. Exists and is discoverable (มีชื่อ · คำอธิบาย · Storybook story อย่างน้อย 1)
2. Meets basic design quality checks (ผ่าน pattern design checklist)
3. Has documentation (story ครอบทุก feature/option · ผ่าน MVP documentation criteria)
4. Is accessible (ผ่าน axe + Product Accessibility Checkpoints)
5. Ready to upstream (ถึงระดับ Alpha)

เกณฑ์ตัดสินตอน upstream คำต่อคำ
> "Is the pattern **frequently used by multiple feature teams**?"
> "Will there be any negative consequences from adding this new component? For example, a negative impact on performance"
> "Does it fit in with a 'theme' of any existing Primer components?"
> "**Is the time we'd have to invest in owning and maintaining the component worth it?**"

จุดยืนที่ประกาศเอง: "Primer **intentionally has a high barrier to entry**"

**Carbon: บันได status ผูกกับ PDLC phase** `[ทางการ]`

| Status | PDLC Phase | นิยาม |
|---|---|---|
| Draft | Discovery | "Partially complete, ready for validation." |
| Preview candidate | Discovery | "Partially complete, with measurable results, stakeholders, and clear business value." |
| Preview | Delivery | "Mostly complete, changes possible based on feedback, available to use in production." |
| Stable | Launch and scale | "Complete across code, kit, docs, design, and ready for production use." |

เงื่อนไขเป็น Stable ต้องผ่าน 4 หมวด: **design spec** (ใช้ color/type/spacing token เท่านั้น ครบ 7 interaction state text 4.5:1 non-text 3:1) **code** (ตรงสเปก "perfectly down to the pixel" "**do not contain magic numbers** or colors that are not tokenized" responsive ถึง 320px มี codemod) **testing** (unit coverage เกิน 80% VRT ด้วย Percy AVT ด้วย IBM Equal Access ทดสอบมือกับ JAWS/VoiceOver/NVDA) **design kit** (publish เข้า library ที่ถูกต้อง เพราะ "allows for **Figma analytics to understand adoption and usage better**")

**ประตูกันของซ้ำ (Carbon)** `[ทางการ]`
> "**Does it replicate anything in the system already, or is there truly a gap?**"
> "If the proposal does replicate an existing asset, **is there evidence to show that the proposed solution is better?**"

**กฎกันชื่อซ้ำ (Primer)** `[ทางการ]`
> "New components should **never have the same name** as an existing Primer component… If you're creating a modified version of an existing component, **try to modify it in Primer first**."

**สัญญาณว่าไม่ควรเอาเข้าระบบ (Primer)** `[ทางการ]` https://primer.style/product/contribute/handling-new-patterns/
> "The component was rushed and has known issues" "It solves a very specific design problem my team encountered, but is unlikely to be useful for other use-cases" "It's a very complex component that applies to a use-case other apps don't often deal with"

พร้อมทางออกไม่ให้ DS เป็นคอขวด
> "As long as what you ship is accessible, visually consistent, and high-quality: **go for it**." "**Your team is responsible for maintaining the new pattern** (unless it gets upstreamed to Primer)."

### 11.3 variant explosion คุมยังไง

**Primer มีกฎตัดสินเป็นคำถามเดียว** `[ทางการ]` https://primer.style/product/contribute/contributing-to-figma/
> "our main distinction between using variants or adding additional related components is to ask, '**Will this change only visual styling or will this also change function/purpose of the component?**'… Another question to consider is how this will effect maintainence of the component."

| ตัดสินว่า | ตัวอย่างที่ Primer ยกเอง |
|---|---|
| แยกเป็น component คนละตัว | Alerts กับ Banners Avatar กับ AvatarStack Form select items |
| ใช้ variant ในตัวเดียว | Buttons Outline labels Navigation Header |

เสริมด้วย **property vocabulary มาตรฐาน** ที่ค่าตายตัว (`type` `state` `size` `leading[Accessory]` `trailing[Accessory]` `description` `selected`) กันชื่อ property บานปลาย

**Carbon ใช้หลัก composition แทนการเพิ่ม prop** `[ทางการ]`
> "**Composition**: components should be broken down into logical pieces to support the many disparate configurations that are required by the business."

**ทั้งสองเจ้าไม่มีตัวเลขจำกัดจำนวน prop หรือ variant** (ค้นแล้วไม่พบ) เป็นกฎเชิงคุณภาพล้วน

### 11.4 versioning และ deprecation

| ประเด็น | Primer | Carbon |
|---|---|---|
| cadence | **minor/patch รายสัปดาห์ major ปีละ 2 ครั้ง** `[ทางการ]` | **minor ทุก 2 สัปดาห์** บนสาย Active `[ทางการ]` |
| semver | ลบ component/prop narrow type ลบ landmark role = major เพิ่ม = minor fix = patch | เพิ่ม prop = minor **deprecate prop = minor** ลบ prop = major widen type = minor บังคับด้วย `deprecate()` wrapper บน propTypes |
| deprecation window | "After about **6 months** of living in the deprecated bundle, a component is retired/deleted" | **ประกาศเป็นตารางวันที่จริง** v10 initial 2019-03-29 ถึง EOL 2024-09-30 (~5.5 ปี maintenance ~2.5 ปี) + LTS สำหรับ on-prem |
| ทางลงให้ผู้ใช้ | codemod repo `primer/react-migrate` "a warning is shown to the consumer" | `@carbon/upgrade` codemod **feature flag `enable-v12-*`** ("if all `enable-v12-*` flags are enabled within your project before the v12 release, **no changes should need to be made**") prerelease v11 ยาว 8 เดือน 4 รอบ |

**เคส consolidation จริงที่ verify ได้ 1 เคส** `[ทางการ]` Primer ฆ่า utility component `Box` ทิ้ง แล้วให้ย้ายไป element ธรรมดา + CSS Modules ด้วยเหตุผล performance

⚠️ **governance smell ที่ไม่ควรลอก:** Primer มีคำศัพท์ lifecycle 2 ชุดที่ไม่ตรงกันบนเว็บตัวเอง (หน้า component status ใช้ Experimental/Ready/Deprecated แต่หน้า adding-new-components ยังพูดถึง Alpha/Beta/Stable)

### 11.5 พื้นที่ incubation สำหรับของที่ยังไม่นิ่ง

**Carbon Labs** เป็นคำตอบที่ชัดที่สุด และเหตุผลที่ประกาศไว้ตรงกับความเสี่ยงของไฟล์ DS เรา `[ทางการ]`
> "Previously, we housed **unfinished explorations alongside stable components, which confused designers and developers** about what was safe for use in production. To address this, we created Carbon Labs as a dedicated environment for explorations, separate from stable design system assets. It includes a separate GitHub repo and Storybook for code assets and a **dedicated Figma space** for design assets."

จุดสำคัญคือแยก **ทั้ง repo และพื้นที่ Figma** ไม่ใช่แค่ติดป้ายในไฟล์เดียวกัน

### 11.6 วัด adoption

| เจ้า | วิธี |
|---|---|
| **Carbon** | วัด 2 ทาง ฝั่งโค้ด = telemetry เก็บตอนติดตั้งบน CI server ที่ไม่ใช่ PR และ remote เป็น github.ibm.com (เก็บ remote origin URL + commit hash) "to **influence Carbon's roadmap and prioritize bug fixes**" ฝั่ง design = Figma API ติดตาม product insertions โดย PM `[ทางการ]` |
| **Primer** | ไม่พบตัวเลขหรือ dashboard สาธารณะ (น่าจะเป็นเครื่องมือ staff-only) |
| **Atlassian** | เลือกไม่วัด adoption โดยตั้งใจ "We don't measure adoption but rather **collaboration**" ใช้เครือข่าย **Design System Champions 25 คน** + Slack 110+ คน + **fortnightly sparring sessions** แทน `[กึ่งทางการ]` |

### 11.7 สรุปกลไก เรียงตามความคุ้มถ้าจะลอกมาใช้กับ NTGDS

| # | กลไก | ต้นแบบ | ทำไมเหมาะกับเรา | ราคา |
|---|---|---|---|---|
| 1 | **กฎตัดสิน variant กับ component แยก** (เปลี่ยนหน้าตา = variant เปลี่ยนหน้าที่ = component ใหม่) | Primer | เราไม่เคยมีกฎนี้เลย และเป็นจุดที่ component จะบานเร็วที่สุดตอนขึ้น multi-brand | S เอกสาร |
| 2 | **แยกพื้นที่ incubation ออกจาก library ที่ stable** | Carbon Labs | ไฟล์ DS เรามีของทดลองปนกับของจริงอยู่แล้ว | M |
| 3 | **ผูก DoD เข้ากับสถานะ ไม่ใช่ลอยเป็นเช็คลิสต์** (raw = 0 token ครบ doc ครบ ถึงจะเลื่อนเป็น stable) | Carbon | เรามี DoD อยู่แล้วแต่ไม่ได้ผูกกับสถานะของ component | S |
| 4 | **เกณฑ์เลื่อนชั้นที่ถามเรื่องภาระ maintenance ตรง ๆ** | Primer | กันไม่ให้ของเฉพาะกิจของแบรนด์เดียวไหลเข้า core | S เอกสาร |
| 5 | **ฟิลด์ intake ที่ถามว่าผู้ขอมีทรัพยากรอะไรมาช่วย** | Carbon | ทีม DS เราเล็กมาก ต้องกันงานล้นตั้งแต่ประตู | S |
| 6 | **CODEOWNERS ดักที่ผิว API** (snapshot test บังคับ admin review) | Carbon | ฝั่งโค้ดเรายังไม่มี แต่ทำได้ทันทีที่ repo component โตขึ้น | M |
| 7 | **DRI ระบุชื่อรายไฟล์ Figma** | Primer | ตอนนี้เราคนเดียวเลยยังไม่จำเป็น จะจำเป็นทันทีที่มีไฟล์ recipe ต่อแบรนด์ | S |
| 8 | **วัด adoption 2 ทาง (Figma analytics + telemetry ฝั่งโค้ด)** | Carbon | Figma analytics ใช้ได้เลย telemetry รอมีเว็บลูกใช้จริงก่อน | M ถึง L |

---

## 12. ตัวเลขจริง (รอบ 2)

| ตัวชี้วัด | GitHub Primer | IBM Carbon | Atlassian |
|---|---|---|---|
| ขนาดทีม | **19 คน** (เริ่ม 2016 ด้วย 2 คน) `[ทางการ]` | **ไม่พบ** | 35+ designers (ไม่รวม engineer) `[ทางการ]` เคย 21 คนทั้งทีม `[กึ่งทางการ]` |
| จำนวน component | 62 public + 18 internal | 42 ตัวที่มีเอกสาร | ไม่พบ |
| release cadence | minor/patch รายสัปดาห์ major ปีละ 2 | minor ทุก 2 สัปดาห์ | ไม่พบ |
| SLA | "response from Primer team **within a day or two**" request เข้า weekly triage | "A member of the Carbon team responds to all issues and pull requests" (ไม่มีกรอบเวลา) | ไม่พบ |
| เกณฑ์ตัวเลขอื่น | ไม่พบ | unit coverage เกิน **80%** ต้องมี **stakeholder team 5 ถึง 8 ทีม** ตอนเข้า delivery prerelease v11 = 8 เดือน 4 รอบ | ไม่พบ |
| adoption | **ไม่พบ** | **ไม่พบตัวเลข** แต่มีระบบวัดจริง | ประกาศว่าไม่วัด adoption |

**ตัวเลขที่ Atlassian เผยแทน adoption** `[ทางการ]`: icon contribution plugin ใช้โดย designer 550+ คน 58 updates 20+ apps เส้นทาง 15 ปี (ตัวเลขที่เหลือเป็นผลของงาน AI context ไม่เกี่ยวกับ ownership โดยตรง)

---

## 13. ยังไม่พบ และยังไม่ได้ค้น (รอบ 2)

### 13.1 ค้นแล้วไม่พบ

| ประเด็น | สถานะ |
|---|---|
| Primer adoption dashboard หรือตัวเลข adoption | ไม่พบ หน้า component status เป็น maturity label ไม่ใช่ adoption น่าจะเป็นเครื่องมือ staff-only |
| Primer / Carbon มีตัวเลขจำกัดจำนวน prop หรือ variant ไหม | **ไม่พบทั้งสองเจ้า** มีแต่กฎเชิงคุณภาพ |
| Primer / Carbon มีบทบาท content designer ในเส้นทางอนุมัติไหม | ไม่พบทั้งสองเจ้า |
| Carbon team size | ไม่พบ |
| Carbon เคส consolidation ที่ระบุชื่อ | ไม่พบ (เคสจริงที่ยืนยันได้มีแค่ `Box` ของ Primer) |
| Atlassian: เจ้าของ Figma library เจ้าของ token ผู้อนุมัติ component ใหม่ ผู้ตัดสิน deprecate docs owner a11y approver (ระดับ role) | **ไม่พบทั้งหมด** เอกสารละเอียดอยู่หลัง employee-only |
| Atlassian: component code ฝั่ง mobile | ไม่พบ `github.com/atlassian/design-system` คืน 404 |
| Atlassian adoption percentage | ไม่พบ หลักฐานที่มีบอกตรงข้ามว่าเลือกไม่วัด |
| Primer RFC folder สาธารณะ | ไม่มี proposal อยู่ใน private repo `github/primer` |

### 13.2 ข้อจำกัดของการค้นรอบนี้

- GitHub API ติด rate limit ระหว่างทาง บาง listing อ่านจากหน้า HTML แทน API (ชื่อไฟล์ถูกต้อง แต่ไม่ได้ไล่ครบทุก directory)
- artifact สำคัญของ Primer หลายชิ้นเป็น **staff-only** (template `01-request.md` · product design checklist · Product Accessibility Checkpoints · project board) ยืนยันได้แค่ว่ามีอยู่จริงจากลิงก์ในเอกสารสาธารณะ อ่านเนื้อไม่ได้
- JD ของ Atlassian ทุกชิ้นมาจาก job board ภายนอก `[แหล่งรอง]` เพราะหน้า careers ทางการ render เฉพาะ navigation

### 13.3 ยังไม่ได้ค้น (อยู่ระหว่างดำเนินการ)

**ค้นเสร็จแล้วในรอบ 3 (ดู §14 ถึง §16):** The Guardian BBC News UK Spotify Encore Salesforce Adobe Spectrum
**ค้นเสร็จแล้วในรอบ 4 (ดู §17 ถึง §19):** Financial Times (Origami) Vox Media Schibsted (CORDS) Warp Bloomberg Industry Group New York Times
**ค้นเสร็จแล้วในรอบ 5 (ดู §20 ถึง §22):** Shopify Polaris Microsoft Fluent 2 Twilio Paste Pinterest Gestalt
**ครบตามขอบเขตที่วางไว้แล้ว** ข้อสรุปรวมทั้ง 19 องค์กรอยู่ที่ **§22**

---

# ภาคสาม รายองค์กร (รอบ 3)

> เพิ่ม 2026-08-19, 6 องค์กรที่ค้นเพิ่ม แยกเป็น **กลุ่มสื่อ** (ตรงบริบท Nation Group ที่สุด) กับ **กลุ่มโปรดักต์**
> ป้ายแหล่งเหมือนเดิม ทุกข้อมี URL ไม่พบให้เขียนว่าไม่พบ

---

## 14. กลุ่มสื่อ

### 14.1 The Guardian (Source) และ Development Kitchen

> เจ้าที่หลักฐานดีที่สุดในกลุ่มนี้ เพราะ monorepo เปิดสาธารณะทั้ง CODEOWNERS CONTRIBUTING docs
> repo: [github.com/guardian/csnx](https://github.com/guardian/csnx) (ย้ายมาจาก `guardian/source`)

**Development Kitchen = ชั้น incubation ที่แยกเป็น npm package คนละใบกับ core** ชื่อ `@guardian/source-development-kitchen` `[ทางการ]`
> "The Source Development Kitchen is where new components and patterns can be cooked up, tested and shared. **There are minimal acceptance criteria. It's okay to duplicate and break things.** If a Kitchen component proves valuable, it may be promoted to `@guardian/source`."

เหตุผลที่สร้าง เขียนไว้ตรง ๆ ใน README และตรงกับอาการที่ DS ทุกเจ้าเจอ `[ทางการ]`
> "Adding new components to Source requires deep work and collaboration across disciplines… It takes a long time and substantial effort for components to land in Source."
> "Potentially shareable components are built directly into applications, leading to **fragmentation, inconsistency and duplication**."

**กลไก 3 อย่างที่ทำให้ Kitchen ไม่กลายเป็นที่ทิ้งของ**

| กลไก | ข้อความต้นฉบับ |
|---|---|
| แยก package = แยก semver | "Allows us to make frequent breaking changes to the Source Development Kitchen **whilst preserving semver in Source**. The stable library changes at a slower pace, in order to set expectations and preserve developer confidence." |
| ทีมกลางไม่ support | "Kitchen components are **unsupported by CSTI**. They are owned by the team or teams consuming them." |
| จะใช้ ต้องเซ็นชื่อเป็นเจ้าของ | "If you wish to start consuming a Kitchen component, **add your team as CODEOWNERS**." |

**หลักฐานว่า federated ownership เกิดขึ้นจริงระดับ component** CODEOWNERS รุ่น `guardian/source` ระบุเจ้าของรายตัว `[ทางการ]`

| component | ทีมเจ้าของ |
|---|---|
| button lines logo quote-icon star-rating | `@guardian/dotcom-platform` |
| footer-with-contents numeric-input | `@guardian/conversions-developers` |
| summary | `@guardian/identity` |
| toggle-switch | `@guardian/mss-admins` |
| expanding-wrapper | `@guardian/editorial-experience` |
| ที่เหลือทั้งรีโป | `@guardian/client-side-infra` |

**กฎ intake ที่เด็ดขาดที่สุดที่พบในงานวิจัยนี้** `[ทางการ]` (contributing.md)
> "**New components should be added to the Development Kitchen**" และ "**New components must have a CODEOWNER**"

แปลว่า **ห้ามเพิ่ม component ใหม่เข้า core ตรง ๆ** ทุกตัวต้องผ่านครัวก่อน

**Breaking change policy ที่ต่างจากคนอื่น: นับ visual change เป็น semver ด้วย** `[ทางการ]`
> "This should include **visual changes**, not just changes to the API"

ตัวอย่างการตัดสินจริง: ปรับสีจนกระทบ contrast ratio = **major** เพิ่ม font-size ใหม่ = **minor** ปรับ underline height ให้ a11y ดีขึ้นโดยไม่ต้องแก้อะไรตาม = **patch**

**Deprecation ที่เดินครบวงจรจริง** `[ทางการ]` ไฟล์รวมศูนย์ `deprecated-exports.ts` ("To be removed from the public interface in the next major version") + JSDoc `@deprecated` ชี้ตัวแทน CHANGELOG ยืนยันว่าเดินเป็นรอบจริง: ประกาศ deprecated แต่ยังใช้ได้ → alias ชี้ชื่อใหม่ → ลบใน major ถัดไป

**variant explosion** คุมด้วย **theme object แยกไฟล์** แทน prop บาน (`buttonThemeBrand` `buttonThemeBrandAlt` `buttonThemeReaderRevenue` `buttonThemeReaderRevenueBrand`) + กฎ CSS "Avoid dynamic styles" และ "Avoid using `styled` to create or extend components"

**ตัวเลข** `[ทางการ]` นับจาก GitHub API 2026-08-19: core **21 component** Development Kitchen **16 component** ทีมโปรดักต์ที่เป็นเจ้าของของใน Kitchen **5 ทีม** release ต่อเนื่องด้วย changesets **ไม่พบ** ขนาดทีมและ adoption

> **ข้อสังเกตสำคัญ:** core 21 ต่อครัว 16 คือเกือบ 1:1 แปลว่าชั้น incubation **ไม่ใช่ที่พักชั่วคราวที่ต้องรีบเคลียร์** แต่เป็นสภาพปกติถาวรขององค์กร

**ไม่พบ:** ใครดูแล Figma library (เว็บ DS เป็น zeroheight ที่ดึงเนื้อหาไม่ได้) ใครวัด adoption บทบาท content design กระบวนการ audit ของที่ไม่มีคนใช้ เนื้อหา acceptance criteria จริง (หน้า zeroheight render ด้วย JS)

### 14.2 BBC (GEL Presentation Layer WebCore)

> **เจ้าที่ตัวเลขใกล้ Nation ที่สุด: 10 แบรนด์** แหล่งหลักคือ talk ของ Sophie Beaumont (Software Engineering Manager ผู้ก่อตั้งทีม Web Design System ทีมแรกของ BBC) `[กึ่งทางการ]`
> ⚠️ monorepo ตัวจริง (WebCore) เป็น internal repo สาธารณะ (`bbc/psammead`) ประกาศแล้วว่า "NO LONGER MAINTAINED"

**แยกภาษาการออกแบบออกจากระบบ component เป็นคนละของ** `[ทางการ]` repo `bbc/gel` เขียนไว้ตรง ๆ
> "Notice that there is **no library or framework here**, we're just documentation all the way down."

GEL = เอกสารมาตรฐานกลาง WebCore = โค้ด คนละรีโป คนละเจ้าของ

**ทีมกลางนิยามตัวเองว่า gardeners ไม่ใช่ gatekeeper** `[กึ่งทางการ]`
> "Teams contribute freely; the central design system team acts as **'gardeners'**" "The Presentation Layer team are **not the sole maintainers** of the design system"

**บังคับมีเจ้าของทุก component** ผ่าน CODEOWNERS ("mandatory ownership… codified via GitHub's CODEOWNERS") และ
> "each team building components in WebCore have **equal ownership** of the Design System"

**กลไกกันบวมที่ตรงไปตรงมาที่สุดในงานวิจัยนี้** `[กึ่งทางการ]`
> "Layouts, Components and Tokens are **only created when they are needed**, typically waiting until there are **at least two use-cases** for a component before creating it"

**ไม่มี versioning เลย** `[กึ่งทางการ]` "When code merges into WebCore, it goes live immediately as the single source of truth" ย้ายภาระไปที่ Chromatic visual regression ตอน PR แทน

**เกณฑ์คุณภาพ component (จาก psammead)** `[ทางการ]` ต้องเป็น **Presentational** (ห้าม fetch หรือ mutate data) **GEL-Compliant** **Accessible** และ Definition of Done กว้างกว่าปกติ
> "Psammead's 'Definition of Done' is not only when a package is published but **when all the Psammead packages that consume that package are updated**"

**intake** มีเช็กลิสต์ก่อนเริ่มเขียน 6 ข้อ (แบบ final แล้วหรือยัง ผ่าน a11y review แล้วหรือยัง มี acceptance criteria แล้วหรือยัง ต้องแปลภาษาไหม ต้อง event tracking ไหม ต้องตั้ง "swarm" คุยก่อนไหม) `[ทางการ]`

**a11y แบบ shifting left** UX designer + architect + developer ร่วมกันร่างโครง semantic HTML ตั้งแต่ขั้นออกแบบ ไม่ใช่ตรวจตอนท้าย `[แหล่งรอง สรุป talk ของพนักงาน]`

**ตัวเลข** `[กึ่งทางการ]` **10 แบรนด์** **25 ทีม** ที่ contribute **มากกว่า 150 component** **450 contributor** ใน monorepo **285 deployment** ในเดือนล่าสุด **4.8 พันล้าน request ต่อเดือน** **ไม่พบ** ขนาดทีมกลางและ adoption %

> **บทเรียนสำหรับ Nation:** 10 แบรนด์ใช้ component ชุดเดียว 150 ตัว **ไม่แตกไลบรารีตามแบรนด์** แปลงความต่างเป็น token/theme ทั้งหมด
> **ข้อควรระวัง:** การไม่มี versioning ใช้ได้เพราะ BBC คุม consumer ทั้งหมดไว้ในแพลตฟอร์มเดียว + ลงทุน visual regression เต็มรูป เว็บที่ deploy คนละ pipeline ลอกตรง ๆ ไม่ได้

### 14.3 News UK (NewsKit)

> **แก้ข้อมูลจากภาคแรก:** §2 มีแค่ "designer advocates" จากบล็อก Figma ของจริงคือ design system ชื่อ **NewsKit** ที่ **open source เต็มรูป** ([repo](https://github.com/newscorp-ghfb/newskit) [newskit.co.uk](https://www.newskit.co.uk/))
> **เจ้านี้ใกล้โจทย์ Nation ที่สุดเชิงสถาปัตยกรรม** เพราะเป็น multi-brand news ที่เปิดกลไก theming ให้ดูได้ทั้งหมด

**ทีม** `[ทางการ]` "The NewsKit core team is a **Scrum-sized team based in London and Sofia** and includes **designers and engineers**" CODEOWNERS ทั้งรีโปเป็นของ `@newscorp-ghfb/newskit-council` (เรียกตัวเองว่า **council**)

**ตำแหน่งจริง:** Nick Dorman = Head of Design Systems James Davis = Lead Designer `[แหล่งรอง สัมภาษณ์]`

**กฎ intake ที่ Nation ควรลอกไปใช้ตรง ๆ** `[ทางการ]` CONTRIBUTING.md
> "**It's up to you to make a strong case** to convince the project's developers of the merits of this feature. Keep in mind that we want features that will be useful to the **majority of our users and not just a small subset**. **If you're just targeting a minority of users, adding the component to your team's library might be better.**"

และบังคับระบุแบรนด์ทุกครั้งที่เปิด issue: "**Provide the name of your team/brand**" ทำให้ทีมกลางเห็นตลอดว่าแรงกดดันมาจากแบรนด์ไหน

**โครง theme 3 ชั้น (แบรนด์แก้อะไรได้)** `[ทางการ]` จากโครงไฟล์จริงใน `src/theme`

| ชั้น | ไฟล์จริง | เนื้อหา |
|---|---|---|
| foundations | `colors.ts` `fonts.ts` `sizing.ts` `spacing` `borders.ts` `breakpoints.ts` `motions.ts` `shadows.ts` | ค่าดิบของแบรนด์ |
| presets | `style-presets.ts` `typography-presets.ts` `space-presets.ts` `transition-presets.ts` | คอมโบที่ตัดสินแล้ว (ตรงกับหลัก preset-only ที่ NTGDS ใช้กับ typography อยู่แล้ว) |
| component defaults | `component-defaults.ts` | ผูกว่า component ไหนใช้ preset ไหนเป็นค่าตั้งต้น |

แบรนด์ไม่ได้เขียน theme ใหม่ แต่ส่ง `overrides` ทับ `baseTheme` ผ่าน `createTheme({ name, baseTheme, overrides })`

**ของแปลกที่มีค่ามาก: ตรวจ override ที่ไม่จำเป็นโดยอัตโนมัติ** `[ทางการ]` ใน `creator.ts` มีฟังก์ชัน `deepDuplicationChecker` ที่เตือนเมื่อแบรนด์ override ค่าที่เหมือน base theme อยู่แล้ว
```
Override at path: '${newKey}' has the same value as base theme: '${value}'.
```
เป็นวิธีกัน theme ของแต่ละแบรนด์บวมโดยไม่ต้องใช้คนรีวิว

**variant explosion** ก่อนมี NewsKit ทีมมี "thousands of styles just to accommodate all of the variants for each brand" `[แหล่งรอง]` แก้ด้วย **Themer plugin** ที่เขียนเอง ให้ component ตัวเดียวสลับ theme ได้ แทนการทำ variant แยกแบรนด์

**a11y + VRT อัตโนมัติในไปป์ไลน์** cypress-axe + Percy `[ทางการ]`

**ตัวเลข** `[ทางการ]` **67 component** ทีมแกน Scrum-sized (ราว 5 ถึง 9 คน) 2 ที่ release ทุก **1 ถึง 14 วัน** NPS เพิ่ม **23 จุด** ในไตรมาสแรกหลังย้ายมา Figma `[แหล่งรอง]`

**ไม่พบ:** นโยบาย deprecation เป็นลายลักษณ์อักษร กระบวนการ audit พื้นที่ incubation (ใช้วิธีผลักไป "your team's library" แทน ซึ่งตรงข้ามกับกลยุทธ์ครัวของ Guardian)

> **คำพูดที่สรุปโจทย์ multi-brand ได้ดีที่สุด** จาก Nick Dorman `[แหล่งรอง]`
> "We have a lot of brands with a lot of heritage, and they have tight requirements on how things should look and feel."
> "Historically, the various brands… have operated **completely independently**, with separate design orgs, product teams, and even different tools."

### 14.4 กลุ่มสื่อทำเหมือนกันตรงไหน ต่างกันตรงไหน

| ประเด็น | Guardian | BBC | News UK |
|---|---|---|---|
| จำนวนแบรนด์ | 1 แบรนด์ หลายสายธุรกิจ | **10 แบรนด์** | หลายแบรนด์ (ยืนยันได้ The Times The Sun) |
| component ใน core | 21 | 150+ | 67 |
| ที่อยู่ของของที่ยังไม่นิ่ง | **Development Kitchen** (package แยก ในบ้าน) | ไม่พบชั้นแยก | **ผลักออกไปไลบรารีของทีมเอง** |
| ownership ต่อ component | CODEOWNERS รายตัว 5 ทีม | CODEOWNERS บังคับทุกตัว 25 ทีม | council ถือทั้งรีโป |
| versioning | changesets + visual change นับ semver | **ไม่มี version** | semver ปกติ |
| ความต่างของแบรนด์อยู่ที่ไหน | theme object | **token/theme** | **theme 3 ชั้น + overrides** |
| ทีมกลางนิยามตัวเองว่า | ผู้ควบคุมการ merge | **gardeners** | council |

**สิ่งที่ทั้ง 3 เจ้าทำเหมือนกันหมด และควรถือเป็นข้อสรุปของกลุ่มสื่อ**
1. **ไม่มีเจ้าไหนแตกไลบรารีตามแบรนด์** ความต่างของแบรนด์ถูกดันลงไปที่ชั้น token/theme ทั้งหมด
2. **ทุกเจ้าบังคับให้ของทุกชิ้นมีเจ้าของ** ไม่ว่าจะด้วย CODEOWNERS หรือ council
3. **ทุกเจ้ามีทางออกให้ของที่ยังไม่พร้อมเข้า core** ต่างกันแค่ดึงเข้ามาไว้ใกล้ (Guardian) หรือผลักออกไป (News UK)
4. **ไม่มีเจ้าไหนเปิดเผยตัวเลข adoption** และ 2 ใน 3 ไม่มีนโยบาย deprecation เป็นลายลักษณ์อักษร

---

## 15. กลุ่มโปรดักต์

### 15.1 Spotify Encore

**โครงสร้างคือ system of systems** `[กึ่งทางการ]` "each of the small circles above is a fully fledged design system that… is actively maintained by a dedicated team"

| หน้าที่ | เจ้าของ |
|---|---|
| Encore Foundation (token สี typography motion spacing + ไกด์ writing/a11y) | ทีมกลาง Encore |
| component web (React) | Encore Web สังกัดแผนก **Design Platform** (ไม่ได้อยู่ใต้ Design) |
| component mobile | Encore Consumer Mobile (คนละ subsystem) |
| component ข้ามแพลตฟอร์ม | มี **project lead per component** ดึงตัวแทน iOS/Android/Web/TV/Watch มาร่วม |
| accessibility | squad ชื่อ **Mandalorian** ที่ดูแล a11y ทั้งบริษัท ทำงานร่วมกับ Encore `[ทางการ]` |
| content design | อยู่ในทีม Encore เอง (ทีม cross-functional มี writer) |
| วัด adoption และตั้ง metric | **Product Manager สาย Design Systems** "Establish meaningful success metrics for platform adoption, design quality, accessibility, and developer experience" `[ทางการ job posting]` |

**local design system ทำหน้าที่เป็นกันชน** `[กึ่งทางการ]` "it creates something of a **first line of defense**, reducing the demand on Encore Consumer Mobile"

**กลไกที่ไม่มีใครอื่นทำ: วัดว่า prop ไหนถูก override บ่อย** `[ทางการ]`
> "Utilizing analytics on our slot pattern, we can keep tabs on **what props are overridden most often**"

**ตัวเลข** ก่อนรวมเป็น Encore มี design system ลอยอยู่ **22 ระบบ** `[กึ่งทางการ]` local system 2 ระบบ (ปี 2019) Encore Web รองรับ **200+ web application** `[กึ่งทางการ job posting]`

**ไม่พบ:** เกณฑ์เลื่อน local เข้า core เป็นลายลักษณ์อักษร intake/RFC (Encore ไม่ open source) นโยบาย deprecation ขนาดทีม จำนวน component
ปี 2023 ทีมยังบอกเองว่า "**building up our contribution process**" คือยังไม่มี

### 15.2 Salesforce (SLDS 1 ไป SLDS 2)

> **finding ใหญ่: ownership เปลี่ยนจาก open source ที่ contribute ได้ เป็นปิด** ตอนขึ้น SLDS 2

**สภาพ repo จริง ตรวจ 2026-08-19** `[ทางการ]`

| repo | สถานะ | ความหมาย |
|---|---|---|
| `salesforce-ux/design-system` (SLDS 1) | **archived** | ยุคที่คนนอก contribute โค้ดได้ ปิดแล้ว |
| `salesforce-ux/design-system-2` | active แต่มี 6 ไฟล์ (มี `DOCS_ONLY.md`) | **โค้ด SLDS 2 ไม่เปิด** เป็น issue tracker ล้วน |
| `salesforce-ux/design-system-md-docs` | active | เอกสาร CSS class + token ที่เดียวที่ยังเปิด |
| `salesforce-ux/slds-linter` | active | เครื่องมือบังคับใช้กติกา |

> "This repo contains docs only; **No code is allowed** and the content is not licensed under any Open Source license."

แปลว่าคนนอกทำได้แค่แจ้ง issue ไม่มีสิทธิ์ส่ง PR เข้า core อีกแล้ว เข้มกว่า Atlassian หนึ่งขั้น

**styling hooks เป็น ownership boundary ยังไงในทางปฏิบัติ** `[ทางการ]`

| ประเด็น | ข้อความจริง |
|---|---|
| ขอบเขต global | "Global color styling hooks (`--slds-g-*`)… Use global hooks to make a change **across all the components**" |
| ขอบเขต component | "Component styling hooks (`--slds-c-*`)… The change **won't affect buttons in other components**" |
| เหตุผลของเส้นแบ่ง | "**CSS overrides are not supported** because SLDS classes and base component internals **can change in future releases**. The overrides can become outdated and no longer work as you intended." |
| สถานะจริง | "Component styling hooks are **not yet supported in SLDS 2**" |

อ่านตรง ๆ คือ ภายใน component เป็นของทีม SLDS (เปลี่ยนเมื่อไหร่ก็ได้) และ **hook คือ public API เดียวที่ลูกค้าเป็นเจ้าของ** ผลคือของที่อยู่นอกเส้น (CSS override Aura design token BEM) ถูกประกาศ deprecated พร้อมกันหมดตอนขึ้น SLDS 2

**บังคับใช้ด้วย linter ไม่ใช่คนรีวิว** SLDS Validator สแกนโค้ดลูกค้าแล้วแนะนำ hook ที่ควรใช้แทน `[ทางการ]`

**Deprecation ที่มีของจริงในโค้ด** `[ทางการ]` ใส่ `@deprecated` → ย้ายโค้ดไป `_deprecate.scss` → ครอบด้วย mixin ที่รับ **เวอร์ชันที่จะตาย + ของที่ให้ใช้แทน**
```
@include deprecate('4.0.0', 'Please use slds-foo instead of slds-bar') { .slds-bar { ... } }
```
ในเอกสาร SLDS 2 ของที่เลิกใช้ย้ายไปโฟลเดอร์ `components/deprecated/` แยกออกมา (13 ไฟล์)

**incubation ระดับ CSS class** `[ทางการ]` ทุก class มีฟิลด์ Support ว่าเป็น **dev-ready** ("fully vetted and tested and safe to use") หรือ **prototype** ("not fully vetted yet")

**คุม variant** ด้วย 2 ฟิลด์บังคับต่อ class: `Restrict` (class นี้แปะบน element ไหนได้) และแยก **variant** ("base level pattern for a component") ออกจาก **modifier** ("Typically these will be colors, sizing and positioning")

**ตัวเลข** `[ทางการ]` SLDS 1 = 95 component folder SLDS 2 docs = 85 ไฟล์ + 13 deprecated global token ธีม Cosmos = **717 ตัว** npm SLDS 1 ปล่อย **303 เวอร์ชัน** ตั้งแต่ 2015 (ราว 2 ครั้งต่อเดือน) **ไม่พบ** ขนาดทีมและ adoption

### 15.3 Adobe Spectrum

> **finding เด่น: แยกข้อมูลออกแบบ (design data) ออกจาก implementation เป็นคนละ repo คนละทีม** และเป็นเจ้าเดียวที่มี **deprecation policy พร้อมกรอบเวลา** เขียนเป็นเอกสารสาธารณะ

| หน้าที่ | เจ้าของ |
|---|---|
| design token + component schema (source of truth) | repo `adobe/spectrum-design-data` |
| implementation ต่อแพลตฟอร์ม (CSS React Web Components iOS Android) | **แต่ละทีมวิศวกรรมดูแลของตัวเอง** มี storybook ของตัวเอง `[กึ่งทางการ]` |
| Spectrum Web Components | "developed by a **core team in Adobe Design Engineering**, but we welcome contributions from inside and outside Adobe" `[ทางการ]` |
| native platform | มี **Senior Design Manager** แยกคุมสาย native โดยเฉพาะ `[กึ่งทางการ job posting]` |
| ตรวจชื่อ token ตามไกด์ | **engineering representative** ตรวจหลัง designer ตั้งชื่อใน Figma |
| ชื่อเชิงความหมาย | **content strategist** คุมวงคุยเรื่องชื่อ semantic |
| accessibility | **accessibility advocates ทำงานข้ามทีม** ไม่ใช่ทีมเดียวถือ |
| ประสานงานข้ามทีม | program manager + product manager |

**Intake ใช้ RFC ผ่าน GitHub Discussions** `[ทางการ]` และ RFC ฉบับ token authoring ยอมรับปัญหาของตัวเองตรง ๆ (มีค่ามากเพราะเป็นเสียงจากในบ้าน)
> "No Validation: Errors discovered late in process" "No Review Process: **Changes go directly to production**" "Fragmented Tools: Token Studio, Figma, JSON files, spreadsheets" "No Versioning: Can't track changes or rollback"

**ด่านรีวิวตามชั้นความเป็นเจ้าของ (ยังเป็น draft)** Foundation token = 2 approvals + **foundation steward** Platform token = 1 ถึง 2 approvals + **platform steward**
> คำว่า **steward** คือบทบาทผู้อนุมัติสุดท้ายที่ชัดที่สุดในบรรดาองค์กรที่สำรวจทั้งหมด

**เกณฑ์ merge ที่บังคับใช้จริงแล้ว** `[ทางการ]` ต้องได้ **approval จาก maintainer 2 คน** + CI ผ่าน a11y เป็นด่านบังคับทุก PR "Do not ship **regressions** in accessibility, semantics, or documented behavior" SLA รีวิว "aim to respond within about a business day"

**Deprecation policy พร้อมกรอบเวลา** `[ทางการ]`

| ประเด็น | ข้อความจริง |
|---|---|
| ตารางเวลา | "the removal… is considered for the **next major release after** the major release for which it was marked as deprecated" |
| ขั้นต่ำ | "we'll minimally mark things as deprecated for **2 releases or six months** (whatever is smaller)" |
| ระดับความเร่งด่วน | **Yellow** = "marked as deprecated but still functional" **Red** = "nearing removal and require immediate action" |

**แยกรุ่นใหญ่ = แยก branch** "for Spectrum 2 token data has been graduated to the `main` branch. If you need access to the S1 data, use the `s1-legacy` branch"

**ตัวเลข** Spectrum 2 ครอบคลุม **100+ Adobe application** `[ทางการ]` **ไม่พบ** ขนาดทีม จำนวน component และ token

---

## 16. สังเคราะห์ 9 องค์กร

### 16.1 กลไกคุมการขยายตัว ใครใช้แบบไหน

| กลไก | ใครใช้ | รูปแบบที่ใช้จริง |
|---|---|---|
| **ชั้น incubation แยกออกจาก stable** | Guardian Carbon Salesforce Primer Spotify | Guardian แยก **npm package** Carbon แยก **repo + Storybook + พื้นที่ Figma** Salesforce ใช้ **ฟิลด์ prototype ระดับ CSS class** Primer ใช้ `src/drafts` + ให้ไปเกิดในโปรดักต์ก่อน Spotify ใช้ **local design system** |
| **ผลักออกไปให้ทีมดูแลเอง** | News UK Primer | "adding the component to **your team's library** might be better" "As long as what you ship is accessible… **go for it**" |
| **บังคับทุก component ต้องมีเจ้าของ** | Guardian BBC | CODEOWNERS รายตัว "New components **must have a CODEOWNER**" |
| **รอให้มีผู้ใช้อย่างน้อย 2 รายก่อนสร้าง** | BBC | "typically waiting until there are **at least two use-cases**" |
| **ความต่างของแบรนด์ไปอยู่ที่ token/theme ไม่ใช่ variant** | BBC News UK Vox Adobe | NewsKit ทำเป็น theme 3 ชั้น + overrides News UK เขียน Themer plugin เอง |
| **ตรวจ override ที่ซ้ำกับค่าฐานอัตโนมัติ** | News UK | `deepDuplicationChecker` เตือนเมื่อ override ค่าที่เหมือน base theme |
| **วัดว่า prop ไหนถูก override บ่อย** | Spotify | analytics บน slot pattern |
| **ดักที่ผิว API ด้วยเครื่องมือ** | Carbon Salesforce | Carbon ใช้ CODEOWNERS + snapshot test `PublicAPI-test.js.snap` Salesforce ใช้ linter สแกนโค้ดลูกค้า |
| **นับ visual change เป็น breaking change** | Guardian | "This should include **visual changes**, not just changes to the API" |
| **deprecation ที่มีกรอบเวลาเขียนไว้** | Primer (6 เดือน) Adobe (2 releases หรือ 6 เดือน) Carbon (ตาราง EOL รายวันที่) Salesforce (mixin ระบุเวอร์ชันที่จะตาย) | |
| **ผู้อนุมัติสุดท้ายมีชื่อบทบาท** | Adobe (**steward**) Primer (**DRI** รายไฟล์ Figma) | |
| **ไม่วัด adoption โดยตั้งใจ** | Atlassian | ใช้ champion 25 คนแทน |

### 16.2 ข้อเสนอที่ปรับปรุงจาก §7 (หลังได้หลักฐานเพิ่ม 6 องค์กร)

§7 เสนอ hybrid 3 ชั้นไว้แล้ว และ **ยังยืนอยู่** หลักฐานรอบ 3 ทำให้เติมได้อีก 6 ข้อที่เป็นรูปธรรมกว่าเดิม

| # | สิ่งที่ควรเพิ่ม | ต้นแบบ | เหตุผลเฉพาะของ NTGDS |
|---|---|---|---|
| 1 | **กฎ "รอ 2 use case ก่อนสร้าง"** | BBC | ราคาถูกที่สุด เป็นประโยคเดียว แต่กันของงอกได้ตั้งแต่ต้นทาง |
| 2 | **ประโยคเกณฑ์ intake ของ NewsKit** ("ถ้าตอบโจทย์แค่คนส่วนน้อย ให้ไปอยู่ไลบรารีของทีมเอง ภาระพิสูจน์อยู่ที่ผู้ขอ") | News UK | ตอบปัญหา core บวมด้วยประโยคเดียว และเข้ากับสภาพที่เรามีคนทำ DS น้อย |
| 3 | **ชั้นครัว (incubation) ที่แยกออกจาก library จริง** | Guardian Carbon | ต้องแยกทั้งที่อยู่ใน Figma และการ publish ไม่ใช่แค่ติดป้ายในหน้าเดียวกัน สัดส่วน core 21 ต่อครัว 16 ของ Guardian ยืนยันว่าชั้นนี้เป็นสภาพปกติถาวร |
| 4 | **ยืนยันซ้ำว่าแบรนด์ต่างกันที่ theme ไม่ใช่ variant** | BBC (10 แบรนด์ 150 component ชุดเดียว) News UK Vox | เป็นหลักฐานตรงที่สุดว่าแผน brand layer ใน §7.2 ถูกทาง และห้ามทำ variant แยกแบรนด์เด็ดขาด |
| 5 | **สคริปต์ตรวจ override ที่ซ้ำกับค่าฐาน** | News UK `deepDuplicationChecker` | เรามีขั้นตอน build อยู่แล้ว (`tokens:build` + `clean-selfref.mjs`) เพิ่มการตรวจนี้เข้าไปได้เลยตอนทำ brand layer |
| 6 | **นับ visual change เป็น breaking change** | Guardian | DS เราเป็น design-first การเปลี่ยนสีจนกระทบ contrast สำคัญกว่าการเปลี่ยนชื่อ prop |

### 16.3 สิ่งที่หลักฐานบอกว่าเรา "ยังไม่ต้องทำ"

| ไม่ต้องทำตอนนี้ | เหตุผลจากหลักฐาน |
|---|---|
| ระบบ telemetry วัด adoption | Carbon ที่ทำได้เพราะคุม CI ทั้งองค์กร Primer และกลุ่มสื่อทั้ง 3 เจ้ายังไม่มีตัวเลข adoption สาธารณะเลย |
| เลิกใช้ versioning แบบ BBC | ใช้ได้เพราะ BBC คุม consumer ไว้ในแพลตฟอร์มเดียว + ลงทุน visual regression เต็มรูป |
| federated governance | Guardian และ BBC ทำได้เพราะมีทีมโปรดักต์ 5 ถึง 25 ทีมที่พร้อมเซ็นเป็นเจ้าของ เรายังไม่มี |
| แยก design language ออกจาก component library เป็นคนละของ (แบบ GEL) | เหมาะกับองค์กรที่มีหลายแพลตฟอร์มและหลายทีมสร้าง implementation เอง |

---

# ภาคสี่ กลุ่มสื่อชุดที่ 2 (รอบ 4)

> เพิ่ม 2026-08-19 Financial Times (Origami) Vox Media (Unison) Schibsted (CORDS) Warp Bloomberg Industry Group (Fish Tank) New York Times
> **แก้ข้อมูลผิดที่วนอยู่:** สิ่งที่เรียกว่า **"Fish Tank" ไม่ใช่ของ New York Times** แต่เป็นของ **Bloomberg Industry Group** (เดิม Bloomberg BNA) โดเมนเอกสารเดิมคือ `fishtank.bna.com` (`bna` = Bureau of National Affairs) `[กึ่งทางการ]` [timothyreeder.com](https://timothyreeder.com/work/fishtank/) [github.com/orgs/bloombergindustry](https://github.com/orgs/bloombergindustry/repositories)

---

## 17. Financial Times (Origami) เจ้าที่สำคัญที่สุดของรอบนี้

> กลุ่มสื่อที่เปิดเอกสาร governance มากที่สุด และเป็นเจ้าเดียวที่เข้ารหัส **ownership + lifecycle + brand ลงในไฟล์ที่เครื่องอ่านได้**

### 17.1 หลักฐานตรงที่สุดว่าไม่ต้องเลือกระหว่าง Atomic กับ Ownership

ทุก component ของ FT มีไฟล์ `origami.json` ที่ JSON Schema บังคับฟิลด์ `[ทางการ]` ([manifest schema](https://github.com/Financial-Times/origami-manifest-specification-schema))

| ฟิลด์ | ค่าที่ยอมรับ | แกนที่มันตอบ |
|---|---|---|
| `origamiCategory` | **components primitives utilities layouts** | **แกน composition** (เทียบได้กับ Atomic ของเรา) |
| `supportStatus` | **active maintained deprecated dead experimental** | **แกน lifecycle** เขียนแบบเครื่องอ่านได้ |
| `brands` | **master internal whitelabel** | **แกน brand** |
| `support` + `supportContact` | email + Slack channel | **แกน ownership** ใครดูแลของชิ้นนี้ |

ฟิลด์ที่ schema บังคับต้องมี: `description` `origamiType` `origamiVersion` `keywords` `support` `supportStatus`

**ตัวอย่างจริงที่พิสูจน์ว่า component บางตัวเป็นของทีมอื่น ไม่ใช่ทีม DS กลาง** `[ทางการ]` ([o-ads/origami.json](https://github.com/Financial-Times/o-ads/blob/master/origami.json)) ระบุ `support: "origami.advertising.technology@ft.com"` และ slack `financialtimes/advertising-dev` คือ **ทีมโฆษณาเป็นเจ้าของ component นี้**

> **บทเรียนข้อ 1:** FT ไม่ได้เขียน ownership ไว้ในหน้าเอกสารสวย ๆ แต่ **บังคับเป็นฟิลด์ที่ต้องกรอกใน manifest ของทุก component** ไม่มีเจ้าของ = สร้างไม่ผ่าน schema
> **บทเรียนข้อ 2:** 3 แกน (ประกอบจากอะไร โตแค่ไหน ใครใช้ได้) แยกเป็นคนละฟิลด์ในไฟล์เดียว ไม่ต้องเลือกอย่างใดอย่างหนึ่ง **ตรงกับข้อสรุปหลักของ §5 ทุกประการ แต่มีของจริงให้ดู**

### 17.2 คุม variant explosion ด้วยการให้แบรนด์ opt-in ทีละ variant

เครื่องมือชื่อ `o-brand` `[ทางการ]` ([repo](https://github.com/Financial-Times/o-brand)) นิยาม brand ว่า
> "a brand represents an environment which requires components to offer a distinct appearance or unique functionality… **branded components may provide unique features as well as a distinct appearance**"

| brand | นิยามตามต้นฉบับ |
|---|---|
| `master` | "FT branding for public ft.com sites and affiliates" |
| `internal` | "Style suitable for internal products, tools, and documentation" |
| `whitelabel` | "Base, structural styles only" |

**แบรนด์กำหนดได้แค่ 2 อย่าง** ผ่าน mixin `oBrandDefine`
1. `variables` ค่าตัวแปรของ component นั้นในแบรนด์นั้น (รองรับ nested map ต่อ variant)
2. `supports-variants` **รายชื่อ variant ที่แบรนด์นั้นเปิดใช้**

> **บทเรียนข้อ 3 (ตอบ variant explosion ตรงที่สุด):** FT ไม่ได้คุม variant ด้วยการห้ามสร้าง แต่ให้ **แต่ละแบรนด์ opt-in ทีละ variant** variant ที่แบรนด์ไม่ประกาศ = ใช้ไม่ได้ในแบรนด์นั้น core จึงมี variant เยอะได้โดยแบรนด์ไม่รก

และเขียนขอบเขตความเป็นเจ้าของไว้ตรง ๆ ว่า "Non-Origami projects **must not depend on `o-brand` directly**" คือเครื่องมือทำแบรนด์เป็นของทีม Origami เท่านั้น

### 17.3 Deprecation ที่ทำจริง ไม่ใช่แค่ประกาศ

`supportStatus` สะท้อนใน repo จริง `[ทางการ]` ([repo search](https://github.com/orgs/Financial-Times/repositories?q=origami)) มี repo ตระกูล origami ราว **150 ตัว ส่วนใหญ่ archived** และคำอธิบาย repo ใช้ **คำเดียวกับ enum** พร้อมบอกทางออกเสมอ

| repo | คำอธิบายจริง |
|---|---|
| `origami-registry` | "**Dead**, please use the new Origami Registry" |
| `origami-bower-registry` | "**Decommissioned**, Origami components are now published to the npm registry" |
| `get-origami-repos` | "**Deprecated**, please use origami-repo-data instead" |

> **บทเรียนข้อ 4:** ใช้คำเดียวกับ enum ทุกที่ และบอกเสมอว่าให้ไปใช้อะไรแทน

### 17.4 ทิศทางถัดไปของ FT ตรงกับแผน NTGDS

`[กึ่งทางการ ประกาศงาน]` Origami 3 เลิกใช้ Sass เปลี่ยนเป็น plain CSS ทีม "actively exploring **Design Tokens** as a method to **manage multi-brand support**" component สร้างบน Web Component standards เพราะ "favour web standards, rather than a specific framework, to support teams across the FT Group" ประกาศงานเรียก Origami ว่า **"multi-brand design system"** ตรงตัว

**ไม่พบ:** เกณฑ์รับ component ใหม่เป็นข้อ ๆ ใคร approve adoption dashboard จำนวน component ปัจจุบัน ขนาดทีม
⚠️ **ข้อจำกัดการเข้าถึง (2026-08-19):** `origami.ft.com` ถูกบล็อกจาก fetch และ monorepo `Financial-Times/origami` คืน 404 ทุกไฟล์ สอดคล้องกับที่เห็นว่า `o-ads` ถูก archive เมื่อ 16 มิ.ย. 2026 ข้อมูล FT ที่นี่จึงมาจาก repo ย่อยที่ยังเปิดอยู่เป็นหลัก

---

## 18. Vox Schibsted Warp Bloomberg NYT

### 18.1 Vox Media (Unison) เกณฑ์คัดที่มีตัวเลขผลลัพธ์

Unison = front-end counterpart ของ Chorus (CMS ของ Vox) รวม **8 แบรนด์บรรณาธิการ** (The Verge Eater Polygon Curbed Recode Vox.com Racked SB Nation) ให้อยู่บน design system + codebase เดียว `[กึ่งทางการ]` ([yeseniaperezcruz.com](https://www.yeseniaperezcruz.com/projects/vox-media))

**โครงสร้าง 3 ขา ที่ตรงกับ Nation มากที่สุดในทุกองค์กรที่สำรวจ** `[กึ่งทางการ]` ([heckhouse.com](https://heckhouse.com/work/vox-media/))
**Platform team** + **centralized brand team** + **design group ประจำแต่ละแบรนด์** โดย Bethany Heck (Executive Design Director) ระบุว่าทำงาน "hand-in-hand with the core brand team" เพื่อสมดุลระหว่างวิสัยทัศน์แบรนด์กับความสามารถของแพลตฟอร์ม Yesenia Perez-Cruz (Design Director) เป็นผู้นำงานออกแบบ Unison

**เกณฑ์คัด component ด้วย 3 คำถาม** `[แหล่งรอง บันทึกงาน An Event Apart 2018]` ([hookedoncode.com](https://hookedoncode.com/2018/04/scenario-driven-design-systems-yesenia-perez-cruz/))
1. Does this snippet **add value**?
2. Is it available for **more than 3 brands**?
3. Is it necessary for **1 brand**?

**ผลลัพธ์ที่วัดได้จากการคัด** snippet ลดจาก **81 เหลือ 43** (ลด 47%) feature template รวบจาก **18 แบบเหลือระบบเดียว**

**กฎกัน variant explosion** `[แหล่งรอง]`
> "Variation is GOOD if: There's a **specific problem** that needs a new pattern, determined by user scenarios and content needs, strengthens brand voice serving the audience."

**แบรนด์แก้อะไรได้ แก้ไม่ได้อะไร**

| แก้ได้ | ใช้ร่วม แก้ไม่ได้ |
|---|---|
| layout typography shape color visual signifier เฉพาะแบรนด์ (เช่นสามเหลี่ยมของ Polygon) module เฉพาะประเภทเนื้อหา | **component และ codebase ตัวเดียวกันทั้ง 8 แบรนด์** type scale color system spacing variables template |

**ตัวเลข business case ที่ใช้ได้ตอนขายโครงการภายใน Nation** `[กึ่งทางการ]` 8 แบรนด์ เว็บ SB Nation ที่ migrate **300+** **100% ของ on-platform traffic** อยู่บนเฟรมเวิร์กเดียว เปิดเว็บใหม่จาก **หลายเดือนเหลือหลายสัปดาห์** โหลด **เร็วขึ้น 50%** น้ำหนักหน้า **ลดลง 60 ถึง 70%**

> ทีมบอกเองว่าส่วนที่ยากที่สุดคือการรวม **หน้าโฮมเพจ** เพราะเป็นจุดที่แต่ละแบรนด์เคยต่างกันมากที่สุด

### 18.2 Schibsted CORDS โมเดล white label ที่มีทางไหลกลับ

> ⚠️ แยกให้ชัด **CORDS** = ฝั่งข่าว (Schibsted Media) **Warp** = ฝั่งมาร์เก็ตเพลส (ปัจจุบันแยกบริษัทเป็น Vend Marketplaces ASA)

`[แหล่งรอง]` ([wan-ifra.org](https://wan-ifra.org/2019/01/schibsted-builds-design-system-for-multiple-news-brands/)) ทีม design system เป็น **ทีมเล็กที่ Stockholm ระบุชื่อได้ 3 คน** (Nina Felixsson เป็นหัวหน้า)

| กลไก | เนื้อหา |
|---|---|
| **จุดตั้งต้นของทุกแบรนด์** | ทีมสร้าง **"The Standard"** = โปรดักต์ข่าว **white label** ที่สมบูรณ์ในตัว "complete with artwork, components, and workflow" ให้แบรนด์เอาไปต่อยอด |
| **สิทธิ์ของแบรนด์** | "brand designers have **great freedom** to build on each brand's DNA" แต่ต้องเข้ากันได้กับ Core News Product |
| **ทางไหลกลับ** | ของที่ทีมแบรนด์คิดเอง **ไหลกลับเข้า The Standard ผ่าน "a specific revision process"** เพื่อให้ "design created by one of the brand teams easily can be reused by others" |
| **แรงต้านที่เจอจริง** | "Many brand designers were **skeptical in the beginning**. They felt the idea was rather abstract." |

**บริบทองค์กร** `[แหล่งรอง]` ([digiday.com](https://digiday.com/media/schibsted-product-teams/)) Espen Sundve (VP product management) ให้เหตุผลการรวมศูนย์ว่า **"Each brand on its own can't be that agile if they are working on maintaining a full technology stack."** ผลที่รายงาน: viewability โฆษณาจาก 40% เป็น 80% A/B test จาก **6 ครั้งต่อปี เป็น 900 ครั้งต่อปี** องค์กรรอบข้างมี **250 developer**

> **นี่คือโมเดลที่ตรงกับ Nation ที่สุดเชิงโครงสร้าง** ไม่บังคับให้ทุกแบรนด์เหมือนกัน แต่ให้ **ฐาน white label** แล้วเปิด **ทางกลับ** ให้ของดีจากแบรนด์หนึ่งกลายเป็นของกลาง คือ recipe layer ของ Frost เวอร์ชันข่าว

### 18.3 Warp เกณฑ์ตัวเลขที่ลอกได้ทันที

`[ทางการ]` ([warp-ds.github.io/docs](https://warp-ds.github.io/docs/)) รองรับแบรนด์ FINN Blocket DBA Bilbasen Tori Oikotie

**หน้า request new component จัดลำดับด้วย 2 เกณฑ์** `[ทางการ]` ([request-new-component](https://warp-ds.github.io/docs/collaborate/request-new-component))
> **Scope:** "How many teams will benefit from this component? **(Never less than 2)**"
> **Complexity:** "How complicated or time-consuming is it to build this component?"

ก่อนขอต้องตรวจว่ามีของคล้ายกันที่ดัดแปลงได้ไหม ตอบให้ได้ว่าใช้หลายทีมไหม ระบุ variant และ use case ช่องทางคือ Slack `#warp-design-system`

**ทีม DS มี Product Manager เป็นของตัวเอง** `[กึ่งทางการ ประกาศงาน]` ([finn.no](https://www.finn.no/385618715)) ทีม Design System = **11 คน** multidisciplinary อยู่ใต้พื้นที่งาน Brand Experience ที่มี 13 ทีม ราว 100 คน

> องค์กรมอง DS เป็น **โปรดักต์ที่มี roadmap และลูกค้าภายในจริง** ตรงกับแนวคิด platform team ใน §1.E

**ของที่ลอกได้ทันทีอีกอย่าง:** เว็บ docs ของ Warp มี `/docs/llms.txt` และ `/docs/llms-full.txt` เวอร์ชัน markdown สำหรับให้เครื่องอ่าน `[ทางการ]`

### 18.4 Bloomberg Industry Group (Fish Tank)

`[กึ่งทางการ]` ให้บริการ 3 หน่วยธุรกิจ (Bloomberg Law Bloomberg Tax & Accounting Bloomberg Government) เริ่มปลายปี 2016 ทีมเล็ก เห็นชื่อ 4 ถึง 5 คน

**สัญญาของ component เขียนเป็นกฎในไฟล์ contributing** `[ทางการ]` ([CONTRIBUTING_COMPONENTS.md](https://raw.githubusercontent.com/bloombergindustry/fishtank-vue/master/.github/CONTRIBUTING_COMPONENTS.md))
> "Fish Tank Components Are **Presenter Style Components**" คือ internally stateless และ "completely property and event driven" props ไหลลง events ไหลขึ้น "Props should be considered **immutable** within the context of the component they are declared"

**ใครตัดสิน** ไม่ระบุตัวบุคคล มีแค่ "If you'll be going against any of these recommendations you should be able to **defend those decisions in a code review**"

**แยก foundation เป็น repo อิสระต่อชนิด token** `[ทางการ]` `fishtank-vue` (component) `fishtank-icons` `fishtank-grid` `fishtank-type` `fishtank-space` `fishtank-colors`

> ⚠️ **ข้อสังเกตที่เป็นคำเตือนสำหรับเรา:** repo ชั้นฐาน (color 2019 type และ space 2020 grid 2020) **หยุดอัปเดตไปแล้ว** ขณะที่ repo component ยังอัปเดตถึง ก.พ. 2026 เป็นทั้งหลักฐานของ pace layering ที่เกิดเองตามธรรมชาติ **และสัญญาณเตือนว่าถ้าแยกชั้นแล้วไม่มีเจ้าของประจำ ชั้นฐานจะกลายเป็นของกำพร้า**

**ตัวเลขที่ควรจำ** `[กึ่งทางการ]` ไอคอน 300+ ตัว component ตอนเปิดตัว **น้อยกว่า 8 ตัว** โตเป็น **มากกว่า 18 ตัวใน 1 ปี** นี่คืออัตราการโตที่สมจริงของทีมเล็ก

**ไม่พบ:** เกณฑ์รับ component ใหม่ versioning deprecation adoption **และไม่พบเอกสารเรื่อง theming หรือ brand override เลย**

### 18.5 New York Times

**ไม่พบว่า NYT มี design system สาธารณะที่มีชื่อเรียกเฉพาะ** ค้นด้วย 5 คำค้น (`New York Times design system internal name` `open.nytimes.com design system components` `github nytimes design system` และอื่น ๆ) ผลเกือบทั้งหมดเด้งไปที่ **New York State Design System** (`designsystem.ny.gov`) ซึ่งเป็นของรัฐนิวยอร์ก คนละองค์กร เป็นกับดักที่ต้องระวัง

สิ่งที่พบจริง
| หลักฐาน | ป้าย |
|---|---|
| NYT มีตำแหน่ง **Lead Product Designer, Design Systems** จริง ทีมอยู่ใต้ **Engagement mission** (ประกาศถูกถอดแล้ว) | `[กึ่งทางการ]` |
| ทีม **Games** มีงาน design system ของตัวเองแยก ประกาศหาคนที่ "co-own the platform-focused design systems roadmap" และ "contribute to and maintain Figma libraries" | `[ทางการ]` greenhouse ของ NYT |
| **NYT Cooking on Android** มี design system เฉพาะแอป | `[แหล่งรอง]` |
| **NYT Advertising Design System** + ฟอร์แมต Flex Frame มีจริงระดับหน่วยงานโฆษณา | `[กึ่งทางการ portfolio]` |

> **สิ่งที่เรียนรู้ได้แม้ข้อมูลน้อย:** องค์กรสื่อระดับโลกที่ไม่เปิด DS สู่สาธารณะ ไม่ได้แปลว่าไม่มี แต่แปลว่ามองเป็นเครื่องมือภายใน และโครงสร้างที่เห็นจากประกาศงานคือ **หลายระบบขนานกันตามหน่วยธุรกิจ** (News Games Cooking Advertising) ไม่ใช่ระบบเดียวคุมทั้งบริษัท **ซึ่งใกล้กับสภาพจริงของ 6 เว็บ Nation มาก**

---

## 19. สรุปข้ามองค์กร รอบ 4

### 19.1 เกณฑ์ตัวเลขที่ใช้ตัดสินว่าของนี้ควรเป็นของกลางไหม

| องค์กร | เกณฑ์ | ป้าย |
|---|---|---|
| **Warp (Vend/Schibsted)** | "How many teams will benefit? **(Never less than 2)**" | `[ทางการ]` |
| **Vox Media** | "Is it available for **more than 3 brands**?" + เพิ่มคุณค่าจริงไหม + จำเป็นกับแบรนด์เดียวหรือเปล่า | `[แหล่งรอง]` |
| **BBC** | "at least **two use-cases** before creating it" | `[กึ่งทางการ]` |
| **GitHub Primer** | "frequently used by **multiple feature teams**" + ภาระ maintenance คุ้มไหม | `[ทางการ]` |
| **IBM Carbon** | ต้องมี **stakeholder team 5 ถึง 8 ทีม** ตอนเข้า delivery | `[ทางการ]` |
| **Bloomberg Fish Tank** | ไม่มีเกณฑ์ตัวเลข มีแค่ "defend those decisions in a code review" | `[ทางการ]` |

**ข้อเสนอสำหรับ NTGDS (ต้องยืนยันก่อนลงมือ):** ตั้งเกณฑ์ **"ใช้จริงอย่างน้อย 2 ใน 6 เว็บ จึงเลื่อนเป็น core"** ซึ่งอยู่กึ่งกลางระหว่าง Warp (2 ทีม) กับ Vox (3 แบรนด์) และเหมาะกับขนาด 6 แบรนด์ของเรา

### 19.2 แบรนด์ย่อยแก้อะไรได้ เทียบ 4 เจ้า

| องค์กร | แก้ได้ | แก้ไม่ได้ | กลไกบังคับ |
|---|---|---|---|
| **Vox Media** | layout typography shape color visual signifier module เฉพาะเนื้อหา | component codebase type scale color system spacing variables template | เกณฑ์ 3 คำถาม + กฎ variation ต้องมีปัญหารองรับ |
| **Schibsted CORDS** | "great freedom to build on each brand's DNA" | ต้องเข้ากันได้กับ Core News Product | เริ่มจาก white label + revision process ตอนไหลกลับ |
| **FT Origami** | `variables` (ค่า) + `supports-variants` (เลือกเปิด variant) | โครงสร้าง component ห้าม depend `o-brand` ตรง | **JSON schema บังคับตอน build** |
| **Warp** | brand theme (token ต่อแบรนด์) | component เดียวกันทุกแบรนด์ | แพ็กเกจ flavor แยกต่อแบรนด์ |

> **รูปแบบร่วมที่เห็นทั้ง 4 เจ้า และถือเป็นข้อสรุปของงานวิจัยทั้งหมด:** ทุกเจ้าให้แบรนด์แก้ **ค่า (value)** แต่ไม่ให้แก้ **โครงสร้าง (structure)** **ไม่มีเจ้าไหนให้แบรนด์ fork component**

### 19.3 สิ่งที่กลุ่มสื่อไม่มีเหมือนกันหมด

จาก 8 องค์กรสื่อที่สำรวจ (Guardian BBC News UK FT Vox Schibsted Bloomberg NYT) **ไม่พบเจ้าไหนเลยที่เผยแพร่**
- adoption metric เป็นตัวเลข
- versioning หรือ breaking change policy ที่ชัดเป็นข้อ ๆ (FT ใกล้ที่สุดด้วย `supportStatus` แต่ก็ไม่ใช่ policy เต็ม · Guardian ใกล้ที่สุดในเชิงกฎ semver)
- ตัวเลขขนาดทีม DS อย่างเป็นทางการ (มีเฉพาะ Warp ที่ระบุ 11 คนจากประกาศงาน และ CORDS 3 คนจากข่าว)

> **ข้อสรุปตรงไปตรงมา:** กลุ่มสื่อมี governance ที่เป็นเอกสาร **น้อยกว่า** กลุ่มเทคโนโลยี (GitHub IBM Atlassian) เจ้าเดียวที่เทียบชั้นได้คือ **FT Origami** และวิธีที่ FT ใช้คือ **เข้ารหัสกฎลงในไฟล์ที่เครื่องตรวจได้ แทนการเขียนหน้าเอกสาร** ซึ่งเป็นบทเรียนที่ตรงกับสไตล์ NTGDS ที่บังคับกฎผ่าน CLAUDE.md บวกสคริปต์ build อยู่แล้ว

### 19.4 เพิ่มเข้าข้อเสนอ §16.2 อีก 3 ข้อ

| # | สิ่งที่ควรเพิ่ม | ต้นแบบ | รูปธรรมสำหรับ NTGDS |
|---|---|---|---|
| 7 | **บังคับฟิลด์เจ้าของและสถานะในทุก component** | FT Origami manifest | ทุก component ใน Figma ต้องมี description ที่ระบุ **เจ้าของ + สถานะ (experimental/active/deprecated) + แบรนด์ที่ใช้ได้** แบบบังคับ ไม่ใช่แล้วแต่ใครจะใส่ ฝั่งโค้ดทำเป็นฟิลด์ใน registry ที่สคริปต์ตรวจได้ |
| 8 | **ให้แบรนด์ opt-in ทีละ variant** | FT `supports-variants` | core มี variant ครบได้ แต่ละแบรนด์ประกาศว่าเปิดตัวไหน แก้ปัญหา variant บานโดยไม่ต้องห้ามสร้าง |
| 9 | **เกณฑ์ตัวเลขว่าใช้กี่ที่ถึงขึ้น core** | Warp 2 ทีม Vox 3 แบรนด์ BBC 2 use case | ตั้งที่ **2 ใน 6 เว็บ** |

---

# ภาคห้า กลุ่มโปรดักต์ชุดที่ 2 (รอบ 5)

> เพิ่ม 2026-08-19 Shopify Polaris Microsoft Fluent 2 Twilio Paste Pinterest Gestalt
> รอบนี้ได้ของที่หายากมาก 3 อย่าง: **เคสฆ่า design system ทั้งใบ** (Polaris) **เคส incubation ที่ล้มเหลวและเจ้าตัวเขียนบันทึกไว้เอง** (Fluent) **กระบวนการภายในทั้งโฟลเดอร์** (Paste เอา `internal-docs/` ขึ้น repo สาธารณะ)

---

## 20. Shopify Polaris และ Microsoft Fluent 2 สองปรัชญาที่ตรงข้ามกัน

### 20.1 Polaris เคส deprecation ระดับทิ้งทั้ง implementation

| เหตุการณ์ | วันที่ | หลักฐาน |
|---|---|---|
| ปล่อย Polaris Web Components แทน Polaris React | 1 ต.ค. 2025 | [shopify.com/partners/blog](https://www.shopify.com/partners/blog/polaris-unified-and-for-the-web) `[ทางการ]` |
| repo `Shopify/polaris` ถูก **archive เป็น read only** | **11 ส.ค. 2026** | [github.com/Shopify/polaris](https://github.com/Shopify/polaris) `[ทางการ]` |
| `polaris.shopify.com` **301 redirect ทั้งเว็บ** ไป shopify.dev | ตรวจ 19 ส.ค. 2026 | ตรวจตรง `[ทางการ]` |

> "The `shopify/polaris` repository is deprecated. **We are no longer accepting contributions or feature requests** in this repository."

**จุด governance ที่แรงที่สุด:** ของใหม่ **โหลดจาก CDN ของ Shopify** ("Components load directly from Shopify's CDN ensuring your app automatically inherits the most up-to-date Shopify design system") แปลว่า Shopify **ยึดอำนาจการอัปเกรดคืนจากทีมโปรดักต์ทั้งหมด** ไม่มี pin version ที่ฝั่งผู้ใช้อีก versioning เปลี่ยนจาก semver เป็น **date based** (`2025-10`) แบบเดียวกับ Shopify API ผลพลอยได้คือ **ไม่ต้องวัด adoption อีกเลย เพราะทุกแอปได้ของเวอร์ชันเดียวกันโดยอัตโนมัติ**

**สิ่งที่ลอกได้จาก Polaris**

- **`NEW_COMPONENT.yml` 8 ช่อง** ที่บังคับผู้เสนอทำงานแทนทีม DS ไปแล้วครึ่งหนึ่ง: ชื่อ · คำอธิบาย + use case · **Required components** (พึ่งตัวไหน) · ตัวอย่าง · **Props ครบทุกตัวพร้อม type/default** · best practices · **content guidelines พร้อมตาราง do/don't** · **Related components** `[ทางการ]`
  > ช่อง Required components กับ Related components คือ **กลไกกันของซ้ำตั้งแต่ประตูหน้า** บังคับให้ผู้เสนอไปสำรวจของเดิมก่อนกรอกฟอร์มจบ
- **เกณฑ์ข้อที่คุมการบวมได้จริง** `[ทางการ]` "Solutions should apply to **multiple admin surfaces, not single use cases**"
- **content design ถูกบังคับให้อยู่ในทุก contribution** ไม่ใช่ขั้นตอนแยก (issue template บังคับกรอกช่อง content guidelines)
- **ประกาศว่า markup ที่ render ออกมาไม่ใช่ public API** `[ทางการ]` breaking change ของ HTML ที่ component generate นับเป็น **patch** · เป็นการตีกรอบ ownership ผ่าน versioning policy ที่ต้นทุนศูนย์
- **deprecate ใน minor พร้อม upgrade path · ลบใน major** และมีเคส consolidation จริง คือยุบ typography 5 ตัว (`Caption` · `Display text` · `Heading` · `Subheading` · `Text style`) เหลือ component เดียว

**ตัวเลข** `[ทางการ]` 83 component ใน 10 หมวด (ก่อนปิด) deprecated ค้างไว้อย่างน้อย 7 ตัว CODEOWNERS มีแค่ 2 บรรทัด ครอบคลุมเฉพาะ icon กับ token (3 คน) **ไม่มี owner ระบุสำหรับ `polaris-react` เลย**

> **บทเรียนเชิงลบ:** ระบบที่ไม่มี CODEOWNERS ครอบคลุม component หลัก และไม่ประกาศ role ชัด สุดท้ายจบด้วยการถูกยกเลิกทั้งใบเมื่อบริษัทเปลี่ยนทิศทางเทคโนโลยี และ **การผูก DS เข้ากับ framework เดียว (React) คือหนี้ระยะยาว** ซึ่งเป็นเหตุผลเดียวกับที่ Frost เลือก Web Components เป็น core layer (§1.B4)

### 20.2 Fluent 2 เลือกทางตรงข้าม ไม่ฆ่า v8 แต่ให้อยู่ร่วมกัน

| ประเด็น | หลักฐาน |
|---|---|
| **ไม่มีวัน EOL ของ v8 ประกาศไว้** | README ระบุว่า v8 คือ "Mature" version ที่ Office และ Edge ใช้ ค้นแล้วไม่พบ EOL date `[ทางการ]` |
| **v8 ยังมีทีมเจ้าของเป็นทางการ** | `@microsoft/cxe-red` ถือ `packages/react/*` v9 เป็นของ `@microsoft/cxe-prg` **คนละทีมกัน** `[ทางการ]` |
| **มี shim ให้ผสมกันได้ระหว่างย้าย** | `@fluentui/react-migration-v8-v9` **ยังปล่อยเวอร์ชันใหม่อยู่** (ล่าสุดราว 11 วันก่อนวันตรวจ) `[ทางการ]` |
| **ทำ v9 ให้ครบเท่า v8 ก่อน** | maintainer: "We have over the last year **reached component parity** with the Fluent v8 library, so it's completely expected that you won't see new component releases." `[กึ่งทางการ]` |
| **ประกาศอายุขัย v9 เป็นตัวเลข** | "keep doing fixes and add incremental features as long as possible, **for a minimum of 2-5 years**" `[กึ่งทางการ]` |

> **สรุปกลยุทธ์:** แทนที่จะประกาศฆ่าตามวันที่ Microsoft สร้างของใหม่ให้ครบเท่าของเก่าก่อน ทำ shim ให้ผสมกันได้ แล้วปล่อยให้ของเก่าตายเองด้วยการไม่มีของใหม่ ต้นทุนคือเลี้ยง **2 ไลบรารีพร้อมกันหลายปีด้วย 2 ทีมแยก** ซึ่งทำได้เพราะเป็น Microsoft

**⚠️ บทเรียนความล้มเหลวที่มีค่าที่สุดในงานวิจัยทั้งฉบับ** `[ทางการ]` (`release-cycle.md`)
> "**react-components/unstable is frozen and deprecated** - this api cannot be changed in any way."

Fluent เคยทำพื้นที่ incubation แบบ **entry point ย่อยใน package เดียวกับของ stable** แล้วล้มเหลวจนต้องแช่แข็งทั้งช่อง เพราะพอของทดลองอยู่ปนกับของ stable แล้ว **แยกสัญญาความนิ่งไม่ออก** ใครก็ import ไปใช้ production ได้ง่ายเกินไป ทางแก้คือย้ายไปเป็น **npm package แยกใบชื่อลงท้าย `-preview` เวอร์ชัน `0.x`**

> **แปลงเป็น NTGDS:** ถ้าจะทำชั้นครัว **ห้ามทำเป็นหน้าย่อยในไฟล์ Figma library หลัก** ต้องแยกให้หยิบไปใช้ผิดได้ยาก

**ของอื่นที่ Fluent ทำแล้วลอกได้**

- **`docs/team-routing.md`** ตาราง area → ทีมเจ้าของ → path พร้อมระบุว่า CODEOWNERS คือ authoritative reference · CODEOWNERS ละเอียดถึงระดับ **ราย component** และ **เอกสาร `/docs/` มีเจ้าของ 3 ทีมร่วมกัน** (ถือว่า doc เป็นสมบัติร่วม)
- **4 คำถามก่อนสร้าง component ใหม่** `[ทางการ]` (1) มีอยู่แล้วไหม โดยเช็คข้าม **ทุก design system ของ Microsoft** (2) **มันเป็นแค่ variant ของตัวเดิมหรือเปล่า** โดยยก **ตระกูล Button** เป็นแม่แบบ (3) มีคุณค่าร่วมจริงไหม หรือเป็น product-specific ที่ "belongs in local repos" (4) ติด IP ไหม
  > ข้อ 2 คือ **คำตอบตรงที่สุดของ variant explosion** ที่พบในงานวิจัยนี้ และเขียนได้ใน 4 บรรทัด
- **บังคับเขียน `SPEC.md` และรีวิว spec ผ่าน PR ก่อนลงมือเขียนโค้ด** · หลัง stable แล้ว "**can no longer have any breaking changes before the next major release**"
- **incubation 3 ชั้น** local repo ของทีม → **`fluentui-contrib`** (repo คนละใบ 16+ package) → **`-preview` package** (`0.x`) ในรีโปหลัก
- **quality grade A ถึง D** `[ทางการ]` วัดจากสิ่งที่มีในไฟล์ล้วน ๆ (README · stories · unit test · `.api.md` ที่ตรงกับ export · conformance test) ไม่ต้องใช้ analytics เลย
- **a11y แบบ SME escalation** "Skip any tests… you do not feel comfortable evaluating, and either pair with or hand off the issue to an **accessibility SME**" คือให้คนทำตรวจเองด้วย checklist แล้วส่งต่อเฉพาะข้อที่ไม่มั่นใจ **เหมาะกับทีมเล็กมาก**
- **RFC process ที่ไม่มีคณะกรรมการ** ผู้เขียนตัดสินเองว่า feedback พอ พร้อมกฎกันเอกสารเน่า "**Don't let RFC's sit forever**" และ "Do consider if an RFC is the right document type. **Not every decision needs to be made with an RFC.**"

**ตัวเลข** `[ทางการ]` 60 component (Fluent 2 React) **6 ทีมเจ้าของ** ในรีโปเดียว doc contributing ของ v9 มี 24 ไฟล์ เป้า triage **0 untriaged issue ภายในสิ้นสัปดาห์** **ไม่พบ** ขนาดทีมเป็นหัวคนและ adoption

---

## 21. Twilio Paste และ Pinterest Gestalt

### 21.1 Paste กระบวนการภายในที่เปิดหมด

Paste เอาโฟลเดอร์ `internal-docs/` (design engineering **process** **team**) ขึ้น repo สาธารณะทั้งดุ้น `[ทางการ]`

**CODEOWNERS ที่ควรลอกที่สุด เพราะเขียนคอมเมนต์บอกเหตุผลกำกับทุกบรรทัด** `[ทางการ]`
```
* @twilio-labs/design-systems-eng

# Design tokens - ensure someone from design reviews to keep in sync with Figma, plus an engineer
/packages/paste-design-tokens/tokens  @twilio-labs/design-systems-pd @twilio-labs/design-systems-eng

# Icons - ensure changes to icons are reviewed by a designer, plus an engineer
/packages/paste-icons/svg  @twilio-labs/design-systems-pd @twilio-labs/design-systems-eng

# Website - ensure changes to website page copy is reviewed by a designer, plus an engineer
/packages/paste-website/src/pages  @twilio-labs/design-systems-pd @twilio-labs/design-systems-eng
```

อ่านได้ 3 ข้อ: มี 2 ทีมทางการ (engineering กับ product design) ค่าตั้งต้นคือ engineering เป็นเจ้าของทุกอย่าง และมี **3 พื้นที่ที่บังคับให้ designer ต้องรีวิวด้วย คือ design token icon SVG ข้อความบนเว็บ doc** เพราะเป็นจุดที่โค้ดกับ Figma จะหลุดจากกัน ("keep in sync with Figma")

> **ตรงกับปัญหาของเราเป๊ะ:** กฎ CLAUDE.md ที่ห้ามใช้ hex ดิบและบังคับ bind variable คือปัญหาเดียวกับที่ Paste แก้ แต่ Paste แก้ด้วยการ **บังคับให้มีสายตา 2 คู่บนไฟล์ token** ไม่ใช่แค่เขียนกฎไว้เฉย ๆ

**Design Systems Committee เป็น federated body ตัวจริง** `[ทางการ]` สมาชิกคือ "**Product Designers and Front-end Engineers from a cross-section of Twilio product subgroups**" **ไม่ใช่คนในทีม DS** ประชุม 2 นัดฝั่ง eng + 3 นัดฝั่ง design ต้องส่งของให้ดูล่วงหน้าอย่างน้อย 2 วันทำการ สมาชิกมีหน้าที่เอาความต้องการของทีมตัวเองมาบอก

**ลงมติด้วย fist of five** (ยกมือ 1 ถึง 5 ท้ายทุกนัด)

| คะแนน | ความหมาย |
|---|---|
| 5 | สนับสนุนเต็มที่ และจะเป็นกระบอกเสียงให้ |
| 4 | สนับสนุนให้เดินหน้าตามแผน |
| **3** | **ติดใจเล็กน้อย แก้ทีหลังได้** |
| **2** | **ติดใจเล็กน้อย ต้องแก้เดี๋ยวนี้** |
| 1 | ติดใจหนัก ต้องแก้เดี๋ยวนี้ |

> เป็นกลไกที่เป็นรูปธรรมที่สุดในงานวิจัยทั้งหมด เพราะแปลง approve/reject ที่เป็นขาวดำ ให้เป็นสเกลที่ **แยก "ติดใจแต่ปล่อยได้" ออกจาก "ติดใจต้องหยุด"** ซึ่งเป็นเส้นแบ่งที่ต้องตัดสินทุกวัน

**Definition of Done แยก 3 ชุด** `[ทางการ]` ชุดทีม ชุด component ชุดเว็บ doc ข้อที่เราไม่มีและควรมีคือ
> "**The developed UI should match the Figma Files**" "**Designer to review all UI items before it is published**" "Code is reviewed by **at least two members**, one of which must be from the engineering leads" "**Proof read by at least two members of the team**"

**Component status 4 ระดับ บังคับประกาศใน `package.json`** `[ทางการ]`
> "You must define the `status` of the component to be one of: `backlog`, `alpha`, `beta`, `stable`"

พร้อม `category` 1 ค่าจาก 9 ค่า (graphic layout typography interaction overlays user input data display feedback navigation)

> **ฉลาดตรงที่ status เป็น metadata ในไฟล์ ไม่ใช่ป้ายในเอกสาร** เว็บ doc ดึงไปแสดงเองได้ และ DoD อ้างถึงได้ ("ยกเว้น alpha") **ต่อยอดข้อเสนอ tier ใน §7.2 ให้ enforce ได้จริง**

**ตัวเลข** sprint 2 สัปดาห์ ซ้อนในรอบวางแผน 6 สัปดาห์ **เวลาประชุม 14.5 ถึง 16.5 ชม. ต่อ sprint** รีวิวเวอร์ขั้นต่ำ 2 คนต่อ PR โดยต้องมี engineering lead อย่างน้อย 1 **ไม่พบ** จำนวนหัวคนและ adoption

### 21.2 Gestalt ทีม 5 คน ทำ 92 component

**ตัวเลขทีมที่ชัดที่สุดในงานวิจัยทั้งหมด** `[ทางการ]` (README)
> "Gestalt's web component library is almost exclusively developed by a **5 engineer team** within Pinterest, and our primary customers are Pinterest engineers who use Gestalt."

และประกาศขอบเขตตรงมาก
> "**We do not have resources to work on features or issues requested only by external developers.**"
> "Pinterest is staying open source… but **we don't provide support to external developers**."

> **นี่คือ solitary model ตามนิยาม Curtis (§1.C1) แบบตำราเป๊ะ ๆ** ต่างกันแค่ Pinterest **เขียนออกมาตรง ๆ** แทนที่จะปล่อยให้คนเข้าใจผิด **การประกาศขอบเขตที่ไม่รับให้ชัด คือกลไกคุมการขยายตัวที่ถูกที่สุดที่มี**

**กลไกอื่น**
- **intake ผ่าน office hours 2 ครั้งต่อสัปดาห์ ครั้งละ 30 นาที** จองผ่านปฏิทิน ระบุเองว่าเป็น "a great time to chat about contributions or component requests" · **ไม่มีฟอร์ม ไม่มี SLA**
- **เปิด sprint dashboard · backlog · bug dashboard ให้คนในบริษัทดูได้** เป็นกลไกลดแรงกดดันที่ต้นทุนต่ำมาก เพราะคนขอไม่ต้องมาไล่ถามว่างานถึงไหน
- **release อัตโนมัติทุก commit ที่เข้า master** และตัดสินระดับเวอร์ชันด้วย label บน PR
- ⚠️ **กฎที่แหลมที่สุด: breaking change ที่ "มี codemod ให้" ไม่นับเป็น major** แปลว่าทีม DS **แบกภาระ migration แทนทีมโปรดักต์** เพื่อแลกสิทธิ์ที่จะเปลี่ยนของได้บ่อย

**ตัวเลข** `[ทางการ]` **5 engineer** **92 web component** release ทุก commit WCAG 2.1 AA
**ไม่พบ:** เกณฑ์รับ component ใหม่ (`CONTRIBUTING.md` คืน 404) นโยบาย variant deprecation incubation (หน้ารวม component ไม่มีป้าย alpha/beta/deprecated เลยสักตัว)

---

## 22. สรุปรวมงานวิจัยทั้งหมด

> ครอบคลุม **19 องค์กร** ข้ามภาคแรกถึงภาคห้า Primer Carbon Atlassian Guardian BBC News UK FT Vox Schibsted Warp Bloomberg NYT Spotify Salesforce Adobe Polaris Fluent Paste Gestalt

### 22.1 ข้อสรุปที่หลักฐานหนักแน่นที่สุด 6 ข้อ

1. **ไม่มีเจ้าไหนทิ้ง Atomic เพื่อเอา Ownership มาแทน** และ **FT Origami พิสูจน์ให้เห็นเป็นไฟล์จริง** ว่าเก็บได้พร้อมกันเป็นคนละฟิลด์ (`origamiCategory` = ประกอบจากอะไร · `supportStatus` = โตแค่ไหน · `brands` = ใครใช้ได้ · `support` = ใครดูแล)
2. **ทุกเจ้าที่ ownership ทำงานจริง เขียนมันลงไฟล์ที่เครื่องตรวจได้ ไม่ใช่หน้าเอกสาร** (CODEOWNERS · manifest schema · `status` ใน `package.json` · snapshot test บน public API) · เจ้าที่ประกาศแค่บนเว็บคือเจ้าที่ข้อมูลหายไปพร้อมเว็บ
3. **ความต่างของแบรนด์ต้องลงไปอยู่ที่ token/theme เสมอ** ทุกเจ้าให้แบรนด์แก้ **ค่า** ไม่ให้แก้ **โครงสร้าง** และ **ไม่มีเจ้าไหนให้แบรนด์ fork component**
4. **ทุกเจ้าต้องมีที่ให้ของที่ยังไม่พร้อม** ต่างกันแค่ดึงเข้ามาไว้ใกล้ (Guardian Kitchen · Carbon Labs · fluentui-contrib) หรือผลักออกไปให้ทีมดูแลเอง (News UK · Primer) · และ **Fluent พิสูจน์ว่าถ้าเอาไปปนกับของ stable จะพัง**
5. **เกณฑ์รับของใหม่ที่ใช้จริงเป็นตัวเลขเล็ก ๆ** 2 ทีม (Warp) · 2 use case (BBC) · 3 แบรนด์ (Vox) · หลายทีม (Primer) · 5 ถึง 8 ทีม (Carbon ตอน delivery)
6. **adoption แทบไม่มีใครวัดเป็นตัวเลขสาธารณะ** มีแค่ Carbon (telemetry + Figma API) และ Shopify ที่แก้ปัญหาด้วยการ **บังคับให้ทุกคนใช้เวอร์ชันเดียวกันผ่าน CDN จนไม่ต้องวัด**

### 22.2 ข้อเสนอรวมสำหรับ NTGDS เรียงตามลำดับที่ควรทำ

> รวมข้อเสนอจาก §16.2 §19.4 และรอบนี้เข้าด้วยกัน ทุกข้อยังไม่ลงมือ ต้องยืนยันก่อนตามกฎ ask first

**ระดับ S งานเอกสารล้วน ไม่แตะ token หรือ Figma**

| # | สิ่งที่ทำ | ต้นแบบ |
|---|---|---|
| 1 | เติมกฎ **brand เป็น dimension นอกชื่อ token** ลง taxonomy | Vodafone Spectrum |
| 2 | **กฎตัดสิน variant กับ component แยก** ถามคำถามเดียวว่าเปลี่ยนหน้าตาหรือเปลี่ยนหน้าที่ + **4 คำถามก่อนสร้างของใหม่** | Primer Fluent |
| 3 | **เกณฑ์ตัวเลขขึ้น core: ใช้จริงอย่างน้อย 2 ใน 6 เว็บ** | Warp 2 ทีม BBC 2 use case Vox 3 แบรนด์ |
| 4 | **กฎรอ 2 use case ก่อนสร้าง** | BBC |
| 5 | **ประโยคเกณฑ์ intake** ของที่ตอบโจทย์คนส่วนน้อยให้ไปอยู่ที่ทีมเอง ภาระพิสูจน์อยู่ที่ผู้ขอ | News UK |
| 6 | **ประกาศขอบเขตที่เราไม่รับ** ให้ชัดเป็นลายลักษณ์อักษร | Gestalt |
| 7 | **นับ visual change เป็น breaking change** | Guardian |

**ระดับ M ต้องแตะโครงไฟล์หรือกระบวนการ**

| # | สิ่งที่ทำ | ต้นแบบ |
|---|---|---|
| 8 | **`docs/ownership-routing.md`** ตาราง พื้นที่ → บทบาทที่ดูแล → หน้า Figma และไฟล์ token ที่เกี่ยว | Fluent `team-routing.md` |
| 9 | **บังคับฟิลด์ในทุก component**: เจ้าของ + **status (`backlog`/`alpha`/`beta`/`stable`)** + แบรนด์ที่ใช้ได้ ฝั่ง Figma อยู่ใน description ฝั่งโค้ดอยู่ใน registry ที่สคริปต์ตรวจได้ | FT manifest Paste `package.json` |
| 10 | **quality grade A ถึง D** วัดจากไฟล์ที่มีจริง (มี doc ครบ 4 ชนิดไหม มี preview ไหม ผ่าน raw scan ไหม token ครบไหม) | Fluent `quality-grades.md` |
| 11 | **ผูก DoD เข้ากับ status** raw = 0 token ครบ doc ครบ ถึงจะเลื่อนเป็น stable | Carbon Paste |
| 12 | **บังคับสายตา 2 คู่บน token กับ icon** (สายออกแบบ + สายโค้ด) พร้อมคอมเมนต์บอกเหตุผล | Paste CODEOWNERS |
| 13 | **แยกพื้นที่ครัวออกจาก library จริง** ทั้งไฟล์ Figma และการ publish **ห้ามเป็นหน้าย่อยในไลบรารีหลัก** | Guardian Kitchen Carbon Labs บทเรียน `unstable` ของ Fluent |
| 14 | **ให้แบรนด์ opt-in ทีละ variant** core มี variant ครบได้ แต่ละแบรนด์ประกาศว่าเปิดตัวไหน | FT `supports-variants` |

**ระดับ L รอ core นิ่งก่อน**

| # | สิ่งที่ทำ | ต้นแบบ |
|---|---|---|
| 15 | **brand layer ใน token pipeline** + **สคริปต์ตรวจ override ที่ซ้ำกับค่าฐาน** | brand-codes.md เดิม + News UK `deepDuplicationChecker` |
| 16 | **codemod เวลาเปลี่ยนของ** ทีม DS เขียนสคริปต์แปลงให้ แทนที่จะให้ 6 เว็บย้ายเอง | Gestalt Carbon `@carbon/upgrade` Primer `react-migrate` |
| 17 | **วัด adoption จาก Figma analytics ก่อน** แล้วค่อยคิดเรื่อง telemetry ฝั่งโค้ด | Carbon |

### 22.3 บทเรียนเชิงลบ 3 ข้อ ที่ควรจำไว้ตอนวางแผน

1. **เว็บเอกสารที่ทีม DS สร้างเอง อายุสั้นกว่าตัวระบบ** เห็น 3 เคสในรอบเดียว (Polaris redirect ทั้งเว็บ · Paste ปลดระวางเว็บ 31 ก.ค. 2026 · Gestalt ติดป้าย legacy) · **ของที่รอดคือ repo และไฟล์** ไม่ใช่หน้าเว็บสวย ๆ
2. **แยกชั้นแล้วไม่มีเจ้าของประจำ ชั้นฐานจะกลายเป็นของกำพร้า** Fish Tank แยก foundation เป็น repo ต่อชนิด token แล้ว repo สี หยุดอัปเดตตั้งแต่ 2019 typography และ spacing หยุดปี 2020 ขณะที่ repo component ยังเดินถึง 2026
3. **แม้แต่ Microsoft ก็มีเอกสารกลางที่ตามของจริงไม่ทัน** โฟลเดอร์ `specs/` เตือนตัวเองว่า "shouldn't be taken as the source of truth until further announcement" · และ Primer มีคำศัพท์ lifecycle 2 ชุดที่ขัดกันเองบนเว็บตัวเอง

### 22.4 สิ่งที่ค้นครบทุกเจ้าแล้วยังไม่พบ

| ประเด็น | สถานะข้ามทั้ง 19 องค์กร |
|---|---|
| **ตัวเลขจำกัดจำนวน prop หรือ variant** | **ไม่มีเจ้าไหนตั้งเป็นตัวเลข** ทุกเจ้าใช้กฎเชิงคุณภาพ |
| **adoption percentage** | พบเฉพาะกลไกการวัด (Carbon) ไม่พบตัวเลขที่ประกาศ |
| **ขนาดทีมเป็นหัวคน** | พบชัดเจนแค่ Primer (19) Gestalt (5) Warp (11) CORDS (3) Atlassian (35+ designer) |
| **บทบาท content design ในเส้นทางอนุมัติ** | มีจริงแค่ Polaris (บังคับกรอกในฟอร์ม) Atlassian Spotify Adobe (content strategist คุมชื่อ semantic) ที่เหลือไม่มี |
| **นโยบาย deprecation ที่มีกรอบเวลา** | มีแค่ Primer (6 เดือน) Adobe (2 releases หรือ 6 เดือน) Carbon (ตาราง EOL) Guardian (วงจร major) ที่เหลือไม่มีเป็นลายลักษณ์อักษร |
