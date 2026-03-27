"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Link2,
  Check,
  Loader2,
  TrendingUp,
  Shield,
  BookOpen,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AssistantInfo {
  id: string;
  name: string;
  accessKey: string;
  category: string | null;
}

interface Connection {
  id?: string;
  targetId: string;
  permission: string;
  target?: AssistantInfo;
  source?: AssistantInfo;
}

interface ManageConnectionsProps {
  assistantId: string;
  assistantName: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ManageConnections({
  assistantId,
  assistantName,
  isOpen,
  onClose
}: ManageConnectionsProps) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [outgoing, setOutgoing] = useState<Connection[]>([]);
  const [available, setAvailable] = useState<AssistantInfo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchConnections();
    }
  }, [isOpen, assistantId]);

  const fetchConnections = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/assistants/${assistantId}/connections`);
      if (!res.ok) throw new Error("Failed to fetch connections");
      const data = await res.json();
      
      setOutgoing(data.outgoing.map((r: any) => ({
        id: r.id,
        targetId: r.targetId,
        permission: r.permission,
        target: r.target
      })));
      
      setAvailable(data.available);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleConnection = (targetAssistant: AssistantInfo) => {
    const existingIndex = outgoing.findIndex(c => c.targetId === targetAssistant.id);
    
    if (existingIndex >= 0) {
      // Toggle permission: read -> none, none -> read
      const current = outgoing[existingIndex];
      if (current.permission === "read") {
        // Remove connection
        setOutgoing(outgoing.filter((_, i) => i !== existingIndex));
        setAvailable([...available, targetAssistant]);
      } else {
        // Change to read
        const newOutgoing = [...outgoing];
        newOutgoing[existingIndex] = { ...current, permission: "read" };
        setOutgoing(newOutgoing);
      }
    } else {
      // Add new connection
      setOutgoing([...outgoing, {
        targetId: targetAssistant.id,
        permission: "read",
        target: targetAssistant
      }]);
      setAvailable(available.filter(a => a.id !== targetAssistant.id));
    }
  };

  const addFromAvailable = (assistant: AssistantInfo, permission: string) => {
    setOutgoing([...outgoing, {
      targetId: assistant.id,
      permission,
      target: assistant
    }]);
    setAvailable(available.filter(a => a.id !== assistant.id));
  };

  const saveConnections = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);
    
    try {
      const connections = outgoing.map(c => ({
        targetId: c.targetId,
        permission: c.permission
      }));
      
      const res = await fetch(`/api/assistants/${assistantId}/connections`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ connections })
      });
      
      if (!res.ok) throw new Error("Failed to save connections");
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const getDomainIcon = (category: string | null) => {
    switch (category?.toLowerCase()) {
      case "finance":
        return <TrendingUp className="w-5 h-5 text-finance-primary" />;
      case "legal":
        return <Shield className="w-5 h-5 text-legal-primary" />;
      default:
        return <BookOpen className="w-5 h-5 text-primary" />;
    }
  };

  const getDomainColor = (category: string | null) => {
    switch (category?.toLowerCase()) {
      case "finance":
        return "finance";
      case "legal":
        return "legal";
      default:
        return "default";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-lg"
          >
            <Card className="border-white/10 bg-background/95 backdrop-blur-xl">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10">
                      <Link2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Manage Connections</h2>
                      <p className="text-sm text-muted-foreground">
                        Connect <span className="text-primary font-medium">{assistantName}</span> to other assistants
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={onClose}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {error && (
                  <div className="mb-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-2 text-destructive text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </div>
                )}

                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Current Connections */}
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">
                        Active Connections ({outgoing.length})
                      </h3>
                      
                      {outgoing.length === 0 ? (
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center text-sm text-muted-foreground">
                          No connections yet. Add assistants below.
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {outgoing.map((conn) => (
                            <motion.div
                              key={conn.targetId}
                              layout
                              className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10"
                            >
                              <div className="p-2 rounded-lg bg-white/5">
                                {getDomainIcon(conn.target?.category || conn.permission)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">
                                  {conn.target?.name || "Unknown Assistant"}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                  {conn.target?.accessKey || conn.targetId}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant={getDomainColor(conn.target?.category ?? null) as any}
                                  className="text-[10px]"
                                >
                                {conn.target?.category || "general"}
                              </Badge>
                              <Badge
                                variant="outline"
                                className="text-[10px] border-green-500/30 text-green-400"
                              >
                                <Check className="w-3 h-3 mr-1" />
                                {conn.permission}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                                onClick={() => {
                                  const newOutgoing = outgoing.filter(c => c.targetId !== conn.targetId);
                                  setOutgoing(newOutgoing);
                                  if (conn.target) {
                                    setAvailable([...available, conn.target as AssistantInfo]);
                                  }
                                }}
                              >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Available Assistants */}
                    {available.length > 0 && (
                      <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">
                          Available Assistants ({available.length})
                        </h3>
                        <div className="space-y-2">
                          {available.map((assistant) => (
                            <motion.div
                              key={assistant.id}
                              layout
                              className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors cursor-pointer"
                              onClick={() => addFromAvailable(assistant, "read")}
                            >
                              <div className="p-2 rounded-lg bg-white/5">
                                {getDomainIcon(assistant.category)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{assistant.name}</p>
                                <p className="text-xs text-muted-foreground truncate">
                                  {assistant.accessKey}
                                </p>
                              </div>
                              <Badge
                                variant={getDomainColor(assistant.category ?? null) as any}
                                className="text-[10px]"
                              >
                                {assistant.category || "general"}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-primary"
                              >
                                + Add
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Info Box */}
                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium text-primary">Read permission</span> allows{" "}
                        <span className="font-medium">{assistantName}</span> to query connected
                        assistants' documents when answering questions.
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-2">
                      <Button variant="ghost" onClick={onClose}>
                        Cancel
                      </Button>
                      <Button
                        onClick={saveConnections}
                        disabled={saving}
                        className="rounded-full px-6"
                      >
                        {saving ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : success ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Saved!
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
