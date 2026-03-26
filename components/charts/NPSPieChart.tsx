"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { NPSEntry } from "@/types";

interface NPSPieChartProps {
  data: NPSEntry[];
}

const COLORS: Record<string, string> = {
  Promotor: "#22C55E",
  Neutro: "#F59E0B",
  Detrator: "#EF4444",
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div className="glass-card rounded-xl p-3 text-xs">
        <p className="font-semibold" style={{ color: COLORS[name] }}>
          {name}: {value} ({payload[0].payload.percent}%)
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => (
  <div className="flex justify-center gap-6 mt-4">
    {payload.map((entry: any) => (
      <div key={entry.value} className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: entry.color }} />
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>{entry.value}</span>
      </div>
    ))}
  </div>
);

export function NPSPieChart({ data }: NPSPieChartProps) {
  const counts: Record<string, number> = { Promotor: 0, Neutro: 0, Detrator: 0 };
  data.forEach((e) => { counts[e.classificacao] = (counts[e.classificacao] ?? 0) + 1; });

  const total = data.length || 1;
  const chartData = Object.entries(counts)
    .filter(([, v]) => v > 0)
    .map(([name, value]) => ({
      name,
      value,
      percent: Math.round((value / total) * 100),
    }));

  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="45%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={3}
          dataKey="value"
        >
          {chartData.map((entry) => (
            <Cell key={entry.name} fill={COLORS[entry.name]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  );
}
