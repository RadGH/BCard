import { useState, useCallback, useEffect } from 'react';
import { uuid as _uuid } from '../lib/uuid';

export interface FontSet {
  id: string;
  name: string;
  titleFont: string;
  bodyFont: string;
  isBuiltIn?: boolean;
}

const STORAGE_KEY = 'bcard-font-sets';

function loadFontSets(): FontSet[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveFontSets(sets: FontSet[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sets));
}

export function useFontSets() {
  const [fontSets, setFontSets] = useState<FontSet[]>(loadFontSets);
  useEffect(() => { saveFontSets(fontSets); }, [fontSets]);

  const addFontSet = useCallback((name: string, titleFont: string, bodyFont: string): FontSet => {
    const set: FontSet = { id: _uuid(), name, titleFont, bodyFont };
    setFontSets(prev => [...prev, set]);
    return set;
  }, []);

  const updateFontSet = useCallback((id: string, patch: Partial<Omit<FontSet, 'id' | 'isBuiltIn'>>) => {
    setFontSets(prev => prev.map(s => s.id === id ? { ...s, ...patch } : s));
  }, []);

  const deleteFontSet = useCallback((id: string) => {
    setFontSets(prev => prev.filter(s => s.id !== id));
  }, []);

  return { fontSets, addFontSet, updateFontSet, deleteFontSet };
}
