import { useState, useCallback } from 'react';

const STORAGE_KEY = 'bcard-sticky-collapsed';

function readCollapsed(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function useStickyPreview() {
  const [isCollapsed, setCollapsedState] = useState<boolean>(readCollapsed);

  const setCollapsed = useCallback((value: boolean) => {
    setCollapsedState(value);
    try {
      sessionStorage.setItem(STORAGE_KEY, String(value));
    } catch { /* ignore */ }
  }, []);

  return { isCollapsed, setCollapsed };
}
