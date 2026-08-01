import React from "react";

export default function Pagination({ pagina, totalPaginas, onChange }) {
  if (totalPaginas <= 1) return null;

  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-2 pt-4" aria-label="Paginación del catálogo">
      <button
        type="button"
        onClick={() => onChange(pagina - 1)}
        disabled={pagina <= 1}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface-container-low transition-colors"
        aria-label="Página anterior"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>

      {paginas.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          aria-current={p === pagina ? "page" : undefined}
          className={`w-10 h-10 rounded-full text-sm font-label-md font-semibold transition-colors ${
            p === pagina
              ? "bg-primary text-on-primary"
              : "text-on-surface-variant hover:bg-surface-container-low"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onChange(pagina + 1)}
        disabled={pagina >= totalPaginas}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface-container-low transition-colors"
        aria-label="Página siguiente"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </nav>
  );
}
