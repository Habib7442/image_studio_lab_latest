import { MetadataRoute } from 'next';
import { client } from '@/lib/sanity/client';
import { allPacksQuery } from '@/lib/sanity/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://imagestudiolab.com';

  // Fetch all packs from Sanity
  let packs = [];
  try {
    packs = await client.fetch(allPacksQuery);
  } catch (error) {
    console.error('Error fetching packs for sitemap:', error);
  }

  const packUrls = packs.map((pack: any) => ({
    url: `${baseUrl}/packs/${pack.slug.current}`,
    lastModified: new Date(pack._updatedAt || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/packs`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.1,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.1,
    },
    {
      url: `${baseUrl}/write-review`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ];

  return [...staticUrls, ...packUrls];
}
