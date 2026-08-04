// Catálogo de productos de Aliños Araguaney.
//
// Modelo escalable: cada producto define su propio arreglo `presentaciones`
// (no todos los productos manejan los mismos pesos — las hierbas solo vienen
// en 25g, los individuales en 200g/400g, etc). Para agregar un producto nuevo,
// solo hay que agregar un objeto nuevo a `PRODUCTS` con su propia lista de
// presentaciones — no hay que tocar ningún componente.
//
// ⚠️ PRECIOS PENDIENTES: todavía no nos dieron los precios reales de este
// catálogo, así que cada presentación quedó con `precio: 0` como placeholder
// explícito (no se inventó ningún número). Antes de publicar la tienda,
// reemplaza los `precio: 0` de este archivo por los precios reales — no hace
// falta tocar nada más, todo el resto (carrito, catálogo, producto, WhatsApp)
// ya lee este valor automáticamente.
//
// Modelo de imágenes: `images: []` (arreglo). Los productos que todavía no
// tienen foto quedan con el arreglo vacío, y los componentes (ProductCard,
// ProductGallery) ya saben mostrar un ícono de reemplazo en ese caso.

export const PRODUCTS = [
  // ─── ALIÑOS ───────────────────────────────────────────────
  {
    id: "alino-araguaney",
    name: "Aliño Araguaney",
    description: "Nuestro aliño clásico, listo para usar en cualquier preparación.",
    images: [],
    categoria: "alinos",
    badge: "bestseller",
    destacado: true,
    stockLabel: "En Stock",
    defaultWeight: "400g",
    presentaciones: [
      { id: "250g", etiqueta: "250 g", gramos: 250, precio: 0 },
      { id: "400g", etiqueta: "400 g", gramos: 400, precio: 0, estandar: true },
      { id: "500g", etiqueta: "500 g", gramos: 500, precio: 0 },
    ],
  },
  {
    // No es un producto normal: no se agrega al carrito desde la tarjeta.
    // `personalizable: true` hace que ProductCard muestre una tarjeta CTA
    // que lleva directo a /personalizar (ver ProductCard.jsx), y que
    // Producto.jsx redirija ahí si alguien entra por la URL directa.
    // Las `presentaciones` se mantienen porque el personalizador las usa
    // para calcular el precio según el tamaño elegido (misma lógica que
    // usa el carrito — ver Personalizar.jsx).
    id: "alino-personalizado",
    name: "Aliño Personalizado",
    description: "Elige tus ingredientes y arma tu combinación ideal.",
    images: [],
    categoria: "alinos",
    personalizable: true,
    destacado: true,
    defaultWeight: "400g",
    presentaciones: [
      { id: "250g", etiqueta: "250 g", gramos: 250, precio: 0 },
      { id: "400g", etiqueta: "400 g", gramos: 400, precio: 0, estandar: true },
      { id: "500g", etiqueta: "500 g", gramos: 500, precio: 0 },
    ],
  },

  // ─── ENSALADAS ────────────────────────────────────────────
  {
    id: "ensalada-zanahoria-repollo-cebolla-morada",
    name: "Zanahoria + Repollo + Cebolla Morada",
    description: "Mezcla fresca de zanahoria, repollo y cebolla morada, lista para servir.",
    images: [],
    categoria: "ensaladas",
    badge: "bestseller",
    destacado: true,
    stockLabel: "En Stock",
    defaultWeight: "400g",
    presentaciones: [
      { id: "400g", etiqueta: "400 g", gramos: 400, precio: 0, estandar: true },
      { id: "500g", etiqueta: "500 g", gramos: 500, precio: 0 },
    ],
  },
  {
    id: "ensalada-zanahoria-repollo",
    name: "Zanahoria + Repollo",
    description: "Mezcla fresca de zanahoria y repollo, lista para servir.",
    images: [],
    categoria: "ensaladas",
    stockLabel: "En Stock",
    defaultWeight: "400g",
    presentaciones: [{ id: "400g", etiqueta: "400 g", gramos: 400, precio: 0, estandar: true }],
  },

  // ─── INDIVIDUALES ─────────────────────────────────────────
  {
    id: "cebolla-morada",
    name: "Cebolla Morada",
    description: "Cebolla morada fresca, picada y lista para usar.",
    images: [],
    categoria: "individuales",
    stockLabel: "En Stock",
    defaultWeight: "200g",
    presentaciones: [
      { id: "200g", etiqueta: "200 g", gramos: 200, precio: 0, estandar: true },
      { id: "400g", etiqueta: "400 g", gramos: 400, precio: 0 },
    ],
  },
  {
    id: "repollo",
    name: "Repollo",
    description: "Repollo fresco, picado y listo para usar.",
    images: [],
    categoria: "individuales",
    stockLabel: "En Stock",
    defaultWeight: "200g",
    presentaciones: [
      { id: "200g", etiqueta: "200 g", gramos: 200, precio: 0, estandar: true },
      { id: "400g", etiqueta: "400 g", gramos: 400, precio: 0 },
    ],
  },
  {
    id: "zanahoria",
    name: "Zanahoria",
    description: "Zanahoria fresca, picada y lista para usar.",
    images: [],
    categoria: "individuales",
    stockLabel: "En Stock",
    defaultWeight: "200g",
    presentaciones: [
      { id: "200g", etiqueta: "200 g", gramos: 200, precio: 0, estandar: true },
      { id: "400g", etiqueta: "400 g", gramos: 400, precio: 0 },
    ],
  },

  // ─── HIERBAS (todas 25 g) ─────────────────────────────────
  {
    id: "laurel",
    name: "Laurel",
    description: "Hoja de laurel natural, ideal para dar aroma a tus preparaciones.",
    images: [],
    categoria: "hierbas",
    stockLabel: "En Stock",
    defaultWeight: "25g",
    presentaciones: [{ id: "25g", etiqueta: "25 g", gramos: 25, precio: 0, estandar: true }],
  },
  {
    id: "eucalipto",
    name: "Eucalipto",
    description: "Hoja de eucalipto natural.",
    images: [],
    categoria: "hierbas",
    stockLabel: "En Stock",
    defaultWeight: "25g",
    presentaciones: [{ id: "25g", etiqueta: "25 g", gramos: 25, precio: 0, estandar: true }],
  },
  {
    id: "menta",
    name: "Menta",
    description: "Hoja de menta natural, fresca y aromática.",
    images: [],
    categoria: "hierbas",
    stockLabel: "En Stock",
    defaultWeight: "25g",
    presentaciones: [{ id: "25g", etiqueta: "25 g", gramos: 25, precio: 0, estandar: true }],
  },
  {
    id: "hoja-de-aguacate",
    name: "Hoja de Aguacate",
    description: "Hoja de aguacate natural.",
    images: [],
    categoria: "hierbas",
    stockLabel: "En Stock",
    defaultWeight: "25g",
    presentaciones: [{ id: "25g", etiqueta: "25 g", gramos: 25, precio: 0, estandar: true }],
  },
  {
    id: "toronjil",
    name: "Toronjil",
    description: "Toronjil natural, ideal para infusiones.",
    images: [],
    categoria: "hierbas",
    stockLabel: "En Stock",
    defaultWeight: "25g",
    presentaciones: [{ id: "25g", etiqueta: "25 g", gramos: 25, precio: 0, estandar: true }],
  },
  {
    id: "hoja-de-guayaba",
    name: "Hoja de Guayaba",
    description: "Hoja de guayaba natural.",
    images: [],
    categoria: "hierbas",
    stockLabel: "En Stock",
    defaultWeight: "25g",
    presentaciones: [{ id: "25g", etiqueta: "25 g", gramos: 25, precio: 0, estandar: true }],
  },
  {
    id: "malojillo",
    name: "Malojillo",
    description: "Malojillo (limoncillo) natural, ideal para infusiones.",
    images: [],
    categoria: "hierbas",
    stockLabel: "En Stock",
    defaultWeight: "25g",
    presentaciones: [{ id: "25g", etiqueta: "25 g", gramos: 25, precio: 0, estandar: true }],
  },
];

