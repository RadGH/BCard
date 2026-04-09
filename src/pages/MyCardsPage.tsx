import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, SquarePen, Trash2, CreditCard } from 'lucide-react';
import { renderFront, renderBack, getFrontLayout, getBackLayout, resolveColorPalette } from '../templates/registry';
import type { BusinessCardData, CardDesign } from '../types/card';

interface SavedCardEntry {
  id: string;
  name: string;
  data: BusinessCardData;
  design: CardDesign;
  savedAt: number;
}

const CARDS_KEY = 'bcard-saved-cards-v2';

function loadCards(): SavedCardEntry[] {
  try {
    return JSON.parse(localStorage.getItem(CARDS_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function CardThumbnail({ data, design }: { data: BusinessCardData; design: CardDesign }) {
  const frontLayout = useMemo(() => getFrontLayout(design.frontLayoutId), [design.frontLayoutId]);
  const backLayout = useMemo(() => getBackLayout(design.backLayoutId), [design.backLayoutId]);
  const palette = useMemo(() => resolveColorPalette(design.paletteId, design.customColors), [design.paletteId, design.customColors]);

  const bgOptions = useMemo(() => ({
    backgroundId: design.backgroundId,
    backgroundFlipH: design.backgroundFlipH,
    backgroundFlipV: design.backgroundFlipV,
    logoColorOverride: design.logoColorOverride,
    iconStyle: design.iconStyle,
    useTextLogo: data.useTextLogo,
  }), [design, data.useTextLogo]);

  const appliesTo = design.backgroundAppliesTo ?? 'both';
  const frontBgOptions = appliesTo === 'back' ? { ...bgOptions, backgroundId: undefined } : bgOptions;
  const backBgOptions = appliesTo === 'front' ? { ...bgOptions, backgroundId: undefined } : bgOptions;

  const frontSvg = useMemo(() => {
    if (!frontLayout) return null;
    return renderFront(data, frontLayout, palette, design.titleFont, design.bodyFont, frontBgOptions);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, design, frontLayout, palette]);

  const backSvg = useMemo(() => {
    if (!backLayout) return null;
    return renderBack(data, backLayout, palette, design.titleFont, design.bodyFont, backBgOptions);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, design, backLayout, palette]);

  return (
    <div className="flex flex-col gap-1">
      {/* A06: Added role="img" and aria-label for front card */}
      <div
        role="img"
        aria-label={`Business card front preview${data.firstName ? ` for ${[data.firstName, data.lastName].filter(Boolean).join(' ')}` : ''}`}
        className="w-full bg-white rounded shadow border border-slate-200 overflow-hidden"
        style={{ aspectRatio: '95.25 / 57.15' }}
      >
        {frontSvg ?? <div className="flex items-center justify-center h-full text-slate-300 text-xs">No layout</div>}
      </div>
      {/* A06: Added role="img" and aria-label for back card */}
      <div
        role="img"
        aria-label={`Business card back preview${data.firstName ? ` for ${[data.firstName, data.lastName].filter(Boolean).join(' ')}` : ''}`}
        className="w-full bg-white rounded shadow border border-slate-200 overflow-hidden"
        style={{ aspectRatio: '95.25 / 57.15' }}
      >
        {backSvg ?? <div className="flex items-center justify-center h-full text-slate-300 text-xs">No back</div>}
      </div>
    </div>
  );
}

export default function MyCardsPage() {
  const navigate = useNavigate();
  const [cards, setCards] = useState<SavedCardEntry[]>(() => loadCards());

  const handleEdit = (card: SavedCardEntry) => {
    // Dispatch load event, navigate to editor
    navigate('/editor');
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('bcard-load', {
        detail: { data: card.data, design: card.design, id: card.id },
      }));
    }, 80);
  };

  const handleDelete = (id: string) => {
    const updated = cards.filter(c => c.id !== id);
    localStorage.setItem(CARDS_KEY, JSON.stringify(updated));
    setCards(updated);
  };

  const formatDate = (ts: number) => {
    return new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">My Cards</h1>
        <button
          onClick={() => navigate('/editor')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus className="inline w-3 h-3 mr-1.5" />
          New Card
        </button>
      </div>

      {cards.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <CreditCard className="w-10 h-10 mb-4 mx-auto" />
          <p className="text-lg font-medium mb-1">No saved cards yet</p>
          <p className="text-sm mb-4">Create and save a card in the editor to see it here.</p>
          <button
            onClick={() => navigate('/editor')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Go to Editor
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cards.map(card => (
            <div key={card.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-3">
                <CardThumbnail data={card.data} design={card.design} />
              </div>
              <div className="px-3 pb-3">
                <p className="text-sm font-semibold text-slate-800 truncate">{card.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">Saved {formatDate(card.savedAt)}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(card)}
                    className="flex-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors"
                  >
                    <SquarePen className="inline w-3 h-3 mr-1" />
                    Edit
                  </button>
                  {/* A01: Delete button with aria-label */}
                  <button
                    onClick={() => handleDelete(card.id)}
                    aria-label={`Delete card "${card.name}"`}
                    title="Delete card"
                    className="px-2 py-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3 h-3" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
