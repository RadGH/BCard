import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import type { BusinessCardData, CardDesign } from '../../types/card';
import { renderFront, renderBack, getFrontLayout, getBackLayout, resolveColorPalette } from '../../templates/registry';

interface Props {
  data: BusinessCardData;
  design: CardDesign;
  onClose: () => void;
}

export default function Card3DView({ data, design, onClose }: Props) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [autoSpin, setAutoSpin] = useState(true);
  const lastPos = useRef({ x: 0, y: 0 });
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const frontLayout = useMemo(() => getFrontLayout(design.frontLayoutId), [design.frontLayoutId]);
  const backLayout = useMemo(() => getBackLayout(design.backLayoutId), [design.backLayoutId]);
  const palette = useMemo(
    () => resolveColorPalette(design.paletteId, design.customColors),
    [design.paletteId, design.customColors]
  );

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true);
    setAutoSpin(false);
    lastPos.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    setRotation(prev => ({
      x: Math.max(-30, Math.min(30, prev.x - dy * 0.5)),
      y: prev.y + dx * 0.5,
    }));
    lastPos.current = { x: e.clientX, y: e.clientY };
  }, [isDragging]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // A02: Focus trap - auto-focus close button on modal open
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  // A02: Escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!frontLayout || !backLayout) return null;

  const showBack = Math.abs(rotation.y % 360) > 90 && Math.abs(rotation.y % 360) < 270;

  const appliesTo = design.backgroundAppliesTo ?? 'both';

  const baseBgOptions = {
    backgroundId: design.backgroundId,
    backgroundFlipH: design.backgroundFlipH,
    backgroundFlipV: design.backgroundFlipV,
    logoColorOverride: design.logoColorOverride,
    iconStyle: design.iconStyle,
    useTextLogo: data.useTextLogo ?? true,
  };

  const frontBgOptions = {
    ...(appliesTo === 'back' ? { ...baseBgOptions, backgroundId: undefined } : baseBgOptions),
    fontSizes: design.frontFontSizes,
  };

  const backBgOptions = {
    ...(appliesTo === 'front' ? { ...baseBgOptions, backgroundId: undefined } : baseBgOptions),
    fontSizes: design.backFontSizes,
  };

  const frontSvg = renderFront(data, frontLayout, palette, design.titleFont, design.bodyFont, frontBgOptions);
  const backSvg = renderBack(data, backLayout, palette, design.titleFont, design.bodyFont, backBgOptions);

  return (
    /* A02: Modal with role="dialog", aria-modal="true", and aria-label */
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="3D Card Preview"
    >
      <div className="relative max-w-lg w-full" onClick={e => e.stopPropagation()}>
        {/* A02: Close button with aria-label and autoFocus via ref */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close 3D preview"
          className="absolute -top-10 right-0 text-white/80 hover:text-white text-sm font-medium"
        >
          Close
        </button>

        <div
          className="w-full"
          style={{ perspective: '800px', userSelect: 'none' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <div
            className="w-full transition-transform cursor-grab active:cursor-grabbing"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              animation: autoSpin ? 'spin3d 8s linear infinite' : 'none',
            }}
          >
            {/* Front */}
            <div
              className="w-full rounded-xl overflow-hidden shadow-2xl"
              style={{
                aspectRatio: '95.25 / 57.15',
                backfaceVisibility: 'hidden',
                position: showBack ? 'absolute' : 'relative',
                inset: 0,
              }}
            >
              {frontSvg}
            </div>

            {/* Back */}
            <div
              className="w-full rounded-xl overflow-hidden shadow-2xl"
              style={{
                aspectRatio: '95.25 / 57.15',
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                position: showBack ? 'relative' : 'absolute',
                inset: 0,
              }}
            >
              {backSvg}
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-3">
          <button
            onClick={() => { setAutoSpin(!autoSpin); if (!autoSpin) setRotation({ x: 0, y: 0 }); }}
            className="px-4 py-2 text-sm bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            {autoSpin ? 'Stop Spin' : 'Auto Spin'}
          </button>
          <button
            onClick={() => setRotation({ x: 0, y: 0 })}
            className="px-4 py-2 text-sm bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            Reset View
          </button>
        </div>

        <p className="text-center text-white/50 text-xs mt-2">Drag to rotate</p>

        <style>{`
          @keyframes spin3d {
            from { transform: rotateX(5deg) rotateY(0deg); }
            to { transform: rotateX(5deg) rotateY(360deg); }
          }
          @media (prefers-reduced-motion: reduce) {
            @keyframes spin3d {
              from, to { transform: rotateX(5deg) rotateY(30deg); }
            }
          }
        `}</style>
      </div>
    </div>
  );
}
