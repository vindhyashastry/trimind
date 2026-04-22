"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { toPng, toJpeg } from "html-to-image";
import { Download, Image as ImageIcon } from "lucide-react";
import { Button } from "./ui/button";

interface ChartData {
  type: "pie" | "bar" | "line";
  title?: string;
  data: any[];
  config?: {
    xKey?: string;
    yKey?: string;
    colors?: string[];
  };
}

const CHART_COLORS = ["#2563eb", "#059669", "#d97706", "#dc2626", "#7c3aed", "#db2777"];
const AXIS_COLOR = "hsl(215 16% 47%)";
const GRID_COLOR = "hsl(214 32% 91%)";

// Memoize the entire component to prevent re-renders unless the json prop changes
export const ChartRenderer = React.memo(function ChartRenderer({ json }: { json: string }) {
  const chartRef = React.useRef<HTMLDivElement>(null);
  let chartConfig: ChartData;

  const repairJson = (str: string) => {
    // 1. First, try to find the actual JSON block if it's surrounded by text
    let target = str.trim();
    
    // 2. Strip common trailing noise like citations [Source 1]
    target = target.replace(/\[(Source|Cross-Source)\s*\d+:[^\]]+\]/g, "");
    target = target.replace(/\[\d+\]/g, ""); // Also handle simple [1]
    
    try {
      return JSON.parse(target);
    } catch (e) {
      // 3. Try many-layered repair for truncation
      let repaired = target.trim();
      
      // Remove any trailing commas that break parsing
      repaired = repaired.replace(/,\s*$/, "");
      
      const openBraces = (repaired.match(/\{/g) || []).length;
      const closeBraces = (repaired.match(/\}/g) || []).length;
      const openBrackets = (repaired.match(/\[/g) || []).length;
      const closeBrackets = (repaired.match(/\]/g) || []).length;

      for (let i = 0; i < openBrackets - closeBrackets; i++) repaired += "]";
      for (let i = 0; i < openBraces - closeBraces; i++) repaired += "}";

      try {
        return JSON.parse(repaired);
      } catch (innerError) {
        // Last ditch effort: find the last valid closure
        console.warn("JSON repair failed, attempted:", repaired);
        throw e;
      }
    }
  };

  try {
    chartConfig = repairJson(json);
  } catch (e) {
    console.error("Chart JSON Parse Error:", e, "JSON string:", json);
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

  const { type, data, title, config = {} } = chartConfig;
  const xKey = config.xKey || "name";
  const yKey = config.yKey || "value";
  const colors = config.colors || CHART_COLORS;

  const exportImage = async (format: 'png' | 'jpeg') => {
    if (!chartRef.current) return;
    
    try {
      // Small delay to ensure rendering is complete
      const dataUrl = format === 'png' 
        ? await toPng(chartRef.current, { backgroundColor: '#ffffff', quality: 1, pixelRatio: 2 })
        : await toJpeg(chartRef.current, { backgroundColor: '#ffffff', quality: 0.95, pixelRatio: 2 });
      
      const timestamp = new Date().getTime();
      const link = document.createElement('a');
      link.download = `chart-${title?.replace(/\s+/g, '-').toLowerCase() || 'export'}-${timestamp}.${format}`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export failed:", err);
      alert("Failed to export image. Please try again.");
    }
  };

  const renderChart = () => {
    const tooltipStyle = { 
      backgroundColor: "rgba(255, 255, 255, 0.95)", 
      borderColor: "rgba(0,0,0,0.1)", 
      borderRadius: "12px", 
      backdropFilter: "blur(8px)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      fontSize: "12px"
    };

    switch (type) {
      case "pie":
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey={yKey}
              isAnimationActive={false}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} stroke="rgba(255,255,255,0.8)" />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={tooltipStyle}
              itemStyle={{ color: "#000" }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        );
      case "bar":
        return (
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
            <XAxis dataKey={xKey} stroke={AXIS_COLOR} fontSize={11} tickLine={false} axisLine={false} tick={{ fill: AXIS_COLOR }} />
            <YAxis stroke={AXIS_COLOR} fontSize={11} tickLine={false} axisLine={false} tick={{ fill: AXIS_COLOR }} />
            <Tooltip 
              contentStyle={tooltipStyle}
              cursor={{ fill: "rgba(0,0,0,0.02)" }}
            />
            <Bar dataKey={yKey} fill={colors[0]} radius={[4, 4, 0, 0]} barSize={40} isAnimationActive={false} />
          </BarChart>
        );
      case "line":
        return (
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
            <XAxis dataKey={xKey} stroke={AXIS_COLOR} fontSize={11} tickLine={false} axisLine={false} tick={{ fill: AXIS_COLOR }} />
            <YAxis stroke={AXIS_COLOR} fontSize={11} tickLine={false} axisLine={false} tick={{ fill: AXIS_COLOR }} />
            <Tooltip 
              contentStyle={tooltipStyle}
            />
            <Line type="monotone" dataKey={yKey} stroke={colors[0]} strokeWidth={2.5} dot={{ r: 4, fill: colors[0], strokeWidth: 1.5, stroke: "#fff" }} activeDot={{ r: 6 }} isAnimationActive={false} />
          </LineChart>
        );
      default:
        return <div>Unsupported chart type: {type}</div>;
    }
  };

  // We don't need useMemo if we use React.memo and isAnimationActive={false} properly
  const ChartContent = renderChart();

  return (
    <div className="group/chart relative w-full min-w-[400px] my-6 p-6 rounded-3xl border border-black/5 bg-white/40 shadow-sm backdrop-blur-sm" ref={chartRef}>
      {/* Header with title and export buttons */}
      <div className="flex items-center justify-between mb-6">
        {title ? (
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">{title}</h4>
        ) : (
          <div />
        )}
        <div className="flex gap-1 opacity-0 group-hover/chart:opacity-100 transition-opacity">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-7 rounded-full bg-white border-slate-200 hover:bg-slate-50 gap-1 text-[10px] px-2.5 shadow-none"
            onClick={() => exportImage('png')}
          >
            <ImageIcon className="w-3 h-3 text-slate-500" />
            PNG
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-7 rounded-full bg-white border-slate-200 hover:bg-slate-50 gap-1 text-[10px] px-2.5 shadow-none"
            onClick={() => exportImage('jpeg')}
          >
            <Download className="w-3 h-3 text-slate-500" />
            JPEG
          </Button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[350px] w-full min-w-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          {ChartContent}
        </ResponsiveContainer>
      </div>
    </div>
  );
});
