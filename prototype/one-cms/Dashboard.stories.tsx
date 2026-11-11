import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../../components/Button'
import { LinkButton } from '../../components/LinkButton'
import { Avatar, AvatarLabel } from '../../components/Avatar'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Card } from '../../components/Card'
import { Modal } from '../../components/Modal'
import { TextField } from '../../components/TextField'
import { Tag } from '../../components/Tag'
import { Dropdown } from '../../components/Dropdown'
import { Tabs } from '../../components/Tabs'
import { Table, type TableSort } from '../../components/Table'
import { Pagination } from '../../components/Pagination'
import { BarChart, type BarChartSeries } from '../../components/BarChart'
import '../../tokens/output/css/typography.css'
import styles from './Dashboard.module.css'
import { getBrand } from './brands'

// หน้า Dashboard ของ One CMS จาก Figma CMS เฟรม Dashboard / Home (13060:8732)
// ผู้ใช้เปลี่ยนจากเฟรม C เป็น D เมื่อ 2026-10-28: 3 section เต็มความกว้างซ้อนลงมา จัดอันดับ 40 ข่าว 4 คอลัมน์
// มีช่องค้นหา ช่วงวันที่ และแท็กหมวด กราฟเต็มความกว้าง ข้อมูลนักข่าวเป็นตาราง
// ส่วนนักข่าวคงตัวกรองวัน สัปดาห์ เดือน ปี ไว้ตามกฎโปรเจกต์ แม้เฟรมในแบบไม่มี
// กดพาดหัวข่าวในอันดับเปิด Modal รายละเอียดข่าว (md ไม่มีหัว) ตามเฟรม Modal / Dashboard v2 (15626:38085)
// กดชื่อนักข่าวในตารางเปิด Modal ข่าวของนักข่าว (lg) ออกแบบกับผู้ใช้จากชิ้นส่วน DS 2026-10-28 ยังไม่มีเฟรม
// ข้อมูลตัวอย่างเป็นของกรุงเทพธุรกิจ (bkk) เป็นข้อมูลสมมุติทั้งหมด โลโก้กับชื่อแบรนด์บนแถบหัวเปลี่ยนตาม BU ที่เลือกบนแถบ Storybook

const MENU = ['Dashboard', 'Back Office', 'Webpage Control', 'Admin Tool', 'Documents']

const CATEGORIES = ['ทั้งหมด', 'เศรษฐกิจ', 'การเงิน', 'ธุรกิจ', 'การเมือง', 'เทคโนโลยี', 'ไลฟ์สไตล์']

