"use client";

import { motion, useReducedMotion } from "framer-motion";

import { SHOW_REVIEWS, SITE } from "@/lib/site";
import { Cta, EASE_INK, Ph } from "./ui";

type Review = { text: React.ReactNode; author: React.ReactNode };

/**
 * Reemplaza estas tarjetas por reseñas reales (texto + nombre e inicial).
 * Para ocultar la sección completa: SHOW_REVIEWS = false en lib/site.ts.
 */
const REVIEWS: Review[] = [
  { text: <Ph>texto de la reseña 1</Ph>, author: <Ph>nombre + inicial</Ph> },
  { text: <Ph>texto de la reseña 2</Ph>, author: <Ph>nombre + inicial</Ph> },
  { text: <Ph>texto de la reseña 3</Ph>, author: <Ph>nombre + inicial</Ph> },
];

export function Reviews() {
  const reduce = useReducedMotion();
  if (!SHOW_REVIEWS) return null;

  return (
    <section aria-labelledby="resenas-titulo" className="relative border-y border-line bg-ink-1 py-24 md:py-32">
      <div className="container-x">
        <h2 id="resenas-titulo" className="display-lg max-w-[16ch]">
          Lo que dicen quienes ya se tatuaron
        </h2>

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <motion.li
              key={i}
              initial={reduce ? false : { opacity: 0, y: 24, rotate: i === 1 ? 0 : i === 0 ? -1.2 : 1.2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: EASE_INK }}
              className={`flex flex-col justify-between gap-10 rounded-[var(--radius-card)] border border-line bg-ink p-7 ${i === 1 ? "md:translate-y-8" : ""}`}
            >
              <blockquote className="text-[17px] leading-relaxed text-bone">{r.text}</blockquote>
              <p className="text-sm text-ash">{r.author}</p>
            </motion.li>
          ))}
        </ul>

        <div className="mt-16">
          <Cta href={SITE.googleReviewUrl} variant="ghost" icon="arrow" external>
            Deja tu reseña en Google
          </Cta>
        </div>
      </div>
    </section>
  );
}
