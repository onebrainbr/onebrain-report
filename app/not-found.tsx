import Link from "next/link";
import { Header } from "@/components/layout/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-6 pt-48 text-center">
        <p className="section-label mb-4">404</p>
        <h1 className="text-4xl font-semibold text-white mb-4">Cliente não encontrado</h1>
        <p className="text-white/40 mb-8">O relatório solicitado não existe ou foi removido.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
        >
          ← Voltar ao painel
        </Link>
      </main>
    </>
  );
}
