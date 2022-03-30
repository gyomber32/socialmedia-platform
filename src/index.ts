import express, { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';
import cors from 'cors';
import { debug } from 'console';

import { pool } from './pool';

const app = express();
const router = express.Router();
const port = 3000;

app.use(
  cors({
    // TODO: set origin
    //origin: 'http://example.com',
    optionsSuccessStatus: 200
  })
);
// replaces body parser
app.use(express.json());
app.use(express.urlencoded());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const server = app.listen(port, async () => {
  try {
    await pool.connect();
  } catch (error) {
    console.error('Error while connecting to the database due to: ', error);
  } finally {
    // eslint-disable-next-line no-console
    console.log('Successfully connected to the database.');
  }
  // eslint-disable-next-line no-console
  console.log(`Socialmedia backend is running on port ${port}.`);
});

router.get('/health', (req: Request, res: Response) => {
  const data = {
    uptime: process.uptime(),
    message: 'OK',
    date: new Date()
  };
  res.status(200).send(data);
});

// global error handler
app.use((error: HttpError, req: Request, res: Response) => {
  res
    .status(error.statusCode || 500)
    .json({ message: error.message || 'Internal Server Error' });
});

process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    debug('HTTP server closed');
  });
});
