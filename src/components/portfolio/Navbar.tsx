import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#journey", label: "Journey" },
  { href: "#github", label: "GitHub" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("#top");
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const lastScrollY = useRef(0);
  const mouseActive = useRef(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const delta = scrollY - lastScrollY.current;

        if (scrollY < 60) {
          setVisible(true);
          setAtTop(true);
        } else if (delta > 10) {
          if (!mouseActive.current) setVisible(false);
          setAtTop(false);
        } else if (delta < -10) {
          setVisible(true);
          setAtTop(false);
        }

        lastScrollY.current = scrollY;

        const sections = ["top", "about", "skills", "projects", "journey", "github", "contact"];
        for (const id of [...sections].reverse()) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= 150) {
            setActiveSection("#" + id);
            break;
          }
        }

        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onMouseMove = useCallback(() => {
    mouseActive.current = true;
    if (!atTop) setVisible(true);
  }, [atTop]);

  const onMouseLeave = useCallback(() => {
    mouseActive.current = false;
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.nav
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ y: 40, opacity: 0, filter: "blur(12px)" }}
      animate={{
        y: visible ? 0 : 100,
        opacity: visible ? 1 : 0,
        filter: visible ? "blur(0px)" : "blur(12px)",
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-2 py-2 max-w-[920px] w-[calc(100%-2rem)]"
      style={{
        background: "rgba(10,10,10,0.55)",
        backdropFilter: "blur(28px) saturate(180%)",
        WebkitBackdropFilter: "blur(28px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "9999px",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
        height: "64px",
      }}
    >
      {/* Nav links */}
      <div className="flex items-center gap-0.5 flex-1 justify-center">
        {links.map((l, i) => {
          const isActive = activeSection === l.href;
          const isHovered = hoveredIdx === i;

          return (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleClick(e, l.href)}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300"
              style={{
                color: isActive ? "#FFFFFF" : isHovered ? "#FFFFFF" : "#A8A8A8",
                transform: isHovered ? "scale(1.05) translateY(-1px)" : "scale(1) translateY(0)",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {/* Active background */}
              {isActive && (
                <motion.div
                  layoutId="dock-active"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, rgba(192,192,192,0.25), rgba(242,242,242,0.15))",
                    border: "1px solid rgba(232,232,232,0.2)",
                    boxShadow: "0 0 20px rgba(232,232,232,0.08), inset 0 1px 0 rgba(255,255,255,0.1)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              {/* Hover glow */}
              {isHovered && !isActive && (
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    boxShadow: "0 0 16px rgba(232,232,232,0.06)",
                  }}
                />
              )}

              {/* Shine sweep on hover */}
              {isHovered && (
                <div
                  className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 48%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.06) 52%, transparent 60%)",
                      animation: "dock-shine 0.6s ease forwards",
                    }}
                  />
                </div>
              )}

              <span className="relative z-10">{l.label}</span>
            </a>
          );
        })}
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-white/[0.1] mx-1 shrink-0" />

      {/* CTA Button */}
      <a
        href="#contact"
        onClick={(e) => handleClick(e, "#contact")}
        onMouseEnter={() => setHoveredIdx(-1)}
        onMouseLeave={() => setHoveredIdx(null)}
        className="relative shrink-0 px-5 py-2 text-sm font-semibold rounded-full overflow-hidden transition-all duration-300"
        style={{
          background: "linear-gradient(135deg, #C0C0C0, #E8E8E8, #F2F2F2)",
          color: "#020202",
          boxShadow: "0 2px 12px rgba(232,232,232,0.15), inset 0 1px 0 rgba(255,255,255,0.4)",
          transform: hoveredIdx === -1 ? "scale(1.05) translateY(-1px)" : "scale(1) translateY(0)",
        }}
      >
        {/* Glossy reflection */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%)",
            borderRadius: "9999px",
          }}
        />
        {/* Shine sweep on hover */}
        {hoveredIdx === -1 && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.4) 48%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.4) 52%, transparent 65%)",
              animation: "dock-shine 0.6s ease forwards",
            }}
          />
        )}
        <span className="relative z-10">Let's Talk</span>
      </a>

      {/* Keyframes injected via style tag */}
      <style>{`
        @keyframes dock-shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </motion.nav>
  );
}
