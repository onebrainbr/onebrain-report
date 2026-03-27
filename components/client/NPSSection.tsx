import { NPSEntry, ManagerNPS } from "@/types";
import { NPSLineChart } from "@/components/charts/NPSLineChart";
import { NPSPieChart } from "@/components/charts/NPSPieChart";
import { NPSClassificacaoChart } from "@/components/charts/NPSClassificacaoChart";

interface NPSSectionProps {
  historico: NPSEntry[];
  gestores: ManagerNPS[];
  scoreAtual: number;
  empresa: string;
}

export function NPSSection({ historico, scoreAtual, empresa }: NPSSectionProps) {

  return (
    <div className="flex flex-col gap-6">
      {/* Linha 1: Score Onebrain + Nota por Record Count + Classificação */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score cliente */}
        <div className="glass-card rounded-2xl p-8 flex flex-col gap-4">
          <div>
            <p className="section-label">Score</p>
            <p className="text-base font-semibold text-white mt-1">{empresa}</p>
          </div>
          <div className="text-5xl font-light text-white">{scoreAtual}</div>
          <div>
            <div className="h-2 bg-white/8 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-white transition-all duration-700"
                style={{ width: `${((scoreAtual + 100) / 200) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <p className="text-xs font-normal" style={{ color: "rgba(255,255,255,0.35)" }}>-100</p>
              <p className="text-xs font-normal" style={{ color: "rgba(255,255,255,0.35)" }}>100</p>
            </div>
          </div>
          <p className="text-xs font-normal leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
            Score composto que considera NPS, indicadores de entrega, tempo de resposta e satisfação do gestor.
          </p>
        </div>

        {/* Nota por Record Count — pizza */}
        <div className="glass-card rounded-2xl p-8">
          <p className="section-label mb-6">Nota por Record Count</p>
          <NPSPieChart data={historico} />
        </div>

        {/* Classificação no período — barras */}
        <div className="glass-card rounded-2xl p-8">
          <p className="section-label mb-6">Classificação no período</p>
          <NPSClassificacaoChart data={historico} />
        </div>
      </div>

      {/* Linha 2: Evolução histórica */}
      <div className="glass-card rounded-2xl p-8">
        <p className="section-label mb-6">Evolução histórica</p>
        <NPSLineChart data={historico} />
      </div>
    </div>
  );
}
