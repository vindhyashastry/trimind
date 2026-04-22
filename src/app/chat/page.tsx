"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Key, Send, Brain, FileText, TrendingUp, Shield, BookOpen,
    Terminal, AlertTriangle, ChevronDown, ChevronUp, Loader2,
    Lock, Layers, X, ArrowLeft, Copy, Check, Zap, FilePlus,
    GitCompare, RefreshCw, Link2, MessageSquare, User, Bot, Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { cn } from "@/lib/utils";

interface UploadedDoc {
    id: string;
    fileName: string;
    domain: string;
    assistantName: string;
    status: string;
    errorMessage?: string;
    timestamp: string;
}

function getDomainConfig(domain: string) {
    switch (domain) {
        case "finance":
            return { icon: TrendingUp, label: "Finance", badge: "finance" as const, color: "text-finance-primary", bg: "bg-finance-light" };
        case "legal":
            return { icon: Shield, label: "Legal", badge: "legal" as const, color: "text-legal-primary", bg: "bg-legal-light" };
        default:
            return { icon: BookOpen, label: "General", badge: "general" as const, color: "text-general-primary", bg: "bg-general-light" };
    }
}

function ChatContent() {
    const searchParams = useSearchParams();
    const initialKey = searchParams.get("key");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [accessKey, setAccessKey] = useState(initialKey || "");
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [domain, setDomain] = useState<"finance" | "legal" | "general">("general");
    const [showReasoning, setShowReasoning] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");
    const [pipelineMode, setPipelineMode] = useState<"cloud" | "local">("cloud");
    const [isChatLoading, setIsChatLoading] = useState(false);
    const [responseMode, setResponseMode] = useState<"strict" | "hybrid">("strict");
    const [uploadedDocs, setUploadedDocs] = useState<UploadedDoc[]>([]);
    const [showDocs, setShowDocs] = useState(true);
    const [isLoadingDocs, setIsLoadingDocs] = useState(false);
    const [selectionMode, setSelectionMode] = useState(false);
    const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [assistantId, setAssistantId] = useState<string | null>(null);
    const [assistantName, setAssistantName] = useState("Assistant");
    const [copySuccess, setCopySuccess] = useState<string | null>(null);
    const [keyInput, setKeyInput] = useState(initialKey || "");
    const [keyError, setKeyError] = useState("");

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isChatLoading]);

    useEffect(() => {
        fetch("/api/config").then(r => r.json()).then(d => setPipelineMode(d.mode)).catch(() => { });
    }, []);

    const fetchDocuments = async (key: string) => {
        if (!key) return;
        setIsLoadingDocs(true);
        try {
            const res = await fetch(`/api/documents?accessKey=${encodeURIComponent(key)}`);
            const data = await res.json();
            setUploadedDocs(data.documents || []);
            if (data.mode) setResponseMode(data.mode as "strict" | "hybrid");
            if (data.assistantId) {
                setAssistantId(data.assistantId);
                setAssistantName(data.assistantName || "Assistant");
            }
        } catch { }
        finally { setIsLoadingDocs(false); }
    };

    const fetchHistory = async (key: string, mode: string = "strict") => {
        try {
            const res = await fetch(`/api/chat/history?accessKey=${key}`);
            const data = await res.json();
            if (data.messages && data.messages.length > 0) {
                setMessages(data.messages);
            } else {
                setMessages([{
                    role: "assistant",
                    content: `Secure session established. I'm ready to answer questions from your uploaded documents.\n\n**Current mode:** ${mode === "strict" ? "Strict — answers only from your documents." : "Hybrid — documents + general knowledge."}`,
                    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                }]);
            }
        } catch { }
    };

    const saveMessage = async (msg: any) => {
        try {
            await fetch("/api/chat/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...msg, accessKey })
            });
        } catch { }
    };

    const handleAuthorize = async (keyToUse?: string) => {
        const k = keyToUse || keyInput;
        if (!k.startsWith("DPA-")) {
            setKeyError("Invalid key. Keys must start with DPA-");
            return;
        }
        setKeyError("");

        if (k.includes("-F-")) setDomain("finance");
        else if (k.includes("-L-")) setDomain("legal");
        else setDomain("general");

        setAccessKey(k);
        setIsAuthorized(true);

        const res = await fetch(`/api/documents?accessKey=${encodeURIComponent(k)}`);
        const data = await res.json();
        const savedMode = data.mode || "strict";
        setResponseMode(savedMode as "strict" | "hybrid");
        setUploadedDocs(data.documents || []);
        if (data.assistantId) {
            setAssistantId(data.assistantId);
            setAssistantName(data.assistantName || "Assistant");
        }
        fetchHistory(k, savedMode);
    };

    useEffect(() => {
        if (initialKey?.startsWith("DPA-")) {
            handleAuthorize(initialKey);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;
        setIsUploading(true);
        try {
            const formData = new FormData();
            files.forEach(file => formData.append("files", file));
            formData.append("domain", domain);
            formData.append("accessKey", accessKey);
            formData.append("assistantName", "Attached Knowledge");
            const res = await fetch("/api/upload", { method: "POST", body: formData });
            if (res.ok) fetchDocuments(accessKey);
        } catch { }
        finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleCompare = async () => {
        if (selectedDocs.length !== 2) return;
        setIsChatLoading(true);
        try {
            const res = await fetch("/api/documents/compare", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ docId1: selectedDocs[0], docId2: selectedDocs[1], accessKey })
            });
            const data = await res.json();
            const assistMsg = {
                role: "assistant",
                content: data.comparison,
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                metadata: { source: "Document Comparison Engine", confidence: 100 }
            };
            setMessages(prev => [...prev, assistMsg]);
            saveMessage(assistMsg);
            setSelectionMode(false);
            setSelectedDocs([]);
        } catch { }
        finally { setIsChatLoading(false); }
    };

    const handleDeleteDoc = async (id: string) => {
        if (!confirm("Are you sure you want to delete this document? All its indexed data will be removed.")) return;
        try {
            const res = await fetch(`/api/documents?id=${id}&accessKey=${accessKey}`, { method: "DELETE" });
            if (res.ok) fetchDocuments(accessKey);
            else {
                const data = await res.json();
                alert(data.error || "Failed to delete document");
            }
        } catch { alert("Failed to delete document"); }
    };

    const sendMessage = async (overrideInput?: string) => {
        const textToSend = overrideInput || input;
        if (!textToSend.trim()) return;

        const userMsg = {
            role: "user",
            content: textToSend,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        };

        setMessages(prev => [...prev, userMsg]);
        if (!overrideInput) setInput("");
        setIsChatLoading(true);
        saveMessage(userMsg);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: textToSend, domain, accessKey, history: messages, responseMode })
            });
            const data = await response.json();
            if (data.error && !data.content) throw new Error(data.error);

            const assistMsg = {
                role: "assistant",
                content: data.content,
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                metadata: {
                    confidence: data.confidence,
                    source: data.source,
                    reasoning: data.reasoning,
                    actions: data.actions,
                    crossDomainUsed: data.crossDomainUsed
                }
            };

            setMessages(prev => [...prev, assistMsg]);
            saveMessage(assistMsg);
            if (pipelineMode === "local" && data.reasoning) setShowReasoning(true);
        } catch {
            setMessages(prev => [...prev, {
                role: "assistant",
                content: "Connection to domain pipeline failed. Please check your access key or network connection.",
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            }]);
        } finally {
            setIsChatLoading(false);
        }
    };

    const copyToClipboard = async (text: string, id: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopySuccess(id);
            setTimeout(() => setCopySuccess(null), 2000);
        } catch { }
    };

    const copyChat = () => {
        const text = messages.map(m => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`).join("\n\n");
        copyToClipboard(text, "chat");
    };

    const summarizeChat = () => {
        if (messages.length < 2) return;
        sendMessage("Please provide a concise professional summary of our conversation so far, highlighting key findings and conclusions.");
    };

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + "px";
        }
    }, [input]);

    const domainConfig = getDomainConfig(domain);
    const DomainIcon = domainConfig.icon;

    // Key gate
    if (!isAuthorized) {
        return (
            <div className="min-h-screen page-bg flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-sm"
                >
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                                <Zap className="w-4 h-4 text-white fill-current" />
                            </div>
                            <span className="font-bold tracking-tight">Tri mind</span>
                        </Link>
                        <div className="w-14 h-14 rounded-2xl bg-primary/8 flex items-center justify-center mx-auto mb-5">
                            <Key className="w-7 h-7 text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight mb-2">Enter Access Key</h1>
                        <p className="text-muted-foreground text-sm">
                            Enter your assistant's unique access key to begin the session.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <Input
                            placeholder="DPA-F-XXXXXXXX"
                            value={keyInput}
                            onChange={(e) => { setKeyInput(e.target.value.toUpperCase()); setKeyError(""); }}
                            onKeyDown={(e) => e.key === "Enter" && handleAuthorize()}
                            className={cn("h-12 text-center text-base font-mono tracking-widest", keyError && "border-destructive")}
                        />
                        {keyError && (
                            <p className="text-xs text-destructive">{keyError}</p>
                        )}
                        <Button className="w-full h-10" onClick={() => handleAuthorize()}>
                            Unlock Session
                        </Button>
                        <div className="text-center">
                            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                ← Back to Dashboard
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            {/* Left Sidebar */}
            <aside className="w-60 border-r border-border flex flex-col bg-secondary/20 overflow-hidden">
                {/* Sidebar header */}
                <div className="p-4 border-b border-border">
                    <Link href="/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3">
                        <ArrowLeft className="w-4 h-4" />
                        Dashboard
                    </Link>
                    <div className="flex items-center gap-2.5">
                        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", domainConfig.bg)}>
                            <DomainIcon className={cn("w-4 h-4", domainConfig.color)} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-semibold truncate">{assistantName}</p>
                            <Badge variant={domainConfig.badge} className="text-[10px] mt-0.5">
                                {domainConfig.label}
                            </Badge>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-4">
                    {/* Response mode */}
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-1 mb-2">
                            Response Mode
                        </p>
                        <div className="space-y-1">
                            <button
                                onClick={() => setResponseMode("strict")}
                                className={cn(
                                    "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all text-sm",
                                    responseMode === "strict"
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                )}
                            >
                                <Lock className="w-3.5 h-3.5 flex-shrink-0" />
                                <div>
                                    <p className="font-medium text-xs">Strict</p>
                                    <p className={cn("text-[10px]", responseMode === "strict" ? "text-primary-foreground/70" : "text-muted-foreground")}>
                                        Docs only
                                    </p>
                                </div>
                            </button>
                            <button
                                onClick={() => setResponseMode("hybrid")}
                                className={cn(
                                    "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all text-sm",
                                    responseMode === "hybrid"
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                )}
                            >
                                <Layers className="w-3.5 h-3.5 flex-shrink-0" />
                                <div>
                                    <p className="font-medium text-xs">Hybrid</p>
                                    <p className={cn("text-[10px]", responseMode === "hybrid" ? "text-primary-foreground/70" : "text-muted-foreground")}>
                                        Docs + general
                                    </p>
                                </div>
                            </button>
                        </div>
                    </div>

                    <Separator />

                    {/* Documents */}
                    <div>
                        <button
                            onClick={() => setShowDocs(!showDocs)}
                            className="w-full flex items-center justify-between px-1 mb-2 hover:opacity-80"
                        >
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                                Documents {uploadedDocs.length > 0 && `(${uploadedDocs.length})`}
                            </p>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={(e) => { e.stopPropagation(); fetchDocuments(accessKey); }}
                                    className="p-1 rounded hover:bg-secondary text-muted-foreground"
                                    title="Refresh"
                                >
                                    <RefreshCw className="w-3 h-3" />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setSelectionMode(!selectionMode); }}
                                    className={cn("p-1 rounded transition-colors", selectionMode ? "bg-primary/10 text-primary" : "hover:bg-secondary text-muted-foreground")}
                                    title="Compare mode"
                                >
                                    <GitCompare className="w-3 h-3" />
                                </button>
                                {showDocs ? <ChevronUp className="w-3 h-3 text-muted-foreground" /> : <ChevronDown className="w-3 h-3 text-muted-foreground" />}
                            </div>
                        </button>

                        <AnimatePresence>
                            {showDocs && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    {isLoadingDocs ? (
                                        <div className="flex items-center gap-2 px-2 py-2 text-xs text-muted-foreground">
                                            <Loader2 className="w-3 h-3 animate-spin" /> Loading...
                                        </div>
                                    ) : uploadedDocs.length === 0 ? (
                                        <div className="px-2 py-3 rounded-lg bg-secondary/50 text-xs text-muted-foreground text-center">
                                            No documents yet
                                        </div>
                                    ) : (
                                        <div className="space-y-1">
                                            {uploadedDocs.map((doc, i) => {
                                                const isSelected = selectedDocs.includes(doc.id);
                                                return (
                                                    <div
                                                        key={i}
                                                        className={cn(
                                                            "flex items-start gap-2 px-2 py-2 rounded-lg transition-all text-xs cursor-default group",
                                                            selectionMode && "cursor-pointer",
                                                            isSelected ? "bg-primary/10 border border-primary/20" : "hover:bg-secondary/60"
                                                        )}
                                                        onClick={() => {
                                                            if (selectionMode) {
                                                                setSelectedDocs(prev =>
                                                                    prev.includes(doc.id)
                                                                        ? prev.filter(id => id !== doc.id)
                                                                        : prev.length < 2 ? [...prev, doc.id] : prev
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        {selectionMode ? (
                                                            <div className={cn("w-3.5 h-3.5 rounded border mt-0.5 flex items-center justify-center flex-shrink-0", isSelected ? "bg-primary border-primary" : "border-border")}>
                                                                {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                                                            </div>
                                                        ) : doc.status === "SUCCESS" ? (
                                                            <FileText className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                                                        ) : doc.status === "ERROR" ? (
                                                            <AlertTriangle className="w-3.5 h-3.5 text-destructive mt-0.5 flex-shrink-0" />
                                                        ) : (
                                                            <Loader2 className="w-3.5 h-3.5 text-amber-500 animate-spin mt-0.5 flex-shrink-0" />
                                                        )}
                                                        <div className="overflow-hidden flex-1">
                                                            <p className="font-medium truncate" title={doc.fileName}>
                                                                {doc.fileName.length > 20 ? doc.fileName.substring(0, 17) + "..." : doc.fileName}
                                                            </p>
                                                            <p className={cn("text-[10px]",
                                                                doc.status === "SUCCESS" ? "text-muted-foreground"
                                                                    : doc.status === "ERROR" ? "text-destructive"
                                                                        : "text-amber-600"
                                                            )}>
                                                                {doc.status === "SUCCESS" ? "Indexed" : doc.status === "ERROR" ? "Failed" : "Processing"}
                                                            </p>
                                                        </div>
                                                        {!selectionMode && (
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); handleDeleteDoc(doc.id); }}
                                                                className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
                                                            >
                                                                <Trash2 className="w-3 h-3" />
                                                            </button>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                            {selectionMode && selectedDocs.length === 2 && (
                                                <Button size="sm" className="w-full h-7 mt-1 text-xs gap-1" onClick={handleCompare}>
                                                    <GitCompare className="w-3 h-3" />
                                                    Compare
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Separator />

                    {/* Quick actions */}
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-1 mb-2">
                            Quick Actions
                        </p>
                        <div className="space-y-1">
                            <button
                                onClick={summarizeChat}
                                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-all text-left"
                            >
                                <Brain className="w-3.5 h-3.5 flex-shrink-0 text-primary" />
                                <span className="text-xs font-medium">Summarize Chat</span>
                            </button>
                            <button
                                onClick={copyChat}
                                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-all text-left"
                            >
                                {copySuccess === "chat" ? (
                                    <Check className="w-3.5 h-3.5 flex-shrink-0 text-green-600" />
                                ) : (
                                    <Copy className="w-3.5 h-3.5 flex-shrink-0" />
                                )}
                                <span className="text-xs font-medium">{copySuccess === "chat" ? "Copied!" : "Copy Chat"}</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Key display at bottom */}
                <div className="p-3 border-t border-border">
                    <div className="rounded-lg bg-secondary/60 px-3 py-2 flex items-center gap-2">
                        <Key className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                        <code className="text-[10px] font-mono text-muted-foreground truncate">{accessKey}</code>
                    </div>
                </div>
            </aside>

            {/* Main chat */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Chat header */}
                <header className="h-14 border-b border-border flex items-center justify-between px-5 bg-background flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <h2 className="font-semibold text-sm">{assistantName}</h2>
                        <Badge variant={domainConfig.badge} className="text-xs capitalize">
                            {domainConfig.label}
                        </Badge>
                        <Badge
                            variant="outline"
                            className={cn("text-xs", pipelineMode === "local" ? "border-amber-200 text-amber-700 bg-amber-50" : "border-blue-200 text-blue-700 bg-blue-50")}
                        >
                            {pipelineMode === "local" ? "Local SLM" : "Cloud LLM"}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            Active
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn("h-8 w-8", showReasoning && "bg-primary/10 text-primary")}
                            onClick={() => setShowReasoning(!showReasoning)}
                            title="Toggle Reasoning Trace"
                        >
                            <Terminal className="w-4 h-4" />
                        </Button>
                    </div>
                </header>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5">
                    {messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-center gap-3 opacity-50">
                            <MessageSquare className="w-10 h-10 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">Ask a question about your documents</p>
                        </div>
                    )}

                    {messages.map((m, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className={cn("flex gap-3", m.role === "user" ? "justify-end" : "justify-start")}
                        >
                            {m.role === "assistant" && (
                                <Avatar className="h-8 w-8 flex-shrink-0 mt-0.5">
                                    <AvatarFallback className={cn("text-xs font-medium", domainConfig.bg, domainConfig.color)}>
                                        <DomainIcon className="w-4 h-4" />
                                    </AvatarFallback>
                                </Avatar>
                            )}

                            <div className={cn("max-w-[75%] space-y-1.5", m.role === "user" ? "items-end" : "items-start", "flex flex-col")}>
                                <div className={cn(
                                    "rounded-2xl px-4 py-3 text-sm leading-relaxed",
                                    m.role === "user"
                                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                                        : "bg-secondary border border-border rounded-tl-sm"
                                )}>
                                    {m.role === "user" ? (
                                        <p className="whitespace-pre-wrap">{m.content}</p>
                                    ) : (
                                        <MarkdownRenderer
                                            content={m.content}
                                            className="text-sm"
                                            accessKey={accessKey}
                                        />
                                    )}
                                </div>

                                {/* Message footer */}
                                <div className={cn("flex items-center gap-2 flex-wrap px-1", m.role === "user" ? "justify-end" : "justify-start")}>
                                    <span className="text-[10px] text-muted-foreground">{m.timestamp}</span>

                                    {/* Metadata badges */}
                                    {m.role === "assistant" && (
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                            {m.metadata?.crossDomainUsed && (
                                                <Badge variant="outline" className="text-[9px] py-0 h-4 border-primary/30 text-primary bg-primary/5 uppercase font-bold">
                                                    Collaborative RAG
                                                </Badge>
                                            )}
                                            {m.metadata?.source && (
                                                <Badge variant="outline" className="text-[10px] py-0 h-4 font-normal">
                                                    <FileText className="w-2.5 h-2.5 mr-1" />
                                                    {m.metadata.source.length > 30 ? m.metadata.source.substring(0, 30) + "…" : m.metadata.source}
                                                </Badge>
                                            )}
                                        </div>
                                    )}
                                    {m.role === "assistant" && m.metadata?.confidence !== undefined && (
                                        <Badge
                                            variant={m.metadata.confidence >= 80 ? "success" : "warning"}
                                            className="text-[10px] py-0 h-4"
                                        >
                                            {m.metadata.confidence}% confidence
                                        </Badge>
                                    )}
                                    {m.role === "assistant" && m.metadata?.crossDomainUsed && (
                                        <Badge variant="outline" className="text-[10px] py-0 h-4 border-legal-primary/30 text-legal-primary bg-legal-light">
                                            <Link2 className="w-2.5 h-2.5 mr-1" /> Cross-domain
                                        </Badge>
                                    )}

                                    {/* Copy button */}
                                    <button
                                        onClick={() => copyToClipboard(m.content, `msg-${i}`)}
                                        className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {copySuccess === `msg-${i}` ? (
                                            <Check className="w-3 h-3 text-green-600" />
                                        ) : (
                                            <Copy className="w-3 h-3" />
                                        )}
                                    </button>
                                </div>

                                {/* Action badges */}
                                {m.role === "assistant" && Array.isArray(m.metadata?.actions) && m.metadata.actions.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 px-1">
                                        {m.metadata.actions.map((act: any, idx: number) => (
                                            <Badge key={idx} variant="success" className="text-[10px] gap-1">
                                                <Zap className="w-2.5 h-2.5" />
                                                {act.output}
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {m.role === "user" && (
                                <Avatar className="h-8 w-8 flex-shrink-0 mt-0.5">
                                    <AvatarFallback className="text-xs bg-primary/10 text-primary font-medium">
                                        <User className="w-4 h-4" />
                                    </AvatarFallback>
                                </Avatar>
                            )}
                        </motion.div>
                    ))}

                    {/* Loading indicator */}
                    {isChatLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex gap-3 justify-start"
                        >
                            <Avatar className="h-8 w-8 flex-shrink-0">
                                <AvatarFallback className={cn("text-xs", domainConfig.bg, domainConfig.color)}>
                                    <DomainIcon className="w-4 h-4" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="bg-secondary border border-border rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]" />
                                    <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]" />
                                    <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" />
                                </div>
                                <span className="text-xs text-muted-foreground">Searching documents…</span>
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input area */}
                <div className="border-t border-border bg-background px-4 py-4 flex-shrink-0">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-end gap-2 bg-secondary/40 border border-border rounded-2xl px-3 py-2 focus-within:border-primary/40 focus-within:bg-background transition-all">
                            <input type="file" ref={fileInputRef} className="hidden" multiple onChange={handleFileUpload} />
                            <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 flex-shrink-0 text-muted-foreground hover:text-primary"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isUploading}
                                title="Attach files"
                            >
                                {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FilePlus className="w-4 h-4" />}
                            </Button>

                            <textarea
                                ref={textareaRef}
                                placeholder={responseMode === "strict" ? "Ask about your documents…" : "Ask anything — docs + general knowledge…"}
                                className="flex-1 bg-transparent text-sm resize-none outline-none placeholder:text-muted-foreground min-h-[36px] max-h-[160px] py-1.5 leading-relaxed"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        sendMessage();
                                    }
                                }}
                                disabled={isChatLoading}
                                rows={1}
                            />

                            <div className="flex items-center gap-1 flex-shrink-0">
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className={cn("h-8 w-8 text-muted-foreground", showReasoning && "text-primary bg-primary/10")}
                                    onClick={() => setShowReasoning(!showReasoning)}
                                    title="Toggle reasoning"
                                >
                                    <Brain className="w-4 h-4" />
                                </Button>
                                <Button
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => sendMessage()}
                                    disabled={isChatLoading || !input.trim()}
                                >
                                    {isChatLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                </Button>
                            </div>
                        </div>
                        <p className="text-[10px] text-muted-foreground text-center mt-2">
                            Press Enter to send · Shift+Enter for new line
                        </p>
                    </div>
                </div>
            </main>

            {/* Reasoning sidebar */}
            <AnimatePresence>
                {showReasoning && (
                    <motion.aside
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 320, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="border-l border-border bg-secondary/30 flex flex-col overflow-hidden flex-shrink-0 shadow-xl"
                    >
                        <div className="p-4 border-b border-border flex items-center justify-between bg-background">
                            <div className="flex items-center gap-2">
                                <Terminal className="w-4 h-4 text-primary" />
                                <h3 className="font-semibold text-sm">Reasoning Trace</h3>
                            </div>
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowReasoning(false)}>
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {(() => {
                                const lastTraceMsg = [...messages].reverse().find(m => m.metadata?.reasoning);
                                if (!lastTraceMsg) {
                                    return (
                                        <div className="flex flex-col items-center justify-center h-40 text-center gap-3 opacity-50">
                                            <Brain className="w-8 h-8 text-muted-foreground" />
                                            <p className="text-xs text-muted-foreground px-4">No reasoning trace available for this session yet.</p>
                                        </div>
                                    );
                                }

                                const reasoning = lastTraceMsg.metadata.reasoning;
                                const isArray = Array.isArray(reasoning);

                                return (
                                    <div className="space-y-5">
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3">Logic Analysis</p>
                                            {isArray ? (
                                                reasoning.map((s: any, i: number, arr: any[]) => (
                                                    <div key={i} className="flex gap-3 mb-4 last:mb-0">
                                                        <div className="flex flex-col items-center">
                                                            <div className={cn("w-2 h-2 rounded-full mt-1 flex-shrink-0", s.status === "complete" ? "bg-green-500" : "bg-primary animate-pulse")} />
                                                            {i < arr.length - 1 && <div className="w-[1px] flex-1 bg-border mt-1 min-h-[16px]" />}
                                                        </div>
                                                        <div className="pb-1">
                                                            <p className="text-[11px] font-bold">{s.step}</p>
                                                            <p className="text-[10px] text-muted-foreground leading-relaxed">{s.desc}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="bg-background rounded-xl p-3 border border-border shadow-sm">
                                                    <p className="text-xs leading-relaxed text-foreground/90 font-mono italic">
                                                        {reasoning}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {lastTraceMsg.metadata?.source && (
                                            <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 space-y-1.5">
                                                <div className="flex items-center gap-1.5 text-primary">
                                                    <FileText className="w-3.5 h-3.5" />
                                                    <p className="text-[10px] font-bold uppercase tracking-tight">Source Context</p>
                                                </div>
                                                <p className="text-[11px] text-primary/80 leading-relaxed font-medium">
                                                    {lastTraceMsg.metadata.source}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })()}
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function ChatPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
        }>
            <ChatContent />
        </Suspense>
    );
}
