/**
 * เทมเพลตหน้า Docs แบบกำหนดเอง ใช้แทนของเริ่มต้นของ Storybook กับทุก component
 * (ตั้งใจให้เป็นเทมเพลตกลางตัวเดียว ไม่เขียน MDX แยกทีละ component)
 *
 * ⚠️ ทำไมต้องมี (ตั้ง 2026-10-19 หัวหน้าสั่ง)
 *    ของเดิม (autodocs ค่าเริ่มต้น) วางตัวอย่างซ้ำกันสองชุด คือ Primary ที่เชื่อมกับ
 *    ตาราง Controls ด้านบนจริง กับ Stories ที่แสดงทุกตัวอย่างอีกชุดนับรวม primary ซ้ำ
 *    ทำให้หัวหน้าลองเปลี่ยนค่าที่ตัวอย่างในหัวข้อ STORIES (ชุดที่สอง เป็นภาพนิ่ง)
 *    แล้วงงว่าทำไมไม่ขยับ ทั้งที่ของจริงที่ขยับได้อยู่คนละจุด
 *
 * ⚠️ ไม่มีแผง Controls ในหน้า Docs (ผู้ใช้สั่ง 2026-11-02 ยกเลิกแผงติดขอบขวาที่ตั้งไว้ 2026-10-20)
 *    แผงคุมได้แค่ตัวอย่างบนสุด พอเลื่อนลงมาจึงไม่เห็นผล ลองปรับค่าได้ที่หน้า story เดี่ยวของ component
 *
 * ⚠️ เนื้อหาจัดเป็นหัวข้อแบบ Page Doc ของไฟล์ออกแบบ (ตั้ง 2026-10-20 หัวหน้าอนุมัติแผน)
 *    แทนการไล่ story เป็นรายการยาวไม่มีหมวด หัวข้อยึดตามกฎ 8.5 ของ CLAUDE.md คือ
 *    ส่วนประกอบ · ชุด · ขนาด · สถานะ · ควรไม่ควร
 *    - แต่ละ story บอกว่าตัวเองอยู่หัวข้อไหนด้วย `parameters.docs.section` ใน stories.tsx
 *      เทมเพลตกลางตัวนี้จัดกลุ่มให้เอง ไม่ต้องเขียน MDX แยกทีละ component
 *    - หัวข้อที่ไม่มี story จะไม่ขึ้นเลย ไม่มีหัวข้อว่าง
 *    - หัวข้อที่ไม่มีของจริงให้โชว์ (เช่น สถานะ ของ Badge ที่กดไม่ได้) ห้ามยัดตัวอย่างปลอม
 *      ให้ meta ใส่เหตุผลไว้ที่ `parameters.docs.sectionNotes[หัวข้อ]` แล้วหน้าจะแสดงเหตุผลแทน
 *    - story ที่ไม่ได้ระบุหัวข้อไปรวมที่ "ตัวอย่างเพิ่มเติม" ท้ายสุด จะได้ไม่หายไปเฉย ๆ
 *    - ท้ายหน้าเป็นตาราง Props เต็ม (ชื่อ คำอธิบาย ค่าตั้งต้น) สำหรับคนอ่านเอกสาร
 *    - หัวข้อใช้ preset section-heading/xl และคำอธิบาย body/xl ตามโครง section ของหน้า 00 Document
 *
 * โครง:
 *   เนื้อหา  Title / Subtitle / Description / Canvas / หัวข้อ 5 หมวด / Props
 */
import { useContext } from 'react'
import {
  Title, Subtitle, Description, Canvas, ArgTypes, Source, DocsContext, useOf, anchorBlockIdFromId,
} from '@storybook/addon-docs/blocks'

// ลำดับหัวข้อตามกฎ 8.5 ของ CLAUDE.md หัวข้อสุดท้ายรับ story ที่ไม่ได้ระบุหมวด
const SECTIONS = ['ส่วนประกอบ', 'ชุด', 'ขนาด', 'สถานะ', 'ควรไม่ควร'] as const
const EXTRA_SECTION = 'ตัวอย่างเพิ่มเติม'

type StoryEntry = ReturnType<React.ContextType<typeof DocsContext>['componentStories']>[number]
type SectionNotes = Partial<Record<string, string>>

