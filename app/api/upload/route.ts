import { writeClient } from "@/lib/sanity/client";
import { NextResponse } from "next/server";

/**
 * API Route Handler to upload base64 images to Sanity from the client.
 * This completely bypasses React Server Component (RSC) parameter serialization limitations.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { imageUrls } = body;

    if (!imageUrls || !Array.isArray(imageUrls)) {
      return NextResponse.json(
        { success: false, error: "No images provided or invalid format." },
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

            const asset = await writeClient.assets.upload("image", buffer, {
              filename: `reference-${Date.now()}-${index}.png`,
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
