import { Router } from 'express';
import { ChangePasswordValidator, LoginValidator, registerValidator } from '../helper/helper.js';
import { ChangePassword, LogedInUser, loginUser, logoutUser, registerUser, VerifyOtp } from '../controller/user.controller.js';
import { upload } from '../config/multer.config.js';
import { Authentication } from '../middleware/auth.middleware.js';

const authRoute = Router();

authRoute
  .route('/register')
  .post(upload.single('image'), registerValidator, registerUser);

authRoute.route('/login').post(LoginValidator, loginUser);
authRoute.route('/logout').post(Authentication, logoutUser);
authRoute.route("/loged-in-user").get(Authentication, LogedInUser);
authRoute.route("/otp-verification").options(Authentication,VerifyOtp)
authRoute.route("/chnage-password").get(Authentication,ChangePasswordValidator,ChangePassword)

export default authRoute;
