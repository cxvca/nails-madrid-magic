import { Reveal, SplitHeading } from "./Reveal";

export function Statement() {
  return (
    <section className="border-t border-border py-24 md:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 md:grid-cols-12 md:px-10">
        <div className="md:col-span-8">
          <SplitHeading
            text="No es una manicura. Es una pieza única."
            className="display text-step-4"
          />
        </div>
        <Reveal className="md:col-span-4 md:pt-3">
          <p data-reveal className="text-muted-foreground">
            Cada set empieza en una conversación y termina en algo que no existe en ningún otro sitio:
            forma, largo, color y detalle decididos para una sola persona. El relieve se esculpe a mano,
            el dibujo se pinta con pincel fino y cada cristal se coloca uno a uno. Diez lienzos, una
            sesión.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
