import { useEffect, useRef } from "react";

export function AnimatedBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #020617 0%, #050816 30%, #071426 60%, #0B132B 100%)",
        }}
      />

      {/* Aurora blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-[-10%] left-[-5%] w-[60vw] h-[60vh] rounded-full bg-[#00E5FF]/[0.07] blur-[120px] animate-aurora" />
        <div className="absolute top-[10%] right-[-10%] w-[50vw] h-[50vh] rounded-full bg-[#8B5CF6]/[0.06] blur-[100px] animate-aurora-delayed" />
        <div className="absolute bottom-[-5%] left-[20%] w-[45vw] h-[40vh] rounded-full bg-[#3B82F6]/[0.05] blur-[110px] animate-aurora-slow" />
      </div>

      {/* Radial light beams */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.06)_0%,transparent_70%)] animate-slow-pulse" />
        </div>
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
        }}
      />

      {/* Floating particles */}
      <FloatingParticles />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020617] to-transparent" />
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
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      hue: number;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.15;
        this.vy = (Math.random() - 0.5) * 0.15 - 0.05;
        this.size = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.hue = Math.random() > 0.5 ? 187 : 270; // cyan or violet
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) {
          this.y = canvas.height;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        if (this.hue === 187) {
          ctx!.fillStyle = `rgba(0, 229, 255, ${this.opacity})`;
        } else {
          ctx!.fillStyle = `rgba(139, 92, 246, ${this.opacity})`;
        }
        ctx!.fill();
      }
    }

    const count = Math.min(Math.floor(window.innerWidth / 20), 60);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
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
          background: "linear-gradient(90deg, #00E5FF, #8B5CF6, #00E5FF)",
          transition: "transform 0.1s linear",
        }}
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
