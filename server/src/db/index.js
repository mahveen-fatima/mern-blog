import mongoose from "mongoose";
import {DB_NAME} from "../constant.js";


// correct approach to write database connecting code in separate file.
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        // console.log("my first log ", connectionInstance); // assignment
        
        console.log(`/n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log("MONGODB connection error", error);
        process.exit(1)        
    }
}

export default connectDB;