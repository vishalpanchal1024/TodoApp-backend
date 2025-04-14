import {Router} from "express";
import { deactivateAccount, ForgetPassword, ForgetPasswordPage, LoggedInUser, loginUser, logoutUser, registerUser, ResetPassword, VerifyEmail } from "../controller/user.controller.js";
import { LoginValidator, registerValidator } from "../helper/helper.js";
import { Authentication } from "../middleware/auth.middleware.js";


const router = Router();


router.route("/register").post(registerValidator,registerUser);
router.route("/login").post(LoginValidator,loginUser);
router.route("/email-verification").get(VerifyEmail);
router.route("/forget-password").post(ForgetPassword)
router.route("/forget-password-page").post(ForgetPasswordPage);
router.route("/reset-password").post(ResetPassword);

// protacted routes
router.route("/logout").get(Authentication,logoutUser);
router.route("/get-login-user").get(Authentication,LoggedInUser);
router.route("/change-status").get(Authentication,deactivateAccount);


export default router

