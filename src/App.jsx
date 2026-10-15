// ============================================================
// APP.JSX — The Root Component (Day 2)
// ============================================================
// This is the MAIN file of your React application.
// It acts as the "layout manager" — it imports all section
// components and arranges them on the page.
//
// WHAT YOU WILL LEARN:
// - How to import components from other files
// - How to use export default to share a component
// - How to compose a page from smaller components
// - How JSX lets you use custom components like HTML tags
//
// ============================================================

// STEP 1: Import your section components
// Each component lives in its own file inside ./components/
// Use this syntax:  import ComponentName from "./components/ComponentName";
//
// Import the following components (in this order):
// - RibbonTicker
// - NavBar
// - HeroSection
// - CtaSection
// - FeaturesSection
// - ProductShowcase
// - FooterSection
// - AboutSection
// - ContactSection

/* --- YOUR IMPORTS GO HERE --- */
import { useMemo, useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import RibbonTicker from "./components/RibbonTicker";
import FeaturesSection from "./components/FeaturesSection";
import ProductShowcase from "./components/ProductShowcase";
import CtaSection from "./components/CtaSection";

import imgEthiopianHarrar from "./assets/Ethiopian-Harrar-Bag.png";

import imgColombianSupremo from "./assets/Colombian-Supremo-Bag.png";

import imgKenyaAA from "./assets/Kenya-AA-Bag.png";

import imgPanamaGeisha from "./assets/Panama-Geisha.png";

import imgKona from "./assets/Kona-Bag.png";

import imgGuatemalaAntigua from "./assets/Guatemala-Antigua-Bag.png";
// STEP 2: Create and export the App component
// Use: export default function App() { ... }
//
// STEP 3: Inside the return(), build the page layout
// Wrap everything in a <div className="app">
//
// Place your components in this order:
//   1. <NavBar />
//   2. Hero section wrapped in: <section className="hero bg-hero">
//        Inside that, wrap <HeroSection /> in: <div className="hero-grid">
//   3. <RibbonTicker />
//   4. Features section wrapped in: <section className="features bg-features" id="shop">
//   5. Product Showcase wrapped in: <section className="bg-cta">
//   6. <RibbonTicker /> (used again — components are reusable!)
//   7. CTA section wrapped in: <section className="bg-cta">
//   8. About section wrapped in: <section className="bg-cta" id="about">
//   9. Contact section wrapped in: <section className="bg-cta" id="contact">
//  10. Footer section wrapped in: <section className="bg-footer">
//
// HINT: The id attributes (like id="shop") are anchor targets
// for the navigation links in the NavBar.

const productCatalog = [
  {
    id: 1,
    name: "Ethiopian Harrar",
    origin: "Ethiopia",
    price: 18.99,
    roast: "Medium",
    notes: "Blueberry, dark chocolate, wine",
    image: imgEthiopianHarrar,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Colombian Supremo",
    origin: "Colombia",
    price: 16.99,
    roast: "Medium Dark",
    notes: "Caramel, nutty smooth finish",
    image: imgColombianSupremo,
    badge: null,
  },
  {
    id: 3,
    name: "Kenya AA",
    origin: "Kenya",
    price: 21.99,
    roast: "Light",
    notes: "Bright citrus, black currant, floral",
    image: imgKenyaAA,
    badge: "Staff Pick",
  },
  {
    id: 4,
    name: "Panama Geigha",
    origin: "Panama",
    price: 34.99,
    roast: "Light",
    notes: "Jasmine, bergamot, tropical fruit",
    image: imgPanamaGeigha,
    badge: "Limited",
  },
  {
    id: 5,
    name: "Kona",
    origin: "Hawaii",
    price: 29.99,
    roast: "Medium",
    notes: "Brown sugar, macadamia, mild acidity",
    image: imgKona,
    badge: null,
  },
  {
    id: 6,
    name: "Guatemala Antigua",
    origin: "Guatemala",
    price: 17.99,
    roast: "Dark",
    notes: "Cocoa, spice, smokey sweetness",
    image: imgGuatemalaAntigua,
    badge: "New",
  },
];
export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    const savedTheme = window.localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleCart = () => setCartOpen((open) => !open);

  const addToCart = (product) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...current, { ...product, qty: 1 }];
    });
  };

  const updateCartQty = (id, delta) => {
    setCartItems((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, qty: Math.max(0, item.qty + delta) }
            : item,
        )
        .filter((item) => item.qty > 0),
    );
  };
  const removeFromCart = (id) => {
    setCartItems((current) => current.filter((item) => item.id !== id));
  };
  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.qty, 0),
    [cartItems],
  );

  return (
    <div className="app">
      {/* NAVBAR */}
      <NavBar
        toggleCart={toggleCart}
        cartCount={cartCount}
        theme={theme}
        onToggleTheme={() =>
          setTheme((current) => (current === "light" ? "dark" : "light"))
        }
      />

      {/* Hero */}
      <section className="hero bg-hero">
        <div className="hero-grid">
          <HeroSection />
        </div>
      </section>

      {/* Ribbon Ticker */}
      <RibbonTicker />

      {/* Feature / Carousel */}
      <section className="features bg-features" id="shop">
        <FeaturesSection />
      </section>
      {/* Product Showcase */}
      <section className="bg-cta">
        <ProductShowcase products={productCatalog} addToCart={addToCart} />
      </section>

      {/* CTA */}
      <section className="bg-cta">
        <CtaSection />
      </section>

      {/* About */}
      <section className="bg-cta" id="about"></section>

      {/* Contact */}
      <section className="bg-cta" id="contact"></section>

      {/* Footer */}
      <section className="bg-footer"></section>
    </div>
  );
}
