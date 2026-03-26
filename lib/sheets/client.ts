import { google } from "googleapis";
import { DashboardData, ContractType } from "@/types";
import { slugify } from "@/lib/utils";

const CONTRACT_TYPE_MAP: Record<string, ContractType> = {
  "essentials": "ESSENTIALS",
  "squad": "SQUAD",
  "talent pipeline pro": "TALENT_PIPELINE_PRO",
};

function parseContractType(raw: string): ContractType {
  return CONTRACT_TYPE_MAP[raw.toLowerCase().trim()] ?? "ESSENTIALS";
}

// Parses Brazilian currency format: "R$ 128.860,00" → 128860
function parseBRL(raw: string): number {
  return (
    Number(
      raw
        .replace(/R\$\s*/g, "")  // remove "R$"
        .replace(/\./g, "")       // remove thousands separator (period)
        .replace(",", ".")        // decimal comma → period
        .trim()
    ) || 0
  );
}

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID!;

async function getAuthClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  return auth;
}

async function readSheet(sheetName: string): Promise<string[][]> {
  const auth = await getAuthClient();
  const sheets = google.sheets({ version: "v4", auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!A:Z`,
  });
  return (response.data.values as string[][]) ?? [];
}

// Spreadsheet columns (0-indexed):
// 0: Cliente | 1: Gestor | 2: Tipo de Contrato | 3: Alocado
// 4: Data de Admissão | 5: Tempo alocado | 6: Salário | 7: Valor Hora | 8: Valor Mensal
// Each row is one allocated professional. Grouped by empresa (slug = slugify(empresa)).
export async function fetchSheetsData(): Promise<DashboardData> {
  const [managersRows] = await Promise.all([
    readSheet("relatorio gestores"),
  ]);

  const rows = managersRows.slice(1); // skip header

  const MES_NAMES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const now = new Date();
  const currentMes = `${MES_NAMES[now.getMonth()]}/${now.getFullYear()}`;

  // Group by empresa — each entry has all alocados across all gestores
  const clientMap = new Map<string, { client: any; valorMensalTotal: number }>();

  for (const row of rows) {
    const empresa = (row[0] ?? "").trim();
    const gestor = (row[1] ?? "").trim();
    if (!empresa) continue;

    if (!clientMap.has(empresa)) {
      clientMap.set(empresa, {
        client: {
          id: slugify(empresa),
          empresa,
          gestor: gestor, // primary gestor (first row)
          tipoContrato: parseContractType(row[2] ?? ""),
          detalhesContrato: "",
          inicioContrato: row[4] ?? "",
          alocados: [],
          historico: [],
          npsHistorico: [],
          npsGestores: [],
          scoreAtual: 0,
          economiaGerada: [],
          indicadoresSucesso: [],
          oportunidadeExpansao: "",
        },
        valorMensalTotal: 0,
      });
    }

    const entry = clientMap.get(empresa)!;
    const salario = parseBRL(row[6] ?? "0");
    const valorMensal = parseBRL(row[8] ?? "0");
    const mesesAlocado = Number((row[5] ?? "0").replace(/[^0-9]/g, ""));

    entry.client.alocados.push({
      nome: row[3] ?? "",
      cargo: "",
      senioridade: "Pleno",
      salario,
      valorMensal,
      mesesAlocado,
      gestor,
    });

    entry.valorMensalTotal += valorMensal;
  }

  const clientes = Array.from(clientMap.values()).map(({ client, valorMensalTotal }) => {
    const qtdAlocados = client.alocados.length;
    const salarioMedio = qtdAlocados > 0
      ? Math.round(client.alocados.reduce((s: number, a: any) => s + a.salario, 0) / qtdAlocados)
      : 0;

    client.historico = [{
      mes: currentMes,
      valorMensal: valorMensalTotal,
      qtdAlocados,
      salarioMedio,
    }];

    return client;
  });

  return {
    ultimaAtualizacao: now.toISOString(),
    clientes,
  };
}
