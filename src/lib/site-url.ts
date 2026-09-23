/**
 * URL publique du site.
 * Priorité : NEXT_PUBLIC_SITE_URL (défini manuellement) > URL fournie par
 * Vercel au build > localhost en développement uniquement.
 * Aucune URL n'est codée en dur pour la production.
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}
