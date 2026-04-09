import { useState } from 'react';
import type { CardDesign, CardFontSizes } from '../../types/card';
import { DEFAULT_FONT_SIZES } from '../../types/card';

interface Props {
  design: CardDesign;
  onDesignChange: (patch: Partial<CardDesign>) => void;
}

type Side = 'front' | 'back';

const FONT_SIZE_ELEMENTS: { key: keyof CardFontSizes; label: string }[] = [
  { key: 'name', label: 'Name' },
  { key: 'jobTitle', label: 'Job Title' },
  { key: 'company', label: 'Company' },
  { key: 'tagline', label: 'Tagline' },
  { key: 'contact', label: 'Contact Info' },
  { key: 'social', label: 'Social Links' },
];

const STEP = 0.2;
const MIN_SIZE = 1.0;
const MAX_SIZE = 12.0;

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

function SizeControl({
  label,
  value,
  defaultValue,
  onChange,
}: {
  label: string;
  value: number | undefined;
  defaultValue: number;
  onChange: (v: number | undefined) => void;
}) {
  const effective = value ?? defaultValue;
  const isCustom = value !== undefined;

  const decrement = () => onChange(round1(Math.max(MIN_SIZE, effective - STEP)));
  const increment = () => onChange(round1(Math.min(MAX_SIZE, effective + STEP)));
  const reset = () => onChange(undefined);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-slate-600 w-24 shrink-0">{label}</span>
      <button
        onClick={decrement}
        className="w-7 h-7 flex items-center justify-center rounded border border-slate-300 text-slate-600 hover:bg-slate-100 transition-colors text-sm font-bold"
      >
        −
      </button>
      <span className={`w-12 text-center text-sm font-mono ${isCustom ? 'text-blue-600 font-semibold' : 'text-slate-500'}`}>
        {effective.toFixed(1)}
      </span>
      <button
        onClick={increment}
        className="w-7 h-7 flex items-center justify-center rounded border border-slate-300 text-slate-600 hover:bg-slate-100 transition-colors text-sm font-bold"
      >
        +
      </button>
      {isCustom && (
        /* A01: Reset button with aria-label */
        <button
          onClick={reset}
          aria-label={`Reset ${label} to default`}
          title="Reset to default"
          className="text-xs text-slate-400 hover:text-slate-600 transition-colors ml-1"
        >
          <i className="fa-solid fa-rotate-left" aria-hidden="true" />
        </button>
      )}
      {!isCustom && <span className="text-xs text-slate-300 ml-1 w-4">—</span>}
    </div>
  );
}

export default function AdvancedPanel({ design, onDesignChange }: Props) {
  const [side, setSide] = useState<Side>('front');

  const fontSizes = side === 'front' ? design.frontFontSizes : design.backFontSizes;
  const sideKey: keyof CardDesign = side === 'front' ? 'frontFontSizes' : 'backFontSizes';

  const handleChange = (key: keyof CardFontSizes, value: number | undefined) => {
    const current = { ...fontSizes };
    if (value === undefined) {
      delete current[key];
    } else {
      current[key] = value;
    }
    onDesignChange({ [sideKey]: Object.keys(current).length > 0 ? current : undefined });
  };

  const resetAll = () => {
    onDesignChange({ [sideKey]: undefined });
  };

  const hasAnyOverrides = fontSizes && Object.keys(fontSizes).length > 0;

  return (
    <div className="space-y-5">
      {/* Side subtabs */}
      <div className="flex border-b border-slate-200">
        {(['front', 'back'] as Side[]).map(s => (
          <button
            key={s}
            onClick={() => setSide(s)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors capitalize ${
              side === s ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Font sizes section */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-700">Text Element Sizes <span className="text-xs text-slate-400 font-normal">(mm)</span></h3>
          {hasAnyOverrides && (
            <button onClick={resetAll} className="text-xs text-red-500 hover:text-red-700 transition-colors">
              Reset all
            </button>
          )}
        </div>
        <div className="space-y-2.5">
          {FONT_SIZE_ELEMENTS.map(({ key, label }) => (
            <SizeControl
              key={key}
              label={label}
              value={fontSizes?.[key]}
              defaultValue={DEFAULT_FONT_SIZES[key]}
              onChange={v => handleChange(key, v)}
            />
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-3">Blue values are custom overrides. Click <i className="fa-solid fa-rotate-left" /> to reset individual items.</p>
      </section>
    </div>
  );
}
