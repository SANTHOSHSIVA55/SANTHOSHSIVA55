import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, MapPin, ExternalLink, Code2, Terminal, Database, Cloud, Globe, Cpu } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetcodeIcon, GfgIcon } from "./icons";
import { profile, stats } from "./data";

function useTypingEffect(words: string[], speed = 90, deleteSpeed = 50, pause = 2000) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[idx] || "";
    const timer = setTimeout(
      () => {
        if (!deleting) {
          if (text.length < current.length) {
            setText(current.slice(0, text.length + 1));
          } else {
            setTimeout(() => setDeleting(true), pause);
          }
        } else {
          if (text.length > 0) {
            setText(current.slice(0, text.length - 1));
          } else {
            setDeleting(false);
            setIdx((i) => (i + 1) % words.length);
          }
        }
      },
      deleting ? deleteSpeed : speed,
    );
    return () => clearTimeout(timer);
  }, [text, idx, deleting, words, speed, deleteSpeed, pause]);

  return text;
}

const roles = ["Computer Science Student", "Full Stack Developer", "AI Builder"];

const floatingTechs = [
  { Icon: Code2, label: "React", x: "10%", y: "20%", delay: 0 },
  { Icon: Terminal, label: "Node.js", x: "85%", y: "15%", delay: 0.5 },
  { Icon: Database, label: "PostgreSQL", x: "80%", y: "70%", delay: 1 },
  { Icon: Cloud, label: "AWS", x: "15%", y: "75%", delay: 1.5 },
  { Icon: Globe, label: "Next.js", x: "90%", y: "40%", delay: 2 },
  { Icon: Cpu, label: "Python", x: "5%", y: "50%", delay: 2.5 },
];

