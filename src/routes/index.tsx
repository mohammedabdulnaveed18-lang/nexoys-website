import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ClipboardList,
  Code2,
  Compass,
  Handshake,
  HeartHandshake,
  Layers,
  Mail,
  MessageCircle,
  Phone,
  Plus,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import heroImg from "@/assets/home-hero-office.jpg";
import digitalImg from "@/assets/digital-team.jpg";
import careerImg from "@/assets/career-consultant.jpg";
import aboutImg from "@/assets/career-interview-prep.jpg";
import { Button } from "@/components/ui/button";
import { Reveal, SplitText, staggerChild, staggerParent } from "@/components/motion/Reveal";
import { ScrollFillText } from "@/components/motion/ScrollFillText";
import { Marquee } from "@/components/motion/Marquee";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { InquiryTabs, type InquiryType } from "@/components/site/forms/InquiryTabs";
import { contact } from "@/lib/contact";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nexoys — Digital & Career Solutions" },
      {
        name: "description",
        content:
          "One platform, two pathways: modern websites and web apps for businesses, and a managed job search for tech professionals.",
      },
      { property: "og:title", content: "Nexoys — Digital & Career Solutions" },
      {
        property: "og:description",
        content: "Build powerful digital experiences or sprint to your next job opportunity with Nexoys.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const paths = [
  {
    key: "digital" as const,
    to: "/digital" as const,
    eyebrow: "Pathway 01",
    title: "Digital Solutions",
    sub: "Website design & development",
    img: digitalImg,
    icon: Code2,
    points: ["Business websites & landing pages", "Custom web applications", "Optimization & maintenance"],
    cta: "Build your website",
  },
  {
    key: "career" as const,
    to: "/career" as const,
    eyebrow: "Pathway 02",
    title: "Career Solutions",
    sub: "Job application & career support",
    img: careerImg,
    icon: Compass,
    points: ["Resume & LinkedIn profile build", "Targeted job matching & applications", "Interview preparation & tracking"],
    cta: "Boost your career",
  },
];

/** Smoothly scroll to a section on this page, leaving room for the fixed header. */
function scrollToSection(e: ReactMouseEvent<HTMLAnchorElement>, id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  window.history.replaceState(null, "", `#${id}`);
}

