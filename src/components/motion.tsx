"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR =
  ".section-heading, .collection-card, .story-copy, .story-image, .steps article, .final-cta h2";

// React tags every DOM node with a __reactFiber$ key once it has hydrated it.
const isHydrated = (el: Element) =>
  Object.keys(el).some((key) => key.startsWith("__reactFiber$"));

// One observer for the page; content remains visible without JavaScript.
export function Motion() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let observer: IntersectionObserver | undefined;
    let timer: number | undefined;
    let elements: HTMLElement[] = [];
    let attempts = 0;

    const start = () => {
      elements = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
      // Adding classes before React hydrates an element causes a hydration mismatch,
      // so wait until every target has been hydrated.
      if (!elements.every(isHydrated) && attempts++ < 60) {
        timer = window.setTimeout(start, 50);
        return;
      }
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries)
            if (entry.isIntersecting) {
              entry.target.classList.add("is-revealed");
              io.unobserve(entry.target);
            }
        },
        { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
      );
      observer = io;
      for (const element of elements)
        if (element.getBoundingClientRect().top > window.innerHeight) {
          element.classList.add("will-reveal");
          io.observe(element);
        }
    };
    start();

    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
      for (const element of elements)
        element.classList.remove("will-reveal", "is-revealed");
    };
  }, [pathname]);
  return null;
}
