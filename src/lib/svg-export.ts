import { renderToStaticMarkup } from 'react-dom/server';
import type { BusinessCardData, CardDesign } from '../types/card';
import { renderFront, renderBack, getFrontLayout, getBackLayout, resolveColorPalette } from '../templates/registry';

export async function generateSvgString(
  cardData: BusinessCardData,
  cardDesign: CardDesign,
  side: 'front' | 'back' = 'front'
): Promise<string> {
  const palette = resolveColorPalette(cardDesign.paletteId, cardDesign.customColors);

  const appliesTo = cardDesign.backgroundAppliesTo ?? 'both';

  const baseBgOptions = {
    backgroundId: cardDesign.backgroundId,
    backgroundFlipH: cardDesign.backgroundFlipH,
    backgroundFlipV: cardDesign.backgroundFlipV,
    logoColorOverride: cardDesign.logoColorOverride,
    iconStyle: cardDesign.iconStyle,
    useTextLogo: cardData.useTextLogo ?? true,
  };

  const frontBgOptions = {
    ...(appliesTo === 'back' ? { ...baseBgOptions, backgroundId: undefined } : baseBgOptions),
    fontSizes: cardDesign.frontFontSizes,
    imageScales: cardDesign.frontImageScales,
  };

  const backBgOptions = {
    ...(appliesTo === 'front' ? { ...baseBgOptions, backgroundId: undefined } : baseBgOptions),
    fontSizes: cardDesign.backFontSizes,
    imageScales: cardDesign.backImageScales,
  };

  let element: React.ReactElement;
  if (side === 'back') {
    const layout = getBackLayout(cardDesign.backLayoutId);
    if (!layout) throw new Error('Back layout not found');
    element = renderBack(cardData, layout, palette, cardDesign.titleFont, cardDesign.bodyFont, backBgOptions);
  } else {
    const layout = getFrontLayout(cardDesign.frontLayoutId);
    if (!layout) throw new Error('Front layout not found');
    element = renderFront(cardData, layout, palette, cardDesign.titleFont, cardDesign.bodyFont, frontBgOptions);
  }

  let svgMarkup = renderToStaticMarkup(element);

  const { embedFontPair } = await import('./font-loader');
  try {
    const fontCss = await embedFontPair(cardDesign.titleFont, cardDesign.bodyFont);
    if (fontCss) {
      const styleBlock = `<defs><style type="text/css">${fontCss}</style></defs>`;
      svgMarkup = svgMarkup.replace(/<svg([^>]*)>/, `<svg$1>${styleBlock}`);
    }
  } catch { /* ok — SVG still works with system fonts */ }

  if (!svgMarkup.startsWith('<?xml')) {
    svgMarkup = `<?xml version="1.0" encoding="UTF-8"?>\n${svgMarkup}`;
  }

  return svgMarkup;
}

export function downloadBlob(content: string | Blob, filename: string, type = 'image/svg+xml') {
  const blob = content instanceof Blob ? content : new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function svgToPng(svgString: string, scale: number = 1): Promise<Blob> {
  // Card dimensions in pixels at 300 DPI
  const baseW = 1050;
  const baseH = 600;
  const w = baseW * scale;
  const h = baseH * scale;

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  const img = new Image();
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  return new Promise((resolve, reject) => {
    img.onload = () => {
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      canvas.toBlob(blob => {
        if (blob) resolve(blob);
        else reject(new Error('Canvas toBlob failed'));
      }, 'image/png');
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('SVG image load failed'));
    };
    img.src = url;
  });
}

export function printSvg(svgFront: string, svgBack?: string) {
  const win = window.open('', '_blank');
  if (!win) return;
  win.document.write(`<!DOCTYPE html><html><head><title>Print Business Card</title>
<style>
  @media print { @page { size: 3.5in 2in; margin: 0; } body { margin: 0; } }
  body { margin: 20px; font-family: sans-serif; }
  .card { width: 3.5in; height: 2in; margin: 10px auto; }
  .card svg { width: 100%; height: 100%; }
  h3 { text-align: center; font-size: 12px; color: #666; margin: 16px 0 4px; }
  @media print { h3 { display: none; } .no-print { display: none; } }
  .no-print { text-align: center; margin: 20px; }
</style></head><body>
<div class="no-print"><button onclick="window.print()">Print</button></div>
<h3>Front</h3><div class="card">${svgFront}</div>
${svgBack ? `<h3>Back</h3><div class="card">${svgBack}</div>` : ''}
</body></html>`);
  win.document.close();
}
