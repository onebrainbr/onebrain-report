import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ClientHeader } from "@/components/client/ClientHeader";
import { GestorDataSection } from "@/components/client/GestorDataSection";
import { getClientById, getAllClients } from "@/lib/data";

export const revalidate = 300;

export async function generateStaticParams() {
  const clientes = await getAllClients();
  return clientes.map((c) => ({ slug: c.id }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ from?: string; to?: string }>;
}

export default async function ClientePage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { from, to } = await searchParams;
  const cliente = await getClientById(slug);

  if (!cliente) notFound();

  return (
    <>
      <Header />
      <main id="report-content" className="max-w-screen-xl mx-auto px-8 pt-32 pb-24">

        <ClientHeader client={cliente} />

        <GestorDataSection
          alocados={cliente.alocados}
          tipoContrato={cliente.tipoContrato}
          npsHistorico={cliente.npsHistorico}
          npsGestores={cliente.npsGestores}
          scoreAtual={cliente.scoreAtual}
          empresa={cliente.empresa}
          oportunidadeExpansao={cliente.oportunidadeExpansao}
          economiaCards={cliente.economiaCards}
          indicadoresCards={cliente.indicadoresCards}
          from={from}
          to={to}
        />

      </main>
      <Footer />
    </>
  );
}
