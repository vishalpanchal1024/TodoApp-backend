import { Router } from 'express';
import authRoute from './auth.routes.js';
import todoRoute from './todo.routes.js';

const route = Router();

route.use('/user', authRoute);
route.use('/todo', todoRoute);

export default route;
