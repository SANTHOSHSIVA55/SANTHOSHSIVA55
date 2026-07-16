import { useState, useRef, useCallback, useMemo } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ExternalLink, ArrowUpRight, Star, GitFork, Monitor, Smartphone } from "lucide-react";
import { GithubIcon } from "./icons";

/* ─── Screenshot URL Generator ─── */
function getScreenshotUrl(url: string | null, mobile = false): string | null {
  if (!url) return null;
  try {
    new URL(url);
  } catch {
    return null;
  }
  if (mobile) {
    return `https://image.thum.io/get/width/400/crop/800/aspect/mobile/${url}`;
  }
  return `https://image.thum.io/get/width/1600/crop/900/${url}`;
}

/* ─── Screenshot Hook ─── */
function useScreenshot(url: string | null) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const src = useMemo(() => getScreenshotUrl(url, false), [url]);
  const mobileSrc = useMemo(() => getScreenshotUrl(url, true), [url]);

  return { src, mobileSrc, loaded, error, setLoaded, setError };
}

/* ─── Laptop Mockup SVG ─── */
function LaptopMockup({
  src,
  alt,
  loaded,
  error,
  onLoad,
  onError,
  className = "",
}: {
  src: string | null;
  alt: string;
  loaded: boolean;
  error: boolean;
  onLoad: () => void;
  onError: () => void;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 800 520" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        {/* Screen */}
        <rect x="40" y="10" width="720" height="440" rx="12" fill="#0A0A0A" />
        <rect x="44" y="14" width="712" height="432" rx="10" fill="#111111" />

        {/* Screenshot area */}
        {src && !error ? (
          <foreignObject x="44" y="14" width="712" height="432" className="rounded-[10px] overflow-hidden">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ width: "100%", height: "100%", position: "relative" }}>
              {!loaded && (
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(90deg, rgba(255,255,255,0.02) 25%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 75%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s ease-in-out infinite",
                }} />
              )}
              <img
                src={src}
                alt={alt}
                onLoad={onLoad}
                onError={onError}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top",
                  opacity: loaded ? 1 : 0,
                  transition: "opacity 0.5s ease",
                }}
              />
            </div>
          </foreignObject>
        ) : (
          <foreignObject x="44" y="14" width="712" height="432" className="rounded-[10px] overflow-hidden">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, #181818 0%, #0D0D0D 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "12px",
            }}>
              <Monitor style={{ width: 48, height: 48, color: "rgba(255,255,255,0.1)" }} />
              <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.15)", fontFamily: "Inter, sans-serif" }}>
                Preview
              </span>
            </div>
          </foreignObject>
        )}

        {/* Browser chrome - top bar */}
        <rect x="44" y="14" width="712" height="36" rx="10" fill="rgba(18,18,18,0.95)" />
        <rect x="44" y="40" width="712" height="6" fill="rgba(18,18,18,0.95)" />

        {/* Traffic lights */}
        <circle cx="68" cy="32" r="5" fill="#FF5F57" opacity="0.8" />
        <circle cx="86" cy="32" r="5" fill="#FFBD2E" opacity="0.8" />
        <circle cx="104" cy="32" r="5" fill="#28C840" opacity="0.8" />

        {/* URL bar */}
        <rect x="130" y="24" width="540" height="16" rx="8" fill="rgba(255,255,255,0.05)" />

        {/* Bottom bar / chin */}
        <rect x="40" y="450" width="720" height="60" rx="0" fill="#0D0D0D" />
        <rect x="40" y="450" width="720" height="1" fill="rgba(255,255,255,0.06)" />
        <rect x="350" y="468" width="100" height="6" rx="3" fill="rgba(255,255,255,0.08)" />

        {/* Outer frame */}
        <rect x="36" y="456" width="728" height="54" rx="6" fill="#0D0D0D" />
        <rect x="36" y="456" width="728" height="54" rx="6" stroke="rgba(255,255,255,0.04)" strokeWidth="1" fill="none" />

        {/* Subtle reflection */}
        <rect x="44" y="14" width="712" height="200" rx="10" fill="url(#laptopReflection)" opacity="0.03" />

        <defs>
          <linearGradient id="laptopReflection" x1="44" y1="14" x2="44" y2="214" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ─── Mobile Mockup SVG ─── */
