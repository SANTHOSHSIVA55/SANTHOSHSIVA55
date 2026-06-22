import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 sm:px-4 pt-3 sm:pt-4"
    >
      <nav
        className={`flex w-full max-w-5xl items-center justify-between rounded-full px-3 sm:px-5 py-2 sm:py-2.5 transition-all ${
          scrolled ? "glass-strong shadow-elevated" : "glass"
        }`}
      >
        <a href="#top" className="flex items-center gap-2 font-display font-semibold tracking-tight shrink-0">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-glow)] shadow-glow" />
          <span className="text-sm sm:text-base">santhosh<span className="text-muted-foreground">.dev</span></span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="hidden rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-glow)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] shadow-glow transition-transform hover:scale-105 md:inline-flex"
        >
          Let's talk
        </a>
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden flex items-center justify-center size-10 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute left-3 right-3 top-[60px] sm:left-4 sm:right-4 sm:top-20 glass-strong rounded-2xl p-2 sm:p-4 md:hidden shadow-elevated"
          >
            <ul className="flex flex-col gap-0.5">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center rounded-xl px-4 py-3 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-2 border-t border-white/5 pt-2">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--primary-glow)] px-4 py-3 text-sm font-medium text-[var(--primary-foreground)]"
              >
                Let's talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}