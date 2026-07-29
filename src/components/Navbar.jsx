import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../context/CartContext.jsx";

export default function Navbar() {
  const { itemCount, toggleCart } = useCart();

  return (
    <nav className="fixed top-9 w-full z-50 bg-white/80 dark:bg-surface/80 backdrop-blur-md shadow-sm">
      <div className="flex justify-between items-center px-grid-margin py-4 max-w-[1440px] mx-auto w-full">
        <div className="flex items-center gap-3">
          <img src="/assets/logo.png" alt="Aliños Araguaney" className="w-9 h-9 rounded-full object-cover" />
          <span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">
            Aliños Araguaney
          </span>
        </div>
        <div className="hidden md:flex gap-8 items-center">
          <a className="font-label-lg text-label-lg text-primary border-b-2 border-primary pb-1" href="#shop">
            Shop
          </a>
          <a className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors" href="#personalizacion">
            B2B Portal
          </a>
          <a className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors" href="#historia">
            Our Story
          </a>
          <a className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors" href="#recetas">
            Recipes
          </a>
        </div>
        <div className="flex items-center gap-4">
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
        </div>
      </div>
    </nav>
  );
}
