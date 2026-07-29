import React from "react";
import { WEIGHTS } from "../data/products.js";

export default function WeightSelector({ selected, onChange }) {
  return (
    <div className="flex gap-2">
      {WEIGHTS.map((w) => {
        const isActive = w.key === selected;
        return (
          <button
            key={w.key}
            type="button"
            onClick={() => onChange(w.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-label-md font-semibold border transition-colors ${
              isActive
                ? "bg-primary text-on-primary border-primary"
                : "bg-white text-on-surface-variant border-outline-variant hover:border-primary"
            }`}
          >
            {w.label}
          </button>
        );
      })}
    </div>
  );
}
