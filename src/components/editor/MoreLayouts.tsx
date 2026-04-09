import { useMemo } from 'react';
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
}

const categoryNames: Record<string, string> = {
  'text-only': 'Text Only',
  'logo': 'With Logo',
  'portrait': 'With Portrait',
  'logo-portrait': 'Logo + Portrait',
  'qr-code': 'QR Code',
};

export default function MoreLayouts({ design, data, onLayoutChange, useBranding }: Props) {
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

  const previewData = (data.firstName || data.lastName) ? data : getSampleData(0);

  return (
    <div className="mt-8">
      <h3 className="text-sm font-semibold text-slate-700 mb-4">More Layouts</h3>
      <div className="space-y-6">
        {entries.map(([category, layouts]) => (
          <div key={category}>
            <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
              {categoryNames[category] ?? category}
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {layouts.map(layout => {
                const layoutPalette = useBranding
                  ? palette
                  : (getPaletteById(layout.defaultPaletteId) ?? resolveColorPalette(getDefaultPaletteId()));
                const titleFont = useBranding ? design.titleFont : DEFAULT_TITLE_FONT;
                const bodyFont = useBranding ? design.bodyFont : DEFAULT_BODY_FONT;

                const needsPortrait = layout.supports.portrait && !data.portrait;
                const needsLogo = layout.supports.logo && !data.logo;
                const needsQR = layout.supports.qrCode && !data.qrCode && !data.qrCodeUrl;

                return (
                  <button
                    key={layout.id}
                    onClick={() => onLayoutChange(layout.id)}
                    className="rounded-lg overflow-hidden border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all text-left relative"
                  >
                    <div style={{ aspectRatio: '95.25 / 57.15' }} className="bg-white overflow-hidden">
                      {renderFront(previewData, layout, layoutPalette, titleFont, bodyFont)}
                    </div>
                    {(needsPortrait || needsLogo || needsQR) && (
                      <div className="absolute top-1 right-1 flex gap-0.5">
                        {needsPortrait && (
                          <span className="text-xs bg-black/50 text-white px-1 rounded" title="Needs portrait photo">
                            👤
                          </span>
                        )}
                        {needsLogo && (
                          <span className="text-xs bg-black/50 text-white px-1 rounded" title="Needs logo">
                            🏢
                          </span>
                        )}
                        {needsQR && (
                          <span className="text-xs bg-black/50 text-white px-1 rounded" title="Needs QR code">
                            📱
                          </span>
                        )}
                      </div>
                    )}
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
