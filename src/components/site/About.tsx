import { img } from "@/lib/works";
import { MaskedImage, Reveal, SplitHeading } from "./Reveal";

export function About() {
  return (
    <section id="sobre-mi" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto grid max-w-[1600px] items-start gap-12 px-5 md:grid-cols-12 md:gap-16 md:px-10">
        <MaskedImage
          src={img.studio}
          alt="Liis trabajando con pincel fino sobre una extensión de uña en su estudio de Madrid"
          width={1440}
          height={1088}
          className="md:col-span-5 md:col-start-1"
          imgClassName="aspect-[4/5] w-full object-cover"
        />

        <Reveal className="md:col-span-6 md:col-start-7 md:pt-10">
          <p data-reveal className="label mb-8 text-muted-foreground">
            Sobre mí • Madrid
          </p>
          <SplitHeading text="Liis" className="display text-[var(--text-step-4)]" />
          <div className="mt-8 space-y-5 text-muted-foreground">
            <p data-reveal>
              Trabajo en Madrid y llevo años haciendo una cosa muy concreta: uñas que no se parecen a
              las de nadie. Nada de catálogos cerrados ni diseños repetidos. Si algo no se puede
              hacer con vinilos, mejor: se pinta, se esculpe o se monta a mano.
            </p>
            <p data-reveal>
              Me interesan los largos extremos, el relieve, el chrome y todo lo que obligue a
              inventar una técnica nueva. También la parte invisible: preparación, estructura y
              acabado, porque de eso depende que un set siga intacto semanas después.
            </p>
            <p data-reveal>
              Trabajo con cita previa y con pocas clientas al día, porque un set así no se hace con
              prisa.
            </p>
          </div>
          <a
            data-reveal
            href="#reserva"
            className="label mt-10 inline-block border-b border-foreground/40 pb-1 transition-colors duration-300 hover:border-foreground"
          >
            Reservar una cita →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
