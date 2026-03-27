"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  FileText,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  Copy,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DocumentViewerProps {
  isOpen: boolean;
  onClose: () => void;
  fileName: string;
  pageNumber?: number;
  chunkId?: string;
  documentId?: string;
  accessKey: string;
  highlightedText?: string;
}

interface ChunkData {
  id: string;
  fileName: string;
  pageNumber?: number;
  text: string;
  precedingText: string;
  followingText: string;
  chunkIndex: number;
  totalChunks: number;
  sectionTitle?: string;
  documentId: string;
}

export function DocumentViewer({
  isOpen,
  onClose,
  fileName,
  pageNumber,
  chunkId,
  documentId,
  accessKey,
  highlightedText
}: DocumentViewerProps) {
  const [chunk, setChunk] = useState<ChunkData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (isOpen && chunkId) {
      fetchChunk();
    }
  }, [isOpen, chunkId]);

  const fetchChunk = async () => {
    if (!chunkId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch(
        `/api/documents/chunk?chunkId=${encodeURIComponent(chunkId)}&accessKey=${encodeURIComponent(accessKey)}`
      );
      
      if (!res.ok) {
        throw new Error("Failed to fetch chunk");
      }
      
      const data = await res.json();
      setChunk(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyText = async () => {
    if (!chunk) return;
    try {
      await navigator.clipboard.writeText(chunk.text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  // Highlight the relevant text within the content
  const renderHighlightedText = (text: string, highlight?: string) => {
    if (!highlight) return text;
    
    const index = text.toLowerCase().indexOf(highlight.toLowerCase());
    if (index === -1) return text;
    
    return (
      <>
        {text.slice(0, index)}
        <span className="bg-yellow-500/30 text-yellow-200 rounded px-0.5">
          {text.slice(index, index + highlight.length)}
        </span>
        {text.slice(index + highlight.length)}
      </>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Panel */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-background/95 backdrop-blur-xl border-l border-white/10 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h2 className="font-bold truncate" title={chunk?.fileName || fileName}>
                    {chunk?.fileName || fileName}
                  </h2>
                  {chunk?.pageNumber && (
                    <p className="text-xs text-muted-foreground">
                      Page {chunk.pageNumber}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={copyText}
                  disabled={!chunk}
                >
                  {copySuccess ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={onClose}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <AlertCircle className="w-12 h-12 text-destructive mb-4" />
                  <p className="text-muted-foreground">{error}</p>
                </div>
              ) : chunk ? (
                <div className="space-y-6">
                  {/* Metadata badges */}
                  <div className="flex flex-wrap gap-2">
                    {chunk.pageNumber && (
                      <Badge variant="outline" className="border-primary/30 text-primary">
                        Page {chunk.pageNumber}
                      </Badge>
                    )}
                    <Badge variant="outline" className="border-white/20">
                      Chunk {chunk.chunkIndex + 1} of {chunk.totalChunks}
                    </Badge>
                    {chunk.sectionTitle && (
                      <Badge variant="secondary">
                        {chunk.sectionTitle}
                      </Badge>
                    )}
                  </div>

                  {/* Preceding context (dimmed) */}
                  {chunk.precedingText && (
                    <div className="text-sm text-muted-foreground/60 italic border-l-2 border-white/10 pl-4">
                      ...{chunk.precedingText}
                    </div>
                  )}

                  {/* Main highlighted text */}
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                      <span className="text-xs font-medium text-yellow-500 uppercase tracking-widest">
                        Retrieved Context
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {renderHighlightedText(chunk.text, highlightedText)}
                    </p>
                  </div>

                  {/* Following context (dimmed) */}
                  {chunk.followingText && (
                    <div className="text-sm text-muted-foreground/60 italic border-l-2 border-white/10 pl-4">
                      {chunk.followingText}...
                    </div>
                  )}

                  {/* Document info */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                      Document Information
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="text-muted-foreground">File:</span>{" "}
                        <span className="font-medium">{chunk.fileName}</span>
                      </p>
                      {chunk.documentId && (
                        <p>
                          <span className="text-muted-foreground">Document ID:</span>{" "}
                          <code className="text-xs text-primary">{chunk.documentId.slice(0, 12)}...</code>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <FileText className="w-12 h-12 text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground">
                    Select a citation to view the source context
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Source Verification</span>
                {chunk && (
                  <span className="text-primary">
                    Verified • {chunk.fileName}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
