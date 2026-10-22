import { useEffect, useRef, useState } from "react";
import imgRedSulawesi from "../assets/Red-Sulawesi-Bag.png";
import imgUrigacheffe from "../assets/Urigacheffe-Bag.png";
import imgTanzaniaPeaberry from "../assets/Tanzania-Peaberry-Bag.png";
import imgVietnameserobusta from "../assets/Vietnamese-Robusta.png";
import imgKenyaAA from "../assets/Kenya-AA-Bag.png";
import imgGuatemalaAntigua from "../assets/Guatemala-Antigua-Bag.png";
import imgPanamaGeisha from "../assets/Panama-Geisha.png";
import imgKona from "../assets/Kona-Bag.png";
import imgEthiopianHarrar from "../assets/Ethiopian-Harrar-Bag.png";
import imgCostaRicaTarrazu from "../assets/Costa-Rica-Tarrazu-Bag.png";
import imgJamaicanBlueMountain from "../assets/Jamaican-Blue-Mountain-Bag.png";
import imgSumatraMandheling from "../assets/Sumatra-Mandheling-Bag.png";
import imgBrazilianSantos from "../assets/Brazilian-Santos-Bag.png";
import imgArabianMocha from "../assets/Arabian-Mocha-Bag.png";
import imgColombianSupremo from "../assets/Colombian-Supremo-Bag.png";

const coffees = [
  { name: "Jamaican Blue Mountain", image: imgJamaicanBlueMountain },
  { name: "Ethiopian Harrar", image: imgEthiopianHarrar },
  { name: "Guatemala Antigua", image: imgGuatemalaAntigua },
  { name: "Tanzania Peaberry", image: imgTanzaniaPeaberry },
  { name: "Colombian Supremo", image: imgColombianSupremo },
  { name: "Vietnamese Robusta", image: imgVietnameserobusta },
  { name: "Kona", image: imgKona },
  { name: "Arabian Mocha", image: imgArabianMocha },
  { name: "Kenya AA", image: imgKenyaAA },
  { name: "Urigacheffe", image: imgUrigacheffe },
  { name: "Sumatra Mandheling", image: imgSumatraMandheling },
  { name: "Panama Geisha", image: imgPanamaGeisha },
  { name: "Red Sulawesi", image: imgRedSulawesi },
  { name: "Costa Rica Tarrazu", image: imgCostaRicaTarrazu },
  { name: "Brazilian Santos", image: imgBrazilianSantos },
];

function ReelDigit({ value }) {
  return (
    <span className="circular-carousel__digit" aria-hidden="true">
      <span
        className="circular-carousel__reel"
        style={{ transform: `translateY(-${value}em)` }}
      >
        {Array.from({ length: 10 }, (_, digit) => (
          <span key={digit}>{digit}</span>
        ))}
      </span>
    </span>
  );
}

export default function FeaturesSection() {
  const carouselRef = useRef(null);
  const dragRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window === "undefined" ? 1200 : window.innerWidth,
  );

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardWidth = Math.min(220, Math.max(150, viewportWidth * 0.2));
  const cardHeight = cardWidth * 1.45;
  const angle = 360 / coffees.length;
  const radius = cardWidth / (2 * Math.tan(Math.PI / coffees.length));

  const showPrevious = () =>
    setActiveIndex((current) => (current - 1 + coffees.length) % coffees.length);
  const showNext = () =>
    setActiveIndex((current) => (current + 1) % coffees.length);

  const handlePointerDown = (event) => {
    if (event.target instanceof HTMLElement && event.target.closest("button")) {
      return;
    }
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const handlePointerUp = (event) => {
    if (!dragRef.current || dragRef.current.pointerId !== event.pointerId) return;

    const distance = event.clientX - dragRef.current.startX;
    dragRef.current = null;
    setIsDragging(false);

    if (Math.abs(distance) > 30) {
      const steps = Math.max(
        1,
        Math.round(Math.abs(distance) / (cardWidth * 0.6)),
      );
      setActiveIndex((current) =>
        (current + (distance < 0 ? steps : -steps) + coffees.length * steps) %
        coffees.length,
      );
    }
  };

  const handlePointerCancel = () => {
    dragRef.current = null;
    setIsDragging(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(coffees.length - 1);
    }
  };

  const activeCoffee = coffees[activeIndex];
  const currentCount = String(activeIndex + 1);

  return (
    <div
      ref={carouselRef}
      className="circular-carousel"
      data-axis="y"
      data-shape="panorama"
      data-ready
      data-draggable
      data-dragging={isDragging ? "" : undefined}
      role="region"
      aria-label="Coffee collection"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onLostPointerCapture={handlePointerCancel}
    >
      <div className="circular-carousel__view">
        <div className="circular-carousel__stage">
          <div
            className="circular-carousel__camera"
            style={{ perspective: `${Math.max(900, radius * 2.2)}px` }}
          >
            <div
              className="circular-carousel__ring"
              style={{
                transform: `translateZ(-${radius}px) rotateY(${
                  -activeIndex * angle
                }deg)`,
              }}
            >
              {coffees.map((coffee, index) => {
                const relativeAngle = (((index - activeIndex) * angle) % 360);
                const depth = (1 - Math.cos((relativeAngle * Math.PI) / 180)) / 2;

                return (
                  <div
                    className="circular-carousel__card"
                    key={coffee.name}
                    style={{
                      transform: `rotateY(${index * angle}deg) translateZ(${radius}px)`,
                    }}
                    aria-hidden={index !== activeIndex}
                    aria-roledescription="slide"
                    aria-label={`${index + 1} of ${coffees.length}: ${coffee.name}`}
                  >
                    <div
                      className="circular-carousel__tile"
                      style={{
                        width: `${cardWidth}px`,
                        height: `${cardHeight}px`,
                        marginLeft: `${-cardWidth / 2}px`,
                        marginTop: `${-cardHeight / 2}px`,
                        borderRadius: "var(--cc-radius)",
                        "--cc-depth": depth * 0.72,
                      }}
                    >
                      <div
                        className="circular-carousel__frame"
                        style={{ height: `${cardHeight}px` }}
                      >
                        <img
                          className="circular-carousel__photo"
                          src={coffee.image}
                          alt=""
                          style={{ width: `${cardWidth}px`, height: `${cardHeight}px` }}
                          draggable="false"
                          loading={Math.abs(index - activeIndex) < 3 ? "eager" : "lazy"}
                        />
                      </div>
                      <div className="circular-carousel__shade" />
                      <div className="circular-carousel__inner" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="circular-carousel__controls">
          <button
            className="circular-carousel__control"
            type="button"
            onClick={showPrevious}
            aria-label="Show previous coffee"
          >
            <span aria-hidden="true">&lsaquo;</span>
          </button>
          <button
            className="circular-carousel__control"
            type="button"
            onClick={showNext}
            aria-label="Show next coffee"
          >
            <span aria-hidden="true">&rsaquo;</span>
          </button>
        </div>

        <div className="circular-carousel__caption" aria-hidden="true">
          <span className="circular-carousel__title">
            {activeCoffee.name}
          </span>
          <span className="circular-carousel__count">
            <span className="circular-carousel__digits">
              {Array.from(currentCount, (digit, index) => (
                <ReelDigit key={`${index}-${currentCount.length}`} value={Number(digit)} />
              ))}
            </span>
            <span className="circular-carousel__slash">/</span>
            {coffees.length}
          </span>
        </div>
      </div>
      <span className="circular-carousel__live" aria-live="polite" aria-atomic="true">
        {activeCoffee.name}, {activeIndex + 1} of {coffees.length}
      </span>
    </div>
  );
}
