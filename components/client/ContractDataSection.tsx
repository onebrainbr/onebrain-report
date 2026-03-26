import { ClientData } from "@/types";
import { contractLabel } from "@/lib/utils";

interface Props {
  client: ClientData;
}

export function ContractDataSection({ client }: Props) {
  return (
    <section className="py-12 border-t border-white/8">
      <p className="section-label mb-3">Contrato</p>
      <h2 className="text-3xl font-semibold text-white mb-10">Dados do Contrato</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-8 flex flex-col gap-2">
          <p className="section-label">Modelo</p>
          <p className="text-lg font-semibold text-white mt-1">
            {contractLabel(client.tipoContrato)}
          </p>
        </div>
        <div className="glass-card rounded-2xl p-8 flex flex-col gap-2">
          <p className="section-label">Início do contrato</p>
          <p className="text-lg font-semibold text-white mt-1">{client.inicioContrato}</p>
        </div>
        <div className="glass-card rounded-2xl p-8 flex flex-col gap-2">
          <p className="section-label">Gestor responsável</p>
          <p className="text-lg font-semibold text-white mt-1">{client.gestor}</p>
        </div>
        <div className="glass-card rounded-2xl p-8 flex flex-col gap-2 md:col-span-3">
          <p className="section-label">Detalhes do contrato</p>
          <p
            className="text-sm font-normal leading-relaxed mt-1"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            {client.detalhesContrato}
          </p>
        </div>
      </div>
    </section>
  );
}
