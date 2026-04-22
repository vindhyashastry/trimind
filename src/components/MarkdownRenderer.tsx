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

export const MarkdownRenderer = React.memo(function MarkdownRenderer({ content, className = "", accessKey, sourceMap }: MarkdownRendererProps) {
  const hasCitations = (text: string) => /\[(Cross-)?Source \d+:[^\]]+\]/.test(text);
  
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
    <div className={`prose prose-sm max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ children }) => (
            <div className="my-4 overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-left text-sm border-collapse">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-secondary border-b border-border">{children}</thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-border [&>tr:nth-child(even)]:bg-secondary/30">
              {children}
            </tbody>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 font-semibold text-foreground text-xs uppercase tracking-wider">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-muted-foreground align-top leading-relaxed text-sm">
              {children}
            </td>
          ),
          h1: ({ children }) => (
            <h1 className="text-xl font-bold text-foreground mt-6 mb-3">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg font-bold text-foreground mt-5 mb-2.5">{children}</h2>
          ),
          h3: ({ children }) => (
            <div className="mt-6 mb-3 flex items-center gap-2.5 border-b border-border pb-2">
              <div className="w-1 h-5 bg-primary rounded-full" />
              <h3 className="text-sm font-bold text-foreground tracking-wide">
                {children}
              </h3>
            </div>
          ),
          p: ({ children }) => {
            const rendered = renderWithCitations(children);
            return <div className="mb-3 last:mb-0 leading-relaxed text-foreground/85 text-sm">{rendered}</div>;
          },
          li: ({ children }) => {
            const rendered = renderWithCitations(children);
            return (
              <li className="flex items-start gap-2.5 mb-2 last:mb-0">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-2 flex-shrink-0" />
                <div className="text-foreground/85 leading-relaxed text-sm">{rendered}</div>
              </li>
            );
          },
          ul: ({ children }) => <ul className="mb-4 space-y-0.5 list-none pl-0">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-5 mb-4 space-y-1.5 text-foreground/85 text-sm">{children}</ol>,
          strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary/30 pl-4 italic text-muted-foreground my-3 text-sm">
              {children}
            </blockquote>
          ),
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

            if (inline) {
              return (
                <code className="px-1.5 py-0.5 rounded-md bg-secondary border border-border font-mono text-xs text-foreground" {...props}>
                  {children}
                </code>
              );
            }

            return (
              <div className="my-3 rounded-xl border border-border overflow-hidden">
                {language && (
                  <div className="px-4 py-2 bg-secondary border-b border-border text-xs font-mono text-muted-foreground">
                    {language}
                  </div>
                )}
                <pre className="p-4 bg-secondary/30 overflow-x-auto">
                  <code className="font-mono text-xs text-foreground leading-relaxed" {...props}>
                    {children}
                  </code>
                </pre>
              </div>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
});
