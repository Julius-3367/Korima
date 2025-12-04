import app from './app';
import { env } from './config/env';
import { prisma } from './db/client';

const start = async () => {
  try {
    await prisma.$connect();
    app.listen(env.port, () => {
      console.log(`API running on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
};

start();
