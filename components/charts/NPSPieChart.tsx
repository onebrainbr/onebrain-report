"use client";

import { useState } from "react";
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
  const [hovered, setHovered] = useState<{ nota: number; value: number } | null>(null);
  const total = Object.values(notasCounts).reduce((s, v) => s + v, 0) || 1;

  const chartData = Array.from({ length: 11 }, (_, i) => i)
    .filter((n) => (notasCounts[String(n)] ?? 0) > 0)
    .map((n) => ({
      nota: n,
      value: notasCounts[String(n)] ?? 0,
      percent: (notasCounts[String(n)] ?? 0) / total,
    }));

  return (
    <div className="flex flex-col gap-3">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={58}
            outerRadius={88}
            paddingAngle={2}
            dataKey="value"
            labelLine={false}
            label={<CustomLabel />}
            onMouseEnter={(data) => setHovered({ nota: data.nota, value: data.value })}
            onMouseLeave={() => setHovered(null)}
          >
            {chartData.map((entry) => (
              <Cell
                key={entry.nota}
                fill={colorForNota(entry.nota)}
                opacity={hovered && hovered.nota !== entry.nota ? 0.4 : 1}
                style={{ cursor: "pointer", transition: "opacity 0.15s" }}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="h-8 flex items-center justify-center">
        {hovered ? (
          <div className="glass-card rounded-xl px-4 py-2 text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: colorForNota(hovered.nota) }} />
            <span className="text-white/50">Nota {hovered.nota}:</span>
            <span className="font-semibold text-white">
              {hovered.value} {hovered.value === 1 ? "alocado" : "alocados"}
            </span>
          </div>
        ) : (
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>Passe o mouse sobre uma fatia</p>
        )}
      </div>
    </div>
  );
}
