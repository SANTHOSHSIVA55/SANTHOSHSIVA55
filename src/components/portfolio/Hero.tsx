import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform, useSpring, useScroll, useTransform as useTransform2 } from "framer-motion";
import { ArrowRight, Download, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetcodeIcon, GfgIcon } from "./icons";
import { profile, stats } from "./data";

function useTypingEffect(words: string[], speed = 75, deleteSpeed = 35, pause = 2400) {
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

const roles = [
  "Software Engineer",
  "Full Stack Developer",
  "Frontend Developer",
  "Data Analyst",
  "Problem Solver",
  "AI Builder",
];

export function Hero() {
  const typed = useTypingEffect(roles);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform2(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform2(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform2(scrollYProgress, [0, 0.7], [1, 0]);

  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 20 });
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { stiffness: 120, damping: 20 });
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { stiffness: 120, damping: 20 });

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
      {/* Parallax background glow */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#00E5FF]/[0.07] blur-[120px] animate-aurora" />
        <div className="absolute top-[25%] right-[5%] w-[400px] h-[400px] rounded-full bg-[#8B5CF6]/[0.06] blur-[100px] animate-aurora-delayed" />
        <div className="absolute bottom-[10%] left-[30%] w-[350px] h-[350px] rounded-full bg-[#3B82F6]/[0.05] blur-[110px] animate-aurora-slow" />
      </motion.div>

      {/* Central radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.05)_0%,transparent_65%)] animate-slow-pulse" />
      </div>

      <motion.div style={{ y: textY, opacity }} className="mx-auto max-w-6xl px-4 sm:px-6 w-full pt-28 pb-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-20">
          {/* Left: Text content */}
          <div className="min-w-0">
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-[#22C55E]/20 bg-[#22C55E]/[0.05] px-4 py-1.5"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22C55E]" />
              </span>
              <span className="text-[11px] font-medium text-[#22C55E] tracking-wide">
                Open to opportunities
              </span>
            </motion.div>

            {/* Name - Massive display typography */}
            <div className="overflow-hidden">
              <motion.h1
                className="font-display font-bold leading-[0.9] tracking-[-0.04em]"
                style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.12, delayChildren: 1.6 } },
                }}
              >
                {nameParts.map((part, i) => (
                  <motion.span
                    key={i}
                    className={`inline-block ${i === 0 ? "text-[#F8FAFC]" : "text-gradient"}`}
                    variants={{
                      hidden: { opacity: 0, y: "100%", filter: "blur(10px)" },
                      visible: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                      },
                    }}
                  >
                    {part}
                  </motion.span>
                ))}
              </motion.h1>
            </div>

            {/* Gradient divider line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 h-[1px] w-32 origin-left bg-gradient-to-r from-[#00E5FF] to-transparent"
            />

            {/* Role switcher */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.1 }}
              className="mt-5 flex items-center gap-2.5"
            >
              <span className="font-display text-xl sm:text-2xl md:text-3xl text-[#94A3B8] font-medium">
                {typed}
              </span>
              <span className="inline-block h-7 w-[2px] bg-gradient-to-b from-[#00E5FF] to-[#8B5CF6] animate-pulse" />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 2.2 }}
              className="mt-7 max-w-lg text-base sm:text-lg leading-[1.8] text-[#94A3B8]"
            >
              {profile.sub}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.3 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] px-7 py-3.5 text-sm font-semibold text-[#020617] transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,229,255,0.3)] hover:scale-[1.02] overflow-hidden"
              >
                <span className="relative z-10">View Projects</span>
                <ArrowRight className="relative z-10 size-4 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] to-[#00E5FF] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </a>
              <a
                href="/resume.pdf"
                className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-7 py-3.5 text-sm font-medium text-[#F8FAFC] transition-all duration-300 hover:bg-white/[0.07] hover:border-white/[0.12]"
              >
                <Download className="size-4" /> Resume
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-7 py-3.5 text-sm font-medium text-[#F8FAFC] transition-all duration-300 hover:bg-white/[0.07]"
              >
                <GithubIcon className="size-4" /> GitHub
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2.5 }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#94A3B8]"
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5" /> {profile.location}
              </span>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#00E5FF] transition-colors">
                <LinkedinIcon className="size-3.5" /> LinkedIn
              </a>
              <a href={profile.leetcode} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#00E5FF] transition-colors">
                <LeetcodeIcon className="size-3.5" /> LeetCode
              </a>
              <a href={profile.gfg} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#00E5FF] transition-colors">
                <GfgIcon className="size-3.5" /> GFG
              </a>
            </motion.div>
          </div>

          {/* Right: Profile card with 3D tilt */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[300px] mx-auto lg:mx-0 lg:max-w-[340px] lg:justify-self-end"
          >
            {/* Animated glow behind card */}
            <div className="absolute -inset-10 rounded-[3rem] bg-gradient-to-tr from-[#00E5FF]/15 via-[#8B5CF6]/10 to-transparent blur-3xl animate-slow-pulse" />

            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformPerspective: 1200,
              }}
              className="relative"
            >
              {/* Gradient border */}
              <div className="absolute -inset-[1px] rounded-[2.2rem] bg-gradient-to-br from-[#00E5FF]/50 via-[#8B5CF6]/25 to-[#00E5FF]/15" />

              {/* Card body */}
              <div className="glass-strong relative overflow-hidden rounded-[2.1rem] p-3 shadow-elevated">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.7rem]">
                  <img
                    src={profile.image}
                    alt={`${profile.name}, Full Stack Developer & Data Analyst based in Chennai`}
                    loading="eager"
                    className="h-full w-full object-cover"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

                  {/* Bottom info card */}
                  <div className="absolute bottom-3 left-3 right-3 glass rounded-2xl px-4 py-3.5 border border-white/[0.06]">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[9px] text-[#94A3B8] tracking-[0.2em] uppercase font-medium">Currently</div>
                        <div className="text-sm font-semibold text-[#F8FAFC] leading-tight mt-1">
                          CSE @ Chennai
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 rounded-full border border-[#22C55E]/20 bg-[#22C55E]/[0.08] px-2.5 py-1">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                        </span>
                        <span className="text-[9px] text-[#22C55E] font-medium">Available</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.6 }}
          className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
              className="glass group rounded-2xl p-5 transition-all duration-300 hover:bg-white/[0.06]"
            >
              <div className="font-display text-3xl sm:text-4xl font-bold text-gradient">
                {s.value}
              </div>
              <div className="mt-1.5 text-xs sm:text-sm text-[#94A3B8]">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
