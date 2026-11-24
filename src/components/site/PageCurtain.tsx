import { AnimatePresence, motion } from "framer-motion";
import { useRouterState } from "@tanstack/react-router";

/** Navy + gold curtain that sweeps away on every page change. */
export function PageCurtain() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="pointer-events-none fixed inset-0 z-[100]">
        <motion.div
          className="absolute inset-0 bg-gradient-gold"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
          style={{ originY: 0 }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-night"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
          style={{ originY: 0 }}
        >
          <motion.img
            src="/nexoys-logo.svg"
            alt=""
            className="h-auto w-64 max-w-[75vw] object-contain"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
