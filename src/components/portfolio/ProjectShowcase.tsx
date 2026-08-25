import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ExternalLink, ArrowUpRight, Star, GitFork, Monitor, Clock, Users } from "lucide-react";
import { GithubIcon } from "./icons";

/* ─── Stagger Variants for Dashboard Loading Effect ─── */
const cardStagger = (i: number) => ({
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: i * 0.1 } },
});

const fadeSlideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as number[] } },
};

const fadeSlideLeft = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as number[] } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

const fadeInShort = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const tagPop = (delay: number) => ({
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25, delay: 0.3 + delay * 0.04, ease: [0.16, 1, 0.3, 1] as number[] } },
});

const itemSlide = (delay: number) => ({
  hidden: { opacity: 0, x: -6 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, delay: delay * 0.05 } },
});

const impactSlide = (delay: number) => ({
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, delay: delay * 0.06 } },
});

/* ─── Tech Stack Brand Colors ─── */
const TECH_COLORS: Record<string, string> = {
  React: "#61DAFB",
  "React.js": "#61DAFB",
  "Next.js": "#FFFFFF",
  TypeScript: "#3178C6",
  Python: "#FFD43B",
  JavaScript: "#F7DF1E",
  Node: "#339933",
  "Node.js": "#339933",
  Django: "#092E20",
  Flask: "#FFFFFF",
  FastAPI: "#009688",
  PostgreSQL: "#4169E1",
  MongoDB: "#47A248",
  MySQL: "#4479A1",
  Tailwind: "#38BDF8",
  "Tailwind CSS": "#38BDF8",
  Prisma: "#2D3748",
  "Socket.io": "#010101",
  Docker: "#2496ED",
  Git: "#F05032",
  GitHub: "#FFFFFF",
  Pandas: "#150458",
  NumPy: "#013243",
  Matplotlib: "#11557C",
  "Power BI": "#F2C811",
  Excel: "#217346",
  Figma: "#F24E1E",
  "Framer Motion": "#BB4BFF",
  SQL: "#E38C00",
  "REST API": "#FF6C37",
  DSA: "#3B82F6",
  GraphQL: "#E10098",
  Redis: "#DC382D",
  Firebase: "#FFCA28",
  AWS: "#FF9900",
  Vercel: "#FFFFFF",
  Netlify: "#00C7B7",
};

function getTechColor(name: string): string {
  if (TECH_COLORS[name]) return TECH_COLORS[name];
  const lower = name.toLowerCase();
  for (const [key, color] of Object.entries(TECH_COLORS)) {
    if (key.toLowerCase() === lower) return color;
  }
  return "#A8A8A8";
}

function TechTag({ name, delay = 0 }: { name: string; delay?: number }) {
  const color = getTechColor(name);
  return (
    <motion.span
      variants={tagPop(delay)}
      className="tech-tag"
      style={{ "--tech-color": color } as React.CSSProperties}
    >
      {name}
    </motion.span>
  );
}

/* ─── Deployment Status Dot ─── */
function StatusDot({ hasWebsite }: { hasWebsite: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider"
      style={{
        borderColor: hasWebsite ? "rgba(34,197,94,0.2)" : "rgba(59,130,246,0.2)",
        background: hasWebsite ? "rgba(34,197,94,0.06)" : "rgba(59,130,246,0.06)",
        color: hasWebsite ? "#4ADE80" : "#60A5FA",
      }}
    >
      <span
        className="size-1.5 rounded-full"
        style={{
          background: hasWebsite ? "#22C55E" : "#3B82F6",
          boxShadow: hasWebsite ? "0 0 6px rgba(34,197,94,0.4)" : "0 0 6px rgba(59,130,246,0.4)",
        }}
      />
      {hasWebsite ? "Live" : "Code"}
    </span>
  );
}

/* ─── Screenshot URL Generator ─── */
function getScreenshotUrl(url: string | null, retry = 0): string | null {
  if (!url) return null;
  try {
    new URL(url);
  } catch {
    return null;
  }
  const base = `https://image.thum.io/get/width/1600/crop/900/no/animate/20/${url}`;
  return retry > 0 ? `${base}&retry=${retry}&t=${Date.now()}` : base;
}

