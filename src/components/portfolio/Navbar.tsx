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
  const [open, setOpen] = useState(false);
  const lastScrollY = useRef(0);

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
        } else if (delta > 8) {
          setVisible(false);
          setAtTop(false);
        } else if (delta < -8) {
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

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 sm:px-4 pt-3 sm:pt-4"
    >
      <nav
        className={`flex w-full max-w-4xl items-center justify-between rounded-2xl px-3 sm:px-5 py-2 sm:py-2.5 transition-all duration-500 border border-white/[0.12] ${
          !atTop
            ? "shadow-elevated py-1.5 sm:py-2"
            : ""
        }`}
        style={{
          background: "rgba(5, 5, 5, 0.85)",
          backdropFilter: "blur(24px) saturate(160%)",
          WebkitBackdropFilter: "blur(24px) saturate(160%)",
        }}
      >
        {/* Logo */}
        <a
          href="#top"
          onClick={(e) => handleClick(e, "#top")}
          className="flex items-center gap-2 font-display font-bold tracking-tight shrink-0 group"
        >
          <div className="relative">
            <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#E8E8E8] to-[#A8A8A8] transition-shadow group-hover:shadow-[0_0_15px_rgba(232,232,232,0.3)]" />
            <div className="absolute inset-0 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#E8E8E8] to-[#A8A8A8] blur-md opacity-40" />
          </div>
          <span className="text-sm sm:text-base text-[#F8FAFC]">
            santhosh
            <span className="text-[#94A3B8] font-medium">.dev</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-0.5 md:flex">
          {links.map((l) => {
            const isActive = activeSection === l.href;
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => handleClick(e, l.href)}
                  className={`relative rounded-xl px-3 py-1.5 text-sm transition-all duration-300 ${
                    isActive
                      ? "text-[#E8E8E8]"
                      : "text-[#A8A8A8] hover:text-[#FFFFFF] hover:bg-white/[0.04]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 rounded-xl bg-white/[0.06] border border-white/[0.08]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{l.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="#contact"
            onClick={(e) => handleClick(e, "#contact")}
            className="group relative rounded-xl bg-gradient-to-r from-[#E8E8E8] to-[#C0C0C0] px-4 py-2 text-sm font-semibold text-[#020202] transition-all duration-300 hover:shadow-[0_0_25px_rgba(232,232,232,0.15)] hover:scale-[1.03] overflow-hidden"
          >
            <span className="relative z-10">Let&apos;s talk</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#C0C0C0] to-[#E8E8E8] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden flex items-center justify-center size-10 rounded-xl text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.04] transition-colors"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="16" y2="16" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="absolute left-3 right-3 top-[64px] cosmic-panel-strong rounded-2xl p-3 md:hidden shadow-elevated"
            >
              <ul className="flex flex-col gap-0.5">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={(e) => handleClick(e, l.href)}
                      className="flex items-center rounded-xl px-4 py-3 text-sm text-[#94A3B8] hover:bg-white/[0.04] hover:text-[#F8FAFC] transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-2 border-t border-white/[0.06] pt-2">
                <a
                  href="#contact"
                  onClick={(e) => handleClick(e, "#contact")}
                  className="flex items-center justify-center rounded-xl bg-gradient-to-r from-[#E8E8E8] to-[#C0C0C0] px-4 py-3 text-sm font-semibold text-[#020202]"
                >
                  Let&apos;s talk
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
