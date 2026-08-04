import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useUpsell } from "../context/UpsellContext.jsx";
import { priceForWeight, getProductThumbnail } from "../data/products.js";

export default function UpsellModal() {
  const {
    open,
    step,
    hierbasDisponibles,
    tituloModal,
    mensaje,
    etiquetaBotonAgregar,
    etiquetaBotonContinuar,
    continuarSinHierba,
    irAElegirHierba,
    confirmarHierba,
    cerrarModal,
  } = useUpsell();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="upsell-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/50 z-[80]"
            onClick={cerrarModal}
          />
          <motion.div
            key="upsell-modal"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed inset-0 z-[81] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={tituloModal}
          >
            <div
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative max-h-[85vh] overflow-y-auto cart-scroll"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={cerrarModal}
                className="absolute top-5 right-5 material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors"
                aria-label="Cerrar"
              >
                close
              </motion.button>

              {step === "oferta" && (
                <div className="space-y-6 text-center pt-2">
                  <div className="w-16 h-16 mx-auto rounded-full bg-secondary-container flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-on-secondary-container"
                      style={{ fontSize: "32px" }}
                    >
                      spa
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h2 className="font-headline-md text-headline-md text-primary">{tituloModal}</h2>
                    <p className="font-body-md text-body-md text-on-surface-variant">{mensaje}</p>
                  </div>

                  <div className="grid grid-cols-1 gap-3 pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={irAElegirHierba}
                      className="w-full py-3.5 bg-primary text-on-primary rounded-xl font-label-lg text-label-lg shadow-sm hover:shadow-lg transition-shadow"
                    >
                      {etiquetaBotonAgregar}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={continuarSinHierba}
                      className="w-full py-3 bg-white border border-outline-variant text-on-surface font-label-lg text-label-lg rounded-xl hover:bg-surface-container-low transition-colors"
                    >
                      {etiquetaBotonContinuar}
                    </motion.button>
                  </div>
                </div>
              )}

              {step === "elegir-hierba" && (
                <motion.div
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-1">
                    <h2 className="font-headline-md text-headline-md text-primary">Elige tu hierba</h2>
                    <p className="text-sm text-on-surface-variant">Se agregará junto a tu aliño personalizado.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {hierbasDisponibles.map((hierba) => {
                      const thumbnail = getProductThumbnail(hierba);
                      const precio = priceForWeight(hierba, hierba.defaultWeight);
                      return (
                        <motion.button
                          key={hierba.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => confirmarHierba(hierba)}
                          className="flex flex-col items-center gap-2 p-4 rounded-xl border border-outline-variant hover:border-primary hover:bg-surface-container-low transition-colors text-center"
                        >
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-low flex items-center justify-center shrink-0">
                            {thumbnail ? (
                              <img src={thumbnail} alt={hierba.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="material-symbols-outlined text-outline">eco</span>
                            )}
                          </div>
                          <span className="font-label-md text-label-md">{hierba.name}</span>
                          <span className="text-xs text-on-surface-variant">${precio.toFixed(2)}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
