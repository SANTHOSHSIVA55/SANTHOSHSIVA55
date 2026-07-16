import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetcodeIcon, GfgIcon } from "./icons";
import { profile } from "./data";

/* ─── Typewriter ─── */
function useTypewriter(words: string[], typing = 70, deleting = 40, pause = 2200) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [isDel, setIsDel] = useState(false);

  useEffect(() => {
    const word = words[idx];
    let t: ReturnType<typeof setTimeout>;
    if (!isDel && text === word) {
      t = setTimeout(() => setIsDel(true), pause);
    } else if (isDel && text === "") {
      setIsDel(false);
      setIdx((i) => (i + 1) % words.length);
    } else {
      t = setTimeout(() => {
        setText(isDel ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      }, isDel ? deleting : typing);
    }
    return () => clearTimeout(t);
  }, [text, idx, isDel, words, typing, deleting, pause]);
  return text;
}

/* ─── Magnetic Button ─── */
function MagneticBtn({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & Record<string, unknown>) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const move = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      x.set((e.clientX - r.left - r.width / 2) * 0.2);
      y.set((e.clientY - r.top - r.height / 2) * 0.2);
    },
    [x, y],
  );

  const leave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.a ref={ref} style={{ x: sx, y: sy }} onMouseMove={move} onMouseLeave={leave} className={className} {...props}>
      {children}
    </motion.a>
  );
}

/* ─── Config ─── */
const heroRoles = [
  "Full Stack Developer",
  "Frontend Developer",
  "UI/UX Designer",
  "Data Analyst",
];

const heroStats = [
  { value: "300+", label: "DSA Problems" },
  { value: "15+", label: "Projects" },
  { value: "3rd", label: "Year CSE" },
  { value: "✦", label: "Open to Internships" },
];

const techItems = [
  { name: "React", color: "#61DAFB", angle: -40 },
  { name: "Node.js", color: "#68A063", angle: 30 },
  { name: "Python", color: "#FFD43B", angle: 100 },
  { name: "SQL", color: "#E8E8E8", angle: 160 },
  { name: "Git", color: "#F05032", angle: 220 },
  { name: "Figma", color: "#A259FF", angle: 290 },
];

/* ─── Animations ─── */
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
};

const wordReveal = {
  hidden: { opacity: 0, y: "100%", filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18, filter: "blur(5px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] },
});

