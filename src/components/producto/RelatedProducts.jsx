import React from "react";
import ProductCard from "../ProductCard.jsx";

export default function RelatedProducts({ products }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="mt-20">
      <h2 className="font-headline-lg text-headline-lg text-primary mb-8">Productos relacionados</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-grid-gutter">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
