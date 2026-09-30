import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-transparent">
      <Header />
      <Hero />
      <div className="relative z-10 bg-transparent">
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
