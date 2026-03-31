import { EconomiaCardContent } from "@/types";

const FALLBACK_CARDS: EconomiaCardContent[] = [
  {
    titulo: "30%",
    subtitulo: "Redução de custo de contratação",
    texto: "Reter profissionais e evitar substituições não planejadas. Elimina custos de recrutamento, cadeira vazia e perda irreversível de contexto técnico.",
  },
  {
    titulo: "≈R$17K /mês",
    subtitulo: "Economia com estrutura de hunting",
    texto: "Economia por não precisar manter estrutura interna de recrutamento e ferramentas necessárias para realizar o trabalho.",
  },
  {
    titulo: ">5% /mês",
    subtitulo: "Economia pela mitigação de turnover inicial",
    texto: "Redução de desligamentos no primeiro ano atua diretamente na mitigação de custos de substituição, que podem chegar a até 200% do salário anual por colaborador.",
  },
  {
    titulo: "40%",
    subtitulo: "Redução de contratações equivocadas",
    texto: "A ação reduz o tempo de produtividade de 6 p/ 3 meses, economizando metade com novos colaboradores e liberando os Devs SR para focar no produto.",
  },
];

interface EconomyGeradaProps {
  economiaCards?: EconomiaCardContent[];
}

export function EconomyGerada({ economiaCards }: EconomyGeradaProps) {
  const cards = economiaCards && economiaCards.length > 0 ? economiaCards : FALLBACK_CARDS;

  return (
    <section className="py-12 border-t border-white/8">
      <p className="section-label mb-3">Impacto financeiro</p>
      <h2 className="text-3xl font-semibold text-white mb-10">Economia Gerada</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="glass-card rounded-2xl p-8 flex flex-col gap-4">
            <p className="text-4xl font-semibold text-white leading-none">
              {card.titulo}
            </p>
            <div>
              <p className="text-base font-semibold text-white mb-2">{card.subtitulo}</p>
              <p
                className="text-sm font-normal leading-relaxed"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                {card.texto}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
