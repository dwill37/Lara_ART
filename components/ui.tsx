"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

export const EASE_INK = [0.16, 1, 0.3, 1] as const;
export const EASE_NEEDLE = [0.65, 0, 0.35, 1] as const;

/* ------------------------------------------------------------------ */
/* Íconos de trazo (stroke 1.5). Se dibujan a mano para poder animar   */
/* pathLength y evitar dependencias extra.                             */
/* ------------------------------------------------------------------ */

type IconProps = { className?: string; title?: string };

function Svg({ className, title, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export const WhatsappIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.6 20.4l1.2-4.1A8.6 8.6 0 1 1 8 19.3z" />
    <path d="M9.2 8.3c.3-.4.7-.4 1-.3.2.1.4.5.6 1l.3.8c.1.3 0 .6-.2.8l-.5.5c.5 1.1 1.4 2 2.5 2.5l.5-.5c.2-.2.5-.3.8-.2l.8.3c.5.2.9.4 1 .6.1.3.1.7-.3 1-.6.6-1.6.8-2.7.4a7.6 7.6 0 0 1-4.3-4.3c-.4-1.1-.2-2 .5-2.6z" />
  </Svg>
);

export const InstagramIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
  </Svg>
);

export const FacebookIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M14.5 3.8h2.3v3.3h-2c-.6 0-1 .4-1 1v2.3h3l-.5 3.3h-2.5v7.5h-3.4v-7.5H8.2v-3.3h2.2V7.8c0-2.3 1.7-4 4.1-4z" />
  </Svg>
);

export const ArrowIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7 17L17 7M9 7h8v8" />
  </Svg>
);

export const PinIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
    <circle cx="12" cy="10" r="2.3" />
  </Svg>
);

export const ClockIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Svg>
);

export const PhoneIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 4.5h3l1.5 4-2 1.3a10 10 0 0 0 6.7 6.7l1.3-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5A15.5 15.5 0 0 1 3.5 6.1 1.5 1.5 0 0 1 5 4.5z" />
  </Svg>
);

export const MailIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
    <path d="M4 6.5l8 6 8-6" />
  </Svg>
);

/* ------------------------------------------------------------------ */
/* Placeholder visible para datos que faltan                           */
/* ------------------------------------------------------------------ */

export function Ph({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block max-w-full whitespace-normal break-words rounded-[3px] border border-dashed border-vermilion/60 px-1.5 py-0.5 font-mono text-[max(0.72em,12px)] leading-snug text-vermilion">
      [PLACEHOLDER: {children}]
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Botón principal con efecto magnético (solo con mouse)               */
/* ------------------------------------------------------------------ */

type CtaProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  size?: "md" | "lg";
  icon?: "whatsapp" | "arrow" | "none";
  magnetic?: boolean;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
};

export function Cta({
  href,
  children,
  variant = "solid",
  size = "md",
  icon = "whatsapp",
  magnetic = false,
  className = "",
  external,
  ariaLabel,
}: CtaProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 });

  const isExternal = external ?? href.startsWith("http");

  function onMove(e: React.PointerEvent<HTMLAnchorElement>) {
    if (!magnetic || reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.28);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.38);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  const base =
    "group/cta relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-medium tracking-[-0.01em] transition-colors duration-300";
  const sizes = size === "lg" ? "h-14 px-7 text-[15px] md:h-16 md:px-9 md:text-base" : "h-12 px-5 text-[14px]";
  const variants =
    variant === "solid"
      ? "bg-bone text-ink hover:bg-white"
      : "border border-bone/25 bg-ink/40 text-bone backdrop-blur-sm hover:border-bone/60";

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x, y }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={`${base} ${sizes} ${variants} ${className}`}
    >
      {icon === "whatsapp" ? <WhatsappIcon className="size-5 shrink-0" /> : null}
      <span>{children}</span>
      {icon === "arrow" ? (
        <ArrowIcon className="size-4 shrink-0 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
      ) : null}
    </motion.a>
  );
}
