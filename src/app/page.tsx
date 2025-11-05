import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import Skills from "@/components/sections/skill";
import Ab from "@/components/sections/ab";

import SertifikatPage from "@/components/sections/sertifikat";

export default function HomePage() {
  return (
    <main>
      {/* Section Home */}
      <section id="about">
        <About />
      </section>

      {/* Section About */}
      <section id="ab" className="">
        <Ab />
      </section>

      {/* Section Skill */}
      <section id="skill">
        <Skills />
      </section>

      <section id="sertifikat">
        <SertifikatPage />
      </section>

      {/* Section Projects */}
      <section id="proyek" className="py-20">
        <Projects />
      </section>
    </main>
  );
}
