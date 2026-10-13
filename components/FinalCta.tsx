"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { IMG } from "@/lib/images";
import { WA } from "@/lib/site";
import { Cta, EASE_INK } from "./ui";

const LINES = ["Tu idea merece", "quedarse para siempre."];

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.22, 1.02]);

  return (
    <section ref={ref} aria-labelledby="cta-titulo" className="relative isolate overflow-hidden py-32 md:py-48">
      <motion.div aria-hidden className="absolute inset-0 -z-10" style={{ scale }}>
        <Image
          src={IMG.session.src}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          className="object-cover object-[50%_40%] [filter:grayscale(1)_brightness(0.42)_contrast(1.15)]"
        />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_30%_60%,rgba(10,10,10,0.35),rgba(10,10,10,0.92)_75%)]" />

      <div className="container-x">
        <motion.h2
          id="cta-titulo"
          className="display-xl max-w-[16ch]"
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
        >
          {LINES.map((l, i) => (
            <span key={l} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                variants={{
                  hidden: { y: "105%" },
                  show: { y: "0%", transition: { duration: 1, delay: i * 0.12, ease: EASE_INK } },
                }}
              >
                {l}
              </motion.span>
            </span>
          ))}
        </motion.h2>
        <motion.div
          className="mt-12 flex flex-col items-start gap-5"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE_INK }}
        >
          <Cta href={WA.final} size="lg" magnetic>
            Escríbeme por WhatsApp
          </Cta>
          <p className="text-sm text-bone/75">Horario del estudio: miércoles a lunes, de 9:00 a 20:00 h.</p>
        </motion.div>
      </div>
    </section>
  );
}
