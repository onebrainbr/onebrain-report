import { Card1EconomiaContent } from "@/types";

const staticCards = [
  {
    value: "≈R$17K /mês",
    title: "Economia com estrutura de hunting",
    description:
      "Economia por não precisar manter estrutura interna de recrutamento e ferramentas necessárias para realizar o trabalho.",
  },
  {
    value: ">5% /mês",
    title: "Economia pela mitigação de turnover inicial",
    description:
      "Redução de desligamentos no primeiro ano atua diretamente na mitigação de custos de substituição, que podem chegar a até 200% do salário anual por colaborador.",
  },
  {
    value: "40%",
    title: "Redução de contratações equivocadas",
    description:
      "A ação reduz o tempo de produtividade de 6 p/ 3 meses, economizando metade com novos colaboradores e liberando os Devs SR para focar no produto.",
  },
];

interface EconomyGeradaProps {
  card1?: Card1EconomiaContent | null;
}

export function EconomyGerada({ card1 }: EconomyGeradaProps) {
  return (
    <section className="py-12 border-t border-white/8">
      <p className="section-label mb-3">Impacto financeiro</p>
      <h2 className="text-3xl font-semibold text-white mb-10">Economia Gerada</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1 — dinâmico via planilha "Gestao de conteudo" */}
        <div className="glass-card rounded-2xl p-8 flex flex-col gap-4">
          <p className="text-4xl font-semibold text-white leading-none">
            {card1?.titulo ?? "30%"}
          </p>
          <div>
            <p className="text-base font-semibold text-white mb-2">
              {card1?.subtitulo ?? "Redução de custo de contratação"}
            </p>
            <p
              className="text-sm font-normal leading-relaxed"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              {card1?.texto ?? "Reter profissionais e evitar substituições não planejadas. Elimina custos de recrutamento, cadeira vazia e perda irreversível de contexto técnico."}
            </p>
          </div>
        </div>

        {/* Cards 2, 3, 4 — estáticos */}
        {staticCards.map((card) => (
          <div key={card.title} className="glass-card rounded-2xl p-8 flex flex-col gap-4">
            <p className="text-4xl font-semibold text-white leading-none">
              {card.value}
            </p>
            <div>
              <p className="text-base font-semibold text-white mb-2">{card.title}</p>
              <p
                className="text-sm font-normal leading-relaxed"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
