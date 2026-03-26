import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ClientHeader } from "@/components/client/ClientHeader";
import { KPICard } from "@/components/ui/KPICard";
import { AllocationTable } from "@/components/client/AllocationTable";
import { EconomyGerada } from "@/components/client/EconomyGerada";
import { NPSSection } from "@/components/client/NPSSection";
import { SuccessIndicatorsSection } from "@/components/client/SuccessIndicatorsSection";
import { KolivoSection } from "@/components/client/KolivoSection";
import { ContractModels } from "@/components/overview/ContractModels";
import { ContractDetails } from "@/components/client/ContractDetails";
import { AreaValueChart } from "@/components/charts/AreaValueChart";
import { BarAllocationChart } from "@/components/charts/BarAllocationChart";
import { getClientById, getAllClients } from "@/lib/data";
import { formatCurrencyCompact } from "@/lib/utils";
import { Users, DollarSign, TrendingUp, Clock } from "lucide-react";

export const revalidate = 3600;

export async function generateStaticParams() {
  const clientes = await getAllClients();
  return clientes.map((c) => ({ slug: c.id }));
}

// Parse "2025-06-15" → { year: 2025, month: 5 } (month 0-indexed) — ignores day for monthly filtering
function parseYearMonth(str: string | undefined): { year: number; month: number } | null {
  if (!str) return null;
  const parts = str.split("-").map(Number);
  const y = parts[0], m = parts[1];
  if (!y || !m) return null;
  return { year: y, month: m - 1 };
}

function monthKey(mes: string): number {
  // "Jun/2025" → comparable number
  const MONTHS: Record<string, number> = {
    Jan: 0, Fev: 1, Mar: 2, Abr: 3, Mai: 4, Jun: 5,
    Jul: 6, Ago: 7, Set: 8, Out: 9, Nov: 10, Dez: 11,
  };
  const [m, y] = mes.split("/");
  return Number(y) * 12 + (MONTHS[m] ?? 0);
}

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ from?: string; to?: string }>;
}

export default async function ClientePage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { from, to } = await searchParams;
  const cliente = await getClientById(slug);

  if (!cliente) notFound();

  // Filter historico by selected period
  const fromParsed = parseYearMonth(from);
  const toParsed = parseYearMonth(to);
  const fromKey = fromParsed ? fromParsed.year * 12 + fromParsed.month : null;
  const toKey = toParsed ? toParsed.year * 12 + toParsed.month : null;

  const historico = cliente.historico.filter((h) => {
    const k = monthKey(h.mes);
    if (fromKey !== null && k < fromKey) return false;
    if (toKey !== null && k > toKey) return false;
    return true;
  });

  const npsHistorico = cliente.npsHistorico.filter((h) => {
    const k = monthKey(h.mes);
    if (fromKey !== null && k < fromKey) return false;
    if (toKey !== null && k > toKey) return false;
    return true;
  });

  const latest = historico[historico.length - 1] ?? cliente.historico[cliente.historico.length - 1];
  const first = historico[0] ?? cliente.historico[0];
  const avgTempo = Math.round(
    cliente.alocados.reduce((s, a) => s + a.mesesAlocado, 0) / cliente.alocados.length
  );
  const periodo = `${first?.mes} — ${latest?.mes}`;

  return (
    <>
      <Header />
      <main className="max-w-screen-xl mx-auto px-8 pt-32 pb-24">

        <ClientHeader client={cliente} periodo={periodo} />

        <ContractDetails tipoContrato={cliente.tipoContrato} />

        {/* Dados dos Alocados */}
        <div className="border-t border-white/8 pt-12 mb-12">
          <p className="section-label mb-3">Alocações</p>
          <h2 className="text-3xl font-semibold text-white mb-10">Dados dos Alocados</h2>
        </div>

        {/* KPI Cards */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <KPICard
            label="Valor mensal atual"
            value={latest?.valorMensal ?? 0}
            format="currency"
            icon={DollarSign}
          />
          <KPICard
            label="Profissionais alocados"
            value={latest?.qtdAlocados ?? 0}
            format="number"
            icon={Users}
          />
          <KPICard
            label="Média salarial"
            value={latest?.salarioMedio ?? 0}
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
              {formatCurrencyCompact(latest?.valorMensal ?? 0)}
            </p>
            <AreaValueChart data={historico} />
          </div>
          <div className="glass-card rounded-2xl p-6">
            <p className="section-label mb-1">Profissionais alocados</p>
            <p className="text-2xl font-light text-white mb-6">
              {latest?.qtdAlocados} profissionais
            </p>
            <BarAllocationChart data={historico} />
          </div>
        </section>

{/* Allocation Table */}
        <section className="glass-card rounded-2xl p-8 mb-12">
          <p className="section-label mb-6">Profissionais alocados</p>
          <AllocationTable alocados={cliente.alocados} />
        </section>

        <EconomyGerada />

        {/* NPS */}
        <section className="py-12 border-t border-white/8">
          <p className="section-label mb-3">Satisfação</p>
          <h2 className="text-3xl font-semibold text-white mb-4">eNPS dos Alocados</h2>
          <p className="text-sm font-normal leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.65)" }}>
            O NPS (Net Promoter Score) mensura o nível de satisfação e engajamento de todos os colaboradores alocados. Com um <strong>score a partir de 91</strong>, o cliente encontra-se na Zona de Encantamento, demonstrando um <strong>altíssimo índice de promotores e ausência de detratores</strong> no período analisado.
          </p>
          <NPSSection
            historico={npsHistorico.length > 0 ? npsHistorico : cliente.npsHistorico}
            gestores={cliente.npsGestores}
            scoreAtual={cliente.scoreAtual}
            empresa={cliente.empresa}
          />
        </section>

        <SuccessIndicatorsSection />

        {/* Próximos Passos */}
        <section className="pt-12 pb-8 border-t border-white/8">
          <p className="section-label mb-3">Próximos passos</p>
          <h2 className="text-3xl font-semibold text-white mb-10">
            Oportunidades de expansão para {cliente.empresa}
          </h2>
          <KolivoSection
            empresa={cliente.empresa}
            oportunidade={cliente.oportunidadeExpansao}
          />
        </section>

      </main>
      <Footer />
    </>
  );
}
