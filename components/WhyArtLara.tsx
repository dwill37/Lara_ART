"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EASE_INK, EASE_NEEDLE, Ph } from "./ui";

/** Íconos de línea fina: cada trazo se dibuja como si fuera la aguja. */
const ICONS: Record<string, string[]> = {
  ojo: [
    "M4 24 C 12 12, 36 12, 44 24 C 36 36, 12 36, 4 24 Z",
    "M24 17 a7 7 0 1 1 0 14 a7 7 0 1 1 0 -14",
    "M24 21.5 a2.5 2.5 0 1 1 0 5 a2.5 2.5 0 1 1 0 -5",
  ],
  sombra: [
    "M8 40 C 14 22, 30 10, 42 8",
    "M8 40 C 18 28, 30 20, 42 18",
    "M8 40 C 20 34, 31 30, 42 28",
    "M8 40 L 42 38",
  ],
  letra: [
    "M10 36 C 10 20, 22 8, 28 12 C 34 16, 20 26, 18 34 C 16 42, 30 40, 38 30",
    "M30 40 L 42 40",
  ],
  idea: [
    "M10 38 L 30 18 L 36 24 L 16 44 L 8 46 Z",
    "M30 18 L 34 14 a3 3 0 0 1 4 0 l 2 2 a3 3 0 0 1 0 4 L 36 24",
    "M24 8 l 0 4 M 14 12 l 2 3 M 34 6 l -1 4",
  ],
  extra: ["M24 6 L 40 12 L 40 24 C 40 34, 32 40, 24 43 C 16 40, 8 34, 8 24 L 8 12 Z", "M17 24 l 5 5 l 9 -10"],
};

const ITEMS = [
  {
    icon: "ojo",
    title: "Realismo que respira",
    body: "Retratos, animales y figuras trabajados al detalle, para que la pieza parezca tener vida propia.",
  },
  {
    icon: "sombra",
    title: "Sombras con profundidad",
    body: "Degradados en black & grey que construyen volumen capa por capa y cuentan una historia.",
  },
  {
    icon: "letra",
    title: "Letras con presencia",
    body: "Nombres, fechas y frases con trazo firme y estilo propio, pensadas para la zona donde van.",
  },
  {
    icon: "idea",
    title: "Tu idea, tu diseño",
    body: "Llegas con una idea, una referencia o una foto. Obed la convierte en un diseño hecho solo para ti.",
  },
] as const;

const card: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const stroke: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.9, delay: i * 0.18, ease: EASE_NEEDLE },
      opacity: { duration: 0.01, delay: i * 0.18 },
    },
  }),
};
const text: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.45, ease: EASE_INK } },
};

function DrawnIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 48 48" className="size-12 text-bone" aria-hidden fill="none">
      {ICONS[name].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          variants={stroke}
          custom={i}
          stroke={i === ICONS[name].length - 1 ? "var(--color-vermilion)" : "currentColor"}
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

export function WhyArtLara() {
  const reduce = useReducedMotion();
  const init = reduce ? "show" : "hidden";

  return (
    <section aria-labelledby="porque-titulo" className="relative py-24 md:py-36">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <h2 id="porque-titulo" className="display-lg max-w-[12ch]">
              Por qué Art Lara
            </h2>
            <p className="mt-6 max-w-[34ch] text-[17px] leading-relaxed text-ash">
              Obed Cortés acompaña tu pieza de la primera idea a la última sombra.
            </p>
          </div>
        </div>

        <ul className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:col-span-8">
          {ITEMS.map((it, i) => (
            <motion.li
              key={it.title}
              variants={card}
              initial={init}
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              className={`border-t border-line pt-7 ${i % 2 === 1 ? "sm:mt-20" : ""}`}
            >
              <DrawnIcon name={it.icon} />
              <motion.div variants={text}>
                <h3 className="display-md mt-7">{it.title}</h3>
                <p className="mt-3 max-w-[36ch] leading-relaxed text-ash">{it.body}</p>
              </motion.div>
            </motion.li>
          ))}
          <motion.li
            variants={card}
            initial={init}
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="border-t border-dashed border-line pt-7 sm:col-span-2 sm:max-w-[60%]"
          >
            <DrawnIcon name="extra" />
            <motion.div variants={text}>
              <h3 className="display-md mt-7">
                <Ph>diferenciador clave, p. ej. estándares de higiene</Ph>
              </h3>
              <p className="mt-3 text-ash">
                <Ph>descripción corta del diferenciador</Ph>
              </p>
            </motion.div>
          </motion.li>
        </ul>
      </div>
    </section>
  );
}
