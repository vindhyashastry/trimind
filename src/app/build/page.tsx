"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    TrendingUp,
    Shield,
    BookOpen,
    Upload,
    CheckCircle2,
    Key,
    ChevronRight,
    Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Step = "domain" | "config" | "upload" | "finalize";

function BuildContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialDomain = searchParams.get("domain");

    const [step, setStep] = useState<Step>("domain");
    const [domain, setDomain] = useState<string>(initialDomain || "");
    const [name, setName] = useState("");
    const [mode, setMode] = useState<"strict" | "hybrid">("strict");
    const [files, setFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [key, setKey] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkAuth() {
            try {
                const res = await fetch("/api/auth/me");
                const data = await res.json();
                if (!data.user) {
                    router.push("/login?callback=/build");
                } else {
                    setLoading(false);
                }
            } catch {
                router.push("/login?callback=/build");
            }
        }
        checkAuth();
    }, [router]);

    const handleNext = async () => {
        if (step === "domain") {
            if (!domain) return;
            setStep("config");
        } else if (step === "config") {
            if (!name) return;
            setStep("upload");
        } else if (step === "upload") {
            if (files.length === 0) return;
            setIsUploading(true);

            const domainPrefix = domain === "finance" ? "F" : domain === "legal" ? "L" : "G";
            const newKey = `DPA-${domainPrefix}-` + Math.random().toString(36).substring(2, 10).toUpperCase();

            try {
                const formData = new FormData();
                files.forEach(file => formData.append("files", file));
                formData.append("domain", domain);
                formData.append("assistantName", name);
                formData.append("accessKey", newKey);
                formData.append("mode", mode);

                await fetch("/api/upload", { method: "POST", body: formData });

                setKey(newKey);
                setStep("finalize");
            } catch (error: any) {
                alert(`Upload failed: ${error.message}`);
            } finally {
                setIsUploading(false);
            }
        }
    };

    const handleBack = () => {
        if (step === "config") setStep("domain");
        else if (step === "upload") setStep("config");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col p-8">
            <header className="flex items-center justify-between max-w-5xl mx-auto w-full mb-12">
                <Link href="/" className="flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm font-medium">Back</span>
                </Link>
                <div className="flex items-center gap-4">
                    {["domain", "config", "upload", "finalize"].map((s, i) => (
                        <div key={s} className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${step === s ? "bg-primary" : "bg-muted"}`} />
                            {i < 3 && <div className="w-8 h-[1px] bg-muted" />}
                        </div>
                    ))}
                </div>
            </header>

            <main className="flex-1 max-w-3xl mx-auto w-full">
                <AnimatePresence mode="wait">
                    {step === "domain" && (
                        <motion.div key="domain" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <h1 className="text-4xl font-bold mb-2">Choose your domain</h1>
                            <p className="text-muted-foreground mb-10">Select the specialized pipeline.</p>
                            <div className="grid grid-cols-1 gap-4">
                                {[
                                    { id: "finance", title: "Finance", icon: <TrendingUp className="text-finance-primary" />, desc: "Balance sheets, risk analysis." },
                                    { id: "legal", title: "Legal", icon: <Shield className="text-legal-primary" />, desc: "Contract drafting, compliance." },
                                    { id: "general", title: "General", icon: <BookOpen className="text-primary" />, desc: "General documentation." }
                                ].map((d) => (
                                    <button key={d.id} onClick={() => { setDomain(d.id); setStep("config"); }}
                                        className={`flex items-center gap-6 p-6 rounded-2xl border transition-all text-left ${domain === d.id ? "bg-white/[0.05] border-primary/50" : "bg-white/[0.02] border-white/5 hover:border-white/10"}`}>
                                        <div className="p-4 rounded-xl bg-background border border-white/5">{d.icon}</div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg">{d.title}</h3>
                                            <p className="text-sm text-muted-foreground">{d.desc}</p>
                                        </div>
                                        <ChevronRight className="w-5 h-5 opacity-40" />
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === "config" && (
                        <motion.div key="config" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <h1 className="text-4xl font-bold mb-2">Configure</h1>
                            <p className="text-muted-foreground mb-10">Set name and mode.</p>
                            <div className="space-y-8">
                                <div className="space-y-3">
                                    <label className="text-sm font-medium">Assistant Name</label>
                                    <Input placeholder="e.g., Q1 Audit" value={name} onChange={(e) => setName(e.target.value)} className="h-14 text-lg" autoFocus />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <button onClick={() => setMode("strict")} className={`p-6 rounded-2xl border text-left ${mode === "strict" ? "bg-primary/10 border-primary" : "bg-white/[0.02] border-white/5"}`}>
                                        <Badge variant="outline" className="mb-2">Recommended</Badge>
                                        <h4 className="font-bold mb-1">Strict</h4>
                                        <p className="text-xs text-muted-foreground">Only uploaded docs.</p>
                                    </button>
                                    <button onClick={() => setMode("hybrid")} className={`p-6 rounded-2xl border text-left ${mode === "hybrid" ? "bg-primary/10 border-primary" : "bg-white/[0.02] border-white/5"}`}>
                                        <h4 className="font-bold mb-1">Hybrid</h4>
                                        <p className="text-xs text-muted-foreground">Docs + general knowledge.</p>
                                    </button>
                                </div>
                                <div className="flex justify-between pt-8">
                                    <Button variant="ghost" onClick={handleBack}>Back</Button>
                                    <Button size="lg" disabled={!name} onClick={() => setStep("upload")} className="rounded-full px-8">Next</Button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === "upload" && (
                        <motion.div key="upload" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <h1 className="text-4xl font-bold mb-2">Upload Documents</h1>
                            <p className="text-muted-foreground mb-10">Train your <span className="text-primary">{domain}</span> assistant.</p>
                            <div className="space-y-8">
                                <div className="border-2 border-dashed border-white/10 rounded-3xl p-12 flex flex-col items-center justify-center cursor-pointer hover:bg-white/[0.03] transition-colors"
                                    onClick={() => document.getElementById("file-upload")?.click()}>
                                    <input type="file" id="file-upload" className="hidden" multiple onChange={(e) => setFiles(Array.from(e.target.files || []))} />
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                        <Upload className="text-primary w-8 h-8" />
                                    </div>
                                    <h4 className="font-bold mb-2 text-lg">{files.length > 0 ? `${files.length} files selected` : "Drop files here"}</h4>
                                    <p className="text-sm text-muted-foreground mb-6">PDF, Excel, Word, CSV</p>
                                    <Button variant="outline" className="rounded-full pointer-events-none">{files.length > 0 ? "Change" : "Choose"}</Button>
                                </div>
                                {files.length > 0 && (
                                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                                        {files.map((f, i) => (
                                            <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <div className="w-1 h-1 rounded-full bg-primary" />
                                                <span className="truncate">{f.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="flex justify-between pt-8">
                                    <Button variant="ghost" onClick={handleBack} disabled={isUploading}>Back</Button>
                                    <Button size="lg" onClick={handleNext} className="rounded-full px-8" disabled={isUploading || files.length === 0}>
                                        {isUploading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Uploading</> : "Generate Key"}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === "finalize" && (
                        <motion.div key="finalize" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
                            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                                <CheckCircle2 className="w-10 h-10 text-green-500" />
                            </div>
                            <h1 className="text-4xl font-bold mb-2">Assistant Ready!</h1>
                            <p className="text-muted-foreground mb-12">Your <span className="text-primary font-bold">{domain}</span> agent is deployed.</p>
                            <Card className="max-w-md mx-auto mb-10 border-primary/20 bg-primary/5">
                                <CardContent className="p-8 text-center">
                                    <div className="flex items-center justify-center gap-2 mb-4 text-primary">
                                        <Key className="w-5 h-5" />
                                        <span className="text-sm font-bold uppercase">Access Key</span>
                                    </div>
                                    <div className="text-4xl font-mono font-bold tracking-widest mb-4">{key}</div>
                                    <p className="text-xs text-muted-foreground">Save this key. It unlocks your {domain} pipeline.</p>
                                </CardContent>
                            </Card>
                            <div className="flex flex-col gap-4 max-w-sm mx-auto">
                                <Button size="lg" className="rounded-full" onClick={() => router.push(`/chat?key=${key}`)}>Start Chatting</Button>
                                <Button variant="ghost" className="rounded-full" onClick={() => router.push("/")}>Dashboard</Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}

export default function BuildPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}>
            <BuildContent />
        </Suspense>
    );
}
