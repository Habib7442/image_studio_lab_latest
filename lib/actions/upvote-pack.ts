"use server";

import { writeClient } from "@/lib/sanity/client";
import { revalidatePath } from "next/cache";

export async function upvotePack(packId: string) {
  if (!packId) return { success: false };

  try {
    // Increment upvotes in Sanity
    await writeClient
      .patch(packId)
      .setIfMissing({ upvotes: 0 })
      .inc({ upvotes: 1 })
      .commit();

    revalidatePath("/packs");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Upvote Error:", error);
    return { success: false };
  }
}
