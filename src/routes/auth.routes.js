import { Router } from 'express';
import { LoginValidator, registerValidator } from '../helper/helper.js';
import { loginUser, registerUser } from '../controller/user.controller.js';
import { upload } from '../config/multer.config.js';

const authRoute = Router();

authRoute
  .route('/register')
  .post(upload.single('image'), registerValidator, registerUser);

authRoute.route('/login').post(LoginValidator, loginUser);

export default authRoute;
