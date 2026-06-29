"use client";

import React from "react";
import ReactECharts from "echarts-for-react";
import { toPng, toJpeg } from "html-to-image";
import { Download, Image as ImageIcon } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface ChartData {
  type: "pie" | "bar" | "line";
  title?: string;
  data: { name: string; value: number }[];
  config?: {
    xKey?: string;
    yKey?: string;
    colors?: string[];
  };
}

const CHART_COLORS = [
  "#6366f1", "#10b981", "#f59e0b", "#ef4444",
  "#8b5cf6", "#ec4899", "#14b8a6", "#f97316",
];

const repairJson = (str: string): ChartData => {
  let target = str.trim();
  // Strip citation noise
  target = target.replace(/\[(Source|Cross-Source)\s*\d+:[^\]]+\]/g, "");
  target = target.replace(/\[\d+\]/g, "");

  try {
    return JSON.parse(target);
  } catch {
    // Auto-repair mismatched brackets/braces
    let repaired = target.replace(/,\s*$/, "");
    const openBraces = (repaired.match(/\{/g) || []).length;
    const closeBraces = (repaired.match(/\}/g) || []).length;
    const openBrackets = (repaired.match(/\[/g) || []).length;
    const closeBrackets = (repaired.match(/\]/g) || []).length;
    for (let i = 0; i < openBrackets - closeBrackets; i++) repaired += "]";
    for (let i = 0; i < openBraces - closeBraces; i++) repaired += "}";
    return JSON.parse(repaired);
  }
};

const buildOption = (chartConfig: ChartData) => {
  const { type, title, data, config = {} } = chartConfig;
  const xKey = config.xKey || "name";
  const yKey = config.yKey || "value";
  const colors = config.colors || CHART_COLORS;

  // Show dataZoom slider when there are many categories (bar/line)
  const needsZoom = (type === "bar" || type === "line") && data.length > 8;
  // How many bars to show at once before zoom kicks in
  const zoomEnd = needsZoom ? Math.round((8 / data.length) * 100) : 100;

  const baseOption = {
    color: colors,
    backgroundColor: "transparent",
    animation: true,
    animationDuration: 600,
    animationEasing: "cubicOut" as const,
    title: title
      ? {
          text: title,
          left: "left",
          right: 80, // leave room for export buttons
          overflow: "truncate" as const,
          ellipsis: "...",
          textStyle: {
            fontSize: 12,
            fontWeight: 700,
            color: "#0f172a",
            fontFamily: "Inter, sans-serif",
          },
        }
      : undefined,
    tooltip: {
      trigger: type === "pie" ? "item" : "axis",
      backgroundColor: "rgba(255,255,255,0.97)",
      borderColor: "rgba(0,0,0,0.08)",
      borderWidth: 1,
      borderRadius: 12,
      shadowBlur: 12,
      shadowColor: "rgba(0,0,0,0.08)",
      textStyle: { fontSize: 12, color: "#1e293b", fontFamily: "Inter, sans-serif" },
      ...(type === "pie"
        ? { formatter: "{b}: {c} ({d}%)" }
        : {}),
    },
    // Scroll slider shown when many data points
    ...(needsZoom ? {
      dataZoom: [
        {
          type: "slider",
          xAxisIndex: 0,
          start: 0,
          end: zoomEnd,
          height: 18,
          bottom: 4,
          borderColor: "transparent",
          backgroundColor: "#f1f5f9",
          fillerColor: "rgba(99,102,241,0.15)",
          handleStyle: { color: "#6366f1", borderColor: "#6366f1" },
          moveHandleStyle: { color: "#6366f1" },
          textStyle: { color: "#94a3b8", fontSize: 10 },
          brushSelect: false,
        },
      ],
    } : {}),
  };

  if (type === "pie") {
    return {
      ...baseOption,
      legend: {
        orient: "horizontal",
        bottom: 0,
        itemWidth: 10,
        itemHeight: 10,
        borderRadius: 10,
        textStyle: { fontSize: 11, color: "#64748b", fontFamily: "Inter, sans-serif" },
      },
      series: [
        {
          type: "pie",
          radius: ["40%", "65%"],
          center: ["50%", "48%"],
          padAngle: 4,
          itemStyle: { borderRadius: 6, borderColor: "#fff", borderWidth: 2 },
          label: { show: false },
          emphasis: {
            scale: true,
            scaleSize: 6,
            itemStyle: { shadowBlur: 16, shadowColor: "rgba(0,0,0,0.15)" },
          },
          data: data.map((d) => ({ name: d[xKey as keyof typeof d] ?? d.name, value: d[yKey as keyof typeof d] ?? d.value })),
        },
      ],
    };
  }

  if (type === "bar") {
    const bottomPad = needsZoom ? 52 : 40;
    return {
      ...baseOption,
      grid: { top: title ? 52 : 16, right: 16, bottom: bottomPad, left: 10, containLabel: true },
      xAxis: {
        type: "category" as const,
        data: data.map((d) => d[xKey as keyof typeof d] ?? d.name),
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          fontSize: 11,
          color: "#94a3b8",
          fontFamily: "Inter, sans-serif",
          // Rotate labels when many items to avoid overlap
          rotate: data.length > 6 ? 30 : 0,
          interval: 0,
          overflow: "truncate" as const,
          width: 80,
        },
      },
      yAxis: {
        type: "value" as const,
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: "#f1f5f9", type: "dashed" } },
        axisLabel: { fontSize: 11, color: "#94a3b8", fontFamily: "Inter, sans-serif" },
      },
      series: [
        {
          type: "bar",
          data: data.map((d) => d[yKey as keyof typeof d] ?? d.value),
          barMaxWidth: 48,
          barMinWidth: 12, // each bar always gets breathing room
          itemStyle: {
            borderRadius: [6, 6, 0, 0],
            color: {
              type: "linear" as const,
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: colors[0] },
                { offset: 1, color: colors[0] + "80" },
              ],
            },
          },
          emphasis: {
            itemStyle: { shadowBlur: 12, shadowColor: colors[0] + "40" },
          },
        },
      ],
    };
  }

  // line
  const bottomPadLine = needsZoom ? 52 : 40;
  return {
    ...baseOption,
    grid: { top: title ? 52 : 16, right: 16, bottom: bottomPadLine, left: 10, containLabel: true },
    xAxis: {
      type: "category" as const,
      data: data.map((d) => d[xKey as keyof typeof d] ?? d.name),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 11,
        color: "#94a3b8",
        fontFamily: "Inter, sans-serif",
        rotate: data.length > 6 ? 30 : 0,
        interval: 0,
        overflow: "truncate" as const,
        width: 80,
      },
      boundaryGap: false,
    },
    yAxis: {
      type: "value" as const,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: "#f1f5f9", type: "dashed" } },
      axisLabel: { fontSize: 11, color: "#94a3b8", fontFamily: "Inter, sans-serif" },
    },
    series: [
      {
        type: "line",
        data: data.map((d) => d[yKey as keyof typeof d] ?? d.value),
        smooth: true,
        symbol: "circle",
        symbolSize: 8,
        lineStyle: { width: 2.5, color: colors[0] },
        itemStyle: { color: colors[0], borderColor: "#fff", borderWidth: 2 },
        areaStyle: {
          color: {
            type: "linear" as const,
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: colors[0] + "30" },
              { offset: 1, color: colors[0] + "00" },
            ],
          },
        },
        emphasis: { scale: true },
      },
    ],
  };
};

