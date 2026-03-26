"use client";

import Image from "next/image";
import { Cloud, ShieldCheck, Bot } from "lucide-react";

interface KolivoSectionProps {
  empresa: string;
  oportunidade: string;
}

const expansionCards = [
  {
    title: "Infraestrutura e Cloud",
    description: "Gestão de infraestrutura em Nuvem e FinOps",
    icon: Cloud,
  },
  {
    title: "Segurança da informação",
    description: "Proteção de Dados e Governança de TI",
    icon: ShieldCheck,
  },
  {
    title: "Automação e IA",
    description: "RPA, Chatbots & Soluções de Inteligência Artificial",
    icon: Bot,
  },
];

export function KolivoSection({ oportunidade }: KolivoSectionProps) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-8 md:p-12"
      style={{
        background: "#181828",
        border: "1px solid #323284",
      }}
    >
      {/* Glow background */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(90,90,255,0.12) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-64 h-64 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(50,50,132,0.2) 0%, transparent 70%)" }}
      />

      <div className="relative z-10">
        {/* Logo + descrição */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10">
          <div>
            <Image
              src="/kolivo-logo.svg"
              alt="Kolivo"
              width={200}
              height={52}
              className="h-13 w-auto mb-4"
            />
            <p
              className="text-sm font-normal whitespace-nowrap"
              style={{ color: "rgba(255,255,255,0.60)" }}
            >
              Automação inteligente, segurança contínua e gestão digital estratégica para operações de TI mais eficientes, ágeis e orientadas por dados.
            </p>
          </div>
        </div>

        {/* 3 cards de expansão */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {expansionCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="rounded-xl p-8 flex flex-col gap-6 transition-all duration-300"
                style={{
                  background: "rgba(90,90,255,0.06)",
                  border: "1px solid rgba(90,90,255,0.25)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(90,90,255,0.6)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 24px rgba(90,90,255,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(90,90,255,0.25)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(90,90,255,0.15)" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "#5a5aff" }} />
                </div>
                <div>
                  <p className="text-base font-semibold text-white mb-2">{card.title}</p>
                  <p className="text-sm font-normal leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
