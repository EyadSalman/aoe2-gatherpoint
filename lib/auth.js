// lib/auth.js
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * ✅ Verifies JWT and returns user object.
 * Throws error if token is missing or invalid.
 * Usage: const user = await verifyAuth(req)
 */
export async function verifyAuth(req) {
  await connectDB();

  try {
    // Token from cookie or header
    const cookieToken = req.cookies.get("token")?.value;
    const authHeader = req.headers.get("authorization");
    const headerToken = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    const token = cookieToken || headerToken;
    if (!token) throw new Error("No token provided");

    // Verify token and decode payload
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find user in DB
    const user = await User.findById(decoded.id);
    if (!user || !user.isActive) throw new Error("User not found or inactive");

    return user; // attach to route logic
  } catch (error) {
    console.error("Auth Error:", error.message);
    throw new Error(error.message || "Authentication failed");
  }
}

/**
 * ✅ Simplified version for routes that should directly return 401
 * Usage:
 * const user = await requireAuth(req);
 * if (!user) return;
 */
export async function requireAuth(req) {
  try {
    const user = await verifyAuth(req);
    return user;
  } catch {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
}
