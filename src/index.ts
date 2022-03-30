import 'dotenv/config';
import { Server } from 'http';
import app from './app';
import { debug } from 'console';
import { pool } from './pool';

const PORT = process.env.PORT || 3000;
let server: Server;

pool
  .connect()
  .then(() => {
    server = app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log('Successfully connected to the database.');
      // eslint-disable-next-line no-console
      console.log(`Socialmedia backend is running on port ${PORT}.`);
    });
  })
  .catch((error) => {
    console.error('Error while connecting to the database due to: ', error);
    process.exit(0);
  });

process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    pool.end();
    debug('HTTP server closed');
  });
});
