import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ClientData } from "@/types";
import { contractLabel } from "@/lib/utils";

interface ClientHeaderProps {
  client: ClientData;
}

export function ClientHeader({ client }: ClientHeaderProps) {
  return (
    <div className="border-b border-white/8 pb-8 mb-10">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Visão geral
      </Link>

      <div>
        <p className="section-label mb-2">Relatório de consultoria</p>
        <h1 className="text-5xl font-semibold text-white mb-3">{client.empresa}</h1>
        <span className="text-xs bg-white/8 border border-white/12 rounded-full px-3 py-1 text-white/60">
          {contractLabel(client.tipoContrato)}
        </span>
      </div>
    </div>
  );
}
