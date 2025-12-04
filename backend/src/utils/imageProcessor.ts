import sharp from 'sharp';
import path from 'path';
import { logger } from '../config/logger';

interface ImageOptimizationOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

export const optimizeImage = async (
  inputPath: string,
  options: ImageOptimizationOptions = {}
): Promise<void> => {
  const { maxWidth = 1200, maxHeight = 800, quality = 80 } = options;

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    await image
      .resize(maxWidth, maxHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality, progressive: true })
      .png({ quality, progressive: true })
      .webp({ quality })
      .toFile(inputPath + '.tmp');

    // Replace original with optimized
    const fs = await import('fs/promises');
    await fs.rename(inputPath + '.tmp', inputPath);

    logger.info(`Image optimized: ${path.basename(inputPath)} (${metadata.width}x${metadata.height})`);
  } catch (error) {
    logger.error('Image optimization failed:', error);
    throw error;
  }
};

export const generateThumbnail = async (
  inputPath: string,
  outputPath: string,
  width: number = 400
): Promise<void> => {
  try {
    await sharp(inputPath)
      .resize(width, null, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality: 75 })
      .toFile(outputPath);

    logger.info(`Thumbnail generated: ${path.basename(outputPath)}`);
  } catch (error) {
    logger.error('Thumbnail generation failed:', error);
    throw error;
  }
};
