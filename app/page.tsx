import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DashboardEntry } from "@/components/overview/DashboardEntry";
import { getAllClients } from "@/lib/data";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function HomePage() {
  const clientes = await getAllClients();
  const clientOptions = clientes.map((c) => ({
    id: c.id,
    empresa: c.empresa,
    tipoContrato: c.tipoContrato,
  }));

  return (
    <>
      <Header />
      <main>
        <DashboardEntry clientes={clientOptions} />
      </main>
      <Footer />
    </>
  );
}
