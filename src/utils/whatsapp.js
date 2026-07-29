// Número de WhatsApp del negocio.
// Configúralo en un archivo .env (ver .env.example) con:
// VITE_WHATSAPP_NUMBER=584121234567
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "584120000000";

export function buildWhatsAppOrderUrl(items, total) {
  const lines = [];
  lines.push("🛒 *Nuevo Pedido - Aliños Araguaney*");
  lines.push("");

  items.forEach((item) => {
    const lineTotal = (item.unitPrice * item.quantity).toFixed(2);
    lines.push(`• ${item.quantity} x ${item.name} (${item.weight}) — $${lineTotal}`);
  });

  lines.push("");
  lines.push(`*Total del pedido: $${total.toFixed(2)}*`);
  lines.push("");
  lines.push("Quisiera confirmar este pedido, ¡gracias! 🌿");

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
