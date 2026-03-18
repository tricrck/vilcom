import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import TemplatePage from "./pages/TemplatePage.tsx";
import NotFound from "./pages/NotFound.tsx";
import GalleryPage from "@/pages/GalleryPage";
import BlogPage from "@/pages/BlogPage";
import CertificationsPage from "@/pages/CertificationsPage";
import ContactPage from "@/pages/ContactPage";
import FAQsPage from "@/pages/FAQsPage";
import CompanyOverviewPage from "./pages/CompanyOverviewPage.tsx";
import PortfolioProjectsPage from "./pages/PortfolioProjectsPage.tsx";
import MediaFeaturesPage from "./pages/MediaFeaturesPage.tsx";
import VutaWifiPage from "./pages/VutaWifiPage.tsx";
import FiberSolutionsPage from "./pages/FiberSolutionsPage.tsx";
import CoveragePage from "./pages/CoveragePage.tsx";
import CareersPage from "./pages/CareersPage.tsx"
import HostingPage from "./pages/HostingPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/company-overview" element={<CompanyOverviewPage />} />
          <Route path="/portfolio-projects" element={<PortfolioProjectsPage />} />
          <Route path="/media-features" element={<MediaFeaturesPage />} />
          <Route path="/vuta-wifi" element={<VutaWifiPage />} />
          <Route path="/fiber-solutions" element={<FiberSolutionsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/coverage" element={<CoveragePage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/faqs" element={<FAQsPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/hosting-services" element={<HostingPage />} />
          <Route path="/web-design" element={<HostingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/:slug" element={<TemplatePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
