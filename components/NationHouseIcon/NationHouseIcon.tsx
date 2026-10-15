import React from 'react';
import {
  nationHouseIcons,
  NationHouseIconName,
  NATION_HOUSE_VIEWBOX,
} from './icons';

export interface NationHouseIconProps
  extends Omit<React.SVGProps<SVGSVGElement>, 'name'> {
  /** Icon name from the Nation House brand set. */
  name: NationHouseIconName;
  /**
   * Rendered size. This set is drawn on a 40dp grid, so 40 is the native size.
   * Accepts any CSS length or number.
   */
  size?: number | string;
  /**
   * Also draw the brand-coloured solid layer underneath the outline.
   * Mirrors the per-icon toggle in Figma, which is off by default.
   */
  filled?: boolean;
  /** Accessible label. When omitted the icon is aria-hidden (decorative). */
  title?: string;
}

/**
 * Nation House brand icon.
 *
 * Two layers, matching the Figma components:
 *   outline  always drawn, colour follows `currentColor`
 *            (Figma binds it to `icon/general/primary`)
 *   solid    brand-coloured fill, drawn only with `filled`
 *            (Figma binds it to `icon/brand/primary`)
 *
 * Different from `Icon` (Nation UI Icons): that set is a single filled path on
 * a 24dp grid. Do not mix the two sets in the same row of UI.
 *
 * @example
 * <NationHouseIcon name="customer-analysis" />
 * <NationHouseIcon name="alarm" size={24} />
 * <NationHouseIcon name="wallet" filled title="กระเป๋าเงิน" />
 */
export const NationHouseIcon = React.forwardRef<SVGSVGElement, NationHouseIconProps>(
  function NationHouseIcon({ name, size = 40, filled = false, title, ...rest }, ref) {
    const layers = nationHouseIcons[name];
    if (process.env.NODE_ENV !== 'production' && !layers) {
      console.warn(`[NationHouseIcon] Unknown icon name: "${name}"`);
    }
    const a11y = title
      ? { role: 'img' as const, 'aria-label': title }
      : { 'aria-hidden': true as const, focusable: false };
    const markup =
      (title ? `<title>${title}</title>` : '') +
      (layers ? (filled ? layers.solid : '') + layers.outline : '');
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox={NATION_HOUSE_VIEWBOX}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...a11y}
        {...rest}
        dangerouslySetInnerHTML={{ __html: markup }}
      />
    );
  },
);

export default NationHouseIcon;
