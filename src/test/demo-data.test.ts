import { describe, it, expect } from 'vitest';
import { generateDemoPerson } from '../lib/demo-data';

describe('Demo Data Generation', () => {
  it('generates a person with all required fields', () => {
    const person = generateDemoPerson();
    expect(person.id).toBeTruthy();
    expect(person.name).toBeTruthy();
    expect(person.firstName).toBeTruthy();
    expect(person.lastName).toBeTruthy();
    expect(person.title).toBeTruthy();
    expect(person.company).toBeTruthy();
    expect(person.email).toContain('@');
    expect(person.phone).toMatch(/^\(\d{3}\) \d{3}-\d{4}$/);
    expect(person.website).toBeTruthy();
  });

  it('generates a placeholder portrait as data URI', () => {
    const person = generateDemoPerson();
    expect(person.portrait).toBeDefined();
    expect(person.portrait).toMatch(/^data:image\/svg\+xml,/);
  });

  it('generates a placeholder logo as data URI', () => {
    const person = generateDemoPerson();
    expect(person.logo).toBeDefined();
    expect(person.logo).toMatch(/^data:image\/svg\+xml,/);
  });

  it('generates unique people on each call', () => {
    const people = Array.from({ length: 10 }, () => generateDemoPerson());
    const ids = new Set(people.map(p => p.id));
    expect(ids.size).toBe(10);
  });

  it('generates valid email from name and company', () => {
    const person = generateDemoPerson();
    const emailLocal = person.email.split('@')[0];
    expect(emailLocal).toContain('.');
    expect(person.email).not.toContain(' ');
  });

  it('includes social links', () => {
    // Generate several to account for randomness
    const people = Array.from({ length: 20 }, () => generateDemoPerson());
    const withLinkedin = people.filter(p => p.social?.linkedin);
    // With 70% chance, at least some should have it
    expect(withLinkedin.length).toBeGreaterThan(0);
  });
});