function MobileMockup({
  src,
  alt,
  loaded,
  error,
  onLoad,
  onError,
  className = "",
}: {
  src: string | null;
  alt: string;
  loaded: boolean;
  error: boolean;
  onLoad: () => void;
  onError: () => void;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 200 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        {/* Phone body */}
        <rect x="2" y="2" width="196" height="416" rx="32" fill="#0D0D0D" />
        <rect x="4" y="4" width="192" height="412" rx="30" fill="#111111" />

        {/* Screen area */}
        <rect x="10" y="10" width="180" height="400" rx="26" fill="#0A0A0A" />

        {/* Screenshot */}
        {src && !error ? (
          <foreignObject x="10" y="10" width="180" height="400" className="rounded-[26px] overflow-hidden">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ width: "100%", height: "100%", position: "relative" }}>
              {!loaded && (
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(90deg, rgba(255,255,255,0.02) 25%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 75%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s ease-in-out infinite",
                }} />
              )}
              <img
                src={src}
                alt={alt}
                onLoad={onLoad}
                onError={onError}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top",
                  opacity: loaded ? 1 : 0,
                  transition: "opacity 0.5s ease",
                }}
              />
            </div>
          </foreignObject>
        ) : (
          <foreignObject x="10" y="10" width="180" height="400" className="rounded-[26px] overflow-hidden">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, #181818 0%, #0D0D0D 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <Smartphone style={{ width: 32, height: 32, color: "rgba(255,255,255,0.08)" }} />
            </div>
          </foreignObject>
        )}

        {/* Dynamic Island */}
        <rect x="70" y="18" width="60" height="20" rx="10" fill="#000000" />

        {/* Side buttons */}
        <rect x="0" y="80" width="3" height="30" rx="1.5" fill="rgba(255,255,255,0.06)" />
        <rect x="0" y="120" width="3" height="50" rx="1.5" fill="rgba(255,255,255,0.06)" />
        <rect x="197" y="100" width="3" height="40" rx="1.5" fill="rgba(255,255,255,0.06)" />

        {/* Subtle reflection */}
        <rect x="10" y="10" width="180" height="200" rx="26" fill="url(#mobileReflection)" opacity="0.02" />

        <defs>
          <linearGradient id="mobileReflection" x1="10" y1="10" x2="10" y2="210" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ─── Featured Project Card ─── */
