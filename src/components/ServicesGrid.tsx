const SERVICES = [
  { tag: 'Internet · Connectivity', title: 'Enterprise Connectivity', desc: 'Secure, reliable, and scalable network solutions that keep your business seamlessly connected.', img: 'https://vilcom.co.ke/wp-content/uploads/2026/02/pic1.png', href: '#internet-plans' },
  { tag: 'Clouds · Solutions', title: 'Cloud Solutions', desc: 'Vilcom Drive/Photos services for storage, collaboration, and flexible digital growth.', img: 'https://vilcom.co.ke/wp-content/uploads/2026/02/service_2.png', href: '#' },
  { tag: 'Cyber Security', title: 'Cyber Security', desc: 'Safeguard your data, people, and business against digital threats.', img: 'https://vilcom.co.ke/wp-content/uploads/2026/02/service_3.png', href: '#' },
  { tag: 'Smart · Integration', title: 'Smart Integration', desc: 'IoT and digital tools to streamline and transform business operations.', img: 'https://vilcom.co.ke/wp-content/uploads/2026/02/service_4.png', href: '#' },
  { tag: 'Software · Development', title: 'Android, iOS, & Web Development', desc: 'Custom app and web solutions tailored for your business needs.', img: 'https://vilcom.co.ke/wp-content/uploads/2026/02/service_5.png', href: '#' },
  { tag: 'ERP · Streamline. Simplify. Succeed', title: 'ERP As A Service', desc: 'Integrated enterprise management tools for efficient business processes.', img: 'https://vilcom.co.ke/wp-content/uploads/2026/02/service_6.png', href: '#' },
  { tag: 'ISP Billing · Smart billing, seamless growth', title: 'ISP Billing As A Service', desc: 'Simplified, automated billing solutions for Internet Service Providers.', img: 'https://vilcom.co.ke/wp-content/uploads/2026/02/service_7.png', href: '#' },
  { tag: 'ISP CPE · Plug in. Power up. Provisioned', title: 'ISP CPE Auto-Provisioning As A Service', desc: 'Automated customer device setup for smooth ISP operations.', img: 'https://vilcom.co.ke/wp-content/uploads/2026/02/service_8.png', href: '#' },
  { tag: 'ISP Device Management · Control every device, anywhere', title: 'ISP Device Management As A Service', desc: 'Centralized control and monitoring of ISP devices.', img: 'https://vilcom.co.ke/wp-content/uploads/2026/02/service_9.png', href: '#' },
  { tag: 'Firewall Solutions · Your digital shield, always on', title: 'Firewall Solutions for Enterprise and Home', desc: 'Advanced protection against network threats for businesses and homes.', img: 'https://vilcom.co.ke/wp-content/uploads/2026/02/service_10.png', href: '#' },
  { tag: 'Deep Packet Inspection · See deeper. Secure smarter', title: 'Deep Packet Inspection As A Service', desc: 'Real-time traffic analysis for optimized network performance and security.', img: 'https://vilcom.co.ke/wp-content/uploads/2026/02/service_11.png', href: '#' },
  { tag: 'Satellite Connectivity · Connecting the unserved, everywhere', title: 'Remote Area Satellite Connectivity', desc: 'Amazon Leo/Starlink services delivering reliable internet in hard-to-reach locations.', img: 'https://vilcom.co.ke/wp-content/uploads/2026/02/service_12.png', href: '#' },
];

const ServicesGrid = () => {
  return (
    <section id="services">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-12 pb-8 text-center">
        <h2 className="text-[34px] md:text-[41px] font-semibold text-[#233D62]" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Our Services
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <div key={i} className="bg-white rounded overflow-hidden flex flex-col">
            <div className="relative h-[220px] overflow-hidden">
              <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/35" />
            </div>
            <div className="px-8 pt-5 pb-8 flex flex-col">
              <p className="text-[13px] text-[#7A7A7A] mb-1" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                {s.tag}
              </p>
              <h5 className="text-[19px] font-semibold text-[#233D62] mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {s.title}
              </h5>
              <p className="text-[14px] text-[#485666] leading-relaxed mb-4 pr-6">
                {s.desc}
              </p>
              <a
                href={s.href}
                className="flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-[#54595F]"
              >
                Learn More
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesGrid;
