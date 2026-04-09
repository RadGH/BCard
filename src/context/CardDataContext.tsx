import { createContext, useContext, type ReactNode } from 'react';
import { useCardData } from '../hooks/useCardData';

type CardDataContextValue = ReturnType<typeof useCardData>;

const CardDataContext = createContext<CardDataContextValue | null>(null);

export function CardDataProvider({ children }: { children: ReactNode }) {
  const cardData = useCardData();
  return (
    <CardDataContext.Provider value={cardData}>
      {children}
    </CardDataContext.Provider>
  );
}

export function useCardDataContext(): CardDataContextValue {
  const ctx = useContext(CardDataContext);
  if (!ctx) {
    throw new Error('useCardDataContext must be used within a CardDataProvider');
  }
  return ctx;
}
