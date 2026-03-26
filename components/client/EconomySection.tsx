import { EconomyItem } from "@/types";
import { formatCurrencyCompact } from "@/lib/utils";
import { TrendingDown } from "lucide-react";

interface EconomySectionProps {
  items: EconomyItem[];
}

export function EconomySection({ items }: EconomySectionProps) {
  const total = items.reduce((s, i) => s + i.valor, 0);

  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="section-label mb-2">Economia gerada</p>
          <p className="text-4xl font-light text-white">{formatCurrencyCompact(total)}</p>
          <p className="text-xs font-normal mt-1" style={{ color: "rgba(255,255,255,0.55)" }}>total no período</p>
        </div>
        <TrendingDown className="w-8 h-8 text-green-400 opacity-60" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.label} className="glass-card rounded-2xl p-6">
            <p className="text-2xl font-light text-green-400 mb-1">
              {formatCurrencyCompact(item.valor)}
            </p>
            <p className="text-sm font-medium text-white mb-2">{item.label}</p>
            <p className="text-xs font-normal leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{item.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
