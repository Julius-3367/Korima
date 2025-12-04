import dotenv from 'dotenv';

dotenv.config();

const requiredVars = ['DATABASE_URL'];

requiredVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

export const env = {
  port: Number(process.env.PORT) || 4000,
  databaseUrl: process.env.DATABASE_URL as string,
};
