"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ClientReportForm } from "./ClientReportForm";
import { StructuralSection } from "./StructuralSection";
import { ContractModels } from "./ContractModels";
import { ContractType } from "@/types";
import { DateRange } from "./MonthRangePicker";

interface ClientOption {
  id: string;
  empresa: string;
  gestor: string;
  tipoContrato: ContractType;
}

interface Props {
  clientes: ClientOption[];
}

function toISODate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function DashboardEntry({ clientes }: Props) {
  const router = useRouter();
  const [revealed, setRevealed] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedRange, setSelectedRange] = useState<DateRange | null>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);

  const selectedClient = clientes.find((c) => c.id === selectedId);

  function handleReveal(clienteId: string, range: DateRange) {
    setSelectedId(clienteId);
    setSelectedRange(range);
    setRevealed(true);
    // Scroll to sections after animation starts
    setTimeout(() => {
      sectionsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  function handleViewReport() {
    if (!selectedId || !selectedRange) return;
    const params = new URLSearchParams({
      from: toISODate(selectedRange.start),
      to: toISODate(selectedRange.end),
    });
    router.push(`/cliente/${selectedId}?${params.toString()}`);
  }

  const formClientes = clientes.map((c) => ({ id: c.id, empresa: c.empresa, gestor: c.gestor }));

  return (
    <>
      {/* Hero + Form — always visible */}
      <section
        className="relative pt-40 pb-24"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        {/* Background image — true full-width */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/report-background.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center 25%",
              backgroundRepeat: "no-repeat",
              opacity: 0.28,
            }}
          />
          {/* Bottom fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-64"
            style={{ background: "linear-gradient(to bottom, transparent, #000)" }}
          />
        </div>

        {/* Content constrained to max width */}
        <div className="max-w-screen-xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: headline */}
          <div>
            <p className="section-label mb-6">Relatório executivo · Jun/2025 — hoje</p>
            <h1
              className="text-5xl md:text-6xl font-semibold text-white leading-[1.05] mb-8 tracking-tight"
            >
              Acompanhamento<br />
              da consultoria
            </h1>
            <p
              className="font-normal leading-relaxed text-base max-w-md"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Visão consolidada da parceria Onebrain — indicadores de performance,
              evolução dos times alocados e percepção de valor no período.
            </p>
          </div>

          {/* Right: form */}
          <div
            className="rounded-2xl p-8"
            style={{
              background: "rgba(30,30,30,0.72)",
              border: "1px solid rgba(255,255,255,0.14)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <p className="text-white font-medium mb-1">Acessar relatório</p>
            <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.35)" }}>
              Selecione o cliente e o período para visualizar os dados.
            </p>
            <ClientReportForm clientes={formClientes} onReveal={handleReveal} />
          </div>
        </div>
        </div>
      </section>

      {/* Revealed sections */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            ref={sectionsRef}
            className="max-w-screen-xl mx-auto px-8"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <StructuralSection />

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <ContractModels activeType={selectedClient?.tipoContrato} />

              {/* CTA at end of ContractModels */}
              <div className="pb-24 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <p className="text-white font-medium mb-1">
                    {selectedClient?.empresa} · {selectedClient?.gestor} — relatório completo
                  </p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
                    Dados de alocação, NPS, economia gerada e indicadores de sucesso.
                  </p>
                </div>
                <button
                  onClick={handleViewReport}
                  className="group flex items-center gap-3 px-8 py-4 rounded-full font-medium text-sm shrink-0 transition-all hover:scale-105 hover:bg-white/90 active:scale-[0.98]"
                  style={{ background: "#fff", color: "#000" }}
                >
                  Ver relatório
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
