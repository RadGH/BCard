import { CARD } from '../constants/dimensions';

export async function generatePdf(svgFront: string, svgBack?: string): Promise<Blob> {
  const [{ jsPDF }, { svg2pdf }] = await Promise.all([
    import('jspdf'),
    import('svg2pdf.js'),
  ]);

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [CARD.TOTAL_WIDTH, CARD.TOTAL_HEIGHT],
  });

  const frontEl = parseSvg(svgFront);
  document.body.appendChild(frontEl);
  await svg2pdf(frontEl, doc, {
    x: 0,
    y: 0,
    width: CARD.TOTAL_WIDTH,
    height: CARD.TOTAL_HEIGHT,
  });
  document.body.removeChild(frontEl);

  if (svgBack) {
    doc.addPage([CARD.TOTAL_WIDTH, CARD.TOTAL_HEIGHT], 'landscape');
    const backEl = parseSvg(svgBack);
    document.body.appendChild(backEl);
    await svg2pdf(backEl, doc, {
      x: 0,
      y: 0,
      width: CARD.TOTAL_WIDTH,
      height: CARD.TOTAL_HEIGHT,
    });
    document.body.removeChild(backEl);
  }

  return doc.output('blob');
}

function parseSvg(svgString: string): SVGElement {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');
  const svg = doc.documentElement as unknown as SVGElement;
  svg.style.position = 'absolute';
  svg.style.left = '-9999px';
  return svg;
}

export async function downloadPdf(svgFront: string, svgBack?: string, filename = 'business-card.pdf') {
  const blob = await generatePdf(svgFront, svgBack);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
