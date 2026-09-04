"use client";

import dynamic from "next/dynamic";

const Hero3D = dynamic(() => import("@/components/Hero3D"), {
  ssr: false,
  loading: () => null,
});

export default function Hero3DWrapper({ className = "" }: { className?: string }) {
  return <Hero3D className={className} />;
}
