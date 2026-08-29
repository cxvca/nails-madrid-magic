import { useRef, useState } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { SplitHeading } from "./Reveal";

const faqs = [
  {
    q: "¿Cuánto dura una cita?",
    a: "Entre 2 y 6 horas según el diseño. Un BIAB con color liso son unas 2 h; un set esculpido o pintado a mano puede llegar a 5 o 6 h. Reserva la mañana o la tarde completa si el diseño es complejo.",
  },
  {
    q: "¿Cuánto aguanta el set?",
    a: "Con un buen mantenimiento y sin golpes, hasta 2 meses con el set intacto. Lo habitual es venir a relleno o cambio cada 3-4 semanas, sobre todo con largos extremos.",
  },
  {
    q: "¿Puedo pedir un diseño a medida?",
    a: "Es lo normal aquí. Manda referencias, colores o una idea suelta y se diseña desde cero para ti. Cuanto antes lleguen las referencias, mejor se planifica la sesión.",
  },
  {
    q: "¿Tengo que llevar fotos de inspiración?",
    a: "No es obligatorio, pero ayuda mucho. Sirve cualquier cosa: capturas, una paleta de colores, un tejido, una joya. Si no tienes nada claro, se decide juntas en la cita.",
  },
  {
    q: "¿Se pueden hacer largos extremos?",
    a: "Sí, y es una de mis especialidades. Se construye la estructura para que aguante el largo y se ajusta la forma a tu mano para que sea llevable.",
  },
  {
    q: "¿Cómo funcionan las cancelaciones?",
    a: "Avisa con al menos 48 h para poder ofrecer el hueco a otra persona. Las citas de sets largos se bloquean varias horas de agenda, así que las ausencias sin aviso pueden afectar a futuras reservas.",
  },
  {
    q: "¿Cómo preparo mis uñas antes de venir?",
    a: "Ven sin esmalte si puedes, con las uñas limpias y sin cremas ni aceites. No las cortes ni limes antes: se prepara todo en la cita.",
  },
  {
    q: "¿Retiráis trabajo de otro sitio?",
    a: "Sí. Se retira con limado controlado y se valora el estado de la uña natural antes de empezar. Avísame al reservar para reservar tiempo extra.",
  },
  {
    q: "¿Cómo se calcula el precio del arte?",
    a: "Depende del tiempo y la técnica: relieve esculpido, pintado a mano, cristales o charms suman trabajo manual. Se confirma el precio antes de la cita, nunca al final.",
  },
];

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    const el = bodyRef.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.height = next ? "auto" : "0px";
      return;
    }
    gsap.killTweensOf(el);
    if (next) {
      gsap.set(el, { height: "auto" });
      gsap.from(el, { height: 0, duration: 0.7, ease: "expo.out" });
      gsap.fromTo(
        el.firstElementChild,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "expo.out", delay: 0.05 },
      );
    } else {
      gsap.to(el, { height: 0, duration: 0.55, ease: "expo.out" });
    }
  };

  return (
    <li className="border-t border-border last:border-b">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="flex w-full items-baseline justify-between gap-6 py-6 text-left md:py-7"
      >
        <span className="font-display text-step-2 leading-tight">{q}</span>
        <span className="label shrink-0 text-muted-foreground">{open ? "—" : "+"}</span>
      </button>
      <div ref={bodyRef} className="h-0 overflow-hidden">
        <p className="max-w-2xl pb-8 text-muted-foreground">{a}</p>
      </div>
    </li>
  );
}

export function Faq() {
  return (
    <section id="faq" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 md:grid-cols-12 md:px-10">
        <div className="md:col-span-4">
          <SplitHeading text="Preguntas" className="display text-step-4" />
        </div>
        <ul className="md:col-span-8">
          {faqs.map((f) => (
            <Item key={f.q} q={f.q} a={f.a} />
          ))}
        </ul>
      </div>
    </section>
  );
}
