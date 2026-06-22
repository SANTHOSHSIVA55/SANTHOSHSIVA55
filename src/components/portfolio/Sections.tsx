import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Code2, Database, Wrench, Layers, Sparkles, ExternalLink, ArrowUpRight, Star, GitFork, RefreshCw, Code, Brain, Blocks, Rocket } from "lucide-react";
import { GithubIcon } from "./icons";
import { profile, projects as featuredProjects, skills, timeline } from "./data";

function SectionHeader({ kicker, title, lead }: { kicker: string; title: string; lead?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
        <Sparkles className="size-3.5" /> {kicker}
      </div>
      <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {lead && <p className="mt-4 text-muted-foreground sm:text-lg">{lead}</p>}
    </div>
  );
}

export function About() {
  const pills = [
    "DSA", "OOP", "DBMS", "Operating Systems", "Computer Networks", "System Design",
  ];
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader kicker="About" title="Engineer in the making, shipping in the present." />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-strong md:col-span-2 rounded-3xl p-8"
          >
            <p className="text-lg leading-relaxed text-foreground/90">
              I'm <span className="text-foreground font-medium">{profile.name}</span> — a Computer Science Engineering student and full stack developer who genuinely enjoys turning hard problems into clean, reliable software.
            </p>
            <p className="mt-4 text-muted-foreground">
              My focus is on building scalable systems with great UX — across the stack. I've sharpened my fundamentals through 300+ DSA problems and applied them in real products like AI-driven aquaculture monitoring and a generative-AI BI platform. I care about craft: clean APIs, fast UIs, sensible data models, and code that other engineers actually enjoy reading.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {pills.map((p) => (
                <span key={p} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-muted-foreground">
                  {p}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass rounded-3xl p-8"
          >
            <div className="flex flex-col gap-5 text-sm">
              <Stat label="Focus" value="Full Stack + AI" />
              <Stat label="Based in" value={profile.location} />
              <Stat label="Studying" value="CSE · Undergrad" />
              <Stat label="Currently" value="Open to Full Stack roles" />
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
  Frontend: Code2,
  Backend: Layers,
  Database: Database,
  Tools: Wrench,
};

