import { useState, useEffect, useCallback } from 'react';
import { useCardDataContext } from '../../context/CardDataContext';
import { usePeople } from '../../hooks/usePeople';
import { useStylePresets } from '../../hooks/useStylePresets';
import { useFontSets } from '../../hooks/useFontSets';
import type { PersonData, BusinessCardData, CardDesign } from '../../types/card';
import { personToCardData, createDefaultCardData } from '../../types/card';
import CardPreview from './CardPreview';
import FieldsPanel from './FieldsPanel';
import StylePanel from './StylePanel';
import FontsPanel from './FontsPanel';
import TemplateSelector from './TemplateSelector';
import ImageUploader from './ImageUploader';
import QRCodeField from './QRCodeField';
import BackgroundSelector from './BackgroundSelector';
import ExportPanel from './ExportPanel';
import PersonSelector from './PersonSelector';
import SimilarLayouts from './RelatedCards';
import MoreLayouts from './MoreLayouts';
import AdvancedPanel from './AdvancedPanel';

interface SavedCardEntry {
  id: string;
  name: string;
  data: BusinessCardData;
  design: CardDesign;
  savedAt: number;
}

const CARDS_KEY = 'bcard-saved-cards-v2';

interface Props {
  initialFrontLayoutId?: string;
}

type Tab = 'profile' | 'images' | 'colors' | 'fonts' | 'layout' | 'advanced' | 'export';

