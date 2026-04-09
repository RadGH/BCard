import React from 'react';
import { resolvePublicUrl } from '../lib/public-url';
import type { FrontLayout, BackLayout, ColorPalette } from '../types/template';
import type { BusinessCardData, CardFontSizes } from '../types/card';
import { CARD } from '../constants/dimensions';
import { frontLayouts, getFrontLayout, getFrontLayoutsBySupport } from './layouts/index';
import { backLayouts, getBackLayout } from './back-layouts/index';
import { palettes, getPalette, getDefaultPaletteForLayout } from './palettes/index';
import { getBackground } from './backgrounds/index';
import NameTitle from './svg-components/NameTitle';
import ContactInfo from './svg-components/ContactInfo';
import SocialLinks from './svg-components/SocialLinks';
import PhotoSlot from './svg-components/PhotoSlot';
import LogoSlot from './svg-components/LogoSlot';
import Tagline from './svg-components/Tagline';

// ─── Layout accessors ────────────────────────────────────────────────────────

export function getAllFrontLayouts(): FrontLayout[] {
  return frontLayouts;
}

export { getFrontLayout, getFrontLayoutsBySupport };

export function getAllBackLayouts(): BackLayout[] {
  return backLayouts;
}

export { getBackLayout };

// ─── Palette accessors ───────────────────────────────────────────────────────

export function getAllPalettes(): ColorPalette[] {
  return palettes;
}

export function getPaletteById(id: string): ColorPalette | undefined {
  return getPalette(id);
}

export { getDefaultPaletteForLayout };

// ─── Resolve effective palette (base + custom overrides) ─────────────────────

export function resolveColorPalette(
  paletteId: string,
  customColors?: Partial<ColorPalette>,
): ColorPalette {
  const base = getPalette(paletteId) ?? palettes[0];
  if (!customColors || Object.keys(customColors).length === 0) return base;
  return { ...base, ...customColors };
}

// ─── Region renderer ─────────────────────────────────────────────────────────

interface RenderOptions {
  useTextLogo?: boolean;
  logoColorOverride?: string;
  iconStyle?: string;
  fontSizes?: Partial<CardFontSizes>;
}

