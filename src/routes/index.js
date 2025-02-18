import { Router } from 'express';
import authRoute from './auth.routes.js';

const route = Router();

route.use('/user', authRoute);

export default route;
