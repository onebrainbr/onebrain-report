export type ContractType =
  | "ESSENTIALS"
  | "SQUAD"
  | "TALENT_PIPELINE_PRO";

export interface Allocation {
  nome: string;
  cargo: string;
  senioridade: "Junior" | "Pleno" | "Senior" | "Especialista";
  salario: number;
  valorMensal: number;
  mesesAlocado: number;
  dataAdmissao: string; // raw value from spreadsheet, e.g. "01/10/2025"
  gestor: string;
}

export interface MonthlyMetric {
  mes: string; // "Jan/2025"
  valorMensal: number;
  qtdAlocados: number;
  salarioMedio: number;
}

export interface NPSEntry {
  mes: string;
  score: number; // -100 a 100
  classificacao: "Promotor" | "Neutro" | "Detrator";
  qtdTotal: number;
  qtdPromotores: number;
  qtdDetratores: number;
  notasCounts?: Record<string, number>; // e.g. { "10": 5, "9": 2, "8": 1 }
  comentario?: string;
}

export interface ManagerNPS {
  gestor: string;
  score: number;
  qtdRespostas: number;
}

export interface SuccessIndicator {
  label: string;
  atingido: boolean;
  detalhe?: string;
}

export interface EconomyItem {
  label: string;
  valor: number;
  descricao: string;
}

export interface ClientData {
  id: string; // slug: "ifood", "petz"
  empresa: string;
  gestor: string;
  tipoContrato: ContractType;
  detalhesContrato: string;
  inicioContrato: string; // "Jun/2025"
  alocados: Allocation[];
  historico: MonthlyMetric[];
  npsHistorico: NPSEntry[];
  npsGestores: ManagerNPS[];
  scoreAtual: number; // 0-100
  economiaGerada: EconomyItem[];
  indicadoresSucesso: SuccessIndicator[];
  oportunidadeExpansao: string;
  observacoes?: string;
}

export interface DashboardData {
  clientes: ClientData[];
  ultimaAtualizacao: string;
}

export interface FilterState {
  clienteId: string | null;
  periodoInicio: string; // "Jun/2025"
  periodoFim: string;    // "Mar/2026"
}