const HEADLINES = [
  'ส่งออกไทยไตรมาสสามโตเกินคาด สินค้าเกษตรนำทัพ',
  'ตลาดหุ้นไทยปิดบวก นักลงทุนต่างชาติกลับมาซื้อสุทธิ',
  'แบงก์ชาติคงดอกเบี้ยนโยบาย จับตาเงินเฟ้อปลายปี',
  'อีวีจีนเร่งตั้งฐานผลิตในไทย ดันซัพพลายเชนชิ้นส่วน',
  'ท่องเที่ยวปลายปีคึกคัก โรงแรมหัวเมืองรองจองเต็ม',
  'สตาร์ทอัพไทยระดมทุนรอบใหม่ มุ่งตลาดอาเซียน',
  'ราคาทองวันนี้ปรับขึ้นตามตลาดโลก',
  'ค้าปลีกออนไลน์โตต่อเนื่อง ร้านเล็กหันใช้ไลฟ์สด',
  'พลังงานสะอาดเฟสใหม่ เอกชนยื่นขายไฟเพิ่ม',
  'อสังหาฯ ปรับกลยุทธ์ เน้นคอนโดใกล้รถไฟฟ้า',
  'ธุรกิจอาหารแปรรูปบุกตลาดตะวันออกกลาง',
  'ค่าเงินบาทแข็งค่าต่อ ผู้ส่งออกเร่งป้องกันความเสี่ยง',
  'โครงการรถไฟทางคู่เฟสสองเริ่มประมูลต้นปีหน้า',
  'ประกันสุขภาพยอดพุ่ง คนรุ่นใหม่ใส่ใจการเงินมากขึ้น',
  'เอสเอ็มอีเข้าถึงสินเชื่อยาก ภาครัฐเตรียมมาตรการช่วย',
  'ดาต้าเซ็นเตอร์แห่ลงทุนอีอีซี ดันความต้องการไฟฟ้า',
  'ผลไม้ไทยส่งออกจีนคึกคัก ทุเรียนครองแชมป์',
  'แรงงานทักษะสูงขาดแคลน บริษัทเร่งยกระดับพนักงาน',
  'ค่าครองชีพสูง คนไทยปรับพฤติกรรมการใช้จ่าย',
  'ฟินเทคไทยขยายบริการชำระเงินข้ามประเทศ',
  'กองทุนรวมหุ้นต่างประเทศเงินไหลเข้าต่อเนื่อง',
  'ผู้ผลิตชิ้นส่วนรถยนต์ปรับไลน์รับรถไฟฟ้า',
  'สนามบินภูมิภาคเพิ่มเที่ยวบินรับไฮซีซัน',
  'ร้านกาแฟท้องถิ่นแข่งดุ ชูวัตถุดิบเมืองรอง',
  'ธนาคารเปิดสินเชื่อสีเขียว หนุนโรงงานลดคาร์บอน',
  'ตลาดแรงงานไอทีคึกคัก เงินเดือนนักพัฒนาขยับ',
  'ข้าวไทยราคาดีขึ้น ชาวนาได้อานิสงส์ส่งออก',
  'ห้างใหญ่ปรับโฉม เพิ่มพื้นที่ประสบการณ์',
  'บริษัทจดทะเบียนประกาศจ่ายปันผลระหว่างกาล',
  'ภาษีคาร์บอนใกล้เริ่ม ผู้ประกอบการเตรียมตัว',
  'เกษตรอัจฉริยะใช้โดรนพ่นปุ๋ย ลดต้นทุนไร่อ้อย',
  'ประมูลคลื่นความถี่รอบใหม่ ค่ายมือถือพร้อมลุย',
  'ส่งออกรถยนต์เดือนล่าสุดฟื้นตัวชัด',
  'ตลาดคอนโดมือสองโต คนรุ่นใหม่หาบ้านราคาเอื้อม',
  'ธุรกิจโลจิสติกส์ขยายคลังสินค้าชายแดน',
  'เครื่องสำอางไทยบุกตลาดออนไลน์ต่างประเทศ',
  'ราคาน้ำมันขายปลีกปรับลดสัปดาห์นี้',
  'โรงพยาบาลเอกชนลงทุนเครื่องมือการแพทย์ใหม่',
  'แบรนด์แฟชั่นไทยใช้ผ้าทอพื้นเมืองเจาะตลาดโลก',
  'ผลสำรวจชี้คนไทยออมเงินมากขึ้นปลายปี',
]

// หมวดของแต่ละข่าวใน HEADLINES ตามลำดับ แสดงเป็น Tag ในการ์ด
const HEADLINE_CATEGORIES = [
  'เศรษฐกิจ',
  'การเงิน',
  'การเงิน',
  'ธุรกิจ',
  'เศรษฐกิจ',
  'เทคโนโลยี',
  'การเงิน',
  'ธุรกิจ',
  'ธุรกิจ',
  'ธุรกิจ',
  'ธุรกิจ',
  'การเงิน',
  'เศรษฐกิจ',
  'การเงิน',
  'การเมือง',
  'เทคโนโลยี',
  'เศรษฐกิจ',
  'เศรษฐกิจ',
  'ไลฟ์สไตล์',
  'เทคโนโลยี',
  'การเงิน',
  'ธุรกิจ',
  'ไลฟ์สไตล์',
  'ไลฟ์สไตล์',
  'การเงิน',
  'เทคโนโลยี',
  'เศรษฐกิจ',
  'ไลฟ์สไตล์',
  'การเงิน',
  'การเมือง',
  'เทคโนโลยี',
  'เทคโนโลยี',
  'เศรษฐกิจ',
  'ธุรกิจ',
  'ธุรกิจ',
  'ธุรกิจ',
  'เศรษฐกิจ',
  'ธุรกิจ',
  'ไลฟ์สไตล์',
  'การเงิน',
]

// ยอดวิวสมมุติ เรียงจากมากไปน้อยตามอันดับ id ใช้แทนเลขข่าว ไม่ซ้ำกันทุกหมวด
type RankNews = { id: number; rank: number; title: string; category: string; pv: number; ga: number; th: number }
const ALL_NEWS: RankNews[] = HEADLINES.map((title, i) => ({
  id: i + 1,
  rank: i + 1,
  title,
  category: HEADLINE_CATEGORIES[i],
  pv: 48000 - i * 950,
  ga: 41000 - i * 800,
  th: 36000 - i * 700,
}))

