import { Router } from 'express';
import { registerValidator } from '../helper/helper.js';
import { registerUser } from '../controller/user.controller.js';

const authRoute = Router();

authRoute.route('/register').post(registerValidator, registerUser);

export default authRoute;
