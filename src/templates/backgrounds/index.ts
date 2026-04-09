import React from 'react';
import type { ColorPalette } from '../../types/template';

export interface CardBackground {
  id: string;
  name: string;
  render: (colors: ColorPalette, w: number, h: number, flipH?: boolean, flipV?: boolean) => React.ReactElement;
}

function flipTransform(flipH?: boolean, flipV?: boolean, w = 95.25, h = 57.15): string {
  if (!flipH && !flipV) return '';
  const sx = flipH ? -1 : 1;
  const sy = flipV ? -1 : 1;
  const tx = flipH ? -w : 0;
  const ty = flipV ? -h : 0;
  return `scale(${sx}, ${sy}) translate(${tx}, ${ty})`;
}

export const cardBackgrounds: CardBackground[] = [
  {
    id: 'corner-triangle',
    name: 'Corner Triangle',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      return React.createElement('g', { transform: t || undefined },
        React.createElement('polygon', {
          points: `0,0 ${w * 0.45},0 0,${h * 0.75}`,
          fill: colors.primary,
          opacity: 0.9,
        })
      );
    },
  },
  {
    id: 'diagonal-split',
    name: 'Diagonal Split',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      return React.createElement('g', { transform: t || undefined },
        React.createElement('polygon', {
          points: `0,0 ${w * 0.6},0 0,${h}`,
          fill: colors.primary,
        })
      );
    },
  },
  {
    id: 'bottom-bar',
    name: 'Bottom Bar',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      return React.createElement('g', { transform: t || undefined },
        React.createElement('rect', { x: 0, y: h * 0.78, width: w, height: h * 0.22, fill: colors.primary })
      );
    },
  },
  {
    id: 'side-panel',
    name: 'Side Panel',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      return React.createElement('g', { transform: t || undefined },
        React.createElement('rect', { x: 0, y: 0, width: w * 0.32, height: h, fill: colors.primary })
      );
    },
  },
  {
    id: 'curve-separator',
    name: 'Curve Separator',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      const d = `M 0 0 L ${w * 0.55} 0 Q ${w * 0.35} ${h * 0.5} ${w * 0.55} ${h} L 0 ${h} Z`;
      return React.createElement('g', { transform: t || undefined },
        React.createElement('path', { d, fill: colors.primary })
      );
    },
  },
  {
    id: 'bubbles',
    name: 'Bubbles',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      return React.createElement('g', { transform: t || undefined },
        React.createElement('circle', { cx: w * 0.85, cy: h * 0.15, r: h * 0.35, fill: colors.primary, opacity: 0.15 }),
        React.createElement('circle', { cx: w * 0.95, cy: h * 0.65, r: h * 0.25, fill: colors.secondary, opacity: 0.12 }),
        React.createElement('circle', { cx: w * 0.7, cy: h * 0.85, r: h * 0.18, fill: colors.accent, opacity: 0.10 }),
      );
    },
  },
  {
    id: 'corner-bracket',
    name: 'Corner Accent',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      const m = 7;
      const s = Math.min(w, h) * 0.15;
      return React.createElement('g', { transform: t || undefined, stroke: colors.primary, strokeWidth: 1.5, fill: 'none' },
        // Top-left corner
        React.createElement('polyline', { points: `${m + s},${m} ${m},${m} ${m},${m + s}` }),
        // Bottom-right corner
        React.createElement('polyline', { points: `${w - m - s},${h - m} ${w - m},${h - m} ${w - m},${h - m - s}` }),
      );
    },
  },
  {
    id: 'dot-grid',
    name: 'Dot Grid',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      const dots: React.ReactElement[] = [];
      const cols = 8, rows = 5;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push(React.createElement('circle', {
            key: `${r}-${c}`,
            cx: (c + 0.5) * (w / cols),
            cy: (r + 0.5) * (h / rows),
            r: 0.6,
            fill: colors.primary,
            opacity: 0.15,
          }));
        }
      }
      return React.createElement('g', { transform: t || undefined }, ...dots);
    },
  },

  // ── 30 new backgrounds ──────────────────────────────────────────────────────

  {
    id: 'half-panel',
    name: 'Half Panel',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      return React.createElement('g', { transform: t || undefined },
        React.createElement('rect', { x: 0, y: 0, width: w * 0.5, height: h, fill: colors.primary }),
      );
    },
  },

  {
    id: 'wave-left',
    name: 'Wave Left',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      const cx = w * 0.38;
      const bulge = w * 0.14;
      const d = [
        `M 0 0`,
        `L ${cx} 0`,
        `C ${cx + bulge} ${h * 0.25} ${cx - bulge} ${h * 0.5} ${cx} ${h * 0.5}`,
        `C ${cx + bulge} ${h * 0.5} ${cx - bulge} ${h * 0.75} ${cx} ${h}`,
        `L 0 ${h}`,
        `Z`,
      ].join(' ');
      return React.createElement('g', { transform: t || undefined },
        React.createElement('path', { d, fill: colors.primary }),
      );
    },
  },

  {
    id: 'wave-right',
    name: 'Wave Right',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      const cx = w * 0.62;
      const bulge = w * 0.14;
      const d = [
        `M ${cx} 0`,
        `L ${w} 0`,
        `L ${w} ${h}`,
        `L ${cx} ${h}`,
        `C ${cx - bulge} ${h * 0.75} ${cx + bulge} ${h * 0.5} ${cx} ${h * 0.5}`,
        `C ${cx - bulge} ${h * 0.25} ${cx + bulge} 0 ${cx} 0`,
        `Z`,
      ].join(' ');
      return React.createElement('g', { transform: t || undefined },
        React.createElement('path', { d, fill: colors.primary }),
      );
    },
  },

  {
    id: 'diagonal-band',
    name: 'Diagonal Band',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      const d = [
        `M ${w * 0.15} 0`,
        `L ${w * 0.55} 0`,
        `L ${w * 0.85} ${h}`,
        `L ${w * 0.45} ${h}`,
        `Z`,
      ].join(' ');
      return React.createElement('g', { transform: t || undefined },
        React.createElement('path', { d, fill: colors.primary, opacity: 0.85 }),
      );
    },
  },

  {
    id: 'double-stripe',
    name: 'Double Stripe',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      const d1 = [
        `M ${w * 0.08} 0 L ${w * 0.28} 0 L ${w * 0.72} ${h} L ${w * 0.52} ${h} Z`,
      ].join('');
      const d2 = [
        `M ${w * 0.38} 0 L ${w * 0.52} 0 L ${w * 0.96} ${h} L ${w * 0.82} ${h} Z`,
      ].join('');
      return React.createElement('g', { transform: t || undefined },
        React.createElement('path', { d: d1, fill: colors.primary, opacity: 0.75 }),
        React.createElement('path', { d: d2, fill: colors.secondary, opacity: 0.55 }),
      );
    },
  },

  {
    id: 'full-border',
    name: 'Full Border',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      const m = 7;
      return React.createElement('g', { transform: t || undefined },
        React.createElement('rect', {
          x: m, y: m, width: w - m * 2, height: h - m * 2,
          fill: 'none', stroke: colors.primary, strokeWidth: 1.5,
        }),
      );
    },
  },

  {
    id: 'thin-border',
    name: 'Thin Border',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      const m = 7;
      return React.createElement('g', { transform: t || undefined },
        React.createElement('rect', {
          x: m, y: m, width: w - m * 2, height: h - m * 2,
          fill: 'none', stroke: colors.primary, strokeWidth: 0.5,
        }),
      );
    },
  },

  {
    id: 'dotted-border',
    name: 'Dotted Border',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      const m = 7;
      return React.createElement('g', { transform: t || undefined },
        React.createElement('rect', {
          x: m, y: m, width: w - m * 2, height: h - m * 2,
          fill: 'none', stroke: colors.primary, strokeWidth: 1,
          strokeDasharray: '2 2',
        }),
      );
    },
  },

  {
    id: 'double-border',
    name: 'Double Border',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      const m1 = 7, m2 = 9;
      return React.createElement('g', { transform: t || undefined },
        React.createElement('rect', {
          x: m1, y: m1, width: w - m1 * 2, height: h - m1 * 2,
          fill: 'none', stroke: colors.primary, strokeWidth: 1,
        }),
        React.createElement('rect', {
          x: m2, y: m2, width: w - m2 * 2, height: h - m2 * 2,
          fill: 'none', stroke: colors.primary, strokeWidth: 0.5, opacity: 0.6,
        }),
      );
    },
  },

  {
    id: 'arc-top',
    name: 'Arc Top',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      const d = `M 0 0 L ${w} 0 L ${w} ${h * 0.45} Q ${w * 0.5} ${h * 0.75} 0 ${h * 0.45} Z`;
      return React.createElement('g', { transform: t || undefined },
        React.createElement('path', { d, fill: colors.primary }),
      );
    },
  },

  {
    id: 'arc-bottom',
    name: 'Arc Bottom',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      const d = `M 0 ${h * 0.55} Q ${w * 0.5} ${h * 0.25} ${w} ${h * 0.55} L ${w} ${h} L 0 ${h} Z`;
      return React.createElement('g', { transform: t || undefined },
        React.createElement('path', { d, fill: colors.primary }),
      );
    },
  },

  {
    id: 'wave-top',
    name: 'Wave Top',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      const bh = h * 0.28;
      const d = [
        `M 0 0 L ${w} 0 L ${w} ${bh}`,
        `C ${w * 0.75} ${bh + h * 0.12} ${w * 0.5} ${bh - h * 0.1} ${w * 0.25} ${bh + h * 0.08}`,
        `C ${w * 0.1} ${bh + h * 0.14} 0 ${bh + h * 0.04} 0 ${bh}`,
        `Z`,
      ].join(' ');
      return React.createElement('g', { transform: t || undefined },
        React.createElement('path', { d, fill: colors.primary }),
      );
    },
  },

  {
    id: 'wave-bottom',
    name: 'Wave Bottom',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      const by = h * 0.72;
      const d = [
        `M 0 ${by}`,
        `C ${w * 0.25} ${by - h * 0.1} ${w * 0.5} ${by + h * 0.08} ${w * 0.75} ${by - h * 0.06}`,
        `C ${w * 0.9} ${by - h * 0.12} ${w} ${by} ${w} ${by}`,
        `L ${w} ${h} L 0 ${h} Z`,
      ].join(' ');
      return React.createElement('g', { transform: t || undefined },
        React.createElement('path', { d, fill: colors.primary }),
      );
    },
  },

  {
    id: 'circle-accent',
    name: 'Circle Accent',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      const r = h * 0.7;
      return React.createElement('g', { transform: t || undefined },
        React.createElement('circle', {
          cx: w + r * 0.1, cy: h * 0.5, r,
          fill: colors.primary, opacity: 0.18,
        }),
        React.createElement('circle', {
          cx: w + r * 0.1, cy: h * 0.5, r: r * 0.7,
          fill: colors.secondary, opacity: 0.12,
        }),
      );
    },
  },

  {
    id: 'ring-accent',
    name: 'Ring Accent',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      const r = h * 0.6;
      return React.createElement('g', { transform: t || undefined },
        React.createElement('circle', {
          cx: w - r * 0.15, cy: r * 0.15, r,
          fill: 'none', stroke: colors.primary, strokeWidth: 1.5, opacity: 0.35,
        }),
        React.createElement('circle', {
          cx: w - r * 0.15, cy: r * 0.15, r: r * 0.72,
          fill: 'none', stroke: colors.accent, strokeWidth: 0.8, opacity: 0.25,
        }),
      );
    },
  },

  {
    id: 'cross-lines',
    name: 'Cross Lines',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      return React.createElement('g', {
        transform: t || undefined,
        stroke: colors.primary, strokeWidth: 0.6, opacity: 0.3,
      },
        React.createElement('line', { x1: w * 0.5, y1: 0, x2: w * 0.5, y2: h }),
        React.createElement('line', { x1: 0, y1: h * 0.5, x2: w, y2: h * 0.5 }),
      );
    },
  },

  {
    id: 'diagonal-cross',
    name: 'Diagonal Cross',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      return React.createElement('g', {
        transform: t || undefined,
        stroke: colors.primary, strokeWidth: 0.5, opacity: 0.22,
      },
        React.createElement('line', { x1: 0, y1: 0, x2: w, y2: h }),
        React.createElement('line', { x1: w, y1: 0, x2: 0, y2: h }),
      );
    },
  },

  {
    id: 'corner-brackets-all',
    name: 'All Corners',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      const s = Math.min(w, h) * 0.14;
      const m = 7;
      return React.createElement('g', {
        transform: t || undefined,
        stroke: colors.primary, strokeWidth: 1.2, fill: 'none',
      },
        React.createElement('polyline', { points: `${m + s},${m} ${m},${m} ${m},${m + s}` }),
        React.createElement('polyline', { points: `${w - m - s},${m} ${w - m},${m} ${w - m},${m + s}` }),
        React.createElement('polyline', { points: `${m},${h - m - s} ${m},${h - m} ${m + s},${h - m}` }),
        React.createElement('polyline', { points: `${w - m},${h - m - s} ${w - m},${h - m} ${w - m - s},${h - m}` }),
      );
    },
  },

  {
    id: 'inner-glow',
    name: 'Inner Glow',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      const m = 7;
      return React.createElement('g', { transform: t || undefined },
        React.createElement('rect', {
          x: m, y: m, width: w - m * 2, height: h - m * 2,
          fill: 'none', stroke: colors.accent, strokeWidth: 3, opacity: 0.18,
        }),
        React.createElement('rect', {
          x: m + 1.5, y: m + 1.5, width: w - (m + 1.5) * 2, height: h - (m + 1.5) * 2,
          fill: 'none', stroke: colors.accent, strokeWidth: 1.5, opacity: 0.12,
        }),
        React.createElement('rect', {
          x: m + 3, y: m + 3, width: w - (m + 3) * 2, height: h - (m + 3) * 2,
          fill: 'none', stroke: colors.accent, strokeWidth: 0.8, opacity: 0.08,
        }),
      );
    },
  },

  {
    id: 'chevron-left',
    name: 'Chevron Left',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      const tip = w * 0.28;
      const back = w * 0.12;
      const d = `M 0 0 L ${tip} 0 L ${tip + back} ${h * 0.5} L ${tip} ${h} L 0 ${h} L ${back} ${h * 0.5} Z`;
      return React.createElement('g', { transform: t || undefined },
        React.createElement('path', { d, fill: colors.primary }),
      );
    },
  },

  {
    id: 'chevron-right',
    name: 'Chevron Right',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      const tip = w * 0.72;
      const back = w * 0.12;
      const d = `M ${tip} 0 L ${w} 0 L ${w} ${h} L ${tip} ${h} L ${tip - back} ${h * 0.5} Z`;
      return React.createElement('g', { transform: t || undefined },
        React.createElement('path', { d, fill: colors.primary }),
      );
    },
  },

  {
    id: 'banner-top',
    name: 'Banner Top',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      return React.createElement('g', { transform: t || undefined },
        React.createElement('rect', { x: 0, y: 0, width: w, height: h * 0.15, fill: colors.primary }),
      );
    },
  },

  {
    id: 'banner-bottom',
    name: 'Banner Bottom',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      return React.createElement('g', { transform: t || undefined },
        React.createElement('rect', { x: 0, y: h * 0.85, width: w, height: h * 0.15, fill: colors.primary }),
      );
    },
  },

  {
    id: 'banner-both',
    name: 'Banner Both',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      const bh = h * 0.1;
      return React.createElement('g', { transform: t || undefined },
        React.createElement('rect', { x: 0, y: 0, width: w, height: bh, fill: colors.primary }),
        React.createElement('rect', { x: 0, y: h - bh, width: w, height: bh, fill: colors.secondary }),
      );
    },
  },

  {
    id: 'mountain-range',
    name: 'Mountain Range',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      const base = h;
      const d = [
        `M 0 ${base}`,
        `L ${w * 0.18} ${h * 0.52}`,
        `L ${w * 0.36} ${h * 0.68}`,
        `L ${w * 0.52} ${h * 0.38}`,
        `L ${w * 0.68} ${h * 0.62}`,
        `L ${w * 0.82} ${h * 0.48}`,
        `L ${w} ${h * 0.7}`,
        `L ${w} ${base}`,
        `Z`,
      ].join(' ');
      return React.createElement('g', { transform: t || undefined },
        React.createElement('path', { d, fill: colors.primary, opacity: 0.65 }),
      );
    },
  },

  {
    id: 'scatter-dots',
    name: 'Scatter Dots',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      // Deterministic pseudo-random positions using a seeded sequence
      const positions: [number, number, number][] = [
        [0.08, 0.12, 1.1], [0.22, 0.35, 0.8], [0.41, 0.08, 1.3],
        [0.63, 0.22, 0.9], [0.78, 0.41, 1.2], [0.91, 0.15, 0.7],
        [0.15, 0.62, 1.0], [0.35, 0.78, 0.85],[0.55, 0.55, 1.1],
        [0.72, 0.68, 0.75],[0.88, 0.82, 1.0], [0.05, 0.88, 0.9],
        [0.48, 0.92, 1.15],[0.82, 0.05, 0.8], [0.28, 0.48, 1.05],
        [0.68, 0.88, 0.7], [0.92, 0.52, 1.0], [0.18, 0.22, 0.9],
        [0.44, 0.68, 1.2], [0.76, 0.32, 0.85],
      ];
      const dots = positions.map(([px, py, r], i) =>
        React.createElement('circle', {
          key: i,
          cx: px * w,
          cy: py * h,
          r,
          fill: i % 3 === 0 ? colors.accent : i % 3 === 1 ? colors.secondary : colors.primary,
          opacity: 0.25,
        })
      );
      return React.createElement('g', { transform: t || undefined }, ...dots);
    },
  },

  {
    id: 'gradient-sweep',
    name: 'Gradient Sweep',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      const d1 = `M 0 0 L ${w} 0 L 0 ${h} Z`;
      const d2 = `M ${w * 0.55} 0 L ${w} 0 L ${w} ${h} L 0 ${h} Z`;
      return React.createElement('g', { transform: t || undefined },
        React.createElement('path', { d: d1, fill: colors.primary, opacity: 0.18 }),
        React.createElement('path', { d: d2, fill: colors.secondary, opacity: 0.12 }),
      );
    },
  },

  {
    id: 'halftone-corner',
    name: 'Halftone Corner',
    render: (colors, w, h, flipH, flipV) => {
      const t = flipTransform(flipH, flipV, w, h);
      const dots: React.ReactElement[] = [];
      const cols = 7, rows = 5;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // Distance from top-left corner drives fade and size
          const dist = Math.sqrt((c / (cols - 1)) ** 2 + (r / (rows - 1)) ** 2) / Math.SQRT2;
          const opacity = Math.max(0, 0.5 - dist * 0.55);
          const radius = Math.max(0.3, 1.4 * (1 - dist));
          if (opacity < 0.04) continue;
          dots.push(React.createElement('circle', {
            key: `${r}-${c}`,
            cx: w * 0.02 + c * (w * 0.22 / (cols - 1)),
            cy: h * 0.04 + r * (h * 0.55 / (rows - 1)),
            r: radius,
            fill: colors.primary,
            opacity,
          }));
        }
      }
      return React.createElement('g', { transform: t || undefined }, ...dots);
    },
  },

];

export function getBackground(id: string): CardBackground | undefined {
  return cardBackgrounds.find(b => b.id === id);
}
