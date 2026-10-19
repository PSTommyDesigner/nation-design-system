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
  core: {
    disableTelemetry: true,
  },
}
export default config
