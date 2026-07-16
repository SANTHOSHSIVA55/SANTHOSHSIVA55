import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetcodeIcon, GfgIcon } from "./icons";
import { profile, stats } from "./data";

function useTypingEffect(words: string[], speed = 75, deleteSpeed = 35, pause = 2400) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[idx] || "";
    let pauseTimer: ReturnType<typeof setTimeout> | undefined;
    const timer = setTimeout(
      () => {
        if (!deleting) {
          if (text.length < current.length) {
            setText(current.slice(0, text.length + 1));
          } else {
            pauseTimer = setTimeout(() => setDeleting(true), pause);
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
    return () => {
      clearTimeout(timer);
      if (pauseTimer) clearTimeout(pauseTimer);
    };
  }, [text, idx, deleting, words, speed, deleteSpeed, pause]);

  return text;
}

const roles = [
  "Software Engineer",
  "Full Stack Developer",
  "Data Analyst",
  "Problem Solver",
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};

const wordReveal = {
  hidden: { opacity: 0, y: "100%", filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const fadeIn = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay },
});

export function Hero() {
  const typed = useTypingEffect(roles);
  const sectionRef = useRef<HTMLElement>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 22 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 22 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const nameParts = profile.name.split(" ");

  return (
    <section ref={sectionRef} id="top" className="relative min-h-[100dvh] flex items-center overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-28 lg:pb-20">

        {/* ── Main layout ── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8 sm:gap-10 lg:gap-16">

          {/* ── Profile photo (top on mobile, right on sm+) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0 order-1 sm:order-last self-center sm:self-start"
          >
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, transformPerspective: 1200 }}
              className="hero-photo-group relative"
            >
              {/* Ambient glow */}
              <div className="absolute -inset-6 sm:-inset-8 rounded-full bg-[#22D3EE]/[0.07] blur-2xl sm:blur-3xl pointer-events-none" />

              {/* Glass border ring */}
              <div className="absolute -inset-[3px] rounded-full hero-photo-ring pointer-events-none" />

              {/* Profile image */}
              <div className="relative w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] md:w-[140px] md:h-[140px] lg:w-[170px] lg:h-[170px] rounded-full overflow-hidden hero-photo-shadow">
                <img
                  src={profile.image}
                  alt={`${profile.name}, Full Stack Developer & Data Analyst based in Chennai`}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Inner vignette */}
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_30px_rgba(0,0,0,0.3)] pointer-events-none" />
              </div>
            </motion.div>
          </motion.div>

          {/* ── Text content ── */}
          <div className="flex-1 min-w-0 order-2 sm:order-first">

            {/* Availability badge */}
            <motion.div {...fadeUp(0.3)} className="mb-4 lg:mb-5 inline-flex items-center gap-2 rounded-full border border-[#22C55E]/20 bg-[#22C55E]/[0.05] px-3 py-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
              </span>
              <span className="text-[11px] font-medium text-[#22C55E] tracking-wide">
                Open to opportunities
              </span>
            </motion.div>

            {/* Name */}
            <div className="overflow-hidden mb-4 lg:mb-5">
              <motion.h1
                className="font-display font-bold leading-[0.92] tracking-[-0.04em] lg:whitespace-nowrap"
                style={{ fontSize: "clamp(2rem, 5.5vw, 4.5rem)" }}
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

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4 lg:mb-5 h-[1px] w-16 sm:w-24 lg:w-32 origin-left bg-gradient-to-r from-[#E8E8E8] to-transparent"
            />

            {/* Role switcher */}
            <motion.div {...fadeUp(0.6)} className="mb-4 lg:mb-5 flex items-center gap-2">
              <span className="font-display text-base sm:text-xl md:text-2xl lg:text-3xl text-[#94A3B8] font-medium">
                {typed}
              </span>
              <span className="inline-block h-6 sm:h-7 w-[2px] bg-gradient-to-b from-[#E8E8E8] to-[#A8A8A8] animate-pulse" />
            </motion.div>

            {/* Bio */}
            <motion.p
              {...fadeUp(0.7)}
              className="mb-6 lg:mb-8 max-w-[520px] text-[15px] sm:text-base lg:text-lg leading-[1.8] text-[#94A3B8]"
            >
              {profile.sub}
            </motion.p>

            {/* CTA buttons */}
            <motion.div {...fadeUp(0.8)} className="mb-5 lg:mb-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <a
                href="#projects"
                className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E8E8E8] to-[#C0C0C0] px-5 py-3 sm:px-6 sm:py-3.5 text-sm font-semibold text-[#020202] transition-all duration-300 hover:shadow-[0_0_40px_rgba(232,232,232,0.15)] hover:scale-[1.02] overflow-hidden"
              >
                <span className="relative z-10">View Projects</span>
                <ArrowRight className="relative z-10 size-4 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#C0C0C0] to-[#E8E8E8] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </a>
              <a
                href="/resume.pdf"
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-3 sm:px-6 sm:py-3.5 text-sm font-medium text-[#FFFFFF] transition-all duration-300 hover:bg-white/[0.07] hover:border-white/[0.15]"
              >
                <Download className="size-4" /> Resume
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-3 sm:px-6 sm:py-3.5 text-sm font-medium text-[#FFFFFF] transition-all duration-300 hover:bg-white/[0.07]"
              >
                <GithubIcon className="size-4" /> GitHub
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div {...fadeIn(1.0)} className="flex flex-wrap items-center gap-x-4 sm:gap-x-5 gap-y-2 text-xs sm:text-sm text-[#94A3B8]">
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
        </div>

        {/* ── Stats grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 1.2 + i * 0.06 }}
              className="cosmic-panel group rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:bg-white/[0.08]"
            >
              <div className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient">
                {s.value}
              </div>
              <div className="mt-1 text-xs sm:text-sm text-[#94A3B8]">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
