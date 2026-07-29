import React from "react";
import { motion } from "framer-motion";

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
          <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Hazlo exactamente como te gusta</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
            ¿Quieres más ajo? ¿Menos cilantro? Crea tu propia mezcla personalizada. Nosotros lo picamos al momento y lo
            enviamos a tu puerta.
          </p>
          <div className="space-y-4 p-8 bg-white rounded-[2rem] shadow-xl border border-outline-variant">
            <div className="flex justify-between items-center pb-4 border-b border-outline-variant">
              <span className="font-label-lg text-label-lg">Tu Mix Custom</span>
              <span className="text-primary font-bold">+$1.00</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-xl border border-primary bg-primary-fixed/20">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
                <span className="text-sm font-medium">Extra Cilantro</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl border border-outline-variant hover:border-primary transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-outline">add_circle</span>
                <span className="text-sm font-medium">Extra Ajo</span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-4 mt-4 bg-primary text-white font-label-lg text-label-lg rounded-xl hover:shadow-lg transition-shadow"
            >
              Personalizar mi aliño
            </motion.button>
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
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBV3FiS0m8lM7ciEA9jGJkzLAxXEXCfbvsCpX7xKlvFhSYjIM4DsWIY-S8NA4wjLqd2qTI9rlKi9HpOTAL7u3A1WHECne0329uY0PS4tk8hNlYgBYw2UYqc0K9B1VcFF7Aswu2qFaXdZu8mVlpDMnk6Kj0Dt-fDYB9KQxh0WZtYDewvFBWMW5tETQ0yFjhm3-dZi6oQIGEp29jdVs8z2VaPxP0wUuwH5uBgKAf0m-nQPnPoralmDtFB"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
