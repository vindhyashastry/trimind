import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Tri mind | Intelligent Domain Assistants",
  description: "Build specialized domain-aware AI assistants for finance, legal, and beyond.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ colorScheme: "light" }}>
      <body
        className={cn(
          inter.variable,
          "font-sans antialiased min-h-screen"
        )}
        style={{
          backgroundColor: "hsl(0 0% 99%)",
          color: "hsl(222 47% 11%)",
        }}
      >
        {children}
      </body>
    </html>
  );
}
