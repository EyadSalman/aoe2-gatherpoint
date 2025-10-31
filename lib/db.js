import mongoose from "mongoose"

// ✅ Use global cache to prevent multiple connections (for hot reload in Next.js)
let cached = global.mongoose
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export const connectDB = async () => {
  if (process.env.npm_lifecycle_event === "build") {
    console.log("⏭️ Skipping MongoDB connection during build")
    return null
  }

  if (cached.conn) return cached.conn

  if (!process.env.MONGODB_URI) {
    throw new Error("❌ MONGODB_URI not defined in environment variables")
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI).then((mongoose) => mongoose)
  }

  try {
    cached.conn = await cached.promise
    console.log("✅ MongoDB Connected")
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message)
    throw error
  }

  return cached.conn
}

export const dbConnect = connectDB
