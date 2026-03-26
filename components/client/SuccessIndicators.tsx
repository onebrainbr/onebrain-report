import { SuccessIndicator } from "@/types";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SuccessIndicatorsProps {
  indicadores: SuccessIndicator[];
}

export function SuccessIndicators({ indicadores }: SuccessIndicatorsProps) {
  const atingidos = indicadores.filter((i) => i.atingido).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="section-label">Indicadores de sucesso</p>
        <p className="text-xs font-normal" style={{ color: "rgba(255,255,255,0.55)" }}>
          <span className="text-white font-semibold">{atingidos}</span>/{indicadores.length} atingidos
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {indicadores.map((ind) => (
          <div
            key={ind.label}
            className={cn(
              "flex items-start gap-3 p-4 rounded-xl",
              ind.atingido ? "bg-green-400/5 border border-green-400/15" : "bg-white/3 border border-white/6"
            )}
          >
            {ind.atingido ? (
              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
            ) : (
              <Circle className="w-4 h-4 text-white/20 shrink-0 mt-0.5" />
            )}
            <div>
              <p
                className="text-sm font-normal"
                style={{ color: ind.atingido ? "#fff" : "rgba(255,255,255,0.55)" }}
              >
                {ind.label}
              </p>
              {ind.detalhe && (
                <p className="text-xs font-normal mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>{ind.detalhe}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
