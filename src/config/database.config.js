import mongoose from "mongoose";

const connectDB = async () => {
    try {
       const connect =  await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected at: ${connect.connection.host}:${process.env.PORT}`);
    } catch (error) {
       console.log("MongoDB collection failed:",error);
        process.exit(1)
    }
}

export default connectDB