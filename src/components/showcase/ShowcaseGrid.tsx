import { useState, useMemo } from 'react';
import type { LayoutFilter } from '../../constants/categories';
import type { BusinessCardData } from '../../types/card';
import type { ColorPalette } from '../../types/template';
import { getAllFrontLayouts } from '../../templates/registry';
import { getSampleData } from '../../constants/sample-data';
import CategoryFilter from './CategoryFilter';
import ShowcaseCard from './ShowcaseCard';

const INITIAL_COUNT = 48;
const LOAD_MORE = 24;

interface Props {
  brandingData?: BusinessCardData;
  brandingPalette?: ColorPalette;
  brandingTitleFont?: string;
  brandingBodyFont?: string;
}

export default function ShowcaseGrid({ brandingData, brandingPalette, brandingTitleFont, brandingBodyFont }: Props = {}) {
  const [filter, setFilter] = useState<LayoutFilter>('all');
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const allLayouts = useMemo(() => getAllFrontLayouts(), []);

  const counts = useMemo(() => {
    const c: Record<string, number> = {
      all: allLayouts.length,
      'no-photo': allLayouts.filter(l => !l.supports.portrait && !l.supports.logo).length,
      portrait: allLayouts.filter(l => l.supports.portrait).length,
      logo: allLayouts.filter(l => l.supports.logo).length,
      'logo-portrait': allLayouts.filter(l => l.supports.portrait && l.supports.logo).length,
      'qr-code': allLayouts.filter(l => l.supports.qrCode).length,
    };
    return c;
  }, [allLayouts]);

  const filtered = useMemo(() => {
    switch (filter) {
      case 'no-photo':
        return allLayouts.filter(l => !l.supports.portrait && !l.supports.logo);
      case 'portrait':
        return allLayouts.filter(l => l.supports.portrait);
      case 'logo':
        return allLayouts.filter(l => l.supports.logo);
      case 'logo-portrait':
        return allLayouts.filter(l => l.supports.portrait && l.supports.logo);
      case 'qr-code':
        return allLayouts.filter(l => l.supports.qrCode);
      default:
        return allLayouts;
    }
  }, [allLayouts, filter]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleFilterChange = (f: LayoutFilter) => {
    setFilter(f);
    setVisibleCount(INITIAL_COUNT);
  };

  return (
    <div className="space-y-6">
      <CategoryFilter selected={filter} onSelect={handleFilterChange} counts={counts} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {visible.map((layout, i) => (
          <ShowcaseCard
            key={layout.id}
            layout={layout}
            sampleData={getSampleData(i)}
            index={i}
            brandingData={brandingData}
            brandingPalette={brandingPalette}
            brandingTitleFont={brandingTitleFont}
            brandingBodyFont={brandingBodyFont}
          />
        ))}
      </div>

      {hasMore && (
        <div className="text-center">
          <button
            onClick={() => setVisibleCount(prev => prev + LOAD_MORE)}
            className="px-6 py-2.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            Load More ({filtered.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
