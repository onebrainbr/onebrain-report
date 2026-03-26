import Image from "next/image";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/8 mt-24">
      <div className="max-w-screen-xl mx-auto px-8 py-8 flex items-center justify-between">
        <Image
          src="/logo-onebrain.svg"
          alt="Onebrain"
          width={100}
          height={28}
          className="h-6 w-auto opacity-85"
        />
        <p className="text-white/40 text-xs">
          © {year} Onebrain. Uso interno e confidencial.
        </p>
        <a
          href="https://www.landor.com.br/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-100 transition-opacity"
        >
          <Image
            src="/selo-sites.svg"
            alt="Landor"
            width={120}
            height={42}
            className="h-12 w-auto opacity-80"
          />
        </a>
      </div>
    </footer>
  );
}
