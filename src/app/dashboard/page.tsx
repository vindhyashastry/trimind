"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Zap, LayoutDashboard, Plus, Search, Key, ArrowRight, MessageSquare, History, User, Trash2, LogOut, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ManageConnections } from "@/components/ManageConnections";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const [assistants, setAssistants] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedAssistant, setSelectedAssistant] = useState<{ id: string; name: string } | null>(null);
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

            // Fetch user's assistants
            const res = await fetch("/api/user-keys");
            const data = await res.json();
            setAssistants(data.assistants || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, [router]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this assistant? Results cannot be undone.")) return;

        try {
            const res = await fetch(`/api/user-keys/${id}`, { method: "DELETE" });
            if (res.ok) {
                setAssistants(assistants.filter(a => a.id !== id));
            } else {
                const data = await res.json();
                alert(data.error || "Failed to delete");
            }
        } catch (err) {
            console.error(err);
            alert("Error deleting assistant");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full"
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-finance-primary/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-legal-primary/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Sidebar/Navbar */}
            <nav className="relative z-50 border-b border-white/10 bg-background/50 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-finance-primary to-legal-primary rounded-lg flex items-center justify-center shadow-lg">
                            <Zap className="text-white w-5 h-5 fill-current" />
                        </div>
                        <span className="text-xl font-bold tracking-tighter text-glow">Tri mind</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                            <User className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium">{user?.email}</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-full text-muted-foreground hover:text-primary"
                            onClick={async () => {
                                await fetch("/api/auth/logout", { method: "POST" });
                                router.push("/");
                            }}
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                        <Link href="/build">
                            <Button size="sm" className="rounded-full gap-2">
                                <Plus className="w-4 h-4" />
                                New Assistant
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 max-w-7xl mx-auto px-8 py-12">
                <header className="mb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <Badge variant="outline" className="mb-2 border-primary/20 text-primary bg-primary/5">
                                Control Center
                            </Badge>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Your Domain Assistants</h1>
                            <p className="text-muted-foreground mt-2 text-lg">
                                Manage and connect to your specialized intelligence agents.
                            </p>
                        </div>
                        <div className="relative w-full md:w-72">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search assistants..." className="pl-10 glass rounded-xl" />
                        </div>
                    </div>
                </header>

                {assistants.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 glass border-white/10 rounded-3xl border-dashed">
                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                            <LayoutDashboard className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">No assistants found</h3>
                        <p className="text-muted-foreground mb-8 text-center max-w-sm">
                            You haven't generated any domain assistants yet. Build your first one to see it here.
                        </p>
                        <Link href="/build">
                            <Button variant="outline" className="rounded-xl px-8">
                                Build Now
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {assistants.map((assistant) => (
                            <motion.div
                                key={assistant.accessKey}
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Card className="glass border-white/10 hover:border-primary/30 transition-all group overflow-hidden h-full flex flex-col">
                                    <CardHeader>
                                        <div className="flex items-start justify-between mb-2">
                                            <div className={`p-3 rounded-2xl bg-${assistant.domain === 'finance' ? 'finance' : assistant.domain === 'legal' ? 'legal' : 'primary'}/10`}>
                                                <MessageSquare className={`w-6 h-6 text-${assistant.domain === 'finance' ? 'finance-primary' : assistant.domain === 'legal' ? 'legal-primary' : 'primary'}`} />
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-muted-foreground hover:text-destructive transition-colors"
                                                    onClick={() => handleDelete(assistant.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                                <Badge variant="secondary" className="glass capitalize h-fit">
                                                    {assistant.domain}
                                                </Badge>
                                            </div>
                                        </div>
                                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                            {assistant.name}
                                        </CardTitle>
                                        <CardDescription className="line-clamp-2">
                                            Access Key: <code className="text-primary/70">{assistant.accessKey}</code>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                                            <div className="flex items-center gap-1">
                                                <History className="w-3 h-3" />
                                                <span>Created {new Date(assistant.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="pt-0 flex flex-col gap-2">
                                        <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className="w-full rounded-xl hover:bg-white/5 text-muted-foreground hover:text-primary"
                                            onClick={() => setSelectedAssistant({ id: assistant.id, name: assistant.name })}
                                        >
                                            <Link2 className="w-4 h-4 mr-2" />
                                            Manage Connections
                                        </Button>
                                        <Link href={`/chat?key=${assistant.accessKey}`} className="w-full">
                                            <Button className="w-full rounded-xl group-hover:bg-primary transition-colors">
                                                Connect to Domain
                                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>

            {/* Manage Connections Modal */}
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
