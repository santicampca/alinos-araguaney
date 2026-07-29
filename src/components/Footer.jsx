import React from "react";

export default function Footer() {
  return (
    <footer id="historia" className="bg-surface-container-low dark:bg-surface-container-highest border-t border-outline-variant">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-grid-gutter px-grid-margin py-section-gap-mobile md:py-section-gap-desktop max-w-[1440px] mx-auto">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <img src="/assets/logo.png" alt="Aliños Araguaney" className="w-9 h-9 rounded-full object-cover" />
            <span className="font-headline-md text-headline-md text-primary">Aliños Araguaney</span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Llevando el sabor auténtico de la tierra directamente a tu mesa, sin complicaciones.
          </p>
        </div>
        <div className="space-y-4">
          <h4 className="font-label-lg text-label-lg text-primary uppercase">Empresa</h4>
          <div className="flex flex-col gap-2">
            <a className="font-body-md text-body-md text-on-surface-variant hover:underline decoration-secondary" href="#">
              Privacy Policy
            </a>
            <a className="font-body-md text-body-md text-on-surface-variant hover:underline decoration-secondary" href="#">
              Terms of Service
            </a>
            <a className="font-body-md text-body-md text-on-surface-variant hover:underline decoration-secondary" href="#">
              Shipping Policy
            </a>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="font-label-lg text-label-lg text-primary uppercase">Explorar</h4>
          <div className="flex flex-col gap-2">
            <a className="font-body-md text-body-md text-on-surface-variant hover:underline decoration-secondary" href="#">
              B2B Catalog PDF
            </a>
            <a className="font-body-md text-body-md text-on-surface-variant hover:underline decoration-secondary" href="#">
              Recipes
            </a>
            <a className="font-body-md text-body-md text-on-surface-variant hover:underline decoration-secondary" href="#">
              Instagram
            </a>
          </div>
        </div>
        <div className="space-y-6">
          <h4 className="font-label-lg text-label-lg text-primary uppercase">Newsletter</h4>
          <p className="text-sm text-on-surface-variant">Recibe recetas y ofertas exclusivas.</p>
          <div className="flex gap-2">
            <input
              className="flex-1 bg-white border border-outline-variant rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="Tu email"
              type="email"
            />
            <button className="bg-primary text-white p-2 rounded-xl">
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto px-grid-margin py-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-body-md text-body-md text-on-surface-variant">© 2026 Aliños Araguaney. Freshness Guaranteed.</p>
        <div className="flex gap-6">
          <button
            className="flex items-center gap-2 text-primary font-bold"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Volver arriba <span className="material-symbols-outlined">arrow_upward</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
