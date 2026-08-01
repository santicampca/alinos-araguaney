// Número de WhatsApp del negocio.
// Configúralo en un archivo .env (ver .env.example) con:
// VITE_WHATSAPP_NUMBER=584121234567
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "584120000000";

// Arma el link de WhatsApp con el resumen completo del pedido: productos,
// subtotal, envío y total. Queda listo para integrarse: el día que haya un
// checkout con datos del cliente (nombre, dirección, etc.), solo hay que
// agregar esos campos al arreglo `lines` antes del cierre del mensaje.
export function buildWhatsAppOrderUrl({ items, subtotal, shipping = 0, total }) {
  const lines = [];
  lines.push("🛒 *Nuevo Pedido - Aliños Araguaney*");
  lines.push("");

  items.forEach((item) => {
    const lineTotal = (item.unitPrice * item.quantity).toFixed(2);
    lines.push(`• ${item.quantity} x ${item.name} (${item.weight}) — $${lineTotal}`);
  });

  lines.push("");
  lines.push(`Subtotal: $${subtotal.toFixed(2)}`);
  lines.push(shipping > 0 ? `Envío: $${shipping.toFixed(2)}` : "Envío: Gratis");
  lines.push(`*Total del pedido: $${total.toFixed(2)}*`);
  lines.push("");
  lines.push("Quisiera confirmar este pedido, ¡gracias! 🌿");

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
