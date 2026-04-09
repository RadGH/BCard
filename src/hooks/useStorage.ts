import { useState, useEffect, useCallback } from 'react';
import type { SavedCard, BusinessCardData, CardDesign } from '../types/card';
import { getDB } from '../lib/db';
import { uuid as _uuid } from '../lib/uuid';

export function useStorage() {
  const [savedCards, setSavedCards] = useState<SavedCard[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const db = await getDB();
    const cards = await db.getAll('cards');
    cards.sort((a, b) => b.updatedAt - a.updatedAt);
    setSavedCards(cards);
    setLoading(false);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const saveCard = useCallback(async (
    name: string,
    cardData: BusinessCardData,
    cardDesign: CardDesign,
    existingId?: string
  ): Promise<SavedCard> => {
    const db = await getDB();
    const now = Date.now();
    const id = existingId ?? _uuid();
    const card: SavedCard = {
      id,
      name,
      design: { ...cardDesign, id, name, updatedAt: now },
      personData: cardData,
      createdAt: existingId ? ((await db.get('cards', existingId))?.createdAt ?? now) : now,
      updatedAt: now,
    };
    await db.put('cards', card);
    await refresh();
    return card;
  }, [refresh]);

  const deleteCard = useCallback(async (id: string) => {
    const db = await getDB();
    await db.delete('cards', id);
    await refresh();
  }, [refresh]);

  const loadCard = useCallback(async (id: string): Promise<SavedCard | undefined> => {
    const db = await getDB();
    return db.get('cards', id);
  }, []);

  const exportAll = useCallback(async (): Promise<string> => {
    const db = await getDB();
    const cards = await db.getAll('cards');
    return JSON.stringify(cards, null, 2);
  }, []);

  const importCards = useCallback(async (json: string) => {
    const cards: SavedCard[] = JSON.parse(json);
    const db = await getDB();
    for (const card of cards) {
      await db.put('cards', card);
    }
    await refresh();
  }, [refresh]);

  return { savedCards, loading, saveCard, deleteCard, loadCard, exportAll, importCards, refresh };
}
