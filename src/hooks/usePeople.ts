import { useState, useCallback, useEffect } from 'react';
import type { PersonData } from '../types/card';

const STORAGE_KEY = 'bcard-people';

function loadPeople(): PersonData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function savePeople(people: PersonData[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(people));
}

export function usePeople() {
  const [people, setPeople] = useState<PersonData[]>(loadPeople);

  useEffect(() => { savePeople(people); }, [people]);

  const addPerson = useCallback((person: PersonData) => {
    setPeople(prev => [...prev, person]);
  }, []);

  const updatePerson = useCallback((person: PersonData) => {
    setPeople(prev => prev.map(p => p.id === person.id ? person : p));
  }, []);

  const deletePerson = useCallback((id: string) => {
    setPeople(prev => prev.filter(p => p.id !== id));
  }, []);

  const getPerson = useCallback((id: string) => {
    return people.find(p => p.id === id);
  }, [people]);

  return { people, addPerson, updatePerson, deletePerson, getPerson };
}
