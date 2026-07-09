import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Code2, Layers, Sparkles, ExternalLink, ArrowUpRight,
  Star, GitFork, RefreshCw, Code, Brain, Rocket, BookOpen,
  Award, Trophy, BookMarked,
} from "lucide-react";
import { GithubIcon } from "./icons";
import { profile, projects as featuredProjects, skills, timeline, certifications, achievements, learning } from "./data";

function SectionHeader({ kicker, title, lead }: { kicker: string; title: string; lead?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
        <Sparkles className="size-3.5" /> {kicker}
      </div>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl font-display">
        {title}
      </h2>
      {lead && <p className="mt-3 text-sm text-muted-foreground sm:mt-4 sm:text-base md:text-lg">{lead}</p>}
    </div>
  );
}

export function About() {
  const pills = [
    "DSA", "OOP", "DBMS", "Operating Systems", "Computer Networks", "System Design",
  ];
  return (
    <section id="about" className="relative py-8 sm:py-10 md:py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader kicker="About" title="Aspiring Software Engineer & Builder" />
        <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 md:grid-cols-3">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-strong md:col-span-2 rounded-2xl sm:rounded-3xl p-5 sm:p-8"
          >
            <p className="text-base leading-relaxed text-foreground/90 sm:text-lg">
              I'm <span className="text-foreground font-medium">{profile.name}</span> — a Computer Science Engineering student passionate about building full-stack applications, AI-powered products, and solving complex problems through clean, scalable software.
            </p>
            <p className="mt-3 text-sm text-muted-foreground sm:mt-4 sm:text-base">
              My expertise spans full stack development with React, Node.js, and Python — designing RESTful APIs, responsive UIs, and data-driven systems. I've solved 300+ DSA problems, built production-grade applications, and developed AI platforms that combine machine learning with modern web architecture. I'm actively seeking Software Engineer / Full Stack Developer internship and placement opportunities.
            </p>
            <div className="mt-4 space-y-2 sm:mt-6">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">CS Fundamentals</div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {pills.map((p) => (
                  <span key={p} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-muted-foreground sm:px-3">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass rounded-2xl sm:rounded-3xl p-5 sm:p-8"
          >
            <div className="flex flex-col gap-4 text-sm sm:gap-5">
              <Stat label="Focus" value="Full Stack + AI" />
              <Stat label="Based in" value={profile.location} />
              <Stat label="Studying" value="CSE · Undergrad" />
              <Stat label="Available for" value="Software Engineer / Full Stack Developer internships" />
              <Stat label="DSA Solved" value="300+ Problems" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

const groupIcons: Record<string, typeof Code2> = {
  Languages: Code2,
  Frontend: Layers,
  Backend: Code2,
  Database: BookMarked,
  Tools: Layers,
  "Computer Science": Brain,
};

export function Skills() {
  return (
    <section id="skills" className="relative py-8 sm:py-10 md:py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          kicker="Toolkit"
          title="Skills & Expertise"
          lead="Technologies and tools I use to build production-grade applications."
        />
        <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">

          {skills.map((g, i) => {
            const Icon = groupIcons[g.group] ?? Code2;
            return (
              <motion.div
                key={g.group}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass group relative overflow-hidden rounded-xl sm:rounded-2xl p-5 sm:p-6 transition-all hover:bg-white/[0.06] hover:scale-[1.01]"
              >
                <div className="absolute -right-12 -top-12 size-32 rounded-full bg-[var(--primary)]/10 blur-2xl transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)]/30 to-[var(--primary-glow)]/20 text-foreground">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-3 font-display text-base font-semibold sm:mt-4 sm:text-lg">{g.group}</h3>
                  <ul className="mt-2.5 flex flex-wrap gap-1.5 sm:mt-3">
                    {g.items.map((it) => (
                      <li
                        key={it}
                        className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-muted-foreground transition-colors group-hover:text-foreground"
                      >
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}

          {/* Currently Learning card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="glass group relative overflow-hidden rounded-xl sm:rounded-2xl p-5 sm:p-6 transition-all hover:bg-white/[0.06] hover:scale-[1.01] border border-dashed border-white/10"
          >
            <div className="absolute -right-12 -top-12 size-32 rounded-full bg-amber-500/10 blur-2xl transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-500/20 text-foreground">
                <Sparkles className="size-5" />
              </div>
              <h3 className="mt-3 font-display text-base font-semibold sm:mt-4 sm:text-lg">Currently Learning</h3>
              <ul className="mt-2.5 flex flex-wrap gap-1.5 sm:mt-3">
                {learning.map((it) => (
                  <li
                    key={it}
                    className="rounded-md border border-amber-500/20 bg-amber-500/[0.06] px-2 py-1 text-xs text-amber-400/80 transition-colors group-hover:text-amber-300"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

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
    "from-cyan-400/30 to-blue-500/20",
    "from-violet-400/30 to-fuchsia-500/20",
    "from-emerald-400/30 to-teal-500/20",
    "from-amber-400/30 to-orange-500/20",
    "from-rose-400/30 to-pink-500/20",
    "from-sky-400/30 to-indigo-500/20",
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
    return () => {
      cancelled = true;
    };
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
          accent: featured?.accent ?? accents[i % accents.length],
        };
      });
    }
    return featuredProjects.map((p) => ({
      ...p,
      homepage: p.website as string | undefined,
      stars: undefined as number | undefined,
      forks: undefined as number | undefined,
      updated: undefined as string | undefined,
    }));
  }, [repos]);

  return (
    <section id="projects" className="relative py-8 sm:py-10 md:py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          kicker="Featured Work"
          title="Projects I've Built"
          lead="Real-world applications spanning full-stack platforms, AI systems, and data-driven tools."
        />
        <div className="mt-4 sm:mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <RefreshCw className="size-3.5" />
          <span>{err ? err : repos ? `Live · ${repos.length} latest projects` : "Fetching projects..."}</span>
        </div>
        <div className="mt-6 sm:mt-8 grid gap-5 sm:gap-8 lg:grid-cols-2">

          {!repos && !err &&
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass-strong h-[320px] sm:h-[420px] animate-pulse rounded-2xl sm:rounded-3xl" />
            ))}
          {cards.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group glass-strong relative overflow-hidden rounded-2xl sm:rounded-3xl"
            >
              <div className={`relative h-40 sm:h-48 w-full overflow-hidden bg-gradient-to-br ${p.accent}`}>
                <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 30% 30%, oklch(1 0 0 / 0.18), transparent 60%)" }} />
                <div className="absolute inset-4 sm:inset-6 glass rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-elevated">
                  <div className="mb-2 sm:mb-3 flex gap-1.5">
                    <span className="size-2 sm:size-2.5 rounded-full bg-red-400/70" />
                    <span className="size-2 sm:size-2.5 rounded-full bg-yellow-400/70" />
                    <span className="size-2 sm:size-2.5 rounded-full bg-emerald-400/70" />
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    <span className="text-[var(--primary)]">Problem:</span> {p.problem ?? "No description."}
                  </div>
                  <div className="mt-2 text-xs sm:text-sm text-muted-foreground">
                    <span className="text-[var(--primary-glow)]">Solution:</span> {p.solution ?? "A full-stack application built with modern technologies."}
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-7">
                <div className="flex items-start justify-between gap-3 sm:gap-4">
                  <div>
                    <div className="text-[10px] sm:text-xs uppercase tracking-[0.18em] text-muted-foreground">{p.tag}</div>
                    <h3 className="mt-0.5 font-display text-lg sm:text-2xl font-semibold capitalize">{p.title}</h3>
                  </div>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${p.title} on GitHub`}
                    className="glass inline-flex size-9 sm:size-10 items-center justify-center rounded-full transition-transform hover:scale-110 shrink-0"
                  >
                    <ArrowUpRight className="size-3.5 sm:size-4" />
                  </a>
                </div>
                <p className="mt-2.5 text-xs text-muted-foreground sm:mt-3 sm:text-sm">{p.description}</p>
                {p.features && (
                  <ul className="mt-3.5 sm:mt-5 space-y-1 sm:space-y-1.5 text-xs sm:text-sm text-muted-foreground">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-1.5 sm:gap-2">
                        <span className="mt-1 size-1 sm:mt-1.5 sm:size-1.5 rounded-full bg-[var(--primary)]" /> {f}
                      </li>
                    ))}
                  </ul>
                )}
                {(p.stars !== undefined || p.updated) && (
                  <div className="mt-3 sm:mt-5 flex flex-wrap items-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-muted-foreground">
                    {p.stars !== undefined && (
                      <span className="inline-flex items-center gap-1"><Star className="size-3 sm:size-3.5" /> {p.stars}</span>
                    )}
                    {p.forks !== undefined && (
                      <span className="inline-flex items-center gap-1"><GitFork className="size-3 sm:size-3.5" /> {p.forks}</span>
                    )}
                    {p.updated && (
                      <span>Updated {new Date(p.updated).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>
                    )}
                  </div>
                )}
                <div className="mt-3 sm:mt-5 flex flex-wrap gap-1 sm:gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-md border border-white/10 bg-white/[0.04] px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs text-muted-foreground">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-4 sm:mt-6 flex gap-2 sm:gap-3">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full glass px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium hover:bg-white/10"
                  >
                    <GithubIcon className="size-3.5 sm:size-4" /> View Code
                  </a>
                  {p.homepage ? (
                    <a
                      href={p.homepage}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                      <ExternalLink className="size-3.5 sm:size-4" /> Live Demo
                    </a>
                  ) : (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                      <ExternalLink className="size-3.5 sm:size-4" /> Details
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

const timelineIcons: Record<string, typeof Code2> = {
  code: Code,
  brain: Brain,
  stack: Layers,
  sparkle: Sparkles,
  rocket: Rocket,
};

const timelineGradients = [
  "from-cyan-500/20 to-blue-500/10",
  "from-violet-500/20 to-purple-500/10",
  "from-emerald-500/20 to-teal-500/10",
  "from-amber-500/20 to-orange-500/10",
];

export function Journey() {
  return (
    <section id="journey" className="relative py-8 sm:py-10 md:py-12 lg:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeader kicker="Journey" title="The road so far" lead="From first lines of code to building full-stack platforms and AI-powered systems." />
        <div className="relative mt-6 sm:mt-8">
          <div className="absolute left-[23px] sm:left-[27px] top-0 bottom-0 w-px bg-gradient-to-b from-[var(--primary)] via-white/20 to-transparent md:left-1/2 md:-translate-x-px" />
          <ul className="space-y-8 sm:space-y-12 md:space-y-0">
            {timeline.map((t, i) => {
              const Icon = timelineIcons[t.icon] ?? Code;
              const isLeft = i % 2 === 0;
              return (
                <motion.li
                  key={t.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="relative flex items-start gap-0 md:gap-0 md:py-10"
                >
                  <span
                    aria-hidden
                    className="absolute left-[23px] sm:left-[27px] top-6 sm:top-8 z-10 flex size-7 sm:size-8 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-glow)] ring-3 sm:ring-4 ring-[var(--background)] shadow-glow md:left-1/2"
                  >
                    <Icon className="size-3 sm:size-3.5 text-white" />
                  </span>

                  <div className="hidden md:grid md:w-full md:grid-cols-2 md:gap-12 lg:gap-16">
                    <div className={`flex ${isLeft ? "justify-end" : "justify-end"}`}>
                      {isLeft ? (
                        <div className="max-w-md text-right">
                          <span className="inline-block rounded-full bg-gradient-to-r from-[var(--primary)]/20 to-[var(--primary-glow)]/10 px-3 py-1 text-xs font-medium tracking-wider text-[var(--primary)]">
                            {t.year}
                          </span>
                          <div className="glass-strong group relative mt-3 overflow-hidden rounded-2xl p-6 transition-all hover:bg-white/[0.06] hover:shadow-elevated">
                            <div className={`absolute -right-8 -top-8 size-24 rounded-full bg-gradient-to-br ${timelineGradients[i]} blur-2xl opacity-60 transition-opacity group-hover:opacity-100`} />
                            <div className="relative">
                              <h3 className="font-display text-xl font-semibold">{t.title}</h3>
                              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>
                    <div className="flex">
                      {!isLeft ? (
                        <div className="max-w-md">
                          <span className="inline-block rounded-full bg-gradient-to-r from-[var(--primary)]/20 to-[var(--primary-glow)]/10 px-3 py-1 text-xs font-medium tracking-wider text-[var(--primary)]">
                            {t.year}
                          </span>
                          <div className="glass-strong group relative mt-3 overflow-hidden rounded-2xl p-6 transition-all hover:bg-white/[0.06] hover:shadow-elevated">
                            <div className={`absolute -right-8 -top-8 size-24 rounded-full bg-gradient-to-br ${timelineGradients[i]} blur-2xl opacity-60 transition-opacity group-hover:opacity-100`} />
                            <div className="relative">
                              <h3 className="font-display text-xl font-semibold">{t.title}</h3>
                              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>

                  <div className="md:hidden pl-10 sm:pl-14">
                    <span className="inline-block rounded-full bg-gradient-to-r from-[var(--primary)]/20 to-[var(--primary-glow)]/10 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-medium tracking-wider text-[var(--primary)]">
                      {t.year}
                    </span>
                    <div className="glass-strong group relative mt-2.5 sm:mt-3 overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all hover:bg-white/[0.06] hover:shadow-elevated">
                      <div className={`absolute -right-6 -top-6 size-16 sm:-right-8 sm:-top-8 sm:size-24 rounded-full bg-gradient-to-br ${timelineGradients[i]} blur-2xl opacity-60 transition-opacity group-hover:opacity-100`} />
                      <div className="relative">
                        <h3 className="font-display text-base sm:text-xl font-semibold">{t.title}</h3>
                        <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">{t.body}</p>
                      </div>
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

export function Certifications() {
  return (
    <section id="certifications" className="relative py-8 sm:py-10 md:py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          kicker="Credentials"
          title="Certifications"
          lead="Industry-recognized certifications that validate my expertise."
        />
        <div className="mt-6 sm:mt-8 grid gap-3.5 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((c, i) => (
            <motion.a
              key={c.title}
              href={c.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass group relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all hover:bg-white/[0.06] hover:scale-[1.02]"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)]/30 to-[var(--primary-glow)]/20 text-foreground mb-3">
                <Award className="size-5" />
              </div>
              <h3 className="font-display text-sm sm:text-base font-semibold">{c.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{c.issuer}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Achievements() {
  const iconMap: Record<string, typeof Code2> = {
    code: Code,
    rocket: Rocket,
    sparkle: Sparkles,
  };

  return (
    <section id="achievements" className="relative py-8 sm:py-10 md:py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          kicker="Milestones"
          title="Achievements"
          lead="Key milestones that reflect my growth and dedication."
        />
        <div className="mt-6 sm:mt-8 grid gap-3.5 sm:gap-5 sm:grid-cols-3">
          {achievements.map((a, i) => {
            const Icon = iconMap[a.icon] ?? Trophy;
            return (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass group relative overflow-hidden rounded-xl sm:rounded-2xl p-5 sm:p-7 text-center transition-all hover:bg-white/[0.06] hover:scale-[1.02]"
              >
                <div className="flex justify-center mb-3">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)]/30 to-[var(--primary-glow)]/20 text-foreground">
                    <Icon className="size-6" />
                  </div>
                </div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-brand-gradient">{a.value}</div>
                <div className="mt-1 text-xs sm:text-sm text-muted-foreground">{a.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

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
    return () => {
      cancelled = true;
    };
  }, []);

  const langData = useMemo(() => {
    if (!repos) return [];
    const counts: Record<string, { count: number; bytes: number }> = {};
    for (const r of repos) {
      if (r.language) {
        if (!counts[r.language]) counts[r.language] = { count: 0, bytes: 0 };
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
    <section id="github" className="relative py-8 sm:py-10 md:py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          kicker="GitHub Statistics"
          title="Open Source Activity"
          lead="Live from my GitHub — repos, contributions, and coding activity."
        />
        {err ? (
          <p className="mt-8 text-center text-sm text-muted-foreground">{err}</p>
        ) : (
          <div className="mt-6 sm:mt-8 space-y-6">
            <div className="grid gap-4 sm:gap-6 md:grid-cols-[1fr_2fr]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-strong rounded-2xl sm:rounded-3xl p-5 sm:p-7"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={user?.avatar_url ?? profile.image}
                    alt="GitHub avatar"
                    className="size-14 rounded-full border border-white/10"
                  />
                  <div>
                    <div className="font-display text-lg font-semibold">@{profile.github.split("/").pop()}</div>
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <GithubIcon className="size-3.5" /> {profile.github.split("/").slice(-2).join("/")}
                    </a>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Mini label="Repositories" value={user?.public_repos ?? "—"} />
                  <Mini label="Gists" value={user?.public_gists ?? "—"} />
                  <Mini label="Followers" value={user?.followers ?? "—"} />
                  <Mini label="Following" value={user?.following ?? "—"} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glass-strong rounded-2xl sm:rounded-3xl p-5 sm:p-7"
              >
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Activity Overview</div>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <Mini label="Total Stars" value={totalStars} />
                  <Mini label="Total Forks" value={totalForks} />
                  <Mini label="Active Repos (30d)" value={recentCommits} />
                  <Mini label="Top Language" value={langData[0]?.name ?? "—"} />
                </div>
              </motion.div>
            </div>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-[1fr_1fr]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-strong rounded-2xl sm:rounded-3xl p-5 sm:p-7"
              >
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Top Languages</div>
                <div className="mt-5 space-y-3">
                  {langData.length === 0 && (
                    <p className="text-sm text-muted-foreground">Loading language data...</p>
                  )}
                  {langData.map((l) => (
                    <div key={l.name}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="flex items-center gap-2">
                          <span
                            className="size-2.5 rounded-sm"
                            style={{ backgroundColor: LANG_COLORS[l.name] ?? "#888" }}
                          />
                          {l.name}
                        </span>
                        <span className="text-muted-foreground">{l.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: LANG_COLORS[l.name] ?? "#888", width: `${l.pct}%` }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${l.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.3 }}
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
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass-strong rounded-2xl sm:rounded-3xl p-5 sm:p-7"
              >
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Contribution Graph</div>
                <div className="mt-5">
                  <img
                    src={`https://ghchart.rshah.org/SANTHOSHSIVA55`}
                    alt="GitHub contribution chart"
                    className="w-full rounded-lg"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="mt-4 flex flex-wrap gap-2 justify-center text-[10px] text-muted-foreground">
                    <span>Less</span>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="size-3 rounded-sm" style={{ backgroundColor: `oklch(0.5 ${0.05 + i * 0.04} ${210 - i * 15})` }} />
                    ))}
                    <span>More</span>
                  </div>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    {repos?.length ?? "?"} repositories · {totalStars} stars across all repos
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-strong rounded-2xl sm:rounded-3xl p-5 sm:p-7"
            >
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Recent Repositories</div>
                <a href={profile.github} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline">
                  View all on GitHub →
                </a>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
                    className="glass group block rounded-xl p-4 transition-all hover:bg-white/[0.06] hover:scale-[1.01]"
                  >
                    <div className="flex items-center gap-2 font-medium text-sm truncate">
                      <BookOpen className="size-3.5 shrink-0 text-muted-foreground" />
                      {r.name}
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">
                      {r.description ?? "No description"}
                    </p>
                    <div className="mt-2.5 flex items-center gap-3 text-[10px] text-muted-foreground">
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

function Mini({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <div className="font-display text-xl font-semibold">{value}</div>
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

export { SectionHeader };