function HeroSplit() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [ready, setReady] = useState(false);
  const [hover, setHover] = useState<"digital" | "career" | null>(null);
  useMotionValueEvent(p, "change", (v) => setReady(v > 0.55));

  const bgScale = useTransform(p, [0, 0.5], [1, 1.25]);
  const bgOpacity = useTransform(p, [0, 0.45], [1, 0.2]);
  const copyY = useTransform(p, [0, 0.3], [0, -60]);
  const copyOpacity = useTransform(p, [0, 0.22], [1, 0]);
  const copyBlur = useTransform(p, [0, 0.25], ["blur(0px)", "blur(12px)"]);
  const leftClip = useTransform(p, [0.25, 0.6], ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  const rightClip = useTransform(p, [0.25, 0.6], ["inset(0% 0% 0% 100%)", "inset(0% 0% 0% 0%)"]);
  const panelImgScale = useTransform(p, [0.25, 0.75], [1.5, 1.05]);
  const hint = useTransform(p, [0, 0.08], [1, 0]);

  return (
    <section ref={ref} className="relative h-[280vh] bg-night text-night-foreground">
      <div id="solutions" className="absolute left-0 top-[62%] scroll-mt-0" aria-hidden />
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Background */}
        <motion.div style={{ scale: bgScale, opacity: bgOpacity }} className="absolute inset-x-0 top-0 h-[56%] md:h-[64%] lg:inset-0 lg:h-full">
          <img
            src={heroImg}
            alt="Two Nexoys professionals working in a high-rise office overlooking the city at night"
            width={1920}
            height={1088}
            fetchPriority="high"
            className="h-full w-full object-cover object-[52%_center] lg:object-left 2xl:object-center"
          />
          <div className="absolute inset-0 bg-veil-hero" />
        </motion.div>
        <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-gold/15 blur-3xl animate-glow" />

        {/* Hero copy */}
        <motion.div
          style={{ y: copyY, opacity: copyOpacity, filter: copyBlur }}
          className="relative z-10 flex h-full flex-col justify-end px-4 pb-10 pt-28 md:px-6 md:pb-14 lg:justify-center lg:pb-12"
        >
          <div className="mx-auto w-full max-w-7xl px-2 md:px-6 2xl:max-w-[96rem]">
          <div className="max-w-xl lg:max-w-md">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0.28em" }}
            transition={{ duration: 1.4, delay: 0.8 }}
            className="eyebrow text-gold"
          >
            Build · Develop · Apply · Grow
          </motion.p>
          <h1 className="mt-5 text-4xl leading-[1.05] sm:text-5xl xl:text-6xl">
            <SplitText immediate delay={0.9} text="One platform. / Two pathways to *your growth.*" />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="mt-5 max-w-md text-base text-night-muted md:text-lg"
          >
            We help businesses build powerful digital experiences and empower individuals to find, apply and succeed in
            the right job opportunities.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button asChild variant="gold" size="lg" className="group">
              <a href="#solutions" onClick={(e) => scrollToSection(e, "solutions")}>
                Explore our services <ArrowDown className="transition-transform duration-500 group-hover:translate-y-1" />
              </a>
            </Button>
            <Button asChild variant="ghostLight" size="lg" className="group hover:-translate-y-0.5">
              <a href="#contact" onClick={(e) => scrollToSection(e, "contact")}>
                Talk to our team <ArrowRight className="transition-transform duration-500 group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>
          </div>
          </div>
        </motion.div>

        <motion.div style={{ opacity: hint }} className="absolute bottom-6 right-6 z-10 hidden text-center lg:block lg:right-12">
          <p className="eyebrow text-night-muted">Scroll to choose your path</p>
          <div className="mx-auto mt-3 h-10 w-px overflow-hidden bg-night-border">
            <motion.div
              className="h-1/2 w-full bg-gold"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* Split panels */}
        {/* Panels stay click-through until revealed, so the hero buttons underneath remain usable. */}
        <div
          className={cn("absolute inset-0 z-20 flex flex-col md:flex-row", !ready && "pointer-events-none")}
          onMouseLeave={() => setHover(null)}
        >
          {paths.map((path, idx) => {
            const Icon = path.icon;
            const dim = hover && hover !== path.key;
            return (
              <motion.div
                key={path.key}
                style={{ clipPath: idx === 0 ? leftClip : rightClip }}
                onMouseEnter={() => setHover(path.key)}
                className={cn(
                  "relative isolate flex-1 overflow-hidden",
                  !ready && "pointer-events-none",
                )}
              >
                <Link to={path.to} className="group absolute inset-0 block overflow-hidden" aria-label={`Enter ${path.title}`}>
                  {/* Hover zoom stays inside this panel: clipped wrapper, zoom layer, then scroll-scaled photo.
                      Panels under the fixed header start below it so faces are never hidden behind the nav. */}
                  <div
                    className={cn(
                      "absolute inset-x-0 bottom-0 z-0 overflow-hidden bg-night",
                      idx === 0 ? "top-20" : "top-0 md:top-20",
                    )}
                  >
                    <div className="h-full w-full origin-[50%_18%] transition-transform duration-300 ease-[ease] will-change-transform group-hover:scale-[1.06]">
                      <motion.img
                        src={path.img}
                        alt={path.key === "digital" ? "Team designing a website in a modern office" : "Career consultant explaining Nexoys services"}
                        width={1280}
                        height={1600}
                        style={{ scale: panelImgScale }}
                        className={cn(
                          "h-full w-full origin-[50%_18%] object-cover transition-[filter] duration-700 group-hover:brightness-110",
                          path.key === "digital" ? "object-[28%_0%]" : "object-[46%_0%]",
                        )}
                      />
                    </div>
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-night to-transparent" />
                  </div>
                  <div
                    className={cn(
                      "absolute inset-0 z-[1] bg-veil transition-opacity duration-700",
                      dim ? "opacity-100" : "opacity-80 group-hover:opacity-60",
                    )}
                  />
                  <div className={cn("absolute inset-0 z-[1] bg-night/60 transition-opacity duration-700", dim ? "opacity-100" : "opacity-0")} />

                  <motion.div
                    variants={staggerParent}
                    initial="hidden"
                    animate={ready ? "show" : "hidden"}
                    className="relative z-10 flex h-full flex-col justify-end p-6 pb-7 sm:p-10 lg:p-12"
                  >
                    <motion.div variants={staggerChild} className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 text-gold transition-all duration-500 group-hover:rotate-12 group-hover:bg-gold group-hover:text-gold-foreground">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="eyebrow text-gold">{path.eyebrow}</span>
                    </motion.div>
                    <motion.h2 variants={staggerChild} className="mt-3 text-3xl leading-none sm:mt-4 sm:text-4xl xl:text-5xl">
                      {path.title}
                    </motion.h2>
                    <motion.p variants={staggerChild} className="mt-2 text-night-muted sm:mt-3">
                      {path.sub}
                    </motion.p>
                    <motion.ul variants={staggerChild} className="mt-5 hidden space-y-2 text-sm sm:[@media(min-height:720px)]:block">
                      {path.points.map((pt) => (
                        <li key={pt} className="flex items-center gap-3">
                          <span className="h-px w-6 bg-gold transition-all duration-500 group-hover:w-10" />
                          {pt}
                        </li>
                      ))}
                    </motion.ul>
                    <motion.span
                      variants={staggerChild}
                      className="mt-4 inline-flex w-fit items-center gap-3 rounded-full border border-night-border px-5 py-2.5 sm:mt-6 text-sm font-semibold transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-gold-foreground"
                    >
                      {path.cta}
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                    </motion.span>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const facts: { value?: string; icon?: typeof Rocket; label: string; text: string }[] = [
  { value: "2", label: "Specialist divisions", text: "Digital Solutions and Career Solutions, each with its own team and process." },
  { value: "3", label: "Target job markets", text: "Career support focused on the USA, Canada and the UK." },
  {
    icon: Rocket,
    label: "Managed Job Search Sprint",
    text: "A guided, end-to-end job search with tailored applications, tracking and interview support.",
  },
];

const reasons = [
  { icon: Layers, title: "Two specialists, one partner", text: "Build your digital presence and grow your career with a team that understands both technology and hiring." },
  { icon: ShieldCheck, title: "Honest by design", text: "No fabricated experience, no inflated promises. We never guarantee interviews or offers — we guarantee effort and transparency." },
  { icon: HeartHandshake, title: "Human-reviewed quality", text: "AI-assisted workflows always pass through human quality control before anything reaches an employer or goes live." },
  { icon: Target, title: "Built around your goals", text: "Every website and every job search starts with your objectives, audience and constraints — not a template." },
  { icon: Sparkles, title: "Modern technology", text: "React, TypeScript, Java and Spring Boot on the build side; ATS-aligned resumes and LinkedIn on the career side." },
  { icon: ClipboardList, title: "Clear reporting", text: "Weekly progress reports for career clients and clear milestones for digital projects, so you always know where things stand." },
];

const process = [
  { icon: Mail, title: "Share your goals", text: "Send a Digital or Career inquiry with the essentials — it takes about two minutes." },
  { icon: Handshake, title: "Consultation", text: "We review your request, confirm scope or target roles, and recommend the right service or plan." },
  { icon: Rocket, title: "Focused delivery", text: "We design and build your project, or run your managed job search with tailored applications." },
  { icon: ShieldCheck, title: "Review & support", text: "Regular check-ins, progress reports, launch support and interview preparation where it applies." },
];

const faqs = [
  ["What does Nexoys do?", "We run two divisions. Digital Solutions designs and develops websites, landing pages and web applications. Career Solutions helps tech professionals with resumes, LinkedIn, job matching, applications and interview preparation."],
  ["Which form should I use?", "Use the Digital Solutions form for websites, web apps and technical projects. Use the Career Solutions form for job-search and career support. If you need both, send both — each goes to its own team."],
  ["Do you guarantee interviews or a job offer?", "No. Nexoys does not guarantee interviews, offers or employment, and we never fabricate qualifications or experience. We focus on strategy, quality applications and preparation."],
  ["Which countries does Career Solutions support?", "We support tech professionals targeting opportunities in the USA, Canada and the UK."],
  ["How much does a website or web app cost?", "It depends on scope. Choose a budget range in the Digital Solutions form and describe your project — we'll recommend a practical approach that fits."],
  ["Where can I see career plan prices?", "Foundation, Sprint and Complete plans are listed on the Career Solutions page under Plans & pricing."],
] as const;

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y border-y">
      {faqs.map(([q, a], i) => (
        <div key={q}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="group flex w-full items-center justify-between gap-6 py-5 text-left text-base font-semibold md:text-lg text-primary transition-colors hover:text-primary/80"
          >
            {q}
            <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500", open === i ? "rotate-45 border-gold bg-gold text-gold-foreground" : "group-hover:border-gold")}>
              <Plus className="h-4 w-4" />
            </span>
          </button>
          <div className={cn("grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]", open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
            <p className="overflow-hidden pr-14 text-muted-foreground">
              {a}
              <span className="block h-6" />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProcessLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div ref={ref} className="relative mt-12">
      <div className="absolute left-0 right-0 top-7 hidden h-px bg-night-border lg:block" />
      <motion.div style={{ scaleX }} className="absolute left-0 right-0 top-7 hidden h-px origin-left bg-gradient-gold lg:block" />
      <motion.ol variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10% 0px" }} className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {process.map(({ icon: Icon, title, text }, i) => (
          <motion.li key={title} variants={staggerChild} className="group relative">
            <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-night-border bg-night text-gold transition-all duration-500 group-hover:-translate-y-1 group-hover:bg-gold group-hover:text-gold-foreground">
              <Icon className="h-5 w-5" />
            </span>
            <span className="mt-6 block font-mono text-xs text-gold">0{i + 1}</span>
            <h3 className="mt-2 text-xl md:text-2xl">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-night-muted">{text}</p>
          </motion.li>
        ))}
      </motion.ol>
    </div>
  );
}

function Home() {
  const [inquiry, setInquiry] = useState<InquiryType>("digital");
  return (
    <>
      <HeroSplit />

      {/* About */}
      <section id="about" className="section-y relative overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0 bg-paper-dots opacity-40" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative">
            <ParallaxImage src={aboutImg} alt="Nexoys consultant talking with a client in a high-rise office" className="aspect-[4/3] rounded-[2rem] shadow-elegant lg:aspect-[5/6]" imgClassName="object-[30%_center]" width={1600} height={1200} />
            <div className="glass-light absolute -bottom-6 right-4 max-w-[14rem] rounded-2xl p-4 animate-float md:-right-6">
              <p className="eyebrow text-primary/70">Our promise</p>
              <p className="mt-2 font-display text-lg text-primary">Honest work. Clear progress. Real support.</p>
            </div>
          </div>
          <div>
            <Reveal>
              <p className="eyebrow text-primary/70">About Nexoys</p>
            </Reveal>
            <h2 className="mt-4 text-3xl leading-[1.08] text-primary sm:text-4xl lg:text-5xl">
              <SplitText text="Progress starts with *the right partner.*" emClassName="italic text-gold" />
            </h2>
            <ScrollFillText
              className="mt-6 text-base leading-relaxed text-primary md:text-lg"
              text="From building your digital presence to moving your career forward, we bring thoughtful strategy, practical technology and dependable human support together — so businesses can grow online and professionals can reach their next opportunity."
            />
            <motion.div variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10% 0px" }} className="mt-10 grid gap-4 sm:grid-cols-3">
              {facts.map((f) => (
                <motion.div key={f.label} variants={staggerChild} className="group flex flex-col rounded-2xl border bg-card p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant">
                  {f.icon ? (
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-primary transition-colors duration-500 group-hover:bg-gold group-hover:text-gold-foreground">
                      <f.icon className="h-5 w-5" />
                    </span>
                  ) : (
                    <b className="block h-10 font-display text-4xl font-normal leading-10 text-primary">{f.value}</b>
                  )}
                  <span className="mt-3 block text-sm font-semibold text-primary">{f.label}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{f.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <Marquee items={["Websites", "Web Apps", "Resumes", "LinkedIn", "Job Matching", "Interviews"]} className="bg-gold text-gold-foreground" separator="✺" />

      {/* Why choose us */}
      <section id="why-us" className="section-y relative overflow-hidden bg-secondary">
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <Reveal>
              <p className="eyebrow text-primary/70">Why choose us</p>
            </Reveal>
            <h2 className="mt-4 text-3xl text-primary sm:text-4xl lg:text-5xl">
              <SplitText text="Built on trust, *focused on results.*" emClassName="italic text-gold" />
            </h2>
          </div>
          <motion.div variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10% 0px" }} className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reasons.map(({ icon: Icon, title, text }) => (
              <motion.article key={title} variants={staggerChild} className="reveal-card group rounded-3xl border bg-card p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-primary transition-all duration-500 group-hover:rotate-6 group-hover:bg-gold group-hover:text-gold-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-xl md:text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed opacity-75">{text}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="section-y relative overflow-hidden bg-night text-night-foreground">
        <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <Reveal>
                <p className="eyebrow text-gold">Our process</p>
              </Reveal>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
                <SplitText text="How we work, *step by step.*" />
              </h2>
            </div>
            <Reveal delay={0.2}>
              <Button asChild variant="ghostLight" size="lg" className="rounded-full">
                <Link to="/contact">Start step one <ArrowUpRight /></Link>
              </Button>
            </Reveal>
          </div>
          <ProcessLine />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-y bg-background">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Reveal>
              <p className="eyebrow text-primary/70">FAQ</p>
            </Reveal>
            <h2 className="mt-4 text-3xl text-primary sm:text-4xl lg:text-5xl">
              <SplitText text="Questions, *answered.*" emClassName="italic text-gold" />
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-sm text-muted-foreground">
                Can't find what you need? Message us on{" "}
                <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline-offset-4 hover:underline">
                  WhatsApp
                </a>{" "}
                or send an inquiry below.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Faq />
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section-y relative scroll-mt-20 overflow-hidden bg-gradient-night text-night-foreground">
        <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-30" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-gold/15 blur-3xl animate-glow" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Reveal>
              <p className="eyebrow text-gold">Contact us</p>
            </Reveal>
            <h2 className="mt-4 text-3xl leading-[1.08] sm:text-4xl lg:text-5xl">
              <SplitText text="Let's build your / *next opportunity.*" />
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-md text-night-muted">
                Pick the division you need and share a few details. Each request goes to its own team so the reply is relevant from the first message.
              </p>
              <div className="mt-8 space-y-3 text-sm">
                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 transition-colors hover:text-gold">
                  <Mail className="h-4 w-4 text-gold" /> {contact.email}
                </a>
                <a href={contact.phoneHref} className="flex items-center gap-3 transition-colors hover:text-gold">
                  <Phone className="h-4 w-4 text-gold" /> {contact.phoneDisplay}
                </a>
                <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-gold">
                  <MessageCircle className="h-4 w-4 text-gold" /> Chat on WhatsApp
                </a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <InquiryTabs value={inquiry} onChange={setInquiry} idPrefix="home" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
