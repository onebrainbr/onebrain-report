'use client';

import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';

interface DownloadPDFButtonProps {
  empresa: string;
}

export function DownloadPDFButton({ empresa }: DownloadPDFButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    setError(false);

    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ]);

      const element = document.getElementById('report-content');
      if (!element) {
        console.error('[PDF] Elemento #report-content não encontrado');
        setError(true);
        return;
      }

      document.body.classList.add('pdf-exporting');

      // Pausa para o CSS ser aplicado antes da captura
      await new Promise((r) => setTimeout(r, 200));

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#000000',
        logging: true,
        width: element.scrollWidth,
        height: element.scrollHeight,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      document.body.classList.remove('pdf-exporting');

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: 'a4' });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const ratio = pdfWidth / canvas.width;
      const scaledHeight = canvas.height * ratio;

      let heightLeft = scaledHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, scaledHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position -= pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, scaledHeight);
        heightLeft -= pdfHeight;
      }

      const date = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-');
      const filename = `${empresa.toLowerCase().replace(/\s+/g, '-')}-${date}.pdf`;
      pdf.save(filename);
    } catch (err) {
      console.error('[PDF] Erro ao gerar PDF:', err);
      setError(true);
    } finally {
      document.body.classList.remove('pdf-exporting');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-1" data-pdf-hide>
      <button
        onClick={handleDownload}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-50"
        style={{
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.12)',
          color: 'rgba(255,255,255,0.85)',
        }}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        {loading ? 'Gerando PDF...' : 'Baixar PDF'}
      </button>
      {error && (
        <span className="text-xs" style={{ color: 'rgba(255,100,100,0.85)' }}>
          Erro ao gerar PDF. Verifique o console.
        </span>
      )}
    </div>
  );
}
