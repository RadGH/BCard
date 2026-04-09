import { describe, it, expect } from 'vitest';
import {
  getAllFrontLayouts,
  getFrontLayout,
  getAllBackLayouts,
  getBackLayout,
  getAllPalettes,
  getPaletteById,
  getDefaultFrontLayoutId,
  getDefaultBackLayoutId,
  getDefaultPaletteId,
} from '../templates/registry';
import { decorationSets } from '../templates/decorations/index';
import { frontLayouts } from '../templates/layouts/index';
import { backLayouts } from '../templates/back-layouts/index';
import { palettes } from '../templates/palettes/index';

describe('Front Layouts', () => {
  it('has 100 front layouts', () => {
    expect(getAllFrontLayouts().length).toBe(100);
  });

  it('all front layouts have unique IDs', () => {
    const all = getAllFrontLayouts();
    const ids = new Set(all.map(l => l.id));
    expect(ids.size).toBe(all.length);
  });

  it('all front layouts have required fields', () => {
    for (const l of getAllFrontLayouts()) {
      expect(l.id).toBeTruthy();
      expect(l.name).toBeTruthy();
      expect(l.regions.length).toBeGreaterThan(0);
      expect(l.defaultPaletteId).toBeTruthy();
      expect(typeof l.supports.portrait).toBe('boolean');
      expect(typeof l.supports.logo).toBe('boolean');
      expect(typeof l.supports.qrCode).toBe('boolean');
    }
  });

  it('getFrontLayout returns layout by ID', () => {
    const all = getAllFrontLayouts();
    const first = all[0];
    const found = getFrontLayout(first.id);
    expect(found).toBeDefined();
    expect(found!.id).toBe(first.id);
  });

  it('getFrontLayout returns undefined for bad ID', () => {
    expect(getFrontLayout('nonexistent-id')).toBeUndefined();
  });

  it('getDefaultFrontLayoutId returns a valid layout ID', () => {
    const id = getDefaultFrontLayoutId();
    expect(id).toBeTruthy();
    expect(getFrontLayout(id)).toBeDefined();
  });

  it('portrait layouts all have portrait support', () => {
    const portraitLayouts = getAllFrontLayouts().filter(l => l.id.startsWith('fl-c') || l.id.startsWith('fl-d'));
    for (const l of portraitLayouts) {
      expect(l.supports.portrait).toBe(true);
    }
  });
});

describe('Back Layouts', () => {
  it('has 20 back layouts', () => {
    expect(getAllBackLayouts().length).toBe(20);
  });

  it('all back layouts have unique IDs', () => {
    const all = getAllBackLayouts();
    const ids = new Set(all.map(l => l.id));
    expect(ids.size).toBe(all.length);
  });

  it('all back layouts have required fields', () => {
    for (const l of getAllBackLayouts()) {
      expect(l.id).toBeTruthy();
      expect(l.name).toBeTruthy();
      expect(l.defaultPaletteId).toBeTruthy();
    }
  });

  it('getBackLayout returns layout by ID', () => {
    const all = getAllBackLayouts();
    const first = all[0];
    const found = getBackLayout(first.id);
    expect(found).toBeDefined();
    expect(found!.id).toBe(first.id);
  });

  it('getDefaultBackLayoutId returns a valid layout ID', () => {
    const id = getDefaultBackLayoutId();
    expect(id).toBeTruthy();
    expect(getBackLayout(id)).toBeDefined();
  });
});

describe('Color Palettes', () => {
  it('has at least 28 palettes', () => {
    expect(getAllPalettes().length).toBeGreaterThanOrEqual(28);
  });

  it('all palettes have required color fields', () => {
    for (const p of getAllPalettes()) {
      expect(p.id).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.primary).toMatch(/^#[0-9a-f]{6}$/i);
      expect(p.background).toMatch(/^#[0-9a-f]{6}$/i);
      expect(p.text).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });

  it('getPaletteById returns palette', () => {
    const all = getAllPalettes();
    const first = all[0];
    const found = getPaletteById(first.id);
    expect(found).toBeDefined();
    expect(found!.id).toBe(first.id);
  });

  it('getDefaultPaletteId returns a valid palette ID', () => {
    const id = getDefaultPaletteId();
    expect(id).toBeTruthy();
    expect(getPaletteById(id)).toBeDefined();
  });
});

describe('Decoration Sets', () => {
  it('has decoration sets', () => {
    expect(decorationSets.length).toBeGreaterThan(0);
  });

  it('all decoration sets have required fields', () => {
    for (const d of decorationSets) {
      expect(d.id).toBeTruthy();
      expect(d.name).toBeTruthy();
      expect(Array.isArray(d.elements)).toBe(true);
    }
  });
});

describe('Building Block Exports', () => {
  it('frontLayouts exports array of 100', () => {
    expect(frontLayouts.length).toBe(100);
  });

  it('backLayouts exports array of 20', () => {
    expect(backLayouts.length).toBe(20);
  });

  it('palettes exports array', () => {
    expect(palettes.length).toBeGreaterThanOrEqual(28);
  });
});
