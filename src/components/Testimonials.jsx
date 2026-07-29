import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Me cambió la vida. Ya no pierdo tiempo picando cebollín después del trabajo. El sabor es tan fresco como si lo acabara de picar yo.",
    name: "Maria G.",
    role: "Chef Aficionada",
  },
  {
    quote:
      "El Combo Parrillero es espectacular. Los aliños están tan bien balanceados que hasta mis amigos me preguntan qué secreto le puse a la carne.",
    name: "Ricardo L.",
    role: "Parrillero de Fin de Semana",
  },
  {
    quote:
      "La entrega es súper rápida y el producto llega frío y en perfectas condiciones. Recomiendo Aliños Araguaney a ciegas.",
    name: "Lucía F.",
    role: "Cliente Recurrente",
  },
];

export default function Testimonials() {
  return (
    <section id="recetas" className="py-section-gap-mobile md:py-section-gap-desktop">
      <div className="max-w-[1440px] mx-auto px-grid-margin">
        <div className="text-center mb-16">
          <p className="font-label-lg text-label-lg text-secondary mb-2">Testimonios</p>
          <h2 className="font-headline-lg text-headline-lg text-primary">Lo que dicen nuestros clientes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-grid-gutter">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 bg-white rounded-3xl shadow-sm border border-outline-variant"
            >
              <div className="flex gap-1 text-secondary mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                ))}
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 italic">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-dim"></div>
                <div>
                  <p className="font-label-lg text-label-lg">{t.name}</p>
                  <p className="text-xs text-outline">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
