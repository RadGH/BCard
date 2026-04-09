export type LayoutFilter = 'all' | 'no-photo' | 'portrait' | 'logo' | 'logo-portrait' | 'qr-code' | 'logo-qr' | 'portrait-qr';

export const LAYOUT_FILTERS: { value: LayoutFilter; label: string }[] = [
  { value: 'all', label: 'All Layouts' },
  { value: 'no-photo', label: 'Text Only' },
  { value: 'portrait', label: 'With Portrait' },
  { value: 'logo', label: 'With Logo' },
  { value: 'logo-portrait', label: 'Logo + Portrait' },
  { value: 'qr-code', label: 'QR Code' },
  { value: 'logo-qr', label: 'Logo + QR' },
  { value: 'portrait-qr', label: 'Portrait + QR' },
];