function renderRegion(
  regionName: string,
  data: BusinessCardData,
  colors: ColorPalette,
  titleFont: string,
  bodyFont: string,
  regionObj: import('../types/template').Region,
  options?: RenderOptions,
): React.ReactElement {
  switch (regionName) {
    case 'name-title':
      return React.createElement(NameTitle, {
        key: 'nt', data, colors, titleFont, bodyFont, region: regionObj,
        nameSizeOverride: options?.fontSizes?.name,
        titleSizeOverride: options?.fontSizes?.jobTitle,
        companySizeOverride: options?.fontSizes?.company,
      });

    case 'contact-info':
      return React.createElement(ContactInfo, { key: 'ci', data, colors, bodyFont, region: regionObj, iconStyle: options?.iconStyle as 'prefix' | 'solid' | 'outline' | 'none' | undefined, fontSizeOverride: options?.fontSizes?.contact });

    case 'social':
      return React.createElement(SocialLinks, { key: 'sl', data, colors, bodyFont, region: regionObj, iconStyle: options?.iconStyle as 'prefix' | 'solid' | 'outline' | 'none' | undefined, fontSizeOverride: options?.fontSizes?.social });

    case 'portrait':
      return React.createElement(PhotoSlot, {
        key: 'ph',
        src: data.portrait,
        region: regionObj,
        clipShape: regionObj.clipShape ?? 'rect',
      });

    case 'logo':
      return React.createElement(LogoSlot, {
        key: 'lg',
        src: data.logo,
        companyName: data.company,
        useTextLogo: data.useTextLogo ?? true,
        colorOverride: options?.logoColorOverride,
        region: regionObj,
        colors,
        titleFont,
      });

    case 'tagline':
      return React.createElement(Tagline, { key: 'tg', text: data.tagline, colors, bodyFont, region: regionObj, fontSizeOverride: options?.fontSizes?.tagline });

    case 'qr-code': {
      const qr = data.qrCode;
      if (!qr && !data.qrCodeUrl) return React.createElement('g', { key: 'qr' });

      let src: string | undefined;
      if (qr) {
        if (qr.type === 'image' && qr.imageDataUrl) {
          src = resolvePublicUrl(qr.imageDataUrl);
        } else if (qr.type === 'url' && qr.url) {
          const fg = (qr.fgColor ?? '#000000').replace('#', '');
          const bg = (qr.bgColor ?? '#ffffff').replace('#', '');
          src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qr.url)}&color=${fg}&bgcolor=${bg}&format=png`;
        }
      } else if (data.qrCodeUrl) {
        src = data.qrCodeUrl;
      }

      if (!src) return React.createElement('g', { key: 'qr' });
      return React.createElement('image', { key: 'qr', href: src, x: regionObj.x, y: regionObj.y, width: regionObj.width, height: regionObj.height, preserveAspectRatio: 'xMidYMid meet' });
    }

    case 'credentials':
      if (!data.credentials) return React.createElement('g', { key: 'cred' });
      return React.createElement('text', {
        key: 'cred',
        x: regionObj.align === 'center'
          ? regionObj.x + regionObj.width / 2
          : regionObj.align === 'right'
            ? regionObj.x + regionObj.width
            : regionObj.x,
        y: regionObj.y + regionObj.height / 2 + 1.5,
        fontFamily: `'${bodyFont}', sans-serif`,
        fontSize: 2.4,
        fontWeight: 600,
        fill: colors.textMuted,
        textAnchor: regionObj.align === 'center' ? 'middle' : regionObj.align === 'right' ? 'end' : 'start',
      }, data.credentials);

    default:
      return React.createElement('g', { key: regionName });
  }
}

// ─── Front render ────────────────────────────────────────────────────────────

export interface BackgroundOptions {
  backgroundId?: string;
  backgroundFlipH?: boolean;
  backgroundFlipV?: boolean;
  useTextLogo?: boolean;
  logoColorOverride?: string;
  iconStyle?: string;
  fontSizes?: Partial<CardFontSizes>;
}

export function renderFront(
  data: BusinessCardData,
  layout: FrontLayout,
  palette: ColorPalette,
  titleFont: string,
  bodyFont: string,
  bgOptions?: BackgroundOptions,
): React.ReactElement {
  const bg = layout.renderBackground
    ? layout.renderBackground(palette, CARD.TOTAL_WIDTH, CARD.TOTAL_HEIGHT)
    : null;

  const cardBackground = bgOptions?.backgroundId
    ? getBackground(bgOptions.backgroundId)?.render(palette, CARD.TOTAL_WIDTH, CARD.TOTAL_HEIGHT, bgOptions.backgroundFlipH, bgOptions.backgroundFlipV)
    : null;

  const renderOpts: RenderOptions = {
    useTextLogo: bgOptions?.useTextLogo,
    logoColorOverride: bgOptions?.logoColorOverride,
    iconStyle: bgOptions?.iconStyle,
    fontSizes: bgOptions?.fontSizes,
  };

  const regions = layout.regions.map((region, i) =>
    React.cloneElement(
      renderRegion(region.name, data, palette, titleFont, bodyFont, region, renderOpts),
      { key: `region-${i}` },
    ),
  );

  return React.createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: `0 0 ${CARD.TOTAL_WIDTH} ${CARD.TOTAL_HEIGHT}`,
      width: '100%',
      height: '100%',
      style: { fontFamily: `'${bodyFont}', sans-serif` },
    },
    // Background fill
    React.createElement('rect', {
      key: 'bg-fill',
      x: 0,
      y: 0,
      width: CARD.TOTAL_WIDTH,
      height: CARD.TOTAL_HEIGHT,
      fill: palette.background,
    }),
    // Layout background decoration
    bg ? React.cloneElement(bg, { key: 'layout-bg' }) : null,
    // Card background overlay
    cardBackground ? React.cloneElement(cardBackground, { key: 'card-bg' }) : null,
    // All content regions
    ...regions,
  );
}

// ─── Back render ─────────────────────────────────────────────────────────────

export function renderBack(
  data: BusinessCardData,
  layout: BackLayout,
  palette: ColorPalette,
  titleFont: string,
  bodyFont: string,
  bgOptions?: BackgroundOptions,
): React.ReactElement {
  const bg = layout.renderBackground
    ? layout.renderBackground(palette, CARD.TOTAL_WIDTH, CARD.TOTAL_HEIGHT)
    : null;

  const cardBackground = bgOptions?.backgroundId
    ? getBackground(bgOptions.backgroundId)?.render(palette, CARD.TOTAL_WIDTH, CARD.TOTAL_HEIGHT, bgOptions.backgroundFlipH, bgOptions.backgroundFlipV)
    : null;

  const renderOpts: RenderOptions = {
    useTextLogo: bgOptions?.useTextLogo,
    logoColorOverride: bgOptions?.logoColorOverride,
    iconStyle: bgOptions?.iconStyle,
    fontSizes: bgOptions?.fontSizes,
  };

  const regions = layout.regions.map((region, i) =>
    React.cloneElement(
      renderRegion(region.name, data, palette, titleFont, bodyFont, region, renderOpts),
      { key: `region-${i}` },
    ),
  );

  return React.createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: `0 0 ${CARD.TOTAL_WIDTH} ${CARD.TOTAL_HEIGHT}`,
      width: '100%',
      height: '100%',
    },
    React.createElement('rect', {
      key: 'bg-fill',
      x: 0,
      y: 0,
      width: CARD.TOTAL_WIDTH,
      height: CARD.TOTAL_HEIGHT,
      fill: palette.background,
    }),
    bg ? React.cloneElement(bg, { key: 'layout-bg' }) : null,
    cardBackground ? React.cloneElement(cardBackground, { key: 'card-bg' }) : null,
    ...regions,
  );
}

// ─── Convenience helpers ─────────────────────────────────────────────────────

export function getDefaultFrontLayoutId(): string {
  return frontLayouts[0]?.id ?? 'fl-a01';
}

export function getDefaultBackLayoutId(): string {
  return backLayouts[0]?.id ?? 'bl-01';
}

export function getDefaultPaletteId(): string {
  return palettes[0]?.id ?? 'ocean';
}

export const DEFAULT_TITLE_FONT = 'Playfair Display';
export const DEFAULT_BODY_FONT = 'Source Sans 3';
