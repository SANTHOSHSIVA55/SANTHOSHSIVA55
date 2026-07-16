import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ExternalLink, ArrowUpRight, Star, GitFork, Monitor, Clock, Users } from "lucide-react";
import { GithubIcon } from "./icons";

/* ─── Screenshot URL Generator ─── */
function getScreenshotUrl(url: string | null): string | null {
  if (!url) return null;
  try {
    new URL(url);
  } catch {
    return null;
  }
  return `https://image.thum.io/get/width/1600/crop/900/${url}`;
}

/* ─── Screenshot Hook ─── */
function useScreenshot(url: string | null) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const src = useMemo(() => getScreenshotUrl(url), [url]);

  useEffect(() => {
    if (!src) return;
    const timeout = setTimeout(() => setError(true), 12000);
    return () => clearTimeout(timeout);
  }, [src]);

  return { src, loaded, error, setLoaded, setError };
}

/* ─── Laptop Mockup SVG ─── */
function LaptopMockup({
  src,
  alt,
  title,
  loaded,
  error,
  onLoad,
  onError,
  className = "",
}: {
  src: string | null;
  alt: string;
  title?: string;
  loaded: boolean;
  error: boolean;
  onLoad: () => void;
  onError: () => void;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 800 520" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <rect x="40" y="10" width="720" height="440" rx="12" fill="#08080e" />
        <rect x="44" y="14" width="712" height="432" rx="10" fill="#0e0e16" />
        <rect x="44" y="14" width="712" height="36" rx="10" fill="rgba(14,14,22,0.95)" />
        <rect x="44" y="40" width="712" height="6" fill="rgba(14,14,22,0.95)" />
        <circle cx="68" cy="32" r="5" fill="#FF5F57" opacity="0.8" />
        <circle cx="86" cy="32" r="5" fill="#FFBD2E" opacity="0.8" />
        <circle cx="104" cy="32" r="5" fill="#28C840" opacity="0.8" />
        <rect x="130" y="24" width="540" height="16" rx="8" fill="rgba(255,255,255,0.03)" />
        <rect x="40" y="450" width="720" height="60" rx="0" fill="#0a0a10" />
        <rect x="40" y="450" width="720" height="1" fill="rgba(255,255,255,0.04)" />
        <rect x="350" y="468" width="100" height="6" rx="3" fill="rgba(255,255,255,0.06)" />
        <rect x="36" y="456" width="728" height="54" rx="6" fill="#0a0a10" />
        <rect x="36" y="456" width="728" height="54" rx="6" stroke="rgba(255,255,255,0.03)" strokeWidth="1" fill="none" />
        <rect x="44" y="14" width="712" height="200" rx="10" fill="url(#laptopReflection)" opacity="0.02" />
        <defs>
          <linearGradient id="laptopReflection" x1="44" y1="14" x2="44" y2="214" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Screenshot overlay positioned over the screen area (44/800=5.5%, 14/520=2.7%, 712/800=89%, 432/520=83%) */}
      <div
        className="absolute overflow-hidden rounded-[10px]"
        style={{ left: "5.5%", top: "2.7%", width: "89%", height: "83.1%" }}
      >
        {src && !error ? (
          <>
            {!loaded && (
              <div className="absolute inset-0 screenshot-shimmer" />
            )}
            <img
              src={src}
              alt={alt}
              onLoad={onLoad}
              onError={onError}
              className="w-full h-full object-cover object-top"
              style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease" }}
            />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#12121a] to-[#0a0a10] flex items-center justify-center flex-col gap-3">
            <Monitor className="size-12 text-white/8" />
            <span className="text-sm text-white/10 font-[Inter,sans-serif]">{title || "Preview"}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Featured Project Card ─── */
export function ProjectShowcaseCard({ project: p }: { project: Record<string, unknown> }) {
  const project = p as {
    title: string; tag: string; description: string; homepage?: string;
    github: string; stack: string[]; features?: string[]; stars?: number;
    forks?: number; updated?: string; accent?: { from: string; to: string; glow: string };
    duration?: string; role?: string; impact?: string[];
  };
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), { stiffness: 200, damping: 25 });

  const { src, loaded, error, setLoaded, setError } = useScreenshot(project.homepage ?? null);

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
        className="cosmic-panel-strong group relative overflow-hidden rounded-3xl transition-shadow duration-500 shine-sweep chrome-border"
      >
        {/* Enlarged mockup showcase area */}
        <div className="relative w-full overflow-hidden bg-gradient-to-br from-[#0a0a10] to-[#12121a] px-4 pt-12 pb-0 sm:px-8 sm:pt-16 md:px-12 md:pt-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.03)_0%,transparent_60%)] pointer-events-none" />

          <div className="relative flex items-end justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative w-full max-w-[640px] mockup-shadow rounded-t-xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-500"
            >
              <LaptopMockup
                src={src}
                alt={`${project.title} - Desktop Preview`}
                title={project.title}
                loaded={loaded}
                error={error}
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
              />
            </motion.div>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#020202]/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4 z-20">
          {project.homepage && (
            <a
              href={project.homepage}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-[#FFFFFF] transition-transform hover:scale-105 min-h-[44px]"
              style={{
                background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
                boxShadow: "0 0 0 1px rgba(59, 130, 246, 0.3)",
              }}
            >
              <ExternalLink className="size-4" /> Live Demo
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.06] px-6 py-3.5 text-sm font-medium text-[#FFFFFF] backdrop-blur-md transition-transform hover:scale-105 min-h-[44px]"
          >
            <GithubIcon className="size-4" /> View Code
          </a>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#A8A8A8]">{project.tag}</div>
              <h3 className="mt-1.5 font-display text-xl sm:text-2xl font-bold text-[#FFFFFF]">{project.title}</h3>
            </div>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="cosmic-panel inline-flex size-11 items-center justify-center rounded-xl transition-all duration-300 hover:bg-white/[0.06] shrink-0 border border-white/[0.05]"
            >
              <ArrowUpRight className="size-4 text-[#A8A8A8] group-hover:text-[#3B82F6] transition-colors" />
            </a>
          </div>

          <p className="mt-3 text-sm sm:text-base text-[#A8A8A8] leading-relaxed">{project.description}</p>

          {(project.duration || project.role) && (
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[#94A3B8]">
              {project.duration && (
                <span className="inline-flex items-center gap-1.5"><Clock className="size-3.5" /> {project.duration}</span>
              )}
              {project.role && (
                <span className="inline-flex items-center gap-1.5"><Users className="size-3.5" /> {project.role}</span>
              )}
            </div>
          )}

          {project.impact && project.impact.length > 0 && (
            <div className="mt-3 space-y-1.5">
              {project.impact.map((m: string) => (
                <div key={m} className="flex items-start gap-2 text-xs text-[#A8A8A8]">
                  <span className="mt-1.5 size-1 rounded-full bg-[#22C55E] shrink-0" /> {m}
                </div>
              ))}
            </div>
          )}

          {project.features && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.features.map((f: string) => (
                <div key={f} className="flex items-center gap-2 text-sm text-[#A8A8A8]">
                  <span className="size-1.5 rounded-full bg-[#3B82F6] shrink-0" /> {f}
                </div>
              ))}
            </div>
          )}

          {(project.stars !== undefined || project.updated) && (
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[#A8A8A8]">
              {project.stars !== undefined && (
                <span className="inline-flex items-center gap-1"><Star className="size-3.5" /> {project.stars}</span>
              )}
              {project.forks !== undefined && (
                <span className="inline-flex items-center gap-1"><GitFork className="size-3.5" /> {project.forks}</span>
              )}
              {project.updated && (
                <span>Updated {new Date(project.updated).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>
              )}
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((s: string) => (
              <span key={s} className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-xs text-[#A8A8A8]">
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
export function ProjectCardCompact({ project: p, index: i }: { project: Record<string, unknown>; index: number }) {
  const project = p as {
    title: string; tag: string; description: string; homepage?: string;
    github: string; stack: string[]; features?: string[]; stars?: number;
    forks?: number; updated?: string; accent?: { from: string; to: string; glow: string };
    duration?: string; role?: string; impact?: string[];
  };
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 25 });

  const { src, loaded, error, setLoaded, setError } = useScreenshot(project.homepage ?? null);

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
        className="cosmic-panel-strong group relative overflow-hidden rounded-3xl transition-shadow duration-500 shine-sweep chrome-border"
      >
        {/* Enlarged mockup preview area */}
        <div className="relative w-full overflow-hidden bg-gradient-to-br from-[#0a0a10] to-[#12121a] px-4 pt-10 pb-0 sm:px-6 sm:pt-12">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.02)_0%,transparent_60%)] pointer-events-none" />

          <div className="relative flex items-end justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative w-full max-w-[400px] mockup-shadow rounded-t-lg overflow-hidden group-hover:scale-[1.03] transition-transform duration-500"
            >
              <LaptopMockup
                src={src}
                alt={`${project.title} - Desktop Preview`}
                title={project.title}
                loaded={loaded}
                error={error}
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
              />
            </motion.div>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#020202]/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 z-20">
          {project.homepage && (
            <a href={project.homepage} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-semibold text-[#FFFFFF] transition-transform hover:scale-105 min-h-[44px]"
              style={{
                background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
                boxShadow: "0 0 0 1px rgba(59, 130, 246, 0.3)",
              }}
            >
              <ExternalLink className="size-3.5" /> Live Demo
            </a>
          )}
          <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.06] px-5 py-3 text-xs font-medium text-[#FFFFFF] backdrop-blur-md transition-transform hover:scale-105 min-h-[44px]">
            <GithubIcon className="size-3.5" /> View Code
          </a>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#A8A8A8]">{project.tag}</div>
              <h3 className="mt-1 font-display text-lg font-semibold text-[#FFFFFF] capitalize">{project.title}</h3>
            </div>
            <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} on GitHub`}
              className="cosmic-panel inline-flex size-11 items-center justify-center rounded-xl transition-all duration-300 hover:bg-white/[0.06] shrink-0 border border-white/[0.05]">
              <ArrowUpRight className="size-4 text-[#A8A8A8] group-hover:text-[#3B82F6] transition-colors" />
            </a>
          </div>

          <p className="mt-2 text-sm text-[#A8A8A8] line-clamp-2 break-words">{project.description}</p>

          {(project.duration || project.role) && (
            <div className="mt-2 flex flex-wrap items-center gap-2.5 text-[11px] text-[#94A3B8]">
              {project.duration && (
                <span className="inline-flex items-center gap-1"><Clock className="size-3" /> {project.duration}</span>
              )}
              {project.role && (
                <span className="inline-flex items-center gap-1"><Users className="size-3" /> {project.role}</span>
              )}
            </div>
          )}

          {project.impact && project.impact.length > 0 && (
            <div className="mt-2 space-y-1">
              {project.impact.map((m: string) => (
                <div key={m} className="flex items-start gap-1.5 text-[11px] text-[#A8A8A8]">
                  <span className="mt-1 size-1 rounded-full bg-[#22C55E] shrink-0" /> {m}
                </div>
              ))}
            </div>
          )}

          {project.features && (
            <ul className="mt-3 space-y-1.5 text-xs text-[#A8A8A8]">
              {project.features.slice(0, 3).map((f: string) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-1.5 size-1 rounded-full bg-[#3B82F6] shrink-0" /> {f}
                </li>
              ))}
            </ul>
          )}

          {(project.stars !== undefined || project.updated) && (
            <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-[#A8A8A8]">
              {project.stars !== undefined && <span className="inline-flex items-center gap-1"><Star className="size-3" /> {project.stars}</span>}
              {project.forks !== undefined && <span className="inline-flex items-center gap-1"><GitFork className="size-3" /> {project.forks}</span>}
              {project.updated && <span>Updated {new Date(project.updated).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>}
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.map((s: string) => (
              <span key={s} className="rounded-lg border border-white/[0.05] bg-white/[0.02] px-2 py-0.5 text-[10px] text-[#A8A8A8]">
                {s}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}
