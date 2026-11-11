// BU ที่เลือกได้จากเมนู "BU" บนแถบเครื่องมือ Storybook (ตั้งใน .storybook/preview.tsx)
// ผู้ใช้สั่ง 2026-11-11: prototype ชุดเดียวใช้พรีเซนต์หลาย BU ให้เปลี่ยนโลโก้กับชื่อแบรนด์ก่อนพรีเซนต์ได้
// โลโก้ดึงจากหน้า 08 Logo ในไฟล์ DS ทั้งแบบจัตุรัส 40 x 40 (แถบหัว CMS) และแบบเต็ม (หน้า Login ขยายเป็นสูง 80)
// ข่าวสมมุติกับสียังเป็นชุดเดียวกันทุก BU

export type Brand = { code: string; name: string; slug: string }

// เรียงตาม docs/brand-codes.md
export const BRANDS: Brand[] = [
  { code: 'bkk', name: 'กรุงเทพธุรกิจ', slug: 'bangkokbiznews' },
  { code: 'ksn', name: 'ขอบสนาม', slug: 'khobsanam' },
  { code: 'kcl', name: 'คมชัดลึก', slug: 'komchadluek' },
  { code: 'nts', name: 'เนชั่นสตอรี่', slug: 'nation-story' },
  { code: 'ntv', name: 'เนชั่น ทีวี', slug: 'nation-tv' },
  { code: 'ptd', name: 'โพสต์ทูเดย์', slug: 'post-today' },
  { code: 'spn', name: 'สปริงนิวส์', slug: 'springnews' },
  { code: 'thn', name: 'ไทยนิวส์', slug: 'thainews' },
  { code: 'tnw', name: 'ทีนิวส์', slug: 'tnews' },
  { code: 'tsk', name: 'ฐานเศรษฐกิจ', slug: 'thansettakij' },
  { code: 'tnt', name: 'เดอะเนชั่น', slug: 'the-nation' },
  { code: 'tpp', name: 'เดอะพีเพิล', slug: 'the-people' },
]

export const DEFAULT_BRAND = 'bkk'

// Vite รวบไฟล์ใน assets ให้เป็น URL ตอน build
const LOGOS = import.meta.glob('./assets/*.svg', { eager: true, query: '?url', import: 'default' }) as Record<string, string>

export function getBrand(code: unknown) {
  const brand = BRANDS.find((b) => b.code === code) ?? BRANDS[0]
  return {
    ...brand,
    logo: LOGOS[`./assets/${brand.slug}-logo.svg`],
    logoSquare: LOGOS[`./assets/${brand.slug}-logo-square.svg`],
  }
}
