import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ClientData } from "@/types";
import { contractLabel } from "@/lib/utils";

interface ClientHeaderProps {
  client: ClientData;
  periodo: string;
}

export function ClientHeader({ client, periodo }: ClientHeaderProps) {
  return (
    <div className="border-b border-white/8 pb-8 mb-10">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Visão geral
      </Link>

      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="section-label mb-2">Relatório de consultoria</p>
          <h1 className="text-5xl font-semibold text-white mb-3">{client.empresa}</h1>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm text-white/40">Gestor: <span className="text-white/70">{client.gestor}</span></span>
            <span className="w-px h-4 bg-white/15" />
            <span className="text-xs bg-white/8 border border-white/12 rounded-full px-3 py-1 text-white/60">
              {contractLabel(client.tipoContrato)}
            </span>
            <span className="w-px h-4 bg-white/15" />
            <span className="text-xs text-white/40">Desde {client.inicioContrato}</span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="section-label mb-1">Período</p>
          <p className="text-sm text-white/70">{periodo}</p>
        </div>
      </div>
    </div>
  );
}
