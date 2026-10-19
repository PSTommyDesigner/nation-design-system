import type { StorybookConfig } from '@storybook/react-vite'

// ตั้งค่า Storybook ของ Nation Design System
// ของเดิมสร้างด้วย `npx storybook init` แล้วตัดส่วนที่เกินขอบเขตที่ตกลงกันออก
// (Chromatic, Vitest/Playwright testing addon, addon-a11y, addon-mcp)
// รอบนี้ทำแค่ core + docs เท่านั้น ส่วน a11y/interaction addon ไว้ทำแยกทีหลัง
const config: StorybookConfig = {
  stories: ['../components/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  // ⚠️ ต้องตั้งเป็น react-docgen-typescript ตรง ๆ ของเดิม (react-docgen ค่าเริ่มต้น)
  //    อ่านชนิดข้อมูลของ prop ที่ได้มาจาก extends/Omit ไม่ถูก ทำให้ boolean ธรรมดาอย่าง
  //    `disabled` กลายเป็นช่องแก้ JSON ดิบแทนที่จะเป็น checkbox (เจอ 2026-10-19)
  //    ตัวนี้ใช้ TypeScript compiler จริงอ่าน จึงรู้จักชนิดข้อมูลที่สืบทอดมาได้ถูกต้อง
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  core: {
    disableTelemetry: true,
  },
}
export default config
