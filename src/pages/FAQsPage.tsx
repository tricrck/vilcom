import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollIndicator from "@/components/ScrollIndicator";
import { ArrowLeft, Plus, Minus } from "lucide-react";

/* ─── FAQ Data ───────────────────────────────────────────────── */
const FAQ_GROUPS = [
  {
    group: "General",
    faqs: [
      {
        q: "How can I get through to Vilcom Networks in case I have an issue with my network?",
        a: (
          <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <p>Whenever you have an issue with your network that you're unable to solve, call our helpline contacts which can be found on a sticker attached to your router.</p>
            <p>The contacts are:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Safaricom: <strong className="text-foreground">0111 028800</strong> (Helpline Call Only)</li>
              <li>Safaricom: <strong className="text-foreground">0726 888777</strong> (WhatsApp/Call)</li>
              <li>Airtel: <strong className="text-foreground">0755 055555</strong> (WhatsApp/SMS)</li>
            </ul>
            <p>You can also reach us via email: <strong className="text-foreground">customercare@vilcom.co.ke</strong> or on social media <strong className="text-foreground">@vilcomnetworks</strong> on Facebook, Instagram and Twitter.</p>
          </div>
        ),
      },
      {
        q: "What different packages does Vilcom offer and which best suits me?",
        a: (
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>Vilcom Networks offers internet solutions for both home and business.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-muted/40 rounded-lg p-4">
                <p className="font-bold text-foreground mb-2">🏠 Home Packages</p>
                <ul className="space-y-1">
                  {[["8 Mbps","1,999"],["18 Mbps","2,799"],["30 Mbps","3,799"],["60 Mbps","4,999"],["100 Mbps","7,999"],["500 Mbps","11,999"]].map(([s,p]) => (
                    <li key={s} className="flex justify-between">
                      <span>{s}</span><span className="font-semibold text-foreground">Ksh {p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-muted/40 rounded-lg p-4">
                <p className="font-bold text-foreground mb-2">🏢 Business Packages <span className="text-[11px] font-normal">(VAT inclusive)</span></p>
                <ul className="space-y-1">
                  {[["40 Mbps","4,999"],["80 Mbps","6,999"],["120 Mbps","12,999"],["200 Mbps","20,999"],["300 Mbps","29,999"],["500 Mbps","38,999"]].map(([s,p]) => (
                    <li key={s} className="flex justify-between">
                      <span>{s}</span><span className="font-semibold text-foreground">Ksh {p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ),
      },
      {
        q: "How do I connect my Smart TV to my Vilcom Internet?",
        a: (
          <ol className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground leading-relaxed">
            <li>Turn on your Smart TV</li>
            <li>Access the Settings Menu</li>
            <li>Select Network Settings</li>
            <li>Choose Wireless (WiFi) Connection</li>
            <li>Scan for WiFi Networks</li>
            <li>Select your home WiFi network (SSID)</li>
            <li>Enter your WiFi Password</li>
            <li>Connect to WiFi</li>
          </ol>
        ),
      },
      {
        q: "Are there any offers for new customers?",
        a: <p className="text-sm text-muted-foreground leading-relaxed">To know if there are any offers, kindly check our social media platforms. Once connected to an agent, they will communicate any available offers and confirm your eligibility.</p>,
      },
      {
        q: "Where do you have coverage?",
        a: (
          <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
            <p>We have coverage in: <strong className="text-foreground">Nakuru, Rongai, Ruiru, Kileleshwa, Kilimani, South C, Muthangari, Westlands, Mombasa, Kakamega, Meru, Lodwar, Bungoma and Eldoret.</strong></p>
            <p>You can always share your location with us for more clarity.</p>
          </div>
        ),
      },
      {
        q: "What does the red LOS indicator mean on my router?",
        a: (
          <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
            <p><strong className="text-foreground">LOS</strong> means Loss of Signal. When the red LOS indicator blinks, there's a fiber issue — either a fiber cut or a loose patch cord.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Try unplugging and re-plugging the slim patch cord at the back of your router.</li>
              <li>If the indicator persists, contact our support team.</li>
            </ul>
            <img src="https://vilcom.co.ke/wp-content/uploads/2024/06/los_pic-300x67.jpg" alt="LOS indicator on router" className="mt-3 rounded-md border border-border max-w-[300px]" />
          </div>
        ),
      },
      {
        q: "How soon can my repair be done after reporting?",
        a: (
          <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
            <p>Once you report an issue, we assess whether technical intervention is needed. A repair ticket is created and assigned to a technician who will contact you.</p>
            <p>Some repairs may take longer than others — the technician will keep you updated. If your issue hasn't been resolved within <strong className="text-foreground">48 hours</strong>, please contact customer support.</p>
          </div>
        ),
      },
      {
        q: "How can I get connected to Vilcom Networks?",
        a: (
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground leading-relaxed">
            <li>Call our helpline or email us (see FAQ 1). A sales agent will call you to create a Vilcom account.</li>
            <li>Once your account is ready, a technician will be dispatched to install your connection.</li>
            <li>Standard installation timeline is <strong className="text-foreground">48 hours</strong>. We always strive to connect clients on the same day of onboarding.</li>
          </ul>
        ),
      },
      {
        q: "I'm experiencing slow speeds. What do I do?",
        a: (
          <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
            <p>Run a speed test at <a href="https://www.speedtest.net/" target="_blank" rel="noopener noreferrer" className="text-vilcom-blue font-semibold hover:underline">speedtest.net</a> next to your router with only one device connected.</p>
            <p>A good result is at least 50–100% of your subscribed speed. If speeds are below this, contact us to troubleshoot.</p>
          </div>
        ),
      },
      {
        q: "How do I pay for my subscription?",
        a: (
          <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
            <p>You can pay via <strong className="text-foreground">M-Pesa</strong> or <strong className="text-foreground">bank transfer</strong>.</p>
            <div className="bg-muted/40 rounded-lg p-4 space-y-1">
              <p className="font-bold text-foreground">M-Pesa</p>
              <p>Paybill: <strong className="text-foreground">4062755</strong></p>
              <p>Account: from your installation email (e.g. 210**** or 211****)</p>
            </div>
            <div className="bg-muted/40 rounded-lg p-4 space-y-1">
              <p className="font-bold text-foreground">Bank Transfer</p>
              <p>Account Name: <strong className="text-foreground">VILCOM NETWORKS LIMITED</strong></p>
              <p>Account Number: <strong className="text-foreground">2043645032</strong></p>
              <p>Bank: <strong className="text-foreground">Absa Bank Kenya PLC — Westgate Branch</strong></p>
            </div>
          </div>
        ),
      },
      {
        q: "How can I get my Vilcom WiFi password or username changed?",
        a: (
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground leading-relaxed">
            <li>Contact us via helpline (FAQ 1) or WhatsApp.</li>
            <li>Or submit the request via: <a href="https://mobile.vilcom.co.ke/" target="_blank" rel="noopener noreferrer" className="text-vilcom-blue font-semibold hover:underline">mobile.vilcom.co.ke</a></li>
            <li>The new password must be at least <strong className="text-foreground">8 characters</strong>.</li>
          </ul>
        ),
      },
      {
        q: "I referred a client. How do I claim my referral offer?",
        a: <p className="text-sm text-muted-foreground">Currently, we do not have referral offers.</p>,
      },
      {
        q: "Does Vilcom have any service offers?",
        a: (
          <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
            <p>We issue service offers occasionally. There are two types:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-foreground">50% discount</strong> — pay half the service package price</li>
              <li><strong className="text-foreground">100% discount</strong> — pay the full amount</li>
            </ul>
            <p>Eligible customers receive an SMS from the <strong className="text-foreground">VILCOM</strong> team.</p>
          </div>
        ),
      },
    ],
  },
  {
    group: "Account & Billing",
    faqs: [
      {
        q: "Can I suspend my account?",
        a: (
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground leading-relaxed">
            <li>Permitted for customers who will be away for more than <strong className="text-foreground">10 days</strong>.</li>
            <li>Please inform us of the proposed suspension dates so our team can assist accordingly.</li>
          </ul>
        ),
      },
      {
        q: "I would like to upgrade or downgrade my package. What do I need to do?",
        a: <p className="text-sm text-muted-foreground leading-relaxed">Contact us on any of our channels (FAQ 1) and we'll facilitate your change of service.</p>,
      },
      {
        q: "What if I want to relocate and I'm not sure if Vilcom covers the area?",
        a: (
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground leading-relaxed">
            <li>Call us (FAQ 1) or share your live WhatsApp location.</li>
            <li>We'll confirm coverage and raise a relocation ticket for our technicians to move your equipment.</li>
          </ul>
        ),
      },
      {
        q: "A simple guide on how to share your location on WhatsApp:",
        a: (
          <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
            <div className="flex gap-2 flex-wrap">
              {["pic1","pic2","pic3","pic4"].map((p) => (
                <img key={p} src={`https://vilcom.co.ke/wp-content/uploads/2024/06/${p}-165x300.jpg`} alt={`WhatsApp step ${p}`} className="h-[140px] w-auto rounded-md border border-border" />
              ))}
            </div>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Access the attachment option on WhatsApp and tap <strong className="text-foreground">Location</strong>.</li>
              <li>Allow GPS access when prompted.</li>
              <li>Your live location will appear — tap <strong className="text-foreground">Share Live Location</strong>.</li>
              <li>Send to one of our WhatsApp contacts (see FAQ 1).</li>
            </ol>
          </div>
        ),
      },
      {
        q: "Can I leave with the Vilcom Router?",
        a: <p className="text-sm text-muted-foreground leading-relaxed">No. If you no longer need our services or are relocating outside coverage, please contact us so a technician can retrieve the router.</p>,
      },
      {
        q: "Do you offer bundled services such as TV or phone?",
        a: <p className="text-sm text-muted-foreground leading-relaxed">At the moment, Vilcom offers <strong className="text-foreground">Fibre Internet</strong> (home & business), <strong className="text-foreground">Wireless Hotspots</strong> and <strong className="text-foreground">Web Hosting Services</strong>.</p>,
      },
      {
        q: "What happens in case of a service outage?",
        a: (
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground leading-relaxed">
            <li>You'll receive an SMS about the issue, our resolution plan, and confirmation once resolved.</li>
            <li>If you receive no SMS, contact us to verify the number on your account.</li>
          </ul>
        ),
      },
      {
        q: "How does Vilcom billing work?",
        a: (
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground leading-relaxed">
            <li>Billing works on an <strong className="text-foreground">anniversary basis</strong> — if you pay on the 25th, your next due date is the 25th of the following month.</li>
            <li>Late payments shift the billing date accordingly.</li>
            <li>Make early payments to avoid interruptions.</li>
          </ul>
        ),
      },
      {
        q: "How can I check the number of devices connected to my internet?",
        a: (
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground leading-relaxed">
            <li>Contact us via the helpline and we'll help check connected devices.</li>
            <li>If suspicious devices are found, change your password or restrict connections.</li>
            <li>Be cautious — sharing your password or QR code gives others access to your network.</li>
          </ul>
        ),
      },
      {
        q: "Why do I experience frequent disconnections?",
        a: <p className="text-sm text-muted-foreground leading-relaxed">Intermittent disruptions can result from equipment issues, signal interference, or network problems. Contact our customer care team for diagnosis and resolution.</p>,
      },
      {
        q: "What do I do if I make a wrong payment?",
        a: <p className="text-sm text-muted-foreground leading-relaxed">Reach out via the helpline (FAQ 1) immediately and we'll rectify the error as quickly as possible.</p>,
      },
      {
        q: "How can I improve my Wi-Fi signal strength?",
        a: <p className="text-sm text-muted-foreground leading-relaxed">Place the router in a central location, reduce interference from other devices, and consider using Wi-Fi extenders for larger spaces.</p>,
      },
      {
        q: "Can I pre-pay for my subscription months in advance?",
        a: (
          <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
            <p>Yes! Pre-payment rewards:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-foreground">6 months pre-paid</strong> → get 1 month free</li>
              <li><strong className="text-foreground">12 months pre-paid</strong> → get 2 months free</li>
            </ul>
          </div>
        ),
      },
    ],
  },
];

/* ─── Accordion Item ─────────────────────────────────────────── */
function AccordionItem({
  q, a, index, groupIndex,
}: {
  q: string;
  a: React.ReactNode;
  index: number;
  groupIndex: number;
}) {
  const [open, setOpen] = useState(false);
  const id = `faq-${groupIndex}-${index}`;

  return (
    <div className={`border-b border-border/60 transition-colors duration-200 ${open ? "bg-muted/20" : ""}`}>
      <button
        id={`${id}-btn`}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-4 px-1 text-left group"
      >
        <span className={`text-[13.5px] font-semibold leading-snug transition-colors duration-200 ${open ? "text-vilcom-blue" : "text-foreground group-hover:text-vilcom-blue"}`}>
          {q}
        </span>
        <span
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: open ? "var(--vilcom-blue, #0ea5e9)" : "hsl(var(--muted))",
            color: open ? "#fff" : "hsl(var(--muted-foreground))",
          }}
        >
          {open
            ? <Minus className="w-3 h-3" strokeWidth={2.5} />
            : <Plus className="w-3 h-3" strokeWidth={2.5} />
          }
        </span>
      </button>

      <div
        id={id}
        role="region"
        aria-labelledby={`${id}-btn`}
        style={{
          maxHeight: open ? "600px" : "0",
          overflow: "hidden",
          transition: "max-height 0.35s ease",
        }}
      >
        <div className="pb-5 px-1">{a}</div>
      </div>
    </div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────── */
const FAQsPage = () => {
  const [activeGroup, setActiveGroup] = useState(0);

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollIndicator />
      <Header />

      <main className="flex-1">
        {/* ── Hero ── */}
        <div
          className="py-12 md:py-16"
          style={{ background: "linear-gradient(180deg, hsl(195 100% 97%) 1%, hsl(0 0% 100%) 100%)" }}
        >
          <div className="vilcom-section text-center flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-3 leading-tight">FAQs</h1>
            <p className="text-base text-muted-foreground max-w-lg">
              Everything you need to know about Vilcom Networks — getting connected, billing, troubleshooting and more.
            </p>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="vilcom-section py-10 md:py-14">
          <div className="flex flex-col lg:flex-row gap-10 items-start">

            {/* ── Sticky sidebar tabs ── */}
            <aside className="w-full lg:w-52 flex-shrink-0 lg:sticky" style={{ top: "24px" }}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Categories</p>
              <nav className="flex flex-row lg:flex-col gap-1">
                {FAQ_GROUPS.map((g, i) => (
                  <button
                    key={g.group}
                    onClick={() => setActiveGroup(i)}
                    className={`text-left text-sm font-semibold px-3 py-2 rounded-lg transition-all duration-200 ${
                      activeGroup === i
                        ? "bg-vilcom-blue text-white"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {g.group}
                    <span className={`ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeGroup === i ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}`}>
                      {g.faqs.length}
                    </span>
                  </button>
                ))}
              </nav>

              {/* Contact card */}
              <div className="hidden lg:block mt-6 rounded-xl p-4 text-sm" style={{ background: "linear-gradient(135deg, #0f172a, #1e3a5f)" }}>
                <p className="text-white font-bold mb-1">Still need help?</p>
                <p className="text-white/60 text-xs mb-3 leading-relaxed">Our team is ready to assist you.</p>
                <a
                  href="tel:0111028800"
                  className="block text-center text-xs font-bold bg-vilcom-blue text-white px-3 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Call 0111 028800
                </a>
              </div>
            </aside>

            {/* ── FAQ list ── */}
            <div className="flex-1 min-w-0">
              {FAQ_GROUPS.map((group, gi) => (
                <div
                  key={group.group}
                  style={{ display: activeGroup === gi ? "block" : "none" }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-extrabold text-foreground">{group.group}</h2>
                    <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {group.faqs.length} questions
                    </span>
                  </div>
                  <div className="h-px bg-gradient-to-r from-vilcom-blue via-border to-transparent mb-4" />

                  <div>
                    {group.faqs.map((faq, i) => (
                      <AccordionItem
                        key={i}
                        q={faq.q}
                        a={faq.a}
                        index={i}
                        groupIndex={gi}
                      />
                    ))}
                  </div>
                </div>
              ))}

              {/* ── Speed Test ── */}
              <div className="mt-14">
                <h2 className="text-xl font-extrabold text-foreground mb-1">Automatic Speed Test</h2>
                <div className="h-px bg-gradient-to-r from-vilcom-blue via-border to-transparent mb-6" />
                <div className="rounded-xl overflow-hidden border border-border/50 shadow-sm" style={{ minHeight: "360px" }}>
                  <div style={{ width: "100%", height: 0, paddingBottom: "50%", position: "relative" }}>
                    <iframe
                      src="//www.metercustom.net/test/?th=w&hl=en"
                      title="Speed Test"
                      style={{
                        border: "none",
                        position: "absolute",
                        top: 0, left: 0,
                        width: "100%",
                        height: "100%",
                        minHeight: "360px",
                        overflow: "hidden",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default FAQsPage;
