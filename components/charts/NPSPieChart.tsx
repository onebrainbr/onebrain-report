"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface NPSPieChartProps {
  notasCounts: Record<string, number>;
}

// Cor por nota: 0-6 vermelho, 7-8 amarelo, 9-10 verde
function colorForNota(nota: number): string {
  if (nota >= 9) return "#22C55E";
  if (nota >= 7) return "#EAB308";
  return "#EF4444";
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { name, value, payload: p } = payload[0];
    return (
      <div className="glass-card rounded-xl p-3 text-xs">
        <p className="font-semibold" style={{ color: colorForNota(Number(name)) }}>
          Nota {name}: {value} ({p.percent}%)
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => (
  <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-4">
    {payload.map((entry: any) => (
      <div key={entry.value} className="flex items-center gap-1">
        <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
          {entry.value}
        </span>
      </div>
    ))}
  </div>
);

export function NPSPieChart({ notasCounts }: NPSPieChartProps) {
  const total = Object.values(notasCounts).reduce((s, v) => s + v, 0) || 1;

  const chartData = Array.from({ length: 11 }, (_, i) => i)
    .filter((n) => (notasCounts[String(n)] ?? 0) > 0)
    .map((n) => ({
      name: String(n),
      value: notasCounts[String(n)] ?? 0,
      percent: Math.round(((notasCounts[String(n)] ?? 0) / total) * 100),
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
          paddingAngle={2}
          dataKey="value"
        >
          {chartData.map((entry) => (
            <Cell key={entry.name} fill={colorForNota(Number(entry.name))} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  );
}
