import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DashboardEntry } from "@/components/overview/DashboardEntry";
import { getAllClients } from "@/lib/data";

export const revalidate = 3600;

export default async function HomePage() {
  const clientes = await getAllClients();
  const clientOptions = clientes.map((c) => ({
    id: c.id,
    empresa: c.empresa,
    gestor: c.gestor,
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
