import { CrtOverlay } from "@/components/ui/crt-overlay";
import { TopBar } from "@/components/sections/top-bar";
import { Hero } from "@/components/sections/hero";
import { LiveSystem } from "@/components/sections/live-system";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Education } from "@/components/sections/education";
import { Contact, Footer } from "@/components/sections/contact";
import { GengarConsole } from "@/components/sections/gengar-console";

export default function Home() {
  return (
    <>
      <CrtOverlay />
      <TopBar />
      <main>
        <Hero />
        <LiveSystem />
        <Projects />
        <Experience />
        <About />
        <Skills />
        <Education />
        <Contact />
        <GengarConsole />
      </main>
      <Footer />
    </>
  );
}
