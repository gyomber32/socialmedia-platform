import { Pool } from 'pg';

// create it as a singleton object
export const pool = new Pool({
  user: 'admin',
  password: 'admin',
  host: 'localhost',
  database: 'socialmedia',
  port: 5433
});