// ข่าวสมมุติเพิ่มของหมวดเศรษฐกิจและการเงิน ยอดวิวต่ำกว่าอันดับ 40 ของทั้งหมด (ผู้ใช้สั่ง 2026-11-11 ทำแค่ 3 หมวดแรก)
const ECONOMY_EXTRA = [
  'จีดีพีไตรมาสสามขยายตัวดีกว่าคาด',
  'สภาพัฒน์ปรับประมาณการเศรษฐกิจทั้งปี',
  'ดัชนีความเชื่อมั่นผู้บริโภคฟื้นสามเดือนติด',
  'เงินเฟ้อทั่วไปเดือนล่าสุดชะลอลง',
  'หนี้ครัวเรือนไทยยังทรงตัวระดับสูง',
  'การลงทุนภาคเอกชนเริ่มกลับมาขยายตัว',
  'ยอดนำเข้าเครื่องจักรพุ่ง สะท้อนการลงทุนใหม่',
  'ดัชนีอุตสาหกรรมเดือนล่าสุดปรับตัวดีขึ้น',
  'ราคาสินค้าเกษตรสูงขึ้น หนุนรายได้เกษตรกร',
  'นักท่องเที่ยวต่างชาติทะลุเป้าหมายรายเดือน',
  'ส่งออกไปสหรัฐฯ โตต่อเนื่อง แม้เผชิญภาษีใหม่',
  'การค้าชายแดนไทยลาวคึกคักช่วงปลายปี',
  'ภาคบริการฟื้นตัว ดันการจ้างงานเพิ่ม',
  'อัตราว่างงานล่าสุดลดลงต่ำสุดในรอบปี',
  'ค่าแรงขั้นต่ำใหม่เริ่มมีผลต้นปีหน้า',
  'งบลงทุนภาครัฐเบิกจ่ายเร็วขึ้น',
  'เศรษฐกิจภาคอีสานโตจากการท่องเที่ยว',
  'ห่วงโซ่อุปทานโลกปรับตัว ไทยได้อานิสงส์',
  'ราคาปุ๋ยปรับลด ช่วยลดต้นทุนการผลิต',
  'ยอดขายรถยนต์ในประเทศเริ่มฟื้นตัว',
  'การบริโภคภาคครัวเรือนขยายตัวเล็กน้อย',
  'อุตสาหกรรมอิเล็กทรอนิกส์รับคำสั่งซื้อเพิ่ม',
  'ยางพาราราคาดีขึ้นตามความต้องการโลก',
  'ภัยแล้งกระทบผลผลิตข้าวนาปรัง',
  'นิคมอุตสาหกรรมใหม่เปิดรับนักลงทุนต่างชาติ',
  'เศรษฐกิจดิจิทัลมีสัดส่วนสูงขึ้นในจีดีพี',
  'ค่าระวางเรือลดลง ผู้ส่งออกได้ประโยชน์',
  'มาตรการกระตุ้นการใช้จ่ายรอบใหม่เริ่มสัปดาห์หน้า',
  'ภาคการผลิตเร่งใช้ระบบอัตโนมัติ',
  'ราคาไข่ไก่และเนื้อหมูทรงตัว',
  'เขตเศรษฐกิจพิเศษชายแดนดึงลงทุนได้มากขึ้น',
  'ท่องเที่ยวชุมชนสร้างรายได้หมุนเวียน',
]

