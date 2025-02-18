import express from 'express';
import { Start } from './server.js';
import { SendMail } from './utils/sendMail.js';

function Initlization() {
  const app = express();
  Start(app);
}

Initlization();

// SendMail(
//   'email.ejs',
//   { name: 'Vishal', otp: '1564' },
//   { email: 'komal.singh928944@gmail.com', subject: 'hero' }
// );
