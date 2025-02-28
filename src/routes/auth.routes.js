import { Router } from 'express';
import {
  ChangePasswordValidator,
  EditProfileValidator,
  LoginValidator,
  registerValidator,
} from '../helper/helper.js';
import {
  ChangePassword,
  LoggedInUser,
  loginUser,
  logoutUser,
  registerUser,
  VerifyOtp,
  ProfileUpdate,
  ResendOtp,
} from '../controller/user.controller.js';
import { upload } from '../config/multer.config.js';
import { Authentication } from '../middleware/auth.middleware.js';

const authRoute = Router();

authRoute
  .route('/register')
  .post(upload.single('image'), registerValidator, registerUser);

authRoute.route('/login').post(LoginValidator, loginUser);
authRoute.route('/logout').post(Authentication, logoutUser);
authRoute.route('/logged-in-user').get(Authentication, LoggedInUser);
authRoute.route('/otp-verification').post(Authentication, VerifyOtp);
authRoute
  .route('/change-password')
  .post(Authentication, ChangePasswordValidator, ChangePassword);
authRoute
  .route('/profile-update')
  .put(Authentication, EditProfileValidator, ProfileUpdate);
authRoute.route('/resend-otp').post(Authentication, ResendOtp);

export default authRoute;
