---
title: "Task Done Checklist Nation Design System"
description: "เช็คลิสต์หลังจบงาน 1 งาน รวมทุกฝั่งไว้ที่เดียว Figma Code Storybook GitHub และบันทึกงาน ข้อไหนมีรายละเอียดอยู่ในไฟล์กฎอื่นให้ลิงก์ไปที่นั่น"
version: "1.0.0"
last_updated: "2026-11-04"
status: "active"
---

# เช็คลิสต์หลังจบงาน

> รวมไว้ที่เดียวตามที่ผู้ใช้สั่ง 2026-11-04 เพราะเดิมกระจายอยู่ 6 ไฟล์ และฝั่ง Storybook ไม่มีกฎในโปรเจกต์เลย
> ไล่ตามลำดับหัวข้อ ข้ามหัวข้อที่งานนั้นไม่ได้แตะ ข้อไหนมีรายละเอียดในไฟล์อื่น แก้ที่ไฟล์นั้นแล้วให้ไฟล์นี้ชี้ไป

## 1. Figma (ถ้างานแตะไฟล์ออกแบบ)

รายละเอียดเต็ม 12 ข้อ: [context/workflows/figma-ds-file/SKILL.md](../../context/workflows/figma-ds-file/SKILL.md) หัวข้อ Done checklist

- [ ] สแกนทั้งหน้าด้วย `page.findAll()` ไม่ใช่แค่เฟรมที่แก้ ได้ em dash 0 จุดกลาง 0 สีดิบ 0 เงาดิบ 0 (หน้าที่ยกเว้นถาวรคือ 04 Grid, 08 Logo, 09 Third-party Logos)
- [ ] ตัวแปรที่ผูกมาจาก collection `component` เท่านั้น ตรวจว่า binding ชี้ collection ถูก ไม่ใช่ดูแค่ชื่อ
- [ ] ตัวอักษรใช้ text style ไม่ตั้งค่าเอง
- [ ] ใช้ชิ้นจากระบบ ไม่วาดเอง ตารางเอกสารใช้ชุด `-table-cell` จากหน้า 28 Table
- [ ] หัวเอกสารตั้งชื่อจริง ไม่ปล่อย "Design system header"
- [ ] อ่านค่าที่ resolve แล้วจริง และถ่ายภาพทั้งก่อนและหลังแก้
- [ ] ไม่ resize component ต้นทาง ถ้าแก้ต้นทาง ตรวจว่า instance ไม่พัง
- [ ] พื้นหลังหน้าเป็น `#EEF5FF`
- [ ] ของที่เจอนอกหน้าที่ทำ ไม่แก้ จดเป็นงานค้างใน worklog (กฎทำทีละหน้าใน [AGENTS.md](../../AGENTS.md))

## 2. Code

รายละเอียด: [components/AGENTS.md](../../components/AGENTS.md) หัวข้อ Before you say it's done และ [tokens/AGENTS.md](../../tokens/AGENTS.md) หัวข้อ Gates

- [ ] ไม่มีค่าดิบ ใช้ token เท่านั้น ไม่ใช้ primitive token (ยกเว้นข้อยกเว้นที่จดไว้ใน `foundations/AGENTS.md`)
- [ ] `npm run typecheck` ได้ 0 error
- [ ] แก้ component: `npm run verify:css` ผ่าน และ `npm run verify:api` ผ่านถ้า prop หรือแกนใน Figma เปลี่ยน
- [ ] แก้ token หรือสูตร: `npm run tokens:build` ไม่มี collision, `npm run tokens:verify` ขึ้น "ต้องดู 0 กลุ่ม", `npm run verify:coverage` ไม่มีช่องโหว่
- [ ] prop ใหม่หรือที่เปลี่ยน อยู่ในตาราง props ของ README และใน stories
- [ ] แก้ `.dsds.yaml` หรือ component ที่มี spec: `node scripts/check-dsds.mjs` ผ่าน
- [ ] เนื้อหาที่ดึงจาก Figma ให้รันสคริปต์ดึงใหม่ เช่น `npm run figma:atom-doc -- <หน้า>` ห้ามแก้ JSON ด้วยมือ
- [ ] ไฟล์ที่แก้ไม่มี em dash

## 3. Storybook

ข้อนี้เดิมอยู่แค่ในความจำของ agent (หัวหน้าทัก 2026-10-22 หลังเว็บยังเป็นรุ่นเก่าและสีผิด 4 จุด) จึงเขียนเป็นกฎที่นี่

- [ ] เปิด Storybook ในเครื่อง ดูทุกหน้าที่งานแตะ และไม่มี error ใน console
- [ ] ถ่ายภาพเทียบกับ Figma ไม่ตรวจแค่ค่า CSS หรือผลของด่านตรวจ
- [ ] ลองพฤติกรรมที่แก้จริง เช่น ปรับค่าในแผงแล้วตัวอย่างเปลี่ยน รูปโหลดครบ เมนูเรียงถูก
- [ ] ไม่ปล่อยให้ผู้ใช้ตรวจเอง

## 4. GitHub (ทำเมื่อผู้ใช้สั่งเท่านั้น)

รายละเอียด: [docs/rules/git-github.md](git-github.md)

- [ ] commit เฉพาะไฟล์ของงานนั้น ไม่รวมงานของคนอื่นหรือเซสชันอื่น ตรวจว่าไม่มีไฟล์ตกเพราะ `.gitignore`
- [ ] push แล้วรอ Deploy Storybook ผ่าน ดูด้วย `gh run list`
- [ ] เปิดเว็บทีม https://pstommydesigner.github.io/nation-design-system ดูหน้าที่แก้อีกรอบ จะบอกว่า "sync แล้ว" ได้ต้องผ่านข้อนี้
- [ ] ห้าม force push และห้ามเปลี่ยน visibility ของ repo ถ้าไม่ได้ถาม

## 5. บันทึกงานและ Obsidian

รายละเอียด: [docs/rules/worklog.md](worklog.md)

- [ ] worklog รายวันใน `docs/daily-log/daily/` ครบ 4 หัวข้อ งานที่เสร็จลบออกจาก `งานค้าง`
- [ ] บันทึกของงานใน `docs/daily-log/tasks/` เขียน `### <วันที่> worklog <เลข>` พร้อม `#### ผลตรวจ` ที่มีตัวเลข **ต้องรอผู้ใช้คอนเฟิร์มก่อนเขียน**
- [ ] ปิดงาน: ตั้ง `due` เป็นวันเสร็จ และ `status` เป็น `Internal Review` (`Done` ใช้เมื่อตรวจผ่านจริง)
- [ ] สำเนาไป vault: รอบ 16:00 ทำเอง ถ้าเขียนหลัง 16:00 รัน `npm run worklog:obsidian` งาน One CMS รัน `npm run one-cms:obsidian` ด้วย
- [ ] เรื่องที่เป็นบทเรียนหรือคำตัดสินใหม่ ถ้าเป็นกฎให้ลงไฟล์กฎในโปรเจกต์

## 6. สรุปให้ผู้ใช้

- [ ] ทำอะไร ไฟล์ที่เปลี่ยน component และ token ที่ใช้ (บอกด้วยว่าตัวไหนเป็น beta) และขั้น sync ที่ยังค้าง
- [ ] ข้อไหนที่ทำไม่ได้หรือไม่ได้ตรวจ บอกตรง ๆ
- [ ] ถ้าไม่ได้ทำตามกฎข้อไหนที่เป็น SHOULD ต้องบอกเหตุผล
