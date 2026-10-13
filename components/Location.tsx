"use client";

import { motion, useReducedMotion } from "framer-motion";

import { SITE, fullAddress } from "@/lib/site";
import { ClockIcon, Cta, EASE_INK, EASE_NEEDLE, MailIcon, PhoneIcon, PinIcon, Ph } from "./ui";

export function Location() {
  const reduce = useReducedMotion();

  return (
    <section id="ubicacion" aria-labelledby="ubicacion-titulo" className="relative bg-ink-1 py-24 md:py-36">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <motion.div
          className="lg:col-span-5"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE_INK }}
        >
          <h2 id="ubicacion-titulo" className="display-lg max-w-[12ch]">
            Visítanos en Cancún
          </h2>

          <dl className="mt-10 space-y-7">
            <div className="flex gap-4">
              <dt className="mt-0.5 shrink-0 text-vermilion">
                <PinIcon className="size-5" />
                <span className="sr-only">Dirección</span>
              </dt>
              <dd className="leading-relaxed">
                <address className="not-italic">{fullAddress}</address>
                <p className="mt-1 text-sm text-ash">Plus code: {SITE.address.plusCode}</p>
                <p className="mt-2">
                  <Ph>dirección exacta, número y punto de referencia</Ph>
                </p>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="mt-0.5 shrink-0 text-vermilion">
                <ClockIcon className="size-5" />
                <span className="sr-only">Horario</span>
              </dt>
              <dd className="leading-relaxed">
                <p>
                  {SITE.hours.label}, {SITE.hours.time}
                </p>
                <p className="text-ash">{SITE.hours.closed}</p>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="mt-0.5 shrink-0 text-vermilion">
                <PhoneIcon className="size-5" />
                <span className="sr-only">Teléfono y WhatsApp</span>
              </dt>
              <dd>
                <a href={SITE.phoneHref} className="underline-offset-4 hover:underline">
                  {SITE.phoneDisplay}
                </a>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="mt-0.5 shrink-0 text-vermilion">
                <MailIcon className="size-5" />
                <span className="sr-only">Correo</span>
              </dt>
              <dd>
                <a href={`mailto:${SITE.email}`} className="break-all underline-offset-4 hover:underline">
                  {SITE.email}
                </a>
              </dd>
            </div>
          </dl>

          <div className="mt-10">
            <Cta href={SITE.mapsUrl} icon="arrow" magnetic>
              Cómo llegar
            </Cta>
          </div>
        </motion.div>

        {/* Se observa el contenedor: un elemento recortado al 100% no cuenta como visible para IntersectionObserver */}
        <motion.div
          className="relative min-h-[360px] lg:col-span-7 lg:min-h-[520px]"
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
        <motion.div
          className="absolute inset-0 overflow-hidden rounded-[var(--radius-card)] border border-line bg-ink-2"
          variants={{
            hidden: { clipPath: "inset(0 0 100% 0)" },
            show: { clipPath: "inset(0 0 0% 0)", transition: { duration: 1.2, ease: EASE_NEEDLE } },
          }}
        >
          <iframe
            title={`Mapa de ${SITE.brand} en Google Maps`}
            src={SITE.mapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 size-full [filter:grayscale(1)_invert(0.92)_contrast(0.88)]"
          />
        </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
