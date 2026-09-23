/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  images: {
    // Démo frontend : pas d'optimisation serveur.
    // En production (Vercel / CDN), retirer cette ligne pour activer l'optimisation.
    unoptimized: true,
  },
};

export default nextConfig;
