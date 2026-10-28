/**
 * Table Nation Design System
 *
 * ตารางข้อมูลของโปรดักต์ ตรงกับชุดที่ลงท้ายด้วย table-cell ใน Figma หน้า 26 Table (15 ชนิด)
 * รับข้อมูลเป็น array แล้วกำหนดคอลัมน์ด้วย config ผู้ใช้ไม่ต้องเขียนแถวเอง
 * แต่เปิดช่อง `render` ไว้ให้วาดเนื้อในเซลเองได้เมื่อเซลนั้นเป็นของผสม
 *
 * ⚠️ ต้องเป็น table thead tbody th td จริงเท่านั้น ห้ามใช้ div สวมรอยเป็นตาราง
 *    เพราะโปรแกรมอ่านหน้าจออาศัยโครงนี้บอกผู้ใช้ว่ากำลังอยู่คอลัมน์ไหนแถวไหน
 *
 * ⚠️ ความสูงแถวไม่มี token โดยตั้งใจ (tokens/scale/table.mjs)
 *    เซลทุกชนิดสูงตามเนื้อหาข้างใน ตั้งแต่ 40 ถึง 70 พิกเซล ห้ามตั้งความสูงตายตัว
 *
 * ⚠️ ช่องติ๊กเลือกแถวใช้ Checkbox ของระบบ ห้ามเขียนช่องติ๊กเอง
 *    ขนาด sm ตรงกับ select-table-cell ที่ผูก checkbox/size/sm ไว้ในไฟล์ออกแบบ
 *
 * ค่าทั้งหมดมาจาก design tokens ผ่าน CSS variables ไม่มีค่า hard-code
 */
import React, { useId, useMemo, useState } from 'react';
import { Checkbox } from '../Checkbox';
import { Icon } from '../Icon';
import styles from './Table.module.css';

/** ชนิดของเซล ตรงกับชุดที่ลงท้ายด้วย table-cell ในหน้า 26 Table */
export type TableCellVariant =
  | 'text'
  | 'number'
  | 'currency'
  | 'index'
  | 'date'
  | 'link'
  | 'icon'
  | 'action'
  | 'custom';

export type TableAlign = 'start' | 'center' | 'end';

export type TableSortDirection = 'asc' | 'desc';

export interface TableSort {
  /** `id` ของคอลัมน์ที่กำลังเรียง */
  columnId: string;
  direction: TableSortDirection;
}

export interface TableColumn<T> {
  /** ชื่อเรียกคอลัมน์ ใช้อ้างตอนเรียงลำดับ และใช้เป็น key ของ React */
  id: string;
  /** ข้อความหัวคอลัมน์ ตรงกับ header-table-cell */
  header: React.ReactNode;
  /** ดึงค่าหลักออกจากข้อมูลหนึ่งแถว ตรงกับบรรทัดแรกของ text-table-cell */
  accessor?: (row: T, rowIndex: number) => React.ReactNode;
  /** บรรทัดรองใต้ค่าหลัก ตรงกับช่องข้อความที่สองของ text-table-cell ไม่ใช้ก็เว้นว่างได้ */
  supporting?: (row: T, rowIndex: number) => React.ReactNode;
  /**
   * วาดเนื้อในเซลเอง ใช้กับเซลที่ประกอบจากชิ้นอื่น
   * เช่น badge tag user avatar-group progress-bar star ซึ่งเป็น component คนละตัว
   * ถ้าใส่ `render` แล้ว `accessor` กับ `supporting` จะไม่ถูกเรียก
   */
  render?: (row: T, rowIndex: number) => React.ReactNode;
  /** ชนิดของเซล มีผลกับชุดตัวอักษรและสี ค่าตั้งต้นคือ text */
  variant?: TableCellVariant;
  /**
   * การจัดชิด ค่าตั้งต้นตามกฎของตาราง (ผู้ใช้ตัดสิน 2026-10-28)
   * currency (เงิน) ชิดขวา index (ลำดับแถว) จัดกลาง ชนิดอื่นทั้งหมดชิดซ้าย รวมทั้ง number ที่เป็นตัวเลขทั่วไป
   */
  align?: TableAlign;
  /**
   * จัดลูกในเซลให้เรียงเป็นแถวเดียว เว้นช่องไฟเท่าระยะภายในเซลของตาราง
   * ชนิด icon กับ action เปิดให้เองอยู่แล้ว ใส่ flag นี้เมื่อเซลแบบ custom มีลูกหลายชิ้น
   * เช่น ดาวให้คะแนน กลุ่มรูปโปรไฟล์ หรือข้อความคู่กับป้าย
   */
  inline?: boolean;
  /** ความกว้างคอลัมน์ ส่งเป็นหน่วยของ CSS เช่น '180px' หรือ '20%' ไม่ใส่คือยืดเอง */
  width?: string;
  /** เปิดปุ่มเรียงลำดับที่หัวคอลัมน์ */
  sortable?: boolean;
  /**
   * ให้เซลนี้เป็นหัวของแถว จะใช้ th scope="row" แทน td
   * ควรมีคอลัมน์เดียวต่อตาราง และเป็นคอลัมน์ที่ระบุตัวแถวได้ เช่น ชื่อคน
   */
  rowHeader?: boolean;
}

