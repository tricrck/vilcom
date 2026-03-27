/**
 * FiberSolutionsPage.tsx
 * Matches https://vilcom.co.ke/fiber-solutions/
 *
 * The page content is entirely the existing PricingSection component
 * (Home Fiber Plans + Business Fiber Plans).
 * No hero, no extra copy — just Header / PricingSection / Footer.
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollIndicator from "@/components/ScrollIndicator";
import PricingSection from "@/components/PricingSection";
import SEO from "@/components/SEO";
import { serviceSchema, breadcrumbSchema } from "@/lib/useSEO";

const FiberSolutionsPage = () => (
  <>
  <SEO
    title="Fiber Internet Solutions Nairobi | Sigmon Networks"
    description="Enterprise and home fiber optic internet solutions across Nairobi. Symmetric speeds, static IPs, SLA-backed uptime. Get connected today."
    canonical="https://vilcom.onrender.com/fiber-solutions"
    schema={[
      serviceSchema({
        name: "Fiber Internet Solutions",
        description: "High-speed fiber optic internet for homes and businesses in Nairobi, Kenya.",
        url: "https://vilcom.onrender.com/fiber-solutions",
        category: "Internet Service Provider",
      }),
      breadcrumbSchema([
        { name: "Home", url: "https://vilcom.onrender.com/" },
        { name: "Fiber Solutions", url: "https://vilcom.onrender.com/fiber-solutions" },
      ]),
    ]}
  />
  <div className="min-h-screen flex flex-col bg-white">
    <ScrollIndicator />
    <Header />

    <main className="flex-1">
      <PricingSection />
    </main>

    <Footer />
    <WhatsAppButton />
  </div>
  </>
);

export default FiberSolutionsPage;
