const SOCIALS = [
  { icon: 'facebook', href: 'https://www.facebook.com/vilcomnetworks', vb: '0 0 448 512', d: 'M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z' },
  { icon: 'instagram', href: 'https://www.instagram.com/vilcomnetworks/', vb: '0 0 448 512', d: 'M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z' },
  { icon: 'x-twitter', href: 'https://twitter.com/vilcomnetworks', vb: '0 0 512 512', d: 'M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z' },
  { icon: 'tiktok', href: 'https://www.tiktok.com/@vilcomnetworks', vb: '0 0 448 512', d: 'M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z' },
  { icon: 'linkedin', href: 'https://www.linkedin.com/company/vilcomnetworks', vb: '0 0 448 512', d: 'M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z' },
  { icon: 'youtube', href: 'https://www.youtube.com/@vilcomnetworksltd', vb: '0 0 576 512', d: 'M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z' },
];

const ABOUT_LINKS = [
  { label: 'Company Overview', href: '/company-overview' },
  { label: 'Portfolio Projects', href: '/portfolio-projects' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact Us', href: '/contact' },
];
const COMPANY_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Coverage', href: '/coverage' },
  { label: 'Password Change', href: 'https://mobile.vilcom.co.ke/' },
  { label: 'FAQs', href: '/faqs' },
];
const FIBER_LINKS = [
  { label: '8 Mbps', href: '/8-mbps' },
  { label: '18 Mbps', href: '/18-mbps' },
  { label: '30 Mbps', href: '/30-mbps' },
  { label: '60 Mbps', href: '/60-mbps' },
  { label: '100 Mbps', href: '/100-mbps' },
];

const LEGAL_LINKS = [
  { label: 'Terms & Conditions', href: 'https://vilcom.co.ke/Vilcom_Terms_&_Conditions.pdf' },
  { label: 'Privacy Policy', href: 'https://vilcom.co.ke/wp-content/uploads/2025/12/VILCOM-PRIVACY-POLICY.pdf' },
  { label: 'Copyright Policy', href: 'https://vilcom.co.ke/Copyright_Policy_Web.pdf' },
];

function FooterMenuCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="footer-col">
      <h3 className="footer-col-title">{title}</h3>
      <ul>
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href}>{l.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const Footer = () => {
  return (
    <footer className="main-footer site-footer">
      <style>{`
        .main-footer { background-color: #FFFFFF; color: rgba(0,22,52,0.7); font-family: 'Nunito', sans-serif; }
        .main-footer a:not(.btn) { color: rgba(54,85,128,0.7); text-decoration: none; transition: color 0.3s; }
        .main-footer a:not(.btn):hover { color: #001634; }

        .footer-app-section {
          background-image: url("https://vilcom.co.ke/wp-content/uploads/2026/02/BG-6.png");
          background-repeat: no-repeat;
          background-size: contain;
          padding: 60px 20px 0;
          position: relative;
          overflow: hidden;
          max-width: 879px;
          margin: 0 auto;
        }

        .footer-avatar-right {
          position: absolute;
          right: 120px;
          top: 60px;
          width: 76px;
          pointer-events: none;
        }
        .footer-avatar-left {
          position: absolute;
          left: 60px;
          bottom: 0;
          width: 115px;
          pointer-events: none;
        }
        @media (max-width: 1199px) {
          .footer-avatar-right { right: 20px; top: 0; }
        }
        @media (max-width: 767px) {
          .footer-avatar-right, .footer-avatar-left { display: none; }
        }

        .footer-pill-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #FAFAFA;
          border-radius: 99px;
          padding: 8px 11px;
          margin-bottom: 30px;
          width: 340px;
          max-width: 100%;
        }
        @media (max-width: 767px) { .footer-pill-row { width: 330px; } }
        .footer-pill-new {
          font-size: 15px;
          padding: 0 8px;
          border: 1px solid rgba(0,0,0,0.05);
          border-radius: 99px;
          white-space: nowrap;
        }
        .footer-pill-text {
          font-size: 15px;
          flex: 1;
          text-align: center;
          padding: 0 8px;
        }

        .footer-app-heading {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(32px, 6vw, 60px);
          font-weight: 700;
          text-transform: uppercase;
          line-height: 1.1;
          color: #233D62;
          margin: 0 0 16px;
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 8px;
        }
        @media (max-width: 767px) {
          .footer-app-heading { font-size: 14vw; }
        }
        .footer-app-heading img.inline-icon {
          height: 0.75em;
          vertical-align: baseline;
          display: inline-block;
        }
        .footer-app-heading img.inline-icon-android {
          height: 0.5em;
          vertical-align: middle;
          margin-bottom: 0.2em;
        }

        .footer-reveal-text {
          font-size: 19px;
          text-align: center;
          opacity: 0.7;
          max-width: 70%;
          margin: 0 auto 50px;
          line-height: 1.6;
          color: #233D62;
        }
        @media (max-width: 767px) { .footer-reveal-text { max-width: 100%; } }

        .footer-download-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          width: 30%;
          margin: 0 auto 50px;
        }
        @media (max-width: 767px) { .footer-download-row { width: 100%; } }
        .footer-download-label {
          font-size: 15px;
          text-align: center;
          white-space: nowrap;
          color: rgba(0,22,52,0.7);
        }
        .footer-dl-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid currentColor;
          color: #FF901D;
          fill: #FF901D;
          background: transparent;
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
        }
        .footer-dl-btn:hover {
          background: #4169ED;
          color: #FF901D;
        }
        .footer-dl-btn svg { width: 22px; height: 22px; }

        .footer-newsletter-section {
          padding: 60px 0 0;
          max-width: 1200px;
          margin: 0 auto;
        }
        @media (max-width: 1199px) { .footer-newsletter-section { padding: 60px 35px 0; } }
        @media (max-width: 767px) { .footer-newsletter-section { padding: 60px 15px 0; } }

        .footer-newsletter-inner {
          display: flex;
          gap: 30px;
          flex-wrap: wrap;
        }
        .footer-newsletter-col {
          width: 53.03%;
          min-width: 240px;
          display: flex;
          align-items: center;
        }
        @media (max-width: 1199px) { .footer-newsletter-col { width: 100%; } }

        .footer-subscribe-form {
          width: 100%;
        }
        .footer-subscribe-form input[type="email"] {
          display: block;
          width: 100%;
          padding: 14px 120px 14px 16px;
          border: 1px solid #FFFFFF;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          border-radius: 4px;
          font-size: 14px;
          color: #7E8085;
          font-family: 'Nunito', sans-serif;
          outline: none;
          box-sizing: border-box;
        }
        .footer-subscribe-form input[type="email"]:focus { color: #000; }
        .footer-subscribe-wrap {
          position: relative;
        }
        .footer-subscribe-btn {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #00937E;
          font-size: 14px;
          font-family: 'Nunito', sans-serif;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 8px;
          transition: color 0.2s;
        }
        .footer-subscribe-btn:hover { color: #000; }

        .footer-main-section {
          padding: 50px 0 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        @media (max-width: 1199px) { .footer-main-section { padding: 50px 35px 20px; } }
        @media (max-width: 767px) { .footer-main-section { padding: 50px 15px 20px; } }

        .footer-main-inner {
          display: flex;
          gap: 0;
          flex-wrap: wrap;
        }
        .footer-brand-col {
          width: 43.919%;
          min-width: 260px;
          padding: 10px 90px 10px 10px;
          margin-bottom: 30px;
          box-sizing: border-box;
        }
        @media (max-width: 1199px) { .footer-brand-col { padding: 10px; width: 100%; } }

        .footer-brand-col img.footer-logo {
          display: block;
          width: 350px;
          max-width: 100%;
          margin-bottom: 35px;
        }
        .footer-brand-col p {
          font-size: 15px;
          line-height: 1.7;
          color: rgba(0,22,52,0.7);
          margin: 0 0 2em;
        }
        .footer-socials {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          align-items: center;
        }
        .footer-socials a {
          display: inline-flex;
          color: rgba(0,22,52,0.7);
          transition: fill 0.3s, color 0.3s;
        }
        .footer-socials a:hover { color: #002352; }
        .footer-socials svg { width: 25px; height: 25px; }

        .footer-nav-cols {
          width: 56.081%;
          min-width: 260px;
          display: flex;
          gap: 0;
          flex-wrap: wrap;
          margin-bottom: 30px;
        }
        @media (max-width: 1199px) { .footer-nav-cols { width: 100%; } }

        .footer-col {
          width: 33.333%;
          padding: 0 10px;
          box-sizing: border-box;
        }
        @media (max-width: 767px) { .footer-col { width: 50%; } }

        .footer-col-title {
          font-family: 'Poppins', sans-serif;
          font-size: 16px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #233D62;
          margin: 0 0 1.35em;
        }
        .footer-col ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .footer-col ul li {
          margin-bottom: 10px;
        }
        .footer-col ul li a {
          font-size: 15px;
          color: #ED6A04;
          text-decoration: none;
          transition: color 0.3s;
        }
        .footer-col ul li a:hover { color: #FF901D; }

        .footer-legal {
          text-align: center;
          padding: 6px 0;
          color: #FF901D;
        }
        .footer-legal h6 {
          font-family: 'Poppins', sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: #FF901D;
          margin: 0;
        }
        .footer-legal h6 a {
          color: #FF901D;
          text-decoration: none;
          cursor: pointer;
        }
        .footer-legal h6 a:hover { color: #FF901D; }
        .footer-copyright {
          text-align: center;
          padding: 8px 0 24px;
          font-family: 'Poppins', sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: #FF901D;
        }
      `}</style>

      {/* 1. APP DOWNLOAD SECTION */}
      <div style={{ background: '#fff' }}>
        <div className="footer-app-section">
          <img
            className="footer-avatar-right"
            src="https://vilcom.co.ke/wp-content/uploads/2026/02/Avatar.png"
            alt=""
          />
          <img
            className="footer-avatar-left"
            src="https://vilcom.co.ke/wp-content/uploads/2026/02/Avatar-2.png"
            alt=""
          />

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="footer-pill-row">
              <span className="footer-pill-new">New</span>
              <span className="footer-pill-text">Download our new Vilcom mobile app</span>
            </div>
          </div>

          <h1 className="footer-app-heading" style={{ justifyContent: 'center' }}>
            <span>Vilcom App for</span>
            <br style={{ width: '100%' }} />
            <img
              src="https://vilcom.co.ke/wp-content/uploads/2026/02/apple.svg"
              alt="Apple"
              className="inline-icon"
              style={{ height: '60px', verticalAlign: 'baseline' }}
            />
            <span>iOS and Android</span>
            <img
              src="https://vilcom.co.ke/wp-content/uploads/2026/02/android.svg"
              alt="Android"
              className="inline-icon-android"
              style={{ height: '49px', verticalAlign: 'middle' }}
            />
          </h1>

          <p className="footer-reveal-text">
            Experience the new Vilcom mobile app to manage your account and devices with effortless control and real-time updates, putting the power of your entire service ecosystem directly into the palm of your hand for a truly streamlined and intuitive experience.
          </p>

          <div className="footer-download-row">
            <span className="footer-download-label">Download for</span>
            <a
              href="https://apps.apple.com/ke/app/vilcom-official-app/id6754469103"
              className="footer-dl-btn"
              target="_blank"
              rel="noreferrer"
              title="App Store"
            >
              <svg viewBox="0 0 512 512" fill="currentColor">
                <path d="M255.9 120.9l9.1-15.7c5.6-9.8 18.1-13.1 27.9-7.5 9.8 5.6 13.1 18.1 7.5 27.9l-87.5 151.5h63.3c20.5 0 32 24.1 23.1 40.8H113.8c-11.3 0-20.4-9.1-20.4-20.4 0-11.3 9.1-20.4 20.4-20.4h52l66.6-115.4-20.8-36.1c-5.6-9.8-2.3-22.2 7.5-27.9 9.8-5.6 22.2-2.3 27.9 7.5l8.9 15.7zm-78.7 218l-19.6 34c-5.6 9.8-18.1 13.1-27.9 7.5-9.8-5.6-13.1-18.1-7.5-27.9l14.6-25.2c16.4-5.1 29.8-1.2 40.4 11.6zm168.9-61.7h53.1c11.3 0 20.4 9.1 20.4 20.4 0 11.3-9.1 20.4-20.4 20.4h-29.5l19.9 34.5c5.6 9.8 2.3 22.2-7.5 27.9-9.8 5.6-22.2 2.3-27.9-7.5-33.5-58.1-58.7-101.6-75.4-130.6-17.1-29.5-4.9-59.1 7.2-69.1 13.4 23 33.4 57.7 60.1 104zM256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216z"/>
              </svg>
            </a>
            <a
              href="https://play.google.com/store/search?q=Vilcom&c=apps&hl=en"
              className="footer-dl-btn"
              target="_blank"
              rel="noreferrer"
              title="Google Play"
            >
              <svg viewBox="0 0 512 512" fill="currentColor">
                <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* 2. NEWSLETTER SECTION */}
      <div style={{ background: '#fff' }}>
        <div className="footer-newsletter-section">
          <div className="footer-newsletter-inner">
            <div className="footer-newsletter-col">
              <div className="footer-subscribe-form">
                <div className="footer-subscribe-wrap">
                  <input type="email" placeholder="Your email to start" />
                  <button type="submit" className="footer-subscribe-btn">
                    Subscribe →
                  </button>
                </div>
              </div>
            </div>
            <div style={{ flex: '1', minWidth: 200 }} />
          </div>
        </div>
      </div>

      {/* 3. MAIN INFO + LINKS SECTION */}
      <div style={{ background: '#fff' }}>
        <div className="footer-main-section">
          <div className="footer-main-inner">
            <div className="footer-brand-col">
              <img
                className="footer-logo"
                src="https://vilcom.co.ke/wp-content/uploads/2026/02/new_logo.png"
                alt="Vilcom Networks Ltd."
              />
              <p>
                At Vilcom, we provide plans suitable for both home and office. The contacts are: Safaricom:{' '}
                <strong>0111 028800</strong> (Helpline Call Only), Safaricom:{' '}
                <strong>0726888777</strong> (Whatsapp), Airtel:{' '}
                <strong>0755055555</strong> (Whatsapp/SMS). You can also reach out to us via email:{' '}
                <strong>customercare@vilcom.co.ke</strong> &amp; on our social media platforms:
              </p>
              <ul className="footer-socials" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {SOCIALS.map((s) => (
                  <li key={s.icon}>
                    <a href={s.href} target="_blank" rel="noreferrer">
                      <svg viewBox={s.vb} fill="currentColor" aria-hidden="true">
                        <path d={s.d} />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-nav-cols">
              <FooterMenuCol title="About us" links={ABOUT_LINKS} />
              <FooterMenuCol title="Company" links={COMPANY_LINKS} />
              <FooterMenuCol title="Home Fiber" links={FIBER_LINKS} />
            </div>
          </div>
        </div>
      </div>

      {/* 4. LEGAL BAR */}
      {LEGAL_LINKS.map((l) => (
        <div className="footer-legal" key={l.label}>
          <h6>
            <a href={l.href} target="_blank" rel="noreferrer">
              {l.label}
            </a>
          </h6>
        </div>
      ))}
      <div className="footer-copyright">
        © 2026 All rights reserved by Nerdware Systems Limited
      </div>
    </footer>
  );
};

export default Footer;
