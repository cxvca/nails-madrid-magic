import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export const EASE = "expo.out";

/**
 * Splits an element's text into per-word spans (each wrapped in an
 * overflow-hidden mask) and returns the animatable inner spans.
 * Idempotent: a second call on the same element reuses the existing split.
 */
export function splitWords(el: HTMLElement): HTMLElement[] {
  if (el.dataset["split"] === "done") {
    return Array.from(el.querySelectorAll<HTMLElement>("[data-word-inner]"));
  }
  const source = el.textContent ?? "";
  const words = source.split(/\s+/).filter(Boolean);
  el.textContent = "";
  const inners: HTMLElement[] = [];
  words.forEach((word, i) => {
    const mask = document.createElement("span");
    mask.style.display = "inline-block";
    mask.style.overflow = "hidden";
    mask.style.verticalAlign = "top";
    mask.style.paddingBottom = "0.06em";
    // Spanish caps carry accents above the cap height; grow the mask upward so
    // Á / Í / Ó are never clipped, then pull it back so layout is unchanged.
    mask.style.paddingTop = "0.18em";
    mask.style.marginTop = "-0.18em";
    const inner = document.createElement("span");
    inner.setAttribute("data-word-inner", "");
    inner.style.display = "inline-block";
    inner.textContent = word;
    mask.appendChild(inner);
    el.appendChild(mask);
    if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
    inners.push(inner);
  });
  el.dataset["split"] = "done";
  return inners;
}
