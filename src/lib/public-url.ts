/**
 * Resolve a public-folder asset path against Vite's BASE_URL.
 * Paths like `/images/foo.png` are absolute from the public root —
 * in production (base=/bcard/) they must become `/bcard/images/foo.png`.
 * Data URLs and external URLs are returned unchanged.
 */
export function resolvePublicUrl(url: string | undefined): string | undefined {
  if (!url) return url;
  if (url.startsWith('/') && !url.startsWith('//')) {
    return import.meta.env.BASE_URL.replace(/\/$/, '') + url;
  }
  return url;
}
