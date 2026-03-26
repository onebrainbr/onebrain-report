import { cn, contractLabel } from "@/lib/utils";
import { ContractType } from "@/types";
import { Gauge, Code2, Rocket } from "lucide-react";

const models: {
  type: ContractType;
  icon: React.ElementType;
  focus: string;
  description: string;
  bold?: string;
}[] = [
  {
    type: "ESSENTIALS",
    icon: Gauge,
    focus: "Foco em eficiência operacional e escala.",
    description:
      "Indicado para clientes que precisam crescer ou manter times com velocidade, previsibilidade e controle de custo.",
    bold: "crescer ou manter times com velocidade, previsibilidade e controle de custo.",
  },
  {
    type: "SQUAD",
    icon: Code2,
    focus: "Foco na qualidade técnica e estruturação da área de tecnologia.",
    description:
      "Indicado para empresas que precisam fortalecer ou estruturar sua capacidade tecnológica.",
    bold: "fortalecer ou estruturar sua capacidade tecnológica.",
  },
  {
    type: "TALENT_PIPELINE_PRO",
    icon: Rocket,
    focus: "Foco na aceleração e desenvolvimento de talentos.",
    description:
      "Indicado para empresas que querem reduzir risco de contratação e acelerar o desenvolvimento do time.",
    bold: "reduzir risco de contratação e acelerar o desenvolvimento do time.",
  },
];

interface ContractModelsProps {
  activeType?: ContractType;
}

export function ContractModels({ activeType }: ContractModelsProps) {
  return (
    <section className="py-16">
      <p className="section-label mb-3">Modelos de contrato</p>
      <h2 className="text-3xl font-semibold text-white mb-10">
        Como trabalhamos com você
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {models.map((model) => {
          const Icon = model.icon;
          const isActive = activeType === model.type;
          return (
            <div
              key={model.type}
              className={cn(
                "rounded-2xl p-8 flex flex-col gap-6 transition-all duration-300",
                isActive
                  ? "bg-white text-black"
                  : "glass-card-hover"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  isActive ? "bg-black/8" : "bg-white/6"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-black" : "text-white/60")} />
              </div>
              <div className="flex flex-col gap-2">
                <h3
                  className={cn(
                    "text-lg font-semibold",
                    isActive ? "text-black" : "text-white"
                  )}
                >
                  {contractLabel(model.type)}
                </h3>
                <p
                  className="text-sm font-medium leading-relaxed"
                  style={{ color: isActive ? "rgba(0,0,0,0.75)" : "rgba(255,255,255,0.65)" }}
                >
                  {model.focus}
                </p>
                <p
                  className="text-sm font-normal leading-relaxed"
                  style={{ color: isActive ? "rgba(0,0,0,0.72)" : "rgba(255,255,255,0.65)" }}
                >
                  {model.bold
                    ? (() => {
                        const idx = model.description.indexOf(model.bold);
                        if (idx === -1) return model.description;
                        return (
                          <>
                            {model.description.slice(0, idx)}
                            <strong>{model.bold}</strong>
                          </>
                        );
                      })()
                    : model.description}
                </p>
              </div>
              {isActive && (
                <div className="text-xs font-semibold text-black bg-black/8 rounded-full px-3 py-1 self-start">
                  Seu modelo atual
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
