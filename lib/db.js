import mongoose from "mongoose"

// Use global cache to prevent multiple connections in hot reload
let cached = global.mongoose
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export const connectDB = async () => {
  // This prevents errors during build time when env vars aren't available yet
  if (!process.env.MONGODB_URI) {
    console.warn("⚠️ MONGODB_URI not defined - skipping connection during build")
    return null
  }

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI)
  }

  try {
    cached.conn = await cached.promise
    console.log("✅ MongoDB Connected")
    return cached.conn
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message)
    throw error
  }
}
