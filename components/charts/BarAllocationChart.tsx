"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MonthlyMetric } from "@/types";

interface BarAllocationChartProps {
  data: MonthlyMetric[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-xl p-3 text-xs">
        <p className="text-white/50 mb-1">{label}</p>
        <p className="text-white font-medium">{payload[0].value} {payload[0].value === 1 ? "profissional" : "profissionais"}</p>
      </div>
    );
  }
  return null;
};

export function BarAllocationChart({ data }: BarAllocationChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis
          dataKey="mes"
          tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
        <Bar dataKey="qtdAlocados" radius={[4, 4, 0, 0]} fill="rgba(255,255,255,0.45)" />
      </BarChart>
    </ResponsiveContainer>
  );
}
