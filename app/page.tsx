import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Bio } from "@/components/Bio";
import { Universe } from "@/components/Universe";
import { Videos } from "@/components/Videos";
import { YoutubeProject } from "@/components/YoutubeProject";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Glitter } from "@/components/Glitter";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <main id="main-content">
        <Stats />
        <Bio />
        <Universe />
        <Videos />
        <YoutubeProject />
        <Contact />
      </main>
      <Footer />
      <Glitter />
      <RevealOnScroll />
    </>
  );
}
