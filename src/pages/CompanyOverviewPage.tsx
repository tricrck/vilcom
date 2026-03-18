/**
 * CompanyOverviewPage.tsx
 * Matches https://vilcom.co.ke/company-overview/ exactly per screenshots.
 *
 * Screenshot observations:
 *
 * Section 1 – "What we do"
 *   - "What we do" heading: CENTERED, dark navy #1a2e4a, ~2.4rem 800
 *   - Banner card: light grey bg #eef0f3, border-radius ~10px, no dark navy
 *   - Left: dark navy bold paragraph text, orange button "DISCOVER MORE" (no icon)
 *   - Right: 2×2 photo grid (the Kilamtu image rendered as a collage)
 *
 * Section 2 – "Guiding Principles"
 *   - CENTERED heading, white bg
 *   - Icon + title on same row (icon dark navy, title dark navy bold ~1.3rem)
 *   - Body text below, indented to align with title, dark #3d3d3d
 *   - Large vertical spacing between items (~48px)
 *   - CORIP block indented, inline under "Our Core Values"
 *
 * Section 3 – "What our customers say"
 *   - CENTERED heading, white bg
 *   - Flat wide card, avatar left (circular 72px), name bold navy, role lighter
 *   - Quote text below avatar row
 *   - Orange left/right chevron arrows on far sides
 *   - Dot indicators centered below
 */

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollIndicator from "@/components/ScrollIndicator";

/* ─── Design tokens ──────────────────────────────────────────── */
const NAVY   = "#1a2e4a";
const BODY   = "#3d3d3d";
const LIGHT  = "#6b7280";
const ORANGE = "#f5a623";
const BLUE   = "#1b75bc";
const BORDER = "#e5e7eb";
const BANNER_BG = "#eef0f3";   /* light grey from screenshot */

/* ─── Scroll reveal ──────────────────────────────────────────── */
function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setOn(true), delay); obs.disconnect(); } },
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return { ref, on };
}

/* ─── Centered section heading ───────────────────────────────── */
function CenteredH2({ children }: { children: React.ReactNode }) {
  const { ref, on } = useReveal();
  return (
    <div
      ref={ref}
      style={{
        textAlign: "center",
        marginBottom: 40,
        opacity: on ? 1 : 0,
        transform: on ? "none" : "translateY(12px)",
        transition: "opacity .5s ease, transform .5s ease",
      }}
    >
      <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.6rem)", fontWeight: 800, color: NAVY, margin: 0, lineHeight: 1.15 }}>
        {children}
      </h2>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION 1 — WHAT WE DO
   Light grey card, dark navy text, orange button, 2×2 photo grid right
   ───────────────────────────────────────────────────────────── */

/* The live site image is one tall portrait photo rendered into 4 grid slots.
   We split it using object-position to simulate the 2×2 grid from the screenshot. */


function WhatWeDo() {
  const { ref, on } = useReveal(60);
  return (
    <section style={{ background: "#fff", padding: "0 0 0" }}>
      <div className="vilcom-section">

        {/* CENTERED heading */}
        <CenteredH2>What we do</CenteredH2>

        {/* Banner card — light grey */}
        <div
          ref={ref}
          style={{
            display: "flex",
            flexWrap: "wrap",
            borderRadius: 10,
            overflow: "hidden",
            background: BANNER_BG,
            minHeight: 380,
            opacity: on ? 1 : 0,
            transform: on ? "none" : "translateY(20px)",
            transition: "opacity .6s ease, transform .6s ease",
          }}
        >
          {/* Left — text */}
          <div
            style={{
              flex: "1 1 320px",
              display: "flex",
              alignItems: "center",
              padding: "56px 52px 56px 56px",
            }}
          >
            <div>
              <p
                style={{
                  color: NAVY,
                  fontSize: "clamp(1rem, 1.9vw, 1.2rem)",
                  fontWeight: 700,
                  lineHeight: 1.65,
                  margin: "0 0 36px",
                  maxWidth: 440,
                }}
              >
                Experience the future of connectivity with Vilcom Networks!
                From affordable high-speed internet solutions for homes to robust fiber optics
                technology for businesses, we deliver reliable web services, hosting, and seamless
                hotspot connectivity.
              </p>

              {/* Orange button — no icon, uppercase */}
              <a
                href="https://vilcom.co.ke/fiber-solutions/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  background: ORANGE,
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  padding: "14px 30px",
                  borderRadius: 4,
                  textDecoration: "none",
                  transition: "background .2s, transform .15s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "#e09610";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = ORANGE;
                  (e.currentTarget as HTMLElement).style.transform = "none";
                }}
              >
                Discover More
              </a>
            </div>
          </div>

          {/* Right — single image */}
          <div
            style={{
              flex: "0 0 clamp(260px, 38%, 420px)",
              position: "relative",
              minHeight: 380,
              overflow: "hidden",
            }}
          >
            <img
              src="https://vilcom.co.ke/wp-content/uploads/2024/06/Kilamtu_Plain_Compressed.jpg"
              alt="Vilcom Networks"
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "center top",
                display: "block",
              }}
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION 2 — GUIDING PRINCIPLES
   White bg, centered heading, icon+title row, body indented below
   ───────────────────────────────────────────────────────────── */
