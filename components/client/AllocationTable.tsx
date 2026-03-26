"use client";

import { Allocation } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface AllocationTableProps {
  alocados: Allocation[];
}

function calcAdmissao(mesesAlocado: number): string {
  const d = new Date();
  d.setMonth(d.getMonth() - mesesAlocado);
  return d.toLocaleDateString("pt-BR", { month: "short", year: "numeric" });
}

const COL = "grid-cols-[2fr_1.4fr_1.2fr_1.4fr_1.4fr]";

export function AllocationTable({ alocados }: AllocationTableProps) {
  const total = alocados.reduce((s, a) => s + a.salario, 0);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[640px]">

        {/* Header row */}
        <div className={`grid ${COL} border-b border-white/8 pb-3 mb-1`}>
          <span className="section-label">Alocado</span>
          <span className="section-label">Data de admissão</span>
          <span className="section-label">Tempo alocado</span>
          <span className="section-label text-right">Salário</span>
          <span className="section-label text-right">Valor mensal</span>
        </div>

        {/* Data rows */}
        {alocados.map((a, i) => (
          <div
            key={i}
            className={`grid ${COL} py-3.5 border-b border-white/4 hover:bg-white/[0.03] transition-colors`}
          >
            <span className="text-sm text-white font-medium truncate pr-4">{a.nome}</span>
            <span className="text-sm text-white/50">{calcAdmissao(a.mesesAlocado)}</span>
            <span className="text-sm text-white/50">{a.mesesAlocado} meses</span>
            <span className="text-xs text-white/70 font-mono text-right">{formatCurrency(a.salario)}</span>
            <span className="text-xs text-white/70 font-mono text-right">{formatCurrency(a.valorMensal)}</span>
          </div>
        ))}

        {/* Footer total */}
        <div className={`grid ${COL} pt-4`}>
          <span className="text-xs text-white/30 col-span-3">
            {alocados.length} profissional{alocados.length !== 1 ? "is" : ""} alocado{alocados.length !== 1 ? "s" : ""}
          </span>
          <span className="text-sm text-white font-semibold font-mono col-span-2 text-right">
            {formatCurrency(total)}
          </span>
        </div>

      </div>
    </div>
  );
}
