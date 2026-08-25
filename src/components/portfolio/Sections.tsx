import { useCallback, useEffect, useMemo, useRef, useState, memo, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Code2, Layers, Sparkles,
  Star, GitFork, RefreshCw, Code, Brain, Rocket, BookOpen,
  Trophy, Target, Zap, CheckCircle2, X, TrendingUp,
  Database, Wrench, GraduationCap, Heart, Lightbulb,
  AlertCircle, Award, RotateCcw, ZoomIn, ZoomOut,
  BadgeCheck, ChevronLeft, ChevronRight, ImageOff, Images, Expand,
} from "lucide-react";
import { GithubIcon } from "./icons";
import { profile, projects as featuredProjects, skills, timeline, certifications, achievements } from "./data";
import { ProjectCard } from "./ProjectShowcase";
import { InfiniteMarquee } from "./InfiniteMarquee";

/* ──────────── Section Header ──────────── */
const SectionHeader = memo(function SectionHeader({ kicker, title, lead }: { kicker: string; title: string; lead?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/10 bg-[#3B82F6]/[0.04] px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-[#A8A8A8]"
      >
        <Sparkles className="size-3.5 text-[#3B82F6]" /> {kicker}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="mt-5 font-display text-4xl sm:text-5xl lg:text-[52px] font-bold tracking-[-0.03em] leading-[1.05]"
      >
        {title}
      </motion.h2>
      {lead && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-4 text-base sm:text-lg text-[#94A3B8] max-w-xl mx-auto leading-relaxed"
        >
          {lead}
        </motion.p>
      )}
    </div>
  );
});

/* ──────────── Animated Counter ──────────── */
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, value]);

  return (
    <div ref={ref} className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-accent-gradient tabular-nums">
      {display}{suffix}
    </div>
  );
}

/* ──────────── About ──────────── */
export function About() {
  return (
    <section id="about" className="relative section-padding">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader kicker="About" title="Aspiring Software Engineer, Developer & Data Analyst" />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          {/* Left — Editorial summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <blockquote className="relative">
              <div className="absolute -top-6 -left-4 text-[80px] sm:text-[120px] font-display font-bold text-[#3B82F6]/[0.04] leading-none select-none pointer-events-none">
                &ldquo;
              </div>
              <p className="font-display text-xl sm:text-2xl lg:text-[28px] font-medium leading-[1.55] text-[#D9D9D9] relative z-10">
                I&apos;m passionate about building{' '}
                <span className="text-[#F8FAFC]">scalable web applications</span>{' '}
                and transforming data into{' '}
                <span className="text-accent-gradient">meaningful insights</span>{' '}
                — from first lines of code to production-grade engineering.
              </p>
            </blockquote>

            <p className="mt-6 text-sm sm:text-[15px] leading-[1.85] text-[#94A3B8] max-w-lg">
              A Computer Science undergrad in Chennai with hands-on experience in full-stack development,
              data analytics, and modern software engineering. I build products that solve real problems
              and deliver measurable impact.
            </p>

            {/* Quick facts */}
            <motion.div
              className="mt-6 flex flex-wrap gap-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            >
              {[
                { label: "4th Year CSE", icon: <GraduationCap className="size-3.5" /> },
                { label: "300+ DSA", icon: <Code2 className="size-3.5" /> },
                { label: "Open to Internships", icon: <Zap className="size-3.5" /> },
              ].map((f) => (
                <motion.span key={f.label}
                  variants={pillPop}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#3B82F6]/10 bg-[#3B82F6]/[0.04] px-3 py-1.5 text-xs text-[#A8A8A8]">
                  {f.icon} {f.label}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Animated cards */}
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: <Target className="size-5" />, title: "Current Focus", desc: "Building production-grade full-stack applications and mastering data analytics." },
              { icon: <Lightbulb className="size-5" />, title: "Specialization", desc: "React, Python (Django, FastAPI), SQL, and data visualization tools." },
              { icon: <GraduationCap className="size-5" />, title: "Education", desc: "CSE Undergrad in Chennai. 300+ DSA problems solved." },
              { icon: <Zap className="size-5" />, title: "Seeking", desc: "Internship and placement opportunities in Software Engineering and Data Analytics." },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="cosmic-panel group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.03] hover-glow chrome-border"
              >
                <div className="relative z-10">
                  <div className="flex size-10 items-center justify-center rounded-xl border border-[#3B82F6]/10 bg-[#3B82F6]/[0.04] text-[#3B82F6] mb-3 transition-colors duration-300 group-hover:text-[#60A5FA]">
                    {card.icon}
                  </div>
                  <h3 className="font-display text-sm font-semibold text-[#FFFFFF]">{card.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[#A8A8A8]">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────── Skills ──────────── */
const skillLayouts: Record<string, { icon: typeof Code2; color: string; description: string }> = {
  "Data Analytics": { icon: TrendingUp, color: "#38BDF8", description: "Turning raw data into actionable insights" },
  "Frontend": { icon: Layers, color: "#60A5FA", description: "Building beautiful, responsive interfaces" },
  "Backend": { icon: Code2, color: "#818CF8", description: "Scalable APIs and server architecture" },
  "Database": { icon: Database, color: "#A78BFA", description: "Data modeling and query optimization" },
  "Tools": { icon: Wrench, color: "#38BDF8", description: "Development workflow and collaboration" },
  "Computer Science": { icon: Brain, color: "#3B82F6", description: "Fundamental theory and problem solving" },
};

const cardReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as number[] } },
};

const cardRevealScale = {
  hidden: { opacity: 0, y: 15, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as number[] } },
};

const tagRipple = (delay: number) => ({
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25, delay: 0.2 + delay * 0.03, ease: [0.16, 1, 0.3, 1] as number[] } },
});

