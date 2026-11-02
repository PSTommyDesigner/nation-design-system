import { addons } from 'storybook/manager-api'

// หน้าที่แผงด้านขวาไม่ได้คุม component ไม่ต้องมีแผง (ผู้ใช้สั่ง 2026-11-02)
// หน้า Atoms เป็นเอกสาร ยกเว้นหน้า 02 Icon ที่เป็น component จริง ส่วนหน้า prototype เป็นหน้าจอเต็ม
// story ในรายการนี้เขียนค่าตายตัว ไม่รับค่าจากแผง ถ้าแก้ให้รับค่าได้แล้วให้เอาออกจากรายการ
const FIXED_STORIES = new Set([
  'molecules-element-11-avatar-avatar--avatar-label-story',
  'molecules-element-11-avatar-avatar--avatar-group-story',
  'molecules-element-16-radio-radio--group',
  'components-modal--without-header',
  'components-modal--confirm',
  'components-modal--toast-over-modal',
])

const hasNoComponentExample = (storyId = '') =>
  FIXED_STORIES.has(storyId) ||
  storyId.startsWith('page-prototype-') ||
  (storyId.startsWith('atoms-identity-') && !storyId.startsWith('atoms-identity-02-icon-'))

addons.setConfig({
  layoutCustomisations: {
    showPanel: (state, defaultValue) => (hasNoComponentExample(state.storyId) ? false : defaultValue),
  },
})
