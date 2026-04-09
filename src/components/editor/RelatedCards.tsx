import { useState, useMemo } from 'react';
import type { BusinessCardData, CardDesign } from '../../types/card';
import {
  getAllFrontLayouts,
  renderFront,
  resolveColorPalette,
  getPaletteById,
  getDefaultPaletteId,
} from '../../templates/registry';
import { DEFAULT_TITLE_FONT, DEFAULT_BODY_FONT } from '../../templates/registry';
import { getSampleData } from '../../constants/sample-data';

interface Props {
  design: CardDesign;
  data: BusinessCardData;
  onLayoutChange: (frontLayoutId: string) => void;
  useBranding?: boolean;
  onToggleBranding?: (v: boolean) => void;
}

export default function SimilarLayouts({
  design,
  data,
  onLayoutChange,
  useBranding,
  onToggleBranding,
}: Props) {
  const [localBranding, setLocalBranding] = useState(false);

  const brandingOn = useBranding !== undefined ? useBranding : localBranding;

  const handleToggle = (v: boolean) => {
    if (onToggleBranding) {
      onToggleBranding(v);
    } else {
      setLocalBranding(v);
    }
  };

  const userPalette = useMemo(
    () => resolveColorPalette(design.paletteId, design.customColors),
    [design.paletteId, design.customColors]
  );

  const similar = useMemo(() => {
    const all = getAllFrontLayouts();
    const current = all.find(l => l.id === design.frontLayoutId);
    if (!current?.category) {
      return all.filter(l => l.id !== design.frontLayoutId).slice(0, 8);
    }
    return all
      .filter(l => l.id !== design.frontLayoutId && l.category === current.category)
      .slice(0, 8);
  }, [design.frontLayoutId]);

  const previewData = (data.firstName || data.lastName) ? data : getSampleData(0);

  if (similar.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-700">Similar Layouts</h3>
        <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer">
          <input
            type="checkbox"
            checked={brandingOn}
            onChange={e => handleToggle(e.target.checked)}
            className="rounded"
          />
          Use my branding
        </label>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-3">
        {similar.map(layout => {
          const palette = brandingOn
            ? userPalette
            : (getPaletteById(layout.defaultPaletteId) ?? resolveColorPalette(getDefaultPaletteId()));
          const titleFont = brandingOn ? design.titleFont : DEFAULT_TITLE_FONT;
          const bodyFont = brandingOn ? design.bodyFont : DEFAULT_BODY_FONT;

          return (
            <button
              key={layout.id}
              onClick={() => onLayoutChange(layout.id)}
              className="rounded-lg overflow-hidden border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all text-left"
            >
              <div style={{ aspectRatio: '95.25 / 57.15' }} className="bg-white overflow-hidden">
                {renderFront(previewData, layout, palette, titleFont, bodyFont)}
              </div>
              <div className="px-2 py-1 bg-slate-50">
                <p className="text-xs text-slate-600 truncate">{layout.name}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
