import { describe, it, expect } from 'vitest';
import {
  createDefaultCardData,
  createDefaultCardDesign,
  personToCardData,
  cardDataToPerson,
} from '../types/card';
import type { PersonData } from '../types/card';
import { getDefaultFrontLayoutId, getDefaultPaletteId } from '../templates/registry';

describe('Card Data', () => {
  it('createDefaultCardData has empty fields', () => {
    const data = createDefaultCardData();
    expect(data.firstName).toBe('');
    expect(data.lastName).toBe('');
    expect(data.email).toBe('');
    expect(data.phone).toBe('');
  });

  it('createDefaultCardDesign has valid defaults', () => {
    const design = createDefaultCardDesign();
    expect(design.id).toBeTruthy();
    expect(design.frontLayoutId).toBeTruthy();
    expect(design.backLayoutId).toBeTruthy();
    expect(design.paletteId).toBeTruthy();
    expect(design.titleFont).toBeTruthy();
    expect(design.bodyFont).toBeTruthy();
  });
});

describe('Person <-> Card conversion', () => {
  const mockPerson: PersonData = {
    id: 'p-1',
    name: 'Jane Doe',
    firstName: 'Jane',
    lastName: 'Doe',
    title: 'Engineer',
    company: 'Acme',
    credentials: 'PE',
    tagline: 'Building things',
    email: 'jane@acme.com',
    phone: '(555) 123-4567',
    website: 'acme.com',
    address: { line1: '123 Main', city: 'Springfield', state: 'IL', zip: '62701' },
    social: { linkedin: 'janedoe', github: 'jdoe' },
    portrait: 'data:image/png;base64,abc',
    logo: 'data:image/png;base64,xyz',
  };

  it('personToCardData extracts all person fields', () => {
    const data = personToCardData(mockPerson);
    expect(data.firstName).toBe('Jane');
    expect(data.lastName).toBe('Doe');
    expect(data.title).toBe('Engineer');
    expect(data.company).toBe('Acme');
    expect(data.credentials).toBe('PE');
    expect(data.email).toBe('jane@acme.com');
    expect(data.phone).toBe('(555) 123-4567');
    expect(data.portrait).toBe('data:image/png;base64,abc');
    expect(data.logo).toBe('data:image/png;base64,xyz');
    expect(data.social?.linkedin).toBe('janedoe');
  });

  it('cardDataToPerson converts card back to person', () => {
    const cardData = personToCardData(mockPerson);
    const person = cardDataToPerson(cardData, 'p-2', 'Custom Name');
    expect(person.id).toBe('p-2');
    expect(person.name).toBe('Custom Name');
    expect(person.firstName).toBe('Jane');
    expect(person.lastName).toBe('Doe');
    expect(person.email).toBe('jane@acme.com');
  });

  it('cardDataToPerson auto-generates id and name', () => {
    const cardData = createDefaultCardData();
    cardData.firstName = 'Bob';
    cardData.lastName = 'Smith';
    const person = cardDataToPerson(cardData);
    expect(person.id).toBeTruthy();
    expect(person.name).toBe('Bob Smith');
  });

  it('cardDataToPerson falls back to Unnamed', () => {
    const person = cardDataToPerson(createDefaultCardData());
    expect(person.name).toBe('Unnamed');
  });
});

describe('Default Layout / Palette IDs', () => {
  it('getDefaultFrontLayoutId returns a non-empty string', () => {
    const id = getDefaultFrontLayoutId();
    expect(id).toBeTruthy();
    expect(typeof id).toBe('string');
  });

  it('getDefaultPaletteId returns a non-empty string', () => {
    const id = getDefaultPaletteId();
    expect(id).toBeTruthy();
    expect(typeof id).toBe('string');
  });
});
