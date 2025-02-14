import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { envConfig } from './config/env.config.js';
import connectDB from './connections/db.js';

let SocketIo;

export const Start = async (app) => {
  middlewares(app);
  await Routes(app);
  await DbConnections();
  await startServer(app);
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
  app.use(express.static('public')); // Fixed static import
  app.use(cookieParser());
};

const Routes = async (app) => {
  // Define your routes here
};

const DbConnections = async () => {
  await connectDB(envConfig.MONGODB_URI);
};
 
async function startServer(app) {
  app.listen(envConfig.PORT, () => {
    console.log('Server is up and running on Port:', envConfig.PORT);
  });
}
