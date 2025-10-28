// app/api/admin/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import Tournament from "@/models/Tournament";
import Player from "@/models/Player";
import Map from "@/models/Map";
import DiscordServer from "@/models/DiscordServer";

// ============================================
// GET /api/admin/dashboard
// ============================================
export async function GET(req) {
  const user = await requireAuth(req);
  if (user instanceof NextResponse) return user; // if unauthorized

  await connectDB();
  try {
    const [
      totalTournaments,
      totalPlayers,
      totalMaps,
      totalDiscordServers,
      recentTournaments,
      topPlayers,
    ] = await Promise.all([
      Tournament.countDocuments({ isActive: true }),
      Player.countDocuments({ isActive: true }),
      Map.countDocuments({ isActive: true }),
      DiscordServer.countDocuments({ isActive: true }),
      Tournament.find({ isActive: true })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("winner", "name"),
      Player.find({ isActive: true }).sort({ rating: -1 }).limit(5),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalTournaments,
          totalPlayers,
          totalMaps,
          totalDiscordServers,
        },
        recentTournaments,
        topPlayers,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching dashboard", error: error.message },
      { status: 500 }
    );
  }
}

// ============================================
// POST /api/admin/tournaments/bulk-update
// ============================================
export async function POST(req) {
  const user = await requireAuth(req);
  if (user instanceof NextResponse) return user;

  await connectDB();
  const url = new URL(req.url);
  const path = url.pathname;

  try {
    const body = await req.json();

    if (path.endsWith("tournaments/bulk-update")) {
      const { ids, updates } = body;
      const result = await Tournament.updateMany({ _id: { $in: ids } }, updates, {
        runValidators: true,
      });
      return NextResponse.json({
        success: true,
        message: `Updated ${result.modifiedCount} tournaments`,
      });
    }

    if (path.endsWith("players/bulk-update")) {
      const { ids, updates } = body;
      const result = await Player.updateMany({ _id: { $in: ids } }, updates, {
        runValidators: true,
      });
      return NextResponse.json({
        success: true,
        message: `Updated ${result.modifiedCount} players`,
      });
    }

    if (path.endsWith("seed-data")) {
      return NextResponse.json({
        success: true,
        message: "Data seeding endpoint hit successfully",
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid endpoint" },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Admin request failed", error: error.message },
      { status: 400 }
    );
  }
}
