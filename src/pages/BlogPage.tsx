import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollIndicator from "@/components/ScrollIndicator";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────── */
interface WPPost {
  id: number;
  date: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      media_details?: { sizes?: { medium?: { source_url: string }; large?: { source_url: string } } };
    }>;
    "wp:term"?: Array<Array<{ id: number; name: string; link: string; taxonomy: string }>>;
  };
}

/* ─── Constants ──────────────────────────────────────────────── */
const WP_API   = "https://vilcom.co.ke/wp-json/wp/v2";
const PER_PAGE = 4;
const FALLBACK = "https://vilcom.co.ke/wp-content/uploads/2024/06/gallery_1.jpg";

/* ─── Helpers ────────────────────────────────────────────────── */
function timeAgo(d: string) {
  const s = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
  if (s < 86400)         return "Today";
  const days = Math.floor(s / 86400);
  if (days < 7)          return `${days} day${days > 1 ? "s" : ""} ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5)         return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  const mo = Math.floor(days / 30);
  if (mo < 12)           return `${mo} month${mo > 1 ? "s" : ""} ago`;
  return `${Math.floor(mo / 12)} year${Math.floor(mo / 12) > 1 ? "s" : ""} ago`;
}

function getImg(post: WPPost, size: "thumb" | "large" | "full" = "full") {
  const m = post._embedded?.["wp:featuredmedia"]?.[0];
  if (!m) return FALLBACK;
  if (size === "thumb") return m.media_details?.sizes?.medium?.source_url ?? m.source_url;
  if (size === "large") return m.media_details?.sizes?.large?.source_url  ?? m.source_url;
  return m.source_url;
}

function getCats(post: WPPost) {
  return (post._embedded?.["wp:term"] ?? []).flat().filter((t) => t.taxonomy === "category");
}

function plain(html: string) {
  return html.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ").trim();
}

/* ─── Category colours ───────────────────────────────────────── */
const CAT_COLORS: Record<string, { bg: string; text: string }> = {
  Technology:  { bg: "#e0f2fe", text: "#0369a1" },
  Business:    { bg: "#d1fae5", text: "#047857" },
  Modern:      { bg: "#ede9fe", text: "#6d28d9" },
  Information: { bg: "#fef3c7", text: "#b45309" },
};

function CatBadge({ name }: { name: string }) {
  const c = CAT_COLORS[name] ?? { bg: "#f1f5f9", text: "#475569" };
  return (
    <span
      className="inline-block text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded"
      style={{ background: c.bg, color: c.text }}
    >
      {name}
    </span>
  );
}

/* ─── Fade-in on scroll ──────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, on };
}

/* ─── Featured card (left 2-col grid) ───────────────────────── */
function FeaturedCard({ post, index }: { post: WPPost; index: number }) {
  const cat = getCats(post)[0];
  const { ref, on } = useReveal();

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      className="group relative flex flex-col bg-white border border-border/50 overflow-hidden hover:shadow-lg transition-shadow duration-400"
      style={{
        borderRadius: "6px",
        opacity: on ? 1 : 0,
        transform: on ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s ease ${index * 80}ms, box-shadow 0.3s ease`,
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
        <img
          src={getImg(post, "large")}
          alt={plain(post.title.rendered)}
          className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.04]"
          loading="lazy"
        />
        {/* Bottom meta bar — white date + coloured category, exact original style */}
        <div className="absolute bottom-0 left-0 flex items-stretch z-10 text-xs font-semibold">
          <time className="bg-white text-foreground px-3 py-1.5 flex items-center leading-none">
            {timeAgo(post.date)}
          </time>
          {cat && (
            <span
              className="px-3 py-1.5 flex items-center leading-none text-white uppercase tracking-wide"
              style={{ background: CAT_COLORS[cat.name]?.text ?? "#0ea5e9" }}
            >
              {cat.name}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 px-4 pt-3.5 pb-4">
        <h2 className="text-[0.9rem] font-extrabold leading-snug text-foreground mb-2 group-hover:text-vilcom-blue transition-colors duration-250">
          <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        </h2>
        <p className="text-[12.5px] text-muted-foreground leading-relaxed line-clamp-2 mb-3 flex-1">
          {plain(post.excerpt.rendered)}
        </p>
        <span className="inline-flex items-center gap-1 text-[11.5px] font-bold text-vilcom-blue group-hover:gap-2 transition-all duration-250">
          Read more <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-250" />
        </span>
      </div>

      <a href={post.link} target="_blank" rel="noopener noreferrer"
        className="absolute inset-0 z-20" aria-label={plain(post.title.rendered)} tabIndex={-1} />
    </article>
  );
}

