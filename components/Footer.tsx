import { NAV_LINKS, SITE, fullAddress } from "@/lib/site";
import { FacebookIcon, InstagramIcon } from "./ui";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line pb-28 pt-20 md:pb-12">
      <div className="container-x grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-gothic text-5xl leading-none">{SITE.brand}</p>
          <p className="mt-3 text-ash">Tatuajes por {SITE.artist} en Cancún</p>
          <div className="mt-8 flex gap-3">
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Obed Cortés"
              className="grid size-12 place-items-center rounded-full border border-line text-bone transition-colors hover:border-bone/60"
            >
              <InstagramIcon className="size-5" />
            </a>
            <a
              href={SITE.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook de Obed Cortés"
              className="grid size-12 place-items-center rounded-full border border-line text-bone transition-colors hover:border-bone/60"
            >
              <FacebookIcon className="size-5" />
            </a>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-3 md:col-span-7">
          <div>
            <h2 className="text-sm text-smoke">Contacto</h2>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              <li>
                <a href={SITE.phoneHref} className="hover:underline">{SITE.phoneDisplay}</a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="break-all hover:underline">{SITE.email}</a>
              </li>
              <li className="text-ash">
                <address className="not-italic">{fullAddress}</address>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm text-smoke">Horario</h2>
            <p className="mt-4 text-[15px]">
              {SITE.hours.label}
              <br />
              {SITE.hours.time}
            </p>
            <p className="mt-1 text-[15px] text-ash">{SITE.hours.closed}</p>
          </div>
          <nav aria-label="Secciones">
            <h2 className="text-sm text-smoke">Secciones</h2>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-ash transition-colors hover:text-bone">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className="container-x mt-16 flex flex-col gap-2 border-t border-line pt-6 text-[13px] text-smoke sm:flex-row sm:justify-between">
        <p>
          © {year} {SITE.brand} · {SITE.artist}
        </p>
        <p>Cancún, Quintana Roo, México</p>
      </div>
    </footer>
  );
}
