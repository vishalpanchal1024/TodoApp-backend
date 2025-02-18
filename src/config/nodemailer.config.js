import { createTransport } from 'nodemailer';
import { envConfig } from './env.config.js';

export const transpoter = createTransport({
  service: 'gmail',
  auth: {
    user: envConfig.EMAILID,
    pass: envConfig.EMAILPASS,
  },
});
