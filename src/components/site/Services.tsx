import { useState } from "react";
import { SplitHeading } from "./Reveal";

type Service = {
  id: string;
  name: string;
  body: string;
  duration: string;
  price: string;
  complexity: 1 | 2 | 3 | 4;
};

// Precios y duraciones pendientes de confirmar con la artista — editables aquí.
const services: Service[] = [
  {
    id: "biab",
    name: "BIAB / Gel",
    body: "Base reforzada sobre uña natural, acabado limpio y color liso o nude. La opción discreta, con el mismo nivel de acabado.",
    duration: "aprox. 2 h",
    price: "A consultar",
    complexity: 1,
  },
  {
    id: "extensiones",
    name: "Extensiones",
    body: "Construcción de largo y forma a medida: almendra, stiletto, coffin, duck. Incluye largos extremos.",
    duration: "aprox. 3 h",
    price: "A consultar",
    complexity: 2,
  },
  {
    id: "nail-art",
    name: "Nail art a medida",
    body: "Diseño pensado para ti: colores, textura y composición decididos sobre tus referencias.",
    duration: "aprox. 3,5 h",
    price: "A consultar",
    complexity: 3,
  },
  {
    id: "3d",
    name: "3D / Nail art esculpido",
    body: "Flores, corazones y relieve esculpidos a mano en gel, con perlas y cristales colocados uno a uno.",
    duration: "aprox. 4,5 h",
    price: "A consultar",
    complexity: 4,
  },
  {
    id: "pintado",
    name: "Personajes / Pintado a mano",
    body: "Ilustración con pincel fino sobre la uña: personajes, retratos, miniaturas. Un dibujo distinto por dedo.",
    duration: "aprox. 5 h",
    price: "A consultar",
    complexity: 4,
  },
  {
    id: "sets",
    name: "Sets a medida",
    body: "Set completo diseñado desde cero para un evento o una idea concreta, con prueba de diseño previa.",
    duration: "a partir de 4 h",
    price: "A consultar",
    complexity: 4,
  },
];

function Complexity({ level }: { level: number }) {
  return (
    <span className="flex items-center gap-1" aria-label={`Complejidad ${level} de 4`}>
      {[1, 2, 3, 4].map((n) => (
        <span
          key={n}
          className={`h-px w-5 ${n <= level ? "bg-foreground" : "bg-foreground/25"}`}
        />
      ))}
    </span>
  );
}

export function Services() {
  const [open, setOpen] = useState<string | null>("nail-art");

  return (
    <section id="servicios" className="border-t border-border bg-paper py-24 text-paper-foreground md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SplitHeading text="Servicios" className="display text-step-4" />
          <p className="label max-w-[20rem] text-paper-muted">
            Duración de hasta 2 meses con el set intacto
          </p>
        </div>

        <ul className="mt-14 md:mt-20">
          {services.map((s, i) => {
            const isOpen = open === s.id;
            return (
              <li key={s.id} className="border-t border-paper-border last:border-b">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : s.id)}
                  aria-expanded={isOpen}
                  className="grid w-full grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-6 text-left md:py-8"
                >
                  <span className="label text-paper-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display text-step-3 md:text-step-4">
                    {s.name}
                  </span>
                  <span className="label text-paper-muted">{isOpen ? "—" : "+"}</span>
                </button>

                <div
                  className="grid grid-cols-[3rem_1fr] gap-4 overflow-hidden transition-[grid-template-rows,opacity] duration-700 ease-[var(--ease-out-expo)]"
                  style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <span />
                  <div className="min-h-0 overflow-hidden">
                    <div className="grid gap-6 pb-9 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
                      <p className="max-w-xl text-paper-muted">{s.body}</p>
                      <dl className="flex flex-wrap gap-x-10 gap-y-3 md:justify-end">
                        <div>
                          <dt className="label text-paper-muted">Duración</dt>
                          <dd className="mt-1">{s.duration}</dd>
                        </div>
                        <div>
                          <dt className="label text-paper-muted">Precio</dt>
                          <dd className="mt-1">{s.price}</dd>
                        </div>
                        <div>
                          <dt className="label text-paper-muted">Complejidad</dt>
                          <dd className="mt-3">
                            <Complexity level={s.complexity} />
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
