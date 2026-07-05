"use server";

import { writeClient } from "@/lib/sanity/client";
import { auth } from "@clerk/nextjs/server";

interface TogglePublicResponse {
  success: boolean;
  error?: string;
}

/**
 * Server Action to securely publish/unpublish a lookbook in the Sanity Content Lake database.
 * Validates ownership before performing database mutation.
 */
export async function toggleCatalogPublicAction(
  id: string,
  isPublic: boolean
): Promise<TogglePublicResponse> {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: "Unauthorized. Please sign in to edit publications." };
  }

  try {
    console.log(`[Server Action] Toggling isPublic to ${isPublic} for lookbook ID "${id}"...`);
    
    // Verify ownership before updating!
    const existing = await writeClient.fetch(`*[_type == "catalog" && _id == $id][0]`, { id });
    if (!existing) {
      return { success: false, error: "Lookbook not found." };
    }
    if (existing.userId !== userId) {
      return { success: false, error: "Unauthorized. You do not own this lookbook." };
    }

    await writeClient.patch(id).set({ isPublic }).commit();
    console.log(`[Server Action] Successfully toggled isPublic to ${isPublic} for lookbook "${id}"`);

    return {
      success: true,
    };
  } catch (error: any) {
    console.error("[Server Action] Error toggling lookbook public status:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred while toggling public status.",
    };
  }
}
