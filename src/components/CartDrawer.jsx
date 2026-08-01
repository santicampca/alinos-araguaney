import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../context/CartContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import QuantitySelector from "./QuantitySelector.jsx";
import { buildWhatsAppOrderUrl } from "../utils/whatsapp.js";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, clearCart, subtotal, shipping, total, freeShippingRemaining } =
    useCart();
  const { showToast } = useToast();

  const handleCheckout = () => {
    if (items.length === 0) {
      showToast("Tu carrito está vacío", { icon: "info" });
      return;
    }
    const url = buildWhatsAppOrderUrl({ items, subtotal, shipping, total });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleClearCart = () => {
    clearCart();
    showToast("Carrito vaciado", { icon: "delete_sweep" });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/40 z-[59]"
            onClick={closeCart}
          />
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 h-full w-full sm:w-[420px] z-[60] bg-surface shadow-2xl flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline-md text-headline-md text-primary">Tu Carrito</h2>
              <div className="flex items-center gap-4">
                {items.length > 0 && (
                  <button
                    onClick={handleClearCart}
                    className="text-xs text-on-surface-variant hover:text-error transition-colors underline"
                  >
                    Vaciar carrito
                  </button>
                )}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="material-symbols-outlined text-on-surface-variant"
                  onClick={closeCart}
                  aria-label="Cerrar carrito"
                >
                  close
                </motion.button>
              </div>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 text-on-surface-variant">
                <span className="material-symbols-outlined" style={{ fontSize: "48px" }}>
                  shopping_bag
                </span>
                <p className="font-body-md text-body-md">Aún no has agregado productos.</p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closeCart}
                  className="px-6 py-3 bg-primary text-on-primary rounded-xl font-label-lg text-label-lg"
                >
                  Seguir comprando
                </motion.button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto cart-scroll space-y-4 pr-1">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.cartItemId}
                        layout
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40, height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex gap-3 p-3 rounded-xl border border-outline-variant bg-white"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 rounded-lg object-cover shrink-0 bg-surface-container-low"
                        />
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <p className="font-label-lg text-label-lg truncate">{item.name}</p>
                            <p className="text-xs text-on-surface-variant">
                              {item.weight} · ${item.unitPrice.toFixed(2)} c/u
                            </p>
                          </div>
                          <div className="flex items-center justify-between gap-2 mt-2">
                            <QuantitySelector
                              size="sm"
                              quantity={item.quantity}
                              onChange={(q) => updateQuantity(item.cartItemId, q)}
                            />
                            <span className="font-label-lg text-label-lg text-primary">
                              ${(item.unitPrice * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={() => removeItem(item.cartItemId)}
                          className="material-symbols-outlined text-outline hover:text-error transition-colors self-start"
                          aria-label={`Eliminar ${item.name}`}
                          style={{ fontSize: "20px" }}
                        >
                          delete
                        </motion.button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="pt-4 border-t border-outline-variant space-y-2 mt-4">
                  {freeShippingRemaining !== null && freeShippingRemaining > 0 && (
                    <p className="text-xs text-secondary bg-secondary-container/40 text-on-secondary-container rounded-lg px-3 py-2 mb-2">
                      🚚 Te faltan ${freeShippingRemaining.toFixed(2)} para envío gratis
                    </p>
                  )}
                  <div className="flex justify-between text-sm text-on-surface-variant">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-on-surface-variant">
                    <span>Envío</span>
                    <span>{shipping > 0 ? `$${shipping.toFixed(2)}` : "Gratis"}</span>
                  </div>
                  <div className="flex justify-between font-label-lg text-label-lg text-primary pt-1 border-t border-outline-variant">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <div className="grid grid-cols-1 gap-3 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleCheckout}
                      className="w-full py-4 bg-primary text-on-primary font-label-lg text-label-lg rounded-xl shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                        chat
                      </span>
                      Finalizar pedido por WhatsApp
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={closeCart}
                      className="w-full py-3 bg-white border border-outline-variant text-on-surface font-label-lg text-label-lg rounded-xl hover:bg-surface-container-low transition-colors"
                    >
                      Seguir comprando
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
