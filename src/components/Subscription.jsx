import React, { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "../context/ToastContext.jsx";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Subscription() {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const value = email.trim();
    if (!value) {
      setError("Ingresa tu correo para suscribirte.");
      return;
    }
    if (!EMAIL_REGEX.test(value)) {
      setError("Ingresa un correo electrónico válido.");
      return;
    }

    setError("");
    showToast("¡Listo! Ya estás suscrito a Aliños Araguaney 🌿", { icon: "mark_email_read" });
    setEmail("");
  };

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
            <form onSubmit={handleSubmit} noValidate className="space-y-2 max-w-md">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Tu correo electrónico"
                  aria-label="Correo electrónico para suscripción"
                  aria-invalid={Boolean(error)}
                  className="flex-1 px-5 py-4 rounded-full bg-white/10 border border-white/30 placeholder-white/60 text-on-primary focus:outline-none focus:ring-2 focus:ring-secondary-container"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-secondary-container text-on-secondary-container font-label-lg text-label-lg rounded-full hover:shadow-2xl transition-shadow whitespace-nowrap"
                >
                  Suscribirse Ahora
                </motion.button>
              </div>
              {error && <p className="text-sm text-secondary-container font-medium pl-2">{error}</p>}
            </form>
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
