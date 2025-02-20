import jwt from 'jsonwebtoken';
import { envConfig } from '../config/env.config.js';

export const generateAccesToken = (data) => {
  return jwt.sign(data, envConfig.JWT_TOKEN, { expiresIn: '1d' });
};

export const generateRefreshToken = (data) => {
  return jwt.sign(data, envConfig.JWT_TOKEN, { expiresIn: '2d' });
};
