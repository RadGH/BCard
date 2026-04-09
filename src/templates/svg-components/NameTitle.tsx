import type { BusinessCardData } from '../../types/card';
import type { ColorPalette, Region } from '../../types/template';

interface Props {
  data: BusinessCardData;
  colors: ColorPalette;
  titleFont: string;
  bodyFont: string;
  region: Region;
  nameSizeOverride?: number;
  titleSizeOverride?: number;
  companySizeOverride?: number;
}

const NAME_SIZE = 5.5;
const TITLE_SIZE = 3.2;
const BODY_SIZE = 2.8;

export default function NameTitle({ data, colors, titleFont, bodyFont, region, nameSizeOverride, titleSizeOverride, companySizeOverride }: Props) {
  const nameSize = nameSizeOverride ?? NAME_SIZE;
  const titleSize = titleSizeOverride ?? TITLE_SIZE;
  const bodySize = companySizeOverride ?? BODY_SIZE;
  const fullName = [data.firstName, data.lastName].filter(Boolean).join(' ');
  const nameWithCreds = data.credentials ? `${fullName}, ${data.credentials}` : fullName;
  const anchor = region.align === 'center' ? 'middle' : region.align === 'right' ? 'end' : 'start';
  const tx =
    region.align === 'center'
      ? region.x + region.width / 2
      : region.align === 'right'
        ? region.x + region.width
        : region.x;

  const totalH = nameSize + titleSize * 1.4 + (data.company ? bodySize * 1.4 : 0);
  let ty = region.y;
  if (region.verticalAlign === 'middle') ty = region.y + (region.height - totalH) / 2;
  if (region.verticalAlign === 'bottom') ty = region.y + region.height - totalH;

  return (
    <g>
      <text
        x={tx}
        y={ty + nameSize}
        fontFamily={`'${titleFont}', serif`}
        fontSize={nameSize}
        fontWeight={700}
        fill={colors.text}
        textAnchor={anchor}
      >
        {nameWithCreds || 'Your Name'}
      </text>
      <text
        x={tx}
        y={ty + nameSize + titleSize * 1.5}
        fontFamily={`'${bodyFont}', sans-serif`}
        fontSize={titleSize}
        fontWeight={400}
        fill={colors.textMuted}
        textAnchor={anchor}
      >
        {data.title || 'Job Title'}
      </text>
      {data.company && (
        <text
          x={tx}
          y={ty + nameSize + titleSize * 1.5 + bodySize * 1.4}
          fontFamily={`'${bodyFont}', sans-serif`}
          fontSize={bodySize}
          fontWeight={600}
          fill={colors.primary}
          textAnchor={anchor}
        >
          {data.company}
        </text>
      )}
    </g>
  );
}
