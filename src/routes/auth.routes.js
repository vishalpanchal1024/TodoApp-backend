import {Router} from "express";
import { deactivateAccount, LoggedInUser, loginUser, logoutUser, registerUser, VerifyEmail } from "../controller/user.controller.js";
import { LoginValidator, registerValidator } from "../helper/helper.js";
import { Authentication } from "../middleware/auth.middleware.js";


const router = Router();


router.route("/register").post(registerValidator,registerUser);
router.route("/login").post(LoginValidator,loginUser);
router.route("/email-verification").get(VerifyEmail);

// protacted routes
router.route("/logout").get(Authentication,logoutUser);
router.route("/get-login-user").get(Authentication,LoggedInUser);
router.route("/change-status").get(Authentication,deactivateAccount);


export default router