export function Hero() {
  const typed = useTypingEffect(roles);

  return (
    <section id="top" className="relative pt-20 pb-10 sm:pt-24 sm:pb-14 md:pt-28 md:pb-18 overflow-hidden">
      {/* Floating tech icons in background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {floatingTechs.map(({ Icon, label, x, y, delay }) => (
          <motion.div
            key={label}
            className="absolute hidden sm:flex items-center gap-1.5 rounded-full glass px-2.5 py-1 text-[10px] text-muted-foreground/40"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: [0, -8, 0] }}
            transition={{
              opacity: { delay: 1.5 + delay, duration: 0.8 },
              y: {
                delay,
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <Icon className="size-3" />
            {label}
          </motion.div>
        ))}
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className="grid grid-cols-[1fr_auto] items-start gap-3
                     sm:grid-cols-[1.2fr_1fr] sm:gap-6
                     md:grid-cols-[1.4fr_1fr] md:items-center md:gap-16 lg:gap-20"
        >
          <div className="min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass mb-3 sm:mb-0 inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs text-muted-foreground"
            >
              <span className="relative inline-flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-400" />
              </span>
              Open to Software Engineer / Full Stack Developer roles
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="font-display text-2xl font-bold leading-[1.1] tracking-tight
                         sm:text-3xl md:text-5xl lg:text-6xl xl:text-[68px]"
            >
              <span className="text-foreground break-words">{profile.name.split(" ")[0]}{" "}</span>
              <span className="text-brand-gradient break-words">{profile.name.split(" ").slice(1).join(" ")}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-2 sm:mt-4 flex items-center gap-1.5 sm:gap-2"
            >
              <span className="font-display text-sm sm:text-xl md:text-2xl text-muted-foreground">
                {typed}
              </span>
              <span className="inline-block h-4 w-[1.5px] animate-pulse bg-primary sm:h-6 sm:w-[2px]" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-2 sm:mt-5 max-w-xl text-xs leading-relaxed text-muted-foreground
                         sm:text-base md:text-lg"
            >
              {profile.sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-3 sm:mt-7 flex flex-wrap items-center gap-1.5 sm:gap-3"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-glow)] px-3 sm:px-5 py-1.5 sm:py-3 text-[10px] sm:text-sm font-medium text-[var(--primary-foreground)] shadow-glow transition-all hover:scale-[1.03] hover:shadow-lg"
              >
                View Projects
                <ArrowRight className="size-3 sm:size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="/resume.pdf"
                className="glass inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-5 py-1.5 sm:py-3 text-[10px] sm:text-sm font-medium text-foreground transition-all hover:bg-white/10 hover:scale-[1.02]"
              >
                <Download className="size-3 sm:size-4" /> Resume
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="glass inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-5 py-1.5 sm:py-3 text-[10px] sm:text-sm font-medium text-foreground transition-all hover:bg-white/10 hover:scale-[1.02]"
              >
                <GithubIcon className="size-3 sm:size-4" /> GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="glass inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-5 py-1.5 sm:py-3 text-[10px] sm:text-sm font-medium text-muted-foreground transition-all hover:bg-white/10 hover:text-foreground hover:scale-[1.02]"
              >
                <ExternalLink className="size-3 sm:size-4" /> LinkedIn
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-5 py-1.5 sm:py-3 text-[10px] sm:text-sm font-medium text-muted-foreground transition-all hover:text-foreground"
              >
                <Mail className="size-3 sm:size-4" /> Contact
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-3 sm:mt-7 flex flex-wrap items-center gap-x-3 sm:gap-x-5 gap-y-1.5 sm:gap-y-2 text-[10px] sm:text-sm text-muted-foreground"
            >
              <span className="inline-flex items-center gap-1 sm:gap-1.5"><MapPin className="size-3 sm:size-4" /> {profile.location}</span>
              <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 sm:gap-1.5 hover:text-foreground"><GithubIcon className="size-3 sm:size-4" /> GitHub</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 sm:gap-1.5 hover:text-foreground"><LinkedinIcon className="size-3 sm:size-4" /> LinkedIn</a>
              <a href={profile.leetcode} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 sm:gap-1.5 hover:text-foreground"><LeetcodeIcon className="size-3 sm:size-4" /> LeetCode</a>
              <a href={profile.gfg} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 sm:gap-1.5 hover:text-foreground"><GfgIcon className="size-3 sm:size-4" /> GFG</a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-[90px] sm:max-w-[160px] md:max-w-[300px] lg:max-w-[320px] justify-self-end self-start md:self-center"
          >
            <div className="absolute -inset-3 sm:-inset-6 rounded-[1.5rem] sm:rounded-[2.5rem] bg-gradient-to-tr from-[var(--primary)]/25 via-[var(--primary-glow)]/15 to-transparent blur-2xl sm:blur-3xl" />
            <div className="absolute -inset-0.5 sm:-inset-1 rounded-[1.25rem] sm:rounded-[2rem] bg-gradient-to-br from-[var(--primary)]/40 via-transparent to-[var(--primary-glow)]/20 animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="glass-strong relative overflow-hidden rounded-xl sm:rounded-3xl p-1 sm:p-3 shadow-elevated ring-1 ring-white/10">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg sm:rounded-2xl">
                <img
                  src={profile.image}
                  alt={`${profile.name}, Computer Science Student & Full Stack Developer based in Chennai`}
                  loading="eager"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-1 left-1 right-1 sm:bottom-3 sm:left-3 sm:right-3 glass rounded-md sm:rounded-xl px-1.5 py-1 sm:px-4 sm:py-2.5">
                  <div className="text-[6px] sm:text-xs text-muted-foreground tracking-wider">Currently</div>
                  <div className="text-[7px] sm:text-sm font-medium leading-tight sm:leading-normal">CSE @ Chennai · Open to opportunities</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto mt-8 sm:mt-10 grid max-w-6xl grid-cols-2 gap-2.5 px-4 sm:px-6 sm:gap-4 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="glass rounded-xl sm:rounded-2xl p-3.5 sm:p-5 transition-all hover:bg-white/[0.06] hover:scale-[1.02]"
          >
            <div className="font-display text-xl sm:text-2xl md:text-3xl font-semibold">{s.value}</div>
            <div className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs md:text-sm text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
