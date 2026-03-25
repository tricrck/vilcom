import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "@/assets/sigmon-logo.jpeg";
import PDFModal from "@/components/PDFModal";

const aboutDropdown = [
  { label: "Company Overview", to: "/company-overview" },
  { label: "Portfolio Projects", to: "/portfolio-projects" },
  { label: "Gallery", to: "/gallery" },
  { label: "Media Features", to: "/media-features" },
  // PDF items — `pdf` field triggers modal instead of navigation
  {
    label: "ISO 9001 Certification",
    to: "/iso-9001",
    pdf: "/documents/iso-9001-certification.pdf",
  },
  {
    label: "ISO 27001 Certification",
    to: "/iso-27001",
    pdf: "/documents/iso-27001-certification.pdf",
  },
  {
    label: "Health Safety & Well Being Policy",
    to: "/health-safety-policy",
    pdf: "/documents/health-safety-policy.pdf",
  },
  {
    label: "Quality & Information Security Policy",
    to: "/quality-security-policy",
    pdf: "/documents/quality-security-policy.pdf",
  },
];

const productsDropdown = [
  { label: "Vuta Wifi", to: "/vuta-wifi" },
  { label: "Fiber Solutions", to: "/fiber-solutions" },
  { label: "Hosting Services", to: "/hosting-services" },
  { label: "Web Design & Development", to: "/web-design" },
];

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "#", dropdown: aboutDropdown },
  { label: "Products & Services", to: "#", dropdown: productsDropdown },
  { label: "Coverage", to: "/coverage" },
  { label: "Blog", to: "/blog" },
  { label: "Careers", to: "/careers" },
  { label: "Certifications", to: "/certifications" },
  { label: "FAQs", to: "/faqs" },
  { label: "Contact Us", to: "/contact" },
];

interface DropdownItem {
  label: string;
  to: string;
  pdf?: string;
}

interface PDFModalState {
  isOpen: boolean;
  title: string;
  pdfPath: string;
}

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [pdfModal, setPdfModal] = useState<PDFModalState>({
    isOpen: false,
    title: "",
    pdfPath: "",
  });
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location]);

  const openPDF = (item: DropdownItem) => {
    setPdfModal({ isOpen: true, title: item.label, pdfPath: item.pdf! });
    setOpenDropdown(null);
    setMobileOpen(false);
  };

  const closePDF = () =>
    setPdfModal((prev) => ({ ...prev, isOpen: false }));

  /** Renders a single dropdown item — navigates or opens PDF modal */
  const renderDropdownItem = (item: DropdownItem) => {
    if (item.pdf) {
      return (
        <button
          key={item.to}
          onClick={() => openPDF(item)}
          className="w-full text-left flex items-center gap-2 px-5 py-2.5 text-primary font-semibold hover:text-vilcom-orange hover:bg-muted transition-colors group"
        >
          {item.label}
        </button>
      );
    }

    return (
      <Link
        key={item.to}
        to={item.to}
        className="block px-5 py-2.5 text-primary font-semibold hover:text-vilcom-orange hover:bg-muted transition-colors"
      >
        {item.label}
      </Link>
    );
  };

  return (
    <>
      {/* PDF Modal */}
      <PDFModal
        isOpen={pdfModal.isOpen}
        onClose={closePDF}
        title={pdfModal.title}
        pdfPath={pdfModal.pdfPath}
      />

      {/* Gradient bar */}
      <div className="vilcom-gradient-bar w-full" />

      <header
        className={`w-full z-50 transition-all duration-300 ${
          isSticky
            ? "static top-0 left-0 bg-background/97 backdrop-blur-md"
            : "static top-0 left-0 relative bg-background"
        }`}
        style={isSticky ? { boxShadow: "0 2px 28px rgba(0,0,0,0.05)" } : {}}
      >
        <div className="vilcom-section flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Sigmon Networks Limited." className="h-14 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-0">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative group"
                onMouseEnter={() => link.dropdown && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={link.to}
                  className={`vilcom-nav-link flex items-center gap-1 ${
                    location.pathname === link.to ? "active" : ""
                  }`}
                  onClick={(e) => {
                    if (link.dropdown) e.preventDefault();
                  }}
                >
                  {link.label}
                  {link.dropdown && <ChevronDown className="w-4 h-4" />}
                </Link>

                {link.dropdown && openDropdown === link.label && (
                  <div
                    className="absolute top-full left-0 bg-card rounded-lg py-2 min-w-[280px] z-50"
                    style={{ boxShadow: "var(--shadow-card-hover)" }}
                  >
                    {link.dropdown.map((item) => renderDropdownItem(item as DropdownItem))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="xl:hidden p-2 text-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="xl:hidden bg-card border-t border-border pb-6">
            {navLinks.map((link) => (
              <div key={link.label}>
                <div className="flex items-center justify-between">
                  <Link
                    to={link.to}
                    className="vilcom-nav-link block w-full text-left"
                    onClick={(e) => {
                      if (link.dropdown) {
                        e.preventDefault();
                        setOpenDropdown(
                          openDropdown === link.label ? null : link.label,
                        );
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                  {link.dropdown && (
                    <ChevronDown
                      className={`w-5 h-5 mr-4 text-primary transition-transform ${
                        openDropdown === link.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>

                {link.dropdown && openDropdown === link.label && (
                  <div className="pl-6 bg-muted/50">
                    {link.dropdown.map((item) => renderDropdownItem(item as DropdownItem))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </header>
    </>
  );
};

export default Header;