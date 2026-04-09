import { useState, useCallback, useEffect } from 'react';
import { RefreshCw, Upload } from 'lucide-react';
import type { QRCodeData } from '../../types/card';

interface Props {
  value?: QRCodeData;
  onChange: (qr: QRCodeData | undefined) => void;
}

export default function QRCodeField({ value, onChange }: Props) {
  const [inputType, setInputType] = useState<'url' | 'image'>(value?.type ?? 'url');
  const [url, setUrl] = useState(value?.url ?? '');
  const [fgColor, setFgColor] = useState(value?.fgColor ?? '#000000');
  const [bgColor, setBgColor] = useState(value?.bgColor ?? '#ffffff');
  const [generating, setGenerating] = useState(false);

  // Sync local state when external value changes identity (e.g. loading a different saved card)
  useEffect(() => {
    setInputType(value?.type ?? 'url');
    setUrl(value?.url ?? '');
    setFgColor(value?.fgColor ?? '#000000');
    setBgColor(value?.bgColor ?? '#ffffff');
  }, [value]);

  const handleInvert = () => {
    const newFg = bgColor;
    const newBg = fgColor;
    setFgColor(newFg);
    setBgColor(newBg);
    if (value?.type === 'url' && value.imageDataUrl) {
      onChange({ ...value, fgColor: newFg, bgColor: newBg, imageDataUrl: undefined });
    }
  };

  const handleGenerate = useCallback(async () => {
    if (!url.trim()) return;
    setGenerating(true);
    try {
      const fg = fgColor.replace('#', '');
      const bg = bgColor.replace('#', '');
      const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}&color=${fg}&bgcolor=${bg}&format=png`;
      // Fetch and embed as data URL
      const res = await fetch(apiUrl);
      const blob = await res.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ type: 'url', url, fgColor, bgColor, imageDataUrl: reader.result as string });
        setGenerating(false);
      };
      reader.readAsDataURL(blob);
    } catch {
      // Fallback: store the URL directly (will be fetched at render time)
      onChange({ type: 'url', url, fgColor, bgColor });
      setGenerating(false);
    }
  }, [url, fgColor, bgColor, onChange]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange({ type: 'image', imageDataUrl: reader.result as string, fgColor, bgColor });
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    onChange(undefined);
    setUrl('');
  };

  const previewSrc = value?.imageDataUrl ?? (value?.type === 'url' && value.url
    ? `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(value.url)}&color=${fgColor.replace('#','')}&bgcolor=${bgColor.replace('#','')}`
    : undefined);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-slate-700">QR Code</h4>
        {value && (
          <button onClick={handleRemove} className="text-xs text-red-500 hover:text-red-700 transition-colors">
            Remove
          </button>
        )}
      </div>

      {/* Type toggle */}
      <div className="flex rounded-lg border border-slate-200 overflow-hidden">
        {(['url', 'image'] as const).map(t => (
          <button
            key={t}
            onClick={() => setInputType(t)}
            className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
              inputType === t ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            {t === 'url' ? 'From URL' : 'Upload Image'}
          </button>
        ))}
      </div>

      {inputType === 'url' && (
        <div className="space-y-3">
          <input
            type="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://yourwebsite.com"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Colors */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2">
              <input type="color" value={fgColor} onChange={e => setFgColor(e.target.value)}
                className="w-8 h-8 rounded border border-slate-300 cursor-pointer" />
              <span className="text-xs text-slate-500">Foreground</span>
            </label>
            <button onClick={handleInvert} className="px-2 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded transition-colors" title="Swap colors">
              <RefreshCw className="w-4 h-4" />
            </button>
            <label className="flex items-center gap-2">
              <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)}
                className="w-8 h-8 rounded border border-slate-300 cursor-pointer" />
              <span className="text-xs text-slate-500">Background</span>
            </label>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!url.trim() || generating}
            className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {generating ? 'Generating...' : 'Generate QR Code'}
          </button>
        </div>
      )}

      {inputType === 'image' && (
        <div>
          <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
            <Upload className="w-4 h-4 text-slate-400 mb-1" />
            <span className="text-xs text-slate-500">Click to upload QR image</span>
            <input type="file" accept="image/*,.svg" className="hidden" onChange={handleFileUpload} />
          </label>
        </div>
      )}

      {/* Preview */}
      {previewSrc && (
        <div className="flex justify-center">
          <div className="border border-slate-200 rounded-lg p-2 bg-white">
            <img src={previewSrc} alt="QR Code preview" className="w-24 h-24 object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
