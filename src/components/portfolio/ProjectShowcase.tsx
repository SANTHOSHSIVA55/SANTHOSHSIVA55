import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ExternalLink, Monitor } from "lucide-react";
import { GithubIcon } from "./icons";

/* ─── Animation Variants ─── */
const cardVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const tagPop = (delay: number) => ({
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2, delay: 0.2 + delay * 0.03, ease: [0.16, 1, 0.3, 1] } },
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

/* ─── Deployment Status ─── */
function StatusBadge({ hasWebsite }: { hasWebsite: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[8px] font-medium uppercase tracking-wider"
      style={{
        color: hasWebsite ? "#4ADE80" : "#60A5FA",
      }}
    >
      <span
        className="size-1 rounded-full"
        style={{
          background: hasWebsite ? "#22C55E" : "#3B82F6",
          boxShadow: hasWebsite ? "0 0 4px rgba(34,197,94,0.4)" : "0 0 4px rgba(59,130,246,0.4)",
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
  const base = `https://image.thum.io/get/width/1200/${url}`;
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
    }, 30000);
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

/* ─── Compact Preview Image ─── */
function PreviewImage({
  src,
  alt,
  title,
  loaded,
  error,
  onLoad,
  onError,
}: {
  src: string | null;
  alt: string;
  title?: string;
  loaded: boolean;
  error: boolean;
  onLoad: () => void;
  onError: () => void;
}) {
  if (!src || error) {
    return (
      <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#0c0c14] to-[#08080e]">
        <div className="text-center">
          <Monitor className="mx-auto size-8 text-white/[0.06]" />
          <span className="mt-1.5 block text-[10px] text-white/[0.08]">{title || "Preview"}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full overflow-hidden bg-[#0a0a10]">
      {!loaded && <div className="absolute inset-0 screenshot-shimmer" />}
      <img
        src={src}
        alt={alt}
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
        onLoad={onLoad}
        onError={onError}
        className="h-full w-full object-cover object-top transition-opacity duration-500"
        style={{ opacity: loaded ? 1 : 0 }}
      />
      {/* Bottom fade for text readability if needed */}
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
    </div>
  );
}

/* ─── Compact Project Card ─── */
export function ProjectCard({ project: p, index }: { project: Record<string, unknown>; index: number }) {
  const project = p as {
    title: string;
    tag: string;
    description: string;
    homepage?: string;
    github: string;
    stack: string[];
    features?: string[];
    stars?: number;
    forks?: number;
    updated?: string;
    duration?: string;
    role?: string;
    impact?: string[];
  };

  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [2, -2]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2, 2]), { stiffness: 200, damping: 25 });

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
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={cardVariants}
      className="flex flex-col h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
        className="group relative flex flex-col h-full overflow-hidden rounded-xl border border-white/[0.06] bg-[#0a0a0f]/80 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.1] hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.5)]"
      >
        {/* Preview image — compact */}
        <div className="relative h-36 sm:h-40 overflow-hidden">
          <PreviewImage
            src={src}
            alt={`${project.title} preview`}
            title={project.title}
            loaded={loaded}
            error={error}
            onLoad={handleLoad}
            onError={handleError}
          />

          {/* Hover overlay with action buttons */}
          <div className="absolute inset-0 flex items-center justify-center gap-2.5 bg-[#020202]/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-250">
            {project.homepage && (
              <a
                href={project.homepage}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[11px] font-semibold text-white transition-transform hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
                  boxShadow: "0 0 0 1px rgba(59,130,246,0.3), 0 2px 8px rgba(0,0,0,0.3)",
                }}
              >
                <ExternalLink className="size-3" /> Live Demo
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.12] bg-white/[0.08] px-3.5 py-2 text-[11px] font-medium text-white backdrop-blur-sm transition-transform hover:scale-105"
            >
              <GithubIcon className="size-3" /> View Code
            </a>
          </div>
        </div>

        {/* Content — compact */}
        <div className="flex flex-col flex-1 p-4">
          {/* Header: tag + role + status */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[9px] uppercase tracking-[0.18em] text-[#707070] truncate">{project.tag}</span>
              {project.role && (
                <span className="text-[9px] text-[#505050]">·</span>
              )}
              {project.role && (
                <span className="text-[9px] text-[#505050] truncate">{project.role}</span>
              )}
            </div>
            <StatusBadge hasWebsite={!!project.homepage} />
          </div>

          {/* Title */}
          <h3 className="mt-2 font-display text-[15px] font-semibold leading-snug text-[#EEEEEE]">
            {project.title}
          </h3>

          {/* Description — 2 lines max */}
          <p className="mt-1.5 text-[12px] leading-[1.5] text-[#808080] line-clamp-2">
            {project.description}
          </p>

          {/* Key features — compact metric pills */}
          {project.features && project.features.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.features.map((f: string) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-1 rounded-md border border-white/[0.04] bg-white/[0.02] px-2 py-1 text-[10px] text-[#909090]"
                >
                  <span className="size-0.5 rounded-full bg-[#3B82F6] shrink-0" />
                  {f}
                </span>
              ))}
            </div>
          )}

          {/* Tech stack tags */}
          <div className="mt-3 flex flex-wrap gap-1">
            {project.stack.map((s: string, si: number) => (
              <TechTag key={s} name={s} delay={si} />
            ))}
          </div>

          {/* Footer: updated + action link */}
          <div className="mt-auto flex items-center justify-between border-t border-white/[0.04] pt-3">
            <span className="text-[10px] text-[#505050]">
              {project.updated
                ? new Date(project.updated).toLocaleDateString(undefined, { month: "short", year: "numeric" })
                : project.duration || ""}
            </span>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[10px] font-medium text-[#606060] transition-colors hover:text-[#3B82F6]"
            >
              Source <ExternalLink className="size-2.5" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}
