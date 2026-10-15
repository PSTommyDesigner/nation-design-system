/**
 * Dropdown Nation Design System
 *
 * ช่องที่กดแล้วเปิดแผงรายการให้เลือกค่าเดียว ตรงกับ component set ใน Figma หน้า 25 Dropdowns
 * (ชุด dropdown, dropdown-menu, _dropdown-option และ _dropdown-group-header)
 *
 * ⚠️ มีแค่ 3 ขนาด คือ sm md lg เหมือนช่องกรอกหน้า 13 Input
 *    ไม่เปิด xs เพราะ 24 เป็นเส้นขั้นต่ำพอดีของเกณฑ์ 2.5.8 ไม่มีระยะเผื่อ
 *    และไม่เปิด xl เพราะไม่มีเจ้าไหนในตลาดใช้ช่องสูงเกิน 48 บนเดสก์ท็อป
 *
 * ⚠️ ความสูง ระยะขอบ ช่องไฟ ขนาดไอคอน และมุมโค้ง ยืมจากช่องกรอกทั้งก้อน
 *    ถ้าจะแก้ต้องแก้ที่ tokens/scale/input.mjs เท่านั้น ด่านตรวจใน dropdown.mjs จะหยุดทันทีถ้าแก้ข้างเดียว
 *
 * ⚠️ ถ้าเป็นการเลือกค่าในฟอร์มธรรมดา ให้ใช้ช่องเลือกของเบราว์เซอร์ก่อนเสมอ
 *    (เอกสารหน้า 25 คู่มือนักพัฒนาข้อ 1) เพราะได้พฤติกรรมของทุกอุปกรณ์มาฟรี รวมถึงแผ่นเลื่อนบนมือถือ
 *    ตัวนี้มีไว้สำหรับกรณีที่ต้องการแถวที่มีไอคอน อวาตาร์ ข้อความรอง หรือหัวกลุ่ม ซึ่งช่องเลือกของเบราว์เซอร์ทำไม่ได้
 *
 * ⚠️ ยังไม่รองรับการเลือกหลายค่า และยังไม่รองรับการพิมพ์กรอง (งานค้างของหน้า 25)
 *    ถ้ารายการยาวเกิน 15 ตัว ให้รอชิ้นงานที่พิมพ์กรองได้ อย่าดัดตัวนี้
 *
 * ค่าทั้งหมดมาจาก design tokens ผ่าน CSS variables ไม่มีค่า hard-code
 */
import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { Avatar, type AvatarSize } from '../Avatar';
import { Icon, type IconName } from '../Icon';
import styles from './Dropdown.module.css';

export type DropdownSize = 'sm' | 'md' | 'lg';

export interface DropdownOption {
  /** ค่าที่ส่งออกไป ต้องไม่ซ้ำกันในรายการเดียว */
  value: string;
  /** ข้อความหลักของแถว ใช้ preset body ขนาดเดียวกับช่อง */
  label: string;
  /**
   * ข้อความอธิบายใต้ชื่อ ตรงกับปุ่มเปิดปิด `show-supporting-text`
   * เปิดแล้วแถวสูงขึ้นเป็น 54 / 64 / 74 โดยระยะขอบบนล่างเท่าเดิมเป๊ะ
   */
  supportingText?: string;
  /** ไอคอนนำหน้าแถว ตรงกับปุ่มเปิดปิด `show-leading-icon` ใช้ชื่อจากเซ็ต Nation UI Icons เท่านั้น */
  leadingIcon?: IconName;
  /** ที่อยู่รูปอวาตาร์นำหน้าแถว ตรงกับปุ่มเปิดปิด `show-leading-avatar` */
  avatarSrc?: string;
  /** ชื่อคนของอวาตาร์ ใช้ทำตัวย่อเมื่อไม่มีรูป และใช้เป็นข้อความที่โปรแกรมอ่านหน้าจออ่าน */
  avatarName?: string;
  disabled?: boolean;
  /** หัวกลุ่มที่แถวนี้สังกัด แถวที่สังกัดหัวกลุ่มเดียวกันต้องวางติดกันในรายการ */
  group?: string;
}

