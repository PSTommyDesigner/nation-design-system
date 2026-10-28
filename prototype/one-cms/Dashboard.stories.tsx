import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../../components/Button'
import { LinkButton } from '../../components/LinkButton'
import { Avatar } from '../../components/Avatar'
import { TextField } from '../../components/TextField'
import { Tag } from '../../components/Tag'
import { Dropdown } from '../../components/Dropdown'
import { Tabs } from '../../components/Tabs'
import { Table, type TableSort } from '../../components/Table'
import { Pagination } from '../../components/Pagination'
import { BarChart, type BarChartSeries } from '../../components/BarChart'
import '../../tokens/output/css/typography.css'
import styles from './Dashboard.module.css'

const brandLogo = new URL('./assets/bangkokbiznews-logo-square.svg', import.meta.url).href

// หน้า Dashboard ของ One CMS จาก Figma CMS เฟรม Dashboard / Home D (15626:38637)
// ผู้ใช้เปลี่ยนจากเฟรม C เป็น D เมื่อ 2026-10-28: 3 section เต็มความกว้างซ้อนลงมา จัดอันดับ 40 ข่าว 4 คอลัมน์
// มีช่องค้นหา ช่วงวันที่ และแท็กหมวด กราฟเต็มความกว้าง ข้อมูลนักข่าวเป็นตาราง
// ส่วนนักข่าวคงตัวกรองวัน สัปดาห์ เดือน ปี ไว้ตามกฎโปรเจกต์ แม้เฟรม D ไม่มี
// กราฟเป็น component ใหม่ของ ntgds ที่จะทำทีหลัง หน้านี้จึงวางกล่องรอไว้
// ข้อมูลตัวอย่างเป็นของกรุงเทพธุรกิจ (bkk) เป็นข้อมูลสมมุติทั้งหมด

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

// ยอดวิวสมมุติ เรียงจากมากไปน้อยตามอันดับ
const RANKING = HEADLINES.map((title, i) => ({
  rank: i + 1,
  title,
  pv: 48000 - i * 950,
  ga: 41000 - i * 800,
  th: 36000 - i * 700,
}))

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
// ข่าวที่สร้างเป็นแท่งเข้มบนแกนขวา การเข้าชมเป็นแท่งอ่อนบนแกนซ้าย ตัวเลขในกล่องสรุปคือผลรวมของกราฟ
const CHART_DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1))
const CHART_NEWS = [80, 66, 58, 71, 47, 57, 75, 80, 45, 28, 47, 57, 66, 58, 71, 31, 75, 45, 51, 47, 80, 66, 58, 47, 71, 31, 57, 75, 45, 28, 47]
const CHART_VIEWS = [216000, 169412, 139765, 105176, 114353, 155294, 194824, 220941, 127059, 126353, 110824, 157412, 217412, 126353, 180000, 69882, 74118, 93176, 126353, 110824, 228000, 170118, 165176, 110824, 187765, 74824, 163765, 177882, 93176, 72706, 110824]
const CHART_SERIES: BarChartSeries[] = [
  { label: 'ข่าวที่สร้าง', values: CHART_NEWS, axis: 'right' },
  { label: 'การเข้าชม', values: CHART_VIEWS, axis: 'left' },
]
const sum = (values: number[]) => values.reduce((a, b) => a + b, 0)

const PERIODS = [
  { id: 'day', label: 'วัน' },
  { id: 'week', label: 'สัปดาห์' },
  { id: 'month', label: 'เดือน' },
  { id: 'year', label: 'ปี' },
]

const fmt = (n: number) => n.toLocaleString('th-TH')

function RankItem({ item }: { item: (typeof RANKING)[number] }) {
  return (
    <li className={styles.rankItem}>
      <span className={`${styles.rankNumber} ntg-typography-label-md`}>{item.rank}</span>
      <div className={styles.rankBody}>
        <p className={`${styles.rankTitle} ntg-typography-title-xs`} title={item.title}>{item.title}</p>
        <div className={styles.rankViews}>
          <LinkButton href="#" family="brand" defaultGray size="xs">PV:{fmt(item.pv)}</LinkButton>
          <LinkButton href="#" family="brand" defaultGray size="xs">GA:{fmt(item.ga)}</LinkButton>
          <LinkButton href="#" family="brand" defaultGray size="xs">TH:{fmt(item.th)}</LinkButton>
        </div>
      </div>
    </li>
  )
}

function DashboardPage() {
  const [category, setCategory] = useState('ทั้งหมด')
  const [month, setMonth] = useState('2569-10')
  const [chartPeriod, setChartPeriod] = useState('month')
  const [reporterPeriod, setReporterPeriod] = useState('month')
  const [sort, setSort] = useState<TableSort | null>(null)
  const [page, setPage] = useState(1)

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <img className={styles.brandLogo} src={brandLogo} alt="" />
          <p className={`${styles.brandName} ntg-typography-page-heading-sm`}>กรุงเทพธุรกิจ</p>
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

      <div className={styles.pageHead}>
        <h1 className={`${styles.pageTitle} ntg-typography-page-heading-lg`}>แดชบอร์ด</h1>
      </div>

      <main>
        <section className={`${styles.section} ${styles.sectionTight}`} aria-labelledby="ranking-title">
          <div className={styles.sectionTitle}>
            <h2 id="ranking-title" className={`${styles.heading} ntg-typography-section-heading-lg`}>ข้อมูลเรียลไทม์วันนี้</h2>
            <p className={`${styles.supporting} ntg-typography-body-md`}>
              ข้อมูล ณ 28 ตุลาคม 2569 เวลา 14:00 น. (ยอด PV นับเองจากหน้าเว็บ จึงไม่ตรงกับ GA และ Truehits)
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
          <div className={styles.ranking}>
            {[0, 10, 20, 30].map((start) => (
              <ol key={start} className={styles.rankList} start={start + 1}>
                {RANKING.slice(start, start + 10).map((item) => <RankItem key={item.rank} item={item} />)}
              </ol>
            ))}
          </div>
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
                { id: 'name', header: 'ผู้ลงข่าว', rowHeader: true, sortable: true, accessor: (r) => r.name, supporting: (r) => r.desk },
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
    </div>
  )
}

const meta: Meta<typeof DashboardPage> = {
  title: 'Prototype/One CMS/Dashboard',
  component: DashboardPage,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof DashboardPage>

export const Default: Story = { name: 'Dashboard' }
