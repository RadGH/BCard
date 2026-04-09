import { useState } from 'react';
import type { PersonData, BusinessCardData } from '../../types/card';
import { cardDataToPerson } from '../../types/card';
import { generateDemoPerson } from '../../lib/demo-data';

interface Props {
  people: PersonData[];
  activePersonId: string | null;
  currentData: BusinessCardData;
  onSelectPerson: (person: PersonData) => void;
  onSavePerson: (person: PersonData) => void;
  onDeletePerson: (id: string) => void;
  onUseDemoData: (person: PersonData) => void;
  onNewPerson: () => void;
}

export default function PersonSelector({
  people,
  activePersonId,
  currentData,
  onSelectPerson,
  onSavePerson,
  onDeletePerson,
  onUseDemoData,
  onNewPerson,
}: Props) {
  const [showSave, setShowSave] = useState(false);
  const [saveName, setSaveName] = useState('');

  const handleSave = () => {
    const name = saveName.trim() || [currentData.firstName, currentData.lastName].filter(Boolean).join(' ') || 'Unnamed';
    const person = cardDataToPerson(currentData, activePersonId ?? undefined, name);
    onSavePerson(person);
    setSaveName('');
    setShowSave(false);
  };

  const handleUpdateCurrent = () => {
    if (!activePersonId) return;
    const existing = people.find(p => p.id === activePersonId);
    if (!existing) return;
    const updated = cardDataToPerson(currentData, activePersonId, existing.name);
    onSavePerson(updated);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === '__demo__') {
      const demo = generateDemoPerson();
      onUseDemoData(demo);
      // Reset select visually
      e.target.value = '';
    } else if (val === '') {
      onNewPerson();
    } else {
      const person = people.find(p => p.id === val);
      if (person) onSelectPerson(person);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wide shrink-0">Person</span>
        <select
          value={activePersonId ?? ''}
          onChange={handleChange}
          className="flex-1 min-w-0 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- New Person --</option>
          {people.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
          <option value="__demo__">-- Use Demo Data --</option>
        </select>
        {activePersonId && (
          <>
            <button onClick={handleUpdateCurrent} title="Save Changes" className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
              <i className="fa-solid fa-floppy-disk text-sm" />
            </button>
            <button onClick={() => setShowSave(true)} title="Save as New Person" className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <i className="fa-solid fa-copy text-sm" />
            </button>
            <button onClick={() => onDeletePerson(activePersonId)} title="Delete Person" className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
              <i className="fa-solid fa-trash text-sm" />
            </button>
          </>
        )}
        {!activePersonId && (
          <button onClick={() => setShowSave(true)} title="Save Person" className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <i className="fa-solid fa-floppy-disk text-sm" />
          </button>
        )}
      </div>

      {showSave && (
        <div className="flex gap-2">
          <input
            type="text"
            value={saveName}
            onChange={e => setSaveName(e.target.value)}
            placeholder={[currentData.firstName, currentData.lastName].filter(Boolean).join(' ') || 'Person name...'}
            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
            onKeyDown={e => e.key === 'Enter' && handleSave()}
          />
          <button
            onClick={handleSave}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
          <button
            onClick={() => setShowSave(false)}
            className="px-3 py-2 text-slate-500 rounded-lg text-sm hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
