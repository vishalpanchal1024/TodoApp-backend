import { connect } from 'mongoose';

const connectDB = async (uri) => {  

  let isConnected = true;
  do{
    try {
      const connectionInstance = await connect(uri, { dbName: 'todo-app' });
      console.log(`MongoDB is Connected !! DB Host : ${connectionInstance.connection.host}`);
      isConnected = false;
    } catch (error) {
      console.log(`Error :${error}`);
      console.log('Retrying Mongodb connection ');
    }
  }while(isConnected)

};
export default connectDB;
