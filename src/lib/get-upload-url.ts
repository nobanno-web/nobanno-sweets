// src/lib/get-upload-url.ts
"use server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2Client } from "@/lib/r2";
import { auth } from "@/auth";
import { AppError } from "@/errors/app.error";

type Folder = "products" | "gallery" | "hero-slides" | "story" | "owner" | "welcome-modal" | "locations";

export async function getUploadUrl(fileName: string, fileType: string, folder: Folder) {
  const session = await auth();
  if (!session?.user) {
    throw new AppError("UNAUTHORIZED", "Not authenticated", 401);
  }

  const safeName = fileName.replace(/[^a-zA-Z0-9.]/g, "-");
  const key = `${folder}/${Date.now()}-${safeName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: key,
    ContentType: fileType,
  });

  const uploadUrl = await getSignedUrl(r2Client, command, { expiresIn: 300 });
  const publicUrl = `${process.env.R2_PUBLIC_URL}/${key}`;

  return { uploadUrl, publicUrl };
}