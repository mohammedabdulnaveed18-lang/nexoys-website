import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { BrandLogo } from "@/components/site/BrandLogo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavItem = { label: string; to: "/" | "/career" | "/digital" | "/contact"; hash?: string };

const nav: NavItem[] = [
  { label: "About", to: "/", hash: "about" },
  { label: "Digital Solutions", to: "/digital" },
  { label: "Career Solutions", to: "/career" },
  { label: "Process", to: "/", hash: "process" },
  { label: "FAQ", to: "/", hash: "faq" },
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isCareer = pathname.startsWith("/career");
  const isDigital = pathname.startsWith("/digital");

  const tagline = isCareer
    ? "Your Career, Your Next Opportunity"
    : isDigital
      ? "Your Vision, Our Digital Creation"
      : null;

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full px-4 py-2.5 text-night-foreground transition-all duration-500 md:px-6 2xl:max-w-[96rem]",
          scrolled || isCareer ? "glass-night shadow-elegant" : "border border-transparent",
        )}
      >
        <BrandLogo tagline={tagline} size="header" />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((item) => {
            const active = !item.hash && pathname === item.to;
            return (
              <Link
                key={item.label}
                to={item.to}
                {...(item.hash ? { hash: item.hash } : {})}
                className={cn(
                  "relative whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors",
                  "after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-500 hover:after:scale-x-100",
                  active && "text-gold after:scale-x-100",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="gold" size="sm" className="hidden h-10 px-5 sm:inline-flex">
            <Link to="/contact">Get Started</Link>
          </Button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-current/20 lg:hidden"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="glass-night mx-auto mt-3 max-w-7xl rounded-3xl p-6 text-night-foreground lg:hidden"
            aria-label="Mobile"
          >
            {nav.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
              >
                <Link
                  to={item.to}
                  {...(item.hash ? { hash: item.hash } : {})}
                  onClick={() => setOpen(false)}
                  className="block border-b border-night-border py-3 font-display text-2xl transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <Button asChild variant="gold" size="xl" className="mt-6 w-full">
              <Link to="/contact" onClick={() => setOpen(false)}>Get Started</Link>
            </Button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
