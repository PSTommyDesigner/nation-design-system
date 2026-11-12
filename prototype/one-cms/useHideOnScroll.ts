// แถบหัว CMS เลื่อนลงแล้วสไลด์ปิด เลื่อนขึ้นแล้วสไลด์เปิด (ผู้ใช้สั่ง 2026-11-12)
// ใช้ได้ทุกหน้าที่มีแถบหัว CMS คืนค่า true เมื่อควรซ่อน
import { useEffect, useRef, useState, type RefObject } from 'react'

export function useHideOnScroll(headerRef: RefObject<HTMLElement | null>) {
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)
  useEffect(() => {
    lastY.current = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      const headerHeight = headerRef.current?.offsetHeight ?? 0
      // ยังไม่พ้นความสูงของแถบหัว ให้แสดงเสมอ ไม่งั้นด้านบนของหน้าจะโหว่
      if (y <= headerHeight) setHidden(false)
      else if (y > lastY.current) setHidden(true)
      else if (y < lastY.current) setHidden(false)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [headerRef])
  return hidden
}