const FINANCE_EXTRA = [
  'ตลาดหุ้นไทยแกว่งตัวแคบ รอผลประชุมเฟด',
  'บอนด์ยีลด์ไทยปรับลดตามตลาดโลก',
  'ธนาคารพาณิชย์ประกาศลดดอกเบี้ยเงินกู้',
  'หุ้นกลุ่มพลังงานนำตลาดปรับขึ้น',
  'นักวิเคราะห์ชี้เป้าดัชนีหุ้นไทยสิ้นปี',
  'กองทุนลดหย่อนภาษีแบบใหม่เปิดขายแล้ว',
  'หุ้นไอพีโอน้องใหม่เข้าเทรดวันแรกเหนือจอง',
  'ค่าเงินบาทเปิดตลาดเช้านี้ทรงตัว',
  'สินเชื่อบ้านแข่งดุ ธนาคารออกโปรดอกเบี้ยคงที่',
  'บัตรเครดิตยอดใช้จ่ายปลายปีเพิ่มขึ้น',
  'หนี้เสียสินเชื่อรถยนต์ยังน่าห่วง',
  'ประกันชีวิตเบี้ยรับรายใหม่เติบโต',
  'สินทรัพย์ดิจิทัลผันผวน นักลงทุนระวังความเสี่ยง',
  'กองทุนรวมตราสารหนี้เงินไหลเข้า',
  'ธนาคารเร่งปล่อยกู้เอสเอ็มอีผ่านแอป',
  'หุ้นกลุ่มธนาคารรับอานิสงส์ดอกเบี้ยทรงตัว',
  'ทองคำแท่งรับซื้อคืนปรับขึ้นสองรอบ',
  'ตลาดหลักทรัพย์เตรียมเกณฑ์ใหม่คุมชอร์ตเซล',
  'พันธบัตรออมทรัพย์รุ่นใหม่ขายหมดในวันเดียว',
  'การออมผ่านแอปธนาคารได้รับความนิยม',
  'หุ้นกลุ่มค้าปลีกฟื้นรับการใช้จ่ายปลายปี',
  'วางแผนภาษีปลายปี ลดหย่อนอะไรได้บ้าง',
  'ประกันวินาศภัยปรับเบี้ยประกันรถ',
  'ธนาคารไร้สาขาเตรียมเปิดให้บริการปีหน้า',
  'ต่างชาติขายสุทธิหุ้นไทยต่อเนื่องสามวัน',
  'หุ้นกู้เอกชนออกใหม่ดอกเบี้ยจูงใจ',
  'ดัชนีหุ้นเอเชียปรับขึ้นตามวอลล์สตรีท',
  'เงินฝากประจำพิเศษดอกเบี้ยสูงกลับมาแล้ว',
  'กองทุนสำรองเลี้ยงชีพเพิ่มทางเลือกลงทุน',
  'เกณฑ์ใหม่คุมโฆษณาคริปโตเริ่มบังคับใช้',
  'สภาพคล่องในระบบธนาคารยังสูง',
]

// หมวดหนึ่ง = ข่าวของหมวดนั้นที่ติดอันดับในทั้งหมด (ยอดวิวเท่าเดิม) ต่อด้วยข่าวเพิ่ม แล้วเรียงอันดับใหม่ให้ครบ 40
const categoryRanking = (category: string, extra: string[], firstId: number): RankNews[] =>
  [
    ...ALL_NEWS.filter((n) => n.category === category),
    ...extra.map((title, j) => {
      const pv = 10500 - j * 250
      return { id: firstId + j, rank: 0, title, category, pv, ga: Math.round(pv * 0.086) * 10, th: Math.round(pv * 0.075) * 10 }
    }),
  ].slice(0, 40).map((n, i) => ({ ...n, rank: i + 1 }))

// หมวดที่ไม่มีในนี้ยังไม่มีข้อมูลตัวอย่าง จะขึ้นข้อความว่ายังไม่มีข่าว
const RANKINGS: Record<string, RankNews[]> = {
  'ทั้งหมด': ALL_NEWS,
  'เศรษฐกิจ': categoryRanking('เศรษฐกิจ', ECONOMY_EXTRA, 101),
  'การเงิน': categoryRanking('การเงิน', FINANCE_EXTRA, 201),
}

// รายละเอียดสมมุติของข่าวแต่ละอันดับ เวลาไล่จากเช้าวันที่ 28
const pad = (n: number) => String(n).padStart(2, '0')
const newsDetail = (item: RankNews) => {
  const reporter = REPORTERS[(item.id - 1) % REPORTERS.length]
  const hour = 6 + ((item.id - 1) % 8)
  return {
    id: String(1302400 + item.id),
    history: [
      { label: 'สร้าง', at: `28/10/2569 ${pad(hour)}:05`, by: reporter.name },
      { label: 'แก้ไข', at: `28/10/2569 ${pad(hour)}:40`, by: 'บรรณาธิการข่าว' },
      { label: 'เผยแพร่', at: `28/10/2569 ${pad(hour + 1)}:00`, by: 'บรรณาธิการข่าว' },
    ],
  }
}

// ข่าวสมมุติของนักข่าวหนึ่งคน วนใช้พาดหัวชุดเดียวกับอันดับ
const reporterNews = (r: { id: string; created: number; published: number }) =>
  Array.from({ length: r.created }, (_, i) => {
    const day = 28 - Math.floor(i / 3)
    return {
      id: `${r.id}-${i}`,
      title: HEADLINES[(i * 7 + Number(r.id.slice(1))) % HEADLINES.length],
      published: i < r.published,
      at: `${day}/10/2569 ${pad(16 - (i % 3) * 3)}:00`,
      pv: 26000 - i * 410,
    }
  })

