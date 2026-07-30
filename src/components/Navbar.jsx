import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const NAV_LINKS = [
  { label: "Shop", to: "/#shop" },
  { label: "Personaliza", to: "/personalizar" },
  { label: "Our Story", to: "/#historia" },
  { label: "Recipes", to: "/#recetas" },
];

export default function Navbar() {
  const { itemCount, toggleCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-9 w-full z-50 bg-white/80 dark:bg-surface/80 backdrop-blur-md shadow-sm">
      <div className="flex justify-between items-center px-grid-margin py-4 max-w-[1440px] mx-auto w-full">
        <Link to="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <img src="/assets/logo.png" alt="Aliños Araguaney" className="w-9 h-9 rounded-full object-cover" />
          <span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">
            Aliños Araguaney
          </span>
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            className="relative p-2 rounded-full hover:bg-surface-container-low transition-colors duration-300"
            onClick={toggleCart}
            aria-label="Abrir carrito"
          >
            <span className="material-symbols-outlined text-primary">shopping_cart</span>
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="absolute -top-1 -right-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            className="p-2 rounded-full hover:bg-surface-container-low transition-colors duration-300"
            aria-label="Cuenta"
          >
            <span className="material-symbols-outlined text-primary">person</span>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.92 }}
            className="md:hidden p-2 rounded-full hover:bg-surface-container-low transition-colors duration-300"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
          >
            <span className="material-symbols-outlined text-primary">{mobileOpen ? "close" : "menu"}</span>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden border-t border-outline-variant bg-white/95 backdrop-blur-md"
          >
            <div className="flex flex-col px-grid-margin py-4 gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary py-3 border-b border-outline-variant last:border-b-0 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
