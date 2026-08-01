import React, { useState } from "react";

// Acepta product.images (array) si existe; si no, usa product.image como galería de una sola foto.
export default function ProductGallery({ images = [], alt }) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-square rounded-2xl bg-surface-container-high flex items-center justify-center">
        <span className="material-symbols-outlined text-outline" style={{ fontSize: "48px" }}>
          image
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="aspect-square rounded-2xl overflow-hidden bg-surface-container-low">
        <img src={images[active]} alt={alt} className="w-full h-full object-cover" />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((src, idx) => (
            <button
              key={`${src}-${idx}`}
              type="button"
              onClick={() => setActive(idx)}
              aria-label={`Ver imagen ${idx + 1} de ${alt}`}
              aria-current={idx === active}
              className={`w-16 h-16 shrink-0 rounded-xl overflow-hidden border-2 transition-colors ${
                idx === active ? "border-primary" : "border-transparent hover:border-outline-variant"
              }`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