const LAYOUT_CSS = `
  /* ถอดกรอบที่ครอบตัวอย่าง component (หัวหน้าสั่ง 2026-10-20) Storybook วาดเป็น border +
     box-shadow + มุมโค้ง + พื้นสีบน .sbdocs-preview (getBlockBackgroundStyle) และใส่ padding
     32px 22px ให้ .docs-story ข้างใน ล้างทั้งสองชั้นให้ตัวอย่างวางบนพื้นเอกสารตรง ๆ
     แถว Show code ด้านล่างยังอยู่ ตัวเลือกใช้สองคลาสให้ชนะกฎของ emotion */
  div.sbdocs.sbdocs-preview {
    border: 0;
    box-shadow: none;
    border-radius: 0;
    background: transparent;
  }
  div.sbdocs.sbdocs-preview .docs-story {
    padding: 0;
  }
  /* กรอบรอบแต่ละหัวข้อ (หัวหน้าสั่ง 2026-10-20) section ในไฟล์ออกแบบไม่มีเส้นขอบ (พื้น primary
     padding 80 gap 24) จึงยืมกรอบของการ์ดในระบบมาใช้ คือขอบ 1px border/general/primary มุม 12
     ตาม info-card ส่วน padding 40 เท่ากรอบ content ของเทมเพลตหน้า 00 Document gap 24 เท่า section */
  .docs-section {
    display: flex;
    flex-direction: column;
    gap: var(--ntg-size-space-s3-sm);
    margin-top: var(--ntg-size-space-s3-sm);
    padding: var(--ntg-size-space-s3-sm);
    background: var(--ntg-color-background-general-primary);
    border-radius: var(--ntg-info-card-radius-top-left) var(--ntg-info-card-radius-top-right)
      var(--ntg-info-card-radius-bottom-right) var(--ntg-info-card-radius-bottom-left);
    box-shadow: inset 0 0 0 1px var(--ntg-color-border-general-primary);
  }
  /* จังหวะระยะ (หัวหน้าทัก 2026-10-20 หลายรอบ) หลักคือไม่ใช้ margin เลย ทุกระยะมาจาก gap ของ flex
     ชั้นเดียวกัน ลูกทุกตัวของบล็อกถูกตั้ง margin 0 ทับค่าของ Storybook (h3 20/8 p 16 กรอบ 25/40
     โค้ด 25/40)
       .docs-hero      gap 16  ส่วนบนสุด ชื่อ component คำโปรย คำอธิบาย ตัวอย่างหลัก กล่องโค้ด
       .docs-section   gap 24  ระหว่างหัวข้อกับเนื้อหา และระหว่าง story
       .docs-story     gap 16  ชื่อ story คำอธิบาย ตัวอย่าง กล่องโค้ด */
  .docs-hero, .docs-story-block { display: flex; flex-direction: column; gap: var(--ntg-size-space-s2-sm); }
  .docs-hero > *, .docs-story-block > * { margin: 0; }
  .docs-hero p, .docs-story-block p { margin: 0; }
  /* ชื่อ story กับคำอธิบาย รวมเป็น container เดียว gap none (หัวหน้าสั่ง 2026-10-20) แยกจาก
     gap s2-sm ที่คุมระยะ header ไปหาตัวอย่างกับกล่องโค้ดด้านล่าง */
  .docs-story-header { display: flex; flex-direction: column; gap: var(--ntg-size-space-none); }
  .docs-story-header > * { margin: 0; }
  .docs-section div.sbdocs.sbdocs-preview, .docs-hero div.sbdocs.sbdocs-preview { margin: 0; }
  .docs-section table.docblock-argstable { margin: 0; }
  /* ชื่อ story ลดขนาดจาก h3 ของ Storybook (24px) เป็น preset title/md (หัวหน้าสั่ง 2026-10-20) */
  .docs-story-title {
    margin: 0;
    font-family: var(--ntg-typography-font-family-title-md);
    font-size: var(--ntg-typography-font-size-title-md);
    line-height: var(--ntg-typography-line-height-title-md);
    font-weight: var(--ntg-typography-font-weight-title-md);
    letter-spacing: var(--ntg-typography-letter-space-title-md);
    color: var(--ntg-color-text-general-heading);
  }
  /* กล่องโค้ด (หัวหน้าสั่ง 2026-10-20) แสดงตลอด ไม่มีปุ่ม Show/Hide code และเป็นโทนสว่าง
     ทำโดยปิด source ของ Canvas (sourceState none ทำให้แถวปุ่มหายทั้งแถว) แล้ววางบล็อก Source
     แยกต่างหากใต้ตัวอย่าง dark=false ใช้ธีมสว่าง ขอบ 1px general/primary มุม 8 เท่ากับที่ธีม
     หน้า Docs ยืมจากมุมปุ่ม md
     พื้นแยกสองโทน (หัวหน้าสั่ง 2026-10-20) กล่องโค้ดของ section แรกสุด (.docs-hero) ใช้
     general/primary ส่วนกล่องโค้ดในแต่ละหัวข้อ (.docs-story-block) ยังเป็น general/secondary
     เพื่อให้ต่างจากพื้นกรอบหัวข้อที่เป็น general/primary อยู่แล้ว */
  .docs-code > * {
    margin: 0;
    box-shadow: none;
    border: 1px solid var(--ntg-color-border-general-primary);
    border-radius: var(--ntg-button-radius-top-left-md);
  }
  .docs-hero .docs-code > * {
    background: var(--ntg-color-background-general-primary);
  }
  .docs-story-block .docs-code > * {
    background: var(--ntg-color-background-general-secondary);
  }
  /* Storybook ใส่ border 8px โปร่งใส !important รอบชิ้นงานใน .innerZoomElementWrapper (layout padded)
     ทำให้ชิ้นงานมีขอบล่องหน 8px ทุกด้าน หัวหน้าสั่งเอาออก 2026-10-20 ต้องใช้ !important ตอบ */
  div.sbdocs.sbdocs-preview .innerZoomElementWrapper > * { border: 0 !important; }
  /* Storybook ใส่ paddingBottom 4 กับ borderBottom 1px ให้ h2 ทุกตัวโดยปริยาย (global h2 style
     ใน blocks.js) หัวหน้าสั่ง 2026-10-20 ให้ padding เป็น none ทุกด้านและถอดเส้นใต้หัวออก */
  .docs-section-heading {
    margin: 0;
    padding: var(--ntg-size-space-none);
    border-bottom: 0;
    font-family: var(--ntg-typography-font-family-section-heading-xl);
    font-size: var(--ntg-typography-font-size-section-heading-xl);
    line-height: var(--ntg-typography-line-height-section-heading-xl);
    font-weight: var(--ntg-typography-font-weight-section-heading-xl);
    letter-spacing: var(--ntg-typography-letter-space-section-heading-xl);
    color: var(--ntg-color-text-general-heading);
  }
  .docs-section-note {
    margin: 0;
    font-family: var(--ntg-typography-font-family-body-xl);
    font-size: var(--ntg-typography-font-size-body-xl);
    line-height: var(--ntg-typography-line-height-body-xl);
    font-weight: var(--ntg-typography-font-weight-body-xl);
    letter-spacing: var(--ntg-typography-letter-space-body-xl);
    color: var(--ntg-color-text-general-text);
  }
`

