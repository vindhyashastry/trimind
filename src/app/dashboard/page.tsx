"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus, Search, Key, ArrowRight, MessageSquare, Calendar,
    Trash2, LogOut, Link2, TrendingUp, Shield, BookOpen, User,
    LayoutGrid, Loader2, ChevronRight, Settings, Eye, EyeOff, Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ManageConnections } from "@/components/ManageConnections";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Simple, corporate-ready white and blue minimalist Bot SVG
const SimpleBotSVG = () => (
    <svg viewBox="0 0 100 100" className="w-14 h-14">
        {/* Head outer border / shield */}
        <rect x="20" y="25" width="60" height="50" rx="18" fill="#ffffff" stroke="#3b82f6" strokeWidth="4" />
        {/* Blue glass face screen */}
        <rect x="28" y="33" width="44" height="26" rx="8" fill="#3b82f6" fillOpacity="0.08" stroke="#3b82f6" strokeWidth="2" />
        {/* Simple friendly closed eyes */}
        <path d="M38 46 Q42 42 46 46" stroke="#3b82f6" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M54 46 Q58 42 62 46" stroke="#3b82f6" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Tiny clean smile */}
        <path d="M47 53 Q50 56 53 53" stroke="#3b82f6" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Antenna */}
        <line x1="50" y1="25" x2="50" y2="15" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
        <circle cx="50" cy="12" r="4" fill="#3b82f6" />
    </svg>
);

function getDomainConfig(domain: string) {
    switch (domain) {
        case "finance":
            return {
                icon: TrendingUp,
                badge: "finance" as const,
                iconBg: "bg-finance-light/40",
                iconColor: "text-finance-primary",
                label: "Finance",
            };
        case "legal":
            return {
                icon: Shield,
                badge: "legal" as const,
                iconBg: "bg-legal-light/40",
                iconColor: "text-legal-primary",
                label: "Legal",
            };
        default:
            return {
                icon: BookOpen,
                badge: "general" as const,
                iconBg: "bg-general-light/40",
                iconColor: "text-general-primary",
                label: "General",
            };
    }
}

