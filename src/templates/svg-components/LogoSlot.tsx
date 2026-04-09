import React from 'react';
import type { Region, ColorPalette } from '../../types/template';
import { resolvePublicUrl } from '../../lib/public-url';

interface Props {
  src?: string;
  companyName?: string;
  useTextLogo?: boolean;
  region: Region;
  colors: ColorPalette;
  titleFont: string;
  colorOverride?: string;
  scale?: number;
}

export default function LogoSlot({ src, companyName, useTextLogo = true, region, colors, titleFont, colorOverride, scale = 1 }: Props) {
  if (src) {
    const cx = region.x + region.width / 2;
    const cy = region.y + region.height / 2;
    const scaleTransform = scale !== 1 ? `translate(${cx} ${cy}) scale(${scale}) translate(${-cx} ${-cy})` : undefined;
    return (
      <g transform={scaleTransform}>
        <image
          href={resolvePublicUrl(src)}
          x={region.x}
          y={region.y}
          width={region.width}
          height={region.height}
          preserveAspectRatio="xMidYMid meet"
        />
        {colorOverride && (
          <rect
            x={region.x}
            y={region.y}
            width={region.width}
            height={region.height}
            fill={colorOverride}
            style={{ mixBlendMode: 'color' } as React.CSSProperties}
          />
        )}
      </g>
    );
  }

  if (!useTextLogo) return null;

  if (companyName) {
    const anchor = region.align === 'center' ? 'middle' : region.align === 'right' ? 'end' : 'start';
    const tx =
      region.align === 'center'
        ? region.x + region.width / 2
        : region.align === 'right'
          ? region.x + region.width
          : region.x;
    const fontSize = Math.min(region.height * 0.5, 4);
    return (
      <text
        x={tx}
        y={region.y + region.height / 2 + fontSize * 0.35}
        fontFamily={`'${titleFont}', serif`}
        fontSize={fontSize}
        fontWeight={700}
        fill={colorOverride ?? colors.primary}
        textAnchor={anchor}
      >
        {companyName}
      </text>
    );
  }

  return null;
}
