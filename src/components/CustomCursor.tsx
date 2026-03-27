import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Main cursor follows immediately
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mouseX - 16}px, ${mouseY - 16}px)`;
      }
    };

    const animateDot = () => {
      // Trailing dot lags behind with lerp
      dotX += (mouseX - dotX) * 0.12;
      dotY += (mouseY - dotY) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
      }

      requestAnimationFrame(animateDot);
    };

    window.addEventListener("mousemove", onMouseMove);
    const raf = requestAnimationFrame(animateDot);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-8 h-8 rounded-full border-2 border-blue-500 transition-[width,height,border-color] duration-150 mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      {/* Trailing dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full bg-blue-500 mix-blend-difference"
        style={{ willChange: "transform" }}
      />
    </>
  );
}