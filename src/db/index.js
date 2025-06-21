// Connecting the databases
// use try and catch to connect with your databases
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => { // database is in another continent
    // chance of error so use try and catch
    try {
        const connectionIns = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n Mongodb connected ! DB host :${connectionIns.connection.host}`)
    } catch (error) {
        console.log('Mongodb connection error', error)
        process.exit(1);
    }
}
export default connectDB