const pillPop = {
  hidden: { opacity: 0, scale: 0.8, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as number[] } },
};

export function Skills() {
  return (
    <section id="skills" className="relative section-padding">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          kicker="Toolkit"
          title="Skills & Expertise"
          lead="Technologies and tools I use to build production-grade applications."
        />

        <div className="mt-10">
          <InfiniteMarquee />
        </div>

        <motion.div
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {skills.map((g) => {
            const layout = skillLayouts[g.group] ?? { icon: Code2, color: "#3B82F6", description: "" };
            const Icon = layout.icon;
            return (
              <motion.div
                key={g.group}
                variants={cardReveal}
                className="cosmic-panel group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.03] chrome-border hover-glow"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="flex size-11 items-center justify-center rounded-xl border border-[#3B82F6]/10 bg-[#3B82F6]/[0.04]"
                      style={{ color: layout.color }}
                    >
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-semibold text-[#FFFFFF]">{g.group}</h3>
                      <p className="text-[11px] text-[#A8A8A8]">{layout.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {g.items.map((it, ti) => (
                      <motion.span
                        key={it}
                        variants={tagRipple(ti)}
                        className="rounded-lg border border-white/[0.05] bg-white/[0.02] px-2.5 py-1 text-xs text-[#A8A8A8] transition-all duration-200 group-hover:text-[#FFFFFF] group-hover:border-white/[0.08] group-hover:bg-white/[0.04]"
                      >
                        {it}
                      </motion.span>
                    ))}
                  </div>
                  {g.projects && g.projects.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-white/[0.04]">
                      <div className="text-[10px] uppercase tracking-[0.15em] text-[#94A3B8] mb-1.5">Used in</div>
                      <div className="flex flex-wrap gap-1.5">
                        {g.projects.map((p) => (
                          <span key={p} className="inline-flex items-center gap-1 rounded-full bg-[#22C55E]/[0.06] border border-[#22C55E]/10 px-2 py-0.5 text-[10px] text-[#A8A8A8]">
                            <CheckCircle2 className="size-2.5 text-[#22C55E]" /> {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────── Shared GitHub Fetch Cache ──────────── */
type Repo = {
  id: number; name: string; html_url: string; homepage: string | null;
  description: string | null; stargazers_count: number; forks_count: number;
  language: string | null; topics?: string[]; pushed_at: string; updated_at: string;
  fork: boolean; archived: boolean;
};

type User = {
  public_repos: number; followers: number; following: number;
  avatar_url: string; name: string | null; bio: string | null; public_gists?: number;
};

const HIDDEN_REPO_NAMES = new Set(["santhoshsiva55", "certificates", "data-analysis-portfolio"]);

let _cachedRepos: Repo[] | null = null;
let _cachedUser: User | null = null;
let _fetchPromise: Promise<{ repos: Repo[]; user: User }> | null = null;

function fetchGitHubData() {
  if (_cachedRepos && _cachedUser) return Promise.resolve({ repos: _cachedRepos, user: _cachedUser });
  if (_fetchPromise) return _fetchPromise;

  const githubUser = profile.github.split("/").pop();
  _fetchPromise = Promise.all([
    fetch(`https://api.github.com/users/${githubUser}`).then((r) => {
      if (r.status === 403) throw new Error("rate-limited");
      if (!r.ok) throw new Error(`GitHub API error: ${r.status}`);
      return r.json();
    }),
    fetch(`https://api.github.com/users/${githubUser}/repos?per_page=100&sort=updated`).then((r) => {
      if (r.status === 403) throw new Error("rate-limited");
      if (!r.ok) throw new Error(`GitHub API error: ${r.status}`);
      return r.json();
    }),
  ]).then(([u, r]: [User, Repo[]]) => {
    _cachedUser = u;
    _cachedRepos = (r ?? []).filter((x) => !x.fork);
    return { repos: _cachedRepos, user: _cachedUser };
  }).catch((err) => {
    _fetchPromise = null;
    throw err;
  });

  return _fetchPromise;
}

/* ──────────── Projects ──────────── */
export function Projects() {
  const accents = [
    { from: "rgba(59,130,246,0.20)", to: "rgba(99,102,241,0.12)", glow: "#3B82F6" },
    { from: "rgba(99,102,241,0.20)", to: "rgba(139,92,246,0.12)", glow: "#6366F1" },
    { from: "rgba(59,130,246,0.20)", to: "rgba(56,189,248,0.12)", glow: "#38BDF8" },
  ];

  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchGitHubData()
      .then(({ repos }) => {
        if (cancelled) return;
        const cleaned = repos
          .filter((r) => !r.archived && !HIDDEN_REPO_NAMES.has(r.name.toLowerCase()))
          .sort((a, b) => +new Date(b.pushed_at) - +new Date(a.pushed_at))
          .slice(0, 6);
        setRepos(cleaned);
      })
      .catch(() => !cancelled && setErr("Showing cached projects."));
    return () => { cancelled = true; };
  }, []);

  const cards = useMemo(() => {
    if (repos && repos.length) {
      return repos.map((r, i) => {
        const featured = featuredProjects.find(
          (f) => f.github.toLowerCase().endsWith("/" + r.name.toLowerCase()),
        );
        const stack = (r.topics?.length ? r.topics : [r.language].filter(Boolean) as string[]).slice(0, 6);
        return {
          title: featured?.title ?? r.name.replace(/[-_]/g, " "),
          tag: featured?.tag ?? (r.language ?? "Code"),
          description: featured?.description ?? r.description ?? "Open source project.",
          problem: featured?.problem,
          solution: featured?.solution,
          features: featured?.features,
          stack: featured?.stack ?? (stack.length ? stack : ["Code"]),
          github: r.html_url,
          homepage: r.homepage || featured?.website || undefined,
          stars: r.stargazers_count,
          forks: r.forks_count,
          updated: r.pushed_at,
          duration: featured?.duration,
          role: featured?.role,
          impact: featured?.impact,
          accent: accents[i % accents.length],
        };
      });
    }
    return featuredProjects.map((p, i) => ({
      ...p,
      homepage: p.website as string | undefined,
      stars: undefined as number | undefined,
      forks: undefined as number | undefined,
      updated: undefined as string | undefined,
      accent: accents[i % accents.length],
    }));
  }, [repos]);

  return (
    <section id="projects" className="relative section-padding">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          kicker="Featured Work"
          title="Projects I've Built"
          lead="Real-world applications spanning AI, data analytics, and full-stack platforms."
        />

        {!repos && !err && (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-white/[0.06] bg-[#0a0a0f]/80 overflow-hidden">
                <div className="h-36 sm:h-40 animate-pulse bg-white/[0.03]" />
                <div className="p-4 space-y-2.5">
                  <div className="h-3 w-2/3 animate-pulse rounded bg-white/[0.05]" />
                  <div className="h-2.5 w-full animate-pulse rounded bg-white/[0.04]" />
                  <div className="h-2.5 w-4/5 animate-pulse rounded bg-white/[0.04]" />
                  <div className="flex gap-1.5 pt-1">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-4 w-12 animate-pulse rounded bg-white/[0.04]" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {cards.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
            {cards.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ──────────── Journey Timeline ──────────── */
const timelineIcons: Record<string, typeof Code2> = {
  code: Code,
  brain: Brain,
  stack: Layers,
  sparkle: Sparkles,
  rocket: Rocket,
};

const timelineColors = ["#3B82F6", "#6366F1", "#818CF8", "#A78BFA"];

export function Journey() {
  return (
    <section id="journey" className="relative section-padding">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeader kicker="Journey" title="The Road So Far" lead="From first lines of code to building full-stack and data-driven applications." />

        <div className="relative mt-14">
          {/* Growing vertical line */}
          <div className="absolute left-[19px] sm:left-[23px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-[#3B82F6]/30 via-[#6366F1]/15 to-transparent" />

          <ul className="space-y-10 md:space-y-0">
            {timeline.map((t, i) => {
              const Icon = timelineIcons[t.icon] ?? Code;
              const color = timelineColors[i] ?? "#3B82F6";
              const isLeft = i % 2 === 0;

              return (
                <motion.li
                  key={t.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative md:py-8"
                >
                  {/* Timeline node */}
                  <span
                    aria-hidden
                    className="absolute left-[19px] sm:left-[23px] md:left-1/2 top-5 z-10 flex size-10 -translate-x-1/2 items-center justify-center rounded-full ring-4 ring-[#020202]"
                    style={{ background: `linear-gradient(135deg, ${color}, ${color}80)` }}
                  >
                    <Icon className="size-4 text-white" />
                  </span>

                  {/* Desktop layout */}
                  <div className="hidden md:grid md:w-full md:grid-cols-2 md:gap-14 lg:gap-20">
                    <div className={`flex ${isLeft ? "justify-end" : "justify-start"}`}>
                      {isLeft ? (
                        <div className="max-w-md text-right">
                          <span className="inline-block rounded-full px-4 py-1 text-xs font-semibold tracking-wider" style={{ color }}>
                            {t.year}
                          </span>
                          <div className="cosmic-panel group relative mt-3 overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.03] hover-glow chrome-border">
                            <h3 className="font-display text-xl font-semibold text-[#FFFFFF]">{t.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-[#A8A8A8]">{t.body}</p>
                          </div>
                        </div>
                      ) : <div />}
                    </div>
                    <div className="flex">
                      {!isLeft ? (
                        <div className="max-w-md">
                          <span className="inline-block rounded-full px-4 py-1 text-xs font-semibold tracking-wider" style={{ color }}>
                            {t.year}
                          </span>
                          <div className="cosmic-panel group relative mt-3 overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.03] hover-glow chrome-border">
                            <h3 className="font-display text-xl font-semibold text-[#FFFFFF]">{t.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-[#A8A8A8]">{t.body}</p>
                          </div>
                        </div>
                      ) : <div />}
                    </div>
                  </div>

                  {/* Mobile layout */}
                  <div className="md:hidden pl-14">
                    <span className="inline-block rounded-full px-3 py-1 text-[11px] font-semibold tracking-wider" style={{ color }}>
                      {t.year}
                    </span>
                    <div className="cosmic-panel group relative mt-3 overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:bg-white/[0.03] hover-glow chrome-border">
                      <h3 className="font-display text-lg font-semibold text-[#FFFFFF]">{t.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#A8A8A8]">{t.body}</p>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ──────────── Certifications ──────────── */
const CERT_REPO = "SANTHOSHSIVA55/Certificates";
const CERT_IMG_EXT = /\.(png|jpe?g|webp|gif)$/i;
const CERT_EXCLUDED = new Set([
  "Gemini in Google Docs Skillup.png",
  "Html Simplilearn.png",
  "Css Simplilearn.png",
  "Hp Ai For beginners.png",
  "Expertisor acedemy prompt engineering.png",
]);
const CERTS_CACHE_KEY = "portfolio:certs:v4";
const CERTS_CACHE_TTL = 30 * 60 * 1000;

type Cert = {
  title: string;
  issuer: string;
  skills: string[];
  image: string;
  link: string;
  date?: string;
};

const certMetaByFile = new Map<string, { title: string; issuer: string; skills: string[] }>(
  certifications.map((c) => [decodeURIComponent(c.image.split("/").pop() ?? ""), c]),
);

function certFromFile(name: string, date?: string): Cert {
  const meta = certMetaByFile.get(name);
  const title = meta?.title ?? name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  return {
    title,
    issuer: meta?.issuer ?? "GitHub",
    skills: meta?.skills ?? [],
    image: `https://raw.githubusercontent.com/${CERT_REPO}/main/${encodeURIComponent(name)}`,
    link: `https://github.com/${CERT_REPO}/blob/main/${encodeURIComponent(name)}`,
    date,
  };
}

let _cachedCerts: Cert[] | null = null;
let _certsPromise: Promise<Cert[]> | null = null;

function readCertCache(): Cert[] | null {
  try {
    const raw = localStorage.getItem(CERTS_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { fetchedAt?: number; certs?: Cert[] };
    if (!parsed || typeof parsed.fetchedAt !== "number" || !Array.isArray(parsed.certs) || !parsed.certs.length) return null;
    if (Date.now() - parsed.fetchedAt > CERTS_CACHE_TTL) return null;
    return parsed.certs;
  } catch {
    return null;
  }
}

function writeCertCache(certs: Cert[]) {
  try {
    localStorage.setItem(CERTS_CACHE_KEY, JSON.stringify({ fetchedAt: Date.now(), certs }));
  } catch {
    return;
  }
}

type CertFileEntry = { type: string; name: string };
type CertCommitItem = { sha: string; commit: { committer?: { date?: string }; author?: { date?: string } } };
type CertCommitDetail = {
  commit: { committer?: { date?: string }; author?: { date?: string } };
  files?: { filename: string }[];
};

async function fetchCertDates(files: string[]): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  try {
    const res = await fetch(`https://api.github.com/repos/${CERT_REPO}/commits?per_page=100`);
    if (res.status === 403 || !res.ok) return map;
    const commits: CertCommitItem[] = await res.json();
    for (const c of (commits ?? []).slice(0, 25)) {
      const missing = files.filter((f) => !map.has(f));
      if (!missing.length) break;
      const detailRes = await fetch(`https://api.github.com/repos/${CERT_REPO}/commits/${c.sha}`);
      if (detailRes.status === 403) break;
      if (!detailRes.ok) continue;
      const detail: CertCommitDetail = await detailRes.json();
      const date = detail.commit?.committer?.date ?? detail.commit?.author?.date;
      if (!date) continue;
      for (const f of detail.files ?? []) {
        if (!map.has(f.filename)) map.set(f.filename, date);
      }
    }
  } catch {
    return map;
  }
  return map;
}

function fetchCertificates(): Promise<Cert[]> {
  if (_cachedCerts) return Promise.resolve(_cachedCerts);
  if (_certsPromise) return _certsPromise;

  const cached = readCertCache();
  if (cached) {
    _cachedCerts = cached;
    return Promise.resolve(cached);
  }

  _certsPromise = (async () => {
    const res = await fetch(`https://api.github.com/repos/${CERT_REPO}/contents`);
    if (res.status === 403) throw new Error("rate-limited");
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    const entries: CertFileEntry[] = await res.json();

    const names = (entries ?? [])
      .filter((e) => e.type === "file" && CERT_IMG_EXT.test(e.name))
      .map((e) => e.name)
      .filter((n) => !CERT_EXCLUDED.has(n));

    if (!names.length) throw new Error("no certificate files");

    const dates = await fetchCertDates(names);
    const certs = names
      .map((n) => certFromFile(n, dates.get(n)))
      .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? "") || a.title.localeCompare(b.title));

    _cachedCerts = certs;
    writeCertCache(certs);
    return certs;
  })();

  _certsPromise.catch(() => {
    _certsPromise = null;
  });
  return _certsPromise;
}

function ToolbarBtn({ label, onClick, disabled, children }: { label: string; onClick: () => void; disabled?: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      disabled={disabled}
      className="flex size-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-[#A8A8A8] transition-colors duration-200 hover:bg-white/[0.08] hover:text-[#FFFFFF] disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function CertImage({ cert, eager, className }: { cert: Cert; eager?: boolean; className?: string }) {
  const [broken, setBroken] = useState(false);

  useEffect(() => {
    setBroken(false);
  }, [cert.image]);

  if (broken) {
    return (
      <div className={`flex flex-col items-center justify-center gap-2 ${className ?? ""}`}>
        <ImageOff className="size-8 text-[#64748B]" />
        <span className="text-xs text-[#64748B]">Preview unavailable</span>
      </div>
    );
  }

  return (
    <img
      src={cert.image}
      alt={`${cert.title} certificate issued by ${cert.issuer}`}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      onError={() => setBroken(true)}
      className={className}
    />
  );
}

function CertLightbox({
  certs,
  index,
  onClose,
  onNavigate,
}: {
  certs: Cert[];
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const cert = certs[index];
  const areaRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinchDist = useRef(0);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const scaleRef = useRef(1);
  const [t, setT] = useState({ scale: 1, x: 0, y: 0 });

  const prev = useCallback(
    () => onNavigate((index - 1 + certs.length) % certs.length),
    [certs.length, index, onNavigate],
  );
  const next = useCallback(
    () => onNavigate((index + 1) % certs.length),
    [certs.length, index, onNavigate],
  );

  useEffect(() => {
    setT({ scale: 1, x: 0, y: 0 });
  }, [cert.link]);

  useEffect(() => {
    scaleRef.current = t.scale;
  }, [t.scale]);

  useEffect(() => {
    const a = certs[(index + 1) % certs.length];
    const b = certs[(index - 1 + certs.length) % certs.length];
    for (const c of [a, b]) {
      if (c?.image) {
        const img = new Image();
        img.src = c.image;
      }
    }
  }, [certs, index]);

  useEffect(() => {
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      restoreFocusRef.current?.focus();
    };
  }, []);

  const zoomBy = useCallback((factor: number, clientX?: number, clientY?: number) => {
    setT((cur) => {
      const rect = areaRef.current?.getBoundingClientRect();
      if (!rect) return cur;
      const px = clientX !== undefined ? clientX - rect.left : rect.width / 2;
      const py = clientY !== undefined ? clientY - rect.top : rect.height / 2;
      const ns = Math.min(4, Math.max(1, cur.scale * factor));
      if (ns === cur.scale) return cur;
      const ratio = ns / cur.scale;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      return {
        scale: ns,
        x: (1 - ratio) * (px - cx) + cur.x * ratio,
        y: (1 - ratio) * (py - cy) + cur.y * ratio,
      };
    });
  }, []);

  const reset = useCallback(() => setT({ scale: 1, x: 0, y: 0 }), []);

  useEffect(() => {
    const el = areaRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomBy(e.deltaY < 0 ? 1.15 : 1 / 1.15, e.clientX, e.clientY);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoomBy]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && scaleRef.current <= 1.05) prev();
      else if (e.key === "ArrowRight" && scaleRef.current <= 1.05) next();
      else if (e.key === "+" || e.key === "=") zoomBy(1.3);
      else if (e.key === "-" || e.key === "_") zoomBy(1 / 1.3);
      else if (e.key === "0") reset();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next, zoomBy, reset]);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1) {
      dragStart.current = { x: e.clientX, y: e.clientY };
    } else if (pointers.current.size === 2) {
      dragStart.current = null;
      const [p1, p2] = [...pointers.current.values()];
      pinchDist.current = Math.hypot(p2.x - p1.x, p2.y - p1.y);
    }
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2) {
      const [p1, p2] = [...pointers.current.values()];
      const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
      if (pinchDist.current > 0 && dist > 0) {
        zoomBy(dist / pinchDist.current, (p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
      }
      pinchDist.current = dist;
      return;
    }

    if (pointers.current.size === 1 && dragStart.current) {
      setT((cur) => {
        if (cur.scale <= 1) return cur;
        return {
          ...cur,
          x: cur.x + (e.clientX - prev.x),
          y: cur.y + (e.clientY - prev.y),
        };
      });
    }
  };

  const endPointer = (e: ReactPointerEvent<HTMLDivElement>) => {
    pointers.current.delete(e.pointerId);
    dragStart.current = null;
    pinchDist.current = 0;
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100]"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${cert.title}, certificate ${index + 1} of ${certs.length}`}
    >
      <motion.div
        className="absolute inset-0 bg-black/90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
      />

      <button
        ref={closeRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close viewer"
        title="Close viewer"
        className="absolute right-3 top-3 z-30 flex size-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-[#FFFFFF] backdrop-blur transition-colors duration-200 hover:bg-black/70 sm:right-5 sm:top-5"
      >
        <X className="size-5" />
      </button>

      {certs.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous certificate"
            title="Previous certificate"
            className="absolute left-2 top-1/2 z-30 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-[#D6D6D6] backdrop-blur transition-colors duration-200 hover:bg-black/70 hover:text-[#FFFFFF] sm:left-5 sm:size-12"
          >
            <ChevronLeft className="size-5 sm:size-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next certificate"
            title="Next certificate"
            className="absolute right-2 top-1/2 z-30 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-[#D6D6D6] backdrop-blur transition-colors duration-200 hover:bg-black/70 hover:text-[#FFFFFF] sm:right-5 sm:size-12"
          >
            <ChevronRight className="size-5 sm:size-6" />
          </button>
        </>
      )}

      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="absolute inset-0 z-10 flex items-center justify-center p-3 sm:p-8"
      >
        <div
          ref={areaRef}
          className="relative will-change-transform"
          style={{
            transform: `translate3d(${t.x}px, ${t.y}px, 0) scale(${t.scale})`,
            touchAction: "none",
            cursor: t.scale > 1 ? "grab" : "zoom-in",
          }}
          onClick={(e) => e.stopPropagation()}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endPointer}
          onPointerCancel={endPointer}
          onDoubleClick={(e) => {
            setT((cur) => {
              if (cur.scale > 1.05) return { scale: 1, x: 0, y: 0 };
              const rect = e.currentTarget.getBoundingClientRect();
              const px = e.clientX - rect.left;
              const py = e.clientY - rect.top;
              const ratio = 2.5 / cur.scale;
              return {
                scale: 2.5,
                x: (1 - ratio) * (px - rect.width / 2) + cur.x * ratio,
                y: (1 - ratio) * (py - rect.height / 2) + cur.y * ratio,
              };
            });
          }}
        >
          <CertImage
            cert={cert}
            eager
            className="max-h-[85vh] max-w-[90vw] select-none object-contain sm:max-h-[88vh]"
          />
        </div>
      </motion.div>

      <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-black/50 p-1.5 backdrop-blur">
        <ToolbarBtn label="Zoom out" onClick={() => zoomBy(1 / 1.3)} disabled={t.scale <= 1}>
          <ZoomOut className="size-4" />
        </ToolbarBtn>
        <ToolbarBtn label="Zoom in" onClick={() => zoomBy(1.3)} disabled={t.scale >= 4}>
          <ZoomIn className="size-4" />
        </ToolbarBtn>
        <ToolbarBtn label="Reset zoom" onClick={reset} disabled={t.scale === 1 && t.x === 0 && t.y === 0}>
          <RotateCcw className="size-4" />
        </ToolbarBtn>
        <span className="hidden min-w-12 text-center text-[11px] tabular-nums text-[#A8A8A8] sm:block">
          {Math.round(t.scale * 100)}%
        </span>
      </div>
    </motion.div>
  );
}

export function Certifications() {
  const [certs, setCerts] = useState<Cert[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchCertificates()
      .then((list) => !cancelled && setCerts(list))
      .catch((e: unknown) => {
        if (cancelled) return;
        setErr(
          e instanceof Error && e.message === "rate-limited"
            ? "GitHub API rate limited — showing saved certificates."
            : "Couldn't reach GitHub — showing saved certificates.",
        );
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const display: Cert[] = certs ?? certifications;
  const loading = certs === null && !err;

  return (
    <section id="certifications" className="relative section-padding">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          kicker="Credentials"
          title="Certifications"
          lead="Industry-recognized certifications that validate my expertise."
        />

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#3B82F6]/15 bg-[#3B82F6]/[0.05] px-3 py-1.5 text-[11px] font-medium text-[#A8A8A8]">
            <Images className="size-3.5 text-[#3B82F6]" />
            {display.length} verified credentials
          </span>
          {certs && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-[11px] font-medium text-[#64748B]">
              <RefreshCw className="size-3.5" />
              Auto-synced from GitHub
            </span>
          )}
        </motion.div>

        {err && (
          <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-2 rounded-xl border border-amber-400/20 bg-amber-400/[0.05] px-4 py-2.5 text-center text-xs text-amber-200/90">
            <AlertCircle className="size-3.5 shrink-0" /> {err}
          </div>
        )}

        {loading ? (
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="cosmic-panel animate-pulse rounded-xl p-2.5">
                <div className="aspect-[4/3] w-full rounded-lg bg-white/[0.05]" />
                <div className="mt-2.5 h-3 w-3/4 rounded bg-white/[0.05]" />
                <div className="mt-2 h-2.5 w-1/2 rounded bg-white/[0.04]" />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {display.map((c, i) => (
              <motion.div
                key={c.link}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.3) }}
                className="cosmic-panel group relative overflow-hidden rounded-xl p-2.5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.03] hover-glow chrome-border shine-sweep"
              >
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`View certificate: ${c.title}`}
                  className="block w-full text-left"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-white/[0.04]">
                    <CertImage cert={c} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]" />
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="flex size-8 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
                        <Expand className="size-4 text-[#FFFFFF]" />
                      </span>
                    </div>
                    <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-white/10" />
                  </div>
                  <h3 title={c.title} className="mt-2.5 line-clamp-1 text-[13px] font-display font-semibold leading-snug text-[#FFFFFF] transition-colors duration-200 group-hover:text-[#7CB3FF]">
                    {c.title}
                  </h3>
                  <p className="mt-1 flex items-center gap-1 text-[11px] text-[#A8A8A8]">
                    <BadgeCheck className="size-3 shrink-0 text-[#6366F1]" />
                    <span className="truncate">{c.issuer}</span>
                  </p>
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {index !== null && display[index] && (
          <CertLightbox
            key={display[index].link}
            certs={display}
            index={index}
            onClose={() => setIndex(null)}
            onNavigate={setIndex}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ──────────── Now ──────────── */
export function Now() {
  const items = [
    {
      icon: <BookOpen className="size-4" />,
      label: "Learning",
      title: "Advanced SQL & Database Design",
      desc: "Window functions, query optimization, and schema design for analytics workloads.",
      color: "#3B82F6",
    },
    {
      icon: <Code2 className="size-4" />,
      label: "Building",
      title: "Real-time Data Pipeline",
      desc: "Streaming ETL with Kafka and Python — processing live data into dashboards.",
      color: "#6366F1",
    },
    {
      icon: <Lightbulb className="size-4" />,
      label: "Exploring",
      title: "System Design Patterns",
      desc: "Studying distributed systems, caching strategies, and scalable architecture.",
      color: "#8B5CF6",
    },
  ];

  return (
    <section id="now" className="relative section-padding">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader kicker="Now" title="What I'm Up To" lead="Currently focused on these three areas." />
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="cosmic-panel group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:bg-white/[0.03] hover-glow chrome-border"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="flex size-8 items-center justify-center rounded-lg border bg-opacity-10"
                    style={{ borderColor: `${item.color}20`, backgroundColor: `${item.color}08`, color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-medium" style={{ color: item.color }}>
                    {item.label}
                  </span>
                </div>
                <h3 className="font-display text-sm font-semibold text-[#FFFFFF] leading-snug">{item.title}</h3>
                <p className="mt-1.5 text-xs text-[#A8A8A8] leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────── Achievements ──────────── */
export function Achievements() {
  const iconMap: Record<string, typeof Code2> = {
    code: Code,
    rocket: Rocket,
    sparkle: Sparkles,
  };
  const colors = ["#3B82F6", "#6366F1", "#818CF8"];

  return (
    <section id="achievements" className="relative section-padding">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          kicker="Milestones"
          title="Achievements"
          lead="Key milestones that reflect my growth and dedication."
        />
        <motion.div
          className="mt-12 grid gap-4 sm:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          {achievements.map((a) => {
            const Icon = iconMap[a.icon] ?? Trophy;
            const color = colors[achievements.indexOf(a)] ?? "#3B82F6";
            return (
              <motion.div
                key={a.label}
                variants={cardRevealScale}
                className="cosmic-panel group relative overflow-hidden rounded-2xl p-8 text-center transition-all duration-300 hover:bg-white/[0.03] hover-glow chrome-border"
              >
                <div className="relative z-10">
                  <div className="flex justify-center mb-4">
                    <div className="flex size-14 items-center justify-center rounded-2xl border border-[#3B82F6]/10 bg-[#3B82F6]/[0.04]" style={{ color }}>
                      <Icon className="size-6" />
                    </div>
                  </div>
                  <AnimatedCounter value={a.value} suffix={a.suffix} />
                  <div className="mt-2 text-sm text-[#A8A8A8]">{a.label}</div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────── GitHub Stats ──────────── */
const LANG_COLORS: Record<string, string> = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Ruby: "#701516",
  Go: "#00ADD8",
  Rust: "#dea584",
  "C++": "#f34b7d",
  C: "#555555",
  SQL: "#e38c00",
  Jupyter: "#DA5B0B",
};

export function GithubStats() {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchGitHubData()
      .then(({ repos, user }) => {
        if (cancelled) return;
        setUser(user);
        setRepos(repos.filter((r) => !HIDDEN_REPO_NAMES.has(r.name.toLowerCase())));
      })
      .catch((err) => !cancelled && setErr(err?.message === "rate-limited"
        ? "GitHub API rate limited — try again later."
        : "Could not load GitHub data."));
    return () => { cancelled = true; };
  }, []);

  const langData = useMemo(() => {
    if (!repos) return [];
    const counts: Record<string, { count: number }> = {};
    for (const r of repos) {
      if (r.language) {
        if (!counts[r.language]) counts[r.language] = { count: 0 };
        counts[r.language].count++;
      }
    }
    const total = Object.values(counts).reduce((s, c) => s + c.count, 0);
    return Object.entries(counts)
      .map(([name, c]) => ({ name, count: c.count, pct: Math.round((c.count / total) * 100) }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [repos]);

  const totalStars = useMemo(() => repos === null ? "—" : repos.reduce((s, r) => s + r.stargazers_count, 0), [repos]);
  const totalForks = useMemo(() => repos === null ? "—" : repos.reduce((s, r) => s + r.forks_count, 0), [repos]);
  const recentCommits = useMemo(() => {
    if (!repos) return "—";
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    return repos.filter((r) => new Date(r.pushed_at).getTime() > thirtyDaysAgo).length;
  }, [repos]);

  return (
    <section id="github" className="relative section-padding">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          kicker="GitHub Statistics"
          title="Open Source Activity"
          lead="Live from my GitHub — repos, contributions, and coding activity."
        />

        {err ? (
          <p className="mt-10 text-center text-sm text-[#A8A8A8]">{err}</p>
        ) : (
          <div className="mt-12 space-y-6">
            {/* Profile + Activity */}
            <div className="grid gap-5 sm:grid-cols-[1fr_2fr]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="cosmic-panel-strong rounded-2xl p-6"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={user?.avatar_url ?? profile.image}
                    alt="GitHub avatar"
                    className="size-14 rounded-full border-2 border-[#3B82F6]/20"
                  />
                  <div>
                    <div className="font-display text-lg font-semibold text-[#FFFFFF]">@{profile.github.split("/").pop()}</div>
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-[#A8A8A8] hover:text-[#3B82F6] transition-colors"
                    >
                      <GithubIcon className="size-3.5" /> {profile.github.split("/").slice(-2).join("/")}
                    </a>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <MiniStat label="Repos" value={user?.public_repos ?? "—"} />
                  <MiniStat label="Gists" value={user?.public_gists ?? "—"} />
                  <MiniStat label="Followers" value={user?.followers ?? "—"} />
                  <MiniStat label="Following" value={user?.following ?? "—"} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="cosmic-panel-strong rounded-2xl p-6"
              >
                <div className="text-xs uppercase tracking-[0.2em] text-[#A8A8A8]">Activity Overview</div>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <MiniStat label="Total Stars" value={totalStars} />
                  <MiniStat label="Total Forks" value={totalForks} />
                  <MiniStat label="Active (30d)" value={recentCommits} />
                  <MiniStat label="Top Language" value={langData[0]?.name ?? "—"} />
                </div>
              </motion.div>
            </div>

            {/* Languages + Contribution */}
            <div className="grid gap-5 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="cosmic-panel-strong rounded-2xl p-6"
              >
                <div className="text-xs uppercase tracking-[0.2em] text-[#A8A8A8]">Top Languages</div>
                <div className="mt-5 space-y-3.5">
                  {langData.length === 0 && !err && (
                    <div className="space-y-3">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <div className="h-3 w-20 animate-pulse rounded bg-white/[0.05]" />
                            <div className="h-3 w-8 animate-pulse rounded bg-white/[0.04]" />
                          </div>
                          <div className="h-1.5 w-full animate-pulse rounded-full bg-white/[0.04]" />
                        </div>
                      ))}
                    </div>
                  )}
                  {langData.map((l) => (
                    <div key={l.name}>
                      <div className="flex items-center justify-between text-sm mb-1.5">
                        <span className="flex items-center gap-2 text-[#FFFFFF]">
                          <span className="size-2.5 rounded-sm" style={{ backgroundColor: LANG_COLORS[l.name] ?? "#888" }} />
                          {l.name}
                        </span>
                        <span className="text-[#A8A8A8]">{l.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/[0.03] overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: LANG_COLORS[l.name] ?? "#888" }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${l.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="cosmic-panel-strong rounded-2xl p-6"
              >
                <div className="text-xs uppercase tracking-[0.2em] text-[#A8A8A8]">Contribution Graph</div>
                <div className="mt-5 overflow-x-auto -mx-2 px-2" style={{ overscrollBehaviorX: "contain" }}>
                  <img
                    src="https://ghchart.rshah.org/SANTHOSHSIVA55"
                    alt="GitHub contribution chart"
                    className="w-full min-w-[280px] rounded-lg"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="mt-4 flex flex-wrap gap-2 justify-center text-[10px] text-[#A8A8A8]">
                    <span>Less</span>
                    {[0.15, 0.25, 0.40, 0.55, 0.75].map((o, i) => (
                      <span key={i} className="size-3 rounded-sm" style={{ backgroundColor: `rgba(59, 130, 246, ${o})` }} />
                    ))}
                    <span>More</span>
                  </div>
                  <p className="mt-3 text-center text-xs text-[#A8A8A8]">
                    {repos?.length ?? "?"} repositories · {totalStars} stars across all repos
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Recent Repos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="cosmic-panel-strong rounded-2xl p-6"
            >
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-[0.2em] text-[#A8A8A8]">Recent Repositories</div>
                <a href={profile.github} target="_blank" rel="noreferrer" className="text-xs text-[#3B82F6] hover:underline">
                  View all on GitHub →
                </a>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {!repos && !err &&
                  Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="cosmic-panel h-24 animate-pulse rounded-xl" />
                  ))}
                {repos?.slice(0, 6).map((r, i) => (
                  <motion.a
                    key={r.id}
                    href={r.html_url}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="cosmic-panel group block rounded-xl p-4 transition-all duration-300 hover:bg-white/[0.04] border border-white/[0.03] hover:border-[#3B82F6]/10"
                  >
                    <div className="flex items-center gap-2 font-medium text-sm text-[#FFFFFF] truncate">
                      <BookOpen className="size-3.5 shrink-0 text-[#A8A8A8]" />
                      {r.name}
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-xs text-[#A8A8A8]">
                      {r.description ?? "No description"}
                    </p>
                    <div className="mt-2.5 flex items-center gap-3 text-[10px] text-[#A8A8A8]">
                      {r.language && (
                        <span className="inline-flex items-center gap-1">
                          <span className="size-1.5 rounded-full" style={{ backgroundColor: LANG_COLORS[r.language] ?? "#888" }} />
                          {r.language}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-0.5"><Star className="size-3" /> {r.stargazers_count}</span>
                      <span className="inline-flex items-center gap-0.5"><GitFork className="size-3" /> {r.forks_count}</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}

const MiniStat = memo(function MiniStat({ label, value }: { label: string; value: number | string }) {
  const isLoading = value === "—";
  return (
    <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">
      <div className="font-display text-xl font-bold text-[#FFFFFF]">
        {isLoading ? (
          <span className="inline-block h-5 w-10 animate-pulse rounded bg-white/[0.06]" />
        ) : (
          value
        )}
      </div>
      <div className="text-[10px] uppercase tracking-wider text-[#B5B5B5] mt-0.5">{label}</div>
    </div>
  );
});

export { SectionHeader };
