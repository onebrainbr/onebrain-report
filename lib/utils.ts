import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCurrencyCompact(value: number): string {
  if (value >= 1_000_000) {
    return `R$ ${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `R$ ${(value / 1_000).toFixed(0)}k`;
  }
  return formatCurrency(value);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function contractLabel(type: string): string {
  const labels: Record<string, string> = {
    ESSENTIALS: "Essentials",
    SQUAD: "Squad",
    TALENT_PIPELINE_PRO: "Talent Pipeline Pro",
  };
  return labels[type] ?? type;
}

export function npsClassificacao(score: number): "Promotor" | "Neutro" | "Detrator" {
  if (score >= 50) return "Promotor";
  if (score >= 0) return "Neutro";
  return "Detrator";
}

export function npsColor(score: number): string {
  if (score >= 50) return "#22C55E";
  if (score >= 0) return "#F59E0B";
  return "#EF4444";
}
