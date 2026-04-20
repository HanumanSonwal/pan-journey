import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export const connectDB = async () => {
  console.log("🔗 Connecting to MongoDB..." , process.env.MONGO_URI);
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ DB connection failed");
    process.exit(1);
  }
};