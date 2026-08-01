import React from "react";
import { motion } from "framer-motion";

import { PRODUCTS } from "../data/products.js";
import { configuracion } from "../data/configuracion.js";
import { useProductCatalog, CATEGORIA_TODAS } from "../hooks/useProductCatalog.js";

import ProductCard from "../components/ProductCard.jsx";
import ProductCardSkeleton from "../components/catalogo/ProductCardSkeleton.jsx";
import EmptyState from "../components/catalogo/EmptyState.jsx";
import CatalogSearchBar from "../components/catalogo/CatalogSearchBar.jsx";
import CatalogFilters from "../components/catalogo/CatalogFilters.jsx";
import CatalogSortSelect from "../components/catalogo/CatalogSortSelect.jsx";
import Pagination from "../components/catalogo/Pagination.jsx";

export default function Catalogo() {
  const {
    query,
    setQuery,
    categoria,
    setCategoria,
    orden,
    setOrden,
    pagina,
    setPagina,
    totalPaginas,
    cargando,
    resultados,
    totalResultados,
  } = useProductCatalog({ productos: PRODUCTS, porPagina: configuracion.productosPorPagina ?? 8 });

  const hayFiltrosActivos = query.trim() !== "" || categoria !== CATEGORIA_TODAS;

  const limpiarFiltros = () => {
    setQuery("");
    setCategoria(CATEGORIA_TODAS);
  };

  return (
    <section className="pt-32 pb-section-gap-mobile md:pb-section-gap-desktop min-h-screen">
      <div className="max-w-[1440px] mx-auto px-grid-margin">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <p className="font-label-lg text-label-lg text-secondary mb-2">Aliños Araguaney</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">Catálogo completo</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-xl mx-auto">
            Explora todos nuestros productos, filtra por categoría y encuentra justo lo que necesitas.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <CatalogSearchBar value={query} onChange={setQuery} />
          <CatalogSortSelect value={orden} onChange={setOrden} />
        </div>

        <div className="mb-8">
          <CatalogFilters selected={categoria} onChange={setCategoria} />
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-on-surface-variant">
            {cargando ? "Buscando productos..." : `${totalResultados} producto${totalResultados === 1 ? "" : "s"} encontrado${totalResultados === 1 ? "" : "s"}`}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-grid-gutter">
          {cargando &&
            Array.from({ length: configuracion.productosPorPagina ?? 8 }).map((_, i) => (
              <ProductCardSkeleton key={`skeleton-${i}`} />
            ))}

          {!cargando && resultados.length === 0 && (
            <EmptyState
              title={hayFiltrosActivos ? "No encontramos productos" : "Aún no hay productos en esta sección"}
              description={
                hayFiltrosActivos
                  ? "Prueba con otra búsqueda o revisa otra categoría."
                  : "Esta categoría está lista para recibir productos en cuanto estén disponibles."
              }
              actionLabel={hayFiltrosActivos ? "Ver todo el catálogo" : undefined}
              onAction={hayFiltrosActivos ? limpiarFiltros : undefined}
              icon={hayFiltrosActivos ? "search_off" : "inventory_2"}
            />
          )}

          {!cargando &&
            resultados.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>

        {!cargando && (
          <div className="mt-10">
            <Pagination pagina={pagina} totalPaginas={totalPaginas} onChange={setPagina} />
          </div>
        )}
      </div>
    </section>
  );
}
