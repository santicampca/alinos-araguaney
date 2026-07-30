import React, { useState } from "react";
import { Link } from "react-router-dom";
import { empresa } from "../data/empresa";
import { useToast } from "../context/ToastContext.jsx";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Footer() {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL_REGEX.test(value)) {
      showToast("Ingresa un correo electrónico válido.", { icon: "error" });
      return;
    }
    showToast("¡Gracias por suscribirte!", { icon: "mark_email_read" });
    setEmail("");
  };

  return (
    <footer
      id="historia"
      className="bg-surface-container-low dark:bg-surface-container-highest border-t border-outline-variant"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-grid-gutter px-grid-margin py-section-gap-mobile md:py-section-gap-desktop max-w-[1440px] mx-auto">

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <img
              src="/assets/logo.png"
              alt={empresa.nombre}
              className="w-9 h-9 rounded-full object-cover"
            />
            <span className="font-headline-md text-headline-md text-primary">
              {empresa.nombre}
            </span>
          </div>

          <p className="font-body-md text-body-md text-on-surface-variant">
            {empresa.slogan}
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-label-lg text-label-lg text-primary uppercase">
            Empresa
          </h4>

          <div className="flex flex-col gap-2">
            <a
              className="font-body-md text-body-md text-on-surface-variant hover:underline decoration-secondary"
              href="#"
            >
              Política de Privacidad
            </a>

            <a
              className="font-body-md text-body-md text-on-surface-variant hover:underline decoration-secondary"
              href="#"
            >
              Términos y Condiciones
            </a>

            <a
              className="font-body-md text-body-md text-on-surface-variant hover:underline decoration-secondary"
              href="#"
            >
              Envíos
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-label-lg text-label-lg text-primary uppercase">
            Explorar
          </h4>

          <div className="flex flex-col gap-2">
            <Link
              className="font-body-md text-body-md text-on-surface-variant hover:underline decoration-secondary"
              to="/#shop"
            >
              Productos
            </Link>

            <Link
              className="font-body-md text-body-md text-on-surface-variant hover:underline decoration-secondary"
              to="/personalizar"
            >
              Personaliza tu aliño
            </Link>

            <Link
              className="font-body-md text-body-md text-on-surface-variant hover:underline decoration-secondary"
              to="/#recetas"
            >
              Recetas
            </Link>

            <a
              className="font-body-md text-body-md text-on-surface-variant hover:underline decoration-secondary"
              href={empresa.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-label-lg text-label-lg text-primary uppercase">
            Newsletter
          </h4>

          <p className="text-sm text-on-surface-variant">
            Recibe recetas y ofertas exclusivas.
          </p>

          <form onSubmit={handleNewsletterSubmit} noValidate className="flex gap-2">
            <input
              className="flex-1 bg-white border border-outline-variant rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="Tu email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Correo electrónico para newsletter"
            />

            <button type="submit" className="bg-primary text-white p-2 rounded-xl" aria-label="Suscribirse">
              <span className="material-symbols-outlined">send</span>
            </button>
          </form>
        </div>

      </div>

      <div className="max-w-[1440px] mx-auto px-grid-margin py-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4">

        <p className="font-body-md text-body-md text-on-surface-variant">
          © 2026 {empresa.nombre}. Todos los derechos reservados.
        </p>

        <div className="flex gap-6">
          <button
            className="flex items-center gap-2 text-primary font-bold"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Volver arriba
            <span className="material-symbols-outlined">
              arrow_upward
            </span>
          </button>
        </div>

      </div>
    </footer>
  );
}
