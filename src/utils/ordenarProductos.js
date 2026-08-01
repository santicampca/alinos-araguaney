import { priceForWeight } from "../data/products.js";

// Cada opción de orden define su propia función de comparación.
// Agregar un criterio nuevo = agregar una entrada aquí, nada más.
export const OPCIONES_ORDEN = [
  { id: "relevancia", etiqueta: "Relevancia" },
  { id: "precio-asc", etiqueta: "Precio: menor a mayor" },
  { id: "precio-desc", etiqueta: "Precio: mayor a menor" },
  { id: "nombre-asc", etiqueta: "Nombre (A-Z)" },
  { id: "nuevos", etiqueta: "Más nuevos" },
  { id: "mas-vendidos", etiqueta: "Más vendidos" },
];

function precioBase(product) {
  return priceForWeight(product, product.defaultWeight);
}

export function ordenarProductos(productos, criterioId) {
  const lista = [...productos];

  switch (criterioId) {
    case "precio-asc":
      return lista.sort((a, b) => precioBase(a) - precioBase(b));
    case "precio-desc":
      return lista.sort((a, b) => precioBase(b) - precioBase(a));
    case "nombre-asc":
      return lista.sort((a, b) => a.name.localeCompare(b.name, "es"));
    case "nuevos":
      return lista.sort((a, b) => (b.badge === "new") - (a.badge === "new"));
    case "mas-vendidos":
      return lista.sort((a, b) => (b.badge === "bestseller") - (a.badge === "bestseller"));
    case "relevancia":
    default:
      return lista;
  }
}
