import express, { Request, Response, NextFunction } from 'express';
import { debug } from 'console';

const app = express();
const router = express.Router();
const port = 3000;

const server = app.listen(port, () => {
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

process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    debug('HTTP server closed');
  });
});
