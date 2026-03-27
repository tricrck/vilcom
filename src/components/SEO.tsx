/**
 * SEO.tsx — Drop-in head manager for every page.
 * Requires:  npm install react-helmet-async
 * Wrap <App> with <HelmetProvider> (see App.tsx snippet below).
 *
 * Usage:
 *   <SEO
 *     title="Fiber Internet Nairobi | Sigmon Networks"
 *     description="Affordable, high-speed fiber optic internet..."
 *     canonical="https://vilcom.onrender.com/fiber-solutions"
 *     image="https://vilcom.co.ke/wp-content/uploads/2024/06/og_fiber.jpg"
 *     type="website"          // or "article"
 *     schema={schemaObject}   // optional JSON-LD
 *   />
 */

import { Helmet } from "react-helmet-async";

const SITE_NAME = "Sigmon Networks Limited";
const SITE_URL  = "https://vilcom.onrender.com";
const DEFAULT_IMG =
  "https://vilcom.co.ke/wp-content/uploads/2024/06/gallery_1.jpg";

interface SEOProps {
  title:        string;           // Full <title> string  (≤ 60 chars ideal)
  description:  string;           // Meta description    (120–155 chars ideal)
  canonical?:   string;           // Absolute URL for this page
  image?:       string;           // OG / Twitter card image (1200×630 ideal)
  type?:        "website" | "article";
  noIndex?:     boolean;
  schema?:      Record<string, unknown> | Record<string, unknown>[];
}

const SEO = ({
  title,
  description,
  canonical,
  image = DEFAULT_IMG,
  type  = "website",
  noIndex = false,
  schema,
}: SEOProps) => {
  const fullCanonical = canonical ?? SITE_URL;

  return (
    <Helmet>
      {/* ── Core ── */}
      <title>{title}</title>
      <meta name="description"       content={description} />
      <link rel="canonical"          href={fullCanonical} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* ── Open Graph ── */}
      <meta property="og:site_name"  content={SITE_NAME} />
      <meta property="og:type"       content={type} />
      <meta property="og:title"      content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url"        content={fullCanonical} />
      <meta property="og:image"      content={image} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale"     content="en_KE" />

      {/* ── Twitter Card ── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={image} />

      {/* ── JSON-LD Structured Data ── */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(schema) ? schema : schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;