/* ─── Screenshot Hook ─── */
function useScreenshot(url: string | null) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);

  const src = useMemo(() => getScreenshotUrl(url, retry), [url, retry]);

  useEffect(() => {
    if (!src || loaded) return;
    const timeout = setTimeout(() => {
      if (!loaded) setError(true);
    }, 20000);
    return () => clearTimeout(timeout);
  }, [src, loaded]);

  const handleLoad = useCallback(() => {
    setLoaded(true);
    setError(false);
  }, []);

  const handleError = useCallback(() => {
    if (retry < 2) {
      setRetry((r) => r + 1);
      setError(false);
    } else {
      setError(true);
    }
  }, [retry]);

  return { src, loaded, error, handleLoad, handleError };
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

  const { src, loaded, error, handleLoad, handleError } = useScreenshot(project.homepage ?? null);

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
                onLoad={handleLoad}
                onError={handleError}
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
              <div className="flex items-center gap-2.5">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#A8A8A8]">{project.tag}</div>
                <StatusDot hasWebsite={!!project.homepage} />
              </div>
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
            {project.stack.map((s: string, i: number) => (
              <TechTag key={s} name={s} delay={i} />
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

  const { src, loaded, error, handleLoad, handleError } = useScreenshot(project.homepage ?? null);

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
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={cardStagger(i)}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
        className="cosmic-panel-strong group relative overflow-hidden rounded-3xl transition-shadow duration-500 shine-sweep chrome-border"
      >
        {/* Enlarged mockup preview area */}
        <motion.div
          variants={fadeSlideUp}
          className="relative w-full overflow-hidden bg-gradient-to-br from-[#0a0a10] to-[#12121a] px-4 pt-10 pb-0 sm:px-6 sm:pt-12"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.02)_0%,transparent_60%)] pointer-events-none" />

          <div className="relative flex items-end justify-center">
            <div className="relative w-full max-w-[400px] mockup-shadow rounded-t-lg overflow-hidden group-hover:scale-[1.03] transition-transform duration-500">
              <LaptopMockup
                src={src}
                alt={`${project.title} - Desktop Preview`}
                title={project.title}
                loaded={loaded}
                error={error}
                onLoad={handleLoad}
                onError={handleError}
              />
            </div>
          </div>
        </motion.div>

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
          <motion.div variants={fadeSlideLeft}
            className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#A8A8A8]">{project.tag}</div>
                <StatusDot hasWebsite={!!project.homepage} />
              </div>
              <h3 className="mt-1 font-display text-lg font-semibold text-[#FFFFFF] capitalize">{project.title}</h3>
            </div>
            <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} on GitHub`}
              className="cosmic-panel inline-flex size-11 items-center justify-center rounded-xl transition-all duration-300 hover:bg-white/[0.06] shrink-0 border border-white/[0.05]">
              <ArrowUpRight className="size-4 text-[#A8A8A8] group-hover:text-[#3B82F6] transition-colors" />
            </a>
          </motion.div>

          <motion.p variants={fadeIn}
            className="mt-2 text-sm text-[#A8A8A8] line-clamp-2 break-words">{project.description}</motion.p>

          {(project.duration || project.role) && (
            <motion.div variants={fadeInShort}
              className="mt-2 flex flex-wrap items-center gap-2.5 text-[11px] text-[#94A3B8]">
              {project.duration && (
                <span className="inline-flex items-center gap-1"><Clock className="size-3" /> {project.duration}</span>
              )}
              {project.role && (
                <span className="inline-flex items-center gap-1"><Users className="size-3" /> {project.role}</span>
              )}
            </motion.div>
          )}

          {project.impact && project.impact.length > 0 && (
            <div className="mt-2 space-y-1">
              {project.impact.map((m: string, mi: number) => (
                <motion.div key={m}
                  variants={impactSlide(mi)}
                  className="flex items-start gap-1.5 text-[11px] text-[#A8A8A8]">
                  <span className="mt-1 size-1 rounded-full bg-[#22C55E] shrink-0" /> {m}
                </motion.div>
              ))}
            </div>
          )}

          {project.features && (
            <ul className="mt-3 space-y-1.5 text-xs text-[#A8A8A8]">
              {project.features.slice(0, 3).map((f: string, fi: number) => (
                <motion.li key={f}
                  variants={itemSlide(fi)}
                  className="flex items-start gap-2">
                  <span className="mt-1.5 size-1 rounded-full bg-[#3B82F6] shrink-0" /> {f}
                </motion.li>
              ))}
            </ul>
          )}

          {(project.stars !== undefined || project.updated) && (
            <motion.div variants={fadeInShort}
              className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-[#A8A8A8]">
              {project.stars !== undefined && <span className="inline-flex items-center gap-1"><Star className="size-3" /> {project.stars}</span>}
              {project.forks !== undefined && <span className="inline-flex items-center gap-1"><GitFork className="size-3" /> {project.forks}</span>}
              {project.updated && <span>Updated {new Date(project.updated).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>}
            </motion.div>
          )}

          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.map((s: string, si: number) => (
              <TechTag key={s} name={s} delay={si} />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}
