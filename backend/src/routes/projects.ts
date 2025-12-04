import { Router } from 'express';
import { prisma } from '../db/client';

export const projectsRouter = Router();

projectsRouter.get('/', async (_req, res, next) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { id: 'asc' },
    });
    res.json(projects);
  } catch (error) {
    next(error);
  }
});
