import { boolean, object, string } from 'yup';

export const RegisterValidation = object({
  fullname: string().required('Full Name is Required .'),
  username: string().required('Username is Required .'),
  email: string().email().required('Email is Required .'),
  password: string().required('Password is Required .'),
});

export const LoginValidation = object({
  email: string().required('E-mail is required'),
  password: string().required('Password is Required'),
});

export const ChangePasswordValidation = object({
  oldPssword: string().required('Old Pssword is Required .'),
  newPassword: string().required('New Password is Required .'),
});

export const EditProfileValidation = object({
  fullname: string().required('Full Name is Required .'),
  username: string().required('Username is Required .'),
  occupation: string().required('Password is Required .'),
  description: string().required('Password is Required .'),
});
