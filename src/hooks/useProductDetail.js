import { useEffect, useState } from "react";
import { getProductById, getRelatedProducts } from "../data/products.js";

const LATENCIA_SIMULADA_MS = 350; // reemplazar por el fetch real cuando exista backend

export function useProductDetail(id) {
  const [cargando, setCargando] = useState(true);
  const [producto, setProducto] = useState(null);
  const [relacionados, setRelacionados] = useState([]);

  useEffect(() => {
    setCargando(true);
    const timeout = setTimeout(() => {
      const encontrado = getProductById(id);
      setProducto(encontrado);
      setRelacionados(encontrado ? getRelatedProducts(encontrado) : []);
      setCargando(false);
    }, LATENCIA_SIMULADA_MS);
    return () => clearTimeout(timeout);
  }, [id]);

  return { cargando, producto, relacionados };
}
