import { NPSEntry, ManagerNPS } from "@/types";
import { NPSLineChart } from "@/components/charts/NPSLineChart";
import { NPSPieChart } from "@/components/charts/NPSPieChart";
import { NPSClassificacaoChart } from "@/components/charts/NPSClassificacaoChart";

function getZoneInfo(score: number): { color: string; descricao: string } {
  if (score >= 91) return {
    color: "#3B82F6",
    descricao: "Zona de Encantamento: alocados altamente satisfeitos e engajados, com forte potencial de indicação e expansão do contrato.",
  };
  if (score >= 76) return {
    color: "#22C55E",
    descricao: "Zona de Excelência: alto nível de satisfação com entregas consistentes e relacionamento sólido entre as partes.",
  };
  if (score >= 51) return {
    color: "#86EFAC",
    descricao: "Zona de Qualidade: boa percepção geral, com espaço para melhorias pontuais que podem elevar o engajamento.",
  };
  if (score >= 1) return {
    color: "#EAB308",
    descricao: "Zona de Aperfeiçoamento: satisfação moderada com oportunidades claras de melhoria na experiência e nas entregas.",
  };
  return {
    color: "#EF4444",
    descricao: "Zona Crítica: índice de insatisfação elevado que requer atenção imediata e ações corretivas prioritárias.",
  };
}

interface NPSSectionProps {
  historico: NPSEntry[];
  gestores: ManagerNPS[];
  scoreAtual: number;
  notasCounts: Record<string, number>;
  empresa: string;
}

export function NPSSection({ historico, scoreAtual, notasCounts, empresa }: NPSSectionProps) {
  const zone = getZoneInfo(scoreAtual);

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
          <div className="text-5xl font-light" style={{ color: zone.color }}>{scoreAtual}</div>
          <div>
            <div className="h-2 bg-white/8 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${((scoreAtual + 100) / 200) * 100}%`, backgroundColor: zone.color }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <p className="text-xs font-normal" style={{ color: "rgba(255,255,255,0.35)" }}>-100</p>
              <p className="text-xs font-normal" style={{ color: "rgba(255,255,255,0.35)" }}>100</p>
            </div>
          </div>
          <p className="text-xs font-normal leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
            {zone.descricao}
          </p>
        </div>

        {/* Nota por Record Count — pizza */}
        <div className="glass-card rounded-2xl p-8">
          <p className="section-label mb-6">Nota por Record Count</p>
          <NPSPieChart notasCounts={notasCounts} />
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
