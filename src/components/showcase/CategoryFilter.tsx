import type { LayoutFilter } from '../../constants/categories';
import { LAYOUT_FILTERS } from '../../constants/categories';

interface Props {
  selected: LayoutFilter;
  onSelect: (filter: LayoutFilter) => void;
  counts: Record<string, number>;
}

export default function CategoryFilter({ selected, onSelect, counts }: Props) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {LAYOUT_FILTERS.map(f => {
        const count = counts[f.value] ?? 0;
        return (
          <button
            key={f.value}
            onClick={() => onSelect(f.value)}
            className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
              selected === f.value
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {f.label} {f.value === 'all' ? `(${count})` : count > 0 ? `(${count})` : ''}
          </button>
        );
      })}
    </div>
  );
}
