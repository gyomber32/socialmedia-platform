import express, { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';
import cors from 'cors';
import router from './routes/index';

const app = express();

app.use(
  cors({
    // TODO: set origin
    origin: '*',
    methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
  })
);
// replaces body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

// global error handler
app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  res
    .status(error.statusCode || 500)
    .json({ message: error.message || 'Internal Server Error' });
});

export default app;
