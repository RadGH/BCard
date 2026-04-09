import { useEffect, useState, useCallback } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import HomePage from './pages/HomePage';
import EditorPage from './pages/EditorPage';
import MyCardsPage from './pages/MyCardsPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';
import DemoAssetsPage from './pages/DemoAssetsPage';
import StickyPreview from './components/StickyPreview';
import { CardDataProvider, useCardDataContext } from './context/CardDataContext';
import type { BusinessCardData, CardDesign } from './types/card';

// Session-scoped saved snapshot key
const SNAPSHOT_KEY = 'bcard-sticky-snapshot';

interface Snapshot {
  data: BusinessCardData;
  design: CardDesign;
}

function readSnapshot(): Snapshot | null {
  try {
    const raw = sessionStorage.getItem(SNAPSHOT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Snapshot;
  } catch {
    return null;
  }
}

function writeSnapshot(snap: Snapshot) {
  try {
    sessionStorage.setItem(SNAPSHOT_KEY, JSON.stringify(snap));
  } catch { /* quota */ }
}

function hasContent(data: BusinessCardData): boolean {
  return Boolean(
    data.firstName?.trim() ||
    data.lastName?.trim() ||
    data.company?.trim() ||
    data.email?.trim(),
  );
}

function StickyPreviewWrapper() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, design, setData, setDesign } = useCardDataContext();

  const [snapshot, setSnapshot] = useState<Snapshot | null>(readSnapshot);
  const [hasScrolledPast, setHasScrolledPast] = useState(false);

  const handleSave = useCallback(() => {
    const snap: Snapshot = { data, design };
    writeSnapshot(snap);
    setSnapshot(snap);
    window.dispatchEvent(new CustomEvent('bcard-widget-save', { detail: { data, design } }));
  }, [data, design]);

  const handleUndo = useCallback(() => {
    if (!snapshot) return;
    setData(snapshot.data);
    setDesign(snapshot.design);
  }, [snapshot, setData, setDesign]);

  const handleEdit = useCallback(() => {
    navigate('/editor');
  }, [navigate]);

  const handlePreview = useCallback(() => {
    if (location.pathname !== '/editor') {
      // Navigate first, then dispatch event after navigation settles
      navigate('/editor');
      // Use a small timeout so the editor mounts before dispatching
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('bcard-open-3d'));
      }, 100);
    } else {
      window.dispatchEvent(new CustomEvent('bcard-open-3d'));
    }
  }, [location.pathname, navigate]);

  // Scroll listener — only relevant on /editor page
  useEffect(() => {
    if (location.pathname !== '/editor') {
      setHasScrolledPast(false);
      return;
    }

    function handleScroll() {
      setHasScrolledPast(window.scrollY > window.innerHeight * 0.5);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Show on non-editor pages always (when content exists),
  // on /editor only when scrolled past midpoint.
  const isOnEditor = location.pathname === '/editor';
  const shouldShow = hasContent(data) && (!isOnEditor || hasScrolledPast);

  if (!shouldShow) return null;

  return (
    <StickyPreview
      data={data}
      design={design}
      hasSavedVersion={snapshot !== null}
      onSave={handleSave}
      onUndo={handleUndo}
      onEdit={handleEdit}
      onPreview={handlePreview}
    />
  );
}

export default function App() {
  return (
    <CardDataProvider>
      <AppShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/editor/:cardId" element={<EditorPage />} />
          <Route path="/cards" element={<MyCardsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/demo-assets" element={<DemoAssetsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <StickyPreviewWrapper />
      </AppShell>
    </CardDataProvider>
  );
}
