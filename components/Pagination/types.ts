/**
 * ชนิดข้อมูล สูตรเลือกเลขหน้า และตัวช่วยของแถบแบ่งหน้า Nation Design System
 *
 * ตรงกับไฟล์ออกแบบหน้า 24 Pagination สเปคขนาดทั้งหมดอยู่ที่ tokens/scale/pagination.mjs
 *
 * ⚠️ ไฟล์นี้ไม่มีค่าขนาดและไม่มีสี
 *    ขนาดทุกค่ามาจากสูตรใน tokens/scale/pagination.mjs แล้วออกมาเป็น CSS variable
 *    ตัวเลขที่อยู่ในไฟล์นี้มีชนิดเดียว คือลำดับของหน้าและค่าคงที่ของสูตรเลือกเลขหน้า
 *    ซึ่งเป็นเลขดัชนี ไม่ใช่ระยะหรือสีของระบบออกแบบ จึงไม่มี token และไม่ควรมี
 */

/** ขนาด 5 ขั้นของระบบ ตรงกับแกน size ของชุด pagination ในไฟล์ออกแบบ */
export type PaginationSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * ของหนึ่งชิ้นในแถว มีสองชนิดเท่านั้น
 * `page` คือปุ่มเลขหน้าที่กดได้ `ellipsis` คือจุดไข่ปลาที่กดไม่ได้และโปรแกรมอ่านหน้าจอไม่เห็น
 */
export type PaginationItem =
  | { kind: 'page'; page: number }
  | { kind: 'ellipsis'; side: 'start' | 'end' };

/** จำนวนหน้าข้างหน้าปัจจุบันต่อข้าง ค่าเริ่มต้นของระบบ */
export const DEFAULT_SIBLING_COUNT = 1;

/** จำนวนหน้าที่ตรึงไว้ที่หัวและท้ายแถว ค่าเริ่มต้นของระบบ */
export const DEFAULT_BOUNDARY_COUNT = 1;

/** ชื่อของปุ่มก่อนหน้าและถัดไป ค่าเริ่มต้นเป็นภาษาอังกฤษตามไฟล์ออกแบบ */
export const DEFAULT_PREVIOUS_LABEL = 'Previous';
export const DEFAULT_NEXT_LABEL = 'Next';

/** เตือนที่คอนโซลเฉพาะตอนพัฒนา ตัดทิ้งตอน build จริงด้วย dead code elimination */
export function warn(message: string): void {
  if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'production') return;
  // eslint-disable-next-line no-console
  console.warn(`[Pagination] ${message}`);
}

