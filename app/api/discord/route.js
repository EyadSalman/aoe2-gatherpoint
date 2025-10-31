// app/api/discord/route.js
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import DiscordServer from "@/models/DiscordServer";
export const runtime = "nodejs"; // ✅ ensure Node APIs like mongoose work

// ============================================
// GET /api/discord
// ============================================
export async function GET(req) {
  await connectDB();
  const url = new URL(req.url);
  const featured = url.searchParams.get("featured");
  const category = url.searchParams.get("category");

  const filter = { isActive: true };
  if (featured !== null) filter.featured = featured === "true";
  if (category) filter.category = category;

  try {
    const servers = await DiscordServer.find(filter).sort({
      featured: -1,
      memberCount: -1,
    });
    return NextResponse.json({ success: true, data: servers });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching Discord servers", error: error.message },
      { status: 500 }
    );
  }
}

// ============================================
// POST /api/discord
// ============================================
export async function POST(req) {
  await dbConnect();
  try {
    const data = await req.json();
    const server = await DiscordServer.create(data);
    return NextResponse.json({
      success: true,
      data: server,
      message: "Discord server created successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error creating Discord server", error: error.message },
      { status: 400 }
    );
  }
}

// ============================================
// PUT /api/discord?id=<serverId>
// ============================================
export async function PUT(req) {
  await dbConnect();
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  try {
    const updates = await req.json();
    const server = await DiscordServer.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!server)
      return NextResponse.json({ success: false, message: "Discord server not found" }, { status: 404 });

    return NextResponse.json({
      success: true,
      data: server,
      message: "Discord server updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error updating Discord server", error: error.message },
      { status: 400 }
    );
  }
}

// ============================================
// DELETE /api/discord?id=<serverId>
// ============================================
export async function DELETE(req) {
  await dbConnect();
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  try {
    const server = await DiscordServer.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (!server)
      return NextResponse.json({ success: false, message: "Discord server not found" }, { status: 404 });

    return NextResponse.json({ success: true, message: "Discord server deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error deleting Discord server", error: error.message },
      { status: 500 }
    );
  }
}
