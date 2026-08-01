import React from "react";
import { categorias } from "../../data/categorias.js";
import { CATEGORIA_TODAS } from "../../hooks/useProductCatalog.js";

export default function CatalogFilters({ selected, onChange }) {
  const opciones = [{ id: CATEGORIA_TODAS, nombre: "Todas" }, ...categorias];

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none" role="group" aria-label="Filtrar por categoría">
      {opciones.map((cat) => {
        const isActive = cat.id === selected;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onChange(cat.id)}
            aria-pressed={isActive}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-label-md font-semibold border transition-colors whitespace-nowrap ${
              isActive
                ? "bg-primary text-on-primary border-primary"
                : "bg-white text-on-surface-variant border-outline-variant hover:border-primary"
            }`}
          >
            {cat.nombre}
          </button>
        );
      })}
    </div>
  );
}