/* ─── Sidebar card (horizontal thumb) ───────────────────────── */
function SidebarCard({ post, index }: { post: WPPost; index: number }) {
  const cat  = getCats(post)[0];
  const [on, setOn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOn(true), 150 + index * 70);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <article
      className="group relative flex items-center gap-3 py-3 border-b border-border/50 last:border-0"
      style={{
        opacity: on ? 1 : 0,
        transform: on ? "translateX(0)" : "translateX(10px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}
    >
      {/* Square thumb */}
      <div className="w-[72px] h-[72px] flex-shrink-0 rounded overflow-hidden">
        <img
          src={getImg(post, "thumb")}
          alt={plain(post.title.rendered)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      {/* Meta */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          {cat && <CatBadge name={cat.name} />}
          <time className="text-[10px] text-muted-foreground font-medium">{timeAgo(post.date)}</time>
        </div>
        <h3
          className="text-[12.5px] font-bold leading-snug text-foreground group-hover:text-vilcom-blue transition-colors duration-250 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
      </div>
      <a href={post.link} target="_blank" rel="noopener noreferrer"
        className="absolute inset-0 z-10" aria-label={plain(post.title.rendered)} tabIndex={-1} />
    </article>
  );
}

/* ─── Pagination ─────────────────────────────────────────────── */
function Pagination({ currentPage, totalPages, onPageChange }: {
  currentPage: number; totalPages: number; onPageChange: (p: number) => void;
}) {
  const pages: (number | "…")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    const set = new Set(
      [1, currentPage - 1, currentPage, currentPage + 1, totalPages]
        .filter((p) => p >= 1 && p <= totalPages)
    );
    let prev: number | null = null;
    [...set].sort((a, b) => a - b).forEach((p) => {
      if (prev !== null && p - prev > 1) pages.push("…");
      pages.push(p); prev = p;
    });
  }

  const btn = "inline-flex items-center justify-center w-8 h-8 rounded text-sm font-semibold transition-all duration-200";

  return (
    <nav className="flex items-center justify-center gap-0.5 mt-8 pt-6 border-t border-border/40" aria-label="Pagination">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}
        className={`${btn} border border-border text-muted-foreground hover:border-vilcom-blue hover:text-vilcom-blue disabled:opacity-30 disabled:cursor-not-allowed`}>
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>

      {pages.map((p, i) =>
        p === "…"
          ? <span key={`d${i}`} className="px-1 text-sm text-muted-foreground">…</span>
          : <button key={p} onClick={() => onPageChange(p as number)}
              aria-current={p === currentPage ? "page" : undefined}
              className={`${btn} ${p === currentPage
                ? "bg-vilcom-blue text-white shadow-sm"
                : "text-foreground hover:bg-muted border border-transparent"}`}>
              {p}
            </button>
      )}

      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}
        className={`${btn} border border-border text-muted-foreground hover:border-vilcom-blue hover:text-vilcom-blue disabled:opacity-30 disabled:cursor-not-allowed`}>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </nav>
  );
}

/* ─── Skeletons ──────────────────────────────────────────────── */
function CardSkeleton() {
  return (
    <div className="rounded bg-white border border-border/40 overflow-hidden animate-pulse">
      <div className="bg-muted" style={{ aspectRatio: "16/10" }} />
      <div className="px-4 pt-3.5 pb-4 space-y-2">
        <div className="h-3.5 bg-muted rounded w-4/5" />
        <div className="h-3.5 bg-muted rounded w-full" />
        <div className="h-3 bg-muted rounded w-2/3" />
        <div className="h-3 bg-muted rounded w-1/2" />
      </div>
    </div>
  );
}

function SidebarSkeleton() {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-border/50 animate-pulse">
      <div className="w-[72px] h-[72px] rounded bg-muted flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-2.5 bg-muted rounded w-16" />
        <div className="h-3 bg-muted rounded w-full" />
        <div className="h-3 bg-muted rounded w-3/4" />
      </div>
    </div>
  );
}

