import mongoose from "mongoose"

// Use global cache to prevent multiple connections in hot reload
let cached = global.mongoose
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is not defined. Please add it to your Vercel project settings.")
  }

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI)
  }

  try {
    cached.conn = await cached.promise
    console.log("[v0] ✅ MongoDB Connected")
    return cached.conn
  } catch (error) {
    console.error("[v0] ❌ MongoDB Connection Failed:", error.message)
    throw error
  }
}
