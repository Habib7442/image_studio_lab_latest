"use server";

import { writeClient } from "@/lib/sanity/client";
import { auth } from "@clerk/nextjs/server";

interface DeleteCatalogResponse {
  success: boolean;
  error?: string;
}

/**
 * Server Action to securely delete a lookbook publication from Sanity.
 * Validates ownership before performing database mutation.
 */
export async function deleteCatalogAction(id: string): Promise<DeleteCatalogResponse> {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: "Unauthorized. Please sign in to delete publications." };
  }

  try {
    console.log(`[Server Action] Deleting lookbook ID "${id}"...`);
    
    // Verify ownership before deleting!
    const existing = await writeClient.fetch(`*[_type == "catalog" && _id == $id][0]`, { id });
    if (!existing) {
      return { success: false, error: "Lookbook not found." };
    }
    if (existing.userId !== userId) {
      return { success: false, error: "Unauthorized. You do not own this lookbook." };
    }

    // 1. Clean up associated image assets from Sanity storage to prevent space leaks
    if (existing.pagesJson) {
      try {
        const matches = [...existing.pagesJson.matchAll(/https:\/\/cdn\.sanity\.io\/images\/[a-z0-9]+\/[a-z0-9]+\/([a-f0-9]+-[0-9]+x[0-9]+)\.([a-z]+)/gi)];
        const assetIds = Array.from(new Set(matches.map(m => `image-${m[1]}-${m[2]}`)));
        if (assetIds.length > 0) {
          console.log(`[Server Action] Cleaning up ${assetIds.length} orphaned image assets for lookbook "${id}"...`);
          await Promise.all(
            assetIds.map(async (assetId) => {
              try {
                await writeClient.delete(assetId);
              } catch (err) {
                console.warn(`[Server Action] Failed to delete orphaned asset ${assetId}:`, err);
              }
            })
          );
        }
      } catch (e) {
        console.error("[Server Action] Error parsing pagesJson for asset cleanup:", e);
      }
    }

    // 2. Delete the catalog document itself
    await writeClient.delete(id);
    console.log("[Server Action] Deleted lookbook successfully from Sanity:", id);

    return {
      success: true,
    };
  } catch (error: any) {
    console.error("[Server Action] Error deleting lookbook from Sanity:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred while deleting the lookbook.",
    };
  }
}
