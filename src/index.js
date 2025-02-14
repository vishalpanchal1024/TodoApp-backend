import express from 'express';
import { Start } from './server.js';

function Initlization() {
  const app = express();
  Start(app);
}

Initlization();
