import { boolean, object, string } from 'yup';

export const RegisterValidation = object({
  fullname: string().required('Full Name is Required .'),
  username: string().required('Username is Required .'),
  email: string().email().required('Email is Required .'),
  password: string().required('Password is Required .'),
  image: string(),
  occupation: string().required('Password is Required .'),
  description: string().required('Password is Required .'),
  otpExpire: string(),
  otp: string(),
  emailVerification: boolean(),
  refreshToken: string(),
});

export const LoginValidation = object({
  email: string().email().required('E-mail is required'),
  password: string().required('Password is Required'),
});

export const ChnagePassword = object({
  oldPssword: string().required('Old Pssword is Required .'),
  newPassword: string().required('New Password is Required .'),
})
