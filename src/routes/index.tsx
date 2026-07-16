import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About, Skills, Projects, Journey, GithubStats, Certifications, Achievements } from "@/components/portfolio/Sections";
import { Contact, Footer, BackToTop } from "@/components/portfolio/Contact";
import { LoadingScreen } from "@/components/portfolio/LoadingScreen";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { SmoothScroll } from "@/components/portfolio/SmoothScroll";
import { SolarSystem } from "@/components/portfolio/solar/SolarSystem";
import { ScrollProgress, ScrollProgressScript } from "@/components/portfolio/AnimatedBackground";
import { useScrollProgress } from "@/components/portfolio/useScrollProgress";

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

function Index() {
  const scrollProgress = useScrollProgress();

  return (
    <SmoothScroll>
      <LoadingScreen />
      <CustomCursor />
      <SolarSystem scrollProgress={scrollProgress} />
      <div className="relative min-h-screen overflow-x-hidden">
        <ScrollProgress />
        <ScrollProgressScript />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Journey />
          <Certifications />
          <Achievements />
          <GithubStats />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </SmoothScroll>
  );
}
