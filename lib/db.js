import mongoose from "mongoose"

// ✅ Use global cache to prevent multiple connections (for hot reload in Next.js)
let cached = global.mongoose
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export const connectDB = async () => {
  if (cached.conn) return cached.conn

  if (!process.env.MONGODB_URI) {
    throw new Error("❌ MONGODB_URI not defined")
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI).then((m) => m)
  }

  cached.conn = await cached.promise
  return cached.conn
}


export const dbConnect = connectDB