export interface TableProps<T>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onSelect'> {
  columns: ReadonlyArray<TableColumn<T>>;
  data: ReadonlyArray<T>;
  /** คืนค่าที่ไม่ซ้ำกันของแต่ละแถว ใช้เป็น key และใช้อ้างแถวที่ถูกเลือก */
  getRowId: (row: T, rowIndex: number) => string;
  /** คำบรรยายตาราง ออกเป็น caption ที่โปรแกรมอ่านหน้าจออ่านก่อนเข้าตาราง */
  caption?: React.ReactNode;
  /** ซ่อน caption จากสายตา แต่ยังให้โปรแกรมอ่านหน้าจออ่านได้ */
  captionHidden?: boolean;
  /** แถวสลับสีช่วยไล่สายตา */
  zebra?: boolean;
  /** ตรึงหัวตารางไว้ด้านบนตอนเลื่อนแนวตั้ง */
  stickyHeader?: boolean;
  /** เปิดคอลัมน์ช่องติ๊กเลือกแถว */
  selectable?: boolean;
  /** รายการแถวที่ถูกเลือก แบบคุมเอง */
  selectedIds?: ReadonlyArray<string>;
  /** รายการแถวที่ถูกเลือกตอนเริ่ม แบบปล่อยให้ component คุม */
  defaultSelectedIds?: ReadonlyArray<string>;
  onSelectionChange?: (ids: string[]) => void;
  /** ข้อความกำกับช่องติ๊กหัวตาราง ที่เลือกทั้งหน้าในครั้งเดียว */
  selectAllLabel?: string;
  /** ข้อความกำกับช่องติ๊กของแต่ละแถว ควรบอกว่าแถวไหน ไม่ใช่คำว่าเลือกลอย ๆ */
  getRowSelectLabel?: (row: T, rowIndex: number) => string;
  /** แถวที่ปิดใช้งาน เลือกไม่ได้และแสดงด้วยสีจาง */
  isRowDisabled?: (row: T, rowIndex: number) => boolean;
  /** คอลัมน์ที่กำลังเรียงอยู่ แบบคุมเอง ส่ง null คือยังไม่เรียง */
  sort?: TableSort | null;
  /** เรียกเมื่อกดหัวคอลัมน์ วนเป็น ไม่เรียง ขึ้น ลง แล้วกลับมาไม่เรียง */
  onSortChange?: (next: TableSort | null) => void;
  /** ข้อความตอนไม่มีข้อมูล */
  emptyMessage?: React.ReactNode;
  /** ชื่อของพื้นที่ที่เลื่อนแนวนอนได้ ใส่เมื่อไม่ได้ใส่ caption */
  scrollRegionLabel?: string;
}

const VARIANT_CLASS: Record<TableCellVariant, string | undefined> = {
  text: styles.text,
  number: styles.number,
  currency: styles.number,
  index: styles.number,
  date: styles.date,
  link: styles.link,
  icon: styles.icon,
  action: styles.action,
  custom: undefined,
};

const ALIGN_CLASS: Record<TableAlign, string> = {
  start: styles.alignStart,
  center: styles.alignCenter,
  end: styles.alignEnd,
};

const ARIA_SORT: Record<TableSortDirection, 'ascending' | 'descending'> = {
  asc: 'ascending',
  desc: 'descending',
};

/** ไอคอนบอกสถานะการเรียง ตรงกับ navigation-&-arrows ที่ header-table-cell ใช้ */
const SORT_ICON = {
  none: 'unfold-more',
  asc: 'arrow-up',
  desc: 'arrow-down',
} as const;

