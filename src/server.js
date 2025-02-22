import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { envConfig } from './config/env.config.js';
import connectDB from './connections/db.js';
import rootRoute from './routes/index.js';
import { CustomError, NotFoundError } from './utils/errorHandler.js';
import { StatusCodes } from 'http-status-codes';

export const Start = (app) => {
  middlewares(app);
  Routes(app);
  DbConnections();
  ErrorHandler(app);
  startServer(app);
};

const middlewares = (app) => {
  app.use(
    cors({
      origin: envConfig.CORS_ORIGIN,
      credentials: true, // Fixed typo
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    })
  );
  app.use(json({ limit: '16kb' }));
  app.use(urlencoded({ extended: true, limit: '16kb' }));
  app.use('/public', express.static('public')); // Fixed static import
  app.use(cookieParser());
  app.use(express.json());
};

const Routes = (app) => {
  app.get('/', (_req, res) => res.send('Server is Healthy and OK'));
  app.use('/api/v1', rootRoute);
};

const ErrorHandler = (app) => {
  app.all('*', (req, res, next) => {
    next(new NotFoundError('Path Not Found', 'ErrorHandler'));
  });

  app.use((error, _req, res, next) => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json(error.serializeErrors());
    } else {
      res.status(StatusCodes.BAD_GATEWAY).json({
        message: error.message || 'somthing went Wrong',
        status: 'error',
        error: error.name,
      });
    }
    next();
  });
};

const DbConnections = () => {
  connectDB(envConfig.MONGODB_URI);
};

function startServer(app) {
  app.listen(envConfig.PORT, () => {
    console.log('Server is up and running on Port:', envConfig.PORT);
  });
}
