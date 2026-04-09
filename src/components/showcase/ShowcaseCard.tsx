import { memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FrontLayout } from '../../types/template';
import type { BusinessCardData } from '../../types/card';
import type { ColorPalette } from '../../types/template';
import { renderFront, resolveColorPalette, getDefaultPaletteId } from '../../templates/registry';
import { DEFAULT_TITLE_FONT, DEFAULT_BODY_FONT } from '../../templates/registry';

interface Props {
  layout: FrontLayout;
  sampleData: BusinessCardData;
  index: number;
  brandingData?: BusinessCardData;
  brandingPalette?: ColorPalette;
  brandingTitleFont?: string;
  brandingBodyFont?: string;
}

function ShowcaseCard({ layout, sampleData, brandingData, brandingPalette, brandingTitleFont, brandingBodyFont }: Props) {
  const navigate = useNavigate();

  const defaultPalette = useMemo(
    () => resolveColorPalette(layout.defaultPaletteId ?? getDefaultPaletteId()),
    [layout.defaultPaletteId]
  );

  const data = brandingData ?? sampleData;
  const palette = brandingPalette ?? defaultPalette;
  const titleFont = brandingTitleFont ?? DEFAULT_TITLE_FONT;
  const bodyFont = brandingBodyFont ?? DEFAULT_BODY_FONT;

  return (
    <button
      onClick={() => navigate(`/editor?layout=${encodeURIComponent(layout.id)}`)}
      className="group rounded-xl overflow-hidden border border-slate-200 bg-white hover:shadow-lg transition-all duration-200 text-left w-full"
    >
      <div style={{ aspectRatio: '95.25 / 57.15' }} className="bg-white overflow-hidden">
        {renderFront(data, layout, palette, titleFont, bodyFont)}
      </div>
      <div className="px-3 py-2 border-t border-slate-100">
        <p className="text-sm font-medium text-slate-700 truncate">{layout.name}</p>
        <p className="text-xs text-slate-400 truncate">{layout.description}</p>
      </div>
    </button>
  );
}

export default memo(ShowcaseCard);
