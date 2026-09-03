"use client";

/**
 * HeroClient — wraps all client-only hero elements:
 *  - HeroCanvas  (Three.js, dynamic/no-ssr)
 *  - HeroReveal  (GSAP entrance animation)
 */

import dynamic from "next/dynamic";
import HeroReveal from "./HeroReveal";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

export default function HeroClient() {
  return (
    <>
      {/* Three.js canvas sits in the background on desktop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-0 hidden md:block"
      >
        <HeroCanvas />
      </div>

      {/* GSAP scroll-reveal — renders nothing, just side-effects */}
      <HeroReveal />
    </>
  );
}
