import { Router } from 'express';
import { LoginValidator, registerValidator } from '../helper/helper.js';
import { loginUser, logoutUser, registerUser } from '../controller/user.controller.js';
import { upload } from '../config/multer.config.js';
import { Authentication } from '../middleware/auth.middleware.js';

const authRoute = Router();

authRoute
  .route('/register')
  .post(upload.single('image'), registerValidator, registerUser);

authRoute.route('/login').post(LoginValidator, loginUser);
authRoute.route('/logout').post(Authentication, logoutUser);

export default authRoute;
