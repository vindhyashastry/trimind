"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import { DocumentViewer } from "./DocumentViewer";

interface CitationLinkProps {
  fileName: string;
  pageNumber?: number;
  chunkId?: string;
  documentId?: string;
  accessKey: string;
  sourceIndex?: number;
  isCrossDomain?: boolean;
  assistantName?: string;
  children: React.ReactNode;
  className?: string;
}

export function CitationLink({
  fileName,
  pageNumber,
  chunkId,
  documentId,
  accessKey,
  sourceIndex,
  isCrossDomain = false,
  assistantName,
  children,
  className = ""
}: CitationLinkProps) {
  const [showViewer, setShowViewer] = useState(false);

  // Only make it clickable if we have a chunkId to fetch
  const isClickable = !!chunkId;

  if (!isClickable) {
    // Not clickable - just render a styled span
    return (
      <span
        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium ${
          isCrossDomain
            ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
            : "bg-primary/20 text-primary border border-primary/30"
        } ${className}`}
      >
        <FileText className="w-3 h-3" />
        {children}
      </span>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowViewer(true)}
        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium transition-all hover:scale-105 cursor-pointer ${
          isCrossDomain
            ? "bg-violet-500/20 text-violet-300 border border-violet-500/30 hover:bg-violet-500/30 hover:border-violet-500/50"
            : "bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 hover:border-primary/50"
        } ${className}`}
        title={`Click to view source: ${fileName}${pageNumber ? `, Page ${pageNumber}` : ""}`}
      >
        <FileText className="w-3 h-3" />
        {children}
      </button>

      <DocumentViewer
        isOpen={showViewer}
        onClose={() => setShowViewer(false)}
        fileName={fileName}
        pageNumber={pageNumber}
        chunkId={chunkId}
        documentId={documentId}
        accessKey={accessKey}
      />
    </>
  );
}

// Utility function to parse citations from markdown-like text
export interface ParsedCitation {
  originalText: string;
  fileName: string;
  pageNumber?: number;
  sourceIndex: number;
  isCrossDomain: boolean;
  assistantName?: string;
}

export function parseCitations(text: string): ParsedCitation[] {
  const citations: ParsedCitation[] = [];
  
  // Match [Source X: filename.pdf, Page N] or [Cross-Source X: filename.pdf, Page N from AssistantName]
  const sourceRegex = /\[(Cross-)?Source (\d+): ([^,\]]+)(?:,\s*Page (\d+))?(?:\s+from\s+([^\]]+))?\]/g;
  
  let match;
  while ((match = sourceRegex.exec(text)) !== null) {
    citations.push({
      originalText: match[0],
      isCrossDomain: !!match[1],
      sourceIndex: parseInt(match[2]),
      fileName: match[3].trim(),
      pageNumber: match[4] ? parseInt(match[4]) : undefined,
      assistantName: match[5]?.trim()
    });
  }
  
  return citations;
}

// Utility function to render text with clickable citations
export function renderTextWithCitations(
  text: string,
  accessKey: string,
  sourceMap: Map<string, { chunkId?: string; documentId?: string }>
): React.ReactNode[] {
  const result: React.ReactNode[] = [];
  const sourceRegex = /\[(Cross-)?Source (\d+): ([^,\]]+)(?:,\s*Page (\d+))?(?:\s+from\s+([^\]]+))?\]/g;
  
  let lastIndex = 0;
  let match;
  
  while ((match = sourceRegex.exec(text)) !== null) {
    // Add text before the citation
    if (match.index > lastIndex) {
      result.push(text.slice(lastIndex, match.index));
    }
    
    const isCrossDomain = !!match[1];
    const sourceIndex = parseInt(match[2]);
    const fileName = match[3].trim();
    const pageNumber = match[4] ? parseInt(match[4]) : undefined;
    const assistantName = match[5]?.trim();
    
    // Generate a key to look up chunk info
    const key = `${fileName}-${sourceIndex}-${pageNumber || 0}`;
    const chunkInfo = sourceMap.get(key);
    
    result.push(
      <CitationLink
        key={`citation-${result.length}`}
        fileName={fileName}
        pageNumber={pageNumber}
        chunkId={chunkInfo?.chunkId}
        documentId={chunkInfo?.documentId}
        accessKey={accessKey}
        sourceIndex={sourceIndex}
        isCrossDomain={isCrossDomain}
        assistantName={assistantName}
      >
        {fileName}{pageNumber ? `, Page ${pageNumber}` : ""}
      </CitationLink>
    );
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }
  
  return result;
}
