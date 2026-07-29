import React from "react";
import { motion } from "framer-motion";

export default function Subscription() {
  return (
    <section className="py-section-gap-mobile md:py-section-gap-desktop bg-primary text-on-primary overflow-hidden relative">
      <div className="absolute inset-0 opacity-10">
        <svg height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" width="100%">
          <defs>
            <pattern height="10" id="grid" patternUnits="userSpaceOnUse" width="10">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"></path>
            </pattern>
          </defs>
          <rect fill="url(#grid)" height="100%" width="100%"></rect>
        </svg>
      </div>
      <div className="max-w-[1440px] mx-auto px-grid-margin relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="font-display-lg text-display-lg">Nunca vuelvas a picar aliños</h2>
            <p className="font-body-lg text-body-lg text-on-primary-container">
              Suscríbete y recibe tus aliños favoritos cada semana o mes con un 15% de descuento fijo. Cancela o pausa
              cuando quieras.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary-container">verified</span>
                <span>15% de Descuento Permanente</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary-container">verified</span>
                <span>Prioridad en Envíos</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary-container">verified</span>
                <span>Muestras Gratis de Nuevos Productos</span>
              </li>
            </ul>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-secondary-container text-on-secondary-container font-label-lg text-label-lg rounded-full hover:shadow-2xl transition-shadow"
            >
              Suscribirse Ahora
            </motion.button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <div className="p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
              <h4 className="font-headline-md text-headline-md mb-2">Semanal</h4>
              <p className="text-sm opacity-80 mb-6">Ideal para familias que cocinan a diario.</p>
              <p className="text-2xl font-bold">
                $12.00 <span className="text-sm font-normal">/sem</span>
              </p>
            </div>
            <div className="p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
              <h4 className="font-headline-md text-headline-md mb-2">Mensual</h4>
              <p className="text-sm opacity-80 mb-6">Perfecto para abastecer tu despensa.</p>
              <p className="text-2xl font-bold">
                $40.00 <span className="text-sm font-normal">/mes</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
