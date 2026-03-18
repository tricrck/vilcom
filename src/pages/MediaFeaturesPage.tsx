/**
 * MediaFeaturesPage.tsx
 * Matches https://vilcom.co.ke/media-features/ exactly.
 *
 * Structure per article card (lqd-lp-item):
 *   - Featured image (full width, correct aspect ratio from SVG viewBox)
 *   - Source favicon (40×40) + source name
 *   - Article title (h5, bold dark navy)
 *   - Date
 *   - "Learn More" link (blue, hover underline)
 */

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollIndicator from "@/components/ScrollIndicator";

/* ─── Design tokens ──────────────────────────────────────────── */
const NAVY   = "#1a2e4a";
const BLUE   = "#1b75bc";
const BODY   = "#3d3d3d";
const LIGHT  = "#6b7280";
const BORDER = "#e5e7eb";

/* ─── Media articles data (from live page HTML) ──────────────── */
const ARTICLES = [
  {
    image: "https://vilcom.co.ke/wp-content/uploads/2024/06/Kilamtu_Plain_Compressed.jpg",
    imgW: 1024, imgH: 487,
    favicon: "https://www.google.com/s2/favicons?domain=businessnow.co.ke&sz=40",
    source: "businessnow.co.ke",
    title: "How Vilcom Network's staff empowerment will drive customer satisfaction",
    date: "August 18, 2025",
    url: "https://businessnow.co.ke/how-vilcom-networks-staff-empowerment-will-drive-customer-satisfaction/",
  },
  {
    image: "https://vilcom.co.ke/wp-content/uploads/2024/06/Kilamtu_Plain_Compressed.jpg",
    imgW: 1024, imgH: 487,
    favicon: "https://www.google.com/s2/favicons?domain=nipashebiz.co.ke&sz=40",
    source: "nipashebiz.co.ke",
    title: "Vilcom Networks Concludes 4-Cohort Customer Service & Experience Training for All Staff",
    date: "August 18, 2025",
    url: "https://nipashebiz.co.ke/vilcom-networks-concludes-4-cohort-customer-service-experience-training-for-all-staff/",
  },
  {
    image: "https://vilcom.co.ke/wp-content/uploads/2024/06/Kilamtu_Plain_Compressed.jpg",
    imgW: 1024, imgH: 487,
    favicon: "https://www.google.com/s2/favicons?domain=newsline.co.ke&sz=40",
    source: "newsline.co.ke",
    title: "Vilcom Networks Concludes 4-Cohort Mandatory Customer Service & Experience Training for All Staff",
    date: "August 16, 2025",
    url: "https://www.newsline.co.ke/vilcom-networks-concludes-4-cohort-mandatory-customer-service-experience-training-for-all-staff/",
  },
  {
    image: "https://vilcom.co.ke/wp-content/uploads/2024/06/Kilamtu_Plain_Compressed.jpg",
    imgW: 860, imgH: 590,
    favicon: "https://www.google.com/s2/favicons?domain=kbc.co.ke&sz=40",
    source: "KBC Digital",
    title: "Vilcom Networks,IEK sign landmark partnership to bridge digital, engineering divide",
    date: "June 3, 2025",
    url: "https://www.kbc.co.ke/vilcom-networksiek-sign-landmark-partnership-to-bridge-digital-engineering-divide/",
  },
  {
    image: "https://vilcom.co.ke/wp-content/uploads/2024/06/Kilamtu_Plain_Compressed.jpg",
    imgW: 1599, imgH: 720,
    favicon: "https://www.google.com/s2/favicons?domain=the-star.co.ke&sz=40",
    source: "The Star",
    title: "Telecom firms urged to consider safety when putting cables on power lines",
    date: "19 May 2025",
    url: "https://www.the-star.co.ke/news/2025-05-19-telecom-firms-urged-consider-safety-when-putting-cables-on-power-lines",
  },
  {
    image: "https://vilcom.co.ke/wp-content/uploads/2024/06/Kilamtu_Plain_Compressed.jpg",
    imgW: 1024, imgH: 682,
    favicon: "https://www.google.com/s2/favicons?domain=tukio.co.ke&sz=40",
    source: "Tukio",
    title: "Communication Authority of Kenya Ranks Vilcom Networks 5th in Broadband Market After Market Share Surge",
    date: "March 29, 2025",
    url: "https://tukio.co.ke/communication-authority-of-kenya-ranks-vilcom-networks-5th-in-broadband-market-after-market-share-surge/",
  },
  {
    image: "https://vilcom.co.ke/wp-content/uploads/2024/06/Kilamtu_Plain_Compressed.jpg",
    imgW: 1500, imgH: 1016,
    favicon: "https://www.google.com/s2/favicons?domain=techweez.com&sz=40",
    source: "Techweez",
    title: "List of Home Internet Service Providers in Kenya with 2025 Prices",
    date: "January 25, 2025",
    url: "https://techweez.com/2025/01/03/list-of-home-internet-service-providers-in-kenya-with-2025-prices/",
  },
  {
    image: "https://vilcom.co.ke/wp-content/uploads/2024/06/Kilamtu_Plain_Compressed.jpg",
    imgW: 6240, imgH: 4160,
    favicon: "https://www.google.com/s2/favicons?domain=businessdailyafrica.com&sz=40",
    source: "Business Daily",
    title: "CA flags illegal internet service providers in Kenya",
    date: "Tuesday, December 31, 2024",
    url: "https://www.businessdailyafrica.com/bd/corporate/technology/ca-flags-illegal-internet-service-providers-in-kenya-4874782",
  },
  {
    image: "https://vilcom.co.ke/wp-content/uploads/2024/06/Kilamtu_Plain_Compressed.jpg",
    imgW: 1200, imgH: 1200,
    favicon: "https://www.google.com/s2/favicons?domain=mountkenyatimes.co.ke&sz=40",
    source: "Mountkenyatimes",
    title: "Vilcom Networks In Comprehensive Revamp Of Its Pricing Structure for Fiber To Home",
    date: "October 2, 2024",
    url: "https://mountkenyatimes.co.ke/vilcom-networks-in-comprehensive-revamp-of-its-pricing-structure-for-fiber-to-home/",
  },
  {
    image: "https://vilcom.co.ke/wp-content/uploads/2024/06/Kilamtu_Plain_Compressed.jpg",
    imgW: 1024, imgH: 802,
    favicon: "https://www.google.com/s2/favicons?domain=tukio.co.ke&sz=40",
    source: "Tukio",
    title: "Vilcom Networks Bridges Digital Divide with High-Speed Internet in Rural Kenya",
    date: "December 17, 2024",
    url: "https://tukio.co.ke/vilcom-networks-bridges-digital-divide-with-high-speed-internet-in-rural-kenya/",
  },
  {
    image: "https://vilcom.co.ke/wp-content/uploads/2024/06/Kilamtu_Plain_Compressed.jpg",
    imgW: 1950, imgH: 2724,
    favicon: "https://www.google.com/s2/favicons?domain=tuko.co.ke&sz=40",
    source: "Tuko",
    title: "Vilcom Slashes Wi-Fi Prices, Ups Speed to Hit 500Mbps after Safaricom, Starlink Market Moves",
    date: "September 30, 2024",
    url: "https://www.tuko.co.ke/business-economy/technology/563959-internet-showdown-vilcom-slashes-wi-fi-prices-ups-speed-safaricom-starlink-moves/",
  },
  {
    image: "https://vilcom.co.ke/wp-content/uploads/2024/06/Kilamtu_Plain_Compressed.jpg",
    imgW: 1440, imgH: 960,
    favicon: "https://www.google.com/s2/favicons?domain=the-star.co.ke&sz=40",
    source: "The Star",
    title: "Internet of Things is the new world order",
    date: "30 August 2024",
    url: "https://www.the-star.co.ke/opinion/columnists/2024-08-30-internet-of-things-is-the-new-world-order",
  },
  {
    image: "https://vilcom.co.ke/wp-content/uploads/2024/06/Kilamtu_Plain_Compressed.jpg",
    imgW: 700, imgH: 350,
    favicon: "https://www.google.com/s2/favicons?domain=kenyans.co.ke&sz=40",
    source: "Kenyans.co.ke",
    title: "Vilcom Networks Limited Ranked 6th in Broadband Service Provision",
    date: "Wed, 10 July 2024",
    url: "https://www.kenyans.co.ke/industry/102576-vilcom-networks-limited-ranked-6th-broadband-service-provision",
  },
  {
    image: "https://vilcom.co.ke/wp-content/uploads/2024/06/Kilamtu_Plain_Compressed.jpg",
    imgW: 6720, imgH: 4480,
    favicon: "https://www.google.com/s2/favicons?domain=kenyans.co.ke&sz=40",
    source: "Kenyans.co.ke",
    title: "Vilcom Networks Opens New Office in Ongata Rongai as Company Expands Footprint",
    date: "Tue, 28 May 2024",
    url: "https://www.kenyans.co.ke/industry/101128-vilcom-networks-opens-new-office-ongata-rongai-company-expands-footprint",
  },
];

