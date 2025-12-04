import { Router } from 'express';
import { prisma } from '../db/client';
import { contactSchema } from '../validation/contact';
import { contactLimiter, contactValidation, validateRequest } from '../middleware/security';
import { sendContactEmail } from '../services/email';
import { logger } from '../config/logger';

export const contactRouter = Router();

contactRouter.post('/', contactLimiter, contactValidation, validateRequest, async (req: any, res: any, next: any) => {
  try {
    const payload = contactSchema.parse(req.body);
    
    // Save to database
    const saved = await prisma.contactMessage.create({ data: payload });
    
    // Send email notification
    try {
      await sendContactEmail({
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        company: payload.company,
        message: payload.message,
      });
    } catch (emailError) {
      logger.error('Failed to send contact email:', emailError);
      // Continue even if email fails
    }
    
    res.status(201).json({ message: 'Thank you for contacting us. We will get back to you soon.', id: saved.id });
  } catch (error) {
    if ('issues' in (error as any)) {
      return res.status(400).json({ message: 'Invalid payload' });
    }
    next(error);
  }
});
