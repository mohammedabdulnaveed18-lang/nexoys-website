import { createFileRoute } from "@tanstack/react-router";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  ArrowUpRight,
  Check,
  Code2,
  Gauge,
  Globe,
  LayoutTemplate,
  Link2,
  Mail,
  MessageCircle,
  MonitorSmartphone,
  Phone,
  Rocket,
  Server,
  Wrench,
} from "lucide-react";
import devImg from "@/assets/digital-developer.jpg";
import teamImg from "@/assets/digital-team.jpg";
import presentImg from "@/assets/digital-presenting.jpg";
import supportImg from "@/assets/home-hero-team.jpg";
import { DigitalInquiryForm } from "@/components/site/forms/DigitalInquiryForm";
import { contact } from "@/lib/contact";
import type { DigitalInquiry } from "@/lib/inquiries";
import { Button } from "@/components/ui/button";
import { Reveal, SplitText, staggerChild, staggerParent } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Marquee } from "@/components/motion/Marquee";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/digital")({
  validateSearch: (search: Record<string, unknown>) => {
    const out: { service?: string } = {};
    if (typeof search["service"] === "string") out.service = search["service"];
    return out;
  },
  head: () => ({
    meta: [
      { title: "Digital Solutions — Websites & Web Apps | Nexoys" },
      {
        name: "description",
        content:
          "Modern, responsive websites, landing pages and custom web applications designed and engineered around your business goals.",
      },
      { property: "og:title", content: "Digital Solutions | Nexoys" },
      {
        property: "og:description",
        content: "Turn your ideas into powerful digital experiences — design, frontend, backend, APIs and ongoing support.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DigitalPage,
});

const services: { icon: typeof Globe; title: string; text: string; service: DigitalInquiry["service"] }[] = [
  { icon: LayoutTemplate, title: "Website Design & Development", service: "Website Design & Development", text: "Professional websites designed around your brand, audience and business objectives — clear layouts, intuitive navigation and responsive experiences for desktop, tablet and mobile." },
  { icon: Globe, title: "Business Websites", service: "Business Website", text: "Establish a credible online presence with a structured website that explains your services, builds trust and makes it easy for customers to contact you." },
  { icon: Rocket, title: "Landing Page Development", service: "Landing Page", text: "Focused landing pages for products, services, campaigns and lead generation, with clear messaging and purposeful calls to action." },
  { icon: Code2, title: "Custom Web Applications", service: "Custom Web Application", text: "Purpose-built web applications tailored to your workflows, users and product requirements, from interface planning to application development." },
  { icon: MonitorSmartphone, title: "Frontend Development", service: "Frontend Development", text: "Responsive, accessible and user-friendly interfaces built to deliver consistent experiences across modern browsers and screen sizes." },
  { icon: Server, title: "Backend Development", service: "Backend Development", text: "Reliable server-side functionality, databases and integrations designed to support your application requirements and future growth." },
  { icon: Link2, title: "API Development & Integrations", service: "API Development & Integrations", text: "Connect platforms and services through well-structured APIs and integrations that help your systems exchange information efficiently." },
  { icon: Gauge, title: "Website Optimization", service: "Website Optimization", text: "Improve loading performance, usability, technical structure and search visibility foundations for a smoother visitor experience." },
  { icon: Wrench, title: "Maintenance & Support", service: "Maintenance & Support", text: "Keep your website current with updates, routine checks, issue resolution and ongoing technical assistance." },
];

const steps = [
  { no: "01", title: "Discover", role: "Project lead", quote: "We start by listening — your goals, your audience, and what success looks like for your business.", img: teamImg, pos: "object-[center_18%]", alt: "Team discussing a project around monitors" },
  { no: "02", title: "Design", role: "Product designer", quote: "Wireframes become polished interfaces. You see every screen before a single line of code ships.", img: presentImg, pos: "object-[center_35%]", alt: "Designer presenting wireframes to the team" },
  { no: "03", title: "Build", role: "Engineer", quote: "Clean, maintainable code — responsive frontends, reliable backends and well-structured APIs.", img: devImg, pos: "object-[center_30%]", alt: "Developer writing code at a laptop" },
  { no: "04", title: "Launch & Support", role: "Support team", quote: "We optimise, launch and keep your site healthy with updates, checks and ongoing assistance.", img: supportImg, pos: "object-[82%_22%]", alt: "Nexoys team ready to support your launch" },
];

const devicon = (p: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${p}`;
const stackA = [
  { name: "HTML", src: devicon("html5/html5-original.svg") },
  { name: "CSS", src: devicon("css3/css3-original.svg") },
  { name: "JavaScript", src: devicon("javascript/javascript-original.svg") },
  { name: "TypeScript", src: devicon("typescript/typescript-original.svg") },
  { name: "React", src: devicon("react/react-original.svg") },
  { name: "Angular", src: devicon("angularjs/angularjs-original.svg") },
  { name: "Java 17", src: devicon("java/java-original.svg") },
  { name: "REST APIs", src: "" },
];
const stackB = [
  { name: "Spring Boot", src: devicon("spring/spring-original.svg") },
  { name: "Spring MVC", src: devicon("spring/spring-original.svg") },
  { name: "Hibernate", src: devicon("hibernate/hibernate-original.svg") },
  { name: "MySQL", src: devicon("mysql/mysql-original.svg") },
  { name: "PostgreSQL", src: devicon("postgresql/postgresql-original.svg") },
  { name: "SQL Server", src: devicon("microsoftsqlserver/microsoftsqlserver-plain.svg") },
  { name: "Java", src: devicon("java/java-original.svg") },
];

const audience = [
  { title: "Startups", text: "Launching a new product or validating an idea." },
  { title: "Small & medium businesses", text: "Strengthening their online presence and customer experience." },
  { title: "Established teams", text: "Modernising existing websites and digital platforms." },
  { title: "Individuals & professionals", text: "Creating a polished and credible web presence." },
];

const codeLines = [
  "const site = await build({",
  "  design: 'on-brand',",
  "  responsive: true,",
  "  performance: 'fast',",
  "});",
  "deploy(site) // ✓ live",
];

function TypingCode() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((v) => (v >= codeLines.length + 3 ? 0 : v + 1)), 700);
    return () => clearInterval(id);
  }, []);
  return (
    <pre className="font-mono text-[0.7rem] leading-relaxed text-night-muted md:text-xs">
      {codeLines.map((l, i) => (
        <motion.div key={i} animate={{ opacity: i < n ? 1 : 0.12 }} className={cn(i === codeLines.length - 1 && "text-gold")}>
          <span className="mr-3 text-night-muted/40">{i + 1}</span>
          {l}
        </motion.div>
      ))}
    </pre>
  );
}

function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 18 });
  const tx = useSpring(useTransform(mx, [-0.5, 0.5], [-24, 24]), { stiffness: 80, damping: 20 });
  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  return (
    <section className="relative min-h-svh overflow-hidden bg-gradient-night pt-28 md:pt-32 text-night-foreground" onMouseMove={onMove}>
      <div className="pointer-events-none absolute inset-0 bg-tech-grid" />
      <div className="pointer-events-none absolute right-0 top-20 h-[30rem] w-[30rem] rounded-full bg-sky/20 blur-3xl animate-glow" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pb-20 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }} className="eyebrow flex items-center gap-3 text-gold">
            <span className="h-2 w-2 animate-pulse rounded-full bg-gold" /> Digital Solutions
          </motion.p>
          <h1 className="mt-6 text-4xl leading-[1.06] sm:text-5xl xl:text-6xl">
            <SplitText immediate delay={0.9} text="Turn your ideas into *powerful digital experiences.*" />
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.9 }} className="mt-6 max-w-xl text-lg text-night-muted">
            We design and develop modern, responsive websites and web applications that help you present your brand,
            serve your customers and support your business goals.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7, duration: 0.9 }} className="mt-10 flex flex-wrap gap-3">
            <Button asChild variant="gold" size="lg" className="group">
              <a href="#inquiry">Start a project <ArrowUpRight className="transition-transform duration-500 group-hover:rotate-45" /></a>
            </Button>
            <Button asChild variant="ghostLight" size="lg">
              <a href="#services">See what we build</a>
            </Button>
          </motion.div>
          <motion.div initial="hidden" animate="show" variants={staggerParent} className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-night-muted">
            {["Responsive by design", "Thoughtful engineering", "Built around your goals"].map((t) => (
              <motion.span key={t} variants={staggerChild} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-gold" /> {t}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <motion.div style={{ rotateX: rx, rotateY: ry }} className="relative [perspective:1200px]">
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.1 }}
            animate={{ clipPath: "inset(0% 0 0 0)", scale: 1 }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 1 }}
            className="relative mx-auto aspect-[4/5] max-h-[34rem] w-full max-w-md overflow-hidden rounded-[2rem] shadow-elegant lg:max-w-none"
          >
            <motion.img style={{ x: tx, scale: 1.12 }} src={devImg} alt="Developer building a responsive website" width={1600} height={1200} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-veil opacity-60" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }} className="glass-night absolute -left-4 bottom-10 w-64 rounded-2xl p-4 animate-float md:-left-12">
            <div className="mb-3 flex gap-1.5">
              <i className="h-2.5 w-2.5 rounded-full bg-gold" />
              <i className="h-2.5 w-2.5 rounded-full bg-night-muted/40" />
              <i className="h-2.5 w-2.5 rounded-full bg-night-muted/40" />
            </div>
            <TypingCode />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 }} className="glass-night absolute -right-2 top-8 flex items-center gap-3 rounded-2xl px-4 py-3 animate-float-slow xl:-right-6">
            <b className="font-display text-3xl text-gold">01</b>
            <span className="text-xs leading-tight">Responsive<br />experiences</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.2 }} className="glass-night absolute -right-2 bottom-36 flex items-center gap-3 rounded-2xl px-4 py-3 animate-float xl:-right-6">
            <b className="font-display text-3xl text-gold">02</b>
            <span className="text-xs leading-tight">Built to<br />perform</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Step({ step, index, onActive }: { step: (typeof steps)[number]; index: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);
  return (
    <div ref={ref} className="flex min-h-[60vh] flex-col justify-center py-10">
      <motion.div animate={{ opacity: inView ? 1 : 0.25, x: inView ? 0 : -10 }} transition={{ duration: 0.6 }}>
        <span className="font-mono text-sm text-gold">{step.no} / 04</span>
        <h3 className="mt-3 text-3xl md:text-4xl">{step.title}</h3>
        <div className="mt-6 flex gap-4">
          <span className="mt-1 h-auto w-px bg-gradient-gold" />
          <div>
            <p className="eyebrow text-night-muted">{step.role} says</p>
            <p className="mt-2 max-w-md text-lg leading-relaxed">“{step.quote}”</p>
          </div>
        </div>
        <div className="mt-8 overflow-hidden rounded-2xl lg:hidden">
          <img src={step.img} alt={step.alt} loading="lazy" className={cn("aspect-[4/3] w-full object-cover", step.pos)} />
        </div>
      </motion.div>
    </div>
  );
}

function HowWeWork() {
  const [active, setActive] = useState(0);
  const current = steps[active] ?? steps[0]!;
  return (
    <section id="process" className="relative bg-night text-night-foreground">
      <div className="mx-auto max-w-7xl px-6 pt-20 md:pt-24">
        <Reveal><p className="eyebrow text-gold">How we work</p></Reveal>
        <h2 className="mt-4 max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
          <SplitText text="Meet the people behind *every pixel.*" />
        </h2>
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-20 lg:grid-cols-2">
        <div className="relative hidden lg:block">
          <div className="sticky top-0 flex h-svh items-center">
            {/* Landscape frame so every team photo shows full faces; each step sets its own focal point. */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] shadow-elegant">
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={active}
                  src={current.img}
                  alt={current.alt}
                  initial={{ opacity: 0, scale: 1.12, clipPath: "inset(0 0 100% 0)" }}
                  animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0% 0)" }}
                  exit={{ opacity: 0, scale: 1 }}
                  transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
                  className={cn("absolute inset-0 h-full w-full object-cover", current.pos)}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-veil opacity-70" />
              <div className="glass-night absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl px-5 py-3">
                <span className="text-sm">{current.role}</span>
                <div className="flex gap-1.5">
                  {steps.map((s, i) => (
                    <span key={s.no} className={cn("h-1.5 rounded-full transition-all duration-500", i === active ? "w-8 bg-gold" : "w-1.5 bg-night-muted/40")} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {steps.map((s, i) => (
            <Step key={s.no} step={s} index={i} onActive={setActive} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ZoomStatement() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.55, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], ["3rem", "0rem"]);
  const textY = useTransform(scrollYProgress, [0.4, 1], [80, 0]);
  const textO = useTransform(scrollYProgress, [0.5, 1], [0, 1]);
  return (
    <section ref={ref} className="relative h-[160vh] bg-background">
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        <motion.div style={{ scale, borderRadius: radius }} className="relative h-full w-full overflow-hidden">
          <img src={presentImg} alt="Designer explaining website wireframes to her team" loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-veil" />
          <motion.div style={{ y: textY, opacity: textO }} className="absolute inset-x-0 bottom-0 mx-auto max-w-5xl px-6 pb-14 text-night-foreground md:pb-20">
            <p className="eyebrow text-gold">Who we work with</p>
            <h2 className="mt-4 text-3xl leading-[1.08] sm:text-4xl lg:text-5xl">
              Good digital experiences start with <em className="text-gradient-gold">understanding people.</em>
            </h2>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function StackChip({ name, src }: { name: string; src: string }) {
  return (
    <div className="mx-3 flex shrink-0 items-center gap-3 rounded-full border border-night-border bg-night-2/50 px-5 py-3 text-sm transition-all duration-500 hover:-translate-y-1 hover:border-gold">
      {src ? (
        <img src={src} alt={`${name} logo`} loading="lazy" width={28} height={28} className="h-7 w-7" />
      ) : (
        <span className="flex h-7 w-10 items-center justify-center rounded-md bg-gold font-mono text-[0.65rem] font-bold text-gold-foreground">API</span>
      )}
      <span className="font-medium">{name}</span>
    </div>
  );
}

function DigitalPage() {
  const { service } = Route.useSearch();
  return (
    <>
      <Hero />

      <Marquee
        items={["Websites", "Landing Pages", "Web Apps", "Frontend", "Backend", "APIs", "Optimization"]}
        className="border-y border-night-border bg-night text-night-foreground/80"
        separator="</>"
      />

      <HowWeWork />

      {/* Services */}
      <section id="services" className="relative scroll-mt-20 overflow-hidden bg-background py-20 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-paper-dots opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Reveal><p className="eyebrow text-primary/70">What we do</p></Reveal>
              <h2 className="mt-4 text-3xl text-primary sm:text-4xl lg:text-5xl">
                <SplitText text="Digital solutions, / *built around you.*" emClassName="italic text-gold" />
              </h2>
            </div>
            <Reveal delay={0.2}>
              <p className="max-w-sm text-muted-foreground">
                From your first website to a tailored web application, we bring design and engineering together.
              </p>
            </Reveal>
          </div>
          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px" }}
            className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {services.map(({ icon: Icon, title, text }, i) => (
              <motion.article key={title} variants={staggerChild} className="reveal-card group flex h-full flex-col rounded-3xl border bg-card p-8">
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground transition-all duration-500 group-hover:rotate-6 group-hover:bg-gold group-hover:text-gold-foreground">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="font-mono text-sm opacity-50">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-6 text-xl md:text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed opacity-75">{text}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tech stack */}
      <section id="technology" className="relative overflow-hidden bg-night py-20 md:py-24 text-night-foreground">
        <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-50" />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <Reveal><p className="eyebrow text-gold">Tools we build with</p></Reveal>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
            <SplitText text="Tech stack *expertise.*" />
          </h2>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-night-muted">
              We use the right tools for the job — balancing speed, security and maintainability.
            </p>
          </Reveal>
        </div>
        <div className="relative mt-16 space-y-5 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <div className="marquee">
            {[...stackA, ...stackA].map((t, i) => <StackChip key={i} {...t} />)}
          </div>
          <div className="marquee-reverse">
            {[...stackB, ...stackB].map((t, i) => <StackChip key={i} {...t} />)}
          </div>
        </div>
        <div className="relative mx-auto mt-16 grid max-w-6xl gap-6 px-6 md:grid-cols-2">
          <ParallaxImage src={teamImg} alt="Team reviewing a website build together" className="aspect-[4/5] rounded-[2rem]" width={1280} height={1600} />
          <div className="flex flex-col justify-center gap-6">
            <Reveal>
              <p className="text-xl leading-relaxed md:text-2xl">
                <span className="font-display text-gold">Frontend to database</span> — React, Angular and TypeScript
                interfaces on top of Java, Spring Boot and Hibernate services, backed by MySQL, PostgreSQL or SQL Server.
              </p>
            </Reveal>
            <ParallaxImage src={devImg} alt="Developer coding a responsive layout" className="aspect-[4/3] rounded-[2rem]" width={1600} height={1200} />
          </div>
        </div>
      </section>

      <ZoomStatement />

      {/* Audience */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-6">
          {audience.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.05}>
              <div className="group grid cursor-default items-center gap-4 border-b py-6 transition-colors duration-500 md:grid-cols-[80px_1fr_1fr]">
                <span className="font-mono text-sm text-gold">0{i + 1}</span>
                <h3 className="text-2xl text-primary transition-transform duration-500 group-hover:translate-x-4 md:text-3xl">{a.title}</h3>
                <p className="text-muted-foreground md:text-right">{a.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Inquiry */}
      <section id="inquiry" className="section-y relative overflow-hidden bg-gradient-night text-night-foreground">
        <div className="pointer-events-none absolute inset-0 bg-tech-grid" />
        <div className="pointer-events-none absolute -left-40 top-1/3 h-[28rem] w-[28rem] rounded-full border border-gold/20 animate-spin-slow" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Reveal><p className="eyebrow text-gold">Let's build something</p></Reveal>
            <h2 className="mt-4 text-3xl leading-[1.08] sm:text-4xl lg:text-5xl">
              <SplitText text="Have a digital project *in mind?*" />
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-md text-night-muted">
                Tell us what you are looking to build. We'll learn about your goals, discuss the scope and recommend a practical next step.
              </p>
              <ol className="mt-10 space-y-5">
                {["Share your goals and budget range", "We review scope and suggest an approach", "Agree the plan, then design & build begin"].map((t, i) => (
                  <li key={t} className="flex items-center gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/50 font-mono text-xs text-gold">0{i + 1}</span>
                    <span className="text-sm">{t}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-10 space-y-3 border-t border-night-border pt-8 text-sm">
                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 transition-colors hover:text-gold"><Mail className="h-4 w-4 text-gold" /> {contact.email}</a>
                <a href={contact.phoneHref} className="flex items-center gap-3 transition-colors hover:text-gold"><Phone className="h-4 w-4 text-gold" /> {contact.phoneDisplay}</a>
                <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-gold"><MessageCircle className="h-4 w-4 text-gold" /> Chat on WhatsApp</a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <DigitalInquiryForm defaultService={service} idPrefix="digital-page" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
