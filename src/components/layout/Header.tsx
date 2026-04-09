import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const CARDS_KEY = 'bcard-saved-cards-v2';

function hasSavedCards(): boolean {
  try {
    const raw = localStorage.getItem(CARDS_KEY);
    if (!raw) return false;
    const cards = JSON.parse(raw);
    return Array.isArray(cards) && cards.length > 0;
  } catch {
    return false;
  }
}

export default function Header() {
  const location = useLocation();
  const isEditor = location.pathname.startsWith('/editor');
  const [showMyCards, setShowMyCards] = useState(hasSavedCards);

  useEffect(() => {
    const handleStorage = () => setShowMyCards(hasSavedCards());
    window.addEventListener('storage', handleStorage);

    const handleCardsUpdate = () => setShowMyCards(hasSavedCards());
    window.addEventListener('bcard-cards-updated', handleCardsUpdate);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('bcard-cards-updated', handleCardsUpdate);
    };
  }, []);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-slate-900 no-underline flex items-center h-full py-3">
          BCard
        </Link>
        <nav className="flex items-center gap-2">
          {showMyCards && (
            /* A07: Add aria-current="page" when on /cards route */
            <Link
              to="/cards"
              aria-current={location.pathname === '/cards' ? 'page' : undefined}
              className={`text-slate-600 px-3 py-3 rounded-lg text-sm no-underline hover:bg-slate-100 transition-colors min-h-[44px] flex items-center ${
                location.pathname === '/cards' ? 'bg-slate-100 font-medium' : ''
              }`}
            >
              My Cards
            </Link>
          )}
          {!isEditor && (
            <Link
              to="/editor"
              className="bg-blue-600 text-white px-4 py-3 rounded-lg text-sm font-medium no-underline hover:bg-blue-700 transition-colors min-h-[44px] flex items-center"
            >
              Create Card
            </Link>
          )}
          {isEditor && (
            <Link
              to="/"
              className="text-slate-600 px-3 py-3 rounded-lg text-sm no-underline hover:bg-slate-100 transition-colors min-h-[44px] flex items-center"
            >
              Browse Templates
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
