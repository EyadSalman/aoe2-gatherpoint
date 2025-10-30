// app/api/leaderboard/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Leaderboard from "@/models/Leaderboard";
export const runtime = "nodejs"; // ✅ ensure Node APIs like mongoose work


/**
 * GET /api/leaderboard/recent
 * Fetches recent tournament results
 */
export async function GET(req) {
  await connectDB();

  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "10");
  const search = url.searchParams.get("search");

  const filter = { isActive: true };
  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  try {
    const tournaments = await Leaderboard.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    const total = await Leaderboard.countDocuments(filter);

    return NextResponse.json({
      success: true,
      data: tournaments,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching leaderboard", error: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/leaderboard
 * Adds a new tournament result (admin only)
 */
export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const newTournament = await Leaderboard.create(body);
    return NextResponse.json({ success: true, data: newTournament }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error adding tournament", error: error.message },
      { status: 400 }
    );
  }
}