function defaultAlign(variant: TableCellVariant): TableAlign {
  if (variant === 'currency') return 'end';
  if (variant === 'index') return 'center';
  return 'start';
}

/** วนสถานะการเรียง ไม่เรียง ขึ้น ลง แล้วกลับมาไม่เรียง ตามที่เอกสารหน้า 26 หัวข้อ States กำหนด */
function nextSort(current: TableSort | null | undefined, columnId: string): TableSort | null {
  if (!current || current.columnId !== columnId) return { columnId, direction: 'asc' };
  if (current.direction === 'asc') return { columnId, direction: 'desc' };
  return null;
}

/**
 * @example
 * <Table
 *   caption="สมาชิกในทีม"
 *   data={members}
 *   getRowId={(m) => m.id}
 *   selectable
 *   columns={[
 *     { id: 'name', header: 'ชื่อ', rowHeader: true, sortable: true,
 *       accessor: (m) => m.name, supporting: (m) => m.position },
 *     { id: 'role', header: 'ตำแหน่ง', accessor: (m) => m.role },
 *     { id: 'status', header: 'สถานะ', variant: 'custom', render: (m) => <Badge>{m.status}</Badge> },
 *     { id: 'joined', header: 'วันที่เข้า', variant: 'date', accessor: (m) => m.joined },
 *   ]}
 * />
 */
