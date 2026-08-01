import { useEffect, useMemo, useState } from "react";
import { ordenarProductos } from "../utils/ordenarProductos.js";

const CATEGORIA_TODAS = "todas";
const LATENCIA_SIMULADA_MS = 400; // simula una llamada async; quitar al conectar API real

export { CATEGORIA_TODAS };

export function useProductCatalog({ productos, porPagina = 8 }) {
  const [query, setQuery] = useState("");
  const [categoria, setCategoria] = useState(CATEGORIA_TODAS);
  const [orden, setOrden] = useState("relevancia");
  const [pagina, setPagina] = useState(1);
  const [cargando, setCargando] = useState(true);

  // Vuelve a la página 1 cada vez que cambia un filtro.
  useEffect(() => {
    setPagina(1);
  }, [query, categoria, orden]);

  // Simula la latencia de una petición real para poder probar el skeleton loading.
  // Al conectar un backend, este efecto se reemplaza por el fetch correspondiente
  // manteniendo exactamente el mismo estado de salida (cargando / resultados).
  useEffect(() => {
    setCargando(true);
    const timeout = setTimeout(() => setCargando(false), LATENCIA_SIMULADA_MS);
    return () => clearTimeout(timeout);
  }, [productos, query, categoria, orden]);

  const filtrados = useMemo(() => {
    let resultado = [...productos];

    if (categoria !== CATEGORIA_TODAS) {
      resultado = resultado.filter((p) => p.categoria === categoria);
    }

    const q = query.trim().toLowerCase();
    if (q) {
      resultado = resultado.filter((p) => {
        const texto = `${p.name} ${p.description ?? ""}`.toLowerCase();
        return texto.includes(q);
      });
    }

    return ordenarProductos(resultado, orden);
  }, [productos, query, categoria, orden]);

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / porPagina));
  const paginaSegura = Math.min(pagina, totalPaginas);

  const productosPagina = useMemo(() => {
    const inicio = (paginaSegura - 1) * porPagina;
    return filtrados.slice(inicio, inicio + porPagina);
  }, [filtrados, paginaSegura, porPagina]);

  return {
    query,
    setQuery,
    categoria,
    setCategoria,
    orden,
    setOrden,
    pagina: paginaSegura,
    setPagina,
    totalPaginas,
    cargando,
    resultados: productosPagina,
    totalResultados: filtrados.length,
  };
}
