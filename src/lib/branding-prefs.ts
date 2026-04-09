const KEY = 'bcard-use-branding';

export function getBrandingPref(): boolean {
  return localStorage.getItem(KEY) === 'true';
}

export function setBrandingPref(v: boolean): void {
  localStorage.setItem(KEY, String(v));
}
