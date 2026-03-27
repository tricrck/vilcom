/**
 * VutaWifiPage.tsx
 * Pixel-perfect match of https://vilcom.co.ke/vuta-wifi/ per screenshots.
 *
 * Section 1 — Hero (split layout, animated dots bg)
 *   Left: huge blue heading, subtext, orange pill button
 *   Right: enterprise connectivity banner image
 *
 * Section 2 — Body (white, centered heading, plain text blocks)
 *   No icons. Feature titles are bold inline, body text below.
 *
 * Section 3 — Form (white, centered heading, full-width inputs,
 *   red asterisks, blue right-aligned SUBMIT button)
 */

import { useState, useEffect, useRef, FormEvent } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollIndicator from "@/components/ScrollIndicator";
import SEO from "@/components/SEO";
import { serviceSchema } from "@/lib/useSEO";

/* ─── Tokens ─────────────────────────────────────────────────── */
const NAVY    = "#1a2e4a";   /* body/form headings */
const BLUE_H  = "#3861d8";   /* hero heading blue */
const BLUE    = "#1b75bc";   /* button / submit blue */
const ORANGE  = "#f5a623";   /* enroll me button */
const BODY    = "#3d3d3d";
const LIGHT   = "#6b7280";
const BORDER  = "#d1d5db";

/* ─── Scroll reveal ──────────────────────────────────────────── */
function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setOn(true), delay); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return { ref, on };
}

/* ─── Animated floating dots (scattered blue + orange dots) ───── */
const DOTS = Array.from({ length: 32 }, (_, i) => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  r: Math.random() * 5 + 3,
  color: i % 4 === 0 ? "#f5a623" : "#3861d8",
  opacity: Math.random() * 0.35 + 0.12,
  dur: Math.random() * 6 + 5,
  delay: Math.random() * 4,
}));

