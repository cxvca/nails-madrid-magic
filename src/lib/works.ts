import setBlack from "@/assets/image.png.asset.json";
import setPink from "@/assets/image-2.png.asset.json";
import setPastel from "@/assets/image-3.png.asset.json";
import setTeal from "@/assets/image-4.png.asset.json";
import chrome from "@/assets/chrome-macro.jpg.asset.json";
import handpainted from "@/assets/handpainted.jpg.asset.json";
import sculpted from "@/assets/sculpted-macro.jpg.asset.json";
import extensions from "@/assets/extensions.jpg.asset.json";
import minimalGold from "@/assets/minimal-gold.jpg.asset.json";
import studio from "@/assets/studio-process.jpg.asset.json";
import aurora from "@/assets/aurora.jpg.asset.json";
import moodboard from "@/assets/moodboard.jpg.asset.json";

export const img = {
  setBlack: setBlack.url,
  setPink: setPink.url,
  setPastel: setPastel.url,
  setTeal: setTeal.url,
  chrome: chrome.url,
  handpainted: handpainted.url,
  sculpted: sculpted.url,
  extensions: extensions.url,
  minimalGold: minimalGold.url,
  studio: studio.url,
  aurora: aurora.url,
  moodboard: moodboard.url,
};

export type Work = {
  id: string;
  name: string;
  category: string;
  src: string;
  alt: string;
  description: string;
  shape: string;
  duration: string;
  /** Span in the editorial grid: how the piece is cropped and placed. */
  span: "tall" | "wide" | "bleed" | "small";
};

export const works: Work[] = [
  {
    id: "humo-negro",
    name: "Humo Negro",
    category: "Escultural",
    src: img.setBlack,
    alt: "Set de uñas stiletto extralargas en negro y plata con vetas marmoleadas pintadas a mano y un corazón de cristales y perlas",
    description:
      "Stiletto extralargo, marmoleado y humo pintado a mano línea por línea, con un corazón de cristales y perlas montado a mano como centro del set.",
    shape: "Stiletto extralargo",
    duration: "aprox. 4 h",
    span: "tall",
  },
  {
    id: "flor-de-yeso",
    name: "Flor de Yeso",
    category: "3D / Escultural",
    src: img.setPink,
    alt: "Set coffin en rosa y blanco con flores 3D esculpidas, pan de oro y purpurina",
    description:
      "Flores esculpidas en gel una a una sobre la uña, pan de oro aplicado en lámina y French difuminado con purpurina rosa.",
    shape: "Coffin largo",
    duration: "aprox. 4,5 h",
    span: "small",
  },
  {
    id: "jardin-templado",
    name: "Jardín Templado",
    category: "Pintado a mano",
    src: img.setPastel,
    alt: "Set almendra con flores pintadas a mano en amarillo y rosa y microperlas doradas",
    description:
      "Florales pintados a mano con pincel fino sobre base natural, microperlado dorado colocado pieza por pieza.",
    shape: "Almendra",
    duration: "aprox. 3,5 h",
    span: "wide",
  },
  {
    id: "mariposa-turquesa",
    name: "Mariposa Turquesa",
    category: "Statement",
    src: img.setTeal,
    alt: "Set stiletto en degradado turquesa con línea negra fina y mariposas de cristal y oro",
    description:
      "Degradado turquesa con línea negra trazada a mano y mariposas de cristal y oro fijadas sobre la lámina.",
    shape: "Stiletto",
    duration: "aprox. 4 h",
    span: "tall",
  },
  {
    id: "espejo",
    name: "Espejo",
    category: "Chrome",
    src: img.chrome,
    alt: "Primer plano macro de una uña stiletto con acabado cromo espejo",
    description:
      "Cromo espejo pulido hasta que la uña refleja la habitación. Acabado sin una sola marca.",
    shape: "Stiletto extralargo",
    duration: "aprox. 2,5 h",
    span: "small",
  },
  {
    id: "retablo",
    name: "Retablo",
    category: "Pintado a mano",
    src: img.handpainted,
    alt: "Set de uñas extralargas con miniaturas pintadas a mano en rojo y oro",
    description:
      "Miniaturas pintadas a mano, una escena distinta por uña, con relieve dorado y acabado en varias capas.",
    shape: "Stiletto extralargo",
    duration: "aprox. 6 h",
    span: "bleed",
  },
  {
    id: "perla",
    name: "Perla",
    category: "3D / Escultural",
    src: img.sculpted,
    alt: "Macro de flores blancas esculpidas, perlas y cristales sobre una uña nude",
    description:
      "Flores esculpidas, perlas y cristales colocados uno a uno sobre base nude lechosa.",
    shape: "Almendra larga",
    duration: "aprox. 4 h",
    span: "wide",
  },
  {
    id: "obsidiana",
    name: "Obsidiana",
    category: "Extensiones",
    src: img.extensions,
    alt: "Set duck extralargo en negro brillante con foil plateado y charms de cristal",
    description:
      "Extensión duck extralarga, negro espejo con foil plateado y charms de cristal colgando de la punta.",
    shape: "Duck extralargo",
    duration: "aprox. 5 h",
    span: "tall",
  },
  {
    id: "aurora",
    name: "Aurora",
    category: "Chrome",
    src: img.aurora,
    alt: "Set stiletto extralargo con cromo iridiscente y línea negra fina",
    description:
      "Cromo iridiscente con línea negra fina que sigue la curva de cada extensión.",
    shape: "Stiletto extralargo",
    duration: "aprox. 3,5 h",
    span: "small",
  },
  {
    id: "leche-y-oro",
    name: "Leche y Oro",
    category: "BIAB / Gel",
    src: img.minimalGold,
    alt: "Set square en nude lechoso con escamas de pan de oro",
    description:
      "Nude lechoso sobre BIAB con escamas de pan de oro. Lo discreto también se trabaja a mano.",
    shape: "Square medio",
    duration: "aprox. 2 h",
    span: "wide",
  },
];
