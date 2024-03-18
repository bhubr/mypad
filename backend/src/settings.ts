import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT ?? 5000;

export const dbFile = process.env.DB_FILE ?? 'mypad-dev.sqlite3';

export const jwtSecret = process.env.JWT_SECRET ?? 'secret';

export const isProduction = process.env.NODE_ENV === 'production';
