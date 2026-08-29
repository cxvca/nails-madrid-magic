export function Footer() {
  return (
    <footer className="grain border-t border-border pb-10 pt-20 md:pt-28">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <p className="display text-[12vw] leading-[0.82] lowercase md:text-[9vw]">nails.liis</p>

        <div className="mt-14 flex flex-col gap-8 border-t border-border pt-8 md:flex-row md:items-start md:justify-between">
          <p className="label text-muted-foreground">Nail art a medida • Madrid</p>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              { href: "#trabajos", label: "Trabajos" },
              { href: "#servicios", label: "Servicios" },
              { href: "#sobre-mi", label: "Sobre mí" },
              { href: "#reserva", label: "Reservar" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="label text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://www.instagram.com/nails.liis/"
              target="_blank"
              rel="noreferrer noopener"
              className="label text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              Instagram
            </a>
          </nav>
        </div>

        <p className="label mt-12 text-muted-foreground/70">
          © {new Date().getFullYear()} nails.liis — Todos los diseños son originales
        </p>
      </div>
    </footer>
  );
}
