import { connect } from "mongoose";


const connectDB = async () => {
	let isConnected = false

	while (!isConnected) {
		try {
			const connectionInstance = await connect(`${process.env.MONGODB_URI}/${"todo-app"}`)
			isConnected = true
			console.log(`\n MongoDB is Connected !! DB Host : ${connectionInstance.connection.host}`)

		} catch (error) {
			console.log(`Error :${error}`);
			process.exit(1)
		}
	}


}
export default connectDB;