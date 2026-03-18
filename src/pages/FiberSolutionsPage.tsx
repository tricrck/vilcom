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

const FiberSolutionsPage = () => (
  <div className="min-h-screen flex flex-col bg-white">
    <ScrollIndicator />
    <Header />

    <main className="flex-1">
      <PricingSection />
    </main>

    <Footer />
    <WhatsAppButton />
  </div>
);

export default FiberSolutionsPage;
