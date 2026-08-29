import { useEffect, useRef } from "react";
import gsap from "gsap";
import { img } from "@/lib/works";
import { prefersReducedMotion, registerGsap } from "@/lib/motion";

const callouts = [
  {
    title: "Esculpido",
    body: "Relieve y volumen construidos a mano sobre la uña, capa por capa.",
  },
  {
    title: "Pintado a mano",
    body: "Dibujo con pincel fino, distinto en cada uña y en cada set.",
  },
  {
    title: "A medida",
    body: "Forma, largo y diseño decididos contigo antes de tocar el gel.",
  },
  {
    title: "Statement",
    body: "Largos extremos, chrome, cristales y charms. Trabajo experimental.",
  },
];

export function Detail() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: the macro image pins while the callouts scroll past it.
      mm.add("(min-width: 768px)", () => {
        const st = gsap.to("[data-detail-media]", {
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom bottom",
            pin: "[data-detail-media]",
            pinSpacing: false,
          },
        });
        return () => st.kill();
      });

      gsap.utils.toArray<HTMLElement>("[data-callout]").forEach((item) => {
        gsap.fromTo(
          item,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: { trigger: item, start: "top 85%", once: true },
          },
        );
      });

      gsap.fromTo(
        "[data-detail-img]",
        { yPercent: -6, scale: 1.06 },
        {
          yPercent: 6,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="border-t border-border">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-5 py-24 md:grid-cols-2 md:gap-16 md:px-10 md:py-32">
        <div data-detail-media className="h-[60svh] overflow-hidden md:h-[100svh] md:py-16">
          <img
            data-detail-img
            src={img.sculpted}
            alt="Macro de flores blancas esculpidas a mano, perlas y cristales sobre una uña"
            loading="lazy"
            width={1440}
            height={1088}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="md:pt-24">
          <h2 className="display text-[var(--text-step-4)]">
            <span className="block">El</span>
            <span className="block md:pl-[18%]">detalle</span>
            <span className="block italic md:pl-[6%]">importa.</span>
          </h2>

          <ul className="mt-16 md:mt-28">
            {callouts.map((c, i) => (
              <li
                key={c.title}
                data-callout
                className="grid grid-cols-[3rem_1fr] gap-4 border-t border-border py-7 last:border-b"
              >
                <span className="label pt-1 text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="display text-[var(--text-step-2)]">{c.title}</h3>
                  <p className="mt-2 max-w-sm text-muted-foreground">{c.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
