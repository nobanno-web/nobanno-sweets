// src/lib/upload-image.ts
import { getUploadUrl } from "@/lib/get-upload-url";

export async function uploadImage(file: File, folder: Parameters<typeof getUploadUrl>[2]): Promise<string> {
  const { uploadUrl, publicUrl } = await getUploadUrl(file.name, file.type, folder);

  const res = await fetch(uploadUrl, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": file.type },
  });

  if (!res.ok) {
    throw new Error("Upload failed");
  }

  return publicUrl;
}