import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Relatório Onebrain | Dashboard Executivo",
  description: "Acompanhamento de consultoria e indicadores de performance por cliente.",
  icons: { icon: "/favicon-onebrain.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.className} min-h-screen bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
