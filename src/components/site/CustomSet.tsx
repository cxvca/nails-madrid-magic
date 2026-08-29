import { useEffect, useRef } from "react";
import gsap from "gsap";
import { img } from "@/lib/works";
import { prefersReducedMotion, registerGsap } from "@/lib/motion";

const steps = [
  {
    step: "01",
    title: "Inspiración",
    body: "Mándame referencias, colores, una textura o una idea completamente loca.",
    src: img.moodboard,
    alt: "Referencias, muestras de color y cristales sobre una superficie oscura",
    w: 1440,
    h: 1088,
  },
  {
    step: "02",
    title: "Diseño",
    body: "Decidimos forma, largo y composición. Cada uña se planifica antes de empezar.",
    src: img.studio,
    alt: "Manos de la artista pintando con pincel fino una extensión de uña",
    w: 1440,
    h: 1088,
  },
  {
    step: "03",
    title: "Resultado",
    body: "Un set que no existe en ningún otro sitio y que aguanta semanas intacto.",
    src: img.handpainted,
    alt: "Set de uñas extralargas con miniaturas pintadas a mano en rojo y oro",
    w: 1088,
    h: 1440,
  },
];

export function CustomSet() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const section = root.current;
    const el = track.current;
    if (!section || !el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      // Horizontal sequence driven by vertical scroll — desktop and tablet only.
      mm.add("(min-width: 768px)", () => {
        const distance = () => el.scrollWidth - window.innerWidth;
        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance() + window.innerHeight * 0.6}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        return () => tween.kill();
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="grain relative overflow-hidden border-t border-border py-24 md:h-[100svh] md:py-0"
    >
      <div className="md:flex md:h-full md:items-center">
        <div ref={track} className="md:flex md:items-center md:gap-[6vw] md:pl-[max(1.25rem,5vw)]">
          <div className="md:w-[42vw] md:shrink-0">
            <div className="mx-auto max-w-[1600px] px-5 md:px-0">
              <h2 className="display text-step-4">
                <span className="block">Tu idea.</span>
                <span className="block italic md:pl-[16%]">Su lienzo.</span>
              </h2>
              <p className="mt-8 max-w-md text-muted-foreground">
                ¿Tienes algo concreto en la cabeza? Manda tu inspiración, colores, referencias o una
                idea completamente salvaje. Se diseña desde cero.
              </p>
              <a
                href="#reserva"
                className="label mt-10 inline-block border border-foreground/35 px-6 py-4 transition-colors duration-300 hover:bg-foreground hover:text-background"
              >
                Pedir un set a medida
              </a>
            </div>
          </div>

          <ol className="mt-16 flex flex-col gap-12 px-5 md:mt-0 md:flex-row md:items-end md:gap-[5vw] md:px-0">
            {steps.map((s) => (
              <li key={s.step} className="md:w-[30vw] md:shrink-0">
                <div className="overflow-hidden">
                  <img
                    src={s.src}
                    alt={s.alt}
                    loading="lazy"
                    width={s.w}
                    height={s.h}
                    className="aspect-[4/5] w-full object-cover md:aspect-[3/4]"
                  />
                </div>
                <div className="mt-5 flex items-baseline gap-4">
                  <span className="label text-muted-foreground">{s.step}</span>
                  <div>
                    <h3 className="display text-step-2">{s.title}</h3>
                    <p className="mt-2 max-w-xs text-muted-foreground">{s.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
