import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Clock, Globe2, Mail, MessageCircle, Phone } from "lucide-react";
import { SplitText } from "@/components/motion/Reveal";
import { Reveal } from "@/components/motion/Reveal";
import { InquiryTabs, type InquiryType } from "@/components/site/forms/InquiryTabs";
import { contact } from "@/lib/contact";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>) => {
    const out: { type?: InquiryType } = {};
    const t = search["type"];
    if (t === "career" || t === "digital") out.type = t;
    return out;
  },
  head: () => ({
    meta: [
      { title: "Contact Nexoys — Digital & Career Inquiries" },
      {
        name: "description",
        content: "Send a Digital Solutions project inquiry or request a Career Solutions consultation. Reach Nexoys by email, phone or WhatsApp.",
      },
      { property: "og:title", content: "Contact Nexoys" },
      { property: "og:description", content: "Start a website project or plan your next career move — two dedicated inquiry forms." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const channels = [
  { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { icon: Phone, label: "Phone", value: contact.phoneDisplay, href: contact.phoneHref },
  { icon: MessageCircle, label: "WhatsApp", value: "Message us on WhatsApp", href: contact.whatsappHref, external: true },
  { icon: Globe2, label: "Regions we support", value: contact.regions },
];

function ContactPage() {
  const { type = "digital" } = Route.useSearch();
  const navigate = useNavigate({ from: "/contact" });

  return (
    <section className="relative overflow-hidden bg-gradient-night pb-20 pt-32 md:pb-24 text-night-foreground">
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-40" />
      <div className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-gold/15 blur-3xl animate-glow" />
      <div className="relative mx-auto grid max-w-7xl gap-x-14 gap-y-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:grid-rows-[auto_1fr]">
        <div className="lg:col-start-1 lg:row-start-1">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="eyebrow text-gold">
            Contact us
          </motion.p>
          <h1 className="mt-5 text-4xl leading-[1.06] sm:text-5xl">
            <SplitText immediate delay={0.9} text="Let's talk about *what's next.*" />
          </h1>
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-md text-lg text-night-muted">
              Choose the division you need. Each form goes straight to the right team, so we can come back to you with a relevant next step.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.2} className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <InquiryTabs value={type} onChange={(v) => navigate({ search: { type: v }, replace: true, resetScroll: false })} idPrefix="contact" />
        </Reveal>
        <div className="lg:col-start-1 lg:row-start-2">
          <div className="space-y-3">
            {channels.map(({ icon: Icon, label, value, href, external }, i) => {
              const body = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-gold-foreground">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-xs text-night-muted">{label}</span>
                    <span className="block break-all font-semibold">{value}</span>
                  </span>
                </>
              );
              return (
                <Reveal key={label} delay={0.35 + i * 0.07}>
                  {href ? (
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-center gap-4 rounded-2xl border border-night-border p-4 transition-all duration-500 hover:-translate-y-0.5 hover:border-gold"
                    >
                      {body}
                    </a>
                  ) : (
                    <div className="group flex items-center gap-4 rounded-2xl border border-night-border p-4">{body}</div>
                  )}
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={0.7}>
            <p className="mt-8 flex items-start gap-3 text-sm text-night-muted">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              Not sure which division fits? Choose the closest option and tell us your goal — we'll guide you to the right service.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
