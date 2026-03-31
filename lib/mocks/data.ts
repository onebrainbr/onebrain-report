import { DashboardData } from "@/types";

export const mockData: DashboardData = {
  ultimaAtualizacao: "2026-03-01T10:00:00.000Z",
  clientes: [
    {
      id: "ifood",
      empresa: "iFood",
      gestor: "Ana Carvalho",
      tipoContrato: "SQUAD",
      detalhesContrato:
        "Squad dedicado de engenharia com 6 profissionais. SLA de 48h para onboarding de novos perfis. Revisão trimestral de composição.",
      inicioContrato: "Jun/2025",
      alocados: [
        { nome: "Rafael Moura", cargo: "Tech Lead", senioridade: "Senior", salario: 22000, valorMensal: 28000, mesesAlocado: 9, dataAdmissao: "01/06/2025", gestor: "Ana Carvalho" },
        { nome: "Camila Souza", cargo: "Backend Engineer", senioridade: "Pleno", salario: 14000, valorMensal: 18000, mesesAlocado: 9, dataAdmissao: "01/06/2025", gestor: "Ana Carvalho" },
        { nome: "Lucas Prado", cargo: "Frontend Engineer", senioridade: "Pleno", salario: 13500, valorMensal: 17000, mesesAlocado: 7, dataAdmissao: "01/08/2025", gestor: "Pedro Alves" },
        { nome: "Beatriz Lima", cargo: "Data Engineer", senioridade: "Senior", salario: 18000, valorMensal: 23000, mesesAlocado: 9, dataAdmissao: "01/06/2025", gestor: "Pedro Alves" },
        { nome: "Diego Neves", cargo: "DevOps Engineer", senioridade: "Senior", salario: 20000, valorMensal: 25000, mesesAlocado: 6, dataAdmissao: "01/09/2025", gestor: "Ana Carvalho" },
        { nome: "Mariana Faria", cargo: "QA Engineer", senioridade: "Pleno", salario: 11000, valorMensal: 14000, mesesAlocado: 4, dataAdmissao: "01/11/2025", gestor: "Pedro Alves" },
      ],
      historico: [
        { mes: "Jun/2025", valorMensal: 58000, qtdAlocados: 3, salarioMedio: 16000 },
        { mes: "Jul/2025", valorMensal: 72000, qtdAlocados: 4, salarioMedio: 15800 },
        { mes: "Ago/2025", valorMensal: 86000, qtdAlocados: 5, salarioMedio: 16200 },
        { mes: "Set/2025", valorMensal: 98000, qtdAlocados: 5, salarioMedio: 16500 },
        { mes: "Out/2025", valorMensal: 112000, qtdAlocados: 6, salarioMedio: 16500 },
        { mes: "Nov/2025", valorMensal: 112000, qtdAlocados: 6, salarioMedio: 16500 },
        { mes: "Dez/2025", valorMensal: 112000, qtdAlocados: 6, salarioMedio: 16500 },
        { mes: "Jan/2026", valorMensal: 115000, qtdAlocados: 6, salarioMedio: 16800 },
        { mes: "Fev/2026", valorMensal: 118000, qtdAlocados: 6, salarioMedio: 17000 },
        { mes: "Mar/2026", valorMensal: 118000, qtdAlocados: 6, salarioMedio: 17000 },
      ],
      npsHistorico: [
        { mes: "Set/2025", score: 60, classificacao: "Promotor", qtdTotal: 10, qtdPromotores: 8, qtdDetratores: 2 },
        { mes: "Out/2025", score: 65, classificacao: "Promotor", qtdTotal: 10, qtdPromotores: 8, qtdDetratores: 1 },
        { mes: "Nov/2025", score: 70, classificacao: "Promotor", qtdTotal: 10, qtdPromotores: 8, qtdDetratores: 1, comentario: "Time muito bem selecionado, entrega consistente." },
        { mes: "Dez/2025", score: 72, classificacao: "Promotor", qtdTotal: 10, qtdPromotores: 8, qtdDetratores: 1 },
        { mes: "Jan/2026", score: 75, classificacao: "Promotor", qtdTotal: 10, qtdPromotores: 8, qtdDetratores: 1 },
        { mes: "Fev/2026", score: 78, classificacao: "Promotor", qtdTotal: 10, qtdPromotores: 8, qtdDetratores: 0, comentario: "Qualidade do time superou expectativa inicial." },
        { mes: "Mar/2026", score: 80, classificacao: "Promotor", qtdTotal: 10, qtdPromotores: 8, qtdDetratores: 0 },
      ],
      npsGestores: [
        { gestor: "Ana Carvalho", score: 80, qtdRespostas: 7 },
        { gestor: "Pedro Alves", score: 72, qtdRespostas: 5 },
        { gestor: "Juliana Melo", score: 68, qtdRespostas: 4 },
      ],
      scoreAtual: 88,
      economiaGerada: [
        {
          label: "vs. CLT direto",
          valor: 312000,
          descricao: "Economia acumulada no período comparando com contratação direta com todos os encargos trabalhistas.",
        },
        {
          label: "Redução de time-to-hire",
          valor: 90000,
          descricao: "Valor estimado de produtividade recuperada com onboarding 3x mais rápido que recrutamento tradicional.",
        },
        {
          label: "Evitado com rescisões",
          valor: 48000,
          descricao: "Encargos e verbas rescisórias evitados com modelo de alocação flexível.",
        },
      ],
      economiaCards: [
        { titulo: "30%", subtitulo: "Redução de custo de contratação", texto: "Reter profissionais e evitar substituições não planejadas. Elimina custos de recrutamento, cadeira vazia e perda irreversível de contexto técnico." },
        { titulo: "≈R$17K /mês", subtitulo: "Economia com estrutura de hunting", texto: "Economia por não precisar manter estrutura interna de recrutamento e ferramentas necessárias para realizar o trabalho." },
        { titulo: ">5% /mês", subtitulo: "Economia pela mitigação de turnover inicial", texto: "Redução de desligamentos no primeiro ano atua diretamente na mitigação de custos de substituição." },
        { titulo: "40%", subtitulo: "Redução de contratações equivocadas", texto: "A ação reduz o tempo de produtividade de 6 p/ 3 meses, economizando metade com novos colaboradores." },
      ],
      indicadoresCards: [],
      indicadoresSucesso: [
        { label: "SLA de onboarding < 48h", atingido: true },
        { label: "Zero turnover no período", atingido: true },
        { label: "Entregas dentro do prazo", atingido: true },
        { label: "NPS acima de 70", atingido: true },
        { label: "Expansão de squad em curso", atingido: false, detalhe: "Em negociação para +2 posições" },
      ],
      oportunidadeExpansao:
        "O crescimento consistente do squad e os altos índices de satisfação abrem espaço para expansão com 2 novos perfis em Data Science. Adicionalmente, o perfil de maturidade tecnológica do iFood é ideal para a solução Kolivo de gestão de talentos alocados.",
    },
    {
      id: "petz",
      empresa: "Petz",
      gestor: "Carlos Oliveira",
      tipoContrato: "ESSENTIALS",
      detalhesContrato:
        "Outsourcing de time de produto com revisão mensal de composição. Cobertura de férias e afastamentos incluída no contrato.",
      inicioContrato: "Ago/2025",
      alocados: [
        { nome: "Thiago Ramos", cargo: "Product Manager", senioridade: "Senior", salario: 19000, valorMensal: 24000, mesesAlocado: 7, dataAdmissao: "01/08/2025", gestor: "Carlos Oliveira" },
        { nome: "Fernanda Costa", cargo: "UX Designer", senioridade: "Pleno", salario: 13000, valorMensal: 16000, mesesAlocado: 7, dataAdmissao: "01/08/2025", gestor: "Carlos Oliveira" },
        { nome: "André Martins", cargo: "Backend Engineer", senioridade: "Senior", salario: 17000, valorMensal: 21000, mesesAlocado: 5, dataAdmissao: "01/10/2025", gestor: "Renata Silva" },
        { nome: "Sofia Torres", cargo: "Mobile Engineer", senioridade: "Pleno", salario: 14000, valorMensal: 17000, mesesAlocado: 4, dataAdmissao: "01/11/2025", gestor: "Renata Silva" },
      ],
      historico: [
        { mes: "Ago/2025", valorMensal: 40000, qtdAlocados: 2, salarioMedio: 16000 },
        { mes: "Set/2025", valorMensal: 54000, qtdAlocados: 3, salarioMedio: 16333 },
        { mes: "Out/2025", valorMensal: 68000, qtdAlocados: 4, salarioMedio: 15750 },
        { mes: "Nov/2025", valorMensal: 68000, qtdAlocados: 4, salarioMedio: 15750 },
        { mes: "Dez/2025", valorMensal: 68000, qtdAlocados: 4, salarioMedio: 15750 },
        { mes: "Jan/2026", valorMensal: 72000, qtdAlocados: 4, salarioMedio: 15750 },
        { mes: "Fev/2026", valorMensal: 72000, qtdAlocados: 4, salarioMedio: 15750 },
        { mes: "Mar/2026", valorMensal: 72000, qtdAlocados: 4, salarioMedio: 15750 },
      ],
      npsHistorico: [
        { mes: "Out/2025", score: 55, classificacao: "Promotor", qtdTotal: 10, qtdPromotores: 7, qtdDetratores: 1 },
        { mes: "Nov/2025", score: 60, classificacao: "Promotor", qtdTotal: 10, qtdPromotores: 7, qtdDetratores: 1 },
        { mes: "Dez/2025", score: 58, classificacao: "Promotor", qtdTotal: 10, qtdPromotores: 7, qtdDetratores: 1 },
        { mes: "Jan/2026", score: 65, classificacao: "Promotor", qtdTotal: 10, qtdPromotores: 7, qtdDetratores: 0 },
        { mes: "Fev/2026", score: 68, classificacao: "Promotor", qtdTotal: 10, qtdPromotores: 7, qtdDetratores: 0, comentario: "PM alocado trouxe grande evolução no roadmap." },
        { mes: "Mar/2026", score: 70, classificacao: "Promotor", qtdTotal: 10, qtdPromotores: 7, qtdDetratores: 0 },
      ],
      npsGestores: [
        { gestor: "Carlos Oliveira", score: 70, qtdRespostas: 6 },
        { gestor: "Renata Silva", score: 62, qtdRespostas: 4 },
      ],
      scoreAtual: 79,
      economiaGerada: [
        {
          label: "vs. CLT direto",
          valor: 198000,
          descricao: "Economia acumulada no período comparando com contratação direta.",
        },
        {
          label: "Cobertura de ausências",
          valor: 36000,
          descricao: "Valor de continuidade operacional garantida durante férias e afastamentos do time.",
        },
      ],
      economiaCards: [
        { titulo: "25%", subtitulo: "Redução no custo por posição", texto: "Modelo Essentials elimina o overhead de estrutura dedicada, mantendo qualidade de entrega e SLA de onboarding garantido." },
      ],
      indicadoresCards: [],
      indicadoresSucesso: [
        { label: "SLA de onboarding < 48h", atingido: true },
        { label: "Cobertura de férias garantida", atingido: true },
        { label: "NPS acima de 60", atingido: true },
        { label: "Roadmap de produto avançado", atingido: true },
        { label: "Expansão para área de dados", atingido: false, detalhe: "Aguardando aprovação de budget" },
      ],
      oportunidadeExpansao:
        "O amadurecimento do time de produto cria oportunidade natural para expansão em Analytics e Data Science. Modelo de Squad Dedicado pode ser a evolução do contrato atual, com maior previsibilidade e SLA aprimorado.",
    },
    {
      id: "nomad",
      empresa: "Nomad",
      gestor: "Juliana Melo",
      tipoContrato: "TALENT_PIPELINE_PRO",
      detalhesContrato:
        "Hunting de posições específicas de alta senioridade. Fee de sucesso por posição fechada. Sem custo de manutenção mensal.",
      inicioContrato: "Set/2025",
      alocados: [
        { nome: "Ricardo Gomes", cargo: "Head of Engineering", senioridade: "Especialista", salario: 35000, valorMensal: 42000, mesesAlocado: 6, dataAdmissao: "01/09/2025", gestor: "Juliana Melo" },
        { nome: "Priya Sharma", cargo: "Staff Engineer", senioridade: "Especialista", salario: 28000, valorMensal: 34000, mesesAlocado: 4, dataAdmissao: "01/11/2025", gestor: "Juliana Melo" },
      ],
      historico: [
        { mes: "Set/2025", valorMensal: 35000, qtdAlocados: 1, salarioMedio: 35000 },
        { mes: "Out/2025", valorMensal: 35000, qtdAlocados: 1, salarioMedio: 35000 },
        { mes: "Nov/2025", valorMensal: 35000, qtdAlocados: 1, salarioMedio: 35000 },
        { mes: "Dez/2025", valorMensal: 63000, qtdAlocados: 2, salarioMedio: 31500 },
        { mes: "Jan/2026", valorMensal: 63000, qtdAlocados: 2, salarioMedio: 31500 },
        { mes: "Fev/2026", valorMensal: 63000, qtdAlocados: 2, salarioMedio: 31500 },
        { mes: "Mar/2026", valorMensal: 63000, qtdAlocados: 2, salarioMedio: 31500 },
      ],
      npsHistorico: [
        { mes: "Nov/2025", score: 75, classificacao: "Promotor", qtdTotal: 8, qtdPromotores: 7, qtdDetratores: 1 },
        { mes: "Jan/2026", score: 80, classificacao: "Promotor", qtdTotal: 8, qtdPromotores: 7, qtdDetratores: 0, comentario: "Posições fechadas exatamente com o perfil solicitado." },
        { mes: "Mar/2026", score: 82, classificacao: "Promotor", qtdTotal: 8, qtdPromotores: 7, qtdDetratores: 0 },
      ],
      npsGestores: [
        { gestor: "Juliana Melo", score: 82, qtdRespostas: 3 },
      ],
      scoreAtual: 85,
      economiaGerada: [
        {
          label: "vs. consultorias tradicionais",
          valor: 84000,
          descricao: "Economia em fees de recrutamento comparando com consultorias internacionais do setor.",
        },
        {
          label: "Time-to-fill",
          valor: 52000,
          descricao: "Posições críticas preenchidas em média 45 dias mais rápido que mercado.",
        },
      ],
      economiaCards: [
        { titulo: "45%", subtitulo: "Redução no fee de hunting", texto: "Pipeline contínuo de talentos sênior elimina dependência de consultorias externas e reduz o custo por posição fechada." },
      ],
      indicadoresCards: [],
      indicadoresSucesso: [
        { label: "Posições fechadas no prazo", atingido: true },
        { label: "Perfis dentro do nível esperado", atingido: true },
        { label: "NPS acima de 75", atingido: true },
        { label: "Retenção dos alocados > 6 meses", atingido: true },
        { label: "Ampliação para outsourcing", atingido: false, detalhe: "Em avaliação para Q3/2026" },
      ],
      oportunidadeExpansao:
        "O sucesso no hunting de perfis seniores e a alta satisfação abrem caminho para um modelo de Squad Dedicado para o novo time de plataforma que o Nomad planeja estruturar no segundo semestre de 2026.",
    },
  ],
};