export function Table<T>({
  columns,
  data,
  getRowId,
  caption,
  captionHidden = false,
  zebra = false,
  stickyHeader = false,
  selectable = false,
  selectedIds,
  defaultSelectedIds,
  onSelectionChange,
  selectAllLabel = 'เลือกทุกแถว',
  getRowSelectLabel,
  isRowDisabled,
  sort,
  onSortChange,
  emptyMessage = 'ไม่มีข้อมูล',
  scrollRegionLabel,
  className,
  ...rest
}: TableProps<T>) {
  const autoId = useId();
  const captionId = `${autoId}-caption`;

  // เลือกแถวได้ทั้งแบบคุมเองและแบบปล่อยให้ component คุม
  const [innerSelected, setInnerSelected] = useState<string[]>(() => [...(defaultSelectedIds ?? [])]);
  const selected = useMemo(
    () => new Set(selectedIds ?? innerSelected),
    [selectedIds, innerSelected],
  );

  const commitSelection = (ids: string[]) => {
    if (selectedIds === undefined) setInnerSelected(ids);
    onSelectionChange?.(ids);
  };

  // แถวที่ปิดใช้งานเลือกไม่ได้ จึงไม่นับรวมตอนตัดสินว่าเลือกครบหรือยัง
  const selectableIds = useMemo(() => {
    if (!selectable) return [];
    return data
      .map((row, index) => (isRowDisabled?.(row, index) ? null : getRowId(row, index)))
      .filter((id): id is string => id !== null);
  }, [selectable, data, isRowDisabled, getRowId]);

  const allSelected = selectableIds.length > 0 && selectableIds.every((id) => selected.has(id));
  const someSelected = !allSelected && selectableIds.some((id) => selected.has(id));

  const toggleAll = () => {
    if (allSelected) {
      commitSelection([...selected].filter((id) => !selectableIds.includes(id)));
      return;
    }
    const merged = new Set(selected);
    for (const id of selectableIds) merged.add(id);
    commitSelection([...merged]);
  };

  const toggleRow = (rowId: string) => {
    const merged = new Set(selected);
    if (merged.has(rowId)) merged.delete(rowId);
    else merged.add(rowId);
    commitSelection([...merged]);
  };

  const hasWidths = columns.some((column) => column.width !== undefined);
  const totalColumns = columns.length + (selectable ? 1 : 0);

  // พื้นที่ที่เลื่อนได้ต้องมีชื่อกำกับถึงจะประกาศเป็น region ได้ ไม่มีชื่อก็ให้โฟกัสได้อย่างเดียว
  const regionLabel = scrollRegionLabel;
  const regionProps = regionLabel
    ? { role: 'region' as const, 'aria-label': regionLabel }
    : caption
      ? { role: 'region' as const, 'aria-labelledby': captionId }
      : {};

  const renderCellBody = (column: TableColumn<T>, row: T, rowIndex: number) => {
    if (column.render) return column.render(row, rowIndex);
    const value = column.accessor?.(row, rowIndex);
    const supporting = column.supporting?.(row, rowIndex);
    if (supporting === undefined || supporting === null || supporting === '') return value;
    return (
      <>
        {value}
        <span className={styles.supporting}>{supporting}</span>
      </>
    );
  };

  return (
    <div
      className={[styles.scroller, className].filter(Boolean).join(' ')}
      tabIndex={0}
      {...regionProps}
      {...rest}
    >
      <table className={[styles.table, zebra ? styles.zebra : undefined].filter(Boolean).join(' ')}>
        {caption ? (
          <caption
            id={captionId}
            className={[styles.caption, captionHidden ? styles.captionHidden : undefined]
              .filter(Boolean)
              .join(' ')}
          >
            {caption}
          </caption>
        ) : null}

        {hasWidths ? (
          <colgroup>
            {selectable ? <col /> : null}
            {columns.map((column) => (
              <col key={column.id} style={column.width ? { width: column.width } : undefined} />
            ))}
          </colgroup>
        ) : null}

        <thead className={stickyHeader ? styles.stickyHead : undefined}>
          <tr>
            {selectable ? (
              <th scope="col" className={[styles.cell, styles.headCell, styles.selectCell].join(' ')}>
                {/* ช่องติ๊กหัวตาราง ตรงกับ header-select-table-cell ในไฟล์ออกแบบ */}
                <Checkbox
                  size="sm"
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={toggleAll}
                  aria-label={selectAllLabel}
                  disabled={selectableIds.length === 0}
                />
              </th>
            ) : null}

            {columns.map((column) => {
              const variant = column.variant ?? 'text';
              const align = column.align ?? defaultAlign(variant);
              const isSorted = sort?.columnId === column.id;
              const direction: TableSortDirection | null = isSorted ? sort.direction : null;

              return (
                <th
                  key={column.id}
                  scope="col"
                  className={[styles.cell, styles.headCell, ALIGN_CLASS[align]].join(' ')}
                  aria-sort={
                    column.sortable ? (direction ? ARIA_SORT[direction] : 'none') : undefined
                  }
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      className={styles.sortButton}
                      onClick={() => onSortChange?.(nextSort(sort, column.id))}
                    >
                      <span>{column.header}</span>
                      <span className={styles.sortIcon}>
                        <Icon name={SORT_ICON[direction ?? 'none']} size="sm" />
                      </span>
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody className={styles.body}>
          {data.length === 0 ? (
            <tr className={styles.row}>
              <td className={[styles.cell, styles.empty].join(' ')} colSpan={totalColumns}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => {
              const rowId = getRowId(row, rowIndex);
              const disabled = isRowDisabled?.(row, rowIndex) ?? false;
              const isSelected = selected.has(rowId);

              return (
                <tr
                  key={rowId}
                  className={styles.row}
                  data-selected={isSelected ? 'true' : undefined}
                  data-disabled={disabled ? 'true' : undefined}
                >
                  {selectable ? (
                    <td className={[styles.cell, styles.selectCell].join(' ')}>
                      {/* ช่องติ๊กของแถว ตรงกับ select-table-cell ในไฟล์ออกแบบ */}
                      <Checkbox
                        size="sm"
                        checked={isSelected}
                        disabled={disabled}
                        onChange={() => toggleRow(rowId)}
                        aria-label={getRowSelectLabel?.(row, rowIndex) ?? `เลือกแถวที่ ${rowIndex + 1}`}
                      />
                    </td>
                  ) : null}

                  {columns.map((column) => {
                    const variant = column.variant ?? 'text';
                    const align = column.align ?? defaultAlign(variant);
                    // เซลไอคอนกับเซลปุ่มสั่งงานมีลูกเรียงกันอยู่แล้วในไฟล์ออกแบบ จึงเปิด inline ให้เอง
                    const inline = column.inline ?? (variant === 'icon' || variant === 'action');
                    const cellClass = [
                      styles.cell,
                      VARIANT_CLASS[variant],
                      ALIGN_CLASS[align],
                    ]
                      .filter(Boolean)
                      .join(' ');
                    const content = renderCellBody(column, row, rowIndex);
                    // ห่อด้วย span แทนการตั้ง display: flex ที่ td เอง
                    // เพราะ td ที่เป็น flex จะเสียการจัดกลางแนวตั้งของเซลตาราง
                    const body = inline ? <span className={styles.inline}>{content}</span> : content;

                    return column.rowHeader ? (
                      <th key={column.id} scope="row" className={cellClass}>
                        {body}
                      </th>
                    ) : (
                      <td key={column.id} className={cellClass}>
                        {body}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
