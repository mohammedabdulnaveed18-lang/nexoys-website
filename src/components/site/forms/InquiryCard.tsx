import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Mail, MessageCircle, RotateCcw } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contact } from "@/lib/contact";

export function InquiryCard({
  icon: Icon,
  eyebrow,
  title,
  subtitle,
  reference,
  successTitle,
  successText,
  onReset,
  children,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  subtitle: string;
  reference: string | null;
  successTitle: string;
  successText: string;
  onReset: () => void;
  children: ReactNode;
}) {
  return (
    <div className="glass-night relative rounded-[2rem] p-6 text-night-foreground shadow-elegant sm:p-8 md:p-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]"><div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gold/10 blur-3xl" /></div>
      <AnimatePresence mode="wait" initial={false}>
        {reference ? (
          <motion.div
            key="done"
            role="status"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex min-h-[28rem] flex-col items-center justify-center text-center"
          >
            <motion.span
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-gold text-gold-foreground shadow-gold"
            >
              <CheckCircle2 className="h-9 w-9" />
            </motion.span>
            <h3 className="mt-8 text-3xl md:text-4xl">{successTitle}</h3>
            <p className="mt-3 max-w-md text-night-muted">{successText}</p>
            <p className="mt-6 rounded-full border border-night-border px-4 py-2 font-mono text-xs tracking-widest text-gold">
              Reference · {reference}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button type="button" variant="ghostLight" size="lg" className="rounded-full" onClick={onReset}>
                <RotateCcw /> Send another request
              </Button>
              <Button asChild variant="gold" size="lg" className="rounded-full">
                <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer">
                  <MessageCircle /> Chat on WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: 20 }} className="relative">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold/15 text-gold">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="eyebrow text-gold">{eyebrow}</p>
                <h3 className="mt-1 text-2xl md:text-3xl">{title}</h3>
                <p className="mt-1 text-sm text-night-muted">{subtitle}</p>
              </div>
            </div>
            <div className="mt-8">{children}</div>
            <p className="mt-5 flex items-center gap-2 text-xs text-night-muted">
              <Mail className="h-3.5 w-3.5 text-gold" /> Prefer email? Write to{" "}
              <a href={`mailto:${contact.email}`} className="text-night-foreground underline-offset-4 hover:text-gold hover:underline">
                {contact.email}
              </a>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
