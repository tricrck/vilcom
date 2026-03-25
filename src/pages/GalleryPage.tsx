import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollIndicator from "@/components/ScrollIndicator";
import { ArrowLeft, X, ChevronLeft, ChevronRight, Plus } from "lucide-react";

const galleryImages = [
  {
    id: 1,
    src: "https://vilcom.co.ke/wp-content/uploads/2024/06/gallery_1.jpg",
    alt: "Sigmon Networks Gallery",
    aspect: "landscape",
  },
  {
    id: 2,
    src: "https://vilcom.co.ke/wp-content/uploads/2024/06/gallery_6.jpg",
    alt: "Sigmon Networks Gallery",
    aspect: "landscape",
  },
  {
    id: 3,
    src: "https://vilcom.co.ke/wp-content/uploads/2024/06/rongai_2-1.jpg",
    alt: "Rongai Installation",
    aspect: "landscape",
  },
  {
    id: 4,
    src: "https://vilcom.co.ke/wp-content/uploads/2024/06/gallery_2.jpg",
    alt: "Sigmon Networks Gallery",
    aspect: "landscape",
  },
  {
    id: 5,
    src: "https://vilcom.co.ke/wp-content/uploads/2024/06/gallery_7.jpg",
    alt: "Sigmon Networks Gallery",
    aspect: "portrait",
  },
  {
    id: 6,
    src: "https://vilcom.co.ke/wp-content/uploads/2024/06/gallery_4.jpg",
    alt: "Sigmon Networks Gallery",
    aspect: "portrait",
  },
  {
    id: 7,
    src: "https://vilcom.co.ke/wp-content/uploads/2024/06/rongai_5-1.jpg",
    alt: "Rongai Installation",
    aspect: "landscape",
  },
  {
    id: 8,
    src: "https://vilcom.co.ke/wp-content/uploads/2024/06/rongai_1.jpg",
    alt: "Rongai Installation",
    aspect: "portrait",
  },
  {
    id: 9,
    src: "https://vilcom.co.ke/wp-content/uploads/2024/06/rongai_4-1.jpg",
    alt: "Rongai Installation",
    aspect: "landscape",
  },
];

const GalleryPage = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length);
  }, [lightboxIndex]);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
  }, [lightboxIndex]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, goPrev, goNext]);

  // Prevent body scroll when lightbox open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollIndicator />
      <Header />
      <main className="flex-1">
        {/* Hero banner */}
        <div
          className="py-16 md:py-24"
          style={{ background: "linear-gradient(180deg, hsl(195 100% 97%) 1%, hsl(0 0% 100%) 100%)" }}
        >
          <div className="vilcom-section text-center flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-0">Our Gallery</h1>
          </div>
        </div>

        {/* Masonry Gallery */}
        <div className="vilcom-section py-12 md:py-16">
          <div
            className="columns-1 sm:columns-2 lg:columns-2 gap-4"
            style={{ columnGap: "1rem" }}
          >
            {galleryImages.map((img, index) => (
              <div
                key={img.id}
                className="relative overflow-hidden mb-4 break-inside-avoid group cursor-pointer rounded-lg"
                onClick={() => openLightbox(index)}
                style={{ display: "inline-block", width: "100%" }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                  loading={index < 2 ? "eager" : "lazy"}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-all duration-400 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center w-14 h-14 rounded-full border-2 border-white">
                    <Plus className="w-7 h-7 text-white" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10 p-2"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X className="w-7 h-7" />
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 p-2"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            aria-label="Previous"
          >
            <ChevronLeft className="w-9 h-9" />
          </button>

          {/* Image */}
          <div
            className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={lightboxIndex}
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].alt}
              className="max-w-[90vw] max-h-[88vh] object-contain rounded shadow-2xl"
              style={{ animation: "fadeInLightbox 0.25s ease" }}
            />
            {/* Counter */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-sm tabular-nums">
              {lightboxIndex + 1} / {galleryImages.length}
            </div>
          </div>

          {/* Next */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 p-2"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            aria-label="Next"
          >
            <ChevronRight className="w-9 h-9" />
          </button>
        </div>
      )}

      <style>{`
        @keyframes fadeInLightbox {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default GalleryPage;