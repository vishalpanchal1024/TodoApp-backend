import jwt from 'jsonwebtoken';
import { findById } from '../services/user.service.js';
import { BadRequestError, NotAuthorizedError } from '../utils/errorHandler.js';
import { envConfig } from '../config/env.config.js';
import { AsyncHandler } from '../utils/asyncHandler.js';

export const Authentication = AsyncHandler(async (req, _, next) => {
  const token =
    req.cookies?.ajt || req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    throw new NotAuthorizedError(
      'Unauthorized Request',
      'Authentication method '
    );
  }
  const decodedToken = jwt.verify(token, envConfig.JWT_TOKEN);
  console.log(decodedToken, 'token');
  const user = await findById(decodedToken.id);
  console.log('auth ', user);
  if (!user) {
    throw new BadRequestError('Invaild Access Token', 'Authentication method');
  }

  req.user = user;
  next();
});
