const COVERAGE_IMAGES = [
  { src: 'https://vilcom.ke/wp-content/uploads/2024/06/Kazini_Compressed.jpg', alt: 'Kazini' },
  { src: 'https://vilcom.ke/wp-content/uploads/2024/06/Sokoni_Compressed.jpg', alt: 'Sokoni' },
  { src: 'https://vilcom.ke/wp-content/uploads/2024/06/Nyumbani_Compressed.jpg', alt: 'Nyumbani' },
  { src: 'https://vilcom.ke/wp-content/uploads/2024/06/Shuleni_Compressed.jpg', alt: 'Shuleni' },
]

export default function CoverageSection() {
  return (
    <section id="coverage">
      <style>{`
        /* ── heading container ── */
        .coverage-heading-wrap {
          padding: 60px 20px 30px;
          text-align: center;
        }
        .coverage-heading-wrap h2 {
          font-family: 'Poppins', sans-serif;
          font-size: 41px;
          font-weight: 600;
          color: #233D62;
          margin: 0;
          line-height: 1.2;
        }

        /* ── 4-col full-width image row ── */
        .coverage-img-row {
          display: flex;
          width: 100%;
        }
        .coverage-img-col {
          flex: 0 0 25%;
          position: relative;
          /* h-pt-125 = padding-top 125% = 5:4 aspect ratio */
          padding-top: 25%; /* 25% of 100vw = square-ish */
          overflow: hidden;
          border-radius: 4px;
        }
        .coverage-img-col figure {
          position: absolute;
          inset: 0;
          margin: 0;
        }
        .coverage-img-col figure img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 0.4s ease;
        }
        /* hover overlay */
        .coverage-img-col .lqd-fb-hover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(65,105,237,0.15);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .coverage-img-col:hover .lqd-fb-hover-overlay { opacity: 1; }
        .coverage-img-col:hover figure img { transform: scale(1.04); }

        @media (max-width: 767px) {
          .coverage-img-col { flex: 0 0 50%; padding-top: 50%; }
          .coverage-img-row { flex-wrap: wrap; }
          .coverage-heading-wrap h2 { font-size: 28px; }
        }
      `}</style>

      {/* Heading */}
      <div className="coverage-heading-wrap">
        <h2>Get internet everywhere</h2>
      </div>

      {/* Full-width 4-col image row — elementor-section-full_width, elementor-column-gap-no */}
      <div className="coverage-img-row">
        {COVERAGE_IMAGES.map(img => (
          <div key={img.alt} className="coverage-img-col">
            <figure>
              <img src={img.src} alt={img.alt} />
            </figure>
            <div className="lqd-fb-hover-overlay" />
          </div>
        ))}
      </div>
      <div style={{ height: 50 }} />
    </section>
  )
}