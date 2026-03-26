import { Layers, TrendingUp, Heart } from "lucide-react";

const pillars = [
  {
    icon: Layers,
    title: "Delivery",
    description:
      "Responsável por garantir qualidade da entrega, acompanhamento do contrato e geração de valor para o cliente.",
    items: ["SLA de onboarding < 48h", "Gestão ativa de performance", "Substituição sem ônus"],
  },
  {
    icon: TrendingUp,
    title: "Comercial",
    description:
      "Responsável pela estratégia da conta e expansão da parceria.",
    items: ["Revisões trimestrais de contrato", "Propostas de expansão ativa", "Integração com Kolivo"],
  },
  {
    icon: Heart,
    title: "People Ops",
    description:
      "Responsável por garantir as pessoas certas, evolução do time e mitigação de riscos relacionados a pessoas.",
    items: ["Acompanhamento mensal individual", "Plano de desenvolvimento", "NPS interno dos alocados"],
  },
];

export function StructuralSection() {
  return (
    <section className="py-16 border-t border-white/8">
      <p className="section-label mb-3">Mudança estrutural</p>
      <h2 className="text-3xl font-semibold text-white mb-4">
        Onebrain 2026
      </h2>
      <p className="max-w-2xl mb-12 leading-relaxed font-normal" style={{ color: "rgba(255,255,255,0.65)" }}>
        Ao longo deste período, a Onebrain passou por uma evolução significativa em três frentes,
        impactando diretamente a qualidade do serviço que você recebe.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div key={pillar.title} className="glass-card rounded-2xl p-8 flex flex-col gap-6">
              <div className="w-10 h-10 rounded-xl bg-white/6 flex items-center justify-center">
                <Icon className="w-5 h-5 text-white/60" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">{pillar.title}</h3>
                <p className="text-sm font-normal leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{pillar.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
