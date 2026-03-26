"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { NPSEntry } from "@/types";

interface NPSClassificacaoChartProps {
  data: NPSEntry[];
}

const COLORS: Record<string, string> = {
  Promotor: "#22C55E",
  Neutro: "#F59E0B",
  Detrator: "#EF4444",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-xl p-3 text-xs">
        <p className="font-semibold text-white">
          {label}: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export function NPSClassificacaoChart({ data }: NPSClassificacaoChartProps) {
  const counts: Record<string, number> = { Promotor: 0, Neutro: 0, Detrator: 0 };
  data.forEach((e) => { counts[e.classificacao] = (counts[e.classificacao] ?? 0) + 1; });

  const chartData = [
    { name: "Promotor", value: counts.Promotor },
    { name: "Neutro", value: counts.Neutro },
    { name: "Detrator", value: counts.Detrator },
  ];

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
        <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={72}>
          {chartData.map((entry) => (
            <Cell key={entry.name} fill={COLORS[entry.name]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
