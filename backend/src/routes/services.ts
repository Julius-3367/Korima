import { Router } from 'express';
import { prisma } from '../db/client';

export const servicesRouter = Router();

servicesRouter.get('/', async (_req, res, next) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: { id: 'asc' },
    });
    res.json(services);
  } catch (error) {
    next(error);
  }
});
