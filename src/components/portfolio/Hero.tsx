import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetcodeIcon, GfgIcon } from "./icons";
import { profile, stats } from "./data";

export function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-muted-foreground"
          >
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for internships & Full Stack roles
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[68px]"
          >
            Building <span className="text-brand-gradient">scalable software</span> through code, design & innovation.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            {profile.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-glow)] px-5 py-3 text-sm font-medium text-[var(--primary-foreground)] shadow-glow transition-transform hover:scale-[1.03]"
            >
              View Projects
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="/resume.pdf"
              className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white/10"
            >
              <Download className="size-4" /> Download Resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="size-4" /> Contact Me
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-5 text-sm text-muted-foreground"
          >
            <span className="inline-flex items-center gap-1.5"><MapPin className="size-4" /> {profile.location}</span>
            <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-foreground"><GithubIcon className="size-4" /> GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-foreground"><LinkedinIcon className="size-4" /> LinkedIn</a>
            <a href={profile.leetcode} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-foreground"><LeetcodeIcon className="size-4" /> LeetCode</a>
            <a href={profile.gfg} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-foreground"><GfgIcon className="size-4" /> GeeksforGeeks</a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-[var(--primary)]/30 via-[var(--primary-glow)]/20 to-transparent blur-2xl" />
          <div className="glass-strong relative overflow-hidden rounded-3xl p-3 shadow-elevated">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <img
                src={profile.image}
                alt={`${profile.name}, Full Stack Developer based in Chennai`}
                loading="eager"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 glass rounded-xl px-3 py-2">
                <div className="text-xs text-muted-foreground">Currently</div>
                <div className="text-sm font-medium">CSE @ Chennai · Open to opportunities</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-3 px-6 sm:gap-4 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="glass rounded-2xl p-5 transition-colors hover:bg-white/[0.06]"
          >
            <div className="font-display text-2xl font-semibold sm:text-3xl">{s.value}</div>
            <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}