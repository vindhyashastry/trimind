import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Toaster } from "sonner";

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
      >
        <AuroraBackground className="w-full min-h-screen flex flex-col justify-start items-stretch bg-zinc-50/50">
          <div className="relative z-10 flex-1 flex flex-col min-h-screen">
            {children}
          </div>
        </AuroraBackground>
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
