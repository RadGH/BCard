import type { ColorPalette, Region } from '../../types/template';

interface Props {
  text?: string;
  colors: ColorPalette;
  bodyFont: string;
  region: Region;
  fontSizeOverride?: number;
}

const TAGLINE_SIZE = 2.8;

export default function Tagline({ text, colors, bodyFont, region, fontSizeOverride }: Props) {
  if (!text) return null;
  const taglineSize = fontSizeOverride ?? TAGLINE_SIZE;
  const anchor = region.align === 'center' ? 'middle' : region.align === 'right' ? 'end' : 'start';
  const tx =
    region.align === 'center'
      ? region.x + region.width / 2
      : region.align === 'right'
        ? region.x + region.width
        : region.x;

  return (
    <text
      x={tx}
      y={region.y + region.height / 2 + taglineSize * 0.35}
      fontFamily={`'${bodyFont}', sans-serif`}
      fontSize={taglineSize}
      fontStyle="italic"
      fill={colors.textMuted}
      textAnchor={anchor}
    >
      {text}
    </text>
  );
}
