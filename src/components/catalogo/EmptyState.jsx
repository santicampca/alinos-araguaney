import React from "react";
import { motion } from "framer-motion";

export default function EmptyState({
  title = "Aún no hay productos aquí",
  description = "Estamos preparando este catálogo. Muy pronto encontrarás productos disponibles en esta sección.",
  actionLabel,
  onAction,
  icon = "inventory_2",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="col-span-full flex flex-col items-center justify-center text-center bg-white rounded-[2rem] border border-outline-variant py-20 px-8"
    >
      <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-primary" style={{ fontSize: "32px" }}>
          {icon}
        </span>
      </div>
      <h3 className="font-headline-md text-headline-md text-primary mb-2">{title}</h3>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-md">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-6 px-6 py-3 bg-primary text-on-primary rounded-xl font-label-lg text-label-lg hover:shadow-lg transition-shadow"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
}
