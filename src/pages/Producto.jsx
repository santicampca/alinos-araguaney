import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { priceForWeight, compareAtPriceForWeight, getProductImages } from "../data/products.js";
import { categorias } from "../data/categorias.js";
import { useProductDetail } from "../hooks/useProductDetail.js";
import { useUpsell } from "../context/UpsellContext.jsx";

import Breadcrumb from "../components/producto/Breadcrumb.jsx";
import ProductGallery from "../components/producto/ProductGallery.jsx";
import ProductDetailSkeleton from "../components/producto/ProductDetailSkeleton.jsx";
import RelatedProducts from "../components/producto/RelatedProducts.jsx";
import ProductBadge from "../components/ProductBadge.jsx";
import WeightSelector from "../components/WeightSelector.jsx";
import QuantitySelector from "../components/QuantitySelector.jsx";
import EmptyState from "../components/catalogo/EmptyState.jsx";

export default function Producto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cargando, producto, relacionados } = useProductDetail(id);
  const { solicitarAgregado } = useUpsell();

  const [weight, setWeight] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // El peso seleccionado se inicializa apenas llega el producto (antes de eso no existe).
  const pesoActual = weight ?? producto?.defaultWeight;

  const categoriaInfo = producto ? categorias.find((c) => c.id === producto.categoria) : null;

  // Misma función que usa el carrito (priceForWeight) — el precio unitario se
  // recalcula en cada render según el peso elegido, y el total según la
  // cantidad. Nunca hay un cálculo distinto al que usa el carrito.
  const precioUnitario = producto ? priceForWeight(producto, pesoActual) : 0;
  const precioComparativoUnitario = producto ? compareAtPriceForWeight(producto, pesoActual) : null;
  const precioTotal = precioUnitario * quantity;
  const precioComparativoTotal = precioComparativoUnitario ? precioComparativoUnitario * quantity : null;

  const handleAddToCart = () => {
    if (!producto) return;
    solicitarAgregado(producto, pesoActual, quantity, precioUnitario);
    setQuantity(1);
  };

  return (
    <section className="pt-32 pb-section-gap-mobile md:pb-section-gap-desktop min-h-screen">
      <div className="max-w-[1440px] mx-auto px-grid-margin">
        <Breadcrumb
          items={[
            { label: "Inicio", to: "/" },
            { label: "Catálogo", to: "/catalogo" },
            ...(categoriaInfo ? [{ label: categoriaInfo.nombre, to: `/catalogo` }] : []),
            { label: cargando ? "Cargando..." : producto ? producto.name : "Producto no encontrado" },
          ]}
        />

        {cargando && <ProductDetailSkeleton />}

        {!cargando && !producto && (
          <div className="grid grid-cols-1">
            <EmptyState
              icon="search_off"
              title="Producto no encontrado"
              description="El producto que buscas no existe o ya no está disponible."
              actionLabel="Volver al catálogo"
              onAction={() => navigate("/catalogo")}
            />
          </div>
        )}

        {!cargando && producto && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            >
              <ProductGallery images={getProductImages(producto)} alt={producto.name} />

              <div className="space-y-6 relative">
                <ProductBadge type={producto.badge} />

                <div className="space-y-2">
                  <h1 className="font-headline-lg text-headline-lg text-primary">{producto.name}</h1>
                  {producto.stockLabel && (
                    <div className="inline-flex items-center gap-1 bg-surface-container-low px-3 py-1 rounded-full text-green-700 font-label-md text-label-md">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span> {producto.stockLabel}
                    </div>
                  )}
                </div>

                <p className="font-body-lg text-body-lg text-on-surface-variant">{producto.description}</p>

                <div className="space-y-1">
                  <div className="flex items-baseline gap-3">
                    <span className="font-headline-lg text-headline-lg text-primary">
                      ${precioTotal.toFixed(2)}
                    </span>
                    {precioComparativoTotal && (
                      <span className="text-lg line-through text-outline">
                        ${precioComparativoTotal.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {quantity > 1 && (
                    <p className="text-sm text-on-surface-variant">
                      ${precioUnitario.toFixed(2)} c/u × {quantity} unidades
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <p className="font-label-lg text-label-lg">Peso</p>
                  <WeightSelector presentaciones={producto.presentaciones} selected={pesoActual} onChange={setWeight} />
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <QuantitySelector quantity={quantity} onChange={setQuantity} />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-on-primary rounded-xl font-label-lg text-label-lg shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                      add_shopping_cart
                    </span>
                    Agregar al carrito
                  </motion.button>
                </div>
              </div>
            </motion.div>

            <RelatedProducts products={relacionados} />
          </>
        )}
      </div>
    </section>
  );
}
