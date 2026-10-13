"use client";

import { useRef, type CSSProperties } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { IMG } from "@/lib/images";
import { SITE, WA } from "@/lib/site";
import { Cta, EASE_INK, EASE_NEEDLE } from "./ui";

/**
 * Polígono orgánico (mancha de tinta). Mismo número de puntos en cada fase
 * para que el navegador pueda interpolar el clip-path.
 */
const WOBBLE = [1, 0.82, 1.12, 0.9, 1.05, 0.78, 1.15, 0.94, 1.02, 0.85, 1.1, 0.88, 1.06, 0.8, 1.13, 0.92, 0.98, 0.84, 1.09, 0.9];
function blob(radius: number, wobble = 1, cx = 50, cy = 46) {
  const pts = WOBBLE.map((w, i) => {
    const a = (i / WOBBLE.length) * Math.PI * 2;
    const r = radius * (1 + (w - 1) * wobble);
    return `${(cx + Math.cos(a) * r).toFixed(2)}% ${(cy + Math.sin(a) * r * 1.15).toFixed(2)}%`;
  });
  return `polygon(${pts.join(", ")})`;
}

/*
 * La intro del hero corre con keyframes CSS (no con JS): arranca en el primer pintado,
 * sin esperar la hidratación, así el contenido se puede leer de inmediato.
 * Con prefers-reduced-motion todo se muestra estático (ver globals.css).
 */
const INTRO_CSS = `
@keyframes ink-bleed {
  0% { clip-path: ${blob(0.5)}; }
  25% { clip-path: ${blob(14)}; }
  60% { clip-path: ${blob(48, 0.6)}; }
  100% { clip-path: ${blob(140, 0.2)}; }
}
.ink-bleed { animation: ink-bleed 1.5s cubic-bezier(0.65, 0, 0.35, 1) both; }
@media (prefers-reduced-motion: reduce) { .ink-bleed { animation: none; } }
`;

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

const HEADLINE = ["Tatuajes", "que", "se", "sienten", "vivos."];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.04, reduce ? 1.04 : 1.14]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-18%"]);

  const words = SITE.signature.split(" ");

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative isolate flex min-h-[100dvh] items-end overflow-hidden bg-ink"
    >
      <style>{INTRO_CSS}</style>

      {/* Foto: se revela con una mancha de tinta que se expande desde el centro */}
      <div className="ink-bleed absolute inset-0 -z-10">
        <motion.div className="absolute inset-0" style={{ y: imgY, scale: imgScale }}>
          <Image
            src={IMG.hero.src}
            alt={IMG.hero.alt}
            priority
            fill
            sizes="100vw"
            placeholder="blur"
            className="object-cover object-[62%_28%] [filter:grayscale(1)_contrast(1.12)_brightness(0.9)] md:object-[70%_32%]"
          />
        </motion.div>
        {/* Velos para contraste del texto sobre la foto */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#0a0a0a_4%,rgba(10,10,10,0.82)_34%,rgba(10,10,10,0.25)_70%,rgba(10,10,10,0.55)_100%)]" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(to_right,rgba(10,10,10,0.9)_0%,rgba(10,10,10,0.55)_42%,transparent_72%)] md:block" />
      </div>

      {/* Trazo de aguja: un esténcil que se dibuja solo */}
      <svg
        aria-hidden
        viewBox="0 0 600 600"
        className="pointer-events-none absolute -right-24 top-[12%] -z-10 hidden w-[min(52vw,720px)] text-bone/35 md:block"
      >
        <motion.path
          d="M40 520 C 120 380, 260 420, 300 300 S 260 120, 380 90 S 560 140, 520 260 S 380 380, 440 470 S 560 540, 580 500"
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.1, delay: 0.2, ease: EASE_NEEDLE }}
        />
        <motion.circle
          cx="580"
          cy="500"
          r="3"
          className="fill-vermilion"
          initial={reduce ? false : { opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, duration: 0.35, ease: EASE_INK }}
        />
      </svg>

      <motion.div style={{ y: contentY }} className="container-x relative pb-14 pt-32 md:pb-20 lg:pb-24">
        <p
          className="intro-slide mb-6 inline-flex items-center gap-3 rounded-full border border-bone/20 bg-ink/50 py-1.5 pl-1.5 pr-4 text-[13px] text-bone backdrop-blur-sm"
          style={d(0.1)}
        >
          <Image src={IMG.logo.src} alt="" width={28} height={28} className="size-7 rounded-full" />
          Por Obed Cortés · Cancún
        </p>

        <h1 className="display-xl max-w-[11ch] text-bone">
          <span className="sr-only">{HEADLINE.join(" ")}</span>
          {HEADLINE.map((w, i) => (
            <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <span className="intro-rise inline-block" style={d(0.15 + i * 0.07)}>
                {w}
              </span>
              {i < HEADLINE.length - 1 ? " " : null}
            </span>
          ))}
        </h1>

        {/* Frase firma: la tinta se asienta por grupos */}
        <p className="mt-7 max-w-[34rem] text-[17px] leading-[1.5] text-bone/90 md:text-[19px]">
          <span className="sr-only">{SITE.signature}</span>
          {words.map((w, i) => (
            <span key={i} aria-hidden className="intro-settle inline-block" style={d(0.4 + Math.floor(i / 3) * 0.05)}>
              {w}
              {i < words.length - 1 ? " " : null}
            </span>
          ))}
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="intro-lift" style={d(0.7)}>
            <Cta href={WA.general} size="lg" magnetic className="w-full sm:w-auto">
              Cotiza tu tatuaje por WhatsApp
            </Cta>
          </div>
          <div className="intro-lift" style={d(0.8)}>
            <Cta href="#trabajos" size="lg" variant="ghost" icon="arrow" className="w-full sm:w-auto">
              Ver trabajos
            </Cta>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
