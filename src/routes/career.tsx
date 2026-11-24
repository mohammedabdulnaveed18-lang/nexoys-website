import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, BarChart3, Check, FileText, Mail, MessageCircle, Mic, Phone, Plus } from "lucide-react";
import consultantImg from "@/assets/career-consultant.jpg";
import candidateImg from "@/assets/career-candidate.jpg";
import { Button } from "@/components/ui/button";
import { Reveal, SplitText, staggerChild, staggerParent } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Marquee } from "@/components/motion/Marquee";
import { CountUp } from "@/components/motion/CountUp";
import { plans } from "@/lib/pricing";
import { CareerInquiryForm } from "@/components/site/forms/CareerInquiryForm";
import { serviceForPlan } from "@/lib/inquiries";
import { contact } from "@/lib/contact";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/career")({
  validateSearch: (search: Record<string, unknown>) => {
    const out: { plan?: string; service?: string } = {};
    if (typeof search["plan"] === "string") out.plan = search["plan"];
    if (typeof search["service"] === "string") out.service = search["service"];
    return out;
  },
  head: () => ({
    meta: [
      { title: "Career Solutions — Managed Job Search | Nexoys" },
      {
        name: "description",
        content:
          "Resume & LinkedIn optimization, job matching, tailored applications, tracking and interview prep for tech professionals targeting the USA, Canada and UK.",
      },
      { property: "og:title", content: "Career Solutions | Nexoys" },
      { property: "og:description", content: "Stop applying randomly. Start applying strategically with a managed career sprint." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CareerPage,
});

const programs: { id: string; title: string; text: string; outcome: string }[] = [
  { id: "profile-build", title: "Profile Build — Resume & LinkedIn", text: "Build a professional profile that represents your experience clearly.", outcome: "A clear, professional and job-focused career profile." },
  { id: "job-matching", title: "Job Matching — Job Search Support", text: "Find opportunities that match your profile and career direction.", outcome: "A more organized list of relevant opportunities to pursue." },
  { id: "application-support", title: "Application Support", text: "Apply strategically with applications tailored to the role.", outcome: "More relevant, consistent and organized job applications." },
  { id: "interview-preparation", title: "Interview Preparation", text: "Prepare specifically for the role and company you are interviewing with.", outcome: "Better preparation, clearer communication and a structured interview approach." },
  { id: "application-tracking", title: "Application Tracking", text: "Keep every application organized in one central record.", outcome: "One organized view of your complete job-search activity." },
  { id: "weekly-progress", title: "Weekly Progress", text: "Turn your job search activity into clear, measurable progress.", outcome: "Clear visibility into your progress and next steps." },
];

const timeline = [
  ["Discovery & Strategy Review", "Score resume, LinkedIn, target roles, ATS alignment and application strategy."],
  ["Consultation", "Confirm role, seniority, country, location/remote, salary, sponsorship and restrictions."],
  ["Plan & Onboarding", "Select the right plan and share your resume, LinkedIn URL and target roles."],
  ["Profile Build", "Optimize resume and LinkedIn and define target titles using your verified experience."],
  ["Job Matching", "Filter relevant, legitimate and fresh opportunities against your genuine profile."],
  ["Customization", "Create truthful job-specific resume versions and cover letters where useful."],
  ["Apply & Track", "Use legitimate job sources, record applications and maintain follow-ups."],
  ["Weekly Report", "Review applications, interviews, responses, pending items and next actions."],
  ["Interview Support", "Prepare for role/company questions, STAR answers, technical and behavioral interviews."],
  ["Follow-Up", "Support recruiter follow-ups and salary/offer discussions when relevant."],
];

const faqs = [
  [
    "What is the Career Sprint?",
    "The Career Sprint is our managed job-search service. Depending on the plan you choose, we strengthen your resume and LinkedIn profile, match you with relevant roles, help prepare and submit tailored applications, track every application in one place, share regular progress reports and prepare you for interviews.",
  ],
  ["Do you guarantee interviews or a job offer?", "No. Nexoys does not guarantee interviews, offers or employment."],
  ["Are applications customized?", "For relevant applications, we create truthful job-specific resume versions and cover letters where useful, using verified client information only."],
  ["Which countries do you focus on?", "Tech professionals targeting opportunities in the USA, Canada and UK."],
  ["How do you handle suspicious jobs?", "Checks include legitimacy, relevance, seniority, location, requirements, duplicate/expiry checks and obvious scam signals."],
];

/** Smoothly bring the inquiry form into view, leaving room for the fixed header. */
function scrollToInquiry() {
  // Target the form itself: on phones it sits below the section intro.
  const el = document.getElementById("career-inquiry-form") ?? document.getElementById("inquiry");
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = el.getBoundingClientRect().top + window.scrollY - 96;
  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
}

function PriceCard({ plan, onChoose }: { plan: (typeof plans)[number]; onChoose: () => void }) {
  return (
    <motion.article
      variants={staggerChild}
      className={cn(
        "relative flex flex-col rounded-3xl border p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-elegant",
        plan.popular ? "border-gold/60 bg-night text-night-foreground shadow-elegant ring-1 ring-gold/40" : "bg-card",
      )}
    >
      {plan.popular && <span className="absolute -top-3 left-7 rounded-full bg-gold px-3 py-1 text-[0.65rem] font-bold tracking-wider text-gold-foreground">MOST POPULAR</span>}
      <span className="eyebrow text-gold">{plan.label}</span>
      <h3 className="mt-3 text-2xl lg:min-h-16">{plan.heading}</h3>
      <div className="mt-6">
        <span className="font-display text-5xl leading-none">${plan.price}</span>
      </div>
      <p className="mt-1 text-xs font-semibold text-gold">{plan.note}</p>
      <p className="mt-4 text-sm opacity-75">{plan.blurb}</p>
      <ul className="mt-6 flex-1 space-y-2.5 border-t border-current/10 pt-6 text-sm">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-2.5"><Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {f}</li>
        ))}
      </ul>
      <Button asChild variant={plan.popular ? "gold" : "night"} size="lg" className="mt-8 w-full">
        <Link
          to="/career"
          search={{ plan: plan.id }}
          resetScroll={false}
          onClick={() => {
            onChoose();
            requestAnimationFrame(scrollToInquiry);
          }}
        >
          Choose {plan.label}
        </Link>
      </Button>
    </motion.article>
  );
}

