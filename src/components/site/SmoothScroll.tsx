import { useEffect } from "react";
import Lenis from "lenis";

/** Buttery inertial scrolling. Skipped for users who prefer reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.09, anchors: { offset: -80 } });
    return () => lenis.destroy();
  }, []);
  return null;
}