export function ProjectShowcaseCard({ project: p }: { project: any }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), { stiffness: 200, damping: 25 });

  const { src, mobileSrc, loaded, error, setLoaded, setError } = useScreenshot(p.homepage ?? null);
  const [mobileLoaded, setMobileLoaded] = useState(false);
  const [mobileError, setMobileError] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformPerspective: 1400 }}
        className="glass-strong group relative overflow-hidden rounded-3xl transition-shadow duration-500 shine-sweep chrome-border"
      >
        {/* Mockup showcase area */}
        <div className="relative w-full overflow-hidden bg-gradient-to-br from-[#0D0D0D] to-[#181818] px-6 pt-10 pb-0 sm:px-10 sm:pt-14 md:px-16 md:pt-16">
          {/* Ambient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(232,232,232,0.03)_0%,transparent_60%)] pointer-events-none" />

          <div className="relative flex items-end justify-center gap-4 sm:gap-6">
            {/* Laptop mockup */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative w-full max-w-[520px] mockup-shadow rounded-t-xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-500"
            >
              <LaptopMockup
                src={src}
                alt={`${p.title} - Desktop Preview`}
                loaded={loaded}
                error={error}
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
              />
            </motion.div>

            {/* Mobile mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40, x: 20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="relative w-[90px] sm:w-[110px] md:w-[130px] -mb-2 mockup-shadow rounded-t-xl overflow-hidden group-hover:scale-[1.03] transition-transform duration-500 shrink-0"
            >
              <MobileMockup
                src={mobileSrc}
                alt={`${p.title} - Mobile Preview`}
                loaded={mobileLoaded}
                error={mobileError}
                onLoad={() => setMobileLoaded(true)}
                onError={() => setMobileError(true)}
              />
            </motion.div>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#020202]/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center gap-4 z-20">
          {p.homepage && (
            <a
              href={p.homepage}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#E8E8E8] to-[#C0C0C0] px-6 py-3 text-sm font-semibold text-[#020202] transition-transform hover:scale-105"
            >
              <ExternalLink className="size-4" /> Live Demo
            </a>
          )}
          <a
            href={p.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.15] bg-white/[0.06] px-6 py-3 text-sm font-medium text-[#FFFFFF] backdrop-blur-md transition-transform hover:scale-105"
          >
            <GithubIcon className="size-4" /> View Code
          </a>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#A8A8A8]">{p.tag}</div>
              <h3 className="mt-1.5 font-display text-xl sm:text-2xl font-bold text-[#FFFFFF]">{p.title}</h3>
            </div>
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer"
              className="glass inline-flex size-11 items-center justify-center rounded-xl transition-all duration-300 hover:bg-white/[0.08] shrink-0 border border-white/[0.06]"
            >
              <ArrowUpRight className="size-4 text-[#A8A8A8] group-hover:text-[#E8E8E8] transition-colors" />
            </a>
          </div>

          <p className="mt-3 text-sm sm:text-base text-[#A8A8A8] leading-relaxed">{p.description}</p>

          {p.features && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {p.features.map((f: string) => (
                <div key={f} className="flex items-center gap-2 text-sm text-[#A8A8A8]">
                  <span className="size-1.5 rounded-full bg-[#E8E8E8] shrink-0" /> {f}
                </div>
              ))}
            </div>
          )}

          {(p.stars !== undefined || p.updated) && (
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[#A8A8A8]">
              {p.stars !== undefined && (
                <span className="inline-flex items-center gap-1"><Star className="size-3.5" /> {p.stars}</span>
              )}
              {p.forks !== undefined && (
                <span className="inline-flex items-center gap-1"><GitFork className="size-3.5" /> {p.forks}</span>
              )}
              {p.updated && (
                <span>Updated {new Date(p.updated).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>
              )}
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {p.stack.map((s: string) => (
              <span key={s} className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs text-[#A8A8A8]">
                {s}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

/* ─── Grid Project Card ─── */
export function ProjectCardCompact({ project: p, index: i }: { project: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 25 });

  const { src, mobileSrc, loaded, error, setLoaded, setError } = useScreenshot(p.homepage ?? null);
  const [mobileLoaded, setMobileLoaded] = useState(false);
  const [mobileError, setMobileError] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
        className="glass-strong group relative overflow-hidden rounded-3xl transition-shadow duration-500 shine-sweep chrome-border"
      >
        {/* Mockup preview area */}
        <div className="relative w-full overflow-hidden bg-gradient-to-br from-[#0D0D0D] to-[#181818] px-4 pt-8 pb-0 sm:px-6 sm:pt-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(232,232,232,0.02)_0%,transparent_60%)] pointer-events-none" />

          <div className="relative flex items-end justify-center gap-3">
            {/* Laptop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative w-full max-w-[320px] mockup-shadow rounded-t-lg overflow-hidden group-hover:scale-[1.03] transition-transform duration-500"
            >
              <LaptopMockup
                src={src}
                alt={`${p.title} - Desktop Preview`}
                loaded={loaded}
                error={error}
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
              />
            </motion.div>

            {/* Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 25, x: 10 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative w-[60px] sm:w-[72px] -mb-1 mockup-shadow rounded-t-lg overflow-hidden group-hover:scale-[1.04] transition-transform duration-500 shrink-0"
            >
              <MobileMockup
                src={mobileSrc}
                alt={`${p.title} - Mobile Preview`}
                loaded={mobileLoaded}
                error={mobileError}
                onLoad={() => setMobileLoaded(true)}
                onError={() => setMobileError(true)}
              />
            </motion.div>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#020202]/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 z-20">
          {p.homepage && (
            <a href={p.homepage} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#E8E8E8] to-[#C0C0C0] px-5 py-2.5 text-xs font-semibold text-[#020202] transition-transform hover:scale-105">
              <ExternalLink className="size-3.5" /> Live Demo
            </a>
          )}
          <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.06] px-5 py-2.5 text-xs font-medium text-[#FFFFFF] backdrop-blur-md transition-transform hover:scale-105">
            <GithubIcon className="size-3.5" /> View Code
          </a>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#A8A8A8]">{p.tag}</div>
              <h3 className="mt-1 font-display text-lg font-semibold text-[#FFFFFF] capitalize">{p.title}</h3>
            </div>
            <a href={p.github} target="_blank" rel="noreferrer" aria-label={`${p.title} on GitHub`}
              className="glass inline-flex size-10 items-center justify-center rounded-xl transition-all duration-300 hover:bg-white/[0.08] shrink-0 border border-white/[0.06]">
              <ArrowUpRight className="size-4 text-[#A8A8A8] group-hover:text-[#E8E8E8] transition-colors" />
            </a>
          </div>

          <p className="mt-2 text-sm text-[#A8A8A8] line-clamp-2 break-words">{p.description}</p>

          {p.features && (
            <ul className="mt-3 space-y-1.5 text-xs text-[#A8A8A8]">
              {p.features.slice(0, 3).map((f: string) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-1.5 size-1 rounded-full bg-[#E8E8E8] shrink-0" /> {f}
                </li>
              ))}
            </ul>
          )}

          {(p.stars !== undefined || p.updated) && (
            <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-[#A8A8A8]">
              {p.stars !== undefined && <span className="inline-flex items-center gap-1"><Star className="size-3" /> {p.stars}</span>}
              {p.forks !== undefined && <span className="inline-flex items-center gap-1"><GitFork className="size-3" /> {p.forks}</span>}
              {p.updated && <span>Updated {new Date(p.updated).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>}
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.stack.map((s: string) => (
              <span key={s} className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[10px] text-[#A8A8A8]">
                {s}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}
