import express from 'express';
import { Start } from '@/server';

function Initlization() {
  const app = express();
  Start(app);
}

Initlization();





// import dotenv from "dotenv";
// import connectDB from "../src/connections/db.js";
// import { app } from "../src/server.js"


 

// connectDB().then(() => {
// 	app.listen(process.env.PORT || 3000, () => {
// 		console.log(`server is running at port : ${process.env.PORT}`)
// 	});
// }).catch((error) => {
// 	console.log(`error : ${error}`)
// })


