---
title: "เครื่องมือทำเว็บพรีวิว/เอกสาร Component Library"
description: "Research ว่าดีไซน์ซิสเต็มเจ้าใหญ่ใช้เครื่องมืออะไรทำเว็บพรีวิว component ที่ทีมอื่นเข้ามาดู/ใช้ได้ เปรียบเทียบ Storybook, Zeroheight, Ladle, custom-built และกรณี static-doc ไม่ render component จริง เพื่อเตรียมตัดสินใจทำเว็บพรีวิวให้ NTGDS"
research_date: "2026-10-19"
scope: "GitHub Primer, IBM Carbon, Shopify Polaris, Atlassian Design System, Adobe Spectrum, Spotify Encore, Chakra UI, Radix UI, react-styleguidist/Ladle (เครื่องมือ) + zeroheight (แพลตฟอร์มเอกสาร) + Design Systems Report 2026"
status: "draft รอ user รีวิว"
owner: "ux-researcher"
---

# เครื่องมือทำเว็บพรีวิว/เอกสาร Component Library

> เอกสารวิจัย ไม่ใช่ข้อสั่งการ ทุกข้ออ้างมี URL กำกับ ข้อไหนหาหลักฐานสาธารณะไม่เจอ เขียนระบุไว้ตรง ๆ หัวหน้าทีมเป็นคนตัดสินใจเลือกเครื่องมือเองหลังอ่านเอกสารนี้

---

## สรุปผู้บริหาร (อ่านจบใน 1 นาที)

