/**
 * PDFModal.tsx
 *
 * Renders PDFs via Google Docs Viewer — embeds the PDF in an iframe using
 * Google's viewer as the renderer, which bypasses all local dev server issues.
 *
 * In production (real domain), falls back to direct iframe src automatically.
 *
 * Props:
 *   isOpen   – controls visibility
 *   onClose  – called when user dismisses
 *   title    – displayed in the top bar
 *   pdfPath  – absolute path or URL, e.g. "/documents/iso-9001.pdf"
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { X, Maximize2, Minimize2, Share2, Download, ExternalLink } from "lucide-react";

export interface PDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  pdfPath: string;
}

/** Resolve a possibly-relative pdfPath to a full absolute URL */
function toAbsoluteUrl(pdfPath: string): string {
  if (pdfPath.startsWith("http://") || pdfPath.startsWith("https://")) {
    return pdfPath;
  }
  return `${window.location.origin}${pdfPath.startsWith("/") ? "" : "/"}${pdfPath}`;
}

/**
 * Build the viewer src.
 *
 * - On localhost / Lovable preview: use Google Docs Viewer so we bypass
 *   the dev server's broken static file handling entirely.
 * - On a real production domain: use the PDF directly in the iframe.
 */
function buildViewerSrc(pdfPath: string): string {
  const absolute = toAbsoluteUrl(pdfPath);
  const isLocalOrPreview =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname.endsWith(".lovable.app") ||
    window.location.hostname.endsWith(".lovableproject.com");

  if (isLocalOrPreview) {
    // Google Docs Viewer — renders the PDF from its public URL.
    // Note: requires the PDF to be publicly accessible. Works perfectly
    // on Lovable preview deployments; on localhost use the direct URL fallback below.
    return `https://docs.google.com/viewer?url=${encodeURIComponent(absolute)}&embedded=true`;
  }

  return `${absolute}#toolbar=1&navpanes=0`;
}

const PDFModal = ({ isOpen, onClose, title, pdfPath }: PDFModalProps) => {
  const [loaded, setLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const viewerSrc = isOpen ? buildViewerSrc(pdfPath) : "";
  const absolutePdfUrl = isOpen ? toAbsoluteUrl(pdfPath) : "";

  /* ── Reset state when PDF changes ───────────────────────────────── */
  useEffect(() => {
    setLoaded(false);
    setTimedOut(false);

    if (timerRef.current) clearTimeout(timerRef.current);

    // If onLoad hasn't fired after 12 s, show fallback actions
    timerRef.current = setTimeout(() => setTimedOut(true), 12000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pdfPath, isOpen]);

  /* ── Keyboard shortcuts ─────────────────────────────────────────── */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  /* ── Prevent body scroll ────────────────────────────────────────── */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* ── Fullscreen ─────────────────────────────────────────────────── */
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  /* ── Share ──────────────────────────────────────────────────────── */
  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: absolutePdfUrl });
      } catch (err) {
        if ((err as DOMException).name !== "AbortError") {
          await navigator.clipboard.writeText(absolutePdfUrl).catch(() => {});
          alert("Link copied to clipboard!");
        }
      }
    } else {
      await navigator.clipboard.writeText(absolutePdfUrl).catch(() => {});
      alert("Link copied to clipboard!");
    }
  }, [absolutePdfUrl, title]);

  /* ── Download ───────────────────────────────────────────────────── */
  const handleDownload = useCallback(() => {
    const a = document.createElement("a");
    a.href = pdfPath;
    a.download = title.replace(/\s+/g, "-") + ".pdf";
    a.click();
  }, [pdfPath, title]);

  const handleLoaded = useCallback(() => {
    setLoaded(true);
    setTimedOut(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col"
      style={{ background: "rgb(81, 85, 88)", animation: "pdfFadeIn 0.18s ease" }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* ── Top bar ─────────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between flex-shrink-0 px-4 py-2 z-10"
        style={{ background: "rgba(0,0,0,0.4)" }}
      >
        <span className="text-white text-sm font-medium truncate max-w-[70vw]" title={title}>
          {title}
        </span>
        <button
          onClick={onClose}
          className="flex items-center justify-center w-9 h-9 text-white hover:opacity-70 transition-opacity rounded ml-4"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* ── Content ─────────────────────────────────────────────────── */}
      <div className="flex-1 relative" style={{ paddingBottom: "52px" }}>

        {/* Spinner — hidden once loaded or timed out */}
        {!loaded && !timedOut && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/70 z-10 pointer-events-none">
            <svg className="w-10 h-10 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            <span className="text-sm">Loading document…</span>
          </div>
        )}

        {/* Timeout fallback — shown if iframe never resolves */}
        {timedOut && !loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white/80 z-10 px-6 text-center">
            <svg className="w-12 h-12 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <p className="text-sm font-medium">Preview unavailable in this environment.</p>
            <p className="text-xs text-white/50">Use the buttons below to open or download the document.</p>
          </div>
        )}

        {/* iframe — always mounted so onLoad can fire */}
        <iframe
          key={viewerSrc}
          src={viewerSrc}
          title={title}
          className="w-full h-full border-0"
          style={{
            display: "block",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.2s",
          }}
          onLoad={handleLoaded}
          allow="fullscreen"
        />
      </div>

      {/* ── Bottom toolbar ──────────────────────────────────────────── */}
      <div
        className="fixed bottom-0 left-0 right-0 flex items-center justify-center gap-1"
        style={{ background: "rgb(255,255,255)", height: "52px", zIndex: 10 }}
      >
        <ToolBtn
          label="Open in new tab"
          onClick={() => window.open(pdfPath, "_blank", "noopener,noreferrer")}
        >
          <ExternalLink className="w-[18px] h-[18px]" />
        </ToolBtn>

        <ToolBtn label="Share" onClick={handleShare}>
          <Share2 className="w-[18px] h-[18px]" />
        </ToolBtn>

        <ToolBtn label="Download PDF" onClick={handleDownload}>
          <Download className="w-[18px] h-[18px]" />
        </ToolBtn>

        <ToolBtn label="Toggle fullscreen" onClick={toggleFullscreen}>
          {isFullscreen
            ? <Minimize2 className="w-[18px] h-[18px]" />
            : <Maximize2 className="w-[18px] h-[18px]" />
          }
        </ToolBtn>
      </div>

      <style>{`
        @keyframes pdfFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

/* ── ToolBtn helper ─────────────────────────────────────────────────── */
interface ToolBtnProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
  children: React.ReactNode;
}

const ToolBtn = ({ label, onClick, disabled = false, active = false, children }: ToolBtnProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={label}
    aria-label={label}
    aria-pressed={active}
    className={`flex items-center justify-center transition-colors rounded disabled:opacity-30 disabled:cursor-default ${
      active
        ? "text-blue-600 bg-blue-50"
        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
    }`}
    style={{ width: 46, height: 46 }}
  >
    {children}
  </button>
);

export default PDFModal;