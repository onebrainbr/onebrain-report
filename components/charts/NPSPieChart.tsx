"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface NPSPieChartProps {
  notasCounts: Record<string, number>;
}

function colorForNota(nota: number): string {
  if (nota >= 9) return "#22C55E";
  if (nota >= 7) return "#EAB308";
  return "#EF4444";
}

const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  if (percent < 0.04) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
      {`${Math.round(percent * 100)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { nota, value } = payload[0].payload;
    return (
      <div className="glass-card rounded-xl p-3 text-xs">
        <p className="text-white/50 mb-1">Nota {nota}</p>
        <p className="font-semibold" style={{ color: colorForNota(nota) }}>
          {value} {value === 1 ? "alocado" : "alocados"}
        </p>
      </div>
    );
  }
  return null;
};

export function NPSPieChart({ notasCounts }: NPSPieChartProps) {
  const total = Object.values(notasCounts).reduce((s, v) => s + v, 0) || 1;

  const chartData = Array.from({ length: 11 }, (_, i) => i)
    .filter((n) => (notasCounts[String(n)] ?? 0) > 0)
    .map((n) => ({
      nota: n,
      value: notasCounts[String(n)] ?? 0,
      percent: (notasCounts[String(n)] ?? 0) / total,
    }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={2}
          dataKey="value"
          labelLine={false}
          label={<CustomLabel />}
        >
          {chartData.map((entry) => (
            <Cell key={entry.nota} fill={colorForNota(entry.nota)} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
}
