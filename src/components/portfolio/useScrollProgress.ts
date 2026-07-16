import { useState, useEffect, useCallback } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  const update = useCallback(() => {
    const h = document.documentElement;
    const scrollTop = window.scrollY || h.scrollTop;
    const scrollHeight = h.scrollHeight - h.clientHeight;
    const p = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
    setProgress(Math.min(Math.max(p, 0), 1));
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  return progress;
}
