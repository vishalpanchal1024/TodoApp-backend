import { StatusCodes } from 'http-status-codes';
import {
  CreateUser,
  findByEmailOrUsername,
  findById,
  UpdateProfile,
  UpdateRefreshToken,
} from '../services/user.service.js';
import { AsyncHandler } from '../utils/asyncHandler.js';
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from '../utils/errorHandler.js';
import { generateOTP } from '../utils/generateOtp.js';
import { uploadOnCloudinary } from '../utils/imageUpload.js';
import { generateAccesToken, generateRefreshToken } from '../utils/tokens.js';
import { SendMail } from '../utils/sendMail.js';
import { envConfig } from '../config/env.config.js';
import { compare } from 'bcrypt';

const options = {
  maxAge: 24 * 60 * 60 * 1000,
  httpOnly: true,
  // secure: envConfig.NODE_ENV !== 'developement',
  // sameSite: 'None',
};

const options2 = {
  maxAge: 25 * 60 * 60 * 1000,
  httpOnly: true,
  // secure: envConfig.NODE_ENV !== 'developement',
  // sameSite: 'None',
};

const registerUser = AsyncHandler(async (req, res) => {
  const data = req.body;

  const user = await findByEmailOrUsername(data.email);
  if (user) {
    throw new BadRequestError('User Already Exists', 'registerUser');
  }

  const refreshToken = generateRefreshToken({ email: data.email });
  const { otp, expiresAt } = generateOTP();
  const newUser = await CreateUser({
    ...data,
    otp,
    refreshToken,
    otpExpire: expiresAt,
  });

  newUser.password = null;
  newUser.otp = null;
  const accessToken = generateAccesToken({
    id: newUser._id,
    email: newUser.email,
  });

  SendMail(
    'email.ejs',
    { name: newUser.fullname, otp: otp },
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
  if (user.emailVerification === false) {
    throw new NotAuthorizedError('User email not verified.', 'Login User');
  }
  const isPasswordCorrect = user.isPasswordCorrect(data.password);
  console.log(isPasswordCorrect, 'data from service');
  if (!isPasswordCorrect) {
    throw new BadRequestError('Invalid credentials.', 'Login User');
  }

  user.password = null;
  user.otp = null;

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
    .json({ data: {}, message: 'Log Out Succesfully !' });
});

const LoggedInUser = AsyncHandler(async (req, res) => {
  return res.status(StatusCodes.ACCEPTED).json({
    user: req.user,
  });
});

const VerifyOtp = AsyncHandler(async (req, res) => {
  const { otp } = req.body;

  const date = Date.now();

  if (date > req?.user.otpExpire) {
    throw new BadRequestError('OTP is expire', 'VerifyOtp method');
  }

  if (otp !== req?.user?.otp) {
    throw new BadRequestError('Wrong OTP', 'VerifyOtp method');
  }

  return res.status(StatusCodes.ACCEPTED).json({
    message: 'OTP Verifyed',
  });
});

const ChangePassword = AsyncHandler(async (req, res) => {
  const { oldPssword, newPassword } = req.body;

  const find = await findById(req.user?._id);

  const isCurrect = compare(oldPssword, find.password);
  if (!isCurrect) {
    throw new BadRequestError(
      'Old Password does not match',
      'ChangePassword method'
    );
  }

  await findByIdAndUpdate(req.user?._id, { password: newPassword });
  return res.status(StatusCodes.ACCEPTED).json({
    message: 'New Password Created',
  });
});

const ResendOtp = AsyncHandler(async (req, res) => {
  const { otp, expiresAt } = generateOTP();

  const user = await findById(req.user?._id);

  if (!user) {
    throw new NotFoundError('User not Found ', 'ResendOtp method');
  }

  await UpdateProfile(req.user?._id, {
    otp,
    otpExpire: expiresAt,
  });

  SendMail(
    'email.ejs',
    { name: user.fullname, otp: otp },
    { email: user.email, subject: 'Email Verification' }
  );
  return res
    .status(StatusCodes.OK)
    .json({ mesage: 'OTP send again Your E-mail' });
});

const ProfileUpdate = AsyncHandler(async (req, res) => {
  const data = req.body;

  const updatedUser = await UpdateProfile(req.user._id, data);

  if (!updatedUser) {
    throw new NotFoundError('User Profile not Found ', 'updateProfile');
  }
  return res
    .status(StatusCodes.OK)
    .json({ message: 'Profile Update Successfully .' });
});

export {
  registerUser,
  loginUser,
  logoutUser,
  LoggedInUser,
  VerifyOtp,
  ChangePassword,
  ResendOtp,
  ProfileUpdate,
};