/** รวมชื่อคลาสโดยทิ้งค่าว่าง วิธีเดียวกับ component อื่นในไลบรารีนี้ */
export function joinClassNames(...parts: Array<string | false | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

/** ลำดับจาก start ถึง end แบบรวมปลายทั้งสองข้าง ช่วงที่กลับหัวคืนอาเรย์ว่าง */
function range(start: number, end: number): number[] {
  const length = Math.max(end - start + 1, 0);
  return Array.from({ length }, (_, index) => start + index);
}

/** ปัดเป็นจำนวนเต็มแล้วตัดไม่ให้ต่ำกว่าพื้น ใช้กับ siblingCount และ boundaryCount */
function readCount(value: number | undefined, fallback: number, floor: number, name: string): number {
  if (value === undefined) return fallback;
  if (!Number.isFinite(value)) {
    warn(`${name} ต้องเป็นตัวเลข ได้รับ ${String(value)} จึงถอยไปใช้ ${fallback}`);
    return fallback;
  }
  const rounded = Math.round(value);
  if (rounded < floor) {
    warn(`${name} ต่ำกว่า ${floor} ไม่ได้ ได้รับ ${rounded} จึงถอยไปใช้ ${floor}`);
    return floor;
  }
  return rounded;
}

/** ค่าที่สูตรเลือกเลขหน้าต้องรู้ ทุกค่าเป็นจำนวนเต็มที่ผ่านการตรวจแล้ว */
export interface PageListInput {
  /** หน้าปัจจุบัน นับจาก 1 */
  currentPage: number;
  /** จำนวนหน้าทั้งหมด ต้องไม่ต่ำกว่า 1 */
  totalPages: number;
  /** จำนวนหน้าข้างหน้าปัจจุบันต่อข้าง */
  siblingCount: number;
  /** จำนวนหน้าที่ตรึงไว้ที่หัวและท้ายแถว */
  boundaryCount: number;
}

/**
 * สูตรเลือกเลขหน้า เป็นฟังก์ชันบริสุทธิ์ ทดสอบได้โดยไม่ต้องมี DOM
 *
 * วิธีคิดเหมือน MUI usePagination และ Mantine use-pagination คือ
 *   1 ตรึงหน้าหัวแถวไว้ `boundaryCount` หน้า และหน้าท้ายแถวอีก `boundaryCount` หน้า
 *   2 กลางแถวแสดงหน้าปัจจุบัน บวกเพื่อนบ้านข้างละ `siblingCount` หน้า
 *   3 ช่วงกลางเลื่อนชนขอบได้ แต่ไม่ล้นออกนอกช่วงที่หัวและท้ายจองไว้
 *   4 ช่องว่างที่เหลือระหว่างกลุ่มแทนด้วยจุดไข่ปลา
 * จำนวนปุ่มที่ได้จึงคงที่ ไม่กระตุกเวลาผู้ใช้เดินหน้าไปทีละหน้า
 *
 * ⚠️ ข้อ 4 มีขั้นพิเศษของ Zag อยู่ด้วย ถ้าช่องว่างกว้างเท่าหน้าเดียว ให้แสดงเลขหน้านั้นแทนจุดไข่ปลา
 *    เพราะจุดไข่ปลาจองที่เท่าปุ่มเลขหนึ่งปุ่มอยู่แล้ว การเอาจุดสามจุดไปทับเลขหนึ่งตัว
 *    คือการแลกของที่กดได้กับของที่กดไม่ได้ในพื้นที่เท่ากัน ซึ่งไม่ได้อะไรกลับมา
 *    MUI กับ Mantine ไม่ได้แยกขั้นนี้ออกมา ขั้นนี้มาจาก Zag ซึ่งเป็นเจ้าเดียวที่ทำ
 *    ที่นี่จึงไล่ช่องว่างทีละช่องแล้วตัดสินตรงนั้น ไม่ใช่เขียนเงื่อนไขซ้อนไว้ในสูตรช่วงกลาง
 *    จำนวนปุ่มไม่เปลี่ยนเพราะที่หนึ่งช่องยังเป็นหนึ่งชิ้นเท่าเดิม แค่เปลี่ยนชนิดของชิ้นนั้น
 *
 * ⚠️ ฟังก์ชันนี้ไม่ตรวจค่าที่ส่งเข้ามา ใช้ `readPagination` เป็นด่านตรวจ
 *    แยกกันเพื่อให้สูตรยังเป็นฟังก์ชันบริสุทธิ์ที่เทียบผลได้ตรง ๆ
 */
export function buildPageItems({
  currentPage,
  totalPages,
  siblingCount,
  boundaryCount,
}: PageListInput): PaginationItem[] {
  /*
   * ที่ทั้งหมดที่แถวนี้มี คือ หัวแถว บวก ท้ายแถว บวก หน้าปัจจุบัน
   * บวก เพื่อนบ้านสองข้าง บวก ที่ของจุดไข่ปลาสองช่อง
   * ถ้าจำนวนหน้าทั้งหมดไม่เกินจำนวนนี้ ก็แสดงทุกหน้าไปเลย ไม่ต้องมีจุดไข่ปลา
   *
   * ⚠️ ด่านนี้ขาดไม่ได้ ถ้าไม่มี ช่วงกลางจะยุบเป็นว่างเมื่อจำนวนหน้าน้อยกว่าที่ที่ตั้งไว้
   *    แล้วหน้าปัจจุบันจะหายไปจากแถว เช่น 4 หน้า เพื่อนบ้าน 1 ขอบ 1 จะได้ 1 จุดไข่ปลา 4
   *    ซึ่งทั้งที่มีที่พอแสดงครบทั้งสี่หน้า (เทียบกับ Zag แล้วตรงกันทุกกรณีที่ 1 ถึง 60 หน้า)
   */
  const slots = boundaryCount * 2 + siblingCount * 2 + 3;
  if (totalPages <= slots) {
    return range(1, totalPages).map((value) => ({ kind: 'page', page: value }));
  }

  const startPages = range(1, Math.min(boundaryCount, totalPages));
  const endPages = range(Math.max(totalPages - boundaryCount + 1, boundaryCount + 1), totalPages);

  // หน้าแรกของช่วงกลาง เลื่อนเข้าหาท้ายแถวไม่ได้เกินที่ท้ายแถวจองไว้
  const siblingsStart = Math.max(
    Math.min(currentPage - siblingCount, totalPages - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2,
  );

  // หน้าสุดท้ายของช่วงกลาง เลื่อนเข้าหาหัวแถวไม่ได้เกินที่หัวแถวจองไว้
  const siblingsEnd = Math.min(
    Math.max(currentPage + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endPages.length > 0 ? endPages[0]! - 2 : totalPages - 1,
  );

  const middlePages = range(siblingsStart, siblingsEnd);

  // รวมสามกลุ่มเป็นรายการเดียว เรียงจากน้อยไปมากและไม่มีตัวซ้ำ
  const shown = Array.from(new Set([...startPages, ...middlePages, ...endPages])).sort(
    (a, b) => a - b,
  );

  const items: PaginationItem[] = [];
  shown.forEach((value, index) => {
    if (index > 0) {
      const previous = shown[index - 1]!;
      const hidden = value - previous - 1;
      if (hidden === 1) {
        // ขั้นพิเศษของ Zag ช่องว่างกว้างเท่าหน้าเดียว จึงแสดงเลขหน้านั้นแทนจุดไข่ปลา
        items.push({ kind: 'page', page: previous + 1 });
      } else if (hidden > 1) {
        // ช่องว่างฝั่งหัวแถวกับฝั่งท้ายแถวแยกกันด้วยขอบซ้ายของช่วงกลาง มีได้ฝั่งละช่องเดียว
        const side = middlePages.length > 0 && value <= middlePages[0]! ? 'start' : 'end';
        items.push({ kind: 'ellipsis', side });
      }
    }
    items.push({ kind: 'page', page: value });
  });

  return items;
}

/** ผลการอ่านค่าที่ผ่านการตรวจแล้ว พร้อมส่งให้ชั้นที่วาดจริง */
export interface PaginationReading {
  /** แถบนี้ควรแสดงหรือไม่ เป็นเท็จเมื่อจำนวนหน้าทั้งหมดใช้ไม่ได้ */
  usable: boolean;
  /** หน้าปัจจุบันหลังปัดเศษและตัดให้อยู่ในช่วง 1 ถึง totalPages */
  currentPage: number;
  /** จำนวนหน้าทั้งหมดหลังตรวจ */
  totalPages: number;
  /** ของที่ต้องวาดเรียงจากซ้ายไปขวา */
  items: PaginationItem[];
  /** มีหน้าก่อนหน้าให้ไปไหม ถ้าไม่มีปุ่มก่อนหน้าต้องปิดใช้งาน ไม่ใช่ซ่อน */
  hasPrevious: boolean;
  /** มีหน้าถัดไปให้ไปไหม ถ้าไม่มีปุ่มถัดไปต้องปิดใช้งาน ไม่ใช่ซ่อน */
  hasNext: boolean;
}

/**
 * ด่านตรวจค่าที่ส่งเข้ามา แล้วคืนของที่พร้อมวาด
 *
 * ⚠️ ค่าที่ใช้ไม่ได้จะถูกตัดเข้าช่วงพร้อมเตือนตอนพัฒนา ไม่ throw
 *    เพราะจำนวนหน้าทั้งหมดมักมาจากการหารยอดรวมที่เพิ่งโหลดมา ซึ่งเป็นศูนย์ได้จริง
 *    ในจังหวะแรกของหน้า การ throw จะทำให้ทั้งหน้าดับเพราะกรณีปกติ
 */
export function readPagination(input: {
  currentPage: number;
  totalPages: number;
  siblingCount?: number;
  boundaryCount?: number;
}): PaginationReading {
  const siblingCount = readCount(input.siblingCount, DEFAULT_SIBLING_COUNT, 0, 'siblingCount');
  const boundaryCount = readCount(input.boundaryCount, DEFAULT_BOUNDARY_COUNT, 1, 'boundaryCount');

  const totalPages = Number.isFinite(input.totalPages) ? Math.floor(input.totalPages) : 0;
  if (totalPages < 1) {
    warn(`totalPages ต้องไม่ต่ำกว่า 1 ได้รับ ${String(input.totalPages)} จึงไม่วาดแถบแบ่งหน้า`);
    return {
      usable: false,
      currentPage: 1,
      totalPages: 0,
      items: [],
      hasPrevious: false,
      hasNext: false,
    };
  }

  let currentPage = Number.isFinite(input.currentPage) ? Math.round(input.currentPage) : 1;
  if (currentPage < 1 || currentPage > totalPages) {
    const clamped = Math.min(Math.max(currentPage, 1), totalPages);
    warn(`currentPage ต้องอยู่ในช่วง 1 ถึง ${totalPages} ได้รับ ${currentPage} จึงใช้ ${clamped}`);
    currentPage = clamped;
  }

  return {
    usable: true,
    currentPage,
    totalPages,
    items: buildPageItems({ currentPage, totalPages, siblingCount, boundaryCount }),
    hasPrevious: currentPage > 1,
    hasNext: currentPage < totalPages,
  };
}

/** ข้อมูลที่ข้อความบอกตำแหน่งต้องรู้ สามค่าท้ายใส่เมื่อรู้ยอดรวมของรายการ */
export interface PageStatusInput {
  /** หน้าปัจจุบัน */
  currentPage: number;
  /** จำนวนหน้าทั้งหมด */
  totalPages: number;
  /** ลำดับรายการแรกที่แสดงบนหน้านี้ */
  firstItem?: number;
  /** ลำดับรายการสุดท้ายที่แสดงบนหน้านี้ */
  lastItem?: number;
  /** จำนวนรายการทั้งหมดทุกหน้ารวมกัน */
  totalItems?: number;
}

/** คั่นหลักพันด้วยลูกน้ำ หมวดข่าวของเราทะลุ 2,278 หน้าได้จริง เลขจึงต้องอ่านออก */
function formatCount(value: number): string {
  return value.toLocaleString('th-TH');
}

/**
 * ข้อความบอกตำแหน่งสำหรับพื้นที่ประกาศแบบ polite
 *
 * ⚠️ component ไม่ได้วาดพื้นที่ประกาศให้ และจะไม่วาด
 *    พื้นที่ประกาศต้องอยู่ติด DOM ตลอดเวลาตั้งแต่หน้าถูกสร้าง ไม่ใช่เพิ่งใส่เข้าไปตอนต้องการ
 *    เพราะอิลิเมนต์ที่เพิ่งเข้า DOM มักไม่ถูกประกาศ และที่ของมันอยู่ข้างผลลัพธ์ ไม่ใช่ข้างตัวแบ่งหน้า
 *    หน้าที่ของ component นี้คือผลิตข้อความให้ ส่วนที่วางต้องเป็นของฝั่งผู้ใช้ ดู README หัวข้อการเข้าถึง
 */
export function pageStatusText({
  currentPage,
  totalPages,
  firstItem,
  lastItem,
  totalItems,
}: PageStatusInput): string {
  const head = `หน้า ${formatCount(currentPage)} จาก ${formatCount(totalPages)}`;
  if (firstItem === undefined || lastItem === undefined || totalItems === undefined) return head;
  return `${head} แสดง ${formatCount(firstItem)} ถึง ${formatCount(lastItem)} จาก ${formatCount(totalItems)} รายการ`;
}

/**
 * ย้ายโฟกัสไปหัวข้อของผลลัพธ์ เรียกหลังข้อมูลหน้าใหม่ขึ้นจอแล้ว
 *
 * ⚠️ งานนี้เป็นของฝั่งผู้ใช้ component ไม่ใช่ของ component
 *    component ไม่รู้ว่าผลลัพธ์อยู่อิลิเมนต์ไหน และไม่รู้ว่าข้อมูลใหม่มาถึงเมื่อไหร่
 *    ถ้าไม่ย้ายโฟกัส ผู้ใช้แป้นพิมพ์จะค้างอยู่ที่ปุ่มเดิมและไม่รู้ว่ามีอะไรเปลี่ยน
 *    ใช้คู่กับ `pageStatusText` เสมอ อย่างใดอย่างหนึ่งเดี่ยว ๆ ยังไม่ครบ
 *
 * @returns จริงเมื่อย้ายโฟกัสสำเร็จ
 */
export function focusResultsHeading(target: HTMLElement | null | undefined): boolean {
  if (!target) {
    warn('focusResultsHeading ไม่ได้รับอิลิเมนต์ โฟกัสจึงค้างอยู่ที่ปุ่มเดิม');
    return false;
  }
  // หัวข้อปกติรับโฟกัสไม่ได้ ต้องเปิดทางให้ก่อน แต่ไม่ใส่เข้าลำดับ tab
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
  target.focus();
  return true;
}
