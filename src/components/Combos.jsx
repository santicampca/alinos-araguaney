import React from "react";
import { motion } from "framer-motion";

const combos = [
  {
    icon: "restaurant",
    iconBg: "bg-primary-container",
    iconColor: "text-on-primary-container",
    title: "Combo Parrilla",
    description: "Incluye Mix Parrillero (500g), Base de Ajo (250g) y Sal Marina infusionada.",
    price: "$12.99",
    compareAt: "$16.50",
    featured: false,
  },
  {
    icon: "group",
    iconBg: "bg-secondary-container",
    iconColor: "text-on-secondary-container",
    title: "Combo Familiar",
    description: "3 Aliños Tradicionales de 500g para toda la semana. ¡El favorito de mamá!",
    price: "$10.99",
    compareAt: "$13.50",
    featured: true,
  },
  {
    icon: "soup_kitchen",
    iconBg: "bg-tertiary-container",
    iconColor: "text-on-tertiary-container",
    title: "Combo Sancocho",
    description: "Mix de verduras picadas listas para la olla y aliño criollo concentrado.",
    price: "$8.50",
    compareAt: "$10.00",
    featured: false,
  },
];

export default function Combos() {
  return (
    <section className="py-section-gap-mobile md:py-section-gap-desktop bg-surface-container-highest">
      <div className="max-w-[1440px] mx-auto px-grid-margin">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-headline-lg text-headline-lg text-primary">Soluciones para cada Ocasión</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
            Ahorra aún más con nuestros combos diseñados para tus preparaciones favoritas.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-grid-gutter">
          {combos.map((combo) => (
            <motion.div
              key={combo.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -4 }}
              className={`bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-shadow border flex flex-col h-full relative overflow-hidden ${
                combo.featured ? "border-2 border-primary" : "border-outline-variant"
              }`}
            >
              {combo.featured && (
                <div className="absolute top-0 right-0 bg-primary text-white px-6 py-2 rounded-bl-2xl font-label-md text-label-md">
                  Más Popular
                </div>
              )}
              <div className={`w-16 h-16 ${combo.iconBg} rounded-2xl flex items-center justify-center mb-6`}>
                <span className={`material-symbols-outlined ${combo.iconColor} text-3xl`}>{combo.icon}</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary mb-2">{combo.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">{combo.description}</p>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-primary">{combo.price}</span>
                <span className="text-sm line-through text-outline">{combo.compareAt}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
