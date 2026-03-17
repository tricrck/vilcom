import { Check } from "lucide-react";

function CheckIcon({ blue }: { blue?: boolean }) {
  return (
    <div
      className={`flex items-center justify-center w-5 h-5 rounded-full text-white flex-shrink-0 ${
        blue ? "bg-[#4169ED]" : "bg-[#FF901D]"
      }`}
    >
      <Check size={12} />
    </div>
  );
}

function PlanFeature({ label, blue }: { label: string; blue?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <CheckIcon blue={blue} />
      <span className="text-[14px] text-[#565A62]">{label}</span>
    </div>
  );
}

interface PlanCardProps {
  eyebrow: string;
  eyebrowColor: string;
  speed: string;
  price: string;
  features: string[];
  href: string;
  btnBg: string;
  btnColor: string;
  btnHoverBg: string;
  btnHoverColor: string;
  blue?: boolean;
}

function PlanCard({
  eyebrow,
  eyebrowColor,
  speed,
  price,
  features,
  href,
  btnBg,
  btnColor,
  btnHoverBg,
  btnHoverColor,
  blue,
}: PlanCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
      <div className="border-b border-[#F1F2F5] px-8 pt-6 pb-2">
        <p className="text-[16px] font-bold" style={{ color: eyebrowColor, fontFamily: "'Nunito Sans', sans-serif" }}>
          {eyebrow}
        </p>
        <h3 className="text-[42px] font-bold text-[#233D62] mt-3 mb-4" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
          {speed}
          <small className="text-[18px] font-bold text-[#2d4162] ml-2">
            @{price}/Month
          </small>
        </h3>
      </div>
      <div className="px-10 py-8 flex-1">
        {features.map((f, i) => (
          <PlanFeature key={i} label={f} blue={blue} />
        ))}
      </div>
      <div className="px-10 pb-10">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold uppercase tracking-wider rounded-md transition-all"
          style={{ background: btnBg, color: btnColor }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = btnHoverBg;
            e.currentTarget.style.color = btnHoverColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = btnBg;
            e.currentTarget.style.color = btnColor;
          }}
        >
          Pick this plan
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}

function PlanSection({ title, plans }: { title: string; plans: PlanCardProps[] }) {
  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center pt-12 pb-6">
        <h2 className="text-[34px] md:text-[41px] font-semibold text-[#233D62]" style={{ fontFamily: "'Poppins', sans-serif" }}>
          {title}
        </h2>
      </div>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((p, i) => (
          <PlanCard key={i} {...p} />
        ))}
      </div>
    </section>
  );
}

const HOME_PLANS: PlanCardProps[] = [
  {
    eyebrow: "Starter", eyebrowColor: "#FF901D", speed: "8 Mbps", price: "Ksh 1,999",
    features: ["Unlimited internet access", "Moderate internet speed", "SD Movie & Music Streaming", "Fast web browsing", "SD TV programming", "E-learning & Online meetings"],
    href: "https://vilcom.co.ke/8-mbps/", btnBg: "#FFC992", btnColor: "#FF901D", btnHoverBg: "#FF901D", btnHoverColor: "#fff",
  },
  {
    eyebrow: "Starter", eyebrowColor: "#FF901D", speed: "18 Mbps", price: "Ksh 2,799",
    features: ["Unlimited internet access", "Moderate internet speed", "SD Movie & Music Streaming", "Fast web browsing", "SD TV programming", "E-learning & Online meetings"],
    href: "https://vilcom.co.ke/18-mbps/", btnBg: "#FFC992", btnColor: "#FF901D", btnHoverBg: "#FF901D", btnHoverColor: "#fff",
  },
  {
    eyebrow: "Basic", eyebrowColor: "#FF901D", speed: "30 Mbps", price: "Ksh 3,799",
    features: ["High speed internet", "Fast web browsing", "SD Movie and Music streaming", "HD TV Programming", "E-Learning", "Online meetings"],
    href: "https://vilcom.co.ke/30-mbps/", btnBg: "#FFC992", btnColor: "#FF901D", btnHoverBg: "#FF901D", btnHoverColor: "#fff",
  },
  {
    eyebrow: "Basic", eyebrowColor: "#FF901D", speed: "60 Mbps", price: "Ksh 4,999",
    features: ["High speed internet", "Fast web browsing", "SD Movie and Music streaming", "HD TV Programming", "E-Learning", "Online meetings"],
    href: "https://vilcom.co.ke/60-mbps/", btnBg: "#FFC992", btnColor: "#FF901D", btnHoverBg: "#FF901D", btnHoverColor: "#fff",
  },
  {
    eyebrow: "Standard", eyebrowColor: "#4169ED", speed: "100 Mbps", price: "Ksh 7,999",
    features: ["SD Movie & Music streaming", "HD TV Programming", "Multiple Device Streaming", "Superfast Video Downloads", "Live Video Coverage", "Online Gaming"],
    href: "https://vilcom.co.ke/100-mbps/", btnBg: "#C1CDF6", btnColor: "#4169ED", btnHoverBg: "#4169ED", btnHoverColor: "#fff", blue: true,
  },
];

const BUSINESS_PLANS: PlanCardProps[] = [
  { speed: "40 Mbps", price: "Ksh 4,999", href: "https://vilcom.co.ke/40-mbps-business/" },
  { speed: "80 Mbps", price: "Ksh 6,999", href: "https://vilcom.co.ke/80-mbps-business/" },
  { speed: "120 Mbps", price: "Ksh 12,999", href: "https://vilcom.co.ke/120-mbps-business/" },
  { speed: "200 Mbps", price: "Ksh 20,999", href: "https://vilcom.co.ke/200-mbps-business/" },
  { speed: "300 Mbps", price: "Ksh 29,999", href: "https://vilcom.co.ke/300-mbps-business/" },
  { speed: "500 Mbps", price: "Ksh 38,999", href: "https://vilcom.co.ke/500-mbps-business/" },
].map((p) => ({
  eyebrow: "Business Fiber", eyebrowColor: "#FF901D",
  features: ["Dedicated"],
  btnBg: "#FFC992", btnColor: "#FF901D", btnHoverBg: "#FF901D", btnHoverColor: "#fff",
  ...p,
}));

const PricingSection = () => {
  return (
    <div id="internet-plans">
      <PlanSection title="Home Fiber Plans" plans={HOME_PLANS} />
      <PlanSection title="Business Fiber Plans" plans={BUSINESS_PLANS} />
    </div>
  );
};

export default PricingSection;
