import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import type { CardDesign, CardFontSizes } from '../../types/card';
import { DEFAULT_FONT_SIZES } from '../../types/card';


interface Props {
  design: CardDesign;
  onDesignChange: (patch: Partial<CardDesign>) => void;
  side?: 'front' | 'back';
  onSideChange?: (side: 'front' | 'back') => void;
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

const IMAGE_SCALE_ELEMENTS: { key: 'portrait' | 'logo' | 'qr' | 'background'; label: string }[] = [
  { key: 'portrait', label: 'Portrait' },
  { key: 'logo', label: 'Logo' },
  { key: 'qr', label: 'QR Code' },
  { key: 'background', label: 'Background' },
];

const STEP = 0.2;
const MIN_SIZE = 1.0;
const MAX_SIZE = 12.0;

const SCALE_STEP = 0.05;
const MIN_SCALE = 0.5;
const MAX_SCALE = 2.0;
const DEFAULT_SCALE = 1.0;

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
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
        className="w-11 h-11 sm:w-7 sm:h-7 flex items-center justify-center rounded border border-slate-300 text-slate-600 hover:bg-slate-100 transition-colors text-sm font-bold"
      >
        −
      </button>
      <span className={`w-12 text-center text-sm font-mono ${isCustom ? 'text-blue-600 font-semibold' : 'text-slate-500'}`}>
        {effective.toFixed(1)}
      </span>
      <button
        onClick={increment}
        className="w-11 h-11 sm:w-7 sm:h-7 flex items-center justify-center rounded border border-slate-300 text-slate-600 hover:bg-slate-100 transition-colors text-sm font-bold"
      >
        +
      </button>
      {isCustom && (
        <button
          onClick={reset}
          aria-label={`Reset ${label} to default`}
          title="Reset to default"
          className="text-xs text-slate-400 hover:text-slate-600 transition-colors ml-1"
        >
          <RotateCcw className="w-3 h-3" aria-hidden="true" />
        </button>
      )}
      {!isCustom && <span className="text-xs text-slate-300 ml-1 w-4">—</span>}
    </div>
  );
}

function ScaleControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number | undefined;
  onChange: (v: number | undefined) => void;
}) {
  const effective = value ?? DEFAULT_SCALE;
  const isCustom = value !== undefined && value !== DEFAULT_SCALE;

  const decrement = () => onChange(round2(Math.max(MIN_SCALE, effective - SCALE_STEP)));
  const increment = () => onChange(round2(Math.min(MAX_SCALE, effective + SCALE_STEP)));
  const reset = () => onChange(undefined);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-slate-600 w-24 shrink-0">{label}</span>
      <button
        onClick={decrement}
        className="w-11 h-11 sm:w-7 sm:h-7 flex items-center justify-center rounded border border-slate-300 text-slate-600 hover:bg-slate-100 transition-colors text-sm font-bold"
      >
        −
      </button>
      <span className={`w-12 text-center text-sm font-mono ${isCustom ? 'text-blue-600 font-semibold' : 'text-slate-500'}`}>
        {effective.toFixed(2)}
      </span>
      <button
        onClick={increment}
        className="w-11 h-11 sm:w-7 sm:h-7 flex items-center justify-center rounded border border-slate-300 text-slate-600 hover:bg-slate-100 transition-colors text-sm font-bold"
      >
        +
      </button>
      {isCustom && (
        <button
          onClick={reset}
          aria-label={`Reset ${label} scale to default`}
          title="Reset to default (1.0)"
          className="text-xs text-slate-400 hover:text-slate-600 transition-colors ml-1"
        >
          <RotateCcw className="w-3 h-3" aria-hidden="true" />
        </button>
      )}
      {!isCustom && <span className="text-xs text-slate-300 ml-1 w-4">—</span>}
    </div>
  );
}

export default function AdvancedPanel({ design, onDesignChange, side: sideProp, onSideChange }: Props) {
  const [localSide, setLocalSide] = useState<Side>('front');
  const side = sideProp ?? localSide;
  const handleSideChange = (s: Side) => {
    setLocalSide(s);
    onSideChange?.(s);
  };

  const fontSizes = side === 'front' ? design.frontFontSizes : design.backFontSizes;
  const sideKey: keyof CardDesign = side === 'front' ? 'frontFontSizes' : 'backFontSizes';
  const imageScales = side === 'front' ? design.frontImageScales : design.backImageScales;
  const imageScalesKey: keyof CardDesign = side === 'front' ? 'frontImageScales' : 'backImageScales';

  const handleChange = (key: keyof CardFontSizes, value: number | undefined) => {
    const current = { ...fontSizes };
    if (value === undefined) {
      delete current[key];
    } else {
      current[key] = value;
    }
    onDesignChange({ [sideKey]: Object.keys(current).length > 0 ? current : undefined });
  };

  const handleScaleChange = (key: 'portrait' | 'logo' | 'qr' | 'background', value: number | undefined) => {
    const current = { ...(imageScales ?? {}) };
    if (value === undefined || value === DEFAULT_SCALE) {
      delete current[key];
    } else {
      current[key] = value;
    }
    onDesignChange({ [imageScalesKey]: Object.keys(current).length > 0 ? current : undefined });
  };

  const resetAll = () => {
    onDesignChange({ [sideKey]: undefined });
  };

  const resetAllScales = () => {
    onDesignChange({ [imageScalesKey]: undefined });
  };

  const hasAnyOverrides = fontSizes && Object.keys(fontSizes).length > 0;
  const hasAnyScaleOverrides = imageScales && Object.keys(imageScales).length > 0;

  return (
    <div className="space-y-5">
      {/* Side subtabs */}
      <div className="flex border-b border-slate-200">
        {(['front', 'back'] as Side[]).map(s => (
          <button
            key={s}
            onClick={() => handleSideChange(s)}
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
        <p className="text-xs text-slate-400 mt-3">Blue values are custom overrides. Click <RotateCcw className="inline w-3 h-3" /> to reset individual items.</p>
      </section>

      {/* Image scales section */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-700">Image Scales <span className="text-xs text-slate-400 font-normal">(0.5–2.0)</span></h3>
          {hasAnyScaleOverrides && (
            <button onClick={resetAllScales} className="text-xs text-red-500 hover:text-red-700 transition-colors">
              Reset all
            </button>
          )}
        </div>
        <div className="space-y-2.5">
          {IMAGE_SCALE_ELEMENTS.map(({ key, label }) => (
            <ScaleControl
              key={key}
              label={label}
              value={imageScales?.[key]}
              onChange={v => handleScaleChange(key, v)}
            />
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-3">Scale 1.00 = default. Blue values are custom overrides.</p>
      </section>

    </div>
  );
}
