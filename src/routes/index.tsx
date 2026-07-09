import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { AnimatedBackground, ScrollProgress } from "@/components/portfolio/AnimatedBackground";
import { Hero } from "@/components/portfolio/Hero";
import { About, Skills, Projects, Journey, GithubStats, Certifications, Achievements } from "@/components/portfolio/Sections";
import { Contact, Footer, BackToTop } from "@/components/portfolio/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Santhosh T S — Software Engineer & Full Stack Developer" },
        {
          name: "description",
          content:
            "Portfolio of Santhosh T S — Computer Science Engineering student and Software Engineer in Chennai building scalable applications and intelligent systems.",
        },
        { property: "og:title", content: "Santhosh T S — Software Engineer & Full Stack Developer" },
        {
          property: "og:description",
          content: "Crafting scalable software, robust backend systems, and intelligent applications that drive real-world impact.",
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
        <Certifications />
        <Achievements />
        <GithubStats />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
