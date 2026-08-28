import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion, registerGsap, splitWords } from "@/lib/motion";

/**
 * Scroll-triggered reveal. Children render in their final state on the server
 * and for reduced-motion users; GSAP only animates when motion is allowed.
 */
export function Reveal({
  children,
  className,
  y = 34,
  stagger = 0.09,
  selector = "[data-reveal]",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  stagger?: number;
  selector?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const targets = el.querySelectorAll(selector);
    if (!targets.length) return;

    const tween = gsap.fromTo(
      targets,
      { y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [y, stagger, selector]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Word-by-word masked headline reveal on scroll. */
export function SplitHeading({
  text,
  className,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const words = splitWords(el);
    const tween = gsap.fromTo(
      words,
      { yPercent: 115 },
      {
        yPercent: 0,
        duration: 1.3,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [text]);

  return (
    <Tag ref={ref} className={className}>
      {text}
    </Tag>
  );
}

/** Image that reveals behind a wiping mask and settles from a slight scale. */
export function MaskedImage({
  src,
  alt,
  className,
  imgClassName,
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  width: number;
  height: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const image = el.querySelector("img");
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
      defaults: { ease: "expo.out" },
    });
    tl.fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4 });
    if (image) tl.fromTo(image, { scale: 1.18 }, { scale: 1, duration: 1.8 }, 0);
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={ref} className={`mask-reveal ${className ?? ""}`}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className={imgClassName ?? "h-full w-full object-cover"}
      />
    </div>
  );
}
