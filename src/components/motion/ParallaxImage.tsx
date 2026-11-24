import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/** Image that reveals with a clip wipe, then drifts and zooms with scroll. */
export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  strength = 80,
  zoom = true,
  width,
  height,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  strength?: number;
  zoom?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], zoom ? [1.25, 1.1, 1.2] : [1.15, 1.15, 1.15]);

  // Observe the unclipped wrapper: a fully clipped element can report as not intersecting.
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const shown = reduce || inView || priority;

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-[inherit]"
        initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
        animate={shown ? { clipPath: "inset(0% 0% 0% 0%)" } : { clipPath: "inset(100% 0% 0% 0%)" }}
        transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1], delay: priority ? 0.6 : 0 }}
      >
        <motion.img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          style={reduce ? {} : { y, scale }}
          className={cn("h-full w-full object-cover", imgClassName)}
        />
      </motion.div>
    </div>
  );
}
