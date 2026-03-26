import { cn, formatCurrencyCompact } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  format?: "currency" | "number" | "percent" | "text";
  className?: string;
  delay?: number;
}

export function KPICard({
  label,
  value,
  subtext,
  icon: Icon,
  trend,
  format = "text",
  className,
}: KPICardProps) {
  const displayValue = () => {
    if (format === "currency" && typeof value === "number") {
      return formatCurrencyCompact(value);
    }
    if (format === "percent") return `${value}%`;
    return value;
  };

  const trendColor = {
    up: "text-green-400",
    down: "text-red-400",
    neutral: "text-white/40",
  }[trend ?? "neutral"];

  return (
    <div className={cn("glass-card rounded-2xl p-6 flex flex-col gap-3", className)}>
      <div className="flex items-start justify-between">
        <p className="section-label">{label}</p>
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-white/6 flex items-center justify-center">
            <Icon className="w-4 h-4 text-white/50" />
          </div>
        )}
      </div>
      <p className="value-large text-white">{displayValue()}</p>
      {subtext && (
        <p
          className={cn("text-xs font-normal", trendColor)}
          style={!trend ? { color: "rgba(255,255,255,0.55)" } : undefined}
        >
          {subtext}
        </p>
      )}
    </div>
  );
}
