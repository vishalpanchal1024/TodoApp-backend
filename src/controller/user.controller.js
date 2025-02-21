import { StatusCodes } from 'http-status-codes';
import { CreateUser, findByEmailOrUsername } from '../services/user.service.js';
import { AsyncHandler } from '../utils/asyncHandler.js';
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from '../utils/errorHandler.js';
import { generateOTP } from '../utils/generateOtp.js';
import { uploadOnCloudinary } from '../utils/imageUpload.js';
import { generateAccesToken, generateRefreshToken } from '../utils/tokens.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { SendMail } from '../utils/sendMail.js';

const options = {
  maxAge: 24 * 60 * 60 * 1000,
  httpOnly: true,
};

const options2 = {
  maxAge: 25 * 60 * 60 * 1000,
  httpOnly: true,
};

const registerUser = AsyncHandler(async (req, res, _next) => {
  const data = req.body;
  const { path } = req.file;

  const user = await findByEmailOrUsername(data.email);
  if (user) {
    throw new BadRequestError('User Already Exists', 'registerUser');
  }

  const image = await uploadOnCloudinary(path, '', true, true);
  if (!image) {
    throw new BadRequestError('Failed to upload image ', 'registerUser');
  }
  const refreshToken = generateRefreshToken({ email: data.email });
  const { otp, expiresAt } = generateOTP();
  const newUser = await CreateUser({
    ...data,
    otp,
    image,
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

const loginUser = AsyncHandler(async (req, res, next) => {
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

  console.log(isPasswordCorrect, '009090');
  user.password = null;
  user.otp = null;

  const refreshToken = generateRefreshToken({ email: data.email });
  const accessToken = generateAccesToken({
    id: user._id,
    email: user.email,
  });

  console.log(user);
  return res
    .status(StatusCodes.OK)
    .cookie('ajt', accessToken, options)
    .cookie('rjt', refreshToken, options2)
    .json({
      user,
      refreshToken,
      accessToken,
      message: 'Login successful. Welcome back!',
    });
});

export { registerUser, loginUser };
