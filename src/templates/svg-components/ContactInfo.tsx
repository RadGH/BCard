import type { BusinessCardData } from '../../types/card';
import type { ColorPalette, Region } from '../../types/template';

type IconStyle = 'prefix' | 'solid' | 'outline' | 'none';

interface Props {
  data: BusinessCardData;
  colors: ColorPalette;
  bodyFont: string;
  region: Region;
  iconStyle?: IconStyle;
  fontSizeOverride?: number;
}

const BODY_SIZE = 2.6;

// FA Solid 6 paths (viewBox 0 0 512 512 unless noted)
const CONTACT_ICONS: Record<string, { path: string; viewBoxWidth: number }> = {
  phone: {
    path: 'M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C11.7 30.7 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.3-11.7 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z',
    viewBoxWidth: 512,
  },
  email: {
    path: 'M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z',
    viewBoxWidth: 512,
  },
  globe: {
    path: 'M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.5 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z',
    viewBoxWidth: 512,
  },
  locationDot: {
    path: 'M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z',
    viewBoxWidth: 384,
  },
  fax: {
    path: 'M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zm-32-96a32 32 0 1 1 0 64 32 32 0 1 1 0-64z',
    viewBoxWidth: 512,
  },
};

// Icon dimensions in mm
const ICON_MM = 2.2;
const ICON_GAP = 1.0;

type LineEntry = { text: string; iconKey: string };

export default function ContactInfo({ data, colors, bodyFont, region, iconStyle = 'prefix', fontSizeOverride }: Props) {
  const bodySize = fontSizeOverride ?? BODY_SIZE;
  const lineH = bodySize * 1.45;
  const entries: LineEntry[] = [];
  if (data.phone) entries.push({ text: data.phone, iconKey: 'phone' });
  if (data.email) entries.push({ text: data.email, iconKey: 'email' });
  if (data.fax) entries.push({ text: data.fax, iconKey: 'fax' });
  if (data.website) entries.push({ text: data.website, iconKey: 'globe' });
  if (data.address) {
    const addr = data.address;
    entries.push({ text: addr.line1, iconKey: 'locationDot' });
    if (addr.line2) entries.push({ text: addr.line2, iconKey: 'locationDot' });
    const cityState = [addr.city, addr.state].filter(Boolean).join(', ');
    const cityLine = [cityState, addr.zip].filter(Boolean).join(' ');
    if (cityLine) entries.push({ text: cityLine, iconKey: 'locationDot' });
  }

  if (entries.length === 0) {
    entries.push({ text: 'phone@example.com', iconKey: 'email' });
    entries.push({ text: '(555) 000-0000', iconKey: 'phone' });
  }

  const anchor = region.align === 'center' ? 'middle' : region.align === 'right' ? 'end' : 'start';
  const tx =
    region.align === 'center'
      ? region.x + region.width / 2
      : region.align === 'right'
        ? region.x + region.width
        : region.x;

  let startY = region.y;
  if (region.verticalAlign === 'middle') startY = region.y + (region.height - entries.length * lineH) / 2;
  if (region.verticalAlign === 'bottom') startY = region.y + region.height - entries.length * lineH;

  const showIcon = iconStyle === 'solid' || iconStyle === 'outline';

  return (
    <g>
      {entries.map((entry, i) => {
        const baseY = startY + bodySize + i * lineH;
        const iconY = baseY - ICON_MM;

        if (showIcon) {
          const iconDef = CONTACT_ICONS[entry.iconKey];
          const iconScale = iconDef ? ICON_MM / iconDef.viewBoxWidth : ICON_MM / 512;
          const iconPath = iconDef?.path ?? '';

          const textX = region.align === 'left' ? tx + ICON_MM + ICON_GAP : tx;
          const iconTx = region.align === 'left'
            ? tx
            : region.align === 'right'
              ? tx - ICON_MM - ICON_GAP
              : tx - (ICON_MM + ICON_GAP) / 2;

          return (
            <g key={i}>
              {iconPath && (
                <g transform={`translate(${iconTx}, ${iconY}) scale(${iconScale})`}>
                  <path
                    d={iconPath}
                    fill={iconStyle === 'solid' ? colors.textMuted : 'none'}
                    stroke={iconStyle === 'outline' ? colors.textMuted : 'none'}
                    strokeWidth={iconStyle === 'outline' ? 30 : 0}
                  />
                </g>
              )}
              <text
                x={textX}
                y={baseY}
                fontFamily={`'${bodyFont}', sans-serif`}
                fontSize={bodySize}
                fill={colors.textMuted}
                textAnchor={anchor}
              >
                {entry.text}
              </text>
            </g>
          );
        }

        // prefix or none: just render the text value (ContactInfo historically has no text prefix, so both behave same)
        return (
          <text
            key={i}
            x={tx}
            y={baseY}
            fontFamily={`'${bodyFont}', sans-serif`}
            fontSize={bodySize}
            fill={colors.textMuted}
            textAnchor={anchor}
          >
            {entry.text}
          </text>
        );
      })}
    </g>
  );
}
