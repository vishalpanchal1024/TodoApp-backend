import { StatusCodes } from 'http-status-codes';
import {
  CreateUser,
  FindByEmail,
  findByEmailOrUsername,
  findById,
  FindByIdAndUpdate,
  UpdateRefreshToken,
} from '../services/user.service.js';
import { AsyncHandler } from '../utils/asyncHandler.js';
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from '../utils/errorHandler.js';
import { generateAccesToken, generateRefreshToken, verifyToken } from '../utils/tokens.js';
import { SendMail } from '../utils/sendMail.js';
import { envConfig } from '../config/env.config.js';
import {fileURLToPath} from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  maxAge: 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: envConfig.NODE_ENV !== 'developement',
  sameSite: 'None',
};

const options2 = {
  maxAge: 25 * 60 * 60 * 1000,
  httpOnly: true,
  secure: envConfig.NODE_ENV !== 'developement',
  sameSite: 'None',
};

const registerUser = AsyncHandler(async (req, res) => {
  const data = req.body;

  const user = await findByEmailOrUsername(data.email);
  if (user) {
    throw new BadRequestError('User Already Exists', 'registerUser');
  }

  const refreshToken = generateRefreshToken({ email: data.email });
  const newUser = await CreateUser({
    ...data,
    refreshToken,
  });

  const accessToken = generateAccesToken({
    id: newUser._id,
    email: newUser.email,
  });


  SendMail(
    'emailVerification.ejs',
    { name: newUser.fullname, verificationLink: `${envConfig.BACKEND_URL}/user/email-verification?token=${accessToken}` },
    { email: newUser.email, subject: 'Email Verification' }
  );

  return res
    .status(StatusCodes.OK)
    .cookie('ajt', accessToken, options)
    .cookie('rjt', refreshToken, options2)
    .json({
      newUser,
      accessToken,
      message: 'User Created Successfully',
    });
});

const loginUser = AsyncHandler(async (req, res) => {
  const data = req.body;

  const user = await findByEmailOrUsername(data.email);
  if (!user) {
    throw new NotFoundError('User not found .', 'Login User');
  }
  if (user.email_verification === false) {
    throw new NotAuthorizedError('User email not verified.', 'Login User');
  }
  const isPasswordCorrect = user.isPasswordCorrect(data.password);
  if (!isPasswordCorrect) {
    throw new BadRequestError('Invalid credentials.', 'Login User');
  }

  const refreshToken = generateRefreshToken({ email: data.email });
  const accessToken = generateAccesToken({
    id: user._id,
    email: user.email,
  });

  res.cookie('ajt', accessToken, options).cookie('rjt', refreshToken, options2);
  return res.status(StatusCodes.OK).json({
    user,
    refreshToken,
    accessToken,
    message: 'Login successful. Welcome back!',
  });
});

const logoutUser = AsyncHandler(async (req, res) => {
  await UpdateRefreshToken(req.user._id, null);
  return res
    .status(StatusCodes.OK)
    .clearCookie('ajt', options)
    .clearCookie('rjt', options2)
    .json({ message: 'Log Out Succesfully !' });
});

const LoggedInUser = AsyncHandler(async (req, res) => {
  return res.status(StatusCodes.ACCEPTED).json({
    user: req.user,
  });
});

const VerifyEmail = AsyncHandler(async (req, res) => {
  const { token } = req.query;
  if (!token) {
    throw new NotFoundError("Invalid Credentials", "VerifyEmail method")
  }
  const data = verifyToken(token);
  const user = await findById(data.id);
  if (!user) {
    throw new NotFoundError("Invalid User", "VerifyEmail method")
  }
  await FindByIdAndUpdate(user._id, { email_verification: true })

  res.redirect("http://localhost:8000")

})

const deactivateAccount = AsyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    throw new NotFoundError("invalid Credentials", "deactivateAccount method");
  }
  const user = await findById(id);
  if (!user) {
    throw new NotAuthorizedError("User not found", "deactivateAccount method");
  }

  await FindByIdAndUpdate(id,{active_status:true})

  return res.status(StatusCodes.OK).json({
    message:"User Deactivate successfull"
  })

})

const ForgetPassword = AsyncHandler(async (req,res) => {
  const {email} = req.body;
  if(!email){
    throw new NotFoundError("Email is Required field","ForgetPassword menthod");
  }
  const find = await FindByEmail(email);
  if(!find){
    throw new NotFoundError("User Not found","ForgetPassword menthod");
  }
  const token = generateAccesToken({email})

  SendMail(
    'ResetPassword.ejs',
    { userName : find.fullname, resetLink: `${envConfig.BACKEND_URL}/user/forget-password-page?token=${token}` },
    { email: find.email, subject: 'Reset Password' }
  );

  return res.status(StatusCodes.OK).json({
    message:"Reset Password Link Send in your main"
  })
});

const ForgetPasswordPage = AsyncHandler(async (req,res) => {
  const {token} = req.query;
  const {email} = verifyToken(token);
  const user = await FindByEmail(email);
  if(!user){
    throw new NotFoundError("User Not Found","ForgetPasswordPage methord")
  };

  const fileUrl = path.join(__dirname, '../../forgetPassword.html');
  res.sendFile(fileUrl)
})


const ResetPassword = AsyncHandler(async (req,res) => {
  const {password} = req.body;
  const {token} = req.query;
  const {email} = verifyToken(token);
  const user = await FindByEmail(email);
  if(!user){
    throw new NotFoundError("User Not Found","ForgetPasswordPage methord")
  };

  await FindByIdAndUpdate(user._id,password)
   res.status(StatusCodes.OK).json({
    message:"Password Reset Successful"
  })

  res.redirect(`${envConfig.FRONTEND_URL}/login`)

})


export {
  registerUser,
  loginUser,
  logoutUser,
  LoggedInUser,
  VerifyEmail,
  deactivateAccount,
  ForgetPassword,
  ForgetPasswordPage,
  ResetPassword
};
