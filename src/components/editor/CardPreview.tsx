import { useState, useMemo, useEffect } from 'react';
import { Box } from 'lucide-react';
import { createPortal } from 'react-dom';
import type { BusinessCardData, CardDesign } from '../../types/card';
import { renderFront, renderBack, getFrontLayout, getBackLayout, resolveColorPalette } from '../../templates/registry';
import { CARD } from '../../constants/dimensions';
import Card3DView from './Card3DView';

interface Props {
  data: BusinessCardData;
  design: CardDesign;
  showPrintMargins?: boolean;
  viewModeOverride?: 'front' | 'back' | 'both';
}

function PrintMarginOverlay() {
  return (
    <svg
      viewBox={`0 0 ${CARD.TOTAL_WIDTH} ${CARD.TOTAL_HEIGHT}`}
      width="100%"
      height="100%"
      style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
    >
      {/* Bleed line (outer edge) */}
      <rect x={CARD.BLEED} y={CARD.BLEED} width={CARD.WIDTH} height={CARD.HEIGHT}
        fill="none" stroke="rgba(255,0,0,0.5)" strokeWidth={0.3} strokeDasharray="1.5,0.8" />
      {/* Safe zone line */}
      <rect x={CARD.SAFE_X} y={CARD.SAFE_Y} width={CARD.SAFE_WIDTH} height={CARD.SAFE_HEIGHT}
        fill="none" stroke="rgba(0,150,255,0.5)" strokeWidth={0.3} strokeDasharray="1.5,0.8" />
      {/* Labels */}
      <text x={CARD.BLEED + 0.5} y={CARD.BLEED + 2} fontSize={1.4} fill="rgba(255,0,0,0.7)" fontFamily="sans-serif">Bleed</text>
      <text x={CARD.SAFE_X + 0.5} y={CARD.SAFE_Y + 2} fontSize={1.4} fill="rgba(0,150,255,0.7)" fontFamily="sans-serif">Safe</text>
    </svg>
  );
}

type ViewMode = 'both' | 'front' | 'back';

