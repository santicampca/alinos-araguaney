import React, { createContext, useContext, useMemo, useState } from "react";
import { PRODUCTS, priceForWeight } from "../data/products.js";
import { configuracion } from "../data/configuracion.js";
import { useCart } from "./CartContext.jsx";
import { useToast } from "./ToastContext.jsx";

const UpsellContext = createContext(null);

const ESTADO_INICIAL = { open: false, step: "oferta", pendingItem: null };

export function UpsellProvider({ children }) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [state, setState] = useState(ESTADO_INICIAL);

  const cfg = configuracion.ventaAdicional ?? {};

  // Productos disponibles para ofrecer como venta adicional: todos los de
  // la categoría configurada en `cfg.categoriaOferta`. Agregar una hierba
  // nueva en data/products.js hace que aparezca acá automáticamente.
  const hierbasDisponibles = useMemo(
    () => PRODUCTS.filter((p) => p.categoria === cfg.categoriaOferta),
    [cfg.categoriaOferta]
  );

  function agregarAlCarrito(product, weightId, quantity, unitPrice, ingredientes) {
    addItem(product, weightId, quantity, unitPrice, ingredientes);
  }

  // Punto único de entrada para "agregar al carrito" en toda la app.
  // Si el producto es el disparador configurado (el Aliño Personalizado),
  // intercepta y abre el modal en vez de agregar de inmediato. `ingredientes`
  // es opcional: lo usa el personalizador para llevar su configuración
  // completa (peso + ingredientes elegidos) hasta el carrito.
  function solicitarAgregado(product, weightId, quantity, unitPrice, ingredientes) {
    const debeOfrecerUpsell =
      cfg.activa &&
      cfg.productoDisparadorId &&
      product.id === cfg.productoDisparadorId &&
      hierbasDisponibles.length > 0;

    if (!debeOfrecerUpsell) {
      agregarAlCarrito(product, weightId, quantity, unitPrice, ingredientes);
      showToast(`${product.name} agregado al carrito`, { icon: "shopping_bag" });
      return;
    }

    setState({
      open: true,
      step: "oferta",
      pendingItem: { product, weightId, quantity, unitPrice, ingredientes },
    });
  }

  function continuarSinHierba() {
    const { product, weightId, quantity, unitPrice, ingredientes } = state.pendingItem;
    agregarAlCarrito(product, weightId, quantity, unitPrice, ingredientes);
    showToast(`${product.name} agregado al carrito`, { icon: "shopping_bag" });
    cerrarModal();
  }

  function irAElegirHierba() {
    setState((s) => ({ ...s, step: "elegir-hierba" }));
  }

  function confirmarHierba(hierba) {
    const { product, weightId, quantity, unitPrice, ingredientes } = state.pendingItem;
    agregarAlCarrito(product, weightId, quantity, unitPrice, ingredientes);

    const hierbaWeightId = hierba.defaultWeight;
    const hierbaPrice = priceForWeight(hierba, hierbaWeightId);
    agregarAlCarrito(hierba, hierbaWeightId, 1, hierbaPrice);

    showToast(`${product.name} + ${hierba.name} agregados al carrito`, { icon: "shopping_bag" });
    cerrarModal();
  }

  function cerrarModal() {
    setState(ESTADO_INICIAL);
  }

  const value = useMemo(
    () => ({
      open: state.open,
      step: state.step,
      pendingItem: state.pendingItem,
      hierbasDisponibles,
      tituloModal: cfg.tituloModal,
      mensaje: cfg.mensaje,
      etiquetaBotonAgregar: cfg.etiquetaBotonAgregar,
      etiquetaBotonContinuar: cfg.etiquetaBotonContinuar,
      solicitarAgregado,
      continuarSinHierba,
      irAElegirHierba,
      confirmarHierba,
      cerrarModal,
    }),
    [state, hierbasDisponibles, cfg]
  );

  return <UpsellContext.Provider value={value}>{children}</UpsellContext.Provider>;
}

export function useUpsell() {
  const ctx = useContext(UpsellContext);
  if (!ctx) throw new Error("useUpsell debe usarse dentro de un UpsellProvider");
  return ctx;
}
