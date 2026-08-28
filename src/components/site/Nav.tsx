import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

const links = [
  { href: "#trabajos", label: "Trabajos" },
  { href: "#servicios", label: "Servicios" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const el = menuRef.current;
    if (!el || !open || prefersReducedMotion()) return;
    const items = el.querySelectorAll("[data-menu-item]");
    const tl = gsap.timeline();
    tl.fromTo(
      el,
      { clipPath: "inset(0% 0% 100% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "expo.out" },
    ).fromTo(
      items,
      { yPercent: 120, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.07, ease: "expo.out" },
      0.15,
    );
    return () => {
      tl.kill();
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
          scrolled && !open
            ? "border-b border-border bg-background/70 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-5 py-4 md:px-10">
          <a href="#top" className="font-display text-[1.35rem] tracking-[-0.01em] lowercase">
            nails.liis
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="label text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#reserva"
              className="label border border-foreground/40 px-4 py-2.5 transition-colors duration-300 hover:bg-foreground hover:text-background"
            >
              Reservar
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="label relative z-50 md:hidden"
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? "Cerrar" : "Menú"}
          </button>
        </div>
      </header>

      {open && (
        <div
          ref={menuRef}
          className="grain fixed inset-0 z-40 flex flex-col justify-between bg-background px-5 pb-10 pt-24 md:hidden"
        >
          <nav className="flex flex-col gap-1">
            {[...links, { href: "#reserva", label: "Reservar" }].map((l) => (
              <span key={l.href} className="overflow-hidden py-1">
                <a
                  data-menu-item
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="display block text-[15vw] leading-[0.9] text-foreground"
                >
                  {l.label}
                </a>
              </span>
            ))}
          </nav>
          <p data-menu-item className="label text-muted-foreground">
            Nail art a medida • Madrid
          </p>
        </div>
      )}
    </>
  );
}