export default function CardEditor({ initialFrontLayoutId }: Props) {
  const {
    data, setData,
    design, setDesign,
    updateField, updateSocial, updateAddress,
    updateDesign, updateCustomColor, clearCustomColors,
    loadCard,
  } = useCardDataContext();

  const { people, addPerson, updatePerson, deletePerson } = usePeople();
  const { presets, addPreset, deletePreset, updatePreset, renamePreset } = useStylePresets();
  const { fontSets, addFontSet, updateFontSet, deleteFontSet } = useFontSets();
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [activePersonId, setActivePersonId] = useState<string | null>(null);
  const [showPrintMargins, setShowPrintMargins] = useState(false);

  const [savedCards, setSavedCards] = useState<SavedCardEntry[]>(() => {
    try { return JSON.parse(localStorage.getItem(CARDS_KEY) ?? '[]'); } catch { return []; }
  });
  const [activeSavedCardId, setActiveSavedCardId] = useState<string | null>(null);
  const [showSaveCardForm, setShowSaveCardForm] = useState(false);
  const [saveCardName, setSaveCardName] = useState('');

  const persistCards = (cards: SavedCardEntry[]) => {
    localStorage.setItem(CARDS_KEY, JSON.stringify(cards));
    setSavedCards(cards);
  };

  const handleLoadCard = useCallback((card: SavedCardEntry) => {
    loadCard(card.data, card.design);
    setActiveSavedCardId(card.id);
    setActivePersonId(null);
  }, [loadCard]);

  const handleSaveCard = useCallback(() => {
    const name = saveCardName.trim() || [data.firstName, data.lastName].filter(Boolean).join(' ') || 'My Card';
    if (activeSavedCardId) {
      const updated = savedCards.map(c => c.id === activeSavedCardId ? { ...c, name, data, design, savedAt: Date.now() } : c);
      persistCards(updated);
    } else {
      const entry: SavedCardEntry = { id: crypto.randomUUID(), name, data, design, savedAt: Date.now() };
      persistCards([entry, ...savedCards]);
      setActiveSavedCardId(entry.id);
    }
    setSaveCardName('');
    setShowSaveCardForm(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveCardName, activeSavedCardId, savedCards, data, design]);

  const handleDeleteCard = useCallback((id: string) => {
    persistCards(savedCards.filter(c => c.id !== id));
    if (activeSavedCardId === id) setActiveSavedCardId(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedCards, activeSavedCardId]);

  // Apply initialFrontLayoutId from URL on first mount
  useEffect(() => {
    if (initialFrontLayoutId) {
      setDesign(prev => ({ ...prev, frontLayoutId: initialFrontLayoutId }));
    }
    // Intentionally only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listen for card load events from ExportPanel
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { data: BusinessCardData; design: CardDesign; id?: string } | null;
      if (detail?.data && detail?.design) {
        loadCard(detail.data, detail.design);
        setActivePersonId(null);
        // If an id was passed (dispatched from within CardEditor itself), use it;
        // otherwise try to find the matching card in savedCards by id.
        if (detail.id) {
          setActiveSavedCardId(detail.id);
        }
      }
    };
    window.addEventListener('bcard-load', handler);
    return () => window.removeEventListener('bcard-load', handler);
  }, [loadCard]);

  const handleSelectPerson = useCallback((person: PersonData) => {
    setActivePersonId(person.id);
    const cardData = personToCardData(person);
    setData(prev => ({ ...prev, ...cardData }));
  }, [setData]);

  const handleSavePerson = useCallback((person: PersonData) => {
    const existing = people.find(p => p.id === person.id);
    if (existing) {
      updatePerson(person);
    } else {
      addPerson(person);
    }
    setActivePersonId(person.id);
  }, [people, addPerson, updatePerson]);

  const handleDeletePerson = useCallback((id: string) => {
    deletePerson(id);
    if (activePersonId === id) setActivePersonId(null);
  }, [deletePerson, activePersonId]);

  const handleUseDemoData = useCallback((person: PersonData) => {
    setActivePersonId(null);
    const cardData = personToCardData(person);
    setData(prev => ({ ...prev, ...cardData }));
  }, [setData]);

  const handleNewPerson = useCallback(() => {
    setActivePersonId(null);
    setData(createDefaultCardData());
  }, [setData]);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'profile', label: 'Profile' },
    { id: 'images', label: 'Images' },
    { id: 'colors', label: 'Colors' },
    { id: 'fonts', label: 'Fonts' },
    { id: 'layout', label: 'Layouts' },
    { id: 'advanced', label: 'Advanced' },
    { id: 'export', label: 'Export' },
  ];

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        <div className="lg:sticky lg:top-18 lg:self-start w-full lg:w-1/2 xl:w-[55%]">
          <CardPreview data={data} design={design} showPrintMargins={showPrintMargins} />
        </div>

        <div className="w-full lg:w-1/2 xl:w-[45%]">
          {/* Saved Cards row */}
          <div className="mb-2">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide shrink-0">Card</span>
              <select
                value={activeSavedCardId ?? ''}
                onChange={e => {
                  const card = savedCards.find(c => c.id === e.target.value);
                  if (card) handleLoadCard(card);
                  else setActiveSavedCardId(null);
                }}
                className="flex-1 min-w-0 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Saved Cards --</option>
                {savedCards.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              {/* Save / update button - A01 */}
              <button
                onClick={() => {
                  if (activeSavedCardId) {
                    handleSaveCard();
                  } else {
                    setShowSaveCardForm(v => !v);
                  }
                }}
                aria-label={activeSavedCardId ? 'Update saved card' : 'Save card'}
                title={activeSavedCardId ? 'Update saved card' : 'Save card'}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              >
                <i className="fa-solid fa-floppy-disk text-sm" aria-hidden="true" />
              </button>
              {activeSavedCardId && (
                <>
                  {/* Copy "save as new" button - A01 */}
                  <button
                    onClick={() => { setActiveSavedCardId(null); setShowSaveCardForm(true); }}
                    aria-label="Save as new card"
                    title="Save as new card"
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <i className="fa-solid fa-copy text-sm" aria-hidden="true" />
                  </button>
                  {/* Delete button - A01 */}
                  <button
                    onClick={() => handleDeleteCard(activeSavedCardId)}
                    aria-label="Delete card"
                    title="Delete card"
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <i className="fa-solid fa-trash text-sm" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>
            {showSaveCardForm && (
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={saveCardName}
                  onChange={e => setSaveCardName(e.target.value)}
                  placeholder={[data.firstName, data.lastName].filter(Boolean).join(' ') || 'Card name...'}
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                  onKeyDown={e => e.key === 'Enter' && handleSaveCard()}
                />
                <button onClick={handleSaveCard} className="px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">Save</button>
                <button onClick={() => setShowSaveCardForm(false)} className="px-3 py-2 text-slate-500 rounded-lg text-sm hover:bg-slate-100">Cancel</button>
              </div>
            )}
          </div>

          {/* Person selector */}
          <div className="mb-4 pb-4 border-b border-slate-200">
            <PersonSelector
              people={people}
              activePersonId={activePersonId}
              currentData={data}
              onSelectPerson={handleSelectPerson}
              onSavePerson={handleSavePerson}
              onDeletePerson={handleDeletePerson}
              onUseDemoData={handleUseDemoData}
              onNewPerson={handleNewPerson}
            />
          </div>

          {/* Tab bar - A05: Added role="tablist" and aria-label. Wrapper adds right-fade scroll hint on mobile. */}
          <div className="relative mb-4 -mx-4">
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 lg:hidden" aria-hidden="true" />
          <div className="flex border-b border-slate-200 overflow-x-auto px-4" role="tablist" aria-label="Card editor sections">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                role="tab"
                aria-selected={activeTab === tab.id}
                id={`tab-${tab.id}`}
                aria-controls={`panel-${tab.id}`}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors min-h-[44px] ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          </div>

          {/* Tab content - A05: Added role="tabpanel" and related attributes */}
          <div className="pb-8" role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`} tabIndex={0}>
            {activeTab === 'profile' && (
              <FieldsPanel
                data={data}
                updateField={updateField}
                updateSocial={updateSocial}
                updateAddress={updateAddress}
              />
            )}
            {activeTab === 'images' && (
              <div className="space-y-6">
                <ImageUploader
                  label="Portrait Photo / Headshot"
                  currentImage={data.portrait}
                  onImageChange={url => updateField('portrait', url)}
                />
                <ImageUploader
                  label="Logo"
                  currentImage={data.logo}
                  onImageChange={url => updateField('logo', url)}
                />
                {/* Logo options */}
                {!data.logo && (
                  <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={data.useTextLogo ?? true}
                      onChange={e => updateField('useTextLogo', e.target.checked)}
                      className="rounded"
                    />
                    Use text logo (show company name when no logo uploaded)
                  </label>
                )}
                {/* Logo color override */}
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(design.logoColorOverride)}
                      onChange={e => updateDesign({ logoColorOverride: e.target.checked ? '#000000' : undefined })}
                      className="rounded"
                    />
                    Override logo color
                  </label>
                  {design.logoColorOverride && (
                    <input
                      type="color"
                      value={design.logoColorOverride}
                      onChange={e => updateDesign({ logoColorOverride: e.target.value })}
                      className="w-8 h-8 rounded border border-slate-300 cursor-pointer"
                    />
                  )}
                </div>
                <div className="border-t border-slate-200 pt-4">
                  <QRCodeField value={data.qrCode} onChange={qr => updateField('qrCode', qr)} />
                </div>
                <div className="border-t border-slate-200 pt-4">
                  <BackgroundSelector
                    design={design}
                    onBackgroundChange={bgId => updateDesign({ backgroundId: bgId })}
                    onFlipChange={(flipH, flipV) => updateDesign({ backgroundFlipH: flipH, backgroundFlipV: flipV })}
                    onAppliesToChange={v => updateDesign({ backgroundAppliesTo: v })}
                  />
                </div>
              </div>
            )}
            {activeTab === 'colors' && (
              <StylePanel
                design={design}
                onDesignChange={updateDesign}
                onCustomColorChange={updateCustomColor}
                onClearCustomColors={clearCustomColors}
                savedPalettes={presets}
                onSavePalette={addPreset}
                onDeletePalette={deletePreset}
                onUpdatePalette={updatePreset}
                onRenamePalette={renamePreset}
              />
            )}
            {activeTab === 'fonts' && (
              <FontsPanel
                design={design}
                onDesignChange={updateDesign}
                savedFontSets={fontSets}
                onAddFontSet={addFontSet}
                onUpdateFontSet={updateFontSet}
                onDeleteFontSet={deleteFontSet}
              />
            )}
            {activeTab === 'layout' && (
              <TemplateSelector
                design={design}
                data={data}
                onDesignChange={updateDesign}
              />
            )}
            {activeTab === 'advanced' && (
              <AdvancedPanel
                design={design}
                onDesignChange={updateDesign}
              />
            )}
            {activeTab === 'export' && (
              <ExportPanel
                data={data}
                design={design}
                showPrintMargins={showPrintMargins}
                onTogglePrintMargins={setShowPrintMargins}
              />
            )}
          </div>
        </div>
      </div>

      {/* Similar layouts section */}
      <SimilarLayouts
        design={design}
        data={data}
        onLayoutChange={frontLayoutId => updateDesign({ frontLayoutId })}
      />

      {/* More layouts from other categories */}
      <MoreLayouts
        design={design}
        data={data}
        onLayoutChange={frontLayoutId => updateDesign({ frontLayoutId })}
      />
    </div>
  );
}