export function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          kicker="Toolkit"
          title="Tools I reach for"
          lead="Battle-tested across coursework, side projects and production-grade builds."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((g, i) => {
            const Icon = groupIcons[g.group] ?? Code2;
            return (
              <motion.div
                key={g.group}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass group relative overflow-hidden rounded-2xl p-6 transition-colors hover:bg-white/[0.06]"
              >
                <div className="absolute -right-12 -top-12 size-32 rounded-full bg-[var(--primary)]/10 blur-2xl transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)]/30 to-[var(--primary-glow)]/20 text-foreground">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">{g.group}</h3>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
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
          stack: featured?.stack ?? (stack.length ? stack : ["Code"]),
          achievements: featured?.achievements,
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
    <section id="projects" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          kicker="Featured Work"
          title="Projects I'm proud of"
          lead="Synced live from my GitHub — these update automatically as I ship new work."
        />
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <RefreshCw className="size-3.5" />
          <span>{err ? err : repos ? `Live · ${repos.length} latest projects` : "Fetching projects..."}</span>
        </div>
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {!repos && !err &&
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass-strong h-[420px] animate-pulse rounded-3xl" />
            ))}
          {cards.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group glass-strong relative overflow-hidden rounded-3xl"
            >
              <div className={`relative h-56 w-full overflow-hidden bg-gradient-to-br ${p.accent}`}>
                <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 30% 30%, oklch(1 0 0 / 0.18), transparent 60%)" }} />
                {/* code-style mock */}
                <div className="absolute inset-6 glass rounded-xl p-4 font-mono text-[11px] text-muted-foreground shadow-elevated">
                  <div className="mb-3 flex gap-1.5">
                    <span className="size-2.5 rounded-full bg-red-400/70" />
                    <span className="size-2.5 rounded-full bg-yellow-400/70" />
                    <span className="size-2.5 rounded-full bg-emerald-400/70" />
                  </div>
                  <div className="space-y-1.5">
                    <div><span className="text-[var(--primary)]">const</span> <span className="text-foreground">{p.title.replace(/\s/g, "")}</span> = <span className="text-[var(--primary-glow)]">async</span> () =&gt; {"{"}</div>
                    <div className="pl-4">await <span className="text-foreground">predict</span>(data);</div>
                    <div className="pl-4">return <span className="text-foreground">insights</span>;</div>
                    <div>{"}"}</div>
                  </div>
                </div>
              </div>
              <div className="p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{p.tag}</div>
                    <h3 className="mt-1 font-display text-2xl font-semibold capitalize">{p.title}</h3>
                  </div>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${p.title} on GitHub`}
                    className="glass inline-flex size-10 items-center justify-center rounded-full transition-transform hover:scale-110"
                  >
                    <ArrowUpRight className="size-4" />
                  </a>
                </div>
                <p className="mt-3 text-muted-foreground">{p.description}</p>
                {p.achievements && (
                  <ul className="mt-5 space-y-1.5 text-sm text-muted-foreground">
                    {p.achievements.map((a) => (
                      <li key={a} className="flex items-start gap-2">
                        <span className="mt-1.5 size-1.5 rounded-full bg-[var(--primary)]" /> {a}
                      </li>
                    ))}
                  </ul>
                )}
                {(p.stars !== undefined || p.updated) && (
                  <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
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
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-muted-foreground">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium hover:bg-white/10"
                  >
                    <GithubIcon className="size-4" /> View Code
                  </a>
                  {p.homepage ? (
                    <a
                      href={p.homepage}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                      <ExternalLink className="size-4" /> Live
                    </a>
                  ) : (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                      <ExternalLink className="size-4" /> Details
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
  "from-rose-500/20 to-pink-500/10",
];

export function Journey() {
  return (
    <section id="journey" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader kicker="Journey" title="The road so far" lead="From writing first lines of code to building AI-powered products." />
        <div className="relative mt-16">
          {/* Vertical line */}
          <div className="absolute left-[27px] top-0 bottom-0 w-px bg-gradient-to-b from-[var(--primary)] via-white/20 to-transparent md:left-1/2 md:-translate-x-px" />
          <ul className="space-y-12 md:space-y-16">
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
                  className={`relative grid items-center gap-6 md:grid-cols-2 md:gap-16 ${isLeft ? "" : "md:[&>*:first-child]:col-start-2"}`}
                >
                  {/* Dot on timeline */}
                  <span
                    aria-hidden
                    className="absolute left-[27px] top-6 z-10 flex size-8 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-glow)] ring-4 ring-[var(--background)] shadow-glow md:left-1/2"
                  >
                    <Icon className="size-3.5 text-white" />
                  </span>

                  {/* Year badge */}
                  <div className={`pl-14 md:pl-0 ${isLeft ? "md:text-right" : "md:text-left"}`}>
                    <span className="inline-block rounded-full bg-gradient-to-r from-[var(--primary)]/20 to-[var(--primary-glow)]/10 px-3 py-1 text-xs font-medium tracking-wider text-[var(--primary)]">
                      {t.year}
                    </span>
                  </div>

                  {/* Card */}
                  <div className={`pl-14 md:pl-0 ${isLeft ? "md:pl-0" : "md:pr-0"}`}>
                    <div className={`glass-strong group relative overflow-hidden rounded-2xl p-6 transition-all hover:bg-white/[0.06] hover:shadow-elevated`}>
                      <div className={`absolute -right-8 -top-8 size-24 rounded-full bg-gradient-to-br ${timelineGradients[i]} blur-2xl opacity-60 transition-opacity group-hover:opacity-100`} />
                      <div className="relative">
                        <h3 className="font-display text-xl font-semibold">{t.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
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

export { SectionHeader };