import { useMemo, useState } from 'react';
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
  onLayoutChange: (frontLayoutId: string, paletteId?: string) => void;
  useBranding?: boolean;
  onToggleBranding?: (v: boolean) => void;
}

const categoryNames: Record<string, string> = {
  'text-only': 'Text Only',
  'logo': 'With Logo',
  'portrait': 'With Portrait',
  'logo-portrait': 'Logo + Portrait',
  'qr-code': 'QR Code',
};

export default function MoreLayouts({ design, data, onLayoutChange, useBranding, onToggleBranding }: Props) {
  const [localBranding, setLocalBranding] = useState(false);

  const brandingOn = useBranding !== undefined ? useBranding : localBranding;

  const palette = useMemo(
    () => resolveColorPalette(design.paletteId, design.customColors),
    [design.paletteId, design.customColors]
  );

  const layoutsByCategory = useMemo(() => {
    const all = getAllFrontLayouts();
    const current = all.find(l => l.id === design.frontLayoutId);
    const currentCategory = current?.category;

    const groups: Record<string, typeof all> = {};
    for (const layout of all) {
      if (layout.category === currentCategory || layout.id === design.frontLayoutId) continue;
      if (!layout.category) continue;
      if (!groups[layout.category]) groups[layout.category] = [];
      if (groups[layout.category].length < 3) groups[layout.category].push(layout);
    }
    return groups;
  }, [design.frontLayoutId]);

  const entries = Object.entries(layoutsByCategory);
  if (entries.length === 0) return null;

  const previewData = brandingOn ? data : ((data.firstName || data.lastName) ? data : getSampleData(0));

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-700">More Layouts</h3>
        <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer">
          <input
            type="checkbox"
            checked={brandingOn}
            onChange={e => onToggleBranding ? onToggleBranding(e.target.checked) : setLocalBranding(e.target.checked)}
            className="rounded"
          />
          Use my branding
        </label>
      </div>
      <div className="space-y-6">
        {entries.map(([category, layouts]) => (
          <div key={category}>
            <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
              {categoryNames[category] ?? category}
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {layouts.map(layout => {
                const layoutPalette = brandingOn
                  ? palette
                  : (getPaletteById(layout.defaultPaletteId) ?? resolveColorPalette(getDefaultPaletteId()));
                const titleFont = brandingOn ? design.titleFont : DEFAULT_TITLE_FONT;
                const bodyFont = brandingOn ? design.bodyFont : DEFAULT_BODY_FONT;

                return (
                  <button
                    key={layout.id}
                    onClick={() => {
                      const paletteId = !brandingOn ? (layout.defaultPaletteId ?? undefined) : undefined;
                      onLayoutChange(layout.id, paletteId);
                    }}
                    className="rounded-lg overflow-hidden border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all text-left"
                  >
                    <div style={{ aspectRatio: '95.25 / 57.15' }} className="bg-white overflow-hidden">
                      {renderFront(previewData, layout, layoutPalette, titleFont, bodyFont)}
                    </div>
                    <div className="px-2 py-1 bg-slate-50">
                      <p className="text-xs text-slate-600 truncate">{layout.name}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
