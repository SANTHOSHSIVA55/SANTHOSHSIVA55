import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetcodeIcon, GfgIcon } from "./icons";
import { profile, heroRoles, heroStats } from "./data";

/* ─── Smooth Fade Typewriter ─── */
function useFadeTypewriter(words: string[], interval = 2800) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);
  return words[idx];
}

/* ─── Animated Counter ─── */
function AnimatedStat({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
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
    const t = setTimeout(() => requestAnimationFrame(step), delay);
    return () => clearTimeout(t);
  }, [isInView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
      className="hero-stat-card group relative rounded-2xl px-4 py-3.5 text-center cursor-default"
    >
      <div className="font-display text-2xl sm:text-3xl font-bold text-accent-gradient tabular-nums">
        {display}{suffix}
      </div>
      <div className="text-[11px] sm:text-xs text-[#94A3B8] mt-1 leading-tight font-medium">{label}</div>
    </motion.div>
  );
}

function useInView(ref: React.RefObject<HTMLElement | null>, opts?: IntersectionObserverInit) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.1, ...opts });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

/* ─── Magnetic Button ─── */
function MagneticBtn({ children, className = "", ...props }: { children: React.ReactNode; className?: string } & Record<string, unknown>) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const move = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.2);
    y.set((e.clientY - r.top - r.height / 2) * 0.2);
  }, [x, y]);

  const leave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.a ref={ref} style={{ x: sx, y: sy }} onMouseMove={move} onMouseLeave={leave} className={className} {...props}>
      {children}
    </motion.a>
  );
}

/* ─── Animations ─── */
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};

const wordReveal = {
  hidden: { opacity: 0, y: "100%", filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

/* ─── Hero ─── */
export function Hero() {
  const typed = useFadeTypewriter(heroRoles, 2800);
  const cardRef = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 20 });
  const rY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 20 });

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }, [mx, my]);

  const onLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  const nameParts = useMemo(() => profile.name.split(" "), []);

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Background glow blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-[12%] right-[10%] w-[500px] h-[500px] rounded-full bg-[#3B82F6]/[0.03] blur-[120px]" />
        <div className="absolute bottom-[8%] left-[8%] w-[400px] h-[400px] rounded-full bg-[#6366F1]/[0.025] blur-[100px]" />
        <div className="absolute top-[45%] left-[35%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#8B5CF6]/[0.02] blur-[90px]" />
      </div>

      {/* ── Mobile layout (stacked, centered) ── */}
      <div className="lg:hidden pt-24 pb-12 sm:pt-28 sm:pb-16">
        <div className="mx-auto w-full max-w-[480px] px-5 sm:px-6 relative z-10 flex flex-col items-center gap-8">

          {/* Profile image — top on mobile */}
          <ProfileImage cardRef={cardRef} onMove={onMove} onLeave={onLeave} rX={rX} rY={rY} />

          {/* Text content — below on mobile */}
          <div className="w-full text-center">
            <Badge />
            <Name />
            <Typewriter typed={typed} />
            <Bio />
            <CTAs />
            <Stats />
            <Social />
          </div>
        </div>
      </div>

      {/* ── Desktop layout (side by side) ── */}
      <div className="hidden lg:flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-[1200px] px-8 relative z-10 flex items-center justify-between gap-20">

          {/* Text content — left on desktop */}
          <div className="flex-1 min-w-0 max-w-[620px] text-left">
            <Badge />
            <Name />
            <Typewriter typed={typed} />
            <Bio />
            <CTAs />
            <Stats />
            <Social />
          </div>

          {/* Profile image — right on desktop */}
          <ProfileImage cardRef={cardRef} onMove={onMove} onLeave={onLeave} rX={rX} rY={rY} />
        </div>
      </div>
    </section>
  );
}

/* ─── Shared sub-components ─── */

function Badge() {
  return (
    <motion.div {...fadeUp(0.15)} className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#22C55E]/20 bg-[#22C55E]/[0.04] px-4 py-1.5">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
      </span>
      <span className="text-[11px] font-medium text-[#22C55E] tracking-wide">Open to opportunities</span>
    </motion.div>
  );
}

