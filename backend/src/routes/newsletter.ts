import { Router } from 'express';
import { prisma } from '../db/client';
import { body } from 'express-validator';
import { validateRequest, apiLimiter } from '../middleware/security';
import { sendWelcomeEmail } from '../services/email';
import { logger } from '../config/logger';

export const newsletterRouter = Router();

newsletterRouter.post(
  '/subscribe',
  apiLimiter,
  [
    body('email').isEmail().normalizeEmail(),
    validateRequest,
  ],
  async (req: any, res: any, next: any) => {
    try {
      const { email } = req.body;

      // Check if already subscribed
      const existing = await prisma.newsletterSubscriber.findUnique({
        where: { email },
      });

      if (existing && existing.status === 'active') {
        return res.status(400).json({ message: 'Email already subscribed' });
      }

      // Subscribe or resubscribe
      await prisma.newsletterSubscriber.upsert({
        where: { email },
        create: { email, status: 'active' },
        update: { status: 'active', unsubscribedAt: null },
      });

      // Send welcome email
      try {
        await sendWelcomeEmail(email);
      } catch (emailError) {
        logger.error('Failed to send welcome email:', emailError);
      }

      logger.info(`Newsletter subscription: ${email}`);

      res.status(201).json({ message: 'Successfully subscribed to newsletter' });
    } catch (error) {
      next(error);
    }
  }
);

newsletterRouter.post(
  '/unsubscribe',
  [
    body('email').isEmail().normalizeEmail(),
    validateRequest,
  ],
  async (req: any, res: any, next: any) => {
    try {
      const { email } = req.body;

      await prisma.newsletterSubscriber.update({
        where: { email },
        data: { status: 'unsubscribed', unsubscribedAt: new Date() },
      });

      logger.info(`Newsletter unsubscription: ${email}`);

      res.json({ message: 'Successfully unsubscribed from newsletter' });
    } catch (error) {
      next(error);
    }
  }
);
