import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { Cursor } from "@/components/site/Cursor";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Statement } from "@/components/site/Statement";
import { Gallery } from "@/components/site/Gallery";
import { Detail } from "@/components/site/Detail";
import { Services } from "@/components/site/Services";
import { CustomSet } from "@/components/site/CustomSet";
import { About } from "@/components/site/About";
import { Social } from "@/components/site/Social";
import { Booking } from "@/components/site/Booking";
import { Faq } from "@/components/site/Faq";
import { Footer } from "@/components/site/Footer";

const title = "nails.liis — Nail art a medida en Madrid";
const description =
  "Uñas como arte: sets esculpidos, pintados a mano y largos extremos, diseñados a medida en Madrid. Cita previa con nails.liis.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_ES" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Statement />
        <Gallery />
        <Detail />
        <Services />
        <CustomSet />
        <About />
        <Social />
        <Booking />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
