/**
 * useSEO.ts — Pre-built JSON-LD schema helpers for Sigmon Networks.
 *
 * Each helper returns a ready-made schema object you pass to <SEO schema={...} />.
 *
 * Schemas included:
 *   - Organization       → use on every page (global)
 *   - WebSite            → homepage
 *   - WebPage            → generic inner pages
 *   - BlogPosting        → individual blog posts
 *   - BreadcrumbList     → any page with a breadcrumb trail
 *   - FAQPage            → FAQs page
 *   - LocalBusiness      → reinforces local SEO for Nairobi
 *   - Service            → fiber / hosting / web-design pages
 */

const SITE_URL   = "https://vilcom.onrender.com";
const SITE_NAME  = "Sigmon Networks Limited";
const LOGO_URL   = "https://vilcom.co.ke/wp-content/uploads/2024/06/vilcom-logo.png";
const NAIROBI_GEO = { "@type": "GeoCoordinates", latitude: -1.286389, longitude: 36.817223 };

/* ── 1. Organization (global — inject on every page) ── */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: LOGO_URL,
    sameAs: [
      "https://vilcom.co.ke",
      "https://www.facebook.com/vilcomnetworks",
      "https://twitter.com/vilcomnetworks",
      "https://www.linkedin.com/company/vilcom-networks",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+254-700-000-000",   // ← replace with real number
      contactType: "customer service",
      areaServed: "KE",
      availableLanguage: ["English", "Swahili"],
    },
  };
}

/* ── 2. WebSite (homepage only) ── */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/blog?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/* ── 3. LocalBusiness (Nairobi ISP) ── */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    url: SITE_URL,
    image: LOGO_URL,
    priceRange: "KSh",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Nairobi",            // ← refine if you have a street address
      addressLocality: "Nairobi",
      addressRegion: "Nairobi County",
      postalCode: "00100",
      addressCountry: "KE",
    },
    geo: NAIROBI_GEO,
    telephone: "+254-700-000-000",         // ← replace
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "13:00",
      },
    ],
  };
}

/* ── 4. WebPage (generic inner pages) ── */
export function webPageSchema({
  name,
  description,
  url,
  breadcrumbs,
}: {
  name: string;
  description: string;
  url: string;
  breadcrumbs?: { name: string; url: string }[];
}) {
  const base: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    isPartOf: { "@id": SITE_URL },
    inLanguage: "en-KE",
  };

  if (breadcrumbs) {
    base.breadcrumb = breadcrumbSchema(breadcrumbs);
  }

  return base;
}

/* ── 5. BreadcrumbList ── */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/* ── 6. BlogPosting (for individual blog post pages if you add them) ── */
export function blogPostingSchema({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName = SITE_NAME,
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image,
    url,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Organization",
      name: authorName,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: LOGO_URL },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

/* ── 7. FAQPage ── */
export function faqPageSchema(
  questions: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
}

/* ── 8. Service (fiber / hosting / web-design) ── */
export function serviceSchema({
  name,
  description,
  url,
  category,
}: {
  name: string;
  description: string;
  url: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    serviceType: category,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Place",
      name: "Nairobi, Kenya",
    },
  };
}