const REPORTERS = [
  { id: 'r1', name: 'ชนิดา ศรีสุข', desk: 'โต๊ะข่าวเศรษฐกิจ', created: 42, published: 38, updated: '28/10/2569' },
  { id: 'r2', name: 'ธนกร วงศ์ใหญ่', desk: 'โต๊ะข่าวการเงิน', created: 37, published: 35, updated: '28/10/2569' },
  { id: 'r3', name: 'พิมพ์ชนก แสงทอง', desk: 'โต๊ะข่าวธุรกิจ', created: 35, published: 30, updated: '28/10/2569' },
  { id: 'r4', name: 'วรเมธ จันทร์เพ็ญ', desk: 'โต๊ะข่าวเทคโนโลยี', created: 31, published: 31, updated: '27/10/2569' },
  { id: 'r5', name: 'สุภาวดี ทองดี', desk: 'โต๊ะข่าวการเมือง', created: 28, published: 22, updated: '27/10/2569' },
  { id: 'r6', name: 'กิตติพัฒน์ ใจงาม', desk: 'โต๊ะข่าวเศรษฐกิจ', created: 26, published: 25, updated: '27/10/2569' },
  { id: 'r7', name: 'ณัฐธิดา รุ่งเรือง', desk: 'โต๊ะข่าวไลฟ์สไตล์', created: 24, published: 19, updated: '26/10/2569' },
  { id: 'r8', name: 'ปรเมศวร์ บุญมา', desk: 'โต๊ะข่าวธุรกิจ', created: 21, published: 21, updated: '26/10/2569' },
  { id: 'r9', name: 'อรวรรณ เพชรรัตน์', desk: 'โต๊ะข่าวการเงิน', created: 18, published: 12, updated: '25/10/2569' },
  { id: 'r10', name: 'ภาณุวัฒน์ สายสุวรรณ', desk: 'โต๊ะข่าวเทคโนโลยี', created: 15, published: 15, updated: '25/10/2569' },
]
type Reporter = (typeof REPORTERS)[number]

const MONTHS = [
  { value: '2569-10', label: 'ตุลาคม 2569' },
  { value: '2569-09', label: 'กันยายน 2569' },
  { value: '2569-08', label: 'สิงหาคม 2569' },
]

// ข้อมูลกราฟรายวันของเดือน ตัวเลขมาจากความสูงแท่งในแบบ (Figma CMS เฟรม Home D) ชุดเดียวกับ story ของ BarChart
// ข่าวที่สร้างเป็นแท่งบนแกนขวา การเข้าชมเป็นเส้นมีจุดบนแกนซ้าย ตัวเลขในกล่องสรุปคือผลรวมของกราฟ
const CHART_DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1))
const CHART_NEWS = [80, 66, 58, 71, 47, 57, 75, 80, 45, 28, 47, 57, 66, 58, 71, 31, 75, 45, 51, 47, 80, 66, 58, 47, 71, 31, 57, 75, 45, 28, 47]
const CHART_VIEWS = [216000, 169412, 139765, 105176, 114353, 155294, 194824, 220941, 127059, 126353, 110824, 157412, 217412, 126353, 180000, 69882, 74118, 93176, 126353, 110824, 228000, 170118, 165176, 110824, 187765, 74824, 163765, 177882, 93176, 72706, 110824]
const CHART_SERIES: BarChartSeries[] = [
  { label: 'ข่าวที่สร้าง', values: CHART_NEWS, axis: 'right', unit: 'ข่าว' },
  { label: 'การเข้าชม', values: CHART_VIEWS, axis: 'left', type: 'line', unit: 'ครั้ง' },
]
const sum = (values: number[]) => values.reduce((a, b) => a + b, 0)

const PERIODS = [
  { id: 'day', label: 'วัน' },
  { id: 'week', label: 'สัปดาห์' },
  { id: 'month', label: 'เดือน' },
  { id: 'year', label: 'ปี' },
]

const fmt = (n: number) => n.toLocaleString('th-TH')