export interface DropdownProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** รายการตัวเลือกทั้งหมด เรียงตามลำดับที่จะแสดงจริง */
  options: DropdownOption[];
  /** ป้ายชื่อของช่อง ประกาศเป็นชื่อที่โปรแกรมอ่านหน้าจออ่าน ผ่าน aria-labelledby */
  label?: React.ReactNode;
  /** ข้อความช่วยใต้ช่อง ถ้าอยู่ในสถานะผิดพลาดจะเปลี่ยนเป็นสีแดง */
  hint?: React.ReactNode;
  /** ข้อความตอนยังไม่ได้เลือก ใช้สีข้อความชั่วคราว ไม่ใช่สีข้อความจริง */
  placeholder?: string;
  /** ค่าที่ถูกเลือกแบบคุมเอง */
  value?: string;
  /** ค่าที่ถูกเลือกตั้งต้นแบบปล่อยให้ component คุม */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: DropdownSize;
  /** สถานะผิดพลาด ตรงกับ state กลุ่ม error ในไฟล์ออกแบบ ต้องมีข้อความอธิบายคู่เสมอ สีแดงอย่างเดียวไม่พอ */
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
  /** อ่านอย่างเดียว ยังรับโฟกัสได้แต่เปิดแผงไม่ได้ ตรงกับ state `read-only` */
  readOnly?: boolean;
  /** ชื่อฟิลด์สำหรับส่งฟอร์ม ถ้าใส่จะแนบช่องซ่อนให้หนึ่งช่อง */
  name?: string;
  /** ข้อความตอนรายการว่าง */
  emptyText?: string;
}

const SIZE_CLASS: Record<DropdownSize, string> = {
  sm: styles.sm, md: styles.md, lg: styles.lg,
};

/**
 * ขนาดอวาตาร์ที่หยิบจากหน้า 11 Avatar ให้ได้ค่าตรงกับ `--ntg-dropdown-leading-avatar-*` พอดี
 * dropdown md ต้องการ 24 ซึ่งคือ avatar ขั้น xs ส่วน lg ต้องการ 32 ซึ่งคือ avatar ขั้น sm
 *
 * ⚠️ ขนาด sm ไม่รองรับอวาตาร์ เพราะความสูงแถว 32 ลบระยะขอบ 16 เหลือ 16
 *    ซึ่งเล็กกว่าอวาตาร์ขั้นเล็กสุดของระบบ จึงไม่มีค่าให้หยิบ
 */
const AVATAR_FOR_SIZE: Record<DropdownSize, AvatarSize | null> = {
  sm: null, md: 'xs', lg: 'sm',
};

/** เวลาที่บัฟเฟอร์การพิมพ์หาตัวเลือกจะหมดอายุ เป็นพฤติกรรมของแป้นพิมพ์ ไม่ใช่ค่าออกแบบ */
const TYPEAHEAD_RESET_MS = 500;

/**
 * ช่องเลือกจากรายการ
 *
 * @example
 * <Dropdown
 *   label="หมวดข่าว"
 *   options={[{ value: 'politics', label: 'การเมือง' }, { value: 'econ', label: 'เศรษฐกิจ' }]}
 *   value={cat}
 *   onValueChange={setCat}
 * />
 *
 * @example
 * <Dropdown
 *   size="lg"
 *   label="ผู้รับผิดชอบ"
 *   options={[
 *     { value: 'a', label: 'กฤษณะ ว.', supportingText: 'บรรณาธิการข่าว', avatarName: 'กฤษณะ ว.', group: 'กองบรรณาธิการ' },
 *     { value: 'b', label: 'สุดา ป.', supportingText: 'ผู้สื่อข่าว', avatarName: 'สุดา ป.', group: 'กองบรรณาธิการ' },
 *   ]}
 * />
 */
