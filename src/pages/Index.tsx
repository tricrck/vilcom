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

const Index = () => {
  return (
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
  );
};

export default Index;
