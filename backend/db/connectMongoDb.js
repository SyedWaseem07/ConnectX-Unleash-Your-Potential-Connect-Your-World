// Dependency
import mongoose, { mongo } from "mongoose";

export const connectToDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Mongo DB Connected Successfully");
    } catch (error) {
        console.error(`Error Connecting to DB : ${error.message}`);
        process.exit(1);
    }
}