export function Dropdown({
  options,
  label,
  hint,
  placeholder = 'เลือก',
  value,
  defaultValue,
  onValueChange,
  size = 'md',
  error = false,
  required = false,
  disabled = false,
  readOnly = false,
  name,
  emptyText = 'ไม่มีรายการ',
  className,
  id,
  ...rest
}: DropdownProps) {
  const autoId = useId();
  const baseId = id ?? autoId;
  const labelId = label ? `${baseId}-label` : undefined;
  const hintId = hint ? `${baseId}-hint` : undefined;
  const listboxId = `${baseId}-listbox`;
  const optionId = (index: number) => `${baseId}-option-${index}`;

  const rootRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [uncontrolled, setUncontrolled] = useState(defaultValue);

  const isControlled = value !== undefined;
  const current = isControlled ? value : uncontrolled;

  const selectedIndex = useMemo(
    () => options.findIndex((option) => option.value === current),
    [options, current],
  );
  const selected = selectedIndex >= 0 ? options[selectedIndex] : undefined;

  // เปิดแผงไม่ได้เมื่อปิดใช้งานหรืออ่านอย่างเดียว ทั้งสองยังอยู่ในลำดับ Tab ตามปกติ ยกเว้นตัวที่ปิดใช้งาน
  const interactive = !disabled && !readOnly;

  // แถวที่เปิดข้อความรองสูงกว่าแถวปกติ เพดานความสูงของแผงจึงต้องสลับไปใช้ชุด supporting ทั้งแผง
  const hasSupporting = useMemo(() => options.some((option) => option.supportingText), [options]);

  const firstEnabled = useCallback(() => options.findIndex((option) => !option.disabled), [options]);

  const lastEnabled = useCallback(() => {
    for (let i = options.length - 1; i >= 0; i -= 1) {
      if (!options[i]?.disabled) return i;
    }
    return -1;
  }, [options]);

  /** เลื่อนตัวชี้ไปอีกตัวที่กดได้ ไม่วนกลับหัวท้าย ตามพฤติกรรมของรายการให้เลือกมาตรฐาน */
  const step = useCallback(
    (from: number, direction: 1 | -1) => {
      for (let i = from + direction; i >= 0 && i < options.length; i += direction) {
        if (!options[i]?.disabled) return i;
      }
      return from;
    },
    [options],
  );

  const openPanel = useCallback(
    (target: 'selected' | 'first' | 'last') => {
      if (!interactive) return;
      let next = -1;
      if (target === 'selected' && selectedIndex >= 0 && !options[selectedIndex]?.disabled) {
        next = selectedIndex;
      } else if (target === 'last') {
        next = lastEnabled();
      } else {
        next = firstEnabled();
      }
      setActiveIndex(next);
      setOpen(true);
    },
    [interactive, selectedIndex, options, firstEnabled, lastEnabled],
  );

  /** ปิดแผงแล้วคืนโฟกัสกลับไปที่ช่องเสมอ โฟกัสไม่เคยย้ายเข้าแผง การคืนจึงเป็นแค่การยืนยัน */
  const closePanel = useCallback((returnFocus: boolean) => {
    setOpen(false);
    setActiveIndex(-1);
    if (returnFocus) fieldRef.current?.focus();
  }, []);

  const commit = useCallback(
    (index: number) => {
      const option = options[index];
      if (!option || option.disabled) return;
      if (!isControlled) setUncontrolled(option.value);
      onValueChange?.(option.value);
      closePanel(true);
    },
    [options, isControlled, onValueChange, closePanel],
  );

  // ── คลิกนอกแผงแล้วปิด ────────────────────────────────────
  // ผูกตัวดักเฉพาะตอนเปิดเท่านั้น และผูกใน effect ซึ่งไม่ทำงานฝั่งเซิร์ฟเวอร์ จึง render ฝั่งเซิร์ฟเวอร์ได้
  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && rootRef.current?.contains(target)) return;
      setOpen(false);
      setActiveIndex(-1);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  // เลื่อนแถวที่ชี้อยู่ให้เห็นในแผงที่เลื่อนได้ ใช้ nearest เพื่อไม่ให้กระโดดทั้งหน้า
  // ค้นด้วย data-index ไม่ใช่ id เพราะ id ที่ React สร้างมีเครื่องหมายทวิภาคซึ่งใช้ในตัวเลือก CSS ตรง ๆ ไม่ได้
  useEffect(() => {
    if (!open || activeIndex < 0) return;
    const node = panelRef.current?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
    node?.scrollIntoView({ block: 'nearest' });
  }, [open, activeIndex]);

  // ── พิมพ์หาตัวเลือก ──────────────────────────────────────
  const typeahead = useRef('');
  const typeaheadTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (typeaheadTimer.current) clearTimeout(typeaheadTimer.current);
  }, []);

  const runTypeahead = useCallback(
    (char: string) => {
      typeahead.current += char.toLowerCase();
      if (typeaheadTimer.current) clearTimeout(typeaheadTimer.current);
      typeaheadTimer.current = setTimeout(() => { typeahead.current = ''; }, TYPEAHEAD_RESET_MS);
      const found = options.findIndex(
        (option) => !option.disabled && option.label.toLowerCase().startsWith(typeahead.current),
      );
      if (found < 0) return;
      if (open) setActiveIndex(found);
      else commit(found);
    },
    [options, open, commit],
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!interactive) return;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!open) openPanel('selected');
        else setActiveIndex((index) => (index < 0 ? firstEnabled() : step(index, 1)));
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (event.altKey && open) { closePanel(true); break; }
        if (!open) openPanel('selected');
        else setActiveIndex((index) => (index < 0 ? lastEnabled() : step(index, -1)));
        break;
      case 'Home':
        if (!open) break;
        event.preventDefault();
        setActiveIndex(firstEnabled());
        break;
      case 'End':
        if (!open) break;
        event.preventDefault();
        setActiveIndex(lastEnabled());
        break;
      case 'Enter':
      case ' ':
        // ปุ่มจริงจะยิง click เองทั้งสองปุ่ม จึงต้องกันไว้ ไม่งั้นจะเปิดแล้วปิดในจังหวะเดียว
        event.preventDefault();
        if (open) commit(activeIndex);
        else openPanel('selected');
        break;
      case 'Escape':
        if (!open) break;
        event.preventDefault();
        closePanel(true);
        break;
      case 'Tab':
        // ปล่อยให้โฟกัสออกไปตามปกติ แค่เก็บแผงกลับโดยไม่คืนโฟกัส
        if (open) closePanel(false);
        break;
      default:
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
          event.preventDefault();
          runTypeahead(event.key);
        }
    }
  };

  const handleFieldClick = () => {
    if (!interactive) return;
    if (open) closePanel(false);
    else openPanel('selected');
  };

  const avatarSize = AVATAR_FOR_SIZE[size];
  if (process.env.NODE_ENV !== 'production' && !avatarSize) {
    const withAvatar = options.some((option) => option.avatarSrc || option.avatarName);
    if (withAvatar) {
      console.warn('[Dropdown] ขนาด sm ไม่รองรับอวาตาร์นำหน้าแถว อวาตาร์จะไม่ถูกแสดง ให้ใช้ขนาด md หรือ lg');
    }
  }

  /**
   * แบ่งรายการเป็นช่วงตามหัวกลุ่ม แถวที่ไม่มีหัวกลุ่มอยู่ในช่วงที่ไม่มีชื่อ
   * แถวที่สังกัดหัวกลุ่มเดียวกันต้องวางติดกันในรายการ ถ้าสลับไปมาจะได้หัวกลุ่มซ้ำ
   */
  const segments = useMemo(() => {
    const result: { group?: string; items: number[] }[] = [];
    options.forEach((option, index) => {
      const last = result[result.length - 1];
      if (last && last.group === option.group) last.items.push(index);
      else result.push({ group: option.group, items: [index] });
    });
    return result;
  }, [options]);

  /**
   * เมาส์ชี้ไม่ย้ายตัวชี้ของแป้นพิมพ์โดยตั้งใจ
   * ถ้าให้เมาส์ย้ายด้วย แถวที่เมาส์ผ่านจะได้วงแหวนของแป้นพิมพ์ไปด้วย ทำให้แยกสองเรื่องนี้ด้วยตาไม่ออก
   * สีพื้นตอนชี้กับวงแหวนตอนเลื่อนด้วยแป้นพิมพ์ จึงเป็นคนละสัญญาณที่เกิดคนละจังหวะ
   */
  const renderOption = (index: number) => {
    const option = options[index];
    if (!option) return null;
    const isSelected = index === selectedIndex;
    const isActive = index === activeIndex;
    const showAvatar = Boolean(avatarSize && (option.avatarSrc || option.avatarName));

    return (
      <div
        key={option.value}
        id={optionId(index)}
        role="option"
        data-index={index}
        className={styles.option}
        aria-selected={isSelected}
        aria-disabled={option.disabled || undefined}
        data-active={isActive ? 'true' : undefined}
        data-supporting={option.supportingText ? 'true' : undefined}
        onClick={() => commit(index)}
      >
        {option.leadingIcon ? (
          <span className={styles.optionIcon}>
            <Icon name={option.leadingIcon} />
          </span>
        ) : null}

        {showAvatar && avatarSize ? (
          <span className={styles.optionAvatar}>
            {/* อวาตาร์มาจากหน้า 11 Avatar ห้ามวาดวงกลมเอง
                ขนาดที่หยิบต้องเท่ากับ --ntg-dropdown-leading-avatar-* เสมอ ดูตาราง AVATAR_FOR_SIZE */}
            <Avatar size={avatarSize} src={option.avatarSrc} name={option.avatarName} />
          </span>
        ) : null}

        <span className={styles.optionText}>
          <span className={styles.optionTitle}>{option.label}</span>
          {option.supportingText ? (
            <span className={styles.optionSupporting}>{option.supportingText}</span>
          ) : null}
        </span>

        {/* เครื่องหมายถูกของแถวที่เลือกแล้ว มีเพื่อไม่ให้สถานะถูกเลือกสื่อด้วยสีพื้นหลังอย่างเดียว
            ไอคอนมาจากเซ็ต Nation UI Icons ห้ามวาดเอง */}
        {isSelected ? (
          <span className={styles.optionCheck}>
            <Icon name="check" />
          </span>
        ) : null}
      </div>
    );
  };

  const classes = [
    styles.root,
    SIZE_CLASS[size],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={rootRef}
      className={classes}
      data-open={open ? 'true' : undefined}
      data-disabled={disabled ? 'true' : undefined}
      data-readonly={readOnly ? 'true' : undefined}
      data-error={error ? 'true' : undefined}
      data-supporting={hasSupporting ? 'true' : undefined}
      {...rest}
    >
      {label ? (
        <span className={styles.label} id={labelId}>
          {label}
          {required ? <span className={styles.required} aria-hidden="true">*</span> : null}
        </span>
      ) : null}

      {/* กรอบยึดตำแหน่งของแผง แผงต้องเกาะขอบล่างของช่อง ไม่ใช่ขอบล่างของทั้งก้อน
          ถ้าเอา position: relative ไปไว้ที่ก้อนนอก แผงจะไปโผล่ใต้ข้อความช่วยแทน */}
      <div className={styles.fieldWrap}>
        {/*
          โครงการเข้าถึงใช้รูปแบบ combobox แบบเลือกอย่างเดียวของ ARIA
          ชื่อของช่องมาจากป้ายชื่อผ่าน aria-labelledby ส่วนค่าที่เลือกคือข้อความในปุ่ม
          โฟกัสอยู่ที่ช่องตลอด ไม่ย้ายเข้าแผง แถวที่ชี้อยู่ประกาศด้วย aria-activedescendant
        */}
        <button
          ref={fieldRef}
          type="button"
          role="combobox"
          id={baseId}
          className={styles.field}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-activedescendant={open && activeIndex >= 0 ? optionId(activeIndex) : undefined}
          aria-labelledby={labelId}
          aria-describedby={hintId}
          aria-invalid={error || undefined}
          aria-required={required || undefined}
          aria-readonly={readOnly || undefined}
          onClick={handleFieldClick}
          onKeyDown={handleKeyDown}
        >
          {selected?.leadingIcon ? (
            <span className={styles.fieldIcon}>
              <Icon name={selected.leadingIcon} />
            </span>
          ) : null}

          <span className={selected ? styles.value : styles.placeholder}>
            {selected ? selected.label : placeholder}
          </span>

          {/* ลูกศรลง หมุนขึ้นเมื่อแผงเปิด ตรงกับสถานะ open ที่แยกจาก focused ในไฟล์ออกแบบ */}
          <span className={styles.chevron}>
            <Icon name="chevron-down" />
          </span>
        </button>

        {/* ช่องซ่อนสำหรับส่งฟอร์ม มีเฉพาะเมื่อระบุชื่อฟิลด์ */}
        {name ? <input type="hidden" name={name} value={current ?? ''} /> : null}

        {open ? (
          <div
            ref={panelRef}
            id={listboxId}
            role="listbox"
            className={styles.panel}
            tabIndex={-1}
            aria-labelledby={labelId}
            // กันไม่ให้การกดในแผงดึงโฟกัสออกจากช่อง เพราะรูปแบบนี้ให้โฟกัสค้างที่ช่องเสมอ
            onMouseDown={(event) => event.preventDefault()}
          >
            {options.length === 0 ? (
              <div className={styles.empty}>{emptyText}</div>
            ) : (
              segments.map((segment, segmentIndex) => {
                if (!segment.group) {
                  return (
                    <React.Fragment key={`segment-${segmentIndex}`}>
                      {segment.items.map(renderOption)}
                    </React.Fragment>
                  );
                }
                const headerId = `${baseId}-group-${segmentIndex}`;
                return (
                  <div
                    key={`segment-${segmentIndex}`}
                    role="group"
                    className={styles.group}
                    aria-labelledby={headerId}
                  >
                    <div id={headerId} className={styles.groupHeader} role="presentation">
                      {segment.group}
                    </div>
                    {segment.items.map(renderOption)}
                  </div>
                );
              })
            )}
          </div>
        ) : null}
      </div>

      {hint ? (
        <span className={styles.hint} id={hintId} data-error={error ? 'true' : undefined}>
          {hint}
        </span>
      ) : null}
    </div>
  );
}

export default Dropdown;
