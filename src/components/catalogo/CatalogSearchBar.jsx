import React from "react";

export default function CatalogSearchBar({ value, onChange, placeholder = "Buscar productos..." }) {
  return (
    <div className="relative flex-1 min-w-[220px]">
      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
        search
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Buscar productos"
        className="w-full pl-12 pr-4 py-3 rounded-xl border border-outline-variant bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-body-md text-body-md"
      />
    </div>
  );
}
