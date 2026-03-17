import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollIndicator from "@/components/ScrollIndicator";
import { ArrowLeft } from "lucide-react";

const templateContent: Record<string, { title: string; description: string }> = {
  "company-overview": { title: "Company Overview", description: "Learn about Vilcom Networks Ltd., our mission, vision, and the team behind Kenya's leading fiber internet provider." },
  "portfolio-projects": { title: "Portfolio Projects", description: "Explore our portfolio of successful projects and deployments across Kenya." },
  "gallery": { title: "Gallery", description: "Browse through our gallery of images showcasing our infrastructure, events, and team." },
  "media-features": { title: "Media Features", description: "Vilcom Networks in the media — press coverage, interviews, and featured articles." },
  "iso-9001": { title: "ISO 9001 Certification", description: "View our ISO 9001 Quality Management System certification." },
  "iso-27001": { title: "ISO 27001 Certification", description: "View our ISO 27001 Information Security Management certification." },
  "health-safety-policy": { title: "Health Safety & Well Being Policy", description: "Our commitment to the health, safety, and wellbeing of our employees and stakeholders." },
  "quality-security-policy": { title: "Quality & Information Security Policy", description: "Our Quality and Information Security Policy ensuring the highest standards." },
  "vuta-wifi": { title: "Vuta Wifi", description: "Vuta Wifi — affordable, fast Wi-Fi hotspot solutions for public areas and businesses." },
  "fiber-solutions": { title: "Fiber Solutions", description: "Enterprise and residential fiber optic internet solutions tailored to your needs." },
  "hosting-services": { title: "Hosting Services", description: "Reliable web hosting services with 99.9% uptime guarantee." },
  "web-design": { title: "Web Design & Development", description: "Professional web design and development services for modern businesses." },
  "coverage": { title: "Coverage", description: "Check our fiber coverage areas across Kenya. We're constantly expanding!" },
  "blog": { title: "Our Blog", description: "Stay updated with the latest news, tips, and insights from Vilcom Networks." },
  "careers": { title: "Careers", description: "Join the Vilcom Networks team. Explore current job openings and grow your career with us." },
  "certifications": { title: "Certifications", description: "View all our industry certifications and quality assurance credentials." },
  "faqs": { title: "FAQs", description: "Frequently asked questions about our internet plans, installation, and services." },
  "contact": { title: "Contact Us", description: "Get in touch with our team. We're here to help with any questions or concerns." },
  "terms": { title: "Terms & Conditions", description: "Read our terms and conditions for using Vilcom Networks services." },
  "privacy": { title: "Privacy Policy", description: "Learn how we protect and handle your personal information." },
  "copyright": { title: "Copyright Policy", description: "Our copyright policy and intellectual property guidelines." },
  "password-change": { title: "Password Change", description: "Change your Vilcom Networks account password securely." },
  "8-mbps": { title: "8 Mbps Home Plan", description: "Explorer plan — 8 Mbps unlimited internet at Ksh 2,499/month. Perfect for basic browsing and streaming." },
  "18-mbps": { title: "18 Mbps Home Plan", description: "Starter plan — 18 Mbps unlimited internet at Ksh 2,799/month. Great for e-learning and online meetings." },
  "30-mbps": { title: "30 Mbps Home Plan", description: "Basic plan — 30 Mbps high speed internet at Ksh 3,799/month. HD streaming and multiple devices." },
  "60-mbps": { title: "60 Mbps Home Plan", description: "Advance plan — 60 Mbps high speed internet at Ksh 4,999/month. HD streaming and gaming." },
  "100-mbps": { title: "100 Mbps Home Plan", description: "Pro plan — 100 Mbps ultra fast internet at Ksh 6,999/month. The ultimate home internet experience." },
  "40-mbps-business": { title: "40 Mbps Business Plan", description: "Dedicated 40 Mbps business fiber at Ksh 4,999/month." },
  "80-mbps-business": { title: "80 Mbps Business Plan", description: "Dedicated 80 Mbps business fiber at Ksh 6,999/month." },
  "120-mbps-business": { title: "120 Mbps Business Plan", description: "Dedicated 120 Mbps business fiber at Ksh 12,999/month." },
};

const TemplatePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const content = slug ? templateContent[slug] : null;

  const title = content?.title || "Page";
  const description = content?.description || "This page is coming soon.";

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollIndicator />
      <Header />
      <main className="flex-1">
        {/* Hero banner */}
        <div
          className="py-16 md:py-24"
          style={{ background: "linear-gradient(180deg, hsl(195 100% 97%) 1%, hsl(0 0% 100%) 100%)" }}
        >
          <div className="vilcom-section">
            <Link to="/" className="vilcom-learn-more text-sm mb-6 inline-flex">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">{title}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">{description}</p>
          </div>
        </div>

        {/* Placeholder content */}
        <div className="vilcom-section py-16">
          <div className="vilcom-card max-w-3xl mx-auto text-center py-16">
            <div className="w-16 h-16 bg-vilcom-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🚀</span>
            </div>
            <h2 className="text-2xl font-extrabold text-foreground mb-3">Coming Soon</h2>
            <p className="text-muted-foreground mb-6">
              This page is currently under development. Check back soon for updates!
            </p>
            <Link to="/" className="vilcom-btn-primary">
              Return Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default TemplatePage;
