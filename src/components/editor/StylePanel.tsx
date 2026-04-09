import { useState } from 'react';
import { Pencil, Trash2, Plus, ChevronUp, ChevronDown, ChevronRight } from 'lucide-react';
import type { ColorPalette } from '../../types/template';
import type { CardDesign } from '../../types/card';
import type { SavedPalette } from '../../hooks/useStylePresets';
import { getAllPalettes, resolveColorPalette, getDefaultPaletteId } from '../../templates/registry';

interface Props {
  design: CardDesign;
  onDesignChange: (patch: Partial<CardDesign>) => void;
  onCustomColorChange: (key: string, value: string) => void;
  onClearCustomColors: () => void;
  savedPalettes: SavedPalette[];
  onSavePalette: (name: string, palette: ColorPalette) => SavedPalette;
  onDeletePalette: (id: string) => void;
  onUpdatePalette?: (id: string, name: string, palette: ColorPalette) => void;
  onRenamePalette?: (id: string, name: string) => void;
}

const COLOR_KEYS = ['primary', 'secondary', 'background', 'text', 'textMuted', 'accent'] as const;

export default function StylePanel({
  design,
  onDesignChange,
  onCustomColorChange,
  onClearCustomColors,
  savedPalettes,
  onSavePalette,
  onDeletePalette,
  onUpdatePalette,
  onRenamePalette,
}: Props) {
  const [showSaveInput, setShowSaveInput] = useState(false);
  const [presetName, setPresetName] = useState('');
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [showAllBuiltIn, setShowAllBuiltIn] = useState(false);
  const [showCustomColors, setShowCustomColors] = useState(false);

  const allPalettes = getAllPalettes();
  const resolvedPalette = resolveColorPalette(design.paletteId, design.customColors);
  const hasCustomColors = design.customColors && Object.keys(design.customColors).length > 0;
  const activeSavedPalette = savedPalettes.find(p => p.id === design.paletteId);
  const visibleBuiltIn = showAllBuiltIn || savedPalettes.length === 0
    ? allPalettes
    : allPalettes.slice(0, 3);

  const handleApplySaved = (saved: SavedPalette) => {
    onDesignChange({ paletteId: saved.id });
    for (const key of COLOR_KEYS) onCustomColorChange(key, saved.palette[key]);
  };

  const handleApplyBuiltIn = (paletteId: string) => {
    onDesignChange({ paletteId });
    onClearCustomColors();
  };

  const handleSaveAsNew = () => {
    if (!presetName.trim()) return;
    const saved = onSavePalette(presetName.trim(), resolvedPalette);
    // Activate the new palette
    onDesignChange({ paletteId: saved.id });
    for (const key of COLOR_KEYS) onCustomColorChange(key, resolvedPalette[key]);
    setPresetName('');
    setShowSaveInput(false);
  };

  const handleUpdateExisting = () => {
    if (!activeSavedPalette || !onUpdatePalette) return;
    onUpdatePalette(activeSavedPalette.id, activeSavedPalette.name, resolvedPalette);
  };

  const startRename = (saved: SavedPalette) => {
    setRenamingId(saved.id);
    setRenameValue(saved.name);
  };

  const commitRename = () => {
    if (renamingId && renameValue.trim() && onRenamePalette) {
      onRenamePalette(renamingId, renameValue.trim());
    }
    setRenamingId(null);
  };

  return (
    <div className="space-y-5">
      {/* My Palettes */}
      {savedPalettes.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-slate-700 mb-3">My Palettes</h3>
          <div className="space-y-1.5">
            {savedPalettes.map(saved => (
              <div key={saved.id} className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                design.paletteId === saved.id ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
              }`}>
                <button onClick={() => handleApplySaved(saved)} className="flex items-center gap-2 flex-1 text-left min-w-0">
                  <div className="flex gap-1 shrink-0">
                    {([saved.palette.primary, saved.palette.secondary, saved.palette.background, saved.palette.accent] as string[]).map((color, i) => (
                      <span 
                        key={i} 
                        className="w-3.5 h-3.5 rounded-full border border-black/10" 
                        style={{ backgroundColor: color }}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  {renamingId === saved.id ? (
                    <input
                      type="text"
                      value={renameValue}
                      onChange={e => setRenameValue(e.target.value)}
                      onBlur={commitRename}
                      onKeyDown={e => { if (e.key === 'Enter') commitRename(); if (e.key === 'Escape') setRenamingId(null); }}
                      autoFocus
                      className="flex-1 text-sm border border-blue-400 rounded px-1 py-0.5 focus:outline-none"
                      onClick={e => e.stopPropagation()}
                      aria-label={`Edit palette name for "${saved.name}"`}
                    />
                  ) : (
                    <span className="text-sm font-medium text-slate-700 truncate">{saved.name}</span>
                  )}
                  {design.paletteId === saved.id && <span className="ml-auto text-xs text-blue-600 font-medium shrink-0">Active</span>}
                </button>
                {/* A01: Rename button with aria-label */}
                <button
                  onClick={() => startRename(saved)}
                  aria-label={`Rename palette "${saved.name}"`}
                  title="Rename palette"
                  className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors shrink-0"
                >
                  <Pencil className="w-3 h-3" aria-hidden="true" />
                </button>
                {/* A01: Delete button with aria-label */}
                <button
                  onClick={() => onDeletePalette(saved.id)}
                  aria-label={`Delete palette "${saved.name}"`}
                  title="Delete Palette"
                  className="p-1 text-red-400 hover:text-red-600 rounded transition-colors shrink-0"
                >
                  <Trash2 className="w-3 h-3" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => { setShowSaveInput(true); }}
            className="mt-2 flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg border border-dashed border-blue-300 w-full transition-colors"
          >
            <Plus className="w-3 h-3" /> Add New Palette
          </button>
        </section>
      )}

      {/* Built-in Color Palettes */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-700">
            {savedPalettes.length > 0 ? 'Default Palettes' : 'Color Palettes'}
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-1.5">
          {visibleBuiltIn.map(palette => (
            <button
              key={palette.id}
              onClick={() => handleApplyBuiltIn(palette.id)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg border transition-all text-left ${
                design.paletteId === palette.id && !hasCustomColors
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex gap-1 shrink-0">
                {([palette.primary, palette.secondary, palette.background, palette.accent] as string[]).map((color, i) => (
                  <span 
                    key={i} 
                    className="w-4 h-4 rounded-full border border-black/10" 
                    style={{ backgroundColor: color }}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-slate-700">{palette.name}</span>
              {design.paletteId === palette.id && !hasCustomColors && (
                <span className="ml-auto text-xs text-blue-600 font-medium">Active</span>
              )}
            </button>
          ))}
        </div>
        {savedPalettes.length > 0 && allPalettes.length > 3 && (
          <button
            onClick={() => setShowAllBuiltIn(v => !v)}
            className="mt-2 text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1 transition-colors"
          >
            {showAllBuiltIn ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            {showAllBuiltIn ? 'Show fewer' : `Show all ${allPalettes.length} palettes`}
          </button>
        )}
      </section>

      {/* Custom Color Overrides — collapsible - A03: Added aria-expanded and aria-controls */}
      <section>
        <button
          onClick={() => setShowCustomColors(v => !v)}
          aria-expanded={showCustomColors}
          aria-controls="custom-colors-panel"
          className="flex items-center gap-2 text-sm font-semibold text-slate-700 w-full text-left mb-1"
        >
          {showCustomColors ? <ChevronUp className="w-3 h-3 text-slate-400" /> : <ChevronRight className="w-3 h-3 text-slate-400" />}
          Custom Color Overrides
          {hasCustomColors && <span className="text-xs text-blue-600 font-normal ml-1">({Object.keys(design.customColors!).length} override{Object.keys(design.customColors!).length > 1 ? 's' : ''})</span>}
        </button>
        {showCustomColors && (
          <div id="custom-colors-panel" className="mt-2 space-y-3">
            <div className="flex items-center justify-between">
              {hasCustomColors && (
                <button
                  onClick={() => {
                    onClearCustomColors();
                    // Switch to default built-in palette so the Update button is hidden
                    onDesignChange({ paletteId: getDefaultPaletteId() });
                  }}
                  className="text-xs text-red-500 hover:text-red-700 transition-colors"
                >
                  Reset to palette
                </button>
              )}
            </div>
            {COLOR_KEYS.map(key => (
              <label key={key} className="flex items-center gap-3">
                <input
                  type="color"
                  id={`color-input-${key}`}
                  value={resolvedPalette[key]}
                  onChange={e => onCustomColorChange(key, e.target.value)}
                  className="w-10 h-10 rounded border border-slate-300 cursor-pointer shrink-0"
                  aria-label={`${key.replace(/([A-Z])/g, ' $1').trim()} color: ${resolvedPalette[key]}`}
                />
                <span className="text-sm text-slate-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className="ml-auto text-xs font-mono text-slate-600">{resolvedPalette[key]}</span>
              </label>
            ))}
          </div>
        )}
      </section>

      {/* Icon Style */}
      <section>
        <h3 className="text-sm font-semibold text-slate-700 mb-2">Icon Style</h3>
        <p className="text-xs text-slate-600 mb-2">Controls icons on social &amp; contact items</p>
        <div className="flex gap-2 flex-wrap">
          {[
            { value: 'solid', label: 'Solid Icon' },
            { value: 'outline', label: 'Outline Icon' },
            { value: 'none', label: 'None' },
          ].map(opt => (
            <button key={opt.value}
              onClick={() => onDesignChange({ iconStyle: opt.value as 'solid' | 'outline' | 'none' })}
              className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                (design.iconStyle ?? 'none') === opt.value
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
              }`}
            >{opt.label}</button>
          ))}
        </div>
      </section>

      {/* Save palette section */}
      <section>
        {showSaveInput ? (
          <div className="space-y-2">
            <label htmlFor="palette-name-input" className="block text-xs text-slate-600 font-medium">Palette name</label>
            <input
              id="palette-name-input"
              type="text"
              value={presetName}
              onChange={e => setPresetName(e.target.value)}
              placeholder="Palette name..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
              onKeyDown={e => e.key === 'Enter' && handleSaveAsNew()}
            />
            <div className="flex gap-2">
              <button onClick={handleSaveAsNew} className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Save as New
              </button>
              <button onClick={() => { setShowSaveInput(false); }} className="px-3 py-2 text-slate-500 rounded-lg text-sm hover:bg-slate-100 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            {activeSavedPalette && onUpdatePalette && hasCustomColors && (
              <button onClick={handleUpdateExisting} className="flex-1 px-4 py-2.5 text-sm font-medium bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
                Update &ldquo;{activeSavedPalette.name}&rdquo;
              </button>
            )}
            {!activeSavedPalette && savedPalettes.length === 0 && (
              <button onClick={() => setShowSaveInput(true)} className="w-full px-4 py-2.5 text-sm font-medium bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
                Save Current as Palette
              </button>
            )}
            {activeSavedPalette && (
              <button onClick={() => { setShowSaveInput(true); }} className="px-4 py-2.5 text-sm font-medium bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
                Save as New
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

