"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { SITE, WA, fullAddress } from "@/lib/site";
import { EASE_INK, Ph } from "./ui";

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "¿Cómo cotizo mi tatuaje?",
    a: (
      <>
        Escríbele a Obed por{" "}
        <a href={WA.general} target="_blank" rel="noopener noreferrer" className="text-bone underline decoration-vermilion underline-offset-4">
          WhatsApp
        </a>{" "}
        y mándale tu idea: referencias, tamaño aproximado y la zona del cuerpo. Con eso te da tu cotización.
      </>
    ),
  },
  {
    q: "¿Cuánto cuesta un tatuaje?",
    a: (
      <>
        Depende del tamaño, el estilo y el detalle de cada pieza. <Ph>rango de precios o precio mínimo</Ph>
      </>
    ),
  },
  {
    q: "¿Haces diseños personalizados?",
    a: "Sí. Tú traes la idea y Obed la convierte en un diseño hecho para ti. Puedes mandar fotos, bocetos o referencias.",
  },
  {
    q: "¿Necesito dejar anticipo?",
    a: <Ph>política de anticipo: monto, forma de pago, cambios de fecha</Ph>,
  },
  {
    q: "¿Haces cover-ups o retoques?",
    a: <Ph>¿se hacen cover-ups y retoques? condiciones</Ph>,
  },
  {
    q: "¿Cuál es tu horario y dónde estás?",
    a: (
      <>
        El estudio abre de miércoles a lunes, de 9:00 a 20:00 h, y cierra los martes. Está en {fullAddress}{" "}
        (plus code {SITE.address.plusCode}).
      </>
    ),
  },
];

function Row({ q, a, open, onToggle }: { q: string; a: React.ReactNode; open: boolean; onToggle: () => void }) {
  const id = useId();
  return (
    <li className="border-b border-line">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-btn`}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
        >
          <span className="font-display text-[19px] font-medium tracking-[-0.02em] md:text-[23px]">{q}</span>
          <span aria-hidden className="relative grid size-10 shrink-0 place-items-center rounded-full border border-line transition-colors group-hover:border-bone/50">
            <span className="absolute h-px w-3.5 bg-bone" />
            <motion.span
              className="absolute h-px w-3.5 bg-bone"
              initial={false}
              animate={{ rotate: open ? 0 : 90 }}
              transition={{ duration: 0.35, ease: EASE_INK }}
            />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-btn`}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.45, ease: EASE_INK }, opacity: { duration: 0.3 } }}
            className="overflow-hidden"
          >
            <p className="max-w-[60ch] pb-7 pr-14 leading-relaxed text-ash">{a}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" aria-labelledby="faq-titulo" className="relative py-24 md:py-36">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <h2 id="faq-titulo" className="display-lg lg:col-span-4">
          Preguntas frecuentes
        </h2>
        <ul className="border-t border-line lg:col-span-8">
          {FAQS.map((f, i) => (
            <Row key={f.q} q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </ul>
      </div>
    </section>
  );
}
