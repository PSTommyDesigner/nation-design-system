import type { Preview } from '@storybook/react-vite'

// โหลด design token เป็น CSS variable ส่วนกลาง ทุก component ต้องใช้ตัวแปรชุดนี้
// ไม่ hard-code สี ระยะ หรือมุมโค้งเอง ตามกฎของโปรเจกต์
import '../tokens/output/css/variables.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
