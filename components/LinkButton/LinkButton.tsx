/**
 * LinkButton Nation Design System
 *
 * ปุ่มแบบลิงก์ ครอบคลุมทั้งแบบมีข้อความและไอคอนล้วน ตาม component set ใน Figma
 * (หน้า 12 Buttons · link-button / link-icon-button)
 *
 * ถ้าส่ง `href` จะ render เป็น <a> ให้อัตโนมัติ ไม่ส่งก็เป็น <button>
 */
import React from 'react';
import { Icon, type IconName } from '../Icon';
import styles from './LinkButton.module.css';
import type { ButtonSize } from '../Button';

/**
 * ตระกูลสีของปุ่มลิงก์ ตรงกับเอกสาร 3 ชุดที่มีปุ่มลิงก์ในหน้า Figma 11 Buttons
 * (Brand · Neutral · Error) · `neutral` ผูกกับ token `button/color/link/gray/*`
 */
export type LinkButtonFamily = 'brand' | 'neutral' | 'error';

interface LinkButtonBase {
  family?: LinkButtonFamily;
  /**
   * โหมดสีเทา (ตรงกับ variant `Default Gray` ใน Figma)
   * ใช้ได้เฉพาะตระกูล `brand` และ `error`
   */
  defaultGray?: boolean;
  size?: ButtonSize;
  leftIcon?: IconName;
  rightIcon?: IconName;
  children?: React.ReactNode;
  /** ใช้เมื่อเป็นไอคอนล้วน (ไม่มี children) เพื่อการเข้าถึง */
  label?: string;
  className?: string;
}

export type LinkButtonProps = LinkButtonBase &
  (
    | ({ href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkButtonBase>)
    | ({ href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof LinkButtonBase>)
  );

/** ตระกูลที่รองรับโหมด Default Gray */
const GRAY_CAPABLE: LinkButtonFamily[] = ['brand', 'error'];

function familyClass(family: LinkButtonFamily, defaultGray: boolean): string {
  const gray = defaultGray && GRAY_CAPABLE.includes(family);
  if (family === 'brand') return gray ? styles.brandGray : styles.brand;
  if (family === 'error') return gray ? styles.errorGray : styles.error;
  return styles.gray; // neutral → token button/color/link/gray/*
}

/**
 * @example
 * <LinkButton family="brand" rightIcon="arrow-outward">อ่านต่อ</LinkButton>
 * <LinkButton href="/news" family="neutral" leftIcon="arrow-left">ย้อนกลับ</LinkButton>
 * <LinkButton leftIcon="close" label="ปิด" />
 */
export const LinkButton = React.forwardRef<HTMLAnchorElement | HTMLButtonElement, LinkButtonProps>(
  function LinkButton(
    {
      children,
      family = 'brand',
      defaultGray = false,
      size = 'md',
      leftIcon,
      rightIcon,
      label,
      className,
      ...rest
    },
    ref,
  ) {
    const iconOnly = !children;
    const classes = [
      styles.root,
      styles[size],
      familyClass(family, defaultGray),
      iconOnly ? styles.iconOnly : undefined,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const inner = (
      <span className={styles.content}>
        {leftIcon && <Icon name={leftIcon} size="100%" className={styles.icon} />}
        {children && <span className={styles.label}>{children}</span>}
        {rightIcon && <Icon name={rightIcon} size="100%" className={styles.icon} />}
      </span>
    );

    if ('href' in rest && rest.href !== undefined) {
      const { href, ...anchorRest } = rest as { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          aria-label={iconOnly ? label : undefined}
          title={iconOnly ? label : undefined}
          {...anchorRest}
        >
          {inner}
        </a>
      );
    }

    const { disabled, type = 'button', ...buttonRest } = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        className={classes}
        disabled={disabled}
        aria-label={iconOnly ? label : undefined}
        title={iconOnly ? label : undefined}
        {...buttonRest}
      >
        {inner}
      </button>
    );
  },
);

export default LinkButton;
