import type { APIRoute } from 'astro';

import {
  createCanonicalUrl,
  therapyPracticeSiteMetadata,
} from '@/config/site-metadata';

export const GET: APIRoute = () => {
  const robotsLines = therapyPracticeSiteMetadata.robots.isTemporaryNoindexEnabled
    ? [
        'User-agent: *',
        'Allow: /',
        `Sitemap: ${createCanonicalUrl('sitemap-index.xml')}`,
      ]
    : [
        'User-agent: *',
        'Allow: /',
        `Sitemap: ${createCanonicalUrl('sitemap-index.xml')}`,
      ];

  return new Response(`${robotsLines.join('\n')}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
