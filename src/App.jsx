import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Personalizar from "./pages/Personalizar.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import Producto from "./pages/Producto.jsx";
import TopBar from "./components/TopBar.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import BestSellers from "./components/BestSellers.jsx";
import Personalization from "./components/Personalization.jsx";
import Combos from "./components/Combos.jsx";
import Subscription from "./components/Subscription.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Footer from "./components/Footer.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import UpsellModal from "./components/UpsellModal.jsx";

function Home() {
  const location = useLocation();

  // Permite que enlaces tipo "/#shop" funcionen aunque se navegue
  // desde otra ruta (ej. /personalizar), haciendo scroll suave
  // hacia la sección correspondiente una vez que el Home está montado.
  useEffect(() => {
    if (!location.hash) return;
    const target = document.querySelector(location.hash);
    if (target) {
      const id = requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return () => cancelAnimationFrame(id);
    }
  }, [location]);

  return (
    <>
      <Hero />
      <BestSellers />
      <Personalization />
      <Combos />
      <Subscription />
      <Testimonials />
    </>
  );
}

export default function App() {
  return (
    <div className="bg-background text-on-surface min-h-screen">
      <TopBar />
      <Navbar />
      <CartDrawer />
      <UpsellModal />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/producto/:id" element={<Producto />} />
          <Route path="/personalizar" element={<Personalizar />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
