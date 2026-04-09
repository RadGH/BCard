import { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getAllFrontLayouts, getAllBackLayouts, resolveColorPalette } from '../templates/registry';
import ShowcaseGrid from '../components/showcase/ShowcaseGrid';
import { useCardDataContext } from '../context/CardDataContext';
import { getBrandingPref, setBrandingPref } from '../lib/branding-prefs';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  opacity: number;
}

function initNodes(count: number, width: number, height: number): Node[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    r: 3 + Math.random() * 2,
    opacity: 0.7 + Math.random() * 0.2,
  }));
}

function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      if (nodesRef.current.length === 0) {
        nodesRef.current = initNodes(50, canvas.width, canvas.height);
      }
    };

    resize();
    nodesRef.current = initNodes(50, canvas.width, canvas.height);

    const MAX_DIST = 150;

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      for (const node of nodesRef.current) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < node.r) { node.x = node.r; node.vx = Math.abs(node.vx); }
        if (node.x > w - node.r) { node.x = w - node.r; node.vx = -Math.abs(node.vx); }
        if (node.y < node.r) { node.y = node.r; node.vy = Math.abs(node.vy); }
        if (node.y > h - node.r) { node.y = h - node.r; node.vy = -Math.abs(node.vy); }
      }

      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const a = nodesRef.current[i];
          const b = nodesRef.current[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.3;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      for (const node of nodesRef.current) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(129, 140, 248, ${node.opacity})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const handleResize = () => resize();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}

export default function HomePage() {
  const frontCount = getAllFrontLayouts().length;
  const backCount = getAllBackLayouts().length;
  const { data, design } = useCardDataContext();

  const hasCardData = Boolean(
    data.firstName?.trim() || data.lastName?.trim() || data.company?.trim() || data.email?.trim()
  );

  const [useBranding, setUseBranding] = useState(() => getBrandingPref());

  const handleToggleBranding = (v: boolean) => {
    setUseBranding(v);
    setBrandingPref(v);
  };

  const brandingPalette = useMemo(
    () => (useBranding && hasCardData) ? resolveColorPalette(design.paletteId, design.customColors) : undefined,
    [useBranding, hasCardData, design.paletteId, design.customColors]
  );

  return (
    <div>
      {/* Hero section */}
      <div className="relative bg-slate-900 overflow-hidden" style={{ height: '70vh', minHeight: '480px' }}>
        <NetworkCanvas />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Create Your Professional<br className="hidden sm:block" /> Business Card
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl">
            {frontCount} templates &middot; Fully customizable &middot; Print-ready exports
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/editor"
              className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors text-base"
            >
              Start Designing
            </Link>
            <a
              href="#templates"
              className="px-8 py-3 bg-white text-slate-900 font-semibold rounded-lg hover:bg-slate-100 transition-colors text-base"
            >
              Browse Templates
            </a>
          </div>
        </div>
      </div>

      {/* Template grid */}
      <div id="templates" className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-slate-500">
            {frontCount} front layouts, {backCount} back layouts
          </p>
          {hasCardData && (
            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={useBranding}
                onChange={e => handleToggleBranding(e.target.checked)}
                className="rounded"
              />
              Use my branding
            </label>
          )}
        </div>

        <ShowcaseGrid
          brandingData={useBranding && hasCardData ? data : undefined}
          brandingPalette={brandingPalette}
          brandingTitleFont={useBranding && hasCardData ? design.titleFont : undefined}
          brandingBodyFont={useBranding && hasCardData ? design.bodyFont : undefined}
        />
      </div>
    </div>
  );
}
