"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Key,
    Send,
    Brain,
    FileText,
    TrendingUp,
    Shield,
    Download,
    Terminal,
    AlertTriangle,
    ChevronDown,
    ChevronUp,
    Loader2,
    BookOpen,
    Lock,
    Layers,
    X,
    ArrowRight,
    Copy,
    Check,
    Zap,
    Plus,
    FilePlus,
    GitCompare,
    RefreshCw,
    Link2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

interface UploadedDoc {
    id: string;
    fileName: string;
    domain: string;
    assistantName: string;
    status: string;
    errorMessage?: string;
    timestamp: string;
}

function ChatContent() {
    const searchParams = useSearchParams();
    const initialKey = searchParams.get("key");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [accessKey, setAccessKey] = useState(initialKey || "");
    const [isAuthorized, setIsAuthorized] = useState(!!initialKey);
    const [domain, setDomain] = useState<"finance" | "legal" | "general">("finance");
    const [showReasoning, setShowReasoning] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");
    const [pipelineMode, setPipelineMode] = useState<"cloud" | "local">("cloud");
    const [isChatLoading, setIsChatLoading] = useState(false);

    // Document-aware state
    const [responseMode, setResponseMode] = useState<"strict" | "hybrid">("strict");
    const [uploadedDocs, setUploadedDocs] = useState<UploadedDoc[]>([]);
    const [showDocs, setShowDocs] = useState(false);
    const [isLoadingDocs, setIsLoadingDocs] = useState(false);
    const [selectionMode, setSelectionMode] = useState(false);
    const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

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
            if (data.documents?.length > 0) setShowDocs(true);
        } catch { /* ignore */ }
        finally { setIsLoadingDocs(false); }
    };

    // Document polling removed - use manual refresh button instead

    const fetchHistory = async (key: string) => {
        try {
            const res = await fetch(`/api/chat/history?accessKey=${key}`);
            const data = await res.json();
            if (data.messages && data.messages.length > 0) {
                setMessages(data.messages);
            } else {
                setMessages([{
                    role: "assistant",
                    content: `Secure session established. I'm ready to answer questions from your uploaded documents.\n\n**Current mode:** ${responseMode === "strict" ? "🔒 Strict — answers only from your documents." : "⚡ Hybrid — documents + general knowledge."}`,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }]);
            }
        } catch (err) {
            console.error("History fetch idle:", err);
        }
    };

    const saveMessage = async (msg: any) => {
        try {
            await fetch("/api/chat/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...msg, accessKey })
            });
        } catch (err) {
            console.error("Save message failed:", err);
        }
    };

    const handleAuthorize = () => {
        if (accessKey.startsWith("DPA-")) {
            if (accessKey.includes("-F-")) setDomain("finance");
            else if (accessKey.includes("-L-")) setDomain("legal");
            else setDomain("general");
            setIsAuthorized(true);
            fetchDocuments(accessKey);
            fetchHistory(accessKey);
        } else {
            alert("Invalid Access Key. Keys must start with DPA-");
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        setIsUploading(true);
        try {
            const formData = new FormData();
            files.forEach(file => formData.append("files", file));
            formData.append("domain", domain);
            formData.append("accessKey", accessKey);
            // Get assistant name from history if possible, or use a default
            formData.append("assistantName", "Attached Knowledge"); 

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData
            });

            if (res.ok) {
                fetchDocuments(accessKey); // Refresh the list
            }
        } catch (err) {
            console.error("Upload failed:", err);
        } finally {
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
                body: JSON.stringify({
                    docId1: selectedDocs[0],
                    docId2: selectedDocs[1],
                    accessKey
                })
            });
            const data = await res.json();
            
            const assistMsg = {
                role: "assistant",
                content: data.comparison,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                metadata: {
                    source: "Document Comparison Engine",
                    confidence: 100
                }
            };
            
            setMessages(prev => [...prev, assistMsg]);
            saveMessage(assistMsg);
            setSelectionMode(false);
            setSelectedDocs([]);
        } catch (err) {
            console.error("Comparison failed:", err);
        } finally {
            setIsChatLoading(false);
        }
    };

    // Auto-authorize if key is in URL
    useEffect(() => {
        if (initialKey?.startsWith("DPA-")) {
            handleAuthorize();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const sendMessage = async (overrideInput?: string) => {
        const textToSend = overrideInput || input;
        if (!textToSend.trim()) return;

        const userMsg = { 
            role: "user", 
            content: textToSend, 
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        };
        
        setMessages(prev => [...prev, userMsg]);
        if (!overrideInput) setInput("");
        setIsChatLoading(true);

        // Save user message
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
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                // Grouping technical metadata for the Shadow Persistence Layer
                metadata: {
                    confidence: data.confidence,
                    source: data.source,
                    reasoning: data.reasoning,
                    actions: data.actions
                }
            };

            setMessages(prev => [...prev, assistMsg]);
            saveMessage(assistMsg);

            if (pipelineMode === "local" && data.reasoning) setShowReasoning(true);
        } catch (error: any) {
            const errMsg = {
                role: "assistant",
                content: "⚠️ Connection to domain pipeline failed. Please check your access key or ensure Ollama is running.",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, errMsg]);
        } finally {
            setIsChatLoading(false);
        }
    };

    const summarizeChat = () => {
        if (messages.length < 2) return;
        sendMessage("Please provide a professional summary of our conversation so far, highlighting key data points and conclusions.");
    };

    const [copySuccess, setCopySuccess] = useState<string | null>(null);

    const copyToClipboard = async (text: string, id: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopySuccess(id);
            setTimeout(() => setCopySuccess(null), 2000);
        } catch (err) {
            console.error("Copy failed:", err);
        }
    };

    const copyChat = () => {
        if (messages.length === 0) return;
        const text = messages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n\n');
        copyToClipboard(text, 'chat');
    };

    if (!isAuthorized) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-finance-primary/5 to-legal-primary/5 pointer-events-none" />
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md z-10">
                    <Card className="glass-card p-8 text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Key className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Key Gateway</h1>
                        <p className="text-muted-foreground mb-8">Enter your unique Assistant Key to unlock the specialized reasoning pipeline.</p>
                        <div className="space-y-4">
                            <Input
                                placeholder="Enter Access Key (e.g., DPA-XXXXXX)"
                                value={accessKey}
                                onChange={(e) => setAccessKey(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleAuthorize()}
                                className="h-14 text-center text-lg font-mono tracking-widest"
                            />
                            <Button size="lg" className="w-full rounded-full h-12" onClick={handleAuthorize}>
                                Verify &amp; Unlock Pipeline
                            </Button>
                        </div>
                    </Card>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            {/* Left Sidebar */}
            <aside className="w-64 border-r border-white/5 bg-card/10 flex flex-col p-4 overflow-y-auto">
                <div className="flex items-center gap-2 px-2 py-4 mb-6">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${domain === "finance" ? "bg-finance-primary" : domain === "legal" ? "bg-legal-primary" : "bg-primary"}`}>
                        {domain === "finance" ? <TrendingUp className="w-5 h-5 text-white" /> : domain === "legal" ? <Shield className="w-5 h-5 text-white" /> : <BookOpen className="w-5 h-5 text-white" />}
                    </div>
                    <span className="font-bold tracking-tight">Tri mind</span>
                </div>

                {/* Current context */}
                <div className="mb-6">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold px-2 mb-2">Current Context</p>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 border border-white/5">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-sm font-medium capitalize">{domain} Assistant</span>
                    </button>
                </div>

                {/* Response Mode Toggle */}
                <div className="mb-6">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold px-2 mb-2">Response Mode</p>
                    <div className="space-y-2">
                        <button
                            onClick={() => setResponseMode("strict")}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all border text-sm ${responseMode === "strict" ? "bg-primary/10 border-primary/50 text-primary" : "bg-white/[0.02] border-white/5 hover:bg-white/5"}`}
                        >
                            <Lock className="w-4 h-4 flex-shrink-0" />
                            <div>
                                <p className="font-semibold text-xs">Strict</p>
                                <p className="text-[10px] text-muted-foreground">Docs only, no hallucination</p>
                            </div>
                        </button>
                        <button
                            onClick={() => setResponseMode("hybrid")}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all border text-sm ${responseMode === "hybrid" ? "bg-primary/10 border-primary/50 text-primary" : "bg-white/[0.02] border-white/5 hover:bg-white/5"}`}
                        >
                            <Layers className="w-4 h-4 flex-shrink-0" />
                            <div>
                                <p className="font-semibold text-xs">Hybrid</p>
                                <p className="text-[10px] text-muted-foreground">Docs + general knowledge</p>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Uploaded Documents Dropdown */}
                <div className="mb-6">
                    <button
                        onClick={() => setShowDocs(!showDocs)}
                        className="w-full flex items-center justify-between px-2 mb-2 hover:opacity-80 transition-opacity"
                    >
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                            Uploaded Documents {uploadedDocs.length > 0 && `(${uploadedDocs.length})`}
                        </p>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={(e) => { e.stopPropagation(); fetchDocuments(accessKey); }}
                                className="p-1 rounded-md hover:bg-white/5 text-muted-foreground transition-colors"
                                title="Refresh documents"
                            >
                                <RefreshCw className="w-3.5 h-3.5" />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); setSelectionMode(!selectionMode); }}
                                className={`p-1 rounded-md transition-colors ${selectionMode ? 'bg-primary/20 text-primary' : 'hover:bg-white/5 text-muted-foreground'}`}
                                title="Compare Mode"
                            >
                                <GitCompare className="w-3.5 h-3.5" />
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
                                    <div className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground">
                                        <Loader2 className="w-3 h-3 animate-spin" /> Loading...
                                    </div>
                                ) : uploadedDocs.length === 0 ? (
                                    <div className="px-3 py-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-muted-foreground">
                                        No documents indexed yet. Upload files in the Build flow.
                                    </div>
                                ) : (
                                    <div className="space-y-1">
                                        {uploadedDocs.map((doc, i) => {
                                            const isSelected = selectedDocs.includes(doc.id as any);
                                            return (
                                                <div 
                                                    key={i} 
                                                    className={`flex items-start gap-2 px-3 py-2 rounded-xl bg-white/[0.02] border transition-all cursor-pointer ${isSelected ? 'border-primary/50 bg-primary/5' : 'border-white/5 hover:bg-white/5'}`}
                                                    onClick={() => {
                                                        if (selectionMode) {
                                                            setSelectedDocs(prev => 
                                                                prev.includes(doc.id as any) 
                                                                    ? prev.filter(id => id !== doc.id)
                                                                    : prev.length < 2 ? [...prev, doc.id as any] : prev
                                                            );
                                                        }
                                                    }}
                                                >
                                                    {selectionMode ? (
                                                        <div className={`w-3.5 h-3.5 rounded border border-white/20 mt-0.5 flex items-center justify-center transition-colors ${isSelected ? 'bg-primary border-primary' : 'bg-transparent'}`}>
                                                            {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                                                        </div>
                                                    ) : doc.status === "SUCCESS" ? (
                                                        <FileText className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                                                    ) : doc.status === "ERROR" ? (
                                                        <AlertTriangle className="w-3.5 h-3.5 text-destructive mt-0.5 flex-shrink-0" />
                                                    ) : (
                                                        <Loader2 className="w-3.5 h-3.5 text-yellow-500 animate-spin mt-0.5 flex-shrink-0" />
                                                    )}
                                                    <div className="overflow-hidden">
                                                        <p className="text-xs font-medium truncate" title={(doc as any).fileName}>{(doc as any).fileName}</p>
                                                        <p className={`text-[10px] ${doc.status === "SUCCESS" ? 'text-muted-foreground' : doc.status === "ERROR" ? 'text-destructive' : 'text-yellow-500/80 animate-pulse'}`}>
                                                            {doc.status === "SUCCESS" ? "Indexed" : doc.status === "ERROR" ? "Failed" : "Processing..."}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        {selectionMode && selectedDocs.length === 2 && (
                                            <Button 
                                                size="sm" 
                                                className="w-full mt-2 rounded-xl bg-primary hover:bg-primary/90 text-[10px] h-8 gap-2"
                                                onClick={handleCompare}
                                            >
                                                <GitCompare className="w-3 h-3" />
                                                Compare Selection
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="space-y-1 mt-auto">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold px-2 mb-2">Quick Actions</p>
                    <Button 
                        variant="ghost" 
                        className="w-full justify-start gap-3 rounded-xl hover:bg-white/5 text-sm"
                        onClick={summarizeChat}
                    >
                        <Brain className="w-4 h-4 text-primary" />
                        Summarize Chat
                    </Button>
                    <Button 
                        variant="ghost" 
                        className="w-full justify-start gap-3 rounded-xl hover:bg-white/5 text-sm"
                        onClick={copyChat}
                    >
                        {copySuccess === 'chat' ? (
                            <Check className="w-4 h-4 text-green-500" />
                        ) : (
                            <Copy className="w-4 h-4" />
                        )}
                        {copySuccess === 'chat' ? 'Copied!' : 'Copy Conversation'}
                    </Button>
                </div>

                {/* Key Display */}
                <div className="mt-4 p-2 bg-white/5 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                            <Key className="w-4 h-4" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-[10px] uppercase text-muted-foreground font-bold">Encrypted Key</p>
                            <p className="text-xs font-mono truncate">{accessKey}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col relative bg-card/5">
                {/* Header */}
                <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-background/50 backdrop-blur-sm z-10">
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard">
                            <Button variant="ghost" size="sm" className="gap-2 rounded-xl text-muted-foreground hover:text-foreground mr-2">
                                <ArrowRight className="w-4 h-4 rotate-180" />
                                <span className="hidden sm:inline">Dashboard</span>
                            </Button>
                        </Link>
                        <Badge variant={domain === "finance" ? "finance" : "legal"} className="uppercase">{domain} Pipeline</Badge>
                        <h2 className="font-bold">Chat Session</h2>
                        <Badge variant="outline" className={`ml-2 ${pipelineMode === "local" ? "border-orange-500/50 text-orange-500" : "border-blue-500/50 text-blue-500"}`}>
                            {pipelineMode === "local" ? "Local SLM" : "Cloud LLM"}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge variant="outline" className={`text-xs ${responseMode === "strict" ? "border-red-500/30 text-red-400" : "border-violet-500/30 text-violet-400"}`}>
                            {responseMode === "strict" ? "🔒 Strict Mode" : "⚡ Hybrid Mode"}
                        </Badge>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className={`w-2 h-2 rounded-full ${pipelineMode === "local" ? "bg-orange-500" : "bg-green-500"}`} />
                            Models Synchronized
                        </div>
                    </div>
                </header>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-center opacity-40 gap-4">
                            <Brain className="w-12 h-12" />
                            <p className="text-sm">Ask a question about your uploaded documents.</p>
                        </div>
                    )}
                    {messages.map((m, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[80%] space-y-2 ${m.role === "user" ? "flex flex-col items-end" : ""}`}>
                                <div className={`p-4 rounded-2xl relative ${m.role === "user" ? "bg-primary text-primary-foreground" : "glass border-white/10"}`}>
                                    {m.role === "user" ? (
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
                                    ) : (
                                        <MarkdownRenderer 
                                            content={m.content} 
                                            className="text-sm"
                                            accessKey={accessKey}
                                        />
                                    )}
                                </div>
                                <div className={`flex items-center gap-3 px-1 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                                    <p className="text-[10px] text-muted-foreground opacity-30">{m.timestamp}</p>
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => copyToClipboard(m.content, `msg-${i}`)}
                                            className="p-1 rounded-md hover:bg-white/5 transition-colors group/btn"
                                            title="Copy message"
                                        >
                                            {copySuccess === `msg-${i}` ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3 text-muted-foreground group-hover/btn:text-primary" />}
                                        </button>
                                        {m.role === "assistant" && (
                                            <button 
                                                onClick={copyChat}
                                                className="p-1 rounded-md hover:bg-white/5 transition-colors group/btn"
                                                title="Copy full conversation"
                                            >
                                                {copySuccess === 'chat' ? <Check className="w-3 h-3 text-green-500" /> : <Layers className="w-3 h-3 text-muted-foreground group-hover/btn:text-primary" />}
                                            </button>
                                        )}
                                    </div>
                                    {m.role === "assistant" && m.metadata?.actions && m.metadata.actions.length > 0 && (
                                        <div className="mt-2 space-y-2">
                                            {m.metadata.actions.map((act: any, idx: number) => (
                                                <Badge key={idx} variant="outline" className="text-[9px] border-green-500/30 bg-green-500/10 text-green-400 py-1 px-3 flex items-center gap-2">
                                                    <Zap className="w-3 h-3" /> {act.output}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                    {m.role === "assistant" && m.metadata?.source && (
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <Badge variant="outline" className="text-[9px] border-white/5 bg-white/5 py-0 px-2 flex items-center gap-1 uppercase tracking-widest text-muted-foreground">
                                                <FileText className="w-2.5 h-2.5" /> {m.metadata.source}
                                            </Badge>
                                            {m.metadata.crossDomainUsed && (
                                                <Badge variant="outline" className="text-[9px] border-violet-500/30 bg-violet-500/10 text-violet-400 py-0 px-2 flex items-center gap-1 uppercase tracking-widest">
                                                    <Link2 className="w-2.5 h-2.5" /> Cross-Domain
                                                </Badge>
                                            )}
                                            {m.metadata.confidence !== undefined && (
                                                <Badge variant="outline" className={`text-[9px] border-white/5 bg-white/5 py-0 px-2 uppercase tracking-widest ${m.metadata.confidence >= 80 ? "text-green-500" : "text-yellow-500"}`}>
                                                    {m.metadata.confidence}%
                                                </Badge>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {isChatLoading && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                            <div className="max-w-[80%] p-4 rounded-2xl glass border-white/10">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <div className="flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                                    </div>
                                    Searching documents...
                                </div>
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-6 border-t border-white/5 bg-background/50 backdrop-blur-lg">
                    <div className="max-w-4xl mx-auto relative group">
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            multiple
                            onChange={handleFileUpload}
                        />
                        <div className="absolute left-2 top-2 z-20">
                            <Button
                                size="icon"
                                variant="ghost"
                                className="rounded-xl hover:bg-primary/10 hover:text-primary transition-colors h-10 w-10"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isUploading}
                            >
                                {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <FilePlus className="w-5 h-5" />}
                            </Button>
                        </div>
                        <Input
                            placeholder={responseMode === "strict" ? "Ask about your documents (strict mode)..." : "Ask anything — docs + general knowledge..."}
                            className="h-14 pl-14 pr-32 rounded-2xl bg-white/[0.03] border-white/10 focus:bg-white/[0.06] transition-all"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                            disabled={isChatLoading}
                        />
                        <div className="absolute right-2 top-2 flex gap-2">
                            <Button
                                size="icon"
                                variant="ghost"
                                className={`rounded-xl ${showReasoning ? "text-primary bg-primary/10" : ""}`}
                                onClick={() => setShowReasoning(!showReasoning)}
                                title="Toggle Reasoning Trace"
                            >
                                <Brain className="w-5 h-5" />
                            </Button>
                            <Button size="icon" className="rounded-xl shadow-lg" onClick={() => sendMessage()} disabled={isChatLoading || !input.trim()}>
                                {isChatLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Right Sidebar - Reasoning Trace */}
            <AnimatePresence>
                {showReasoning && (
                    <motion.aside
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 320, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="border-l border-white/5 bg-card/20 flex flex-col overflow-hidden"
                    >
                        <div className="p-6 h-full flex flex-col">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <Terminal className="w-5 h-5 text-primary" />
                                    <h3 className="font-bold">Reasoning Trace</h3>
                                </div>
                                <button onClick={() => setShowReasoning(false)} className="text-muted-foreground hover:text-foreground">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="space-y-6 overflow-y-auto pr-2 flex-1">
                                <div className="space-y-4">
                                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Internal Logic Steps</p>
                                    {(messages[messages.length - 1]?.metadata?.reasoning || [
                                        { step: "Waiting", status: "in-progress", desc: "Send a message to see reasoning steps." }
                                    ]).map((s: any, i: number, arr: any[]) => (
                                        <div key={i} className="flex gap-3">
                                            <div className="mt-1">
                                                <div className={`w-2 h-2 rounded-full ${s.status === "complete" ? "bg-green-500" : "bg-primary animate-pulse"}`} />
                                                {i < arr.length - 1 && <div className="w-[1px] h-10 bg-white/5 ml-[3.5px]" />}
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold">{s.step}</p>
                                                <p className="text-[11px] text-muted-foreground">{s.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {messages[messages.length - 1]?.metadata?.source && (
                                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 space-y-2">
                                        <div className="flex items-center gap-2 text-green-400">
                                            <FileText className="w-4 h-4" />
                                            <p className="text-xs font-bold">Source Documents</p>
                                        </div>
                                        <p className="text-[11px] text-green-200/70 leading-relaxed">
                                            {messages[messages.length - 1].metadata.source}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function ChatPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}>
            <ChatContent />
        </Suspense>
    );
}
