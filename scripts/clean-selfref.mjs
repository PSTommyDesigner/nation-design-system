// ล้าง token ที่อ้างถึงตัวเองใน component.json
// ที่มา: collection `component` กับ `semantics` ใน Figma ใช้ชื่อซ้ำกัน 243 ชื่อ
// ตอน export เป็นไฟล์ token รูปแบบไฟล์ไม่มีที่เก็บชื่อ collection
// ตัวใน component ที่ alias ไปหา semantics จึงกลายเป็นค่าที่ชี้กลับหาตัวเอง
// ไฟล์ semantics มี token เหล่านี้ครบอยู่แล้ว การลบออกจึงไม่เปลี่ยนผลลัพธ์
// รันหลัง export จาก Token Press ทุกครั้ง ก่อน npm run tokens:build
import { readFileSync, writeFileSync } from 'node:fs'

const FILE = 'tokens/tokens.json/component.json'
const data = JSON.parse(readFileSync(FILE, 'utf8'))
const removed = []

function prune(node, path = []) {
  for (const key of Object.keys(node)) {
    if (key.startsWith('$')) continue
    const child = node[key]
    if (child && typeof child === 'object' && '$value' in child) {
      const v = child.$value
      if (typeof v === 'string' && v.startsWith('{') && v.endsWith('}')) {
        if (v.slice(1, -1).replace(/\./g, '/') === [...path, key].join('/')) {
          removed.push([...path, key].join('/'))
          delete node[key]
        }
      }
    } else if (child && typeof child === 'object') {
      prune(child, [...path, key])
      if (Object.keys(child).filter((k) => !k.startsWith('$')).length === 0) delete node[key]
    }
  }
}
prune(data)

if (removed.length) {
  writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n')
  console.log(`✅ clean-selfref: ลบ token ที่อ้างตัวเอง ${removed.length} รายการ`)
  console.log(`   ตัวอย่าง: ${removed.slice(0, 3).join(' · ')}`)
} else {
  console.log('✅ clean-selfref: ไม่พบ token ที่อ้างตัวเอง')
}
