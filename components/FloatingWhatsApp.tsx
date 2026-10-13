"use client";

import { motion, useReducedMotion } from "framer-motion";

import { WA } from "@/lib/site";
import { EASE_INK, WhatsappIcon } from "./ui";

/** Siempre visible en móvil; discreto (solo ícono) en escritorio. Entra después de la intro del hero. */
export function FloatingWhatsApp() {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href={WA.general}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Cotizar tu tatuaje por WhatsApp"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      className="group fixed bottom-4 right-4 z-40 flex h-14 items-center gap-2 rounded-full bg-bone pl-4 pr-5 text-ink shadow-[0_10px_30px_rgba(0,0,0,0.45)] md:bottom-6 md:right-6 md:size-14 md:justify-center md:p-0"
      initial={reduce ? false : { opacity: 0, y: 24, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1, transition: { delay: reduce ? 0 : 2, duration: 0.6, ease: EASE_INK } }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
    >
      <WhatsappIcon className="size-6 shrink-0" />
      <span className="text-sm font-medium md:sr-only">Cotizar</span>
    </motion.a>
  );
}
