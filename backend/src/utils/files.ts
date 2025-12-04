import path from 'path';
import fs from 'fs/promises';
import type { Request } from 'express';
import { uploadsRoot } from '../middleware/upload';

export const buildImageUrl = (req: Request, storedPath?: string | null) => {
  if (!storedPath) return undefined;
  if (/^https?:\/\//i.test(storedPath)) {
    return storedPath;
  }
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  return `${baseUrl}/uploads/${storedPath}`;
};

export const deleteStoredFile = async (storedPath?: string | null) => {
  if (!storedPath) return;
  if (/^https?:\/\//i.test(storedPath)) {
    return;
  }
  const cleanPath = storedPath.replace(/^\/+/, '');
  const absolutePath = path.join(uploadsRoot, cleanPath);
  try {
    await fs.unlink(absolutePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      console.warn('Failed to delete file', absolutePath, error);
    }
  }
};