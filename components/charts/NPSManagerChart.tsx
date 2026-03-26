"use client";

import { ManagerNPS } from "@/types";
import { npsColor } from "@/lib/utils";

interface NPSManagerChartProps {
  data: ManagerNPS[];
}

export function NPSManagerChart({ data }: NPSManagerChartProps) {
  const sorted = [...data].sort((a, b) => b.score - a.score);

  return (
    <div className="flex flex-col gap-4">
      {sorted.map((item) => (
        <div key={item.gestor}>
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-sm text-white font-medium">{item.gestor}</p>
              <p className="text-xs text-white/40">{item.qtdRespostas} respostas</p>
            </div>
            <span
              className="text-sm font-semibold"
              style={{ color: npsColor(item.score) }}
            >
              {item.score}
            </span>
          </div>
          <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${((item.score + 100) / 200) * 100}%`,
                backgroundColor: npsColor(item.score),
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
