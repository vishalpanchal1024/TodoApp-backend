import { object, string } from 'yup';

export const RegisterValidation = object({
  fullname: string().required('Full Name is Required .'),
  username: string().required('Username is Required .'),
  email: string().email().required('Email is Required .'),
  password: string().required('Password is Required .'),
});
