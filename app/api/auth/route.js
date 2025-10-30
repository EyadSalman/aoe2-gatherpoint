// app/api/auth/route.js
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/db"
import { verifyAuth } from "@/lib/auth"
import User from "@/models/User"
export const runtime = "nodejs" // ✅ ensure Node APIs like mongoose work

const JWT_SECRET = process.env.JWT_SECRET
const TOKEN_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "30d"

function generateToken(id) {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN })
}

// ============================================
// POST /api/auth/login, register, change-password, verify
// ============================================
export async function POST(req) {
  await connectDB()
  const { pathname } = new URL(req.url)

  const body = await req.json()
  const { email, password, name, role } = body

  // ---- LOGIN ----
  if (pathname.endsWith("login")) {
    if (!email || !password)
      return NextResponse.json({ success: false, message: "Missing credentials" }, { status: 400 })

    const user = await User.findOne({ email, isActive: true }).select("+password")
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
    }

    user.lastLogin = new Date()
    await user.save()
    const token = generateToken(user._id)

    const res = NextResponse.json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    })
    res.cookies.set("token", token, { httpOnly: true, maxAge: 60 * 60 * 24 * 30 })
    return res
  }

  // ---- REGISTER ----
  if (pathname.endsWith("register")) {
    if (!email || !password || !name)
      return NextResponse.json({ success: false, message: "Please provide email, password, and name" }, { status: 400 })

    const existing = await User.findOne({ email })
    if (existing) return NextResponse.json({ success: false, message: "User already exists" }, { status: 400 })

    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ email, password: hashed, name, role: role || "moderator" })
    return NextResponse.json({
      success: true,
      data: { id: user._id, name: user.name, email: user.email, role: user.role },
      message: "User registered successfully",
    })
  }

  // ---- CHANGE PASSWORD ----
  if (pathname.endsWith("change-password")) {
    const { currentPassword, newPassword } = body
    const token = req.cookies.get("token")?.value

    if (!token) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })

    try {
      const decoded = jwt.verify(token, JWT_SECRET)
      const user = await User.findById(decoded.id).select("+password")
      if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
        return NextResponse.json({ success: false, message: "Current password is incorrect" }, { status: 400 })
      }

      user.password = await bcrypt.hash(newPassword, 10)
      await user.save()
      return NextResponse.json({ success: true, message: "Password updated successfully" })
    } catch {
      return NextResponse.json({ success: false, message: "Invalid or expired token" }, { status: 403 })
    }
  }

  if (pathname.endsWith("verify")) {
    try {
      const user = await verifyAuth(req)
      if (user.role !== "admin") {
        return NextResponse.json({ success: false, message: "Access denied" }, { status: 403 })
      }
      return NextResponse.json({ success: true, data: user })
    } catch (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 401 })
    }
  }

  return NextResponse.json({ success: false, message: "Invalid endpoint" }, { status: 404 })
}

// ============================================
// GET /api/auth/me
// ============================================
export async function GET(req) {
  await connectDB()
  const token = req.cookies.get("token")?.value
  if (!token) return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 })

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    const user = await User.findById(decoded.id)
    return NextResponse.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin,
      },
    })
  } catch {
    return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 })
  }
}
