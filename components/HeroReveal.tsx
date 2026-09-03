"use client";

/**
 * HeroReveal — GSAP-powered fade + translateY entrance animation
 * for the hero headline, subheadline, and CTAs.
 *
 * Runs once on mount. Targets class selectors inside .hero-content.
 */

import { useEffect } from "react";

export default function HeroReveal() {
  useEffect(() => {
    // Dynamic import keeps GSAP out of the SSR bundle
    import("gsap").then(({ gsap }) => {
      // Set initial hidden state
      gsap.set(".hero-eyebrow", { opacity: 0, y: 24 });
      gsap.set(".hero-headline", { opacity: 0, y: 32 });
      gsap.set(".hero-sub",      { opacity: 0, y: 24 });
      gsap.set(".hero-ctas",     { opacity: 0, y: 20 });

      const tl = gsap.timeline({ delay: 0.15 });

      tl.to(".hero-eyebrow", {
        opacity:  1,
        y:        0,
        duration: 0.6,
        ease:     "power3.out",
      })
        .to(".hero-headline", {
          opacity:  1,
          y:        0,
          duration: 0.75,
          ease:     "power3.out",
        }, "-=0.35")
        .to(".hero-sub", {
          opacity:  1,
          y:        0,
          duration: 0.6,
          ease:     "power3.out",
        }, "-=0.45")
        .to(".hero-ctas", {
          opacity:  1,
          y:        0,
          duration: 0.55,
          ease:     "power3.out",
        }, "-=0.35");
    });
  }, []);

  return null; // renders nothing, only side effects
}
