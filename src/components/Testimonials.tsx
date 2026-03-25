import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import avatar from "@/assets/avatar.jpg";

const testimonials = [
  {
    quote: "The best network ever that I have come across. Your service in Eldoret is out of this world. Thank you",
    name: "Carol C Rutto",
    role: "Customer",
  },
  {
    quote: "What I love most about Sigmon Networks Communications is I feel like I'm working with someone from Team Family Reach.",
    name: "Alex Kiiru",
    role: "Customer",
  },
  {
    quote: "Personally, I have had a great experience dealing with Sigmon Networks Ltd especially when it came to their service delivery. They are friendly, inclusive and have always been available 24/7 to solve any issues I've encountered with my internet connection.",
    name: "Kevin Kimani",
    role: "Customer",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((p) => (p + 1) % testimonials.length);

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(195 100% 97%) 0%, hsl(0 0% 100%) 100%)" }}>
      {/* SVG wave top */}
      <div className="absolute top-0 left-0 w-full">
        <svg viewBox="0 0 1440 150" preserveAspectRatio="none" className="w-full h-24 md:h-32">
          <path fill="hsl(0 0% 100%)" d="M0 26C276 84 431 65 716 26C930-4 1210-4 1439 9V0H0Z" />
        </svg>
      </div>

      <div className="vilcom-section flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-2/5">
          <img
            src={avatar}
            alt="Customer"
            className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover mx-auto"
            style={{ boxShadow: "var(--shadow-card-hover)" }}
          />
        </div>

        <div className="lg:w-3/5">
          <h6 className="text-sm font-extrabold text-vilcom-orange uppercase tracking-wide mb-4">
            Real stories
          </h6>

          <div className="relative min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <blockquote className="text-xl md:text-2xl font-bold text-foreground leading-relaxed mb-6">
                  "{testimonials[current].quote}"
                </blockquote>
                <p className="text-base font-extrabold text-foreground">
                  {testimonials[current].name}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {testimonials[current].role}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-vilcom-blue flex items-center justify-center text-primary-foreground hover:bg-vilcom-orange transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-vilcom-blue flex items-center justify-center text-primary-foreground hover:bg-vilcom-orange transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
