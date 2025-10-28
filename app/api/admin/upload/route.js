import { NextResponse } from "next/server"
import { saveFile } from "@/lib/upload"

export async function POST(req) {
  try {
    const formData = await req.formData()
    const file = formData.get("file")
    const type = formData.get("type") || "avatars" // optional field

    if (!file) {
      return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 })
    }

    const fileUrl = await saveFile(file, type)
    return NextResponse.json({
      success: true,
      data: { url: fileUrl },
      message: `${type} uploaded successfully`,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "File upload failed", error: error.message },
      { status: 500 }
    )
  }
}
