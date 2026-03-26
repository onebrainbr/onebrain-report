"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { NPSEntry } from "@/types";
import { npsColor } from "@/lib/utils";

interface NPSLineChartProps {
  data: NPSEntry[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const score = payload[0].value;
    return (
      <div className="glass-card rounded-xl p-3 text-xs max-w-[200px]">
        <p className="text-white/50 mb-1">{label}</p>
        <p className="font-semibold" style={{ color: npsColor(score) }}>
          NPS: {score}
        </p>
      </div>
    );
  }
  return null;
};

export function NPSLineChart({ data }: NPSLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis
          dataKey="mes"
          tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={[-100, 100]}
          tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={0} stroke="rgba(255,255,255,0.1)" />
        <ReferenceLine y={50} stroke="rgba(34,197,94,0.2)" strokeDasharray="4 4" />
        <Line
          type="monotone"
          dataKey="score"
          stroke="#22C55E"
          strokeWidth={2}
          dot={{ fill: "#22C55E", r: 3, strokeWidth: 0 }}
          activeDot={{ r: 5, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
