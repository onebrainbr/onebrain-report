import { CheckCircle2, Zap } from "lucide-react";
import { ContractType } from "@/types";
import { contractLabel } from "@/lib/utils";

const details: Record<
  ContractType,
  { caracteristicas: string[]; vantagens: string[] }
> = {
  ESSENTIALS: {
    caracteristicas: [
      "Teste de 6 meses antes da internalização",
      "Recrutamento por potencial e comportamento",
      "Pleno evoluído para sênior = internalização maior",
      "Zero risco de contratação errada para o cliente",
    ],
    vantagens: [
      "Maior segurança nas contratações",
      "Possibilidade de testar profissionais antes da contratação final",
      "Evolução mais rápida do time",
      "Menor risco de turnover inicial",
    ],
  },
  SQUAD: {
    caracteristicas: [
      "Squad multidisciplinar dedicada por contexto/área",
      "Apoio contínuo de especialistas (mentoria técnica)",
      "Estruturação de time com alocados estratégicos",
      "Recrutamento orientado à qualidade e fit técnico",
      "Evolução contínua do time (upskilling e acompanhamento)",
    ],
    vantagens: [
      "Maior qualidade e consistência nas entregas",
      "Decisões técnicas mais assertivas (redução de retrabalho)",
      "Aceleração da maturidade técnica do time",
      "Menor dependência de gestão interna do cliente",
      "Transferência contínua de conhecimento",
      "Maior previsibilidade de entrega (time estruturado e estável)",
    ],
  },
  TALENT_PIPELINE_PRO: {
    caracteristicas: [
      "Teste de 6 meses antes da internalização",
      "Recrutamento por potencial e comportamento",
      "Pleno evoluído para sênior = internalização maior",
      "Zero risco de contratação errada para o cliente",
    ],
    vantagens: [
      "Maior segurança nas contratações",
      "Possibilidade de testar profissionais antes da contratação final",
      "Evolução mais rápida do time",
      "Menor risco de turnover inicial",
    ],
  },
};

interface Props {
  tipoContrato: ContractType;
}

export function ContractDetails({ tipoContrato }: Props) {
  const data = details[tipoContrato];

  return (
    <section className="py-12 border-t border-white/8">
      <p className="section-label mb-3">Modelo de contrato</p>
      <h2 className="text-3xl font-semibold text-white mb-10">
        {contractLabel(tipoContrato)}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Características */}
        <div className="glass-card rounded-2xl p-8 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/6 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white/60" />
            </div>
            <h3 className="text-lg font-semibold text-white">Características</h3>
          </div>
          <ul className="flex flex-col gap-3">
            {data.caracteristicas.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                  style={{ background: "rgba(255,255,255,0.35)" }}
                />
                <span
                  className="text-sm font-normal leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Vantagens */}
        <div className="glass-card rounded-2xl p-8 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/6 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white/60" />
            </div>
            <h3 className="text-lg font-semibold text-white">Vantagens</h3>
          </div>
          <ul className="flex flex-col gap-3">
            {data.vantagens.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                  style={{ background: "rgba(255,255,255,0.35)" }}
                />
                <span
                  className="text-sm font-normal leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