function RankItem({ item, onOpen }: { item: RankNews; onOpen: (item: RankNews) => void }) {
  return (
    <li className={styles.rankItem}>
      <span className={`${styles.rankNumber} ntg-typography-label-md`}>{item.rank}</span>
      <div className={styles.rankBody}>
        <button type="button" className={`${styles.rankTitle} ${styles.textButton} ntg-typography-title-xs`} title={item.title} onClick={() => onOpen(item)}>
          {item.title}
        </button>
        <div className={styles.rankViews}>
          <LinkButton family="brand" defaultGray size="xs" onClick={() => onOpen(item)}>PV:{fmt(item.pv)}</LinkButton>
          <LinkButton family="brand" defaultGray size="xs" onClick={() => onOpen(item)}>GA:{fmt(item.ga)}</LinkButton>
          <LinkButton family="brand" defaultGray size="xs" onClick={() => onOpen(item)}>TH:{fmt(item.th)}</LinkButton>
        </div>
        {/* หมวดข่าวกับปุ่มตะกร้าชิดซ้าย ตะกร้าเป็น circular-icon-tag สีเดียวกับแท็กหมวด เพราะ Tag pill ไอคอนล้วนไม่มีในระบบ (ผู้ใช้สั่ง 2026-11-11)
            ตะกร้าเก็บข่าวไว้ให้ AI ร่างข่าวในหน้า Article ยังไม่มีการทำงานในรอบนี้ */}
        <div className={styles.rankMeta}>
          <Tag family="neutral" shape="pill" size="sm">{item.category}</Tag>
          <Tag family="neutral" shape="circular" size="sm" icon={<Icon name="shopping-cart" size="100%" />} label="เก็บข่าวลงตะกร้า" onSelect={() => {}}>{null}</Tag>
        </div>
      </div>
    </li>
  )
}

