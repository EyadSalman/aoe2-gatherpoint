// app/api/players/route.js
import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Player from "@/models/Player"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const runtime = "nodejs" // ✅ ensure Node APIs like mongoose work

export async function GET(req) {
  await connectDB()

  const url = new URL(req.url)
  const page = Number.parseInt(url.searchParams.get("page") || "1")
  const limit = Number.parseInt(url.searchParams.get("limit") || "1000")
  const search = url.searchParams.get("search")
  const country = url.searchParams.get("country")
  const sortBy = url.searchParams.get("sortBy") || "name"
  const sortOrder = url.searchParams.get("sortOrder") === "desc" ? -1 : 1
  const minRating = url.searchParams.get("minRating")
  const maxRating = url.searchParams.get("maxRating")

  const filter = { isActive: true }
  if (country) filter.country = country
  if (search) {
    filter.$or = [{ name: { $regex: search, $options: "i" } }, { country: { $regex: search, $options: "i" } }]
  }
  if (minRating || maxRating) {
    filter.rating = {}
    if (minRating) filter.rating.$gte = +minRating
    if (maxRating) filter.rating.$lte = +maxRating
  }

  try {
    const players = await Player.find(filter)
      .sort({ [sortBy]: sortOrder })
      .limit(limit)
      .skip((page - 1) * limit)
    const total = await Player.countDocuments(filter)

    return NextResponse.json({
      success: true,
      data: players,
      pagination: { current: page, pages: Math.ceil(total / limit), total },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching players", error: error.message },
      { status: 500 },
    )
  }
}
