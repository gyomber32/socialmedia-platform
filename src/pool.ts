import 'dotenv/config';
import { Pool } from 'pg';

// create it as a singleton object
export const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DATABASE,
  port: Number(process.env.DB_PORT)
});