/* ─── Page component ─────────────────────────────────────────── */
const BlogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));

  const [mainPosts,    setMainPosts]    = useState<WPPost[]>([]);
  const [sidebarPosts, setSidebarPosts] = useState<WPPost[]>([]);
  const [totalPages,   setTotalPages]   = useState(17);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(false);

  /* page transitions */
  const [gridVisible, setGridVisible] = useState(true);

  useEffect(() => {
    setLoading(true); setError(false);
    setGridVisible(false);
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetch(`${WP_API}/posts?page=${currentPage}&per_page=${PER_PAGE}&_embed=wp:featuredmedia,wp:term`)
      .then((res) => {
        setTotalPages(parseInt(res.headers.get("X-WP-TotalPages") ?? "17", 10));
        return res.json();
      })
      .then((data: WPPost[]) => {
        setMainPosts(data);
        setLoading(false);
        setTimeout(() => setGridVisible(true), 60);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, [currentPage]);

  useEffect(() => {
    fetch(`${WP_API}/posts?page=1&per_page=4&_embed=wp:featuredmedia,wp:term`)
      .then((r) => r.json())
      .then((data: WPPost[]) => setSidebarPosts(data))
      .catch(() => {});
  }, []);

  const goToPage = (p: number) => setSearchParams(p === 1 ? {} : { page: String(p) });

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollIndicator />
      <Header />

      <main className="flex-1">

        {/* ── Hero ── */}
        <div style={{ background: "linear-gradient(180deg, hsl(195 100% 97%) 1%, hsl(0 0% 100%) 100%)" }}
          className="py-12 md:py-16">
          <div className="vilcom-section text-center flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-3 leading-tight">
              Our Blog
            </h1>
            <p className="text-base text-muted-foreground max-w-lg">
              Stay updated with the latest news, tips, and insights from Vilcom Networks.
            </p>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="vilcom-section py-8 md:py-10">
          <div className="flex flex-col lg:flex-row gap-x-10 gap-y-8 items-start">

            {/* ── Left: 50% paginated grid ── */}
            <div className="w-full lg:w-[calc(50%-1.25rem)]">

              {/* Section headings */}
              <h2 className="text-xl font-extrabold text-foreground mb-1">Latest Stories</h2>
              <div className="h-px bg-border w-full my-3" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                Trending Stories
              </p>
              <div className="h-px bg-border w-full mb-6" />

              {/* Grid */}
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <CardSkeleton /><CardSkeleton /><CardSkeleton /><CardSkeleton />
                </div>
              ) : error ? (
                <div className="border border-border/50 bg-white rounded text-center py-12 px-6">
                  <p className="text-sm text-muted-foreground mb-4">Unable to load posts right now.</p>
                  <a href="https://vilcom.co.ke/our-blog/" target="_blank" rel="noopener noreferrer"
                    className="vilcom-btn-primary text-sm">
                    Visit vilcom.co.ke/blog →
                  </a>
                </div>
              ) : (
                <div style={{ opacity: gridVisible ? 1 : 0, transition: "opacity 0.25s ease" }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {mainPosts.map((post, i) => (
                      <FeaturedCard key={post.id} post={post} index={i} />
                    ))}
                  </div>
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
                </div>
              )}
            </div>

            {/* ── Right: 50% sticky sidebar ── */}
            <aside
              className="w-full lg:w-[calc(50%-1.25rem)] lg:sticky"
              style={{ top: "10px" }}
            >
              {/* Ad banner — constrained height so it doesn't dominate */}
              <a href="https://vilcom.co.ke" target="_blank" rel="noopener noreferrer"
                className="block mb-5 rounded overflow-hidden border border-border/30 hover:shadow-md transition-shadow duration-300">
                <img
                  src="https://vilcom.co.ke/wp-content/uploads/2025/11/addds-2@2x.jpg"
                  alt="Vilcom promotion"
                  className="w-full object-cover object-center"
                  style={{ maxHeight: "220px" }}
                  loading="lazy"
                />
              </a>

              {/* Daily Newsletter label */}
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                Daily Newsletter
              </p>
              <div className="h-px bg-border w-full mb-1" />

              {/* Sidebar posts */}
              {sidebarPosts.length > 0
                ? sidebarPosts.map((post, i) => <SidebarCard key={post.id} post={post} index={i} />)
                : <><SidebarSkeleton /><SidebarSkeleton /><SidebarSkeleton /><SidebarSkeleton /></>
              }
            </aside>

          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default BlogPage;