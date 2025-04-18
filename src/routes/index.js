import { Router } from 'express';
import authRoute from './auth.routes.js';
import todoRoute from './todo.routes.js';
import listRoute from './list.routes.js';

const route = Router();

route.use('/user', authRoute);
route.use('/todo', todoRoute);
route.use('/list', listRoute);

export default route;
