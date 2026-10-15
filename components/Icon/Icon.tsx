import React from 'react';
import { icons, iconNames, IconName, IconSize, ICON_VIEWBOX, ICON_SIZE_TOKENS } from './icons';

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'name'> {
  /** Icon name from the Nation UI Icons set. */
  name: IconName;
  /**
   * Size token ('xs'|'sm'|'md'|'lg'|'xl'|'2xl' → --ntg-size-icon-*),
   * or an explicit number/CSS length. Defaults to 'lg' (24px).
   */
  size?: IconSize | number | string;
  /** Accessible label. When omitted the icon is aria-hidden (decorative). */
  title?: string;
}

function resolveSize(size: IconProps['size']): string | number {
  if (typeof size === 'string' && size in ICON_SIZE_TOKENS) {
    return ICON_SIZE_TOKENS[size as IconSize];
  }
  return size as string | number;
}

/**
 * Nation UI Icon. Inherits color via `currentColor` (set `color` on a parent
 * or via the foreground tokens). Scales cleanly filled vector geometry.
 *
 * @example
 * <Icon name="search" />
 * <Icon name="favorite-fill" size="sm" style={{ color: 'var(--ntg-color-foreground-system-error-primary)' }} />
 * <Icon name="menu" title="Open menu" />
 */
export const Icon = React.forwardRef<SVGSVGElement, IconProps>(function Icon(
  { name, size = 'lg', title, ...rest },
  ref,
) {
  const markup = icons[name];
  if (process.env.NODE_ENV !== 'production' && !markup) {
    console.warn(`[Icon] Unknown icon name: "${name}"`);
  }
  const dim = resolveSize(size);
  const a11y = title
    ? { role: 'img' as const, 'aria-label': title }
    : { 'aria-hidden': true as const, focusable: false };
  return (
    <svg
      ref={ref}
      width={dim}
      height={dim}
      viewBox={ICON_VIEWBOX}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...a11y}
      {...rest}
      dangerouslySetInnerHTML={{ __html: (title ? `<title>${title}</title>` : '') + (markup || '') }}
    />
  );
});

export default Icon;
export { icons, iconNames, ICON_SIZE_TOKENS };
export type { IconName, IconSize };
