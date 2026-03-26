/**
 * Data access layer — single entry point for all dashboard data.
 * Reads USE_MOCK_DATA env var to decide the source.
 * The rest of the application never imports from mocks or sheets directly.
 */

import { DashboardData, ClientData } from "@/types";

const USE_MOCK = process.env.USE_MOCK_DATA === "true";

async function loadData(): Promise<DashboardData> {
  if (USE_MOCK) {
    // Dynamic import so the mock file is never bundled in production API routes
    const { mockData } = await import("@/lib/mocks/data");
    return mockData;
  }

  const { fetchSheetsData } = await import("@/lib/sheets/client");
  return fetchSheetsData();
}

export async function getDashboardData(): Promise<DashboardData> {
  return loadData();
}

export async function getAllClients(): Promise<ClientData[]> {
  const data = await loadData();
  return data.clientes;
}

export async function getClientById(id: string): Promise<ClientData | null> {
  const data = await loadData();
  return data.clientes.find((c) => c.id === id) ?? null;
}
