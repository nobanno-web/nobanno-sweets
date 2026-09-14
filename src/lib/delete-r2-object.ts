// src/lib/delete-r2-object.ts
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { r2Client } from "@/lib/r2";

export async function deleteR2Object(publicUrl: string | null | undefined) {
  if (!publicUrl) return;

  const key = publicUrl.replace(`${process.env.R2_PUBLIC_URL}/`, "");
  if (!key || key === publicUrl) return; // safety: don't attempt on malformed/foreign URLs

  try {
    await r2Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: key,
      }),
    );
  } catch (err) {
    // Don't let a failed R2 delete break the actual DB update —
    // log it, but the orphaned file is a minor cleanup issue, not
    // worth failing the user's action over.
    console.error("[R2] Failed to delete object:", key, err);
  }
}