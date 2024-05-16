import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
        console.log(`Successfully connected to mongodb`)
    } catch (error) {
        console.log(`ERROR: ${error.message}`)
        process.exit(1)
    }
}