import {
  ChangePasswordValidation,
  EditProfileValidation,
  LoginValidation,
  RegisterValidation,
} from '../validations/auth.validation.js';
import { addListValidation } from '../validations/list.validation.js';
import { addTagValidation } from '../validations/tag.validation.js';
import { createTodoValidation } from '../validations/todo.validation.js';
import { Validator } from './validator.js';

// Auth Validator

export const registerValidator = Validator(RegisterValidation);
export const LoginValidator = Validator(LoginValidation);
export const ChangePasswordValidator = Validator(ChangePasswordValidation);
export const EditProfileValidator = Validator(EditProfileValidation);

//  Todo Validator

export const CreateTodoValidator = Validator(createTodoValidation);

//  Tag Validator

export const AddTagValidator = Validator(addTagValidation);

//  List Validator

export const AddListValidator = Validator(addListValidation);
