import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { motion, useInView, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
  Code2, Layers, Sparkles, ExternalLink, ArrowUpRight,
  Star, GitFork, RefreshCw, Code, Brain, Rocket, BookOpen,
  Award, Trophy, BookMarked, Target, Zap, TrendingUp,
  Database, Cloud, Wrench, GraduationCap, Heart, Lightbulb,
} from "lucide-react";
import { GithubIcon } from "./icons";
import { profile, projects as featuredProjects, skills, timeline, certifications, achievements } from "./data";

/* ──────────── Section Header ──────────── */
function SectionHeader({ kicker, title, lead }: { kicker: string; title: string; lead?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-[#94A3B8]"
      >
        <Sparkles className="size-3.5 text-[#00E5FF]" /> {kicker}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="mt-5 font-display text-4xl sm:text-5xl lg:text-[52px] font-bold tracking-[-0.02em] leading-[1.1]"
      >
        {title}
      </motion.h2>
      {lead && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-4 text-base sm:text-lg text-[#94A3B8] max-w-xl mx-auto"
        >
          {lead}
        </motion.p>
      )}
    </div>
  );
}

/* ──────────── Animated Counter ──────────── */
function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const numericPart = value.replace(/[^0-9]/g, "");
  const suffix = value.replace(/[0-9]/g, "");
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView || !numericPart) {
      if (!numericPart) setDisplay(value);
      return;
    }
    const target = parseInt(numericPart, 10);
    const duration = 1500;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(target * eased) + suffix);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, numericPart, suffix, value]);

  return (
    <div ref={ref} className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient">
      {display}
    </div>
  );
}

