export function AnimatedBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-aurora)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(1 0 0 / 0.06) 1px, transparent 1px), linear-gradient(to bottom, oklch(1 0 0 / 0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />
      <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[var(--primary)]/10 blur-[140px]" />
    </div>
  );
}

export function ScrollProgress() {
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent">
      <div
        id="scroll-progress-bar"
        className="h-full origin-left scale-x-0 bg-gradient-to-r from-[var(--primary)] via-[var(--accent-glow)] to-[var(--primary-glow)] transition-transform duration-75"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `(() => {
            const bar = document.getElementById('scroll-progress-bar');
            if (!bar) return;
            const upd = () => {
              const h = document.documentElement;
              const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
              bar.style.transform = 'scaleX(' + p + ')';
            };
            upd();
            window.addEventListener('scroll', upd, { passive: true });
            window.addEventListener('resize', upd);
          })();`,
        }}
      />
    </div>
  );
}