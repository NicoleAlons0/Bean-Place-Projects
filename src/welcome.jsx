import { useState } from "react";
import coffeeBackground from "./assets/store_barista.jpeg";
import "./welcome.css";

export default function WelcomeIntro() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <section
      id="coffee-intro"
      className={isVisible ? "" : "intro-hidden"}
      style={{ "--coffee-intro-background": `url("${coffeeBackground}")` }}
      role="dialog"
      aria-modal={isVisible}
      aria-labelledby="coffee-intro-title"
      aria-hidden={!isVisible}
    >
      <div className="intro-content">
        <div className="coffee-icon" aria-hidden="true">
          ☕
        </div>

        <p className="welcome-label">WELCOME TO</p>

        <h1 id="coffee-intro-title">The Bean&apos;s Place</h1>

        <p className="tagline">GREAT COFFEE · GOOD VIBES · BETTER DAYS</p>

        <button
          id="enter-site"
          type="button"
          onClick={() => setIsVisible(false)}
        >
          CLICK TO GET STARTED <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}
