import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "article" | "section" | "span";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </Comp>
  );
}

const wordVariants: Variants = {
  hidden: { y: "110%", rotate: 4 },
  show: (i: number) => ({
    y: "0%",
    rotate: 0,
    transition: { duration: 0.9, ease, delay: i * 0.06 },
  }),
};

/** Word-by-word masked text reveal. Wrap emphasized words with *asterisks*. */
export function SplitText({
  text,
  className,
  emClassName = "italic text-gradient-gold",
  immediate = false,
  delay = 0,
}: {
  text: string;
  className?: string;
  emClassName?: string;
  immediate?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const tokens = text.split(" ");
  let emph = false;
  const show = immediate || inView;
  return (
    <span ref={ref} className={cn("inline", className)} aria-label={text.replace(/\*/g, "")}>
      {tokens.map((raw, i) => {
        if (raw === "/") return <br key={i} />;
        let word = raw;
        const starts = word.startsWith("*");
        if (starts) {
          emph = true;
          word = word.slice(1);
        }
        const ends = word.endsWith("*");
        if (ends) word = word.slice(0, -1);
        const isEm = emph;
        if (ends) emph = false;
        return (
          <span
            key={i}
            aria-hidden
            className="inline-block overflow-hidden pb-[0.12em] align-bottom -mb-[0.12em]"
          >
            <motion.span
              className={cn("inline-block", isEm && emClassName)}
              variants={wordVariants}
              custom={i + delay * 16}
              initial={reduce ? false : "hidden"}
              animate={show ? "show" : "hidden"}
            >
              {word}
              {i < tokens.length - 1 ? "\u00a0" : ""}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease } },
};
