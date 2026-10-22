// ============================================================
// RIBBONTICKER.JSX — Scrolling Text Banner (Day 6)
// ============================================================
// A continuously scrolling horizontal ribbon that displays
// coffee blend names. This is a common UI pattern for
// marquee/ticker effects.
//
// WHAT YOU WILL LEARN:
// - Declaring arrays of data
// - Spreading arrays to duplicate content: [...arr, ...arr]
// - Rendering lists with .map()
// - The key prop and why React needs it
// - CSS animations (the scroll is done in CSS, not JS)
// - Using framer-motion's whileHover for micro-interactions
//
// CONCEPTS COVERED:
// - Array declaration and manipulation
// - .map() with index parameter
// - Component reusability (used twice in App.jsx!)
//
// ============================================================

// STEP 2: Create and export the RibbonTicker component
// export default function RibbonTicker() { ... }
//
// STEP 3: Define the blends array (inside the component)
//   const blends = [
//     "Jamaican Blue Mountain", "Yirgacheffe", "Tanzania Peaberry",
//     "Panama Geisha", "Vietnamese Robusta", "Brazilian Santos",
//     "Costa Rica Tarrazu", "Guatemala Antigua", "Kenya AA",
//     "Sumatra Mandheling", "Kona", "Colombian Supremo",
//     "Ethiopian Harrar", "Arabian Mocha", "Red Sulawesi"
//   ];
//
export default function RibbonTicker() {
  const blends = [
    "Jamaican Blue Mountain",
    "Yiragacheffe",
    "Tanzaina Peaberry",
    "Vietnamese Santos",
    "Brazilian Santos",
    "Costa Rica Tarrazu",
    "Guatemala Antigua",
    "Kenya AA",
    "Sumatra Mandheling",
    "Kona",
    "Colombian Supremo",
    "Ethiopian Harrar",
    "Arabian Mocha",
    "Red Sulawesi",
  ];

  const renderBlendGroup = (key, isDuplicate = false) => (
    <div
      className="ribbon-group"
      key={key}
      aria-hidden={isDuplicate ? "true" : undefined}
    >
      {blends.map((name) => (
        <span className="ribbon-item" key={name}>
          <span className="ribbon-bean" aria-hidden="true">
            ✦
          </span>
          {name}
        </span>
      ))}
    </div>
  );

  return (
    <div
      className="ribbon-ticker-container"
    >
      <div
        className="ribbon-ticker"
        role="group"
        aria-label="Featured coffee origins"
      >
        <span className="ribbon-kicker">
          <span className="ribbon-kicker-dot" aria-hidden="true" />
          Freshly Roasted
        </span>
        <div className="ribbon-track">
          {renderBlendGroup("forward")}
          {renderBlendGroup("forward-copy", true)}
        </div>
      </div>
    </div>
  );
}