function DashboardPage({ brand }: { brand?: string }) {
  const bu = getBrand(brand)
  const [category, setCategory] = useState('ทั้งหมด')
  const rankList = RANKINGS[category] ?? []
  const [month, setMonth] = useState('2569-10')
  const [chartPeriod, setChartPeriod] = useState('month')
  const [reporterPeriod, setReporterPeriod] = useState('month')
  const [sort, setSort] = useState<TableSort | null>(null)
  const [page, setPage] = useState(1)
  const [news, setNews] = useState<RankNews | null>(null)
  const [reporter, setReporter] = useState<Reporter | null>(null)
  const [reporterTab, setReporterTab] = useState('published')
  const openReporter = (r: Reporter) => { setReporterTab('published'); setReporter(r) }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <img className={styles.brandLogo} src={bu.logoSquare} alt="" />
          <p className={`${styles.brandName} ntg-typography-page-heading-sm`}>{bu.name}</p>
        </div>
        <nav className={styles.nav} aria-label="เมนูหลัก">
          {MENU.map((item) => (
            <Button
              key={item}
              shape="pill"
              size="sm"
              family={item === 'Dashboard' ? 'brand' : 'neutral'}
              hierarchy={item === 'Dashboard' ? 'primary' : 'tertiary'}
              aria-current={item === 'Dashboard' ? 'page' : undefined}
            >
              {item}
            </Button>
          ))}
          <Avatar size="md" alt="บัญชีผู้ใช้" />
        </nav>
      </header>

      <main>
        <section className={`${styles.section} ${styles.sectionTight}`} aria-labelledby="ranking-title">
          <div className={styles.sectionTitle}>
            <h2 id="ranking-title" className={`${styles.heading} ntg-typography-section-heading-lg`}>ข้อมูลเรียลไทม์วันนี้</h2>
            <p className={`${styles.supporting} ntg-typography-body-md`}>
              ข้อมูลปัจจุบัน และข้อมูลย้อนหลัง 24 ชั่วโมง (ยอด PV นับเองจากหน้าเว็บ จึงไม่ตรงกับ GA และ Truehits)
            </p>
          </div>
          <div className={styles.filter}>
            <div className={styles.fields}>
              <TextField label="ค้นหาข้อมูล" placeholder="พาดหัว หมวดหมู่ อื่น ๆ" leadingIcon="search" />
              <TextField label="ช่วงวันที่" placeholder="วัน/เดือน/ปี" trailingIcon="calendar" />
            </div>
            <div className={styles.tags} role="group" aria-label="หมวดข่าว">
              {CATEGORIES.map((c) => (
                <Tag
                  key={c}
                  family="neutral"
                  shape="pill"
                  size="lg"
                  hierarchy={c === category ? 'primary' : 'secondary'}
                  onSelect={() => setCategory(c)}
                >
                  {c}
                </Tag>
              ))}
            </div>
          </div>
          {/* เรียงซ้ายไปขวาแล้วบนลงล่าง 4 คอลัมน์ แถวแรกคืออันดับ 1 ถึง 4 (ผู้ใช้สั่ง 2026-11-11) */}
          {rankList.length > 0 ? (
            <ol className={styles.ranking}>
              {rankList.map((item) => <RankItem key={item.id} item={item} onOpen={setNews} />)}
            </ol>
          ) : (
            <p className={`${styles.empty} ntg-typography-body-md`}>ยังไม่มีข่าวในหมวด{category}</p>
          )}
        </section>

        <section className={styles.section} aria-labelledby="count-title">
          <div className={styles.countTop}>
            <div className={styles.countHead}>
              <h2 id="count-title" className={`${styles.heading} ntg-typography-section-heading-lg`}>ข้อมูลจำนวนข่าว</h2>
              <div className={styles.pair}>
                <Dropdown label="เดือน" options={MONTHS} value={month} onValueChange={setMonth} />
                <Dropdown
                  label="รูปแบบกราฟข้อมูล"
                  options={PERIODS.map((p) => ({ value: p.id, label: `ราย${p.label}` }))}
                  value={chartPeriod}
                  onValueChange={setChartPeriod}
                />
              </div>
            </div>
            <div className={styles.pair}>
              <div className={styles.stat}>
                <p className={`${styles.statLabel} ntg-typography-label-xl`}>
                  <span className={`${styles.dot} ${styles.dotCreated}`} aria-hidden="true" />
                  ข่าวที่สร้าง
                </p>
                <p className={`${styles.statValue} ntg-typography-page-heading-sm`}>{fmt(sum(CHART_NEWS))}</p>
              </div>
              <div className={styles.stat}>
                <p className={`${styles.statLabel} ntg-typography-label-xl`}>
                  <span className={`${styles.dot} ${styles.dotViews}`} aria-hidden="true" />
                  การเข้าชม
                </p>
                <p className={`${styles.statValue} ntg-typography-page-heading-sm`}>{fmt(sum(CHART_VIEWS))}</p>
              </div>
            </div>
          </div>
          <BarChart
            categories={CHART_DAYS}
            series={CHART_SERIES}
            categoryLabel="วันที่"
            summary={`ข่าวที่สร้างและการเข้าชมรายวัน ${MONTHS.find((m) => m.value === month)?.label ?? ''} ข่าวสูงสุด ${Math.max(...CHART_NEWS)} ข่าว การเข้าชมสูงสุด ${fmt(Math.max(...CHART_VIEWS))} ครั้ง`}
          />
        </section>

        <section className={styles.section} aria-labelledby="reporter-title">
          <div className={styles.sectionHead}>
            <h2 id="reporter-title" className={`${styles.heading} ntg-typography-section-heading-lg`}>ข้อมูลนักข่าว</h2>
            <Tabs shape="segmented" size="sm" label="ช่วงเวลาของสถิตินักข่าว" items={PERIODS} value={reporterPeriod} onValueChange={setReporterPeriod} />
          </div>
          <div className={styles.tableBlock}>
            <Table<Reporter>
              caption="สถิติข่าวของนักข่าว"
              captionHidden
              data={REPORTERS}
              getRowId={(r) => r.id}
              sort={sort}
              onSortChange={setSort}
              columns={[
                { id: 'no', header: 'ที่', variant: 'index', accessor: (_r, i) => (page - 1) * 10 + i + 1 },
                { id: 'name', header: 'ผู้ลงข่าว', rowHeader: true, sortable: true, accessor: (r) => <button type="button" className={styles.textButton} onClick={() => openReporter(r)}>{r.name}</button>, supporting: (r) => r.desk },
                { id: 'total', header: 'ทั้งหมด', variant: 'number', sortable: true, accessor: (r) => fmt(r.created) },
                { id: 'published', header: 'เผยแพร่แล้ว', variant: 'number', sortable: true, accessor: (r) => fmt(r.published) },
                { id: 'unpublished', header: 'ยังไม่เผยแพร่', variant: 'number', sortable: true, accessor: (r) => fmt(r.created - r.published) },
                { id: 'updated', header: 'อัปเดตล่าสุด', variant: 'date', sortable: true, accessor: (r) => r.updated },
              ]}
            />
            <div className={styles.pagination}>
              <Pagination label="หน้ารายชื่อนักข่าว" currentPage={page} totalPages={10} onPageChange={setPage} />
            </div>
          </div>
        </section>
      </main>

      <NewsDetailModal item={news} onClose={() => setNews(null)} />
      <ReporterModal reporter={reporter} tab={reporterTab} onTabChange={setReporterTab} onClose={() => setReporter(null)} />
    </div>
  )
}

