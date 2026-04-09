import { useState, useMemo, useRef, useCallback, useEffect, memo } from 'react';
import { Palette } from 'lucide-react';
import type { FrontLayout, BackLayout, ColorPalette } from '../../types/template';
import type { BusinessCardData, CardDesign } from '../../types/card';
import {
  getAllFrontLayouts,
  getAllBackLayouts,
  renderFront,
  renderBack,
  resolveColorPalette,
  getPaletteById,
  getDefaultPaletteId,
} from '../../templates/registry';
import { LAYOUT_FILTERS, type LayoutFilter } from '../../constants/categories';
import { getSampleData } from '../../constants/sample-data';
import { DEFAULT_TITLE_FONT, DEFAULT_BODY_FONT } from '../../templates/registry';

interface Props {
  design: CardDesign;
  data: BusinessCardData;
  onDesignChange: (patch: Partial<CardDesign>) => void;
}

type SubTab = 'front' | 'back';

const BATCH_SIZE = 50;

// ─── Front layout card ────────────────────────────────────────────────────────

const FrontLayoutCard = memo(function FrontLayoutCard({
  layout,
  index,
  isSelected,
  onSelect,
  previewData,
  previewPalette,
  titleFontOverride,
  bodyFontOverride,
}: {
  layout: FrontLayout;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  previewData?: BusinessCardData;
  previewPalette?: ColorPalette;
  titleFontOverride?: string;
  bodyFontOverride?: string;
}) {
  const data = previewData ?? getSampleData(index);
  const palette = useMemo(() => {
    if (previewPalette) return previewPalette;
    const p = getPaletteById(layout.defaultPaletteId);
    return p ?? resolveColorPalette(getDefaultPaletteId());
  }, [layout.defaultPaletteId, previewPalette]);

  const titleF = titleFontOverride ?? DEFAULT_TITLE_FONT;
  const bodyF = bodyFontOverride ?? DEFAULT_BODY_FONT;

  return (
    <button
      onClick={onSelect}
      className={`rounded-lg overflow-hidden border-2 transition-all hover:shadow-md text-left w-full ${
        isSelected ? 'border-blue-500 shadow-md' : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <div style={{ aspectRatio: '95.25 / 57.15' }} className="bg-white overflow-hidden">
        {renderFront(data, layout, palette, titleF, bodyF)}
      </div>
      <div className="px-2 py-1.5 bg-slate-50">
        <p className="text-xs font-medium text-slate-700 truncate">{layout.name}</p>
        <p className="text-xs text-slate-400 truncate">{layout.description}</p>
      </div>
    </button>
  );
});

// ─── Back layout card ─────────────────────────────────────────────────────────

const BackLayoutCard = memo(function BackLayoutCard({
  layout,
  index,
  isSelected,
  onSelect,
  previewData,
  previewPalette,
  titleFontOverride,
  bodyFontOverride,
}: {
  layout: BackLayout;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  previewData?: BusinessCardData;
  previewPalette?: ColorPalette;
  titleFontOverride?: string;
  bodyFontOverride?: string;
}) {
  const data = previewData ?? getSampleData(index);
  const palette = useMemo(() => {
    if (previewPalette) return previewPalette;
    const p = getPaletteById(layout.defaultPaletteId);
    return p ?? resolveColorPalette(getDefaultPaletteId());
  }, [layout.defaultPaletteId, previewPalette]);

  const titleF = titleFontOverride ?? DEFAULT_TITLE_FONT;
  const bodyF = bodyFontOverride ?? DEFAULT_BODY_FONT;

  return (
    <button
      onClick={onSelect}
      className={`rounded-lg overflow-hidden border-2 transition-all hover:shadow-md text-left w-full ${
        isSelected ? 'border-blue-500 shadow-md' : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <div style={{ aspectRatio: '95.25 / 57.15' }} className="bg-white overflow-hidden">
        {renderBack(data, layout, palette, titleF, bodyF)}
      </div>
      <div className="px-2 py-1.5 bg-slate-50">
        <p className="text-xs font-medium text-slate-700 truncate">{layout.name}</p>
        <p className="text-xs text-slate-400 truncate">{layout.description}</p>
      </div>
    </button>
  );
});

// ─── Main component ───────────────────────────────────────────────────────────

export default function TemplateSelector({ design, data, onDesignChange }: Props) {
  const [subTab, setSubTab] = useState<SubTab>('front');
  const [filter, setFilter] = useState<LayoutFilter>('all');
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [useBranding, setUseBranding] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const allFrontLayouts = useMemo(() => getAllFrontLayouts(), []);
  const allBackLayouts = useMemo(() => getAllBackLayouts(), []);

  const hasPortrait = Boolean(data.portrait);
  const hasLogo = Boolean(data.logo);

  const userPalette = useMemo(
    () => useBranding ? resolveColorPalette(design.paletteId, design.customColors) : undefined,
    [useBranding, design.paletteId, design.customColors]
  );

  const filteredFront = useMemo(() => {
    let layouts = allFrontLayouts;

    // Sort: compatible layouts first, but show all
    if (hasPortrait && hasLogo) {
      layouts = [...layouts].sort((a, b) => {
        const aMatch = a.supports.portrait && a.supports.logo ? 0 : 1;
        const bMatch = b.supports.portrait && b.supports.logo ? 0 : 1;
        return aMatch - bMatch;
      });
    } else if (hasPortrait) {
      layouts = [...layouts].sort((a, b) => (a.supports.portrait ? 0 : 1) - (b.supports.portrait ? 0 : 1));
    } else if (hasLogo) {
      layouts = [...layouts].sort((a, b) => (a.supports.logo ? 0 : 1) - (b.supports.logo ? 0 : 1));
    }

    // Apply explicit filter
    switch (filter) {
      case 'no-photo':
        return layouts.filter(l => !l.supports.portrait && !l.supports.logo);
      case 'portrait':
        return layouts.filter(l => l.supports.portrait);
      case 'logo':
        return layouts.filter(l => l.supports.logo);
      case 'logo-portrait':
        return layouts.filter(l => l.supports.portrait && l.supports.logo);
      case 'qr-code':
        return layouts.filter(l => l.supports.qrCode);
      default:
        return layouts;
    }
  }, [allFrontLayouts, filter, hasPortrait, hasLogo]);

  const visibleFront = filteredFront.slice(0, visibleCount);
  const hasMoreFront = visibleCount < filteredFront.length;

  const previewData = (data.firstName || data.lastName) ? data : undefined;

  // Reset visible count on filter/tab change
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
    if (scrollRef.current?.scrollTo) scrollRef.current.scrollTo(0, 0);
  }, [filter, subTab]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || !hasMoreFront) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    if (scrollHeight - scrollTop - clientHeight < 400) {
      setVisibleCount(prev => Math.min(prev + BATCH_SIZE, filteredFront.length));
    }
  }, [hasMoreFront, filteredFront.length]);

  const currentFrontLayout = useMemo(
    () => allFrontLayouts.find(l => l.id === design.frontLayoutId),
    [allFrontLayouts, design.frontLayoutId]
  );
  const currentBackLayout = useMemo(
    () => allBackLayouts.find(l => l.id === design.backLayoutId),
    [allBackLayouts, design.backLayoutId]
  );

  return (
    <div className="space-y-4">
      {/* Sub-tabs: Front / Back + Use my branding checkbox */}
      <div className="flex items-center border-b border-slate-200">
        {(['front', 'back'] as SubTab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setSubTab(tab)}
            className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition-colors ${
              subTab === tab
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab === 'front' ? 'Front Layout' : 'Back Layout'}
          </button>
        ))}
        <label className="ml-auto flex items-center gap-2 text-xs text-slate-500 cursor-pointer pr-1 pb-2">
          <input
            type="checkbox"
            checked={useBranding}
            onChange={e => setUseBranding(e.target.checked)}
            className="rounded"
          />
          <Palette className="w-4 h-4 text-slate-400" />
          Use my branding
        </label>
      </div>

      {/* Current Layout */}
      {(subTab === 'front' ? currentFrontLayout : currentBackLayout) && (
        <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
          <p className="text-xs font-semibold text-slate-700">
            Current: {subTab === 'front' ? currentFrontLayout?.name : currentBackLayout?.name}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            {subTab === 'front' ? currentFrontLayout?.description : currentBackLayout?.description}
          </p>
        </div>
      )}

      {subTab === 'front' && (
        <>
          {/* Layout filter buttons */}
          <div className="flex flex-wrap gap-2">
            {LAYOUT_FILTERS.map(f => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  filter === f.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[60vh] overflow-y-auto pr-1"
          >
            {visibleFront.map((layout, i) => (
              <FrontLayoutCard
                key={layout.id}
                layout={layout}
                index={i}
                isSelected={layout.id === design.frontLayoutId}
                onSelect={() => onDesignChange({ frontLayoutId: layout.id })}
                previewData={previewData}
                previewPalette={userPalette}
                titleFontOverride={useBranding ? design.titleFont : undefined}
                bodyFontOverride={useBranding ? design.bodyFont : undefined}
              />
            ))}
            {hasMoreFront && (
              <div className="col-span-full text-center py-4">
                <p className="text-xs text-slate-400">
                  Showing {visibleFront.length} of {filteredFront.length} — scroll for more
                </p>
              </div>
            )}
            {filteredFront.length === 0 && (
              <div className="col-span-full text-center py-8 text-slate-400 text-sm">
                No layouts match this filter
              </div>
            )}
          </div>
        </>
      )}

      {subTab === 'back' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[60vh] overflow-y-auto pr-1">
          {allBackLayouts.map((layout, i) => (
            <BackLayoutCard
              key={layout.id}
              layout={layout}
              index={i}
              isSelected={layout.id === design.backLayoutId}
              onSelect={() => onDesignChange({ backLayoutId: layout.id })}
              previewData={previewData}
              previewPalette={userPalette}
              titleFontOverride={useBranding ? design.titleFont : undefined}
              bodyFontOverride={useBranding ? design.bodyFont : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
