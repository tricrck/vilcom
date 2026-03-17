import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollIndicator from "@/components/ScrollIndicator";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";

/* ─── Data ────────────────────────────────────────────────────── */
const CERTIFICATIONS = [
  {
    id: 1,
    title: "Google IT Support Professional Certificate",
    platform: "Coursera",
    platformColor: "#0056D2",
    url: "https://www.coursera.org/professional-certificates/google-it-support",
    image: "https://vilcom.co.ke/wp-content/uploads/2024/07/Google__CompTIA_Badge.width-500.format-webp.webp",
    category: "IT & Support",
  },
  {
    id: 2,
    title: "Harvard's CS50: Introduction to Computer Science",
    platform: "edX",
    platformColor: "#97002E",
    url: "https://learning.edx.org/course/course-v1:HarvardX+CS50+X/home",
    image: "https://vilcom.co.ke/wp-content/uploads/2024/07/maxresdefault.jpg",
    category: "Computer Science",
  },
  {
    id: 3,
    title: "IBM Data Science Professional Certificate",
    platform: "Coursera",
    platformColor: "#0056D2",
    url: "https://www.coursera.org/professional-certificates/ibm-data-science",
    image: "https://vilcom.co.ke/wp-content/uploads/2024/07/twitter_thumb_201604_image.png",
    category: "Data Science",
  },
  {
    id: 4,
    title: "Microsoft Excel Certification for Data Analysis and Visualization",
    platform: "Microsoft Learn",
    platformColor: "#107C10",
    url: "https://learn.microsoft.com/en-us/certifications/",
    image: "https://vilcom.co.ke/wp-content/uploads/2024/07/Google__CompTIA_Badge.width-500.format-webp.webp",
    category: "Data & Analytics",
  },
  {
    id: 5,
    title: "Python for Everybody Specialization",
    platform: "Coursera",
    platformColor: "#0056D2",
    url: "https://www.coursera.org/specializations/python",
    image: "https://vilcom.co.ke/wp-content/uploads/2024/07/maxresdefault.jpg",
    category: "Programming",
  },
  {
    id: 6,
    title: "Digital Marketing Certification by Google",
    platform: "Google",
    platformColor: "#4285F4",
    url: "https://learndigital.withgoogle.com/digitalgarage/course/digital-marketing",
    image: "https://vilcom.co.ke/wp-content/uploads/2024/07/twitter_thumb_201604_image.png",
    category: "Marketing",
  },
];

const TAGS = [
  "Google IT Support Professional Certificate",
  "Harvard's CS50: Introduction to Computer Science",
  "IBM Data Science Professional Certificate",
  "Microsoft Excel Certification for Data Analysis",
  "Python for Everybody Specialization",
  "Digital Marketing Certification by Google",
];

const CAT_COLORS: Record<string, string> = {
  "IT & Support":    "#e0f2fe",
  "Computer Science":"#ede9fe",
  "Data Science":    "#d1fae5",
  "Data & Analytics":"#fef3c7",
  "Programming":     "#fee2e2",
  "Marketing":       "#fce7f3",
};

const CAT_TEXT: Record<string, string> = {
  "IT & Support":    "#0369a1",
  "Computer Science":"#6d28d9",
  "Data Science":    "#047857",
  "Data & Analytics":"#b45309",
  "Programming":     "#b91c1c",
  "Marketing":       "#9d174d",
};

/* ─── Certification Row ────────────────────────────────────────── */
function CertRow({
  cert,
  index,
}: {
  cert: (typeof CERTIFICATIONS)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const rowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const catBg   = CAT_COLORS[cert.category] ?? "#f1f5f9";
  const catText = CAT_TEXT[cert.category]   ?? "#475569";

  return (
    <div
      ref={rowRef}
      className="relative"
      style={{
        borderBottom: "1px solid hsl(var(--border))",
        animationDelay: `${index * 60}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <a
        href={cert.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-4 py-5 px-1 transition-colors duration-200 hover:bg-muted/30"
        style={{ textDecoration: "none" }}
      >
        {/* Index number */}
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-colors duration-200"
          style={{
            background: hovered ? "var(--vilcom-blue, #0ea5e9)" : "hsl(var(--muted))",
            color: hovered ? "#fff" : "hsl(var(--muted-foreground))",
          }}
        >
          {index + 1}
        </span>

        {/* Title */}
        <span
          className="flex-1 text-[15px] md:text-base font-bold leading-snug transition-colors duration-200"
          style={{ color: hovered ? "var(--vilcom-blue, #0ea5e9)" : "hsl(var(--foreground))" }}
        >
          {cert.title}
        </span>

        {/* Category pill */}
        <span
          className="hidden sm:inline-flex flex-shrink-0 items-center text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
          style={{ background: catBg, color: catText }}
        >
          {cert.category}
        </span>

        {/* Platform badge */}
        <span
          className="flex-shrink-0 text-[11px] font-bold px-2.5 py-1 rounded text-white hidden md:inline-flex"
          style={{ background: cert.platformColor }}
        >
          {cert.platform}
        </span>

        {/* Arrow icon */}
        <ArrowUpRight
          className="flex-shrink-0 w-4 h-4 transition-all duration-200"
          style={{
            color: hovered ? "var(--vilcom-blue, #0ea5e9)" : "hsl(var(--muted-foreground))",
            transform: hovered ? "translate(2px, -2px)" : "translate(0,0)",
          }}
        />
      </a>

      {/* Floating image preview on hover */}
      <div
        className="pointer-events-none absolute z-50 rounded-xl overflow-hidden shadow-2xl border border-border/30"
        style={{
          width: "220px",
          aspectRatio: "16/10",
          left: `${Math.min(mousePos.x + 16, (rowRef.current?.offsetWidth ?? 800) - 240)}px`,
          top: `${mousePos.y - 80}px`,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "scale(1) translateY(0)" : "scale(0.92) translateY(8px)",
          transition: "opacity 0.2s ease, transform 0.2s ease",
        }}
      >
        <img
          src={cert.image}
          alt={cert.title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

/* ─── Floating tag cloud ───────────────────────────────────────── */
function FloatingTags() {
  return (
    <div className="relative overflow-hidden h-[160px] md:h-[180px] pointer-events-none select-none">
      {TAGS.map((tag, i) => {
        const positions = [
          { top: "10%",  left: "2%"  },
          { top: "8%",   left: "30%" },
          { top: "5%",   left: "58%" },
          { top: "52%",  left: "5%"  },
          { top: "55%",  left: "38%" },
          { top: "58%",  left: "68%" },
        ];
        const rotations = [-2, 1.5, -1, 2, -1.5, 1];
        const pos = positions[i] ?? { top: "40%", left: `${i * 15}%` };
        const rot = rotations[i] ?? 0;
        const colors = [
          { bg: "#e0f2fe", text: "#0369a1" },
          { bg: "#ede9fe", text: "#6d28d9" },
          { bg: "#d1fae5", text: "#047857" },
          { bg: "#fef3c7", text: "#b45309" },
          { bg: "#fee2e2", text: "#b91c1c" },
          { bg: "#fce7f3", text: "#9d174d" },
        ];
        const color = colors[i] ?? colors[0];

        return (
          <span
            key={i}
            className="absolute text-[11px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap"
            style={{
              top: pos.top,
              left: pos.left,
              background: color.bg,
              color: color.text,
              transform: `rotate(${rot}deg)`,
              animationName: "floatTag",
              animationDuration: `${3 + i * 0.4}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationDirection: i % 2 === 0 ? "alternate" : "alternate-reverse",
            }}
          >
            {tag.length > 36 ? tag.slice(0, 36) + "…" : tag}
          </span>
        );
      })}
    </div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────── */
const CertificationsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollIndicator />
      <Header />

      <style>{`
        @keyframes floatTag {
          from { transform: translateY(0px) rotate(var(--rot, 0deg)); }
          to   { transform: translateY(-8px) rotate(var(--rot, 0deg)); }
        }
      `}</style>

      <main className="flex-1">

        {/* ── Hero ── */}
        <div
          className="py-12 md:py-16"
          style={{ background: "linear-gradient(180deg, hsl(195 100% 97%) 1%, hsl(0 0% 100%) 100%)" }}
        >
          <div className="vilcom-section text-center flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-3 leading-tight">
              Certifications
            </h1>
            <p className="text-base text-muted-foreground max-w-xl">
              A curated Knowledge Sharing Hub of free online certification courses across various fields.
            </p>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="vilcom-section py-10 md:py-14">

          {/* ── Certifications hero section (dark bg with tags) ── */}
          <div
            className="rounded-2xl overflow-hidden mb-10 relative"
            style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" }}
          >
            {/* Decorative grid lines */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />

            <div className="relative z-10 px-6 md:px-10 pt-8 pb-4">
              {/* Label */}
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-sky-400 mb-3">
                Knowledge Sharing Hub
              </span>

              <div className="flex items-start justify-between gap-4 mb-6">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                  Free Online<br />
                  <span className="text-sky-400">Certifications</span>
                </h2>
                <span className="text-3xl select-none hidden sm:block">✏️</span>
              </div>

              {/* Floating tags */}
              <FloatingTags />
            </div>
          </div>

          {/* ── Introduction ── */}
          <div className="mb-10 max-w-3xl">
            <h3 className="text-lg font-extrabold text-foreground mb-3">Introduction</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Welcome to our{" "}
              <span className="font-semibold" style={{ color: "#ff901d" }}>Knowledge Sharing Hub</span>{" "}
              for{" "}
              <span className="font-semibold" style={{ color: "#4169ed" }}>Free Online Certifications!</span>{" "}
              Here, you'll find a curated list of free certification courses across various fields. Whether
              you're looking to enhance your technical skills, delve into business management, or explore
              creative arts, we've got you covered. Choosing the right certification is crucial — consider
              your career goals, the credibility of the certification, and the time you can commit.
            </p>
          </div>

          {/* ── Certification Links List ── */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-extrabold text-foreground">Certification Links List</h3>
              <span className="text-[11px] text-muted-foreground font-medium">
                {CERTIFICATIONS.length} courses
              </span>
            </div>
            <div className="h-px bg-gradient-to-r from-vilcom-blue via-border to-transparent mb-2" />

            {/* Hover-preview list */}
            <div className="relative">
              {CERTIFICATIONS.map((cert, i) => (
                <CertRow key={cert.id} cert={cert} index={i} />
              ))}
            </div>
          </div>

          {/* ── Browse more CTA ── */}
          <div className="mt-10 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-foreground">Looking for more?</p>
              <p className="text-xs text-muted-foreground">Explore thousands more free courses on these platforms.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { name: "Coursera", url: "https://www.coursera.org", color: "#0056D2" },
                { name: "edX",      url: "https://www.edx.org",      color: "#97002E" },
                { name: "Google",   url: "https://learndigital.withgoogle.com", color: "#4285F4" },
              ].map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[12px] font-bold px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-90"
                  style={{ background: p.color }}
                >
                  {p.name}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default CertificationsPage;
