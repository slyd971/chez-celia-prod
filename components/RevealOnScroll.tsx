"use client";

import { useEffect } from "react";

// Apparitions douces au scroll : pose l'attribut `data-visible` sur les
// éléments [data-reveal] quand ils entrent à l'écran. Sans JS (ou avec
// prefers-reduced-motion), tout reste visible : voir globals.css.
//
// Un attribut plutôt qu'une classe : React réécrit `className` quand un
// composant change d'état (ex. carte vidéo « is-active ») et effacerait une
// classe ajoutée ici, ce qui refaisait disparaître l'élément.
export function RevealOnScroll() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.setAttribute("data-visible", ""));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
