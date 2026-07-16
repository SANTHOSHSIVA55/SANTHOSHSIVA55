import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useState, useEffect } from "react";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About, Skills, Projects, Journey, GithubStats, Certifications, Now, Achievements } from "@/components/portfolio/Sections";
import { Contact, Footer, BackToTop } from "@/components/portfolio/Contact";
import { LoadingScreen } from "@/components/portfolio/LoadingScreen";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { SmoothScroll } from "@/components/portfolio/SmoothScroll";
import { AnimatedBackground, ScrollProgress, ScrollProgressScript } from "@/components/portfolio/AnimatedBackground";
import { useScrollProgress } from "@/components/portfolio/useScrollProgress";

const LazySolarSystem = lazy(() =>
  import("@/components/portfolio/solar/SolarSystem").then((m) => ({ default: m.SolarSystem }))
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Santhosh T S — Full Stack Developer & Data Analyst" },
      {
        name: "description",
        content:
          "Portfolio of Santhosh T S — Computer Science Engineering student, Full Stack Developer and Data Analyst in Chennai building scalable web applications and data-driven solutions.",
      },
      { property: "og:title", content: "Santhosh T S — Full Stack Developer & Data Analyst" },
      {
        property: "og:description",
        content: "Building scalable full-stack applications, data-driven solutions, and modern software products using React, Node.js, Python, SQL, and analytics tools.",
      },
      { property: "og:image", content: "https://cdn.corenexis.com/f/STjpKFS53V1.jpg" },
      { name: "twitter:image", content: "https://cdn.corenexis.com/f/STjpKFS53V1.jpg" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function useSupports3D() {
  const [supports, setSupports] = useState(false);
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    if (prefersReduced || isMobile) {
      setSupports(false);
      return;
    }
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      setSupports(!!gl);
    } catch {
      setSupports(false);
    }
  }, []);
  return supports;
}

function Index() {
  const scrollProgress = useScrollProgress();
  const use3D = useSupports3D();

  return (
    <SmoothScroll>
      <LoadingScreen />
      <CustomCursor />
      <a href="#about" className="skip-link">Skip to content</a>
      {use3D ? (
        <Suspense fallback={<AnimatedBackground />}>
          <LazySolarSystem scrollProgress={scrollProgress} />
        </Suspense>
      ) : (
        <AnimatedBackground />
      )}
      <div className="relative min-h-screen overflow-x-hidden">
        <ScrollProgress />
        <ScrollProgressScript />
        <Navbar />
        <main>
          <Hero />
          <div className="section-divider my-0" />
          <About />
          <div className="section-divider my-0" />
          <Skills />
          <div className="section-divider my-0" />
          <Projects />
          <div className="section-divider my-0" />
          <Journey />
          <div className="section-divider my-0" />
          <Certifications />
          <div className="section-divider my-0" />
          <Now />
          <div className="section-divider my-0" />
          <Achievements />
          <div className="section-divider my-0" />
          <GithubStats />
          <div className="section-divider my-0" />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </SmoothScroll>
  );
}
