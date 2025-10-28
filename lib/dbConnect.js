// lib/dbConnect.js
import mongoose from "mongoose";

let isConnected = false;

export const dbConnect = async () => {
  if (isConnected) return;

  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) throw new Error("Please define MONGODB_URI in .env.local");

  try {
    const db = await mongoose.connect(MONGODB_URI, {
      dbName: "aoe2gatherpoint",
    });
    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};
