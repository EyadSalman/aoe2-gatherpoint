import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config({ path: ".env.local" }) // ensure .env.local is loaded

// Use global cache to prevent multiple connections in hot reload
let cached = global.mongoose
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("❌ MONGODB_URI not defined in .env.local")
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("✅ MongoDB Connected")
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message)
    process.exit(1)
  }
}
