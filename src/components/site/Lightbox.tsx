import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { Work } from "@/lib/works";
import { prefersReducedMotion } from "@/lib/motion";

export function Lightbox({
  work,
  onClose,
  onPrev,
  onNext,
}: {
  work: Work;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.5 })
      .fromTo(
        el.querySelector("[data-lb-image]"),
        { clipPath: "inset(12% 12% 12% 12%)", scale: 1.08 },
        { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.1 },
        0.05,
      )
      .fromTo(
        el.querySelectorAll("[data-lb-fade]"),
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.06 },
        0.2,
      );
    return () => {
      tl.kill();
    };
  }, [work.id]);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={work.name}
      className="grain fixed inset-0 z-[90] flex flex-col bg-background/97 backdrop-blur-md"
    >
      <div className="flex items-center justify-between px-5 py-4 md:px-10">
        <p data-lb-fade className="label text-muted-foreground">
          {work.category}
        </p>
        <button type="button" onClick={onClose} className="label hover:text-muted-foreground">
          Cerrar
        </button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-8 px-5 pb-8 md:flex-row md:items-end md:gap-14 md:px-10 md:pb-12">
        <div data-lb-image className="mask-reveal min-h-0 flex-1">
          <img
            src={work.src}
            alt={work.alt}
            className="h-full max-h-[58svh] w-full object-contain object-left md:max-h-[74svh]"
          />
        </div>

        <div className="md:w-[26rem] md:shrink-0">
          <h3 data-lb-fade className="display text-[var(--text-step-3)]">
            {work.name}
          </h3>
          <p data-lb-fade className="mt-4 text-muted-foreground">
            {work.description}
          </p>
          <dl data-lb-fade className="mt-8 grid grid-cols-2 gap-y-4 border-t border-border pt-6">
            <dt className="label text-muted-foreground">Forma</dt>
            <dd className="text-right">{work.shape}</dd>
            <dt className="label text-muted-foreground">Duración</dt>
            <dd className="text-right">{work.duration}</dd>
            <dt className="label text-muted-foreground">Precio</dt>
            <dd className="text-right">A consultar</dd>
          </dl>
          <div data-lb-fade className="mt-8 flex items-center gap-6">
            <button type="button" onClick={onPrev} className="label hover:text-muted-foreground">
              ← Anterior
            </button>
            <button type="button" onClick={onNext} className="label hover:text-muted-foreground">
              Siguiente →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
