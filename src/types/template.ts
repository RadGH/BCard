import type React from 'react';

export interface ColorPalette {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  background: string;
  text: string;
  textMuted: string;
  accent: string;
}

export interface FrontLayoutSupports {
  portrait: boolean;
  logo: boolean;
  qrCode: boolean;
}

export type RegionName =
  | 'name-title'
  | 'contact-info'
  | 'social'
  | 'portrait'
  | 'logo'
  | 'qr-code'
  | 'tagline'
  | 'credentials';

export interface Region {
  name: RegionName;
  x: number;
  y: number;
  width: number;
  height: number;
  align: 'left' | 'center' | 'right';
  verticalAlign: 'top' | 'middle' | 'bottom';
  clipShape?: 'rect' | 'circle' | 'rounded';
  /** Override text color when region sits on a colored background band */
  textColorOverride?: string;
}

export interface FrontLayout {
  id: string;
  name: string;
  description: string;
  category: 'text-only' | 'logo' | 'portrait' | 'logo-portrait' | 'qr-code' | 'logo-qr' | 'portrait-qr';
  supports: FrontLayoutSupports;
  defaultPaletteId: string;
  regions: Region[];
  renderBackground?: (colors: ColorPalette, w: number, h: number) => React.ReactElement | null;
}

export interface BackLayout {
  id: string;
  name: string;
  description: string;
  supports: { logo: boolean; qrCode: boolean; tagline: boolean };
  defaultPaletteId: string;
  regions: Region[];
  renderBackground?: (colors: ColorPalette, w: number, h: number) => React.ReactElement | null;
}

export interface DecorationElement {
  type: 'line' | 'shape' | 'pattern' | 'gradient' | 'corner';
  layer: 'background' | 'midground' | 'foreground';
  render: (colors: ColorPalette, cardWidth: number, cardHeight: number) => React.ReactElement;
}

export interface DecorationSet {
  id: string;
  name: string;
  elements: DecorationElement[];
}
