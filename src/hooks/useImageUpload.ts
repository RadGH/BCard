import { useCallback } from 'react';
import { readFileAsDataUrl, resizeImage } from '../lib/image-utils';
import { getDB } from '../lib/db';
import { uuid as _uuid } from '../lib/uuid';

export function useImageUpload() {
  const uploadImage = useCallback(async (file: File): Promise<string> => {
    const raw = await readFileAsDataUrl(file);
    const resized = await resizeImage(raw);

    const id = _uuid();
    const db = await getDB();
    await db.put('images', {
      id,
      name: file.name,
      dataUrl: resized,
      width: 0,
      height: 0,
      createdAt: Date.now(),
    });

    return resized;
  }, []);

  return { uploadImage };
}
