// app/api/tournaments/route.js
import { NextResponse } from "next/server"
import Tournament from "@/models/Tournament"
import { connectDB } from "@/lib/db"

export const dynamic = "force-dynamic"
export const runtime = "nodejs" // ✅ ensure Node APIs like mongoose work

export async function GET(req) {
  await connectDB()

  const url = new URL(req.url)
  const page = Number.parseInt(url.searchParams.get("page") || "1")
  const limit = Number.parseInt(url.searchParams.get("limit") || "20")
  const status = url.searchParams.get("status")
  const type = url.searchParams.get("type")
  const featured = url.searchParams.get("featured")
  const year = url.searchParams.get("year")
  const search = url.searchParams.get("search")

  const filter = { isActive: true }
  if (status) filter.status = status
  if (type) filter.type = type
  if (featured !== null) filter.featured = featured === "true"
  if (year) {
    filter.date = {
      $gte: new Date(`${year}-01-01`),
      $lte: new Date(`${year}-12-31`),
    }
  }
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { organizer: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ]
  }

  try {
    const tournaments = await Tournament.find(filter)
      .sort({ date: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
    const total = await Tournament.countDocuments(filter)

    return NextResponse.json({
      success: true,
      data: tournaments,
      pagination: { current: page, pages: Math.ceil(total / limit), total },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching tournaments", error: error.message },
      { status: 500 },
    )
  }
}
