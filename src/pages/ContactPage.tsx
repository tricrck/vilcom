import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollIndicator from "@/components/ScrollIndicator";
import {
  ArrowLeft, MapPin, Mail, Phone, Clock, Building2,
  Send, CheckCircle2, AlertCircle,
} from "lucide-react";

/* ─── Contact info ───────────────────────────────────────────── */
const CONTACT_INFO = [
  {
    icon: <Building2 className="w-4 h-4" />,
    label: "Physical Address",
    value: "Ramco Court, Block B, Mombasa Road",
    href: "https://www.google.com/maps/search/Ramco+Court+Block+B+Mombasa+Road+Nairobi",
  },
  {
    icon: <MapPin className="w-4 h-4" />,
    label: "Postal Address",
    value: "P.O Box 24559-00502 Nairobi",
    href: null,
  },
  {
    icon: <Phone className="w-4 h-4" />,
    label: "Phone (Safaricom)",
    value: "0111 028800",
    sub: "Helpline Call Only",
    href: "tel:0111028800",
  },
  {
    icon: <Phone className="w-4 h-4" />,
    label: "Phone (Safaricom)",
    value: "0726 888777",
    sub: "WhatsApp / Call",
    href: "https://wa.me/254726888777",
  },
  {
    icon: <Phone className="w-4 h-4" />,
    label: "Phone (Airtel)",
    value: "0755 055555",
    sub: "WhatsApp / SMS",
    href: "https://wa.me/254755055555",
  },
  {
    icon: <Mail className="w-4 h-4" />,
    label: "Email Address",
    value: "customercare@vilcom.co.ke",
    href: "mailto:customercare@vilcom.co.ke",
  },
  {
    icon: <Clock className="w-4 h-4" />,
    label: "Business Hours",
    value: "Monday – Saturday: 8AM to 5PM",
    href: null,
  },
];

/* ─── Animated underline input ───────────────────────────────── */
function FormField({
  label, type = "text", name, value, onChange,
}: {
  label: string; type?: string; name: string;
  value: string; onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div className="relative pt-5">
      <input
        type={type}
        name={name}
        value={value}
        required
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder=" "
        className="w-full bg-transparent border-b-2 pb-2 pt-1 text-sm text-foreground outline-none transition-colors duration-200 peer"
        style={{ borderBottomColor: focused ? "var(--vilcom-blue,#0ea5e9)" : "hsl(var(--border))" }}
      />
      <label
        className="absolute left-0 pointer-events-none transition-all duration-200 font-semibold uppercase tracking-widest"
        style={{
          top: active ? "0px" : "20px",
          fontSize: active ? "9px" : "12px",
          color: focused ? "var(--vilcom-blue,#0ea5e9)" : "hsl(var(--muted-foreground))",
        }}
      >
        {label}
      </label>
    </div>
  );
}

