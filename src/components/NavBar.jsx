// ============================================================
// NAVBAR.JSX — Sticky Navigation Bar (Day 4)
// ============================================================
// The NavBar stays at the top of the page as the user scrolls.
// It includes a logo, navigation links, a CTA button, and a
// mobile hamburger menu with animation.
//
// WHAT YOU WILL LEARN:
// - useState for toggling the mobile menu (true/false)
// - useState for tracking scroll position
// - useEffect for adding/removing event listeners
// - Conditional CSS classes based on state
// - Framer Motion's AnimatePresence for enter/exit animations
// - Accessibility: aria-label and aria-expanded attributes
//
// CONCEPTS COVERED:
// - React Hooks: useState, useEffect
// - Side effects and cleanup (return () => ...)
// - Ternary operator for conditional rendering
// - Template literals for dynamic className strings
// - Helper functions (closeMenu)
//
// ============================================================

// STEP 1: Imports
// From "react": import { useState, useEffect }
// From "framer-motion": import { motion, AnimatePresence }
// Import the logo: import logo from "../assets/Beans_logo.png";
// Import the Button UI component from "./ui/Button"

/* --- YOUR IMPORTS GO HERE --- */
import { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import logo from "../assets/Beans_logo.png";
import Button from "./ui/Button";

// STEP 2: Create and export the NavBar component
// export default function NavBar() { ... }
//
// STEP 3: State variables (inside the component, before return)
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//
//   DISCUSSION: What does useState(false) mean?
//   - false is the initial value
//   - menuOpen is the current value (true or false)
//   - setMenuOpen is the function to change it
//
// STEP 4: Helper function
//   const closeMenu = () => setMenuOpen(false);
//
// STEP 5: useEffect for scroll detection
//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);
//
//   DISCUSSION: Why do we return a cleanup function?
//   Answer: To remove the event listener when the component unmounts,
//   preventing memory leaks.
//
// STEP 6: Build the JSX (inside return)
//
// Use <motion.header> as the root element:
//   - className: "navbar" + conditionally add "navbar-scrolled" when scrolled is true
//   - Add initial/animate/transition props for entrance animation
//
// Inside the header, create a flex container div:
//   A) BRAND: <a href="#home"> with the logo <img>
//
//   B) DESKTOP NAV: <nav> with className="nav-links hidden items-center gap-10 md:flex"
//      Links: Home (#home), Shop Coffee (#shop), Our Story (#about), Contact (#contact)
//
//   C) DESKTOP CTA: <Button> with "Order Now" text (hidden on mobile: hidden md:inline-flex)
//
//   D) MOBILE HAMBURGER: A <button> visible only on mobile (md:hidden)
//      - Three <span> elements that form the hamburger icon
//      - When menuOpen is true, they transform into an X using CSS transforms
//      - onClick toggles menuOpen
//
// After the flex container, add the MOBILE MENU:
//   Wrap in <AnimatePresence> for smooth enter/exit
//   Conditionally render (menuOpen &&) a <motion.div>
//   Inside: nav links + Button, each calling closeMenu onClick

/* --- YOUR COMPONENT CODE GOES HERE --- */
export default function NavBar({
  toggleCart,
  theme,
  onToggleTheme,
  currentPath = "/",
  onNavigate,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  // container = menuOpen, function to update the container = setMenuOpen, current value = false.
  const [scrolled, setScrolled] = useState(false);
  // container = scrolled, function to update the container = setScrolled, current value = false.
  const closeMenu = () => setMenuOpen(false);
  const handleRouteClick = (path) => (event) => {
    event.preventDefault();
    closeMenu();
    onNavigate?.(path);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // [] means this effect runs once on mount and cleans up on unmount

  return (
    <Motion.header
      className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* motion.header is a root element which is a third-party component from framer-motion*/}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3  md:px-8">
        {/* Brand */}
        <a
          href="/"
          className="brand"
          onClick={handleRouteClick("/")}
          aria-label="The Beans Place home"
        >
          <img
            src={logo}
            alt="Beans Place Logo"
            className="logo h-12 w-auto md:h-14"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="nav-links hidden items-center gap-10 md:flex">
          <a
            href="/"
            onClick={handleRouteClick("/")}
            aria-current={currentPath === "/" ? "page" : undefined}
          >
            Home
          </a>
          <a
            href="/shop"
            onClick={handleRouteClick("/shop")}
            aria-current={currentPath === "/shop" ? "page" : undefined}
          >
            Shop Coffee
          </a>
          <a
            href="/story"
            onClick={handleRouteClick("/story")}
            aria-current={currentPath === "/story" ? "page" : undefined}
          >
            Our Story
          </a>
          <a
            href="/contact"
            onClick={handleRouteClick("/contact")}
            aria-current={currentPath === "/contact" ? "page" : undefined}
          >
            Contact
          </a>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            onClick={onToggleTheme}
            className="theme-toggle-btn"
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
          <Button variant="accent" size="sm" onClick={toggleCart}>
            Order Now
          </Button>
        </div>
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open Menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`block h-0.5 w-6 bg-black transition-all duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />

          <span
            className={`block h-0.5 w-6 bg-black transition-all duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`}
          />

          <span
            className={`block h-0.5 w-6 bg-black transition-all duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {menuOpen && (
          <Motion.div
            className="overflow-hidden md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <nav className="flex flex-col gap-4 px-6 pb-6 pt-2">
              <a
                href="/"
                onClick={handleRouteClick("/")}
                className="text-base font-semibold"
              >
                Home
              </a>
              <a
                href="/shop"
                onClick={handleRouteClick("/shop")}
                className="text-base font-semibold"
              >
                Shop Coffee
              </a>
              <a
                href="/story"
                onClick={handleRouteClick("/story")}
                className="text-base font-semibold"
              >
                Our Story
              </a>
              <a
                href="/contact"
                onClick={handleRouteClick("/contact")}
                className="text-base font-semibold"
              >
                Contact
              </a>
              <button
                type="button"
                aria-label={
                  theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
                onClick={onToggleTheme}
                className="theme-toggle-btn w-full justify-center"
              >
                {theme === "dark" ? "Switch to light" : "Switch to dark"}
              </button>

              <Button
                variant="accent"
                size="sm"
                className="mt-2 w-full"
                onClick={() => {
                  toggleCart();
                  closeMenu();
                }}
              >
                Order Now
              </Button>
            </nav>
          </Motion.div>
        )}
      </AnimatePresence>
    </Motion.header>
  );
}
