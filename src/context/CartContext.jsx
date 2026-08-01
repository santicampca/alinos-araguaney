import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { getProductThumbnail } from "../data/products.js";

const STORAGE_KEY = "araguaney_cart_v1";
const CartContext = createContext(null);

function loadInitialState() {
  if (typeof window === "undefined") {
    return { items: [], isOpen: false };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [], isOpen: false };
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return { items: [], isOpen: false };
    return { items: parsed, isOpen: false };
  } catch (err) {
    console.warn("No se pudo leer el carrito guardado:", err);
    return { items: [], isOpen: false };
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, weight, quantity, unitPrice } = action.payload;
      const cartItemId = `${product.id}-${weight}`;
      const existing = state.items.find((i) => i.cartItemId === cartItemId);

      let items;
      if (existing) {
        items = state.items.map((i) =>
          i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        items = [
          ...state.items,
          {
            cartItemId,
            productId: product.id,
            name: product.name,
            image: getProductThumbnail(product),
            weight,
            quantity,
            unitPrice,
          },
        ];
      }
      return { ...state, items };
    }
    case "REMOVE_ITEM": {
      return { ...state, items: state.items.filter((i) => i.cartItemId !== action.payload) };
    }
    case "UPDATE_QUANTITY": {
      const { cartItemId, quantity } = action.payload;
      if (quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.cartItemId !== cartItemId) };
      }
      return {
        ...state,
        items: state.items.map((i) => (i.cartItemId === cartItemId ? { ...i, quantity } : i)),
      };
    }
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "OPEN_CART":
      return { ...state, isOpen: true };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitialState);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch (err) {
      console.warn("No se pudo guardar el carrito:", err);
    }
  }, [state.items]);

  const subtotal = useMemo(
    () => state.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
    [state.items]
  );

  const itemCount = useMemo(
    () => state.items.reduce((sum, i) => sum + i.quantity, 0),
    [state.items]
  );

  const value = useMemo(
    () => ({
      items: state.items,
      isOpen: state.isOpen,
      subtotal,
      total: subtotal, // el envío/impuestos se coordinan por WhatsApp
      itemCount,
      addItem: (product, weight, quantity, unitPrice) =>
        dispatch({ type: "ADD_ITEM", payload: { product, weight, quantity, unitPrice } }),
      removeItem: (cartItemId) => dispatch({ type: "REMOVE_ITEM", payload: cartItemId }),
      updateQuantity: (cartItemId, quantity) =>
        dispatch({ type: "UPDATE_QUANTITY", payload: { cartItemId, quantity } }),
      clearCart: () => dispatch({ type: "CLEAR_CART" }),
      openCart: () => dispatch({ type: "OPEN_CART" }),
      closeCart: () => dispatch({ type: "CLOSE_CART" }),
      toggleCart: () => dispatch({ type: "TOGGLE_CART" }),
    }),
    [state.items, state.isOpen, subtotal, itemCount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de un CartProvider");
  return ctx;
}