**1. เจ้าใหญ่ส่วนใหญ่ใช้ Storybook เป็นฐาน** (Primer, IBM Carbon, Spotify Encore) แล้วบางเจ้าต่อด้วยเว็บเอกสารของตัวเอง (Primer.style, Carbon ทำ Carbon for IBM Products แยก) Storybook ครองตลาด 61% ของทีมที่ทำ design system documentation ([zeroheight Design Systems Report 2026](https://report.zeroheight.com/))

**2. เจ้าที่เน้นให้ non-engineer (PM/ดีไซเนอร์ทีมอื่น) เข้าถึงได้ มักเสริมด้วย Zeroheight** เป็นแพลตฟอร์มเอกสารแยกที่ดึงจาก Figma + เชื่อม Storybook ([help.zeroheight.com](https://help.zeroheight.com/hc/en-us/articles/36473744204955-Should-you-document-your-design-system-in-Storybook)) แต่ Zeroheight มีค่าใช้จ่ายรายเดือน (เริ่ม $149/เดือน) และใช้แพร่หลายน้อยกว่า Storybook (32%) ([uxblueprints.com](https://www.uxblueprints.com/compare/storybook-vs-zeroheight))

**3. สำหรับโปรเจกต์ที่ไม่มี bundler/dependency รันไทม์เลยแบบ NTGDS ตอนนี้ ตัวเลือกที่เพิ่ม footprint น้อยที่สุดคือ Ladle** (ใช้ Vite/esbuild ภายใน ไม่ใช่ Webpack, build ได้ผลลัพธ์เล็กกว่า Storybook ราว 3.5 เท่า คือ 4.6MB vs 16.1MB) แต่ Ladle รองรับ React เท่านั้นและไม่มี autodocs ครบเท่า Storybook ([LogRocket](https://blog.logrocket.com/ladle-storybook-performance-project-sizes/), [devtoolhq.com](https://devtoolhq.com/compare/storybook-vs-ladle))

**4. Storybook auto-generate prop table จาก TypeScript ได้จริงผ่าน `react-docgen-typescript` + `tags: ['autodocs']`** และดึง JSDoc comment มาโชว์เป็นคำอธิบาย prop ได้ ([storybook.js.org](https://storybook.js.org/docs/configure/integration/typescript), [GitHub Discussion #31978](https://github.com/storybookjs/storybook/discussions/31978)) ตรงกับที่ component ของ NTGDS มี JSDoc ภาษาไทยอยู่แล้วทุก prop

**5. ทีมเล็กจำนวนมากเลือก "ไม่ทำเว็บพรีวิวแยก" เลย** เก็บเอกสารไว้ใน Figma หรือไฟล์ Markdown เดียวในโค้ด เพราะเวลาที่ใช้สร้าง/ดูแลเว็บเกินเวลาที่มันประหยัดได้สำหรับทีม 5 คน ([monotonomo.com](https://www.monotonomo.com/journal/design-system-governance-small-teams/))

**6. ข้อควรระวังสำคัญที่สุดสำหรับ NTGDS: หน้า static ที่เขียนมือ (แบบ `prototype/` ที่มีอยู่แล้ว) ไม่ render component จริง = เสี่ยง drift สูง** เพราะ dependency ระหว่างโค้ดกับเอกสารเป็น implicit ไม่มีอะไรเตือนเมื่อโค้ดเปลี่ยนแต่เอกสารไม่เปลี่ยน ([dev.to](https://dev.to/bala_paranj_059d338e44e7e/your-docs-are-outdated-you-just-dont-know-which-ones-14ja))

**7. ข้อเสนอเบื้องต้น (ให้หัวหน้าตัดสินใจ) เรียงอันดับ:** (1) Storybook + react-docgen-typescript ถ้ารับ dependency เพิ่มได้ (2) Ladle ถ้าอยากได้เบาที่สุดและพอใจ React-only (3) คงแนวทาง static HTML เดิมต่อ ถ้ายังไม่อยากรับ bundler ตอนนี้ แต่ต้องวางกลไกกันไม่ให้ drift รายละเอียดใน §5

---

## 1. เจ้าใหญ่ใช้เครื่องมืออะไรทำเว็บพรีวิว (แยกตามกลุ่ม)

### 1.1 กลุ่ม Storybook (component dev tool ที่กลายเป็นเว็บพรีวิวสาธารณะ)

| องค์กร | ใช้ยังไง | หลักฐาน |
|---|---|---|
| **GitHub Primer** | เอกสารหลักอยู่ที่ `primer.style` (custom site) แต่ `primer/react` มี Storybook ของตัวเองสำหรับ dev ส่วน Primer Brand (เว็บมาร์เก็ตติ้ง) มี Storybook เฉพาะสำหรับพนักงาน GitHub | [storybook.js.org/showcase/github-primer-react](https://storybook.js.org/showcase/github-primer-react/), [primer.style/brand](https://primer.style/brand/) |
| **IBM Carbon** | เว็บเอกสารหลัก `carbondesignsystem.com` ผนวก Storybook เข้าไปในหน้า React framework โดยตรง (`v7-react.carbondesignsystem.com` คือ Storybook จริง) | [carbondesignsystem.com/developing/frameworks/react](https://carbondesignsystem.com/developing/frameworks/react/), [v7-react.carbondesignsystem.com](https://v7-react.carbondesignsystem.com/) |
| **Spotify Encore** | ใช้ Storybook สำหรับเอกสารของ Encore Web หลายเวอร์ชันหลัก ควบคู่กับ TypeScript + JSDoc ที่โชว์ผ่าน VS Code IntelliSense (ไม่ต้องเปิดเว็บ) | [intodesignsystems.com](https://www.intodesignsystems.com/blog/how-spotify-design-system-ai-ready) |

### 1.2 กลุ่ม custom-built เว็บเอกสารแยกเอง (ไม่ใช่ Storybook โดยตรง แต่มักดึง Storybook/โค้ดจริงมาฝัง)

| องค์กร | เครื่องมือ | หลักฐาน |
|---|---|---|
| **Atlassian Design System** | รวมสองเว็บเอกสารเดิมเป็นที่เดียวที่ `atlassian.design` เขียนเอกสารใหม่ + ตัวอย่างโต้ตอบได้สำหรับ 27/60 component (ไม่ระบุ framework ของเว็บเองในบทความ แต่ตัวอย่าง component เป็น live code) | [medium.com/designing-atlassian](https://medium.com/designing-atlassian/our-new-home-for-atlassian-design-system-7ec766cf36cd) |
| **Adobe Spectrum** | มี Spectrum Hub เป็นศูนย์กลาง และมีเครื่องมือย่อยหลายตัว เช่น S2 Tokens Viewer, S2 Visualizer, Release Timeline เป็นเว็บเฉพาะทางที่ generate จาก design token repo (`spectrum-design-data`) ไม่ใช่ Storybook | [opensource.adobe.com/spectrum-design-data/tools](https://opensource.adobe.com/spectrum-design-data/tools/) |
| **Shopify Polaris** | เดิมมี React component library + เอกสารของตัวเอง แต่ **Shopify ยุติ Polaris React แล้ว** เปลี่ยนไปใช้ Polaris Web Components ที่โหลดผ่าน script tag จาก CDN ไม่ผ่าน npm bundler เลย เป็นทิศทางที่ตรงข้ามกับการ bundle หนัก | [identityforge.io](https://identityforge.io/learn/shopify-polaris-design-system), [shopify.com/partners/blog/polaris-goes-stable](https://www.shopify.com/partners/blog/polaris-goes-stable-the-future-of-shopify-app-development-is-here) |

### 1.3 กลุ่มแพลตฟอร์มเอกสารสำเร็จรูป (ไม่ใช่เครื่องมือ dev แต่เป็น SaaS เอกสาร)

**Zeroheight** คือตัวแทนหลักของกลุ่มนี้ เชื่อมกับ Figma โดยตรง ให้ non-engineer แก้เอกสารได้โดยไม่แตะโค้ด คำแนะนำจาก Zeroheight เองคือใช้ **ทั้งสองอย่างคู่กัน**: Storybook สำหรับ dev ทดสอบ component, Zeroheight สำหรับหน้าเว็บสาธารณะที่ pull ข้อมูลจาก Storybook มาอีกที ([help.zeroheight.com](https://help.zeroheight.com/hc/en-us/articles/36473744204955-Should-you-document-your-design-system-in-Storybook)) ข้อมูลใช้งาน: Storybook 61% เทียบ Zeroheight 32% ของทีมที่สำรวจ แต่ความพึงพอใจของคนที่ใช้ Zeroheight สูงสุด 79% ([zeroheight Design Systems Report 2026](https://report.zeroheight.com/))

### 1.4 กลุ่มเครื่องมือทางเลือก (ขนาดเล็กกว่า Storybook)

- **Ladle**: ของ Uber ทำขึ้นมาแทน Storybook เฉพาะ React ใช้ Vite/esbuild ภายใน ([ladle.dev](https://ladle.dev/docs/)) เร็วกว่า Storybook มากในการ build (เร็วกว่า 21-71 เท่าในการทดสอบของ LogRocket ขึ้นกับขนาดโปรเจกต์) และ output เล็กกว่า (4.6MB vs 16.1MB) รองรับ Component Story Format เดียวกับ Storybook จึง migrate ไป-มาได้ง่าย ([blog.logrocket.com](https://blog.logrocket.com/ladle-storybook-performance-project-sizes/))
- **react-styleguidist**: แนวคิดคล้าย Ladle (auto-gen style guide จาก component + prop doc) แต่ **ไม่ active แล้ว** เทียบ downloads รายสัปดาห์ 52,750 vs Storybook 12.9 ล้าน และอัปเดตล่าสุดห่างกันมาก (ปีที่แล้ว vs วันที่แล้ว) ([npmtrends.com](https://npmtrends.com/react-styleguidist-vs-storybook))
- **Chakra UI / Radix UI**: ทั้งสองไม่ได้ "ทำเว็บพรีวิว" เป็นผลิตภัณฑ์ของตัวเอง เอกสารของทั้งคู่เป็นเว็บ custom (ไม่พบหลักฐานสาธารณะชัดเจนว่า build ด้วย Astro/Vite ของจริงหรือ framework อะไรเจาะจง หาหลักฐานยืนยันเทคสแตกของเว็บเอกสาร chakra-ui.com/radix-ui.com ไม่เจอในรอบการค้นนี้ ขอระบุว่า **หาหลักฐานไม่เจอ** แทนการเดา) ([chakra-ui.com/docs/get-started/frameworks/vite](https://chakra-ui.com/docs/get-started/frameworks/vite) ยืนยันแค่ว่า Chakra UI ตัว component ใช้กับ Vite/Astro ได้ ไม่ได้บอกว่าเว็บเอกสารเขาเองสร้างด้วยอะไร)

---

## 2. เปรียบเทียบเครื่องมือ (มุมที่ล็อกกับสภาพโปรเจกต์ NTGDS ตอนนี้)

| มุม | Storybook | Zeroheight | Ladle | Static HTML (แบบ `prototype/` เดิม) |
|---|---|---|---|---|
| **Dependency/bundler ที่ต้องเพิ่ม** | หนักสุด ต้องติดตั้ง `storybook` + addon ecosystem, ปัจจุบัน core ใช้ Vite เป็นหลักแล้ว (เวอร์ชันใหม่เลิก Webpack สำหรับหลาย framework) แต่ยังมีขนาด config/dependency มากกว่า Ladle | ไม่มีโค้ด dependency เพิ่มในรีโป (เป็น SaaS นอกโปรเจกต์) แต่ "เพิ่ม" ค่าใช้จ่ายและ sync overhead กับ Figma/Storybook แทน ([storybook.js.org/docs/releases/migration-guide](https://storybook.js.org/docs/releases/migration-guide-from-older-version)) | เบากว่า Storybook ชัดเจน ใช้ Vite/esbuild เดียว ไม่มี addon ecosystem ให้ติดตั้งเยอะ ([ladle.dev](https://ladle.dev/docs/)) | ศูนย์ ไม่มี dependency เพิ่มเลย (สภาพปัจจุบันของ repo) |
| **รองรับ CSS Modules** | รองรับเต็มรูปแบบเป็นมาตรฐาน (ใช้กับ React ทั่วไปได้ตรง ๆ ไม่ต้องตั้งค่าพิเศษมาก) หาหลักฐานเฉพาะ CSS Modules ของ Storybook ไม่เจอชัดในรอบค้นนี้ แต่เป็นฟีเจอร์พื้นฐานที่ Storybook รองรับมานาน (อนุมานจากการที่ Storybook build ผ่าน Vite/Webpack ที่ตัวมันเองรองรับ CSS Modules อยู่แล้ว ไม่ใช่ข้อจำกัดของ Storybook) | ไม่เกี่ยวข้อง (ไม่ได้ compile โค้ด) | เหมือน Storybook เพราะเป็น React tool มาตรฐานบน Vite ซึ่งรองรับ CSS Modules โดย default | รองรับเต็มที่ แต่ปัจจุบัน `prototype/` ใช้ CSS variables ตรง ๆ ไม่ใช่ CSS Modules จริง (ต้องเขียนใหม่ถ้าจะสาธิต CSS Modules จริง) |
| **Auto-gen prop table จาก TS/JSDoc** | ทำได้จริง ผ่าน `reactDocgen: 'react-docgen-typescript'` + `tags: ['autodocs']` ดึง JSDoc comment บน prop interface มาโชว์เป็นคำอธิบายในตาราง ([storybook.js.org/docs/configure/integration/typescript](https://storybook.js.org/docs/configure/integration/typescript)) | ไม่ auto-gen เอง ต้องพึ่ง integration กับ Storybook ถ้าต้องการให้ sync อัตโนมัติ | มี docgen ติดมาบางส่วน (ยืมมาจาก react-docgen เหมือน Storybook ได้เพราะรองรับ CSF เดียวกัน) แต่ addon ที่ครบเท่า Storybook autodocs ไม่มีหลักฐานยืนยันว่าเท่ากัน หาหลักฐานเทียบตรงไม่เจอ | ไม่มี ต้องเขียนตารางมือทั้งหมด |
| **Deploy static ขึ้น GitHub Pages** | ทำได้ง่าย `build-storybook` ได้โฟลเดอร์ `storybook-static` แล้ว deploy ด้วย `gh-pages` package หรือ GitHub Actions workflow มาตรฐาน ([medium.com/swlh](https://medium.com/swlh/how-to-deploy-storybook-to-github-pages-4894097d49ab)) | ไม่ต้อง deploy เอง (เป็น hosted SaaS มี URL ของตัวเอง) แต่ก็หมายความว่า **ไม่ได้อยู่บน GitHub Pages ของโปรเจกต์** | เหมือน Storybook ได้โฟลเดอร์ static ธรรมดา deploy แบบเดียวกันได้ (ไม่พบ pain point พิเศษในรอบค้นนี้) | ง่ายสุด เพราะเป็น HTML ธรรมดาอยู่แล้ว ไม่ต้อง build step ใด ๆ |
| **ค่าดูแลรักษาระยะยาว / breaking change** | มีประวัติ breaking change หนักหลายรอบ (Storybook 4: Webpack 3→4 + Babel 6→7, Storybook 8→9: ปรับ addon API, รวม/ย้าย package, เลิกรองรับ Webpack builder สำหรับหลาย framework) ต้องตามอัปเกรดสม่ำเสมอ ([storybook.js.org/docs/releases/migration-guide-from-older-version](https://storybook.js.org/docs/releases/migration-guide-from-older-version), [pocketlantern.dev](https://pocketlantern.dev/briefs/storybook-9-upgrade-breaking-addon-api-2026)) | ค่าใช้จ่ายรายเดือนต่อเนื่อง เริ่ม $149/เดือน ([uxblueprints.com](https://www.uxblueprints.com/compare/storybook-vs-zeroheight)) ไม่มีความเสี่ยง breaking change ฝั่งโค้ดเพราะไม่ใช่โค้ดในรีโป | เครื่องมือเล็กกว่า ทีมเล็กกว่า มีความเสี่ยง "ถูกเลิกดูแล" สูงกว่า Storybook ในระยะยาว (ขนาดชุมชนเล็กกว่ามาก) แต่ปัจจุบันยังอัปเดตสม่ำเสมอ ([ladle.dev/blog/ladle-v3](https://ladle.dev/blog/ladle-v3/)) | ไม่มีความเสี่ยง breaking change เพราะไม่มี dependency แต่มีความเสี่ยง "drift" สูงแทน (ดู §4) |

**สรุปสั้นของตาราง:** Storybook แพงสุดในมุม dependency และ breaking change แต่ได้ autodocs ที่ตรงกับ JSDoc ภาษาไทยที่มีอยู่แล้วมากที่สุด Zeroheight ไม่แตะ dependency ของโค้ดแต่มีค่า subscription และไม่ auto-sync กับโค้ดเองถ้าไม่ต่อกับ Storybook อยู่ดี Ladle เบาสุดในกลุ่มที่ render จริง แต่เอกสาร auto-gen ไม่ครบเท่า Storybook Static HTML เบาสุดโดยรวมแต่เสี่ยง drift สูงสุด

---

## 3. ทีมเล็ก/ไม่ over-engineer เลือกแบบไหน

หลักฐานจากบทความเกี่ยวกับ governance ของทีมเล็กชี้ตรงกันว่า **หลายทีมขนาดเล็กเลือกไม่สร้างเว็บพรีวิวแยกเลย**:

- "อย่าสร้าง design system portal ให้ทีม 5 คน เพราะเวลาที่ใช้สร้างและดูแลเว็บมากกว่าเวลาที่มันประหยัดได้" ([monotonomo.com](https://www.monotonomo.com/journal/design-system-governance-small-teams/))
- ตัวอย่างที่อ้างถึง (ไม่เปิดเผยชื่อบริษัทชัดในแหล่งที่ค้นเจอ ระบุเพียงว่า "ทีมอย่าง Habitz") เก็บเอกสารไว้ใน **Figma โดยตรง** แบ่งเป็นหน้า foundations/components/patterns แทนเว็บแยก (เดียวกับที่ NTGDS ทำอยู่แล้วบน Figma library 52 หน้า)
- แนวทางที่เสนอสำหรับระดับ "studio scale": เอกสาร inline ในโค้ด (code comment + CSS custom property names) และไฟล์ Markdown เดียวที่ root ของรีโปสำหรับตัดสินใจ/token/naming convention ที่อัปเดตตามโค้ดเรื่อย ๆ (เทียบได้กับที่ NTGDS มี `README.md` ต่อ component อยู่แล้ว)

**ไม่พบตัวอย่างเจ้าใหญ่ระดับโลกที่ทำแบบนี้** (เพราะเจ้าใหญ่ทั้งหมดในหัวข้อ 1 มีเว็บพรีวิวแยกจริง) ข้อนี้คือรูปแบบที่เจอใน **ทีมเล็ก/startup เท่านั้น** ตรงกับสเกลของ NTGDS ปัจจุบัน (คนเดียว + agent)

---

## 4. เจ้าไหนที่เว็บพรีวิวไม่ render component จริง (static doc) และข้อเสียที่เจอจริง

**ไม่พบเจ้าใหญ่ระดับที่ถูกถามถึงในโจทย์ (Polaris/Primer/Carbon/Spotify/GitHub/Adobe/Salesforce/Chakra/Radix/MUI) ที่ทำเว็บพรีวิวหลักเป็น static ไม่ render component จริง** ทุกเจ้าที่ค้นเจอข้อมูล ต่างใช้ live component (ผ่าน Storybook, custom React site, หรือ web component ที่โหลดจาก CDN จริง) แม้แต่ Adobe Spectrum ที่มีเครื่องมือ "viewer" เฉพาะทาง (S2 Tokens Viewer) ก็ generate จาก token data จริง ไม่ใช่ตัวอย่างเขียนมือลอย ๆ

สิ่งที่ใกล้เคียงที่สุดกับ "static ไม่ render จริง" ที่ค้นเจอคือ **ข้อเสนอของทีมเล็กใน §3 ที่เก็บเอกสารไว้ใน Figma หรือ Markdown** ซึ่งเป็นคนละบริบทกับการทำ "เว็บพรีวิว component ให้ทีมอื่นใช้" เพราะ Figma/Markdown ไม่ใช่เว็บที่ทีมอื่น copy code ไปวางใช้ได้ทันที

**ข้อเสียของแนวทาง static-ไม่ render จริงที่มีหลักฐานกล่าวถึงทั่วไป (ไม่เจาะจงองค์กร):**

- Dependency ระหว่างโค้ดกับเอกสารเป็น implicit คือไม่มีกลไกอัตโนมัติเตือนว่าเอกสารล้าหลังโค้ดแล้ว ส่วนใหญ่ค้นพบว่าเอกสารผิดก็เพราะมีคนมาแจ้ง ซึ่งตอนนั้นมันผิดมาเป็นเดือนแล้ว ([dev.to/bala_paranj](https://dev.to/bala_paranj_059d338e44e7e/your-docs-are-outdated-you-just-dont-know-which-ones-14ja))
- "เอกสารผิด" ติดอันดับความหงุดหงิดอันดับต้น ๆ ของนักพัฒนาที่ต้องอ่านเอกสาร (แหล่งเดียวกัน)
- doc-test ช่วยยืนยันได้แค่ว่าโค้ดตัวอย่าง compile ผ่าน แต่ตรวจไม่ได้ว่าคำอธิบาย prose ยังตรงความจริงหรือไม่ (แหล่งเดียวกัน)

ข้อนี้ตรงกับความเสี่ยงของ `prototype/` ที่ NTGDS ทำอยู่ตอนนี้โดยตรง เพราะเป็น static HTML เขียนมือ อ้าง `variables.css` แต่ไม่ได้ import component `.tsx` จริง หมายความว่าถ้าแก้ CSS Module หรือ prop ของ component แล้วลืมแก้ `prototype/` หน้านั้นจะ drift ทันทีโดยไม่มีอะไรเตือน

---

## 5. คำแนะนำท้ายเอกสาร (ให้หัวหน้าทีมตัดสินใจ ไม่ใช่ข้อสรุปบังคับ)

จัดอันดับ 3 ตัวเลือกสำหรับสถานการณ์ของ NTGDS (React+TS+CSS Modules, ยังไม่มี bundler, แจกให้ทีมในองค์กรเดียวกัน ไม่ใช่ open source สาธารณะ):

**อันดับ 1: Storybook + react-docgen-typescript**
- เหมาะเพราะใช้ JSDoc ภาษาไทยที่เขียนไว้ครบทุก prop อยู่แล้วได้ทันทีแบบ auto-gen ไม่ต้องเขียนตารางมือ (ตรงกับจุดแข็งของ asset ที่มีอยู่มากที่สุดในกลุ่มที่ค้นมา)
- ไม่เหมาะเพราะ: ต้องรับ dependency/bundler ก้อนใหญ่ก้อนแรกของ repo (Vite/Webpack + Storybook core + addon) ขัดกับสถานะปัจจุบันที่ตั้งใจเป็น source-only library และมีประวัติ breaking change หนักเป็นระยะ ต้องมีแรงดูแลต่อเนื่อง

**อันดับ 2: Ladle**
- เหมาะเพราะเบากว่า Storybook มาก (build เล็กกว่า ~3.5 เท่า, เร็วกว่าในการ build หลักสิบเท่า) ใช้ Component Story Format เดียวกับ Storybook จึงย้ายไป Storybook ในอนาคตได้ถ้าจำเป็น โปรเจกต์เป็น React ล้วนอยู่แล้วตรงกับข้อจำกัด React-only ของ Ladle พอดี
- ไม่เหมาะเพราะ: ชุมชน/addon เล็กกว่า Storybook มาก autodocs จาก TypeScript ไม่มีหลักฐานยืนยันว่าเทียบเท่า Storybook (ต้องทดสอบจริงก่อนมั่นใจ) และยังต้องรับ dependency ก้อนแรก (Vite) เข้า repo เหมือนกัน เพียงแต่เล็กกว่า

**อันดับ 3: คงแนวทาง static HTML เดิม (ขยาย `prototype/`) แต่เพิ่มกลไกกันโดรทต์**
- เหมาะเพราะไม่เพิ่ม dependency เลย สอดคล้องกับสถานะ source-only library ที่ตั้งใจไว้ และเป็นแนวที่ทีมเล็กจริงเลือกใช้ตามหลักฐานใน §3
- ไม่เหมาะเพราะ: เสี่ยง drift สูงสุดตามหลักฐานใน §4 (ไม่มี live import จาก `.tsx` จริง) ต้องมีวินัยสูงมากในการอัปเดตคู่กันทุกครั้ง และไม่มี auto prop table เลย ต้องพิมพ์มือ เสียจุดแข็งของ JSDoc ที่มีอยู่

**หมายเหตุปิดท้าย:** ไม่มีตัวเลือกใดในสามอันดับนี้ที่เป็น Zeroheight เพราะ Zeroheight ไม่ได้แก้ปัญหาการ "แจกโค้ด component ให้ทีมอื่น copy ไปใช้" โดยตรง (มันเหมาะกับการสื่อสารฝั่งดีไซน์/Figma มากกว่าฝั่งโค้ด) และมีค่าใช้จ่ายรายเดือนที่ต้องประเมินความคุ้มค่าแยกต่างหาก
