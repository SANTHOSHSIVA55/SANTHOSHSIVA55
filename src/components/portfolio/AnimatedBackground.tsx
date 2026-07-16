import { useEffect, useRef, useState } from "react";

export function AnimatedBackground() {
  const [mousePos, setMousePos] = useState({ x: -400, y: -400 });

  useEffect(() => {
    let raf: number;
    let targetX = -400;
    let targetY = -400;
    let currentX = -400;
    let currentY = -400;

    const handleMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setMousePos({ x: currentX, y: currentY });
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #020202 0%, #050508 30%, #0a0a12 60%, #020202 100%)",
        }}
      />

      {/* Mouse-following light effect */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.04) 0%, rgba(59, 130, 246, 0.01) 40%, transparent 70%)",
          transition: "left 0.1s ease-out, top 0.1s ease-out",
        }}
      />

      {/* Aurora blobs with blue accent */}
      <div className="absolute inset-0">
        <div className="absolute top-[-10%] left-[-5%] w-[60vw] h-[60vh] rounded-full bg-[#3B82F6]/[0.03] blur-[140px] animate-aurora" />
        <div className="absolute top-[10%] right-[-10%] w-[50vw] h-[50vh] rounded-full bg-[#6366F1]/[0.02] blur-[120px] animate-aurora-delayed" />
        <div className="absolute bottom-[-5%] left-[20%] w-[45vw] h-[40vh] rounded-full bg-[#8B5CF6]/[0.015] blur-[130px] animate-aurora-slow" />
      </div>

      {/* Radial light beams */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.02)_0%,transparent_70%)] animate-slow-pulse" />
        </div>
      </div>

      {/* Animated grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(59,130,246,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,130,246,0.12) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 10%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 10%, transparent 70%)",
        }}
      />

      {/* Subtle dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse at center, black 5%, transparent 60%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 5%, transparent 60%)",
        }}
      />

      {/* Floating particles */}
      <FloatingParticles />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#020202] to-transparent" />
    </div>
  );
}

function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let particles: Particle[] = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx!.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    class Particle {
      x!: number;
      y!: number;
      vx!: number;
      vy!: number;
      size!: number;
      opacity!: number;
      type!: number;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.12;
        this.vy = (Math.random() - 0.5) * 0.12 - 0.04;
        this.size = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.25 + 0.05;
        this.type = Math.floor(Math.random() * 3);
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) {
          this.y = canvas!.height;
          this.x = Math.random() * canvas!.width;
        }
      }

      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        if (this.type === 0) {
          ctx!.fillStyle = `rgba(232, 232, 232, ${this.opacity})`;
        } else if (this.type === 1) {
          ctx!.fillStyle = `rgba(59, 130, 246, ${this.opacity * 0.8})`;
        } else {
          ctx!.fillStyle = `rgba(99, 102, 241, ${this.opacity * 0.6})`;
        }
        ctx!.fill();
      }
    }

    const count = Math.min(Math.floor(window.innerWidth / 22), 55);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      if (document.hidden) {
        animFrame = requestAnimationFrame(animate);
        return;
      }
      ctx!.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
      for (const p of particles) {
        p.update();
        p.draw();
      }
      animFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
}

export function ScrollProgress() {
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent">
      <div
        id="scroll-progress-bar"
        className="h-full origin-left scale-x-0"
        style={{
          background: "linear-gradient(90deg, #3B82F6, #6366F1, #3B82F6)",
          transition: "transform 0.1s linear",
        }}
      />
    </div>
  );
}

export function ScrollProgressScript() {
  return (
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
  );
}
