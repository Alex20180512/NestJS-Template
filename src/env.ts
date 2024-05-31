import { resolve } from 'path';

export const isDev = process.env.NODE_ENV === 'development';

export const database = resolve(process.cwd(), isDev ? 'database/data.dev.sqlite' : 'database/data.prod.sqlite');
