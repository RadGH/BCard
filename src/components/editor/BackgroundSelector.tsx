import { useMemo } from 'react';
import { cardBackgrounds } from '../../templates/backgrounds/index';
import type { CardDesign } from '../../types/card';
import { resolveColorPalette } from '../../templates/registry';
import { CARD } from '../../constants/dimensions';

interface Props {
  design: CardDesign;
  onBackgroundChange: (backgroundId: string | undefined) => void;
  onFlipChange: (flipH: boolean, flipV: boolean) => void;
  onAppliesToChange?: (appliesTo: 'both' | 'front' | 'back') => void;
}

export default function BackgroundSelector({ design, onBackgroundChange, onFlipChange, onAppliesToChange }: Props) {
  const palette = useMemo(
    () => resolveColorPalette(design.paletteId, design.customColors),
    [design.paletteId, design.customColors],
  );
  const flipH = design.backgroundFlipH ?? false;
  const flipV = design.backgroundFlipV ?? false;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-slate-700">Background</h4>
        {design.backgroundId && (
          <button
            onClick={() => onBackgroundChange(undefined)}
            className="text-xs text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        )}
      </div>

      {/* Background swatches grid */}
      <div className="max-h-56 overflow-y-auto pr-0.5">
        <div className="grid grid-cols-5 gap-1.5">
          {/* "None" option */}
          <button
            onClick={() => onBackgroundChange(undefined)}
            className={`rounded overflow-hidden border-2 transition-all flex flex-col ${!design.backgroundId ? 'border-blue-500' : 'border-slate-200 hover:border-slate-300'}`}
          >
            <div
              style={{ aspectRatio: '95.25 / 57.15', background: '#f8fafc' }}
              className="flex items-center justify-center w-full"
            >
              <span className="text-xs text-slate-400">—</span>
            </div>
            <span className="text-center text-slate-400 leading-tight px-0.5 py-0.5" style={{ fontSize: '0.55rem' }}>None</span>
          </button>

          {cardBackgrounds.map(bg => {
            const isActive = design.backgroundId === bg.id;
            const svgContent = bg.render(palette, CARD.TOTAL_WIDTH, CARD.TOTAL_HEIGHT, flipH, flipV);
            return (
              <button
                key={bg.id}
                onClick={() => onBackgroundChange(bg.id)}
                title={bg.name}
                className={`rounded overflow-hidden border-2 transition-all flex flex-col ${isActive ? 'border-blue-500 shadow-md' : 'border-slate-200 hover:border-slate-300'}`}
              >
                <div
                  style={{ aspectRatio: '95.25 / 57.15', background: palette.background }}
                  className="overflow-hidden w-full"
                >
                  <svg
                    viewBox={`0 0 ${CARD.TOTAL_WIDTH} ${CARD.TOTAL_HEIGHT}`}
                    width="100%"
                    height="100%"
                  >
                    {svgContent}
                  </svg>
                </div>
                <span className="text-center text-slate-500 leading-tight px-0.5 py-0.5 truncate w-full" style={{ fontSize: '0.55rem' }}>{bg.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Flip controls */}
      {design.backgroundId && (
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={flipH}
              onChange={e => onFlipChange(e.target.checked, flipV)}
              className="rounded"
            />
            Flip Horizontal
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={flipV}
              onChange={e => onFlipChange(flipH, e.target.checked)}
              className="rounded"
            />
            Flip Vertical
          </label>
        </div>
      )}

      {design.backgroundId && onAppliesToChange && (
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">Applies to:</span>
          {(['both', 'front', 'back'] as const).map(v => (
            <button
              key={v}
              onClick={() => onAppliesToChange(v)}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-colors capitalize ${
                (design.backgroundAppliesTo ?? 'both') === v
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      )}
      {design.backgroundId && (
        <p className="text-xs text-slate-400">Background colors are taken from your active palette.</p>
      )}
    </div>
  );
}
