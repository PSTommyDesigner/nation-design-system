// ─────────────────────────────────────────────────────────────
// Registry รวมทุก component spacing spec ให้ generate-scale วน loop
// เพิ่ม component ใหม่: สร้างไฟล์ (ดู button.mjs) แล้ว import + ใส่ใน COMPONENTS
// component ที่ build() คืน null (input/badge) จะถูกข้ามจนกว่าจะนิยามจริง
// ─────────────────────────────────────────────────────────────
import * as avatar from './avatar.mjs';
import * as button from './button.mjs';
import * as input from './input.mjs';
import * as badge from './badge.mjs';
import * as card from './card.mjs';
import * as tag from './tag.mjs';
import * as linkButton from './link-button.mjs';
import * as infoCard from './info-card.mjs';
import * as docTable from './doc-table.mjs';
import * as table from './table.mjs';
import * as toggle from './toggle.mjs';
import * as checkbox from './checkbox.mjs';
import * as radio from './radio.mjs';
import * as slider from './slider.mjs';
import * as tabs from './tabs.mjs';
import * as toast from './toast.mjs';
import * as banner from './banner.mjs';
import * as tooltip from './tooltip.mjs';
import * as progress from './progress.mjs';
import * as pagination from './pagination.mjs';
import * as dropdown from './dropdown.mjs';
import * as divider from './divider.mjs';

export const COMPONENTS = [avatar, button, input, badge, card, tag, linkButton, infoCard, docTable, table, toggle, checkbox, radio, slider, tabs, toast, banner, tooltip, progress, pagination, dropdown, divider];
