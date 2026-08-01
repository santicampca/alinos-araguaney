import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProductBadge from "./ProductBadge.jsx";
import QuantitySelector from "./QuantitySelector.jsx";
import WeightSelector from "./WeightSelector.jsx";
import { priceForWeight, compareAtPriceForWeight, getProductThumbnail } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";
import { useToast } from "../context/ToastContext.jsx";

export default function ProductCard({ product }) {
  const [weight, setWeight] = useState(product.defaultWeight);
  const [quantity, setQuantity] = useState(1);
  const { addItem, openCart } = useCart();
  const { showToast } = useToast();

  const price = priceForWeight(product, weight);
  const compareAtPrice = compareAtPriceForWeight(product, weight);
  const detailUrl = `/producto/${product.id}`;

  const handleAddToCart = () => {
    addItem(product, weight, quantity, price);
    showToast(`${product.name} agregado al carrito`, { icon: "shopping_bag" });
    setQuantity(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="product-card group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 flex flex-col"
    >
      {/* className="contents" hace que el <Link> no agregue ninguna caja al layout:
          se comporta visualmente como si no existiera, así el click navega
          al detalle sin alterar el diseño ni el grid de la tarjeta. */}
      <Link to={detailUrl} className="contents" aria-label={`Ver detalle de ${product.name}`}>
        <div className="relative aspect-square overflow-hidden bg-[#F5F5F7] cursor-pointer">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            src={getProductThumbnail(product)}
            alt={product.name}
          />
          <ProductBadge type={product.badge} />
          {product.stockLabel && (
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-green-700 font-label-md text-label-md flex items-center gap-1 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500"></span> {product.stockLabel}
            </div>
          )}
        </div>
      </Link>
      <div className="p-6 space-y-4 flex-1 flex flex-col">
        <Link to={detailUrl} className="contents" aria-label={`Ver detalle de ${product.name}`}>
          <div className="space-y-2 cursor-pointer">
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-headline-md text-headline-md text-primary">{product.name}</h3>
              <div className="text-right shrink-0">
                <span className="font-label-lg text-label-lg block">${price.toFixed(2)}</span>
                {compareAtPrice && (
                  <span className="text-xs line-through text-outline">${compareAtPrice.toFixed(2)}</span>
                )}
              </div>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">{product.description}</p>
          </div>
        </Link>

        <div className="space-y-3 pt-2 mt-auto">
          <WeightSelector selected={weight} onChange={setWeight} />
          <div className="flex items-center justify-between gap-3">
            <QuantitySelector quantity={quantity} onChange={setQuantity} />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-on-primary rounded-xl font-label-lg text-label-lg shadow-sm hover:shadow-lg transition-shadow"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                add_shopping_cart
              </span>
              Agregar
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
