import {
  ChangePasswordValidation,
  EditProfileValidation,
  LoginValidation,
  RegisterValidation,
} from '../validations/auth.validation.js';
import { Validator } from './validator.js';

export const registerValidator = Validator(RegisterValidation);
export const LoginValidator = Validator(LoginValidation);
export const ChangePasswordValidator = Validator(ChangePasswordValidation);
export const EditProfileValidator = Validator(EditProfileValidation);
