import React from "react";
import { Link } from "react-router-dom";

// items: [{ label, to? }] — el último item (sin "to" o el último del array) se pinta como texto activo.
export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-on-surface-variant">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="flex items-center gap-1">
              {!isLast && item.to ? (
                <Link to={item.to} className="hover:text-primary transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-primary font-medium">{item.label}</span>
              )}
              {!isLast && (
                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                  chevron_right
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
