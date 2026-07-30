import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Personalization() {
  return (
    <section id="personalizacion" className="py-section-gap-mobile md:py-section-gap-desktop relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-grid-margin grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-label-lg text-label-lg text-secondary mb-4 uppercase tracking-widest">Personalización</p>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Construye tu propio aliño</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
            ¿Quieres más ajo? ¿Menos cilantro? Escoge el tamaño del envase y distribuye tú mismo los ingredientes.
            Nosotros lo picamos al momento y lo enviamos a tu puerta.
          </p>
          <div className="space-y-4 p-8 bg-white rounded-[2rem] shadow-xl border border-outline-variant">
            <div className="flex justify-between items-center pb-4 border-b border-outline-variant">
              <span className="font-label-lg text-label-lg">Constructor Inteligente</span>
              <span className="material-symbols-outlined text-primary">tune</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-xl border border-primary bg-primary-fixed/20">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
                <span className="text-sm font-medium">Eliges el tamaño</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl border border-primary bg-primary-fixed/20">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
                <span className="text-sm font-medium">Distribuyes los gramos</span>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/personalizar"
                className="w-full py-4 mt-4 bg-primary text-white font-label-lg text-label-lg rounded-xl hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
              >
                Personalizar mi aliño
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <div className="rounded-[3rem] overflow-hidden shadow-2xl rotate-3 scale-95 hover:rotate-0 hover:scale-100 transition-all duration-700">
            <img
              className="w-full object-cover h-[600px]"
              alt="Chef preparando mezcla personalizada de aliños frescos"
              src="/assets/hero-alino-preparado.jpg"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