// จัดกลุ่ม story ตาม parameters.docs.section แล้วเรียงตามลำดับหัวข้อ
// story ตัวแรกที่ติดป้าย autodocs คือตัวที่อยู่ใน Canvas ด้านบนแล้ว (กติกาเดียวกับ usePrimaryStory ของ Storybook) จึงตัดออก
// หัวข้อย่อยที่ความหมายเดียวกับหัวข้อหลักไม่ต้องขึ้นซ้ำ (ผู้ใช้สั่ง 2026-11-02) เช่น ควรไม่ควร กับ ควรและไม่ควร
// หรือ ส่วนประกอบ กับ ส่วนประกอบทั้งหมด ถ้าในหัวข้อมีหลาย story ต้องคงชื่อไว้แยกกัน
const repeatsSection = (section: string, name: string, count: number) =>
  count === 1 && (section === 'ควรไม่ควร' || name.startsWith(section))

const GroupedStories = () => {
  const { componentStories } = useContext(DocsContext)
  const { preparedMeta } = useOf('meta', ['meta'])
  const notes = (preparedMeta.parameters.docs?.sectionNotes ?? {}) as SectionNotes

  const stories = componentStories().filter((s) => s.tags?.includes('autodocs')).slice(1)
  const groups = new Map<string, StoryEntry[]>()
  for (const story of stories) {
    const section = (story.parameters.docs?.section as string | undefined) ?? EXTRA_SECTION
    groups.set(section, [...(groups.get(section) ?? []), story])
  }

  return (
    <>
      {[...SECTIONS, EXTRA_SECTION].map((section) => {
        const list = groups.get(section) ?? []
        const note = section === EXTRA_SECTION ? undefined : notes[section]
        if (!list.length && !note) return null
        return (
          <section key={section} className="docs-section">
            <h2 className="docs-section-heading">{section}</h2>
            {note && <p className="docs-section-note">{note}</p>}
            {list.map((story) => (
              <div key={story.id} id={anchorBlockIdFromId(story.id)} className="docs-story-block">
                <div className="docs-story-header">
                  {!repeatsSection(section, story.name, list.length) && <h3 className="docs-story-title">{story.name}</h3>}
                  <Description of={story.moduleExport} />
                </div>
                <Canvas of={story.moduleExport} sourceState="none" />
                {/* story ที่ไม่ได้เกี่ยวกับการพรีวิวการใช้งาน component จริง (เช่น ควรไม่ควร ที่
                    ประกอบจากหลายตัวอย่างย่อยในบล็อกเดียว) ไม่ต้องมีกล่องโค้ด ตั้งค่าที่
                    parameters.docs.hideCode ของ story นั้น (หัวหน้าสั่ง 2026-10-20) */}
                {!story.parameters.docs?.hideCode && (
                  <div className="docs-code">
                    <Source of={story.moduleExport} dark={false} />
                  </div>
                )}
              </div>
            ))}
          </section>
        )
      })}
    </>
  )
}

export const CustomDocsPage = () => (
  <>
    <style>{LAYOUT_CSS}</style>
    <div className="docs-hero">
      <Title />
      <Subtitle />
      <Description />
      <Canvas sourceState="none" />
      <div className="docs-code">
        <Source dark={false} />
      </div>
    </div>
    <GroupedStories />
    <section className="docs-section">
      <h2 className="docs-section-heading">Props</h2>
      <ArgTypes />
    </section>
  </>
)

export default CustomDocsPage
