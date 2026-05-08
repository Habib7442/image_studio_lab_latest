import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/studio/'],
    },
    sitemap: 'https://imagestudiolab.com/sitemap.xml',
  };
}
