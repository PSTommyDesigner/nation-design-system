import React, { useId, useState } from 'react';
import { Tag, type TagSize } from '../Tag';
import { LinkButton } from '../LinkButton';
import styles from './TagField.module.css';

/**
 * TagField ช่องแท็ก (หน้า 13 Input ชุด tag-field)
 *
 * ช่องที่เก็บหลายค่าเป็นแท็ก พิมพ์ค่าใหม่แล้วกด Enter หรือปุ่มเพิ่ม (ไอคอนบวกท้ายช่อง) เพื่อเพิ่ม
 * กดปุ่มปิดบนแท็กหรือ Backspace ตอนช่องว่างเพื่อลบ แท็กเป็น Tag ตระกูล neutral แบบ secondary ขนาดเดียวกับช่อง
 * ความสูงที่ประกาศคือความสูงต่ำสุด ช่องสูงตามจำนวนแท็กเมื่อขึ้นบรรทัดใหม่ (เอกสารหน้า 13 ข้อ ห้ามตรึงความสูงช่องแท็ก)
 *
 * ค่าระยะและสีทั้งหมดอยู่ใน TagField.module.css ซึ่งสร้างจากไฟล์ออกแบบ (ดู TagField.base.css)
 */
export type TagFieldSize = 'sm' | 'md' | 'lg';

export interface TagFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'defaultValue' | 'onChange'> {
  label?: React.ReactNode;
  /** ข้อความช่วยใต้ช่อง ถ้าอยู่ในสถานะผิดพลาดจะเปลี่ยนเป็นสีแดง */
  hint?: React.ReactNode;
  size?: TagFieldSize;
  error?: boolean;
  required?: boolean;
  /** แท็กที่เลือกไว้ คุมจากข้างนอก ส่ง onTagsChange เพื่อรับค่าใหม่ */
  tags?: readonly string[];
  /** แท็กตั้งต้นเมื่อปล่อยให้ component คุมเอง */
  defaultTags?: readonly string[];
  onTagsChange?: (tags: string[]) => void;
  /** จำนวนแท็กสูงสุด ถึงแล้วปุ่มเพิ่มกับการกด Enter จะไม่เพิ่ม */
  maxTags?: number;
  /** ชื่อของปุ่มเพิ่มสำหรับโปรแกรมอ่านหน้าจอ (ตรงกับปุ่ม link-icon-button ในไฟล์ออกแบบ) */
  addLabel?: string;
  /** แสดงปุ่มเพิ่มท้ายช่องหรือไม่ ค่าเริ่มต้นแสดง */
  showAddButton?: boolean;
  /** ชื่อของปุ่มปิดบนแท็ก รับชื่อแท็กมาประกอบ */
  removeLabel?: (tag: string) => string;
}

const SIZE_CLASS: Record<TagFieldSize, string> = { sm: styles.sm, md: styles.md, lg: styles.lg };
// แท็กในช่องใช้ขนาดชื่อเดียวกับช่อง (tokens/scale/input.mjs TAG_SIZE_MAP) ส่วนปุ่มเพิ่มใช้ขนาดตาม instance ในไฟล์ออกแบบ
const TAG_SIZE: Record<TagFieldSize, TagSize> = { sm: 'sm', md: 'md', lg: 'lg' };
const ADD_SIZE: Record<TagFieldSize, 'xs' | 'md' | 'lg'> = { sm: 'xs', md: 'md', lg: 'lg' };

export function TagField({
  label,
  hint,
  size = 'md',
  error = false,
  required = false,
  tags,
  defaultTags = [],
  onTagsChange,
  maxTags,
  addLabel = 'เพิ่ม',
  showAddButton = true,
  removeLabel = (tag) => `ลบ ${tag}`,
  placeholder = 'เพิ่ม',
  disabled = false,
  readOnly = false,
  className,
  id,
  onKeyDown,
  ...rest
}: TagFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const [innerTags, setInnerTags] = useState<readonly string[]>(defaultTags);
  const [text, setText] = useState('');
  const current = tags ?? innerTags;
  const interactive = !disabled && !readOnly;

  const commit = (next: string[]) => {
    if (tags === undefined) setInnerTags(next);
    onTagsChange?.(next);
  };
  const add = () => {
    const value = text.trim();
    if (!value || !interactive) return;
    if (current.includes(value)) { setText(''); return; }
    if (maxTags !== undefined && current.length >= maxTags) return;
    commit([...current, value]);
    setText('');
  };
  const remove = (index: number) => {
    if (!interactive) return;
    commit(current.filter((_, i) => i !== index));
  };

  const classes = [styles.root, SIZE_CLASS[size], className].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      data-error={error ? 'true' : undefined}
      data-disabled={disabled ? 'true' : undefined}
      data-readonly={readOnly ? 'true' : undefined}
    >
      {label ? (
        <label className={styles.label} htmlFor={inputId}>
          {label}
          {required ? <span className={styles.required} aria-hidden="true">*</span> : null}
        </label>
      ) : null}

      <div className={styles.box}>
        <div className={styles.content}>
          {current.map((tag, index) => (
            <Tag
              key={`${tag}-${index}`}
              family="neutral"
              hierarchy="secondary"
              size={TAG_SIZE[size]}
              closable={interactive}
              closeLabel={removeLabel(tag)}
              onClose={() => remove(index)}
              disabled={disabled}
            >
              {tag}
            </Tag>
          ))}
          <input
            id={inputId}
            type="text"
            className={styles.input}
            value={text}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            aria-invalid={error || undefined}
            aria-describedby={hintId}
            aria-required={required || undefined}
            onChange={(event) => setText(event.target.value)}
            onKeyDown={(event) => {
              onKeyDown?.(event);
              if (event.defaultPrevented) return;
              if (event.key === 'Enter') { event.preventDefault(); add(); }
              else if (event.key === 'Backspace' && text === '' && current.length) remove(current.length - 1);
            }}
            {...rest}
          />
        </div>
        {showAddButton ? (
          <>
            <span className={styles.divider} aria-hidden="true" />
            <LinkButton
              type="button"
              family="neutral"
              size={ADD_SIZE[size]}
              leftIcon="add"
              label={addLabel}
              className={styles.add}
              disabled={!interactive}
              onClick={add}
            />
          </>
        ) : null}
      </div>

      {hint ? <span className={styles.hint} id={hintId}>{hint}</span> : null}
    </div>
  );
}

export default TagField;
