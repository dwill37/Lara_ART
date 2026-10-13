"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { IMG } from "@/lib/images";
import { SITE } from "@/lib/site";
import { EASE_INK, EASE_NEEDLE, FacebookIcon, InstagramIcon, Ph } from "./ui";

const SPECIALTIES = ["Realismo", "Sombras", "Lettering", "Diseño personalizado"];

function Word({
  word,
  progress,
  range,
  still,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  still: boolean;
}) {
  const opacity = useTransform(progress, range, still ? [1, 1] : [0.42, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{" "}
    </motion.span>
  );
}

function ScrollQuote() {
  const ref = useRef<HTMLQuoteElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = SITE.signature.split(" ");

  return (
    <blockquote ref={ref} className="relative mx-auto max-w-5xl md:pl-6">
      <span aria-hidden className="absolute -left-2 -top-10 font-gothic text-[6rem] leading-none text-vermilion md:-left-16 md:-top-6 md:text-[8rem]">
        &ldquo;
      </span>
      <p className="font-display text-[clamp(1.9rem,4.6vw,4rem)] font-medium leading-[1.08] tracking-[-0.035em] text-bone">
        <span className="sr-only">{SITE.signature}</span>
        <span aria-hidden>
          {words.map((w, i) => (
            <Word
              key={i}
              word={w}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
              still={!!reduce}
            />
          ))}
        </span>
      </p>
      <footer className="mt-8 text-[15px] text-ash">Obed Cortés</footer>
    </blockquote>
  );
}

export function Artist() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);

  return (
    <section id="obed" ref={ref} aria-labelledby="obed-titulo" className="relative overflow-x-clip py-24 md:py-36">
      <div className="container-x grid items-center gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-ink-2">
            <motion.div className="absolute inset-[-10%_0]" style={{ y: portraitY }}>
              <Image
                src={IMG.portrait.src}
                alt={IMG.portrait.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover [filter:grayscale(1)_contrast(1.08)]"
              />
            </motion.div>
          </div>
        </div>

        <div className="md:col-span-7 md:pl-8">
          <motion.h2
            id="obed-titulo"
            className="display-xl"
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
          >
            <motion.span
              className="block"
              variants={{
                hidden: { clipPath: "inset(0 100% 0 0)" },
                show: { clipPath: "inset(0 0% 0 0)", transition: { duration: 1.2, ease: EASE_NEEDLE } },
              }}
            >
              Conoce a Obed
            </motion.span>
          </motion.h2>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE_INK }}
          >
            <p className="mt-6 max-w-[40ch] text-[19px] leading-relaxed text-bone/90">
              Obed Cortés es tatuador de realismo en Cancún y la mano detrás de Art Lara.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Especialidades">
              {SPECIALTIES.map((s) => (
                <li key={s} className="rounded-full border border-line px-4 py-2 text-sm text-bone">
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-8 max-w-[46ch] space-y-3 leading-relaxed text-ash">
              <p>
                <Ph>bio corta de Obed: cómo empezó, qué lo inspira, cómo trabaja</Ph>
              </p>
              <p>
                Años tatuando: <Ph>años de experiencia</Ph>
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2.5 rounded-full border border-line px-5 text-sm text-bone transition-colors hover:border-bone/60"
              >
                <InstagramIcon className="size-5" />
                {SITE.social.instagramHandle}
              </a>
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2.5 rounded-full border border-line px-5 text-sm text-bone transition-colors hover:border-bone/60"
              >
                <FacebookIcon className="size-5" />
                Facebook
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container-x mt-28 md:mt-44">
        <ScrollQuote />
      </div>
    </section>
  );
}
