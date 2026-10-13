"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";

import { NAV_LINKS, SITE, WA } from "@/lib/site";
import { Cta, EASE_INK, EASE_NEEDLE, InstagramIcon, FacebookIcon } from "./ui";

export function Wordmark({ intro = false }: { intro?: boolean }) {
  const reduce = useReducedMotion();
  const animate = intro && !reduce;
  return (
    <span className="relative inline-flex flex-col">
      {/* Revelado en CSS (no espera a JS); la línea de abajo sí usa pathLength */}
      <span
        className={`font-gothic text-[1.65rem] leading-none text-bone md:text-[1.85rem] ${intro ? "intro-stencil" : ""}`}
      >
        {SITE.brand}
      </span>
      {/* Línea de aguja que "traza" el esténcil del wordmark */}
      <svg
        aria-hidden
        viewBox="0 0 120 6"
        preserveAspectRatio="none"
        className="mt-1 h-[6px] w-full overflow-visible text-vermilion"
      >
        <motion.path
          d="M1 3 C 30 1, 60 5, 92 2.6 S 116 3, 119 3"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.2}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={animate ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.25, delay: 0.1, ease: EASE_NEEDLE }}
        />
        <motion.circle
          cx="119"
          cy="3"
          r="1.6"
          fill="currentColor"
          initial={animate ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.2 }}
        />
      </svg>
    </span>
  );
}

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useMotionValueEvent(scrollY, "change", (v) => {
    const next = v > 48;
    if (next !== scrolled) setScrolled(next);
  });

  useEffect(() => {
    const root = document.documentElement;
    if (open) {
      root.classList.add("lock");
      firstLinkRef.current?.focus();
    } else {
      root.classList.remove("lock");
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <AnimatePresence>
        {open ? (
          <motion.div
            id="menu-movil"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            className="fixed inset-0 z-0 flex flex-col bg-ink-1 lg:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 44px) 36px)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "circle(150% at calc(100% - 44px) 36px)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 44px) 36px)" }}
            transition={{ duration: 0.7, ease: EASE_NEEDLE }}
          >
            <div className="container-x flex flex-1 flex-col justify-center pt-20">
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((l, i) => (
                  <li key={l.href} className="overflow-hidden">
                    <motion.a
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="font-display block py-1.5 text-[clamp(2.4rem,11vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-bone"
                      initial={{ y: "105%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "105%" }}
                      transition={{ duration: 0.6, delay: 0.15 + i * 0.05, ease: EASE_INK }}
                    >
                      {l.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
              <motion.div
                className="mt-10 flex flex-col gap-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.5, ease: EASE_INK }}
              >
                <Cta href={WA.general} size="lg" className="w-full">
                  Cotiza por WhatsApp
                </Cta>
                <div className="flex items-center gap-4 text-ash">
                  <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram de Obed Cortés" className="grid size-12 place-items-center rounded-full border border-line">
                    <InstagramIcon className="size-5" />
                  </a>
                  <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook de Obed Cortés" className="grid size-12 place-items-center rounded-full border border-line">
                    <FacebookIcon className="size-5" />
                  </a>
                  <a href={SITE.phoneHref} className="text-sm">{SITE.phoneDisplay}</a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <motion.div
        className="relative"
        animate={{ y: scrolled ? 0 : 10 }}
        transition={{ duration: 0.5, ease: EASE_INK }}
      >
        {/* Fondo sólido que aparece al hacer scroll */}
        <motion.div
          aria-hidden
          className="absolute inset-0 border-b border-line bg-ink/90 backdrop-blur-md"
          initial={false}
          animate={{ opacity: scrolled && !open ? 1 : 0 }}
          transition={{ duration: 0.4, ease: EASE_INK }}
        />
        <nav
          aria-label="Principal"
          className="container-x relative flex h-16 items-center justify-between gap-6 md:h-[72px]"
        >
          <a href="#inicio" className="relative z-10 shrink-0" aria-label="Art Lara, ir al inicio">
            <Wordmark intro />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative block px-3 py-2 text-[14px] text-ash transition-colors hover:text-bone"
                >
                  {l.label}
                  <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-vermilion transition-transform duration-500 ease-[var(--ease-ink)] group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <Cta href={WA.general} magnetic>
                Cotiza por WhatsApp
              </Cta>
            </div>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="relative z-10 grid size-12 place-items-center rounded-full border border-bone/20 lg:hidden"
            >
              <span className="relative block h-3 w-5">
                <motion.span
                  className="absolute left-0 top-0 h-px w-5 bg-bone"
                  animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: 0.35, ease: EASE_INK }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 h-px w-5 bg-bone"
                  animate={open ? { y: -5, rotate: -45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: 0.35, ease: EASE_INK }}
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.div>

    </header>
  );
}
