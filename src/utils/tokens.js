import { sign } from 'jsonwebtoken';
import { envConfig } from '../config/env.config';

export const generateAccesToken = (data) => {
  return sign(data, envConfig.JWT_TOKEN, { expiresIn: '1d' });
};

export const generateRefreshToken = (data) => {
  return sign(data, envConfig.JWT_TOKEN, { expiresIn: '2d' });
};
