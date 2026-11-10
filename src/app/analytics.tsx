import Script from 'next/script';

export default function Analytics() {
  // Public site identifier from Cloudflare's embed snippet, not an API secret.
  const token = (process.env.CLOUDFLARE_WEB_ANALYTICS_TOKEN ?? '46bb1370ff1c4a829916f3d486ed8877').trim();
  if (process.env.NODE_ENV !== 'production' || !token) return null;

  return <Script
    id="cloudflare-web-analytics"
    type="module"
    src="https://static.cloudflareinsights.com/beacon.min.js"
    strategy="afterInteractive"
    data-cf-beacon={JSON.stringify({ token })}
  />;
}
