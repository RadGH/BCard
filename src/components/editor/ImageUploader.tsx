import { useRef } from 'react';
import { useImageUpload } from '../../hooks/useImageUpload';
import { readFileAsDataUrl } from '../../lib/image-utils';

interface Props {
  label: string;
  currentImage?: string;
  onImageChange: (dataUrl: string | undefined) => void;
}

function isSvgFile(file: File): boolean {
  return file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg');
}

export default function ImageUploader({ label, currentImage, onImageChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { uploadImage } = useImageUpload();

  const handleFile = async (file: File) => {
    if (isSvgFile(file)) {
      // Read SVG directly as a data URL — skip canvas resize to preserve vector data
      const dataUrl = await readFileAsDataUrl(file);
      onImageChange(dataUrl);
      return;
    }
    const dataUrl = await uploadImage(file);
    onImageChange(dataUrl);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type.startsWith('image/') || isSvgFile(file))) handleFile(file);
  };

  return (
    <div className="space-y-2">
      <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</span>

      {currentImage ? (
        <div className="relative">
          <img
            src={currentImage}
            alt={label}
            className="w-full max-h-32 object-contain rounded-lg border border-slate-200 bg-slate-50"
          />
          <button
            onClick={() => onImageChange(undefined)}
            className="absolute top-2 right-2 bg-red-500 text-white w-7 h-7 rounded-full text-sm font-bold hover:bg-red-600 flex items-center justify-center"
          >
            X
          </button>
        </div>
      ) : (
        <div
          onDragOver={e => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
        >
          <p className="text-sm text-slate-500">Tap or drag an image</p>
          <p className="text-xs text-slate-400 mt-1">JPG, PNG, SVG up to 5MB</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*,.svg"
        className="hidden"
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = '';
        }}
      />
    </div>
  );
}
