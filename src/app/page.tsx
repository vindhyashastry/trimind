"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, TrendingUp, BookOpen, ArrowRight, Zap, Lock, Search, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.user) setUser(data.user);
      } catch (err) {
        console.error("Auth check failed:", err);
      }
    }
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const domains = [
    {
      title: "Finance Assistant",
      description: "Optimized for balance sheets, P&L statements, and market analysis with 'What-If' scenario modeling.",
      icon: <TrendingUp className="w-8 h-8 text-finance-primary" />,
      color: "finance",
      features: ["Risk Reporting", "Scenario Modeling"],
      link: "/build?domain=finance",
    },
    {
      title: "Legal Assistant",
      description: "Expert at contract analysis, clause extraction, and generating verifiable compliance audit trails.",
      icon: <Shield className="w-8 h-8 text-legal-primary" />,
      color: "legal",
      features: ["Audit Trails", "Clause Extraction"],
      link: "/build?domain=legal",
    },
    {
      title: "General Assistant",
      description: "Broad intelligence for research, drafting, and cross-domain knowledge synthesis.",
      icon: <BookOpen className="w-8 h-8 text-primary" />,
      color: "default",
      features: ["Web Access", "General Logic"],
      link: "/build?domain=general",
    },
  ];

  return (
    <div className="relative min-h-screen bg-background overflow-hidden selection:bg-primary/20">
      {/* Background Gradients */}
      <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-finance-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-legal-primary/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-finance-primary to-legal-primary rounded-xl flex items-center justify-center shadow-lg">
            <Zap className="text-white w-6 h-6 fill-current" />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-glow">Tri mind</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
          <Link href="#security" className="hover:text-primary transition-colors">Security</Link>
          <Link href="/dashboard" className="hover:text-primary transition-colors">My Dashboard</Link>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <User className="w-3 h-3 text-primary" />
                  <span className="text-xs font-medium">{user.email}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="rounded-full text-muted-foreground hover:text-primary">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
                <Link href="/dashboard">
                  <Button variant="glass" className="rounded-full">Dashboard</Button>
                </Link>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="rounded-full px-6">Login</Button>
                </Link>
                <Link href="/build">
                  <Button variant="glass" className="rounded-full">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center px-4 pt-20 pb-10 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="secondary" className="mb-4 py-1 px-4 border-white/10 glass">
            ✨ Next-Gen Domain Intelligence
          </Badge>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            Intelligent Domain <br /> Personal Assistants
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop using generic AI. Build specialized agents trained on your financial data or legal documents with strict isolation and verifiable reasoning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link href="/build">
              <Button size="lg" className="rounded-full px-8 text-lg font-semibold group">
                Build Your Assistant
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="rounded-full px-8 text-lg glass text-primary border-primary/20 hover:bg-primary/5">
                Connect to Your Domain
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Domain Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 w-full">
          {domains.map((domain, index) => (
            <motion.div
              key={domain.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <Link href={domain.link} className="block h-full">
                <Card className="h-full border-white/5 hover:border-white/20 hover:scale-[1.02] transition-all cursor-pointer group">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="mb-6 p-4 rounded-2xl bg-white/[0.03] w-fit group-hover:bg-white/[0.08] transition-colors">
                      {domain.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{domain.title}</h3>
                    <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                      {domain.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {domain.features.map(f => (
                        <Badge key={f} variant={domain.color as any} className="text-[10px] uppercase tracking-widest">
                          {f}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-auto flex items-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 transition-transform">
                      View Pipeline <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </section>

        {/* Security / Trust Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-4xl border-t border-white/5 pt-20"
        >
          <div className="flex flex-col items-center gap-4">
            <Lock className="w-10 h-10 text-muted-foreground/40" />
            <div className="text-center">
              <h4 className="font-bold mb-1">Strict Isolation</h4>
              <p className="text-xs text-muted-foreground">Key-based access ensures data never leaks between domains.</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <Search className="w-10 h-10 text-muted-foreground/40" />
            <div className="text-center">
              <h4 className="font-bold mb-1">Source Grounding</h4>
              <p className="text-xs text-muted-foreground">Every response is mapped back to your specific source docs.</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <Shield className="w-10 h-10 text-muted-foreground/40" />
            <div className="text-center">
              <h4 className="font-bold mb-1">Compliance Ready</h4>
              <p className="text-xs text-muted-foreground">Automatic audit trails for legal and financial accountability.</p>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="mt-40 border-t border-white/5 py-12 text-center text-sm text-muted-foreground">
        <p>© 2026 Tri mind Intelligent Systems. Built for Final Year Excellence.</p>
      </footer>
    </div>
  );
}