/* ─── Hero ─── */
export function Hero() {
  const typed = useTypewriter(heroRoles);
  const cardRef = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 20 });
  const rY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 150, damping: 20 });

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const r = cardRef.current.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    },
    [mx, my],
  );

  const onLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  const nameParts = useMemo(() => profile.name.split(" "), []);

  const techPositions = useMemo(
    () =>
      techItems.map((t) => {
        const rad = (t.angle * Math.PI) / 180;
        return { ...t, x: Math.cos(rad), y: Math.sin(rad) };
      }),
    [],
  );

  return (
    <section id="top" className="relative min-h-[90dvh] flex items-center overflow-hidden">
      {/* ── Hero glow blobs ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-[15%] right-[15%] w-[420px] h-[420px] rounded-full bg-[#22D3EE]/[0.035] blur-[110px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[350px] h-[350px] rounded-full bg-[#3B82F6]/[0.025] blur-[100px]" />
        <div className="absolute top-[50%] left-[40%] -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full bg-[#8B5CF6]/[0.02] blur-[90px]" />
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start sm:justify-between gap-10 sm:gap-12 lg:gap-16">

          {/* ════════ Text content ════════ */}
          <div className="flex-1 min-w-0 max-w-[580px] text-center sm:text-left">

            {/* Badge */}
            <motion.div {...fadeUp(0.15)} className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#22C55E]/20 bg-[#22C55E]/[0.05] px-3.5 py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
              </span>
              <span className="text-[11px] font-medium text-[#22C55E] tracking-wide">Open to opportunities</span>
            </motion.div>

            {/* Name */}
            <div className="overflow-hidden mb-3">
              <motion.h1
                className="font-display font-bold leading-[0.92] tracking-[-0.04em] whitespace-nowrap"
                style={{ fontSize: "clamp(1.75rem, 4.5vw, 3.75rem)" }}
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

            {/* Typewriter */}
            <motion.div {...fadeUp(0.45)} className="mb-5 flex items-center justify-center sm:justify-start gap-1">
              <span className="font-display text-base sm:text-lg md:text-xl lg:text-2xl text-[#94A3B8] font-medium">
                {typed}
              </span>
              <span className="hero-cursor inline-block h-5 sm:h-6 w-[2px] bg-[#E8E8E8] ml-0.5" />
            </motion.div>

            {/* Bio */}
            <motion.p {...fadeUp(0.55)} className="mb-7 max-w-[520px] text-[14px] sm:text-[15px] leading-[1.8] text-[#94A3B8] mx-auto sm:mx-0">
              {profile.sub}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div {...fadeUp(0.65)} className="mb-7 flex flex-wrap items-center gap-2.5 justify-center sm:justify-start">
              <MagneticBtn href="#projects" className="hero-btn-primary group relative inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 sm:px-6 sm:py-3.5 text-sm font-semibold text-[#020202] overflow-hidden">
                <span className="relative z-10">View Projects</span>
                <ArrowRight className="relative z-10 size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </MagneticBtn>
              <MagneticBtn href="/resume.pdf" className="hero-btn-ghost group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 sm:px-6 sm:py-3.5 text-sm font-medium text-[#FFFFFF]">
                <Download className="size-4" /> Resume
              </MagneticBtn>
              <MagneticBtn href={profile.github} target="_blank" rel="noreferrer" className="hero-btn-ghost group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 sm:px-6 sm:py-3.5 text-sm font-medium text-[#FFFFFF]">
                <GithubIcon className="size-4" /> GitHub
              </MagneticBtn>
            </motion.div>

            {/* Quick stats */}
            <motion.div {...fadeUp(0.75)} className="mb-7 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {heroStats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.85 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="hero-stat-card rounded-xl px-3 py-2.5 text-center sm:text-left"
                >
                  <div className="font-display text-base sm:text-lg font-bold text-gradient">{s.value}</div>
                  <div className="text-[10px] sm:text-[11px] text-[#94A3B8] mt-0.5 leading-tight">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Social */}
            <motion.div {...fadeUp(0.85)} className="flex flex-wrap items-center gap-x-4 sm:gap-x-5 gap-y-2 text-xs sm:text-sm text-[#94A3B8] justify-center sm:justify-start">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5" /> {profile.location}
              </span>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#E8E8E8] transition-colors">
                <LinkedinIcon className="size-3.5" /> LinkedIn
              </a>
              <a href={profile.leetcode} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#E8E8E8] transition-colors">
                <LeetcodeIcon className="size-3.5" /> LeetCode
              </a>
              <a href={profile.gfg} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#E8E8E8] transition-colors">
                <GfgIcon className="size-3.5" /> GFG
              </a>
            </motion.div>
          </div>

          {/* ════════ Profile image ════════ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative shrink-0 self-center sm:self-start sm:mt-4"
          >
            {/* ── Floating tech icons ── */}
            {techPositions.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.7 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="hero-tech-icon absolute z-10"
                style={
                  {
                    left: `calc(50% + ${t.x} * var(--hero-orbit) - 26px)`,
                    top: `calc(50% + ${t.y} * var(--hero-orbit) - 11px)`,
                    animationDelay: `${i * 0.6}s`,
                  } as React.CSSProperties
                }
              >
                <div className="flex items-center gap-1.5 rounded-full bg-[#0A0A0A]/80 backdrop-blur-md border border-white/[0.08] px-2.5 py-1 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: t.color }} />
                  <span className="text-[10px] font-medium text-[#D4D4D4] whitespace-nowrap">{t.name}</span>
                </div>
              </motion.div>
            ))}

            {/* ── Orbiting particles ── */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  className="hero-orbit-dot"
                  style={{ animationDuration: `${7 + i * 1.5}s`, animationDelay: `${i * 0.9}s` }}
                />
              ))}
            </div>

            {/* ── Glass card ── */}
            <motion.div
              ref={cardRef}
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              style={{ rotateX: rX, rotateY: rY, transformPerspective: 1200 }}
              className="hero-glass-card relative w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] lg:w-[280px] lg:h-[280px] rounded-3xl cursor-default"
            >
              {/* Animated gradient border */}
              <div className="hero-animated-border absolute -inset-[2px] rounded-3xl pointer-events-none" />

              {/* Inner card */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden bg-[#0A0A0A]/60 backdrop-blur-xl border border-white/[0.06]">
                <img
                  src={profile.image}
                  alt={`${profile.name}, Full Stack Developer & Data Analyst`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 rounded-3xl shadow-[inset_0_0_50px_rgba(0,0,0,0.4)] pointer-events-none" />
              </div>
            </motion.div>

            {/* Ambient glow */}
            <div className="absolute -inset-10 -z-10 rounded-3xl bg-[#22D3EE]/[0.05] blur-[60px] pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
