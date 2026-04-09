import { useState, useCallback, useEffect } from 'react';
import type { BusinessCardData, CardDesign } from '../types/card';
import { createDefaultCardData, createDefaultCardDesign } from '../types/card';

const DRAFT_KEY = 'bcard-draft-v2';

interface Draft {
  data: BusinessCardData;
  design: CardDesign;
}

function loadDraft(): Draft | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Draft;
    if (parsed && parsed.data && parsed.design) return parsed;
    return null;
  } catch { return null; }
}

function saveDraft(draft: Draft) {
  try { localStorage.setItem(DRAFT_KEY, JSON.stringify(draft)); } catch { /* quota */ }
}

export function useCardData() {
  const [data, setData] = useState<BusinessCardData>(() => loadDraft()?.data ?? createDefaultCardData());
  const [design, setDesign] = useState<CardDesign>(() => loadDraft()?.design ?? createDefaultCardDesign());

  // Auto-save draft on every change
  useEffect(() => { saveDraft({ data, design }); }, [data, design]);

  // Field updaters for BusinessCardData
  const updateField = useCallback(<K extends keyof BusinessCardData>(
    field: K,
    value: BusinessCardData[K]
  ) => {
    setData(prev => ({ ...prev, [field]: value }));
  }, []);

  const updateSocial = useCallback((field: string, value: string) => {
    setData(prev => {
      const updated = { ...prev.social, [field]: value };
      if (!value) delete updated[field];
      return { ...prev, social: updated };
    });
  }, []);

  const updateAddress = useCallback((field: string, value: string) => {
    setData(prev => ({
      ...prev,
      address: {
        line1: prev.address?.line1 ?? '',
        city: prev.address?.city ?? '',
        state: prev.address?.state ?? '',
        zip: prev.address?.zip ?? '',
        ...prev.address,
        [field]: value,
      },
    }));
  }, []);

  // Design updaters for CardDesign
  const updateDesign = useCallback((patch: Partial<CardDesign>) => {
    setDesign(prev => ({ ...prev, ...patch, updatedAt: Date.now() }));
  }, []);

  const updateCustomColor = useCallback((key: string, value: string) => {
    setDesign(prev => ({
      ...prev,
      customColors: { ...prev.customColors, [key]: value },
      updatedAt: Date.now(),
    }));
  }, []);

  const clearCustomColors = useCallback(() => {
    setDesign(prev => ({ ...prev, customColors: undefined, updatedAt: Date.now() }));
  }, []);

  // Load a full card (both data and design)
  const loadCard = useCallback((cardData: BusinessCardData, cardDesign: CardDesign) => {
    setData(cardData);
    setDesign(cardDesign);
  }, []);

  return {
    data,
    setData,
    design,
    setDesign,
    updateField,
    updateSocial,
    updateAddress,
    updateDesign,
    updateCustomColor,
    clearCustomColors,
    loadCard,
  };
}
