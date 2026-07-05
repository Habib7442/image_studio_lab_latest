"use server";

import { writeClient } from "@/lib/sanity/client";
import { auth } from "@clerk/nextjs/server";

interface SaveCatalogResponse {
  success: boolean;
  id?: string;
  error?: string;
}

/**
 * Server Action to persist lookbook data securely inside the Sanity Content Lake database.
 */
export async function saveCatalogAction(
  catalogData: {
    title: string;
    subtitle: string;
    brandName: string;
    palettePreset: string;
    pages: any[];
  },
  catalogId?: string
): Promise<SaveCatalogResponse> {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: "Unauthorized. Please sign in to save publications." };
  }

  if (!catalogData.title || !catalogData.brandName || !catalogData.pages) {
    return { success: false, error: "Missing required catalog fields." };
  }

  try {
    const doc = {
      title: catalogData.title,
      subtitle: catalogData.subtitle,
      brandName: catalogData.brandName,
      palettePreset: catalogData.palettePreset,
      pagesJson: JSON.stringify(catalogData.pages),
    };

    let resultId = catalogId;

    if (catalogId) {
      console.log(`[Server Action] Verifying ownership for lookbook ID "${catalogId}"...`);
      const existing = await writeClient.fetch(`*[_type == "catalog" && _id == $id][0]`, { id: catalogId });
      if (!existing) {
        return { success: false, error: "Lookbook not found." };
      }
      if (existing.userId !== userId) {
        return { success: false, error: "Unauthorized. You do not own this lookbook." };
      }

      console.log(`[Server Action] Overwriting lookbook ID "${catalogId}"...`);
      await writeClient.patch(catalogId).set(doc).commit();
    } else {
      console.log(`[Server Action] Persisting new lookbook in Sanity...`);
      const newDoc = {
        _type: "catalog",
        ...doc,
        userId: userId,
      };
      const result = await writeClient.create(newDoc);
      resultId = result._id;
    }

    console.log("[Server Action] Saved lookbook successfully. Sanity ID:", resultId);

    return {
      success: true,
      id: resultId,
    };
  } catch (error: any) {
    console.error("[Server Action] Error saving lookbook to Sanity:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred while saving the lookbook to Sanity.",
    };
  }
}
