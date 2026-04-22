"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Zap, Plus, Search, Key, ArrowRight, MessageSquare, Calendar,
    Trash2, LogOut, Link2, TrendingUp, Shield, BookOpen, User,
    LayoutGrid, Loader2, ChevronRight, Settings
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

function getDomainConfig(domain: string) {
    switch (domain) {
        case "finance":
            return {
                icon: TrendingUp,
                badge: "finance" as const,
                iconBg: "bg-finance-light",
                iconColor: "text-finance-primary",
                label: "Finance",
            };
        case "legal":
            return {
                icon: Shield,
                badge: "legal" as const,
                iconBg: "bg-legal-light",
                iconColor: "text-legal-primary",
                label: "Legal",
            };
        default:
            return {
                icon: BookOpen,
                badge: "general" as const,
                iconBg: "bg-general-light",
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
    const [selectedAssistant, setSelectedAssistant] = useState<{ id: string; name: string } | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
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
        loadData();
    }, [router]);

    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredAssistants(assistants);
        } else {
            const q = searchQuery.toLowerCase();
            setFilteredAssistants(
                assistants.filter(
                    (a) =>
                        a.name.toLowerCase().includes(q) ||
                        a.accessKey.toLowerCase().includes(q) ||
                        (a.domain || "").toLowerCase().includes(q)
                )
            );
        }
    }, [searchQuery, assistants]);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this assistant? This cannot be undone.")) return;
        setDeletingId(id);
        try {
            const res = await fetch(`/api/user-keys/${id}`, { method: "DELETE" });
            if (res.ok) {
                setAssistants((prev) => prev.filter((a) => a.id !== id));
            } else {
                const data = await res.json();
                alert(data.error || "Failed to delete");
            }
        } catch {
            alert("Error deleting assistant");
        } finally {
            setDeletingId(null);
        }
    };

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
        );
    }

    const initials = user?.name
        ? user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
        : user?.email?.[0]?.toUpperCase() || "U";

    return (
        <div className="min-h-screen page-bg">
            {/* Top nav */}
            <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-6">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                                    <Zap className="w-4 h-4 text-white fill-current" />
                                </div>
                                <span className="font-bold text-sm tracking-tight hidden sm:block">Tri mind</span>
                            </Link>
                            <Separator orientation="vertical" className="h-4 hidden sm:block" />
                            <nav className="hidden sm:flex items-center gap-4">
                                <span className="text-sm font-medium text-foreground flex items-center gap-1.5">
                                    <LayoutGrid className="w-4 h-4" />
                                    My Assistants
                                </span>
                            </nav>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                                <Avatar className="h-7 w-7">
                                    <AvatarFallback className="text-xs bg-primary/10 text-primary">{initials}</AvatarFallback>
                                </Avatar>
                                <span className="max-w-[160px] truncate font-medium text-foreground">{user?.name || user?.email}</span>
                            </div>
                            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground">
                                <LogOut className="w-4 h-4" />
                                <span className="ml-1.5 hidden sm:inline">Logout</span>
                            </Button>
                            <Link href="/build">
                                <Button size="sm" className="gap-1.5">
                                    <Plus className="w-3.5 h-3.5" />
                                    New Assistant
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Page header */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">
                            {assistants.length} assistant{assistants.length !== 1 ? "s" : ""}
                        </p>
                        <h1 className="text-2xl font-bold tracking-tight">Your Domain Assistants</h1>
                    </div>
                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by name or key..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Empty state */}
                {filteredAssistants.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-border rounded-2xl bg-secondary/20">
                        <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-5">
                            <LayoutGrid className="w-7 h-7 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                            {searchQuery ? "No assistants match your search" : "No assistants yet"}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-6 text-center max-w-sm">
                            {searchQuery
                                ? "Try a different search term or clear the filter."
                                : "Build your first domain assistant to get started with AI-powered document intelligence."}
                        </p>
                        {!searchQuery && (
                            <Link href="/build">
                                <Button>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Build First Assistant
                                </Button>
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
                                    <Card className="group h-full flex flex-col hover:-translate-y-0.5 hover:card-shadow-md transition-all duration-200">
                                        <CardHeader className="pb-3">
                                            <div className="flex items-start justify-between">
                                                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", config.iconBg)}>
                                                    <DomainIcon className={cn("w-5 h-5", config.iconColor)} />
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                                        onClick={() => handleDelete(assistant.id)}
                                                        disabled={deletingId === assistant.id}
                                                    >
                                                        {deletingId === assistant.id ? (
                                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                        ) : (
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        )}
                                                    </Button>
                                                    <Badge variant={config.badge} className="capitalize text-xs">
                                                        {config.label}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <CardTitle className="text-base font-semibold">{assistant.name}</CardTitle>
                                                <CardDescription className="mt-1 flex items-center gap-1.5">
                                                    <Key className="w-3 h-3" />
                                                    <code className="text-xs font-mono">{assistant.accessKey}</code>
                                                </CardDescription>
                                            </div>
                                        </CardHeader>

                                        <CardContent className="pb-3 flex-grow">
                                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                <Calendar className="w-3 h-3" />
                                                <span>Created {new Date(assistant.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                                            </div>
                                        </CardContent>

                                        <CardFooter className="pt-0 flex flex-col gap-2 border-t border-border/50 mt-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="w-full justify-start text-muted-foreground hover:text-foreground"
                                                onClick={() => setSelectedAssistant({ id: assistant.id, name: assistant.name })}
                                            >
                                                <Link2 className="w-4 h-4 mr-2" />
                                                Manage Connections
                                            </Button>
                                            <Link href={`/chat?key=${assistant.accessKey}`} className="w-full">
                                                <Button className="w-full justify-between" size="sm">
                                                    <span className="flex items-center gap-2">
                                                        <MessageSquare className="w-4 h-4" />
                                                        Open Chat
                                                    </span>
                                                    <ChevronRight className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            );
                        })}

                        {/* Add new card */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: filteredAssistants.length * 0.05 }}
                        >
                            <Link href="/build" className="block h-full">
                                <div className="h-full min-h-[220px] flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border hover:border-primary/40 hover:bg-primary/2 transition-all cursor-pointer group p-6">
                                    <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
                                        <Plus className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                    <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                        New Assistant
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    </div>
                )}
            </main>

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
