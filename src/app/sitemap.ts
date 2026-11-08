import type { MetadataRoute } from 'next';
import { routes, type PageKind } from './site';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://oceanclean.com.tr';
  return (Object.keys(routes.tr) as PageKind[]).flatMap(page => (['tr', 'en'] as const).map(lang => ({ url: base + routes[lang][page], alternates: { languages: { tr: base + routes.tr[page], en: base + routes.en[page] } } })));
}