function DotsBackground() {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {DOTS.map((d, i) => (
        <circle key={i} cx={`${d.x}%`} cy={`${d.y}%`} r={d.r}
          fill={d.color} opacity={d.opacity}>
          <animate attributeName="cy"
            values={`${d.y}%;${d.y - 3}%;${d.y}%`}
            dur={`${d.dur}s`} begin={`${d.delay}s`} repeatCount="indefinite" />
          <animate attributeName="opacity"
            values={`${d.opacity};${d.opacity * 1.6};${d.opacity}`}
            dur={`${d.dur * 0.9}s`} begin={`${d.delay}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION 1 — HERO
   White bg with floating dots, 50/50 split
   Left: huge blue heading + subtext + orange pill button
   Right: enterprise connectivity banner image
   ───────────────────────────────────────────────────────────── */
function HeroSection() {
  const { ref, on } = useReveal(0);
  return (
    <section
      style={{
        background: "#ffffff",
        position: "relative",
        overflow: "hidden",
        padding: "64px 0 72px",
        minHeight: 520,
      }}
    >
      <DotsBackground />

      <div className="vilcom-section" style={{ position: "relative", zIndex: 1 }}>
        <div
          ref={ref}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 48,
            opacity: on ? 1 : 0,
            transform: on ? "none" : "translateY(20px)",
            transition: "opacity .7s ease, transform .7s ease",
          }}
        >
          {/* LEFT — text */}
          <div style={{ flex: "1 1 300px", maxWidth: 520 }}>
            <h1
              style={{
                fontSize: "clamp(2.8rem, 6vw, 4.2rem)",
                fontWeight: 900,
                color: BLUE_H,
                margin: "0 0 24px",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              Vuta Wifi,{"\n"}Vuta Smile.{"\n"}Only with{"\n"}Sigmon.
            </h1>

            <p
              style={{
                fontSize: 16,
                color: BODY,
                lineHeight: 1.75,
                margin: "0 0 32px",
                maxWidth: 440,
              }}
            >
              In Rongai, speed is everything. From the nganyas on Magadi Road to your daily scrolls,
              everything moves fast , your internet should too.
            </p>

            {/* Orange pill button */}
            <a
              href="#chrisi"
              style={{
                display: "inline-block",
                background: `linear-gradient(135deg, ${ORANGE} 0%, #e07b10 100%)`,
                color: "#fff",
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                padding: "15px 36px",
                borderRadius: 50,
                textDecoration: "none",
                transition: "transform .15s, box-shadow .2s",
                boxShadow: "0 4px 16px rgba(245,166,35,0.35)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(245,166,35,0.45)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "none";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(245,166,35,0.35)";
              }}
            >
              Enroll Me
            </a>
          </div>

          {/* RIGHT — Enterprise connectivity banner image */}
          <div style={{ flex: "1 1 280px", maxWidth: 580 }}>
            <img
              src="https://vilcom.co.ke/wp-content/uploads/2026/02/pic1.png"
              alt="Enterprise Connectivity — Sigmon Networks"
              style={{
                width: "100%",
                borderRadius: 8,
                display: "block",
                boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
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
   SECTION 2 — BODY TEXT
   White bg, centered heading, plain text blocks (no icons)
   Feature titles bold on their own line, body text below
   ───────────────────────────────────────────────────────────── */
function BodySection() {
  const { ref, on } = useReveal(60);
  return (
    <section style={{ background: "#fff", padding: "64px 0 56px" }}>
      <div className="vilcom-section">
        {/* Centered heading */}
        <h2
          style={{
            fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
            fontWeight: 800,
            color: NAVY,
            textAlign: "center",
            margin: "0 0 36px",
            lineHeight: 1.2,
          }}
        >
          Vuta Wifi, Vuta Smile. Only with Sigmon.
        </h2>

        <div
          ref={ref}
          style={{
            maxWidth: 860,
            opacity: on ? 1 : 0,
            transform: on ? "none" : "translateY(14px)",
            transition: "opacity .6s ease, transform .6s ease",
            fontSize: 15.5,
            color: BODY,
            lineHeight: 1.8,
          }}
        >
          {/* Intro paragraphs — plain text, no bold, matches screenshot */}
          <p style={{ margin: "0 0 4px" }}>
            In Rongai, speed is everything. From the nganyas on Magadi Road to your daily scrolls, everything moves fast , your internet should too.
          </p>
          <p style={{ margin: "0 0 28px" }}>
            This month, make the switch to Sigmon, the plug for reliable, no-lag, no-buffer internet that gets your hustle, entertainment, and connections flowing like clockwork.
          </p>

          {/* Feature blocks — title bold on own line, body below, gap between */}
          <p style={{ margin: "0 0 4px" }}>Here's Why Rongai Youth Are Making the Move:</p>

          <p style={{ margin: "0 0 4px" }}>
            <strong style={{ color: NAVY, fontWeight: 700 }}>Speed Without Stories</strong>
          </p>
          <p style={{ margin: "0 0 24px" }}>
            Whether it's a YouTube deep dive, a live match, or your next gig on Zoom, we don't stall.
          </p>

          <p style={{ margin: "0 0 4px" }}>
            <strong style={{ color: NAVY, fontWeight: 700 }}>Affordable Packages That Get You</strong>
          </p>
          <p style={{ margin: "0 0 24px" }}>
            Get plans that fit your student hustle, side job, or group house setup.
          </p>

          <p style={{ margin: "0 0 4px" }}>
            <strong style={{ color: NAVY, fontWeight: 700 }}>Zero FOMO</strong>
          </p>
          <p style={{ margin: "0 0 24px" }}>
            Stream, game, chill, repeat. While others are reconnecting modems, you're already 3 episodes in.
          </p>

          <p style={{ margin: "0 0 4px" }}>
            <strong style={{ color: NAVY, fontWeight: 700 }}>Support That's Always On</strong>
          </p>
          <p style={{ margin: "0 0 28px" }}>
            We pick calls. We reply DMs. We sort issues. 24/7.
          </p>

          {/* Closing */}
          <p style={{ margin: "0 0 4px" }}>
            <strong style={{ color: NAVY, fontWeight: 700 }}>Make the Switch, Get Plugged, and Level Up</strong>
          </p>
          <p style={{ margin: "0 0 4px" }}>
            Life in Rongai is about pace, passion, and peace of mind. With Sigmon, you don't just connect you level up. So don't wait till next month.
          </p>
          <p style={{ margin: "0 0 4px" }}>Make the move now. Vuta WiFi. Vuta smile.</p>
          <p style={{ margin: "0 0 4px" }}>Fill out the form below and let's roll.</p>
          <p style={{ margin: 0 }}>Fast setup. No drama. Just vibes.</p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION 3 — FORM
   White bg, centered heading, full-width inputs,
   red asterisks, blue right-aligned SUBMIT button
   ───────────────────────────────────────────────────────────── */
const REGIONS = [
  "Athiriver","Bungoma","Eldoret Annex","Eldoret Elgonview","Eldoret Industrial Area",
  "Eldoret Kapseret","Eldoret Kapsoya","Eldoret Kimumu","Eldoret Kuinet","Eldoret Midlands",
  "Kakamega","Lodwar Kanamkemer","Lodwar Town","Meru Kambakia","Meru Milimani",
  "Mombasa Buxton","Mombasa Tudor","Nairobi Buruburu","Nairobi Industrial Area",
  "Nairobi Karen","Nairobi Kileleshwa","Nairobi Kilimani","Nairobi Muthangari",
  "Nairobi Ruaraka","Nairobi South C","Nairobi Westlands","Nakuru Hyrax",
  "Nakuru Kiamunyi Eden","Nakuru Kiamunyi Olive","Nakuru Lanet","Nakuru Milimani",
  "Nakuru Mzee Wa Nyama","Nakuru Naka Centre Deliverance","Nakuru Naka Mwariki",
  "Nakuru Ngata","Nakuru Pipeline","Nakuru Section 58 Lions","Rongai Maasai Lodge",
  "Rongai Cleanshelf","Rongai Exciting","Rongai Kandisi","Rongai Laiser Hill",
  "Rongai Maiyan","Rongai Nkoroi","Rongai Rimpa","Rongai Siron","Rongai Tumaini",
  "Ruiru","Ruiru Corner","Ruiru Kamakis","Ruiru Karuguru","Ruiru Mitikenda",
];

function EnrollForm() {
  const { ref, on } = useReveal(80);
  const [form, setForm] = useState({ name: "", email: "", phone: "", region: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /* Input base style — matches screenshot: full-width, thin border, light bg */
  const inputBase: React.CSSProperties = {
    display: "block",
    width: "100%",
    padding: "13px 16px",
    fontSize: 15,
    color: NAVY,
    background: "#fff",
    border: `1px solid ${BORDER}`,
    borderRadius: 6,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "border-color .2s, box-shadow .2s",
  };

  function onFocus(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
    (e.target as HTMLElement).style.borderColor = BLUE;
    (e.target as HTMLElement).style.boxShadow = `0 0 0 3px rgba(27,117,188,0.13)`;
  }
  function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
    (e.target as HTMLElement).style.borderColor = BORDER;
    (e.target as HTMLElement).style.boxShadow = "none";
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1200);
  }

  /* Label with red asterisk */
  function Label({ children }: { children: string }) {
    return (
      <label
        style={{
          display: "block",
          fontSize: 14,
          fontWeight: 500,
          color: NAVY,
          marginBottom: 8,
        }}
      >
        {children} <span style={{ color: "#ef4444", fontWeight: 700 }}>*</span>
      </label>
    );
  }

  return (
    <section
      id="chrisi"
      style={{ background: "#fff", padding: "64px 0 80px", borderTop: `1px solid #f0f0f0` }}
    >
      <div className="vilcom-section">
        {/* Centered heading — matches screenshot font size and weight */}
        <h2
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 800,
            color: NAVY,
            textAlign: "center",
            margin: "0 0 48px",
            lineHeight: 1.15,
          }}
        >
          Please enter your details
        </h2>

        <div
          ref={ref}
          style={{
            maxWidth: 780,
            margin: "0 auto",
            opacity: on ? 1 : 0,
            transform: on ? "none" : "translateY(16px)",
            transition: "opacity .6s ease, transform .6s ease",
          }}
        >
          {submitted ? (
            <div
              style={{
                background: "#ecfdf5",
                border: "1px solid #6ee7b7",
                borderRadius: 8,
                padding: "36px 40px",
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: 18, fontWeight: 700, color: "#065f46", margin: "0 0 10px" }}>
                ✓ You're in!
              </p>
              <p style={{ fontSize: 15, color: "#047857", margin: 0 }}>
                Thanks for enrolling. Our team will reach out to you shortly.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

              {/* Full Names */}
              <div>
                <Label>Full Names</Label>
                <input
                  type="text"
                  placeholder="Enter your full names"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  onFocus={onFocus} onBlur={onBlur}
                  style={inputBase}
                />
              </div>

              {/* Email */}
              <div>
                <Label>Email</Label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  onFocus={onFocus} onBlur={onBlur}
                  style={inputBase}
                />
              </div>

              {/* Phone Number */}
              <div>
                <Label>Phone Number</Label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  required
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  onFocus={onFocus} onBlur={onBlur}
                  style={inputBase}
                />
              </div>

              {/* Select a region */}
              <div>
                <Label>Select a region</Label>
                <select
                  required
                  value={form.region}
                  onChange={e => setForm(f => ({ ...f, region: e.target.value }))}
                  onFocus={onFocus} onBlur={onBlur}
                  style={{
                    ...inputBase,
                    appearance: "none" as const,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%231a2e4a' d='M6 8L0 0h12z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 16px center",
                    paddingRight: 40,
                    cursor: "pointer",
                    color: form.region ? NAVY : LIGHT,
                  }}
                >
                  <option value="" disabled>Athiriver</option>
                  {REGIONS.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              {/* Submit — blue, right-aligned, matches screenshot */}
              <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 4 }}>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  style={{
                    background: submitting ? "#9abfd8" : BLUE,
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 800,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    padding: "13px 36px",
                    borderRadius: 6,
                    border: "none",
                    cursor: submitting ? "not-allowed" : "pointer",
                    transition: "background .2s, transform .15s",
                    boxShadow: "0 2px 8px rgba(27,117,188,0.25)",
                  }}
                  onMouseEnter={e => {
                    if (!submitting) {
                      (e.currentTarget as HTMLElement).style.background = "#155e9a";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!submitting) {
                      (e.currentTarget as HTMLElement).style.background = BLUE;
                      (e.currentTarget as HTMLElement).style.transform = "none";
                    }
                  }}
                >
                  {submitting ? "Submitting…" : "Submit"}
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
const VutaWifiPage = () => (
  <>
  <SEO
  title="Vuta WiFi | Home Fiber Packages | Sigmon Networks"
  description="Vuta WiFi home fiber packages in Nairobi — fast, affordable, and always-on. Check coverage and get connected today."
  canonical="https://vilcom.onrender.com/vuta-wifi"
  schema={serviceSchema({
    name: "Vuta WiFi Home Fiber",
    description: "Residential fiber internet packages for Nairobi homes.",
    url: "https://vilcom.onrender.com/vuta-wifi",
    category: "Residential Internet Service",
  })}
/>
  <div className="min-h-screen flex flex-col bg-white">
    <ScrollIndicator />
    <Header />
    <main className="flex-1">
      <HeroSection />
      <BodySection />
      <EnrollForm />
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
  </>
);

export default VutaWifiPage;