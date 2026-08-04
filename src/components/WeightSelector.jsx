import React from "react";

// Recibe las presentaciones propias del producto (cada uno define las suyas
// en data/products.js) en vez de una lista fija — así cada producto puede
// tener sus propios pesos disponibles (250g/400g/500g, 200g/400g, 25g, etc).
export default function WeightSelector({ presentaciones = [], selected, onChange }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {presentaciones.map((p) => {
        const isActive = p.id === selected;
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onChange(p.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-label-md font-semibold border transition-colors ${
              isActive
                ? "bg-primary text-on-primary border-primary"
                : "bg-white text-on-surface-variant border-outline-variant hover:border-primary"
            }`}
          >
            {p.etiqueta}
          </button>
        );
      })}
    </div>
  );
}
