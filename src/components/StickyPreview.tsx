import { useMemo, useEffect } from 'react';
import type { BusinessCardData, CardDesign } from '../types/card';
import {
  renderFront,
  getFrontLayout,
  resolveColorPalette,
} from '../templates/registry';
import { useStickyPreview } from '../hooks/useStickyPreview';

// Card physical dimensions ratio: 95.25 wide x 57.15 tall
const CARD_ASPECT = 95.25 / 57.15; // ~1.666
const PREVIEW_WIDTH = 200;
const PREVIEW_HEIGHT = Math.round(PREVIEW_WIDTH / CARD_ASPECT); // ~120px

interface Props {
  data: BusinessCardData;
  design: CardDesign;
  hasSavedVersion: boolean;
  onSave: () => void;
  onUndo: () => void;
  onEdit: () => void;
  onPreview: () => void;
}

export default function StickyPreview({
  data,
  design,
  hasSavedVersion,
  onSave,
  onUndo,
  onEdit,
  onPreview,
}: Props) {
  const { isCollapsed, setCollapsed } = useStickyPreview();

  useEffect(() => {
    if (window.innerWidth < 640) {
      setCollapsed(true);
    }
  }, []);

  const frontLayout = useMemo(
    () => getFrontLayout(design.frontLayoutId),
    [design.frontLayoutId],
  );
  const palette = useMemo(
    () => resolveColorPalette(design.paletteId, design.customColors),
    [design.paletteId, design.customColors],
  );

  const cardSvg = useMemo(() => {
    if (!frontLayout) return null;
    const bgOptions = {
      backgroundId: design.backgroundId,
      backgroundFlipH: design.backgroundFlipH,
      backgroundFlipV: design.backgroundFlipV,
      useTextLogo: data.useTextLogo,
      logoColorOverride: design.logoColorOverride,
      iconStyle: design.iconStyle,
    };
    return renderFront(
      data,
      frontLayout,
      palette,
      design.titleFont,
      design.bodyFont,
      bgOptions,
    );
  }, [data, design, frontLayout, palette]);

  const handleEdit = () => {
    onEdit();
  };

  if (isCollapsed) {
    return (
      <div className="fixed bottom-4 right-4 z-[60] supports-[bottom:env(safe-area-inset-bottom)]:[bottom:max(1rem,env(safe-area-inset-bottom))]">
        {/* A01: Collapse button with aria-label */}
        <button
          onClick={() => setCollapsed(false)}
          aria-label="Show card preview"
          title="Show card preview"
          className="flex items-center gap-1.5 bg-white border border-gray-200 shadow-lg rounded-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 10h18M3 6h18M3 14h18M3 18h18"
            />
          </svg>
          <span>Card</span>
          <svg
            className="w-3.5 h-3.5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div
      className="fixed bottom-4 right-4 z-[60] supports-[bottom:env(safe-area-inset-bottom)]:[bottom:max(1rem,env(safe-area-inset-bottom))] bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden"
      style={{ width: PREVIEW_WIDTH + 16 }}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-gray-50">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Card Preview
        </span>
        {/* A01: Minimize button with aria-label */}
        <button
          onClick={() => setCollapsed(true)}
          aria-label="Minimize preview"
          title="Minimize preview"
          className="p-0.5 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Card mini preview */}
      <div className="px-2 pt-2 pb-1">
        <div
          className="rounded overflow-hidden shadow-sm border border-gray-100"
          style={{ width: PREVIEW_WIDTH, height: PREVIEW_HEIGHT }}
        >
          {cardSvg}
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-2 pb-2 pt-1 grid grid-cols-4 gap-1">
        {/* A01: Preview button with aria-label */}
        <button
          onClick={onPreview}
          aria-label="Preview in 3D"
          title="Preview in 3D"
          className="flex flex-col items-center gap-0.5 px-1 py-1.5 rounded-lg text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors group"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
            />
          </svg>
          <span className="text-[10px] font-medium leading-none">Preview</span>
        </button>

        {/* A01: Edit button with aria-label */}
        <button
          onClick={handleEdit}
          aria-label="Go to editor"
          title="Go to editor"
          className="flex flex-col items-center gap-0.5 px-1 py-1.5 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          <span className="text-[10px] font-medium leading-none">Edit</span>
        </button>

        {/* A01: Save button with aria-label */}
        <button
          onClick={onSave}
          aria-label="Checkpoint"
          title="Checkpoint"
          className="flex flex-col items-center gap-0.5 px-1 py-1.5 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
            />
          </svg>
          <span className="text-[10px] font-medium leading-none">Checkpoint</span>
        </button>

        {/* A01: Undo button with aria-label */}
        <button
          onClick={onUndo}
          disabled={!hasSavedVersion}
          aria-label={hasSavedVersion ? 'Revert to last saved version' : 'No saved version to revert to'}
          title={hasSavedVersion ? 'Revert to last saved version' : 'No saved version to revert to'}
          className="flex flex-col items-center gap-0.5 px-1 py-1.5 rounded-lg text-gray-600 hover:bg-amber-50 hover:text-amber-700 transition-colors disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-600"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
            />
          </svg>
          <span className="text-[10px] font-medium leading-none">Undo</span>
        </button>
      </div>
    </div>
  );
}
