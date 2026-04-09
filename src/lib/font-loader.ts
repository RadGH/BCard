import { uniqueAvailableFonts } from '../templates/fonts/index';

const loadedFonts = new Set<string>();

export function loadGoogleFont(family: string, weights: number[] = [400, 700]): void {
  const key = `${family}-${weights.join(',')}`;
  if (loadedFonts.has(key)) return;
  loadedFonts.add(key);

  const params = new URLSearchParams({
    family: `${family}:wght@${weights.join(';')}`,
    display: 'swap',
  });

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?${params}`;
  document.head.appendChild(link);
}

/**
 * Load a pair of fonts (title font + body font) with their registered weights.
 * Falls back to [400, 700] if the font isn't in the registry.
 */
export function loadFontPair(titleFont: string, bodyFont: string): void {
  const titleMeta = uniqueAvailableFonts.find(f => f.family === titleFont);
  const bodyMeta = uniqueAvailableFonts.find(f => f.family === bodyFont);

  loadGoogleFont(titleFont, titleMeta?.weights ?? [400, 700]);
  if (bodyFont !== titleFont) {
    loadGoogleFont(bodyFont, bodyMeta?.weights ?? [400, 700]);
  }
}

/**
 * Eagerly load all registered fonts (minimal weight set) so the font picker
 * can show live previews without on-demand loading.
 */
export function loadAllFonts(): void {
  for (const font of uniqueAvailableFonts) {
    // Load a minimal subset of weights for preview: regular + bold
    const previewWeights = font.weights.includes(400) && font.weights.includes(700)
      ? [400, 700]
      : font.weights.slice(0, 2);
    loadGoogleFont(font.family, previewWeights);
  }
}

// ─── PDF/SVG export helpers ───────────────────────────────────────────────────

const fontCssCache = new Map<string, string>();

export async function embedFontAsBase64(family: string, weights: number[] = [400, 700]): Promise<string> {
  const key = `${family}-${weights.join(',')}`;
  if (fontCssCache.has(key)) return fontCssCache.get(key)!;

  const params = new URLSearchParams({
    family: `${family}:wght@${weights.join(';')}`,
    display: 'swap',
  });

  const cssUrl = `https://fonts.googleapis.com/css2?${params}`;
  const cssRes = await fetch(cssUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
  });
  let css = await cssRes.text();

  const urlRegex = /url\((https:\/\/[^)]+)\)/g;
  const urls = [...css.matchAll(urlRegex)].map(m => m[1]);

  for (const url of urls) {
    const fontRes = await fetch(url);
    const buffer = await fontRes.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
    const mime = url.includes('.woff2') ? 'font/woff2' : 'font/woff';
    css = css.replace(url, `data:${mime};base64,${base64}`);
  }

  fontCssCache.set(key, css);
  return css;
}

/**
 * Embed both title and body fonts for export (PDF / PNG).
 */
export async function embedFontPair(titleFont: string, bodyFont: string): Promise<string> {
  const titleMeta = uniqueAvailableFonts.find(f => f.family === titleFont);
  const bodyMeta = uniqueAvailableFonts.find(f => f.family === bodyFont);

  const titleWeights = titleMeta?.weights ?? [400, 700];
  const bodyWeights = bodyMeta?.weights ?? [400, 700];

  if (titleFont === bodyFont) {
    const allWeights = [...new Set([...titleWeights, ...bodyWeights])];
    return embedFontAsBase64(titleFont, allWeights);
  }

  const [titleCss, bodyCss] = await Promise.all([
    embedFontAsBase64(titleFont, titleWeights),
    embedFontAsBase64(bodyFont, bodyWeights),
  ]);

  return `${titleCss}\n${bodyCss}`;
}
