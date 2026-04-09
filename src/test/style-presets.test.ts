import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useStylePresets } from '../hooks/useStylePresets';

beforeEach(() => {
  localStorage.clear();
});

describe('Style Presets Hook', () => {
  it('starts with empty presets', () => {
    const { result } = renderHook(() => useStylePresets());
    expect(result.current.presets).toEqual([]);
  });

  it('can add a palette preset', () => {
    const { result } = renderHook(() => useStylePresets());
    act(() => {
      result.current.addPreset('My Palette', {
        id: 'custom-1',
        name: 'Custom',
        primary: '#ff0000',
        secondary: '#cc0000',
        background: '#ffffff',
        text: '#000000',
        textMuted: '#666666',
        accent: '#00ff00',
      });
    });
    expect(result.current.presets).toHaveLength(1);
    expect(result.current.presets[0].name).toBe('My Palette');
    expect(result.current.presets[0].palette.primary).toBe('#ff0000');
  });

  it('persists presets to localStorage', () => {
    const { result } = renderHook(() => useStylePresets());
    act(() => {
      result.current.addPreset('Saved', {
        id: 'saved-1',
        name: 'Saved',
        primary: '#123456',
        secondary: '#234567',
        background: '#ffffff',
        text: '#000000',
        textMuted: '#888888',
        accent: '#345678',
      });
    });

    const stored = localStorage.getItem('bcard-palette-presets');
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored!);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].name).toBe('Saved');
  });

  it('can delete a preset', () => {
    const { result } = renderHook(() => useStylePresets());
    act(() => {
      result.current.addPreset('ToDelete', {
        id: 'del-1',
        name: 'ToDelete',
        primary: '#000',
        secondary: '#111',
        background: '#fff',
        text: '#000',
        textMuted: '#999',
        accent: '#000',
      });
    });
    const id = result.current.presets[0].id;
    act(() => {
      result.current.deletePreset(id);
    });
    expect(result.current.presets).toHaveLength(0);
  });
});
