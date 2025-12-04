import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../db/client';
import { authenticate, generateToken, AuthRequest } from '../middleware/auth';
import { authLimiter, validateRequest } from '../middleware/security';
import { body } from 'express-validator';
import { logger } from '../config/logger';

export const authRouter = Router();

// Login
authRouter.post(
  '/login',
  authLimiter,
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    validateRequest,
  ],
  async (req: any, res: any, next: any) => {
    try {
      const { email, password } = req.body;

      const admin = await prisma.admin.findUnique({ where: { email } });

      if (!admin) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isValid = await bcrypt.compare(password, admin.password);

      if (!isValid) {
        logger.warn(`Failed login attempt for ${email}`);
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = generateToken(admin.id, admin.email);

      logger.info(`Admin logged in: ${email}`);

      res.json({
        token,
        admin: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get current user
authRouter.get('/me', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: req.userId },
      select: { id: true, email: true, name: true, role: true },
    });

    if (!admin) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(admin);
  } catch (error) {
    next(error);
  }
});

// Change password
authRouter.post(
  '/change-password',
  authenticate,
  [
    body('currentPassword').isLength({ min: 6 }),
    body('newPassword').isLength({ min: 6 }),
    validateRequest,
  ],
  async (req: AuthRequest, res: any, next: any) => {
    try {
      const { currentPassword, newPassword } = req.body;

      const admin = await prisma.admin.findUnique({ where: { id: req.userId } });

      if (!admin) {
        return res.status(404).json({ message: 'User not found' });
      }

      const isValid = await bcrypt.compare(currentPassword, admin.password);

      if (!isValid) {
        return res.status(401).json({ message: 'Current password is incorrect' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await prisma.admin.update({
        where: { id: req.userId },
        data: { password: hashedPassword },
      });

      logger.info(`Password changed for ${admin.email}`);

      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      next(error);
    }
  }
);
