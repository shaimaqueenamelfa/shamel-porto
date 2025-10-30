import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Abaikan semua error linting saat build
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ Abaikan error TypeScript saat build
  },
  images: {
    domains: ["avatars.githubusercontent.com"], // daftarkan domain eksternal
  },
};

export default nextConfig;