function CareerPage() {
  const [open, setOpen] = useState<number | null>(0);
  const { plan, service } = Route.useSearch();
  const preselected = serviceForPlan(plan) ?? service;
  // Bumped on every plan click so re-choosing a plan re-selects it even if the URL did not change.
  const [planPick, setPlanPick] = useState(0);
  // Visitors arriving from another page with ?plan= land on the form too.
  useEffect(() => {
    if (plan) requestAnimationFrame(scrollToInquiry);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <section id="home" className="relative overflow-hidden bg-background pt-28 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-paper-dots opacity-50" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-16 md:pb-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow text-primary/70">Managed job search</p>
            <h1 className="mt-6 text-4xl leading-[1.06] text-primary sm:text-5xl xl:text-6xl">
              <SplitText immediate delay={0.9} text="Stop applying randomly. / *Start applying strategically.*" emClassName="italic text-gold" />
            </h1>
            <Reveal delay={0.4}>
              <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
                Nexoys helps tech professionals build a stronger profile, find relevant opportunities, customize applications and manage the search with human quality control.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="night" size="lg" className="group"><Link to="/career" hash="inquiry">Get your strategy review <ArrowRight className="transition-transform group-hover:translate-x-1" /></Link></Button>
                <Button asChild variant="ghostDark" size="lg"><a href="#pricing">Explore plans</a></Button>
              </div>
              <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground">
                {["Tech-focused", "USA / Canada / UK", "Human-reviewed"].map((t) => (
                  <span key={t} className="flex items-center gap-2"><Check className="h-4 w-4 text-gold" /> {t}</span>
                ))}
              </div>
            </Reveal>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <ParallaxImage src={consultantImg} alt="Nexoys career consultant explaining the career sprint" className="aspect-[4/5] max-h-[36rem] rounded-[2rem] shadow-elegant" imgClassName="object-top" width={1280} height={1600} priority />
            <div className="glass-light absolute -left-3 bottom-8 rounded-2xl p-4 animate-float md:-left-8">
              <b className="font-display text-4xl text-primary"><CountUp to={10} /></b>
              <p className="text-xs text-muted-foreground">targeted applications / day<br />on application-heavy plans</p>
            </div>
          </div>
        </div>
      </section>

      <Marquee items={["Resume", "LinkedIn", "ATS Alignment", "Job Matching", "Interviews", "Weekly Reports"]} className="bg-gold text-gold-foreground" separator="✺" />

      <section id="program-details" className="bg-background py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal><p className="eyebrow text-primary/70">Program details</p></Reveal>
          <h2 className="mt-4 max-w-3xl text-3xl text-primary sm:text-4xl lg:text-5xl">
            <SplitText text="Clear support at *every stage.*" emClassName="italic text-gold" />
          </h2>
          <motion.div variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10% 0px" }} className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((p, i) => (
              <motion.article key={p.id} id={p.id} variants={staggerChild} className="reveal-card scroll-mt-28 rounded-3xl border bg-card p-7">
                <span className="font-mono text-sm text-gold">0{i + 1}</span>
                <h3 className="mt-4 text-xl md:text-2xl">{p.title}</h3>
                <p className="mt-3 text-sm opacity-75">{p.text}</p>
                <p className="mt-6 text-sm"><b>Outcome:</b> {p.outcome}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-y relative overflow-hidden bg-night text-night-foreground">
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal><p className="eyebrow text-gold">Working with us</p></Reveal>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl"><SplitText text="Real people, *alongside you.*" /></h2>
            <Reveal delay={0.2}>
              <p className="mt-5 max-w-lg text-night-muted">From your first resume review to the final interview, a consultant works with you directly — explaining every step and preparing you for every conversation.</p>
            </Reveal>
            <motion.ul variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10% 0px" }} className="mt-10 space-y-4">
              {[
                { icon: FileText, title: "Resume & LinkedIn consultation", text: "Side-by-side reviews that turn your verified experience into a clear, ATS-aligned profile." },
                { icon: Mic, title: "Interview preparation", text: "Role- and company-specific mock interviews with structured STAR answers and feedback." },
                { icon: BarChart3, title: "Your search, fully visible", text: "A central application tracker, weekly progress reports and recruiter follow-up support — so you always know where you stand." },
              ].map(({ icon: Icon, title, text }) => (
                <motion.li key={title} variants={staggerChild} className="group flex gap-4 rounded-2xl border border-night-border p-5 transition-colors duration-500 hover:border-gold/60">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-gold-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <b className="block font-display text-xl font-normal">{title}</b>
                    <span className="mt-1 block text-sm text-night-muted">{text}</span>
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
          <ParallaxImage src={candidateImg} alt="Smiling professional working on her laptop in a bright office" className="aspect-[4/3] w-full rounded-[2rem] shadow-elegant" zoom={false} strength={20} width={1600} height={1200} />
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-20 bg-background py-20 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal><p className="eyebrow text-primary/70">End-to-end workflow</p></Reveal>
          <h2 className="mt-4 text-3xl text-primary sm:text-4xl lg:text-5xl"><SplitText text="One search. / *Handled strategically.*" emClassName="italic text-gold" /></h2>
          <ol className="mt-12 border-l border-gold/40">
            {timeline.map(([t, d], i) => (
              <Reveal key={t} as="li" className="relative pb-8 pl-10">
                <span className="absolute -left-3 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gold font-mono text-[0.6rem] text-gold-foreground">{i + 1}</span>
                <h3 className="text-xl text-primary md:text-2xl">{t}</h3>
                <p className="mt-2 text-muted-foreground">{d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-night py-16 text-night-foreground md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Managed", "A structured, guided job search instead of one-time resume writing."],
            [<CountUp key="b" to={10} suffix="/day" />, "Up to 10 targeted applications per day on application-heavy plans."],
            ["Human QA", "AI-assisted workflow with human quality control before applications."],
            ["Weekly", "Progress reports and application tracking."],
          ].map(([b, s], i) => (
            <Reveal key={i} delay={i * 0.1}>
              <b className="font-display text-4xl font-normal text-gold">{b}</b>
              <p className="mt-3 text-sm text-night-muted">{s}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="pricing" className="scroll-mt-20 bg-background py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal><p className="eyebrow text-primary/70">Plans &amp; pricing</p></Reveal>
          <h2 className="mt-4 max-w-4xl text-3xl text-primary sm:text-4xl lg:text-5xl"><SplitText text="Simple plans, *clear support.*" emClassName="italic text-gold" /></h2>
          <motion.div variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10% 0px" }} className="mx-auto mt-12 grid max-w-xl items-stretch gap-6 lg:max-w-6xl lg:grid-cols-3">
            {plans.map((p) => <PriceCard key={p.id} plan={p} onChoose={() => setPlanPick((n) => n + 1)} />)}
          </motion.div>
          <p className="mt-8 text-center text-xs text-muted-foreground">Nexoys does not guarantee interviews, offers or employment. We do not fabricate qualifications or experience.</p>
        </div>
      </section>

      <section id="trust" className="scroll-mt-20 bg-night py-20 md:py-24 text-night-foreground">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2">
          <div>
            <Reveal><p className="eyebrow text-gold">Trust &amp; safety</p></Reveal>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl"><SplitText text="Professional support. / *Honest applications.*" /></h2>
          </div>
          <div className="space-y-4">
            {["No guarantee of interviews, offers or employment.", "No fabrication of qualifications or experience.", "Legitimate job sources and transparent application records.", "Client consent for application activity and communications.", "Minimal collection of sensitive information.", "AI assistance is subject to human review."].map((t, i) => (
              <Reveal key={t} delay={i * 0.05}><p className="flex gap-3 border-b border-night-border pb-4 text-sm md:text-base"><Check className="h-5 w-5 shrink-0 text-gold" /> {t}</p></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-background py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center text-3xl text-primary sm:text-4xl">Questions, answered.</h2>
          <div className="mt-12">
            {faqs.map(([q, a], i) => (
              <div key={q} className="border-b">
                <button type="button" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-6 py-5 text-left text-base font-semibold text-primary md:text-lg">
                  {q}
                  <Plus className={cn("h-5 w-5 transition-transform duration-500", open === i && "rotate-45 text-gold")} />
                </button>
                <div className={cn("grid transition-[grid-template-rows] duration-500", open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                  <p className="overflow-hidden pb-0 text-muted-foreground">{a}<span className="block h-6" /></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="inquiry" className="section-y relative overflow-hidden bg-gradient-night text-night-foreground">
        <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-30" />
        <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-gold/15 blur-3xl animate-glow" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Reveal><p className="eyebrow text-gold">Your next opportunity starts with clarity</p></Reveal>
            <h2 className="mt-4 text-3xl leading-[1.08] sm:text-4xl lg:text-5xl"><SplitText text="Stop applying randomly. *Start applying strategically.*" /></h2>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-md text-night-muted">Tell us where you are and where you want to go. We'll review your profile and recommend the right service or plan for your search.</p>
              <ul className="mt-8 space-y-3 text-sm">
                {["Starts with a review of your profile and goals", "Honest advice — no guarantees we can't keep", "Support for the USA, Canada and UK"].map((t) => (
                  <li key={t} className="flex items-center gap-3"><Check className="h-4 w-4 text-gold" /> {t}</li>
                ))}
              </ul>
              <div className="mt-10 space-y-3 border-t border-night-border pt-8 text-sm">
                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 transition-colors hover:text-gold"><Mail className="h-4 w-4 text-gold" /> {contact.email}</a>
                <a href={contact.phoneHref} className="flex items-center gap-3 transition-colors hover:text-gold"><Phone className="h-4 w-4 text-gold" /> {contact.phoneDisplay}</a>
                <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-gold"><MessageCircle className="h-4 w-4 text-gold" /> Chat on WhatsApp</a>
              </div>
            </Reveal>
          </div>
          <div id="career-inquiry-form">
            <Reveal delay={0.15}>
              <CareerInquiryForm defaultService={preselected} selectionKey={planPick} idPrefix="career-page" />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
