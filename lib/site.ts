/**
 * Datos del negocio. Única fuente de verdad para textos factuales.
 * Todo lo que diga [PLACEHOLDER: ...] debe completarlo el dueño antes de publicar.
 */

export const SITE = {
  brand: "Art Lara",
  artist: "Obed Cortés",
  // [PLACEHOLDER: dominio final del sitio, p. ej. https://artlara.mx]
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  signature:
    "Si buscas realismo que respire, sombras que cuenten historia y letras con presencia, aquí es donde tu idea se vuelve arte en la piel.",
  phoneDisplay: "+52 998 303 8720",
  phoneHref: "tel:+529983038720",
  phoneE164: "+529983038720",
  whatsappNumber: "529983038720",
  email: "obedcortes.tattoo@gmail.com",
  address: {
    // [PLACEHOLDER: dirección exacta, número y referencia. Posiblemente "Av. Kabah"]
    street: "Av. Kaba con Avenida Chichén Itzá",
    postalCode: "77508",
    city: "Cancún",
    region: "Quintana Roo",
    regionShort: "Q.R.",
    country: "MX",
    plusCode: "5552+GM Cancún, Quintana Roo",
  },
  /**
   * Coordenadas obtenidas al decodificar el plus code 5552+GM (código completo 76HM5552+GM).
   * [PLACEHOLDER: confirmar latitud/longitud en Google Maps antes de publicar]
   */
  geo: { latitude: 21.15881, longitude: -86.84831 },
  hours: {
    label: "Miércoles a lunes",
    time: "9:00 a 20:00 h",
    closed: "Martes cerrado",
  },
  social: {
    instagram: "https://www.instagram.com/obed.cortestattoo/",
    instagramHandle: "@obed.cortestattoo",
    facebook: "https://www.facebook.com/obed.cortes.319",
  },
  // [PLACEHOLDER: enlace para dejar reseña en Google (Perfil de Negocio > Pedir reseñas)]
  googleReviewUrl: "#",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("5552+GM Cancún, Quintana Roo, México"),
  mapsEmbed:
    "https://www.google.com/maps?q=" +
    encodeURIComponent("5552+GM Cancún, Quintana Roo, México") +
    "&z=16&output=embed",
} as const;

export const fullAddress = `${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}, ${SITE.address.regionShort}`;

export function waLink(message: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const WA = {
  general: waLink("¡Hola Obed! Vi tu página y quiero cotizar un tatuaje."),
  final: waLink("¡Hola Obed! Tengo una idea para un tatuaje y quiero platicarla contigo."),
};

export const NAV_LINKS = [
  { href: "#estilos", label: "Estilos" },
  { href: "#trabajos", label: "Trabajos" },
  { href: "#obed", label: "Obed" },
  { href: "#proceso", label: "Proceso" },
  { href: "#ubicacion", label: "Ubicación" },
  { href: "#faq", label: "FAQ" },
] as const;

/** Pon esto en `false` para ocultar la sección de reseñas por completo. */
export const SHOW_REVIEWS = true;
