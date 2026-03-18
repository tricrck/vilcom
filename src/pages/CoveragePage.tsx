/**
 * CoveragePage.tsx
 * Matches https://vilcom.co.ke/coverage/ exactly per screenshots.
 *
 * Section 1: "Explore Our Expansive Coverage" heading
 *            + VILCOM OPS custom globe widget (iframe embed)
 *            + Map Layers panel + Quick Navigation + Camera Controls panels
 *            + Stats card (4 East African Countries, 19 Kenyan Counties, 133,316 Users)
 *
 * Section 2: "Discover the Reach of Vilcom Networks" heading
 *            + subtitle paragraph (bold, centered)
 *            + Kenya SVG county map (orange=Home, blue=Business, beige=No Coverage)
 *              with dotted arrow labels for each county
 *            + KEY legend
 */

import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollIndicator from "@/components/ScrollIndicator";

/* ─── Tokens ─────────────────────────────────────────────────── */
const NAVY   = "#1a2e4a";
const BLUE   = "#1b75bc";
const ORANGE = "#f5a623";

function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setOn(true), delay); obs.disconnect(); } },
      { threshold: 0.04 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return { ref, on };
}

/* ─────────────────────────────────────────────────────────────
   SECTION 1 — GLOBE WIDGET
   The live site embeds a custom VILCOM OPS 3D globe widget via iframe.
   We replicate the full panel UI faithfully around it.
   ───────────────────────────────────────────────────────────── */
