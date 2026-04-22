"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  TrendingUp,
  BookOpen,
  ArrowRight,
  Zap,
  Lock,
  Search,
  User,
  LogOut,
  CheckCircle,
  FileText,
  Brain,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.user) setUser(data.user);
      } catch {}
    }
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.refresh();
  };

  const domains = [
    {
      title: "Finance Assistant",
      description:
        "Analyze balance sheets, P&L statements, and model risk scenarios with unmatched precision.",
      icon: TrendingUp,
      color: "finance" as const,
      iconColor: "text-finance-primary",
      bgColor: "bg-finance-light",
      borderColor: "hover:border-finance-primary/30",
      features: ["Risk Reporting", "Scenario Modeling", "Portfolio Analysis"],
      link: "/build?domain=finance",
    },
    {
      title: "Legal Assistant",
      description:
        "Extract clauses, review contracts, and generate compliance audit trails automatically.",
      icon: Shield,
      color: "legal" as const,
      iconColor: "text-legal-primary",
      bgColor: "bg-legal-light",
      borderColor: "hover:border-legal-primary/30",
      features: ["Clause Extraction", "Audit Trails", "Compliance Checks"],
      link: "/build?domain=legal",
    },
    {
      title: "General Assistant",
      description:
        "Broad intelligence for research, drafting, and cross-domain knowledge synthesis.",
      icon: BookOpen,
      color: "general" as const,
      iconColor: "text-general-primary",
      bgColor: "bg-general-light",
      borderColor: "hover:border-general-primary/30",
      features: ["Research", "Drafting", "Knowledge Synthesis"],
      link: "/build?domain=general",
    },
  ];

  const trustFeatures = [
    {
      icon: Lock,
      title: "Strict Isolation",
      description:
        "Key-based access ensures your data never leaks between domains or users.",
    },
    {
      icon: Search,
      title: "Source Grounding",
      description:
        "Every response is traced back to specific pages in your source documents.",
    },
    {
      icon: Shield,
      title: "Compliance Ready",
      description:
        "Automatic audit trails for legal and financial accountability.",
    },
    {
      icon: Brain,
      title: "Reasoning Trace",
      description:
        "See exactly how the AI arrived at each answer with step-by-step reasoning.",
    },
    {
      icon: FileText,
      title: "Document Aware",
      description:
        "Understands PDFs, Excel files, and documents in full context.",
    },
    {
      icon: Zap,
      title: "Instant Deployment",
      description:
        "Upload documents and get a production-ready assistant in minutes.",
    },
  ];

  return (
    <div className="min-h-screen page-bg">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
                <Zap className="w-4 h-4 text-white fill-current" />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">
                Tri mind
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="#features"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </Link>
              <Link
                href="#security"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Security
              </Link>
              <Link
                href="/dashboard"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
              <Separator orientation="vertical" className="h-4" />
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border text-sm">
                    <User className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-foreground font-medium max-w-[140px] truncate">
                      {user.email}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-1.5" />
                    Logout
                  </Button>
                  <Link href="/dashboard">
                    <Button size="sm">Dashboard</Button>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login">
                    <Button variant="ghost" size="sm">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/build">
                    <Button size="sm">
                      Get Started
                      <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-3">
            <Link href="#features" className="block text-sm text-muted-foreground hover:text-foreground py-1">Features</Link>
            <Link href="#security" className="block text-sm text-muted-foreground hover:text-foreground py-1">Security</Link>
            <Link href="/dashboard" className="block text-sm text-muted-foreground hover:text-foreground py-1">Dashboard</Link>
            <Separator />
            {user ? (
              <div className="flex flex-col gap-2 pt-2">
                <span className="text-sm text-muted-foreground">{user.email}</span>
                <Button variant="outline" size="sm" onClick={handleLogout} className="w-full">Logout</Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link href="/login"><Button variant="outline" size="sm" className="w-full">Log in</Button></Link>
                <Link href="/build"><Button size="sm" className="w-full">Get Started</Button></Link>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-legal-primary/6 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-xs font-medium border border-border">
              ✦ Next-Generation Domain Intelligence
            </Badge>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.05]">
              AI Assistants Built for{" "}
              <span className="gradient-text">Your Domain</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Stop using generic AI. Build specialized agents trained on your
              financial data or legal documents — with strict isolation and
              verifiable reasoning.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
              <Link href="/build">
                <Button size="xl" className="rounded-full px-8 font-semibold shadow-lg shadow-primary/20 group">
                  Build Your Assistant
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="xl" variant="outline" className="rounded-full px-8 font-semibold">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Domain Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="features">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-3">
            Choose Your Domain
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Each assistant is purpose-built for its domain — with specialized
            knowledge, reasoning patterns, and output formats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {domains.map((domain, index) => (
            <motion.div
              key={domain.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
            >
              <Link href={domain.link} className="block h-full group">
                <div
                  className={cn(
                    "h-full rounded-2xl border border-border bg-card p-6 card-shadow-md transition-all duration-200",
                    "hover:-translate-y-1 hover:card-shadow-lg",
                    domain.borderColor
                  )}
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center mb-5",
                      domain.bgColor
                    )}
                  >
                    <domain.icon
                      className={cn("w-6 h-6", domain.iconColor)}
                    />
                  </div>

                  <h3 className="text-xl font-bold mb-2">{domain.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    {domain.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {domain.features.map((f) => (
                      <Badge key={f} variant={domain.color} className="text-xs">
                        {f}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0 transition-transform duration-200">
                    Start Building
                    <ChevronRight className="ml-1 w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Security / Trust Section */}
      <section
        id="security"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4">
              Enterprise-Grade Security
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight mb-3">
              Built with Trust at Its Core
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Your documents and data are isolated, encrypted, and never mixed
              between assistants.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trustFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="bg-card rounded-xl p-5 border border-border card-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold mb-1.5">{feature.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-2xl bg-primary p-10 card-shadow-lg">
            <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">
              Ready to deploy your first assistant?
            </h2>
            <p className="text-primary-foreground/75 mb-8 text-lg">
              Upload your documents and get a secure, domain-aware AI assistant
              in under 5 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/build">
                <Button size="xl" variant="secondary" className="rounded-full font-semibold">
                  Build for Free
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="mt-6 flex items-center justify-center gap-6 text-primary-foreground/60 text-sm">
              {["No credit card", "Instant setup", "Secure by default"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white fill-current" />
            </div>
            <span className="text-sm font-semibold">Tri mind</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 Tri mind Intelligent Systems.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/login" className="hover:text-foreground transition-colors">Login</Link>
            <Link href="/build" className="hover:text-foreground transition-colors">Build</Link>
            <Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
