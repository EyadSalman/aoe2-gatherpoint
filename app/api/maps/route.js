import { NextResponse } from "next/server"
import Map from "@/models/Map"
import { connectDB } from "@/lib/db"

export const runtime = "nodejs" // ✅ ensure Node APIs like mongoose work

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
  const limit = Number.parseInt(url.searchParams.get("limit") || "20")
  const type = url.searchParams.get("type")
  const difficulty = url.searchParams.get("difficulty")
  const search = url.searchParams.get("search")

  const filter = { isActive: true }
  if (type && type !== "All") filter.type = type
  if (difficulty) filter.difficulty = difficulty
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { features: { $regex: search, $options: "i" } },
    ]
  }

  try {
    const maps = await Map.find(filter)
      .sort({ name: 1 })
      .limit(limit)
      .skip((page - 1) * limit)
    const total = await Map.countDocuments(filter)

    return NextResponse.json({
      success: true,
      data: maps,
      pagination: { current: page, pages: Math.ceil(total / limit), total },
    })
  } catch (error) {
    console.error("[v0] Error fetching maps:", error.message)
    return NextResponse.json({ success: false, message: "Error fetching maps", error: error.message }, { status: 500 })
  }
}
