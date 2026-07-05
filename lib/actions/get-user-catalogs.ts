"use server";

import { client } from "@/lib/sanity/client";
import { auth } from "@clerk/nextjs/server";

interface UserCatalogsResponse {
  success: boolean;
  data?: any[];
  error?: string;
}

/**
 * Server Action to fetch lookbooks saved by the currently authenticated user.
 */
export async function getUserCatalogsAction(): Promise<UserCatalogsResponse> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized. Please sign in to fetch publications." };
    }

    console.log(`[Server Action] Fetching saved lookbooks for authenticated user...`);
    const query = `*[_type == "catalog" && userId == $userId] | order(_createdAt desc) {
      _id,
      title,
      subtitle,
      brandName,
      palettePreset,
      pagesJson,
      views,
      _createdAt
    }`;

    const result = await client.fetch(query, { userId });

    const formatted = result.map((doc: any) => {
      let pages = [];
      try {
        pages = doc.pagesJson ? JSON.parse(doc.pagesJson) : [];
      } catch (parseErr) {
        console.error(`Failed to parse pagesJson for catalog ${doc._id}:`, parseErr);
      }
      return {
        _id: doc._id,
        title: doc.title,
        subtitle: doc.subtitle,
        brandName: doc.brandName,
        palettePreset: doc.palettePreset,
        pages,
        views: doc.views || 0,
        _createdAt: doc._createdAt,
      };
    });

    return {
      success: true,
      data: formatted,
    };
  } catch (error: any) {
    console.error("[Server Action] Error fetching user lookbooks:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred while fetching your lookbooks.",
    };
  }
}
