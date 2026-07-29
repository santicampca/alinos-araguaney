import React from "react";
import { motion } from "framer-motion";

export default function QuantitySelector({ quantity, onChange, min = 1, max = 20, size = "md" }) {
  const isSmall = size === "sm";
  const btnSize = isSmall ? "w-7 h-7" : "w-9 h-9";
  const textSize = isSmall ? "text-sm" : "text-base";

  return (
    <div className="flex items-center border border-outline-variant rounded-full overflow-hidden bg-white">
      <motion.button
        whileTap={{ scale: 0.85 }}
        type="button"
        disabled={quantity <= min}
        onClick={() => onChange(Math.max(min, quantity - 1))}
        className={`${btnSize} flex items-center justify-center text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface-container-low transition-colors`}
        aria-label="Disminuir cantidad"
      >
        <span className="material-symbols-outlined" style={{ fontSize: isSmall ? "16px" : "18px" }}>
          remove
        </span>
      </motion.button>
      <span className={`px-2 font-label-lg ${textSize} min-w-[1.5rem] text-center select-none`}>
        {quantity}
      </span>
      <motion.button
        whileTap={{ scale: 0.85 }}
        type="button"
        disabled={quantity >= max}
        onClick={() => onChange(Math.min(max, quantity + 1))}
        className={`${btnSize} flex items-center justify-center text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface-container-low transition-colors`}
        aria-label="Aumentar cantidad"
      >
        <span className="material-symbols-outlined" style={{ fontSize: isSmall ? "16px" : "18px" }}>
          add
        </span>
      </motion.button>
    </div>
  );
}
