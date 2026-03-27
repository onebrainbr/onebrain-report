"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

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
    <div className="flex flex-col gap-4">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={2}
            dataKey="value"
            labelLine={false}
            label={<CustomLabel />}
          >
            {chartData.map((entry) => (
              <Cell key={entry.nota} fill={colorForNota(entry.nota)} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Legenda */}
      <div className="flex flex-col gap-1.5">
        {chartData.map((entry) => (
          <div key={entry.nota} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: colorForNota(entry.nota) }} />
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                Nota {entry.nota}
              </span>
            </div>
            <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.75)" }}>
              {entry.value} {entry.value === 1 ? "alocado" : "alocados"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
