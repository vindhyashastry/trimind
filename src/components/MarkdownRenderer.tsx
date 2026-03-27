import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChartRenderer } from "./ChartRenderer";
import { renderTextWithCitations } from "./CitationLink";
import React from "react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
  accessKey?: string;
  sourceMap?: Map<string, { chunkId?: string; documentId?: string }>;
}

export function MarkdownRenderer({ content, className = "", accessKey, sourceMap }: MarkdownRendererProps) {
  // Helper to check if text contains citations
  const hasCitations = (text: string) => /\[(Cross-)?Source \d+:[^\]]+\]/.test(text);
  
  // Helper to render text with citations
  const renderWithCitations = (children: React.ReactNode) => {
    const textContent = React.Children.toArray(children)
      .map(c => typeof c === "string" ? c : "")
      .join("");
    
    if (accessKey && sourceMap && hasCitations(textContent)) {
      return renderTextWithCitations(textContent, accessKey, sourceMap);
    }
    return children;
  };

  return (
    <div className={`prose prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto rounded-2xl border border-white/5 bg-white/[0.02] shadow-xl">
              <table className="w-full text-left text-sm border-collapse">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-white/5">{children}</thead>,
          tbody: ({ children }) => (
            <tbody className="divide-y divide-white/5 [&>tr:nth-child(even)]:bg-white/[0.01]">
              {children}
            </tbody>
          ),
          th: ({ children }) => (
            <th className="px-5 py-4 font-bold text-primary border-b border-white/5 text-xs uppercase tracking-widest leading-none">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-5 py-4 text-muted-foreground align-top leading-relaxed">
              {children}
            </td>
          ),
          h3: ({ children }) => (
            <div className="mt-10 mb-6 flex items-center gap-3 border-b border-white/5 pb-3">
              <div className="w-1.5 h-6 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.6)]" />
              <h3 className="text-sm font-bold tracking-[0.2em] text-foreground uppercase opacity-90">
                {children}
              </h3>
            </div>
          ),
          p: ({ children }) => {
            const rendered = renderWithCitations(children);
            return <p className="mb-4 last:mb-0 leading-relaxed text-muted-foreground/90">{rendered}</p>;
          },
          li: ({ children }) => {
            const rendered = renderWithCitations(children);
            return (
              <li className="flex items-start gap-3 mb-3 last:mb-0">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/30 mt-2 flex-shrink-0" />
                <span className="text-muted-foreground/90 leading-relaxed">{rendered}</span>
              </li>
            );
          },
          ul: ({ children }) => <ul className="mb-8 space-y-1 list-none pl-1">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-5 mb-8 space-y-2 text-muted-foreground/90">{children}</ol>,
          strong: ({ children }) => <strong className="font-bold text-white/90">{children}</strong>,
          code: ({ inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";

            if (!inline && language === "json" && String(children).includes('"type":')) {
              try {
                const codeString = String(children);
                if (codeString.includes("pie") || codeString.includes("bar") || codeString.includes("line")) {
                  return <ChartRenderer json={codeString} />;
                }
              } catch (e) {
                console.error("Chart render error:", e);
              }
            }

            return (
              <code className="px-1.5 py-0.5 rounded-md bg-white/10 font-mono text-[11px] text-primary/80" {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
