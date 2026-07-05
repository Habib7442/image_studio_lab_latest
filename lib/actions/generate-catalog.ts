"use server";

import { generateCatalogLayout, FALLBACK_CATALOGS } from "@/lib/gemini";
import { writeClient } from "@/lib/sanity/client";

interface GenerateCatalogResponse {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * Next.js Server Action to generate a structured editorial catalog layout.
 * Serves as the secure bridge between the client-side UI and the Gemini LLM pipeline.
 */
export async function generateCatalogAction(
  brief: string,
  palettePreset: string,
  imageUrls?: string[],
  excludeText?: boolean,
  youtubeUrl?: string,
  actionLink?: string,
  actionLinkText?: string,
  preUploadedSanityUrls?: string[]
): Promise<GenerateCatalogResponse> {
  if (!brief || brief.trim().length === 0) {
    return { success: false, error: "Creative brief cannot be empty." };
  }

  if (brief.length > 1000) {
    return { success: false, error: "Brief is too long. Please keep it under 1000 characters." };
  }

  const sanityImageUrls: string[] = preUploadedSanityUrls || [];
  let embedVideoUrl: string | undefined = undefined;

  try {
    // Upload Reference Images to Sanity if provided (fallback)
    if (imageUrls && imageUrls.length > 0 && sanityImageUrls.length === 0) {
      console.log(`[Server Action] Uploading ${imageUrls.length} reference images to Sanity...`);
      const uploadPromises = imageUrls.map(async (dataUrl, index) => {
        if (!dataUrl.startsWith("data:")) return;

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
          console.error(`[Server Action] Sanity upload failed for image at index ${index}:`, uploadErr);
        }
        return undefined;
      });

      const uploadedResults = await Promise.all(uploadPromises);
      uploadedResults.forEach((url) => {
        if (url) sanityImageUrls.push(url);
      });
      console.log("[Server Action] Successfully uploaded reference images to Sanity:", sanityImageUrls);
    }

    // Sanitize YouTube Video URL to extract Embed ID
    if (youtubeUrl && youtubeUrl.trim().length > 0) {
      const match = youtubeUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/);
      if (match) {
        embedVideoUrl = `https://www.youtube.com/embed/${match[1]}`;
        console.log("[Server Action] Sanitized YouTube Video URL to:", embedVideoUrl);
      }
    }

    console.log(`[Server Action] Generating catalog layout for brief: "${brief.substring(0, 60)}..." (Images: ${imageUrls?.length || 0}, Sanity URLs: ${sanityImageUrls.length}, Video: ${!!embedVideoUrl}, Link: ${!!actionLink}, Exclude Text: ${!!excludeText}) under preset "${palettePreset}"`);
    const catalog = await generateCatalogLayout(
      brief,
      palettePreset,
      imageUrls,
      excludeText,
      sanityImageUrls,
      embedVideoUrl,
      actionLink,
      actionLinkText
    );

    if (!catalog || !catalog.pages || catalog.pages.length === 0) {
      return { success: false, error: "Failed to generate valid catalog page structures." };
    }

    return {
      success: true,
      data: catalog
    };
  } catch (error: any) {
    console.error("[Server Action] Catalog Generation API Error. Initiating resilient fallback recovery...", error);
    
    // Load the fallback template matching the selected style preset
    const fallbackCatalog = JSON.parse(
      JSON.stringify(FALLBACK_CATALOGS[palettePreset] || FALLBACK_CATALOGS["earthy-sage"])
    );

    // Map user's uploaded images, video embeds, and CTAs onto the fallback template dynamically
    if (fallbackCatalog && Array.isArray(fallbackCatalog.pages)) {
      // Find the first inner image page index
      const firstInnerImageIdx = fallbackCatalog.pages.findIndex(
        (p: any, idx: number) => p.type === "image" && idx > 0
      );

      for (let i = 0; i < fallbackCatalog.pages.length; i++) {
        const page = fallbackCatalog.pages[i];
        if (page.type === "image") {
          // Inject video on the target inner page only
          if (embedVideoUrl && i === firstInnerImageIdx) {
            page.videoUrl = embedVideoUrl;
          }

          // Inject CTA link on the target inner page only by default
          if (actionLink && i === firstInnerImageIdx) {
            page.link = actionLink;
            page.linkText = actionLinkText || "Shop Now";
          }
        }
      }

      if (sanityImageUrls.length > 0) {
        // Filter out active image pages in fallback
        const activeImagePageIndices = fallbackCatalog.pages
          .map((p: any, idx: number) => (p.type === "image" && !p.videoUrl ? idx : -1))
          .filter((idx: number) => idx !== -1);

        if (activeImagePageIndices.length > 0) {
          // Map Cover Page
          const coverIdx = activeImagePageIndices[0];
          fallbackCatalog.pages[coverIdx].src = sanityImageUrls[0];
          fallbackCatalog.pages[coverIdx].images = [sanityImageUrls[0]];

          const remainingImages = sanityImageUrls.slice(1);
          const remainingPageIndices = activeImagePageIndices.slice(1);

          let imgIdx = 0;
          for (let k = 0; k < remainingPageIndices.length; k++) {
            const pageIdx = remainingPageIndices[k];
            const pagesLeft = remainingPageIndices.length - k;
            const imgsLeft = remainingImages.length - imgIdx;

            if (imgsLeft > pagesLeft && imgsLeft >= 2) {
              const imgA = remainingImages[imgIdx];
              const imgB = remainingImages[imgIdx + 1];
              fallbackCatalog.pages[pageIdx].src = imgA;
              fallbackCatalog.pages[pageIdx].images = [imgA, imgB];
              imgIdx += 2;
            } else if (imgsLeft > 0) {
              const img = remainingImages[imgIdx];
              fallbackCatalog.pages[pageIdx].src = img;
              fallbackCatalog.pages[pageIdx].images = [img];
              imgIdx += 1;
            }
          }
        }
      }
    }

    // Force brandName to match user brief or default
    if (fallbackCatalog) {
      const cleanBrandName = brief.substring(0, 20).replace(/[^\w\s]/gi, "").trim();
      fallbackCatalog.brandName = cleanBrandName || fallbackCatalog.brandName;
    }

    return {
      success: true, // Gracefully recovered
      data: fallbackCatalog,
      error: `Gemini API quota exceeded (status 429). We recovered by generating a fallback layout with your uploaded images.`,
    };
  }
}
