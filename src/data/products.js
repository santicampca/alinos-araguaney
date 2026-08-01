// Catálogo base — mismo contenido/textos/precios del diseño original.
// El precio se define "por 100g" para poder ofrecer los 3 pesos (250g/500g/1kg)
// de forma consistente, tomando como referencia el precio y peso original de cada producto.
//
// Modelo de imágenes: todos los productos usan `images: []` (arreglo), incluso
// cuando por ahora solo tengan una foto. Así, cuando lleguen productos reales
// con galería, no hay que migrar nada — solo agregar más elementos al arreglo.

export const WEIGHTS = [
  { key: "250g", grams: 250, label: "250g" },
  { key: "500g", grams: 500, label: "500g" },
  { key: "1kg", grams: 1000, label: "1kg" },
];

export const PRODUCTS = [
  {
    id: "alino-tradicional",
    name: "Aliño Tradicional",
    description: "Mezcla clásica de cebollín, cilantro y ají dulce.",
    images: ["/assets/producto-alino-tradicional.jpg"],
    pricePer100g: 4.5 / 5, // referencia original: 500g por $4.50
    defaultWeight: "500g",
    badge: "bestseller",
    stockLabel: "En Stock",
    categoria: "alinos",
  },
  {
    id: "base-ajo-aceite",
    name: "Base de Ajo & Aceite",
    description: "Ajo macerado en aceite de oliva premium.",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBcO3Z6jvMkOxFaHh_4vyLD1gORfY3lNklIhEqJUlTcr8N8FMy6v0w_7zGcwDXsHq5TQvgmMwgUUln7JT1dChI0umuUW2dQH4SIybVwY2ckd4RUgPKEVGmIPe8szGdjCf5019xYTHQc4XSEo0FbsUjSdmYcKcxhwepAQ8VT59mndZSLuGPlpsksP3rnrbmjKe22Qa5z-dM5QDac_-MDaWTI_XfWK4xjtknbqSgYBVhNI_xRoK_8w89p",
    ],
    pricePer100g: 6.0 / 2.5, // referencia original: 250g por $6.00
    defaultWeight: "250g",
    badge: "new",
    categoria: "alinos",
  },
  {
    id: "mix-parrillero",
    name: "Mix Parrillero",
    description: "Hierbas ahumadas y especias para carnes rojas.",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBsRc-X4lHB0ktpFfceyrW_nsPCaCkx_vQ9RBEqg_ekLgbloE5jKoFhktsOv3Pg9EzunxjVK_auFVGhoFk2HmA8SQwg7FDKHAhJT4GSmqJVlcZBK6W8Na_A_tlc1ud6O-KEohOHhkGY66ZKEW9Fpf5LExf4atrULBqLBGLzPzQu08TfTbn4bp94fh1_WTaXGdZU_CFrYkcIsTIN7rUWYCtGu9mtE4KudVtWFebgTDozrjYV9QCEm7ej",
    ],
    pricePer100g: 5.5 / 4, // referencia original: 400g por $5.50
    defaultWeight: "500g",
    badge: "offer",
    compareAtPer100g: (5.5 / 4) * 1.25, // precio "antes de oferta" para el tachado
    categoria: "hierbas",
  },
];

export function priceForWeight(product, weightKey) {
  const weight = WEIGHTS.find((w) => w.key === weightKey) ?? WEIGHTS[1];
  const price = (product.pricePer100g * weight.grams) / 100;
  return Math.round(price * 100) / 100;
}

export function compareAtPriceForWeight(product, weightKey) {
  if (!product.compareAtPer100g) return null;
  const weight = WEIGHTS.find((w) => w.key === weightKey) ?? WEIGHTS[1];
  const price = (product.compareAtPer100g * weight.grams) / 100;
  return Math.round(price * 100) / 100;
}

export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id) ?? null;
}

export function getRelatedProducts(product, limit = 4) {
  if (!product) return [];
  return PRODUCTS.filter((p) => p.id !== product.id && p.categoria === product.categoria).slice(0, limit);
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