function FormTextarea({
  label, name, value, onChange,
}: {
  label: string; name: string; value: string; onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div className="relative pt-5 h-full">
      <textarea
        name={name}
        value={value}
        rows={7}
        required
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder=" "
        className="w-full h-full bg-transparent border-b-2 pb-2 pt-1 text-sm text-foreground outline-none resize-none transition-colors duration-200"
        style={{ borderBottomColor: focused ? "var(--vilcom-blue,#0ea5e9)" : "hsl(var(--border))" }}
      />
      <label
        className="absolute left-0 pointer-events-none transition-all duration-200 font-semibold uppercase tracking-widest"
        style={{
          top: active ? "0px" : "20px",
          fontSize: active ? "9px" : "12px",
          color: focused ? "var(--vilcom-blue,#0ea5e9)" : "hsl(var(--muted-foreground))",
        }}
      >
        {label}
      </label>
    </div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────── */
const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  /* Particle positions — static, generated once */
  const particles = useRef(
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: i % 2 === 0 ? "#4169ED" : "#FF901D",
      dur: `${3.5 + i * 0.4}s`,
    }))
  ).current;

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) return;
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1800);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollIndicator />
      <Header />

      <style>{`
        @keyframes drift {
          0%   { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(110px); opacity: 0; }
        }
      `}</style>

      <main className="flex-1">

        {/* ══════ HERO + FORM ══════ */}
        <div
          className="relative overflow-hidden"
          style={{ background: "linear-gradient(180deg, hsl(195 100% 97%) 1%, hsl(0 0% 100%) 100%)" }}
        >
          {/* Particle SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
            {particles.map((p) => (
              <circle
                key={p.id}
                cx={`${p.x}%`} cy={`${p.y}%`}
                r={3.5}
                fill={p.color}
                style={{ animation: `drift ${p.dur} linear infinite` }}
              />
            ))}
          </svg>

          <div className="vilcom-section py-14 md:py-20 relative z-10">
            <Link to="/" className="vilcom-learn-more text-sm mb-8 inline-flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>

            {/* Two-col header — matches original */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10">
              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
                Send a Message
              </h1>
              <div className="sm:text-right pb-1 flex-shrink-0">
                <p className="text-[11px] text-muted-foreground mb-0.5">or Call for Consultation</p>
                <a href="tel:0111028800"
                  className="text-lg font-extrabold text-foreground hover:text-vilcom-blue transition-colors">
                  0111 028800
                </a>
              </div>
            </div>

            {/* Form */}
            {status === "sent" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                <CheckCircle2 className="w-14 h-14 text-green-500" />
                <h3 className="text-xl font-extrabold text-foreground">Message Sent!</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Thank you for reaching out. Our team will get back to you shortly.
                </p>
                <button
                  onClick={() => { setStatus("idle"); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="vilcom-btn-primary mt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
                  {/* Left: name, email, subject */}
                  <div className="flex flex-col gap-6">
                    <FormField label="Your name"  name="name"    value={form.name}    onChange={set("name")} />
                    <FormField label="Your email" name="email"   type="email" value={form.email}   onChange={set("email")} />
                    <FormField label="Subject"    name="subject" value={form.subject} onChange={set("subject")} />
                  </div>
                  {/* Right: message */}
                  <div className="mt-5 md:mt-0">
                    <FormTextarea label="Your message" name="message" value={form.message} onChange={set("message")} />
                  </div>
                </div>

                {/* Consent + submit */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 mt-6 items-center">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    By clicking Send a message, you agree to use our "Form" terms and consent to cookie usage in browser.
                  </p>
                  <div className="flex md:justify-end mt-4 md:mt-0">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="vilcom-btn-primary mt-2"
                    >
                      {status === "sending" ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          Send message
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {status === "error" && (
                  <p className="mt-4 flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4" /> Something went wrong. Please try again.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* ══════ CONTACT INFO ROADMAP ══════ */}
        <div className="vilcom-section py-12 md:py-14">
          <div className="max-w-xl">
            <h2 className="text-xl font-extrabold text-foreground mb-1">Get in Touch</h2>
            <div className="h-px bg-gradient-to-r from-vilcom-blue via-border to-transparent mb-8" />

            <div className="relative pl-10">
              {/* Vertical connecting line */}
              <div
                className="absolute left-[15px] top-3 w-px"
                style={{
                  bottom: "12px",
                  background: "linear-gradient(to bottom, var(--vilcom-blue,#0ea5e9) 0%, hsl(var(--border)) 100%)",
                }}
              />

              {CONTACT_INFO.map((item, i) => (
                <div
                  key={i}
                  className="relative flex items-start gap-4 py-3.5"
                  style={{ borderBottom: i < CONTACT_INFO.length - 1 ? "1px solid hsl(var(--border) / 0.5)" : "none" }}
                >

                  <div className="min-w-0">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-foreground hover:text-vilcom-blue transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-bold text-foreground">{item.value}</p>
                    )}
                    {item.sub && (
                      <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════ MAP ══════ */}
        <div className="vilcom-section pb-14">
          <div className="rounded-xl overflow-hidden border border-border/50 shadow-sm" style={{ height: "280px" }}>
            <iframe
              title="Vilcom Networks — Ramco Court, Mombasa Road"
              src="https://www.openstreetmap.org/export/embed.html?bbox=36.8253%2C-1.3237%2C36.8453%2C-1.3137&layer=mapnik&marker=-1.3187719%2C36.8353887"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Ramco Court, Block B, Mombasa Road, Nairobi ·{" "}
            <a
              href="https://www.google.com/maps/search/Ramco+Court+Block+B+Mombasa+Road+Nairobi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-vilcom-blue hover:underline font-medium"
            >
              Open in Google Maps →
            </a>
          </p>
        </div>

      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ContactPage;