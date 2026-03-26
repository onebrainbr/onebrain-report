import { google } from "googleapis";
import { DashboardData } from "@/types";
import { slugify } from "@/lib/utils";

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

// Transform raw sheet rows into DashboardData
// Column mapping is based on the actual spreadsheet structure.
// Update the indices below if the sheet columns change.
export async function fetchSheetsData(): Promise<DashboardData> {
  const [managersRows] = await Promise.all([
    readSheet("relatorio gestores"),
    // readSheet("NPS clientes"), // uncomment when ready
  ]);

  // Skip header row
  const rows = managersRows.slice(1);

  // Group by empresa
  const clientMap = new Map<string, any>();

  for (const row of rows) {
    const empresa = row[0] ?? "";
    if (!empresa) continue;

    if (!clientMap.has(empresa)) {
      clientMap.set(empresa, {
        id: slugify(empresa),
        empresa,
        gestor: row[1] ?? "",
        tipoContrato: row[2] ?? "OUTSOURCING",
        detalhesContrato: row[3] ?? "",
        inicioContrato: row[4] ?? "",
        alocados: [],
        historico: [],
        npsHistorico: [],
        npsGestores: [],
        scoreAtual: Number(row[5] ?? 0),
        economiaGerada: [],
        indicadoresSucesso: [],
        oportunidadeExpansao: row[6] ?? "",
      });
    }

    // Each row is a monthly entry
    const entry = clientMap.get(empresa);
    entry.historico.push({
      mes: row[7] ?? "",
      valorMensal: Number((row[8] ?? "0").replace(/[^0-9]/g, "")),
      qtdAlocados: Number(row[9] ?? 0),
      salarioMedio: Number((row[10] ?? "0").replace(/[^0-9]/g, "")),
    });
  }

  return {
    ultimaAtualizacao: new Date().toISOString(),
    clientes: Array.from(clientMap.values()),
  };
}
