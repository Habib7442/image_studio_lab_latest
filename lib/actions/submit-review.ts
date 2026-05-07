"use server";

import { writeClient } from "@/lib/sanity/client";
import { revalidatePath } from "next/cache";

export async function submitReview(formData: FormData) {
  const name = formData.get("name") as string;
  const rating = Number(formData.get("rating"));
  const comment = formData.get("comment") as string;
  const packId = formData.get("packId") as string;
  const avatarFile = formData.get("avatar") as File;

  if (!name || !rating || !comment) {
    return { success: false, error: "Please fill in all required fields." };
  }

  try {
    let avatarAsset;
    
    // Upload avatar if provided
    if (avatarFile && avatarFile.size > 0) {
      avatarAsset = await writeClient.assets.upload("image", avatarFile, {
        filename: avatarFile.name,
      });
    }

    await writeClient.create({
      _type: "review",
      name,
      rating,
      comment,
      avatar: avatarAsset ? {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: avatarAsset._id,
        },
      } : undefined,
      pack: packId ? {
        _type: "reference",
        _ref: packId,
      } : undefined,
      approved: false, // Default to false for moderation
    });

    revalidatePath("/write-review");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Sanity Review Submission Error:", error);
    return { success: false, error: "Failed to submit review. Please try again later." };
  }
}
