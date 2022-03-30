import express, { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';
import cors from 'cors';
import router from './routes/index';

const app = express();

app.use(
  cors({
    // TODO: set origin
    //origin: 'http://example.com',
    optionsSuccessStatus: 200
  })
);
// replaces body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(router);

// global error handler
app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  res
    .status(error.statusCode || 500)
    .json({ message: error.message || 'Internal Server Error' });
});

export default app;
