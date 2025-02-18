import { RegisterValidation } from '../validations/auth.validation.js';
import { Validator } from './validator.js';

export const registerValidator = Validator(RegisterValidation);
