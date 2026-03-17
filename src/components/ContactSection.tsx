const ContactSection = () => {
  return (
    <section
      id="contact"
      style={{
        background: '#F8F9FF',
        padding: '75px 0 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        .contact-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          gap: 40px;
          align-items: center;
          flex-wrap: wrap;
        }
        .contact-left {
          flex: 0 0 50%;
          min-width: 280px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .contact-heading-row {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .contact-heading-text h2 {
          font-family: 'Poppins', sans-serif;
          font-size: 41px;
          font-weight: 600;
          color: #233D62;
          margin: 0 0 12px;
          line-height: 1.2;
        }
        .contact-heading-text p {
          font-family: 'Nunito', sans-serif;
          font-size: 15px;
          line-height: 1.66em;
          color: #485666;
          margin: 0;
        }
        .contact-3dman {
          flex-shrink: 0;
        }
        .contact-3dman img {
          width: 308px;
          max-width: 35vw;
          object-fit: contain;
          display: block;
        }
        @media (max-width: 991px) {
          .contact-3dman { display: none; }
        }
        .contact-right {
          flex: 0 0 calc(50% - 40px);
          min-width: 280px;
        }
        .contact-info-card {
          background: #fff;
          border-radius: 12px;
          box-shadow: -5px 18px 60px 0px rgba(0,0,0,0.1);
          display: flex;
          overflow: hidden;
        }
        .contact-info-half {
          flex: 1;
          padding: 30px;
        }
        .contact-info-half:first-child {
          border-right: 1px solid #EEEEEE;
        }
        .contact-info-half p {
          font-family: 'Nunito', sans-serif;
          font-size: 15px;
          color: rgba(0,35,82,0.6);
          margin: 0 0 6px;
        }
        .contact-info-half h4 {
          font-family: 'Poppins', sans-serif;
          font-size: 25px;
          font-weight: 600;
          color: #233D62;
          margin: 0;
          word-break: break-word;
        }
        .contact-wave {
          position: relative;
          margin-top: 60px;
          line-height: 0;
        }
        .contact-wave svg {
          display: block;
          width: 100%;
          height: 80px;
        }
        @media (max-width: 767px) {
          .contact-left, .contact-right { flex: 0 0 100%; }
          .contact-inner { gap: 24px; }
          .contact-heading-text h2 { font-size: 28px; }
          .contact-info-card { flex-direction: column; }
          .contact-info-half:first-child { border-right: none; border-bottom: 1px solid #EEEEEE; }
        }
      `}</style>

      <div className="contact-inner">
        <div className="contact-left">
          <div className="contact-heading-row">
            <div className="contact-heading-text">
              <h2>Contact Us</h2>
              <p>Have questions or need assistance? Contact us—we're here to help!</p>
            </div>
            <div className="contact-3dman">
              <img
                src="https://vilcom.co.ke/wp-content/uploads/2021/01/3dman@2x-1-1.png"
                alt=""
                onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
              />
            </div>
          </div>
        </div>

        <div className="contact-right">
          <div className="contact-info-card">
            <div className="contact-info-half">
              <p>Email Us</p>
              <h4>info@vilcom.co.ke</h4>
            </div>
            <div className="contact-info-half">
              <p>Call Us</p>
              <h4>0111 028800</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
          <path
            fill="#FFFFFF"
            d="M790.5,93.1c-59.3-5.3-116.8-18-192.6-50c-29.6-12.7-76.9-31-100.5-35.9
            c-23.6-4.9-52.6-7.8-75.5-5.3c-10.2,1.1-22.6,1.4-50.1,7.4c-27.2,6.3-58.2,16.6-79.4,24.7
            c-41.3,15.9-94.9,21.9-134,22.6C72,58.2,0,25.8,0,25.8V100h1000V65.3
            c0,0-51.5,19.4-106.2,25.7C839.5,97,814.1,95.2,790.5,93.1z"
          />
        </svg>
      </div>
    </section>
  );
};

export default ContactSection;
