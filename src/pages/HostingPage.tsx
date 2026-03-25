import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollIndicator from "@/components/ScrollIndicator";

const HOSTING_URL = "https://hosting.vilcom-net.co.ke/";

const HostingPage = () => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer);
          window.location.href = HOSTING_URL;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ScrollIndicator />
      <Header />

      <main className="flex-1 flex items-center justify-center">
        <div style={{ textAlign: "center", padding: "64px 24px", maxWidth: 520 }}>

          {/* Spinner */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              border: "4px solid #e5e7eb",
              borderTopColor: "#1b75bc",
              animation: "spin 0.9s linear infinite",
              margin: "0 auto 32px",
            }}
          />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

          <h1
            style={{
              fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
              fontWeight: 800,
              color: "#1a2e4a",
              margin: "0 0 12px",
            }}
          >
            Taking you to Hosting Services
          </h1>

          <p style={{ fontSize: 15, color: "#6b7280", margin: "0 0 32px", lineHeight: 1.65 }}>
            You're being redirected to the Sigmon Hosting portal in{" "}
            <strong style={{ color: "#1b75bc" }}>{countdown}</strong> second
            {countdown !== 1 ? "s" : ""}…
          </p>

          <a
            href={HOSTING_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#1b75bc",
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: ".07em",
              textTransform: "uppercase",
              padding: "13px 28px",
              borderRadius: 6,
              textDecoration: "none",
              transition: "background .2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#155e9a")}
            onMouseLeave={e => (e.currentTarget.style.background = "#1b75bc")}
          >
            Go now
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default HostingPage;
