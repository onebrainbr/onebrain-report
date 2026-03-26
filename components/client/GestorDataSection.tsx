"use client";

import { useState } from "react";
import { ChevronDown, Users, DollarSign, TrendingUp, Clock } from "lucide-react";
import { Allocation, NPSEntry, ManagerNPS, ContractType } from "@/types";
import { ContractDetails } from "@/components/client/ContractDetails";
import { KPICard } from "@/components/ui/KPICard";
import { AllocationTable } from "@/components/client/AllocationTable";
import { AreaValueChart } from "@/components/charts/AreaValueChart";
import { BarAllocationChart } from "@/components/charts/BarAllocationChart";
import { NPSSection } from "@/components/client/NPSSection";
import { SuccessIndicatorsSection } from "@/components/client/SuccessIndicatorsSection";
import { KolivoSection } from "@/components/client/KolivoSection";
import { EconomyGerada } from "@/components/client/EconomyGerada";
import { formatCurrencyCompact } from "@/lib/utils";

const MES_NAMES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

interface Props {
  alocados: Allocation[];
  tipoContrato: ContractType;
  npsHistorico: NPSEntry[];
  npsGestores: ManagerNPS[];
  scoreAtual: number;
  empresa: string;
  oportunidadeExpansao: string;
}

export function GestorDataSection({
  alocados,
  tipoContrato,
  npsHistorico,
  npsGestores,
  scoreAtual,
  empresa,
  oportunidadeExpansao,
}: Props) {
  const [selectedGestor, setSelectedGestor] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const gestores = [...new Set(alocados.map((a) => a.gestor).filter(Boolean))];

  const filtered = selectedGestor
    ? alocados.filter((a) => a.gestor === selectedGestor)
    : [];

  const now = new Date();
  const currentMes = `${MES_NAMES[now.getMonth()]}/${now.getFullYear()}`;

  const totalValorMensal = filtered.reduce((s, a) => s + a.valorMensal, 0);
  const qtdAlocados = filtered.length;
  const avgSalario = qtdAlocados > 0
    ? Math.round(filtered.reduce((s, a) => s + a.salario, 0) / qtdAlocados)
    : 0;
  const avgTempo = qtdAlocados > 0
    ? Math.round(filtered.reduce((s, a) => s + a.mesesAlocado, 0) / qtdAlocados)
    : 0;

  const historicoPoint = selectedGestor
    ? [{ mes: currentMes, valorMensal: totalValorMensal, qtdAlocados, salarioMedio: avgSalario }]
    : [];

  return (
    <>
      {/* Gestor selector */}
      <section className="py-12 border-t border-white/8">
        <p className="section-label mb-3">Gestor</p>
        <h2 className="text-3xl font-semibold text-white mb-6">Selecione o gestor</h2>
        <div className="relative max-w-sm">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center justify-between w-full h-14 px-5 rounded-xl text-left transition-all"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: dropdownOpen
                ? "1px solid rgba(255,255,255,0.25)"
                : "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span
              className="text-sm font-light"
              style={{ color: selectedGestor ? "#fff" : "rgba(255,255,255,0.35)" }}
            >
              {selectedGestor ?? "Selecione o gestor"}
            </span>
            <ChevronDown
              className="w-4 h-4 transition-transform"
              style={{
                color: "rgba(255,255,255,0.4)",
                transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>

          {dropdownOpen && (
            <div
              className="absolute top-16 left-0 right-0 z-50 rounded-xl overflow-hidden"
              style={{
                background: "#111",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
              }}
            >
              {gestores.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => { setSelectedGestor(g); setDropdownOpen(false); }}
                  className="w-full text-left px-5 py-3.5 text-sm transition-colors"
                  style={{
                    color: g === selectedGestor ? "#fff" : "rgba(255,255,255,0.55)",
                    background: g === selectedGestor ? "rgba(255,255,255,0.07)" : "transparent",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = g === selectedGestor ? "rgba(255,255,255,0.07)" : "transparent")}
                >
                  {g}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <ContractDetails tipoContrato={tipoContrato} />

      {/* Data — shown after gestor is selected */}
      {selectedGestor && (
        <>
          {/* Section title */}
          <div className="border-t border-white/8 pt-12 mb-12">
            <p className="section-label mb-3">Alocações</p>
            <h2 className="text-3xl font-semibold text-white mb-10">Dados dos Alocados</h2>
          </div>

          {/* KPI Cards */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <KPICard
              label="Valor mensal atual"
              value={totalValorMensal}
              format="currency"
              icon={DollarSign}
            />
            <KPICard
              label="Profissionais alocados"
              value={qtdAlocados}
              format="number"
              icon={Users}
            />
            <KPICard
              label="Média salarial"
              value={avgSalario}
              format="currency"
              icon={TrendingUp}
            />
            <KPICard
              label="Média de tempo alocado"
              value={`${avgTempo} meses`}
              format="text"
              icon={Clock}
            />
          </section>

          {/* Charts */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <div className="glass-card rounded-2xl p-6">
              <p className="section-label mb-1">Evolução do valor mensal</p>
              <p className="text-2xl font-light text-white mb-6">
                {formatCurrencyCompact(totalValorMensal)}
              </p>
              <AreaValueChart data={historicoPoint} />
            </div>
            <div className="glass-card rounded-2xl p-6">
              <p className="section-label mb-1">Profissionais alocados</p>
              <p className="text-2xl font-light text-white mb-6">
                {qtdAlocados} profissionais
              </p>
              <BarAllocationChart data={historicoPoint} />
            </div>
          </section>

          {/* Allocation Table */}
          <section className="glass-card rounded-2xl p-8 mb-12">
            <p className="section-label mb-6">Profissionais alocados</p>
            <AllocationTable alocados={filtered} />
          </section>

          <EconomyGerada />

          {/* NPS */}
          <section className="py-12 border-t border-white/8">
            <p className="section-label mb-3">Satisfação</p>
            <h2 className="text-3xl font-semibold text-white mb-4">eNPS dos Alocados</h2>
            <p
              className="text-sm font-normal leading-relaxed mb-10"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              O NPS (Net Promoter Score) mensura o nível de satisfação e engajamento de todos os
              colaboradores alocados. Com um <strong>score a partir de 91</strong>, o cliente
              encontra-se na Zona de Encantamento, demonstrando um{" "}
              <strong>altíssimo índice de promotores e ausência de detratores</strong> no período
              analisado.
            </p>
            <NPSSection
              historico={npsHistorico}
              gestores={npsGestores}
              scoreAtual={scoreAtual}
              empresa={empresa}
            />
          </section>

          <SuccessIndicatorsSection />

          {/* Próximos Passos */}
          <section className="pt-12 pb-8 border-t border-white/8">
            <p className="section-label mb-3">Próximos passos</p>
            <h2 className="text-3xl font-semibold text-white mb-10">
              Oportunidades de expansão para {empresa}
            </h2>
            <KolivoSection empresa={empresa} oportunidade={oportunidadeExpansao} />
          </section>
        </>
      )}
    </>
  );
}
