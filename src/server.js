import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "./config/env.config";


const Start = async ()=>{
	middlewares(app);
	await Routes(app);
	DbConnections();
	ErrorHandler(app);
	// await startServer(app);
}

const middlewares=(app)=>{
	app.use(cors({
		origin: config.CORS_ORIGIN,
		Credential: true,
	    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
	}));
	app.use(express.json({ limit: "16kb" }));
	app.use(express.urlencoded({ extended: true, limit: "16kb" }));
	app.use(express.static("public"));
	app.use(cookieParser());
	
}


const Routes = async(app)=>{

}



const DbConnections=async()=>{

}


export { Start };