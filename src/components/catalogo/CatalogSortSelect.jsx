import React from "react";
import { OPCIONES_ORDEN } from "../../utils/ordenarProductos.js";

export default function CatalogSortSelect({ value, onChange }) {
  return (
    <div className="flex items-center gap-2 shrink-0">
      <label htmlFor="catalogo-orden" className="text-sm text-on-surface-variant hidden sm:inline">
        Ordenar por
      </label>
      <select
        id="catalogo-orden"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-3 rounded-xl border border-outline-variant bg-white focus:outline-none focus:ring-2 focus:ring-primary font-body-md text-body-md"
      >
        {OPCIONES_ORDEN.map((op) => (
          <option key={op.id} value={op.id}>
            {op.etiqueta}
          </option>
        ))}
      </select>
    </div>
  );
}
