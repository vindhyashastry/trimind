"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Link2, Check, Loader2, TrendingUp, Shield, BookOpen, AlertCircle, Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

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

function getDomainConfig(category: string | null) {
  switch (category?.toLowerCase()) {
    case "finance":
      return { icon: TrendingUp, badge: "finance" as const, color: "text-finance-primary", bg: "bg-finance-light" };
    case "legal":
      return { icon: Shield, badge: "legal" as const, color: "text-legal-primary", bg: "bg-legal-light" };
    default:
      return { icon: BookOpen, badge: "general" as const, color: "text-general-primary", bg: "bg-general-light" };
  }
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
    if (isOpen) fetchConnections();
  }, [isOpen, assistantId]);

  const fetchConnections = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/assistants/${assistantId}/connections`);
      if (!res.ok) throw new Error("Failed to fetch connections");
      const data = await res.json();
      setOutgoing(data.outgoing.map((r: any) => ({
        id: r.id, targetId: r.targetId, permission: r.permission, target: r.target
      })));
      setAvailable(data.available);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addFromAvailable = (assistant: AssistantInfo) => {
    setOutgoing(prev => [...prev, { targetId: assistant.id, permission: "read", target: assistant }]);
    setAvailable(prev => prev.filter(a => a.id !== assistant.id));
  };

  const removeConnection = (targetId: string, target?: AssistantInfo) => {
    setOutgoing(prev => prev.filter(c => c.targetId !== targetId));
    if (target) setAvailable(prev => [...prev, target]);
  };

  const saveConnections = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch(`/api/assistants/${assistantId}/connections`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ connections: outgoing.map(c => ({ targetId: c.targetId, permission: c.permission })) })
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 8 }}
            className="w-full max-w-md"
          >
            <div className="rounded-2xl border border-border bg-background card-shadow-lg overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Link2 className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-sm">Manage Connections</h2>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">{assistantName}</span>
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Body */}
              <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
                {error && (
                  <div className="mb-4 p-3 rounded-xl bg-destructive/8 border border-destructive/20 flex items-center gap-2 text-destructive text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                  </div>
                )}

                {loading ? (
                  <div className="flex items-center justify-center py-10">
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <div className="space-y-5">
                    {/* Active connections */}
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                        Active Connections ({outgoing.length})
                      </h3>
                      {outgoing.length === 0 ? (
                        <div className="py-4 rounded-xl bg-secondary/40 text-center text-sm text-muted-foreground">
                          No connections yet
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {outgoing.map((conn) => {
                            const config = getDomainConfig(conn.target?.category ?? null);
                            const Icon = config.icon;
                            return (
                              <motion.div
                                key={conn.targetId}
                                layout
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-border bg-secondary/20"
                              >
                                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", config.bg)}>
                                  <Icon className={cn("w-4 h-4", config.color)} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">
                                    {conn.target?.name || "Unknown"}
                                  </p>
                                  <p className="text-xs text-muted-foreground truncate">
                                    {conn.target?.accessKey}
                                  </p>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Badge variant={config.badge} className="text-[10px] capitalize">
                                    {conn.target?.category || "general"}
                                  </Badge>
                                  <Badge variant="success" className="text-[10px] gap-1">
                                    <Check className="w-2.5 h-2.5" />
                                    read
                                  </Badge>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                    onClick={() => removeConnection(conn.targetId, conn.target as AssistantInfo | undefined)}
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </Button>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Available assistants */}
                    {available.length > 0 && (
                      <div>
                        <Separator className="mb-4" />
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                          Available ({available.length})
                        </h3>
                        <div className="space-y-2">
                          {available.map((assistant) => {
                            const config = getDomainConfig(assistant.category);
                            const Icon = config.icon;
                            return (
                              <motion.div
                                key={assistant.id}
                                layout
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-border bg-card hover:border-primary/30 hover:bg-secondary/20 transition-all cursor-pointer"
                                onClick={() => addFromAvailable(assistant)}
                              >
                                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", config.bg)}>
                                  <Icon className={cn("w-4 h-4", config.color)} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">{assistant.name}</p>
                                  <p className="text-xs text-muted-foreground truncate">{assistant.accessKey}</p>
                                </div>
                                <Badge variant={config.badge} className="text-[10px] capitalize flex-shrink-0">
                                  {assistant.category || "general"}
                                </Badge>
                                <Button variant="ghost" size="sm" className="h-7 text-primary text-xs gap-1 flex-shrink-0">
                                  <Plus className="w-3 h-3" />
                                  Add
                                </Button>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Info */}
                    <div className="rounded-xl bg-primary/5 border border-primary/15 p-3">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        <span className="font-medium text-primary">Read permission</span> allows{" "}
                        <span className="font-medium text-foreground">{assistantName}</span> to query
                        connected assistants' documents when answering questions.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-border flex justify-end gap-2 bg-secondary/20">
                <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
                <Button
                  size="sm"
                  onClick={saveConnections}
                  disabled={saving}
                  className="px-5"
                >
                  {saving ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving…</>
                  ) : success ? (
                    <><Check className="w-4 h-4 mr-2" />Saved!</>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
