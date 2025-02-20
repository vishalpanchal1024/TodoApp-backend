import { boolean, object, string } from 'yup';

export const RegisterValidation = object({
  fullname: string().required('Full Name is Required .'),
  username: string().required('Username is Required .'),
  email: string().email().required('Email is Required .'),
  password: string().required('Password is Required .'),
  // image: string().required('Password is Required .'),
  // occupation: string().required('Password is Required .'),
  // description: string().required('Password is Required .'),
  // otpExpire: string().required('Password is Required .'),
  // otp: string().required('Password is Required .'),
  // emailVerification: boolean(),
  // refreshToken: string(),
});
