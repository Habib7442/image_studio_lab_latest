import { writeClient } from "@/lib/sanity/client";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

const MAX_IMAGE_COUNT = 15;
const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB limit

/**
 * API Route Handler to upload base64 images to Sanity from the client.
 * This completely bypasses React Server Component (RSC) parameter serialization limitations.
 */
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { imageUrls } = body;

    if (!imageUrls || !Array.isArray(imageUrls)) {
      return NextResponse.json(
        { success: false, error: "No images provided or invalid format." },
        { status: 400 }
      );
    }

    // Limit array count to prevent fanout abuse
    if (imageUrls.length > MAX_IMAGE_COUNT) {
      return NextResponse.json(
        { success: false, error: `Batch upload exceeds maximum limit of ${MAX_IMAGE_COUNT} images.` },
        { status: 400 }
      );
    }

    console.log(`[API Upload] Processing upload of ${imageUrls.length} reference images to Sanity...`);

    const uploadPromises = imageUrls.map(async (dataUrl, index) => {
      if (!dataUrl.startsWith("data:")) return undefined;

      try {
        const commaIdx = dataUrl.indexOf(",");
        if (commaIdx !== -1) {
          const mimeMatch = dataUrl.substring(0, commaIdx).match(/data:([^;]+);base64/);
          if (mimeMatch) {
            const mimeType = mimeMatch[1];
            const base64Data = dataUrl.substring(commaIdx + 1);
            const buffer = Buffer.from(base64Data, "base64");

            // Limit byte size to prevent memory exhaustion
            if (buffer.length > MAX_IMAGE_SIZE_BYTES) {
              console.warn(`[API Upload] Skipping image ${index}: Size exceeds limit (${(buffer.length / 1024 / 1024).toFixed(2)}MB).`);
              return undefined;
            }

            // Derive correct extension from mime type
            let extension = "png";
            if (mimeType === "image/jpeg" || mimeType === "image/jpg") {
              extension = "jpg";
            } else if (mimeType === "image/webp") {
              extension = "webp";
            } else if (mimeType === "image/gif") {
              extension = "gif";
            } else if (mimeType === "image/svg+xml") {
              extension = "svg";
            }

            const asset = await writeClient.assets.upload("image", buffer, {
              filename: `reference-${Date.now()}-${index}.${extension}`,
              contentType: mimeType,
            });
            return asset.url;
          }
        }
      } catch (uploadErr) {
        console.error(`[API Upload] Sanity upload failed for image index ${index}:`, uploadErr);
      }
      return undefined;
    });

    const results = await Promise.all(uploadPromises);
    const sanityImageUrls = results.filter((url): url is string => !!url);

    console.log(`[API Upload] Successfully uploaded ${sanityImageUrls.length} images to Sanity Content Lake.`);

    return NextResponse.json({
      success: true,
      urls: sanityImageUrls,
    });
  } catch (error: any) {
    console.error("[API Upload] Global upload route failure:", error);
    return NextResponse.json(
      { success: false, error: error.message || "An unexpected error occurred during upload." },
      { status: 500 }
    );
  }
}
