import { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import type { CardDesign } from '../../types/card';
import type { FontSet } from '../../hooks/useFontSets';
import { BUILT_IN_FONT_SETS } from '../../constants/font-pairings';
import { fontFamilyList } from '../../templates/fonts/index';

interface Props {
  design: CardDesign;
  onDesignChange: (patch: Partial<CardDesign>) => void;
  savedFontSets: FontSet[];
  onAddFontSet: (name: string, titleFont: string, bodyFont: string) => FontSet;
  onUpdateFontSet: (id: string, patch: Partial<Omit<FontSet, 'id' | 'isBuiltIn'>>) => void;
  onDeleteFontSet: (id: string) => void;
}

function FontSetCard({ set, isActive, onApply, onDelete, onRename }: {
  set: FontSet;
  isActive: boolean;
  onApply: () => void;
  onDelete?: () => void;
  onRename?: () => void;
}) {
  return (
    <div className={`flex items-center gap-3 px-3 py-2 rounded-lg border transition-all ${
      isActive ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
    }`}>
      <button onClick={onApply} className="flex-1 text-left min-w-0">
        <div className="flex items-baseline gap-3 min-w-0">
          <span className="text-sm font-medium text-slate-700 truncate flex-1" style={{ fontFamily: `'${set.titleFont}', serif` }}>
            {set.name}
          </span>
        </div>
        <div className="text-xs text-slate-400 mt-0.5 truncate" style={{ fontFamily: `'${set.bodyFont}', sans-serif` }}>
          {set.titleFont} / {set.bodyFont}
        </div>
      </button>
      {isActive && <span className="text-xs text-blue-600 font-medium shrink-0">Active</span>}
      {onRename && (
        <button onClick={onRename} className="p-1 text-slate-400 hover:text-slate-600 rounded shrink-0" title="Rename">
          <Pencil className="w-3 h-3" />
        </button>
      )}
      {onDelete && (
        <button onClick={onDelete} className="p-1 text-red-400 hover:text-red-600 rounded shrink-0" title="Delete font set">
          <Trash2 className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}

export default function FontsPanel({ design, onDesignChange, savedFontSets, onAddFontSet, onUpdateFontSet, onDeleteFontSet }: Props) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSetName, setNewSetName] = useState('');
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  // Load fonts on mount
  useEffect(() => {
    import('../../lib/font-loader').then(m => {
      m.loadFontPair(design.titleFont, design.bodyFont);
      BUILT_IN_FONT_SETS.forEach(s => m.loadFontPair(s.titleFont, s.bodyFont));
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [design.titleFont, design.bodyFont]);

  const isActiveSet = (set: FontSet) => design.titleFont === set.titleFont && design.bodyFont === set.bodyFont;

  const applyFontSet = (set: FontSet) => {
    onDesignChange({ titleFont: set.titleFont, bodyFont: set.bodyFont });
    import('../../lib/font-loader').then(m => m.loadFontPair(set.titleFont, set.bodyFont));
  };

  const handleSaveNew = () => {
    if (!newSetName.trim()) return;
    onAddFontSet(newSetName.trim(), design.titleFont, design.bodyFont);
    setNewSetName('');
    setShowAddForm(false);
  };

  const commitRename = () => {
    if (renamingId && renameValue.trim()) onUpdateFontSet(renamingId, { name: renameValue.trim() });
    setRenamingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Saved font sets */}
      {savedFontSets.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-slate-700 mb-3">My Font Sets</h3>
          <div className="space-y-1.5">
            {savedFontSets.map(set => (
              renamingId === set.id ? (
                <div key={set.id} className="flex gap-2 items-center">
                  <input
                    type="text" value={renameValue} onChange={e => setRenameValue(e.target.value)}
                    onBlur={commitRename}
                    onKeyDown={e => { if (e.key === 'Enter') commitRename(); if (e.key === 'Escape') setRenamingId(null); }}
                    autoFocus
                    className="flex-1 px-3 py-2 border border-blue-400 rounded-lg text-sm focus:outline-none"
                  />
                  <button onClick={commitRename} className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm">Save</button>
                </div>
              ) : (
                <FontSetCard
                  key={set.id} set={set} isActive={isActiveSet(set)}
                  onApply={() => applyFontSet(set)}
                  onDelete={() => onDeleteFontSet(set.id)}
                  onRename={() => { setRenamingId(set.id); setRenameValue(set.name); }}
                />
              )
            ))}
          </div>
        </section>
      )}

      {/* Built-in pairings */}
      <section>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Font Pairings</h3>
        <div className="space-y-1.5">
          {BUILT_IN_FONT_SETS.map(set => (
            <FontSetCard
              key={set.id} set={set} isActive={isActiveSet(set)}
              onApply={() => applyFontSet(set)}
            />
          ))}
        </div>
      </section>

      {/* Custom selection */}
      <section>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Custom Selection</h3>
        <div className="space-y-3">
          <label className="block">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Title / Heading Font</span>
            <select
              value={design.titleFont}
              onChange={e => { onDesignChange({ titleFont: e.target.value }); import('../../lib/font-loader').then(m => m.loadFontPair(e.target.value, design.bodyFont)); }}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {fontFamilyList.map(font => <option key={font} value={font}>{font}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Body Font</span>
            <select
              value={design.bodyFont}
              onChange={e => { onDesignChange({ bodyFont: e.target.value }); import('../../lib/font-loader').then(m => m.loadFontPair(design.titleFont, e.target.value)); }}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {fontFamilyList.map(font => <option key={font} value={font}>{font}</option>)}
            </select>
          </label>
        </div>

        {showAddForm ? (
          <div className="mt-3 space-y-2">
            <input
              type="text" value={newSetName} onChange={e => setNewSetName(e.target.value)}
              placeholder="Font set name..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus onKeyDown={e => e.key === 'Enter' && handleSaveNew()}
            />
            <div className="flex gap-2">
              <button onClick={handleSaveNew} className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                Save Font Set
              </button>
              <button onClick={() => setShowAddForm(false)} className="px-3 py-2 text-slate-500 rounded-lg text-sm hover:bg-slate-100">Cancel</button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAddForm(true)}
            className="mt-3 flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg border border-dashed border-blue-300 w-full transition-colors"
          >
            <Plus className="w-3 h-3" /> Save as Font Set
          </button>
        )}
      </section>
    </div>
  );
}
