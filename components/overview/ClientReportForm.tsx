"use client";

import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { MonthRangePicker, DateRange } from "./MonthRangePicker";

interface ClientOption {
  id: string;
  empresa: string;
}

interface Props {
  clientes: ClientOption[];
  onReveal: (clienteId: string, range: DateRange) => void;
}

function defaultRange(): DateRange {
  const today = new Date();
  return {
    start: new Date(2025, 5, 1),
    end: today,
  };
}

export function ClientReportForm({ clientes, onReveal }: Props) {
  const [clienteId, setClienteId] = useState<string>("");
  const [range, setRange] = useState<DateRange>(defaultRange());
  const [selectOpen, setSelectOpen] = useState(false);

  const selected = clientes.find((c) => c.id === clienteId);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!clienteId) return;
    onReveal(clienteId, range);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Client selector */}
      <div className="flex flex-col gap-2">
        <label className="section-label">Cliente</label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setSelectOpen(!selectOpen)}
            className="flex items-center justify-between w-full h-14 px-5 rounded-xl text-left transition-all"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: selectOpen
                ? "1px solid rgba(255,255,255,0.25)"
                : "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span
              className="text-sm font-light"
              style={{ color: selected ? "#fff" : "rgba(255,255,255,0.35)" }}
            >
              {selected ? selected.empresa : "Selecione o cliente"}
            </span>
            <ChevronDown
              className="w-4 h-4 transition-transform"
              style={{
                color: "rgba(255,255,255,0.4)",
                transform: selectOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>

          {selectOpen && (
            <div
              className="absolute top-16 left-0 right-0 z-50 rounded-xl overflow-hidden"
              style={{
                background: "#111",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
              }}
            >
              {clientes.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => { setClienteId(c.id); setSelectOpen(false); }}
                  className="w-full text-left px-5 py-3.5 text-sm transition-colors"
                  style={{
                    color: c.id === clienteId ? "#fff" : "rgba(255,255,255,0.55)",
                    background: c.id === clienteId ? "rgba(255,255,255,0.07)" : "transparent",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(255,255,255,0.06)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      c.id === clienteId ? "rgba(255,255,255,0.07)" : "transparent")
                  }
                >
                  {c.empresa}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Period picker */}
      <div className="flex flex-col gap-2">
        <label className="section-label">Período</label>
        <MonthRangePicker value={range} onChange={setRange} />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!clienteId}
        className={`group flex items-center justify-center gap-3 h-14 rounded-full font-medium text-sm transition-all mt-2 ${
          clienteId ? "hover:scale-105 hover:bg-white/90 active:scale-[0.98]" : ""
        }`}
        style={{
          background: clienteId ? "#fff" : "rgba(255,255,255,0.08)",
          color: clienteId ? "#000" : "rgba(255,255,255,0.25)",
          cursor: clienteId ? "pointer" : "not-allowed",
        }}
      >
        Exibir
        <ArrowRight className={`w-4 h-4 transition-transform ${clienteId ? "group-hover:translate-x-1" : ""}`} />
      </button>
    </form>
  );
}