// ── Modal รายละเอียดข่าว: md ไม่มีหัว ปุ่มปิดวงกลมลอยทับมุมขวาบนของรูป ──
// รูปกับแถวสถิติอยู่ในกรอบเดียวกันตามเฟรม ใช้ radius ของ card (4)
function NewsDetailModal({ item, onClose }: { item: RankNews | null; onClose: () => void }) {
  // คงข้อมูลชิ้นล่าสุดไว้ระหว่างเล่นขาออก ไม่งั้นเนื้อหาหายก่อนกล่องปิด
  const [last, setLast] = useState<RankNews | null>(item)
  if (item && item !== last) setLast(item)
  const shown = item ?? last
  const detail = shown ? newsDetail(shown) : null
  return (
    <Modal open={item !== null} onClose={onClose} size="md" header={false} aria-label={shown?.title ?? 'รายละเอียดข่าว'}>
      {shown && detail ? (
        <div className={styles.detail}>
          <div className={styles.detailMedia}>
            <div className={styles.detailImage} role="img" aria-label="ภาพประกอบข่าว" />
            <div className={styles.detailStats}>
              <p className={`${styles.detailStatsText} ntg-typography-label-sm`}>
                <span>อันดับ {shown.rank}</span>
                <span>Pageviews {fmt(shown.pv)}</span>
                <span>GA {fmt(shown.ga)}</span>
                <span>Truehits {fmt(shown.th)}</span>
              </p>
              <span className={styles.detailId}>
                <span className="ntg-typography-label-sm">ID {detail.id}</span>
                <IconButton icon="copy" label={`คัดลอก ID ${detail.id}`} family="neutral" hierarchy="tertiary" size="xs"
                  onClick={() => navigator.clipboard?.writeText(detail.id)} />
              </span>
            </div>
          </div>
          <h2 className={`${styles.detailTitle} ntg-typography-title-lg`}>{shown.title}</h2>
          <ul className={styles.detailHistory}>
            {detail.history.map((h) => (
              <li key={h.label} className="ntg-typography-body-sm">{h.label} {h.at} โดย {h.by}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </Modal>
  )
}

// ── Modal ข่าวของนักข่าว: lg หัวเป็น AvatarLabel ตัวเลขรวมเป็นคำอธิบาย แท็บแยกเผยแพร่แล้วกับยังไม่เผยแพร่ ──
function ReporterModal({ reporter, tab, onTabChange, onClose }: {
  reporter: Reporter | null; tab: string; onTabChange: (id: string) => void; onClose: () => void
}) {
  const [last, setLast] = useState<Reporter | null>(reporter)
  if (reporter && reporter !== last) setLast(reporter)
  const shown = reporter ?? last
  const list = shown ? reporterNews(shown) : []
  const panel = (items: typeof list, verb: string) => (
    <ul className={styles.newsList}>
      {items.map((n) => (
        <li key={n.id}>
          <Card variant="list" title={n.title} titleLines={2} meta={`${verb} ${n.at}${n.published ? `  PV ${fmt(n.pv)}` : ''}`} />
        </li>
      ))}
    </ul>
  )
  return (
    <Modal
      open={reporter !== null}
      onClose={onClose}
      size="lg"
      title={shown ? <AvatarLabel size="lg" avatar={<Avatar initials={shown.name.split(' ').map((w) => w[0]).join('')} alt="" size="lg" />} title={shown.name} supportingText={shown.desk} /> : 'ข่าวของนักข่าว'}
      description={shown ? `ข่าวทั้งหมด ${fmt(shown.created)} ข่าว` : undefined}
    >
      {shown ? (
        <Tabs
          label="สถานะข่าว"
          value={tab}
          onValueChange={onTabChange}
          items={[
            { id: 'published', label: `เผยแพร่แล้ว ${fmt(shown.published)}`, panel: panel(list.filter((n) => n.published), 'เผยแพร่') },
            { id: 'draft', label: `ยังไม่เผยแพร่ ${fmt(shown.created - shown.published)}`, panel: panel(list.filter((n) => !n.published), 'แก้ไขล่าสุด') },
          ]}
        />
      ) : null}
    </Modal>
  )
}

const meta: Meta<typeof DashboardPage> = {
  title: 'Page (Prototype)/One CMS/Dashboard',
  component: DashboardPage,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof DashboardPage>

export const Default: Story = { name: 'Dashboard', render: (_args, { globals }) => <DashboardPage brand={globals.brand} /> }
