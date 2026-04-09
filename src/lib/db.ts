import { openDB, type DBSchema } from 'idb';
import type { SavedCard, SavedPerson } from '../types/card';

interface BCardDB extends DBSchema {
  cards: {
    key: string;
    value: SavedCard;
    indexes: { 'by-updated': number };
  };
  people: {
    key: string;
    value: SavedPerson;
    indexes: { 'by-updated': number };
  };
  images: {
    key: string;
    value: {
      id: string;
      name: string;
      dataUrl: string;
      width: number;
      height: number;
      createdAt: number;
    };
  };
  preferences: {
    key: string;
    value: { key: string; value: unknown };
  };
}

const DB_NAME = 'bcard-db';
const DB_VERSION = 2;

export function getDB() {
  return openDB<BCardDB>(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion) {
      // Version 1 → create cards, images, preferences stores
      if (oldVersion < 1) {
        const cardStore = db.createObjectStore('cards', { keyPath: 'id' });
        cardStore.createIndex('by-updated', 'updatedAt');
        db.createObjectStore('images', { keyPath: 'id' });
        db.createObjectStore('preferences', { keyPath: 'key' });
      }

      // Version 2 → add people store (don't migrate old card data)
      if (oldVersion < 2) {
        if (!db.objectStoreNames.contains('cards')) {
          const cardStore = db.createObjectStore('cards', { keyPath: 'id' });
          cardStore.createIndex('by-updated', 'updatedAt');
        }
        if (!db.objectStoreNames.contains('images')) {
          db.createObjectStore('images', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('preferences')) {
          db.createObjectStore('preferences', { keyPath: 'key' });
        }
        const peopleStore = db.createObjectStore('people', { keyPath: 'id' });
        peopleStore.createIndex('by-updated', 'updatedAt');
      }
    },
  });
}
