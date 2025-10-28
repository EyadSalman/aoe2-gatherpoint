import { promises as fs } from "fs"
import path from "path"

/**
 * Save an uploaded file from a Next.js API route (formData) to /public/uploads
 * 
 * @param {File} file - The uploaded File object
 * @param {string} subfolder - Optional subfolder e.g. "avatars" or "maps"
 * @returns {Promise<string>} - Returns the relative file path (e.g. /uploads/avatars/filename.png)
 */
export async function saveFile(file, subfolder = "") {
  if (!file) throw new Error("No file provided")

  const uploadDir = path.join(process.cwd(), "public", "uploads", subfolder)
  await fs.mkdir(uploadDir, { recursive: true })

  const buffer = Buffer.from(await file.arrayBuffer())
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`
  const filePath = path.join(uploadDir, fileName)
  await fs.writeFile(filePath, buffer)

  const relativePath = `/uploads/${subfolder ? subfolder + "/" : ""}${fileName}`
  return relativePath
}
