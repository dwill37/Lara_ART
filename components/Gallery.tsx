"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { GALLERY, type Shape } from "@/lib/images";
import { SITE } from "@/lib/site";
import { useMedia } from "@/lib/useMedia";
import { ArrowIcon, Cta, EASE_INK, InstagramIcon } from "./ui";

const ASPECT: Record<Shape, string> = {
  tall: "aspect-[3/4]",
  portrait: "aspect-[4/5]",
  square: "aspect-square",
};

type Item = (typeof GALLERY)[number] & { index: number };

function Tile({ item, order, onOpen }: { item: Item; order: number; onOpen: (i: number) => void }) {
  const reduce = useReducedMotion();
  const fine = useMedia("(hover: hover) and (pointer: fine)");
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 180, damping: 20 });
  const rotateY = useSpring(ry, { stiffness: 180, damping: 20 });

  function onMove(e: React.PointerEvent<HTMLButtonElement>) {
    if (!fine || reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 7);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 7);
  }
  function reset() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, scale: 1.06 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.1, delay: (order % 3) * 0.12, ease: EASE_INK }}
      style={{ perspective: 900 }}
    >
      <motion.button
        type="button"
        onClick={() => onOpen(item.index)}
        onPointerMove={onMove}
        onPointerLeave={reset}
        aria-label={`Ampliar foto: ${item.alt}`}
        style={{ rotateX, rotateY }}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[var(--radius-card)] bg-ink-2"
      >
        <motion.div layoutId={`foto-${item.index}`} className={`relative w-full ${ASPECT[item.shape]}`}>
          <Image
            src={item.src}
            alt=""
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 30vw, 50vw"
            className="ink-photo object-cover transition-transform duration-700 ease-[var(--ease-ink)] group-hover:scale-[1.035]"
          />
        </motion.div>
      </motion.button>
    </motion.li>
  );
}

function Column({
  items,
  y,
  offset,
  onOpen,
}: {
  items: Item[];
  y: MotionValue<number>;
  offset: number;
  onOpen: (i: number) => void;
}) {
  return (
    <motion.ul style={{ y }} className="flex flex-col gap-3 md:gap-5">
      {items.map((it, i) => (
        <Tile key={it.index} item={it} order={i + offset} onOpen={onOpen} />
      ))}
    </motion.ul>
  );
}

function Lightbox({ index, onClose, onStep }: { index: number; onClose: () => void; onStep: (d: number) => void }) {
  const item = GALLERY[index];
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.classList.add("lock");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("lock");
    };
  }, [onClose, onStep]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Foto ampliada"
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center overscroll-contain p-4 md:p-10"
    >
      <motion.button
        type="button"
        aria-label="Cerrar"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-zoom-out bg-ink/92 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      />
      <figure className="relative flex w-full max-w-[min(560px,80vh)] flex-col">
        <motion.div
          layoutId={`foto-${index}`}
          className={`relative w-full overflow-hidden rounded-[var(--radius-card)] ${ASPECT[item.shape]}`}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
        >
          <Image src={item.src} alt={item.alt} fill sizes="560px" className="object-cover" />
        </motion.div>
        <motion.figcaption
          className="mt-4 text-sm text-ash"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.2 }}
        >
          {item.alt}
        </motion.figcaption>
      </figure>
      <motion.div
        className="relative mt-6 flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button type="button" onClick={() => onStep(-1)} aria-label="Foto anterior" className="grid size-12 place-items-center rounded-full border border-line text-bone hover:border-bone/60">
          <ArrowIcon className="size-4 -rotate-[135deg]" />
        </button>
        <button ref={closeRef} type="button" onClick={onClose} className="h-12 rounded-full bg-bone px-6 text-sm font-medium text-ink">
          Cerrar
        </button>
        <button type="button" onClick={() => onStep(1)} aria-label="Foto siguiente" className="grid size-12 place-items-center rounded-full border border-line text-bone hover:border-bone/60">
          <ArrowIcon className="size-4 rotate-45" />
        </button>
      </motion.div>
    </motion.div>
  );
}

export function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const lg = useMedia("(min-width: 1024px)");
  const [open, setOpen] = useState<number | null>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const openAt = useCallback((i: number) => {
    lastTrigger.current = document.activeElement as HTMLElement;
    setOpen(i);
  }, []);
  const close = useCallback(() => {
    setOpen(null);
    requestAnimationFrame(() => lastTrigger.current?.focus());
  }, []);
  const step = useCallback(
    (d: number) => setOpen((o) => (o === null ? o : (o + d + GALLERY.length) % GALLERY.length)),
    [],
  );

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const on = lg && !reduce;
  const y1 = useTransform(scrollYProgress, [0, 1], on ? [40, -60] : [0, 0]);
  const y2 = useTransform(scrollYProgress, [0, 1], on ? [120, -120] : [0, 0]);
  const y3 = useTransform(scrollYProgress, [0, 1], on ? [10, -20] : [0, 0]);

  const items: Item[] = GALLERY.map((g, index) => ({ ...g, index }));
  const cols = lg ? 3 : 2;
  const columns: Item[][] = Array.from({ length: cols }, () => []);
  items.forEach((it, i) => columns[i % cols].push(it));
  const ys = [y1, y2, y3];

  return (
    <section id="trabajos" ref={ref} aria-labelledby="trabajos-titulo" className="relative overflow-x-clip bg-ink-1 py-24 md:py-36">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h2 id="trabajos-titulo" className="font-display text-[clamp(3.4rem,13vw,11rem)] font-semibold leading-[0.82] tracking-[-0.055em]">
            Trabajos
          </h2>
          <p className="max-w-[30ch] text-[17px] leading-relaxed text-ash md:pb-4">
            Una selección de piezas de Obed. Toca cualquier foto para verla de cerca.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 md:mt-20 md:gap-5 lg:grid-cols-3">
          {columns.map((c, i) => (
            <Column key={i} items={c} y={ys[i]} offset={i} onOpen={openAt} />
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start gap-4 border-t border-line pt-10 md:mt-28 md:flex-row md:items-center md:justify-between">
          <p className="display-md max-w-[22ch]">Hay más piezas en el Instagram de Obed.</p>
          <Cta href={SITE.social.instagram} variant="ghost" icon="none" size="lg">
            <span className="inline-flex items-center gap-2.5">
              <InstagramIcon className="size-5" />
              Ver más en Instagram
            </span>
          </Cta>
        </div>
      </div>

      <AnimatePresence>
        {open !== null ? <Lightbox key="lb" index={open} onClose={close} onStep={step} /> : null}
      </AnimatePresence>
    </section>
  );
}
