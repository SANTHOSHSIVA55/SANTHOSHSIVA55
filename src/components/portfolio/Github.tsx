import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, BookOpen } from "lucide-react";
import { GithubIcon } from "./icons";
import { profile } from "./data";
import { SectionHeader } from "./Sections";

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
};

export function GithubSection() {
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
        setRepos((r ?? []).filter((x) => !x.fork).slice(0, 6));
      })
      .catch(() => !cancelled && setErr("Could not load GitHub data right now."));
    return () => {
      cancelled = true;
    };
  }, []);

  const languages = Array.from(
    new Set((repos ?? []).map((r) => r.language).filter(Boolean) as string[]),
  );

  return (
    <section id="github" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          kicker="GitHub"
          title="Live from my repositories"
          lead="Fetched directly from the GitHub API — what I'm shipping right now."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-[1fr_2fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-strong rounded-3xl p-7"
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
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              <Mini label="Repos" value={user?.public_repos ?? "—"} />
              <Mini label="Followers" value={user?.followers ?? "—"} />
              <Mini label="Following" value={user?.following ?? "—"} />
            </div>
            <div className="mt-6">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Tech stack</div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {(languages.length ? languages : ["JavaScript", "Python", "Java", "React"]).map((l) => (
                  <span key={l} className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-muted-foreground">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {err && <div className="glass rounded-2xl p-6 text-sm text-muted-foreground">{err}</div>}
            {!repos && !err &&
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass h-36 animate-pulse rounded-2xl" />
              ))}
            {repos?.map((r, i) => (
              <motion.a
                key={r.id}
                href={r.html_url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass group block rounded-2xl p-5 transition-colors hover:bg-white/[0.06]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 font-medium">
                    <BookOpen className="size-4 text-muted-foreground" /> {r.name}
                  </div>
                  <GithubIcon className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {r.description ?? "No description provided."}
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  {r.language && (
                    <span className="inline-flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-[var(--primary)]" /> {r.language}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1"><Star className="size-3.5" /> {r.stargazers_count}</span>
                  <span className="inline-flex items-center gap-1"><GitFork className="size-3.5" /> {r.forks_count}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
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