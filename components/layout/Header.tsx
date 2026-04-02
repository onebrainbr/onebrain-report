"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/85 backdrop-blur-xl border-b border-white/[0.07]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-8 h-20 grid grid-cols-3 items-center">
        {/* Left: logo */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity justify-self-start"
        >
          <Image
            src="/logo-onebrain.svg"
            alt="Onebrain"
            width={120}
            height={34}
            priority
            className="h-7 w-auto"
          />
        </Link>

        {/* Center: title */}
        <span className="hidden sm:block text-center text-xs font-medium tracking-widest uppercase text-white/80">
          Relatório Executivo
        </span>

        {/* Right: Landor seal */}
        <div className="flex justify-end">
          <a
            href="https://www.landor.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-90 transition-opacity"
          >
            <Image
              src="/selo-sites.svg"
              alt="Landor"
              width={120}
              height={42}
              className="h-12 w-auto"
            />
          </a>
        </div>
      </div>
    </header>
  );
}
