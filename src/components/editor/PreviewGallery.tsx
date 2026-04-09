import { useState, useMemo } from 'react';
import type { BusinessCardData, CardDesign } from '../../types/card';
import { renderFront, getFrontLayout, resolveColorPalette } from '../../templates/registry';

interface Props {
  data: BusinessCardData;
  design: CardDesign;
  onClose: () => void;
}

type MockupType = 'hand' | 'desk' | 'wallet' | 'stack';

const mockups: { id: MockupType; label: string }[] = [
  { id: 'hand', label: 'In Hand' },
  { id: 'desk', label: 'On Desk' },
  { id: 'wallet', label: 'In Wallet' },
  { id: 'stack', label: 'Card Stack' },
];

function HandMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <svg viewBox="0 0 400 350" className="w-full">
        <ellipse cx="200" cy="300" rx="90" ry="50" fill="#d4a574" />
        <rect x="110" y="180" width="180" height="130" rx="20" fill="#d4a574" />
        <ellipse cx="105" cy="210" rx="22" ry="40" fill="#c99a64" transform="rotate(-15, 105, 210)" />
        <rect x="120" y="100" width="28" height="100" rx="14" fill="#c99a64" />
        <rect x="155" y="85" width="28" height="115" rx="14" fill="#c99a64" />
        <rect x="190" y="80" width="28" height="120" rx="14" fill="#c99a64" />
        <rect x="225" y="90" width="26" height="110" rx="13" fill="#c99a64" />
        <foreignObject x="80" y="120" width="240" height="136">
          <div style={{ width: '100%', height: '100%', transform: 'rotate(-2deg)', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
            {children}
          </div>
        </foreignObject>
        <ellipse cx="134" cy="105" rx="14" ry="10" fill="#c99a64" />
        <ellipse cx="169" cy="90" rx="14" ry="10" fill="#c99a64" />
        <ellipse cx="204" cy="85" rx="14" ry="10" fill="#c99a64" />
        <ellipse cx="238" cy="95" rx="13" ry="9" fill="#c99a64" />
      </svg>
    </div>
  );
}

function DeskMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full max-w-lg mx-auto" style={{ perspective: '600px' }}>
      <div className="bg-amber-100 rounded-xl p-8 pt-12" style={{ transform: 'rotateX(15deg)', transformOrigin: 'bottom center' }}>
        <div className="mx-auto shadow-xl rounded" style={{ width: '70%', aspectRatio: '95.25/57.15' }}>
          {children}
        </div>
        <div className="absolute bottom-6 right-8 w-2 h-24 bg-slate-800 rounded-full" style={{ transform: 'rotate(30deg)' }} />
      </div>
    </div>
  );
}

function WalletMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div className="bg-stone-800 rounded-xl p-4 pb-2 shadow-xl">
        <div className="bg-stone-700 rounded-lg p-1 mb-2">
          <div className="h-3 bg-blue-200 rounded-t mb-0.5 mx-2" />
          <div className="h-3 bg-green-200 rounded-t mb-0.5 mx-1" />
        </div>
        <div className="bg-stone-600 rounded-lg p-2">
          <div className="rounded overflow-hidden shadow-md" style={{ aspectRatio: '95.25/57.15' }}>
            {children}
          </div>
        </div>
        <div className="h-2 bg-stone-900 rounded-b-xl -mx-4 mt-2" />
      </div>
    </div>
  );
}

function StackMockup({ card }: { card: React.ReactNode }) {
  return (
    <div className="relative w-full max-w-md mx-auto py-8">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[65%] bg-slate-200 rounded shadow opacity-40" style={{ aspectRatio: '95.25/57.15', transform: 'rotate(8deg) translateY(10px)' }} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[65%] bg-slate-300 rounded shadow opacity-60" style={{ aspectRatio: '95.25/57.15', transform: 'rotate(-4deg) translateY(5px)' }} />
      </div>
      <div className="relative mx-auto shadow-2xl rounded overflow-hidden" style={{ width: '65%', aspectRatio: '95.25/57.15', transform: 'rotate(1deg)' }}>
        {card}
      </div>
    </div>
  );
}

export default function PreviewGallery({ data, design, onClose }: Props) {
  const [active, setActive] = useState<MockupType>('hand');

  const frontLayout = useMemo(() => getFrontLayout(design.frontLayoutId), [design.frontLayoutId]);
  const palette = useMemo(
    () => resolveColorPalette(design.paletteId, design.customColors),
    [design.paletteId, design.customColors]
  );

  if (!frontLayout) return null;

  const cardSvg = renderFront(data, frontLayout, palette, design.titleFont, design.bodyFont);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex flex-col" onClick={onClose}>
      <div className="flex-1 overflow-auto p-4" onClick={e => e.stopPropagation()}>
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-white">Preview</h2>
            <button onClick={onClose} className="text-white/70 hover:text-white text-sm font-medium px-3 py-1">
              Close
            </button>
          </div>

          <div className="flex gap-2 mb-6 justify-center flex-wrap">
            {mockups.map(m => (
              <button
                key={m.id}
                onClick={() => setActive(m.id)}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  active === m.id
                    ? 'bg-white text-slate-900 font-medium'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="bg-slate-100 rounded-2xl p-6 min-h-[300px] flex items-center justify-center">
            {active === 'hand' && <HandMockup>{cardSvg}</HandMockup>}
            {active === 'desk' && <DeskMockup>{cardSvg}</DeskMockup>}
            {active === 'wallet' && <WalletMockup>{cardSvg}</WalletMockup>}
            {active === 'stack' && <StackMockup card={cardSvg} />}
          </div>

          <p className="text-center text-white/40 text-xs mt-4">
            Mockups are for visualization only. Print output uses exact card dimensions.
          </p>
        </div>
      </div>
    </div>
  );
}
