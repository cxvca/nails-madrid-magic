import { useEffect, useRef } from "react";
import gsap from "gsap";
import { img } from "@/lib/works";
import { prefersReducedMotion, registerGsap } from "@/lib/motion";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.fromTo(
        "[data-hero-image]",
        { scale: 1.14, opacity: 0, filter: "blur(18px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.8 },
      )
        .fromTo(
          "[data-hero-word]",
          { yPercent: 118, rotate: 2 },
          { yPercent: 0, rotate: 0, duration: 1.5, stagger: 0.12 },
          0.25,
        )
        .fromTo(
          "[data-hero-fade]",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.1 },
          0.9,
        );

      // Mouse parallax: independent drift per word + image counter-move.
      const words = gsap.utils.toArray<HTMLElement>("[data-hero-word]");
      const image = el.querySelector<HTMLElement>("[data-hero-image]");
      const onMove = (e: MouseEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        words.forEach((w, i) => {
          gsap.to(w, {
            x: nx * (18 + i * 14),
            y: ny * (10 + i * 6),
            duration: 1.2,
            ease: "expo.out",
          });
        });
        if (image) {
          gsap.to(image, { x: nx * -34, y: ny * -20, duration: 1.6, ease: "expo.out" });
        }
      };
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
      }
      return undefined;
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="top"
      className="grain relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-10 pt-28 md:pb-16"
    >
      {/* Campaign image sits inside the type, not in a card. */}
      <div className="pointer-events-none absolute inset-0">
        <img
          data-hero-image
          src={img.setBlack}
          alt="Set de uñas stiletto extralargas en negro y plata con marmoleado pintado a mano"
          width={569}
          height={683}
          className="absolute right-[-8%] top-[6%] h-[62vh] w-auto max-w-none object-cover object-center md:right-[8%] md:top-[8%] md:h-[86vh]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/25" />
      </div>

      <div className="relative mx-auto w-full max-w-[1600px] px-5 md:px-10">
        <p data-hero-fade className="label mb-8 text-muted-foreground">
          Nail art a medida • Madrid
        </p>

        <h1 className="display text-[var(--text-step-5)]">
          <span className="block overflow-hidden pb-[0.04em]">
            <span data-hero-word className="block">
              Uñas
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.04em] md:-mt-[0.1em] md:pl-[14%]">
            <span data-hero-word className="block">
              como
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.04em] md:-mt-[0.08em] md:pl-[4%]">
            <span data-hero-word className="block italic">
              arte.
            </span>
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#reserva"
              data-hero-fade
              className="label bg-foreground px-6 py-4 text-background transition-opacity duration-300 hover:opacity-85"
            >
              Reservar cita
            </a>
            <a
              href="#trabajos"
              data-hero-fade
              className="label border border-foreground/35 px-6 py-4 transition-colors duration-300 hover:bg-foreground/10"
            >
              Ver el trabajo
            </a>
          </div>

          <p data-hero-fade className="max-w-xs text-muted-foreground">
            Sets esculpidos, pintados a mano y llevados al extremo. Diseñados para una sola persona.
          </p>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="relative mx-auto mt-12 w-full max-w-[1600px] px-5 md:px-10"
      >
        <div className="h-16 w-px overflow-hidden bg-border">
          <div className="h-full w-full origin-top animate-[scrollcue_2.4s_var(--ease-out-expo)_infinite] bg-foreground/70" />
        </div>
      </div>

      <style>{`@keyframes scrollcue{0%{transform:scaleY(0);transform-origin:top}45%{transform:scaleY(1);transform-origin:top}55%{transform:scaleY(1);transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}`}</style>
    </section>
  );
}