function Name() {
  const nameParts = profile.name.split(" ");
  return (
    <div className="overflow-hidden mb-5">
      <motion.h1
        className="font-display font-bold leading-[0.9] tracking-[-0.045em] whitespace-nowrap"
        style={{ fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)" }}
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        {nameParts.map((part, i) => (
          <motion.span
            key={i}
            className={`inline-block mr-[0.3em] ${i === 0 ? "text-[#F8FAFC]" : "text-gradient"}`}
            variants={wordReveal}
          >
            {part}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
}

function Typewriter({ typed }: { typed: string }) {
  return (
    <motion.div {...fadeUp(0.4)} className="mb-5 h-10 sm:h-11 flex items-center justify-center lg:justify-start overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={typed}
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-lg sm:text-xl md:text-2xl text-[#94A3B8] font-medium"
        >
          {typed}
        </motion.span>
      </AnimatePresence>
      <span className="hero-cursor inline-block h-6 sm:h-7 w-[2px] bg-[#3B82F6] ml-1" />
    </motion.div>
  );
}

function Bio() {
  return (
    <motion.p {...fadeUp(0.5)} className="mb-8 max-w-[540px] text-[14px] sm:text-[15px] leading-[1.85] text-[#94A3B8] mx-auto lg:mx-0">
      {profile.sub}
    </motion.p>
  );
}

function CTAs() {
  return (
    <motion.div {...fadeUp(0.6)} className="mb-8 flex flex-wrap items-center gap-3 justify-center lg:justify-start">
      <MagneticBtn href="#projects" className="hero-btn-primary group relative inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-semibold text-[#FFFFFF] overflow-hidden">
        <span className="relative z-10">View Projects</span>
        <ArrowRight className="relative z-10 size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
      </MagneticBtn>
      <MagneticBtn href="/resume.pdf" className="hero-btn-ghost group inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-medium text-[#FFFFFF]">
        <Download className="size-4" /> Resume
      </MagneticBtn>
      <MagneticBtn href={profile.github} target="_blank" rel="noreferrer" className="hero-btn-ghost group inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-medium text-[#FFFFFF]">
        <GithubIcon className="size-4" /> GitHub
      </MagneticBtn>
    </motion.div>
  );
}

function Stats() {
  return (
    <div className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
      {heroStats.map((s, i) => (
        <AnimatedStat key={s.label} value={s.value} suffix={s.suffix} label={s.label} delay={800 + i * 120} />
      ))}
    </div>
  );
}

function Social() {
  return (
    <motion.div {...fadeUp(1.2)} className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-[#94A3B8] justify-center lg:justify-start">
      <span className="inline-flex items-center gap-1.5">
        <MapPin className="size-3.5" /> {profile.location}
      </span>
      <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#3B82F6] transition-colors duration-300">
        <LinkedinIcon className="size-3.5" /> LinkedIn
      </a>
      <a href={profile.leetcode} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#F59E0B] transition-colors duration-300">
        <LeetcodeIcon className="size-3.5" /> LeetCode
      </a>
      <a href={profile.gfg} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#22C55E] transition-colors duration-300">
        <GfgIcon className="size-3.5" /> GFG
      </a>
    </motion.div>
  );
}

function ProfileImage({
  cardRef,
  onMove,
  onLeave,
  rX,
  rY,
}: {
  cardRef: React.RefObject<HTMLDivElement | null>;
  onMove: (e: React.MouseEvent) => void;
  onLeave: () => void;
  rX: ReturnType<typeof useSpring>;
  rY: ReturnType<typeof useSpring>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, filter: "blur(16px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative shrink-0"
    >
      {/* Orbiting particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span key={i} className="hero-orbit-dot" style={{ animationDuration: `${7 + i * 1.5}s`, animationDelay: `${i * 0.9}s` }} />
        ))}
      </div>

      {/* Glass card with floating animation */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          ref={cardRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{ rotateX: rX, rotateY: rY, transformPerspective: 1200 }}
          className="hero-glass-card relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[260px] md:h-[260px] lg:w-[300px] lg:h-[300px] rounded-full cursor-default mx-auto group"
        >
          <div className="relative w-full h-full rounded-full overflow-hidden bg-[#0A0A0F]/70 backdrop-blur-xl border border-white/[0.05]">
            <img
              src={profile.image}
              alt={`${profile.name}, Software Engineer & Full Stack Developer`}
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] pointer-events-none sm:shadow-[inset_0_0_30px_rgba(0,0,0,0.3)] lg:shadow-[inset_0_0_50px_rgba(0,0,0,0.4)]" />
          </div>
        </motion.div>
      </motion.div>

      {/* Ambient glow - blue accent */}
      <div className="absolute -inset-16 -z-10 rounded-full bg-[#3B82F6]/[0.04] blur-[80px] pointer-events-none" />
    </motion.div>
  );
}
