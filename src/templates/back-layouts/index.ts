import React from 'react';
import type { BackLayout, ColorPalette } from '../../types/template';
import { CARD } from '../../constants/dimensions';

const W = CARD.TOTAL_WIDTH;
void CARD.TOTAL_HEIGHT; // referenced for symmetry with layouts
const BL = CARD.BLEED;
const SX = CARD.SAFE_X;
const SY = CARD.SAFE_Y;
const SW = CARD.SAFE_WIDTH;
const SH = CARD.SAFE_HEIGHT;

const e = React.createElement;

// ─────────────────────────────────────────────────────────────────────────────
// GROUP 1 — Brand-focused (~6)
// ─────────────────────────────────────────────────────────────────────────────

const group1: BackLayout[] = [
  // bl-01 — Logo large centered, pure brand
  {
    id: 'bl-01',
    name: 'Logo Large Centered',
    description: 'Logo large and centered — pure brand statement',
    supports: { logo: true, qrCode: false, tagline: false },
    defaultPaletteId: 'ocean',
    regions: [
      { name: 'logo', x: SX + SW / 2 - 20, y: SY + SH / 2 - 14, width: 40, height: 28, align: 'center', verticalAlign: 'middle' },
    ],
  },

  // bl-02 — Logo centered with tagline below
  {
    id: 'bl-02',
    name: 'Logo With Tagline',
    description: 'Logo centered; tagline sits below in a clean arrangement',
    supports: { logo: true, qrCode: false, tagline: true },
    defaultPaletteId: 'slate',
    regions: [
      { name: 'logo',    x: SX + SW / 2 - 18, y: SY + SH / 2 - 16, width: 36, height: 20, align: 'center', verticalAlign: 'middle' },
      { name: 'tagline', x: SX,               y: SY + SH / 2 + 8,  width: SW,  height: 8,  align: 'center', verticalAlign: 'top' },
    ],
  },

  // bl-03 — Logo top, tagline middle, subtle decoration
  {
    id: 'bl-03',
    name: 'Logo Top Tagline',
    description: 'Logo anchored in the upper third; tagline below; white space at bottom',
    supports: { logo: true, qrCode: false, tagline: true },
    defaultPaletteId: 'navy',
    regions: [
      { name: 'logo',    x: SX + SW / 2 - 16, y: SY + 4, width: 32, height: 16, align: 'center', verticalAlign: 'top' },
      { name: 'tagline', x: SX,               y: SY + SH / 2 - 4, width: SW, height: 8, align: 'center', verticalAlign: 'middle' },
    ],
    renderBackground: (colors: ColorPalette, _w: number, _h: number) =>
      e('line', { key: 'rule', x1: SX + SW * 0.2, y1: SY + 23, x2: SX + SW * 0.8, y2: SY + 23, stroke: colors.accent, strokeWidth: 0.3, opacity: 0.5 }),
  },

  // bl-04 — Logo bottom, company name above it
  {
    id: 'bl-04',
    name: 'Logo Bottom Brand',
    description: 'Tagline sits in the upper half; logo anchored at the bottom',
    supports: { logo: true, qrCode: false, tagline: true },
    defaultPaletteId: 'charcoal',
    regions: [
      { name: 'tagline', x: SX, y: SY + SH * 0.25, width: SW, height: 10, align: 'center', verticalAlign: 'middle' },
      { name: 'logo',    x: SX + SW / 2 - 16, y: SY + SH - 18, width: 32, height: 18, align: 'center', verticalAlign: 'bottom' },
    ],
  },

  // bl-05 — Colored background with logo centered
  {
    id: 'bl-05',
    name: 'Color Block Logo',
    description: 'Full colored background; logo centered in white/contrasting space',
    supports: { logo: true, qrCode: false, tagline: true },
    defaultPaletteId: 'midnight',
    regions: [
      { name: 'logo',    x: SX + SW / 2 - 18, y: SY + SH / 2 - 14, width: 36, height: 20, align: 'center', verticalAlign: 'middle' },
      { name: 'tagline', x: SX,               y: SY + SH / 2 + 10,  width: SW, height: 6,  align: 'center', verticalAlign: 'top' },
    ],
    renderBackground: (colors: ColorPalette, w: number, h: number) =>
      e('rect', { key: 'bg', x: 0, y: 0, width: w, height: h, fill: colors.primary }),
  },

  // bl-06 — Logo in left panel, tagline right panel
  {
    id: 'bl-06',
    name: 'Logo Left Tagline Right',
    description: 'Card split vertically: logo on left, tagline on right',
    supports: { logo: true, qrCode: false, tagline: true },
    defaultPaletteId: 'slate',
    regions: [
      { name: 'logo',    x: BL,          y: BL, width: W * 0.44 - BL, height: CARD.HEIGHT, align: 'center', verticalAlign: 'middle' },
      { name: 'tagline', x: W * 0.5,     y: SY, width: W * 0.46,      height: SH, align: 'center', verticalAlign: 'middle' },
    ],
    renderBackground: (colors: ColorPalette, _w: number, h: number) =>
      e('rect', { key: 'left-panel', x: 0, y: 0, width: W * 0.47, height: h, fill: colors.primary, opacity: 0.07 }),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// GROUP 2 — QR code featured (~4)
// ─────────────────────────────────────────────────────────────────────────────

const group2: BackLayout[] = [
  // bl-07 — Logo small top, QR large center
  {
    id: 'bl-07',
    name: 'QR Code With Logo',
    description: 'Logo at top; large QR code centered; tagline at bottom',
    supports: { logo: true, qrCode: true, tagline: true },
    defaultPaletteId: 'ocean',
    regions: [
      { name: 'logo',    x: SX + SW / 2 - 10, y: SY,      width: 20, height: 10, align: 'center', verticalAlign: 'top' },
      { name: 'qr-code', x: SX + SW / 2 - 14, y: SY + 12, width: 28, height: 28, align: 'center', verticalAlign: 'top' },
      { name: 'tagline', x: SX,               y: SY + SH - 8, width: SW, height: 8, align: 'center', verticalAlign: 'middle' },
    ],
  },

  // bl-08 — QR code large, no logo, just tagline
  {
    id: 'bl-08',
    name: 'QR Only',
    description: 'QR code dominates; minimal tagline below — scan-focused design',
    supports: { logo: false, qrCode: true, tagline: true },
    defaultPaletteId: 'slate',
    regions: [
      { name: 'qr-code', x: SX + SW / 2 - 18, y: SY,      width: 36, height: 36, align: 'center', verticalAlign: 'top' },
      { name: 'tagline', x: SX,               y: SY + SH - 8, width: SW, height: 8, align: 'center', verticalAlign: 'middle' },
    ],
  },

  // bl-09 — QR left, logo right, with tagline below
  {
    id: 'bl-09',
    name: 'QR Left Logo Right',
    description: 'QR code on the left; logo on the right; tagline centered below',
    supports: { logo: true, qrCode: true, tagline: true },
    defaultPaletteId: 'navy',
    regions: [
      { name: 'qr-code', x: SX,                  y: SY + SH / 2 - 14, width: 26, height: 26, align: 'left',   verticalAlign: 'top' },
      { name: 'logo',    x: SX + SW - 24,         y: SY + SH / 2 - 10, width: 24, height: 20, align: 'center', verticalAlign: 'middle' },
      { name: 'tagline', x: SX,                  y: SY + SH - 8,      width: SW, height: 8,  align: 'center', verticalAlign: 'middle' },
    ],
  },

  // bl-10 — QR code with colored frame
  {
    id: 'bl-10',
    name: 'QR Framed',
    description: 'QR code in a colored accent frame; logo above; scan-ready',
    supports: { logo: true, qrCode: true, tagline: false },
    defaultPaletteId: 'electric',
    regions: [
      { name: 'logo',    x: SX + SW / 2 - 10, y: SY + 2,   width: 20, height: 10, align: 'center', verticalAlign: 'top' },
      { name: 'qr-code', x: SX + SW / 2 - 15, y: SY + 14,  width: 30, height: 30, align: 'center', verticalAlign: 'top' },
    ],
    renderBackground: (colors: ColorPalette, _w: number, _h: number) =>
      e('rect', { key: 'qr-frame', x: SX + SW / 2 - 17, y: SY + 12, width: 34, height: 34, fill: 'none', stroke: colors.accent, strokeWidth: 0.5, rx: 1 }),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// GROUP 3 — Tagline / message (~4)
// ─────────────────────────────────────────────────────────────────────────────

const group3: BackLayout[] = [
  // bl-11 — Large centered tagline only
  {
    id: 'bl-11',
    name: 'Tagline Only',
    description: 'Single tagline centered on the card — bold and memorable',
    supports: { logo: false, qrCode: false, tagline: true },
    defaultPaletteId: 'midnight',
    regions: [
      { name: 'tagline', x: SX + 4, y: SY, width: SW - 8, height: SH, align: 'center', verticalAlign: 'middle' },
    ],
  },

  // bl-12 — Tagline top, decorative space below
  {
    id: 'bl-12',
    name: 'Tagline Top Statement',
    description: 'Large tagline at top; rest of card is open / decorative',
    supports: { logo: false, qrCode: false, tagline: true },
    defaultPaletteId: 'charcoal',
    regions: [
      { name: 'tagline', x: SX, y: SY + SH * 0.15, width: SW, height: SH * 0.3, align: 'center', verticalAlign: 'middle' },
    ],
    renderBackground: (colors: ColorPalette, _w: number, _h: number) =>
      e('line', { key: 'rule', x1: SX + SW * 0.1, y1: SY + SH * 0.5, x2: SX + SW * 0.9, y2: SY + SH * 0.5, stroke: colors.accent, strokeWidth: 0.35, opacity: 0.4 }),
  },

  // bl-13 — Logo small + large tagline
  {
    id: 'bl-13',
    name: 'Logo Plus Message',
    description: 'Logo small in upper corner; large brand message fills center',
    supports: { logo: true, qrCode: false, tagline: true },
    defaultPaletteId: 'slate',
    regions: [
      { name: 'logo',    x: SX,  y: SY,                 width: 16, height: 8,  align: 'left',   verticalAlign: 'top' },
      { name: 'tagline', x: SX + 4, y: SY + SH * 0.3, width: SW - 8, height: SH * 0.5, align: 'center', verticalAlign: 'middle' },
    ],
  },

  // bl-14 — Full bleed color, white tagline centered
  {
    id: 'bl-14',
    name: 'Color Wash Tagline',
    description: 'Bold colored background; tagline in contrasting color centered',
    supports: { logo: false, qrCode: false, tagline: true },
    defaultPaletteId: 'neon',
    regions: [
      { name: 'tagline', x: SX + 4, y: SY, width: SW - 8, height: SH, align: 'center', verticalAlign: 'middle' },
    ],
    renderBackground: (colors: ColorPalette, w: number, h: number) =>
      e('rect', { key: 'wash', x: 0, y: 0, width: w, height: h, fill: colors.secondary }),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// GROUP 4 — Social / contact repeat (~3)
// ─────────────────────────────────────────────────────────────────────────────

const group4: BackLayout[] = [
  // bl-15 — Website URL centered, large
  {
    id: 'bl-15',
    name: 'Website URL Back',
    description: 'Website URL prominently centered — makes the back a web card',
    supports: { logo: false, qrCode: false, tagline: true },
    defaultPaletteId: 'ocean',
    regions: [
      { name: 'tagline',      x: SX, y: SY,           width: SW, height: SH * 0.4, align: 'center', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX, y: SY + SH * 0.5, width: SW, height: SH * 0.5, align: 'center', verticalAlign: 'middle' },
    ],
  },

  // bl-16 — Social handles listed large
  {
    id: 'bl-16',
    name: 'Social Back',
    description: 'Back of card is a social media hub — handles listed large',
    supports: { logo: false, qrCode: false, tagline: false },
    defaultPaletteId: 'electric',
    regions: [
      { name: 'social', x: SX, y: SY, width: SW, height: SH, align: 'center', verticalAlign: 'middle' },
    ],
  },

  // bl-17 — Logo + contact repeat
  {
    id: 'bl-17',
    name: 'Contact Repeat Back',
    description: 'Logo at top; contact info repeated for convenient reference',
    supports: { logo: true, qrCode: false, tagline: false },
    defaultPaletteId: 'slate',
    regions: [
      { name: 'logo',         x: SX + SW / 2 - 12, y: SY,       width: 24, height: 12, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX,               y: SY + 15,  width: SW, height: SH - 15, align: 'center', verticalAlign: 'middle' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// GROUP 5 — Full design / decorative (~3)
// ─────────────────────────────────────────────────────────────────────────────

const group5: BackLayout[] = [
  // bl-18 — Diagonal pattern back
  {
    id: 'bl-18',
    name: 'Diagonal Pattern',
    description: 'Decorative diagonal stripe pattern; logo centered on top',
    supports: { logo: true, qrCode: false, tagline: true },
    defaultPaletteId: 'midnight',
    regions: [
      { name: 'logo',    x: SX + SW / 2 - 14, y: SY + SH / 2 - 10, width: 28, height: 14, align: 'center', verticalAlign: 'middle' },
      { name: 'tagline', x: SX,               y: SY + SH / 2 + 8,  width: SW, height: 6,  align: 'center', verticalAlign: 'top' },
    ],
    renderBackground: (colors: ColorPalette, w: number, h: number) => {
      const stripes: React.ReactElement[] = [];
      const gap = 6;
      for (let i = -h; i < w + h; i += gap) {
        stripes.push(e('line', { key: `s${i}`, x1: i, y1: 0, x2: i + h, y2: h, stroke: colors.accent, strokeWidth: 0.4, opacity: 0.06 }));
      }
      return e('g', { key: 'stripes' }, ...stripes);
    },
  },

  // bl-19 — Dot grid pattern back
  {
    id: 'bl-19',
    name: 'Dot Grid Back',
    description: 'Subtle dot grid background; logo and tagline over it',
    supports: { logo: true, qrCode: false, tagline: true },
    defaultPaletteId: 'slate',
    regions: [
      { name: 'logo',    x: SX + SW / 2 - 16, y: SY + SH / 2 - 12, width: 32, height: 16, align: 'center', verticalAlign: 'middle' },
      { name: 'tagline', x: SX,               y: SY + SH / 2 + 8,  width: SW, height: 6,  align: 'center', verticalAlign: 'top' },
    ],
    renderBackground: (colors: ColorPalette, w: number, h: number) => {
      const dots: React.ReactElement[] = [];
      const spacing = 5;
      for (let x = spacing; x < w; x += spacing) {
        for (let y = spacing; y < h; y += spacing) {
          dots.push(e('circle', { key: `d${x}-${y}`, cx: x, cy: y, r: 0.35, fill: colors.accent }));
        }
      }
      return e('g', { key: 'dots', opacity: 0.07 }, ...dots);
    },
  },

  // bl-20 — Geometric corner accents, full brand
  {
    id: 'bl-20',
    name: 'Geometric Accent Back',
    description: 'Geometric corner accents frame the card; logo and tagline centered',
    supports: { logo: true, qrCode: false, tagline: true },
    defaultPaletteId: 'champagne',
    regions: [
      { name: 'logo',    x: SX + SW / 2 - 16, y: SY + SH / 2 - 12, width: 32, height: 16, align: 'center', verticalAlign: 'middle' },
      { name: 'tagline', x: SX,               y: SY + SH / 2 + 8,  width: SW, height: 6,  align: 'center', verticalAlign: 'top' },
    ],
    renderBackground: (colors: ColorPalette, w: number, h: number) => {
      const len = 10;
      const off = 3;
      return e('g', { key: 'corners', stroke: colors.accent, strokeWidth: 0.5, fill: 'none', opacity: 0.45 },
        e('path', { d: `M${off},${off + len} L${off},${off} L${off + len},${off}` }),
        e('path', { d: `M${w - off - len},${off} L${w - off},${off} L${w - off},${off + len}` }),
        e('path', { d: `M${off},${h - off - len} L${off},${h - off} L${off + len},${h - off}` }),
        e('path', { d: `M${w - off - len},${h - off} L${w - off},${h - off} L${w - off},${h - off - len}` }),
      );
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Registry
// ─────────────────────────────────────────────────────────────────────────────

export const backLayouts: BackLayout[] = [
  ...group1,
  ...group2,
  ...group3,
  ...group4,
  ...group5,
];

export function getBackLayout(id: string): BackLayout | undefined {
  return backLayouts.find(l => l.id === id);
}
