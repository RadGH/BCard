import { useState, useCallback, useEffect } from 'react';
import type { ColorPalette } from '../types/template';
import { uuid as _uuid } from '../lib/uuid';

const STORAGE_KEY = 'bcard-palette-presets';

export interface SavedPalette {
  id: string;
  name: string;
  palette: ColorPalette;
}

function loadPresets(): SavedPalette[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function savePresets(presets: SavedPalette[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
}

export function useStylePresets() {
  const [presets, setPresets] = useState<SavedPalette[]>(loadPresets);

  useEffect(() => { savePresets(presets); }, [presets]);

  const addPreset = useCallback((name: string, palette: ColorPalette) => {
    const preset: SavedPalette = {
      id: _uuid(),
      name,
      palette,
    };
    setPresets(prev => [...prev, preset]);
    return preset;
  }, []);

  const deletePreset = useCallback((id: string) => {
    setPresets(prev => prev.filter(p => p.id !== id));
  }, []);

  const updatePreset = useCallback((id: string, name: string, palette: ColorPalette) => {
    setPresets(prev => prev.map(p => p.id === id ? { ...p, name, palette } : p));
  }, []);

  const renamePreset = useCallback((id: string, name: string) => {
    setPresets(prev => prev.map(p => p.id === id ? { ...p, name } : p));
  }, []);

  return { presets, addPreset, deletePreset, updatePreset, renamePreset };
}