/* ─── Scroll reveal ──────────────────────────────────────────── */
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

/* ─── Single article card ────────────────────────────────────── */
interface Article {
  image: string;
  imgW: number;
  imgH: number;
  favicon: string;
  source: string;
  title: string;
  date: string;
  url: string;
}

function ArticleCard({ article, index }: { article: Article; index: number }) {
  const { ref, on } = useReveal(Math.min(index % 3, 2) * 80);
  const [learnHov, setLearnHov] = useState(false);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${BORDER}`,
        borderRadius: 8,
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        opacity: on ? 1 : 0,
        transform: on ? "none" : "translateY(18px)",
        transition: `opacity .55s ease, transform .55s ease`,
      }}
    >
      {/* Featured image — correct aspect ratio */}
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "block",
          width: "100%",
          aspectRatio: `${article.imgW} / ${article.imgH}`,
          overflow: "hidden",
          flexShrink: 0,
          background: "#f0f2f5",
        }}
      >
        <img
          src={article.image}
          alt={article.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
            transition: "transform .4s ease",
          }}
          loading="lazy"
          onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"}
          onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"}
        />
      </a>

      {/* Card body */}
      <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", flex: 1 }}>

        {/* Source row: favicon + name */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <img
            src={article.favicon}
            alt={article.source}
            width={20}
            height={20}
            style={{ borderRadius: 4, flexShrink: 0 }}
            loading="lazy"
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
          <span style={{ fontSize: 13, color: LIGHT, fontWeight: 500 }}>
            {article.source}
          </span>
        </div>

        {/* Title */}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <h5
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: NAVY,
              margin: "0 0 12px",
              lineHeight: 1.5,
            }}
          >
            {article.title}
          </h5>
        </a>

        {/* Date */}
        <p style={{ fontSize: 13, color: LIGHT, margin: "0 0 16px", lineHeight: 1.4 }}>
          {article.date}
        </p>

        {/* Learn More */}
        <div style={{ marginTop: "auto" }}>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setLearnHov(true)}
            onMouseLeave={() => setLearnHov(false)}
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: BLUE,
              textDecoration: learnHov ? "underline" : "none",
              letterSpacing: ".02em",
              transition: "color .2s",
            }}
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
const MediaFeaturesPage = () => {
  const { ref: headRef, on: headOn } = useReveal(0);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ScrollIndicator />
      <Header />

      <main className="flex-1">
        <div style={{ height: 48 }} />

        <div className="vilcom-section">

          {/* ── Heading ── */}
          <div
            ref={headRef}
            style={{
              marginBottom: 44,
              textAlign: "center",
              opacity: headOn ? 1 : 0,
              transform: headOn ? "none" : "translateY(12px)",
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
              }}
            >
              Media Features
            </h2>
          </div>

          {/* ── 3-column article grid ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
              gap: 28,
            }}
          >
            {ARTICLES.map((article, i) => (
              <ArticleCard key={i} article={article} index={i} />
            ))}
          </div>

        </div>

        <div style={{ height: 72 }} />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default MediaFeaturesPage;
