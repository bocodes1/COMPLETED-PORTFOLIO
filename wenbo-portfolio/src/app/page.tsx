"use client";

import { IntensityProvider } from "@/lib/intensity-context";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { IntensityToggle } from "@/components/ui/intensity-toggle";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Work } from "@/components/sections/work";
import { About } from "@/components/sections/about";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <IntensityProvider>
      <SmoothScrollProvider>
        <CustomCursor />
        <IntensityToggle />
        <Navbar />
        <main>
          <Hero />
          <Services />
          <Work />
          <About />
          <Education />
          <Contact />
        </main>
        <Footer />
      </SmoothScrollProvider>
    </IntensityProvider>
  );
}
