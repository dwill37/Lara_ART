"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { STYLE_IMG, type Photo } from "@/lib/images";
import { waLink } from "@/lib/site";
import { Cta, EASE_INK, EASE_NEEDLE, Ph } from "./ui";

type Style = {
  key: keyof typeof STYLE_IMG;
  title: string;
  note?: string;
  body: string;
  message: string;
  layout: string;
  aspect: string;
};

const STYLES: Style[] = [
  {
    key: "realismo",
    title: "Realismo",
    body: "Retratos, animales y escenas con detalle fotográfico. Para cuando quieres que tu pieza se vea real.",
    message: "¡Hola Obed! Vi tu página y me gustaría cotizar un tatuaje de realismo.",
    layout: "md:col-span-7",
    aspect: "aspect-[4/3]",
  },
  {
    key: "sombras",
    title: "Sombras / Black & grey",
    note: "confirmar nombre del estilo",
    body: "Volumen y contraste en negros y grises. Sombras que dan profundidad y cuentan historia.",
    message: "¡Hola Obed! Vi tu página y me gustaría cotizar un tatuaje de sombras (black & grey).",
    layout: "md:col-span-5 md:mt-28",
    aspect: "aspect-[4/5]",
  },
  {
    key: "letras",
    title: "Lettering / Letras",
    body: "Nombres, frases y fechas con letras que tienen presencia. Del trazo fino al gótico.",
    message: "¡Hola Obed! Vi tu página y me gustaría cotizar un tatuaje de letras.",
    layout: "md:col-span-5",
    aspect: "aspect-[4/5]",
  },
  {
    key: "personalizado",
    title: "Diseño personalizado",
    body: "Mándanos tu idea, una referencia o un boceto. Se convierte en una pieza única, hecha a tu medida.",
    message: "¡Hola Obed! Vi tu página y quiero cotizar un diseño personalizado. Te cuento mi idea:",
    layout: "md:col-span-7 md:mt-28",
    aspect: "aspect-[4/3]",
  },
];

/** Barrido diagonal, como una pasada de sombreado */
const WIPE_FROM = "polygon(0% 0%, 0% 0%, -35% 100%, -35% 100%)";
const WIPE_TO = "polygon(0% 0%, 135% 0%, 100% 100%, -35% 100%)";

function StyleCard({ s, photo, index }: { s: Style; photo: Photo; index: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      className={`group ${s.layout}`}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className={`relative overflow-hidden rounded-[var(--radius-card)] bg-ink-2 ${s.aspect}`}
        variants={{
          hidden: { clipPath: WIPE_FROM },
          show: { clipPath: WIPE_TO, transition: { duration: 1.2, delay: index % 2 ? 0.12 : 0, ease: EASE_NEEDLE } },
        }}
      >
        <motion.div
          className="absolute inset-0"
          variants={{
            hidden: { scale: 1.18 },
            show: { scale: 1, transition: { duration: 1.6, ease: EASE_INK } },
          }}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            placeholder="blur"
            sizes="(min-width: 768px) 55vw, 100vw"
            className="ink-photo object-cover transition-transform duration-[1.2s] ease-[var(--ease-ink)] group-hover:scale-[1.04]"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-6 flex flex-col gap-4"
        variants={{
          hidden: { opacity: 0, y: 16 },
          show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.5, ease: EASE_INK } },
        }}
      >
        <div>
          <h3 className="display-md">{s.title}</h3>
          {s.note ? (
            <p className="mt-2">
              <Ph>{s.note}</Ph>
            </p>
          ) : null}
          <p className="mt-3 max-w-[44ch] leading-relaxed text-ash">{s.body}</p>
        </div>
        <dl className="grid max-w-md grid-cols-2 gap-4 border-t border-line pt-4 text-sm">
          <div>
            <dt className="text-smoke">Precio</dt>
            <dd className="mt-1">
              <Ph>precio o &ldquo;desde $…&rdquo;</Ph>
            </dd>
          </div>
          <div>
            <dt className="text-smoke">Sesión</dt>
            <dd className="mt-1">
              <Ph>tiempo aproximado</Ph>
            </dd>
          </div>
        </dl>
        <div>
          <Cta href={waLink(s.message)} variant="ghost" ariaLabel={`Cotizar este estilo: ${s.title} por WhatsApp`}>
            Cotizar este estilo
          </Cta>
        </div>
      </motion.div>
    </motion.article>
  );
}

export function Styles() {
  return (
    <section id="estilos" aria-labelledby="estilos-titulo" className="relative py-24 md:py-36">
      <div className="container-x">
        <h2 id="estilos-titulo" className="display-xl max-w-[14ch]">
          Elige tu estilo.
        </h2>
        <p className="mt-6 max-w-[46ch] text-[17px] leading-relaxed text-ash">
          Cuatro maneras de llevar tu idea a la piel. Si no sabes cuál es la tuya, escríbele a Obed y lo definen juntos.
        </p>

        <div className="mt-16 grid gap-x-10 gap-y-20 md:mt-24 md:grid-cols-12">
          {STYLES.map((s, i) => (
            <StyleCard key={s.key} s={s} photo={STYLE_IMG[s.key]} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