/* ──────────── About ──────────── */
export function About() {
  const pills = [
    "DSA", "OOP", "DBMS", "Operating Systems", "Computer Networks", "System Design",
  ];

  const cards = [
    {
      icon: <Heart className="size-5" />,
      title: "Who I Am",
      content: `I'm ${profile.name} — a Computer Science Engineering student passionate about building scalable web applications and transforming data into meaningful insights.`,
      gradient: "from-[#00E5FF]/20 to-[#3B82F6]/10",
    },
    {
      icon: <Target className="size-5" />,
      title: "Current Focus",
      content: "Building production-grade full-stack applications, mastering data analytics, and preparing for Software Engineer / Full Stack Developer roles.",
      gradient: "from-[#8B5CF6]/20 to-[#00E5FF]/10",
    },
    {
      icon: <Lightbulb className="size-5" />,
      title: "Goals",
      content: "I specialize in React, Node.js, Python, SQL, and data visualization — building full-stack applications, designing RESTful APIs, and creating data-driven dashboards.",
      gradient: "from-[#22C55E]/20 to-[#00E5FF]/10",
    },
    {
      icon: <GraduationCap className="size-5" />,
      title: "Education",
      content: "CSE Undergrad in Chennai, India. 300+ DSA problems solved. Built production-grade software projects and analytics platforms.",
      gradient: "from-[#F59E0B]/20 to-[#00E5FF]/10",
    },
    {
      icon: <Zap className="size-5" />,
      title: "Highlights",
      content: "I've solved 300+ DSA problems, built 5+ major projects, and developed analytics platforms that turn raw data into actionable insights. Actively seeking internship and placement opportunities.",
      gradient: "from-[#EF4444]/20 to-[#8B5CF6]/10",
    },
  ];

  return (
    <section id="about" className="relative section-padding">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader kicker="About" title="Aspiring Software Engineer & Builder" />

        {/* Cards grid */}
        <div className="mt-12 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`glass group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.05] ${
                i === 0 ? "sm:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <div className="relative z-10">
                <div className="flex size-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-[#00E5FF] mb-4">
                  {card.icon}
                </div>
                <h3 className="font-display text-lg font-semibold text-[#F8FAFC]">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">{card.content}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CS Fundamentals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <div className="text-xs uppercase tracking-[0.2em] text-[#94A3B8] mb-3">CS Fundamentals</div>
          <div className="flex flex-wrap gap-2">
            {pills.map((p) => (
              <span
                key={p}
                className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-xs text-[#94A3B8] transition-all duration-300 hover:border-[#00E5FF]/20 hover:text-[#00E5FF] hover:bg-[#00E5FF]/[0.03]"
              >
                {p}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────── Skills ──────────── */
const skillLayouts: Record<string, { icon: typeof Code2; color: string; description: string; projects: number; years: number }> = {
  "Data Analytics": { icon: TrendingUp, color: "#00E5FF", description: "Transforming raw data into actionable insights", projects: 3, years: 2 },
  "Frontend": { icon: Layers, color: "#8B5CF6", description: "Building beautiful, responsive interfaces", projects: 5, years: 2 },
  "Backend": { icon: Code2, color: "#3B82F6", description: "Scalable APIs and server architecture", projects: 4, years: 2 },
  "Database": { icon: Database, color: "#22C55E", description: "Data modeling and query optimization", projects: 4, years: 2 },
  "Tools": { icon: Wrench, color: "#F59E0B", description: "Development workflow and collaboration", projects: 5, years: 3 },
  "Computer Science": { icon: Brain, color: "#EF4444", description: "Fundamental theory and problem solving", projects: 0, years: 3 },
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
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((g, i) => {
            const layout = skillLayouts[g.group] ?? { icon: Code2, color: "#00E5FF", description: "", projects: 0, years: 0 };
            const Icon = layout.icon;
            return (
              <motion.div
                key={g.group}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="glass group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.05]"
              >
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="flex size-11 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03]"
                      style={{ color: layout.color }}
                    >
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-semibold text-[#F8FAFC]">{g.group}</h3>
                      <p className="text-[11px] text-[#94A3B8]">{layout.description}</p>
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {g.items.map((it) => (
                      <span
                        key={it}
                        className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-xs text-[#94A3B8] transition-colors duration-200 group-hover:text-[#F8FAFC]"
                      >
                        {it}
                      </span>
                    ))}
                  </div>

                  {/* Stats row */}
                  <div className="mt-4 pt-4 border-t border-white/[0.04] flex items-center gap-4 text-[11px] text-[#94A3B8]">
                    <span className="flex items-center gap-1">
                      <Rocket className="size-3" style={{ color: layout.color }} />
                      {layout.projects} projects
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="size-3" style={{ color: layout.color }} />
                      {layout.years}+ years
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ──────────── Projects ──────────── */
export function Projects() {
  type Repo = {
    id: number;
    name: string;
    html_url: string;
    homepage: string | null;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    topics?: string[];
    pushed_at: string;
    updated_at: string;
    fork: boolean;
    archived: boolean;
  };

  const accents = [
    { from: "rgba(0,229,255,0.20)", to: "rgba(59,130,246,0.12)", glow: "#00E5FF" },
    { from: "rgba(139,92,246,0.20)", to: "rgba(236,72,153,0.12)", glow: "#8B5CF6" },
    { from: "rgba(34,197,94,0.20)", to: "rgba(20,184,166,0.12)", glow: "#22C55E" },
    { from: "rgba(245,158,11,0.20)", to: "rgba(249,115,22,0.12)", glow: "#F59E0B" },
    { from: "rgba(239,68,68,0.20)", to: "rgba(236,72,153,0.12)", glow: "#EF4444" },
    { from: "rgba(59,130,246,0.20)", to: "rgba(99,102,241,0.12)", glow: "#3B82F6" },
  ];

  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const githubUser = profile.github.split("/").pop();
    fetch(
      `https://api.github.com/users/${githubUser}/repos?per_page=100&sort=updated`,
      { headers: { Accept: "application/vnd.github+json" } },
    )
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((data: Repo[]) => {
        if (cancelled) return;
        const cleaned = (data ?? [])
          .filter((r) => !r.fork && !r.archived)
          .sort((a, b) => +new Date(b.pushed_at) - +new Date(a.pushed_at))
          .slice(0, 6);
        setRepos(cleaned);
      })
      .catch(() => !cancelled && setErr("Showing featured projects."));
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

  const featured = cards[0];
  const rest = cards.slice(1);

  return (
    <section id="projects" className="relative section-padding">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          kicker="Featured Work"
          title="Projects I've Built"
          lead="Real-world applications spanning full-stack platforms, AI systems, and data-driven tools."
        />
        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#94A3B8]">
          <RefreshCw className="size-3.5" />
          <span>{err ? err : repos ? `Live · ${repos.length} latest projects` : "Fetching projects..."}</span>
        </div>

        {/* Featured project - full width */}
        {!repos && !err && (
          <div className="mt-12 glass-strong h-[480px] animate-pulse rounded-3xl" />
        )}
        {featured && (
          <div className="mt-12">
            <FeaturedProjectCard project={featured} />
          </div>
        )}

        {/* Remaining projects grid */}
        {rest.length > 0 && (
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {rest.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturedProjectCard({ project: p }: { project: any }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), { stiffness: 200, damping: 25 });

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
        className="glass-strong group relative overflow-hidden rounded-3xl transition-shadow duration-500"
      >
        {/* Large preview area */}
        <div
          className="relative h-72 sm:h-80 md:h-96 w-full overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${p.accent.from}, ${p.accent.to})` }}
        >
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.10), transparent 55%)" }} />

          {/* Browser mockup */}
          <div className="absolute inset-6 sm:inset-8 glass rounded-2xl p-5 shadow-elevated border border-white/[0.06]">
            <div className="mb-4 flex gap-2">
              <span className="size-3 rounded-full bg-[#EF4444]/70" />
              <span className="size-3 rounded-full bg-[#F59E0B]/70" />
              <span className="size-3 rounded-full bg-[#22C55E]/70" />
            </div>
            <div className="text-xs sm:text-sm text-[#94A3B8] line-clamp-2 break-words">
              <span className="text-[#00E5FF] font-semibold">Problem:</span> {p.problem ?? "No description."}
            </div>
            <div className="mt-3 text-xs sm:text-sm text-[#94A3B8] line-clamp-2 break-words">
              <span className="text-[#8B5CF6] font-semibold">Solution:</span> {p.solution ?? "A full-stack application."}
            </div>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[#020617]/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center gap-4">
            {p.homepage && (
              <a
                href={p.homepage}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#00E5FF] px-6 py-3 text-sm font-semibold text-[#020617] transition-transform hover:scale-105"
              >
                <ExternalLink className="size-4" /> Live Demo
              </a>
            )}
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.15] bg-white/[0.06] px-6 py-3 text-sm font-medium text-[#F8FAFC] backdrop-blur-md transition-transform hover:scale-105"
            >
              <GithubIcon className="size-4" /> View Code
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#94A3B8]">{p.tag}</div>
              <h3 className="mt-1.5 font-display text-xl sm:text-2xl font-bold text-[#F8FAFC]">{p.title}</h3>
            </div>
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer"
              className="glass inline-flex size-11 items-center justify-center rounded-xl transition-all duration-300 hover:bg-white/[0.08] shrink-0 border border-white/[0.06]"
            >
              <ArrowUpRight className="size-4 text-[#94A3B8] group-hover:text-[#00E5FF] transition-colors" />
            </a>
          </div>

          <p className="mt-3 text-sm sm:text-base text-[#94A3B8] leading-relaxed">{p.description}</p>

          {p.features && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {p.features.map((f: string) => (
                <div key={f} className="flex items-center gap-2 text-sm text-[#94A3B8]">
                  <span className="size-1.5 rounded-full bg-[#00E5FF] shrink-0" /> {f}
                </div>
              ))}
            </div>
          )}

          {(p.stars !== undefined || p.updated) && (
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[#94A3B8]">
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
              <span key={s} className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs text-[#94A3B8]">
                {s}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

function ProjectCard({ project: p, index: i }: { project: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 25 });

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
        className="glass-strong group relative overflow-hidden rounded-3xl transition-shadow duration-500"
      >
        {/* Preview */}
        <div
          className="relative h-52 sm:h-56 w-full overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${p.accent.from}, ${p.accent.to})` }}
        >
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.10), transparent 55%)" }} />
          <div className="absolute inset-5 glass rounded-xl p-4 shadow-elevated border border-white/[0.06]">
            <div className="mb-3 flex gap-1.5">
              <span className="size-2.5 rounded-full bg-[#EF4444]/70" />
              <span className="size-2.5 rounded-full bg-[#F59E0B]/70" />
              <span className="size-2.5 rounded-full bg-[#22C55E]/70" />
            </div>
            <div className="text-[11px] text-[#94A3B8] line-clamp-2 break-words">
              <span className="text-[#00E5FF] font-medium">Problem:</span> {p.problem ?? "No description."}
            </div>
            <div className="mt-2 text-[11px] text-[#94A3B8] line-clamp-2 break-words">
              <span className="text-[#8B5CF6] font-medium">Solution:</span> {p.solution ?? "A full-stack application."}
            </div>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[#020617]/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
            {p.homepage && (
              <a href={p.homepage} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#00E5FF] px-5 py-2.5 text-xs font-semibold text-[#020617] transition-transform hover:scale-105">
                <ExternalLink className="size-3.5" /> Live Demo
              </a>
            )}
            <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.06] px-5 py-2.5 text-xs font-medium text-[#F8FAFC] backdrop-blur-md transition-transform hover:scale-105">
              <GithubIcon className="size-3.5" /> View Code
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#94A3B8]">{p.tag}</div>
              <h3 className="mt-1 font-display text-lg font-semibold text-[#F8FAFC] capitalize">{p.title}</h3>
            </div>
            <a href={p.github} target="_blank" rel="noreferrer" aria-label={`${p.title} on GitHub`}
              className="glass inline-flex size-10 items-center justify-center rounded-xl transition-all duration-300 hover:bg-white/[0.08] shrink-0 border border-white/[0.06]">
              <ArrowUpRight className="size-4 text-[#94A3B8] group-hover:text-[#00E5FF] transition-colors" />
            </a>
          </div>

          <p className="mt-2 text-sm text-[#94A3B8] line-clamp-2 break-words">{p.description}</p>

          {p.features && (
            <ul className="mt-3 space-y-1.5 text-xs text-[#94A3B8]">
              {p.features.slice(0, 3).map((f: string) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-1.5 size-1 rounded-full bg-[#00E5FF] shrink-0" /> {f}
                </li>
              ))}
            </ul>
          )}

          {(p.stars !== undefined || p.updated) && (
            <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-[#94A3B8]">
              {p.stars !== undefined && <span className="inline-flex items-center gap-1"><Star className="size-3" /> {p.stars}</span>}
              {p.forks !== undefined && <span className="inline-flex items-center gap-1"><GitFork className="size-3" /> {p.forks}</span>}
              {p.updated && <span>Updated {new Date(p.updated).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>}
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.stack.map((s: string) => (
              <span key={s} className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[10px] text-[#94A3B8]">
                {s}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.article>
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

const timelineColors = ["#00E5FF", "#8B5CF6", "#22C55E", "#F59E0B"];

export function Journey() {
  return (
    <section id="journey" className="relative section-padding">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeader kicker="Journey" title="The Road So Far" lead="From first lines of code to building full-stack and data-driven applications." />

        <div className="relative mt-14">
          {/* Growing vertical line */}
          <div className="absolute left-[19px] sm:left-[23px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />

          <ul className="space-y-10 md:space-y-0">
            {timeline.map((t, i) => {
              const Icon = timelineIcons[t.icon] ?? Code;
              const color = timelineColors[i] ?? "#00E5FF";
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
                    className="absolute left-[19px] sm:left-[23px] md:left-1/2 top-5 z-10 flex size-10 -translate-x-1/2 items-center justify-center rounded-full ring-4 ring-[#020617]"
                    style={{
                      background: `linear-gradient(135deg, ${color}, ${color}80)`,
                    }}
                  >
                    <Icon className="size-4 text-white" />
                  </span>

                  {/* Desktop layout */}
                  <div className="hidden md:grid md:w-full md:grid-cols-2 md:gap-14 lg:gap-20">
                    <div className={`flex ${isLeft ? "justify-end" : "justify-end"}`}>
                      {isLeft ? (
                        <div className="max-w-md text-right">
                          <span
                            className="inline-block rounded-full px-4 py-1 text-xs font-semibold tracking-wider"
                            style={{ color }}
                          >
                            {t.year}
                          </span>
                          <div className="glass group relative mt-3 overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.05]">
                            <h3 className="font-display text-xl font-semibold text-[#F8FAFC]">{t.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">{t.body}</p>
                          </div>
                        </div>
                      ) : <div />}
                    </div>
                    <div className="flex">
                      {!isLeft ? (
                        <div className="max-w-md">
                          <span
                            className="inline-block rounded-full px-4 py-1 text-xs font-semibold tracking-wider"
                            style={{ color }}
                          >
                            {t.year}
                          </span>
                          <div className="glass group relative mt-3 overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.05]">
                            <h3 className="font-display text-xl font-semibold text-[#F8FAFC]">{t.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">{t.body}</p>
                          </div>
                        </div>
                      ) : <div />}
                    </div>
                  </div>

                  {/* Mobile layout */}
                  <div className="md:hidden pl-14">
                    <span
                      className="inline-block rounded-full px-3 py-1 text-[11px] font-semibold tracking-wider"
                      style={{ color }}
                    >
                      {t.year}
                    </span>
                    <div className="glass group relative mt-3 overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:bg-white/[0.05]">
                      <h3 className="font-display text-lg font-semibold text-[#F8FAFC]">{t.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">{t.body}</p>
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
export function Certifications() {
  return (
    <section id="certifications" className="relative section-padding">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          kicker="Credentials"
          title="Certifications"
          lead="Industry-recognized certifications that validate my expertise."
        />
        <div className="mt-12 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {certifications.map((c, i) => (
            <motion.a
              key={c.title}
              href={c.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:bg-white/[0.05]"
            >
              <div className="relative z-10">
                <div className="flex size-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-[#00E5FF] mb-3">
                  <Award className="size-5" />
                </div>
                <h3 className="font-display text-sm font-semibold text-[#F8FAFC] leading-snug">{c.title}</h3>
                <p className="mt-1.5 text-xs text-[#94A3B8]">{c.issuer}</p>
              </div>
            </motion.a>
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
  const colors = ["#00E5FF", "#8B5CF6", "#22C55E"];

  return (
    <section id="achievements" className="relative section-padding">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          kicker="Milestones"
          title="Achievements"
          lead="Key milestones that reflect my growth and dedication."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {achievements.map((a, i) => {
            const Icon = iconMap[a.icon] ?? Trophy;
            const color = colors[i] ?? "#00E5FF";
            return (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass group relative overflow-hidden rounded-2xl p-8 text-center transition-all duration-300 hover:bg-white/[0.05]"
              >
                <div className="relative z-10">
                  <div className="flex justify-center mb-4">
                    <div className="flex size-14 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03]" style={{ color }}>
                      <Icon className="size-6" />
                    </div>
                  </div>
                  <AnimatedCounter value={a.value} label={a.label} />
                  <div className="mt-2 text-sm text-[#94A3B8]">{a.label}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ──────────── GitHub Stats ──────────── */
type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  pushed_at: string;
  fork: boolean;
};

type User = {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  public_gists?: number;
};

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
    const githubUser = profile.github.split("/").pop();
    Promise.all([
      fetch(`https://api.github.com/users/${githubUser}`).then((r) => r.json()),
      fetch(`https://api.github.com/users/${githubUser}/repos?per_page=100&sort=updated`).then((r) => r.json()),
    ])
      .then(([u, r]: [User, Repo[]]) => {
        if (cancelled) return;
        setUser(u);
        setRepos((r ?? []).filter((x) => !x.fork));
      })
      .catch(() => !cancelled && setErr("Could not load GitHub data."));
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

  const totalStars = useMemo(() => repos?.reduce((s, r) => s + r.stargazers_count, 0) ?? 0, [repos]);
  const totalForks = useMemo(() => repos?.reduce((s, r) => s + r.forks_count, 0) ?? 0, [repos]);
  const recentCommits = useMemo(() => {
    if (!repos) return 0;
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
          <p className="mt-10 text-center text-sm text-[#94A3B8]">{err}</p>
        ) : (
          <div className="mt-12 space-y-6">
            {/* Profile + Activity */}
            <div className="grid gap-5 md:grid-cols-[1fr_2fr]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-strong rounded-2xl p-6"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={user?.avatar_url ?? profile.image}
                    alt="GitHub avatar"
                    className="size-14 rounded-full border-2 border-white/[0.08]"
                  />
                  <div>
                    <div className="font-display text-lg font-semibold text-[#F8FAFC]">@{profile.github.split("/").pop()}</div>
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-[#94A3B8] hover:text-[#00E5FF] transition-colors"
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
                className="glass-strong rounded-2xl p-6"
              >
                <div className="text-xs uppercase tracking-[0.2em] text-[#94A3B8]">Activity Overview</div>
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
                className="glass-strong rounded-2xl p-6"
              >
                <div className="text-xs uppercase tracking-[0.2em] text-[#94A3B8]">Top Languages</div>
                <div className="mt-5 space-y-3.5">
                  {langData.length === 0 && (
                    <p className="text-sm text-[#94A3B8]">Loading language data...</p>
                  )}
                  {langData.map((l) => (
                    <div key={l.name}>
                      <div className="flex items-center justify-between text-sm mb-1.5">
                        <span className="flex items-center gap-2 text-[#F8FAFC]">
                          <span
                            className="size-2.5 rounded-sm"
                            style={{ backgroundColor: LANG_COLORS[l.name] ?? "#888" }}
                          />
                          {l.name}
                        </span>
                        <span className="text-[#94A3B8]">{l.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
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
                className="glass-strong rounded-2xl p-6"
              >
                <div className="text-xs uppercase tracking-[0.2em] text-[#94A3B8]">Contribution Graph</div>
                <div className="mt-5">
                  <img
                    src="https://ghchart.rshah.org/SANTHOSHSIVA55"
                    alt="GitHub contribution chart"
                    className="w-full rounded-lg"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="mt-4 flex flex-wrap gap-2 justify-center text-[10px] text-[#94A3B8]">
                    <span>Less</span>
                    {[0.15, 0.25, 0.40, 0.55, 0.75].map((o, i) => (
                      <span
                        key={i}
                        className="size-3 rounded-sm"
                        style={{ backgroundColor: `rgba(0, 229, 255, ${o})` }}
                      />
                    ))}
                    <span>More</span>
                  </div>
                  <p className="mt-3 text-center text-xs text-[#94A3B8]">
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
              className="glass-strong rounded-2xl p-6"
            >
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-[0.2em] text-[#94A3B8]">Recent Repositories</div>
                <a href={profile.github} target="_blank" rel="noreferrer" className="text-xs text-[#00E5FF] hover:underline">
                  View all on GitHub →
                </a>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {!repos && !err &&
                  Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="glass h-24 animate-pulse rounded-xl" />
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
                    className="glass group block rounded-xl p-4 transition-all duration-300 hover:bg-white/[0.06] border border-white/[0.04] hover:border-white/[0.08]"
                  >
                    <div className="flex items-center gap-2 font-medium text-sm text-[#F8FAFC] truncate">
                      <BookOpen className="size-3.5 shrink-0 text-[#94A3B8]" />
                      {r.name}
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-xs text-[#94A3B8]">
                      {r.description ?? "No description"}
                    </p>
                    <div className="mt-2.5 flex items-center gap-3 text-[10px] text-[#94A3B8]">
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

function MiniStat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
      <div className="font-display text-xl font-bold text-[#F8FAFC]">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-[#94A3B8] mt-0.5">{label}</div>
    </div>
  );
}

export { SectionHeader };
