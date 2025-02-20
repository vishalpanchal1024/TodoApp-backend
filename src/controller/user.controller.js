import { StatusCodes } from 'http-status-codes';
import { CreateUser, findByEmailOrUsername } from '../services/user.service.js';
import { AsyncHandler } from '../utils/asyncHandler.js';
import { BadRequestError } from '../utils/errorHandler.js';
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



const registerUser = AsyncHandler(async (req, res, next) => {
    const data = req.body;

    const user = findByEmailOrUsername(data.email, data.username);

    if (user) {
        throw new BadRequestError('User Already Exists', "registerUser");
    }

    const image = uploadOnCloudinary(data.image, "", true, true);
    if (!image) {
        throw new BadRequestError('Failed to upload image ', "registerUser");
    }


    const refreshToken = generateRefreshToken({ email: data.email });
    const { otp, expiresAt } = generateOTP();
    const newUser = CreateUser({
        ...data,
        otp,
        image,
        refreshToken,
        otpExpire: expiresAt
    });

    newUser.password = null
    newUser.otp = null
    const accessToken = generateAccesToken({ id: newUser._id, email: newUser.email });


    SendMail('email.ejs', { name: newUser.full_name, otp: otp }, { email: newUser.email, subject: 'Email Verification' });

    res.status(StatusCodes.OK)
        .cookie('ajt', accessToken, options)
        .cookie('rjt', refreshToken, options2)
        .json(new ApiResponse({ newUser, accessToken, message: "User Created Successfully" }));
});

export { registerUser };