interface PrincipleRowProps {
  icon: React.ReactNode;
  title: string;
  body?: string;
  delay?: number;
}
function PrincipleRow({ icon, title, body, delay = 0 }: PrincipleRowProps) {
  const { ref, on } = useReveal(delay);
  return (
    <div
      ref={ref}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? "none" : "translateY(14px)",
        transition: `opacity .5s ease ${delay}ms, transform .5s ease ${delay}ms`,
        marginBottom: 48,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: body ? 14 : 0 }}>
        <span style={{ color: NAVY, display: "flex", alignItems: "center", flexShrink: 0 }}>
          {icon}
        </span>
        <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: NAVY, margin: 0, lineHeight: 1.2 }}>
          {title}
        </h3>
      </div>
      {body && (
        <p style={{ margin: "0 0 0 42px", fontSize: 15, color: BODY, lineHeight: 1.78 }}>
          {body}
        </p>
      )}
    </div>
  );
}

const CORIP_ITEMS = [
  { key: "C", label: "Customer Experience",    tagline: "We put the customer at the heart of everything.",   body: "We listen deeply and act thoughtfully to create meaningful, lasting relationships. Every interaction is an opportunity to exceed expectations and build trust." },
  { key: "O", label: "Operational Efficiency", tagline: "We work smarter to deliver better.",                 body: "We streamline processes, eliminate waste, and invest in systems that empower our teams. Efficiency is not just about speed—it's about sustainable, scalable excellence." },
  { key: "R", label: "Revenue Growth",         tagline: "We drive value that fuels our future.",              body: "We think commercially and act strategically to unlock new opportunities. Sustainable growth is the result of disciplined execution, customer focus, and bold ambition." },
  { key: "I", label: "Innovation & Creativity",tagline: "We imagine what's next.",                            body: "We challenge the status quo and embrace fresh ideas. In a fast-changing world, we stay ahead by fostering curiosity, experimentation, and creative problem-solving." },
  { key: "P", label: "People Focus",           tagline: "We win as one, with care and respect.",              body: "Our people are our greatest strength. We cultivate a culture of trust, inclusion, and shared purpose—because when our people thrive, Vilcom thrives." },
];

function CoripBlock() {
  const { ref, on } = useReveal(320);
  return (
    <div
      ref={ref}
      style={{
        marginLeft: 42,
        opacity: on ? 1 : 0,
        transform: on ? "none" : "translateY(10px)",
        transition: "opacity .55s ease 320ms, transform .55s ease 320ms",
      }}
    >
      <p style={{ fontSize: 15, fontWeight: 700, color: NAVY, margin: "0 0 20px" }}>
        C.O.R.I.P – The Vilcom Way
      </p>
      {CORIP_ITEMS.map((v, i) => (
        <p
          key={v.key}
          style={{
            fontSize: 15,
            color: BODY,
            lineHeight: 1.78,
            margin: "0 0 18px",
            opacity: on ? 1 : 0,
            transform: on ? "none" : "translateX(10px)",
            transition: `opacity .45s ease ${i * 70 + 380}ms, transform .45s ease ${i * 70 + 380}ms`,
          }}
        >
          <strong style={{ color: NAVY }}>{v.key} – {v.label} –</strong>
          {" "}<em style={{ color: BODY }}>{v.tagline}</em>
          <br />
          {v.body}
        </p>
      ))}
    </div>
  );
}

