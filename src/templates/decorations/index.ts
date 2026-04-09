import type { DecorationSet, ColorPalette } from '../../types/template';
import React from 'react';

const e = React.createElement;

export const decorationSets: DecorationSet[] = [
  {
    id: 'none',
    name: 'None',
    elements: [],
  },
  {
    id: 'minimal-line',
    name: 'Minimal Line',
    elements: [
      {
        type: 'line',
        layer: 'midground',
        render: (colors: ColorPalette, w: number) =>
          e('line', {
            key: 'min-line',
            x1: w * 0.1, y1: 0, x2: w * 0.4, y2: 0,
            stroke: colors.accent, strokeWidth: 0.4, opacity: 0.6,
          }),
      },
    ],
  },
  {
    id: 'subtle-border',
    name: 'Subtle Border',
    elements: [
      {
        type: 'shape',
        layer: 'foreground',
        render: (colors: ColorPalette, w: number, h: number) =>
          e('rect', {
            key: 'border',
            x: 1.5, y: 1.5, width: w - 3, height: h - 3,
            fill: 'none', stroke: colors.accent, strokeWidth: 0.3, opacity: 0.3,
            rx: 1,
          }),
      },
    ],
  },
  {
    id: 'bold-stripe',
    name: 'Bold Stripe',
    elements: [
      {
        type: 'shape',
        layer: 'background',
        render: (colors: ColorPalette, _w: number, h: number) =>
          e('rect', {
            key: 'stripe',
            x: 0, y: 0, width: 6, height: h,
            fill: colors.primary,
          }),
      },
    ],
  },
  {
    id: 'geometric-shapes',
    name: 'Geometric Shapes',
    elements: [
      {
        type: 'shape',
        layer: 'background',
        render: (colors: ColorPalette, w: number, h: number) =>
          e('g', { key: 'geo', opacity: 0.08 },
            e('circle', { cx: w * 0.85, cy: h * 0.2, r: 8, fill: colors.primary }),
            e('circle', { cx: w * 0.9, cy: h * 0.7, r: 5, fill: colors.secondary }),
            e('rect', { x: w * 0.75, y: h * 0.8, width: 4, height: 4, fill: colors.accent, transform: `rotate(45, ${w * 0.77}, ${h * 0.82})` }),
          ),
      },
    ],
  },
  {
    id: 'gradient-wash',
    name: 'Gradient Wash',
    elements: [
      {
        type: 'gradient',
        layer: 'background',
        render: (colors: ColorPalette, w: number, h: number) =>
          e('g', { key: 'grad-wash' },
            e('defs', {},
              e('linearGradient', { id: 'wash-grad', x1: '0%', y1: '0%', x2: '100%', y2: '100%' },
                e('stop', { offset: '0%', stopColor: colors.primary, stopOpacity: 0.05 }),
                e('stop', { offset: '100%', stopColor: colors.secondary, stopOpacity: 0.12 }),
              ),
            ),
            e('rect', { x: 0, y: 0, width: w, height: h, fill: 'url(#wash-grad)' }),
          ),
      },
    ],
  },
  {
    id: 'corner-accents',
    name: 'Corner Accents',
    elements: [
      {
        type: 'corner',
        layer: 'foreground',
        render: (colors: ColorPalette, w: number, h: number) => {
          const len = 8;
          const off = 2;
          return e('g', { key: 'corners', stroke: colors.accent, strokeWidth: 0.4, fill: 'none', opacity: 0.5 },
            e('path', { d: `M${off},${off + len} L${off},${off} L${off + len},${off}` }),
            e('path', { d: `M${w - off - len},${off} L${w - off},${off} L${w - off},${off + len}` }),
            e('path', { d: `M${off},${h - off - len} L${off},${h - off} L${off + len},${h - off}` }),
            e('path', { d: `M${w - off - len},${h - off} L${w - off},${h - off} L${w - off},${h - off - len}` }),
          );
        },
      },
    ],
  },
  {
    id: 'dot-pattern',
    name: 'Dot Pattern',
    elements: [
      {
        type: 'pattern',
        layer: 'background',
        render: (colors: ColorPalette, w: number, h: number) => {
          const dots: React.ReactElement[] = [];
          const spacing = 4;
          for (let x = spacing; x < w; x += spacing) {
            for (let y = spacing; y < h; y += spacing) {
              dots.push(e('circle', { key: `d-${x}-${y}`, cx: x, cy: y, r: 0.3, fill: colors.accent }));
            }
          }
          return e('g', { key: 'dots', opacity: 0.06 }, ...dots);
        },
      },
    ],
  },
];

export function getDecoration(id: string): DecorationSet | undefined {
  return decorationSets.find(d => d.id === id);
}
