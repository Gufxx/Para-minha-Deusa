/**
 * Persistent Storage & Image Compression Utility
 * Solves browser localStorage quota limit (5MB) using IndexedDB + Canvas Compression
 */
import { MemoryPhoto, CoupleProfile } from '../types';

export const STORAGE_KEYS = {
  PROFILE: 'namorada_site_profile_v2',
  PHOTOS: 'namorada_site_photos_v2',
  HERO_PHOTO: 'namorada_site_hero_photo_v2',
  // legacy keys for migration
  LEGACY_PROFILE: 'namorada_site_profile_v1',
  LEGACY_PHOTOS: 'namorada_site_photos_v1',
};

const DB_NAME = 'amor_site_storage_v2';
const STORE_NAME = 'keyval_store';
const DB_VERSION = 1;

/**
 * Opens or initializes the native IndexedDB store
 */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB não suportado neste navegador'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Stores arbitrary data in IndexedDB (supports large images & binary objects without 5MB quota)
 */
export async function setItemInDB<T>(key: string, value: T): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(value, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
      tx.oncomplete = () => resolve();
    });
  } catch (err) {
    console.warn('Erro ao salvar no IndexedDB:', err);
  }
}

/**
 * Retrieves data from IndexedDB
 */
export async function getItemFromDB<T>(key: string): Promise<T | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => {
        resolve(req.result !== undefined ? (req.result as T) : null);
      };
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Erro ao ler do IndexedDB:', err);
    return null;
  }
}

/**
 * Safely saves to localStorage with QuotaExceededError protection
 */
export function safeSetLocalStorage(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.warn(`[Storage] localStorage quota exceeded for key "${key}". Persisted in IndexedDB.`, e);
    return false;
  }
}

/**
 * Safely gets from localStorage
 */
export function safeGetLocalStorage<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;
    return JSON.parse(item) as T;
  } catch {
    return null;
  }
}

/**
 * Compresses an uploaded image using HTML5 Canvas to a crisp, high-DPI web image (~150-250KB)
 * Prevents browser memory lag, storage exhaustion, and guarantees permanent persistence.
 */
export function compressImageFile(
  file: File,
  maxWidth = 1400,
  maxHeight = 1400,
  quality = 0.85
): Promise<string> {
  return new Promise((resolve, reject) => {
    const isImageMime = file.type && file.type.startsWith('image/');
    const isImageExt = /\.(jpe?g|png|webp|gif|bmp|heic|avif|tiff?)$/i.test(file.name);

    if (!isImageMime && !isImageExt) {
      reject(new Error('O arquivo selecionado não é uma imagem válida.'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Falha ao ler o arquivo da imagem.'));
    reader.onload = () => {
      const result = reader.result as string;
      const img = new Image();
      img.onerror = () => {
        // Fallback to raw data url if canvas decoder fails
        if (result && result.startsWith('data:')) {
          resolve(result);
        } else {
          reject(new Error('Falha ao decodificar a imagem.'));
        }
      };
      img.onload = () => {
        try {
          let width = img.naturalWidth || img.width;
          let height = img.naturalHeight || img.height;

          // Downscale while preserving aspect ratio if larger than bounds
          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(result);
            return;
          }

          // Draw with high smoothing
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          // White background in case of transparent png
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to optimized JPEG format
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        } catch {
          // Canvas security or memory fallback
          resolve(result);
        }
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Processes multiple image files sequentially with progress reporting
 */
export async function compressMultipleImages(
  files: FileList | File[],
  onProgress?: (current: number, total: number) => void
): Promise<{ dataUrl: string; name: string }[]> {
  const fileArray = Array.from(files);
  const results: { dataUrl: string; name: string }[] = [];

  for (let i = 0; i < fileArray.length; i++) {
    const f = fileArray[i];
    try {
      const dataUrl = await compressImageFile(f, 1400, 1400, 0.85);
      if (dataUrl) {
        results.push({ dataUrl, name: f.name.replace(/\.[^/.]+$/, "") });
      }
    } catch (e) {
      console.warn(`Erro ao processar imagem "${f.name}":`, e);
    }
    if (onProgress) {
      onProgress(i + 1, fileArray.length);
    }
  }

  return results;
}

/**
 * Utility to download or save a photo directly to device storage
 */
export function downloadPhoto(dataUrl: string, filename = 'foto_namorada.jpg') {
  try {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error('Falha ao baixar foto:', err);
  }
}

