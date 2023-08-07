import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2");
        console.log("DB is nice");

    } catch (error) {
        console.log(error);

    }
}