export const ChartRenderer = React.memo(function ChartRenderer({ json }: { json: string }) {
  const chartRef = React.useRef<HTMLDivElement>(null);
  let chartConfig: ChartData;

  try {
    chartConfig = repairJson(json);
  } catch (e) {
    console.error("Chart JSON Parse Error:", e, json);
    return (
      <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 text-xs font-mono">
        <p className="font-bold mb-1">Failed to parse chart data</p>
        <p className="opacity-70">{e instanceof Error ? e.message : "Invalid JSON format"}</p>
        <div className="mt-2 p-2 bg-black/20 rounded border border-red-500/10 overflow-hidden text-[10px] whitespace-pre-wrap truncate max-h-[100px]">
          {json.slice(0, 200)}...
        </div>
      </div>
    );
  }

  const option = buildOption(chartConfig);

  const exportImage = async (format: "png" | "jpeg") => {
    if (!chartRef.current) return;
    try {
      const dataUrl =
        format === "png"
          ? await toPng(chartRef.current, { backgroundColor: "#ffffff", quality: 1, pixelRatio: 2 })
          : await toJpeg(chartRef.current, { backgroundColor: "#ffffff", quality: 0.95, pixelRatio: 2 });
      const ts = Date.now();
      const link = document.createElement("a");
      link.download = `chart-${chartConfig.title?.replace(/\s+/g, "-").toLowerCase() || "export"}-${ts}.${format}`;
      link.href = dataUrl;
      link.click();
      toast.success("Chart exported successfully!");
    } catch (err) {
      console.error("Export failed:", err);
      toast.error("Failed to export image. Please try again.");
    }
  };

  return (
    <div
      ref={chartRef}
      className="group/chart relative w-full min-w-[460px] my-6 p-6 rounded-3xl border border-black/5 bg-white/40 shadow-sm backdrop-blur-sm overflow-hidden"
    >
      {/* Export buttons */}
      <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover/chart:opacity-100 transition-opacity">
        <Button
          variant="outline"
          size="sm"
          className="h-7 rounded-full bg-white border-slate-200 hover:bg-slate-50 gap-1 text-[10px] px-2.5 shadow-none"
          onClick={() => exportImage("png")}
        >
          <ImageIcon className="w-3 h-3 text-slate-500" />
          PNG
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-7 rounded-full bg-white border-slate-200 hover:bg-slate-50 gap-1 text-[10px] px-2.5 shadow-none"
          onClick={() => exportImage("jpeg")}
        >
          <Download className="w-3 h-3 text-slate-500" />
          JPEG
        </Button>
      </div>

      {/* ECharts */}
      <ReactECharts
        option={option}
        style={{ height: 350, width: "100%" }}
        opts={{ renderer: "canvas" }}
        notMerge={true}
        lazyUpdate={false}
      />
    </div>
  );
});