export default function CardPreview({ data, design, showPrintMargins = false, viewModeOverride }: Props) {
  const [viewMode, setViewMode] = useState<ViewMode>('both');
  const [show3D, setShow3D] = useState(false);

  const effectiveViewMode = viewModeOverride ?? viewMode;

  const frontLayout = useMemo(() => getFrontLayout(design.frontLayoutId), [design.frontLayoutId]);
  const backLayout = useMemo(() => getBackLayout(design.backLayoutId), [design.backLayoutId]);
  const palette = useMemo(
    () => resolveColorPalette(design.paletteId, design.customColors),
    [design.paletteId, design.customColors]
  );

  const appliesTo = design.backgroundAppliesTo ?? 'both';

  const bgOptions = useMemo(() => ({
    backgroundId: design.backgroundId,
    backgroundFlipH: design.backgroundFlipH,
    backgroundFlipV: design.backgroundFlipV,
    logoColorOverride: design.logoColorOverride,
    iconStyle: design.iconStyle,
    useTextLogo: data.useTextLogo ?? true,
  }), [design.backgroundId, design.backgroundFlipH, design.backgroundFlipV, design.logoColorOverride, design.iconStyle, data.useTextLogo]);

  const frontBgOptions = useMemo(() => ({
    ...(appliesTo === 'back' ? { ...bgOptions, backgroundId: undefined } : bgOptions),
    fontSizes: design.frontFontSizes,
    imageScales: design.frontImageScales,
  }), [bgOptions, appliesTo, design.frontFontSizes, design.frontImageScales]);

  const backBgOptions = useMemo(() => ({
    ...(appliesTo === 'front' ? { ...bgOptions, backgroundId: undefined } : bgOptions),
    fontSizes: design.backFontSizes,
    imageScales: design.backImageScales,
  }), [bgOptions, appliesTo, design.backFontSizes, design.backImageScales]);

  const frontSvg = useMemo(() => {
    if (!frontLayout) return null;
    return renderFront(data, frontLayout, palette, design.titleFont, design.bodyFont, frontBgOptions);
  }, [data, design, frontLayout, palette, frontBgOptions]);

  const backSvg = useMemo(() => {
    if (!backLayout) return null;
    return renderBack(data, backLayout, palette, design.titleFont, design.bodyFont, backBgOptions);
  }, [data, design, backLayout, palette, backBgOptions]);

  // Load fonts when they change
  useEffect(() => {
    import('../../lib/font-loader').then(m => m.loadFontPair(design.titleFont, design.bodyFont));
  }, [design.titleFont, design.bodyFont]);

  // Allow external trigger of 3D view (e.g. from StickyPreview widget)
  useEffect(() => {
    function handleOpen3D() { setShow3D(true); }
    window.addEventListener('bcard-open-3d', handleOpen3D);
    return () => window.removeEventListener('bcard-open-3d', handleOpen3D);
  }, []);

  const cycleViewMode = () => {
    setViewMode(m => m === 'both' ? 'front' : m === 'front' ? 'back' : 'both');
  };

  const viewModeLabel = effectiveViewMode === 'both' ? 'Showing: Both' : effectiveViewMode === 'front' ? 'Showing: Front' : 'Showing: Back';

  return (
    <div className="flex flex-col items-center gap-3">
      {effectiveViewMode === 'both' ? (
        <div className="w-full space-y-2" style={{ maxWidth: '500px' }}>
          <div>
            <p className="text-xs text-slate-400 text-center mb-1">Front</p>
            {/* A06: Added role="img" and aria-label */}
            <div
              role="img"
              aria-label={`Business card front${data.firstName ? ` for ${[data.firstName, data.lastName].filter(Boolean).join(' ')}` : ''}`}
              className="w-full bg-white rounded-lg shadow-lg overflow-hidden border border-slate-200 relative"
              style={{ aspectRatio: '95.25 / 57.15' }}
            >
              {frontSvg ?? <div className="text-slate-400 text-center text-sm py-8">No layout selected</div>}
              {showPrintMargins && <PrintMarginOverlay />}
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-400 text-center mb-1">Back</p>
            {/* A06: Added role="img" and aria-label */}
            <div
              role="img"
              aria-label={`Business card back${data.firstName ? ` for ${[data.firstName, data.lastName].filter(Boolean).join(' ')}` : ''}`}
              className="w-full bg-white rounded-lg shadow-lg overflow-hidden border border-slate-200 relative"
              style={{ aspectRatio: '95.25 / 57.15' }}
            >
              {backSvg ?? <div className="text-slate-400 text-center text-sm py-8">No back layout</div>}
              {showPrintMargins && <PrintMarginOverlay />}
            </div>
          </div>
        </div>
      ) : (
        /* A06: Added role="img" and aria-label */
        <div
          role="img"
          aria-label={`Business card ${effectiveViewMode}${data.firstName ? ` for ${[data.firstName, data.lastName].filter(Boolean).join(' ')}` : ''}`}
          className="w-full bg-white rounded-lg shadow-lg overflow-hidden border border-slate-200 relative"
          style={{ aspectRatio: '95.25 / 57.15', maxWidth: '500px' }}
        >
          {effectiveViewMode === 'front'
            ? (frontSvg ?? <div className="text-slate-400 text-center text-sm py-8">No layout selected</div>)
            : (backSvg ?? <div className="text-slate-400 text-center text-sm py-8">No back layout</div>)
          }
          {showPrintMargins && <PrintMarginOverlay />}
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={cycleViewMode}
          className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
        >
          {viewModeLabel}
        </button>
        <button
          onClick={() => setShow3D(true)}
          className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
          title="3D Preview"
        >
          <Box className="inline w-4 h-4 mr-1" />
          Quick View
        </button>
      </div>

      {show3D && createPortal(<Card3DView data={data} design={design} onClose={() => setShow3D(false)} />, document.body)}
    </div>
  );
}
