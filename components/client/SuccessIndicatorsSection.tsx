import { EconomiaCardContent } from "@/types";

const FALLBACK_CARDS: EconomiaCardContent[] = [
  {
    titulo: "<10% /ano",
    subtitulo: "Taxa de turnover no primeiro ano",
    texto: "Trabalhamos na Onebrain com uma meta abaixo de 10%, sem considerar saídas por internalização. Atualmente estamos com uma taxa de 5%.",
  },
  {
    titulo: "2 iniciativas",
    subtitulo: "Evolução de carreira (ex: pleno → sênior)",
    texto: "Desenvolvedores têm acesso à Udemy para acelerar o desenvolvimento. Também contamos com orçamento dedicado a cursos e capacitação profissional.",
  },
  {
    titulo: "7 a 15 dias",
    subtitulo: "Tempo médio para enviar os perfis dos candidatos",
    texto: "Fechamos vagas em média de 31 dias, da abertura ao aceite da oferta pelo candidato. O mercado leva de 45 a 60 dias.",
  },
  {
    titulo: ">40% /ano",
    subtitulo: "Casos mitigados (Fit Cultural e baixo desempenho)",
    texto: "Aproximadamente 80% das contratações equivocadas estão relacionadas a baixo desempenho e perfil fora do fit cultural.",
  },
];

interface SuccessIndicatorsSectionProps {
  indicadoresCards?: EconomiaCardContent[];
}

export function SuccessIndicatorsSection({ indicadoresCards }: SuccessIndicatorsSectionProps) {
  const cards = indicadoresCards && indicadoresCards.length > 0 ? indicadoresCards : FALLBACK_CARDS;

  return (
    <section className="py-12 border-t border-white/8">
      <p className="section-label mb-3">Performance</p>
      <h2 className="text-3xl font-semibold text-white mb-10">Indicadores de Sucesso</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="glass-card rounded-2xl p-8 flex flex-col gap-4">
            <p className="text-4xl font-semibold text-white leading-none">{card.titulo}</p>
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
