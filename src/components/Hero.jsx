import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-32 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-grid-margin w-full grid grid-cols-1 lg:grid-cols-12 gap-grid-gutter items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-6 z-10 space-y-8"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-secondary font-label-lg text-label-lg">
              <span className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                ))}
              </span>
              <span>+500 Clientes Felices</span>
            </div>
            <h1 className="font-display-lg text-display-lg text-primary leading-tight">
              El Corazón de tu Cocina, <br />
              <span className="italic font-normal">Listo para Usar</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
              Aliños frescos, picados y sin conservantes. Ahorra tiempo sin sacrificar el sabor de hogar.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <motion.a
              href="#shop"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-primary text-white font-label-lg text-label-lg rounded-xl shadow-lg hover:shadow-xl transition-shadow inline-block"
            >
              Comprar Ahora
            </motion.a>
            <div className="flex gap-6 items-center px-4 py-2 border-l border-outline-variant">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">local_shipping</span>
                <span className="font-label-md text-label-md">Envío Rápido</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">eco</span>
                <span className="font-label-md text-label-md">100% Fresco</span>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="lg:col-span-6 relative"
        >
          <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden shadow-2xl">
            <img
              alt="Aliños Araguaney Fresh Product"
              className="w-full h-full object-cover"
              src="/assets/hero-alino-preparado.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-outline-variant max-w-[240px]"
          >
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-on-secondary-container">timer</span>
              </div>
              <div>
                <p className="font-label-lg text-label-lg">Ahorra 45 min</p>
                <p className="text-xs text-on-surface-variant">de picado diario</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
