import type { BusinessCardData } from '../../types/card';
import type { ColorPalette, Region } from '../../types/template';
import { SOCIAL_NETWORKS_MAP } from '../../constants/social-networks';

type IconStyle = 'prefix' | 'solid' | 'outline' | 'none';

interface Props {
  data: BusinessCardData;
  colors: ColorPalette;
  bodyFont: string;
  region: Region;
  iconStyle?: IconStyle;
  fontSizeOverride?: number;
}

const SOCIAL_SIZE = 2.4;

// Icon dimensions in mm — paths are in a 0-512 space
const ICON_MM = 2.2;
const ICON_GAP = 1.0; // gap between icon and text

export default function SocialLinks({ data, colors, bodyFont, region, iconStyle = 'prefix', fontSizeOverride }: Props) {
  const socialSize = fontSizeOverride ?? SOCIAL_SIZE;
  const lineH = socialSize * 1.35;
  if (!data.social) return null;

  type LinkEntry = { value: string; prefix: string; svgPath: string; viewBoxWidth: number };
  const links: LinkEntry[] = [];
  for (const [key, value] of Object.entries(data.social)) {
    if (!value) continue;
    const network = SOCIAL_NETWORKS_MAP[key];
    if (network) {
      links.push({
        value,
        prefix: network.prefix,
        svgPath: network.svgPath,
        viewBoxWidth: parseFloat(network.viewBox.split(' ')[2]) || 512,
      });
    } else {
      links.push({ value, prefix: `${key}/`, svgPath: '', viewBoxWidth: 512 });
    }
  }

  if (links.length === 0) return null;

  const showIcon = iconStyle === 'solid' || iconStyle === 'outline';
  const showPrefix = iconStyle === 'prefix';

  const anchor = region.align === 'center' ? 'middle' : region.align === 'right' ? 'end' : 'start';
  const tx =
    region.align === 'center'
      ? region.x + region.width / 2
      : region.align === 'right'
        ? region.x + region.width
        : region.x;

  return (
    <g>
      {links.map((link, i) => {
        const baseY = region.y + socialSize + i * lineH;
        const iconY = baseY - ICON_MM; // top of icon aligned with text cap height approx

        if (showIcon && link.svgPath) {
          const iconScale = ICON_MM / link.viewBoxWidth;

          let effectiveIconTx: number;
          let effectiveTextX: number;
          let effectiveAnchor: 'start' | 'middle' | 'end';

          if (region.align === 'left') {
            effectiveIconTx = tx;
            effectiveTextX = tx + ICON_MM + ICON_GAP;
            effectiveAnchor = 'start';
          } else if (region.align === 'right') {
            effectiveTextX = tx - ICON_MM - ICON_GAP;
            effectiveIconTx = tx - ICON_MM;
            effectiveAnchor = 'end';
          } else {
            // center: estimate total width to center [icon+gap+text] as a group
            const estimatedTextWidth = link.value.length * socialSize * 0.48;
            const totalWidth = ICON_MM + ICON_GAP + estimatedTextWidth;
            effectiveIconTx = tx - totalWidth / 2;
            effectiveTextX = effectiveIconTx + ICON_MM + ICON_GAP;
            effectiveAnchor = 'start';
          }

          return (
            <g key={i}>
              <g transform={`translate(${effectiveIconTx}, ${iconY}) scale(${iconScale})`}>
                <path
                  d={link.svgPath}
                  fill={iconStyle === 'solid' ? colors.accent : 'none'}
                  stroke={iconStyle === 'outline' ? colors.accent : 'none'}
                  strokeWidth={iconStyle === 'outline' ? 30 : 0}
                />
              </g>
              <text
                x={effectiveTextX}
                y={baseY}
                fontFamily={`'${bodyFont}', sans-serif`}
                fontSize={socialSize}
                fill={colors.accent}
                textAnchor={effectiveAnchor}
              >
                {link.value}
              </text>
            </g>
          );
        }

        // prefix or none mode
        const displayText = showPrefix ? `${link.prefix}${link.value}` : link.value;
        return (
          <text
            key={i}
            x={tx}
            y={baseY}
            fontFamily={`'${bodyFont}', sans-serif`}
            fontSize={socialSize}
            fill={colors.accent}
            textAnchor={anchor}
          >
            {displayText}
          </text>
        );
      })}
    </g>
  );
}
