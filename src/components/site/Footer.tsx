import { Link } from "@tanstack/react-router";
import { ArrowUp, ArrowUpRight, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { Marquee } from "@/components/motion/Marquee";
import { BrandLogo } from "@/components/site/BrandLogo";
import { contact } from "@/lib/contact";

const linkCls = "block w-fit text-night-muted transition-colors hover:text-night-foreground";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night text-night-foreground">
      <Marquee items={["Build", "Develop", "Apply", "Grow"]} className="border-b border-night-border text-night-foreground/15" />
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-gold/10 blur-3xl animate-glow" />

      {/* CTA band */}
      <div className="relative mx-auto max-w-7xl px-6 pt-16">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-night-border bg-night-2/40 p-8 md:flex-row md:items-center md:p-10">
          <div>
            <p className="eyebrow text-gold">Ready when you are</p>
            <h2 className="mt-2 text-3xl md:text-4xl">Start a project or plan your next career move.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/digital" hash="inquiry" className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-gold transition-transform duration-500 hover:-translate-y-0.5">
              Digital inquiry <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link to="/career" hash="inquiry" className="inline-flex items-center gap-2 rounded-full border border-night-border px-6 py-3 text-sm font-semibold transition-colors duration-500 hover:border-gold hover:text-gold">
              Career inquiry <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <BrandLogo size="footer" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-night-muted">
            Two specialist divisions under one roof: digital solutions for growing businesses and human-led career support for tech professionals targeting the USA, Canada and UK.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { label: "Chat on WhatsApp", href: contact.whatsappHref, Icon: MessageCircle, external: true },
              { label: "Email Nexoys", href: `mailto:${contact.email}`, Icon: Mail, external: false },
              { label: "Call Nexoys", href: contact.phoneHref, Icon: Phone, external: false },
            ].map(({ label, href, Icon, external }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                title={label}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-night-border transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-gold-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Digital Solutions" className="space-y-3 text-sm">
          <p className="eyebrow text-gold">Digital</p>
          <Link to="/digital" className={linkCls}>Overview</Link>
          <Link to="/digital" hash="services" className={linkCls}>Services</Link>
          <Link to="/digital" hash="process" className={linkCls}>How we work</Link>
          <Link to="/digital" hash="technology" className={linkCls}>Technology</Link>
          <Link to="/digital" hash="inquiry" className={linkCls}>Start a project</Link>
        </nav>

        <nav aria-label="Career Solutions" className="space-y-3 text-sm">
          <p className="eyebrow text-gold">Career</p>
          <Link to="/career" className={linkCls}>Overview</Link>
          <Link to="/career" hash="program-details" className={linkCls}>Programs</Link>
          <Link to="/career" hash="how-it-works" className={linkCls}>How it works</Link>
          <Link to="/career" hash="pricing" className={linkCls}>Plans &amp; pricing</Link>
          <Link to="/career" hash="inquiry" className={linkCls}>Book a consultation</Link>
        </nav>

        <div className="space-y-3 text-sm">
          <p className="eyebrow text-gold">Contact</p>
          <a href={`mailto:${contact.email}`} className="flex items-center gap-3 break-all transition-colors hover:text-gold">
            <Mail className="h-4 w-4 shrink-0 text-gold" /> {contact.email}
          </a>
          <a href={contact.phoneHref} className="flex items-center gap-3 transition-colors hover:text-gold">
            <Phone className="h-4 w-4 shrink-0 text-gold" /> {contact.phoneDisplay}
          </a>
          <span className="flex items-center gap-3 text-night-muted">
            <MapPin className="h-4 w-4 shrink-0 text-gold" /> {contact.regions}
          </span>
          <Link to="/career" hash="trust" className="mt-4 flex items-center gap-3 rounded-2xl border border-night-border p-3 transition-colors hover:border-gold">
            <ShieldCheck className="h-5 w-5 shrink-0 text-gold" />
            <span className="text-xs text-night-muted">Human-reviewed, honest job-search assistance</span>
          </Link>
        </div>
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-3 border-t border-night-border px-6 py-6 text-xs text-night-muted md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} Nexoys. All rights reserved.</span>
        <span>Nexoys does not guarantee interviews, offers or employment.</span>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex items-center gap-2 self-start rounded-full border border-night-border px-4 py-2 transition-colors hover:border-gold hover:text-gold md:self-auto"
        >
          Back to top <ArrowUp className="h-3.5 w-3.5" />
        </button>
      </div>
    </footer>
  );
}
