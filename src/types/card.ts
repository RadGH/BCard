import { uuid as _uuid } from '../lib/uuid';

export interface QRCodeData {
  type: 'url' | 'image';
  url?: string;
  imageDataUrl?: string;
  fgColor: string;   // default '#000000'
  bgColor: string;   // default '#ffffff'
  allowRedirect?: boolean;  // for future redirect system
  redirectSlug?: string;
}

export interface BusinessCardData {
  firstName: string;
  lastName: string;
  title: string;
  company: string;
  credentials?: string;
  tagline?: string;

  email: string;
  phone: string;
  fax?: string;
  website?: string;
  address?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
  };

  social?: Record<string, string>;

  portrait?: string;
  logo?: string;
  /** When false (and no logo image), hide the logo slot instead of showing company name text. Default: true */
  useTextLogo?: boolean;
  /** @deprecated Use qrCode instead */
  qrCodeUrl?: string;
  qrCode?: QRCodeData;
}

export interface ColorPaletteOverride {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  textMuted: string;
  accent: string;
}

export interface CardFontSizes {
  name: number;
  jobTitle: number;
  company: number;
  tagline: number;
  contact: number;
  social: number;
}

export const DEFAULT_FONT_SIZES: CardFontSizes = {
  name: 5.5,
  jobTitle: 3.2,
  company: 2.8,
  tagline: 2.8,
  contact: 2.6,
  social: 2.4,
};

export interface CardDesign {
  id: string;
  name: string;
  frontLayoutId: string;
  backLayoutId: string;
  paletteId: string;
  customColors?: Partial<ColorPaletteOverride>;
  titleFont: string;
  bodyFont: string;
  backgroundId?: string;
  backgroundFlipH?: boolean;
  backgroundFlipV?: boolean;
  backgroundAppliesTo?: 'both' | 'front' | 'back';  // Default: 'both'
  logoColorOverride?: string;  // When set, override logo color (tint)
  iconStyle?: 'solid' | 'outline' | 'none';
  frontFontSizes?: Partial<CardFontSizes>;
  backFontSizes?: Partial<CardFontSizes>;
  frontImageScales?: { portrait?: number; logo?: number; qr?: number; background?: number };
  backImageScales?: { portrait?: number; logo?: number; qr?: number; background?: number };
  createdAt: number;
  updatedAt: number;
}

export interface PersonData {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  company: string;
  credentials?: string;
  tagline?: string;
  email: string;
  phone: string;
  fax?: string;
  website?: string;
  address?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
  };
  social?: Record<string, string>;
  portrait?: string;
  logo?: string;
  /** @deprecated Use qrCode instead */
  qrCodeUrl?: string;
  qrCode?: QRCodeData;
}

export interface SavedCard {
  id: string;
  name: string;
  design: CardDesign;
  personId?: string;
  personData?: BusinessCardData;
  thumbnailDataUrl?: string;
  createdAt: number;
  updatedAt: number;
}

export interface SavedPerson {
  id: string;
  name: string;
  data: PersonData;
  createdAt: number;
  updatedAt: number;
}

export function createDefaultCardData(): BusinessCardData {
  return {
    firstName: '',
    lastName: '',
    title: '',
    company: '',
    email: '',
    phone: '',
  };
}

export function createDefaultCardDesign(overrides?: Partial<CardDesign>): CardDesign {
  const now = Date.now();
  return {
    id: _uuid(),
    name: 'My Card',
    frontLayoutId: 'fl-a01',
    backLayoutId: 'bl-01',
    paletteId: 'ocean',
    titleFont: 'Playfair Display',
    bodyFont: 'Source Sans 3',
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

export function personToCardData(person: PersonData): BusinessCardData {
  return {
    firstName: person.firstName,
    lastName: person.lastName,
    title: person.title,
    company: person.company,
    credentials: person.credentials,
    tagline: person.tagline,
    email: person.email,
    phone: person.phone,
    fax: person.fax,
    website: person.website,
    address: person.address,
    social: person.social,
    portrait: person.portrait,
    logo: person.logo,
    qrCodeUrl: person.qrCodeUrl,
    qrCode: person.qrCode,
  };
}

export function cardDataToPerson(data: BusinessCardData, id?: string, name?: string): PersonData {
  return {
    id: id ?? _uuid(),
    name: name ?? ([data.firstName, data.lastName].filter(Boolean).join(' ') || 'Unnamed'),
    firstName: data.firstName,
    lastName: data.lastName,
    title: data.title,
    company: data.company,
    credentials: data.credentials,
    tagline: data.tagline,
    email: data.email,
    phone: data.phone,
    fax: data.fax,
    website: data.website,
    address: data.address,
    social: data.social,
    portrait: data.portrait,
    logo: data.logo,
    qrCodeUrl: data.qrCodeUrl,
    qrCode: data.qrCode,
  };
}
