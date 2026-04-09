const MAX_SIZE = 800;

// Returns true for formats that support an alpha channel and should be
// preserved as PNG so transparency is not lost when re-encoding.
function hasPotentialTransparency(dataUrl: string): boolean {
  // Data URLs begin with "data:<mime-type>;base64,…"
  const mime = dataUrl.split(';')[0].slice(5); // e.g. "image/png"
  return mime === 'image/png' || mime === 'image/webp' || mime === 'image/gif';
}

export function resizeImage(dataUrl: string, maxSize = MAX_SIZE): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      if (width <= maxSize && height <= maxSize) {
        resolve(dataUrl);
        return;
      }
      const ratio = Math.min(maxSize / width, maxSize / height);
      width = Math.round(width * ratio);
      height = Math.round(height * ratio);

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d')!;
      // Do NOT fill the canvas before drawing — the default is fully
      // transparent, which preserves PNG/WebP alpha channels.
      ctx.drawImage(img, 0, 0, width, height);

      // Use PNG for formats that may carry transparency so the alpha
      // channel is not flattened to black (JPEG has no alpha support).
      if (hasPotentialTransparency(dataUrl)) {
        resolve(canvas.toDataURL('image/png'));
      } else {
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      }
    };
    img.src = dataUrl;
  });
}

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
