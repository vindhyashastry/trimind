"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft, TrendingUp, Shield, BookOpen, Upload,
    CheckCircle2, Key, Loader2, ChevronRight, X, FileText, Lock, Layers, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Step = "domain" | "config" | "upload" | "finalize";

const STEPS: Step[] = ["domain", "config", "upload", "finalize"];
const STEP_LABELS = ["Domain", "Configure", "Upload", "Done"];

const DOMAINS = [
    {
        id: "finance",
        title: "Finance",
        description: "Balance sheets, risk reports, P&L analysis, scenario modeling.",
        icon: TrendingUp,
        iconBg: "bg-finance-light",
        iconColor: "text-finance-primary",
        borderHover: "hover:border-finance-primary/40",
        borderSelected: "border-finance-primary",
        bgSelected: "bg-finance-light/50",
    },
    {
        id: "legal",
        title: "Legal",
        description: "Contract analysis, clause extraction, compliance audits.",
        icon: Shield,
        iconBg: "bg-legal-light",
        iconColor: "text-legal-primary",
        borderHover: "hover:border-legal-primary/40",
        borderSelected: "border-legal-primary",
        bgSelected: "bg-legal-light/50",
    },
    {
        id: "general",
        title: "General",
        description: "General documentation, research, knowledge synthesis.",
        icon: BookOpen,
        iconBg: "bg-general-light",
        iconColor: "text-general-primary",
        borderHover: "hover:border-general-primary/40",
        borderSelected: "border-general-primary",
        bgSelected: "bg-general-light/50",
    },
];

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
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        fetch("/api/auth/me")
            .then((r) => r.json())
            .then((data) => {
                if (!data.user) router.push("/login?callback=/build");
            })
            .catch(() => router.push("/login?callback=/build"));
    }, [router]);

    // If initial domain from query, jump to config
    useEffect(() => {
        if (initialDomain && ["finance", "legal", "general"].includes(initialDomain)) {
            setDomain(initialDomain);
            setStep("config");
        }
    }, [initialDomain]);

    const handleNext = async () => {
        if (step === "domain") {
            if (!domain) return;
            setStep("config");
        } else if (step === "config") {
            if (!name.trim()) return;
            setStep("upload");
        } else if (step === "upload") {
            if (files.length === 0) return;
            setIsUploading(true);

            const domainPrefix = domain === "finance" ? "F" : domain === "legal" ? "L" : "G";
            const newKey = `DPA-${domainPrefix}-` + Math.random().toString(36).substring(2, 10).toUpperCase();

            try {
                const formData = new FormData();
                files.forEach((file) => formData.append("files", file));
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

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const dropped = Array.from(e.dataTransfer.files);
        setFiles((prev) => [...prev, ...dropped]);
    };

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const currentStepIndex = STEPS.indexOf(step);

    return (
        <div className="min-h-screen page-bg flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-10 border-b border-border/60 bg-background/80 backdrop-blur-xl">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <div className="h-16 flex items-center justify-between">
                        <Link href={step === "domain" ? "/" : "#"} onClick={step !== "domain" ? handleBack : undefined}
                            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            {step === "domain" ? "Back to home" : "Back"}
                        </Link>

                        {/* Step indicator */}
                        <div className="flex items-center gap-2">
                            {STEPS.filter(s => s !== "finalize").map((s, i) => (
                                <div key={s} className="flex items-center gap-2">
                                    <div className="flex items-center gap-1.5">
                                        <div className={cn(
                                            "w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all",
                                            STEPS.indexOf(s) < currentStepIndex
                                                ? "bg-primary text-white"
                                                : STEPS.indexOf(s) === currentStepIndex
                                                    ? "bg-primary text-white ring-4 ring-primary/20"
                                                    : "bg-secondary text-muted-foreground"
                                        )}>
                                            {STEPS.indexOf(s) < currentStepIndex ? (
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                            ) : (
                                                i + 1
                                            )}
                                        </div>
                                        <span className={cn("text-xs font-medium hidden sm:block",
                                            STEPS.indexOf(s) === currentStepIndex ? "text-foreground" : "text-muted-foreground"
                                        )}>
                                            {STEP_LABELS[i]}
                                        </span>
                                    </div>
                                    {i < 2 && <div className="w-8 h-[1px] bg-border" />}
                                </div>
                            ))}
                        </div>

                        <div className="w-20" /> {/* spacer */}
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-12">
                <AnimatePresence mode="wait">
                    {/* Step 1: Domain */}
                    {step === "domain" && (
                        <motion.div key="domain" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold tracking-tight mb-2">Choose your domain</h1>
                                <p className="text-muted-foreground">Select the specialized pipeline for your assistant.</p>
                            </div>
                            <div className="space-y-3">
                                {DOMAINS.map((d) => (
                                    <button
                                        key={d.id}
                                        onClick={() => { setDomain(d.id); setStep("config"); }}
                                        className={cn(
                                            "w-full flex items-center gap-5 p-5 rounded-xl border-2 text-left transition-all duration-150",
                                            domain === d.id
                                                ? `${d.borderSelected} ${d.bgSelected}`
                                                : `border-border bg-card ${d.borderHover} hover:bg-secondary/30`
                                        )}
                                    >
                                        <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0", d.iconBg)}>
                                            <d.icon className={cn("w-5 h-5", d.iconColor)} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold">{d.title}</p>
                                            <p className="text-sm text-muted-foreground">{d.description}</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Config */}
                    {step === "config" && (
                        <motion.div key="config" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold tracking-tight mb-2">Configure</h1>
                                <p className="text-muted-foreground">Name your assistant and choose its response behavior.</p>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="assistant-name" className="text-base font-semibold">Assistant Name</Label>
                                    <p className="text-sm text-muted-foreground">Give it a descriptive name, e.g. "Q1 Audit 2024" or "NDA Review Bot"</p>
                                    <Input
                                        id="assistant-name"
                                        placeholder="e.g. Q1 Audit Analysis"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="h-11 text-base"
                                        autoFocus
                                        onKeyDown={(e) => e.key === "Enter" && name.trim() && setStep("upload")}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-base font-semibold">Response Mode</Label>
                                    <p className="text-sm text-muted-foreground">Controls how the assistant answers questions.</p>
                                    <div className="grid grid-cols-2 gap-3 mt-2">
                                        <button
                                            onClick={() => setMode("strict")}
                                            className={cn(
                                                "p-4 rounded-xl border-2 text-left transition-all",
                                                mode === "strict"
                                                    ? "border-primary bg-primary/5"
                                                    : "border-border bg-card hover:border-border/80"
                                            )}
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <Lock className={cn("w-4 h-4", mode === "strict" ? "text-primary" : "text-muted-foreground")} />
                                                <span className="font-semibold text-sm">Strict</span>
                                                {mode === "strict" && <Badge variant="default" className="text-[10px] ml-auto">Recommended</Badge>}
                                            </div>
                                            <p className="text-xs text-muted-foreground">Only answers from your uploaded documents. No hallucination.</p>
                                        </button>
                                        <button
                                            onClick={() => setMode("hybrid")}
                                            className={cn(
                                                "p-4 rounded-xl border-2 text-left transition-all",
                                                mode === "hybrid"
                                                    ? "border-primary bg-primary/5"
                                                    : "border-border bg-card hover:border-border/80"
                                            )}
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <Layers className={cn("w-4 h-4", mode === "hybrid" ? "text-primary" : "text-muted-foreground")} />
                                                <span className="font-semibold text-sm">Hybrid</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground">Documents + general AI knowledge for broader context.</p>
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-between pt-4">
                                    <Button variant="ghost" onClick={handleBack}>Back</Button>
                                    <Button disabled={!name.trim()} onClick={() => setStep("upload")} className="px-8">
                                        Continue
                                        <ChevronRight className="ml-1.5 w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Upload */}
                    {step === "upload" && (
                        <motion.div key="upload" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold tracking-tight mb-2">Upload Documents</h1>
                                <p className="text-muted-foreground">
                                    Upload the documents that your{" "}
                                    <span className="font-semibold text-foreground capitalize">{domain}</span> assistant will learn from.
                                </p>
                            </div>
                            <div className="space-y-5">
                                {/* Drop zone */}
                                <div
                                    className={cn(
                                        "border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all text-center",
                                        isDragging
                                            ? "border-primary bg-primary/5"
                                            : "border-border hover:border-primary/40 hover:bg-secondary/20"
                                    )}
                                    onClick={() => document.getElementById("file-upload")?.click()}
                                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                    onDragLeave={() => setIsDragging(false)}
                                    onDrop={handleDrop}
                                >
                                    <input
                                        type="file"
                                        id="file-upload"
                                        className="hidden"
                                        multiple
                                        accept=".pdf,.xlsx,.xls,.txt,.csv,.docx"
                                        onChange={(e) => setFiles((prev) => [...prev, ...Array.from(e.target.files || [])])}
                                    />
                                    <div className="w-14 h-14 rounded-2xl bg-primary/8 flex items-center justify-center mb-4">
                                        <Upload className="w-7 h-7 text-primary" />
                                    </div>
                                    <p className="font-semibold mb-1">
                                        {isDragging ? "Drop files here" : "Drag & drop or click to browse"}
                                    </p>
                                    <p className="text-sm text-muted-foreground">Supports PDF, Excel, Word, CSV, TXT</p>
                                </div>

                                {/* File list */}
                                {files.length > 0 && (
                                    <div className="rounded-xl border border-border bg-secondary/20 divide-y divide-border">
                                        {files.map((f, i) => (
                                            <div key={i} className="flex items-center gap-3 px-4 py-3">
                                                <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
                                                    <FileText className="w-4 h-4 text-primary" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium truncate">{f.name}</p>
                                                    <p className="text-xs text-muted-foreground">{(f.size / 1024).toFixed(1)} KB</p>
                                                </div>
                                                <button
                                                    onClick={() => removeFile(i)}
                                                    className="p-1 rounded-md text-muted-foreground hover:text-destructive transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="flex justify-between pt-2">
                                    <Button variant="ghost" onClick={handleBack} disabled={isUploading}>Back</Button>
                                    <Button
                                        onClick={handleNext}
                                        disabled={isUploading || files.length === 0}
                                        className="px-8"
                                    >
                                        {isUploading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                                Uploading…
                                            </>
                                        ) : (
                                            <>
                                                Generate Access Key
                                                <ChevronRight className="ml-1.5 w-4 h-4" />
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 4: Finalize */}
                    {step === "finalize" && (
                        <motion.div
                            key="finalize"
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="w-8 h-8 text-green-600" />
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight mb-2">Assistant Ready!</h1>
                            <p className="text-muted-foreground mb-10">
                                Your{" "}
                                <span className="font-semibold text-foreground capitalize">{domain}</span>{" "}
                                assistant "<span className="font-semibold text-foreground">{name}</span>" is deployed and processing documents.
                            </p>

                            {/* Key card */}
                            <div className="max-w-sm mx-auto mb-8 rounded-2xl border-2 border-primary/20 bg-primary/4 p-7">
                                <div className="flex items-center justify-center gap-2 mb-3 text-primary">
                                    <Key className="w-4 h-4" />
                                    <span className="text-xs font-bold uppercase tracking-widest">Access Key</span>
                                </div>
                                <div className="text-2xl font-mono font-bold tracking-widest text-foreground mb-3 break-all">{key}</div>
                                <p className="text-xs text-muted-foreground">
                                    Save this key securely. It's the only way to access your{" "}
                                    <span className="capitalize">{domain}</span> assistant.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
                                <Button className="flex-1" onClick={() => router.push(`/chat?key=${key}`)}>
                                    <Zap className="w-4 h-4 mr-2" />
                                    Start Chatting
                                </Button>
                                <Button variant="outline" className="flex-1" onClick={() => router.push("/dashboard")}>
                                    Dashboard
                                </Button>
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
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
        }>
            <BuildContent />
        </Suspense>
    );
}
