import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { AnimatedBackground, ScrollProgress } from "@/components/portfolio/AnimatedBackground";
import { Hero } from "@/components/portfolio/Hero";
import { About, Skills, Projects, Journey } from "@/components/portfolio/Sections";
import { Contact, Footer, BackToTop } from "@/components/portfolio/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Santhosh T S — Full Stack Developer & Data Analyst & Software Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Santhosh T S — Computer Science Engineering student in Chennai building scalable full-stack and AI-powered software.",
      },
      { property: "og:title", content: "Santhosh T S — Full Stack Developer & Data Analyst" },
      {
        property: "og:description",
        content: "Building scalable software solutions through code, design and innovation.",
      },
      { property: "og:image", content: "https://cdn.corenexis.com/f/STjpKFS53V1.jpg" },
      { name: "twitter:image", content: "https://cdn.corenexis.com/f/STjpKFS53V1.jpg" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatedBackground />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
