import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { works, type Work } from "@/lib/works";
import { prefersReducedMotion, registerGsap } from "@/lib/motion";
import { Lightbox } from "./Lightbox";
import { SplitHeading } from "./Reveal";

/** Editorial asymmetry: each piece gets its own placement, never a uniform grid. */
const placement: Record<string, string> = {
  "humo-negro": "col-span-12 md:col-span-6 md:col-start-1 aspect-[3/4] md:aspect-[4/5]",
  "flor-de-yeso": "col-span-6 md:col-span-3 md:col-start-8 md:mt-[14vh] aspect-[3/4]",
  "jardin-templado": "col-span-6 md:col-span-4 md:col-start-11 md:-mt-[6vh] aspect-[3/4]",
  "mariposa-turquesa": "col-span-12 md:col-span-5 md:col-start-2 md:mt-[6vh] aspect-[3/4]",
  espejo: "col-span-6 md:col-span-3 md:col-start-8 md:-mt-[10vh] aspect-[3/4]",
  retablo: "col-span-12 md:col-span-8 md:col-start-4 md:mt-[8vh] aspect-[4/5] md:aspect-[16/11]",
  perla: "col-span-12 md:col-span-6 md:col-start-1 aspect-[4/3]",
  obsidiana: "col-span-6 md:col-span-4 md:col-start-8 md:mt-[12vh] aspect-[3/4]",
  aurora: "col-span-6 md:col-span-3 md:col-start-2 md:-mt-[4vh] aspect-[3/4]",
  "leche-y-oro": "col-span-12 md:col-span-6 md:col-start-6 md:mt-[4vh] aspect-[4/3]",
};

function GalleryItem({ work, onOpen }: { work: Work; onOpen: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const image = el.querySelector("img");

    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      defaults: { ease: "expo.out" },
    });
    tl.fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3 });
    if (image) {
      tl.fromTo(image, { scale: 1.22, filter: "blur(12px)" }, { scale: 1, filter: "blur(0px)", duration: 1.6 }, 0);
      // Slow drift while the piece travels through the viewport.
      gsap.fromTo(
        image,
        { yPercent: -4 },
        {
          yPercent: 4,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    }
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === el)
        .forEach((t) => t.kill());
    };
  }, []);

  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      data-cursor-grow
      className={`group relative block overflow-hidden text-left ${placement[work.id] ?? "col-span-6 aspect-[3/4]"}`}
    >
      <img
        src={work.src}
        alt={work.alt}
        loading="lazy"
        className="h-full w-full scale-100 object-cover brightness-[0.92] transition-[transform,filter] duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.045] group-hover:brightness-105 group-hover:contrast-[1.06]"
      />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-background/85 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:p-6">
        <span>
          <span className="display block text-step-2">{work.name}</span>
          <span className="label mt-1 block text-muted-foreground">{work.category}</span>
        </span>
        <span className="label shrink-0">Ver set →</span>
      </span>
    </button>
  );
}

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const current = index === null ? undefined : works[index];

  return (
    <section id="trabajos" className="grain border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SplitHeading text="Trabajos" className="display text-step-4" />
          <p className="label max-w-[16rem] text-muted-foreground">
            Sets reales · escultural, pintado a mano, chrome, extensiones
          </p>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-3 md:mt-24 md:gap-x-5 md:gap-y-[10vh]">
          {works.map((w, i) => (
            <GalleryItem key={w.id} work={w} onOpen={() => setIndex(i)} />
          ))}
        </div>
      </div>

      {current && (
        <Lightbox
          work={current}
          onClose={() => setIndex(null)}
          onPrev={() => setIndex((i) => ((i ?? 0) - 1 + works.length) % works.length)}
          onNext={() => setIndex((i) => ((i ?? 0) + 1) % works.length)}
        />
      )}
    </section>
  );
}
