'use client';

import { Download } from 'lucide-react';

export function DownloadPDFButton() {
  return (
    <button
      onClick={() => window.print()}
      data-pdf-hide
      className="flex items-center gap-2 px-5 h-14 rounded-xl text-sm font-medium transition-all whitespace-nowrap"
      style={{
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.12)',
        color: 'rgba(255,255,255,0.85)',
      }}
    >
      <Download className="w-4 h-4" />
      Baixar Relatório
    </button>
  );
}
