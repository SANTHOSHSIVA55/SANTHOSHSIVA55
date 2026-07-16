import { useEffect, useMemo, useState, useRef, memo } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2, Layers, Sparkles,
  Star, GitFork, RefreshCw, Code, Brain, Rocket, BookOpen,
  Award, Trophy, Target, Zap, TrendingUp,
  Database, Wrench, GraduationCap, Heart, Lightbulb,
} from "lucide-react";
import { GithubIcon } from "./icons";
import { profile, projects as featuredProjects, skills, timeline, certifications, achievements } from "./data";
import { ProjectShowcaseCard, ProjectCardCompact } from "./ProjectShowcase";
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
        className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-[#A8A8A8]"
      >
        <Sparkles className="size-3.5 text-[#E8E8E8]" /> {kicker}
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
          className="mt-4 text-base sm:text-lg text-[#A8A8A8] max-w-xl mx-auto"
        >
          {lead}
        </motion.p>
      )}
    </div>
  );
});

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

  return (
    <section id="about" className="relative section-padding">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader kicker="About" title="Aspiring Software Engineer & Builder" />

        {/* Editorial large quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 max-w-4xl mx-auto"
        >
          <blockquote className="relative">
            <div className="absolute -top-6 -left-4 text-[80px] sm:text-[120px] font-display font-bold text-white/[0.03] leading-none select-none pointer-events-none">
              &ldquo;
            </div>
            <p className="font-display text-xl sm:text-2xl lg:text-3xl font-medium leading-[1.5] text-[#D9D9D9] relative z-10">
              I&apos;m passionate about building{' '}
              <span className="text-[#F8FAFC]">scalable web applications</span>{' '}
              and transforming data into{' '}
              <span className="text-gradient">meaningful insights</span>{' '}
              — from first lines of code to production-grade engineering.
            </p>
          </blockquote>
        </motion.div>

        {/* Info cards */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: <Target className="size-5" />, title: "Current Focus", desc: "Building production-grade full-stack applications and mastering data analytics." },
            { icon: <Lightbulb className="size-5" />, title: "Specialization", desc: "React, Node.js, Python, SQL, and data visualization tools." },
            { icon: <GraduationCap className="size-5" />, title: "Education", desc: "CSE Undergrad in Chennai. 300+ DSA problems solved." },
            { icon: <Zap className="size-5" />, title: "Seeking", desc: "Internship and placement opportunities in Software Engineering." },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="cosmic-panel group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.05]"
            >
              <div className="relative z-10">
                <div className="flex size-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-[#E8E8E8] mb-4">
                  {card.icon}
                </div>
                <h3 className="font-display text-base font-semibold text-[#FFFFFF]">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#A8A8A8]">{card.desc}</p>
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
          className="mt-10"
        >
          <div className="text-xs uppercase tracking-[0.2em] text-[#A8A8A8] mb-4">CS Fundamentals</div>
          <div className="flex flex-wrap gap-2">
            {pills.map((p) => (
              <span
                key={p}
                className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-xs text-[#A8A8A8] transition-all duration-300 hover:border-[#E8E8E8]/20 hover:text-[#E8E8E8] hover:bg-white/[0.05]"
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
const skillLayouts: Record<string, { icon: typeof Code2; color: string; description: string }> = {
  "Data Analytics": { icon: TrendingUp, color: "#E8E8E8", description: "Transforming raw data into actionable insights" },
  "Frontend": { icon: Layers, color: "#D9D9D9", description: "Building beautiful, responsive interfaces" },
  "Backend": { icon: Code2, color: "#C0C0C0", description: "Scalable APIs and server architecture" },
  "Database": { icon: Database, color: "#A8A8A8", description: "Data modeling and query optimization" },
  "Tools": { icon: Wrench, color: "#F2F2F2", description: "Development workflow and collaboration" },
  "Computer Science": { icon: Brain, color: "#E8E8E8", description: "Fundamental theory and problem solving" },
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

        {/* Infinite marquee */}
        <div className="mt-10">
          <InfiniteMarquee />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((g, i) => {
            const layout = skillLayouts[g.group] ?? { icon: Code2, color: "#E8E8E8", description: "" };
            const Icon = layout.icon;
            return (
              <motion.div
                key={g.group}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="cosmic-panel group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.05] chrome-border"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="flex size-11 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03]"
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
                    {g.items.map((it) => (
                      <span
                        key={it}
                        className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-xs text-[#A8A8A8] transition-colors duration-200 group-hover:text-[#FFFFFF]"
                      >
                        {it}
                      </span>
                    ))}
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

/* ──────────── Shared GitHub Fetch Cache ──────────── */
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

type User = {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  public_gists?: number;
};

let _cachedRepos: Repo[] | null = null;
let _cachedUser: User | null = null;
let _fetchPromise: Promise<{ repos: Repo[]; user: User }> | null = null;

function fetchGitHubData() {
  if (_cachedRepos && _cachedUser) return Promise.resolve({ repos: _cachedRepos, user: _cachedUser });
  if (_fetchPromise) return _fetchPromise;

  const githubUser = profile.github.split("/").pop();
  _fetchPromise = Promise.all([
    fetch(`https://api.github.com/users/${githubUser}`).then((r) => r.json()),
    fetch(`https://api.github.com/users/${githubUser}/repos?per_page=100&sort=updated`).then((r) => r.json()),
  ]).then(([u, r]: [User, Repo[]]) => {
    _cachedUser = u;
    _cachedRepos = (r ?? []).filter((x) => !x.fork);
    return { repos: _cachedRepos, user: _cachedUser };
  });

  return _fetchPromise;
}

/* ──────────── Projects ──────────── */
export function Projects() {

  const accents = [
    { from: "rgba(232,232,232,0.20)", to: "rgba(192,192,192,0.12)", glow: "#E8E8E8" },
    { from: "rgba(217,217,217,0.20)", to: "rgba(168,168,168,0.12)", glow: "#D9D9D9" },
    { from: "rgba(242,242,242,0.20)", to: "rgba(232,232,232,0.12)", glow: "#F2F2F2" },
    { from: "rgba(192,192,192,0.20)", to: "rgba(168,168,168,0.12)", glow: "#C0C0C0" },
    { from: "rgba(232,232,232,0.15)", to: "rgba(217,217,217,0.10)", glow: "#E8E8E8" },
    { from: "rgba(200,200,200,0.15)", to: "rgba(180,180,180,0.10)", glow: "#C8C8C8" },
  ];

  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchGitHubData()
      .then(({ repos }) => {
        if (cancelled) return;
        const cleaned = repos
          .filter((r) => !r.archived)
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
        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#A8A8A8]">
          <RefreshCw className="size-3.5" />
          <span>{err ? err : repos ? `Live · ${repos.length} latest projects` : "Fetching projects..."}</span>
        </div>

        {!repos && !err && (
          <div className="mt-12 glass-strong h-[480px] animate-pulse rounded-3xl" />
        )}
        {featured && (
          <div className="mt-12">
            <ProjectShowcaseCard project={featured} />
          </div>
        )}

        {rest.length > 0 && (
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {rest.map((p, i) => (
              <ProjectCardCompact key={p.title} project={p} index={i} />
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

const timelineColors = ["#E8E8E8", "#D9D9D9", "#C0C0C0", "#A8A8A8"];

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
              const color = timelineColors[i] ?? "#E8E8E8";
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
                    style={{
                      background: `linear-gradient(135deg, ${color}, ${color}80)`,
                    }}
                  >
                    <Icon className="size-4 text-white" />
                  </span>

                  {/* Desktop layout */}
                  <div className="hidden md:grid md:w-full md:grid-cols-2 md:gap-14 lg:gap-20">
                    <div className={`flex ${isLeft ? "justify-end" : "justify-start"}`}>
                      {isLeft ? (
                        <div className="max-w-md text-right">
                          <span
                            className="inline-block rounded-full px-4 py-1 text-xs font-semibold tracking-wider"
                            style={{ color }}
                          >
                            {t.year}
                          </span>
                          <div className="cosmic-panel group relative mt-3 overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.05]">
                            <h3 className="font-display text-xl font-semibold text-[#FFFFFF]">{t.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-[#A8A8A8]">{t.body}</p>
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
                          <div className="cosmic-panel group relative mt-3 overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.05]">
                            <h3 className="font-display text-xl font-semibold text-[#FFFFFF]">{t.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-[#A8A8A8]">{t.body}</p>
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
                    <div className="cosmic-panel group relative mt-3 overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:bg-white/[0.05]">
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
              className="cosmic-panel group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:bg-white/[0.05]"
            >
              <div className="relative z-10">
                <div className="flex size-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-[#E8E8E8] mb-3">
                  <Award className="size-5" />
                </div>
                <h3 className="font-display text-sm font-semibold text-[#FFFFFF] leading-snug">{c.title}</h3>
                <p className="mt-1.5 text-xs text-[#A8A8A8]">{c.issuer}</p>
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
  const colors = ["#E8E8E8", "#D9D9D9", "#C0C0C0"];

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
            const color = colors[i] ?? "#E8E8E8";
            return (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="cosmic-panel group relative overflow-hidden rounded-2xl p-8 text-center transition-all duration-300 hover:bg-white/[0.05]"
              >
                <div className="relative z-10">
                  <div className="flex justify-center mb-4">
                    <div className="flex size-14 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03]" style={{ color }}>
                      <Icon className="size-6" />
                    </div>
                  </div>
                  <AnimatedCounter value={a.value} label={a.label} />
                  <div className="mt-2 text-sm text-[#A8A8A8]">{a.label}</div>
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
        setRepos(repos);
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
                    className="size-14 rounded-full border-2 border-white/[0.08]"
                  />
                  <div>
                    <div className="font-display text-lg font-semibold text-[#FFFFFF]">@{profile.github.split("/").pop()}</div>
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-[#A8A8A8] hover:text-[#E8E8E8] transition-colors"
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
                  {langData.length === 0 && (
                    <p className="text-sm text-[#A8A8A8]">Loading language data...</p>
                  )}
                  {langData.map((l) => (
                    <div key={l.name}>
                      <div className="flex items-center justify-between text-sm mb-1.5">
                        <span className="flex items-center gap-2 text-[#FFFFFF]">
                          <span
                            className="size-2.5 rounded-sm"
                            style={{ backgroundColor: LANG_COLORS[l.name] ?? "#888" }}
                          />
                          {l.name}
                        </span>
                        <span className="text-[#A8A8A8]">{l.pct}%</span>
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
                className="cosmic-panel-strong rounded-2xl p-6"
              >
                <div className="text-xs uppercase tracking-[0.2em] text-[#A8A8A8]">Contribution Graph</div>
                <div className="mt-5 overflow-x-auto -mx-2 px-2">
                  <img
                    src="https://ghchart.rshah.org/SANTHOSHSIVA55"
                    alt="GitHub contribution chart"
                    className="w-full min-w-[320px] rounded-lg"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="mt-4 flex flex-wrap gap-2 justify-center text-[10px] text-[#A8A8A8]">
                    <span>Less</span>
                    {[0.15, 0.25, 0.40, 0.55, 0.75].map((o, i) => (
                      <span
                        key={i}
                        className="size-3 rounded-sm"
                        style={{ backgroundColor: `rgba(232, 232, 232, ${o})` }}
                      />
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
                <a href={profile.github} target="_blank" rel="noreferrer" className="text-xs text-[#E8E8E8] hover:underline">
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
                    className="cosmic-panel group block rounded-xl p-4 transition-all duration-300 hover:bg-white/[0.06] border border-white/[0.04] hover:border-white/[0.08]"
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
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
      <div className="font-display text-xl font-bold text-[#FFFFFF]">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-[#B5B5B5] mt-0.5">{label}</div>
    </div>
  );
});

export { SectionHeader };
