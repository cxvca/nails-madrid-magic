import { img } from "@/lib/works";
import { SplitHeading } from "./Reveal";

const grid = [
  { src: img.setTeal, alt: "Set stiletto turquesa con mariposas de cristal" },
  { src: img.chrome, alt: "Macro de una uña con acabado cromo espejo" },
  { src: img.setPink, alt: "Set coffin rosa con flores 3D esculpidas" },
  { src: img.aurora, alt: "Set stiletto extralargo con cromo iridiscente" },
  { src: img.setPastel, alt: "Set almendra con florales pintados a mano" },
  { src: img.extensions, alt: "Set duck extralargo negro con charms de cristal" },
];

export function Social() {
  return (
    <section className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SplitHeading
            text="Más nail art, cada día."
            className="display max-w-[18ch] text-[var(--text-step-4)]"
          />
          <a
            href="https://www.instagram.com/nails.liis/"
            target="_blank"
            rel="noreferrer noopener"
            className="label border-b border-foreground/40 pb-1 transition-colors duration-300 hover:border-foreground"
          >
            Seguir en Instagram →
          </a>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 md:mt-20 md:grid-cols-6 md:gap-4">
          {grid.map((item, i) => (
            <a
              key={item.src}
              href="https://www.instagram.com/nails.liis/"
              target="_blank"
              rel="noreferrer noopener"
              className={`group overflow-hidden ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="aspect-square w-full object-cover brightness-90 transition-[transform,filter] duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05] group-hover:brightness-105"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
