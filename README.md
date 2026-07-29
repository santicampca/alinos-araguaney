# Aliños Araguaney — Web (MVP e-commerce)

Sitio web de Aliños Araguaney construido sobre el diseño original (Google Stitch),
con carrito de compras, persistencia local y checkout vía WhatsApp.

## Stack

- React 18 + Vite
- Tailwind CSS (mismos tokens de color/tipografía del diseño original)
- Framer Motion (animaciones)
- Sin backend ni pasarela de pago — el pedido se envía por WhatsApp

## Funcionalidades incluidas (MVP)

1. Carrito lateral (drawer) desde la derecha: imagen, nombre, peso, cantidad,
   precio, subtotal, total, eliminar, "seguir comprando" y "finalizar pedido".
2. Persistencia del carrito en `localStorage`.
3. Selector de cantidad (+/-) y de peso (250g / 500g / 1kg) en cada producto.
4. Toast elegante al agregar un producto.
5. Barra superior: "🌿 Aliños frescos preparados diariamente".
6. Badges: Más vendido / Nuevo / Oferta.
7. Animaciones con Framer Motion en botones, tarjetas y apertura del carrito.
8. Botón "Finalizar pedido" que abre WhatsApp con el pedido completo
   (producto, cantidad, peso y total), sin integrar pagos.

## Instalación local

```bash
npm install
cp .env.example .env
# Edita .env y coloca tu número de WhatsApp real (VITE_WHATSAPP_NUMBER)
npm run dev
```

Abre `http://localhost:5173`.

## Build de producción

```bash
npm run build
npm run preview
```

## Configurar el número de WhatsApp

Antes de publicar, edita `.env` (o las variables de entorno en Vercel) con tu número real:

```
VITE_WHATSAPP_NUMBER=584121234567
```

Formato: código de país + número, sin "+", espacios ni guiones.

## Despliegue en Vercel

1. Sube este proyecto a un repositorio de GitHub.
2. En Vercel: **Add New Project** → importa el repositorio.
3. Framework detectado: **Vite** (Vercel lo detecta automáticamente gracias a `vercel.json`).
4. En **Environment Variables**, agrega `VITE_WHATSAPP_NUMBER` con tu número real.
5. Deploy 🚀.

## Estructura del proyecto

```
src/
  components/     -> Navbar, Hero, ProductCard, CartDrawer, etc.
  context/        -> CartContext (estado + localStorage), ToastContext
  data/           -> catálogo de productos y lógica de precios por peso
  utils/          -> generación del mensaje/link de WhatsApp
public/assets/    -> logo e imágenes de producto optimizadas
```

## Notas para la siguiente iteración (no incluido en este MVP)

- Pasarela de pago real (Stripe / pago móvil / transferencia).
- Panel de administración de productos e inventario.
- Página de detalle de producto y buscador.
- Autenticación de usuarios.
