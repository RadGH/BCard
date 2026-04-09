import React from 'react';
import type { FrontLayout, ColorPalette } from '../../types/template';
import { CARD } from '../../constants/dimensions';

const W = CARD.TOTAL_WIDTH;   // 95.25
const H = CARD.TOTAL_HEIGHT;  // 57.15
const BL = CARD.BLEED;        // 3.175
const SX = CARD.SAFE_X;       // 6.35
const SY = CARD.SAFE_Y;       // 6.35
const SW = CARD.SAFE_WIDTH;   // 82.55
const SH = CARD.SAFE_HEIGHT;  // 44.45

const e = React.createElement;

// ─────────────────────────────────────────────────────────────────────────────
// GROUP A — No portrait, no logo (~25 layouts)  fl-a01..fl-a25
// ─────────────────────────────────────────────────────────────────────────────

const groupA: FrontLayout[] = [
  // fl-a01 — Clean left-aligned, all info stacked
  {
    id: 'fl-a01',
    category: 'text-only',
    name: 'Classic Left',
    description: 'All text left-aligned, name large at top, contact below',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'ocean',
    regions: [
      { name: 'name-title',   x: SX,         y: SY,      width: SW,       height: 18, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX,         y: SY + 20, width: SW * 0.5, height: 20, align: 'left', verticalAlign: 'top' },
      { name: 'social',       x: SX + SW * 0.55, y: SY + 20, width: SW * 0.45, height: 20, align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-a02 — Fully centered, name-dominant
  {
    id: 'fl-a02',
    category: 'text-only',
    name: 'Centered Classic',
    description: 'All content centered, balanced top-to-bottom',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'slate',
    regions: [
      { name: 'name-title',   x: SX, y: SY + 2,  width: SW, height: 18, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 22, width: SW, height: 14, align: 'center', verticalAlign: 'top' },
      { name: 'social',       x: SX, y: SY + 36, width: SW, height: 8,  align: 'center', verticalAlign: 'top' },
    ],
  },

  // fl-a03 — Right-aligned, modern editorial feel
  {
    id: 'fl-a03',
    category: 'text-only',
    name: 'Right Aligned',
    description: 'All text right-aligned for a strong editorial composition',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'midnight',
    regions: [
      { name: 'name-title',   x: SX, y: SY + 4,  width: SW, height: 18, align: 'right', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 24, width: SW, height: 14, align: 'right', verticalAlign: 'top' },
      { name: 'social',       x: SX, y: SY + 36, width: SW, height: 8,  align: 'right', verticalAlign: 'top' },
    ],
  },

  // fl-a04 — Vertically centered name block, contact at bottom
  {
    id: 'fl-a04',
    category: 'text-only',
    name: 'Middle Focus',
    description: 'Name block floats vertically centered, contact anchored at bottom',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'navy',
    regions: [
      { name: 'name-title',   x: SX, y: SY,          width: SW,       height: SH * 0.55, align: 'left', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX, y: SY + SH * 0.6, width: SW * 0.55, height: SH * 0.4, align: 'left', verticalAlign: 'bottom' },
      { name: 'social',       x: SX + SW * 0.6, y: SY + SH * 0.6, width: SW * 0.4, height: SH * 0.4, align: 'right', verticalAlign: 'bottom' },
    ],
  },

  // fl-a05 — Split left/right columns, equal weight
  {
    id: 'fl-a05',
    category: 'text-only',
    name: 'Two Column',
    description: 'Left column: name and title. Right column: all contact details',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'charcoal',
    regions: [
      { name: 'name-title',   x: SX,               y: SY, width: SW * 0.44, height: SH, align: 'left',  verticalAlign: 'middle' },
      { name: 'contact-info', x: SX + SW * 0.5,    y: SY, width: SW * 0.5,  height: SH * 0.6, align: 'left', verticalAlign: 'middle' },
      { name: 'social',       x: SX + SW * 0.5,    y: SY + SH * 0.65, width: SW * 0.5, height: SH * 0.35, align: 'left', verticalAlign: 'top' },
    ],
    renderBackground: (colors: ColorPalette, w: number, h: number) =>
      e('rect', { key: 'col-divider', x: w * 0.48, y: h * 0.15, width: 0.3, height: h * 0.7, fill: colors.accent, opacity: 0.3 }),
  },

  // fl-a06 — Name huge, contact tiny — name-dominant
  {
    id: 'fl-a06',
    category: 'text-only',
    name: 'Name Dominant',
    description: 'Oversized name takes most of the card, minimal contact below',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'cobalt',
    regions: [
      { name: 'name-title',   x: SX, y: SY,          width: SW, height: SH * 0.65, align: 'left', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX, y: SY + SH * 0.7, width: SW, height: SH * 0.3,  align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-a07 — Contact dominant, name small at top
  {
    id: 'fl-a07',
    category: 'text-only',
    name: 'Contact Dominant',
    description: 'Contact details are the hero; name appears small above',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'graphite',
    regions: [
      { name: 'name-title',   x: SX, y: SY,              width: SW,       height: SH * 0.22, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + SH * 0.28,  width: SW * 0.6, height: SH * 0.72, align: 'left', verticalAlign: 'top' },
      { name: 'social',       x: SX + SW * 0.65, y: SY + SH * 0.28, width: SW * 0.35, height: SH * 0.72, align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-a08 — Minimal — just name and title, nothing else
  {
    id: 'fl-a08',
    category: 'text-only',
    name: 'Ultra Minimal',
    description: 'Just name and job title, centered — pure elegance',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'cream',
    regions: [
      { name: 'name-title', x: SX, y: SY, width: SW, height: SH, align: 'center', verticalAlign: 'middle' },
    ],
  },

  // fl-a09 — Top-heavy: name at top, contact at bottom, whitespace in middle
  {
    id: 'fl-a09',
    category: 'text-only',
    name: 'Top Bottom',
    description: 'Name at top, contact at bottom, generous breathing room between',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'silver',
    regions: [
      { name: 'name-title',   x: SX, y: SY,                 width: SW,       height: 18, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + SH - 16,       width: SW * 0.6, height: 16, align: 'left', verticalAlign: 'bottom' },
      { name: 'social',       x: SX + SW * 0.65, y: SY + SH - 16, width: SW * 0.35, height: 16, align: 'right', verticalAlign: 'bottom' },
    ],
  },

  // fl-a10 — Tagline featured, centered layout
  {
    id: 'fl-a10',
    category: 'text-only',
    name: 'Tagline Hero',
    description: 'Name above, prominent tagline in the middle, contact at bottom',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'lavender',
    regions: [
      { name: 'name-title',   x: SX, y: SY,          width: SW, height: 14, align: 'center', verticalAlign: 'top' },
      { name: 'tagline',      x: SX, y: SY + 16,     width: SW, height: 10, align: 'center', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX, y: SY + 28,     width: SW, height: 16, align: 'center', verticalAlign: 'top' },
    ],
  },

  // fl-a11 — Horizontal rule divides name from contact
  {
    id: 'fl-a11',
    category: 'text-only',
    name: 'Divided Rule',
    description: 'Accent line rule separates the name block from contact info',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'terra',
    regions: [
      { name: 'name-title',   x: SX, y: SY,      width: SW, height: 16, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 22, width: SW * 0.55, height: 22, align: 'left', verticalAlign: 'top' },
      { name: 'social',       x: SX + SW * 0.6,  y: SY + 22, width: SW * 0.4, height: 22, align: 'left', verticalAlign: 'top' },
    ],
    renderBackground: (colors: ColorPalette, _w: number, _h: number) =>
      e('line', { key: 'rule', x1: SX, y1: SY + 19, x2: SX + SW, y2: SY + 19, stroke: colors.accent, strokeWidth: 0.4, opacity: 0.7 }),
  },

  // fl-a12 — Credentials featured
  {
    id: 'fl-a12',
    category: 'text-only',
    name: 'Credentials Focus',
    description: 'Credentials displayed prominently alongside name; contact below',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'burgundy',
    regions: [
      { name: 'name-title',   x: SX,         y: SY,      width: SW * 0.65, height: 18, align: 'left',  verticalAlign: 'top' },
      { name: 'credentials',  x: SX + SW * 0.68, y: SY,  width: SW * 0.32, height: 18, align: 'right', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX,         y: SY + 22, width: SW,        height: 22, align: 'left',  verticalAlign: 'top' },
    ],
  },

  // fl-a13 — Mixed alignment: name left, contact right
  {
    id: 'fl-a13',
    category: 'text-only',
    name: 'Split Align',
    description: 'Name on the left, contact info on the right — asymmetric balance',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'cream',
    regions: [
      { name: 'name-title',   x: SX,              y: SY, width: SW * 0.48, height: SH, align: 'left',  verticalAlign: 'middle' },
      { name: 'contact-info', x: SX + SW * 0.52,  y: SY, width: SW * 0.48, height: SH, align: 'right', verticalAlign: 'middle' },
    ],
  },

  // fl-a14 — Centered with generous margins, all content in center zone
  {
    id: 'fl-a14',
    category: 'text-only',
    name: 'Centered Inset',
    description: 'Wider safe margins; all content tightly clustered in the center zone',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'silver',
    regions: [
      { name: 'name-title',   x: SX + 8, y: SY + 4,  width: SW - 16, height: 16, align: 'center', verticalAlign: 'top' },
      { name: 'tagline',      x: SX + 8, y: SY + 21,  width: SW - 16, height: 6,  align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX + 8, y: SY + 29, width: SW - 16, height: 15, align: 'center', verticalAlign: 'top' },
    ],
  },

  // fl-a15 — Three row stacked left
  {
    id: 'fl-a15',
    category: 'text-only',
    name: 'Three Row Stack',
    description: 'Name, tagline, and contact each occupy a distinct horizontal band',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'sage',
    regions: [
      { name: 'name-title',   x: SX, y: SY,         width: SW, height: SH * 0.36, align: 'left', verticalAlign: 'middle' },
      { name: 'tagline',      x: SX, y: SY + SH * 0.38, width: SW, height: SH * 0.2, align: 'left', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX, y: SY + SH * 0.62, width: SW, height: SH * 0.38, align: 'left', verticalAlign: 'top' },
    ],
    renderBackground: (colors: ColorPalette, _w: number, _h: number) =>
      e('g', { key: 'bands' },
        e('line', { x1: SX, y1: SY + SH * 0.37, x2: SX + SW, y2: SY + SH * 0.37, stroke: colors.accent, strokeWidth: 0.25, opacity: 0.4 }),
        e('line', { x1: SX, y1: SY + SH * 0.61, x2: SX + SW, y2: SY + SH * 0.61, stroke: colors.accent, strokeWidth: 0.25, opacity: 0.4 }),
      ),
  },

  // fl-a16 — Diagonally staggered text blocks
  {
    id: 'fl-a16',
    category: 'text-only',
    name: 'Diagonal Flow',
    description: 'Name upper-left, contact steps diagonally to lower-right',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'teal',
    regions: [
      { name: 'name-title',   x: SX,              y: SY,          width: SW * 0.65, height: 16, align: 'left',  verticalAlign: 'top' },
      { name: 'contact-info', x: SX + SW * 0.3,   y: SY + 18,    width: SW * 0.7,  height: 18, align: 'right', verticalAlign: 'top' },
      { name: 'social',       x: SX,              y: SY + SH - 8, width: SW * 0.5,  height: 8,  align: 'left',  verticalAlign: 'top' },
    ],
  },

  // fl-a17 — Header band, content below
  {
    id: 'fl-a17',
    category: 'text-only',
    name: 'Header Band',
    description: 'Colored top band contains name, open area below for contact',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'forest',
    regions: [
      { name: 'name-title',   x: SX, y: BL,      width: SW, height: 20, align: 'left', verticalAlign: 'middle', textColorOverride: '#ffffff' },
      { name: 'contact-info', x: SX, y: SY + 17, width: SW * 0.55, height: 24, align: 'left', verticalAlign: 'top' },
      { name: 'social',       x: SX + SW * 0.6,  y: SY + 17, width: SW * 0.4, height: 24, align: 'left', verticalAlign: 'top' },
    ],
    renderBackground: (colors: ColorPalette, w: number, _h: number) =>
      e('rect', { key: 'header-band', x: 0, y: 0, width: w, height: 20, fill: colors.primary }),
  },

  // fl-a18 — Footer band layout
  {
    id: 'fl-a18',
    category: 'text-only',
    name: 'Footer Band',
    description: 'Contact info lives in a colored footer band; name floats above',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'earth',
    regions: [
      { name: 'name-title',   x: SX, y: SY,           width: SW,       height: SH * 0.55, align: 'left', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX, y: H - 20 + 2,   width: SW * 0.6, height: 16,        align: 'left', verticalAlign: 'middle' },
      { name: 'social',       x: SX + SW * 0.65, y: H - 20 + 2, width: SW * 0.35, height: 16, align: 'right', verticalAlign: 'middle' },
    ],
    renderBackground: (colors: ColorPalette, w: number, h: number) =>
      e('rect', { key: 'footer-band', x: 0, y: h - 20, width: w, height: 20, fill: colors.primary }),
  },

  // fl-a19 — Name only on left, all contact stacked right
  {
    id: 'fl-a19',
    category: 'text-only',
    name: 'Name Left Contact Right',
    description: 'Wide left column for name/title only; right column is contact-rich',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'lavender',
    regions: [
      { name: 'name-title',   x: SX,              y: SY, width: SW * 0.42, height: SH, align: 'left',  verticalAlign: 'middle' },
      { name: 'contact-info', x: SX + SW * 0.48,  y: SY, width: SW * 0.52, height: SH * 0.65, align: 'left', verticalAlign: 'middle' },
      { name: 'social',       x: SX + SW * 0.48,  y: SY + SH * 0.7, width: SW * 0.52, height: SH * 0.3, align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-a20 — Champagne minimal: only name centered, tagline beneath, email at bottom
  {
    id: 'fl-a20',
    category: 'text-only',
    name: 'Elegant Minimal',
    description: 'Name, tagline and single-line contact — ultra-refined simplicity',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'champagne',
    regions: [
      { name: 'name-title',   x: SX, y: SY,      width: SW, height: 16, align: 'center', verticalAlign: 'top' },
      { name: 'tagline',      x: SX, y: SY + 18, width: SW, height: 8,  align: 'center', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX, y: SY + SH - 10, width: SW, height: 10, align: 'center', verticalAlign: 'middle' },
    ],
  },

  // fl-a22 — Dark inset box for name, clean rest
  {
    id: 'fl-a22',
    category: 'text-only',
    name: 'Inset Name Box',
    description: 'Accent box frames just the name; contact floats freely below',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'graphite',
    regions: [
      { name: 'name-title',   x: SX + 2, y: SY + 2, width: SW - 4, height: 16, align: 'left', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX,     y: SY + 22, width: SW * 0.55, height: 22, align: 'left', verticalAlign: 'top' },
      { name: 'social',       x: SX + SW * 0.6, y: SY + 22, width: SW * 0.4, height: 22, align: 'left', verticalAlign: 'top' },
    ],
    renderBackground: (colors: ColorPalette, _w: number, _h: number) =>
      e('rect', { key: 'name-box', x: SX, y: SY, width: SW, height: 20, fill: colors.primary, opacity: 0.08, rx: 1 }),
  },

  // fl-a23 — Social media featured bottom row
  {
    id: 'fl-a23',
    category: 'text-only',
    name: 'Social Featured',
    description: 'Social handles spread across the full bottom of the card',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'graphite',
    regions: [
      { name: 'name-title',   x: SX, y: SY,           width: SW,       height: 18, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 20,      width: SW,       height: 14, align: 'left', verticalAlign: 'top' },
      { name: 'social',       x: SX, y: SY + SH - 10, width: SW,       height: 10, align: 'center', verticalAlign: 'middle' },
    ],
    renderBackground: (colors: ColorPalette, _w: number, _h: number) =>
      e('line', { key: 'social-rule', x1: SX, y1: SY + SH - 12, x2: SX + SW, y2: SY + SH - 12, stroke: colors.accent, strokeWidth: 0.3, opacity: 0.5 }),
  },

  // fl-a24 — Bold left bar accent, text indented
  {
    id: 'fl-a24',
    category: 'text-only',
    name: 'Left Bar Accent',
    description: 'Bold colored left edge bar; all text content indented',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'plum',
    regions: [
      { name: 'name-title',   x: SX + 10, y: SY,      width: SW - 10, height: 18, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX + 10, y: SY + 20, width: SW * 0.5, height: 22, align: 'left', verticalAlign: 'top' },
      { name: 'social',       x: SX + SW * 0.58, y: SY + 20, width: SW * 0.4, height: 22, align: 'left', verticalAlign: 'top' },
    ],
    renderBackground: (colors: ColorPalette, _w: number, h: number) =>
      e('rect', { key: 'left-bar', x: BL, y: 0, width: 5, height: h, fill: colors.primary }),
  },

  // fl-a25 — Full centered single-column, generous spacing
  {
    id: 'fl-a25',
    category: 'text-only',
    name: 'Stacked Center',
    description: 'Everything stacked in a single centered column with full vertical balance',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'arctic',
    regions: [
      { name: 'name-title',   x: SX, y: SY,      width: SW, height: 14, align: 'center', verticalAlign: 'top' },
      { name: 'tagline',      x: SX, y: SY + 15, width: SW, height: 7,  align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 24, width: SW, height: 12, align: 'center', verticalAlign: 'top' },
      { name: 'social',       x: SX, y: SY + 37, width: SW, height: 7,  align: 'center', verticalAlign: 'top' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// GROUP B — Logo featured, no portrait (~30 layouts)  fl-b01..fl-b30
// ─────────────────────────────────────────────────────────────────────────────

const groupB: FrontLayout[] = [
  // fl-b01 — Logo top-left, name below left
  {
    id: 'fl-b01',
    category: 'logo',
    name: 'Logo Top Left',
    description: 'Logo anchored top-left, name and contact cascade below',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'ocean',
    regions: [
      { name: 'logo',         x: SX,      y: SY,      width: 18, height: 10, align: 'left', verticalAlign: 'top' },
      { name: 'name-title',   x: SX,      y: SY + 13, width: SW, height: 16, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX,      y: SY + 30, width: SW * 0.55, height: 14, align: 'left', verticalAlign: 'top' },
      { name: 'social',       x: SX + SW * 0.6, y: SY + 30, width: SW * 0.4, height: 14, align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-b02 — Logo top-center
  {
    id: 'fl-b02',
    category: 'logo',
    name: 'Logo Top Center',
    description: 'Centered logo at the top, name and contact fully centered below',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'slate',
    regions: [
      { name: 'logo',         x: SX + SW / 2 - 12, y: SY, width: 24, height: 12, align: 'center', verticalAlign: 'top' },
      { name: 'name-title',   x: SX, y: SY + 14, width: SW, height: 14, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 30, width: SW, height: 14, align: 'center', verticalAlign: 'top' },
    ],
  },

  // fl-b03 — Logo top-right
  {
    id: 'fl-b03',
    category: 'logo',
    name: 'Logo Top Right',
    description: 'Logo anchored top-right; name and contact left-aligned',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'navy',
    regions: [
      { name: 'logo',         x: SX + SW - 20, y: SY, width: 20, height: 10, align: 'right', verticalAlign: 'top' },
      { name: 'name-title',   x: SX, y: SY + 2, width: SW * 0.65, height: 16, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 20, width: SW * 0.55, height: 24, align: 'left', verticalAlign: 'top' },
      { name: 'social',       x: SX + SW * 0.6, y: SY + 20, width: SW * 0.4, height: 24, align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-b04 — Logo bottom-left
  {
    id: 'fl-b04',
    category: 'logo',
    name: 'Logo Bottom Left',
    description: 'Logo tucked bottom-left; name and contact fill upper area',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'teal',
    regions: [
      { name: 'name-title',   x: SX,      y: SY,            width: SW,       height: 18, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX,      y: SY + 20,       width: SW * 0.55, height: 16, align: 'left', verticalAlign: 'top' },
      { name: 'social',       x: SX + SW * 0.6, y: SY + 20, width: SW * 0.4,  height: 16, align: 'left', verticalAlign: 'top' },
      { name: 'logo',         x: SX,      y: SY + SH - 10,  width: 18, height: 10, align: 'left', verticalAlign: 'bottom' },
    ],
  },

  // fl-b05 — Logo bottom-right
  {
    id: 'fl-b05',
    category: 'logo',
    name: 'Logo Bottom Right',
    description: 'Logo anchored bottom-right; gives a professional closing stamp',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'midnight',
    regions: [
      { name: 'name-title',   x: SX, y: SY,            width: SW,       height: 18, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 20,       width: SW * 0.6, height: 20, align: 'left', verticalAlign: 'top' },
      { name: 'social',       x: SX, y: SY + SH - 10,  width: SW * 0.6, height: 10, align: 'left', verticalAlign: 'top' },
      { name: 'logo',         x: SX + SW - 20, y: SY + SH - 12, width: 20, height: 12, align: 'right', verticalAlign: 'bottom' },
    ],
  },

  // fl-b06 — Large centered logo, name below
  {
    id: 'fl-b06',
    category: 'logo',
    name: 'Large Logo Centered',
    description: 'Oversized centered logo dominates; name and contact below',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'navy',
    regions: [
      { name: 'logo',         x: SX + SW / 2 - 20, y: SY,      width: 40, height: 20, align: 'center', verticalAlign: 'top' },
      { name: 'name-title',   x: SX, y: SY + 23, width: SW, height: 12, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 36, width: SW, height: 8,  align: 'center', verticalAlign: 'top' },
    ],
  },

  // fl-b07 — Small icon logo + full text layout
  {
    id: 'fl-b07',
    category: 'logo',
    name: 'Icon Logo Inline',
    description: 'Small icon logo sits inline with the company name line',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'charcoal',
    regions: [
      { name: 'logo',         x: SX,       y: SY + 2,  width: 8,  height: 8,  align: 'left', verticalAlign: 'middle' },
      { name: 'name-title',   x: SX + 10,  y: SY,      width: SW - 10, height: 16, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX,       y: SY + 20, width: SW * 0.55, height: 22, align: 'left', verticalAlign: 'top' },
      { name: 'social',       x: SX + SW * 0.6, y: SY + 20, width: SW * 0.4, height: 22, align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-b08 — Logo left sidebar, text right
  {
    id: 'fl-b08',
    category: 'logo',
    name: 'Logo Left Sidebar',
    description: 'Logo occupies a left sidebar; all text content runs right',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'arctic',
    regions: [
      { name: 'logo',         x: BL,      y: BL,  width: 22, height: CARD.HEIGHT, align: 'center', verticalAlign: 'middle' },
      { name: 'name-title',   x: SX + 22, y: SY,  width: SW - 22, height: 18, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX + 22, y: SY + 20, width: SW - 22, height: 16, align: 'left', verticalAlign: 'top' },
      { name: 'social',       x: SX + 22, y: SY + 36, width: SW - 22, height: 8,  align: 'left', verticalAlign: 'top' },
    ],
    renderBackground: (colors: ColorPalette, _w: number, h: number) =>
      e('rect', { key: 'logo-sidebar', x: 0, y: 0, width: 25, height: h, fill: colors.primary, opacity: 0.06 }),
  },

  // fl-b09 — Logo right sidebar, text left
  {
    id: 'fl-b09',
    category: 'logo',
    name: 'Logo Right Sidebar',
    description: 'Logo occupies a right sidebar; text content runs left',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'sunset',
    regions: [
      { name: 'name-title',   x: SX, y: SY,      width: SW - 27, height: 18, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 20, width: SW - 27, height: 16, align: 'left', verticalAlign: 'top' },
      { name: 'social',       x: SX, y: SY + 36, width: SW - 27, height: 8,  align: 'left', verticalAlign: 'top' },
      { name: 'logo',         x: W - 27, y: BL, width: 24, height: CARD.HEIGHT, align: 'center', verticalAlign: 'middle' },
    ],
    renderBackground: (colors: ColorPalette, w: number, h: number) =>
      e('rect', { key: 'logo-sidebar-r', x: w - 27, y: 0, width: 27, height: h, fill: colors.primary, opacity: 0.06 }),
  },

  // fl-b10 — Logo first, then name, minimal contact
  {
    id: 'fl-b10',
    category: 'logo',
    name: 'Logo First',
    description: 'Visual hierarchy: logo leads, name follows, contact is secondary',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'terra',
    regions: [
      { name: 'logo',         x: SX, y: SY,      width: SW * 0.4, height: 14, align: 'left', verticalAlign: 'top' },
      { name: 'name-title',   x: SX, y: SY + 16, width: SW,       height: 14, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 32, width: SW,       height: 12, align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-b11 — Logo with tagline on same row
  {
    id: 'fl-b11',
    category: 'logo',
    name: 'Logo Tagline Row',
    description: 'Logo and tagline share the top row; contact fills the lower area',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'burgundy',
    regions: [
      { name: 'logo',         x: SX,              y: SY,      width: SW * 0.35, height: 10, align: 'left',   verticalAlign: 'middle' },
      { name: 'tagline',      x: SX + SW * 0.38,  y: SY,      width: SW * 0.62, height: 10, align: 'right',  verticalAlign: 'middle' },
      { name: 'name-title',   x: SX,              y: SY + 12, width: SW,        height: 16, align: 'left',   verticalAlign: 'top' },
      { name: 'contact-info', x: SX,              y: SY + 30, width: SW,        height: 14, align: 'left',   verticalAlign: 'top' },
    ],
    renderBackground: (colors: ColorPalette, _w: number, _h: number) =>
      e('line', { key: 'logo-tag-rule', x1: SX, y1: SY + 11, x2: SX + SW, y2: SY + 11, stroke: colors.accent, strokeWidth: 0.3, opacity: 0.5 }),
  },

  // fl-b12 — Full bleed left color panel, logo in panel, text right
  {
    id: 'fl-b12',
    category: 'logo',
    name: 'Color Panel Logo',
    description: 'Left colored panel contains the logo; right panel holds all text',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'copper',
    regions: [
      { name: 'logo',         x: BL,          y: BL, width: W * 0.34 - BL, height: CARD.HEIGHT, align: 'center', verticalAlign: 'middle' },
      { name: 'name-title',   x: W * 0.42,    y: SY, width: W * 0.52,      height: 20, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: W * 0.42,    y: SY + 22, width: W * 0.52, height: 16, align: 'left', verticalAlign: 'top' },
      { name: 'social',       x: W * 0.42,    y: SY + 38, width: W * 0.52, height: 6,  align: 'left', verticalAlign: 'top' },
    ],
    renderBackground: (colors: ColorPalette, _w: number, h: number) =>
      e('rect', { key: 'color-panel', x: 0, y: 0, width: W * 0.37, height: h, fill: colors.primary }),
  },

  // fl-b13 — Logo bottom-center
  {
    id: 'fl-b13',
    category: 'logo',
    name: 'Logo Bottom Center',
    description: 'Logo centered at the bottom; name and contact fill top area',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'sage',
    regions: [
      { name: 'name-title',   x: SX, y: SY,          width: SW, height: 18, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 20,     width: SW, height: 14, align: 'center', verticalAlign: 'top' },
      { name: 'logo',         x: SX + SW / 2 - 14, y: SY + SH - 11, width: 28, height: 11, align: 'center', verticalAlign: 'bottom' },
    ],
  },

  // fl-b14 — Split horizontal: left for name, right for logo + contact
  {
    id: 'fl-b14',
    category: 'logo',
    name: 'Split Name Logo',
    description: 'Left half: name and title. Right half: logo on top, contact below',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'teal',
    regions: [
      { name: 'name-title',   x: SX,             y: SY, width: SW * 0.44, height: SH, align: 'left',   verticalAlign: 'middle' },
      { name: 'logo',         x: SX + SW * 0.5,  y: SY, width: SW * 0.5,  height: 14, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX + SW * 0.5,  y: SY + 16, width: SW * 0.5, height: SH - 16, align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-b15 — Neon-style: logo large left, contact cascades right
  {
    id: 'fl-b15',
    category: 'logo',
    name: 'Logo Large Left',
    description: 'Half-card width logo left; contact info stacked on the right',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'neon',
    regions: [
      { name: 'logo',         x: BL,         y: BL,  width: W * 0.42 - BL, height: CARD.HEIGHT, align: 'center', verticalAlign: 'middle' },
      { name: 'name-title',   x: W * 0.46,   y: SY,  width: W * 0.48,      height: 18, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: W * 0.46,   y: SY + 20, width: W * 0.48,  height: 18, align: 'left', verticalAlign: 'top' },
      { name: 'social',       x: W * 0.46,   y: SY + 38, width: W * 0.48,  height: 6,  align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-b16 — Fire: logo with bold accent stripe
  {
    id: 'fl-b16',
    category: 'logo',
    name: 'Stripe Logo',
    description: 'Bold left accent stripe; logo aligned with stripe at top',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'fire',
    regions: [
      { name: 'logo',         x: SX + 8, y: SY,      width: 20, height: 10, align: 'left', verticalAlign: 'top' },
      { name: 'name-title',   x: SX + 8, y: SY + 13, width: SW - 8, height: 16, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX + 8, y: SY + 30, width: (SW - 8) * 0.55, height: 14, align: 'left', verticalAlign: 'top' },
      { name: 'social',       x: SX + 8 + (SW - 8) * 0.6, y: SY + 30, width: (SW - 8) * 0.4, height: 14, align: 'left', verticalAlign: 'top' },
    ],
    renderBackground: (colors: ColorPalette, _w: number, h: number) =>
      e('rect', { key: 'stripe', x: BL, y: 0, width: 5, height: h, fill: colors.primary }),
  },

  // fl-b17 — Electric: logo centered, everything radial from center
  {
    id: 'fl-b17',
    category: 'logo',
    name: 'Centered Hub',
    description: 'Logo centered horizontally between name (above) and contact (below)',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'electric',
    regions: [
      { name: 'name-title',   x: SX, y: SY,         width: SW, height: 14, align: 'center', verticalAlign: 'top' },
      { name: 'logo',         x: SX + SW / 2 - 10, y: SY + 15, width: 20, height: 12, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 30,    width: SW, height: 14, align: 'center', verticalAlign: 'top' },
    ],
  },

  // fl-b18 — Ink: logo on dark background right panel
  {
    id: 'fl-b18',
    category: 'logo',
    name: 'Dark Panel Logo',
    description: 'Right panel is dark-colored; logo floats within it in white',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'ink',
    regions: [
      { name: 'name-title',   x: SX,          y: SY, width: SW * 0.54, height: 20, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX,          y: SY + 22, width: SW * 0.54, height: 22, align: 'left', verticalAlign: 'top' },
      { name: 'logo',         x: W * 0.58,    y: BL, width: W * 0.38, height: CARD.HEIGHT, align: 'center', verticalAlign: 'middle' },
    ],
    renderBackground: (colors: ColorPalette, w: number, h: number) =>
      e('rect', { key: 'dark-panel', x: w * 0.57, y: 0, width: w * 0.43, height: h, fill: colors.secondary }),
  },

  // fl-b19 — Cobalt: logo with corner accent
  {
    id: 'fl-b19',
    category: 'logo',
    name: 'Corner Logo',
    description: 'Logo in bottom-right corner; name and contact fill the rest',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'cobalt',
    regions: [
      { name: 'name-title',   x: SX, y: SY,           width: SW,       height: 18, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 20,      width: SW * 0.65, height: 22, align: 'left', verticalAlign: 'top' },
      { name: 'social',       x: SX, y: SY + SH - 10, width: SW * 0.65, height: 10, align: 'left', verticalAlign: 'top' },
      { name: 'logo',         x: SX + SW - 18, y: SY + SH - 14, width: 18, height: 14, align: 'right', verticalAlign: 'bottom' },
    ],
  },

  // fl-b20 — Emerald: logo row with horizontal dividers
  {
    id: 'fl-b20',
    category: 'logo',
    name: 'Logo Row Divider',
    description: 'Logo on its own row with dividing lines above and below',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'emerald',
    regions: [
      { name: 'name-title',   x: SX, y: SY,      width: SW, height: 14, align: 'left', verticalAlign: 'top' },
      { name: 'logo',         x: SX, y: SY + 16, width: SW, height: 10, align: 'center', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX, y: SY + 28, width: SW * 0.55, height: 16, align: 'left', verticalAlign: 'top' },
      { name: 'social',       x: SX + SW * 0.6,  y: SY + 28, width: SW * 0.4, height: 16, align: 'left', verticalAlign: 'top' },
    ],
    renderBackground: (colors: ColorPalette, _w: number, _h: number) =>
      e('g', { key: 'logo-dividers' },
        e('line', { x1: SX, y1: SY + 15, x2: SX + SW, y2: SY + 15, stroke: colors.accent, strokeWidth: 0.3, opacity: 0.5 }),
        e('line', { x1: SX, y1: SY + 27, x2: SX + SW, y2: SY + 27, stroke: colors.accent, strokeWidth: 0.3, opacity: 0.5 }),
      ),
  },

  // fl-b21 — Logo stacked on top, tagline below logo, contact at bottom
  {
    id: 'fl-b21',
    category: 'logo',
    name: 'Logo Stack',
    description: 'Vertical stack: logo, then tagline, then name, then contact',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'forest',
    regions: [
      { name: 'logo',         x: SX, y: SY,      width: SW,       height: 10, align: 'left', verticalAlign: 'top' },
      { name: 'tagline',      x: SX, y: SY + 12, width: SW,       height: 6,  align: 'left', verticalAlign: 'top' },
      { name: 'name-title',   x: SX, y: SY + 20, width: SW,       height: 12, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 33, width: SW * 0.6, height: 11, align: 'left', verticalAlign: 'top' },
      { name: 'social',       x: SX + SW * 0.65, y: SY + 33, width: SW * 0.35, height: 11, align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-b22 — Logo + name same row (company-first business card)
  {
    id: 'fl-b22',
    category: 'logo',
    name: 'Brand Forward',
    description: 'Logo and company name share the top row — brand identity first',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'lavender',
    regions: [
      { name: 'logo',         x: SX,             y: SY,      width: 14, height: 12, align: 'left',  verticalAlign: 'middle' },
      { name: 'name-title',   x: SX + 16,        y: SY,      width: SW - 16, height: 12, align: 'left', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX,             y: SY + 14, width: SW * 0.55, height: 20, align: 'left', verticalAlign: 'top' },
      { name: 'social',       x: SX + SW * 0.6,  y: SY + 14, width: SW * 0.4, height: 20, align: 'left', verticalAlign: 'top' },
      { name: 'tagline',      x: SX,             y: SY + 35, width: SW,       height: 9,  align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-b23 — Logo fills top half (banner-style)
  {
    id: 'fl-b23',
    category: 'logo',
    name: 'Logo Banner',
    description: 'Logo stretches across the full top half; contact below',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'ocean',
    regions: [
      { name: 'logo',         x: BL, y: BL, width: CARD.WIDTH, height: H * 0.45 - BL, align: 'center', verticalAlign: 'middle' },
      { name: 'name-title',   x: SX, y: H * 0.47, width: SW,       height: 12, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: H * 0.47 + 14, width: SW, height: 12, align: 'center', verticalAlign: 'top' },
    ],
  },

  // fl-b24 — Logo in full bleed bottom half
  {
    id: 'fl-b24',
    category: 'logo',
    name: 'Logo Bottom Half',
    description: 'Name at top; logo occupies the entire bottom half of the card',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'burgundy',
    regions: [
      { name: 'name-title',   x: SX, y: SY,          width: SW, height: 16, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 18,     width: SW, height: 10, align: 'left', verticalAlign: 'top' },
      { name: 'logo',         x: BL, y: H * 0.5,     width: CARD.WIDTH, height: H * 0.5 - BL, align: 'center', verticalAlign: 'middle' },
    ],
    renderBackground: (colors: ColorPalette, w: number, h: number) =>
      e('rect', { key: 'logo-bg', x: 0, y: h * 0.5, width: w, height: h * 0.5, fill: colors.primary, opacity: 0.06 }),
  },

  // fl-b25 — Diagonal split: logo top-right triangle, text bottom-left
  {
    id: 'fl-b25',
    category: 'logo',
    name: 'Diagonal Split Logo',
    description: 'Diagonal line separates logo zone (top-right) from text zone (bottom-left)',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'slate',
    regions: [
      { name: 'logo',         x: W * 0.55, y: BL,      width: W * 0.4,    height: H * 0.45, align: 'center', verticalAlign: 'middle' },
      { name: 'name-title',   x: SX,       y: SY + 4,  width: SW * 0.55,  height: 18, align: 'left',   verticalAlign: 'top' },
      { name: 'contact-info', x: SX,       y: SY + 24, width: SW * 0.65,  height: 20, align: 'left',   verticalAlign: 'top' },
    ],
    renderBackground: (colors: ColorPalette, w: number, h: number) =>
      e('path', { key: 'diag', d: `M${w * 0.5},0 L${w},${h * 0.5} L${w},0 Z`, fill: colors.primary, opacity: 0.07 }),
  },

  // fl-b26 — Logo with geometric background accent
  {
    id: 'fl-b26',
    category: 'logo',
    name: 'Geometric Logo',
    description: 'Logo floats on a geometric accent shape; text left-aligned',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'charcoal',
    regions: [
      { name: 'name-title',   x: SX, y: SY + 2,  width: SW * 0.58, height: 16, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 20, width: SW * 0.58, height: 22, align: 'left', verticalAlign: 'top' },
      { name: 'logo',         x: W * 0.63, y: SY, width: W * 0.32, height: SH, align: 'center', verticalAlign: 'middle' },
    ],
    renderBackground: (colors: ColorPalette, w: number, h: number) =>
      e('circle', { key: 'geo-circle', cx: w * 0.82, cy: h * 0.45, r: 22, fill: colors.primary, opacity: 0.08 }),
  },

  // fl-b27 — Logo small, tagline prominent, contact below
  {
    id: 'fl-b27',
    category: 'logo',
    name: 'Tagline With Logo',
    description: 'Small logo top-left; large tagline dominates the middle',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'midnight',
    regions: [
      { name: 'logo',         x: SX,         y: SY,      width: 14, height: 8,  align: 'left',   verticalAlign: 'top' },
      { name: 'name-title',   x: SX,         y: SY + 10, width: SW, height: 12, align: 'left',   verticalAlign: 'top' },
      { name: 'tagline',      x: SX,         y: SY + 24, width: SW, height: 8,  align: 'left',   verticalAlign: 'middle' },
      { name: 'contact-info', x: SX,         y: SY + 34, width: SW, height: 10, align: 'left',   verticalAlign: 'top' },
    ],
  },

  // fl-b28 — Right-aligned logo at top, right-aligned everything
  {
    id: 'fl-b28',
    category: 'logo',
    name: 'All Right With Logo',
    description: 'Logo top-right; all text right-aligned for a unified right-edge layout',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'copper',
    regions: [
      { name: 'logo',         x: SX + SW - 20, y: SY,      width: 20, height: 10, align: 'right', verticalAlign: 'top' },
      { name: 'name-title',   x: SX, y: SY + 12, width: SW, height: 16, align: 'right', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 30, width: SW, height: 14, align: 'right', verticalAlign: 'top' },
    ],
  },

  // fl-b29 — Logo inline at end of tagline
  {
    id: 'fl-b29',
    category: 'logo',
    name: 'Inline Logo Tagline',
    description: 'Logo appears inline at the right end of the tagline row',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'electric',
    regions: [
      { name: 'name-title',   x: SX, y: SY,      width: SW,        height: 16, align: 'left',   verticalAlign: 'top' },
      { name: 'tagline',      x: SX, y: SY + 18, width: SW * 0.7,  height: 7,  align: 'left',   verticalAlign: 'middle' },
      { name: 'logo',         x: SX + SW * 0.73, y: SY + 16, width: SW * 0.27, height: 10, align: 'right', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX, y: SY + 28, width: SW,        height: 16, align: 'left',   verticalAlign: 'top' },
    ],
  },

  // fl-b30 — Logo framed, centered card
  {
    id: 'fl-b30',
    category: 'logo',
    name: 'Framed Logo Center',
    description: 'Decorative frame; logo centered top; name and contact perfectly balanced',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'champagne',
    regions: [
      { name: 'logo',         x: SX + SW / 2 - 10, y: SY + 2, width: 20, height: 10, align: 'center', verticalAlign: 'top' },
      { name: 'name-title',   x: SX + 4,           y: SY + 14, width: SW - 8, height: 14, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX + 4,           y: SY + 30, width: SW - 8, height: 12, align: 'center', verticalAlign: 'top' },
    ],
    renderBackground: (colors: ColorPalette, w: number, h: number) => {
      const off = 2.5;
      return e('rect', { key: 'frame', x: off, y: off, width: w - off * 2, height: h - off * 2, fill: 'none', stroke: colors.accent, strokeWidth: 0.35, opacity: 0.4, rx: 1 });
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// GROUP C — Portrait featured, no logo (~25 layouts)  fl-c01..fl-c25
// ─────────────────────────────────────────────────────────────────────────────

const groupC: FrontLayout[] = [
  // fl-c01 — Portrait left sidebar, text right
  {
    id: 'fl-c01',
    category: 'portrait',
    name: 'Portrait Left Sidebar',
    description: 'Full-height portrait in left sidebar; contact info on the right',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'ocean',
    regions: [
      { name: 'portrait',     x: BL, y: BL, width: 24, height: CARD.HEIGHT, align: 'center', verticalAlign: 'top', clipShape: 'rect' },
      { name: 'name-title',   x: SX + 26, y: SY,      width: SW - 26, height: 18, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX + 26, y: SY + 20, width: SW - 26, height: 16, align: 'left', verticalAlign: 'top' },
      { name: 'social',       x: SX + 26, y: SY + 36, width: SW - 26, height: 8,  align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-c02 — Portrait right sidebar
  {
    id: 'fl-c02',
    category: 'portrait',
    name: 'Portrait Right Sidebar',
    description: 'Full-height portrait on the right; text content on the left',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'slate',
    regions: [
      { name: 'name-title',   x: SX, y: SY,      width: SW - 24, height: 18, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 20, width: SW - 24, height: 16, align: 'left', verticalAlign: 'top' },
      { name: 'social',       x: SX, y: SY + 36, width: SW - 24, height: 8,  align: 'left', verticalAlign: 'top' },
      { name: 'portrait',     x: W - BL - 24, y: BL, width: 24, height: CARD.HEIGHT, align: 'center', verticalAlign: 'top', clipShape: 'rect' },
    ],
  },

  // fl-c03 — Portrait top half, text bottom
  {
    id: 'fl-c03',
    category: 'portrait',
    name: 'Portrait Top Half',
    description: 'Portrait fills the top half of the card; text below',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'navy',
    regions: [
      { name: 'portrait',     x: 0, y: 0, width: W, height: H * 0.48, align: 'center', verticalAlign: 'top', clipShape: 'rect' },
      { name: 'name-title',   x: SX, y: H * 0.5 + 2, width: SW * 0.6,  height: 14, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: H * 0.5 + 17, width: SW, height: 12, align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-c04 — Small corner portrait, top-left
  {
    id: 'fl-c04',
    category: 'portrait',
    name: 'Portrait Corner Small',
    description: 'Small circular portrait in the top-left corner; text runs right',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'sunset',
    regions: [
      { name: 'portrait',     x: SX,       y: SY, width: 16, height: 16, align: 'center', verticalAlign: 'top', clipShape: 'circle' },
      { name: 'name-title',   x: SX + 19,  y: SY, width: SW - 19, height: 16, align: 'left', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX,       y: SY + 18, width: SW * 0.55, height: 22, align: 'left', verticalAlign: 'top' },
      { name: 'social',       x: SX + SW * 0.6, y: SY + 18, width: SW * 0.4, height: 22, align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-c05 — Full-bleed portrait with overlay text
  {
    id: 'fl-c05',
    category: 'portrait',
    name: 'Portrait Overlay',
    description: 'Portrait fills the entire card; text overlaid at the bottom',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'copper',
    regions: [
      { name: 'portrait',     x: 0, y: 0, width: W, height: H, align: 'center', verticalAlign: 'top', clipShape: 'rect' },
      { name: 'name-title',   x: SX + 2, y: H - 26, width: SW - 4, height: 12, align: 'left', verticalAlign: 'bottom', textColorOverride: '#ffffff' },
      { name: 'contact-info', x: SX + 2, y: H - 14, width: SW - 4, height: 10, align: 'left', verticalAlign: 'top' },
    ],
    renderBackground: (_colors: ColorPalette, w: number, h: number) =>
      e('g', { key: 'overlay-group' },
        e('defs', {},
          e('linearGradient', { id: 'portrait-overlay-grad', x1: '0', y1: '0', x2: '0', y2: '1' },
            e('stop', { offset: '0%', stopColor: '#000000', stopOpacity: 0 }),
            e('stop', { offset: '100%', stopColor: '#000000', stopOpacity: 0.65 }),
          ),
        ),
        e('rect', { x: 0, y: h * 0.45, width: w, height: h * 0.55, fill: 'url(#portrait-overlay-grad)' }),
      ),
  },

  // fl-c06 — Portrait left, all content centered on right half
  {
    id: 'fl-c06',
    category: 'portrait',
    name: 'Portrait Left Centered Text',
    description: 'Portrait on left; name and contact centered in the right half',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'forest',
    regions: [
      { name: 'portrait',     x: BL, y: BL, width: W * 0.4 - BL, height: CARD.HEIGHT, align: 'center', verticalAlign: 'top', clipShape: 'rect' },
      { name: 'name-title',   x: W * 0.42, y: SY, width: W * 0.52, height: 20, align: 'center', verticalAlign: 'middle' },
      { name: 'contact-info', x: W * 0.42, y: SY + 22, width: W * 0.52, height: 22, align: 'center', verticalAlign: 'top' },
    ],
  },

  // fl-c07 — Small portrait top-right corner
  {
    id: 'fl-c07',
    category: 'portrait',
    name: 'Portrait Top Right Corner',
    description: 'Small portrait in top-right corner; name and contact left-aligned',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'lavender',
    regions: [
      { name: 'name-title',   x: SX, y: SY,      width: SW * 0.65, height: 18, align: 'left', verticalAlign: 'top' },
      { name: 'portrait',     x: SX + SW - 16, y: SY, width: 16, height: 16, align: 'right', verticalAlign: 'top', clipShape: 'circle' },
      { name: 'contact-info', x: SX, y: SY + 20, width: SW * 0.65, height: 24, align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-c08 — Portrait right, text left with rose-gold divider
  {
    id: 'fl-c08',
    category: 'portrait',
    name: 'Portrait Right Divider',
    description: 'Portrait on right with accent-line divider; text on left',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'rose-gold',
    regions: [
      { name: 'name-title',   x: SX, y: SY,      width: SW * 0.52, height: 18, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 20, width: SW * 0.52, height: 24, align: 'left', verticalAlign: 'top' },
      { name: 'portrait',     x: W * 0.58, y: BL, width: W * 0.38, height: CARD.HEIGHT, align: 'center', verticalAlign: 'top', clipShape: 'rect' },
    ],
    renderBackground: (colors: ColorPalette, _w: number, h: number) =>
      e('line', { key: 'divider', x1: W * 0.57, y1: h * 0.1, x2: W * 0.57, y2: h * 0.9, stroke: colors.accent, strokeWidth: 0.35, opacity: 0.5 }),
  },

  // fl-c09 — Large circular portrait centered top
  {
    id: 'fl-c09',
    category: 'portrait',
    name: 'Circle Portrait Center Top',
    description: 'Large circular portrait centered at the top; text content below',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'blush',
    regions: [
      { name: 'portrait',     x: SX + SW / 2 - 14, y: SY, width: 28, height: 28, align: 'center', verticalAlign: 'top', clipShape: 'circle' },
      { name: 'name-title',   x: SX, y: SY + 30, width: SW, height: 12, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 43, width: SW, height: 8,  align: 'center', verticalAlign: 'top' },
    ],
  },

  // fl-c10 — Portrait large left, minimal text right
  {
    id: 'fl-c10',
    category: 'portrait',
    name: 'Portrait Large Left Minimal',
    description: 'Large portrait occupies two-thirds left; minimal text on right',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'emerald',
    regions: [
      { name: 'portrait',     x: 0, y: 0, width: W * 0.62, height: H, align: 'center', verticalAlign: 'top', clipShape: 'rect' },
      { name: 'name-title',   x: W * 0.65, y: SY, width: W * 0.30, height: SH * 0.5, align: 'left', verticalAlign: 'middle' },
      { name: 'contact-info', x: W * 0.65, y: SY + SH * 0.55, width: W * 0.30, height: SH * 0.45, align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-c11 — Plum: portrait bottom-right, text upper area
  {
    id: 'fl-c11',
    category: 'portrait',
    name: 'Portrait Bottom Right',
    description: 'Name and contact fill the top; portrait tucked in the bottom-right',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'plum',
    regions: [
      { name: 'name-title',   x: SX,       y: SY,          width: SW,       height: 18, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX,       y: SY + 20,     width: SW * 0.6, height: 24, align: 'left', verticalAlign: 'top' },
      { name: 'portrait',     x: W * 0.65, y: H * 0.45,    width: W * 0.3,  height: H * 0.5, align: 'center', verticalAlign: 'top', clipShape: 'rounded' },
    ],
  },

  // fl-c12 — Portrait strips left sidebar, rounded clip
  {
    id: 'fl-c12',
    category: 'portrait',
    name: 'Rounded Portrait Sidebar',
    description: 'Rounded-corner portrait in left sidebar; text right',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'teal',
    regions: [
      { name: 'portrait',     x: BL + 1, y: BL + 1, width: 22, height: CARD.HEIGHT - 2, align: 'center', verticalAlign: 'top', clipShape: 'rounded' },
      { name: 'name-title',   x: SX + 25, y: SY,      width: SW - 25, height: 18, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX + 25, y: SY + 20, width: SW - 25, height: 16, align: 'left', verticalAlign: 'top' },
      { name: 'social',       x: SX + 25, y: SY + 36, width: SW - 25, height: 8,  align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-c13 — Portrait full-bleed right two-thirds
  {
    id: 'fl-c13',
    category: 'portrait',
    name: 'Portrait Right Two Thirds',
    description: 'Text on the left third; portrait dominates the right two-thirds',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'midnight',
    regions: [
      { name: 'name-title',   x: SX, y: SY,      width: W * 0.32, height: SH * 0.5, align: 'left', verticalAlign: 'middle', textColorOverride: '#ffffff' },
      { name: 'contact-info', x: SX, y: SY + SH * 0.55, width: W * 0.32, height: SH * 0.45, align: 'left', verticalAlign: 'top' },
      { name: 'portrait',     x: W * 0.38, y: 0, width: W * 0.62, height: H, align: 'center', verticalAlign: 'top', clipShape: 'rect' },
    ],
    renderBackground: (colors: ColorPalette, _w: number, h: number) =>
      e('rect', { key: 'text-panel', x: 0, y: 0, width: W * 0.37, height: h, fill: colors.primary }),
  },

  // fl-c14 — Portrait with tagline below it
  {
    id: 'fl-c14',
    category: 'portrait',
    name: 'Portrait With Tagline',
    description: 'Medium portrait left; tagline below it; contact on the right',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'copper',
    regions: [
      { name: 'portrait',     x: SX,       y: SY,      width: 20, height: 20, align: 'center', verticalAlign: 'top', clipShape: 'circle' },
      { name: 'tagline',      x: SX,       y: SY + 22, width: 20, height: 8,  align: 'center', verticalAlign: 'top' },
      { name: 'name-title',   x: SX + 24,  y: SY,      width: SW - 24, height: 18, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX + 24,  y: SY + 20, width: SW - 24, height: 24, align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-c15 — Portrait top strip (passport style)
  {
    id: 'fl-c15',
    category: 'portrait',
    name: 'Portrait Top Strip',
    description: 'Portrait in a top strip alongside name; contact below the strip',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'navy',
    regions: [
      { name: 'portrait',     x: BL, y: BL, width: 17, height: 17, align: 'center', verticalAlign: 'top', clipShape: 'rect' },
      { name: 'name-title',   x: SX + 17, y: BL, width: SW - 17, height: 18, align: 'left', verticalAlign: 'middle', textColorOverride: '#ffffff' },
      { name: 'contact-info', x: SX, y: SY + 15, width: SW * 0.55, height: 24, align: 'left', verticalAlign: 'top' },
      { name: 'social',       x: SX + SW * 0.6, y: SY + 15, width: SW * 0.4, height: 24, align: 'left', verticalAlign: 'top' },
    ],
    renderBackground: (colors: ColorPalette, w: number, _h: number) =>
      e('rect', { key: 'top-strip', x: 0, y: 0, width: w, height: 20, fill: colors.primary }),
  },

  // fl-c16 — Portrait bottom-left corner
  {
    id: 'fl-c16',
    category: 'portrait',
    name: 'Portrait Bottom Left',
    description: 'Portrait in the bottom-left; name and contact fill the rest',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'sage',
    regions: [
      { name: 'name-title',   x: SX,       y: SY,         width: SW,       height: 18, align: 'right', verticalAlign: 'top' },
      { name: 'contact-info', x: SX + 22,  y: SY + 20,    width: SW - 22,  height: 24, align: 'right', verticalAlign: 'top' },
      { name: 'portrait',     x: BL, y: H - BL - 18, width: 18, height: 18, align: 'center', verticalAlign: 'top', clipShape: 'circle' },
    ],
  },

  // fl-c17 — Portrait center-left, text wraps right
  {
    id: 'fl-c17',
    category: 'portrait',
    name: 'Portrait Center Left',
    description: 'Square portrait in the vertical center-left; text on right',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'ocean',
    regions: [
      { name: 'portrait',     x: SX,       y: SY + SH / 2 - 14, width: 20, height: 20, align: 'center', verticalAlign: 'top', clipShape: 'rounded' },
      { name: 'name-title',   x: SX + 24,  y: SY,      width: SW - 24, height: 18, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX + 24,  y: SY + 20, width: SW - 24, height: 24, align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-c18 — Portrait center-right
  {
    id: 'fl-c18',
    category: 'portrait',
    name: 'Portrait Center Right',
    description: 'Square portrait centered vertically on the right; text on left',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'burgundy',
    regions: [
      { name: 'name-title',   x: SX,              y: SY,           width: SW - 24, height: 18, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX,              y: SY + 20,      width: SW - 24, height: 24, align: 'left', verticalAlign: 'top' },
      { name: 'portrait',     x: SX + SW - 20,    y: SY + SH / 2 - 14, width: 20, height: 20, align: 'center', verticalAlign: 'top', clipShape: 'rounded' },
    ],
  },

  // fl-c19 — Large portrait with color band overlay at bottom
  {
    id: 'fl-c19',
    category: 'portrait',
    name: 'Portrait Color Band',
    description: 'Large portrait; a colored band overlaps the bottom third with text',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'electric',
    regions: [
      { name: 'portrait',     x: BL, y: BL, width: CARD.WIDTH, height: CARD.HEIGHT, align: 'center', verticalAlign: 'top', clipShape: 'rect' },
      { name: 'name-title',   x: SX + 2, y: H * 0.56, width: SW - 4, height: 12, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX + 2, y: H * 0.56 + 13, width: SW - 4, height: 10, align: 'left', verticalAlign: 'top' },
    ],
    renderBackground: (colors: ColorPalette, w: number, h: number) =>
      e('rect', { key: 'band', x: 0, y: h * 0.54, width: w, height: h * 0.46, fill: colors.secondary, opacity: 0.85 }),
  },

  // fl-c20 — Two portraits (main + small), text in center
  {
    id: 'fl-c20',
    category: 'portrait',
    name: 'Portrait Plus Contact',
    description: 'Portrait left, contact right, everything centered vertically',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'champagne',
    regions: [
      { name: 'portrait',     x: SX,       y: SY + SH / 2 - 18, width: 26, height: 36, align: 'center', verticalAlign: 'top', clipShape: 'rounded' },
      { name: 'name-title',   x: SX + 30,  y: SY,      width: SW - 30, height: 18, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX + 30,  y: SY + 20, width: SW - 30, height: 24, align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-c21 — Portrait above name, portrait top-center small
  {
    id: 'fl-c21',
    category: 'portrait',
    name: 'Portrait Above Name',
    description: 'Small portrait sits directly above the name; all centered',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'rose-gold',
    regions: [
      { name: 'portrait',     x: SX + SW / 2 - 10, y: SY, width: 20, height: 20, align: 'center', verticalAlign: 'top', clipShape: 'circle' },
      { name: 'name-title',   x: SX, y: SY + 22, width: SW, height: 12, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 36, width: SW, height: 12, align: 'center', verticalAlign: 'top' },
    ],
  },

  // fl-c22 — Portrait strip at bottom
  {
    id: 'fl-c22',
    category: 'portrait',
    name: 'Portrait Bottom Strip',
    description: 'Wide portrait strip spans the bottom; text fills the top',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'blush',
    regions: [
      { name: 'name-title',   x: SX, y: SY,           width: SW, height: 16, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 18,      width: SW, height: 14, align: 'left', verticalAlign: 'top' },
      { name: 'portrait',     x: BL, y: H * 0.6,      width: CARD.WIDTH, height: CARD.HEIGHT * 0.4, align: 'center', verticalAlign: 'top', clipShape: 'rect' },
    ],
  },

  // fl-c23 — Polaroid style portrait
  {
    id: 'fl-c23',
    category: 'portrait',
    name: 'Polaroid Style',
    description: 'Portrait in a framed "polaroid" box on the left; text right',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'cream',
    regions: [
      { name: 'portrait',     x: SX + 1, y: SY + 1, width: 22, height: 22, align: 'center', verticalAlign: 'top', clipShape: 'rect' },
      { name: 'name-title',   x: SX + 28, y: SY,       width: SW - 28, height: 18, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX + 28, y: SY + 20,  width: SW - 28, height: 24, align: 'left', verticalAlign: 'top' },
    ],
    renderBackground: (colors: ColorPalette, _w: number, _h: number) =>
      e('rect', { key: 'polaroid', x: SX, y: SY, width: 24, height: 26, fill: 'none', stroke: colors.accent, strokeWidth: 0.35, opacity: 0.5, rx: 0.5 }),
  },

  // fl-c24 — Tall narrow portrait left strip
  {
    id: 'fl-c24',
    category: 'portrait',
    name: 'Narrow Portrait Strip',
    description: 'Very narrow portrait strip on far left edge; compact text right',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'graphite',
    regions: [
      { name: 'portrait',     x: BL, y: BL, width: 14, height: CARD.HEIGHT, align: 'center', verticalAlign: 'top', clipShape: 'rect' },
      { name: 'name-title',   x: SX + 12, y: SY,       width: SW - 12, height: 18, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX + 12, y: SY + 20,  width: SW - 12, height: 14, align: 'left', verticalAlign: 'top' },
      { name: 'social',       x: SX + 12, y: SY + 35,  width: SW - 12, height: 9,  align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-c25 — Portrait fills right, text on left with background color
  {
    id: 'fl-c25',
    category: 'portrait',
    name: 'Portrait Right Color Left',
    description: 'Left half colored background with white text; portrait fills the right',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'midnight',
    regions: [
      { name: 'name-title',   x: SX, y: SY,      width: W * 0.44, height: 20, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 22, width: W * 0.44, height: 22, align: 'left', verticalAlign: 'top' },
      { name: 'portrait',     x: W * 0.46, y: BL, width: W * 0.5, height: CARD.HEIGHT, align: 'center', verticalAlign: 'top', clipShape: 'rect' },
    ],
    renderBackground: (colors: ColorPalette, _w: number, h: number) =>
      e('rect', { key: 'color-left', x: 0, y: 0, width: W * 0.47, height: h, fill: colors.primary }),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// GROUP D — Both portrait and logo (~12 layouts)  fl-d01..fl-d12
// ─────────────────────────────────────────────────────────────────────────────

const groupD: FrontLayout[] = [
  // fl-d01 — Portrait left, logo top-right, contact bottom-right
  {
    id: 'fl-d01',
    category: 'logo-portrait',
    name: 'Portrait Left Logo Right',
    description: 'Portrait sidebar left; logo top-right; contact below logo',
    supports: { portrait: true, logo: true, qrCode: false },
    defaultPaletteId: 'rose-gold',
    regions: [
      { name: 'portrait',     x: BL, y: BL, width: 22, height: CARD.HEIGHT, align: 'center', verticalAlign: 'top', clipShape: 'rect' },
      { name: 'logo',         x: SX + 20,          y: SY,      width: SW - 20, height: 10, align: 'right', verticalAlign: 'top' },
      { name: 'name-title',   x: SX + 20,          y: SY + 12, width: SW - 20, height: 16, align: 'left',  verticalAlign: 'top' },
      { name: 'contact-info', x: SX + 20,          y: SY + 30, width: SW - 20, height: 14, align: 'left',  verticalAlign: 'top' },
    ],
  },

  // fl-d02 — Portrait right, logo top-left
  {
    id: 'fl-d02',
    category: 'logo-portrait',
    name: 'Portrait Right Logo Left',
    description: 'Portrait sidebar right; logo top-left; name and contact center',
    supports: { portrait: true, logo: true, qrCode: false },
    defaultPaletteId: 'champagne',
    regions: [
      { name: 'logo',         x: SX,               y: SY,      width: 18, height: 10, align: 'left',  verticalAlign: 'top' },
      { name: 'name-title',   x: SX,               y: SY + 12, width: SW - 24, height: 16, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX,               y: SY + 30, width: SW - 24, height: 14, align: 'left', verticalAlign: 'top' },
      { name: 'portrait',     x: W - BL - 22, y: BL, width: 22, height: CARD.HEIGHT, align: 'center', verticalAlign: 'top', clipShape: 'rect' },
    ],
  },

  // fl-d03 — Small portrait corner, large logo center
  {
    id: 'fl-d03',
    category: 'logo-portrait',
    name: 'Logo Center Portrait Corner',
    description: 'Large centered logo; small portrait in bottom-right corner',
    supports: { portrait: true, logo: true, qrCode: false },
    defaultPaletteId: 'blush',
    regions: [
      { name: 'name-title',   x: SX, y: SY,      width: SW,       height: 14, align: 'left', verticalAlign: 'top' },
      { name: 'logo',         x: SX + SW / 2 - 16, y: SY + 15, width: 32, height: 16, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 33, width: SW * 0.65, height: 11, align: 'left', verticalAlign: 'top' },
      { name: 'portrait',     x: SX + SW - 16, y: SY + SH - 18, width: 16, height: 18, align: 'right', verticalAlign: 'bottom', clipShape: 'circle' },
    ],
  },

  // fl-d04 — Portrait top-left corner, logo top-right corner
  {
    id: 'fl-d04',
    category: 'logo-portrait',
    name: 'Portrait Logo Corners',
    description: 'Portrait in top-left corner; logo in top-right corner; content below',
    supports: { portrait: true, logo: true, qrCode: false },
    defaultPaletteId: 'ocean',
    regions: [
      { name: 'portrait',     x: SX,               y: SY, width: 14, height: 14, align: 'left',  verticalAlign: 'top', clipShape: 'circle' },
      { name: 'logo',         x: SX + SW - 18,     y: SY, width: 18, height: 10, align: 'right', verticalAlign: 'top' },
      { name: 'name-title',   x: SX,               y: SY + 16, width: SW, height: 16, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX,               y: SY + 34, width: SW, height: 10, align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-d05 — Portrait and logo share a header strip
  {
    id: 'fl-d05',
    category: 'logo-portrait',
    name: 'Portrait Logo Header',
    description: 'Portrait on left of header; logo on right; contact fills the body',
    supports: { portrait: true, logo: true, qrCode: false },
    defaultPaletteId: 'navy',
    regions: [
      { name: 'portrait',     x: BL,               y: BL, width: 18, height: 18, align: 'left',  verticalAlign: 'top', clipShape: 'rect' },
      { name: 'logo',         x: W - BL - 20,      y: BL, width: 20, height: 18, align: 'right', verticalAlign: 'top' },
      { name: 'name-title',   x: SX + 20,          y: BL, width: SW - 42, height: 18, align: 'center', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX,               y: SY + 16, width: SW, height: 16, align: 'center', verticalAlign: 'top' },
      { name: 'social',       x: SX,               y: SY + 33, width: SW, height: 10, align: 'center', verticalAlign: 'top' },
    ],
    renderBackground: (colors: ColorPalette, w: number, _h: number) =>
      e('rect', { key: 'header', x: 0, y: 0, width: w, height: 20, fill: colors.primary }),
  },

  // fl-d06 — Portrait centered large, logo small above portrait
  {
    id: 'fl-d06',
    category: 'logo-portrait',
    name: 'Logo Above Portrait',
    description: 'Logo centered above a large portrait; name and contact right',
    supports: { portrait: true, logo: true, qrCode: false },
    defaultPaletteId: 'slate',
    regions: [
      { name: 'logo',         x: SX,               y: SY, width: 22, height: 10, align: 'left', verticalAlign: 'top' },
      { name: 'portrait',     x: SX,               y: SY + 12, width: 22, height: 28, align: 'center', verticalAlign: 'top', clipShape: 'rounded' },
      { name: 'name-title',   x: SX + 26,          y: SY, width: SW - 26, height: 18, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX + 26,          y: SY + 20, width: SW - 26, height: 24, align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-d07 — Portrait bottom-left, logo top-right
  {
    id: 'fl-d07',
    category: 'logo-portrait',
    name: 'Diagonal Portrait Logo',
    description: 'Portrait bottom-left, logo top-right — diagonal tension',
    supports: { portrait: true, logo: true, qrCode: false },
    defaultPaletteId: 'midnight',
    regions: [
      { name: 'logo',         x: SX + SW - 20,     y: SY, width: 20, height: 12, align: 'right', verticalAlign: 'top' },
      { name: 'name-title',   x: SX,               y: SY, width: SW - 24, height: 18, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX + 18,          y: SY + 20, width: SW - 18, height: 16, align: 'left', verticalAlign: 'top' },
      { name: 'portrait',     x: BL, y: H - BL - 18, width: 18, height: 18, align: 'left', verticalAlign: 'bottom', clipShape: 'circle' },
    ],
  },

  // fl-d08 — Both portrait and logo in colored sidebar
  {
    id: 'fl-d08',
    category: 'logo-portrait',
    name: 'Sidebar Portrait And Logo',
    description: 'Colored left sidebar hosts both portrait and logo stacked vertically',
    supports: { portrait: true, logo: true, qrCode: false },
    defaultPaletteId: 'charcoal',
    regions: [
      { name: 'logo',         x: BL,               y: BL + 2, width: 22, height: 10, align: 'center', verticalAlign: 'top' },
      { name: 'portrait',     x: BL,               y: BL + 15, width: 22, height: 28, align: 'center', verticalAlign: 'top', clipShape: 'rect' },
      { name: 'name-title',   x: SX + 22,          y: SY, width: SW - 22, height: 18, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX + 22,          y: SY + 20, width: SW - 22, height: 24, align: 'left', verticalAlign: 'top' },
    ],
    renderBackground: (colors: ColorPalette, _w: number, h: number) =>
      e('rect', { key: 'sidebar', x: 0, y: 0, width: 25, height: h, fill: colors.primary }),
  },

  // fl-d09 — Portrait right sidebar, logo in header
  {
    id: 'fl-d09',
    category: 'logo-portrait',
    name: 'Logo Header Portrait Right',
    description: 'Logo in colored header; portrait in right sidebar; text in body',
    supports: { portrait: true, logo: true, qrCode: false },
    defaultPaletteId: 'forest',
    regions: [
      { name: 'logo',         x: SX,               y: BL, width: SW - 24, height: 14, align: 'left', verticalAlign: 'middle' },
      { name: 'portrait',     x: W - BL - 22, y: BL, width: 22, height: CARD.HEIGHT, align: 'center', verticalAlign: 'top', clipShape: 'rect' },
      { name: 'name-title',   x: SX,               y: SY + 12, width: SW - 26, height: 16, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX,               y: SY + 30, width: SW - 26, height: 14, align: 'left', verticalAlign: 'top' },
    ],
    renderBackground: (colors: ColorPalette, w: number, _h: number) =>
      e('rect', { key: 'hdr', x: 0, y: 0, width: w, height: 17, fill: colors.primary }),
  },

  // fl-d10 — Portrait large center, logo small top-left, contact bottom
  {
    id: 'fl-d10',
    category: 'logo-portrait',
    name: 'Portrait Center Logo Corner',
    description: 'Portrait centered in upper area; logo small top-left; contact bottom',
    supports: { portrait: true, logo: true, qrCode: false },
    defaultPaletteId: 'rose-gold',
    regions: [
      { name: 'logo',         x: SX,               y: SY, width: 14, height: 8,  align: 'left', verticalAlign: 'top' },
      { name: 'portrait',     x: SX + SW / 2 - 12, y: SY, width: 24, height: 24, align: 'center', verticalAlign: 'top', clipShape: 'circle' },
      { name: 'name-title',   x: SX,               y: SY + 26, width: SW, height: 10, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX,               y: SY + 37, width: SW, height: 7,  align: 'center', verticalAlign: 'top' },
    ],
  },

  // fl-d11 — Portrait and logo in a two-column header
  {
    id: 'fl-d11',
    category: 'logo-portrait',
    name: 'Split Header Portrait Logo',
    description: 'Top strip: portrait left, logo right; name and contact in body',
    supports: { portrait: true, logo: true, qrCode: false },
    defaultPaletteId: 'cobalt',
    regions: [
      { name: 'portrait',     x: BL,               y: BL, width: 18, height: 18, align: 'left',  verticalAlign: 'top', clipShape: 'rounded' },
      { name: 'logo',         x: W * 0.55,         y: BL, width: W * 0.41, height: 18, align: 'right', verticalAlign: 'middle' },
      { name: 'name-title',   x: SX + 20,          y: BL, width: W * 0.38, height: 18, align: 'left', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX,               y: SY + 16, width: SW, height: 16, align: 'left', verticalAlign: 'top' },
      { name: 'social',       x: SX,               y: SY + 33, width: SW, height: 10, align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-d12 — Portrait large left, logo + name stacked right
  {
    id: 'fl-d12',
    category: 'logo-portrait',
    name: 'Portrait Large Logo Stacked',
    description: 'Large portrait left; right side has logo on top and name below',
    supports: { portrait: true, logo: true, qrCode: false },
    defaultPaletteId: 'graphite',
    regions: [
      { name: 'portrait',     x: BL, y: BL, width: W * 0.44 - BL, height: CARD.HEIGHT, align: 'center', verticalAlign: 'top', clipShape: 'rect' },
      { name: 'logo',         x: W * 0.48, y: SY, width: W * 0.47, height: 12, align: 'center', verticalAlign: 'top' },
      { name: 'name-title',   x: W * 0.48, y: SY + 14, width: W * 0.47, height: 14, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: W * 0.48, y: SY + 30, width: W * 0.47, height: 14, align: 'left', verticalAlign: 'top' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// GROUP E — QR code featured (~8 layouts)  fl-e01..fl-e08
// ─────────────────────────────────────────────────────────────────────────────

const groupE: FrontLayout[] = [
  // fl-e01 — QR right sidebar, name + contact left
  {
    id: 'fl-e01',
    category: 'qr-code',
    name: 'QR Right Sidebar',
    description: 'QR code in a right sidebar; name and contact on the left',
    supports: { portrait: false, logo: true, qrCode: true },
    defaultPaletteId: 'midnight',
    regions: [
      { name: 'logo',         x: SX,               y: SY, width: 18, height: 8,  align: 'left',  verticalAlign: 'top' },
      { name: 'name-title',   x: SX,               y: SY + 10, width: SW - 24, height: 16, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX,               y: SY + 28, width: SW - 24, height: 16, align: 'left', verticalAlign: 'top' },
      { name: 'qr-code',      x: W - BL - 20,      y: SY, width: 20, height: 20, align: 'center', verticalAlign: 'top' },
    ],
  },

  // fl-e02 — QR centered large, name left, tagline below
  {
    id: 'fl-e02',
    category: 'qr-code',
    name: 'QR Center Large',
    description: 'Large QR code dominates the center; name on the left, tagline below',
    supports: { portrait: false, logo: false, qrCode: true },
    defaultPaletteId: 'neon',
    regions: [
      { name: 'name-title',   x: SX,               y: SY,      width: SW * 0.32, height: SH - 8, align: 'left',  verticalAlign: 'middle' },
      { name: 'qr-code',      x: SX + SW * 0.38,   y: SY + 2,  width: 26,        height: 26,     align: 'center', verticalAlign: 'top' },
      { name: 'tagline',      x: SX,               y: SY + SH - 8, width: SW,    height: 8,  align: 'center', verticalAlign: 'middle' },
    ],
  },

  // fl-e03 — QR bottom-right, logo top-left, full layout
  {
    id: 'fl-e03',
    category: 'qr-code',
    name: 'QR Bottom Right',
    description: 'QR code at bottom-right; logo top-left; name and contact fill center',
    supports: { portrait: false, logo: true, qrCode: true },
    defaultPaletteId: 'electric',
    regions: [
      { name: 'logo',         x: SX,               y: SY, width: 18, height: 10, align: 'left',  verticalAlign: 'top' },
      { name: 'name-title',   x: SX,               y: SY + 12, width: SW * 0.65, height: 16, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX,               y: SY + 30, width: SW * 0.65, height: 14, align: 'left', verticalAlign: 'top' },
      { name: 'qr-code',      x: SX + SW - 18,     y: SY + SH - 20, width: 18, height: 18, align: 'right', verticalAlign: 'bottom' },
    ],
  },

  // fl-e04 — QR left, text right (ink-style)
  {
    id: 'fl-e04',
    category: 'qr-code',
    name: 'QR Left Text Right',
    description: 'QR code on the left; all text content stacked on the right',
    supports: { portrait: false, logo: false, qrCode: true },
    defaultPaletteId: 'ink',
    regions: [
      { name: 'qr-code',      x: SX,               y: SY + SH / 2 - 14, width: 26, height: 26, align: 'center', verticalAlign: 'top' },
      { name: 'name-title',   x: SX + 30,          y: SY, width: SW - 30, height: 18, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX + 30,          y: SY + 20, width: SW - 30, height: 24, align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-e05 — QR top-left, contact right, minimal
  {
    id: 'fl-e05',
    category: 'qr-code',
    name: 'QR Top Left Minimal',
    description: 'QR code top-left; name centered right; contact below',
    supports: { portrait: false, logo: false, qrCode: true },
    defaultPaletteId: 'slate',
    regions: [
      { name: 'qr-code',      x: SX,               y: SY, width: 22, height: 22, align: 'left', verticalAlign: 'top' },
      { name: 'name-title',   x: SX + 26,          y: SY, width: SW - 26, height: 18, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX,               y: SY + 26, width: SW, height: 18, align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-e06 — QR with portrait and logo
  {
    id: 'fl-e06',
    category: 'qr-code',
    name: 'QR Portrait Logo',
    description: 'Portrait left; QR bottom-right; logo top-right; full featured',
    supports: { portrait: true, logo: true, qrCode: true },
    defaultPaletteId: 'ocean',
    regions: [
      { name: 'portrait',     x: BL, y: BL, width: 22, height: CARD.HEIGHT, align: 'center', verticalAlign: 'top', clipShape: 'rect' },
      { name: 'logo',         x: SX + 20,          y: SY, width: 22, height: 10, align: 'left', verticalAlign: 'top' },
      { name: 'name-title',   x: SX + 20,          y: SY + 12, width: SW - 44, height: 14, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX + 20,          y: SY + 28, width: SW - 44, height: 16, align: 'left', verticalAlign: 'top' },
      { name: 'qr-code',      x: SX + SW - 18,     y: SY + 16, width: 18, height: 18, align: 'right', verticalAlign: 'top' },
    ],
  },

  // fl-e07 — QR inline with contact
  {
    id: 'fl-e07',
    category: 'qr-code',
    name: 'QR Inline Contact',
    description: 'QR code sits inline at the right end of the contact block',
    supports: { portrait: false, logo: true, qrCode: true },
    defaultPaletteId: 'cobalt',
    regions: [
      { name: 'logo',         x: SX,               y: SY, width: 20, height: 10, align: 'left', verticalAlign: 'top' },
      { name: 'name-title',   x: SX,               y: SY + 12, width: SW * 0.62, height: 16, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX,               y: SY + 30, width: SW * 0.62, height: 14, align: 'left', verticalAlign: 'top' },
      { name: 'qr-code',      x: SX + SW * 0.65,   y: SY + 16, width: SW * 0.35, height: SW * 0.35, align: 'center', verticalAlign: 'top' },
    ],
  },

  // fl-e08 — QR large right half, name/logo left
  {
    id: 'fl-e08',
    category: 'qr-code',
    name: 'QR Half Card',
    description: 'QR code fills the right half of the card; logo and name on the left',
    supports: { portrait: false, logo: true, qrCode: true },
    defaultPaletteId: 'graphite',
    regions: [
      { name: 'logo',         x: SX,               y: SY, width: SW * 0.44, height: 12, align: 'center', verticalAlign: 'top' },
      { name: 'name-title',   x: SX,               y: SY + 14, width: SW * 0.44, height: 16, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX,               y: SY + 32, width: SW * 0.44, height: 12, align: 'left', verticalAlign: 'top' },
      { name: 'qr-code',      x: W * 0.48,         y: SY - 2,  width: W * 0.47, height: SH + 4, align: 'center', verticalAlign: 'middle' },
    ],
    renderBackground: (colors: ColorPalette, w: number, h: number) =>
      e('rect', { key: 'qr-bg', x: w * 0.47, y: 0, width: w * 0.53, height: h, fill: colors.primary, opacity: 0.06 }),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// GROUP F — Logo + QR code featured (12 layouts)  fl-f01..fl-f12
// ─────────────────────────────────────────────────────────────────────────────

const groupF: FrontLayout[] = [
  // fl-f01 — Logo top-left, QR bottom-right, name/contact fills center
  {
    id: 'fl-f01',
    category: 'logo-qr',
    name: 'Logo Top QR Corner',
    description: 'Logo anchored top-left; QR code bottom-right corner; name and contact fill center',
    supports: { portrait: false, logo: true, qrCode: true },
    defaultPaletteId: 'ocean',
    regions: [
      { name: 'logo',         x: SX,               y: SY,           width: 18,       height: 10,  align: 'left',   verticalAlign: 'top' },
      { name: 'name-title',   x: SX,               y: SY + 13,      width: SW * 0.7, height: 16,  align: 'left',   verticalAlign: 'top' },
      { name: 'contact-info', x: SX,               y: SY + 31,      width: SW * 0.7, height: 12,  align: 'left',   verticalAlign: 'top' },
      { name: 'qr-code',      x: SX + SW - 20,     y: SY + SH - 20, width: 20,       height: 20,  align: 'center', verticalAlign: 'bottom' },
    ],
  },

  // fl-f02 — Logo and QR in a bottom bar, name large above
  {
    id: 'fl-f02',
    category: 'logo-qr',
    name: 'Name Hero Bottom Bar',
    description: 'Name and title dominate upper two-thirds; bottom bar holds logo left and QR right',
    supports: { portrait: false, logo: true, qrCode: true },
    defaultPaletteId: 'midnight',
    regions: [
      { name: 'name-title',   x: SX,               y: SY,           width: SW,       height: 18,  align: 'center', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX,               y: SY + 20,      width: SW,       height: 10,  align: 'center', verticalAlign: 'top' },
      { name: 'logo',         x: BL + 3,           y: H - 18,       width: 26,       height: 14,  align: 'left',   verticalAlign: 'middle' },
      { name: 'qr-code',      x: W - BL - 18,      y: H - 19,       width: 16,       height: 16,  align: 'right',  verticalAlign: 'middle' },
    ],
    renderBackground: (colors: ColorPalette, w: number, h: number) =>
      e('rect', { key: 'btm-bar', x: 0, y: h - 21, width: w, height: 21, fill: colors.primary }),
  },

  // fl-f03 — Left sidebar with logo stacked over QR
  {
    id: 'fl-f03',
    category: 'logo-qr',
    name: 'Sidebar Logo QR Stack',
    description: 'Colored left sidebar with logo at top and QR at bottom; text fills right',
    supports: { portrait: false, logo: true, qrCode: true },
    defaultPaletteId: 'cobalt',
    regions: [
      { name: 'logo',         x: BL + 1,           y: BL + 2,       width: 22,       height: 11,  align: 'center', verticalAlign: 'top' },
      { name: 'qr-code',      x: BL + 1,           y: BL + 16,      width: 22,       height: 22,  align: 'center', verticalAlign: 'top' },
      { name: 'name-title',   x: SX + 22,          y: SY,           width: SW - 22,  height: 18,  align: 'left',   verticalAlign: 'top' },
      { name: 'contact-info', x: SX + 22,          y: SY + 20,      width: SW - 22,  height: 20,  align: 'left',   verticalAlign: 'top' },
    ],
    renderBackground: (colors: ColorPalette, _w: number, h: number) =>
      e('rect', { key: 'sidebar', x: 0, y: 0, width: 25, height: h, fill: colors.primary }),
  },

  // fl-f04 — Logo and QR centered in a row, name above, contact below
  {
    id: 'fl-f04',
    category: 'logo-qr',
    name: 'Logo QR Row Center',
    description: 'Logo and QR side by side in the middle; name above; contact below',
    supports: { portrait: false, logo: true, qrCode: true },
    defaultPaletteId: 'slate',
    regions: [
      { name: 'name-title',   x: SX,               y: SY,           width: SW,       height: 14,  align: 'center', verticalAlign: 'top' },
      { name: 'logo',         x: SX + SW * 0.18,   y: SY + 16,      width: 20,       height: 16,  align: 'center', verticalAlign: 'middle' },
      { name: 'qr-code',      x: SX + SW * 0.58,   y: SY + 15,      width: 18,       height: 18,  align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX,               y: SY + 36,      width: SW,       height: 8,   align: 'center', verticalAlign: 'top' },
    ],
  },

  // fl-f05 — Right sidebar: QR top, logo below — text left
  {
    id: 'fl-f05',
    category: 'logo-qr',
    name: 'Right Sidebar QR Logo',
    description: 'Right sidebar houses QR at top and logo below; text content on the left',
    supports: { portrait: false, logo: true, qrCode: true },
    defaultPaletteId: 'charcoal',
    regions: [
      { name: 'name-title',   x: SX,               y: SY,           width: SW - 26,  height: 18,  align: 'left',   verticalAlign: 'top' },
      { name: 'contact-info', x: SX,               y: SY + 20,      width: SW - 26,  height: 18,  align: 'left',   verticalAlign: 'top' },
      { name: 'social',       x: SX,               y: SY + 40,      width: SW - 26,  height: 8,   align: 'left',   verticalAlign: 'top' },
      { name: 'qr-code',      x: SX + SW - 22,     y: SY,           width: 22,       height: 22,  align: 'center', verticalAlign: 'top' },
      { name: 'logo',         x: SX + SW - 20,     y: SY + 25,      width: 20,       height: 10,  align: 'center', verticalAlign: 'top' },
    ],
    renderBackground: (colors: ColorPalette, w: number, h: number) =>
      e('rect', { key: 'sidebar-r', x: w - 26, y: 0, width: 26, height: h, fill: colors.primary, opacity: 0.08 }),
  },

  // fl-f06 — Logo top-right, QR bottom-left, name diagonal balance
  {
    id: 'fl-f06',
    category: 'logo-qr',
    name: 'Diagonal Logo QR',
    description: 'Logo anchored top-right; QR anchored bottom-left; name and contact fill center',
    supports: { portrait: false, logo: true, qrCode: true },
    defaultPaletteId: 'burgundy',
    regions: [
      { name: 'logo',         x: SX + SW - 18,     y: SY,           width: 18,       height: 10,  align: 'right',  verticalAlign: 'top' },
      { name: 'name-title',   x: SX,               y: SY,           width: SW - 22,  height: 16,  align: 'left',   verticalAlign: 'top' },
      { name: 'contact-info', x: SX + 22,          y: SY + 20,      width: SW - 22,  height: 16,  align: 'left',   verticalAlign: 'top' },
      { name: 'qr-code',      x: SX,               y: SY + SH - 18, width: 18,       height: 18,  align: 'left',   verticalAlign: 'bottom' },
    ],
  },

  // fl-f07 — Split card: left half text, right half logo over QR
  {
    id: 'fl-f07',
    category: 'logo-qr',
    name: 'Split Panel Logo QR',
    description: 'Left half has name and contact; right panel shows logo centered above QR',
    supports: { portrait: false, logo: true, qrCode: true },
    defaultPaletteId: 'navy',
    regions: [
      { name: 'name-title',   x: SX,               y: SY,           width: SW * 0.5, height: 18,  align: 'left',   verticalAlign: 'top' },
      { name: 'contact-info', x: SX,               y: SY + 20,      width: SW * 0.5, height: 22,  align: 'left',   verticalAlign: 'top' },
      { name: 'logo',         x: SX + SW * 0.55,   y: SY + 2,       width: SW * 0.4, height: 12,  align: 'center', verticalAlign: 'top' },
      { name: 'qr-code',      x: SX + SW * 0.57,   y: SY + 17,      width: 20,       height: 20,  align: 'center', verticalAlign: 'top' },
    ],
    renderBackground: (colors: ColorPalette, w: number, h: number) =>
      e('rect', { key: 'right-panel', x: w * 0.52, y: 0, width: w * 0.48, height: h, fill: colors.primary, opacity: 0.07 }),
  },

  // fl-f08 — Header band with logo; QR floats right; contact below header
  {
    id: 'fl-f08',
    category: 'logo-qr',
    name: 'Header Logo QR Float',
    description: 'Colored header band contains logo; QR floats at mid-right; contact in body',
    supports: { portrait: false, logo: true, qrCode: true },
    defaultPaletteId: 'forest',
    regions: [
      { name: 'logo',         x: SX,               y: BL,           width: SW * 0.55, height: 14, align: 'left',   verticalAlign: 'middle' },
      { name: 'qr-code',      x: SX + SW - 22,     y: BL,           width: 22,        height: 22, align: 'center', verticalAlign: 'top' },
      { name: 'name-title',   x: SX,               y: SY + 12,      width: SW * 0.7,  height: 16, align: 'left',   verticalAlign: 'top' },
      { name: 'contact-info', x: SX,               y: SY + 30,      width: SW * 0.7,  height: 12, align: 'left',   verticalAlign: 'top' },
    ],
    renderBackground: (colors: ColorPalette, w: number, _h: number) =>
      e('rect', { key: 'hdr', x: 0, y: 0, width: w, height: 17, fill: colors.primary }),
  },

  // fl-f09 — QR large left; logo small top of QR; name/contact right
  {
    id: 'fl-f09',
    category: 'logo-qr',
    name: 'QR Left Logo Above',
    description: 'Large QR dominates the left; logo sits above it; name and contact on the right',
    supports: { portrait: false, logo: true, qrCode: true },
    defaultPaletteId: 'lavender',
    regions: [
      { name: 'logo',         x: SX,               y: SY,           width: 22,       height: 10,  align: 'left',   verticalAlign: 'top' },
      { name: 'qr-code',      x: SX,               y: SY + 12,      width: 24,       height: 24,  align: 'left',   verticalAlign: 'top' },
      { name: 'name-title',   x: SX + 28,          y: SY,           width: SW - 28,  height: 18,  align: 'left',   verticalAlign: 'top' },
      { name: 'contact-info', x: SX + 28,          y: SY + 20,      width: SW - 28,  height: 22,  align: 'left',   verticalAlign: 'top' },
    ],
  },

  // fl-f10 — Logo large center-top, QR small bottom-center, name between
  {
    id: 'fl-f10',
    category: 'logo-qr',
    name: 'Logo Hero QR Footer',
    description: 'Large logo dominates top; name in the middle; small QR anchored bottom-center',
    supports: { portrait: false, logo: true, qrCode: true },
    defaultPaletteId: 'gold',
    regions: [
      { name: 'logo',         x: SX + SW * 0.2,    y: SY,           width: SW * 0.6, height: 14,  align: 'center', verticalAlign: 'top' },
      { name: 'name-title',   x: SX,               y: SY + 16,      width: SW,       height: 14,  align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX,               y: SY + 31,      width: SW * 0.7, height: 10,  align: 'center', verticalAlign: 'top' },
      { name: 'qr-code',      x: SX + SW - 16,     y: SY + 26,      width: 16,       height: 16,  align: 'right',  verticalAlign: 'top' },
    ],
  },

  // fl-f11 — Minimal: logo top-left, QR top-right, name center, contact bottom
  {
    id: 'fl-f11',
    category: 'logo-qr',
    name: 'Corners Logo QR',
    description: 'Logo in top-left corner, QR in top-right corner; name centered; contact bottom strip',
    supports: { portrait: false, logo: true, qrCode: true },
    defaultPaletteId: 'silver',
    regions: [
      { name: 'logo',         x: SX,               y: SY,           width: 16,       height: 10,  align: 'left',   verticalAlign: 'top' },
      { name: 'qr-code',      x: SX + SW - 16,     y: SY,           width: 16,       height: 16,  align: 'right',  verticalAlign: 'top' },
      { name: 'name-title',   x: SX + 18,          y: SY + 2,       width: SW - 36,  height: 18,  align: 'center', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX,               y: SY + 32,      width: SW,       height: 12,  align: 'center', verticalAlign: 'top' },
    ],
  },

  // fl-f12 — Wide logo band below name; QR right of contact block
  {
    id: 'fl-f12',
    category: 'logo-qr',
    name: 'Name Logo Band QR',
    description: 'Name at top; wide logo band below name; contact left of bottom row; QR bottom-right',
    supports: { portrait: false, logo: true, qrCode: true },
    defaultPaletteId: 'coral',
    regions: [
      { name: 'name-title',   x: SX,               y: SY,           width: SW,       height: 16,  align: 'left',   verticalAlign: 'top' },
      { name: 'logo',         x: SX,               y: SY + 18,      width: SW * 0.55, height: 12, align: 'left',   verticalAlign: 'middle' },
      { name: 'contact-info', x: SX,               y: SY + 32,      width: SW * 0.65, height: 12, align: 'left',   verticalAlign: 'top' },
      { name: 'qr-code',      x: SX + SW - 18,     y: SY + 18,      width: 18,        height: 18, align: 'right',  verticalAlign: 'top' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// GROUP G — Portrait + QR code featured (12 layouts)  fl-g01..fl-g12
// ─────────────────────────────────────────────────────────────────────────────

const groupG: FrontLayout[] = [
  // fl-g01 — Portrait left 35%, text fills middle, QR bottom-right
  {
    id: 'fl-g01',
    category: 'portrait-qr',
    name: 'Portrait Left QR Corner',
    description: 'Portrait fills the left 35%; name and contact in the middle; QR bottom-right',
    supports: { portrait: true, logo: false, qrCode: true },
    defaultPaletteId: 'ocean',
    regions: [
      { name: 'portrait',     x: BL, y: BL,          width: 30,       height: CARD.HEIGHT, align: 'center', verticalAlign: 'top', clipShape: 'rect' },
      { name: 'name-title',   x: SX + 28,            y: SY,           width: SW - 50,      height: 18,  align: 'left',   verticalAlign: 'top' },
      { name: 'contact-info', x: SX + 28,            y: SY + 20,      width: SW - 50,      height: 20,  align: 'left',   verticalAlign: 'top' },
      { name: 'qr-code',      x: SX + SW - 18,       y: SY + SH - 20, width: 18,           height: 18,  align: 'right',  verticalAlign: 'bottom' },
    ],
  },

  // fl-g02 — Portrait top band with name, QR bottom-right, contact below portrait
  {
    id: 'fl-g02',
    category: 'portrait-qr',
    name: 'Portrait Band QR Bottom',
    description: 'Portrait and name in top band; contact below; QR anchored bottom-right',
    supports: { portrait: true, logo: false, qrCode: true },
    defaultPaletteId: 'slate',
    regions: [
      { name: 'portrait',     x: BL, y: BL,          width: 22,       height: 22,          align: 'left',   verticalAlign: 'top', clipShape: 'rounded' },
      { name: 'name-title',   x: SX + 20,            y: SY,           width: SW - 42,      height: 18,  align: 'left',   verticalAlign: 'top' },
      { name: 'contact-info', x: SX,                 y: SY + 24,      width: SW * 0.68,    height: 16,  align: 'left',   verticalAlign: 'top' },
      { name: 'qr-code',      x: SX + SW - 18,       y: SY + 20,      width: 18,           height: 18,  align: 'right',  verticalAlign: 'top' },
    ],
  },

  // fl-g03 — Portrait circle center-left, QR opposite corner top-right
  {
    id: 'fl-g03',
    category: 'portrait-qr',
    name: 'Circle Portrait QR Opposite',
    description: 'Circular portrait center-left; QR in top-right; name and contact fill remaining space',
    supports: { portrait: true, logo: false, qrCode: true },
    defaultPaletteId: 'midnight',
    regions: [
      { name: 'portrait',     x: SX,                 y: SY + SH / 2 - 14, width: 26,      height: 26,  align: 'center', verticalAlign: 'top', clipShape: 'circle' },
      { name: 'qr-code',      x: SX + SW - 20,       y: SY,               width: 20,      height: 20,  align: 'right',  verticalAlign: 'top' },
      { name: 'name-title',   x: SX + 30,            y: SY + 22,          width: SW - 52, height: 16,  align: 'left',   verticalAlign: 'top' },
      { name: 'contact-info', x: SX + 30,            y: SY + 2,           width: SW - 52, height: 18,  align: 'left',   verticalAlign: 'top' },
    ],
  },

  // fl-g04 — Portrait right sidebar, QR bottom-left, name/contact fill body
  {
    id: 'fl-g04',
    category: 'portrait-qr',
    name: 'Portrait Right QR Left',
    description: 'Portrait in right sidebar; QR anchored bottom-left; name and contact in body',
    supports: { portrait: true, logo: false, qrCode: true },
    defaultPaletteId: 'sunset',
    regions: [
      { name: 'portrait',     x: W - BL - 26, y: BL, width: 26,       height: CARD.HEIGHT, align: 'center', verticalAlign: 'top', clipShape: 'rect' },
      { name: 'name-title',   x: SX,                 y: SY,           width: SW - 30,      height: 18,  align: 'left',   verticalAlign: 'top' },
      { name: 'contact-info', x: SX + 22,            y: SY + 20,      width: SW - 52,      height: 20,  align: 'left',   verticalAlign: 'top' },
      { name: 'qr-code',      x: SX,                 y: SY + SH - 18, width: 18,           height: 18,  align: 'left',   verticalAlign: 'bottom' },
    ],
  },

  // fl-g05 — Portrait small circle top-right, QR bottom-left, name dominates
  {
    id: 'fl-g05',
    category: 'portrait-qr',
    name: 'Small Circle Portrait QR',
    description: 'Small circular portrait top-right corner; QR bottom-left; name large center',
    supports: { portrait: true, logo: false, qrCode: true },
    defaultPaletteId: 'sage',
    regions: [
      { name: 'name-title',   x: SX,                 y: SY,           width: SW - 24,      height: 20,  align: 'left',   verticalAlign: 'top' },
      { name: 'portrait',     x: SX + SW - 20,       y: SY,           width: 20,           height: 20,  align: 'center', verticalAlign: 'top', clipShape: 'circle' },
      { name: 'contact-info', x: SX,                 y: SY + 22,      width: SW * 0.7,     height: 16,  align: 'left',   verticalAlign: 'top' },
      { name: 'qr-code',      x: SX,                 y: SY + SH - 16, width: 16,           height: 16,  align: 'left',   verticalAlign: 'bottom' },
    ],
  },

  // fl-g06 — Portrait fills top half, name centered over it, QR bottom-right, contact bottom
  {
    id: 'fl-g06',
    category: 'portrait-qr',
    name: 'Portrait Top Half QR',
    description: 'Portrait spans the left of a colored top band; name in band; QR and contact below',
    supports: { portrait: true, logo: false, qrCode: true },
    defaultPaletteId: 'cobalt',
    regions: [
      { name: 'portrait',     x: BL, y: BL,          width: 24,       height: 24,          align: 'left',   verticalAlign: 'top', clipShape: 'rect' },
      { name: 'name-title',   x: SX + 22,            y: SY,           width: SW - 22,      height: 20,  align: 'left',   verticalAlign: 'middle' },
      { name: 'contact-info', x: SX,                 y: SY + 28,      width: SW - 22,      height: 14,  align: 'left',   verticalAlign: 'top' },
      { name: 'qr-code',      x: SX + SW - 16,       y: SY + 28,      width: 16,           height: 16,  align: 'right',  verticalAlign: 'top' },
    ],
    renderBackground: (colors: ColorPalette, w: number, _h: number) =>
      e('rect', { key: 'top-band', x: 0, y: 0, width: w, height: 27, fill: colors.primary }),
  },

  // fl-g07 — Portrait large left, QR right floats middle, name top-right
  {
    id: 'fl-g07',
    category: 'portrait-qr',
    name: 'Large Portrait QR Float',
    description: 'Large portrait anchored left; QR floats in right middle; name top-right; contact bottom-right',
    supports: { portrait: true, logo: false, qrCode: true },
    defaultPaletteId: 'graphite',
    regions: [
      { name: 'portrait',     x: BL, y: BL,          width: 32,       height: CARD.HEIGHT, align: 'center', verticalAlign: 'top', clipShape: 'rect' },
      { name: 'name-title',   x: SX + 30,            y: SY,           width: SW - 30,      height: 16,  align: 'left',   verticalAlign: 'top' },
      { name: 'qr-code',      x: SX + SW - 22,       y: SY + 18,      width: 22,           height: 22,  align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX + 30,            y: SY + 18,      width: SW - 55,      height: 22,  align: 'left',   verticalAlign: 'top' },
    ],
  },

  // fl-g08 — Rounded portrait center; QR bottom-left; name above portrait; contact below
  {
    id: 'fl-g08',
    category: 'portrait-qr',
    name: 'Centered Portrait QR Left',
    description: 'Rounded portrait centered; name above; contact below; QR bottom-left corner',
    supports: { portrait: true, logo: false, qrCode: true },
    defaultPaletteId: 'navy',
    regions: [
      { name: 'name-title',   x: SX,                 y: SY,           width: SW,           height: 12,  align: 'center', verticalAlign: 'top' },
      { name: 'portrait',     x: SX + SW / 2 - 14,  y: SY + 14,      width: 28,           height: 24,  align: 'center', verticalAlign: 'top', clipShape: 'rounded' },
      { name: 'contact-info', x: SX + 22,            y: SY + 38,      width: SW - 22,      height: 6,   align: 'center', verticalAlign: 'top' },
      { name: 'qr-code',      x: SX,                 y: SY + 26,      width: 16,           height: 16,  align: 'left',   verticalAlign: 'top' },
    ],
  },

  // fl-g09 — Portrait with logo above, QR right of name
  {
    id: 'fl-g09',
    category: 'portrait-qr',
    name: 'Portrait Logo QR Trio',
    description: 'Portrait left with logo above it; name top-right; QR mid-right; contact below name',
    supports: { portrait: true, logo: true, qrCode: true },
    defaultPaletteId: 'electric',
    regions: [
      { name: 'logo',         x: SX,                 y: SY,           width: 22,           height: 10,  align: 'left',   verticalAlign: 'top' },
      { name: 'portrait',     x: SX,                 y: SY + 12,      width: 22,           height: 26,  align: 'center', verticalAlign: 'top', clipShape: 'rounded' },
      { name: 'name-title',   x: SX + 26,            y: SY,           width: SW - 50,      height: 16,  align: 'left',   verticalAlign: 'top' },
      { name: 'qr-code',      x: SX + SW - 20,       y: SY + 2,       width: 20,           height: 20,  align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX + 26,            y: SY + 20,      width: SW - 28,      height: 22,  align: 'left',   verticalAlign: 'top' },
    ],
  },

  // fl-g10 — Wide portrait strip top, QR bottom-right corner, contact bottom-left
  {
    id: 'fl-g10',
    category: 'portrait-qr',
    name: 'Portrait Strip QR Footer',
    description: 'Portrait in colored top strip left; name in strip right; contact and QR in footer',
    supports: { portrait: true, logo: false, qrCode: true },
    defaultPaletteId: 'burgundy',
    regions: [
      { name: 'portrait',     x: BL, y: BL,          width: 20,       height: 20,          align: 'left',   verticalAlign: 'top', clipShape: 'rect' },
      { name: 'name-title',   x: SX + 18,            y: SY,           width: SW - 18,      height: 18,  align: 'left',   verticalAlign: 'middle' },
      { name: 'contact-info', x: SX,                 y: SY + 24,      width: SW - 22,      height: 18,  align: 'left',   verticalAlign: 'top' },
      { name: 'qr-code',      x: SX + SW - 18,       y: SY + 22,      width: 18,           height: 18,  align: 'right',  verticalAlign: 'top' },
    ],
    renderBackground: (colors: ColorPalette, w: number, _h: number) =>
      e('rect', { key: 'strip', x: 0, y: 0, width: w, height: 23, fill: colors.primary }),
  },

  // fl-g11 — Portrait tall right, QR top-left, name/contact fill left
  {
    id: 'fl-g11',
    category: 'portrait-qr',
    name: 'Tall Portrait Right QR Top',
    description: 'Tall portrait fills right side; QR top-left; name mid-left; contact bottom-left',
    supports: { portrait: true, logo: false, qrCode: true },
    defaultPaletteId: 'cream',
    regions: [
      { name: 'portrait',     x: W - BL - 28, y: BL, width: 28,       height: CARD.HEIGHT, align: 'center', verticalAlign: 'top', clipShape: 'rect' },
      { name: 'qr-code',      x: SX,                 y: SY,           width: 18,           height: 18,  align: 'left',   verticalAlign: 'top' },
      { name: 'name-title',   x: SX,                 y: SY + 20,      width: SW - 32,      height: 16,  align: 'left',   verticalAlign: 'top' },
      { name: 'contact-info', x: SX,                 y: SY + 38,      width: SW - 32,      height: 8,   align: 'left',   verticalAlign: 'top' },
    ],
  },

  // fl-g12 — Portrait circle bottom-right, QR top-right, name fills left, contact below name
  {
    id: 'fl-g12',
    category: 'portrait-qr',
    name: 'Portrait Circle Corner QR',
    description: 'Name large left; contact below; QR top-right; circular portrait bottom-right',
    supports: { portrait: true, logo: false, qrCode: true },
    defaultPaletteId: 'lavender',
    regions: [
      { name: 'name-title',   x: SX,                 y: SY,           width: SW * 0.6,     height: 20,  align: 'left',   verticalAlign: 'top' },
      { name: 'contact-info', x: SX,                 y: SY + 22,      width: SW * 0.6,     height: 20,  align: 'left',   verticalAlign: 'top' },
      { name: 'qr-code',      x: SX + SW - 18,       y: SY,           width: 18,           height: 18,  align: 'right',  verticalAlign: 'top' },
      { name: 'portrait',     x: SX + SW - 22,       y: SY + SH - 22, width: 22,           height: 22,  align: 'center', verticalAlign: 'bottom', clipShape: 'circle' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// GROUP N — New layouts fl-n001..fl-n100
// ─────────────────────────────────────────────────────────────────────────────

const groupN: FrontLayout[] = [
  // fl-n001 — text-only, name top-left, contact bottom-left, social bottom-right
  {
    id: 'fl-n001',
    category: 'text-only',
    name: 'Corner Split',
    description: 'Name anchored top-left, contact bottom-left, social bottom-right',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'ocean',
    regions: [
      { name: 'name-title',   x: SX,            y: SY,            width: SW * 0.65, height: 18, align: 'left',  verticalAlign: 'top' },
      { name: 'contact-info', x: SX,            y: SY + SH - 14,  width: SW * 0.55, height: 14, align: 'left',  verticalAlign: 'bottom' },
      { name: 'social',       x: SX + SW * 0.6, y: SY + SH - 10,  width: SW * 0.4,  height: 10, align: 'right', verticalAlign: 'bottom' },
    ],
  },

  // fl-n002 — text-only, fully right-bottom anchored
  {
    id: 'fl-n002',
    category: 'text-only',
    name: 'Bottom Right Stack',
    description: 'All content anchored to the bottom-right corner',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'slate',
    regions: [
      { name: 'name-title',   x: SX, y: SY + SH - 36, width: SW, height: 16, align: 'right', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + SH - 18, width: SW, height: 10, align: 'right', verticalAlign: 'top' },
      { name: 'social',       x: SX, y: SY + SH - 8,  width: SW, height: 8,  align: 'right', verticalAlign: 'top' },
    ],
  },

  // fl-n003 — text-only, diagonal-feel: name top-right, contact middle-left
  {
    id: 'fl-n003',
    category: 'text-only',
    name: 'Diagonal Flow',
    description: 'Name top-right, contact center-left, social bottom-center',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'midnight',
    regions: [
      { name: 'name-title',   x: SX + SW * 0.35, y: SY,            width: SW * 0.65, height: 16, align: 'right',  verticalAlign: 'top' },
      { name: 'contact-info', x: SX,             y: SY + SH * 0.3, width: SW * 0.6,  height: 14, align: 'left',   verticalAlign: 'top' },
      { name: 'social',       x: SX,             y: SY + SH - 9,   width: SW,        height: 9,  align: 'center', verticalAlign: 'top' },
    ],
  },

  // fl-n004 — text-only, name centered large, contact centered small below
  {
    id: 'fl-n004',
    category: 'text-only',
    name: 'Center Monogram',
    description: 'Name large and centered, all details centered beneath',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'charcoal',
    regions: [
      { name: 'name-title',   x: SX, y: SY + 4,  width: SW, height: 20, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 26, width: SW, height: 10, align: 'center', verticalAlign: 'top' },
      { name: 'social',       x: SX, y: SY + 37, width: SW, height: 7,  align: 'center', verticalAlign: 'top' },
    ],
  },

  // fl-n005 — text-only, name left top, social left middle, contact right
  {
    id: 'fl-n005',
    category: 'text-only',
    name: 'Left Stack Right Contact',
    description: 'Name and social stacked left; contact info column right',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'navy',
    regions: [
      { name: 'name-title',   x: SX,             y: SY,      width: SW * 0.45, height: 16, align: 'left', verticalAlign: 'top' },
      { name: 'social',       x: SX,             y: SY + 18, width: SW * 0.45, height: 10, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX + SW * 0.5,  y: SY,      width: SW * 0.5,  height: SH, align: 'left', verticalAlign: 'middle' },
    ],
  },

  // fl-n006 — logo, logo top-left, name-title right of logo, contact below
  {
    id: 'fl-n006',
    category: 'logo',
    name: 'Logo Banner Left',
    description: 'Logo top-left, name beside it, contact info below full-width',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'ocean',
    regions: [
      { name: 'logo',         x: SX,            y: SY,      width: 20,        height: 16, align: 'left',  verticalAlign: 'middle' },
      { name: 'name-title',   x: SX + 22,       y: SY,      width: SW - 22,   height: 16, align: 'left',  verticalAlign: 'middle' },
      { name: 'contact-info', x: SX,            y: SY + 20, width: SW * 0.65, height: 14, align: 'left',  verticalAlign: 'top' },
      { name: 'social',       x: SX + SW * 0.7, y: SY + 20, width: SW * 0.3,  height: 14, align: 'right', verticalAlign: 'top' },
    ],
  },

  // fl-n007 — logo, logo bottom-right, name top, contact left
  {
    id: 'fl-n007',
    category: 'logo',
    name: 'Logo Corner Accent',
    description: 'Name dominant top; contact left; logo anchored bottom-right',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'slate',
    regions: [
      { name: 'name-title',   x: SX,            y: SY,           width: SW * 0.7, height: 18, align: 'left',  verticalAlign: 'top' },
      { name: 'contact-info', x: SX,            y: SY + 20,      width: SW * 0.6, height: 18, align: 'left',  verticalAlign: 'top' },
      { name: 'social',       x: SX,            y: SY + SH - 8,  width: SW * 0.6, height: 8,  align: 'left',  verticalAlign: 'top' },
      { name: 'logo',         x: SX + SW - 18,  y: SY + SH - 18, width: 18,       height: 18, align: 'right', verticalAlign: 'bottom' },
    ],
  },

  // fl-n008 — logo, centered logo top, name center, contact center bottom
  {
    id: 'fl-n008',
    category: 'logo',
    name: 'Logo Top Center',
    description: 'Logo centered at top, name beneath, contact at bottom centered',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'lavender',
    regions: [
      { name: 'logo',         x: SX, y: SY,      width: SW, height: 14, align: 'center', verticalAlign: 'top' },
      { name: 'name-title',   x: SX, y: SY + 16, width: SW, height: 14, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 32, width: SW, height: 10, align: 'center', verticalAlign: 'top' },
    ],
  },

  // fl-n009 — logo, logo left sidebar feel, text right
  {
    id: 'fl-n009',
    category: 'logo',
    name: 'Logo Sidebar',
    description: 'Logo stacked in left quarter; name and contact fill right three-quarters',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'midnight',
    regions: [
      { name: 'logo',         x: SX,             y: SY, width: SW * 0.22, height: SH,       align: 'center', verticalAlign: 'middle' },
      { name: 'name-title',   x: SX + SW * 0.28, y: SY, width: SW * 0.72, height: SH * 0.5, align: 'left',   verticalAlign: 'bottom' },
      { name: 'contact-info', x: SX + SW * 0.28, y: SY + SH * 0.52, width: SW * 0.72, height: SH * 0.48, align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-n010 — logo-qr, logo top-left, qr top-right, name/contact below
  {
    id: 'fl-n010',
    category: 'logo-qr',
    name: 'Logo QR Header',
    description: 'Logo and QR bookend the top; name and contact fill the bottom half',
    supports: { portrait: false, logo: true, qrCode: true },
    defaultPaletteId: 'charcoal',
    regions: [
      { name: 'logo',         x: SX,           y: SY,      width: 18,       height: 18, align: 'left',   verticalAlign: 'top' },
      { name: 'qr-code',      x: SX + SW - 18, y: SY,      width: 18,       height: 18, align: 'right',  verticalAlign: 'top' },
      { name: 'name-title',   x: SX,           y: SY + 20, width: SW,       height: 14, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX,           y: SY + 36, width: SW,       height: 8,  align: 'center', verticalAlign: 'top' },
    ],
  },

  // fl-n011 — logo-qr, logo bottom-left, qr bottom-right, name fills top
  {
    id: 'fl-n011',
    category: 'logo-qr',
    name: 'Logo QR Footer',
    description: 'Name and contact dominate top; logo and QR anchor the bottom corners',
    supports: { portrait: false, logo: true, qrCode: true },
    defaultPaletteId: 'navy',
    regions: [
      { name: 'name-title',   x: SX,           y: SY,           width: SW,  height: 16, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX,           y: SY + 18,      width: SW,  height: 12, align: 'center', verticalAlign: 'top' },
      { name: 'logo',         x: SX,           y: SY + SH - 14, width: 20,  height: 14, align: 'left',   verticalAlign: 'bottom' },
      { name: 'qr-code',      x: SX + SW - 14, y: SY + SH - 14, width: 14, height: 14, align: 'right',  verticalAlign: 'bottom' },
    ],
  },

  // fl-n012 — qr-code, QR left, name+contact right
  {
    id: 'fl-n012',
    category: 'qr-code',
    name: 'QR Left Panel',
    description: 'Large QR on the left; name and contact stack on the right',
    supports: { portrait: false, logo: false, qrCode: true },
    defaultPaletteId: 'ocean',
    regions: [
      { name: 'qr-code',      x: SX,            y: SY + (SH - 30) / 2, width: 30, height: 30, align: 'center', verticalAlign: 'middle' },
      { name: 'name-title',   x: SX + 34,       y: SY,                  width: SW - 34, height: 20, align: 'left', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX + 34,       y: SY + SH * 0.5,       width: SW - 34, height: 18, align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-n013 — qr-code, QR right, name left
  {
    id: 'fl-n013',
    category: 'qr-code',
    name: 'QR Right Panel',
    description: 'QR code right side; name and contact fill left two-thirds',
    supports: { portrait: false, logo: false, qrCode: true },
    defaultPaletteId: 'slate',
    regions: [
      { name: 'name-title',   x: SX,           y: SY,                  width: SW - 34, height: 20, align: 'left', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX,           y: SY + SH * 0.5,       width: SW - 34, height: 18, align: 'left', verticalAlign: 'top' },
      { name: 'qr-code',      x: SX + SW - 30, y: SY + (SH - 30) / 2,  width: 30,      height: 30, align: 'center', verticalAlign: 'middle' },
    ],
  },

  // fl-n014 — portrait, portrait left, text right
  {
    id: 'fl-n014',
    category: 'portrait',
    name: 'Portrait Left Text Right',
    description: 'Square portrait on left; name and contact info fill right side',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'charcoal',
    regions: [
      { name: 'portrait',     x: SX,            y: SY,      width: 30,      height: SH,      align: 'center', verticalAlign: 'middle', clipShape: 'rect' },
      { name: 'name-title',   x: SX + 34,       y: SY,      width: SW - 34, height: 22,      align: 'left',   verticalAlign: 'middle' },
      { name: 'contact-info', x: SX + 34,       y: SY + 24, width: SW - 34, height: SH - 24, align: 'left',   verticalAlign: 'top' },
    ],
  },

  // fl-n015 — portrait, portrait top-right circle, name left
  {
    id: 'fl-n015',
    category: 'portrait',
    name: 'Circle Portrait Top Right',
    description: 'Circular portrait top-right; name and contact fill left and bottom',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'lavender',
    regions: [
      { name: 'name-title',   x: SX,           y: SY,      width: SW * 0.6, height: 22, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX,           y: SY + 24, width: SW * 0.7, height: 18, align: 'left', verticalAlign: 'top' },
      { name: 'portrait',     x: SX + SW - 22, y: SY,      width: 22,       height: 22, align: 'center', verticalAlign: 'top', clipShape: 'circle' },
    ],
  },

  // fl-n016 — portrait, portrait bottom-left, name top-right
  {
    id: 'fl-n016',
    category: 'portrait',
    name: 'Portrait Bottom Left',
    description: 'Name and contact top-right; portrait anchored bottom-left',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'midnight',
    regions: [
      { name: 'name-title',   x: SX + SW * 0.3, y: SY,           width: SW * 0.7, height: 20, align: 'right', verticalAlign: 'top' },
      { name: 'contact-info', x: SX + SW * 0.3, y: SY + 22,      width: SW * 0.7, height: 16, align: 'right', verticalAlign: 'top' },
      { name: 'portrait',     x: SX,             y: SY + SH - 24, width: 24,       height: 24, align: 'left',  verticalAlign: 'bottom', clipShape: 'rounded' },
    ],
  },

  // fl-n017 — portrait-qr, portrait left, qr right, name/contact center
  {
    id: 'fl-n017',
    category: 'portrait-qr',
    name: 'Portrait QR Bookend',
    description: 'Portrait left, QR right, name and contact centered between them',
    supports: { portrait: true, logo: false, qrCode: true },
    defaultPaletteId: 'navy',
    regions: [
      { name: 'portrait',     x: SX,           y: SY + (SH - 28) / 2, width: 26, height: 28, align: 'center', verticalAlign: 'middle', clipShape: 'circle' },
      { name: 'name-title',   x: SX + 30,      y: SY,                  width: SW - 60, height: 22, align: 'center', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX + 30,      y: SY + SH * 0.5,       width: SW - 60, height: 18, align: 'center', verticalAlign: 'top' },
      { name: 'qr-code',      x: SX + SW - 26, y: SY + (SH - 26) / 2,  width: 26,      height: 26, align: 'center', verticalAlign: 'middle' },
    ],
  },

  // fl-n018 — logo-portrait, logo top-left, portrait top-right, text below
  {
    id: 'fl-n018',
    category: 'logo-portrait',
    name: 'Logo Portrait Top Row',
    description: 'Logo top-left, portrait circle top-right, name and contact fill bottom',
    supports: { portrait: true, logo: true, qrCode: false },
    defaultPaletteId: 'ocean',
    regions: [
      { name: 'logo',         x: SX,           y: SY,      width: 18,       height: 14, align: 'left',   verticalAlign: 'middle' },
      { name: 'portrait',     x: SX + SW - 18, y: SY,      width: 18,       height: 18, align: 'center', verticalAlign: 'top', clipShape: 'circle' },
      { name: 'name-title',   x: SX,           y: SY + 22, width: SW * 0.7, height: 14, align: 'left',   verticalAlign: 'top' },
      { name: 'contact-info', x: SX,           y: SY + 38, width: SW,       height: 8,  align: 'left',   verticalAlign: 'top' },
    ],
  },

  // fl-n019 — text-only, name fills top half, contact tiny bottom strip
  {
    id: 'fl-n019',
    category: 'text-only',
    name: 'Name Hero',
    description: 'Name dominates the upper half; small contact strip at the bottom',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'slate',
    regions: [
      { name: 'name-title',   x: SX, y: SY,           width: SW, height: SH * 0.55, align: 'left', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX, y: SY + SH * 0.6, width: SW * 0.6, height: SH * 0.4, align: 'left', verticalAlign: 'top' },
      { name: 'social',       x: SX + SW * 0.65, y: SY + SH * 0.6, width: SW * 0.35, height: SH * 0.4, align: 'right', verticalAlign: 'top' },
    ],
  },

  // fl-n020 — text-only, three even horizontal bands
  {
    id: 'fl-n020',
    category: 'text-only',
    name: 'Three Band',
    description: 'Card divided into three equal horizontal bands: name, contact, social',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'charcoal',
    regions: [
      { name: 'name-title',   x: SX, y: SY,                   width: SW, height: SH / 3 - 1, align: 'center', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX, y: SY + SH / 3 + 1,      width: SW, height: SH / 3 - 1, align: 'center', verticalAlign: 'middle' },
      { name: 'social',       x: SX, y: SY + (SH / 3) * 2 + 1, width: SW, height: SH / 3 - 1, align: 'center', verticalAlign: 'middle' },
    ],
  },

  // fl-n021 — logo, logo centered large, name below
  {
    id: 'fl-n021',
    category: 'logo',
    name: 'Logo Dominant Center',
    description: 'Large centered logo takes the top; compact name and contact below',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'midnight',
    regions: [
      { name: 'logo',         x: SX, y: SY,      width: SW, height: 20, align: 'center', verticalAlign: 'middle' },
      { name: 'name-title',   x: SX, y: SY + 22, width: SW, height: 12, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 36, width: SW, height: 8,  align: 'center', verticalAlign: 'top' },
    ],
  },

  // fl-n022 — logo, logo right, name+contact left
  {
    id: 'fl-n022',
    category: 'logo',
    name: 'Logo Right Column',
    description: 'Logo fills right quarter; name and contact stack left',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'ocean',
    regions: [
      { name: 'name-title',   x: SX,            y: SY,      width: SW * 0.65, height: 20, align: 'left',   verticalAlign: 'middle' },
      { name: 'contact-info', x: SX,            y: SY + 22, width: SW * 0.65, height: 16, align: 'left',   verticalAlign: 'top' },
      { name: 'logo',         x: SX + SW * 0.7, y: SY,      width: SW * 0.3,  height: SH, align: 'center', verticalAlign: 'middle' },
    ],
  },

  // fl-n023 — qr-code, QR centered bottom, name top
  {
    id: 'fl-n023',
    category: 'qr-code',
    name: 'QR Bottom Center',
    description: 'Name and contact in the top two-thirds; QR centered at the bottom',
    supports: { portrait: false, logo: false, qrCode: true },
    defaultPaletteId: 'navy',
    regions: [
      { name: 'name-title',   x: SX, y: SY,                     width: SW,  height: 18, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 20,                 width: SW,  height: 10, align: 'center', verticalAlign: 'top' },
      { name: 'qr-code',      x: SX + (SW - 16) / 2, y: SY + SH - 16, width: 16, height: 16, align: 'center', verticalAlign: 'bottom' },
    ],
  },

  // fl-n024 — portrait, full-bleed portrait right half, text left
  {
    id: 'fl-n024',
    category: 'portrait',
    name: 'Portrait Half Panel',
    description: 'Portrait fills the entire right half; name and contact on the left',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'slate',
    regions: [
      { name: 'name-title',   x: SX, y: SY,      width: SW * 0.48, height: 20, align: 'left', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX, y: SY + 22, width: SW * 0.48, height: SH - 22, align: 'left', verticalAlign: 'top' },
      { name: 'portrait',     x: SX + SW * 0.52, y: 0, width: W - SX - SW * 0.52, height: H, align: 'center', verticalAlign: 'middle', clipShape: 'rect' },
    ],
  },

  // fl-n025 — portrait-qr, portrait top-left, qr bottom-right, name right, contact bottom-left
  {
    id: 'fl-n025',
    category: 'portrait-qr',
    name: 'Portrait QR Diagonal',
    description: 'Portrait top-left, QR bottom-right, name top-right, contact bottom-left',
    supports: { portrait: true, logo: false, qrCode: true },
    defaultPaletteId: 'lavender',
    regions: [
      { name: 'portrait',     x: SX,           y: SY,           width: 22,       height: 22, align: 'center', verticalAlign: 'top',    clipShape: 'circle' },
      { name: 'name-title',   x: SX + 24,      y: SY,           width: SW - 24,  height: 22, align: 'right',  verticalAlign: 'middle' },
      { name: 'contact-info', x: SX,           y: SY + 24,      width: SW - 18,  height: 18, align: 'left',   verticalAlign: 'top' },
      { name: 'qr-code',      x: SX + SW - 16, y: SY + SH - 16, width: 16,       height: 16, align: 'right',  verticalAlign: 'bottom' },
    ],
  },

  // fl-n026 — logo-portrait, logo bottom-right, portrait circle left, name top
  {
    id: 'fl-n026',
    category: 'logo-portrait',
    name: 'Portrait Left Logo Right',
    description: 'Portrait circle on left, logo bottom-right, name and contact fill center',
    supports: { portrait: true, logo: true, qrCode: false },
    defaultPaletteId: 'charcoal',
    regions: [
      { name: 'portrait',     x: SX,            y: SY + (SH - 24) / 2, width: 24, height: 24, align: 'center', verticalAlign: 'middle', clipShape: 'circle' },
      { name: 'name-title',   x: SX + 28,       y: SY,                  width: SW - 28, height: 18, align: 'left', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX + 28,       y: SY + 20,             width: SW - 46, height: 14, align: 'left', verticalAlign: 'top' },
      { name: 'logo',         x: SX + SW - 16,  y: SY + SH - 16,        width: 16, height: 16, align: 'right', verticalAlign: 'bottom' },
    ],
  },

  // fl-n027 — text-only, name top center, contact split left/right below
  {
    id: 'fl-n027',
    category: 'text-only',
    name: 'Top Center Split',
    description: 'Name centered at top; contact and social split into two equal columns below',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'midnight',
    regions: [
      { name: 'name-title',   x: SX,             y: SY,      width: SW,       height: 16, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX,             y: SY + 20, width: SW * 0.48, height: 22, align: 'left',  verticalAlign: 'top' },
      { name: 'social',       x: SX + SW * 0.52, y: SY + 20, width: SW * 0.48, height: 22, align: 'left',  verticalAlign: 'top' },
    ],
  },

  // fl-n028 — logo-qr, logo center, qr bottom-right, name top, contact mid
  {
    id: 'fl-n028',
    category: 'logo-qr',
    name: 'Logo Center QR Corner',
    description: 'Name top-left, logo centered, contact below logo, QR bottom-right',
    supports: { portrait: false, logo: true, qrCode: true },
    defaultPaletteId: 'ocean',
    regions: [
      { name: 'name-title',   x: SX,           y: SY,           width: SW * 0.6, height: 14, align: 'left',   verticalAlign: 'top' },
      { name: 'logo',         x: SX,           y: SY + 16,      width: SW,       height: 14, align: 'center', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX,           y: SY + 32,      width: SW - 18,  height: 10, align: 'left',   verticalAlign: 'top' },
      { name: 'qr-code',      x: SX + SW - 16, y: SY + SH - 16, width: 16,       height: 16, align: 'right',  verticalAlign: 'bottom' },
    ],
  },

  // fl-n029 — text-only, sparse luxury: name only top, one contact line bottom
  {
    id: 'fl-n029',
    category: 'text-only',
    name: 'Minimal Luxury',
    description: 'Very sparse: large name top-left, single contact line bottom-left',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'charcoal',
    regions: [
      { name: 'name-title',   x: SX, y: SY,          width: SW,       height: 20, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + SH - 8, width: SW * 0.7, height: 8,  align: 'left', verticalAlign: 'bottom' },
    ],
  },

  // fl-n030 — logo, logo top-right, name bottom-left
  {
    id: 'fl-n030',
    category: 'logo',
    name: 'Logo Top Right Name Bottom',
    description: 'Logo anchored top-right; name and contact fill lower-left',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'navy',
    regions: [
      { name: 'logo',         x: SX + SW - 20, y: SY,           width: 20,      height: 16, align: 'right', verticalAlign: 'top' },
      { name: 'name-title',   x: SX,           y: SY + SH - 24, width: SW * 0.7, height: 16, align: 'left',  verticalAlign: 'top' },
      { name: 'contact-info', x: SX,           y: SY + SH - 8,  width: SW * 0.7, height: 8,  align: 'left',  verticalAlign: 'top' },
    ],
  },

  // fl-n031 — portrait, portrait full-left strip, name+contact right
  {
    id: 'fl-n031',
    category: 'portrait',
    name: 'Portrait Strip Left',
    description: 'Tall portrait strip on left edge; name and contact on right',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'lavender',
    regions: [
      { name: 'portrait',     x: 0,       y: 0,  width: SX + 20, height: H, align: 'center', verticalAlign: 'middle', clipShape: 'rect' },
      { name: 'name-title',   x: SX + 24, y: SY, width: SW - 24, height: 20, align: 'left', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX + 24, y: SY + 22, width: SW - 24, height: SH - 22, align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-n032 — text-only, name right-aligned large, contact left small
  {
    id: 'fl-n032',
    category: 'text-only',
    name: 'Name Right Contact Left',
    description: 'Large name right-aligned; contact details left-aligned opposite',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'slate',
    regions: [
      { name: 'contact-info', x: SX,             y: SY,      width: SW * 0.4,  height: SH, align: 'left',  verticalAlign: 'middle' },
      { name: 'name-title',   x: SX + SW * 0.45, y: SY,      width: SW * 0.55, height: SH, align: 'right', verticalAlign: 'middle' },
    ],
  },

  // fl-n033 — logo-qr, logo left, qr right, name center top, contact center bottom
  {
    id: 'fl-n033',
    category: 'logo-qr',
    name: 'Logo QR Flanking',
    description: 'Logo and QR flank the sides; name and contact centered between them',
    supports: { portrait: false, logo: true, qrCode: true },
    defaultPaletteId: 'midnight',
    regions: [
      { name: 'logo',         x: SX,           y: SY + (SH - 16) / 2, width: 18, height: 16, align: 'left',   verticalAlign: 'middle' },
      { name: 'name-title',   x: SX + 22,      y: SY,                  width: SW - 46, height: 22, align: 'center', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX + 22,      y: SY + SH * 0.52,      width: SW - 46, height: SH * 0.48, align: 'center', verticalAlign: 'top' },
      { name: 'qr-code',      x: SX + SW - 20, y: SY + (SH - 20) / 2,  width: 20, height: 20, align: 'right',  verticalAlign: 'middle' },
    ],
  },

  // fl-n034 — portrait-qr, portrait and QR both bottom, name top
  {
    id: 'fl-n034',
    category: 'portrait-qr',
    name: 'Portrait QR Bottom Row',
    description: 'Name and contact at top; portrait circle and QR side by side at bottom',
    supports: { portrait: true, logo: false, qrCode: true },
    defaultPaletteId: 'ocean',
    regions: [
      { name: 'name-title',   x: SX,           y: SY,           width: SW,  height: 18, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX,           y: SY + 20,      width: SW,  height: 12, align: 'center', verticalAlign: 'top' },
      { name: 'portrait',     x: SX,           y: SY + SH - 18, width: 18,  height: 18, align: 'center', verticalAlign: 'bottom', clipShape: 'circle' },
      { name: 'qr-code',      x: SX + 22,      y: SY + SH - 16, width: 16,  height: 16, align: 'left',   verticalAlign: 'bottom' },
    ],
  },

  // fl-n035 — logo-portrait, portrait right circle, logo top-left inline with name
  {
    id: 'fl-n035',
    category: 'logo-portrait',
    name: 'Logo Inline Portrait Right',
    description: 'Logo beside name top-left; portrait circle anchored center-right',
    supports: { portrait: true, logo: true, qrCode: false },
    defaultPaletteId: 'charcoal',
    regions: [
      { name: 'logo',         x: SX,            y: SY,                  width: 14,       height: 14, align: 'left',   verticalAlign: 'middle' },
      { name: 'name-title',   x: SX + 16,       y: SY,                  width: SW * 0.5, height: 14, align: 'left',   verticalAlign: 'middle' },
      { name: 'contact-info', x: SX,            y: SY + 18,             width: SW * 0.65, height: 20, align: 'left',  verticalAlign: 'top' },
      { name: 'portrait',     x: SX + SW - 22,  y: SY + (SH - 24) / 2,  width: 22,       height: 24, align: 'center', verticalAlign: 'middle', clipShape: 'circle' },
    ],
  },

  // fl-n036 — text-only, tagline slot below name
  {
    id: 'fl-n036',
    category: 'text-only',
    name: 'Tagline Row',
    description: 'Name top, tagline directly below, contact and social at the bottom',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'navy',
    regions: [
      { name: 'name-title',   x: SX, y: SY,      width: SW, height: 14, align: 'left',   verticalAlign: 'top' },
      { name: 'tagline',      x: SX, y: SY + 16, width: SW, height: 8,  align: 'left',   verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 26, width: SW * 0.55, height: 16, align: 'left', verticalAlign: 'top' },
      { name: 'social',       x: SX + SW * 0.6, y: SY + 26, width: SW * 0.4, height: 16, align: 'right', verticalAlign: 'top' },
    ],
  },

  // fl-n037 — logo, logo top-center, name centered below, contact bottom
  {
    id: 'fl-n037',
    category: 'logo',
    name: 'Centered Stacked Logo',
    description: 'Logo, name, and contact all centered in a clean vertical stack',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'lavender',
    regions: [
      { name: 'logo',         x: SX, y: SY,      width: SW, height: 12, align: 'center', verticalAlign: 'top' },
      { name: 'name-title',   x: SX, y: SY + 14, width: SW, height: 16, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 32, width: SW, height: 12, align: 'center', verticalAlign: 'top' },
    ],
  },

  // fl-n038 — qr-code, QR top-left, name right, contact below QR and name
  {
    id: 'fl-n038',
    category: 'qr-code',
    name: 'QR Top Left',
    description: 'QR code top-left; name right of QR; contact spans full width below',
    supports: { portrait: false, logo: false, qrCode: true },
    defaultPaletteId: 'ocean',
    regions: [
      { name: 'qr-code',      x: SX,       y: SY,      width: 20, height: 20, align: 'left',  verticalAlign: 'top' },
      { name: 'name-title',   x: SX + 24,  y: SY,      width: SW - 24, height: 20, align: 'left', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX,       y: SY + 24, width: SW,      height: 18, align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-n039 — portrait-qr, portrait right, qr left, name+contact center
  {
    id: 'fl-n039',
    category: 'portrait-qr',
    name: 'QR Left Portrait Right',
    description: 'QR code left side, portrait right side, name and contact in the middle',
    supports: { portrait: true, logo: false, qrCode: true },
    defaultPaletteId: 'slate',
    regions: [
      { name: 'qr-code',      x: SX,           y: SY + (SH - 24) / 2,  width: 22, height: 24, align: 'left',   verticalAlign: 'middle' },
      { name: 'name-title',   x: SX + 26,      y: SY,                   width: SW - 52, height: 20, align: 'center', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX + 26,      y: SY + SH * 0.5,        width: SW - 52, height: SH * 0.5, align: 'center', verticalAlign: 'top' },
      { name: 'portrait',     x: SX + SW - 24, y: SY + (SH - 26) / 2,   width: 24, height: 26, align: 'center', verticalAlign: 'middle', clipShape: 'circle' },
    ],
  },

  // fl-n040 — text-only, name bottom-center large
  {
    id: 'fl-n040',
    category: 'text-only',
    name: 'Name Anchored Bottom',
    description: 'Contact at the top; large name anchored to the bottom center',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'midnight',
    regions: [
      { name: 'contact-info', x: SX, y: SY,           width: SW,       height: 14, align: 'center', verticalAlign: 'top' },
      { name: 'social',       x: SX, y: SY + 16,      width: SW,       height: 8,  align: 'center', verticalAlign: 'top' },
      { name: 'name-title',   x: SX, y: SY + SH - 14, width: SW,       height: 14, align: 'center', verticalAlign: 'bottom' },
    ],
  },

  // fl-n041 — logo-qr, logo inline with name, qr top-right
  {
    id: 'fl-n041',
    category: 'logo-qr',
    name: 'Logo Name Inline QR Corner',
    description: 'Logo and name inline on left; QR top-right; contact below',
    supports: { portrait: false, logo: true, qrCode: true },
    defaultPaletteId: 'charcoal',
    regions: [
      { name: 'logo',         x: SX,           y: SY,      width: 16,      height: 14, align: 'left',  verticalAlign: 'middle' },
      { name: 'name-title',   x: SX + 18,      y: SY,      width: SW - 36, height: 14, align: 'left',  verticalAlign: 'middle' },
      { name: 'qr-code',      x: SX + SW - 16, y: SY,      width: 16,      height: 16, align: 'right', verticalAlign: 'top' },
      { name: 'contact-info', x: SX,           y: SY + 18, width: SW,      height: 24, align: 'left',  verticalAlign: 'top' },
    ],
  },

  // fl-n042 — text-only, credentials region
  {
    id: 'fl-n042',
    category: 'text-only',
    name: 'Credentials Bar',
    description: 'Name top, credentials strip, contact and social at bottom',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'navy',
    regions: [
      { name: 'name-title',   x: SX, y: SY,      width: SW, height: 14, align: 'left', verticalAlign: 'top' },
      { name: 'credentials',  x: SX, y: SY + 16, width: SW, height: 8,  align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 26, width: SW * 0.55, height: 16, align: 'left', verticalAlign: 'top' },
      { name: 'social',       x: SX + SW * 0.6, y: SY + 26, width: SW * 0.4, height: 16, align: 'right', verticalAlign: 'top' },
    ],
  },

  // fl-n043 — logo, logo bottom-center, name top
  {
    id: 'fl-n043',
    category: 'logo',
    name: 'Logo Bottom Center',
    description: 'Name at top, contact center, logo anchored bottom-center',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'ocean',
    regions: [
      { name: 'name-title',   x: SX, y: SY,                          width: SW, height: 16, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 18,                     width: SW, height: 14, align: 'center', verticalAlign: 'top' },
      { name: 'logo',         x: SX + (SW - 20) / 2, y: SY + SH - 14, width: 20, height: 14, align: 'center', verticalAlign: 'bottom' },
    ],
  },

  // fl-n044 — portrait, portrait top-left square, name below portrait, contact right
  {
    id: 'fl-n044',
    category: 'portrait',
    name: 'Portrait Square Top Left',
    description: 'Square portrait top-left, name stacked below it, contact fills right side',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'lavender',
    regions: [
      { name: 'portrait',     x: SX,            y: SY,      width: 24, height: 24, align: 'left',  verticalAlign: 'top',    clipShape: 'rect' },
      { name: 'name-title',   x: SX,            y: SY + 26, width: 24, height: 16, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX + 28,       y: SY,      width: SW - 28, height: SH, align: 'left', verticalAlign: 'middle' },
    ],
  },

  // fl-n045 — text-only, wide name center, contact below in two micro-columns
  {
    id: 'fl-n045',
    category: 'text-only',
    name: 'Wide Name Micro Columns',
    description: 'Full-width centered name; contact splits into two tight micro-columns below',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'slate',
    regions: [
      { name: 'name-title',   x: SX,             y: SY,      width: SW,        height: 18, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX,             y: SY + 22, width: SW * 0.46, height: 20, align: 'left',  verticalAlign: 'top' },
      { name: 'social',       x: SX + SW * 0.52, y: SY + 22, width: SW * 0.48, height: 20, align: 'right', verticalAlign: 'top' },
    ],
  },

  // fl-n046 — logo-portrait, logo center-top, portrait bottom-center
  {
    id: 'fl-n046',
    category: 'logo-portrait',
    name: 'Logo Top Portrait Bottom',
    description: 'Logo centered at top, name in center, portrait circle anchored at bottom',
    supports: { portrait: true, logo: true, qrCode: false },
    defaultPaletteId: 'midnight',
    regions: [
      { name: 'logo',         x: SX, y: SY,                         width: SW, height: 12, align: 'center', verticalAlign: 'top' },
      { name: 'name-title',   x: SX, y: SY + 14,                    width: SW, height: 14, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 30,                    width: SW - 22, height: 10, align: 'left', verticalAlign: 'top' },
      { name: 'portrait',     x: SX + SW - 18, y: SY + SH - 18,     width: 18, height: 18, align: 'right', verticalAlign: 'bottom', clipShape: 'circle' },
    ],
  },

  // fl-n047 — qr-code, QR top-right, name+contact left
  {
    id: 'fl-n047',
    category: 'qr-code',
    name: 'QR Top Right',
    description: 'Large QR code top-right; name and contact fill the left side',
    supports: { portrait: false, logo: false, qrCode: true },
    defaultPaletteId: 'charcoal',
    regions: [
      { name: 'name-title',   x: SX,           y: SY,      width: SW - 24, height: 20, align: 'left', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX,           y: SY + 22, width: SW - 24, height: 20, align: 'left', verticalAlign: 'top' },
      { name: 'qr-code',      x: SX + SW - 22, y: SY,      width: 22,      height: 22, align: 'right', verticalAlign: 'top' },
    ],
  },

  // fl-n048 — text-only, name vertical text effect (rotated region is not supported, so tall narrow left + wide right)
  {
    id: 'fl-n048',
    category: 'text-only',
    name: 'Narrow Left Wide Right',
    description: 'Very narrow name column on the left; wide contact block on the right',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'navy',
    regions: [
      { name: 'name-title',   x: SX,             y: SY, width: SW * 0.28, height: SH, align: 'center', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX + SW * 0.33, y: SY, width: SW * 0.67, height: SH * 0.6, align: 'left', verticalAlign: 'middle' },
      { name: 'social',       x: SX + SW * 0.33, y: SY + SH * 0.65, width: SW * 0.67, height: SH * 0.35, align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-n049 — logo, logo left inline, name right, contact full width below
  {
    id: 'fl-n049',
    category: 'logo',
    name: 'Logo Inline Full Contact',
    description: 'Logo and name share the top row inline; contact spans full width below',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'ocean',
    regions: [
      { name: 'logo',         x: SX,       y: SY,      width: 16,      height: 14, align: 'left',   verticalAlign: 'middle' },
      { name: 'name-title',   x: SX + 18,  y: SY,      width: SW - 18, height: 14, align: 'left',   verticalAlign: 'middle' },
      { name: 'contact-info', x: SX,       y: SY + 16, width: SW,      height: SH - 16, align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-n050 — portrait-qr, all four corners used
  {
    id: 'fl-n050',
    category: 'portrait-qr',
    name: 'Four Corner Elements',
    description: 'Portrait top-left, QR top-right, name bottom-left, contact bottom-right',
    supports: { portrait: true, logo: false, qrCode: true },
    defaultPaletteId: 'slate',
    regions: [
      { name: 'portrait',     x: SX,           y: SY,           width: 20, height: 20, align: 'left',  verticalAlign: 'top',    clipShape: 'circle' },
      { name: 'qr-code',      x: SX + SW - 18, y: SY,           width: 18, height: 18, align: 'right', verticalAlign: 'top' },
      { name: 'name-title',   x: SX,           y: SY + SH - 16, width: SW * 0.55, height: 16, align: 'left',  verticalAlign: 'bottom' },
      { name: 'contact-info', x: SX + SW * 0.6, y: SY + SH - 16, width: SW * 0.4, height: 16, align: 'right', verticalAlign: 'bottom' },
    ],
  },

  // fl-n051 — text-only, name enormous fills top 60%
  {
    id: 'fl-n051',
    category: 'text-only',
    name: 'Giant Name',
    description: 'Name renders very large filling the top; minimal contact below',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'midnight',
    regions: [
      { name: 'name-title',   x: SX, y: SY,            width: SW, height: SH * 0.58, align: 'left', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX, y: SY + SH * 0.62, width: SW * 0.7, height: SH * 0.38, align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-n052 — logo, logo right aligned top, name below logo, contact left
  {
    id: 'fl-n052',
    category: 'logo',
    name: 'Logo Stack Right',
    description: 'Logo and name stacked right; contact fills left side',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'lavender',
    regions: [
      { name: 'contact-info', x: SX,            y: SY, width: SW * 0.5, height: SH, align: 'left',  verticalAlign: 'middle' },
      { name: 'logo',         x: SX + SW * 0.55, y: SY, width: SW * 0.45, height: 16, align: 'right', verticalAlign: 'top' },
      { name: 'name-title',   x: SX + SW * 0.55, y: SY + 18, width: SW * 0.45, height: SH - 18, align: 'right', verticalAlign: 'top' },
    ],
  },

  // fl-n053 — portrait, portrait centered large, name below
  {
    id: 'fl-n053',
    category: 'portrait',
    name: 'Portrait Center Stage',
    description: 'Large portrait dominates the card center; name and contact below',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'charcoal',
    regions: [
      { name: 'portrait',     x: SX + (SW - 28) / 2, y: SY,      width: 28, height: 28, align: 'center', verticalAlign: 'top', clipShape: 'circle' },
      { name: 'name-title',   x: SX, y: SY + 30,                  width: SW, height: 10, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 42,                  width: SW, height: 8,  align: 'center', verticalAlign: 'top' },
    ],
  },

  // fl-n054 — logo-qr, all three elements in a row
  {
    id: 'fl-n054',
    category: 'logo-qr',
    name: 'Three Element Top Row',
    description: 'Logo, name, and QR in a horizontal top row; contact below full-width',
    supports: { portrait: false, logo: true, qrCode: true },
    defaultPaletteId: 'ocean',
    regions: [
      { name: 'logo',         x: SX,           y: SY,      width: 16,      height: 14, align: 'left',   verticalAlign: 'middle' },
      { name: 'name-title',   x: SX + 18,      y: SY,      width: SW - 38, height: 14, align: 'center', verticalAlign: 'middle' },
      { name: 'qr-code',      x: SX + SW - 18, y: SY,      width: 18,      height: 18, align: 'right',  verticalAlign: 'top' },
      { name: 'contact-info', x: SX,           y: SY + 20, width: SW,      height: 22, align: 'left',   verticalAlign: 'top' },
    ],
  },

  // fl-n055 — text-only, name right, contact left, both vertically centered
  {
    id: 'fl-n055',
    category: 'text-only',
    name: 'Mirrored Columns',
    description: 'Contact left-column, name right-column, both vertically centered',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'navy',
    regions: [
      { name: 'contact-info', x: SX,             y: SY, width: SW * 0.46, height: SH, align: 'left',  verticalAlign: 'middle' },
      { name: 'name-title',   x: SX + SW * 0.52, y: SY, width: SW * 0.48, height: SH, align: 'right', verticalAlign: 'middle' },
    ],
  },

  // fl-n056 — logo-portrait, logo bottom-left, portrait top-right, name center
  {
    id: 'fl-n056',
    category: 'logo-portrait',
    name: 'Logo Bottom Left Portrait Top Right',
    description: 'Logo anchors bottom-left, portrait top-right, name and contact center',
    supports: { portrait: true, logo: true, qrCode: false },
    defaultPaletteId: 'slate',
    regions: [
      { name: 'portrait',     x: SX + SW - 20, y: SY,           width: 20, height: 20, align: 'right', verticalAlign: 'top',    clipShape: 'circle' },
      { name: 'name-title',   x: SX,           y: SY + 4,       width: SW - 24, height: 14, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX,           y: SY + 20,      width: SW - 24, height: 18, align: 'left', verticalAlign: 'top' },
      { name: 'logo',         x: SX,           y: SY + SH - 14, width: 16,      height: 14, align: 'left', verticalAlign: 'bottom' },
    ],
  },

  // fl-n057 — qr-code, QR bottom-left, name top-right
  {
    id: 'fl-n057',
    category: 'qr-code',
    name: 'QR Bottom Left',
    description: 'Name and contact fill the upper right; QR anchored bottom-left',
    supports: { portrait: false, logo: false, qrCode: true },
    defaultPaletteId: 'midnight',
    regions: [
      { name: 'name-title',   x: SX + 22,      y: SY,           width: SW - 22, height: 18, align: 'right', verticalAlign: 'top' },
      { name: 'contact-info', x: SX + 22,      y: SY + 20,      width: SW - 22, height: 18, align: 'right', verticalAlign: 'top' },
      { name: 'qr-code',      x: SX,           y: SY + SH - 20, width: 20,      height: 20, align: 'left',  verticalAlign: 'bottom' },
    ],
  },

  // fl-n058 — text-only, social top, name middle, contact bottom
  {
    id: 'fl-n058',
    category: 'text-only',
    name: 'Inverted Stack',
    description: 'Social handles at top; name in the middle; contact at the bottom',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'charcoal',
    regions: [
      { name: 'social',       x: SX, y: SY,      width: SW, height: 8,  align: 'center', verticalAlign: 'top' },
      { name: 'name-title',   x: SX, y: SY + 12, width: SW, height: 18, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 32, width: SW, height: 12, align: 'center', verticalAlign: 'top' },
    ],
  },

  // fl-n059 — logo, logo left tall, name+contact right two rows
  {
    id: 'fl-n059',
    category: 'logo',
    name: 'Logo Tall Left',
    description: 'Tall logo panel on left; name and contact in two rows on right',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'ocean',
    regions: [
      { name: 'logo',         x: SX,             y: SY, width: SW * 0.2, height: SH, align: 'center', verticalAlign: 'middle' },
      { name: 'name-title',   x: SX + SW * 0.25, y: SY, width: SW * 0.75, height: SH * 0.5, align: 'left', verticalAlign: 'bottom' },
      { name: 'contact-info', x: SX + SW * 0.25, y: SY + SH * 0.52, width: SW * 0.75, height: SH * 0.48, align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-n060 — portrait-qr, name+contact top, portrait bottom-left circle, qr bottom-right
  {
    id: 'fl-n060',
    category: 'portrait-qr',
    name: 'Content Top Assets Bottom',
    description: 'Name and contact fill top; portrait and QR share the bottom',
    supports: { portrait: true, logo: false, qrCode: true },
    defaultPaletteId: 'lavender',
    regions: [
      { name: 'name-title',   x: SX,           y: SY,           width: SW, height: 18, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX,           y: SY + 20,      width: SW, height: 10, align: 'center', verticalAlign: 'top' },
      { name: 'portrait',     x: SX,           y: SY + SH - 16, width: 16, height: 16, align: 'left',   verticalAlign: 'bottom', clipShape: 'circle' },
      { name: 'qr-code',      x: SX + 20,      y: SY + SH - 16, width: 14, height: 14, align: 'left',   verticalAlign: 'bottom' },
    ],
  },

  // fl-n061 — text-only, all centered with generous spacing
  {
    id: 'fl-n061',
    category: 'text-only',
    name: 'Generous Centered',
    description: 'All elements centered with deliberate white space between them',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'slate',
    regions: [
      { name: 'name-title',   x: SX, y: SY + 2,  width: SW, height: 16, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 24, width: SW, height: 12, align: 'center', verticalAlign: 'top' },
      { name: 'social',       x: SX, y: SY + 40, width: SW, height: 6,  align: 'center', verticalAlign: 'top' },
    ],
  },

  // fl-n062 — logo-qr, logo and qr inline bottom, name top
  {
    id: 'fl-n062',
    category: 'logo-qr',
    name: 'Name Top Logo QR Bottom',
    description: 'Large name at top; logo and QR code sit side by side at the bottom',
    supports: { portrait: false, logo: true, qrCode: true },
    defaultPaletteId: 'navy',
    regions: [
      { name: 'name-title',   x: SX,      y: SY,           width: SW, height: 18, align: 'left',   verticalAlign: 'top' },
      { name: 'contact-info', x: SX,      y: SY + 20,      width: SW, height: 12, align: 'left',   verticalAlign: 'top' },
      { name: 'logo',         x: SX,      y: SY + SH - 14, width: 16, height: 14, align: 'left',   verticalAlign: 'bottom' },
      { name: 'qr-code',      x: SX + 20, y: SY + SH - 16, width: 16, height: 16, align: 'left',   verticalAlign: 'bottom' },
    ],
  },

  // fl-n063 — portrait, portrait right full-height strip
  {
    id: 'fl-n063',
    category: 'portrait',
    name: 'Portrait Strip Right',
    description: 'Full-height portrait strip on right; name and contact on left',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'midnight',
    regions: [
      { name: 'name-title',   x: SX, y: SY,      width: SW * 0.6, height: 20, align: 'left', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX, y: SY + 22, width: SW * 0.6, height: SH - 22, align: 'left', verticalAlign: 'top' },
      { name: 'portrait',     x: SX + SW * 0.65, y: 0, width: W - SX - SW * 0.65, height: H, align: 'center', verticalAlign: 'middle', clipShape: 'rect' },
    ],
  },

  // fl-n064 — text-only, name left + social right same row, contact full row below
  {
    id: 'fl-n064',
    category: 'text-only',
    name: 'Name Social Row',
    description: 'Name left and social right share the top row; contact spans below',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'charcoal',
    regions: [
      { name: 'name-title',   x: SX,             y: SY,      width: SW * 0.55, height: 14, align: 'left',  verticalAlign: 'middle' },
      { name: 'social',       x: SX + SW * 0.6,  y: SY,      width: SW * 0.4,  height: 14, align: 'right', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX,             y: SY + 16, width: SW,        height: SH - 16, align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-n065 — logo, logo right + tagline below logo, name left
  {
    id: 'fl-n065',
    category: 'logo',
    name: 'Logo Tagline Right',
    description: 'Name and contact on left; logo with tagline beneath it on the right',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'ocean',
    regions: [
      { name: 'name-title',   x: SX,            y: SY,      width: SW * 0.55, height: 18, align: 'left',  verticalAlign: 'top' },
      { name: 'contact-info', x: SX,            y: SY + 20, width: SW * 0.55, height: 22, align: 'left',  verticalAlign: 'top' },
      { name: 'logo',         x: SX + SW * 0.6, y: SY,      width: SW * 0.4,  height: 20, align: 'center', verticalAlign: 'top' },
      { name: 'tagline',      x: SX + SW * 0.6, y: SY + 22, width: SW * 0.4,  height: 8,  align: 'center', verticalAlign: 'top' },
    ],
  },

  // fl-n066 — qr-code, QR large centered, name+contact above and below
  {
    id: 'fl-n066',
    category: 'qr-code',
    name: 'QR Center Focus',
    description: 'QR code is the visual centerpiece; name above, contact below',
    supports: { portrait: false, logo: false, qrCode: true },
    defaultPaletteId: 'slate',
    regions: [
      { name: 'name-title',   x: SX, y: SY,                          width: SW, height: 10, align: 'center', verticalAlign: 'top' },
      { name: 'qr-code',      x: SX + (SW - 22) / 2, y: SY + 12,    width: 22, height: 22, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 36,                    width: SW, height: 8,  align: 'center', verticalAlign: 'top' },
    ],
  },

  // fl-n067 — logo-portrait, both on same right side
  {
    id: 'fl-n067',
    category: 'logo-portrait',
    name: 'Logo Portrait Right Side',
    description: 'Logo top-right and portrait bottom-right; name and contact fill left side',
    supports: { portrait: true, logo: true, qrCode: false },
    defaultPaletteId: 'lavender',
    regions: [
      { name: 'name-title',   x: SX,           y: SY,           width: SW * 0.65, height: 20, align: 'left',  verticalAlign: 'top' },
      { name: 'contact-info', x: SX,           y: SY + 22,      width: SW * 0.65, height: 20, align: 'left',  verticalAlign: 'top' },
      { name: 'logo',         x: SX + SW * 0.7, y: SY,          width: SW * 0.3,  height: 14, align: 'right', verticalAlign: 'top' },
      { name: 'portrait',     x: SX + SW * 0.7, y: SY + SH - 20, width: SW * 0.3, height: 20, align: 'right', verticalAlign: 'bottom', clipShape: 'circle' },
    ],
  },

  // fl-n068 — text-only, name bottom-right, contact top-left
  {
    id: 'fl-n068',
    category: 'text-only',
    name: 'Reversed Diagonal',
    description: 'Contact details top-left; name anchored to the bottom-right',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'navy',
    regions: [
      { name: 'contact-info', x: SX,             y: SY,           width: SW * 0.6,  height: 18, align: 'left',  verticalAlign: 'top' },
      { name: 'social',       x: SX,             y: SY + 20,      width: SW * 0.5,  height: 10, align: 'left',  verticalAlign: 'top' },
      { name: 'name-title',   x: SX + SW * 0.35, y: SY + SH - 14, width: SW * 0.65, height: 14, align: 'right', verticalAlign: 'bottom' },
    ],
  },

  // fl-n069 — logo-qr, stacked vertically centered
  {
    id: 'fl-n069',
    category: 'logo-qr',
    name: 'Logo QR Vertical Stack',
    description: 'Logo, name, contact, and QR all stacked vertically and centered',
    supports: { portrait: false, logo: true, qrCode: true },
    defaultPaletteId: 'midnight',
    regions: [
      { name: 'logo',         x: SX, y: SY,                          width: SW, height: 10, align: 'center', verticalAlign: 'top' },
      { name: 'name-title',   x: SX, y: SY + 12,                     width: SW, height: 12, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 26,                     width: SW, height: 8,  align: 'center', verticalAlign: 'top' },
      { name: 'qr-code',      x: SX + (SW - 14) / 2, y: SY + SH - 14, width: 14, height: 14, align: 'center', verticalAlign: 'bottom' },
    ],
  },

  // fl-n070 — portrait, portrait top center, name below, contact at bottom
  {
    id: 'fl-n070',
    category: 'portrait',
    name: 'Portrait Top Center',
    description: 'Portrait circle centered at top, name directly below, contact at the bottom',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'ocean',
    regions: [
      { name: 'portrait',     x: SX + (SW - 22) / 2, y: SY,      width: 22, height: 22, align: 'center', verticalAlign: 'top', clipShape: 'circle' },
      { name: 'name-title',   x: SX,                 y: SY + 24, width: SW, height: 12, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX,                 y: SY + 38, width: SW, height: 8,  align: 'center', verticalAlign: 'top' },
    ],
  },

  // fl-n071 — text-only, compact card feel, everything small and left
  {
    id: 'fl-n071',
    category: 'text-only',
    name: 'Compact Left',
    description: 'All elements compacted into left half; right half intentionally blank',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'charcoal',
    regions: [
      { name: 'name-title',   x: SX, y: SY,      width: SW * 0.5, height: 16, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 18, width: SW * 0.5, height: 16, align: 'left', verticalAlign: 'top' },
      { name: 'social',       x: SX, y: SY + 36, width: SW * 0.5, height: 8,  align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-n072 — logo, logo bottom-left inline with social
  {
    id: 'fl-n072',
    category: 'logo',
    name: 'Logo Social Footer',
    description: 'Name and contact fill top; logo and social share the bottom row',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'slate',
    regions: [
      { name: 'name-title',   x: SX,      y: SY,           width: SW,      height: 18, align: 'left',   verticalAlign: 'top' },
      { name: 'contact-info', x: SX,      y: SY + 20,      width: SW,      height: 14, align: 'left',   verticalAlign: 'top' },
      { name: 'logo',         x: SX,      y: SY + SH - 10, width: 14,      height: 10, align: 'left',   verticalAlign: 'bottom' },
      { name: 'social',       x: SX + 18, y: SY + SH - 10, width: SW - 18, height: 10, align: 'left',   verticalAlign: 'bottom' },
    ],
  },

  // fl-n073 — portrait-qr, name top large, portrait mid-left, qr mid-right, contact below
  {
    id: 'fl-n073',
    category: 'portrait-qr',
    name: 'Name Top Assets Middle',
    description: 'Name spans top; portrait and QR side by side in the middle; contact at bottom',
    supports: { portrait: true, logo: false, qrCode: true },
    defaultPaletteId: 'midnight',
    regions: [
      { name: 'name-title',   x: SX,           y: SY,                   width: SW, height: 14, align: 'center', verticalAlign: 'top' },
      { name: 'portrait',     x: SX,           y: SY + 16,              width: SW * 0.45, height: 20, align: 'center', verticalAlign: 'top', clipShape: 'circle' },
      { name: 'qr-code',      x: SX + SW * 0.5, y: SY + 16,             width: 20,        height: 20, align: 'left',   verticalAlign: 'top' },
      { name: 'contact-info', x: SX,           y: SY + SH - 8,          width: SW,        height: 8,  align: 'center', verticalAlign: 'top' },
    ],
  },

  // fl-n074 — logo-portrait, logo center, name below logo, portrait right
  {
    id: 'fl-n074',
    category: 'logo-portrait',
    name: 'Logo Center Portrait Side',
    description: 'Logo and name centered; portrait circle to the right; contact at bottom',
    supports: { portrait: true, logo: true, qrCode: false },
    defaultPaletteId: 'navy',
    regions: [
      { name: 'logo',         x: SX,           y: SY,      width: SW - 26, height: 12, align: 'center', verticalAlign: 'top' },
      { name: 'name-title',   x: SX,           y: SY + 14, width: SW - 26, height: 14, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX,           y: SY + 30, width: SW - 26, height: 12, align: 'center', verticalAlign: 'top' },
      { name: 'portrait',     x: SX + SW - 22, y: SY + (SH - 24) / 2, width: 22, height: 24, align: 'right', verticalAlign: 'middle', clipShape: 'circle' },
    ],
  },

  // fl-n075 — text-only, name + tagline headline block, contact bottom
  {
    id: 'fl-n075',
    category: 'text-only',
    name: 'Tagline Headline',
    description: 'Name and tagline form a headline block; contact details below',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'ocean',
    regions: [
      { name: 'name-title',   x: SX, y: SY,      width: SW, height: 16, align: 'left', verticalAlign: 'top' },
      { name: 'tagline',      x: SX, y: SY + 18, width: SW, height: 8,  align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 30, width: SW * 0.6, height: 16, align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-n076 — qr-code, name top-right, contact bottom-left, QR bottom-right
  {
    id: 'fl-n076',
    category: 'qr-code',
    name: 'QR Bottom Right Name Top',
    description: 'Name top-right, contact bottom-left, QR anchored bottom-right',
    supports: { portrait: false, logo: false, qrCode: true },
    defaultPaletteId: 'lavender',
    regions: [
      { name: 'name-title',   x: SX,           y: SY,           width: SW - 24, height: 18, align: 'right', verticalAlign: 'top' },
      { name: 'contact-info', x: SX,           y: SY + SH - 18, width: SW - 22, height: 18, align: 'left',  verticalAlign: 'bottom' },
      { name: 'qr-code',      x: SX + SW - 20, y: SY + SH - 20, width: 20,      height: 20, align: 'right', verticalAlign: 'bottom' },
    ],
  },

  // fl-n077 — logo, name + logo in header band, contact full below
  {
    id: 'fl-n077',
    category: 'logo',
    name: 'Header Band Logo',
    description: 'Name and logo share a top header band; contact info below',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'charcoal',
    regions: [
      { name: 'name-title',   x: SX,            y: SY,      width: SW * 0.72, height: 14, align: 'left',  verticalAlign: 'middle' },
      { name: 'logo',         x: SX + SW * 0.78, y: SY,     width: SW * 0.22, height: 14, align: 'right', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX,            y: SY + 18, width: SW,        height: 22, align: 'left',  verticalAlign: 'top' },
      { name: 'social',       x: SX,            y: SY + 42, width: SW,        height: 6,  align: 'left',  verticalAlign: 'top' },
    ],
  },

  // fl-n078 — portrait-qr, portrait centered, qr top-left, name below portrait, contact bottom
  {
    id: 'fl-n078',
    category: 'portrait-qr',
    name: 'Portrait Center QR Accent',
    description: 'Portrait circle centered; QR accent top-left; name and contact below portrait',
    supports: { portrait: true, logo: false, qrCode: true },
    defaultPaletteId: 'slate',
    regions: [
      { name: 'qr-code',      x: SX,                 y: SY,      width: 16, height: 16, align: 'left',   verticalAlign: 'top' },
      { name: 'portrait',     x: SX + (SW - 24) / 2, y: SY,      width: 24, height: 24, align: 'center', verticalAlign: 'top', clipShape: 'circle' },
      { name: 'name-title',   x: SX,                 y: SY + 26, width: SW, height: 12, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX,                 y: SY + 40, width: SW, height: 8,  align: 'center', verticalAlign: 'top' },
    ],
  },

  // fl-n079 — text-only, social handles prominent top, name below
  {
    id: 'fl-n079',
    category: 'text-only',
    name: 'Social First',
    description: 'Social handles displayed prominently at top; name and contact below',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'midnight',
    regions: [
      { name: 'social',       x: SX, y: SY,      width: SW, height: 12, align: 'center', verticalAlign: 'top' },
      { name: 'name-title',   x: SX, y: SY + 14, width: SW, height: 16, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 32, width: SW, height: 12, align: 'center', verticalAlign: 'top' },
    ],
  },

  // fl-n080 — logo-qr, logo bottom-left, qr bottom-right, name top-center
  {
    id: 'fl-n080',
    category: 'logo-qr',
    name: 'Name Top Logo QR Corners',
    description: 'Name centered at top; contact in middle; logo and QR at bottom corners',
    supports: { portrait: false, logo: true, qrCode: true },
    defaultPaletteId: 'navy',
    regions: [
      { name: 'name-title',   x: SX,           y: SY,           width: SW, height: 16, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX,           y: SY + 18,      width: SW, height: 12, align: 'center', verticalAlign: 'top' },
      { name: 'logo',         x: SX,           y: SY + SH - 14, width: 18, height: 14, align: 'left',   verticalAlign: 'bottom' },
      { name: 'qr-code',      x: SX + SW - 16, y: SY + SH - 16, width: 16, height: 16, align: 'right',  verticalAlign: 'bottom' },
    ],
  },

  // fl-n081 — text-only, name right-aligned, all content right
  {
    id: 'fl-n081',
    category: 'text-only',
    name: 'All Right',
    description: 'Every region right-aligned; strong editorial feel',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'ocean',
    regions: [
      { name: 'name-title',   x: SX, y: SY,      width: SW, height: 18, align: 'right', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 22, width: SW, height: 14, align: 'right', verticalAlign: 'top' },
      { name: 'social',       x: SX, y: SY + 38, width: SW, height: 8,  align: 'right', verticalAlign: 'top' },
    ],
  },

  // fl-n082 — logo, logo and credentials bottom row
  {
    id: 'fl-n082',
    category: 'logo',
    name: 'Credentials Logo Footer',
    description: 'Name at top, contact below, credentials and logo share the bottom row',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'lavender',
    regions: [
      { name: 'name-title',   x: SX,            y: SY,           width: SW,      height: 16, align: 'left',  verticalAlign: 'top' },
      { name: 'contact-info', x: SX,            y: SY + 18,      width: SW,      height: 14, align: 'left',  verticalAlign: 'top' },
      { name: 'credentials',  x: SX,            y: SY + SH - 10, width: SW - 20, height: 10, align: 'left',  verticalAlign: 'bottom' },
      { name: 'logo',         x: SX + SW - 16,  y: SY + SH - 14, width: 16,      height: 14, align: 'right', verticalAlign: 'bottom' },
    ],
  },

  // fl-n083 — portrait, portrait bottom-right rounded, name top
  {
    id: 'fl-n083',
    category: 'portrait',
    name: 'Portrait Rounded Corner',
    description: 'Name and contact fill top and center; portrait with rounded clip bottom-right',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'slate',
    regions: [
      { name: 'name-title',   x: SX,           y: SY,           width: SW - 26, height: 20, align: 'left',  verticalAlign: 'top' },
      { name: 'contact-info', x: SX,           y: SY + 22,      width: SW - 26, height: 18, align: 'left',  verticalAlign: 'top' },
      { name: 'portrait',     x: SX + SW - 22, y: SY + SH - 22, width: 22,      height: 22, align: 'right', verticalAlign: 'bottom', clipShape: 'rounded' },
    ],
  },

  // fl-n084 — text-only, credentials prominent
  {
    id: 'fl-n084',
    category: 'text-only',
    name: 'Credentials Prominent',
    description: 'Name top, large credentials block, contact at the bottom',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'charcoal',
    regions: [
      { name: 'name-title',   x: SX, y: SY,      width: SW, height: 14, align: 'left', verticalAlign: 'top' },
      { name: 'credentials',  x: SX, y: SY + 16, width: SW, height: 14, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 32, width: SW * 0.6, height: 12, align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-n085 — logo-portrait, logo and portrait both circle-like side by side top
  {
    id: 'fl-n085',
    category: 'logo-portrait',
    name: 'Logo Portrait Side by Side',
    description: 'Logo and portrait circle sit side by side at the top; name and contact below',
    supports: { portrait: true, logo: true, qrCode: false },
    defaultPaletteId: 'navy',
    regions: [
      { name: 'logo',         x: SX,             y: SY,      width: SW * 0.35, height: 18, align: 'center', verticalAlign: 'top' },
      { name: 'portrait',     x: SX + SW * 0.4,  y: SY,      width: 18,        height: 18, align: 'center', verticalAlign: 'top', clipShape: 'circle' },
      { name: 'name-title',   x: SX,             y: SY + 20, width: SW,        height: 14, align: 'center', verticalAlign: 'top' },
      { name: 'contact-info', x: SX,             y: SY + 36, width: SW,        height: 8,  align: 'center', verticalAlign: 'top' },
    ],
  },

  // fl-n086 — qr-code, full-height QR strip right, everything left
  {
    id: 'fl-n086',
    category: 'qr-code',
    name: 'QR Tall Strip Right',
    description: 'Tall QR code fills the right edge; name and contact stack on the left',
    supports: { portrait: false, logo: false, qrCode: true },
    defaultPaletteId: 'midnight',
    regions: [
      { name: 'name-title',   x: SX,           y: SY,      width: SW - 32, height: 20, align: 'left', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX,           y: SY + 22, width: SW - 32, height: SH - 22, align: 'left', verticalAlign: 'top' },
      { name: 'qr-code',      x: SX + SW - 28, y: SY,      width: 28,      height: SH, align: 'center', verticalAlign: 'middle' },
    ],
  },

  // fl-n087 — logo-qr, logo centered mid, qr small top-right, name top, contact bottom
  {
    id: 'fl-n087',
    category: 'logo-qr',
    name: 'Logo Mid QR Small',
    description: 'Name at top, large logo in the middle, contact below, small QR top-right',
    supports: { portrait: false, logo: true, qrCode: true },
    defaultPaletteId: 'ocean',
    regions: [
      { name: 'name-title',   x: SX,           y: SY,                    width: SW - 18, height: 12, align: 'left',   verticalAlign: 'top' },
      { name: 'qr-code',      x: SX + SW - 16, y: SY,                    width: 16,      height: 16, align: 'right',  verticalAlign: 'top' },
      { name: 'logo',         x: SX,           y: SY + 14,               width: SW,      height: 14, align: 'center', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX,           y: SY + 30,               width: SW,      height: 14, align: 'center', verticalAlign: 'top' },
    ],
  },

  // fl-n088 — text-only, wide left column for name, narrow right column for all contact
  {
    id: 'fl-n088',
    category: 'text-only',
    name: 'Wide Left Narrow Right',
    description: 'Name fills wide left column; contact and social in narrow right column',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'lavender',
    regions: [
      { name: 'name-title',   x: SX,             y: SY, width: SW * 0.55, height: SH, align: 'left',  verticalAlign: 'middle' },
      { name: 'contact-info', x: SX + SW * 0.6,  y: SY, width: SW * 0.4,  height: SH * 0.6, align: 'left', verticalAlign: 'middle' },
      { name: 'social',       x: SX + SW * 0.6,  y: SY + SH * 0.65, width: SW * 0.4, height: SH * 0.35, align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-n089 — portrait, portrait large bottom-left, name top right
  {
    id: 'fl-n089',
    category: 'portrait',
    name: 'Large Portrait Bottom Left',
    description: 'Large portrait anchored bottom-left; name and contact fill top-right',
    supports: { portrait: true, logo: false, qrCode: false },
    defaultPaletteId: 'charcoal',
    regions: [
      { name: 'name-title',   x: SX + 34,      y: SY,           width: SW - 34, height: 20, align: 'right', verticalAlign: 'top' },
      { name: 'contact-info', x: SX + 34,      y: SY + 22,      width: SW - 34, height: 18, align: 'right', verticalAlign: 'top' },
      { name: 'portrait',     x: SX,           y: SY + SH - 30, width: 30,      height: 30, align: 'left',  verticalAlign: 'bottom', clipShape: 'rounded' },
    ],
  },

  // fl-n090 — text-only, contact left, name bottom, social top-right
  {
    id: 'fl-n090',
    category: 'text-only',
    name: 'Three Zone Asymmetric',
    description: 'Contact left column, social top-right, name bottom-center',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'slate',
    regions: [
      { name: 'contact-info', x: SX,             y: SY,           width: SW * 0.45, height: SH - 14, align: 'left',   verticalAlign: 'top' },
      { name: 'social',       x: SX + SW * 0.5,  y: SY,           width: SW * 0.5,  height: 12,     align: 'right',  verticalAlign: 'top' },
      { name: 'name-title',   x: SX,             y: SY + SH - 12, width: SW,        height: 12,     align: 'center', verticalAlign: 'bottom' },
    ],
  },

  // fl-n091 — logo, logo top-right, name bottom-left, credentials bottom-right
  {
    id: 'fl-n091',
    category: 'logo',
    name: 'Logo Top Credentials Corner',
    description: 'Logo top-right; name and contact left; credentials bottom-right corner',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'navy',
    regions: [
      { name: 'logo',         x: SX + SW - 18, y: SY,           width: 18,       height: 14, align: 'right', verticalAlign: 'top' },
      { name: 'name-title',   x: SX,           y: SY,           width: SW - 22,  height: 18, align: 'left',  verticalAlign: 'top' },
      { name: 'contact-info', x: SX,           y: SY + 20,      width: SW * 0.6, height: 18, align: 'left',  verticalAlign: 'top' },
      { name: 'credentials',  x: SX + SW * 0.65, y: SY + SH - 10, width: SW * 0.35, height: 10, align: 'right', verticalAlign: 'bottom' },
    ],
  },

  // fl-n092 — portrait-qr, name top, portrait centered, qr bottom-right, contact bottom-left
  {
    id: 'fl-n092',
    category: 'portrait-qr',
    name: 'Portrait Mid QR Footer',
    description: 'Name spans top; portrait in center; contact and QR share the bottom',
    supports: { portrait: true, logo: false, qrCode: true },
    defaultPaletteId: 'midnight',
    regions: [
      { name: 'name-title',   x: SX,                 y: SY,           width: SW, height: 12, align: 'center', verticalAlign: 'top' },
      { name: 'portrait',     x: SX + (SW - 20) / 2, y: SY + 14,     width: 20, height: 20, align: 'center', verticalAlign: 'top', clipShape: 'circle' },
      { name: 'contact-info', x: SX,                 y: SY + SH - 12, width: SW - 18, height: 12, align: 'left',   verticalAlign: 'bottom' },
      { name: 'qr-code',      x: SX + SW - 16,       y: SY + SH - 16, width: 16,      height: 16, align: 'right',  verticalAlign: 'bottom' },
    ],
  },

  // fl-n093 — logo-portrait, logo left, portrait right, name center top, contact center bottom
  {
    id: 'fl-n093',
    category: 'logo-portrait',
    name: 'Logo Left Portrait Right Center',
    description: 'Logo far-left, portrait far-right, name and contact fill the center',
    supports: { portrait: true, logo: true, qrCode: false },
    defaultPaletteId: 'ocean',
    regions: [
      { name: 'logo',         x: SX,           y: SY + (SH - 16) / 2, width: 18,       height: 16, align: 'left',   verticalAlign: 'middle' },
      { name: 'name-title',   x: SX + 22,      y: SY,                  width: SW - 46,  height: 20, align: 'center', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX + 22,      y: SY + SH * 0.52,      width: SW - 46,  height: SH * 0.48, align: 'center', verticalAlign: 'top' },
      { name: 'portrait',     x: SX + SW - 22, y: SY + (SH - 24) / 2,  width: 22,       height: 24, align: 'right',  verticalAlign: 'middle', clipShape: 'circle' },
    ],
  },

  // fl-n094 — text-only, name top-left, tagline top-right, contact full bottom
  {
    id: 'fl-n094',
    category: 'text-only',
    name: 'Tagline Top Right',
    description: 'Name top-left, tagline top-right, contact spans the bottom half',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'lavender',
    regions: [
      { name: 'name-title',   x: SX,             y: SY,      width: SW * 0.55, height: 14, align: 'left',  verticalAlign: 'top' },
      { name: 'tagline',      x: SX + SW * 0.6,  y: SY,      width: SW * 0.4,  height: 14, align: 'right', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX,             y: SY + 18, width: SW,        height: SH - 18, align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-n095 — qr-code, QR bottom-center, name top, contact middle
  {
    id: 'fl-n095',
    category: 'qr-code',
    name: 'QR Bottom Center Accent',
    description: 'Name top, contact middle, QR as bottom accent centered',
    supports: { portrait: false, logo: false, qrCode: true },
    defaultPaletteId: 'charcoal',
    regions: [
      { name: 'name-title',   x: SX, y: SY,                    width: SW,  height: 16, align: 'left', verticalAlign: 'top' },
      { name: 'contact-info', x: SX, y: SY + 18,               width: SW,  height: 12, align: 'left', verticalAlign: 'top' },
      { name: 'qr-code',      x: SX + (SW - 14) / 2, y: SY + SH - 14, width: 14, height: 14, align: 'center', verticalAlign: 'bottom' },
    ],
  },

  // fl-n096 — logo-qr, logo left, qr left below logo, name right
  {
    id: 'fl-n096',
    category: 'logo-qr',
    name: 'Logo QR Left Stack',
    description: 'Logo and QR stacked vertically on the left; name and contact fill the right',
    supports: { portrait: false, logo: true, qrCode: true },
    defaultPaletteId: 'slate',
    regions: [
      { name: 'logo',         x: SX,       y: SY,                    width: 18,      height: 14, align: 'left',  verticalAlign: 'top' },
      { name: 'qr-code',      x: SX,       y: SY + SH - 16,          width: 16,      height: 16, align: 'left',  verticalAlign: 'bottom' },
      { name: 'name-title',   x: SX + 22,  y: SY,                    width: SW - 22, height: 20, align: 'left',  verticalAlign: 'middle' },
      { name: 'contact-info', x: SX + 22,  y: SY + SH * 0.5,         width: SW - 22, height: SH * 0.5, align: 'left', verticalAlign: 'top' },
    ],
  },

  // fl-n097 — portrait-qr, portrait top-right, qr bottom-left, name left, contact bottom-right
  {
    id: 'fl-n097',
    category: 'portrait-qr',
    name: 'Portrait Top Right QR Bottom Left',
    description: 'Portrait top-right, QR bottom-left; name and contact fill the remaining space',
    supports: { portrait: true, logo: false, qrCode: true },
    defaultPaletteId: 'navy',
    regions: [
      { name: 'portrait',     x: SX + SW - 20, y: SY,           width: 20, height: 20, align: 'right', verticalAlign: 'top',    clipShape: 'circle' },
      { name: 'name-title',   x: SX,           y: SY,           width: SW - 24, height: 20, align: 'left', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX + 22,      y: SY + SH - 14, width: SW - 22, height: 14, align: 'left', verticalAlign: 'bottom' },
      { name: 'qr-code',      x: SX,           y: SY + SH - 18, width: 18,      height: 18, align: 'left', verticalAlign: 'bottom' },
    ],
  },

  // fl-n098 — logo, logo right, credentials below logo, name left
  {
    id: 'fl-n098',
    category: 'logo',
    name: 'Logo Credentials Right',
    description: 'Name and contact on left; logo with credentials stacked right',
    supports: { portrait: false, logo: true, qrCode: false },
    defaultPaletteId: 'midnight',
    regions: [
      { name: 'name-title',   x: SX,            y: SY,      width: SW * 0.55, height: 18, align: 'left',  verticalAlign: 'top' },
      { name: 'contact-info', x: SX,            y: SY + 20, width: SW * 0.55, height: 22, align: 'left',  verticalAlign: 'top' },
      { name: 'logo',         x: SX + SW * 0.6, y: SY,      width: SW * 0.4,  height: 16, align: 'center', verticalAlign: 'top' },
      { name: 'credentials',  x: SX + SW * 0.6, y: SY + 18, width: SW * 0.4,  height: 10, align: 'center', verticalAlign: 'top' },
    ],
  },

  // fl-n099 — text-only, four-zone layout: name top-left, tagline top-right, contact bottom-left, social bottom-right
  {
    id: 'fl-n099',
    category: 'text-only',
    name: 'Four Zone Text',
    description: 'Card split into four quadrants: name, tagline, contact, social',
    supports: { portrait: false, logo: false, qrCode: false },
    defaultPaletteId: 'ocean',
    regions: [
      { name: 'name-title',   x: SX,             y: SY,             width: SW * 0.48, height: SH * 0.48, align: 'left',  verticalAlign: 'middle' },
      { name: 'tagline',      x: SX + SW * 0.52, y: SY,             width: SW * 0.48, height: SH * 0.48, align: 'right', verticalAlign: 'middle' },
      { name: 'contact-info', x: SX,             y: SY + SH * 0.52, width: SW * 0.48, height: SH * 0.48, align: 'left',  verticalAlign: 'middle' },
      { name: 'social',       x: SX + SW * 0.52, y: SY + SH * 0.52, width: SW * 0.48, height: SH * 0.48, align: 'right', verticalAlign: 'middle' },
    ],
  },

  // fl-n100 — logo-portrait, logo top, portrait bottom-left circle, name right, contact bottom-right
  {
    id: 'fl-n100',
    category: 'logo-portrait',
    name: 'Logo Top Portrait Footer',
    description: 'Logo centered at top; name right side; portrait bottom-left; contact bottom-right',
    supports: { portrait: true, logo: true, qrCode: false },
    defaultPaletteId: 'charcoal',
    regions: [
      { name: 'logo',         x: SX,             y: SY,           width: SW,      height: 12, align: 'center', verticalAlign: 'top' },
      { name: 'name-title',   x: SX + SW * 0.3,  y: SY + 14,     width: SW * 0.7, height: 18, align: 'right',  verticalAlign: 'top' },
      { name: 'portrait',     x: SX,             y: SY + SH - 20, width: 20,      height: 20, align: 'left',   verticalAlign: 'bottom', clipShape: 'circle' },
      { name: 'contact-info', x: SX + 24,        y: SY + SH - 14, width: SW - 24, height: 14, align: 'right',  verticalAlign: 'bottom' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Registry
// ─────────────────────────────────────────────────────────────────────────────

export const frontLayouts: FrontLayout[] = [
  ...groupA,
  ...groupB,
  ...groupC,
  ...groupD,
  ...groupE,
  ...groupF,
  ...groupG,
  ...groupN,
];

export function getFrontLayout(id: string): FrontLayout | undefined {
  return frontLayouts.find(l => l.id === id);
}

export function getFrontLayoutsBySupport(opts: {
  portrait?: boolean;
  logo?: boolean;
  qrCode?: boolean;
}): FrontLayout[] {
  return frontLayouts.filter(l => {
    if (opts.portrait !== undefined && l.supports.portrait !== opts.portrait) return false;
    if (opts.logo !== undefined && l.supports.logo !== opts.logo) return false;
    if (opts.qrCode !== undefined && l.supports.qrCode !== opts.qrCode) return false;
    return true;
  });
}
