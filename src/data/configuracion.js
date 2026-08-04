export const configuracion = {
  moneda: "$",

  pedidoMinimo: 0,

  ciudadPrincipal: "Caracas",

  envioGratis: true,

  costoEnvio: 0,

  permitirPersonalizacion: true,

  permitirMayoristas: true,

  productosPorPagina: 8,

  // Venta adicional (upsell): al agregar el producto `productoDisparadorId`
  // al carrito, se muestra un modal ofreciendo un producto de la categoría
  // `categoriaOferta` antes de completar el agregado. Para cambiar la oferta
  // en el futuro (otro producto disparador, otra categoría, otro mensaje, o
  // desactivarla del todo con `activa: false`) solo hay que editar este
  // bloque — no hace falta tocar ningún componente.
  ventaAdicional: {
    activa: true,
    productoDisparadorId: "alino-personalizado",
    categoriaOferta: "hierbas",
    tituloModal: "¡Un toque extra para tu aliño!",
    mensaje: "Completa tu compra agregando una hierba natural por un precio especial.",
    etiquetaBotonAgregar: "Agregar Hierba",
    etiquetaBotonContinuar: "Continuar sin Hierba"
  }
};
