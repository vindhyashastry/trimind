import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,
  serverExternalPackages: ["pdf-parse"],
  turbopack: {
    root: "C:\\Users\\Vindhya M D\\.gemini\\antigravity\\scratch\\domain-pa"
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "recharts"]
  }
};

export default nextConfig;
