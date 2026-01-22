import mongoose from "mongoose"
import { MONGO_URL } from "../config/env.js"


const connectDB = async () => {
    try {
       const database = await mongoose.connect(MONGO_URL);

       if(database){
        console.log('Database Is Connected');
       }

    } catch (error) {
        console.log(error);
    }
}

export default connectDB;