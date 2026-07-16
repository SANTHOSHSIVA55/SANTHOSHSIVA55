import { useRef, useEffect, useState } from "react";
import { skills } from "./data";

const allSkills = skills.flatMap((s) => s.items);

export function InfiniteMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animFrame: number;
    let offset = 0;
    const speed = 0.5;

    const animate = () => {
      if (!paused && !document.hidden) {
        offset -= speed;
        const first = container.children[0] as HTMLElement;
        if (first) {
          const halfWidth = first.scrollWidth / 2;
          if (Math.abs(offset) >= halfWidth) offset = 0;
        }
        container.style.transform = `translateX(${offset}px)`;
      }
      animFrame = requestAnimationFrame(animate);
    };

    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [paused]);

  const doubled = [...allSkills, ...allSkills];

  return (
    <div className="relative py-8 overflow-hidden">
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#020202] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#020202] to-transparent z-10 pointer-events-none" />

      <div
        ref={containerRef}
        className="flex gap-4 will-change-transform"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {[0, 1].map((setIdx) => (
          <div key={setIdx} className="flex gap-4 shrink-0">
            {doubled.slice(setIdx * allSkills.length, (setIdx + 1) * allSkills.length).map((skill, i) => (
              <span
                key={`${setIdx}-${i}`}
                className="shrink-0 rounded-full border border-white/[0.06] bg-white/[0.03] px-5 py-2 text-sm text-[#94A3B8] hover:text-[#E8E8E8] hover:border-[#E8E8E8]/20 hover:bg-white/[0.06] transition-all duration-300 cursor-default whitespace-nowrap"
              >
                {skill}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
