/* eslint-disable no-undef */
import dotenv from 'dotenv';

dotenv.config();

class Config {
  MONGODB_URI;
  CLIENT_URL;
  CLOUDINARY_SECRET;
  CLOUDINARY_API_KEY;
  CLOUDINARY_NAME;
  JWT_TOKEN;
  PORT;
  EMAILID;
  EMAILPASS;
  NODE_ENV;
  BACKEND_URL;
  FRONTEND_URL;

  constructor() {
    this.MONGODB_URI = process.env.MONGODB_URI;
    this.CLIENT_URL = process.env.CLIENT_URL;
    this.CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;
    this.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
    this.CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
    this.JWT_TOKEN = process.env.JWT_TOKEN;
    this.PORT = process.env.PORT;
    this.EMAILID = process.env.EMAILID;
    this.EMAILPASS = process.env.EMAILPASS;
    this.NODE_ENV = process.env.NODE_ENV;
    this.BACKEND_URL = process.env.BACKEND_URL;
    this.FRONTEND_URL = process.env.FRONTEND_URL;
  }
}

export const envConfig = new Config();
