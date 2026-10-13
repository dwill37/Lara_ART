import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, UnifrakturMaguntia } from "next/font/google";
import { Providers } from "@/components/Providers";

import { SITE } from "@/lib/site";
import { STYLE_IMG } from "@/lib/images";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const gothic = UnifrakturMaguntia({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-unifraktur",
  display: "swap",
});

const title = "Art Lara | Tatuajes de realismo en Cancún por Obed Cortés";
const description =
  "Tatuador de realismo en Cancún. Obed Cortés crea tatuajes de realismo, sombras y letras con diseño personalizado. Cotiza tu tatuaje por WhatsApp.";
const ogImage = STYLE_IMG.realismo.src;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title,
  description,
  keywords: [
    "tatuajes en Cancún",
    "tatuador de realismo en Cancún",
    "tatuajes de letras Cancún",
    "tatuajes black and grey Cancún",
    "diseño de tatuajes personalizado",
    "Obed Cortés",
    "Art Lara",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "/",
    siteName: SITE.brand,
    title,
    description,
    images: [
      {
        url: ogImage.src,
        width: ogImage.width,
        height: ogImage.height,
        alt: STYLE_IMG.realismo.alt,
      },
    ],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: [ogImage.src],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TattooParlor",
  "@id": `${SITE.url}/#negocio`,
  name: SITE.brand,
  description,
  url: SITE.url,
  image: new URL(ogImage.src, SITE.url).toString(),
  telephone: SITE.phoneE164,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: SITE.geo.latitude,
    longitude: SITE.geo.longitude,
  },
  hasMap: SITE.mapsUrl,
  sameAs: [SITE.social.facebook, SITE.social.instagram],
  founder: { "@type": "Person", name: SITE.artist, jobTitle: "Tatuador" },
  employee: { "@type": "Person", name: SITE.artist, jobTitle: "Tatuador" },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "20:00",
    },
  ],
  areaServed: "Cancún, Quintana Roo",
  knowsAbout: ["Tatuajes de realismo", "Sombras black & grey", "Lettering", "Diseño personalizado"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={`${display.variable} ${sans.variable} ${gothic.variable}`}>
      <body className="grain">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-bone focus:px-4 focus:py-2 focus:text-ink"
        >
          Saltar al contenido
        </a>
        <Providers>{children}</Providers>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
