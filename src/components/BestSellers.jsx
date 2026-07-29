import React from "react";
import ProductCard from "./ProductCard.jsx";
import { PRODUCTS } from "../data/products.js";

export default function BestSellers() {
  return (
    <section id="shop" className="py-section-gap-mobile md:py-section-gap-desktop bg-surface-container-low">
      <div className="max-w-[1440px] mx-auto px-grid-margin">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="font-label-lg text-label-lg text-secondary mb-2">Favoritos de la Casa</p>
            <h2 className="font-headline-lg text-headline-lg text-primary">Nuestros Best Sellers</h2>
          </div>
          <a className="font-label-lg text-label-lg text-primary hover:underline" href="#shop">
            Ver todo el catálogo
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-grid-gutter">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
