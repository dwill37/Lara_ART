"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useSpring } from "framer-motion";

import { WA } from "@/lib/site";
import { EASE_INK, Ph } from "./ui";

const STEPS = [
  {
    title: "Mándanos tu idea por WhatsApp",
    body: "Cuéntanos qué quieres tatuarte. Manda tus referencias, el tamaño aproximado y la zona del cuerpo.",
    extra: (
      <a href={WA.general} target="_blank" rel="noopener noreferrer" className="text-bone underline decoration-vermilion decoration-1 underline-offset-4 hover:decoration-2">
        Escribir ahora
      </a>
    ),
  },
  {
    title: "Diseñamos tu pieza",
    body: "Tu idea se convierte en un diseño hecho a tu medida.",
    extra: <Ph>cómo es el proceso de diseño y aprobación</Ph>,
  },
  {
    title: "Agenda tu cita",
    body: "Eliges el día dentro del horario del estudio: miércoles a lunes, de 9:00 a 20:00 h.",
    extra: <Ph>política de anticipo</Ph>,
  },
  {
    title: "Día del tatuaje y cuidados",
    body: "Tu idea pasa a la piel. Antes de irte te llevas las indicaciones para que sane bien.",
    extra: <Ph>indicaciones de cuidado (aftercare)</Ph>,
  },
];

function Step({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const reached = useInView(ref, { once: true, margin: "0px 0px -45% 0px" });
  const on = reached || !!reduce;
  const right = index % 2 === 1;

  return (
    <li ref={ref} className="relative grid grid-cols-[3rem_1fr] gap-x-5 md:grid-cols-[1fr_5rem_1fr] md:gap-x-0">
      {/* Nodo sobre la línea */}
      <div className="relative flex justify-center md:col-start-2 md:row-start-1">
        <span className="relative z-10 grid size-12 place-items-center overflow-hidden rounded-full border border-line bg-ink text-sm font-medium">
          {/* La tinta se expande desde el centro al llegar al paso */}
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full bg-bone"
            initial={false}
            animate={{ scale: on ? 1 : 0, opacity: on ? 1 : 0 }}
            transition={{ duration: 0.6, ease: EASE_INK }}
          />
          <span className={`relative transition-colors duration-500 ${on ? "text-ink" : "text-smoke"}`}>{index + 1}</span>
        </span>
      </div>

      <motion.div
        className={`pb-20 md:pb-28 md:row-start-1 ${right ? "md:col-start-3 md:pl-10" : "md:col-start-1 md:pr-10 md:text-right"}`}
        initial={false}
        animate={{ opacity: on ? 1 : 0.8, x: on ? 0 : right ? 16 : -16 }}
        transition={{ duration: 0.8, ease: EASE_INK }}
      >
        <h3 className="display-md pt-2.5">{step.title}</h3>
        <p className={`mt-3 max-w-[40ch] leading-relaxed text-ash ${right ? "" : "md:ml-auto"}`}>{step.body}</p>
        <div className="mt-4 text-sm">{step.extra}</div>
      </motion.div>
    </li>
  );
}

export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.6", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="proceso" aria-labelledby="proceso-titulo" className="relative py-24 md:py-36">
      <div className="container-x">
        <h2 id="proceso-titulo" className="display-xl mx-auto max-w-[14ch] md:text-center">
          De la idea a la piel.
        </h2>

        <ol ref={ref} className="relative mx-auto mt-16 max-w-5xl md:mt-24">
          {/* Riel gris + línea de aguja que se dibuja con el scroll */}
          <span aria-hidden className="absolute bottom-24 left-6 top-6 w-px -translate-x-1/2 bg-line md:left-1/2" />
          <motion.span
            aria-hidden
            className="absolute bottom-24 left-6 top-6 w-px origin-top -translate-x-1/2 bg-vermilion md:left-1/2"
            style={{ scaleY: reduce ? 1 : scaleY }}
          />
          {STEPS.map((s, i) => (
            <Step key={s.title} step={s} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
