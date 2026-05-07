"use server";

import { writeClient } from "@/lib/sanity/client";
import { revalidatePath } from "next/cache";

export async function submitReview(formData: FormData) {
  const name = formData.get("name") as string;
  const rating = Number(formData.get("rating"));
  const comment = formData.get("comment") as string;
  const packId = formData.get("packId") as string;

  if (!name || !rating || !comment) {
    return { success: false, error: "Please fill in all required fields." };
  }

  try {
    await writeClient.create({
      _type: "review",
      name,
      rating,
      comment,
      pack: packId ? {
        _type: "reference",
        _ref: packId,
      } : undefined,
      approved: false, // Default to false for moderation
    });

    revalidatePath("/packs");
    return { success: true };
  } catch (error) {
    console.error("Sanity Review Submission Error:", error);
    return { success: false, error: "Failed to submit review. Please try again later." };
  }
}