export default function Dashboard() {
    const [assistants, setAssistants] = useState<any[]>([]);
    const [filteredAssistants, setFilteredAssistants] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState<"finance" | "legal" | "general">("finance");
    const [selectedAssistant, setSelectedAssistant] = useState<{ id: string; name: string } | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
    const [unlockingAssistant, setUnlockingAssistant] = useState<any>(null);
    const [unlockInput, setUnlockInput] = useState("");
    const [unlockError, setUnlockError] = useState(false);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    async function loadData() {
        try {
            const meRes = await fetch("/api/auth/me");
            const meData = await meRes.json();

            if (!meData.user) {
                router.push("/login?callback=/dashboard");
                return;
            }
            setUser(meData.user);

            const res = await fetch("/api/user-keys");
            const data = await res.json();
            const list = data.assistants || [];
            setAssistants(list);
            setFilteredAssistants(list);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setMounted(true);
        loadData();
    }, [router]);

    // Handle both activeTab and search query filtering
    useEffect(() => {
        let result = assistants;

        result = result.filter(
            (a) => (a.domain || a.category || "general").toLowerCase() === activeTab
        );

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (a) =>
                    a.name.toLowerCase().includes(q) ||
                    a.accessKey.toLowerCase().includes(q) ||
                    (a.domain || "").toLowerCase().includes(q)
            );
        }

        setFilteredAssistants(result);
    }, [searchQuery, assistants, activeTab]);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this assistant? This cannot be undone.")) return;
        setDeletingId(id);
        try {
            const res = await fetch(`/api/user-keys/${id}`, { method: "DELETE" });
            if (res.ok) {
                setAssistants((prev) => prev.filter((a) => a.id !== id));
                toast.success("Assistant deleted successfully!");
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to delete");
            }
        } catch {
            toast.error("Error deleting assistant");
        } finally {
            setDeletingId(null);
        }
    };

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/");
    };

    const toggleKeyVisibility = (id: string) => {
        setShowKeys(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleUnlockSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (unlockInput === unlockingAssistant.accessKey) {
            router.push(`/chat?key=${unlockingAssistant.accessKey}`);
        } else {
            setUnlockError(true);
            setTimeout(() => setUnlockError(false), 2000);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
        );
    }

    const initials = user?.name
        ? user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
        : user?.email?.[0]?.toUpperCase() || "U";

    return (
        <div className="min-h-screen page-bg">
            {/* Top glassy header */}
            <header className="sticky top-4 z-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="w-full rounded-2xl border border-blue-500/15 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(59,130,246,0.06)] px-6">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-6">
                            <Link href="/" className="flex items-center">
                                <span className="font-black text-xl tracking-tight text-foreground font-sans hover:opacity-85 transition-opacity">Tri mind</span>
                            </Link>
                            <Separator orientation="vertical" className="h-4 bg-blue-500/15" />
                            <nav className="flex items-center gap-4">
                                <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10">
                                    <LayoutGrid className="w-3.5 h-3.5" />
                                    My Assistants
                                </span>
                            </nav>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
                                <Avatar className="h-7 w-7 border border-blue-500/15">
                                    <AvatarFallback className="text-[10px] font-bold bg-blue-500/10 text-blue-700">{initials}</AvatarFallback>
                                </Avatar>
                                <span className="max-w-[160px] truncate font-semibold text-foreground">{user?.name || user?.email}</span>
                            </div>
                            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-xs rounded-full">
                                <LogOut className="w-4 h-4 mr-1.5" />
                                <span>Logout</span>
                            </Button>
                            <Link href="/build">
                                <Button size="sm" className="rounded-full text-xs shadow-lg shadow-blue-500/10 gap-1.5">
                                    <Plus className="w-3.5 h-3.5" />
                                    New Assistant
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Tri-Bot glassy welcome card */}
                <div className="mb-10 w-full rounded-3xl border border-blue-500/15 bg-blue-500/[0.03] backdrop-blur-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-[0_8px_32px_0_rgba(59,130,246,0.04)]">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="w-20 h-20 flex-shrink-0 flex items-center justify-center bg-white rounded-2xl border border-blue-500/10 shadow-sm"
                    >
                        <SimpleBotSVG />
                    </motion.div>
                    <div className="text-center sm:text-left">
                        <h2 className="text-xl font-bold tracking-tight text-foreground">Welcome back, {user?.name || user?.email.split('@')[0]}!</h2>
                        <p className="text-sm text-muted-foreground mt-2 max-w-2xl leading-relaxed">
                            I'm <strong>Tri-Bot</strong>! I've grouped your assistants into Finance, Legal, and General. Click the tabs below to organize your bots or start a secure, source-grounded session.
                        </p>
                    </div>
                </div>

                {/* Organize tabs filter */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-500/10 pb-5">
                    <div className="flex items-center bg-blue-500/[0.03] border border-blue-500/10 p-1.5 rounded-full w-fit overflow-x-auto">
                        {[
                            { id: "finance", label: "Finance Bots" },
                            { id: "legal", label: "Legal Bots" },
                            { id: "general", label: "General Bots" }
                        ].map((tab) => {
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={cn(
                                        "relative px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-colors duration-200 rounded-full whitespace-nowrap",
                                        isActive ? "text-blue-700 font-bold" : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="active-dashboard-tab"
                                            className="absolute inset-0 bg-blue-500/10 border border-blue-500/20 rounded-full"
                                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                                        />
                                    )}
                                    <span className="relative z-10">{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by name or key..."
                            className="pl-9 rounded-full bg-white/50 border-blue-500/10 focus:border-blue-500/30"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Grid List */}
                {filteredAssistants.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-blue-500/10 rounded-3xl bg-blue-500/[0.02]">
                        <div className="w-16 h-16 rounded-2xl bg-white border border-blue-500/10 flex items-center justify-center mb-5 shadow-sm">
                            <SimpleBotSVG />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                            {searchQuery ? "No assistants match your search" : `No ${activeTab} bots created yet`}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-6 text-center max-w-sm px-4">
                            {searchQuery
                                ? "Try a different search term or clear the filter."
                                : `Build your first specialized ${activeTab} assistant to unlock secure, source-grounded document analysis.`}
                        </p>
                        {!searchQuery && (
                            <Link href="/build">
                                <Button className="rounded-full shadow-lg shadow-blue-500/10">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Build Your First Bot
                                </Button>
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredAssistants.map((assistant, index) => {
                            const config = getDomainConfig(assistant.domain || assistant.category || "general");
                            const DomainIcon = config.icon;

                            return (
                                <motion.div
                                    key={assistant.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    <Card className="group h-full flex flex-col border border-blue-500/10 hover:border-blue-500/25 bg-white/50 backdrop-blur-sm hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(59,130,246,0.08)] transition-all duration-300 rounded-2xl overflow-hidden">
                                        <CardHeader className="pb-3">
                                            <div className="flex items-center justify-between gap-4">
                                                <CardTitle className="text-base font-bold tracking-tight text-slate-800 truncate">{assistant.name}</CardTitle>
                                                <div className="flex items-center gap-1.5 flex-shrink-0">
                                                    <Badge variant={config.badge} className="capitalize text-[10px] font-bold rounded-full">
                                                        {config.label}
                                                    </Badge>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7 rounded-full text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                                        onClick={() => handleDelete(assistant.id)}
                                                        disabled={deletingId === assistant.id}
                                                    >
                                                        {deletingId === assistant.id ? (
                                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                        ) : (
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        )}
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="text-xs text-muted-foreground mt-1 flex items-center justify-between bg-blue-500/[0.02] border border-blue-500/5 p-1.5 rounded-lg">
                                                <div className="flex items-center gap-1.5 overflow-hidden">
                                                    <Key className="w-3 h-3 flex-shrink-0 text-blue-500" />
                                                    <code className="text-[10px] font-mono truncate text-slate-600">
                                                        {showKeys[assistant.id] ? assistant.accessKey : assistant.accessKey.replace(/.(?=.{4})/g, "•")}
                                                    </code>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 text-muted-foreground hover:text-foreground"
                                                    onClick={() => toggleKeyVisibility(assistant.id)}
                                                >
                                                    {showKeys[assistant.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                                </Button>
                                            </div>
                                        </CardHeader>

                                        <CardContent className="pb-4 flex-grow">
                                            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground">
                                                <Calendar className="w-3 h-3 text-blue-400" />
                                                <span suppressHydrationWarning>
                                                    Created {mounted ? new Date(assistant.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "..."}
                                                </span>
                                            </div>
                                        </CardContent>

                                        <CardFooter className="pt-0 flex flex-col gap-2 border-t border-blue-500/5 p-4 bg-blue-500/[0.01]">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="w-full justify-start text-xs text-muted-foreground hover:text-foreground rounded-full"
                                                onClick={() => setSelectedAssistant({ id: assistant.id, name: assistant.name })}
                                            >
                                                <Link2 className="w-3.5 h-3.5 mr-2 text-blue-500" />
                                                Manage Connections
                                            </Button>
                                            <Button
                                                className="w-full justify-between rounded-full text-xs"
                                                size="sm"
                                                onClick={() => {
                                                    setUnlockingAssistant(assistant);
                                                    setUnlockInput("");
                                                    setUnlockError(false);
                                                }}
                                            >
                                                <span className="flex items-center gap-2">
                                                    <MessageSquare className="w-3.5 h-3.5" />
                                                    Open Chat
                                                </span>
                                                <ChevronRight className="w-4 h-4" />
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            );
                        })}

                        {/* Add new card wrapper */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: filteredAssistants.length * 0.05 }}
                        >
                            <Link href="/build" className="block h-full">
                                <div className="h-full min-h-[220px] flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-500/15 hover:border-blue-500/35 hover:bg-blue-500/[0.02] transition-all cursor-pointer group p-6 shadow-sm">
                                    <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mb-3 group-hover:bg-blue-500/10 transition-colors">
                                        <Plus className="w-5 h-5 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                                    </div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                                        New Assistant
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    </div>
                )}
            </main>

            {/* Unlock Modal */}
            <AnimatePresence>
                {unlockingAssistant && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                            onClick={() => setUnlockingAssistant(null)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="relative w-full max-w-sm bg-card border border-blue-500/15 rounded-3xl shadow-2xl p-6"
                        >
                            <div className="flex flex-col items-center text-center mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4">
                                    <Lock className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-bold">Unlock {unlockingAssistant.name}</h3>
                                <p className="text-xs text-muted-foreground mt-1 px-4 leading-relaxed">
                                    Enter the access key to verify your identity and access your private document vector space.
                                </p>
                            </div>

                            <form onSubmit={handleUnlockSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Input
                                        type="password"
                                        placeholder="Paste access key here..."
                                        value={unlockInput}
                                        onChange={(e) => {
                                            setUnlockInput(e.target.value);
                                            setUnlockError(false);
                                        }}
                                        className={cn(
                                            "text-center font-mono tracking-widest h-12 rounded-xl border-blue-500/10",
                                            unlockError && "border-destructive ring-destructive/20 animate-shake"
                                        )}
                                    />
                                    {unlockError && (
                                        <p className="text-[10px] text-destructive text-center font-bold uppercase tracking-wider">
                                            Incorrect key. Please try again.
                                        </p>
                                    )}
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        className="flex-1 rounded-full text-xs"
                                        onClick={() => setUnlockingAssistant(null)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="flex-1 rounded-full text-xs"
                                        disabled={!unlockInput.trim()}
                                    >
                                        Verify & Enter
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            {/* Connections modal */}
            {selectedAssistant && (
                <ManageConnections
                    assistantId={selectedAssistant.id}
                    assistantName={selectedAssistant.name}
                    isOpen={!!selectedAssistant}
                    onClose={() => setSelectedAssistant(null)}
                />
            )}
        </div>
    );
}
