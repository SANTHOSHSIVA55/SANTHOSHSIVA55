import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 2000;

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const current = Math.round(eased * 100);
      setProgress(current);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setExiting(true), 300);
        setTimeout(() => setDone(true), 1100);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  if (done) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#020202" }}
        >
          {/* Background aurora blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#D9D9D9]/[0.02] blur-[120px] animate-aurora" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#C0C0C0]/[0.015] blur-[100px] animate-aurora-delayed" />
          </div>

          {/* Center content */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            animate={exiting ? { y: -60, opacity: 0, filter: "blur(8px)" } : { y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Large counter */}
            <div className="font-display font-bold tabular-nums" style={{ fontSize: "clamp(4rem, 12vw, 10rem)" }}>
              <span className="text-[#F8FAFC]">{progress}</span>
              <span className="text-[#4A4A4A] text-[0.5em]">%</span>
            </div>

            {/* Thin progress line */}
            <div className="mt-6 w-64 h-[1px] bg-white/[0.06] overflow-hidden rounded-full">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #E8E8E8, #C0C0C0, #E8E8E8)",
                  width: `${progress}%`,
                }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Name */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: progress > 10 ? 0.4 : 0 }}
              className="mt-6 text-[11px] text-[#666] tracking-[0.3em] uppercase font-medium"
            >
              Santhosh T S
            </motion.p>
          </motion.div>

          {/* Bottom reveal mask */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={exiting ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-[#020202] origin-bottom z-20"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
