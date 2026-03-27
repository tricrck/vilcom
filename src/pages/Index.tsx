import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import ServicesGrid from "@/components/ServicesGrid";
import CoverageSection from "@/components/CoverageSection"
import PricingSection from "@/components/PricingSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import OurStory from "@/components/OurStory";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollIndicator from "@/components/ScrollIndicator";
import SEO from "@/components/SEO";
import { organizationSchema, websiteSchema, localBusinessSchema } from "@/lib/useSEO";

const Index = () => {
  return (
    <>
    <SEO
      title="Sigmon Networks | High-Speed Fiber Internet in Nairobi, Kenya"
      description="Get affordable, reliable fiber optic internet for your home or business in Nairobi. Plans from KSh 2,500/month. 99.9% uptime. Call us today."
      canonical="https://vilcom.onrender.com/"
      schema={[organizationSchema(), websiteSchema(), localBusinessSchema()]}
    />
    <div className="min-h-screen flex flex-col">
      <ScrollIndicator />
      <Header />
      <main className="flex-1">
        <HeroCarousel />
        <ServicesGrid />
        <CoverageSection />
        <PricingSection />
        <WhyChooseUs />
        <Testimonials />
        <OurStory />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
    </>
  );
};

export default Index;
