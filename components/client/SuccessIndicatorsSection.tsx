const cards = [
  {
    value: "<10% /ano",
    title: "Taxa de turnover no primeiro ano",
    description:
      "Trabalhamos na Onebrain com uma meta abaixo de 10%, sem considerar saídas por internalização. Atualmente estamos com uma taxa de 5%.",
  },
  {
    value: "2 iniciativas",
    title: "Evolução de carreira (ex: pleno → sênior)",
    description:
      "Desenvolvedores têm acesso à Udemy para acelerar o desenvolvimento. Também contamos com orçamento dedicado a cursos e capacitação profissional.",
  },
  {
    value: "7 a 15 dias",
    title: "Tempo médio para enviar os perfis dos candidatos",
    description:
      "Fechamos vagas em média de 31 dias, da abertura ao aceite da oferta pelo candidato. O mercado leva de 45 a 60 dias. Com um banco de talentos atualizado e inteligência, nos antecipamos às empresas.",
  },
  {
    value: ">40% /ano",
    title: "Casos mitigados (Fit Cultural e baixo desempenho)",
    description:
      "Aproximadamente 80% das contratações equivocadas estão relacionadas a baixo desempenho e perfil fora do fit cultural.",
  },
];

export function SuccessIndicatorsSection() {
  return (
    <section className="py-12 border-t border-white/8">
      <p className="section-label mb-3">Performance</p>
      <h2 className="text-3xl font-semibold text-white mb-10">Indicadores de Sucesso</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <div key={card.title} className="glass-card rounded-2xl p-8 flex flex-col gap-4">
            <p className="text-4xl font-semibold text-white leading-none">{card.value}</p>
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
