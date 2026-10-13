import type { StaticImageData } from "next/image";

import logo from "@/image/image_1_Logo.jpg";
import heroObed from "@/image/image_2_profil.jpg";
import portraitObed from "@/image/image_3_profil.jpg";
import obedSession from "@/image/image_11.jpg";

import i4 from "@/image/image_4.jpg";
import i5 from "@/image/image_5.jpg";
import i6 from "@/image/image_6.jpg";
import i7 from "@/image/image_7.jpg";
import i9 from "@/image/image_9.jpg";
import i10 from "@/image/image_10.jpg";
import i12 from "@/image/image_12.jpg";
import i13 from "@/image/image_13.jpg";
import i16 from "@/image/image_16.jpg";
import i17 from "@/image/image_17.jpg";
import i18 from "@/image/image_18.jpg";
import i19 from "@/image/image_19.jpg";
import i20 from "@/image/image_20.jpg";
import i22 from "@/image/image_22.jpg";
import i23 from "@/image/image_23.jpg";
import i24 from "@/image/image_24.jpg";
import i26 from "@/image/image_26.jpg";
import i27 from "@/image/image_27.jpg";
import i29 from "@/image/image_29.jpg";
import i35 from "@/image/image_35.jpg";
import i38 from "@/image/image_38.jpg";
import i39 from "@/image/image_39.jpg";

export type Photo = { src: StaticImageData; alt: string };

export const IMG = {
  logo: { src: logo, alt: "Monograma de Obed Cortés en letra gótica blanca sobre fondo negro" },
  hero: {
    src: heroObed,
    alt: "Obed Cortés tatuando un brazo en su estudio Art Lara, con guantes y cubrebocas",
  },
  portrait: {
    src: portraitObed,
    alt: "Retrato en blanco y negro de Obed Cortés, tatuador de Art Lara en Cancún",
  },
  session: {
    src: obedSession,
    alt: "Obed Cortés trabajando un tatuaje en penumbra, con la máquina sobre la piel",
  },
} satisfies Record<string, Photo>;

export const STYLE_IMG = {
  realismo: {
    src: i9,
    alt: "Tatuaje realista de un león rugiendo en black & grey sobre el antebrazo",
  },
  sombras: {
    src: i24,
    alt: "Media manga de lirios en sombras grises y negras sobre el brazo de una mujer",
  },
  letras: {
    src: i23,
    alt: "Lettering en letra cursiva fina a lo largo de la espalda",
  },
  personalizado: {
    src: i39,
    alt: "Diseño personalizado ornamental que recorre toda la columna, de la nuca a la cintura",
  },
} satisfies Record<string, Photo>;

/** Proporción con la que se recorta cada foto en la galería (todas las originales son cuadradas). */
export type Shape = "tall" | "square" | "portrait";

export const GALLERY: (Photo & { shape: Shape })[] = [
  { src: i4, shape: "tall", alt: "Retrato realista de Cristo con corona de espinas y ojos azules en el antebrazo" },
  { src: i22, shape: "square", alt: "Querubín realista en black & grey en el antebrazo" },
  { src: i6, shape: "portrait", alt: "Escultura clásica en black & grey sobre el brazo completo" },
  { src: i5, shape: "square", alt: "Lettering gótico grande a lo largo del antebrazo" },
  { src: i18, shape: "tall", alt: "Pieza de pecho completo con águila y corona en sombras negras" },
  { src: i7, shape: "portrait", alt: "Catrina realista con rosas en el hombro y brazo" },
  { src: i16, shape: "square", alt: "Ángel estilo escultura con sombras suaves en el antebrazo" },
  { src: i35, shape: "tall", alt: "Retrato de mujer a color, estilo realista, en la pantorrilla" },
  { src: i19, shape: "portrait", alt: "Lettering cursivo con trazo grueso en el antebrazo" },
  { src: i27, shape: "square", alt: "Calavera de catrina con rosas en realismo sobre el hombro" },
  { src: i26, shape: "tall", alt: "Rostro de Cristo con cruz y rayos de luz en el antebrazo" },
  { src: i10, shape: "portrait", alt: "Figura mitológica con greca en black & grey en el brazo" },
  { src: i29, shape: "square", alt: "Tortuga marina realista en la cadera" },
  { src: i20, shape: "tall", alt: "Figura femenina en black & grey sobre el brazo" },
  { src: i12, shape: "square", alt: "Corazón anatómico a color con flores naranjas en el brazo" },
  { src: i38, shape: "portrait", alt: "Retrato religioso con greca en la parte superior del brazo" },
  { src: i17, shape: "square", alt: "Lettering en el pecho con alas en trazo negro" },
  { src: i13, shape: "portrait", alt: "Pistón y velocímetro en realismo black & grey en el antebrazo" },
];