// Precio de una presentación específica de un producto. Esta es LA ÚNICA
// función que calcula precios en toda la app — el carrito, el catálogo y la
// página de producto la usan exactamente igual, así que nunca puede haber
// diferencia entre lo que se muestra y lo que se cobra.
export function priceForWeight(product, weightId) {
  const presentacion =
    product.presentaciones?.find((p) => p.id === weightId) ?? product.presentaciones?.[0];
  return presentacion ? presentacion.precio : 0;
}

// Precio "antes de oferta" de una presentación, si la tiene configurada
// (campo opcional `precioComparativo` dentro de la presentación). Ningún
// producto lo usa todavía; queda listo para cuando haya una oferta real.
export function compareAtPriceForWeight(product, weightId) {
  const presentacion = product.presentaciones?.find((p) => p.id === weightId);
  return presentacion?.precioComparativo ?? null;
}

export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id) ?? null;
}

export function getRelatedProducts(product, limit = 4) {
  if (!product) return [];
  return PRODUCTS.filter((p) => p.id !== product.id && p.categoria === product.categoria).slice(0, limit);
}

// Productos destacados para el Home (sección "Best Sellers"). Para cambiar
// cuáles se muestran ahí, solo hay que mover el flag `destacado: true/false`
// en el producto correspondiente — no hace falta tocar ningún componente.
export function getFeaturedProducts() {
  return PRODUCTS.filter((p) => p.destacado);
}

// Normaliza cualquier objeto "tipo producto" (un producto real de PRODUCTS,
// o un pseudo-producto como los que arma Combos.jsx) a un arreglo de imágenes.
// Acepta tanto el modelo nuevo (`images: []`) como el legado (`image: "..."`),
// para que nada se rompa si algo todavía usa el campo singular.
export function getProductImages(product) {
  if (!product) return [];
  if (Array.isArray(product.images) && product.images.length > 0) return product.images;
  if (product.image) return [product.image];
  return [];
}

// Primera imagen disponible de un producto (para thumbnails: tarjetas, carrito).
export function getProductThumbnail(product) {
  return getProductImages(product)[0] ?? null;
}
