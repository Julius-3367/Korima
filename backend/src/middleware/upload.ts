import fs from 'fs';
import path from 'path';
import multer from 'multer';

export const uploadsRoot = path.resolve(__dirname, '../..', 'uploads');
const blogUploadDir = path.join(uploadsRoot, 'blog');

fs.mkdirSync(blogUploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, blogUploadDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.png';
    const baseName = path
      .basename(file.originalname, ext)
      .replace(/[^a-z0-9]/gi, '-')
      .toLowerCase();
    cb(null, `${Date.now()}-${baseName}${ext}`);
  },
});

export const uploadBlogImage = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image uploads are allowed'));
    }
    cb(null, true);
  },
});
