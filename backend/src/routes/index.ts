import { Router } from 'express';
import { servicesRouter } from './services';
import { projectsRouter } from './projects';
import { blogRouter } from './posts';
import { contactRouter } from './contact';
import { authRouter } from './auth';
import { newsletterRouter } from './newsletter';

export const router = Router();

router.use('/auth', authRouter);
router.use('/services', servicesRouter);
router.use('/projects', projectsRouter);
router.use('/blog', blogRouter);
router.use('/contact', contactRouter);
router.use('/newsletter', newsletterRouter);
