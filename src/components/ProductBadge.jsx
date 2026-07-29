import React from "react";

const BADGE_CONFIG = {
  bestseller: {
    label: "Más vendido",
    className: "bg-secondary-container text-on-secondary-container",
    icon: "local_fire_department",
  },
  new: {
    label: "Nuevo",
    className: "bg-primary text-on-primary",
    icon: "auto_awesome",
  },
  offer: {
    label: "Oferta",
    className: "bg-error text-on-error",
    icon: "sell",
  },
};

export default function ProductBadge({ type }) {
  const config = BADGE_CONFIG[type];
  if (!config) return null;

  return (
    <div
      className={`absolute top-4 left-4 ${config.className} px-3 py-1 rounded-full font-label-md text-label-md flex items-center gap-1 shadow-sm`}
    >
      <span className="material-symbols-outlined text-sm" style={{ fontSize: "14px" }}>
        {config.icon}
      </span>
      {config.label}
    </div>
  );
}
