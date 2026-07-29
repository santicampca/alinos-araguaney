import React from "react";
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

export default function App() {
  return (
    <div className="bg-background text-on-surface min-h-screen">
      <TopBar />
      <Navbar />
      <CartDrawer />
      <main>
        <Hero />
        <BestSellers />
        <Personalization />
        <Combos />
        <Subscription />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
