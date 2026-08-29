import { useEffect, useRef } from "react";
import gsap from "gsap";
import { img } from "@/lib/works";
import { prefersReducedMotion, registerGsap } from "@/lib/motion";
import { SplitHeading } from "./Reveal";

/**
 * Booking placeholder. The CTA is intentionally a single link/button so it can
 * be swapped for an external system (Fresha, Calendly) or an inline form later
 * by changing BOOKING_URL / the element below — nothing else depends on it.
 */
const BOOKING_URL = "https://www.instagram.com/nails.liis/";

function MagneticCta() {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "expo.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "expo.out" });

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - (r.left + r.width / 2)) * 0.28);
      y((e.clientY - (r.top + r.height / 2)) * 0.34);
    };
    const onLeave = () => {
      x(0);
      y(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <a
      ref={ref}
      href={BOOKING_URL}
      target="_blank"
      rel="noreferrer noopener"
      className="label inline-block bg-foreground px-10 py-6 text-background transition-opacity duration-300 hover:opacity-85"
    >
      Solicitar cita
    </a>
  );
}

export function Booking() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const tween = gsap.fromTo(
      el.querySelector("[data-booking-img]"),
      { yPercent: -8, scale: 1.08 },
      {
        yPercent: 8,
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={root}
      id="reserva"
      className="grain relative flex min-h-[92svh] items-end overflow-hidden border-t border-border py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <img
          data-booking-img
          src={img.setBlack}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover object-[70%_center] opacity-45 md:opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
      </div>

      <div className="relative mx-auto w-full max-w-[1600px] px-5 md:px-10">
        <p className="label mb-8 text-muted-foreground">Cita previa • Madrid</p>
        <SplitHeading
          text="¿Lista para tu próximo set?"
          as="h2"
          className="display max-w-[16ch] text-[var(--text-step-5)]"
        />

        <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-muted-foreground">
            Cuéntame el servicio, la fecha que te va bien, el largo y la forma que quieres, y manda
            tus referencias. Se responde a cada solicitud personalmente.
          </p>
          <MagneticCta />
        </div>
      </div>
    </section>
  );
}
