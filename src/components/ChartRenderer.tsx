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

const DEFAULT_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

export function ChartRenderer({ json }: { json: string }) {
  const chartRef = React.useRef<HTMLDivElement>(null);
  let chartConfig: ChartData;

  try {
    chartConfig = JSON.parse(json);
  } catch (e) {
    return (
      <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 text-xs font-mono">
        Failed to parse chart data: {e instanceof Error ? e.message : "Invalid JSON"}
      </div>
    );
  }

  const { type, data, title, config = {} } = chartConfig;
  const xKey = config.xKey || "name";
  const yKey = config.yKey || "value";
  const colors = config.colors || DEFAULT_COLORS;

  const exportImage = async (format: 'png' | 'jpeg') => {
    if (!chartRef.current) return;
    
    try {
      // Small delay to ensure rendering is complete
      const dataUrl = format === 'png' 
        ? await toPng(chartRef.current, { backgroundColor: '#020617', quality: 1, pixelRatio: 2 })
        : await toJpeg(chartRef.current, { backgroundColor: '#020617', quality: 0.95, pixelRatio: 2 });
      
      const link = document.createElement('a');
      link.download = `chart-${title?.replace(/\s+/g, '-').toLowerCase() || 'export'}-${Date.now()}.${format}`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export failed:", err);
      alert("Failed to export image. Please try again.");
    }
  };

  const renderChart = () => {
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
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} stroke="rgba(255,255,255,0.1)" />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: "rgba(17, 24, 39, 0.8)", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px", backdropFilter: "blur(8px)" }}
              itemStyle={{ color: "#fff" }}
            />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        );
      case "bar":
        return (
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey={xKey} stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: "rgba(17, 24, 39, 0.8)", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px", backdropFilter: "blur(8px)" }}
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
            />
            <Bar dataKey={yKey} fill={colors[0]} radius={[6, 6, 0, 0]} barSize={40} />
          </BarChart>
        );
      case "line":
        return (
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey={xKey} stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
               contentStyle={{ backgroundColor: "rgba(17, 24, 39, 0.8)", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px", backdropFilter: "blur(8px)" }}
            />
            <Line type="monotone" dataKey={yKey} stroke={colors[0]} strokeWidth={3} dot={{ r: 4, fill: colors[0], strokeWidth: 2, stroke: "#000" }} activeDot={{ r: 6 }} />
          </LineChart>
        );
      default:
        return <div>Unsupported chart type: {type}</div>;
    }
  };

  // Memoize chart to prevent re-renders when parent updates
  const MemoizedChart = React.useMemo(() => renderChart(), [type, JSON.stringify(data), JSON.stringify(config)]);

  return (
    <div className="group/chart relative w-full min-w-[400px] my-6 p-6 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md" ref={chartRef}>
      {/* Header with title and export buttons */}
      <div className="flex items-center justify-between mb-4">
        {title ? (
          <h4 className="text-sm font-bold text-primary uppercase tracking-widest">{title}</h4>
        ) : (
          <div />
        )}
        <div className="flex gap-2 opacity-0 group-hover/chart:opacity-100 transition-opacity">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-7 rounded-full bg-white/5 border-white/10 hover:bg-white/10 gap-1 text-[10px]"
            onClick={() => exportImage('png')}
          >
            <ImageIcon className="w-3 h-3" />
            PNG
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-7 rounded-full bg-white/5 border-white/10 hover:bg-white/10 gap-1 text-[10px]"
            onClick={() => exportImage('jpeg')}
          >
            <Download className="w-3 h-3" />
            JPEG
          </Button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[350px] w-full min-w-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          {MemoizedChart}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
