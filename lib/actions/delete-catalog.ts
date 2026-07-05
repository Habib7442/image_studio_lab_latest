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
