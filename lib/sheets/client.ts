import { google } from "googleapis";
import { DashboardData, ContractType, NPSEntry } from "@/types";
import { slugify, npsClassificacao } from "@/lib/utils";

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

// NPS Clientes columns (0-indexed): 0: Empresa | 1: Data | 2: Nota | 3: Justificativa | 4: Cliente
function parseNPSRows(rows: string[][]): Map<string, { historico: NPSEntry[]; scoreAtual: number }> {
  const MES_NAMES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  // Map: slugifiedCliente → array of { mes, nota }
  const rawByClient = new Map<string, { mes: string; nota: number }[]>();

  for (const row of rows) {
    const rawData = (row[1] ?? "").trim();
    const rawNota = (row[2] ?? "").trim();
    const rawCliente = (row[4] ?? "").trim();
    if (!rawData || !rawNota || !rawCliente) continue;

    const nota = Number(rawNota.replace(",", "."));
    if (isNaN(nota)) continue;

    // Parse date: DD/MM/YYYY or MM/YYYY
    let mes: string | null = null;
    const parts = rawData.split("/");
    if (parts.length === 3) {
      const month = parseInt(parts[1], 10) - 1;
      const year = parts[2];
      mes = `${MES_NAMES[month]}/${year}`;
    } else if (parts.length === 2) {
      const month = parseInt(parts[0], 10) - 1;
      const year = parts[1];
      mes = `${MES_NAMES[month]}/${year}`;
    }
    if (!mes) continue;

    const key = slugify(rawCliente);
    if (!rawByClient.has(key)) rawByClient.set(key, []);
    rawByClient.get(key)!.push({ mes, nota });
  }

  // Calculate NPS per client per month + overall score
  const result = new Map<string, { historico: NPSEntry[]; scoreAtual: number }>();
  for (const [clientKey, entries] of rawByClient) {
    const byMes = new Map<string, number[]>();
    for (const { mes, nota } of entries) {
      if (!byMes.has(mes)) byMes.set(mes, []);
      byMes.get(mes)!.push(nota);
    }

    const npsEntries: NPSEntry[] = [];
    for (const [mes, notas] of byMes) {
      const qtdTotal = notas.length;
      const qtdPromotores = notas.filter(n => n >= 9).length;
      const qtdDetratores = notas.filter(n => n <= 6).length;
      const score = Math.round(((qtdPromotores - qtdDetratores) / qtdTotal) * 100);
      npsEntries.push({ mes, score, classificacao: npsClassificacao(score), qtdTotal, qtdPromotores, qtdDetratores });
    }

    // Sort chronologically
    const MES_ORDER = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
    npsEntries.sort((a, b) => {
      const [mA, yA] = a.mes.split("/");
      const [mB, yB] = b.mes.split("/");
      return yA !== yB ? Number(yA) - Number(yB) : MES_ORDER.indexOf(mA) - MES_ORDER.indexOf(mB);
    });

    // Overall NPS across all entries for this client
    const allNotas = entries.map(e => e.nota);
    const totalGeral = allNotas.length;
    const promotoresGeral = allNotas.filter(n => n >= 9).length;
    const detratoresGeral = allNotas.filter(n => n <= 6).length;
    const scoreAtual = totalGeral > 0
      ? Math.round(((promotoresGeral - detratoresGeral) / totalGeral) * 100)
      : 0;

    result.set(clientKey, { historico: npsEntries, scoreAtual });
  }

  return result;
}

// Spreadsheet columns (0-indexed):
// 0: Cliente | 1: Gestor | 2: Tipo de Contrato | 3: Alocado
// 4: Data de Admissão | 5: Tempo alocado | 6: Salário | 7: Valor Hora | 8: Valor Mensal
// Each row is one allocated professional. Grouped by empresa (slug = slugify(empresa)).
export async function fetchSheetsData(): Promise<DashboardData> {
  const [managersRows, npsRows] = await Promise.all([
    readSheet("relatorio gestores"),
    readSheet("NPS Clientes"),
  ]);

  const rows = managersRows.slice(1); // skip header
  const npsMap = parseNPSRows(npsRows.slice(1)); // skip header

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
          npsHistorico: npsMap.get(slugify(empresa))?.historico ?? [],
          npsGestores: [],
          scoreAtual: npsMap.get(slugify(empresa))?.scoreAtual ?? 0,
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
      dataAdmissao: row[4] ?? "",
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
