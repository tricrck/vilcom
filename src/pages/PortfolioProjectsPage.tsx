/**
 * PortfolioProjectsPage.tsx
 * Matches https://vilcom.co.ke/portfolio-projects/ exactly.
 *
 * Page structure:
 *   - Header / ScrollIndicator
 *   - Small top spacer
 *   - Section: "Our portfolio projects" heading (left-aligned, dark navy)
 *   - Image 1: portfolio_clients.png  — aspect ratio 780×363  (full-width)
 *   - Spacer
 *   - Image 2: portfolio_partners.png — aspect ratio 971×435  (full-width)
 *   - Footer / WhatsAppButton
 */

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollIndicator from "@/components/ScrollIndicator";

/* ─── Design tokens (consistent with CompanyOverviewPage) ─────── */
const NAVY = "#1a2e4a";

/* ─── Scroll-reveal ──────────────────────────────────────────── */
function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setOn(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return { ref, on };
}

/* ─── Fade-in image block ────────────────────────────────────── */
function PortfolioImage({
  src,
  alt,
  aspectW,
  aspectH,
  delay,
}: {
  src: string;
  alt: string;
  aspectW: number;
  aspectH: number;
  delay?: number;
}) {
  const { ref, on } = useReveal(delay ?? 0);
  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        /* Maintain exact aspect ratio from the live site SVG viewBox */
        aspectRatio: `${aspectW} / ${aspectH}`,
        opacity: on ? 1 : 0,
        transform: on ? "none" : "translateY(18px)",
        transition: `opacity .6s ease ${delay ?? 0}ms, transform .6s ease ${delay ?? 0}ms`,
        lineHeight: 0, /* remove inline gap below img */
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
        loading="lazy"
      />
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
const PortfolioProjectsPage = () => {
  const { ref: headingRef, on: headingOn } = useReveal(0);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ScrollIndicator />
      <Header />

      <main className="flex-1">
        {/* top spacer — matches elementor spacer */}
        <div style={{ height: 48 }} />

        <div className="vilcom-section">

          {/* ── Heading: "Our portfolio projects" ── */}
          <div
            ref={headingRef}
            style={{
              marginBottom: 40,
              opacity: headingOn ? 1 : 0,
              transform: headingOn ? "none" : "translateY(12px)",
              transition: "opacity .5s ease, transform .5s ease",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
                fontWeight: 800,
                color: NAVY,
                margin: 0,
                lineHeight: 1.2,
                textAlign: "center",
              }}
            >
              Our portfolio projects
            </h2>
          </div>

          {/* ── Image 1: Clients — viewBox 780×363 ── */}
          <PortfolioImage
            src="https://vilcom.co.ke/wp-content/uploads/2024/06/portfolio_clients.png"
            alt="Portfolio clients"
            aspectW={780}
            aspectH={363}
            delay={80}
          />

          {/* spacer between images */}
          <div style={{ height: 32 }} />

          {/* ── Image 2: Partners — viewBox 971×435 ── */}
          <PortfolioImage
            src="https://vilcom.co.ke/wp-content/uploads/2024/06/portfolio_partners.png"
            alt="Portfolio partners"
            aspectW={971}
            aspectH={435}
            delay={160}
          />

        </div>

        <div style={{ height: 64 }} />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default PortfolioProjectsPage;