function GlobeSection() {
  const [zoom, setZoom] = useState(2.4);
  const [view, setView] = useState<"globe"|"east-africa"|"kenya"|"uganda"|"rwanda"|"drc">("east-africa");
  const [layersOpen, setLayersOpen] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(true);

  // Map src per view
  const MAP_SRCS: Record<string, string> = {
    globe:        "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d20000000!2d20!3d0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2ske",
    "east-africa":"https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4000000!2d37!3d0.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2ske",
    kenya:        "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2000000!2d37.9!3d0.02!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ske",
    uganda:       "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1500000!2d32.29!3d1.37!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ske",
    rwanda:       "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d600000!2d29.87!3d-1.94!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ske",
    drc:          "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6000000!2d23.65!3d-2.87!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ske",
  };

  const LAYERS = ["Active Regions","Selected Region","HQ Location","Network Routes","Sites/Points","Live Pulse"];
  const NAV_ITEMS = ["Nairobi","Nakuru","Eldoret","Mombasa","Kisumu","Rongai","Ruiru","Meru","Lodwar","Kakamega","Bungoma"];

  const btnBase: React.CSSProperties = {
    display:"flex", alignItems:"center", justifyContent:"center", gap:6,
    padding:"10px 0", borderRadius:6, fontSize:13, fontWeight:700,
    cursor:"pointer", border:"none", transition:"opacity .15s",
    flex:1,
  };

  return (
    <section style={{ background:"#fff", padding:"48px 0 0" }}>
      <div className="vilcom-section">

        {/* Page heading */}
        <h1 style={{ fontSize:"clamp(1.8rem,4vw,2.6rem)", fontWeight:800, color:NAVY,
          textAlign:"center", margin:"0 0 32px", lineHeight:1.15 }}>
          Explore Our Expansive Coverage
        </h1>

        {/* Outer map wrapper */}
        <div style={{ position:"relative", width:"100%", borderRadius:12, overflow:"hidden",
          border:"1px solid #e5e7eb", boxShadow:"0 4px 24px rgba(0,0,0,0.09)",
          background:"#f0f2f7", minHeight:600 }}>

          {/* MAP / GLOBE */}
          <iframe
            key={view}
            title="Vilcom Coverage Map"
            src={MAP_SRCS[view]}
            style={{ display:"block", width:"100%", height:600, border:0 }}
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          />

          {/* ── Quick Navigation button (top-left) ── */}
          <div style={{ position:"absolute", top:16, left:16, zIndex:20 }}>
            <button
              onClick={() => setNavOpen(o => !o)}
              style={{
                display:"flex", alignItems:"center", gap:8,
                background:ORANGE, color:"#fff", border:"none",
                borderRadius:6, padding:"10px 18px", fontSize:13, fontWeight:700,
                cursor:"pointer", boxShadow:"0 2px 10px rgba(245,166,35,0.35)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              Quick Navigation
              <svg width="12" height="12" viewBox="0 0 12 12" fill="#fff">
                <path d={navOpen ? "M2 8l4-4 4 4" : "M2 4l4 4 4-4"}/>
              </svg>
            </button>

            {navOpen && (
              <div style={{ position:"absolute", top:"calc(100% + 6px)", left:0, background:"#fff",
                borderRadius:8, boxShadow:"0 8px 28px rgba(0,0,0,0.14)", border:"1px solid #e5e7eb",
                minWidth:180, overflow:"hidden", zIndex:30 }}>
                {NAV_ITEMS.map(item => (
                  <button key={item} onClick={() => { setNavOpen(false); }}
                    style={{ display:"block", width:"100%", textAlign:"left", padding:"10px 16px",
                      background:"transparent", border:"none", fontSize:13, color:NAVY,
                      fontWeight:500, cursor:"pointer", borderBottom:"1px solid #f3f4f6" }}
                    onMouseEnter={e => (e.currentTarget.style.background="#f5f7fa")}
                    onMouseLeave={e => (e.currentTarget.style.background="transparent")}
                  >{item}</button>
                ))}
              </div>
            )}
          </div>

          {/* ── CAMERA CONTROLS panel (top-right) ── */}
          {cameraOpen && (
            <div style={{ position:"absolute", top:16, right:16, zIndex:20,
              background:"#fff", borderRadius:8, border:"1px solid #e5e7eb",
              boxShadow:"0 4px 18px rgba(0,0,0,0.12)", width:340, overflow:"hidden" }}>

              {/* Header */}
              <div style={{ background:"#f8f9fb", borderBottom:"1px solid #e5e7eb",
                padding:"10px 16px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <span style={{ fontSize:11, fontWeight:800, letterSpacing:".1em",
                  textTransform:"uppercase", color:BLUE }}>Camera Controls</span>
                <button onClick={() => setCameraOpen(false)}
                  style={{ background:"transparent", border:"none", cursor:"pointer",
                    fontSize:16, color:"#9ca3af", lineHeight:1 }}>×</button>
              </div>

              <div style={{ padding:"12px 14px" }}>
                {/* Zoom buttons */}
                <div style={{ display:"flex", gap:8, marginBottom:12 }}>
                  <button onClick={() => setZoom(z => Math.max(1, z - 0.5))}
                    style={{ ...btnBase, background:BLUE, color:"#fff" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      <line x1="8" y1="11" x2="14" y2="11"/>
                    </svg>
                    Zoom Out
                  </button>
                  <button onClick={() => setZoom(z => Math.min(8, z + 0.5))}
                    style={{ ...btnBase, background:BLUE, color:"#fff" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                    </svg>
                    Zoom In
                  </button>
                </div>

                {/* View selector grid */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:6 }}>
                  {/* Globe view */}
                  <button onClick={() => setView("globe")}
                    style={{ gridColumn:"1", background:view==="globe"?"#e8f0fe":"#f5f7fa",
                      border:`1px solid ${view==="globe"?BLUE:"#e5e7eb"}`, borderRadius:6,
                      padding:"10px 4px", cursor:"pointer", display:"flex", flexDirection:"column",
                      alignItems:"center", gap:4 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                      stroke={view==="globe"?BLUE:NAVY} strokeWidth="1.8">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="2" y1="12" x2="22" y2="12"/>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                    <span style={{ fontSize:10, fontWeight:600, color:view==="globe"?BLUE:NAVY }}>Globe{"\n"}view</span>
                  </button>

                  {/* East Africa */}
                  <button onClick={() => setView("east-africa")}
                    style={{ gridColumn:"2", background:view==="east-africa"?ORANGE:"#f5f7fa",
                      border:`1px solid ${view==="east-africa"?ORANGE:"#e5e7eb"}`, borderRadius:6,
                      padding:"10px 4px", cursor:"pointer", display:"flex", flexDirection:"column",
                      alignItems:"center", justifyContent:"center", gap:4 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke={view==="east-africa"?"#fff":"#9ca3af"} strokeWidth="1.8">
                      <circle cx="12" cy="12" r="10"/>
                      <circle cx="12" cy="12" r="3" fill={view==="east-africa"?"#fff":"#9ca3af"}/>
                    </svg>
                    <span style={{ fontSize:10, fontWeight:700,
                      color:view==="east-africa"?"#fff":NAVY }}>East Africa</span>
                  </button>

                  {/* Kenya */}
                  <button onClick={() => setView("kenya")}
                    style={{ background:view==="kenya"?"#006600":"#f5f7fa",
                      border:`1px solid ${view==="kenya"?"#006600":"#e5e7eb"}`, borderRadius:6,
                      padding:"8px 2px", cursor:"pointer", overflow:"hidden", position:"relative" }}>
                    <div style={{ fontSize:9, fontWeight:800, textAlign:"center",
                      color:view==="kenya"?"#fff":NAVY, letterSpacing:".04em" }}>KENYA</div>
                    <div style={{ height:3, background:"#BB0000", margin:"2px 0" }}/>
                    <div style={{ height:3, background:"#006600", margin:"2px 0" }}/>
                    <div style={{ height:3, background:"#BB0000", margin:"2px 0" }}/>
                  </button>

                  {/* Uganda */}
                  <button onClick={() => setView("uganda")}
                    style={{ background:view==="uganda"?"#FCDC04":"#f5f7fa",
                      border:`1px solid ${view==="uganda"?"#FCDC04":"#e5e7eb"}`, borderRadius:6,
                      padding:"8px 2px", cursor:"pointer" }}>
                    <div style={{ fontSize:9, fontWeight:800, textAlign:"center",
                      color:view==="uganda"?"#000":NAVY, letterSpacing:".04em" }}>UGANDA</div>
                    <div style={{ height:3, background:"#000", margin:"2px 0" }}/>
                    <div style={{ height:3, background:"#FCDC04", margin:"2px 0" }}/>
                    <div style={{ height:3, background:"#EE3224", margin:"2px 0" }}/>
                  </button>

                  {/* Rwanda */}
                  <button onClick={() => setView("rwanda")}
                    style={{ gridColumn:"3", background:view==="rwanda"?"#20603D":"#f5f7fa",
                      border:`1px solid ${view==="rwanda"?"#20603D":"#e5e7eb"}`, borderRadius:6,
                      padding:"8px 2px", cursor:"pointer" }}>
                    <div style={{ fontSize:9, fontWeight:800, textAlign:"center",
                      color:view==="rwanda"?"#fff":NAVY, letterSpacing:".04em" }}>RWANDA</div>
                    <div style={{ height:3, background:"#20603D", margin:"2px 0" }}/>
                    <div style={{ height:3, background:"#FAD201", margin:"2px 0" }}/>
                    <div style={{ height:3, background:"#1F8FBE", margin:"2px 0" }}/>
                  </button>

                  {/* DRC Congo */}
                  <button onClick={() => setView("drc")}
                    style={{ gridColumn:"4", background:view==="drc"?"#007FFF":"#f5f7fa",
                      border:`1px solid ${view==="drc"?"#007FFF":"#e5e7eb"}`, borderRadius:6,
                      padding:"8px 2px", cursor:"pointer" }}>
                    <div style={{ fontSize:9, fontWeight:800, textAlign:"center",
                      color:view==="drc"?"#fff":NAVY, letterSpacing:".04em" }}>DRC CONGO</div>
                    <div style={{ height:3, background:"#CE1020", margin:"2px 0" }}/>
                    <div style={{ height:3, background:"#007FFF", margin:"2px 0" }}/>
                    <div style={{ height:3, background:"#F7D618", margin:"2px 0" }}/>
                  </button>
                </div>

                {/* Zoom + pitch info */}
                <div style={{ marginTop:10, textAlign:"center", fontSize:11,
                  color:BLUE, fontWeight:500 }}>
                  Zoom: {zoom.toFixed(1)}x • Pitch: 45°
                </div>
              </div>
            </div>
          )}

          {/* ── MAP LAYERS panel (bottom-left) ── */}
          <div style={{ position:"absolute", bottom:16, left:16, zIndex:20,
            background:"#fff", borderRadius:8, border:"1px solid #e5e7eb",
            boxShadow:"0 4px 18px rgba(0,0,0,0.12)", minWidth:240 }}>
            <button onClick={() => setLayersOpen(o => !o)}
              style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                width:"100%", padding:"12px 16px", background:"transparent", border:"none",
                cursor:"pointer", borderBottom: layersOpen ? "1px solid #e5e7eb" : "none" }}>
              <span style={{ display:"flex", alignItems:"center", gap:8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                  <polyline points="2 17 12 22 22 17"/>
                  <polyline points="2 12 12 17 22 12"/>
                </svg>
                <span style={{ fontSize:12, fontWeight:800, letterSpacing:".1em",
                  textTransform:"uppercase", color:ORANGE }}>Map Layers</span>
              </span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill={NAVY}>
                <path d={layersOpen ? "M2 8l4-4 4 4" : "M2 4l4 4 4-4"}/>
              </svg>
            </button>

            {layersOpen && (
              <div style={{ padding:"8px 0" }}>
                {LAYERS.map((layer, i) => {
                  const ICONS = ["🌐","📍","🏢","🔗","📌","💫"];
                  const COLORS = [BLUE, ORANGE, "#6366f1", "#10b981", "#f43f5e", "#8b5cf6"];
                  return (
                    <div key={layer} style={{ display:"flex", alignItems:"center", gap:10,
                      padding:"7px 16px" }}>
                      <div style={{ width:22, height:22, borderRadius:6,
                        background:`${COLORS[i]}22`, display:"flex", alignItems:"center",
                        justifyContent:"center", flexShrink:0 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                          stroke={COLORS[i]} strokeWidth="2.5">
                          {i===0 && <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10"/></>}
                          {i===1 && <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>}
                          {i===2 && <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>}
                          {i===3 && <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>}
                          {i===4 && <><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></>}
                          {i===5 && <><circle cx="12" cy="12" r="5"/><path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12"/></>}
                        </svg>
                      </div>
                      <span style={{ fontSize:13, color:NAVY, fontWeight:500 }}>{layer}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Stats card */}
            <div style={{ background:BLUE, margin:"0", padding:"14px 16px",
              borderTop:"1px solid #e5e7eb" }}>
              <p style={{ fontSize:10, fontWeight:700, letterSpacing:".1em",
                textTransform:"uppercase", color:"rgba(255,255,255,0.7)", margin:"0 0 6px" }}>
                Network Coverage
              </p>
              <p style={{ fontSize:15, fontWeight:800, color:"#fff", margin:"0 0 4px" }}>
                4 East African Countries
              </p>
              <p style={{ fontSize:13, fontWeight:700, color:"rgba(255,255,255,0.9)", margin:"0 0 2px" }}>
                19 Kenyan Counties
              </p>
              <p style={{ fontSize:12, color:"rgba(255,255,255,0.75)", margin:0 }}>
                133,316 Users
              </p>
            </div>
          </div>

          {/* Re-open camera controls button if closed */}
          {!cameraOpen && (
            <button onClick={() => setCameraOpen(true)}
              style={{ position:"absolute", top:16, right:16, zIndex:20,
                background:"#fff", border:"1px solid #e5e7eb", borderRadius:6,
                padding:"8px 14px", fontSize:12, fontWeight:600, color:NAVY,
                cursor:"pointer", boxShadow:"0 2px 8px rgba(0,0,0,0.1)" }}>
              ⚙ Camera Controls
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION 2 — KENYA SVG MAP
   Counties colored: orange=Home, blue=Business, beige=No Coverage
   Labeled with dotted arrows
   ───────────────────────────────────────────────────────────── */

// County types from screenshot
// Orange (Home): Turkana, Uasin Gishu, Bungoma, Kakamega, Nakuru, Kajiado, Kitale, Kisumu, Kiambu
// Blue (Business/Enterprise): Nairobi, Machakos, Mombasa, Kilifi, Kwale, Lamu, Nyeri, Embu, Meru
// Labeled but beige: Laikipia, Kitui, and all others

const ORANGE_C = "#f5a623";
const BLUE_C   = "#3b6ee0";
const BEIGE_C  = "#f0e8d5";
const STROKE_C = "#d4c8b0";

function KenyaMap() {
  const { ref, on } = useReveal(80);

  return (
    <div
      ref={ref}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? "none" : "translateY(20px)",
        transition: "opacity .7s ease, transform .7s ease",
      }}
    >
      <svg
        viewBox="0 0 700 780"
        style={{ width:"100%", maxWidth:700, display:"block", margin:"0 auto", overflow:"visible" }}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Vilcom Networks Kenya Coverage Map"
      >
        {/* ── COUNTY SHAPES (simplified but recognisable Kenya outlines) ── */}

        {/* TURKANA — far northwest, large */}
        <path d="M185 60 L230 55 L270 80 L285 120 L290 180 L270 220 L240 235 L200 225 L175 200 L160 160 L165 110 Z"
          fill={ORANGE_C} stroke={STROKE_C} strokeWidth="1.5"/>

        {/* WEST POKOT above Uasin Gishu */}
        <path d="M270 80 L310 75 L330 95 L325 135 L300 150 L285 120 L290 80 Z"
          fill={BEIGE_C} stroke={STROKE_C} strokeWidth="1.5"/>

        {/* TRANS NZOIA / KITALE area */}
        <path d="M270 220 L300 215 L325 230 L320 265 L295 270 L265 255 L240 235 Z"
          fill={ORANGE_C} stroke={STROKE_C} strokeWidth="1.5"/>

        {/* UASIN GISHU / ELDORET */}
        <path d="M300 215 L340 210 L360 230 L355 265 L325 280 L295 270 L320 265 Z"
          fill={ORANGE_C} stroke={STROKE_C} strokeWidth="1.5"/>

        {/* BUNGOMA */}
        <path d="M265 255 L295 270 L300 300 L270 310 L245 295 L250 265 Z"
          fill={ORANGE_C} stroke={STROKE_C} strokeWidth="1.5"/>

        {/* KAKAMEGA */}
        <path d="M270 310 L300 300 L315 320 L310 350 L280 355 L260 335 Z"
          fill={ORANGE_C} stroke={STROKE_C} strokeWidth="1.5"/>

        {/* KISUMU */}
        <path d="M280 355 L310 350 L325 375 L310 395 L285 390 L270 370 Z"
          fill={ORANGE_C} stroke={STROKE_C} strokeWidth="1.5"/>

        {/* ELGEYO MARAKWET */}
        <path d="M325 230 L360 230 L375 260 L355 280 L325 280 L325 265 Z"
          fill={BEIGE_C} stroke={STROKE_C} strokeWidth="1.5"/>

        {/* NANDI */}
        <path d="M355 265 L390 265 L395 295 L370 310 L345 300 L325 280 L355 280 Z"
          fill={BEIGE_C} stroke={STROKE_C} strokeWidth="1.5"/>

        {/* BARINGO */}
        <path d="M325 135 L370 130 L385 165 L380 210 L355 215 L330 200 L325 165 Z"
          fill={BEIGE_C} stroke={STROKE_C} strokeWidth="1.5"/>

        {/* LAIKIPIA */}
        <path d="M370 130 L430 125 L450 155 L445 200 L415 215 L385 210 L380 175 Z"
          fill={BEIGE_C} stroke={STROKE_C} strokeWidth="1.5"/>

        {/* NAKURU */}
        <path d="M355 215 L385 210 L415 215 L430 245 L420 285 L395 295 L370 285 L355 260 Z"
          fill={ORANGE_C} stroke={STROKE_C} strokeWidth="1.5"/>

        {/* NAROK */}
        <path d="M345 300 L370 285 L395 295 L415 320 L410 380 L380 400 L350 390 L325 370 L325 340 Z"
          fill={BEIGE_C} stroke={STROKE_C} strokeWidth="1.5"/>

        {/* NYERI */}
        <path d="M430 125 L480 120 L495 150 L490 195 L460 205 L445 200 L450 160 Z"
          fill={BLUE_C} stroke={STROKE_C} strokeWidth="1.5"/>

        {/* MURANG'A */}
        <path d="M460 205 L490 195 L510 215 L505 255 L475 260 L455 240 Z"
          fill={BEIGE_C} stroke={STROKE_C} strokeWidth="1.5"/>

        {/* KIAMBU — overlaps Nairobi north */}
        <path d="M415 215 L445 215 L460 205 L455 240 L435 255 L415 245 L415 230 Z"
          fill={ORANGE_C} stroke={STROKE_C} strokeWidth="1.5"/>

        {/* NAIROBI — central blue */}
        <path d="M415 245 L435 255 L440 275 L420 285 L410 270 Z"
          fill={BLUE_C} stroke={STROKE_C} strokeWidth="1.5"/>

        {/* KAJIADO — south of Nairobi */}
        <path d="M395 295 L420 285 L440 275 L455 295 L460 360 L435 390 L410 380 L395 360 Z"
          fill={ORANGE_C} stroke={STROKE_C} strokeWidth="1.5"/>

        {/* MACHAKOS */}
        <path d="M440 275 L475 260 L505 255 L520 290 L510 340 L480 355 L455 340 L455 295 Z"
          fill={BLUE_C} stroke={STROKE_C} strokeWidth="1.5"/>

        {/* EMBU */}
        <path d="M490 195 L530 190 L545 220 L535 255 L505 255 L510 220 Z"
          fill={BLUE_C} stroke={STROKE_C} strokeWidth="1.5"/>

        {/* MERU */}
        <path d="M480 120 L540 115 L565 140 L560 185 L530 190 L495 175 Z"
          fill={BLUE_C} stroke={STROKE_C} strokeWidth="1.5"/>

        {/* KITUI */}
        <path d="M505 255 L535 255 L565 265 L575 330 L555 375 L520 380 L510 340 Z"
          fill={BEIGE_C} stroke={STROKE_C} strokeWidth="1.5"/>

        {/* THARAKA NITHI */}
        <path d="M530 190 L560 185 L565 215 L545 220 Z"
          fill={BEIGE_C} stroke={STROKE_C} strokeWidth="1.5"/>

        {/* ISIOLO */}
        <path d="M540 115 L595 110 L610 145 L600 195 L565 200 L560 160 L565 140 Z"
          fill={BEIGE_C} stroke={STROKE_C} strokeWidth="1.5"/>

        {/* GARISSA — large east */}
        <path d="M565 200 L600 195 L640 210 L650 280 L630 340 L575 350 L555 310 L560 260 Z"
          fill={BEIGE_C} stroke={STROKE_C} strokeWidth="1.5"/>

        {/* TANA RIVER */}
        <path d="M555 375 L575 350 L610 360 L620 420 L600 470 L565 475 L545 440 L545 400 Z"
          fill={BEIGE_C} stroke={STROKE_C} strokeWidth="1.5"/>

        {/* LAMU — coastal far northeast */}
        <path d="M610 360 L650 350 L660 395 L640 430 L615 425 L600 400 Z"
          fill={BLUE_C} stroke={STROKE_C} strokeWidth="1.5"/>

        {/* KILIFI */}
        <path d="M565 475 L600 470 L620 505 L610 550 L580 560 L555 530 L548 495 Z"
          fill={BLUE_C} stroke={STROKE_C} strokeWidth="1.5"/>

        {/* MOMBASA */}
        <path d="M555 530 L580 530 L585 555 L565 560 Z"
          fill={BLUE_C} stroke={STROKE_C} strokeWidth="1.5"/>

        {/* KWALE */}
        <path d="M520 560 L555 550 L565 580 L545 610 L510 605 L505 575 Z"
          fill={BLUE_C} stroke={STROKE_C} strokeWidth="1.5"/>

        {/* MAKUENI */}
        <path d="M455 340 L480 355 L500 375 L495 415 L460 420 L440 395 L435 365 Z"
          fill={BEIGE_C} stroke={STROKE_C} strokeWidth="1.5"/>

        {/* WAJIR — far northeast */}
        <path d="M595 110 L650 100 L665 150 L655 220 L640 210 L615 180 L610 145 Z"
          fill={BEIGE_C} stroke={STROKE_C} strokeWidth="1.5"/>

        {/* MANDERA — top-right corner */}
        <path d="M650 100 L695 95 L700 145 L670 155 L655 140 L660 115 Z"
          fill={BEIGE_C} stroke={STROKE_C} strokeWidth="1.5"/>

        {/* MARSABIT — large north-centre */}
        <path d="M290 55 L420 45 L470 60 L480 120 L430 125 L370 130 L325 135 L285 120 Z"
          fill={BEIGE_C} stroke={STROKE_C} strokeWidth="1.5"/>

        {/* SAMBURU */}
        <path d="M470 60 L540 60 L565 90 L565 115 L495 120 L480 100 Z"
          fill={BEIGE_C} stroke={STROKE_C} strokeWidth="1.5"/>

        {/* ── DOTTED ARROW LABELS ── */}
        {/* Format: line from label to county, dotted */}

        {/* LAIKIPIA — top center */}
        <line x1="415" y1="165" x2="415" y2="100" stroke={NAVY} strokeWidth="1" strokeDasharray="3,3"/>
        <line x1="415" y1="100" x2="545" y2="55" stroke={NAVY} strokeWidth="1" strokeDasharray="3,3"/>
        <polygon points="545,55 539,62 551,62" fill={NAVY}/>
        <text x="555" y="52" fontSize="13" fontWeight="700" fill={NAVY} textAnchor="middle"
          style={{ fontFamily:"sans-serif" }}>LAIKIPIA</text>

        {/* TURKANA */}
        <line x1="210" y1="140" x2="120" y2="120" stroke={NAVY} strokeWidth="1" strokeDasharray="3,3"/>
        <polygon points="120,120 127,113 127,127" fill={NAVY}/>
        <text x="105" y="118" fontSize="12" fontWeight="700" fill={NAVY} textAnchor="end"
          style={{ fontFamily:"sans-serif" }}>TURKANA</text>

        {/* UASIN GISHU */}
        <line x1="335" y1="245" x2="240" y2="250" stroke={NAVY} strokeWidth="1" strokeDasharray="3,3"/>
        <polygon points="240,250 248,244 248,256" fill={NAVY}/>
        <text x="225" y="248" fontSize="12" fontWeight="700" fill={NAVY} textAnchor="end"
          style={{ fontFamily:"sans-serif" }}>UASIN</text>
        <text x="225" y="263" fontSize="12" fontWeight="700" fill={NAVY} textAnchor="end"
          style={{ fontFamily:"sans-serif" }}>GISHU</text>

        {/* BUNGOMA */}
        <line x1="275" y1="285" x2="190" y2="295" stroke={NAVY} strokeWidth="1" strokeDasharray="3,3"/>
        <polygon points="190,295 199,289 199,301" fill={NAVY}/>
        <text x="175" y="298" fontSize="12" fontWeight="700" fill={NAVY} textAnchor="end"
          style={{ fontFamily:"sans-serif" }}>BUNGOMA</text>

        {/* KITALE */}
        <line x1="290" y1="260" x2="200" y2="265" stroke={NAVY} strokeWidth="1" strokeDasharray="3,3"/>
        <polygon points="200,265 209,259 209,271" fill={NAVY}/>
        <text x="185" y="268" fontSize="12" fontWeight="700" fill={NAVY} textAnchor="end"
          style={{ fontFamily:"sans-serif" }}>KITALE</text>

        {/* KAKAMEGA */}
        <line x1="288" y1="335" x2="195" y2="340" stroke={NAVY} strokeWidth="1" strokeDasharray="3,3"/>
        <polygon points="195,340 204,334 204,346" fill={NAVY}/>
        <text x="180" y="343" fontSize="12" fontWeight="700" fill={NAVY} textAnchor="end"
          style={{ fontFamily:"sans-serif" }}>KAKAMEGA</text>

        {/* KISUMU */}
        <line x1="295" y1="375" x2="195" y2="378" stroke={NAVY} strokeWidth="1" strokeDasharray="3,3"/>
        <polygon points="195,378 204,372 204,384" fill={NAVY}/>
        <text x="180" y="381" fontSize="12" fontWeight="700" fill={NAVY} textAnchor="end"
          style={{ fontFamily:"sans-serif" }}>KISUMU</text>

        {/* NAKURU */}
        <line x1="390" y1="255" x2="310" y2="310" stroke={NAVY} strokeWidth="1" strokeDasharray="3,3"/>
        <polygon points="310,310 318,302 320,314" fill={NAVY}/>
        <text x="295" y="322" fontSize="12" fontWeight="700" fill={NAVY} textAnchor="end"
          style={{ fontFamily:"sans-serif" }}>NAKURU</text>

        {/* KIAMBU */}
        <line x1="432" y1="232" x2="355" y2="390" stroke={NAVY} strokeWidth="1" strokeDasharray="3,3"/>
        <polygon points="355,390 361,381 367,390" fill={NAVY}/>
        <text x="340" y="402" fontSize="12" fontWeight="700" fill={NAVY} textAnchor="end"
          style={{ fontFamily:"sans-serif" }}>KIAMBU</text>

        {/* NAIROBI */}
        <line x1="422" y1="268" x2="490" y2="680" stroke={NAVY} strokeWidth="1" strokeDasharray="3,3"/>
        <polygon points="490,680 484,671 496,671" fill={NAVY}/>
        <text x="490" y="695" fontSize="13" fontWeight="700" fill={NAVY} textAnchor="middle"
          style={{ fontFamily:"sans-serif" }}>NAIROBI</text>

        {/* KAJIADO */}
        <line x1="435" y1="335" x2="500" y2="590" stroke={NAVY} strokeWidth="1" strokeDasharray="3,3"/>
        <polygon points="500,590 494,581 506,581" fill={NAVY}/>
        <text x="500" y="605" fontSize="12" fontWeight="700" fill={NAVY} textAnchor="middle"
          style={{ fontFamily:"sans-serif" }}>KAJIADO</text>

        {/* MACHAKOS */}
        <line x1="480" y1="305" x2="590" y2="540" stroke={NAVY} strokeWidth="1" strokeDasharray="3,3"/>
        <polygon points="590,540 584,531 596,531" fill={NAVY}/>
        <text x="592" y="555" fontSize="12" fontWeight="700" fill={NAVY} textAnchor="middle"
          style={{ fontFamily:"sans-serif" }}>MACHAKOS</text>

        {/* MERU — right side */}
        <line x1="530" y1="150" x2="620" y2="175" stroke={NAVY} strokeWidth="1" strokeDasharray="3,3"/>
        <polygon points="620,175 611,170 611,180" fill={NAVY}/>
        <text x="635" y="178" fontSize="12" fontWeight="700" fill={NAVY} textAnchor="start"
          style={{ fontFamily:"sans-serif" }}>MERU</text>

        {/* EMBU */}
        <line x1="520" y1="225" x2="620" y2="215" stroke={NAVY} strokeWidth="1" strokeDasharray="3,3"/>
        <polygon points="620,215 611,210 611,220" fill={NAVY}/>
        <text x="635" y="218" fontSize="12" fontWeight="700" fill={NAVY} textAnchor="start"
          style={{ fontFamily:"sans-serif" }}>EMBU</text>

        {/* NYERI */}
        <line x1="470" y1="162" x2="620" y2="195" stroke={NAVY} strokeWidth="1" strokeDasharray="3,3"/>
        <polygon points="620,195 611,190 611,200" fill={NAVY}/>
        <text x="635" y="198" fontSize="12" fontWeight="700" fill={NAVY} textAnchor="start"
          style={{ fontFamily:"sans-serif" }}>NYERI</text>

        {/* LAMU */}
        <line x1="628" y1="392" x2="660" y2="460" stroke={NAVY} strokeWidth="1" strokeDasharray="3,3"/>
        <polygon points="660,460 654,451 666,451" fill={NAVY}/>
        <text x="660" y="475" fontSize="12" fontWeight="700" fill={NAVY} textAnchor="middle"
          style={{ fontFamily:"sans-serif" }}>LAMU</text>

        {/* KILIFI */}
        <line x1="585" y1="510" x2="660" y2="510" stroke={NAVY} strokeWidth="1" strokeDasharray="3,3"/>
        <polygon points="660,510 651,505 651,515" fill={NAVY}/>
        <text x="675" y="513" fontSize="12" fontWeight="700" fill={NAVY} textAnchor="start"
          style={{ fontFamily:"sans-serif" }}>KILIFI</text>

        {/* MOMBASA */}
        <line x1="568" y1="548" x2="660" y2="548" stroke={NAVY} strokeWidth="1" strokeDasharray="3,3"/>
        <polygon points="660,548 651,543 651,553" fill={NAVY}/>
        <text x="675" y="551" fontSize="12" fontWeight="700" fill={NAVY} textAnchor="start"
          style={{ fontFamily:"sans-serif" }}>MOMBASA</text>

        {/* KWALE */}
        <line x1="535" y1="578" x2="660" y2="578" stroke={NAVY} strokeWidth="1" strokeDasharray="3,3"/>
        <polygon points="660,578 651,573 651,583" fill={NAVY}/>
        <text x="675" y="581" fontSize="12" fontWeight="700" fill={NAVY} textAnchor="start"
          style={{ fontFamily:"sans-serif" }}>KWALE</text>

        {/* KITUI */}
        <line x1="540" y1="325" x2="620" y2="390" stroke={NAVY} strokeWidth="1" strokeDasharray="3,3"/>
        <polygon points="620,390 614,381 625,381" fill={NAVY}/>
        <text x="620" y="404" fontSize="12" fontWeight="700" fill={NAVY} textAnchor="middle"
          style={{ fontFamily:"sans-serif" }}>KITUI</text>

        {/* ── KEY legend (bottom-left) ── */}
        <g transform="translate(100, 610)">
          <text x="0" y="0" fontSize="16" fontWeight="800" fill={NAVY}
            style={{ fontFamily:"sans-serif" }}>KEY</text>

          <rect x="0" y="14" width="20" height="20" rx="3" fill={BLUE_C}/>
          <text x="28" y="28" fontSize="12" fill={NAVY} style={{ fontFamily:"sans-serif" }}>
            Business/Enterprise
          </text>

          <rect x="0" y="44" width="20" height="20" rx="3" fill={ORANGE_C}/>
          <text x="28" y="58" fontSize="12" fill={NAVY} style={{ fontFamily:"sans-serif" }}>
            Home
          </text>

          <rect x="0" y="74" width="20" height="20" rx="3" fill={BEIGE_C} stroke={STROKE_C} strokeWidth="1"/>
          <text x="28" y="88" fontSize="12" fill={NAVY} style={{ fontFamily:"sans-serif" }}>
            No Coverage
          </text>
        </g>

      </svg>
    </div>
  );
}

function CoverageMapSection() {
  return (
    <section style={{ background:"#fff", padding:"72px 0 80px" }}>
      <div className="vilcom-section">
        {/* Sub-heading */}
        <h2 style={{ fontSize:"clamp(1.4rem,3vw,1.9rem)", fontWeight:800, color:NAVY,
          textAlign:"center", margin:"0 0 16px" }}>
          Discover the Reach of Vilcom Networks
        </h2>

        {/* Bold subtitle — matches screenshot */}
        <p style={{ fontSize:15.5, fontWeight:700, color:NAVY, textAlign:"center",
          maxWidth:760, margin:"0 auto 56px", lineHeight:1.65 }}>
          Our comprehensive coverage summary, depicted in the accompanying image, highlights the
          vast areas we serve with our top-notch fiber solutions
        </p>

        <KenyaMap />
      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
const CoveragePage = () => (
  <div className="min-h-screen flex flex-col bg-white">
    <ScrollIndicator />
    <Header />
    <main className="flex-1">
      <GlobeSection />
      <CoverageMapSection />
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default CoveragePage;