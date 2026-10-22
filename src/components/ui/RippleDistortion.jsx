import { useEffect, useRef } from "react";

export default function RippleDistortion({ children, className = "" }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!container || !canvas || !context) {
      console.error("Unable to initialize the cart ripple canvas.");
      return;
    }

    let width = 0;
    let height = 0;
    let frameId = 0;
    let lastRippleAt = 0;
    let lastFrameAt = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const ripples = [];

    const resizeCanvas = () => {
      const bounds = container.getBoundingClientRect();
      const pixelRatio = window.devicePixelRatio || 1;
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const drawFrame = (now) => {
      if (now - lastFrameAt < 32 && !reduceMotion.matches) {
        frameId = window.requestAnimationFrame(drawFrame);
        return;
      }
      lastFrameAt = now;
      context.clearRect(0, 0, width, height);

      const flow = (x, y, radius) => {
        const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, "rgba(176, 115, 24, 0.34)");
        gradient.addColorStop(0.42, "rgba(130, 67, 28, 0.2)");
        gradient.addColorStop(1, "rgba(45, 25, 15, 0)");
        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);
      };

      const time = now / 1800;
      const flowRadius = Math.max(width, height) * 0.9;
      context.globalCompositeOperation = "screen";
      flow(
        width * (0.2 + 0.18 * Math.sin(time)),
        height * (0.5 + 0.32 * Math.cos(time * 0.8)),
        flowRadius,
      );
      flow(
        width * (0.78 + 0.15 * Math.cos(time * 0.7)),
        height * (0.45 + 0.35 * Math.sin(time)),
        flowRadius * 0.8,
      );
      context.globalCompositeOperation = "source-over";

      for (let index = ripples.length - 1; index >= 0; index -= 1) {
        const ripple = ripples[index];
        const progress = (now - ripple.startedAt) / 900;

        if (progress >= 1) {
          ripples.splice(index, 1);
          continue;
        }

        const radius = 8 + progress * Math.max(width, height) * 0.75;
        const opacity = (1 - progress) * 0.42;
        context.beginPath();
        context.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2);
        context.strokeStyle = `rgba(212, 146, 42, ${opacity})`;
        context.lineWidth = 1.5 * (1 - progress) + 0.25;
        context.stroke();
      }

      if (!reduceMotion.matches || ripples.length) {
        frameId = window.requestAnimationFrame(drawFrame);
      } else {
        frameId = 0;
      }
    };

    const addRipple = (event) => {
      const now = performance.now();
      if (event.type === "pointermove" && now - lastRippleAt < 110) return;

      const bounds = container.getBoundingClientRect();
      ripples.push({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
        startedAt: now,
      });
      lastRippleAt = now;

      if (!frameId) {
        frameId = window.requestAnimationFrame(drawFrame);
      }
    };

    resizeCanvas();
    frameId = window.requestAnimationFrame(drawFrame);
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(container);
    container.addEventListener("pointermove", addRipple);
    container.addEventListener("pointerdown", addRipple);

    return () => {
      resizeObserver.disconnect();
      container.removeEventListener("pointermove", addRipple);
      container.removeEventListener("pointerdown", addRipple);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`ripple-distortion ${className}`.trim()}
    >
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="ripple-distortion__content">{children}</div>
    </div>
  );
}
