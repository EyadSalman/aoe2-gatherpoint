import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Leaderboard from "@/models/Leaderboard"
export const runtime = "nodejs" // ✅ ensure Node APIs like mongoose work

/**
 * GET /api/leaderboard/recent
 * Fetches recent tournament results
 */
export async function GET(req) {
  try {
    await connectDB()
  } catch (error) {
    console.error("[v0] Database connection error:", error.message)
    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed. Please ensure MONGODB_URI is set in environment variables.",
        error: error.message,
      },
      { status: 503 },
    )
  }

  const url = new URL(req.url)
  const page = Number.parseInt(url.searchParams.get("page") || "1")
  const limit = Number.parseInt(url.searchParams.get("limit") || "10")
  const search = url.searchParams.get("search")

  const filter = { isActive: true }
  if (search) {
    filter.name = { $regex: search, $options: "i" }
  }

  try {
    const tournaments = await Leaderboard.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)

    const total = await Leaderboard.countDocuments(filter)

    return NextResponse.json({
      success: true,
      data: tournaments,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
      },
    })
  } catch (error) {
    console.error("[v0] Error fetching leaderboard:", error.message)
    return NextResponse.json(
      { success: false, message: "Error fetching leaderboard", error: error.message },
      { status: 500 },
    )
  }
}

/**
 * POST /api/leaderboard
 * Adds a new tournament result (admin only)
 */
export async function POST(req) {
  try {
    await connectDB()
  } catch (error) {
    console.error("[v0] Database connection error:", error.message)
    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed. Please ensure MONGODB_URI is set in environment variables.",
        error: error.message,
      },
      { status: 503 },
    )
  }

  try {
    const body = await req.json()
    const newTournament = await Leaderboard.create(body)
    return NextResponse.json({ success: true, data: newTournament }, { status: 201 })
  } catch (error) {
    console.error("[v0] Error adding tournament:", error.message)
    return NextResponse.json(
      { success: false, message: "Error adding tournament", error: error.message },
      { status: 400 },
    )
  }
}
