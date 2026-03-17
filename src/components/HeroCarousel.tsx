import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import pic1 from "@/assets/slides/pic1.png";
import service2 from "@/assets/slides/service_2.png";
import service3 from "@/assets/slides/service_3.png";
import service4 from "@/assets/slides/service_4.png";
import service5 from "@/assets/slides/service_5.png";
import service6 from "@/assets/slides/service_6.png";
import service7 from "@/assets/slides/service_7.png";
import service8 from "@/assets/slides/service_8.png";
import service9 from "@/assets/slides/service_9.png";
import service10 from "@/assets/slides/service_10.png";
import service11 from "@/assets/slides/service_11.png";
import service12 from "@/assets/slides/service_12.png";

const slides = [pic1, service5, service2, service3, service4, service6, service7, service8, service9, service10, service11, service12];
// Floating dots configuration
const floatingDots = [
  { size: 8, color: "bg-vilcom-orange", top: "8%", left: "5%", delay: 0 },
  { size: 5, color: "bg-vilcom-blue", top: "12%", left: "12%", delay: 0.5 },
  { size: 6, color: "bg-vilcom-orange", top: "25%", left: "2%", delay: 1 },
  { size: 4, color: "bg-vilcom-blue", top: "30%", left: "15%", delay: 1.5 },
  { size: 7, color: "bg-vilcom-orange", top: "45%", left: "8%", delay: 0.3 },
  { size: 5, color: "bg-vilcom-blue", top: "50%", left: "20%", delay: 0.8 },
  { size: 6, color: "bg-vilcom-orange", top: "60%", left: "3%", delay: 1.2 },
  { size: 4, color: "bg-vilcom-blue", top: "70%", left: "18%", delay: 0.6 },
  { size: 8, color: "bg-vilcom-orange", top: "15%", left: "42%", delay: 0.2 },
  { size: 5, color: "bg-vilcom-blue", top: "35%", left: "38%", delay: 0.9 },
  { size: 6, color: "bg-vilcom-orange", top: "55%", left: "44%", delay: 1.4 },
  { size: 4, color: "bg-vilcom-blue", top: "75%", left: "35%", delay: 0.4 },
  { size: 7, color: "bg-vilcom-orange", top: "5%", right: "8%", delay: 0.7 },
  { size: 5, color: "bg-vilcom-blue", top: "20%", right: "3%", delay: 1.1 },
  { size: 6, color: "bg-vilcom-orange", top: "65%", right: "5%", delay: 0.1 },
  { size: 4, color: "bg-vilcom-blue", top: "80%", right: "12%", delay: 1.3 },
  { size: 5, color: "bg-vilcom-orange", top: "40%", right: "2%", delay: 0.5 },
  { size: 8, color: "bg-vilcom-blue", top: "85%", left: "10%", delay: 0.9 },
  { size: 6, color: "bg-vilcom-orange", top: "90%", left: "45%", delay: 0.2 },
  { size: 5, color: "bg-vilcom-blue", top: "88%", right: "20%", delay: 1.6 },
];
const WORDS = ['smart', 'secure', 'scalable']
const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [slideIn, setSlideIn]   = useState(true)   // slide-in class
  const [wordIdx, setWordIdx]     = useState(0)
  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  // ── text rotator: lqd-keyword-slide-out / slide-in ──
  useEffect(() => {
    const t = setInterval(() => {
      setSlideIn(false)
      setTimeout(() => {
        setWordIdx(i => (i + 1) % WORDS.length)
        setSlideIn(true)
      }, 320)
    }, 2800)
    return () => clearInterval(t)
  }, [])

  // Show 4 thumbnails at a time
  const thumbStart = Math.floor(current / 4) * 4;
  const visibleThumbs = slides.slice(thumbStart, thumbStart + 4);

  return (
    <section className="relative w-full overflow-hidden bg-background py-8 md:py-12 mt-12 mb-12">
      {/* Floating animated dots */}
      {floatingDots.map((dot, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${dot.color} opacity-70 animate-float-dot`}
          style={{
            width: dot.size,
            height: dot.size,
            top: dot.top,
            left: dot.left,
            right: dot.right,
            animationDelay: `${dot.delay}s`,
          }}
        />
      ))}

      <div className="vilcom-section relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left: Hero text */}
          <div className="flex-1 lg:max-w-[45%]">
            <h1 className="text-[42px] sm:text-[56px] lg:text-[80px] font-extrabold leading-[1.05] mb-6" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
              <span className="text-primary hover:text-vilcom-orange transition-colors cursor-default">Technology</span>{" "}
              <span className="text-primary hover:text-vilcom-orange transition-colors cursor-default">solutions</span>{" "}
              <br></br>
              <span className="text-primary hover:text-vilcom-orange transition-colors cursor-default">that are</span>{" "}
              <br></br>
              <span className="txt-rotate-keywords">
              <span className={`text-primary hover:text-vilcom-orange transition-colors cursor-default ${slideIn ? 'slide-in' : 'slide-out'}`}>
                {WORDS[wordIdx]}
              </span>
            </span>

            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              The best technology solutions provider.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/coverage"
                className="inline-flex items-center justify-center px-10 py-3.5 rounded-full font-bold text-primary-foreground text-sm uppercase tracking-wider"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--vilcom-orange)), hsl(25, 100%, 45%))",
                }}
              >
                OUR COVERAGE
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center px-10 py-3.5 rounded-full font-bold text-primary text-sm uppercase tracking-wider border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                INTERNET PLANS
              </Link>
            </div>
          </div>

          {/* Right: Carousel */}
          <div className="flex-1 lg:max-w-[55%] w-full">
            <div className="relative rounded-xl overflow-hidden group">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {slides.map((slide, i) => (
                  <img
                    key={i}
                    src={slide}
                    alt={`Vilcom service ${i + 1}`}
                    className="w-full flex-shrink-0 object-cover rounded-xl"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                ))}
              </div>

              {/* Nav arrows */}
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* Thumbnails - show 4 at a time */}
            <div className="hidden md:grid grid-cols-4 gap-2 mt-3">
              {visibleThumbs.map((slide, i) => {
                const actualIndex = thumbStart + i;
                return (
                  <button
                    key={actualIndex}
                    onClick={() => setCurrent(actualIndex)}
                    className={`rounded-lg overflow-hidden transition-all duration-200 ${
                      actualIndex === current
                        ? "ring-2 ring-vilcom-orange opacity-100"
                        : "opacity-70 hover:opacity-90"
                    }`}
                  >
                    <img
                      src={slide}
                      alt=""
                      className="w-full h-20 object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
