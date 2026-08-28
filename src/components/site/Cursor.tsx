import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

/** Small ring cursor, desktop pointer devices only. */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "expo.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "expo.out" });

    const onMove = (e: MouseEvent) => {
      x(e.clientX);
      y(e.clientY);
      const target = e.target as HTMLElement | null;
      const hot = target?.closest("a, button, [data-cursor-grow]");
      gsap.to(el, {
        scale: hot ? 2.6 : 1,
        opacity: hot ? 0.45 : 1,
        duration: 0.4,
        ease: "expo.out",
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] -ml-[7px] -mt-[7px] h-3.5 w-3.5 rounded-full border border-foreground/70 mix-blend-difference"
    />
  );
}
