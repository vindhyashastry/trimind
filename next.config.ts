import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,
  serverExternalPackages: ["pdf-parse"],
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "recharts"]
  }
};

export default nextConfig;
