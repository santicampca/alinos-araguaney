import { configuracion } from "../data/configuracion.js";
import { empresa } from "../data/empresa.js";

// Reglas de envío, leídas de los archivos de configuración (nada hardcodeado aquí):
// - configuracion.envioGratis: interruptor global. Si está en true, el envío
//   siempre es gratis sin importar el monto.
// - empresa.envios.gratis + empresa.envios.cantidadPromocion: envío gratis a
//   partir de cierto monto de compra (ej. gratis desde $5).
// - configuracion.costoEnvio: costo fijo de envío cuando no aplica ninguna
//   de las reglas de gratuidad anteriores.
export function calcularEnvio(subtotal) {
  if (configuracion.envioGratis) return 0;

  const reglaEnvio = empresa.envios ?? {};
  const minimoParaGratis = reglaEnvio.cantidadPromocion ?? null;

  if (reglaEnvio.gratis && minimoParaGratis != null && subtotal >= minimoParaGratis) {
    return 0;
  }

  return configuracion.costoEnvio ?? 0;
}

// Cuánto le falta al cliente para calificar a envío gratis (o null si no aplica
// ninguna promoción de envío gratis por monto, o si ya calificó).
export function faltanteParaEnvioGratis(subtotal) {
  if (configuracion.envioGratis) return null;

  const reglaEnvio = empresa.envios ?? {};
  const minimoParaGratis = reglaEnvio.cantidadPromocion ?? null;

  if (!reglaEnvio.gratis || minimoParaGratis == null) return null;

  const faltante = minimoParaGratis - subtotal;
  return faltante > 0 ? Math.round(faltante * 100) / 100 : 0;
}
