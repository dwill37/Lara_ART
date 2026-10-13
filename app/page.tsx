import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { WhyArtLara } from "@/components/WhyArtLara";
import { Styles } from "@/components/Styles";
import { Gallery } from "@/components/Gallery";
import { Artist } from "@/components/Artist";
import { Reviews } from "@/components/Reviews";
import { Process } from "@/components/Process";
import { Location } from "@/components/Location";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="contenido">
        <Hero />
        <WhyArtLara />
        <Styles />
        <Gallery />
        <Artist />
        <Reviews />
        <Process />
        <Location />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
