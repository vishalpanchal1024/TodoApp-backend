import { connect } from 'mongoose';

const connectDB = async (uri) => {
  let isConnected = false;

  while (!isConnected) {
    try {
      const connectionInstance = await connect(uri, { dbName: 'todo-app' });
      isConnected = true;
      console.log(
        `\n MongoDB is Connected !! DB Host : ${connectionInstance.connection.host}`
      );
    } catch (error) {
      console.log(`Error :${error}`);
      console.log('Retrying Mongodb connection ');
    }
  }
};
export default connectDB;
