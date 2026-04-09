import { useState } from 'react';
import { ChevronUp, ChevronRight, Download, Upload, Trash2 } from 'lucide-react';
import type { BusinessCardData, CardDesign } from '../../types/card';
import { generateSvgString, downloadBlob, svgToPng, printSvg } from '../../lib/svg-export';
import { downloadPdf } from '../../lib/pdf-export';
import Card3DView from './Card3DView';
import PreviewGallery from './PreviewGallery';

interface Props {
  data: BusinessCardData;
  design: CardDesign;
  showPrintMargins?: boolean;
  onTogglePrintMargins?: (v: boolean) => void;
}

export default function ExportPanel({ data, design, showPrintMargins = false, onTogglePrintMargins }: Props) {
  const [exporting, setExporting] = useState<string | null>(null);
  const [pngScale, setPngScale] = useState(2);
  const [show3D, setShow3D] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [eraseConfirm, setEraseConfirm] = useState(false);

  const handleSvgExport = async (side: 'front' | 'back') => {
    setExporting(`svg-${side}`);
    try {
      const svg = await generateSvgString(data, design, side);
      downloadBlob(svg, `business-card-${side}.svg`);
    } finally { setExporting(null); }
  };

  const handlePdfExport = async () => {
    setExporting('pdf');
    try {
      const front = await generateSvgString(data, design, 'front');
      const back = await generateSvgString(data, design, 'back');
      await downloadPdf(front, back);
    } finally { setExporting(null); }
  };

  const handlePngExport = async (side: 'front' | 'back') => {
    setExporting(`png-${side}`);
    try {
      const svg = await generateSvgString(data, design, side);
      const blob = await svgToPng(svg, pngScale);
      downloadBlob(blob, `business-card-${side}-${pngScale}x.png`, 'image/png');
    } finally { setExporting(null); }
  };

  const handlePrint = async () => {
    setExporting('print');
    try {
      const front = await generateSvgString(data, design, 'front');
      const back = await generateSvgString(data, design, 'back');
      printSvg(front, back);
    } finally { setExporting(null); }
  };

  const handleExportAll = () => {
    const allData = {
      savedCards: localStorage.getItem('bcard-saved-cards-v2'),
      people: localStorage.getItem('bcard-people'),
      palettes: localStorage.getItem('bcard-palette-presets'),
      fontSets: localStorage.getItem('bcard-font-sets'),
      draft: localStorage.getItem('bcard-draft-v2'),
    };
    const json = JSON.stringify(allData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'bcard-backup.json'; a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      try {
        const importedData = JSON.parse(reader.result as string);
        if (importedData.savedCards) localStorage.setItem('bcard-saved-cards-v2', importedData.savedCards);
        if (importedData.people) localStorage.setItem('bcard-people', importedData.people);
        if (importedData.palettes) localStorage.setItem('bcard-palette-presets', importedData.palettes);
        if (importedData.fontSets) localStorage.setItem('bcard-font-sets', importedData.fontSets);
        if (importedData.draft) localStorage.setItem('bcard-draft-v2', importedData.draft);
        window.location.reload();
      } catch {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  const handleEraseAll = () => setEraseConfirm(true);

  const handleConfirmErase = () => {
    ['bcard-saved-cards-v2', 'bcard-people', 'bcard-palette-presets', 'bcard-font-sets', 'bcard-draft-v2'].forEach(k => localStorage.removeItem(k));
    setEraseConfirm(false);
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      {/* Preview buttons */}
      <section>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Preview</h3>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <button
            onClick={() => setShowPreview(true)}
            className="px-4 py-3 bg-slate-700 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            Mockup Gallery
          </button>
          <button
            onClick={() => setShow3D(true)}
            className="px-4 py-3 bg-slate-700 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            3D View
          </button>
        </div>
        {onTogglePrintMargins && (
          <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={showPrintMargins}
              onChange={e => onTogglePrintMargins(e.target.checked)}
              className="rounded"
            />
            Show Print Margins
            <span className="text-xs text-slate-400">(bleed &amp; safe zone guides)</span>
          </label>
        )}
      </section>

      {/* Download SVG */}
      <section>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Download SVG</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleSvgExport('front')}
            disabled={!!exporting}
            className="px-4 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {exporting === 'svg-front' ? 'Exporting...' : 'SVG Front'}
          </button>
          <button
            onClick={() => handleSvgExport('back')}
            disabled={!!exporting}
            className="px-4 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {exporting === 'svg-back' ? 'Exporting...' : 'SVG Back'}
          </button>
        </div>
      </section>

      {/* Download PNG */}
      <section>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Download PNG</h3>
        <div className="mb-3">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Resolution</label>
          <div className="flex gap-2 mt-1">
            {[1, 2, 4].map(scale => (
              <button
                key={scale}
                onClick={() => setPngScale(scale)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                  pngScale === scale
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                }`}
              >
                {scale}x ({1050 * scale} x {600 * scale})
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handlePngExport('front')}
            disabled={!!exporting}
            className="px-4 py-3 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 disabled:opacity-50 transition-colors"
          >
            {exporting === 'png-front' ? 'Rendering...' : 'PNG Front'}
          </button>
          <button
            onClick={() => handlePngExport('back')}
            disabled={!!exporting}
            className="px-4 py-3 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 disabled:opacity-50 transition-colors"
          >
            {exporting === 'png-back' ? 'Rendering...' : 'PNG Back'}
          </button>
        </div>
      </section>

      {/* Download PDF */}
      <section>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Download PDF</h3>
        <button
          onClick={handlePdfExport}
          disabled={!!exporting}
          className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
        >
          {exporting === 'pdf' ? 'Generating PDF...' : 'PDF (Front + Back)'}
        </button>
      </section>

      {/* Print */}
      <section>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Print</h3>
        <button
          onClick={handlePrint}
          disabled={!!exporting}
          className="w-full px-4 py-3 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 disabled:opacity-50 transition-colors"
        >
          {exporting === 'print' ? 'Preparing...' : 'Print Business Card'}
        </button>
      </section>

      {/* Advanced - A03: Added aria-expanded and aria-controls */}
      <section>
        <button
          onClick={() => setShowAdvanced(v => !v)}
          aria-expanded={showAdvanced}
          aria-controls="advanced-panel"
          className="flex items-center gap-2 text-sm font-semibold text-slate-700 w-full text-left"
        >
          {showAdvanced ? <ChevronUp className="w-3 h-3 text-slate-400" /> : <ChevronRight className="w-3 h-3 text-slate-400" />}
          Advanced
        </button>
        {showAdvanced && (
          <div id="advanced-panel" className="mt-3 space-y-3">
            <button
              onClick={handleExportAll}
              className="w-full px-4 py-2.5 text-sm font-medium bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <Download className="inline w-4 h-4 mr-2" />
              Export All Settings (JSON)
            </button>
            <label className="w-full px-4 py-2.5 text-sm font-medium bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer flex items-center justify-center gap-2">
              <Upload className="inline w-4 h-4" />
              Import Settings (JSON)
              <input type="file" accept=".json" className="hidden" onChange={handleImportJson} />
            </label>
            <button
              onClick={handleEraseAll}
              className="w-full px-4 py-2.5 text-sm font-medium bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
            >
              <Trash2 className="inline w-4 h-4 mr-2" />
              Erase All Data
            </button>
            {eraseConfirm && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700 mb-2">This will permanently delete all saved cards, people, and palettes. Are you sure?</p>
                <div className="flex gap-2">
                  <button onClick={handleConfirmErase} className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">
                    Yes, Erase Everything
                  </button>
                  <button onClick={() => setEraseConfirm(false)} className="px-3 py-2 text-slate-600 rounded-lg text-sm hover:bg-slate-100">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Modals */}
      {show3D && <Card3DView data={data} design={design} onClose={() => setShow3D(false)} />}
      {showPreview && <PreviewGallery data={data} design={design} onClose={() => setShowPreview(false)} />}
    </div>
  );
}