function GuidingPrinciples() {
  return (
    <section style={{ background: "#fff", padding: "80px 0 24px" }}>
      <div className="vilcom-section">
        <CenteredH2>Guiding Principles</CenteredH2>

        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <PrincipleRow
            delay={0}
            icon={<svg viewBox="0 0 192 512" style={{ width: 22, height: 22, fill: "currentColor" }}><path d="M20 424.229h20V279.771H20c-11.046 0-20-8.954-20-20V212c0-11.046 8.954-20 20-20h112c11.046 0 20 8.954 20 20v212.229h20c11.046 0 20 8.954 20 20V492c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20v-47.771c0-11.046 8.954-20 20-20zM96 0C56.235 0 24 32.235 24 72s32.235 72 72 72 72-32.235 72-72S135.764 0 96 0z"/></svg>}
            title="Who we are"
            body="Vilcom Networks Limited is a kenyan based telecommunications company headquartered in Nairobi and serving all the counties in the Republic of Kenya with high-speed internet and is committed to Quality products, outstanding services, and exceptional customer care."
          />
          <PrincipleRow
            delay={80}
            icon={<svg viewBox="0 0 512 512" style={{ width: 22, height: 22, fill: "currentColor" }}><path d="M505.12019,19.09375c-1.18945-5.53125-6.65819-11-12.207-12.1875C460.716,0,435.507,0,410.40747,0,307.17523,0,245.26909,55.20312,199.05238,128H94.83772c-16.34763.01562-35.55658,11.875-42.88664,26.48438L2.51562,253.29688A28.4,28.4,0,0,0,0,264a24.00867,24.00867,0,0,0,24.00582,24H127.81618l-22.47457,22.46875c-11.36521,11.36133-12.99607,32.25781,0,45.25L156.24582,406.625c11.15623,11.1875,32.15619,13.15625,45.27726,0l22.47457-22.46875V488a24.00867,24.00867,0,0,0,24.00581,24,28.55934,28.55934,0,0,0,10.707-2.51562l98.72834-49.39063c14.62888-7.29687,26.50776-26.5,26.50776-42.85937V312.79688c72.59753-46.3125,128.03493-108.40626,128.03493-211.09376C512.07526,76.5,512.07526,51.29688,505.12019,19.09375ZM384.04033,168A40,40,0,1,1,424.05,128,40.02322,40.02322,0,0,1,384.04033,168Z"/></svg>}
            title="Our Mission"
            body="To empower communities with reliable internet access while walking alongside them in their digital journey delivering innovative technology solutions that enrich everyday life, strengthen connections, and unlock opportunities for growth."
          />
          <PrincipleRow
            delay={160}
            icon={<svg viewBox="0 0 576 512" style={{ width: 24, height: 24, fill: "currentColor" }}><path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"/></svg>}
            title="Our Vision"
            body="To be a leading technology solutions provider in Africa."
          />
          <PrincipleRow
            delay={240}
            icon={<svg viewBox="0 0 496 512" style={{ width: 24, height: 24, fill: "currentColor" }}><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm105.6-151.4c-25.9 8.3-64.4 13.1-105.6 13.1s-79.6-4.8-105.6-13.1c-9.8-3.1-19.4 5.3-17.7 15.3 7.9 47.2 71.3 80 123.3 80s115.3-32.9 123.3-80c1.6-9.8-7.7-18.4-17.7-15.3zm-227.9-57.5c-1 6.2 5.4 11 11 7.9l31.3-16.3 31.3 16.3c5.6 3.1 12-1.7 11-7.9l-6-34.9 25.4-24.6c4.5-4.5 1.9-12.2-4.3-13.2l-34.9-5-15.5-31.6c-2.9-5.8-11-5.8-13.9 0l-15.5 31.6-34.9 5c-6.2.9-8.9 8.6-4.3 13.2l25.4 24.6-6.1 34.9zm259.7-72.7l-34.9-5-15.5-31.6c-2.9-5.8-11-5.8-13.9 0l-15.5 31.6-34.9 5c-6.2.9-8.9 8.6-4.3 13.2l25.4 24.6-6 34.9c-1 6.2 5.4 11 11 7.9l31.3-16.3 31.3 16.3c5.6 3.1 12-1.7 11-7.9l-6-34.9 25.4-24.6c4.5-4.6 1.8-12.2-4.4-13.2z"/></svg>}
            title="Our Core Values"
          />

          {/* CORIP sits immediately below "Our Core Values", indented */}
          <CoripBlock />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION 3 — TESTIMONIALS
   White bg, centered heading, flat card, orange side arrows, dot indicators
   ───────────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote: '" What I love most about the Vilcom Networks Communications is I feel like I\'m working with someone from Team Family Reach. "',
    name: "Alex Kiiru",
    role: "Client",
    avatar: "https://vilcom.ke/wp-content/uploads/2024/06/avatar_Compressed.jpg",
  },
  {
    quote: '"Personally, I have had a great experience dealing with Vilcom Networks Ltd especially when it came to their service delivery. They are friendly, inclusive and have always been available 24/7 to solve any issues I\'ve encountered with my internet connection."',
    name: "Kevin Kimani",
    role: "Client",
    avatar: "https://vilcom.ke/wp-content/uploads/2024/06/avatar_Compressed.jpg",
  },
  {
    quote: '"Great customer relationship. Vilcom Networks Limited have maintained a wonderful customer service since we started working with them."',
    name: "Terry Mwihaki",
    role: "Client",
    avatar: "https://vilcom.ke/wp-content/uploads/2024/06/avatar_Compressed.jpg",
  },
];

function Testimonials() {
  const [active, setActive] = useState(0);
  const total = TESTIMONIALS.length;
  const prev = () => setActive(a => (a - 1 + total) % total);
  const next = () => setActive(a => (a + 1) % total);
  const t = TESTIMONIALS[active];

  return (
    <section style={{ background: "#fff", padding: "80px 0 80px" }}>
      <div className="vilcom-section">
        <CenteredH2>What our customers say</CenteredH2>

        <div style={{ position: "relative", maxWidth: 860, margin: "0 auto" }}>

          {/* Left orange chevron */}
          <button
            onClick={prev}
            aria-label="Previous"
            style={{
              position: "absolute", left: -32, top: "50%",
              transform: "translateY(-50%)",
              background: "transparent", border: "none",
              cursor: "pointer", color: ORANGE,
              padding: 8, zIndex: 10,
              display: "flex", alignItems: "center",
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.7"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
          >
            <svg width="9" height="16" viewBox="0 0 9 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="8,1 1,8 8,15"/>
            </svg>
          </button>

          {/* Right orange chevron */}
          <button
            onClick={next}
            aria-label="Next"
            style={{
              position: "absolute", right: -32, top: "50%",
              transform: "translateY(-50%)",
              background: "transparent", border: "none",
              cursor: "pointer", color: ORANGE,
              padding: 8, zIndex: 10,
              display: "flex", alignItems: "center",
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.7"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
          >
            <svg width="9" height="16" viewBox="0 0 9 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1,1 8,8 1,15"/>
            </svg>
          </button>

          {/* Flat testimonial card */}
          <div
            key={active}
            style={{
              background: "#fff",
              border: `1px solid ${BORDER}`,
              borderRadius: 10,
              boxShadow: "0 2px 20px rgba(0,0,0,0.07)",
              padding: "40px 52px",
              animation: "tFadeIn .35s ease",
            }}
          >
            <style>{`
              @keyframes tFadeIn {
                from { opacity: 0; transform: translateY(6px); }
                to   { opacity: 1; transform: none; }
              }
            `}</style>

            {/* Avatar + name + role row */}
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
              <div style={{
                width: 72, height: 72, borderRadius: "50%",
                overflow: "hidden", flexShrink: 0,
                background: "#dbeafe",
              }}>
                <img
                  src={t.avatar}
                  alt={t.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  loading="lazy"
                  onError={e => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://vilcom.co.ke/wp-content/uploads/2024/06/avatar_Compressed.jpg";
                  }}
                />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 17, fontWeight: 700, color: NAVY, lineHeight: 1.2 }}>
                  {t.name}
                </p>
                <p style={{ margin: "4px 0 0", fontSize: 14, color: LIGHT, fontWeight: 400 }}>
                  {t.role}
                </p>
              </div>
            </div>

            {/* Quote */}
            <p style={{ margin: 0, fontSize: 15.5, color: BODY, lineHeight: 1.75 }}>
              {t.quote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────── */
const CompanyOverviewPage = () => (
  <div className="min-h-screen flex flex-col bg-white">
    <ScrollIndicator />
    <Header />

    <main className="flex-1">
      {/* spacer matching elementor spacer before "What we do" */}
      <div style={{ height: 48 }} />

      <WhatWeDo />

      <div style={{ height: 24 }} />

      <GuidingPrinciples />

      <div style={{ height: 24 }} />

      <Testimonials />

      <div style={{ height: 48 }} />
    </main>

    <Footer />
    <WhatsAppButton />
  </div>
);

export default CompanyOverviewPage;